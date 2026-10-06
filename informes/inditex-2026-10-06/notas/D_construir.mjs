// Construye notas/D.json (agente D: mercado y valoración, Inditex, corte 2026-10-06) a partir de D_bolsa.json, comps.json y los datos copiados de las fuentes.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const rd = f => existsSync(new URL(f, import.meta.url)) ? JSON.parse(readFileSync(new URL(f, import.meta.url))) : null;
const B = rd('./D_bolsa.json');
const fuentes = [
  { id: 1, titulo: 'Histórico diario de cotizaciones (chart API): ITX.MC, ^IBEX, ^STOXX50E, EXH8.DE (iShares STOXX Europe 600 Retail), LYXIB.MC (Amundi IBEX 35)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://query1.finance.yahoo.com/v8/finance/chart/ITX.MC' },
  { id: 2, titulo: "Consolidated Annual Accounts and Directors' Report 2025 (Inditex Group)", editor: 'Inditex', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.inditex.com/itxcomweb/api/media/59f58f71-301d-4a50-85a6-0441fb9f37c5/ENGL-CCAAeIGGrupo2025.pdf' },
  { id: 3, titulo: 'Annual Corporate Governance Report 2025 (IAGC)', editor: 'Inditex', tipo: 'Primaria', fecha: '2026-03-10', url: 'https://www.inditex.com/itxcomweb/api/media/bc056846-807b-4924-b11c-c85797226a7f/IAGC2025_ENG.pdf' },
  { id: 4, titulo: 'Interim Half Year 2026 Results (nota y anexos: cuenta, balance y flujos a 31-jul-2026)', editor: 'Inditex', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://www.inditex.com/itxcomweb/ww/en/investors' },
  { id: 5, titulo: 'FY2025 Results (nota de resultados y anexos; dividendo de 1,75 EUR)', editor: 'Inditex', tipo: 'Primaria', fecha: '2026-03-10', url: 'https://www.inditex.com/itxcomweb/ww/en/investors' },
  { id: 6, titulo: 'INDITEX: Target Price Consensus and Analysts Recommendations', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/INDITEX-16943135/consensus/' },
  { id: 7, titulo: 'INDITEX: Financials, forecasts and estimates (finances)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/INDITEX-16943135/finances/' },
  { id: 8, titulo: 'Industria de Diseño Textil (BME:ITX) Stock Forecast', editor: 'Stock Analysis (S&P Global Market Intelligence / TipRanks)', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://stockanalysis.com/quote/bme/ITX/forecast/' },
  { id: 9, titulo: 'Industria de Diseño Textil (BME:ITX) Statistics & Valuation Metrics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://stockanalysis.com/quote/bme/ITX/statistics/' },
  { id: 10, titulo: 'INDITEX: resumen de cotización (capitalización, valor empresa, free float)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/INDITEX-16943135/' },
  { id: 11, titulo: 'INDITEX: calendario de eventos (resultados 9M el 2-dic-2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/INDITEX-16943135/calendar/' },
  { id: 12, titulo: 'Inditex completa su programa de recompra de acciones, con un ahorro de 19 millones de euros', editor: 'FashionUnited', tipo: 'Prensa', fecha: '2026-07-02', url: 'https://fashionunited.es/noticias/empresas/inditex-completa-su-programa-de-recompra-de-acciones-con-un-ahorro-de-19-millones-de-euros/2026070249908' },
  { id: 13, titulo: 'Inditex reparte 14,8 millones de euros en acciones entre sus directivos', editor: 'FashionUnited', tipo: 'Prensa', fecha: '2026-04-02', url: 'https://fashionunited.es/noticias/empresas/inditex-reparte-14-8-millones-de-euros-en-acciones-entre-sus-directivos-incluyendo-a-carlos-torretta/2026040248896' },
  { id: 14, titulo: 'Notificaciones de posiciones cortas - Industria de Diseño Textil, S.A.', editor: 'CNMV', tipo: 'Primaria', fecha: '2026-10-06', url: 'https://www.cnmv.es/portal/consultas/ee/posicionescortas?nif=A-15075062&lang=es' },
];
const huecos = [];
const r = x => x == null ? null : Math.round(x * 100) / 100;
const es = x => String(x).replace('.', ',');

// ---------- identificacion ----------
const CAPITAL = 3116.652; // acciones emitidas (M)
const AUTOCARTERA_EST = (285232 + 3000000 - 301220) / 1e6; // estimación: 31-ene-2026 + recompra feb-jun 2026 - entregas a directivos de abril 2026 conocidas
const identificacion = {
  nombre: 'Industria de Diseño Textil, S.A. (Inditex)', nombre_corto: 'Inditex', ticker: 'ITX', isin: 'ES0148396007',
  mercado: 'Bolsa de Madrid (Mercado Continuo, SIBE), en EUR', indice_referencia: 'IBEX 35',
  pais: 'España', pais_iso: 'ES', sector: 'Consumer Discretionary (Consumo discrecional)', industria: 'Specialty Retail - Apparel Retail (distribución especializada de ropa)',
  sede: 'Arteixo (A Coruña)', fundacion: '1985', empleados: 163047, web: 'www.inditex.com',
  precio: 53.82, fecha_precio: '2026-10-06', acciones: r(CAPITAL - AUTOCARTERA_EST), capitalizacion_publicada: 168000, free_float_pct: 35.64,
  max_52s: B.s52.intradia_max[1], min_52s: B.s52.intradia_min[1],
  volumen_medio_diario: `≈ ${es(B.volumen_3m.meur_dia)} M EUR/día (${es((B.volumen_3m.acciones_dia / 1e6).toFixed(2))} M de acciones; 3 meses, solo Bolsa de Madrid)`,
  proximos_resultados: '2026-12-02',
  extra: [
    'Precio: cierre del 6-oct-2026, 53,82 EUR (Yahoo, último dato a las 17:39 CEST; Stock Analysis da el mismo cierre) [1, 9]. Cierre del 5-oct: 53,00 EUR [1, 6].',
    'Acciones: capital de 3.116.652.000 acciones [2]. Autocartera de 285.232 acciones a 31-ene-2026 (0,0092 %) [2, 3]. Programa de recompra de 3.000.000 de acciones completado el 30-jun-2026 por 160,48 M EUR [12] (salida de caja de 161 M en el 1S26 [4]). En abril de 2026 se entregaron 301.220 acciones a directivos (las notificadas) [13]. Estimación propia: autocartera ≈ 2,98 M a 31-jul-2026 y acciones en circulación ≈ 3.113,7 M; rango 3.113,4-3.116,4 M según cuántas acciones se entregaron a empleados no notificados. El BPA del 1S26 usa una media ponderada de 3.115,92 M [4]. Pendiente de A: autocartera exacta del informe financiero semestral (CNMV).',
    'Capitalización publicada: 168.000 M EUR en MarketScreener (redondeada a «168B») [10]; Stock Analysis da 165.100 M EUR, aparentemente con el cierre del 5-oct (53,00 x 3.115 M) [9]. Precio x acciones estimadas = 167.580 M EUR.',
    'Free float: 35,6379 % a 31-ene-2026 (IAGC): Amancio Ortega 59,294 % (Pontegadea 50,010 % y Partler 9,284 %), Sandra Ortega 5,053 % (Rosp Corunna), consejo 0,0089 %, autocartera 0,0092 % [3]. MarketScreener: 35,64 % [10]. No es el ≈40 % del encargo.',
    `52 semanas (7-oct-2025 a 6-oct-2026): máximo intradía 59,42 EUR (${B.s52.intradia_max[0]}), mínimo intradía 46,07 EUR (${B.s52.intradia_min[0]}); en cierres, ${es(B.s52.cierre_max[1])} (${B.s52.cierre_max[0]}) y ${es(B.s52.cierre_min[1])} (${B.s52.cierre_min[0]}) [1].`,
    `Volumen: media de ${B.volumen_3m.sesiones} sesiones desde el ${B.volumen_3m.desde}, ${B.volumen_3m.acciones_dia} acciones/día en la Bolsa de Madrid según Yahoo [1]; Stock Analysis da 2,16 M acciones/día de media en 20 sesiones [9]. No incluye plataformas alternativas (Cboe, Turquoise), que suelen sumar volumen relevante.`,
    'Próximos resultados: 9M FY2026 (feb-oct 2026) el 2-dic-2026 según el calendario de MarketScreener [11]; el año anterior los 9M se publicaron el 3-dic-2025 [7]. La página del calendario de Inditex no se pudo abrir (redirige a la portada). Próximo dividendo: 0,875 EUR (0,325 ordinario + 0,550 extraordinario) el 2-nov-2026, fecha ex 29-oct-2026 [5, 11].',
    'Empleados: 163.047 a 31-ene-2026 (cuentas consolidadas, nota 6) [2]. MarketScreener y Stock Analysis dan 156.836 (otra fecha o definición) [9, 10].',
    'Sector GICS: Consumer Discretionary / Specialty Retail / Apparel Retail (clasificación habitual de ITX; no se ha abierto la ficha GICS de MSCI/S&P).',
  ],
};
huecos.push({ seccion: 'identificacion', campo: 'acciones (autocartera exacta a 31-jul-2026)', tipo: 'Núcleo', intentos: '1) Anexos y nota del 1S26 de Inditex: no dan la autocartera; 2) registro IFI de la CNMV (formulario dinámico, sin datos) y búsqueda del informe financiero semestral; 3) derivado: 285.232 (31-ene-2026) + 3.000.000 recompradas (feb-jun 2026) - 301.220 entregadas a directivos en abril', decision: 'Calculado y marcado como estimación' });

// ---------- bolsa ----------
const R = B.rentabilidades;
const per = ['En el año', '1 año', '3 años (anual.)', '5 años (anual.)', '10 años (anual.)'];
const bolsa = {
  tipo_rentabilidad: 'de precio (sin dividendos)',
  rentabilidades: per.map(p => ({ periodo: p, accion_pct: R['precio ' + p].ITX, indice_pct: R['precio ' + p].IBEX, sector_pct: R['precio ' + p].RETAIL })),
  anual: Object.entries(B.anual).map(([y, v]) => ({ anio: y, accion_pct: v.ITX_c, indice_pct: v.IBEX_c })),
  beta: B.beta.ibex_precio_5a.beta, volatilidad_pct: B.volatilidad_1a.pct, max_drawdown_pct: B.max_drawdown_5a_c.pct, posicion_corta_pct: 0,
  extra: [
    'Todas las rentabilidades son de precio porque el IBEX 35 de Yahoo es índice de precio; el índice sectorial es el ETF iShares STOXX Europe 600 Retail UCITS (DE) (EXH8.DE), que reparte dividendos, tomado también a precio [1]. Cálculo propio con cierres de Yahoo hasta el 6-oct-2026 (script notas/D_bolsa.mjs, salida D_bolsa.json).',
    `Rentabilidad total de ITX (dividendos reinvertidos, adjclose de Yahoo): en el año ${es(R['total En el año'].ITX)} %, 1 año ${es(R['total 1 año'].ITX)} %, 3 años ${es(R['total 3 años (anual.)'].ITX)} % anual, 5 años ${es(R['total 5 años (anual.)'].ITX)} % anual, 10 años ${es(R['total 10 años (anual.)'].ITX)} % anual [1].`,
    `IBEX con dividendos aproximado con el ETF Amundi IBEX 35 (LYXIB.MC, adjclose, neto de comisiones): en el año ${es(R['total En el año'].IBEXETF)} %, 1 año ${es(R['total 1 año'].IBEXETF)} %, 3 años ${es(R['total 3 años (anual.)'].IBEXETF)} %, 5 años ${es(R['total 5 años (anual.)'].IBEXETF)} %, 10 años ${es(R['total 10 años (anual.)'].IBEXETF)} % anual; sector con dividendos (EXH8): ${es(R['total 1 año'].RETAIL)} % a 1 año y ${es(R['total 5 años (anual.)'].RETAIL)} % anual a 5 años [1].`,
    `EURO STOXX 50 (precio): en el año ${es(R['precio En el año'].SX5E)} %, 1 año ${es(R['precio 1 año'].SX5E)} %, 5 años ${es(R['precio 5 años (anual.)'].SX5E)} % anual, 10 años ${es(R['precio 10 años (anual.)'].SX5E)} % anual [1].`,
    `Años en que ITX batió al IBEX (precio): 2016, 2019, 2021, 2023 y 2024; quedó por detrás en 2017 (${es(B.anual[2017].ITX_c)} % frente a ${es(B.anual[2017].IBEX_c)} %), 2018, 2020, 2022 y 2025 (${es(B.anual[2025].ITX_c)} % frente a ${es(B.anual[2025].IBEX_c)} %) [1].`,
    `Beta 5 años mensual (oct-2021 a sep-2026, 60 meses) frente al IBEX (precio): ${es(B.beta.ibex_precio_5a.beta)} (R² ${es(B.beta.ibex_precio_5a.r2)}; ajustada de Blume ${es(B.beta.ibex_precio_5a.ajustada_blume)}); con dividendos frente al ETF del IBEX: ${es(B.beta.ibex_total_etf_5a.beta)}; frente al EURO STOXX 50: ${es(B.beta.sx5e_precio_5a.beta)} (R² ${es(B.beta.sx5e_precio_5a.r2)}); frente al ETF de distribución europea: ${es(B.beta.retail_5a.beta)} (R² ${es(B.beta.retail_5a.r2)}); 2 años frente al IBEX: ${es(B.beta.ibex_precio_2a.beta)} [1]. Stock Analysis publica una beta 5 años de 0,96 (sin decir frente a qué índice) [9].`,
    `Volatilidad: ${es(B.volatilidad_1a.pct)} % anualizada (desviación de los rendimientos logarítmicos diarios de ${B.volatilidad_1a.sesiones} sesiones x raíz de 252) [1].`,
    `Caída máxima en 5 años: ${es(B.max_drawdown_5a_c.pct)} % en precio, del ${B.max_drawdown_5a_c.tramo[0]} (${es(B.max_drawdown_5a_c.tramo[1])} EUR) al ${B.max_drawdown_5a_c.tramo[2]} (${es(B.max_drawdown_5a_c.tramo[3])} EUR) [1].`,
    'Posición corta: el registro de la CNMV no muestra para Inditex ninguna notificación viva igual o superior al 0,5 % del capital, ni notificaciones anteriores (consulta del 6-oct-2026); por eso 0. Las posiciones entre 0,2 % y 0,5 % se notifican a la CNMV pero no se publican [14].',
    'Dividendo: el FY2025 paga 1,75 EUR (0,875 el 4-may-2026 y 0,875 el 2-nov-2026); rentabilidad por dividendo del 3,25 % al precio actual [5, 9].',
  ],
  confianza: 'Alta',
};

// ---------- secciones que se añaden después (D_secciones.mjs) ----------
const D = { identificacion, consenso: null, bolsa, multiplos_historicos: null, comparables: null, transacciones: null, wacc: null, puente_mercado: null, fuentes, huecos };
if (existsSync(new URL('./D_secciones.mjs', import.meta.url))) { const m = await import('./D_secciones.mjs'); m.default(D, { B, rd, r, es }); }
writeFileSync(new URL('./D.json', import.meta.url), JSON.stringify(D, null, 1));
console.log('D.json escrito:', Object.entries(D).map(([k, v]) => k + (v ? '' : '(vacío)')).join(' '), '| fuentes', D.fuentes.length, '| huecos', D.huecos.length);
