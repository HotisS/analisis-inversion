// Parte del analista (Cencora, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles comprados, LIFO, litigios, integración ni
// reestructuración) del FY2027e y FY2028e de cada escenario con la proyección del DCF:
//   EBITDA ajustado = ventas × (margen del DCF + 0,07 puntos que el DCF resta por la reestructuración recurrente)
//   − depreciación (0,17 % de las ventas) − intereses netos (480 M en FY2027, 470 M en FY2028) + otros ingresos (≈ 20 M)
//   × (1 − 19,5 % de impuesto ajustado) − 15 M de minoritarios, ÷ 192 M de acciones diluidas (190,83 M en circulación a
//   30-jun-2026 + ≈ 1,2 M de dilución; sin recompras no anunciadas).
// Calibrado con la guía de FY2026: ventas +5 % y margen 1,52 % → 17,85 USD (punto medio de 17,75-17,95).
const VENTAS_FY26 = 321332.8 * 1.05, ACC = 192.0;
const bpa = (v, margenDcf, interes, acc) => Math.round(((v * (margenDcf + 0.07 - 0.17) / 100 - interes + 20) * 0.805 - 15) / acc * 100) / 100;
const caso = (dg, dm) => {
  const v27 = VENTAS_FY26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return { FY2027: bpa(v27, S.anios[1].margen_ebitda_pct + dm, 480, ACC), FY2028: bpa(v28, S.anios[2].margen_ebitda_pct + dm, 470, ACC) };
};
const bpa26 = bpa(VENTAS_FY26, S.anios[0].margen_ebitda_pct, 490, 194.0);
const cB = caso(-2.0, -0.12), cM = caso(0, 0), cA = caso(1.0, 0.06);
export const BPA = { FY2026: bpa26, FY2027: cM.FY2027, Bajista: cB.FY2028, Base: cM.FY2028, Alcista: cA.FY2028 };

// Historia del PER en la base del BPA AJUSTADO publicado [A13, A12, A11, A10, A9, A8, A2].
const cierres = { FY2018: 92.22, FY2019: 82.33, FY2020: 96.92, FY2021: 119.45, FY2022: 135.33, FY2023: 179.97, FY2024: 225.08, FY2025: 312.53, FY2026: 300.25 };
const bpaAj = { FY2018: 6.49, FY2019: 7.09, FY2020: 7.90, FY2021: 9.26, FY2022: 11.03, FY2023: 11.99, FY2024: 13.76, FY2025: 16.00, FY2026: bpa26, FY2027: BPA.FY2027 };
const r1 = (x) => Math.round(x * 10) / 10;
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const PRECIO = 336.17;
export const PER = {
  actual: r1(PRECIO / BPA.FY2027), mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la distribución de EE. UU. da el 85 % del resultado operativo ajustado; MWI, el mayor negocio distinto, está en venta (valor empresa de 3.500 M USD, ≈ 5 % del valor de la empresa) y el resto de «Otros» pesa poco [A3, A17].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A7]: deuda 11.723 (bonos, préstamos, notas de médicos de OneOncology y deuda sin recurso); caja
    // 2.815 + 31 de MWI clasificada para la venta. otros_ajustes = opioides 4.200 × (1 − 21 %) = 3.318 (deducibles, sin
    // descontar) + pagos contingentes y unidades de capital de RCA y OneOncology ≈ 2.012 (694 + 752 al cierre de cada
    // compra + 153 de revalorización en 9M FY2026 + 413 de objetivos de RCA). Arrendamientos operativos fuera (US GAAP).
    puente: { fecha: '2026-06-30', deuda_financiera: 11723.2, arrendamientos: 0, caja: 2846.5, minoritarios: 188.1, pensiones: 0, asociadas: 0, otros_ajustes: 5330 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada ejercicio (30 de septiembre, Yahoo [D1]) ÷ BPA ajustado real del ejercicio siguiente [A13, A12, A11, A10, A9, A8, A2]; para el cierre de FY2025, ÷ nuestro FY2026e (${n2(bpa26)}, punto medio de la guía) y para el de FY2026 (300,25), ÷ nuestro FY2027e (${n2(BPA.FY2027)}). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de FY2019-FY2026. Sin exclusiones: el BPA ajustado no tiene pérdidas ni años atípicos (el cargo de opioides de FY2020 está fuera del ajustado). El BPA GAAP no sirve para la historia: lo deforman deterioros, opioides y plusvalías (7,96 USD frente a 16,00 en FY2025).`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026.` },
      },
      comparables_per: { mediana: 15.3 },
      consenso: { bpa_ano1: 19.80, bpa_ano2: null, objetivo_medio: 370.17, objetivo_min: 330, objetivo_max: 430, analistas: 12, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 15-oct-2026: BPA ajustado FY2027 de 19,80 USD (10 analistas; 19,81 hace 90 días); FY2026 17,88; sin consenso gratuito de FY2028 [D2, D3]' },
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
    { id: 1, titulo: 'Escáner «calidad a precio» del repositorio: origen de la idea (PER adelantado ≈ 17x; ROIC − WACC ≈ +26; margen estable)', editor: 'Repositorio de análisis (escaneos/)', tipo: 'Analistas', fecha: '2026-10-15', url: 'escaneos/' },
    { id: 2, titulo: 'Distribución farmacéutica: ficha sectorial corta', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/distribucion-farmaceutica-2026-10-15.md' },
  ],
  huecos: [],
};
