// Supuestos del DCF y de los escenarios (LVMH, corte 2026-10-21, tras las ventas del 3T26).
// El motor proyecta ingresos y margen EBITDA del grupo. Aquí se construyen por grupo de negocio (ventas y resultado
// operativo recurrente, «PRO») y se pasan a grupo: EBITDA = PRO − otros gastos operativos en caja normalizados
// + amortizaciones (incluida la de derechos de uso, NIIF 16).

// Base 2025 real (MEUR) [A]: ventas y resultado operativo recurrente por grupo.
export const BASE = {
  WS: { ing: 5358, pro: 1016 },
  FLG: { ing: 37770, pro: 13209 },
  PC: { ing: 8174, pro: 727 },
  WJ: { ing: 10486, pro: 1514 },
  SR: { ing: 18348, pro: 1780 },
  OT: { ing: 671, pro: -491 }, // otras actividades, holding y eliminaciones
};

// Crecimiento publicado de ventas (%) y margen PRO (%) por año y grupo.
// 2026e: 1S26 real (−3 % publicado: +2 % orgánico, −5 divisa, −1 perímetro) y 2S26 con +3-4 % orgánico, −2/−3 de divisa
// y la salida de DFS en Gran China (marzo-26), LAX/SFO y Okinawa (2S26).
export const modelo = [
  //            WS g/m          FLG g/m          PC g/m          WJ g/m          SR g/m          OT g, pro   otros(%) dep(%)
  // 21-oct: Moda y Marroquinería −5 % orgánico en el 3T26 (12-oct): su vuelta se retrasa un año (2027e plano con margen 34,0 %).
  { periodo: '2026e', ws: [-2.0, 20.5], flg: [-4.0, 34.0], pc: [-3.0, 9.6], wj: [2.0, 15.6], sr: [-4.0, 10.3], ot: [3, -470], oo: 0.0, dep: 8.2 },
  { periodo: '2027e', ws: [3.0, 21.5], flg: [0.0, 34.0], pc: [3.5, 10.0], wj: [5.5, 16.2], sr: [-1.0, 10.8], ot: [3, -480], oo: 0.2, dep: 8.2 },
  { periodo: '2028e', ws: [4.0, 22.5], flg: [4.5, 34.6], pc: [4.0, 10.3], wj: [6.0, 16.7], sr: [5.5, 11.0], ot: [3, -490], oo: 0.2, dep: 8.2 },
  { periodo: '2029e', ws: [4.0, 23.5], flg: [6.0, 35.2], pc: [4.0, 10.5], wj: [6.0, 17.0], sr: [5.5, 11.0], ot: [3, -500], oo: 0.2, dep: 8.3 },
  { periodo: '2030e', ws: [4.0, 24.0], flg: [6.0, 35.6], pc: [4.0, 10.5], wj: [5.5, 17.0], sr: [5.0, 11.0], ot: [3, -510], oo: 0.2, dep: 8.3 },
  { periodo: '2031e', ws: [3.5, 24.0], flg: [5.5, 35.8], pc: [3.5, 10.5], wj: [5.0, 17.0], sr: [4.5, 11.0], ot: [3, -520], oo: 0.2, dep: 8.4 },
  { periodo: '2032e', ws: [3.5, 24.0], flg: [5.0, 35.8], pc: [3.5, 10.5], wj: [4.5, 17.0], sr: [4.0, 11.0], ot: [3, -530], oo: 0.2, dep: 8.4 },
  { periodo: '2033e', ws: [3.0, 24.0], flg: [4.0, 35.8], pc: [3.0, 10.5], wj: [4.0, 17.0], sr: [3.5, 11.0], ot: [3, -540], oo: 0.2, dep: 8.5 },
  { periodo: '2034e', ws: [3.0, 24.0], flg: [3.5, 35.8], pc: [3.0, 10.5], wj: [3.5, 17.0], sr: [3.0, 11.0], ot: [3, -550], oo: 0.2, dep: 8.5 },
  { periodo: '2035e', ws: [2.5, 24.0], flg: [3.0, 35.8], pc: [2.5, 10.5], wj: [3.0, 17.0], sr: [3.0, 11.0], ot: [3, -560], oo: 0.2, dep: 8.5 },
];
// Capex = inversiones operativas (5,3-5,7 % en 2025-1S26, 6,5 % en 2024) + altas de derechos de uso (≈4 % de ventas).
export const CAPEX = [9.4, 9.6, 9.8, 10.0, 10.0, 9.9, 9.8, 9.6, 9.4, 9.2];
export const NWC = 23.5;
export const TAX = [30.0, 27.0, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0];

const GR = ['ws', 'flg', 'pc', 'wj', 'sr'];
const KEY = { ws: 'WS', flg: 'FLG', pc: 'PC', wj: 'WJ', sr: 'SR' };
export function construir(m = modelo) {
  let p = Object.fromEntries(GR.map((g) => [g, BASE[KEY[g]].ing])); p.ot = BASE.OT.ing;
  let ingPrev = Object.values(BASE).reduce((s, x) => s + x.ing, 0);
  return m.map((y) => {
    const ing = {}, pro = {};
    for (const g of GR) { ing[g] = p[g] * (1 + y[g][0] / 100); pro[g] = ing[g] * y[g][1] / 100; }
    ing.ot = p.ot * (1 + y.ot[0] / 100); pro.ot = y.ot[1];
    const total = Object.values(ing).reduce((s, x) => s + x, 0);
    const proT = Object.values(pro).reduce((s, x) => s + x, 0);
    const ebitda = proT - total * y.oo / 100 + total * y.dep / 100;
    const fila = { periodo: y.periodo, ing, pro, ingresos: total, g_ing: (total / ingPrev - 1) * 100, pro_total: proT, margen_pro: proT / total * 100, ebitda, margen: ebitda / total * 100, dep: y.dep };
    p = { ...ing }; ingPrev = total;
    return fila;
  });
}

const red = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
export const filas = construir();
export const anios = filas.map((f, i) => ({
  periodo: f.periodo, crecimiento_pct: red(f.g_ing, 2), margen_ebitda_pct: red(f.margen, 2),
  amortizacion_pct_ventas: f.dep, capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX[i], fijo: i === 0,
}));

export const wacc = { tasa_libre_pct: 3.48, beta: 1.25, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 25.8, peso_deuda_pct: 16.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -7.0, margen_pp: -3.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 25, escenarios: 20 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  for (const f of filas) console.log(f.periodo, red(f.ingresos, 0), red(f.g_ing), 'PRO', red(f.pro_total, 0), red(f.margen_pro), 'EBITDA', red(f.ebitda, 0), red(f.margen), 'FLG', red(f.pro.flg, 0), 'WS', red(f.pro.ws, 0), 'WJ', red(f.pro.wj, 0), 'SR', red(f.pro.sr, 0), 'PC', red(f.pro.pc, 0));
}
