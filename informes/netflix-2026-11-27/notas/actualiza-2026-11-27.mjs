// Pone al día las notas C, D y E (copiadas del 28-oct) para el corte del 27-nov-2026. Se ejecuta una vez:
// node informes/netflix-2026-11-27/notas/actualiza-2026-11-27.mjs
// A y B no cambian: no hay resultados nuevos desde el 3T26 (carta del 20-oct y 10-Q del 21-oct), y el XBRL anual
// (cuentas.mjs del 27-nov) da las mismas series 2016-2025.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
const guardar = (f, o) => writeFileSync(join(dir, f), JSON.stringify(o, null, 2) + '\n');
const nueva = (nota, f) => { const id = Math.max(...nota.fuentes.map((x) => x.id)) + 1; nota.fuentes.push({ id, ...f }); return id; };
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;

// ---------- D: mercado y valoración ----------
const D = leer('D.json');
const B = leer('bolsa.json');
const comp = JSON.parse(readFileSync('/tmp/claude-0/tanda-1127/netflix/comp.json', 'utf8'));

const fyq = nueva(D, { titulo: 'NFLX: quoteSummary (earningsTrend, financialData, recommendationTrend, upgradeDowngradeHistory), 27-nov-2026', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/NFLX/analysis/' });
const fyh = nueva(D, { titulo: 'Históricos diarios de NFLX, SPY, XLC (bolsa.mjs, movimiento.mjs; cierre del 25-nov-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://finance.yahoo.com/quote/NFLX/history/' });
const ftes = nueva(D, { titulo: 'Daily Treasury Par Yield Curve Rates 2026 (CSV, 25-nov-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026' });
const ferp = nueva(D, { titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' });
const ff4 = nueva(D, { titulo: 'Form 4 de Sarandos, Peters, Neumann, Hyman y Willems (3-10 nov 2026) y Form 144 del 4 y 9-nov', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-10', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001065280&type=4' });
const fcomp = nueva(D, { titulo: 'quoteSummary de DIS, CMCSA, FOXA, SPOT, ROKU y TKO (precio, valor empresa, ventas y EBITDA de 12 meses, consenso de BPA y ventas), 27-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/DIS/analysis/' });
const fbce = nueva(D, { titulo: 'Tipos de cambio de referencia del euro, 26-nov-2026 (1,0975 USD/EUR)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-11-26', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' });
const ffool = nueva(D, { titulo: 'Netflix Stock Is Down 36% and Wall Street Keeps Downgrading It. History Says That\'s a Mistake.', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-11-20', url: 'https://www.fool.com/investing/2026/11/20/netflix-stock-is-down-36-and-wall-street-keeps-dow/' });
const ftk = nueva(D, { titulo: 'Netflix Inc Stock (NFLX) Closed Down by 3.28% on Nov 6: A Full Analysis', editor: 'TradingKey', tipo: 'Prensa', fecha: '2026-11-06', url: 'https://www.tradingkey.com/news/market-movers/262293698-market-movers-nflx-20261106' });
const fnbcu = nueva(D, { titulo: 'Netflix Could Buy NBCUniversal After Losing Warner Bros. to Skydance (con enlace al informe de Variety)', editor: 'Geeks + Gamers / Variety', tipo: 'Prensa', fecha: '2026-11-14', url: 'https://geeksandgamers.com/netflix-could-buy-nbcuniversal-after-losing-warner-bros-to-skydance/' });
const fwc = nueva(D, { titulo: 'Netflix, Fox and the $2bn bid for the 2030 World Cup that could reshape live sports', editor: 'Irish Examiner', tipo: 'Prensa', fecha: '2026-11-19', url: 'https://www.irishexaminer.com/sport/business-of-sport/arid-41939670.html' });
const fpsq = nueva(D, { titulo: 'Bill Ackman Adds More To Netflix In Q3; Exits Hertz, Cuts Microsoft (13F de Pershing Square del 3T26)', editor: 'Stocktwits News', tipo: 'Prensa', fecha: '2026-11-14', url: 'https://stocktwits.com/news-articles/markets/equity/bill-ackman-adds-more-to-netflix-in-q3-exits-hertz-cuts-microsoft/cNbaf33R9gj' });
const frad = nueva(D, { titulo: 'Netflix buys Hollywood\'s Radford Studios for $380M (titular del flujo de noticias de NFLX)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-11-25', url: 'https://seekingalpha.com/api/sa/combined/NFLX.xml' });

const id = D.identificacion;
Object.assign(id, {
  precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio,
  acciones: 4167.0, capitalizacion_publicada: 243957,
  max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
  proximos_resultados: '2027-01-19',
});
id.volumen_medio_diario = `≈ ${Math.round(B.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M USD/día (3 meses)`;
id.extra.notas = [
  `Precio: cierre del 25-nov-2026 (59,41 USD), último cierre a la fecha de corte: el 26-nov la bolsa de Nueva York cerró por Acción de Gracias y la sesión corta del 27-nov no había abierto a la hora del análisis [${fyh}].`,
  `Acciones diluidas: 4.167,0 M = 4.106,3 M en circulación a 30-sep-2026 (10-Q) + 60,7 M de efecto dilutivo (media del 3T); no hay balance posterior. Las recompras del 4T no se restan hasta que se publiquen [${fyq}].`,
  `Capitalización publicada: 243.957 M en Yahoo Finance al cierre del 25-nov, con 4.106,3 M de acciones [${fyq}].`,
  `Máximo y mínimo de 52 semanas del histórico ajustado de Yahoo (bolsa.mjs): 109,73 USD (2-dic-2025) y 56,56 USD (20-nov-2026) [${fyh}].`,
  `Próximos resultados (4T26): fecha aún no anunciada; estimación propia del 19-ene-2027 (los del 4T25 se publicaron el 20-ene-2026). Traerán la guía de 2027.`,
];

// Consenso (Yahoo 27-nov; MarketScreener no se reabre: Yahoo va al día y no hay resultados nuevos)
const c = D.consenso;
c.estimaciones = [
  { periodo: '2026e', ingresos: 51126, ebitda: 17059, ebit: 16206, bpa: 3.572, dpa: 0, fuente: `Yahoo 27-nov: BPA 3,572 con 38 analistas y ventas de 51.126 M [${fyq}]; EBITDA y EBIT de MarketScreener del 28-oct` },
  { periodo: '2027e', ingresos: 56584, ebitda: 19719, ebit: 18860, bpa: 3.765, dpa: 0, fuente: `Yahoo 27-nov: BPA 3,765 con 44 analistas y ventas de 56.584 M [${fyq}]; EBITDA y EBIT de MarketScreener del 28-oct` },
  { periodo: '2028e', ingresos: 62249, ebitda: 22743, ebit: 21796, bpa: 4.487, dpa: 0, fuente: 'MarketScreener (28-oct); sin cambios posteriores conocidos' },
];
c.recomendaciones = { n_analistas: 51, comprar: 33, mantener: 16, vender: 2, po_medio: 84.55, po_min: 57, po_max: 126 };
c.revisiones = `Desde el 28-oct el consenso apenas se mueve. Según Yahoo (27-nov), el BPA de 2027e pasa de 3,767 a 3,765 (de 3,816 hace 90 días: −1,3 %), con 11 revisiones al alza y 25 a la baja en 30 días; el del 4T26 queda en 0,676, ya en la guía de 0,67 (de 0,730 hace 90 días); el de 2026e en 3,572. Las ventas de 2027e, 56.584 M (+10,7 %). El objetivo medio de 43 analistas es de 84,55 USD (84,76 el 28-oct; mediana 82, mínimo 57 y máximo 126). No hay cambios de recomendación ni de objetivo registrados después del 22-oct: el último, Wolfe Research, de mejor que el mercado a neutral el 22-oct; antes, Needham a mantener el 21-oct [${fyq}, ${ffool}].`;
c.extra = c.extra ?? {}; c.extra.notas = [
  ...(c.extra.notas ?? []).filter((n) => /EBITDA de MarketScreener de 2025|comisión de ruptura/.test(n)),
  `Recomendaciones (Yahoo, nov-2026): 7 compra fuerte, 26 compra, 16 mantener y 2 venta (51); objetivo medio 84,55, mediana 82, mínimo 57 y máximo 126 USD con 43 objetivos [${fyq}].`,
];

// Bolsa
const b = D.bolsa;
Object.assign(b, {
  rentabilidades: B.bolsa.rentabilidades, anual: B.bolsa.anual, beta: B.bolsa.beta,
  volatilidad_pct: B.bolsa.volatilidad_pct, max_drawdown_pct: B.bolsa.max_drawdown_pct, tramo_drawdown: B.bolsa.tramo_drawdown,
  posicion_corta_pct: 2.21,
});
b.extra.notas = [
  `Betas frente al SPY (cierre del 25-nov): mensual a 5 años 1,58; semanal a 5 años 1,37; semanal a 2 años 0,90. La de 2 años, muy inferior, refleja la caída propia de la acción con el mercado al alza en 2026, no menos riesgo [${fyh}].`,
  `Mayores caídas diarias en 12 meses: −9,7 % el 17-abr-2026, −7,3 % el 17-jul-2026, −5,8 % el 22-jun-2026, −5,3 % el 4-sep-2026 y −5,3 % el 21-oct-2026; ninguna de más del 5 % desde el informe anterior [${fyh}].`,
  `Volatilidad diaria anualizada de un año del 35,8 % (35 % en 60 sesiones según movimiento.mjs) [${fyh}].`,
  `Posición corta: 2,21 % del flotante según Yahoo (noviembre) [${fyq}].`,
  `Rentabilidad total: −36,6 % en 2026 frente al +5,9 % del SPY y −9,7 % del XLC; −44,0 % en un año. Del 27-oct al 25-nov: NFLX −5,0 %, SPY −6,9 %, XLC +1,7 % [${fyh}].`,
];
b.comentario = `Netflix pierde un 36,6 % en 2026 frente al +5,9 % del S&P 500 y el −9,7 % del sector de comunicación, y un 44,0 % en un año. La caída tiene causas conocidas y casi toda es anterior al informe del 28-oct: cuatro guías seguidas por debajo de lo esperado (3T25, 1T26, 2T26 y 3T26), la puja por Warner Bros. en diciembre, la salida de Reed Hastings del consejo y rebajas de Wells Fargo, HSBC, Needham y Wolfe. Desde el 27-oct la acción cae un 5,0 % (62,52 → 59,41 USD), menos que el S&P 500 (−6,9 %) en una corrección general (−4,4 % el 5-nov y −3,6 % el 20-nov en el SPY), y toca un mínimo de 56,73 USD de cierre el 20-nov. Beta mensual a 5 años de 1,58 y caída máxima del 74,9 % en 2021-2022 [${fyh}, ${ftk}].`;

const mv = b.contexto.movimiento;
Object.assign(mv, { fecha: '2026-11-25', var_1m_pct: -5.0, var_3m_pct: -25.6, var_6m_pct: -31.2, var_12m_pct: -44.5, dist_max_52s_pct: -45.7, dist_min_52s_pct: 4.7, dist_max_historico_pct: -55.6, tendencia: 'bajista', volatilidad_60d_pct: 35, avisos: ['P5 Un 25 % por debajo de la media de 200 sesiones (tendencia bajista)'] });
mv.reaccion_resultados = `Sin resultados desde el informe anterior. Tras el 3T26 (20-oct): −5,3 % el 21-oct y −9,0 % hasta el 27-oct; del 27-oct al 25-nov, −5,0 % más (rebote a 66,39 USD el 4-nov y mínimo de cierre de 56,73 el 20-nov) [${fyh}].`;
b.contexto.movimientos_fuertes = [
  ...b.contexto.movimientos_fuertes,
  { periodo: '4-20 nov 2026', var_pct: -14.6, causa: `De 66,39 a 56,73 USD sin noticia propia de la empresa: el S&P 500 cae un 10,0 % en esos días (−4,4 % el 5-nov y −3,6 % el 20-nov) y el XLC un 4,7 %; el 6-nov (−3,3 %) la prensa lo atribuye a la rotación fuera de los valores de crecimiento y a la toma de beneficios en el sector. Rebota a 59,41 el 25-nov. Desde el informe anterior, −5,0 % frente al −6,9 % del S&P 500 [${fyh}, ${ftk}].`, veredicto: 'no cambia', condicion: null },
];
const nts = b.contexto.noticias;
nts.unshift(
  { fecha: '2026-11-25', tipo: 'fusión u oferta', hecho: `Cierra la compra de Radford Studio Center (Los Ángeles) por ≈ 380 M USD, anunciada en abril; es la operación inmobiliaria del 4T que ya rebajó la guía de flujo libre de 2026 a ≈ 12.000 M [${frad}].`, veredicto: 'no cambia', condicion: null },
  { fecha: '2026-11-19', tipo: 'rumor', hecho: `Netflix presenta oferta en la primera ronda por los derechos del Mundial de 2030 en EE. UU. (inglés y español juntos); la prensa la da como favorita y el precio esperado es de 1.500-2.000 M USD (Fox pagó 485 M por los de 2026 en inglés). Decisión en semanas; es un coste de contenidos de un torneo en 2030, ≈ 1 % de un año de inversión en contenidos [${fwc}].`, veredicto: 'no cambia', condicion: null },
  { fecha: '2026-11-14', tipo: 'accionista de referencia', hecho: `13F de Pershing Square (Bill Ackman) del 3T26: sube de ≈ 13,1 M a ≈ 15,4 M de acciones de Netflix a 30-sep; no vende [${fpsq}].`, veredicto: 'no cambia', condicion: null },
  { fecha: '2026-11-14', tipo: 'rumor', hecho: `Variety sitúa a Netflix entre los posibles compradores de NBCUniversal, que Comcast separa del grupo; no hay oferta ni conversaciones confirmadas. Tras Warner (rescindida en febrero con 2.800 M de comisión a favor de Netflix) y Roku (no pujó), la dirección ha dicho que solo compraría «al precio adecuado». Una compra grande sería un riesgo de asignación de capital y de deuda, no un hecho pendiente con fecha [${fnbcu}].`, veredicto: 'no cambia', condicion: 'Si Netflix anuncia una oferta por NBCUniversal u otro estudio grande, rehacer el informe antes de ampliar.' },
  { fecha: '2026-11-03', tipo: 'directivos', hecho: `Entregas de acciones restringidas a los dos consejeros delegados, el director financiero, el jurídico y el de asuntos globales: retienen acciones para impuestos y venden después el neto (Sarandos 27.312 acciones a 66,20 USD, 1,81 M; Peters 27.312 a 63,62, 1,74 M; Neumann 0,61 M; Hyman 0,37 M). Son ventas del neto entregado, pequeñas frente a sus posiciones; ninguna compra [${ff4}].`, veredicto: 'no cambia', condicion: null },
);
b.contexto.proximos_resultados = '2027-01-19';
b.contexto.veredicto = 'no cambia';
b.contexto.condicion = null;
b.contexto.comentario = `La acción sigue en tendencia bajista (−25 % bajo la media de 200 sesiones, −44,5 % en 12 meses; aviso P5), a un 4,7 % de su mínimo de 52 semanas (56,56 USD el 20-nov). Desde el informe del 28-oct cae un 5,0 %, menos que el S&P 500 (−6,9 %), sin noticia propia: ni resultados, ni cambios de guía, ni rebajas de recomendación (la última, el 22-oct), y el consenso de BPA de 2027e está igual (3,765). Lo nuevo es menor: ventas del neto de acciones entregadas a directivos, Pershing Square que sube su posición, el cierre de la compra de Radford (ya en la guía), la puja por el Mundial de 2030 y el rumor sobre NBCUniversal, sin oferta. No hay ampliaciones, colocaciones ni litigios pendientes. Veredicto «no cambia»; los resultados del ≈19-ene-2027 no aplazan nada (regla 11) [${fyh}, ${fyq}, ${ff4}, ${fnbcu}].`;

// Comparables rehechos al 25-nov con Yahoo (precio, valor empresa, ventas y EBITDA de 12 meses, consenso de BPA y ventas).
// NTM (dic-26 a nov-27): año natural 1/12 × 2026e + 11/12 × 2027e; Disney (cierre en septiembre) 10/12 × FY27e + 2/12 × FY28e;
// Fox (cierre en junio) 7/12 × FY27e + 5/12 × FY28e. EV/EBITDA NTM = valor empresa ÷ (EBITDA LTM × ventas NTM / ventas LTM), estimación propia.
const pesoNtm = { DIS: [10 / 12, 2 / 12], FOXA: [7 / 12, 5 / 12] };
const fx = { SPOT: 1.0975 };
const prev = Object.fromEntries(D.comparables.empresas.map((e) => [e.ticker, { ...e }]));
const precio27oct = { ROKU: 156.66, TKO: 172.18 };
for (const e of D.comparables.empresas) {
  const q = comp[e.ticker]; if (!q) continue;
  const [w0, w1] = pesoNtm[e.ticker] ?? [1 / 12, 11 / 12];
  const k = fx[e.ticker] ?? 1; // Spotify: cuentas y consenso en EUR, cotización en USD
  e.capitalizacion = Math.round(q.cap);
  if (e.ticker === 'TKO' || e.ticker === 'ROKU') {
    // Yahoo no da un valor empresa coherente para TKO (no suma los minoritarios) ni BPA de consenso para Roku:
    // los múltiplos del valor empresa se llevan del 27-oct con la variación del precio (estimación propia).
    const f = q.precio / precio27oct[e.ticker];
    const p = prev[e.ticker];
    const capEv = p.dn_ebitda != null && p.ev_ebitda_ltm ? 1 - p.dn_ebitda / p.ev_ebitda_ltm : 1;
    const fev = 1 + (f - 1) * capEv;
    e.ev_ventas = r2(p.ev_ventas * fev); e.ev_ebitda_ltm = r1(p.ev_ebitda_ltm * fev); e.ev_ebitda_ntm = r1(p.ev_ebitda_ntm * fev);
    if (e.ticker === 'TKO') e.per_ntm = r1(q.precio / (w0 * q.y0.bpa + w1 * q.y1.bpa));
    else e.per_ntm = r1(p.per_ntm * f);
    e.fcf_yield_pct = r1(p.fcf_yield_pct / f);
    continue;
  }
  const vNtm = w0 * q.y0.ventas + w1 * q.y1.ventas;
  const bpaNtm = w0 * q.y0.bpa + w1 * q.y1.bpa;
  e.ev_ventas = r2(q.ev_ventas / k);
  e.ev_ebitda_ltm = r1(q.ev_ebitda_ltm / k);
  e.ev_ebitda_ntm = r1(q.ev / k / (q.ebitda_ltm * vNtm / q.ingresos_ltm));
  e.per_ntm = r1(q.precio / k / bpaNtm);
  e.crecimiento_pct = r1((vNtm / q.ingresos_ltm - 1) * 100);
  e.margen_ebitda_pct = r1(q.margen_ebitda);
  e.dn_ebitda = r2((q.deuda - q.caja) / q.ebitda_ltm);
  // El flujo libre de Yahoo es «apalancado» y no casa con el publicado: se lleva el del informe anterior con la variación de la capitalización.
  e.fcf_yield_pct = r1(prev[e.ticker].fcf_yield_pct * prev[e.ticker].capitalizacion / q.cap);
  if (e.ticker === 'FOXA') {
    // Fox: las ventas de 12 meses de Yahoo no recogen bien el calendario deportivo (FY27 con la Super Bowl): crecimiento y EV/EBITDA NTM del informe anterior, este con la variación del valor empresa.
    const p = prev.FOXA; e.crecimiento_pct = p.crecimiento_pct; e.ev_ebitda_ntm = r1(p.ev_ebitda_ntm * e.ev_ebitda_ltm / p.ev_ebitda_ltm);
  }
}
D.comparables.extra.notas = [
  `Rehechos al cierre del 25-nov-2026 con Yahoo Finance (27-nov): capitalización, valor empresa, ventas y EBITDA de los últimos 12 meses (a sep-2026; Disney a su ejercicio cerrado el 3-oct-2026) y consenso de BPA y ventas de los dos próximos ejercicios [${fcomp}]. Próximos 12 meses (dic-2026 a nov-2027): 1/12 de 2026e + 11/12 de 2027e en los de año natural; Disney 10/12 de FY27e + 2/12 de FY28e; Fox 7/12 de FY27e + 5/12 de FY28e. El EV/EBITDA de los próximos 12 meses es el valor empresa entre el EBITDA de 12 meses escalado por el crecimiento de ventas esperado (estimación propia: no hay consenso de EBITDA gratuito de la misma fuente).`,
  `Spotify publica en euros: ventas, EBITDA, BPA y flujo libre convertidos con el tipo del BCE del 26-nov-2026 (1,0975 USD/EUR) [${fbce}].`,
  `TKO: Yahoo no da un valor empresa coherente (no suma los minoritarios de Endeavor) y Roku no tiene consenso de BPA en Yahoo: sus múltiplos del valor empresa (y el PER de Roku) se llevan del 27-oct con la variación del precio (estimación propia); el PER de TKO sí sale del consenso de Yahoo [${fcomp}].`,
  `Rentabilidad por flujo libre: la del informe anterior con la variación de la capitalización (el flujo libre de Yahoo es «apalancado» y no casa con el publicado). Fox: crecimiento y EV/EBITDA de los próximos 12 meses del informe anterior (el de Yahoo mezcla el calendario deportivo), este llevado con su valor empresa (estimación propia).`,
  `ROIC del último ejercicio de cada uno sin cambios frente al informe anterior (Disney y Fox, de sus ejercicios a sep-2025 y jun-2026).`,
];

// Puente: sin balance nuevo
D.valoracion.extra.notas = D.valoracion.extra.notas.map((n) => {
  if (n.startsWith('Tesoro de EE. UU.')) return `Tesoro de EE. UU. a 10 años: 4,85 % el 25-nov-2026 (curva diaria del Tesoro; 4,99 % el 27-oct) [${ftes}].`;
  if (n.startsWith('Prima de riesgo implícita')) return `Prima de riesgo implícita del S&P 500 de Damodaran de noviembre de 2026: 4,41 % (4,20 % en octubre) [${ferp}].`;
  if (n.startsWith('Puente del balance')) return n + ' No hay balance posterior: el 4T26 se publica en enero. Desde el 30-sep, recompras del 4T (no publicadas) y compra de Radford (≈ 380 M, 25-nov) [' + frad + '].';
  return n;
});
D.valoracion.referencia_mercado = { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: `Damodaran, ERP by month, nov-2026 [${ferp}]` };
D.multiplos_historicos.comentario = (D.multiplos_historicos.comentario ?? '');
D._estado = 'terminado (actualizado al 27-nov)';
guardar('D.json', D);

// ---------- C: directivos (insiders) y accionistas ----------
const C = leer('C.json');
const cf4 = nueva(C, { titulo: 'Form 4 de Sarandos, Peters, Neumann, Hyman y Willems (3-10 nov 2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-10', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001065280&type=4' });
const cpsq = nueva(C, { titulo: 'Bill Ackman Adds More To Netflix In Q3 (13F de Pershing Square del 3T26)', editor: 'Stocktwits News', tipo: 'Prensa', fecha: '2026-11-14', url: 'https://stocktwits.com/news-articles/markets/equity/bill-ackman-adds-more-to-netflix-in-q3-exits-hertz-cuts-microsoft/cNbaf33R9gj' });
C.gobierno.insiders.unshift(
  { fecha: '2026-11-04 a 2026-11-09', persona: `Ted Sarandos y Greg Peters (co-consejeros delegados; venta del neto de acciones restringidas entregadas el 3-nov, fuera de plan) [${cf4}]`, operacion: 'Venta', acciones: 54624, importe: 3.55 },
  { fecha: '2026-11-04', persona: `Spencer Neumann (director financiero) y David Hyman (director jurídico): venta del neto entregado el 3-nov [${cf4}]`, operacion: 'Venta', acciones: 14980, importe: 0.98 },
);
C.gobierno.accionistas.splice(3, 0, { nombre: 'Pershing Square Capital Management', pct: 0.37, tipo: 'Fondo activo', variacion: `≈ 15,4 M de acciones a 30-sep-2026 (13F del 3T26), desde ≈ 13,1 M a 30-jun; entró en el 2T26 [${cpsq}]` });
guardar('C.json', C);

// ---------- E: sentimiento ----------
const E = leer('E.json');
const est = nueva(E, { titulo: 'Stocktwits, flujo de mensajes de NFLX (API pública), 26-27 nov 2026', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://api.stocktwits.com/api/2/streams/symbol/NFLX.json' });
const esa = nueva(E, { titulo: 'Seeking Alpha, artículos y noticias de NFLX (feed), 28-oct a 26-nov 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-26', url: 'https://seekingalpha.com/api/sa/combined/NFLX.xml' });
const efool = nueva(E, { titulo: 'The Motley Fool, piezas de opinión sobre Netflix del 10 al 24-nov-2026', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-11-24', url: 'https://www.fool.com/investing/2026/11/24/netflix-stock-is-down-37-in-2026-but-the-business-is-still-growing-heres-why-id-buy-it-before-the-end-of-november/' });
E.sentimiento.revisadas = [
  { plataforma: 'Stocktwits (flujo de mensajes de NFLX, 26-27 nov)', fecha: '2026-11', n_comentarios: 30, tono: 'Negativo', resumen: `Un mensaje de la cuenta de Netflix en X el día de Acción de Gracias desata quejas, amenazas de cancelar y ataques a la gestión («dos consejeros delegados», «lo hunden desde dentro»), con comparaciones con Disney en máximos; una minoría compra la caída y espera volver a 65-70 USD. 5 mensajes alcistas y 4 bajistas etiquetados de 30 [${est}].` },
  { plataforma: 'Seeking Alpha (artículos de análisis, 28-oct a 26-nov)', fecha: '2026-11', n_comentarios: 12, tono: 'Dividido', resumen: `Conviven rebajas por el problema de visionado en EE. UU. y porque «las subidas de precio ya no dan recorrido sin límite» con subidas de recomendación por precio («punto de entrada de ensueño», «alcista a 15 veces beneficios», «suscriptores fieles mal valorados») [${esa}].` },
  { plataforma: 'The Motley Fool (piezas del 10 al 24-nov)', fecha: '2026-11', n_comentarios: 6, tono: 'Positivo', resumen: `Mayoría de piezas que compran: «Wall Street sigue rebajándola y la historia dice que es un error» (2011 y 2022), «baja un 37 % pero el negocio sigue creciendo»; reconocen el freno del visionado y la competencia de YouTube [${efool}].` },
  ...E.sentimiento.revisadas.slice(0, 5),
];
E.sentimiento.tono = 'Dividido';
E.sentimiento.tendencia = 'Empeora';
E.sentimiento.lectura = `Un mes después de los resultados, los analistas profesionales y los articulistas se han vuelto más compradores por precio (15-16 veces el BPA de 2027e), mientras los particulares de Stocktwits pasan del cansancio al enfado: la conversación del 26-27 de noviembre gira en torno a un mensaje de la marca en redes y a la gestión, no a cifras. Es ruido de reputación que no vemos en los datos (las bajas cayeron en el 3T26 según la empresa), pero conviene vigilar si se convierte en cancelaciones: la señal sería un 4T26 por debajo de los 13.442 M guiados. No hay capitulación de los grandes: Pershing Square sube su posición [${est}, ${esa}, ${efool}].`;
guardar('E.json', E);
console.log('Notas C, D y E actualizadas');
