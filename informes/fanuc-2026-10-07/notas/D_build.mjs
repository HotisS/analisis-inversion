// Construye D.json (subagente D). Se reejecuta tras cada bloque.
import fs from 'node:fs';
const b = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url)));
const fuentes = [
 {id:1,titulo:"Consolidated Quarterly Financial Results for the three months ended June 30, 2026 (Kessan Tanshin 1T FY2026)",editor:"FANUC Corporation",tipo:"Primaria",fecha:"2026-07-31",url:"https://www.fanuc.co.jp/en/ir/announce/pdf/2026/financialresult202606_e.pdf"},
 {id:2,titulo:"Consolidated Annual Financial Results for the year ended March 31, 2026 (Kessan Tanshin FY2025)",editor:"FANUC Corporation",tipo:"Primaria",fecha:"2026-04-24",url:"https://www.fanuc.co.jp/en/ir/announce/pdf/2026/financialresult202603_e.pdf"},
 {id:3,titulo:"Históricos diarios de 6954.T, 1305.T (ETF TOPIX) y 1624.T (ETF TOPIX-17 Maquinaria), hasta el 6-oct-2026",editor:"Yahoo Finance",tipo:"Datos de mercado",fecha:"2026-10-06",url:"https://finance.yahoo.com/quote/6954.T/history/"},
 {id:4,titulo:"FANUC Corporation: datos financieros y estimaciones (Finances)",editor:"MarketScreener",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://www.marketscreener.com/quote/stock/FANUC-CORPORATION-6492019/finances/"},
 {id:5,titulo:"FANUC Corporation: consenso de analistas",editor:"MarketScreener",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://www.marketscreener.com/quote/stock/FANUC-CORPORATION-6492019/consensus/"},
 {id:6,titulo:"Fanuc Corp. (6954): consensus estimates",editor:"Investing.com",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://www.investing.com/equities/fanuc-corp.-consensus-estimates"},
 {id:7,titulo:"Fanuc (TYO:6954) Statistics",editor:"Stock Analysis",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://stockanalysis.com/quote/tyo/6954/statistics/"},
 {id:8,titulo:"ファナック(6954) 決算発表予定日",editor:"Kabutore",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://www.kabutore.biz/kessan/yotei_kobetsu.html?code=6954"},
 {id:9,titulo:"ファナック(6954) レポート (株予報)",editor:"Kabuyoho",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://kabuyoho.jp/reportTop?bcode=6954"},
 {id:10,titulo:"Corporate Outline",editor:"FANUC Corporation",tipo:"Primaria",fecha:"2026-10",url:"https://www.fanuc.co.jp/en/profile/outline.html"},
 {id:11,titulo:"Euro foreign exchange reference rates (eurofxref-daily), 6-oct-2026",editor:"Banco Central Europeo",tipo:"Datos de mercado",fecha:"2026-10-06",url:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"},
 {id:12,titulo:"Interest Rate (JGB benchmark yields), octubre de 2026 (jgbcme.csv)",editor:"Ministry of Finance Japan",tipo:"Primaria",fecha:"2026-10-06",url:"https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv"}
];
const acciones = (982272430 - 49114481) / 1e6; // [1]
const D = {
 identificacion: {
  nombre: "FANUC CORPORATION", nombre_corto: "Fanuc", ticker: "6954", isin: "JP3802400006",
  mercado: "Tokyo Stock Exchange (Prime)", indice_referencia: "TOPIX (ETF 1305.T para la rentabilidad total); también Nikkei 225",
  pais: "Japón", pais_iso: "JP", sector: "Industria", industria: "Maquinaria (GICS: Industrial Machinery & Supplies & Components)",
  sede: "Oshino-mura, Minamitsuru-gun, Yamanashi (Japón)", fundacion: "1972", empleados: 10040, web: "https://www.fanuc.co.jp/eindex.html",
  precio: b.identificacion.precio, fecha_precio: b.identificacion.fecha_precio,
  acciones: Math.round(acciones*1000)/1000,
  capitalizacion_publicada: 5750000,
  free_float_pct: 99.98,
  max_52s: b.identificacion.max_52s, min_52s: b.identificacion.min_52s,
  volumen_medio_diario: "≈ 36.700 M JPY/día (5,8 M de acciones; 3 meses) [3]",
  proximos_resultados: "2026-10-23"
 },
 consenso: null, bolsa: null, multiplos_historicos: null, comparables: null, transacciones: null, dcf: null, valoracion: null,
 fuentes, huecos: []
};
export { D };
if (process.argv[1].endsWith('D_build.mjs')) { fs.writeFileSync(new URL('./D.json', import.meta.url), JSON.stringify(D, null, 2)); console.log('ok', D.identificacion.acciones); }
