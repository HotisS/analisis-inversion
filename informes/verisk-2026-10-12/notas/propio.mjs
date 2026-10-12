// Parte propia del orquestador (Verisk, corte 2026-10-12): supuestos y textos de juicio.
import textos from './textos.mjs';

const crec = [4.8, 6.5, 6.8, 6.5, 6.2, 5.8, 5.3, 4.8, 4.2, 3.5];
const marg = [56.3, 56.8, 57.2, 57.5, 57.8, 58.0, 58.0, 58.0, 58.0, 58.0];
const amort = [10.9, 10.6, 10.3, 10.0, 9.7, 9.4, 9.1, 8.8, 8.6, 8.5];
const capex = [8.4, 8.4, 8.4, 8.4, 8.4, 8.4, 8.5, 8.5, 8.5, 8.5];

const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: c,
  margen_ebitda_pct: marg[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -11.0,
  tasa_impositiva_pct: 23.5,
  fijo: i === 0,
}));

const base = {
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.24, beta: 0.79, prima_mercado_pct: 5.5, prima_adicional_pct: 0.0, coste_deuda_pct: 5.8, tasa_impositiva_pct: 23.5, peso_deuda_pct: 16.2 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.5, multiplo_salida: 14.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 2.5, precio_pct: 4.5, otros_pct: -2.2 },
        { periodo: '2027e', volumen_pct: 2.5, precio_pct: 4.0, otros_pct: 0.0 },
        { periodo: '2028e', volumen_pct: 2.8, precio_pct: 4.0, otros_pct: 0.0 },
        { periodo: '2029e', volumen_pct: 2.5, precio_pct: 4.0, otros_pct: 0.0 },
        { periodo: '2030e', volumen_pct: 2.4, precio_pct: 3.8, otros_pct: 0.0 },
      ],
      mercado_final: null,
      veredicto: 'Sí',
    },
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.3, crecimiento_terminal_pct: 3.75, multiplo_salida: null, perfil: [] },
    ],
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], confianza: 'Media' },
  valoracion: {
    puente: { otros_ajustes: 300 },
    pesos: { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 },
    confianza: 'Media',
  },
};

function fusiona(a, b) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b || {})) {
    if (Array.isArray(v) && Array.isArray(out[k]) && v.length === out[k].length && v.every(e => e && typeof e === 'object')) out[k] = out[k].map((e, i) => ({ ...e, ...v[i] }));
    else if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) out[k] = fusiona(out[k], v);
    else out[k] = v;
  }
  return out;
}

export default fusiona(base, textos);
