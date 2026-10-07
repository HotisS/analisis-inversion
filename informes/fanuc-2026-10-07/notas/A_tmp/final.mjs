import fs from 'fs';
const b = JSON.parse(fs.readFileSync('A_tmp/built.json','utf8'));
const B='https://www.fanuc.co.jp/en/ir/announce/pdf/';
const fuentes = [
 {id:1, titulo:'Consolidated Annual Financial Results FY2025 (Kessan Tanshin, ejercicio cerrado el 31-mar-2026)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-04-24', url:B+'2026/financialresult202603_e.pdf'},
 {id:2, titulo:'Consolidated Annual Financial Results FY2024 (Kessan Tanshin, cerrado el 31-mar-2025)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2025-04', url:B+'2025/financialresult202503_e.pdf'},
 {id:3, titulo:'Consolidated Annual Financial Results FY2023 (Kessan Tanshin, cerrado el 31-mar-2024)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2024-04', url:B+'2024/financialresult202403_e.pdf'},
 {id:4, titulo:'Consolidated Annual Financial Results FY2022 (Kessan Tanshin, cerrado el 31-mar-2023)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2023-04', url:B+'2023/financialresult202303_e.pdf'},
 {id:5, titulo:'Consolidated Annual Financial Results FY2021 (Kessan Tanshin, cerrado el 31-mar-2022)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2022-04', url:B+'2022/financialresult202203_e.pdf'},
 {id:6, titulo:'Consolidated Annual Financial Results FY2020 (Kessan Tanshin, cerrado el 31-mar-2021)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2021-04', url:B+'2021/financialresult202103_e.pdf'},
 {id:7, titulo:'Consolidated Annual Financial Results FY2019 (Kessan Tanshin, cerrado el 31-mar-2020)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2020-04', url:B+'2020/financialresult202003_e.pdf'},
 {id:8, titulo:'Consolidated Annual Financial Results FY2018 (Kessan Tanshin, cerrado el 31-mar-2019)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2019-04', url:B+'2019/financialresult201903_e.pdf'},
 {id:9, titulo:'Consolidated Annual Financial Results FY2017 (Kessan Tanshin, cerrado el 31-mar-2018)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2018-04', url:B+'2018/financialresult201803_e.pdf'},
 {id:10, titulo:'Consolidated Annual Financial Results FY2016 (Kessan Tanshin, cerrado el 31-mar-2017)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2017-04', url:B+'2017/financialresult201703_e.pdf'},
 {id:11, titulo:'Consolidated Financial Results for the Three Months Ended June 30, 2026 (Kessan Tanshin 1T FY2026)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-07-31', url:B+'2026/financialresult202606_e.pdf'},
 {id:12, titulo:'Consolidated Financial Results for the Nine Months Ended December 31, 2025 (Kessan Tanshin 3T FY2025)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-01', url:B+'2026/financialresult202512_e.pdf'},
 {id:13, titulo:'Consolidated Financial Results for the Six Months Ended September 30, 2025 (Kessan Tanshin 2T FY2025)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2025-10', url:B+'2025/financialresult202509_e.pdf'},
 {id:14, titulo:'Consolidated Financial Results for the Three Months Ended June 30, 2025 (Kessan Tanshin 1T FY2025)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2025-07', url:B+'2025/financialresult202506_e.pdf'},
 {id:15, titulo:'Consolidated Financial Results for the Nine Months Ended December 31, 2024 (Kessan Tanshin 3T FY2024)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2025-01', url:B+'2025/financialresult202412_e.pdf'},
 {id:16, titulo:'Consolidated Financial Results for the Six Months Ended September 30, 2024 (Kessan Tanshin 2T FY2024)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2024-10', url:B+'2024/financialresult202409_e.pdf'},
 {id:17, titulo:'Consolidated Financial Results for the Three Months Ended June 30, 2024 (Kessan Tanshin 1T FY2024)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2024-07', url:B+'2024/financialresult202406_e.pdf'},
 {id:18, titulo:'Financial Results for the Three Months Ended June 30, 2026 (presentación de resultados 1T FY2026: ventas y pedidos por división y región)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-07-31', url:B+'2026/reference202606_e.pdf'},
 {id:19, titulo:'Financial Results for the Year Ended March 31, 2026 (presentación de resultados FY2025)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-04-24', url:B+'2026/reference202603_e.pdf'},
 {id:20, titulo:'Financial Results for the Year Ended March 31, 2025 (presentación de resultados FY2024)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2025-04-23', url:B+'2025/reference202503_e.pdf'},
 {id:21, titulo:'Q&A Summary of the Telephone Conference on Financial Results for the First Quarter ended June 30, 2026', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-07-31', url:B+'2026/qasummary202606_e.pdf'},
 {id:22, titulo:'Q&A Summary of the Telephone Conference on Financial Results for the Year ended March 31, 2026', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-04-24', url:B+'2026/qasummary202603_e.pdf'},
 {id:23, titulo:'FANUC Integrated Report 2025 (tabla de diez años y datos corporativos)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2025', url:'https://www.fanuc.co.jp/en/ir/annualreport/pdf/integratedreport2025_e.pdf'},
 {id:24, titulo:'Notice of Convocation of the 57th Ordinary General Meeting of Shareholders (informe de gestión e informes del auditor, FY2025)', editor:'FANUC Corporation', tipo:'Primaria', fecha:'2026-06', url:'https://www.fanuc.co.jp/en/ir/meeting/pdf/generalmeeting57convocation_e.pdf'},
];
const q = [
 // periodo, ventas, ventas año anterior, OI, D&A, BPA
 ['2T FY24',192862,196924,42630,11536,43.71],
 ['3T FY24',197052,197830,34908,11604,35.22],
 ['4T FY24',212115,198749,48350,12189,47.92],
 ['1T FY25',196363,195100,42428,11077,40.56],
 ['2T FY25',211205,192862,43536,11524,44.98],
 ['3T FY25',215744,197052,41740,11986,39.69],
 ['4T FY25',234519,212115,56059,13195,53.24],
 ['1T FY26',231035,196363,53492,11182,54.63],
];
const items = q.map(([p,v,v0,oi,da,bpa])=>({periodo:p, ingresos:v, crecimiento_pct:Math.round((v/v0-1)*1000)/10, crecimiento_organico_pct:null, ebitda:oi+da, margen_ebitda_pct:Math.round((oi+da)/v*1000)/10, bpa, vs_consenso:null}));

const segH = { // FA, ROBOT, ROBOMACHINE, Service por ejercicio
 FY2016:[175016,190043,93939,77944], FY2017:[222254,227827,190182,86333], FY2018:[211088,217526,115056,91898], FY2019:[143247,202491,74912,87602],
 FY2020:[149240,210024,114518,77505], FY2021:[226165,268478,144633,93732], FY2022:[250113,356984,132788,112071], FY2023:[180384,380944,103388,130558],
 FY2024:[194824,329566,137588,135151], FY2025:[208478,378610,129600,141143] };
const segNames = [
 ['FA (CNC y servomotores)','Controles numéricos (CNC), servomotores y láseres para fabricantes de máquina herramienta; China, Taiwán, India y Japón concentran la demanda.'],
 ['ROBOT','Robots industriales (de soldadura, pintura, manipulación, colaborativos) y sistemas robotizados; clientes del automóvil y la industria general.'],
 ['ROBOMACHINE','ROBODRILL (centros de mecanizado compactos), ROBOSHOT (inyectoras eléctricas) y ROBOCUT (electroerosión); muy ligado a smartphones, electrónica y piezas para servidores.'],
 ['Servicio','Mantenimiento, repuestos y formación sobre la base instalada de los tres negocios; Fanuc lo publica como división propia en la información por producto.'],
];
const segmentos = segNames.map(([nombre,descripcion],i)=>({nombre, descripcion, tipo_resultado:null, historico:Object.entries(segH).map(([periodo,a])=>({periodo, ingresos:a[i], resultado:null}))}));

const cuenta = b.cuenta;
const A = {
 negocio: {
  descripcion: null, como_gana_dinero: null,
  segmentos,
  geografias: [
   {nombre:'Asia (sin China)', peso_pct:14.5}, {nombre:'China', peso_pct:26.6}, {nombre:'Américas', peso_pct:27.1},
   {nombre:'Europa', peso_pct:17.8}, {nombre:'Japón', peso_pct:12.9}, {nombre:'Otros', peso_pct:1.1} ],
  geografias_criterio: 'destino',
  clientes: null,
  kpis: [
   {kpi:'Pedidos del ejercicio (consolidado)', valor_anterior:'796,1 mil M JPY (FY2024)', valor_actual:'883,4 mil M JPY (FY2025)', variacion:'+11,0 %', comentario:'Suma de los pedidos trimestrales publicados en las presentaciones [19, 20]. Fanuc no publica pedidos anuales ni cartera en el Tanshin.'},
   {kpi:'Book-to-bill del ejercicio (pedidos / ventas)', valor_anterior:'1,00 (FY2024)', valor_actual:'1,03 (FY2025)', variacion:'+0,03', comentario:'Cálculo propio con pedidos de las presentaciones y ventas del Tanshin [1, 19, 20].'},
   {kpi:'Pedidos del 1T (abr-jun)', valor_anterior:'205,9 mil M JPY (1T FY25)', valor_actual:'281,9 mil M JPY (1T FY26)', variacion:'+36,9 %', comentario:'Book-to-bill 1,22 en 1T FY26 (281,9/231,0) frente a 1,05 un año antes; la dirección atribuye parte a pedidos adelantados por plazos de entrega largos [18, 21].'},
   {kpi:'Pedidos FA', valor_anterior:'202,2 mil M (FY2024); 55,0 mil M (1T FY25)', valor_actual:'229,6 mil M (FY2025); 90,2 mil M (1T FY26)', variacion:'+13,6 % anual; +63,8 % en el 1T', comentario:'China (semiconductores para centros de datos, 3C, vehículo eléctrico, humanoides), India, Taiwán y Corea [18, 19, 21].'},
   {kpi:'Pedidos ROBOT', valor_anterior:'317,3 mil M (FY2024); 90,6 mil M (1T FY25)', valor_actual:'381,8 mil M (FY2025); 97,9 mil M (1T FY26)', variacion:'+20,3 % anual; +8,1 % en el 1T', comentario:'EE. UU. (inversión del automóvil que vuelve a híbridos y combustión) y China [19, 20, 22].'},
   {kpi:'Pedidos ROBOMACHINE', valor_anterior:'144,0 mil M (FY2024); 29,0 mil M (1T FY25)', valor_actual:'133,3 mil M (FY2025); 57,6 mil M (1T FY26)', variacion:'-7,4 % anual; +98,3 % en el 1T', comentario:'Salto desde el 4T FY25 (43,8 mil M) por ROBOSHOT y ROBODRILL para piezas de servidores de IA y algo de smartphones [18, 22].'},
   {kpi:'Existencias al cierre', valor_anterior:'350,6 mil M JPY (mar-23, máximo)', valor_actual:'292,2 mil M JPY (mar-26)', variacion:'-16,7 %', comentario:'La normalización del inventario acumulado en FY2021-22 explica la mitad del salto del flujo operativo de FY2024-25 [1, 4].'},
   {kpi:'Inversión en I+D', valor_anterior:'46,7 mil M JPY (FY2024)', valor_actual:'45,0 mil M JPY (FY2025)', variacion:'-3,6 %', comentario:'5,2 % de las ventas en FY2025; 10,8 mil M en el 1T FY26 [18, 19].'},
  ],
  confianza: 'Alta'
 },
 financieros: {
  cuenta,
  ltm: { periodo:'LTM jun-26', fecha_fin:'2026-06-30', ingresos:892503, ebitda:242714, ebit:194827, beneficio_neto:179680, bpa:192.54, dpa:107.09, dpa_extraordinario:0, fcf:null },
  cambios_perimetro: [],
  comentario: null, ajustes: null,
  confianza: 'Alta'
 },
 trimestres: { items, ultima_presentacion: null, confianza:'Alta' },
 balance: { historico: b.balance, vencimientos: [], liquidez: null, rating: null, coste_deuda_pct: null, vida_media_anios: null, otros_pasivos: null, comentario: null, confianza:'Alta' },
 flujos: { historico: b.flujos, comentario: null, confianza:'Alta' },
 calidad: null, rentabilidad: null, capital: null,
 fuentes, huecos: []
};
const extra = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2],'utf8')) : {};
for (const [k,v] of Object.entries(extra)) { if (k.includes('.')) { const [a,c]=k.split('.'); A[a][c]=v; } else A[k]=v; }
fs.writeFileSync('A.json', JSON.stringify(A,null,1));
console.log('ok', Object.keys(A).map(k=>k+':'+(A[k]===null?'null':'ok')).join(' '));
