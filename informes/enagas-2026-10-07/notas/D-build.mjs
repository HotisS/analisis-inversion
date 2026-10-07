// Subagente D: construye D.json (solo hechos) y rab_comparables.json. Detalle de cálculo de comparables en D-comp.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const J = f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const tr = J('bolsa-tr-0610.json');   // total, sesiones cerradas hasta 5-oct-2026
const pr = J('bolsa-0610.json');      // precio, beta frente al ^IBEX
const comp = J('D-comp.json');
const MS = 'https://www.marketscreener.com/quote/stock/';

const fuentes = [
  { id: 1, titulo: 'Interim Condensed Consolidated Financial Statements, period ended June 30, 2026', editor: 'Enagás', tipo: 'Primaria', fecha: '2026-07-22', url: 'https://www.enagas.es/content/dam/enagas/es/ficheros/accionistas-e-inversores/informacion-economico-financiera/renta-fija/EN_Estados%20Financieros%20Consolidados%20Primer%20Semestre%202026.pdf' },
  { id: 2, titulo: 'Históricos diarios ENG.MC, ^IBEX, XESP.DE (Xtrackers MSCI Spain 1C) y EXH9.DE (iShares STOXX Europe 600 Utilities)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-05', url: 'https://finance.yahoo.com/quote/ENG.MC/history/' },
  { id: 3, titulo: 'Enagás, S.A.: Financial Data, Forecasts, Estimates and Expectations (y Valuation)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'ENAG-S-S-A-409361/finances/' },
  { id: 4, titulo: 'Enagás, S.A.: Target Price Consensus and Analysts Recommendations', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'ENAG-S-S-A-409361/consensus/' },
  { id: 5, titulo: 'Investor calendar', editor: 'Enagás', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://www.enagas.es/en/investor-relations/share-performance/investor-calendar/' },
  { id: 6, titulo: '1H 2026 Results presentation', editor: 'Enagás', tipo: 'Primaria', fecha: '2026-07-22', url: 'https://www.enagas.es/content/dam/enagas/en/files/accionistas-e-inversores/informacion-economico-financiera/informes-resultados-presentaciones/presentaciones-para-inversores/2026/Presentaci%C3%B3nResultados1S2026_EN.pdf' },
  { id: 7, titulo: 'La CNMC aprueba las circulares de retribución del gas natural 2027-2032 (nota de prensa)', editor: 'CNMC', tipo: 'Primaria', fecha: '2026-09-18', url: 'https://www.cnmc.es/prensa/circulares-gas-20260918' },
  { id: 8, titulo: 'Memoria de la Circular de tasa de retribución financiera del gas 2027-2032 (CIR/DE/002/25)', editor: 'CNMC', tipo: 'Primaria', fecha: '2026-09', url: 'https://www.cnmc.es/sites/default/files/6798830.pdf' },
  { id: 9, titulo: 'Enagas (ENAG) Consensus Estimates', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.investing.com/equities/enagas-consensus-estimates' },
  { id: 10, titulo: 'Results 1H 2026 (nota CNMV)', editor: 'Enagás', tipo: 'Primaria', fecha: '2026-07-22', url: 'https://www.enagas.es/content/dam/enagas/en/files/accionistas-e-inversores/informacion-economico-financiera/informes-resultados-presentaciones/presentaciones-para-inversores/2026/NotaCNMVResultados1S2026_EN.pdf' },
  { id: 11, titulo: 'Spain 10-Year Government Bond Yield', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://tradingeconomics.com/spain/government-bond-yield' },
  { id: 12, titulo: 'Spain 10-Year Bond Yield', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.investing.com/rates-bonds/spain-10-year-bond-yield' },
  { id: 13, titulo: 'Snam S.p.A.: Financial Data / Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'SNAM-S-P-A-95732/finances/' },
  { id: 14, titulo: 'Italgas S.p.A.: Financial Data / Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'ITALGAS-S-P-A-124599045/finances/' },
  { id: 15, titulo: 'Terna S.p.A.: Financial Data / Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'TERNA-S-P-A-135034/finances/' },
  { id: 16, titulo: 'Redeia Corporación S.A.: Financial Data / Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'REDEIA-CORPORACION-S-A-29688106/finances/' },
  { id: 17, titulo: 'Elia Group NV/SA: Financial Data / Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'ELIA-GROUP-NV-SA-5989/finances/' },
  { id: 18, titulo: 'National Grid plc: Financial Data / Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'NATIONAL-GRID-PLC-34973324/finances/' },
  { id: 19, titulo: 'Naturgy Energy Group S.A.: Financial Data / Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: MS + 'NATURGY-ENERGY-GROUP-S-A-74206/finances/' },
  { id: 20, titulo: 'Euro foreign exchange reference rates (GBP: 0,84880 el 6-oct-2026; 0,8338 el 25-mar-2022)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 21, titulo: '2026-2030 Strategic Plan (FY2025 results)', editor: 'Snam', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://www.snam.it/content/dam/snam/pages-attachments-search/it/documenti/presentazioni/2026/2026-2030_Strategic_Plan.pdf' },
  { id: 22, titulo: 'Italgas: consolidated results as at 31 December 2025 approved', editor: 'Italgas', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.italgas.it/en/press-releases-price-sensitive/italgas-consolidated-results-as-at-31-december-2025-approved/' },
  { id: 23, titulo: 'Strategic Plan 2026-2029', editor: 'Redeia', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.redeia.com/sites/default/files/2026-02/strategic-plan-redeia-2026-2029.pdf' },
  { id: 24, titulo: 'Full-year results 2025 (press release)', editor: 'Elia Group', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://investor.eliagroup.eu/-/media/project/elia/shared/documents/press-releases/2026/elia-group-q4-2025-press-release_en.pdf' },
  { id: 25, titulo: 'Full Year Results 2025/26 (statement)', editor: 'National Grid', tipo: 'Primaria', fecha: '2026-05', url: 'https://www.nationalgrid.com/document/576631/download' },
  { id: 26, titulo: 'Documento informativo ex art. 71 – Acquisizione di 2i Rete Gas', editor: 'Italgas', tipo: 'Primaria', fecha: '2025-04', url: 'https://www.italgas.it/wp-content/uploads/sites/2/2025/04/Documento-Informativo-ex-art.-71-%E2%80%93-Acquisizione-di-2i-Rete-Gas.pdf' },
  { id: 27, titulo: 'Sale of majority interest in NGGT and Metering', editor: 'National Grid', tipo: 'Primaria', fecha: '2022-03-27', url: 'https://www.nationalgrid.com/gt-announcement' },
  { id: 28, titulo: 'Snam FY 2024 Financial Results (press release)', editor: 'Snam', tipo: 'Primaria', fecha: '2025-03', url: 'https://www.snam.it/content/dam/snam/news-assets/comunicati-stampa/en/2025/PR%20-%20Snam%20FY%202024%20Financial%20Results.pdf' },
];

const fuenteDe = { snam: 13, italgas: 14, terna: 15, redeia: 16, elia: 17, ng: 18, naturgy: 19 };
const empresas = comp.filter(c => c.ticker !== 'ENG.MC').map(c => ({
  nombre: c.nombre, ticker: c.ticker, pais: c.pais, capitalizacion: c.capitalizacion, ev_ventas: c.ev_ventas,
  ev_ebitda_ltm: c.ev_ebitda_ltm, ev_ebitda_ntm: c.ev_ebitda_ntm, per_ntm: c.per_ntm, crecimiento_pct: c.crecimiento_pct,
  margen_ebitda_pct: c.margen_ebitda_pct, roic_pct: null, dn_ebitda: c.dn_ebitda, fcf_yield_pct: c.fcf_yield_pct,
}));
const ev = t => comp.find(c => c.ticker === t).ev_meur;

const rabComp = [
  { nombre: 'Snam', rab_meur: 26200, fecha_rab: '2025-12-31', ev_meur: ev('SRG.MI'), fuente_url: fuentes[20].url, nota: 'Tariff RAB italiana (transporte, almacenamiento, GNL) 26,2 bn€; con participadas internacionales a prorrata ~31 bn€. El EV (cap. + deuda neta FY25 de MarketScreener) incluye el valor de esas participadas: el EV/RAB sale inflado.' },
  { nombre: 'Italgas', rab_meur: 15700, fecha_rab: '2025-12-31', ev_meur: ev('IG.MI'), fuente_url: fuentes[21].url, nota: 'RAB consolidada (incluye 2i Rete Gas desde abr-2025 y Grecia/agua).' },
  { nombre: 'Terna', rab_meur: null, fecha_rab: null, ev_meur: ev('TRN.MI'), fuente_url: null, nota: 'No publicada en la presentación ni en la nota de resultados FY2025 (hueco).' },
  { nombre: 'Redeia', rab_meur: 8900, fecha_rab: '2025-12-31', ev_meur: ev('RED.MC'), fuente_url: fuentes[22].url, nota: 'RAB de transporte en España + Salto de Chira al cierre de 2025 (sin 2.100 M de obra en curso). El EV incluye Hispasat, telecomunicaciones e internacional, que no son RAB.' },
  { nombre: 'Elia Group', rab_meur: 22600, fecha_rab: '2025-12-31', ev_meur: ev('ELI.BR'), fuente_url: fuentes[23].url, nota: 'Suma de la RAB al 100 % de Elia Transmission (7,8 bn€) y 50Hertz (14,8 bn€); Elia tiene el 80 % de 50Hertz y el EV de MarketScreener no suma minoritarios: EV/RAB infravalorado.' },
  { nombre: 'National Grid', rab_meur: Math.round(66438 / 0.8488), fecha_rab: '2026-03-31', ev_meur: ev('NG.L'), fuente_url: fuentes[24].url, nota: 'Total Group RAV and rate base 66.438 M£ (RAV del Reino Unido 36.986 + rate base de EE. UU. 29.452 a tipo constante), convertido a 0,84880 £/€ (BCE, 6-oct-2026).' },
  { nombre: 'Naturgy', rab_meur: null, fecha_rab: null, ev_meur: ev('NTGY.MC'), fuente_url: null, nota: 'No regulada pura: no se calcula EV/RAB (contraste).' },
].map(r => ({ ...r, ev_rab: r.rab_meur ? Math.round(r.ev_meur / r.rab_meur * 100) / 100 : null }));

const rabTrans = [
  { nombre: 'Teréga (31,5 %) – Enagás compra a GIC', fecha: '2026-04', ev_meur: null, precio_participacion_meur: 573, ev_rab: 1.075, ev_rab_texto: '1,07x-1,08x EV/RAB (2025), cifra final sujeta a la inflación definitiva', fuente_url: fuentes[5].url },
  { nombre: 'Saggas (20 %) – Enagás compra a Osaka Gas', fecha: '2026-07', ev_meur: null, precio_participacion_meur: 31, ev_rab: 1.07, ev_rab_texto: '1,07x EV/RAB (2025), RAB neta con los componentes de las circulares 2027-2032 en borrador', fuente_url: fuentes[5].url },
  { nombre: '2i Rete Gas (99,94 %) – Italgas compra a F2i y Finavias', fecha: '2024-10', ev_meur: 5306, precio_participacion_meur: 2060, ev_rab: null, ev_rab_texto: 'RAB de 2i Rete Gas no publicada en el documento informativo', fuente_url: fuentes[25].url },
  { nombre: 'National Gas Transmission y Metering (60 %) – Macquarie y BCI compran a National Grid', fecha: '2022-03', ev_meur: Math.round(9600 / 0.8338), precio_participacion_meur: null, ev_rab: null, ev_rab_texto: 'Múltiplo sobre RAV no publicado en el anuncio', fuente_url: fuentes[26].url },
  { nombre: 'Edison Stoccaggio (100 %) – Snam compra a Edison', fecha: '2024-07', ev_meur: 565, precio_participacion_meur: 565, ev_rab: null, ev_rab_texto: 'RAB no publicada en la nota de Snam leída', fuente_url: fuentes[27].url },
];
fs.writeFileSync(path.join(dir, 'rab_comparables.json'), JSON.stringify({ fecha_corte: '2026-10-07', criterio_ev: 'EV = capitalización actual de MarketScreener + deuda neta del último ejercicio cerrado (MarketScreener), en millones de EUR; NG convertido a 0,84880 GBP/EUR (BCE 6-oct-2026).', comparables: rabComp, transacciones: rabTrans }, null, 2));

const b = tr.bolsa;
const D = {
  identificacion: {
    nombre: 'Enagás, S.A.', nombre_corto: 'Enagás', ticker: 'ENG', isin: 'ES0130960018', mercado: 'BME (Mercado Continuo)', indice_referencia: 'IBEX 35',
    pais: 'España', pais_iso: 'ES', sector: 'Utilities', industria: 'Gas Utilities', sede: 'Paseo de los Olmos 19, 28005 Madrid', fundacion: '1972', empleados: 1408, web: 'www.enagas.es',
    precio: 16.22, fecha_precio: '2026-10-06',
    acciones: 260.298,
    capitalizacion_publicada: 4222,
    free_float_pct: 89.4,
    max_52s: tr.identificacion.max_52s, min_52s: tr.identificacion.min_52s,
    volumen_medio_diario: '≈ 10,7 M EUR/día (3 meses; 635.095 acciones/día)',
    proximos_resultados: null,
  },
  consenso: {
    guidance: 'Objetivos 2026 reafirmados con los resultados del 1S26 (22-jul-2026): EBITDA de unos 620 M€ y beneficio después de impuestos recurrente de unos 235 M€ [10]. En el 1S26 el EBITDA fue de 314 M€ y el beneficio neto de 126,9 M€ (118,6 M€ recurrente) [10]. Dividendo de 1 € por acción con cargo a 2025 [10]. La retribución regulada 2027-2032 sube la TRF de transporte y regasificación del 5,44 % al 6,46 % (circulares aprobadas por la CNMC el 18-sep-2026) [7, 8]. La agenda del inversor aún no fija la fecha de los resultados de 9M26 [5].',
    estimaciones: [
      { periodo: '2026e', ingresos: 832.2, ebitda: 625.8, ebit: 331.5, bpa: 0.94, dpa: 1.00, fuente: 'MarketScreener [3]' },
      { periodo: '2027e', ingresos: 906.7, ebitda: 724.2, ebit: 420.9, bpa: 1.15, dpa: 1.00, fuente: 'MarketScreener [3]' },
      { periodo: '2028e', ingresos: 898.9, ebitda: 712.5, ebit: 413.6, bpa: 1.12, dpa: 1.00, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: 8, mantener: 6, vender: 5, po_medio: 17.05, po_min: 13.00, po_max: 19.80 },
    revisiones: 'Consenso medio de MarketScreener: «Outperform», 19 analistas, precio objetivo medio de 17,05 €, máximo 19,80 € y mínimo 13,00 € [4]. Investing da la misma muestra (19 analistas: 8 comprar, 6 mantener, 5 vender) y el mismo objetivo medio (17,049 €), con UBS en mantener a 16,80 € (mayo de 2026), Deutsche Bank a 17,00 € (abril) y Citi en vender a 14,10 € (marzo) [9]. Solo MarketScreener publica gratis estimaciones completas a tres años; Investing se usa para contrastar recomendaciones y precio objetivo. No se ha obtenido la variación de las estimaciones a 3 y 12 meses.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual,
    beta: pr.bolsa.beta, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'Hechos: rentabilidad total con cierres ajustados de Yahoo hasta el 5-oct-2026, última sesión completa disponible (Yahoo no tiene el cierre del 6-oct y la sesión del 7-oct estaba abierta) [2]. Como el ^IBEX de Yahoo es solo de precio, el «índice» es el ETF de acumulación Xtrackers MSCI Spain 1C y el «sector», el iShares STOXX Europe 600 Utilities [2]. Beta de 5 años mensual frente al IBEX 35 (precio): 0,35; frente al MSCI Spain (total): 0,33 [2]. Caída máxima de 5 años: −31,4 % entre el 25-may-2022 y el 13-oct-2022 [2]. En 2024 la acción perdió un 14 % con dividendos (−22,8 % de precio) frente al +14,6 % del índice, el año de la minusvalía de Tallgrass y del recorte del dividendo de 1,74 € a 1 € [2, 3].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: pr.cierres_ejercicio.filter(c => +c.anio >= 2017).map(c => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Hechos: precio de cierre del último día hábil de cada ejercicio, sin ajustar por dividendos [2]. En 2024 el beneficio neto fue negativo (−299,3 M€, minusvalía de Tallgrass) [3]: el PER de ese año no es comparable. MarketScreener da EV/EBITDA a cierre de cada ejercicio de 10,7x (2021), 9,4x (2022), 9,4x (2023), 8,4x (2024) y 8,7x (2025), con su propia deuda neta [3].',
    confianza: 'Alta',
  },
  comparables: {
    criterio: null,
    empresas,
    comentario: 'Hechos y método: todas las cifras de MarketScreener a 7-oct-2026 [13-19], mismo proveedor para los últimos y los próximos 12 meses. Valor empresa = capitalización actual + deuda neta del último ejercicio cerrado de MarketScreener (dic-2025; National Grid, mar-2026), sin minoritarios ni asociadas. LTM = ejercicio 2025 + 1S26 − 1S25 cuando MarketScreener da el semestre (Snam, Italgas, Terna, Redeia, Naturgy); Elia y National Grid, último ejercicio. NTM = 23 % de 2026e + 77 % de 2027e (National Grid: 48 % FY03/27 + 52 % FY03/28). FCF yield = FCF del último ejercicio / capitalización. National Grid convertido a 0,84880 £/€ (BCE, 6-oct-2026) [20]. ROIC no disponible gratis con criterio homogéneo. Elia: el EBITDA salta de 1.782 M€ (2025) a 2.779 M€ en NTM por su plan de inversión y la consolidación de 50Hertz en las estimaciones: el salto LTM-NTM no es solo crecimiento. EV/RAB de cada comparable en rab_comparables.json: Snam 1,38x, Italgas 1,21x, Redeia 1,51x, Elia 1,17x, National Grid 1,53x [21-25].',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-04', objetivo: 'Teréga (31,5 %), transporte y almacenamiento de gas en el suroeste de Francia', comprador: 'Enagás (a GIC)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, comentario: 'Precio de 573 M€ por el 31,5 %; Enagás publica un múltiplo de 1,07x-1,08x EV/RAB (2025), sujeto a la inflación definitiva; cierre previsto en el 3T26 [6].' },
      { fecha: '2026-07', objetivo: 'Saggas (20 %), planta de regasificación de Sagunto', comprador: 'Enagás (a Osaka Gas)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, comentario: 'Precio de 31 M€ por el 20 %; 1,07x EV/RAB (2025) con la RAB neta de las circulares 2027-2032; Enagás pasa al 92,5 % y la consolida por integración global; cierre antes de fin de 2026 [6].' },
      { fecha: '2024-10', objetivo: '2i Rete Gas (99,94 %), distribución de gas en Italia', comprador: 'Italgas (a F2i y Finavias)', ev: 5306, ev_ventas: 6.50, ev_ebitda: 9.7, prima_pct: null, comentario: 'EV de 5.306 M€ a 31-dic-2023 (equity 2.060 M€ + deuda neta y otros pasivos 3.246 M€); cierre el 1-abr-2025 [26]. Múltiplos calculados con las cifras de 2023 del propio documento (ingresos sin IFRIC 12 816,1 M€; EBITDA 547,4 M€) [26].' },
      { fecha: '2022-03', objetivo: 'National Gas Transmission y Metering (60 %), transporte de gas en Reino Unido', comprador: 'Macquarie Asset Management y BCI (a National Grid)', ev: Math.round(9600 / 0.8338), ev_ventas: null, ev_ebitda: null, prima_pct: null, comentario: 'EV de unos 9.600 M£ para el 100 % según National Grid, convertido a 0,8338 £/€ (BCE, 25-mar-2022); 2.200 M£ en caja por el 60 % [27, 20]. Múltiplos no publicados en el anuncio.' },
      { fecha: '2024-07', objetivo: 'Edison Stoccaggio (100 %), almacenamiento de gas en Italia', comprador: 'Snam (a Edison)', ev: 565, ev_ventas: null, ev_ebitda: null, prima_pct: null, comentario: 'Cerrada por unos 565 M€ con ajustes y ticking fee [28]. Múltiplos no publicados en la nota leída.' },
    ],
    comentario: 'Hechos: los dos múltiplos sobre RAB publicados por la propia Enagás en 2026 (Teréga y Saggas) están en 1,07x-1,08x [6]. Solo 2i Rete Gas tiene EV/EBITDA calculable con la nota oficial (9,7x 2023) [26]. Restricción de propiedad: nadie puede tener más del 5 % de Enagás ni votar más del 3 % (1 % si opera en el sector gasista), salvo el sector público (SEPI 5 %) [1].',
    confianza: 'Media',
  },
  dcf: { wacc: { tasa_libre_pct: 4.14, beta: pr.bolsa.beta } },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 2656.2, arrendamientos: 366.7, caja: 718.1, minoritarios: 15.8, pensiones: 0, asociadas: 1102.6, otros_ajustes: 0 },
    rab: null,
    comentario: 'Hechos del puente (balance consolidado a 30-jun-2026) [1]: deuda financiera bruta 3.022,958 M€ = entidades de crédito 298,504 + obligaciones 2.356,939 + préstamos de organismos 0,799 + arrendamientos NIIF 16 366,716; caja 718,127; deuda neta publicada 2.304,831 M€ (2.475,098 a dic-2025). Minoritarios a valor contable 15,764 M€. Asociadas por el método de la participación 1.102,640 M€ a valor contable. Pensiones: plan de aportación definida, sin déficit en balance. Fuera del puente y relevantes: la cuenta a cobrar por GSP (Perú) dentro de otros activos financieros no corrientes (626,0 M€ en total); activos mantenidos para la venta 17,5 M€; y las compras posteriores al 30-jun del 31,5 % de Teréga (573 M€, cierre previsto en 3T26) y del 20 % de Saggas (31 M€, pasa a integración global) [6]. RAB de Enagás: no publicada en las presentaciones ni en las cuentas (ver huecos). Tasa libre: 4,14 % (Trading Economics, 7-oct-2026; Investing 4,126 % intradía, cierre anterior 4,078 %) [11, 12]. TRF 2027-2032: 6,46 % [7].',
  },
  fuentes,
  huecos: [
    { seccion: 'valoracion', campo: 'rab (base de activos regulada de Enagás)', tipo: 'Núcleo', intentos: '1) Presentaciones de resultados 1S26 y FY2025, nota de resultados 1S26 y cuentas 1S26 y 2025 de Enagás: no publican la RAB en cifra (solo la TRF y los múltiplos EV/RAB de Teréga y Saggas); 2) búsqueda web «Enagás regulated asset base 2025» y memorias de la CNMC de las circulares 2027-2032: la CNMC da el impacto del cambio de TRF sobre la «RAB neta a 31-dic-2024» de todo el sector (31,3 M€ al año por +1,02 puntos, es decir ≈ 3.070 M€ de transporte y regasificación del sistema, incluidas otras empresas y sin almacenamientos); 3) derivarla de esa cifra exigiría la cuota de Enagás en la RAB del sistema y la RAB de los almacenamientos (regulados por el MITECO), que no están publicadas', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'proximos_resultados (9M26)', tipo: 'Complemento', intentos: '1) Agenda del inversor de Enagás: el último evento listado es el 1S26 del 22-jul-2026, sin fecha para el 3T; 2) calendario de MarketScreener: «No events available»; 3) búsqueda en prensa: el «24 de octubre» que aparece es el de 2023 (en 2026 cae en sábado). Los 3T de 2020-2025 se presentaron entre el 20 y el 26 de octubre', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'RAB de Terna (para EV/RAB)', tipo: 'Complemento', intentos: '1) Presentación de resultados FY2025 de Terna: sin cifra de RAB; 2) nota de resultados a 31-dic-2025: solo menciona el crecimiento de la RAB; 3) informe de segunda opinión del bono verde (S&P): texto no legible', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'roic_pct de los comparables', tipo: 'Complemento', intentos: '1) MarketScreener: solo ROE y ROA; 2) no se ha intentado Stock Analysis por presupuesto; 3) no derivado', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) No buscado en el registro de posiciones cortas de la CNMV por presupuesto de tiempo', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'Tallgrass (Enagás a Blackstone, 2025), GNL Quintero (2023), Open Grid Europe (Snam, 2025, terminada en nov-2025), Nortegas, Redexis, Madrileña Red de Gas, Gas Networks Ireland', tipo: 'Complemento', intentos: '1) No buscadas las notas oficiales por presupuesto de tiempo; las cifras que dan los buscadores (OGE «~12x EBITDA», Edison Stoccaggio «RAB ~520 M€», 2i «RAB») no se han comprobado en un documento original', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'EV/RAB de 2i Rete Gas, National Gas y Edison Stoccaggio', tipo: 'Complemento', intentos: '1) Documento informativo de Italgas, anuncio de National Grid y nota FY2024 de Snam: no publican RAB ni múltiplo sobre RAB; 2) página de la nota de cierre de Edison Stoccaggio en snam.it: contenido cargado por JavaScript, ilegible; 3) no se usan cifras de buscadores (regla 0)', decision: 'Omitido' },
  ],
};
fs.writeFileSync(path.join(dir, 'D.json'), JSON.stringify(D, null, 2));
console.log('D.json escrito', Object.keys(D).map(k => k + ':' + (D[k] === null ? 'null' : 'ok')).join(' '));
console.log(JSON.stringify(rabComp.map(r => [r.nombre, r.ev_meur, r.rab_meur, r.ev_rab])));
