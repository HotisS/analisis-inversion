// Supuestos y textos del analista (citas con prefijo: [A3] = fuente 3 de A.json; [B1], [C2], [D5]; [P1] = propias).
import { readFileSync } from 'node:fs';
const comps = JSON.parse(readFileSync(new URL('./comps.json', import.meta.url), 'utf8')).map(({ _nota, ...x }) => x);

const anios = [
  // periodo, crecimiento, margen EBITDA (NIIF, con remuneración en acciones), amort., capex (incl. altas de arrendamientos), circulante, impuestos
  ['2026e', 16.6, 19.0, 4.3, 5.0, 19.0, 17.0, true],
  ['2027e', 17.0, 19.0, 4.3, 5.0, 19.0, 18.0],
  ['2028e', 16.0, 19.5, 4.3, 5.0, 18.8, 18.0],
  ['2029e', 15.0, 20.0, 4.3, 4.9, 18.6, 18.0],
  ['2030e', 13.0, 20.0, 4.3, 4.8, 18.4, 18.5],
  ['2031e', 11.0, 20.0, 4.3, 4.7, 18.2, 18.5],
  ['2032e', 9.0, 20.0, 4.3, 4.6, 18.0, 19.0],
  ['2033e', 7.0, 20.0, 4.3, 4.6, 18.0, 19.0],
  ['2034e', 5.0, 20.0, 4.3, 4.5, 18.0, 19.0],
  ['2035e', 3.5, 20.0, 4.3, 4.5, 18.0, 19.0],
].map(([periodo, g, m, am, cx, nwc, t, fijo]) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: t, fijo: !!fijo }));

export const textosBase = {
  meta: {
    fecha_corte: '2026-10-06', divisa: 'CHF', unidades: 'millones', cierre_ejercicio_mes: 12, normas_contables: 'NIIF (IASB)', formato_cuenta: 'funcion',
    limitaciones: '',
    huecos_propios: [],
  },
  financieros: { cambios_perimetro: [] },
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 0.51, beta: 1.72, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 18.0, peso_deuda_pct: 6.0 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11.0 },
    mitad_de_anio: true,
    justificacion: { crecimiento: '', margenes: '', inversion: '', wacc: '', terminal: '' },
    lectura: '',
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: '' },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: '' },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: '' },
    ],
    comentario: '', confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: '', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 562.5, caja: 1205.6, minoritarios: 0, pensiones: 8.1, asociadas: 0, otros_ajustes: 0 },
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

import { redaccion } from './redaccion.mjs';
const profundo = (a, b) => { const o = { ...a }; for (const [k, v] of Object.entries(b)) o[k] = v && typeof v === 'object' && !Array.isArray(v) && a[k] && typeof a[k] === 'object' && !Array.isArray(a[k]) ? profundo(a[k], v) : v; return o; };
export const textos = profundo(textosBase, redaccion);
