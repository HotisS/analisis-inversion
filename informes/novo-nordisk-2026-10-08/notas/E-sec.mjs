// Subagente E: consultas JSON a EDGAR (búsqueda de texto completo y listas de presentaciones).
// Uso: node E-sec.mjs fts "<consulta>" [formularios] [desde] [hasta]
//      node E-sec.mjs subs <CIK>
const UA = { 'User-Agent': process.env.SEC_UA || 'analisis-inversion research admin@example.com' };
const [modo, a, b, c, d] = process.argv.slice(2);
async function get(url) {
  for (let i = 0; i < 3; i++) {
    try { const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(120000) }); if (r.ok) return r.json(); console.error(r.status, url); }
    catch (e) { console.error('reintento', e.message); }
    await new Promise(s => setTimeout(s, 3000));
  }
}
if (modo === 'fts') {
  let u = `https://efts.sec.gov/LATEST/search-index?q=${encodeURIComponent(a)}`;
  if (b) u += `&forms=${b}`; if (c) u += `&dateRange=custom&startdt=${c}&enddt=${d || '2026-10-08'}`;
  const j = await get(u);
  for (const h of (j?.hits?.hits || []).slice(0, 25)) {
    const s = h._source; const [acc, file] = h._id.split(':');
    console.log(s.file_date, s.form, s.display_names?.[0], s.ciks?.[0], `https://www.sec.gov/Archives/edgar/data/${+s.ciks[0]}/${acc.replace(/-/g, '')}/${file}`);
  }
} else if (modo === 'subs') {
  const cik = String(a).padStart(10, '0');
  const j = await get(`https://data.sec.gov/submissions/CIK${cik}.json`);
  console.log(j.name);
  const r = j.filings.recent;
  for (let i = 0; i < r.form.length; i++) if (!b || r.form[i].match(new RegExp(b))) console.log(r.filingDate[i], r.form[i], `https://www.sec.gov/Archives/edgar/data/${+a}/${r.accessionNumber[i].replace(/-/g, '')}/${r.primaryDocument[i]}`, r.primaryDocDescription[i]);
}
