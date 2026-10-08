// Parte del analista (Microsoft, corte 2026-10-08). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = fuente propia 1.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { textos as t } from './textos.mjs';
import { resumen } from './resumen.mjs';
export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...t.meta,
  },
  ...(t.identificacion ? { identificacion: t.identificacion } : {}),
  ...(t.historia ? { historia: t.historia } : {}),
  ...(t.negocio ? { negocio: t.negocio } : {}),
  ...(t.sector ? { sector: t.sector } : {}),
  ...(t.competencia ? { competencia: t.competencia } : {}),
  ...(t.financieros ? { financieros: t.financieros } : {}),
  ...(t.trimestres ? { trimestres: t.trimestres } : {}),
  ...(t.balance ? { balance: t.balance } : {}),
  ...(t.flujos ? { flujos: t.flujos } : {}),
  ...(t.calidad ? { calidad: t.calidad } : {}),
  rentabilidad: { ...(t.rentabilidad || {}), confianza: 'Alta' },
  ...(t.capital ? { capital: t.capital } : {}),
  ...(t.directivos ? { directivos: t.directivos } : {}),
  ...(t.gobierno ? { gobierno: t.gobierno } : {}),
  ...(t.consenso ? { consenso: t.consenso } : {}),
  ...(t.bolsa ? { bolsa: t.bolsa } : {}),
  ...(t.multiplos_historicos ? { multiplos_historicos: t.multiplos_historicos } : {}),
  ...(t.comparables ? { comparables: t.comparables } : {}),
  ...(t.transacciones ? { transacciones: t.transacciones } : {}),
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, ...((t.dcf && t.dcf.etapa2) || {}) },
    justificacion: t.dcf && t.dcf.justificacion, lectura: t.dcf && t.dcf.lectura, confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: (t.narrativas || {})[c.escenario] || null })), ...(t.escenarios || {}), confianza: 'Media' },
  suma_partes: t.suma_partes,
  valoracion: {
    rab: null, pesos,
    ...(t.valoracion || {}), confianza: 'Media',
  },
  catalizadores: t.catalizadores,
  riesgos: t.riesgos ? { ...t.riesgos, confianza: 'Media' } : undefined,
  esg: t.esg,
  preguntas: t.preguntas,
  resumen,
  fuentes: [
    ...(t.fuentes || []),
  ],
  huecos: t.huecos || [],
  huecos_resueltos: t.huecos_resueltos || [],
  _parches: t._parches || [],
};
