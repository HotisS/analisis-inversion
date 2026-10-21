// Parte del analista (Lagercrantz, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs?t=' + Date.now())).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA PUBLICADO (diluido, NIIF, DESPUÉS de amortizar los intangibles comprados: la misma base que la historia, que el
// consenso de MarketScreener y que el BPA de los comparables suecos), con la proyección del DCF:
//   (ventas × (margen EBITDA − amortizaciones % ventas) − resultado financiero) × (1 − 21,5 %) ÷ 206,6 M de acciones.
// Calibrado con FY2026 real: 10.609 × (21,53 − 5,56) % = 1.694; − 171 = 1.523; × 0,785 = 1.196 ÷ 206,54 = 5,79 SEK
// (publicado 5,81: el tipo real fue el 21,2 %). Sin minoritarios: Lagercrantz consolida el 100 % de las filiales con
// opciones de compra y venta sobre los socios minoritarios (las opciones de venta, 613 M, van al puente) [A5].
// Acciones: 206,191 M en circulación (A + B, sin las 3,027 M en autocartera) + ≈ 0,4 M de opciones de los programas de
// incentivos → 206,6 M, sin recompras no anunciadas [A5, C7].
// Resultado financiero: −171 M en FY2026 y −169 en los 12 meses a junio; el 1T dio −33 (intereses −38); sube con la deuda de las compras: −165, −180, −195.
const V26 = 10609, ACC = 206.6, FIN = [165, 180, 195];
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
function bpas(dg, dm) {
  let v = V26; const out = [];
  for (let i = 0; i < 3; i++) {
    const a = S.anios[i];
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    out.push(r2(((v * (a.margen_ebitda_pct + dm - a.amortizacion_pct_ventas) / 100 - FIN[i]) * (1 - 0.215)) / ACC));
  }
  return out;
}
const [b27, b28, b29] = bpas(0, 0);
export const BPA = { FY2027: b27, FY2028: b28, Bajista: bpas(-3, -1.5)[2], Base: b29, Alcista: bpas(2, 1)[2] };

// Historia del PER ADELANTADO: cierre de marzo de cada ejercicio (Yahoo, ajustado al desdoblamiento [D1]) ÷ BPA diluido
// publicado del ejercicio siguiente [A1-A4, D9]; para el cierre de FY2026 (198,90), ÷ nuestro FY2027e.
const cierres = { FY2018: 27.83, FY2019: 33.33, FY2020: 38.6, FY2021: 79.1, FY2022: 106.8, FY2023: 129.7, FY2024: 163.8, FY2025: 206.4, FY2026: 198.9 };
const bpaReal = { FY2018: 1.40, FY2019: 1.68, FY2020: 1.80, FY2021: 1.91, FY2022: 2.80, FY2023: 3.70, FY2024: 4.25, FY2025: 4.93, FY2026: 5.81, FY2027: b27 };
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 228.8;
// PER actual en la misma base: a 21-oct-2026 quedan 5,3 meses de FY2027 y entran 6,7 de FY2028.
export const BPA_NTM = r2(5.3 / 12 * b27 + 6.7 / 12 * b28);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / b27), solo_fy2028: r1(PRECIO / b28),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'SEK', divisa_cotizacion: 'SEK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las cinco divisiones (Electrónica, Mecánica, TecSec, Productos de nicho e Internacional) son el mismo modelo (filiales de nicho B2B con márgenes EBITA del 15-22 %, compradas a 7-10 veces el resultado y gestionadas de forma descentralizada) y tendrían los mismos comparables: Indutrade, Addtech, Lifco o Momentum [A1, B1]. Una suma de partes repetiría la valoración por comparables.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A5]: pasivos con interés sin pensiones 4.863 − arrendamientos 510 = 4.353 de deuda financiera;
    // caja 386; pensiones 55. otros_ajustes = pagos aplazados de compras 383 + opciones de venta de minoritarios 613 = 996
    // (pasivos sin interés asimilables a deuda; Lagercrantz no reconoce minoritarios, así que minoritarios = 0).
    puente: { fecha: '2026-06-30', deuda_financiera: 4353, arrendamientos: 510, caja: 386, minoritarios: 0, pensiones: 55, asociadas: 0, otros_ajustes: 996 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA diluido publicado (después de amortizar los intangibles comprados: la misma base que nuestros casos y que el consenso): cierre de marzo de cada ejercicio (Yahoo, ajustado por desdoblamientos [D1]) ÷ BPA real del ejercicio siguiente [A1-A4, D9]; para el cierre de FY2026 (198,90 SEK), ÷ nuestro FY2027e (${n2(b27)}). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de FY2019-FY2026. Sin exclusiones: el BPA ha subido todos los años. La subida del múltiplo de 17 a 35 veces entre 2018 y 2025 fue una revalorización del modelo de comprador en serie sueco, no un año atípico. PER actual = precio (228,80 SEK, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 5,3/12 de FY2027e ${n2(b27)} + 6,7/12 de FY2028e ${n2(b28)}). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre de marzo ÷ BPA del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026.` },
      },
      comparables_per: { mediana: 25.3 },
      consenso: { bpa_ano1: 6.81, bpa_ano2: 7.59, objetivo_medio: 268.88, objetivo_min: 230, objetivo_max: 290, analistas: 7, tendencia_3m: 'estables', fuente: 'MarketScreener, 21-oct-2026: BPA de FY2027 de 6,81 SEK y de FY2028 de 7,59 (FY2029: 8,26); objetivo medio de 7 analistas, 5 comprar y 2 mantener [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  bolsa: { posicion_corta_pct: 1.49, contexto: T.contexto ?? null },
  multiplos_historicos: { comentario: T.multiplos_comentario ?? null },
  comparables: { comentario: T.comparables_comentario ?? null },
  transacciones: { comentario: T.transacciones_comentario ?? null },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  sentimiento: null,
  fuentes: T.fuentes ?? [],
  huecos: [],
};
