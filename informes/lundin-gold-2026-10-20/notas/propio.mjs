// Parte del analista (Lundin Gold, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA (beneficio atribuido; Lundin Gold no tiene minoritarios ni deuda) con la proyección del DCF:
//   BPA = (ingresos × margen EBITDA − amortización ≈ 137 M + ingresos financieros netos ≈ 15 M) × (1 − 31 %) ÷ 242,8 M acciones
//   diluidas (sin recompras: la NCIB apenas se usa, 28.400 acciones).
// Calibrado con 2025: 1.782,9 × 69,3 % − 101,7 + ≈ 0 → BPA de ≈ 3,3 con el 29,5 % de impuesto efectivo (publicado: 3,27 diluido,
// 3,29 ajustado) [A1]. El impuesto incluye la participación del Estado y de los trabajadores en costes (15 %) y el 22 % [A].
const ACC = 242.8, AMORT = 137, FIN = 15, T_IMP = 0.31;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (ing, margen) => r2(((ing * margen) / 100 - AMORT + FIN) * (1 - T_IMP) / ACC);
const ING26 = 1782.9 * (1 + S.anios[0].crecimiento_pct / 100);
const ing27 = (dg) => ING26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
// 2028e = 2027e en ingresos (crecimiento 0) y margen.
const caso = (dg, dm) => bpa(ing27(dg) * (1 + S.anios[2].crecimiento_pct / 100), S.anios[2].margen_ebitda_pct + dm);
// 2026e: 1S ajustado 1,97 USD (1T 1,13 + 2T 0,84 sin partidas no recurrentes del reparto de LunR) [A] + 3T ≈ 1,26
// (148.326 oz a 4.299 USD) + 4T ≈ 1,20 (≈ 150.000 oz a 4.150) = 4,43.
export const BPA = { '2026e': 4.43, '2027e': bpa(ing27(0), S.anios[1].margen_ebitda_pct), Bajista: caso(-18.3, -5.5), Base: caso(0, 0), Alcista: caso(16.1, 3.0) };
BPA['2028e'] = BPA.Base;

// Historia del PER ADELANTADO en USD: cierre de Toronto en CAD pasado a USD con el tipo del Banco de Canadá de cada 31 de
// diciembre [D1, D10] ÷ BPA ajustado real del año siguiente [A]. Para el cierre de 2025, ÷ nuestro 2026e.
const USDCAD = { 2020: 1.2732, 2021: 1.2678, 2022: 1.3544, 2023: 1.3226, 2024: 1.4389, 2025: 1.3706 };
const cierresCad = { 2020: 10.36, 2021: 9.88, 2022: 12.54, 2023: 15.68, 2024: 29.06, 2025: 108.08 };
const cierres = Object.fromEntries(Object.entries(cierresCad).map(([a, p]) => [a, r2(p / USDCAD[a])]));
const bpaAj = { 2020: null, 2021: 1.07, 2022: 0.53, 2023: 0.86, 2024: 1.76, 2025: 3.29, 2026: BPA['2026e'] };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), uL = adel.map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((a) => bpaAj[a]).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = r2(91.25 / 1.4097);
// PER actual en la misma base que la historia: a 20-oct-2026 quedan ≈ 2,4 meses de 2026 → BPA de los próximos 12 meses =
// 0,2 × 2026e + 0,8 × 2027e.
export const BPA_NTM = r2(0.2 * BPA['2026e'] + 0.8 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / BPA['2026e']), solo_2027: r1(PRECIO / BPA['2027e']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(uL.reduce((s, x) => s + x, 0) / uL.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
const FX = 1.4097;

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'USD', divisa_cotizacion: 'CAD', tipo_cambio: 0.70937, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo activo en producción (Fruta del Norte). La exploración del distrito (FDNS, FDN East, Bonza Sur, siete pórfidos de cobre y oro) tiene valor de opción que la proyección recoge solo en parte (producción plana hasta 2028 y caída suave después); sin recursos publicados de los pórfidos no se puede valorar aparte [A, B].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A1]: caja 507,1; sin deuda financiera. Arrendamientos ≈ 0 relevantes. otros_ajustes = dividendo del
    // 2T ya pagado el 25-sep (1,08 × 241,8 = 261,2) + impuestos sobre la renta a pagar (178,5, que salen en el 1S siguiente) +
    // 50 % de la reclamación del SRI por el ajuste soberano de 2023 (77 de 154; recurrida y sin provisión) = 516,7.
    // El pasivo del stream de plata (690,3 a valor razonable) no se resta: la plata ya está fuera de los ingresos proyectados.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 507.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 516.7 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en USD: cierre de Toronto de cada año en CAD pasado a USD con el tipo del Banco de Canadá del 31 de diciembre [D1, D10] ÷ BPA ajustado real del año siguiente [A]; para el cierre de 2025 (${n2(cierres[2025])} USD), ÷ nuestro 2026e (${n2(BPA['2026e'])}). Serie: ${fmt(adel)}. Excluidos 2018 (pérdida en 2019, mina en construcción) y 2019 (2020 con el arranque de la mina y el cierre por la COVID): sin beneficio normal. Mediana y mínimo de 2021-2025; media de 2020-2025. Los PER de 2023-2024 (6-7x) son de valle de valoración (el mercado no se creía el oro de 2.000-2.600 USD) y el de 2025 (17,8x) de pico de precio del oro: se dejan los dos porque la serie es corta. PER actual = precio (91,25 CAD = ${n2(PRECIO)} USD, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,2 × 2026e ${n2(BPA['2026e'])} + 0,8 × 2027e ${n2(BPA['2027e'])}, con el oro a 4.150 USD). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre en USD ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025.` },
      },
      comparables_per: { mediana: 9.8 },
      consenso: { bpa_ano1: r2(6.076 / FX), bpa_ano2: r2(6.064 / FX), objetivo_medio: r2(95.45 / FX), objetivo_min: r2(82 / FX), objetivo_max: r2(104 / FX), analistas: 13, tendencia_3m: 'recortes', fuente: 'MarketScreener, 19-oct-2026: BPA 2026e 6,08 CAD y 2027e 6,06 CAD (pasados a USD al 1,4097); objetivo medio de 13 analistas 95,45 CAD (82-104) [D3]; Yahoo: BPA 2027e de 6,37 CAD hace 90 días a 5,84 hoy [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Gold Spot, futuros GC=F y cotización USD/CAD (cierre del 19-oct-2026: oro ≈ 4.160 USD/oz)', editor: 'Yahoo Finance (herramientas del repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/GC%3DF/' },
  ],
  huecos: [],
};
