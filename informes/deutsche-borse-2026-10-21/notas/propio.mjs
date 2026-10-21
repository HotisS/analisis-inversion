// Parte del analista (Deutsche Börse, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';
import * as N from './nuevo.mjs';
import { readFileSync } from 'node:fs';

// Segmentos: descripciones de B y serie 2022-2025 de A (las cifras de 2024-2025 coinciden en las dos notas).
const nota = (l) => JSON.parse(readFileSync(new URL(`./${l}.json`, import.meta.url), 'utf8'));
const segA = nota('A').negocio.segmentos;
const segmentos = nota('B').negocio.segmentos.map((s) => ({ ...s, historico: segA.find((a) => a.nombre === s.nombre)?.historico ?? s.historico }));

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: N.limitaciones,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  // 21-oct: las secciones de cuentas, negocio, gobierno y mercado salen de las notas A-E rehechas con fuentes primarias;
  // del analista quedan rentabilidad, catalizadores, riesgos y preguntas.
  negocio: { segmentos },
  rentabilidad: N.rentabilidad, catalizadores: N.catalizadores, riesgos: N.riesgos, preguntas: N.preguntas,
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: N.dcf_justificacion,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: N.puente_comentarios[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: N.sostenibilidad_justificacion,
    },
    lectura: N.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: N.narrativas[c.escenario] })), comentario: N.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: N.suma_partes_comentario, confianza: 'Media' },
  valoracion: {
    // Puente a 30-sep-2026 de D (ESTIMACIONES: el estado del 3T26 solo da un balance resumido): bonos ≈ 6.887 M + pagarés de 1.932 M
    // (jun-26), caja libre ≈ 3.820 M (desde la deuda neta para el rating), arrendamientos y asociadas de jun-26, minoritarios de sep-26 [D, A].
    puente: { fecha: '2026-09-30', deuda_financiera: 8819, arrendamientos: 523, caja: 3820, minoritarios: 402, pensiones: 15, asociadas: 478, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, oct-2026 [P1]' },
    pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: T.objetivo_12m ?? null,
    comentario: N.valoracion_comentario,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: [],
};
