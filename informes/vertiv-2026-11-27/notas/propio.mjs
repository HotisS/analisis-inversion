// Parte del analista (Vertiv, corte 2026-11-27). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { textos } from './textos.mjs';
import { objetivo_12m } from './objetivo.mjs';

export default {
  meta: {
    fecha_corte: '2026-11-27', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...textos.meta,
  },
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    ...textos.dcf,
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: textos.narrativas[c.escenario] })), ...textos.escenarios },
  suma_partes: textos.suma_partes,
  valoracion: { puente: textos.puente, rab: null, pesos, ...textos.valoracion, objetivo_12m,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, 1-nov-2026 [D46]' } },
  ...textos.secciones,
  fuentes: textos.fuentes,
  huecos: textos.huecos,
  huecos_resueltos: textos.huecos_resueltos,
  _parches: textos._parches,
  resumen: textos.resumen,
};
