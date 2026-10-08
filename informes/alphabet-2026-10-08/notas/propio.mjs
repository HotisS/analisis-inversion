// Parte del analista (Alphabet, corte 2026-10-08). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = fuente propia 1.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { textos as t } from './textos.mjs';
import { resumen } from './resumen.mjs';
const { meta: tm = {}, narrativas = {}, dcf: td = {}, escenarios: te = {}, valoracion: tv = {}, fuentes = [], huecos = [], huecos_resueltos = [], _parches = [], ...resto } = t;
export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...tm,
  },
  ...resto,
  dcf: { anios, wacc, terminal, mitad_de_anio: true, etapa2: { ...etapa2, ...(td.etapa2 || {}) }, justificacion: td.justificacion, lectura: td.lectura, confianza: 'Media' },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: narrativas[c.escenario] || null })), ...te, confianza: 'Media' },
  valoracion: { rab: null, pesos, ...tv, confianza: 'Media' },
  resumen,
  fuentes, huecos, huecos_resueltos, _parches,
};
