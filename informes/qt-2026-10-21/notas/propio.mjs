// Parte del analista (Qt Group, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA PUBLICADO (NIIF, con la amortización de los intangibles comprados), con la proyección del DCF:
//   (ventas × margen EBITDA − depreciación del 2 % − amortización de PPA − resultado financiero) × (1 − 21 %) ÷ acciones.
// PPA: ≈ 13,5 M en 2026 (6,8 M en el primer semestre [A3]), 13,0 en 2027 y 12,0 en 2028 (la tecnología de IAR se amortiza
// antes que los clientes). Resultado financiero: −3,5 M en 2026 (intereses del préstamo de IAR y diferencias de cambio),
// −3,0 en 2027 y −2,3 en 2028 con la deuda bajando según los vencimientos (33,4 / 32,6 / 76,5 M [A1]). Acciones: 25,39 M en
// circulación + el plan de incentivos (hasta 214.000) → 25,45 / 25,5 / 25,6 M; sin recompras.
// Contraste: 2026e da 1,11 EUR (consenso 1,00 en MarketScreener y 1,13 en Yahoo [D3, D2]).
const V25 = 216.281;
const PPA = { 2026: 13.5, 2027: 13.0, 2028: 12.0 }, FIN = { 2026: 3.5, 2027: 3.0, 2028: 2.3 }, ACC = { 2026: 25.45, 2027: 25.5, 2028: 25.6 };
const bpa = (v, margen, a) => Math.round(((v * (margen - 2.0) / 100 - PPA[a] - FIN[a]) * 0.79) / ACC[a] * 100) / 100;
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = (dg) => v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
const caso = (dg, dm) => bpa(v27(dg) * (1 + (S.anios[2].crecimiento_pct + dg) / 100), S.anios[2].margen_ebitda_pct + dm, 2028);
export const BPA = { 2026: bpa(v26, S.anios[0].margen_ebitda_pct, 2026), 2027: bpa(v27(0), S.anios[1].margen_ebitda_pct, 2027), Bajista: caso(-3.0, -4.0), Base: caso(0, 0), Alcista: caso(2.0, 2.0) };

// Historia del PER en base PUBLICADA [A1, A2] y cierres de cada ejercicio (Yahoo [D1]).
const cierres = { 2019: 21.0, 2020: 57.6, 2021: 133.6, 2022: 44.5, 2023: 64.16, 2024: 67.2, 2025: 32.94 };
const bpaPub = { 2020: 0.51, 2021: 0.88, 2022: 1.36, 2023: 1.39, 2024: 2.26, 2025: 1.25, 2026: BPA[2026] };
const EXCL = ['2021'];
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaPub[+a + 1])]);
const adelOk = adel.filter(([a]) => !EXCL.includes(a));
const u5 = adelOk.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaPub[a]).map((a) => [a, r1(cierres[a] / bpaPub[a])]);
const cieOk = alCierre.filter(([a]) => !EXCL.includes(a));
const c5 = cieOk.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 34.28;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 2,3 meses de
// 2026 y entran 9,7 de 2027 → BPA de los próximos 12 meses = 0,19 × 2026e + 0,81 × 2027e.
export const BPA_NTM = r2(0.19 * BPA[2026] + 0.81 * BPA[2027]);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / BPA[2026]), solo_2027: r1(PRECIO / BPA[2027]),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adelOk.reduce((s, x) => s + x[1], 0) / adelOk.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(cieOk.reduce((s, x) => s + x[1], 0) / cieOk.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las unidades Qt e IAR venden herramientas a los mismos programadores de sistemas embebidos, con los mismos clientes y canales, y la empresa no publica el resultado de cada una [A1, A3].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: deuda con intereses 126,6 = préstamos ≈ 117,8 + arrendamientos ≈ 8,8. Los arrendamientos NO se
    // restan: sus pagos van en el «capex» del DCF (si no, se contarían dos veces). Caja 42,4. otros_ajustes = liquidación forzosa
    // de los minoritarios de IAR (5,1 M en devengos a 31-dic-2025 [A1]), pendiente según el semestral.
    puente: { fecha: '2026-06-30', deuda_financiera: 117.8, arrendamientos: 0, caja: 42.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 5.1 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA PUBLICADO (NIIF, con la amortización de PPA; la misma base que nuestros casos y que el consenso de MarketScreener): precio de cierre de cada ejercicio (Yahoo [D1]) ÷ BPA real del ejercicio siguiente [A1, A2]; para el cierre de 2025 (32,94), ÷ nuestro 2026e (${n2(BPA[2026])}). Serie: ${fmt(adel)}. Se excluye 2021 (98 veces: burbuja del software con tipos cero; la acción cayó un 67 % en 2022). Mediana y mínimo de los cinco últimos años no excluidos (2020 y 2022-2025); media de 2019-2025 sin 2021. El de 2024 (53,8) está inflado por la caída del BPA de 2025 (compra de IAR y frenazo). PER actual = precio (34,28 EUR, cierre del 21-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,19 × 2026e ${n2(BPA[2026])} + 0,81 × 2027e ${n2(BPA[2027])}). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA publicado del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Sin 2021; mediana y mínimo de 2020 y 2022-2025, media de los mismos.` },
      },
      comparables_per: { mediana: 24.4 },
      consenso: { bpa_ano1: 1.13, bpa_ano2: 1.89, objetivo_medio: 34.25, objetivo_min: 27, objetivo_max: 38, analistas: 4, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA 2026 de 1,13 EUR (0,735 hace 90 días) y 2027 de 1,89 (1,23 hace 90 días), 4 analistas; MarketScreener: 1,00 / 1,76 / 2,25 EUR en 2026-2028, BPA publicado [D2, D3]' },
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
    { id: 1, titulo: 'Prueba de deterioro del fondo de comercio 2025 (tasa antes de impuestos del 9,8 %, crecimiento del 8-19 %, margen EBIT del 15-23 %) en el informe anual', editor: 'Qt Group Plc', tipo: 'Primaria', fecha: '2026-03-12', url: 'https://www.qt.io/hubfs/_website/QtV2/QtV2%20Investors/2025/Qt_AnnualReport_2025-EN.pdf' },
    { id: 2, titulo: 'Tipos de cambio EURUSD (1,1228), EURSEK (11,10) y EURCNY (7,47) del 21-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/EURUSD=X' },
  ],
  huecos: [],
};
