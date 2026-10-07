import fs from 'fs';
for (const t of ['msft','googl','amzn','meta']) {
  const j = JSON.parse(fs.readFileSync(`B-cf-${t}.json`,'utf8'));
  const g = j.facts['us-gaap'];
  for (const k of ['PaymentsToAcquirePropertyPlantAndEquipment','PaymentsToAcquireProductiveAssets']) {
    if (!g[k]) continue;
    const rows = g[k].units.USD.filter(r => r.form==='10-K' && r.fp==='FY' && r.frame && /^CY\d{4}$/.test(r.frame));
    const by = {}; rows.forEach(r=>by[r.frame]=r.val);
    console.log(t,k,Object.entries(by).filter(([f])=>f>='CY2016').map(([f,v])=>f+':'+(v/1e9).toFixed(1)).join(' '));
  }
}
