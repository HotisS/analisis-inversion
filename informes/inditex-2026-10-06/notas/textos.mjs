// Supuestos y textos del analista (citas con prefijo: [A3] = fuente 3 de A.json; [B1], [C2], [D5]; [P1] = propias).
import { readFileSync, existsSync } from 'node:fs';
// Fuera de la muestra de valoración: Zalando (plataforma online, margen EBITDA ≈ 8 %), Gap y Lululemon (ventas estancadas o en caída); ver comparables.criterio.
export const EXCLUIDOS = ['ZAL', 'GAP', 'LULU'];
const comps = JSON.parse(readFileSync(new URL('./comps.json', import.meta.url), 'utf8')).filter((x) => !EXCLUIDOS.includes(x.ticker)).map(({ _nota, _datos, ...x }) => x);

// Ejercicios de Inditex: «FY2026e» = feb-2026 a ene-2027. Capex = inversión en inmovilizado (pagos) + altas de derechos de uso
// (NIIF 16: los arrendamientos están en la deuda del puente y el EBITDA no lleva el alquiler fijo).
const anios = [
  // periodo, crecimiento, margen EBITDA, amortización (incl. derechos de uso), capex (incl. altas de derechos de uso), circulante, impuestos, fijo
  ['FY2026e', 7.5, 28.2, 8.3, 10.8, -9.7, 22.5, true],
  ['FY2027e', 7.0, 28.3, 8.3, 10.4, -9.7, 22.5],
  ['FY2028e', 6.5, 28.4, 8.4, 10.2, -9.6, 22.5],
  ['FY2029e', 6.0, 28.4, 8.4, 10.0, -9.6, 22.5],
  ['FY2030e', 5.5, 28.4, 8.5, 9.9, -9.5, 22.5],
  ['FY2031e', 5.0, 28.3, 8.5, 9.8, -9.5, 22.5],
  ['FY2032e', 4.5, 28.2, 8.5, 9.6, -9.5, 22.5],
  ['FY2033e', 4.0, 28.1, 8.5, 9.5, -9.5, 22.5],
  ['FY2034e', 3.5, 28.0, 8.5, 9.4, -9.5, 22.5],
  ['FY2035e', 3.0, 28.0, 8.5, 9.3, -9.5, 22.5],
].map(([periodo, g, m, am, cx, nwc, t, fijo]) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: t, fijo: !!fijo }));

export const textosBase = {
  // Resuelto por A: autocartera de 1.642.790 acciones a 7-jul-2026 (acuerdos de la junta).
  huecos_descartar: ['acciones (autocartera exacta a 31-jul-2026)'],
  meta: {
    fecha_corte: '2026-10-06', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1.0, unidades: 'millones',
    // 13 y no 1: el motor lee el año de la etiqueta como año de cierre; Inditex etiqueta por el año de inicio (FY2025 = feb-25 a ene-26).
    // Date.UTC(año, 13, 0) = 31 de enero del año siguiente. Ver diario, fricción 1.
    cierre_ejercicio_mes: 13,
    normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: '',
    huecos_propios: [],
  },
  identificacion: { acciones: 3115.0 },
  multiplos_historicos: { serie: [['FY2019', 30.37], ['FY2021', 26.74], ['FY2022', 28.62], ['FY2023', 39.71], ['FY2024', 52.72], ['FY2025', 55.0]].map(([anio, precio_cierre]) => ({ anio, precio_cierre, ev_ebitda_ntm: null, per_ntm: null })) },
  financieros: { cambios_perimetro: [] },
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.49, beta: 1.0, prima_mercado_pct: 4.23, prima_adicional_pct: 1.0, coste_deuda_pct: 3.6, tasa_impositiva_pct: 22.5, peso_deuda_pct: 3.6 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12.0 },
    mitad_de_anio: true,
    justificacion: { crecimiento: '', margenes: '', inversion: '', wacc: '', terminal: '' },
    lectura: '',
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: '' },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: '' },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: '' },
    ],
    comentario: '', confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: '', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-07-31', deuda_financiera: 1, arrendamientos: 6197, caja: 10399, minoritarios: 0, pensiones: 0, asociadas: 431, otros_ajustes: 0 },
    pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
    comentario: '', confianza: 'Media',
  },
  comparables: { empresas: comps, criterio: '', comentario: '' },
  rentabilidad: { comentario: '', confianza: 'Alta' },
  catalizadores: { items: [], confianza: 'Media' },
  riesgos: { items: [], premortem: '', confianza: 'Media' },
  preguntas: { items: [], confianza: 'Media' },
  resumen: { recomendacion: null, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses', tesis: '', vision_diferencial: { mercado_descuenta: '', nuestra_vision: '', por_que: '' }, a_favor: [], en_contra: [], que_vigilar: '', cambiaria_recomendacion: [], kpis_seguimiento: [], confianza: 'Media' },
};

const profundo = (a, b) => { const o = { ...a }; for (const [k, v] of Object.entries(b)) o[k] = v && typeof v === 'object' && !Array.isArray(v) && a[k] && typeof a[k] === 'object' && !Array.isArray(a[k]) ? profundo(a[k], v) : v; return o; };
const red = existsSync(new URL('./redaccion.mjs', import.meta.url)) ? (await import('./redaccion.mjs')).redaccion : {};
red.resumen = (await import('./resumen.mjs')).resumen;
if (red.escenarios?.casos) red.escenarios = { ...red.escenarios, casos: textosBase.escenarios.casos.map((c, i) => ({ ...c, ...(red.escenarios.casos[i] || {}) })) };
export const textos = profundo(textosBase, red);
