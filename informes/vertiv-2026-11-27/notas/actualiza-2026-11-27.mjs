// Pone al día las notas A-D (copiadas del informe del 7-oct) para el corte del 27-nov-2026 y crea E.json.
// node informes/vertiv-2026-11-27/notas/actualiza-2026-11-27.mjs   (se ejecuta una vez, sobre las copias)
// Lo que cambia: 3T26 (nota de resultados y 10-Q del 28-oct), LTM a sep-26, puente a 30-sep-26 + UIG,
// guía 2026 subida, consenso (Yahoo 27-nov, MarketScreener), bolsa (cierre del 25-nov), comparables rehechos,
// Form 4 desde el 1-oct, 13G/A de BlackRock, dividendo subido, Tesoro y prima de Damodaran de noviembre.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
const guardar = (f, o) => writeFileSync(join(dir, f), JSON.stringify(o, null, 2) + '\n');
const nueva = (nota, f) => { const id = Math.max(0, ...nota.fuentes.map((x) => x.id)) + 1; nota.fuentes.push({ id, ...f }); return id; };
const SEC = 'https://www.sec.gov/Archives/edgar/data/1674101';

// ---------------- A: cuentas ----------------
const A = leer('A.json');
const a10q = nueva(A, { titulo: 'Vertiv Holdings Co, Form 10-Q 3T26 (30-sep-2026)', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${SEC}/000162828026067893/vrt-20260930.htm` });
const anota = nueva(A, { titulo: 'Nota de resultados 3T26 (8-K, Ex. 99.1): ventas, márgenes, guía del 4T26 y de 2026', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${SEC}/000162828026067707/q32026exhibit991vrt10282026.htm` });
const atr = nueva(A, { titulo: 'Vertiv (VRT) Q3 2026 Earnings Call Transcript', editor: 'The Singju Post', tipo: 'Prensa', fecha: '2026-10-28', url: 'https://singjupost.com/vertiv-vrt-q3-2026-earnings-call-transcript/' });
const auig = nueva(A, { titulo: '8-K 27-oct-2026 (Ex. 99.1): Vertiv completa la compra de UtilityInnovation Group (~1.450 M USD + hasta 1.150 M de earn-out; ~13x EBITDA 2027)', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: `${SEC}/000162828026067393/exhibit991vrt-q42026102720.htm` });
const akes = nueva(A, { titulo: '8-K 26-oct-2026 (Ex. 99.1): Vertiv completa la compra de King Environmental Services', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-26', url: `${SEC}/000162828026067127/exhibit991vrt-q42026102620.htm` });
const adiv = nueva(A, { titulo: '8-K 13-nov-2026 (Ex. 99.1): dividendo anual de 0,25 a 0,40 USD (+60 %)', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-13', url: `${SEC}/000162828026073564/exhibit991vrt-q42026divide.htm` });

// Trimestres: fuera el 3T24, entra el 3T26 (EBITDA GAAP = beneficio operativo 983,8 + depreciación 39,8 + amortización 68,1).
A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '3T24');
A.trimestres.items.push({ periodo: '3T26', ingresos: 4312.8, crecimiento_pct: 61.2, crecimiento_organico_pct: 55.0, ebitda: 1091.7, margen_ebitda_pct: 25.3, bpa: 1.95, vs_consenso: 'Superior' });
A.trimestres.ultima_presentacion = `**2T26 (29-jul-26).** BPA ajustado de 1,52 USD, 0,12 por encima de la guía, pero ventas 76 M por debajo del punto medio por congestión de la cadena de suministro y proyectos por fases; la acción cayó un 17 % ese día [5, 21, 23]. Las preguntas se repitieron sobre el desfase de ventas («no seremos demasiado específicos»), el peso de los anticipos en la caja (sin porcentaje de cobros por hitos), la rampa del segundo semestre y los rumores de retrasos de un cliente («no comentaré rumores») [23].

**3T26 (28-oct-26).** Ventas de 4.312,8 M USD (+61,2 %; +55,0 % orgánico), unos 460 M por encima del techo de su propia guía (3.650-3.850 M), margen operativo ajustado del 25,2 % (+290 pb) y BPA diluido de 1,95 USD (ajustado 2,21) [${anota}]. Sube por tercera vez la guía de 2026: 14.450-14.850 M de ventas, 7,10-7,20 USD de BPA ajustado (GAAP 6,29 en el punto medio) y 2.600-2.800 M de flujo libre ajustado [${anota}]. Cambios de discurso: por primera vez desde que dejó de publicar pedidos da una cifra, «pedidos orgánicos del 3T más de un 100 % por encima» de hace un año, y adelanta para 2027 un crecimiento orgánico «significativamente por encima del mercado» con más margen, sin cifra [${atr}]. Lo que más se preguntó: si la cadena de suministro del 2T está resuelta (la venta retrasada «se filtró» al 3T), los rumores de fallos de compresores y SAI (Melius: la dirección lo atribuye a todo el sector y dice «no somos perfectos»), las existencias, que más que se duplican (Morgan Stanley), la cuota y el peso de la refrigeración líquida («no seremos específicos»), si los proyectos se retrasan por falta de red eléctrica y permisos (Deutsche Bank: no lo ven en sus entregas) y los márgenes de 2027 [${atr}]. Evitó: cifras de pedidos y cartera, la mezcla por cliente y el capex de 2027.`;

A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 13116.6, ebitda: 3061.4, ebit: 2641.7, beneficio_neto: 2098.0, bpa: 5.35, dpa: 0.25, dpa_extraordinario: 0, fcf: 3140.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 99.1 };
A.financieros.comentario += ` En el 3T26 el crecimiento se acelera al 61,2 % (55,0 % orgánico; Américas +66,2 % orgánico, Asia Pacífico +48,3 %, EMEA +19,3 %) y el margen EBIT reportado llega al 22,8 % [${anota}]. Los doce meses a sep-26 suman 13.116,6 M de ventas y 2.641,7 M de EBIT (estimación propia: 2025 − 9M25 + 9M26) [${anota}, 1].`;
A.financieros.ajustes += ` En el LTM a sep-26 se devuelven al EBITDA 99,1 M de partidas no recurrentes de los nueve meses de 2026 (96,1 M de cambio de valor de la contraprestación contingente de PurgeRite, 6,9 M de costes de compras y −3,9 M de reestructuración); las del 4T25 no se separan [${anota}].`;

A.balance.liquidez = `A 30-sep-26: caja 3.512,9 M USD + inversiones a corto 198,8 M + línea revolving no dispuesta de 2.500 M; Vertiv habla de 6.200 M de liquidez y de caja neta [${anota}, ${a10q}]. Deuda bruta nominal 2.955,2 M USD (2.928,5 M contables) frente a 3.711,7 M de caja e inversiones: caja neta de unos 756 M sin arrendamientos [${a10q}]. El 26-oct pagó 1.450 M en caja por UIG [${auig}], que se llevan casi dos tercios de esa caja neta (estimación propia: queda una deuda neta de unos 694 M con el pago y sin contar los earn-outs).`;
A.balance.otros_pasivos += ` A 30-sep-26, el earn-out de PurgeRite en balance sube a 239,6 M (máximo 250 M) [${a10q}], y desde el 26-oct se añade el de UIG, de hasta 1.150 M en caja si alcanza objetivos de EBITDA a 12 y 24 meses, todavía sin valorar en un balance publicado [${auig}]. Los ingresos diferidos (anticipos) llegan a 4.120,5 M, desde 1.814,7 M en dic-25 [${a10q}]. El 10-Q mantiene la demanda colectiva de valores del SDNY (la moción contra los cargos de la Exchange Act sigue pendiente) y las dos derivadas suspendidas [${a10q}].`;
A.balance.comentario += ` En el 3T26 las existencias pasan de 1.456,5 a 3.288,4 M en nueve meses y los clientes de 3.109,0 a 4.379,7 M; los anticipos (2.312,9 M más) y los proveedores (1.409,0 M más) lo financian casi entero: el circulante operativo resta solo 540,5 M al flujo de nueve meses, a favor [${anota}].`;
A.flujos.comentario += ` Nueve meses de 2026: flujo operativo de 2.660,6 M y libre ajustado de 2.230,3 M (capex de 425,0 M, el 4,2 % de las ventas), con los anticipos todavía como fuente de caja; el 3T solo, 652,2 M de libre ajustado, porque el circulante ya consumió 138,3 M [${anota}].`;
A.capital.adquisiciones.push({ anio: '2026', objetivo: 'UtilityInnovation Group (microrredes, control de generación en sitio, cuadros para microrredes; Raleigh y Dublín)', importe: 1450, ev_ebitda: 13, financiacion: 'Caja (1.450 M USD por adelantado) + earn-out de hasta 1.150 M en caja ligado al EBITDA a 12 y 24 meses', resultado: `Cerrada el 26-oct-2026. Vertiv da ~13x el EBITDA esperado de 2027 por la parte fija y dice que el múltiplo baja si se paga todo el earn-out (porque exige más EBITDA); espera que sume BPA ajustado el primer año [${auig}, ${a10q}]. Sin resultados propios todavía.` });
A.capital.adquisiciones.push({ anio: '2026', objetivo: 'King Environmental Services (servicios de fluidos, puesta en marcha y pruebas de carga para refrigeración líquida; Irlanda)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: `Cerrada el 26-oct-2026; importe no publicado y «no material» según la empresa [${akes}].` });
A.capital.politica += ` El 13-nov-2026 el consejo subió el dividendo anual un 60 %, de 0,25 a 0,40 USD por acción (0,10 al trimestre desde el 4T26) [${adiv}]. En 2026 no ha recomprado acciones: quedan 2.400 M del programa de 3.000 M hasta dic-27 [${a10q}].`;
for (const k of A.negocio.kpis) {
  if (k.kpi.startsWith('Crecimiento orgánico')) { k.valor_actual = '26,3 % (2025); 55,0 % en el 3T26'; k.comentario = `9M26: 32,7 %; guía 2026: 37-39 % (subida el 28-oct desde 30-32 %) [${anota}].`; }
  if (k.kpi.startsWith('Margen operativo ajustado')) { k.comentario = `25,2 % en el 3T26 (+290 pb) y 23,2 % en 9M26; guía 2026: 23,5-24,5 % [${anota}].`; }
  if (k.kpi.startsWith('Pedidos orgánicos, crecimiento')) { k.comentario += ` En el 3T26 la dirección dijo, sin publicar la cifra, que los pedidos orgánicos crecieron «más de un 100 %» [${atr}].`; }
}
const hb = A.huecos.find((h) => h.campo.startsWith('Pedidos, book-to-bill'));
if (hb) hb.intentos = `1) Notas de resultados 1T26, 2T26 y 3T26: no los publican; 2) transcripción del 3T26: solo «pedidos orgánicos más de un 100 % por encima» sin importe [${atr}]; 3) 10-Q 3T26: sin cartera ni obligaciones de desempeño pendientes cuantificadas`;
A.financieros.confianza = 'Alta';
guardar('A.json', A);

// ---------------- B: sector (sin cambios de fondo: solo la fecha de la cuota y el ciclo) ----------------
const B = leer('B.json');
if (B.sector?.ciclo) B.sector.ciclo.comentario += ` A nov-26 el ciclo sigue en expansión por los resultados (pedidos del 3T26 de Vertiv por encima del 100 %), pero la bolsa ya duda de 2028: los fabricantes de equipos para centros de datos caen un 30-50 % desde sus máximos de mayo-julio (cálculo propio con los cierres de Yahoo del 25-nov).`;
guardar('B.json', B);

// ---------------- C: gobierno ----------------
const C = leer('C.json');
const cf4 = nueva(C, { titulo: 'Form 4 de consejeros y directivos de Vertiv presentados desde el 1-oct-2026 (form4.mjs): 2 presentaciones, ninguna compra ni venta en mercado', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-27', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001674101&type=4' });
const cbr = nueva(C, { titulo: 'Schedule 13G/A de BlackRock, Inc. sobre Vertiv (26,19 M acciones, 6,8 %)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: `${SEC}/000201238326003859/xslSCHEDULE_13G_X02/primary_doc.xml` });
const c10q = nueva(C, { titulo: 'Vertiv Holdings Co, Form 10-Q 3T26: planes 10b5-1 adoptados en el trimestre (Ryan, Sanghi)', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${SEC}/000162828026067893/vrt-20260930.htm` });
const br = C.gobierno.accionistas.find((x) => x.nombre.startsWith('BlackRock'));
if (br) { br.pct = 6.8; br.variacion = `26,19 M acciones según el 13G/A del 27-oct-2026 (baja desde 29,95 M y el 7,8 % de abril) [${cbr}]`; }
C.gobierno.alertas = C.gobierno.alertas.map((t) => t.startsWith('Ventas de consejeros')
  ? `${t} Desde el 1-oct-2026 no hay ventas ni compras en mercado en los Form 4 [${cf4}]; en el 3T26 adoptaron planes 10b5-1 de venta Paul Ryan (presidente de EMEA, hasta 36.662 acciones) y Sanjay Sanghi (hasta 250.508) [${c10q}].`
  : t);
guardar('C.json', C);

// ---------------- D: mercado y valoración ----------------
const D = leer('D.json');
const Bj = leer('bolsa.json');
const comp = JSON.parse(readFileSync('/tmp/claude-0/tanda-1127/vertiv/comps.json', 'utf8'));
const dyq = nueva(D, { titulo: 'VRT: quoteSummary de Yahoo (earningsTrend, financialData, recommendationTrend, upgradeDowngradeHistory, calendarEvents), 27-nov-2026', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/VRT/analysis/' });
const dms = nueva(D, { titulo: 'Vertiv Holdings Co: finances (estimaciones 2026-2028), consultado el 27-nov-2026', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-11-27', url: 'https://www.marketscreener.com/quote/stock/VERTIV-HOLDINGS-CO-45109447/finances/' });
const dyh = nueva(D, { titulo: 'Históricos diarios de VRT, SPY y XLI (bolsa.mjs y movimiento.mjs; cierre del 25-nov-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://finance.yahoo.com/quote/VRT/history/' });
const dtes = nueva(D, { titulo: 'Daily Treasury Par Yield Curve Rates 2026 (CSV): 10 años al 4,85 % el 25-nov-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026' });
const derp = nueva(D, { titulo: 'Implied ERP by month (ERPbymonth.xlsx), 1-nov-2026: 4,41 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' });
const dcomp = nueva(D, { titulo: 'quoteSummary de Yahoo de SU.PA, ETN, ABBN.SW, NVT, TT, HUBB, MOD y JCI (precio, valor empresa, ventas y EBITDA de 12 meses, deuda, caja, FCF, consenso de BPA y ventas) y tipos EUR/USD y CHF/USD, 27-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/ETN/analysis/' });
const d10q = nueva(D, { titulo: 'Vertiv Holdings Co, Form 10-Q 3T26: balance a 30-sep-2026, deuda, earn-outs y acciones en circulación a 26-oct', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${SEC}/000162828026067893/vrt-20260930.htm` });
const dnota = nueva(D, { titulo: 'Nota de resultados 3T26 (8-K, Ex. 99.1)', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${SEC}/000162828026067707/q32026exhibit991vrt10282026.htm` });
const duig = nueva(D, { titulo: '8-K 27-oct-2026 (Ex. 99.1): compra de UIG completada', editor: 'Vertiv / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: `${SEC}/000162828026067393/exhibit991vrt-q42026102720.htm` });
const dsa = nueva(D, { titulo: 'Flujo de noticias de VRT (RSS): resultados del 3T26 «batiendo por 0,39 USD y 550 M», caída electoral, Baird Industrial Conference, dividendo', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-11-19', url: 'https://seekingalpha.com/api/sa/combined/VRT.xml' });
const dtr1 = nueva(D, { titulo: 'What Is Behind The Drop In Vertiv Stock? (caídas del 4 y 5-nov-2026)', editor: 'Trefis', tipo: 'Prensa', fecha: '2026-11-06', url: 'https://www.trefis.com/stock/vrt/articles2/623340/what-is-behind-the-drop-in-vertiv-stock/2026-11-06' });
const dtr2 = nueva(D, { titulo: 'What Moved Vertiv Stock Nearly 7% Lower? (16-nov-2026)', editor: 'Trefis', tipo: 'Prensa', fecha: '2026-11-17', url: 'https://www.trefis.com/stock/vrt/articles/625807/why-did-vertiv-stock-fall-nearly-7/2026-11-17' });
const dqq = nueva(D, { titulo: 'Vertiv falls as AI infrastructure names remain under pressure despite upbeat demand commentary', editor: 'Quiver Quantitative', tipo: 'Prensa', fecha: '2026-11-10', url: 'https://www.quiverquant.com/news/Vertiv+falls+as+AI+infrastructure+names+remain+under+pressure+despite+upbeat+demand+commentary' });
const dfool = nueva(D, { titulo: "Here's Why Shares in Vertiv Crashed Today (29-jul-2026)", editor: 'The Motley Fool / Nasdaq', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.nasdaq.com/articles/why-shares-ai-infrastructure-stock-crashed-today' });
D._ids = { dyq, dms, dyh, dtes, derp, dcomp, d10q, dnota, duig, dsa, dtr1, dtr2, dqq, dfool };

Object.assign(D.identificacion, {
  precio: Bj.identificacion.precio, fecha_precio: Bj.identificacion.fecha_precio, acciones: 392.8, capitalizacion_publicada: 66758,
  free_float_pct: 99.7, max_52s: Bj.identificacion.max_52s, min_52s: Bj.identificacion.min_52s,
  volumen_medio_diario: `≈ ${Math.round(Bj.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M USD/día (${(Bj.volumen_3m.acciones_dia / 1e6).toFixed(2).replace('.', ',')} M acciones; 3 meses)`,
  proximos_resultados: '2027-02-10', fundacion: '1965 (Liebert); Vertiv desde 2016', empleados: 34000,
});
D.huecos = D.huecos.filter((h) => h.campo !== 'proximos_resultados');

D.consenso.guidance = `El 28-oct-2026 Vertiv subió por tercera vez la guía de 2026: ventas de 14.450-14.850 M USD (orgánico +37-39 %), beneficio operativo ajustado de 3.475-3.555 M (margen del 23,5-24,5 %), BPA ajustado de 7,10-7,20 USD (GAAP 6,29 en el punto medio) y flujo libre ajustado de 2.600-2.800 M [${dnota}]. En julio daba 13.800-14.200 M y 6,65-6,75 USD; en febrero, 13.250-13.750 M y 5,97-6,07 [3, 15]. Para el 4T26: 4.313-4.513 M de ventas y 2,22-2,28 USD de BPA ajustado (GAAP 2,08) [${dnota}]. Para 2027 solo cualitativo: crecimiento orgánico «significativamente por encima del mercado», más margen y fuerte flujo de caja [A${A.fuentes.length - 3}]. No hay plan a medio plazo publicado desde el día del inversor de 2024.`;
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 14720, ebitda: 3694, ebit: 3510, bpa: 6.35, dpa: 0.25, fuente: `MarketScreener [${dms}]; Yahoo: 14.718 M y BPA ajustado 7,19 (29 analistas) [${dyq}]` },
  { periodo: '2027e', ingresos: 19541, ebitda: 5187, ebit: 4980, bpa: 9.08, dpa: 0.32, fuente: `MarketScreener [${dms}]; Yahoo: 19.590 M y BPA ajustado 9,91 (31 analistas) [${dyq}]` },
  { periodo: '2028e', ingresos: 23911, ebitda: 6553, ebit: 6330, bpa: 11.95, dpa: 0.34, fuente: `MarketScreener [${dms}]` },
];
D.consenso.recomendaciones = { n_analistas: 32, comprar: 27, mantener: 5, vender: 0, po_medio: 326.89, po_min: 200, po_max: 416 };
D.consenso.revisiones = `Tras el 3T26 el consenso sube: el BPA ajustado de 2026 pasa de 6,71 USD hace 90 días a 7,19 (+7,2 %) y el de 2027 de 9,10 a 9,91 (+8,9 %), casi todo en los 30 días posteriores a los resultados; las ventas de 2027 quedan en 19.590 M (32 analistas) [${dyq}]. MarketScreener ya recoge el trimestre (14.720 M en 2026) y da 23.911 M y 11,95 USD de BPA en 2028, con base mixta (su 2025 real es el GAAP, 3,41) [${dms}]. Los precios objetivo apenas se mueven: tras los resultados, Bernstein 376, RBC 351, Citi 362, TD Cowen 357 y Wells Fargo 345; la única venta, GLJ, 187 [${dyq}]. Objetivo medio 326,89 USD (200-416), 27 de 32 recomiendan comprar [${dyq}]. Con la acción a 173,37 el mercado no sigue a los analistas: los objetivos están un 89 % por encima.`;
D.consenso.base_ebitda = 'ajustado';
D.consenso.ajuste_ebitda_pct_ventas = 0.8;
D.consenso.confianza = 'Media';

Object.assign(D.bolsa, Bj.bolsa);
D.bolsa.comentario = `Vertiv sube un 7,1 % en el año (total) frente al 5,9 % del S&P 500 y un 0,9 % a un año frente al 6,6 %, pero cae un 54 % desde su máximo del 14-may-2026 (379,93 USD) [${dyh}]. La caída tiene tres tramos: el 29-jul (−17 %) por unas ventas del 2T por debajo de la guía [${dfool}]; del 7 al 23-oct (−23 %), con las de infraestructura de IA por inflación y deuda [${dsa}]; y del 30-oct al 25-nov (−29 %), tras subir un 16,5 % el día de los resultados: el 4 y 5-nov (−12,9 % y −14,0 %) con el Nasdaq −5,5 % en la sesión siguiente a las elecciones de mitad de mandato y sin noticia propia [${dtr1}], el 16-nov con NVIDIA [${dtr2}] y el 20-nov (−10,1 %) en otra jornada de ventas del sector. La acción amplifica al sector: beta de 2,18 frente al SPY [${dyh}].`;

D.multiplos_historicos.comentario = `Precios de cierre de cada ejercicio de Yahoo Finance [${dyh}]. Antes de 2020 cotizaba la SPAC (≈ 10-11 USD) y no hay beneficio comparable. 2021 y 2022 tienen BPA mínimo o negativo por los warrants y la inflación: el PER al cierre no sirve. El PER adelantado (cierre ÷ BPA del año siguiente) da 56,6x en 2020, 11,5x en 2022, 37,5x en 2023, 33,3x en 2024 y 25,8x en 2025 (con el BPA GAAP de 2026e de la guía, 6,29) [${dnota}]. Hoy, 173,37 USD sobre nuestro BPA de 2027e (9,1 USD GAAP) son ≈ 19x: el menor de su historia salvo 2022.`;

const comps = comp.filter((c) => c.ticker !== 'VRT');
D.comparables.empresas = comps;
D.comparables.criterio = `Los mismos ocho del informe anterior, rehechos al 25-26 de noviembre: Schneider, Eaton, ABB y nVent en energía crítica, Trane, Johnson Controls y Modine en refrigeración, y Hubbell en material eléctrico [${dcomp}]. Fuera Carrier y Daikin (poca exposición a centros de datos). Precio, valor empresa, ventas y EBITDA de 12 meses, deuda, caja y flujo libre de Yahoo; PER de los próximos 12 meses con el BPA medio de los dos ejercicios estimados ponderado por meses (Modine a marzo y Johnson Controls a septiembre); EV/EBITDA NTM estimado con el EBITDA LTM crecido como las ventas (margen constante, estimación propia); ROIC del 7-oct (Stock Analysis), que no cambia hasta las cuentas anuales. Europeas a 1,0964 USD/EUR y 1,1966 USD/CHF [${dcomp}]. El BPA del consenso es ajustado.`;

D.valoracion.puente = { fecha: '2026-09-30', deuda_financiera: 2955.2, arrendamientos: 0, caja: 3711.7, minoritarios: 0, pensiones: 60.4, asociadas: 0, otros_ajustes: 2264.6 };
D.dcf = { wacc: { tasa_libre_pct: 4.85, beta: 2.18 } };
delete D._ids;
guardar('D.json', D);
writeFileSync('/tmp/claude-0/tanda-1127/vertiv/ids.json', JSON.stringify({ A: { a10q, anota, atr, auig, akes, adiv }, C: { cf4, cbr, c10q }, D: { dyq, dms, dyh, dtes, derp, dcomp, d10q, dnota, duig, dsa, dtr1, dtr2, dqq, dfool } }));

// ---------------- E: sentimiento ----------------
const E = { fuentes: [
  { id: 1, titulo: 'Stocktwits, flujo de VRT (API pública), 25-27 nov 2026: 30 mensajes', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://api.stocktwits.com/api/2/streams/symbol/VRT.json' },
  { id: 2, titulo: 'Seeking Alpha, análisis de VRT del 2 al 12-nov-2026 (titulares y tesis: «AI Panic Creates Golden Buying Opportunity», «The Election Selloff Is Pricing In A Data Center Bust That The Order Book Doesn\'t Show», «The Print Was About 2027, The Selloff Is About 2028», «The 50% Fall Isn\'t Enough», «Good Quarter, Crushed Chart. Waiting For $150 Entry»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-12', url: 'https://seekingalpha.com/api/sa/combined/VRT.xml' },
  { id: 3, titulo: 'Quiver Quantitative: Vertiv falls as AI infrastructure names remain under pressure', editor: 'Quiver Quantitative', tipo: 'Foros y redes', fecha: '2026-11-10', url: 'https://www.quiverquant.com/news/Vertiv+falls+as+AI+infrastructure+names+remain+under+pressure+despite+upbeat+demand+commentary' },
  { id: 4, titulo: 'Seeking Alpha, análisis del 7-oct-2026: «Compounding Exactly As Expected, And That\'s The Problem» y «Valuation Leaves Little Room For Error»', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://seekingalpha.com/api/sa/combined/VRT.xml' },
], huecos: [] };
E.sentimiento = {
  tono: 'Dividido', tendencia: 'Empeora',
  revisadas: [
    { plataforma: 'Stocktwits (flujo de VRT)', fecha: '2026-11', n_comentarios: 30, tono: 'Dividido', resumen: 'De 12 mensajes con etiqueta, 8 alcistas y 4 bajistas; los que argumentan dicen que es equipo de obra con precio de software y que un retraso de dos trimestres en un campus convierte la cartera en existencias; los alcistas hablan de suelo y de balance limpio [E1].' },
    { plataforma: 'Seeking Alpha (análisis de autores)', fecha: '2026-11', n_comentarios: 8, tono: 'Positivo', resumen: 'Cinco de siete piezas tras los resultados ven la caída como oportunidad (pedidos +100 %, guía subida); dos esperan más caída (150 USD) o dicen que la caída del 50 % «no basta» porque la duda es 2028 [E2].' },
    { plataforma: 'Prensa con comentarios (Quiver, Trefis)', fecha: '2026-11', n_comentarios: 4, tono: 'Negativo', resumen: 'Atribuyen las caídas a la volatilidad del comercio de IA y a NVIDIA, no a noticias de Vertiv [E3].' },
    { plataforma: 'Seeking Alpha (antes de resultados)', fecha: '2026-10', n_comentarios: 2, tono: 'Neutro', resumen: 'La tesis de octubre: la empresa cumple, pero el precio (entonces 250 USD) no dejaba margen de error [E4].' },
  ],
  temas: [
    { tema: 'Ciclo de inversión en IA y 2028', postura: 'Bajista', peso: 'Alto', contraste: 'El informe ya modela una pausa en 2028 en el bajista (−35 puntos de crecimiento). Los resultados no la anuncian: pedidos del 3T +100 % y guía de 2027 al alza (nota y conferencia del 3T26).' },
    { tema: 'Valoración tras la caída', postura: 'Alcista', peso: 'Alto', contraste: 'A 173 USD el PER adelantado es ≈ 19x frente a 33x de mediana propia: tienen razón en que está más barata que su historia; el DCF sigue sin cubrir el precio con un WACC del 11 %.' },
    { tema: 'Calidad y ejecución (compresores, SAI, cadena de suministro)', postura: 'Dividida', peso: 'Medio', contraste: 'La dirección niega un problema propio y el 3T26 batió su guía en 460 M de ventas (nota y conferencia del 3T26); sin datos de garantías que lo midan (provisión de garantía 57,2 M frente a 43,2 M en dic-25) (10-Q del 3T26).' },
    { tema: 'Dependencia de NVIDIA y de los hiperescaladores', postura: 'Bajista', peso: 'Medio', contraste: 'Vertiv no publica la concentración de clientes (hueco del informe); su mezcla «representa el mercado», según la dirección en la conferencia del 3T26.' },
  ],
  lectura: 'El sentimiento no es de euforia: la acción ha perdido más de la mitad desde mayo y los foros discuten si es suelo o el principio del fin del ciclo. Los analistas siguen casi todos en comprar con objetivos un 89 % por encima, y los particulares están divididos: es el escenario en el que el precio ya descuenta parte del bajista. Lo que añade al informe es el foco en 2028, que es exactamente el año del bajista; no cambia la valoración.',
  confianza: 'Media',
};
guardar('E.json', E);
console.log('notas actualizadas', JSON.stringify({ A: A.fuentes.length, C: C.fuentes.length, D: D.fuentes.length }));
