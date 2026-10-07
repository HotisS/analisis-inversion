// Extrae de las páginas /finances/ de MarketScreener (texto de descargar.mjs) las filas anuales.
import fs from 'fs';
const dir = new URL('./docs/', import.meta.url);
const ids = process.argv.slice(2);
const num = s => s === '-' ? null : +s.replace(/,/g, '').replace(/%$/, '').replace(/x$/, '');
for (const id of ids) {
  const t = fs.readFileSync(new URL(id + '.txt', dir), 'utf8').split(/\s*\n\s*/).map(s => s.trim()).filter(Boolean);
  const out = { id };
  // precio y divisa
  const iMc = t.findIndex(s => /^Market (Closed|Open)/.test(s) || /Delayed|Real-time/.test(s));
  const iP = t.findIndex((s, k) => k > iMc && /^[\d,]+\.\d+ (USD|JPY|EUR|SEK|CHF)$/.test(s));
  out.precio = t[iP]; out.fecha = t[iMc + 1] + ' ' + (t[iMc+2]||'');
  const iF = t.findIndex(s => /^Fiscal Period:/.test(s));
  out.fp = t[iF];
  const years = t.slice(iF + 1, iF + 9); out.years = years.join(' ');
  const row = (name, from = iF) => {
    const k = t.findIndex((s, j) => j > from && s === name);
    if (k < 0) return null;
    let j = k + 1; if (t[j] === '1') j++;
    return t.slice(j, j + 8).map(num);
  };
  for (const n of ['Net sales', 'EBITDA', 'EBIT', 'Net income']) out[n] = row(n);
  const ad = t.findIndex((s, j) => j > iF && s === 'Announcement Date'); out.anuncio = t.slice(ad + 1, ad + 9).join(' ');
  const iB = t.findIndex(s => /^Forecast Balance Sheet/.test(s));
  out.netdebt = row('Net Debt', iB);
  const iC = t.findIndex(s => /^Cash Flow Forecast/.test(s));
  out.capex = row('CAPEX', iC); out.fcf = row('Free Cash Flow (FCF)', iC);
  const iR = t.findIndex(s => /^Forecast Financial Ratios/.test(s));
  out.ebitdam = row('EBITDA Margin (%)', iR); out.roe = row('ROE', iR);
  out.eps = row('EPS', iR);
  const kN = t.findIndex((s, j) => j > iR && /^Nbr of stocks/.test(s)); out.acc = t.slice(kN + 1, kN + 9).map(num);
  const kV = t.findIndex(s => /^Valuation ratios/.test(s)); out.val = t.slice(kV, kV + 20).join(' | ');
  const kU = t.findIndex((s, j) => j > iF && /in Million|in Billion|in Thousand/.test(s)); out.unidad = t[kU];
  console.log(JSON.stringify(out));
}
