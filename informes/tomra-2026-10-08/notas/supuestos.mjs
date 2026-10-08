// Supuestos del DCF y de los escenarios (Tomra, corte 2026-10-08).
// El motor proyecta ingresos y margen EBITDA del grupo. Aquí se construyen por división (Collection, Recycling, Food,
// Horizon y funciones de grupo), cada una con su crecimiento y su margen EBITA, y se pasan a grupo:
// EBITDA = EBITA + depreciación (inmovilizado, derechos de uso y software propio). La amortización de intangibles de
// compras (~26 M en 2025) va por debajo del EBITA y dentro de `amortizacion_pct_ventas`.

// Base 2025 real (MEUR) [A]: ingresos y EBITA por división.
export const BASE = {
  Collection: { ing: 740.5, ebita: 126.0 },
  Recycling: { ing: 218.2, ebita: 22.2 },
  Food: { ing: 328.0, ebita: 47.3 },
  Horizon: { ing: 32.2, ebita: -4.7 },
  Grupo: { ing: -0.6, ebita: -16.9 },
};

// Por año: ingresos de cada división (crecimiento %, salvo 2026e, que va en importe por la guía) y margen EBITA (%).
// Horizon en importe; funciones de grupo como coste fijo (EBITA en M). esp = partidas especiales (M, coste en caja).
export const modelo = [
  //            Collection          Recycling          Food               Horizon          Grupo  esp   dep (% ventas, en EBITDA)
  { periodo: '2026e', c: { ing: 874 }, cm: 16.6, r: { ing: 207 }, rm: 8.7, f: { ing: 350 }, fm: 10.5, h: 47, hm: -17, gf: -17, esp: 13, dep: 6.6 },
  { periodo: '2027e', c: { g: 13.0 }, cm: 18.5, r: { g: 10.0 }, rm: 14.5, f: { g: 5.5 }, fm: 12.5, h: 60, hm: -3, gf: -18, esp: 0, dep: 6.5 },
  { periodo: '2028e', c: { g: 5.0 }, cm: 19.0, r: { g: 9.0 }, rm: 17.0, f: { g: 5.5 }, fm: 13.5, h: 70, hm: 3, gf: -18.5, esp: 0, dep: 6.5 },
  { periodo: '2029e', c: { g: 3.0 }, cm: 19.0, r: { g: 8.0 }, rm: 18.0, f: { g: 5.0 }, fm: 14.0, h: 80, hm: 6, gf: -19, esp: 0, dep: 6.5 },
  { periodo: '2030e', c: { g: 6.0 }, cm: 19.0, r: { g: 7.0 }, rm: 18.5, f: { g: 5.0 }, fm: 14.0, h: 90, hm: 8, gf: -19.5, esp: 0, dep: 6.5 },
  { periodo: '2031e', c: { g: 5.0 }, cm: 19.0, r: { g: 6.0 }, rm: 18.5, f: { g: 4.5 }, fm: 14.0, h: 98, hm: 9, gf: -20, esp: 0, dep: 6.5 },
  { periodo: '2032e', c: { g: 4.5 }, cm: 19.0, r: { g: 5.0 }, rm: 18.5, f: { g: 4.0 }, fm: 14.0, h: 105, hm: 10, gf: -20.5, esp: 0, dep: 6.5 },
  { periodo: '2033e', c: { g: 4.0 }, cm: 19.0, r: { g: 4.5 }, rm: 18.5, f: { g: 3.5 }, fm: 14.0, h: 110, hm: 10, gf: -21, esp: 0, dep: 6.5 },
  { periodo: '2034e', c: { g: 3.5 }, cm: 19.0, r: { g: 4.0 }, rm: 18.5, f: { g: 3.0 }, fm: 14.0, h: 115, hm: 10, gf: -21.5, esp: 0, dep: 6.5 },
  { periodo: '2035e', c: { g: 3.0 }, cm: 19.0, r: { g: 3.0 }, rm: 18.5, f: { g: 3.0 }, fm: 14.0, h: 118, hm: 10, gf: -22, esp: 0, dep: 6.5 },
];
// Amortización total (incluye la de intangibles de compras, que se agota) y capex con altas de derechos de uso (NIIF 16).
export const AMORT = [8.7, 8.2, 7.9, 7.7, 7.5, 7.4, 7.3, 7.3, 7.2, 7.2];
export const CAPEX = [9.3, 9.0, 8.6, 8.4, 8.3, 8.2, 8.0, 7.9, 7.8, 7.8];
export const NWC = 30.0;
export const TAX = [25.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0];

const sig = (prev, s) => (s.ing != null ? s.ing : prev * (1 + s.g / 100));
export function construir(m = modelo) {
  let p = { c: BASE.Collection.ing, r: BASE.Recycling.ing, f: BASE.Food.ing };
  let ingPrev = BASE.Collection.ing + BASE.Recycling.ing + BASE.Food.ing + BASE.Horizon.ing + BASE.Grupo.ing;
  return m.map((y) => {
    const c = sig(p.c, y.c), r = sig(p.r, y.r), f = sig(p.f, y.f), h = y.h;
    const ing = c + r + f + h - 0.6;
    const ebita = c * y.cm / 100 + r * y.rm / 100 + f * y.fm / 100 + h * y.hm / 100 + y.gf - y.esp;
    const ebitda = ebita + ing * y.dep / 100;
    const fila = { periodo: y.periodo, collection: c, recycling: r, food: f, horizon: h, ingresos: ing, g_ing: (ing / ingPrev - 1) * 100,
      ebita_coll: c * y.cm / 100, ebita_rec: r * y.rm / 100, ebita_food: f * y.fm / 100, ebita, ebitda, margen: ebitda / ing * 100, margen_ebita: ebita / ing * 100 };
    p = { c, r, f }; ingPrev = ing;
    return fila;
  });
}

const red = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
export const filas = construir();
export const anios = filas.map((f, i) => ({
  periodo: f.periodo, crecimiento_pct: red(f.g_ing, 2), margen_ebitda_pct: red(f.margen, 2),
  amortizacion_pct_ventas: AMORT[i], capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX[i], fijo: i === 0,
}));
export const tabla = filas.map((f) => ({ periodo: f.periodo, coll: red(f.collection, 0), rec: red(f.recycling, 0), food: red(f.food, 0), hor: f.horizon, ing: red(f.ingresos, 0), g: red(f.g_ing, 1), ebita: red(f.ebita, 0), m_ebita: red(f.margen_ebita, 1), ebitda: red(f.ebitda, 0), m_ebitda: red(f.margen, 1) }));

export const wacc = { tasa_libre_pct: 3.55, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 24.0, peso_deuda_pct: 21.7 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: el Reino Unido se queda en las ~3.900 máquinas ya adjudicadas, Recycling no sale del 9-10 % de margen y Food vuelve hacia el 5 % de 2024;
  // tras el pico de instalación, un año de caída como el de 2025 (Collection −4 %, grupo −2,2 %).
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [{ periodo: '2029e', crecimiento_pp: -7.0, margen_pp: -3.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la dirección cumple sus ambiciones de 2030 por división (Collection en la parte alta de la decena, Recycling 20-25 %, Food hacia el 15 %)
  // y el PPWR obliga a abrir sistemas de depósito en varios países grandes de la UE a partir de 2029.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.75, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 15, escenarios: 30 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(tabla); console.table(anios); }
