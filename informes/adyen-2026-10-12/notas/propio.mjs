// Parte propia del orquestador (Adyen, corte 2026-10-12). Los textos largos están en textos.mjs.
import textos from './textos.mjs';

const anios = [
  { periodo: '2026e', crecimiento_pct: 21.0, margen_ebitda_pct: 51.8, amortizacion_pct_ventas: 6.0, capex_pct_ventas: 9.5, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: true },
  { periodo: '2027e', crecimiento_pct: 20.0, margen_ebitda_pct: 53.3, amortizacion_pct_ventas: 6.3, capex_pct_ventas: 7.5, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2028e', crecimiento_pct: 19.0, margen_ebitda_pct: 55.0, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 7.0, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2029e', crecimiento_pct: 17.0, margen_ebitda_pct: 55.5, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 7.0, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2030e', crecimiento_pct: 15.0, margen_ebitda_pct: 56.0, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 6.8, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2031e', crecimiento_pct: 13.0, margen_ebitda_pct: 56.0, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 6.8, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2032e', crecimiento_pct: 11.0, margen_ebitda_pct: 56.0, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 6.6, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2033e', crecimiento_pct: 9.0, margen_ebitda_pct: 56.0, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 6.6, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2034e', crecimiento_pct: 7.0, margen_ebitda_pct: 56.0, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 6.5, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2035e', crecimiento_pct: 5.0, margen_ebitda_pct: 56.0, amortizacion_pct_ventas: 6.4, capex_pct_ventas: 6.5, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 24.5, fijo: false },
];

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1.0, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: textos.limitaciones,
    controles_explicados: textos.controles_explicados,
  },
  _parches: textos.parches,
  identificacion: { sector: 'Financieros', industria: 'Servicios de transacciones y procesamiento de pagos', fundacion: '2006', empleados: 4771, web: 'www.adyen.com' },
  financieros: { ajustes: textos.financieros_ajustes },
  balance: { otros_pasivos: textos.balance_otros_pasivos },
  flujos: { comentario: textos.flujos_comentario },
  rentabilidad: { comentario: textos.rentabilidad, confianza: 'Alta' },
  comparables: { comentario: textos.comparables_comentario },
  transacciones: { comentario: textos.transacciones_comentario },
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.53, beta: 1.50, prima_mercado_pct: 5.5, prima_adicional_pct: 0.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 24.5, peso_deuda_pct: 1.5 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: textos.etapa2 },
    mitad_de_anio: true,
    justificacion: textos.dcf_justificacion,
    sostenibilidad: {
      puente_ingresos: textos.puente_ingresos,
      mercado_final: textos.mercado_final,
      veredicto: textos.veredicto,
      justificacion: textos.sostenibilidad_justificacion,
    },
    lectura: textos.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: {
    casos: textos.casos,
    comentario: textos.escenarios_comentario,
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: textos.suma_partes, confianza: 'Alta' },
  valoracion: {
    puente: textos.puente,
    pesos: textos.pesos,
    comentario: textos.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: { items: textos.catalizadores, confianza: 'Media' },
  riesgos: { items: textos.riesgos, premortem: textos.premortem, confianza: 'Media' },
  preguntas: { items: textos.preguntas, confianza: 'Media' },
  resumen: textos.resumen,
  fuentes: textos.fuentes,
  huecos: textos.huecos,
  huecos_resueltos: textos.huecos_resueltos,
};
