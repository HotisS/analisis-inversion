// Pone al día las notas A-E (que escribe construir-notas.mjs con la base del 15-oct) con lo publicado hasta el 27-nov-2026:
// resultados del 3T26 (nota del 4-nov, 10-Q del 5-nov, transcripción), Form 4/144 y 13G/A, precio y consenso posteriores
// (Yahoo quoteSummary del 25-nov, MarketScreener del 9-nov), comparables rehechos con su consenso actual y tasa libre del Tesoro.
// Ejecutar después de construir-notas.mjs: node informes/paycom-2026-11-27/notas/actualiza-2026-11-27.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const SEC = 'https://www.sec.gov/Archives/edgar/data/1590955';
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const fuente = (lista, f) => { const id = lista.length + 1; lista.push({ id, ...f }); return id; };

const F_NOTA = { titulo: 'Paycom Software, Inc. Reports Third Quarter 2026 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-04', url: `${SEC}/000119312526447248/payc-ex99_1.htm` };
const F_10Q = { titulo: 'Form 10-Q del tercer trimestre de 2026', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: `${SEC}/000119312526449828/payc-20260930.htm` };
const F_CALL = { titulo: 'Paycom (PAYC) Q3 2026 Earnings Call (transcripción completa)', editor: 'TradingKey', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://www.tradingkey.com/news/transcripts/262279681-' };
const F_DIV = { titulo: 'Paycom Announces Quarterly Cash Dividend (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-02', url: `${SEC}/000119312526443880/payc-ex99_1.htm` };

// ---------------------------------------------------------------- A
const A = lee('A.json');
const a = { nota: fuente(A.fuentes, F_NOTA), q: fuente(A.fuentes, F_10Q), call: fuente(A.fuentes, F_CALL) };
A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 2191.1, ebitda: 932.9, ebit: 731.6, beneficio_neto: 510.1, bpa: 10.47, dpa: 1.5, dpa_extraordinario: 0, fcf: 654.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };
A.financieros.comentario = A.financieros.comentario.replace('la guía de 2026 es de un +7-8 % [1, 3]', `la guía de 2026, elevada por segunda vez el 4-nov, es de 2.213-2.218 M USD (+8 %) [1, ${a.nota}]`)
  + ` En los nueve primeros meses de 2026 los ingresos crecieron un 9,2 % (1.646,8 M USD), los recurrentes un 10,3 %, y el margen EBIT GAAP llegó al 34,9 % (27,2 % un año antes): la I+D en gasto cayó del 14,0 % al 9,2 % de las ventas y la comercial del 23,4 % al 20,9 % [${a.nota}]. Últimos 12 meses a septiembre: 2.191,1 M de ingresos, 731,6 M de EBIT y 10,47 USD de BPA diluido GAAP (suma del 4T25 y de los nueve meses) [${a.nota}, 5].`;
A.financieros.ajustes = A.financieros.ajustes.replace('(3) 2026, otra plusvalía de 9,0 M por el mismo contrato en el 1T [3]', `(3) 2026, otra plusvalía de 9,0 M por el mismo contrato en el 1T, la única de los nueve meses [3, ${a.nota}]`);
const tri = A.trimestres.items.filter((t) => t.periodo !== '3T24');
tri.push({ periodo: '3T26', ingresos: 543.8, crecimiento_pct: 10.2, crecimiento_organico_pct: 10.2, ebitda: 268.1, margen_ebitda_pct: 49.3, bpa: 2.99, vs_consenso: 'Superior' });
A.trimestres.items = tri;
A.trimestres.ultima_presentacion = `EBITDA de la tabla: el ajustado de la empresa (sin pagos en acciones), único publicado por trimestre; BPA diluido GAAP [3-6, ${a.nota}]. En el 3T26 (4-nov) Paycom volvió a batir: ingresos de 543,8 M USD (+10,2 %; recurrentes +11,3 %), BPA GAAP de 2,99 USD (1,96 un año antes) y ajustado de 3,37 USD frente a 2,80 del consenso, y un margen de EBITDA ajustado récord del 49,3 % [${a.nota}]. Subió la guía por segunda vez: ingresos de 2.213-2.218 M (antes 2.197-2.212 M), recurrentes «casi» +9 %, intereses de fondos de ~107 M y EBITDA ajustado de 1.069-1.079 M (antes 1.007-1.022 M), un 48,5 % de margen [${a.nota}, ${a.call}]. La guía implica un 4T de ~569 M de ingresos, solo un +4,5 %: el director financiero lo atribuyó al calendario y a una comparación difícil, sin más detalle, y la acción cayó un 6,8 % el 5-nov y otro 5,1 % el 6-nov [${a.call}]. En la conferencia: márgenes «sostenibles», 2027 «transformacional» por varios productos en pruebas, más gasto comercial y de marketing en 2027 (algunos productos necesitarán otra red de ventas), flujo libre «aún más fuerte» en 2027 sin cifra, capex de ~6 % de las ventas en 2026, pagos en acciones del 3 %, tipo GAAP del 29 % [${a.call}]. Lo que se evitó: no hubo cifra de reservas ni de retención, ni de plantilla, ni objetivo de flujo libre para 2027 [${a.call}].`;
A.balance.liquidez = `Caja corporativa de 193,9 M USD a 30-sep-2026 y 1.375 M disponibles de la línea renovable de 2.125 M (750 M dispuestos tras devolver 150 M en el 3T), con vencimiento el 23-abr-2031 [${a.nota}, ${a.q}].`;
A.balance.vencimientos = [{ anio: '2026', importe: 0 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 0 }, { anio: '2029', importe: 0 }, { anio: '2030', importe: 0 }, { anio: '2031', importe: 750 }];
A.balance.otros_pasivos = A.balance.otros_pasivos.replace('Los fondos de clientes (3.006,1 M USD a 30-jun-2026', `Los fondos de clientes (3.891,3 M USD a 30-sep-2026 y 3.006,1 M a 30-jun-2026 [${a.nota}]`).replace('La deuda de 900 M es', 'La deuda (750 M a 30-sep-2026) es').replace('(82,8 M de pasivo)', `(73,5 M de pasivo a 30-sep-2026 [${a.nota}])`);
A.balance.comentario = `Hasta 2025 Paycom no tenía deuda (la hipoteca de la sede, unos 30 M USD, se canceló en 2023) y acumulaba caja [1, 7]. En 2026 cambió de política: recompró 10,9 millones de acciones por 1.390,9 M USD en los nueve meses (casi todo en el primer semestre), dispuso 900 M de la línea renovable y devolvió 150 M en el 3T; el patrimonio neto pasó de 1.731,5 M a 707,3 M a 30-sep [${a.nota}]. La deuda neta corporativa de 556 M USD (750 M menos 193,9 M de caja) equivale a 0,5 veces el EBITDA ajustado previsto para 2026 (1.069-1.079 M) [${a.nota}]. El circulante comercial es mínimo (clientes de 56,2 M y proveedores de 20,8 M): los clientes pagan cada nómina por adelantado y los costes de captación diferidos (1.045,4 M, corto más largo plazo) son la partida grande del activo operativo [${a.nota}].`;
A.flujos.comentario = `El flujo operativo pasó de 98,8 M USD en 2016 a 679,0 M en 2025, pero el capex (sobre todo software desarrollado y centros de datos) se comió entre el 30 % y el 44 % de cada año: 275,0 M en 2025, con más de 100 M para preparar los centros de datos para modelos de IA propios [1, 9]. En los nueve meses de 2026 el flujo operativo fue de 613,9 M (482,8 M un año antes; incluye 65,6 M de devolución neta de impuestos que no se repite) y el capex bajó a 77,4 M (197,4 M): flujo libre de 536,5 M, un 32,6 % de las ventas [${a.nota}]. La empresa mantiene un capex de ~6 % de las ventas para el año, lo que implica un 4T de ~55 M, y promete un flujo libre «aún más fuerte» en 2027 [${a.call}]. Estimación propia: el capex de mantenimiento ronda el 5 % de las ventas. Uso de la caja en los nueve meses: 1.390,9 M de recompras, 52,2 M de dividendos y 150 M de devolución de deuda [${a.nota}].`;
A.calidad.comentario = A.calidad.comentario.replace('31,6 M en el primer semestre de 2026 [1, 3]', `52,0 M en los nueve meses de 2026 (91,8 M un año antes) [1, ${a.nota}]`).replace('El tipo efectivo sube al 29,3 % en 2026', `El tipo efectivo sube al 28,9 % en los nueve meses de 2026 [${a.q}]`);
A.calidad.senales[1].comentario = `Pasa gasto a capex y amortización; la I+D capitalizada cayó a 17,4 M en el 3T26 (43,5 M un año antes) a la vez que la I+D en gasto (38,5 M frente a 74,1 M): es reducción real, no reclasificación [${a.nota}].`;
A.calidad.senales.push({ senal: 'Margen del 3T26 muy por encima de la historia', nivel: 'Media', comentario: `El margen EBIT GAAP del 3T26 (36,0 %) sale de bajar la I+D en gasto a un 7,1 % de las ventas y la comercial a un 19,9 %; la dirección anuncia más gasto comercial en 2027, así que parte del margen puede revertir [${a.nota}, ${a.call}].` });
A.capital.politica = `Dividendo trimestral de 0,375 USD desde 2023 (1,50 USD al año; el siguiente, el 7-dic-2026) y recompras como prioridad: el plan de julio de 2024 (1.500 M USD) se agotó en marzo de 2026 y el consejo aprobó otro de 2.000 M sin caducidad el 4-may-2026, con 1.652,7 M disponibles a 30-sep-2026 [${a.q}, 11]. En el 3T26 casi no recompró (3 M USD) y devolvió 150 M de la línea renovable [${a.call}]. No hay adquisiciones: todo el crecimiento es propio [1].`;
A.capital.comentario = A.capital.comentario.replace('Con el precio de hoy, 239 USD,', 'Con el precio de hoy, 247,49 USD,').replace('(900 M)', `(900 M, 750 M tras devolver 150 M en el 3T [${a.call}])`);
const kp = A.negocio.kpis;
kp[2] = { kpi: 'Saldo medio de fondos de clientes', valor_anterior: '2.400 M USD (2024)', valor_actual: '2.700 M USD (3T26, +7 %); 2.900 M en los nueve meses', variacion: '+7 %', comentario: `Base de los intereses: ~107 M USD en 2026 según la guía [${a.q}, ${a.call}].` };
kp[4] = { kpi: 'Margen EBITDA ajustado', valor_anterior: '43,0 % (2025)', valor_actual: '49,3 % (3T26); 48,5 % guía 2026', variacion: '+5,5 pp', comentario: `Sin pagos en acciones [${a.nota}].` };
kp[5] = { kpi: 'Productos nuevos', valor_anterior: '44 productos', valor_actual: 'Asset Management con más de 300 clientes; uso de IWant +65 % frente a dic-2025', variacion: null, comentario: `[${a.call}]` };
guarda('A', A);

// ---------------------------------------------------------------- B (descriptiva: se mantiene; se añade lo del 3T)
const B = lee('B.json');
const b = { nota: fuente(B.fuentes, F_NOTA), call: fuente(B.fuentes, F_CALL) };
B.historia.hitos[B.historia.hitos.length - 1].hito = `Recompra del 20 % de las acciones con 900 M USD de deuda; Shane Hadlock, presidente; la guía sube en agosto y otra vez en noviembre, con un margen de EBITDA ajustado del 48,5 % [4, ${b.nota}].`;
B.competencia.foso.fuentes[3].evidencia = `Margen EBITDA ajustado del 48,5 % previsto en 2026 (49,3 % en el 3T26), el más alto del software de HCM; infraestructura e IA propias, sin pagar «tokens» a terceros [${b.nota}, ${b.call}].`;
guarda('B', B);

// ---------------------------------------------------------------- C
const C = lee('C.json');
const c = { q: fuente(C.fuentes, F_10Q), f4: fuente(C.fuentes, { titulo: 'Form 4 y Form 144 de directivos y consejeros de Paycom presentados entre el 13 y el 25-nov-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-25', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001590955&type=4' }),
  harris: fuente(C.fuentes, { titulo: 'Schedule 13G/A de Harris Associates sobre Paycom', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-16', url: 'https://www.sec.gov/Archives/edgar/data/1590955/000081391726000048/xslSCHEDULE_13G_X02/primary_doc.xml' }),
  nota: fuente(C.fuentes, F_NOTA) };
C.gobierno.insiders = [
  { fecha: '2026-11-25', persona: 'Shane Hadlock (presidente)', operacion: 'Venta', acciones: 1421, importe: 0.35 },
  { fecha: '2026-11-24', persona: 'Henry C. Duques (consejero, aviso Form 144)', operacion: 'Venta', acciones: 2985, importe: 0.74 },
  { fecha: '2026-11-17', persona: 'Robert D. Foster (director financiero)', operacion: 'Venta', acciones: 2105, importe: 0.53 },
  { fecha: '2026-11-13', persona: 'Randy Peck (director de operaciones)', operacion: 'Venta', acciones: 4645, importe: 1.13 },
  ...C.gobierno.insiders,
];
C.gobierno.accionistas[0].variacion = `≈13,1 % sobre 45,0 M de acciones; plan 10b5-1 de su sociedad (1-sep-2026) para vender hasta 1,09 M de acciones entre el 1-dic-2026 y el 1-jun-2027 [1, ${c.q}]`;
C.gobierno.accionistas[2] = { nombre: 'Harris Associates', pct: 5.7, tipo: 'Institucional', variacion: `13G/A del 16-nov-2026 (2,55 M de acciones; 6,7 % en febrero) [${c.harris}]` };
C.gobierno.accionistas[4].variacion = `19,7 M de acciones en autocartera sobre 64,0 M emitidas a 30-sep-2026 [${c.nota}]`;
C.gobierno.alertas.unshift(`Plan de venta 10b5-1 del fundador (adoptado el 1-sep-2026, con la acción en ~240 USD): hasta 1,09 M de acciones, ~18 % de su participación y ~2,4 % del capital, entre el 1-dic-2026 y el 1-jun-2027; es su primera venta desde 2021 y devolvería su peso al ~10,7 % que tenía antes de las recompras [${c.q}].`);
C.gobierno.alertas.push(`Demanda de la EEOC (jul-2026) por el despido de una empleada con alergia alimentaria grave; la empresa defiende que fue legal (oct-2026); sin efecto económico relevante [${c.q}].`);
C.directivos.equipo[0].participacion_pct = 13.1;
C.directivos.historial_guidance[1] = { anio: '2026', guia: 'Inicial (feb-2026): ingresos de 2.175-2.195 M y EBITDA ajustado de 950-970 M; elevada en agosto (2.197-2.212 M y 1.007-1.022 M) y en noviembre (2.213-2.218 M y 1.069-1.079 M)', real: `Nueve meses: 1.646,8 M de ingresos y 778,5 M de EBITDA ajustado [${c.nota}]`, cumplida: 'Parcial' };
guarda('C', C);

// ---------------------------------------------------------------- D
const D = lee('D.json');
const BOLSA = lee('bolsa.json');
const YQ = lee('docs/yahoo-quotesummary-2026-11-25.json');
D.fuentes = [
  { id: 1, titulo: 'Históricos diarios de PAYC, SPY e IGV', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://finance.yahoo.com/quote/PAYC/history/' },
  { id: 2, titulo: 'Paycom Software, Inc.: previsiones financieras (tras el 3T26)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://www.marketscreener.com/quote/stock/PAYCOM-SOFTWARE-INC-16253048/finances/' },
  { id: 3, titulo: 'PAYC: consenso de BPA y ventas, recomendaciones, objetivos y cambios de analistas (quoteSummary: earningsTrend, financialData, recommendationTrend, upgradeDowngradeHistory)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-11-25', url: 'https://finance.yahoo.com/quote/PAYC/analysis/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates (10 años, 25-nov-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de noviembre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Form 10-Q del tercer trimestre de 2026 (acciones en circulación a 27-oct-2026)', ...F_10Q, fecha: '2026-11-05' },
  { id: 7, ...F_NOTA },
  { id: 8, ...F_CALL },
  { id: 9, titulo: 'ADP, Paychex, Paylocity, Workday, Intuit y TriNet: precio, valor empresa, ventas, EBITDA, caja, deuda y flujo libre de 12 meses y consenso de BPA y ventas (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://finance.yahoo.com/' },
  ...D.fuentes.filter((f) => f.id >= 16).map((f, i) => ({ ...f, id: 10 + i })),
  { id: 15, titulo: 'Informe value de Paychex (corte 12-oct-2026): ROIC de los comparables', editor: 'Repositorio analisis-inversion (informes/paychex-2026-10-12)', tipo: 'Analistas', fecha: '2026-10-12', url: 'https://github.com/' },
];
// transacciones: renumerar citas 16-20 → 10-14
const ren = { 16: 10, 17: 11, 18: 12, 19: 13, 20: 14 };
const recita = (s) => s?.replace(/\[([\d, ]+)\]/g, (m, g) => `[${g.split(',').map((x) => ren[x.trim()] ?? x.trim()).join(', ')}]`);
for (const o of D.transacciones.operaciones) o.comentario = recita(o.comentario);
D.transacciones.comentario = recita(D.transacciones.comentario).replace('Paycom vale hoy unas 5,4 veces sus ventas de los últimos 12 meses', 'Paycom vale hoy unas 5,3 veces sus ventas de los últimos 12 meses');

const v = (x) => (x && typeof x === 'object' ? x.raw : x);
// Peso de cada ejercicio en los próximos 12 meses (dic-2026 a nov-2027): meses del ejercicio en curso que quedan.
const pesoAct = { ADP: 7, PAYX: 6, PCTY: 7, WDAY: 2, INTU: 8, TNET: 1 };
const nombres = { ADP: 'ADP', PAYX: 'Paychex', PCTY: 'Paylocity', WDAY: 'Workday', INTU: 'Intuit', TNET: 'TriNet' };
const roicPrev = { ADP: 43.4, PAYX: 26.8, PCTY: 20.6, WDAY: 7.1, INTU: 23.1, TNET: 20.4 };
const comps = Object.keys(pesoAct).map((t) => {
  const r = YQ[t], f = r.financialData, k = r.defaultKeyStatistics, p = r.price;
  const tr = Object.fromEntries((r.earningsTrend.trend || []).map((e) => [e.period, e]));
  const w = pesoAct[t] / 12;
  const bpa = w * v(tr['0y'].earningsEstimate.avg) + (1 - w) * v(tr['+1y'].earningsEstimate.avg);
  const g = (w * v(tr['0y'].revenueEstimate.growth) + (1 - w) * v(tr['+1y'].revenueEstimate.growth)) * 100;
  const cap = v(p.marketCap) / 1e6, ev = v(k.enterpriseValue) / 1e6, ventas = v(f.totalRevenue) / 1e6, ebitda = v(f.ebitda) / 1e6;
  return { nombre: nombres[t], ticker: t, pais: 'US', capitalizacion: Math.round(cap), ev_ventas: r2(ev / ventas), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: r1(ev / (ebitda * (1 + g / 100))),
    per_ntm: r1(v(p.regularMarketPrice) / bpa), crecimiento_pct: r1(g), margen_ebitda_pct: r1((ebitda / ventas) * 100), roic_pct: roicPrev[t],
    dn_ebitda: r2((v(f.totalDebt) - v(f.totalCash)) / 1e6 / ebitda), fcf_yield_pct: r1((v(f.freeCashflow) / 1e6 / cap) * 100) };
});
const P = YQ.PAYC;
D.identificacion = { ...D.identificacion, indice_referencia: 'S&P SmallCap 600 (S&P MidCap 400 desde el 2-dic-2026); beta frente al S&P 500 (SPY)', precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 45.0, capitalizacion_publicada: Math.round(v(P.price.marketCap) / 1e6),
  max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 170 M USD/día (3 meses) [1]', proximos_resultados: '2027-02-10', free_float_pct: 86.9 };
D.consenso = {
  guidance: `Guía de 2026 elevada por segunda vez el 4-nov-2026: ingresos de 2.213-2.218 M USD (+8 %), recurrentes «casi» +9 %, intereses de los fondos de clientes de ~107 M y EBITDA ajustado de 1.069-1.079 M (margen del 48,5 % en el punto medio, 550 pb más que en 2025) [7]. En la conferencia: pagos en acciones del ~3 % de las ventas, capex de ~6 %, tipo GAAP del 29 % y no GAAP del ~27 %; flujo libre de 2027 «aún más fuerte» que el de 2026, sin cifra [8]. Implica un 4T26 de ~569 M de ingresos (+4,5 %) y ~296 M de EBITDA ajustado [7]. No hay objetivos a medio plazo; la guía de 2027 llegará con los resultados del 4T, el 10-feb-2027 [3].`,
  estimaciones: [
    { periodo: '2026e', ingresos: 2216, ebitda: 1074, ebit: 864.8, bpa: 11.81, dpa: 1.5, fuente: 'MarketScreener, a 9-nov-2026 [2]' },
    { periodo: '2027e', ingresos: 2385, ebitda: 1176, ebit: 951.2, bpa: 13.35, dpa: 1.5, fuente: 'MarketScreener [2]' },
    { periodo: '2028e', ingresos: 2565, ebitda: 1280, ebit: 1052, bpa: 15.31, dpa: 1.5, fuente: 'MarketScreener [2]' },
  ],
  recomendaciones: { n_analistas: 21, comprar: 5, mantener: 14, vender: 2, po_medio: 271.0, po_min: 200, po_max: 331 },
  revisiones: `Tras el 3T26 el consenso de BPA ajustado subió un 8 %: 13,07 USD para 2026 (12,10 hace 30 días) y 15,13 USD para 2027 (13,97), con 21 analistas (Yahoo) [3]. Los objetivos se movieron poco: KeyBanc 295 → 297 USD (sobreponderar), JP Morgan 264 → 265 (neutral), Citi 279 → 264 (neutral) y BTIG bajó de comprar a neutral el 5-nov [3]. Antes de los resultados habían subido con fuerza (Jefferies 160 → 300, Cantor 195 → 285, Guggenheim 225 → 300 en octubre) [3]. Objetivo medio de 271 USD (16 analistas, 200-331) [3]. El BPA de MarketScreener (11,81 USD en 2026, 13,35 en 2027) es GAAP y el de Yahoo ajustado, sin pagos en acciones: ~1,2 USD por acción de diferencia [2, 3]. El EBITDA del consenso es el ajustado (sin pagos en acciones) y su EBIT también.`,
  base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 3.0,
  confianza: 'Media',
};
D.bolsa = { ...BOLSA.bolsa, posicion_corta_pct: r1(v(P.defaultKeyStatistics.shortPercentOfFloat) * 100),
  comentario: `La acción vivió dos ciclos opuestos. Hasta 2021 multiplicó su valor (+116 % en 2019, +71 % en 2020) como empresa que crecía al 25-30 %; de noviembre de 2021 a abril de 2026 perdió un 74 % por el freno del crecimiento, la canibalización de Beti (−38 % el 1-nov-2023) y el miedo a la IA en el software (mínimo de 104,90 USD el 12-feb-2026) [1]. Desde abril subió más del 150 %: la recompra del 20 % del capital a 114-140 USD, la subida de la guía de agosto (+65 % en el mes hasta el 21-ago) y un octubre de subidas de objetivos hasta el máximo de 275,22 USD del 23-oct [1, 3]. Tras el 3T26 cayó un 11,5 % en dos sesiones (268,16 → 237,32 USD, 5 y 6-nov) por la guía implícita del 4T (+4,5 %) y la publicación en el 10-Q del plan de venta del fundador; hoy, a 247,49 USD, está un 10 % bajo el máximo [1, 6]. En el año, +56,6 % frente al +5,9 % del S&P 500 y al −10,1 % del ETF de software IGV [1].` };
D.multiplos_historicos.comentario = 'Entre 2016 y 2021 Paycom cotizó a 30-130 veces el beneficio del año siguiente porque crecía al 25-30 % con tipos cero; 2019-2021 se excluyen como años de burbuja. Desde 2022 el PER adelantado cayó de 52,8x a 29,2x (2023), 26,9x (2024) y 13,6x (2025, sobre nuestro BPA de 2026e, con nueve meses publicados) [1]. Hoy, a 247,49 USD, cotiza a 18,6 veces nuestro BPA de 2027e: por encima del mínimo de 2025 y por debajo de cualquier otro año. El cambio es estructural (de empresa de crecimiento a software maduro que recompra), no solo de tipos.';
D.comparables = {
  criterio: 'Seis cotizadas de EE. UU. de nóminas, HCM y software de gestión para empresas: ADP y Paychex (nóminas con fondos de clientes, como Paycom), Paylocity (el rival más parecido, en empresas medianas), Workday (HCM para grandes empresas), Intuit (QuickBooks Payroll) y TriNet (PEO). Rehechos al cierre del 25-nov-2026 con el consenso de Yahoo posterior a sus últimos resultados [9]: PER de los próximos 12 meses = precio ÷ BPA ajustado de consenso ponderado por los meses de cada ejercicio (ADP y Paylocity 7/12 del FY2027 de junio, Paychex 6/12, Workday 2/12, Intuit 8/12, TriNet 1/12 de 2026); EV, ventas, EBITDA, deuda, caja y flujo libre de 12 meses de Yahoo; EBITDA de los próximos 12 meses estimado como el de 12 meses por el crecimiento de ventas del consenso (estimación propia); ROIC del informe de Paychex [15]. El PER es ajustado (sin pagos en acciones), como el del consenso de Paycom, y queda por encima de un PER sobre BPA GAAP: la mediana sirve de techo del alcista, no del base. Insperity queda fuera (margen EBITDA del 1 %). Dayforce dejó de cotizar en 2026 y va en transacciones [11].',
  empresas: comps,
  confianza: 'Media',
};
D.valoracion = {
  puente: { fecha: '2026-09-30', deuda_financiera: 750, arrendamientos: 0, caja: 193.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
  referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERP (T12m with sustainable payout), noviembre de 2026 [5]' },
};
D.huecos = [{ seccion: 'identificacion', campo: 'proximos_resultados', tipo: 'Complemento', intentos: '1) web de inversores de Paycom (sin anuncio a 27-nov); 2) Yahoo calendarEvents: 10-feb-2027; 3) patrón de 2026 (11-feb, tras el cierre)', decision: 'Calculado y marcado como estimación' }];
guarda('D', D);

// ---------------------------------------------------------------- E
const E = lee('E.json');
E.fuentes = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $PAYC (30 últimos, nov-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-26', url: 'https://api.stocktwits.com/api/2/streams/symbol/PAYC.json' },
  { id: 2, titulo: 'Seeking Alpha: análisis y noticias de PAYC (feed, oct-nov 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-26', url: 'https://seekingalpha.com/api/sa/combined/PAYC.xml' },
  ...E.fuentes.slice(2).map((f, i) => ({ ...f, id: 3 + i })),
];
E.fuentes.push({ id: E.fuentes.length + 1, titulo: 'SharkNinja Set to Join S&P 500; Others to Join S&P MidCap 400 and S&P SmallCap 600 (S&P Dow Jones Indices, vía PR Newswire)', editor: 'Investing News Network', tipo: 'Prensa', fecha: '2026-11-23', url: 'https://investingnews.com/sharkninja-set-to-join-sp-500-others-to-join-sp-midcap-400-and-sp-smallcap-600/' });
E.sentimiento = {
  tono: 'Dividido', tendencia: 'Empeora',
  revisadas: [
    { plataforma: 'Stocktwits ($PAYC)', fecha: '2026-11', n_comentarios: 30, tono: 'Dividido', resumen: 'Antes de los resultados, mensajes de impulso («stage 2», opciones de noviembre que se multiplicaron) y de valor razonable; tras la caída del 5-nov, decepción («esperaba más») y varios mensajes que repiten el riesgo de cobrar por empleado: si los clientes recortan plantilla para pagar herramientas de IA, caen las nóminas procesadas. Un usuario subraya que la recompra se hizo con deuda [1].' },
    { plataforma: 'Seeking Alpha (autores y noticias)', fecha: '2026-11', n_comentarios: 10, tono: 'Positivo', resumen: 'De «se escapó demasiado deprisa; mantener» (agosto) y «la recuperación empezó» (septiembre) a «resultados sólidos, márgenes al alza y valoración atractiva» tras el 3T26 (6-nov); noticia del paso del S&P SmallCap 600 al MidCap 400 el 2-dic [2].' },
    { plataforma: 'Prensa local y comentarios (Oklahoma City)', fecha: '2025-10', n_comentarios: 20, tono: 'Negativo', resumen: 'Críticas a los ~500 despidos presentados como sustitución por IA (más de tres meses: contexto) [3].' },
  ],
  temas: [
    { tema: 'Margen récord y subida de la guía', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: 49,3 % de margen de EBITDA ajustado en el 3T26 y guía de 2026 elevada dos veces; la duda es cuánto revierte con el gasto comercial de 2027 [2].' },
    { tema: 'Crecimiento del 4T y de 2027', postura: 'Bajista', peso: 'Alto', contraste: 'Fundado: la guía implica un +4,5 % en el 4T; la dirección lo achaca al calendario. Es la variable que decide el caso base (+7,5 % en 2027) [1].' },
    { tema: 'IA, empleo de los clientes y cobro por empleado', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real a 3-5 años; de momento los recurrentes crecen un 11,3 % y la empresa no publica la retención del año [1].' },
    { tema: 'Recompra con deuda', postura: 'Dividida', peso: 'Bajo', contraste: 'Exagerado: la deuda neta corporativa es de 0,5 veces el EBITDA ajustado y ya devolvió 150 M en el 3T [1].' },
  ],
  lectura: 'El foro pasó del optimismo de impulso de octubre a la duda tras el 3T26: celebra el margen, pero castiga la guía implícita del 4T y repite el riesgo de cobrar por empleado en la era de la IA [1, 2]. Nadie en los foros leídos comenta el plan de venta del fundador, que es la novedad de gobierno más relevante del trimestre. El cambio de índice (SmallCap 600 a MidCap 400 el 2-dic) es neutro o algo favorable para la demanda de la acción [4].',
  confianza: 'Baja',
};
guarda('E', E);
console.log('Notas al día. Comparables:', comps.map((x) => `${x.ticker} PER ${x.per_ntm} EV/EBITDA ${x.ev_ebitda_ntm}`).join(' · '));
