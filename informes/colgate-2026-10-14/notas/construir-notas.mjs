// Escribe las notas A-E de Colgate-Palmolive (corte 2026-10-14) a partir de los documentos de EDGAR descargados en notas/docs,
// del XBRL (cuentas-xbrl.json), de bolsa.json (Yahoo) y de comparables-yahoo.json. Cada nota cita con [n] de su propia lista.
// Ejecutar: node informes/colgate-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const C = lee('comparables-yahoo.json');
const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/21665';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas 2023-2025, segmentos, deuda, pensiones, no recurrentes y BPA base)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-02-23', url: `${EDGAR}/000002166526000006/cl-20251231.htm` },
  { id: 2, titulo: 'Form 10-K 2023 (cuentas 2021-2023, BPA base 2022-2023, deterioros de skin health)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2024-02-15', url: `${EDGAR}/000002166524000003/cl-20231231.htm` },
  { id: 3, titulo: 'Form 10-K 2021 (cuentas 2019-2021, BPA base 2020-2021)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2022-02-17', url: `${EDGAR}/000002166522000003/cl-20211231.htm` },
  { id: 4, titulo: 'Form 10-K 2019 (BPA base 2018-2019, compra de Filorga)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2020-02-21', url: `${EDGAR}/000002166520000004/cl-12312019x10k.htm` },
  { id: 5, titulo: 'Form 10-K 2017 (BPA base 2016-2017)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2018-02-15', url: `${EDGAR}/000002166518000003/cl-12312017x10k.htm` },
  { id: 6, titulo: 'Form 10-Q 2T26 (balance a 30-jun-2026, deuda, papel comercial, programa de productividad, perspectivas)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000002166526000042/cl-20260630.htm` },
  { id: 7, titulo: 'Form 10-Q 1T26 (ventas y crecimiento orgánico del 1T26)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: `${EDGAR}/000002166526000023/cl-20260331.htm` },
  { id: 8, titulo: 'Form 10-Q 3T25 (ventas, orgánico y BPA del 3T25)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2025-10-31', url: `${EDGAR}/000002166525000053/cl-20250930.htm` },
  { id: 9, titulo: 'Form 10-Q 2T25 (ventas y orgánico del 2T25)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2025-08-01', url: `${EDGAR}/000002166525000041/cl-20250630.htm` },
  { id: 10, titulo: 'Form 10-Q 1T25 (ventas y orgánico del 1T25)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2025-04-25', url: `${EDGAR}/000002166525000020/cl-20250331.htm` },
  { id: 11, titulo: 'Colgate-Palmolive Company Announces 4th Quarter and Full Year 2025 Results (8-K, ex. 99)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-01-30', url: `${EDGAR}/000002166526000003/a4q2025pressreleasetables.htm` },
  { id: 12, titulo: 'Colgate Announces 2nd Quarter 2026 Results (8-K, ex. 99; guía 2026)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000002166526000041/q22026pressreleasetables.htm` },
  { id: 13, titulo: 'Hechos XBRL de Colgate-Palmolive (companyfacts): cuenta, balance y flujos 2019-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000021665.json' },
  { id: 14, titulo: 'Segment recast (8-K de 17-mar-2026): nueva división EMEA desde el 1T26', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-03-17', url: `${EDGAR}/000002166526000010/segmentrecast.htm` },
];
// Partidas no recurrentes dentro del beneficio operativo (antes de impuestos), de las conciliaciones no GAAP de cada 10-K.
const NR = { 2019: 126, 2020: -10, 2021: 545, 2022: 803, 2023: 52, 2024: 85, 2025: 1040 };
const DPA = { 2019: 1.71, 2020: 1.75, 2021: 1.79, 2022: 1.86, 2023: 1.91, 2024: 2.00, 2025: 2.08 };
const cuenta = X.financieros.cuenta.filter((r) => anios.includes(r.periodo)).map((r) => {
  const { fin, ...c } = r;
  return { ...c, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[r.periodo], dpa: DPA[r.periodo], dpa_extraordinario: 0 };
});
const DEUDA = { 2024: 7949, 2025: 7988 }; // deuda total del 10-K (incluye pagarés a corto); los demás años, XBRL (largo + corriente, papel comercial dentro)
const balance = X.balance.historico.filter((r) => anios.includes(r.periodo)).map((r) => {
  const { fin, ...b } = r;
  return { ...b, deuda_financiera: DEUDA[r.periodo] ?? b.deuda_financiera, arrendamientos: 0, activos_contrato: null, pasivos_contrato: null };
});
const flujos = X.flujos.historico.filter((r) => anios.includes(r.periodo)).map((r) => {
  const { fin, ...f } = r;
  return { ...f, pagos_arrendamientos: 0, desinversiones: f.desinversiones ?? 0 };
});
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 21047, ebitda: 3772, ebit: 3130, beneficio_neto: 2038, bpa: 2.54, dpa: 2.10, dpa_extraordinario: 0, fcf: 3858, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1316 },
    cambios_perimetro: [{ periodo: '2019', descripcion: 'Compra de Filorga (sep-2019, 1.712 M) y de PCA Skin y EltaMD: entran en balance a lo largo del año' }],
    comentario: null, ajustes: null, confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 4911, crecimiento_pct: -3.1, crecimiento_organico_pct: 1.4, ebitda: null, margen_ebitda_pct: null, bpa: 0.91, vs_consenso: null },
      { periodo: '2T25', ingresos: 5110, crecimiento_pct: 1.0, crecimiento_organico_pct: 1.8, ebitda: null, margen_ebitda_pct: null, bpa: 0.92, vs_consenso: null },
      { periodo: '3T25', ingresos: 5131, crecimiento_pct: 2.0, crecimiento_organico_pct: 0.4, ebitda: null, margen_ebitda_pct: null, bpa: 0.91, vs_consenso: null },
      { periodo: '4T25', ingresos: 5230, crecimiento_pct: 5.8, crecimiento_organico_pct: 2.2, ebitda: null, margen_ebitda_pct: null, bpa: 0.95, vs_consenso: null },
      { periodo: '1T26', ingresos: 5324, crecimiento_pct: 8.4, crecimiento_organico_pct: 2.9, ebitda: null, margen_ebitda_pct: null, bpa: 0.98, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 5361, crecimiento_pct: 4.9, crecimiento_organico_pct: 2.4, ebitda: null, margen_ebitda_pct: null, bpa: 0.99, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: null, confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 1115 }, { anio: '2027', importe: 523 }, { anio: '2028', importe: 615 }, { anio: '2029', importe: 591 }, { anio: '2030', importe: 500 }, { anio: '2031+', importe: 4495 }],
    liquidez: 'Caja 1.370 M (30-jun-2026) + líneas de crédito no dispuestas de 3.641 M (31-dic-2025; incluye la línea sindicada de 3.000 M) [A1, A6]',
    rating: 'No figura en el 10-K ni en el 10-Q; no verificado',
    coste_deuda_pct: 3.3, vida_media_anios: null,
    otros_pasivos: null, comentario: null, confianza: 'Alta',
  },
  flujos: { historico: flujos, comentario: null, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades)', comentario: null, senales: [], confianza: 'Alta' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2025', objetivo: 'Prime100 (comida fresca para mascotas, Australia)', importe: 301, ev_ebitda: null, financiacion: 'Caja (471 M AUD)', resultado: 'Aporta 1,3 puntos de volumen a Hill\'s en el 1S26; pronto para juzgar' },
      { anio: '2022', objetivo: 'Tres plantas de comida húmeda para mascotas de Red Collar Pet Foods (EE. UU.)', importe: 700, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Capacidad para Hill\'s; el margen de Hill\'s cayó de 23 % a 19 % en 2022-2023 y volvió a 23 % en 2025 [A1, A2]' },
      { anio: '2020', objetivo: 'Hello Products (cuidado bucal natural, EE. UU.) y Nigeria', importe: 353, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin datos separados' },
      { anio: '2019', objetivo: 'Filorga (cosmética facial premium, Francia)', importe: 1712, ev_ebitda: null, financiacion: 'Deuda (papel comercial y bonos)', resultado: 'Fracaso: deterioros de 571 M (2021), 721 M (2022) y 919 M (2025, skin health); marca y relaciones con clientes de Filorga casi a cero a dic-2025 [A1, A2, A3]' },
      { anio: '2019', objetivo: 'PCA Skin y EltaMD (dermocosmética profesional, EE. UU.)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en skin health; el negocio pasa a EMEA en 2026 [A6]' },
    ],
    comentario: null, confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Oral, Personal and Home Care', 'Pasta y cepillos (Colgate), jabón y gel (Palmolive, Softsoap, Irish Spring), desodorante (Speed Stick), hogar (Ajax, Suavitel) y skin health; gestionado por regiones', [['2019', 13168, 3505], ['2020', 13588, 3594], ['2021', 14110, 3495], ['2022', 14254, 3348], ['2023', 15167, 3882], ['2024', 15618, 4088], ['2025', 15769, 3959]]),
      seg("Hill's Pet Nutrition", 'Comida para perros y gatos de prescripción veterinaria (Prescription Diet) y bienestar (Science Diet), vendida en veterinarios, tiendas especializadas y comercio electrónico', [['2019', 2525, 703], ['2020', 2883, 793], ['2021', 3311, 901], ['2022', 3713, 850], ['2023', 4290, 806], ['2024', 4483, 965], ['2025', 4613, 1064]]),
      seg('Corporativo', 'Gastos centrales, I+D, pagos en acciones, reestructuraciones y deterioros', [['2019', 0, -654], ['2020', 0, -502], ['2021', 0, -1064], ['2022', 0, -1305], ['2023', 0, -704], ['2024', 0, -784], ['2025', 0, -1717]]),
    ],
    geografias: [
      { nombre: 'EE. UU. (bucal, personal y hogar + Hill\'s)', peso_pct: 32.7 }, { nombre: 'Latinoamérica', peso_pct: 23.4 }, { nombre: 'Europa', peso_pct: 14.5 },
      { nombre: 'Asia-Pacífico', peso_pct: 13.8 }, { nombre: 'Hill\'s fuera de EE. UU.', peso_pct: 7.6 }, { nombre: 'África/Eurasia', peso_pct: 5.8 }, { nombre: 'Canadá y Puerto Rico', peso_pct: 2.2 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cuota mundial en pasta de dientes', valor_anterior: '41,7 % (2024)', valor_actual: '41,3 % (2025; 41,3 % en el 1S26)', variacion: '−0,4 p.', comentario: 'Pierde en Norteamérica, Latinoamérica y África/Eurasia; gana en Europa [A1, A12]' },
      { kpi: 'Cuota mundial en cepillos manuales', valor_anterior: '32,0 % (2024)', valor_actual: '32,4 % (2025; 32,7 % en el 1S26)', variacion: '+0,4 p.', comentario: '[A1, A12]' },
      { kpi: 'Crecimiento orgánico del grupo', valor_anterior: '+7,4 % (2024, estimación con la conciliación del 10-K)', valor_actual: '+1,4 % (2025); +2,6 % (1S26)', variacion: 'Desacelera', comentario: 'Precio +2,1 % y volumen −0,4 % en 2025 [A1, A6]' },
      { kpi: 'Orgánico de Hill\'s', valor_anterior: '+4,9 % (2024)', valor_actual: '+1,2 % (2025); +2,1 % (1S26)', variacion: 'Desacelera', comentario: 'Salida de la marca blanca: −3,2 p. en 2025 y −2,3 p. en el 1S26 [A1, A6]' },
      { kpi: 'Publicidad sobre ventas', valor_anterior: '13,5 % (2024)', valor_actual: '13,3 % (2025); +15 % en dólares en el 2T26', variacion: 'Sube en 2026', comentario: '[A1, A12]' },
      { kpi: 'Margen bruto (base)', valor_anterior: '60,6 % (2024)', valor_actual: '60,1 % (2025); 61,0 % (1S26)', variacion: '−50 pb y +60 pb', comentario: 'Materias primas −420 pb en 2025, ahorro +260 pb [A1, A6]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) notas de resultados trimestrales: no publican EBITDA; 2) 10-Q: amortización solo acumulada; 3) derivarlo mezclaría bases', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) nota 6 del 10-K 2025: solo vencimientos; 2) 10-Q 2T26: no la da; 3) cálculo con 4.495 M sin desglose después de 2030: no fiable', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: competencia, cuotas en pasta y cepillos, mercados emergentes (≈45 % de ventas), marca blanca y canales', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-02-23', url: `${EDGAR}/000002166526000006/cl-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q 2T26: perspectivas (debilidad de las categorías en el 2S26, paso a marca blanca, IA y comercio social)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000002166526000042/cl-20260630.htm` },
  { id: 3, titulo: 'Oral Care Market: 37.210 M USD en 2025, 53.290 M en 2030 (TCAC 6,4 %) (MarketsandMarkets, nota de prensa)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025', url: 'https://norfolkdailynews.com/online_features/press_releases/global-oral-care-market-projected-to-hit-53-29-billion-by-2030/article_e9395475-8610-5f41-9073-16c50472e994.html' },
  { id: 4, titulo: 'Oral Care Market: 34.800 M USD en 2025, 51.590 M en 2034 (TCAC 4,6 %) (Fortune Business Insights, reproducido)', editor: 'Fortune Business Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://hackmd.io/@anvitoshniwal09/ryUsaQOLMg' },
  { id: 5, titulo: 'Global pet food market projected to reach 247.700 M USD by 2035 (132.400 M en 2025, TCAC 6,5 %; Future Market Insights)', editor: 'Pet Food Institute', tipo: 'Sectorial', fecha: '2025', url: 'https://members.petfoodinstitute.org/news/721188/Global-pet-food-market-projected-to-reach-247.7B-by-2035.htm' },
  { id: 6, titulo: 'Pet Food Market: 132.920 M USD en 2025, 193.650 M en 2032 (TCAC 5,5 %; Fortune Business Insights, reproducido)', editor: 'Fortune Business Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://jhoonsmith2468.substack.com/p/pet-food-market-size-share-future' },
  { id: 7, titulo: 'Ingresos y margen operativo de los últimos 12 meses de P&G, Unilever, Haleon, Kenvue, Church & Dwight, Kimberly-Clark y Beiersdorf (series fundamentales)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com' },
  { id: 8, titulo: 'Colgate-Palmolive seeks to divest some personal care brands, sources say (Reuters, 11-sep-2026)', editor: 'ESM Magazine / Reuters', tipo: 'Prensa', fecha: '2026-09-11', url: 'https://www.esmmagazine.com/a-brands/colgate-palmolive-seeks-to-divest-some-personal-care-brands-sources-say-321327' },
  { id: 9, titulo: 'Form 10-K 2023: segmentos 2021-2023 y margen de Hill\'s', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2024-02-15', url: `${EDGAR}/000002166524000003/cl-20231231.htm` },
];
const comp = (n) => C.find((c) => c.nombre === n);
const cr = (n, pais, ticker, comentario) => { const c = comp(n); return { nombre: n, pais, ticker, ingresos: c.ventas_ltm, cuota_pct: null, margen_ebit_pct: c.margen_ebit_pct, comentario }; };
const Bn = {
  _estado: 'completa',
  sector: {
    definicion: null,
    tamano: 'Cuidado bucal: ≈34.800-37.200 M USD en 2025 [B3, B4]; comida para mascotas: ≈132.400-132.900 M USD en 2025 [B5, B6]',
    unidad_serie: 'millones de USD (cuidado bucal, MarketsandMarkets)',
    serie: [{ anio: '2025', tamano: 37210 }, { anio: '2030e', tamano: 53290 }],
    tcac_historico_pct: null, tcac_previsto_pct: 5.5, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Precio en mercados emergentes con inflación', efecto: '+', horizonte: 'Cíclico', evidencia: 'Precio +10 % en 2023 y +2,1 % en 2025; el orgánico de Latinoamérica sigue en +5,3 % en el 2T26 [B1, B2]' },
      { driver: 'Penetración y premiumización en emergentes (≈45 % de las ventas)', efecto: '+', horizonte: 'Estructural', evidencia: 'Asia-Pacífico +5,2 % orgánico y volumen +4,1 % en el 2T26 (India, China, Filipinas) [B2]' },
      { driver: 'Humanización de las mascotas y nutrición veterinaria', efecto: '+', horizonte: 'Estructural', evidencia: 'Hill\'s pasa de 2.525 M en 2019 a 4.613 M en 2025 (+10,6 % anual) [B1, B9]' },
      { driver: 'Paso a marca blanca y a formatos baratos', efecto: '−', horizonte: 'Cíclico', evidencia: 'La empresa espera que los consumidores pasen a marca blanca en el 2S26; Norteamérica −3,9 % de volumen en el 2T26 [B2]' },
      { driver: 'Coste de materias primas (petróleo, resinas, grasas)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Materias primas restan 420 pb al margen bruto en 2025 y 290 pb en el 1S26 [B1, B2]' },
      { driver: 'Divisas de emergentes (Argentina, Nigeria, Turquía)', efecto: '−', horizonte: 'Estructural', evidencia: 'Las ventas en dólares crecen 3,3 % al año en 2016-2025 frente a un orgánico mayor; divisa −5,2 p. en bucal, personal y hogar en 2024 [A1, B1]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Oligopolio con P&G, Haleon, Unilever y Kenvue en bucal; Mars y Nestlé Purina en mascotas. Competencia sobre todo en publicidad y promoción (13,3 % de las ventas) [B1]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Grandes distribuidores con datos propios y marca blanca; el 10-Q habla de mayor dependencia de minoristas clave [B2]' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas básicas con muchos proveedores; el riesgo es de precio, no de suministro [B1]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Marcas digitales y venta directa entran por comercio social, pero la distribución mundial y la recomendación de dentistas y veterinarios frenan la escala [B2]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'Lavarse los dientes y alimentar a la mascota no tienen sustituto; el sustituto es la marca blanca, ya contada en rivalidad [B1]' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: null },
    regulacion: null, tendencias: null, confianza: 'Media',
  },
  competencia: {
    cuota_pct: 41.3, posicion: '1.º mundial en pasta de dientes (41,3 %) y en cepillos manuales (32,4 %); Hill\'s, uno de los líderes en nutrición veterinaria para mascotas (cuota no publicada)',
    competidores: [
      cr('Procter & Gamble', 'EE. UU.', 'PG', 'Crest y Oral-B; mayor escala en EE. UU. y en cepillos eléctricos; ejercicio a junio'),
      cr('Unilever', 'Reino Unido', 'ULVR', 'Signal, Pepsodent y Close-up en emergentes; jabones y desodorantes (Dove, Rexona) frente a Palmolive y Speed Stick'),
      cr('Haleon', 'Reino Unido', 'HLN', 'Sensodyne y parodontax: lidera la pasta terapéutica y gana cuota en el segmento premium'),
      cr('Kenvue', 'EE. UU.', 'KVUE', 'Listerine en enjuague; en proceso de compra por Kimberly-Clark'),
      cr('Church & Dwight', 'EE. UU.', 'CHD', 'Arm & Hammer (pasta y arena para gatos), Waterpik y TheraBreath'),
      { nombre: 'Mars Petcare', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Royal Canin compite de frente con Hill\'s en dietas veterinarias; no cotiza' },
      { nombre: 'Nestlé Purina PetCare', pais: 'Suiza', ticker: 'NESN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Pro Plan Veterinary Diets; líder mundial en comida para mascotas; división de Nestlé' },
    ],
    foso: { veredicto: 'Amplio', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a productos de consumo' },
      { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Bajos en bucal; más altos en Hill\'s de prescripción, donde el veterinario fija la dieta [B1]' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Colgate es la marca más presente en hogares del mundo; 41 % de cuota en pasta sostenida durante décadas y margen bruto del 60 % [B1]' },
      { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Programas de ahorro que aportan ≈260 pb de margen bruto al año [A1]' },
      { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Fábricas y distribución en más de 200 países; en muchos emergentes es el único con red hasta la tienda pequeña [B1]' },
    ] },
    amenazas: null, confianza: 'Media',
  },
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null, confianza: 'Alta' },
  historia: {
    resumen: null,
    hitos: [
      { anio: '1806', hito: 'William Colgate funda en Nueva York un negocio de jabones y velas' },
      { anio: '1873', hito: 'Primera pasta de dientes Colgate, en tarro' },
      { anio: '1928', hito: 'Fusión con Palmolive-Peet: nace Colgate-Palmolive' },
      { anio: '1976', hito: 'Compra de Hill\'s Pet Products, hoy su segmento de más crecimiento' },
      { anio: '2006', hito: 'Compra de Tom\'s of Maine (cuidado bucal natural)' },
      { anio: '2019', hito: 'Compra de Filorga, PCA Skin y EltaMD: entrada en dermocosmética; Noel Wallace, primer ejecutivo' },
      { anio: '2021-2025', hito: 'Deterioros de 2.211 M en skin health (sobre todo Filorga) [A1, A2]' },
      { anio: '2022', hito: 'Compra de tres plantas de comida húmeda para Hill\'s (700 M)' },
      { anio: '2025', hito: 'Estrategia 2030, Strategic Growth and Productivity Program y compra de Prime100' },
      { anio: '2026', hito: 'Nueva división EMEA; estudia vender Softsoap, Irish Spring y Speed Stick [B8]' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], materialidad: null, controversias: null, confianza: 'Media' },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy: no las publican; 2) informe de sostenibilidad: no descargado por tiempo; 3) agencias (MSCI, Sustainalytics) con acceso de pago', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) 10-K: solo la cuota propia; 2) estudios de mercado: detrás de pago; 3) suma de cuotas de competidores: no publicadas', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, comisiones, remuneración 2025, ratio de 276 veces, accionistas', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-03-25', url: `${EDGAR}/000130817926000136/cl015164-def14a.htm` },
  { id: 2, titulo: '8-K de 13-may-2026: resultados de la junta de 8-may-2026', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-05-13', url: `${EDGAR}/000002166526000025/cl-20260508.htm` },
  { id: 3, titulo: '8-K de 12-mar-2026: entrada de C. Boerner en el consejo; S. Cahillane no se presenta a la reelección', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-03-12', url: `${EDGAR}/000002166526000008/cl-20260312.htm` },
  { id: 4, titulo: '8-K de 8-abr-2026: relevo de la directora jurídica', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-04-09', url: `${EDGAR}/000002166526000015/cl-20260408.htm` },
  { id: 5, titulo: 'Form 4 de consejeros y directivos de Colgate-Palmolive, 14-oct-2025 a 14-oct-2026 (64 presentaciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000021665&type=4' },
  { id: 6, titulo: 'Form 10-K 2025: directivos (Information about our Executive Officers)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-02-23', url: `${EDGAR}/000002166526000006/cl-20251231.htm` },
  { id: 7, titulo: 'Nota de resultados 4T25 y 2T26 (guía anual y su cumplimiento)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000002166526000041/q22026pressreleasetables.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const F4 = lee('form4.json');
const ventas = F4.operaciones.filter((o) => o.codigo === 'S').sort((a, b) => b.importe - a.importe).slice(0, 8)
  .map((o) => ({ fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, operacion: 'Venta', acciones: o.acciones, importe: Math.round(o.importe / 1e4) / 100 }));
const Cn = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Noel Wallace', cargo: 'Presidente y consejero delegado', desde: '2019', participacion_pct: null, trayectoria: 'En la empresa desde 1987; primer ejecutivo desde 2019 y presidente desde 2020. Con él el BPA base pasó de 2,83 (2019) a 3,69 USD (2025), pero firmó la compra de Filorga, hoy deteriorada casi entera [C6, A1].' },
      { nombre: 'Stanley J. Sutula III', cargo: 'Director financiero', desde: '2020', participacion_pct: null, trayectoria: 'Antes director financiero de Pitney Bowes y directivo financiero de IBM. Responsable del programa de productividad y de la estructura de deuda (papel comercial y bonos en euros) [C6].' },
      { nombre: 'Panagiotis Tsourapas', cargo: 'Director de operaciones (Europa, Asia-Pacífico, África/Eurasia, skin health)', desde: '2019', participacion_pct: null, trayectoria: 'Lleva la nueva EMEA, donde está el negocio de skin health que acumuló los deterioros [C6].' },
      { nombre: 'Shane Grant', cargo: 'Director de operaciones (Américas)', desde: '2025', participacion_pct: null, trayectoria: 'Fichado en junio de 2025 desde fuera; lleva Norteamérica, donde el volumen cae (−3,9 % en el 2T26) [C1, C6].' },
      { nombre: 'Lorrie M. Norrington', cargo: 'Consejera coordinadora independiente', desde: '2015', participacion_pct: null, trayectoria: 'Exdirectiva de eBay y General Electric [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Orgánico 2-4 % y BPA base con crecimiento de un dígito bajo a medio (feb-2025)', real: 'Orgánico +1,4 %; BPA base +3 % (3,69)', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Orgánico 3-5 % y BPA base de un dígito medio-alto', real: 'BPA base +11 % (3,60); orgánico por encima del rango', cumplida: 'Sí' },
      { anio: '2023', guia: 'Orgánico 3-5 % y BPA base de un dígito medio', real: 'Orgánico +8,0 %; BPA base +9 % (3,23)', cumplida: 'Sí' },
      { anio: '2026 (en curso)', guia: 'Ventas +2-6 %, orgánico 1-4 %, BPA base de un dígito medio (sube en julio)', real: '1S26: ventas +6,6 %, orgánico +2,6 %, BPA base +8 %', cumplida: 'Parcial' },
    ],
    comentario: null, confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Noel Wallace', 'Presidente y consejero delegado', 'Ejecutivo', '2019', 'Ninguna'),
      cons('Lorrie M. Norrington', 'Consejera coordinadora', 'Independiente', '2015', 'Auditoría, Nombramientos (NGCR)'),
      cons('John P. Bilbrey', 'Consejero', 'Independiente', '2015', 'Finanzas, Personal y Organización (presidente)'),
      cons('Christopher S. Boerner', 'Consejero', 'Independiente', '2026', 'Ninguna'),
      cons('John T. Cahill', 'Consejero', 'Independiente', '2005', 'Auditoría (presidente), Finanzas'),
      cons('Lisa M. Edwards', 'Consejera', 'Independiente', '2019', 'Auditoría, Finanzas'),
      cons('C. Martin Harris', 'Consejero', 'Independiente', '2016', 'Nombramientos (presidente), Personal y Organización'),
      cons('Martina Hund-Mejean', 'Consejera', 'Independiente', '2020', 'Auditoría, Finanzas (presidenta)'),
      cons('Kimberly A. Nelson', 'Consejera', 'Independiente', '2021', 'Nombramientos, Personal y Organización'),
      cons('Brian O. Newman', 'Consejero', 'Independiente', '2024', 'Auditoría, Personal y Organización'),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 92.7, voto_remuneracion_contra_pct: 6.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 16.48, fijo: 1.5, variable_corto: 2.46, variable_largo: 11.58, ratio_salario_medio: 276 },
    remuneracion: null,
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.26, tipo: 'Institucional (13G/A)', variacion: 'Sin cambio relevante' },
      { nombre: 'BlackRock', pct: 8.18, tipo: 'Institucional (13G/A)', variacion: 'Sin cambio relevante' },
      { nombre: 'State Street', pct: 5.95, tipo: 'Institucional (13G/A)', variacion: 'Sin cambio relevante' },
      { nombre: 'Autocartera', pct: 45.6, tipo: 'Acciones propias (668,5 M de 1.465,7 M emitidas)', variacion: '+≈6 M acciones recompradas en el 1S26' },
    ],
    insiders: ventas,
    control_y_defensas: null,
    alertas: [
      'Presidente y primer ejecutivo en la misma persona; la propuesta de separar los cargos obtuvo un 28,7 % de los votos emitidos en la junta de 2026 [C2].',
      'Ventas de directivos por 57,1 M USD en 12 meses sin ninguna compra; 29,7 M del primer ejecutivo en agosto de 2026, ninguna con plan 10b5-1 declarado [C5].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'participacion_pct', tipo: 'Complemento', intentos: '1) tabla de participaciones del proxy: en acciones, sin porcentaje legible en el texto extraído; 2) Form 4: saldo tras cada operación, no total; 3) estimación: todos por debajo del 0,1 %', decision: 'Omitido' },
  ],
};
guarda('C', Cn);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de CL, ^GSPC y XLP hasta 14-oct-2026 (precio, rango, beta, volatilidad, cierres anuales)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CL/history' },
  { id: 2, titulo: 'Consenso de Colgate-Palmolive (earningsTrend, financialData, recommendationTrend, upgradeDowngradeHistory)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CL/analysis' },
  { id: 3, titulo: 'Capitalización, series de cuentas de 12 meses y consenso de BPA de los comparables (P&G, Unilever, Haleon, Church & Dwight, Kimberly-Clark, Beiersdorf, Reckitt, Henkel, Clorox, L\'Oréal, Kenvue)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com' },
  { id: 4, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Betas by Sector (US), enero de 2026: Household Products, beta desapalancada corregida por caja 0,74', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
  { id: 7, titulo: 'Kimberly-Clark to Acquire Kenvue (ex. 99.1): valor empresa 48.700 M USD, 14,3 veces el EBITDA ajustado de 12 meses', editor: 'Kenvue / Kimberly-Clark (SEC)', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.sec.gov/Archives/edgar/data/1944048/000110465925105218/tm2529895d1_ex99-1.htm' },
  { id: 8, titulo: 'Church & Dwight to Acquire the Touchland Brand for $700 million Plus Earn-out (ventas de 12 meses ≈130 M USD)', editor: 'Church & Dwight (Business Wire)', tipo: 'Primaria', fecha: '2025-05-12', url: 'https://www.businesswire.com/news/home/20250512684279/en/Church-Dwight-to-Acquire-the-Touchland-Brand-for-%24700-million-Plus-Earn-out' },
  { id: 9, titulo: 'Touchland sells to Church & Dwight for $700M (≈5,4 veces ventas y 12,7 veces EBITDA de 55 M)', editor: 'Beauty Independent', tipo: 'Prensa', fecha: '2025-05-13', url: 'https://www.beautyindependent.com/touchland-brand-behind-status-symbol-hand-sanitizers-sells-church-dwight-700m/' },
  { id: 10, titulo: 'Colgate 10-Q 3T19 (Filorga: 1.712 M USD de contraprestación) y conferencia del 2T19 (ventas de Filorga ≈250 M USD)', editor: 'Colgate-Palmolive Company (SEC) / The Motley Fool', tipo: 'Primaria', fecha: '2019-10-25', url: 'https://www.sec.gov/Archives/edgar/data/21665/000002166519000022/cl-9302019x10q.htm' },
  { id: 11, titulo: 'Form 10-Q 2T26 (acciones en circulación 797,2 M, diluidas 801,8 M, deuda 7.857 M, caja 1.370 M)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000002166526000042/cl-20260630.htm` },
  { id: 12, titulo: 'Form 10-K 2025, nota de pensiones (déficit de 1.283 M) y participadas (82 M)', editor: 'Colgate-Palmolive Company (SEC)', tipo: 'Primaria', fecha: '2026-02-23', url: `${EDGAR}/000002166526000006/cl-20251231.htm` },
  { id: 13, titulo: 'Colgate Palmolive webcasts 2025 third quarter earnings conference call (31-oct-2025): calendario habitual de resultados', editor: 'Business Wire', tipo: 'Primaria', fecha: '2025-10-13', url: 'https://www.businesswire.com/news/home/20251013437995/en/' },
];
// Comparables: PER de los próximos 12 meses = precio ÷ (BPA del ejercicio en curso × meses que quedan + siguiente × el resto) / 12, en la divisa de las cuentas.
const mesesRestantes = (fin) => { const f = new Date(fin), c = new Date('2026-10-14'); return Math.max(0, (f - c) / (30.44 * 86400000)); };
const ntm = (c, campo) => { const [a, b] = c.trend; const m = Math.min(12, mesesRestantes(a.end)); return (a[campo] * m + b[campo] * (12 - m)) / 12; };
const precioCuentas = (c) => { const p = c.divisa === 'GBp' ? c.precio / 100 : c.precio; const fxq = c.divisa === 'GBp' || c.divisa === 'GBP' ? 1.3190523386001587 : c.divisa === 'EUR' ? 1.1156978607177734 : 1; return p * fxq / c.fxc; };
const fila = (c) => {
  const per = precioCuentas(c) / ntm(c, 'eps');
  const crec = 100 * (ntm(c, 'rev') / 1e6 / (c.ventas_ltm / c.fxc) - 1);
  return { nombre: c.nombre, ticker: c.ticker, pais: c.pais, capitalizacion: c.capitalizacion, ev_ventas: c.ev_ventas, ev_ebitda_ltm: c.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: +per.toFixed(1), crecimiento_pct: +crec.toFixed(1), margen_ebitda_pct: c.margen_ebitda_pct, roic_pct: c.roic_pct, dn_ebitda: c.dn_ebitda, fcf_yield_pct: c.fcf_yield_pct };
};
const usados = ['Procter & Gamble', 'Unilever', 'Haleon', 'Church & Dwight', 'Kimberly-Clark', 'Beiersdorf', 'Reckitt', 'Henkel', 'Clorox', "L'Oréal"];
const empresas = usados.map((n) => fila(comp(n)));
const cl = comp('Colgate-Palmolive');
const Dn = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Colgate-Palmolive Company', nombre_corto: 'Colgate', ticker: 'CL', isin: 'US1941621039', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo básico', industria: 'Productos para el hogar y personales', sede: 'Nueva York', fundacion: '1806', empleados: 33600, web: 'www.colgatepalmolive.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 799.6, capitalizacion_publicada: cl.capitalizacion, free_float_pct: 99.8,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses) [D1]`, proximos_resultados: '2026-10-30',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(cl.trend[0].rev / 1e6), ebitda: null, ebit: null, bpa: +cl.trend[0].eps.toFixed(2), dpa: 2.10, fuente: `Yahoo Finance, ${cl.trend[0].epsN} analistas [D2]` },
      { periodo: '2027e', ingresos: Math.round(cl.trend[1].rev / 1e6), ebitda: null, ebit: null, bpa: +cl.trend[1].eps.toFixed(2), dpa: null, fuente: `Yahoo Finance, ${cl.trend[1].epsN} analistas [D2]` },
    ],
    recomendaciones: { n_analistas: 21, comprar: 13, mantener: 8, vender: 0, po_medio: 98.25, po_min: 87, po_max: 110 },
    revisiones: null, base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: null, confianza: 'Media',
  },
  bolsa: { ...B.bolsa, posicion_corta_pct: 3.4, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => anios.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null, confianza: 'Alta',
  },
  comparables: { criterio: null, empresas, comentario: null, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Kenvue (Listerine, Neutrogena, Tylenol)', comprador: 'Kimberly-Clark', ev: 48700, ev_ventas: 3.2, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: '14,3 veces el EBITDA ajustado de 12 meses; 8,8 veces con 2.100 M de sinergias. EV/ventas con ventas de 2025 de ≈15.100 M (estimación propia) [D7, D3]' },
      { fecha: '2025-05', objetivo: 'Touchland (geles hidroalcohólicos)', comprador: 'Church & Dwight', ev: 700, ev_ventas: 5.4, ev_ebitda: 12.7, prima_pct: null, excluir: false, comentario: '700 M más hasta 180 M variables; marca de crecimiento alto, por eso el múltiplo de ventas [D8, D9]' },
      { fecha: '2019-07', objetivo: 'Filorga (cosmética facial premium)', comprador: 'Colgate-Palmolive', ev: 1712, ev_ventas: 6.8, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Pagada a 6,8 veces ventas de ≈250 M; deteriorada casi entera en 2021-2025: ejemplo de sobreprecio, no de valor [D10, A1]' },
      { fecha: '2025-04', objetivo: 'Prime100 (comida fresca para mascotas)', comprador: 'Colgate-Palmolive', ev: 301, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '471 M AUD; múltiplos no publicados [A6]' },
    ],
    comentario: null, confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones 2028e y EBITDA', tipo: 'Complemento', intentos: '1) Yahoo: solo dos ejercicios y sin EBITDA; 2) MarketScreener: no consultado por tiempo; 3) StockAnalysis: no consultado', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'tercera operación con EV/EBITDA', tipo: 'Complemento', intentos: '1) Prime100 y plantas de Red Collar: sin múltiplo publicado; 2) Filorga: solo ventas; 3) Kenvue y Touchland sí: dos con EV/EBITDA', decision: 'Omitido' },
  ],
};
guarda('D', Dn);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha, CL: análisis y noticias de mayo a octubre de 2026 (RSS combinado)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/CL.xml' },
  { id: 2, titulo: 'Stocktwits, flujo de mensajes de $CL (septiembre-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/CL.json' },
  { id: 3, titulo: 'Colgate-Palmolive allegedly explores sale of personal care brands (y comentarios de la prensa sectorial)', editor: 'Cosmetics Business', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://cosmeticsbusiness.com/colgate-palmolive-allegedly-explores-sale-personal-care-brands' },
];
const En = { _estado: 'completa', sentimiento: null, fuentes: fE, huecos: [] };
guarda('E', En);
console.log('Notas A-E escritas. Comparables:', empresas.map((e) => `${e.nombre} ${e.per_ntm}x ${e.crecimiento_pct}%`).join(' · '));
