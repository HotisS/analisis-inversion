// Parte del analista (Tencent, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const med = (a) => { const s = [...a].sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const media = (a) => a.reduce((x, y) => x + y, 0) / a.length;

export const TC = 0.85194; // RMB por HKD, BCE 16-oct-2026 [D2]
export const PRECIO = 355.94; // 417,80 HKD (cierre del 16-oct-2026) × 0,85194
const b = { Bajista: bpa('2028e', { g: -3, m: -3 }), Base: bpa('2028e'), Alcista: bpa('2028e', { g: 2, m: 1.5 }) };
const bpa26 = bpa('2026e').bpa, bpa27 = bpa('2027e').bpa;

// Historia del PER en BPA no NIIF diluido. Cierres de Yahoo (ajustados por los repartos en especie de JD.com y Meituan) × tipo
// del BCE de cada cierre [D1, D2]. BPA no NIIF diluido publicado 2022-2025 [A1-A4]; 2019-2021 estimado (beneficio no NIIF ÷
// acciones diluidas ≈9.580-9.770 M) y 2018 igual.
export const cierres = { 2018: 254.20, 2019: 309.57, 2020: 439.96, 2021: 342.99, 2022: 280.68, 2023: 267.05, 2024: 394.55, 2025: 538.73 };
export const bpaNoNiif = { 2018: 8.07, 2019: 9.86, 2020: 12.78, 2021: 12.70, 2022: 11.835, 2023: 16.320, 2024: 23.505, 2025: 27.877, 2026: bpa26 };
const adel = {}, cierreBase = {};
for (const a of Object.keys(cierres).map(Number)) { adel[a] = cierres[a] / bpaNoNiif[a + 1]; cierreBase[a] = cierres[a] / bpaNoNiif[a]; }
// Fuera de la media larga: 2020 (burbuja de internet del confinamiento: 34,6x adelantado). Ventana de 5 años: 2021-2025, sin exclusiones.
const ult5 = [2021, 2022, 2023, 2024, 2025];
const largo = [2018, 2019, 2021, 2022, 2023, 2024, 2025];
export const historia = {
  adelantado: Object.fromEntries(Object.entries(adel).map(([k, v]) => [k, r1(v)])),
  cierre: Object.fromEntries(Object.entries(cierreBase).map(([k, v]) => [k, r1(v)])),
};
const ph = {
  base: 'adelantado',
  actual: r1(PRECIO / bpa27),
  mediana_5a: r1(med(ult5.map((a) => adel[a]))),
  minimo_5a: r1(Math.min(...ult5.map((a) => adel[a]))),
  media_larga: r1(media(largo.map((a) => adel[a]))),
  excluidos: T.per_excluidos ?? null,
  v2: {
    mediana_5a: r1(med(ult5.map((a) => cierreBase[a]))),
    minimo_5a: r1(Math.min(...ult5.map((a) => cierreBase[a]))),
    media_larga: r1(media(largo.map((a) => cierreBase[a]))),
    excluidos: '2020 fuera de la media larga (burbuja del confinamiento). Historia al cierre: precio ÷ BPA no NIIF del mismo año.',
  },
};

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'CNY', divisa_cotizacion: 'HKD', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D4]' },
    rab: null,
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({
        escenario: e, metrica: 'PER 2028e (BPA no NIIF diluido)', beneficio_por_accion: r2(b[e].bpa), multiplo: null, precio: null,
        justificacion: T.just12?.[e] ?? null,
      })),
      per_historico: ph,
      comparables_per: { mediana: 13.0 },
      consenso: { bpa_ano1: 28.89, bpa_ano2: 30.50, objetivo_medio: r2(655.19 * TC), objetivo_min: r2(429.71 * TC), objetivo_max: r2(888.67 * TC), analistas: 41, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (BPA no NIIF y objetivos, 19-oct-2026) y MarketScreener (43 analistas, 560,64 CNY) [D6, D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
