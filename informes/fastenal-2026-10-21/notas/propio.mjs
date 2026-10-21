// Parte del analista (Fastenal, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA GAAP (Fastenal no publica ajustado) con la proyección del DCF:
//   BAI = ventas × (margen EBITDA − amortización) + ingresos financieros netos (≈ 3 M al año sin deuda; 1,4 M en nueve meses de 2026)
//   BPA = BAI × (1 − tipo fiscal) ÷ acciones diluidas de hoy (1.150,1 M en el 3T26), SIN recompras no anunciadas.
// Calibrado con 2025 real: 8.200,5 × (22,37 % − 2,185 %) − 0,7 = 1.655 × (1 − 23,96 %) ÷ 1.150,3 = 1,094 (publicado 1,09).
const VENTAS_2025 = 8200.5, ACC = 1150.1;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (v, margen, amort, tasa) => r2((v * (margen - amort) / 100 + 3) * (1 - tasa / 100) / ACC);
const a = S.anios;
const v26 = VENTAS_2025 * (1 + a[0].crecimiento_pct / 100);
const bpa26 = bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas, a[0].tasa_impositiva_pct);
const caso = (perf27, dg, dm) => {
  const v27 = v26 * (1 + (a[1].crecimiento_pct + perf27.g) / 100);
  const v28 = v27 * (1 + (a[2].crecimiento_pct + dg) / 100);
  return { v27, v28, b27: bpa(v27, a[1].margen_ebitda_pct + perf27.m, a[1].amortizacion_pct_ventas, 24.6), b28: bpa(v28, a[2].margen_ebitda_pct + dm, a[2].amortizacion_pct_ventas, 24.6) };
};
const base = caso({ g: 0, m: 0 }, 0, 0);
const baj = caso({ g: -10, m: -2.5 }, -3.0, -1.5);
const alc = caso({ g: 1.5, m: 0.5 }, 1.5, 0.5);
export const BPA = { 2026: bpa26, 2027: base.b27, Bajista: baj.b28, Base: base.b28, Alcista: alc.b28 };

// Historia del PER ADELANTADA: precio de cierre de cada año [D1] ÷ BPA real del año siguiente en acciones de hoy [A7, A1]
// (2026: nuestro 2026e). BPA = beneficio neto ÷ acciones diluidas reexpresadas por las divisiones de 2019 y 2025.
const cierres = { 2016: 11.74, 2017: 13.67, 2018: 13.07, 2019: 18.48, 2020: 24.42, 2021: 32.03, 2022: 23.66, 2023: 32.38, 2024: 35.96, 2025: 40.13 };
const bpaReal = { 2016: 0.432, 2017: 0.502, 2018: 0.655, 2019: 0.689, 2020: 0.746, 2021: 0.802, 2022: 0.944, 2023: 1.008, 2024: 1.002, 2025: 1.094, 2026: bpa26 };
const adel = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaReal[+y + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((p, q) => p - q), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaReal[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((p, q) => p - q), c8 = alCierre.slice(-8).map((x) => x[1]);
export const PRECIO = 51.65;
// PER actual en la MISMA base que la historia (precio en una fecha ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan
// 2,3 meses de 2026 y entran 9,7 de 2027.
export const BPA_NTM = r2(2.3 / 12 * bpa26 + 9.7 / 12 * base.b27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / base.b27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(c8.reduce((s, x) => s + x, 0) / c8.length), alCierre },
};
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Fastenal tiene un solo segmento (EE. UU.) y el resto de geografías por debajo del 10 % de ventas y beneficio; todas las líneas de producto comparten canal, logística y clientes [A1].', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-sep-2026 [A3]: deuda 100 (pagarés privados), caja 211,9. Arrendamientos operativos fuera (US GAAP).
    // Sin minoritarios, pensiones de prestación definida ni asociadas.
    puente: { fecha: '2026-09-30', deuda_financiera: 100, arrendamientos: 0, caja: 211.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA GAAP (Fastenal no publica ajustado; la misma base que nuestros casos y que el consenso): precio de cierre de cada año (Yahoo, ajustado por las divisiones de 2019 y 2025) [D1] ÷ BPA real del año siguiente en acciones de hoy [A7, A1]; para el cierre de 2025 (40,13), ÷ nuestro 2026e (${n2(bpa26)}; consenso 1,27). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: no hay años de pérdidas ni de PER ≥ 150x, y ninguno sale de la banda de atípicos (2022, 23,4x, es el mínimo por la caída de la bolsa industrial de ese año, no por un BPA anómalo). PER actual = precio (51,65 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(bpa26)} + 9,7/12 de 2027e ${n2(base.b27)}), la misma base que la historia; con solo 2027e sería ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA real del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 23.2 },
      consenso: { bpa_ano1: 1.27, bpa_ano2: 1.4, objetivo_medio: 51.07, objetivo_min: 39.9, objetivo_max: 60.0, analistas: 13, tendencia_3m: 'estables', fuente: 'Yahoo Finance, 21-oct-2026: BPA de 2026 de 1,27 USD (14 analistas; 1,26 hace 90 días) y de 2027 de 1,40 (1,39 hace 90 días); objetivo medio de 13 analistas [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Distribución industrial especializada y fijaciones: fichas sectoriales cortas (14 y 15-oct-2026)', editor: 'Repositorio de análisis (sectores/)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14.md' },
    { id: 2, titulo: 'Movimiento del precio de FAST (herramientas/movimiento.mjs, Yahoo): 1, 3, 6 y 12 meses, máximos, medias, volatilidad', editor: 'Yahoo Finance (cálculo propio)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/FAST/history' },
    { id: 3, titulo: 'Fastenal Q3: The Math Behind My Sell Rating; Fastenal: I See No Reason To Pay A Higher Premium (titulares)', editor: 'Seeking Alpha', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/FAST' },
  ],
  huecos: [],
};
