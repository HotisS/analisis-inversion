const fx={EUR:1,USD:1.1269,GBP:0.8488,SEK:11.2425};
// w1 = peso del primer ejercicio estimado en NTM
const P=[
 {n:'Kerry Group',t:'KRZ',p:'IE',c:'EUR',cap:13570,ev:15790,ebLtm:1140,s0:6758,eb0:1208,s1:6831,s2:7172,e1:1260,e2:1355,eps1:4.472,eps2:5.119,px:86.75,w1:0.24,roic:9.35,debt:2830,cash:604.5,fcfy:3.53},
 {n:'Symrise',t:'SY1',p:'DE',c:'EUR',cap:12420,ev:14260,ebLtm:1081,s0:4929,eb0:1081,s1:5030,s2:5259,e1:1096,e2:1165,eps1:540/135.35,eps2:603.8/135.35,px:91.76,w1:0.24,roic:7.02,debt:2280,cash:451.08,fcfy:5.63},
 {n:'AAK',t:'AAK',p:'SE',c:'SEK',cap:47650,ev:51670,ebLtm:5650,s0:46021,eb0:5557,s1:46806,s2:50746,e1:5728,e2:6118,eps1:13.67,eps2:3961/255.2,px:186.7,w1:0.24,roic:15.69,debt:5800,cash:1840,fcfy:4.18},
 {n:'Tate & Lyle',t:'TATE',p:'GB',c:'GBP',cap:2480,ev:3430,ebLtm:392,s0:2006,eb0:415,s1:2017,s2:2086,e1:404.9,e2:437.3,eps1:0.3063,eps2:0.3875,px:5.615,w1:0.48,roic:7.08,debt:1290,cash:344,fcfy:4.60},
 {n:'Ingredion',t:'INGR',p:'US',c:'USD',cap:6160,ev:6990,ebLtm:1150,s0:7219,eb0:1250,s1:7199,s2:7340,e1:1150,e2:1245,eps1:9.50,eps2:11.17,px:97.63,w1:0.24,roic:12.78,debt:1780,cash:952,fcfy:5.81},
 {n:'Corbion',t:'CRBN',p:'NL',c:'EUR',cap:1250,ev:1730,ebLtm:204.3,s0:1267,eb0:204.3,s1:1293,s2:1341,e1:205.3,e2:227.3,eps1:1.352,eps2:1.603,px:21.88,w1:0.24,roic:6.27,debt:517.6,cash:36,fcfy:6.07},
 {n:'Huhtamaki',t:'HUH1V',p:'FI',c:'EUR',cap:2790,ev:4100,ebLtm:613,s0:3960,eb0:613,s1:3961,s2:4131,e1:589.2,e2:644.3,eps1:2.046,eps2:2.521,px:26.36,w1:0.24,roic:7.9,debt:1600,cash:381.3,fcfy:9.97},
 {n:'Amcor',t:'AMCR',p:'US',c:'USD',cap:19460,ev:33480,ebLtm:3540,s0:23510,eb0:3540,s1:23793,s2:24094,e1:3889,e2:4025,eps1:1538/462,eps2:1685/462,px:42.12,w1:0.73,roic:6.91,debt:15140,cash:1120,fcfy:6.36},
];
const r=(x,d=1)=>Math.round(x*10**d)/10**d;
const out=P.map(o=>{const ebN=o.w1*o.e1+(1-o.w1)*o.e2, sN=o.w1*o.s1+(1-o.w1)*o.s2, epsN=o.w1*o.eps1+(1-o.w1)*o.eps2;
 return {nombre:o.n,ticker:o.t,pais:o.p,capitalizacion:r(o.cap/fx[o.c],0),ev_ventas:r(o.ev/o.s0,2),ev_ebitda_ltm:r(o.ev/o.ebLtm),ev_ebitda_ntm:r(o.ev/ebN),per_ntm:r(o.px/epsN),crecimiento_pct:r((sN/o.s0-1)*100),margen_ebitda_pct:r(o.eb0/o.s0*100),roic_pct:o.roic,dn_ebitda:r((o.debt-o.cash)/o.ebLtm),fcf_yield_pct:o.fcfy}});
console.log(JSON.stringify(out,null,1));
