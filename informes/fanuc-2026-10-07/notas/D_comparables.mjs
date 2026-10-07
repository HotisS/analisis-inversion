// Cálculo de comparables (subagente D). Entradas copiadas de MarketScreener (EBITDA, ventas, BPA: mismo proveedor para LTM y NTM)
// y de Stock Analysis (capitalización, valor empresa, deuda neta, ROIC, FCF yield), 7-oct-2026. Tipos BCE 6-oct-2026.
export const EURJPY = 178.15, USDJPY = +(178.15/1.1269).toFixed(2);
const P = [
 // w1,w2: pesos de los dos ejercicios estimados en los próximos 12 meses (oct-26 a sep-27); gap: meses entre el fin del LTM y el fin del NTM
 {nombre:"Yaskawa Electric",ticker:"6506.T",pais:"JP",fx:1,cap:1280000,ev:1360000,dn:63540,roic:5.87,fcfy:1.17,precio:4946,
  ltm:{v:542122,e:68401},f1:{v:592092,e:83216,bpa:174.2},f2:{v:641702,e:104157,bpa:225.2},w1:5/12,w2:7/12,gap:19,nota:"ejercicio a febrero; LTM = FY feb-2026"},
 {nombre:"Keyence",ticker:"6861.T",pais:"JP",fx:1,cap:19780000,ev:18350000-1618699,dn:-1426594,roic:22.39,fcfy:2.04,precio:81490,
  ltm:{v:1169289,e:612986},f1:{v:1450153,e:794589,bpa:2335},f2:{v:1626631,e:888458,bpa:2611},w1:0.5,w2:0.5,gap:18,nota:"ejercicio a 20 de marzo; VE sin 1.618.699 M de inversiones a largo plazo"},
 {nombre:"SMC",ticker:"6273.T",pais:"JP",fx:1,cap:4640000,ev:3890000-77140,dn:-754229,roic:11.17,fcfy:0.76,precio:73860,
  ltm:{v:842500,e:235300},f1:{v:1073447,e:335607,bpa:3490},f2:{v:1170046,e:364092,bpa:3713},w1:0.5,w2:0.5,gap:18,nota:"VE sin 77.140 M de inversiones a largo plazo"},
 {nombre:"Nabtesco",ticker:"6268.T",pais:"JP",fx:1,cap:587220,ev:557200,dn:-41890,roic:7.00,fcfy:4.44,precio:5010,
  ltm:{v:307912,e:37984},f1:{v:347263,e:50194,bpa:210.7},f2:{v:366457,e:54115,bpa:229.2},w1:3/12,w2:9/12,gap:21,nota:"ejercicio a diciembre; LTM = 2025"},
 {nombre:"Harmonic Drive Systems",ticker:"6324.T",pais:"JP",fx:1,cap:627640,ev:622370,dn:-5280,roic:4.33,fcfy:0.12,precio:6630,
  ltm:{v:59558,e:9929},f1:{v:75460,e:17121,bpa:69.64},f2:{v:86256,e:21596,bpa:102.3},w1:0.5,w2:0.5,gap:18,nota:""},
 {nombre:"Mitsubishi Electric",ticker:"6503.T",pais:"JP",fx:1,cap:10820000,ev:10370000,dn:-591170,roic:8.35,fcfy:4.96,precio:5285,
  ltm:{v:5894700,e:666879},f1:{v:6440594,e:911503,bpa:263.9},f2:{v:6631842,e:996048,bpa:294.4},w1:0.5,w2:0.5,gap:18,nota:"conglomerado; FA es una parte"},
 {nombre:"Siemens",ticker:"SIE.DE",pais:"DE",fx:EURJPY,cap:211050,ev:256940,dn:38990,roic:6.58,fcfy:5.53,precio:274.02,
  ltm:{v:83186,e:15226},f1:{v:90384,e:16833,bpa:12.36},f2:{v:90384,e:16833,bpa:12.36},w1:1,w2:0,gap:12,nota:"ejercicio a septiembre; LTM = FY sep-2026 estimado (aún sin publicar); EUR"},
 {nombre:"Rockwell Automation",ticker:"ROK",pais:"US",fx:USDJPY,cap:50050,ev:53190,dn:3130,roic:21.36,fcfy:3.00,precio:450.74,
  ltm:{v:9057,e:2202},f1:{v:9580,e:2428,bpa:14.43},f2:{v:9580,e:2428,bpa:14.43},w1:1,w2:0,gap:12,nota:"ejercicio a septiembre; LTM = FY sep-2026 estimado (aún sin publicar); USD; BPA ajustado de MarketScreener"},
];
const r1 = x => Math.round(x*10)/10, r2 = x => Math.round(x*100)/100;
export const empresas = P.map(p => {
  const vN = p.w1*p.f1.v + p.w2*p.f2.v, eN = p.w1*p.f1.e + p.w2*p.f2.e, bN = p.w1*p.f1.bpa + p.w2*p.f2.bpa;
  return { nombre:p.nombre, ticker:p.ticker, pais:p.pais,
    capitalizacion: Math.round(p.cap*p.fx),
    ev_ventas: r2(p.ev/p.ltm.v), ev_ebitda_ltm: r1(p.ev/p.ltm.e), ev_ebitda_ntm: r1(p.ev/eN), per_ntm: r1(p.precio/bN),
    crecimiento_pct: r1((Math.pow(vN/p.ltm.v, 12/p.gap)-1)*100), margen_ebitda_pct: r1(p.ltm.e/p.ltm.v*100),
    roic_pct: p.roic, dn_ebitda: r2(p.dn/p.ltm.e), fcf_yield_pct: p.fcfy, _nota: p.nota };
});
if (process.argv[1].endsWith('D_comparables.mjs')) { console.log('USDJPY', USDJPY); console.table(empresas); }
