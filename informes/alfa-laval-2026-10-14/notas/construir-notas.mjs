// Escribe las notas A-E de Alfa Laval (corte 2026-10-14). Hechos con fuente; los juicios van en propio.mjs.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (letra, obj) => writeFileSync(join(DIR, `${letra}.json`), JSON.stringify({ _estado: 'completa', ...obj }, null, 1));

const AR = { titulo: 'Annual and Sustainability Report 2025 (cuentas consolidadas, notas, gobierno corporativo y resumen de diez años)', editor: 'Alfa Laval AB', tipo: 'Primaria', fecha: '2026-03', url: 'https://mb.cision.com/Main/905/4326341/4004513.pdf' };
const Q2 = { titulo: 'Report for Q2 2026 (informe del segundo trimestre de 2026)', editor: 'Alfa Laval AB', tipo: 'Primaria', fecha: '2026-07-21', url: 'https://mb.cision.com/Main/905/4376242/4199107.pdf' };
const Q1 = { titulo: 'Report for Q1 2026', editor: 'Alfa Laval AB', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://mb.cision.com/Main/905/4338489/4051867.pdf' };
const Q4 = { titulo: 'Report for Q4 and full year 2025', editor: 'Alfa Laval AB', tipo: 'Primaria', fecha: '2026-02-03', url: 'https://mb.cision.com/Main/905/4301540/3912618.pdf' };
const Q3 = { titulo: 'Report for Q3 2025', editor: 'Alfa Laval AB', tipo: 'Primaria', fecha: '2025-10-28', url: 'https://mb.cision.com/Main/905/4257427/3747406.pdf' };
const OBJ = { titulo: 'Alfa Laval updates financial targets (crecimiento del 7 % y margen EBITA ajustado del 17 % a lo largo del ciclo)', editor: 'Alfa Laval AB', tipo: 'Primaria', fecha: '2025-10-27', url: 'https://mb.cision.com/Public/905/4257395/8fca64ef83ad3000.pdf' };
const esef = (y, url) => ({ titulo: `Informe anual ${y} en formato ESEF (XBRL), repositorio filings.xbrl.org`, editor: 'Alfa Laval AB / XBRL International', tipo: 'Primaria', fecha: `${y + 1}-03`, url });

// ---------------- A. Cuentas ----------------
const cuenta = [
  { periodo: '2020', ingresos: 41468, coste_ventas: 27210, gastos_generales: 5959, ebitda: 7569, amortizaciones: 1989, ebit: 5580, resultado_financiero: -603, bai: 4977, impuestos: 1397, minoritarios: 27, beneficio_neto: 3553, gastos_financieros: 265, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 796, bpa: 8.47, dpa: 5.50, dpa_extraordinario: 0, acciones_diluidas: 419.5 },
  { periodo: '2021', ingresos: 40911, coste_ventas: 26401, gastos_generales: 6383, ebitda: 8113, amortizaciones: 1987, ebit: 6126, resultado_financiero: 16, bai: 6142, impuestos: 1341, minoritarios: 42, beneficio_neto: 4759, gastos_financieros: 217, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 192, bpa: 11.38, dpa: 6.00, dpa_extraordinario: 0, acciones_diluidas: 418.2 },
  { periodo: '2022', ingresos: 52135, coste_ventas: 34489, gastos_generales: 7939, ebitda: 8911, amortizaciones: 2392, ebit: 6519, resultado_financiero: -340, bai: 6179, impuestos: 1610, minoritarios: 66, beneficio_neto: 4503, gastos_financieros: 319, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 767, bpa: 10.89, dpa: 6.00, dpa_extraordinario: 0, acciones_diluidas: 413.5 },
  { periodo: '2023', ingresos: 63598, coste_ventas: 42714, gastos_generales: 9222, ebitda: 11780, amortizaciones: 2524, ebit: 9256, resultado_financiero: -606, bai: 8650, impuestos: 2269, minoritarios: 51, beneficio_neto: 6330, gastos_financieros: 506, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 15.31, dpa: 7.50, dpa_extraordinario: 0, acciones_diluidas: 413.3 },
  { periodo: '2024', ingresos: 66954, coste_ventas: 43747, gastos_generales: 10283, ebitda: 12853, amortizaciones: 2418, ebit: 10435, resultado_financiero: -439, bai: 9996, impuestos: 2564, minoritarios: 41, beneficio_neto: 7391, gastos_financieros: 493, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 17.88, dpa: 8.50, dpa_extraordinario: 0, acciones_diluidas: 413.3 },
  { periodo: '2025', ingresos: 69674, coste_ventas: 44476, gastos_generales: 10750, ebitda: 14252, amortizaciones: 2503, ebit: 11749, resultado_financiero: -551, bai: 11198, impuestos: 2875, minoritarios: 50, beneficio_neto: 8272, gastos_financieros: 571, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 20.01, dpa: 9.00, dpa_extraordinario: 0, acciones_diluidas: 413.3 },
];
const bal = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas) =>
  ({ periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas });
const historicoBalance = [
  bal('2020', 60860, 27622, 17440, 31789, 19080, 2204, 8321, 9223, 5834, 2526, null, 4381, 7768, 9168, 2235, 28908, 163, 28824),
  bal('2021', 64361, 26149, 23285, 32017, 22480, 3441, 9075, 10525, 6738, 3371, null, 4824, 3647, 8244, 2427, 32096, 248, 29937),
  bal('2022', 81249, 36456, 26559, 45545, 26258, 5159, 10710, 14775, 9717, 4891, null, 6634, 4663, 15062, 2671, 35382, 322, 31299),
  bal('2023', 82288, 38229, 29756, 44910, 25069, 4553, 11769, 14950, 10282, 4871, null, 7975, 5863, 13273, 2601, 37033, 345, 35056),
  bal('2024', 88803, 42070, 31454, 46521, 25630, 3929, 14490, 15574, 10258, 5676, 4000, 12893, 7819, 10274, 3038, 41912, 369, 39326),
  bal('2025', 98161, 42965, 36365, 54408, 29722, 6723, 15856, 15548, 9949, 5444, 5052, 12293, 7831, 17216, 3795, 43409, 344, 44087),
];
const flu = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, intereses_en_financiacion) =>
  ({ periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones: 0, intereses_en_financiacion });
const historicoFlujos = [
  flu('2020', 8154, 1232, 431, 70, 125, 0, 0, 260),
  flu('2021', 5658, 1229, 394, 3828, 8, 2307, 1339, 210),
  flu('2022', 3737, 1853, 446, 3685, 0, 2480, 661, 290),
  flu('2023', 9694, 2440, 525, 337, 0, 2480, 0, 489),
  flu('2024', 12778, 3336, 619, 50, 0, 3100, 0, 337),
  flu('2025', 9166, 2660, 503, 9412, 159, 3513, 0, 357),
];
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

w('A', {
  negocio: {
    segmentos: [
      seg('Energy', 'Intercambiadores de placas con juntas, de placas soldadas por cobre o fusión, soldados, de aire y criogénicos (Fives Cryogenics desde jul-25). Clientes: climatización y refrigeración, centros de datos y semiconductores, petróleo y gas, química, energía y GNL. Resultado = EBITA ajustado de la división [A1, A2].', [['2024', 19330, 3740], ['2025', 20250, 3435], ['LTM jun-26', 22014, 3644]]),
      seg('Food & Pharma', 'Antes Food & Water: separadores y decantadores, equipos higiénicos de proceso (bombas, válvulas), ingeniería de procesos (Desmet: aceites, grasas, proteínas y biocombustibles), agua y residuos, farmacia. Tetra Pak es el mayor cliente [A1, A2].', [['2024', 25742, 3822], ['2025', 25635, 3882], ['LTM jun-26', 24807, 3760]]),
      seg('Ocean', 'Antes Marine: bombas de carga Framo, calderas, separadores de combustible, tratamiento de agua de lastre y de gases, suministro de GNL y metanol, software StormGeo y servicio a la flota [A1, A2].', [['2024', 21881, 4017], ['2025', 23790, 5433], ['LTM jun-26', 23302, 5388]]),
      seg('Other', 'Gastos centrales y negocios no estratégicos; desde 2026 incluye una pequeña actividad con ventas (303 M en el 1S26) [A1, A2].', [['2024', 0, -491], ['2025', 0, -416], ['LTM jun-26', 303, -417]]),
    ],
    geografias: [
      { nombre: 'Unión Europea (con Suecia)', peso_pct: 24.2 }, { nombre: 'Resto de Europa', peso_pct: 6.9 }, { nombre: 'EE. UU. y resto de Norteamérica', peso_pct: 18.5 },
      { nombre: 'Latinoamérica', peso_pct: 5.7 }, { nombre: 'China', peso_pct: 19.0 }, { nombre: 'Corea del Sur', peso_pct: 6.7 }, { nombre: 'Resto de Asia', peso_pct: 16.1 }, { nombre: 'África y Oceanía', peso_pct: 2.9 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos recibidos (M SEK)', valor_anterior: '74.592 (2024)', valor_actual: '66.742 (2025); 39.847 en el 1S26 (+16 %)', variacion: '−10,5 % en 2025; +35 % en el 2T26', comentario: 'Récord trimestral en el 2T26 (22.235 M, +29 % orgánico) por petroleros, centros de datos y un pedido de biodiésel y SAF en Brasil de más de 1.000 M [A1, A2].' },
      { kpi: 'Cartera de pedidos (M SEK)', valor_anterior: '52.319 (dic-24)', valor_actual: '48.259 (dic-25); 53.546 (jun-26)', variacion: '+11 % en el 1S26', comentario: '29.100 M para facturar en el 2S26; Ocean 22.931 M (43 %) [A2].' },
      { kpi: 'Servicio en % de las ventas', valor_anterior: '30,2 % (2024)', valor_actual: '30,4 % (2025); 28,5 % en el 2T26', variacion: '+0,2 puntos', comentario: 'El servicio cayó un 1 % en el 2T26 por la divisa (−4,7 %); orgánico +2,9 % [A2, A4].' },
      { kpi: 'Margen EBITA ajustado', valor_anterior: '16,6 % (2024)', valor_actual: '17,7 % (2025); 17,0 % en el 2T26', variacion: '+1,1 puntos en 2025', comentario: 'Objetivo nuevo: 17 % de media en el ciclo (antes 15 %) [A1, A7].' },
      { kpi: 'Rentabilidad del capital empleado (ROCE)', valor_anterior: '23,2 % (2024)', valor_actual: '23,9 % (2025); 21,7 % (jun-26)', variacion: '−2,2 puntos en 12 meses', comentario: 'Sin fondo de comercio ni revalorizaciones de compras: 60,8 % en 2025 [A1, A2].' },
      { kpi: 'Empleados (equivalentes a jornada completa)', valor_anterior: '22.828 (jun-25)', valor_actual: '24.832 (jun-26)', variacion: '+8,8 %', comentario: 'Fives Cryogenics (714 empleados) y una compra en China [A1, A2].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 70426, ebitda: 14443, ebit: 11676, beneficio_neto: 8194, bpa: 19.82, dpa: 9.00, dpa_extraordinario: 0, fcf: 5536, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Fives Cryogenics, consolidada desde el 7-jul-2025 (9.210 M SEK; unos 2.250 M de ventas anuales): solo medio año en la cuenta.' },
      { periodo: '2022', descripcion: 'Desmet (ingeniería de aceites y biocombustibles) y Scanjet, compradas en 2022; 3.685 M de salida de caja por compras.' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 16208, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3221, margen_ebitda_pct: 19.9, bpa: 4.77, vs_consenso: null },
      { periodo: '4T24', ingresos: 18311, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3431, margen_ebitda_pct: 18.7, bpa: 4.96, vs_consenso: null },
      { periodo: '1T25', ingresos: 16465, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3369, margen_ebitda_pct: 20.5, bpa: 4.82, vs_consenso: null },
      { periodo: '2T25', ingresos: 16819, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3451, margen_ebitda_pct: 20.5, bpa: 4.87, vs_consenso: null },
      { periodo: '3T25', ingresos: 17244, crecimiento_pct: 6.4, crecimiento_organico_pct: 8, ebitda: 3691, margen_ebitda_pct: 21.4, bpa: 5.53, vs_consenso: null },
      { periodo: '4T25', ingresos: 19146, crecimiento_pct: 4.6, crecimiento_organico_pct: 11, ebitda: 3742, margen_ebitda_pct: 19.5, bpa: 4.79, vs_consenso: null },
      { periodo: '1T26', ingresos: 15919, crecimiento_pct: -3.3, crecimiento_organico_pct: 2, ebitda: 3406, margen_ebitda_pct: 21.4, bpa: 4.59, vs_consenso: null },
      { periodo: '2T26', ingresos: 18117, crecimiento_pct: 7.7, crecimiento_organico_pct: 5.9, ebitda: 3605, margen_ebitda_pct: 19.9, bpa: 4.91, vs_consenso: null },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: historicoBalance,
    vencimientos: null,
    liquidez: 'Caja y depósitos a corto de 4.977 M SEK a 30-jun-26 [A2]; deuda bruta con entidades de crédito de 17.507 M: bonos 7.628 M, préstamos a plazo 4.172 M, pagarés 3.331 M, Swedish Export Credit 2.218 M y bancos 157 M [A2]. Líneas no dispuestas: n.d. en lo leído.',
    rating: 'n.d. (no se ha localizado una calificación pública en el informe anual ni en los trimestrales)',
    coste_deuda_pct: 3.8,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: historicoFlujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young AB (socios firmantes Andreas Troberg y Hanna Fehland)', anios_auditor: 4, opinion: 'Favorable', confianza: 'Media' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2025', objetivo: 'Fives Cryogenics (intercambiadores criogénicos y de aluminio para GNL, hidrógeno y gases industriales)', importe: 9210, ev_ebitda: null, financiacion: 'Deuda (préstamos a plazo y bonos)', resultado: 'Aportó 1.135 M de ventas y 191 M de EBITA ajustado en el 2S25 (año completo pro forma: 2.250 y 421 M): EV/EBITA ≈21,9x. Pedidos fuertes en el 2T26; presiona el margen de Energy (16,1 % en el 2T26) [A1, A2].' },
      { anio: '2026', objetivo: 'Fabricante de intercambiadores de calor en China', importe: 515, ev_ebitda: null, financiacion: 'Caja', resultado: 'Demasiado reciente para juzgarla [A2].' },
      { anio: '2022', objetivo: 'Desmet (ingeniería de procesos de aceites, grasas, proteínas y biocombustibles) y Scanjet (limpieza de tanques, 314 M)', importe: 3685, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Desmet trae el mayor pedido de la historia del grupo (biodiésel y SAF en Brasil, >1.000 M, 2T26) y pasa a integración completa en oct-26; sin deterioros publicados [A1, A2].' },
      { anio: '2021', objetivo: 'StormGeo (software y meteorología para barcos) y otras', importe: 3828, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrado en Ocean como solución digital (más de 12.000 barcos); sin deterioros publicados [A2].' },
      { anio: '2023', objetivo: 'Marine Performance Systems (resto del capital)', importe: 141, ev_ebitda: null, financiacion: 'Caja y pago aplazado', resultado: 'El pago aplazado (117 M) se dio por perdido en 2024 y se rebajaron patentes y fondo de comercio: compra fallida, pequeña [A1].' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, ...AR }, { id: 2, ...Q2 }, { id: 3, ...Q1 }, { id: 4, ...Q4 }, { id: 5, ...Q3 },
    { id: 6, ...esef(2021, 'https://filings.xbrl.org/549300UCKT2UK88AG251/2021-12-31/ESEF/SE/1/549300UCKT2UK88AG251-2021-12-31-en.json') },
    { id: 7, ...OBJ },
    { id: 8, ...esef(2022, 'https://filings.xbrl.org/549300UCKT2UK88AG251/2022-12-31/ESEF/SE/0/549300UCKT2UK88AG251-2022-12-31-sv.json') },
    { id: 9, ...esef(2023, 'https://filings.xbrl.org/549300UCKT2UK88AG251/2023-12-31/ESEF/SE/0/549300UCKT2UK88AG251-2023-12-31-sv.json') },
    { id: 10, ...esef(2024, 'https://filings.xbrl.org/549300UCKT2UK88AG251/2024-12-31/ESEF/SE/0/549300UCKT2UK88AG251-2024-12-31-0-sv.json') },
  ],
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota 30 del informe anual 2025 (grep de vencimientos sin tabla legible en el texto extraído); 2) nota 8 del 2T26 (solo composición, sin calendario); 3) prensa de bonos (sin calendario completo)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2020-2023', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo 2024 y 2025 reexpresados); 2) XBRL 2021-2024 (segmentos con nombres antiguos sin reexpresar); 3) trimestrales (8 trimestres, desde el 3T24)', decision: 'Omitido' },
  ],
});

// ---------------- B. Sector y competencia ----------------
const MNM = { titulo: 'Plate & Frame Heat Exchanger Market worth $10.50 billion in 2030, at a CAGR of 7.8% (7.210 M USD en 2025)', editor: 'MarketsandMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2025-07-10', url: 'https://www.globenewswire.com/news-release/2025/07/10/3113014/0/en/Plate-Frame-Heat-Exchanger-Market-worth-10-50-billion-in-2030-at-a-CAGR-of-7-8-says-MarketsandMarkets.html' };
const GMI = { titulo: 'Plate Heat Exchanger Market Size (5.100 M USD en 2025; 8,4 % anual 2026-2035; cinco primeros con el 45 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/plate-heat-exchanger-market' };
const MAREX1 = { titulo: 'Chinese shipyards double their new order volume in first half of 2026 (1.481 barcos encargados; China 1.131, 31 M CGT)', editor: 'The Maritime Executive', tipo: 'Prensa', fecha: '2026-07-08', url: 'https://maritime-executive.com/article/chinese-shipyards-double-their-new-order-volume-in-first-half-of-2026' };
const MAREX2 = { titulo: 'Shipbuilding orderbook hits 17-year high driven by tankers, reports BIMCO (191 M CGT, 17 % de la flota; contratación del 1T26 +40 %)', editor: 'The Maritime Executive', tipo: 'Prensa', fecha: '2026-04-09', url: 'https://maritime-executive.com/article/shipbuilding-orderbook-hits-17-year-high-driven-by-tankers-reports-bimco' };
const DESMET = { titulo: 'Alfa Laval initiates full integration of Desmet to strengthen oils, fats and biofuel segments', editor: 'Alfa Laval AB (MFN)', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.mfn.se/cis/a/alfa-laval/alfa-laval-initiates-full-integration-of-desmet-to-strengthen-oils-fats-and-biofuel-segments-6b0c08e6' };
const CMD25 = { titulo: 'Alfa Laval Capital Markets Day 2025 - strengthening growth and profitability ambitions', editor: 'Alfa Laval AB (MFN)', tipo: 'Primaria', fecha: '2025-11-24', url: 'https://www.mfn.se/cis/a/alfa-laval/alfa-laval-capital-markets-day-2025-strengthening-growth-and-profitability-ambitions-2376d950' };
const FICHA = { titulo: 'Ficha sectorial «Transferencia de calor y separación de fluidos» (sectores/transferencia-calor-2026-10-14.md)', editor: 'Análisis propio', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/transferencia-calor-2026-10-14.md' };
const QUARTR = { titulo: 'Alfa Laval (ALFA) Q2 2026 earnings summary (guía de capex 2.500-3.000 M; pedidos del 3T por encima de 20.000 M)', editor: 'Quartr', tipo: 'Datos de mercado', fecha: '2026-07-27', url: 'https://quartr.com/events/alfa-laval-alfa-q2-2026_3sZzZdBj' };

w('B', {
  historia: {
    resumen: null,
    hitos: [
      { anio: '1883', hito: 'Fundación sobre el separador centrífugo de Gustaf de Laval; más de 140 años después vende en más de 100 países [B1, B5].' },
      { anio: '2014', hito: 'Compra de Frank Mohn (Framo), las bombas de carga sumergidas que hoy son la unidad Pumping Systems de Ocean [B1].' },
      { anio: '2016', hito: 'Tom Erixon (antes Ovako y Sandvik Coromant) toma el mando como consejero delegado el 1 de marzo [B1].' },
      { anio: '2021', hito: 'Compra de StormGeo (software y meteorología marítima); salida de caja por compras de 3.828 M [B1, A6].' },
      { anio: '2022', hito: 'Compra de Desmet (aceites, grasas y biocombustibles) y Scanjet; salida de Rusia con 767 M de partidas no recurrentes [B1].' },
      { anio: '2025', hito: 'Compra de Fives Cryogenics por 9.210 M (julio); objetivos nuevos de crecimiento del 7 % y margen del 17 % (octubre) [B1, A7].' },
      { anio: '2026', hito: 'Divisiones renombradas (Food & Pharma y Ocean); récord de pedidos en el 2T26 (22.235 M); día del inversor el 18-nov-2026 [A2, D10].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: null,
    tamano: 'Intercambiadores de placas y bastidor: 7.210 M USD en 2025 y 10.500 M USD en 2030 [B2]; intercambiadores de placas: 5.100 M USD en 2025 [B3]. ≈51.000-72.000 M SEK.',
    unidad_serie: 'millones de USD (intercambiadores de placas y bastidor, MarketsandMarkets)',
    serie: [{ anio: '2025', tamano: 7210 }, { anio: '2030e', tamano: 10500 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 7.8,
    cr5_pct: 45,
    estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  competencia: { cuota_pct: null, competidores: null, confianza: 'Media' },
  esg: { calificaciones: [], confianza: 'Media' },
  fuentes: [
    { id: 1, ...AR }, { id: 2, ...MNM }, { id: 3, ...GMI }, { id: 4, ...MAREX1 }, { id: 5, ...CMD25 }, { id: 6, ...MAREX2 }, { id: 7, ...DESMET }, { id: 8, ...FICHA }, { id: 9, ...QUARTR },
  ],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (sin calificaciones de terceros en lo leído); 2) búsqueda MSCI/Sustainalytics (sin acceso gratuito); 3) prensa (sin dato fechado)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Núcleo', intentos: '1) Informe anual 2025 (no publica cuota); 2) Global Market Insights (solo el 45 % conjunto de los cinco primeros); 3) MarketsandMarkets (lista de jugadores sin cuotas)', decision: 'Omitido' },
  ],
});

// ---------------- C. Equipo y gobierno ----------------
const AGM = { titulo: 'Bulletin from the Annual General Meeting of Alfa Laval AB (publ), 22-abr-2026 (dividendo 9,00 SEK, consejo, auditores)', editor: 'Alfa Laval AB (MFN)', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://www.mfn.se/cis/a/alfa-laval/bulletin-from-the-annual-general-meeting-of-alfa-laval-ab-publ-5979b5d8' };
w('C', {
  directivos: {
    equipo: [
      { nombre: 'Tom Erixon', cargo: 'Consejero delegado', desde: '2016', participacion_pct: 0.03, trayectoria: 'Antes consejero delegado de Ovako y presidente de Sandvik Coromant. Con él las ventas pasaron de 35.634 M (2016) a 69.674 M (2025) y el margen EBITA ajustado del 15,6 % al 17,7 %; 129.200 acciones. Nacido en 1960 [C1].' },
      { nombre: 'Fredrik Ekström', cargo: 'Director financiero', desde: '2022', participacion_pct: 0.00, trayectoria: 'En el grupo desde 1998; antes presidente de la unidad de intercambiadores de placas soldadas por cobre y fusión. 5.000 acciones [C1].' },
      { nombre: 'Dennis Jönsson', cargo: 'Presidente del consejo', desde: '2020', participacion_pct: 0.05, trayectoria: 'Antiguo consejero delegado de Tetra Pak; el consejo lo considera independiente de la empresa y de los grandes accionistas. 210.000 acciones [C1].' },
      { nombre: 'Thomas Møller', cargo: 'Presidente de la división Energy', desde: '2021', participacion_pct: 0.00, trayectoria: 'En el grupo desde 2002; la división pasó de 19.330 M a 22.014 M de ventas en los 12 meses a jun-26 con Fives Cryogenics [C1, A2].' },
      { nombre: 'Martijn Bergink', cargo: 'Presidente de la división Ocean', desde: '2025', participacion_pct: 0.00, trayectoria: 'Dirigió Pumping Systems y Framo desde 2019; Ocean dio un margen EBITA ajustado del 24,9 % en el 2T26 [C1, A2].' },
      { nombre: 'Sammy Hulpiau', cargo: 'Presidente de la división Food & Pharma', desde: '2021', participacion_pct: 0.00, trayectoria: 'En el grupo desde 1988; margen de la división estable en el 14,7 % con inversiones en farmacia y flujo industrial [C1, A2].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Objetivos a medio plazo (hasta oct-25): crecimiento del 5 % y margen EBITA ajustado del 15 % de media en el ciclo; ROCE ≥ 20 %', real: 'Crecimiento 2016-2025 ≈7 % anual; margen del 17,7 % y ROCE del 23,9 % en 2025', cumplida: 'Sí' },
      { anio: '2T26', guia: 'Demanda del 2T algo mayor que en el 1T (abr-26)', real: 'Pedidos de 22.235 M frente a 17.612 M en el 1T', cumplida: 'Sí' },
      { anio: '2026', guia: 'Capex de 2.500-3.000 M en el año', real: '1.541 M en el 1S26 (en curso)', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Dennis Jönsson', cargo: 'Presidente', tipo: 'Independiente', desde: '2020', comisiones: 'Remuneraciones' },
      { nombre: 'Finn Rausing', cargo: 'Consejero', tipo: 'Dominical', desde: '2000', comisiones: 'Auditoría' },
      { nombre: 'Jörn Rausing', cargo: 'Consejero', tipo: 'Dominical', desde: '2000', comisiones: '' },
      { nombre: 'Ulf Wiinberg', cargo: 'Consejero', tipo: 'Independiente', desde: '2013', comisiones: '' },
      { nombre: 'Henrik Lange', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría' },
      { nombre: 'Ray Mauritsson', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: '' },
      { nombre: 'Lilian Fossum Biner', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría' },
      { nombre: 'Nadine Crauwels', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: '' },
      { nombre: 'Anna Müller', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: '' },
      { nombre: 'Annica Bresky', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: '' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 42.83, fijo: 18.52, variable_corto: 8.61, variable_largo: 7.06, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Winder Holding AG (familia Rausing, grupo Tetra Laval)', pct: 29.53, tipo: 'Referencia', variacion: 'Estable' },
      { nombre: 'State Street Bank and Trust (custodio)', pct: 7.11, tipo: 'Custodio', variacion: 'n.d.' },
      { nombre: 'BNY Mellon (custodio)', pct: 4.42, tipo: 'Custodio', variacion: 'n.d.' },
      { nombre: 'Northern Trust (custodio)', pct: 3.42, tipo: 'Custodio', variacion: 'n.d.' },
      { nombre: 'AMF Tjänstepension', pct: 3.35, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Swedbank Robur Fonder', pct: 2.89, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Alecta Tjänstepension', pct: 2.51, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 0, tipo: 'Autocartera', variacion: 'Sin acciones propias (413.326.315 acciones)' },
    ],
    insiders: [],
    alertas: [
      'Tetra Pak (grupo Tetra Laval, del accionista de referencia) es el primer cliente: 5.198 M de ventas en 2025 (7,5 %), con un acuerdo de distribución de 1999; los precios no son menores que a terceros según la empresa [C1].',
      'Consejero delegado de 66 años, en el cargo desde 2016: sin plan de sucesión público.',
    ],
    confianza: 'Media',
  },
  fuentes: [{ id: 1, ...AR }, { id: 2, ...AGM }],
  huecos: [
    { seccion: 'gobierno', campo: 'voto de la junta sobre remuneraciones', tipo: 'Complemento', intentos: '1) Boletín de la junta de 2026 (no da porcentajes); 2) informe de gobierno 2025 (sin recuento); 3) acta de la junta (no localizada)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos 12 meses', tipo: 'Complemento', intentos: '1) Registro de insiders de Finansinspektionen (no consultable desde aquí); 2) informe anual (tenencias iguales a dic-24 y dic-25 en casi todos); 3) prensa (sin noticias)', decision: 'Omitido' },
  ],
});

// ---------------- D. Mercado y valoración ----------------
const YB = { titulo: 'Históricos diarios de ALFA.ST, ^OMX y EXH4.DE (precio, rango, volumen, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ALFA.ST/history' };
const YC = { titulo: 'Consenso y datos de cotización de Alfa Laval y de los comparables (quoteSummary, earningsTrend y series fundamentales)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ALFA.ST/analysis' };
const MS = { titulo: 'Alfa Laval AB: finances (estimaciones 2026-2028 de ventas, EBITDA, EBITA, beneficio, BPA y dividendo; 17 analistas, objetivo medio 591 SEK)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/ALFA-LAVAL-AB-6494532/finances/' };
const RB = { titulo: 'Rendimiento del bono del Estado sueco a 10 años (SEGVB10YC), 13-oct-2026: 3,174 %', editor: 'Sveriges Riksbank', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://api.riksbank.se/swea/v1/Observations/SEGVB10YC/2026-10-08/2026-10-14' };
const ECB = { titulo: 'Tipos de cambio de referencia del euro, 14-oct-2026 (11,158 SEK; 1,1195 USD; 0,933 CHF; 0,84385 GBP)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data-api.ecb.europa.eu/service/data/EXR/D.SEK.EUR.SP00.A' };
const DAM = { titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' };
const CHART = { titulo: 'Baker Hughes to acquire Chart Industries (13.600 M USD de valor empresa; ventas 2024 de 4.200 M y EBITDA ajustado de 1.000 M)', editor: 'Hydrocarbon Engineering', tipo: 'Prensa', fecha: '2025-07-29', url: 'https://www.hydrocarbonengineering.com/gas-processing/29072025/baker-hughes-to-acquire-chart-industries/' };
const MFNCAL = { titulo: 'Calendario financiero de Alfa Laval en MFN (informe del 3T26 el 27-oct-2026; anual el 3-feb-2027)', editor: 'Modular Finance (MFN)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.mfn.se/all/a/alfa-laval' };
const CMD26 = { titulo: 'Save the date for the Alfa Laval Capital Markets Day on 18 November 2026', editor: 'Alfa Laval AB (MFN)', tipo: 'Primaria', fecha: '2026', url: 'https://www.mfn.se/cis/a/alfa-laval/save-the-date-for-the-alfa-laval-capital-markets-day-on-18-november-2026-5321f29c' };
import { readFileSync } from 'node:fs';
const comps = JSON.parse(readFileSync(join(DIR, '../../../sectores/transferencia-calor-2026-10-14-comparables.json'), 'utf8'));
const B = JSON.parse(readFileSync(join(DIR, 'bolsa.json'), 'utf8'));
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
w('D', {
  identificacion: {
    nombre: 'Alfa Laval AB (publ)', nombre_corto: 'Alfa Laval', ticker: 'ALFA', isin: 'SE0000695876', mercado: 'Nasdaq Stockholm (Large Cap)', indice_referencia: 'OMX Stockholm 30',
    pais: 'Suecia', pais_iso: 'SE', sector: 'Industria', industria: 'Maquinaria', sede: 'Lund (Suecia)', fundacion: '1883', empleados: 24832, web: 'www.alfalaval.com',
    precio: 587.8, fecha_precio: '2026-10-14', acciones: 413.326, capitalizacion_publicada: 242953, free_float_pct: 70.5,
    max_52s: 595.4, min_52s: 426.4, volumen_medio_diario: '≈ 261 M SEK/día (3 meses)', proximos_resultados: '2026-10-27',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 73900, ebitda: 15054, ebit: null, bpa: 21.38, dpa: 9.69, fuente: 'MarketScreener [D3]; Yahoo da 21,86 de BPA (8 analistas) [D2]' },
      { periodo: '2027e', ingresos: 82739, ebitda: 17046, ebit: null, bpa: 25.10, dpa: 10.81, fuente: 'MarketScreener [D3]; Yahoo 25,31 (7 analistas) [D2]' },
      { periodo: '2028e', ingresos: 89315, ebitda: 18509, ebit: null, bpa: 27.65, dpa: 11.85, fuente: 'MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: null, mantener: null, vender: null, po_medio: 591, po_min: 435, po_max: 675 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, beta: 0.99, volatilidad_pct: 22.1, max_drawdown_pct: -38.3, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((anio) => ({ anio, precio_cierre: cierres[anio], ev_ebitda_ntm: null, per_ntm: null, excluir: anio === '2020' || anio === '2021' })),
    confianza: 'Alta',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-07', objetivo: 'Fives Cryogenics (Francia; intercambiadores criogénicos)', comprador: 'Alfa Laval', ev: 9210, ev_ventas: 4.09, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de 9.210 M SEK sobre ventas pro forma de 2.250 M y EBITA ajustado de 421 M (≈21,9x EBITA) [A1].' },
      { fecha: '2025-07', objetivo: 'Chart Industries (EE. UU.; equipos criogénicos y de transferencia de calor)', comprador: 'Baker Hughes', ev: 135551, ev_ventas: 3.24, ev_ebitda: 13.6, prima_pct: null, excluir: false, comentario: '13.600 M USD (≈135.551 M SEK al cambio del 14-oct-26) sobre ventas 2024 de 4.200 M USD y EBITDA ajustado de 1.000 M USD; ≈9x con sinergias según el comprador [D8].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [{ id: 1, ...YB }, { id: 2, ...YC }, { id: 3, ...MS }, { id: 4, ...RB }, { id: 5, ...ECB }, { id: 6, ...DAM }, { id: 7, ...MFNCAL }, { id: 8, ...CHART }, { id: 9, ...AR }, { id: 10, ...CMD26 }],
  huecos: [
    { seccion: 'transacciones', campo: 'tercera operación con múltiplo', tipo: 'Complemento', intentos: '1) Xylem-Evoqua (2023: solo EBITDA combinado de las dos empresas, sin múltiplo propio); 2) Kelvion (privada, sin precio publicado); 3) SPX Flow-Lone Star (2022: no localizado el comunicado con el múltiplo)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Finansinspektionen (registro de cortos no consultado: sin acceso por API); 2) agregadores (sin dato fechado); 3) prensa (nada)', decision: 'Omitido' },
  ],
});

// ---------------- E. Sentimiento ----------------
const SA = { titulo: 'Alfa Laval AB (publ): noticias y transcripciones (canal RSS; titular del 21-jul-26: «give Q3 soft outlook»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://seekingalpha.com/api/sa/combined/ALFVF.xml' };
const PLACERA = { titulo: 'Alfa Laval: Högkvalitativt – men dyrt (análisis y debate tras el 1T26)', editor: 'Placera / Affärsvärlden', tipo: 'Foros y redes', fecha: '2026-04-24', url: 'https://placera.se/analys/alfa-laval-hogkvalitativt--men-dyrt-2026-04-24' };
const STW = { titulo: 'Stocktwits, flujo del símbolo ALFVY (sin mensajes en los últimos meses)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://api.stocktwits.com/api/2/streams/symbol/ALFVY.json' };
w('E', {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (noticias y transcripciones, ADR ALFVY)', fecha: '2026-07', n_comentarios: 0, tono: 'Neutro', resumen: 'Tras el 2T26 el titular que circula es la «perspectiva floja» del 3T, no el récord de pedidos; sin debate de lectores accesible [E1].' },
      { plataforma: 'Placera / Affärsvärlden (análisis con debate de lectores)', fecha: '2026-04', n_comentarios: 0, tono: 'Dividido', resumen: '«Alta calidad, pero cara»: escenario principal con ≈20 % de subida y bajista con ≈15 % de caída; Ocean y la corona, los riesgos [E2].' },
      { plataforma: 'Stocktwits (ALFVY)', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'Sin mensajes: el ADR no tiene seguimiento de particulares en EE. UU. [E3].' },
    ],
    temas: [
      { tema: 'Calidad frente a precio', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos dan la razón a los dos: ROIC muy por encima del WACC y precio en máximos de 52 semanas a ≈24,8 veces nuestro BPA de 2027 [E2].' },
      { tema: 'Ocean y el ciclo naval', postura: 'Bajista', peso: 'Medio', contraste: 'Los pedidos de Ocean subieron un 26 % orgánico en el 2T26 por petroleros y la cartera de la división es de 22.931 M; el riesgo es de 2028 en adelante, no de 2026 [A2, E2].' },
      { tema: 'Centros de datos', postura: 'Alcista', peso: 'Medio', contraste: 'Pedidos de Light Industry & Tech +104 % en el 1S26 dentro de Energy; entregas sobre todo en 2027 [A2].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [{ id: 1, ...SA }, { id: 2, ...PLACERA }, { id: 3, ...STW }],
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de los últimos tres meses', tipo: 'Complemento', intentos: '1) Reddit (búsqueda JSON bloqueada); 2) Stocktwits ALFVY (sin mensajes) y foro de Placera/Avanza (no abre sin sesión); 3) Affärsvärlden (muro de pago) y Seeking Alpha (titulares sin comentarios)', decision: 'Calculado y marcado como estimación' },
  ],
});
console.log('Notas A-E escritas');
