// Bloque valoracion.objetivo_12m de Parkin (ejercicio objetivo 2028e: el primero que cierra más de 18 meses después del 20-oct-2026).
import * as O from './objetivo.mjs';
const es = (x, d = 2) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const p = (e, y, k) => O.P[e][y][k].toLocaleString('es-ES');

export default {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: `Crecimiento 3 puntos menor y margen 3 puntos menor desde 2027e: la RTA no aprueba la revisión de abonos, el canon queda al 27,5 %, las multas se normalizan con menos cobro (75 % en el 2T26) y los promotores pesan más con poco margen. Ventas de ${p('Bajista', '2028e', 'ventas')} M y beneficio de ${p('Bajista', '2028e', 'beneficio')} M en 2028e.` },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: `Ventas +6,5 % al año en 2027-2028e (plazas públicas nuevas, Dubai Holding y DAMAC por fases, población) con tarifas y abonos sin cambios, margen EBITDA del 58,3 %, intereses de −42 M e impuesto del 9 %: ventas de ${p('Base', '2028e', 'ventas')} M y beneficio de ${p('Base', '2028e', 'beneficio')} M.` },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: `La RTA y el Consejo Ejecutivo aprueban la revisión de abonos y tarifas pedida en febrero de 2026 y se convierten más plazas sin cobrar: +2 puntos de crecimiento y +1 de margen. Ventas de ${p('Alcista', '2028e', 'ventas')} M y beneficio de ${p('Alcista', '2028e', 'beneficio')} M.` },
  ],
  per_historico: {
    base: 'adelantado', actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media, anios: 2,
    excluidos: `Solo dos cierres desde la salida a bolsa (21-mar-2024): 2024 (4,87 AED ÷ BPA real de 2025, 0,2087 = ${es(O.perAdel[0][1], 1)}x) y 2025 (5,69 ÷ nuestro BPA de 2026e, ${es(O.bpa2026, 4)} = ${es(O.perAdel[1][1], 1)}x). Ninguno excluido; antes de 2024 no hay acciones ni beneficio comparable (negocio dentro de la RTA, sin canon ni impuesto).`,
    v2: { base: 'cierre', mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, anios: 2 },
  },
  comparables_per: { mediana: 17.3 },
  consenso: { bpa_ano1: 0.2249, bpa_ano2: 0.2564, objetivo_medio: 6.51, objetivo_min: 5.55, objetivo_max: 7.30, analistas: 9, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA y objetivo medio de 9 analistas) y Yahoo (horquilla de 8), 20-oct-2026; FAB 6,50 AED (ago-26) [D2, D3, D5]' },
  diferencia_consenso: `Nuestro BPA de 2026e (${es(O.bpa2026, 4)}) coincide con el consenso (0,2249) y el de 2027e (${es(O.bpa2027, 4)}) queda un 5 % por debajo (0,2564); el de 2028e (${es(O.bpa.Base, 4)}), un 5 % por debajo (0,2753) [D2]. La diferencia es de ventas: el consenso espera 1.573 M en 2027e y 1.675 M en 2028e con ingresos financieros, casi lo mismo que nosotros (1.568 y 1.669 M sin ellos), pero un margen EBITDA del 60,6 % con los ingresos financieros (≈ 59-60 % sin ellos) frente a nuestro 58,4 %: nosotros dejamos el canon en el 27,5 % que ya provisiona la empresa y damos más peso a los promotores, que dejan poco margen. El objetivo medio (6,51 AED) equivale a 25 veces el BPA de 2027e del consenso.`,
  media: null,
  comentario: null,
};
