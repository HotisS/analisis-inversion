// Parte del analista (Auto Trader, corte 2026-11-13). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-11-13', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en el Reino Unido', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: { puente_ingresos: [
      { periodo: 'FY2027e', volumen_pct: -2.0, precio_pct: 3.9, otros_pct: -1.1, comentario: 'Forecourts medios −2,3 % en el 1S27 y en recuperación (13.600 → 13.900); palanca de precio +117 GBP (≈3,9 % del ARPR); stock (−89 GBP) y producto (+15) netos negativos y venta de vehículos de ≈25 M frente a 29,6 M [A16].' },
      { periodo: 'FY2028e', volumen_pct: 0.0, precio_pct: 2.8, otros_pct: 1.7, comentario: 'Forecourts estables (13.900 en sep-26, por encima de la media del 1S) y precio en línea con FY2023-FY2027 (+78-117 GBP al año) [A2-A4, A16].' },
      { periodo: 'FY2029e', volumen_pct: 0.5, precio_pct: 2.8, otros_pct: 1.7, comentario: 'Producto (Deal Builder en todos los clientes al cierre de FY2027, Buying Signals, Autotrader Intelligence) por debajo de FY2025-FY2026 (+72-77 GBP) [A2, A3, A16].' },
    ], mercado_final: null, veredicto: T.sostenibilidad_veredicto ?? null, justificacion: T.sostenibilidad_justificacion ?? null },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Autorama pesa el 6 % de los ingresos y apenas aporta beneficio, y desde FY2027 la empresa reporta un único segmento [A2].', confianza: 'Alta' },
  valoracion: {
    pesos,
    objetivo_12m: T.objetivo_12m ?? null,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
