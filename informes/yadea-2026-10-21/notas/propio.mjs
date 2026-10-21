// Parte del analista (Yadea, corte 2026-10-21). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
// Cierre de hoy en Hong Kong: 9,02 HKD (21-oct-2026, cierre de las 16:08 hora de Hong Kong) [D1] × 0,8502 RMB/HKD (Yahoo, 21-oct-2026, 11:41 UTC) [D6] = 7,67 RMB.
const TC = 0.8502;
const PRECIO = r2(9.02 * TC);

// Historia del PER (cierres de año en HKD de la nota D × HKD/CNY de fin de año [D1, D6]; BPA diluido real [A1, A5, A6, A10]):
// adelantado (v3) = cierre del año ÷ BPA real del año siguiente (2025: ÷ nuestro BPA de 2026e); al cierre (v2) = cierre ÷ BPA del mismo año.
const cierres = { 2021: 12.41, 2022: 11.65, 2023: 12.40, 2024: 12.15, 2025: 10.18 };
const bpaReal = { 2021: 0.47, 2022: 0.729, 2023: 0.88, 2024: 0.421, 2025: 0.955 };
const A = [2021, 2022, 2023, 2024, 2025];
const adel = A.map((a) => cierres[a] / (a === 2025 ? bpa26 : bpaReal[a + 1]));
const cierre = A.map((a) => cierres[a] / bpaReal[a]);
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'RMB', divisa_cotizacion: 'HKD', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (HKFRS), cuentas consolidadas; sociedad de las Islas Caimán cotizada en Hong Kong', formato_cuenta: 'funcion',
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
  comparables: { comentario: T.comparables_comentario ?? null },
  valoracion: {
    // Balance NIIF de 30-jun-2026 [A3]. Caja: efectivo 7.122,8 + depósitos a plazo 3.333,7 + activos financieros a valor razonable
    // 4.472,9 = 14.929,4 M; fuera los depósitos pignorados (3.557,2 M), que garantizan efectos a pagar dentro de proveedores.
    // Deuda: préstamos bancarios 796,8 + préstamos públicos sin interés 272,1 = 1.068,9 M. Arrendamientos 155,4. Minoritarios 0,8.
    // otros_ajustes: dividendo final de 2025 (0,53 HKD × 3.112,65 M × 0,8535 ≈ 1.408,0 M) por pagar a 30-jun y la compra de
    // Jinjian (1.020 M en efectivo, firmada el 25-ago-2026, sin cerrar) [A3, A12].
    puente: { fecha: '2026-06-30', deuda_financiera: 1068.9, arrendamientos: 155.4, caja: 14929.4, minoritarios: 0.8, pensiones: 0, asociadas: 0, otros_ajustes: 2428.0 },
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
      comparables_per: { mediana: 13.95 },
      consenso: { bpa_ano1: 1.032, bpa_ano2: 1.169, objetivo_medio: 12.21, objetivo_min: 10.28, objetivo_max: 14.13, analistas: 12, tendencia_3m: 'a la baja', fuente: 'MarketScreener (BPA de 2027e y 2028e y objetivo medio en RMB, 21-oct-2026); mínimo y máximo de Yahoo (12,09 y 16,62 HKD) y tendencia de 90 días de Yahoo [D2, D3]' },
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
