// Parte del analista (Royal Unibrew, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';
import { readFileSync } from 'node:fs';
const BOLSA = JSON.parse(readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA (diluido, sin partidas extraordinarias) con la proyección del DCF:
//   EBIT = ventas × (margen EBITDA − amortización) − gastos financieros netos + asociadas (≈ 18 M) × (1 − 22 %) ÷ acciones.
// Calibrado con 2025 real (ventas 15.723, EBIT 2.202, financiero −236 → 31,3 publicado) y con la guía de 2026 (EBIT
// 2.325-2.425, gasto financiero ≈ 250, impuesto 22 % [A2]).
// Acciones: 49,30 M emitidas − 2,18 M propias (16-oct-2026) = 47,12 M + 0,24 M de acciones restringidas = 47,36 M diluidas;
// el programa de hasta 300 M (hasta el 18-dic) retira ≈ 0,3 M más a ≈ 435 DKK → 47,06 M en 2027e-2028e, SIN recompras
// no anunciadas (la política reparte el sobrante con deuda neta/EBITDA < 2,5 [A1]). Media de 2026e: 47,9 M.
const VENTAS_25 = 15723;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (v, margen, amort, fin, acc) => r2(((v * (margen - amort) / 100 - fin + 18) * 0.78) / acc);
const v26 = VENTAS_25 * (1 + S.anios[0].crecimiento_pct / 100);
const a = S.anios;
const v27 = (dg) => v26 * (1 + (a[1].crecimiento_pct + dg) / 100);
const v28 = (dg) => v27(dg) * (1 + (a[2].crecimiento_pct + dg) / 100);
const bpa26 = bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas, 250, 47.9);
const bpa27 = bpa(v27(0), a[1].margen_ebitda_pct, a[1].amortizacion_pct_ventas, 240, 47.06);
const caso = (dg, dm) => bpa(v28(dg), a[2].margen_ebitda_pct + dm, a[2].amortizacion_pct_ventas, 230, 47.06);
export const BPA = { '2026': bpa26, '2027': bpa27, Bajista: caso(-2.0, -1.5), Base: caso(0, 0), Alcista: caso(1.0, 0.7) };

// Historia del PER ADELANTADA: cierre de cada ejercicio (31-dic, Yahoo [D1]) ÷ BPA diluido real del ejercicio siguiente,
// en la base sin extraordinarios (2022: 23,1 sin la plusvalía de 360 M al revalorizar Hansa Borg; 2024: 25,2 sin la
// plusvalía de las cerveceras polacas) [A1, A3, A4, A5]; el cierre de 2025 ÷ nuestro 2026e.
const cierres = { 2018: 449.0, 2019: 610.0, 2020: 706.6, 2021: 737.2, 2022: 495.3, 2023: 451.1, 2024: 505.5, 2025: 574.5 };
const bpaReal = { 2019: 22.9, 2020: 24.1, 2021: 26.5, 2022: 23.1, 2023: 21.9, 2024: 25.2, 2025: 31.3, 2026: bpa26 };
const adel = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaReal[+y + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((p, q) => p - q);
const u8 = adel.map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((y) => bpaReal[y]).map((y) => [y, r1(cierres[y] / bpaReal[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((p, q) => p - q);
export const PRECIO = 441.2;
// PER actual en la misma base que la historia: a 21-oct-2026 quedan 2,3 meses de 2026 y entran 9,7 de 2027.
export const BPA_NTM = r2(2.3 / 12 * bpa26 + 9.7 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / bpa27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
// Múltiplos históricos ADELANTADOS (misma base que la regla): EV al cierre (precio × acciones diluidas + deuda + arrendamientos
// − caja del balance de ese año [A1, A3-A5]) ÷ EBITDA del año siguiente (2026e: nuestro, en la guía); PER = la historia adelantada.
const balance = { 2021: [49.0, 3362, 260, 86], 2022: [48.9, 4304, 370, 214], 2023: [50.0, 5934, 549, 57], 2024: [50.1, 5337, 462, 103], 2025: [49.8, 5365, 447, 82] };
const ebitdaSig = { 2021: 1997, 2022: 2208, 2023: 2634, 2024: 2931, 2025: Math.round(v26 * a[0].margen_ebitda_pct / 100) };
const serieMult = Object.keys(balance).map((y) => { const [acc, d, ar, c] = balance[y]; const ev = cierres[y] * acc + d + ar - c; return { anio: y, precio_cierre: cierres[y], ev_ebitda_ntm: r1(ev / ebitdaSig[y]), per_ntm: adel.find((x) => x[0] === y)[1], excluir: false }; });
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'DKK', divisa_cotizacion: 'DKK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  bolsa: { ...(T.bolsa ?? {}), anual: BOLSA.bolsa?.anual ?? null },
  multiplos_historicos: { serie: serieMult, comentario: T.multiplos_comentario ?? null },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres segmentos (Northern Europe, Western Europe, International) venden las mismas categorías (cerveza, refrescos, sidra, agua, malta) con la misma organización de marcas, compras y producción compartidas [A1]; separar el negocio con licencia de PepsiCo no tiene precio de mercado propio.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: hipotecas 1.009 + entidades de crédito 4.373 + 1.282 = 6.664, de las que ≈ 455 son
    // arrendamientos (447 a 31-dic-2025 [A1]) → deuda financiera 6.209 y arrendamientos 455; caja 54 (deuda neta 6.610 [A2]).
    // otros_ajustes = recompras pagadas después del 30-jun (707.857 acciones, ≈ 322 M [A8, D13]): las acciones del cálculo ya
    // están netas de ellas, así que su coste se suma a la deuda. Sin minoritarios ni pensiones relevantes.
    puente: { fecha: '2026-06-30', deuda_financiera: 6209, arrendamientos: 455, caja: 54, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 322 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA: precio de cierre de cada ejercicio (31-dic, Yahoo [D1]) ÷ BPA diluido real del ejercicio siguiente sin plusvalías extraordinarias (2022: 23,1 DKK, sin la plusvalía de 360 M al revalorizar Hansa Borg; 2024: 25,2 DKK, sin la venta de las participaciones polacas) [A1, A3, A4, A5]; para el cierre de 2025 (574,5), ÷ nuestro 2026e (${n2(bpa26)}, en la guía de EBIT; consenso 34,06 [D2]). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: no hay años de pérdidas. PER actual = precio (441,2 DKK, cierre del 21-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(bpa26)} + 9,7/12 de 2027e ${n2(bpa27)}), la misma base que la historia. Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2019-2025.` },
      },
      comparables_per: { mediana: 13.7 },
      consenso: { bpa_ano1: 34.06, bpa_ano2: 37.65, objetivo_medio: 489.27, objetivo_min: 420, objetivo_max: 570, analistas: 15, tendencia_3m: 'bajadas', fuente: 'Yahoo Finance (S&P Global), 21-oct-2026: BPA de 2026 de 34,06 DKK y de 2027 de 37,65; objetivo medio de 489,27 DKK (420-570); 4 comprar, 10 mantener y 1 vender (hace tres meses 6 compras) [D2, D4]' },
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
    { id: 1, titulo: 'Heineken: análisis value del 14-oct-2026 (mismo sector; referencia de comparables, costes de materias primas y consumo de cerveza)', editor: 'Repositorio de análisis (informes/heineken-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/heineken-2026-10-14/' },
    { id: 2, titulo: 'Movimiento de precio de RBREW.CO (herramientas/movimiento.mjs): variaciones, distancias a máximos y mayores caídas', editor: 'Repositorio de análisis (Yahoo Finance)', tipo: 'Mercado', fecha: '2026-10-21', url: 'notas/movimiento.txt' },
  ],
  huecos: [],
};
