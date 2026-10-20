// Parte del analista (VeriSign, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA GAAP con la proyección del DCF:
//   (ventas × margen EBITDA − amortización − resultado financiero neto) × (1 − 23 %) ÷ acciones diluidas.
// Calibrado con 2025: (1.656,6 × 69,55 % − 31,2 − 52,5) × (1 − 22,7 %) ÷ 93,8 = 8,80 USD (8,81 publicado).
// Resultado financiero: intereses de 1.800 M de bonos (≈ 74 M al año) menos intereses de la caja: −58 M en 2026e (la
// empresa estima 59-65 M de gasto por intereses), −62 M en 2027e y −70 M en 2028e (la caja se va en recompras).
// Acciones: 90,4 M a 30-jun-2026; se cuentan las recompras ANUNCIADAS (programa de 1.500 M USD autorizado el 23-jul-2026,
// ≈ 4,8 M de acciones a ≈ 310 USD) y ≈ 0,3 M al año de dilución por acciones de empleados: 90,7 M de media en 2026e,
// 88,0 M en 2027e y 86,5 M en 2028e. Sin recompras no anunciadas.
const VENTAS_25 = 1656.6;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, margen, amort, fin, acc) => r2(((v * margen / 100 - v * amort / 100 + fin) * 0.77) / acc);
const v26 = VENTAS_25 * (1 + S.anios[0].crecimiento_pct / 100);
const bpa26 = r2(((v26 * S.anios[0].margen_ebitda_pct / 100 - v26 * S.anios[0].amortizacion_pct_ventas / 100 - 58) * 0.768) / 90.7);
const v27b = v26 * (1 + S.anios[1].crecimiento_pct / 100);
const bpa27 = bpa(v27b, S.anios[1].margen_ebitda_pct, S.anios[1].amortizacion_pct_ventas, -62, 88.0);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return bpa(v28, S.anios[2].margen_ebitda_pct + dm, S.anios[2].amortizacion_pct_ventas, -70, 86.5);
};
export const BPA = { '2026e': bpa26, '2027e': bpa27, Bajista: caso(-3.0, -1.5), Base: caso(0, 0), Alcista: caso(1.5, 0.7) };

// Historia del PER ADELANTADO: precio de cierre de cada año [D1] ÷ BPA diluido real del año siguiente [A1, A7]; para el
// cierre de 2025, ÷ nuestro 2026e. Fuera los cierres de 2019 y 2020: el BPA del año siguiente (2020: 7,07 USD; 2021: 7,00)
// está inflado por impuestos negativos (−64,7 y −2,6 M), un ≈ 30-40 % sobre el normal.
const cierres = { 2017: 114.44, 2018: 148.29, 2019: 192.68, 2020: 216.40, 2021: 253.82, 2022: 205.44, 2023: 205.96, 2024: 206.96, 2025: 242.95 };
const bpaReal = { 2018: 4.75, 2019: 5.15, 2020: 7.07, 2021: 7.00, 2022: 6.24, 2023: 7.90, 2024: 8.00, 2025: 8.81, 2026: bpa26 };
const excl = ['2019', '2020'];
const adel = Object.keys(cierres).filter((a) => !excl.includes(a)).map((a) => [a, r1(cierres[a] / bpaReal[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const u8 = adel.map((x) => x[1]);
// v2 (al cierre: precio ÷ BPA del mismo año), solo de control; fuera 2020 y 2021 por el mismo motivo.
const alCierre = Object.keys(cierres).filter((a) => +a >= 2018 && !['2020', '2021'].includes(a)).map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 306.48;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): al 20-oct-2026 quedan 2,4 meses
// de 2026 y entran 9,6 de 2027.
export const BPA_NTM = r2(2.4 / 12 * bpa26 + 9.6 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / bpa27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo negocio (registro de .com y .net, más del 95 % de los ingresos) con un único perfil de crecimiento y margen [A1]. .web, delegado en 2026, aún no tiene ingresos.', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: bonos 549,3 (2027, amortizados el 20-jul con la caja de los nuevos) + 1.785,1 a largo; efectivo
    // 840,9 + valores negociables 193,2. Arrendamientos operativos fuera (US GAAP). Sin pensiones, minoritarios ni asociadas.
    puente: { fecha: '2026-06-30', deuda_financiera: 2334.4, arrendamientos: 0, caja: 1034.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA diluido GAAP (la misma base que nuestros casos y que el consenso): precio de cierre de cada año (Yahoo [D1]) ÷ BPA real del año siguiente [A1, A7]; para el cierre de 2025 (242,95 USD), ÷ nuestro 2026e (${n2(bpa26)}; consenso 9,58). Serie: ${fmt(adel)}. Excluidos los cierres de 2019 y 2020: el BPA de 2020 (7,07) y de 2021 (7,00) está inflado por impuestos negativos (con un tipo del 23 %, ≈ 5,0 y 5,4 USD) y daría un PER artificialmente bajo (27,3 y 30,9 en vez de ≈ 38-40). Mediana y mínimo de 2021-2025; media de los siete cierres válidos de 2017-2025. PER actual = precio (306,48 USD, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e + 9,6/12 de 2027e ${n2(bpa27)}); con solo 2027e, ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio ÷ BPA del mismo año): ${fmt(PER.v2.alCierre)}. Fuera 2020 y 2021 (impuestos negativos). Mediana y mínimo de 2019-2025 válidos; media de 2018-2025 válidos.` },
      },
      comparables_per: { mediana: 22.1 },
      consenso: { bpa_ano1: 9.58, bpa_ano2: 10.88, objetivo_medio: 326.4, objetivo_min: 285, objetivo_max: 355, analistas: 5, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 20-oct-2026: BPA de 2026 de 9,58 USD y de 2027 de 10,88 (4 analistas; 10,38 hace 90 días); objetivo medio de 5 analistas [D2]; Wedbush 351 USD el 19-oct [D5]' },
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
    { id: 1, titulo: '.com Registry Agreement y Cooperative Agreement (Amendment 35): tope del 7 % en los cuatro últimos años de cada periodo de seis; periodos 2024-2030 y 2030-2036', editor: 'VeriSign, Inc. (Form 10-K 2025, SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: 'https://www.sec.gov/Archives/edgar/data/1014473/000101447326000006/vrsn-20251231.htm' },
  ],
  huecos: [],
};
