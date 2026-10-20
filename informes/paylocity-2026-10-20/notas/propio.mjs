// Parte del analista (Paylocity, corte 2026-10-20). Citas con la letra de la nota: [A2] = fuente 2 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA GAAP (pagos en acciones como coste real, como en el informe de Paycom [P2]) con la proyección del DCF:
//   (ventas × (margen EBITDA − amortización) + resultado financiero ≈ 1 M) × (1 − 27 % de impuesto) ÷ acciones diluidas.
// Calibrado con FY2026 real: 1.771,3 × (28,1 − 6,3) % + 1,3 = 387,3 M de BAI; con el 30,4 % real de impuesto, 4,92 USD
// (publicado 4,92). El 27 % de la proyección es el de FY2025 (26,5 %) y el normal sin el déficit fiscal de los pagos en
// acciones de FY2026 (la cotización cayó a 104 USD) [A1, A7].
// Acciones: 53,06 M en circulación el 29-jul-2026 [A1] + ≈ 0,4 M de dilución = 53,5 M en FY2027e y 53,9 M en FY2028e
// (≈ 0,4 M al año de acciones nuevas por los pagos en acciones), SIN recompras no anunciadas (quedan ≈ 1.300 M autorizados).
const VENTAS_FY26 = 1771.3, TAX = 0.27, FIN = 1.0;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, margen, amort, acc) => r2(((v * (margen - amort) / 100 + FIN) * (1 - TAX)) / acc);
const a0 = S.anios[0], a1 = S.anios[1];
const v27 = VENTAS_FY26 * (1 + a0.crecimiento_pct / 100);
const caso = (dg, dm) => bpa(v27 * (1 + (a1.crecimiento_pct + dg) / 100), a1.margen_ebitda_pct + dm, a1.amortizacion_pct_ventas, 53.9);
const bpa27 = bpa(v27, a0.margen_ebitda_pct, a0.amortizacion_pct_ventas, 53.5);
const bajG = S.casos[0].ajuste_crecimiento_pp, bajM = S.casos[0].ajuste_margen_pp, altG = S.casos[2].ajuste_crecimiento_pp, altM = S.casos[2].ajuste_margen_pp;
export const BPA = { FY2027: bpa27, Bajista: caso(bajG, bajM), Base: caso(0, 0), Alcista: caso(altG, altM) };
BPA.FY2028 = BPA.Base;

// Historia del PER en BPA GAAP diluido publicado [A1, A7]; cierres a 30 de junio [D1].
const cierres = { FY2018: 58.86, FY2019: 93.82, FY2020: 145.89, FY2021: 190.8, FY2022: 174.42, FY2023: 184.53, FY2024: 131.85, FY2025: 181.19, FY2026: 104.53 };
const bpaG = { FY2018: 0.70, FY2019: 0.97, FY2020: 1.15, FY2021: 1.26, FY2022: 1.61, FY2023: 2.49, FY2024: 3.63, FY2025: 4.02, FY2026: 4.92, FY2027: BPA.FY2027 };
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaG[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaG[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 166.17;
// PER actual en la MISMA base que la historia: a 20-oct-2026 quedan 8,3 meses de FY2027 y entran 3,7 de FY2028.
export const BPA_NTM = r2(8.3 / 12 * BPA.FY2027 + 3.7 / 12 * BPA.FY2028);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / BPA.FY2027), solo_fy2028: r1(PRECIO / BPA.FY2028),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER }, null, 1));

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo segmento (software de nóminas y RR. HH. en la nube) [A1]. Los intereses de los fondos de clientes no son un negocio separable: nacen de la misma nómina y se valoran dentro del DCF con su sensibilidad a los tipos (sección 22).', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A1]: deuda financiera 81,3 (línea revolving); caja corporativa 271,9. Los fondos de clientes
    // (3.210,5) y las obligaciones con clientes (3.209,0) se compensan y quedan fuera: no son de los accionistas.
    // Arrendamientos operativos fuera (US GAAP: su gasto ya está en el EBITDA). Sin minoritarios, pensiones ni asociadas.
    puente: { fecha: '2026-06-30', deuda_financiera: 81.3, arrendamientos: 0, caja: 271.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA GAAP diluido (la misma base que nuestros casos, con los pagos en acciones como coste): precio de cierre de cada ejercicio (30 de junio, Yahoo [D1]) ÷ BPA GAAP real del ejercicio siguiente [A1, A7]; para el cierre de FY2026 (104,53 USD), ÷ nuestro FY2027e (${n2(bpa27)}). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de FY2019-FY2026. Sin exclusiones; FY2017 fuera porque su BPA (0,12 USD) no es significativo. La serie está inflada al principio (FY2019-FY2021, 80-120 veces) por un BPA GAAP pequeño y la burbuja del software de 2020-2021; la regla lo acota con el techo del alcista (base × 1,35). PER actual = precio (166,17 USD, cierre del 19-oct-2026) ÷ nuestro BPA GAAP de los próximos 12 meses (${n2(BPA_NTM)} = 8,3/12 de FY2027e ${n2(bpa27)} + 3,7/12 de FY2028e ${n2(BPA.FY2028)}). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x. El consenso (8,74 y 9,72 USD) es BPA no GAAP (sin pagos en acciones ni amortización de intangibles): no es comparable con esta serie.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA GAAP del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026.` },
      },
      comparables_per: { mediana: 16.8 },
      consenso: { bpa_ano1: 8.74, bpa_ano2: 9.72, objetivo_medio: 172.6, objetivo_min: 128, objetivo_max: 250, analistas: 20, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 20-oct-2026: BPA NO GAAP FY2027 de 8,74 USD (8,69 hace 90 días) y FY2028 de 9,72 (9,64 hace 90 días); objetivo medio de 20 analistas [D2]' },
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
    { id: 1, titulo: 'Nóminas, HCM y PEO (EE. UU.): ficha sectorial corta (perímetro, cuotas, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/nominas-rrhh-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/nominas-rrhh-2026-10-15.md' },
    { id: 2, titulo: 'Paycom, ADP y Paychex: análisis value del 15-oct, 15-oct y 12-oct-2026 (mismo sector; base GAAP, comparables, riesgos de IA y de tipos)', editor: 'Repositorio de análisis (informes/paycom-2026-10-15, informes/adp-2026-10-15, informes/paychex-2026-10-12)', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/paycom-2026-10-15/' },
    { id: 3, titulo: 'Sensibilidad propia de los intereses de fondos de clientes a los tipos (saldo medio 3.400-3.500 M USD [A8] × variación del tipo a corto, después del 27 % de impuesto y ÷ 53,5 M de acciones)', editor: 'Cálculo propio', tipo: 'Propia', fecha: '2026-10-20', url: null },
  ],
  huecos: [],
};
