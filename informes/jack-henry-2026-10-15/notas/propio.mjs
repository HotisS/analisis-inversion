// Parte del analista (Jack Henry, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA del FY2028e de cada escenario con la proyección del DCF: ventas × (margen EBITDA − amortización) + resultado
// financiero (≈ 0 con la caja gastada en recompras) − impuestos del 23 %, entre 70,4 M de acciones diluidas (70,11 M en
// circulación el 12-ago-2026 + ≈ 0,3 M de dilución; sin recompras no anunciadas).
const ACC = 70.4, VENTAS_FY26 = 2544.3;
const bpa28 = (dg, dm) => {
  let v = VENTAS_FY26;
  for (let i = 0; i < 2; i++) v *= 1 + (S.anios[i].crecimiento_pct + dg) / 100;
  const ebit = v * (S.anios[1].margen_ebitda_pct + dm - S.anios[1].amortizacion_pct_ventas) / 100;
  return Math.round(ebit * (1 - 0.23) / ACC * 100) / 100;
};
const bpa27 = (() => { const v = VENTAS_FY26 * (1 + S.anios[0].crecimiento_pct / 100); return Math.round((v * (S.anios[0].margen_ebitda_pct - S.anios[0].amortizacion_pct_ventas) / 100 + 5) * 0.77 / ACC * 100) / 100; })();
export const BPA = { FY2027: bpa27, Bajista: bpa28(-2.5, -2.0), Base: bpa28(0, 0), Alcista: bpa28(1.5, 1.5) };

// Historia del PER adelantada: cierre del ejercicio ÷ BPA real del ejercicio siguiente (FY2026: ÷ nuestro BPA FY2027e).
const cierres = { FY2018: 130.36, FY2019: 133.92, FY2020: 184.03, FY2021: 163.51, FY2022: 180.02, FY2023: 167.33, FY2024: 166.02, FY2025: 180.17, FY2026: 137.74 };
const bpaReal = { FY2019: 3.52, FY2020: 3.86, FY2021: 4.12, FY2022: 4.94, FY2023: 5.02, FY2024: 5.23, FY2025: 6.24, FY2026: 6.98, FY2027: bpa27 };
const r1 = (x) => Math.round(x * 10) / 10;
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal['FY' + (+a.slice(2) + 1)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PER = {
  actual: r1(155.26 / bpa27), mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los cuatro segmentos venden a los mismos clientes (bancos y cooperativas de EE. UU.), comparten centros de datos y equipo comercial, y la empresa no publica el resultado operativo por segmento (solo el margen bruto).', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 40, arrendamientos: 0, caja: 12.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA: precio de cierre de cada ejercicio (30 de junio, Yahoo [D1]) ÷ BPA GAAP diluido real del ejercicio siguiente [A9]; para el cierre del FY2026 (137,74), nuestro BPA FY2027e (${String(bpa27).replace('.', ',')}). Serie: ${fmt(adel)}. Mediana y mínimo de los cinco últimos (FY2022-FY2026), media de ocho (FY2019-FY2026). Excluido el cierre del FY2017 (÷ BPA FY2018 de 4,70, inflado por la reforma fiscal de 2017: impuesto negativo de −8,9 M). Sin años de pérdidas ni PER ≥ 150x; FY2020 (44,7x, pandemia) no es atípico con la regla (menos de 3 veces la mediana). El BPA es GAAP con desconversiones en todos los años, la misma base que nuestros casos.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026.` },
      },
      comparables_per: { mediana: 13.1 },
      consenso: { bpa_ano1: 7.25, bpa_ano2: 7.90, objetivo_medio: 189.67, objetivo_min: 158, objetivo_max: 209, analistas: 18, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, estimaciones del 15-oct-2026 (BPA FY2027 7,10 hace 90 días; FY2028 7,68) [D2]' },
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
    { id: 1, titulo: 'Riverwater Partners: carta a inversores del 1T 2026 (origen de la idea)', editor: 'Riverwater Partners', tipo: 'Analistas', fecha: '2026-04', url: 'https://riverwaterpartners.com/insights/' },
    { id: 2, titulo: 'Software de aplicaciones: ficha sectorial corta (mapa del riesgo de IA)', editor: 'Repositorio de análisis (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
  ],
  huecos: [],
};
