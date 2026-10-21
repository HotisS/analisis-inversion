// Parte del analista (Yutong Bus, 600066.SS, corte 2026-10-21). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {}; let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 27.9; // cierre de 600066.SS del 21-oct-2026 (Sina 15:34:59 de Pekín = 07:34:59 UTC; Yahoo igual) [D2]

// Historia del PER: cierre de diciembre sin ajustar [D12] ÷ BPA básico del año siguiente (adelantado) o del propio año (v2) [A1-A5, A10].
// El número de acciones apenas ha cambiado (2.210-2.219 M desde 2016), así que no hace falta llevarlo a una base común.
// Para 2025 el adelantado usa nuestro BPA de 2026e.
const cierres = { 2017: 24.07, 2018: 11.85, 2019: 14.25, 2020: 16.92, 2021: 11.02, 2022: 7.51, 2023: 13.25, 2024: 26.38, 2025: 32.7 };
const bpaReal = { 2017: 1.41, 2018: 1.01, 2019: 0.85, 2020: 0.21, 2021: 0.28, 2022: 0.34, 2023: 0.82, 2024: 1.86, 2025: 2.51, 2026: bpa26 };
// Excluidos del adelantado: 2019 (67,9x) y 2020 (60,4x), con el BPA de 2020-2021 hundido por la COVID, y 2021 (32,4x), atípico (más de
// tres veces la mediana del resto, 9,8x). En el v2 (al cierre) sale 2020 de la media larga (80,6x, más de tres veces la mediana del resto, 16,2x).
const anos5 = [2022, 2023, 2024, 2025];
const anos8 = [2018, 2022, 2023, 2024, 2025];
const anos5v2 = [2021, 2022, 2023, 2024, 2025];
const anos8v2 = [2018, 2019, 2021, 2022, 2023, 2024, 2025];
const adel = (as) => as.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = (as) => as.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel5: adel(anos5), adel8: adel(anos8), cierre5: cierre(anos5v2), cierre8: cierre(anos8v2), PRECIO, bpa26, bpa27, B };

const fuentesP = [
  { id: 1, titulo: 'Cálculo propio de la historia del PER (cierres de diciembre sin ajustar de Eastmoney y BPA básico de los informes anuales)', editor: 'Análisis propio', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://quote.eastmoney.com/sh600066.html' },
];

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas chinas (CAS); informes anuales 2021-2025, semestral y 3T de 2026 de CNINFO/SSE', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance CAS de 30-sep-2026 [A7, D11]. Deuda = préstamos a corto (128). Arrendamientos = 164 + 49 corrientes.
    // Caja = efectivo (7.653) + activos financieros de negociación (5.174, productos de tesorería) + depósitos a plazo de más de un año en
    // otros activos no corrientes (97 % de 1.106) + activos no corrientes que vencen en un año (398) + inversiones de deuda (119) = 14.417.
    // Asociadas: inversiones a largo en participadas (808) + otras inversiones en patrimonio (939) + otros activos financieros no corrientes (1.358)
    // a valor contable. Minoritarios a valor contable (272). Las provisiones de garantía (5.543) y las garantías de recompra (6.234, fuera de
    // balance) son operativas: van en el circulante y en los riesgos, no en el puente.
    puente: { fecha: '2026-09-30', deuda_financiera: 128, arrendamientos: 213, caja: 14417, minoritarios: 272, pensiones: 0, asociadas: 3105, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        anios: anos5.length,
        mediana_5a: r2(med(adel(anos5))), minimo_5a: r2(Math.min(...adel(anos5))), media_larga: r2(avg(adel(anos8))),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre(anos5v2))), minimo_5a: r2(Math.min(...cierre(anos5v2))), media_larga: r2(avg(cierre(anos8v2))), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 8.8 },
      consenso: { bpa_ano1: 3.08, bpa_ano2: 3.44, objetivo_medio: 38.1, objetivo_min: null, objetivo_max: null, analistas: 8, tendencia_3m: 'estable', fuente: 'Media de Guosen, Hualong, Southwest y Soochow tras el 3T26 (BPA 2027e y 2028e, 16-20 oct-2026) [D4-D6, D13, D14]; objetivo medio de 8 analistas en Yahoo [D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(R ? { resumen: R } : T.resumen ? { resumen: T.resumen } : {}),
  fuentes: [...fuentesP, ...(T.fuentes ?? [])],
};
