// Parte del analista (Lululemon, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { textos as t } from './textos.mjs';
import { resumen } from './resumen.mjs';
const parchesArr = [3, 4, 5, 6, 7, 8, 9].map((i) => ({ ruta: `balance.historico[${i}].arrendamientos`, valor: 0 }));
export default {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 1, etiqueta_ejercicio: 'inicio', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...t.meta,
  },
  financieros: t.financieros,
  calidad: t.calidad,
  rentabilidad: { ...t.rentabilidad, confianza: 'Alta' },
  multiplos_historicos: t.multiplos_historicos,
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, ...t.dcf.etapa2 },
    justificacion: t.dcf.justificacion, lectura: t.dcf.lectura, confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: t.narrativas[c.escenario] })), ...t.escenarios, confianza: 'Media' },
  suma_partes: t.suma_partes,
  valoracion: { rab: null, pesos, ...t.valoracion, confianza: 'Media' },
  catalizadores: t.catalizadores,
  riesgos: { ...t.riesgos, confianza: 'Media' },
  preguntas: t.preguntas,
  resumen,
  fuentes: t.fuentes,
  huecos: t.huecos,
  huecos_resueltos: t.huecos_resueltos,
  _parches: parchesArr,
};
