// Parte propia del orquestador: supuestos, valoración y textos de juicio.
import textos from './textos.mjs';

const anios = [
  // periodo, g, margen EBITDA NIIF (sin participadas), nwc % ventas
  ['2026e', 8.0, 5.8, -46, true],
  ['2027e', 12.0, 7.4, -44, false],
  ['2028e', 6.0, 7.8, -40, false],
  ['2029e', 2.0, 7.8, -36, false],
  ['2030e', 0.0, 7.6, -33, false],
  ['2031e', 2.0, 7.5, -31, false],
  ['2032e', 2.5, 7.5, -30, false],
  ['2033e', 2.5, 7.5, -30, false],
].map(([periodo, g, m, nwc, fijo]) => ({
  periodo, crecimiento_pct: g, margen_ebitda_pct: m,
  amortizacion_pct_ventas: 1.8, capex_pct_ventas: 2.2,
  nwc_pct_ventas: nwc, tasa_impositiva_pct: periodo === '2026e' ? 31 : 29, fijo,
}));

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1.0, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: textos.limitaciones,
    controles_explicados: textos.controles_explicados,
  },
  valoracion: {
    puente: {
      fecha: '2026-06-30', deuda_financiera: 1350.9, arrendamientos: 276.5, caja: 4490.4,
      minoritarios: 35.3, pensiones: 67.5, asociadas: 327.1, otros_ajustes: 461.0,
    },
    rab: null,
    pesos: { dcf: 45, comparables: 25, transacciones: 5, suma_partes: 10, escenarios: 15 },
    comentario: textos.valoracion_comentario,
    confianza: 'Media',
  },
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.53, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 29, peso_deuda_pct: 10 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 5.5 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: textos.dcf_justificacion,
    sostenibilidad: {
      puente_ingresos: textos.puente_ingresos,
      mercado_final: null,
      veredicto: 'En parte',
      justificacion: textos.sostenibilidad_justificacion,
    },
    lectura: textos.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
        perfil: [{ periodo: '2027e', crecimiento_pp: -12, margen_pp: -3.5 }], narrativa: textos.esc_bajista },
      { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: textos.esc_base },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: textos.esc_alcista },
    ],
    comentario: textos.escenarios_comentario,
    confianza: 'Media',
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Project Delivery', metrica: 'EBIT 2025 (NIIF)', valor_metrica: 348.0, multiplo: 6.0, ev_directo: null, justificacion: textos.sdp_pd },
      { segmento: 'Technology, Products & Services', metrica: 'EBIT 2025 (NIIF)', valor_metrica: 168.1, multiplo: 12.0, ev_directo: null, justificacion: textos.sdp_tps },
      { segmento: 'Corporativo y no asignable', metrica: 'EBIT 2025 (NIIF)', valor_metrica: -82.1, multiplo: 8.0, ev_directo: null, justificacion: textos.sdp_corp },
    ],
    comentario: textos.sdp_comentario,
    confianza: 'Baja',
  },
  rentabilidad: { comentario: textos.rentabilidad, confianza: 'Media' },
  catalizadores: textos.catalizadores,
  riesgos: textos.riesgos,
  preguntas: textos.preguntas,
  resumen: textos.resumen,
  fuentes: textos.fuentes,
  huecos: [],
};
