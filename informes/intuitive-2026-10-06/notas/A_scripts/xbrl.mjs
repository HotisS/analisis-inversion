import {readFileSync} from 'node:fs';
const f=JSON.parse(readFileSync('docs/A_companyfacts.json'));
const g=f.facts['us-gaap'];
const mode=process.argv[2];
if(mode==='list'){ for(const k of Object.keys(g)){ const u=Object.values(g[k].units)[0]; const last=u.map(x=>x.end).sort().pop(); if(last>='2025-01-01') console.log(k, last);} process.exit(0);}
const days=(a,b)=>(new Date(b)-new Date(a))/864e5;
// annual: duration ~365 ending Dec 31, or instant at Dec 31; pick latest filed
const concepts=process.argv.slice(3);
for(const c of concepts){
  if(!g[c]){console.log(c,'NO');continue;}
  for(const [unit,arr] of Object.entries(g[c].units)){
    const out={};
    for(const x of arr){
      if(mode==='a'){
        if(!x.end.endsWith('12-31')) continue;
        if(x.start && Math.abs(days(x.start,x.end)-365)>5) continue;
        const y=x.end.slice(0,4);
        if(!out[y]||x.filed>out[y].filed) out[y]=x;
      } else { // quarterly: duration ~91
        if(x.start && Math.abs(days(x.start,x.end)-91)>8) continue;
        if(!x.start && mode==='q') continue;
        const y=x.end;
        if(!out[y]||x.filed>out[y].filed) out[y]=x;
      }
    }
    const ks=Object.keys(out).sort().filter(k=> mode==='a'? k>='2015': k>='2024-01');
    console.log(c,unit, ks.map(k=>`${k}:${unit==='USD'? (out[k].val/1e6).toFixed(1): out[k].val}`).join(' '));
  }
}
