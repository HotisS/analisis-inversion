#!/usr/bin/env node
// calcular-empresa.mjs — hace todas las cuentas del análisis de empresa a partir de los datos
// que ha reunido el modelo, y las deja en datos.calc. Sin dependencias (Node >= 18).
//
//   node calcular-empresa.mjs --datos datos.json [--salida datos.json]
//
// El modelo aporta hechos (cuentas, precios, comparables) y supuestos (los del DCF y los
// escenarios). Aquí se calculan ratios, múltiplos, DCF, sensibilidades, DCF inverso,
// estadísticos de comparables, indicadores de calidad contable, puntuación de gobierno,
// la síntesis de valoración y una batería de controles de coherencia.
// El modelo NO escribe datos.calc: lo lee para redactar sus conclusiones.

import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// ───────────────────────────── utilidades ─────────────────────────────

const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const div = (a, b) => (a === null || b === null || b === 0 ? null : a / b);
const pct = (a, b) => { const r = div(a, b); return r === null ? null : r * 100; };
const red = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const suma = (...xs) => (xs.some((x) => x === null) ? null : xs.reduce((a, b) => a + b, 0));
const sumaLaxa = (...xs) => xs.reduce((a, b) => a + (b ?? 0), 0);
const lista = (v) => (Array.isArray(v) ? v : []);
const vacioProfundo = (v) => v === null || v === undefined || v === '' || (Array.isArray(v) ? v.every(vacioProfundo) : typeof v === 'object' ? Object.entries(v).every(([k, x]) => k === 'confianza' || vacioProfundo(x)) : false);
// Secciones sin las que el informe no se sostiene: si llegan vacías, el motor lo marca y el informe lo avisa.
export const NUCLEO = ['negocio', 'sector', 'competencia', 'financieros', 'balance', 'flujos', 'rentabilidad', 'capital', 'directivos', 'gobierno', 'consenso', 'comparables', 'dcf', 'escenarios', 'valoracion', 'riesgos'];
const validos = (xs) => xs.map(n).filter((x) => x !== null);
const mediana = (xs) => percentil(xs, 50);
const media = (xs) => { const v = validos(xs); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
function percentil(xs, p) {
  const v = validos(xs).sort((a, b) => a - b);
  if (!v.length) return null;
  const i = ((v.length - 1) * p) / 100, lo = Math.floor(i), hi = Math.ceil(i);
  return v[lo] + (v[hi] - v[lo]) * (i - lo);
}
const anioDe = (periodo) => { const m = String(periodo ?? '').match(/(\d{4})/); return m ? +m[1] : null; };
const esEstimado = (periodo) => /\d{2}\s*e\b/i.test(String(periodo ?? '')); // «2026e», «FY2027e»
const finEjercicio = (anio, mes = 12) => new Date(Date.UTC(anio, mes, 0)); // último día del mes de cierre
const anios = (a, b) => (b - a) / (365.25 * 864e5);
const tcac = (ini, fin, nAnios) => (ini > 0 && fin > 0 && nAnios > 0 ? ((fin / ini) ** (1 / nAnios) - 1) * 100 : null);

// ───────────────────────────── cálculo ─────────────────────────────

export function calcularEmpresa(datos) {
  const d = datos;
  const controles = [];
  const control = (nombre, ok, detalle) => controles.push({ control: nombre, resultado: ok === null ? 'n.d.' : ok ? 'OK' : 'Revisar', detalle: detalle ?? '' });
  const meta = d.meta || {};
  const mesCierre = n(meta.cierre_ejercicio_mes) || 12;
  const fechaCorte = new Date((meta.fecha_corte || new Date().toISOString().slice(0, 10)) + 'T00:00:00Z');
  const id = d.identificacion || {};
  const precio = n(id.precio), acciones = n(id.acciones);

  // ── Cuenta de resultados (solo ejercicios reales) ──
  const cuentaIn = lista(d.financieros?.cuenta).filter((c) => !esEstimado(c.periodo));
  const cuenta = cuentaIn.map((c, i) => {
    const ant = cuentaIn[i - 1];
    const ingresos = n(c.ingresos), bruto = ingresos !== null && n(c.coste_ventas) !== null ? ingresos - n(c.coste_ventas) : null;
    const bai = n(c.bai), imp = n(c.impuestos);
    return {
      periodo: c.periodo, ingresos,
      crecimiento_pct: red(ant ? pct(ingresos - n(ant.ingresos), n(ant.ingresos)) : null),
      beneficio_bruto: bruto, margen_bruto_pct: red(pct(bruto, ingresos)),
      ebitda: n(c.ebitda), margen_ebitda_pct: red(pct(n(c.ebitda), ingresos)),
      ebit: n(c.ebit), margen_ebit_pct: red(pct(n(c.ebit), ingresos)),
      beneficio_neto: n(c.beneficio_neto), margen_neto_pct: red(pct(n(c.beneficio_neto), ingresos)),
      bpa: n(c.bpa), dpa: n(c.dpa),
      tasa_impositiva_pct: red(bai > 0 ? pct(imp, bai) : null),
      payout_pct: red(pct(n(c.dpa), n(c.bpa)), 0),
    };
  });
  const ultimo = cuentaIn[cuentaIn.length - 1] || {};
  const ultimoCalc = cuenta[cuenta.length - 1] || {};
  const nC = cuenta.length;
  const tcacTabla = nC > 1 ? {
    periodo: `${cuenta[0].periodo}-${ultimoCalc.periodo}`,
    ingresos_pct: red(tcac(cuenta[0].ingresos, ultimoCalc.ingresos, nC - 1)),
    ebitda_pct: red(tcac(cuenta[0].ebitda, ultimoCalc.ebitda, nC - 1)),
    bpa_pct: red(tcac(cuenta[0].bpa, ultimoCalc.bpa, nC - 1)),
  } : {};
  for (let i = 0; i < cuentaIn.length; i++) {
    const c = cuentaIn[i];
    const ebitda = n(c.ebitda), am = n(c.amortizaciones), ebit = n(c.ebit);
    if (ebitda !== null && am !== null && ebit !== null && Math.abs(ebitda - am - ebit) > Math.max(0.03 * Math.abs(ebitda), 1)) {
      control(`EBITDA − amortizaciones = EBIT (${c.periodo})`, false, `Diferencia de ${red(ebitda - am - ebit)}: deterioros u otros resultados entre EBITDA y EBIT; explícalo en el comentario.`);
    }
    const bai = n(c.bai), rf = n(c.resultado_financiero);
    const bn = n(c.beneficio_neto), imp = n(c.impuestos), mino = n(c.minoritarios) ?? 0;
    if (bai !== null && imp !== null && bn !== null && Math.abs(bai - imp - mino - bn) > Math.max(0.03 * Math.abs(bn), 1)) {
      control(`BAI − impuestos − minoritarios = beneficio neto (${c.periodo})`, false, `Diferencia de ${red(bai - imp - mino - bn)} (¿operaciones interrumpidas?).`);
    }
    if (ebit !== null && rf !== null && bai !== null && Math.abs(ebit + rf - bai) > Math.max(0.05 * Math.abs(bai), 1)) {
      control(`EBIT + resultado financiero = BAI (${c.periodo})`, false, `Diferencia de ${red(ebit + rf - bai)} (¿asociadas o extraordinarios?).`);
    }
    const accs = n(c.acciones_diluidas);
    if (bn !== null && accs && n(c.bpa) !== null && Math.abs(bn / accs - n(c.bpa)) > 0.06 * Math.abs(n(c.bpa)) + 0.01) {
      control(`BPA = beneficio neto / acciones (${c.periodo})`, false, `${red(bn / accs, 2)} calculado frente a ${c.bpa} publicado.`);
    }
  }

  // ── LTM y NTM ──
  const ltm = d.financieros?.ltm || {};
  const ingresosLtm = n(ltm.ingresos) ?? ultimoCalc.ingresos ?? null;
  const ebitdaLtm = n(ltm.ebitda) ?? ultimoCalc.ebitda ?? null;
  const ebitLtm = n(ltm.ebit) ?? ultimoCalc.ebit ?? null;
  const bpaLtm = n(ltm.bpa) ?? ultimoCalc.bpa ?? null;
  const estim = lista(d.consenso?.estimaciones).filter((e) => anioDe(e.periodo));
  const ntm = (campo) => {
    const futuros = estim.filter((e) => finEjercicio(anioDe(e.periodo), mesCierre) > fechaCorte && n(e[campo]) !== null);
    if (!futuros.length) return null;
    const e1 = futuros[0], e2 = futuros[1];
    const w = Math.min(1, Math.max(0, anios(fechaCorte, finEjercicio(anioDe(e1.periodo), mesCierre))));
    return e2 ? w * n(e1[campo]) + (1 - w) * n(e2[campo]) : n(e1[campo]);
  };
  const ingresosNtm = ntm('ingresos'), ebitdaNtm = ntm('ebitda'), bpaNtm = ntm('bpa');

  // ── Puente de valor y datos de mercado ──
  const pu = d.valoracion?.puente || {};
  const deudaNeta = suma(n(pu.deuda_financiera) ?? 0, n(pu.arrendamientos) ?? 0, -(n(pu.caja) ?? 0));
  const ajustesPuente = sumaLaxa(n(pu.minoritarios), n(pu.pensiones), -(n(pu.asociadas) ?? 0), n(pu.otros_ajustes));
  const capitalizacion = precio !== null && acciones !== null ? precio * acciones : null;
  const valorEmpresa = capitalizacion !== null ? capitalizacion + deudaNeta + ajustesPuente : null;
  const mercado = {
    precio, acciones, capitalizacion: red(capitalizacion, 0), deuda_neta: red(deudaNeta, 0),
    ajustes_puente: red(ajustesPuente, 0), valor_empresa: red(valorEmpresa, 0), fecha_puente: pu.fecha ?? null,
  };

  // ── Segmentos ──
  const segs = lista(d.negocio?.segmentos);
  const periodosSeg = [...new Set(segs.flatMap((s) => lista(s.historico).map((h) => String(h.periodo))))].sort((a, b) => anioDe(a) - anioDe(b));
  const ultPerSeg = periodosSeg[periodosSeg.length - 1];
  const penPerSeg = periodosSeg[periodosSeg.length - 2];
  const valorSeg = (s, per, campo = 'ingresos') => n(lista(s.historico).find((h) => String(h.periodo) === per)?.[campo]);
  const totalUlt = sumaLaxa(...segs.map((s) => valorSeg(s, ultPerSeg)));
  const segmentosUltimo = segs.map((s) => {
    const ing = valorSeg(s, ultPerSeg), antes = valorSeg(s, penPerSeg), res = valorSeg(s, ultPerSeg, 'resultado');
    return {
      nombre: s.nombre, ingresos: ing, peso_pct: red(pct(ing, totalUlt)),
      crecimiento_pct: red(antes ? pct(ing - antes, antes) : null), margen_pct: red(pct(res, ing)), tipo_margen: s.tipo_resultado ?? null,
    };
  });
  const ult5Seg = periodosSeg.slice(-5);
  while (ult5Seg.length < 5) ult5Seg.unshift('');
  const segmentosTabla = {
    periodos: ult5Seg,
    filas: segs.map((s) => Object.fromEntries([['nombre', s.nombre], ...ult5Seg.map((p, i) => [`v${i}`, p ? valorSeg(s, p) : null])])),
  };
  for (const per of periodosSeg) {
    const c = cuenta.find((x) => String(x.periodo) === per);
    const sumaSeg = sumaLaxa(...segs.map((s) => valorSeg(s, per)));
    if (c?.ingresos && Math.abs(sumaSeg - c.ingresos) > 0.03 * c.ingresos) {
      control(`Segmentos suman los ingresos (${per})`, false, `Segmentos ${red(sumaSeg, 0)} frente a ingresos ${c.ingresos} (${red(pct(sumaSeg - c.ingresos, c.ingresos))} %). Si hay eliminaciones entre segmentos, explícalo.`);
    }
  }
  const geo = lista(d.negocio?.geografias);
  if (geo.length) { const s = sumaLaxa(...geo.map((g) => n(g.peso_pct))); control('Geografías suman 100 %', Math.abs(s - 100) <= 1.5, `Suman ${red(s)} %.`); }

  // ── Balance, circulante y solvencia ──
  const balIn = lista(d.balance?.historico);
  const balance = balIn.map((b) => {
    const c = cuentaIn.find((x) => String(x.periodo) === String(b.periodo)) || {};
    const ingresos = n(c.ingresos), cv = n(c.coste_ventas);
    const dn = suma(n(b.deuda_financiera) ?? 0, n(b.arrendamientos) ?? 0, -(n(b.caja) ?? 0));
    const circ = suma(n(b.existencias) ?? 0, n(b.clientes) ?? 0, -(n(b.proveedores) ?? 0));
    const dso = red(div(n(b.clientes), ingresos) !== null ? div(n(b.clientes), ingresos) * 365 : null, 0);
    const dio = red(div(n(b.existencias), cv) !== null ? div(n(b.existencias), cv) * 365 : null, 0);
    const dpo = red(div(n(b.proveedores), cv) !== null ? div(n(b.proveedores), cv) * 365 : null, 0);
    const rf = n(c.resultado_financiero);
    const at = n(b.activo_total), pas = n(b.pasivo_total), pn = n(b.patrimonio_neto), mi = n(b.minoritarios) ?? 0;
    if (at !== null && pas !== null && pn !== null && Math.abs(at - pas - pn - mi) > 0.02 * at) {
      control(`Activo = pasivo + patrimonio (${b.periodo})`, false, `Activo ${at} frente a ${red(pas + pn + mi, 0)}: revisa si el patrimonio incluye minoritarios.`);
    }
    return {
      periodo: b.periodo, activo_total: at, intangibles: suma(n(b.fondo_comercio) ?? 0, n(b.intangibles) ?? 0),
      circulante: circ, circulante_ventas_pct: red(pct(circ, ingresos)), caja: n(b.caja), deuda_financiera: n(b.deuda_financiera),
      arrendamientos: n(b.arrendamientos), deuda_neta: dn, patrimonio: pn, minoritarios: n(b.minoritarios),
      dn_ebitda: red(div(dn, n(c.ebitda)), 2), dn_patrimonio_pct: red(pct(dn, pn + mi), 0),
      dso, dio, dpo, ciclo_caja: dso !== null && dio !== null && dpo !== null ? dso + dio - dpo : null,
      cobertura_intereses: red(rf !== null && rf < 0 ? div(n(c.ebit), -rf) : null, 1),
      capital_invertido: suma(pn ?? 0, mi, dn ?? 0),
      liquidez_corriente: red(div(n(b.activo_corriente), n(b.pasivo_corriente)), 2),
    };
  });
  const balUlt = balance[balance.length - 1] || {};

  // ── Flujos de caja y uso del capital ──
  const fluIn = lista(d.flujos?.historico);
  const flujos = fluIn.map((f) => {
    const c = cuentaIn.find((x) => String(x.periodo) === String(f.periodo)) || {};
    const fcf = suma(n(f.flujo_operativo), -(n(f.capex) ?? 0), -(n(f.pagos_arrendamientos) ?? 0));
    const bn = n(c.beneficio_neto);
    return {
      periodo: f.periodo, flujo_operativo: n(f.flujo_operativo), capex: n(f.capex), pagos_arrendamientos: n(f.pagos_arrendamientos), fcf,
      beneficio_neto: bn, conversion_pct: red(pct(fcf, bn), 0), capex_ventas_pct: red(pct(n(f.capex), n(c.ingresos))),
      capex_amortizacion: red(div(n(f.capex), n(c.amortizaciones)), 2),
      adquisiciones: n(f.adquisiciones), desinversiones: n(f.desinversiones), dividendos: n(f.dividendos), recompras: n(f.recompras),
      emision_acciones: n(f.emision_acciones), retorno_accionista: sumaLaxa(n(f.dividendos), n(f.recompras)),
      payout_caja_pct: red(pct(sumaLaxa(n(f.dividendos), n(f.recompras)), bn), 0), acciones: n(c.acciones_diluidas),
      fcf_por_accion: red(div(fcf, n(c.acciones_diluidas)), 2),
    };
  });
  const fluUlt = flujos[flujos.length - 1] || {};
  const acumulado = flujos.length ? {
    periodo: `${flujos[0].periodo}-${fluUlt.periodo}`,
    fcf: red(sumaLaxa(...flujos.map((f) => f.fcf)), 0), adquisiciones: red(sumaLaxa(...flujos.map((f) => f.adquisiciones)), 0),
    dividendos: red(sumaLaxa(...flujos.map((f) => f.dividendos)), 0), recompras: red(sumaLaxa(...flujos.map((f) => f.recompras)), 0),
    conversion_pct: red(pct(sumaLaxa(...flujos.map((f) => f.fcf)), sumaLaxa(...flujos.map((f) => f.beneficio_neto))), 0),
  } : {};
  const fcfLtm = n(ltm.fcf) ?? fluUlt.fcf ?? null;

  // ── Rentabilidad ──
  const rentabilidad = cuentaIn.map((c, i) => {
    const b = balIn.find((x) => String(x.periodo) === String(c.periodo));
    const bAnt = balIn.find((x) => String(x.periodo) === String(cuentaIn[i - 1]?.periodo));
    const bc = balance.find((x) => String(x.periodo) === String(c.periodo));
    const bcAnt = balance.find((x) => String(x.periodo) === String(cuentaIn[i - 1]?.periodo));
    const tasa = n(c.bai) > 0 && n(c.impuestos) !== null ? Math.min(0.4, Math.max(0, n(c.impuestos) / n(c.bai))) : 0.25;
    const nopat = n(c.ebit) !== null ? n(c.ebit) * (1 - tasa) : null;
    const ci = bc && bcAnt ? (bc.capital_invertido + bcAnt.capital_invertido) / 2 : bc?.capital_invertido ?? null;
    const pnMed = b && bAnt ? (n(b.patrimonio_neto) + n(bAnt.patrimonio_neto)) / 2 : n(b?.patrimonio_neto);
    const atMed = b && bAnt ? (n(b.activo_total) + n(bAnt.activo_total)) / 2 : n(b?.activo_total);
    return {
      periodo: c.periodo, nopat: red(nopat, 0), capital_invertido: red(ci, 0), roic_pct: red(pct(nopat, ci)),
      roe_pct: red(pct(n(c.beneficio_neto), pnMed)), roa_pct: red(pct(n(c.beneficio_neto), atMed)),
      margen_neto_pct: red(pct(n(c.beneficio_neto), n(c.ingresos))), rotacion: red(div(n(c.ingresos), atMed), 2),
      apalancamiento: red(div(atMed, pnMed), 2),
    };
  });
  const rentUlt = rentabilidad[rentabilidad.length - 1] || {};
  const rentIni = rentabilidad.find((r) => r.nopat !== null && r.capital_invertido !== null);
  const roicIncremental = rentIni && rentUlt !== rentIni ? red(pct(rentUlt.nopat - rentIni.nopat, rentUlt.capital_invertido - rentIni.capital_invertido)) : null;

  // ── Calidad contable: Altman Z, Piotroski F, Beneish M ──
  const scores = calidadContable(cuentaIn, balIn, fluIn, capitalizacion);

  // ── WACC y DCF ──
  const dcfIn = d.dcf || {};
  const w = dcfIn.wacc || {};
  const ke = suma(n(w.tasa_libre_pct), n(w.beta) !== null && n(w.prima_mercado_pct) !== null ? n(w.beta) * n(w.prima_mercado_pct) : null, n(w.prima_adicional_pct) ?? 0);
  const kdDesp = n(w.coste_deuda_pct) !== null ? n(w.coste_deuda_pct) * (1 - (n(w.tasa_impositiva_pct) ?? 25) / 100) : null;
  const pesoD = (n(w.peso_deuda_pct) ?? 0) / 100;
  const wacc = ke !== null && kdDesp !== null ? ke * (1 - pesoD) + kdDesp * pesoD : null;
  const waccTabla = [
    ['Tasa libre de riesgo', w.tasa_libre_pct, '%'], ['Beta', w.beta, ''], ['Prima de riesgo de mercado', w.prima_mercado_pct, '%'],
    ['Prima adicional (país, tamaño, específica)', w.prima_adicional_pct, '%'], ['Coste de los fondos propios', ke, '%'],
    ['Coste de la deuda antes de impuestos', w.coste_deuda_pct, '%'], ['Tipo impositivo', w.tasa_impositiva_pct, '%'],
    ['Coste de la deuda después de impuestos', kdDesp, '%'], ['Peso de la deuda (D / (D + E))', w.peso_deuda_pct, '%'], ['WACC', wacc, '%'],
  ].map(([concepto, v, u]) => ({ concepto, valor: n(v) === null ? null : u === '%' ? `${fmt(n(v), 2)} %` : fmt(n(v), 2) }));

  const nwcBase = balUlt.circulante ?? null;
  const ctx = { cuentaUlt: ultimo, nwcBase, fechaCorte, mesCierre, deudaNeta, ajustesPuente, acciones };
  const base = { wacc, g: n(dcfIn.terminal?.crecimiento_pct), multiplo: n(dcfIn.terminal?.multiplo_salida), metodo: dcfIn.terminal?.metodo || 'gordon', mitad: dcfIn.mitad_de_anio !== false };
  const dcfBase = valorarDcf(dcfIn, ctx, base);
  let dcf = null;
  if (dcfBase) {
    const vpa = dcfBase.valor_accion;
    // Sensibilidad 1: WACC × crecimiento terminal (o múltiplo de salida)
    const porMultiplo = base.metodo === 'multiplo';
    const pasosW = [-1, -0.5, 0, 0.5, 1];
    const pasosC = porMultiplo ? [-2, -1, 0, 1, 2] : [-1, -0.5, 0, 0.5, 1];
    const sens1 = {
      eje_columnas: porMultiplo ? 'Múltiplo EV/EBITDA de salida' : 'Crecimiento a perpetuidad',
      columnas: pasosC.map((p) => (porMultiplo ? `${fmt(base.multiplo + p, 1)}x` : `${fmt(base.g + p, 1)} %`)),
      filas: pasosW.map((pw) => ({
        wacc: `${fmt(wacc + pw, 1)} %`,
        ...Object.fromEntries(pasosC.map((pc, j) => [`v${j}`, red(valorarDcf(dcfIn, ctx, { ...base, wacc: wacc + pw, ...(porMultiplo ? { multiplo: base.multiplo + pc } : { g: base.g + pc }) })?.valor_accion, 2)])),
      })),
    };
    // Sensibilidad 2: crecimiento de ingresos × margen EBITDA (desplazamiento de toda la proyección)
    const pasos2 = [-2, -1, 0, 1, 2];
    const sens2 = {
      columnas: pasos2.map((p) => `${p > 0 ? '+' : ''}${p} pp`),
      filas: pasos2.map((pm) => ({
        margen: `${pm > 0 ? '+' : ''}${pm} pp`,
        ...Object.fromEntries(pasos2.map((pg, j) => [`v${j}`, red(valorarDcf(dcfIn, ctx, base, { dg: pg, dm: pm })?.valor_accion, 2)])),
      })),
    };
    // Rango interior (±0,5 en ambos ejes) para la síntesis
    const interior = [];
    for (const pw of [-0.5, 0, 0.5]) for (const pc of porMultiplo ? [-1, 0, 1] : [-0.5, 0, 0.5]) {
      const v = valorarDcf(dcfIn, ctx, { ...base, wacc: wacc + pw, ...(porMultiplo ? { multiplo: base.multiplo + pc } : { g: base.g + pc }) })?.valor_accion;
      if (v !== null && v !== undefined) interior.push(v);
    }
    // DCF inverso
    const objetivo = precio;
    const crecImpl = objetivo ? biseccion((x) => valorarDcf(dcfIn, ctx, base, { dg: x })?.valor_accion - objetivo, -30, 40) : null;
    const crecMedioBase = media(lista(dcfIn.anios).map((a) => a.crecimiento_pct));
    const waccImpl = objetivo ? biseccion((x) => valorarDcf(dcfIn, ctx, { ...base, wacc: x })?.valor_accion - objetivo, Math.max((base.g ?? 0) + 0.6, 2), 30) : null;
    const margenImpl = objetivo ? biseccion((x) => valorarDcf(dcfIn, ctx, base, { dm: x })?.valor_accion - objetivo, -40, 40) : null;
    const margenFinal = n(lista(dcfIn.anios).at(-1)?.margen_ebitda_pct);
    dcf = {
      ...dcfBase,
      wacc: red(wacc, 2), ke: red(ke, 2), kd_despues: red(kdDesp, 2), wacc_tabla: waccTabla,
      potencial_pct: red(pct(vpa - precio, precio)),
      sensibilidad: sens1, sensibilidad2: sens2,
      rango_min: red(Math.min(...interior), 2), rango_max: red(Math.max(...interior), 2),
      inverso: {
        crecimiento_implicito_pct: crecImpl === null ? null : red(crecMedioBase + crecImpl),
        crecimiento_base_pct: red(crecMedioBase),
        margen_implicito_pct: margenImpl === null || margenFinal === null ? null : red(margenFinal + margenImpl),
        margen_base_pct: red(margenFinal),
        rentabilidad_implicita_pct: red(waccImpl, 1),
      },
    };
    const nwcPrimero = n(lista(dcfIn.anios)[0]?.nwc_pct_ventas), nwcReal = balUlt.circulante_ventas_pct ?? null;
    if (nwcPrimero !== null && nwcReal !== null) control('Circulante del primer año de proyección ≈ último real', Math.abs(nwcPrimero - nwcReal) <= 3, `Supuesto ${fmt(nwcPrimero)} % frente a ${fmt(nwcReal)} % real: genera una variación de circulante de ${fmt(dcfBase.proyeccion[0]?.variacion_circulante, 0)} M en el primer año. Converge de forma gradual.`);
    if (wacc !== null && base.g !== null && wacc - base.g < 3) control('WACC − g ≥ 3 puntos', false, `WACC ${red(wacc, 2)} % y g ${base.g} %: el valor terminal se dispara; revisa.`);
    control('Peso del valor terminal ≤ 80 % del valor empresa', dcfBase.peso_terminal_pct <= 80, `${dcfBase.peso_terminal_pct} %.`);
    if (base.g !== null) control('Crecimiento a perpetuidad ≤ 3 %', base.g <= 3, `${base.g} %.`);
  } else {
    control('DCF calculable', false, 'Faltan datos: año base, proyección, WACC o crecimiento terminal.');
  }

  // ── Escenarios (cada uno es el mismo DCF con ajustes) ──
  const escenarios = lista(d.escenarios?.casos).map((e) => {
    const aj = { dg: n(e.ajuste_crecimiento_pp) ?? 0, dm: n(e.ajuste_margen_pp) ?? 0 };
    const p = { ...base, wacc: wacc !== null ? wacc + (n(e.ajuste_wacc_pp) ?? 0) : null, g: n(e.crecimiento_terminal_pct) ?? base.g, multiplo: n(e.multiplo_salida) ?? base.multiplo };
    const r = valorarDcf(dcfIn, ctx, p, aj);
    return {
      escenario: e.escenario, probabilidad_pct: n(e.probabilidad_pct), narrativa: e.narrativa ?? null,
      crecimiento_medio_pct: red((media(lista(dcfIn.anios).map((a) => a.crecimiento_pct)) ?? 0) + aj.dg),
      margen_final_pct: red((n(lista(dcfIn.anios).at(-1)?.margen_ebitda_pct) ?? 0) + aj.dm),
      wacc_pct: red(p.wacc, 1), valor: r ? red(r.valor_accion, 2) : null, potencial_pct: r ? red(pct(r.valor_accion - precio, precio)) : null,
    };
  });
  const probTotal = sumaLaxa(...escenarios.map((e) => e.probabilidad_pct));
  if (escenarios.length) control('Probabilidades de los escenarios suman 100', Math.abs(probTotal - 100) < 0.5, `Suman ${probTotal}.`);
  const valorPonderado = escenarios.length && escenarios.every((e) => e.valor !== null) ? red(escenarios.reduce((a, e) => a + e.valor * (e.probabilidad_pct ?? 0), 0) / (probTotal || 1), 2) : null;

  // ── Comparables ──
  const empresaFila = {
    nombre: id.nombre_corto || id.nombre, ticker: id.ticker, pais: id.pais_iso || null, capitalizacion: red(capitalizacion, 0),
    ev_ventas: red(div(valorEmpresa, ingresosLtm), 2), ev_ebitda_ltm: red(div(valorEmpresa, ebitdaLtm), 1), ev_ebitda_ntm: red(div(valorEmpresa, ebitdaNtm), 1),
    per_ntm: red(div(precio, bpaNtm), 1), crecimiento_pct: red(ingresosNtm && ingresosLtm ? pct(ingresosNtm - ingresosLtm, ingresosLtm) : null),
    margen_ebitda_pct: red(pct(ebitdaLtm, ingresosLtm)), roic_pct: rentUlt.roic_pct ?? null, dn_ebitda: red(div(deudaNeta, ebitdaLtm), 1),
    fcf_yield_pct: red(pct(fcfLtm, capitalizacion)), es_objetivo: true,
  };
  const pares = lista(d.comparables?.empresas).map((c) => ({ ...c, es_objetivo: false }));
  const camposMult = ['ev_ventas', 'ev_ebitda_ltm', 'ev_ebitda_ntm', 'per_ntm', 'crecimiento_pct', 'margen_ebitda_pct', 'roic_pct', 'dn_ebitda', 'fcf_yield_pct'];
  const estad = [['Mediana', 50], ['Media', null], ['Percentil 25', 25], ['Percentil 75', 75]].map(([nombre, p]) => ({
    estadistico: nombre, ...Object.fromEntries(camposMult.map((c) => [c, red(p === null ? media(pares.map((x) => x[c])) : percentil(pares.map((x) => x[c]), p), 1)])),
  }));
  const deEv = (ev) => (ev === null || !acciones ? null : (ev - deudaNeta - ajustesPuente) / acciones);
  const implicito = [];
  const filaImpl = (metodo, campo, metrica, esEv) => {
    const vals = pares.map((x) => x[campo]);
    if (validos(vals).length < 3 || metrica === null) return;
    const aValor = (m) => (esEv ? deEv(m * metrica) : m * metrica);
    implicito.push({
      metodo, metrica_empresa: red(metrica, 2),
      multiplo_p25: red(percentil(vals, 25), 1), multiplo_mediana: red(mediana(vals), 1), multiplo_p75: red(percentil(vals, 75), 1),
      multiplos: `${fmt(percentil(vals, 25), 1)}x / ${fmt(mediana(vals), 1)}x / ${fmt(percentil(vals, 75), 1)}x`,
      valor_p25: red(aValor(percentil(vals, 25)), 2), valor_mediana: red(aValor(mediana(vals)), 2), valor_p75: red(aValor(percentil(vals, 75)), 2),
    });
  };
  filaImpl('EV/EBITDA próximos 12 meses', 'ev_ebitda_ntm', ebitdaNtm, true);
  filaImpl('EV/EBITDA últimos 12 meses', 'ev_ebitda_ltm', ebitdaLtm, true);
  filaImpl('PER próximos 12 meses', 'per_ntm', bpaNtm, false);
  filaImpl('EV/Ventas últimos 12 meses', 'ev_ventas', ingresosLtm, true);
  for (const f of implicito) f.potencial_pct = red(pct(f.valor_mediana - precio, precio));
  const regresion = regresionLineal(pares.map((x) => [n(x.crecimiento_pct), n(x.ev_ebitda_ntm)]));
  if (regresion && empresaFila.crecimiento_pct !== null && ebitdaNtm !== null) {
    regresion.multiplo_ajustado = red(regresion.ordenada + regresion.pendiente * empresaFila.crecimiento_pct, 1);
    regresion.valor_accion = red(deEv(regresion.multiplo_ajustado * ebitdaNtm), 2);
    regresion.pendiente = red(regresion.pendiente, 2); regresion.ordenada = red(regresion.ordenada, 1); regresion.r2 = red(regresion.r2, 2);
  }
  control('Al menos 5 comparables', pares.length >= 5, `${pares.length} comparables.`);

  // ── Transacciones precedentes ──
  const ops = lista(d.transacciones?.operaciones);
  const evEbitdaOps = ops.map((o) => o.ev_ebitda);
  const transacciones = validos(evEbitdaOps).length >= 3 && ebitdaLtm !== null ? {
    n: ops.length, mediana_ev_ebitda: red(mediana(evEbitdaOps), 1), p25_ev_ebitda: red(percentil(evEbitdaOps, 25), 1), p75_ev_ebitda: red(percentil(evEbitdaOps, 75), 1),
    mediana_ev_ventas: red(mediana(ops.map((o) => o.ev_ventas)), 2), prima_mediana_pct: red(mediana(ops.map((o) => o.prima_pct)), 0),
    valor_p25: red(deEv(percentil(evEbitdaOps, 25) * ebitdaLtm), 2), valor_mediana: red(deEv(mediana(evEbitdaOps) * ebitdaLtm), 2), valor_p75: red(deEv(percentil(evEbitdaOps, 75) * ebitdaLtm), 2),
  } : null;

  // ── Suma de partes ──
  let sumaPartes = null;
  if (d.suma_partes?.aplica && lista(d.suma_partes.partes).length) {
    const partes = d.suma_partes.partes.map((p) => ({ ...p, ev: red(n(p.valor_metrica) * n(p.multiplo), 0) }));
    const evTotal = sumaLaxa(...partes.map((p) => p.ev)) * (1 - (n(d.suma_partes.descuento_holding_pct) ?? 0) / 100);
    const conAjuste = (dm) => deEv(sumaLaxa(...partes.map((p) => n(p.valor_metrica) * (n(p.multiplo) + dm))) * (1 - (n(d.suma_partes.descuento_holding_pct) ?? 0) / 100));
    sumaPartes = { partes, ev_total: red(evTotal, 0), valor_accion: red(deEv(evTotal), 2), valor_min: red(conAjuste(-1), 2), valor_max: red(conAjuste(1), 2), potencial_pct: red(pct(deEv(evTotal) - precio, precio)) };
  }

  // ── Múltiplos históricos ──
  const serieMult = lista(d.multiplos_historicos?.serie);
  const multHist = [['EV/EBITDA próximos 12 meses', 'ev_ebitda_ntm', empresaFila.ev_ebitda_ntm], ['PER próximos 12 meses', 'per_ntm', empresaFila.per_ntm]].map(([metrica, campo, actual]) => {
    const vals = serieMult.map((s) => s[campo]);
    const v = validos(vals);
    return {
      metrica, actual, media: red(media(vals), 1), minimo: v.length ? red(Math.min(...v), 1) : null, maximo: v.length ? red(Math.max(...v), 1) : null,
      percentil: actual !== null && v.length ? red((100 * v.filter((x) => x <= actual).length) / v.length, 0) : null,
      prima_pct: red(pct(actual - media(vals), media(vals)), 0),
    };
  });
  const serieMultGraf = serieMult.map((s) => ({ anio: s.anio, ev_ebitda_ntm: n(s.ev_ebitda_ntm), media: multHist[0].media }));

  // ── Consenso frente a la proyección propia ──
  const proy = dcf?.proyeccion ?? [];
  const consensoVsPropio = estim.map((e) => {
    const p = proy.find((x) => anioDe(x.periodo) === anioDe(e.periodo));
    return p ? {
      periodo: e.periodo, ingresos_propio: p.ingresos, ingresos_consenso: n(e.ingresos), ingresos_dif_pct: red(pct(p.ingresos - n(e.ingresos), n(e.ingresos))),
      ebitda_propio: p.ebitda, ebitda_consenso: n(e.ebitda), ebitda_dif_pct: red(pct(p.ebitda - n(e.ebitda), n(e.ebitda))),
    } : null;
  }).filter(Boolean);
  for (const c of consensoVsPropio) {
    if (Math.abs(c.ebitda_dif_pct ?? 0) > 15) control(`Proyección propia frente a consenso (${c.periodo})`, false, `EBITDA propio ${c.ebitda_dif_pct} % frente al consenso: justifica la diferencia en el DCF.`);
  }

  // ── Gobierno ──
  const gobierno = puntuarGobierno(d.gobierno || {}, d.calidad || {}, fechaCorte);

  // ── Síntesis de valoración ──
  const po = d.consenso?.recomendaciones || {};
  const rangos = [];
  const fila = (metodo, min, central, max, gris = false) => { if ([min, max].every((x) => x !== null && x !== undefined && Number.isFinite(x))) rangos.push({ metodo, etiqueta: `${metodo} (${fmt(min, 2)} – ${fmt(max, 2)})`, min: red(min, 2), central: red(central, 2), max: red(max, 2), gris }); };
  fila('Cotización 52 semanas', n(id.min_52s), precio, n(id.max_52s), true);
  fila('Precio objetivo de los analistas', n(po.po_min), n(po.po_medio), n(po.po_max), true);
  const implNtm = implicito.find((x) => x.metodo.startsWith('EV/EBITDA próximos'));
  const implPer = implicito.find((x) => x.metodo.startsWith('PER'));
  if (implNtm) fila('Comparables: EV/EBITDA NTM', implNtm.valor_p25, implNtm.valor_mediana, implNtm.valor_p75);
  if (implPer) fila('Comparables: PER NTM', implPer.valor_p25, implPer.valor_mediana, implPer.valor_p75);
  if (transacciones) fila('Transacciones precedentes', transacciones.valor_p25, transacciones.valor_mediana, transacciones.valor_p75);
  if (dcf) fila('DCF (WACC y g ± 0,5)', dcf.rango_min, dcf.valor_accion, dcf.rango_max);
  if (escenarios.length >= 2) fila('Escenarios (bajista – alcista)', Math.min(...escenarios.map((e) => e.valor)), valorPonderado, Math.max(...escenarios.map((e) => e.valor)));
  if (sumaPartes) fila('Suma de partes', sumaPartes.valor_min, sumaPartes.valor_accion, sumaPartes.valor_max);
  if (precio !== null) rangos.push({ metodo: 'Precio actual', etiqueta: `Precio actual (${fmt(precio, 2)})`, min: red(precio * 0.995, 2), central: precio, max: red(precio * 1.005, 2), gris: true });

  const pesos = d.valoracion?.pesos || {};
  const centrales = {
    dcf: dcf?.valor_accion ?? null,
    comparables: media([implNtm?.valor_mediana, implPer?.valor_mediana].filter((x) => x !== undefined && x !== null)),
    transacciones: transacciones?.valor_mediana ?? null,
    suma_partes: sumaPartes?.valor_accion ?? null,
    escenarios: valorPonderado,
  };
  let sumaPesos = 0, acumulado2 = 0;
  const tablaSintesis = Object.entries(centrales).map(([k, v]) => {
    const p = n(pesos[k]) ?? 0;
    if (v !== null && p > 0) { sumaPesos += p; acumulado2 += v * p; }
    return { metodo: { dcf: 'DCF', comparables: 'Comparables (mediana EV/EBITDA y PER)', transacciones: 'Transacciones precedentes', suma_partes: 'Suma de partes', escenarios: 'Escenarios ponderados' }[k], valor: red(v, 2), peso_pct: v === null ? null : p, potencial_pct: red(pct(v - precio, precio)) };
  }).filter((x) => x.valor !== null);
  const pesosDeclarados = sumaLaxa(...Object.values(pesos).map(n));
  control('Pesos de la síntesis suman 100', Math.abs(pesosDeclarados - 100) < 0.5, `Suman ${pesosDeclarados}.`);
  const valorObjetivo = sumaPesos ? red(acumulado2 / sumaPesos, 2) : null;

  // ── Múltiplos clave para la ficha ──
  const clave = {
    capitalizacion: red(capitalizacion, 0), valor_empresa: red(valorEmpresa, 0), deuda_neta: red(deudaNeta, 0),
    ev_ventas_ltm: empresaFila.ev_ventas, ev_ebitda_ltm: empresaFila.ev_ebitda_ltm, ev_ebitda_ntm: empresaFila.ev_ebitda_ntm,
    ev_ebit_ltm: red(div(valorEmpresa, ebitLtm), 1), per_ltm: red(div(precio, bpaLtm), 1), per_ntm: empresaFila.per_ntm,
    fcf_yield_pct: empresaFila.fcf_yield_pct, dividendo_pct: red(pct(n(ltm.dpa) ?? ultimoCalc.dpa ?? null, precio)),
    dn_ebitda: red(div(deudaNeta, ebitdaLtm), 1), roic_pct: rentUlt.roic_pct ?? null, margen_ebitda_pct: empresaFila.margen_ebitda_pct,
    crecimiento_tcac_pct: tcacTabla.ingresos_pct ?? null, ingresos_ntm: red(ingresosNtm, 0), ebitda_ntm: red(ebitdaNtm, 0), bpa_ntm: red(bpaNtm, 2),
    ebitda_ltm: red(ebitdaLtm, 0), ingresos_ltm: red(ingresosLtm, 0),
  };

  // ── Controles de mercado y fuentes ──
  if (n(id.capitalizacion_publicada) !== null && capitalizacion !== null) {
    control('Capitalización calculada ≈ publicada', Math.abs(capitalizacion - n(id.capitalizacion_publicada)) <= 0.03 * capitalizacion, `Calculada ${red(capitalizacion, 0)}, publicada ${id.capitalizacion_publicada}: revisa acciones y precio.`);
  }
  if (balUlt.deuda_neta !== null && balUlt.deuda_neta !== undefined && deudaNeta !== null && Math.abs(balUlt.deuda_neta - deudaNeta) > 0.25 * Math.max(Math.abs(deudaNeta), 1) + 5) {
    control('Deuda neta del puente frente al último balance anual', false, `Puente ${red(deudaNeta, 0)} frente a ${red(balUlt.deuda_neta, 0)} al cierre: correcto si hay un balance trimestral más reciente; dilo.`);
  }
  for (const s of NUCLEO) if (vacioProfundo(d[s])) control(`Sección de núcleo con datos: ${s}`, false, 'Llega vacía: el informe la omite y avisa en el resumen. Tres búsquedas registradas en meta.huecos.');
  const huecos = lista(meta.huecos);
  for (const h of huecos) if (!h.intentos || String(h.intentos).split(/;|\n/).filter((x) => x.trim()).length < 3) control(`Tres búsquedas registradas (${h.seccion} · ${h.campo})`, false, 'Cada hueco debe documentar tres intentos distintos antes de desistir.');
  const fuentes = revisarFuentes(d);
  control('Al menos 25 fuentes', fuentes.n_fuentes >= 25, `${fuentes.n_fuentes} fuentes (${fuentes.n_primarias} primarias).`);
  control('Al menos 10 fuentes primarias', fuentes.n_primarias >= 10, `${fuentes.n_primarias}.`);
  control('Toda cita [n] existe en fuentes', fuentes.citas_sin_fuente.length === 0, fuentes.citas_sin_fuente.length ? `No existen: ${fuentes.citas_sin_fuente.join(', ')}.` : '');
  control('Toda fuente se cita al menos una vez', fuentes.fuentes_sin_citar.length === 0, fuentes.fuentes_sin_citar.length ? `Sin citar: ${fuentes.fuentes_sin_citar.join(', ')}.` : '');

  d.calc = {
    version: 2, mercado, clave, cuenta, tcac: tcacTabla,
    cuenta_y_prevision: [...cuenta.map((c) => ({ periodo: c.periodo, ingresos: c.ingresos, ebitda: c.ebitda })), ...proy.map((p) => ({ periodo: p.periodo, ingresos: p.ingresos, ebitda: p.ebitda }))],
    segmentos_ultimo: segmentosUltimo, segmentos_tabla: segmentosTabla, segmentos_periodo: ultPerSeg ?? null,
    balance, flujos, flujos_acumulado: acumulado, rentabilidad, roic_incremental_pct: roicIncremental,
    roic_frente_wacc: rentabilidad.map((r) => ({ periodo: r.periodo, roic_pct: r.roic_pct, roe_pct: r.roe_pct, wacc_pct: red(wacc, 1) })),
    calidad: scores, dcf, escenarios, valor_ponderado: valorPonderado, potencial_ponderado_pct: red(pct(valorPonderado - precio, precio)),
    comparables: { tabla: [empresaFila, ...pares], estadisticos: estad, implicito, regresion, n: pares.length },
    transacciones, suma_partes: sumaPartes, multiplos_historicos: multHist, multiplos_serie: serieMultGraf,
    consenso_vs_propio: consensoVsPropio, gobierno,
    competidores_margen: [{ nombre: id.nombre_corto || id.nombre, margen_ebit_pct: ultimoCalc.margen_ebit_pct ?? null }, ...lista(d.competencia?.competidores).map((c) => ({ nombre: c.nombre, margen_ebit_pct: n(c.margen_ebit_pct) }))],
    sintesis: { rangos, tabla: tablaSintesis, valor_objetivo: valorObjetivo, potencial_pct: red(pct(valorObjetivo - precio, precio)) },
    fuentes, controles,
    controles_resumen: `${controles.filter((c) => c.resultado === 'OK').length} de ${controles.length} controles correctos`,
  };
  return d;
}

// ───────────────────────────── DCF ─────────────────────────────

function valorarDcf(dcfIn, ctx, p, aj = {}) {
  const proy = lista(dcfIn.anios);
  const base = ctx.cuentaUlt;
  if (!proy.length || n(base.ingresos) === null || p.wacc === null || p.wacc === undefined || !ctx.acciones) return null;
  if (p.metodo !== 'multiplo' && (p.g === null || p.wacc <= p.g)) return null;
  const wacc = p.wacc / 100;
  let ingresos = n(base.ingresos);
  let nwcAnt = ctx.nwcBase ?? (ingresos * (n(proy[0].nwc_pct_ventas) ?? 0)) / 100;
  const filas = [];
  let sumaVp = 0;
  for (const a of proy) {
    const anio = anioDe(a.periodo);
    const g = (n(a.crecimiento_pct) ?? 0) + (aj.dg ?? 0);
    ingresos *= 1 + g / 100;
    const margen = (n(a.margen_ebitda_pct) ?? 0) + (aj.dm ?? 0);
    const ebitda = (ingresos * margen) / 100;
    const da = (ingresos * (n(a.amortizacion_pct_ventas) ?? 0)) / 100;
    const ebit = ebitda - da;
    const impuestos = (Math.max(0, ebit) * (n(a.tasa_impositiva_pct) ?? 25)) / 100;
    const capex = (ingresos * (n(a.capex_pct_ventas) ?? 0)) / 100;
    const nwc = (ingresos * (n(a.nwc_pct_ventas) ?? 0)) / 100;
    const dnwc = nwc - nwcAnt; nwcAnt = nwc;
    const fcff = ebit - impuestos + da - capex - dnwc;
    const fin = finEjercicio(anio, ctx.mesCierre), ini = finEjercicio(anio - 1, ctx.mesCierre);
    const fraccion = Math.min(1, Math.max(0, anios(ctx.fechaCorte > ini ? ctx.fechaCorte : ini, fin)));
    const t = Math.max(0, anios(ctx.fechaCorte, fin) - (p.mitad ? fraccion / 2 : 0));
    const fd = (1 + wacc) ** -t;
    const vp = fcff * fraccion * fd;
    sumaVp += vp;
    filas.push({ periodo: a.periodo, ingresos, crecimiento_pct: g, ebitda, margen_ebitda_pct: margen, amortizacion: da, ebit, impuestos, capex, variacion_circulante: dnwc, fcff, fraccion, factor: fd, vp, t_fin: anios(ctx.fechaCorte, fin) });
  }
  const ult = filas[filas.length - 1];
  const g = (p.g ?? 0) / 100;
  const vtGordon = p.wacc > (p.g ?? -99) ? (ult.fcff * (1 + g)) / (wacc - g) : null;
  const vtMultiplo = p.multiplo !== null && p.multiplo !== undefined ? p.multiplo * ult.ebitda : null;
  const vt = p.metodo === 'multiplo' ? vtMultiplo : p.metodo === 'media' && vtMultiplo !== null && vtGordon !== null ? (vtGordon + vtMultiplo) / 2 : vtGordon;
  if (vt === null) return null;
  const fdT = (1 + wacc) ** -ult.t_fin;
  const vpVt = vt * fdT;
  const ev = sumaVp + vpVt;
  const equity = ev - ctx.deudaNeta - ctx.ajustesPuente;
  const vpa = equity / ctx.acciones;
  // implícitos cruzados
  const multImpl = vtGordon !== null ? vtGordon / ult.ebitda : null;
  const gImpl = vtMultiplo !== null ? ((vtMultiplo * wacc - ult.fcff) / (vtMultiplo + ult.fcff)) * 100 : null;
  return {
    proyeccion: filas.map((f) => ({
      periodo: f.periodo, ingresos: red(f.ingresos, 0), crecimiento_pct: red(f.crecimiento_pct), ebitda: red(f.ebitda, 0), margen_ebitda_pct: red(f.margen_ebitda_pct),
      amortizacion: red(f.amortizacion, 0), ebit: red(f.ebit, 0), impuestos: red(f.impuestos, 0), capex: red(f.capex, 0), variacion_circulante: red(f.variacion_circulante, 0),
      fcff: red(f.fcff, 0), fraccion: red(f.fraccion, 2), factor: red(f.factor, 3), vp: red(f.vp, 0),
    })),
    suma_vp: red(sumaVp, 0), valor_terminal: red(vt, 0), vp_terminal: red(vpVt, 0), valor_empresa: red(ev, 0),
    peso_terminal_pct: red(pct(vpVt, ev), 0), valor_acciones: red(equity, 0), valor_accion: red(vpa, 2),
    vt_gordon: red(vtGordon, 0), vt_multiplo: red(vtMultiplo, 0), multiplo_implicito: red(multImpl, 1), g_implicito_pct: red(gImpl, 2),
    metodo_terminal: p.metodo,
    terminal_tabla: [
      { concepto: 'Método principal', valor: { gordon: 'Crecimiento a perpetuidad', multiplo: 'Múltiplo de salida', media: 'Media de ambos' }[p.metodo] || p.metodo },
      { concepto: 'Crecimiento a perpetuidad', valor: p.g === null || p.g === undefined ? 'n.d.' : `${fmt(p.g, 1)} %` },
      { concepto: 'Múltiplo EV/EBITDA de salida', valor: p.multiplo === null || p.multiplo === undefined ? 'n.d.' : `${fmt(p.multiplo, 1)}x` },
      { concepto: 'Valor terminal (Gordon)', valor: fmt(vtGordon, 0) },
      { concepto: 'Valor terminal (múltiplo)', valor: fmt(vtMultiplo, 0) },
      { concepto: 'Múltiplo de salida implícito en Gordon', valor: multImpl === null ? 'n.d.' : `${fmt(multImpl, 1)}x` },
      { concepto: 'Crecimiento implícito en el múltiplo', valor: gImpl === null ? 'n.d.' : `${fmt(gImpl, 2)} %` },
      { concepto: 'Peso del valor terminal en el valor empresa', valor: `${fmt(pct(vpVt, ev), 0)} %` },
    ],
    puente: [
      { concepto: 'Valor actual de los flujos proyectados', valor: fmt(sumaVp, 0) },
      { concepto: 'Valor actual del valor terminal', valor: fmt(vpVt, 0) },
      { concepto: 'Valor empresa', valor: fmt(ev, 0) },
      { concepto: '− Deuda financiera neta (con arrendamientos)', valor: fmt(-ctx.deudaNeta, 0) },
      { concepto: '− Minoritarios, pensiones y otros; + asociadas', valor: fmt(-ctx.ajustesPuente, 0) },
      { concepto: 'Valor de los fondos propios', valor: fmt(equity, 0) },
      { concepto: 'Acciones diluidas (millones)', valor: fmt(ctx.acciones, 1) },
      { concepto: 'Valor por acción', valor: fmt(vpa, 2) },
    ],
    composicion: [{ parte: 'Flujos proyectados', valor: red(sumaVp, 0) }, { parte: 'Valor terminal', valor: red(vpVt, 0) }],
  };
}

function biseccion(f, a, b, iter = 60) {
  let fa = f(a), fb = f(b);
  if (!Number.isFinite(fa) || !Number.isFinite(fb) || fa * fb > 0) return null;
  for (let i = 0; i < iter; i++) {
    const m = (a + b) / 2, fm = f(m);
    if (!Number.isFinite(fm)) return null;
    if (Math.abs(fm) < 1e-6) return m;
    if (fa * fm < 0) { b = m; fb = fm; } else { a = m; fa = fm; }
  }
  return (a + b) / 2;
}

function regresionLineal(puntos) {
  const p = puntos.filter(([x, y]) => x !== null && y !== null);
  if (p.length < 4) return null;
  const mx = p.reduce((a, [x]) => a + x, 0) / p.length, my = p.reduce((a, [, y]) => a + y, 0) / p.length;
  const sxx = p.reduce((a, [x]) => a + (x - mx) ** 2, 0), sxy = p.reduce((a, [x, y]) => a + (x - mx) * (y - my), 0);
  if (!sxx) return null;
  const pendiente = sxy / sxx, ordenada = my - pendiente * mx;
  const sst = p.reduce((a, [, y]) => a + (y - my) ** 2, 0), sse = p.reduce((a, [x, y]) => a + (y - ordenada - pendiente * x) ** 2, 0);
  return { pendiente, ordenada, r2: sst ? 1 - sse / sst : null, n: p.length };
}

// ───────────────────────── calidad contable ─────────────────────────

function calidadContable(cuenta, balance, flujos, capitalizacion) {
  const porPer = (arr, per) => arr.find((x) => String(x.periodo) === String(per)) || {};
  const pers = cuenta.map((c) => String(c.periodo)).filter((p) => balance.some((b) => String(b.periodo) === p));
  const t = pers[pers.length - 1], t1 = pers[pers.length - 2];
  const tabla = [];
  const res = { periodo: t ?? null };
  if (!t) return { ...res, tabla };
  const c = porPer(cuenta, t), b = porPer(balance, t), f = porPer(flujos, t);
  const ca = porPer(cuenta, t1), ba = porPer(balance, t1), fa = porPer(flujos, t1);
  const N = (o, k) => n(o[k]);

  // Altman Z (versión original para cotizadas)
  const at = N(b, 'activo_total'), pt = N(b, 'pasivo_total');
  if (at && pt && capitalizacion) {
    const z = 1.2 * ((N(b, 'activo_corriente') - N(b, 'pasivo_corriente')) / at) + 1.4 * ((N(b, 'reservas') ?? 0) / at) + 3.3 * (N(c, 'ebit') / at) + 0.6 * (capitalizacion / pt) + 1.0 * (N(c, 'ingresos') / at);
    if (Number.isFinite(z)) {
      res.altman_z = red(z, 2);
      res.altman_zona = z > 2.99 ? 'Zona segura' : z >= 1.81 ? 'Zona gris' : 'Zona de riesgo';
      tabla.push({ indicador: 'Altman Z', valor: fmt(z, 2), lectura: `${res.altman_zona} (> 2,99 seguro; < 1,81 riesgo). No aplica a bancos ni aseguradoras.` });
    }
  }
  // Piotroski F
  if (t1) {
    const roa = (cc, bb) => div(N(cc, 'beneficio_neto'), N(bb, 'activo_total'));
    const crit = [
      ['Beneficio neto positivo', N(c, 'beneficio_neto') > 0],
      ['Flujo operativo positivo', N(f, 'flujo_operativo') > 0],
      ['ROA mejora', roa(c, b) !== null && roa(ca, ba) !== null ? roa(c, b) > roa(ca, ba) : null],
      ['Flujo operativo > beneficio neto', N(f, 'flujo_operativo') !== null && N(c, 'beneficio_neto') !== null ? N(f, 'flujo_operativo') > N(c, 'beneficio_neto') : null],
      ['Baja el endeudamiento (deuda / activo)', div(N(b, 'deuda_financiera'), at) !== null && div(N(ba, 'deuda_financiera'), N(ba, 'activo_total')) !== null ? div(N(b, 'deuda_financiera'), at) <= div(N(ba, 'deuda_financiera'), N(ba, 'activo_total')) : null],
      ['Mejora la liquidez corriente', div(N(b, 'activo_corriente'), N(b, 'pasivo_corriente')) !== null && div(N(ba, 'activo_corriente'), N(ba, 'pasivo_corriente')) !== null ? div(N(b, 'activo_corriente'), N(b, 'pasivo_corriente')) > div(N(ba, 'activo_corriente'), N(ba, 'pasivo_corriente')) : null],
      ['No emite acciones', N(c, 'acciones_diluidas') !== null && N(ca, 'acciones_diluidas') !== null ? N(c, 'acciones_diluidas') <= N(ca, 'acciones_diluidas') * 1.005 : null],
      ['Mejora el margen bruto', N(c, 'coste_ventas') !== null && N(ca, 'coste_ventas') !== null ? 1 - N(c, 'coste_ventas') / N(c, 'ingresos') > 1 - N(ca, 'coste_ventas') / N(ca, 'ingresos') : null],
      ['Mejora la rotación del activo', div(N(c, 'ingresos'), at) !== null && div(N(ca, 'ingresos'), N(ba, 'activo_total')) !== null ? div(N(c, 'ingresos'), at) > div(N(ca, 'ingresos'), N(ba, 'activo_total')) : null],
    ];
    const conDato = crit.filter(([, v]) => v !== null && v !== undefined);
    res.piotroski_f = conDato.filter(([, v]) => v).length;
    res.piotroski_detalle = crit.map(([criterio, v]) => ({ criterio, resultado: v === null || v === undefined ? 'n.d.' : v ? 'Sí' : 'No' }));
    tabla.push({ indicador: 'Piotroski F', valor: `${res.piotroski_f} / ${conDato.length}`, lectura: res.piotroski_f >= 7 ? 'Fortaleza financiera alta (7-9).' : res.piotroski_f <= 3 ? 'Debilidad (0-3).' : 'Intermedio (4-6).' });
    // Beneish M (8 variables)
    const S = N(c, 'ingresos'), Sa = N(ca, 'ingresos');
    const ar = N(b, 'clientes'), ara = N(ba, 'clientes');
    const gm = S ? 1 - N(c, 'coste_ventas') / S : null, gma = Sa ? 1 - N(ca, 'coste_ventas') / Sa : null;
    const ppe = N(b, 'inmovilizado_material'), ppea = N(ba, 'inmovilizado_material');
    const ata = N(ba, 'activo_total');
    const dep = N(c, 'amortizaciones'), depa = N(ca, 'amortizaciones');
    const sga = N(c, 'gastos_generales'), sgaa = N(ca, 'gastos_generales');
    const v = {
      DSRI: div(div(ar, S), div(ara, Sa)), GMI: div(gma, gm),
      AQI: div(1 - (N(b, 'activo_corriente') + ppe) / at, 1 - (N(ba, 'activo_corriente') + ppea) / ata),
      SGI: div(S, Sa), DEPI: div(div(depa, depa + ppea), div(dep, dep + ppe)),
      SGAI: sga !== null && sgaa !== null ? div(div(sga, S), div(sgaa, Sa)) : 1,
      LVGI: div(div(pt, at), div(N(ba, 'pasivo_total'), ata)),
      TATA: div(N(c, 'beneficio_neto') - N(f, 'flujo_operativo'), at),
    };
    if (Object.values(v).every((x) => x !== null && Number.isFinite(x))) {
      const m = -4.84 + 0.92 * v.DSRI + 0.528 * v.GMI + 0.404 * v.AQI + 0.892 * v.SGI + 0.115 * v.DEPI - 0.172 * v.SGAI + 4.679 * v.TATA - 0.327 * v.LVGI;
      res.beneish_m = red(m, 2);
      res.beneish_variables = Object.entries(v).map(([k, x]) => ({ variable: k, valor: red(x, 2) }));
      tabla.push({ indicador: 'Beneish M', valor: fmt(m, 2), lectura: m > -1.78 ? 'Por encima de −1,78: perfil compatible con manipulación de beneficios; revisar a fondo.' : 'Por debajo de −1,78: sin señal de manipulación.' });
    }
  }
  // Devengos (accruals) acumulados
  const bnTot = sumaLaxa(...cuenta.map((x) => n(x.beneficio_neto))), cfoTot = sumaLaxa(...flujos.map((x) => n(x.flujo_operativo)));
  if (bnTot && cfoTot) tabla.push({ indicador: 'Flujo operativo / beneficio neto (acumulado)', valor: `${fmt(cfoTot / bnTot, 2)}x`, lectura: cfoTot / bnTot >= 1 ? 'El beneficio se cobra.' : 'El beneficio se cobra solo en parte: mirar circulante y ajustes.' });
  return { ...res, tabla };
}

// ───────────────────────────── gobierno ─────────────────────────────

function puntuarGobierno(g, calidad, fechaCorte) {
  const consejo = lista(g.consejo);
  const nCons = consejo.length;
  const tipos = {};
  for (const c of consejo) tipos[c.tipo || 'Sin clasificar'] = (tipos[c.tipo || 'Sin clasificar'] || 0) + 1;
  const indep = tipos.Independiente || 0;
  const indepPct = nCons ? (100 * indep) / nCons : null;
  const anioCorte = fechaCorte.getUTCFullYear();
  const antig = consejo.map((c) => (anioDe(c.desde) ? anioCorte - anioDe(c.desde) : null));
  const indepLargos = consejo.filter((c, i) => c.tipo === 'Independiente' && antig[i] !== null && antig[i] > 12).length;
  const mayor = Math.max(0, ...lista(g.accionistas).map((a) => n(a.pct) ?? 0));
  const ins = lista(g.insiders);
  const compras = sumaLaxa(...ins.filter((x) => /compra/i.test(x.operacion)).map((x) => n(x.importe)));
  const ventas = sumaLaxa(...ins.filter((x) => /venta/i.test(x.operacion)).map((x) => n(x.importe)));
  const b = (v) => (v === null || v === undefined ? null : !!v);
  const crit = [
    ['Consejeros independientes ≥ 50 % (≥ 33 % si hay accionista de control)', indepPct === null ? null : indepPct >= 50 || (mayor >= 30 && indepPct >= 33), indepPct === null ? 'n.d.' : `${fmt(indepPct, 0)} %`],
    ['Presidente y consejero delegado separados, o consejero coordinador independiente', g.presidente_ceo_separados === null || g.presidente_ceo_separados === undefined ? null : g.presidente_ceo_separados || !!g.consejero_coordinador, g.presidente_ceo_separados ? 'Separados' : g.consejero_coordinador ? 'Coordinador' : 'No'],
    ['Ningún independiente con más de 12 años en el consejo', nCons ? indepLargos === 0 : null, `${indepLargos}`],
    ['Voto a favor de la remuneración ≥ 80 %', n(g.voto_remuneracion_pct) === null ? null : n(g.voto_remuneracion_pct) >= 80, n(g.voto_remuneracion_pct) === null ? 'n.d.' : `${fmt(n(g.voto_remuneracion_pct), 1)} %`],
    ['Variable a largo plazo ligado a rentabilidad (ROIC, TSR, FCF)', b(g.variable_ligado_rentabilidad), g.variable_ligado_rentabilidad ? 'Sí' : g.variable_ligado_rentabilidad === false ? 'No' : 'n.d.'],
    ['Una acción, un voto, sin blindajes', b(g.una_accion_un_voto), g.una_accion_un_voto ? 'Sí' : g.una_accion_un_voto === false ? 'No' : 'n.d.'],
    ['Sin operaciones vinculadas relevantes', g.operaciones_vinculadas_relevantes === null || g.operaciones_vinculadas_relevantes === undefined ? null : !g.operaciones_vinculadas_relevantes, g.operaciones_vinculadas_relevantes ? 'Hay' : 'No hay'],
    ['Auditor con 10 años o menos en el cargo', n(calidad.anios_auditor) === null ? null : n(calidad.anios_auditor) <= 10, n(calidad.anios_auditor) === null ? 'n.d.' : `${calidad.anios_auditor} años`],
    ['Opinión de auditoría sin salvedades', calidad.opinion ? /favorable|limpia|sin salvedades/i.test(calidad.opinion) && !/con salvedades/i.test(calidad.opinion) : null, calidad.opinion ?? 'n.d.'],
    ['Directivos compradores netos en 12 meses (o sin ventas relevantes)', ins.length ? compras >= ventas : null, ins.length ? `Compras ${fmt(compras, 1)} / ventas ${fmt(ventas, 1)}` : 'Sin operaciones'],
  ];
  const conDato = crit.filter(([, v]) => v !== null);
  const ok = conDato.filter(([, v]) => v).length;
  return {
    n_consejeros: nCons, independientes_pct: red(indepPct, 0), antiguedad_media: red(media(antig), 1),
    composicion: Object.entries(tipos).map(([tipo, num]) => ({ tipo, num })),
    checklist: crit.map(([criterio, v, valor]) => ({ criterio, resultado: v === null ? 'n.d.' : v ? 'Cumple' : 'No cumple', valor })),
    puntuacion: `${ok} de ${conDato.length}`, puntuacion_pct: conDato.length ? red((100 * ok) / conDato.length, 0) : null,
    compras_insiders: red(compras, 2), ventas_insiders: red(ventas, 2),
  };
}

// ───────────────────────────── fuentes ─────────────────────────────

function revisarFuentes(d) {
  const fuentes = lista(d.fuentes);
  const ids = new Set(fuentes.map((f) => String(f.id)));
  const citadas = new Set();
  const recorrer = (v) => {
    if (typeof v === 'string') {
      for (const m of v.matchAll(/\[(\d+(?:\s*[,;–-]\s*\d+)*)\]/g)) {
        for (const parte of m[1].split(/\s*[,;]\s*/)) {
          const r = parte.split(/\s*[–-]\s*/).map(Number);
          if (r.length === 2 && r[1] >= r[0] && r[1] - r[0] < 50) for (let i = r[0]; i <= r[1]; i++) citadas.add(String(i));
          else citadas.add(String(r[0]));
        }
      }
    } else if (Array.isArray(v)) v.forEach(recorrer);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (k !== 'fuentes' && k !== 'calc') recorrer(x);
  };
  recorrer(d);
  return {
    n_fuentes: fuentes.length,
    n_primarias: fuentes.filter((f) => /primaria/i.test(f.tipo || '')).length,
    por_tipo: Object.entries(fuentes.reduce((a, f) => ((a[f.tipo || 'Sin tipo'] = (a[f.tipo || 'Sin tipo'] || 0) + 1), a), {})).map(([tipo, num]) => ({ tipo, num })),
    n_citadas: citadas.size,
    citas_sin_fuente: [...citadas].filter((c) => !ids.has(c)).sort((a, b) => a - b),
    fuentes_sin_citar: [...ids].filter((i) => !citadas.has(i)).sort((a, b) => a - b),
  };
}

function fmt(v, dec = 1) {
  if (v === null || v === undefined || !Number.isFinite(v)) return 'n.d.';
  const [e, dd] = Math.abs(v).toFixed(dec).split('.');
  return (v < 0 ? '-' : '') + e.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (dd ? ',' + dd : '');
}

// ───────────────────────────── CLI ─────────────────────────────

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const a = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1];
  if (!a.datos) { console.error('Uso: node calcular-empresa.mjs --datos datos.json [--salida datos.json]'); process.exit(1); }
  const datos = JSON.parse(readFileSync(a.datos, 'utf8'));
  const r = calcularEmpresa(datos);
  writeFileSync(a.salida || a.datos, JSON.stringify(r, null, 2));
  const c = r.calc;
  const linea = (t, v) => console.log(`  ${t.padEnd(38)} ${v}`);
  console.log(`Cálculos guardados en ${a.salida || a.datos}\n`);
  console.log('Mercado');
  linea('Capitalización / valor empresa', `${fmt(c.mercado.capitalizacion, 0)} / ${fmt(c.mercado.valor_empresa, 0)}`);
  linea('EV/EBITDA LTM / NTM · PER NTM', `${fmt(c.clave.ev_ebitda_ltm)}x / ${fmt(c.clave.ev_ebitda_ntm)}x · ${fmt(c.clave.per_ntm)}x`);
  linea('FCF yield · DN/EBITDA · ROIC', `${fmt(c.clave.fcf_yield_pct)} % · ${fmt(c.clave.dn_ebitda)}x · ${fmt(c.clave.roic_pct)} %`);
  console.log('Valoración (por acción)');
  if (c.dcf) {
    linea('DCF', `${fmt(c.dcf.valor_accion, 2)} (${fmt(c.dcf.potencial_pct)} %) · WACC ${fmt(c.dcf.wacc, 2)} % · VT ${c.dcf.peso_terminal_pct} % del valor`);
    linea('DCF inverso', `crecimiento implícito ${fmt(c.dcf.inverso.crecimiento_implicito_pct)} % (base ${fmt(c.dcf.inverso.crecimiento_base_pct)} %) · rentabilidad implícita ${fmt(c.dcf.inverso.rentabilidad_implicita_pct)} %`);
  }
  for (const i of c.comparables.implicito) linea(i.metodo, `${fmt(i.valor_p25, 2)} – ${fmt(i.valor_mediana, 2)} – ${fmt(i.valor_p75, 2)}`);
  if (c.transacciones) linea('Transacciones (p25 – mediana – p75)', `${fmt(c.transacciones.valor_p25, 2)} – ${fmt(c.transacciones.valor_mediana, 2)} – ${fmt(c.transacciones.valor_p75, 2)}`);
  for (const e of c.escenarios) linea(`Escenario ${e.escenario}`, `${fmt(e.valor, 2)} (${fmt(e.potencial_pct)} %, prob. ${e.probabilidad_pct} %)`);
  linea('Valor objetivo (síntesis ponderada)', `${fmt(c.sintesis.valor_objetivo, 2)} (${fmt(c.sintesis.potencial_pct)} %)`);
  console.log('Calidad y gobierno');
  linea('Altman Z · Piotroski F · Beneish M', `${fmt(c.calidad.altman_z, 2)} · ${c.calidad.piotroski_f ?? 'n.d.'} · ${fmt(c.calidad.beneish_m, 2)}`);
  linea('Gobierno', `${c.gobierno.puntuacion} criterios · ${fmt(c.gobierno.independientes_pct, 0)} % independientes`);
  console.log(`\nControles: ${c.controles_resumen}`);
  for (const x of c.controles.filter((x) => x.resultado !== 'OK')) console.log(`  ✗ ${x.control}: ${x.detalle}`);
}
