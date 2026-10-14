// Escribe las notas A-E de Euronext (corte 2026-10-14). Cuentas del XBRL ESEF (cuentas-xbrl.json) comprobadas
// contra las notas de resultados; mercado de bolsa.mjs; resto de documentos de notas/docs y de la web.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

const URL_FY25 = 'https://www.euronext.com/en/investor-relations/financial-information/news/euronext-publishes-q4-and-full-year-2025-results';
const URL_Q226 = 'https://www.euronext.com/en/investor-relations/financial-information/news/euronext-publishes-q2-2026-results';
const URL_Q126 = 'https://www.euronext.com/en/about/media/euronext-press-releases/euronext-publishes-q1-2026-results';
const URL_PLAN = 'https://www.euronext.com/en/investor-relations/financial-information/news/euronext-announces-its-new-strategic-plan-innovate';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Euronext publishes Q4 and full year 2025 results (cuenta, balance y flujos de 2025 y 2024; guía de costes 2026)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-02-18', url: URL_FY25 },
  { id: 2, titulo: 'Euronext publishes Q2 2026 results (cuenta, balance a 30-jun-2026 y flujos del 2T26)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-07-30', url: URL_Q226 },
  { id: 3, titulo: 'Euronext publishes Q1 2026 results', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-05-19', url: URL_Q126 },
  { id: 4, titulo: 'Informe anual 2025 en formato ESEF (XBRL): cuenta, balance, flujos, actividad de cámara (CCP) y honorarios de auditoría', editor: 'Euronext N.V. / filings.xbrl.org', tipo: 'Primaria', fecha: '2026-03-27', url: 'https://filings.xbrl.org/724500QJ4QSZ3H9QU415/2025-12-31/ESEF/NL/0/eur-2025-12-31-en.json' },
  { id: 5, titulo: 'Informe anual 2024 en formato ESEF (XBRL), con 2023 reexpresado', editor: 'Euronext N.V. / filings.xbrl.org', tipo: 'Primaria', fecha: '2025-03', url: 'https://filings.xbrl.org/724500QJ4QSZ3H9QU415/2024-12-31/ESEF/NL/0/eur-2024-12-31-en.json' },
  { id: 6, titulo: 'Informe anual 2022 en formato ESEF (XBRL)', editor: 'Euronext N.V. / filings.xbrl.org', tipo: 'Primaria', fecha: '2023-03', url: 'https://filings.xbrl.org/724500QJ4QSZ3H9QU415/2022-12-31/ESEF/NL/0/eur-2022-12-31-en.json' },
  { id: 7, titulo: 'Informe anual 2021 en formato ESEF (XBRL), con 2020 comparativo y BPA reexpresado por la ampliación con derechos', editor: 'Euronext N.V. / filings.xbrl.org', tipo: 'Primaria', fecha: '2022-03', url: 'https://filings.xbrl.org/724500QJ4QSZ3H9QU415/2021-12-31/ESEF/NL/0/eur-2021-12-31-en.json' },
  { id: 8, titulo: 'Euronext announces the success of its offering of bonds due 2032 convertible into new shares (OCEANE de 425 M EUR, cupón 1,50 %, conversión a 191,17 EUR)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2025-05-22', url: 'https://www.euronext.com/en/investor-relations/financial-information/news/euronext-announces-success-its-offering-bonds-due' },
  { id: 9, titulo: 'Capital and shareholding (acciones emitidas, autocartera y accionistas de referencia a 30-sep-2026)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://www.euronext.com/en/investor-relations/capital-and-shareholding' },
  { id: 10, titulo: 'Euronext announces its new strategic plan «Innovate for Growth 2027» (objetivos, política de dividendo y de apalancamiento)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2024-11-08', url: URL_PLAN },
];

// Ingresos = «revenue and income» (RevenueAndOperatingIncome del XBRL), que incluye el resultado de tesorería de la cámara (NTI) y otros ingresos.
// Balance sin la actividad de cámara: se restan los activos y pasivos CCP («CCP clearing business assets/liabilities»), que se compensan entre sí.
const cuenta = [
  { periodo: '2020', ingresos: 884.3, coste_ventas: null, gastos_generales: null, ebitda: 502.7, amortizaciones: 57.8, ebit: 444.9, resultado_financiero: -2.2, bai: 442.7, impuestos: 122.2, minoritarios: 5.1, beneficio_neto: 315.5, gastos_financieros: 17.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.13, dpa: null, dpa_extraordinario: 0, acciones_diluidas: 76.4 },
  { periodo: '2021', ingresos: 1298.7, coste_ventas: null, gastos_generales: null, ebitda: 713.9, amortizaciones: 134.6, ebit: 579.3, resultado_financiero: 1.4, bai: 580.7, impuestos: 158.6, minoritarios: 8.7, beneficio_neto: 413.3, gastos_financieros: 40.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.29, dpa: 1.93, dpa_extraordinario: 0, acciones_diluidas: 96.3 },
  { periodo: '2022', ingresos: 1418.8, coste_ventas: null, gastos_generales: null, ebitda: 785.5, amortizaciones: 160.2, ebit: 625.3, resultado_financiero: -11.1, bai: 614.2, impuestos: 163.6, minoritarios: 12.8, beneficio_neto: 437.8, gastos_financieros: 37.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.10, dpa: 2.22, dpa_extraordinario: 0, acciones_diluidas: 106.8 },
  { periodo: '2023', ingresos: 1474.7, coste_ventas: null, gastos_generales: null, ebitda: 786.3, amortizaciones: 170.1, ebit: 616.2, resultado_financiero: 82.9, bai: 699.1, impuestos: 162.7, minoritarios: 22.8, beneficio_neto: 513.6, gastos_financieros: 35.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.83, dpa: 2.48, dpa_extraordinario: 0, acciones_diluidas: 106.3 },
  { periodo: '2024', ingresos: 1626.9, coste_ventas: null, gastos_generales: null, ebitda: 975.6, amortizaciones: 188.7, ebit: 786.8, resultado_financiero: 52.3, bai: 839.1, impuestos: 218.4, minoritarios: 35.1, beneficio_neto: 585.6, gastos_financieros: 36.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.63, dpa: 2.90, dpa_extraordinario: 0, acciones_diluidas: 104.0 },
  { periodo: '2025', ingresos: 1818.8, coste_ventas: null, gastos_generales: null, ebitda: 1124.2, amortizaciones: 199.9, ebit: 924.2, resultado_financiero: 17.1, bai: 941.3, impuestos: 251.2, minoritarios: 47.2, beneficio_neto: 642.9, gastos_financieros: 43.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.29, dpa: 3.18, dpa_extraordinario: 0, acciones_diluidas: 103.1 },
];

const balance = [
  { periodo: '2020', activo_total: 2884.6, activo_corriente: 943.5, pasivo_corriente: 309.6, pasivo_total: 1795.6, fondo_comercio: 1536.1, intangibles: null, inmovilizado_material: 56.0, existencias: 0, clientes: 181.2, proveedores: 185.8, activos_contrato: null, pasivos_contrato: 106.8, caja: 629.5, deuda_financiera: 1280.8, arrendamientos: 51.0, patrimonio_neto: 1058.7, minoritarios: 30.2, reservas: 826.3 },
  { periodo: '2021', activo_total: 8155.4, activo_corriente: 1400.4, pasivo_corriente: 603.1, pasivo_total: 4403.2, fondo_comercio: 6215.8, intangibles: null, inmovilizado_material: 97.6, existencias: 0, clientes: 395.0, proveedores: 439.9, activos_contrato: null, pasivos_contrato: 150.8, caja: 809.4, deuda_financiera: 3061.8, arrendamientos: 71.7, patrimonio_neto: 3647.6, minoritarios: 123.1, reservas: 1022.9 },
  { periodo: '2022', activo_total: 8294.8, activo_corriente: 1564.5, pasivo_corriente: 546.4, pasivo_total: 4238.3, fondo_comercio: 6205.8, intangibles: null, inmovilizado_material: 109.4, existencias: 0, clientes: 318.1, proveedores: null, activos_contrato: null, pasivos_contrato: 139.0, caja: 1001.1, deuda_financiera: 3044.5, arrendamientos: 50.1, patrimonio_neto: 3914.0, minoritarios: 126.3, reservas: 1265.8 },
  { periodo: '2023', activo_total: 8479.0, activo_corriente: 1901.0, pasivo_corriente: 585.8, pasivo_total: 4276.7, fondo_comercio: 6108.2, intangibles: null, inmovilizado_material: 114.4, existencias: 0, clientes: 303.5, proveedores: null, activos_contrato: null, pasivos_contrato: 139.3, caja: 1448.8, deuda_financiera: 3048.9, arrendamientos: 59.5, patrimonio_neto: 3945.7, minoritarios: 139.7, reservas: 1543.5 },
  { periodo: '2024', activo_total: 8813.1, activo_corriente: 2161.6, pasivo_corriente: 1173.8, pasivo_total: 4342.0, fondo_comercio: 6096.2, intangibles: null, inmovilizado_material: 106.2, existencias: 0, clientes: 381.1, proveedores: 464.3, activos_contrato: null, pasivos_contrato: 136.5, caja: 1673.5, deuda_financiera: 3053.5, arrendamientos: 62.0, patrimonio_neto: 4245.2, minoritarios: 156.8, reservas: 1839.9 },
  { periodo: '2025', activo_total: 9566.7, activo_corriente: 2107.9, pasivo_corriente: 1219.9, pasivo_total: 4809.9, fondo_comercio: 6776.9, intangibles: null, inmovilizado_material: 125.2, existencias: 0, clientes: 392.8, proveedores: 520.2, activos_contrato: null, pasivos_contrato: 168.4, caja: 1593.7, deuda_financiera: 3314.0, arrendamientos: 87.1, patrimonio_neto: 4537.7, minoritarios: 197.2, reservas: 2188.6 },
];

const flujos = [
  { periodo: '2020', flujo_operativo: 278.0, capex: 19.2, pagos_arrendamientos: 14.9, adquisiciones: 80.4, desinversiones: 0, dividendos: 110.6, recompras: 13.2, emision_acciones: 0, intereses_en_financiacion: 11.6 },
  { periodo: '2021', flujo_operativo: 543.7, capex: 67.6, pagos_arrendamientos: 23.8, adquisiciones: 4196.0, desinversiones: 5.9, dividendos: 157.2, recompras: 31.8, emision_acciones: 2375.2, intereses_en_financiacion: 16.1 },
  { periodo: '2022', flujo_operativo: 616.5, capex: 99.5, pagos_arrendamientos: 23.4, adquisiciones: 66.0, desinversiones: 8.7, dividendos: 206.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 29.6 },
  { periodo: '2023', flujo_operativo: 826.1, capex: 103.0, pagos_arrendamientos: 28.4, adquisiciones: 0, desinversiones: 0, dividendos: 237.2, recompras: 219.1, emision_acciones: 0, intereses_en_financiacion: 28.7 },
  { periodo: '2024', flujo_operativo: 708.6, capex: 87.3, pagos_arrendamientos: 20.8, adquisiciones: 65.2, desinversiones: 0.9, dividendos: 257.3, recompras: 106.7, emision_acciones: 0, intereses_en_financiacion: 29.4 },
  { periodo: '2025', flujo_operativo: 812.1, capex: 129.9, pagos_arrendamientos: 18.6, adquisiciones: 323.6, desinversiones: 0, dividendos: 293.4, recompras: 411.0, emision_acciones: 0, intereses_en_financiacion: 35.4 },
];

const segs = (nombre, descripcion, i24, i25) => ({ nombre, descripcion, tipo_resultado: null, historico: [{ periodo: '2024', ingresos: i24, resultado: null }, { periodo: '2025', ingresos: i25, resultado: null }] });

const A = {
  _estado: 'Completo. Cuentas 2020-2025 del XBRL ESEF comprobadas contra las notas de resultados; LTM a junio de 2026 con el 1T26 y el 2T26.',
  negocio: {
    segmentos: [
      segs('Securities Services', 'Custodia y liquidación (Euronext Securities: Oporto, Milán, Oslo, Copenhague y Atenas) y otros servicios de post-contratación.', 309.5, 330.7),
      segs('Capital Markets and Data Solutions', 'Mercado primario (admisiones y cuotas anuales), datos e índices, soluciones para emisores e inversores (Admincontrol desde mayo de 2025) y servicios tecnológicos (colocation).', 597.1, 669.3),
      segs('FICC Markets', 'Renta fija (MTS y compensación de bonos), materias primas (Nord Pool, agrícolas, futuros de electricidad desde marzo de 2026) y divisas (Euronext FX).', 295.0, 342.8),
      segs('Equity Markets', 'Negociación y compensación de contado (acciones y ETF) y derivados financieros.', 367.0, 410.0),
      segs('Resultado de tesorería (NTI)', 'Margen sobre la caja y las garantías depositadas en Euronext Clearing y en la cámara de Nord Pool.', 56.8, 69.6),
      segs('Otros ingresos', 'Otros ingresos no recurrentes de explotación.', 1.6, 0.7),
      { nombre: 'Ajustes no subyacentes', descripcion: 'Liberación del ajuste a valor razonable de los pasivos de contrato de Admincontrol.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 0, resultado: null }, { periodo: '2025', ingresos: -4.4, resultado: null }] },
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Activos bajo custodia (fin de 2T, billones de EUR)', valor_anterior: '7,46', valor_actual: '8,12', variacion: '+8,8 %', comentario: 'Récord; base de los ingresos recurrentes de Securities Services [2].' },
      { kpi: 'Volumen medio diario de contado (M EUR, 2T)', valor_anterior: '13.611', valor_actual: '16.698', variacion: '+22,7 %', comentario: 'Volatilidad, ETF y Atenas [2].' },
      { kpi: 'Cuota en sus mercados de contado (2T)', valor_anterior: 'n.d.', valor_actual: '66,2 %', variacion: null, comentario: 'Captura de 0,50 pb por operación [2].' },
      { kpi: 'ETF cotizados (fin de 2T)', valor_anterior: '4.323', valor_actual: '4.997', variacion: '+15,6 %', comentario: 'Euronext Dublin es el primer centro de cotización de fondos [2].' },
      { kpi: 'MTS Cash, volumen medio diario (M EUR, 2T)', valor_anterior: '59.182', valor_actual: '64.919', variacion: '+9,7 %', comentario: 'Trimestre récord en renta fija [2].' },
      { kpi: 'Cobertura de los costes subyacentes con ingresos no ligados al volumen (2T)', valor_anterior: '161 %', valor_actual: '170 %', variacion: '+9 pp', comentario: 'El 58 % de los ingresos no depende del volumen [2].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1964.7, ebitda: 1229.5, ebit: 1022.4, beneficio_neto: 705.4, bpa: 6.88, dpa: 3.18, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Borsa Italiana (MTS, Euronext Clearing, Euronext Securities Milan), consolidada desde el 29-abr-2021: el balance la recoge entera y la cuenta solo ocho meses.' },
      { periodo: '2025', descripcion: 'Admincontrol (mayo de 2025) y Athex Group (24-nov-2025, canje de acciones): el balance de cierre incluye Athex y la cuenta solo cinco semanas.' },
    ],
    comentario: 'Los ingresos y otros ingresos pasan de 884 M EUR en 2020 a 1.819 M en 2025: la mayor parte del salto es inorgánico (Borsa Italiana desde abril de 2021, Nord Pool, Admincontrol y Athex en 2025) [4, 7]. Desde 2023 el crecimiento es sobre todo orgánico: +9,5 % en 2025 a perímetro y divisa constantes y +7,6 % y +9,9 % en el 1T26 y el 2T26 [1, 2, 3]. El margen EBITDA publicado sube del 53,3 % de 2023, cargado con costes de integración y de la migración de la cámara, al 61,8 % de 2025; el ajustado de la empresa llega al 62,7 % en 2025 y al 66,1 % en el 2T26 por apalancamiento operativo: los costes subyacentes crecen un 9,5 % con ingresos al +16,9 % [1, 2]. El resultado financiero se dio la vuelta: de +52 M en 2024 a +17 M en 2025 por la caída de tipos y los nuevos bonos, e incluye 35 M de dividendos de Euroclear y Sicovam [1].',
    ajustes: 'Usamos cifras publicadas. La empresa da además cifras «subyacentes» o «ajustadas» que excluyen los costes de integración y adquisición y la amortización de intangibles de compras (PPA: 86,9 M en 2025; 22,6 y 25,2 M en el 1T26 y el 2T26) [1, 2, 3]. El BPA ajustado de 2025 es 7,27 EUR básico frente a 6,34 publicado (6,29 diluido) [1]. Los costes «no subyacentes» sin amortización fueron 14,5 M en 2025 y 30,8 M en 2024, pero aparecen todos los años desde 2021 (Borsa Italiana, cámara, Admincontrol, Athex): no los tratamos como no recurrentes [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 415.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 252.6, margen_ebitda_pct: 60.7, bpa: 1.66, vs_consenso: null },
      { periodo: '1T25', ingresos: 458.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 294.1, margen_ebitda_pct: 64.1, bpa: 1.80, vs_consenso: null },
      { periodo: '2T25', ingresos: 465.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 297.3, margen_ebitda_pct: 63.8, bpa: 2.02, vs_consenso: null },
      { periodo: '3T25', ingresos: 438.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 276.7, margen_ebitda_pct: 63.2, bpa: 1.68, vs_consenso: null },
      { periodo: '4T25', ingresos: 460.8, crecimiento_pct: 10.8, crecimiento_organico_pct: 6.4, ebitda: 275.0, margen_ebitda_pct: 59.7, bpa: 1.77, vs_consenso: null },
      { periodo: '1T26', ingresos: 528.5, crecimiento_pct: 15.3, crecimiento_organico_pct: 7.6, ebitda: 343.2, margen_ebitda_pct: 64.9, bpa: 2.13, vs_consenso: null },
      { periodo: '2T26', ingresos: 544.4, crecimiento_pct: 16.9, crecimiento_organico_pct: 9.9, ebitda: 360.0, margen_ebitda_pct: 66.1, bpa: 2.42, vs_consenso: null },
    ],
    ultima_presentacion: 'Cifras subyacentes de la empresa: ingresos sin partidas no recurrentes, EBITDA ajustado y BPA ajustado básico; el 3T25 se deduce del año menos los otros tres trimestres [1, 2, 3]. El mensaje del 2T26 (30-jul) es «noveno trimestre seguido de crecimiento de dos dígitos»: todos los negocios crecen a doble dígito, el margen ajustado marca récord (66,1 %) y los ingresos no ligados al volumen cubren el 170 % de los costes [2]. Frente al 1T26 (19-may), el discurso pasa de la integración (Athex, Admincontrol) a la ejecución del plan: primer trimestre completo de los futuros de electricidad nórdicos tras migrar el 100 % de la posición abierta desde Nasdaq, récord de MTS y la puesta en marcha en septiembre de 2026 del depositario para la liquidación de París, Ámsterdam y Bruselas [2, 3]. La dirección vuelve a apoyarse en la agenda europea (paquete de integración y supervisión de mercados de la Comisión) y no cuantifica su efecto. El resultado de tesorería, que bajó un 11,6 % en el 1T26 por un modelo de riesgo más eficiente, volvió a subir en el 2T26 (+12,5 %) por las garantías de los futuros de electricidad [2, 3].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 11.4 },
      { anio: '2027+', importe: 2917.9 },
    ],
    liquidez: 'Caja de 1.311 M EUR a 30-jun-2026, de la que unos 228 M son caja en tránsito de Nord Pool que no es libre; deuda bruta de 2.929 M tras amortizar el 18-may-2026 los 385,5 M del bono de 2021 [2, 3].',
    rating: 'S&P, grado de inversión; la política es mantener al menos BBB [10]. Nota exacta no comprobada en las fuentes leídas.',
    coste_deuda_pct: 1.5,
    vida_media_anios: null,
    otros_pasivos: 'Euronext Clearing y la cámara de Nord Pool llevan en balance 405.562 M EUR de activos y 405.585 M de pasivos de compensación a 30-jun-2026 [2]: posiciones de los miembros que se compensan entre sí y que excluimos del balance analítico, como hacen la empresa y las agencias en sus ratios. El riesgo real es el de impago de un miembro por encima de las garantías y de los fondos de la cámara. La deuda incluye un bono convertible (OCEANE) de 425 M al 1,50 % con vencimiento en 2032 y precio de conversión de 191,17 EUR, hoy fuera de dinero [8]. Pensiones netas de 23 M, provisiones de 8 M e impuestos diferidos de 510 M, que nacen sobre todo de los intangibles de las compras [2].',
    comentario: 'El balance analítico (sin la actividad de cámara) es pequeño: unos 9.600 M EUR de activos, de los que 6.800 M son fondo de comercio e intangibles de las compras [1]. El circulante comercial es negativo: los cobros a clientes (393 M) quedan por debajo de los pagos pendientes (520 M) y de los ingresos cobrados por adelantado (168 M) [1]. La deuda bruta sube a 3.314 M en 2025 por Admincontrol (puente refinanciado con el convertible y un bono) y baja a 2.929 M en junio de 2026; la deuda neta sobre EBITDA es de 1,3 veces, dentro del rango de 1-2 veces del plan [2, 10].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es alta y estable: el flujo de explotación fue de 812 M EUR en 2025 sobre un EBITDA de 1.124 M, con 305 M de impuestos pagados [1]. La empresa cifra la conversión sin el circulante de las cámaras en el 75,2 % del EBITDA en 2025 [1]. El flujo de explotación salta de un trimestre a otro por las garantías de Euronext Clearing y la caja en tránsito de Nord Pool (499,8 M en el 1T26 frente a 185,5 M en el 2T26) [2, 3]. La inversión (125-130 M en 2025, el 7,1 % de los ingresos) es casi toda software activado; el plan la fija entre el 4 % y el 6 % de los ingresos [1, 10]. Las compras de 2025 (Admincontrol, 296 M en caja, más 27,7 M de compra de activos de los futuros de electricidad) y la recompra de 411 M absorbieron la caja libre; Athex se pagó en acciones [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG Accountants N.V.',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: null,
    senales: [],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo del 50 % del beneficio neto publicado (3,18 EUR por acción con cargo a 2025, pagado el 27-may-2026) y «retornos especiales» flexibles, sobre todo recompras, en función del apalancamiento (objetivo de 1 a 2 veces deuda neta sobre EBITDA ajustado) y de las oportunidades de compra; mantener al menos BBB con S&P [1, 10]. En 2025-2026 recompró 300 M (nov-24 a mar-25) y 250 M (nov-25 a ene-26, 1,97 M de acciones a 127,03 EUR) [1].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Borsa Italiana Group (MTS, Euronext Clearing, Monte Titoli)', importe: 4325, ev_ebitda: null, financiacion: 'Ampliación con derechos de 2.375 M y bonos', resultado: '121 M de sinergias anuales a 3T24, por encima de los 115 M previstos; sin deterioros [4, 10].' },
      { anio: '2025', objetivo: 'Admincontrol (software de gobierno para consejos, Noruega)', importe: 296, ev_ebitda: null, financiacion: 'Préstamo puente refinanciado con el convertible 2032 y bonos', resultado: 'Impulsa la línea de soluciones para emisores (+25,4 % en el 2T26); demasiado pronto para medir el rendimiento [1, 2].' },
      { anio: '2025', objetivo: 'Athex Group (bolsa de Atenas)', importe: null, ev_ebitda: null, financiacion: 'Canje de acciones', resultado: 'Sinergias de 12 M anuales en 2028 con 25 M de costes de implantación [1].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos 2021-2023 y resultado por segmento', tipo: 'Complemento', intentos: '1) Notas de resultados 2025 (segmentación nueva desde 2024); 2) XBRL ESEF 2023 (otra segmentación); 3) presentación del día del inversor', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'ingresos por geografía', tipo: 'Complemento', intentos: '1) Nota de resultados 2025; 2) XBRL ESEF (no etiquetado sin dimensiones); 3) URD 2025 (no leído)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos detallados y vida media de la deuda', tipo: 'Complemento', intentos: '1) Nota de resultados 2T26 (solo corto y largo plazo); 2) XBRL ESEF; 3) página de deuda de la web de inversores (no leída)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Euronext publishes Q2 2026 results (29 % de la negociación europea de acciones; 1.800 emisores y 7 billones de capitalización)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-07-30', url: URL_Q226 },
  { id: 2, titulo: 'Euronext publishes Q4 and full year 2025 results', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-02-18', url: URL_FY25 },
  { id: 3, titulo: 'Deutsche Börse Group Achieves Record Results in Financial Year 2025', editor: 'Deutsche Börse', tipo: 'Primaria', fecha: '2026-02-11', url: 'https://www.deutsche-boerse.com/dbg-en/media/news-stories/press-releases/Deutsche-B-rse-Group-Achieves-Record-Results-in-Financial-Year-2025-4948690' },
  { id: 4, titulo: 'Euronext, Deutsche Boerse gain after CEO revives merger talk (Reuters)', editor: 'Reuters vía live.euronext.com', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://live.euronext.com/en/financial-news/euronext-deutsche-boerse-gain-after-ceo-revives-merger-talk' },
  { id: 5, titulo: 'Our Journey: 25 years of growth and transformation (historia, CAC 40, Admincontrol, Athex, depositario)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2025-09', url: 'https://www.euronext.com/en/about/our-journey' },
  { id: 6, titulo: 'Euronext announces its new strategic plan «Innovate for Growth 2027»', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2024-11-08', url: URL_PLAN },
  { id: 7, titulo: 'Informe de Deutsche Börse del 14-oct-2026 (cuentas 2025, foso y comparables)', editor: 'Informe propio (repo)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'informes/deutsche-borse-2026-10-14/datos-v2.json' },
  { id: 8, titulo: 'Informe de Intercontinental Exchange del 8-oct-2026 (cuentas 2025 y comparables)', editor: 'Informe propio (repo)', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'informes/ice-2026-10-08/datos-v2.json' },
];
const B = {
  _estado: 'Completo salvo tamaño de mercado (no hay cifra fiable y comparable). Competidores con cuentas del repo (Deutsche Börse, ICE).',
  historia: {
    resumen: 'Euronext nace en 2000 de la fusión de las bolsas de París, Ámsterdam y Bruselas: la primera bolsa transfronteriza. Suma Lisboa y LIFFE en 2002, se fusiona con NYSE en 2007 y pasa a ICE en 2013, que la saca a bolsa por separado en junio de 2014 con un núcleo de accionistas de referencia [5]. Desde entonces compra Irish Stock Exchange (2018), Oslo Børs VPS (2019), VP Securities y Nord Pool (2020) y, en 2021, Borsa Italiana con MTS, la cámara y el depositario italianos, la compra que la convierte en grupo de toda la cadena de valor [5, 6]. En 2024-2025 trae a casa la compensación de contado y derivados (Euronext Clearing), compra Admincontrol y Athex, y entra en el CAC 40 en septiembre de 2025 [2, 5].',
    hitos: [
      { anio: '2000', hito: 'Fusión de las bolsas de París, Ámsterdam y Bruselas [5].' },
      { anio: '2007', hito: 'Fusión con NYSE (NYSE Euronext) [5].' },
      { anio: '2014', hito: 'Salida a bolsa tras la compra de NYSE Euronext por ICE; núcleo de accionistas de referencia con el 33 % [5].' },
      { anio: '2019', hito: 'Compra de Oslo Børs VPS [5].' },
      { anio: '2021', hito: 'Compra de Borsa Italiana (4.325 M EUR) con MTS, la cámara y el depositario; entran CDP Equity e Intesa como accionistas de referencia [5].' },
      { anio: '2024', hito: 'Plan «Innovate for Growth 2027» y compensación europea en Euronext Clearing [6].' },
      { anio: '2025', hito: 'Compra de Admincontrol y de Athex (canje de acciones); entrada en el CAC 40 [2, 5].' },
      { anio: '2026', hito: 'Futuros de electricidad nórdicos (marzo) y liquidación de París, Ámsterdam y Bruselas en Euronext Securities (septiembre) [1].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Euronext opera ocho bolsas reguladas (Ámsterdam, Atenas, Bruselas, Dublín, Lisboa, Milán, Oslo y París) con más de 1.800 emisores y 7 billones de EUR de capitalización, el mayor centro mundial de cotización de bonos y fondos, MTS (renta fija electrónica), Nord Pool (electricidad), Euronext FX, una cámara de compensación (Euronext Clearing) y cinco depositarios centrales (Euronext Securities) [1]. Los clientes son emisores (cuotas de admisión y anuales), intermediarios y creadores de mercado (comisiones por operación y compensación), gestores y bancos (datos, índices, custodia) y comercializadoras de electricidad. Maneja el 29 % de la negociación europea de acciones en mercados transparentes [1].',
    como_gana_dinero: 'El 58 % de los ingresos no depende del volumen: custodia y liquidación, cuotas de cotización, datos e índices, software (Admincontrol) y colocation; cubren el 170 % de los costes subyacentes, de modo que el negocio ligado al volumen (contado, derivados, renta fija, electricidad) cae casi entero al EBITDA [1]. El coste es sobre todo de personal y sistemas y crece poco (+9,5 % en el 2T26 con compras incluidas) frente a ingresos al +16,9 %: el apalancamiento operativo explica el margen ajustado del 66 % [1]. Un 4 % de los ingresos es resultado de tesorería de la cámara, ligado a los tipos y a las garantías [2].',
    clientes: 'No hay concentración relevante: miles de emisores e intermediarios. Los costes de cambio son altos en custodia, liquidación y cotización (un emisor no cambia de bolsa salvo por una OPA o una exclusión), y medios en negociación de contado, donde compiten las plataformas multilaterales (Cboe Europe, Aquis). El poder de precios se ve en la captura por operación de contado, estable en torno a 0,50-0,51 pb pese a la competencia, y en el crecimiento de la custodia (+13,7 % en el 2T26) por servicios de valor añadido [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Infraestructura de los mercados de capitales europeos: cotización, negociación y compensación de acciones, renta fija, derivados y electricidad, custodia y liquidación, y datos e índices. El mercado relevante para Euronext es europeo; los grandes rivales son Deutsche Börse (derivados y post-contratación), LSEG (datos y compensación en Londres), SIX, Nasdaq Nordic y las plataformas multilaterales. No hay una cifra pública fiable de tamaño de mercado: medimos la cuota con la negociación de acciones en mercados transparentes, que publica la propia empresa [1].',
    tamano: null, unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Volatilidad y volúmenes de negociación', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El contado creció un 26,9 % en el 2T26 con volatilidad alta; en 2025 los derivados de renta variable cayeron un 13,4 % [1, 2].' },
      { driver: 'Unión de Ahorro e Inversión de la UE y consolidación de la post-contratación', efecto: '+', horizonte: 'Estructural', evidencia: 'Liquidación de París, Ámsterdam y Bruselas en Euronext Securities desde septiembre de 2026; paquete de integración y supervisión de la Comisión [1].' },
      { driver: 'Crecimiento de ETF e inversión minorista', efecto: '+', horizonte: 'Estructural', evidencia: 'ETF cotizados +15,6 % en un año y volumen de Euronext ETF Europe +84 % desde su lanzamiento [1].' },
      { driver: 'Tipos de interés sobre garantías de la cámara', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El resultado de tesorería fue de 69,6 M en 2025 (+22,6 %) y bajó en el 1T26 por un modelo de riesgo más eficiente [2].' },
      { driver: 'Electrificación y comercio de energía', efecto: '+', horizonte: 'Estructural', evidencia: 'Materias primas +27,2 % en el 2T26 con los futuros de electricidad nórdicos [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'En contado compiten las plataformas multilaterales; Euronext retiene el 66 % de sus propios mercados [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los grandes bancos e intermediarios negocian tarifas y apoyan plataformas alternativas.' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Personal y tecnología propia (Optiq).' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias de mercado, cámara y depositario y la liquidez acumulada levantan barreras.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Negociación bilateral y fuera de mercado en contado; menos en cotización y custodia.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Volúmenes de contado en máximos (+22,7 % en el 2T26), renovación de salidas a bolsa y ampliaciones (+112 % en importe captado en el 2T26) y volatilidad elevada [1]. En 2022 la combinación de menos volumen y tipos negativos dejó los ingresos casi planos; en 2008-09 y 2020 los volúmenes subieron con la volatilidad y el negocio de cotización cayó. La parte cíclica (contado, derivados, tesorería) es en torno al 40 % de los ingresos [1].' },
    regulacion: 'Euronext está supervisada por un colegio de reguladores (AFM, AMF, Consob, CBI, FSMA, CMVM, Finanstilsynet, HCMC) y la designación del presidente del consejo de supervisión pasa por el Ministerio de Finanzas neerlandés. La revisión de MiFIR (cinta consolidada, 2026-2027) puede abaratar los datos de mercado; la obligación de cuentas activas de EMIR 3 favorece la compensación en la UE; la liquidación en T+1 en Europa (octubre de 2027) exige inversión en los depositarios. Cualquier fusión con Deutsche Börse tendría que superar a Bruselas, que la vetó en 2012 y 2017 [4].',
    tendencias: 'Integración de la cadena de valor (negociación, compensación y liquidación en casa), diversificación hacia datos, índices y software (Admincontrol), nuevas clases de activo (electricidad, repos) y tokenización. Euronext gana con la consolidación europea; pierde si la cinta consolidada y la competencia de las plataformas multilaterales presionan los precios de los datos y del contado [1, 6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 29.0,
    posicion: '1.ª infraestructura europea de cotización y de negociación de acciones en mercados transparentes (29 % del total europeo) [1]; 3.ª red de depositarios de Europa (8,1 billones de EUR en custodia) [1, 6].',
    competidores: [
      { nombre: 'Deutsche Börse', pais: 'Alemania', ticker: 'DB1', ingresos: 6026, cuota_pct: null, margen_ebit_pct: 50.0, comentario: 'Mucho mayor y más diversificada: derivados (Eurex), post-contratación (Clearstream), software (SimCorp) e índices y datos (ISS STOXX). Margen EBITDA del 58,3 % en 2025 frente al 61,8 % de Euronext [3, 7].' },
      { nombre: 'Intercontinental Exchange', pais: 'EE. UU.', ticker: 'ICE', ingresos: 8452, cuota_pct: null, margen_ebit_pct: 49.6, comentario: 'Rival en derivados europeos (ICE Futures Europe) y en energía; 9.931 M USD de ingresos y 4.929 M de EBIT en 2025, a 1,175 USD/EUR [8].' },
      { nombre: 'London Stock Exchange Group', pais: 'Reino Unido', ticker: 'LSEG', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Datos (antigua Refinitiv) y compensación (LCH, también en París); margen EBITDA del 48 % [8].' },
      { nombre: 'Cboe Europe', pais: 'Países Bajos/Reino Unido', ticker: 'CBOE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor plataforma multilateral de contado en Europa; compite en precio por la negociación de acciones de Euronext.' },
      { nombre: 'SIX Group', pais: 'Suiza', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bolsa suiza y española (BME); rival en post-contratación e información financiera.' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'La liquidez atrae liquidez: Euronext mantiene el 66,2 % de la negociación de sus propias acciones pese a las plataformas multilaterales [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Emisores, custodia y liquidación casi no cambian de proveedor: la custodia crece a doble dígito con 8,1 billones de EUR [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Licencias de ocho mercados regulados, una cámara y cinco depositarios; índices CAC 40, AEX y FTSE MIB (este con FTSE Russell).' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Plataforma única (Optiq) para todos los mercados: 121 M de sinergias con Borsa Italiana [6].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Margen EBITDA ajustado del 62,7 % en 2025 y del 66,1 % en el 2T26 [1, 2].' },
      ],
    },
    amenazas: 'La cinta consolidada europea (MiFIR) puede rebajar el valor de los datos de mercado; las plataformas multilaterales presionan el precio del contado; la propia integración de la post-contratación (depositario único) puede traer más regulación de tarifas. Una fusión entre Deutsche Börse y otro grupo, o una consolidación europea dirigida desde Bruselas, cambiaría el mapa: el consejero delegado reabrió en septiembre la idea de unir los negocios de bolsa con Deutsche Börse, sin conversaciones en marcha [4].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la resiliencia operativa (DORA): una caída de la plataforma o de la cámara tiene coste directo en ingresos y en sanciones. Euronext tiene objetivos de reducción de emisiones validados por SBTi en 2023 y aspira a la neutralidad en 2050; su huella es pequeña (oficinas y centros de datos) [6]. Los productos verdes (bonos ESG, índices) son una fuente de ingresos menor.',
    controversias: 'No se han encontrado sanciones ni litigios relevantes en los últimos tres años en las fuentes leídas.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño y crecimiento del mercado', tipo: 'Núcleo', intentos: '1) Notas de resultados de Euronext y Deutsche Börse (solo cuotas); 2) ficha sectorial de bolsas del repo (no existe todavía); 3) estudios de mercado de pago', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Web de sostenibilidad de Euronext; 2) búsqueda de MSCI y Sustainalytics; 3) URD 2025 (no leído)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Supervisory Board (composición, comisiones y año de nombramiento)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.euronext.com/en/investor-relations/corporate-governance/supervisory-board' },
  { id: 2, titulo: 'Managing Board (composición y trayectoria)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.euronext.com/en/investor-relations/corporate-governance/managing-board' },
  { id: 3, titulo: 'Capital and shareholding (accionistas de referencia a 30-sep-2026 y pacto)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://www.euronext.com/en/investor-relations/capital-and-shareholding' },
  { id: 4, titulo: 'Voting results of the Annual General Meeting held on 20 May 2026', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-05-20', url: 'https://www.euronext.com/en/media/15634/download' },
  { id: 5, titulo: 'Voting results of the Annual General Meeting held on 15 May 2025', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2025-05-15', url: 'https://www.euronext.com/en/media/13599/download' },
  { id: 6, titulo: 'Euronext, Deutsche Boerse gain after CEO revives merger talk (sucesión del consejero delegado en mayo de 2027)', editor: 'Reuters vía live.euronext.com', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://live.euronext.com/en/financial-news/euronext-deutsche-boerse-gain-after-ceo-revives-merger-talk' },
  { id: 7, titulo: 'Results Annual General Meeting Euronext N.V. (dividendo de 3,18 EUR, nombramientos)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-05-20', url: 'https://www.euronext.com/en/investor-relations/financial-information/news/results-annual-general-meeting-euronext-nv' },
  { id: 8, titulo: 'Corporate Governance (estructura de dos consejos y acuerdos con el colegio de reguladores)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-07', url: 'https://www.euronext.com/en/investor-relations/corporate-governance' },
  { id: 9, titulo: 'Euronext publishes Q4 and full year 2025 results (guía de costes 2025 cumplida)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-02-18', url: URL_FY25 },
  { id: 10, titulo: 'Euronext announces its new strategic plan «Innovate for Growth 2027» (balance del plan 2024)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2024-11-08', url: URL_PLAN },
];
const sb = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Consejo de supervisión, consejo de dirección, accionistas y votos de junta de fuentes primarias. Sin remuneración individual del consejero delegado ni operaciones de directivos (registro de la AFM no consultado).',
  directivos: {
    equipo: [
      { nombre: 'Stéphane Boujnah', cargo: 'Consejero delegado y presidente del consejo de dirección', desde: '2015', participacion_pct: null, trayectoria: 'Antes dirigió la banca mayorista de Santander en Europa continental. Bajo su mandato los ingresos pasaron de 458,5 M EUR en 2014 a más de 1.600 M en 2024 y Euronext compró Oslo, Borsa Italiana, Admincontrol y Athex [2, 10]. Deja el cargo en mayo de 2027 [6].' },
      { nombre: 'Giorgio Modica', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Miembro asistente del consejo de dirección; Kepler Cheuvreux lo ve como candidato interno a suceder a Boujnah [2, 6].' },
      { nombre: 'Piero Novelli', cargo: 'Presidente del consejo de supervisión', desde: '2021', participacion_pct: null, trayectoria: 'Fue copresidente de la banca de inversión de UBS y miembro de su comité ejecutivo (2018-2021) [1].' },
      { nombre: 'Manuel Bento', cargo: 'Director de operaciones', desde: null, participacion_pct: null, trayectoria: 'Antes consejero delegado de Euronext Technologies en Oporto; dirigió las migraciones tecnológicas del grupo [2].' },
      { nombre: 'Fabrizio Testa', cargo: 'Consejero delegado de Borsa Italiana', desde: '2021', participacion_pct: null, trayectoria: 'Reelegido en el consejo de dirección en la junta de 2026 [2, 7].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Objetivos del plan «Growth for Impact 2024» y 115 M de sinergias de Borsa Italiana', real: 'Objetivos cumplidos un trimestre antes; 121 M de sinergias a 3T24', cumplida: 'Sí' },
      { anio: '2025', guia: 'Costes subyacentes sin amortización de 670 M (rebajados a 660 M), sin compras', real: '660 M a perímetro constante; 680,1 M con Admincontrol y Athex', cumplida: 'Sí' },
      { anio: '2026', guia: 'Costes subyacentes sin amortización de unos 770 M', real: '369,7 M en el primer semestre, en línea según la empresa', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      sb('Piero Novelli', 'Presidente del consejo de supervisión', 'Independiente', '2021', 'Nombramientos y Gobierno (presidente), Remuneración, Auditoría'),
      sb('Dick Sluimers', 'Vicepresidente', 'Independiente', '2016', 'Remuneración (presidente), Auditoría, Nombramientos y Gobierno'),
      sb('Nathalie Rachou', 'Consejera', 'Independiente', '2019', 'Auditoría (presidenta), Nombramientos y Gobierno, Riesgos'),
      sb('Morten Thorsrud', 'Consejero', 'Independiente', '2019', 'Riesgos (presidente), Auditoría'),
      sb('Muriel De Lathouwer', 'Consejera', 'Independiente', '2024', 'Nombramientos y Gobierno, Remuneración, Riesgos'),
      sb('Fedra Ribeiro', 'Consejera', 'Independiente', '2024', 'Auditoría, Riesgos'),
      sb('Francesca Scaglia', 'Consejera (directora de riesgos de CDP)', 'Dominical', '2025', 'Nombramientos y Gobierno, Remuneración, Riesgos'),
      sb('Olivier Sichel', 'Consejero (consejero delegado de la Caisse des Dépôts)', 'Dominical', '2021', 'Nombramientos y Gobierno'),
      sb('Koen Van Loo', 'Consejero (consejero delegado de SFPIM)', 'Dominical', '2024', null),
      sb('George Handjinicolaou', 'Consejero (presidente de Piraeus Bank; presidió Athex hasta enero de 2026)', 'Otro externo', '2026', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 39.86, voto_remuneracion_contra_pct: 60.14, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La junta de mayo de 2025 rechazó el informe de remuneraciones de 2024 (voto consultivo): 60,14 % en contra y 39,86 % a favor [5]. En la misma junta se aprobó una política de remuneración modificada para el consejo de dirección (98,27 % a favor) [5]. La de 2026 aprobó el informe de 2025 con un 94,50 % a favor [4]. No hemos leído el informe de remuneraciones: métricas del variable, cláusulas de recuperación e importes individuales quedan sin comprobar.',
    accionistas: [
      { nombre: 'Caisse des Dépôts et Consignations', pct: 8.23, tipo: 'Accionista de referencia (Estado francés)', variacion: 'Sin cambios en número de acciones; sube el porcentaje por la amortización de autocartera' },
      { nombre: 'CDP Equity', pct: 8.23, tipo: 'Accionista de referencia (Estado italiano)', variacion: 'Igual' },
      { nombre: 'SFPI-FPIM', pct: 5.44, tipo: 'Accionista de referencia (Estado belga)', variacion: 'Igual' },
      { nombre: 'Intesa Sanpaolo', pct: 1.58, tipo: 'Accionista de referencia', variacion: 'Igual' },
      { nombre: 'ABN AMRO Participaties', pct: 0.53, tipo: 'Accionista de referencia', variacion: 'Igual' },
      { nombre: 'Autocartera', pct: 0.47, tipo: 'Autocartera', variacion: 'Baja tras amortizar la recompra de 2025-2026' },
    ],
    insiders: [],
    control_y_defensas: 'Ningún accionista controla la junta: los cinco accionistas de referencia suman el 24,02 % con un pacto prorrogado en abril de 2024 por cuatro años, que les da derecho a un tercio de los puestos del consejo de supervisión y a ser consultados en la elección del consejero delegado [3]. La estructura de dos consejos y los acuerdos con el colegio de reguladores están pensados para limitar la influencia de un accionista grande: un nuevo presidente debe pasar por el Ministerio de Finanzas neerlandés y los reguladores, y adquirir participaciones significativas exige aprobación regulatoria, lo que hace difícil una OPA hostil [1, 8].',
    alertas: [
      'Rechazo del informe de remuneraciones de 2024 en la junta de 2025 (60,14 % en contra) [5].',
      'Sucesión del consejero delegado en mayo de 2027 sin candidato elegido [6].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneración del consejero delegado y métricas del variable', tipo: 'Núcleo', intentos: '1) Informe de remuneraciones 2025 (URD, no leído); 2) búsqueda en prensa francesa; 3) agregador (Simply Wall St: cifras sin fecha clara, no usadas)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos', tipo: 'Complemento', intentos: '1) Página de «management transactions» de Euronext; 2) registro de la AFM (no consultado); 3) BDIF de la AMF (no aplica a un emisor neerlandés)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ENX.PA, ^FCHI y EXH1.DE (precio, rango, betas, cierres de año)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ENX.PA/history' },
  { id: 2, titulo: 'Euronext N.V.: finances (estimaciones 2026-2028, deuda neta, caja libre)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/EURONEXT-N-V-16725768/finances/' },
  { id: 3, titulo: 'Euronext N.V.: consensus (17 analistas, objetivo medio 168,41, máximo 200, mínimo 136)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/EURONEXT-N-V-16725768/consensus/' },
  { id: 4, titulo: 'Capital and shareholding (101.721.940 acciones emitidas, 0,47 % en autocartera)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://www.euronext.com/en/investor-relations/capital-and-shareholding' },
  { id: 5, titulo: 'Euronext publishes Q2 2026 results (balance a 30-jun-2026)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-07-30', url: URL_Q226 },
  { id: 6, titulo: 'Rendimiento del Bund a 10 años (serie diaria BBSIS)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Informe de Intercontinental Exchange del 8-oct-2026: comparables y transacciones del sector (cifras en EUR a 1,175 USD/EUR)', editor: 'Informe propio (repo)', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'informes/ice-2026-10-08/datos-v2.json' },
  { id: 9, titulo: 'Informe de Deutsche Börse del 14-oct-2026 (múltiplos y cifras de mercado de DB1)', editor: 'Informe propio (repo)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'informes/deutsche-borse-2026-10-14/datos-v2.json' },
  { id: 10, titulo: 'Euronext financial calendar (resultados del 3T26 el 5-nov-2026)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.euronext.com/en/investor-relations/financial-calendar' },
  { id: 11, titulo: 'Euronext publishes Q4 and full year 2025 results (guía de costes 2026 y dividendo)', editor: 'Euronext N.V.', tipo: 'Primaria', fecha: '2026-02-18', url: URL_FY25 },
  { id: 12, titulo: 'Ficha sectorial: infraestructura de mercados y datos financieros, con comparables al cierre del 13/14-oct-2026 (MarketScreener y Stock Analysis vía informes del repo)', editor: 'Ficha propia (repo, análisis de LSEG)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/bolsas-datos-financieros-2026-10-14.md' },
];
// Comparables de la ficha sectorial (sectores/bolsas-datos-financieros-2026-10-14-comparables.json, cierres del 13/14-oct),
// solo los operadores de mercado; capitalización de M USD a M EUR a 1,1126 USD/EUR (la de la ficha).
const ficha = JSON.parse(fs.readFileSync(path.resolve(dir, '..', '..', '..', 'sectores', 'bolsas-datos-financieros-2026-10-14-comparables.json'), 'utf8'));
const USD_EUR = 1.1126;
const compsFicha = ficha.empresas.filter((e) => ['DB1', 'LSEG', 'ICE', 'CME', 'NDAQ', 'TW'].includes(e.ticker)).map((e) => ({ ...e, capitalizacion: Math.round(e.capitalizacion / USD_EUR) }));
const cierres = Object.fromEntries((bolsa.cierres_ejercicio || []).map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'Completo. Precio y bolsa de bolsa.mjs al cierre del 14-oct-2026; consenso de MarketScreener del 14-oct; comparables del informe de ICE (8-oct) más Deutsche Börse (14-oct).',
  identificacion: {
    nombre: 'Euronext N.V.', nombre_corto: 'Euronext', ticker: 'ENX', isin: 'NL0006294274', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Países Bajos', pais_iso: 'NL', sector: 'Financials', industria: 'Capital Markets (Financial Exchanges & Data)', sede: 'Ámsterdam (sede social); dirección en París', fundacion: '2000', empleados: null, web: 'www.euronext.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 101.24, capitalizacion_publicada: null, free_float_pct: 75.4,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Objetivos del plan «Innovate for Growth 2027»: ingresos y EBITDA ajustado con crecimiento anual compuesto superior al 5 % entre 2023 y 2027, inversión del 4-6 % de los ingresos, deuda neta de 1 a 2 veces el EBITDA ajustado, dividendo del 50 % del beneficio publicado y recompras flexibles [11]. Para 2026, costes subyacentes sin amortización de unos 770 M (720 M de base, 35 M de Athex y 15 M de proyectos de crecimiento), confirmados con el 2T26 [5, 11]. Con 2.205 M de ingresos de consenso en 2027 frente a 1.475 M en 2023, el plan queda muy superado (≈ 10 % anual) [2].',
    estimaciones: [
      { periodo: '2026e', ingresos: 2082, ebitda: 1317, ebit: null, bpa: 7.42, dpa: 3.75, fuente: 'MarketScreener, 14-oct-2026 [2]' },
      { periodo: '2027e', ingresos: 2205, ebitda: 1406, ebit: null, bpa: 8.19, dpa: 4.08, fuente: 'MarketScreener, 14-oct-2026 [2]' },
      { periodo: '2028e', ingresos: 2340, ebitda: 1503, ebit: null, bpa: 8.86, dpa: 4.44, fuente: 'MarketScreener, 14-oct-2026 [2]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: null, mantener: null, vender: null, po_medio: 168.41, po_min: 136, po_max: 200 },
    revisiones: 'Solo una fuente con estimaciones completas (MarketScreener); el consenso medio es «sobreponderar» con 17 analistas y el objetivo medio (168,41 EUR) apenas un 1 % por encima del precio [2, 3]. Su BPA es el publicado diluido (6,29 EUR en 2025) y su EBITDA, el ajustado de la empresa (1.143 M en 2025) [2]. No hay serie de revisiones a 3 meses en texto; a mediados de mayo la misma fuente daba un PER 2026 de 19,9 veces a un precio menor, lo que apunta a estimaciones estables o al alza tras el 2T26.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.0,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((anio) => ({ anio, precio_cierre: cierres[anio] ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: compsFicha,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'MarketAxess Holdings', comprador: 'Intercontinental Exchange', ev: 4749, ev_ventas: 6.41, ev_ebitda: 13.0, prima_pct: 33, excluir: false, comentario: 'Pendiente de cierre; 5.580 M USD a 1,175 [8].' },
      { fecha: '2023-06', objetivo: 'Adenza', comprador: 'Nasdaq', ev: 9600, ev_ventas: 17.8, ev_ebitda: 30.7, prima_pct: null, excluir: false, comentario: 'Software de riesgo y regulación; múltiplos sobre previsiones de 2023 [8].' },
      { fecha: '2020-11', objetivo: 'IHS Markit', comprador: 'S&P Global', ev: 36000, ev_ventas: 10.26, ev_ebitda: 24.0, prima_pct: null, excluir: false, comentario: 'Fusión en acciones; datos e índices [8].' },
      { fecha: '2021-04', objetivo: 'Borsa Italiana Group', comprador: 'Euronext', ev: 4325, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio pagado a LSEG; múltiplo no comprobado en las fuentes leídas [11].' },
      { fecha: '2026-01', objetivo: 'Allfunds Group', comprador: 'Deutsche Börse', ev: 5300, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Plataforma de fondos; sin múltiplo oficial [9].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la AFM (no consultado); 2) AMF (emisor neerlandés: no aplica); 3) agregadores', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'desglose de recomendaciones y revisiones a 3 meses', tipo: 'Complemento', intentos: '1) MarketScreener (solo gráfico); 2) búsqueda de Investing y Zonebourse; 3) Allinvestview (instantánea de mayo)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Forum EURONEXT: «Et on reparle d\'une fusion avec…» (14-sep-2026)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-09-14', url: 'https://www.boursorama.com/bourse/forum/1rPENX/detail/468441138/' },
  { id: 2, titulo: 'Forum EURONEXT: «Grosse résistance sur…» (9-jul-2026)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-07-09', url: 'https://www.boursorama.com/bourse/forum/1rPENX/detail/468208820/' },
  { id: 3, titulo: 'Forum EURONEXT: «Conserver» (16-jul-2026)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-07-16', url: 'https://www.boursorama.com/bourse/forum/1rPENX/detail/468231221/' },
  { id: 4, titulo: 'Forum EURONEXT: índice de hilos (entrevistas al consejero delegado, análisis técnico, «vendedor de palas»)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://www.boursorama.com/bourse/forum/1rPENX/' },
  { id: 5, titulo: 'Euronext N.V. (EUXTF/ERNXY): análisis y transcripciones (RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-31', url: 'https://seekingalpha.com/api/sa/combined/EUXTF.xml' },
  { id: 6, titulo: 'Euronext ouvre la porte à un rapprochement avec Deutsche Börse (Zonebourse)', editor: 'Fortuneo Bourse', tipo: 'Foros y redes', fecha: '2026-09-14', url: 'https://bourse.fortuneo.fr/actualites/euronext-ouvre-la-porte-a-un-rapprochement-avec-deutsche-borse-5325596' },
];
const E = {
  _estado: 'Debate escaso: Boursorama (pocos mensajes por hilo), RSS de Seeking Alpha (artículos, no comentarios) y prensa con comentarios. Reddit y Stocktwits sin el valor.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Boursorama, foro de Euronext (Francia)', fecha: '2026-09', n_comentarios: 8, tono: 'Positivo', resumen: 'Tras la entrevista del consejero delegado al FT, se especula con la fusión con Deutsche Börse y con otras compras (la bolsa de Varsovia); el tono es de aprobación de la gestión [1, 3].' },
      { plataforma: 'Boursorama, foro de Euronext: análisis técnico', fecha: '2026-07', n_comentarios: 6, tono: 'Dividido', resumen: 'Debate sobre una resistencia en torno a 150-153 EUR y un posible «triple techo» en julio, antes de la ruptura al alza de septiembre-octubre [2, 3].' },
      { plataforma: 'Boursorama, índice de hilos (ene-oct 2026)', fecha: '2026-10', n_comentarios: 40, tono: 'Positivo', resumen: 'Predominan los hilos de elogio a la dirección y la tesis de «vendedor de palas» de la bolsa; pocas voces bajistas, algunas sobre la salida del CAC 40 y caídas puntuales [4].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-02', n_comentarios: 5, tono: 'Positivo', resumen: 'Los últimos artículos son de compra: «barata frente a sus pares» (dic-25) y «oportunidad previa a resultados» (feb-26) [5].' },
      { plataforma: 'Prensa con comentarios (Zonebourse/Fortuneo)', fecha: '2026-09', n_comentarios: 5, tono: 'Neutro', resumen: 'La fusión con Deutsche Börse se ve con escepticismo por los vetos de Bruselas de 2012 y 2017 [6].' },
    ],
    temas: [
      { tema: 'Fusión con Deutsche Börse y consolidación europea', postura: 'Alcista', peso: 'Alto', contraste: null },
      { tema: 'Calidad de la gestión de Boujnah (y su sucesión)', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'Análisis técnico: resistencias y máximos históricos', postura: 'Dividida', peso: 'Medio', contraste: null },
      { tema: '«Vendedor de palas»: gana con la volatilidad', postura: 'Alcista', peso: 'Medio', contraste: null },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas.');
