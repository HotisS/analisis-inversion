// Parte del analista (Bytes Technology Group, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json;
// [P1] = fuente propia. Millones de GBP; precio y BPA en GBP (Yahoo cotiza en peniques: 450,4 GBp = 4,504 GBP).
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r4 = (x) => Math.round(x * 10000) / 10000;

// BPA propio (diluido, en la base del publicado) con la proyección del DCF:
//   EBIT = ventas × (margen EBITDA − amortización) ; + resultado financiero (intereses de la caja: 7,1 M en el FY2026, 4,7 M
//   netos en el HY27; FY2027e 8,3; menos caja tras CyberOne y dividendos y tipos algo más bajos: 6,0 en el FY2028e y 6,5 en
//   el FY2029e) ; impuesto 25,5 % (25,3 % en el HY27) ; ÷ acciones diluidas: 230,1 M en circulación + 8,3 M de opciones
//   (diluidas ponderadas del HY27 242,5 frente a 234,2 básicas) = 238,4 M, sin recompras no anunciadas (FY2027: 240,5 M de media).
// Cuadre con el FY2026 real: 220,6 × (29,8 % − 1,4 %) = 62,7 + 7,1 = 69,8 × (1 − 26,6 %) = 51,3 ÷ 247,2 = 0,2074 (publicado 0,2074).
const V26 = 220.6, ACC = 238.4;
const g = S.anios.map((a) => a.crecimiento_pct), m = S.anios.map((a) => a.margen_ebitda_pct), am = S.anios.map((a) => a.amortizacion_pct_ventas);
const bpa = (v, marg, amort, fin, acc) => r4((v * (marg - amort) / 100 + fin) * (1 - 0.255) / acc);
const v27 = V26 * (1 + g[0] / 100);
const v29 = (dg) => v27 * (1 + (g[1] + dg) / 100) * (1 + (g[2] + dg) / 100);
export const BPA = {
  FY2027: bpa(v27, m[0], am[0], 8.3, 240.5),
  FY2028: bpa(v27 * (1 + g[1] / 100), m[1], am[1], 6.0, ACC),
  Bajista: bpa(v29(-3.0), m[2] - 2.5, am[2], 6.0, ACC),
  Base: bpa(v29(0), m[2], am[2], 6.5, ACC),
  Alcista: bpa(v29(1.5), m[2] + 1.0, am[2], 7.0, ACC),
};
// Historia del PER adelantado: cierre de febrero ÷ BPA diluido real del ejercicio siguiente [A1-A4, D1]; el último cierre
// (27-feb-2026) ÷ nuestro BPA del FY2027e. FY2021 (cierre del 26-feb-2021, dos meses después de la salida a bolsa) incluido.
const cierres = { FY2021: 4.186, FY2022: 4.604, FY2023: 3.996, FY2024: 5.575, FY2025: 4.194, FY2026: 3.034 };
const bpaReal = { FY2022: 0.1342, FY2023: 0.1628, FY2024: 0.1885, FY2025: 0.2195, FY2026: 0.2074, FY2027: BPA.FY2027 };
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const med = (arr) => { const s = [...arr].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
export const PRECIO = 4.504;
// PER actual en la misma base: a 20-oct-2026 quedan 4,3 meses del FY2027 y entran 7,7 del FY2028.
export const BPA_NTM = r4(4.3 / 12 * BPA.FY2027 + 7.7 / 12 * BPA.FY2028);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), mediana_5a: r1(med(u5)), minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), serie: adel,
};
const compPer = [18.8, 18.1, 16.1, 16.4, 13.9, 12.9, 12.5, 16.0];
export const COMP_MED = r1(med(compPer));

const fuentes = [
  { id: 1, titulo: 'Cálculos propios de la historia del PER adelantado, del BPA de los escenarios y del puente (este expediente: notas/propio.mjs)', editor: 'Análisis propio', tipo: 'Primaria', fecha: '2026-10-20', url: 'informes/bytes-2026-10-20/notas/propio.mjs' },
  { id: 2, titulo: 'Half Year Trading Update (17-sep-2026): guía del FY2027 subida', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-17', url: 'https://www.investegate.co.uk/announcement/rns/bytes-technology-group--byit/half-year-trading-update/9776191' },
  { id: 3, titulo: 'Movimiento del precio de BYIT.L a 20-oct-2026 (herramienta movimiento.mjs) y precio intradía', editor: 'Yahoo Finance (chart API)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/BYIT.L/' },
  { id: 4, titulo: 'Noticias de 12 meses de Bytes (herramienta noticias.mjs: recomendaciones, recompras, resultados)', editor: 'Varios medios (Proactive, Yahoo Finance UK, BusinessCloud, MarketScreener)', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://news.google.com/' },
  { id: 5, titulo: "Bytes Technology Group's share price drops 15% after trading update (24-mar-2026)", editor: 'BusinessCloud', tipo: 'Prensa', fecha: '2026-03-24', url: 'https://businesscloud.co.uk/news/bytes-technology-groups-share-price-drops-15-after-trading-update/' },
  { id: 6, titulo: 'AGM Statement (9-jul-2026): cuatro primeros meses con beneficio bruto de doble dígito y resultado plano', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-07-09', url: 'https://www.investegate.co.uk/announcement/rns/bytes-technology-group--byit/agm-statement/9659644' },
  { id: 7, titulo: 'Transaction in Own Shares (7-8 sep-2026, últimas compras a 404-415 peniques) y cierre de la recompra de 25 M', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://www.investegate.co.uk/announcement/rns/bytes-technology-group--byit/transaction-in-own-shares/9762690' },
];

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones', cierre_ejercicio_mes: 2, etiqueta_ejercicio: 'fin',
    normas_contables: 'NIIF (adoptadas en el Reino Unido)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  identificacion: { precio: PRECIO, fecha_precio: '2026-10-19', acciones: ACC },
  resumen: T.resumen ?? null,
  negocio: { confianza: 'Alta' },
  sector: { confianza: 'Media' },
  competencia: { confianza: 'Media' },
  historia: { confianza: 'Alta' },
  rentabilidad: { comentario: T.rentabilidad ?? null, confianza: 'Media' },
  directivos: { confianza: 'Alta' },
  gobierno: { confianza: 'Alta' },
  consenso: { confianza: 'Media' },
  bolsa: { comentario: T.bolsa_comentario ?? null, contexto: T.contexto ?? null, confianza: 'Alta' },
  multiplos_historicos: { comentario: T.multiplos_comentario ?? null, confianza: 'Media' },
  comparables: { comentario: T.comparables_comentario ?? null, confianza: 'Media' },
  transacciones: { comentario: T.transacciones_comentario ?? null, confianza: 'Baja' },
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal, etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p, i) => ({ ...p, comentario: (T.puente_coment ?? [])[i] ?? null })),
      mercado_final: null,
      veredicto: T.sost_veredicto ?? 'En parte', justificacion: T.sost_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c, i) => ({ ...c, perfil: [], narrativa: (T.narrativas ?? [])[i] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Un solo negocio (reventa de software y servicios con dos marcas por sector); no hay partes con perfiles distintos que valorar por separado.', confianza: 'Alta' },
  valoracion: {
    // Balance de 31-ago-2026 [A5]. otros_ajustes = +19,4 (CyberOne, pago inicial en caja tras el balance) + 9,0 (la mitad
    // del variable máximo de 18,0 M, estimación propia) − 22,4 (circulante estacional consumido en el primer semestre que
    // vuelve en el segundo: −74,3 → −51,9 M entre feb y ago de 2025, el año anterior) = +6,0.
    puente: { fecha: '2026-08-31', deuda_financiera: 0, arrendamientos: 2.1, caja: 68.4, minoritarios: 0, pensiones: 0, asociadas: 3.0, otros_ajustes: 6.0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout); sin dato equivalente para el FTSE', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D14]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2029e', beneficio_por_accion: BPA.Bajista, multiplo: null, precio: null, justificacion: (T.j12 ?? [])[0] ?? null },
        { escenario: 'Base', metrica: 'PER FY2029e', beneficio_por_accion: BPA.Base, multiplo: null, precio: null, justificacion: (T.j12 ?? [])[1] ?? null },
        { escenario: 'Alcista', metrica: 'PER FY2029e', beneficio_por_accion: BPA.Alcista, multiplo: null, precio: null, justificacion: (T.j12 ?? [])[2] ?? null },
      ],
      per_historico: { base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga, excluidos: T.excluidos ?? 'Ninguno: seis cierres de febrero (2021-2026), ninguno con pérdidas ni atípico.' },
      comparables_per: { mediana: COMP_MED },
      consenso: { bpa_ano1: 0.22, bpa_ano2: 0.2421, objetivo_medio: 4.72, objetivo_min: 3.65, objetivo_max: 5.25, analistas: 11, tendencia_3m: 'subidas', fuente: 'MarketScreener e Investing.com, 20-oct-2026 [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.o12_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  esg: { confianza: 'Media' },
  preguntas: T.preguntas ?? null,
  sentimiento: { confianza: 'Baja' },
  huecos: T.huecos ?? [],
  fuentes,
};
