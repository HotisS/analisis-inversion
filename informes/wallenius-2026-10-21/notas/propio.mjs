// Parte del analista (Wallenius Wilhelmsen, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA SIN partidas no recurrentes con la proyección del DCF:
//   (ventas × (margen EBITDA − amortización) + resultado financiero) × (1 − 5 % de impuesto de tonelaje) × (1 − 8 % de
//   minoritarios: el 20 % de HMG en EUKOR; 86 M de 1.103 en 2025) ÷ acciones.
// Resultado financiero: −139 M en 2025 con 2.801 M de deuda y arrendamientos; −130 M en 2026e, −120 M en 2027e (menos deuda
// bruta y caja de la colocación) y −125 M en 2028e (deuda de los Shaper entregados).
// Acciones: 440,25 M tras la colocación (6-oct-2026) menos 0,23 M en autocartera = 440,02; media de 2026 ≈ 426 M.
// Calibrado con 2025 (ventas 5.240, EBITDA ajustado 1.811, amortización 651, financiero −139 → 2,10 frente a 2,09 sin MIRRAT)
// y con la guía de 2026 (≈ 1.600 M de EBITDA ajustado → 1,60 frente a 1,63 del consenso).
const VENTAS_2025 = 5240, ACC = 440.02;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, m, am, fin, acc) => r2(((v * (m - am) / 100 + fin) * 0.95 * 0.92) / acc);
const a = S.anios;
const v26 = VENTAS_2025 * (1 + a[0].crecimiento_pct / 100);
const v27 = v26 * (1 + a[1].crecimiento_pct / 100);
const caso = (dg, dm) => bpa(v27 * (1 + (a[2].crecimiento_pct + dg) / 100), a[2].margen_ebitda_pct + dm, a[2].amortizacion_pct_ventas, dg < 0 ? -130 : -125 + (dg > 0 ? 5 : 0), ACC);
export const BPA = { '2026': bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas, -130, 426), '2027': bpa(v27, a[1].margen_ebitda_pct, a[1].amortizacion_pct_ventas, -120, ACC), Bajista: caso(-4.0, -5.0), Base: caso(0, 0), Alcista: caso(3.0, 4.0) };

// Historia del PER. Cierres de cada año en Oslo pasados a USD con el tipo de Norges Bank del último día hábil [D1, D6].
const cierres = { 2019: 2.49, 2020: 2.72, 2021: 5.74, 2022: 9.85, 2023: 8.75, 2024: 8.24, 2025: 10.02 };
// BPA real publicado [A7, A1, A10]; 2025 SIN la plusvalía de MIRRAT (1.017 − 135 = 882 M ÷ 422,76 = 2,09), la misma base que
// nuestros casos; 2026 = nuestro 2026e.
const bpaReal = { 2019: 0.07, 2020: -0.68, 2021: 0.32, 2022: 1.60, 2023: 2.00, 2024: 2.30, 2025: 2.09, 2026: BPA['2026'] };
const adelTodos = Object.keys(cierres).map((y) => [y, bpaReal[+y + 1] > 0 ? r1(cierres[y] / bpaReal[+y + 1]) : null]);
const adel = adelTodos.filter((x) => x[1] != null);
const u5 = adel.slice(-5).map((x) => x[1]).sort((x, y) => x - y);
const alCierre = Object.keys(cierres).filter((y) => bpaReal[y] > 0.1).map((y) => [y, r1(cierres[y] / bpaReal[y])]);
// v2: se excluye 2021 (17,9x sobre un BPA de 0,32 deprimido por el covid: más de 3 veces la mediana).
const alCierreOk = alCierre.filter(([y]) => y !== '2021');
const c5 = alCierreOk.map((x) => x[1]).sort((x, y) => x - y);
const med = (v) => (v.length % 2 ? v[(v.length - 1) / 2] : r1((v[v.length / 2 - 1] + v[v.length / 2]) / 2));
export const PRECIO = 18.68;
export const PER = {
  actual: r1(PRECIO / BPA['2027']), mediana_5a: med(u5), minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: med(c5), minimo_5a: c5[0], media_larga: r1(c5.reduce((s, x) => s + x, 0) / c5.length), alCierre },
};
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'NOK', tipo_cambio: 0.106868, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
      veredicto: T.veredicto ?? 'No',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica como método: el transporte marítimo da ≈ 85 % del EBITDA y comparte clientes con la logística en tierra, que vende servicios a los mismos fabricantes y vive de los mismos volúmenes. EUKOR (80 %) se integra entera y el 20 % de Hyundai Motor Group se resta como minoritarios en el puente [A9].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda financiera 1.147 (895 no corriente + 252 corriente); arrendamientos NIIF 16 1.490
    // (fletamentos de barcos); caja 627. Minoritarios = opción de venta de HMG sobre el 20 % de EUKOR a valor actual (386)
    // + no dominantes contables (9) = 395. Pensiones netas 34. otros_ajustes = dividendo del primer semestre pagado el
    // 16-sep (+258, sale caja) − caja neta de la colocación del 6-oct (−295: 300 M brutos menos comisiones) = −37.
    puente: { fecha: '2026-06-30', deuda_financiera: 1147, arrendamientos: 1490, caja: 627, minoritarios: 395, pensiones: 34, asociadas: 0, otros_ajustes: -37 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout); Noruega sin prima de riesgo país', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA: precio de cierre de cada año en Oslo pasado a USD con el tipo de Norges Bank del último día hábil [D1, D6] ÷ BPA real del año siguiente [A7, A1] (2025 sin la plusvalía de MIRRAT: 2,09 USD; para el cierre de 2025, ÷ nuestro 2026e de ${n2(BPA['2026'])}, en línea con el consenso de 1,63 [D2]). Serie: ${fmt(adel)}. Fuera 2019 (BPA de 2020 negativo, −0,68 USD) y 2018 (BPA de 2019 casi nulo, 0,07). Mediana y mínimo de 2021-2025; media de 2020-2025. La historia es la de un ciclo de beneficios de pico: el mercado pagó 3,4-4,9 veces porque no creía que durasen. PER actual = precio (174,80 NOK = 18,68 USD, cierre del 21-oct-2026) ÷ nuestro BPA de 2027e (${n2(BPA['2027'])}).`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo año): ${fmt(PER.v2.alCierre)}. Fuera 2020 (pérdida) y 2021 (17,9x sobre un BPA de 0,32 deprimido por el covid, atípico). Mediana, mínimo y media de 2022-2025.` },
      },
      comparables_per: { mediana: 9.5 },
      consenso: { bpa_ano1: 1.63, bpa_ano2: 1.75, objetivo_medio: 17.46, objetivo_min: 12.54, objetivo_max: 21.97, analistas: 5, tendencia_3m: 'subidas', fuente: 'MarketScreener, 21-oct-2026: BPA de 1,63 USD en 2026e, 1,75 en 2027e y 1,43 en 2028e (5 analistas); Yahoo da 1,75 para 2027 (1,29 hace 90 días) [D2, D3]' },
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
    { id: 1, titulo: 'Modelo propio de ciclo ro-ro: margen de mitad de ciclo, inversión en flota y BPA normalizado (supuestos.mjs y propio.mjs del informe)', editor: 'Repositorio de análisis (informes/wallenius-2026-10-21/notas)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/wallenius-2026-10-21/notas/supuestos.mjs' },
  ],
  huecos: [],
};
