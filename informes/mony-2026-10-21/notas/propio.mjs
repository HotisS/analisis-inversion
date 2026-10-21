// Parte del analista (MONY Group, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { AJUSTADO } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs?t=' + Date.now())).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles comprados, IVA irrecuperable ni partidas no
// recurrentes [A1, A3]) con la proyección del DCF:
//   (ventas × margen EBITDA ajustado − amortización subyacente (3,0 % de las ventas: software y derechos de uso)
//    − gasto financiero neto) × (1 − 25 %) ÷ acciones diluidas.
// Calibrado con 2025 real: 446,3 × 32,5 % = 145,1 − 13,4 − 4,9 = 126,8 M × 0,75 = 95,1 M ÷ 530,2 M = 17,9 peniques
// (publicado: 17,9 [A1]). Acciones: 511,6 M en circulación el 30-sep-2026 tras la recompra de 25 M [A14] + ≈ 2,8 M de
// dilución de planes = 514,4 M en 2027e-2028e, SIN recompras no anunciadas; media de 2026e ≈ 521 M (la recompra se hizo
// de febrero a agosto).
const VENTAS_25 = 446.3, AM_SUB = 3.0;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;
const bpa = (v, margenAj, fin, acc) => r3(((v * (margenAj - AM_SUB) / 100 - fin) * 0.75) / acc);
const v26 = VENTAS_25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = v26 * (1 + S.anios[1].crecimiento_pct / 100);
const bpa26 = bpa(v26, AJUSTADO[0], 5.0, 521.0);
const bpa27 = bpa(v27, AJUSTADO[1], 4.8, 514.4);
const caso = (dg, dm) => {
  const a = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100) * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return bpa(a, AJUSTADO[2] + dm, 4.5, 514.4);
};
export const BPA = { '2026e': bpa26, '2027e': bpa27, Bajista: caso(-4.5, -3.5), Base: caso(0, 0), Alcista: caso(1.5, 1.0) };

// Historia del PER ADELANTADO en la base del BPA ajustado publicado (peniques → GBP) [A13, A9, A8, A7, A6, A5, A1]:
// cierre de cada ejercicio (31-dic, Yahoo [D1]) ÷ BPA ajustado del ejercicio siguiente; el cierre de 2025 ÷ nuestro 2026e.
const cierres = { 2017: 3.562, 2018: 2.755, 2019: 3.306, 2020: 2.606, 2021: 2.160, 2022: 1.924, 2023: 2.802, 2024: 1.921, 2025: 1.838 };
const bpaAj = { 2017: null, 2018: 0.174, 2019: 0.182, 2020: 0.131, 2021: 0.119, 2022: 0.144, 2023: 0.162, 2024: 0.171, 2025: 0.179, 2026: bpa26 };
const EXCL = ['2019', '2020']; // el BPA del año siguiente se hundió por el COVID (2020) y por el colapso del cambio de comercializadora de energía (2021)
const adelTodo = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const adel = adelTodo.filter(([a]) => !EXCL.includes(a));
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaAj[a]).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 2.006;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 2,3 meses
// de 2026e y entran 9,7 de 2027e.
export const BPA_NTM = r3(2.3 / 12 * bpa26 + 9.7 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / bpa27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel, adelTodo,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
const pen = (x) => n2(r1(x * 100));

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en el Reino Unido', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  bolsa: T.bolsa ?? {},
  multiplos_historicos: { comentario: T.multiplos_comentario ?? null },
  comparables: { comentario: T.comparables_comentario ?? null },
  transacciones: { comentario: T.transacciones_comentario ?? null },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica como método de valoración: los cinco segmentos (seguros, dinero, servicios del hogar, cashback y viajes) comparten marca, base de clientes, tráfico de pago y la plataforma de datos; la empresa solo publica la contribución (ingresos menos marketing directo) por segmento y reparte los costes compartidos, de modo que un EBITDA por partes sería inventado. Quidco (cashback) y TravelSupermarket podrían venderse por separado, pero juntas son ≈ 13 % de los ingresos [A3, A1].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: deuda bancaria 48,0 M (línea revolvente); arrendamientos ≈ 19,0 M (20,0 a dic-25 [A2] menos
    // pagos); caja 18,5 M; asociadas: ITG 3,3 M (participación del 2025). Minoritarios: −1,6 M a dic-25, se toman como 0.
    // otros_ajustes = 2,3 M (pagarés aún por pagar de la compra de Podium) + 5,6 M (provisión de IVA con HMRC tras
    // impuestos [A3]) + 8,5 M (recompra de julio y agosto, pagada después del 30-jun y ya restada de las acciones del
    // 30-sep [A14]) = 16,4 M.
    puente: { fecha: '2026-06-30', deuda_financiera: 48.0, arrendamientos: 19.0, caja: 18.5, minoritarios: 0, pensiones: 0, asociadas: 3.3, otros_ajustes: 16.4 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada ejercicio (31-dic, Yahoo [D1]) ÷ BPA ajustado real del ejercicio siguiente [A13, A9, A8, A7, A5, A1]; para el cierre de 2025 (183,8 peniques), ÷ nuestro 2026e (${pen(bpa26)} peniques, consenso 18,7 [D2]). Serie completa: ${fmt(PER.adelTodo)}. Se EXCLUYEN los cierres de 2019 y 2020: su BPA del año siguiente se hundió por causas puntuales (2020: viajes y seguros de viaje parados por el COVID; 2021: colapso del cambio de comercializadora de energía, que daba ≈ 15 % de los ingresos) y dan PER de 25 y 22 veces que no son repetibles. Mediana y mínimo de los cinco últimos válidos (2021-2025); media de 2017-2025 sin esos dos. PER actual = precio (2,006 GBP, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${pen(BPA_NTM)} peniques = 2,3/12 de 2026e ${pen(bpa26)} + 9,7/12 de 2027e ${pen(bpa27)}). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025 (2021 está inflado por el BPA hundido de la energía; no se excluye para no elegir a mano).` },
      },
      comparables_per: { mediana: 8.9 },
      consenso: { bpa_ano1: 0.187, bpa_ano2: 0.200, objetivo_medio: 2.34, objetivo_min: 1.80, objetivo_max: 3.00, analistas: 11, tendencia_3m: 'estable', fuente: 'Yahoo Finance, 21-oct-2026: BPA ajustado 2026 de 18,7 peniques (11 analistas; 18,5 hace 90 días) y 2027 de 20,0; objetivo medio de 11 analistas 233,6 peniques (180-300) [D2, D3]' },
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
    { id: 1, titulo: 'Cálculos propios del BPA ajustado 2026e-2028e y de la historia del PER (notas/propio.mjs)', editor: 'Repositorio de análisis', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'informes/mony-2026-10-21/notas/propio.mjs' },
    { id: 2, titulo: 'Movimiento del precio de MONY.L (herramientas/movimiento.mjs): variaciones, máximos, tendencia y avisos P', editor: 'Repositorio de análisis', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'informes/mony-2026-10-21/notas/movimiento.txt' },
  ],
  huecos: [],
};
