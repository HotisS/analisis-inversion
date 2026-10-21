// Parte del analista (Otis Worldwide, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin reestructuración, costes de la separación, litigios fiscales ni partidas
// fiscales no recurrentes; es la base de la guía y del consenso), con la proyección del DCF:
//   (ventas × (margen EBITDA del DCF − amortización 1,15 %) + 45 de otros ingresos y gastos no operativos (pensiones y
//   participadas) − 259 de intereses netos) × (1 − 25 % de impuesto ajustado) − 55 de minoritarios ÷ 382,5 M de acciones diluidas.
// Calibrado con 2026e (ventas +5,3 %, margen 16,7 %): 4,05 USD frente a la guía de 4,01-4,05 y al consenso de 4,04 [A4, D2].
// Acciones: 380,7 M en circulación el 15-jul-2026 [A5] + ≈ 2 M de dilución; las recompras guiadas (≈ 800 M en 2026, ya
// hechas en el 1S) están dentro; no se suponen recompras nuevas en 2027-2028 (prudente: Otis recompra 800-1.000 M al año).
const V25 = 14431, ACC = 382.5;
const bpa = (v, margen) => Math.round((((v * (margen - S.anios[0].amortizacion_pct_ventas) / 100 + 45 - 259) * 0.75 - 55) / ACC) * 100) / 100;
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = (dg) => v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
const caso = (dg, dm) => bpa(v27(dg) * (1 + (S.anios[2].crecimiento_pct + dg) / 100), S.anios[2].margen_ebitda_pct + dm);
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct);
const bpa27 = bpa(v27(0), S.anios[1].margen_ebitda_pct);
export const BPA = { '2026e': bpa26, '2027e': bpa27, Bajista: caso(-1.5, -1.5), Base: caso(0, 0), Alcista: caso(1.0, 0.8) };

// Historia del PER en BPA AJUSTADO publicado [A11, A2]: 2020 2,52; 2021 3,01; 2022 3,17; 2023 3,54; 2024 3,83; 2025 4,05.
// Cierres de año (Yahoo, ajustados por dividendos no; precio de cierre) [D1]. Otis cotiza desde el 3-abr-2020.
const cierres = { 2020: 67.55, 2021: 87.07, 2022: 78.31, 2023: 89.47, 2024: 92.61, 2025: 87.35 };
const bpaAj = { 2020: 2.52, 2021: 3.01, 2022: 3.17, 2023: 3.54, 2024: 3.83, 2025: 4.05, 2026: bpa26 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 72.07;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 2,3 meses de
// 2026 y entran 9,7 de 2027 → BPA de los próximos 12 meses = 2,3/12 × 2026e + 9,7/12 × 2027e.
export const BPA_NTM = r2(2.3 / 12 * bpa26 + 9.7 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / bpa27), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A5]: deuda financiera 8.436 (bonos, papel comercial y préstamos); caja 813. Arrendamientos
    // operativos fuera (US GAAP: su coste ya está en el EBITDA). Minoritarios a valor de mercado: ≈ 45 M de resultado
    // ajustado atribuido × 15 = 675 (en libros 294 con los socios chinos y de Oriente Medio). Pensiones: déficit de 284 ×
    // (1 − 25 %) = 213. otros_ajustes: 98 M de financiación de proveedores a 240 días (deuda encubierta). El litigio fiscal
    // alemán (55 M por cobrar) y el pago a RTX (55 M) se compensan.
    puente: { fecha: '2026-06-30', deuda_financiera: 8436, arrendamientos: 0, caja: 813, minoritarios: 675, pensiones: 213, asociadas: 0, otros_ajustes: 98 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada año (Yahoo [D1]) ÷ BPA ajustado real del año siguiente [A11, A2]; para el cierre de 2025 (87,35), ÷ nuestro 2026e (${n2(bpa26)}, en la guía de 4,01-4,05). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2020-2025 (Otis cotiza desde abril de 2020: no hay más historia). Sin exclusiones: el BPA ajustado no tiene pérdidas. PER actual = precio (72,07 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(bpa26)} + 9,7/12 de 2027e ${n2(bpa27)}), la misma base que la historia. Con solo 2027e sería ${n2(PER.solo_2027)}x y con solo 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2020-2025 (2020 con cotización desde abril).` },
      },
      comparables_per: { mediana: 19.6 },
      consenso: { bpa_ano1: 4.04, bpa_ano2: 4.53, objetivo_medio: 86.54, objetivo_min: 73, objetivo_max: 105, analistas: 15, tendencia_3m: 'recortes', fuente: 'Yahoo Finance, 21-oct-2026: BPA ajustado 2026 de 4,04 USD (14 analistas; 4,20 hace 90 días) y 2027 de 4,53 (15; 4,70 hace 90 días); objetivo medio de 15 analistas [D2]' },
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
    { id: 1, titulo: 'Ascensores y escaleras mecánicas: ficha sectorial corta (perímetro, tamaño, cuotas, comparables)', editor: 'Repositorio de análisis (sectores/ascensores-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/ascensores-2026-10-14.md' },
    { id: 2, titulo: 'KONE: análisis value del 18-oct-2026 (mismo sector; comparables, ROIC y riesgos comunes)', editor: 'Repositorio de análisis (informes/kone-2026-10-18)', tipo: 'Analistas', fecha: '2026-10-18', url: 'informes/kone-2026-10-18/' },
    { id: 3, titulo: 'Tipo de cambio EUR/USD (1,1228 el 21-oct-2026) para el precio en euros', editor: 'Yahoo Finance', tipo: 'Mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/EURUSD=X' },
  ],
  huecos: [],
};
