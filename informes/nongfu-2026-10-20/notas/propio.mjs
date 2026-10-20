// Parte del analista (Nongfu Spring, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
// Cierre de hoy en Hong Kong: 41,88 HKD (20-oct-2026, 16:08 hora de Hong Kong) [D1] × 0,8507 RMB/HKD (Yahoo, 20-oct-2026) [D6] = 35,63 RMB.
const TC = 0.8507;
const PRECIO = r2(41.88 * TC);

// Historia del PER (cierres de año en RMB de la nota D [D1, D6]; BPA real [A1, A5-A8]):
// adelantado (v3) = cierre del año ÷ BPA real del año siguiente (2025: ÷ nuestro BPA de 2026e); al cierre (v2) = cierre ÷ BPA del mismo año.
// 2020 queda fuera de la ventana de cinco años (salida a bolsa en sep-2020, 72x adelantado).
const cierres = { 2021: 41.99, 2022: 39.33, 2023: 40.79, 2024: 31.96, 2025: 42.11 };
const bpaReal = { 2021: 0.64, 2022: 0.76, 2023: 1.07, 2024: 1.08, 2025: 1.41 };
const A = [2021, 2022, 2023, 2024, 2025];
const adel = A.map((a) => cierres[a] / (a === 2025 ? bpa26 : bpaReal[a + 1]));
const cierre = A.map((a) => cierres[a] / bpaReal[a]);
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'RMB', divisa_cotizacion: 'HKD', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (HKFRS/IFRS), cuentas consolidadas; sociedad anónima china (acciones H) cotizada en Hong Kong', formato_cuenta: 'funcion',
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
    // Balance NIIF de 30-jun-2026 [A3]. Caja: efectivo 21.080,4 + depósitos a plazo 5.425,8 + depósitos a largo y certificados
    // 11.110,5 + activos financieros a valor razonable 28,1 = 37.644,8 M. Deuda bancaria 5.185,5; arrendamientos 87,8.
    // otros_ajustes: dividendo final de 2025 (0,99 RMB × 11.246,5 M = 11.134,0 M) aprobado el 19-may y pagado el 19-ago-2026,
    // en «otras cuentas a pagar» y aún en caja el 30-jun [A3]. Sin minoritarios ni asociadas relevantes.
    puente: { fecha: '2026-06-30', deuda_financiera: 5185.5, arrendamientos: 87.8, caja: 37644.8, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 11134.0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: 5,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 14.6 },
      consenso: { bpa_ano1: 1.792, bpa_ano2: 2.005, objetivo_medio: 45.2, objetivo_min: 27.32, objetivo_max: 52.38, analistas: 28, tendencia_3m: 'ligeramente al alza', fuente: 'MarketScreener (BPA de 2027e y 2028e y objetivos en RMB, 20-oct-2026) y tendencia de 90 días de Yahoo [D2, D3]' },
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
