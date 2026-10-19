// Parte del analista (Norwegian Air Shuttle, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 11.05; // cierre del 16-oct-2026 en Oslo Børs (11,045) [D1]

// Historia del PER [D1, A1, A7]. Cierres de diciembre; BPA diluido real. 2025 normalizado sin las ganancias por comprar aviones arrendados (≈ 1,58).
const cierres = { 2021: 10.75, 2022: 7.34, 2023: 10.72, 2024: 11.0, 2025: 17.45 };
const bpaReal = { 2022: 0.89, 2023: 1.54, 2024: 1.2, 2025: 1.58 };
// v3 (adelantado: cierre ÷ BPA del año siguiente): 2021 excluido (BPA de 2022 con la reversión de 2.099 M; subyacente en pérdidas)
// y 2025 excluido (BPA de 2026e negativo: año de valle por el combustible y el ETS).
const adelAnos = [2022, 2023, 2024];
const adel = adelAnos.map((a) => cierres[a] / bpaReal[a + 1]);
// v2 (cierre ÷ BPA del propio año): 2021-2022 excluidos (BPA de reestructuración y de la reversión).
const cierreAnos = [2023, 2024, 2025];
const cierre = cierreAnos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, PRECIO, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'NOK', divisa_cotizacion: 'NOK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UE), cuentas consolidadas', formato_cuenta: 'naturaleza',
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
    // Balance de 30-jun-2026 [A2, D12]. Deuda: bonos y préstamos de aviones 6.185 (incluye 1.460 del bono de reclamaciones
    // retenidas, que vence el 30-sep-2026). Caja: 11.041 de efectivo + 2.659 de inversiones financieras a corto.
    // Pensiones netas ≈ 326. Asociadas: Spenn (51). otros_ajustes: exceso estacional de billetes cobrados por adelantado sobre
    // la media del año (8.621 − 4.396) menos el exceso de clientes (5.040 − 3.887), más 333 de la obligación del EU ETS: 3.405.
    puente: { fecha: '2026-06-30', deuda_financiera: 6185, arrendamientos: 12779, caja: 13700, minoritarios: 0, pensiones: 326, asociadas: 51, otros_ajustes: 3405 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: 3,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 8.6 },
      consenso: { bpa_ano1: 1.704, bpa_ano2: 2.118, objetivo_medio: 14.0, objetivo_min: 11.5, objetivo_max: 17.5, analistas: 6, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA de 2027e y 2028e de 6 analistas, octubre de 2026) y cambios de objetivo de Barclays, SB1, Pareto y Danske de octubre [D2, D3, D10]' },
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
