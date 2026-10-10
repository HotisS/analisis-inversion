// Parte del analista (Auto Trader, corte 2026-10-10). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-10', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
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
      { periodo: 'FY2027e', volumen_pct: -1.5, precio_pct: 3.0, otros_pct: 2.1, comentario: 'Guía: forecourts −1-2 %, palanca de precio +85-95 GBP (≈3 % del ARPR), producto y stock +35 GBP netos y Autorama con ≈40 M de ventas de vehículos [A2].' },
      { periodo: 'FY2028e', volumen_pct: 0.0, precio_pct: 2.8, otros_pct: 1.7, comentario: 'Forecourts estables y precio en línea con FY2023-FY2026 (+78-117 GBP al año) [A2-A4].' },
      { periodo: 'FY2029e', volumen_pct: 0.5, precio_pct: 2.8, otros_pct: 1.7, comentario: 'Producto (Deal Builder, Co-Driver) como en FY2025-FY2026 (+72-77 GBP) [A2, A3].' },
    ], mercado_final: null, veredicto: T.sostenibilidad_veredicto ?? null, justificacion: T.sostenibilidad_justificacion ?? null },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Autorama pesa el 6 % de los ingresos y apenas aporta beneficio, y desde FY2027 la empresa reporta un único segmento [A2].', confianza: 'Alta' },
  valoracion: {
    // Recompras desde el balance (279,9 M con el timbre) y el dividendo final de 7,8 p pagado en septiembre (≈ 60 M) [D9, A2].
    puente: { otros_ajustes: 340.0 },
    pesos,
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
