// Objetivo a 12 meses = PER propio × BPA propio (método «v2» del hilo «PROYECTOS GH - INV», 12-oct-2026; ver
// verticales/empresa/objetivo-12m.md). Sin dependencias. Solo usa datos del informe: no hay cifras nuevas.
//
//   Ejercicio objetivo: el que mirará el mercado dentro de 12 meses = el primero que cierra más de 18 meses
//     después de la fecha de corte (corte oct-2026, cierre en diciembre → 2028e).
//   BPA de cada escenario: ventas del último ejercicio real × (1 + crecimiento) año a año (el DCF del informe; los
//     años no fijos llevan el desplazamiento de crecimiento del escenario), × (margen EBITDA del año + desplazamiento)
//     − amortización (% de ventas del DCF) = EBIT; − intereses de la deuda neta (deuda neta × coste de la deuda;
//     con caja neta, 0); × (1 − tipo impositivo del DCF); ÷ acciones del informe.
//   PER (últimos 12 meses al cierre de cada año = precio de cierre ÷ BPA real de ese año, del propio informe):
//     base = el menor entre el PER actual sobre el BPA propio del ejercicio siguiente y la mediana de 5 años;
//     bajista = el mínimo de 5 años (sin pasar del base); alcista = la media de todos los años (sin bajar del base).
//   Objetivo = media simple de los tres; rentabilidad = objetivo / precio − 1 + dividendo.
//   Señal: Comprar ≥ 15 %, Vender ≤ −10 %, Mantener en medio. El consenso no entra en el cálculo: solo se da al lado.
//
// Las revisiones a fondo hechas a mano (verticales/empresa/objetivo12m-revisados.json) mandan sobre el cálculo.
//
//   node herramientas/objetivo12m.mjs [carpeta…]   → tabla (sin carpetas: todos los informes)

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const r1 = (v) => (v === null || !Number.isFinite(v) ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v === null || !Number.isFinite(v) ? null : Math.round(v * 100) / 100);
const mediana = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

const RUTA_REV = new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url);
const revisados = existsSync(RUTA_REV) ? JSON.parse(readFileSync(RUTA_REV, 'utf8')).revisados : {};

export const senal12m = (rte) => (rte === null ? null : rte >= 15 ? 'Comprar' : rte <= -10 ? 'Vender' : 'Mantener');
const anioDe = (periodo) => { const m = String(periodo).match(/(\d{4})(?!.*\d{4})/); return m ? +m[1] : null; };

export function objetivo12m(d, { sinRevisiones = false } = {}) {
  const id = d.identificacion || {}, R = d.calc?.recomendacion || {}, meta = d.meta || {};
  const ticker = String(id.ticker || '').trim().toUpperCase().replace(/\s+/g, '-');
  const precio = n(id.precio), div = n(R.dividendo_pct) ?? 0, acciones = n(id.acciones);
  const base = { ticker, precio, po_consenso: n(d.consenso?.recomendaciones?.po_medio) };
  const rev = sinRevisiones ? null : revisados[ticker];
  if (rev) return { ...base, objetivo: n(rev.objetivo_12m), rte: n(rev.rentabilidad_12m_pct), senal: rev.senal, origen: `Revisión a fondo (${rev.fecha}): ${rev.nota}` };

  const cuenta = (d.calc?.cuenta || []).filter((f) => !/e$/i.test(String(f.periodo)) && n(f.ingresos) !== null);
  const anios = d.dcf?.anios || [];
  if (!precio || !acciones || !cuenta.length || !anios.length) return { ...base, objetivo: null, rte: null, senal: null, origen: 'Faltan datos (precio, acciones, cuenta o DCF)' };

  // Ejercicio objetivo: fin de ejercicio > corte + 18 meses.
  const corte = new Date(meta.fecha_corte + 'T00:00:00Z'), mesCierre = n(meta.cierre_ejercicio_mes) || 12, inicio = meta.etiqueta_ejercicio === 'inicio';
  const finDe = (p) => { const a = anioDe(p); if (a === null) return null; const y = inicio && mesCierre < 12 ? a + 1 : a; return new Date(Date.UTC(y, mesCierre, 0)); };
  const limite = new Date(corte); limite.setUTCMonth(limite.getUTCMonth() + 18);
  const iObj = anios.findIndex((a) => finDe(a.periodo) > limite);
  if (iObj < 1) return { ...base, objetivo: null, rte: null, senal: null, origen: 'La proyección no llega al ejercicio objetivo' };

  // Intereses: deuda neta × coste de la deuda; con caja neta, 0 (no se cuentan ingresos de la caja).
  const dn = n(d.calc?.clave?.deuda_neta) ?? 0, kd = n(d.dcf?.wacc?.coste_deuda_pct) ?? 0;
  const intereses = dn > 0 ? dn * kd / 100 : 0;
  const casos = (d.escenarios?.casos || []).map((c) => ({ g: n(c.ajuste_crecimiento_pp) ?? 0, m: n(c.ajuste_margen_pp) ?? 0 }));
  const esc = { Bajista: casos[0] || { g: 0, m: 0 }, Base: { g: 0, m: 0 }, Alcista: casos[2] || { g: 0, m: 0 } };
  const bpa = (hasta, e) => {
    let v = n(cuenta.at(-1).ingresos), r = null;
    for (let i = 0; i <= hasta; i++) {
      const a = anios[i], fijo = a.fijo === true;
      v *= 1 + ((n(a.crecimiento_pct) ?? 0) + (fijo ? 0 : e.g)) / 100;
      const ebit = v * ((n(a.margen_ebitda_pct) ?? 0) + (fijo ? 0 : e.m)) / 100 - v * (n(a.amortizacion_pct_ventas) ?? 0) / 100;
      r = ((ebit - intereses) * (1 - (n(a.tasa_impositiva_pct) ?? 25) / 100)) / acciones;
    }
    return r;
  };

  // PER de los últimos 12 meses al cierre de cada año: precio de cierre ÷ BPA real de ese año.
  const bpaReal = new Map(cuenta.map((f) => [anioDe(f.periodo), n(f.bpa)]));
  const pers = (d.multiplos_historicos?.serie || []).filter((s) => !s.excluir)
    .map((s) => { const b = bpaReal.get(anioDe(s.anio)), p = n(s.precio_cierre); return b > 0 && p > 0 ? { anio: anioDe(s.anio), per: p / b } : null; })
    .filter((x) => x && x.per < 200).sort((a, b) => a.anio - b.anio);
  if (pers.length < 3) return { ...base, objetivo: null, rte: null, senal: null, origen: 'Menos de 3 años de PER histórico en el informe' };
  const cinco = pers.slice(-5).map((x) => x.per), todos = pers.map((x) => x.per);
  const bpaSig = bpa(iObj - 1, esc.Base), perActual = bpaSig > 0 ? precio / bpaSig : null;
  const perBase = Math.min(...[perActual, mediana(cinco)].filter((x) => x !== null && x > 0));
  const per = { Bajista: Math.min(Math.min(...cinco), perBase), Base: perBase, Alcista: Math.max(todos.reduce((s, x) => s + x, 0) / todos.length, perBase) };
  const fila = {};
  for (const k of ['Bajista', 'Base', 'Alcista']) { const b = bpa(iObj, esc[k]); fila[k] = { bpa: r2(b), per: r1(per[k]), objetivo: r2(b * per[k]) }; }
  if (Object.values(fila).some((f) => !(f.objetivo > 0))) return { ...base, objetivo: null, rte: null, senal: null, origen: 'BPA proyectado negativo: el método no aplica' };
  const objetivo = (fila.Bajista.objetivo + fila.Base.objetivo + fila.Alcista.objetivo) / 3;
  const rte = r1((objetivo / precio - 1) * 100 + div);
  return { ...base, objetivo: r2(objetivo), rte, senal: senal12m(rte), ejercicio: anios[iObj].periodo, escenarios: fila, per_actual: r1(perActual),
    origen: `PER × BPA ${anios[iObj].periodo}: bajista ${fila.Bajista.per}x × ${fila.Bajista.bpa} = ${fila.Bajista.objetivo}; base ${fila.Base.per}x × ${fila.Base.bpa} = ${fila.Base.objetivo}; alcista ${fila.Alcista.per}x × ${fila.Alcista.bpa} = ${fila.Alcista.objetivo}` };
}

export function ultimoDatos(dir) {
  const arch = readdirSync(`informes/${dir}`);
  const vs = arch.map((f) => f.match(/^datos-v(\d+)\.json$/)).filter(Boolean).sort((a, b) => b[1] - a[1]);
  const f = vs.length ? vs[0][0] : arch.includes('datos.json') ? 'datos.json' : null;
  return f ? JSON.parse(readFileSync(`informes/${dir}/${f}`, 'utf8')) : null;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), sinRevisiones = args.includes('--sin-revisiones');
  const pedidas = args.filter((a) => !a.startsWith('--'));
  const dirs = pedidas.length ? pedidas : readdirSync('informes', { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  const filas = [];
  for (const dir of dirs) { const d = ultimoDatos(dir); if (!d?.calc?.recomendacion) continue; filas.push({ dir, senalDcf: d.calc.recomendacion.recomendacion, rteDcf: n(d.calc.recomendacion.rentabilidad_total_pct), ...objetivo12m(d, { sinRevisiones }) }); }
  filas.sort((a, b) => (b.rte ?? -999) - (a.rte ?? -999));
  for (const f of filas) console.log(`${f.dir.padEnd(34)} ${String(f.senalDcf).padEnd(9)} ${String(f.rteDcf).padStart(6)} → ${String(f.rte).padStart(6)} ${String(f.senal).padEnd(9)} obj ${f.objetivo} (precio ${f.precio}; consenso ${f.po_consenso}) · ${f.origen}`);
}
