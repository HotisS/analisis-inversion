// Parte del analista (Hollywood Bowl Group, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json;
// [P1] = fuente propia. Cifras en millones de GBP; por acción en GBP (la acción cotiza en peniques: 1 GBp = 0,01 GBP).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
const dir = path.dirname(fileURLToPath(import.meta.url));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

// BPA PROPIO, base NIIF 16 y con los deterioros de centros dentro (se repiten cada año), sin partidas ajustadas:
//   (ventas × (margen EBITDA del DCF − amortización del DCF) − intereses netos, casi todos de los arrendamientos)
//   × (1 − 25,5 %) ÷ acciones diluidas.
// Intereses: 13,9 M en FY2025 (13,7 de arrendamientos) [A2]; ≈ 5,9 % de un pasivo por arrendamientos que crece con las
// aperturas (235 M a mar-2026 → ≈ 245 M de media en FY2027 y ≈ 262 M en FY2028): 13,8 M en FY2026e, 14,5 en FY2027e y
// 15,5 en FY2028e. Acciones: 166,6 M en circulación a 30-sep-2026 [A9] + ≈ 0,9 M de dilución de los planes = 167,5 M,
// SIN recompras no anunciadas (la de 2,9 M del 2S26 ya terminó); FY2026e ≈ 168,0 M de media.
// Calibración: FY2026e = 19,6 p con 36,4 % de margen; el BPA ajustado de la empresa (pre-NIIF 16, sin deterioros: 22,47 p de
// consenso) queda ≈ 2,9 p por encima: 3,4 M de diferencia NIIF 16 frente a pre-NIIF 16 en FY2025 (46,0 frente a 49,4 M de BAI
// ajustado) y ≈ 2-3 M de deterioros [A2, D3].
const T_IMP = 0.745;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r4 = (x) => Math.round(x * 10000) / 10000;
const bpa = (v, margen, am, interes, acc) => r4(((v * (margen - am) / 100 - interes) * T_IMP) / acc);
const a = S.anios;
const V25 = 250.662;
const v26 = V25 * (1 + a[0].crecimiento_pct / 100);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (a[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (a[2].crecimiento_pct + dg) / 100);
  return { v27, v28, b27: bpa(v27, a[1].margen_ebitda_pct + dm, a[1].amortizacion_pct_ventas, 14.5, 167.5), b28: bpa(v28, a[2].margen_ebitda_pct + dm, a[2].amortizacion_pct_ventas, 15.5, 167.5) };
};
// Los casos de la regla a 12 meses usan los mismos desplazamientos que los escenarios del DCF (en FY2027e y FY2028e).
const cs = Object.fromEntries(S.casos.map((c) => [c.escenario, caso(c.ajuste_crecimiento_pp, c.ajuste_margen_pp)]));
const bpa26 = bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas, 13.8, 168.0);
export const BPA = { FY2026: bpa26, FY2027: cs.Base.b27, Bajista: cs.Bajista.b28, Base: cs.Base.b28, Alcista: cs.Alcista.b28 };

// Historia del PER en la MISMA base (NIIF 16, deterioros dentro, sin partidas ajustadas, impuesto al tipo general de cada año:
// 19 % en FY2022, 22 % en FY2023 —cambio al 25 % en abril de 2023— y 25 % desde FY2024), para que las rarezas del impuesto
// contable (30 % en FY2024, 21,8 % en FY2025) no muevan la serie:
//   BPA = (BAI publicado + no recurrentes) × (1 − tipo) ÷ acciones diluidas [A2, A5]:
//   FY2022 (46,665 − 3,688) × 0,81 ÷ 171,913 = 20,25 p; FY2023 (45,080 + 2,203) × 0,78 ÷ 172,302 = 21,40 p;
//   FY2024 (42,758 + 1,823) × 0,75 ÷ 172,802 = 19,35 p; FY2025 (44,284 − 1,160) × 0,75 ÷ 171,845 = 18,82 p.
// Cierres a 30 de septiembre (Yahoo [D1]). FY2021 y antes fuera: covid (FY2020-FY2021, BPA de 1 p) y antes de la NIIF 16.
const hist = { FY2022: 0.2025, FY2023: 0.2140, FY2024: 0.1935, FY2025: 0.1882, FY2026: bpa26, FY2027: cs.Base.b27 };
const cierres = Object.fromEntries(BOLSA.cierres_ejercicio.filter((c) => +c.anio.slice(2) >= 2021).map((c) => [c.anio, r4(c.precio_cierre / 100)]));
const sig = (y) => 'FY' + (+y.slice(2) + 1);
const adel = Object.keys(cierres).filter((y) => hist[sig(y)] && y !== 'FY2026').map((y) => [y, r1(cierres[y] / hist[sig(y)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
const alCierre = Object.keys(cierres).filter((y) => hist[y]).map((y) => [y, r1(cierres[y] / hist[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
export const PRECIO = 2.755;
// PER actual en la misma base que la historia (precio ÷ BPA de los 12 meses siguientes): a 20-oct-2026 quedan 11,3 meses de
// FY2027 y entran 0,7 de FY2028 → BPA de los próximos 12 meses = 11,3/12 × FY2027e + 0,7/12 × FY2028e.
export const BPA_NTM = r4(11.3 / 12 * cs.Base.b27 + 0.7 / 12 * cs.Base.b28);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / cs.Base.b27), solo_fy2028: r1(PRECIO / cs.Base.b28),
  mediana_5a: u5[Math.floor(u5.length / 2)], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[Math.floor(c5.length / 2)], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
const pen = (x) => n2(r2(x * 100));
if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER, v27: r1(cs.Base.v27), v28: r1(cs.Base.v28) }, null, 1));

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'GBP', divisa_cotizacion: 'GBp', tipo_cambio: 0.01, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (Reino Unido)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo negocio (centros de ocio) en dos países; Canadá (16 % de las ventas y 11 % del EBITDA de segmentos en FY2025) crece más pero comparte modelo, marca de grupo y equipo de aperturas [A2].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-sep-2026: caja neta de 13,5 M según el avance [A4] (sin deuda bancaria); arrendamientos de 235,1 M a 31-mar-2026
    // (último balance publicado; las 4 aperturas de FY2026 lo suben, las amortizaciones lo bajan) [A3]; otros_ajustes = pago
    // variable de Teaquinn pendiente (4,96 M a 31-mar-2026, sobre el EBITDA de FY2026, con tope de 17 M CAD) [A3].
    puente: { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 235.1, caja: 13.5, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 4.96 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en NUESTRA base de BPA (NIIF 16, deterioros dentro, sin partidas ajustadas, impuesto al tipo general de cada año), la misma que los casos: precio de cierre a 30 de septiembre (Yahoo [D1]) ÷ BPA real del ejercicio siguiente (FY2022 20,25 p; FY2023 21,40; FY2024 19,35; FY2025 18,82) [A2, A5]; para el cierre de FY2025 (252,5 p), ÷ nuestro FY2026e (${pen(bpa26)} p; ejercicio cerrado y sin publicar: ventas del avance y margen del 36,4 %). Serie: ${fmt(adel)}. Mediana, mínimo y media de FY2021-FY2025: solo cinco años válidos. Excluidos: FY2020 (cierre de los centros por el covid; BPA de 1 p en FY2021) y FY2019 y antes (antes de la NIIF 16: BPA no comparable, alquiler como gasto). El mínimo (8,8 veces, septiembre de 2022) es la crisis de energía y consumo británica. El BPA ajustado de la empresa (pre-NIIF 16, sin deterioros) es ≈ 2,9 p mayor y daría PER menores; no lo usamos porque los casos van en nuestra base. PER actual = precio (2,755 GBP, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${pen(BPA_NTM)} p = 11,3/12 de FY2027e ${pen(cs.Base.b27)} p + 0,7/12 de FY2028e ${pen(cs.Base.b28)} p). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre a 30 de septiembre ÷ BPA del mismo ejercicio, nuestra base): ${fmt(PER.v2.alCierre)} (FY2026 con nuestro FY2026e). Mediana y mínimo de FY2022-FY2026.` },
      },
      comparables_per: { mediana: 14.4 },
      consenso: { bpa_ano1: 0.2442, bpa_ano2: null, objetivo_medio: 3.89, objetivo_min: 3.40, objetivo_max: 4.50, analistas: 8, tendencia_3m: 'bajadas', fuente: 'Yahoo Finance, 20-oct-2026: BPA ajustado pre-NIIF 16 de FY2026 de 22,47 p (22,99 hace 90 días) y de FY2027 de 24,42 p (24,59 hace 90 días), 8 analistas; objetivo medio de 389 p (340-450) [D2]' },
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
    { id: 1, titulo: 'Computacenter: análisis value del 20-oct-2026 (mismo día; gilt a 10 años del Banco de Inglaterra y tipo GBP/GBp)', editor: 'Repositorio de análisis (informes/computacenter-2026-10-20)', tipo: 'Analistas', fecha: '2026-10-20', url: 'informes/computacenter-2026-10-20/' },
  ],
  huecos: [],
};
