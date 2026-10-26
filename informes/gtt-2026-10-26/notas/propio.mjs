// Parte del analista (GTT, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import S from './supuestos.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const BPA_2027 = 11.81; // BPA propio de 2027e (supuestos.mjs)

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 92.0, arrendamientos: 12.7, caja: 381.9, minoritarios: 1.5, pensiones: 3.0, asociadas: 14.2, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa_12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        ...S.per_historico, actual: Math.round((BOLSA.identificacion.precio / BPA_2027) * 100) / 100, excluidos: T.per_excluidos ?? null,
      },
      comparables_per: { mediana: S.comparables_per },
      consenso: { bpa_ano1: 11.23, bpa_ano2: 12.08, objetivo_medio: 234.25, objetivo_min: 184, objetivo_max: 275, analistas: 12, tendencia_3m: 'estables', fuente: 'MarketScreener, 12 analistas, sin actualizar tras el 3T (BPA 2026e-2027e y objetivos) [D2, D3]; Investing (10/1/1, objetivo 232,08) [D23]; Bernstein 245 → 210 el 26-oct [D22]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
