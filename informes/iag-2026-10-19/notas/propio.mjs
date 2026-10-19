// Parte del analista (IAG, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Cifras en millones de EUR; la acción cotiza en peniques (GBp) en Londres: tipo de cambio 0,01186 EUR por penique
// (GBPEUR 1,186, Yahoo, 19-oct-2026 16:40 UTC). Precio: cierre de Londres del 19-oct-2026 (412,2 peniques, 15:30 UTC).
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r1 = (x) => Math.round(x * 10) / 10, r3 = (x) => Math.round(x * 1000) / 1000;
const n2 = (x) => String(x).replace('.', ',');
export const TC = 0.01186;
export const PRECIO_GBP = 412.2;
export const PRECIO = Math.round(PRECIO_GBP * TC * 10000) / 10000; // 4,8887 EUR

// ── DCF: 2026e-2035e. Margen EBITDA = EBIT publicado (con extraordinarios) + amortizaciones (incluidos derechos de uso).
// Capex = compra de inmovilizado + altas de derechos de uso de aviones arrendados (≈ 500 M al año): con NIIF 16 los
// arrendamientos están en la deuda del puente, y los aviones que entren arrendados son inversión (lección de Aeroméxico).
const g = [2.4, 4.5, 4.0, 3.5, 3.5, 3.0, 3.0, 2.5, 2.5, 2.0];
const m = [20.6, 21.4, 21.4, 20.8, 20.3, 19.8, 19.4, 19.0, 19.0, 19.0];
const am = [8.1, 8.3, 8.6, 8.9, 9.2, 9.4, 9.5, 9.5, 9.5, 9.5];
const cx = [11.5, 15.2, 14.6, 15.5, 15.0, 14.5, 12.0, 11.5, 11.0, 10.5];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -11.0, tasa_impositiva_pct: 25.5, fijo: i === 0,
}));
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -0.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -8.0, margen_pp: -5.0 }, { periodo: '2028e', crecimiento_pp: 2.0, margen_pp: -3.0 }, { periodo: '2029e', crecimiento_pp: 1.0, margen_pp: -2.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 0.0, precio_pct: 2.4, otros_pct: 0.0 },
  { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.5 },
  { periodo: '2028e', volumen_pct: 3.0, precio_pct: 0.5, otros_pct: 0.5 },
  { periodo: '2029e', volumen_pct: 3.0, precio_pct: 0.0, otros_pct: 0.5 },
  { periodo: '2030e', volumen_pct: 3.0, precio_pct: 0.0, otros_pct: 0.5 },
];

// ── BPA antes de extraordinarios (base del BPA ajustado de la empresa y de la historia del PER) ──
// BPA = (ventas × margen EBIT antes de extraordinarios − cargos no operativos netos) × (1 − 26 %) ÷ acciones diluidas.
// Calibrado con 2025 real: 33.213 × 15,1 % − 519 = 4.505 de BAI → 3.342 → 69,5 céntimos sobre 4.808 M ajustadas [A2].
// Acciones diluidas medias: 2026e ≈ 4.600 M (1S con el convertible, 4.786 M; 2S ≈ 4.420 M); 2027e ≈ 4.300 M y 2028e
// 4.263 M = 4.352 M en circulación el 16-oct-2026 − ≈ 89 M del resto del tercer programa (≈ 436 M EUR a 4,89) [A7, A8],
// SIN recompras no anunciadas (la empresa devuelve la caja sobrante cada año: cada 1.000 M recompra ≈ 4,7 % del capital).
const bpa = (ventas, mEbit, noop, acc) => r3(((ventas * mEbit) / 100 - noop) * 0.74 / acc);
const V26 = 33213 * 1.024, V27 = V26 * 1.045;
export const BPA = {
  e2026: bpa(V26, 13.2, 450, 4600),
  e2027: bpa(V27, 13.5, 450, 4300),
  Bajista: bpa(35500, 11.0, 480, 4263),
  Base: bpa(V27 * 1.04, 13.7, 470, 4263),
  Alcista: bpa(37500, 15.0, 450, 4263),
};
export const BPA_NTM = r3(0.2 * BPA.e2026 + 0.8 * BPA.e2027); // a 19-oct quedan 2,4 meses de 2026

// Historia ADELANTADA en EUR (cierre del año ÷ BPA ajustado real del año siguiente) [D1, A2, A5]:
// 2017-2018: cierre de Londres sin ajustar (651 y 618 peniques) ÷ EURGBP de fin de año (0,887 y 0,895); BPA ajustado de 2018
// (117,7 c) y 2019 (116,8 c) del informe de 2019 [P2]. 2021-2025: cierres de Madrid (bolsa.mjs) [D1]. 2019-2020: sin dato útil
// (BPA de 2020 y 2021 en pérdidas). 2021 excluido: BPA de 2022 de recuperación (5,6 c) → 30 veces.
const cierres = { 2017: 6.51 / 0.887, 2018: 6.18 / 0.895, 2021: 1.70, 2022: 1.39, 2023: 1.78, 2024: 3.63, 2025: 4.75 };
const bpaAj = { 2017: null, 2018: 1.177, 2019: 1.168, 2021: -0.59, 2022: 0.056, 2023: 0.506, 2024: 0.568, 2025: 0.695, 2026: BPA.e2026 };
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((a) => [a, r2(cierres[a] / bpaAj[+a + 1])]);
const usados5 = adel.filter(([a]) => a >= '2022').map((x) => x[1]).sort((x, y) => x - y);
const usadosLargo = adel.filter(([a]) => a !== '2021').map((x) => x[1]);
const med = (l) => (l.length % 2 ? l[(l.length - 1) / 2] : (l[l.length / 2 - 1] + l[l.length / 2]) / 2);
const alCierre = [['2018', r2(cierres[2018] / 1.177)], ['2023', r2(1.78 / 0.506)], ['2024', r2(3.63 / 0.568)], ['2025', r2(4.75 / 0.695)]];
const v2_5 = alCierre.filter(([a]) => a >= '2022').map((x) => x[1]).sort((x, y) => x - y);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / BPA.e2027), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: Math.round(med(usados5) * 100) / 100, minimo_5a: usados5[0], media_larga: r1(usadosLargo.reduce((s, x) => s + x, 0) / usadosLargo.length), adel,
  v2: { mediana_5a: med(v2_5), minimo_5a: v2_5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${n2(p)}x`).join('; ');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'EUR', divisa_cotizacion: 'GBp', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    // Tasa libre: Bund a 10 años del 19-oct-2026 (3,49 %) [D4]; beta 1,45 (semanal ajustada de 5 años 1,39; semanal 1,58;
    // mensual 2,18) [D1]; prima del 5,5 %; coste de la deuda del 4,5 % (bonos de 2031 al 3,875 % y 2034 al 4,5 %, arrendamientos
    // y financiación de aviones) [A3]; tipo del 25,5 %; peso de la deuda del 39 % (deuda bruta con arrendamientos de 13.867 M
    // frente a 21.277 M de capitalización).
    wacc: { tasa_libre_pct: 3.49, beta: 1.45, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 39 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 4.5 },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: deuda financiera = bancos y bonos 1.739 + convertible 4 + pasivos financiados con aviones 5.217
    // = 6.960; arrendamientos 6.907; caja y depósitos 9.175; minoritarios 6; pensiones 0 (superávit contable de 2.115 M de BA,
    // no disponible para el accionista: no se suma); asociadas = método de participación 50 + otras inversiones 322 (Air Europa
    // 20 % a valor razonable, 234).
    // otros_ajustes = anticipos estacionales 2.066 (ingresos diferidos de billetes de 10.098 M a 30-jun frente a 8.032 M a
    // 31-dic: la caja de junio está inflada y se vuela en el 2S) + recompras pagadas después del 30-jun (≈ 333 M del segundo
    // programa + ≈ 64 M del tercero hasta el 16-oct ≈ 397 M), coherente con las 4.352 M de acciones del 16-oct.
    puente: { fecha: '2026-06-30', deuda_financiera: 6960, arrendamientos: 6907, caja: 9175, minoritarios: 6, pensiones: 0, asociadas: 372, otros_ajustes: 2463 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en EUR y en BPA ajustado antes de extraordinarios (la base de nuestros casos y del consenso): cierre de cada año ÷ BPA ajustado real del año siguiente [D1, A2, A5, P2]: ${fmt(adel)}. 2017-2018 con el cierre de Londres sin ajustar (651 y 618 peniques ÷ EURGBP de 0,887 y 0,895), porque los precios ajustados por la ampliación de 2020 no casan con el BPA de entonces; 2019-2020 sin dato útil (BPA de 2020 y 2021 en pérdidas); se excluye 2021 (30 veces el BPA de recuperación de 2022). 2025 ÷ nuestro 2026e (${n2(BPA.e2026)}). Mediana y mínimo de 2022-2025 (cuatro años útiles de los cinco); media de los seis años útiles. PER actual = ${n2(PRECIO)} EUR (412,2 peniques, cierre de Londres del 19-oct, × 0,01186) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,2 × 2026e ${n2(BPA.e2026)} + 0,8 × 2027e ${n2(BPA.e2027)}); con solo 2027e sería ${n2(PER.solo_2027)}x y con solo 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Se excluye 2022 (25 veces un BPA de recuperación de 5,6 céntimos); 2019-2021 en pérdidas o sin dato.` },
      },
      comparables_per: { mediana: 9.75 },
      consenso: { bpa_ano1: 0.609, bpa_ano2: 0.724, objetivo_medio: Math.round(535 * TC * 100) / 100, objetivo_min: Math.round(407.6 * TC * 100) / 100, objetivo_max: Math.round(634.2 * TC * 100) / 100, analistas: 15, tendencia_3m: 'bajadas', fuente: 'Yahoo Finance, 19-oct-2026 (IAG.L): BPA 2026e de 0,609 EUR (11 analistas; 0,627 hace 90 días) y 2027e de 0,724 (12; 0,783 hace 90 días); objetivo medio de 535 peniques (407,6-634,2; 15 analistas). En Madrid (IAG.MC): 0,650 y 0,763 EUR, objetivo de 6,00 EUR [D2]' },
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
    { id: 1, titulo: 'Modelo propio de IAG: BPA antes de extraordinarios 2026e-2028e (ventas × margen EBIT − cargos no operativos, 26 % de impuesto, acciones tras recompras), calibrado con 2025 y el 1S26', editor: 'Repositorio de análisis (informes/iag-2026-10-19/notas/propio.mjs)', tipo: 'Propia', fecha: '2026-10-19', url: 'informes/iag-2026-10-19/notas/propio.mjs' },
    { id: 2, titulo: 'IAG Final Results 2019 (BPA ajustado de 2018 y 2019; dividendo de 2019)', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2020-02-28', url: 'https://www.investegate.co.uk/announcement/rns/international-consolidated-airlines-group-sa-cdi---iag/iag-final-results-2019/5906795' },
    { id: 3, titulo: 'Curvas de futuros a 19-oct-2026: Brent (contado y dic-26 109,7; dic-27 87,0; dic-28 78,3 USD) y gasóleo de calefacción (4,76 USD/galón al contado; 3,58 en dic-27)', editor: 'Yahoo Finance (ICE/NYMEX)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/BZ=F/' },
  ],
  huecos: [],
};
