// Parte del analista (Eastroc, línea H 9980.HK, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const TC = 0.8526; // CNY por HKD, HKDCNY=X del 16-oct-2026 (0,85264) [D1]
const PRECIO_H = 97.4; // cierre de 9980.HK del 16-oct-2026 (Hong Kong cerrado el 19-oct, Chung Yeung) [D1]
const PRECIO_A = 114.25; // cierre de 605499.SS del 16-oct-2026, mismo día que la H [D1]
const HA = Math.round((PRECIO_H * TC / PRECIO_A) * 10000) / 10000; // 0,7269
const PRECIO = Math.round(PRECIO_H * TC * 100) / 100; // 83,04 CNY

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
    fecha_corte: '2026-10-19', divisa: 'CNY', divisa_cotizacion: 'HKD', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas chinas (CAS), informes anuales y semestrales de CNINFO/SSE; contraste con las NIIF del folleto H (2022-9M25)', formato_cuenta: 'funcion',
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
    // Balance CAS de 30-jun-2026 [A5]. Caja = efectivo + depósitos y productos de tesorería (23.604,25). Deuda: préstamos a corto y largo (5.648,7).
    // otros_ajustes: +2.181,23 (dividendo a cuenta de 2026 pagado en septiembre, después del balance [A14, D9]; signo: suma a la deuda). La recompra de A terminó en junio (nada entre jul y sep [A16]).
    puente: { fecha: '2026-06-30', deuda_financiera: 5648.7, arrendamientos: 410.34, caja: 23604.25, minoritarios: 45.78, pensiones: 0, asociadas: 0, otros_ajustes: 2181.23 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
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
      comparables_per: { mediana: 16.5 },
      consenso: { bpa_ano1: 7.967, bpa_ano2: 9.134, objetivo_medio: r2(151.27 * HA), objetivo_min: r2(119 * HA), objetivo_max: r2(212.31 * HA), analistas: 19, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA de 2027e y 2028e y objetivos de 19 analistas para la A: 151,27 CNY de media, 119-212,31), pasados a base H con el cociente H/A del 16-oct (0,7269) [D2, D3]' },
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
