// Parte propia del orquestador: supuestos y textos de juicio. Exporta el objeto por defecto.
import textos from './textos.mjs';

const crec = [7.5, 7.0, 7.5, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5];
const marg = [51.5, 52.3, 53.0, 53.6, 54.1, 54.5, 54.8, 55.0, 55.0, 55.0];
const amort = [6.0, 5.6, 5.1, 4.6, 4.1, 3.6, 3.1, 2.6, 2.2, 2.0];
const capex = [1.4, 1.5, 1.5, 1.6, 1.7, 1.8, 1.8, 1.9, 2.0, 2.0];

const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: c,
  margen_ebitda_pct: marg[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -10.0,
  tasa_impositiva_pct: 22.5,
  fijo: i === 0,
}));

const base = {
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.24, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0.0, coste_deuda_pct: 5.9, tasa_impositiva_pct: 22.5, peso_deuda_pct: 9.9 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.5, multiplo_salida: 16.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 1.0 },
        { periodo: '2027e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 0.0 },
        { periodo: '2028e', volumen_pct: 4.0, precio_pct: 3.5, otros_pct: 0.0 },
        { periodo: '2029e', volumen_pct: 4.0, precio_pct: 3.5, otros_pct: 0.0 },
        { periodo: '2030e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 0.0 },
      ],
      mercado_final: null,
      veredicto: 'Sí',
    },
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 3.0, multiplo_salida: null,
        perfil: [{ periodo: '2027e', crecimiento_pp: -9.0, margen_pp: -3.5 }] },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 3.75, multiplo_salida: null, perfil: [] },
    ],
    confianza: 'Media',
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Ratings', metrica: 'EBIT ajustado 2025 (reexpresado)', valor_metrica: 3076, multiplo: 22.0, ev_directo: null },
      { segmento: 'Indices', metrica: 'EBIT ajustado 2025 (reexpresado)', valor_metrica: 1301, multiplo: 24.0, ev_directo: null },
      { segmento: 'Energy', metrica: 'EBIT ajustado 2025 (reexpresado)', valor_metrica: 1159, multiplo: 18.0, ev_directo: null },
      { segmento: 'Market Intelligence', metrica: 'EBIT ajustado 2025 (reexpresado)', valor_metrica: 1549, multiplo: 15.0, ev_directo: null },
      { segmento: 'Corporativo y eliminaciones', metrica: 'EBIT ajustado 2025 (reexpresado)', valor_metrica: -110, multiplo: 19.5, ev_directo: null },
    ],
    confianza: 'Media',
  },
  valoracion: {
    pesos: { dcf: 35, comparables: 25, transacciones: 5, suma_partes: 15, escenarios: 20 },
    confianza: 'Media',
  },
  huecos_resueltos: [{ seccion: 'gobierno', campo: 'voto_remuneracion_contra_libre_pct' }],
};

// Fusión superficial por sección con los textos
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
