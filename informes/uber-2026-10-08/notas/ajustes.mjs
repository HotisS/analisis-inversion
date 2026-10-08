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
export const comparables = D.comparables.empresas.map((e) => {
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
