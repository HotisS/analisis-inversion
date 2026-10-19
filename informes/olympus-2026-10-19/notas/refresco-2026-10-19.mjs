// refresco-2026-10-19.mjs — Olympus, iteración del 19-oct-2026 (anterior: informes/olympus-2026-10-09).
// Las notas A-D se copiaron de la carpeta anterior (cuentas, gobierno y sector no cambian: el último trimestral sigue
// siendo el 1T FY2027 del 7-ago-2026 y el último yuho el de FY2026, del 18-jun-2026; comprobados de nuevo hoy contra
// tanshin, cuaderno de datos e informe de valores descargados en notas/docs). Este script aplica lo que sí cambió desde
// el 9-oct: precio y bolsa (cierre de Tokio del 19-oct), consenso y recomendaciones (rebaja de Nomura del 15-oct), JGB,
// comparables al nuevo cierre, carta de advertencia de la FDA del 7-oct (publicada el 13-oct) y la fecha confirmada de
// los próximos resultados (10-nov-2026). Se ejecuta una sola vez: node notas/refresco-2026-10-19.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const lee = (n) => JSON.parse(readFileSync(join(dir, n), 'utf8'));
const guarda = (n, o) => writeFileSync(join(dir, n), JSON.stringify(o, null, 2));
const A = lee('A.json'), B = lee('B.json'), C = lee('C.json'), D = lee('D.json');
const bolsa = lee('bolsa.json');
const fuente = (nota, f) => { const id = Math.max(...nota.fuentes.map((x) => x.id)) + 1; nota.fuentes.push({ id, ...f }); return id; };
const actualiza = (nota, id, cambios) => Object.assign(nota.fuentes.find((f) => f.id === id), cambios);

// ---------- D: fuentes ----------
actualiza(D, 5, { titulo: 'Cotizaciones históricas diarias de 7733.T, 1305.T (ETF del TOPIX) e IHI (ETF de tecnología médica de EE. UU.), hasta el 19-oct-2026 (cierre de Tokio del 19-oct: 1.685 JPY, dato de la API de gráficos a las 15:30 JST)', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7733.T/history/' });
actualiza(D, 6, { fecha: '2026-10-19' });
actualiza(D, 7, { fecha: '2026-10-19' });
actualiza(D, 8, { fecha: '2026-10-19' });
actualiza(D, 10, { fecha: '2026-10-16', titulo: 'Interest Rate (October 2026): JGB yield curve (último dato publicado: 16-oct-2026)' });
actualiza(D, 11, { fecha: '2026-10-19' });
actualiza(D, 31, { fecha: '2026-10-19' });
const dKab = fuente(D, { titulo: 'レーティング日報【格下げ↓】(10月15日): Nomura rebaja Olympus de Comprar a Neutral, objetivo 2.700 → 1.900 JPY', editor: 'Kabutan (株探)', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://kabutan.jp/stock/news?code=7733&b=n202610151022' });
const dCal = fuente(D, { titulo: 'IR Calendar: Announcement of Consolidated Financial Results for the 2nd Quarter of Fiscal Year 2027 (10-nov-2026)', editor: 'Olympus Corporation', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.olympus-global.com/ir/calendar/' });
const dFda = fuente(D, { titulo: 'Notice Regarding Receipt of Warning Letter from FDA', editor: 'Olympus Corporation', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.olympus-global.com/ir/data/announcement/2026/contents/ir00014.pdf' });
const dMs = fuente(D, { titulo: 'Olympus Shares Drop by Most Since 2011 After New FDA Warning (Bloomberg)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.marketscreener.com/news/olympus-shares-drop-by-most-since-2011-after-new-fda-warning-ce785dd2dc8df42d' });
const dInv = fuente(D, { titulo: 'Olympus shares hit 12-week low after FDA warning over quality systems', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.investing.com/news/stock-market-news/olympus-shares-hit-12week-low-after-fda-warning-over-quality-systems-4947987' });
const dEdi = fuente(D, { titulo: 'EDINET: 自己株券買付状況報告書 (informes mensuales de recompra, el último del 7-oct-2026) e informe de valores del 158.º ejercicio (18-jun-2026), listado de documentos de E02272', editor: 'IR BANK (copia de EDINET, Agencia de Servicios Financieros)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://irbank.net/E02272/edinet' });
const dFis = fuente(D, { titulo: 'オリンパス---大幅反落、米FDAから品質管理に関する警告書を受領 (Fisco) y オリンパスが急反落 (Minkabu Press)', editor: 'Kabutan (株探)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://kabutan.jp/stock/news?code=7733&b=n202610140719' });
const dJef = fuente(D, { titulo: 'Olympus’ shares plunge following FDA warning letter over manufacturing failures', editor: 'Yahoo Finance (Medical Device Network)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://finance.yahoo.com/news/olympus-shares-plunge-following-fda-112427067.html' });
const dNot = fuente(D, { titulo: 'Titulares de 12 meses de Olympus (Google Noticias y Yahoo Finance): retirada de agujas de endoscopia (22-ene-2026), retirada de ShockPulse (10-mar-2026), demandas por infecciones en CPRE (7-jul y 3-sep-2026), compra de BioProtect (26-may-2026)', editor: 'herramientas/noticias.mjs (AboutLawsuits, AHA, MassDevice, MDDI)', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://news.google.com/search?q=Olympus%20Corporation' });

// ---------- D: identificación ----------
Object.assign(D.identificacion, {
  precio: 1685, fecha_precio: '2026-10-19', max_52s: 2210.5, min_52s: 1302.5,
  capitalizacion_publicada: null,
  volumen_medio_diario: '≈ 9.290 M JPY/día (4,7 M de acciones, 3 meses)',
  proximos_resultados: '2026-11-10',
});

// ---------- D: consenso ----------
D.consenso.estimaciones = D.consenso.estimaciones.map((e) => ({ ...e, fuente: 'MarketScreener, 14 analistas, 19-oct-2026 (sin cambios desde el 9-oct) [6]' }));
D.consenso.recomendaciones = { n_analistas: 14, comprar: 4, mantener: 9, vender: 1, po_medio: 2123.08, po_min: 1800, po_max: 3300 };
D.consenso.revisiones = `No hay series gratuitas de revisiones con cifras: MarketScreener solo las muestra en gráficos [7] e Investing.com no publica la evolución de las estimaciones [8]. Lo verificable a 19-oct-2026: las estimaciones de BPA (98,04, 113,90 y 124,80 JPY para FY2027-FY2029) no se han movido desde el 9-oct, pese a la carta de advertencia de la FDA del 13-oct [6, ${dFda}]; lo que sí ha cambiado es el precio objetivo medio, de 2.184,62 a 2.123,08 JPY, y el reparto de recomendaciones, de 5/8/1 a 4/9/1 (comprar/mantener/vender), por la rebaja de Nomura del 15-oct de Comprar a Neutral, con objetivo de 2.700 a 1.900 JPY [7, 8, ${dKab}]. Jefferies mantenía Comprar con 3.300 JPY desde el 27-ago, pero calificó la carta de «decepcionante» y los problemas de calidad de sistémicos [7, ${dMs}]. El BPA del ejercicio 2027 del consenso (98,04 JPY) queda en la mitad alta de la guía (89,59-102,26 JPY) [1, 6].`;

// ---------- D: bolsa (bolsa.mjs del 19-oct; la API diaria aún no tenía el cierre del 19-oct y tomó el del 16-oct, 1.690) ----------
Object.assign(D.bolsa, {
  tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
  rentabilidades: bolsa.bolsa.rentabilidades,
  anual: bolsa.bolsa.anual,
  beta: bolsa.bolsa.beta,
  volatilidad_pct: bolsa.bolsa.volatilidad_pct,
  max_drawdown_pct: bolsa.bolsa.max_drawdown_pct,
});

// ---------- D: comparables al nuevo cierre (Tokio 19-oct; EE. UU. y Londres, 16-oct, última sesión cerrada) ----------
// Mismas estimaciones de MarketScreener del 8-9-oct; capitalización y múltiplos escalados con la variación del precio
// (lección: reutilizar comparables de pocos días llevándolos al nuevo cierre). USD a 158,52 JPY (antes 158,30).
const r = { Hoya: 25580 / 25055, Fujifilm: 3394 / 3427, Terumo: 2340 / 2284, Sysmex: 1837.5 / 1855, 'Boston Scientific': 44.39 / 42.73, Medtronic: 94.75 / 88.48, Stryker: 294.66 / 277.33, 'Intuitive Surgical': 426.70 / 423.96, 'Smith & Nephew': 1084.5 / 1020.5 };
const fxUsd = 158.52 / 158.30;
const r1 = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
for (const e of D.comparables.empresas) {
  const p = r[e.nombre]; if (!p) continue;
  const fx = e.pais === 'US' || e.pais === 'IE' ? fxUsd : 1;
  const evViejo = e.capitalizacion / (1 - e.dn_ebitda / e.ev_ebitda_ltm);
  const evNuevo = evViejo + e.capitalizacion * (p - 1);
  const k = evNuevo / evViejo;
  e.capitalizacion = Math.round(e.capitalizacion * p * fx);
  e.ev_ventas = r1(e.ev_ventas * k, 2); e.ev_ebitda_ltm = r1(e.ev_ebitda_ltm * k); e.ev_ebitda_ntm = r1(e.ev_ebitda_ntm * k);
  e.per_ntm = r1(e.per_ntm * p); e.fcf_yield_pct = r1(e.fcf_yield_pct / p);
}
D.comparables.comentario = D.comparables.comentario.replace('Todas las cifras salen de MarketScreener (cotización del 8 o 9 de octubre de 2026). Los datos en dólares se pasan a yenes a 158,30 JPY/USD [11-20].',
  'Las estimaciones salen de MarketScreener (8 o 9 de octubre de 2026) y la capitalización y los múltiplos se llevan al cierre del 19-oct (Tokio) o del 16-oct (EE. UU. y Londres) con la variación del precio de cada acción (Yahoo Finance); los datos en dólares se pasan a yenes a 158,52 JPY/USD [5, 11-20].');

// ---------- D: huecos, notas ----------
D.valoracion.notas_integrador = (D.valoracion.notas_integrador || '') + '\n19-OCT: puente sin cambios (el balance más reciente sigue siendo el de 30-jun-2026; los informes mensuales de recompra de EDINET confirman que la recompra de mayo, 38.948.300 acciones y 59.999,85 M JPY, está terminada y no hay otra en marcha). JGB a 10 años 2,958 % (16-oct, último dato del MoF). USD/JPY 158,52 (19-oct).';

// ---------- B: la carta de advertencia del 7-oct-2026 ----------
const bFda = fuente(B, { titulo: 'Notice Regarding Receipt of Warning Letter from FDA (carta del 7-oct-2026 a seis plantas)', editor: 'Olympus Corporation', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.olympus-global.com/ir/data/announcement/2026/contents/ir00014.pdf' });
const bMs = fuente(B, { titulo: 'Olympus Shares Drop by Most Since 2011 After New FDA Warning (Bloomberg)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.marketscreener.com/news/olympus-shares-drop-by-most-since-2011-after-new-fda-warning-ce785dd2dc8df42d' });
actualiza(B, 9, { titulo: 'Import Alert 89-04 (versión publicada el 19-ago-2026, consultada el 19-oct-2026): Aizu Olympus sigue en la lista roja desde el 24-jun-2025', fecha: '2026-08-19' });
B.historia.hitos.push({ anio: '2026', hito: `Carta de advertencia de la FDA del 7-oct-2026 a seis plantas (Hachioji, Hinode, Aomori, Shirakawa, Hamburgo y Brooklyn Park) por la respuesta a las inspecciones de finales de 2025; la acción cae un 13,5 % el 14-oct, la mayor caída diaria desde 2011 [${bFda}, ${bMs}].` });
B.sector.regulacion += ` **Carta de advertencia del 7-oct-2026** (publicada por Olympus el 13-oct): cubre seis plantas, entre ellas las tres que fabrican endoscopios en Japón (Olympus Medical Systems en Hachioji e Hinode, Aomori y Shirakawa), Olympus Winter & Ibe en Hamburgo y Gyrus ACMI en Brooklyn Park, y juzga insuficientes las respuestas a las observaciones de las inspecciones de finales de 2025. No restringe la producción ni la venta, no exige retiradas ni frena las solicitudes 510(k), y la empresa no prevé impacto en sus resultados; debe responder en 15 días hábiles [${bFda}]. A 19-oct la carta aún no estaba en la base pública de la FDA, y la alerta de importación sobre Aizu sigue vigente [9].`;
B.esg.controversias += ` El 7-oct-2026 la FDA envió una nueva carta de advertencia a seis plantas de Japón, Alemania y EE. UU. sobre el sistema de gestión de calidad [${bFda}].`;
B.competencia.foso.fuentes[2].evidencia += ` La carta del 7-oct-2026 a seis plantas confirma que el problema de calidad es de sistema, no de una planta [${bFda}, ${bMs}].`;

// ---------- C: alertas ----------
const cFda = fuente(C, { titulo: 'Notice Regarding Receipt of Warning Letter from FDA', editor: 'Olympus Corporation', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.olympus-global.com/ir/data/announcement/2026/contents/ir00014.pdf' });
C.gobierno.alertas = C.gobierno.alertas.map((a) => a.startsWith('Regulación:') ? `${a} El 7-oct-2026 la FDA envió una carta de advertencia a seis plantas (las tres japonesas de endoscopios, Hamburgo y Brooklyn Park) por respuestas insuficientes a esas inspecciones; Olympus responderá en 15 días hábiles y dice que no limita producción ni ventas [${cFda}].` : a);

guarda('D.json', D); guarda('B.json', B); guarda('C.json', C); guarda('A.json', A);
console.log('Notas actualizadas. Nuevas fuentes D:', { dKab, dCal, dFda, dMs, dInv, dEdi, dFis, dJef, dNot }, 'B:', { bFda, bMs }, 'C:', { cFda });
