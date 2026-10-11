// Parte del analista (Nemetschek, corte 2026-10-10). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { anios, wacc, terminal, etapa2, casos, pesos, minoritarios_build } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const B = JSON.parse(readFileSync(fileURLToPath(new URL('./bolsa_mdax.json', import.meta.url)), 'utf8'));

export default {
  meta: {
    fecha_corte: '2026-10-10', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  identificacion: { indice_referencia: 'MDAX (también en el TecDAX)', capitalizacion_publicada: null },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  bolsa: {
    tipo_rentabilidad: B.bolsa.tipo_rentabilidad,
    rentabilidades: B.bolsa.rentabilidades,
    anual: B.bolsa.anual,
    beta: B.betas.mensual_5a,
    volatilidad_pct: B.bolsa.volatilidad_pct,
    max_drawdown_pct: B.bolsa.max_drawdown_pct,
    posicion_corta_pct: null,
    comentario: T.bolsa_comentario ?? null,
    confianza: 'Alta',
  },
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 504.8, arrendamientos: 45.5, caja: 392.1, minoritarios: Math.round((37.6 + minoritarios_build) * 10) / 10, pensiones: 2.4, asociadas: 26.4, otros_ajustes: 450.0 },
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
