// Parte del analista (Constellation Software, corte 2026-10-10). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-10', divisa: 'USD', divisa_cotizacion: 'CAD', tipo_cambio: 0.7007, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IASB)', formato_cuenta: 'naturaleza',
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
      { periodo: '2026e', volumen_pct: 3.0, precio_pct: 0.0, otros_pct: 15.9, comentario: 'Orgánico del 2-4 % (la empresa no separa precio y volumen) y compras del 1S26 más 818 M comprometidos después [A9, B2, D2].' },
      { periodo: '2027e', volumen_pct: 3.0, precio_pct: 0.0, otros_pct: 11.0, comentario: 'Orgánico como en 2024-2025 y compras de ≈2.000 M, el FCFA2S de un año [A10].' },
      { periodo: '2028e', volumen_pct: 3.0, precio_pct: 0.0, otros_pct: 9.0, comentario: 'Las compras crecen menos que el grupo: el crecimiento comprado baja [A1].' },
    ], mercado_final: { periodo: '2031e', tamano: 282980 }, veredicto: T.sostenibilidad_veredicto ?? null, justificacion: T.sostenibilidad_justificacion ?? null },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Constellation reporta un único segmento (NIIF 8) y sus seis grupos operativos no publican cifras propias; Topicus y Lumine, las dos filiales cotizadas, entran en el puente con los minoritarios a valor de mercado [B1, D1].', confianza: 'Alta' },
  valoracion: {
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
