import fs from 'fs';
const d = JSON.parse(fs.readFileSync('A_tmp/parsed.json','utf8'));
const Y = ['FY2016','FY2017','FY2018','FY2019','FY2020','FY2021','FY2022','FY2023','FY2024','FY2025'];
const g = (y,k,col=1) => { const v=d[y]?.[k]; return v ? v[col] : null; };
// EPS reported; pre-split /5
const epsRep = {FY2016:658.63,FY2017:938.66,FY2018:795.34,FY2019:381.89,FY2020:490.11,FY2021:809.49,FY2022:178.55,FY2023:140.23,FY2024:157.31,FY2025:178.47};
const split = y => ['FY2016','FY2017','FY2018','FY2019','FY2020','FY2021'].includes(y) ? 5 : 1;
const dpaRep = {FY2016:395.18,FY2017:563.20,FY2018:1003.11,FY2019:300.00,FY2020:294.07,FY2021:485.70,FY2022:535.66,FY2023:84.14,FY2024:94.39,FY2025:107.09};
const dpaExt = {FY2018:525.90,FY2019:70.86};
const sharesRep = {FY2021:959.087,FY2022:955.391,FY2023:949.589,FY2024:938.025,FY2025:933.152};
const r2 = x => Math.round(x*100)/100, r1 = x=>Math.round(x*10)/10;
const cuenta = Y.map(y => {
  const ventas=g(y,'ventas'), ebit=g(y,'ebit'), da = y==='FY2016'? g('FY2017','da',0) : g(y,'da');
  const bai=g(y,'bai'); const ni=g(y,'ni'); const bpa=r2(epsRep[y]/split(y));
  return { periodo:y, ingresos:ventas, coste_ventas:g(y,'cogs'), gastos_generales:g(y,'sga'), ebitda: ebit+da, amortizaciones: da, ebit,
    resultado_financiero: bai-ebit, bai, impuestos:g(y,'tax'), minoritarios:g(y,'nci'), beneficio_neto:ni, gastos_financieros:0, participadas_en_ebitda:null,
    bpa, dpa: r2(dpaRep[y]/(y==='FY2022'?5:split(y))), dpa_extraordinario: r2((dpaExt[y]||0)/split(y)), acciones_diluidas: sharesRep[y] ?? r1(ni/bpa) };
});
const balance = Y.map(y => {
  const cl = g(y,'notes_ar') ?? (g(y,'notes_rec')+g(y,'ar'));
  return { periodo:y, activo_total:g(y,'ta'), activo_corriente:g(y,'tca'), pasivo_corriente:g(y,'tcl'), pasivo_total:g(y,'tl'), fondo_comercio:0, intangibles:g(y,'intang'),
   inmovilizado_material:g(y,'ppe'), existencias:g(y,'fg')+g(y,'wip')+g(y,'raw'), clientes:cl, proveedores:g(y,'ap'), activos_contrato:null, pasivos_contrato:null,
   caja:g(y,'cash')+g(y,'mkt'), deuda_financiera:0, arrendamientos:0, patrimonio_neto:g(y,'tna')-g(y,'ncieq'), minoritarios:g(y,'ncieq'), reservas:g(y,'re') };
});
const cf = (y,k) => y==='FY2016' ? g('FY2017',k,0) : g(y,k);
const flujos = Y.map(y => ({ periodo:y, flujo_operativo:cf(y,'cfo'), capex:-cf(y,'capex'), pagos_arrendamientos:0, adquisiciones:0, desinversiones:0,
  dividendos:-cf(y,'divs'), recompras:-cf(y,'buyback'), emision_acciones:0, intereses_en_financiacion:0 }));
const extra = Y.map(y=>({periodo:y, invsec:g(y,'invsec'), cash:g(y,'cash'), mkt:g(y,'mkt'), equity:g(y,'equity'), int_inc:g(y,'int_inc'), div_inc:g(y,'div_inc'), noi:g(y,'noi'), noe:g(y,'noe'), ord:g(y,'ord'), xnet:g(y,'bai')-g(y,'ord'), cash_end: cf(y,'cash_end'), tdep_in:cf(y,'tdep_in'), tdep_out:cf(y,'tdep_out'), tax_paid:cf(y,'tax_paid'), intdiv_rec:cf(y,'intdiv_rec'), treas:g(y,'treas')}));
fs.writeFileSync('A_tmp/built.json', JSON.stringify({cuenta,balance,flujos,extra},null,1));
for (const t of [cuenta,balance,flujos,extra]) { const ks=Object.keys(t[0]).filter(k=>k!=='periodo'); console.log('---'); for(const k of ks) console.log(k.slice(0,14).padEnd(15)+t.map(r=>String(r[k]).padStart(9)).join('')); }
