// Parte del analista (Uber, corte 2026-10-08). Citas con prefijo de nota: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { A, noRecurrentes, operaciones } from './ajustes.mjs';
import { textos } from './textos.mjs';
import { resumen } from './resumen.mjs';

const parchesNoRec = A.financieros.cuenta.map((c, i) => ({ ruta: `financieros.cuenta[${i}].no_recurrentes_en_ebitda`, valor: noRecurrentes[c.periodo] }));
export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  transacciones: { operaciones, ...textos.secciones.transacciones },
  ...Object.fromEntries(Object.entries(textos.secciones).filter(([k]) => k !== 'transacciones')),
  resumen,
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
