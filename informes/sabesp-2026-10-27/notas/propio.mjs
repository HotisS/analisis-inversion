// Parte del analista (Sabesp, corte 2026-10-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
// BPA AJUSTADO (el de la empresa y el consenso): sin construcción, sin la actualización del activo financiero y sin no
// recurrentes. Fórmula: (ventas × (margen EBITDA − amortización) − intereses netos) × (1 − 26 %) ÷ 3.527,6 M de acciones.
// Calibrado con 2025: (22.213 × (59,5 % − 9,9 %) − 2.558) × (1 − 25,3 %) ÷ 3.417,5 = 1,85 BRL, igual que el ajustado publicado
// (9,24 antes del desdoblamiento 1:5) [A2]. Tipo 26 % (34 % nominal menos el efecto de los intereses sobre el capital propio).
// Acciones: 3.516,6 M en circulación (Yahoo [D2]) + ≈ 11 M entregadas a los minoritarios de EMAE el 27-oct-2026 [D14].
// Intereses netos: deuda neta media × coste medio. Deuda neta 34.200 M en jun-2026 [A4]; con capex de 20.000 M en 2026 y
// FCF negativo sube a ≈ 43.000 M a fin de 2026, ≈ 51.000 M en 2027 y ≈ 54.000 M en 2028 (estimación propia). Coste neto del
// 13 % en 2027 y del 12,5 % en 2028 (Selic del Focus 11,75 % y 10 % antes de las elecciones [D7], más alto tras ellas):
// 6.100 M en 2027 y 6.600 M en 2028; bajista 7.600 M (tipos +1,5 puntos y más deuda); alcista 5.800 M.
const ACC = 3527.6, V25 = 22213, TAX = 0.26;
const a = S.anios;
const v26 = V25 * (1 + a[0].crecimiento_pct / 100);
const v27 = (dg) => v26 * (1 + (a[1].crecimiento_pct + dg) / 100);
const v28 = (dg) => v27(dg) * (1 + (a[2].crecimiento_pct + dg) / 100);
const bpa = (v, m, am, int) => r2(((v * (m - am)) / 100 - int) * (1 - TAX) / ACC);
const cs = S.casos;
const BPA27 = bpa(v27(0), a[1].margen_ebitda_pct, a[1].amortizacion_pct_ventas, 6100);
// 2026e: 1S26 real 0,77 (0,44 + 0,33) [A3, A4] + 2S ≈ 0,74 (ventas 2S ≈ 12.850 M, EBITDA ≈ 7.650 M, amortización ≈ 1.550 M,
// intereses ≈ 2.550 M, tipo 26 %) = 1,51.
const BPA26 = 1.51;
export const BPA = {
  '2026': BPA26, '2027': BPA27,
  Bajista: bpa(v28(cs[0].ajuste_crecimiento_pp), a[2].margen_ebitda_pct + cs[0].ajuste_margen_pp, a[2].amortizacion_pct_ventas, 7600),
  Base: bpa(v28(0), a[2].margen_ebitda_pct, a[2].amortizacion_pct_ventas, 6600),
  Alcista: bpa(v28(cs[2].ajuste_crecimiento_pp), a[2].margen_ebitda_pct + cs[2].ajuste_margen_pp, a[2].amortizacion_pct_ventas, 5800),
};
// Historia del PER ADELANTADO: cierre de cada año (Yahoo, ajustado al desdoblamiento [D1]) ÷ BPA del año siguiente
// (2021-2023 publicado; 2024-2025 ajustado; 2026 el nuestro) [A2, A7].
const cierres = { 2020: 8.62, 2021: 7.79, 2022: 11.08, 2023: 14.62, 2024: 17.16, 2025: 26.64 };
const bpaR = { 2020: 0.285, 2021: 0.67, 2022: 0.91, 2023: 1.03, 2024: 1.51, 2025: 1.85, 2026: BPA26 };
const adel = Object.keys(cierres).map((x) => [x, r1(cierres[x] / bpaR[+x + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((p, q) => p - q);
// Al cierre (v2): excluido 2020 (BPA hundido por la COVID y el tipo de cambio).
const alCierre = Object.keys(cierres).filter((x) => x !== '2020').map((x) => [x, r1(cierres[x] / bpaR[x])]);
const c5 = alCierre.map((x) => x[1]).sort((p, q) => p - q);
export const PRECIO = 25.27;
export const PER = {
  actual: r1(PRECIO / BPA27), mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(c5.reduce((s, x) => s + x, 0) / c5.length), alCierre },
};
const fmt = (l) => l.map(([x, p]) => `${x} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'BRL', divisa_cotizacion: 'BRL', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS del IASB; CPC en Brasil)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: EMAE (energía y embalses) pesa menos del 3 % de los ingresos y del EBITDA; el resto es un único negocio regulado [A4].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A4, A5]: préstamos y bonos 51.658 M (con los arrendamientos dentro), caja e inversiones a corto
    // 17.441 M, minoritarios 136 M (EMAE, contable), pensiones 2.402 M × (1 − 34 %) = 1.585 M, asociadas 255 M (contable).
    // otros_ajustes = PPP de producción de agua 3.322 M + derivados de cobertura de la deuda en divisa 2.294 M = 5.616 M.
    puente: { fecha: '2026-06-30', deuda_financiera: 51658, arrendamientos: 0, caja: 17441, minoritarios: 136, pensiones: 1585, asociadas: 255, otros_ajustes: 5616 },
    // BAR: 88.000 M validada por ARSESP para 2024 [B2]; a jun-2026, estimación propia ≈ 113.800 M (88.000 + capex de 2025 y del
    // 1S26, 22.700 M − amortización regulatoria ≈ 3.600 M + actualización por IPCA ≈ 6.700 M).
    rab: 113800,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D11]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA de las acciones de hoy (desdoblamiento 1:5): precio de cierre de cada año (Yahoo [D1]) ÷ BPA del año siguiente (2021-2023 publicado, sin no recurrentes relevantes; 2024-2025 ajustado de la empresa [A2]; para el cierre de 2025, ÷ nuestro 2026e de ${n2(BPA26)}). Serie: ${fmt(adel)}. Sin exclusiones (el cierre de 2019, ÷ el BPA de 2020 hundido por la COVID y el tipo de cambio, queda fuera de la ventana). Mediana y mínimo de 2021-2025; media de 2020-2025 (seis años; no hay BPA fiable de 2019 en el XBRL). PER actual = 25,27 BRL (cierre del 26-oct-2026) ÷ nuestro BPA de 2027e (${n2(BPA27)}).`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio ÷ BPA del mismo año): ${fmt(PER.v2.alCierre)}. Excluido 2020 (BPA hundido por la COVID y el tipo de cambio).` },
      },
      comparables_per: { mediana: 12.9 },
      consenso: { bpa_ano1: 1.77, bpa_ano2: 2.42, objetivo_medio: 34.6, objetivo_min: 23.8, objetivo_max: 41, analistas: 16, tendencia_3m: 'recortes', fuente: 'Yahoo Finance, 27-oct-2026: BPA de 2026 de 1,77 BRL y de 2027 de 2,42 (7 analistas; el de 2027 era 2,62 hace 90 días); objetivo medio 34,60 BRL de 16 analistas (15 comprar, 1 vender), probablemente anterior a las elecciones [D2]' },
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
  fuentes: T.fuentes ?? [],
  huecos: [],
};
