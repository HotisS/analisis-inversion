// Notas D (mercado) y E (sentimiento) de Roche, corte 26-oct-2026. Las importa construir-notas-roche.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const mov = JSON.parse(fs.readFileSync(path.join(dir, 'movimiento.json'), 'utf8'))['ROP.SW'];
const RA = 'https://assets.roche.com/f/176343/x/';
const USDCHF = 0.8244; // BCE 23-oct-2026: EURCHF 0,9227 / EURUSD 1,1193
const chf = (b) => Math.round(b * 1000 * USDCHF);
const cierre = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));

export const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Roche Holding AG', nombre_corto: 'Roche', ticker: 'ROP (antes ROG)', isin: 'CH1499059983',
    mercado: 'SIX Swiss Exchange', indice_referencia: 'SMI', pais: 'Suiza', pais_iso: 'CH', sector: 'Salud',
    industria: 'Farmacéutica y diagnóstico in vitro', sede: 'Basilea', fundacion: '1896', empleados: 112774,
    web: 'www.roche.com', precio: 390.9, fecha_precio: '2026-10-23', acciones: 807, capitalizacion_publicada: 317180,
    free_float_pct: 91.4, max_52s: 395, min_52s: 258.2, volumen_medio_diario: '≈ 339 M CHF/día (3 meses, bonos de participación ROP)',
    proximos_resultados: '2027-02-04',
  },
  identificacion_nota: 'Ticker: en la SIX cotizan desde el 17-mar-2026 los bonos de participación (Partizipationsscheine) ROP, ISIN CH1499059983, que sustituyeron a los Genussscheine ROG, y las acciones al portador RO; se mantiene el nombre «ROP (antes ROG)» del informe anterior [10, 9]. Precio: cierre del viernes 23-oct-2026 (390,90 CHF), el último publicado; el lunes 26-oct la sesión estaba abierta (≈397 CHF) [1]. Acciones: 807 M diluidas del 1S26 [10]; en circulación ≈797 M. Capitalización publicada por Stock Analysis: 317.180 M CHF [4]. Capital flotante ≈91 %: el pacto de la familia fundadora tiene 69,3 M de acciones al portador (65 % de los votos, ≈8,6 % del capital económico) [C]. Próximos resultados: estimados el 4-feb-2027 (finanzen.ch); Roche aún no ha publicado la fecha [15].',
  consenso: {
    guidance: 'El 22-oct-2026 Roche confirmó la guía de 2026 (fijada el 29-ene y confirmada el 23-jul): ventas del grupo +un dígito medio y BPA core +un dígito alto, ambos a tipo de cambio constante, y dividendo de nuevo al alza en francos [9]. A tipos del 30-sep, la divisa resta ≈3 puntos a las ventas y ≈5 al BPA core del año. El impacto de pérdidas de exclusividad baja a ≈0,6 mil millones (≈1 mil millones en julio) [9]. No hay plan con cifras a medio plazo; en el Pharma Day (sep-2026) la dirección presentó una fase III con 12 moléculas nuevas y 19 indicaciones adicionales [16].',
    estimaciones: [
      { periodo: '2026e', ingresos: 64504, ebitda: 25489, ebit: 22789, bpa: 20.33, dpa: null, fuente: 'Encuesta de consenso de Roche tras el 1S26 (31-ago-2026, 17 analistas): ventas + otros ingresos, beneficio operativo core y BPA core; EBITDA = core + ≈2.700 M de depreciación [6]. Stock Analysis (S&P Global, 20-oct): ingresos 63.070 M y BPA 20,55 [3]' },
      { periodo: '2027e', ingresos: 67624, ebitda: 27262, ebit: 24512, bpa: 21.99, dpa: null, fuente: 'Consenso de Roche (31-ago, 17 analistas) [6]; Stock Analysis: ingresos 66.190 M y BPA 22,13 [3]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: null, dpa: null, fuente: 'Sin consenso gratuito verificable a la fecha de corte (Stock Analysis lo reserva a suscriptores; Stocksguide bloquea el acceso)' },
    ],
    recomendaciones: { n_analistas: 21, comprar: 11, mantener: 9, vender: 1, po_medio: 386.36, po_min: 250, po_max: 440 },
    revisiones: 'El BPA core de 2026 del consenso apenas se ha movido en el año: 20,33 en la encuesta de Roche de agosto [6] y 20,55 en S&P Global (20-oct) [3]; 2027e entre 21,99 y 22,13. Lo que ha subido son los objetivos: Oddo BHF pasó el 20-oct de infraponderar a sobreponderar con objetivo de 440 CHF (antes 300) [8]; RBC 400 y UBS 376, mientras Deutsche Bank (340) y JPMorgan (325) siguen en mantener [3]. El 3T26 (22-oct) fue solo de ventas: superó en ingresos con farma algo por debajo [11]. MarketScreener no es accesible; se contrastó con Stock Analysis y MarketBeat (ADR RHHBY: 13 analistas, objetivo 60 USD, ≈396 CHF por acción a 8 ADR por título) [3, 5].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 3.1,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'Roche ha pasado de rezagada a líder del SMI: +48,3 % en un año con dividendos frente a +18,3 % del índice y +10,5 % del sector farmacéutico europeo, y +22,2 % anual a tres años [1]. Antes, de 2022 a mayo de 2024 cayó un 42 %: fracasos de la cartera (tiragolumab, gantenerumab), la caída de las ventas covid y el franco fuerte [A]. El cambio llegó con el crecimiento del 6-8 % a tipo constante cada trimestre desde 2024, el margen core al alza (39 % en el 1S26), la compra de cartera en obesidad e inmunología y un riesgo de genéricos menor que el de sus rivales (<30 % de las ventas hasta 2032 frente a >70 % en Novartis, según Oddo) [8, A]. A cinco y diez años aún va por detrás del SMI (5,3 % frente a 7,7 % anual).',
    contexto: {
      movimiento: {
        fecha: mov.fecha, var_1m_pct: mov.var_1m_pct, var_3m_pct: mov.var_3m_pct, var_6m_pct: mov.var_6m_pct, var_12m_pct: mov.var_12m_pct,
        dist_max_52s_pct: mov.dist_max_52s_pct, dist_min_52s_pct: mov.dist_min_52s_pct, dist_max_historico_pct: mov.dist_max_historico_pct,
        tendencia: mov.tendencia, volatilidad_60d_pct: mov.volatilidad_60d_pct, avisos: mov.avisos,
      },
      movimientos_fuertes: [
        { periodo: '23-jul-2026', var_pct: 5.1, causa: 'Resultados del 1S26: BPA core 10,85 CHF (+9 % a tipo constante), margen core del 39 % y guía confirmada; varios bancos subieron objetivos en los días siguientes [10, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: '14-sep-2026', var_pct: 5.0, causa: 'Subida de un día sin noticia propia identificada en las fuentes revisadas (prensa suiza, Seeking Alpha, web de Roche); coincide con la antesala del Pharma Day del 28-sep y con datos de cartera en congresos de oncología. Sin efecto en la tesis [1, 16].', veredicto: 'no cambia', condicion: null },
        { periodo: '14-oct a 20-oct-2026', var_pct: 10.5, causa: 'Racha de noticias: compra de Rona (obesidad, 13-oct), aprobación de Enspryng en TED (16-oct), licencia de ADC de Hansoh (19-oct) y doble subida de Oddo BHF a sobreponderar con objetivo 440 (20-oct, +2,6 % ese día). No llega al 15 % en un mes (mayor subida mensual en 6 meses: +11,9 %) [2, 8, 11].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Ventas de enero-septiembre 46.493 M CHF (+6 % a tipo constante, +1 % en francos); 3T +7 % a tipo constante y +8 % en francos. Farma +7 % (Japón +25 % por el cambio de sistema ERP de Chugai), Diagnóstico +4 %. Guía confirmada; pérdidas de exclusividad rebajadas a ≈0,6 mil millones [9]. La acción cerró plana [1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-22', tipo: 'directivos', hecho: 'El consejo propone a Christophe Weber, ex consejero delegado de Takeda, como consejero en la junta del 9-mar-2027 [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-20', tipo: 'recomendación', hecho: 'Oddo BHF sube Roche dos escalones, de infraponderar a sobreponderar, y el objetivo de 300 a 440 CHF: ve menos riesgo de genéricos que en sus rivales y más crecimiento por la cartera [8, 12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-19', tipo: 'fusión u oferta', hecho: 'Licencia de conjugados anticuerpo-fármaco de Hansoh por hasta 14.000 M USD (pagos por hitos); el mismo día Roche congela inversiones en Alemania por la reforma sanitaria [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-13', tipo: 'fusión u oferta', hecho: 'Compra de Rona Therapeutics (ARN de interferencia para obesidad) por hasta 1.160 M USD [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-30', tipo: 'demanda o regulador', hecho: 'La FDA da revisión prioritaria a fenebrutinib en esclerosis múltiple; giredestrant (cáncer de mama) tiene fechas de decisión el 30-nov-2026 (temprano) y el 18-dic-2026 (avanzado) [9, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-17', tipo: 'recomendación', hecho: 'Un banco francés rebajó Roche a neutral por potencial limitado (cash.ch); revertido en la práctica por la subida posterior y la mejora de Oddo [12].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-02-04',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está en máximos de 52 semanas y a un 1 % de su máximo histórico (400,55), con tendencia alcista (16 % sobre la media de 200 sesiones) y +23,7 % en seis meses. Lo explican unos resultados que cumplen cada trimestre, el margen core al alza y una racha de compras de cartera y mejoras de recomendación en octubre. No hay colocaciones, ampliaciones ni ventas anunciadas del pacto familiar; los próximos resultados, a principios de febrero, quedan a más de tres meses (regla 11: no retrasan). Se buscó en la web de inversores de Roche, cash.ch, finanzen.ch, vermoegenszentrum (AWP), Seeking Alpha, Stock Analysis y MarketBeat. Ninguna noticia retrasa ni descarta: veredicto «no cambia».',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierre[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    nota: 'Cierres de diciembre de Yahoo Finance (ROG hasta mar-2026 y ROP después; el canje fue de uno por uno) [1]. Ningún proveedor gratuito da el PER ni el EV/EBITDA de los próximos 12 meses históricos; el PER adelantado sobre BPA core se calcula en propio.mjs con el BPA core real del año siguiente.',
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Las grandes farmacéuticas mundiales con cartera de especialidad (oncología, inmunología, neurología) y escala comparable: Novartis (el rival suizo directo), AstraZeneca, Merck, Sanofi, GSK, Johnson & Johnson, Pfizer, AbbVie y Bristol-Myers. Fuera Eli Lilly (32,9 veces, por la obesidad) y Novo Nordisk (11,7 veces, por su caída): son casos extremos de un solo segmento y la mediana no cambia con ellos (16,0 veces). No hay un comparable puro del diagnóstico de Roche (Abbott y Danaher mezclan otros negocios).',
    empresas: [
      { nombre: 'Novartis', ticker: 'NOVN', pais: 'CH', capitalizacion: chf(294.91), ev_ventas: 5.92, ev_ebitda_ltm: 14.54, ev_ebitda_ntm: null, per_ntm: 16.64, crecimiento_pct: 6.8, margen_ebitda_pct: 40.7, roic_pct: 18.8, dn_ebitda: 1.77, fcf_yield_pct: 5.68 },
      { nombre: 'AstraZeneca', ticker: 'AZN', pais: 'GB', capitalizacion: chf(266.06), ev_ventas: 4.79, ev_ebitda_ltm: 14.51, ev_ebitda_ntm: null, per_ntm: 16.03, crecimiento_pct: 6.4, margen_ebitda_pct: 33.0, roic_pct: 16.4, dn_ebitda: 1.37, fcf_yield_pct: 4.01 },
      { nombre: 'Merck & Co.', ticker: 'MRK', pais: 'US', capitalizacion: chf(358.41), ev_ventas: 6.09, ev_ebitda_ltm: 14.03, ev_ebitda_ntm: null, per_ntm: 17.47, crecimiento_pct: 4.3, margen_ebitda_pct: 43.4, roic_pct: 14.1, dn_ebitda: 1.62, fcf_yield_pct: 4.48 },
      { nombre: 'Sanofi', ticker: 'SAN', pais: 'FR', capitalizacion: chf(99.44), ev_ventas: 2.13, ev_ebitda_ltm: 7.7, ev_ebitda_ntm: null, per_ntm: 8.69, crecimiento_pct: 6.5, margen_ebitda_pct: 27.7, roic_pct: 9.1, dn_ebitda: 1.27, fcf_yield_pct: 11.32 },
      { nombre: 'GSK', ticker: 'GSK', pais: 'GB', capitalizacion: chf(101.52), ev_ventas: 2.75, ev_ebitda_ltm: 8.44, ev_ebitda_ntm: null, per_ntm: 10.34, crecimiento_pct: 4.7, margen_ebitda_pct: 32.6, roic_pct: 26.4, dn_ebitda: 1.37, fcf_yield_pct: 9.09 },
      { nombre: 'Johnson & Johnson', ticker: 'JNJ', pais: 'US', capitalizacion: chf(635.07), ev_ventas: 6.67, ev_ebitda_ltm: 19.2, ev_ebitda_ntm: null, per_ntm: 23.69, crecimiento_pct: 6.5, margen_ebitda_pct: 34.7, roic_pct: 21.6, dn_ebitda: 0.79, fcf_yield_pct: 3.24 },
      { nombre: 'Pfizer', ticker: 'PFE', pais: 'US', capitalizacion: chf(171.16), ev_ventas: 3.5, ev_ebitda_ltm: 8.78, ev_ebitda_ntm: null, per_ntm: 10.9, crecimiento_pct: -3.7, margen_ebitda_pct: 39.9, roic_pct: 13.5, dn_ebitda: 2.04, fcf_yield_pct: 6.42 },
      { nombre: 'AbbVie', ticker: 'ABBV', pais: 'US', capitalizacion: chf(504.76), ev_ventas: 8.84, ev_ebitda_ltm: 18.5, ev_ebitda_ntm: null, per_ntm: 18.93, crecimiento_pct: 8.7, margen_ebitda_pct: 47.8, roic_pct: 17.7, dn_ebitda: 2.09, fcf_yield_pct: 3.61 },
      { nombre: 'Bristol-Myers Squibb', ticker: 'BMY', pais: 'US', capitalizacion: chf(125.59), ev_ventas: 3.24, ev_ebitda_ltm: 8.41, ev_ebitda_ntm: null, per_ntm: 10.08, crecimiento_pct: -2.8, margen_ebitda_pct: 38.5, roic_pct: 21.7, dn_ebitda: 1.77, fcf_yield_pct: 9.11 },
    ],
    nota: 'Todas de Stock Analysis (S&P Global) del 26-oct-2026, con cierres del 23-oct [7]: capitalización convertida a francos con el cambio del BCE del 23-oct (1 USD = 0,8244 CHF) [P3], EV/ventas y EV/EBITDA de los últimos 12 meses, PER adelantado sobre BPA ajustado (la base equivalente al BPA core de Roche), crecimiento de ingresos del año próximo sobre el actual, margen EBITDA, ROIC, deuda neta/EBITDA ((valor empresa − capitalización)/EBITDA) y rentabilidad por FCF. No se da EV/EBITDA de los próximos 12 meses: el proveedor gratuito no lo publica y mezclar otro rompería la definición. Mediana del PER adelantado: 16,0 veces.',
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  wacc_datos: {
    tasa_libre_pct: 0.59, fecha: '2026-09', fuente_tasa: 'OCDE vía FRED (IRLTLT01CHM156N): bono de la Confederación a 10 años, media de septiembre de 2026, 0,59 % (el dato diario del BNS no estaba actualizado)',
    beta_observada: bolsa.betas, deuda_mercado: 31805, capitalizacion: 317180,
    nota: 'Beta frente al SMI con dividendos (CSSMI) [1]. Damodaran (Europa, Drugs-Pharmaceutical, ene-2026): beta desapalancada corregida por caja 1,09, D/E 15,9 % [14]. Se desapalanca la propia con la deuda de Roche y se reapalanca con la deuda de Roche (propio.mjs).',
  },
  fuentes: [
    { id: 1, titulo: 'Históricos diarios de ROP.SW (ROG antes del 17-mar-2026), CSSMI.SW (SMI con dividendos) y EXV4.DE (STOXX Europe 600 Health Care), hasta el 23-oct-2026, vía herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/ROP.SW/history/' },
    { id: 2, titulo: 'Movimiento del precio (1-12 meses, medias de 50 y 200 sesiones, volatilidad de 60 sesiones), vía herramientas/movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/ROP.SW/' },
    { id: 3, titulo: 'Roche (SWX: ROP) stock forecast: 21 analistas, consenso comprar, objetivo medio 386,36 CHF (250-440); BPA 2026e 20,55 y 2027e 22,13', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://stockanalysis.com/quote/swx/ROP/forecast/' },
    { id: 4, titulo: 'Roche (SWX: ROP) statistics: capitalización 317.180 M CHF, PER adelantado 18,33x, ROIC 28,1 %', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://stockanalysis.com/quote/swx/ROP/statistics/' },
    { id: 5, titulo: 'Roche Holding (RHHBY) price target and analyst ratings: 13 analistas, objetivo 60 USD por ADR', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://www.marketbeat.com/stocks/OTCMKTS/RHHBY/forecast/' },
    { id: 6, titulo: 'Post HY 2026 consensus survey (31-ago-2026, 17 analistas)', editor: 'Roche', tipo: 'Analistas', fecha: '2026-08-31', url: `${RA}385dcb4d78/roche-post-hy-2026-consensus.pdf` },
    { id: 7, titulo: 'Statistics y forecast de NVS, AZN, MRK, SNY, GSK, JNJ, PFE, ABBV, BMY, LLY y NVO', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://stockanalysis.com/stocks/nvs/statistics/' },
    { id: 8, titulo: 'Rumeurs de marché: nouvel élan pour Roche (Oddo BHF de «underperform» a «outperform», objetivo 440 CHF)', editor: 'Vermögenszentrum / AWP', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.vermoegenszentrum.ch/fr/bourses-et-marches/news/rumeurs-de-marche-nouvel-elan-pour-roche-et-dksh' },
    { id: 9, titulo: 'Investor Update: Roche continues strong momentum in the third quarter (ad hoc; SIX: RO, ROP)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-10-22', url: `${RA}cb5207798e/221026_ir_q3.pdf` },
    { id: 10, titulo: 'Half-Year Report 2026 (acciones diluidas; nota 12, canje de Genussscheine por bonos de participación)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: `${RA}8a0b362d66/hy26e.pdf` },
    { id: 11, titulo: 'Noticias de Roche (RHHBY), 30-sep a 25-oct-2026: fenebrutinib, Rona, Hansoh, Alemania, resultados del 3T', editor: 'Seeking Alpha News', tipo: 'Prensa', fecha: '2026-10-25', url: 'https://seekingalpha.com/symbol/RHHBY/news' },
    { id: 12, titulo: 'Titel von Roche heben nach doppelter Hochstufung ab (20-oct) y Kursteiber fragwürdig: Analyst senkt bei Roche den Daumen (17-mar)', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.cash.ch/news/top-news/titel-von-roche-heben-nach-doppelter-hochstufung-ab-rekordstand-im-blick-977952' },
    { id: 13, titulo: 'Partizipationsscheine von Roche nehmen das Allzeithoch ins Visier (subidas de objetivo tras el 1S26)', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.cash.ch/news/top-news/partzipationsscheine-von-roche-nehmen-das-allzeithoch-ins-visier-956330' },
    { id: 14, titulo: 'Betas by sector (Europe), enero de 2026: Drugs (Pharmaceutical)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
    { id: 15, titulo: 'Roche: Termine (fecha estimada de resultados anuales)', editor: 'finanzen.ch', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://www.finanzen.ch/termine/roche' },
    { id: 16, titulo: 'Pharma Day 2026 (presentación, 28-sep-2026)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-09-28', url: `${RA}51deda2587/20260928_final_pharma-day-2026-publish-1.pdf` },
  ],
  huecos: [
    { seccion: 'consenso', campo: 'Consenso de 2028e (ventas, EBITDA y BPA)', tipo: 'Complemento', intentos: '1) Stock Analysis (2027-2028 solo para suscriptores); 2) Stocksguide (403); 3) MarketScreener (bloqueado)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'Transacciones precedentes con múltiplos', tipo: 'Complemento', intentos: '1) Compras recientes del sector (89bio, Carmot, Telavant, Rona): objetivos sin EBITDA ni ventas; 2) grandes fusiones farmacéuticas de 2019-2021 (BMS-Celgene, AbbVie-Allergan): fuera de plazo y con otro perfil; 3) MarketScreener y Mergermarket (bloqueado o de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) La SIX no publica registro oficial de cortos (lecciones de Suiza); 2) Stock Analysis no lo da para la SIX; 3) MarketBeat (solo el ADR RHHBY, poco representativo)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Causa de la subida del 14-sep-2026 (+5,0 %)', tipo: 'Complemento', intentos: '1) cash.ch y finanzen.ch; 2) Seeking Alpha News; 3) búsqueda web', decision: 'Omitido' },
  ],
};

export const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Positivo',
    tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits (flujo de $RHHBY)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Tono algo alcista y poco volumen: los mensajes giran en torno a la decisión de la FDA sobre giredestrant (30-nov y 18-dic) y a si el ADR aguanta en 60-65 USD tras romper máximos; pocos bajistas, que hablan de precio ya exigente [1].' },
      { plataforma: 'cash.ch (prensa financiera suiza y comentarios)', fecha: '2026-10', n_comentarios: 4, tono: 'Positivo', resumen: 'Artículos sobre la «doble subida» de Oddo y el récord a la vista (20-oct), la antesala del 3T (divisa, diagnóstico en China y cartera, 21-oct) y, en agosto, el aviso técnico de rebote en 375 CHF; en marzo, una rebaja a neutral por potencial limitado [2, 3, 4].' },
      { plataforma: 'Seeking Alpha (noticias y titulares)', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: 'Flujo de noticias favorable: compras de cartera (Rona, Hansoh), aprobaciones (Enspryng, Tecentriq) y datos de supervivencia en cáncer de pulmón de Tam-Peli (≈6 meses más, 25-oct). El 3T se tituló «supera en ingresos, farma algo por debajo» [5].' },
    ],
    temas: [
      { tema: 'Giredestrant y la cartera de oncología', postura: 'Alcista', peso: 'Alto', contraste: 'Dos fechas de la FDA antes de fin de año (30-nov y 18-dic) [D9]. Una aprobación ya está casi descontada por los analistas; el valor está en las ventas máximas (varios miles de millones), que dependen de los datos del estudio adyuvante.' },
      { tema: 'Obesidad (petrelintide, CT-388, Rona)', postura: 'Alcista', peso: 'Medio', contraste: 'Fase II de petrelintide (oct-2026) y compras de Carmot, Zealand (licencia) y Rona [A, D11]: Roche llega tarde frente a Lilly y Novo; el mercado le da poco valor hoy, lo que limita el riesgo.' },
      { tema: 'Valoración tras el +48 % en un año', postura: 'Dividida', peso: 'Medio', contraste: 'Cotiza a ≈17,8 veces el BPA core de 2027e, por encima de su mediana adelantada (≈15,6x) y de la de comparables (16,0x) [D7]. La prima tiene base en el menor riesgo de genéricos, pero ya no hay descuento.' },
      { tema: 'Divisa y reformas de precios (EE. UU., Alemania)', postura: 'Bajista', peso: 'Medio', contraste: 'El franco resta ≈5 puntos al BPA core de 2026 [D9]; la nación más favorecida en EE. UU. y la reforma alemana pesan en precio. Roche ha respondido con inversión en EE. UU. y congelando inversión en Alemania [D11].' },
    ],
    lectura: 'El sentimiento del particular y de la prensa es positivo y mejora, en línea con el precio en máximos y las subidas de objetivo; no hay euforia visible (poco volumen en foros) pero tampoco escepticismo. El riesgo es que el optimismo ya esté en el múltiplo: con la acción a 17,8 veces el BPA de 2027e, una decepción en giredestrant o en la guía de 2027 tendría más recorrido a la baja que hace un año. El sentimiento no señala un riesgo que el análisis no recoja.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Stocktwits: mensajes sobre $RHHBY de octubre de 2026 (≈30)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://stocktwits.com/symbol/RHHBY' },
    { id: 2, titulo: 'Titel von Roche heben nach doppelter Hochstufung ab: Rekordstand im Blick', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.cash.ch/news/top-news/titel-von-roche-heben-nach-doppelter-hochstufung-ab-rekordstand-im-blick-977952' },
    { id: 3, titulo: 'Ausblick Roche: Wechselkurse, Diagnostik und Pipeline im Blick', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.cash.ch/news/top-news/ausblick-roche-wechselkurse-diagnostik-und-pipeline-im-blick-978423' },
    { id: 4, titulo: 'Roche am Mehrjahreshoch abgeprallt: geben die Aktien die Jahresgewinne wieder ab?', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-08-17', url: 'https://www.cash.ch/news/top-news/roche-am-mehrjahreshoch-abgeprallt-geben-die-aktien-die-jahresgewinne-wieder-ab-961353' },
    { id: 5, titulo: 'Noticias de Roche (RHHBY), 30-sep a 25-oct-2026', editor: 'Seeking Alpha News', tipo: 'Prensa', fecha: '2026-10-25', url: 'https://seekingalpha.com/symbol/RHHBY/news' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'Análisis de colaboradores de Seeking Alpha y transcripción de la conferencia', tipo: 'Complemento', intentos: '1) RSS de Seeking Alpha (solo titulares); 2) página de análisis (protección anti-bots, no se forzó); 3) web de Roche (el 3T no tiene conferencia con transcripción pública)', decision: 'Omitido' },
    { seccion: 'sentimiento', campo: 'Reddit y foros en alemán (finanzen.net, cash.ch)', tipo: 'Complemento', intentos: '1) API de Reddit (bloqueada); 2) foro de finanzen.net (requiere JavaScript); 3) comentarios de cash.ch (sin hilo abierto en octubre)', decision: 'Omitido' },
  ],
};
