// Parte del analista (Eastroc, línea H 9980.HK, corte 2026-11-27). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const TC = 0.85; // CNY por HKD, HKDCNY=X del 27-nov-2026 (0,84997) [D1]
const PRECIO_H = 96.15; // cierre de 9980.HK del 27-nov-2026 [D1]
const PRECIO_A = 108.67; // cierre de 605499.SS del 27-nov-2026, mismo día que la H [D1]
const HA = Math.round((PRECIO_H * TC / PRECIO_A) * 10000) / 10000; // 0,7521
const PRECIO = Math.round(PRECIO_H * TC * 100) / 100; // 81,73 CNY

// Historia del PER en base H: cierre de la A (ajustado por las ampliaciones liberadas de 2024 y 2026) × H/A [D1]. BPA reales en acciones de hoy [A1-A4]; para 2025 el BPA de 2026e es el nuestro.
const cierres = { 2021: 107.6, 2022: 105.27, 2023: 107.99, 2024: 191.17, 2025: 205.68 };
const bpaReal = { 2021: 1.84, 2022: 2.131, 2023: 3.017, 2024: 4.921, 2025: 6.531, 2026: bpa26 };
const anos = [2021, 2022, 2023, 2024, 2025];
const adel = anos.map((a) => (cierres[a] * HA) / bpaReal[a + 1]);
const cierre = anos.map((a) => (cierres[a] * HA) / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, HA, PRECIO, bpa26, bpa27 };

export default {
  meta: {
    fecha_corte: '2026-11-27', divisa: 'CNY', divisa_cotizacion: 'HKD', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas chinas (CAS), informes anuales, semestrales y trimestrales de CNINFO/SSE; contraste con las NIIF del folleto H (2022-9M25)', formato_cuenta: 'funcion',
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
    // Balance CAS de 30-sep-2026 [A17]. Caja = efectivo 14.151,58 + productos de tesorería 6.565,90 + depósitos a menos de un año 1.801,78 + fondos de capital riesgo 552,66 = 23.071,92.
    // Deuda: préstamos a corto 6.272,62. Arrendamientos: 383,82 + 17,33 a corto. otros_ajustes: +174,55 (dividendo por pagar a 30-sep, ya devengado [A17]). Sin recompras en octubre [A19].
    puente: { fecha: '2026-09-30', deuda_financiera: 6272.62, arrendamientos: 401.16, caja: 23071.92, minoritarios: 41.68, pensiones: 0, asociadas: 0, otros_ajustes: 174.55 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 17.4 },
      consenso: { bpa_ano1: 7.08, bpa_ano2: 8.15, objetivo_medio: r2(114.88 * TC), objetivo_min: r2(89.72 * TC), objetivo_max: r2(151.64 * TC), analistas: 12, tendencia_3m: 'recortes', fuente: 'BPA de 2027e y 2028e: mediana de seis notas de brókeres posteriores al 3T26 (Eastmoney); objetivos de 12 analistas de la H en Yahoo (114,88 HKD de media, 89,72-151,64), pasados a CNY con 0,85 [D2, D3]' },
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
