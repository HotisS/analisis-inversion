// Actualiza notas/D.json (copia de la del 6-oct) con el 3T26 y el cierre del 20-oct-2026.
// node informes/intuitive-2026-10-21/notas/D_scripts/construir.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const N = 'informes/intuitive-2026-10-21/notas';
const D = JSON.parse(readFileSync(`${N}/D.json`, 'utf8'));
const B = JSON.parse(readFileSync(`${N}/bolsa.json`, 'utf8'));
const { filas } = JSON.parse(readFileSync(`${N}/D_scripts/comps_filas.json`, 'utf8'));

// ---------- Fuentes: actualizar fechas de las que se han vuelto a leer y añadir las nuevas ----------
const F = D.fuentes;
const fu = (id) => F.find((f) => f.id === id);
Object.assign(fu(1), { fecha: '2026-10-20', titulo: 'Históricos diarios de cotización de ISRG, SPY, IHI y de los diez comparables (cierre y cierre ajustado), hasta el 20-oct-2026' });
Object.assign(fu(5), { fecha: '2026-10-20' });
Object.assign(fu(6), { fecha: '2026-10-19' });
Object.assign(fu(8), { fecha: '2026-10-21' });
Object.assign(fu(9), { fecha: '2026-10-21' });
Object.assign(fu(11), { fecha: '2026-10-21' });
Object.assign(fu(17), { fecha: '2026-10-21' });
Object.assign(fu(20), { fecha: '2026-10-20', titulo: 'Daily Treasury Par Yield Curve Rates, octubre de 2026 (CSV)', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value_month=202610&page&_format=csv' });
const nuevas = [
  { id: 77, titulo: 'Intuitive Announces Third Quarter Earnings (nota de prensa, Exhibit 99.1 del 8-K del 20-oct-2026)', editor: 'Intuitive Surgical / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/Archives/edgar/data/1035267/000103526726000067/q326ex-991earningsrelease.htm' },
  { id: 78, titulo: 'ISRG: cotización cada 5 minutos con fuera de horas del 20-oct y preapertura del 21-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/ISRG/' },
  { id: 79, titulo: 'Intuitive Surgical, Inc.: noticias (titulares del 20-oct-2026: «Stock Plunges 7% After Company Narrows Growth Outlook», «Earnings Flash … vs. FactSet Est»)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/INTUITIVE-SURGICAL-INC-9740/news/' },
  { id: 80, titulo: 'Intuitive Surgical Stock Drops 6%: Why ISRG Hit A Fresh 52-Week Low Today', editor: 'TechStock² (ts2.tech)', tipo: 'Prensa', fecha: '2026-05-11', url: 'https://ts2.tech/en/intuitive-surgical-stock-drops-6-why-isrg-hit-a-fresh-52-week-low-today/' },
  { id: 81, titulo: 'Intuitive Surgical (NASDAQ:ISRG) slides 6%; HCA surgery slowdown sharpens Q2 valuation test', editor: 'TechStock² (ts2.tech)', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://ts2.tech/?p=21166870' },
];
for (const n of nuevas) if (!fu(n.id)) F.push(n);

// ---------- Identificación ----------
const I = D.identificacion;
Object.assign(I, {
  precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 348.7, capitalizacion_publicada: 154740,
  free_float_pct: 99.4, max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
  volumen_medio_diario: '≈ 976 M USD/día (2,55 M de acciones; 3 meses, 64 sesiones)', proximos_resultados: '2027-01-21',
});
I.extra = [
  'Precio: cierre oficial del 20-oct-2026, 438,00 USD, antes de los resultados del 3T26 publicados ese día tras el cierre [1, 5]. A las 08:08 UTC del 21-oct no había cierre del 21-oct. La reacción a los resultados se mide aparte (bolsa.contexto) y no cambia el precio del informe [78].',
  'Acciones diluidas (estimación propia, 348,7 M): 353,9 M emitidas y en circulación a 30-jun-2026 (balance del 10-Q del 2T26) [2] − 7,8 M recompradas en el 3T26 por 2.940 M USD [77] + 2,6 M de efecto dilutivo (diferencia entre las acciones medias diluidas, 351,6 M, y básicas, 349,0 M, del 3T26) [77]. No incluye las acciones emitidas a empleados en el trimestre (≈ 1 M por trimestre, sin dato), así que puede quedarse ≈ 0,3 % corta. La nota de prensa no da las acciones a 30-sep; el 10-Q del 3T26 (aún no presentado el 21-oct) lo dirá en la portada. Alternativa publicada: 351,6 M medias diluidas del 3T26 [77], que sobrestiman las acciones al final del trimestre porque la recompra se hizo a lo largo de él.',
  'Capitalización publicada: 154.740 M USD (Stock Analysis, 353,28 M acciones de la portada del 10-Q del 2T26 × 438,00) [5]; con las acciones estimadas tras la recompra serían ≈ 152.700 M (cálculo propio).',
  'Free float: Stock Analysis da float 351,21 M de 353,28 M (99,4 %), insiders 0,48 %, instituciones 88,56 % [5].',
  'Próximos resultados (4T26 y año 2026): sin fecha publicada el 21-oct; MarketScreener no muestra eventos futuros [11] y Stock Analysis no da fecha [5]. Se estima el 21-ene-2027 por el calendario habitual (4T25 el 22-ene-2026 [16]; 4T24 el 23-ene-2025 [8]): estimación, no fecha confirmada.',
  'Rango de 52 semanas: máximo intradía 603,88 USD el 7-ene-2026 y mínimo intradía 328,57 USD el 23-jul-2026 [1].',
  'Volumen medio de 3 meses: 2,55 M acciones/día, ≈ 976 M USD/día (64 sesiones) [1].',
  'Empleados: aproximadamente 17.021 a 31-dic-2025 [4]. Sector GICS Health Care / Health Care Equipment & Supplies [14].',
];

// ---------- Consenso ----------
const Cn = D.consenso;
Cn.estimaciones = [
  { periodo: '2026e', ingresos: 11755, ebitda: 5333, ebit: 4675, bpa: 9.41, dpa: 0, fuente: 'MarketScreener (S&P Global Market Intelligence), leído el 21-oct-2026 antes de que el consenso recoja el 3T26; 34 analistas; EBITDA y EBIT ajustados (sin remuneración en acciones); BPA en base GAAP [8]' },
  { periodo: '2027e', ingresos: 13254, ebitda: 5860, ebit: 5269, bpa: 10.76, dpa: 0, fuente: 'MarketScreener (S&P Global Market Intelligence), 21-oct-2026, sin recoger el 3T26; EBITDA y EBIT ajustados; BPA GAAP [8]' },
  { periodo: '2028e', ingresos: 14930, ebitda: 6589, ebit: 5979, bpa: 12.23, dpa: 0, fuente: 'MarketScreener (S&P Global Market Intelligence), 21-oct-2026, sin recoger el 3T26; EBITDA y EBIT ajustados; BPA GAAP [8]' },
];
Cn.recomendaciones = { n_analistas: 34, comprar: 26, mantener: 7, vender: 1, po_medio: 478.53, po_min: 324, po_max: 685 };
Cn.guidance = 'Guía 2026 del 20-oct-2026 (3T26): crecimiento mundial de procedimientos da Vinci de ≈ 14 %-15 %, «closer to the midpoint», que estrecha la horquilla de 13,5 %-15,5 % de abril y julio sin mover el punto medio; margen bruto no GAAP del 68,7 %-69,3 % de las ventas (antes 68,0 %-69,0 %), con un impacto de aranceles del 0,9 % de las ventas sin contar las devoluciones; crecimiento del gasto operativo no GAAP del 11 %-13 %, sin cambios [77, 3]. La empresa no da guía de ingresos ni de tipo impositivo ni concilia la guía no GAAP con GAAP [77]. En el 3T26: ingresos de 3.049 M (+22 %), procedimientos da Vinci +14 % e Ion +31 %, 546 sistemas colocados (315 da Vinci 5) y un cargo de 450 M antes de impuestos por el acuerdo en la demanda colectiva antimonopolio [77].';
Cn.revisiones = 'El consenso del 21-oct todavía no recoge el 3T26: MarketScreener ya carga los ingresos reales del trimestre (3.049 M) pero mantiene los anuales de antes (11.755 M en 2026e) [8]. Antes de los resultados, el BPA GAAP 2026e había subido de 8,16 USD (6-oct-2025) y 9,05 (6-jul-2026) a 9,41 hoy: +4,0 % en algo más de 3 meses y +15,3 % en 12 meses; 2027e de 9,79 y 10,32 a 10,76 (+4,3 % y +9,9 %); 2028e de 10,79 y 11,95 a 12,23 (+2,3 % y +13,3 %) [10, 8]. El EBIT ajustado 2026e pasó de 4.021 M y 4.519 M a 4.675 M (+3,5 % y +16,3 %) [10, 8]. Con el 3T26, el BPA GAAP 2026e bajará ≈ 0,99 USD por el acuerdo antimonopolio (no recurrente) y el ajustado subirá: el trimestre batió en ingresos (3,05 mil M frente a 2,91 de FactSet) y BPA no GAAP (3,00 frente a 2,65) [77, 79].';
Cn.base_ebitda = 'ajustado';
Cn.ajuste_ebitda_pct_ventas = 7.5;
Cn.confianza = 'Media';
Cn.extra = {
  guidance_hechos: [
    'Guía 2026 del 20-oct-2026: procedimientos da Vinci +14 %-15 % («closer to the midpoint»); margen bruto no GAAP 68,7 %-69,3 % con aranceles del 0,9 % de las ventas (sin las devoluciones reconocidas); opex no GAAP +11 %-13 % [77].',
    'Evolución: 22-ene-2026 procedimientos +13 %-15 %, margen 67 %-68 %, opex +11 %-15 % [16]; 21-abr-2026 +13,5 %-15,5 %, 67,5 %-68,5 %, +11 %-14 % [15]; 16-jul-2026 +13,5 %-15,5 %, 68,0 %-69,0 %, +11 %-13 % [3]; 20-oct-2026 +14 %-15 %, 68,7 %-69,3 %, +11 %-13 % [77].',
    'Recompras: 7,8 M de acciones por 2.940 M USD en el 3T26 (≈ 377 USD por acción, cálculo propio) [77]; caja e inversiones bajan 1.830 M en el trimestre, hasta 6.800 M [77].',
    'Acuerdo antimonopolio («In re: da Vinci Surgical Robot Antitrust Litigation»): pago único de 450 M USD y medidas acordadas, sin admitir responsabilidad; cargo de 450 M en gastos generales del 3T26 (347 M netos de impuestos, 0,99 USD por acción); pendiente de aprobación preliminar y final del tribunal [77].',
    'Aranceles: beneficio de 22 M netos (0,06 USD por acción) por devoluciones de aranceles IEEPA de periodos anteriores en el 3T26 [77].',
  ],
  base_ebitda_hechos: D.consenso.extra.base_ebitda_hechos,
  contraste_hechos: [
    'Stock Analysis (S&P Global, actualizado el 19-oct-2026, antes de los resultados): ingresos 2026e 11,76 mil M (+16,8 %) y 2027e 13,26 mil M (+12,8 %); BPA no GAAP 2026e 10,80 USD (+20,95 %) y 2027e 12,11 USD (+12,1 %); 2028e solo de pago [6]. Coincide con MarketScreener en ingresos porque ambos usan S&P Global [6, 8].',
    'Recomendaciones (S&P Global, oct-2026): 18 compra fuerte, 8 compra, 7 mantener, 0 venta, 1 venta fuerte; total 34. Jul-2026: 16/7/9/0/1 (33); may-2026: 16/6/9/1/1 (33) [6]. MarketScreener: consenso «Buy», 34 analistas [9].',
    'Precio objetivo (S&P Global, 21-oct, antes de las revisiones tras el 3T26): medio 478,53 USD, mediana 484, mínimo 324, máximo 685; +9,25 % sobre el cierre de 438,00 [9, 6]. El 6-oct era 477,21: estable [9].',
    'Contraste independiente (API de Nasdaq.com, Zacks, 21-oct): precio objetivo medio 489,33 USD, mínimo 391 y máximo 685; 14 compra, 2 mantener, 0 venta [17].',
    'Cambios de precio objetivo en octubre, antes del 3T26: Evercore 375→400 (en línea, 5-oct), Leerink 454→473 (comprar, 9/12-oct), BTIG 469→454 (comprar, 12-oct), UBS 500 (comprar, 13-oct), Mizuho 400→415 (neutral, 13-oct), Baird 500→513 (15-oct), TD Cowen 485 (comprar, 19-oct) [9, 6]. A las 08:00 UTC del 21-oct no se había publicado ningún cambio posterior a los resultados [9, 79].',
  ],
  revisiones_hechos: [
    'BPA GAAP de MarketScreener: 2026e 9,41 USD el 21-oct frente a 9,23 el 6-oct, 9,05 el 6-jul-2026 y 8,16 el 6-oct-2025; 2027e 10,76 frente a 10,66, 10,32 y 9,79; 2028e 12,23 frente a 12,23, 11,95 y 10,79 [8, 10]. Los valores de julio y de 2025 son la lectura de los gráficos SVG del 5-oct (±0,1 %) [10]; la página de revisiones pide hoy registro y no se pudo volver a leer.',
    'Ventas 2026e: 11.217 M (oct-2025), 11.713 M (jul-2026), 11.755 M (21-oct) [10, 8]. EBIT ajustado 2026e: 4.021 M, 4.519 M, 4.675 M [10, 8].',
    'El 3T26 real ya está cargado en la tabla trimestral de MarketScreener (ventas 3.049 M, EBIT ajustado 1.270 M = resultado operativo no GAAP de 1.269,7 M) [8, 77], pero los anuales no se han revisado todavía.',
    'Efecto esperado del 3T26 en el consenso (estimación propia): el BPA GAAP 2026e debería bajar por el cargo de 0,99 USD por acción del acuerdo antimonopolio [77]; el BPA no GAAP, subir por el trimestre (3,00 USD frente a 2,65 esperado por FactSet) [79] y por la recompra de 7,8 M de acciones [77].',
  ],
  otros: [
    'Resultado del 3T26 frente al consenso: ingresos 3,05 mil M frente a 2,91 mil M (FactSet) y BPA no GAAP 3,00 USD frente a 2,65 [79, 77]; BPA GAAP 1,49 USD (1,95 en el 3T25) por el cargo antimonopolio [77].',
    'Datos para valoracion.objetivo_12m.consenso: BPA GAAP 2026e 9,41 y 2027e 10,76 USD (MarketScreener, sin recoger el 3T26) [8]; BPA no GAAP 2026e 10,80 y 2027e 12,11 (Stock Analysis, 19-oct) [6]; objetivo medio 478,53, mínimo 324, máximo 685, 34 analistas, tendencia de 3 meses estable (477,21 el 6-oct; tras los recortes de julio) [9, 6].',
    'Rareza que sigue: el EBITDA 2027e de MarketScreener crece un 9,9 % y el EBIT un 12,7 %, lo que implica amortizaciones que bajan de 658 a 591 M; probablemente menos analistas aportan EBITDA que EBIT [8].',
  ],
};

// ---------- Bolsa ----------
const Bo = D.bolsa;
Object.assign(Bo, {
  tipo_rentabilidad: B.bolsa.tipo_rentabilidad, rentabilidades: B.bolsa.rentabilidades, anual: B.bolsa.anual, beta: B.bolsa.beta,
  volatilidad_pct: B.bolsa.volatilidad_pct, max_drawdown_pct: B.bolsa.max_drawdown_pct, posicion_corta_pct: 2.11,
});
Bo.comentario = 'Intuitive pierde un 22,7 % en el año frente al +13,7 % del S&P 500 y el −12,3 % de los fabricantes de dispositivos (IHI) [1]: el castigo es sectorial y propio. La acción marcó su máximo de 603,88 USD el 7-ene-2026 y cayó a 328,57 el 23-jul tras dos golpes: el 14-jul (−6,8 %) por la caída de las cirugías de HCA y recortes de objetivo [81] y el 17-jul (−14,1 %) por una guía de procedimientos que no mejoró pese a batir en cifras [18]. Desde el mínimo ha recuperado un 31,9 % hasta el cierre del 20-oct, en un sector que también rebota (IHI +6,6 % del 6 al 20-oct) [1]. Los resultados del 3T26 batieron en ingresos y BPA no GAAP, pero la acción cedía un 7 % fuera de horas al estrechar la guía de procedimientos [78, 79]. Beta de 5 años 1,46 y volatilidad del 34,6 % [1].';
Bo.contexto = {
  movimiento: { fecha: '2026-10-20', var_1m_pct: 9.1, var_3m_pct: 28.6, var_6m_pct: -2.9, var_12m_pct: -1.8, dist_max_52s_pct: -26.1, dist_min_52s_pct: 31.9, dist_max_historico_pct: -26.1, tendencia: 'bajista', volatilidad_60d_pct: 31.0, avisos: [] },
  movimientos_fuertes: [
    { periodo: 'oct-2025 (22-oct)', var_pct: 13.9, causa: 'Resultados del 3T25 mejores de lo esperado y subida de la guía de procedimientos: de 462,74 a 527,03 USD en un día [1].', veredicto: 'no cambia', condicion: null },
    { periodo: 'may-2026 (11-may)', var_pct: -6.7, causa: 'Mínimo de 52 semanas tras el 1T26: dudas sobre la valoración, riesgo de más aranceles, retirada de clase I (la más grave) de unos cartuchos de grapadora SureForm y competencia de los robots de Medtronic y J&J [80].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-2026 (14-jul)', var_pct: -6.8, causa: 'HCA publicó caídas de cirugías hospitalarias (−2,3 %) y ambulatorias (−3,4 %) y varias casas recortaron el objetivo (Baird 610→525; TD Cowen citó competencia, instrumentos reprocesados y valoración); Stryker y Medtronic cayeron un 6,3 % y un 4,9 % [81].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-2026 (17-jul; mayor caída de un mes, −17,6 % hasta el 23-jul)', var_pct: -14.1, causa: 'Resultados del 2T26 por encima de lo esperado (BPA no GAAP 2,80 frente a 2,51) pero guía de procedimientos de 13,5 %-15,5 % sin cambios, por debajo de lo que esperaba el mercado, con el crecimiento en EE. UU. frenado por cambios de cobertura sanitaria [18, 3]; de 402,33 a 345,42 USD [1].', veredicto: 'no cambia', condicion: null },
    { periodo: 'ago-2026 (20-ago)', var_pct: -5.8, causa: 'De 397,72 a 374,48 USD con el doble de volumen habitual [1]; no se encontró la causa en la prensa ni en EDGAR (sin 8-K ese día) tras tres búsquedas.', veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-oct-2026 (mayor subida de un mes, +18,4 % hasta el 7-oct)', var_pct: 18.4, causa: 'Rebote desde el mínimo de julio con subidas de recomendación (UBS a comprar con objetivo 500 el 28-jul; Oppenheimer a outperform con 500 el 12-ago) y objetivos al alza en octubre (Evercore, Leerink, Mizuho, Baird) [9, 6]; el sector también sube (IHI) [1].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-20', tipo: 'resultados', hecho: 'Resultados del 3T26 tras el cierre: ingresos 3.049 M (+22 %), BPA no GAAP 3,00 USD (2,65 esperado) y GAAP 1,49; procedimientos da Vinci +14 %; guía de procedimientos estrechada a 14 %-15 % (antes 13,5 %-15,5 %) y margen bruto subido a 68,7 %-69,3 % [77, 79]. Reacción: 407,55 USD al final de la sesión fuera de horas del 20-oct (−7,0 % sobre 438,00), con un mínimo de 382,91 (−12,6 %) a los cinco minutos, y 405,58 en la preapertura del 21-oct a las 04:08 EDT (−7,4 %) [78]. La prensa lo atribuye a la guía de crecimiento estrechada [79]. No cambia el precio del informe; la decisión se mide con el precio del momento.', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-20', tipo: 'demanda o regulador', hecho: 'Acuerdo en la demanda colectiva antimonopolio: pago único de 450 M USD (0,3 % de la capitalización) y medidas acordadas, sin admitir responsabilidad; pendiente de aprobación del tribunal [77].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-19', tipo: 'recomendación', hecho: 'Octubre, antes del 3T26: TD Cowen mantiene comprar (485), UBS comprar (500), Mizuho neutral 400→415, BTIG 469→454, Leerink 454→473, Baird 500→513, Evercore 375→400 [6, 9].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-30', tipo: 'directivos', hecho: 'Recompra de 7,8 M de acciones por 2.940 M USD en el 3T26, la mayor de los últimos trimestres (0,38 mil M en el 2T26) [77, 3]. Las ventas de directivos (Form 4 del 13-oct, 16-sep y anteriores) las analiza la sección de gobierno.', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-30', tipo: 'recomendación', hecho: 'Tras el 2T26: HSBC baja a mantener (391), Deutsche Bank recorta a 324 (vender), JPMorgan 550→450, Wells Fargo 654→487, Bernstein 750→685, Piper Sandler 580→470; UBS sube a comprar (500, 28-jul) y Oppenheimer a outperform (500, 12-ago) [9].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-05-05', tipo: 'demanda o regulador', hecho: 'La FDA clasifica como de clase I (la más grave) la retirada de unos cartuchos de grapadora SureForm de 8 mm, ligada a cuatro lesiones graves y una muerte; seguía abierta en mayo [80].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2027-01-21',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción sube un 9,1 % en un mes y un 28,6 % en tres meses, pero sigue un 26,1 % bajo el máximo de 52 semanas y justo bajo la media de 200 sesiones (−0,1 %: tendencia bajista por poco) [1]. Las caídas fuertes del año tienen causa conocida (guía de procedimientos, cirugías en EE. UU., retirada de producto), salvo la del 20-ago. Los resultados del 3T26 ya están publicados: la reacción (−7 % fuera de horas y en preapertura) [78] se mide con el precio del momento y no retrasa la decisión. No hay hecho externo pendiente que pueda mover el precio más de un 5 %: el acuerdo antimonopolio es el 0,3 % de la capitalización y los próximos resultados llegan hacia el 21-ene-2027 (fecha estimada). Veredicto: no cambia.',
};
Bo.confianza = 'Alta';
Bo.extra = [
  'Índice de referencia SPY y sectorial IHI, ambos con dividendos reinvertidos: rentabilidades totales [1]. La acción no paga dividendo [5].',
  'Rentabilidad total a 20-oct-2026: en el año −22,7 % (SPY +13,7 %, IHI −12,3 %); 1 año −5,3 % (SPY +15,8 %, IHI −9,9 %); 3 años +18,0 % anual (SPY +23,7 %, IHI +6,1 %); 5 años +5,2 % anual (SPY +12,6 %, IHI −3,0 %); 10 años +19,2 % anual (SPY +15,5 %, IHI +9,1 %) [1]. El −1,8 % a 12 meses de movimiento.mjs y el −5,3 % de «1 año» difieren por la fecha de partida (cierre del 20-oct-2025 frente a ventana de 252 sesiones).',
  'Betas frente a SPY: mensual 5 años 1,46; semanal 5 años 1,34; semanal 2 años 1,19; ajustadas 1,31 (mensual) y 1,23 (semanal) [1]. Volatilidad diaria anualizada de 1 año 34,6 %; de 60 sesiones 31 % [1]. Caída máxima en 5 años −49,9 % (8-nov-2021 a 14-oct-2022) [1].',
  'Mayores caídas diarias de 12 meses: −14,1 % (17-jul-2026), −6,8 % (14-jul), −6,7 % (11-may), −5,8 % (20-ago), −4,5 % (8-sep) [1].',
  'Posición corta: 7,41 M de acciones, 2,11 % del flotante y 3,1 días de cobertura (Stock Analysis, último dato quincenal de FINRA publicado a 20-oct) [5]; 8,12 M (2,31 %) a 15-sep-2026 [19].',
  'Reacción a los resultados (Yahoo, cada 5 minutos): 439,00 al cierre del 20-oct; 382,91 a las 16:05 EDT; 396-409 entre las 16:40 y las 17:00; 407,55 a las 19:55 EDT (fin de la sesión fuera de horas); 404,00-405,63 en la preapertura del 21-oct (04:00-04:08 EDT) [78]. Volumen fuera de horas no disponible en la serie.',
];

// ---------- Múltiplos históricos: mismos cierres ----------
const MH = D.multiplos_historicos;
MH.serie = B.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false }));

// ---------- Comparables al 20-oct ----------
const Co = D.comparables;
Co.empresas = filas;
Co.extra.metodo = [
  'Comparables del 6-oct-2026 llevados al cierre del 20-oct-2026 (cálculo propio): capitalización = la del 6-oct × variación del precio de Yahoo del 6 al 20-oct; valor empresa = el del 6-oct + el cambio de capitalización (deuda y caja sin cambios); EBITDA de 12 meses (MarketScreener) y BPA no GAAP (S&P Global en Stock Analysis) los mismos del 6-oct; próximos 12 meses con el peso del ejercicio en curso al 20-oct (2,37 meses: 0,198 para los que cierran en diciembre; 0,528 para Medtronic, abril; 0,694 para ResMed, junio) [1, ver cada fila].',
  'Variación de precio del 6 al 20-oct: Stryker +9,4 %, Boston Scientific +8,0 %, Medtronic +8,7 %, Abbott +4,4 %, Edwards +2,1 %, Dexcom +2,8 %, Insulet +5,9 %, IDEXX +8,2 %, ResMed +11,2 %, Zimmer +7,0 %; Intuitive +8,2 % [1]. El sector sube con fuerza en dos semanas.',
  'Abbott publicó su 3T26 a mediados de octubre: sus cifras de 12 meses y su consenso no se han vuelto a leer (dos semanas, sin cambio de perímetro conocido). Los demás comparables publican a finales de octubre o principios de noviembre.',
  'Mismas definiciones que el 6-oct: EBITDA con la remuneración en acciones como gasto (a Dexcom e Insulet se les resta); PER con BPA no GAAP; crecimiento = ventas de los próximos 12 meses / últimos 12 meses − 1; margen EBITDA del último ejercicio cerrado; ROIC de Stock Analysis; rentabilidad por FCF = la del 6-oct × precio del 6-oct / precio del 20-oct.',
  'Medianas al 20-oct (cálculo propio): EV/EBITDA de 12 meses 16,2x, de los próximos 12 meses 14,6x, PER de los próximos 12 meses 18,9x, EV/ventas 4,7x.',
];
Co.extra.datos_por_empresa = Co.extra.datos_por_empresa.map((s) => s.replace(/al cierre del 6-oct-2026/, 'al cierre del 6-oct-2026 (llevados al 20-oct con la variación de precio)'));

// ---------- DCF: datos de mercado del WACC ----------
Object.assign(D.dcf.wacc, { tasa_libre_pct: 5.12, beta: 1.46, prima_mercado_pct: 4.2 });
D.dcf.extra = D.dcf.extra.map((s) => (s.startsWith('Tasa libre') ? 'Tasa libre: bono del Tesoro de EE. UU. a 10 años, 5,12 % el 20-oct-2026 (curva de rendimientos par del Tesoro, CSV de octubre, fila «10/20/2026», columna «10 Yr»: 5.12) [20]. Días anteriores: 5,15 % (19-oct), 5,09 % (16-oct), 5,10 % (15-oct), 5,19 % (14-oct); 5,27 % el 6-oct [20].' : s));
D.dcf.extra = D.dcf.extra.map((s) => (s.startsWith('Beta de la acción') ? 'Beta de la acción: 1,46 (5 años, mensual, frente a SPY; bolsa.mjs al 20-oct, 60 meses); semanal 2 años 1,19; ajustada mensual 1,31 [1]; Stock Analysis 1,46 [5].' : s));

// ---------- Valoración: puente al 30-sep-2026 ----------
const V = D.valoracion;
V.puente = { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 170.9, caja: 6800.4, minoritarios: 130.9, pensiones: 0, asociadas: 0, otros_ajustes: 347 };
V.referencia_mercado = { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, Implied ERP on October 1, 2026 (T12m with adjusted payout) [21]' };
V.extra = [
  'Deuda financiera: ninguna. El balance resumido del 30-sep-2026 solo tiene «accounts payable and other liabilities» (2.561,9 M) e ingresos diferidos (669,4 M); pasivo total 3.231,3 M [77]. Sin préstamos ni bonos en el 10-Q del 2T26 [2].',
  'Caja e inversiones a 30-sep-2026: 6.800,4 M (efectivo, equivalentes e inversiones a corto y largo, en una sola línea del balance resumido), −1.830 M en el trimestre por la recompra de 2.940 M y la inversión en inmovilizado [77]. El reparto entre corto y largo plazo saldrá en el 10-Q del 3T26.',
  'Otros ajustes: 347 M = acuerdo de la demanda antimonopolio, pago único de 450 M USD pendiente de aprobación judicial, reconocido como gasto en el 3T26 y todavía no pagado a 30-sep (la nota dice que se pagará; el pasivo sube de 1.918,9 M a 2.561,9 M en el año) [77]. Se resta neto de impuestos (347 M según la empresa) con el mismo criterio que las pensiones; bruto serían 450 M (0,3 USD por acción de diferencia).',
  'Arrendamientos: 170,9 M de pasivos por arrendamiento operativo a 31-dic-2025 (último dato publicado) [4]. En US GAAP su gasto ya está en el EBITDA: decide el analista principal si los quita (efecto 0,5 USD por acción).',
  'Minoritarios: 130,9 M estimados = 129,3 M a valor contable a 30-jun-2026 (sociedad conjunta con Fosun) [2] + 1,6 M de resultado atribuido en el 3T26 [77]; sin dividendos ni diferencias de cambio (el balance resumido no los desglosa; el 10-Q del 3T26 dará la cifra). Valor contable.',
  'Asociadas: ninguna por el método de la participación [2]. Pensiones: ninguna relevante [4].',
  'Acciones y caja del mismo momento: las acciones estimadas (348,7 M) ya restan las 7,8 M recompradas en el 3T26, pagadas con la caja que falta en el puente [77]. Recompras de octubre: sin dato.',
  'Valor empresa con el puente (cálculo propio): 348,7 × 438,00 = 152.731 M + 170,9 + 130,9 + 347 − 6.800,4 ≈ 146.580 M. Stock Analysis da 147.940 M con 353,28 M acciones [5].',
  'Tasa libre 5,12 % (Tesoro, 20-oct-2026) [20] y prima implícita de Damodaran de octubre de 2026 4,20 % [21]: van en dcf.wacc y en referencia_mercado.',
];

// ---------- Huecos ----------
D.huecos = D.huecos.filter((h) => !(h.seccion === 'identificacion' && /fecha de resultados/.test(h.campo)));
D.huecos.push(
  { seccion: 'identificacion', campo: 'proximos_resultados (4T26)', tipo: 'Complemento', intentos: '1) MarketScreener, calendario: «No events available»; 2) Stock Analysis, estadísticas: sin fecha siguiente; 3) calendario histórico de la empresa (22-ene-2026, 23-ene-2025)', decision: 'Calculado y marcado como estimación (21-ene-2027)' },
  { seccion: 'identificacion', campo: 'acciones a 30-sep-2026', tipo: 'Núcleo', intentos: '1) Nota de prensa del 3T26: no da acciones al cierre; 2) EDGAR: el 10-Q del 3T26 no está presentado el 21-oct; 3) cálculo: 353,9 M a 30-jun − 7,8 M recompradas + 2,6 M de dilución', decision: 'Calculado y marcado como estimación (348,7 M)' },
  { seccion: 'bolsa', campo: 'causa de la caída del 20-ago-2026 (−5,8 %)', tipo: 'Complemento', intentos: '1) EDGAR: sin 8-K ese día; 2) búsqueda web por fecha: sin noticia; 3) búsqueda con competencia, retiradas y recomendaciones: sin noticia; artículo de Nasdaq.com con error 503', decision: 'Omitido (se deja el movimiento sin causa)' },
  { seccion: 'valoracion', campo: 'puente.minoritarios a 30-sep-2026', tipo: 'Complemento', intentos: '1) Nota de prensa del 3T26: balance resumido sin minoritarios; 2) 10-Q del 3T26: no presentado; 3) 30-jun + resultado atribuido del 3T26', decision: 'Calculado y marcado como estimación (130,9 M)' },
);
D._estado = 'terminado';
const { _estado, ...resto } = D;
writeFileSync(`${N}/D.json`, JSON.stringify({ _estado, ...resto }, null, 1));
console.log('ok', F.length, 'fuentes');
