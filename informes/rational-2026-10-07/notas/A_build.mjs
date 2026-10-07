// Construye notas/A.json (subagente A, Rational). Cifras en millones de EUR.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
const ruta = new URL('./A.json', import.meta.url);
const rutaTextos = new URL('./A_textos.json', import.meta.url);
const textos = existsSync(rutaTextos) ? JSON.parse(readFileSync(rutaTextos, 'utf8')) : {};
const T = (k) => textos[k] ?? null;
const r = (x) => Math.round(x * 1000) / 1000;
const C = (periodo, ing, cv, ventas, admin, amort, ebit, bai, imp, bn, gf, bpa, dpa, ext) => ({
  periodo, ingresos: ing, coste_ventas: cv, gastos_generales: r(ventas + admin), ebitda: r(ebit + amort), amortizaciones: amort, ebit,
  resultado_financiero: r(bai - ebit), bai, impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, bpa, dpa, dpa_extraordinario: ext, acciones_diluidas: 11.37 });
const cuenta = [
  C('2019', 843.633, 346.077, 198.099, 37.295, 24.983, 223.375, 225.109, 53.519, 171.590, 0.838, 15.09, 9.50, 0),
  C('2020', 649.587, 289.468, 166.888, 36.596, 29.278, 106.806, 102.377, 22.281, 80.096, 0.739, 7.04, 4.80, 0),
  C('2021', 779.734, 350.460, 187.590, 39.961, 30.314, 160.134, 158.860, 35.197, 123.663, 0.646, 10.88, 10.00, 2.50),
  C('2022', 1022.345, 457.279, 236.579, 47.018, 30.918, 237.510, 237.743, 52.021, 185.722, 0.519, 16.33, 13.50, 2.50),
  C('2023', 1125.838, 487.217, 254.348, 51.972, 32.619, 277.001, 284.036, 70.068, 213.968, 1.304, 18.82, 13.50, 0),
  C('2024', 1193.529, 486.901, 264.825, 54.687, 37.394, 314.198, 325.916, 75.386, 250.530, 1.678, 22.03, 15.00, 0),
  C('2025', 1259.558, 516.116, 281.733, 53.830, 37.014, 332.552, 341.084, 87.236, 253.847, 1.913, 22.33, 20.00, 4.00),
];
const B = (periodo, at, ac, pc, pt, fc, intang, inm, ex, cl, pr, cajaEq, depos, deuda, arr, pn, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: intang,
  inmovilizado_material: inm, existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null,
  caja: r(cajaEq + depos), deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: 0, reservas: res });
const FC = textos.fondo_comercio || {};
const historicoB = [
  B('2019', 698.690, 495.084, 146.766, 181.322, FC['2019'] ?? null, 7.284, 183.308, 66.022, 125.344, 24.977, 181.390, 49.596, 9.584, 17.104, 517.368, 485.003),
  B('2020', 670.746, 453.743, 101.199, 135.655, FC['2020'] ?? null, 6.508, 194.977, 79.285, 98.750, 21.154, 231.128, 24.851, 4.676, 18.076, 535.091, 500.290),
  B('2021', 783.838, 565.269, 146.163, 180.508, FC['2021'] ?? null, 8.303, 196.078, 97.288, 108.787, 28.440, 253.695, 83.611, 2.125, 17.468, 603.330, 569.377),
  B('2022', 923.200, 661.929, 191.552, 222.982, FC['2022'] ?? null, 15.978, 203.917, 116.297, 174.663, 36.352, 207.901, 129.291, 0.944, 18.053, 700.218, 665.377),
  B('2023', 989.031, 702.004, 185.945, 228.242, FC['2023'] ?? null, 21.229, 219.307, 107.111, 171.659, 33.063, 137.962, 264.707, 0, 28.078, 760.789, 725.850),
  B('2024', 1106.161, 814.068, 204.136, 249.259, FC['2024'] ?? null, 19.024, 227.841, 107.593, 181.103, 33.230, 152.528, 348.870, 0, 29.797, 856.902, 822.885),
  B('2025', 1183.080, 893.905, 199.520, 242.287, FC['2025'] ?? null, 15.966, 234.616, 124.322, 199.860, 32.360, 186.318, 358.059, 0, 27.144, 940.793, 906.183),
];
const F = (periodo, fo, capex, arr, desinv, div, intf) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: 0, desinversiones: desinv, dividendos: div, recompras: 0, emision_acciones: 0, intereses_en_financiacion: intf });
const historicoF = [
  F('2019', 198.638, 40.674, 8.580, 0, 108.015, 0.273),
  F('2020', 92.690, 33.397, 9.082, 0, 64.809, 0.243),
  F('2021', 171.710, 25.820, 8.533, 0, 54.576, 0.227),
  F('2022', 160.618, 37.184, 9.078, 0, 113.700, 0.647),
  F('2023', 258.345, 34.632, 9.954, 0, 153.495, 1.163),
  F('2024', 283.064, 31.618, 11.277, 0.078, 153.495, 1.389),
  F('2025', 253.079, 33.704, 11.812, 0.031, 170.550, 1.393),
];
const Q = (periodo, ing, ant, ebit, da, bpa, org) => ({ periodo, ingresos: ing, crecimiento_pct: Math.round((ing / ant - 1) * 1000) / 10, crecimiento_organico_pct: org, ebitda: r(ebit + da), margen_ebitda_pct: Math.round((ebit + da) / ing * 1000) / 10, bpa, vs_consenso: T('vs_' + periodo) });
const items = [
  Q('3T24', 294.236, 272.288, 77.584, 9.624, 5.42, null),
  Q('4T24', 318.047, 292.762, 87.624, 10.066, 6.31, null),
  Q('1T25', 295.288, 286.425, 72.087, 9.612, 5.00, null),
  Q('2T25', 310.947, 294.821, 81.304, 9.471, 5.57, null),
  Q('3T25', 311.992, 294.236, 80.862, 9.584, 5.53, null),
  Q('4T25', 341.331, 318.047, 98.299, 8.346, 6.23, null),
  Q('1T26', 317.631, 295.288, 75.942, 9.371, 5.21, 11),
  Q('2T26', 323.903, 310.947, 93.992, 9.339, 6.43, 4),
];
for (const it of items) { const o = (textos.organico || {})[it.periodo]; if (o !== undefined) it.crecimiento_organico_pct = o; }
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: r(1259.558 - 606.235 + 641.533), ebitda: r((332.552 + 37.014) - (153.391 + 19.083) + (169.935 + 18.710)),
  ebit: r(332.552 - 153.391 + 169.935), beneficio_neto: r(253.847 - 120.253 + 132.321), bpa: r(22.33 - 10.58 + 11.64), dpa: 20.00, dpa_extraordinario: 4.00,
  fcf: r((253.079 - 79.438 + 130.974) - (33.704 - 9.127 + 16.498) - (11.812 - 5.883 + 6.087) - (1.393 - 0.704 + 0.688)) };
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const segmentos = [
  seg('DACH', 'Alemania, Austria y Suiza.', [['2023', 166.330, 39.659], ['2024', 169.027, 39.140], ['2025', 179.880, 42.613]]),
  seg('EMEA', 'Resto de Europa, Oriente Medio y África; el mayor segmento.', [['2023', 445.761, 113.211], ['2024', 476.609, 127.638], ['2025', 519.480, 144.959]]),
  seg('Norteamérica', 'Estados Unidos, Canadá y, hasta 2025, México (desde 2026 México pasa a Otros segmentos).', [['2023', 288.643, 76.357], ['2024', 299.192, 87.304], ['2025', 338.201, 89.578]]),
  seg('Asia Norte', 'China, Japón y Corea del Sur.', [['2023', 123.881, 24.760], ['2024', 118.769, 24.063], ['2025', 99.287, 17.712]]),
  seg('Otros segmentos', 'Latinoamérica y Asia Sur, no reportables por separado.', [['2023', 113.101, 27.543], ['2024', 122.288, 33.015], ['2025', 137.518, 38.236]]),
  seg('Corporativo y conciliación', 'Ingresos de los departamentos centrales y conciliación con el grupo, sobre todo por tipo de cambio.', [['2023', r(3.076 - 14.954), -4.529], ['2024', r(2.893 + 4.751), 3.038], ['2025', r(2.045 - 16.853), -0.546]]),
];
const geografias = [
  { nombre: 'Alemania', peso_pct: 10.3 }, { nombre: 'Europa (sin Alemania)', peso_pct: 42.6 }, { nombre: 'Norteamérica', peso_pct: 24.2 },
  { nombre: 'Asia', peso_pct: 10.7 }, { nombre: 'Latinoamérica', peso_pct: 6.7 }, { nombre: 'Resto del mundo', peso_pct: 5.5 },
];
const out = {
  negocio: { descripcion: T('descripcion'), como_gana_dinero: T('como_gana_dinero'), segmentos, geografias, geografias_criterio: 'destino', clientes: T('clientes'), kpis: T('kpis') ?? [], confianza: 'Alta' },
  financieros: { cuenta, ltm, cambios_perimetro: [], comentario: T('fin_comentario'), ajustes: T('fin_ajustes'), confianza: 'Alta' },
  trimestres: { items, ultima_presentacion: T('ultima_presentacion'), confianza: 'Alta' },
  balance: { historico: historicoB, vencimientos: [], liquidez: T('liquidez'), rating: 'Sin rating', coste_deuda_pct: null, vida_media_anios: null, otros_pasivos: T('otros_pasivos'), comentario: T('bal_comentario'), confianza: 'Alta' },
  flujos: { historico: historicoF, comentario: T('flu_comentario'), confianza: 'Alta' },
  calidad: T('calidad'),
  rentabilidad: T('rentabilidad'),
  capital: T('capital'),
  fuentes: [
    { id: 1, titulo: 'Annual Report 2025 (estados consolidados, notas y resumen de diez años)', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-03-19', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2025/rational-ag---annual-report-fy-2025-(single-pages).pdf' },
    { id: 2, titulo: 'Annual Report 2024 (con 2023 reexpresado según NIC 8)', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2025-03', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2024/rational-ag---annual-report-fy-2024-(single-pages).pdf' },
    { id: 3, titulo: 'Annual Report 2023', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2024-03', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2023/rational-ag---annual-report-2023.pdf' },
    { id: 4, titulo: 'Annual Report 2021', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2022-03', url: 'https://www.rational-online.com/media/investor-relations/annual-reports/rational-ag---annual-report-2021-(print).pdf' },
    { id: 5, titulo: 'Report on the first half year 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2026/rational-ag---report-on-the-first-half-year-2026.pdf' },
    { id: 6, titulo: 'Statement on the first quarter of 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2025/q1/rational-ag---statement-on-the-first-quarter-of-2026.pdf' },
    { id: 7, titulo: 'Statement on the first 9 months of 2025', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2025-11', url: 'https://www.rational-online.com/media/investor-relations/2025/q3/rational-ag---statement-on-the-first-9-months-of-2025.pdf' },
    { id: 8, titulo: 'Report on the first half year 2025', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2025-08', url: 'https://www.rational-online.com/media/investor-relations/2025/q2/rational-ag---report-on-the-first-half-year-2025.pdf' },
    { id: 9, titulo: 'Statement on the first quarter of 2025', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2025-05', url: 'https://www.rational-online.com/media/investor-relations/2025/q1/rational-ag---statement-on-the-first-quarter-of-2025.pdf' },
    { id: 10, titulo: 'Statement on the first 9 months of 2024', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2024-11', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2024/q3/rational-ag---statement-on-the-first-9-months-of-2024.pdf' },
    { id: 11, titulo: 'Presentation Earnings Call HY 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2026/rational-ag---earnings-call-q2-2026.pdf' },
    { id: 12, titulo: 'Presentation Earnings Call Q1 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2025/q1/rational-ag---earnings-call-q1-2026.pdf' },
    { id: 13, titulo: 'Letter of the Executive Board HY 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2026/rational-ag---letter-of-the-executive-board-hy-2026.pdf' },
    { id: 14, titulo: 'Letter from the Executive Board on the first quarter of 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2025/q1/rational-ag---letter-from-the-executive-board-on-the-first-quarter-of-2026.pdf' },
    { id: 15, titulo: 'Annual Report 2020', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2021-03', url: 'https://www.rational-online.com/media/investor-relations/annual-reports/rational-annual-report-2020.pdf' },
  ],
  huecos: T('huecos') ?? [],
};
writeFileSync(ruta, JSON.stringify(out, null, 2));
console.log('A.json escrito; LTM', JSON.stringify(ltm));
