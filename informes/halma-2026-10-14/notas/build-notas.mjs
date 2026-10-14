// Genera las notas A-E de Halma (corte 2026-10-14). Entorno nube: solo WebSearch; cifras de extractos de búsqueda con su URL.
// Unidades: millones de GBP; precio, BPA y DPA en GBP (la acción cotiza en peniques: 3.634 p = 36,34 GBP).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, n), JSON.stringify(o, null, 2), 'utf8');

const SIN_RED = 'entorno nube: solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs sin red)';

// ---------------- A. Cuentas ----------------
const fuentesA = [
  { id: 1, titulo: 'Full Year Results 2025/26 (nota de resultados, 11-jun-2026)', editor: 'Halma plc', tipo: 'Primaria', fecha: '2026-06-11', url: 'https://www.halma.com/news/press-releases/2026/full-year-results-2025-26' },
  { id: 2, titulo: 'Full Year Results 2024/25', editor: 'Halma plc', tipo: 'Primaria', fecha: '2025-06-12', url: 'https://halma.com/news/press-releases/2025/full-year-results-2024-25' },
  { id: 3, titulo: 'Full Year Results 2023/24', editor: 'Halma plc', tipo: 'Primaria', fecha: '2024-06-13', url: 'https://www.halma.com/news/press-releases/2024/full-year-results-2023-24' },
  { id: 4, titulo: 'Full Year Results 2022/23', editor: 'Halma plc', tipo: 'Primaria', fecha: '2023-06-15', url: 'https://halma.com/news/press-releases/2023/full-year-results-2022-23' },
  { id: 5, titulo: 'Full Year Results 2021/22', editor: 'Halma plc', tipo: 'Primaria', fecha: '2022-06-16', url: 'https://www.halma.com/news/press-releases/2022/full-year-results-2021-22' },
  { id: 6, titulo: 'Half Year Results 2025/26', editor: 'Halma plc', tipo: 'Primaria', fecha: '2025-11-20', url: 'https://www.halma.com/news/press-releases/2025/half-year-results-2025-26' },
  { id: 7, titulo: 'Trading Update (RNS, 24-sep-2026)', editor: 'Halma plc / Investegate', tipo: 'Primaria', fecha: '2026-09-24', url: 'https://www.investegate.co.uk/announcement/rns/halma--hlma/trading-update/9787947' },
  { id: 8, titulo: 'Trading Update (RNS, 12-mar-2026)', editor: 'Halma plc / ticker.app', tipo: 'Primaria', fecha: '2026-03-12', url: 'https://www.ticker.app/lse/HLMA/rns/2026-03-12/Trading-Update/3015W' },
  { id: 9, titulo: 'Halma plc (LON:HLMA): cuenta de resultados anual FY2022-FY2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://stockanalysis.com/quote/lon/HLMA/financials/income-statement/' },
  { id: 10, titulo: 'Halma: estado de flujos FY2022-FY2026', editor: 'Stockopedia', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://www.stockopedia.com/share-prices/halma-LON:HLMA/cashflow/' },
  { id: 11, titulo: 'Halma plc (HLMAF): balance a 31-mar-2026 (caja, deuda, arrendamientos)', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026-06', url: 'https://www.digrin.com/stocks/detail/HLMAF/financials' },
  { id: 12, titulo: 'Halma: estadísticas (EBITDA LTM, acciones)', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://www.tipranks.com/stocks/de:h11/statistics' },
  { id: 13, titulo: 'Halma H2 Earnings Call Highlights', editor: 'Nasdaq', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.nasdaq.com/articles/halma-h2-earnings-call-highlights' },
  { id: 14, titulo: 'ii view: Halma shares suffer biggest one-day fall in years', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-halma-shares-suffer-biggest-one-day-fall-years-ii539329' },
  { id: 15, titulo: 'ii view: Halma breaks records amid data centre boom', editor: 'interactive investor', tipo: 'Prensa', fecha: '2025-11-20', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-halma-breaks-records-amid-data-centre-boom-ii537315' },
  { id: 16, titulo: 'Halma buys hazard detection firm E2S for £230m', editor: 'Hargreaves Lansdown', tipo: 'Prensa', fecha: '2025-12-05', url: 'https://www.hl.co.uk/shares/stock-market-news/company--news/halma-buys-hazard-detection-firm-e2s-for-230m' },
  { id: 17, titulo: 'Halma buys lab sample management company Dreampath Diagnostics', editor: 'AJ Bell (Alliance News)', tipo: 'Prensa', fecha: '2026-07-07', url: 'https://www.ajbell.co.uk/news/articles/halma-buys-lab-sample-management-company-dreampath-diagnostics' },
  { id: 18, titulo: 'Halma PLC: transcripción de la conferencia de resultados del 1S 2025/26', editor: 'GuruFocus', tipo: 'Prensa', fecha: '2025-11-20', url: 'https://www.gurufocus.com/stock/HLMAF/transcripts/3218415' },
  { id: 19, titulo: 'Halma ups full-year margin view but leaves Photonics outlook unchanged', editor: 'AJ Bell (Alliance News)', tipo: 'Prensa', fecha: '2026-09-24', url: 'https://www.ajbell.co.uk/news/articles/halma-ups-full-year-margin-view-leaves-photonics-outlook-unchanged' },
  { id: 20, titulo: 'Halma plc: estados financieros (ESEF, informe anual 2025/26 presentado el 24-jun-2026)', editor: 'FinancialFilings', tipo: 'Datos de mercado', fecha: '2026-06-24', url: 'https://financialfilings.com/companies/halma-plc/' },
  { id: 21, titulo: 'Halma: flujos de caja (dólares, línea OTC HLMAF)', editor: 'Weiss Ratings', tipo: 'Datos de mercado', fecha: '2026-06', url: 'https://weissratings.com/en/stock/hlmaf-otc-pk/cash-flow' },
  { id: 22, titulo: 'U.S. Dollar / British Pound: tipos de referencia del Banco de Inglaterra 2026', editor: 'Pound Sterling Live', tipo: 'Datos de mercado', fecha: '2026-03-31', url: 'https://www.poundsterlinglive.com/bank-of-england-spot/historical-spot-exchange-rates/usd/USD-to-GBP-2026' },
];
// Cuenta estatutaria (NIIF). EBIT = beneficio operativo estatutario (incluye amortización de intangibles adquiridos y partidas de adquisiciones).
// resultado_financiero = BAI − EBIT (en FY2022 incluye la plusvalía de 34,0 M por la venta de Texecom, que la empresa presenta debajo del EBIT).
const cuenta = [
  { periodo: 'FY2022', ingresos: 1525.3, ebit: 278.9, bai: 304.4, beneficio_neto: 244.2, bpa: 0.6454, dpa: 0.1888 },
  { periodo: 'FY2023', ingresos: 1852.8, ebit: 308.4, bai: 291.5, beneficio_neto: 234.3, bpa: 0.6204, dpa: 0.2020 },
  { periodo: 'FY2024', ingresos: 2034.1, ebit: 367.7, bai: 340.3, beneficio_neto: 268.8, bpa: 0.7123, dpa: 0.2161 },
  { periodo: 'FY2025', ingresos: 2248.1, ebit: 411.2, bai: 384.3, beneficio_neto: 296.4, bpa: 0.7849, dpa: 0.2312 },
  { periodo: 'FY2026', ingresos: 2582.3, ebit: 520.7, bai: 490.7, beneficio_neto: 372.3, bpa: 0.9857, dpa: 0.2474 },
].map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: null, gastos_generales: null,
  ebitda: c.periodo === 'FY2026' ? 656.8 : null,
  amortizaciones: c.periodo === 'FY2026' ? Math.round((656.8 - c.ebit) * 10) / 10 : null,
  ebit: c.ebit, resultado_financiero: Math.round((c.bai - c.ebit) * 10) / 10, bai: c.bai,
  impuestos: Math.round((c.bai - c.beneficio_neto) * 10) / 10, minoritarios: 0, beneficio_neto: c.beneficio_neto,
  gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: Math.round((c.beneficio_neto / c.bpa) * 10) / 10,
}));

const A = {
  _estado: 'completa con huecos (14-oct-2026)',
  negocio: {
    segmentos: [
      { nombre: 'Medio ambiente y análisis', descripcion: 'Fotónica, análisis óptico, agua y calidad ambiental; incluye el negocio de fotónica que vende a un gran cliente de centros de datos.', tipo_resultado: null, historico: [{ periodo: 'FY2026', ingresos: 1040, resultado: null }] },
      { nombre: 'Seguridad y Salud (agregado)', descripcion: 'Seguridad (detección de incendios y gases, seguridad de personas, control de acceso) y Salud (diagnóstico, oftalmología, sensores médicos); agregados por diferencia porque no se encontraron sus ingresos por separado.', tipo_resultado: null, historico: [{ periodo: 'FY2026', ingresos: 1542.3, resultado: null }] },
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Crecimiento orgánico a tipo constante', valor_anterior: 'FY2025: ≈ +8 %', valor_actual: 'FY2026: ≈ +15 %', variacion: '≈ +7 p.p.', comentario: 'La guía de marzo de 2026 pedía un crecimiento orgánico de la mitad de la decena; la fotónica aportó unos 8 puntos [8, 14].' },
      { kpi: 'Margen EBIT ajustado', valor_anterior: 'FY2025: 21,6 %', valor_actual: 'FY2026: 23,0 % (22,7 % sin extraordinarios)', variacion: '+1,4 p.p.', comentario: 'Guía FY2027 elevada el 24-sep-2026 a 23,5-24 % [1, 7].' },
      { kpi: 'Rentabilidad sobre el capital total invertido (ROTIC ajustado)', valor_anterior: 'FY2025: n.d.', valor_actual: 'FY2026: 16,2 %', variacion: null, comentario: 'Indicador propio de la empresa, después de impuestos y con el fondo de comercio histórico añadido [1].' },
      { kpi: 'Conversión de caja ajustada', valor_anterior: 'FY2025: 112 %', valor_actual: 'FY2026: 93 %', variacion: '−19 p.p.', comentario: 'Objetivo de la empresa: 90 % [1].' },
      { kpi: 'Peso del gran cliente de centros de datos (fotónica)', valor_anterior: 'FY2025: ≈ 15 %', valor_actual: 'FY2026: ≈ 20 %', variacion: '+5 p.p.', comentario: 'Un solo cliente de hiperescala, no nombrado por la empresa, pesa en torno al 20 % de los ingresos del grupo [15, 13].' },
      { kpi: 'Inversión en compras', valor_anterior: 'FY2026: 447 M (5 compras)', valor_actual: 'FY2027 hasta 24-sep: 515 M (6 compras) y 83 M de ventas', variacion: null, comentario: 'Récord de compras en el ejercicio en curso [1, 7].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: 2582.3, ebitda: 656.8, ebit: 520.7, beneficio_neto: 372.3, bpa: 0.9857, dpa: 0.2474, dpa_extraordinario: 0, fcf: 410.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 1074.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2S25', ingresos: 1174.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1S26', ingresos: 1237.4, crecimiento_pct: 15.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
      { periodo: '2S26', ingresos: 1344.9, crecimiento_pct: 14.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En los resultados anuales del 11 de junio de 2026 la dirección presentó el 23.º año seguido de beneficio récord: ingresos de 2.582,3 M (+15 %) y EBIT ajustado de 594,5 M (+22 %), por encima del consenso que recopila la propia empresa (567,9 M) [1, 13]. El mensaje cambió respecto a noviembre de 2025: entonces la dirección subía la guía empujada por la fotónica (EBIT ajustado del 1S +26,7 %) [6]; en junio guió un crecimiento orgánico de «doble dígito bajo» para FY2027 y una fotónica que crecerá en torno al 30 % frente al 52 % del año anterior, y la acción cayó un 15 % en el día [14]. Las preguntas se centraron en la dependencia de un único cliente de hiperescala (≈ 20 % de los ingresos), en la visibilidad de sus pedidos y en si la capacidad limitaba; la dirección respondió que la guía refleja la visibilidad de 6-12 meses y que la capacidad no es el límite, sin dar la cifra de pedidos del cliente ni su contrato [13, 18]. El 24 de septiembre la empresa subió la guía de margen EBIT ajustado a 23,5-24 % (desde ≈ 22,7 %), mantuvo la de crecimiento y dijo que los pedidos van por delante de los ingresos [7, 19].',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: 'FY2026', activo_total: 3710, activo_corriente: null, pasivo_corriente: null, pasivo_total: 1540, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 189.8, deuda_financiera: 958.8, arrendamientos: 109.3, patrimonio_neto: 2170, minoritarios: 0, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja de 189,8 M a 31-mar-2026 [11] y deuda neta (sin arrendamientos) de 769 M, algo más de 1 vez el EBITDA [14, 13]; la empresa financia las compras con su línea de crédito revolvente (E2S se pagó con «líneas existentes») [16].',
    rating: 'Sin rating público',
    coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: 'FY2022', flujo_operativo: 237, capex: null, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2023', flujo_operativo: 258, capex: null, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2024', flujo_operativo: 385, capex: 51.6, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2025', flujo_operativo: 492, capex: 59.4, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 83.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2026', flujo_operativo: 481, capex: 71.0, pagos_arrendamientos: null, adquisiciones: 431.7, desinversiones: null, dividendos: 90.7, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    confianza: 'Baja',
  },
  calidad: { auditor: null, anios_auditor: null, opinion: 'Favorable (sin salvedades conocidas)', confianza: 'Baja' },
  capital: {
    adquisiciones: [
      { anio: 'FY2026', objetivo: 'E2S Group (señalización de alarmas para zonas peligrosas, Reino Unido)', importe: 230, ev_ebitda: null, financiacion: 'Caja y líneas de crédito existentes', resultado: 'Pagada a ≈ 5,2 veces los ingresos previstos de 2025 (≈ 44 M); demasiado reciente para juzgar [16].' },
      { anio: 'FY2026', objetivo: 'Total de cinco compras del ejercicio', importe: 447, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Récord de inversión anual en compras; el EBIT ajustado subió un 22 % en el año [1].' },
      { anio: 'FY2027', objetivo: 'Dreampath Diagnostics (gestión de muestras de laboratorio)', importe: 132, ev_ebitda: null, financiacion: 'Caja; más un pago aplazado de hasta 104 M ligado a resultados de FY2027-28', resultado: 'Pagada a ≈ 4,7 veces los ingresos previstos (28 M) sin contar el pago aplazado; en curso [17].' },
      { anio: 'FY2027', objetivo: 'Seis compras hasta el 24-sep-2026 (Dreampath incluida) y tres ventas', importe: 515, ev_ebitda: null, financiacion: 'Caja, deuda y 83 M de ventas de negocios', resultado: 'Récord; la empresa atribuye a la cartera parte de la subida de la guía de margen [7].' },
    ],
    confianza: 'Media',
  },
  fuentes: fuentesA,
  huecos: [
    { seccion: 'financieros', campo: 'coste de ventas, gastos generales, EBITDA y amortizaciones FY2022-FY2025; gastos financieros', tipo: 'Núcleo', intentos: `1) nota de resultados de cada ejercicio en halma.com: la búsqueda solo devuelve las cifras de cabecera; 2) Stock Analysis, Stockopedia y Weiss Ratings: series parciales y en divisas distintas; 3) derivar el EBITDA con la amortización: no publicada en los extractos; ${SIN_RED}`, decision: 'Omitido; EBITDA FY2026 de TipRanks (656,8 M) y amortización derivada como EBITDA − EBIT estatutario (incluye partidas de adquisiciones): estimación' },
    { seccion: 'balance', campo: 'balance FY2022-FY2025 y partidas de circulante de FY2026 (existencias, clientes, proveedores), vencimientos de deuda', tipo: 'Núcleo', intentos: `1) informes anuales en halma.com: sin acceso a los PDF; 2) Weiss Ratings y Digrin: cifras en dólares de la línea OTC y discrepantes (activo total 3.710 M frente a 4.900 M); 3) búsqueda del balance consolidado en las notas de resultados: no aparece en los extractos; ${SIN_RED}`, decision: 'Omitido; FY2026 con activo, pasivo y patrimonio del ESEF (FinancialFilings), caja y arrendamientos de Digrin y deuda financiera derivada (deuda neta publicada de 769 M + caja 189,8 M = 958,8 M, estimación)' },
    { seccion: 'flujos', campo: 'adquisiciones, dividendos y pagos de arrendamientos FY2022-FY2025', tipo: 'Núcleo', intentos: `1) estados de flujos de los informes anuales: sin acceso; 2) Stockopedia: flujo operativo y capex, sin compras ni dividendos; 3) Weiss Ratings (en dólares): convertido con el tipo del Banco de Inglaterra al cierre solo para FY2025-26; ${SIN_RED}`, decision: 'Omitido; FY2026 compras (570,3 M USD) y dividendos (119,8 M USD) convertidos a 1,321 USD/GBP; FY2025 dividendos 107,0 M USD a 1,289 (estimación)' },
    { seccion: 'negocio', campo: 'ingresos y resultado por sector (Seguridad, Salud) e historia de 5 años; geografías', tipo: 'Núcleo', intentos: `1) nota de resultados FY2026 en halma.com: el extracto solo da Medio ambiente y análisis (1.040 M, +34 %); 2) resumen de la conferencia (Nasdaq) y prensa (ii, AJ Bell): sin cifras por sector ni por país; 3) aproximar con resultados anteriores: los sectores se reorganizaron y no hay series homogéneas; ${SIN_RED}`, decision: 'Omitido; Seguridad y Salud se presentan agregados por diferencia' },
    { seccion: 'calidad', campo: 'auditor y años en el cargo', tipo: 'Complemento', intentos: `1) informe anual FY2026: sin acceso; 2) búsqueda «Halma auditor»: sin resultado fiable; 3) notas de prensa de nombramiento: no encontradas; ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('A.json', A);

// ---------------- B. Sector y competencia ----------------
const fuentesB = [
  { id: 1, titulo: 'Full Year Results 2025/26', editor: 'Halma plc', tipo: 'Primaria', fecha: '2026-06-11', url: 'https://www.halma.com/news/press-releases/2026/full-year-results-2025-26' },
  { id: 2, titulo: 'Halma plc', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026', url: 'https://en.wikipedia.org/wiki/Halma_plc' },
  { id: 3, titulo: 'ii view: Halma breaks records amid data centre boom', editor: 'interactive investor', tipo: 'Prensa', fecha: '2025-11-20', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-halma-breaks-records-amid-data-centre-boom-ii537315' },
  { id: 4, titulo: 'Halma stock slides as investors question how long photonics can keep powering growth', editor: 'Business News Today', tipo: 'Prensa', fecha: '2026-06', url: 'https://business-news-today.com/halma-stock-slides-as-hlma-investors-question-how-long-photonics-can-keep-powering-growth/' },
  { id: 5, titulo: 'Halma H2 Earnings Call Highlights', editor: 'Nasdaq', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.nasdaq.com/articles/halma-h2-earnings-call-highlights' },
  { id: 6, titulo: 'Halma (fotónica): análisis del negocio de centros de datos', editor: 'The Armchair Trader', tipo: 'Prensa', fecha: '2026', url: 'https://www.thearmchairtrader.com/uk-shares/halma-plc-photonics/' },
  { id: 7, titulo: 'Halma Full Year Results 2024/25', editor: 'Halma plc', tipo: 'Primaria', fecha: '2025-06-12', url: 'https://halma.com/news/press-releases/2025/full-year-results-2024-25' },
];
const B = {
  historia: {
    resumen: 'Halma nació en 1894 en Malasia como Halma Tea Plantations y en los años setenta se convirtió en un grupo industrial británico de empresas de seguridad y detección compradas una a una [2]. Su modelo es descentralizado: unas 50 filiales con dirección propia, agrupadas en tres sectores (Seguridad, Medio ambiente y análisis, Salud), y un centro pequeño que compra empresas de nicho y reasigna la caja [2, 1]. Andrew Williams la dirigió de 2005 a 2023; Marc Ronchetti, antes director financiero, es el cuarto primer ejecutivo en 50 años [2]. En 2025-26 la fotónica para centros de datos convirtió un negocio de crecimiento medio en uno que crece al 15 % [1, 3].',
    hitos: [
      { anio: '1894', hito: 'Fundación como Halma Tea Plantations (Malasia) [2].' },
      { anio: '1972', hito: 'Primeras compras industriales en el Reino Unido: nace el grupo de seguridad y detección [2].' },
      { anio: '2005', hito: 'Andrew Williams, primer ejecutivo; Halma acelera las compras de nichos de salud y medio ambiente [2].' },
      { anio: '2022', hito: 'Venta de Texecom con una plusvalía de 34,0 M [2].' },
      { anio: '2023', hito: 'Marc Ronchetti sustituye a Andrew Williams como primer ejecutivo [2].' },
      { anio: '2025', hito: 'La fotónica para un cliente de hiperescala dispara el crecimiento: Medio ambiente y análisis crece un 19 % orgánico en FY2025 [7, 3].' },
      { anio: '2026', hito: 'Primer año con más de 2.500 M de ingresos; compra de E2S (230 M) y récord de 447 M en compras [1].' },
      { anio: '2026', hito: 'Junio: la guía de fotónica (+30 % frente a +52 %) hunde la acción un 15 % en un día [4].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Halma es un grupo de unas 50 empresas que fabrican equipos de nicho para la seguridad, el medio ambiente y la salud [2, 1]. Seguridad vende detección de incendios y gases, señalización de alarmas, seguridad de puertas y de máquinas a instaladores, constructoras e industria. Medio ambiente y análisis vende fotónica (componentes ópticos para centros de datos), análisis óptico, medición del agua y sensores ambientales; en FY2026 ingresó 1.040 M (+34 %) [5]. Salud vende diagnóstico de laboratorio, oftalmología y sensores para equipos médicos. Los clientes son fabricantes de equipos, laboratorios, hospitales y empresas reguladas; las filiales venden con marca propia y cada una dirige su canal [2].',
    como_gana_dinero: 'Cada filial lidera un nicho pequeño y regulado (normas de incendio, seguridad industrial, sanidad), donde el producto es una parte pequeña del coste del cliente y el coste de fallar es alto: eso da poder de precios y márgenes EBIT ajustados del 22-23 % [1]. Buena parte de los ingresos es de reposición y mantenimiento por normativa, lo que suaviza el ciclo. El crecimiento combina un orgánico del 5-10 % con compras de nichos pagadas con la caja (447 M en FY2026) [1]. La excepción es la fotónica: crece con la inversión de un solo cliente de hiperescala (≈ 20 % de los ingresos del grupo), más cíclica y concentrada que el resto [3, 5].',
    clientes: 'La base de clientes es amplia y atomizada en Seguridad y Salud, pero el grupo tiene ya una concentración significativa: un cliente de hiperescala (no nombrado; la prensa apunta a Google) supuso en torno al 20 % de los ingresos de FY2026, frente al 15 % de FY2025 y ≈ 12 % de FY2024 [3, 5, 6]. La relación es de colaboración técnica con propiedad intelectual del cliente, lo que crea dependencia en ambos sentidos [5]. El poder de precios del resto se ve en el margen: el EBIT ajustado pasó del 21,6 % al 23,0 % en un año con inflación de costes, y la guía de FY2027 sube a 23,5-24 % por mezcla y precio [1]. No hay datos de renovación ni de duración de contratos.',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Halma no compite en un mercado único sino en decenas de nichos de equipos de seguridad, medición ambiental y tecnología médica, sobre todo en Europa y EE. UU. No se ha encontrado una cifra de tamaño de mercado que corresponda a su perímetro; se usa la descripción cualitativa y los datos de la propia empresa [1, 2].',
    tamano: null, unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Normativa de seguridad, salud y medio ambiente más exigente', efecto: '+', horizonte: 'Estructural', evidencia: 'Demanda de reposición obligatoria; crecimiento en los tres sectores en FY2026 [1].' },
      { driver: 'Inversión en centros de datos (fotónica)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Fotónica +52 % en FY2026 y +30 % guiado para FY2027; un cliente pesa ≈ 20 % [4, 5].' },
      { driver: 'Envejecimiento y gasto sanitario', efecto: '+', horizonte: 'Estructural', evidencia: 'Salud recuperó en la segunda mitad de FY2025 tras la debilidad de los clientes fabricantes [7].' },
      { driver: 'Tipos de interés y construcción', efecto: '−', horizonte: 'Cíclico', evidencia: 'La parte de Seguridad ligada a obra nueva sufre con tipos altos (bono británico por encima del 5 %).' },
      { driver: 'Libra fuerte frente a dólar y euro', efecto: '−', horizonte: 'Cíclico', evidencia: 'La empresa estima −8 M de ingresos y −2 M de beneficio en FY2027 por divisa [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Nichos pequeños con pocos rivales especializados; los márgenes de Halma (23 %) lo reflejan [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Bajo en los nichos regulados; alto en fotónica, donde un cliente pesa ≈ 20 % del grupo [3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Componentes electrónicos y ópticos estándar; sin cuellos de botella declarados (la capacidad no limita, según la dirección) [5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Certificaciones y homologaciones (incendio, ATEX, médico) y marcas reconocidas por los instaladores.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Riesgo tecnológico en fotónica (cambio de arquitectura óptica del cliente); bajo en seguridad y salud.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El grupo encadena 23 años de beneficio récord, lo que incluye 2008-09 y 2020, cuando el beneficio ajustado aún subió (FY2021: beneficio ajustado antes de impuestos +4 %) [1, 2]. En 2022 la acción cayó un 31 % por la subida de tipos, sin caída del beneficio. Hoy el ciclo lo marca la inversión en centros de datos, en plena expansión, y la construcción, débil por el bono británico por encima del 5 %.' },
    regulacion: 'La demanda de Seguridad descansa en normas de incendios, gases y seguridad de máquinas (en el Reino Unido, el endurecimiento tras Grenfell con la Building Safety Act de 2022), y la de Salud en la regulación de productos sanitarios (MDR europeo, FDA), que encarece la entrada pero también la certificación de los productos propios. No se han encontrado cambios normativos en tramitación que muevan las cifras a 12 meses.',
    tendencias: 'Tres tendencias favorecen al grupo: la digitalización de sensores (más contenido electrónico por instalación), la descarbonización (medición de emisiones y agua) y la inversión en centros de datos, que ha llevado a la fotónica a crecer un 52 % en FY2026 [5]. La última es también el riesgo: depende de la arquitectura de un solo cliente, y un cambio de proveedor o de tecnología se notaría en un 20 % de los ingresos [3, 4].',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Líder o número dos en muchos nichos pequeños (detección de gases, señalización de alarmas en zonas peligrosas, seguridad de puertas, componentes ópticos); sin cuota de grupo publicada [1, 2].',
    competidores: [
      { nombre: 'AMETEK', pais: 'EE. UU.', ticker: 'AME', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Conglomerado de instrumentación con el mismo modelo de compras de nichos; mucho mayor.' },
      { nombre: 'Roper Technologies', pais: 'EE. UU.', ticker: 'ROP', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compradora en serie, hoy más de software; referencia de modelo descentralizado.' },
      { nombre: 'Spirax Group', pais: 'Reino Unido', ticker: 'SPX', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ingeniería de nichos (vapor, bombas); competidor por capital en el FTSE 100.' },
      { nombre: 'Rotork', pais: 'Reino Unido', ticker: 'ROR', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Actuadores de válvulas; coincide en clientes industriales y de agua.' },
      { nombre: 'Honeywell (Building Automation e Industrial Automation)', pais: 'EE. UU.', ticker: 'HON', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidor directo en detección de incendios y gases.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: productos físicos sin red de usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Productos homologados e integrados en instalaciones y equipos del cliente; en fotónica, desarrollo conjunto con la propiedad intelectual del cliente [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Certificaciones (incendio, ATEX, médicas) y marcas de nicho; margen EBIT ajustado del 23 % [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Sin ventaja de coste: filiales pequeñas; el margen viene del precio, no del coste.' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nichos demasiado pequeños para atraer a un segundo o tercer competidor grande.' },
      ],
    },
    amenazas: 'La amenaza principal es la concentración en un cliente de fotónica: si cambia de tecnología, internaliza la producción o diversifica proveedores, Halma perdería una parte de ≈ 20 % de sus ingresos con un margen probablemente superior a la media [3, 4]. Probabilidad media a tres años. En el resto, el riesgo es pagar más por las compras (E2S a 5,2 veces ventas) y diluir la rentabilidad del capital [1].',
    confianza: 'Baja',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El grupo se presenta como una empresa con propósito («un futuro más seguro, limpio y sano») y una parte de sus ingresos procede de medición ambiental y del agua [1, 2]. Los asuntos que mueven cifras son dos: la seguridad del producto en sanidad (retiradas o sanciones regulatorias) y la exposición de la fotónica al consumo energético de los centros de datos. No se han encontrado calificaciones ESG fechadas ni datos de emisiones en las fuentes accesibles.',
    controversias: 'No se han encontrado sanciones, litigios ni incidentes relevantes en los últimos tres años en las fuentes revisadas.',
    confianza: 'Baja',
  },
  fuentes: fuentesB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño y crecimiento del mercado (dos fuentes), CR5', tipo: 'Núcleo', intentos: `1) informe anual de Halma (mercados por sector): sin acceso; 2) estudios de mercado de detección de gases, incendios y fotónica: perímetros que no corresponden al grupo; 3) estimación por suma de nichos: sin datos fiables; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos, cuota y margen EBIT de los competidores', tipo: 'Núcleo', intentos: `1) informes anuales de AMETEK, Roper, Spirax y Rotork: sin acceso; 2) Stock Analysis y MarketScreener: solo múltiplos en los extractos; 3) prensa: sin cifras comparables; ${SIN_RED}`, decision: 'Omitido; se dan los competidores sin cifras' },
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics, CDP)', tipo: 'Complemento', intentos: `1) informe de sostenibilidad de Halma: sin acceso; 2) búsqueda de calificaciones: sin resultados fechados; 3) proveedores ESG: requieren registro; ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('B.json', B);

// ---------------- C. Equipo y gobierno ----------------
const fuentesC = [
  { id: 1, titulo: 'Result of AGM (23-jul-2026)', editor: 'Halma plc / Investegate', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://www.investegate.co.uk/announcement/rns/halma--hlma/result-of-agm/9684789' },
  { id: 2, titulo: 'Halma AGM result 2025', editor: 'Halma plc', tipo: 'Primaria', fecha: '2025-07-24', url: 'https://www.halma.com/~/media/Files/H/Halma/Corp-V2/agm-information/halma-agm-result-2025.pdf' },
  { id: 3, titulo: 'AGM alert: find out how much these three CEOs earn', editor: 'interactive investor', tipo: 'Prensa', fecha: '2025-07', url: 'https://ii.co.uk/analysis-commentary/agm-alert-find-out-how-much-these-three-ceos-earn-ii532246' },
  { id: 4, titulo: 'Director/PDMR Shareholding (Jennifer Ward, 24-jul-2026)', editor: 'Halma plc / Investegate', tipo: 'Primaria', fecha: '2026-07-24', url: 'https://www.investegate.co.uk/announcement/rns/halma--hlma/director-pdmr-shareholding/9687172' },
  { id: 5, titulo: 'IN BRIEF: Halma divisional CEO sells £693,345 worth shares', editor: 'AJ Bell (Alliance News)', tipo: 'Prensa', fecha: '2026', url: 'https://www.ajbell.co.uk/news/articles/brief-halma-divisional-ceo-sells-ps693345-worth-shares' },
  { id: 6, titulo: 'London Briefing: Halma and Asos promote within for new leaders', editor: 'AJ Bell (Alliance News)', tipo: 'Prensa', fecha: '2022-11', url: 'https://www.ajbell.co.uk/articles/latestnews/245767/london-briefing-halma-and-asos-promote-within-new-leaders' },
  { id: 7, titulo: 'Halma: estructura accionarial', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2026-02-25', url: 'https://simplywall.st/stocks/gb/tech/lse-hlma/halma-shares/ownership' },
  { id: 8, titulo: 'Director/PDMR Shareholding (Jennifer Ward, 26-sep-2025)', editor: 'Halma plc / ticker.app', tipo: 'Primaria', fecha: '2025-09-26', url: 'https://www.ticker.app/lse/HLMA/rns/2025-09-26/DirectorPDMR-Shareholding/0141B' },
  { id: 9, titulo: 'Full Year Results 2025/26', editor: 'Halma plc', tipo: 'Primaria', fecha: '2026-06-11', url: 'https://www.halma.com/news/press-releases/2026/full-year-results-2025-26' },
  { id: 10, titulo: 'Trading Update (12-mar-2026)', editor: 'Halma plc / ticker.app', tipo: 'Primaria', fecha: '2026-03-12', url: 'https://www.ticker.app/lse/HLMA/rns/2026-03-12/Trading-Update/3015W' },
  { id: 11, titulo: 'Trading Update (24-sep-2026)', editor: 'Halma plc / Investegate', tipo: 'Primaria', fecha: '2026-09-24', url: 'https://www.investegate.co.uk/announcement/rns/halma--hlma/trading-update/9787947' },
  { id: 12, titulo: 'Full Year Results 2024/25', editor: 'Halma plc', tipo: 'Primaria', fecha: '2025-06-12', url: 'https://halma.com/news/press-releases/2025/full-year-results-2024-25' },
];
const C = {
  directivos: {
    equipo: [
      { nombre: 'Marc Ronchetti', cargo: 'Group Chief Executive', desde: '2023', participacion_pct: null, trayectoria: 'Director financiero del grupo antes de ser nombrado primer ejecutivo en abril de 2023, el cuarto en 50 años [6]. Con él, los ingresos pasaron de 1.853 M (FY2023) a 2.582 M (FY2026) y el EBIT ajustado creció un 22 % en FY2026 [9].' },
      { nombre: 'Jennifer Ward', cargo: 'Chief Talent, Culture and Communications Executive', desde: null, participacion_pct: null, trayectoria: 'Miembro del comité ejecutivo; vendió 21.393 acciones por 0,78 M en julio de 2026 y 15.000 por 0,51 M en septiembre de 2025 [4, 8].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Marzo de 2026: crecimiento orgánico de la mitad de la decena y margen EBIT ajustado ≈ 22 % [10]', real: 'Ingresos +15 %, margen EBIT ajustado 23,0 % (22,7 % sin extraordinarios) [9]', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Crecimiento orgánico de un dígito alto y margen en el rango de 19-21 % (objetivo de la empresa) [12]', real: 'Ingresos +11 %, beneficio ajustado antes de impuestos +16 % [12]', cumplida: 'Sí' },
      { anio: 'FY2027 (en curso)', guia: 'Junio de 2026: orgánico de doble dígito bajo; margen ≈ 22,7 %; subida el 24-sep-2026 a 23,5-24 % [11]', real: 'Pendiente (resultados del 1S el 19-nov-2026)', cumplida: 'Parcial' },
    ],
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Marc Ronchetti', cargo: 'Group Chief Executive', tipo: 'Ejecutivo', desde: '2023', comisiones: null },
      { nombre: 'Giles Kerr', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 92.79, voto_remuneracion_contra_pct: 7.21, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 5.0, fijo: 1.01, variable_corto: 1.8, variable_largo: 2.2, ratio_salario_medio: null },
    remuneracion: 'El primer ejecutivo cobró unos 5,0 M en FY2025 (3,75 M el año anterior), la cifra más alta para el cargo en una década: 1,8 M de bonus anual (95 % del máximo) en efectivo y acciones diferidas y 2,2 M de incentivo a largo plazo con una consolidación del 85,72 % [3]. El salario base subió un 8 %, hasta 1,01 M [3]. El bonus anual depende en un 90 % del beneficio económico (valor económico añadido) frente al promedio de tres años, una métrica que penaliza comprar caro [3]. En la junta de 2026 el informe de remuneración recibió un 7,21 % en contra (4,68 % en 2025 y 4,85 % en 2024): sube la oposición, pero lejos del 20 % [1, 2]. No se ha encontrado la cifra de FY2026 ni las cláusulas de recuperación.',
    accionistas: [],
    insiders: [
      { fecha: '2026-07-23', persona: 'Jennifer Ward (comité ejecutivo)', operacion: 'Venta', acciones: 21393, importe: 0.78 },
      { fecha: '2025-09-25', persona: 'Jennifer Ward (comité ejecutivo)', operacion: 'Venta', acciones: 15000, importe: 0.51 },
      { fecha: '2026', persona: 'Primer ejecutivo de un sector (división)', operacion: 'Venta', acciones: 17530, importe: 0.69 },
    ],
    control_y_defensas: 'Halma no tiene accionista de control ni clases de acciones: una acción, un voto, y un accionariado institucional disperso (los 25 primeros sumaban el 48,4 % a principios de 2026, según Simply Wall St) [7]. No se han encontrado pactos, blindajes ni operaciones vinculadas relevantes. Los consejeros fueron reelegidos con entre el 96,5 % y el 99,4 % a favor en julio de 2026 [1].',
    alertas: ['Ventas repetidas de acciones por miembros del comité ejecutivo (unos 2 M en 12 meses), sin compras que las compensen [4, 5, 8].', 'El voto en contra del informe de remuneración subió al 7,21 % en 2026 tras una remuneración del primer ejecutivo récord en FY2025 [1, 3].'],
    confianza: 'Baja',
  },
  fuentes: fuentesC,
  huecos: [
    { seccion: 'gobierno', campo: 'composición completa del consejo, presidente, comisiones y antigüedad', tipo: 'Núcleo', intentos: `1) informe anual FY2026 (gobierno corporativo): sin acceso; 2) resultado de la junta de 2026: solo el rango de votos de reelección; 3) prensa y agregadores (Simply Wall St, MarketScreener): extractos sin la lista; ${SIN_RED}`, decision: 'Omitido; se dan el primer ejecutivo y el consejero con menos apoyo en la junta' },
    { seccion: 'gobierno', campo: 'participaciones significativas (TR-1) y autocartera', tipo: 'Núcleo', intentos: `1) TR-1 del 24-jun-2026 en el RNS: la búsqueda da el título, no el contenido; 2) Simply Wall St y TipRanks: nombres sin porcentajes coherentes; 3) Fidelity (datos de 2025): cifras incoherentes; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'directivos', campo: 'director financiero, participación del primer ejecutivo y remuneración de FY2026', tipo: 'Núcleo', intentos: `1) informe de remuneraciones FY2026: sin acceso; 2) MarketScreener (ficha de Marc Ronchetti): sin participación en el extracto; 3) prensa de la junta de 2026: sin cifra; ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('C.json', C);

// ---------------- D. Mercado y valoración ----------------
const fuentesD = [
  { id: 1, titulo: 'Halma raises profit margin guidance after strong first half (precio 3.634 p el 24-sep-2026; cierre previo 3.584 p)', editor: 'DirectorsTalk Interviews', tipo: 'Prensa', fecha: '2026-09-24', url: 'https://www.directorstalkinterviews.com/halma-raises-profit-margin-guidance-after-strong-first-half/4121263699' },
  { id: 2, titulo: 'Halma plc: ficha de cotización (rango de 52 semanas)', editor: 'Halifax Share Dealing', tipo: 'Datos de mercado', fecha: '2026-08-20', url: 'https://www.investments.halifax.co.uk/share-centre/details/?csid=10207' },
  { id: 3, titulo: 'Halma (LON:HLMA): acciones en circulación y capitalización', editor: 'Stockopedia', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://www.stockopedia.com/share-prices/halma-LON:HLMA/' },
  { id: 4, titulo: 'Halma (LON:HLMA) forecast: recomendaciones y precios objetivo', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-07-24', url: 'https://www.marketbeat.com/stocks/LON/HLMA/forecast' },
  { id: 5, titulo: 'Halma plc: finanzas y previsiones del consenso FY2027-FY2028', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-07', url: 'https://in.marketscreener.com/quote/stock/HALMA-PLC-9590130/finances/' },
  { id: 6, titulo: 'Halma plc: valoración y dividendo (consenso)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-07', url: 'https://in.marketscreener.com/quote/stock/HALMA-PLC-9590130/valuation-dividend/' },
  { id: 7, titulo: 'Consensus forecasts (recopilado por la empresa)', editor: 'Halma plc', tipo: 'Primaria', fecha: '2025-07-11', url: 'https://halma.com/investors/consensus-forecasts' },
  { id: 8, titulo: 'Halma outpaces expectations', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://uk.marketscreener.com/quote/stock/HALMA-PLC-9590130/news/Halma-outpaces-expectations-50233790/' },
  { id: 9, titulo: 'Halma plc (HLMAF): histórico mensual de precios', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026-03', url: 'https://www.digrin.com/stocks/detail/HLMAF/price' },
  { id: 10, titulo: 'U.S. Dollar / British Pound: tipos de referencia del Banco de Inglaterra 2026', editor: 'Pound Sterling Live', tipo: 'Datos de mercado', fecha: '2026-03-31', url: 'https://www.poundsterlinglive.com/bank-of-england-spot/historical-spot-exchange-rates/usd/USD-to-GBP-2026' },
  { id: 11, titulo: 'British Pound to US Dollar history 2012-2024', editor: 'Pound Sterling Live', tipo: 'Datos de mercado', fecha: '2024-03', url: 'https://poundsterlinglive.com/best-exchange-rates/british-pound-to-us-dollar-history' },
  { id: 12, titulo: 'British Pound / US Dollar: tipos de referencia del Banco de Inglaterra 2025', editor: 'Pound Sterling Live', tipo: 'Datos de mercado', fecha: '2025-03-26', url: 'https://www.poundsterlinglive.com/bank-of-england-spot/historical-spot-exchange-rates/usd/GBP-to-USD-2025' },
  { id: 13, titulo: 'UK Gilt Yields Ease but September Selloff Deepens', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-09-30', url: 'https://tradingeconomics.com/united-kingdom/government-bond-yield/news/588169' },
  { id: 14, titulo: 'AMETEK: valoración (PER 2026e y 2027e del consenso)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-09', url: 'https://ca.marketscreener.com/quote/stock/AMETEK-INC-11635/valuation/' },
  { id: 15, titulo: 'AME: capitalización y PER', editor: 'Dividend.watch', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://dividend.watch/symbol/AME-NYSE' },
  { id: 16, titulo: 'Roper Technologies (ROP): cotización y múltiplos', editor: 'Benzinga', tipo: 'Datos de mercado', fecha: '2026-09-04', url: 'https://www.benzinga.com/quote/rop' },
  { id: 17, titulo: 'Rotork plc (ROR.L): estadísticas', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-08-21', url: 'https://finance.yahoo.com/quote/ROR.l' },
  { id: 18, titulo: 'Spirax Group (SPXSF): estadísticas', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://finance.yahoo.com/quote/SPXSF' },
  { id: 19, titulo: 'Indutrade AB: valoración (PER 2026e y 2027e)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-02', url: 'https://www.marketscreener.com/quote/stock/INDUTRADE-AB-6498214/valuation/' },
  { id: 20, titulo: 'Diploma PLC (DPLM): PER adelantado', editor: 'Wealthyhood', tipo: 'Datos de mercado', fecha: '2026', url: 'https://wealthyhood.com/en/stocks/dplm.lse' },
  { id: 21, titulo: 'Diploma PLC (DPLM.L): capitalización', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-08-24', url: 'https://finance.yahoo.com/q?s=DPLM.L' },
  { id: 22, titulo: 'Recommended cash acquisition of Spectris plc by KKR', editor: 'Spectris plc / Investegate', tipo: 'Primaria', fecha: '2025-07-02', url: 'https://www.investegate.co.uk/announcement/rns/spectris--sxs/recommended-cash-acquisition/8958672' },
  { id: 23, titulo: 'Halma plc expands safety sector with £230m acquisition of E2S Group', editor: 'AskTraders', tipo: 'Prensa', fecha: '2025-12-05', url: 'https://www.asktraders.com/analysis/halma-plc-expands-safety-sector-with-230m-acquisition-of-e2s-group/' },
  { id: 24, titulo: 'Halma buys lab sample management company Dreampath Diagnostics', editor: 'AJ Bell (Alliance News)', tipo: 'Prensa', fecha: '2026-07-07', url: 'https://www.ajbell.co.uk/news/articles/halma-buys-lab-sample-management-company-dreampath-diagnostics' },
  { id: 25, titulo: 'National Instruments: Form 8-K, acuerdo de compra por Emerson (60 USD por acción, 8.200 M)', editor: 'National Instruments / SEC', tipo: 'Primaria', fecha: '2023-04-12', url: 'https://www.sec.gov/Archives/edgar/data/935494/000114036123017910/brhc20051360_ex99-1.htm' },
  { id: 26, titulo: 'Emerson acquires NI for $8.2 billion (ingresos 2022 de 1.660 M USD)', editor: 'EV Tech Insider', tipo: 'Prensa', fecha: '2023-04', url: 'https://evtechinsider.beehiiv.com/p/emerson-acquires-ni-national-instruments-for-8-2-billion' },
  { id: 27, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 28, titulo: 'British device maker Halma\'s shares slump on slower annual growth forecast (Reuters)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://uk.marketscreener.com/news/british-device-maker-halma-s-shares-slump-on-slower-annual-growth-forecast-ce7f5cdbd08cf220' },
  { id: 29, titulo: 'Halma: PER histórico (media de diez años)', editor: 'Wisesheets', tipo: 'Datos de mercado', fecha: '2026-06', url: 'https://www.wisesheets.io/pe-ratio/HLMAF' },
  { id: 30, titulo: 'Halma PLC (LSE:HLMA): cotización a 17-jul-2026', editor: 'Kalkine Media', tipo: 'Datos de mercado', fecha: '2026-07-17', url: 'https://kalkinemedia.com/ca/companies/lon-hlma' },
];
// PER histórico estatutario: precio de marzo de HLMAF (USD, Digrin) ÷ tipo GBP/USD (Pound Sterling Live) ÷ BPA estatutario.
const D = {
  identificacion: {
    nombre: 'Halma plc', nombre_corto: 'Halma', ticker: 'HLMA', isin: 'GB0004052071', mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Tecnología de la información / Industria', industria: 'Equipos e instrumentos electrónicos', sede: 'Amersham (Inglaterra)', fundacion: '1894', empleados: null, web: 'www.halma.com',
    precio: 36.34, fecha_precio: '2026-09-24', acciones: 378.0, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: 49.02, min_52s: 31.94, volumen_medio_diario: null, proximos_resultados: '2026-11-19',
  },
  consenso: {
    guidance: 'Para FY2027 (abril de 2026 a marzo de 2027) la empresa guía un crecimiento orgánico a tipo constante de «doble dígito bajo», con unos 5 puntos de la fotónica (≈ +30 %), y un margen EBIT ajustado del 23,5-24 %, subido el 24 de septiembre de 2026 desde ≈ 22,7 %; la divisa resta unos 8 M de ingresos y 2 M de beneficio [1, 8]. El objetivo de medio plazo es crecer el beneficio un 10 % anual con un margen del 19-21 % (ya superado) y una rentabilidad del capital invertido por encima del 12 % [7, 8].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 2922, ebitda: 728.1, ebit: null, bpa: 1.16, dpa: 0.279, fuente: 'MarketScreener [5, 6]' },
      { periodo: 'FY2028e', ingresos: 3138, ebitda: 787.7, ebit: null, bpa: 1.26, dpa: 0.297, fuente: 'MarketScreener [5, 6]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 6, mantener: 3, vender: 1, po_medio: 48.09, po_min: 30.50, po_max: null },
    revisiones: 'Tras los resultados de junio las estimaciones de BPA de FY2027 subieron: el BPA ajustado de FY2026 (114,05 p) superó el consenso de 110,7 p y el EBIT ajustado el de 567,9 M [8]. La subida de la guía de margen del 24 de septiembre (de ≈ 22,7 % a 23,5-24 %) debería añadir un 3-5 % al beneficio de FY2027 que el consenso de MarketScreener de julio aún no recoge. Los precios objetivo están muy dispersos: Jefferies 30,50 GBP (vender) y Citi 46,00 GBP (comprar) en junio [4]. Solo hay una fuente con estimaciones completas (MarketScreener); el objetivo medio de MarketBeat (48,09 GBP) no se ha podido contrastar y parece alto frente a los de los bancos citados.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: null, rentabilidades: [], anual: [],
    beta: null, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null,
    comentario: 'La acción tocó un máximo de 49,02 GBP en la primavera de 2026, impulsada por la fotónica, y cayó un 15 % el 11 de junio (hasta ≈ 39,6 GBP) cuando la empresa guió una fotónica que crecerá la mitad que el año anterior [28, 2]. Desde entonces se ha movido entre 34,9 y 36,8 GBP; el 24 de septiembre cotizaba a 36,34 GBP tras subir la guía de margen [1, 30]. Está un 26 % por debajo del máximo de 52 semanas pese a un beneficio por acción que crece más del 20 %: el mercado ha recortado el múltiplo, no las cifras.',
    confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2024', precio_cierre: 23.74, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 25.90, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 37.83, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Baja',
  },
  comparables: {
    empresas: [
      { nombre: 'AMETEK', ticker: 'AME', pais: 'US', capitalizacion: 43290, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 31.0, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Roper Technologies', ticker: 'ROP', pais: 'US', capitalizacion: 29840, ev_ventas: null, ev_ebitda_ltm: 12.3, ev_ebitda_ntm: null, per_ntm: 17.4, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Rotork', ticker: 'ROR', pais: 'GB', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 27.7, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Spirax Group', ticker: 'SPX', pais: 'GB', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 21.6, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Indutrade', ticker: 'INDT', pais: 'SE', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 28.0, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Diploma', ticker: 'DPLM', pais: 'GB', capitalizacion: 9660, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 27.2, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
    ],
    confianza: 'Baja',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-07', objetivo: 'Spectris (instrumentos de precisión, Reino Unido)', comprador: 'KKR', ev: 4700, ev_ventas: null, ev_ebitda: 19.5, prima_pct: null, excluir: false, comentario: '19,5 veces el EBITDA ajustado y 23,0 veces el EBIT ajustado de 2024, según el anuncio de la oferta [22].' },
      { fecha: '2025-12', objetivo: 'E2S Group (señalización en zonas peligrosas)', comprador: 'Halma', ev: 230, ev_ventas: 5.2, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Libre de caja y deuda; ingresos previstos de 2025 ≈ 44 M [23].' },
      { fecha: '2026-07', objetivo: 'Dreampath Diagnostics (gestión de muestras de laboratorio)', comprador: 'Halma', ev: 132, ev_ventas: 4.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago inicial de 154 M EUR sobre ingresos previstos de 33 M EUR; hasta 121 M EUR más ligados a resultados [24].' },
      { fecha: '2023-04', objetivo: 'National Instruments (instrumentos de medida, EE. UU.)', comprador: 'Emerson', ev: 6150, ev_ventas: 4.9, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de las acciones 8.200 M USD (≈ 6.150 M GBP) sobre ingresos de 2022 de 1.660 M USD; múltiplo de capital, sin la deuda neta [25, 26].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fuentesD,
  huecos: [
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026', tipo: 'Núcleo', intentos: `1) bolsa.mjs (Yahoo HLMA.L): sin red; 2) búsquedas de la cotización de octubre (AJ Bell, Halifax, InvestSmart, eToro, LSE): páginas sin fecha o de agosto; 3) crónicas de mercado de octubre: no mencionan Halma; ${SIN_RED}`, decision: 'Se usa el último precio con fecha encontrado: 3.634 p el 24-sep-2026 (estimación del precio de hoy)' },
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad, caída máxima, posición corta', tipo: 'Complemento', intentos: `1) bolsa.mjs: sin red; 2) WebFetch a Yahoo: bloqueado; 3) búsquedas de la beta y de la posición corta (FCA): sin cifras fechadas; ${SIN_RED}`, decision: 'Omitido; beta del WACC estimada (ver dcf.justificacion)' },
    { seccion: 'multiplos_historicos', campo: 'precios de cierre en peniques FY2018-FY2023', tipo: 'Complemento', intentos: `1) bolsa.mjs: sin red; 2) búsqueda de cierres de marzo en GBp: no aparecen; 3) HLMAF (USD) de Digrin con el tipo de cambio de cada cierre: tipo de 2022 y 2023 no encontrado; ${SIN_RED}`, decision: 'Omitido; FY2024-26 derivados de HLMAF en USD con el tipo de cambio (estimación)' },
    { seccion: 'comparables', campo: 'capitalización, EV/EBITDA, crecimiento, margen y ROIC de los comparables a la misma fecha', tipo: 'Núcleo', intentos: `1) MarketScreener de cada comparable: solo PER en los extractos; 2) Yahoo, Benzinga, Dividend.watch: múltiplos sueltos de fechas distintas (junio-octubre); 3) Stock Analysis: sin acceso; ${SIN_RED}`, decision: 'Omitido; comparables solo con PER de los próximos 12 meses' },
    { seccion: 'consenso', campo: 'estimaciones FY2029e y segunda fuente de estimaciones', tipo: 'Complemento', intentos: `1) página de consenso de Halma: datos de julio de 2025; 2) MarketScreener: solo FY2027-28 con cifras; 3) Investing y Stockopedia: cifras sin ejercicio claro; ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('D.json', D);

// ---------------- E. Sentimiento ----------------
const fuentesE = [
  { id: 1, titulo: 'Is this FTSE 100 stock at an attractive entry point? (comentario tras la caída del 15 %)', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-06-17', url: 'https://www.ii.co.uk/analysis-commentary/ftse-100-stock-attractive-entry-point-ii539391' },
  { id: 2, titulo: 'Halma stock slides as investors question how long photonics can keep powering growth', editor: 'Business News Today', tipo: 'Foros y redes', fecha: '2026-06', url: 'https://business-news-today.com/halma-stock-slides-as-hlma-investors-question-how-long-photonics-can-keep-powering-growth/' },
  { id: 3, titulo: 'Halma: valoración y narrativas de la comunidad', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://simplywall.st/stocks/us/tech/otc-hlma.f/halma/valuation' },
  { id: 4, titulo: 'Halma: calificación «strongly overvalued»', editor: 'TheScreener (vía tradedirect)', tipo: 'Foros y redes', fecha: '2026-01', url: 'https://cug.tradedirect.ch/td/details/thescreener/387465,361,402?lang=en_GB' },
  { id: 5, titulo: 'HLMA: noticias y lista de convicción de Goldman Sachs (julio de 2026)', editor: 'Fintel', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://fintel.io/s/gb/hlma' },
  { id: 6, titulo: 'Halma notes / MoneyAM: crónica de la caída del 11-jun-2026', editor: 'MoneyAM', tipo: 'Foros y redes', fecha: '2026-06-11', url: 'https://old.moneyam.com/action/news/showArticle?id=7366125' },
];
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'interactive investor (columna y comentarios tras la caída)', fecha: '2026-06', n_comentarios: 5, tono: 'Dividido', resumen: 'Plantea si la caída del 15 % es una oportunidad: recoge que UBS ve la acción «claramente atractiva» y que la caída devolvió dos meses de mejor comportamiento, frente a quienes creen que la fotónica ya tocó techo [1].' },
      { plataforma: 'Business News Today (debate de inversores)', fecha: '2026-06', n_comentarios: 4, tono: 'Negativo', resumen: 'El debate gira en torno a cuánto puede durar el empuje de la fotónica y a la dependencia de un solo cliente de hiperescala [2].' },
      { plataforma: 'Simply Wall St (valoración y narrativas de la comunidad)', fecha: '2026-07', n_comentarios: 3, tono: 'Negativo', resumen: 'Las valoraciones por flujos de la comunidad sitúan el valor razonable muy por debajo del precio y dan una nota de valoración de 1 sobre 6 [3].' },
      { plataforma: 'TheScreener y Fintel (seguimiento de particulares)', fecha: '2026-07', n_comentarios: 2, tono: 'Dividido', resumen: 'Conviven la etiqueta de «muy sobrevalorada» de un filtro cuantitativo y la entrada en la lista de convicción de Goldman Sachs como «compounder» de máxima calidad, muy citada por particulares [4, 5].' },
      { plataforma: 'MoneyAM (crónicas y comentarios del día)', fecha: '2026-06', n_comentarios: 3, tono: 'Negativo', resumen: 'Comentarios centrados en la guía de fotónica como decepción, pese a que los resultados superaron previsiones [6].' },
    ],
    temas: [
      { tema: 'Dependencia de la fotónica y de un cliente de hiperescala', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos dan la razón a la preocupación: el cliente pasó del ≈ 12 % al ≈ 20 % de los ingresos en dos años y la fotónica aportó unos 8 puntos del crecimiento de FY2026. Lo recogemos en el escenario bajista.' },
      { tema: 'Valoración exigente (PER por encima de 30)', postura: 'Bajista', peso: 'Alto', contraste: 'Coincide con nuestro DCF: el precio pide más crecimiento del que financia la rentabilidad del capital de Halma con un bono británico por encima del 5 %.' },
      { tema: 'Calidad y historial (23 años de beneficio récord)', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: beneficio récord cada año desde 2003 y margen EBIT ajustado del 23 %. La calidad no se discute; el precio sí.' },
      { tema: 'Caída de junio como punto de entrada', postura: 'Dividida', peso: 'Medio', contraste: 'La acción está un 26 % por debajo del máximo, pero el PER estatutario sobre FY2026 sigue en ≈ 37 veces; la caída corrigió el múltiplo de la fotónica, no lo hizo barato.' },
    ],
    lectura: 'El sentimiento de los particulares está dividido y ha empeorado desde junio: la caída del 15 % rompió la idea de que Halma es un valor que solo sube, y el debate se ha movido de la calidad del negocio a la dependencia de la fotónica [1, 2]. No hay euforia ni capitulación: la acción no se ha hundido más tras junio y la subida de la guía de margen apenas la movió. Coincide con nuestra lectura (calidad alta, precio exigente) y no anticipa un riesgo que el informe no recoja; sí confirma que el catalizador a vigilar es la fotónica en los resultados del 19 de noviembre. Reddit y Stocktwits no dieron hilos útiles.',
    confianza: 'Baja',
  },
  fuentes: fuentesE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit, Stocktwits, LSE Chat y ADVFN', tipo: 'Complemento', intentos: `1) búsqueda de hilos de r/UKInvesting sobre Halma: sin resultados; 2) Stocktwits y LSE Chat: sin páginas en los resultados de búsqueda; 3) Motley Fool UK (2026): sin artículos en los resultados; ${SIN_RED}`, decision: 'Omitido; se usan columnas con comentarios y plataformas de particulares' },
  ],
};
w('E.json', E);
console.log('Notas A-E escritas');
