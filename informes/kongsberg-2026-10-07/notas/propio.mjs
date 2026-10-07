// Parte del analista (Kongsberg Gruppen, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, asociadas, pesos } from './supuestos.mjs';
import { textos } from './textos.mjs';
import { resumen } from './resumen.mjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const A = require('./A.json'), B = require('./B.json');
const descB = Object.fromEntries((B.negocio?.segmentos || []).map((s) => [s.nombre, s.descripcion]));
const segmentos = A.negocio.segmentos.map((s) => ({ ...s, descripcion: descB[s.nombre] || s.descripcion }));

const base = {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'NOK', divisa_cotizacion: 'NOK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
  },
  identificacion: { pais_iso: 'NO' },
  negocio: { segmentos, geografias: A.negocio.geografias, geografias_criterio: A.negocio.geografias_criterio, kpis: A.negocio.kpis },
  consenso: { base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null },
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 1100, arrendamientos: 2054, caja: 4859, minoritarios: 774, pensiones: 164, asociadas, otros_ajustes: 522 },
    rab: null,
    pesos,
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [] },
  _parches: [
    // Flujos 2024-2025 del perímetro continuado (estimación propia por diferencia con el flujo de Maritime publicado) [A3].
    { ruta: 'flujos.historico[3].flujo_operativo', valor: 10200 },
    { ruta: 'flujos.historico[3].capex', valor: 2065 },
    { ruta: 'flujos.historico[4].flujo_operativo', valor: 8590 },
    { ruta: 'flujos.historico[4].capex', valor: 2653 },
    { ruta: 'flujos.historico[4].desinversiones', valor: 101 },
    // BPA 2026e del consenso sin la parte de Maritime hasta el 23-abr (0,83 NOK por acción en el 1S26) [D1, D10].
    { ruta: 'consenso.estimaciones[0].bpa', valor: 6.43 },
  ],
};

// Mezcla superficial de textos por sección (los textos completan las secciones de arriba).
const out = { ...base };
for (const [k, v] of Object.entries(textos || {})) {
  if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object') {
    out[k] = { ...out[k], ...v };
    if (k === 'meta') out.meta = { ...base.meta, ...v };
    if (k === 'dcf' && v.etapa2) out.dcf.etapa2 = { ...base.dcf.etapa2, ...v.etapa2 };
    if (k === 'valoracion' && v.puente) out.valoracion.puente = { ...base.valoracion.puente, ...v.puente };
  } else out[k] = v;
}
out.resumen = resumen;
export default out;
