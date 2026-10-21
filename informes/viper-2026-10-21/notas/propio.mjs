// Parte del analista (Viper Energy, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA POR UNIDAD ECONÓMICA (= BPA de la acción A después de impuestos, como el ajustado de la empresa):
//   (EBITDA − agotamiento − intereses) × (1 − 29 %) ÷ 369,7 M de unidades.
// El agotamiento en USD depende del volumen, no del precio: en los tres escenarios es el del base (mismo volumen).
// Calibrado con el 2T26: ventas 677, EBITDA ajustado 642, agotamiento 195, intereses 24 → (642 − 195 − 24) × 0,71 ÷ 369,7
// = 0,81 por trimestre frente a 0,76 del BPA ajustado publicado por acción A [A5] (diferencia: impuesto estatal y opciones).
// Impuesto del 29 %: federal 21 % + estatal ≈ 1 % sobre la parte de la acción A, y la carga fiscal implícita de las OpCo
// Units (su dueño paga el impuesto al canjearlas); guía de tipo en caja del 27-30 % [D13].
// Intereses: ≈ 1.900 M de deuda bruta tras Riverbend al 5,3 % medio ≈ 100 M en 2026-2027 y 90 M desde 2028 (amortización
// con el flujo sobrante); sin recompras ni compras nuevas en el número de unidades.
const UNIDADES = 369.7, TAX = 0.29;
const V25 = 1395;
const ventas = []; let v = V25;
for (const a of S.anios) { v = v * (1 + a.crecimiento_pct / 100); ventas.push(v); }
const amortUSD = S.anios.map((a, i) => ventas[i] * a.amortizacion_pct_ventas / 100);
const interes = [100, 100, 90, 90, 90];
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpaAnio = (i, vts, margen) => r2(((vts * margen / 100) - amortUSD[i] - interes[i]) * (1 - TAX) / UNIDADES);
// Escenarios del ejercicio 2028e con los perfiles de supuestos.mjs.
const caso = (nombre) => {
  const c = S.casos.find((x) => x.escenario === nombre);
  const perf = Object.fromEntries((c.perfil || []).map((p) => [p.periodo, p]));
  let w = ventas[0];
  for (const i of [1, 2]) {
    const a = S.anios[i]; const p = perf[a.periodo];
    w = w * (1 + (a.crecimiento_pct + (p ? p.crecimiento_pp : c.ajuste_crecimiento_pp)) / 100);
  }
  const p28 = perf['2028e'];
  return bpaAnio(2, w, S.anios[2].margen_ebitda_pct + (p28 ? p28.margen_pp : c.ajuste_margen_pp));
};
export const BPA = {
  '2026e': bpaAnio(0, ventas[0], S.anios[0].margen_ebitda_pct),
  '2027e': bpaAnio(1, ventas[1], S.anios[1].margen_ebitda_pct),
  Bajista: caso('Bajista'), Base: caso('Base'), Alcista: caso('Alcista'),
};

// Historia del PER ADELANTADO en BPA NORMALIZADO POR UNIDAD (misma base que los casos): resultado antes de impuestos de
// OpCo sin deterioros de techo (69 M en 2020, 768 M en 2025), sin pérdidas por extinción de deuda ni el bono de 2023, ×
// (1 − 22 %; 25 % en 2025) ÷ unidades A + B de cada año [A1-A3, A8]. Cierres de cada año [D1].
const cierres = { 2020: 11.62, 2021: 21.31, 2022: 31.79, 2023: 31.38, 2024: 49.07, 2025: 38.63 };
const bpaN = { 2021: 1.27, 2022: 2.92, 2023: 2.08, 2024: 2.16, 2025: 1.51, 2026: BPA['2026e'] };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaN[+a + 1])]);
// Se excluye 2021: su PER adelantado (7,3x) divide por el BPA de pico de 2022 (WTI de 95 USD), la regla de energía de
// lecciones-casos.md. 2024 (32,5x) no es atípico por la regla de 3 veces la mediana y se queda (el BPA de 2025 está bajo por el
// agotamiento a valor razonable de las compras, que sigue).
const validos = adel.filter(([a]) => a !== '2021');
const ult5 = validos.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaN[a]).map((a) => [a, r1(cierres[a] / bpaN[a])]);
const v2val = alCierre.filter(([a]) => a !== '2022');
const v2s = v2val.map((x) => x[1]).sort((a, b) => a - b);
const med = (s) => (s.length % 2 ? s[(s.length - 1) / 2] : r1((s[s.length / 2 - 1] + s[s.length / 2]) / 2));
export const PRECIO = 45.85;
// PER actual en la MISMA base: precio ÷ BPA de los próximos 12 meses (2,3 meses de 2026e y 9,7 de 2027e).
export const BPA_NTM = r2(2.3 / 12 * BPA['2026e'] + 9.7 / 12 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), mediana_5a: med(ult5), minimo_5a: ult5[0], media_larga: r1(validos.reduce((s, x) => s + x[1], 0) / validos.length), adel,
  v2: { mediana_5a: med(v2s), minimo_5a: v2s[0], media_larga: r1(v2val.reduce((s, x) => s + x[1], 0) / v2val.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.env.VER_BPA) console.log(JSON.stringify({ ventas: ventas.map((x) => Math.round(x)), amortUSD: amortUSD.map(Math.round), BPA, BPA_NTM, PER }, null, 1));

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Viper tiene un solo negocio (derechos mineros y regalías en el Pérmico), sin participadas ni segmentos con valor separable. La participación de Diamondback (≈ 39 % de las unidades) no es una parte del negocio sino del accionariado: se trata en la estructura y en los riesgos [A4, C1].', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A4]: deuda financiera 1.695 (bonos de 2030 y 2035 + revolving), caja 77. Minoritarios = 0 porque el
    // DCF divide entre TODAS las unidades (A + B + TWR IV). otros_ajustes = +314 (caja pagada por Riverbend el 1-jul, que el
    // DCF ya cuenta en ingresos) + 29 (recompras de julio) − ≈ 120 (caja retenida en el 3T: flujo ≈ 500 − distribuciones del
    // 2T pagadas en agosto ≈ 380) − ≈ 110 (flujo del 1 al 21 de octubre, que el DCF no cuenta porque empieza en la fecha de
    // corte) ≈ +113. Sin arrendamientos (US GAAP, y no tiene relevantes). Sin pensiones.
    puente: { fecha: '2026-06-30', deuda_financiera: 1695, arrendamientos: 0, caja: 77, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 113 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA NORMALIZADO POR UNIDAD (la misma base que los casos): cierre de cada año [D1] ÷ BPA del año siguiente sin deterioros de techo (69 M en 2020, 768 M en 2025), sin pérdidas por extinción de deuda ni el bono de 2023, con un impuesto del 22 % (25 % en 2025) y todas las unidades A + B [A1-A3]; para el cierre de 2025, ÷ nuestro 2026e (${n2(BPA['2026e'])}). Serie: ${fmt(adel)}. Se EXCLUYE 2021 (7,3x): divide por el BPA de pico de 2022 (WTI de 95 USD), regla de beneficio de pico en energía. 2024 (32,5x) se queda: está a 2,2 veces la mediana, por debajo del límite de 3, y el BPA de 2025 está bajo por el agotamiento a valor razonable de las compras, que no se revierte. Mediana y mínimo de los cinco años válidos (2020, 2022-2025); media de los mismos. El BPA GAAP de la acción A no sirve (−0,48 USD en 2025 por el deterioro; antes de 2023 era una sociedad comanditaria con otra fiscalidad). PER actual = 45,85 USD (cierre del 20-oct-2026) ÷ BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(BPA['2026e'])} + 9,7/12 de 2027e ${n2(BPA['2027e'])}). OJO: el BPA de 2026-2027 lleva el petróleo de la guerra (88 USD); con el de 2028e (${n2(BPA.Base)}) el PER sería ${n2(r1(PRECIO / BPA.Base))}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA normalizado del mismo año): ${fmt(PER.v2.alCierre)}. Se excluye 2022 (BPA de pico). Mediana, mínimo y media de 2021, 2023-2025.` },
      },
      comparables_per: { mediana: 19.3 },
      consenso: { bpa_ano1: 2.68, bpa_ano2: 2.64, objetivo_medio: 55.48, objetivo_min: 45, objetivo_max: 65, analistas: 21, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA de 2026 de 2,68 USD (16 analistas; 2,60 hace 90 días) y de 2027 de 2,64 (15; 2,41 hace 90 días); objetivo medio de 21 analistas [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  bolsa: { contexto: T.contexto ?? null },
  rentabilidad: T.rentabilidad ?? undefined,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Form 10-K 2025 de Viper Energy: reservas probadas (406.035 MBOE a 31-dic-2025, 78 % desarrolladas en producción), producción por cuenca y prueba de techo', editor: 'Viper Energy, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002074176&type=10-K' },
    { id: 2, titulo: 'Viper Energy reports second quarter 2026 results: pozos puestos en producción (691 brutos, 146 de Diamondback), 1.798 pozos en desarrollo, 1.589 a la vista y 106 equipos en sus tierras (12 de Diamondback)', editor: 'Viper Energy, Inc.', tipo: 'Primaria', fecha: '2026-08-03', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002074176&type=8-K' },
    { id: 3, titulo: 'Oil may be stronger than it looks, and Diamondback is on sale (caída de Diamondback del 16-sep-2026: rebaja de Morgan Stanley, venta de un directivo, rotación sectorial)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-09', url: 'https://www.marketbeat.com/articles/oil-may-be-stronger-than-it-looksand-diamondback-is-on-sale/' },
  ],
  huecos: [],
};
