// Parte del analista (China Resources Sanjiu, 000999.SZ, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {}; let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 25.81; // cierre de 000999.SZ del 20-oct-2026 (Sina 15:35:45 de Pekín; Yahoo igual) [D2]

// Historia del PER: cierre de diciembre ajustado por las ampliaciones liberadas [D1] ÷ BPA real del año siguiente (adelantado) o del propio año (v2),
// en la base de acciones de hoy [A1-A5, A11]; para 2025 el adelantado usa nuestro BPA de 2026e.
const cierres = { 2018: 14.71, 2019: 18.75, 2020: 14.76, 2021: 20.26, 2022: 27.7, 2023: 29.43, 2024: 34.11, 2025: 28.46 };
const bpaReal = { 2018: 1.46 / 1.69, 2019: 2.14 / 1.69, 2020: 1.63 / 1.69, 2021: 2.1 / 1.69, 2022: 2.48 / 1.69, 2023: 2.23 / 1.3, 2024: 2.02, 2025: 2.06, 2026: bpa26 };
const anos5 = [2021, 2022, 2023, 2024, 2025];
const anos8 = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const adel = (as) => as.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = (as) => as.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel5: adel(anos5), adel8: adel(anos8), cierre5: cierre(anos5), cierre8: cierre(anos8), PRECIO, bpa26, bpa27, B };

const fuentesP = [
  { id: 1, titulo: 'Cálculo propio de la historia del PER (cierres ajustados de Yahoo y BPA de los informes anuales en la base de 1.664 M de acciones)', editor: 'Análisis propio', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/000999.SZ/history' },
];

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas chinas (CAS); informes anuales 2021-2025 y semestral de 2026 de CNINFO/SZSE', formato_cuenta: 'funcion',
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
    // Balance CAS de 30-jun-2026 [A6]. Deuda = préstamos a corto (1.233,40) + largo (2.848,42) + parte corriente del largo (207,89).
    // Arrendamientos = 106,79 + 108,69 corrientes. Caja = efectivo (3.202,98) + productos de tesorería (4.033,42).
    // Minoritarios a valor de mercado: 72 % de Tasly (21.080 M de capitalización el 20-oct) + 71,95 % de KPC (6.555 M) [D3, A1] + ≈ 550 M de
    // otros a valor contable = 20.444 M (el valor contable total es 16.303 M).
    // Asociadas: inversiones en asociadas (1.469,60) + otras inversiones financieras a largo (623,70 + 8,70) a valor contable.
    // otros_ajustes: +690,65 = dividendo a cuenta del 1S26 pagado el 16-oct-2026, después del balance [A12].
    puente: { fecha: '2026-06-30', deuda_financiera: 4289.71, arrendamientos: 215.48, caja: 7236.40, minoritarios: 20444, pensiones: 0, asociadas: 2102.0, otros_ajustes: 690.65 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel(anos5))), minimo_5a: r2(Math.min(...adel(anos5))), media_larga: r2(avg(adel(anos8))),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre(anos5))), minimo_5a: r2(Math.min(...cierre(anos5))), media_larga: r2(avg(cierre(anos8))), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 16.0 },
      consenso: { bpa_ano1: 2.31, bpa_ano2: 2.58, objetivo_medio: 35.15, objetivo_min: null, objetivo_max: 37.2, analistas: 10, tendencia_3m: 'recortes', fuente: 'Sinolink (BPA 2027e y 2028e, 24-ago-2026) [D6]; objetivo medio de 10 analistas en Yahoo [D3]; máximo de Orient [D11]' },
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
