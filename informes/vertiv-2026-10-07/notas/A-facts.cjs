const f=require("./docs/companyfacts.json").facts;
const tags=process.argv.slice(2);
for(const t of tags){const ns=f["us-gaap"][t]?"us-gaap":(f["dei"][t]?"dei":null); if(!ns){console.log(t,"NO");continue;}
 const u=f[ns][t].units; const k=Object.keys(u)[0];
 const out={};
 for(const x of u[k]){ if(x.form!="10-K"&&x.form!="10-Q") continue;
   const dur=x.start?((new Date(x.end)-new Date(x.start))/864e5):null;
   let key;
   if(dur===null) key="I"+x.end; else if(dur>350) key="Y"+x.end.slice(0,4); else if(dur<100) key="Q"+x.end; else continue;
   if(!(key in out)|| x.filed>out[key].filed) out[key]={v:x.val,filed:x.filed};
 }
 const s=Object.keys(out).filter(k=>k>="I2019"&&k.startsWith("I")&&/-12-31|2026-06-30|2026-03-31/.test(k) || k.startsWith("Y")&&k>="Y2019" ).sort();
 console.log(t, s.map(k=>k+"="+(k=="I"?0:Math.round(out[k].v/1e5)/10)).join(" "));
}
