// Nota D: puesta al día tras los resultados del 1T FY27 (corte 21-oct-2026). Se ejecuta una vez después de D-comparables.mjs.
import { readFileSync, writeFileSync } from 'node:fs';
const ruta = new URL('./D.json', import.meta.url);
const D = JSON.parse(readFileSync(ruta, 'utf8'));
const B = JSON.parse(readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));

D.identificacion = {
  ...D.identificacion,
  precio: 260.81, fecha_precio: '2026-10-21', acciones: 1255.8, capitalizacion_publicada: 326380,
  max_52s: 438.5, min_52s: 135.5, volumen_medio_diario: '≈ 2.790 M USD/día (3 meses)', proximos_resultados: null,
};

D.consenso = {
  guidance: 'Lam da guía trimestral, no anual. El 1T FY27 (julio-septiembre de 2026) superó su propia guía: ventas de 8.219 M USD (guía 8.100 ± 400 M), margen bruto GAAP del 52,3 %, margen operativo del 40,0 % (guía 39,5 ± 1 %) y BPA GAAP de 2,19 USD (2,20 ajustado; guía 2,15 ± 0,15) [14]. Para el 2T FY27 (octubre-diciembre) guía ventas de 8.600 ± 400 M USD, margen bruto del 52,5 ± 1 %, margen operativo del 40,5 ± 1 % y BPA de 2,33 ± 0,15 USD con 1.253 M de acciones [14]. China pasa al 35 % de las ventas del trimestre. La visión de WFE (parte baja de 150.000 M USD en 2026 y un 2027 en expansión) es de la conferencia de julio; la del 21-oct se celebraba tras el cierre de esta nota [12].',
  estimaciones: [
    { periodo: 'FY2027e', ingresos: 34950, ebitda: null, ebit: null, bpa: 9.49, dpa: null, fuente: 'Yahoo Finance (LSEG), 31 analistas en BPA y 30 en ventas, antes de los resultados [15]; Stock Analysis (S&P Global): 34.920 M y 9,48 USD con 30 analistas [2]' },
    { periodo: 'FY2028e', ingresos: 42110, ebitda: null, ebit: null, bpa: 11.94, dpa: null, fuente: 'Yahoo Finance (LSEG), 26 analistas [15]' },
  ],
  recomendaciones: { n_analistas: 35, comprar: 29, mantener: 6, vender: 0, po_medio: 375.81, po_min: 290, po_max: 500 },
  revisiones: 'Antes de los resultados el consenso esperaba 8.140 M USD y 2,18 USD de BPA para el 1T y 8.540 M y 2,32 USD para el 2T [15]: Lam batió el 1T por un 1 % y guía el 2T en línea (8.600 M y 2,33 USD), sin la sorpresa que el mercado había descontado (Morgan Stanley esperaba más de 9.000 M [11]). El BPA de FY2028 sube de 10,00 USD hace 90 días a 11,56 hace 60 y a 11,94 hoy; el de FY2027, de 8,15 a 9,49, todo tras la guía de julio [15]. Los objetivos se mueven en los dos sentidos la última semana: Evercore baja de 355 a 315 USD y B. Riley de 390 a 338, Deutsche Bank sube de 320 a 375 y Cantor mantiene 500 [2]. Objetivo medio estable en 375,81 USD.',
  base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
  confianza: 'Media',
};

const rent = B.bolsa;
D.bolsa = {
  tipo_rentabilidad: rent.tipo_rentabilidad,
  rentabilidades: rent.rentabilidades,
  anual: rent.anual,
  beta: rent.beta, volatilidad_pct: rent.volatilidad_pct, max_drawdown_pct: rent.max_drawdown_pct, tramo_drawdown: rent.tramo_drawdown,
  posicion_corta_pct: 2.1,
  comentario: 'Lam ha sido una de las mejores acciones del mundo: un 40,8 % anual en diez años frente al 15,5 % del S&P 500 [1]. En 2025 subió un 139 % y en 2026 lleva un 52,8 %, por debajo del índice de semiconductores (69,8 %), con una volatilidad del 64 % y una beta de 1,91. El 30-jun-2026 tocó 438,50 USD y hoy está un 40 % por debajo. Las caídas fueron sectoriales (Applied, KLA y ASML cayeron igual): el informe de que Meta vendía capacidad de IA sobrante (1-jul), las dudas sobre el ritmo de la inversión en IA (agosto y septiembre) y la toma de beneficios tras el día del inversor de Applied (13-oct) [7-10]. La posición corta es pequeña, un 2,1 % de las acciones [17].',
  contexto: {
    movimiento: { fecha: '2026-10-21', var_1m_pct: -16.1, var_3m_pct: -18.4, var_6m_pct: -1.8, var_12m_pct: 81.1, dist_max_52s_pct: -39.8, dist_min_52s_pct: 86.8, dist_max_historico_pct: -39.8, tendencia: 'lateral', volatilidad_60d_pct: 63.1, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'oct-2025', var_pct: 17.6, causa: 'Resultados del 1T FY26 (5.324 M USD de ventas) [14].', veredicto: 'no cambia', condicion: null },
      { periodo: 'ene-2026', var_pct: 36.4, causa: 'Resultados del 2T FY26 y guía de 5.700 M USD para el 3T: inversión en memoria para IA [1].', veredicto: 'no cambia', condicion: null },
      { periodo: 'abr-2026', var_pct: 20.7, causa: 'Resultados del 3T FY26 (5.841 M USD) y guía de 6.600 M USD [1].', veredicto: 'no cambia', condicion: null },
      { periodo: 'may-2026', var_pct: 23.4, causa: 'Subidas de recomendación y de objetivo (Morgan Stanley a sobreponderar, Mizuho a 380 USD) por el WFE de 2026-2027 [13].', veredicto: 'no cambia', condicion: null },
      { periodo: 'jun-2026', var_pct: 36.2, causa: 'Euforia con los equipos para memoria de IA; máximo histórico de 438,50 USD el 30-jun [1].', veredicto: 'no cambia', condicion: null },
      { periodo: 'jul-2026', var_pct: -32.4, causa: 'Caída sectorial tras el informe de que Meta vendería capacidad de IA sobrante (2-jul, −10,2 % en un día) y toma de beneficios; los resultados del 29-jul batieron y no la frenaron [8].', veredicto: 'no cambia', condicion: null },
      { periodo: '21-sep a 21-oct-2026', var_pct: -16.1, causa: 'Dudas sobre el ritmo de la inversión en IA (14-sep) y toma de beneficios del sector tras el día del inversor de Applied (13-oct): Applied cae un 8,4 %, KLA un 8,6 % y Lam un 9,1 % del 14 al 21-oct [7, 9, 1]. Dos bancos recortan objetivo antes de los resultados (Evercore a 315 USD, B. Riley a 338) [2].', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-10-21', tipo: 'resultados', hecho: 'Resultados del 1T FY27 tras el cierre: ventas de 8.219 M USD (+54 % interanual) y BPA de 2,19 USD, por encima de la guía y del consenso (8.140 M y 2,18); guía del 2T de 8.600 M USD y 2,33 USD, en línea con el consenso (8.540 M y 2,32) y lejos de los más de 9.000 M que esperaba Morgan Stanley [14, 15, 11]. La acción cae un 4,5 % fuera de hora, a 249,00 USD (16:48 de Nueva York) [17].', veredicto: 'retrasa', condicion: 'Hasta el cierre del 22-oct-2026: el precio del informe (260,81 USD) es anterior a los resultados y la reacción fuera de hora pasa del 4 %; la señal se recalcula con ese cierre.' },
      { fecha: '2026-10-21', tipo: 'resultados', hecho: 'China sube al 35 % de las ventas del trimestre (26 % en el 4T FY26), justo cuando el Senado tramita restricciones a la exportación [14, 11].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-20', tipo: 'recomendación', hecho: 'Evercore ISI baja el objetivo de 355 a 315 USD y B. Riley de 390 a 338 (19-oct); Deutsche Bank lo sube de 320 a 375 (19-oct); Cantor reitera 500 USD (17-oct) y UBS 425 (13-oct). Todos mantienen comprar [2].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-23', tipo: 'demanda o regulador', hecho: 'Proyectos de ley bipartidistas de control de exportaciones de chips, retrasados en su llegada al pleno del Senado [11].', veredicto: 'no cambia', condicion: 'Sin fecha de votación; si se aprueban con más restricciones a China, revisar las ventas a China (35 % del 1T FY27)' },
      { fecha: '2026-08-27', tipo: 'directivos', hecho: 'Dividendo trimestral +26,9 % a 0,33 USD [11].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-05-30', tipo: 'recomendación', hecho: 'Morgan Stanley sube a sobreponderar (331 USD), Mizuho a 380 USD; Erste rebaja [13].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: null,
    veredicto: 'retrasa',
    condicion: 'Hasta el cierre del 22-oct-2026, primera sesión tras los resultados y la conferencia del 21-oct.',
    comentario: 'La acción ha caído un 40 % desde el máximo de junio y un 16 % en el último mes sin ningún hecho propio negativo: la causa es sectorial (ritmo de la inversión en IA, tipos del Tesoro a 10 años por encima del 5 %, toma de beneficios). Los resultados del 1T FY27 baten la guía y el consenso, pero la guía del 2T queda en línea con lo esperado y no con las cifras más optimistas, y la acción cae un 4,5 % fuera de hora [14, 15, 17]. El precio del informe es anterior a los resultados: el veredicto retrasa la señal hasta el cierre del 22-oct. No hay colocaciones, ampliaciones ni ofertas pendientes; la fecha de los resultados del 2T no está publicada (Lam suele presentar a finales de enero).',
  },
  confianza: 'Alta',
};

D.multiplos_historicos.comentario = 'Al cierre de junio de 2026 Lam cotizaba a 75 veces el beneficio del año que acababa. En la base adelantada (precio de cierre de junio ÷ BPA del ejercicio siguiente), la mediana de cinco años es de unas 22 veces y el mínimo de 12,8 (junio de 2022); al precio de hoy, 260,81 USD, cotiza a unas 27,5 veces el BPA de FY2027 del consenso (9,49 USD) [15]. Parte de la prima es estructural (más servicio y márgenes 6 puntos más altos que en 2022), pero el mercado sigue pagando un ciclo de IA largo, y el peso de China (35 % de las ventas) ha vuelto a subir [14].';

D.comparables.criterio = 'Fabricantes de equipos de semiconductores: Applied Materials y KLA (los otros dos grandes estadounidenses), ASM International (deposición) y tres proveedores de componentes y subsistemas (MKS, VAT, Inficon). KLA, con las cifras de Stock Analysis del 21-oct [16]; los demás, de la nota D del informe de VAT (6-oct-2026, MarketScreener y Stock Analysis) llevados al cierre del 21-oct con la variación de su precio y, la capitalización, con el tipo del BCE del 21-oct [3, 1, 6]. No incluimos Tokyo Electron porque sus cifras eran incoherentes entre fuentes, ni ASML porque la litografía tiene otro perfil de crecimiento y de márgenes.';
D.comparables.comentario = 'Todo el sector ha caído un 8-9 % desde el 14-oct: la mediana del PER de los próximos 12 meses del grupo baja de 28,3 a 27,8 veces. Lam cotiza a unas 27,5 veces el BPA de FY2027 del consenso [15], en la mediana, con más margen EBITDA y mucho más ROIC que la media; solo KLA (44,6 % de margen y 67 % de ROIC) se le acerca, y cotiza a 30 veces [16]. Los comparables dicen que Lam no está cara frente a sus rivales, no que el sector esté barato frente a su historia.';
D.comparables.confianza = 'Media';

D.fuentes = D.fuentes.map((f) => {
  if (f.id === 1) return { ...f, fecha: '2026-10-21', titulo: 'Yahoo Finance, históricos diarios e intradía (LRCX, SPY, SOXX y comparables) vía herramientas/bolsa.mjs y movimiento.mjs, cierre del 21-oct-2026' };
  if (f.id === 2) return { ...f, fecha: '2026-10-20', titulo: 'LRCX Stock Forecast: 35 analistas, precio objetivo, estimaciones FY2027 y últimas acciones de analistas (S&P Global)' };
  if (f.id === 5) return { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates, octubre de 2026: 10 años al 5,13 % el 21-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month=202610' };
  if (f.id === 6) return { ...f, fecha: '2026-10-21', titulo: 'Tipos de cambio de referencia del euro, 21-oct-2026 (USD 1,1234; CHF 0,9256)' };
  return f;
});
D.fuentes.push(
  { id: 14, titulo: 'Lam Research Corporation Reports Financial Results for the Quarter Ended September 27, 2026 (8-K, anexo 99.1)', editor: 'Lam Research (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/707549/000070754926000052/lrcx_exhibitx991xq1x2027.htm' },
  { id: 15, titulo: 'LRCX Analysis: Earnings Estimate, Revenue Estimate, EPS Trend y EPS Revisions (antes de los resultados del 1T FY27)', editor: 'Yahoo Finance (LSEG)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/LRCX/analysis/' },
  { id: 16, titulo: 'KLA Corporation (KLAC): Statistics y Forecast a 21-oct-2026 (cierre 163,43 USD)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://stockanalysis.com/stocks/klac/statistics/' },
  { id: 17, titulo: 'Lam Research (LRCX) Statistics: capitalización, posición corta (2,06 %) y precio fuera de hora del 21-oct-2026 (249,00 USD)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://stockanalysis.com/stocks/lrcx/statistics/' },
);

D.huecos = D.huecos.filter((h) => !['posicion_corta_pct', 'capitalizacion_publicada'].includes(h.campo));
D.huecos = D.huecos.map((h) => h.campo === 'EBITDA y tercer año del consenso'
  ? { ...h, campo: 'EBITDA y FY2029 del consenso', intentos: '1) MarketScreener: las URL de Lam devuelven otra empresa; 2) Stock Analysis: FY2028, FY2029 y EBITDA son de pago; 3) Yahoo Finance: solo ventas y BPA de FY2027 y FY2028' }
  : h);
D.huecos.push({ seccion: 'identificacion', campo: 'proximos_resultados', tipo: 'Complemento', intentos: '1) Comunicado del 1T FY27 en EDGAR: no da la fecha del 2T; 2) Stock Analysis: solo la fecha del 21-oct; 3) calendario de inversores de Lam: sin fecha publicada al cierre de la nota', decision: 'Omitido' });
D._estado = 'terminado';
writeFileSync(ruta, JSON.stringify(D, null, 2));
console.log('ok');
