// Escribe las notas A-E de Roche (corte 2026-10-14) a partir de lo leído en los resultados de búsqueda.
// Entorno nube: solo WebSearch. Cada cifra lleva la URL de la página que la publica.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (l, o) => fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(o, null, 2), 'utf8');
const SIN_RED = 'entorno nube: solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs sin red)';

// ---------------------------------------------------------------- A. Cuentas
const A = {
  _estado: 'completo con huecos',
  negocio: {
    segmentos: [
      { nombre: 'Farma', descripcion: 'Medicamentos de Genentech (EE. UU.), Roche Pharma y Chugai (Japón, 59,9 %): oncología, neurociencia (Ocrevus), inmunología, oftalmología (Vabysmo) y hemofilia (Hemlibra).', tipo_resultado: null,
        historico: [{ periodo: '2025', ingresos: 47669, resultado: null }] },
      { nombre: 'Diagnóstico', descripcion: 'Analizadores e reactivos de laboratorio central (cobas), diagnóstico molecular, punto de atención y diabetes.', tipo_resultado: null,
        historico: [{ periodo: '2025', ingresos: 13847, resultado: null }] },
      { nombre: 'Royalties y otros ingresos', descripcion: 'Regalías y otros ingresos de explotación (diferencia entre los ingresos totales de Stock Analysis y las ventas del grupo).', tipo_resultado: null,
        historico: [{ periodo: '2025', ingresos: 1840, resultado: null }] },
    ],
    kpis: [
      { kpi: 'Ventas del grupo (M CHF)', valor_anterior: '60.495 (2024)', valor_actual: '61.516 (2025)', variacion: '+2 % en CHF; +7 % a tipo constante', comentario: 'El franco fuerte resta unos 5 puntos [1, 3].' },
      { kpi: 'BPA core diluido (CHF)', valor_anterior: '18,80 (2024)', valor_actual: '19,46 (2025)', variacion: '+4 % en CHF; +11 % a tipo constante', comentario: 'Métrica que guía la dirección y que sigue el consenso [1, 4].' },
      { kpi: 'Beneficio operativo core (M CHF)', valor_anterior: '≈20.800 (2024)', valor_actual: '≈21.800 (2025)', variacion: '+13 % a tipo constante', comentario: 'Margen core sobre ventas ≈35,4 % en 2025 y 39,0 % en el 1S26 [1, 2, 5].' },
      { kpi: 'Ventas 1S26 (M CHF)', valor_anterior: '≈31.000 (1S25)', valor_actual: '30.360 (1S26)', variacion: '−2 % en CHF; +6 % a tipo constante', comentario: 'Farma +6 %, Diagnóstico +3 % a tipo constante [2].' },
    ],
    confianza: 'Media',
  },
  financieros: {
    // Stock Analysis (SWX:ROP), millones de CHF. Ingresos = ventas + royalties y otros ingresos de explotación.
    cuenta: [
      { periodo: '2021', ingresos: 65850, coste_ventas: 19647, gastos_generales: null, ebitda: 22598, amortizaciones: 4443, ebit: 18155, resultado_financiero: -757, bai: 17398, impuestos: 2463, minoritarios: 1005, beneficio_neto: 13930, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 16.2, dpa: 9.3, dpa_extraordinario: 0, acciones_diluidas: 860 },
      { periodo: '2022', ingresos: 65814, coste_ventas: 19737, gastos_generales: null, ebitda: 21320, amortizaciones: 3844, ebit: 17476, resultado_financiero: -1149, bai: 16327, impuestos: 2796, minoritarios: 1110, beneficio_neto: 12421, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 15.37, dpa: 9.5, dpa_extraordinario: 0, acciones_diluidas: 808 },
      { periodo: '2023', ingresos: 60441, coste_ventas: 16357, gastos_generales: null, ebitda: 18859, amortizaciones: 3464, ebit: 15395, resultado_financiero: -1316, bai: 14079, impuestos: 1721, minoritarios: 860, beneficio_neto: 11498, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: 9.6, dpa_extraordinario: 0, acciones_diluidas: null },
      { periodo: '2024', ingresos: 62395, coste_ventas: 16283, gastos_generales: null, ebitda: 16840, amortizaciones: 3423, ebit: 13417, resultado_financiero: -1624, bai: 11793, impuestos: 2606, minoritarios: 910, beneficio_neto: 8277, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 10.32, dpa: 9.7, dpa_extraordinario: 0, acciones_diluidas: 802 },
      { periodo: '2025', ingresos: 63356, coste_ventas: 16645, gastos_generales: 15161, ebitda: 21862, amortizaciones: 3386, ebit: 18476, resultado_financiero: -1503, bai: 16973, impuestos: 3174, minoritarios: 919, beneficio_neto: 12880, gastos_financieros: 1349, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 16.04, dpa: 9.8, dpa_extraordinario: 0, acciones_diluidas: 803 },
    ],
    ltm: { periodo: 'LTM dic-25', fecha_fin: '2025-12-31', ingresos: 63356, ebitda: 21862, ebit: 18476, beneficio_neto: 12880, bpa: 16.04, dpa: 9.8, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: 7, ebitda: null, margen_ebitda_pct: null, bpa: 11.08, vs_consenso: null },
      { periodo: '1S26', ingresos: 30360, crecimiento_pct: -2, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: 10.85, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 92317, activo_corriente: 35627, pasivo_corriente: 38416, pasivo_total: 63972, fondo_comercio: 10809, intangibles: 12117, inmovilizado_material: 24412, existencias: 7715, clientes: 10806, proveedores: 4637, activos_contrato: null, pasivos_contrato: null, caja: 13031, deuda_financiera: 31198, arrendamientos: 1374, patrimonio_neto: 24489, minoritarios: 3856, reservas: null },
      { periodo: '2022', activo_total: 88151, activo_corriente: 33816, pasivo_corriente: 27239, pasivo_total: 56136, fondo_comercio: 10820, intangibles: 9685, inmovilizado_material: 24208, existencias: 8605, clientes: 11606, proveedores: 4556, activos_contrato: null, pasivos_contrato: null, caja: 9800, deuda_financiera: 25351, arrendamientos: 1348, patrimonio_neto: 27992, minoritarios: 4023, reservas: null },
      { periodo: '2023', activo_total: 90468, activo_corriente: 33446, pasivo_corriente: 24824, pasivo_total: 57205, fondo_comercio: 9390, intangibles: 14828, inmovilizado_material: 22939, existencias: 7749, clientes: 11021, proveedores: 4325, activos_contrato: null, pasivos_contrato: null, caja: 10500, deuda_financiera: 29209, arrendamientos: 1641, patrimonio_neto: 29315, minoritarios: 3948, reservas: null },
      { periodo: '2024', activo_total: 101801, activo_corriente: 40036, pasivo_corriente: 27023, pasivo_total: 65640, fondo_comercio: 7876, intangibles: 17303, inmovilizado_material: 23740, existencias: 7606, clientes: 11297, proveedores: 4894, activos_contrato: null, pasivos_contrato: null, caja: 17317, deuda_financiera: 34654, arrendamientos: 1725, patrimonio_neto: 31767, minoritarios: 4394, reservas: null },
      { periodo: '2025', activo_total: 100703, activo_corriente: 38729, pasivo_corriente: 28001, pasivo_total: 62823, fondo_comercio: 7492, intangibles: 19321, inmovilizado_material: 22934, existencias: 7479, clientes: 11506, proveedores: 5779, activos_contrato: null, pasivos_contrato: null, caja: 15476, deuda_financiera: 31636, arrendamientos: 1561, patrimonio_neto: 33802, minoritarios: 4078, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja e inversiones a corto plazo de 15.476 M CHF a dic-25 [6]; deuda neta de la empresa de 22.071 M a jun-26 tras pagar 8.300 M de dividendos (16.160 M a dic-25) [2].',
    rating: null,
    coste_deuda_pct: 4.1,
    vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 20976, capex: 3693, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7844, recompras: 19024, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 17803, capex: 3449, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7514, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 16095, capex: 3742, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7648, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 20094, capex: 3529, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7709, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 18852, capex: 3748, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7789, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    confianza: 'Media',
  },
  calidad: { auditor: null, anios_auditor: null, opinion: null, senales: [], confianza: 'Baja' },
  capital: {
    adquisiciones: [
      { anio: '2021', objetivo: 'Recompra de 53,3 M de acciones al portador a Novartis (amortizadas)', importe: 19024, ev_ebitda: null, financiacion: 'Deuda', resultado: 'El BPA diluido pasó a contar con ≈808 M de acciones frente a 860 M; la familia fundadora ganó peso en el voto [7, 8].' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Roche reports strong 2025 results with 7% sales growth (ad hoc, 29-ene-2026)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://www.roche.com/media/releases/med-cor-2026-01-29' },
    { id: 2, titulo: 'Half Year Report 2026 (hy26e.pdf)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://assets.roche.com/f/176343/x/8a0b362d66/hy26e.pdf' },
    { id: 3, titulo: 'Roche Holding AG (SWX:ROP): income statement, consulta de octubre de 2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/swx/ROP/financials/income-statement/' },
    { id: 4, titulo: 'Finance Report 2022 (fb22e.pdf): BPA core y diluido 2021-2022, dividendos', editor: 'Roche', tipo: 'Primaria', fecha: '2023-02-02', url: 'https://assets.roche.com/f/176343/x/537a274a55/fb22e.pdf' },
    { id: 5, titulo: 'Finance Report 2023 (fb23e.pdf): beneficio operativo core 2023', editor: 'Roche', tipo: 'Primaria', fecha: '2024-02-01', url: 'https://assets.roche.com/f/176343/x/3b1fb647e2/fb23e.pdf' },
    { id: 6, titulo: 'Roche Holding AG (SWX:ROP): balance sheet, consulta de octubre de 2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/swx/ROP/financials/balance-sheet/' },
    { id: 7, titulo: 'Roche to repurchase equity stake held by Novartis (ad hoc, 4-nov-2021)', editor: 'Roche', tipo: 'Primaria', fecha: '2021-11-04', url: 'https://www.roche.com/investors/updates/inv-update-2021-11-04' },
    { id: 8, titulo: 'Roche Holding AG (RHHBY): financials (deuda total con arrendamientos), consulta de octubre de 2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/otc/RHHBY/financials/' },
    { id: 9, titulo: 'Roche Holding AG (SWX:ROP): cash flow statement, consulta de octubre de 2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/swx/ROP/financials/cash-flow-statement/' },
    { id: 10, titulo: 'Roche reports solid results in 2020 (4-feb-2021): BPA core 2019-2020, ventas y beneficio operativo core', editor: 'Roche', tipo: 'Primaria', fecha: '2021-02-04', url: 'https://www.roche.com/media/releases/med-cor-2021-02-04' },
    { id: 11, titulo: 'Roche fact sheet FY 2024 (beneficio operativo core 20.800 M; BPA core 18,80)', editor: 'Roche', tipo: 'Primaria', fecha: '2025-05-06', url: 'https://assets.roche.com/f/176343/x/97e5aea506/20250506_roche-fact-sheet_ir_global_fy-2024_vfinal.pdf' },
    { id: 12, titulo: 'Roche Diagnostics sales decline 3 percent in H1 (China y gripe)', editor: '360Dx', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.360dx.com/molecular-diagnostics/roche-diagnostics-sales-decline-3-percent-h1' },
    { id: 13, titulo: 'Roche Aktie: 30,36 Milliarden CHF Umsatz (1S26)', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.boerse-express.com/news/articles/roche-aktie-3036-milliarden-chf-umsatz-932482' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'gastos_generales 2021-2024 y gastos_financieros 2021-2024; BPA y acciones diluidas de 2023', tipo: 'Complemento', intentos: `1) Finance Reports de Roche: la búsqueda devuelve solo cifras de cabecera; 2) Stock Analysis (SWX:ROP): el extracto da SG&A y gastos por intereses solo de 2025; 3) Stockopedia y Fintel: líneas vacías en el extracto; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'flujos', campo: 'adquisiciones, desinversiones y pagos de arrendamientos 2021-2025', tipo: 'Complemento', intentos: `1) Finance Reports (estado de flujos): no accesibles; 2) Stock Analysis cash flow: el extracto no trae esas filas; 3) prensa de cada compra (Telavant, Carmot, Poseida, 89bio): importes en USD y fechas de cierre sin confirmar; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'flujos', campo: 'dividendos pagados', tipo: 'Complemento', intentos: '1) estado de flujos: no accesible; 2) Stock Analysis: fila no visible; 3) derivado como DPA del ejercicio anterior × acciones diluidas (sin los dividendos a minoritarios de Chugai)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'balance', campo: 'vencimientos, rating y vida media de la deuda', tipo: 'Complemento', intentos: `1) nota de deuda del Finance Report 2025: no accesible; 2) búsqueda de calificación S&P/Moody's: no se hizo por cupo; 3) folletos de bonos: no accesibles; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'calidad', campo: 'auditor y opinión', tipo: 'Complemento', intentos: `1) Finance Report 2025: no accesible; 2) búsqueda no hecha por cupo compartido; 3) ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2021-2024 y resultado por segmento', tipo: 'Complemento', intentos: '1) Finance Reports: solo ventas 2025 de Farma y Diagnóstico en el comunicado; 2) Stock Analysis no desglosa; 3) informes semestrales: sin acceso al texto', decision: 'Omitido' },
  ],
};
w('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const B = {
  historia: {
    hitos: [
      { anio: '1896', hito: 'Fritz Hoffmann-La Roche funda la empresa en Basilea; la familia fundadora conserva hoy la mayoría del voto [3].' },
      { anio: '2001', hito: 'Novartis compra un 33 % de las acciones al portador, que mantendrá veinte años [2].' },
      { anio: '2009', hito: 'Compra del resto de Genentech, la base de la oncología y de la biotecnología del grupo.' },
      { anio: '2021', hito: 'Recompra por 19.024 M CHF del paquete de Novartis (53,3 M de acciones al portador), amortizado [2].' },
      { anio: '2023', hito: 'Thomas Schinecker pasa a consejero delegado y Severin Schwan a presidente; compras de Telavant y Carmot (obesidad) [4].' },
      { anio: '2026', hito: 'Los bonos de disfrute (Genussscheine, ROG) se canjean 1 por 1 por bonos de participación (Partizipationsscheine, ROP) desde el 17 de marzo [1].' },
    ],
    confianza: 'Media',
  },
  sector: {
    drivers: [
      { driver: 'Precios de medicamentos en EE. UU. (acuerdos de nación más favorecida, IRA)', efecto: '−', horizonte: 'Estructural', evidencia: 'El sector cotizó a 12x beneficios en el mínimo de principios de 2025 y a ≈14x a comienzos de 2026 tras los acuerdos de precios con la Administración estadounidense (Jefferies) [5].' },
      { driver: 'Vencimiento de patentes y biosimilares', efecto: '−', horizonte: 'Estructural', evidencia: 'Roche cifra el impacto de las pérdidas de exclusividad en ≈700 M CHF en 2025 y ≈1.000 M en 2026 [6].' },
      { driver: 'Reformas de precios del diagnóstico en China', efecto: '−', horizonte: 'Cíclico', evidencia: '−131 M CHF en las ventas de Diagnóstico del 1S26 [7].' },
      { driver: 'Nuevas clases terapéuticas (obesidad, Alzheimer, oncología oral)', efecto: '+', horizonte: 'Estructural', evidencia: 'CT-388 dio una pérdida de peso del 22,5 % corregida por placebo en fase II; fase III desde 2026 [8].' },
    ],
    confianza: 'Baja',
  },
  competencia: {
    competidores: [
      { nombre: 'Novartis', pais: 'Suiza', ticker: 'NOVN', ingresos: 44048, cuota_pct: null, margen_ebit_pct: null, comentario: 'Farma pura; ventas de los últimos 12 meses de 56.690 M USD (≈44.050 M CHF) y margen EBITDA del 40,7 % [9].' },
      { nombre: 'AstraZeneca', pais: 'Reino Unido', ticker: 'AZN', ingresos: 47684, cuota_pct: null, margen_ebit_pct: null, comentario: 'Oncología como Roche; 61.370 M USD (≈47.680 M CHF), margen EBITDA del 33 % [9].' },
      { nombre: 'Merck & Co', pais: 'EE. UU.', ticker: 'MRK', ingresos: 51725, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en inmunooncología (Keytruda frente a Tecentriq); 66.570 M USD (≈51.730 M CHF) [9].' },
      { nombre: 'Sanofi', pais: 'Francia', ticker: 'SAN', ingresos: 43427, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inmunología y vacunas; 55.890 M USD (≈43.430 M CHF), margen EBITDA del 27,7 % [9].' },
      { nombre: 'Abbott (diagnóstico)', pais: 'EE. UU.', ticker: 'ABT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Principal rival en laboratorio central e inmunoensayos, junto a Siemens Healthineers y Danaher.' },
    ],
    confianza: 'Baja',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: [
    { id: 1, titulo: 'Roche schafft den Genussschein ab: was sich für die Anleger und die Firma ändert', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.cash.ch/news/top-news/roche-schafft-den-genussschein-ab-was-sich-fur-die-anleger-und-die-firma-andert-916592' },
    { id: 2, titulo: 'Roche to repurchase equity stake held by Novartis', editor: 'Roche', tipo: 'Primaria', fecha: '2021-11-04', url: 'https://www.roche.com/media/releases/med-cor-2021-11-04' },
    { id: 3, titulo: 'Roche: nach Aktienverkauf eines Familienmitglieds behält Hoffmann-Clan die Mehrheit', editor: 'cash.ch', tipo: 'Prensa', fecha: '2023', url: 'https://www.cash.ch/news/top-news/roche-nach-aktienverkauf-eines-familienmitglieds-behalt-hoffmann-clan-die-mehrheit-578274' },
    { id: 4, titulo: 'Roche to acquire Carmot Therapeutics', editor: 'Roche', tipo: 'Primaria', fecha: '2023-12-04', url: 'https://www.roche.com/media/releases/med-cor-2023-12-04' },
    { id: 5, titulo: 'JPMorgan identifies top EU pharma, biotech and life sciences stocks poised for 2026 growth (incluye la nota de Jefferies)', editor: 'Pharma Focus Europe', tipo: 'Analistas', fecha: '2026-03', url: 'https://www.pharmafocuseurope.com/news/jpmorgan-identifies-top-eu-pharma-biotech-life-sciences-stocks-poised-for-2026-growth' },
    { id: 6, titulo: 'Roche Holding AG Q4 2025 Earnings Call Transcript', editor: 'Insider Monkey', tipo: 'Prensa', fecha: '2026-01-29', url: 'https://www.insidermonkey.com/blog/roche-holding-ag-otcrhhby-q4-2025-earnings-call-transcript-1685269/' },
    { id: 7, titulo: 'Roche Diagnostics sales decline 3 percent in H1', editor: 'GenomeWeb', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.genomeweb.com/molecular-diagnostics/roche-diagnostics-sales-decline-3-percent-h1' },
    { id: 8, titulo: 'Roche update: CT-388 y riesgos de biosimilares (narrativa)', editor: 'Simply Wall St', tipo: 'Analistas', fecha: '2026-07', url: 'https://www.simplywall.st/narratives/0uadpeuv-update-for-roche-holding' },
    { id: 9, titulo: 'Comparables farmacéuticos (cuentas de 12 meses, ROIC y flujo libre) recogidos en el informe de Novo Nordisk del 8-oct-2026 (Stock Analysis y MarketScreener)', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado farmacéutico y de diagnóstico in vitro, serie, TCAC, CR5 y Porter', tipo: 'Núcleo', intentos: `1) IQVIA Global Use of Medicines y EvaluatePharma: no accesibles; 2) búsqueda de tamaño del diagnóstico in vitro: no hecha por el cupo compartido de búsquedas; 3) informe anual de Roche (estimación propia de mercado): no accesible; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota de mercado de Roche y márgenes EBIT de los competidores', tipo: 'Núcleo', intentos: '1) informes anuales de los competidores: no accesibles; 2) Stock Analysis da EBITDA, no EBIT, en el extracto; 3) prensa: sin cifras comparables', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG y controversias', tipo: 'Complemento', intentos: `1) MSCI y Sustainalytics: no consultados por cupo; 2) informe de sostenibilidad: no accesible; 3) ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  directivos: {
    equipo: [
      { nombre: 'Thomas Schinecker', cargo: 'Consejero delegado', desde: '2023', participacion_pct: null, trayectoria: 'Venía de dirigir Roche Diagnostics. Con él, el grupo ha recortado proyectos de I+D y ha comprado activos de obesidad (Carmot, Zealand en alianza) [2, 3].' },
      { nombre: 'Severin Schwan', cargo: 'Presidente', desde: '2023', participacion_pct: null, trayectoria: 'Consejero delegado de 2008 a 2023; reelegido presidente en 2026 con el 97,75 % de los votos [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ventas: crecimiento de un dígito medio a tipo constante; BPA core: de un dígito alto a dos dígitos bajos', real: 'Ventas +7 %, BPA core +11 % a tipo constante', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas: un dígito medio; BPA core: un dígito alto (tipo constante); dividendo al alza', real: '1S26: ventas +6 %, BPA core +9 % a tipo constante (guía confirmada)', cumplida: 'Parcial' },
    ],
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Severin Schwan', cargo: 'Presidente', tipo: 'Otro externo', desde: '2013', comisiones: null },
      { nombre: 'André Hoffmann', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '1996', comisiones: null },
      { nombre: 'Lubomira Rochet', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 90.18, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'Pool de accionistas de las familias Hoffmann y Oeri', pct: null, tipo: 'Control (≈72,6 % de los votos con ≈9 % del capital)', variacion: 'Sube tras la recompra de 2021 a Novartis' },
    ],
    insiders: [],
    alertas: ['Control familiar: los bonos de participación (ROP), el 87 % del capital, no votan; solo votan las 106,7 M de acciones al portador.'],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Roche Annual General Meeting 2026 (resultados de las votaciones)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-03-10', url: 'https://www.roche.com/investors/updates/inv-update-2026-03-10' },
    { id: 2, titulo: 'Roche to acquire Carmot Therapeutics', editor: 'Roche', tipo: 'Primaria', fecha: '2023-12-04', url: 'https://www.roche.com/media/releases/med-cor-2023-12-04' },
    { id: 3, titulo: 'Roche reports strong 2025 results with 7% sales growth', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://www.roche.com/investors/updates/inv-update-2026-01-29' },
    { id: 4, titulo: 'Roche: nach Aktienverkauf eines Familienmitglieds behält Hoffmann-Clan die Mehrheit (72,6 % de los votos)', editor: 'cash.ch', tipo: 'Prensa', fecha: '2023', url: 'https://www.cash.ch/news/top-news/roche-nach-aktienverkauf-eines-familienmitglieds-behalt-hoffmann-clan-die-mehrheit-578274' },
    { id: 5, titulo: 'Roche: Macht der Milliarden (familia, ≈9,3 % del capital y voto)', editor: 'Bilanz', tipo: 'Prensa', fecha: '2023', url: 'https://www.bilanz.ch/unternehmen/portraits/roche-macht-der-milliarden/qxcggh9' },
    { id: 6, titulo: 'Roche Half Year Report 2026', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://assets.roche.com/f/176343/x/8a0b362d66/hy26e.pdf' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones, remuneración del consejero delegado y voto en contra', tipo: 'Núcleo', intentos: `1) Informe de remuneración 2025 y actas de la junta 2026: solo el resumen de votos a favor; 2) Corporate Governance Report: no accesible; 3) prensa suiza: sin desglose; ${SIN_RED}`, decision: 'Omitido; voto_remuneracion_pct = 90,18 (máximo de remuneración del comité ejecutivo, el más bajo de la junta de 2026)' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (insiders)', tipo: 'Complemento', intentos: '1) SIX Management Transactions: anónimas y no accesibles; 2) prensa suiza: sin operaciones relevantes publicadas; 3) informe de remuneración: no accesible', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'director financiero y directores de división', tipo: 'Complemento', intentos: '1) web de Roche (comité ejecutivo): no accesible; 2) búsqueda no hecha por cupo; 3) informes semestrales: sin texto', decision: 'Omitido (no se ponen cargos sin comprobar)' },
  ],
};
w('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fx = 0.12478; // CHF por DKK implícito en la capitalización de Roche del informe de Novo (281.940 M CHF = 2.259.480 M DKK, 8-oct-2026)
const comp = (n, t, p, capDKK, o) => ({ nombre: n, ticker: t, pais: p, capitalizacion: Math.round(capDKK * fx), ...o });
const D = {
  identificacion: {
    nombre: 'Roche Holding AG', nombre_corto: 'Roche', ticker: 'ROP (antes ROG)', isin: 'CH1499059983', mercado: 'SIX Swiss Exchange', indice_referencia: 'SMI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Salud', industria: 'Farmacéuticas', sede: 'Basilea (Suiza)', fundacion: '1896', empleados: null, web: 'www.roche.com',
    precio: 334.3, fecha_precio: '2026-10-13', acciones: 795.62, capitalizacion_publicada: 265960, free_float_pct: null,
    max_52s: 383.0, min_52s: 256.4, volumen_medio_diario: null, proximos_resultados: '2026-10-22',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 62908, ebitda: 25319, ebit: null, bpa: 20.33, dpa: 10.0, fuente: 'Ventas y EBITDA: MarketScreener (8-oct) [3]; BPA core: consenso de Roche tras el 1S26 [4]; DPA: Börse Express [9]' },
      { periodo: '2027e', ingresos: 65804, ebitda: 27279, ebit: null, bpa: 21.99, dpa: null, fuente: 'MarketScreener [3]; consenso de Roche [4]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 23.78, dpa: null, fuente: 'Stocksguide (4-ago-2026, 23 analistas) [5]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: 10, mantener: 8, vender: 3, po_medio: 367.2, po_min: 232.3, po_max: 449.4 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 3.5,
    confianza: 'Media',
  },
  bolsa: { tipo_rentabilidad: null, rentabilidades: [], anual: [], beta: null, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null, confianza: 'Baja' },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 290.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 244.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 255.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 328.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      comp('Eli Lilly', 'LLY', 'US', 6801297, { ev_ventas: 13.34, ev_ebitda_ltm: 25.5, ev_ebitda_ntm: 20.6, per_ntm: 26.7, crecimiento_pct: 24.4, margen_ebitda_pct: 52.4, roic_pct: 42.2, dn_ebitda: 1.08, fcf_yield_pct: 1.75 }),
      comp('AstraZeneca', 'AZN', 'GB', 1637630, { ev_ventas: 4.44, ev_ebitda_ltm: 13.5, ev_ebitda_ntm: 11.4, per_ntm: 18.3, crecimiento_pct: 7.8, margen_ebitda_pct: 33, roic_pct: 16.1, dn_ebitda: 1.35, fcf_yield_pct: 4.28 }),
      comp('Novartis', 'NOVN', 'CH', 1802997, { ev_ventas: 5.47, ev_ebitda_ltm: 13.4, ev_ebitda_ntm: 12.5, per_ntm: 17.2, crecimiento_pct: 7, margen_ebitda_pct: 40.7, roic_pct: 18.8, dn_ebitda: 1.79, fcf_yield_pct: 6.13 }),
      comp('Sanofi', 'SAN', 'FR', 634673, { ev_ventas: 2.05, ev_ebitda_ltm: 7.4, ev_ebitda_ntm: 6.6, per_ntm: 9.9, crecimiento_pct: 0.2, margen_ebitda_pct: 27.7, roic_pct: 9.1, dn_ebitda: 1.27, fcf_yield_pct: 11.66 }),
      comp('Merck & Co', 'MRK', 'US', 2301234, { ev_ventas: 5.88, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: 13.3, per_ntm: 20.9, crecimiento_pct: 4.3, margen_ebitda_pct: 43.4, roic_pct: 14.1, dn_ebitda: 1.62, fcf_yield_pct: 4.56 }),
      comp('GSK', 'GSK', 'GB', 618304, { ev_ventas: 2.54, ev_ebitda_ltm: 7.8, ev_ebitda_ntm: 6.9, per_ntm: 11.7, crecimiento_pct: 5.4, margen_ebitda_pct: 32.6, roic_pct: 26.4, dn_ebitda: 1.4, fcf_yield_pct: 9.63 }),
      // Novo Nordisk: múltiplos del informe de CSL (9-oct); capitalización 167.628 M USD × 0,777 CHF/USD (estimación propia del cambio).
      { nombre: 'Novo Nordisk', ticker: 'NOVO B', pais: 'DK', capitalizacion: 130247, ev_ventas: 3.64, ev_ebitda_ltm: 6.9, ev_ebitda_ntm: null, per_ntm: 11.7, crecimiento_pct: -2.7, margen_ebitda_pct: 52.7, roic_pct: 39.2, dn_ebitda: 0.55, fcf_yield_pct: 6.9 },
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'Roche Holding AG (SWX:ROP) statistics: capitalización 265.960 M CHF, 795,62 M de acciones, PER 20,81 y PER adelantado 16,26', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://stockanalysis.com/quote/swx/ROP/statistics/' },
    { id: 2, titulo: 'Roche Holding AG (RHHBY) price history: cierre de 54,09 USD el 9-oct-2026 (8 ADR = 1 título)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://stockanalysis.com/quote/otc/RHHBY/history/' },
    { id: 3, titulo: 'Estimaciones 2026e-2027e de ventas, EBITDA y beneficio de Roche y comparables (consulta del 8-oct-2026, en el informe de Novo Nordisk)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/ROCHE-HOLDING-AG-9364975/' },
    { id: 4, titulo: 'Roche post HY 2026 consensus (BPA core 2025-2027)', editor: 'Roche', tipo: 'Analistas', fecha: '2026-08', url: 'https://assets.roche.com/f/176343/x/385dcb4d78/roche-post-hy-2026-consensus.pdf' },
    { id: 5, titulo: 'Roche Holding: Kursziel und Gewinnschätzungen (24 objetivos; BPA 2026-2028)', editor: 'Stocksguide / aktien.guide', tipo: 'Analistas', fecha: '2026-08-04', url: 'https://stocksguide.com/en/forecast/Roche-Holding-br-CH0012032113' },
    { id: 6, titulo: 'Roche (ROG.SW) price history: cierres mensuales de diciembre 2022-2025', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.digrin.com/stocks/detail/ROG.SW/price' },
    { id: 7, titulo: 'Roche Holding AG: cotización del 4-ago-2026 y rango de 52 semanas (256,40-383,00 CHF)', editor: 'comdirect', tipo: 'Datos de mercado', fecha: '2026-08-04', url: 'https://www.comdirect.de/inf/aktien/CH0012032113' },
    { id: 8, titulo: 'Roche setzt auf neue Medikamente, doch die Aktie dreht ins Minus (Pharma Day, 28-sep-2026; 10 comprar, 8 mantener, 3 vender)', editor: 'MS Aktuell', tipo: 'Prensa', fecha: '2026-09-28', url: 'https://ms-aktuell.de/welt/roche-pharma-day-28-09-2026/' },
    { id: 9, titulo: 'Roche Aktie: Dividende 2026 auf 10,00 CHF erhöht (previsión de analistas)', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.boerse-express.com/news/articles/roche-aktie-dividende-2026-auf-1000-chf-erhoeht-899534' },
    { id: 10, titulo: 'Swiss Bond Yield at One-Week High (0,54 %, 8-oct-2026)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://tradingeconomics.com/switzerland/government-bond-yield/news/590510' },
    { id: 11, titulo: 'Chugai Pharmaceutical (4519): cotización y capitalización (≈11,4 billones de JPY, 31-jul-2026)', editor: 'Fintel', tipo: 'Datos de mercado', fecha: '2026-07-31', url: 'https://fintel.io/s/jp/4519' },
    { id: 12, titulo: 'Comparables farmacéuticos del informe de Novo Nordisk (8-oct-2026): Stock Analysis y MarketScreener', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/' },
    { id: 13, titulo: 'Corporate action Roche Holding AG: canje de Genussscheine por Partizipationsscheine (17-mar-2026)', editor: 'Erste Group', tipo: 'Prensa', fecha: '2026-03-17', url: 'https://www.erstegroup.com/en/investments/news-research/product-news/2026/03/17/corporate-action-roche-holding-ag' },
    { id: 14, titulo: 'Morgan Stanley turns positive on Roche as pipeline momentum builds (objetivo 410 CHF)', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-08', url: 'https://www.investing.com/news/stock-market-news/morgan-stanley-turns-positive-on-roche-as-pipeline-momentum-builds-4845794' },
    { id: 15, titulo: 'Swiss franc to Euro exchange rate history (2-oct-2026)', editor: 'exchange-rates.org', tipo: 'Datos de mercado', fecha: '2026-10-02', url: 'https://www.exchange-rates.org/exchange-rate-history/chf-eur-2026-10-02' },
    { id: 16, titulo: 'Roche CH0012032048: calendario (resultados del 3T26 el 22-oct-2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://ae.marketscreener.com/quote/stock/ROCHE-HOLDING-AG-9364975/calendar/' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad, caída máxima y posición corta', tipo: 'Complemento', intentos: `1) bolsa.mjs sin red; 2) Yahoo y SIX: WebFetch bloqueado; 3) búsquedas de beta y rentabilidad: sin cifras fiables en el extracto; en Suiza no hay registro público de cortos; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'precio de cierre de 2021 y anteriores', tipo: 'Complemento', intentos: '1) Digrin: el extracto da diciembre de 2022-2025; 2) CompaniesMarketCap: solo rentabilidades anuales en USD; 3) boerse.de: cotizaciones en EUR', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'transacciones precedentes con múltiplo', tipo: 'Complemento', intentos: '1) prensa de compras farmacéuticas 2020-2026: los objetivos son biotecnológicas sin EBITDA; 2) comunicados de Roche (Carmot, Telavant, 89bio): precio sin múltiplo; 3) operaciones de control de grandes farmacéuticas: ninguna comparable', decision: 'Omitido (sección a null)' },
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026 en la SIX', tipo: 'Núcleo', intentos: '1) SIX y cash.ch: sin acceso; 2) Stock Analysis: capitalización 265.960 M CHF ÷ 795,62 M de acciones = 334,30 CHF; 3) contraste con el ADR (54,09 USD × 8 × ≈0,777 CHF/USD ≈ 336 CHF el 9-oct)', decision: 'Calculado y marcado como estimación' },
  ],
};
w('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículo y comentarios)', fecha: '2026-08', n_comentarios: 20, tono: 'Positivo', resumen: 'El autor sube a Comprar: los lanzamientos y la cartera de obesidad compensarían las patentes que vencen; los comentarios discuten el franco y Ocrevus [1].' },
      { plataforma: 'cash.ch (noticia y comentarios de lectores)', fecha: '2026-09', n_comentarios: 15, tono: 'Negativo', resumen: 'La acción rebotó en máximos de varios años y devolvió lo ganado en el año; Chugai y la falta de datos de cartera en el 2S pesan [2].' },
      { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-07', n_comentarios: 10, tono: 'Dividido', resumen: 'Valores razonables de la comunidad entre ≈302 y 430 CHF: unos ven un «compounder» de dividendo, otros temen biosimilares y China [3, 4].' },
      { plataforma: 'Börse Express y MS Aktuell (prensa con debate de inversores)', fecha: '2026-09', n_comentarios: 10, tono: 'Negativo', resumen: 'Tras el Pharma Day del 28-sep la acción «gira a negativo»; persevERA y el franco son los temas; diez analistas en Comprar, ocho en Mantener y tres en Vender [5, 6].' },
    ],
    temas: [
      { tema: 'Giredestrant (decisiones de la FDA en noviembre y diciembre)', postura: 'Dividida', peso: 'Alto', contraste: 'El fracaso de persevERA (marzo) y el éxito de lidERA dejan el fármaco en adyuvancia como principal catalizador; la FDA decide el 30-nov (adyuvante, revisión prioritaria) y el 18-dic (avanzado) [7].' },
      { tema: 'Franco fuerte', postura: 'Bajista', peso: 'Alto', contraste: 'Correcto: el 1S26 crece +6 % a tipo constante y cae −2 % en francos; el BPA core cae un 2 % en francos [8].' },
      { tema: 'Obesidad (CT-388 y alianza con Zealand) como opción de crecimiento', postura: 'Alcista', peso: 'Medio', contraste: 'Fase III desde 2026: no da ventas antes de 2029-2030 y no entra en nuestro caso base.' },
      { tema: 'Dividendo creciente (39 subidas seguidas)', postura: 'Alcista', peso: 'Medio', contraste: 'Correcto: 9,80 CHF por 2025 (≈2,9 % de rentabilidad) y la dirección promete otra subida en francos [8].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Roche: Despite Some Study Setbacks, Pipeline Gives Me Increasing Confidence', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://seekingalpha.com/article/4848850-roche-stock-despite-some-study-setbacks-pipeline-gives-me-increasing-confidence' },
    { id: 2, titulo: 'Roche am Mehrjahreshoch abgeprallt: geben die Aktien die Jahresgewinne wieder ab?', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.cash.ch/news/top-news/roche-am-mehrjahreshoch-abgeprallt-geben-die-aktien-die-jahresgewinne-wieder-ab-961353' },
    { id: 3, titulo: 'Roche Holding shares: community narratives', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://simplywall.st/community/narratives/ch/pharmaceuticals-biotech/vtx-rog/roche-holding-shares' },
    { id: 4, titulo: 'Update for Roche Holding (narrativa)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.simplywall.st/narratives/0uadpeuv-update-for-roche-holding' },
    { id: 5, titulo: 'Roche setzt auf neue Medikamente, doch die Aktie dreht ins Minus', editor: 'MS Aktuell', tipo: 'Foros y redes', fecha: '2026-09-28', url: 'https://ms-aktuell.de/welt/roche-pharma-day-28-09-2026/' },
    { id: 6, titulo: 'Roche Aktie: Ernüchternde Zeiten', editor: 'Börse Express', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.boerse-express.com/news/articles/roche-aktie-ernuechternde-zeiten-875530' },
    { id: 7, titulo: 'FDA accepts NDA for giredestrant in early-stage breast cancer (decisión el 30-nov-2026)', editor: 'PharmExec', tipo: 'Prensa', fecha: '2026-06-02', url: 'https://www.pharmexec.com/view/fda-accepts-nda-giredestrant-er-positive-early-stage-breast-cancer' },
    { id: 8, titulo: 'Roche Half Year Report 2026', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://assets.roche.com/f/176343/x/8a0b362d66/hy26e.pdf' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit, Stocktwits y foros españoles (Rankia)', tipo: 'Complemento', intentos: '1) búsqueda de hilos de Reddit sobre RHHBY: sin resultados; 2) búsqueda del foro de Rankia y de finanzen.net: sin hilos en el extracto; 3) API de Stocktwits: sin red', decision: 'Omitido; el tono se lee en Seeking Alpha, cash.ch, Simply Wall St y la prensa con debate' },
  ],
};
w('E', E);
console.log('notas A-E escritas');
