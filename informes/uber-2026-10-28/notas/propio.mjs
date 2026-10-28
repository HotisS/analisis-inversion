// Parte del analista (Uber, corte 2026-10-28; tercera iteración). Citas con prefijo de nota: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { A, noRecurrentes, operaciones } from './ajustes.mjs';
import { textos } from './textos.mjs';
import { resumen } from './resumen.mjs';
import { bolsa, objetivo_12m, identificacion } from './actual.mjs';

const parchesNoRec = A.financieros.cuenta.map((c, i) => ({ ruta: `financieros.cuenta[${i}].no_recurrentes_en_ebitda`, valor: noRecurrentes[c.periodo] }));
export default {
  meta: {
    fecha_corte: '2026-10-28', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    ...textos.meta,
  },
  identificacion: { ...textos.identificacion, ...identificacion },
  bolsa: { ...bolsa, comentario: textos.secciones.bolsa.comentario, confianza: 'Alta' },
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, ...textos.dcf.etapa2 },
    justificacion: textos.dcf.justificacion, lectura: textos.dcf.lectura, confianza: 'Media',
    sostenibilidad: { puente_ingresos: [
      { periodo: '2026e', volumen_pct: 14.0, precio_pct: 3.0, otros_pct: -5.7, comentario: 'Reservas brutas +22 % a tipo constante en el 2T26 y guía del 18-22 % en el 3T26; los ingresos crecen menos por el paso a agente en parte del Reino Unido (−2.100 M en el 1S26) y la divisa (reparto entre volumen y precio, estimación propia) [A3, A4].' },
      { periodo: '2027e', volumen_pct: 12.0, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Viajes y consumidores activos al alza (208 millones en el 2T26) y Uber One [A4].' },
      { periodo: '2028e', volumen_pct: 11.0, precio_pct: 2.5, otros_pct: 0.0, comentario: 'El consenso da +14,3 % en 2028e [D18].' },
    ], mercado_final: null, veredicto: 'Sí', justificacion: 'Sí para el caso base: es una plataforma de activos ligeros (capex del 1,6 % de las ventas) que crece por volumen, con el 51,5 % del mercado mundial de VTC y reservas brutas que crecen al 18-22 % [A4, B15]. El efecto red (más conductores, esperas más cortas) y Uber One sostienen el volumen. La duda no es la calidad sino el coche autónomo: si Waymo y Tesla operan con aplicación propia, el volumen de las grandes ciudades deja de ser de Uber, y eso es el bajista, no el base.' },
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: textos.narrativas[c.escenario] })), ...textos.escenarios, confianza: 'Media' },
  suma_partes: textos.suma_partes,
  valoracion: { rab: null, pesos, referencia_mercado: textos.referencia_mercado, ...textos.valoracion, objetivo_12m: { ...objetivo_12m, ...resumen._objetivo }, confianza: 'Media' },
  transacciones: { operaciones, ...textos.secciones.transacciones },
  ...Object.fromEntries(Object.entries(textos.secciones).filter(([k]) => k !== 'transacciones' && k !== 'bolsa')),
  resumen: Object.fromEntries(Object.entries(resumen).filter(([k]) => k !== '_objetivo')),
  fuentes: textos.fuentes,
  huecos: [
    { seccion: 'gobierno', campo: 'autocartera', tipo: 'Complemento', intentos: '1) Proxy de 2026, tabla de participaciones: no la recoge; 2) balance del 10-Q del 2T26: sin partida de acciones propias; 3) 10-K de 2025: no detalla el destino de las acciones recompradas', decision: 'Omitido' },
  ],
  huecos_resueltos: [
    { seccion: 'gobierno', campo: 'accionistas: autocartera' },
    { seccion: 'identificacion', campo: 'proximos_resultados' },
    { seccion: 'identificacion / bolsa', campo: 'free_float_pct y posicion_corta_pct' },
    { seccion: 'transacciones', campo: 'múltiplos de Careem, Postmates, Wolt, JET, Deliveroo, FreeNow y Trendyol Go' },
  ],
  _parches: [
    ...parchesNoRec,
    { ruta: 'financieros.ltm.no_recurrentes_en_ebitda', valor: noRecurrentes.LTM },
    { ruta: 'multiplos_historicos.serie[0].excluir', valor: true },
    { ruta: 'multiplos_historicos.serie[1].excluir', valor: true },
  ],
};
