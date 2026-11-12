// Parte del analista (The Marzetti Company, corte 2026-11-12). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = fuente propia 1.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { textos as t } from './textos.mjs';
import { resumen } from './resumen.mjs';
import { objetivo_12m } from './o12.mjs';
export default {
  meta: {
    fecha_corte: '2026-11-12', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...(t.meta || {}),
  },
  ...Object.fromEntries(['identificacion','historia','negocio','sector','competencia','financieros','trimestres','balance','flujos','calidad','capital','directivos','gobierno','consenso','bolsa','multiplos_historicos','comparables','transacciones','esg','preguntas','catalizadores','suma_partes','sentimiento'].filter((k) => t[k]).map((k) => [k, t[k]])),
  rentabilidad: { ...(t.rentabilidad || {}), confianza: 'Alta' },
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, ...((t.dcf && t.dcf.etapa2) || {}) },
    justificacion: t.dcf && t.dcf.justificacion, sostenibilidad: t.dcf && t.dcf.sostenibilidad, lectura: t.dcf && t.dcf.lectura, confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: (t.narrativas || {})[c.escenario] || null })), ...(t.escenarios || {}), confianza: 'Media' },
  valoracion: { rab: null, pesos, ...(t.valoracion || {}), objetivo_12m: { ...objetivo_12m, ...((t.valoracion && t.valoracion.objetivo_12m) || {}) }, confianza: 'Media' },
  riesgos: t.riesgos ? { ...t.riesgos, confianza: 'Media' } : undefined,
  resumen,
  fuentes: [...(t.fuentes || [])],
  huecos: t.huecos || [],
  huecos_resueltos: t.huecos_resueltos || [],
  _parches: t._parches || [],
};
