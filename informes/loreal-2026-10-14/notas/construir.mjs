// Genera las notas A-E de L'Oréal (corte 2026-10-14) a partir de los extractos de búsqueda (entorno nube: solo WebSearch).
// Ejecutar: node informes/loreal-2026-10-14/notas/construir.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, `${n}.json`), JSON.stringify(o, null, 2) + '\n');

// ---------------- A. Cuentas ----------------
const A = {
  _estado: 'completo con huecos (solo WebSearch)',
  negocio: {
    segmentos: [],
    geografias: [],
    kpis: [
      { kpi: 'Crecimiento comparable del grupo (ajustado)', valor_anterior: '+4,0 % (2025)', valor_actual: '+6,5 % (1S26)', variacion: '+2,5 puntos', comentario: 'Aceleración en 2026: +7,6 % comparable en el 1T26 (+6,7 % ajustado) y +6,8 % en el semestre [A6, A2].' },
      { kpi: 'Margen operativo', valor_anterior: '20,2 % (2025)', valor_actual: '21,3 % (1S26)', variacion: '+0,2 puntos sobre el 1S25', comentario: 'Récord semestral pese a la dilución de Kering Beauté en Luxe (22,1 %) [A2, A17].' },
      { kpi: 'Ventas de L’Oréal Luxe', valor_anterior: 'n. d.', valor_actual: '15.595 M EUR (2025)', variacion: '+2,8 % comparable en 2025', comentario: 'La mayor división de lujo de belleza del mundo; integra Kering Beauté (Creed) desde el 1-abr-2026 [A12, A17].' },
      { kpi: 'Productos Profesionales (1S)', valor_anterior: 'n. d.', valor_actual: '2.920 M EUR (1S26)', variacion: '+14,7 % publicado', comentario: 'La división que más crece en 2026 (+11,6 % comparable ajustado) [A10].' },
      { kpi: 'Belleza Dermatológica (1S)', valor_anterior: 'n. d.', valor_actual: '4.220 M EUR (1S26)', variacion: '+9,3 % publicado', comentario: 'La Roche-Posay y CeraVe: crecimiento de doble dígito comparable [A10].' },
      { kpi: 'Inversión (capex) sobre ventas', valor_anterior: '≈3,6 % (2025, estimación)', valor_actual: '3,0 % (1S26)', variacion: 'n. d.', comentario: '716 M EUR en el semestre [A3].' },
    ],
  },
  financieros: {
    cuenta: [
      { periodo: '2021', ingresos: 32287.6, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 6159.5, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 5, beneficio_neto: 4939, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 8.82, dpa: 4.80, dpa_extraordinario: 0, acciones_diluidas: 560.0 },
      { periodo: '2022', ingresos: 38260.6, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 7456.6, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 5, beneficio_neto: 5457, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 10.20, dpa: 6.00, dpa_extraordinario: 0, acciones_diluidas: 535.0 },
      { periodo: '2023', ingresos: 41182.5, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 8143.2, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 5, beneficio_neto: 6054, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 11.26, dpa: 6.60, dpa_extraordinario: 0, acciones_diluidas: 537.6 },
      { periodo: '2024', ingresos: 43486.8, coste_ventas: null, gastos_generales: null, ebitda: 10380, amortizaciones: 1786, ebit: 8593.8, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 5, beneficio_neto: 6513, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 12.16, dpa: 7.00, dpa_extraordinario: 0, acciones_diluidas: 535.6 },
      { periodo: '2025', ingresos: 44053, coste_ventas: null, gastos_generales: null, ebitda: 10705, amortizaciones: 1806, ebit: 8899, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 5, beneficio_neto: 6806.4, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 12.71, dpa: 7.20, dpa_extraordinario: 0, acciones_diluidas: 535.5 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 45360, ebitda: 11180, ebit: 9220, beneficio_neto: 6985, bpa: 13.05, dpa: 7.20, dpa_extraordinario: 0, fcf: 7400, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Aesop consolidada desde el 30-ago-2023 (valor empresa de 2.525 M USD).' },
      { periodo: '2026', descripcion: 'Kering Beauté (Creed y licencias a 50 años de Bottega Veneta y Balenciaga) consolidada desde el 1-abr-2026 por ≈4.000 M EUR; la licencia de Gucci entra el 1-jul-2027. Galderma (20 % desde 2026) por puesta en equivalencia.' },
    ],
    comentario: 'Ventas de 32.288 M EUR en 2021 a 44.053 M en 2025 (TCAC del 8,1 %), con un frenazo claro en 2025: +1,3 % publicado y +4,0 % comparable, tras +16,1 %, +10,9 %, +11,0 % y +5,1 % comparables en 2021-2024 [A1, A14]. El margen operativo ha subido cada año, del 19,1 % de 2021 al 20,2 % de 2025, y al 21,3 % en el 1S26 [A1, A2]. En 2026 el crecimiento vuelve: +7,6 % comparable en el 1T26 y +6,8 % en el semestre (5,8 % publicado, con la divisa en contra y Kering Beauté sumando desde abril) [A2, A6]. El beneficio neto sin partidas no recurrentes de 2025 (6.806 M, +0,3 %) creció menos que el operativo porque los dividendos de Sanofi bajaron de 448 a 352 M tras vender un 2,3 % de Sanofi [A1, A15].',
    ajustes: 'Usamos el beneficio neto y el BPA diluido **sin partidas no recurrentes** que publica L’Oréal (la base de su guía y del consenso). El neto atribuido publicado fue de 6.408,7 M en 2024 y 6.127,2 M en 2025 (−4,4 %), por deterioros y costes de reestructuración [A5]. Las cifras de 2021-2023 (ventas, resultado operativo, BPA y dividendo) son las de los comunicados anuales de L’Oréal; el beneficio neto ajustado de esos años se calcula como BPA × acciones diluidas (estimación propia). El EBITDA de 2024-2025 es el de MarketScreener (margen del 24,3 % en 2025) y la amortización sale por diferencia con el resultado operativo [A12]. El BPA incluye los dividendos de Sanofi (352 M en 2025, 366 M en el 1S26), que no están en el EBITDA [A1, A3]. El LTM a jun-26 es estimación propia: 2025 + 1S26 − 1S25.',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '3T25', ingresos: 10330, crecimiento_pct: 0.5, crecimiento_organico_pct: 4.2, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 12150, crecimiento_pct: 3.6, crecimiento_organico_pct: 7.6, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 11620, crecimiento_pct: 8.2, crecimiento_organico_pct: 6.0, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 3T25 las ventas (10.330 M) crecieron un 4,2 % comparable, por debajo del consenso (≈4,9 %), con Norteamérica débil por los aranceles y el cambio de sistemas informáticos [A7]. El 4T25 decepcionó y la acción cayó: un analista de RBC lo llamó «poco útil» con el mercado de belleza ya prudente [A14]. 2026 cambió el tono: el 1T26 creció un 7,6 % comparable, muy por encima de lo esperado, con Norte de Asia +4,8 % ajustado (China recuperándose) y SAPMENA-SSA +15,4 % [A6]. En el 1S26 (29-jul) la dirección elevó su estimación de crecimiento del mercado de belleza al 4,5-5 % en 2026 y dijo que quiere superarlo en el segundo semestre; Productos Profesionales (+11,6 % ajustado) y Dermatológica (+10,6 %) tiraron, Gran Consumo (+4,3 %) y Luxe (+5,1 %) más despacio, y el Golfo frenó por el conflicto con Irán [A2, A10, A11]. El 2T26 es estimación propia por diferencia (1S26 − 1T26); el +6,0 % comparable del trimestre sale de una fuente secundaria.',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2025', activo_total: 61821, activo_corriente: null, pasivo_corriente: null, pasivo_total: 26817, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 4543, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 9865, deuda_financiera: 10119, arrendamientos: 1797, patrimonio_neto: 34953, minoritarios: 51, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja de 4.050 M EUR a 30-jun-2026 y deuda neta de 12.700 M (con arrendamientos), después de pagar Kering Beauté (≈4.000 M), el segundo 10 % de Galderma y el dividendo de 2025 (≈3.850 M) [A3]. A dic-2025 la caja era de 9.865 M (prefinanciación de las compras) y la deuda neta, de 2.051 M (0,2 veces el EBITDA) [A8, A9].',
    rating: 'AA (S&P) / Aa1 (Moody’s), según la última información conocida; no comprobado en este análisis',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos de 1.797 M EUR a dic-2025 [A9]. No constan pensiones relevantes en las fuentes leídas. La participación en Sanofi (7,2 % del capital, ≈88,6 M de acciones tras vender 29,6 M en feb-2025 a 101,5 EUR) es un activo financiero líquido fuera del EBITDA [A15].',
    comentario: 'El balance pasó de casi sin deuda (0,2 veces EBITDA en dic-2025) a ≈1,1 veces en jun-2026 por las compras de Kering Beauté y Galderma [A3, A9]. Es un apalancamiento cómodo para una empresa con 7.200 M de flujo de caja neto al año: en dos años vuelve a la caja neta si no compra más [A1]. El patrimonio de 2025 (34.953 M atribuido) y el activo total salen de Stock Analysis; el resto del balance no se pudo leer [A8].',
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2024', flujo_operativo: null, capex: null, pagos_arrendamientos: null, adquisiciones: null, desinversiones: 0, dividendos: 3740, recompras: null, emision_acciones: null, intereses_en_financiacion: null },
      { periodo: '2025', flujo_operativo: 8800, capex: 1600, pagos_arrendamientos: null, adquisiciones: null, desinversiones: 3000, dividendos: 3750, recompras: null, emision_acciones: null, intereses_en_financiacion: null },
    ],
    comentario: 'L’Oréal publicó un flujo de caja neto (operativo menos capex) de 7.200 M EUR en 2025, +7,8 %, el 106 % del beneficio neto ajustado [A1]. El flujo operativo y el capex de 2025 son estimación propia (capex de ≈3,6 % de las ventas, la media reciente); en el 1S26 el flujo operativo subió un 13,9 % hasta 3.120 M y el capex fue de 716 M (3 % de las ventas) [A3]. En 2025 entraron 3.000 M de la venta de acciones de Sanofi [A15]. Los dividendos son estimación propia (dividendo por acción × acciones).',
    confianza: 'Baja',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: null,
    comentario: 'Cuentas limpias y estables: el resultado operativo es la cifra que guía y crece cada año; las partidas no recurrentes (deterioros, reestructuraciones) restaron ≈680 M al neto de 2025 [A1, A5]. Lo que hay que vigilar: el peso creciente de las compras (Aesop, Kering Beauté, Galderma), que suben fondo de comercio y marcas, y que el BPA ajustado incluye los dividendos de Sanofi, que bajan si vende más acciones. Altman y Beneish no son concluyentes porque faltan líneas del balance.',
    senales: [
      { senal: 'Partidas no recurrentes crecientes', nivel: 'Media', comentario: 'Beneficio neto publicado −4,4 % en 2025 frente a +0,3 % el ajustado [A1, A5].' },
      { senal: 'BPA apoyado en dividendos de Sanofi', nivel: 'Baja', comentario: '352 M en 2025 (≈5 % del beneficio ajustado), a la baja por las ventas de acciones [A1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo creciente: 7,20 EUR por acción con cargo a 2025 (+2,9 %), ≈57 % del beneficio ajustado; prima del 10 % a los accionistas nominativos fieles [A1]. Recompras habituales para compensar la dilución de los planes de acciones [A13]. Las prioridades son las compras de marcas (Aesop, Kering Beauté, Galderma, Jacquemus) y la innovación (investigación del 3 % de las ventas).',
    adquisiciones: [
      { anio: '2023', objetivo: 'Aesop', importe: 2253, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: '4,7 veces las ventas; integrada en Luxe [A12].' },
      { anio: '2025-2026', objetivo: 'Galderma (dos tramos del 10 %)', importe: null, financiacion: 'Caja y líneas de crédito', ev_ebitda: null, resultado: 'Participación del 20 %, por puesta en equivalencia desde 2026; dos consejeros [A16].' },
      { anio: '2026', objetivo: 'Kering Beauté (Creed, licencias de Bottega Veneta, Balenciaga y Gucci desde jul-2027)', importe: 4000, ev_ebitda: null, financiacion: 'Caja (prefinanciada con bonos en 2025)', resultado: 'Cerrada el 31-mar-2026; diluye 0,2 puntos el margen de Luxe [A17, A18].' },
    ],
    comentario: 'Asignación de capital disciplinada: dividendo creciente sin interrupciones, recompras para neutralizar la dilución y compras de marcas de prestigio a múltiplos altos (Aesop a 4,7 veces ventas). La venta parcial de Sanofi (3.000 M en 2025) financió las compras sin forzar el balance [A15]. El riesgo es pagar demasiado por marcas de lujo (Creed, ≈14 veces ventas cuando la compró Kering) en un mercado que se normaliza.',
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: '2025 Annual Results (nota de prensa, 12-feb-2026)', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026-02-12', url: 'https://www.loreal-finance.com/system/files/2026-02/CPFY25ENv12.02%2017.00.pdf' },
    { id: 2, titulo: '2026 Half-Year Results (nota de prensa, 29-jul-2026)', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.loreal-finance.com/eng/press-release/2026-half-year-results' },
    { id: 3, titulo: 'L’Oréal (OR) H1 2026 earnings summary (deuda neta, caja, flujo operativo, capex, resultado financiero, dividendos de Sanofi)', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://quartr.com/events/l-or-al-sa-or-h1-2026_oj6EkMgb' },
    { id: 4, titulo: 'L’Oréal H1 profit rises', editor: 'finanzen.at (RTTNews)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.finanzen.at/nachrichten/aktien/loreal-h1-profit-rises-1036379779' },
    { id: 5, titulo: 'L’Oréal Reports FY25 Earnings Growth On Higher Revenue', editor: 'Nasdaq (RTTNews)', tipo: 'Prensa', fecha: '2026-02-12', url: 'https://www.nasdaq.com/articles/loreal-reports-fy25-earnings-growth-higher-revenue' },
    { id: 6, titulo: 'First quarter 2026 sales', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026-04', url: 'https://www.loreal-finance.com/eng/press-release/first-quarter-2026-sales' },
    { id: 7, titulo: 'L’Oréal Q3 2025 sales below expectations (10.330 M EUR, +4,2 % comparable)', editor: 'Longbridge', tipo: 'Prensa', fecha: '2025-10', url: 'https://longbridge.com/en/news/262114319' },
    { id: 8, titulo: 'L’Oréal S.A. (LRLCY): balance sheet (extracto de búsqueda)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/otc/LRLCY/financials/balance-sheet/' },
    { id: 9, titulo: 'Presentación del director financiero, resultados anuales 2025 (deuda por arrendamientos y apalancamiento)', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026-02-13', url: 'https://www.loreal-finance.com/system/files/2026-07/C.B.%20Presentation%20_%20RIF26_EN%20V.13.02.2026%208h.pdf' },
    { id: 10, titulo: 'L’Oréal accelerates its growth in the first half and raises the bar for the beauty market', editor: 'Next in Beauty', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.nextinbeautymag.com/en/business/economy-sector/oreal-accelerates-its-growth-in-the-first-half-and-raises-the-bar-for-the-beauty-market_2934_102.html' },
    { id: 11, titulo: 'L’Oréal outperforms beauty market in H1 with +6.5% sales uplift; Asia travel retail recovery expected in H2', editor: 'The Moodie Davitt Report', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://moodiedavittreport.com/loreal-outperforms-beauty-market-in-h1-with-6-5-sales-uplift-asia-travel-retail-recovery-expected-in-h2/' },
    { id: 12, titulo: 'Informe de Puig de este repositorio: L’Oréal en comparables (MarketScreener, 9-oct-2026) y L’Oréal Luxe en competidores', editor: 'MarketScreener (vía informes/puig-2026-10-11)', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://www.marketscreener.com/quote/stock/L-OREAL-4666/finances/' },
    { id: 13, titulo: 'Document d’enregistrement universel 2025 (información bursátil y capital)', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.loreal-finance.com/eng/2025-universal-registration-document/en/article/405/' },
    { id: 14, titulo: 'L’Oréal Sales Disappoint as Weaker US Outweighs China Pickup', editor: 'Bloomberg (BGOV)', tipo: 'Prensa', fecha: '2026-02', url: 'https://news.bgov.com/international-trade/loreal-sales-disappoint-as-us-weakness-outweighs-china-pickup' },
    { id: 15, titulo: 'Agreement between L’Oréal and Sanofi for the repurchase by Sanofi of 2.3% of its own shares held by L’Oréal', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2025-02', url: 'https://www.loreal.com/en/press-release/group/agreement-between-loreal-and-sanofi-for-the-repurchase-by-sanofi-of-2-3-percent-of-its-own-shares-held-by-l-oreal/' },
    { id: 16, titulo: 'L’Oréal Groupe reinforces its strategic investment in Galderma with an additional 10%, bringing its stake to 20%', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2025-12-08', url: 'https://www.loreal-finance.com/eng/press-release/loreal-groupe-reinforce-its-strategic-investment-galderma-additional-10-bringing-its' },
    { id: 17, titulo: 'Kering Reports €7.2B in H1 Sales, as L’Oréal Deal Reshapes Beauty Business (cierre de Kering Beauté el 31-mar-2026)', editor: 'The Fashion Law', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.thefashionlaw.com/?p=107494' },
    { id: 18, titulo: 'Kering and L’Oréal forge an alliance in beauty and wellness', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2025-10-19', url: 'https://www.loreal-finance.com/eng/press-release/kering-and-loreal-forge-alliance-beauty-and-wellness' },
  ],
  huecos: [
    { seccion: 'negocio', campo: 'segmentos (cuatro divisiones, 5 ejercicios) y geografías', tipo: 'Núcleo', intentos: '1) Comunicado de 2025 vía búsqueda: solo cifras del grupo; 2) comunicado del 1S26: tablas por división sin cifras completas en el extracto; 3) prensa: divisiones del 1S26 parciales', decision: 'Omitido (se dan cifras parciales en los KPI)' },
    { seccion: 'financieros', campo: 'coste de ventas, resultado financiero, impuestos y amortización publicada 2021-2025', tipo: 'Núcleo', intentos: '1) Comunicados anuales vía búsqueda: solo ventas, resultado operativo y BPA; 2) Stock Analysis: extracto del balance, no de la cuenta; 3) documento de registro: páginas sin abrir (red limitada)', decision: 'Omitido; EBITDA de 2024-2025 de MarketScreener' },
    { seccion: 'balance', campo: 'balance completo 2021-2024 y partidas de 2025 (fondo de comercio, clientes, proveedores)', tipo: 'Núcleo', intentos: '1) Stock Analysis: solo activo, patrimonio, caja, deuda y existencias de 2025; 2) Stockopedia: sin fondo de comercio; 3) documento de registro: no accesible', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'estado de flujos 2021-2025 (operativo, capex, arrendamientos, recompras)', tipo: 'Núcleo', intentos: '1) Comunicado de 2025: solo el flujo de caja neto (7.200 M); 2) Quartr 1S26: flujo operativo y capex del semestre; 3) proveedores: sin extracto', decision: 'Estimado para 2025 y marcado; resto omitido' },
  ],
};

// ---------------- B. Sector y competencia ----------------
const B = {
  historia: {
    resumen: 'L’Oréal nació en 1909 en París, cuando el químico Eugène Schueller fundó una empresa de tintes para el pelo. Su hija Liliane Bettencourt fue la primera accionista durante décadas, y en 1974 Nestlé entró en el capital en un pacto con la familia. Con Lindsay Owen-Jones (1988-2006) y Jean-Paul Agon (2006-2021) se convirtió en el líder mundial de la belleza a base de compras de marcas (Lancôme, Maybelline, Kiehl’s, CeraVe, Aesop) y expansión en emergentes. Hoy la familia Bettencourt Meyers controla de hecho el grupo, Nestlé conserva el ≈20 % y Nicolas Hieronimus es consejero delegado desde 2021 [B1, B2].',
    hitos: [
      { anio: '1909', hito: 'Eugène Schueller funda la empresa de tintes que será L’Oréal [B1].' },
      { anio: '1974', hito: 'Entrada de Nestlé en el capital, en un pacto con Liliane Bettencourt [B2].' },
      { anio: '1999', hito: 'Aporta Synthélabo a Sanofi y recibe acciones: origen de la participación en Sanofi [B3].' },
      { anio: '2014', hito: 'Recompra del 8 % de su capital a Nestlé a cambio de su mitad de Galderma [B2].' },
      { anio: '2021', hito: 'Recompra de 22,3 M de acciones a Nestlé (8.900 M EUR); Nestlé baja al 20,1 % y la familia sube al 34,7 %. Hieronimus sucede a Agon como consejero delegado [B2].' },
      { anio: '2023', hito: 'Compra de Aesop por 2.525 M USD [B4].' },
      { anio: '2025', hito: 'Vende a Sanofi un 2,3 % de su capital por 3.000 M EUR (queda con el 7,2 %); acuerda comprar Kering Beauté por 4.000 M EUR y sube al 20 % de Galderma [B3, B5, B6].' },
      { anio: '2026', hito: 'Cierra Kering Beauté (31-mar); supera a LVMH como primera capitalización de París (15-sep) [B5, B7].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'L’Oréal es el primer grupo de belleza del mundo: 44.053 M EUR de ventas en 2025 con 37 marcas internacionales en cuatro divisiones: Gran Consumo (L’Oréal Paris, Maybelline, Garnier), L’Oréal Luxe (Lancôme, Yves Saint Laurent, Armani, Prada, Aesop y, desde abril de 2026, Creed y las licencias de Kering), Belleza Dermatológica (La Roche-Posay, CeraVe, Vichy, SkinCeuticals) y Productos Profesionales (peluquerías: Kérastase, Redken) [A1, A2]. Vende en ≈150 países; las regiones son Europa, Norteamérica, Norte de Asia, SAPMENA-SSA y Latinoamérica [A6].',
    como_gana_dinero: 'Margen bruto alto (≈74 %) que paga una inversión enorme en publicidad y promoción (≈32 % de las ventas) e investigación (≈3 %), y deja un margen operativo del 20 % que sube un poco cada año [A1, B8]. Fabrica en sus propias plantas (más de 35) y vende a distribuidores, perfumerías, farmacias, peluquerías y por internet. Nada es contractual, pero la belleza es un gasto recurrente y defensivo: el mercado solo cayó en 2020 (−8 %) [B8]. El grupo crece por volumen, precio y mezcla (más lujo y dermocosmética) y compra marcas para entrar en categorías nuevas.',
    clientes: 'Consumidor final de todas las rentas, a través de distribuidores (grandes superficies, perfumerías como Sephora, farmacias, comercio electrónico, viajes). Sin concentración relevante de clientes. Poder de precios demostrado: subidas en 2022-2023 con inflación sin perder volumen, y margen operativo al alza todos los años de 2021 a 2025 [A1].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el **mercado mundial de belleza** (piel, maquillaje, pelo, perfumes, higiene) a precios netos de fabricante, según la estimación de la propia L’Oréal: ≈300.000 M EUR en 2025 [B8]. Es la base en la que L’Oréal mide su cuota y su «superación del mercado». Se contrasta con Euromonitor (422.000 M USD a precio de venta al público en 2022) [B8]. La serie de 2019-2022 es estimación propia hacia atrás con los crecimientos anuales que publica L’Oréal (−8 % en 2020, +8 % en 2021, +6 % en 2022, +8 % en 2023) [B8].',
    tamano: '≈ 300.000 M EUR en 2025 a precios netos de fabricante; la dirección espera un crecimiento del 4,5-5 % en 2026 [B8, A2].',
    unidad_serie: 'millones de EUR',
    serie: [
      { anio: '2019', tamano: 246000 }, { anio: '2020', tamano: 226000 }, { anio: '2021', tamano: 244000 }, { anio: '2022', tamano: 259000 },
      { anio: '2023', tamano: 280000 }, { anio: '2024', tamano: 290000 }, { anio: '2025', tamano: 300000 }, { anio: '2026e', tamano: 314000 },
    ],
    tcac_historico_pct: 3.4, tcac_previsto_pct: 4.5, cr5_pct: 40, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Premiumización (lujo y dermocosmética)', efecto: '+', horizonte: 'Estructural', evidencia: 'Dermatológica +10,6 % y Profesionales +11,6 % comparables ajustados en el 1S26 [A10].' },
      { driver: 'Emergentes (India, Oriente Medio, África)', efecto: '+', horizonte: 'Estructural', evidencia: 'SAPMENA-SSA +15,4 % en el 1T26 y +13,8 % en el 1S26 [A6, A10].' },
      { driver: 'China y comercio de viaje en Asia', efecto: '−', horizonte: 'Cíclico', evidencia: 'Norte de Asia −9 % publicado en el 1T26 pese a +4,8 % ajustado; el comercio de viaje en Asia sigue «difícil» [A6, B9].' },
      { driver: 'Normalización tras el auge de 2021-2023', efecto: '−', horizonte: 'Cíclico', evidencia: 'El mercado pasó de +8 % en 2023 a ≈+4 % en 2025 [B8].' },
      { driver: 'Divisas', efecto: '−', horizonte: 'Cíclico', evidencia: 'Un punto de diferencia entre crecimiento comparable (6,8 %) y publicado (5,8 %) en el 1S26 con Kering Beauté sumando [A2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Rivales grandes (P&G, Unilever, Estée Lauder, LVMH, Shiseido) y marcas nativas digitales; publicidad del ≈32 % de las ventas [A1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Distribuidores grandes (Sephora, Ulta, Walmart, Amazon), pero la marca la busca el consumidor.' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Materias primas de química básica y envases; fabricación propia.' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Entrar es barato con redes sociales (e.l.f., Rhode), escalar no: las marcas exitosas acaban compradas.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Tratamientos estéticos (Galderma, en la que L’Oréal tiene el 20 %) y marcas blancas en gran consumo.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El mercado de belleza creció ≈4 % en 2025 y la dirección espera 4,5-5 % en 2026 [A2, B8]. Es un sector defensivo: +3 % en 2008, +1 % en 2009, −8 % en 2020 (cierre de tiendas) y rebote del +8 % en 2021 [B8].' },
    regulacion: '**Química y seguridad**: reglamento europeo de cosméticos y la ley MoCRA de EE. UU. (2022), que endurece el registro y la vigilancia de productos [B8]. **Aranceles de EE. UU.**: afectaron a Norteamérica en 2025 [A7]. **Fiscalidad francesa**: recargo temporal del impuesto de sociedades a las grandes empresas en 2025-2026; tipo efectivo del grupo del ≈25 % (estimación propia).',
    tendencias: 'Las compras se mueven a internet y a las redes (TikTok Shop), lo que abarata lanzar marcas y obliga a los grandes a comprar las que funcionan. La dermocosmética y los perfumes ganan peso; el maquillaje de masas sufre en EE. UU. La estética médica (inyectables) se acerca a la belleza: por eso el 20 % de Galderma.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 14.7,
    posicion: 'Líder mundial de la belleza con ≈14,7 % del mercado (44.053 M sobre ≈300.000 M EUR en 2025, estimación propia), casi el doble que el segundo (Unilever) [A1, B8].',
    competidores: [
      { nombre: 'Unilever (Beauty & Wellbeing y Personal Care)', pais: 'Reino Unido', ticker: 'ULVR.L', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo grupo de belleza del mundo por ventas (≈26.600 M USD en el ranking sectorial), con más peso de higiene [B8].' },
      { nombre: 'Estée Lauder', pais: 'EE. UU.', ticker: 'EL', ingresos: 12904, cuota_pct: null, margen_ebit_pct: 5.2, comentario: 'Rival directo en lujo; en reestructuración, con margen operativo publicado del 5,2 % [B10].' },
      { nombre: 'LVMH Perfumes y Cosméticos', pais: 'Francia', ticker: 'MC.PA', ingresos: 8174, cuota_pct: null, margen_ebit_pct: 8.9, comentario: 'Dior, Guerlain, Givenchy; ventas planas en 2025 [B10].' },
      { nombre: 'Beiersdorf', pais: 'Alemania', ticker: 'BEI.DE', ingresos: 9852, cuota_pct: null, margen_ebit_pct: 14.0, comentario: 'Nivea, Eucerin y La Prairie; compite en dermocosmética [B10].' },
      { nombre: 'Shiseido', pais: 'Japón', ticker: '4911.T', ingresos: 5738, cuota_pct: null, margen_ebit_pct: -2.9, comentario: 'Pérdidas por deterioros en 2025; caída en China y comercio de viaje [B10].' },
      { nombre: 'Puig', pais: 'España', ticker: 'PUIG.MC', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Perfumería de prestigio (11 % del mercado selectivo); compite con L’Oréal Luxe [B10].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Lealtad de marca en piel y pelo, sin coste real de cambio.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Cartera de 37 marcas mundiales y licencias de lujo a 50 años (Kering); margen operativo al alza cinco años seguidos [A1, B5].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Escala en publicidad, compras, investigación (≈1.300 M al año) y distribución: el doble de ventas que el segundo [A1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'El mercado es grande y fragmentado; la escala da ventaja, no exclusividad.' },
      ],
    },
    amenazas: 'Marcas nacidas en redes que ganan cuota en maquillaje y piel en EE. UU. (e.l.f., Rhode) y marcas locales chinas; la respuesta de L’Oréal es comprar (Aesop, Kering Beauté) y acelerar la venta en internet. Riesgo de que la normalización del mercado (+4 %) deje a L’Oréal creciendo como el mercado, sin la prima que justifica su múltiplo.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para L’Oréal es la seguridad de los ingredientes (litigios en EE. UU. por alisadores de pelo), el plástico de los envases, el agua de sus fábricas y la publicidad responsable. El grupo tiene objetivos de reducción de emisiones validados y suele estar en la parte alta de las calificaciones ESG del sector.',
    controversias: 'Demandas en EE. UU. por alisadores químicos de pelo (varias compañías demandadas desde 2022); sin efecto material publicado en las cuentas leídas.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'L’Oréal: historia del grupo', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026', url: 'https://www.loreal.com/en/group/history/' },
    { id: 2, titulo: 'Nestlé slims down stake in L’Oréal (venta de 2021: Nestlé al 20,1 %, familia al 34,7 %)', editor: 'The Grocer', tipo: 'Prensa', fecha: '2021-12', url: 'https://thegrocer.co.uk/news/nestle-slims-down-stake-in-loreal/354433.article' },
    { id: 3, titulo: 'L’Oreal Sells €3 Billion of Sanofi Stock Back to Drugmaker', editor: 'Bloomberg Law', tipo: 'Prensa', fecha: '2025-02', url: 'https://news.bloomberglaw.com/capital-markets/loreal-sells-3-billion-of-sanofi-stock-to-drugmaker-correct' },
    { id: 4, titulo: 'Informe de Puig de este repositorio: transacciones del sector (Aesop, Kering Beauté, Creed, Byredo, Rhode, Wella)', editor: 'informes/puig-2026-10-11', tipo: 'Sectorial', fecha: '2026-10-11', url: 'https://www.loreal-finance.com/eng/press-release/kering-and-loreal-forge-alliance-beauty-and-wellness' },
    { id: 5, titulo: 'Kering and L’Oréal forge an alliance in beauty and wellness', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2025-10-19', url: 'https://www.loreal-finance.com/eng/press-release/kering-and-loreal-forge-alliance-beauty-and-wellness' },
    { id: 6, titulo: 'L’Oréal doubles stake in Galderma to 20% to up its aesthetics play', editor: 'Cosmetics Business', tipo: 'Prensa', fecha: '2025-12-08', url: 'https://cosmeticsbusiness.com/l-oréal-doubles-stake-in-galderma' },
    { id: 7, titulo: 'L’Oréal détrône LVMH: la première capitalisation française change de mains', editor: 'France Épargne', tipo: 'Prensa', fecha: '2026-09-15', url: 'https://www.france-epargne.fr/news/loreal-detrone-lvmh-la-premiere-capitalisation-francaise-change-de-mains' },
    { id: 8, titulo: '2025 Universal Registration Document, 1.2 Beauty market (y serie del mercado del informe de Puig)', editor: 'L’Oréal', tipo: 'Sectorial', fecha: '2026-03', url: 'https://www.loreal-finance.com/eng/2025-universal-registration-document/en/article/23/' },
    { id: 9, titulo: 'Travel retail in Asia still “challenging” as L’Oréal hits €44bn', editor: 'TRBusiness', tipo: 'Prensa', fecha: '2026-02', url: 'https://www.trbusiness.com/product-news/beauty/travel-retail-in-asia-still-challenging-as-loreal-hits-e44bn/275905' },
    { id: 10, titulo: 'Informe de Puig de este repositorio: competidores (Estée Lauder, LVMH P&C, Beiersdorf, Shiseido) con sus cuentas de 2025', editor: 'informes/puig-2026-10-11', tipo: 'Sectorial', fecha: '2026-10-11', url: 'https://www.marketscreener.com/quote/stock/L-OREAL-4666/finances/' },
  ],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Documento de registro: no accesible; 2) búsqueda de MSCI y CDP: sin resultado fechado; 3) prensa: nada', decision: 'Omitido' },
  ],
};

// ---------------- C. Equipo y gobierno ----------------
const C = {
  directivos: {
    equipo: [
      { nombre: 'Nicolas Hieronimus', cargo: 'Consejero delegado', desde: '2021', participacion_pct: null, trayectoria: 'En L’Oréal desde 1987; dirigió Gran Consumo, Productos Profesionales y Luxe antes de suceder a Jean-Paul Agon en mayo de 2021 [C1].' },
      { nombre: 'Jean-Paul Agon', cargo: 'Presidente', desde: '2006', participacion_pct: null, trayectoria: 'Consejero delegado de 2006 a 2021 y presidente desde 2011; reelegido consejero en la junta de abril de 2026 [C1].' },
      { nombre: 'Christophe Babule', cargo: 'Director financiero', desde: '2010', participacion_pct: null, trayectoria: 'Presenta los resultados y la guía financiera del grupo [A9].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Superar al mercado de belleza y crecer en ventas y beneficio', real: 'Ventas +4,0 % comparable con un mercado del ≈4 %; margen operativo +0,2 puntos', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Superar al mercado de belleza y crecer en ventas y beneficio', real: 'Ventas +5,1 % comparable; margen operativo del 19,8 %', cumplida: 'Sí' },
    ],
    comentario: 'Equipo de carrera interna y sucesión ordenada (Agon → Hieronimus en 2021). La guía es cualitativa (superar al mercado, crecer en ventas y beneficio y subir el margen) y se ha cumplido casi siempre; 2025 fue el año flojo, con ventas al ritmo del mercado [A1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jean-Paul Agon', cargo: 'Presidente', tipo: 'Otro externo', desde: '2006', comisiones: null },
      { nombre: 'Nicolas Hieronimus', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: null },
      { nombre: 'Françoise Bettencourt Meyers', cargo: 'Vicepresidenta', tipo: 'Dominical', desde: '1997', comisiones: null },
      { nombre: 'Pablo Isla', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La junta del 24-abr-2026 aprobó todas las propuestas del consejo, incluidas las de remuneración; los porcentajes de voto no se pudieron leer [C1].',
    accionistas: [
      { nombre: 'Familia Bettencourt Meyers (Téthys)', pct: 34.7, tipo: 'Control de hecho', variacion: 'Sube del 33 % al 34,7 % con la recompra a Nestlé de 2021 [B2]' },
      { nombre: 'Nestlé', pct: 20.1, tipo: 'Significativo', variacion: 'Del 23,3 % al 20,1 % en 2021; sin venta confirmada en 2026 [B2]' },
    ],
    insiders: [],
    control_y_defensas: 'La familia Bettencourt Meyers (34,7 %) y Nestlé (20,1 %) suman el 55 % del capital; tres consejeros son de la familia y dos de Nestlé en un consejo de 18 (56 % independientes) [C1, B2]. Los accionistas nominativos fieles reciben un dividendo un 10 % mayor. La familia y Nestlé llevan años sin pacto que les obligue: Nestlé ha dicho muchas veces que su participación no es estratégica, así que una venta (a la propia L’Oréal o al mercado) es posible.',
    alertas: [
      'Posible venta de la participación de Nestlé (20,1 %): presión vendedora o recompra grande, según cómo se haga [C2].',
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Annual General Meeting of 24 April 2026 (nota de prensa)', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://www.loreal-finance.com/eng/press-release/annual-general-meeting-24-april-2026' },
    { id: 2, titulo: 'Possible vente des actions L’Oréal appartenant à Nestlé', editor: 'Le Temps', tipo: 'Prensa', fecha: 'n. d.', url: 'https://www.letemps.ch/economie/finance/possible-vente-actions-loreal-appartenant-nestle-agite-marches' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'remuneración del consejero delegado y voto de remuneración de las tres últimas juntas', tipo: 'Núcleo', intentos: '1) Nota de la junta de 2026: sin porcentajes; 2) documento de registro: no accesible; 3) prensa: nada', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (BDIF de la AMF)', tipo: 'Complemento', intentos: '1) API de la BDIF: sin red; 2) búsqueda: sin resultados de 2026; 3) prensa: nada', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'participaciones de la familia y de Nestlé a 2026', tipo: 'Núcleo', intentos: '1) Página de reparto del capital de L’Oréal: sin cifras en el extracto; 2) declaraciones mensuales de derechos de voto: no leídas; 3) prensa de 2026: nada', decision: 'Se usan las de dic-2021 (34,7 % y 20,1 %), sin cambios conocidos' },
  ],
};

// ---------------- D. Mercado y valoración ----------------
const D = {
  identificacion: {
    nombre: 'L’Oréal S.A.', nombre_corto: 'L’Oréal', ticker: 'OR.PA', isin: 'FR0000120321', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Consumo básico', industria: 'Cosmética y cuidado personal', sede: 'Clichy (París)', fundacion: '1909', empleados: null, web: 'www.loreal-finance.com',
    precio: 379.6, fecha_precio: '2026-10-09', acciones: 535.0, capitalizacion_publicada: 202950, free_float_pct: 45,
    max_52s: 408.35, min_52s: 338.85, volumen_medio_diario: null, proximos_resultados: '2026-10-21',
  },
  consenso: {
    guidance: 'L’Oréal no da cifras: aspira a superar al mercado de belleza, que estima en un crecimiento del 4,5-5 % en 2026, y a crecer en ventas y en beneficio con mejora del margen operativo. En el 1S26 dijo confiar en mantener el ritmo de crecimiento en el segundo semestre [A2, A10].',
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: null, ebit: null, bpa: null, dpa: null, fuente: 'Sin dato fechado' },
      { periodo: '2027e', ingresos: null, ebitda: null, ebit: null, bpa: 14.49, dpa: null, fuente: 'Simply Wall St (beneficio de 7.750 M ÷ 535 M de acciones), jul-2026 [D2]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 15.63, dpa: null, fuente: 'Simply Wall St (beneficio de 8.360 M ÷ 535 M de acciones), jul-2026 [D2]' },
    ],
    recomendaciones: { n_analistas: 35, comprar: 23, mantener: 9, vender: 3, po_medio: 417.79, po_min: 340, po_max: 460 },
    revisiones: 'Los objetivos se han movido poco en 2026: JPMorgan mantiene Neutral con 365 EUR y Berenberg Comprar con 435 EUR (agosto); HSBC subió a 440 EUR; Jefferies está en Infraponderar con 323 EUR y avisa de una bajada del PER hacia 22 veces si el crecimiento se normaliza al 4,5 % [D1, D3, E2]. Simply Wall St da un objetivo medio de 402,73 EUR (350-440) y StocksGuide 428,91 EUR [D2, D4]. El beneficio esperado crece un 9 % anual [D2].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2018', precio_cierre: 200.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2019', precio_cierre: 263.1, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2020', precio_cierre: 310.8, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2021', precio_cierre: 418.0, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 336.4, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 449.1, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 341.85, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 366.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'L’Oréal cotizó entre 26 y 40 veces el BPA ajustado del año en 2018-2025 (sin 2020-2021): 26,0x en 2018, 31,7x en 2019, 33,0x en 2022, 39,9x en 2023, 28,1x en 2024 y 28,8x en 2025. Se excluyen 2020 (42,6x, BPA hundido por la pandemia) y 2021 (47,4x, euforia de los valores de calidad con tipos a cero). El cierre de 2025 (366,60 EUR) es el del documento de registro [D5]; 2020 (310,80 EUR) sale de una operación de ese día en el mismo documento; 2021-2023 y 2018-2019 se reconstruyen con las variaciones anuales de MarketScreener (estimación propia, error de ±1-2 %) [D6]. A 379,6 EUR cotiza a 29,1 veces el BPA de los últimos 12 meses y a ≈26 veces el de 2027e: en la parte baja de su historia limpia.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Seis grupos de belleza cotizados con cifras de MarketScreener a 9-oct-2026, recogidas para el informe de Puig de este repositorio [D7]: Estée Lauder, Coty, Interparfums SA, Shiseido, Beiersdorf y la propia Puig (con sus múltiplos de ese informe). Fuera Inter Parfums Inc (consolida Interparfums SA), e.l.f. (52 veces beneficios por una compra) y los grupos de consumo masivo (P&G, Unilever), que no estaban en esa muestra. Ninguno tiene el tamaño ni el margen de L’Oréal.',
    empresas: [
      { nombre: 'Estée Lauder', ticker: 'EL', pais: 'US', capitalizacion: 31653, ev_ventas: 2.74, ev_ebitda_ltm: 16.6, ev_ebitda_ntm: 14.1, per_ntm: 31.2, crecimiento_pct: 4.5, margen_ebitda_pct: 16.5, roic_pct: 5.92, dn_ebitda: 2.32, fcf_yield_pct: 3.71 },
      { nombre: 'Coty', ticker: 'COTY', pais: 'US', capitalizacion: 2240, ev_ventas: 0.97, ev_ebitda_ltm: 6.6, ev_ebitda_ntm: 7.3, per_ntm: 26.1, crecimiento_pct: -3.1, margen_ebitda_pct: 14.6, roic_pct: 4.71, dn_ebitda: 3.68, fcf_yield_pct: 13.87 },
      { nombre: 'Interparfums SA', ticker: 'ITP.PA', pais: 'FR', capitalizacion: 2680, ev_ventas: 3.0, ev_ebitda_ltm: 13.1, ev_ebitda_ntm: 14.4, per_ntm: 21.6, crecimiento_pct: 1.5, margen_ebitda_pct: 22.9, roic_pct: 16.71, dn_ebitda: 0.1, fcf_yield_pct: 6.35 },
      { nombre: 'Shiseido', ticker: '4911.T', pais: 'JP', capitalizacion: 7387, ev_ventas: 1.61, ev_ebitda_ltm: null, ev_ebitda_ntm: 10.9, per_ntm: 25.3, crecimiento_pct: 3.8, margen_ebitda_pct: 4.4, roic_pct: 4.88, dn_ebitda: 5.82, fcf_yield_pct: 5.88 },
      { nombre: 'Beiersdorf', ticker: 'BEI.DE', pais: 'DE', capitalizacion: 17040, ev_ventas: 1.45, ev_ebitda_ltm: 8.4, ev_ebitda_ntm: 9.4, per_ntm: 19.6, crecimiento_pct: 0.2, margen_ebitda_pct: 17.3, roic_pct: 15.05, dn_ebitda: -1.59, fcf_yield_pct: 3.47 },
      { nombre: 'Puig', ticker: 'PUIG.MC', pais: 'ES', capitalizacion: 10184, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 9.6, per_ntm: 15.6, crecimiento_pct: 5.8, margen_ebitda_pct: 20.8, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2023-04', objetivo: 'Aesop', comprador: 'L’Oréal (a Natura &Co)', ev: 2253, ev_ventas: 4.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa de 2.525 M USD con ventas de 537 M USD en 2022 [D7].' },
      { fecha: '2022-06', objetivo: 'Byredo (77 %)', comprador: 'Puig', ev: 1244, ev_ventas: 7.6, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Perfumería de nicho; 7,6 veces las ventas pro forma [D7].' },
      { fecha: '2025-05', objetivo: 'Rhode', comprador: 'e.l.f. Beauty', ev: 714, ev_ventas: 3.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Marca nativa digital; 3,8 veces las ventas sin el variable [D7].' },
      { fecha: '2020-05', objetivo: 'Wella, Clairol, OPI y ghd (60 %)', comprador: 'KKR (a Coty)', ev: 3837, ev_ventas: 1.83, ev_ebitda: 12.3, prima_pct: null, excluir: false, comentario: 'Productos profesionales y de masas: 12,3 veces el EBITDA [D7].' },
      { fecha: '2023-06', objetivo: 'Creed', comprador: 'Kering', ev: 3500, ev_ventas: 14, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Múltiplo atípico de nicho de alto margen; hoy es de L’Oréal [D7].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'L’Oréal SA (OREP): cambios de recomendación y consenso de precio objetivo', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://www.investing.com/equities/l-oreal' },
    { id: 2, titulo: 'L’Oréal Future Growth (beneficio esperado 2027-2028) y objetivo de los analistas', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2026-07-20', url: 'https://simplywall.st/stocks/gb/household/lse-0nzm/loreal-shares/future' },
    { id: 3, titulo: 'Jefferies cuts L’Oréal price target, maintains Underperform rating', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026', url: 'https://uk.marketscreener.com/news/jefferies-cuts-l-oreal-price-target-maintains-underperform-rating-ce7f58dedf89f621' },
    { id: 4, titulo: 'L’Oréal: previsión y recomendaciones de 35 analistas', editor: 'StocksGuide', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://stocksguide.com/en/forecast/LOreal-FR0000120321' },
    { id: 5, titulo: '2025 Universal Registration Document: precio de la acción a 31-dic-2025 (366,60 EUR) y operación del 31-dic-2020 (310,80 EUR)', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.loreal-finance.com/eng/2025-universal-registration-document/en/article/405/' },
    { id: 6, titulo: 'L’Oréal: variaciones anuales de la cotización 2019-2025', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://uk.marketscreener.com/quote/stock/L-OREAL-4000577/quotes/' },
    { id: 7, titulo: 'Informe de Puig de este repositorio: comparables y transacciones (MarketScreener y Stock Analysis, 9-11 de octubre de 2026)', editor: 'MarketScreener (vía informes/puig-2026-10-11)', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://www.marketscreener.com/quote/stock/L-OREAL-4666/finances/' },
    { id: 8, titulo: 'L’Oréal usurps LVMH as most valuable listed company (capitalización de 202.900 M EUR el 15-sep-2026)', editor: 'Cosmetics Business', tipo: 'Prensa', fecha: '2026-09-15', url: 'https://cosmeticsbusiness.com/l-or%C3%A9al-usurps-lvmh-most-valuable-listed-company' },
    { id: 9, titulo: 'Rendimiento del Bund a 10 años (9-oct-2026), serie BBSIS (vía informe de Moncler de este repositorio)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
    { id: 10, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 11, titulo: 'Sanofi: cotización y capitalización (≈75-77 EUR por acción)', editor: 'Simply Wall St / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://ca.marketscreener.com/quote/stock/SANOFI-70461/quotes/' },
    { id: 12, titulo: 'Galderma Group AG: capitalización (≈33.000-35.000 M CHF)', editor: 'TradingView / Simply Wall St', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.tradingview.com/symbols/SIX:GALD' },
    { id: 13, titulo: 'L’Oréal S.A. (SWX:OR): próxima publicación de resultados, 21-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/swx/OR/' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'sección entera (rentabilidades, beta, volatilidad, caída máxima)', tipo: 'Complemento', intentos: '1) bolsa.mjs sin red; 2) WebFetch bloqueado; 3) búsqueda: solo cotizaciones sueltas sin fecha', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026 en París', tipo: 'Núcleo', intentos: '1) Búsqueda en Boursorama, ABC Bourse y la web de L’Oréal: últimos cierres fechados de junio-julio (388,00 EUR el 26-jun); 2) Stock Analysis y Simply Wall St: cotizaciones sin fecha (350-394 EUR); 3) capitalización de MarketScreener del 9-oct (202.950 M EUR) y de la prensa del 15-sep (202.900 M)', decision: 'Calculado y marcado como estimación: 379,6 EUR = 202.950 M ÷ 534,6 M de acciones (9-oct-2026)' },
    { seccion: 'consenso', campo: 'estimaciones de 2026e y fuente con BPA a tres años', tipo: 'Núcleo', intentos: '1) MarketScreener: no abre; 2) Simply Wall St: beneficio de 2027-2028, no de 2026; 3) Investing: solo objetivo', decision: 'Se dan 2027e y 2028e (beneficio ÷ 535 M de acciones)' },
  ],
};

// ---------------- E. Sentimiento ----------------
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'MarketScreener (comentarios y notas de analistas)', fecha: '2026', n_comentarios: 6, tono: 'Dividido', resumen: '«L’Oréal vuelve a crecer»: la recuperación de China y la aceleración del 1T26 justifican un PER de ≈30 veces en línea con su media de diez años; al lado, Jefferies insiste en que 26 veces es caro para un crecimiento del 4,5 % [E1, E2].' },
      { plataforma: 'TIKR (blog de inversores particulares)', fecha: '2026-01', n_comentarios: 4, tono: 'Neutral', resumen: '«¿Se paga de más?»: su modelo da solo un 5,8 % anual a dos años; buena empresa a precio justo [E3].' },
      { plataforma: 'Simply Wall St Community (narrativas)', fecha: '2026-07', n_comentarios: 10, tono: 'Positivo', resumen: 'Las narrativas de los usuarios apoyan el crecimiento por emergentes, internet e inteligencia artificial, con valores razonables de ≈400-410 EUR [E4].' },
      { plataforma: 'Prensa francesa con lectores (France Épargne, Luxury Tribune)', fecha: '2026-09', n_comentarios: 6, tono: 'Positivo', resumen: 'La «coronación» de L’Oréal como primera capitalización de París se lee más como caída de LVMH que como euforia por L’Oréal [E5, E6].' },
      { plataforma: 'Tradingsat / BFM Bourse (reacción al 4T25)', fecha: '2026-02', n_comentarios: 5, tono: 'Negativo', resumen: 'La acción se hundió con unas ventas del 4T25 decepcionantes; dudas sobre EE. UU. y el comercio de viaje en Asia [E7].' },
    ],
    temas: [
      { tema: 'Normalización del mercado de belleza', postura: 'Bajista', peso: 'Alto', contraste: 'Parcialmente: el mercado creció ≈4 % en 2025, pero la dirección espera 4,5-5 % en 2026 y L’Oréal creció un 6,8 % comparable en el 1S26 [A2].' },
      { tema: 'Recuperación de China', postura: 'Alcista', peso: 'Medio', contraste: 'Confirmado a medias: Norte de Asia +4,8 % ajustado en el 1T26, pero −9 % publicado por la divisa [A6].' },
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Alto', contraste: 'El PER de ≈26 veces el BPA de 2027e está por debajo de la mediana limpia de cinco años (31,7x): caro frente al mercado, no frente a su historia.' },
      { tema: 'Compras (Kering Beauté, Galderma, Gucci en 2027)', postura: 'Alcista', peso: 'Medio', contraste: 'Suman crecimiento en 2027-2028, pero diluyen un poco el margen de Luxe (−0,2 puntos en el 1S26) [A2].' },
    ],
    lectura: 'El inversor particular ve L’Oréal como valor refugio de calidad que ha resistido mejor que el lujo, pero duda de que el crecimiento justifique el múltiplo. No hay euforia: la acción sube un ≈6 % en un año mientras LVMH cae un 35 %, y el debate es si 26 veces beneficios es barato para L’Oréal. Coincide con nuestra lectura: precio justo, sin margen de seguridad. El catalizador inmediato son las ventas del 3T del 21 de octubre. No cambia la decisión.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'L’Oréal returns to growth', editor: 'MarketScreener', tipo: 'Foros y redes', fecha: '2026', url: 'https://uk.marketscreener.com/news/l-oreal-returns-to-growth-ce7f59d9d18cf42c' },
    { id: 2, titulo: 'L’Oréal retreats as Jefferies warns of potential de-rating', editor: 'MarketScreener', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.marketscreener.com/news/l-oreal-retreats-as-jefferies-warns-of-potential-de-rating-ce7e50dbdf8cf02d' },
    { id: 3, titulo: 'L’Oréal Stock: Are Investors Overpaying, or Is the Stock Still Undervalued for 2026?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-01', url: 'https://www.tikr.com/blog/loreal-stock-are-investors-overpaying-or-is-the-stock-still-undervalued-for-2026' },
    { id: 4, titulo: 'Emerging Markets Expansion And AI Integration Will Drive Future Performance (narrativa)', editor: 'Simply Wall St Community', tipo: 'Foros y redes', fecha: '2026', url: 'https://simplywall.st/community/narratives/fr/household/epa-or/loreal-shares/emerging-markets-expansion-and-ai-integration-will-drive-future-performance' },
    { id: 5, titulo: 'L’Oréal détrône LVMH: la première capitalisation française change de mains', editor: 'France Épargne', tipo: 'Foros y redes', fecha: '2026-09-15', url: 'https://www.france-epargne.fr/news/loreal-detrone-lvmh-la-premiere-capitalisation-francaise-change-de-mains' },
    { id: 6, titulo: 'What L’Oréal’s stock market coronation really says about LVMH', editor: 'Luxury Tribune', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.luxurytribune.com/en/what-loreals-stock-market-coronation-really-says-about-lvmh' },
    { id: 7, titulo: 'Marché: L’Oréal chute, la croissance des ventes au T4 déçoit', editor: 'Tradingsat (BFM Bourse)', tipo: 'Foros y redes', fecha: '2026-02', url: 'https://www.tradingsat.com/actualites/marches-financiers/marche-l-oreal-chute-la-croissance-des-ventes-au-t4-decoit-actualise-1156543.html' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'revisadas (Reddit, Stocktwits, Seeking Alpha y foro de Boursorama)', tipo: 'Complemento', intentos: '1) Búsqueda de hilos de Reddit y Seeking Alpha sobre L’Oréal en 2026: sin resultados; 2) foro de Boursorama: enlace sin contenido en el extracto; 3) API de Stocktwits: sin red', decision: 'Omitido; se usan comentarios de plataformas y prensa con lectores' },
  ],
};

// Las notas citan con su propia numeración [n]. Al redactar se usaron citas con letra ([A13]); aquí se traducen:
// la letra propia pasa a [n] y las de otra nota copian esa fuente al final de la lista propia.
const todas = { A, B, C, D, E };
function arreglar(letra) {
  const nota = todas[letra];
  const extra = new Map();
  const mapa = (L, n) => {
    if (L === letra) return n;
    const k = `${L}${n}`;
    if (!extra.has(k)) {
      const f = todas[L].fuentes.find((x) => x.id === Number(n));
      if (!f) throw new Error(`Fuente ${k} no existe`);
      const id = nota.fuentes.length + 1;
      nota.fuentes.push({ ...f, id });
      extra.set(k, id);
    }
    return extra.get(k);
  };
  const recorrer = (v) => {
    if (typeof v === 'string') {
      return v.replace(/\[([A-E]\d+(?:,\s*[A-E]\d+)*)\]/g, (_, g) => '[' + g.split(/,\s*/).map((t) => mapa(t[0], t.slice(1))).join(', ') + ']');
    }
    if (Array.isArray(v)) return v.map(recorrer);
    if (v && typeof v === 'object') { for (const k of Object.keys(v)) if (!(v === nota && k === 'fuentes')) v[k] = recorrer(v[k]); return v; }
    return v;
  };
  recorrer(nota);
}
const originales = Object.fromEntries(Object.entries(todas).map(([k, n]) => [k, n.fuentes.map((f) => ({ ...f }))]));
for (const L of Object.keys(todas)) {
  const guardadas = Object.fromEntries(Object.entries(todas).map(([k, n]) => [k, n.fuentes]));
  for (const k of Object.keys(todas)) if (k !== L) todas[k].fuentes = originales[k];
  arreglar(L);
  for (const k of Object.keys(todas)) if (k !== L) todas[k].fuentes = guardadas[k];
}

w('A', A); w('B', B); w('C', C); w('D', D); w('E', E);
console.log('Notas A-E escritas');
