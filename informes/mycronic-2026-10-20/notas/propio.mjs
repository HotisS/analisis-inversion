// Parte del analista (Mycronic, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA con la proyección del DCF: (ventas × (margen EBITDA − amortización) + resultado financiero de 20 M (caja neta de
// ≈ 2.300 M al 1-2 % menos intereses de arrendamientos; +30 M en 2025, +63 M en 2024)) × (1 − 21 %) ÷ 195,4 M de acciones
// (sin minoritarios desde 2025; sin recompras: la empresa no recompra salvo para cubrir sus planes).
// Calibrado con 2025 real: 7.938 × (28,6 % − 4,16 %) = 1.940 + 30 = 1.970 × (1 − 20,8 %) ÷ 195,3 = 7,99 (publicado 7,99) [A1].
const V25 = 7938, ACC = 195.4, FIN = 20, TAX = 0.21;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (v, mg, am = 4.0) => r2(((v * (mg - am) / 100 + FIN) * (1 - TAX)) / ACC);
const a = S.anios;
const v26 = V25 * (1 + a[0].crecimiento_pct / 100);
const caso = (g27, m27, g28, m28) => {
  const v27 = v26 * (1 + g27 / 100), v28 = v27 * (1 + g28 / 100);
  return { v27, v28, bpa27: bpa(v27, m27, a[1].amortizacion_pct_ventas), bpa28: bpa(v28, m28, a[2].amortizacion_pct_ventas) };
};
const base = caso(a[1].crecimiento_pct, a[1].margen_ebitda_pct, a[2].crecimiento_pct, a[2].margen_ebitda_pct);
const baj = caso(a[1].crecimiento_pct - 12, a[1].margen_ebitda_pct - 6, a[2].crecimiento_pct - 4, a[2].margen_ebitda_pct - 4);
const alc = caso(a[1].crecimiento_pct + 3, a[1].margen_ebitda_pct + 1.5, a[2].crecimiento_pct + 3, a[2].margen_ebitda_pct + 1.5);
export const BPA = { '2026e': bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas), '2027e': base.bpa27, Bajista: baj.bpa28, Base: base.bpa28, Alcista: alc.bpa28 };

// Historia del PER [A1, D1]: cierres de año (Yahoo, ajustados por el desdoblamiento de 2025) y BPA de los informes anuales
// (diez años reexpresados en el informe anual de 2025, págs. 151-152).
const cierres = { 2016: 49.0, 2017: 42.5, 2018: 59.05, 2019: 92.55, 2020: 122.7, 2021: 105.5, 2022: 97.9, 2023: 143.7, 2024: 199.7, 2025: 223.25 };
const bpaReal = { 2016: 2.69, 2017: 3.18, 2018: 4.05, 2019: 4.37, 2020: 3.55, 2021: 4.24, 2022: 3.80, 2023: 5.11, 2024: 8.62, 2025: 7.99, 2026: BPA['2026e'] };
const anosHist = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const adel = anosHist.map((y) => [String(y), r1(cierres[y] / bpaReal[y + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((p, q) => p - q);
const alCierre = anosHist.map((y) => [String(y), r1(cierres[y] / bpaReal[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((p, q) => p - q);
const media = (l) => r1(l.reduce((s, x) => s + x[1], 0) / l.length);
export const PRECIO = 300.2;
// PER actual en la MISMA base que la historia: el 20-oct-2026 quedan 2,4 meses de 2026 y entran 9,6 de 2027.
export const BPA_NTM = r2(2.4 / 12 * BPA['2026e'] + 9.6 / 12 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / BPA['2026e']), solo_2027: r1(PRECIO / BPA['2027e']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: media(adel), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: media(alCierre), alCierre },
};
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'SEK', divisa_cotizacion: 'SEK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: pasivos con interés 421 M (casi todos arrendamientos NIIF 16; el informe no los separa en el
    // semestre: 336 M de arrendamientos a cierre de 2025); caja 2.687 M. Sin minoritarios. otros_ajustes = pagos contingentes y
    // aplazados de compras por su MÁXIMO (Surfx hasta 57,8 M USD × 9,91 = 573 M; Cowin DST 19 M) = 592 M, criterio prudente.
    puente: { fecha: '2026-06-30', deuda_financiera: 421, arrendamientos: 0, caja: 2687, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 592 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA: precio de cierre de cada año (Yahoo, ajustado por el desdoblamiento de 2025 [D1]) ÷ BPA real del año siguiente (informes anuales, diez años reexpresados [A1]); para el cierre de 2025 (223,25 SEK), ÷ nuestro 2026e (${n2(BPA['2026e'])}). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: no hay pérdidas ni BPA atípicos (el salto de 2024, de 5,11 a 8,62 SEK, son pedidos reales de máscaras, no un extraordinario). PER actual = precio (300,20 SEK, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(BPA['2026e'])} + 9,6/12 de 2027e ${n2(BPA['2027e'])}). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 25.1 },
      consenso: { bpa_ano1: 9.90, bpa_ano2: 10.70, objetivo_medio: 318.5, objetivo_min: 230, objetivo_max: 385, analistas: 4, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA 2026e 9,90 y 2027e 10,70 SEK; 2028e 12,93) [D3]; Yahoo Finance (BPA 10,28 y 11,00; objetivo medio de 4 analistas, 230-385 SEK) [D2]; en octubre SEB bajó su objetivo de 385 a 360 y SB1 lo subió de 335 a 350 [D5, D6]' },
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
  fuentes: T.fuentes ?? [],
  huecos: [],
};
