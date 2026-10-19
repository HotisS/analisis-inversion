// Parte del analista (KION GROUP AG, KGX.DE, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 34.09; // cierre de KGX.DE del 16-oct-2026 (la sesión del 19-oct no había cerrado) [D1]

// PER adelantado: cierre de diciembre ÷ BPA real del año siguiente [D1, A1-A5]; para 2025, nuestro BPA de 2026e.
const cierres = { 2020: 71.16, 2021: 96.48, 2022: 26.77, 2023: 38.67, 2024: 31.86, 2025: 68.25 };
const bpaReal = { 2020: null, 2021: 4.34, 2022: 0.75, 2023: 2.33, 2024: 2.75, 2025: 1.75, 2026: bpa26 };
const per = (a) => cierres[a] / bpaReal[a + 1];
const perCierre = (a) => cierres[a] / bpaReal[a];
const med = (v) => { const s = [...v].sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
// 5 años (cierres 2021-2025) sin 2021 (128,6x: el BPA de 2022 se hundió a 0,75 por la crisis de costes; atípico, más de 3 veces la mediana).
const adel5 = [2022, 2023, 2024, 2025].map(per);
const adelLarga = [2020, 2022, 2023, 2024, 2025].map(per);
// v2 (al cierre): sin 2022 (BPA de 0,75) ni 2025 (BPA de 1,75 con 201 M de no recurrentes).
const cierre5 = [2021, 2023, 2024].map(perCierre);
export const PERH = { adel5, adelLarga, cierre5, bpa26, bpa27, actual: PRECIO / bpa27 };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE (informes anuales 2021-2025 e informe semestral 1S26 de KION; Excel «All tables» oficiales)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
    // Balance de 30-jun-2026 [A6]. Deuda financiera 1.635,1 (bonos 2029 y 2031, pagarés, préstamos). Arrendamientos 2.821,3 = 775,1 de compra (NIIF 16)
    // + 774,6 de la flota de alquiler a corto + 1.271,6 del negocio de arrendamiento (pasivos 4.540,2 − derechos de cobro 3.268,6) [A6, A10].
    // Pensiones: 481,7 netas × (1 − 30 %) = 337,2. Asociadas: participaciones por el método de la participación, 143,1.
    puente: { fecha: '2026-06-30', deuda_financiera: 1635.1, arrendamientos: 2821.3, caja: 391.0, minoritarios: 30.3, pensiones: 337.2, asociadas: 143.1, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran), la principal para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel5)), minimo_5a: r2(Math.min(...adel5)), media_larga: r2(avg(adelLarga)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre5)), minimo_5a: r2(Math.min(...cierre5)), media_larga: r2(avg(cierre5)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 12.75 },
      consenso: { bpa_ano1: 3.616, bpa_ano2: 4.27, objetivo_medio: 51.4, objetivo_min: 37, objetivo_max: 63, analistas: 15, tendencia_3m: 'recortes', fuente: 'MarketScreener: BPA de 2027e y 2028e y objetivos de 15 analistas (51,40 EUR de media, 37-63) [D2, D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
