// Modelo de exceso de rentabilidad (residual income) de BTG Pactual por unit, corte 2026-10-27 (precio: cierre del 26-oct-2026).
// Base del beneficio: LUCRO LÍQUIDO AJUSTADO (BR GAAP de gestión, sin amortización del fondo de comercio), el que publica la
// empresa por unit y usa el mercado [A1-A3]. Valor contable de partida: patrimonio ajustado del 2T26 (79.553 M) ÷ 3.862,552 M de
// units = 20,60 BRL [A1]. Fecha base del modelo: 30-jun-2026; el valor se lleva al 27-oct-2026 capitalizando con el Ke.
// Ejecutar: node informes/btg-pactual-2026-10-27/notas/banco-ri.mjs  (escribe banco-ri.json y saca las tablas en Markdown)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
export const UNITS = 3862.552; // millones de units equivalentes (11.587,655 M de acciones ex-tesorería ÷ 3) [A1]
export const B0 = 79553 / UNITS; // 20,60 BRL a 30-jun-2026
export const PRECIO = 60.0; // cierre del 26-oct-2026 en B3 [D1]
export const RF_HOY = 15.44, RF_23OCT = 12.98, RF_ENCARGO = 13.5; // Brasil 10 años, Trading Economics [D3]
export const BETA = 1.28, PRIMA = 5.5, G = 5.0; // beta ajustada mensual 5 años frente al Ibovespa [D1]; g = IPCA largo ≈ 4 % + 1 real
export const ke = (rf, beta = BETA) => rf + beta * PRIMA;

// ROE sobre el valor contable de PRINCIPIO de cada periodo (el 2H26, anualizado) y payout (JCP + dividendos ÷ beneficio).
// 2H26: 2,70 BRL por unit (3T26 ≈ 1,36, cerrado antes de las elecciones; 4T26 ≈ 1,34 con el golpe del 26-oct) → 26,2 % anual.
// 2027e: 5,95 (consenso 6,13 [D2]: −3 % por menos banca de inversión y más coste del crédito tras el 26-oct, en parte compensado
// por el mayor rendimiento del patrimonio a la Selic). 2028e: 6,72. Después baja hacia un ROE de 24 % (≈ media 2022-2025 sobre
// patrimonio medio, 23,4 %) y el payout sube hasta el que deja crecer el valor contable al 5 % (1 − 5/24 = 79 %).
export const BASE = {
  periodos: ['2H26', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'],
  t: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5], // años desde el 30-jun-2026 (flujo al final de cada periodo)
  roe: [26.2, 26.3, 25.1, 25.0, 24.8, 24.6, 24.4, 24.2, 24.1, 24.0],
  payout: [30, 30, 30, 30, 30, 40, 50, 60, 70, 79.2],
  roeT: 24.0,
};

export function ri({ rf = RF_HOY, beta = BETA, dRoe = 0, roeT = null, g = G, base = BASE } = {}) {
  const k = ke(rf, beta) / 100;
  let B = B0, pv = 0;
  const filas = [];
  base.periodos.forEach((p, i) => {
    const frac = i === 0 ? 0.5 : 1;
    const roe = (base.roe[i] + dRoe) / 100;
    const eps = roe * B * frac;
    const exceso = (roe - k) * B * frac;
    const div = eps * base.payout[i] / 100;
    const df = Math.pow(1 + k, base.t[i]);
    pv += exceso / df;
    filas.push({ periodo: p, vc_inicio: B, roe: roe * 100, bpa: eps, dpa: div, exceso, va_exceso: exceso / df });
    B = B + eps - div;
  });
  const rT = ((roeT ?? base.roeT) + dRoe) / 100;
  const terminal = ((rT - k) * B) / (k - g / 100); // valor al final de 2035 del exceso perpetuo (crece al g)
  const vaTerminal = terminal / Math.pow(1 + k, base.t.at(-1));
  const valor30jun = B0 + pv + vaTerminal;
  const valor = valor30jun * Math.pow(1 + k, 119 / 365); // al 27-oct-2026 (sin JCP pagados en medio)
  return { ke: k * 100, filas, vc_2035: B, terminal, va_terminal: vaTerminal, va_excesos: pv, valor30jun, valor, pvc_implicito: valor / B0 };
}

// P/VC justificado (Gordon): (ROE − g) ÷ (Ke − g).
export const pvcJust = (roe, k, g = G) => (roe - g) / (k - g);
// Ke implícito en el precio: P/VC = (ROE − g)/(Ke − g) → Ke = g + (ROE − g) ÷ (P/VC). g implícito con el Ke dado.
export const keImpl = (roe, pvc, g = G) => g + (roe - g) / pvc;
export const gImpl = (roe, pvc, k) => (pvc * k - roe) / (pvc - 1);

const f = (x, d = 2) => (x == null ? 'n.d.' : x.toFixed(d).replace('.', ','));
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const casos = {
    hoy: ri({ rf: RF_HOY }), oct23: ri({ rf: RF_23OCT }), encargo: ri({ rf: RF_ENCARGO }),
    bajista: ri({ rf: RF_HOY, dRoe: -4 }), alcista: ri({ rf: RF_HOY, dRoe: 2 }),
    beta1: ri({ rf: RF_HOY, beta: 1.0 }),
  };
  const out = { B0, PRECIO, UNITS, ke_hoy: ke(RF_HOY), ke_23oct: ke(RF_23OCT), ke_encargo: ke(RF_ENCARGO), casos: Object.fromEntries(Object.entries(casos).map(([k, v]) => [k, { ...v, filas: k === 'hoy' ? v.filas : undefined }])) };
  const sens = [];
  for (const rf of [RF_23OCT, RF_ENCARGO, 14.5, RF_HOY]) for (const dRoe of [-4, -2, 0, 2]) sens.push({ rf, dRoe, valor: ri({ rf, dRoe }).valor });
  out.sensibilidad = sens;
  out.pvc = {
    hoy: { roe25: pvcJust(25, ke(RF_HOY)), roe24: pvcJust(24, ke(RF_HOY)) },
    oct23: { roe25: pvcJust(25, ke(RF_23OCT)) },
    precio_pvc: PRECIO / B0, ke_implicito_roe25: keImpl(25, PRECIO / B0), g_implicito_ke_hoy: gImpl(25, PRECIO / B0, ke(RF_HOY)),
  };
  fs.writeFileSync(path.join(dir, 'banco-ri.json'), JSON.stringify(out, null, 1));
  const h = casos.hoy;
  console.log(`Ke hoy ${f(ke(RF_HOY))} %, 23-oct ${f(ke(RF_23OCT))} %, encargo ${f(ke(RF_ENCARGO))} %; VC0 ${f(B0)}; P/VC ${f(PRECIO / B0)}`);
  console.log('| Periodo | VC al inicio | ROE | BPA | DPA | Exceso (ROE − Ke) × VC | VA del exceso |\n|---|---|---|---|---|---|---|');
  for (const r of h.filas) console.log(`| ${r.periodo} | ${f(r.vc_inicio)} | ${f(r.roe, 1)} % | ${f(r.bpa)} | ${f(r.dpa)} | ${f(r.exceso)} | ${f(r.va_exceso)} |`);
  console.log(`VC 2035 ${f(h.vc_2035)}; terminal ${f(h.terminal)} (VA ${f(h.va_terminal)}); suma VA excesos ${f(h.va_excesos)}; valor 30-jun ${f(h.valor30jun)}; valor 27-oct ${f(h.valor)}`);
  for (const [k, v] of Object.entries(casos)) console.log(`${k}: Ke ${f(v.ke)} % → valor ${f(v.valor)} (P/VC ${f(v.pvc_implicito)})`);
  console.log('Sensibilidad (rf × ΔROE):'); for (const s of sens) console.log(`  rf ${f(s.rf)} ΔROE ${s.dRoe}: ${f(s.valor)}`);
  console.log('P/VC:', JSON.stringify(out.pvc));
}
