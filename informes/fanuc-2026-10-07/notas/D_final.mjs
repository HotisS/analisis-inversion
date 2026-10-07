// Ensambla D.json completo (subagente D).
import fs from 'node:fs';
import { D } from './D_build.mjs';
import { empresas, USDJPY, EURJPY } from './D_comparables.mjs';
const b = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url)));
const F = D.fuentes; let n = F.length;
const add = (titulo, editor, tipo, fecha, url) => { F.push({ id: ++n, titulo, editor, tipo, fecha, url }); return n; };
const ms = {}, sa = {};
const MSU = {"6506.T":"YASKAWA-ELECTRIC-CORPORAT-6492333","6861.T":"KEYENCE-CORPORATION-6492212","6273.T":"SMC-CORPORATION-6492069","6268.T":"NABTESCO-CORPORATION-6496668","6324.T":"HARMONIC-DRIVE-SYSTEMS-IN-13655246","6503.T":"MITSUBISHI-ELECTRIC-CORPO-6491287","SIE.DE":"SIEMENS-AG-56358595","ROK":"ROCKWELL-AUTOMATION-INC-14277"};
const SAU = {"6506.T":"quote/tyo/6506","6861.T":"quote/tyo/6861","6273.T":"quote/tyo/6273","6268.T":"quote/tyo/6268","6324.T":"quote/tyo/6324","6503.T":"quote/tyo/6503","SIE.DE":"quote/etr/SIE","ROK":"stocks/rok"};
for (const e of empresas) {
  ms[e.ticker] = add(`${e.nombre}: datos financieros y estimaciones (Finances)`, 'MarketScreener', 'Datos de mercado', '2026-10-07', `https://www.marketscreener.com/quote/stock/${MSU[e.ticker]}/finances/`);
  sa[e.ticker] = add(`${e.nombre} (${e.ticker}) Statistics`, 'Stock Analysis', 'Datos de mercado', '2026-10-07', `https://stockanalysis.com/${SAU[e.ticker]}/statistics/`);
}
const saKey = add('Keyence (TYO:6861) Balance sheet, trimestral (20-jun-2026)', 'Stock Analysis', 'Datos de mercado', '2026-10-07', 'https://stockanalysis.com/quote/tyo/6861/financials/balance-sheet/?p=quarterly');
const saSmc = add('SMC (TYO:6273) Balance sheet, trimestral (30-jun-2026)', 'Stock Analysis', 'Datos de mercado', '2026-10-07', 'https://stockanalysis.com/quote/tyo/6273/financials/balance-sheet/?p=quarterly');
const yuho = add('Yuka Shoken Hokokusho, 57.º ejercicio (Annual Securities Report, abr-2025 a mar-2026): nota de balance n.º 2 (p. 62) y normas no aplicadas (p. 61)', 'FANUC Corporation (EDINET E01946)', 'Primaria', '2026-06', 'https://www.fanuc.co.jp/ja/ir/securitiesreport/pdf/securitiesreport57_202603.pdf');
const sb = add('Acquisition of ABB Ltd’s Robotics Business (nota de prensa)', 'SoftBank Group Corp.', 'Primaria', '2025-10-08', 'https://group.softbank/en/news/press/20251008');
const hil1 = add('Hillenbrand Announces Agreement to Be Acquired by Lone Star for $32.00 Per Share (Form 8-K, Ex. 99.1)', 'Hillenbrand, Inc. (SEC EDGAR)', 'Primaria', '2025-10-15', 'https://www.sec.gov/Archives/edgar/data/1417398/000119312525239558/d19460dex991.htm');
const hil2 = add('Hillenbrand Fiscal 2025 Fourth Quarter and Full Year Results (Form 8-K, Ex. 99.1)', 'Hillenbrand, Inc. (SEC EDGAR)', 'Primaria', '2025-11-19', 'https://www.sec.gov/Archives/edgar/data/1417398/000162828025053194/exhibit9912025930.htm');
const sie = add('Siemens to acquire Altair Engineering (nota de prensa)', 'Siemens AG', 'Primaria', '2024-10-30', 'https://assets.new.siemens.com/siemens/assets/api/uuid:b8927464-14ca-4a7c-a581-686169630351/HQCOPR202410307031EN.pdf');
const ecbh = add('Euro foreign exchange reference rates, histórico (eurofxref-hist), 30-oct-2024', 'Banco Central Europeo', 'Datos de mercado', '2024-10-30', 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip');
const emr = add('Emerson to Acquire NI (Form 8-K de National Instruments, Ex. 99.1)', 'National Instruments Corp. (SEC EDGAR)', 'Primaria', '2023-04-12', 'https://www.sec.gov/Archives/edgar/data/935494/000114036123017910/brhc20051360_ex99-1.htm');
const mak = add('Notice Regarding Withdrawal of Tender Offer for Shares of the Company', 'Makino Milling Machine Co., Ltd.', 'Primaria', '2025-05-09', 'https://ir.makino.co.jp/en/news/pdf/2025/20250509.pdf');
const kar = add('Fanuc (6954): posiciones cortas declaradas (karauri), a partir de los informes publicados por la JPX', 'karauri.net', 'Datos de mercado', '2026-10-01', 'https://karauri.net/6954/');
const dam = add('Country Default Spreads and Risk Premiums (actualización de enero de 2026)', 'Aswath Damodaran (NYU Stern)', 'Datos de mercado', '2026-01', 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html');

D.consenso = {
  guidance: 'Previsión de Fanuc para FY2026 (abr-2026 a mar-2027), revisada al alza con el primer trimestre el 31-jul-2026: ventas de 948.100 M JPY (antes 909.600 M; +4,2 %), beneficio de explotación de 218.000 M (antes 212.200 M; +2,7 %), beneficio ordinario de 271.200 M (antes 257.000 M; +5,5 %) y beneficio neto atribuido de 198.000 M (antes 184.900 M; +7,1 %), BPA de 212,18 JPY; supone 150 JPY/USD y 175 JPY/EUR de julio de 2026 a marzo de 2027 [1]. En estos documentos Fanuc no publica objetivos a medio plazo. El consenso va por delante de la guía: EBIT de 228.206 M frente a 218.000 M (+4,7 %) [4] y beneficio ordinario de 277.200 M frente a 271.200 M [9].',
  estimaciones: [
    { periodo: 'FY2026e', ingresos: 969483, ebitda: 276885, ebit: 228206, bpa: 220.8, dpa: 132.8, fuente: 'MarketScreener a 7-oct-2026, columna «2027» (ejercicio a mar-2027); 19 analistas en el consenso; no da el número por línea [4]' },
    { periodo: 'FY2027e', ingresos: 1035109, ebitda: 298566, ebit: 250176, bpa: 237.9, dpa: 144.5, fuente: 'MarketScreener a 7-oct-2026, columna «2028» (ejercicio a mar-2028) [4]' },
    { periodo: 'FY2028e', ingresos: 1092417, ebitda: 317961, ebit: 268778, bpa: 255.8, dpa: 156.8, fuente: 'MarketScreener a 7-oct-2026, columna «2029» (ejercicio a mar-2029) [4]' }
  ],
  recomendaciones: { n_analistas: 19, comprar: 8, mantener: 10, vender: 1, po_medio: 7278.89, po_min: 4600, po_max: 8700 },
  revisiones: 'Solo una fuente gratuita da estimaciones completas (MarketScreener [4]); Investing coincide en el precio objetivo (7.278,9 JPY; máx. 8.700, mín. 4.600) y da 8 comprar, 10 mantener y 1 vender [6]; Kabuyoho da un objetivo de 7.363 JPY [9]. No hay serie gratuita de revisiones de BPA o EBITDA a 3 y 12 meses. Movimientos visibles [5]: en noviembre de 2025 BofA y Deutsche Bank bajaron a neutral/mantener (objetivo 5.300 JPY); en mayo de 2026 Jefferies subió el objetivo a 7.000 JPY (mantener); en agosto de 2026 HSBC subió a comprar (7.600 JPY). Goldman Sachs está en vender con 4.600 JPY y Nomura en comprar con 8.500 JPY [6]. Fanuc subió la guía el 31-jul-2026 [1].',
  base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
  confianza: 'Media'
};

D.bolsa = { ...b.bolsa };
delete D.bolsa.tramo_drawdown;
D.bolsa.posicion_corta_pct = 0.51;
D.bolsa.comentario = `Hechos para el comentario: en un año la acción ha dado un 39,6 % (rentabilidad total) frente al 32,6 % del ETF TOPIX y el 19,6 % del ETF TOPIX-17 Maquinaria, pero en lo que va de 2026 solo un 3,2 % frente al 25,4 % del TOPIX [3]. Rango de 52 semanas de 4.400 a 8.880 JPY; el precio de 6.220 JPY (6-oct) está un 30 % por debajo del máximo [3]. A cinco y diez años va muy por detrás del índice (8,9 % y 7,7 % anual frente a 19,5 % y 14,6 %) [3]. Beta de 1,47 frente al ETF TOPIX (60 meses) y volatilidad de un año del 53,1 % [3]. Posiciones cortas declaradas (umbral 0,5 %): solo Morgan Stanley MUFG, con el 0,51 % el 1-oct-2026 [${kar}]. El 7-oct cerró a 6.164 JPY (−0,9 %) [9]. Los resultados del segundo trimestre de FY2026 están previstos para el 23-oct-2026 (fecha no confirmada aún en la web de Fanuc) [8, 9]; Fanuc, fundada en 1972 y con sede en Oshino-mura (Yamanashi), los publica en su web de inversores [10].`;
D.bolsa.confianza = 'Alta';

D.multiplos_historicos = {
  serie: b.cierres_ejercicio.map(c => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
  comentario: 'Precios de cierre del último día hábil de cada ejercicio (31 de marzo o anterior), de Yahoo Finance [3]; «FY2025» es el cierre del 31-mar-2026, según la etiqueta de Fanuc. No hay EV/EBITDA ni PER de los próximos 12 meses históricos gratuitos.',
  confianza: 'Media'
};

D.comparables = {
  criterio: `Hechos de método: capitalización y valor empresa de Stock Analysis al cierre del 7-oct-2026 (Rockwell, 6-oct) [${Object.values(sa).join(', ')}]; ventas, EBITDA y BPA de los últimos y próximos 12 meses del mismo proveedor, MarketScreener [${Object.values(ms).join(', ')}]. Conversión con el BCE del 6-oct-2026: 178,15 JPY/EUR y 158,09 JPY/USD (cruce con 1,1269 USD/EUR) [11]. LTM = último ejercicio cerrado (marzo de 2026 en las japonesas, febrero de 2026 en Yaskawa, 2025 en Nabtesco) y, en Siemens y Rockwell (ejercicio a septiembre), la estimación del ejercicio que acaba de cerrar (sep-2026, sin publicar). NTM = oct-2026 a sep-2027, ponderando los dos ejercicios estimados por meses (marzo: 6/12 y 6/12; Yaskawa: 5/12 y 7/12; Nabtesco: 3/12 y 9/12; Siemens y Rockwell: el ejercicio a sep-2027 entero). Crecimiento = NTM sobre LTM anualizado por los meses entre el fin de cada periodo (18; Yaskawa 19; Nabtesco 21; Siemens y Rockwell 12). Al valor empresa de Keyence se le restan 1.618.699 M de inversiones a largo plazo y al de SMC 77.140 M [${saKey}, ${saSmc}]; en el resto no se ajusta. ROIC y rentabilidad por FCF, de Stock Analysis; DN/EBITDA = deuda neta de Stock Analysis entre EBITDA LTM de MarketScreener. Rockwell: BPA ajustado de MarketScreener.`,
  empresas: empresas.map(({ _nota, ...e }) => e),
  comentario: null,
  confianza: 'Media'
};

const usd = x => Math.round(x * USDJPY);
D.transacciones = {
  operaciones: [
    { fecha: '2025-10', objetivo: 'ABB Robotics (robots industriales de ABB)', comprador: 'SoftBank Group', ev: usd(5375), ev_ventas: 2.36, ev_ebitda: 17.2, prima_pct: null, comentario: `Precio total de 5.375 M USD por el 100 %; ventas de 2.279 M USD y EBITDA de 313 M USD en 2024 (US GAAP, pro forma, sin auditar; con el EBITA operativo de 277 M USD, 19,4x) [${sb}]. Cierre previsto a mediados o finales de 2026.` },
    { fecha: '2025-10', objetivo: 'Hillenbrand (maquinaria de procesado y de inyección, Milacron)', comprador: 'Lone Star Funds', ev: usd(3800), ev_ventas: 1.42, ev_ebitda: 9.8, prima_pct: 37, comentario: `32,00 USD por acción, valor empresa ≈ 3.800 M USD; prima del 37 % sobre el cierre no afectado del 12-ago-2025 [${hil1}]. Múltiplos sobre ventas de 2.673,8 M USD y EBITDA ajustado de 388,0 M USD del ejercicio a sep-2025 [${hil2}].` },
    { fecha: '2024-10', objetivo: 'Altair Engineering (software de simulación)', comprador: 'Siemens', ev: usd(10000), ev_ventas: 15.4, ev_ebitda: null, prima_pct: 19, comentario: `113 USD por acción, valor empresa ≈ 10.000 M USD, prima del 19 % [${sie}]. La nota da unas ventas de ≈ 600 M EUR; el EV/ventas usa 1,0815 USD/EUR del BCE del 30-oct-2024 [${ecbh}]. Software, no equipos: múltiplo de otra naturaleza.` },
    { fecha: '2023-04', objetivo: 'National Instruments (NI, test y medida)', comprador: 'Emerson', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 49, comentario: `60 USD por acción, valor de las acciones de 8.200 M USD (no publica valor empresa ni EBITDA); ventas de 1.660 M USD en 2022; prima del 49 % sobre el cierre del 12-ene-2023 [${emr}].` },
    { fecha: '2025-04', objetivo: 'Makino Milling Machine (máquina herramienta)', comprador: 'Nidec (OPA hostil, retirada)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, comentario: `Nidec lanzó la OPA el 4-abr-2025 y la retiró el 9-may-2025, tras la emisión gratuita de derechos de suscripción que Makino aprobó como defensa [${mak}]. Precio y prima no verificados en documento original.` }
  ],
  comentario: null,
  confianza: 'Media'
};

D.dcf = { wacc: { tasa_libre_pct: 3.103, beta: 1.47, prima_mercado_pct: 5.14, prima_adicional_pct: null, coste_deuda_pct: null, tasa_impositiva_pct: null, peso_deuda_pct: null } };
D.dcf_notas_D = `Tasa libre: JGB a 10 años del 6-oct-2026, 3,103 % (MoF; el 7-oct aún no estaba) [12]. Beta: 1,47 frente al ETF TOPIX, 60 meses [3]; contraste: 0,94 a 5 años de Stock Analysis [7]. Prima de mercado: 5,14 % total para Japón de Damodaran (enero de 2026; prima país 0,91 % sobre la madura; calificación A1) [${dam}].`;

D.valoracion = {
  puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 762268, minoritarios: 17342, pensiones: 19536, asociadas: 167210, otros_ajustes: 0 },
  rab: null, pesos: null,
  comentario: `Hechos del puente (balance consolidado a 30-jun-2026, JGAAP) [1]: sin préstamos ni bonos. Caja = efectivo y depósitos 721.468 M + valores negociables a corto 40.800 M = 762.268 M (Stock Analysis da la misma caja neta, 762,27 mil M [7]). Arrendamientos 0: con JGAAP no hay pasivo por arrendamientos operativos; la nueva norma japonesa se aplicará desde el ejercicio a marzo de 2028 y Fanuc aún evalúa su efecto [${yuho}]. Minoritarios a valor contable: 17.342 M. Pensiones: pasivo neto por prestaciones definidas de 19.536 M (bruto de impuestos); a 31-mar-2026 había además un activo por prestaciones de 1.310 M [2], que en el trimestral va dentro de «Others». Asociadas: acciones de sociedades no consolidadas y asociadas de 167.210 M a 31-mar-2026 [${yuho}] (el trimestral no lo desglosa); aportan 30.531 M de resultado por puesta en equivalencia en FY2025, por debajo del beneficio de explotación [2]. Pendiente de decidir: valores de inversión a largo plazo de 231.110 M a 30-jun-2026 [1]; sin las asociadas de marzo quedan ≈ 63.900 M de otras inversiones (participaciones cruzadas y bonos; 56.077 M a 31-mar-2026 = 223.287 − 167.210) [2, ${yuho}], con plusvalías latentes de 42.945 M en patrimonio [1]. Si se suman, irían en otros_ajustes con signo negativo (−63.900 M ≈ 68 JPY por acción). WACC (datos de mercado): ${D.dcf_notas_D}`,
  confianza: 'Alta'
};
delete D.dcf_notas_D;

D.huecos = [
  { seccion: 'consenso', campo: 'revisiones de BPA y EBITDA a 3 y 12 meses', tipo: 'Núcleo', intentos: '1) MarketScreener, página de revisiones (solo gráfico, sin texto); 2) Wayback Machine de la página de MarketScreener a 7-jul-2026 y 7-oct-2025 (sin capturas); 3) Minkabu, consenso con histórico (403)', decision: 'Omitido; se describen los cambios de recomendación y de guía' },
  { seccion: 'consenso', campo: 'número de analistas por estimación', tipo: 'Complemento', intentos: '1) MarketScreener Finances (fila vacía); 2) Investing (sin desglose por línea); 3) Minkabu (403)', decision: 'Omitido; se da el número del consenso de recomendación (19)' },
  { seccion: 'bolsa', campo: 'saldo de crédito (compras y ventas a crédito) de la JPX', tipo: 'Complemento', intentos: '1) Kabutan (403); 2) Matsui Securities (no lo muestra); 3) Kabuyoho (no lo muestra)', decision: 'Omitido; se usa la posición corta declarada (≥ 0,5 %) de karauri.net' },
  { seccion: 'transacciones', campo: 'precio y prima de la OPA de Nidec sobre Makino', tipo: 'Complemento', intentos: '1) Nota de Makino del 9-may-2025 (no da el precio); 2) Business Wire (403); 3) Nasdaq (tiempo agotado)', decision: 'Omitido (prima_pct null)' },
  { seccion: 'transacciones', campo: 'EBITDA de Altair y de NI', tipo: 'Complemento', intentos: '1) Nota de Siemens (solo ventas); 2) 8-K de NI (no publica EBITDA ni valor empresa); 3) búsqueda de un múltiplo oficial (no existe)', decision: 'Omitido (null)' },
  { seccion: 'transacciones', campo: 'Midea–KUKA, Teradyne–Universal Robots/MiR, Rockwell–Clearpath', tipo: 'Complemento', intentos: '1) Midea–KUKA (2016-17) y Teradyne–UR/MiR (2015-18) quedan fuera de la ventana de 5-7 años; 2) la exclusión de KUKA de 2022 no se buscó por tiempo; 3) Rockwell–Clearpath (2023) no publicó importe', decision: 'Omitido' },
  { seccion: 'identificacion', campo: 'empleados (fuente primaria)', tipo: 'Complemento', intentos: '1) Corporate Outline de Fanuc (no da la plantilla); 2) Securities Report (texto japonés ilegible con pdftotext); 3) Stock Analysis: 10.040', decision: 'Tomado de Stock Analysis [7]' }
];

const out = { identificacion: D.identificacion, consenso: D.consenso, bolsa: D.bolsa, multiplos_historicos: D.multiplos_historicos, comparables: D.comparables, transacciones: D.transacciones, dcf: D.dcf, valoracion: D.valoracion, fuentes: F, huecos: D.huecos };
fs.writeFileSync(new URL('./D.json', import.meta.url), JSON.stringify(out, null, 2));
console.log('fuentes', F.length, 'USDJPY', USDJPY, 'EURJPY', EURJPY);
