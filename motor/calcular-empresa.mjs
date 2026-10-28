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
import { conviccionSugerida } from './conviccion.mjs';
import { calcularObjetivo12m, REGLA_12M } from './objetivo12m.mjs';
import { calidadAmpliada } from './calidad-ampliada.mjs';

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
  // Con ejercicio no natural, «FY2025» puede nombrar el año en que empieza (Inditex: feb-25 a ene-26) o
  // en el que termina (la mayoría). meta.etiqueta_ejercicio dice cuál; por defecto, el de cierre.
  const desfaseEj = /inicio/i.test(meta.etiqueta_ejercicio || '') ? 1 : 0;
  const finEj = (periodo) => finEjercicio(anioDe(periodo) + desfaseEj, mesCierre);
  const fechaCorte = new Date((meta.fecha_corte || new Date().toISOString().slice(0, 10)) + 'T00:00:00Z');
  const id = d.identificacion || {};
  const precio = n(id.precio), acciones = n(id.acciones);

  // Cuenta por función (coste de ventas, gastos generales) o por naturaleza (aprovisionamientos,
  // personal, otros gastos). Por naturaleza, «coste_ventas» son los aprovisionamientos: el margen que
  // sale es el de contribución y los días de inventario y de pago se miden sobre los costes operativos.
  const porNaturaleza = /naturaleza/i.test(meta.formato_cuenta || '');
  const etiquetas = {
    margen_bruto: porNaturaleza ? 'M. tras aprov.' : 'M. bruto',
    margen_bruto_largo: porNaturaleza ? 'Margen tras aprovisionamientos' : 'Margen bruto',
    dias_base: porNaturaleza ? 'sobre costes operativos de caja (ingresos − EBITDA), por ser una cuenta por naturaleza' : 'sobre el coste de ventas',
  };

  // ── Cuenta de resultados (solo ejercicios reales) ──
  // Si la empresa mete el resultado de sus participadas en el EBITDA y el EBIT (Enagás, Redeia), se saca de
  // ahí y pasa al resultado financiero: las participadas ya se valoran en el puente y si no se contarían dos veces.
  const sinParticipadas = (c) => {
    const p = n(c?.participadas_en_ebitda);
    if (!p) return c;
    return { ...c, ebitda: n(c.ebitda) !== null ? n(c.ebitda) - p : null, ebit: n(c.ebit) !== null ? n(c.ebit) - p : null, resultado_financiero: n(c.resultado_financiero) !== null ? n(c.resultado_financiero) + p : null };
  };
  // Gastos no recurrentes que la empresa deja dentro del EBITDA (deterioros, reestructuración, litigios): se
  // devuelven al EBITDA y al EBIT para que márgenes, múltiplos y DCF partan de lo recurrente. El beneficio neto
  // publicado no se toca. Positivo = gasto; negativo = ingreso extraordinario.
  const sinNoRecurrentes = (c) => {
    const x = n(c?.no_recurrentes_en_ebitda);
    if (!x) return c;
    return { ...c, ebitda: n(c.ebitda) !== null ? n(c.ebitda) + x : null, ebit: n(c.ebit) !== null ? n(c.ebit) + x : null };
  };
  const cuentaIn = lista(d.financieros?.cuenta).filter((c) => !esEstimado(c.periodo)).map((c) => sinParticipadas(sinNoRecurrentes(c)));
  const cuenta = cuentaIn.map((c, i) => {
    const ant = cuentaIn[i - 1];
    const ingresos = n(c.ingresos), bruto = ingresos !== null && n(c.coste_ventas) !== null ? ingresos - n(c.coste_ventas) : null;
    const bai = n(c.bai), imp = n(c.impuestos);
    const dpaOrd = n(c.dpa) !== null ? n(c.dpa) - (n(c.dpa_extraordinario) ?? 0) : null;
    return {
      periodo: c.periodo, ingresos,
      crecimiento_pct: red(ant ? pct(ingresos - n(ant.ingresos), n(ant.ingresos)) : null),
      beneficio_bruto: bruto, margen_bruto_pct: red(pct(bruto, ingresos)),
      ebitda: n(c.ebitda), margen_ebitda_pct: red(pct(n(c.ebitda), ingresos)),
      ebit: n(c.ebit), margen_ebit_pct: red(pct(n(c.ebit), ingresos)),
      beneficio_neto: n(c.beneficio_neto), margen_neto_pct: red(pct(n(c.beneficio_neto), ingresos)),
      bpa: n(c.bpa), dpa: n(c.dpa), dpa_extraordinario: n(c.dpa_extraordinario),
      tasa_impositiva_pct: red(bai > 0 ? pct(imp, bai) : null),
      payout_pct: red(pct(dpaOrd, n(c.bpa)), 0), // sin dividendos extraordinarios
    };
  });
  for (const c of cuenta.slice(-3)) {
    if (c.tasa_impositiva_pct !== null && (c.tasa_impositiva_pct < 12 || c.tasa_impositiva_pct > 35)) control(`Tipo impositivo efectivo razonable (${c.periodo})`, false, `${fmt(c.tasa_impositiva_pct)} %: explica la causa (créditos fiscales, regularizaciones, mezcla de países) y no lo proyectes en el DCF.`);
  }
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
      control(`EBITDA − amortizaciones = EBIT (${c.periodo})`, false, `Diferencia de ${fmt(ebitda - am - ebit, 0)}: deterioros u otros resultados entre EBITDA y EBIT; explícalo en el comentario.`);
    }
    const bai = n(c.bai), rf = n(c.resultado_financiero);
    const bn = n(c.beneficio_neto), imp = n(c.impuestos), mino = n(c.minoritarios) ?? 0;
    if (bai !== null && imp !== null && bn !== null && Math.abs(bai - imp - mino - bn) > Math.max(0.03 * Math.abs(bn), 1)) {
      control(`BAI − impuestos − minoritarios = beneficio neto (${c.periodo})`, false, `Diferencia de ${fmt(bai - imp - mino - bn, 0)} (¿operaciones interrumpidas?).`);
    }
    // Con el EBIT publicado: el no recurrente que se devolvió al EBIT sigue dentro del BAI (Rentokil, bioMérieux).
    const ebitPub = ebit !== null ? ebit - (n(c.no_recurrentes_en_ebitda) ?? 0) : null;
    if (ebitPub !== null && rf !== null && bai !== null && Math.abs(ebitPub + rf - bai) > Math.max(0.05 * Math.abs(bai), 1)) {
      control(`EBIT + resultado financiero = BAI (${c.periodo})`, false, `Diferencia de ${fmt(ebitPub + rf - bai, 0)} (¿asociadas o extraordinarios?).`);
    }
    const accs = n(c.acciones_diluidas);
    if (bn !== null && accs && n(c.bpa) !== null && Math.abs(bn / accs - n(c.bpa)) > 0.06 * Math.abs(n(c.bpa)) + 0.01) {
      control(`BPA = beneficio neto / acciones (${c.periodo})`, false, `${fmt(bn / accs, 2)} calculado frente a ${fmt(n(c.bpa), 2)} publicado (con convertibles, el BPA diluido publicado ajusta el numerador: explícalo si la diferencia viene de ahí).`);
    }
  }

  // ── LTM y NTM ──
  const ltm = sinParticipadas(sinNoRecurrentes(d.financieros?.ltm || {}));
  const ingresosLtm = n(ltm.ingresos) ?? ultimoCalc.ingresos ?? null;
  const ebitdaLtm = n(ltm.ebitda) ?? ultimoCalc.ebitda ?? null;
  const ebitLtm = n(ltm.ebit) ?? ultimoCalc.ebit ?? null;
  const bpaLtm = n(ltm.bpa) ?? ultimoCalc.bpa ?? null;
  // Si el consenso usa un EBITDA ajustado (sin remuneración en acciones u otras partidas que las cuentas
  // sí restan), se pasa a la base de las cuentas restando el ajuste en % de ventas: si no, el múltiplo
  // de los próximos 12 meses sale más bajo solo por la definición.
  const ajusteEbitda = /ajustad/i.test(d.consenso?.base_ebitda || '') ? n(d.consenso?.ajuste_ebitda_pct_ventas) : null;
  const estim = lista(d.consenso?.estimaciones).filter((e) => anioDe(e.periodo)).map((e) =>
    ajusteEbitda && n(e.ebitda) !== null && n(e.ingresos) !== null ? { ...e, ebitda: n(e.ebitda) - (ajusteEbitda * n(e.ingresos)) / 100 } : e);
  if (/ajustad/i.test(d.consenso?.base_ebitda || '') && !ajusteEbitda) control('EBITDA del consenso en la base de las cuentas', false, 'El consenso es de EBITDA ajustado y falta consenso.ajuste_ebitda_pct_ventas: los múltiplos de los próximos 12 meses no son comparables con los de los últimos 12.');
  const ntm = (campo) => {
    const futuros = estim.filter((e) => finEj(e.periodo) > fechaCorte && n(e[campo]) !== null);
    if (!futuros.length) return null;
    const e1 = futuros[0], e2 = futuros[1];
    const w = Math.min(1, Math.max(0, anios(fechaCorte, finEj(e1.periodo))));
    return e2 ? w * n(e1[campo]) + (1 - w) * n(e2[campo]) : n(e1[campo]);
  };
  const ingresosNtm = ntm('ingresos'), ebitdaNtm = ntm('ebitda'), bpaNtm = ntm('bpa');
  // Crecimiento NTM sobre LTM, ANUALIZADO: entre el centro del periodo LTM y el centro de los próximos
  // 12 meses puede haber más de un año (p. ej. LTM a junio y fecha de corte en octubre).
  const finLtm = ltm.fecha_fin ? new Date(ltm.fecha_fin + 'T00:00:00Z') : (ultimo.periodo ? finEj(ultimo.periodo) : null);
  const aniosEntre = finLtm ? Math.max(0.5, anios(finLtm, fechaCorte) + 1) : 1;
  const crecimientoNtm = ingresosNtm && ingresosLtm ? ((ingresosNtm / ingresosLtm) ** (1 / aniosEntre) - 1) * 100 : null;

  // ── Puente de valor y datos de mercado ──
  const pu = d.valoracion?.puente || {};
  const deudaNeta = suma(n(pu.deuda_financiera) ?? 0, n(pu.arrendamientos) ?? 0, -(n(pu.caja) ?? 0));
  const ajustesPuente = sumaLaxa(n(pu.minoritarios), n(pu.pensiones), -(n(pu.asociadas) ?? 0), n(pu.otros_ajustes));
  // Deuda neta ajustada: la contable más los pasivos asimilables a deuda del puente (pensiones y
  // otros ajustes). Es la que mide el apalancamiento; minoritarios y asociadas solo afectan al valor.
  const deudaNetaAjustada = deudaNeta + (n(pu.pensiones) ?? 0) + (n(pu.otros_ajustes) ?? 0);
  const capitalizacion = precio !== null && acciones !== null ? precio * acciones : null;
  const valorEmpresa = capitalizacion !== null ? capitalizacion + deudaNeta + ajustesPuente : null;
  const mercado = {
    precio, acciones, capitalizacion: red(capitalizacion, 0), deuda_neta: red(deudaNeta, 0),
    // Sin pasivos asimilables, la ajustada es la contable y no se repite en el informe.
    deuda_neta_ajustada: Math.abs(deudaNetaAjustada - deudaNeta) < 0.5 ? null : red(deudaNetaAjustada, 0),
    asimilables_deuda: Math.abs(deudaNetaAjustada - deudaNeta) < 0.5 ? null : red(deudaNetaAjustada - deudaNeta, 0),
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
      control(`Segmentos suman los ingresos (${per})`, false, `Segmentos ${fmt(sumaSeg, 0)} frente a ingresos ${fmt(c.ingresos, 0)} (${fmt(pct(sumaSeg - c.ingresos, c.ingresos))} %). Si hay eliminaciones entre segmentos, explícalo.`);
    }
  }
  const geo = lista(d.negocio?.geografias);
  if (geo.length) { const s = sumaLaxa(...geo.map((g) => n(g.peso_pct))); control('Geografías suman 100 %', Math.abs(s - 100) <= 1.5, Math.abs(s - 100) <= 1.5 ? '' : `Suman ${fmt(s)} %.`); }

  // ── Balance, circulante y solvencia ──
  const balIn = lista(d.balance?.historico);
  const balance = balIn.map((b) => {
    const c = cuentaIn.find((x) => String(x.periodo) === String(b.periodo)) || {};
    const ingresos = n(c.ingresos);
    // Base de los días de inventario y de pago: coste de ventas, o costes operativos de caja si la cuenta es por naturaleza.
    const cv = porNaturaleza ? (ingresos !== null && n(c.ebitda) !== null ? ingresos - n(c.ebitda) : null) : n(c.coste_ventas);
    const dn = suma(n(b.deuda_financiera) ?? 0, n(b.arrendamientos) ?? 0, -(n(b.caja) ?? 0));
    // Contratistas (proyectos a varios años): los activos y pasivos por contrato (obra ejecutada pendiente de
    // facturar, anticipos de clientes) forman parte del circulante; sin ellos sale inflado.
    const circ = suma(n(b.existencias) ?? 0, n(b.clientes) ?? 0, -(n(b.proveedores) ?? 0), n(b.activos_contrato) ?? 0, -(n(b.pasivos_contrato) ?? 0));
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
      // EBIT sobre gastos por intereses; si no se aportan, sobre el resultado financiero neto (incluye divisa).
      cobertura_intereses: red(n(c.gastos_financieros) > 0 ? div(n(c.ebit), n(c.gastos_financieros)) : rf !== null && rf < 0 ? div(n(c.ebit), -rf) : null, 1),
      capital_invertido: suma(pn ?? 0, mi, dn ?? 0),
      fondo_comercio: n(b.fondo_comercio),
      liquidez_corriente: red(div(n(b.activo_corriente), n(b.pasivo_corriente)), 2),
    };
  });
  const balUlt = balance[balance.length - 1] || {};

  // ── Cambios de perímetro ──
  // Una compra grande cerca del cierre mete el balance de la adquirida sin su cuenta de resultados: los
  // días de circulante, la DN/EBITDA, el ROIC y los indicadores de calidad de ese año dejan de ser
  // comparables. Los declarados vienen en financieros.cambios_perimetro; los no declarados se detectan.
  const perimetro = new Map(lista(d.financieros?.cambios_perimetro).filter((x) => x?.periodo).map((x) => [String(x.periodo), x.descripcion || 'cambio de perímetro']));
  for (let i = 1; i < balance.length; i++) {
    const b = balance[i], a = balance[i - 1];
    const gAct = a.activo_total && b.activo_total ? pct(b.activo_total - a.activo_total, a.activo_total) : null;
    const gIng = cuenta.find((x) => String(x.periodo) === String(b.periodo))?.crecimiento_pct ?? null;
    const emision = n(lista(d.flujos?.historico).find((x) => String(x.periodo) === String(b.periodo))?.emision_acciones) ?? 0;
    const porEmision = gAct !== null && emision >= 0.5 * (b.activo_total - a.activo_total);
    if (gAct !== null && gAct > 35 && (gIng === null || gIng < gAct / 2) && !porEmision && !perimetro.has(String(b.periodo))) {
      const desc = `el activo total crece un ${fmt(gAct, 0)} % y los ingresos un ${fmt(gIng, 0)} %`;
      perimetro.set(String(b.periodo), desc);
      control(`Cambio de perímetro declarado (${b.periodo})`, false, `${desc[0].toUpperCase() + desc.slice(1)}: si hubo una compra cerca del cierre, decláralo en financieros.cambios_perimetro y explícalo.`);
    }
  }
  const notaPerimetro = perimetro.size
    ? `Cambio de perímetro (${[...perimetro].map(([p, x]) => `${p}: ${x}`).join('; ')}). Los ratios de balance de ese año (días, circulante, deuda neta / EBITDA, ROIC) y los indicadores de calidad contable no son comparables con los anteriores.`
    : null;

  // ── Flujos de caja y uso del capital ──
  const fluIn = lista(d.flujos?.historico);
  const flujos = fluIn.map((f) => {
    const c = cuentaIn.find((x) => String(x.periodo) === String(f.periodo)) || {};
    // FCF después de intereses, se clasifiquen donde se clasifiquen: si la empresa pone los intereses
    // pagados en financiación, se restan aquí («intereses_en_financiacion»).
    const fcf = suma(n(f.flujo_operativo), -(n(f.capex) ?? 0), -(n(f.pagos_arrendamientos) ?? 0), -(n(f.intereses_en_financiacion) ?? 0));
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
    // ROIC sin fondo de comercio (15-oct-2026): el mismo NOPAT sobre el capital medio menos el fondo de comercio medio. Es un dato
    // al lado del publicado, no decide (§4.1): el backtest del 15-oct no encontró ventaja en relajar el filtro con él.
    const gwMed = bc && bcAnt && bc.fondo_comercio !== null && bcAnt.fondo_comercio !== null ? (bc.fondo_comercio + bcAnt.fondo_comercio) / 2 : bc?.fondo_comercio ?? null;
    const ciSinFc = ci !== null && gwMed !== null ? ci - gwMed : null;
    const pnMed = b && bAnt ? (n(b.patrimonio_neto) + n(bAnt.patrimonio_neto)) / 2 : n(b?.patrimonio_neto);
    const atMed = b && bAnt ? (n(b.activo_total) + n(bAnt.activo_total)) / 2 : n(b?.activo_total);
    // ROIC sobre capital operativo (15-oct-2026, Qualys y Sage en la 8ª hora): cuando el capital invertido por pasivo (patrimonio
    // + deuda − caja) es ≤ 0 por la caja neta o las recompras, se da el NOPAT sobre el capital operativo del activo (inmovilizado +
    // intangibles + fondo de comercio + circulante operativo). Es un dato: el filtro de calidad sigue usando el ROIC del informe.
    const capOp = (x) => (x && (n(x.inmovilizado_material) !== null || n(x.intangibles) !== null) ? suma(n(x.inmovilizado_material) ?? 0, n(x.intangibles) ?? 0, n(x.fondo_comercio) ?? 0, n(x.existencias) ?? 0, n(x.clientes) ?? 0, n(x.activos_contrato) ?? 0, -(n(x.proveedores) ?? 0), -(n(x.pasivos_contrato) ?? 0)) : null);
    // Si hasta el capital operativo es ≤ 0 (los cobros anticipados financian el circulante: Qualys), queda el capital fijo
    // (inmovilizado + intangibles + fondo de comercio) como última orientación, y se dice.
    const capFijo = (x) => (x && (n(x.inmovilizado_material) !== null || n(x.intangibles) !== null) ? suma(n(x.inmovilizado_material) ?? 0, n(x.intangibles) ?? 0, n(x.fondo_comercio) ?? 0) : null);
    const media2 = (fn) => (fn(b) !== null && fn(bAnt) !== null ? (fn(b) + fn(bAnt)) / 2 : fn(b));
    const ciOp = media2(capOp), ciFijo = media2(capFijo);
    const baseOp = ci !== null && ci <= 0 && nopat !== null ? (ciOp !== null && ciOp > 0 ? ['operativo', ciOp] : ciFijo !== null && ciFijo > 0 ? ['fijo', ciFijo] : null) : null;
    const roicOp = baseOp ? red(pct(nopat, baseOp[1])) : null;
    return {
      // ROIC «no aplica» con capital invertido ≤ 0 (mucha caja neta o patrimonio negativo por recompras: Booking, ANYCOLOR,
      // CTS Eventim, 14-oct-2026): la cifra saldría negativa y no significa nada; se usa el ROIC calculado a mano del informe.
      periodo: c.periodo, nopat: red(nopat, 0), capital_invertido: red(ci, 0), roic_pct: ci !== null && ci <= 0 ? null : red(pct(nopat, ci)),
      roic_sin_fc_pct: ciSinFc !== null && ciSinFc > 0 && gwMed > 0 ? red(pct(nopat, ciSinFc)) : null,
      fondo_comercio_pct_capital: ci > 0 && gwMed !== null ? red(pct(gwMed, ci), 0) : null,
      roic_operativo_pct: roicOp, capital_operativo: ci !== null && ci <= 0 ? red(ciOp, 0) : null, base_roic_operativo: baseOp ? baseOp[0] : null,
      roic_nota: ci !== null && ci <= 0 ? `no aplica: capital invertido negativo (caja neta o patrimonio negativo por recompras); usar el ROIC calculado a mano del informe${roicOp !== null ? ` (orientación: ${fmt(roicOp, 1)} % sobre el capital ${baseOp[0] === 'fijo' ? 'fijo (inmovilizado, intangibles y fondo de comercio: el circulante lo financian los cobros anticipados)' : 'operativo del activo (inmovilizado, intangibles y circulante)'}, ${fmt(baseOp[1], 0)} M)` : ''}` : null,
      roe_pct: red(pct(n(c.beneficio_neto), pnMed)), roa_pct: red(pct(n(c.beneficio_neto), atMed)),
      margen_neto_pct: red(pct(n(c.beneficio_neto), n(c.ingresos))), rotacion: red(div(n(c.ingresos), atMed), 2),
      apalancamiento: red(div(atMed, pnMed), 2),
    };
  });
  const rentUlt = rentabilidad[rentabilidad.length - 1] || {};
  const rentIni = rentabilidad.find((r) => r.nopat !== null && r.capital_invertido !== null);
  const dCap = rentIni && rentUlt !== rentIni ? rentUlt.capital_invertido - rentIni.capital_invertido : null;
  // Solo tiene sentido si el capital invertido ha crecido de verdad (≥ 10 %); si no, el cociente explota.
  const roicIncremental = dCap !== null && dCap > 0.1 * Math.abs(rentIni.capital_invertido) ? red(pct(rentUlt.nopat - rentIni.nopat, dCap)) : null;

  // ── Fondo de comercio y compras (15-oct-2026): comprador en serie, compra única o sin compras, por la serie del fondo de comercio ──
  const compras = (() => {
    const serie = balance.filter((b) => b.fondo_comercio !== null);
    if (serie.length < 2) return null;
    const subidas = serie.filter((b, i) => i > 0 && serie[i - 1].fondo_comercio > 0 && b.fondo_comercio / serie[i - 1].fondo_comercio > 1.05);
    const grande = serie.some((b, i) => i > 0 && serie[i - 1].fondo_comercio > 0 && b.fondo_comercio / serie[i - 1].fondo_comercio > 1.25);
    const tipo = serie.length >= 4 && subidas.length >= 3 ? 'comprador en serie' : subidas.length >= 1 ? (grande ? 'compra única grande' : 'compras pequeñas') : 'sin compras';
    const u = rentUlt, pesoFc = u.fondo_comercio_pct_capital;
    const texto = `Fondo de comercio: ${fmt(serie.at(-1).fondo_comercio, 0)} M en ${serie.at(-1).periodo}${pesoFc !== null ? ` (el ${fmt(pesoFc, 0)} % del capital invertido medio)` : ''}; ha subido más de un 5 % en ${subidas.length} de ${serie.length - 1} años: ${tipo}. ` +
      (u.roic_sin_fc_pct !== null ? `ROIC publicado ${fmt(u.roic_pct, 1)} %; sin fondo de comercio, ${fmt(u.roic_sin_fc_pct, 1)} %. ` : '') +
      (tipo === 'comprador en serie' ? 'En un comprador en serie el fondo de comercio es el precio de su crecimiento: juzga el publicado.' : tipo === 'sin compras' ? 'Sin compras relevantes: el publicado ya es el ROIC del negocio.' : 'El ROIC sin fondo de comercio mide el rendimiento del negocio operativo; decide el publicado (§4.1) y la cifra sin fondo de comercio es dato para una excepción razonada.');
    return { tipo, subidas: subidas.length, anios: serie.length - 1, fondo_comercio: serie.at(-1).fondo_comercio, fondo_comercio_pct_capital: pesoFc, roic_pct: u.roic_pct ?? null, roic_sin_fc_pct: u.roic_sin_fc_pct ?? null, texto };
  })();

  // ── Calidad contable: Altman Z, Piotroski F, Beneish M ──
  const scores = calidadContable(cuentaIn, balIn, fluIn, capitalizacion, porNaturaleza, new Set(perimetro.keys()));

  // ── WACC y DCF ──
  const dcfIn = d.dcf || {};
  const w = dcfIn.wacc || {};
  const ke = suma(n(w.tasa_libre_pct), n(w.beta) !== null && n(w.prima_mercado_pct) !== null ? n(w.beta) * n(w.prima_mercado_pct) : null, n(w.prima_adicional_pct) ?? 0);
  const kdDesp = n(w.coste_deuda_pct) !== null ? n(w.coste_deuda_pct) * (1 - (n(w.tasa_impositiva_pct) ?? 25) / 100) : null;
  const pesoD = (n(w.peso_deuda_pct) ?? 0) / 100;
  const wacc = ke !== null && kdDesp !== null ? ke * (1 - pesoD) + kdDesp * pesoD : null;
  // Doble prima país (27-oct-2026, Brasil): si los flujos van en la moneda local de un emergente, la tasa libre (su bono) ya
  // lleva el riesgo de impago del país; una prima adicional por país encima solo vale por la parte que el bono no recoge.
  const EMERGENTE_LOCAL = ['BRL', 'MXN', 'INR', 'ZAR', 'COP', 'IDR', 'TRY', 'ARS', 'CLP', 'PEN', 'PHP', 'EGP', 'NGN', 'VND', 'PKR'];
  if (EMERGENTE_LOCAL.includes(meta.divisa) && (n(w.prima_adicional_pct) ?? 0) >= 1.5)
    control('Sin doble prima país (bono local + prima país)', false, `Flujos en ${meta.divisa} con tasa libre ${fmt(n(w.tasa_libre_pct), 2)} % (bono local, ya lleva el riesgo país) y además prima adicional de ${fmt(n(w.prima_adicional_pct), 2)} %: probablemente se cuenta dos veces. Usa bono local − diferencial de impago + prima país (≈ bono + ⅓ de la prima país), o justifica la prima por tamaño o riesgo propio.`);
  // Regla relativa: el mismo WACC con la prima de riesgo que hoy descuenta el mercado (prima implícita, p. ej.
  // la de Damodaran para el S&P 500) en vez de la prima normalizada. Responde a «¿rinde más que el mercado,
  // ajustado por su beta?», no a «¿rinde más que su coste de capital histórico?».
  const refMercado = d.valoracion?.referencia_mercado || {};
  const primaImpl = n(refMercado.prima_implicita_pct);
  const keRel = primaImpl !== null && n(w.tasa_libre_pct) !== null && n(w.beta) !== null ? n(w.tasa_libre_pct) + n(w.beta) * primaImpl + (n(w.prima_adicional_pct) ?? 0) : null;
  const waccRel = keRel !== null && kdDesp !== null ? keRel * (1 - pesoD) + kdDesp * pesoD : null;
  const waccTabla = [
    ['Tasa libre de riesgo', w.tasa_libre_pct, '%'], ['Beta', w.beta, ''], ['Prima de riesgo de mercado', w.prima_mercado_pct, '%'],
    ['Prima adicional (país, tamaño, específica)', w.prima_adicional_pct, '%'], ['Coste de los fondos propios', ke, '%'],
    ['Coste de la deuda antes de impuestos', w.coste_deuda_pct, '%'], ['Tipo impositivo', w.tasa_impositiva_pct, '%'],
    ['Coste de la deuda después de impuestos', kdDesp, '%'], ['Peso de la deuda (D / (D + E))', w.peso_deuda_pct, '%'], ['WACC', wacc, '%'],
    ...(waccRel !== null ? [['Prima de riesgo implícita del mercado (regla relativa)', primaImpl, '%'], ['WACC con la prima implícita del mercado', waccRel, '%']] : []),
  ].map(([concepto, v, u]) => ({ concepto, valor: n(v) === null ? null : u === '%' ? `${fmt(n(v), 2)} %` : fmt(n(v), 2) }));

  const nwcBase = balUlt.circulante ?? null;
  const ctx = { cuentaUlt: ultimo, nwcBase, fechaCorte, mesCierre, desfase: desfaseEj, deudaNeta, ajustesPuente, acciones };
  if (ultimo.periodo) {
    const finUlt = finEj(ultimo.periodo), meses = (fechaCorte - finUlt) / (30.44 * 864e5);
    if (meses < 0 || meses > 15) control('Último ejercicio cerrado coherente con la fecha de corte', false, `El último ejercicio real (${ultimo.periodo}) cerraría el ${finUlt.toISOString().slice(0, 10)}: ${meses < 0 ? 'después de la fecha de corte' : 'más de 15 meses antes'}. Revisa meta.cierre_ejercicio_mes y meta.etiqueta_ejercicio («inicio» si FY2025 empieza en 2025).`);
  }
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
    const crecImpl = objetivo ? resolver((x) => valorarDcf(dcfIn, ctx, base, { dg: x })?.valor_accion - objetivo, 0, 1, 25) : null;
    // Media de los años que se mueven (los «fijos» no cambian en el DCF inverso).
    const anLibres = lista(dcfIn.anios).filter((a) => !a.fijo);
    const crecMedioBase = media((anLibres.length ? anLibres : lista(dcfIn.anios)).map((a) => a.crecimiento_pct));
    const waccImpl = objetivo ? resolver((x) => valorarDcf(dcfIn, ctx, { ...base, wacc: x })?.valor_accion - objetivo, wacc, 0.5, 20, Math.max((base.g ?? 0) + 0.6, 2)) : null;
    const margenImpl = objetivo ? resolver((x) => valorarDcf(dcfIn, ctx, base, { dm: x })?.valor_accion - objetivo, 0, 1, 30) : null;
    control('DCF inverso calculable', crecImpl !== null && waccImpl !== null, crecImpl === null || waccImpl === null ? 'No hay solución en un rango razonable: revisa circulante, capex o márgenes del DCF (un supuesto extremo hace que el valor no responda al crecimiento).' : '');
    const margenFinal = n(lista(dcfIn.anios).at(-1)?.margen_ebitda_pct);
    dcf = {
      ...dcfBase,
      wacc: red(wacc, 2), ke: red(ke, 2), kd_despues: red(kdDesp, 2), wacc_tabla: waccTabla,
      potencial_pct: red(pct(vpa - precio, precio)),
      ...(dcfBase.etapa2 ? (() => {
        const sin = valorarDcf(dcfIn, ctx, { ...base, sinEtapa2: true })?.valor_accion ?? null;
        return { valor_accion_dos_etapas: red(sin, 2), etapa2_aporte_pct: sin ? red(pct(vpa - sin, sin)) : null, etapa2_texto: `Con la etapa de transición de ${dcfBase.etapa2.anios} años el DCF da ${fmt(vpa, 2)} por acción; sin ella (crecimiento terminal desde ${lista(dcfIn.anios).at(-1)?.periodo}), ${fmt(sin, 2)}.` };
      })() : {}),
      sensibilidad: sens1, sensibilidad2: sens2,
      rango_min: red(Math.min(...interior), 2), rango_max: red(Math.max(...interior), 2),
      inverso: {
        crecimiento_implicito_pct: crecImpl === null ? null : red(crecMedioBase + crecImpl),
        crecimiento_base_pct: red(crecMedioBase),
        periodo: (() => { const l = anLibres.length ? anLibres : lista(dcfIn.anios); return l.length ? `${l[0].periodo}-${l.at(-1).periodo}` : null; })(),
        margen_implicito_pct: margenImpl === null || margenFinal === null ? null : red(margenFinal + margenImpl),
        margen_implicito_texto: margenImpl === null && margenFinal !== null ? `ningún margen hasta el ${fmt(margenFinal + 30, 0)} % justifica el precio` : null,
        margen_base_pct: red(margenFinal),
        rentabilidad_implicita_pct: red(waccImpl, 1),
      },
    };
    // Sostenibilidad del crecimiento: ¿puede la empresa financiar el crecimiento que proyectamos? Reinversión neta de la
    // proyección (capex − amortización + variación del circulante) sobre el NOPAT; con el ROIC eso da el crecimiento que
    // se puede financiar, y el aumento del NOPAT sobre la reinversión, el rendimiento que la proyección supone para el capital nuevo.
    {
      const sIn = dcfIn.sostenibilidad || {};
      const filasP = (dcfBase.proyeccion || []).filter((f) => n(f.ebit) !== null);
      const nopatP = filasP.map((f) => n(f.ebit) - (n(f.impuestos) ?? 0));
      const reinvP = filasP.map((f) => (n(f.capex) ?? 0) - (n(f.amortizacion) ?? 0) + (n(f.variacion_circulante) ?? 0));
      const sumN = nopatP.reduce((a, b) => a + b, 0), sumR = reinvP.reduce((a, b) => a + b, 0);
      const tasaR = filasP.length && sumN > 0 ? (sumR / sumN) * 100 : null;
      // Con una reinversión pequeña (menos del 15 % del NOPAT) el negocio es de activos ligeros: el ROIC × reinversión y el
      // rendimiento del capital nuevo pierden sentido (dividen por casi cero) y la prueba pasa a ser el poder de precios.
      const ligero = sumR <= 0 || tasaR === null || tasaR < 15;
      const crecP = media(filasP.map((f) => n(f.crecimiento_pct)));
      const capexBruto = media(filasP.map((f) => (n(f.ingresos) ? (n(f.capex) / n(f.ingresos)) * 100 : null)));
      const roicU = rentUlt.roic_pct ?? null, nopat0 = rentUlt.nopat ?? null;
      const financiable = !ligero && roicU !== null ? (roicU * tasaR) / 100 : null;
      const roicImpl = !ligero && nopat0 !== null && nopatP.length ? ((nopatP.at(-1) - nopat0) / sumR) * 100 : null;
      // Con reinversión pequeña (15-oct-2026): la misma prueba con la reinversión BRUTA (capex + circulante, sin restar la
      // amortización), que en activos ligeros y compradores en serie es lo que de verdad se gasta en crecer (Cintas, Marsh).
      const reinvB = filasP.map((f) => (n(f.capex) ?? 0) + (n(f.variacion_circulante) ?? 0)), sumRB = reinvB.reduce((a, b) => a + b, 0);
      const tasaRB = filasP.length && sumN > 0 && sumRB > 0 ? (sumRB / sumN) * 100 : null;
      const financiableB = ligero && roicU !== null && tasaRB !== null ? (roicU * tasaRB) / 100 : null;
      const roicImplB = ligero && nopat0 !== null && nopatP.length && sumRB > 0 ? ((nopatP.at(-1) - nopat0) / sumRB) * 100 : null;
      const tcacHist = n(tcacTabla?.ingresos_pct);
      const filaMerc = filasP.find((f) => f.periodo === sIn.mercado_final?.periodo) ?? filasP.at(-1);
      const ingFin = n(filaMerc?.ingresos), merc = n(sIn.mercado_final?.tamano), cuotaHoy = n(d.competencia?.cuota_pct);
      const cuotaFin = ingFin !== null && merc ? (ingFin / merc) * 100 : null;
      const puente = lista(sIn.puente_ingresos).map((p) => {
        const anio = lista(dcfIn.anios).find((a) => a.periodo === p.periodo);
        const suma = [p.volumen_pct, p.precio_pct, p.otros_pct].map(n).reduce((a, b) => a + (b ?? 0), 0);
        return { ...p, suma_pct: red(suma), crecimiento_pct: anio ? n(anio.crecimiento_pct) : null };
      });
      const descuadres = puente.filter((p) => p.crecimiento_pct !== null && Math.abs(p.suma_pct - p.crecimiento_pct) > 1);
      if (puente.length) control('Puente de ingresos (volumen + precio + otros) = crecimiento del DCF', !descuadres.length, descuadres.map((p) => `${p.periodo}: ${fmt(p.suma_pct, 1)} % frente a ${fmt(p.crecimiento_pct, 1)} %`).join('; '));
      const tope = Math.max(roicU ?? 0, roicIncremental ?? 0);
      // Veredicto del motor (15-oct-2026): no sustituye al del analista; si discrepan, control explicado.
      const cuotaOk = cuotaFin === null || cuotaHoy === null || cuotaFin <= Math.max(cuotaHoy * 1.5, cuotaHoy + 10);
      // En activos ligeros el rendimiento del capital nuevo sale enorme por construcción (reinversión casi nula): es dato, no prueba.
      const capitalOk = ligero ? true : (roicImpl === null || roicU === null || roicImpl <= tope * 1.25 || roicImpl <= wacc + 5);
      const historiaOk = tcacHist === null || crecP === null || crecP <= Math.max(tcacHist * 1.25, tcacHist + 2, 4);
      const veredictoMotor = filasP.length ? (cuotaOk && capitalOk && historiaOk ? 'Sí' : 'En parte') : null;
      const motivosMotor = [!capitalOk ? `el capital nuevo tendría que rendir más de 1,25 veces el histórico` : null, !cuotaOk ? `la cuota implícita supera 1,5 veces la actual` : null, !historiaOk ? `el crecimiento proyectado (${fmt(crecP, 1)} %) supera con holgura el histórico de ingresos (${fmt(tcacHist, 1)} %)` : null].filter(Boolean);
      // Solo avisa cuando el analista dice «Sí» y los números dicen «En parte» (el analista más prudente que el motor no es un fallo).
      if (veredictoMotor && sIn.veredicto) control('Veredicto de sostenibilidad del analista coherente con las pruebas del motor', !(sIn.veredicto === 'Sí' && veredictoMotor !== 'Sí'),
        `El analista dice «${sIn.veredicto}» y las pruebas del motor dan «${veredictoMotor}»${motivosMotor.length ? ` (${motivosMotor.join('; ')})` : ''}: razónalo en la justificación.`);
      if (roicImpl !== null && roicU !== null) control('Rendimiento del capital nuevo de la proyección ≤ 1,25 × el histórico', roicImpl <= tope * 1.25 || roicImpl <= wacc + 5,
        `La proyección supone que la inversión nueva rinde un ${fmt(roicImpl, 1)} % frente a un ROIC de ${fmt(roicU, 1)} %${roicIncremental !== null ? ` y un incremental histórico de ${fmt(roicIncremental, 1)} %` : ''}: crecimiento que la empresa no ha demostrado poder comprar.`);
      if (cuotaFin !== null && cuotaHoy !== null) control('Cuota implícita al final de la proyección ≤ 1,5 × la actual (o +10 puntos)', cuotaFin <= Math.max(cuotaHoy * 1.5, cuotaHoy + 10),
        `Cuota de ${fmt(cuotaFin, 1)} % en ${filaMerc?.periodo ?? "el último año"} frente al ${fmt(cuotaHoy, 1)} % de hoy.`);
      const texto = !filasP.length ? null : ligero
        ? `La proyección apenas necesita inversión neta de la amortización (reinversión acumulada de ${fmt(sumR, 0)} M${tasaR !== null && sumR > 0 ? `, el ${fmt(tasaR, 0)} % del NOPAT` : ""}, con un capex bruto medio del ${fmt(capexBruto, 1)} % de las ventas). En un negocio de activos ligeros, el crecimiento medio del ${fmt(crecP, 1)} % tiene que salir de subir precios y de ganar volumen sin capital nuevo, y la prueba es el poder de precios y la cuota${cuotaFin !== null ? ` (${fmt(cuotaFin, 1)} % del mercado en ${filaMerc?.periodo ?? 'el último año'}${cuotaHoy !== null ? `, frente al ${fmt(cuotaHoy, 1)} % de hoy` : ''})` : ''}; en un comprador en serie, la amortización es de intangibles comprados y la prueba es el capex bruto (las compras) frente al crecimiento comprado.`
        : `La proyección reinvierte el ${fmt(tasaR, 0)} % del NOPAT. Con el ROIC del último ejercicio (${fmt(roicU, 1)} %), eso financia un crecimiento del ${fmt(financiable, 1)} % anual, frente al ${fmt(crecP, 1)} % de ingresos proyectado. Supone que el capital nuevo rinde un ${fmt(roicImpl, 1)} %${roicIncremental !== null ? `, frente a un ROIC incremental histórico del ${fmt(roicIncremental, 1)} %` : ''}${cuotaFin !== null ? `; la cuota de mercado pasaría al ${fmt(cuotaFin, 1)} %${cuotaHoy !== null ? ` desde el ${fmt(cuotaHoy, 1)} %` : ''}` : ''}.`;
      dcf.sostenibilidad = filasP.length ? {
        veredicto: sIn.veredicto ?? null, veredicto_motor: veredictoMotor, motivos_motor: motivosMotor,
        crecimiento_financiable_bruto_pct: red(financiableB), roic_implicito_bruto_pct: red(roicImplB), tcac_ingresos_historica_pct: tcacHist,
        crecimiento_proyectado_pct: red(crecP), tasa_reinversion_pct: red(tasaR, 0), crecimiento_financiable_pct: red(financiable),
        roic_pct: roicU, roic_incremental_historico_pct: roicIncremental, roic_implicito_pct: red(roicImpl),
        cuota_actual_pct: cuotaHoy, cuota_final_pct: red(cuotaFin), puente, texto,
        tabla: [
          { concepto: 'Crecimiento medio de ingresos proyectado', valor: `${fmt(crecP, 1)} %` },
          { concepto: 'Capex bruto medio (incluidas compras si van como inversión)', valor: `${fmt(capexBruto, 1)} % de las ventas` },
          { concepto: 'Reinversión neta acumulada (capex − amortización + circulante)', valor: `${fmt(sumR, 0)} M${tasaR !== null ? ` (${fmt(tasaR, 0)} % del NOPAT)` : ''}` },
          ...(financiable !== null ? [{ concepto: 'Crecimiento que financia esa reinversión al ROIC actual', valor: `${fmt(financiable, 1)} % (ROIC ${fmt(roicU, 1)} %)` }] : []),
          ...(financiableB !== null ? [{ concepto: 'Con la reinversión bruta (capex + circulante): crecimiento que financia al ROIC actual', valor: `${fmt(financiableB, 1)} % (reinvierte el ${fmt(tasaRB, 0)} % del NOPAT)` }] : []),
          ...(roicImplB !== null ? [{ concepto: 'Rendimiento que la proyección supone para la reinversión bruta', valor: `${fmt(roicImplB, 1) } %${roicIncremental !== null ? ` (histórico: ${fmt(roicIncremental, 1)} %)` : ''}` }] : []),
          ...(tcacHist !== null ? [{ concepto: 'Crecimiento histórico de ingresos (TCAC)', valor: `${fmt(tcacHist, 1)} % frente al ${fmt(crecP, 1)} % proyectado` }] : []),
          ...(veredictoMotor ? [{ concepto: 'Veredicto de las pruebas del motor', valor: `${veredictoMotor}${motivosMotor.length ? `: ${motivosMotor.join('; ')}` : ''}` }] : []),
          ...(roicImpl !== null ? [{ concepto: 'Rendimiento que la proyección supone para el capital nuevo', valor: `${fmt(roicImpl, 1)} %${roicIncremental !== null ? ` (histórico: ${fmt(roicIncremental, 1)} %)` : ''}` }] : []),
          ...(cuotaFin !== null ? [{ concepto: `Cuota de mercado implícita en ${filaMerc?.periodo ?? 'el último año'}`, valor: `${fmt(cuotaFin, 1)} %${cuotaHoy !== null ? ` (hoy: ${fmt(cuotaHoy, 1)} %)` : ''}` }] : []),
        ],
      } : null;
    }
    const nwcPrimero = n(lista(dcfIn.anios)[0]?.nwc_pct_ventas), nwcReal = balUlt.circulante_ventas_pct ?? null;
    if (nwcPrimero !== null && nwcReal !== null) control('Circulante del primer año de proyección ≈ último real', Math.abs(nwcPrimero - nwcReal) <= 3, `Supuesto ${fmt(nwcPrimero)} % frente a ${fmt(nwcReal)} % real: genera una variación de circulante de ${fmt(dcfBase.proyeccion[0]?.variacion_circulante, 0)} M en el primer año. Converge de forma gradual.`);
    if (wacc !== null && base.g !== null && wacc - base.g < 3) control('WACC − g ≥ 3 puntos', false, `WACC ${fmt(wacc, 2)} % y g ${fmt(base.g, 2)} %: el valor terminal se dispara; revisa.`);
    control('Peso del valor terminal ≤ 80 % del valor empresa', dcfBase.peso_terminal_pct <= 80, `${fmt(dcfBase.peso_terminal_pct, 0)} %.`);
    if (dcfBase.etapa2) {
      // La etapa de transición alarga el crecimiento: solo vale para negocios que crean valor al crecer.
      const roicU = rentUlt.roic_pct ?? null;
      control('Etapa de transición justificada (ROIC ≥ WACC + 5 puntos)', roicU === null && rentUlt.roic_nota ? null : roicU !== null && roicU >= wacc + 5, roicU === null ? (rentUlt.roic_nota ? `ROIC ${rentUlt.roic_nota}; la calidad se juzga con el del informe.` : 'Sin ROIC calculable: no se puede justificar alargar el crecimiento.') : `ROIC ${fmt(roicU, 1)} % frente a WACC ${fmt(wacc, 1)} %: ${roicU >= wacc + 5 ? '' : 'crecer apenas crea valor; la etapa de transición infla el DCF sin base.'}`);
      if (!dcfIn.etapa2?.justificacion) control('Etapa de transición con justificación', false, 'Falta dcf.etapa2.justificacion: recorrido del mercado, penetración y ventaja que sostienen el crecimiento.');
    }
    if (base.g !== null) control('Crecimiento a perpetuidad ≤ 3 %', base.g <= 3, `${fmt(base.g, 2)} %.`);
  } else {
    control('DCF calculable', false, 'Faltan datos: año base, proyección, WACC o crecimiento terminal.');
  }

  // La caja que proyecta el DCF frente a la que de verdad generó la empresa: un DCF que de pronto genera el
  // doble de caja que la historia suele esconder un supuesto de circulante o de inversión demasiado optimista.
  if (dcf?.proyeccion?.length >= 3 && flujos.length >= 3) {
    const proy3 = media(dcf.proyeccion.slice(0, 3).map((p) => p.fcff));
    const hist3 = media(flujos.slice(-3).map((f) => f.fcf));
    if (proy3 !== null && hist3 !== null && proy3 > Math.max(2 * hist3, hist3 + 0.05 * (ultimoCalc.ingresos ?? 0)) )
      control('Caja proyectada coherente con la histórica', false, `El DCF proyecta ${fmt(proy3, 0)} M de flujo libre medio en sus tres primeros años, frente a ${fmt(hist3, 0)} M de media real en los tres últimos: justifica el salto (circulante, inversión, márgenes) o ajusta los supuestos.`);
  }

  // ── Escenarios (cada uno es el mismo DCF con ajustes) ──
  const escenarios = lista(d.escenarios?.casos).map((e) => {
    const aj = { dg: n(e.ajuste_crecimiento_pp) ?? 0, dm: n(e.ajuste_margen_pp) ?? 0, perfil: Object.fromEntries(lista(e.perfil).filter((x) => x?.periodo).map((x) => [String(x.periodo), x])) };
    const p = { ...base, wacc: wacc !== null ? wacc + (n(e.ajuste_wacc_pp) ?? 0) : null, g: n(e.crecimiento_terminal_pct) ?? base.g, multiplo: n(e.multiplo_salida) ?? base.multiplo };
    const r = valorarDcf(dcfIn, ctx, p, aj);
    return {
      escenario: e.escenario, probabilidad_pct: n(e.probabilidad_pct), narrativa: e.narrativa ?? null,
      crecimiento_medio_pct: r ? red(media(r.proyeccion.filter((x, i) => !lista(dcfIn.anios)[i]?.fijo).map((x) => x.crecimiento_pct))) : null,
      margen_final_pct: r ? red(r.proyeccion.at(-1)?.margen_ebitda_pct) : null,
      wacc_pct: red(p.wacc, 1), valor: r ? red(r.valor_accion, 2) : null, potencial_pct: r ? red(pct(r.valor_accion - precio, precio)) : null,
    };
  });
  const probTotal = sumaLaxa(...escenarios.map((e) => e.probabilidad_pct));
  if (escenarios.length) control('Probabilidades de los escenarios suman 100', Math.abs(probTotal - 100) < 0.5, Math.abs(probTotal - 100) < 0.5 ? '' : `Suman ${fmt(probTotal, 1)}.`);
  const valorPonderado = escenarios.length && escenarios.every((e) => e.valor !== null) ? red(escenarios.reduce((a, e) => a + e.valor * (e.probabilidad_pct ?? 0), 0) / (probTotal || 1), 2) : null;

  // ── Comparables ──
  const empresaFila = {
    nombre: id.nombre_corto || id.nombre, ticker: id.ticker, pais: id.pais_iso || null, capitalizacion: red(capitalizacion, 0),
    ev_ventas: red(div(valorEmpresa, ingresosLtm), 2), ev_ebitda_ltm: red(div(valorEmpresa, ebitdaLtm), 1), ev_ebitda_ntm: red(div(valorEmpresa, ebitdaNtm), 1),
    per_ntm: red(div(precio, bpaNtm), 1), crecimiento_pct: red(crecimientoNtm),
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
    regresion.fiable = regresion.r2 !== null && regresion.r2 >= 0.3;
    regresion.texto = `**Regresión EV/EBITDA NTM sobre crecimiento** (${regresion.n} comparables): múltiplo = ${fmt(regresion.ordenada, 1)} + ${fmt(regresion.pendiente, 2)} × crecimiento; R² = ${fmt(regresion.r2, 2)}. ` +
      (regresion.fiable
        ? `Para el crecimiento esperado de la empresa (${fmt(empresaFila.crecimiento_pct, 1)} %), el múltiplo ajustado es ${fmt(regresion.multiplo_ajustado, 1)}x y el valor por acción, ${fmt(regresion.valor_accion, 2)}.`
        : 'El crecimiento explica poco los múltiplos de estos comparables (R² < 0,3): la regresión no se usa en la valoración.');
    if (!regresion.fiable) control('Regresión múltiplo-crecimiento explicativa (R² ≥ 0,3)', false, `R² = ${fmt(regresion.r2, 2)}: el crecimiento no explica los múltiplos de estos comparables; no uses el valor de la regresión.`);
  }
  control('Al menos 5 comparables', pares.length >= 5, `${pares.length} comparables.`);
  {
    const vals = pares.map((x) => n(x.ev_ebitda_ntm)).filter((x) => x !== null);
    if (vals.length >= 5 && ebitdaNtm) {
      const sinUno = vals.map((_, i) => mediana(vals.filter((__, j) => j !== i)));
      const lo = Math.min(...sinUno), hi = Math.max(...sinUno), med = mediana(vals);
      if ((hi - lo) / med > 0.15) control('Comparables estables al quitar una empresa', false, `La mediana del EV/EBITDA NTM va de ${fmt(lo, 1)}x a ${fmt(hi, 1)}x según qué comparable se quite (${fmt(deEv(lo * ebitdaNtm), 2)} a ${fmt(deEv(hi * ebitdaNtm), 2)} por acción): la muestra es frágil; explícalo y no le des mucho peso.`);
    }
  }
  // EV/EBITDA de los últimos y de los próximos 12 meses con el mismo valor empresa: el salto entre
  // ambos es el crecimiento esperado del EBITDA. Un salto que no cuadra con el crecimiento de las
  // ventas suele ser una mezcla de definiciones de EBITDA entre proveedores.
  const saltos = [empresaFila, ...pares].filter((x) => {
    const ltmM = n(x.ev_ebitda_ltm), ntmM = n(x.ev_ebitda_ntm);
    if (!ltmM || !ntmM) return false;
    const gEbitda = (ltmM / ntmM - 1) * 100, gVentas = n(x.crecimiento_pct) ?? 0;
    return gEbitda > Math.max(30, 2 * gVentas + 15) || gEbitda < Math.min(-10, gVentas - 20);
  });
  if (saltos.length) control('Múltiplos LTM y NTM de cada comparable coherentes', false, `${saltos.map((x) => `${x.nombre} (${fmt(n(x.ev_ebitda_ltm), 1)}x → ${fmt(n(x.ev_ebitda_ntm), 1)}x)`).join(', ')}: el salto implica un crecimiento del EBITDA que no cuadra con el de las ventas. ¿EBITDA de proveedores distintos, o un cambio de perímetro?`);

  // ── Transacciones precedentes ──
  const ops = lista(d.transacciones?.operaciones).filter((o) => !o.excluir);
  const evEbitdaOps = ops.map((o) => o.ev_ebitda);
  // Si casi ninguna operación publica EV/EBITDA (tecnología, salud), se valora con EV/ventas.
  const evVentasOps = ops.map((o) => o.ev_ventas);
  const transPorVentas = validos(evEbitdaOps).length < 3 && validos(evVentasOps).length >= 3 && ingresosLtm !== null;
  const transacciones = transPorVentas ? {
    n: ops.length, metrica: 'EV/ventas', mediana_ev_ebitda: null, p25_ev_ebitda: null, p75_ev_ebitda: null,
    mediana_ev_ventas: red(mediana(evVentasOps), 2), prima_mediana_pct: red(mediana(ops.map((o) => o.prima_pct)), 0),
    valor_p25: red(deEv(percentil(evVentasOps, 25) * ingresosLtm), 2), valor_mediana: red(deEv(mediana(evVentasOps) * ingresosLtm), 2), valor_p75: red(deEv(percentil(evVentasOps, 75) * ingresosLtm), 2),
  } : validos(evEbitdaOps).length >= 3 && ebitdaLtm !== null ? {
    metrica: 'EV/EBITDA',
    n: ops.length, mediana_ev_ebitda: red(mediana(evEbitdaOps), 1), p25_ev_ebitda: red(percentil(evEbitdaOps, 25), 1), p75_ev_ebitda: red(percentil(evEbitdaOps, 75), 1),
    mediana_ev_ventas: red(mediana(ops.map((o) => o.ev_ventas)), 2), prima_mediana_pct: red(mediana(ops.map((o) => o.prima_pct)), 0),
    valor_p25: red(deEv(percentil(evEbitdaOps, 25) * ebitdaLtm), 2), valor_mediana: red(deEv(mediana(evEbitdaOps) * ebitdaLtm), 2), valor_p75: red(deEv(percentil(evEbitdaOps, 75) * ebitdaLtm), 2),
  } : null;

  // ── Suma de partes ──
  let sumaPartes = null;
  if (d.suma_partes?.aplica && lista(d.suma_partes.partes).length) {
    // Cada parte: métrica × múltiplo; o un valor empresa directo (`ev_directo`: rNPV de una cartera, una
    // participación cotizada); o `valor_metrica: "dcf"`, que toma el valor empresa del DCF.
    const evParte = (p, f = 1) => n(p.ev_directo) !== null ? n(p.ev_directo) * f
      : p.valor_metrica === 'dcf' ? (n(dcf?.valor_empresa) ?? null) === null ? null : n(dcf.valor_empresa) * f
        : n(p.valor_metrica) !== null && n(p.multiplo) !== null ? n(p.valor_metrica) * n(p.multiplo) * f : null;
    const partes = d.suma_partes.partes.map((p) => ({ ...p, ev: red(evParte(p), 0) }));
    const desc = 1 - (n(d.suma_partes.descuento_holding_pct) ?? 0) / 100;
    const evTotal = sumaLaxa(...partes.map((p) => p.ev)) * desc;
    const conAjuste = (f) => deEv(sumaLaxa(...d.suma_partes.partes.map((p) => evParte(p, f))) * desc);
    sumaPartes = { partes, ev_total: red(evTotal, 0), valor_accion: red(deEv(evTotal), 2), valor_min: red(conAjuste(0.85), 2), valor_max: red(conAjuste(1.15), 2), potencial_pct: red(pct(deEv(evTotal) - precio, precio)) };
    const vacias = partes.filter((p) => !p.ev);
    if (vacias.length) control('Suma de partes: todas las partes con valor', false, `${vacias.map((p) => p.segmento).join(', ')} sin valor (métrica, múltiplo o ev_directo): la suma se queda corta.`);
  }

  // ── Múltiplos históricos ──
  // Los LTM se calculan aquí con el precio de cierre de cada ejercicio y las cuentas de ese año
  // (mismo criterio que el múltiplo actual); los NTM, si el modelo los aporta de un proveedor.
  const serieMult = lista(d.multiplos_historicos?.serie).map((s) => {
    const c = cuentaIn.find((x) => String(x.periodo) === String(s.anio)) || {};
    const b = balance.find((x) => String(x.periodo) === String(s.anio)) || {};
    const p = n(s.precio_cierre), acc = n(c.acciones_diluidas);
    const ev = p !== null && acc !== null && b.deuda_neta !== null && b.deuda_neta !== undefined ? p * acc + b.deuda_neta + (b.minoritarios ?? 0) : null;
    return { ...s, ev_ebitda_ltm: n(c.ebitda) > 0 ? red(div(ev, n(c.ebitda)), 1) : null, per_ltm: n(c.bpa) > 0 ? red(div(p, n(c.bpa)), 1) : null, ev_ebitda_ntm: n(s.ev_ebitda_ntm) > 0 ? n(s.ev_ebitda_ntm) : null, per_ntm: n(s.per_ntm) > 0 ? n(s.per_ntm) : null };
  });
  const multHist = [
    ['EV/EBITDA últimos 12 meses (cierre de cada año)', 'ev_ebitda_ltm', empresaFila.ev_ebitda_ltm],
    ['PER últimos 12 meses (cierre de cada año)', 'per_ltm', red(div(precio, bpaLtm), 1)],
    ['EV/EBITDA próximos 12 meses', 'ev_ebitda_ntm', empresaFila.ev_ebitda_ntm],
    ['PER próximos 12 meses', 'per_ntm', empresaFila.per_ntm],
  ].map(([metrica, campo, actual]) => {
    const vals = serieMult.filter((s) => !s.excluir).map((s) => s[campo]);
    const v = validos(vals);
    if (v.length < 3) return null;
    return {
      metrica, campo, actual, media: red(mediana(vals), 1), minimo: red(Math.min(...v), 1), maximo: red(Math.max(...v), 1),
      percentil: actual !== null ? red((100 * v.filter((x) => x <= actual).length) / v.length, 0) : null,
      prima_pct: red(pct(actual - mediana(vals), mediana(vals)), 0), anios: v.length,
    };
  }).filter(Boolean);
  const principal = multHist.find((m) => m.campo === 'ev_ebitda_ltm') || multHist.find((m) => m.campo === 'ev_ebitda_ntm');
  const serieMultGraf = principal ? serieMult.map((s) => ({ anio: s.anio, multiplo: n(s[principal.campo]), media: principal.media })) : [];
  const tituloMultHist = principal?.metrica ?? null;

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
    if (Math.abs(c.ebitda_dif_pct ?? 0) > 15) control(`Proyección propia frente a consenso (${c.periodo})`, false, `EBITDA propio ${fmt(c.ebitda_dif_pct)} % frente al consenso: justifica la diferencia en el DCF.`);
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
  if (implNtm?.valor_mediana && implPer?.valor_mediana) {
    const hi = Math.max(implNtm.valor_mediana, implPer.valor_mediana), lo = Math.min(implNtm.valor_mediana, implPer.valor_mediana);
    if (lo > 0 && hi / lo > 1.5) control('Comparables: EV/EBITDA y PER coherentes', false, `EV/EBITDA da ${fmt(implNtm.valor_mediana, 2)} y PER ${fmt(implPer.valor_mediana, 2)} por acción: si la empresa amortiza mucho más que sus comparables (licencias, intangibles adquiridos) el EBITDA la favorece; usa EV/EBIT o EV/(EBITDA − capex) y explícalo.`);
  }
  if (implNtm) fila('Comparables: EV/EBITDA NTM', implNtm.valor_p25, implNtm.valor_mediana, implNtm.valor_p75);
  if (implPer) fila('Comparables: PER NTM', implPer.valor_p25, implPer.valor_mediana, implPer.valor_p75);
  // Un método que no pesa en el valor objetivo y se sale más del doble del precio solo deforma el gráfico.
  const pesoTrans = n(d.valoracion?.pesos?.transacciones) ?? 0;
  if (transacciones && !(pesoTrans === 0 && precio && (transacciones.valor_mediana > 2 * precio || transacciones.valor_mediana < 0.5 * precio))) fila(`Transacciones precedentes (${transacciones.metrica})`, transacciones.valor_p25, transacciones.valor_mediana, transacciones.valor_p75);
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
  // Con un bajista casi en el precio la división se dispara (DSV: 136,78x); por encima de 20x ya no informa.
  const fmtAsim = (x) => (x > 20 ? 'más de 20x' : `${fmt(x, 2)}x`);
  const tablaSintesis = Object.entries(centrales).map(([k, v]) => {
    const p = n(pesos[k]) ?? 0;
    if (v !== null && p > 0) { sumaPesos += p; acumulado2 += v * p; }
    return { metodo: { dcf: 'DCF', comparables: 'Comparables (mediana EV/EBITDA y PER)', transacciones: 'Transacciones precedentes', suma_partes: 'Suma de partes', escenarios: 'Escenarios ponderados' }[k] + (p === 0 && v !== null ? ' (no se usa)' : ''), valor: red(v, 2), peso_pct: v === null ? null : p, potencial_pct: red(pct(v - precio, precio)) };
  }).filter((x) => x.valor !== null);
  const pesosDeclarados = sumaLaxa(...Object.values(pesos).map(n));
  control('Pesos de la síntesis suman 100', Math.abs(pesosDeclarados - 100) < 0.5, Math.abs(pesosDeclarados - 100) < 0.5 ? '' : `Suman ${fmt(pesosDeclarados, 1)}.`);
  const valorObjetivo = sumaPesos ? red(acumulado2 / sumaPesos, 2) : null;

  // ── Valor con la prima implícita del mercado (regla relativa) ──
  // DCF y escenarios se recalculan con ese WACC; comparables, transacciones y suma de partes ya son
  // precios de mercado y no cambian. Mismos pesos.
  let relativo = null;
  if (waccRel !== null && dcf) {
    const dRel = valorarDcf(dcfIn, ctx, { ...base, wacc: waccRel });
    const escRel = lista(d.escenarios?.casos).map((e) => {
      const aj = { dg: n(e.ajuste_crecimiento_pp) ?? 0, dm: n(e.ajuste_margen_pp) ?? 0, perfil: Object.fromEntries(lista(e.perfil).filter((x) => x?.periodo).map((x) => [String(x.periodo), x])) };
      const r = valorarDcf(dcfIn, ctx, { ...base, wacc: waccRel + (n(e.ajuste_wacc_pp) ?? 0), g: n(e.crecimiento_terminal_pct) ?? base.g, multiplo: n(e.multiplo_salida) ?? base.multiplo }, aj);
      return { escenario: e.escenario, probabilidad_pct: n(e.probabilidad_pct), valor: r ? r.valor_accion : null };
    });
    const pRel = sumaLaxa(...escRel.map((e) => e.probabilidad_pct));
    const pondRel = escRel.length && escRel.every((e) => e.valor !== null) ? escRel.reduce((a, e) => a + e.valor * (e.probabilidad_pct ?? 0), 0) / (pRel || 1) : null;
    const cRel = { ...centrales, dcf: dRel?.valor_accion ?? null, escenarios: pondRel };
    let sp = 0, ac = 0;
    for (const [k, v] of Object.entries(cRel)) { const p = n(pesos[k]) ?? 0; if (v !== null && p > 0) { sp += p; ac += v * p; } }
    const rangoRel = [-0.5, 0.5].map((x) => valorarDcf(dcfIn, ctx, { ...base, wacc: waccRel + x })?.valor_accion).filter((x) => x !== null && x !== undefined);
    relativo = {
      prima_implicita_pct: primaImpl, wacc: red(waccRel, 2), ke: red(keRel, 2), dcf: red(dRel?.valor_accion, 2),
      dcf_min: rangoRel.length ? red(Math.min(...rangoRel), 2) : null, dcf_max: rangoRel.length ? red(Math.max(...rangoRel), 2) : null,
      valor_objetivo: sp ? red(ac / sp, 2) : null,
      alcista: escRel.find((e) => /alcista/i.test(e.escenario || ''))?.valor ?? null,
      bajista: escRel.find((e) => /bajista/i.test(e.escenario || ''))?.valor ?? null,
      mercado: refMercado.mercado ?? null, fecha: refMercado.fecha ?? null,
    };
    if (dRel && precio) rangos.splice(rangos.length - (precio !== null ? 1 : 0), 0, { metodo: 'DCF con la prima del mercado', etiqueta: `DCF con la prima implícita del mercado (${fmt(primaImpl, 1)} %)`, min: relativo.dcf_min ?? relativo.dcf, central: relativo.dcf, max: relativo.dcf_max ?? relativo.dcf });
  }

  // ── Recomendación ──
  // Regla: rentabilidad total esperada a 12 meses (potencial hasta el valor objetivo + dividendo ordinario)
  // y asimetría (lo que se gana en el alcista frente a lo que se pierde en el bajista).
  //   Comprar:  rentabilidad ≥ 15 % y asimetría ≥ 1
  //   Vender:   rentabilidad ≤ −10 %, o negativa con asimetría < 0,5
  //   Mantener: el resto
  const res = d.resumen || {};
  const dpaOrdinario = (n(ltm.dpa) ?? ultimoCalc.dpa ?? 0) - (n(ltm.dpa_extraordinario) ?? ultimoCalc.dpa_extraordinario ?? 0);
  const rentDiv = precio ? (100 * dpaOrdinario) / precio : 0;
  const potObj = valorObjetivo !== null && precio ? pct(valorObjetivo - precio, precio) : null;
  const rte = potObj === null ? null : potObj + rentDiv;
  const esc = (nombre) => escenarios.find((e) => new RegExp(nombre, 'i').test(e.escenario || ''));
  const potAlc = esc('alcista')?.potencial_pct ?? null, potBaj = esc('bajista')?.potencial_pct ?? null;
  const asimetria = potAlc !== null && potBaj !== null && potBaj < 0 ? potAlc / Math.abs(potBaj) : null;
  // La misma regla para cualquier valor objetivo y sus escenarios, a un precio dado
  const reglaCon = (vObj, vA, vB, p) => {
    if (vObj === null || vObj === undefined || !p) return null;
    const r = (100 * (vObj - p)) / p + (100 * dpaOrdinario) / p;
    const a = vA !== null && vA !== undefined && vB !== null && vB !== undefined && vB < p ? (vA / p - 1) / Math.abs(vB / p - 1) : null;
    return r >= 15 && (a === null || a >= 1) ? 'Comprar' : r <= -10 || (r < 0 && a !== null && a < 0.5) ? 'Vender' : 'Mantener';
  };
  // Las dos reglas: manda la relativa (el coste de oportunidad real es el mercado), salvo que la absoluta
  // diga lo contrario (Comprar frente a Vender): entonces Mantener. Y un Comprar que solo da la relativa exige
  // además al menos un 5 % de rentabilidad con nuestro coste de capital (aprobado el 9 oct 2026): «Comprar»
  // con una rentabilidad propia nula (Rentokil −2 %, bioMérieux +1 %) no se sostiene ante el comité.
  const RTE_MIN_SOLO_RELATIVA = 5;
  const combinar = (abs, rel, rAbs) => (!rel ? abs : !abs ? rel
    : (abs === 'Comprar' && rel === 'Vender') || (abs === 'Vender' && rel === 'Comprar') ? 'Mantener'
      : rel === 'Comprar' && abs !== 'Comprar' && rAbs !== null && rAbs !== undefined && rAbs < RTE_MIN_SOLO_RELATIVA ? 'Mantener' : rel);
  const rteEn = (vObj, p) => (vObj === null || vObj === undefined || !p ? null : (100 * (vObj - p)) / p + (100 * dpaOrdinario) / p);
  const reglaAbs = rte === null ? null
    : rte >= 15 && (asimetria === null || asimetria >= 1) ? 'Comprar'
      : rte <= -10 || (rte < 0 && asimetria !== null && asimetria < 0.5) ? 'Vender' : 'Mantener';
  const reglaRel = relativo ? reglaCon(relativo.valor_objetivo, relativo.alcista, relativo.bajista, precio) : null;
  const reglaValor = combinar(reglaAbs, reglaRel, rte);
  // Objetivo a 12 meses (método v2): NUESTRO BPA × NUESTRO PER con la regla común (motor/objetivo12m.mjs). Si está,
  // la recomendación sigue a su rentabilidad; el valor intrínseco queda como referencia a largo plazo y como filtro
  // de valor real para comprar. El consenso solo se compara.
  const prob12 = ['bajista', 'base', 'alcista'].map((k) => n(lista(d.escenarios?.casos).find((e) => new RegExp(k, 'i').test(e.escenario || ''))?.probabilidad_pct));
  const o12 = calcularObjetivo12m(d.valoracion?.objetivo_12m, { precio, dpa: dpaOrdinario, prob: prob12.every((x) => x !== null) ? prob12 : null, valorIntrinseco: valorObjetivo, confianza: res.confianza });
  const con12 = !!o12?.completo;
  // Al lado, para comparar (14-oct-2026): la cifra con la regla v2 (historia al cierre, guardada en per_historico.v2 por la
  // migración) y con el tope anterior del base (×1,3). Decide siempre la regla vigente.
  if (con12 && (o12.version === 'v3' || o12.selector)) {
    const oh = d.valoracion.objetivo_12m, opc = { precio, dpa: dpaOrdinario, prob: prob12.every((x) => x !== null) ? prob12 : null, valorIntrinseco: valorObjetivo, confianza: res.confianza }, partes = [];
    if (oh.per_historico?.v2) {
      const c2 = calcularObjetivo12m({ ...oh, per_historico: { ...oh.per_historico.v2, actual: oh.per_historico.actual, base: 'cierre' } }, opc);
      if (c2?.completo) { o12.v2 = { rentabilidad_ponderada_pct: c2.rentabilidad_ponderada_pct, rentabilidad_base_pct: c2.rentabilidad_base_pct, senal: c2.senal, multiplos: c2.filas.map((f) => f.multiplo) }; partes.push(`con la regla v2 (historia al cierre, mismo precio): ${c2.filas.map((f) => `${fmt(f.multiplo, 1)}x`).join(' / ')}, ${fmt(c2.rentabilidad_ponderada_pct, 1)} % ${c2.senal}`); }
    }
    if (REGLA_12M.v3.topeBaseAnterior) {
      const c3 = calcularObjetivo12m(oh, { ...opc, topeBase: REGLA_12M.v3.topeBaseAnterior, selector: false });
      if (c3?.completo && Math.abs(c3.rentabilidad_ponderada_pct - o12.rentabilidad_ponderada_pct) > 0.05) { o12.v3_tope_anterior = { tope: REGLA_12M.v3.topeBaseAnterior, rentabilidad_ponderada_pct: c3.rentabilidad_ponderada_pct, senal: c3.senal }; partes.push(`con el tope anterior del base (×${String(REGLA_12M.v3.topeBaseAnterior).replace('.', ',')}, 14-oct mediodía): ${fmt(c3.rentabilidad_ponderada_pct, 1)} % ${c3.senal}`); }
    }
    // Selector de método (14-oct-2026, noche): si eligió la v2 (desrateada o historia corta), se da la v3 sin selector al lado.
    const sel = o12.selector ? { ...o12.selector, motivo: String(o12.selector.motivo).replace(/(\d)\.(\d)/g, '$1,$2') } : null;
    if (sel && sel.regla !== 'v3' && sel.v3_sin_selector) { o12.v3_sin_selector = sel.v3_sin_selector; partes.push(`con la v3 sin el selector (tope ×${String(REGLA_12M.v3.topeBase).replace('.', ',')}): ${fmt(sel.v3_sin_selector.rentabilidad_ponderada_pct, 1)} % ${sel.v3_sin_selector.senal}`); }
    const decide = sel ? (sel.regla === 'v3' ? `Decide la v3 con tope ×${String(REGLA_12M.v3.topeBase).replace('.', ',')}, elegida por el selector de método (${sel.motivo}; METODO-VIGENTE.md)` : `Decide la ${sel.regla}, elegida por el selector de método (${sel.motivo}; METODO-VIGENTE.md)`) : `Decide la regla vigente (v3 con tope ×${String(REGLA_12M.v3.topeBase).replace('.', ',')}; METODO-VIGENTE.md)`;
    if (partes.length) o12.comparacion_txt = `Para comparar, ${partes.join('; ')}. ${decide}.`;
  }
  if (!con12) control('Objetivo a 12 meses (PER propio × BPA propio)', false, 'Falta valoracion.objetivo_12m: la rentabilidad a 12 meses sale del valor intrínseco.');
  if (con12) {
    // Compra robusta (pruebas de robustez, 14-oct-2026): un Comprar de v3 que v2 no confirma se marca; para comprar o ampliar
    // hace falta que pasen las dos reglas (backtest: las compras que v2 no confirma aciertan menos, 58 % frente a 68 %, y
    // pierden más, 17 % frente a 8 %). Para mantener basta la vigente.
    if (o12.senal === 'Comprar' || o12.senal_sin_confirmar === 'Comprar') control('Compra robusta (v3 y v2 dan Comprar)', o12.v2 ? o12.v2.senal === 'Comprar' : null, o12.v2 ? (o12.v2.senal === 'Comprar' ? '' : `La regla v2 (historia al cierre) da ${o12.v2.senal} con ${fmt(o12.v2.rentabilidad_ponderada_pct, 1)} %: para comprar o ampliar hace falta motivo de negocio propio; para mantener basta la vigente.`) : 'Sin historia v2 al lado: no se puede contrastar.');
    // Crecimiento del BPA exigido (D6 de las pruebas de robustez): si el BPA base del ejercicio objetivo supone más de un 25 %
    // anual desde el último BPA real, la cifra depende de un rebote que el informe tiene que explicar; si no, confianza baja.
    const ultReal = lista(d.financieros?.cuenta).filter((c) => n(c.bpa) !== null && n(c.bpa) > 0).at(-1);
    const bpaBase = o12.filas.find((f) => f.escenario === 'Base')?.beneficio_por_accion ?? null;
    const anioObj = n(String(d.valoracion.objetivo_12m.ejercicio || '').replace(/\D/g, '').slice(0, 4)), anioUlt = ultReal ? n(String(ultReal.periodo).replace(/\D/g, '').slice(0, 4)) : null;
    if (ultReal && bpaBase !== null && anioObj && anioUlt && anioObj > anioUlt) {
      const cagr = ((bpaBase / n(ultReal.bpa)) ** (1 / (anioObj - anioUlt)) - 1) * 100;
      control('Crecimiento del BPA base ≤ 25 % anual desde el último real', cagr <= 25, cagr <= 25 ? '' : `El BPA base de ${d.valoracion.objetivo_12m.ejercicio} (${fmt(bpaBase, 2)}) supone un ${fmt(cagr, 1)} % anual desde ${fmt(n(ultReal.bpa), 2)} (${ultReal.periodo}): explícalo en valoracion.objetivo_12m.comentario o la confianza es baja.`);
    }
  }
  else {
    const fuera = o12.filas.filter((f) => f.multiplo_informe !== null && f.multiplo !== null && Math.abs(f.multiplo_informe / f.multiplo - 1) > 0.02);
    control('Múltiplos del objetivo a 12 m según la regla común', !fuera.length, fuera.length ? `El informe pone ${fuera.map((f) => `${f.escenario} ${fmt(f.multiplo_informe, 1)}x`).join(', ')} y la regla da ${fuera.map((f) => `${fmt(f.multiplo, 1)}x`).join(', ')}: el motor usa la regla.` : '');
    const dc = o12.diferencia_consenso_pct;
    if (dc !== null) control('Objetivo 12 m frente al consenso', Math.abs(dc) <= 15 || !!String(d.valoracion.objetivo_12m.diferencia_consenso || '').trim(),
      `El base se separa un ${fmt(dc, 1)} % del objetivo medio de los analistas: explícalo en diferencia_consenso (nunca se acerca la cifra).`);
  }
  const regla = con12 ? o12.senal : reglaValor;
  // Confianza de datos «Baja» (decisión del usuario, 14-oct-2026): la regla da Comprar pero la señal se queda en
  // Mantener hasta confirmar las cifras con fuente primaria; se avisa en los controles y en «La decisión».
  if (con12 && o12.senal_sin_confirmar) control('Comprar pendiente de confirmar los datos (confianza baja)', false, `La regla a 12 meses da «${o12.senal_sin_confirmar}» pero la confianza del resumen es Baja: la señal se queda en Mantener; di en la síntesis qué cifras hay que confirmar con fuente primaria.`);
  // Un precio, una fecha (14-oct-2026): el precio del informe tiene que ser el cierre de la fecha de corte o de una
  // de las dos sesiones anteriores; con uno más viejo (Bureau Veritas se cerró Comprar con un cierre de seis días
  // antes) no se cierra un Comprar: herramientas/precios.mjs trae el último cierre y apuntar-12m lo recalcula.
  if (id.fecha_precio && /^\d{4}-\d{2}-\d{2}$/.test(id.fecha_precio)) {
    let sesiones = 0;
    for (let t = new Date(id.fecha_precio + 'T00:00:00Z'); t < fechaCorte; t.setUTCDate(t.getUTCDate() + 1)) if (![0, 6].includes(t.getUTCDay())) sesiones++;
    const viejo = sesiones > 2;
    control('Precio del cierre de la fecha de corte (o de las dos sesiones anteriores)', !viejo, viejo ? `El precio es del ${id.fecha_precio}, ${sesiones} sesiones antes del corte (${meta.fecha_corte}): con un precio viejo no se cierra un Comprar. Último cierre: node herramientas/precios.mjs <ticker>; luego herramientas/apuntar-12m.mjs --precios.` : '');
  }
  if (con12 && !/^adelantad/i.test(String(d.valoracion?.objetivo_12m?.per_historico?.base || ''))) control('Historia del PER en la misma base que el actual (regla v3)', false, 'per_historico no lleva base: "adelantado" (precio de cierre ÷ BPA del año siguiente): el motor aplica la regla v2 antigua, sesgada contra las empresas baratas. En un informe nuevo, rellena la historia adelantada.');
  const potRel = relativo?.valor_objetivo && precio ? pct(relativo.valor_objetivo - precio, precio) : null;
  const asimRel = relativo && relativo.alcista !== null && relativo.bajista !== null && relativo.bajista < precio ? (relativo.alcista / precio - 1) / Math.abs(relativo.bajista / precio - 1) : null;
  const recomendacionFinal = res.recomendacion || regla;
  const coincide = !res.recomendacion || !regla || res.recomendacion === regla;
  control('Recomendación coherente con la regla de decisión', coincide || !!res.justificacion_recomendacion,
    coincide ? '' : `La regla da «${regla}» y el análisis recomienda «${res.recomendacion}»: hace falta «justificacion_recomendacion».`);
  // Divisa de cotización distinta de la de las cuentas (On: cuentas en CHF, cotiza en USD): los precios
  // de la decisión se dan también en la divisa en que se compra la acción. tipo_cambio = unidades de
  // meta.divisa por 1 unidad de meta.divisa_cotizacion.
  const tc = n(meta.tipo_cambio);
  const divCot = meta.divisa_cotizacion && meta.divisa_cotizacion !== meta.divisa && tc ? meta.divisa_cotizacion : null;
  const enCot = (v) => (divCot && v !== null && v !== undefined && Number.isFinite(v) ? ` (${fmt(v / tc, 2)} ${divCot})` : '');
  // Precio a partir del cual cambia la regla, con todas sus condiciones (también la asimetría, que depende
  // del precio): se recorre una rejilla de precios alrededor del valor objetivo.
  const vAlc = esc('alcista')?.valor ?? null, vBaj = esc('bajista')?.valor ?? null;
  const reglaEn = (p) => combinar(reglaCon(valorObjetivo, vAlc, vBaj, p), relativo ? reglaCon(relativo.valor_objetivo, relativo.alcista, relativo.bajista, p) : null, rteEn(valorObjetivo, p));
  let nivelCompra = null, nivelVenta = null;
  if (valorObjetivo) {
    for (let k = 0; k <= 3000; k++) {
      const p = valorObjetivo * (0.2 + k * 0.001);
      const r = reglaEn(p);
      if (r === 'Comprar') nivelCompra = p;
      if (r === 'Vender' && nivelVenta === null) nivelVenta = p;
    }
  }
  const sug = conviccionSugerida({ recomendacion: recomendacionFinal, reglaAbs, reglaRel, rte, rteRel: potRel === null ? null : potRel + rentDiv,
    asimetria, bajista: potBaj, gImplicito: dcf?.inverso?.crecimiento_implicito_pct, gBase: dcf?.inverso?.crecimiento_base_pct });
  const convSintesis = String(res.sintesis || '').match(/convicci[oó]n/gi)?.length ?? 0;
  if (res.conviccion && sug.conviccion && res.conviccion.toLowerCase() !== sug.conviccion.toLowerCase())
    control('Convicción frente a la sugerida por los criterios', convSintesis >= 2,
      `Los criterios dan «${sug.conviccion}» (${sug.razones.join('; ')}) y el análisis pone «${res.conviccion}»: explica en la síntesis por qué te apartas.`);
  if (res.sintesis) control('La síntesis explica la convicción', convSintesis >= 2, 'La síntesis debe decir por qué tiene esa convicción y qué la subiría o la bajaría.');
  if (primaImpl === null) control('Prima implícita del mercado (regla relativa)', false, 'Falta valoracion.referencia_mercado.prima_implicita_pct: la recomendación sale solo de la regla absoluta.');
  if (meta.divisa_cotizacion && meta.divisa_cotizacion !== meta.divisa && !tc) control('Tipo de cambio de la divisa de cotización', false, 'Falta meta.tipo_cambio: los precios de la decisión solo salen en la divisa de las cuentas.');
  // Precio y objetivo en la misma divisa (Constellation, 14-oct-2026: precio en CAD frente a objetivo en USD). Si el mercado o
  // el ticker nombran una divisa distinta de la de las cuentas y no hay divisa de cotización declarada, hay que revisarlo.
  {
    const texto = `${id.mercado || ''} ${id.ticker || ''}`;
    const codigos = [...new Set((texto.match(/\b(USD|EUR|GBP|GBp|CHF|JPY|CAD|AUD|SEK|DKK|NOK|HKD|TWD|CNY|SGD|PLN|CZK|ZAR|BRL|MXN|INR|KRW)\b/g) || []))].filter((c) => c.toUpperCase() !== String(meta.divisa || '').toUpperCase());
    if (codigos.length && !meta.divisa_cotizacion) control('Precio y objetivo en la misma divisa', false, `El mercado nombra ${codigos.join(', ')} y las cuentas van en ${meta.divisa}: pon meta.divisa_cotizacion y meta.tipo_cambio (el precio del informe va en la divisa de las cuentas) o el precio y el objetivo no son comparables.`);
  }
  const recomendacion = {
    recomendacion: recomendacionFinal, regla, regla_absoluta: reglaAbs, regla_relativa: reglaRel, coincide, conviccion: res.conviccion ?? null,
    conviccion_sugerida: sug.conviccion, conviccion_razones: sug.razones,
    reglas_discrepan: !!(reglaRel && reglaAbs && reglaRel !== reglaAbs),
    relativo: relativo ? { ...relativo, potencial_pct: red(potRel), rentabilidad_total_pct: potRel === null ? null : red(potRel + rentDiv), asimetria: red(asimRel, 2) } : null,
    objetivo_mercado_txt: relativo?.valor_objetivo ? ` · con la prima implícita del mercado: ${fmt(relativo.valor_objetivo, 2)}${enCot(relativo.valor_objetivo)} (${potRel >= 0 ? '+' : ''}${fmt(potRel, 1)} %)` : '',
    // Portada: si hay regla relativa, la tarjeta enseña también el objetivo y la rentabilidad con la prima del mercado
    // (con un Comprar que solo da la relativa, el objetivo absoluto solo no llega al 15 % y parece contradecirlo).
    objetivo_mercado_corto: relativo?.valor_objetivo ? ` · mercado ${fmt(relativo.valor_objetivo, 2)}` : '',
    rentabilidad_mercado_corto: relativo?.valor_objetivo && potRel !== null ? ` · mercado ${potRel + rentDiv >= 0 ? '+' : ''}${fmt(potRel + rentDiv, 1)} %` : '',
    potencial_pct: red(potObj), dividendo_pct: red(rentDiv), rentabilidad_total_pct: red(rte),
    alcista_pct: potAlc, bajista_pct: potBaj, asimetria: red(asimetria, 2),
    comprar_por_debajo: con12 ? o12.comprar_por_debajo : red(nivelCompra, 2),
    vender_por_encima: con12 ? o12.vender_por_encima : red(nivelVenta, 2),
    tabla: [
      ...(con12 ? [
        { concepto: `Objetivo a 12 meses (nuestro PER × nuestro BPA ${d.valoracion.objetivo_12m.ejercicio || ''}, ponderado ${o12.probabilidades.join('/')})`, valor: `${fmt(o12.objetivo_ponderado, 2)} ${meta.divisa || ''}${enCot(o12.objetivo_ponderado)}` },
        { concepto: 'Bajista / base / alcista a 12 meses', valor: o12.filas.map((f) => `${fmt(f.multiplo, 1)}x × ${fmt(f.beneficio_por_accion, 2)} = ${fmt(f.precio, 2)}`).join(' · ') },
        { concepto: 'Rentabilidad a 12 meses: ponderada / del base (con dividendo)', valor: `${fmt(o12.rentabilidad_ponderada_pct, 1)} % / ${fmt(o12.rentabilidad_base_pct, 1)} %` },
        { concepto: 'Regla de múltiplos aplicada', valor: (o12.version === 'v3' ? `v3: base a mitad de camino hacia la mediana adelantada, sin alejarse del actual más de ×${String(REGLA_12M.v3.topeBase).replace('.', ',')}; bajista mín. 5 a (adelantado) o base × 0,80; alcista techo base × 1,35` : 'v2: base = mín(actual, mediana 5 a) con la historia al cierre; bajista mín. 5 a o base × 0,85; alcista techo base × 1,30') + (o12.selector ? ` (selector de método: ${String(o12.selector.motivo).replace(/(\d)\.(\d)/g, '$1,$2')})` : '') },
        ...(o12.senal_sin_confirmar ? [{ concepto: 'Señal pendiente de confirmar (confianza de datos baja)', valor: `La regla da ${o12.senal_sin_confirmar}; se queda en Mantener hasta confirmar las cifras con fuente primaria` }] : []),
        ...(o12.consenso_objetivo ? [{ concepto: 'Objetivo medio de los analistas (solo contraste)', valor: `${fmt(o12.consenso_objetivo, 2)} (nuestro base ${o12.diferencia_consenso_pct >= 0 ? '+' : ''}${fmt(o12.diferencia_consenso_pct, 1)} %)` }] : []),
      ] : []),
      { concepto: con12 ? 'Valor intrínseco (síntesis ponderada, largo plazo)' : 'Valor objetivo (síntesis ponderada)', valor: valorObjetivo === null ? 'n.d.' : `${fmt(valorObjetivo, 2)} ${meta.divisa || ''}${enCot(valorObjetivo)}` },
      ...(divCot ? [{ concepto: `Precio actual (${divCot} al tipo de ${fmt(tc, 4)} ${meta.divisa} por ${divCot})`, valor: `${fmt(precio, 2)} ${meta.divisa}${enCot(precio)}` }] : []),
      { concepto: 'Potencial sobre el precio actual', valor: potObj === null ? 'n.d.' : `${fmt(potObj, 1)} %` },
      { concepto: 'Rentabilidad por dividendo ordinario', valor: `${fmt(rentDiv, 1)} %` },
      { concepto: 'Rentabilidad total esperada a 12 meses', valor: rte === null ? 'n.d.' : `${fmt(rte, 1)} %` },
      { concepto: 'Escenario alcista / bajista', valor: potAlc === null || potBaj === null ? 'n.d.' : `${fmt(potAlc, 1)} % / ${fmt(potBaj, 1)} %` },
      { concepto: 'Asimetría (ganancia alcista / pérdida bajista)', valor: asimetria === null ? 'n.d.' : fmtAsim(asimetria) },
      ...(dcf?.inverso?.rentabilidad_implicita_pct !== null && dcf?.inverso?.rentabilidad_implicita_pct !== undefined ? [{ concepto: relativo ? 'Rentabilidad anual implícita en el precio frente al WACC y al que pide el mercado' : 'Rentabilidad anual implícita en el precio frente al WACC', valor: `${fmt(dcf.inverso.rentabilidad_implicita_pct, 1)} % frente a ${fmt(dcf.wacc, 1)} %${relativo ? ` y ${fmt(relativo.wacc, 1)} %` : ''}` }] : []),
      ...(relativo ? [
        { concepto: `Valor objetivo con la prima implícita del mercado (${fmt(primaImpl, 1)} %, WACC ${fmt(relativo.wacc, 1)} %)`, valor: relativo.valor_objetivo === null ? 'n.d.' : `${fmt(relativo.valor_objetivo, 2)} ${meta.divisa || ''}${enCot(relativo.valor_objetivo)}` },
        { concepto: 'Rentabilidad total esperada con la prima del mercado', valor: potRel === null ? 'n.d.' : `${fmt(potRel + rentDiv, 1)} %` },
        { concepto: 'Asimetría con la prima del mercado', valor: asimRel === null ? 'n.d.' : fmtAsim(asimRel) },
        { concepto: 'Regla absoluta (frente a su coste de capital)', valor: reglaAbs ?? 'n.d.' },
        { concepto: 'Regla relativa (frente a lo que pide el mercado)', valor: reglaRel ?? 'n.d.' },
      ] : []),
      ...(dcf?.inverso?.crecimiento_implicito_pct !== null && dcf?.inverso?.crecimiento_implicito_pct !== undefined && n(d.sector?.tcac_previsto_pct) !== null ? [{ concepto: `Crecimiento anual implícito en el precio (${dcf.inverso.periodo}) frente al previsto para su mercado`, valor: `${fmt(dcf.inverso.crecimiento_implicito_pct, 1)} % frente a ${fmt(n(d.sector.tcac_previsto_pct), 1)} %` }] : []),
      ...(dcf?.sostenibilidad ? [{ concepto: '¿La calidad de la empresa sostiene el crecimiento previsto?', valor: `${dcf.sostenibilidad.veredicto ?? 'n.d.'} (${fmt(dcf.sostenibilidad.crecimiento_proyectado_pct, 1)} % anual proyectado${dcf.sostenibilidad.crecimiento_financiable_pct !== null ? `; financiable al ROIC actual: ${fmt(dcf.sostenibilidad.crecimiento_financiable_pct, 1)} %` : '; sin inversión neta'})` }] : []),
      ...(con12 ? [{ concepto: 'Señal del valor intrínseco (regla del DCF, referencia)', valor: reglaValor ?? 'n.d.' }] : []),
      { concepto: con12 ? `Recomendación según la regla a 12 meses (Comprar: ponderada ≥ ${REGLA_12M.comprar} %, base ≥ ${REGLA_12M.comprarBase} % y valor intrínseco ≥ precio; Vender: ponderada ≤ ${REGLA_12M.vender} %)` : relativo ? 'Recomendación según las reglas (manda la relativa salvo contradicción; un Comprar solo relativo exige ≥ 5 % con nuestro coste de capital)' : 'Recomendación según la regla', valor: regla ?? 'n.d.' },
      ...(sug.conviccion ? [{ concepto: `Convicción según los criterios (${sug.razones.join('; ')})`, valor: sug.conviccion }] : []),
    ],
    niveles: con12 ? [
      { accion: 'Comprar', condicion: `Por debajo de ${fmt(o12.comprar_por_debajo, 2)}${enCot(o12.comprar_por_debajo)} (ponderada a 12 meses ≥ ${REGLA_12M.comprar} %, base ≥ ${REGLA_12M.comprarBase} % y precio ≤ valor intrínseco)` },
      { accion: 'Mantener', condicion: `Entre ${fmt(o12.comprar_por_debajo, 2)} y ${fmt(o12.vender_por_encima, 2)}${divCot ? ` (${fmt(o12.comprar_por_debajo / tc, 2)} y ${fmt(o12.vender_por_encima / tc, 2)} ${divCot})` : ''}` },
      { accion: 'Vender o reducir', condicion: `Por encima de ${fmt(o12.vender_por_encima, 2)}${enCot(o12.vender_por_encima)} (ponderada a 12 meses ≤ ${REGLA_12M.vender} %)` },
    ] : valorObjetivo ? [
      { accion: 'Comprar', condicion: nivelCompra ? `Por debajo de ${fmt(nivelCompra, 2)}${enCot(nivelCompra)} (rentabilidad total esperada ≥ 15 % y el alcista compensa al bajista${relativo ? ', con la regla combinada' : ''})` : 'Ningún precio cercano cumple a la vez rentabilidad ≥ 15 % y asimetría ≥ 1' },
      { accion: 'Mantener', condicion: nivelCompra && nivelVenta ? `Entre ${fmt(nivelCompra, 2)} y ${fmt(nivelVenta, 2)}${divCot ? ` (${fmt(nivelCompra / tc, 2)} y ${fmt(nivelVenta / tc, 2)} ${divCot})` : ''}` : nivelVenta ? `Por debajo de ${fmt(nivelVenta, 2)}${enCot(nivelVenta)}` : 'En el resto de precios' },
      { accion: 'Vender o reducir', condicion: nivelVenta ? `Por encima de ${fmt(nivelVenta, 2)}${enCot(nivelVenta)} (rentabilidad total esperada ≤ −10 %, o negativa con un bajista que pesa el doble que el alcista${relativo ? ', con la regla combinada' : ''})` : 'Ningún precio cercano' },
    ] : [],
    precio_txt: enCot(precio), valor_objetivo_txt: enCot(valorObjetivo),
    regla_valor_intrinseco: reglaValor,
    objetivo_12m: con12 ? o12 : null,
    rentabilidad_12m_pct: con12 ? o12.rentabilidad_ponderada_pct : red(rte),
    rentabilidad_12m_txt: con12 ? `${o12.rentabilidad_ponderada_pct >= 0 ? '+' : ''}${fmt(o12.rentabilidad_ponderada_pct, 1)} % (base ${o12.rentabilidad_base_pct >= 0 ? '+' : ''}${fmt(o12.rentabilidad_base_pct, 1)} %)` : `${rte >= 0 ? '+' : ''}${fmt(rte, 1)} % (del valor intrínseco: falta el objetivo a 12 meses)`,
    objetivo_12m_txt: con12 ? `${fmt(o12.objetivo_ponderado, 2)} ${meta.divisa || ''}${enCot(o12.objetivo_ponderado)}` : 'n.d.',
  };

  // ── Múltiplos clave para la ficha ──
  const clave = {
    capitalizacion: red(capitalizacion, 0), valor_empresa: red(valorEmpresa, 0), deuda_neta: red(deudaNeta, 0),
    ev_ventas_ltm: empresaFila.ev_ventas, ev_ebitda_ltm: empresaFila.ev_ebitda_ltm, ev_ebitda_ntm: empresaFila.ev_ebitda_ntm,
    ev_ebit_ltm: red(div(valorEmpresa, ebitLtm), 1), per_ltm: red(div(precio, bpaLtm), 1), per_ntm: empresaFila.per_ntm,
    fcf_yield_pct: empresaFila.fcf_yield_pct, dividendo_pct: red(pct(n(ltm.dpa) ?? ultimoCalc.dpa ?? null, precio)),
    dn_ebitda: red(div(deudaNeta, ebitdaLtm), 1), roic_pct: rentUlt.roic_pct ?? null, margen_ebitda_pct: empresaFila.margen_ebitda_pct,
    deuda_neta_ajustada: red(deudaNetaAjustada, 0), dn_ebitda_ajustada: red(div(deudaNetaAjustada, ebitdaLtm), 1),
    crecimiento_tcac_pct: tcacTabla.ingresos_pct ?? null, ingresos_ntm: red(ingresosNtm, 0), ebitda_ntm: red(ebitdaNtm, 0), bpa_ntm: red(bpaNtm, 2),
    ebitda_ltm: red(ebitdaLtm, 0), ingresos_ltm: red(ingresosLtm, 0),
    // Reguladas: el valor empresa frente a la base de activos regulada (prima o descuento sobre la RAB).
    ev_rab: n(d.valoracion?.rab) ? red(div(valorEmpresa, n(d.valoracion.rab)), 2) : null,
  };

  // ── Controles de mercado y fuentes ──
  if (n(id.capitalizacion_publicada) !== null && capitalizacion !== null) {
    const okCap = Math.abs(capitalizacion - n(id.capitalizacion_publicada)) <= 0.03 * capitalizacion;
    control('Capitalización calculada ≈ publicada', okCap, okCap ? '' : `Calculada ${fmt(capitalizacion, 0)}, publicada ${fmt(n(id.capitalizacion_publicada), 0)}: revisa acciones y precio.`);
  }
  // Solo tiene sentido si el puente es del mismo cierre: con un balance intermedio posterior, la
  // diferencia es normal (estacionalidad, anticipos, compras) y se explica en el texto.
  const finUltBal = balance.length ? finEj(balUlt.periodo) : null;
  const puenteMismoCierre = !pu.fecha || !finUltBal || new Date(pu.fecha + (pu.fecha.length === 7 ? '-28' : '') + 'T00:00:00Z') <= new Date(finUltBal.getTime() + 15 * 864e5);
  if (puenteMismoCierre && balUlt.deuda_neta !== null && balUlt.deuda_neta !== undefined && deudaNeta !== null && Math.abs(balUlt.deuda_neta - deudaNeta) > 0.25 * Math.max(Math.abs(deudaNeta), 1) + 5) {
    control('Deuda neta del puente = la del último balance anual', false, `Puente ${fmt(deudaNeta, 0)} frente a ${fmt(balUlt.deuda_neta, 0)} en el balance del mismo cierre: revisa qué partidas entran en cada uno.`);
  }
  for (const s of NUCLEO) if (vacioProfundo(d[s])) control(`Sección de núcleo con datos: ${s}`, false, 'Llega vacía: el informe la omite y avisa en el resumen. Tres búsquedas registradas en meta.huecos.');
  const huecos = lista(meta.huecos);
  for (const h of huecos) if (!h.intentos || String(h.intentos).split(/;|\n/).filter((x) => x.trim()).length < 3) control(`Tres búsquedas registradas (${h.seccion} · ${h.campo})`, false, 'Cada hueco debe documentar tres intentos distintos antes de desistir.');
  const fuentes = revisarFuentes(d);
  control('Al menos 25 fuentes', fuentes.n_fuentes >= 25, `${fuentes.n_fuentes} fuentes (${fuentes.n_primarias} primarias).`);
  control('Al menos 10 fuentes primarias', fuentes.n_primarias >= 10, `${fuentes.n_primarias}.`);
  control('Toda cita [n] existe en fuentes', fuentes.citas_sin_fuente.length === 0, fuentes.citas_sin_fuente.length ? `No existen: ${fuentes.citas_sin_fuente.join(', ')}.` : '');
  // Se admite alguna fuente de contexto sin cita, pero no muchas: o sobran en la lista o faltan citas.
  control('Fuentes sin citar ≤ 15 %', fuentes.fuentes_sin_citar.length <= Math.max(2, 0.15 * fuentes.n_fuentes), fuentes.fuentes_sin_citar.length ? `Sin citar: ${fuentes.fuentes_sin_citar.join(', ')}.` : '');

  // Controles que el análisis ya explica en el texto: no se ocultan, pasan a «Explicado» con su motivo.
  for (const e of lista(meta.controles_explicados)) {
    for (const c of controles) if (c.resultado === 'Revisar' && e?.control && c.control.toLowerCase().startsWith(String(e.control).toLowerCase())) { c.resultado = 'Explicado'; c.detalle = `${c.detalle} Explicación: ${e.explicacion || 'ver el texto.'}`; }
  }
  d.calc = {
    version: 4, etiquetas, recomendacion, mercado, clave, cuenta, tcac: tcacTabla,
    cuenta_y_prevision: [...cuenta.map((c) => ({ periodo: c.periodo, ingresos: c.ingresos, ebitda: c.ebitda })), ...proy.map((p) => ({ periodo: p.periodo, ingresos: p.ingresos, ebitda: p.ebitda }))],
    segmentos_ultimo: segmentosUltimo, segmentos_tabla: segmentosTabla, segmentos_periodo: ultPerSeg ?? null,
    balance, perimetro_nota: notaPerimetro, flujos, flujos_acumulado: acumulado, rentabilidad, roic_incremental_pct: roicIncremental,
    roic_frente_wacc: rentabilidad.map((r) => ({ periodo: r.periodo, roic_pct: r.roic_pct, roic_sin_fc_pct: r.roic_sin_fc_pct ?? null, roic_operativo_pct: r.roic_operativo_pct ?? null, roe_pct: r.roe_pct, wacc_pct: red(wacc, 1) })),
    compras,
    calidad: scores, dcf, escenarios, valor_ponderado: valorPonderado, potencial_ponderado_pct: red(pct(valorPonderado - precio, precio)),
    comparables: { tabla: [empresaFila, ...pares], estadisticos: estad, implicito, regresion, n: pares.length },
    transacciones, suma_partes: sumaPartes, multiplos_historicos: multHist, multiplos_serie: serieMultGraf, multiplos_titulo: tituloMultHist,
    consenso_vs_propio: consensoVsPropio, gobierno,
    competidores_margen: [{ nombre: id.nombre_corto || id.nombre, margen_ebit_pct: ultimoCalc.margen_ebit_pct ?? null }, ...lista(d.competencia?.competidores).map((c) => ({ nombre: c.nombre, margen_ebit_pct: n(c.margen_ebit_pct) }))],
    sintesis: { formato_eje: Math.max(0, ...rangos.map((r) => r.max ?? 0)) >= 100 ? '#,##0' : Math.max(0, ...rangos.map((r) => r.max ?? 0)) >= 10 ? '#,##0.0' : '#,##0.00', rangos, tabla: tablaSintesis, valor_objetivo: valorObjetivo, potencial_pct: red(pct(valorObjetivo - precio, precio)) },
    fuentes, controles,
    controles_resumen: `${controles.filter((c) => c.resultado === 'OK').length} de ${controles.length} controles correctos${controles.some((c) => c.resultado === 'Explicado') ? ` y ${controles.filter((c) => c.resultado === 'Explicado').length} explicados` : ''}`,
  };
  // Calidad ampliada (28-oct-2026): 10 pruebas INFORMATIVAS en la sección 9 (no deciden: backtest calidad-ampliada-2026-10-28).
  const qa = calidadAmpliada(d, d.calc);
  d.calc.calidad.ampliada = qa;
  d.calc.calidad.tabla.push({ indicador: 'Calidad ampliada: pruebas que pasa', valor: `${qa.pasa} / ${qa.con_dato}`, lectura: 'Diez pruebas más (estabilidad del ROIC, caja, devengos, deuda, intereses, margen, dilución, Piotroski, Altman y ventas). Son informativas: en el backtest de 2012-2025 ninguna mejoró la rentabilidad de las compras con la calidad que ya exigimos; en el universo entero, pasar varias reduce algo las caídas fuertes. No cambian la señal ni el nivel.' },
    ...qa.pruebas.map((x) => ({ indicador: `${x.clave}. ${x.prueba}`, valor: x.valor, lectura: x.resultado === 'n.d.' ? 'Sin dato.' : x.resultado === 'Sí' ? 'Pasa.' : 'No pasa (informativo).' })));
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
    // Un año «fijo» (ya casi publicado, o con perímetro cerrado) no se mueve con los escenarios,
    // las sensibilidades ni el DCF inverso.
    // El perfil de un escenario, si da ese año, sustituye al desplazamiento uniforme.
    const pa = aj.perfil?.[String(a.periodo)];
    const g = (n(a.crecimiento_pct) ?? 0) + (pa ? n(pa.crecimiento_pp) ?? 0 : a.fijo ? 0 : aj.dg ?? 0);
    ingresos *= 1 + g / 100;
    const margen = (n(a.margen_ebitda_pct) ?? 0) + (pa ? n(pa.margen_pp) ?? 0 : a.fijo ? 0 : aj.dm ?? 0);
    const ebitda = (ingresos * margen) / 100;
    const da = (ingresos * (n(a.amortizacion_pct_ventas) ?? 0)) / 100;
    const ebit = ebitda - da;
    const impuestos = (Math.max(0, ebit) * (n(a.tasa_impositiva_pct) ?? 25)) / 100;
    const capex = (ingresos * (n(a.capex_pct_ventas) ?? 0)) / 100;
    const nwc = (ingresos * (n(a.nwc_pct_ventas) ?? 0)) / 100;
    const dnwc = nwc - nwcAnt; nwcAnt = nwc;
    const fcff = ebit - impuestos + da - capex - dnwc;
    const fin = finEjercicio(anio + (ctx.desfase || 0), ctx.mesCierre), ini = finEjercicio(anio - 1 + (ctx.desfase || 0), ctx.mesCierre);
    const fraccion = Math.min(1, Math.max(0, anios(ctx.fechaCorte > ini ? ctx.fechaCorte : ini, fin)));
    const t = Math.max(0, anios(ctx.fechaCorte, fin) - (p.mitad ? fraccion / 2 : 0));
    const fd = (1 + wacc) ** -t;
    const vp = fcff * fraccion * fd;
    sumaVp += vp;
    filas.push({ periodo: a.periodo, ingresos, crecimiento_pct: g, ebitda, margen_ebitda_pct: margen, amortizacion: da, ebit, impuestos, capex, variacion_circulante: dnwc, fcff, fraccion, factor: fd, vp, t_fin: anios(ctx.fechaCorte, fin) });
  }
  // Etapa de transición (DCF en tres etapas): el crecimiento baja en línea recta desde el del último año
  // explícito hasta el terminal; margen, amortización e impuestos se quedan en los del último año (o el margen
  // va hacia `margen_final_pct`), y la inversión neta (capex − amortización) se escala con el crecimiento,
  // porque crecer menos exige invertir menos. Solo si `dcf.etapa2.usar` y no se pide sin ella.
  const e2In = dcfIn.etapa2 || {};
  const nE2 = e2In.usar && !p.sinEtapa2 ? Math.min(15, Math.max(0, Math.round(n(e2In.anios) ?? 0))) : 0;
  const filasE2 = [];
  let vpE2 = 0;
  if (nE2 > 0) {
    const uE = filas[filas.length - 1], aU = proy[proy.length - 1];
    const g0 = uE.crecimiento_pct, gT = p.g ?? n(dcfIn.terminal?.crecimiento_pct) ?? 2;
    const m0 = uE.margen_ebitda_pct, mF = n(e2In.margen_final_pct) !== null ? n(e2In.margen_final_pct) + (aj.dm ?? 0) : m0;
    const daP = n(aU.amortizacion_pct_ventas) ?? 0, capP = n(aU.capex_pct_ventas) ?? 0, nwcP = n(aU.nwc_pct_ventas) ?? 0, tP = n(aU.tasa_impositiva_pct) ?? 25;
    const anioU = anioDe(aU.periodo);
    for (let k = 1; k <= nE2; k++) {
      const gk = g0 + ((gT - g0) * k) / nE2;
      const mk = m0 + ((mF - m0) * k) / nE2;
      ingresos *= 1 + gk / 100;
      const ebitda = (ingresos * mk) / 100, da = (ingresos * daP) / 100, ebit = ebitda - da;
      const impuestos = (Math.max(0, ebit) * tP) / 100;
      const capex = da + (ingresos * (capP - daP) * (g0 > 0 ? Math.max(0, gk) / g0 : 1)) / 100;
      const nwc = (ingresos * nwcP) / 100, dnwc = nwc - nwcAnt; nwcAnt = nwc;
      const fcff = ebit - impuestos + da - capex - dnwc;
      const fin = finEjercicio(anioU + k + (ctx.desfase || 0), ctx.mesCierre);
      const tFin = anios(ctx.fechaCorte, fin), t = Math.max(0, tFin - (p.mitad ? 0.5 : 0));
      const fd = (1 + wacc) ** -t, vp = fcff * fd;
      vpE2 += vp;
      filasE2.push({ periodo: String(aU.periodo).replace(/\d{4}/, String(anioU + k)), ingresos, crecimiento_pct: gk, ebitda, margen_ebitda_pct: mk, amortizacion: da, ebit, impuestos, capex, variacion_circulante: dnwc, fcff, fraccion: 1, factor: fd, vp, t_fin: tFin });
    }
  }
  const ult = filasE2.length ? filasE2[filasE2.length - 1] : filas[filas.length - 1];
  const g = (p.g ?? 0) / 100;
  const vtGordon = p.wacc > (p.g ?? -99) ? (ult.fcff * (1 + g)) / (wacc - g) : null;
  const vtMultiplo = p.multiplo !== null && p.multiplo !== undefined ? p.multiplo * ult.ebitda : null;
  const vt = p.metodo === 'multiplo' ? vtMultiplo : p.metodo === 'media' && vtMultiplo !== null && vtGordon !== null ? (vtGordon + vtMultiplo) / 2 : vtGordon;
  if (vt === null) return null;
  const fdT = (1 + wacc) ** -ult.t_fin;
  const vpVt = vt * fdT;
  const ev = sumaVp + vpE2 + vpVt;
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
    etapa2: filasE2.length ? {
      anios: filasE2.length, vp: red(vpE2, 0), peso_pct: red(pct(vpE2, ev), 0),
      filas: filasE2.map((f) => ({ periodo: f.periodo, ingresos: red(f.ingresos, 0), crecimiento_pct: red(f.crecimiento_pct), margen_ebitda_pct: red(f.margen_ebitda_pct), capex: red(f.capex, 0), fcff: red(f.fcff, 0), factor: red(f.factor, 3), vp: red(f.vp, 0) })),
    } : null,
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
      ...(filasE2.length ? [{ concepto: `Valor actual de la etapa de transición (${filasE2.length} años)`, valor: fmt(vpE2, 0) }] : []),
      { concepto: 'Valor actual del valor terminal', valor: fmt(vpVt, 0) },
      { concepto: 'Valor empresa', valor: fmt(ev, 0) },
      { concepto: '− Deuda financiera neta (con arrendamientos)', valor: fmt(-ctx.deudaNeta, 0) },
      { concepto: '− Minoritarios, pensiones y otros; + asociadas', valor: fmt(-ctx.ajustesPuente, 0) },
      { concepto: 'Valor de los fondos propios', valor: fmt(equity, 0) },
      { concepto: 'Acciones diluidas (millones)', valor: fmt(ctx.acciones, 1) },
      { concepto: 'Valor por acción', valor: fmt(vpa, 2) },
    ],
    composicion: [{ parte: 'Flujos proyectados', valor: red(sumaVp, 0) }, ...(filasE2.length ? [{ parte: 'Etapa de transición', valor: red(vpE2, 0) }] : []), { parte: 'Valor terminal', valor: red(vpVt, 0) }],
  };
}

// Busca la raíz alejándose del centro por pasos (primero a un lado y al otro) y biseca el primer
// tramo con cambio de signo: evita las soluciones absurdas de los extremos.
function resolver(f, centro, paso, maxPasos, minimo = -Infinity) {
  const fc = f(centro);
  if (Number.isFinite(fc) && Math.abs(fc) < 1e-6) return centro;
  for (let k = 1; k <= maxPasos; k++) {
    for (const lado of [1, -1]) {
      const a = centro + lado * (k - 1) * paso, b = centro + lado * k * paso;
      if (Math.min(a, b) < minimo) continue;
      const fa = f(a), fb = f(b);
      if (Number.isFinite(fa) && Number.isFinite(fb) && fa * fb <= 0) return biseccion(f, Math.min(a, b), Math.max(a, b));
    }
  }
  return null;
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

function calidadContable(cuenta, balance, flujos, capitalizacion, naturaleza = false, perimetro = new Set()) {
  const porPer = (arr, per) => arr.find((x) => String(x.periodo) === String(per)) || {};
  const pers = cuenta.map((c) => String(c.periodo)).filter((p) => balance.some((b) => String(b.periodo) === p));
  const t = pers[pers.length - 1], t1 = pers[pers.length - 2];
  const tabla = [];
  const res = { periodo: t ?? null };
  if (!t) return { ...res, tabla };
  const c = porPer(cuenta, t), b = porPer(balance, t), f = porPer(flujos, t);
  const ca = porPer(cuenta, t1), ba = porPer(balance, t1), fa = porPer(flujos, t1);
  const N = (o, k) => n(o[k]);
  const cambioPerimetro = perimetro.has(String(t));
  const avisoPerimetro = cambioPerimetro ? ` No fiable en ${t}: cambio de perímetro (el balance incluye negocios sin su cuenta de resultados completa).` : '';

  // Altman Z (versión original para cotizadas)
  const at = N(b, 'activo_total'), pt = N(b, 'pasivo_total');
  if (at && pt && capitalizacion) {
    const z = 1.2 * ((N(b, 'activo_corriente') - N(b, 'pasivo_corriente')) / at) + 1.4 * ((N(b, 'reservas') ?? 0) / at) + 3.3 * (N(c, 'ebit') / at) + 0.6 * (capitalizacion / pt) + 1.0 * (N(c, 'ingresos') / at);
    if (Number.isFinite(z)) {
      res.altman_z = red(z, 2);
      res.altman_zona = z > 2.99 ? 'Zona segura' : z >= 1.81 ? 'Zona gris' : 'Zona de riesgo';
      tabla.push({ indicador: 'Altman Z', valor: fmt(z, 2), lectura: `${res.altman_zona} (> 2,99 seguro; < 1,81 riesgo). No aplica a bancos ni aseguradoras, y subestima la solvencia de empresas con grandes anticipos de clientes o prefinanciación pública (contratistas, construcción), que inflan el pasivo.${avisoPerimetro}` });
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
      DSRI: div(div(ar, S), div(ara, Sa)), GMI: naturaleza ? 1 : div(gma, gm),
      AQI: div(1 - (N(b, 'activo_corriente') + ppe) / at, 1 - (N(ba, 'activo_corriente') + ppea) / ata),
      SGI: div(S, Sa), DEPI: div(div(depa, depa + ppea), div(dep, dep + ppe)),
      SGAI: !naturaleza && sga !== null && sgaa !== null ? div(div(sga, S), div(sgaa, Sa)) : 1,
      LVGI: div(div(pt, at), div(N(ba, 'pasivo_total'), ata)),
      TATA: div(N(c, 'beneficio_neto') - N(f, 'flujo_operativo'), at),
    };
    if (Object.values(v).every((x) => x !== null && Number.isFinite(x))) {
      const m = -4.84 + 0.92 * v.DSRI + 0.528 * v.GMI + 0.404 * v.AQI + 0.892 * v.SGI + 0.115 * v.DEPI - 0.172 * v.SGAI + 4.679 * v.TATA - 0.327 * v.LVGI;
      res.beneish_m = red(m, 2);
      res.beneish_fiable = !cambioPerimetro;
      res.beneish_variables = Object.entries(v).map(([k, x]) => ({ variable: k, valor: red(x, 2) }));
      const lecturaM = cambioPerimetro
        ? `No interpretable en ${t}: con un cambio de perímetro, los índices de activos, amortización y ventas (AQI, DEPI, SGI) comparan grupos distintos y el umbral de −1,78 no sirve.`
        : m > -1.78 ? 'Por encima de −1,78: perfil compatible con manipulación de beneficios; revisar a fondo.' : 'Por debajo de −1,78: sin señal de manipulación.';
      tabla.push({ indicador: 'Beneish M', valor: fmt(m, 2), lectura: lecturaM + (naturaleza ? ' Aproximado: con cuenta por naturaleza, los índices de margen bruto y de gastos generales se fijan en 1.' : '') });
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
  // Externos no dominicales con mucha antigüedad: suelen ser antiguos independientes que ya no pueden serlo.
  const externosLargos = consejo.filter((c, i) => /otro/i.test(c.tipo || '') && antig[i] !== null && antig[i] > 12);
  const mayor = Math.max(0, ...lista(g.accionistas).map((a) => n(a.pct) ?? 0));
  const ins = lista(g.insiders);
  const compras = sumaLaxa(...ins.filter((x) => /compra/i.test(x.operacion)).map((x) => n(x.importe)));
  const ventas = sumaLaxa(...ins.filter((x) => /venta/i.test(x.operacion)).map((x) => n(x.importe)));
  const b = (v) => (v === null || v === undefined ? null : !!v);
  const sino = (v, si = 'Sí', no = 'No') => (v === null || v === undefined ? 'Sin dato' : v ? si : no);
  // El voto se mide por los votos EN CONTRA: una abstención sistemática (de un accionista público, por
  // ejemplo) baja el «a favor» sin ser un rechazo. Si solo hay el «a favor», se usa ese.
  // Con un accionista de control, lo que informa es el voto de los demás (sobre el capital libre presente).
  const votoContraLibre = n(g.voto_remuneracion_contra_libre_pct);
  const votoContra = votoContraLibre ?? n(g.voto_remuneracion_contra_pct), voto = n(g.voto_remuneracion_pct);
  const hayControl = g.accionista_control === null || g.accionista_control === undefined ? mayor >= 30 : !!g.accionista_control;
  const cambios = n(g.cambios_cupula_24m);
  const crit = [
    ['Consejeros independientes ≥ 50 % (≥ 33 % si hay accionista de control)', indepPct === null ? null : indepPct >= 50 || (hayControl && indepPct >= 33), indepPct === null ? 'Sin dato' : `${fmt(indepPct, 0)} %${hayControl ? ' (con control)' : ''}`],
    ['Presidencia sin vínculo familiar ni profesional con el accionista de control', !hayControl ? true : g.presidente_vinculado_control === null || g.presidente_vinculado_control === undefined ? null : !g.presidente_vinculado_control, !hayControl ? 'Sin control' : g.presidente_vinculado_control === null || g.presidente_vinculado_control === undefined ? 'Sin dato' : g.presidente_vinculado_control ? 'Vinculada' : 'Independiente del control'],
    // Que presidente y primer ejecutivo sean dos personas no basta si el presidente también es ejecutivo.
    g.presidente_ejecutivo !== null && g.presidente_ejecutivo !== undefined
      ? ['Presidente no ejecutivo, o consejero coordinador independiente', !g.presidente_ejecutivo || !!g.consejero_coordinador, !g.presidente_ejecutivo ? 'No ejecutivo' : g.consejero_coordinador ? 'Ejecutivo, con coordinador' : 'Ejecutivo, sin coordinador']
      : ['Presidente no ejecutivo, o consejero coordinador independiente', g.presidente_ceo_separados === null || g.presidente_ceo_separados === undefined ? null : g.presidente_ceo_separados || !!g.consejero_coordinador, g.presidente_ceo_separados ? 'Separados' : g.consejero_coordinador ? 'Coordinador' : 'No'],
    ['Comisión de auditoría con mayoría de independientes y presidida por uno', b(g.auditoria_independiente), sino(g.auditoria_independiente)],
    ['Ningún consejero «otro externo» con más de 12 años', nCons ? externosLargos.length === 0 : null, nCons ? (externosLargos.length ? externosLargos.map((c) => c.nombre).join(', ') : 'Ninguno') : 'Sin dato'],
    ['Estabilidad de la cúpula: como mucho un cambio de presidente o primer ejecutivo en 24 meses', cambios === null ? null : cambios <= 1, cambios === null ? 'Sin dato' : `${fmt(cambios, 0)} cambio${cambios === 1 ? '' : 's'}`],
    votoContra !== null
      ? [`Peor voto en contra sobre remuneración (3 juntas${votoContraLibre !== null ? ', capital libre' : ''}) ≤ 20 %`, votoContra <= 20, `${fmt(votoContra, 1)} % en contra`]
      : voto !== null || n(g.voto_cupula_pct) === null ? ['Peor voto a favor sobre remuneración (3 juntas) ≥ 80 %', voto === null ? null : voto >= 80, voto === null ? 'Sin dato' : `${fmt(voto, 1)} % a favor`]
        // Donde la remuneración no se vota cada año (Japón), el voto a la reelección de la cúpula hace sus veces.
        : ['Peor voto a favor a la reelección de presidente o primer ejecutivo (3 juntas) ≥ 80 %', n(g.voto_cupula_pct) >= 80, `${fmt(n(g.voto_cupula_pct), 1)} % a favor (no se vota la remuneración)`],
    ['Variable a largo plazo ligado a rentabilidad (ROIC, TSR, FCF)', b(g.variable_ligado_rentabilidad), sino(g.variable_ligado_rentabilidad)],
    ['Una acción, un voto, sin blindajes ni límites de voto estatutarios', g.una_accion_un_voto === 'limite_legal' ? true : b(g.una_accion_un_voto), g.una_accion_un_voto === 'limite_legal' ? 'Límite legal, no estatutario' : sino(g.una_accion_un_voto)],
    ['Sin operaciones vinculadas relevantes', g.operaciones_vinculadas_relevantes === null || g.operaciones_vinculadas_relevantes === undefined ? null : !g.operaciones_vinculadas_relevantes, sino(g.operaciones_vinculadas_relevantes, 'Hay', 'No hay')],
    ['Auditor con 10 años o menos en el cargo', n(calidad.anios_auditor) === null ? null : n(calidad.anios_auditor) <= 10, n(calidad.anios_auditor) === null ? 'Sin dato' : `${calidad.anios_auditor} años`],
    ['Opinión de auditoría sin salvedades', calidad.opinion ? /favorable|limpia|sin salvedades/i.test(calidad.opinion) && !/con salvedades/i.test(calidad.opinion) : null, calidad.opinion ?? 'Sin dato'],
    ['Directivos compradores netos en 12 meses (o sin ventas relevantes)', ins.length ? compras >= ventas : g.insiders_sin_operaciones ? true : null, ins.length ? `Compras ${fmt(compras, 2)} / ventas ${fmt(ventas, 2)} M` : g.insiders_sin_operaciones ? 'Sin operaciones' : 'Sin dato'],
  ];
  const conDato = crit.filter(([, v]) => v !== null);
  const ok = conDato.filter(([, v]) => v).length;
  const sinDato = crit.length - conDato.length;
  return {
    n_consejeros: nCons, independientes_pct: red(indepPct, 0), antiguedad_media: red(media(antig), 1),
    composicion: Object.entries(tipos).map(([tipo, num]) => ({ tipo, num })),
    checklist: crit.map(([criterio, v, valor]) => ({ criterio, resultado: v === null ? 'Sin dato' : v ? 'Cumple' : 'No cumple', valor })),
    // Lo que no se ha podido verificar no puntúa como cumplido.
    puntuacion: `${ok} de ${crit.length}${sinDato ? ` (${sinDato} sin dato)` : ''}`, puntuacion_pct: red((100 * ok) / crit.length, 0),
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
  const d0 = structuredClone(datos);
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
  linea('Rentabilidad total 12 m · asimetría', `${fmt(c.recomendacion.rentabilidad_total_pct)} % · ${fmt(c.recomendacion.asimetria, 2)}x`);
  linea('Recomendación: regla / análisis', `${c.recomendacion.regla ?? 'n.d.'} / ${d0.resumen?.recomendacion ?? '(sin escribir)'}`);
  console.log('Calidad y gobierno');
  linea('Altman Z · Piotroski F · Beneish M', `${fmt(c.calidad.altman_z, 2)} · ${c.calidad.piotroski_f ?? 'n.d.'} · ${fmt(c.calidad.beneish_m, 2)}`);
  linea('Gobierno', `${c.gobierno.puntuacion} criterios · ${fmt(c.gobierno.independientes_pct, 0)} % independientes`);
  console.log(`\nControles: ${c.controles_resumen}`);
  for (const x of c.controles.filter((x) => x.resultado !== 'OK')) console.log(`  ✗ ${x.control}: ${x.detalle}`);
}
