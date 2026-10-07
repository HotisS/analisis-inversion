import fs from 'fs';
const rd = f => JSON.parse(fs.readFileSync(new URL(f, import.meta.url)));
const b = rd('./bolsa.json');
const bt = rd('./D_bolsa_1306.json');
const precio = b.identificacion.precio;
const acciones = (243207684 - 682599) / 1e6; // 242.525085
const caja_cp = 564751, valores_cp = 861843, inv_sec_linea = 1598277, asoc_libros = 50015, ltd = 20422;
const caja = caja_cp + valores_cp + (inv_sec_linea - asoc_libros) + ltd;
const fmt = n => Math.round(n).toLocaleString('es-ES');
const fuentes = [
 {id:1,titulo:"Summary of Consolidated Financial Results for the Three Months Ended June 20, 2026 (Kessan Tanshin 1T, JGAAP)",editor:"Keyence Corporation",tipo:"Primaria",fecha:"2026-07-28",url:"https://www.keyence.co.jp/pdf/ConsolidatedFinancialResultsForThe1stQuarterEndedJune_20_2026(JP_GAAP).pdf"},
 {id:2,titulo:"Annual Report 2026 (notas 4, Marketable and investment securities, y 9, Financial instruments)",editor:"Keyence Corporation",tipo:"Primaria",fecha:"2026-06",url:"https://www.keyence.co.jp/pdf/AnnualReport_2026_en.pdf"},
 {id:3,titulo:"Históricos diarios de 6861.T, ^N225, 1306.T y 1625.T (herramientas/bolsa.mjs)",editor:"Yahoo Finance",tipo:"Datos de mercado",fecha:"2026-10-06",url:"https://finance.yahoo.com/quote/6861.T/history"},
 {id:4,titulo:"Keyence Corporation: Financial Data, Forecasts, Estimates",editor:"MarketScreener",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://www.marketscreener.com/quote/stock/KEYENCE-CORPORATION-6492212/finances/"},
 {id:5,titulo:"Keyence Corporation: Consensus (analysts' opinion, target prices)",editor:"MarketScreener",tipo:"Analistas",fecha:"2026-10-07",url:"https://www.marketscreener.com/quote/stock/KEYENCE-CORPORATION-6492212/consensus/"},
 {id:6,titulo:"Keyence Corporation: Calendar",editor:"MarketScreener",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://www.marketscreener.com/quote/stock/KEYENCE-CORPORATION-6492212/calendar/"},
 {id:7,titulo:"キーエンス (6861) 株価予想 (consenso de analistas)",editor:"Minkabu",tipo:"Analistas",fecha:"2026-10-07",url:"https://minkabu.jp/stock/6861/analysis"},
 {id:8,titulo:"キーエンス (6861) ficha: 決算発表予定日",editor:"Kabutan",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://kabutan.jp/stock/?code=6861"},
 {id:9,titulo:"Keyence (TYO:6861) Statistics",editor:"Stock Analysis",tipo:"Datos de mercado",fecha:"2026-10-07",url:"https://stockanalysis.com/quote/tyo/6861/statistics/"},
 {id:10,titulo:"Interest Rate (October 2026), JGB constant maturity yields (jgbcme.csv)",editor:"Ministry of Finance Japan",tipo:"Primaria",fecha:"2026-10-06",url:"https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv"},
 {id:11,titulo:"Euro foreign exchange reference rates (últimos 90 días)",editor:"Banco Central Europeo",tipo:"Datos de mercado",fecha:"2026-10-06",url:"https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml"},
 {id:12,titulo:"Annual Report 2017 (desdoblamiento 2x1 del 21-ene-2017)",editor:"Keyence Corporation",tipo:"Primaria",fecha:"2017-06",url:"https://www.keyence.co.jp/pdf/AnnualReport_2017_en.pdf"}
];
let extra = {};
try { extra = (await import('./D_extra.mjs?' + Date.now())).default; } catch (e) { console.error('sin D_extra:', e.message); }
const cap = precio * acciones;
const D = {
 identificacion: {
  nombre:"KEYENCE CORPORATION", nombre_corto:"Keyence", ticker:"6861", isin:"JP3236200006", mercado:"Bolsa de Tokio (TSE Prime)", indice_referencia:"Nikkei 225",
  pais:"Japón", pais_iso:"JP", sector:"Information Technology", industria:"Electronic Equipment, Instruments & Components", sede:"Osaka (Japón)", fundacion:null, empleados:null, web:"https://www.keyence.co.jp",
  precio, fecha_precio:b.identificacion.fecha_precio, acciones:+acciones.toFixed(3), capitalizacion_publicada:19780000, free_float_pct:+(187.20/242.53*100).toFixed(1),
  max_52s:b.identificacion.max_52s, min_52s:b.identificacion.min_52s,
  volumen_medio_diario:`≈ ${(b.volumen_3m.importe_dia_millones/1000).toFixed(1).replace('.',',')} mil M JPY/día (${Math.round(b.volumen_3m.acciones_dia/1000)} mil acciones; 3 meses, 60 sesiones)`,
  proximos_resultados:"2026-10-29",
  nota:"Precio: cierre del 6-oct-2026 en Yahoo [3] (el del 7-oct no estaba publicado al ejecutar la herramienta; MarketScreener y Minkabu dan 81.560 JPY al cierre del 7-oct, +0,09 % [4, 7]). Acciones: 243.207.684 emitidas menos 682.599 en autocartera a 20-jun-2026 = 242.525.085 [1]; no hay instrumentos dilutivos (el BPA diluido no se publica, «–») [1]. Capitalización publicada: 19,78 billones JPY de Stock Analysis [9]. Flotante: 187,20 M acciones según Stock Analysis [9] (77,2 %). Próximos resultados (2T del ejercicio abr-2026 a mar-2027): 29-oct-2026 según Kabutan y Stock Analysis («confirmed») [8, 9]; MarketScreener lo da el 28-oct en hora de Nueva York [6]."
 },
 consenso: extra.consenso ?? null,
 bolsa: {
  tipo_rentabilidad: bt.tipo_rentabilidad,
  rentabilidades: bt.bolsa.rentabilidades,
  anual: bt.bolsa.anual,
  beta: b.bolsa.beta, volatilidad_pct: b.bolsa.volatilidad_pct, max_drawdown_pct: b.bolsa.max_drawdown_pct, posicion_corta_pct: null,
  comentario: extra.bolsa_comentario ?? "",
  confianza:"Alta",
  nota_datos:"Rentabilidades totales (cierre ajustado por dividendos) de 6861.T, del ETF NEXT FUNDS TOPIX (1306.T) como índice y del ETF NEXT FUNDS TOPIX-17 Electric Appliances & Precision (1625.T) como sector [3]. La beta (1,07; 60 meses frente al Nikkei 225) sale de la ejecución con ^N225: frente a 1306.T la herramienta da 0,03, un valor sin sentido que atribuimos a un salto no ajustado en la serie mensual del ETF; no se usa. Beta de contraste: 1,02 a 5 años de Stock Analysis [9]. Volatilidad a 1 año (40,3 %) y caída máxima a 5 años (−38,8 %, 19-nov-2021 → 1-jul-2022) de la misma herramienta [3]. Con ^N225 (solo precio) la acción gana un 35,3 % en un año frente al 47,4 % del índice [3]. Japón no tiene registro público gratuito de posiciones cortas por valor equivalente al de la CNMV en esta búsqueda: posicion_corta_pct null."
 },
 multiplos_historicos: {
  serie: b.cierres_ejercicio.map(c => ({ anio:c.anio, precio_cierre:c.precio_cierre, ev_ebitda_ntm:null, per_ntm:null, excluir:false })),
  comentario: extra.mh_comentario ?? "",
  nota_datos:"Precios de Yahoo [3] al último día de cotización de marzo (31-mar o la sesión anterior), no al 20-mar en que cierra el ejercicio: la herramienta toma el cierre de fin de mes. Están ajustados por el desdoblamiento 2x1 del 21-ene-2017 [12] (FY2015 y FY2016 en base actual de acciones): combinarlos con BPA y acciones reexpresados. Etiquetas FY por año de inicio, como la empresa (FY2025 = ejercicio cerrado el 20-mar-2026, precio del 31-mar-2026).",
  confianza:"Media"
 },
 comparables: extra.comparables ?? null,
 transacciones: extra.transacciones ?? null,
 dcf: { wacc: { tasa_libre_pct:3.103, beta:b.bolsa.beta, prima_mercado_pct:5.5, prima_adicional_pct:0, coste_deuda_pct:null, tasa_impositiva_pct:null, peso_deuda_pct:0,
   nota:"Tasa libre: rendimiento del JGB a 10 años a 6-oct-2026, 3,103 % (Ministerio de Finanzas de Japón, curva a vencimiento constante, fila «2026/10/6», columna 10Y) [10]; el del 7-oct aún no estaba publicado. Beta 1,07 (5 años, mensual, frente al Nikkei 225, sin ajustar) [3]; contraste 1,02 (Stock Analysis, 5 años) [9]; ajustada de Blume (0,67 × 1,07 + 0,33) = 1,05. Keyence no tiene deuda financiera [1]: beta apalancada = desapalancada y peso de la deuda 0. Prima de mercado: 5,5 % (centro del rango 5-6 % del procedimiento; sin fuente japonesa gratuita mejor). Ojo: el JGB a 10 años ha subido a 3,1 %; con un terminal en JPY del 1-1,5 % el diferencial es más estrecho que en análisis anteriores." } },
 valoracion: { puente: {
  fecha:"2026-06-20", deuda_financiera:0, arrendamientos:0, caja, minoritarios:0, pensiones:0, asociadas:99243, otros_ajustes:0,
  comentario:`Balance consolidado a 20-jun-2026 del Kessan Tanshin del 1T [1]. Keyence no tiene préstamos ni bonos: el pasivo total (176.150 M JPY) son proveedores, impuestos, bonus y otros [1]. Caja e inversiones líquidas = ${fmt(caja)} M JPY: efectivo y depósitos 564.751 + valores a corto («Securities»: deuda pública, bonos corporativos y certificados de depósito a menos de un año) 861.843 + valores de inversión a largo plazo 1.548.262 + depósitos a plazo a largo 20.422 [1]. **De ese total, 1.568.684 M JPY (52 %) es inversión a largo plazo** (vencimiento a más de un año). A 20-mar-2026 la cartera a largo (1.464.288 M JPY) era deuda pública 537.638, bonos corporativos 585.196, certificados de depósito 335.000 y acciones 6.453, todo disponible para la venta a valor razonable [2]; es renta fija de calidad que se puede vender, por eso va entera a caja. La línea «Investment securities» del trimestral (1.598.277) incluye las participaciones en asociadas: se restan a su valor en libros de 20-mar-2026, 50.015 M JPY [2] (estimación propia: el trimestral no las desglosa). Asociadas: 99.243 M JPY, su valor razonable de nivel 1 (cotizan) a 20-mar-2026 [2], en vez de los 50.015 en libros. Sin minoritarios (el beneficio neto coincide con el atribuido) [1], sin déficit de pensiones (planes de aportación definida y de prepago) [2] y sin arrendamientos en balance (JGAAP; la nueva norma ASBJ n.º 34 aún no se aplica) [2]. Caja + asociadas = ${fmt((caja+99243)/acciones)} JPY por acción, el ${((caja+99243)/cap*100).toFixed(1).replace('.',',')} % de la capitalización.`
 } },
 fuentes: fuentes.concat(extra.fuentes ?? []),
 huecos: extra.huecos ?? []
};
fs.writeFileSync(new URL('./D.json', import.meta.url), JSON.stringify(D, null, 2));
console.log('caja', caja, 'cap', Math.round(cap), 'EV', Math.round(cap - caja - 99243));
