// Parte del analista (4imprint, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
// Cuentas en USD; cotiza en peniques (GBp). Precio del informe: cierre de Londres del 19-oct-2026 (4.540 GBp × GBPUSD 1,3308).
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (sin las partidas fiscales no recurrentes de 2026), con la proyección del DCF:
//   (ventas × (margen EBITDA − 0,55 de amortizaciones) + ingresos financieros) × (1 − 25 %) ÷ 28,1 M de acciones diluidas.
// Calibrado: 2025 real (1.346,8 × 10,78 % + 5,6 → 150,8 M → 113,1 / 28,1 = 4,03 frente a 4,03 publicado) y guía de 2026
// (beneficio antes de impuestos ajustado ≈ 130 M → 3,47; consenso Yahoo 3,48). Ingresos financieros: 4,6 M en 2026 y 4,0 M
// después (la caja se reparte en dividendos; tipos más bajos). Sin recompras (la empresa no las hace).
const V25 = 1346.8, ACC = 28.1, IMP = 0.25;
const bpa = (v, margen, fin) => Math.round(((v * (margen - 0.55) / 100 + fin) * (1 - IMP)) / ACC * 100) / 100;
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return { b27: bpa(v27, S.anios[1].margen_ebitda_pct + dm, 4.0), b28: bpa(v28, S.anios[2].margen_ebitda_pct + dm, 4.0) };
};
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, 4.6);
const cB = caso(-2.0, -1.0), cM = caso(0, 0), cA = caso(1.5, 0.5);
export const BPA = { '2026': bpa26, '2027': cM.b27, Bajista: cB.b28, Base: cM.b28, Alcista: cA.b28 };

// Historia del PER en USD y en BPA diluido [A1, A5, A6]: cierre de cada año en peniques × GBPUSD de ese día [D1].
const cierres = { 2018: [1845, 1.2694], 2019: [3480, 1.3113], 2020: [2565, 1.3631], 2021: [2820, 1.3498], 2022: [4275, 1.2056], 2023: [4570, 1.2734], 2024: [4855, 1.2549], 2025: [3845, 1.3467] };
// BPA real: 2019 básico 1,524 (152,4 centavos; sin diluido en el registro de cinco años), 2020 0,11, 2021-2025 diluido; 2026 = nuestro 2026e.
const bpaR = { 2019: 1.524, 2020: 0.11, 2021: 0.8026, 2022: 2.8495, 2023: 3.77, 2024: 4.153, 2025: 4.033, 2026: bpa26 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const usd = (a) => cierres[a][0] / 100 * cierres[a][1];
const EXCL = ['2019', '2020'];
const adelTodo = Object.keys(cierres).map((a) => [a, r1(usd(a) / bpaR[+a + 1])]);
const adel = adelTodo.filter(([a]) => !EXCL.includes(a));
const u5 = adel.filter(([a]) => +a >= 2021).map((x) => x[1]).sort((a, b) => a - b);
const alCierreTodo = Object.keys(cierres).filter((a) => bpaR[a]).map((a) => [a, r1(usd(a) / bpaR[a])]);
const alCierre = alCierreTodo.filter(([a]) => !['2020', '2021'].includes(a));
const c5 = alCierre.filter(([a]) => +a >= 2021).map((x) => x[1]).sort((a, b) => a - b);
export const FX = 1.3308;
export const PRECIO = r2(45.40 * FX);
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 19-oct-2026 quedan 2,4 meses de
// 2026 y entran 9,6 de 2027 → BPA NTM = 0,2 × 2026e + 0,8 × 2027e.
export const BPA_NTM = r2(0.2 * bpa26 + 0.8 * cM.b27);
const med = (v) => { const s = [...v].sort((a, b) => a - b), n = s.length; return n % 2 ? s[(n - 1) / 2] : r1((s[n / 2 - 1] + s[n / 2]) / 2); };
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / cM.b27), solo_2028: r1(PRECIO / cM.b28),
  mediana_5a: med(u5), minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adelTodo,
  v2: { mediana_5a: med(c5), minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierreTodo },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'GBp', tipo_cambio: 0.013308, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (adoptadas en el Reino Unido)', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo negocio (marketing directo de artículos promocionales); el Reino Unido e Irlanda son el 2 % de las ventas y no ganan dinero [A1].', confianza: 'Alta' },
  valoracion: {
    // Puente al 27-jun-2026 [A3]: sin deuda; arrendamientos 2,9; caja y depósitos 136,9. otros_ajustes = dividendo a cuenta
    // de 80 centavos ya declarado y pagado el 14-sep-2026 (28,05 M acciones → 22,4 M; quien compra hoy no lo cobra) + pasivo
    // fiscal neto y provisión por los tratamientos fiscales inciertos (19,5 − 19,0 + 4,6 de costes únicos = 5,1).
    puente: { fecha: '2026-06-27', deuda_financiera: 0, arrendamientos: 2.9, caja: 136.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 27.5 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en USD y en BPA diluido (la base de nuestros casos): cierre de cada año en peniques × GBPUSD de ese día [D1] ÷ BPA real del año siguiente [A1, A5, A6]; para el cierre de 2025 (51,78 USD), ÷ nuestro 2026e (${n2(bpa26)}, en la guía de ≈ 130 M de beneficio antes de impuestos ajustado). Serie: ${fmt(adelTodo)}. Se excluyen 2019 y 2020 (BPA del año siguiente hundido por la pandemia: 0,11 USD en 2020 y 0,80 en 2021; PER de 415x y 44x). Mediana y mínimo de 2021-2025; media de 2018 y 2021-2025. PER actual = ${n2(PRECIO)} USD (4.540 peniques, cierre del 19-oct-2026, × 1,3308) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,2 × 2026e ${n2(bpa26)} + 0,8 × 2027e ${n2(cM.b27)}), la misma base que la historia; con solo 2027e sería ${n2(PER.solo_2027)}x y con solo 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre en USD ÷ BPA del mismo año): ${fmt(PER.v2.alCierreTodo)}. Se excluyen 2020 y 2021 (BPA de pandemia). Mediana y mínimo de 2022-2025; media de 2019 y 2022-2025.` },
      },
      comparables_per: { mediana: 15.1 },
      consenso: { bpa_ano1: 3.48, bpa_ano2: 3.65, objetivo_medio: 72.22, objetivo_min: 57.56, objetivo_max: 78.57, analistas: 5, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 19-oct-2026: BPA de 2026 de 3,48 USD (6 analistas; 3,12 hace 90 días) y de 2027 de 3,65 (3,35 hace 90 días); objetivo medio de 5 analistas de 5.427 GBp (72,22 USD), mínimo 4.325 y máximo 5.904 GBp [D2]; MarketScreener da 3,37 / 3,60 / 3,71 USD para 2026-2028 en base publicada [D3]' },
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
    { id: 1, titulo: 'Rentabilidad de 4imprint frente a sus pares y su historia: cálculo propio con las cuentas de 2019-2025 y la guía de 2026', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-19', url: 'informes/4imprint-2026-10-19/notas/propio.mjs' },
    { id: 2, titulo: '4imprint', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://en.wikipedia.org/wiki/4imprint' },
    { id: 3, titulo: 'Bemrose Corporation plc: Change of Name (RNS)', editor: 'Investegate', tipo: 'Primaria', fecha: '2000-01-01', url: 'https://www.investegate.co.uk/announcement/rns/4imprint-group--four/change-of-name-/194314' },
    { id: 4, titulo: '4imprint - contrarian compounder', editor: 'Sweet Stocks (Substack)', tipo: 'Analistas', fecha: '2025-01-01', url: 'https://sweetstocks.substack.com/p/4imprint-contrarian-compounder' },
  ],
  huecos: [],
};
