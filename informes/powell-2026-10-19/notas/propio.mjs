// Parte del analista (Powell Industries, POWL, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 165.14; // cierre de POWL del 16-oct-2026 (último disponible el 19-oct) [D1]

// Cierres de septiembre ajustados por el split 3 × 1 de abril de 2026 [D1] y BPA diluido real en acciones de hoy [A1, A9]; FY2026 = el nuestro (sin publicar).
const cierres = { 2016: 13.35, 2017: 10, 2018: 12.09, 2019: 13.05, 2020: 8.04, 2021: 8.19, 2022: 7.03, 2023: 27.63, 2024: 74, 2025: 101.6 };
const bpaReal = { 2016: 0.453, 2017: -0.277, 2018: -0.207, 2019: 0.283, 2020: 0.473, 2021: 0.017, 2022: 0.383, 2023: 1.5, 2024: 4.097, 2025: 4.953, 2026: bpa26 };
// Historia adelantada (cierre ÷ BPA real del año siguiente). Fuera: FY2016 y FY2017 (pérdidas el año siguiente), FY2020 (PER de 473x, BPA de FY2021 casi nulo)
// y FY2022 (4,7x: menos de un tercio de la mediana de 19,2x, regla de atípicos).
const adelVal = (a) => cierres[a] / bpaReal[a + 1];
const adel5 = [2021, 2023, 2024, 2025].map(adelVal);
const adelLarga = [2018, 2019, 2021, 2023, 2024, 2025].map(adelVal);
// Historia v2 (cierre ÷ BPA del mismo año). Fuera: FY2017 y FY2018 (pérdidas) y FY2021 (PER de 482x, BPA casi nulo).
const cieVal = (a) => cierres[a] / bpaReal[a];
const cie5 = [2022, 2023, 2024, 2025].map(cieVal);
const cieLarga = [2019, 2020, 2022, 2023, 2024, 2025].map(cieVal);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel5, adelLarga, cie5, cieLarga, bpa26, bpa27, PRECIO };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP (10-K y 10-Q de la SEC, XBRL de companyfacts)', formato_cuenta: 'funcion',
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
    // Balance de 30-jun-2026 [A3]: efectivo 633,6 M (sin inversiones a corto), sin deuda financiera. Los arrendamientos operativos (US GAAP) no van al puente.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 633.6, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), la principal', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel5)), minimo_5a: r2(Math.min(...adel5)), media_larga: r2(avg(adelLarga)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cie5)), minimo_5a: r2(Math.min(...cie5)), media_larga: r2(avg(cieLarga)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 21.2 },
      consenso: { bpa_ano1: 6.817, bpa_ano2: 8.246, objetivo_medio: 267.5, objetivo_min: null, objetivo_max: null, analistas: 4, tendencia_3m: 'estable', fuente: 'MarketScreener: BPA de FY2027e y FY2028e y objetivo medio de cuatro analistas (267,50 USD), consultado el 19-oct-2026 [D2]' },
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
