// Parte del analista (China Resources Sanjiu, 000999.SZ, corte 2026-10-26, tras el 3T26). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {}; let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 25.05; // cierre de 000999.SZ del 26-oct-2026 (Sina 15:35:30 de Pekín; Yahoo igual) [D2]

// Historia del PER en la MISMA base que nuestro BPA de escenarios: BPA recurrente (扣非: beneficio atribuido sin partidas no recurrentes)
// ÷ 1.664,22 M de acciones de hoy (las ampliaciones de 2024-2025 son liberadas). Nuestra fórmula de BPA (EBITDA − amortización − financiero
// recurrente − impuestos − minoritarios) aplicada a 2025 da 1,88 CNY, igual que el 扣非 por acción de 2025 (1,88) y no el publicado (2,06),
// que lleva 262 M de valor razonable y un impuesto del 14,4 % [A1, A10]. Cierres de diciembre ajustados [D1] ÷ BPA recurrente del año siguiente
// (adelantado) o del propio año (v2); para 2025 el adelantado usa nuestro BPA de 2026e.
const cierres = { 2018: 14.71, 2019: 18.75, 2020: 14.76, 2021: 20.26, 2022: 27.7, 2023: 29.43, 2024: 34.11, 2025: 28.46 };
const KF = { 2018: 1254.07, 2019: 1202.51, 2020: 1334.88, 2021: 1852.92, 2022: 2218.92, 2023: 2710.98, 2024: 3117.87, 2025: 3134.20 }; // 扣非, M CNY [A10]
const bpaReal = Object.fromEntries(Object.entries(KF).map(([a, v]) => [a, v / 1664.22]));
bpaReal[2026] = bpa26;
const anos5 = [2021, 2022, 2023, 2024, 2025];
const anos8 = [2018, 2020, 2021, 2022, 2023, 2024, 2025]; // sin 2019: su PER adelantado usa el BPA de 2020, hundido por la COVID (23,4x)
const adel = (as) => as.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = (as) => as.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel5: adel(anos5), adel8: adel(anos8), cierre5: cierre(anos5), cierre8: cierre(anos8), PRECIO, bpa26, bpa27, B };

const fuentesP = [
  { id: 5, titulo: 'Betas por sector de mercados emergentes (betaemerg.xls, actualización de enero de 2026): Drugs (Pharmaceutical), 753 empresas, beta desapalancada 0,97 (1,05 corregida por caja), D/E 10,6 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaemerg.xls' },
  { id: 1, titulo: 'Cálculo propio de la historia del PER (cierres ajustados de Yahoo y BPA recurrente, 扣非, de los informes anuales en la base de 1.664 M de acciones)', editor: 'Análisis propio', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/000999.SZ/history' },
];

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas chinas (CAS); informes anuales 2021-2025, semestral y trimestral del 3T26 de CNINFO/SZSE', formato_cuenta: 'funcion',
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
    // Balance CAS de 30-sep-2026 [A19]. Deuda = préstamos a corto (807,34) + largo (2.799,05) + parte corriente del largo (≈ 187,6: los
    // 283,98 de pasivos no corrientes con vencimiento en un año repartidos en la proporción de jun-26, 66 % préstamos y 34 % arrendamientos [A6]).
    // Arrendamientos = 102,15 + ≈ 96,4 corrientes. Caja = efectivo (3.185,08) + productos de tesorería (3.820,99); los depósitos a plazo con
    // vencimiento en un año (488,41) no se cuentan (criterio conservador, igual que en la iteración anterior).
    // Minoritarios a valor de mercado: 72 % de Tasly (20.841 M de capitalización el 26-oct) + 71,95 % de KPC (6.775 M) [D3, D16, A1] + ≈ 550 M de
    // otros a valor contable = 20.430 M (el valor contable total es 16.140 M [A19]).
    // Asociadas: inversiones en asociadas (1.458,04) + otras inversiones financieras a largo (438,43 + 8,66) a valor contable.
    // otros_ajustes: +948,80 = dividendos por pagar a 30-sep (690,65 a los accionistas de Sanjiu, ex el 16-oct, y el resto a minoritarios de filiales),
    // pagados después del balance con caja que el puente cuenta [A12, A19].
    puente: { fecha: '2026-09-30', deuda_financiera: 3793.99, arrendamientos: 198.55, caja: 7006.07, minoritarios: 20430, pensiones: 0, asociadas: 1905.13, otros_ajustes: 948.80 },
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
      comparables_per: { mediana: 15.1 },
      consenso: { bpa_ano1: 2.31, bpa_ano2: 2.57, objetivo_medio: 33.73, objetivo_min: 27.0, objetivo_max: 37.2, analistas: 10, tendencia_3m: 'recortes', fuente: 'Sinolink (BPA 2027e y 2028e, 25-oct-2026, tras el 3T26) [D15]; objetivo medio de 10 analistas en Yahoo [D3]; mínimo de UBS (21-oct) [D14]; máximo de Orient (ago-2026) [D11]' },
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
