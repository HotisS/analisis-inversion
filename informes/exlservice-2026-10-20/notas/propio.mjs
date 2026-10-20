// Parte del analista (ExlService, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA «CON PAGOS EN ACCIONES» (la base de este informe): el BPA publicado (GAAP) más la amortización de intangibles comprados y
// los costes de compras, netos de impuestos. A diferencia del ajustado de la empresa, NO suma los pagos en acciones (79,5 M USD
// en 2025, 3,8 % de las ventas), que son un coste recurrente de personal y crecen con la plantilla [A1, A5].
// Proyección: (ventas × margen EBITDA del DCF − depreciación sin intangibles comprados (2,3 % de las ventas; 2,2 % en 2025)
// − gastos financieros netos) × (1 − 22 % de impuesto; guía 21-22 %) ÷ acciones diluidas.
// Calibrado con 2025: 2.087,7 × (17,87 % − 2,21 %) + 1,3 de resultado financiero = 328,2 × 0,798 (tipo real) ÷ 162,5 = 1,61
// (1,605 con las cuentas). Guía de 2026: ingresos 2.390-2.415 M, gastos financieros netos 16-18 M, impuesto 21-22 % [A3].
// Acciones: 151,6 M en circulación a 24-jul-2026 [A2] + ≈ 2 M de dilución; recompras más lentas desde el 2S26 (la dirección
// reparte más hacia compras) → 153,3 M de media en 2026e y 152 M en 2027e-2028e, SIN recompras no anunciadas.
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;
const bpa = (v, m, fin, acc) => r3(((v * (m - 2.3) / 100) - fin) * 0.78 / acc);
const V26 = 2400; // centro de la guía de 2026 (2.390-2.415 M USD) [A3]
const g27 = S.anios[1].crecimiento_pct, g28 = S.anios[2].crecimiento_pct;
const V27 = V26 * (1 + g27 / 100);
const bpa26 = bpa(V26, S.anios[0].margen_ebitda_pct, 12, 153.3);
const bpa27 = bpa(V27, S.anios[1].margen_ebitda_pct, 20, 152);
// Casos de 2028e: bajista con +5 % de crecimiento en 2028e (6,5 % en 2027e) y margen 16,3 %; alcista con +11 % (12,5 % en
// 2027e) y margen 18,6 %.
const V27b = V26 * 1.065, V27a = V26 * 1.125;
export const BPA = {
  '2026e': bpa26, '2027e': bpa27,
  Bajista: bpa(V27b * 1.05, 16.3, 20, 152),
  Base: bpa(V27 * (1 + g28 / 100), S.anios[2].margen_ebitda_pct, 18, 152),
  Alcista: bpa(V27a * 1.11, 18.6, 16, 152),
};

// Historia del PER en la misma base (BPA con pagos en acciones) [A1, A7]; cierres del ejercicio (31-dic) de bolsa.mjs [D1].
const cierres = { 2018: 10.52, 2019: 13.89, 2020: 17.03, 2021: 28.95, 2022: 33.89, 2023: 30.85, 2024: 44.38, 2025: 42.44 };
const bpaH = { 2017: 0.338, 2018: 0.411, 2019: 0.484, 2020: 0.580, 2021: 0.727, 2022: 0.921, 2023: 1.163, 2024: 1.269, 2025: 1.605, 2026: bpa26 };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaH[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.map((x) => x[1]);
const alCierre = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaH[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 39.76; // cierre del 19-oct-2026 [D1]
export const BPA_NTM = r3(2.4 / 12 * bpa26 + 9.6 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / bpa27), ntm: r1(PRECIO / BPA_NTM),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const n2 = (x) => String(x).replace('.', ',');
const fmt = (l) => l.map(([a, p]) => `${a} ${n2(p)}x`).join('; ');

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los cuatro segmentos (seguros, salud y ciencias de la vida, banca y finanzas, y crecimiento internacional) comparten centros de entrega en la India, Filipinas y Colombia, plataformas de datos y clientes; ninguno tiene valor aparte publicado ni un comprador natural distinto del de la empresa entera [A1].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda financiera 381,25 (revolving 290 + préstamo 91,25) + ≈ 1,8 de arrendamientos financieros = 383;
    // caja 126,7 + inversiones a corto 157,1 + a largo 6,4 = 290,2. otros_ajustes 240 = iMerit pagada después del cierre del
    // balance (170 M el 3-ago-2026 [A11]) + 70 M estimados de los hasta 140 M de incentivos y pagos aplazados (la mitad, por
    // ligados a objetivos) [P1]. La reclamación fiscal de la India (44,4 M sin provisión [A1]) no se resta: la empresa la
    // recurre y la considera improbable. Arrendamientos operativos fuera (US GAAP).
    puente: { fecha: '2026-06-30', deuda_financiera: 383, arrendamientos: 0, caja: 290.2, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 240 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(BPA[e]), multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA CON PAGOS EN ACCIONES (la misma base que nuestros casos: el publicado más la amortización de intangibles comprados y los costes de compras, netos de impuestos [A1, A7]): cierre de cada ejercicio (31-dic, bolsa.mjs [D1]) ÷ BPA real del año siguiente; para el cierre de 2025 (42,44 USD), ÷ nuestro 2026e (${n2(r2(bpa26))}). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de los ocho años 2018-2025. Fuera 2016-2017: la reforma fiscal de EE. UU. deforma el BPA de 2017 (tipo del 42 %) y el de 2018 (6 %) [A1]. Cifras de 2016-2020 corregidas por el desdoblamiento 5×1 de 2023. Sin años de pérdidas. Con el BPA ajustado de la empresa (sin pagos en acciones) los PER serían ≈ 20-25 % más bajos, igual que el actual: la base es la misma a los dos lados. PER actual = precio (39,76 USD, cierre del 19-oct-2026) ÷ nuestro BPA de 2027e (${n2(r2(bpa27))}); con el BPA de los próximos 12 meses (${n2(r2(BPA_NTM))}) sería ${n2(PER.ntm)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA con pagos en acciones del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      // Mediana del PER NTM de los comparables sobre su BPA AJUSTADO (sin pagos en acciones, como lo publica cada uno) [D2]:
      // más baja que en nuestra base; con pagos en acciones restados sería ≈ 10-11 veces. No decide (la regla toma el máximo).
      comparables_per: { mediana: 8.9 },
      consenso: { bpa_ano1: 2.29, bpa_ano2: 2.6, objetivo_medio: 45.13, objetivo_min: 43, objetivo_max: 48, analistas: 8, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 20-oct-2026: BPA ajustado (sin pagos en acciones) de 2,29 USD en 2026 (2,24 hace 90 días) y 2,60 en 2027 (2,52 hace 90 días); objetivo medio de 8 analistas [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  bolsa: { contexto: T.contexto ?? null },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Estimación propia de los pagos aplazados e incentivos de iMerit en el puente (70 de hasta 140 M USD) y de la cifra de ventas anual de iMerit', editor: 'Analista', tipo: 'Estimación propia', fecha: '2026-10-20', url: null },
  ],
  huecos: [],
};
