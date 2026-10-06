// Lista los archivos de una o varias presentaciones de EDGAR: node indice.mjs 000103526726000006 ...
const UA = { 'User-Agent': 'analisis-inversion (uso personal, investigacion)', 'Accept-Encoding': 'gzip, deflate' };
for (const a of process.argv.slice(2)) {
  const r = await fetch(`https://www.sec.gov/Archives/edgar/data/1035267/${a}/index.json`, { headers: UA });
  if (!r.ok) { console.log(a, 'HTTP', r.status); continue; }
  const j = await r.json();
  console.log(a, j.directory.item.map(i => i.name).filter(n => /htm|txt|pdf/.test(n)).join(' '));
  await new Promise(x => setTimeout(x, 200));
}
