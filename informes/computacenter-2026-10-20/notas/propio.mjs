// Parte del analista (Computacenter, corte 2026-10-20). Citas con la letra de la nota: [A5] = fuente 5 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO DILUIDO (definición de la empresa: sin amortización de intangibles comprados ni partidas excepcionales), con la
// proyección del DCF:
//   resultado operativo ajustado = ventas × (margen EBITDA ajustado − amortización total) + amortización de lo comprado (≈ 18 M al
//   año desde 2026: 8,8 M solo en el 1S26 por AgreeYa, más GAI [A5]); − resultado financiero neto (≈ 2 M: −0,7 M en el 1S26 [A5]);
//   × (1 − 29,5 %, centro de la guía de tipo ajustado del 28,5-30,5 % [D4]) ÷ 105,5 M de acciones diluidas (105,4 M en
//   circulación [D2]; el fondo de los empleados compra en bolsa las acciones de los planes, sin recompras anunciadas) [A5].
// Calibrado con la guía de 2026 (beneficio ajustado antes de impuestos ≥ 380 M [D4]): 2026e = 2,61 GBP, igual que el consenso
// de Yahoo (2,61, 9 analistas) y un 2,6 % sobre el de MarketScreener (2,545) [D2, D3].
const V25 = 9193.9, ACC = 105.5, AMC = 18, FIN = 2, T_AJ = 0.705;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, margen, am) => r2(((v * (margen - am) / 100 + AMC - FIN) * T_AJ) / ACC);
const a = S.anios;
const v26 = V25 * (1 + a[0].crecimiento_pct / 100);
const caso = (dg27, dm27, dg28, dm28) => {
  const v27 = v26 * (1 + (a[1].crecimiento_pct + dg27) / 100);
  return { v27, b27: bpa(v27, a[1].margen_ebitda_pct + dm27, a[1].amortizacion_pct_ventas),
    b28: bpa(v27 * (1 + (a[2].crecimiento_pct + dg28) / 100), a[2].margen_ebitda_pct + dm28, a[2].amortizacion_pct_ventas) };
};
// Los casos de la regla a 12 meses usan los mismos desplazamientos que los escenarios del DCF (perfil de 2027e + uniforme en 2028e).
const cs = Object.fromEntries(S.casos.map((c) => {
  const p = (c.perfil || []).find((x) => x.periodo === '2027e');
  return [c.escenario, caso(p ? p.crecimiento_pp : c.ajuste_crecimiento_pp, p ? p.margen_pp : c.ajuste_margen_pp, c.ajuste_crecimiento_pp, c.ajuste_margen_pp)];
}));
const bpa26 = bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas);
export const BPA = { '2026': bpa26, '2027': cs.Base.b27, Bajista: cs.Bajista.b28, Base: cs.Base.b28, Alcista: cs.Alcista.b28 };

// Historia del PER en la base del BPA AJUSTADO DILUIDO publicado (peniques → GBP): 2018 75,7; 2019 92,5; 2020 126,4; 2021 165,6;
// 2022 169,7; 2023 174,8; 2024 159,9; 2025 175,1 [A4, A3, A2, A1]. Cierres de cada ejercicio (31-dic, Yahoo [D1]).
const cierres = { 2017: 11.53, 2018: 10.06, 2019: 17.73, 2020: 24.48, 2021: 29.10, 2022: 19.11, 2023: 27.92, 2024: 21.24, 2025: 29.30 };
const bpaAj = { 2018: 0.757, 2019: 0.925, 2020: 1.264, 2021: 1.656, 2022: 1.697, 2023: 1.748, 2024: 1.599, 2025: 1.751, 2026: bpa26 };
const r1 = (x) => Math.round(x * 10) / 10;
const adel = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaAj[+y + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((x, y) => x - y), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((y) => bpaAj[y]).map((y) => [y, r1(cierres[y] / bpaAj[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
export const PRECIO = 50.25;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 20-oct-2026 quedan 2,4 meses de 2026
// y entran 9,6 de 2027 → BPA de los próximos 12 meses = 2,4/12 × 2026e + 9,6/12 × 2027e.
export const BPA_NTM = r2(2.4 / 12 * bpa26 + 9.6 / 12 * cs.Base.b27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / cs.Base.b27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER, v27: r1(cs.Base.v27) }, null, 1));

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'GBP', divisa_cotizacion: 'GBp', tipo_cambio: 0.01, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Computacenter es un solo negocio (reventa de tecnología con servicios profesionales y gestionados) repartido por países que comparten clientes, compras a fabricantes, centros de servicio y sistemas; los segmentos son geográficos y ninguno tendría un comprador natural por separado. Francia (en pérdidas) es pequeña: 779 M GBP de ventas y −7,8 M de resultado en Europa Occidental en 2025 [A1].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A5]: deuda financiera 24,7; arrendamientos 175,7 (NIIF 16; su reposición va en el capex); caja 333,4
    // (la de junio, sin los cobros anticipados de fin de año); pensiones 21,2 × (1 − 25 %) ≈ 15,9; asociadas 0,1.
    // otros_ajustes = deuda asimilada sin recurso: venta de cuentas a cobrar 43,4 + «invoice financing» 140,5 [A5] + dividendo a
    // cuenta de 27,1 peniques × 105,5 M = 28,6 M (la acción ya cotiza sin él; se paga el 23-oct con la caja de junio) = 212,5.
    puente: { fecha: '2026-06-30', deuda_financiera: 24.7, arrendamientos: 175.7, caja: 333.4, minoritarios: 0, pensiones: 15.9, asociadas: 0.1, otros_ajustes: 212.5 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout); sin dato equivalente para el FTSE', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx (la misma referencia que los informes del 19-oct)' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO DILUIDO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada ejercicio (31-dic, Yahoo [D1]) ÷ BPA ajustado real del ejercicio siguiente (75,7; 92,5; 126,4; 165,6; 169,7; 174,8; 159,9 y 175,1 peniques de 2018 a 2025 [A4, A3, A2, A1]); para el cierre de 2025 (29,30 GBP), ÷ nuestro 2026e (${n2(bpa26)} GBP, en la guía de ≥ 380 M de beneficio antes de impuestos). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones (el BPA ajustado no tuvo pérdidas). PER actual = precio (50,25 GBP, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(bpa26)} + 9,6/12 de 2027e ${n2(cs.Base.b27)}), la misma base que la historia. Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado diluido del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 15.0 },
      consenso: { bpa_ano1: 2.61, bpa_ano2: 2.84, objetivo_medio: 62.37, objetivo_min: 52.5, objetivo_max: 70.0, analistas: 11, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 20-oct-2026: BPA ajustado de 2026 de 2,61 GBP (9 analistas; 2,19 hace 90 días) y de 2027 de 2,84 (2,37 hace 90 días) [D2]; objetivo medio de 11 analistas de MarketScreener (62,37 GBP) y rango de Yahoo (52,50-70,00) [D3, D2]' },
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
    { id: 1, titulo: 'Bank of England: rentabilidad nominal a 10 años de la deuda pública británica (IUDMNPY), 15-oct-2026', editor: 'Bank of England', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
    { id: 2, titulo: 'Tipos de cambio GBP/USD, GBP/EUR y GBP/NOK del 20-oct-2026 (Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/GBPEUR=X' },
    { id: 3, titulo: 'Implied Equity Risk Premiums by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Analistas', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    { id: 4, titulo: 'Índice de cuentas ESEF de Computacenter plc (LEI 549300XSXUZ1I19DB105), ejercicios 2020-2025', editor: 'XBRL International (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-11', url: 'https://filings.xbrl.org/entity/549300XSXUZ1I19DB105' },
    { id: 5, titulo: 'Movimiento de la acción CCC.L a 20-oct-2026: variaciones de 1-12 meses, distancia a máximos y caídas diarias (herramienta movimiento.mjs sobre Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/CCC.L' },
    { id: 6, titulo: 'Equipos de red para centros de datos: ficha sectorial corta (ventas directas de fabricantes a medida a la hiperescala, IDC)', editor: 'Repositorio de análisis (sectores/equipos-red-centros-datos-2026-10-16.md)', tipo: 'Sectorial', fecha: '2026-10-16', url: 'sectores/equipos-red-centros-datos-2026-10-16.md' },
  ],
  huecos: [],
};
