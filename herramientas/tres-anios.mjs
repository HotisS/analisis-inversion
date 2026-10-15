// Rentabilidad esperada a 3 años de cada informe value (dato informativo; protocolo y backtest en
// verticales/empresa/backtest/tres-anios-*.md). No entra en la decisión de compra: sirve para el radar de seguimiento.
//
//   node herramientas/tres-anios.mjs [--json] [--escribir]   (--escribir guarda verticales/empresa/tres-anios.json)
//
// Cifra: BPA del caso base del objetivo a 12 meses llevado dos años más con el crecimiento del EBIT del DCF del propio informe,
// × múltiplo, anualizada y con el dividendo. Dos múltiplos: «prudente» (el menor entre el actual y la mediana adelantada de 5
// años: solo el crecimiento del BPA; con esta se hace el radar) y «con vuelta del múltiplo» (la mediana entera, la del
// protocolo del backtest; en las desrateadas infla). Al lado, la misma cuenta con el valor real (DCF ponderado) en 3 años.
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const comoJson = args.includes('--json'), escribir = args.includes('--escribir');
const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const r1 = (x, d = 1) => (x === null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const f = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const ultimoDatos = (dir) => {
  const fs = readdirSync(dir).filter((a) => /^datos(-v\d+)?\.json$/.test(a)).sort((a, b) => (+(a.match(/v(\d+)/)?.[1] ?? 1)) - (+(b.match(/v(\d+)/)?.[1] ?? 1)));
  return fs.length ? JSON.parse(readFileSync(join(dir, fs.at(-1)), 'utf8')) : null;
};
const revisados = JSON.parse(readFileSync(join(raiz, 'verticales/empresa/objetivo12m-revisados.json'), 'utf8')).revisados;
const calendario = existsSync(join(raiz, 'escaner/calendario.json')) ? JSON.parse(readFileSync(join(raiz, 'escaner/calendario.json'), 'utf8')).fechas || {} : {};

const res = [];
for (const [clave, rev] of Object.entries(revisados)) {
  const dir = join(raiz, 'informes', rev.carpeta || '');
  if (!rev.carpeta || !existsSync(dir)) continue;
  let d; try { d = ultimoDatos(dir); } catch { continue; }
  if (!d) continue;
  const o12 = d.valoracion?.objetivo_12m || {}, ph = o12.per_historico || {}, precio = n(rev.precio_ref) ?? n(d.identificacion?.precio);
  const base = (o12.casos || []).find((c) => /base/i.test(c.escenario || ''));
  const bpaBase = n(base?.beneficio_por_accion), anioObj = +String(o12.ejercicio || '').replace(/\D/g, '');
  const proy = d.calc?.dcf?.proyeccion || [];
  const fila = (y) => proy.find((p) => +String(p.periodo).replace(/\D/g, '') === y);
  const p0 = fila(anioObj), p2 = fila(anioObj + 2);
  // Crecimiento del BPA en los dos años siguientes al ejercicio del objetivo: el del EBIT del DCF (si no hay, el de ingresos).
  let factor = null, via = null;
  if (p0 && p2 && n(p0.ebit) > 0 && n(p2.ebit) > 0) { factor = p2.ebit / p0.ebit; via = 'EBIT del DCF'; }
  else if (p0 && p2 && n(p0.ingresos) > 0 && n(p2.ingresos) > 0) { factor = p2.ingresos / p0.ingresos; via = 'ingresos del DCF'; }
  const bpa3 = bpaBase !== null && factor !== null ? bpaBase * factor : null;
  const mediana = n(ph.mediana_5a), actual = n(ph.actual);
  const dpa = n((d.consenso?.estimaciones || []).find((e) => n(e.dpa) !== null)?.dpa) ?? n((d.financieros?.cuenta || []).at(-1)?.dpa) ?? 0;
  const rentDiv = precio ? dpa / precio : 0;
  const anual = (valor) => (valor !== null && precio > 0 ? ((valor / precio) ** (1 / 3) - 1 + rentDiv) * 100 : null);
  const obj3 = bpa3 !== null && mediana !== null ? mediana * bpa3 : null;
  // Prudente: sin suponer la vuelta del múltiplo (el menor entre el actual y la mediana): lo que da solo el crecimiento del BPA.
  // Es el múltiplo de control del backtest y la lógica del selector (las desrateadas no vuelven); el radar se hace con esta.
  const multPrud = actual !== null && mediana !== null ? Math.min(actual, mediana) : (actual ?? mediana);
  const obj3prud = bpa3 !== null && multPrud !== null ? multPrud * bpa3 : null;
  const vi = n(d.calc?.valor_ponderado);
  const rent = (d.calc?.rentabilidad || []).filter((x) => n(x.roic_pct) !== null).at(-1), fw = (d.calc?.roic_frente_wacc || []).at(-1);
  const roic = n(rent?.roic_pct), wacc = n(fw?.wacc_pct) ?? n(d.calc?.dcf?.wacc_pct);
  const sost = d.dcf?.sostenibilidad?.veredicto || null;
  const cat = (d.catalizadores?.items || [])[0];
  const r3 = anual(obj3), r3p = anual(obj3prud), pond = n(rev.rentabilidad_ponderada_pct), base12 = n(rev.rentabilidad_base_pct);
  const calidad = sost === 'Sí' && roic !== null && wacc !== null && roic >= wacc + 5;
  res.push({
    clave, carpeta: rev.carpeta, empresa: d.identificacion?.nombre_corto || d.identificacion?.nombre || clave, precio, divisa: rev.divisa_cotizacion || d.meta?.divisa_cotizacion || d.meta?.divisa,
    senal_12m: rev.senal, rent_12m_pond: pond, rent_12m_base: base12, comprar_por_debajo: n(rev.comprar_por_debajo_cot) ?? n(rev.comprar_por_debajo),
    per_actual: actual, per_mediana_5a: mediana, per_base: ph.base || null, ejercicio_objetivo: o12.ejercicio || null, bpa_base_objetivo: bpaBase, bpa_3a: r1(bpa3, 3), crecimiento_via: via,
    dividendo_pct: r1(rentDiv * 100), objetivo_3a: r1(obj3, 2), rent_3a_anual_pct: r1(r3), objetivo_3a_prudente: r1(obj3prud, 2), rent_3a_prudente_pct: r1(r3p), rent_3a_valor_real_pct: r1(anual(vi)), valor_real: vi,
    desrateada: actual !== null && mediana !== null && mediana / actual >= 1.8,
    sostenibilidad: sost, roic_menos_wacc: roic !== null && wacc !== null ? r1(roic - wacc) : null, calidad_compra: calidad,
    radar: calidad && rev.senal === 'Mantener' && r3p !== null && r3p >= 15,
    proximos_resultados: calendario[clave]?.fecha || null, catalizador: cat ? `${cat.fecha}: ${cat.evento}` : null,
  });
}
res.sort((a, b) => (b.rent_3a_prudente_pct ?? -99) - (a.rent_3a_prudente_pct ?? -99));
if (escribir) writeFileSync(join(raiz, 'verticales/empresa/tres-anios.json'), JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), nota: 'Rentabilidad esperada anual a 3 años por informe (herramientas/tres-anios.mjs). Dato informativo: no entra en la decisión de compra (backtest del 15-oct-2026).', empresas: res }, null, 1) + '\n');
if (comoJson) { console.log(JSON.stringify(res, null, 1)); }
else {
  console.log(`| Empresa | Señal 12 m | 12 m pond./base | 3 a prudente (anual) | 3 a con vuelta del múltiplo | 3 a valor real | Calidad (sost., ROIC−WACC) | Radar |\n|---|---|--:|--:|--:|--:|---|---|`);
  for (const x of res) console.log(`| ${x.empresa} | ${x.senal_12m} | ${f(x.rent_12m_pond)} / ${f(x.rent_12m_base)} % | ${f(x.rent_3a_prudente_pct)} % | ${f(x.rent_3a_anual_pct)} % | ${f(x.rent_3a_valor_real_pct)} % | ${x.sostenibilidad ?? 'n.d.'}, ${f(x.roic_menos_wacc)} | ${x.radar ? 'SÍ' : ''} |`);
  console.log(`\n${res.length} informes; sin cifra a 3 años: ${res.filter((x) => x.rent_3a_anual_pct === null).map((x) => x.empresa).join(', ') || 'ninguno'}; en el radar: ${res.filter((x) => x.radar).length}.`);
}
