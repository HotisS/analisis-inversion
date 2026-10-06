const H={ 'User-Agent': 'analisis-inversion (uso personal, investigacion)', 'Accept-Encoding': 'gzip, deflate' };
for(const a of process.argv.slice(2)){
  const r=await fetch(`https://www.sec.gov/Archives/edgar/data/1035267/${a}/index.json`,{headers:H});
  const t=await r.text();
  try{const j=JSON.parse(t); console.log(a, j.directory.item.map(x=>x.name).filter(n=>/\.htm/.test(n)&&!/index/.test(n)).join(' '));}catch(e){console.log(a,'ERR',r.status)}
  await new Promise(r=>setTimeout(r,300));
}
