// Parte del analista (Salesforce, corte 2026-10-12). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }
let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; R = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 1, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [
    // BPA GAAP del consenso FY2027e sin las plusvalías de inversiones estratégicas ya contabilizadas en el 1S27 (2,87 USD por acción) [D]
    { ruta: 'consenso.estimaciones[0].bpa', valor: 7.58 },
    // EBITDA de MarketScreener en la base del informe: en FY2026 16.100 M frente a 11.218 M de EBITDA GAAP propio = 11,8 % de las ventas
    { ruta: 'consenso.ajuste_ebitda_pct_ventas', valor: 11.8 },
    // Puente: compras de septiembre pagadas en efectivo (5.100 M) + caja estacional del 1S que revierte antes de enero (≈1.900 M)
    { ruta: 'valoracion.puente.otros_ajustes', valor: 7000 },
    ...(T.parches ?? []),
  ],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Salesforce reporta un único segmento operativo y sus líneas de servicio (ventas, servicio, plataforma, marketing, integración y análisis) comparten clientes, contratos y fuerza comercial; no tienen márgenes separados ni comparables puros [A1].', confianza: 'Media' },
  valoracion: {
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: R.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
