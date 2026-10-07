// A: construye A.json (script auxiliar del subagente A)
import fs from 'fs';
const r1 = x => Math.round(x*10)/10;
const C = [
 // periodo, ingresos, aprovis, amort, ebit, fin, bai, imp, neto, gf, bpa, acc
 ['2020',807.427,177.442,123.085,92.298,(1.579-18.003-0.742+4.106),79.238,4.958,74.280,18.003,0.42,178.910],
 ['2021',827.195,181.752,119.937,5.752,(0.493-20.600+2.044+3.226),-9.085,31.774,-40.859,20.600,-0.23,178.910],
 ['2022',863.248,207.571,120.636,46.866,-15.839,31.027,26.746,4.281,12.785,0.02,196.992],
 ['2023',894.516,221.495,124.316,-5.264,-11.927,-17.191,21.283,-38.474,14.647,-0.20,196.992],
 ['2024',985.721,238.395,139.084,36.086,-9.588,26.498,16.351,10.147,15.658,0.05,213.996],
 ['2025',1108.084,264.549,151.183,73.051,1.397,74.448,28.294,46.154,16.948,0.22,213.996],
];
const dpa = {'2020':0.19,'2021':0.19,'2022':0.19,'2023':0.19,'2024':0.19,'2025':0.187};
const cuenta = C.map(([p,ing,cv,am,ebit,fin,bai,imp,neto,gf,bpa,acc])=>({periodo:p,ingresos:r1(ing),coste_ventas:r1(cv),gastos_generales:null,ebitda:r1(ebit+am),amortizaciones:r1(am),ebit:r1(ebit),resultado_financiero:r1(fin),bai:r1(bai),impuestos:r1(imp),minoritarios:0,beneficio_neto:r1(neto),gastos_financieros:r1(gf),participadas_en_ebitda:null,bpa,dpa:dpa[p],dpa_extraordinario:0,acciones_diluidas:r1(acc)}));
const B = [
 // periodo, AT, AC, PC, PN, FC, intang, ppe, exist, cli, prov, caja, deuda, arr, otrasRes, resultado
 ['2020',2291.114,489.750,474.559,1302.966,315.966,1009.536,113.548,130.151,111.295,162.143,159.642,224.345+248.300,13.482+6.262,983.126,74.280],
 ['2021',2141.744,499.274,280.993,1286.039,315.966,916.056,117.413,118.632,127.671,177.800,206.487,359.692+12.314,14.162+6.278,1023.609,-40.859],
 ['2022',2147.691,552.718,274.613,1318.715,315.966,898.677,124.051,130.095,138.261,184.287,248.823,350.758+12.402,33.935+5.100,948.171,4.281],
 ['2023',2374.985,718.662,351.075,1463.400,315.966,951.415,141.287,167.528,131.498,181.354,387.954,341.851+13.968,37.605+6.206,915.984,-38.474],
 ['2024',2396.663,741.144,353.424,1488.382,315.966,936.967,153.790,171.783,151.444,186.525,377.097,332.993+14.373,37.521+7.061,838.929,10.147],
 ['2025',2337.134,713.983,350.639,1487.134,315.966,894.332,168.864,178.132,158.470,193.853,337.769,270.035+13.656,34.508+7.775,811.853,46.154],
];
const historicoB = B.map(([p,at,ac,pc,pn,fc,int,ppe,ex,cli,prov,caja,deuda,arr,ores,res])=>({periodo:p,activo_total:r1(at),activo_corriente:r1(ac),pasivo_corriente:r1(pc),pasivo_total:r1(at-pn),fondo_comercio:r1(fc),intangibles:r1(int),inmovilizado_material:r1(ppe),existencias:r1(ex),clientes:r1(cli),proveedores:r1(prov),activos_contrato:null,pasivos_contrato:null,caja:r1(caja),deuda_financiera:r1(deuda),arrendamientos:r1(arr),patrimonio_neto:r1(pn),minoritarios:0,reservas:r1(ores+res)}));
const F = [
 // periodo, FO, capexInt, capexPPE, arr, desinv, div, recompras(neto), emision, intereses
 ['2020',112.757,64.635,11.891,8.289,52.007+0.438,2.129,0.082,0,6.536],
 ['2021',233.852,52.338,18.814,7.772,13.994+0.157,11.746,0,0,6.130],
 ['2022',155.102,93.473,23.007,7.200,47.306+0.749,12.419,0,0,9.899],
 ['2023',93.485,125.805,33.499,6.913,31.801+0.639,2.592,0,197.767,10.214],
 ['2024',160.767,131.596,29.835,8.582,13.152+1.653,3.288,0,0,10.537],
 ['2025',174.459,102.398,34.910,9.571,5.662+0.027,26.197,0,0,11.462],
];
const historicoF = F.map(([p,fo,ci,cp,arr,des,div,rec,em,int])=>({periodo:p,flujo_operativo:r1(fo),capex:r1(ci+cp),pagos_arrendamientos:r1(arr),adquisiciones:0,desinversiones:r1(des),dividendos:r1(div),recompras:r1(rec),emision_acciones:r1(em),intereses_en_financiacion:r1(int)}));
const prev = JSON.parse(fs.readFileSync(new URL('./A.json', import.meta.url)));
const extra = JSON.parse(fs.readFileSync(new URL('./A_extra.json', import.meta.url)));
const out = {...prev, ...extra};
out.financieros = {...extra.financieros, cuenta};
out.balance = {...extra.balance, historico: historicoB};
out.flujos = {...extra.flujos, historico: historicoF};
fs.writeFileSync(new URL('./A.json', import.meta.url), JSON.stringify(out, null, 2));
console.log('ok', cuenta.map(c=>c.periodo+':'+c.ebitda).join(' '));
