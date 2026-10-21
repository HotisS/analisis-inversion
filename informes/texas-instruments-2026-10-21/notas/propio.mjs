// Parte del analista (Texas Instruments, corte 2026-10-21, tras el 3T26). Rehecho entero con fuentes primarias: el informe del 14-oct
// era un análisis rápido con extractos de búsqueda. Citas con la letra de la nota: [A3] = fuente 3 de A.json.
// Las secciones de negocio, cuentas, gobierno, bolsa, comparables, ESG y sentimiento salen de las notas A-E.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const PRECIO = 284.65;
const b = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const r1 = (x) => Math.round(x * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Analógico y procesado embebido comparten fábricas, canal de venta y clientes, y la empresa no reparte la deuda ni los costes comunes por segmento: la suma de partes añadiría supuestos sin mejorar la valoración [A1].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-sep-2026 del 8-K del 3T26 [D1]: deuda 650 + 12.905; caja 4.211 + 3.931 de inversiones a corto; pensiones con superávit neto (0).
    // Silicon Labs (≈7.500 M de valor empresa en efectivo, cierre previsto en el 1S27) no va al puente: no ha cerrado.
    puente: { fecha: '2026-09-30', deuda_financiera: 13555, arrendamientos: 0, caja: 8142, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        // Serie adelantada de D (cierre del año ÷ BPA diluido del año siguiente); 2025 = 173,49 ÷ nuestro 2026e (9,04) = 19,2x.
        mediana_5a: 23.4, minimo_5a: 19.2, media_larga: 23.7,
        excluidos: T.per_excluidos ?? null,
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 24.1, minimo_5a: 17.6, media_larga: 25.2, base: 'cierre' },
      },
      comparables_per: { mediana: 19.8 },
      consenso: { bpa_ano1: 10.26, bpa_ano2: 12.05, objetivo_medio: 324.71, objetivo_min: 225, objetivo_max: 400, analistas: 36, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA, 34 analistas) y S&P Global vía Stock Analysis (objetivos, 36 analistas), 20-21 oct 2026, antes del 3T26 [D6, D7]' },
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
  fuentes: T.fuentes ?? [{ id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html' }],
  huecos: T.huecos ?? [],
};
