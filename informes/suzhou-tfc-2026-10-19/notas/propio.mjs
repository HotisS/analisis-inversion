// Parte del analista (Suzhou TFC Optical, corte 2026-10-19). Citas con la letra de la nota: [A4] = fuente 4 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA (beneficio atribuido publicado, con subvenciones y otros ingresos de explotación, como el consenso) con la proyección
// del DCF: (ventas × (margen EBITDA − amortizaciones) + resultado financiero) × (1 − impuesto) × (1 − 0,3 % de minoritarios)
// ÷ acciones. Calibrado con 2025 real: 5.163,4 × (48,06 % − 3,45 %) + 46 = 2.349 × 0,861 × 0,997 = 2.017 M (publicado 2.017,3) [A1, A4].
// Resultado financiero: intereses de la caja (≈ 3.200-6.000 M al 1,2-1,5 %) menos pérdidas de cambio: 60 M en 2026e, 70 en
// 2027e y 90 en 2028e (70 en el bajista). Acciones: 1.090,8 M + 2,3 M del plan de 2026 = 1.093 M, SIN la emisión de acciones H
// (hasta el 10 % del capital tras la emisión + 15 % de sobreasignación): si sale, el BPA bajaría ≈ 9-10 % y entraría caja a
// precio de mercado; lo recoge la prueba de BPA −10 % y el riesgo de dilución.
const ACC = 1093.0, MIN = 0.997;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const V25 = 5163.4;
const caso = S.casos.reduce((o, c) => ({ ...o, [c.escenario]: c }), {});
function proyecta(esc) {
  const c = caso[esc];
  const perf = Object.fromEntries((c.perfil || []).map((p) => [p.periodo, p]));
  let v = V25;
  const out = {};
  S.anios.slice(0, 3).forEach((a, i) => {
    const p = perf[a.periodo];
    const dg = a.fijo ? 0 : (p ? p.crecimiento_pp : c.ajuste_crecimiento_pp);
    const dm = a.fijo ? 0 : (p ? p.margen_pp : c.ajuste_margen_pp);
    v *= 1 + (a.crecimiento_pct + dg) / 100;
    const fin = [60, 70, esc === 'Bajista' ? 70 : 90][i];
    const neto = (v * (a.margen_ebitda_pct + dm - a.amortizacion_pct_ventas) / 100 + fin) * (1 - a.tasa_impositiva_pct / 100) * MIN;
    out[a.periodo] = { ventas: Math.round(v), neto: Math.round(neto), bpa: r2(neto / ACC) };
  });
  return out;
}
export const P = { Bajista: proyecta('Bajista'), Base: proyecta('Base'), Alcista: proyecta('Alcista') };
export const BPA = { '2026e': P.Base['2026e'].bpa, '2027e': P.Base['2027e'].bpa, Bajista: P.Bajista['2028e'].bpa, Base: P.Base['2028e'].bpa, Alcista: P.Alcista['2028e'].bpa };

// Historia del PER [A4, D1]: cierres del último día de cada año en la base de acciones de hoy (Yahoo ajusta las ampliaciones
// liberadas de 2021 ×1,8 y de 2024, 2025 y 2026 ×1,4 cada una) y BPA publicado pasado a la base de hoy (1.088-1.091 M de acciones).
const cierres = { 2017: 4.53, 2018: 4.89, 2019: 7.75, 2020: 10.8, 2021: 13.34, 2022: 9.24, 2023: 33.35, 2024: 46.61, 2025: 145.02 };
const bpaReal = { 2017: 0.1132, 2018: 0.1380, 2019: 0.1699, 2020: 0.2846, 2021: 0.2852, 2022: 0.3727, 2023: 0.6736, 2024: 1.2374, 2025: 1.8534, 2026: BPA['2026e'] };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u9 = adel.map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 203.30;
// PER actual en la misma base que la historia (precio ÷ BPA de los 12 meses siguientes): a 19-oct-2026 quedan 2,4 meses de
// 2026e y entran 9,6 de 2027e.
export const BPA_NTM = r2(2.4 / 12 * BPA['2026e'] + 9.6 / 12 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / BPA['2026e']), solo_2027: r1(PRECIO / BPA['2027e']), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u9.reduce((s, x) => s + x, 0) / u9.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'CAS (normas contables chinas para empresas)', formato_cuenta: 'funcion',
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: componentes pasivos (54 % de las ventas del 1S26) y motores activos (45 %) se venden a los mismos clientes (fabricantes de módulos para centros de datos), comparten fábricas y tecnología y no tienen comparables cotizados separados con múltiplos distintos [A2, A8].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2, A4]: sin deuda financiera; arrendamientos 3,6; caja = efectivo 2.905,8 + activos financieros de
    // tesorería 272,2 = 3.178,0. otros_ajustes = dividendo a cuenta de 2026 pagado el 17-sep-2026 (0,50 CNY × 1.090,8 M = 545,4),
    // que sale de la caja después del balance. Minoritarios 6,6; asociadas y negocios conjuntos 11,9.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 3.6, caja: 3178.0, minoritarios: 6.6, pensiones: 0, asociadas: 11.9, otros_ajustes: 545.4 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; no hay una serie equivalente fiable para el CSI 300)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA publicado (beneficio atribuido, la base del consenso chino): cierre del último día de cada año en la base de acciones de hoy (Yahoo [D1]) ÷ BPA real del año siguiente [A4] pasado a la base de hoy (ampliaciones liberadas de 2021, 2024, 2025 y 2026); para el cierre de 2025 (145,02), ÷ nuestro 2026e (${n2(BPA['2026e'])}). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2017-2025. Sin exclusiones: TFC no ha tenido pérdidas. El mínimo (2022, ${n2(PER.minimo_5a)}x) es el cierre de 2022 sobre el BPA de 2023, que casi se duplicó con el arranque de la IA: el mercado no lo anticipó. PER actual = precio (203,30 CNY, cierre del 19-oct-2026 [D2]) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(BPA['2026e'])} + 9,6/12 de 2027e ${n2(BPA['2027e'])}). Con solo 2026e sería ${n2(PER.solo_2026)}x, con 2027e ${n2(PER.solo_2027)}x y con 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA real del mismo año, base de hoy): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 27.3 },
      consenso: { bpa_ano1: 3.25, bpa_ano2: 5.29, objetivo_medio: 321.64, objetivo_min: 265, objetivo_max: 411.79, analistas: 8, tendencia_3m: 'bajadas', fuente: 'Eastmoney (21 casas en seis meses, beneficio 2026e 3.543 M, 2027e 5.770 M y 2028e 8.622 M ÷ 1.090,8 M de acciones; BPA 2028e 7,90) [D3]; objetivo medio de 8 analistas en Yahoo, 19-oct-2026 [D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  bolsa: T.bolsa ?? undefined,
  fuentes: [
    { id: 1, titulo: 'Proyección propia del BPA 2026e-2028e y de la historia del PER (supuestos.mjs y propio.mjs de este informe)', editor: 'Repositorio de análisis (informes/suzhou-tfc-2026-10-19/notas)', tipo: 'Propio', fecha: '2026-10-19', url: 'informes/suzhou-tfc-2026-10-19/notas/propio.mjs' },
    { id: 2, titulo: 'Stock Connect: lista de valores de SZSE elegibles y FAQ (ChiNext limitado a inversores profesionales institucionales en el sentido norte)', editor: 'HKEX', tipo: 'Regulador', fecha: '2026-10-16', url: 'https://www.hkex.com.hk/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities' },
    { id: 3, titulo: 'A股半导体、光模块全线重挫，“易中天”大跌 (caída del 2-jul-2026: chips en EE. UU., Japón y Corea y temor a menos inversión en IA)', editor: 'Sina Finance (新浪财经)', tipo: 'Prensa', fecha: '2026-07-02', url: 'https://finance.sina.com.cn/wm/2026-07-02/doc-inifkupy5901885.shtml' },
    { id: 4, titulo: '光模块又遭“小作文”打压！板块罕见暴跌7% (rumor que hunde el sector; los bancos suben la previsión de envíos de 1,6T)', editor: 'JRJ (金融界)', tipo: 'Prensa', fecha: '2026-09-28', url: 'https://m.jrj.com.cn/madapter/finance/2026/09/28104658563553.shtml' },
  ],
  huecos: [],
};
