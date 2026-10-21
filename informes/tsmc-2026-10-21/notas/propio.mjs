// Parte del analista (TSMC, corte 2026-10-21, tras el 3T26). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
// Las secciones de historia, negocio, cuentas, gobierno, bolsa, comparables, ESG y sentimiento salen de las notas A-E (fuentes primarias).
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const PRECIO = 2420;
const b = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const r1 = (x) => Math.round(x * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'TWD', divisa_cotizacion: 'TWD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (20-F; TIFRS en los comunicados trimestrales)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'TSMC reporta un único segmento (fabricación por encargo) y todas sus plataformas comparten fábricas, tecnología y clientes: no hay negocios con perfiles distintos que valorar por separado.', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-sep-2026 de D (caja y deuda a largo publicadas; porción corriente reconstruida desde junio; otros_ajustes = dividendo del 1T26 declarado y sin pagar) [D].
    puente: { fecha: '2026-09-30', deuda_financiera: 1030800, arrendamientos: 36882, caja: 4016980, minoritarios: 41953, pensiones: 4892, asociadas: 18126, otros_ajustes: 181527 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, Implied ERP by month [D21]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        // 2021-2025 adelantados de D (15,7 / 13,9 / 13,1 / 16,2) y 2025 = 1.550 ÷ nuestro BPA de 2026e (109,51) = 14,2.
        mediana_5a: 14.2, minimo_5a: 13.1, media_larga: 16.2,
        excluidos: T.per_excluidos ?? null,
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 23.4, minimo_5a: 11.4, media_larga: null, base: 'cierre' },
      },
      comparables_per: { mediana: 22.3 },
      consenso: { bpa_ano1: 110.2, bpa_ano2: 148.1, objetivo_medio: 3387, objetivo_min: 2650, objetivo_max: 5000, analistas: 35, tendencia_3m: 'subidas', fuente: 'MarketScreener y S&P Global (Stock Analysis), 20-21-oct-2026 [D6, D7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
