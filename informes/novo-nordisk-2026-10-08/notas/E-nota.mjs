// Subagente E: construye notas/E.json (transacciones, negocio, historia, esg) con sus fuentes y huecos.
// Tipos de cambio: BCE, referencia del día del anuncio (USD/DKK = EUR/DKK ÷ EUR/USD).
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const salida = join(aqui, 'E.json');
const previo = existsSync(salida) ? JSON.parse(readFileSync(salida, 'utf8')) : {};

const fx = { // USD/DKK, BCE
  '2023-01-09': 6.9534, '2023-03-13': 6.9535, '2023-08-10': 6.7621, '2023-12-04': 6.8609,
  '2024-02-05': 6.9384, '2025-06-02': 6.5335, '2025-06-17': 6.4475, '2025-10-09': 6.4308, '2025-11-07': 6.4585,
};
const dkk = (usd, d) => Math.round(usd * fx[d]);
const r1 = x => Math.round(x * 10) / 10;
const r2 = x => Math.round(x * 100) / 100;

// Catalent: EV 16.500 M USD [1]; ventas LTM a dic-2023 = 4.263 (FY jun-2023 [3]) + 2.014 (1S FY24) − 2.171 (1S FY23) [2] = 4.106; EBITDA ajustado LTM 463 [2].
const ctltVentas = 4263 + 2014 - 2171;
// Blueprint: EV estimado = 9.100 de capital [11] − 899,7 de caja e inversiones + 343,9 de deuda garantizada a 31-mar-2025 [12]; ventas 2024 508,8 [12].
const bpmcEv = 9100 - (122.2 + 454.0 + 323.5) + 343.9;

const transacciones = {
  operaciones: [
    { fecha: '2024-02', objetivo: 'Catalent (CDMO, EE. UU.)', comprador: 'Novo Holdings', ev: dkk(16500, '2024-02-05'), ev_ventas: r2(16500 / ctltVentas), ev_ebitda: r1(16500 / 463), prima_pct: 16.5, excluir: false,
      comentario: `Valor empresa publicado de 16.500 M USD a 63,50 USD por acción [1]. Múltiplos sobre los doce meses a diciembre de 2023: ventas de ${ctltVentas.toLocaleString('es-ES')} M USD [2, 3] y EBITDA ajustado de 463 M USD [2], deprimido por el fin de la demanda de la covid (era 1.167 M un año antes [2]): sobre aquel EBITDA el múltiplo sería 14,1x. Prima del 16,5 % sobre el cierre previo y del 47,5 % sobre la media de 60 sesiones [1]. Es la operación de capacidad que sostiene el plan industrial de Novo.` },
    { fecha: '2024-02', objetivo: 'Tres plantas de llenado de Catalent (Anagni, Bruselas, Bloomington)', comprador: 'Novo Nordisk', ev: 82146, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true,
      comentario: 'Pago inicial acordado de 11.000 M USD [4]; al cierre, el 18-dic-2024, 11.723 M USD (82.146 M DKK con coberturas), de los que 41.102 M DKK fueron know-how y 24.034 M DKK inmovilizado material [5]. Compra de activos a la parte vinculada (Novo Holdings), sin cuentas propias: no sirve como múltiplo de control, solo como coste de la capacidad.' },
    { fecha: '2025-11', objetivo: 'Metsera (obesidad, fase clínica)', comprador: 'Pfizer', ev: dkk(7000, '2025-11-07'), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false,
      comentario: 'Acuerdo inicial del 22-sep-2025 a 47,50 USD por acción, valor empresa de 4.900 M USD más CVR de hasta 22,50 USD [6]. Tras la contraoferta no solicitada de Novo Nordisk, Pfizer subió el 7-nov-2025 a 65,60 USD en efectivo más CVR de hasta 20,65 USD (hasta 86,25 USD por acción) [7]; el consejo de Metsera rechazó la estructura de Novo por el riesgo de competencia tras una llamada de la FTC [7]. Cerrada el 13-nov-2025 con un valor empresa de unos 7.000 M USD [8]. Sin ventas: múltiplos no aplicables.' },
    { fecha: '2025-10', objetivo: 'Akero Therapeutics (MASH, fase 3)', comprador: 'Novo Nordisk', ev: dkk(4000, '2025-10-09'), ev_ventas: null, ev_ebitda: null, prima_pct: 19, excluir: false,
      comentario: '54 USD por acción en efectivo (4.700 M USD de capital) más CVR de 6 USD (500 M USD) si la FDA aprueba el efruxifermin en cirrosis por MASH antes del 30-jun-2031 [9, 10]. Novo cifró en unos 4.000 M USD el valor empresa esperado al cierre (el impacto en su flujo libre de 2025) [10]. Prima del 19 % sobre la media de 30 sesiones y del 42 % sobre el precio previo a los rumores [9]. Sin ventas.' },
    { fecha: '2025-06', objetivo: 'Blueprint Medicines (enfermedades raras e inmunología)', comprador: 'Sanofi', ev: dkk(bpmcEv, '2025-06-02'), ev_ventas: r1(bpmcEv / 508.8), ev_ebitda: null, prima_pct: 27, excluir: false,
      comentario: `129 USD por acción, valor del capital de 9.100 M USD más CVR (hasta 9.500 M USD) [11]. Valor empresa: estimación propia de ${Math.round(bpmcEv).toLocaleString('es-ES')} M USD (capital menos 899,7 M de caja e inversiones y más 343,9 M de deuda garantizada a 31-mar-2025, sin el pasivo por regalías vendidas) [12]; EV/ventas sobre los 508,8 M USD de ingresos de 2024 [12] (Ayvakit, 479 M USD, crecía más de un 60 % [11]). EBITDA negativo. Farmacéutica comercial, no metabólica: referencia del precio de un activo con ventas en fuerte crecimiento.` },
    { fecha: '2025-06', objetivo: 'Verve Therapeutics (edición genética cardiovascular)', comprador: 'Eli Lilly', ev: dkk(1000, '2025-06-17'), ev_ventas: null, ev_ebitda: null, prima_pct: 113, excluir: false,
      comentario: '10,50 USD por acción en efectivo (unos 1.000 M USD de capital) más CVR de hasta 3 USD (hasta 1.300 M USD) [13]. La cifra es valor del capital: el valor empresa no se publicó (Verve tenía 497 M USD de caja e inversiones a corto a 31-mar-2025 según su 10-Q). Prima del 113 % sobre la media de 30 sesiones [13]. Sin ventas.' },
    { fecha: '2023-12', objetivo: 'Carmot Therapeutics (incretinas para obesidad, no cotizada)', comprador: 'Roche', ev: dkk(2700, '2023-12-04'), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false,
      comentario: 'Precio de 2.700 M USD en efectivo al cierre más hitos de hasta 400 M USD [14]. Sociedad no cotizada: precio de compra, no valor empresa publicado. Sin ventas.' },
    { fecha: '2023-08', objetivo: 'Inversago Pharma (CB1 para obesidad, no cotizada)', comprador: 'Novo Nordisk', ev: dkk(1075, '2023-08-10'), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true,
      comentario: 'Hasta 1.075 M USD si se cumplen hitos de desarrollo y comerciales [15]; el pago inicial no se publicó. Es el máximo, no el precio pagado: excluida del cálculo.' },
    { fecha: '2023-03', objetivo: 'Provention Bio (diabetes tipo 1, Tzield)', comprador: 'Sanofi', ev: dkk(2900, '2023-03-13'), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false,
      comentario: '25 USD por acción, valor del capital de unos 2.900 M USD [16]; el valor empresa no se publicó. Tzield recién aprobado (nov-2022), sin ventas significativas: múltiplos no aplicables.' },
    { fecha: '2023-01', objetivo: 'Amryt Pharma (enfermedades metabólicas raras)', comprador: 'Chiesi', ev: dkk(1250, '2023-01-09'), ev_ventas: null, ev_ebitda: null, prima_pct: 107, excluir: false,
      comentario: '14,50 USD por ADS; valor de la operación al cierre de unos 1.250 M USD más CVR de unos 225 M USD (hasta 1.480 M USD) [17]. Amryt vendía Myalept y Juxtapid (lipodistrofia e hipercolesterolemia familiar), pero sus ingresos de 2022 no figuran en el comunicado ni en la SEC (no llegó a presentar el 20-F de 2022): múltiplo no publicado.' },
  ],
  comentario: 'En obesidad y metabolismo se compran biotecnológicas sin ventas: se pagan opciones sobre la cartera clínica (Metsera, 7.000 M USD tras pujar con Novo; Akero, 4.000 M USD) y no hay múltiplos. Solo dos los tienen: Catalent (4,0x ventas; 35,6x un EBITDA deprimido, 14,1x el normalizado) y Blueprint (16,8x ventas, estimación propia). Las primas van del 16 % al 113 %. Importes en DKK al cambio del BCE del día del anuncio [18]. **Novo Nordisk no puede ser objetivo**: la Fundación, a través de Novo Holdings, tiene el 77,3 % de los votos con el 28,1 % del capital (estimación propia con el capital del informe anual [5]) y su tamaño excluye a casi cualquier comprador. Estas operaciones sirven para juzgar su disciplina compradora, no para fijar un precio de control: ponderarlas en la síntesis no tiene sentido.',
  confianza: 'Media',
};

const fuentes = [
  { id: 1, titulo: 'Novo Holdings to Acquire Catalent (comunicado, 8-K ex. 99.1)', editor: 'Catalent / Novo Holdings', tipo: 'Primaria', fecha: '2024-02-05', url: 'https://www.sec.gov/Archives/edgar/data/1596783/000119312524023426/d80880dex991.htm' },
  { id: 2, titulo: 'Catalent: resultados del 2T del ejercicio 2024 (8-K ex. 99.1)', editor: 'Catalent', tipo: 'Primaria', fecha: '2024-02-09', url: 'https://www.sec.gov/Archives/edgar/data/1596783/000159678324000014/earningsreleaseex991-fy24x.htm' },
  { id: 3, titulo: 'Catalent: formulario 10-K del ejercicio a 30-jun-2023 (ingresos 4.263 M USD, XBRL)', editor: 'Catalent / SEC', tipo: 'Primaria', fecha: '2023-12-08', url: 'https://www.sec.gov/Archives/edgar/data/1596783/000159678323000185/' },
  { id: 4, titulo: 'Novo Nordisk to acquire three fill-finish sites from Novo Holdings (6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2024-02-05', url: 'https://www.sec.gov/Archives/edgar/data/353278/000117184324000577/f6k_020524.htm' },
  { id: 5, titulo: 'Novo Nordisk: Annual Report 2025 (nota 5.3, adquisición de negocios)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-02-04', url: 'https://www.sec.gov/Archives/edgar/data/353278/000035327826000012/nvo-20251231_d2.htm' },
  { id: 6, titulo: 'Pfizer to Acquire Metsera (comunicado, 8-K ex. 99.1)', editor: 'Pfizer / Metsera', tipo: 'Primaria', fecha: '2025-09-22', url: 'https://www.sec.gov/Archives/edgar/data/2040807/000119312525210030/d921605dex991.htm' },
  { id: 7, titulo: 'Pfizer and Metsera Enter into Merger Agreement Amendment (8-K ex. 99.1)', editor: 'Metsera', tipo: 'Primaria', fecha: '2025-11-07', url: 'https://www.sec.gov/Archives/edgar/data/2040807/000119312525273292/d50740dex991.htm' },
  { id: 8, titulo: 'Pfizer: formulario 8-K de cierre de la compra de Metsera', editor: 'Pfizer', tipo: 'Primaria', fecha: '2025-11-13', url: 'https://www.sec.gov/Archives/edgar/data/78003/000007800325000159/pfe-20251113.htm' },
  { id: 9, titulo: 'Akero Therapeutics: acuerdo de compra por Novo Nordisk (8-K ex. 99.1)', editor: 'Akero Therapeutics', tipo: 'Primaria', fecha: '2025-10-09', url: 'https://www.sec.gov/Archives/edgar/data/1744659/000119312525235919/d42650dex991.htm' },
  { id: 10, titulo: 'Novo Nordisk to acquire Akero Therapeutics (6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2025-10-09', url: 'https://www.sec.gov/Archives/edgar/data/353278/000117184325006370/f6k_100925.htm' },
  { id: 11, titulo: 'Sanofi to acquire Blueprint Medicines (8-K ex. 99.1)', editor: 'Blueprint Medicines / Sanofi', tipo: 'Primaria', fecha: '2025-06-02', url: 'https://www.sec.gov/Archives/edgar/data/1597264/000110465925055143/tm2516831d1_ex99-1.htm' },
  { id: 12, titulo: 'Blueprint Medicines: 10-K 2024 y 10-Q del 1T25 (datos XBRL: ingresos, caja, deuda)', editor: 'Blueprint Medicines / SEC', tipo: 'Primaria', fecha: '2025-05-01', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001597264.json' },
  { id: 13, titulo: 'Lilly to acquire Verve Therapeutics (8-K ex. 99.1)', editor: 'Verve Therapeutics / Eli Lilly', tipo: 'Primaria', fecha: '2025-06-17', url: 'https://www.sec.gov/Archives/edgar/data/1840574/000119312525141748/d30505dex991.htm' },
  { id: 14, titulo: 'Roche to acquire Carmot Therapeutics (comunicado)', editor: 'Roche', tipo: 'Primaria', fecha: '2023-12-04', url: 'https://www.roche.com/media/releases/med-cor-2023-12-04' },
  { id: 15, titulo: 'Novo Nordisk: Interim report for the first six months of 2023 (Inversago)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2023-08-10', url: 'https://www.sec.gov/Archives/edgar/data/353278/000162828023028728/caq22023.htm' },
  { id: 16, titulo: 'Sanofi to acquire Provention Bio (8-K ex. 99.1)', editor: 'Provention Bio / Sanofi', tipo: 'Primaria', fecha: '2023-03-13', url: 'https://www.sec.gov/Archives/edgar/data/1695357/000149315223007347/ex99-1.htm' },
  { id: 17, titulo: 'Chiesi Farmaceutici to Acquire Amryt Pharma (6-K ex. 99.7)', editor: 'Amryt Pharma / Chiesi', tipo: 'Primaria', fecha: '2023-01-08', url: 'https://www.sec.gov/Archives/edgar/data/1783010/000114036123001045/brhc10046429_ex99-7.htm' },
  { id: 18, titulo: 'Tipos de cambio de referencia del euro (histórico)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip' },
];

const huecos = [
  { seccion: 'transacciones', campo: 'Múltiplos de las operaciones de obesidad y metabolismo', tipo: 'Complemento', intentos: '1) Comunicados y 8-K de cada operación (Metsera, Akero, Verve, Provention, Carmot, Inversago, Amryt): ninguno publica ventas ni EBITDA del objetivo; 2) XBRL de la SEC de las objetivo cotizadas: sin ingresos (fase clínica) salvo Amryt, que no presentó el 20-F de 2022; 3) cálculo propio: solo posible para Catalent y Blueprint', decision: 'Omitido (múltiplos null salvo Catalent y Blueprint)' },
];

const nota = { historia: previo.historia ?? null, negocio: previo.negocio ?? null, transacciones, esg: previo.esg ?? null, fuentes, huecos };
// Las secciones siguientes se añaden desde E-nota2.mjs (si existe).
const extra = join(aqui, 'E-nota2.mjs');
if (existsSync(extra)) { const m = await import('file:///' + extra.replace(/\\/g, '/')); m.completar(nota); }
writeFileSync(salida, JSON.stringify(nota, null, 2), 'utf8');
console.log('E.json:', Object.entries(nota).map(([k, v]) => k + ':' + (v === null ? 'null' : Array.isArray(v) ? v.length : 'ok')).join(' '));
for (const o of transacciones.operaciones) console.log(o.fecha, o.objetivo.slice(0, 30), o.ev, o.ev_ventas, o.ev_ebitda);
