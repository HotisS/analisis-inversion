// Parte del analista (Apple, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA DILUIDO PUBLICADO (US GAAP; Apple no publica uno ajustado) con la proyección del DCF:
//   BPA = (ventas × (margen EBITDA − amortización) + otros ingresos ≈ 1.200 M) × (1 − 17,5 %) ÷ acciones diluidas medias.
// Calibrado con FY2025 real (416.161 × (34,78 − 2,81) % − 321 → 132.729 × (1 − 15,6 %) ÷ 15.005 = 7,46 = publicado) y con
// FY2026e (9M reales + guía del 4T: 8,86 frente a 8,82 del consenso).
// Acciones: 14.594 M en circulación el 17-jul-2026 + 58 M de dilución = 14.652 M; las recompras YA AUTORIZADAS que quedaban
// (≈ 118.000 M USD al cierre de FY2026: 138.000 en junio menos ≈ 20.000 del 4T) a ≈ 340 USD retiran ≈ 347 M de acciones,
// ≈ 265 M en FY2027 y el resto a comienzos de FY2028; emisión neta por acciones de empleados ≈ +50 M al año.
// → media de FY2027e 14.550 M y de FY2028e 14.400 M, SIN recompras no autorizadas.
const ACC27 = 14550, ACC28 = 14400, OTROS = 1200, TAX = 0.175;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const V26 = 416161 * (1 + S.anios[0].crecimiento_pct / 100);
const bpa = (v, margen, am, acc) => r2(((v * (margen - am) / 100 + OTROS) * (1 - TAX)) / acc);
const caso = (dg, dm) => {
  const v27 = V26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return { FY2027: bpa(v27, S.anios[1].margen_ebitda_pct + dm, S.anios[1].amortizacion_pct_ventas, ACC27), FY2028: bpa(v28, S.anios[2].margen_ebitda_pct + dm, S.anios[2].amortizacion_pct_ventas, ACC28) };
};
const cB = S.casos;
export const CASOS = { Bajista: caso(cB[0].ajuste_crecimiento_pp, cB[0].ajuste_margen_pp), Base: caso(0, 0), Alcista: caso(cB[2].ajuste_crecimiento_pp, cB[2].ajuste_margen_pp) };
export const BPA26 = 8.86;

// Historia del PER ADELANTADA en BPA diluido publicado [A1, A7]: cierre de cada ejercicio (Yahoo [D1]) ÷ BPA real del
// ejercicio siguiente. FY2024 normalizado sin el cargo fiscal único de las ayudas de Estado (10.200 M; 6,08 → 6,75) [A1].
const cierres = { FY2018: 56.24, FY2019: 54.71, FY2020: 112.28, FY2021: 145.37, FY2022: 151.76, FY2023: 170.43, FY2024: 227.79, FY2025: 255.46, FY2026: 341.07 };
const bpaReal = { FY2019: 2.97, FY2020: 3.28, FY2021: 5.61, FY2022: 6.11, FY2023: 6.13, FY2024: 6.75, FY2025: 7.46, FY2026: BPA26, FY2027: CASOS.Base.FY2027 };
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
const u8 = adel.slice(-8).map((x) => x[1]);
const bpaCierre = { FY2018: 2.98, FY2019: 2.97, FY2020: 3.28, FY2021: 5.61, FY2022: 6.11, FY2023: 6.13, FY2024: 6.75, FY2025: 7.46, FY2026: BPA26 };
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaCierre[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
export const PRECIO = 339.5;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 11,1 meses de
// FY2027 (cierra el 25-sep-2027) y entran 0,9 de FY2028.
export const BPA_NTM = r2(11.1 / 12 * CASOS.Base.FY2027 + 0.9 / 12 * CASOS.Base.FY2028);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([x, p]) => `${x} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Apple publica el margen bruto de Productos y de Servicios pero no su resultado operativo, y los dos negocios comparten clientes, I+D y la misma base instalada (Servicios no existe sin el iPhone). Una suma de partes exigiría repartir a mano 62.000 M de I+D y gastos generales.', confianza: 'Media' },
  valoracion: {
    // Puente a 27-jun-2026 [A2]: deuda financiera 84.344 (pagarés 1.997 + bonos 11.007 + 71.340); arrendamientos financieros
    // 1.230 (27-sep-2025 [A1]; los operativos fuera, US GAAP); caja = efectivo 39.544 + valores negociables 106.973 = 146.517.
    // otros_ajustes = recompras entre el balance (14.609 M acciones) y la portada (14.594 M a 17-jul): ≈ 15 M × ≈ 305 USD ≈ 4.600
    // + condena Taction de 5.722 M al 50 % de probabilidad y después de impuestos (× 0,79) ≈ 2.260 → 6.860.
    puente: { fecha: '2026-06-27', deuda_financiera: 84344, arrendamientos: 1230, caja: 146517, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 6860 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: CASOS[e].FY2028, multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA diluido publicado (la base de nuestros casos y del consenso): cierre de cada ejercicio (último sábado de septiembre, Yahoo [D1]) ÷ BPA real del ejercicio siguiente [A1, A7]; FY2024 normalizado sin el cargo fiscal único de las ayudas de Estado (6,08 → 6,75 USD [A1]); para el cierre de FY2025, ÷ nuestro FY2026e (${n2(BPA26)}: 9M reales + guía del 4T; consenso 8,82); para el de FY2026 (341,07), ÷ nuestro FY2027e (${n2(CASOS.Base.FY2027)}). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de FY2019-FY2026. Sin exclusiones: no hay pérdidas ni PER ≥ 150x. PER actual = precio (339,50 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 11,1/12 de FY2027e + 0,9/12 de FY2028e).`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA del mismo ejercicio; FY2024 normalizado): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026.` },
      },
      comparables_per: { mediana: 19.4 },
      consenso: { bpa_ano1: 9.56, bpa_ano2: 10.81, objetivo_medio: 328.35, objetivo_min: 215, objetivo_max: 405, analistas: 39, tendencia_3m: 'estables', fuente: 'Yahoo Finance, 21-oct-2026: BPA FY2027 de 9,56 USD (40 analistas; 9,71 hace 90 días); MarketScreener: FY2028 de 10,81; objetivo medio de 39 analistas [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Google search antitrust: DOJ urges D.C. Circuit to beef up remedies (prohibición de pagos a distribuidores como Apple)', editor: 'Courthouse News Service', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.courthousenews.com/doj-urges-dc-circuit-to-beef-up-remedies-in-google-monopoly-ruling/' },
    { id: 2, titulo: 'Apple dodged a $20 billion hit, thanks to Google antitrust ruling (pagos de Google de ≈ 20.000 M USD en 2022, documentos del juicio)', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2025-09-03', url: 'https://finance.yahoo.com/news/apple-dodged-a-20-billion-hit-thanks-to-google-antitrust-ruling-163056806.html' },
    { id: 3, titulo: 'Jury orders Apple to pay $5.7 billion in Taction haptic patent case', editor: 'iClarified', tipo: 'Prensa', fecha: '2026-09-27', url: 'https://www.iclarified.com/102435/jury-orders-apple-to-pay-57-billion-in-taction-haptic-patent-case' },
    { id: 4, titulo: 'Apple shares sink as memory crunch clouds record quarter', editor: 'ChannelNews', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.channelnews.com.au/apple-shares-sink-as-memory-crunch-clouds-record-quarter/' },
    { id: 5, titulo: 'Apple Down over 6%, Worst Performer in the S&P 500 and DJIA Today (25-jun-2026)', editor: 'Tiger Brokers (Dow Jones)', tipo: 'Prensa', fecha: '2026-06-25', url: 'https://www.itiger.com/news/2646970386' },
    { id: 6, titulo: 'Apple Stock Jumps 15% as Analysts Lift Targets Before WWDC (Siri AI, Apple Intelligence en China)', editor: 'Gotrade News', tipo: 'Prensa', fecha: '2026-06-05', url: 'https://www.heygotrade.com/en/news/apple-stock-ai-momentum-ahead-of-wwdc/' },
    { id: 7, titulo: 'Seeking Alpha: titulares de AAPL del 12 al 21-oct-2026 (Loop Capital, KeyBanc, iPhone Duo, mercado de smartphones −22 %, CMA y Apple Pay)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://seekingalpha.com/symbol/AAPL/news' },
    { id: 8, titulo: 'Movimiento del precio de AAPL (herramientas/movimiento.mjs, Yahoo)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/AAPL/history' },
    { id: 9, titulo: 'Apple stock just suffered its worst day in 10 months (12-feb-2026: retraso de la Siri nueva y escrutinio de la FTC)', editor: 'Finbold', tipo: 'Prensa', fecha: '2026-02-12', url: 'https://finbold.com/apple-stock-just-suffered-its-worst-day-in-10-months/' },
    { id: 10, titulo: 'Apple partners with Google to use Gemini models for revamped Siri (≈ 1.000 M USD al año según Bloomberg)', editor: 'MobileSyrup', tipo: 'Prensa', fecha: '2026-01-12', url: 'https://mobilesyrup.com/2026/01/12/apple-google-gemini-revamped-siri/' },
  ],
  huecos: [],
};
