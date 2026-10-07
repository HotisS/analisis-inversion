// Comparables: cifras de MarketScreener (finances) calendarizadas a la fecha de corte; ROIC de Stock Analysis.
import fs from 'fs';
const L = fs.readFileSync(new URL('./D_ms_parsed.jsonl', import.meta.url), 'utf8').trim().split('\n').map(JSON.parse);
const by = Object.fromEntries(L.map(o => [o.id, o]));
// Tipos BCE 6-oct-2026: EUR/USD 1,1269; EUR/JPY 178,15; EUR/SEK 11,2425
const FX = { JPY: 1, USD: 178.15 / 1.1269, EUR: 178.15, SEK: 178.15 / 11.2425 };
const peers = [
 // i0: índice (0..7) del último ejercicio cerrado y publicado; w: pesos de LTM y NTM sobre índices
 { id:'D_ms_cgnx', nombre:'Cognex', ticker:'CGNX', pais:'US', div:'USD', px:66.35, roic:12.65, i0:4, ltm:[[4,3],[5,9]], ntm:[[5,3],[6,9]] },
 { id:'D_ms_omron', nombre:'Omron', ticker:'6645', pais:'JP', div:'JPY', px:6486, roic:5.38, i0:4, ltm:[[4,6],[5,6]], ntm:[[5,6],[6,6]] },
 { id:'D_ms_smc', nombre:'SMC', ticker:'6273', pais:'JP', div:'JPY', px:73860, roic:11.17, i0:4, ltm:[[4,6],[5,6]], ntm:[[5,6],[6,6]] },
 { id:'D_ms_fanuc', nombre:'Fanuc', ticker:'6954', pais:'JP', div:'JPY', px:6164, roic:12.81, i0:4, ltm:[[4,6],[5,6]], ntm:[[5,6],[6,6]] },
 { id:'D_ms_hexa', nombre:'Hexagon', ticker:'HEXA B', pais:'SE', div:'EUR', pxdiv:'SEK', px:102.82, roic:9.26, i0:4, ltm:[[5,12]], ntm:[[5,3],[6,9]], nd_override:(282.02-276.36)*1000/11.2425, per:[[6,12]] },
 { id:'D_ms_mtd', nombre:'Mettler-Toledo', ticker:'MTD', pais:'US', div:'USD', px:1533.07, roic:42.28, i0:4, ltm:[[4,3],[5,9]], ntm:[[5,3],[6,9]] },
 { id:'D_ms_rok', nombre:'Rockwell Automation', ticker:'ROK', pais:'US', div:'USD', px:450.74, roic:21.36, i0:4, ltm:[[5,12]], ntm:[[6,12]] },
];
const w = (arr, ws) => ws.reduce((s, [i, m]) => s + arr[i] * m / 12, 0);
const r1 = x => Math.round(x * 10) / 10, r2 = x => Math.round(x * 100) / 100;
const out = [];
for (const p of peers) {
  const o = by[p.id];
  const acc = o.acc[7] / 1000; // millones de acciones (última columna)
  const capDiv = acc * p.px / (p.pxdiv === 'SEK' ? 11.2425 : 1); // en divisa de las cuentas
  const nd = p.nd_override ?? o.netdebt[p.i0];
  const ev = capDiv + nd;
  const vLtm = w(o['Net sales'], p.ltm), vNtm = w(o['Net sales'], p.ntm);
  const eLtm = w(o.EBITDA, p.ltm), eNtm = w(o.EBITDA, p.ntm);
  const niNtm = w(o['Net income'], p.per ?? p.ntm);
  const fx = FX[p.div];
  const row = {
    nombre: p.nombre, ticker: p.ticker, pais: p.pais,
    capitalizacion: Math.round(capDiv * fx),
    ev_ventas: r2(ev / vLtm), ev_ebitda_ltm: r1(ev / eLtm), ev_ebitda_ntm: r1(ev / eNtm), per_ntm: r1(capDiv / niNtm),
    crecimiento_pct: r1((vNtm / vLtm - 1) * 100),
    margen_ebitda_pct: r1(o.EBITDA[p.i0] / o['Net sales'][p.i0] * 100),
    roic_pct: p.roic, dn_ebitda: r2(nd / eLtm), fcf_yield_pct: r1(o.fcf[p.i0] / capDiv * 100)
  };
  out.push(row);
  console.error(p.nombre, 'cap(div)', Math.round(capDiv), 'ND', Math.round(nd), 'EV', Math.round(ev), 'EVjpy', Math.round(ev*fx), 'ventasLTM', Math.round(vLtm), 'EBITDA LTM/NTM', Math.round(eLtm), Math.round(eNtm));
}
// Keyence con el mismo método (solo control; el motor pone sus propias cifras)
const k = by['D_ms_kyc_fin']; const kcap = 81490 * 242.525085, kev = kcap - 2995278 - 99243;
const kl = w(k.EBITDA, [[4,6],[5,6]]), kn = w(k.EBITDA, [[5,6],[6,6]]);
console.error('Keyence control: EV/EBITDA LTM', r1(kev/kl), 'NTM', r1(kev/kn), 'PER NTM', r1(kcap / w(k['Net income'], [[5,6],[6,6]])), 'crec', r1((w(k['Net sales'], [[5,6],[6,6]])/w(k['Net sales'], [[4,6],[5,6]])-1)*100));
fs.writeFileSync(new URL('./D_comps.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
