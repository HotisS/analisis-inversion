// Escribe las notas A-E de Pernod Ricard (corte 2026-10-14) a partir de resultados de búsqueda web (único acceso de red en este entorno).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'FY26 Sales and Results: Financial Communication (presentación de resultados del ejercicio a 30-jun-2026)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-08-27', url: 'https://www.pernod-ricard.com/system/files/2026-08/Pernod%20Ricard%20FY26%20Financial%20Communication.pdf' },
  { id: 2, titulo: 'Pernod Ricard FY26 profit, sales drop; sees flat organic sales in FY27, growth in mid term', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://www.rttnews.com/3685164/pernod-ricard-fy26-profit-sales-drop-sees-flat-organic-sales-in-fy27-growth-in-mid-term.aspx?type=bn' },
  { id: 3, titulo: 'Pernod Ricard FY26 profits slide on US and China weakness', editor: 'Hargreaves Lansdown', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://www.hl.co.uk/shares/stock-market-news/company--news/pernod-ricard-fy26-profits-slide-on-us-and-china-weakness' },
  { id: 4, titulo: 'Pernod Ricard FY26 Results: Net profit down 19%, FCF up 6%', editor: 'ScanX', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://scanx.trade/stock-market-news/companies/pernod-ricard-fy26-results-net-profit-down-19-fcf-up-6/49354656' },
  { id: 5, titulo: 'FY25 Sales and Results (nota de prensa, 28-ago-2025)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-08-28', url: 'https://www.pernod-ricard.com/sites/default/files/news/downloads/2025-08/2025%2008%2028%20FY%2025%20Sales%20and%20Results.pdf' },
  { id: 6, titulo: 'Management Report FY25', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-09', url: 'https://www.pernod-ricard.com/sites/default/files/inline-files/Management%20Report%20FY25.PDF' },
  { id: 7, titulo: 'Consolidated financial statements FY25 (balance y estado de flujos)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-09', url: 'https://www.pernod-ricard.com/sites/default/files/inline-files/Consolidated%20financial%20statements%20FY25.PDF' },
  { id: 8, titulo: 'Press Release FY24 Full Year', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2024-08-29', url: 'https://pernod-ricard.com/sites/default/files/news/downloads/2024-08/Press%20Release%20FY24%20Full%20Year%20-%20ENG.pdf' },
  { id: 9, titulo: 'Management Report FY24', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2024-09', url: 'https://pernod-ricard.com/sites/default/files/inline-files/Management%20Report%20FY24.pdf' },
  { id: 10, titulo: 'Pernod Ricard FY23 Full-year Sales and Results', editor: 'Pernod Ricard (Business Wire)', tipo: 'Primaria', fecha: '2023-08-30', url: 'https://www.businesswire.com/news/home/20230830970537/en/Pernod-Ricard-FY23-Full-year-Sales-and-Results' },
  { id: 11, titulo: 'Management Report FY23', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2023-09', url: 'https://www.pernod-ricard.com/sites/default/files/inline-files/15.1_Management_Report_FY23%5B1%5D.pdf' },
  { id: 12, titulo: 'FY22 Full-year Sales and Results', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2022-08-31', url: 'https://www.pernod-ricard.com/en/media/fy22-full-year-sales-and-results' },
  { id: 13, titulo: 'Pernod Ricard SA (EPA:RI), income statement (anual)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-07-27', url: 'https://stockanalysis.com/quote/epa/RI/financials/income-statement/' },
  { id: 14, titulo: 'H1 FY26 Sales and Results (nota de prensa)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-02-19', url: 'https://www.pernod-ricard.com/sites/default/files/news/downloads/2026-02/Pernod%20Ricard%20Press%20Release%20H1%20FY26.pdf' },
  { id: 15, titulo: 'Pernod Ricard: net debt / equity', editor: 'Eulerpool', tipo: 'Datos de mercado', fecha: '2026-09', url: 'https://eulerpool.com/stock/Pernod-Ricard-Stock-FR0000120693/netdebtequity' },
  { id: 16, titulo: 'Pernod Ricard SA, balance sheet', editor: 'Weiss Ratings', tipo: 'Datos de mercado', fecha: '2026-09', url: 'https://weissratings.com/en/stock/prndy-otc-pk/balance-sheet' },
  { id: 17, titulo: 'Pernod Ricard’s revenue falls below EUR 10 billion', editor: 'Meininger’s', tipo: 'Prensa', fecha: '2026-08-28', url: 'https://www.meininger.de/en/news/pernod-ricards-revenue-falls-below-eur10-billion' },
  { id: 18, titulo: 'Pernod Ricard: Slow start to the year as expected, Q1 organic net sales −7.6 %', editor: 'Pernod Ricard (Business Wire)', tipo: 'Primaria', fecha: '2025-10-15', url: 'https://www.businesswire.com/news/home/20251015117697/en/' },
  { id: 19, titulo: 'Pernod Ricard: Improving momentum with stable organic net sales in Q3', editor: 'Pernod Ricard (Business Wire)', tipo: 'Primaria', fecha: '2026-04-15', url: 'https://www.businesswire.com/news/home/20260415146957/en/' },
  { id: 20, titulo: 'Pernod Ricard: Steering through a transition with agility, discipline and strategic conviction (FY26)', editor: 'Pernod Ricard (Ariva)', tipo: 'Primaria', fecha: '2026-08-27', url: 'https://www.ariva.de/news/pernod-ricard-steering-through-a-transition-with-agility-12116652' },
  { id: 21, titulo: 'Pernod Ricard successfully completes EUR 1.2 bn bond issuance (calificaciones Baa1 / BBB+)', editor: 'Pernod Ricard (Business Wire)', tipo: 'Primaria', fecha: '2025-10-29', url: 'https://www.businesswire.com/news/home/20251029970359/en' },
  { id: 22, titulo: 'Integrated Annual Report FY25', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-09', url: 'https://pernod-ricard.publispeak.com/integrated-annual-report-2024-2025/article/94/' },
];

// BPA y beneficio = base «recurrente» de la empresa (net PRO, grupo); EBIT = resultado operativo recurrente (PRO).
// Amortizaciones: estimación (ver financieros.ajustes). Acciones diluidas = beneficio recurrente ÷ BPA recurrente diluido.
const cuenta = [
  { periodo: 'FY2022', ingresos: 10701, coste_ventas: 4228, gastos_generales: 3449, ebitda: null, amortizaciones: null, ebit: 3024, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 2124, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 8.18, dpa: 4.12, dpa_extraordinario: 0, acciones_diluidas: 259.7 },
  { periodo: 'FY2023', ingresos: 12137, coste_ventas: 4891, gastos_generales: 3898, ebitda: null, amortizaciones: null, ebit: 3348, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: null, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 9.11, dpa: 4.7, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: 'FY2024', ingresos: 11598, coste_ventas: 4623, gastos_generales: 3859, ebitda: null, amortizaciones: null, ebit: 3116, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: null, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.9, dpa: 4.7, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: 'FY2025', ingresos: 10959, coste_ventas: 4443, gastos_generales: 3565, ebitda: null, amortizaciones: null, ebit: 2951, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 1829, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.26, dpa: 4.7, dpa_extraordinario: 0, acciones_diluidas: 251.9 },
  { periodo: 'FY2026', ingresos: 9404, coste_ventas: null, gastos_generales: null, ebitda: 2881, amortizaciones: 458, ebit: 2423, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 1476, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.85, dpa: 4.7, dpa_extraordinario: 0, acciones_diluidas: 252.3 },
];

const A = {
  _estado: 'Completo con lo que permite la búsqueda web (sin acceso a los PDF).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 9404, ebitda: 2881, ebit: 2423, beneficio_neto: 1476, bpa: 5.85, dpa: 4.7, dpa_extraordinario: 0, fcf: 1197, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: 'FY2025', descripcion: 'Venta de la cartera de vinos (Jacob’s Creek, Brancott y otras) y de marcas menores de licores entre FY24 y FY26: efecto perímetro negativo, sin cifras pro forma accesibles [6].' }],
    comentario: 'Las ventas pasaron de 10.701 M EUR en el FY2022 a un máximo de 12.137 M en el FY2023 y caen desde entonces: 11.598 M (FY24, −1 % orgánico), 10.959 M (FY25, −3 % orgánico) y 9.404 M (FY26, −3,9 % orgánico y −14,2 % publicado por divisa y ventas de marcas) [12, 10, 8, 5, 1, 17]. El resultado operativo recurrente bajó de 3.348 M a 2.423 M; el margen del FY26 fue del 25,8 %, 35 puntos básicos menos en orgánico, con recortes de costes de estructura que compensaron aranceles e inflación del coste de los líquidos envejecidos [2, 3, 14]. La caída se concentra en EE. UU. (−14 % orgánico en el FY26, con consumo final en torno a −7 % y desestocaje) y China; sin esos dos mercados las ventas orgánicas subieron un 0,5 % [20]. El BPA recurrente diluido pasó de 9,11 EUR (FY23) a 5,85 EUR (FY26) [11, 9, 5, 2].',
    ajustes: 'La cuenta usa la base recurrente de la empresa: EBIT = «profit from recurring operations» (PRO) y beneficio y BPA = «group share of net profit from recurring operations», diluido. El beneficio publicado es menor por partidas no recurrentes (sobre todo reestructuración del plan de eficiencia y deterioros de marcas): 1.996 M frente a 2.124 M en el FY22, BPA publicado de 8,81 frente a 9,11 en el FY23 y de 5,83 frente a 7,90 en el FY24, 1.626 M frente a 1.829 M en el FY25 y 1.203 M frente a 1.476 M en el FY26 [12, 11, 9, 5, 4]. Esas partidas se repiten casi todos los años, así que el BPA recurrente sobrestima algo el beneficio económico. El coste de ventas y los gastos generales (que incluyen publicidad y promoción) salen del margen bruto publicado por Stock Analysis [13]. El EBITDA del FY26 se deriva de la deuda neta (10.660 M) y del ratio deuda neta/EBITDA de 3,7 veces publicado (estimación propia, ±40 M) [3].',
    confianza: 'Baja',
  },
  trimestres: {
    items: [
      { periodo: '1T26', ingresos: 2384, crecimiento_pct: -14.3, crecimiento_organico_pct: -7.6, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Inferior' },
      { periodo: '1S26', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T26', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: 0, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: 'FY26', ingresos: 9404, crecimiento_pct: -14.2, crecimiento_organico_pct: -3.9, ebitda: 2881, margen_ebitda_pct: 30.6, bpa: 5.85, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En la presentación del FY26 (27-ago-2026) la dirección dio para el FY27 ventas orgánicas «en general estables» en un entorno «contrastado e incierto», con EE. UU. y China todavía en descenso y el resto del mundo creciendo, y mantuvo el objetivo de crecimiento orgánico medio del 3-6 % anual para FY27-FY29, ahora cerca del extremo bajo [2, 20, 1]. El plan de eficiencia de 1.000 M se adelanta a FY26-FY28 (antes FY29), con cerca de la mitad ya entregada, y los costes de estructura bajaron un 8 % en el FY26 [1, 14]. El dividendo se mantiene en 4,70 EUR, con el complementario de 2,35 EUR a elegir en efectivo o en acciones, lo que el mercado leyó como una forma de proteger la caja [3]. En el 3T26 (15-abr-2026) el discurso era de «impulso que mejora» con ventas orgánicas estables; el 4T se vio afectado por el conflicto de Oriente Medio [19, 20]. Las ventas del 1T26 habían caído un 7,6 % orgánico, peor que el −7,1 % del consenso que recopila la empresa [18]. Lo que evita concretar: la fecha de la vuelta al crecimiento en EE. UU. y China y el margen del FY27 (una nota de análisis califica la guía de «imprecisa»).',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: 'FY2022', activo_total: null, activo_corriente: null, pasivo_corriente: null, pasivo_total: null, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 8657, arrendamientos: 0, patrimonio_neto: null, minoritarios: null, reservas: null },
      { periodo: 'FY2023', activo_total: null, activo_corriente: null, pasivo_corriente: null, pasivo_total: null, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 10274, arrendamientos: 0, patrimonio_neto: null, minoritarios: null, reservas: null },
      { periodo: 'FY2024', activo_total: null, activo_corriente: null, pasivo_corriente: null, pasivo_total: null, fondo_comercio: 6806, intangibles: 12234, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 10951, arrendamientos: 0, patrimonio_neto: null, minoritarios: null, reservas: null },
      { periodo: 'FY2025', activo_total: null, activo_corriente: null, pasivo_corriente: null, pasivo_total: null, fondo_comercio: 6406, intangibles: 11515, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 10725, arrendamientos: 0, patrimonio_neto: 15543, minoritarios: null, reservas: null },
      { periodo: 'FY2026', activo_total: null, activo_corriente: null, pasivo_corriente: null, pasivo_total: null, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 10660, arrendamientos: 0, patrimonio_neto: 15014, minoritarios: null, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja de 1.847 M EUR a 30-jun-2025 [7]; la del 30-jun-2026 no está en las fuentes accesibles. En octubre de 2025 colocó 1.000 M EUR en bonos a 7 y 11 años (cupones del 3,25 % y 3,75 %) y 200 M en colocación privada a 2 años: cupón medio del 3,30 % y vida media de 8 años [21].',
    rating: 'Moody’s Baa1 (estable) y S&P BBB+ (estable), según la emisión de octubre de 2025 [21].',
    coste_deuda_pct: 3.3,
    vida_media_anios: null,
    otros_pasivos: 'Las existencias son el gran activo del balance: unos 9.900 M EUR a 30-jun-2025 según un agregador (la mayoría, líquidos en envejecimiento: whisky, coñac), casi un año de ventas [16]. La empresa invirtió 645 M y 557 M en aumentar existencias estratégicas en el FY24 y el FY25, y otros 135 M y 470 M en circulante operativo [7]. No hemos podido leer las notas de provisiones, pensiones y litigios del FY26.',
    comentario: 'La deuda neta publicada (que incluye los arrendamientos) subió de 8.657 M en el FY22 a 10.951 M en el FY24 por recompras, compras de marcas y la acumulación de existencias envejecidas, y desde entonces baja poco: 10.725 M en el FY25 y 10.660 M en el FY26 (−65 M) [12, 8, 3]. Con el EBITDA a la baja, el apalancamiento sube de 2,4 veces (FY22) a 3,7 veces (FY26) [12, 3]. El patrimonio neto (estimación a partir del ratio deuda neta/patrimonio de 0,69 y 0,71 de un agregador) ronda 15.000-15.500 M [15]. Fondo de comercio e intangibles (marcas) suman 17.921 M a 30-jun-2025, la mayor parte del activo no corriente de 24.722 M [6, 7].',
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: 'FY2024', flujo_operativo: 1727, capex: 773, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: 1208, recompras: null, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2025', flujo_operativo: 1788, capex: 667, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: 1201, recompras: null, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'La caja libre (flujo operativo − inversiones) fue de 954 M en el FY24, 1.121 M en el FY25 y 1.197 M en el FY26 (+6 %, conversión del 91 %), con dividendos de unos 1.200 M al año: el dividendo consume toda la caja libre y la deuda apenas baja [7, 4, 3]. La conversión mejora porque la acumulación de existencias envejecidas (645 M en el FY24, 557 M en el FY25) y el capex (773 M y 667 M) bajan tras el pico de inversión del FY24, y la empresa apunta a una conversión ≥ 80 % y unas inversiones estratégicas de unos 750 M [7, 22, 14]. La caja libre recurrente del FY22 fue de 1.926 M, récord [12]. Parte del capex es de crecimiento (destilerías nuevas para whisky irlandés y escocés); no se publica el reparto.',
    confianza: 'Media',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: null,
    comentario: 'No hemos podido leer el informe de auditoría ni las notas del FY26. La señal contable principal es la distancia creciente entre el beneficio recurrente y el publicado: 273 M en el FY26 (1.476 M frente a 1.203 M), 203 M en el FY25 y unos 520 M en el FY24 por reestructuración y deterioros de marcas [4, 5, 9]. Los costes del plan de eficiencia son recurrentes en la práctica. La caja libre (1.197 M) es inferior al beneficio recurrente (1.476 M) y cubre justo el dividendo [4, 3].',
    senales: [
      { senal: 'Partidas «no recurrentes» que se repiten cada año', nivel: 'Media', comentario: 'Diferencia entre beneficio recurrente y publicado de 203-520 M al año en FY24-FY26 [4, 5, 9].' },
      { senal: 'Deterioros de marcas', nivel: 'Media', comentario: 'Intangibles de 11.515 M (FY25) frente a 12.234 M (FY24): ventas de marcas y deterioros [6, 7].' },
    ],
    confianza: 'Baja',
  },
  capital: {
    politica: 'Dividendo del 50 % del beneficio neto recurrente como política declarada, mantenido en 4,70 EUR por acción desde el FY23 aunque el BPA cayó a 5,85 EUR (pago del 80 %); el complementario de 2,35 EUR del FY26 puede cobrarse en acciones [3, 12]. Recompras: unos 750 M en el FY22; no hay programa vigente en las fuentes. Prioridades: reducir deuda, mantener inversiones estratégicas de unos 750 M y dividendo [12, 14].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Brown-Forman (fusión estudiada, sin acuerdo)', importe: null, ev_ebitda: null, financiacion: 'Acciones', resultado: 'Conversaciones confirmadas el 26-mar-2026 y terminadas el 28-abr-2026 sin acuerdo; la acción cayó un 4 % ese día [20].' },
    ],
    comentario: 'Desde 2022 la empresa pagó dividendos y recompras con deuda en lugar de con caja libre: la deuda neta subió 2.000 M entre el FY22 y el FY24 mientras el beneficio recurrente caía de su máximo [12, 8]. El mantenimiento del dividendo con un pago del 80 % y la opción en acciones indican que la caja libre ya no cubre con holgura la remuneración [3]. El intento de fusión con Brown-Forman, abandonado por desacuerdo en el gobierno según la prensa francesa, es la señal de que la dirección busca escala fuera del crecimiento orgánico.',
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'resultado financiero, impuestos y minoritarios por año', tipo: 'Núcleo', intentos: '1) Búsqueda de la presentación FY26 y de los informes de gestión FY22-FY25 (los PDF no se pueden abrir: solo búsqueda web); 2) Stock Analysis y otros agregadores (solo ventas, margen bruto y resultado operativo); 3) derivación desde el beneficio recurrente: solo sirve para el FY26 en conjunto', decision: 'Omitido' },
    { seccion: 'balance', campo: 'balance completo (activo, pasivo, caja, existencias) FY22-FY26', tipo: 'Núcleo', intentos: '1) Estados consolidados FY25 y FY26 de la empresa (no accesibles); 2) agregadores (Weiss, TipRanks, Eulerpool: cifras sueltas y sin fecha clara); 3) derivación desde deuda neta y ratios', decision: 'Calculado y marcado como estimación' },
    { seccion: 'flujos', campo: 'flujos FY22, FY23 y FY26 completos', tipo: 'Núcleo', intentos: '1) Estado de flujos FY26 (no accesible); 2) búsqueda de capex y flujo operativo del FY26 en prensa; 3) caja libre publicada (1.197 M) en financieros.ltm', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'auditor y opinión', tipo: 'Complemento', intentos: '1) Documento de registro universal FY26 (no accesible); 2) búsqueda de prensa; 3) informe de gobierno', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos por región con resultado', tipo: 'Núcleo', intentos: '1) Presentación FY26 (no accesible); 2) búsqueda de ventas por región FY26; 3) notas de prensa del 1T y 3T', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia (reutiliza la investigación del análisis de Diageo del 12-oct)
const dB = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'diageo-2026-10-12', 'notas', 'B.json'), 'utf8'));
const sector = JSON.parse(JSON.stringify(dB.sector));
sector.definicion = 'Mercado relevante: bebidas espirituosas de marca internacional (whisky escocés e irlandés, coñac, vodka, ginebra, ron, anisados) y champán, donde Pernod Ricard es el n.º 2 mundial detrás de Diageo [10, 1]. No hay una serie gratuita del valor mundial de los espirituosos: la serie usa EE. UU. (ingresos de los productores, DISCUS), el primer mercado de Pernod y el que más cae [17, 10]. Como contraste se dan las exportaciones de whisky escocés (Scotch Whisky Association) [19] y los volúmenes mundiales de IWSR [20]. El valor mundial de toda la bebida alcohólica fue de 1,17 billones de USD en 2022 (IWSR, citado por Diageo) [7].';
const competidores = [
  { nombre: 'Diageo', pais: 'Reino Unido', ticker: 'DGE.L', ingresos: 16844, cuota_pct: null, margen_ebit_pct: 28.9, comentario: 'N.º 1 mundial (Johnnie Walker, Smirnoff, Guinness, Don Julio). FY26 (a junio de 2026): ventas de 19.643 M USD y resultado operativo antes de partidas excepcionales de 5.683 M USD; convertido a 1,1662 USD/EUR (media BCE del ejercicio) [1, 2, 21].' },
  ...dB.competencia.competidores.filter((c) => !/Pernod/.test(c.nombre)).map((c) => ({ ...c, ingresos: Math.round(c.ingresos / 1.1662) })),
];
const B = {
  _estado: 'Sector y competidores tomados del análisis de Diageo del 12-oct-2026 (mismas fuentes, investigadas hace dos días); ingresos de los competidores pasados a EUR a 1,1662 USD/EUR.',
  historia: {
    resumen: 'Pernod Ricard nace en 1975 de la fusión de Pernod y Ricard, dos casas de anís de Marsella y París. Se hizo global con compras: Irish Distillers (Jameson) en 1988, parte de Seagram (Chivas, Martell) en 2001, Allied Domecq (Ballantine’s, Beefeater, Kahlúa) en 2005 y Vin & Sprit (Absolut) en 2008, esta última con mucha deuda. La familia Ricard conserva la presidencia y un bloque de referencia; Alexandre Ricard es presidente y consejero delegado desde 2015. Desde 2023 las ventas caen por la normalización tras la pandemia, el desestocaje en EE. UU. y la debilidad de China; en 2025-26 vendió la cartera de vinos y estudió sin éxito una fusión con Brown-Forman [10].',
    hitos: [
      { anio: '1975', hito: 'Fusión de Pernod y Ricard.' },
      { anio: '1988', hito: 'Compra de Irish Distillers (Jameson).' },
      { anio: '2001', hito: 'Compra de parte de los activos de Seagram (Chivas Regal, Martell).' },
      { anio: '2005', hito: 'Compra de Allied Domecq con Fortune Brands.' },
      { anio: '2008', hito: 'Compra de Vin & Sprit (Absolut) por unos 5.600 M EUR.' },
      { anio: '2015', hito: 'Alexandre Ricard, presidente y consejero delegado.' },
      { anio: '2023', hito: 'Máximo de ventas: 12.137 M EUR.' },
      { anio: '2026', hito: 'Conversaciones de fusión con Brown-Forman (marzo-abril), terminadas sin acuerdo.' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Segundo grupo mundial de bebidas espirituosas: Absolut, Jameson, Chivas Regal, Ballantine’s, Martell, Royal Salute, The Glenlivet, Beefeater, Malibu, Havana Club, Ricard y Perrier-Jouët, además de whiskies indios (Royal Stag, Blenders Pride) [10]. Vende en más de 160 países con distribución propia en casi todos; sus «mercados que hay que ganar» son EE. UU., China e India [10]. Tras vender los vinos, el negocio es casi solo de espirituosos y champán.',
    como_gana_dinero: 'Margen bruto de en torno al 60 % y margen operativo recurrente del 26-28 % por el precio de marca; casi la mitad del valor está en marcas premium envejecidas (whisky, coñac) que exigen años de existencias en balance [10]. La publicidad y promoción es la palanca: un 15 % de las ventas en el FY26 [10]. El margen depende de la mezcla (prestige frente a estándar), del precio en mercados emergentes y del coste del líquido envejecido; la estacionalidad concentra ventas en el primer semestre (Navidad, Año Nuevo chino, Diwali).',
    segmentos: [], geografias: [], geografias_criterio: null,
    clientes: 'Vende a mayoristas y distribuidores (en EE. UU., por el sistema de tres niveles), a la gran distribución, a la hostelería y al travel retail. No hay concentración relevante de clientes. El poder de precios se ha debilitado: en EE. UU. el consumo final cayó en torno a un 7 % en el FY26 y los mayoristas redujeron existencias, y en China el coñac sufrió aranceles antidumping y la caída del consumo de lujo [10, 20, 13].',
    kpis: [
      { kpi: 'Ventas orgánicas', valor_anterior: '−3,0 % (FY25)', valor_actual: '−3,9 % (FY26)', variacion: '−0,9 pp', comentario: 'Sin EE. UU. y China, +0,5 % [10].' },
      { kpi: 'Margen operativo recurrente', valor_anterior: '26,9 % (FY25)', valor_actual: '25,8 % (FY26)', variacion: '−35 pb orgánico', comentario: 'Aranceles y coste de líquidos envejecidos frente a ahorros [10].' },
      { kpi: 'Publicidad y promoción / ventas', valor_anterior: 'n. d.', valor_actual: '15,0 %', variacion: null, comentario: 'Por debajo de lo guiado [10].' },
    ],
    confianza: 'Media',
  },
  sector: { ...sector, confianza: 'Media' },
  competencia: {
    cuota_pct: null,
    posicion: 'N.º 2 mundial en espirituosos de marca internacional, detrás de Diageo (ventas de 9.404 M EUR frente a 16.844 M EUR); n.º 1 en whisky irlandés (Jameson) y n.º 2 en whisky escocés y coñac [10, 1].',
    competidores,
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de bebidas.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El consumidor cambia de marca sin coste; la fidelidad es a la marca, no un coste.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marcas centenarias con margen operativo del 25,8 % frente al 17,7 % de Rémy Cointreau y el 20,9 % de Campari [10, 13, 14]; pero precio/mezcla negativo en EE. UU. y China en el FY26 [10].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en compras y publicidad; el coste del líquido envejecido sube con la inflación [10].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Distribución propia en más de 160 países y existencias envejecidas que un entrante tarda 10-20 años en reunir [10].' },
      ],
    },
    amenazas: 'Primera, la moderación del consumo entre los jóvenes y los GLP-1: IWSR prevé que el volumen mundial siga cayendo hasta 2031 [20]. Segunda, la pérdida de poder de precios en EE. UU. y China, donde Pernod cayó un 14 % y el coñac sufre aranceles [10, 13]. Tercera, los aranceles de EE. UU. del 15 % a los productos de la UE [5]. Cuarta, el desplazamiento hacia las bebidas listas para tomar y el tequila, donde Pernod tiene poca presencia [17]. Probabilidad media-alta de que el margen no recupere el 28 % del FY23.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos materiales son el consumo responsable (regulación de publicidad, impuestos especiales e información sanitaria: en EE. UU. se debatió en 2025 el aviso de cáncer en las etiquetas), el agua y la agricultura (cereal, uva, agave) y el envasado de vidrio, que concentra buena parte de las emisiones del alcance 3 [20, 17].',
    controversias: 'No hemos encontrado sanciones relevantes en tres años en las fuentes accesibles. El principal litigio comercial es la investigación antidumping china sobre el brandy europeo, que impuso depósitos y luego un precio mínimo de importación del coñac [13].',
    confianza: 'Baja',
  },
  fuentes: dB.fuentes,
  huecos: [
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: '1) Informe anual de Pernod (no accesible); 2) IWSR y DISCUS (solo volúmenes y EE. UU.); 3) cociente de ventas frente a un mercado mundial no publicado', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Web de la empresa (no accesible); 2) búsqueda de MSCI y Sustainalytics; 3) informe integrado FY25', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Report of the Board on Corporate Governance', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-09', url: 'https://www.pernod-ricard.com/sites/default/files/inline-files/13.%20Report%20of%20the%20Board%20on%20Corporate%20Governance.pdf' },
  { id: 2, titulo: 'Annual Shareholders’ Meeting of 27 October 2025 (nota de prensa)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-10-27', url: 'https://www.pernod-ricard.com/sites/default/files/2025-10/AGM%20Press%20Release%2027%20October%202025.pdf' },
  { id: 3, titulo: 'Pernod Ricard and Brown-Forman terminate discussions regarding potential combination', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-04-28', url: 'https://www.pernod-ricard.com/en/media/pernod-ricard-and-brown-forman-terminate-discussions-regarding-potential-combination' },
  { id: 4, titulo: 'Le rapprochement entre Pernod Ricard et Brown-Forman a achoppé sur la gouvernance', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-04-29', url: 'https://www.abcbourse.com/marches/le-rapprochement-entre-pernod-ricard-et-brown-forman-a-achoppe-sur-la-gouvernanc_696015' },
  { id: 5, titulo: 'Pernod Ricard Annual Shareholders Meeting of 8 November 2024', editor: 'Pernod Ricard (Business Wire)', tipo: 'Primaria', fecha: '2024-11-08', url: 'https://www.businesswire.com/news/home/20241108512064/en/Pernod-Ricard-Annual-Shareholders-Meeting-of-8-November-2024' },
  { id: 6, titulo: 'Pernod Ricard meldet Umsatzrückgang: CEO schließt neue Brown-Forman-Gespräche aus', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://goldesel.de/aktien/news/pernod-ricard-meldet-umsatzruckgang-ceo-schliesst-neue-brown-forman-gesprache-aus' },
  { id: 7, titulo: 'FY26 Sales and Results (nota de prensa)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-08-27', url: 'https://www.webdisclosure.com/press-release/pernod-ricard-epa-ri-inside-information-news-release-on-accounts-results-gblpv5P9kYB' },
];
const C = {
  _estado: 'Parcial: sin acceso al informe de gobierno ni a la BDIF de la AMF.',
  directivos: {
    equipo: [
      { nombre: 'Alexandre Ricard', cargo: 'Presidente y consejero delegado', desde: '2015', participacion_pct: null, trayectoria: 'Nieto del fundador Paul Ricard; en el grupo desde 2003 (Irish Distillers, director general delegado). Bajo su mandato las ventas llegaron a un máximo de 12.137 M (FY23) y han vuelto a 9.404 M en el FY26 [1, 7].' },
    ],
    historial_guidance: [
      { anio: 'FY2024', guia: 'Crecimiento orgánico de ventas bajo de un dígito y margen estable o mejor', real: 'Ventas −1 % orgánico; resultado operativo +1,5 % orgánico', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: 'Ventas orgánicas a la baja de un dígito bajo y margen defendido', real: 'Ventas −3 % orgánico; margen −0,8 % orgánico en resultado', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Mejora a lo largo del año; caída de ventas en el 1T', real: 'Ventas −3,9 % orgánico (1T −7,6 %, 3T estable)', cumplida: 'Parcial' },
    ],
    comentario: 'Dirección familiar estable y sin rotación en la cúpula; la credibilidad sufrió por el objetivo de crecimiento a medio plazo del 4-7 % (luego 3-6 %), que no se ha cumplido ningún año desde el FY24 y que ahora se sitúa «cerca del extremo bajo» [7, 6]. El consejero delegado descartó retomar la fusión con Brown-Forman [6]. No hemos podido verificar el plan de sucesión.',
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Alexandre Ricard', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Société Paul Ricard (representante permanente)', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Patricia Ricard Giron', cargo: 'Consejera', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'César Giron', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Patricia Barbizet', cargo: 'Consejera coordinadora', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y gobierno' },
      { nombre: 'Albert Baladi', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Jean Lemierre', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'Las juntas de noviembre de 2024 y octubre de 2025 aprobaron la remuneración de Alexandre Ricard del ejercicio anterior y la política futura [5, 2]; no hemos podido leer los porcentajes de voto ni el detalle de métricas del variable. La próxima junta es el 20-nov-2026 [7].',
    accionistas: [
      { nombre: 'Familia Ricard (Société Paul Ricard y miembros)', pct: null, tipo: 'Familiar', variacion: 'Sin cambios conocidos' },
    ],
    insiders: [],
    control_y_defensas: 'La familia Ricard controla de hecho la presidencia y la dirección: presidente-consejero delegado de la familia, representante de Société Paul Ricard y otros consejeros de la familia en el consejo, con un consejero coordinador independiente [1]. Los estatutos franceses dan derecho de voto doble a las acciones nominativas con más de dos años, lo que refuerza a la familia. Según la prensa francesa, la fusión con Brown-Forman (otra empresa familiar) fracasó por la gobernanza: quién mandaría en el grupo resultante [4, 3].',
    alertas: ['Presidente y consejero delegado en la misma persona, vinculada a la familia de referencia [1].', 'La fusión con Brown-Forman se rompió por el reparto de poder, no por el precio, según la prensa [4].'],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'participación de la familia, votos de remuneración y remuneración del consejero delegado', tipo: 'Núcleo', intentos: '1) Informe del consejo sobre gobierno (no accesible); 2) búsqueda de declaraciones de derechos de voto y actas de junta; 3) prensa', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (BDIF AMF)', tipo: 'Complemento', intentos: '1) API de la BDIF (red cerrada); 2) búsqueda web de declaraciones de directivos; 3) prensa', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const dD = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'heineken-2026-10-14', 'notas', 'D.json'), 'utf8'));
const fD = [
  { id: 1, titulo: 'Comparables de bebidas a 12-oct-2026 (MarketScreener, convertido a EUR a 1,1181 USD/EUR), tomados del análisis de Heineken y de Diageo del repositorio', editor: 'MarketScreener / análisis de Heineken del 14-oct-2026', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.marketscreener.com/quote/stock/PERNOD-RICARD-4681/finances/' },
  { id: 2, titulo: 'Pernod Ricard S.A. (RI.PA), price history (mensual, precio real y ajustado)', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.digrin.com/stocks/detail/RI.PA/price' },
  { id: 3, titulo: 'Pernod Ricard SA (PRNDY), price history (ADR, para junio de 2022)', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.digrin.com/stocks/detail/PRNDY/price' },
  { id: 4, titulo: 'Pernod Ricard stock breaks through 60 EUR and signs a multi-year low', editor: 'Idéal Investisseur', tipo: 'Prensa', fecha: '2026-09', url: 'https://www.ideal-investisseur.fr/en/actions-b/pernod-ricard-stock-breaks-through-60-eur-and-signs-a-multi-year-low/24806.html' },
  { id: 5, titulo: 'Pernod Ricard: ficha de cotización (precio, objetivo de Jefferies, calendario)', editor: 'Idéal Investisseur', tipo: 'Prensa', fecha: '2026-09-15', url: 'https://www.ideal-investisseur.fr/en/stocks/pernod-ricard-FR0000120693.html' },
  { id: 6, titulo: 'UBS lowers price target on Pernod Ricard (75 EUR, neutral)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-09', url: 'https://uk.marketscreener.com/news/ubs-lowers-price-target-on-pernod-ricard-ce7d51dfdd8bf625' },
  { id: 7, titulo: 'Pernod Ricard fällt nach FY26-Zahlen: Jefferies senkt Kursziel auf 90 Euro', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-08-28', url: 'https://goldesel.de/aktien/news/pernod-ricard-fallt-nach-fy26-zahlen-jefferies-senkt-kursziel-auf-90-euro' },
  { id: 8, titulo: 'Pernod Ricard (nota de resultados FY26: PER FY27 de 11,6 y rentabilidad por dividendo del 6,5 %)', editor: 'AlphaValue', tipo: 'Analistas', fecha: '2026-08-27', url: 'https://www.alphavalue.com/Blog/-pernod-ricard' },
  { id: 9, titulo: 'Pernod Ricard SA (EPA:RI): valoración y objetivo de consenso', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.simplywall.st/stock/ENXTPA/RI' },
  { id: 10, titulo: 'Pernod Ricard (EPA:RI), estadísticas (acciones en circulación 251,87 M)', editor: 'Fintel', tipo: 'Datos de mercado', fecha: '2026-08-28', url: 'https://fintel.io/s/gb/0hat' },
  { id: 11, titulo: 'Rendimiento del Bund a 10 años (3,53 %, 12-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://www.bundesbank.de/en/statistics/money-and-capital-markets/interest-rates-and-yields' },
  { id: 12, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 13, titulo: 'Transacciones del sector de bebidas (Asahi-EABL, Campari-Courvoisier, Caffo-Cinzano, Diageo-Don Papa, Diageo-Aviation), recogidas en el análisis de Diageo del 12-oct-2026', editor: 'Análisis de Diageo del repositorio (notas de prensa de las partes)', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://www.diageo.com/en/news-and-media/press-releases' },
  { id: 14, titulo: 'Pernod Ricard shares drop 2.18 % to EUR 64.62, down 33.7 % over one year', editor: 'Idéal Investisseur', tipo: 'Prensa', fecha: '2026-09-15', url: 'https://www.ideal-investisseur.fr/en/actions-b/pernod-ricard-shares-drop-2-18-to-eur64-62-down-33-7-over-one-year/18882.html' },
];
const comps = dD.comparables.empresas.filter((e) => !/Pernod/.test(e.nombre));
comps.push({ nombre: 'Rémy Cointreau', ticker: 'RCO.PA', pais: 'FR', capitalizacion: Math.round(2435 / 1.1181), ev_ventas: 3.07, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: 12.6, per_ntm: 22.9, crecimiento_pct: 3.6, margen_ebitda_pct: 22.6, roic_pct: null, dn_ebitda: 3.26, fcf_yield_pct: 2.5 });
comps.push({ nombre: 'Heineken', ticker: 'HEIA.AS', pais: 'NL', capitalizacion: Math.round(44950 / 1.1181), ev_ventas: 1.78, ev_ebitda_ltm: 8.2, ev_ebitda_ntm: 7.6, per_ntm: 14.5, crecimiento_pct: 3.9, margen_ebitda_pct: 22.5, roic_pct: null, dn_ebitda: 2.17, fcf_yield_pct: 6.5 });
const dDiag = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'diageo-2026-10-12', 'notas', 'D.json'), 'utf8'));
const trans = dDiag.transacciones.operaciones.map((o) => ({ ...o, ev: Math.round(o.ev / 1.1181), comentario: o.comentario.replace(/\s*\[[0-9, ]+\]/g, '') + ' [13]' }));
const D = {
  _estado: 'Precio derivado de la capitalización de MarketScreener del 12-oct (repositorio); sin bolsa.mjs ni históricos diarios en este entorno.',
  identificacion: {
    nombre: 'Pernod Ricard SA', nombre_corto: 'Pernod Ricard', ticker: 'RI', isin: 'FR0000120693', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Consumo básico', industria: 'Bebidas: destiladores y bodegas', sede: 'París', fundacion: '1975', empleados: null, web: 'https://www.pernod-ricard.com',
    precio: 64.0, fecha_precio: '2026-10-12', acciones: 252.3, capitalizacion_publicada: 16144, free_float_pct: null,
    max_52s: null, min_52s: null, volumen_medio_diario: null, proximos_resultados: '2026-10-16',
  },
  consenso: {
    guidance: 'FY27 (julio 2026-junio 2027): ventas orgánicas «en general estables», con EE. UU. y China aún en descenso y crecimiento en el resto del mundo; el margen se defiende con el plan de eficiencia de 1.000 M adelantado a FY26-FY28. A medio plazo (FY27-FY29), crecimiento orgánico medio del 3-6 % anual, ahora «cerca del extremo bajo», y conversión de caja ≥ 80 % [8]. Última confirmación: 27-ago-2026.',
    estimaciones: [],
    recomendaciones: { n_analistas: null, comprar: null, mantener: null, vender: null, po_medio: 80.25, po_min: 75, po_max: 95 },
    revisiones: 'Tras los resultados del FY26 los objetivos bajaron: UBS a 75 EUR desde 87 (neutral; sus BPA de 2026-27 están un 5-6 % por debajo del consenso) [6], Jefferies a 90 y luego a 95 desde 100 (comprar) [7, 5]. La mediana de objetivos era de 80,25 EUR en julio de 2026 [5]. AlphaValue cifra el PER del FY27 en 11,6 veces [8]. No hemos podido leer las estimaciones completas del consenso (MarketScreener no abre en este entorno).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [{ periodo: '1 año', accion_pct: -33.7, indice_pct: null, sector_pct: null }],
    anual: [],
    beta: null, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null,
    comentario: 'La acción cotizaba a 202,40 EUR al cierre de junio de 2023 y a 63,86 EUR al de junio de 2026 [2]: un 68 % menos en tres años. En septiembre de 2026 marcó mínimos de varios años por debajo de 60 EUR (58,92 EUR) tras los resultados del FY26 [4], con una caída del 33,7 % en un año a mediados de septiembre [14]. Explican la caída la normalización del consumo tras la pandemia, la debilidad de EE. UU. y China y la compresión de múltiplos de todo el sector de bebidas alcohólicas.',
    confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2022', precio_cierre: 176.8, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2023', precio_cierre: 202.4, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2024', precio_cierre: 126.7, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 84.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 63.86, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precios de cierre de junio de cada ejercicio (Digrin, precio real) [2]; el de junio de 2022 se estima con el ADR (36,72 USD × 5 acciones por ADR ÷ 1,0387 USD/EUR = 176,8 EUR) [3]. FY2022 y FY2023 se excluyen: son los años de la burbuja de los destilados tras la pandemia (PER sobre el BPA del año siguiente de 19-26 veces).',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Grupos de bebidas alcohólicas con marcas globales: los destiladores cotizados (Diageo, Brown-Forman, Campari, Rémy Cointreau), Constellation Brands y las dos grandes cerveceras (AB InBev y Heineken), todos a 12-oct-2026 con cifras de MarketScreener convertidas a EUR [1]. Fuera LVMH (el lujo pesa el 90 % de su beneficio) y Kweichow Moutai (mercado chino regulado).',
    empresas: comps,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: trans,
    comentario: 'Pocas operaciones de destilados publican el múltiplo de EBITDA. Asahi paga 17 veces el EBITDA ajustado por EABL y Campari pagó unas 17 veces la contribución tras publicidad por Courvoisier (5,3 veces ventas), mientras las marcas de vino y vermú salen a 1,3 veces ventas [13]. Pernod tiene accionista familiar de referencia: una opa hostil es improbable, y la fusión con Brown-Forman se rompió por la gobernanza.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026', tipo: 'Núcleo', intentos: '1) bolsa.mjs (Yahoo bloqueado en este entorno); 2) búsqueda web de la cotización de octubre (sin resultados fechados); 3) capitalización de MarketScreener del 12-oct del repositorio ÷ acciones', decision: 'Calculado y marcado como estimación' },
    { seccion: 'consenso', campo: 'estimaciones de ventas, EBITDA y BPA FY27-FY29', tipo: 'Núcleo', intentos: '1) MarketScreener (no abre); 2) búsqueda web de consenso (Simply Wall St, TipRanks, sin fecha); 3) notas de bancos (solo objetivos)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'beta, volatilidad, rentabilidades anuales e índice', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) búsqueda de beta en agregadores; 3) historial mensual de Digrin (solo precios)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Why I sold Pernod Ricard and downgrade it to a Hold', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2025-10', url: 'https://seekingalpha.com/article/4830823-why-i-sold-pernod-ricard-and-downgrade-it-to-a-hold' },
  { id: 2, titulo: 'Pernod Ricard: diese Zahlen lassen sich nur mit der Dividende schöntrinken', editor: 'stock3', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://stock3.com/news/pernod-ricard-diese-zahlen-lassen-sich-nur-mit-der-dividende-schoentrinken-17259006' },
  { id: 3, titulo: 'Pernod Ricard: comunidad y narrativas de inversores (actualizaciones de objetivos)', editor: 'Simply Wall St Community', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://simplywall.st/community/narratives/fr/food-beverage-tobacco/epa-ri/pernod-ricard-shares/50lbg8us-ri-premium-positioning-and-global-brands-will-drive-resilient-long-term-expansion/updates/15-the-analyst-price-target-for-pernod-ricard-has-been-reduced' },
  { id: 4, titulo: 'Pernod Ricard stock breaks through 60 EUR and signs a multi-year low (comentario de mercado)', editor: 'Idéal Investisseur', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.ideal-investisseur.fr/en/actions-b/pernod-ricard-stock-breaks-through-60-eur-and-signs-a-multi-year-low/24806.html' },
  { id: 5, titulo: 'Down 32 % last year: is Pernod Ricard ready for 2026?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-01', url: 'https://www.tikr.com/blog/down-32-last-year-is-pernod-ricard-ready-for-2026' },
  { id: 6, titulo: 'Pernod Ricard sanctionné en Bourse après l’abandon de son projet de fusion avec Brown-Forman', editor: 'TradingSat (BFM Bourse)', tipo: 'Foros y redes', fecha: '2026-04-29', url: 'https://www.tradingsat.com/pernod-ricard-FR0000120693/actualites/pernod-ricard-pernod-ricard-sanctionne-en-bourse-apres-l-abandon-de-son-projet-de-fusion-avec-brown-forman-1161715.html' },
];
const E = {
  _estado: 'Reddit, Stocktwits y Boursorama no aparecen en la búsqueda; se usan Seeking Alpha, stock3, la comunidad de Simply Wall St y comentarios de mercado franceses.',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículo y comentarios)', fecha: '2025-10', n_comentarios: 20, tono: 'Negativo', resumen: 'El autor vende y rebaja a mantener: la caja libre no cubre el dividendo y la deuda es alta para el beneficio actual; volvería con una valoración menor o tras un recorte del dividendo [1].' },
      { plataforma: 'stock3 (comentario y lectores, Alemania)', fecha: '2026-08', n_comentarios: 10, tono: 'Negativo', resumen: 'Tras el FY26, «las cifras solo se arreglan con el dividendo»; prevé un dividendo menor en 2026 [2].' },
      { plataforma: 'Simply Wall St Community (narrativas)', fecha: '2026-09', n_comentarios: 15, tono: 'Dividido', resumen: 'Narrativas alcistas por marcas premium y emergentes conviven con una cadena de rebajas de objetivos de los analistas [3].' },
      { plataforma: 'Idéal Investisseur y BFM Bourse (comentario de mercado, Francia)', fecha: '2026-09', n_comentarios: 5, tono: 'Negativo', resumen: 'El valor «no encuentra suelo» desde los resultados de agosto; algunos lectores señalan el RSI cerca de sobreventa como posible rebote técnico [4, 6].' },
    ],
    temas: [
      { tema: 'Sostenibilidad del dividendo', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'EE. UU. y China: cuándo toca fondo la demanda', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'Valoración en mínimos de una década', postura: 'Dividida', peso: 'Medio', contraste: null },
      { tema: 'Moderación del consumo y GLP-1', postura: 'Bajista', peso: 'Medio', contraste: null },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comps.length, 'comparables,', trans.length, 'transacciones.');
