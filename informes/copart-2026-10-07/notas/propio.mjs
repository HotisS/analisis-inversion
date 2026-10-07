// Parte del analista (Copart, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { textos } from './textos.mjs';
import { resumen } from './resumen.mjs';

export default {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 7, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...textos.meta,
  },
  identificacion: textos.identificacion,
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, ...textos.dcf.etapa2 },
    justificacion: textos.dcf.justificacion, lectura: textos.dcf.lectura, confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: textos.narrativas[c.escenario] })), ...textos.escenarios, confianza: 'Media' },
  suma_partes: textos.suma_partes,
  valoracion: { rab: null, pesos, referencia_mercado: textos.referencia_mercado, ...textos.valoracion, confianza: 'Media' },
  ...textos.secciones,
  resumen,
  fuentes: textos.fuentes,
  huecos: textos.huecos,
  huecos_resueltos: textos.huecos_resueltos,
  _parches: textos._parches,
};
