// Parte del analista (DSV, corte 2026-10-07). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { catalizadores, preguntas } from './cualitativo.mjs';
import * as T from './textos.mjs';

export default {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'DKK', divisa_cotizacion: 'DKK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados,
  },
  _parches: [
    { ruta: 'identificacion.precio', valor: 1137.5 },
    { ruta: 'identificacion.fecha_precio', valor: '2026-10-07' },
    { ruta: 'identificacion.min_52s', valor: 1137.5 },
    { ruta: 'identificacion.free_float_pct', valor: 80.8 },
    { ruta: 'consenso.base_ebitda', valor: 'NIIF' },
    { ruta: 'consenso.ajuste_ebitda_pct_ventas', valor: null },
    // Los presidentes de los dos primeros accionistas (Göhner 9,7 %, Agility 8,03 %) no son independientes del accionista [C].
    { ruta: 'gobierno.consejo[2].tipo', valor: 'Dominical' },
    { ruta: 'gobierno.consejo[7].tipo', valor: 'Dominical' },
    { ruta: 'balance.rating', valor: T.rating },
    { ruta: 'bolsa.posicion_corta_pct', valor: 2.1 },
  ],
  huecos_resueltos: [{ seccion: 'balance', campo: 'rating (S&P, Moody’s)' }, { seccion: 'bolsa', campo: 'posicion_corta_pct' }],
  ...T.secciones,
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas[c.escenario] })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario, confianza: 'Media' },
  financieros: { cambios_perimetro: T.cambios_perimetro },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 63372, arrendamientos: 32155, caja: 10058, minoritarios: 370, pensiones: 2059, asociadas: 0, otros_ajustes: 2103 },
    pesos,
    comentario: T.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores,
  riesgos: T.riesgos,
  preguntas,
  resumen: T.resumen,
  fuentes: T.fuentes,
  huecos: T.huecos,
};
