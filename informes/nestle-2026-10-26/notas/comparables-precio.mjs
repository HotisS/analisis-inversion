// Comparables de Nestlé al cierre del 23-oct-2026, en millones de CHF.
// Cinco salen de los informes del repositorio (sus cuentas y su consenso), llevados al cierre del 23-oct con
// verticales/empresa/precios.json; Danone y Mondelez, de Stock Analysis (estadísticas al cierre del 23-oct).
// Tipos del BCE del 23-oct-2026: 1 EUR = 0,9227 CHF = 1,1193 USD = 0,83728 GBP.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const raiz = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const precios = JSON.parse(readFileSync(join(raiz, 'verticales/empresa/precios.json'), 'utf8')).precios;
const CHF = { CHF: 1, EUR: 0.9227, USD: 0.9227 / 1.1193 };
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const repo = [
  ['Unilever', 'ULVR', 'GB', 'unilever-2026-10-14', 'ULVR'],
  ['PepsiCo', 'PEP', 'US', 'pepsico-2026-10-09', 'PEP'],
  ['Hershey', 'HSY', 'US', 'hershey-2026-10-14', 'HSY'],
  ['Colgate-Palmolive', 'CL', 'US', 'colgate-2026-10-14', 'CL'],
  ['Lindt & Sprüngli', 'LISP', 'CH', 'lindt-2026-10-14', 'LISP'],
];
const out = [];
for (const [nombre, ticker, pais, carpeta, clave] of repo) {
  const d = JSON.parse(readFileSync(join(raiz, 'informes', carpeta, 'datos.json'), 'utf8'));
  const k = d.calc.clave, i = d.identificacion, div = d.meta.divisa;
  const p = precios[clave];
  // precio del informe en la divisa de cotización
  const tc = d.meta.tipo_cambio || 1;
  const precioCotInforme = i.precio / tc; // GBp para Unilever, USD/CHF para el resto
  const f = p.precio / precioCotInforme; // variación de precio desde el informe
  const cap = k.capitalizacion * f;
  const ev = k.valor_empresa + (cap - k.capitalizacion);
  const crec = k.ingresos_ntm && k.ingresos_ltm ? (k.ingresos_ntm / k.ingresos_ltm - 1) * 100 : null;
  out.push({
    nombre, ticker, pais,
    capitalizacion: Math.round(cap * CHF[div]),
    ev_ventas: r2(ev / k.ingresos_ltm),
    ev_ebitda_ltm: r1(ev / k.ebitda_ltm),
    ev_ebitda_ntm: k.ebitda_ntm ? r1(ev / k.ebitda_ntm) : null,
    per_ntm: k.per_ntm ? r1(k.per_ntm * f) : null,
    crecimiento_pct: r1(crec),
    margen_ebitda_pct: k.margen_ebitda_pct,
    roic_pct: k.roic_pct,
    dn_ebitda: k.dn_ebitda,
    fcf_yield_pct: k.fcf_yield_pct ? r1(k.fcf_yield_pct / f) : null,
    _origen: `${carpeta}: precio ${i.precio} (${i.fecha_precio}) → ${p.precio} (${p.fecha}); ×${f.toFixed(3)}`,
  });
}
// Stock Analysis, estadísticas al cierre del 23-oct-2026.
out.push({ nombre: 'Danone', ticker: 'BN', pais: 'FR', capitalizacion: Math.round(40040 * CHF.EUR), ev_ventas: 1.79, ev_ebitda_ltm: 10.0, ev_ebitda_ntm: null, per_ntm: 15.3, crecimiento_pct: null, margen_ebitda_pct: r1(4510 / 27480 * 100), roic_pct: 10.0, dn_ebitda: r1((17430 - 8340) / 4510), fcf_yield_pct: 6.1, _origen: 'Stock Analysis, 23-oct-2026' });
out.push({ nombre: 'Mondelez', ticker: 'MDLZ', pais: 'US', capitalizacion: Math.round(81430 * CHF.USD), ev_ventas: 2.57, ev_ebitda_ltm: 16.7, ev_ebitda_ntm: null, per_ntm: 19.8, crecimiento_pct: null, margen_ebitda_pct: 15.3, roic_pct: 7.9, dn_ebitda: r1(20340 / 6080), fcf_yield_pct: 3.8, _origen: 'Stock Analysis, 23-oct-2026' });
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'comparables-precio.json'), JSON.stringify(out, null, 1));
for (const c of out) console.log(c.nombre, c.capitalizacion, c.ev_ebitda_ltm, c.ev_ebitda_ntm, c.per_ntm, c.crecimiento_pct, c._origen);
const pers = out.map((c) => c.per_ntm).filter((x) => x).sort((a, b) => a - b);
console.log('mediana PER NTM', pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2);
