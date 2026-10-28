// Pone al día las notas C, D y E (copiadas del 21-oct) para el corte del 28-oct-2026. Se ejecuta una vez:
// node informes/netflix-2026-10-28/notas/actualiza-2026-10-28.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
const guardar = (f, o) => writeFileSync(join(dir, f), JSON.stringify(o, null, 2) + '\n');
const nueva = (nota, f) => { const id = Math.max(...nota.fuentes.map((x) => x.id)) + 1; nota.fuentes.push({ id, ...f }); return id; };

// ---------- D: mercado y valoración ----------
const D = leer('D.json');
const B = leer('bolsa.json');
const f10q = nueva(D, { titulo: 'Netflix, Inc. Form 10-Q del tercer trimestre de 2026 (30-sep-2026)', editor: 'Netflix / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1065280/000106528026000291/nflx-20260930.htm' });
const fyq = nueva(D, { titulo: 'NFLX: quoteSummary (earningsTrend, financialData, recommendationTrend), 28-oct-2026', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-28', url: 'https://finance.yahoo.com/quote/NFLX/analysis/' });
const fms = nueva(D, { titulo: 'Netflix, Inc.: finances (estimaciones 2026-2028)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-28', url: 'https://www.marketscreener.com/quote/stock/NETFLIX-INC-44292425/finances/' });
const fsa = nueva(D, { titulo: 'Netflix (NFLX) Stock Forecast & Price Target', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-22', url: 'https://stockanalysis.com/stocks/nflx/forecast/' });
const fwrap = nueva(D, { titulo: 'Wall Street Lowers Netflix Stock Price Targets After Weak Outlook Overshadows Q3 Earnings', editor: 'TheWrap', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.thewrap.com/industry-news/business/netflix-q3-2026-earnings-stock-reaction/' });
const fhey = nueva(D, { titulo: 'Netflix Stock News (Oct 22, 2026): NFLX Falls 5.3% to $65.04', editor: 'Gotrade', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://www.heygotrade.com/en/news/netflix-nflx-stock-news-october-22-2026/' });
const ftes = nueva(D, { titulo: 'Daily Treasury Par Yield Curve Rates 2026 (CSV, 27-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026' });
const fyh = nueva(D, { titulo: 'Históricos diarios de NFLX, SPY, XLC y comparables (bolsa.mjs, movimiento.mjs; cierre del 27-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/NFLX/history/' });
const ff4 = nueva(D, { titulo: 'Form 4 y Form 144 de Bradford L. Smith (consejero), 26-27 oct 2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: 'https://www.sec.gov/Archives/edgar/data/1065280/000119311926000003/xslF345X06/wk-form4_1793132405.xml' });

const id = D.identificacion;
Object.assign(id, {
  precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio,
  acciones: 4167.0, capitalizacion_publicada: 260330,
  max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
});
const v3m = B.volumen_3m;
if (v3m) id.volumen_medio_diario = `≈ ${Math.round(v3m.importe_dia_millones).toLocaleString('es-ES')} M USD/día (3 meses)`;
id.extra.notas = [
  `Precio: cierre del 27-oct-2026 (62,52 USD), último cierre a la fecha de corte (el 28-oct la sesión de Nueva York no ha abierto a la hora del análisis) [${fyh}].`,
  `Acciones diluidas: 4.167,0 M = 4.106,3 M en circulación a 30-sep-2026 (portada y balance del 10-Q) + 60,7 M de efecto dilutivo de opciones y acciones restringidas (media del 3T) [${f10q}]. La media ponderada diluida del 3T (4.195,1 M) no recoge del todo la recompra de 63,9 M de acciones del trimestre (4.800 M USD) [${f10q}].`,
  `Capitalización publicada: 260.330 M en Yahoo Finance al cierre del 27-oct, con 4.163,9 M de acciones [${fyq}].`,
  `Máximo y mínimo de 52 semanas del histórico ajustado de Yahoo (bolsa.mjs): 116,73 USD (13-nov-2025) y 62,48 USD (27-oct-2026, mínimo intradía de la propia sesión del corte) [${fyh}].`,
  `Resultados del 3T26 publicados el 20-oct tras el cierre y 10-Q presentado el 21-oct [${f10q}]. Próximos resultados (4T26): fecha aún no anunciada; estimación propia del 19-ene-2027 (los del 4T25 se publicaron el martes 20-ene-2026). La dirección dará la guía de 2027 en enero.`,
];

// Consenso tras el 3T26
const c = D.consenso;
c.estimaciones = [
  { periodo: '2026e', ingresos: 51126, ebitda: 17059, ebit: 16206, bpa: 3.58, dpa: 0, fuente: `MarketScreener (28-oct, ya con el 3T26) [${fms}]; BPA de Yahoo 3,584 con 37 analistas [${fyq}]` },
  { periodo: '2027e', ingresos: 56634, ebitda: 19719, ebit: 18860, bpa: 3.765, dpa: 0, fuente: `MarketScreener (28-oct) [${fms}]; Yahoo 3,767 con 44 analistas [${fyq}]` },
  { periodo: '2028e', ingresos: 62249, ebitda: 22743, ebit: 21796, bpa: 4.487, dpa: 0, fuente: `MarketScreener (28-oct) [${fms}]` },
];
c.recomendaciones = { n_analistas: 51, comprar: 33, mantener: 16, vender: 2, po_medio: 84.76, po_min: 57, po_max: 126 };
c.revisiones = `Una semana después del 3T26 el consenso ya recoge la guía rebajada. Según Yahoo (28-oct), el BPA de 2027e baja de 3,81 hace 30 días a 3,77 (−1,1 %; 7 revisiones a la baja y 1 al alza en 30 días) y el del 4T26 de 0,73 a 0,68, en línea con la guía de 0,67; el de 2026e sigue en 3,58 porque los nueve primeros meses (2,90) ya incluyen la comisión de ruptura de Warner [${fyq}]. MarketScreener pasa de 3,795 a 3,765 en 2027e y de 4,544 a 4,487 en 2028e (−1,3 %), con ingresos de 2028e de 62.249 M (antes 62.707) [${fms}]. El objetivo medio cae de 91,39 a 84,76 USD (−7,3 %; mediana 82): UBS 115 → 110, Seaport 90 → 85, Guggenheim 80 → 78, Jefferies 85, Deutsche Bank 93 y TD Cowen 100, todos con comprar; ninguna rebaja de recomendación nueva [${fsa}, ${fwrap}].`;
c.extra = c.extra ?? {}; c.extra.notas = [
  ...(c.extra.notas ?? []).filter((n) => /EBITDA de MarketScreener de 2025|comisión de ruptura/.test(n)),
  `Recomendaciones (Yahoo, oct-2026): 7 compra fuerte, 26 compra, 16 mantener y 2 venta (51); objetivo medio 84,76, mediana 82, mínimo 57 y máximo 126 USD con 43 objetivos [${fyq}]. Stock Analysis da el mismo objetivo medio a 22-oct [${fsa}].`,
];

// Bolsa
const b = D.bolsa;
Object.assign(b, {
  rentabilidades: B.bolsa.rentabilidades, anual: B.bolsa.anual, beta: B.bolsa.beta,
  volatilidad_pct: B.bolsa.volatilidad_pct, max_drawdown_pct: B.bolsa.max_drawdown_pct, tramo_drawdown: B.bolsa.tramo_drawdown,
  posicion_corta_pct: 2.08,
});
b.extra.notas = [
  `Betas frente al SPY (cierre del 27-oct): mensual a 5 años 1,60; semanal a 5 años 1,41; semanal a 2 años 0,92; ajustadas 1,40 (mensual) y 1,27 (semanal 5 años). La de 2 años, muy inferior, refleja un episodio propio (caída de la acción con el mercado al alza), no menos riesgo [${fyh}].`,
  `Mayores caídas diarias en 12 meses: −9,7 % el 17-abr-2026, −7,3 % el 17-jul-2026, −5,8 % el 22-jun-2026, −5,3 % el 4-sep-2026 y −5,3 % el 21-oct-2026 [${fyh}].`,
  `Volatilidad diaria anualizada de un año del 36 % (35 % en 60 sesiones según movimiento.mjs) [${fyh}].`,
  `Posición corta: 2,08 % del flotante según Yahoo a mediados de octubre [${fyq}].`,
  `Rentabilidad total: −33,3 % en 2026 frente al +13,7 % del SPY y −11,2 % del XLC; −43,3 % en un año [${fyh}].`,
];
b.comentario = `Netflix pierde un 33,3 % en 2026 frente al +13,7 % del S&P 500 y el −11,2 % del sector de comunicación, y un 43,3 % en un año. La caída tiene causas conocidas: cuatro guías seguidas por debajo de lo esperado (3T25, 1T26, 2T26 y 3T26), la puja por Warner Bros. en diciembre, la salida de Reed Hastings del consejo y rebajas de Wells Fargo y Huber. Tras el 3T26 cae un 5,3 % el 21-oct (65,04) y sigue bajando sin noticia propia hasta 62,52 el 27-oct, en una semana en que el ETF del sector (XLC) también cede un 6 % y el S&P 500 sube. Beta mensual a 5 años de 1,60 y caída máxima del 75,9 % en 2021-2022 [${fyh}, ${fhey}].`;
const m = b.contexto.movimiento;
Object.assign(m, { fecha: '2026-10-27', var_1m_pct: -9.7, var_3m_pct: -15.1, var_6m_pct: -32.2, var_12m_pct: -42.9, dist_max_52s_pct: -46.0, dist_min_52s_pct: 0.0, dist_max_historico_pct: -53.3, tendencia: 'bajista', volatilidad_60d_pct: 35, avisos: ['P4 En mínimos de 52 semanas (0 % sobre el mínimo)', 'P5 Un 24 % por debajo de la media de 200 sesiones (tendencia bajista)'] });
delete m.reaccion_resultados;
m.reaccion_resultados = `Tras el 3T26: −5,3 % el 21-oct (65,04 USD, volumen de 100,9 M de acciones frente a 36,6 M de media), +3,1 % el 22-oct, y 65,85, 63,90 y 62,52 USD del 23 al 27-oct; −9,0 % desde el cierre previo a los resultados (68,69) [${fyh}, ${fhey}].`;
b.contexto.movimientos_fuertes = [
  ...b.contexto.movimientos_fuertes,
  { periodo: '21-27 oct 2026', var_pct: -9.0, causa: `Resultados del 3T26 con la guía de 2026 rebajada por la publicidad (≈2.700 M frente a ≈3.000 M) y un 4T por debajo del consenso (BPA de 0,67 frente a 0,73): −5,3 % el 21-oct; del 23 al 27-oct sigue bajando sin noticia propia, con el sector de comunicación (XLC) también a la baja (−6 % en la semana) y recortes de objetivos (media de 91,39 a 84,76) [${fhey}, ${fwrap}, ${fyq}].`, veredicto: 'no cambia', condicion: null },
];
const nts = b.contexto.noticias;
nts[0].veredicto = 'no cambia'; nts[0].condicion = null;
nts[0].hecho = nts[0].hecho.replace('La acción cae un 5,8 % fuera de horas', 'La acción cae un 5,3 % el 21-oct');
nts.unshift(
  { fecha: '2026-10-26', tipo: 'directivos', hecho: `El consejero Bradford L. Smith ejerce 17.980 opciones y vende 11.980 acciones a 63,55 USD (≈0,76 M USD) con un plan 10b5-1 adoptado el 24-jul; venta pequeña y programada [${ff4}].`, veredicto: 'no cambia', condicion: null },
  { fecha: '2026-10-21', tipo: 'recomendación', hecho: `Tras el 3T26, recortes de objetivo sin rebajas de recomendación: UBS 115 → 110, Seaport 90 → 85, Guggenheim 80 → 78; Jefferies 85, Deutsche Bank 93 y TD Cowen 100 (todos comprar). Objetivo medio de 91,39 a 84,76 USD [${fwrap}, ${fyq}].`, veredicto: 'no cambia', condicion: null },
);
b.contexto.veredicto = 'no cambia';
b.contexto.condicion = null;
b.contexto.comentario = `La acción está en tendencia bajista (−24 % bajo la media de 200 sesiones, −42,9 % en 12 meses) y en el mínimo de 52 semanas, avisos P4 y P5. Cada caída fuerte tiene causa conocida: cuatro guías seguidas por debajo de lo esperado, la puja por Warner Bros. y rebajas de recomendación. Tras el 3T26 el consenso ya recoge la guía (BPA de 2027e −1,1 %, objetivo medio −7,3 %) y el precio cae un 9 % desde el día de los resultados. No hay ampliaciones, colocaciones, ofertas ni litigios materiales pendientes; las ventas de directivos son pequeñas y programadas. Ningún hecho pendiente retrasa ni descarta: el veredicto es «no cambia» y los próximos resultados (≈19-ene-2027) no aplazan nada (regla 11) [${fyh}, ${fyq}, ${ff4}].`;

// Comparables llevados del 20 al 27-oct con la variación de precio (estimación propia; Spotify publicó su 3T26 el 21-oct y su BPA no está revisado aquí).
const px = { DIS: [111.67, 110.23], CMCSA: [22.36, 21.84], FOXA: [67.0, 64.53], SPOT: [526.08, 555.45], ROKU: [157.57, 156.66], TKO: [179.64, 172.18] };
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
for (const e of D.comparables.empresas) {
  const p = px[e.ticker]; if (!p) continue;
  const f = p[1] / p[0];
  const capEv = e.dn_ebitda != null && e.ev_ebitda_ltm ? 1 - e.dn_ebitda / e.ev_ebitda_ltm : 1;
  const fev = 1 + (f - 1) * capEv;
  e.capitalizacion = Math.round(e.capitalizacion * f);
  if (e.per_ntm != null) e.per_ntm = r1(e.per_ntm * f);
  if (e.fcf_yield_pct != null) e.fcf_yield_pct = r1(e.fcf_yield_pct / f);
  for (const k of ['ev_ventas']) if (e[k] != null) e[k] = r2(e[k] * fev);
  for (const k of ['ev_ebitda_ltm', 'ev_ebitda_ntm']) if (e[k] != null) e[k] = r1(e[k] * fev);
}
D.comparables.extra.notas.unshift(`Llevados del cierre del 20-oct al del 27-oct con la variación del precio de cada uno (estimación propia): capitalización, PER y rentabilidad por flujo libre con la variación de la capitalización; múltiplos del valor empresa con la misma variación absoluta del valor empresa. Spotify publicó su 3T26 el 21-oct (+11 % el 22-oct): sus estimaciones no están revisadas aquí, solo el precio. Cotizaciones de Yahoo [${fyh}].`);

// Puente: confirmado con el 10-Q
D.valoracion.extra.notas[0] = `Puente del balance a 30-sep-2026 del 10-Q: deuda contable de 15.132 M (2.475 M a corto y 12.658 M a largo, neta de 59 M de costes de emisión y con −145 M de ajuste por coberturas de valor razonable); caja de 8.194 M e inversiones a corto de 29 M (8.223 M) [${f10q}].`;
D.valoracion.extra.notas = D.valoracion.extra.notas.map((n) => n.startsWith('Tesoro de EE. UU.') ? `Tesoro de EE. UU. a 10 años: 4,99 % el 27-oct-2026 (curva diaria del Tesoro; 5,13 % el 21-oct) [${ftes}].` : n);
D._estado = 'terminado (actualizado al 28-oct)';
guardar('D.json', D);

// ---------- C: directivos (insiders) ----------
const C = leer('C.json');
const cf4 = nueva(C, { titulo: 'Form 4 y Form 144 de Bradford L. Smith (consejero), 26-27 oct 2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: 'https://www.sec.gov/Archives/edgar/data/1065280/000119311926000003/xslF345X06/wk-form4_1793132405.xml' });
C.gobierno.insiders.unshift({ fecha: '2026-10-26', persona: `Bradford L. Smith (consejero; ejercicio de opciones y venta con plan 10b5-1) [${cf4}]`, operacion: 'Venta', acciones: 11980, importe: 0.76 });
guardar('C.json', C);

// ---------- E: sentimiento (actualización corta) ----------
const E = leer('E.json');
const est = nueva(E, { titulo: 'Stocktwits, flujo de mensajes de NFLX (API pública), 28-oct-2026', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-28', url: 'https://api.stocktwits.com/api/2/streams/symbol/NFLX.json' });
E.sentimiento.revisadas.unshift({ plataforma: 'Stocktwits (flujo de mensajes de NFLX, 27-28 oct)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: `Tras el mínimo de 52 semanas, 9 mensajes marcados alcistas y 2 bajistas de 30: muchos «compran la caída» y esperan rebote, otros hablan de «cuchillo que cae» desde hace un año, de ventas para compensar pérdidas fiscales y de que sobra uno de los dos consejeros delegados; algunos piden que la empresa recompre más barato [${est}].` });
E.sentimiento.lectura = (E.sentimiento.lectura ?? '') + ` Una semana después de los resultados (28-oct) el tono de los particulares es de cansancio más que de pánico: compran la caída sin cifras nuevas que lo apoyen, mientras los analistas recortan objetivos sin rebajar la recomendación [${est}].`;
guardar('E.json', E);
console.log('Notas C, D y E actualizadas');
