// Parte del analista (RELX, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import * as S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const fuentes = [
  { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026 (valor recogido en verticales/empresa/lecciones.md)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 2, titulo: 'UK 10-year gilt yield (curva diaria del Banco de Inglaterra)', editor: 'thetrading.tools / Bank of England', tipo: 'Datos de mercado', fecha: '2026-08-19', url: 'https://www.thetrading.tools/uk-10-year-yield' },
  { id: 3, titulo: 'Sterling breaks 1.3500 as Britain\'s long gilt hits a 1998 high (gilt a 10 años 5,29 %)', editor: 'TradingNews', tipo: 'Prensa', fecha: '2026-09-02', url: 'https://www.tradingnews.com/news/sterling-breaks-13500-as-britains-5-percent-long-gilt-hits-1998-high' },
  { id: 4, titulo: 'Are LSEG and RELX stocks really «AI losers»?', editor: 'Morningstar', tipo: 'Analistas', fecha: '2026', url: 'https://global.morningstar.com/en-gb/stocks/are-lseg-relx-stocks-really-ai-losers' },
];

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UK-adopted)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal, mitad_de_anio: true,
    etapa2: { ...S.etapa2, justificacion: null },
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Deuda neta publicada a 30-jun-26 (incluye arrendamientos). Acciones del 9-oct: se suma la recompra pagada en el 2S26 hasta esa fecha
    // (unos 17,7 M de acciones a ~26 GBP ≈ 460 M, estimación propia: 82,7 M compradas en el año menos ~65 M del 1S por 1.750 M).
    puente: { fecha: '2026-06-30', deuda_financiera: 8733, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 460 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: S.pesos,
    objetivo_12m: T.objetivo_12m ?? null,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  fuentes,
  huecos: T.huecos ?? [],
};
