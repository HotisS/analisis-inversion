// D: cálculo de múltiplos de comparables con datos literales de MarketScreener (7-oct-2026) y ROIC de Stock Analysis.
const fx = 1.1269; // USD por EUR, BCE 6-oct-2026
// a = último real, b = año en curso, c = siguiente, d = el otro. wL/wN: pesos LTM y NTM.
const C = [
 { n:'Schneider Electric', t:'SU', p:'FR', eur:true, price:260.50, cap:146803, ev:159346,
   s:[40152,44902,49672], e:[9172,9791,11314], eps:[7.405,9.586,11.71], fcf:[4635,5112,6513], nd25:13721, roic:13.96, cal:true },
 { n:'Eaton', t:'ETN', p:'IE', price:445.09, cap:172873, ev:190868,
   s:[27448,32853,36766], e:[6531,7797,9081], eps:[10.45,11.22,14.61], fcf:[3553,3955,5312], nd25:9092, roic:10.61, cal:true },
 { n:'ABB', t:'ABBN', p:'CH', price:99.41, cap:180413, ev:176593,
   s:[33220,38110,42442], e:[6860,8177,9237], eps:[2.59,3.907,3.504], fcf:[4566,4853,5744], nd25:1683, roic:25.12, cal:true },
 { n:'nVent Electric', t:'NVT', p:'GB', price:173.80, cap:28131, ev:29051,
   s:[3893,5477,6519], e:[846.7,1222,1464], eps:[4.31,4.448,5.512], fcf:[427.5,708.5,864.6], nd25:1322, roic:11.93, cal:true },
 { n:'Trane Technologies', t:'TT', p:'IE', price:476.39, cap:104817, ev:107429,
   s:[21322,23742,26001], e:[4276,4845,5509], eps:[12.98,15.13,17.55], fcf:[2812,3395,3803], nd25:2852, roic:26.58, cal:true },
 { n:'Hubbell', t:'HUBB', p:'US', price:485.41, cap:25645, ev:30115,
   s:[5845,6869,7573], e:[1415,1698,1943], eps:[16.54,18.08,20.71], fcf:[874.7,962.6,1090], nd25:1843, roic:13.60, cal:true },
 // Modine: FY marzo. a=FY26 (real, mar-26), b=FY27e, c=FY28e. LTM a jun-26 = 0,75 FY26 + 0,25 FY27; NTM oct-26/sep-27 = 0,5 FY27 + 0,5 FY28
 { n:'Modine', t:'MOD', p:'US', price:189.91, cap:10087, ev:10317,
   s:[3181,3428,4139], e:[471,565.9,814.3], eps:[2.26,5.97,9.98], fcf:[105.4,106.9,363], nd25:362.8, roic:16.23, wL:[0.75,0.25,0], wN:[0,0.5,0.5] },
 // JCI: FY septiembre. a=FY25, b=FY26e, c=FY27e. LTM a jun-26 = 0,25 FY25 + 0,75 FY26; NTM = FY27
 { n:'Johnson Controls', t:'JCI', p:'IE', price:158.76, cap:96168, ev:105072,
   s:[23596,25568,27639], e:[3987,4765,5529], eps:[5.03,4.786,5.982], fcf:[2120,3070,3636], nd25:9501, roic:12.79, wL:[0.25,0.75,0], wN:[0,0,1] },
];
const w = (v, ws) => v[0]*ws[0] + v[1]*ws[1] + v[2]*ws[2];
const r1 = x => Math.round(x*10)/10, r2 = x => Math.round(x*100)/100;
const out = C.map(c => {
  const wL = c.wL || [0.5,0.5,0], wN = c.wN || [0,0.25,0.75];
  const k = c.eur ? fx : 1;
  const sL = w(c.s,wL), sN = w(c.s,wN), eL = w(c.e,wL), eN = w(c.e,wN), epsN = w(c.eps,wN), fN = w(c.fcf,wN);
  return { nombre:c.n, ticker:c.t, pais:c.p, capitalizacion: Math.round(c.cap*k),
    ev_ventas: r2(c.ev/sL), ev_ebitda_ltm: r1(c.ev/eL), ev_ebitda_ntm: r1(c.ev/eN), per_ntm: r1(c.price/epsN),
    crecimiento_pct: r1((sN/sL-1)*100), margen_ebitda_pct: r1(c.e[0]/c.s[0]*100), roic_pct: c.roic,
    dn_ebitda: r2(c.nd25/c.e[0]), fcf_yield_pct: r1(fN/c.cap*100) };
});
console.log(JSON.stringify(out,null,1));
