// Parte del analista (Zoetis, corte 2026-10-28). Citas con prefijo: [A3] = fuente 3 de A.json.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { textos as t } from './textos.mjs';
import { resumen } from './resumen.mjs';
import { sostenibilidad, objetivo12m, contexto, fuentesPropias } from './nuevo.mjs';
export default {
  meta: {
    fecha_corte: '2026-10-28', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...t.meta,
  },
  ...(t.financieros ? { financieros: t.financieros } : {}),
  ...(t.calidad ? { calidad: t.calidad } : {}),
  rentabilidad: { ...(t.rentabilidad || {}), confianza: 'Alta' },
  ...(t.capital ? { capital: t.capital } : {}),
  ...(t.multiplos_historicos ? { multiplos_historicos: t.multiplos_historicos } : {}),
  ...(t.comparables ? { comparables: t.comparables } : {}),
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, ...((t.dcf && t.dcf.etapa2) || {}) },
    sostenibilidad, justificacion: t.dcf && t.dcf.justificacion, lectura: t.dcf && t.dcf.lectura, confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: (t.narrativas || {})[c.escenario] || null })), ...(t.escenarios || {}), confianza: 'Media' },
  suma_partes: t.suma_partes,
  valoracion: {
    rab: null, pesos,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna ERP (T12m with sustainable payout) [P1]' },
    ...(t.valoracion || {}), objetivo_12m: objetivo12m, confianza: 'Media',
  },
  bolsa: { ...(t.bolsa || {}), contexto },
  catalizadores: t.catalizadores,
  riesgos: t.riesgos ? { ...t.riesgos, confianza: 'Media' } : undefined,
  preguntas: t.preguntas,
  resumen,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    ...fuentesPropias,
    ...(t.fuentes || []),
  ],
  huecos: t.huecos || [],
  huecos_resueltos: t.huecos_resueltos || [],
  _parches: t._parches || [],
};
