// Actualiza D.json (copiado del informe del 7-oct) al corte del 28-oct-2026.
// Uso: node informes/zoetis-2026-10-28/notas/D-actualizar.mjs  (solo una vez: parte de D-07oct.json)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const d = JSON.parse(fs.readFileSync(path.join(dir, 'D-07oct.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

// Identificación: cierre del 27-oct (la sesión del 28 no ha abierto a la hora del corte).
Object.assign(d.identificacion, {
  precio: b.identificacion.precio, fecha_precio: b.identificacion.fecha_precio,
  max_52s: b.identificacion.max_52s, min_52s: b.identificacion.min_52s,
  capitalizacion_publicada: Math.round(78.23 * 413.22),
  volumen_medio_diario: '≈ 379 M USD/día (5,07 M de acciones; 3 meses)',
  proximos_resultados: '2026-11-05',
});

// Fuentes: se ponen al día las de mercado y se añaden las nuevas.
const f = Object.fromEntries(d.fuentes.map((x) => [x.id, x]));
f[4].fecha = '2026-10-27';
f[4].titulo = 'Históricos diarios de ZTS, SPY, XLV y comparables (cierres hasta el 27-oct-2026)';
f[7].fecha = '2026-10-28';
f[8].fecha = '2026-10-28';
f[10].fecha = '2026-10-28';
for (const id of [17, 18, 19, 20, 21, 22]) f[id].fecha = '2026-10-07';
d.fuentes.push(
  { id: 42, titulo: 'Daily Treasury Par Yield Curve Rates, 2026 (CSV; 10 años = 4,99 % el 27-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026&page&_format=csv' },
  { id: 43, titulo: 'Zoetis (ZTS): quoteSummary (earningsTrend, recommendationTrend, upgradeDowngradeHistory, calendarEvents, financialData)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-28', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/ZTS' },
  { id: 44, titulo: 'ICE BofA BBB US Corporate Index Effective Yield (BAMLC0A4CBBBEY), 26-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://fred.stlouisfed.org/series/BAMLC0A4CBBBEY' },
  { id: 45, titulo: 'Zoetis Inc. Form 8-K de 8-oct-2026: dividendo del 4T26 de 0,53 USD', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000042/zts-20261008.htm' },
  { id: 46, titulo: 'Zoetis Inc. Form 8-K de 13-oct-2026: nombramiento de Iris Knobloch como consejera', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000044/zts-20261008.htm' },
  { id: 47, titulo: 'Zoetis: presentaciones en EDGAR (Form 4 de consejeros y directivos, 28-oct-2025 a 28-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: 'https://data.sec.gov/submissions/CIK0001555280.json' },
);

// Consenso (MarketScreener, BPA contable; Yahoo, ajustado y recomendaciones).
d.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 9253, ebitda: 3871, ebit: 3425, bpa: 5.62, dpa: 2.15, fuente: 'MarketScreener [7]; BPA contable (el ajustado, 6,21 USD con 14 analistas, en Yahoo Finance [43])' },
  { periodo: '2027e', ingresos: 9396, ebitda: 3959, ebit: 3498, bpa: 6.02, dpa: 2.25, fuente: 'MarketScreener [7]; BPA contable (el ajustado, 6,44 USD con 15 analistas, en Yahoo Finance [43])' },
  { periodo: '2028e', ingresos: 9739, ebitda: 4074, ebit: 3669, bpa: 6.55, dpa: 2.45, fuente: 'MarketScreener [7]; BPA contable' },
];
d.consenso.recomendaciones = { n_analistas: 16, comprar: 5, mantener: 11, vender: 0, po_medio: 88.62, po_min: 74, po_max: 115 };
d.consenso.revisiones = 'MarketScreener sigue siendo la única fuente gratuita con estimaciones a tres años y su BPA de Zoetis es **contable** (5,62 USD en 2026, dentro de la guía contable de 5,55-5,65) [7]. Desde el informe del 7-oct, su consenso de ventas de 2027 baja de 9.477 a 9.396 M USD y el de 2028 de 9.877 a 9.739 M; el BPA contable de 2028, de 6,61 a 6,55 USD [7]. En Yahoo, el BPA ajustado de 2027 cae de 6,55 a 6,44 USD en los últimos siete días y de 7,39 en 90 días (−12,9 %); el de 2026 se queda en 6,21 USD [43]. Las recomendaciones empeoran: de 8 compras y 9 mantener hace un mes a 5 y 11 hoy; Jefferies bajó a Mantener el 20-oct (objetivo de 103 a 83 USD), Goldman Sachs empezó con Neutral y 74 USD el 16-oct y UBS subió su objetivo de 80 a 85 USD el 27-oct [43]. El objetivo medio de Yahoo es de 88,62 USD (13 analistas, de 74 a 115) y el de MarketScreener, 93 USD (17 analistas, de 74 a 155) [8, 43].';
d.consenso.ajuste_ebitda_pct_ventas = 2.2;

// Bolsa: cifras de bolsa.mjs al 27-oct.
Object.assign(d.bolsa, {
  rentabilidades: b.bolsa.rentabilidades, anual: b.bolsa.anual, beta: b.bolsa.beta,
  volatilidad_pct: b.bolsa.volatilidad_pct, max_drawdown_pct: b.bolsa.max_drawdown_pct, posicion_corta_pct: 4.2,
});

// Comparables: los del 6-oct llevados al cierre del 27-oct con la variación de precio (Yahoo [4]).
const ratio = { IDXX: 1.0889, ELAN: 1.0076, PAHC: 1.0483, NEOG: 1.0426, VIRP: 1.117, VETO: 1.05 };
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
d.dcf.wacc = { ...d.dcf.wacc, tasa_libre_pct: 4.99, coste_deuda_pct: 6.05, peso_deuda_pct: 20.7 };

d.notas_integrador = {
  ...d.notas_integrador,
  precio: 'Cierre del 27-oct-2026 (78,23 USD, bolsa.mjs [4]); el 28 la sesión de Nueva York no ha abierto a la hora del corte.',
  tasa_libre: 'Bono a 10 años del Tesoro: 4,99 % el 27-oct-2026 (CSV oficial [42]); FRED DGS10 daba 5,00 % el 26-oct.',
  coste_deuda: '6,05 %: rendimiento efectivo del ICE BofA BBB el 26-oct [44]. Peso de la deuda: 8.456 de valor razonable / (8.456 + 78,23 × 414,3) = 20,7 %.',
  comparables: 'Comparables del 7-oct (MarketScreener [17-22], Stock Analysis [24-29]) llevados al cierre del 27-oct con la variación del precio de Yahoo [4]: capitalización y PER × variación; valor empresa = capitalización + deuda neta (constante); sin mover el tipo de cambio EUR/USD de Virbac y Vetoquinol ni rodar el NTM tres semanas.',
};
fs.writeFileSync(path.join(dir, 'D.json'), JSON.stringify(d, null, 2));
console.log('D.json actualizado', d.comparables.empresas.map((e) => `${e.ticker} ${e.per_ntm} ${e.ev_ebitda_ntm}`).join(' | '));
