// Comparables al 26-oct-2026 (japonesas: cierre del 26-oct; Siemens y Rockwell: cierre del 23-oct, la
// sesión del 26 no había cerrado). Parte de las cifras del 7-oct (informes/fanuc-2026-10-07/notas/D_comparables.mjs):
// capitalización = la del 7-oct × (precio de hoy / precio del 7-oct), mismas acciones; valor empresa = el del
// 7-oct + la variación de la capitalización (deuda neta de los mismos balances, que no han cambiado: ninguno
// ha publicado cuentas trimestrales nuevas entre el 7 y el 26-oct salvo Yaskawa). Estimaciones: MarketScreener;
// Yaskawa releída el 26-oct (ejercicio a feb-2027 593.640 / 84.002 / 175,0; feb-2028 646.085 / 104.478 / 226,2);
// las demás, las del 7-oct (sin resultados nuevos publicados). Precios: Yahoo Finance. Tipos: BCE del 23-oct-2026.
export const EURJPY = 175.51, USDJPY = +(175.51 / 1.1193).toFixed(2);
const P = [
 {nombre:"Yaskawa Electric",ticker:"6506.T",pais:"JP",fx:1,cap:1280000,ev:1360000,dn:63540,roic:5.87,fcfy:1.17,precio:4946,hoy:3980,
  ltm:{v:542122,e:68401},f1:{v:593640,e:84002,bpa:175.0},f2:{v:646085,e:104478,bpa:226.2},w1:5/12,w2:7/12,gap:19},
 {nombre:"Keyence",ticker:"6861.T",pais:"JP",fx:1,cap:19780000,ev:18350000-1618699,dn:-1426594,roic:22.39,fcfy:2.04,precio:81490,hoy:77270,
  ltm:{v:1169289,e:612986},f1:{v:1450153,e:794589,bpa:2335},f2:{v:1626631,e:888458,bpa:2611},w1:0.5,w2:0.5,gap:18},
 {nombre:"SMC",ticker:"6273.T",pais:"JP",fx:1,cap:4640000,ev:3890000-77140,dn:-754229,roic:11.17,fcfy:0.76,precio:73860,hoy:61880,
  ltm:{v:842500,e:235300},f1:{v:1073447,e:335607,bpa:3490},f2:{v:1170046,e:364092,bpa:3713},w1:0.5,w2:0.5,gap:18},
 {nombre:"Nabtesco",ticker:"6268.T",pais:"JP",fx:1,cap:587220,ev:557200,dn:-41890,roic:7.00,fcfy:4.44,precio:5010,hoy:4140,
  ltm:{v:307912,e:37984},f1:{v:347263,e:50194,bpa:210.7},f2:{v:366457,e:54115,bpa:229.2},w1:3/12,w2:9/12,gap:21},
 {nombre:"Harmonic Drive Systems",ticker:"6324.T",pais:"JP",fx:1,cap:627640,ev:622370,dn:-5280,roic:4.33,fcfy:0.12,precio:6630,hoy:5090,
  ltm:{v:59558,e:9929},f1:{v:75460,e:17121,bpa:69.64},f2:{v:86256,e:21596,bpa:102.3},w1:0.5,w2:0.5,gap:18},
 {nombre:"Mitsubishi Electric",ticker:"6503.T",pais:"JP",fx:1,cap:10820000,ev:10370000,dn:-591170,roic:8.35,fcfy:4.96,precio:5285,hoy:4696,
  ltm:{v:5894700,e:666879},f1:{v:6440594,e:911503,bpa:263.9},f2:{v:6631842,e:996048,bpa:294.4},w1:0.5,w2:0.5,gap:18},
 {nombre:"Siemens",ticker:"SIE.DE",pais:"DE",fx:EURJPY,cap:211050,ev:256940,dn:38990,roic:6.58,fcfy:5.53,precio:274.02,hoy:256.80,
  ltm:{v:83186,e:15226},f1:{v:90384,e:16833,bpa:12.36},f2:{v:90384,e:16833,bpa:12.36},w1:1,w2:0,gap:12},
 {nombre:"Rockwell Automation",ticker:"ROK",pais:"US",fx:USDJPY,cap:50050,ev:53190,dn:3130,roic:21.36,fcfy:3.00,precio:450.74,hoy:426.11,
  ltm:{v:9057,e:2202},f1:{v:9580,e:2428,bpa:14.43},f2:{v:9580,e:2428,bpa:14.43},w1:1,w2:0,gap:12},
];
const r1 = x => Math.round(x*10)/10, r2 = x => Math.round(x*100)/100;
export const empresas = P.map(p => {
  const r = p.hoy / p.precio, cap = p.cap * r, ev = p.ev + p.cap * (r - 1);
  const vN = p.w1*p.f1.v + p.w2*p.f2.v, eN = p.w1*p.f1.e + p.w2*p.f2.e, bN = p.w1*p.f1.bpa + p.w2*p.f2.bpa;
  return { nombre:p.nombre, ticker:p.ticker, pais:p.pais,
    capitalizacion: Math.round(cap*p.fx),
    ev_ventas: r2(ev/p.ltm.v), ev_ebitda_ltm: r1(ev/p.ltm.e), ev_ebitda_ntm: r1(ev/eN), per_ntm: r1(p.hoy/bN),
    crecimiento_pct: r1((Math.pow(vN/p.ltm.v, 12/p.gap)-1)*100), margen_ebitda_pct: r1(p.ltm.e/p.ltm.v*100),
    roic_pct: p.roic, dn_ebitda: r2(p.dn/p.ltm.e), fcf_yield_pct: r2(p.fcfy / r) };
});
if (process.argv[1].endsWith('D_comparables-fanuc.mjs')) { console.log('USDJPY', USDJPY); console.table(empresas); }
