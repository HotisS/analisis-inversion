// Ajustes numéricos del analista sobre las notas (Uber, corte 2026-10-08).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
export const D = JSON.parse(readFileSync(join(aqui, 'D.json'), 'utf8'));
export const A = JSON.parse(readFileSync(join(aqui, 'A.json'), 'utf8'));

// 1) Reservas legales, fiscales (no de beneficios) y regulatorias: se repiten todos los años (526, 732, 9, 1.123 y 564 M
// de 2021 a 2025), así que se tratan como coste recurrente y se quedan dentro del EBITDA. Solo se devuelven al EBITDA
// las partidas de verdad no recurrentes (deterioros, costes de compras y ventas, reestructuración, COVID y otros).
export const legales = { 2020: -35, 2021: 526, 2022: 732, 2023: 9, 2024: 1123, 2025: 564, LTM: 548 }; // LTM = 564 − 28 (1S25) + 12 (1S26)
export const noRecurrentes = {};
for (const c of A.financieros.cuenta) noRecurrentes[c.periodo] = c.no_recurrentes_en_ebitda - legales[c.periodo];
noRecurrentes.LTM = A.financieros.ltm.no_recurrentes_en_ebitda - legales.LTM;

// 2) Comparables en la misma base que Uber: EBITDA después de la remuneración en acciones (SBC).
// SBC de 2025 en % de los ingresos, de los datos XBRL de cada 10-K/20-F (EDGAR).
export const sbcPct = { LYFT: 322 / 6316, DASH: 1051 / 13717, CART: 352 / 3742, GRAB: 241 / 3370, ABNB: 1592 / 12241, BKNG: 613 / 26917 };
const r1 = (x) => Math.round(x * 10) / 10;
// 2 bis) Iteración del 28-oct: las cifras de MarketScreener son del 8-oct con precios del 7-oct; se llevan al cierre del
// 27-oct con la variación de la cotización (Yahoo Finance): capitalización y PER × r; valor empresa = el del 7-oct más la
// variación de la capitalización (deuda neta igual); FCF yield ÷ r. Instacart, al cierre del 22-oct (51,68 USD), antes de
// la noticia de su posible venta, para no meter una prima de opa en la mediana.
export const variacion = { LYFT: 16.79 / 15.60, DASH: 170.56 / 191.24, CART: 51.68 / 45.21, GRAB: 2.72 / 3.08, ABNB: 168.82 / 160.63, BKNG: 150.14 / 155.87 };
const r2 = (x) => Math.round(x * 100) / 100;
const alCierre = (e) => {
  const r = variacion[e.ticker];
  if (r == null) return e;
  const evAntes = e.capitalizacion / (1 - e.dn_ebitda / e.ev_ebitda_ltm);
  const f = (evAntes + e.capitalizacion * (r - 1)) / evAntes;
  return { ...e, capitalizacion: Math.round(e.capitalizacion * r), ev_ventas: r2(e.ev_ventas * f), ev_ebitda_ltm: Math.round(e.ev_ebitda_ltm * f * 10) / 10,
    ev_ebitda_ntm: Math.round(e.ev_ebitda_ntm * f * 10) / 10, per_ntm: Math.round(e.per_ntm * r * 10) / 10, fcf_yield_pct: Math.round((e.fcf_yield_pct / r) * 10) / 10 };
};
export const comparables = D.comparables.empresas.map(alCierre).map((e) => {
  const s = sbcPct[e.ticker];
  if (s == null) return e;
  const margenLtm = e.ev_ventas / e.ev_ebitda_ltm; // margen EBITDA ajustado implícito en los dos múltiplos
  const ltm = e.ev_ebitda_ltm / (1 - s / margenLtm);
  const ventasNtmSobreEv = Math.pow(1 + e.crecimiento_pct / 100, 1.25) / e.ev_ventas;
  const ntm = 1 / (1 / e.ev_ebitda_ntm - s * ventasNtmSobreEv);
  return { ...e, ev_ebitda_ltm: r1(ltm), ev_ebitda_ntm: r1(ntm), margen_ebitda_pct: r1(e.margen_ebitda_pct - s * 100) };
});

// 3) Transacciones: las de E (con múltiplos de documentos oficiales) más la OPA sobre Delivery Hero y las dos de D.
const E = JSON.parse(readFileSync(join(aqui, 'E.json'), 'utf8'));
const prefijo = (t, l) => (t || '').replace(/\[([\d,\s–-]+)\]/g, (_, g) => '[' + g.split(',').map((x) => x.trim().replace(/^(\d+)([–-])(\d+)$/, `${l}$1-${l}$3`).replace(/^(\d+)$/, `${l}$1`)).join(', ') + ']');
export const operaciones = [
  ...D.transacciones.operaciones.filter((o) => !o.excluir).map((o) => ({ ...o, comentario: prefijo(o.comentario, 'D') })),
  ...E.transacciones.operaciones.map((o) => ({ ...o, comentario: prefijo(o.comentario, 'E') })),
  ...D.transacciones.operaciones.filter((o) => o.excluir).map((o) => ({ ...o, comentario: prefijo(o.comentario, 'D') })),
];
