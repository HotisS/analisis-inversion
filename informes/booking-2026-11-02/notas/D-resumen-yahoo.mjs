// Subagente D: resume los quoteSummary guardados.
import { readFileSync } from 'node:fs';
const v = (x) => (x && typeof x === 'object' ? (x.raw ?? x.fmt ?? null) : x ?? null);
for (const s of process.argv.slice(2)) {
  const d = JSON.parse(readFileSync(`informes/booking-2026-11-02/notas/docs/D-yahoo/${s}.json`, 'utf8'));
  const r = d.quoteSummary.result[0];
  const p = r.price || {}, sd = r.summaryDetail || {}, ks = r.defaultKeyStatistics || {}, fd = r.financialData || {};
  console.log(`\n=== ${s} ${p.longName} ${p.currency} precio ${v(p.regularMarketPrice)} t=${p.regularMarketTime} mcap ${v(p.marketCap)}`);
  console.log('EV', v(ks.enterpriseValue), 'EV/EBITDA', v(ks.enterpriseToEbitda), 'EV/Rev', v(ks.enterpriseToRevenue), 'fwdPE', v(ks.forwardPE), 'beta', v(ks.beta), 'shares', v(ks.sharesOutstanding), 'impliedSh', v(ks.impliedSharesOutstanding), 'short%float', v(ks.shortPercentOfFloat), 'sharesShort', v(ks.sharesShort), 'dateShort', v(ks.dateShortInterest), 'floatSh', v(ks.floatShares));
  console.log('rev', v(fd.totalRevenue), 'ebitda', v(fd.ebitda), 'ebitdaMarg', v(fd.ebitdaMargins), 'cash', v(fd.totalCash), 'debt', v(fd.totalDebt), 'fcf', v(fd.freeCashflow), 'revGrowth', v(fd.revenueGrowth), 'ROE', v(fd.returnOnEquity), 'tgt', v(fd.targetMeanPrice), v(fd.targetLowPrice), v(fd.targetHighPrice), v(fd.targetMedianPrice), 'nAn', v(fd.numberOfAnalystOpinions), 'rec', fd.recommendationKey, v(fd.recommendationMean), 'fincur', fd.financialCurrency);
  console.log('div', v(sd.dividendRate), 'vol3m', v(sd.averageVolume), '52h', v(sd.fiftyTwoWeekHigh), '52l', v(sd.fiftyTwoWeekLow));
  for (const t of (r.earningsTrend?.trend || [])) {
    const e = t.earningsEstimate || {}, rv = t.revenueEstimate || {}, tr = t.epsTrend || {}, rvs = t.epsRevisions || {};
    console.log(t.period, t.endDate, 'EPS', v(e.avg), v(e.low), v(e.high), 'n', v(e.numberOfAnalysts), 'yrAgo', v(e.yearAgoEps), '| REV', v(rv.avg), v(rv.low), v(rv.high), 'n', v(rv.numberOfAnalysts), '| trend now', v(tr.current), '7d', v(tr['7daysAgo']), '30d', v(tr['30daysAgo']), '60d', v(tr['60daysAgo']), '90d', v(tr['90daysAgo']), '| rev up30', v(rvs.upLast30days), 'dn30', v(rvs.downLast30days));
  }
  const rt = r.recommendationTrend?.trend || [];
  for (const t of rt) console.log('rec', t.period, t.strongBuy, t.buy, t.hold, t.sell, t.strongSell);
  const ce = r.calendarEvents || {};
  if (ce.earnings) console.log('earnings', JSON.stringify((ce.earnings.earningsDate || []).map(v)), ce.earnings.isEarningsDateEstimate, 'exdiv', v(ce.exDividendDate));
  if (process.env.UPG) for (const h of (r.upgradeDowngradeHistory?.history || []).slice(0, 25)) console.log(new Date(h.epochGradeDate * 1000).toISOString().slice(0, 10), h.firm, h.action, h.fromGrade, '->', h.toGrade, h.priorPriceTarget, '->', h.currentPriceTarget);
}
