// Parte del analista (Accelleron Industries, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Cuentas en millones de USD (US GAAP); la acción cotiza en CHF (tipo de cambio del BCE del 15-oct-2026: 1,2045 USD por CHF).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF. 2026e fijo: un semestre publicado (dos trimestres) y guía elevada en agosto.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 31.5, tasa_impositiva_pct: 20, fijo });
export const anios = [
  a('2026e', 18.0, 27.8, 2.8, 5.5, true),
  a('2027e', 11.0, 28.0, 2.9, 5.5),
  a('2028e', 8.0, 28.0, 3.0, 5.0),
  a('2029e', 6.0, 27.8, 3.1, 4.5),
  a('2030e', 5.0, 27.5, 3.2, 4.0),
  a('2031e', 4.0, 27.5, 3.3, 3.8),
  a('2032e', 3.5, 27.5, 3.4, 3.6),
];
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2028e', crecimiento_pp: -16.0, margen_pp: -5.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 12.0, precio_pct: 3.0, otros_pct: 3.0 },
  { periodo: '2027e', volumen_pct: 8.0, precio_pct: 3.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
];

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'USD', divisa_cotizacion: 'CHF', tipo_cambio: 1.2045, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  bolsa: { ...B.bolsa, beta: 1.0, posicion_corta_pct: null, comentario: T.bolsa_comentario ?? null, contexto: T.bolsa_contexto ?? null, confianza: 'Media' },
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.10, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 20, peso_deuda_pct: 6 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los dos segmentos (Medium & Low Speed y High Speed) tienen márgenes de EBITA casi iguales (25,8 % y 24,5 % en 2025), comparten fábricas, I+D y red de servicio, y el servicio vive de las máquinas que se venden en ambos [A1]. Valorarlos por separado no añade información.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 531.8, arrendamientos: 0, caja: 252.9, minoritarios: 190, pensiones: 0, asociadas: 0, otros_ajustes: 22 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 2.36, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 3.66, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 3.95, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: {
        base: 'adelantado', anios: 3, actual: 24.4, mediana_5a: 20.8, minimo_5a: 17.3, media_larga: 21.2, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 28.5, minimo_5a: 15.8, media_larga: 25.2, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 19.4 },
      consenso: { bpa_ano1: 3.55, bpa_ano2: 3.90, objetivo_medio: 98.37, objetivo_min: 74.68, objetivo_max: 113.22, analistas: 12, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA 2027e y 2028e, 11 analistas) y cash.ch/AWP (objetivos en CHF pasados a USD, 12 analistas), 16-oct-2026 [D2, D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
