// Parte del analista (Moncler, corte 2026-10-21, tras las ventas de los nueve meses). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
// Las secciones de historia, negocio, cuentas, gobierno, bolsa, comparables, ESG y sentimiento salen de las notas A-E (fuentes primarias).
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const PRECIO = 42.94;
const b = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const r1 = (x) => Math.round(x * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  // Regla 13: D marca «retrasa» hasta el cierre del 22-oct (primera sesión con las ventas del 3T); se respeta: con señal de compra, la reacción cuenta.
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
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
  escenarios: { casos: S.casos.map(({ perfil, ...c }) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Moncler y Stone Island son el mismo negocio (ropa de lujo con venta directa) y comparten estructura; Stone Island pesa un 13 % de las ventas.', confianza: 'Alta' },
  valoracion: {
    // Caja neta sin arrendamientos a 30-jun-2026 (después del dividendo de mayo) y arrendamientos de esa fecha [A2, A23].
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 1198.6, caja: 1112.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D13]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        // Cierre del año ÷ BPA real del año siguiente [D4-D6]: 2021 28,6; 2022 21,9; 2023 23,6; 2024 22,1; 2025 = 54,92 ÷ 2,31 (nuestro 2026e) = 23,8.
        mediana_5a: 23.6, minimo_5a: 21.9, media_larga: 24.0,
        excluidos: '2020 (BPA de 2021 atípico: nueve meses de Stone Island y la reapertura). Adelantado = cierre del año ÷ BPA real del año siguiente: 2021 28,6x; 2022 21,9x; 2023 23,6x; 2024 22,1x; 2025 23,8x (54,92 ÷ 2,31, nuestro BPA de 2026e). Actual = 42,94 ÷ 2,40 (nuestro BPA de 2027e).',
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 22.9, minimo_5a: 21.6, media_larga: null, base: 'cierre' },
      },
      comparables_per: { mediana: 24.9 },
      consenso: { bpa_ano1: 2.352, bpa_ano2: 2.552, objetivo_medio: 58.74, objetivo_min: 46.6, objetivo_max: 70, analistas: 25, tendencia_3m: 'recortes', fuente: 'MarketScreener e Investing, 21-oct-2026, antes de las ventas del 3T [D7-D9]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
