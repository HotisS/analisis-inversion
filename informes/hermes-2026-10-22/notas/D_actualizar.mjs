// D: pone al día D.json (copia del 11-oct) con los ingresos del 3T26 y el cierre del 21-oct-2026.
import { readFileSync, writeFileSync } from 'node:fs';
const ruta = new URL('./D.json', import.meta.url);
const d = JSON.parse(readFileSync(ruta, 'utf8'));
const bt = JSON.parse(readFileSync(new URL('./D_bolsa_total.json', import.meta.url), 'utf8'));
const comp = JSON.parse(readFileSync(new URL('./D_comp.json', import.meta.url), 'utf8')).map(({ _ev_ebit_ntm, ...e }) => e);

// ---------- identificacion ----------
Object.assign(d.identificacion, {
  precio: 1356.5,
  fecha_precio: '2026-10-21',
  acciones: 104.95,
  capitalizacion_publicada: null,
  max_52s: 2300,
  min_52s: 1255,
  volumen_medio_diario: '≈ 156 M EUR/día (105.925 acciones, 3 meses)',
  proximos_resultados: '2027-02-12',
  extra: [
    'Precio: cierre de Euronext París del miércoles 21-oct-2026, 1.356,50 EUR (máximo 1.360, mínimo 1.331, 82.897 acciones) [30]; es el último cierre anterior a los ingresos del 3T26, publicados el 22-oct a las 08:00, antes de la apertura [28]. Yahoo aún no tenía ese cierre (su serie llega al 20-oct, 1.339 EUR) [1]; MarketScreener da el mismo último cierre, 1.356,50 EUR [3].',
    'Acciones: 105.569.412 emitidas; autocartera 833.864 a 30-sep-2026 (derechos de voto teóricos 179.399.516 menos ejercitables 178.565.652) = 104,74 M en circulación (827.874 a 31-ago [7]); más 0,21 M de efecto dilutivo de los planes de acciones gratuitas (media diluida 105,003 M frente a 104,793 M básica en el 1S26) = 104,95 M diluidas [29, 8]. En los nueve meses Hermès recompró 94.846 acciones por 160 M EUR, sin contar el contrato de liquidez [28].',
    'Máximo de 52 semanas 2.300 EUR (intradía) el 15-ene-2026; mínimo 1.255 EUR (intradía) el 7-oct-2026 [1, 30]. El 22-oct, con los ingresos, cotizó por debajo de ese mínimo (1.246 EUR a las 9:25 de París) [3, 31].',
  ],
});

// ---------- consenso ----------
d.consenso.guidance = 'Hermès sigue sin dar cifras. El 22-oct-2026, con los ingresos de los nueve meses, repitió que a medio plazo «confirma un objetivo ambicioso de crecimiento de las ventas a tipos constantes», «pese a las incertidumbres económicas, geopolíticas y monetarias», la misma frase de julio, abril y febrero [28, 9]. El tono cambió: el título del comunicado habla de un crecimiento «robusto en un contexto macroeconómico difícil» [28]. La capacidad sigue fijada: un vigésimo quinto taller de marroquinería abrió en abril en Loupes, y hay tres más previstos en 2027 (Charleville-Mézières), 2028 (Colombelles) y 2030 (Les Andelys) [28]. Según la prensa, el director financiero dijo que el volumen de producción crecerá en torno a un 6 % al año en los próximos años [32]. Sobre márgenes no hay guía; el último dato es el 41,0 % del 1S26 [9].';
d.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 16681, ebitda: 7538, ebit: 6680, bpa: 43.73, dpa: 19.53, fuente: 'MarketScreener, 23 analistas, leído el 22-oct-2026 a primera hora (aún sin revisar por los ingresos del 3T) [2]' },
  { periodo: '2027e', ingresos: 17932, ebitda: 8079, ebit: 7170, bpa: 47.96, dpa: 20.75, fuente: 'MarketScreener, 23 analistas, leído el 22-oct-2026 a primera hora (aún sin revisar por los ingresos del 3T) [2]' },
  { periodo: '2028e', ingresos: 19246, ebitda: 8699, ebit: 7717, bpa: 52.48, dpa: 22.61, fuente: 'MarketScreener, 23 analistas, leído el 22-oct-2026 a primera hora (aún sin revisar por los ingresos del 3T) [2]' },
];
d.consenso.recomendaciones = { n_analistas: 23, comprar: 10, mantener: 11, vender: 2, po_medio: 1625.35, po_min: 1168, po_max: 1920 };
d.consenso.revisiones = 'Las estimaciones bajan desde el verano y aún no recogen el 3T26. Entre el 9 y el 22-oct, antes de los ingresos, MarketScreener recortó el BPA de 2026e de 43,86 a 43,73 EUR (−0,3 %) y el de 2027e de 48,37 a 47,96 EUR (−0,8 %); el objetivo medio bajó de 1.657,61 a 1.625,35 EUR y el máximo de 2.075 a 1.920 EUR [2, 3]. Detrás: HSBC rebajó a Mantener en junio (objetivo de 2.100 a 1.870 EUR), Bernstein recortó en septiembre por una demanda china «más moderada», Citi, HSBC y RBC bajaron objetivos, y UBS empezó con Vender (1.168 EUR) el 5-oct; en sentido contrario, AlphaValue subió a Comprar (9-oct) y Berenberg y Bernstein reiteraron Comprar (15 y 19-oct) [3, 10, 34]. El 3T26 creció un 4,3 % a tipo constante frente al 5,2 % esperado [28, 32]: el 2026e de 16.681 M exige un 4T de 4.421 M, un 8,2 % más que el del 4T25 a tipo corriente, cuando el 3T creció un 5,5 %. Cabe esperar recortes. Las cifras de 3 y 12 meses no se publican gratis.';
d.consenso.extra = [
  'El EBITDA de MarketScreener suma los deterioros: 7.495 M en 2025 frente a 7.368 M de resultado operativo más amortizaciones (diferencia 127 M = deterioros de la nota 5.3, 0,8 % de las ventas) [2, 9].',
  'Stock Analysis (S&P Global, 15-oct-2026): 23 analistas, 8 compra fuerte, 2 compra, 11 mantener, 0 venta y 2 venta fuerte; objetivo medio 1.639 EUR (1.168-2.000); ventas 2026e 16.700 M y BPA 2026e 44,10 EUR (22 analistas) [4]. El reparto 10/11/2 es el de esta fuente: MarketScreener da solo la recomendación media («Outperform»), sin desglose [3].',
  '3T26 frente al consenso, según la prensa: ventas de 4.096 M frente a ≈ 4.120 M esperados; crecimiento a tipo constante del 4,3 % frente al 5,2 % (Visible Alpha). Es el trimestre más flojo desde 2020 (5,6 % en el 1T26 y 6,7 % en el 2T26) [28, 32]. Asia sin Japón quedó plana (0,0 %) frente al +2,2 % y +2,5 % del 1T y del 2T; marroquinería +10,8 %; confección y accesorios −2,0 % [28, 32].',
  '1S26 frente al consenso (según la prensa): resultado operativo 3.350 M frente a 3.290 M esperados, margen 41,0 % frente a 40,6 %, ventas en línea; BPA diluido 21,32 EUR frente a 21,56 EUR [11].',
];
d.consenso.confianza = 'Media';

// ---------- bolsa ----------
const b = bt.bolsa;
d.bolsa.tipo_rentabilidad = 'total (con dividendos)';
d.bolsa.rentabilidades = b.rentabilidades;
d.bolsa.anual = b.anual;
d.bolsa.beta = b.beta;
d.bolsa.volatilidad_pct = b.volatilidad_pct;
d.bolsa.max_drawdown_pct = b.max_drawdown_pct;
d.bolsa.posicion_corta_pct = null;
d.bolsa.comentario = 'Hermès pierde un 36,3 % en 2026 con dividendos (hasta el 20-oct), frente al −1,3 % del CAC 40 y el −7,6 % del ETF de lujo mundial: la peor caída de su historia (−54,6 % desde el máximo del 14-feb-2025) [1]. Las caídas llegan con sus publicaciones y con notas de analistas: −8,2 % con las ventas del 1T26 (15-abr), −5,9 % el 22-jun por una nota de Kepler Cheuvreux que anticipaba un margen 100 puntos básicos menor, −11,0 % con el 1S26 (29-jul) y −15 % en septiembre entre recortes de objetivo y la entrada de UBS en Vender [1, 10, 33]. La caída es de múltiplo, no de beneficio: el BPA de los últimos doce meses es casi el de 2024 [2, 9]. El 22-oct los ingresos del 3T, por debajo de lo esperado, la llevaban a nuevos mínimos de 52 semanas [3, 28, 31]. Beta mensual a 5 años de 1,43 frente al CAC 40 [1]. Sin posición corta neta publicada por la AMF (no comprobado; ver huecos).';
d.bolsa.contexto = {
  movimiento: {
    fecha: '2026-10-21', var_1m_pct: 0.9, var_3m_pct: -19.2, var_6m_pct: -17.6, var_12m_pct: -39.7,
    dist_max_52s_pct: -41.0, dist_min_52s_pct: 8.1, dist_max_historico_pct: -52.2, tendencia: 'bajista', volatilidad_60d_pct: 26.9,
    avisos: ['P5 Un 19 % por debajo de la media de 200 sesiones (1.683 EUR; la de 50 sesiones, 1.417 EUR): tendencia bajista'],
  },
  movimientos_fuertes: [
    { periodo: '2026-06-22', var_pct: -5.9, causa: 'Nota de Kepler Cheuvreux que anticipaba una caída de 100 puntos básicos del margen operativo del 1S26 por menor absorción de costes fijos y divisas; arrastró a todo el lujo europeo (LVMH −3 %) [33]. Al día siguiente HSBC rebajó a Mantener (objetivo de 2.100 a 1.870 EUR) [34]. El margen del 1S26 quedó en el 41,0 %, 0,4 puntos menos [9].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-07-29', var_pct: -11.0, causa: 'Resultados del 1S26: ventas +6,1 % a tipo constante con Asia sin Japón +2,5 % en el 2T frente al +4 % esperado, BPA algo inferior al consenso y comentarios del director financiero sobre subidas de precio menores en 2027 [9, 11].', veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-2026 (2-sep a 1-oct)', var_pct: -15.0, causa: 'Recortes de objetivo de Bernstein (21-sep, demanda china «más moderada»), RBC (22-sep), Citi y HSBC (30-sep), y el impuesto chino sobre los fideicomisos en el extranjero (anuncio n.º 21 de 24-jul, cuyo plazo de gracia vencía el 22-oct) como lastre de la demanda de los clientes chinos ricos [10, 32]. Mayor caída de un mes de los últimos seis.', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-05-18 a 2026-06-16', var_pct: 10.7, causa: 'Mayor subida de un mes de los últimos seis; sin noticia propia identificada (no se buscó más: es una subida, no cambia el veredicto) [30].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-10-22 (en curso)', var_pct: -8.1, causa: 'Ingresos del 3T26 por debajo de lo esperado: +4,3 % a tipo constante frente al 5,2 %, Asia sin Japón plana y confección y accesorios −2 % [28, 32]. A las 9:13 de París cotizaba a 1.251,5 EUR (−7,7 %) con el CAC 40 a −1,2 %, LVMH a −1,8 % y Kering a −2,5 % [31]; a las 9:25, a 1.246 EUR (−8,1 %) [3]: por debajo del mínimo de 52 semanas.', veredicto: 'retrasa', condicion: 'Hasta el cierre del 22-oct: el precio del informe (1.356,5 EUR) es anterior a los ingresos y la cotización de hoy va un 8 % por debajo; recalcular la rentabilidad a 12 meses con ese cierre antes de cualquier orden.' },
  ],
  noticias: [
    { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Ingresos de los nueve meses: 12.260 M EUR (+5,5 % a tipo constante, +2,9 % publicado); 3T26 4.096 M (+4,3 % a tipo constante, +5,5 % publicado), por debajo del 5,2 % esperado. Asia sin Japón 0,0 % en el trimestre; Japón +9,6 %; América +8,8 %; Europa sin Francia +9,5 %; marroquinería +10,8 %; confección y accesorios −2,0 %; relojes −6,0 %. Sin cifras de guía: repite el «objetivo ambicioso» a medio plazo [28, 32].', veredicto: 'retrasa', condicion: 'Hasta el cierre del 22-oct y la revisión del consenso tras la conferencia.' },
    { fecha: '2026-10-19', tipo: 'recomendación', hecho: 'Bernstein mantiene Comprar; Berenberg reitera Comprar (15-oct); AlphaValue sube a Comprar (9-oct) [3].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-12', tipo: 'resultados', hecho: 'LVMH publicó un crecimiento orgánico del 1 % en el 3T y un −5 % en moda y marroquinería, por China: el sector sigue débil [32].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-05', tipo: 'recomendación', hecho: 'UBS inicia con Vender y objetivo de 1.168 EUR (el mínimo del consenso); Goldman Sachs mantiene Vender; RBC reitera Neutral [3, 10].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-30', tipo: 'recomendación', hecho: 'Citi y HSBC bajan su objetivo; antes, RBC (22-sep) y Bernstein (21-sep, por la demanda china) [3, 10].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-24', tipo: 'directivos', hecho: 'Compras de la familia y del consejo, ninguna venta: Thod 15, sociedad ligada a Dorothée Dumas (consejo de vigilancia), 3.000 acciones a 1.543,97 EUR (31-jul, ≈ 4,6 M EUR); Matthieu Dumas, 125 a 1.459,13 EUR (4-sep); otro miembro del consejo de vigilancia, 20 a 1.415 EUR (11-sep); Capucine Harth, del consejo de gerencia de Émile Hermès SAS, 150 a 1.349,35 EUR (24-sep) [35].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-24', tipo: 'demanda o regulador', hecho: 'China grava las aportaciones a fideicomisos en el extranjero y sus rentas (anuncio n.º 21 de 2026, tipo del 20 % sobre la plusvalía latente); el plazo de gracia vence el 22-oct. Lastra la demanda de los clientes chinos con más patrimonio [32].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-06-23', tipo: 'recomendación', hecho: 'HSBC rebaja de Comprar a Mantener y el objetivo de 2.100 a 1.870 EUR: ve tímida la recuperación del 2T y sin catalizadores [34]. El 22-jun, nota de Kepler Cheuvreux sobre el margen (−5,9 % en la sesión) [33].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2027-02-12',
  veredicto: 'retrasa',
  condicion: 'Hasta el cierre de París del 22-oct-2026 (reacción a los ingresos del 3T, ≈ −8 % a media mañana) y la revisión del consenso tras la conferencia; con ese precio, rehacer la rentabilidad a 12 meses.',
  comentario: 'La acción acumula un −39,7 % en doce meses y cotiza un 19 % por debajo de su media de 200 sesiones: tendencia bajista, con caídas en cada publicación y en las notas de analistas sobre China [1, 30]. No hay colocaciones, ampliaciones ni ventas de la familia; al contrario, sus miembros compraron entre julio y septiembre [35]. El hecho pendiente era el 3T26 y ya está: crecimiento del 4,3 % frente al 5,2 % esperado y Asia sin Japón plana, con la acción a −8 % a media mañana y en mínimos de 52 semanas [3, 28, 31]. El veredicto es «retrasa» solo hasta el cierre del día: el precio del informe es anterior a la noticia. Los próximos resultados son el 12-feb-2027.',
};
d.bolsa.extra = [
  'Rentabilidades y beta con el ETF del CAC 40 con dividendos (CAC.PA) y el ETF de lujo mundial (GLUX.PA), hasta el 20-oct-2026, último cierre de Yahoo [1]. El 21-oct la acción subió un 1,3 % (de 1.339 a 1.356,5 EUR) [30].',
  'Betas frente al CAC 40: mensual 5 años 1,43; semanal 5 años 1,30; semanal 2 años 1,34; ajustadas 1,29 (mensual) y 1,20 (semanal) [1].',
  'Movimiento al cierre del 21-oct, calculado con los cierres de Euronext: volatilidad de 60 sesiones 26,9 %; máximo de 5 años 2.839 EUR (14-feb-2025); peores sesiones de 12 meses: 29-jul-2026 (−11,0 %), 15-abr-2026 (−8,2 %), 22-jun-2026 (−5,9 %), 19 y 20-mar-2026 (−5,8 % y −4,9 %) [1, 30]. La herramienta movimiento.mjs devolvió un cierre de 1.334,5 EUR para el 21-oct que no coincide con Euronext (1.356,5): se usan los cierres de Euronext.',
];
d.bolsa.confianza = 'Alta';

// ---------- comparables ----------
d.comparables.empresas = comp;
d.comparables.criterio = 'Seis grupos europeos de lujo en NIIF con venta directa mayoritaria (LVMH, Richemont, Kering, Moncler, Prada y Brunello Cucinelli) y L\'Oréal, que compite con Hermès en perfume y belleza y tiene un perfil de marca de calidad similar. Ferrari, el otro lujo de escasez, queda fuera por presupuesto (ver huecos); Pernod y Estée Lauder, por negocio. Estimaciones de MarketScreener leídas el 20 y 21-oct-2026 para los análisis de LVMH y Moncler de este repositorio, al cierre del 21-oct convertido a euros con el BCE (Prada, cierre del 20-oct en Hong Kong) [12-18, 37].';
d.comparables.extra = [
  'Cifras rehechas al cierre del 21-oct: LVMH, Kering, Richemont, Prada, Cucinelli y Moncler, de informes/moncler-2026-10-21 (MarketScreener 21-oct); L\'Oréal, de informes/lvmh-2026-10-21 (MarketScreener 20-oct) llevada al cierre de Euronext del 21-oct, 405,70 EUR [12-18, 36]. LTM = último ejercicio publicado (Richemont, a mar-26); NTM = nov-26 a oct-27, 2/12 de 2026e y 10/12 de 2027e (Richemont, 5/12 y 7/12) [12-18].',
  'Mediana de los siete: PER NTM 23,4; EV/EBITDA NTM 8,7; EV/EBIT NTM 15,7. Las estimaciones de LVMH ya recogen su 3T (12-oct); las de Moncler, Kering y Richemont son anteriores a sus ventas del 3T [12-18].',
  'La deuda neta de MarketScreener no sigue un criterio único con los arrendamientos (en LVMH, Prada y Cucinelli parece incluirlos; en Richemont y Moncler, no) [12-18].',
];
d.comparables.confianza = 'Media';

// ---------- valoracion ----------
d.valoracion.extra = [
  'Puente a 30-jun-2026, último balance publicado (los ingresos del 3T no traen balance) [8, 9]: deuda financiera 5 M (4 + 1); arrendamientos 2.279 M (1.934 + 345); caja 12.926 M = caja y equivalentes 12.310 + colocaciones a más de tres meses 616 (caja neta reexpresada publicada); minoritarios 2 M (contables); pensiones 133 M = 179 M de provisión × (1 − 25,8 %); asociadas 859 M = 245 M por puesta en equivalencia + 614 M de otros activos financieros no corrientes (1.230 − 616 de colocaciones), a valor contable (estimación propia). Las recompras del 3T (parte de los 160 M de los nueve meses) no se restan: menos del 0,1 % de la capitalización [28].',
  'WACC, datos de mercado: Bund a 10 años (Bundesbank, curva de rendimientos, vida residual 10 años) 3,47 % el 21-oct-2026 (3,53 % el 9-oct) [5]. Prima implícita de Damodaran, oct-2026: 4,20 % [6]. Beta: 1,20-1,43 frente al CAC 40 según frecuencia y ajuste [1]. Sin deuda financiera: coste de la deuda ≈ tipo de los arrendamientos (55 M de intereses sobre 2.312 M de pasivo = 2,4 %) [9].',
  'Consenso para objetivo_12m.consenso (solo contraste): BPA 2026e 43,73 y 2027e 47,96 EUR; objetivo medio 1.625,35 EUR (1.168-1.920), 23 analistas, tendencia de 3 meses: recortes [2, 3].',
];

// ---------- fuentes ----------
const F = (id, titulo, editor, tipo, fecha, url) => ({ id, titulo, editor, tipo, fecha, url });
const f = Object.fromEntries(d.fuentes.map((x) => [x.id, x]));
f[1] = F(1, 'Históricos diarios de RMS.PA, CAC.PA y GLUX.PA (bolsa.mjs, hasta el 20-oct-2026)', 'Yahoo Finance', 'Datos de mercado', '2026-10-20', 'https://finance.yahoo.com/quote/RMS.PA/history');
f[2] = F(2, 'Hermès International: estimaciones financieras 2025-2028', 'MarketScreener', 'Datos de mercado', '2026-10-22', 'https://www.marketscreener.com/quote/stock/HERMES-INTERNATIONAL-4657/finances/');
f[3] = F(3, 'Hermès International: consenso de analistas, precios objetivo y últimas notas', 'MarketScreener', 'Datos de mercado', '2026-10-22', 'https://www.marketscreener.com/quote/stock/HERMES-INTERNATIONAL-4657/consensus/');
f[4] = F(4, 'Hermes (EPA:RMS) Stock Forecast & Price Target', 'Stock Analysis (datos de S&P Global)', 'Datos de mercado', '2026-10-15', 'https://stockanalysis.com/quote/epa/RMS/forecast/');
f[5] = { ...f[5], fecha: '2026-10-21' };
f[10] = { ...f[10], titulo: 'Hermès International: noticias y cambios de recomendación (jun-oct 2026)', fecha: '2026-10-22' };
f[12] = F(12, 'LVMH: estimaciones financieras (leídas para el informe de Moncler de este repositorio)', 'MarketScreener', 'Datos de mercado', '2026-10-21', 'https://www.marketscreener.com/quote/stock/LVMH-4669/finances/');
f[13] = F(13, 'Compagnie Financière Richemont: estimaciones financieras (leídas para el informe de LVMH de este repositorio)', 'MarketScreener', 'Datos de mercado', '2026-10-21', 'https://www.marketscreener.com/quote/stock/COMPAGNIE-FINANCIERE-RICH-14354614/finances/');
f[14] = F(14, 'Kering: estimaciones financieras (leídas para el informe de LVMH de este repositorio)', 'MarketScreener', 'Datos de mercado', '2026-10-21', 'https://www.marketscreener.com/quote/stock/KERING-4683/finances/');
f[15] = F(15, 'Moncler: estimaciones financieras (leídas para el informe de Moncler de este repositorio)', 'MarketScreener', 'Datos de mercado', '2026-10-21', 'https://www.marketscreener.com/quote/stock/MONCLER-S-P-A-15098901/finances/');
f[16] = F(16, 'Prada: estimaciones financieras (leídas para el informe de LVMH de este repositorio)', 'MarketScreener', 'Datos de mercado', '2026-10-21', 'https://www.marketscreener.com/quote/stock/PRADA-S-P-A-8235601/finances/');
f[17] = F(17, 'Brunello Cucinelli: estimaciones financieras (leídas para el informe de LVMH de este repositorio)', 'MarketScreener', 'Datos de mercado', '2026-10-21', 'https://www.marketscreener.com/quote/stock/BRUNELLO-CUCINELLI-S-P-A-10446678/finances/');
f[18] = F(18, "L'Oréal: estimaciones financieras (leídas para el informe de LVMH de este repositorio)", 'MarketScreener', 'Datos de mercado', '2026-10-20', 'https://www.marketscreener.com/quote/stock/L-OREAL-4666/finances/');
f[28] = F(28, 'Hermès International: Third Quarter 2026 Revenue (información trimestral a fin de septiembre de 2026)', 'Hermès International (vía MFN/GlobeNewswire)', 'Primaria', '2026-10-22', 'https://mfn.se/one/a/hermes/hermes-international-third-quarter-2026-revenue-767f0a7b');
f[29] = F(29, 'Hermès International: Shares and voting rights as of 30th September 2026', 'Hermès International (vía MFN)', 'Primaria', '2026-10-13', 'https://mfn.se/one/a/hermes/hermes-international-shares-and-voting-rights-as-of-30th-september-2026-516b91d7');
f[30] = F(30, 'Historical Data, Hermès International (FR0000052292-XPAR), cierres diarios oct-2025 a oct-2026', 'Euronext', 'Datos de mercado', '2026-10-21', 'https://live.euronext.com/en/ajax/AwlHistoricalPrice/getFullDownloadAjax/FR0000052292-XPAR');
f[31] = F(31, 'Cotización intradía de RMS.PA, ^FCHI, MC.PA y KER.PA del 22-oct-2026 (9:13 de París, diferida 15 minutos)', 'Yahoo Finance', 'Datos de mercado', '2026-10-22', 'https://finance.yahoo.com/quote/RMS.PA/');
f[32] = F(32, 'Hermès : la croissance ralentit au troisième trimestre et stagne en Asie hors Japon', 'France Épargne', 'Prensa', '2026-10-22', 'https://www.france-epargne.fr/news/hermes-la-croissance-ralentit-au-troisieme-trimestre-et-stagne-en-asie-hors-japon');
f[33] = F(33, 'Baromètre du jour : pourquoi le luxe européen décroche en Bourse', 'FashionUnited', 'Prensa', '2026-06-22', 'https://fashionunited.fr/actualite/business/barometre-du-jour-pourquoi-le-luxe-europeen-decroche-en-bourse/2026062342151');
f[34] = F(34, 'Hermès recule, HSBC exclut un redressement spectaculaire (Zonebourse)', 'BFM Bourse', 'Prensa', '2026-06-23', 'https://www.tradingsat.com/hermes-intl-FR0000052292/actualites/hermes-intl-hermes-recule-hsbc-exclut-un-redressement-spectaculaire-1165509.html');
f[35] = F(35, 'Déclarations des dirigeants sur Hermès International: 2026DD1133854 (31-jul), 2026DD1136757 (4-sep), 2026DD1138345 (11-sep) y 2026DD1140617 (24-sep)', 'AMF, base BDIF', 'Primaria', '2026-09-28', 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=HERMES%20INTERNATIONAL&TypesInformation=DD&From=0&Size=15');
f[36] = F(36, "Historical Data, L'Oréal (FR0000120321-XPAR), cierres del 19 al 21-oct-2026", 'Euronext', 'Datos de mercado', '2026-10-21', 'https://live.euronext.com/en/ajax/AwlHistoricalPrice/getFullDownloadAjax/FR0000120321-XPAR');
f[37] = F(37, 'Tipos de cambio de referencia del euro (21-oct-2026: CHF 0,9256; HKD 8,8155)', 'Banco Central Europeo', 'Primaria', '2026-10-21', 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
d.fuentes = Object.values(f).sort((a, c) => a.id - c.id);

// ---------- huecos ----------
d.huecos = [
  { seccion: 'multiplos_historicos', campo: 'PER y EV/EBITDA NTM históricos', tipo: 'Complemento', intentos: '1) MarketScreener: solo 2026e-2028e; 2) Stock Analysis: histórico de pago; 3) Zonebourse: gráficos sin valores', decision: 'Omitido' },
  { seccion: 'comparables', campo: 'Ferrari como comparable de lujo de escasez', tipo: 'Complemento', intentos: '1) MarketScreener (página de finanzas de Ferrari): la URL devolvió la portada; 2) Stock Analysis: sin estimaciones gratuitas a 3 años; 3) sin presupuesto para el 20-F', decision: 'Omitido' },
  { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) AMF, registro de posiciones cortas netas: no consultado por presupuesto; 2) data.gouv.fr: no descargado; 3) prensa: sin menciones', decision: 'Omitido' },
  { seccion: 'consenso', campo: 'Consenso revisado tras los ingresos del 3T26', tipo: 'Complemento', intentos: '1) MarketScreener finanzas, 22-oct 9:25: aún con las cifras previas; 2) Stock Analysis: última actualización 15-oct; 3) prensa del 22-oct (France Épargne, Boursorama/Reuters): solo el consenso del trimestre (5,2 %, ≈ 4.120 M), sin BPA anual nuevo', decision: 'Omitido' },
];
d._estado = 'terminado';
writeFileSync(ruta, JSON.stringify(d, null, 2) + '\n');
console.log('ok', d.fuentes.length, 'fuentes');
