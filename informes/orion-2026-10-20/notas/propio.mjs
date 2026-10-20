// Parte del analista (Orion, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { filas, BAJISTA, ALCISTA } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA SIN HITOS con la proyección del DCF: (EBITDA − amortización − 4 M de gasto financiero neto) × (1 − 20,5 %) ÷ 140,37 M
// de acciones (141,13 emitidas − 0,77 de autocartera tras la recompra de septiembre [A16]). Calibrado con 2026e: 4,06 EUR,
// igual que el consenso de Yahoo (4,06) [D2]; 2027e 4,67 (consenso 4,75); 2028e 5,06 (Inderes ≈ 5,07) [D3].
const ACC = 140.37, IMP = 0.205, FIN = 4;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (ebitda, da) => r2(((ebitda - da - FIN) * (1 - IMP)) / ACC);
const a = S.anios;
// Casos de 2028e con las mismas series que los escenarios del DCF (supuestos.mjs).
export const BPA = {
  '2026e': bpa(filas[0].ebitda, filas[0].da), '2027e': bpa(filas[1].ebitda, filas[1].da),
  Bajista: bpa(BAJISTA[2].ebitda, BAJISTA[2].da), Base: bpa(filas[2].ebitda, filas[2].da), Alcista: bpa(ALCISTA[2].ebitda, ALCISTA[2].da),
};

// Historia del PER en BPA SIN HITOS (hitos × 0,8 ÷ acciones; 2023 sin los 30,7 M de pensiones; 2024 con los 41 M de deterioros
// de I+D devueltos) [A2, A6-A11]. Cierres de la acción B a 31-dic (Yahoo, iguales al cierre oficial) [D1].
const cierres = { 2018: 30.28, 2019: 41.27, 2020: 37.53, 2021: 36.52, 2022: 51.24, 2023: 39.27, 2024: 42.78, 2025: 63.65 };
const bpaN = { 2019: 1.14, 2020: 1.32, 2021: 1.36, 2022: 1.16, 2023: 1.18, 2024: 1.82, 2025: 2.52, 2026: BPA['2026e'] };
const adel = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaN[+y + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
const alCierre = Object.keys(cierres).filter((y) => bpaN[y]).map((y) => [y, r1(cierres[y] / bpaN[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
export const PRECIO = 88.30;
// A 20-oct-2026 quedan 2,4 meses de 2026: BPA de los próximos 12 meses = 0,2 × 2026e + 0,8 × 2027e.
export const BPA_NTM = r2(0.2 * BPA['2026e'] + 0.8 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const n2 = (x) => String(x).replace('.', ',');
const fmt = (l) => l.map(([y, p]) => `${y} ${n2(p)}x`).join('; ');

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: deuda con intereses 132,7 = 123,2 de préstamos + 9,5 de arrendamientos; caja 130,2.
    // Pensiones: activo neto de 10,2 M (12,8 − 2,6) que suma. otros_ajustes = recompra de jul-sep (40,5 [A16]) + segundo plazo
    // del dividendo de 2025 (0,90 × 140,37 = 126,3; registro el 20-oct, pago el 27-oct: el precio de hoy ya va sin él) + pago
    // aplazado de compras (6,5). Asociada: 0,1.
    puente: { fecha: '2026-06-30', deuda_financiera: 123.2, arrendamientos: 9.5, caja: 130.2, minoritarios: 0, pensiones: -10.2, asociadas: 0.1, otros_ajustes: 173.3 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA SIN HITOS (la misma base que nuestros casos y que el consenso, que no proyecta hitos): cierre de la acción B a 31-dic [D1] ÷ BPA sin hitos del ejercicio siguiente (BPA publicado − hitos × 0,8 ÷ acciones; 2023 sin el ingreso de pensiones y 2024 con los deterioros de I+D devueltos) [A2, A6-A11]: 2019 1,14; 2020 1,32; 2021 1,36; 2022 1,16; 2023 1,18; 2024 1,82; 2025 2,52; para el cierre de 2025, ÷ nuestro 2026e (${n2(BPA['2026e'])}, igual que el consenso). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones, aunque 2022 (43,4x) refleja un beneficio de 2023 deprimido antes del despegue de Nubeqa. Con el BPA publicado (con hitos) la historia sería engañosa: el de 2022 lleva 1,33 EUR del pago inicial de MSD. PER actual = 88,30 EUR (cierre del 20-oct-2026) ÷ BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,2 × 2026e ${n2(BPA['2026e'])} + 0,8 × 2027e ${n2(BPA['2027e'])}).`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA sin hitos del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2019-2025.` },
      },
      comparables_per: { mediana: 12.95 },
      consenso: { bpa_ano1: 4.06, bpa_ano2: 4.75, objetivo_medio: 77.33, objetivo_min: 55, objetivo_max: 88, analistas: 6, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 20-oct-2026: BPA 2026e de 4,06 EUR (3,91 hace 90 días) y 2027e de 4,75 (4,61 hace 90 días); objetivo medio de 6 analistas [D2]' },
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
    { id: 1, titulo: 'Modelo propio de Orion en dos partes (Nubeqa y resto del negocio): supuestos.mjs y propio.mjs de este informe', editor: 'Repositorio de análisis (informes/orion-2026-10-20/notas)', tipo: 'Analistas', fecha: '2026-10-20', url: 'informes/orion-2026-10-20/notas/supuestos.mjs' },
  ],
  huecos: [],
};
