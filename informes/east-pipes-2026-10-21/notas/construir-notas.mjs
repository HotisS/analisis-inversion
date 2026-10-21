// Notas A-E de East Pipes Integrated Company for Industry (Tadawul 1321, corte 2026-10-21). Arabia Saudí: sin XBRL en cuentas.mjs.
// Ejercicio cerrado a 31 de MARZO, etiqueta «fin» (FY2026 = abr-2025 a mar-2026). Trimestres con etiqueta fiscal: 1T27 = abr-jun 2026.
// Cuentas auditadas FY2026 y FY2025 (EY), FY2024 (con FY2023 comparativo) y FY2022 (PwC; estados escaneados leídos como imagen).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/east-pipes-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const W = 'https://www.eastpipes.com/wp-content/uploads';
const AN = 'https://www.eastpipes.com/announcements';
const SE = 'https://www.saudiexchange.sa/Resources/fsPdf';
const N = 31.5; // millones de acciones (sin autocartera ni instrumentos dilutivos)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Financial statements and independent auditor\'s report for the year ended 31 March 2026 (EY; cuenta, balance, flujos y notas: ingresos por tipo, costes, otros ingresos, zakat, existencias, clientes, anticipos, vinculadas, accionistas, dividendos, garantías)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-05-21', url: `${W}/2026/06/2763_0_2026-05-21_17-43-42_En.pdf` },
  { id: 2, titulo: 'Financial statements for the year ended 31 March 2025 (EY; concentración de clientes)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2025-06', url: `${W}/2025/07/East-pipe-English-signed-FS-2025-F.pdf` },
  { id: 3, titulo: 'Financial statements for the year ended 31 March 2024 (cuenta, balance y flujos de FY2024 y FY2023; ingresos por tipo; dividendos)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2024-06-02', url: `${W}/2024/07/2763_0_2024-06-02_13-54-25_En.pdf` },
  { id: 4, titulo: 'Financial statements for the year ended 31 March 2022 (PwC; estados de FY2022 y FY2021 escaneados; cartera de 648,7 M SAR a 31-mar-2022)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2022-05-26', url: `${W}/2022/06/East-Pipes-FS-FY-2021-22-En-2.pdf` },
  { id: 5, titulo: 'Earnings Release FY26 (ending 31 Mar 2026)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-05-13', url: `${SE}/12939_2763_2026-05-13_15-49-48_en.pdf` },
  { id: 6, titulo: 'Earnings Release 1Q-FY27 (ending 30 Jun 2026)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-07-21', url: `${SE}/12939_2763_2026-07-21_16-09-49_en.pdf` },
  { id: 7, titulo: 'Earnings Release H1-FY27 (ending 30 Sep 2026): ventas −9,5 %, EBITDA 241,2 M, beneficio 200,9 M, caja 995,2 M, sin deuda bancaria', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-10-21', url: `${SE}/12637_2763_2026-10-21_15-49-42_en.pdf` },
  { id: 8, titulo: 'Announces its Interim Financial results for the Period Ending on 2026-09-30 (Six Months): 2T27 ventas 344,8 M (−39,6 %), beneficio 78,0 M (−50,8 %), causa: retrasos en la materia prima', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2026-10-21', url: `${AN}/east-pipes-integrated-company-for-industry-announces-its-interim-financial-results-for-the-period-ending-on-2026-09-30-six-months/` },
  { id: 9, titulo: 'Announces its Interim Financial results for the Period Ending on 2025-12-31 (Nine Months)', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2026-02', url: `${AN}/east-pipes-integrated-company-for-industry-announces-its-interim-financial-results-for-the-period-ending-on-2025-12-31-nine-months/` },
  { id: 10, titulo: 'Interim condensed financial statements, three and six months ended 30 September 2024', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2024-11-07', url: `${W}/2025/11/2763_0_2024-11-07_13-44-11_En.pdf` },
  { id: 11, titulo: 'Interim condensed financial statements, three months ended 30 June 2025', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2025-07-30', url: `${W}/2025/11/2763_0_2025-07-30_14-27-31_En.pdf` },
  { id: 12, titulo: 'Annual Board of Directors Report 2025-2026 (capacidad, contratos, Green Riyadh, riesgos de la bobina laminada en caliente, consejo, remuneraciones, vinculadas)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-07', url: `${W}/2026/07/EPIC-Annual-BoD-Report-25-26-EN.pdf` },
  { id: 13, titulo: 'Press release: completion of new HSAW production line (capacidad nominal de 400.000 a 500.000 t; hasta 600.000 t según la mezcla)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-03-15', url: `${SE}/13598_2763_2026-03-14_21-28-07_en.pdf` },
  { id: 14, titulo: 'Volumes and prices lift East Pipes as shipping disruptions raise costs (desvío de la materia prima de Ormuz y Bab el-Mandeb a Yeda y Yanbu; fletes +15-20 %)', editor: 'Enterprise AM (KSA)', tipo: 'Prensa', fecha: '2026-07-26', url: 'https://enterpriseam.com/ksa/2026/07/26/volumes-and-prices-lift-east-pipes-as-shipping-disruptions-raise-costs/' },
];

const c = (periodo, ingresos, coste_ventas, gastos_generales, amort, ebit, resultado_financiero, bai, impuestos, beneficio_neto, gastos_financieros, dpa) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda: Math.round((ebit + amort) * 10) / 10, amortizaciones: amort, ebit, resultado_financiero, bai, impuestos, minoritarios: 0, beneficio_neto,
  gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: Math.round((beneficio_neto / N) * 100) / 100, dpa, dpa_extraordinario: 0, acciones_diluidas: N,
});
// EBIT = beneficio de explotación + otros ingresos de explotación SIN los intereses de los depósitos (que van al resultado financiero).
const cuenta = [
  c('FY2022', 597.5, 563.0, 23.9, 24.1, 14.8, -16.6, -1.8, 1.4, -3.2, 16.9, 0),
  c('FY2023', 1438.6, 1282.8, 24.5, 25.4, 135.4, -23.6, 111.7, 11.8, 99.9, 23.6, 1.0),
  c('FY2024', 1543.2, 1192.6, 25.4, 26.6, 326.1, -29.3, 296.9, 29.4, 267.5, 29.3, 1.5),
  c('FY2025', 1832.8, 1372.7, 30.9, 26.1, 435.8, -10.6, 425.3, 43.2, 382.1, 14.9, 4.0),
  c('FY2026', 2297.7, 1651.1, 33.0, 25.1, 614.9, 5.9, 620.8, 47.6, 573.3, 9.9, 6.0),
];
cuenta[0].bpa = -0.10;

const b = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, reservas) =>
  ({ periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio: 0, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios: 0, reservas });
const balanceH = [
  b('FY2022', 895.9, 615.5, 346.1, 380.9, 0.1, 262.3, 39.7, 375.2, 30.6, 3.3, 1.8, 73.9, 274.3, 18.5, 515.0, 270.0),
  b('FY2023', 987.3, 728.0, 340.1, 371.9, 0.6, 245.7, 64.8, 558.8, 28.1, null, null, 53.4, 244.9, 13.0, 615.4, 255.4),
  b('FY2024', 1486.8, 1245.4, 500.7, 634.9, 1.2, 233.0, 255.9, 810.0, 17.3, null, null, 66.0, 287.6, 7.5, 851.9, 465.2),
  b('FY2025', 1638.5, 1397.8, 450.2, 504.1, 2.0, 220.9, 391.0, 606.3, 31.4, 4.9, 58.4, 8.0, 103.5, 18.2, 1134.4, 747.7),
  b('FY2026', 1969.9, 1700.7, 353.1, 406.1, 1.2, 247.1, 261.6, 635.2, 65.3, 5.4, 46.8, 680.9, 0, 21.5, 1563.8, 1248.8),
];
const f = (periodo, flujo_operativo, capex, pagos_arrendamientos, dividendos, desinversiones = 0) => ({ periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones: 0, desinversiones, dividendos, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 });
const flujosH = [
  f('FY2022', -99.5, 3.3, 5.8, 0),
  f('FY2023', 17.8, 3.5, 6.7, 0),
  f('FY2024', 10.7, 5.2, 6.1, 31.5),
  f('FY2025', 237.6, 8.5, 7.1, 94.5),
  f('FY2026', 973.1, 42.4, 9.7, 141.8),
];
const q = (periodo, ingresos, crecimiento_pct, ebitda, bn, vs = null) => ({ periodo, ingresos, crecimiento_pct, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: ebitda ? Math.round((ebitda / ingresos) * 1000) / 10 : null, bpa: Math.round((bn / N) * 100) / 100, vs_consenso: vs });

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    // LTM a 30-sep-2026 = FY2026 − 1S FY2026 + 1S FY2027. EBIT y EBITDA estimados: beneficio de explotación publicado (557,5 M) + amortización anual (≈ 26 M).
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 2207.1, ebitda: 583.8, ebit: 557.8, beneficio_neto: 525.4, bpa: 16.68, dpa: 6.0, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      q('3T25', 527.9, null, null, 112.4),
      q('4T25', 400.4, null, null, 85.6),
      q('1T26', 385.2, 5.7, 110.2, 90.3),
      q('2T26', 570.9, 5.7, 176.8, 158.6),
      q('3T26', 640.7, 21.4, null, 160.0),
      q('4T26', 700.9, 75.0, null, 164.4),
      q('1T27', 520.7, 35.2, 145.3, 122.9),
      q('2T27', 344.8, -39.6, 95.9, 78.0),
    ],
    ultima_presentacion: null,
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [],
    liquidez: 'Caja de 995,2 M SAR a 30-sep-2026 y ninguna deuda bancaria (se amortizaron 104 M en FY2026) [A7, A5]; los depósitos a menos de tres meses rentaron un 5,1 % de media en FY2026 [A1]. El 5-nov-2026 se pagan 63 M de dividendo del 1S FY2027 (2 SAR por acción) [C6].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, comentario: null, confianza: 'Alta' },
  calidad: {
    auditor: 'Ernst & Young Professional Services (FY2025 y FY2026); PricewaterhouseCoopers en FY2022',
    anios_auditor: 2,
    opinion: 'Favorable (FY2026, sin salvedades; asunto clave: pérdidas esperadas de clientes, el 32,3 % del activo). Revisión limitada del 1S FY2027 sin salvedades [A1, A8]',
    comentario: null, senales: null,
    confianza: 'Alta',
  },
  capital: {
    politica: null,
    adquisiciones: [],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Venta de tubos', descripcion: 'Tubos de acero soldados en espiral (HSAW) de gran diámetro, hasta API 5L X70, para conducciones de agua, petróleo y gas; ingreso al entregar', tipo_resultado: null, historico: [{ periodo: 'FY2023', ingresos: 1284.5, resultado: null }, { periodo: 'FY2024', ingresos: 1447.3, resultado: null }, { periodo: 'FY2025', ingresos: 1673.6, resultado: null }, { periodo: 'FY2026', ingresos: 2078.8, resultado: null }] },
      { nombre: 'Servicios de revestimiento', descripcion: 'Revestimiento interior y exterior de tubos (incluidos tubos aportados por el cliente); ingreso a lo largo del servicio', tipo_resultado: null, historico: [{ periodo: 'FY2023', ingresos: 154.1, resultado: null }, { periodo: 'FY2024', ingresos: 95.9, resultado: null }, { periodo: 'FY2025', ingresos: 159.2, resultado: null }, { periodo: 'FY2026', ingresos: 219.0, resultado: null }] },
    ],
    geografias: [{ nombre: 'Arabia Saudí', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Capacidad nominal de tubo HSAW', valor_anterior: '400.000 t (FY2025)', valor_actual: '500.000 t (mar-2026)', variacion: '+25 %', comentario: 'Nueva línea en marcha desde el 15-mar-2026; hasta 600.000 t según la mezcla de diámetros [A13, A12].' },
      { kpi: 'Contratos anunciados en el ejercicio', valor_anterior: 'n.d.', valor_actual: '> 2.527 M SAR (FY2026)', variacion: '—', comentario: 'Agencia Saudí del Agua (> 485 M), Esnad (> 235 M), grandes pedidos de 2024 (> 1.650 M), Aramco con acuerdo marco por séptimo año [A12]. La empresa no publica la cartera de pedidos.' },
      { kpi: 'Margen bruto', valor_anterior: '25,1 % (FY2025)', valor_actual: '28,1 % (FY2026)', variacion: '+3,0 pp', comentario: '26,3 % en el 1T27 y 24,6 % en el 2T27: el coste por tonelada (fletes y seguros) sube más que el precio [A1, A7, A8].' },
      { kpi: 'Clientes públicos sobre cobros pendientes', valor_anterior: '85 % en dos clientes (mar-2025)', valor_actual: '96 % en dos clientes (mar-2026)', variacion: '+11 pp', comentario: 'Clientes de gobierno: 608,5 M de 635,4 M brutos; pérdida esperada del 0,02 % [A1].' },
      { kpi: 'Caja neta', valor_anterior: '−95,5 M SAR (mar-2025)', valor_actual: '+995,2 M SAR (sep-2026)', variacion: 'n.s.', comentario: 'Flujo operativo de 973 M en FY2026 y 457 M en el 1S FY2027, con la liberación del circulante [A1, A7].' },
      { kpi: 'Ventas por trimestre', valor_anterior: '570,9 M (2T26)', valor_actual: '344,8 M (2T27)', variacion: '−39,6 %', comentario: 'Retrasos en la llegada de bobina por la situación geopolítica: menos producción [A8].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'cartera de pedidos', tipo: 'Complemento', intentos: '1) Cuentas FY2024-FY2026 e informe del consejo FY2026: solo «substantial backlog», sin cifra (la última publicada, 648,7 M SAR a 31-mar-2022); 2) notas de resultados y presentaciones de 1T y 1S FY2027: sin cifra; 3) prensa (Enterprise, Argaam): sin cifra', decision: 'Omitido: se usan los contratos anunciados a Tadawul' },
    { seccion: 'trimestres', campo: 'ebitda de 3T26 y 4T26 y trimestres de FY2025', tipo: 'Complemento', intentos: '1) Anuncios a Tadawul: solo ventas, bruto, explotación y neto; 2) notas de resultados: EBITDA solo semestral o del 1T; 3) derivar: el EBITDA de la empresa incluye intereses de la caja; no se deriva', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'ultima_presentacion (transcripciones)', tipo: 'Complemento', intentos: '1) Web de inversores: sin transcripciones; 2) anuncio de la reunión virtual del 30-oct-2025: sin acta publicada; 3) prensa: entrevista del consejero delegado en funciones a Al Arabiya resumida por Enterprise', decision: 'Omitido: se resume el anuncio y la entrevista' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Saudi Arabia Steel Pipes Market: USD 2.446,1 M en 2024, 2.574,3 M en 2025 y 3.413,1 M en 2030 (TCAC 5,7 %)', editor: 'P&S Intelligence', tipo: 'Sectorial', fecha: '2025', url: 'https://psmarketresearch.com/market-analysis/saudi-arabia-steel-pipes-market' },
  { id: 2, titulo: 'Annual Board of Directors Report 2025-2026 (mercado mundial de tubo HSAW: USD 4.820 M en 2025 y 6.130 M en 2032; Estrategia Nacional del Agua 2030; gas +80 % de capacidad en 2030; riesgos)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-07', url: `${W}/2026/07/EPIC-Annual-BoD-Report-25-26-EN.pdf` },
  { id: 3, titulo: 'Arabian Pipes Co. (2200.SR), Saudi Steel Pipe (1320.SR), Al Yamamah Steel (1304.SR), Welspun Corp (WELCORP.NS), Jindal Saw (JINDALSAW.NS), Tenaris (TS): ventas, márgenes y valoración (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/2200.SR' },
  { id: 4, titulo: 'Financial statements for the year ended 31 March 2022 (historia: fusión con Welspun Middle East Pipes Coating en 2020, salida a bolsa, subida del 51 % de la materia prima en FY2022)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2022-05-26', url: `${W}/2022/06/East-Pipes-FS-FY-2021-22-En-2.pdf` },
  { id: 5, titulo: 'Volumes and prices lift East Pipes as shipping disruptions raise costs (guerra, desvío de la materia prima, posible exportación, oleoducto Este-Oeste)', editor: 'Enterprise AM (KSA)', tipo: 'Prensa', fecha: '2026-07-26', url: 'https://enterpriseam.com/ksa/2026/07/26/volumes-and-prices-lift-east-pipes-as-shipping-disruptions-raise-costs/' },
  { id: 6, titulo: 'Annual Report 2024 (FY2023-24)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2024-07', url: `${W}/2024/07/East-Pipes-Annual-Report-2024-En-v15.pdf` },
];
const usd = 3.751;
const B = {
  _estado: 'completo',
  historia: {
    resumen: null,
    hitos: [
      { anio: '2010', hito: 'Constitución en Dammam (licencia de inversión extranjera, julio de 2010) por Welspun y socios saudíes para fabricar tubo soldado en espiral [B4].' },
      { anio: '2020', hito: 'Fusión, bajo control común, con Welspun Middle East Pipes Coating (revestimientos) y conversión en sociedad anónima cerrada [B4].' },
      { anio: '2022', hito: 'Salida a bolsa en Tadawul del 30 % del capital (6,3 M acciones de entonces); FY2022 con pérdidas por la subida del 51 % de la materia prima [B4].' },
      { anio: '2022', hito: 'Ampliación gratuita: el capital pasa de 210 a 315 M SAR (31,5 M acciones) [A3].' },
      { anio: '2023', hito: 'Grandes contratos de Aramco (> 1.800 M SAR) y de agua: las ventas pasan de 597 M (FY2022) a 1.439 M (FY2023) [A3].' },
      { anio: '2024', hito: 'Pedidos por más de 1.650 M SAR en cuatro proyectos y > 235 M de Esnad [B2].' },
      { anio: '2025', hito: 'Contrato de la Agencia Saudí del Agua (> 485 M SAR); 100 % de los 15 primeros proyectos de Green Riyadh; acuerdo marco con Aramco por séptimo año; salida del consejero delegado y nombramiento del director financiero como consejero delegado en funciones [B2].' },
      { anio: '2026', hito: 'Nueva línea de 100.000 t (capacidad nominal de 500.000 t); FY2026 récord (ventas de 2.298 M, beneficio de 573 M) sin deuda; 2T27 hundido por los retrasos de la bobina; tres contratos de Aramco por 837 M SAR en septiembre [A13, A5, A8, D9].' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: null,
    tamano: `≈ 9.656 M SAR en 2025 (USD 2.574,3 M a ${usd} SAR/USD), tubo de acero en Arabia Saudí [B1]; el tubo HSAW mundial es de USD 4.820 M (2025) [B2].`,
    unidad_serie: 'millones de SAR',
    serie: [{ anio: '2024', tamano: 9175 }, { anio: '2025', tamano: 9656 }, { anio: '2030e', tamano: 12803 }],
    tcac_historico_pct: null, tcac_previsto_pct: 5.7, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Agua: transporte de agua desalada al interior', efecto: '+', horizonte: 'Estructural', evidencia: 'Estrategia Nacional del Agua 2030: más desalación, conducciones y reservas hasta siete días de demanda en 2030 [B2]; contrato de la Agencia Saudí del Agua de > 485 M SAR (dic-2025) [B2].' },
      { driver: 'Gas: Master Gas System y +80 % de capacidad de gas de venta en 2030', efecto: '+', horizonte: 'Estructural', evidencia: 'Tres contratos de Aramco por 837 M SAR en septiembre de 2026 y acuerdo marco por séptimo año [D9, B2].' },
      { driver: 'Precio de la bobina laminada en caliente (≈ 89 % del coste de ventas en materiales)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Materiales de 1.475 M de 1.651 M de coste de ventas en FY2026 [A1]; en FY2022 la subida del 51 % llevó a pérdidas [B4].' },
      { driver: 'Ciclo de inversión pública y de Aramco (calendario de licitaciones)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Ventas de 935 M (FY2021) a 597 M (FY2022) por pedidos aplazados, y de 597 M a 2.298 M (FY2026) [B4, A1].' },
      { driver: 'Logística de importación (Ormuz, Bab el-Mandeb)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Barcos desviados a Yeda y Yanbu con hasta cuatro semanas de espera y fletes +15-20 % [B5]; ventas del 2T27 −39,6 % [A8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos fabricantes locales de gran diámetro (East Pipes, Arabian Pipes, Saudi Steel Pipe, Al Yamamah) y licitaciones por precio; el margen operativo de Arabian Pipes es del 7,8 % frente al 26,7 % de East Pipes en FY2026 [B3, A1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Dos clientes públicos concentran el 96 % de los cobros pendientes (Aramco y la Agencia del Agua) y deciden el calendario [A1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'La bobina es casi todo el coste y se importa por mar; la guerra la retrasó en el 2T27 [A1, A8].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologación de Aramco y de la Agencia del Agua, contenido local (IKTVA) y fábricas de 400-500 kt [B2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'En conducciones de gran diámetro y alta presión el acero no tiene sustituto práctico; los plásticos compiten en diámetros pequeños [B2].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: null },
    regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 23.8,
    posicion: '1.º fabricante de tubo HSAW de Arabia Saudí por capacidad y ventas; ≈ 24 % del tubo de acero saudí en 2025 (ventas de FY2026 ÷ mercado de P&S) [A1, B1]',
    competidores: [
      { nombre: 'Saudi Steel Pipe (SSP)', pais: 'Arabia Saudí', ticker: '1320.SR', ingresos: 1313, cuota_pct: 13.6, margen_ebit_pct: 15.3, comentario: 'Tubo soldado longitudinal (ERW) y espiral; cliente Aramco; datos de los últimos doce meses [B3].' },
      { nombre: 'Arabian Pipes', pais: 'Arabia Saudí', ticker: '2200.SR', ingresos: 725, cuota_pct: 7.5, margen_ebit_pct: 7.8, comentario: 'Tubo ERW y espiral para agua y petróleo; ventas −37 % interanual [B3].' },
      { nombre: 'Al Yamamah Steel', pais: 'Arabia Saudí', ticker: '1304.SR', ingresos: 1976, cuota_pct: null, margen_ebit_pct: 16.7, comentario: 'Tubo y perfiles y torres eléctricas; solo una parte compite [B3].' },
      { nombre: 'Welspun Corp', pais: 'India', ticker: 'WELCORP.NS', ingresos: 6870, cuota_pct: null, margen_ebit_pct: 13.9, comentario: 'Accionista de referencia (26,5 %) y proveedor ocasional de tubo; compite en exportación al Golfo [B3, A1].' },
      { nombre: 'Jindal Saw', pais: 'India', ticker: 'JINDALSAW.NS', ingresos: 7347, cuota_pct: null, margen_ebit_pct: 2.1, comentario: 'Tubo SAW y de fundición dúctil para agua; exporta a Oriente Medio [B3].' },
      { nombre: 'Tenaris', pais: 'Luxemburgo', ticker: 'TS', ingresos: 45162, cuota_pct: null, margen_ebit_pct: 16.7, comentario: 'Tubo sin soldadura para pozos; compite poco en conducción de gran diámetro [B3].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta por proyecto.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Homologación de Aramco (acuerdo marco por séptimo año) y de la Agencia del Agua; pero cada contrato se licita [B2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Contenido local y licencias API; sin patentes relevantes [B2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo del 26,7 % en FY2026 frente al 15,3 % de SSP y el 7,8 % de Arabian Pipes; planta integrada con revestimiento y doble unión [A1, B3].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '500.000 t de capacidad nominal en un mercado de ≈ 9.700 M SAR; mayor fabricante HSAW del país [A13, B1].' },
      ],
    },
    amenazas: null,
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: null, controversias: null,
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informe del consejo: sin cuotas; 2) P&S, IMARC: listas de empresas sin cuotas; 3) suma de ventas de los cotizados: mezcla de perímetros', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe del consejo e informe de sostenibilidad: sin calificaciones externas; 2) Sustainalytics y MSCI: sin ficha pública; 3) S&P Global CSA: no aparece', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Board of Directors Report 2025-2026 (consejo, comités, dirección, remuneraciones, vinculadas, política de dividendos)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-07', url: `${W}/2026/07/EPIC-Annual-BoD-Report-25-26-EN.pdf` },
  { id: 2, titulo: 'Financial statements FY2026, notas 20 (vinculadas: compras de tubo a Welspun Corp por 112,2 M), 22 (accionistas) y 31 (dividendos)', editor: 'East Pipes Integrated Company for Industry', tipo: 'Primaria', fecha: '2026-05-21', url: `${W}/2026/06/2763_0_2026-05-21_17-43-42_En.pdf` },
  { id: 3, titulo: 'Issues Purchase Order to Welspun Corp Limited (Related Party) por 173,2 M SAR', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2025-09-26', url: `${AN}/east-pipes-integrated-company-for-industry-issues-purchase-order-to-welspun-corp-limited-related-party/` },
  { id: 4, titulo: 'Announces the Results of the Ordinary General Assembly Meeting FY 2025-2026 (27-jul-2026; asistencia del 47,6 %)', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2026-07-28', url: `${AN}/east-pipes-integrated-company-for-industry-announces-the-results-of-the-ordinary-general-assembly-meeting-fy-2025-2026-first-meeting/` },
  { id: 5, titulo: 'Letter from a shareholder owning more than 5 % about the transfer of ownership (Welspun Mauritius → Welspun Pipes Inc, 22 %)', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2026-03', url: `${AN}/east-pipes-integrated-company-for-industry-announces-that-it-has-received-a-letter-from-one-of-its-shareholders-who-owns-more-than-5-of-the-companys-shares-informing-about-the-transfer-of-ownershi/` },
  { id: 6, titulo: 'Board decision to distribute cash dividends for first half of FY 2026-2027 (2 SAR por acción; derecho el 22-oct, pago el 5-nov-2026)', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2026-10-21', url: `${AN}/east-pipes-integrated-company-for-industry-announces-the-board-of-directors-decision-to-distribute-cash-dividends-for-for-first-half-period-of-fy-2026-2027/` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Mohamed Saleh Ali Darweesh', cargo: 'Consejero delegado en funciones y director financiero; secretario del consejo', desde: '2021', participacion_pct: 0, trayectoria: 'Director financiero desde ago-2021 y consejero delegado en funciones desde 2025, tras la salida de Mohammed Al-Shaheen; antes, director financiero de Middle East Paper (2016-2021) y de Qassim Cement (2009-2016). Con él, deuda cero y caja de 995 M SAR [C1, A7].' },
      { nombre: 'Vipul Shiv Sahai Mathur', cargo: 'Presidente (no ejecutivo, representa a Welspun Corp)', desde: '2020', participacion_pct: 0, trayectoria: 'Presidente desde la constitución del consejo cotizado; se abstuvo en la compra de tubo a Welspun Corp [C1, C3].' },
      { nombre: 'Mohammed Saleh AlShamrani', cargo: 'Vicepresidente comercial', desde: '2026', participacion_pct: 0, trayectoria: 'Nombrado el 15-ene-2026 [C1].' },
      { nombre: 'Sanjay Kant Shrivastava', cargo: 'Vicepresidente de operaciones', desde: '2018', participacion_pct: 0, trayectoria: 'Responsable de la planta de Dammam; puesta en marcha de la nueva línea de 100.000 t en marzo de 2026 [C1, A13].' },
      { nombre: 'Khalid Ali Babakri', cargo: 'Vicepresidente de calidad, salud y seguridad', desde: '2021', participacion_pct: 0, trayectoria: 'Homologaciones de Aramco y de la Agencia del Agua [C1].' },
    ],
    historial_guidance: [],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Vipul Shiv Sahai Mathur', cargo: 'Presidente', tipo: 'Dominical', desde: '2020', comisiones: '—' },
      { nombre: 'Yazeed Abdulrahman Nasser Altoaimi', cargo: 'Vicepresidente', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Fahad Mohammed Saleh Al-Hammadi', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: '—' },
      { nombre: 'Aziz Mohammed Mubarak Algahtani', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Ejecutiva (presidente)' },
      { nombre: 'Suhail Amin Nathani', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Nombramientos y retribuciones (presidente)' },
      { nombre: 'Walid Abdullah Suliman Al-Zakri', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Faris Abdulrahman Ibrahim Alfaris', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Viswanathan Hariharan Kollengode', cargo: 'Consejero', tipo: 'Dominical', desde: '2022', comisiones: 'Ejecutiva' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: null,
    accionistas: [
      { nombre: 'Grupo Welspun Corp (Welspun Pipes Inc 22,0 % + Welspun Mauritius Holdings 4,5 %)', pct: 26.5, tipo: 'Industrial (Welspun Corp, India)', variacion: 'Traspaso interno de 22 % a Welspun Pipes Inc el 23-mar-2026; total sin cambios [C2, C5]' },
      { nombre: 'Saleh Muhammad Hamad Al-Hammadi', pct: 9.98, tipo: 'Particular (familia Al-Hammadi, con consejero)', variacion: 'Sin cambios [C2]' },
      { nombre: 'Capital flotante', pct: 63.52, tipo: 'Mercado', variacion: '—' },
    ],
    insiders: [],
    control_y_defensas: null,
    alertas: null,
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) Informe del consejo FY2026: solo el total de los cinco directivos mejor pagados (7,66 M SAR); 2) cuentas, nota 20: 9,77 M para todo el personal clave; 3) actas de la junta: sin desglose', decision: 'Omitido: se da el total de los cinco' },
    { seccion: 'gobierno', campo: 'voto_remuneracion', tipo: 'Complemento', intentos: '1) Anuncio de la junta del 27-jul-2026: resultados en adjunto no accesible; 2) web de inversores: sin actas; 3) Argaam: sin porcentajes', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Anuncios de Tadawul de 12 meses: sin operaciones de consejeros; 2) informe del consejo: participaciones de consejeros < 0,002 %; 3) sin registro consultable de operaciones de directivos', decision: 'Omitido (no se puede afirmar que no hubo operaciones)' },
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Notas de resultados FY2023-FY2027: sin guía numérica; 2) informes del consejo: solo objetivos cualitativos; 3) prensa: sin guía', decision: 'Omitido: la empresa no publica guía' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const fD = [
  { id: 1, titulo: 'Históricos diarios de 1321.SR, KSA y SLX (precio, rango, volumen, rentabilidades, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/1321.SR/history' },
  { id: 2, titulo: 'East Pipes Integrated Company for Industry: estimaciones anuales (3 analistas; FY2027-FY2029), objetivo medio 228,67 SAR', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/EAST-PIPES-INTEGRATED-COM-132327898/finances/' },
  { id: 3, titulo: 'TADAWUL:1321 forecast: 3 analistas, objetivo medio 228,67 SAR, máximo 280 y mínimo 185', editor: 'TradingView', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.tradingview.com/symbols/TADAWUL-1321/forecast-price-target/' },
  { id: 4, titulo: 'Comparables: quoteSummary de 2200.SR, 1320.SR, 1304.SR, WELCORP.NS, JINDALSAW.NS, TS, TUB.MC y NWPX; tipos de cambio USD/SAR, EUR/SAR y USD/INR', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/1320.SR' },
  { id: 5, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,15 % el 19-oct-2026', editor: 'FRED (Reserva Federal de St. Louis)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Country Default Spreads and Risk Premiums (Arabia Saudí: Aa3, diferencial soberano 0,51 %, prima de país 0,78 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 en octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Contract Sign Off with Saudi Arabian Oil Co. (Aramco): > 771 M SAR con IVA, seis meses, efecto del 4T FY2027 al 1T FY2028', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2026-09-20', url: `${AN}/east-pipes-integrated-company-for-industry-announces-contract-sign-off-with-saudi-arabian-oil-co-aramco-3/` },
  { id: 9, titulo: 'Contract Sign Off with Saudi Arabian Oil Co. (Aramco): ≈ 20 M SAR con IVA, cuatro meses, efecto en el 4T FY2027 (y nota de resultados del 1S FY2027: tres contratos de Aramco por 837 M SAR en septiembre)', editor: 'East Pipes (anuncio a Tadawul)', tipo: 'Primaria', fecha: '2026-09-15', url: `${AN}/east-pipes-integrated-company-for-industry-announces-contract-sign-off-with-saudi-arabian-oil-co-aramco-2/` },
  { id: 10, titulo: 'Access the Saudi Exchange with your IBKR account (acceso de clientes minoristas extranjeros vía SNB Capital)', editor: 'Interactive Brokers', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://interactivebrokers.ie/en/trading/saudi-exchange.php' },
];

// Comparables calculados de Yahoo quoteSummary (yahoo-raw.json): capitalización en M SAR; EV/EBITDA de 12 meses; PER adelantado
// (forwardPE o, sin él, precio ÷ BPA de los próximos 12 meses ponderando los dos ejercicios estimados); DN/EBITDA y FCF/capitalización.
const Y = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-raw.json'), 'utf8'));
const FXSAR = { SAR: 1, USD: 3.751, EUR: 4.2116, INR: 3.751 / 94.45 };
const META = { '1320.SR': ['Saudi Steel Pipe', 'SA'], '2200.SR': ['Arabian Pipes', 'SA'], '1304.SR': ['Al Yamamah Steel', 'SA'], 'WELCORP.NS': ['Welspun Corp', 'IN'], 'JINDALSAW.NS': ['Jindal Saw', 'IN'], 'TEN.MI': ['Tenaris', 'LU'], 'TUB.MC': ['Tubacex', 'ES'], 'NWPX': ['NWPX Infrastructure', 'US'] };
const r1 = (x, d = 1) => (x === null || x === undefined || !isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
function compsYahoo() {
  return Object.entries(META).map(([s, [nombre, pais]]) => {
    const y = Y.comps.find((c) => c.s === s);
    const fx = FXSAR[y.cur] ?? 1, fxf = FXSAR[y.fcur] ?? fx;
    const y0 = y.et.find((t) => t.p === '0y'), y1 = y.et.find((t) => t.p === '+1y');
    let per = y.fpe;
    if (!per && y0?.eps && y1?.eps) { const fin0 = new Date(y0.end), corte = new Date('2026-10-21'); const w0 = Math.max(0, Math.min(1, (fin0 - corte) / (365 * 864e5))); per = y.price / (w0 * y0.eps + (1 - w0) * y1.eps); }
    const ebitda = y.ebitda ?? (y.rev && y.ebitdaM ? y.rev * y.ebitdaM : null);
    return { nombre, ticker: s, pais, capitalizacion: Math.round((y.mcap * fx) / 1e6), ev_ventas: r1(y.evRev, 2), ev_ebitda_ltm: r1(y.evEbitda), ev_ebitda_ntm: null, per_ntm: r1(per),
      crecimiento_pct: y1?.g !== null && y1?.g !== undefined ? r1(y1.g * 100) : null, margen_ebitda_pct: r1(y.ebitdaM * 100), roic_pct: null,
      dn_ebitda: ebitda ? r1((y.debt - y.cash) / ebitda) : null, fcf_yield_pct: y.fcf && y.mcap ? r1(((y.fcf * fxf) / (y.mcap * fx)) * 100) : null };
  });
}
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'East Pipes Integrated Company for Industry', nombre_corto: 'East Pipes', ticker: '1321.SR', isin: 'SA15GH80KKH0', mercado: 'Saudi Exchange (Tadawul), mercado principal', indice_referencia: 'TASI (en el informe, ETF iShares MSCI Saudi Arabia, KSA)',
    pais: 'Arabia Saudí', pais_iso: 'SA', sector: 'Materiales', industria: 'Acero (tubos de acero soldados)', sede: 'Dammam (Segunda Ciudad Industrial)', fundacion: '2010', empleados: null, web: 'https://www.eastpipes.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: N, capitalizacion_publicada: 5459, free_float_pct: 63.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 43 M SAR/día (≈ 11,5 M USD; 225.000 acciones, 3 meses)', proximos_resultados: '2027-02-01',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 2324, ebitda: 603.7, ebit: 576.7, bpa: 15.13, dpa: 5.5, fuente: 'MarketScreener, 3 analistas (previo al 2T27) [D2]' },
      { periodo: 'FY2028e', ingresos: 2702, ebitda: 712.7, ebit: 684.3, bpa: 19.17, dpa: 7.19, fuente: 'MarketScreener [D2]' },
      { periodo: 'FY2029e', ingresos: 2839, ebitda: 745.7, ebit: 716.7, bpa: 21.86, dpa: 7.11, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 3, comprar: 3, mantener: 0, vender: 0, po_medio: 228.67, po_min: 185, po_max: 280 },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: x.anio === 'FY2022' })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: compsYahoo(),
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Fabricantes de tubo soldado vendidos en 2019-2026 (Saudi Steel Pipe, Arabian Pipes, Welspun Middle East): sin múltiplos publicados; 2) Argaam y Mubasher: solo ampliaciones y traspasos internos; 3) operaciones internacionales (Tenaris-Benteler, ArcelorMittal-tubos): sin EV/EBITDA publicado y perímetro distinto', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm y roic', tipo: 'Complemento', intentos: '1) Yahoo: sin EBITDA adelantado; 2) MarketScreener: solo de algunas; 3) cuentas de cada una: fuera de tiempo', decision: 'Omitido: se usan EV/EBITDA de doce meses y PER adelantado' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Tadawul: sin registro público de cortos por valor; 2) Stock Analysis: sin dato; 3) préstamo de valores en Tadawul: sin estadística por valor', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'revisiones del BPA a 3 meses', tipo: 'Complemento', intentos: '1) MarketScreener: solo la foto actual; 2) Yahoo: tendencia de un analista; 3) Argaam: sin previsiones del 2T27', decision: 'Omitido; se dice que el consenso es anterior al 2T27' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Stocktwits (API 1321.SR): 404; Hawamer e Investing (comentarios): 403; 2) TradingView ideas: 14 análisis técnicos sin fecha visible y sin debate de fondo; 3) Reddit y Seeking Alpha: la empresa no tiene debate en inglés', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
