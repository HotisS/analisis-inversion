// Parte del analista (Gamma Communications, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles de compras, extraordinarios ni efectos contables de
// las compras), con la proyección del DCF:
//   EBITDA ajustado = ventas × (margen del DCF + 0,4 puntos que el DCF resta por extraordinarios recurrentes)
//   − amortización propia (la del DCF) − intereses netos (2 M: deuda neta casi nula, arrendamientos y línea de crédito)
//   × (1 − 25,5 % de impuesto) ÷ acciones diluidas.
// Calibrado con 2025 real (645,8 M, 21,9 %, 3,3 % de amortización propia, 93,69 M de acciones → 0,95 frente a 0,945 publicado)
// y con 2026 (guía 90,0-96,6 p; 1S 47,7 p). Acciones: 89,29 M con voto el 30-sep-2026 + ≈ 1,3 M de opciones → 90,6 M
// (base diluida de la oferta), SIN recompras (suspendidas por la oferta).
const VENTAS_25 = 645.8, ACC = 90.6, INT = 2.0, TAX = 0.255;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;
const bpa = (v, margenDcf, amPct, acc) => r3(((v * (margenDcf + 0.4 - amPct) / 100 - INT) * (1 - TAX)) / acc);
const [a26, a27, a28] = S.anios;
const v26 = VENTAS_25 * (1 + a26.crecimiento_pct / 100);
const v27 = (dg) => v26 * (1 + (a27.crecimiento_pct + dg) / 100);
const caso = (dg, dm) => bpa(v27(dg) * (1 + (a28.crecimiento_pct + dg) / 100), a28.margen_ebitda_pct + dm, a28.amortizacion_pct_ventas, ACC);
export const BPA = {
  '2026': bpa(v26, a26.margen_ebitda_pct, a26.amortizacion_pct_ventas, 91.0),
  '2027': bpa(v27(0), a27.margen_ebitda_pct, a27.amortizacion_pct_ventas, ACC),
  Bajista: caso(-2.0, -1.5), Base: caso(0, 0), Alcista: caso(1.0, 0.5),
};
BPA['2028'] = BPA.Base;

// Historia del PER ADELANTADO en BPA ajustado diluido publicado [A4, A2]: cierre de cada año (Yahoo [D1], GBp/100) ÷ BPA
// ajustado del año siguiente. La definición del ajustado es la misma desde 2018 (amortización de compras y extraordinarios fuera).
const cierres = { 2017: 6.45, 2018: 7.30, 2019: 13.30, 2020: 16.45, 2021: 16.50, 2022: 10.82, 2023: 11.26, 2024: 15.30, 2025: 9.24 };
const bpaAj = { 2018: 0.303, 2019: 0.408, 2020: 0.513, 2021: 0.640, 2022: 0.718, 2023: 0.751, 2024: 0.851, 2025: 0.945, 2026: BPA['2026'] };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((a) => bpaAj[a]).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 10.88;
// PER actual en la misma base que la historia: a 21-oct-2026 quedan 2,3 meses de 2026 y entran 9,7 de 2027.
export const BPA_NTM = r3(2.3 / 12 * BPA['2026'] + 9.7 / 12 * BPA['2027']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
  sin_oferta: r1(7.32 / BPA['2026']),
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1] && process.argv[1].endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER }, null, 1));

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'GBP', divisa_cotizacion: 'GBp', tipo_cambio: 0.01, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en el Reino Unido', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes ?? null, confianza: 'Baja' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: préstamos 25,6; arrendamientos 16,4; caja 21,8; minoritarios 0,3. otros_ajustes = pasivos de
    // compras 18,0 (aplazados y contingentes) + 7,0 de recompras pagadas tras junio (acciones ya fuera del recuento).
    puente: { fecha: '2026-06-30', deuda_financiera: 25.6, arrendamientos: 16.4, caja: 21.8, minoritarios: 0.3, pensiones: 0, asociadas: 0, otros_ajustes: 25.0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, octubre de 2026)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO diluido de la empresa (misma base que los casos y el consenso): cierre de cada año (Yahoo [D1]) ÷ BPA ajustado real del año siguiente [A4, A2]; para el cierre de 2025 (9,24 GBP), ÷ nuestro 2026e (${n2(BPA['2026'])}, dentro del rango de 0,900-0,966 de la empresa). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones. PER actual = precio (10,88 GBP, cierre del 21-oct-2026) ÷ BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e + 9,7/12 de 2027e ${n2(BPA['2027'])}). OJO: el precio lo fija la oferta en efectivo de 1.120 p; sin oferta (732 p el 7-abr-2026) el PER sería de ${n2(PER.sin_oferta)} veces el BPA de 2026e [D3].`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025; media de 2018-2025.` },
      },
      comparables_per: { mediana: 15.2 },
      consenso: { bpa_ano1: 0.929, bpa_ano2: 1.003, objetivo_medio: 13.93, objetivo_min: 10.8, objetivo_max: 15.7, analistas: 6, tendencia_3m: 'estable', fuente: 'Yahoo Finance, 21-oct-2026: BPA ajustado de 2026 de 92,9 p (5 analistas) y de 2027 de 100,3 p (7); objetivos (1.393 p de media, 1.080-1.570) anteriores a la oferta en su mayoría [D2]' },
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
    { id: 1, titulo: 'Kainos Group: análisis value del 21-oct-2026 (misma fecha; fuente del gilt a 10 años del Bank of England y convenciones de GBp)', editor: 'Repositorio de análisis (informes/kainos-2026-10-21)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/kainos-2026-10-21/' },
  ],
  huecos: [],
};
