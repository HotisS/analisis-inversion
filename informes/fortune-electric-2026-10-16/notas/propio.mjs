// Parte del analista (Fortune Electric, 1519.TW, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Cuentas en millones de TWD (NIIF adoptadas en Taiwán); la acción cotiza en TWD. BPA sobre 347,47 M de acciones (tras la ampliación gratuita del 5-ago-2026).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF. 2026e fijo: tres trimestres de ventas publicados (nueve meses −0,7 %) y un semestre de cuentas.
const nwc = { '2026e': 15, '2027e': 15, '2028e': 15, '2029e': 16, '2030e': 17, '2031e': 18, '2032e': 18 };
const a = (periodo, gr, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: gr, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc[periodo], tasa_impositiva_pct: 22, fijo });
export const anios = [
  a('2026e', 3.2, 24.0, 2.0, 8.0, true),
  a('2027e', 24.0, 24.5, 2.2, 6.0),
  a('2028e', 18.0, 24.5, 2.4, 4.5),
  a('2029e', 10.0, 22.5, 2.5, 3.5),
  a('2030e', 6.0, 20.5, 2.5, 3.0),
  a('2031e', 4.0, 19.0, 2.5, 3.0),
  a('2032e', 3.0, 18.0, 2.5, 3.0),
];
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2028e', crecimiento_pp: -23.0, margen_pp: -6.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
const puente_ingresos = [
  { periodo: '2026e', volumen_pct: -2.0, precio_pct: 5.2, otros_pct: 0 },
  { periodo: '2027e', volumen_pct: 20.0, precio_pct: 4.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 16.0, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 10.0, precio_pct: 0, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 8.0, precio_pct: -2.0, otros_pct: 0 },
];
const USD_TWD = 32.338;

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'TWD', divisa_cotizacion: 'TWD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en Taiwán (TIFRS)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  bolsa: { ...B.bolsa, beta: 1.1, posicion_corta_pct: null, comentario: T.bolsa_comentario ?? null, contexto: T.bolsa_contexto ?? null, confianza: 'Media' },
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 2.03, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 22, peso_deuda_pct: 2 },
    terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 12 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      // GlobalData: 89.340 M USD en 2030 (potencia + distribución) [B6], al cambio del corte (32,338 TWD por USD).
      mercado_final: { periodo: '2030e', tamano: Math.round(89340 * USD_TWD) },
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: el segmento eléctrico es el 94 % de las ventas y casi todo el resultado; la obra llave en mano (1.390 M de ventas y 91 M de resultado en 2025) y las filiales ajenas al negocio (recarga, hidrógeno, centro comercial) son demasiado pequeñas para cambiar el valor [A2].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [D12]: deuda bancaria 560 + 130; arrendamientos 2.142,1; caja 7.162,3 + 555,6 de depósitos a plazo (coste amortizado);
    // minoritarios 192,5; otros_ajustes = dividendo de 3.474,7 M a pagar a 30-jun y pagado en agosto (sigue en la caja de junio).
    puente: { fecha: '2026-06-30', deuda_financiera: 690, arrendamientos: 2142.1, caja: 7717.9, minoritarios: 192.5, pensiones: 0, asociadas: 0, otros_ajustes: 3474.7 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 11.3, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 19.4, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 21.7, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: {
        base: 'adelantado', anios: 3, actual: 39.2, mediana_5a: 36.6, minimo_5a: 19.9, media_larga: 36.0, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 37.7, minimo_5a: 33.1, media_larga: 41.8, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 22.8 },
      consenso: { bpa_ano1: 21.1, bpa_ano2: 25.22, objetivo_medio: 863.64, objetivo_min: null, objetivo_max: null, analistas: 7, tendencia_3m: 'recortes', fuente: 'FactSet vía Anue (23-sep-2026, 7 analistas; BPA en la base antigua ÷ 1,1) y Stock Analysis (8 analistas, objetivo 873,26) [D2, D3]' },
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
