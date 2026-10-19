// Parte del analista (Manhattan Associates, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin remuneración en acciones, reestructuración ni otros no recurrentes; tipo
// ajustado del 21,4 %), con la proyección del DCF:
//   resultado operativo ajustado = ventas × (margen EBITDA del DCF − 0,6 de amortización + 10,4 de remuneración en acciones,
//   la de 2025-2026 sobre ventas) + ≈ 6 M de ingresos financieros (caja menor tras las recompras), × (1 − 21,4 %) ÷ acciones.
// Calibrado con 2026 (ventas 1.163, margen ajustado 35,1 % de la guía, 9 M de intereses, 59,9 M de acciones → 5,47; guía
// 5,44-5,50, consenso 5,50) [A2]. Acciones: 58,30 M en circulación el 28-jul-2026 [A8] + ≈ 0,9 M de dilución de las
// acciones restringidas − ≈ 1,0 M de los 225 M de recompra que quedan autorizados + ≈ 0,5 M al año de emisión por
// remuneración → 58,9 M en 2027e y 58,75 M en 2028e, SIN recompras no anunciadas.
const V26 = 1163, ACC27 = 58.9, ACC28 = 58.75, OI = 6, TAX = 0.214;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, mDcf, acc) => r2(((v * (mDcf - 0.6 + 10.4) / 100 + OI) * (1 - TAX)) / acc);
const caso = (dg, dm) => {
  const v27 = V26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100), v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return { b27: bpa(v27, S.anios[1].margen_ebitda_pct + dm, ACC27), b28: bpa(v28, S.anios[2].margen_ebitda_pct + dm, ACC28) };
};
const cB = caso(0, 0), cBa = caso(-3, -3), cAl = caso(2, 2);
export const BPA = { 2026: 5.47, 2027: cB.b27, Bajista: cBa.b28, Base: cB.b28, Alcista: cAl.b28 };

// Historia del PER en BPA AJUSTADO publicado [A6, A4]. Cierres a 31-dic (Yahoo [D1]).
const cierres = { 2016: 53.03, 2017: 49.54, 2018: 42.37, 2019: 79.75, 2020: 105.18, 2021: 155.49, 2022: 121.40, 2023: 215.32, 2024: 270.24, 2025: 173.31 };
const bpaAj = { 2017: 1.87, 2018: 1.79, 2019: 1.74, 2020: 1.76, 2021: 2.23, 2022: 2.76, 2023: 3.74, 2024: 4.72, 2025: 5.06, 2026: BPA[2026] };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u10 = adel.map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 222.17;
// PER actual en la misma base que la historia: a 19-oct-2026 quedan 2,4 meses de 2026 → BPA NTM = 2,4/12 × 2026e + 9,6/12 × 2027e.
export const BPA_NTM = r2(2.4 / 12 * BPA[2026] + 9.6 / 12 * BPA[2027]);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / BPA[2026]), solo_2027: r1(PRECIO / BPA[2027]),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u10.reduce((s, x) => s + x, 0) / u10.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
export const AUX = { cB, cBa, cAl, fmt, n2 };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Manhattan es un solo negocio de software de cadena de suministro (almacén, transporte, pedidos y punto de venta) sobre una misma plataforma (Manhattan Active), con segmentos solo geográficos [A1]. Servicios, nube y mantenimiento son formas de cobrar el mismo producto, no negocios separables.', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A8]: sin deuda financiera ni líneas de crédito; caja 186,1 M. Arrendamientos operativos fuera
    // (US GAAP: su gasto ya está en el EBITDA). Sin minoritarios, pensiones ni asociadas.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 186.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada año (31-dic, Yahoo [D1]) ÷ BPA ajustado real del año siguiente [A6, A4]; para el cierre de 2025 (173,31), ÷ nuestro 2026e (${n2(BPA[2026])}, centro de la guía de 5,44-5,50 [A2]). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2016-2025. Sin exclusiones: el BPA ajustado no tiene pérdidas. El BPA GAAP resta la remuneración en acciones (≈ 1,8 USD por acción en 2025) y no es la base del consenso. PER actual = precio (222,17 USD, cierre del 16-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(BPA[2026])} + 9,6/12 de 2027e ${n2(BPA[2027])}), la misma base que la historia. Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2017-2025.` },
      },
      comparables_per: { mediana: 23.3 },
      consenso: { bpa_ano1: 5.50, bpa_ano2: 6.15, objetivo_medio: 230.2, objetivo_min: 190, objetivo_max: 260, analistas: 10, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 19-oct-2026: BPA ajustado 2026 de 5,50 USD (11 analistas; 5,36 hace 90 días) y 2027 de 6,145 (5,95 hace 90 días); objetivo medio de 10 analistas [D2]' },
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
    { id: 1, titulo: 'Software de aplicaciones: ficha sectorial corta (perímetro, mapa del riesgo de IA por tipo de software, comparables)', editor: 'Repositorio de análisis (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
    { id: 2, titulo: 'Movimiento de la cotización de MANH a 19-oct-2026 (variaciones, distancia a máximos, tendencia, volatilidad, avisos P1-P5)', editor: 'Herramienta movimiento.mjs (Yahoo Finance)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/MANH/history' },
  ],
  huecos: [],
};
