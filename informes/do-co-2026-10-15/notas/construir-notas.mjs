// Escribe las notas A-E de DO & CO (corte 2026-10-15) con hechos de documentos leídos:
// cuentas ESEF (filings.xbrl.org), informes trimestrales, votaciones de la junta, informe de remuneraciones,
// Yahoo Finance (bolsa.mjs y quoteSummary de los comparables), MarketScreener, Bundesbank, BCE y prensa.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const ESEF = 'https://filings.xbrl.org/5299002NFQKOBT1E8569';
const IR = 'https://www.doco.com/Portals/8/berichte/jahres-und-quartalsberichte/en';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Finanzbericht Geschäftsjahr 2025/2026 (informe anual consolidado, ESEF)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-06-08', url: `${ESEF}/2026-03-31/ESEF/AT/0/docoag-2026-03-31-1-de/reports/docoag-2026-03-31-1-de.xhtml` },
  { id: 2, titulo: 'Finanzbericht Geschäftsjahr 2024/2025 (informe anual consolidado, ESEF)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2025-06', url: `${ESEF}/2025-03-31/ESEF/AT/1/docoag-2025-03-31-1-de/reports/docoag-2025-03-31-1-de.xhtml` },
  { id: 3, titulo: 'Finanzbericht Geschäftsjahr 2023/2024 (informe anual consolidado, ESEF): notas de deuda, bono convertible y arrendamientos', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2024-06', url: `${ESEF}/2024-03-31/ESEF/AT/0/docoag-2024-03-31-de/reports/docoag-2024-03-31-de.xhtml` },
  { id: 4, titulo: 'Finanzbericht Geschäftsjahr 2021/2022 (informe anual consolidado, ESEF): notas de deuda y arrendamientos', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2022-06', url: `${ESEF}/2022-03-31/ESEF/AT/0/docoag-2022-03-31-de/reports/docoag-2022-03-31-de.xhtml` },
  { id: 5, titulo: 'Financial Report 1st Quarter 2026/2027', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-08-12', url: `${IR}/q1_2627.pdf` },
  { id: 6, titulo: 'Corporate News: Results for the first quarter of the business year 2026/2027', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-08-12', url: 'https://www.doco.com/Portals/8/dokumente/en/News/Corporate-News-Q1-26-27-EN.pdf' },
  { id: 7, titulo: 'Financial Report 1st-3rd Quarter 2025/2026', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-02-11', url: `${IR}/q3_2526.pdf` },
  { id: 8, titulo: 'Financial Report 1st Half 2025/2026', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2025-11-12', url: `${IR}/q2_2526.pdf` },
  { id: 9, titulo: 'Financial Report 1st Quarter 2025/2026', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2025-08-13', url: `${IR}/q1_2526.pdf` },
  { id: 10, titulo: 'Financial Report 1st-3rd Quarter 2024/2025', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2025-02-12', url: `${IR}/q3_2425.pdf` },
  { id: 11, titulo: 'Financial Report 1st Quarter 2024/2025', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2024-08', url: `${IR}/q1_2425.pdf` },
  { id: 12, titulo: 'Informes anuales 2020/21 a 2025/26 en xBRL-JSON (series de cuenta, balance y flujos)', editor: 'XBRL International (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-06', url: `${ESEF}/2026-03-31/ESEF/AT/0/docoag-2026-03-31-1-de.json` },
];

const cta = (periodo, ingresos, coste_ventas, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, participadas, bpa, dpa, acciones) => ({
  periodo, ingresos, coste_ventas, gastos_generales: null, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros,
  participadas_en_ebitda: participadas, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acciones,
});

const A = {
  _estado: 'completa',
  financieros: {
    cuenta: [
      cta('FY2021', 253.5, 69.1, 45.0, 72.3, -27.3, -18.1, -45.4, -7.8, 0.8, -38.3, 21.3, 1.16, -3.93, 0, 9.744),
      cta('FY2022', 705.2, 272.2, 96.3, 53.9, 42.4, -18.4, 24.0, 10.1, 2.9, 11.0, 21.4, 0.98, 1.13, 0, 9.744),
      cta('FY2023', 1419.4, 603.9, 143.3, 57.6, 85.7, -36.4, 49.3, 13.5, 2.2, 33.6, 19.9, 1.97, 3.37, 1.0, 9.78),
      cta('FY2024', 1819.5, 768.4, 202.1, 66.3, 135.8, -32.7, 103.1, 29.3, 7.6, 66.2, 26.8, 1.83, 6.11, 1.5, 10.61),
      cta('FY2025', 2298.1, 948.6, 262.4, 78.8, 183.6, -31.3, 152.3, 36.5, 23.4, 92.4, 23.9, 1.66, 8.41, 2.0, 10.981),
      cta('FY2026', 2461.6, 968.6, 300.6, 88.4, 212.3, -21.8, 190.5, 53.2, 31.6, 105.8, 23.0, 1.38, 9.63, 2.5, 10.983),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2492.0, ebitda: 305.7, ebit: 216.3, beneficio_neto: 110.1, bpa: 10.03, dpa: 2.5, dpa_extraordinario: 0, fcf: 182.9, participadas_en_ebitda: 1.27, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 253,5 M EUR en FY2021 (abril 2020-marzo 2021, aviación parada) a 2.461,6 M en FY2026: el FY2022 y el FY2023 son de recuperación y no sirven como base [12]. Desde FY2023 el crecimiento es orgánico (no hay compras): +28,2 % en FY2024, +26,3 % en FY2025 y +7,1 % en FY2026, este último frenado por la lira: a tipos constantes fue +17,6 % [1]. El margen EBITDA subió de 10,1 % (FY2023) a 12,2 % (FY2026) y el EBIT de 6,0 % a 8,6 %: los aprovisionamientos bajaron del 41,3 % al 39,3 % de las ventas en FY2026 mientras el personal subía del 33,9 % al 34,9 % [1]. El resultado financiero mejora de −36,4 M a −21,8 M por la amortización de préstamos y el cobro de intereses de la caja, pero sigue cargado por la pérdida monetaria de NIIF (IAS) 29 en Turquía: sin IAS 29 habría sido de +7,4 M [1]. En el 1T FY2027 (abril-junio 2026) las ventas crecieron un 5,0 % (10,2 % a tipos constantes) y el beneficio atribuido un 16,3 %, con la guerra de Irán restando ventas con aerolíneas del Golfo [5, 6].',
    ajustes: 'Usamos las cifras publicadas. La única partida que distorsiona es la hiperinflación turca (IAS 29, desde el 1T FY2023): en FY2026 sumó 91,6 M de ventas, 12,9 M de EBITDA y 6,0 M de EBIT, pero restó 29,2 M del resultado financiero, de modo que el beneficio antes de impuestos fue 23,2 M menor que sin ella (190,5 M frente a 213,7 M) [1]. No la quitamos del BPA porque se repite cada año mientras Turquía sea hiperinflacionaria y no tiene salida de caja; es prudente: el BPA sin IAS 29 sería ≈ 1,1-1,4 EUR mayor (estimación propia, con el 50 % de la filial turca para minoritarios). En FY2026 se condonaron 3,45 M de préstamos COVID pasados a gastos de personal [1]. El BPA diluido de FY2022 publicado (1,29) supera al básico (1,13) por el convertible: usamos 1,13.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '2T25', ingresos: 579.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 65.2, margen_ebitda_pct: 11.2, bpa: 2.33, vs_consenso: null },
      { periodo: '3T25', ingresos: 643.0, crecimiento_pct: 34.5, crecimiento_organico_pct: null, ebitda: 76.7, margen_ebitda_pct: 11.9, bpa: 2.62, vs_consenso: null },
      { periodo: '4T25', ingresos: 524.0, crecimiento_pct: 13.6, crecimiento_organico_pct: null, ebitda: 65.4, margen_ebitda_pct: 12.5, bpa: 1.77, vs_consenso: null },
      { periodo: '1T26', ingresos: 611.7, crecimiento_pct: 10.9, crecimiento_organico_pct: 21.7, ebitda: 73.2, margen_ebitda_pct: 12.0, bpa: 2.44, vs_consenso: null },
      { periodo: '2T26', ingresos: 625.1, crecimiento_pct: 7.8, crecimiento_organico_pct: null, ebitda: 76.5, margen_ebitda_pct: 12.2, bpa: 2.43, vs_consenso: null },
      { periodo: '3T26', ingresos: 630.3, crecimiento_pct: -2.0, crecimiento_organico_pct: null, ebitda: 77.9, margen_ebitda_pct: 12.4, bpa: 2.83, vs_consenso: null },
      { periodo: '4T26', ingresos: 594.5, crecimiento_pct: 13.4, crecimiento_organico_pct: null, ebitda: 73.0, margen_ebitda_pct: 12.3, bpa: 1.93, vs_consenso: null },
      { periodo: '1T27', ingresos: 642.1, crecimiento_pct: 5.0, crecimiento_organico_pct: 10.2, ebitda: 78.3, margen_ebitda_pct: 12.2, bpa: 2.84, vs_consenso: null },
    ],
    ultima_presentacion: 'Trimestres del ejercicio fiscal (abril-marzo): 1T27 = abril-junio de 2026. El 4T se obtiene restando los nueve meses del año completo [1, 7, 10]. En la presentación anual (11-jun-2026) la dirección destacó el récord de EBITDA (300,6 M) y EBIT (212,3 M), la deuda neta casi nula (0,05 veces el EBITDA) y 15 clientes nuevos o renovados en catering aéreo, y avisó de que la guerra de Irán (desde el 28-feb-2026) cerraba espacios aéreos del Golfo y cancelaba los grandes premios de Bahréin y Arabia Saudí [1]. En el 1T27 (12-ago-2026) el mensaje cambió de «crecimiento muy fuerte» a «crecimiento cualitativo»: ventas +5,0 % (10,2 % a tipos constantes), margen EBIT del 8,8 %, beneficio +16,3 %, contratos nuevos con American Airlines (hasta 22 vuelos diarios) y Air India en Heathrow desde septiembre, Emirates en Boston y Air Canada en Los Ángeles desde octubre, y el Mundial de 2026 (20 partidos) como escaparate en EE. UU.; dijo que las ventas perdidas en Oriente Medio vuelven «en unas semanas» y que un programa de optimización dará frutos «en los próximos trimestres» [5, 6]. La empresa no publica una guía numérica de ventas o margen en esos documentos: solo que espera cumplir «sus objetivos» si el mercado se mantiene estable [6]. No hemos accedido a la transcripción de las conferencias (hueco).',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: 'FY2021', activo_total: 885.2, activo_corriente: 380.0, pasivo_corriente: 180.2, pasivo_total: 734.8, fondo_comercio: null, intangibles: 28.4, inmovilizado_material: 414.9, existencias: 22.4, clientes: 44.3, proveedores: 49.5, activos_contrato: null, pasivos_contrato: null, caja: 207.6, deuda_financiera: 382.1, arrendamientos: 185.3, patrimonio_neto: 117.5, minoritarios: 32.9, reservas: 113.0 },
      { periodo: 'FY2022', activo_total: 869.0, activo_corriente: 414.5, pasivo_corriente: 220.0, pasivo_total: 733.0, fondo_comercio: null, intangibles: 26.5, inmovilizado_material: 367.7, existencias: 26.5, clientes: 92.4, proveedores: 101.4, activos_contrato: null, pasivos_contrato: null, caja: 207.6, deuda_financiera: 365.5, arrendamientos: 154.9, patrimonio_neto: 114.1, minoritarios: 21.9, reservas: 124.0 },
      { periodo: 'FY2023', activo_total: 1000.4, activo_corriente: 514.5, pasivo_corriente: 298.7, pasivo_total: 802.2, fondo_comercio: null, intangibles: 24.7, inmovilizado_material: 393.0, existencias: 45.3, clientes: 157.3, proveedores: 132.2, activos_contrato: null, pasivos_contrato: null, caja: 235.2, deuda_financiera: 337.2, arrendamientos: 168.4, patrimonio_neto: 171.0, minoritarios: 27.2, reservas: 157.7 },
      { periodo: 'FY2024', activo_total: 1192.0, activo_corriente: 604.3, pasivo_corriente: 533.9, pasivo_total: 865.5, fondo_comercio: null, intangibles: 23.1, inmovilizado_material: 499.5, existencias: 47.9, clientes: 229.6, proveedores: 184.1, activos_contrato: null, pasivos_contrato: null, caja: 276.7, deuda_financiera: 258.3, arrendamientos: 234.8, patrimonio_neto: 296.7, minoritarios: 29.8, reservas: 204.4 },
      { periodo: 'FY2025', activo_total: 1217.6, activo_corriente: 575.1, pasivo_corriente: 479.1, pasivo_total: 759.6, fondo_comercio: null, intangibles: 23.6, inmovilizado_material: 551.1, existencias: 49.2, clientes: 272.1, proveedores: 210.7, activos_contrato: null, pasivos_contrato: null, caja: 174.2, deuda_financiera: 84.9, arrendamientos: 258.1, patrimonio_neto: 400.2, minoritarios: 57.8, reservas: 295.7 },
      { periodo: 'FY2026', activo_total: 1273.1, activo_corriente: 648.6, pasivo_corriente: 450.1, pasivo_total: 702.6, fondo_comercio: null, intangibles: 23.3, inmovilizado_material: 529.9, existencias: 54.4, clientes: 264.6, proveedores: 199.4, activos_contrato: null, pasivos_contrato: null, caja: 240.8, deuda_financiera: 14.7, arrendamientos: 241.0, patrimonio_neto: 480.7, minoritarios: 89.8, reservas: 379.1 },
    ],
    vencimientos: [{ anio: 'FY2027', importe: 13.9 }, { anio: 'FY2028+', importe: 0.8 }],
    liquidez: 'Caja de 269,1 M EUR a 30-jun-2026 frente a 248,1 M de pasivos financieros, de los que unos 235 M son arrendamientos y unos 13 M préstamos: caja neta de 21,0 M incluyendo arrendamientos [5].',
    rating: 'Sin rating',
    coste_deuda_pct: 4.5,
    vida_media_anios: null,
    otros_pasivos: 'Préstamos: los créditos de 300 M tomados en el 4T FY2020 para la pandemia se han devuelto casi enteros (171,8 M en FY2025 y 66,2 M en FY2026); quedan 14,7 M [1, 3]. El convertible de 100 M (2021-2026) se convirtió en acciones en FY2024 (81,1 M nominales, +2,02 M de capital): de ahí el paso de 9,744 a 10,983 M de acciones [3]. Arrendamientos (NIIF 16, sobre todo cocinas en aeropuertos y oficinas): 241,0 M a marzo de 2026 (204,8 M a largo y 36,2 M a corto) [1]. Provisiones por indemnizaciones y pensiones (Abfertigung, NIIF): 26,2 M [1]. Garantías (alquileres, aduanas, avales): 16,5 M de pasivos contingentes [1]. Hay contratos con clientes con cláusula de cambio de control que les permite resolverlos (no se nombran) [1]. Los minoritarios (89,8 M en libros) son el 50 % de Turkish Airlines en THY DO & CO, que se lleva el 23 % del beneficio después de impuestos del grupo [1].',
    comentario: 'La deuda neta financiera (préstamos y bono menos caja) pasó de 174,5 M en FY2021 a caja neta de 226,1 M en FY2026; incluyendo arrendamientos, la deuda neta publicada fue de 14,9 M (0,05 veces el EBITDA) y a junio de 2026 caja neta de 21,0 M [1, 5]. El circulante comercial (existencias + clientes − proveedores) es del 4,9 % de las ventas en FY2026 frente al 3,6 % en FY2024: los cobros de aerolíneas se alargan algo más que los pagos a proveedores. El capital circulante total publicado es casi nulo (7,0 M) porque otros pasivos corrientes (personal, impuestos) lo compensan [1]. El balance ya no limita el crecimiento: el patrimonio total (570,5 M) es el 45 % del activo.',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: 'FY2021', flujo_operativo: 27.5, capex: 36.0, pagos_arrendamientos: 11.1, adquisiciones: 0, desinversiones: 3.2, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 20.9 },
      { periodo: 'FY2022', flujo_operativo: 66.5, capex: 16.2, pagos_arrendamientos: 16.2, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 16.5 },
      { periodo: 'FY2023', flujo_operativo: 114.0, capex: 37.3, pagos_arrendamientos: 17.3, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 15.1 },
      { periodo: 'FY2024', flujo_operativo: 180.0, capex: 76.5, pagos_arrendamientos: 21.4, adquisiciones: 0, desinversiones: 0, dividendos: 10.3, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 13.1 },
      { periodo: 'FY2025', flujo_operativo: 173.9, capex: 68.4, pagos_arrendamientos: 28.7, adquisiciones: 0, desinversiones: 0, dividendos: 1.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 18.2 },
      { periodo: 'FY2026', flujo_operativo: 244.1, capex: 51.9, pagos_arrendamientos: 33.8, adquisiciones: 0, desinversiones: 0, dividendos: 22.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 18.4 },
    ],
    comentario: 'El flujo operativo de FY2026 (244,1 M) es 1,8 veces el beneficio después de impuestos (137,3 M): la amortización (88,4 M) y la pérdida monetaria de IAS 29, que no es caja, lo explican [1]. La inversión en inmovilizado bajó a 51,9 M (2,1 % de las ventas) tras dos años de 70-76 M por las cocinas de EE. UU. y Reino Unido; con las altas de derechos de uso (33,6 M) la inversión total fue de 82,6 M, el 3,4 % de las ventas, frente a una amortización del 3,6 % [1]. Los pagos de principal de arrendamientos de FY2025-FY2026 salen de la conciliación de pasivos financieros (devoluciones menos préstamos) [1]; los de FY2021-FY2024 son estimación propia con el mismo criterio [3, 4]. La empresa no separa mantenimiento y crecimiento; estimamos el mantenimiento en torno a la amortización del inmovilizado propio (≈ 2 % de las ventas). Para FY2027 hay que contar con la nueva cocina de Estambul (150.000 m², obra iniciada en enero de 2026) [1], cuyo importe no se publica (hueco). Los dividendos de FY2025 en el XBRL son solo 1,0 M a los accionistas de la matriz [12].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'KPMG Austria GmbH Wirtschaftsprüfungs- und Steuerberatungsgesellschaft',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: null,
    senales: [],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Airline Catering', descripcion: '33 cocinas en aeropuertos (Estambul, Londres, Nueva York, Viena, Fráncfort, Varsovia, Milán, Madrid…); más de 60 aerolíneas', tipo_resultado: 'EBIT', historico: [ { periodo: 'FY2025', ingresos: 1820.3, resultado: 137.2 }, { periodo: 'FY2026', ingresos: 1950.1, resultado: 159.6 } ] },
      { nombre: 'International Event Catering', descripcion: 'Paddock Club de la Fórmula 1, Allianz Arena, Olympiapark y SAP Garden de Múnich, torneos ATP, finales de la UEFA, Mundial de 2026', tipo_resultado: 'EBIT', historico: [ { periodo: 'FY2025', ingresos: 305.3, resultado: 31.4 }, { periodo: 'FY2026', ingresos: 323.4, resultado: 33.6 } ] },
      { nombre: 'Restaurants, Lounges & Hotels', descripcion: 'Salas VIP de aerolíneas, restauración en aeropuertos, Demel, Henry, hoteles de Viena y Múnich', tipo_resultado: 'EBIT', historico: [ { periodo: 'FY2025', ingresos: 172.5, resultado: 15.1 }, { periodo: 'FY2026', ingresos: 188.1, resultado: 19.1 } ] },
    ],
    geografias: [
      { nombre: 'Turquía', peso_pct: 31.0 }, { nombre: 'Reino Unido', peso_pct: 23.4 }, { nombre: 'EE. UU.', peso_pct: 21.3 },
      { nombre: 'Alemania', peso_pct: 8.3 }, { nombre: 'Austria', peso_pct: 7.4 }, { nombre: 'España', peso_pct: 4.9 }, { nombre: 'Otros', peso_pct: 3.7 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas a tipos constantes', valor_anterior: '+31,5 % (FY2025)', valor_actual: '+17,6 % (FY2026)', variacion: '−13,9 pp', comentario: 'El 1T27 creció un 10,2 % a tipos constantes [5]' },
      { kpi: 'Margen EBIT', valor_anterior: '8,0 % (FY2025)', valor_actual: '8,6 % (FY2026)', variacion: '+0,6 pp', comentario: '8,8 % en el 1T27 [5]' },
      { kpi: 'Clientes nuevos o renovados en catering aéreo', valor_anterior: 'n.d.', valor_actual: '15 en FY2026', variacion: 'n.d.', comentario: 'Aer Lingus, Air Canada, ANA, Cathay, EVA, Etihad… [1]' },
      { kpi: 'Empleados (equivalentes a tiempo completo, media)', valor_anterior: '15.255', valor_actual: '16.450', variacion: '+7,8 %', comentario: '16.470 en el 1T27 [1, 5]' },
      { kpi: 'Peso de los dos primeros clientes en ventas', valor_anterior: '38,5 % (FY2025)', valor_actual: '38,9 % (FY2026)', variacion: '+0,4 pp', comentario: '602,7 M y 354,2 M de ventas [1]' },
      { kpi: 'Deuda neta (con arrendamientos) / EBITDA', valor_anterior: '0,64', valor_actual: '0,05', variacion: '−0,59', comentario: '−0,07 (caja neta) en junio de 2026 [1, 5]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) Notas de resultados de la empresa (no publican consenso); 2) MarketScreener y prensa austriaca (Börse Express, Wiener Börse); 3) resúmenes de analistas (Goldesel): sin consenso previo trimestral fiable', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'transcripción de conferencias', tipo: 'Complemento', intentos: '1) Web de inversores de DO & CO (sin transcripciones); 2) Seeking Alpha (de pago); 3) prensa (solo citas sueltas)', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'inversión prevista en la cocina de Estambul', tipo: 'Complemento', intentos: '1) Informe anual FY2026 y 1T27 (sin importe); 2) búsqueda en inglés y turco (KAP); 3) prensa: sin cifra', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'From cabin to culinary: trends shaping global airline catering (mercado de 19.500 M EUR en 2025)', editor: 'Roland Berger', tipo: 'Sectorial', fecha: '2026-03-20', url: 'https://www.rolandberger.com/en/Insights/Publications/From-cabin-to-culinary-Trends-shaping-global-airline-catering.html' },
  { id: 2, titulo: 'Airline Catering Market Size, Share & Trends Analysis Report 2025-2034', editor: 'Market Intelo', tipo: 'Sectorial', fecha: '2025', url: 'https://marketintelo.com/report/airline-catering-market/amp' },
  { id: 3, titulo: 'Finanzbericht Geschäftsjahr 2025/2026 (segmentos, clientes, geografías, entorno)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-06-08', url: `${ESEF}/2026-03-31/ESEF/AT/0/docoag-2026-03-31-1-de/reports/docoag-2026-03-31-1-de.xhtml` },
  { id: 4, titulo: 'gategroup macht 2025 mehr Umsatz und prüft Börsengang (ventas 5.610 M EUR, EBITDA 467 M)', editor: 'cash.ch (AWP)', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.cash.ch/news/gategroup-macht-2025-mehr-umsatz-und-pruft-borsengang-922075' },
  { id: 5, titulo: 'THY inks 15-year catering deal with DO & CO', editor: 'Daily Sabah', tipo: 'Prensa', fecha: '2019-05-29', url: 'https://www.dailysabah.com/business/2019/05/29/thy-inks-15-year-catering-deal-with-do-co/amp' },
  { id: 6, titulo: 'Turkish Airlines parts ways with DO & CO catering (2017)', editor: 'Daily Sabah', tipo: 'Prensa', fecha: '2017-10-19', url: 'https://www.dailysabah.com/business/2017/10/19/turkish-airlines-parts-ways-with-do-co-catering/amp' },
  { id: 7, titulo: 'Corporate News: Results for the first quarter of the business year 2026/2027', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-08-12', url: 'https://www.doco.com/Portals/8/dokumente/en/News/Corporate-News-Q1-26-27-EN.pdf' },
  { id: 8, titulo: 'gategroup to acquire LSG’s European operations', editor: 'gategroup', tipo: 'Primaria', fecha: '2019-12', url: 'https://gategroup.com/media-center/press-release/gategroup-to-acquire-lsgs-european-operations/' },
  { id: 9, titulo: 'Compass Group (CPG.L), Sodexo (SW.PA), Aramark (ARMK), Elior (ELIOR.PA), SSP (SSPG.L), Avolta (AVOL.SW), Çelebi (CLEBI.IS): datos financieros (ventas y EBITDA de 12 meses)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/CPG.L/' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Attila Doğudan abrió en 1981 un puesto de comida en la Kärntner Strasse de Viena y en pocos años pasó al catering de eventos (Fórmula 1 desde 1992) y al de aerolíneas (Lauda Air, Austrian) [3]. Salió a la Bolsa de Viena en 1998 y a la de Estambul en 2010; la alianza con Turkish Airlines (THY DO & CO, al 50 %) desde 2007 le dio escala en su mayor centro de producción [3, 5]. Tras perder la licitación de British Airways en Londres y el contrato de Turkish en 2017 —que recuperó en 2018-2019 con un acuerdo de 15 años [5, 6]—, la pandemia hundió las ventas a 253 M EUR en FY2021. Desde entonces se ha triplicado por encima de 2019: contratos de Delta en EE. UU., British Airways en Heathrow e Iberia en Madrid, la Eurocopa de 2024 y el Mundial de 2026 [3, 7].',
    hitos: [
      { anio: '1981', hito: 'Primer local en Viena (Kärntner Strasse)' },
      { anio: '1992', hito: 'Catering del Paddock Club de la Fórmula 1 (relación de más de 34 años)' },
      { anio: '1998', hito: 'Salida a la Bolsa de Viena' },
      { anio: '2007', hito: 'Empresa conjunta THY DO & CO con Turkish Airlines (50 %)' },
      { anio: '2010', hito: 'Segunda cotización en la Bolsa de Estambul' },
      { anio: '2017', hito: 'Turkish anuncia que deja a DO & CO y negocia con SATS; vuelve atrás y firma en 2019 un acuerdo de 15 años' },
      { anio: '2020-21', hito: 'Pandemia: ventas de 253 M EUR en FY2021, préstamos de 300 M y convertible de 100 M' },
      { anio: '2023-24', hito: 'Conversión del bono (de 9,74 a 10,98 M de acciones) y entrada de Delta y British Airways a gran escala' },
      { anio: '2026', hito: 'Mundial de fútbol (20 partidos, 70.000 invitados VIP) y obra de la cocina de 150.000 m² en Estambul' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'DO & CO es un caterer de gama alta con tres divisiones: catering aéreo (79,2 % de las ventas de FY2026), catering de eventos internacionales (13,1 %) y restaurantes, salas VIP y hoteles (7,6 %) [3]. Produce en 33 cocinas de aeropuerto para más de 60 aerolíneas (Turkish, British Airways, Delta, Iberia, Emirates, Qatar, Singapore, Cathay, Austrian, LOT, JetBlue…), lleva el Paddock Club de la Fórmula 1 y los estadios del Bayern de Múnich, y tiene marcas propias de consumo (Demel, Henry, Hédiard) [3]. Por origen de las ventas, Turquía pesa el 31,0 %, Reino Unido el 23,4 % y EE. UU. el 21,3 % [3].',
    como_gana_dinero: 'Cobra por comida servida a bordo, por manipulación y logística en el avión y por la infraestructura de la cocina. Los contratos con aerolíneas son a varios años y una parte es de «coste más margen» (cost-plus): la empresa traslada la inflación de alimentos y salarios y protege el margen, a cambio de no capturar todo el alza [3]. El margen depende sobre todo del uso de las cocinas (volumen por planta) y del peso de las clases premium. Los costes son variables en su mayor parte (aprovisionamientos 39,3 % y personal 34,9 % de las ventas), de modo que una caída de vuelos —como la de los vuelos del Golfo en marzo de 2026— apenas tocó el margen [3]. El margen EBIT es mayor en eventos (10,4 %) y restauración (10,1 %) que en aerolíneas (8,2 %) [3]. Estacionalidad: el 1S fiscal (abril-septiembre) es el más fuerte por el verano y la Fórmula 1.',
    clientes: 'Concentración alta: dos clientes superan cada uno el 10 % de las ventas, con 602,7 M EUR (24,5 %) y 354,2 M (14,4 %) en FY2026 [3]; por su peso en Turquía (713 M de catering aéreo) y Reino Unido (413 M), son Turkish Airlines y casi con seguridad British Airways (estimación propia: la empresa no los nombra). Turkish es además socio al 50 % de THY DO & CO, la filial que facturó 762 M y ganó 64,0 M después de impuestos (47 % del beneficio del grupo) [3]. El contrato de Turkish se renovó en 2019 por 15 años [5], tras un intento de cambio de proveedor en 2017 [6]. Poder de precios: en FY2026 el margen EBIT subió 0,6 puntos con los aprovisionamientos bajando 2 puntos sobre ventas pese a la inflación turca, y los contratos cost-plus trasladan costes [3]. Hay contratos con cláusula de cambio de control que permiten al cliente rescindir [3].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Mercado relevante: catering aéreo mundial (comida a bordo y venta a bordo, sin restauración en aeropuertos ni catering de eventos), que es el 79 % de las ventas de DO & CO. Usamos la cifra de Roland Berger (19.500 M EUR en 2025), que incluye la venta a bordo (16 %); Market Intelo da 18.600 M USD (≈ 16.600 M EUR) con un perímetro parecido [1, 2]. El catering de eventos de lujo y las salas VIP no tienen un tamaño de mercado fiable publicado.',
    tamano: '≈ 19.500 M EUR en 2025, 25.700 M EUR en 2030 [1]',
    unidad_serie: 'millones de EUR',
    serie: [ { anio: '2025', tamano: 19500 }, { anio: '2030e', tamano: 25700 } ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 5.6,
    cr5_pct: 65,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Pasajeros aéreos', efecto: '+', horizonte: 'Estructural', evidencia: 'IATA espera un récord de pasajeros y 41.000 M USD de beneficio para las aerolíneas en 2026 [3]' },
      { driver: 'Premiumización de las cabinas', efecto: '+', horizonte: 'Estructural', evidencia: 'Las clases premium crecen más que la turista y suben el gasto por pasajero [1]' },
      { driver: 'Venta a bordo', efecto: '+', horizonte: 'Estructural', evidencia: '+7,9 % anual hasta 2030 frente a +5,2 % de la comida a bordo [1]' },
      { driver: 'Externalización de las cocinas de las aerolíneas', efecto: '+', horizonte: 'Estructural', evidencia: 'Lufthansa vendió LSG; gategroup compró su negocio europeo (1.100 M EUR de ventas) [8]' },
      { driver: 'Combustible y crisis geopolíticas', efecto: '−', horizonte: 'Cíclico', evidencia: 'La guerra de Irán cerró el Golfo en marzo de 2026: ≈ 40 M de ventas perdidas para DO & CO según analistas; la empresa habla de efecto limitado en el margen [3, 7]' },
      { driver: 'Coste laboral', efecto: '−', horizonte: 'Estructural', evidencia: 'El personal pasó del 33,9 % al 34,9 % de las ventas de DO & CO en FY2026 [3]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Licitaciones por aeropuerto cada 3-7 años; gategroup (25-30 % del mercado) y LSG (10-15 %) compiten en precio en la turista [1]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pocas aerolíneas grandes por centro; en DO & CO dos clientes son el 39 % de las ventas [3]' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Alimentos y bebidas fragmentados; contratos cost-plus trasladan la inflación [3]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta una cocina de miles de m² en el aeropuerto, licencias y seguridad alimentaria certificada' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Las aerolíneas pueden reducir el servicio en corto radio (venta a bordo), pero no en largo radio premium' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Las aerolíneas tienen márgenes récord (IATA: 41.000 M USD en 2026) y siguen ampliando rutas y clases premium [3]. El catering aéreo cayó con los vuelos en 2008-09 (moderado) y en 2020 se hundió: DO & CO perdió el 73 % de las ventas en FY2021 [12 de A: cuentas]. En 2022-23 se recuperó con el tráfico y la inflación (contratos cost-plus). El riesgo inmediato es el combustible: con la guerra de Irán, las aerolíneas «reaccionan de forma distinta» a los precios del queroseno y algunas recortan servicio [3].' },
    regulacion: 'Seguridad alimentaria (normas de la UE, FDA en EE. UU.) y seguridad aeroportuaria; prohibiciones de plásticos de un solo uso y residuos de cabina en la UE; normas de información de sostenibilidad (CSRD) que DO & CO ya aplica [3]. Aduanas y licencias de cada aeropuerto. En Turquía, la contabilidad de hiperinflación (IAS 29) seguirá mientras la inflación acumulada a tres años supere el 100 % [3].',
    tendencias: 'Premiumización (más gasto por pasajero en clases altas), digitalización de pedidos a bordo, automatización de cocinas y consolidación (gategroup con LSG Europa, Aurelius vendiendo partes de LSG) [1, 8]. DO & CO gana con la premiumización: se posiciona como «el mejor restaurante a 39.000 pies» y Turkish ha ganado premios de comida a bordo con ella [3]. Pierde si las aerolíneas recortan servicio por el combustible.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 10.0,
    posicion: '3.º-4.º del mundo en catering aéreo (≈ 10 %: 1.950 M EUR de 19.500 M), detrás de gategroup (25-30 %) y LSG (10-15 %), a la par de dnata; líder en catering premium y en el Paddock Club de la F1 [1, 3]',
    competidores: [
      { nombre: 'gategroup', pais: 'Suiza', ticker: null, ingresos: 5610, cuota_pct: 27.5, margen_ebit_pct: null, comentario: 'Líder mundial (Gate Gourmet); EBITDA 467 M en 2025 (8,3 %), deuda neta 3,25 veces el EBITDA; estudia salir a bolsa [4]' },
      { nombre: 'LSG Group (Aurelius)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: 12.5, margen_ebit_pct: null, comentario: 'Antiguo LSG Sky Chefs de Lufthansa; vendido por partes [1, 8]' },
      { nombre: 'Compass Group', pais: 'Reino Unido', ticker: 'CPG.L', ingresos: 43308, cuota_pct: null, margen_ebit_pct: null, comentario: 'Restauración colectiva; compite en eventos y estadios. Ventas de 12 meses 48.485 M USD [9]' },
      { nombre: 'Sodexo', pais: 'Francia', ticker: 'SW.PA', ingresos: 23616, cuota_pct: null, margen_ebit_pct: null, comentario: 'Restauración colectiva y hospitalidad deportiva (Sodexo Live) [9]' },
      { nombre: 'SSP Group', pais: 'Reino Unido', ticker: 'SSPG.L', ingresos: 4433, cuota_pct: null, margen_ebit_pct: null, comentario: 'Restauración en aeropuertos y estaciones (competidor de la división de restaurantes) [9]' },
      { nombre: 'Çelebi Aviation', pais: 'Turquía', ticker: 'CLEBI.IS', ingresos: 379, cuota_pct: null, margen_ebit_pct: null, comentario: 'Asistencia en tierra; el único comparable turco del ecosistema aeroportuario [9]' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Llevar a una aerolínea en un centro facilita ganarla en otros (Emirates en tres sedes renovadas por cinco años) [3]' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Cambiar de caterer en un centro grande exige otra cocina y certificaciones; Turkish intentó irse en 2017 y volvió [5, 6]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca de gama alta: margen EBIT de 8,6 % frente al 8,3 % de EBITDA de gategroup [3, 4]; premios Skytrax de comida a bordo para sus clientes' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'No es el más barato; compite por calidad. Contratos cost-plus [3]' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'En cada aeropuerto caben una o dos cocinas rentables; Estambul (centro de Turkish) es suyo hasta ≈ 2034 [5]' },
      ],
    },
    amenazas: 'La principal es un cliente: Turkish Airlines genera ≈ 24,5 % de las ventas y es dueña del 50 % de la filial que da casi la mitad del beneficio; en 2017 anunció que se iba [3, 6]. Le sigue la presión de precios en licitaciones con gategroup y LSG en EE. UU. y Europa, y el recorte de servicio a bordo si el combustible sigue caro. Probabilidad de pérdida de un gran cliente en 3 años: baja (el contrato turco llega a ≈ 2034 [5]), pero de alto impacto.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) Roland Berger (solo 2025 y 2030); 2) Market Intelo e IMARC (perímetros distintos); 3) IATA (gasto de cabina no publicado)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen EBIT de los competidores directos', tipo: 'Complemento', intentos: '1) gategroup (no cotiza; solo EBITDA en prensa); 2) LSG/Aurelius (no publica); 3) dnata (cuentas del grupo Emirates sin desglose)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Finanzbericht Geschäftsjahr 2025/2026: órganos, retribución, accionistas, partes vinculadas, informe del consejo de vigilancia', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-06-08', url: `${ESEF}/2026-03-31/ESEF/AT/0/docoag-2026-03-31-1-de/reports/docoag-2026-03-31-1-de.xhtml` },
  { id: 2, titulo: 'Vergütungsbericht Geschäftsjahr 2025/2026', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-06', url: 'https://www.doco.com/Portals/8/dokumente/de/Hauptversammlung/2026/DOCOVerguetungsberichtGJ2526.pdf' },
  { id: 3, titulo: 'Abstimmungsergebnisse 28. ordentliche Hauptversammlung (23-jul-2026)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://www.doco.com/wp-content/uploads/2026/07/Abstimmergebnisse-DoCo_Aktiengesellschaft-23_07_2026.pdf' },
  { id: 4, titulo: 'Abstimmungsergebnisse 27. ordentliche Hauptversammlung (10-jul-2025)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2025-07-10', url: 'https://www.doco.com/wp-content/uploads/2025/07/Abstimmergebnisse-DO__CO_Aktiengesellschaft-10_07_2025.pdf' },
  { id: 5, titulo: 'DO & CO Aktiengesellschaft: Aufsichtsrat verlängert Vorstandsbestellungen', editor: 'pressetext (comunicado de la empresa)', tipo: 'Primaria', fecha: '2026-08-03', url: 'https://www.pressetext.com/news/aufsichtsrat-verlaengert-vorstandsbestellungen.html' },
  { id: 6, titulo: 'Directors’ Dealings: compra de 400 acciones por Bettina Höfinger (abril de 2025)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2025-04-10', url: 'https://www.doco.com/wp-content/uploads/2025/04/Directors-Dealing-Meldung_10042025_GER.pdf' },
  { id: 7, titulo: 'Directors’ Dealings: venta de 786 acciones por Cem Kozlu (febrero de 2025)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2025-02-25', url: 'https://doco.com/wp-content/uploads/2025/02/DD_Cem-Kozlu_25022025_ENG.pdf' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Attila Doğudan', cargo: 'Fundador y presidente del consejo de administración (Vorstand, CEO)', desde: '1997', participacion_pct: 30.03, trayectoria: 'Fundó la empresa en 1981 y la dirige desde entonces; su fundación privada tiene el 30,03 %. Llevó las ventas de 253 M EUR (FY2021) a 2.462 M (FY2026) y el margen EBIT del 6,0 % (FY2023) al 8,6 % [1]. Mandato renovado hasta el 31-jul-2029 [5].' },
      { nombre: 'Johannes Echeverria', cargo: 'Director financiero (CFO)', desde: '2023', participacion_pct: null, trayectoria: 'En el consejo desde septiembre de 2023; bajo su mandato se devolvieron 238 M de préstamos y la deuda neta con arrendamientos pasó de 216 M a caja neta [1]. Renovado hasta agosto de 2029 [5].' },
      { nombre: 'Bettina Höfinger', cargo: 'Directora jurídica (CLO)', desde: '2023', participacion_pct: null, trayectoria: 'En el consejo desde septiembre de 2023; compró 400 acciones a 137,20 EUR en abril de 2025 [6]. Renovada hasta agosto de 2029 [5].' },
      { nombre: 'Attila Mark Doğudan', cargo: 'Director comercial (CCO)', desde: '2021', participacion_pct: null, trayectoria: 'Hijo del fundador, en el consejo desde junio de 2021; responsable de la captación de aerolíneas (15 clientes nuevos o renovados en FY2026) [1]. Renovado hasta junio de 2030 [5].' },
      { nombre: 'Andreas Bierwirth', cargo: 'Presidente del consejo de vigilancia (Aufsichtsrat)', desde: '2016', participacion_pct: null, trayectoria: 'Independiente, representa al capital flotante; antiguo directivo de aerolíneas, consejero de Finnair. Reelegido en julio de 2026 con un 31,9 % de votos en contra [1, 3].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Seguir creciendo con foco en margen; sin cifra en el informe anual', real: 'Ventas +7,1 % (+17,6 % a tipos constantes), margen EBIT 8,6 %', cumplida: 'Sí' },
      { anio: 'FY2026 (retribución)', guia: 'Objetivos del variable: margen EBIT > 8,0 % y deuda neta/EBITDA < 0,5', real: '8,6 % y 0,05', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Cumplir «los objetivos» si el mercado se mantiene estable (1T27)', real: '1T27: ventas +5,0 %, margen EBIT 8,8 %', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Andreas Bierwirth', cargo: 'Presidente del consejo de vigilancia', tipo: 'Independiente', desde: '2016', comisiones: 'Presidente; comisiones n.d.' },
      { nombre: 'Peter Hoffmann-Ostenhof', cargo: 'Vicepresidente primero', tipo: 'Independiente', desde: '2017', comisiones: 'n.d.' },
      { nombre: 'Cem Kozlu', cargo: 'Vicepresidente segundo', tipo: 'Independiente', desde: '2016', comisiones: 'n.d.; consejero de Pegasus Airlines' },
      { nombre: 'Daniela Neuberger', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'n.d.' },
      { nombre: 'Attila Doğudan', cargo: 'Presidente del consejo de dirección (CEO)', tipo: 'Ejecutivo', desde: '1997', comisiones: '—' },
      { nombre: 'Johannes Echeverria', cargo: 'CFO', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Bettina Höfinger', cargo: 'CLO', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Attila Mark Doğudan', cargo: 'CCO', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.5, voto_remuneracion_contra_pct: 6.5, voto_remuneracion_contra_libre_pct: 11.0, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 1.64, fijo: 0.80, variable_corto: 0.63, variable_largo: 0, ratio_salario_medio: 31 },
    remuneracion: 'Sistema dual austriaco: el consejo de vigilancia fija el sueldo del consejo de dirección. El variable anual (STI) es el 80 % del fijo y en FY2026 dependió del margen EBIT (> 8,0 %, 40 %), de la deuda neta/EBITDA (< 0,5, 40 %) y de dos objetivos ESG (20 %); se cumplieron todos [2]. El variable a largo (LTI) es el 20 % del fijo y exige un ROCE superior al 25 % en FY2027-FY2029 [2]. Cada variable tiene un tope del 100 % del fijo y hay cláusula de recuperación (clawback, regla C-27 del código austriaco) [2]. El CEO cobró 1,64 M EUR en FY2026 (0,80 M fijo, 0,15 M en especie, 0,63 M variable de FY2025), unas 31 veces el coste medio por empleado (52.300 EUR) [1, 2]. No hay pagos en acciones ni pensiones; la indemnización es de tres meses de sueldo [1]. El informe de remuneraciones obtuvo un 93,5 % a favor en 2026 (6,5 % en contra; ≈ 11 % sobre el capital libre presente) frente al 98,5 % de 2025 [3, 4]. Los objetivos son exigentes en margen y deuda, pero no en crecimiento.',
    accionistas: [
      { nombre: 'Attila Dogudan Privatstiftung (fundación del fundador y CEO)', pct: 30.03, tipo: 'Control (fundador)', variacion: 'Sin cambios en 12 meses' },
      { nombre: 'Capital flotante', pct: 69.97, tipo: 'Flotante (Viena y Estambul)', variacion: 'n.d.' },
    ],
    insiders: [],
    control_y_defensas: 'La fundación del fundador tiene el 30,03 % y, con una asistencia del 73 % a la junta, controla de hecho el 41 % de los votos: decide en la práctica las juntas [1, 3]. Una acción, un voto, sin clases [1]. Los estatutos permiten cambiarlos por mayoría simple (no el 75 % legal) salvo en ampliaciones o reducciones de capital, lo que da más poder al accionista de control [1]. Hay autorización para ampliar capital hasta un 10 % sin derecho de suscripción y para recomprar hasta un 10 % [1]. Algunos clientes pueden rescindir contratos si cambia el control, lo que dificulta una opa hostil [1]. Partes vinculadas: 5,9 M EUR de alquileres a sociedades vinculadas a consejeros en FY2026 [1]. La reelección del presidente del consejo de vigilancia recibió un 31,9 % de votos en contra (≈ 54 % del capital libre presente) [3].',
    alertas: [
      'Reelección del presidente del consejo de vigilancia (A. Bierwirth) con un 31,9 % en contra y, descontando la fundación del fundador, ≈ 54 % del capital libre presente en contra [3].',
      'Sucesión: el fundador (67 años) sigue de CEO hasta 2029 y su hijo es director comercial; no hay plan de sucesión público [1, 5].',
      'Alquileres a sociedades vinculadas a consejeros: 5,9 M EUR en FY2026 [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'insiders (operaciones de los últimos 12 meses)', tipo: 'Complemento', intentos: '1) Web de inversores de DO & CO (últimas notificaciones de 2025); 2) búsqueda de «Directors Dealings 2026» (sin resultados); 3) registro de la FMA austriaca (sin consulta pública por emisor)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'comisiones del consejo de vigilancia', tipo: 'Complemento', intentos: '1) Informe anual (remite al informe de gobierno corporativo); 2) informe del consejo de vigilancia (solo reuniones); 3) web de inversores (sin documento descargable)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'DOC.VI, ^ATX y EXV9.DE: históricos diarios (precio, rango, volumen, beta, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/DOC.VI/history/' },
  { id: 2, titulo: 'DO & CO AG: estimaciones anuales y consenso (8 analistas, objetivo medio 258,06 EUR)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/DO-CO-AG-6491277/finances/' },
  { id: 3, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS, 14-oct-2026: 3,48 %)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5&lang=en' },
  { id: 4, titulo: 'Tipos de cambio de referencia del BCE (14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Comparables (Compass, Sodexo, Aramark, Elior, SSP, Avolta, Çelebi): capitalización, valor empresa, EBITDA, PER adelantado y estimaciones de ventas', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/SW.PA/key-statistics/' },
  { id: 6, titulo: 'SATS: Investor presentation on proposed WFS acquisition (VE 2.250 M EUR, 9,7 veces el EBITDA)', editor: 'SATS Ltd (SGX)', tipo: 'Primaria', fecha: '2022-09-28', url: 'https://links.sgx.com/1.0.0/corporate-announcements/1PG04C1TY0YF5CYO/732672_SATS_Investor_Presentation_on_Proposed_WFS_Acquisition_20220928.pdf' },
  { id: 7, titulo: 'Compass Group to acquire Dutch hospitality and catering operator (Vermaat) for €1.5bn', editor: 'World Coffee Portal', tipo: 'Prensa', fecha: '2025-07-25', url: 'https://worldcoffeeportal.com/news/compass-group-to-acquire-dutch-hospitality-and-catering-operator-for-eu1-5bn' },
  { id: 8, titulo: 'PAI Partners swoops to acquire travel dining specialist Areas from Elior Group', editor: 'The Moodie Davitt Report', tipo: 'Prensa', fecha: '2019-04', url: 'https://moodiedavittreport.com/pai-partners-swoops-to-acquire-travel-dining-specialist-areas-from-elior-group/' },
  { id: 9, titulo: 'China’s HNA Group to buy gategroup for $1.4bn (53 CHF por acción, prima del 20,9 %)', editor: 'TRBusiness', tipo: 'Prensa', fecha: '2016-04-11', url: 'https://www.trbusiness.com/regional-news/international/hna-agrees-to-buy-gategroup-for-1-4bn-in-cash/103948' },
  { id: 10, titulo: 'Financial Report 1st Quarter 2026/2027 (balance a 30-jun-2026, objetivo medio de los analistas 258,07 EUR)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-08-12', url: `${IR}/q1_2627.pdf` },
  { id: 11, titulo: 'Finanzbericht Geschäftsjahr 2025/2026 (acciones, cotización, calendario financiero)', editor: 'DO & CO Aktiengesellschaft', tipo: 'Primaria', fecha: '2026-06-08', url: `${ESEF}/2026-03-31/ESEF/AT/0/docoag-2026-03-31-1-de/reports/docoag-2026-03-31-1-de.xhtml` },
  { id: 12, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 13, titulo: 'DO & CO: Analysten bestätigen BUY trotz Hormuz-Risiko – Kursziel 250 Euro (recorte desde 266)', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-05', url: 'https://goldesel.de/aktien/news/do-co-analysten-bestatigen-buy-trotz-hormuz-risiko-kursziel-250-euro-und-fokus-auf-istanbul-rerouting' },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'DO & CO Aktiengesellschaft', nombre_corto: 'DO & CO', ticker: 'DOC', isin: 'AT0000818802', mercado: 'Wiener Börse (prime market); también Borsa İstanbul (DOCO)', indice_referencia: 'ATX',
    pais: 'Austria', pais_iso: 'AT', sector: 'Industrials', industria: 'Commercial Services & Supplies (catering)', sede: 'Viena', fundacion: '1981', empleados: 16470, web: 'www.doco.com',
    precio: 195.0, fecha_precio: '2026-10-13', acciones: 10.983, capitalizacion_publicada: 2139.6, free_float_pct: 69.97,
    max_52s: 230.0, min_52s: 160.0, volumen_medio_diario: '≈ 2,5 M EUR/día en Viena (3 meses)', proximos_resultados: '2026-11-12',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 2655, ebitda: 327.3, ebit: 233.4, bpa: 11.24, dpa: 2.77, fuente: 'MarketScreener, 8 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 2863, ebitda: 359.3, ebit: 260.5, bpa: 12.86, dpa: 3.23, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 3054, ebitda: 387.4, ebit: 282.2, bpa: 14.54, dpa: 3.72, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: null, mantener: null, vender: null, po_medio: 258.06, po_min: null, po_max: null },
    revisiones: 'El objetivo medio que publica la empresa pasó de 241,56 EUR (dic-2025) a 255,52 (mar-2026) y 258,07 (jun-2026) [10, 11]; MarketScreener da 258,06 con consenso «Comprar» de 8 analistas [2]. En mayo de 2026 al menos un analista recortó de 266 a 250 EUR por el riesgo del estrecho de Ormuz [13]. Las estimaciones de BPA de FY2027 (11,24 EUR) suponen +16,7 % sobre FY2026; Yahoo da 11,38 [5]. Solo hay una fuente con estimaciones completas; el objetivo y las recomendaciones se contrastan con la empresa.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -5.8, indice_pct: 24.3, sector_pct: -2.9 },
      { periodo: '1 año', accion_pct: -11.0, indice_pct: 41.6, sector_pct: 2.8 },
      { periodo: '3 años (anual.)', accion_pct: 21.7, indice_pct: 28.1, sector_pct: 7.5 },
      { periodo: '5 años (anual.)', accion_pct: 19.1, indice_pct: 11.9, sector_pct: -0.2 },
      { periodo: '10 años (anual.)', accion_pct: 10.6, indice_pct: 10.6, sector_pct: 1.6 },
    ],
    anual: [
      { anio: '2019', accion_pct: 6.3, indice_pct: 16.1 }, { anio: '2020', accion_pct: -22.2, indice_pct: -12.8 }, { anio: '2021', accion_pct: 10.9, indice_pct: 38.9 },
      { anio: '2022', accion_pct: 19.6, indice_pct: -19.0 }, { anio: '2023', accion_pct: 51.7, indice_pct: 9.9 }, { anio: '2024', accion_pct: 33.9, indice_pct: 6.6 }, { anio: '2025', accion_pct: 15.0, indice_pct: 45.4 },
    ],
    beta: 0.93, volatilidad_pct: 41.0, max_drawdown_pct: -43.7, posicion_corta_pct: null,
    comentario: 'La acción sube un 19,1 % anual en cinco años frente al 11,9 % del ATX, pero en el último año cae un 11,0 % mientras el ATX (bancos y energía) sube un 41,6 % [1]. La caída de 2025-26 tiene tres causas con fecha: la devaluación de la lira (−19,9 % frente al euro en FY2026, que dejó el crecimiento en euros en el 7,1 %) [11], la guerra de Irán (−13,6 % el 2-mar-2026, la mayor caída diaria del año) [1] y la desaceleración de las ventas en euros desde el 3T26 (−2,0 %). Máximo histórico de 235 EUR en 2025 y mínimo de 52 semanas de 160 EUR el 23-mar-2026 [1, 11]. Índice sectorial: ETF de viajes y ocio europeo (EXV9). Cotiza además en Estambul (DOCO), donde se negocia algo menos que en Viena [11].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2021', precio_cierre: 68.8, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2022', precio_cierre: 76.4, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2023', precio_cierre: 107.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: 138.4, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 163.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 162.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'Compass Group', ticker: 'CPG.L', pais: 'GB', capitalizacion: 48948, ev_ventas: 1.28, ev_ebitda_ltm: 16.3, ev_ebitda_ntm: null, per_ntm: 19.7, crecimiento_pct: 8.5, margen_ebitda_pct: 7.9, roic_pct: null, dn_ebitda: 2.3, fcf_yield_pct: 3.6 },
      { nombre: 'Sodexo', ticker: 'SW.PA', pais: 'FR', capitalizacion: 8149, ev_ventas: 0.52, ev_ebitda_ltm: 10.8, ev_ebitda_ntm: null, per_ntm: 16.7, crecimiento_pct: 1.2, margen_ebitda_pct: 4.8, roic_pct: null, dn_ebitda: 3.7, fcf_yield_pct: 7.3 },
      { nombre: 'Aramark', ticker: 'ARMK', pais: 'US', capitalizacion: 12893, ev_ventas: 1.03, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: null, per_ntm: 19.5, crecimiento_pct: 8.8, margen_ebitda_pct: 7.3, roic_pct: null, dn_ebitda: 4.1, fcf_yield_pct: 2.6 },
      { nombre: 'Elior Group', ticker: 'ELIOR.PA', pais: 'FR', capitalizacion: 452, ev_ventas: 0.27, ev_ebitda_ltm: 8.1, ev_ebitda_ntm: null, per_ntm: 5.7, crecimiento_pct: 1.8, margen_ebitda_pct: 3.3, roic_pct: null, dn_ebitda: 5.8, fcf_yield_pct: 0.2 },
      { nombre: 'SSP Group', ticker: 'SSPG.L', pais: 'GB', capitalizacion: 1579, ev_ventas: 0.99, ev_ebitda_ltm: 9.0, ev_ebitda_ntm: null, per_ntm: 11.3, crecimiento_pct: 4.6, margen_ebitda_pct: 11.0, roic_pct: null, dn_ebitda: 5.1, fcf_yield_pct: null },
      { nombre: 'Avolta', ticker: 'AVOL.SW', pais: 'CH', capitalizacion: 6607, ev_ventas: 1.28, ev_ebitda_ltm: 11.1, ev_ebitda_ntm: null, per_ntm: 10.7, crecimiento_pct: 2.7, margen_ebitda_pct: 11.6, roic_pct: null, dn_ebitda: 7.2, fcf_yield_pct: null },
      { nombre: 'Çelebi Aviation', ticker: 'CLEBI.IS', pais: 'TR', capitalizacion: 578, ev_ventas: 1.89, ev_ebitda_ltm: 7.2, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 26.2, roic_pct: null, dn_ebitda: 1.2, fcf_yield_pct: null },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-07', objetivo: 'Vermaat Groep (catering y restauración, Países Bajos)', comprador: 'Compass Group', ev: 1500, ev_ventas: 2.14, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'VE ≈ 1.500 M EUR con ventas previstas de ≈ 700 M en 2025 y margen operativo de dos dígitos [7]' },
      { fecha: '2022-09', objetivo: 'Worldwide Flight Services (asistencia de carga aérea)', comprador: 'SATS', ev: 2250, ev_ventas: null, ev_ebitda: 9.7, prima_pct: null, excluir: false, comentario: '9,7 veces el EBITDA de 232 M antes de sinergias [6]' },
      { fecha: '2019-04', objetivo: 'Areas (restauración en aeropuertos y autopistas)', comprador: 'PAI Partners', ev: 1542, ev_ventas: 0.84, ev_ebitda: 7.5, prima_pct: null, excluir: false, comentario: 'Ventas de 1.832 M en 2017/18; EBITDA de ≈ 200 M antes de NIIF 16 según Reuters [8]' },
      { fecha: '2016-04', objetivo: 'gategroup (catering aéreo, cotizada)', comprador: 'HNA Group', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 20.9, excluir: true, comentario: 'Opa a 53 CHF por acción (≈ 1.400 M CHF de capital), prima del 20,9 % sobre el cierre anterior; fuera del periodo de 5-7 años [9]' },
      { fecha: '2019-12', objetivo: 'LSG Sky Chefs Europa (≈ 1.100 M EUR de ventas)', comprador: 'gategroup', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Precio no publicado [B8]' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'recomendaciones por tipo y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media y «Comprar»); 2) informe de la empresa (solo media); 3) prensa austriaca (tres casas: Berenberg 250, Erste 255, NuWays 266)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) FMA austriaca (publica posiciones ≥ 0,5 %, sin ninguna localizada); 2) Yahoo (sin dato para Viena); 3) prensa: sin dato', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm y roic_pct', tipo: 'Complemento', intentos: '1) Yahoo (sin EBITDA estimado); 2) MarketScreener (páginas de comparables de pago); 3) informes anuales (sin estimaciones)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'DO&CO – Eine Perle am Österreichischen Aktienmarkt (hilo, 49 mensajes)', editor: 'wallstreet-online.de', tipo: 'Foros y redes', fecha: '2026-06-11', url: 'https://www.wallstreet-online.de/diskussion/1378270-1/do-co-perle-oesterreichischen-aktienmarkt' },
  { id: 2, titulo: 'DO & CO-Aktie: Die Stunde der Bären? (artículo con comentarios de inversores)', editor: 'Börse Express', tipo: 'Foros y redes', fecha: '2025-10', url: 'https://www.boerse-express.com/news/articles/do-co-aktie-die-stunde-der-baeren-834183' },
  { id: 3, titulo: 'DO & CO: Analysten bestätigen BUY trotz Hormuz-Risiko', editor: 'Goldesel', tipo: 'Foros y redes', fecha: '2026-05', url: 'https://goldesel.de/aktien/news/do-co-analysten-bestatigen-buy-trotz-hormuz-risiko-kursziel-250-euro-und-fokus-auf-istanbul-rerouting' },
  { id: 4, titulo: 'DO & CO: Diese Aktie hat sich seit 2006 ver-20-facht – und keiner kennt sie', editor: 'aktienwelt360', tipo: 'Foros y redes', fecha: '2026-02-14', url: 'https://www.aktienwelt360.de/2026/02/14/do-co-diese-aktie-hat-sich-seit-2006-ver-20-facht-und-keiner-kennt-sie/' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'wallstreet-online (foro)', fecha: '2026-06', n_comentarios: 15, tono: 'Positivo', resumen: 'Pocos particulares, casi todos tenedores a largo plazo: no entienden las caídas tras resultados buenos (nov-2025) y compran en las bajadas; uno duda del efecto de la lira en el 28 % de ventas turcas [1].' },
      { plataforma: 'Börse Express (artículos y comentarios)', fecha: '2025-10', n_comentarios: 5, tono: 'Dividido', resumen: 'Debate técnico sobre si la corrección desde 235 EUR había terminado; se cita la entrada de JP Morgan como señal de compra [2].' },
      { plataforma: 'Goldesel (resumen de notas de analistas)', fecha: '2026-05', n_comentarios: 0, tono: 'Positivo', resumen: 'Recoge el recorte de objetivo de 266 a 250 EUR por Ormuz y el desvío de vuelos a Estambul como posible beneficio [3].' },
      { plataforma: 'aktienwelt360 (blog con lectores)', fecha: '2026-02', n_comentarios: 0, tono: 'Positivo', resumen: 'Tesis de «joya desconocida» que se multiplicó por 20 desde 2006 y cayó un 10 % en tres días pese a buenas cifras [4].' },
    ],
    temas: [
      { tema: 'La lira turca y la hiperinflación', postura: 'Dividida', peso: 'Alto', contraste: null },
      { tema: 'Caídas de la acción con resultados buenos', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'Oriente Medio y el combustible', postura: 'Dividida', peso: 'Medio', contraste: null },
      { tema: 'Calidad del fundador y de la marca', postura: 'Alcista', peso: 'Medio', contraste: null },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'debate de los últimos tres meses', tipo: 'Complemento', intentos: '1) wallstreet-online (último mensaje del 11-jun-2026); 2) Seeking Alpha y Stocktwits (sin símbolo DOCOF activo; RSS vacío); 3) Börse Express, Goldesel, aktienwelt360 y comdirect: artículos sin hilo de comentarios desde julio', decision: 'Se usan las fuentes de feb-jun 2026 y se marca la confianza como baja' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas en', dir);
