// Construye notas/D.json (subagente D, Viscofan, corte 2026-10-23). Ejecutar desde notas/: node D_build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const comps = JSON.parse(readFileSync(join(aqui, 'D_comps.json'), 'utf8')).map(({ _var_precio_pct, ...e }) => e);
const reaccion = (() => { try { return JSON.parse(readFileSync(join(aqui, 'D_reaccion.json'), 'utf8')); } catch { return null; } })();

const fuentes = [
  { id: 1, titulo: 'Nota de resultados enero-septiembre 2026 (cuenta, balance a 30-sep-2026, guía revisada y dividendo a cuenta)', editor: 'Viscofan / CNMV', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://public.viscofan.com/investor-relations/financialinformation/es/Nota%20de%20resultados.%20Enero-Septiembre%202026_ES.pdf' },
  { id: 2, titulo: 'Informe financiero semestral enero-junio 2026 (autocartera, capital, arrendamientos y otros pasivos financieros)', editor: 'Viscofan / CNMV', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://public.viscofan.com/investor-relations/financialinformation/es/Informe%20financiero%20Enero-Junio%202026_ES.pdf' },
  { id: 3, titulo: 'VIS.MC, ^IBEX, EXH3.DE y comparables: históricos diarios, intradía de 5 minutos y cotización de cierre del 22-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-22', url: 'https://finance.yahoo.com/quote/VIS.MC/history' },
  { id: 4, titulo: 'Viscofan: datos financieros, estimaciones de consenso 2026-2028 y precio objetivo medio', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-22', url: 'https://www.marketscreener.com/quote/stock/VISCOFAN-39429052/finances/' },
  { id: 5, titulo: 'Viscofan (BME:VIS) statistics: capitalización, acciones, volumen, beta', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/quote/bme/VIS/statistics/' },
  { id: 6, titulo: 'Rentabilidad del Bund a 10 años (curva de rendimientos a la par, serie diaria BBSIS)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-22', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 7, titulo: 'Informe anual consolidado 2025 (cuentas anuales y memoria)', editor: 'Viscofan', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://public.viscofan.com/investor-relations/financialinformation/es/Informe%20consolidado%20Grupo%20Viscofan%202025_Definitivo%20con%20informes.pdf' },
  { id: 8, titulo: 'Informe anual de gobierno corporativo 2025 (IAGC)', editor: 'Viscofan / CNMV', tipo: 'Primaria', fecha: '2025-12-31', url: 'https://public.viscofan.com/corporate-governance/Informes/IGC_A-31065501_2025%20v6.pdf' },
  { id: 9, titulo: 'Presentación de resultados 2025 y plan estratégico Beat\'30', editor: 'Viscofan', tipo: 'Primaria', fecha: '2026-02-27', url: 'https://public.viscofan.com/investor-relations/financialinformation/es/Presentaci%C3%B3n%20Resultados%202025%20y%20BEAT30_ES.pdf' },
  { id: 10, titulo: 'Viscofan: consenso de analistas (recomendaciones y precios objetivo)', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10-22', url: 'https://www.investing.com/equities/viscofan-sa-consensus-estimates' },
  { id: 11, titulo: 'Viscofan sube precios para combatir la inflación, pero sus márgenes siguen bajo presión (previa del 3T26 de Renta 4)', editor: 'Merca2', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.merca2.es/2026/10/20/viscofan-precios-margenes-2476589/' },
  { id: 12, titulo: 'Notificaciones de posiciones cortas: Viscofan (NIF A31065501)', editor: 'CNMV', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.cnmv.es/portal/Consultas/EE/PosicionesCortas?nif=A-31065501' },
  { id: 24, titulo: 'STOXX Components Changes, STOXX Supersector Indices (revisión trimestral de septiembre de 2026)', editor: 'STOXX', tipo: 'Datos de mercado', fecha: '2026-09-01', url: 'https://www.stoxx.com/documents/stoxxnet/Documents/News/2026/September/STOXX_Components_Changes_STOXX_Supersector_Indices_20260901.pdf' },
  { id: 13, titulo: 'AKO Capital y Citadel refuerzan sus posiciones bajistas en Técnicas Reunidas, Viscofan y Cellnex', editor: 'Demócrata', tipo: 'Prensa', fecha: '2026-06-29', url: 'https://www.democrata.es/economia/ako-capital-y-citadel-refuerzan-sus-posiciones-bajistas-en-tecnicas-reunidas-viscofan-y-cellnex/' },
  { id: 14, titulo: 'Betas by Sector (US), enero 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
  { id: 15, titulo: 'Implied Equity Risk Premiums by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 16, titulo: 'Sausage Casings Market Size report (2022: 6.200 M USD; TCAC 3,4 % 2023-2032)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2023-08-01', url: 'https://www.gminsights.com/industry-analysis/sausage-casings-market' },
  { id: 17, titulo: 'Viscofan: los volúmenes trimestrales crecerán en torno a su media histórica del 4 % (previa 1T26)', editor: 'Merca2', tipo: 'Prensa', fecha: '2026-04-21', url: 'https://www.merca2.es/2026/04/21/viscofan-volumenes-media-2370748/' },
  { id: 18, titulo: 'Comparables: estadísticas LTM (Stock Analysis) y estimaciones 2026-2028 (MarketScreener) de Kerry, Symrise, AAK, Tate & Lyle, Ingredion, Corbion, Huhtamäki y Amcor, tomadas el 6-oct-2026', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://stockanalysis.com/quote/ise/KRZ/statistics/' },
  { id: 19, titulo: 'Devro agrees £692m increased takeover bid from Saria', editor: 'Scottish Financial Review', tipo: 'Prensa', fecha: '2023-02-16', url: 'https://scottishfinancialreview.com/2023/02/16/devro-agrees-692m-increased-takeover-bid-from-saria/' },
  { id: 20, titulo: 'Sealed Air to be acquired by CD&R (8-K, exhibit 99.1)', editor: 'Sealed Air / SEC', tipo: 'Primaria', fecha: '2025-11-17', url: 'https://www.sec.gov/Archives/edgar/data/1012100/000119312525283978/d944036dex991.htm' },
  { id: 21, titulo: 'Combination of Tate & Lyle and CP Kelco (RNS)', editor: 'Tate & Lyle', tipo: 'Primaria', fecha: '2024-06-20', url: 'https://tateandlyle.com/sites/default/files/2024-06/rns-combination-tate-lyle-and-cp-kelco-20-june-2024.pdf' },
  { id: 22, titulo: 'Darling Ingredients acquires collagen and peptide producer Gelnex for US$1.2bn', editor: 'Food Business MEA', tipo: 'Prensa', fecha: '2022-10-20', url: 'https://www.foodbusinessmea.com/darling-ingredients-acquires-global-collagen-and-peptide-producer-gelnex-for-us1-2bn/' },
  { id: 23, titulo: 'Icahn Enterprises L.P. Form 10-K 2025 (segmento Food Packaging: Viskase)', editor: 'SEC', tipo: 'Primaria', fecha: '2026-02-27', url: 'https://www.sec.gov/Archives/edgar/data/813762/000110465926019821/tmb-20251231x10k.htm' },
];

// ---------- Proyección propia (base) y BPA ----------
// 2026e: 9M26 real [1] + 4T26 propio. Ventas 1.300 M (+3,8 %), EBITDA 288,6 M (22,2 %), amortización 86,1 M, financiero −7,4 M,
// impuestos 39,8 M (20,4 %), minoritarios 1,0 M → neto 154,3 M; BPA 3,40 con 45,4 M de acciones medias.
// 2027e: 1.371,5 × 23,0 % = 315,4; amort. 6,8 % = 93,3; EBIT 222,2; fin. −12,5; BAI 209,7; imp. 22 % 46,1; min. 1,0 → 162,6 → 3,59.
// 2028e: 1.446,9 × 23,5 % = 340,0; amort. 6,9 % = 99,8; EBIT 240,2; fin. −12,0; BAI 228,2; imp. 22 % 50,2; min. 1,1 → 176,9 → 3,91.
// Bajista (−2 pp crecimiento y margen desde 2027e, como escenarios del informe anterior): 2028e 1.392,6 × 21,5 % = 299,4 → BPA 3,25.
// Alcista (+1,5 pp crecimiento, +1 pp margen): 2028e 1.488,4 × 24,5 % = 364,7 → BPA 4,30. Acciones 45,29 M.

const D = {
  _estado: 'en curso',
  identificacion: {
    nombre: 'Viscofan, S.A.', nombre_corto: 'Viscofan', ticker: 'VIS', isin: 'ES0184262212',
    mercado: 'Bolsa de Madrid (Mercado Continuo)', indice_referencia: 'IBEX Medium Cap',
    pais: 'España', pais_iso: 'ES', sector: 'Consumo básico', industria: 'Productos alimentarios (envolturas para la industria cárnica)',
    sede: 'Tajonar (Navarra)', fundacion: '1975', empleados: 5974, web: 'www.viscofan.com',
    precio: 54.30, fecha_precio: '2026-10-22',
    acciones: 45.29, capitalizacion_publicada: 2476, free_float_pct: 79.2,
    max_52s: 62.30, min_52s: 51.20,
    volumen_medio_diario: '≈ 4,2 M EUR/día (76.800 acciones, media de 3 meses a 21-oct-2026)',
    proximos_resultados: '2027-02-25',
  },

  consenso: {
    guidance: 'El 22-oct-2026, con los resultados de enero-septiembre, Viscofan **rebajó el EBITDA de 2026 a 290-295 M** (antes 305-314 M; en julio ya había avisado de que quedaría en la parte baja) y mantuvo los ingresos (1.310-1.340 M, +5/+7 %) y el resultado neto (165-170 M) [1][2]. Lo atribuye a la energía tras el conflicto de Oriente Medio, con coberturas en España que restarán más de 5 M al EBITDA del 4T26 [1]. El capex sigue en 100 M (54,2 M en 9M26) y habrá un dividendo a cuenta de al menos 1,40 € en diciembre [1]. La guía exige un 4T26 muy fuerte: con 207,7 M en 9M26, el EBITDA del 4T26 tendría que ser de 82-87 M, un 15-22 % más que los 71,8 M del 4T25, tras un 3T26 plano (73,2 M) [1][7]. Para 2030, Beat\'30 sigue en 1.800 M de ingresos y un margen EBITDA del 25-26 % [9].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1325, ebitda: 296.3, ebit: 207.6, bpa: 3.41, dpa: 3.26, fuente: 'MarketScreener, 10 analistas, 22-oct-2026 (antes de los resultados) [4]' },
      { periodo: '2027e', ingresos: 1412, ebitda: 325.6, ebit: 232.2, bpa: 3.77, dpa: 3.36, fuente: 'MarketScreener, 10 analistas, 22-oct-2026 (antes de los resultados) [4]' },
      { periodo: '2028e', ingresos: 1498, ebitda: 355.7, ebit: 257.5, bpa: 4.18, dpa: 3.50, fuente: 'MarketScreener, 10 analistas, 22-oct-2026 (antes de los resultados) [4]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 7, mantener: 3, vender: 0, po_medio: 67.90, po_min: 58.70, po_max: 75.00 },
    revisiones: 'Entre el 6 y el 22 de octubre, antes de los resultados, el consenso ya bajó: EBITDA de 2026 de 300,5 a 296,3 M (−1,4 %), BPA de 3,44 a 3,41 € y de 2027 de 3,80 a 3,77 €; el precio objetivo medio pasó de 69,29 a 67,90 € [4]. En 12 meses el BPA de 2026 ha caído en torno a un 11 % (3,82 € en octubre de 2025). La causa es la divisa y la energía, no el volumen [1]. El 3T26 quedó por debajo de lo esperado en EBITDA (73,2 M frente a 75,8 M de Renta 4) y en ventas comparables (+3,9 % frente a más del 7 %), pero por encima en beneficio neto (+4,1 % frente a +1 %) y en deuda (266,6 M frente a unos 300 M) [1][11]. Con la nueva guía, el EBITDA de 2026 del consenso (296,3 M) queda por encima del techo (295 M): esperamos recortes del 2-3 % en las próximas semanas. Solo MarketScreener da estimaciones completas; recomendaciones y objetivos contrastados con Investing [10]. El beneficio del consenso (156,8 M) sigue por debajo de la guía de 165-170 M [4][1].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },

  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: 1.7, indice_pct: 9.3, sector_pct: 11.2 },
      { periodo: '1 año', accion_pct: 1.1, indice_pct: 19.8, sector_pct: 6.5 },
      { periodo: '3 años (anual.)', accion_pct: -0.1, indice_pct: 28.0, sector_pct: -1.0 },
      { periodo: '5 años (anual.)', accion_pct: -0.8, indice_pct: 16.3, sector_pct: -3.5 },
      { periodo: '10 años (anual.)', accion_pct: 1.1, indice_pct: 7.6, sector_pct: 0.7 },
    ],
    anual: [
      { anio: '2016', accion_pct: -15.8, indice_pct: -2.0 }, { anio: '2017', accion_pct: 17.4, indice_pct: 7.4 },
      { anio: '2018', accion_pct: -12.5, indice_pct: -15.0 }, { anio: '2019', accion_pct: -2.1, indice_pct: 11.8 },
      { anio: '2020', accion_pct: 23.2, indice_pct: -15.5 }, { anio: '2021', accion_pct: -2.0, indice_pct: 7.9 },
      { anio: '2022', accion_pct: 5.8, indice_pct: -5.6 }, { anio: '2023', accion_pct: -11.0, indice_pct: 22.8 },
      { anio: '2024', accion_pct: 13.8, indice_pct: 14.8 }, { anio: '2025', accion_pct: -12.5, indice_pct: 49.3 },
    ],
    beta: 0.25, volatilidad_pct: 15.4, max_drawdown_pct: -23.0, posicion_corta_pct: 3.1,
    comentario: 'La acción lleva tres años plana (53,60 € a cierre de 2023, 61,00 € en 2024, 53,40 € en 2025 y 54,30 € el 22-oct-2026) mientras el IBEX 35 subía un 28 % anual y el sector europeo de alimentación (EXH3) un 11,2 % en 2026 [3]. En 2025 cayó un 12,5 % por el informe de Hunterbrook sobre Danville, la salida de dos institucionales y la erosión del EBITDA por la divisa [7]. En 2026 lo que pesa es el margen: el EBITDA de 9M26 bajó un 4,9 % por divisa y energía y la guía se ha rebajado dos veces (julio y octubre) [1][2]. Beta de 0,25 frente al IBEX (mensual, 5 años; 0,12 semanal a 2 años): se mueve por factores propios [3]. Rentabilidades de precio, sin el ≈ 6 % anual de dividendo; las de 3, 5 y 10 años, a 21-oct. Las posiciones cortas notificadas a la CNMV suman un 3,1 % del capital y suben: AKO Capital 1,24 % (13-oct; 1,14 % en junio), Marble Bar 0,81 % (14-oct), White Creek 0,55 % (21-oct) y PDT 0,50 % (22-jul) [12][13]. Además, Viscofan salió del STOXX Europe 600 el 21-sep, lo que obliga a vender a los fondos indexados [24].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: -2.4, var_3m_pct: -3.6, var_6m_pct: -9.1, var_12m_pct: 0.4, dist_max_52s_pct: -13.5, dist_min_52s_pct: 4.1, dist_max_historico_pct: -21.2, tendencia: 'bajista', volatilidad_60d_pct: 14.0, avisos: [] },
      movimientos_fuertes: [],
      noticias: [
        { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Resultados 9M26 tras el cierre: ingresos +3,1 % (+4,5 % comparable), EBITDA −4,9 % (+1,6 % comparable), neto +2,9 %; guía de EBITDA rebajada de 305-314 M a 290-295 M; ingresos y neto se mantienen; dividendo a cuenta ≥ 1,40 € [1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-20', tipo: 'recomendación', hecho: 'Renta 4 reitera Sobreponderar con objetivo de 72,7 € en su previa del 3T26 [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-04', tipo: 'recomendación', hecho: 'UBS mantiene Comprar con objetivo de 72 € tras el 1S26 [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-29', tipo: 'resultados', hecho: 'Resultados 1S26: EBITDA −7,4 % por divisa; la empresa avisa de que el EBITDA de 2026 quedará en la parte baja de 305-314 M [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-29', tipo: 'accionista de referencia', hecho: 'Posiciones cortas en aumento antes de los resultados: AKO Capital 1,24 % (13-oct, desde 1,14 % en junio), Marble Bar 0,81 % (14-oct), White Creek 0,55 % (21-oct, nueva) y PDT 0,50 % (22-jul); total del 3,1 % [12][13]. Apuestan por una rebaja que ya se ha publicado; si la cierran, la recompra de cortos es un apoyo.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-21', tipo: 'accionista de referencia', hecho: 'Baja del STOXX Europe 600 (y de sus índices de alimentación y consumo básico) en la revisión de septiembre, efectiva el 21-sep, según la lista de cambios de STOXX [24]: venta forzosa de fondos indexados, ya ejecutada. Coincide con la mayor caída de un mes del semestre (−7,6 % a 30-sep) [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-22', tipo: 'directivos', hecho: 'Recompra de acciones en marcha ligada al dividendo flexible: 17,8 M en el 3T26 y 99,7 M en 9M26 [1]; sostiene el precio.', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-02-25',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sigue en tendencia bajista (6 % bajo su media de 200 sesiones, −13,5 % desde el máximo de abril) sin movimientos bruscos: la mayor caída de un mes en seis meses es del 7,6 % y la peor sesión del año, del 3,4 % [3]. La explican el margen y dos flujos vendedores: la baja del STOXX Europe 600 en septiembre y unas posiciones cortas que han subido al 3,1 % [24][12]; la recompra en curso compensa en parte [1]. Los resultados ya están publicados y la rebaja de guía entra en las cifras de este informe; los siguientes, a finales de febrero (fecha estimada por el calendario de 2026). No hay colocaciones, ampliaciones ni operaciones corporativas pendientes. Veredicto: no cambia.',
    },
    confianza: 'Media',
  },

  multiplos_historicos: {
    serie: [
      { anio: '2019', precio_cierre: 47.10, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2020', precio_cierre: 58.05, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2021', precio_cierre: 56.90, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 60.20, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 53.60, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 61.00, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 53.40, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Con el precio de cierre de cada año y el beneficio real del año siguiente, Viscofan cotizó a un PER adelantado de 15,6-20,3x en 2019-2024 (mediana de 5 años de 17,3x con 2025) [3][7]; hoy está a 15,1x nuestro BPA de 2027e, en el mínimo de la serie. El descuento tiene causas: el BPA de 2026 será inferior al de 2025 (3,40 € frente a 3,52 €) por divisa y energía, la guía se ha recortado dos veces este año y el crecimiento del EBITDA de 2020-2025 fue del 4,3 % anual [1][2]. No vemos un cambio estructural que justifique un descuento permanente: el ROIC sigue por encima del 13 % y la cuota en envolturas no se ha erosionado [5][9].',
    confianza: 'Media',
  },

  comparables: {
    criterio: 'No hay comparables puros cotizados: Devro salió de bolsa en 2023, Viskase pertenece en un 93 % a Icahn y Shenguan es pequeña y tiene pérdidas [19][23]. Usamos ocho empresas de ingredientes alimentarios (Kerry, Symrise, Tate & Lyle, Ingredion, Corbion, AAK) y de envases para alimentación (Huhtamäki, Amcor), con clientes, ciclo de costes y exposición a divisa parecidos. Descartamos Darling (los biocombustibles distorsionan su EBITDA) y Sealed Air (en proceso de compra por CD&R desde noviembre de 2025) [20]. Las cifras son las del 6-oct-2026 [18] llevadas al cierre del 22-oct con la variación de precio de cada una [3]; las estimaciones no se han actualizado.',
    empresas: comps,
    comentario: 'Desde el 6 de octubre los comparables de ingredientes han subido con fuerza (Kerry +14,9 %, Symrise +11,5 %, Corbion +12,1 %, Amcor +10,8 %) mientras Viscofan subía un 2,6 % [3]: la mediana del grupo pasa a 8,7x EV/EBITDA NTM y 14,8x PER NTM. Viscofan cotiza a unas 8,9x EBITDA NTM con la nueva guía y a 15,1x nuestro BPA de 2027e, en línea con el grupo. Pero tiene mejores fundamentales: margen EBITDA del 22 % frente a una mediana del 16,7 %, ROIC del 13-16 % frente al 7,5 % y deuda de 1,0x EBITDA frente a 2,0x [1][18]. Por calidad merecería una prima de 1-2 veces EBITDA, como Kerry y Symrise (13,4-13,6x) con menos ROIC. Usaríamos 9-10x EV/EBITDA NTM. Las estimaciones de los comparables son del 6-oct: las subidas de Kerry y Symrise pueden reflejar revisiones que no recogemos.',
    confianza: 'Media',
  },

  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Sealed Air (EE. UU., envases para carne y protección)', comprador: 'CD&R (capital privado)', ev: 9140, ev_ventas: 1.92, ev_ebitda: 10.0, prima_pct: 41, excluir: false, comentario: 'Prima del 41 % sobre el precio sin afectar; múltiplo sobre el EBITDA de los últimos 12 meses (estimación propia) [20].' },
      { fecha: '2024-06', objetivo: 'CP Kelco (EE. UU., texturizantes e hidrocoloides)', comprador: 'Tate & Lyle', ev: 1680, ev_ventas: null, ev_ebitda: 13.7, prima_pct: null, excluir: false, comentario: '10x incluyendo 50 M USD de sinergias; 13,7x sobre el EBITDA ajustado de 2023 (131 M USD), cálculo con [21].' },
      { fecha: '2023-02', objetivo: 'Devro (Reino Unido, envolturas de colágeno)', comprador: 'SARIA', ev: 785, ev_ventas: 2.39, ev_ebitda: 11.3, prima_pct: 71.9, excluir: false, comentario: 'Competidor directo en colágeno; 11,3x EBITDA a junio de 2022; prima del 71,9 % sobre 192 peniques [19].' },
      { fecha: '2022-10', objetivo: 'Gelnex (Brasil, gelatina y colágeno)', comprador: 'Darling Ingredients', ev: 1220, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Gelatina y colágeno con 46.000 t de capacidad; múltiplo no publicado [22].' },
      { fecha: '2024-09', objetivo: 'Brasfibra y Master Couros (Brasil, colágeno bovino; 60 %)', comprador: 'Viscofan', ev: 24, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '14,4 M por el 60 %; valor implícito del 100 % ≈ 24 M (estimación propia) [7].' },
      { fecha: '2025-02', objetivo: 'Pet Mania (Brasil, golosinas para mascotas; 51 %)', comprador: 'Viscofan', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '5,6 M por el 51 % incluida una ampliación de capital [7].' },
    ],
    comentario: 'Las operaciones del sector se han pagado a 10-14 veces EBITDA (mediana de 11,3x), con primas del 41-72 % cuando el objetivo cotizaba [19][20]. La más comparable es Devro (11,3x), el número dos en colágeno, comprada por un industrial alemán [19]. Aplicada al EBITDA de Viscofan es un valor de control, no un precio de mercado. Viscofan es objetivo posible: sin accionista de control (Alba tiene en torno al 14 %), un 79 % de capital flotante y un múltiplo en mínimos de su historia [8]; el capital privado ha mostrado apetito por los envases alimentarios con Sealed Air [20]. No hay señales de proceso y Alba suele ser un accionista estable: por eso las transacciones pesan solo un 10 %.',
    confianza: 'Media',
  },

  dcf: {
    anios: [
      { periodo: '2026e', crecimiento_pct: 3.8, margen_ebitda_pct: 22.2, amortizacion_pct_ventas: 6.6, capex_pct_ventas: 7.7, nwc_pct_ventas: 48.5, tasa_impositiva_pct: 21, fijo: true },
      { periodo: '2027e', crecimiento_pct: 5.5, margen_ebitda_pct: 23.0, amortizacion_pct_ventas: 6.8, capex_pct_ventas: 8.5, nwc_pct_ventas: 48.0, tasa_impositiva_pct: 22, fijo: false },
      { periodo: '2028e', crecimiento_pct: 5.5, margen_ebitda_pct: 23.5, amortizacion_pct_ventas: 6.9, capex_pct_ventas: 8.5, nwc_pct_ventas: 47.0, tasa_impositiva_pct: 22, fijo: false },
      { periodo: '2029e', crecimiento_pct: 5.0, margen_ebitda_pct: 23.8, amortizacion_pct_ventas: 7.0, capex_pct_ventas: 8.0, nwc_pct_ventas: 46.5, tasa_impositiva_pct: 23, fijo: false },
      { periodo: '2030e', crecimiento_pct: 4.5, margen_ebitda_pct: 24.0, amortizacion_pct_ventas: 7.0, capex_pct_ventas: 7.5, nwc_pct_ventas: 46.0, tasa_impositiva_pct: 23, fijo: false },
      { periodo: '2031e', crecimiento_pct: 4.0, margen_ebitda_pct: 24.0, amortizacion_pct_ventas: 7.0, capex_pct_ventas: 7.2, nwc_pct_ventas: 46.0, tasa_impositiva_pct: 23, fijo: false },
      { periodo: '2032e', crecimiento_pct: 3.0, margen_ebitda_pct: 24.0, amortizacion_pct_ventas: 7.0, capex_pct_ventas: 7.0, nwc_pct_ventas: 46.0, tasa_impositiva_pct: 23, fijo: false },
    ],
    wacc: { tasa_libre_pct: 3.44, beta: 0.66, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.1, tasa_impositiva_pct: 25, peso_deuda_pct: 13 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 9.5 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: 'No procede. El ROIC supera al WACC en más de 5 puntos, pero el mercado de envolturas es maduro: crece un 3,4-4 % anual [16][17] y Viscofan ya es el líder en celulósica y colágeno [9]. La proyección explícita llega en 2032 a un crecimiento del 3 %, el del mercado; alargar el crecimiento supondría dar por hecho Beat\'30 entero, que no damos.' },
    mitad_de_anio: true,
    justificacion: {
      crecimiento: 'Para 2026 proyectamos 1.300 M (+3,8 %), por debajo de la guía de 1.310-1.340 M que la empresa mantiene [1]: con 965,4 M en 9M26, llegar a 1.310 M pide un 4T26 de 345 M, un 9 % más que el 4T25, y el 3T26 creció un 5,5 % [1][7]. Lo fijamos porque ya hay tres trimestres publicados. Para 2027-2028, +5,5 % anual (consenso: +6,6 % y +6,1 %) [4], con las subidas de precio de mayo-junio y volumen al ritmo del mercado; convergencia al 3 % en 2032. El medio (4,5 %) queda por debajo del TCAC de 2020-2025 (6,5 %) y del 7,5 % que implican los 1.800 M de Beat\'30 [9].',
      margenes: 'Margen EBITDA del 22,2 % en 2026 (288,6 M), por debajo de la nueva guía de 290-295 M: el 4T26 tendría que dar 82-87 M frente a 73,2 M en el 3T26 y con más de 5 M de coste de coberturas energéticas [1]. Sube al 23,0 % en 2027 (consenso 23,1 %) [4], al 23,5 % en 2028 y al 24 % desde 2030, la media de 2020-2025 (23,4 %, con un mínimo del 21,9 %) y 1-2 puntos por debajo del 25-26 % de Beat\'30 [9]. La recuperación descansa en precios ya aplicados (margen bruto del 65,5 % en el 3T26, +0,3 pp) y en los ahorros de Chequia y Nueva Jersey [1][9].',
      inversion: 'Capex del 7,7 % de las ventas en 2026 (100 M de guía; 54,2 M en 9M26) y del 8,5 % en 2027-2028 por la planta de České Budějovice (en marcha en 2028), en línea con los 120 M anuales de Beat\'30 [1][9]; baja al 7,0 % en 2032, igual que la amortización. El circulante empeora: existencias + clientes − proveedores suman 646 M a septiembre, un 50,5 % de las ventas de 12 meses, frente al 48,1 % de diciembre [1]. Partimos del 48,5 % a cierre de 2026 y convergemos al 46 %. Tipo impositivo del 21 % en 2026 (20,2 % en 9M26) [1], del 22 % en 2027-2028 y del 23 % normalizado después.',
      wacc: 'Tasa libre del 3,44 %, el **Bund alemán a 10 años** del 22-oct-2026 [6] (el informe anterior usaba por error el bono español al 4,08 %; el método pide el Bund para flujos en euros). Beta de 0,66: la de regresión (0,25 mensual frente al IBEX) no sirve [3]; media de las desapalancadas de alimentación (0,47) y envases (0,75) de Damodaran [14], reapalancada al 13 % de deuda. Prima de mercado del 5,5 % y prima adicional del 1 % por la producción y venta en emergentes (Sudamérica y Asia-Pacífico suman el 29,5 % de las ventas por origen de 9M26) [1]. Coste de la deuda del 4,1 % (gastos financieros anualizados de 9M26 sobre la deuda bancaria media) [1].',
      terminal: 'Crecimiento a perpetuidad del 2,0 %: entre la inflación esperada del euro (≈ 2 %) y la tasa libre menos medio punto (2,94 %), y por debajo del 3,4 % del mercado de envolturas [16]. El múltiplo de salida implícito en Gordon debe compararse con la mediana histórica de Viscofan (≈ 10x) y de las transacciones (11,3x) [19]; usamos 9,5x en el método del múltiplo, la parte baja de su historia y algo por encima de los comparables (8,7x NTM).',
    },
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: -0.7, comentario: 'Comparable de 9M26 +4,5 % (volumen y precio, sin desglose público), divisa −1,6 pp y perímetro +0,2 pp [1]; subidas de precio adicionales en mayo-junio [1]; el 4T26 recupera divisa (dólar). Reparto entre volumen y precio, estimación propia.' },
        { periodo: '2027e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.0, comentario: 'Volumen cerca de su media histórica del 4 % [17] y efecto anual completo de las subidas de 2026 [1]; divisa neutral. Consenso: +6,6 % [4].' },
        { periodo: '2028e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Volumen como el mercado más nueva capacidad de colágeno (Nueva Jersey) y celulósica (Zacapu) [1]; otros: Health y Pet Treats, que crecen desde una base pequeña (21,8 M en 9M26) [1].' },
        { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.0, comentario: 'Volumen hacia el 3,4-4 % del mercado [16][17] más la planta checa; precio en línea con la inflación.' },
      ],
      mercado_final: null,
      veredicto: 'Sí',
      justificacion: 'Sí: el caso base pide poco. El 4,5 % anual queda por debajo del 6,5 % de 2020-2025 y sale de volumen al ritmo del mercado (3,4-4 %) [16][17] más un 1,5-2,5 % de precio, que Viscofan repercute con dos o tres trimestres de retraso: lo ha vuelto a hacer en 2026 (margen bruto del 3T26 estable pese a la energía) [1]. La reinversión, al ROIC actual, financia el volumen; el precio no pide capital. La cuota en envolturas subiría poco (prueba a mano: el mercado de la sección de sector es de envolturas y las ventas incluyen energía, Health y Pet Treats). La duda es el margen, no el crecimiento.',
    },
    lectura: 'El cambio frente al informe del 6-oct tiene dos signos. A la baja, el margen: 2026 queda en 288,6 M de EBITDA (antes 300 M) y la recuperación al 24 % se retrasa un año, lo que recorta el flujo de 2026-2029. Al alza, la tasa: con el Bund al 3,44 % en lugar del bono español al 4,08 %, el coste del capital baja unos 0,6 puntos, y eso pesa más que el recorte de margen porque el valor terminal supone en torno a tres cuartas partes del total. El DCF inverso del motor dirá qué margen terminal descuenta el precio de 54,30 €; con el informe anterior era un 22,9 %, por debajo de cualquier ejercicio cerrado de 2020-2025. Nuestra proyección queda un 2-4 % por debajo del EBITDA del consenso en 2026-2028: la diferencia con el precio no viene de supuestos agresivos.',
    confianza: 'Media',
  },

  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 340.4, arrendamientos: 11.9, caja: 73.8, minoritarios: 4.9, pensiones: 11.2, asociadas: 0, otros_ajustes: 24.1 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, prima implícita mensual, octubre de 2026 [15]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 10, suma_partes: 0, escenarios: 30 },
    comentario: 'Mantenemos los pesos: 40 % al DCF porque Viscofan es un negocio estable, con caja predecible y una guía a cinco años; 30 % a los escenarios para recoger el riesgo de margen, que es el que se ha materializado este año; 20 % a los comparables, imperfectos (ingredientes y envases con peor ROIC); y 10 % a las transacciones, porque no hay accionista de control ni proceso de venta. El puente pasa a septiembre de 2026: deuda bancaria de 340,4 M y caja de 73,8 M (deuda bancaria neta de 266,6 M, 16,7 M menos que en junio) [1]. Los precios objetivo de los analistas (58,70-75,00 €, media 67,90 €) [10][4] quedan por encima de casi todos nuestros métodos; con la tasa libre corregida al Bund la distancia se estrecha.',
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.25, multiplo: null, precio: null, justificacion: 'La energía y la divisa no remiten: crecimiento del 3,5 % anual en 2027-2028 y margen EBITDA del 21,0-21,5 %, como en 2022-2023. Ventas de 1.393 M y EBITDA de 299 M en 2028; neto de 147 M con 45,29 M de acciones (estimación propia).' },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 3.91, multiplo: null, precio: null, justificacion: 'Las subidas de precio de 2026 recuperan el margen al 23,5 % en 2028 y el volumen crece al ritmo del mercado: ventas de 1.447 M, EBITDA de 340 M, financiero de −12 M, impuestos del 22 % y neto de 177 M (estimación propia; cuadra con el BPA de 3,52 € de 2025).' },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 4.30, multiplo: null, precio: null, justificacion: 'Beat\'30 en marcha: crecimiento del 7 % anual con la nueva capacidad de colágeno y celulósica y margen del 24,0-24,5 % por ahorros y precio. Ventas de 1.488 M, EBITDA de 365 M y neto de 195 M en 2028 (estimación propia).' },
      ],
      per_historico: { base: 'adelantado', actual: 15.1, mediana_5a: 17.3, minimo_5a: 15.6, media_larga: 18.4, excluidos: 'Ninguno. PER adelantado = cierre de cada año ÷ BPA real del año siguiente [3][7]: 2018 21,2x (48,12/2,27); 2019 17,9x (47,10/2,63); 2020 20,3x (58,05/2,86); 2021 19,0x (56,90/3,00); 2022 19,8x (60,20/3,04); 2023 15,6x (53,60/3,44); 2024 17,3x (61,00/3,52); 2025 15,7x (53,40/3,40, nuestro BPA de 2026e). Últimos 5 (2021-2025): mediana 17,3x, mínimo 15,6x; media larga de 8 años 18,4x. Actual: 54,30/3,59 (nuestro BPA de 2027e) = 15,1x. Sin años de pérdidas ni atípicos.' },
      comparables_per: { mediana: 14.8 },
      consenso: { bpa_ano1: 3.77, bpa_ano2: 4.18, objetivo_medio: 67.90, objetivo_min: 58.70, objetivo_max: 75.00, analistas: 10, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA 2027e y 2028e, objetivo medio) e Investing (mínimo, máximo y recomendaciones), 22-oct-2026, antes de los resultados [4][10]' },
      diferencia_consenso: 'Nuestro BPA de 2028e (3,91 €) queda un 6,5 % por debajo del consenso (4,18 €), que es anterior a la rebaja de guía. La diferencia está en el margen (23,5 % frente al 23,7 % del consenso), en las ventas (1.447 M frente a 1.498 M, porque partimos de 1.300 M en 2026 y no de 1.325 M) y en el tipo impositivo (22 %). Nuestro precio base con la regla del motor (en torno a 16x por 3,91 €, unos 63 €) queda un 7 % por debajo del objetivo medio de los analistas (67,90 €), dentro de nuestro rango.',
      media: null,
      comentario: 'El objetivo a 12 meses supera al valor intrínseco porque la regla lleva el PER desde 15,1x hacia su mediana de 17,3x. Para cerrar la distancia hace falta que el 4T26 confirme la guía (un EBITDA de 82-87 M) y que 2027 recupere el margen del 23 %; el catalizador con fecha son los resultados anuales de finales de febrero de 2027. La recompra (hasta 40 M en el programa ligado al dividendo flexible) y un dividendo de ≈ 6 % sostienen la rentabilidad mientras tanto.',
    },
    notas_integrador: 'Puente a 30-sep-2026 [1]: deuda financiera = deudas con entidades de crédito no corrientes 68,064 + corrientes 272,374 = 340,4 M. Otros pasivos financieros 22,215 + 13,740 = 35,96 M: arrendamientos 11,9 M (último desglose, jun-26) y el resto, 24,1 M, a otros_ajustes (préstamos CDTI, proveedores de inmovilizado, pendiente de Brasfibra). Pensiones 11,2 M (neto de impuestos, dic-25, del informe anterior). Minoritarios 4,9 M a valor contable. Caja 73,8 M (sin los 1,1 M de otros activos financieros corrientes). Acciones 45,29 M = 46,000 M emitidas − autocartera estimada de 0,712 M a 30-sep (396.357 a 30-jun [2] + 17,8 M de recompra del 3T26 [1] ÷ 56,20 € de precio medio del trimestre [3] ≈ 316.000); el coste de la autocartera subió de 19,4 M a 37,1 M [1][2]. Stock Analysis aún da 45,60 M (30-jun) [5]. La media de objetivo_12m y la lectura del DCF necesitan las cifras del motor: revisar tras calcular. Escenarios: los BPA de bajista y alcista usan los desplazamientos del informe anterior (−2/−2 y +1,5/+1 pp); si cambian, recalcular.',
    confianza: 'Media',
  },
  fuentes,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones posteriores a los resultados de 9M26', tipo: 'Complemento', intentos: '1) MarketScreener el 22-oct a las 17:35: estimaciones anteriores a la publicación; 2) Investing: sin estimaciones; 3) búsqueda de prensa del 23-oct: sin revisiones de analistas publicadas aún', decision: 'Omitido' },
  ],
};

if (reaccion) {
  D.bolsa.contexto.noticias.unshift(reaccion.noticia);
  D.bolsa.contexto.comentario = reaccion.comentario || D.bolsa.contexto.comentario;
}
D._estado = process.argv[2] === 'fin' ? 'terminado' : 'en curso';
writeFileSync(join(aqui, 'D.json'), JSON.stringify(D, null, 2));
console.log('D.json escrito', D._estado);
