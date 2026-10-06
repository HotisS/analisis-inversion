// Construye notas/A.json a partir de las cifras copiadas de los 10-K, 10-Q y notas de prensa (ver fuentes).
import { writeFileSync } from 'node:fs';
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const Y = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
// Cuenta (M USD). 2016-2017 reexpresados ASC 606 en el 10-K 2018.
const ing = [2706.5,3138.2,3724.2,4478.5,4358.4,5710.1,6222.2,7124.1,8352.1,10064.7];
const cv  = [813.6,936.2,1120.1,1368.3,1497.2,1751.6,2026.2,2394.6,2717.9,3422.4];
const sga = [703.6,810.5,986.6,1178.4,1216.3,1466.5,1739.9,1963.9,2140.0,2385.0];
const ebit= [949.7,1062.9,1199.4,1374.5,1049.8,1821.0,1577.1,1766.8,2348.9,2945.5];
const dep = [73.9,86.2,108.6,160.0,226.4,282.8,338.0,401.6,445.3,614.7]; // amortización y pérdidas en bajas de inmovilizado (estado de flujos)
const ami = [18.2,12.9,14.2,43.0,49.8,27.4,27.8,20.2,16.7,13.2];          // amortización de intangibles
const rf  = [35.6,41.9,80.1,127.7,157.2,69.3,29.7,192.1,324.9,365.9];
const tax = [247.0,433.9,154.5,120.4,140.2,162.2,262.4,141.6,336.3,434.8];
const nci = [0.0,-0.4,-2.9,2.5,6.2,23.5,22.1,19.3,14.9,20.6];
const ni  = [738.3,670.9,1127.9,1379.3,1060.6,1704.6,1322.3,1798.0,2322.6,2856.0];
const sh  = [353.7,348.9,356.4,358.4,361.0,365.8,362.0,357.4,362.0,362.7]; // 2016-2018 x3 por el split 3x1 de oct-2021
const bpa = [6.26/3,5.77/3,9.49/3,3.85,2.94,4.66,3.65,5.03,6.42,7.87];
const cuenta = Y.map((p,i)=>({ periodo:p, ingresos:ing[i], coste_ventas:cv[i], gastos_generales:sga[i], ebitda:r1(ebit[i]+dep[i]+ami[i]), amortizaciones:r1(dep[i]+ami[i]), ebit:ebit[i], resultado_financiero:rf[i], bai:r1(ebit[i]+rf[i]), impuestos:tax[i], minoritarios:nci[i], beneficio_neto:ni[i], gastos_financieros:0, bpa:r2(bpa[i]), dpa:0, dpa_extraordinario:0, acciones_diluidas:sh[i] }));
export const datos = { Y, ing, cv, sga, ebit, dep, ami, rf, tax, nci, ni, sh, cuenta };
// LTM jun-26 = 2025 + 1S26 - 1S25
const ltm = { periodo:'LTM jun-26', fecha_fin:'2026-06-30',
  ingresos: r1(10064.7+5663.1-4693.4), ebit: r1(2945.5+1827.2-1321.5),
  ebitda: r1((2945.5+1827.2-1321.5)+(614.7+371.2-289.6)+(13.2+31.1-6.6)),
  beneficio_neto: r1(2856.0+1639.6-1356.8), bpa: r2(7.87+4.57-3.72), dpa:0, dpa_extraordinario:0,
  fcf: r1((3030.5+1972.9-1297.0)-(539.8+215.9-271.9)) };
// Balance
const at=[6486.9,5776.8,7846.7,9733.2,11168.9,13555.0,12974.0,15441.5,18743.2,20458.7];
const ac=[3250.4,2808.9,4333.2,4662.6,6625.9,5844.9,6253.0,7888.0,7111.0,9779.5];
const pc=[596.5,662.8,820.6,1030.2,965.2,1149.8,1422.1,1658.7,1745.3,2006.2];
const pt=[709.1,996.4,1159.2,1448.5,1409.8,1603.5,1861.4,2044.2,2213.6,2517.0];
const gw=[201.1,201.1,240.6,307.2,336.7,343.6,348.5,348.7,347.5,370.3];
const intg=[31.5,26.0,66.7,112.1,77.4,70.5,49.8,39.1,23.0,17.1];
const ppe=[458.4,613.1,812.0,1272.9,1577.3,1876.4,2374.2,3537.6,4646.6,5342.4];
const inv=[182.3,241.2,409.0,595.5,601.5,587.1,893.2,1220.6,1487.2,1840.0];
const ar=[430.2,507.9,682.3,645.2,645.5,782.7,942.1,1130.2,1225.4,1527.3];
const ap=[68.5,82.5,100.7,123.5,81.6,121.2,147.0,188.7,193.4,255.1];
const efe=[1036.6,648.2,857.9,1167.6,1622.6,1290.9,1581.2,2750.1,2027.4,3368.0];
const icp=[1518.0,1312.4,2205.2,2054.1,3488.8,2913.1,2536.7,2473.1,1985.9,2566.9];
const ilp=[2283.3,1885.9,1771.3,2623.5,1757.7,4415.5,2623.6,2120.0,4819.1,3099.2];
const arr=[null,null,null,76.4,79.9,87.0,93.8,89.8,146.0,170.9];
const pn=[5777.8,4778.8,6678.8,8263.8,9731.5,11901.1,11041.9,13307.6,16433.7,17824.0];
const mi=[0.0,1.6,8.7,20.9,27.6,50.4,70.7,89.7,95.9,117.7];
const re=[1574.9,115.0,1521.7,2494.5,3261.3,4760.9,3500.1,4743.0,6803.3,7011.8];
const historico_balance = Y.map((p,i)=>({ periodo:p, activo_total:at[i], activo_corriente:ac[i], pasivo_corriente:pc[i], pasivo_total:pt[i], fondo_comercio:gw[i], intangibles:intg[i], inmovilizado_material:ppe[i], existencias:inv[i], clientes:ar[i], proveedores:ap[i], caja:r1(efe[i]+icp[i]+ilp[i]), deuda_financiera:0, arrendamientos:arr[i], patrimonio_neto:pn[i], minoritarios:mi[i], reservas:re[i] }));
// Flujos
const cfo=[1087.0,1143.9,1169.6,1598.2,1484.8,2089.4,1490.8,1813.8,2415.0,3030.5];
const capex=[53.9,190.7,187.4,425.6,341.5,339.5,532.4,1064.2,1111.2,539.8];
const acqI=[0,0,87.9,59.7,37.7,22.7,12.8,8.9,1.0,13.9];
const acqF=[0,0,0.3,22.6,85.0,21.9,4.5,2.9,0.5,0];
const rec=[42.5,2274.0,0,269.5,134.3,0,2607.4,416.3,0,2295.3];
const emi=[580.9,415.5,236.6,272.8,308.8,276.5,233.8,296.3,429.4,350.3];
const historico_flujos = Y.map((p,i)=>({ periodo:p, flujo_operativo:cfo[i], capex:capex[i], pagos_arrendamientos:0, adquisiciones:r1(acqI[i]+acqF[i]), desinversiones:0, dividendos:0, recompras:rec[i], emision_acciones:emi[i], intereses_en_financiacion:0 }));
const out = JSON.parse(process.argv[2] ? (await import('node:fs')).readFileSync(process.argv[2],'utf8') : '{}');
out.financieros = Object.assign(out.financieros||{}, { cuenta, ltm });
out.balance = Object.assign(out.balance||{}, { historico: historico_balance });
out.flujos = Object.assign(out.flujos||{}, { historico: historico_flujos });
out._calc_extra = { efectivo:efe, inversiones_cp:icp, inversiones_lp:ilp };
writeFileSync(process.argv[3]||'A_numeros.json', JSON.stringify(out,null,1));
console.log(JSON.stringify(ltm), cuenta.map(c=>c.periodo+':'+c.ebitda+'/'+c.bpa).join(' '));
