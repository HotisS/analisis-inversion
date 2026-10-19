// Parte del analista (Pandora A/S, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 847; // cierre del 16-oct-2026 en Nasdaq Copenhague [D1]

// Historia del PER [D1, A1, A4]. Cierres de diciembre (Yahoo) y BPA diluido publicado (2017-2021 del resumen de cinco años de 2021).
const cierres = { 2016: 924, 2017: 675.5, 2018: 265.3, 2019: 289.8, 2020: 681, 2021: 815.4, 2022: 488.1, 2023: 933.2, 2024: 1317, 2025: 707.6 };
const bpaReal = { 2017: 51.8, 2018: 47.0, 2019: 30.1, 2020: 19.9, 2021: 41.7, 2022: 53.7, 2023: 55.1, 2024: 64.6, 2025: 67.9, 2026: bpa26 };
// v3 (adelantado: cierre ÷ BPA del año siguiente). Excluido 2019 (289,8 ÷ 19,9 de 2020, el año de la pandemia: 14,6x con un beneficio a la mitad).
const larga = [2016, 2017, 2018, 2020, 2021, 2022, 2023, 2024, 2025].map((a) => cierres[a] / bpaReal[a + 1]);
const adel = [2021, 2022, 2023, 2024, 2025].map((a) => cierres[a] / bpaReal[a + 1]);
// v2 (cierre ÷ BPA del propio año). Excluido 2020 (681 ÷ 19,9 = 34x por la pandemia).
const cierreLarga = [2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025].map((a) => cierres[a] / bpaReal[a]);
const cierre = [2021, 2022, 2023, 2024, 2025].map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, larga, cierre, cierreLarga, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'DKK', divisa_cotizacion: 'DKK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, normas_contables: 'NIIF (UE), cuentas consolidadas', formato_cuenta: 'funcion',
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
    // Balance de 30-jun-2026 [A2]: deuda financiera 10.260 (bonos en EUR y DKK, préstamos y papel comercial), arrendamientos 6.291,
    // caja 908. Sin minoritarios, pensiones ni asociadas relevantes. Junio lleva más deuda que diciembre (el 4T genera la mitad
    // del EBIT): no se ajusta la estacionalidad, lo que es prudente.
    puente: { fecha: '2026-06-30', deuda_financiera: 10260, arrendamientos: 6291, caja: 908, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: adel.length,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(larga)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierreLarga)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 14.65 },
      consenso: { bpa_ano1: 64.82, bpa_ano2: 48.44, objetivo_medio: 857.17, objetivo_min: 440, objetivo_max: 1300, analistas: 18, tendencia_3m: 'subidas', fuente: 'Yahoo earningsTrend (BPA de 2026 de 64,82, 62,07 hace 90 días; BPA de 2027 de 48,44, 41,16 hace 90 días) y objetivos de 18 analistas [D2]; Visible Alpha post-2T26: BPA 2028e 64 [D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.comparables_comentario ? { comparables: { comentario: T.comparables_comentario } } : {}),
  ...(T.bolsa_contexto ? { bolsa: { contexto: T.bolsa_contexto } } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
