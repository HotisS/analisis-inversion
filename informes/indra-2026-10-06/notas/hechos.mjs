// Hechos de Indra (fases 2-4). Cifras en millones de EUR salvo indicación. Fuentes: ver construir.mjs.
// Todas copiadas de los documentos descargados en notas/docs (cuentas 2022-2025, informe semestral 1S26,
// notas de resultados trimestrales, IARC 2025, IAGC 2025) o de las páginas de datos de mercado citadas.

export const identificacion = {
  nombre: 'Indra Sistemas, S.A. (Indra Group)', nombre_corto: 'Indra', ticker: 'IDR', isin: 'ES0118594417',
  mercado: 'Bolsa de Madrid (Mercado Continuo; también Barcelona, Bilbao y Valencia)', indice_referencia: 'IBEX 35',
  pais: 'España', pais_iso: 'ES', sector: 'Industria (Aeroespacial y Defensa) / Tecnologías de la información',
  industria: 'Defensa, espacio, tráfico aéreo, movilidad y servicios TI (Minsait)',
  sede: 'Alcobendas (Madrid)', fundacion: '1993', empleados: 58383, web: 'www.indragroup.com',
  precio: 59.72, fecha_precio: '2026-10-05', acciones: 175.13, capitalizacion_publicada: 10459, free_float_pct: 50.9,
  max_52s: 66.15, min_52s: 38.40,
  volumen_medio_diario: '≈ 37,8 M EUR/día (632.260 acciones, media de 20 sesiones a 6-oct-2026)',
  proximos_resultados: null,
};

// Cuenta por naturaleza: coste_ventas = aprovisionamientos − variación de existencias.
export const cuenta = [
  { periodo: '2021', ingresos: 3390.4, coste_ventas: 837.3, gastos_generales: null, ebitda: 349.1, amortizaciones: 93.5, ebit: 255.5, resultado_financiero: -44.6, bai: 211.4, impuestos: 65.4, minoritarios: 2.7, beneficio_neto: 143.4, gastos_financieros: 45.8, bpa: 0.7543, dpa: 0.15, dpa_extraordinario: 0, acciones_diluidas: 193.16 },
  { periodo: '2022', ingresos: 3851.4, coste_ventas: 797.1, gastos_generales: null, ebitda: 400.3, amortizaciones: 99.9, ebit: 300.5, resultado_financiero: -42.4, bai: 255.8, impuestos: 80.2, minoritarios: 3.7, beneficio_neto: 171.9, gastos_financieros: 63.3, bpa: 0.9016, dpa: 0.25, dpa_extraordinario: 0, acciones_diluidas: 193.22 },
  { periodo: '2023', ingresos: 4343.1, coste_ventas: 901.9, gastos_generales: null, ebitda: 446.1, amortizaciones: 99.1, ebit: 347.0, resultado_financiero: -40.2, bai: 303.6, impuestos: 94.9, minoritarios: 2.9, beneficio_neto: 205.8, gastos_financieros: 73.1, bpa: 1.1008, dpa: 0.25, dpa_extraordinario: 0, acciones_diluidas: 188.52 },
  { periodo: '2024', ingresos: 4842.9, coste_ventas: 1043.7, gastos_generales: null, ebitda: 545.2, amortizaciones: 107.0, ebit: 438.3, resultado_financiero: -46.5, bai: 386.3, impuestos: 106.0, minoritarios: 2.7, beneficio_neto: 277.5, gastos_financieros: 82.7, bpa: 1.5799, dpa: 0.25, dpa_extraordinario: 0, acciones_diluidas: 175.67 },
  { periodo: '2025', ingresos: 5456.7, coste_ventas: 1325.4, gastos_generales: null, ebitda: 636.4, amortizaciones: 119.0, ebit: 517.3, resultado_financiero: 72.1, bai: 586.3, impuestos: 147.3, minoritarios: 3.1, beneficio_neto: 435.8, gastos_financieros: 92.9, bpa: 2.481, dpa: 0.30, dpa_extraordinario: 0, acciones_diluidas: 175.66 },
];

// LTM a junio de 2026 = 2025 + 1S26 − 1S25. FCF: definición Indra sin anticipos PEM y con factoring constante (364 + 15 − 65), estimación propia.
export const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 6185.7, ebitda: 827.4, ebit: 624.1, beneficio_neto: 440.4, bpa: 2.512, dpa: 0.30, dpa_extraordinario: 0, fcf: 314 };

export const trimestres = [
  { periodo: '3T24', ingresos: 1096, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 139, margen_ebitda_pct: 12.7, bpa: 0.40, vs_consenso: null },
  { periodo: '4T24', ingresos: 1443, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 176, margen_ebitda_pct: 12.2, bpa: 0.53, vs_consenso: null },
  { periodo: '1T25', ingresos: 1164, crecimiento_pct: 4.2, crecimiento_organico_pct: 3.0, ebitda: 125, margen_ebitda_pct: 10.7, bpa: 0.34, vs_consenso: null },
  { periodo: '2T25', ingresos: 1285, crecimiento_pct: 8.4, crecimiento_organico_pct: null, ebitda: 140, margen_ebitda_pct: 10.9, bpa: 0.88, vs_consenso: null },
  { periodo: '3T25', ingresos: 1162, crecimiento_pct: 6.0, crecimiento_organico_pct: null, ebitda: 140, margen_ebitda_pct: 12.1, bpa: 0.44, vs_consenso: null },
  { periodo: '4T25', ingresos: 1845, crecimiento_pct: 27.9, crecimiento_organico_pct: null, ebitda: 231, margen_ebitda_pct: 12.5, bpa: 0.82, vs_consenso: null },
  { periodo: '1T26', ingresos: 1334, crecimiento_pct: 14.6, crecimiento_organico_pct: 6.0, ebitda: 194, margen_ebitda_pct: 14.5, bpa: 0.43, vs_consenso: null },
  { periodo: '2T26', ingresos: 1844, crecimiento_pct: 43.5, crecimiento_organico_pct: null, ebitda: 263, margen_ebitda_pct: 14.3, bpa: 0.82, vs_consenso: null },
];

export const balance = [
  { periodo: '2021', activo_total: 4535.1, activo_corriente: 2756.5, pasivo_corriente: 1773.6, pasivo_total: 3694.0, fondo_comercio: 921.4, intangibles: 274.0, inmovilizado_material: 78.1, existencias: 366.8, clientes: 1023.1, proveedores: 1417.8, caja: 1235.0, deuda_financiera: 1475.5, arrendamientos: 106.6, patrimonio_neto: 820.2, minoritarios: 21.0, reservas: 395.1 },
  { periodo: '2022', activo_total: 4535.4, activo_corriente: 2730.2, pasivo_corriente: 2187.5, pasivo_total: 3530.8, fondo_comercio: 946.1, intangibles: 252.7, inmovilizado_material: 88.9, existencias: 465.5, clientes: 1193.5, proveedores: 1517.3, caja: 933.0, deuda_financiera: 975.6, arrendamientos: 90.4, patrimonio_neto: 987.0, minoritarios: 17.6, reservas: 541.0 },
  { periodo: '2023', activo_total: 4722.6, activo_corriente: 2594.0, pasivo_corriente: 2290.4, pasivo_total: 3586.6, fondo_comercio: 996.4, intangibles: 263.8, inmovilizado_material: 99.1, existencias: 554.7, clientes: 1229.8, proveedores: 1579.6, caja: 595.7, deuda_financiera: 702.6, arrendamientos: 124.0, patrimonio_neto: 1117.5, minoritarios: 18.5, reservas: 701.2 },
  { periodo: '2024', activo_total: 4955.7, activo_corriente: 2817.8, pasivo_corriente: 2458.8, pasivo_total: 3641.0, fondo_comercio: 1043.5, intangibles: 250.5, inmovilizado_material: 118.8, existencias: 658.8, clientes: 1155.1, proveedores: 1699.4, caja: 555.1, deuda_financiera: 529.5, arrendamientos: 132.3, patrimonio_neto: 1297.2, minoritarios: 17.6, reservas: 898.7 },
  { periodo: '2025', activo_total: 9134.8, activo_corriente: 4480.0, pasivo_corriente: 3624.3, pasivo_total: 7142.0, fondo_comercio: 1443.6, intangibles: 459.5, inmovilizado_material: 1145.9, existencias: 1261.4, clientes: 1746.3, proveedores: 2330.6, caja: 976.2, deuda_financiera: 1583.1, arrendamientos: 168.1, patrimonio_neto: 1734.2, minoritarios: 258.6, reservas: 1290.1 },
];

export const flujos = [
  { periodo: '2021', flujo_operativo: 344.6, capex: 49.2, pagos_arrendamientos: 33.7, adquisiciones: 42.3, desinversiones: 40.9, dividendos: 0, recompras: 4.8, emision_acciones: 0, intereses_en_financiacion: 36.7 },
  { periodo: '2022', flujo_operativo: 350.3, capex: 54.1, pagos_arrendamientos: 32.2, adquisiciones: 28.2, desinversiones: 1.1, dividendos: 26.5, recompras: 2.5, emision_acciones: 0, intereses_en_financiacion: 37.1 },
  { periodo: '2023', flujo_operativo: 379.5, capex: 62.7, pagos_arrendamientos: 32.7, adquisiciones: 284.2, desinversiones: 0, dividendos: 44.1, recompras: 32.5, emision_acciones: 0, intereses_en_financiacion: 44.3 },
  { periodo: '2024', flujo_operativo: 450.9, capex: 111.0, pagos_arrendamientos: 27.7, adquisiciones: 92.1, desinversiones: 61.0, dividendos: 44.1, recompras: 28.8, emision_acciones: 0, intereses_en_financiacion: 44.7 },
  { periodo: '2025', flujo_operativo: 516.2, capex: 137.8, pagos_arrendamientos: 29.9, adquisiciones: 811.5, desinversiones: 3.6, dividendos: 43.9, recompras: 30.7, emision_acciones: 0, intereses_en_financiacion: 55.7 },
];

// Segmentos tal como los reporta la empresa en las cuentas anuales (4 segmentos; Espacio dentro de Defensa hasta 2025). Resultado = EBIT.
export const segmentos = [
  { nombre: 'Defensa (incl. Espacio hasta 2025)', descripcion: 'Defensa aérea, terrestre (TESS, VCR 8x8), naval, Eurofighter, FCAS, radares, simulación y espacio', tipo_resultado: 'EBIT',
    historico: [{ periodo: '2022', ingresos: 662, resultado: 111 }, { periodo: '2023', ingresos: 817, resultado: 146 }, { periodo: '2024', ingresos: 1031, resultado: 186 }, { periodo: '2025', ingresos: 1407, resultado: 232 }] },
  { nombre: 'Tráfico Aéreo (ATM)', descripcion: 'Sistemas de gestión de tráfico aéreo, radares, radios y navegación', tipo_resultado: 'EBIT',
    historico: [{ periodo: '2022', ingresos: 299, resultado: 31 }, { periodo: '2023', ingresos: 361, resultado: 44 }, { periodo: '2024', ingresos: 468, resultado: 58 }, { periodo: '2025', ingresos: 523, resultado: 54 }] },
  { nombre: 'Movilidad', descripcion: 'Peaje, ticketing, sistemas ferroviarios y de tráfico', tipo_resultado: 'EBIT',
    historico: [{ periodo: '2022', ingresos: 348, resultado: 17 }, { periodo: '2023', ingresos: 366, resultado: 6 }, { periodo: '2024', ingresos: 362, resultado: 18 }, { periodo: '2025', ingresos: 398, resultado: 24 }] },
  { nombre: 'Minsait (TI)', descripcion: 'Servicios y soluciones TI para banca, administraciones públicas, energía y telecomunicaciones', tipo_resultado: 'EBIT',
    historico: [{ periodo: '2022', ingresos: 2542, resultado: 142 }, { periodo: '2023', ingresos: 2798, resultado: 151 }, { periodo: '2024', ingresos: 2982, resultado: 176 }, { periodo: '2025', ingresos: 3129, resultado: 208 }] },
];

// Ventas externas por zona (nota 27 de 2025).
export const geografias = [
  { nombre: 'España', peso_pct: 53.4 }, { nombre: 'Resto de Europa', peso_pct: 15.7 }, { nombre: 'Resto de América', peso_pct: 14.7 },
  { nombre: 'Asia, Oriente Medio y África', peso_pct: 8.6 }, { nombre: 'Brasil', peso_pct: 4.1 }, { nombre: 'Italia', peso_pct: 3.4 },
];

// Comparables: Stock Analysis (cotización, capitalización, valor empresa, ratios LTM) y MarketScreener (estimaciones 2026-2027), 6-oct-2026.
// NTM = 0,2355 × 2026e + 0,7645 × 2027e (86 días de 2026 por delante). Crecimiento NTM sobre LTM (jun-26) anualizado con exponente 1/1,27.
const w = 86 / 365.25;
const fx = { EUR: 1, SEK: 11.2425, GBP: 0.8488 };
const pares = [
  { nombre: 'Thales', ticker: 'HO', pais: 'FR', div: 'EUR', precio: 222.5, cap: 46600, ev: 47130, ev_ventas: 2.07, ev_ebitda_ltm: 13.42, ventas_ltm: 22820, ebitda_ltm: 3070, roic: 22.76, dn: 519, fcfy: 8.59, e: [[23833, 3835, 8.397], [25964, 4294, 11.37]] },
  { nombre: 'Leonardo', ticker: 'LDO', pais: 'IT', div: 'EUR', precio: 47.22, cap: 27910, ev: 32630, ev_ventas: 1.58, ev_ebitda_ltm: 12.43, ventas_ltm: 20590, ebitda_ltm: 2330, roic: 10.02, dn: 3530, fcfy: 3.96, e: [[22314, 2901, 2.381], [24801, 3356, 2.875]] },
  { nombre: 'Rheinmetall', ticker: 'RHM', pais: 'DE', div: 'EUR', precio: 953, cap: 45740, ev: 49260, ev_ventas: 4.32, ev_ebitda_ltm: 20.34, ventas_ltm: 11410, ebitda_ltm: 2310, roic: 18.67, dn: 2720, fcfy: 0.85, e: [[13937, 3170, 34.13], [18566, 4413, 50.44]] },
  { nombre: 'BAE Systems', ticker: 'BA.', pais: 'GB', div: 'GBP', precio: 18.55, cap: 54700, ev: 59830, ev_ventas: 2.04, ev_ebitda_ltm: 14.27, ventas_ltm: 29380, ebitda_ltm: 3750, roic: 13.69, dn: 4950, fcfy: 8.59, e: [[33211, 4749, 0.7666], [36218, 5194, 0.892]] },
  { nombre: 'Hensoldt', ticker: 'HAG', pais: 'DE', div: 'EUR', precio: 78.9, cap: 9540, ev: 10650, ev_ventas: 3.98, ev_ebitda_ltm: 27.3, ventas_ltm: 2680, ebitda_ltm: 346, roic: 8.24, dn: 1100, fcfy: 4.64, e: [[2808, 520.4, 1.515], [3285, 633.4, 2.179]] },
  { nombre: 'Saab', ticker: 'SAAB B', pais: 'SE', div: 'SEK', precio: 599.3, cap: 336490, ev: 338500, ev_ventas: 3.84, ev_ebitda_ltm: 29.01, ventas_ltm: 88190, ebitda_ltm: 10830, roic: 14.59, dn: 1600, fcfy: 2.11, e: [[97893, 14269, 15.01], [119058, 17694, 18.98]] },
  { nombre: 'Capgemini', ticker: 'CAP', pais: 'FR', div: 'EUR', precio: 109.95, cap: 18400, ev: 26330, ev_ventas: 1.12, ev_ebitda_ltm: 7.84, ventas_ltm: 23440, ebitda_ltm: 3080, roic: 9.47, dn: 7910, fcfy: 11.9, e: [[24296, 3800, 8.763], [25338, 3950, 10.64]] },
  { nombre: 'Sopra Steria', ticker: 'SOP', pais: 'FR', div: 'EUR', precio: 166.5, cap: 3150, ev: 4340, ev_ventas: 0.75, ev_ebitda_ltm: 6.45, ventas_ltm: 5760, ebitda_ltm: 556.7, roic: 11.42, dn: 1120, fcfy: 15.53, e: [[5855, 717.7, 15.82], [6079, 756.4, 17.92]] },
];
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
export const comparables = pares.map((p) => {
  const ntm = (k) => w * p.e[0][k] + (1 - w) * p.e[1][k];
  return {
    nombre: p.nombre, ticker: p.ticker, pais: p.pais, capitalizacion: Math.round(p.cap / fx[p.div]),
    ev_ventas: p.ev_ventas, ev_ebitda_ltm: p.ev_ebitda_ltm, ev_ebitda_ntm: r1(p.ev / ntm(1)), per_ntm: r1(p.precio / ntm(2)),
    crecimiento_pct: r1(((ntm(0) / p.ventas_ltm) ** (1 / 1.27) - 1) * 100), margen_ebitda_pct: r1((100 * p.ebitda_ltm) / p.ventas_ltm),
    roic_pct: r1(p.roic), dn_ebitda: r1(p.dn / p.ebitda_ltm), fcf_yield_pct: r1(p.fcfy),
  };
});
