// Parte del analista (Harbour Energy, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Cifras en millones de USD; la acción cotiza en peniques (GBp): tipo de cambio 0,013307 USD por penique (GBPUSD 1,3307,
// Yahoo, 19-oct-2026 15:47 UTC).
import { serie, anio } from './modelo.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100, r3 = (x) => Math.round(x * 1000) / 1000;
const n2 = (x) => String(x).replace('.', ',');
const ING_2025 = 10261; // ingresos y otros ingresos de 2025 [A2]
export const TC = 0.013307;
export const PRECIO_GBP = 296.4;
export const PRECIO = Math.round(PRECIO_GBP * TC * 10000) / 10000; // 3,9442 USD

// ── DCF: diez años del modelo de producción × precio (caso base) ──
const base = serie('Base'), baj = serie('Bajista'), alc = serie('Alcista');
let ant = ING_2025;
const anios = base.map((f, i) => {
  const o = {
    periodo: `${f.anio}e`, crecimiento_pct: r1((f.ingresos / ant - 1) * 100), margen_ebitda_pct: r1(f.margen),
    amortizacion_pct_ventas: r1((f.amort / f.ingresos) * 100), capex_pct_ventas: r1((f.capex / f.ingresos) * 100),
    nwc_pct_ventas: 9.0, tasa_impositiva_pct: f.tipo_ebit, fijo: i === 0,
  };
  ant = f.ingresos;
  return o;
});
// Escenarios: perfil año a año que reproduce el mazo de precios de cada caso (crecimiento y margen del EBITDA ajustado
// para que el EBIT del motor coincida con el del modelo; la amortización del motor es un % de las ventas).
const perfilDe = (esc) => {
  const out = []; let antE = ING_2025, antB = ING_2025;
  esc.forEach((f, i) => {
    const b = base[i];
    const gE = (f.ingresos / antE - 1) * 100, gB = (b.ingresos / antB - 1) * 100;
    const daPct = (b.amort / b.ingresos) * 100;
    const mObj = (f.ebit / f.ingresos) * 100 + daPct; // margen que da el EBIT del modelo con la amortización del motor
    if (i > 0) out.push({ periodo: `${f.anio}e`, crecimiento_pp: r1(gE - gB), margen_pp: r1(mObj - b.margen) });
    antE = f.ingresos; antB = b.ingresos;
  });
  return out;
};
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: perfilDe(baj) },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: perfilDe(alc) },
];
// Puente de ingresos (2026e-2030e): volumen = producción; otros = coberturas y otros ingresos; precio = el resto.
const PRODA = { 2025: 474 };
const puente_ingresos = base.slice(0, 5).map((f, i) => {
  const prev = i === 0 ? null : base[i - 1];
  const kbAnt = i === 0 ? 474 * 365 / 1000 : prev.kb;
  const vol = (f.kb / kbAnt - 1) * 100;
  const cobAnt = i === 0 ? -150 : ({ 2026: -1250, 2027: -1415, 2028: -200, 2029: 0 })[f.anio - 1] ?? 0; // 2025: ≈ −150 M de coberturas [A2]
  const cob = ({ 2026: -1250, 2027: -1415, 2028: -200, 2029: 0 })[f.anio] ?? 0;
  const ingAnt = i === 0 ? ING_2025 : prev.ingresos;
  const otros = ((cob - cobAnt) / ingAnt) * 100;
  const g = anios[i].crecimiento_pct;
  return { periodo: `${f.anio}e`, volumen_pct: r1(vol), precio_pct: r1(g - r1(vol) - r1(otros)), otros_pct: r1(otros) };
});
void PRODA;

// ── BPA (ajustado, menos el cupón de los híbridos, por acción económica) ──
export const BPA = { e2026: r3(base[0].bpa), e2027: r3(base[1].bpa), Bajista: r3(baj[2].bpa), Base: r3(base[2].bpa), Alcista: r3(alc[2].bpa) };
export const BPA_NTM = r3(0.2 * BPA.e2026 + 0.8 * BPA.e2027);
// Historia ADELANTADA en USD (cierre en peniques × GBPUSD del día ÷ BPA ajustado del año siguiente) [D1, A2, A4, A6].
const cierres = { 2021: 354 * 1.3498 / 100, 2022: 304.4 * 1.2056 / 100, 2023: 308.6 * 1.2734 / 100, 2024: 255.4 * 1.2549 / 100, 2025: 196.6 * 1.3467 / 100 };
const bpaAj = { 2021: 0.116, 2022: 1.62, 2023: 0.12, 2024: 0.33, 2025: 0.31, 2026: BPA.e2026 };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const usados = adel.filter(([a]) => a >= '2023').map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const usadosV2 = alCierre.filter(([a]) => a >= '2024').map((x) => x[1]).sort((a, b) => a - b);
const med = (l) => (l.length % 2 ? l[(l.length - 1) / 2] : (l[l.length / 2 - 1] + l[l.length / 2]) / 2);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / BPA.e2027), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: r1(med(usados)), minimo_5a: usados[0], media_larga: r1(usados.reduce((s, x) => s + x, 0) / usados.length), adel,
  v2: { mediana_5a: r1(med(usadosV2)), minimo_5a: usadosV2[0], media_larga: r1(usadosV2.reduce((s, x) => s + x, 0) / usadosV2.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${n2(p)}x`).join('; ');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'GBp', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en el Reino Unido', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    // Tasa libre: bono del Tesoro a 10 años del 16-oct-2026 (5,09 %) [P3]; beta semanal ajustada de 5 años 0,90 [D1];
    // prima de mercado 5,5 %; prima adicional del 1 % (régimen fiscal británico cambiante, reservas cortas, papel pendiente).
    // Deuda: 4,8 % de coste medio + 0,8 de margen nuevo ≈ 5,6 %; escudo fiscal del 45 % (40 % en el Reino Unido, 78 % en
    // Noruega, 21-23 % en EE. UU., ponderado por deuda local); peso del 35 % (deuda neta + híbridos ≈ 7.200 M frente a
    // ≈ 14.000 M de valor de empresa a precios de mercado).
    wacc: { tasa_libre_pct: 5.09, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.6, tasa_impositiva_pct: 45, peso_deuda_pct: 35 },
    terminal: { metodo: 'gordon', crecimiento_pct: -2.0, multiplo_salida: 3.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: todos los negocios son producción de petróleo y gas con el mismo motor (precio × volumen − impuesto). La diferencia entre países es el régimen fiscal (78 % en el Reino Unido y Noruega, ≈ 23 % en EE. UU., 35-45 % en Argentina), que ya recoge el tipo medio del DCF; el CCS (Viking, Greensand) no tiene ingresos y su valor es una opción sin cifras públicas fiables [A1].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: deuda financiera bruta 7.011 (bonos 4.826 + préstamo a plazo 992 + puente 995 + comisiones
    // 198 por amortizar); arrendamientos 855; caja 1.643; bonos subordinados híbridos 2.044 como derechos por delante del
    // accionista (`minoritarios`); pensiones 27; asociadas 47.
    // otros_ajustes = desmantelamiento 7.423 × (1 − 39 % de desgravación) ≈ 4.528 + contraprestación contingente 68
    //   + impuesto corriente a pagar por encima del de cierre de 2025 (2.327 − 1.452 = 875: impuesto de beneficios ya ganados)
    //   + salidas netas de caja después del 30-jun (compra a BASF 190 + recompra en mercado ≈ 81 + dividendo de septiembre 150
    //   − caja neta de Waldorf ≈ 240) ≈ 181 → 5.652.
    puente: { fecha: '2026-06-30', deuda_financiera: 7011, arrendamientos: 855, caja: 1643, minoritarios: 2044, pensiones: 27, asociadas: 47, otros_ajustes: 5652 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P4]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en USD y en BPA ajustado (la base de nuestros casos): cierre de cada año en peniques × GBPUSD de ese día [D1] ÷ BPA ajustado del año siguiente [A2, A4, A6]: ${fmt(adel)}. Se excluyen 2021 (BPA de 2022 de 1,62 USD = beneficio de 8 M + 1.469 M del cargo único del EPL, ÷ 912 M: crisis del gas, pico) y 2022 (BPA de 2023 ≈ 0,12, estimado: valle del EPL al 75 %). Quedan tres años (2023, 2024 y 2025, este último ÷ nuestro 2026e de ${n2(BPA.e2026)}): mediana ${n2(PER.mediana_5a)}x, mínimo ${n2(PER.minimo_5a)}x, media ${n2(PER.media_larga)}x. PER actual = ${n2(PRECIO)} USD (296,4 peniques, cierre del 19-oct, × 1,3307) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,2 × 2026e ${n2(BPA.e2026)} + 0,8 × 2027e ${n2(BPA.e2027)}), la misma base que la historia; con solo 2027e sería ${n2(PER.solo_2027)}x y con solo 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre en USD ÷ BPA ajustado del mismo año): ${fmt(alCierre)}. Se excluyen 2021 y 2023 (BPA hundido por el EPL y los deterioros: 41x y 33x) y 2022 (pico del gas, 2,3x); quedan 2024 y 2025.` },
      },
      comparables_per: { mediana: 10.4 },
      consenso: { bpa_ano1: 0.7047, bpa_ano2: 0.647, objetivo_medio: r2(349.02 * TC), objetivo_min: r2(272.77 * TC), objetivo_max: r2(508.37 * TC), analistas: 11, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA 2026e 0,70 y 2027e 0,65 USD, 11 analistas) y Yahoo Finance (objetivo medio de 349 peniques, 272,8-508,4; BPA 2026e 0,863 frente a 0,675 hace 90 días) a 19-oct-2026 [D5, D2]' },
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
    { id: 1, titulo: 'Modelo propio de producción × precio de Harbour (escenarios Bajista, Base y Alcista; calibrado con 2025 y el 1S26)', editor: 'Repositorio de análisis (informes/harbour-energy-2026-10-19/notas/modelo.mjs)', tipo: 'Propia', fecha: '2026-10-19', url: 'informes/harbour-energy-2026-10-19/notas/modelo.mjs' },
    { id: 2, titulo: 'Curvas de futuros a 19-oct-2026: Brent (NYMEX BZ, ene-27 104,9; dic-27 87,0; dic-28 78,3; dic-29 71,5 USD) y TTF (ICE Endex, cal-27 ≈ 71 y cal-28 ≈ 45 EUR/MWh)', editor: 'Yahoo Finance y TradingView', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.tradingview.com/symbols/ICEENDEX-TFM1!/' },
    { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates (10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
    { id: 4, titulo: 'Implied ERP by month (prima implícita del S&P 500, oct-2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Académica', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html' },
    { id: 5, titulo: 'Equinor: análisis value del 15-oct-2026 (mismo sector: tratamiento del impuesto, del beneficio de pico y de la curva)', editor: 'Repositorio de análisis (informes/equinor-2026-10-15)', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/equinor-2026-10-15/' },
  ],
  huecos: [],
};
