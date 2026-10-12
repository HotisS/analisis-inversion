// Parte propia del orquestador (Pluxee, corte 2026-10-12). Los textos largos están en textos.mjs.
import textos from './textos.mjs';

const anios = [
  { periodo: 'FY2026e', crecimiento_pct: 0.5, margen_ebitda_pct: 35.4, amortizacion_pct_ventas: 8.6, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 30.0, fijo: true },
  { periodo: 'FY2027e', crecimiento_pct: -1.0, margen_ebitda_pct: 34.6, amortizacion_pct_ventas: 8.6, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 30.0, fijo: false },
  { periodo: 'FY2028e', crecimiento_pct: 5.0, margen_ebitda_pct: 34.8, amortizacion_pct_ventas: 8.5, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 29.0, fijo: false },
  { periodo: 'FY2029e', crecimiento_pct: 5.5, margen_ebitda_pct: 35.0, amortizacion_pct_ventas: 8.4, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 28.0, fijo: false },
  { periodo: 'FY2030e', crecimiento_pct: 5.0, margen_ebitda_pct: 35.0, amortizacion_pct_ventas: 8.3, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 28.0, fijo: false },
  { periodo: 'FY2031e', crecimiento_pct: 4.5, margen_ebitda_pct: 35.0, amortizacion_pct_ventas: 8.2, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 28.0, fijo: false },
  { periodo: 'FY2032e', crecimiento_pct: 3.8, margen_ebitda_pct: 35.0, amortizacion_pct_ventas: 8.1, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 28.0, fijo: false },
  { periodo: 'FY2033e', crecimiento_pct: 3.0, margen_ebitda_pct: 35.0, amortizacion_pct_ventas: 8.0, capex_pct_ventas: 8.3, nwc_pct_ventas: -27.0, tasa_impositiva_pct: 28.0, fijo: false },
];

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1.0, unidades: 'millones',
    cierre_ejercicio_mes: 8, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: textos.limitaciones,
    controles_explicados: textos.controles_explicados,
  },
  _parches: [
    // Circulante sin flotante: a las cuentas a cobrar se les restan las ligadas al flotante (brutas en FY2024-25, netas en FY2023, única cifra publicada) [A1, A2].
    { ruta: 'balance.historico[2].clientes', valor: 380 },
    { ruta: 'balance.historico[3].clientes', valor: 198 },
    { ruta: 'balance.historico[4].clientes', valor: 185 },
    // Otros ingresos y gastos operativos de FY2025 y del LTM: se repiten cada año (5-26 M): no son no recurrentes (lecciones).
    { ruta: 'financieros.cuenta[4].no_recurrentes_en_ebitda', valor: 0 },
    { ruta: 'financieros.ltm.no_recurrentes_en_ebitda', valor: 0 },
    { ruta: 'balance.historico[2].caja', valor: 588 },
    { ruta: 'balance.historico[3].caja', valor: 455 },
    { ruta: 'balance.historico[4].caja', valor: 569 },
    { ruta: 'bolsa.posicion_corta_pct', valor: 0 },
    { ruta: 'financieros.ltm.fcf', valor: null },
  ],
  identificacion: { pais: 'Países Bajos (sede operativa en Francia)', pais_iso: 'NL', sector: 'Financieros', industria: 'Servicios de transacciones y procesamiento de pagos', sede: 'Issy-les-Moulineaux (Francia)', fundacion: '2024 (escisión de Sodexo; actividad desde hace más de 45 años)', empleados: 5600, web: 'www.pluxeegroup.com' },
  rentabilidad: { comentario: textos.rentabilidad, confianza: 'Media' },
  consenso: { base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.0 },
  comparables: { comentario: textos.comparables_comentario },
  transacciones: { comentario: textos.transacciones_comentario },
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.53, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 3.71, tasa_impositiva_pct: 25.0, peso_deuda_pct: 30.0 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 7.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: textos.etapa2 },
    mitad_de_anio: true,
    justificacion: textos.dcf_justificacion,
    sostenibilidad: {
      puente_ingresos: textos.puente_ingresos,
      mercado_final: { periodo: 'FY2030e', tamano: 7050 },
      veredicto: 'En parte',
      justificacion: textos.sostenibilidad_justificacion,
    },
    lectura: textos.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [], narrativa: textos.esc_bajista },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: textos.esc_base },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: textos.esc_alcista },
    ],
    comentario: textos.escenarios_comentario,
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: textos.suma_partes, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-02-28', deuda_financiera: 1233, arrendamientos: 57, caja: 458, minoritarios: 210, pensiones: 5, asociadas: 6, otros_ajustes: 38 },
    pesos: { dcf: 45, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 35 },
    comentario: textos.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: { items: textos.catalizadores, confianza: 'Media' },
  riesgos: { items: textos.riesgos, premortem: textos.premortem, confianza: 'Media' },
  preguntas: { items: textos.preguntas, confianza: 'Media' },
  resumen: textos.resumen,
  fuentes: [],
  huecos: [],
};
