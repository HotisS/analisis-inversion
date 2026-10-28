// Iteración del 28-oct-2026: datos de mercado, regla 13 (bolsa.contexto) y objetivo a 12 meses.
// BPA en base «ajustada» propia, la MISMA en la historia del PER y en los escenarios: EBIT GAAP (con la remuneración en
// acciones y las reservas legales dentro) + ingresos por intereses − gastos por intereses, SIN revalorizaciones de
// participaciones y SIN liberaciones de provisiones fiscales, con un tipo impositivo normalizado, menos minoritarios.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { anios, casos } from './supuestos.mjs';
const aqui = dirname(fileURLToPath(import.meta.url));
const B = JSON.parse(readFileSync(join(aqui, 'bolsa.json'), 'utf8'));
const r2 = (x) => Math.round(x * 100) / 100, r1 = (x) => Math.round(x * 10) / 10;
const miles = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const f2 = (x) => r2(x).toFixed(2).replace('.', ','), f1 = (x) => r1(x).toFixed(1).replace('.', ',');

// --- BPA histórico ajustado (XBRL de los 10-K [P17]) con el tipo del 14 % del primer año del DCF.
const T_HIST = 0.14;
const hist = {
  2023: { ebit: 1110, intIng: 484, intGas: 633, minor: 269, acc: 2091.8 },
  2024: { ebit: 2799, intIng: 721, intGas: 523, minor: -11, acc: 2150.5 },
  2025: { ebit: 5565, intIng: 743, intGas: 440, minor: 40, acc: 2119.7 },
};
export const bpaHist = Object.fromEntries(Object.entries(hist).map(([a, h]) => [a, r2(((h.ebit + h.intIng - h.intGas) * (1 - T_HIST) - h.minor) / h.acc)]));

// --- BPA propio de la proyección (misma fórmula que la revisión del 13-oct): resultado financiero −800 M (deuda de
// 12.723 M al 6,3 %, sin ingresos de la caja, que se destina a Delivery Hero, y sin revalorizaciones), minoritarios 40 M,
// 2.050 M de acciones (las emisiones a empleados se compensan con el programa de recompras ya aprobado).
const FIN = -800, MIN = 40, ACC = 2050;
const proyecta = (dc = 0, dm = 0) => {
  let v = 52017; const out = {};
  for (const a of anios.slice(0, 3)) {
    v *= 1 + (a.crecimiento_pct + (a.fijo ? 0 : dc)) / 100;
    const ebit = v * (a.margen_ebitda_pct + (a.fijo ? 0 : dm)) / 100 - v * a.amortizacion_pct_ventas / 100;
    out[a.periodo] = { ventas: v, ebit, bpa: r2(((ebit + FIN) * (1 - a.tasa_impositiva_pct / 100) - MIN) / ACC) };
  }
  return out;
};
const esc = Object.fromEntries(casos.map((c) => [c.escenario, proyecta(c.ajuste_crecimiento_pp, c.ajuste_margen_pp)]));
export const bpa = { 2026: esc.Base['2026e'].bpa, 2027: esc.Base['2027e'].bpa, 2028: Object.fromEntries(Object.entries(esc).map(([k, v]) => [k, v['2028e'].bpa])) };

// --- Historia del PER adelantada (cierre de cada año ÷ BPA ajustado del año siguiente; el último, ÷ nuestro 2026e).
const cierre = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const precio = B.identificacion.precio;
const adel = { 2022: cierre[2022] / bpaHist[2023], 2023: cierre[2023] / bpaHist[2024], 2024: cierre[2024] / bpaHist[2025], 2025: cierre[2025] / bpa[2026] };
const validos = [2023, 2024, 2025].map((a) => adel[a]);
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const actual = precio / bpa[2027];
// v2 (al cierre: precio de cierre ÷ BPA ajustado del mismo año), misma base.
const alCierre = { 2023: cierre[2023] / bpaHist[2023], 2024: cierre[2024] / bpaHist[2024], 2025: cierre[2025] / bpaHist[2025] };
const v2val = [alCierre[2024], alCierre[2025]];

export const objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'ajustado',
  casos: ['Bajista', 'Base', 'Alcista'].map((e) => {
    const p = esc[e]['2028e'];
    const txt = {
      Bajista: 'el coche autónomo resta 4 puntos de crecimiento y 3,5 de margen en 2027e-2028e',
      Base: 'el consenso de ingresos con un punto menos en 2027e-2028e y el margen EBITDA contable del 16,8 %',
      Alcista: 'Uber como red de demanda de los coches autónomos: 2 puntos más de crecimiento y 1,5 de margen',
    }[e];
    return { escenario: e, metrica: 'PER 2028e', beneficio_por_accion: p.bpa, multiplo: null, precio: null,
      justificacion: `BPA ajustado propio de 2028e: ventas de ${miles(p.ventas)} M USD y EBIT de ${miles(p.ebit)} M (${txt}), resultado financiero de −800 M sin revalorizaciones, impuestos del 18 %, 40 M de minoritarios y 2.050 M de acciones: ${f2(p.bpa)} USD.` };
  }),
  per_historico: {
    base: 'adelantado', base_bpa: 'ajustado',
    actual: r1(actual), mediana_5a: r1(med(validos)), minimo_5a: r1(Math.min(...validos)), media_larga: r1(validos.reduce((a, b) => a + b, 0) / validos.length), anios: 3,
    excluidos: `Historia ADELANTADA en BPA ajustado propio, la misma base que los escenarios (EBIT + ingresos − gastos por intereses, sin revalorizaciones de participaciones ni liberaciones de provisiones fiscales, impuestos normalizados al 14 %, menos minoritarios) [P17]. BPA ajustado: 2023 ${f2(bpaHist[2023])}, 2024 ${f2(bpaHist[2024])}, 2025 ${f2(bpaHist[2025])} USD (publicados: 0,87, 4,56 y 4,73, inflados por +1.610 y +1.832 M de revalorizaciones en 2023-2024 y por 6.400 y 5.000 M de liberaciones fiscales en 2024-2025). PER al cierre de cada año ÷ BPA del año siguiente: 2023 ${f1(adel[2023])}x (61,57 ÷ ${f2(bpaHist[2024])}); 2024 ${f1(adel[2024])}x (60,32 ÷ ${f2(bpaHist[2025])}); 2025 ${f1(adel[2025])}x (81,71 ÷ nuestro BPA de 2026e, ${f2(bpa[2026])}). Fuera 2022 (${f1(adel[2022])}x: 24,73 ÷ ${f2(bpaHist[2023])}, el primer año con beneficio, BPA casi nulo) y 2020-2021 (pérdidas). Tres años: mediana, mínimo y media de 2023-2025. Actual: ${f2(precio)} ÷ nuestro BPA de 2027e (${f2(bpa[2027])}) = ${f1(actual)}x.`,
    v2: { actual: r1(actual), mediana_5a: r1(med(v2val)), minimo_5a: r1(Math.min(...v2val)), media_larga: r1((v2val[0] + v2val[1]) / 2), base: 'cierre', base_bpa: 'ajustado',
      excluidos: `Al cierre, misma base ajustada: 2024 ${f1(alCierre[2024])}x y 2025 ${f1(alCierre[2025])}x; fuera 2023 (${f1(alCierre[2023])}x, ≥ 150x) y los años de pérdidas.` },
  },
  comparables_per: { mediana: 19.1 },
  consenso: { bpa_ano1: 4.54, bpa_ano2: 5.81, objetivo_medio: 100.86, objetivo_min: 70, objetivo_max: 150, analistas: 50, tendencia_3m: 'estables', fuente: 'MarketScreener (23-oct-2026) y Stock Analysis (26-oct-2026) [P5, P6]' },
  diferencia_consenso: null, // se escribe en resumen.mjs con las cifras del motor
  media: null,
  comentario: null,
};

// --- Bolsa: datos de bolsa.mjs y regla 13.
export const bolsa = {
  tipo_rentabilidad: B.bolsa.tipo_rentabilidad, rentabilidades: B.bolsa.rentabilidades, anual: B.bolsa.anual,
  beta: B.bolsa.beta, volatilidad_pct: B.bolsa.volatilidad_pct, max_drawdown_pct: B.bolsa.max_drawdown_pct,
  contexto: {
    movimiento: { fecha: '2026-10-27', var_1m_pct: -3.5, var_3m_pct: -7.6, var_6m_pct: -11.2, var_12m_pct: -30.1, dist_max_52s_pct: -34.0, dist_min_52s_pct: 0.0, dist_max_historico_pct: -34.3, tendencia: 'bajista', volatilidad_60d_pct: 34, avisos: ['P4 En mínimos de 52 semanas (0 % sobre el mínimo).'] },
    movimientos_fuertes: [
      { periodo: '20-nov-2025', var_pct: -6.9, causa: 'Sin hecho propio: la mayor caída diaria desde abril, dos semanas después de unos resultados del 3T25 por encima de lo esperado, en plena venta del sector tecnológico y con el temor a los robotaxis y a la regulación europea [P18].', veredicto: 'no cambia', condicion: null },
      { periodo: '10-dic-2025', var_pct: -5.5, causa: 'Presión regulatoria europea sobre las plataformas de VTC y temor al coche autónomo; sin cambio de guía [P18].', veredicto: 'no cambia', condicion: null },
      { periodo: '4-nov-2025, 4-feb-2026 y 5-ago-2026', var_pct: -5.3, causa: 'Días de resultados (−5,1 %, −5,1 % y −5,3 %): Uber cumplió o superó la guía, pero la del trimestre siguiente decepcionó a un mercado que pedía más [C11-C14, P12].', veredicto: 'no cambia', condicion: null },
      { periodo: 'jul-ago-2026', var_pct: 20.2, causa: 'Rebote desde el mínimo del 24-jul (65,94) hasta 80,35 USD el 25-ago: flujo libre récord y reservas brutas +22 % en el 2T26 (+6,5 % el 7-ago) y la acogida de la OPA sobre Delivery Hero [P12, D9].', veredicto: 'no cambia', condicion: null },
      { periodo: 'ago-sep-2026', var_pct: -13.9, causa: 'Del 25-ago al 24-sep (80,35 → 69,22 USD): presentación del Cybercab de Tesla y su autorización en Eslovenia (−4 % el 8-sep), y miedo a la desintermediación [P13].', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-11-04', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de la apertura; guía de reservas brutas de 58.250-60.250 M USD y EBITDA ajustado de 2.860-2.960 M [A4, E15].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-05', tipo: 'fusión u oferta', hecho: 'Fin del plazo de aceptación de la OPA sobre Delivery Hero (41,50 EUR por acción); con Prosus, Uber ya supera el umbral del 50 % más una acción en términos económicos. La liquidación espera a las autorizaciones de competencia (2S27) y no hay un hecho con fecha que pueda mover el precio de Uber más de un 5 % [P7, P8].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-23', tipo: 'fusión u oferta', hecho: 'Instacart estudia venderse tras conversaciones con DoorDash y Uber; según una segunda información, Uber se retiró. Uber cayó un 3,43 % ese día, también por los incentivos a conductores antes de la temporada alta [P10, P11].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-19', tipo: 'demanda o regulador', hecho: 'Un tribunal británico desestima la demanda colectiva de los taxistas de Londres contra Uber [P16].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-08', tipo: 'demanda o regulador', hecho: 'La autoridad neerlandesa de protección de datos multa a Uber con 824,99 M EUR por suspender cuentas de conductores de forma automática; recurrida y ya en el puente (+920 M USD) [B27].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-06', tipo: 'fusión u oferta', hecho: 'Compra de ezCater por 2.300 M USD en efectivo (más de 2.500 M de reservas brutas en 12 meses, rentable en resultado operativo no GAAP); cierre en los próximos meses [P9].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10', tipo: 'recomendación', hecho: 'Sin rebajas en octubre: Guggenheim (125 USD), TD Cowen (118), RBC (105), KeyBanc (105) y Bernstein (95) reiteran compra; 41 de 50 analistas recomiendan comprar, frente a 46 de 53 en mayo [P6].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-10', tipo: 'directivos', hecho: 'El primer ejecutivo compra 141.000 acciones (10,0 M USD a 70,96) y el presidente 70.000 (5,3 M USD a 75,65-76,44) el 4-sep; la única venta posterior es de 2,0 M USD de la directora jurídica (11-sep) [P14].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2026-11-04',
    veredicto: 'no cambia',
    condicion: null,
    comentario: 'La acción está en mínimos de 52 semanas (65,78 USD), con tendencia bajista y un 34 % por debajo del máximo de noviembre de 2025. La caída no tiene un hecho de negocio detrás: el consenso de BPA no ha cambiado en octubre, nadie ha rebajado la recomendación y la dirección compró en septiembre. Lo que pesa es el miedo al coche autónomo (Cybercab, Waymo) y, en octubre, la especulación sobre Instacart y los incentivos a conductores. El único hecho pendiente con fecha son los resultados del 4-nov, que por la regla 11 no retrasan; la OPA sobre Delivery Hero no tiene un hito que pueda mover el precio más de un 5 % antes de 2027. Veredicto: no cambia.',
  },
  comentario: null, // en textos.mjs
};
export const identificacion = { volumen_medio_diario: `≈ ${miles(B.volumen_3m.importe_dia_millones)} M USD/día (${(B.volumen_3m.acciones_dia / 1e6).toFixed(1).replace('.', ',')} M acciones, 3 meses)` };
