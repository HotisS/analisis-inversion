// Parte del analista (Vertiv, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { textos } from './textos.mjs';

export default {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...textos.meta,
  },
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    ...textos.dcf,
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: textos.narrativas[c.escenario] })), ...textos.escenarios },
  suma_partes: textos.suma_partes,
  valoracion: { puente: textos.puente, rab: null, pesos, ...textos.valoracion },
  ...textos.secciones,
  fuentes: textos.fuentes,
  huecos: textos.huecos,
  huecos_resueltos: textos.huecos_resueltos,
  _parches: textos._parches,
  resumen: textos.resumen,
};
