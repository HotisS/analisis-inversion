// Actualiza D.json (del 28-oct) al corte del 6-nov-2026, tras los resultados del 3T26.
// Uso: node informes/zoetis-2026-11-06/notas/D-actualizar.mjs  (parte siempre de D-28oct.json)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const origen = path.join(dir, 'D-28oct.json');
if (!fs.existsSync(origen)) fs.copyFileSync(path.join(dir, 'D.json'), origen);
const d = JSON.parse(fs.readFileSync(origen, 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

// Identificación: cierre del 5-nov (la sesión del 6 no ha abierto a la hora del corte, 09:30 de Madrid).
Object.assign(d.identificacion, {
  precio: b.identificacion.precio, fecha_precio: b.identificacion.fecha_precio,
  max_52s: b.identificacion.max_52s, min_52s: b.identificacion.min_52s,
  acciones: 407.6,
  capitalizacion_publicada: Math.round(82.11 * 407.6),
  volumen_medio_diario: '≈ 362 M USD/día (4,79 M de acciones; 3 meses)',
  proximos_resultados: '2027-02',
});

// Fuentes: se ponen al día las de mercado y se añaden las nuevas (48-56).
const f = Object.fromEntries(d.fuentes.map((x) => [x.id, x]));
f[4].fecha = '2026-11-05';
f[4].titulo = 'Históricos diarios de ZTS, SPY, XLV y comparables (cierres hasta el 5-nov-2026)';
f[7].fecha = '2026-11-06';
f[7].titulo = 'Zoetis Inc.: estimaciones financieras anuales 2023-2028 (sin actualizar tras el 3T26 a 6-nov)';
f[10].fecha = '2026-11-06';
f[43].fecha = '2026-11-06';

d.fuentes.push(
  { id: 48, titulo: 'Zoetis Inc. Form 10-Q del tercer trimestre de 2026 (30-sep-2026): balance, deuda, acciones y valor razonable de la deuda', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000050/zts-20260930.htm' },
  { id: 49, titulo: 'Zoetis Announces Third Quarter 2026 Results; Narrows Full Year 2026 Revenue Guidance, Raises Full Year 2026 Adjusted EPS Guidance (8-K, anexo 99.1)', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000048/exhibit99q32026.htm' },
  { id: 50, titulo: 'Daily Treasury Par Yield Curve Rates, 2026 (CSV; 10 años = 4,84 % el 5-nov-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-11-05', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026&page&_format=csv' },
  { id: 51, titulo: 'ICE BofA BBB US Corporate Index Effective Yield (BAMLC0A4CBBBEY), 4-nov-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-11-04', url: 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=BAMLC0A4CBBBEY' },
  { id: 52, titulo: 'Earnings Flash (ZTS) Zoetis Inc. Reports Q3 Revenue $2.39B, vs. FactSet Est of $2.30B', editor: 'MarketScreener (MT Newswires)', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://www.marketscreener.com/quote/stock/ZOETIS-INC-12482719/news/' },
  { id: 53, titulo: 'Zoetis Inc. Form 8-K de 8-oct-2026: dividendo del 4T26 de 0,53 USD, registro el 30-oct y pago el 1-dic', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000042/zts-20261008.htm' },
  { id: 54, titulo: 'Zoetis (ZTS) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.fool.com/earnings/call-transcripts/2026/11/05/zoetis-zts-q3-2026-earnings-call-transcript/' },
  { id: 55, titulo: 'Históricos diarios de SPY, XLV, IDXX, ELAN, PAHC, NEOG, VIRP.PA, VETO.PA y EURUSD (chart API, 27-oct a 5-nov-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-05', url: 'https://query1.finance.yahoo.com/v8/finance/chart/SPY?range=1mo&interval=1d' },
);

// Consenso: MarketScreener no ha actualizado tras los resultados (6-nov); Yahoo sí, en parte.
d.consenso.guidance = 'Con los resultados del 3T26, el 5 de noviembre de 2026, Zoetis **no rebajó** la guía por tercera vez: estrechó la de ingresos a 9.220-9.320 M USD (crecimiento orgánico operativo del −2 % al −1 %, antes 9.120-9.320 M y −3 % a −1 %), subió la de beneficio neto ajustado a 2.600-2.640 M USD y la de BPA ajustado a 6,25-6,35 USD (antes 6,15-6,25) [49]. La guía **contable** baja de 5,55-5,65 a 5,50-5,60 USD porque las partidas significativas pasan de unos 150 a unos 210 M (deterioro de los activos de PetMedix y despidos del programa de costes) [49]. En febrero esperaba 9.825-10.025 M y 7,00-7,10 USD ajustado [11]; en mayo, 9.680-9.960 M y 6,85-7,00 [12]; en agosto, 9.120-9.320 M y 6,15-6,25 [2]. Para 2027 no hay cifras: el director financiero dijo que se planificará con prudencia, sin suponer mejora del consumo ni de la competencia y con poca aportación de los lanzamientos, y que revisará qué métricas de guía publica; la guía llegará con el 4T26 [54]. No hay objetivos a medio plazo publicados.';
d.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 9253, ebitda: 3871, ebit: 3425, bpa: 5.62, dpa: 2.15, fuente: 'MarketScreener [7], sin actualizar tras el 3T26; BPA contable (el ajustado, 6,26 USD con 15 analistas y ventas de 9.288 M con 14, en Yahoo Finance a 6-nov [43])' },
  { periodo: '2027e', ingresos: 9396, ebitda: 3959, ebit: 3498, bpa: 6.02, dpa: 2.25, fuente: 'MarketScreener [7], sin actualizar; BPA contable (el ajustado, 6,41 USD con 15 analistas y ventas de 9.360 M con 14, en Yahoo Finance a 6-nov [43])' },
  { periodo: '2028e', ingresos: 9739, ebitda: 4074, ebit: 3669, bpa: 6.55, dpa: 2.45, fuente: 'MarketScreener [7], sin actualizar; BPA contable' },
];
d.consenso.recomendaciones = { n_analistas: 16, comprar: 5, mantener: 11, vender: 0, po_medio: 88.38, po_min: 74, po_max: 115 };
d.consenso.revisiones = 'El 3T26 batió al consenso previo: ventas de 2.391 M frente a 2.300 M (FactSet) y BPA ajustado de 1,75 frente a 1,51 USD (Yahoo, 12 analistas) [52, 43]. Aun así, el consenso de 2027 sigue bajando: en Yahoo, el BPA ajustado de 2027 pasa de 6,45 USD hace siete días y 6,54 hace 30 a **6,41 USD** (15 analistas; 7,39 hace 90 días: −13,3 %), con tres revisiones a la baja y ninguna al alza en la última semana; el de 2026 sube de 6,21 a 6,26 USD, en línea con la guía nueva [43]. El del 4T26 queda en 1,31 USD, por encima de lo que implica la guía (1,11-1,21 USD: 6,25-6,35 menos los 5,14 de nueve meses [49]): faltan rebajas por llegar. MarketScreener, la única fuente gratuita a tres años y en BPA contable, no se ha actualizado a 6-nov (5,62 / 6,02 / 6,55 USD) [7]. Recomendaciones (Yahoo): 5 compras y 11 mantener, igual que hace un mes; objetivo medio de 88,38 USD (13 analistas, de 74 a 115), mediana de 85 [43]. Antes de resultados, Morgan Stanley bajó el suyo de 85 a 82 USD (29-oct) [43].';

// Bolsa: cifras de bolsa.mjs al 5-nov.
Object.assign(d.bolsa, {
  rentabilidades: b.bolsa.rentabilidades, anual: b.bolsa.anual, beta: b.bolsa.beta,
  volatilidad_pct: b.bolsa.volatilidad_pct, max_drawdown_pct: b.bolsa.max_drawdown_pct, posicion_corta_pct: 4.8,
});
d.bolsa.comentario = 'Con dividendos, Zoetis pierde un 30 % en un año y un 33 % en 2026, mientras el S&P 500 (SPY) gana un 11 % y el sector salud (XLV) un 29 % [4]. Es su tercer año seguido por detrás del índice, y la caída máxima desde el pico de diciembre de 2021 llegó al 70 % (1-oct-2026). Cuatro sesiones de resultados concentran el daño: −13,8 % el 4-nov-2025 (rebaja de la guía de 2025) [41]; −21,5 % el 7-may-2026 (primer recorte de la de 2026) [12]; −6,0 % el 7-ago (segundo) [2]; y −7,9 % el 5-nov-2026, el día del 3T26, pese a batir al consenso, en una sesión en la que el S&P 500 cayó un 4,4 % y el XLV un 2,5 % [4, 55]. Antes, del mínimo del 2-oct (68,77 USD) al 4-nov (89,20) la acción había rebotado un 30 %. La posición corta sube al 4,8 % del capital flotante (15-oct) [43].';

// Comparables: los del 28-oct (precios del 27-oct) llevados al cierre del 5-nov con la variación de precio (Yahoo [55]).
// Virbac y Vetoquinol: Yahoo no trae la sesión del 5-nov de Euronext; se usa el cierre del 4-nov. EUR/USD 1,117 → 1,123.
const ratio = { IDXX: 670.71 / 561.25, ELAN: 23.68 / 22.65, PAHC: 35.40 / 38.38, NEOG: 11.68 / 12.47, VIRP: (360.0 / 348.5) * (1.123 / 1.117), VETO: (87.8 / 79.8) * (1.123 / 1.117) };
d.comparables.empresas = d.comparables.empresas.map((e) => {
  const r = ratio[e.ticker];
  if (!r) return e;
  const ev = e.capitalizacion / (1 - e.dn_ebitda / e.ev_ebitda_ltm);
  const k = (ev + e.capitalizacion * (r - 1)) / ev;
  const r1 = (x, n = 1) => (x == null ? null : Math.round(x * 10 ** n) / 10 ** n);
  return {
    ...e,
    capitalizacion: Math.round(e.capitalizacion * r),
    ev_ventas: r1(e.ev_ventas * k, 2), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * k),
    per_ntm: r1(e.per_ntm == null ? null : e.per_ntm * r), dn_ebitda: r1(e.dn_ebitda / k),
    fcf_yield_pct: r1(e.fcf_yield_pct / r),
  };
});

// WACC: datos de mercado al corte.
d.dcf.wacc = { ...d.dcf.wacc, tasa_libre_pct: 4.84, coste_deuda_pct: 5.96, peso_deuda_pct: 19.5 };

// Puente al 30-sep-2026 [48].
d.valoracion.puente = { fecha: '2026-09-30', deuda_financiera: 9150, arrendamientos: 7, caja: 1533, minoritarios: 0, pensiones: 71, asociadas: 0, otros_ajustes: 215 };

d.notas_integrador = {
  ...d.notas_integrador,
  precio: 'Cierre del 5-nov-2026 (82,11 USD, bolsa.mjs [4]); el 6-nov la sesión de Nueva York no ha abierto a la hora del corte.',
  acciones: '407,6 M = 407,487 M en circulación a 30-sep-2026 (balance del 10-Q [48]) + 0,1 M de efecto dilutivo (el BPA diluido del 3T26 usa 411,6 M de media, igual que el básico). Se usan las de 30-sep para que casen con la caja del puente; a 30-oct eran 406,3 M (portada del 10-Q). Los convertibles (conversión a 148,20 USD) y la capped call (cap 211,72) no diluyen al precio actual: el nominal se paga en efectivo.',
  puente: 'Deuda bruta 9.150 = nominal de los bonos a 30-sep-2026, incluidos los 2.000 M del convertible 0,25 % 2029 (valor contable 9.049; razonable 8.115) [48]. Papel comercial sin disponer. Caja 1.333 + 200 de inversiones a corto plazo [48]. Arrendamientos 7 = solo financieros (31-dic-2025 [3]); los operativos no van por ser US GAAP. Pensiones 71 = déficit de los planes de prestación definida y del supplemental savings plan a 31-dic-2025 [3], neto de impuestos. Otros ajustes 215 = dividendo del 4T26 (0,53 USD × 406,3 M de acciones) declarado el 8-oct, con registro el 30-oct y pago el 1-dic: la cotización del 5-nov ya va sin él y la caja de septiembre todavía lo incluye [53]. VitalRADS ya consolidada (155 M pagados en 9M26).',
  tasa_libre: 'Bono a 10 años del Tesoro: 4,84 % el 5-nov-2026 (CSV oficial [50]).',
  coste_deuda: '5,96 %: rendimiento efectivo del ICE BofA BBB el 4-nov [51]. Peso de la deuda: 8.115 de valor razonable / (8.115 + 82,11 × 407,6) = 19,5 %.',
  comparables: 'Comparables del 7-oct (MarketScreener [17-22], Stock Analysis [24-29]), llevados al 27-oct en el informe anterior y ahora al cierre del 5-nov con la variación del precio de Yahoo [55] (Virbac y Vetoquinol, al 4-nov, y con el EUR/USD de 1,117 a 1,123). IDEXX subió un 19,5 % al publicar su 3T26 el 2-nov: su PER llevado por precio (41x) no recoge la subida de estimaciones; no cambia la mediana, que fijan Virbac y Vetoquinol.',
};
fs.writeFileSync(path.join(dir, 'D.json'), JSON.stringify(d, null, 2));
console.log('D.json actualizado', d.comparables.empresas.map((e) => `${e.ticker} ${e.per_ntm} ${e.ev_ebitda_ntm}`).join(' | '));
