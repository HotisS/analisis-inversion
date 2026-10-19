// Parte del analista (Giant Biogene, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
// Hong Kong no abrió el 19-oct-2026 (día siguiente al Chung Yeung): último cierre, 22,60 HKD del 16-oct-2026 [D1],
// × 0,8528 RMB/HKD (Yahoo, 15-16-oct-2026) [D6] = 19,27 RMB.
const TC = 0.8528;
const PRECIO = r2(22.6 * TC);

// Historia del PER (precios de cierre de año en RMB de la nota D; salida a bolsa el 4-nov-2022) [D1, D6]:
// adelantado (v3) = cierre del año ÷ BPA real del año siguiente (2025: ÷ nuestro BPA de 2026e); al cierre (v2) = cierre ÷ BPA del mismo año [A1].
const cierres = { 2022: 29.97, 2023: 32.16, 2024: 47.19, 2025: 29.8 };
const bpaReal = { 2022: 0.98, 2023: 1.48, 2024: 2.06, 2025: 1.81 };
const adel = [cierres[2022] / bpaReal[2023], cierres[2023] / bpaReal[2024], cierres[2024] / bpaReal[2025], cierres[2025] / bpa26];
const cierre = [2022, 2023, 2024, 2025].map((a) => cierres[a] / bpaReal[a]);
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'RMB', divisa_cotizacion: 'HKD', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS), cuentas consolidadas; sociedad de las Islas Caimán cotizada en Hong Kong', formato_cuenta: 'funcion',
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
    // Balance NIIF de 30-jun-2026 [A4]. Sin deuda financiera. Caja: efectivo y equivalentes 4.852,5 + activos financieros a valor
    // razonable (productos de gestión de tesorería y fondos) 2.543,3 + depósitos bancarios a largo ≈ 198,7 = 7.594,5 M.
    // Arrendamientos 12,3; minoritarios 13,1; asociadas (participaciones por puesta en equivalencia) 227,4.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 12.3, caja: 7594.5, minoritarios: 13.1, pensiones: 0, asociadas: 227.4, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: 4,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 22.2 },
      consenso: { bpa_ano1: 1.97, bpa_ano2: 2.14, objetivo_medio: 31.4, objetivo_min: 21.32, objetivo_max: 39.23, analistas: 16, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA de 2027e y 2028e y objetivos en HKD convertidos a 0,8528 RMB/HKD, 16-oct-2026) y tendencia de 90 días de Yahoo [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.bolsa_contexto ? { bolsa: { contexto: T.bolsa_contexto } } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
