// Subagente A (Cuentas) de Keyence. Genera notas/A.json. Millones de JPY, JGAAP.
// Periodos con la etiqueta de la empresa (año de INICIO): FY2025 = 21-mar-2025 a 20-mar-2026.
// Trimestres: "1T26" = 1T del FY2026 (21-mar a 20-jun-2026).
import fs from 'node:fs';
const r2 = (x) => Math.round(x * 100) / 100, r1 = (x) => Math.round(x * 10) / 10, r3 = (x) => Math.round(x * 1000) / 1000;
// [periodo, ventas, coste, sga, idi, ebit, otros_neto, bai, impuestos, bn, bpa (base post-split 2019), dpa, amort]
// FY2016-FY2018: BPA y DPA divididos por 2 por el desdoblamiento 2x1 del 21-nov-2019.
const IS = [
 ['FY2016',412699,79350,103036,11401,218910,2470,221380,68224,153156,1262.89/2,100/2,3491],
 ['FY2017',526847,94174,126573,13208,292890,5969,298860,88264,210595,1736.65/2,100/2,4577],
 ['FY2018',587095,103623,149675,15928,317868,1992,319860,93713,226147,1864.91/2,200/2,6288],
 ['FY2019',551843,100406,157525,16279,277631,2621,280253,82129,198124,816.91,150,7995],
 ['FY2020',538134,97250,148041,16084,276758,9836,286594,89305,197289,813.47,200,7555],
 ['FY2021',755174,133984,185273,17872,418045,13195,431240,127880,303360,1250.83,200,8621],
 ['FY2022',922422,167690,234156,21660,498914,13915,512830,149866,362963,1496.60,300,11523],
 ['FY2023',967288,164782,282307,25183,495014,24281,519295,149653,369642,1524.14,300,13767],
 ['FY2024',1059145,171444,309068,28856,549775,11234,561010,162353,398656,1643.77,350,15193],
 ['FY2025',1169289,198552,342138,32839,595759,39996,635756,190570,445185,1835.63,550,17227],
];
const cuenta = IS.map(([p,v,c,s,i,e,o,b,t,n,bpa,dpa,a]) => ({ periodo:p, ingresos:v, coste_ventas:c, gastos_generales:s+i, ebitda:e+a, amortizaciones:a, ebit:e,
  resultado_financiero:o, bai:b, impuestos:t, minoritarios:0, beneficio_neto:n, gastos_financieros:0, participadas_en_ebitda:null,
  bpa:r2(bpa), dpa, dpa_extraordinario:0, acciones_diluidas:r3(n/bpa) }));
// Balance: [periodo, AT, AC, PC, PLP, inmov neto, existencias, clientes brutos, provision, proveedores, PN, reservas, caja, depositos, valores CP, valores LP, depositos LP]
const BS = [
 ['FY2016',1250591,842030,60079,5959,18341,24343,127922,309,7322,1184552,1120874,372615,44340,260247,369636,0],
 ['FY2017',1486222,1023426,97558,7606,21426,34847,160276,366,10645,1381057,1316311,280260,157414,370055,416536,0],
 ['FY2018',1682357,1091011,85626,8421,24443,38349,169342,347,6309,1588309,1524268,265894,202311,394999,540534,0],
 ['FY2019',1836018,1148916,75379,2555,25554,33677,162611,400,9619,1758083,1698140,222903,253734,467502,626720,0],
 ['FY2020',2009874,1158223,94521,2507,23806,34940,186943,466,10540,1912844,1846924,189875,211326,528797,788123,0],
 ['FY2021',2324037,1322569,146552,3901,26382,62072,247901,538,15911,2173583,2101779,396165,68130,540276,910278,14227],
 ['FY2022',2650429,1336098,149261,9533,67305,87389,297785,1155,18381,2491634,2403814,344002,89653,506802,1172095,15907],
 ['FY2023',2964792,1531827,145362,13236,75870,77613,307526,1383,13725,2806193,2700699,406065,114290,612420,1274813,17957],
 ['FY2024',3289224,1632589,168040,12631,76924,77892,320312,1426,14890,3108552,3020535,451715,127336,640183,1483444,17116],
 ['FY2025',3670655,1979505,187831,11351,94718,85273,379590,2135,10890,3471472,3356584,451269,145706,896913,1464288,20220],
];
const historicoB = BS.map(([p,at,ac,pc,plp,ppe,ex,cl,prov,pr,pn,res,c,d,vcp,vlp,dlp]) => ({ periodo:p, activo_total:at, activo_corriente:ac, pasivo_corriente:pc,
  pasivo_total:pc+plp, fondo_comercio:0, intangibles:null, inmovilizado_material:ppe, existencias:ex, clientes:cl-prov, proveedores:pr,
  activos_contrato:null, pasivos_contrato:null, caja:c+d+vcp+vlp+dlp, deuda_financiera:0, arrendamientos:0, patrimonio_neto:pn, minoritarios:0, reservas:res }));
// Flujos: [periodo, FO, capex, dividendos, autocartera]
const CF = [['FY2016',142866,4345,12127,462],['FY2017',202934,6770,15158,45],['FY2018',209380,7360,18189,31],['FY2019',203434,8243,24252,43],
 ['FY2020',192652,4358,48505,26],['FY2021',271476,6162,48505,22],['FY2022',302628,39345,60631,10],['FY2023',387916,12492,72757,23],
 ['FY2024',409522,14342,78820,19],['FY2025',430680,28371,109136,12]];
const historicoF = CF.map(([p,fo,cx,dv,rc]) => ({ periodo:p, flujo_operativo:fo, capex:cx, pagos_arrendamientos:0, adquisiciones:0, desinversiones:0, dividendos:dv, recompras:rc, emision_acciones:0, intereses_en_financiacion:0 }));
// Trimestres (millones): ventas, crecimiento, organico (solo 1T26, estimacion propia sin efecto divisa), EBIT, amortizacion (presentaciones, 100 M JPY), BPA (diferencia de acumulados)
const bpa1T24 = 93534/242.5255; // BPA 1T FY2024 estimado: BN / acciones medias
const Q = [
 ['2T24',268327,10.1,null,140560,4100,782.27-bpa1T24,null],
 ['3T24',259640,7.7,null,133068,4200,1203.03-782.27,null],
 ['4T24',283955,9.2,null,156742,3300,1643.77-1203.03,null],
 ['1T25',261076,5.6,null,129301,3800,379.82,'Inferior'],
 ['2T25',284224,r1((284224/268327-1)*100),null,142878,4700,824.49-379.82,null],
 ['3T25',289305,r1((289305/259640-1)*100),null,144202,3600,1283.03-824.49,null],
 ['4T25',334684,17.9,null,179378,5200,1835.63-1283.03,null],
 ['1T26',346621,32.8,r1(((346621-26100)/261076-1)*100),187076,4700,573.69,'Superior'],
];
const items = Q.map(([p,v,g,go,e,a,bpa,vc]) => ({ periodo:p, ingresos:v, crecimiento_pct:g, crecimiento_organico_pct:go, ebitda:e+a, margen_ebitda_pct:r1((e+a)/v*100), bpa:r2(bpa), vs_consenso:vc }));
// Geografia por destino (nota 13): Japon, EE. UU., China, Otros.
const G = { FY2016:[206324,61515,44661,412699], FY2017:[246259,78798,64435,526847], FY2018:[275117,86938,69700,587095], FY2019:[260147,81561,63887,551843],
 FY2020:[236905,77421,86165,538134], FY2021:[310180,110480,128511,755174], FY2022:[348079,152190,153475,922422], FY2023:[344567,170843,142547,967288],
 FY2024:[372753,197579,157891,1059145], FY2025:[390066,225751,186550,1169289] };
const otros = { FY2024:330920, FY2025:366920 }; // publicados; el resto, por diferencia
const seg = (i, nombre, descripcion) => ({ nombre, descripcion, tipo_resultado:null, historico: Object.entries(G).map(([p,v]) => ({ periodo:p, ingresos: i<3 ? v[i] : (otros[p] ?? v[3]-v[0]-v[1]-v[2]), resultado:null })) });
const T = JSON.parse(fs.readFileSync(new URL('./A_textos.json', import.meta.url), 'utf8'));
const out = {
  negocio: { ...T.negocio, segmentos: [ seg(0,'Japón','Ventas a clientes en Japón (nota 13, por destino).'), seg(1,'Estados Unidos','Ventas a clientes en EE. UU.'), seg(2,'China','Ventas a clientes en China.'), seg(3,'Otros países','Resto del mundo: Asia sin China, Europa, resto de América y otros. FY2016-FY2023 calculado como total menos Japón, EE. UU. y China.') ] },
  financieros: { cuenta, ltm: { periodo:'LTM jun-26', fecha_fin:'2026-06-20', ingresos:1169289+346621-261076, ebitda:(595759+17227)+(187076+4700)-(129301+3800), ebit:595759+187076-129301, beneficio_neto:445185+139133-92116, bpa:r2(1835.63+573.69-379.82), dpa:550, dpa_extraordinario:0, fcf:null }, cambios_perimetro: [], ...T.financieros },
  trimestres: { items, ...T.trimestres },
  balance: { historico: historicoB, vencimientos: [], ...T.balance },
  flujos: { historico: historicoF, ...T.flujos },
  calidad: T.calidad, rentabilidad: T.rentabilidad ?? null, capital: T.capital,
  fuentes: T.fuentes, huecos: T.huecos,
};
fs.writeFileSync(new URL('./A.json', import.meta.url), JSON.stringify(out, null, 2));
const s = out.negocio.segmentos; for (const p of Object.keys(G)) { const t = s.reduce((a,x)=>a+x.historico.find(h=>h.periodo===p).ingresos,0); if (Math.abs(t-G[p][3])>5) console.log('segmentos no suman', p, t); }
console.log('ok', items.map(i=>i.periodo+':'+i.bpa+'/'+i.margen_ebitda_pct+'/'+i.crecimiento_pct).join(' '));
console.log('LTM', JSON.stringify(out.financieros.ltm));
console.log('caja', historicoB.map(b=>b.periodo+':'+b.caja).join(' '));
