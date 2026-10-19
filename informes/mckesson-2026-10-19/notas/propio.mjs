// Parte del analista (McKesson, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles comprados, LIFO, opioides, litigios,
// reestructuración, costes de separación ni plusvalías) de cada escenario con la proyección del DCF:
//   EBITDA ajustado = ventas × (margen del DCF + 0,05 puntos que el DCF resta por los costes recurrentes excluidos)
//   − depreciación (0,11 % de las ventas: 453 M en FY2026) + otros ingresos (≈ 250 M) − intereses netos
//   × (1 − 18,5 % de impuesto ajustado, centro de la guía del 17-19 %) − minoritarios, ÷ acciones diluidas.
// Calibrado con FY2026 real (ventas 403.430, margen 1,656 %, intereses 230, minoritarios 242, 124,1 M → 39,05 frente a
// 39,11 publicado) y con la guía de FY2027 (ingresos +7 %, intereses 400, minoritarios 310, 117 M → 44,72; guía 44,20-45,00).
// Acciones: 116,6 M en circulación el 31-jul-2026 menos ≈ 2,5 M de las recompras ya guiadas para FY2027 (≈ 2.470 M que
// faltan de los 5.000 M) más ≈ 0,8 M de dilución → 115 M en FY2028e-FY2029e, SIN recompras no anunciadas.
const VENTAS_FY26 = 403430, ACC = 115.0;
const bpa = (v, margenDcf, interes, minor, acc) => Math.round(((v * (margenDcf + 0.05 - 0.11) / 100 + 250 - interes) * 0.815 - minor) / acc * 100) / 100;
const caso = (dg, dm) => {
  const v27 = VENTAS_FY26 * (1 + (S.anios[0].crecimiento_pct) / 100);
  const v28 = v27 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v29 = v28 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return {
    FY2028: bpa(v28, S.anios[1].margen_ebitda_pct + dm, 430, 330, ACC),
    FY2029: bpa(v29, S.anios[2].margen_ebitda_pct + dm, 450, 350, ACC),
  };
};
const bpa27 = bpa(VENTAS_FY26 * (1 + S.anios[0].crecimiento_pct / 100), S.anios[0].margen_ebitda_pct, 400, 310, 117.0);
const cB = caso(-2.0, -0.12), cM = caso(0, 0), cA = caso(1.0, 0.06);
export const BPA = { FY2027: bpa27, FY2028: cM.FY2028, Bajista: cB.FY2029, Base: cM.FY2029, Alcista: cA.FY2029, FY2028_bajista: cB.FY2028, FY2028_alcista: cA.FY2028 };

// Historia del PER en la base del BPA AJUSTADO publicado [A12, A11, A10, A9, A8, A7, A6, A5, A2]. Cierres a 31 de marzo [D1].
const cierres = { FY2018: 140.87, FY2019: 117.06, FY2020: 135.26, FY2021: 195.04, FY2022: 306.13, FY2023: 356.05, FY2024: 536.85, FY2025: 672.99, FY2026: 865.36 };
const bpaAj = { FY2018: 12.62, FY2019: 13.57, FY2020: 14.95, FY2021: 17.21, FY2022: 23.69, FY2023: 25.94, FY2024: 27.44, FY2025: 33.05, FY2026: 39.11, FY2027: BPA.FY2027 };
const r1 = (x) => Math.round(x * 10) / 10;
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 1004.84;
export const PER = {
  actual: r1(PRECIO / BPA.FY2028), mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica como método de valoración: la distribución de North American Pharmaceutical da el 49 % del resultado de segmento y los cuatro negocios comparten clientes y logística. Medical-Surgical (≈ 15 % del resultado de segmento), que se separará como Wellverse, se valoró en junio de 2026 en ≈ 13.000 M USD de valor empresa con la entrada de Apollo (≈ 12,6 veces su resultado de segmento de FY2026), en línea con lo que el DCF le atribuye por su peso; la separación no cambia el valor para el accionista, que recibirá las acciones [A4, A18].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A4]: deuda 9.729 (1.297 a corto + 8.432 a largo); caja 5.164. Minoritarios: participaciones no
    // dominantes 376 + rescatables 2.563 (socios médicos de Core Ventures y PRISM con opción de venta, y preferentes
    // convertibles de Apollo en Medical-Surgical) = 2.939. otros_ajustes = opioides 5.658 × (1 − 21 %) ≈ 4.470 (deducibles,
    // sin descontar). Arrendamientos operativos fuera (US GAAP). Precision Medicine (2.250) y Option Care (1.400), pendientes,
    // se tratan como neutras: el precio pagado equivale a lo que aportan y no están en la proyección.
    puente: { fecha: '2026-06-30', deuda_financiera: 9729, arrendamientos: 0, caja: 5164, minoritarios: 2939, pensiones: 0, asociadas: 0, otros_ajustes: 4470 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada ejercicio (31 de marzo, Yahoo [D1]) ÷ BPA ajustado real del ejercicio siguiente [A12, A11, A10, A9, A8, A7, A6, A5, A2]; para el cierre de FY2026 (865,36), ÷ nuestro FY2027e (${n2(bpa27)}, en la guía de 44,20-45,00). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de FY2019-FY2026. Sin exclusiones: el BPA ajustado no tiene pérdidas (el cargo de opioides de 8.100 M de FY2021 está fuera del ajustado). El BPA GAAP no sirve para la historia: lo deforman opioides, ventas de Europa y Rexall y plusvalías (−28,26 USD en FY2021; 25,72 frente a 33,05 ajustado en FY2025). PER actual = precio (1.004,84 USD, cierre del 16-oct-2026) ÷ nuestro BPA ajustado de FY2028e (${n2(BPA.FY2028)}).`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026.` },
      },
      comparables_per: { mediana: 15.6 },
      consenso: { bpa_ano1: 44.66, bpa_ano2: 50.63, objetivo_medio: 1001.43, objetivo_min: 845, objetivo_max: 1200, analistas: 14, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 16-oct-2026: BPA ajustado FY2027 de 44,66 USD (16 analistas; 44,27 hace 90 días) y FY2028 de 50,63 (50,34 hace 90 días); objetivo medio de 14 analistas [D2]' },
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
    { id: 1, titulo: 'Distribución farmacéutica: ficha sectorial corta (perímetro, cuotas, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/distribucion-farmaceutica-2026-10-15.md' },
    { id: 2, titulo: 'Cencora: análisis value del 15-oct-2026 (mismo sector; referencia de comparables y de riesgos comunes)', editor: 'Repositorio de análisis (informes/cencora-2026-10-15)', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/cencora-2026-10-15/' },
  ],
  huecos: [],
};
