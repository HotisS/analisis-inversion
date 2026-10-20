// Parte del analista (Rexel SA, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 33.07; // cierre del 19-oct-2026 en Euronext París [D11]

// Historia del PER [D11, A1-A3]. Cierres de diciembre de Yahoo; BPA publicado (básico y diluido casi iguales).
const cierres = { 2021: 17.83, 2022: 18.44, 2023: 24.77, 2024: 24.60, 2025: 33.59 };
const bpaReal = { 2021: 1.96, 2022: 3.04, 2023: 2.57, 2024: 1.13, 2025: 1.99, 2026: bpa26 };
// v3 (adelantado: cierre ÷ BPA del año siguiente). Excluido el cierre de 2023 (÷ BPA de 2024, rebajado por la multa de 124 M de la
// Autoridad de la Competencia y deterioros: PER 21,9 atípico). 2025 ÷ nuestro BPA de 2026e.
const adel = [[2021, 2022], [2022, 2023], [2024, 2025], [2025, 2026]].map(([c, b]) => cierres[c] / bpaReal[b]);
// v2 (cierre ÷ BPA del propio año). Excluido 2024 (BPA 1,13 con la multa).
const cierre = [2021, 2022, 2023, 2025].map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance de 30-jun-2026 [D15]: deuda financiera bruta 4.314,7; arrendamientos 1.611,0; caja 1.033,8; minoritarios 12,8 (contable);
    // pensiones netas 65,9. otros_ajustes 991,7 = pagos aplazados de compras 41,1 + precio de GCG 1.247 (1.400 M USD al tipo del BCE)
    // − caja neta de la ampliación (≈ 490 M cobrados el 1-oct) + titulización sin recurso fuera de balance 193,6.
    puente: { fecha: '2026-06-30', deuda_financiera: 4314.7, arrendamientos: 1611.0, caja: 1033.8, minoritarios: 12.8, pensiones: 65.9, asociadas: 0, otros_ajustes: 991.7 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: adel.length,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 17.4 },
      consenso: { bpa_ano1: 2.45, bpa_ano2: 2.97, objetivo_medio: 41.44, objetivo_min: 30.0, objetivo_max: 46.0, analistas: 13, tendencia_3m: 'estables', fuente: 'Consenso recogido por Rexel del 5 al 13-oct-2026 (BPA recurrente ajustado; 2027e con GCG) [D1]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.comparables_comentario ? { comparables: { comentario: T.comparables_comentario } } : {}),
  ...(T.bolsa ? { bolsa: T.bolsa } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
