// Escribe las notas A-E de Symrise (corte 2026-10-14) a partir de los documentos descargados en notas/docs
// (informe corporativo 2025, estados consolidados 2022-2024, informe del 1S26, notas de prensa) y de datos de mercado.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const SY = 'https://www.symrise.com/investors/financial-results/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Corporate Report 2025 (informe de gestión, estados consolidados y notas 2024-2025)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-03-04', url: SY + '?doc=corporate-report-2025' },
  { id: 2, titulo: 'Consolidated financial statements 2024 (Konzernabschluss, cuentas 2023-2024)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2025-03-04', url: 'https://symrise.com/corporatereport/2024/home/Symrise_GB24_Konzernabschluss_EN_geschuetzt.pdf' },
  { id: 3, titulo: 'Consolidated financial statements 2023 (cuentas 2022-2023)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2024-03-06', url: 'https://www.symrise.com/corporatereport/2023/downloads/SYM_consolidatedfinancialstatements_2023_EN.pdf' },
  { id: 4, titulo: 'Consolidated financial statements 2022 (cuentas 2021-2022)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2023-03-08', url: 'https://www.symrise.com/corporatereport/2022/downloads/SYM_consolidatedfinancialstatements_2022_EN.pdf' },
  { id: 5, titulo: 'Interim Group Report January-June 2026', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-07-30', url: SY + '?doc=interim-h1-2026' },
  { id: 6, titulo: 'Press release H1 2026: Symrise reports solid H1 2026 performance with accelerating growth momentum in Q2', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-07-30', url: SY + '?doc=press-h1-2026' },
  { id: 7, titulo: 'Financial Information FY 2025 (cifras publicadas y ajustadas, segmentos, deuda neta)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-03-04', url: SY + '?doc=financial-information-fy-2025' },
  { id: 8, titulo: 'Press release: Financial Results 2025', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-03-04', url: SY + '?doc=press-fy-2025' },
  { id: 9, titulo: 'Analyst presentation H1 2026', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-08-18', url: SY + '?doc=analyst-h1-2026' },
  { id: 10, titulo: 'Q1 2026 press release (trading statement)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-04-29', url: SY + '?doc=q1-2026' },
  { id: 11, titulo: 'EQS-News: Symrise AG again raises sales significantly in 2023 (EBITDA ajustado 903,5 M; efectos únicos 52 M)', editor: 'EQS / Börse München', tipo: 'Primaria', fecha: '2024-03-06', url: 'https://boerse-muenchen.de/news/EQS214729/EQS-News_-Symrise-AG-again-raises-sales-significantly-in-2023-' },
];
const c = (p, o) => ({ periodo: p, ...o });
const cuenta = [
  c('2021', { ingresos: 3825.7, coste_ventas: 2346.9, gastos_generales: 784.7, ebitda: 813.6, amortizaciones: 254.7, ebit: 559.0, resultado_financiero: -42.8, bai: 516.2, impuestos: 131.2, minoritarios: 10.1, beneficio_neto: 374.9, gastos_financieros: 46.4, participadas_en_ebitda: 4.7, no_recurrentes_en_ebitda: null, bpa: 2.70, dpa: 1.02, dpa_extraordinario: 0, acciones_diluidas: 138.9 }),
  c('2022', { ingresos: 4618.5, coste_ventas: 2916.4, gastos_generales: 938.5, ebitda: 795.4, amortizaciones: 291.4, ebit: 504.0, resultado_financiero: -72.9, bai: 431.1, impuestos: 140.4, minoritarios: 10.7, beneficio_neto: 280.0, gastos_financieros: 81.6, participadas_en_ebitda: -113.3, no_recurrentes_en_ebitda: null, bpa: 2.00, dpa: 1.05, dpa_extraordinario: 0, acciones_diluidas: 139.8 }),
  c('2023', { ingresos: 4730.2, coste_ventas: 3037.6, gastos_generales: 951.6, ebitda: 851.7, amortizaciones: 292.3, ebit: 559.4, resultado_financiero: -94.4, bai: 464.9, impuestos: 120.0, minoritarios: 4.5, beneficio_neto: 340.5, gastos_financieros: 109.4, participadas_en_ebitda: 9.2, no_recurrentes_en_ebitda: 51.8, bpa: 2.44, dpa: 1.10, dpa_extraordinario: 0, acciones_diluidas: 139.8 }),
  c('2024', { ingresos: 4998.5, coste_ventas: 3035.1, gastos_generales: 998.1, ebitda: 1033.8, amortizaciones: 316.0, ebit: 717.8, resultado_financiero: -72.0, bai: 645.8, impuestos: 163.8, minoritarios: 3.7, beneficio_neto: 478.2, gastos_financieros: 87.8, participadas_en_ebitda: 5.8, no_recurrentes_en_ebitda: null, bpa: 3.42, dpa: 1.20, dpa_extraordinario: 0, acciones_diluidas: 139.8 }),
  c('2025', { ingresos: 4929.3, coste_ventas: 3074.6, gastos_generales: 993.8, ebitda: 912.6, amortizaciones: 447.6, ebit: 465.0, resultado_financiero: -66.8, bai: 398.1, impuestos: 144.6, minoritarios: 4.2, beneficio_neto: 249.3, gastos_financieros: 89.9, participadas_en_ebitda: -144.3, no_recurrentes_en_ebitda: 18.2, bpa: 1.78, dpa: 1.25, dpa_extraordinario: 0, acciones_diluidas: 139.8 }),
];
const b = (p, o) => ({ periodo: p, activos_contrato: null, pasivos_contrato: null, ...o });
const balanceH = [
  b('2021', { activo_total: 6673.2, activo_corriente: 2332.0, pasivo_corriente: 1145.4, pasivo_total: 3420.7, fondo_comercio: 1602.5, intangibles: 905.2, inmovilizado_material: 1323.5, existencias: 989.8, clientes: 729.8, proveedores: 412.8, caja: 453.8, deuda_financiera: 1695.9, arrendamientos: 104.9, patrimonio_neto: 3188.1, minoritarios: 64.4, reservas: 1286.2 }),
  b('2022', { activo_total: 7783.0, activo_corriente: 2683.8, pasivo_corriente: 971.3, pasivo_total: 4172.5, fondo_comercio: 1902.1, intangibles: 997.9, inmovilizado_material: 1565.9, existencias: 1327.6, clientes: 856.0, proveedores: 529.6, caja: 314.9, deuda_financiera: 2392.6, arrendamientos: 154.8, patrimonio_neto: 3551.4, minoritarios: 59.1, reservas: 1388.4 }),
  b('2023', { activo_total: 7845.6, activo_corriente: 2702.2, pasivo_corriente: 936.6, pasivo_total: 4159.4, fondo_comercio: 1882.6, intangibles: 889.8, inmovilizado_material: 1669.0, existencias: 1255.8, clientes: 868.3, proveedores: 489.3, caja: 393.0, deuda_financiera: 2373.6, arrendamientos: 185.1, patrimonio_neto: 3631.3, minoritarios: 54.9, reservas: 1581.0 }),
  b('2024', { activo_total: 8324.7, activo_corriente: 3106.3, pasivo_corriente: 1925.2, pasivo_total: 4305.1, fondo_comercio: 1916.5, intangibles: 814.3, inmovilizado_material: 1749.8, existencias: 1283.3, clientes: 938.1, proveedores: 504.3, caja: 709.5, deuda_financiera: 2351.7, arrendamientos: 194.1, patrimonio_neto: 3981.2, minoritarios: 38.5, reservas: 1862.2 }),
  b('2025', { activo_total: 7903.8, activo_corriente: 3307.8, pasivo_corriente: 1311.1, pasivo_total: 4161.7, fondo_comercio: 1810.6, intangibles: 672.6, inmovilizado_material: 1547.5, existencias: 1069.2, clientes: 957.2, proveedores: 423.3, caja: 1009.8, deuda_financiera: 2461.7, arrendamientos: 168.4, patrimonio_neto: 3719.6, minoritarios: 22.4, reservas: 1925.4 }),
];
const f = (p, o) => ({ periodo: p, recompras: 0, emision_acciones: 0, ...o });
const flujosH = [
  f('2021', { flujo_operativo: 521.6, capex: 174.2, pagos_arrendamientos: 20.6, adquisiciones: 610.4, desinversiones: 63.5, dividendos: 138.0, intereses_en_financiacion: 27.5 }),
  f('2022', { flujo_operativo: 360.1, capex: 250.2, pagos_arrendamientos: 26.6, adquisiciones: 760.2, desinversiones: 6.2, dividendos: 146.3, intereses_en_financiacion: 39.5 }),
  f('2023', { flujo_operativo: 719.5, capex: 270.2, pagos_arrendamientos: 27.7, adquisiciones: 94.3, desinversiones: 3.7, dividendos: 153.2, intereses_en_financiacion: 65.3 }),
  f('2024', { flujo_operativo: 894.9, capex: 242.8, pagos_arrendamientos: 32.2, adquisiciones: 71.7, desinversiones: 8.0, dividendos: 158.8, intereses_en_financiacion: 63.8 }),
  f('2025', { flujo_operativo: 772.3, capex: 211.4, pagos_arrendamientos: 34.0, adquisiciones: 103.2, desinversiones: 4.1, dividendos: 172.9, intereses_en_financiacion: 57.6 }),
];
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBITDA', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

guarda('A', {
  _estado: 'Completa. Cuentas 2021-2025 de los estados consolidados auditados (no hay XBRL ESEF de Symrise en filings.xbrl.org: el LEI 529900D82I6R9601CF26 devuelve 404), 1S26 del informe intermedio.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 4914.9, ebitda: 902.8, ebit: 465.3, beneficio_neto: 246.0, bpa: 1.77, dpa: 1.25, dpa_extraordinario: 0, fcf: 594.4, participadas_en_ebitda: -145.2, no_recurrentes_en_ebitda: 17.5 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Swedencare pasa a asociada (puesta en equivalencia) y compra de Probi y de negocios de alimentación animal; 760 M en adquisiciones y participaciones [4].' },
    ],
    comentario: 'Las ventas pasaron de 3.826 M EUR en 2021 a 4.929 M en 2025 (TCAC del 6,5 %), pero casi todo el salto llegó en 2022 (+20,7 %, con compras y divisa); desde entonces crecen un 2,2 % anual en euros [1-4]. El crecimiento orgánico fue del 2,8 % en 2025, frente a una guía inicial del 5-7 % [1], y del 2,0 % en el 1S26 (4,5 % en el 2T) con una divisa que resta 2,4 puntos [5]. El margen EBITDA ajustado subió del 19,1 % de 2023 al 20,7 % en 2024 y al 21,9 % en 2025 por precio, mejor uso de materias primas y el programa de eficiencia ONE SYM [1, 7, 11]; en el 1S26 fue del 21,8 % [5]. El beneficio publicado de 2022 y de 2025 está deprimido por dos deterioros de la participación en Swedencare (126 M y 150 M, dentro del EBIT por estar en puesta en equivalencia) y, en 2025, por un deterioro de 149 M del negocio de terpenos en venta, registrado en amortizaciones [1, 4].',
    ajustes: 'Symrise publica EBITDA, EBIT y BPA ajustados por efectos únicos. 2022: deterioro de Swedencare de 126,1 M (EBITDA ajustado 921,5 M) [4]. 2023: 52 M de efectos únicos (EBITDA ajustado 903,5 M frente a 851,7 M publicado) [11]. 2024: sin ajustes relevantes (EBITDA 1.033 M). 2025: deterioro de Swedencare de 150,0 M, deterioro de 149,0 M del grupo enajenable de terpenos y ≈18 M de reestructuración, competencia y transformación; BPA ajustado 3,67 EUR frente a 1,78 publicado [1, 7]. 1S26: ≈9 M de costes de ONE SYM y competencia [5]. Los costes de transformación se repiten desde 2024: no los tratamos como extraordinarios en la proyección.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 2553.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 553.6, margen_ebitda_pct: 21.7, bpa: 1.92, vs_consenso: null },
      { periodo: '2S25', ingresos: 2375.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 359.0, margen_ebitda_pct: 15.1, bpa: -0.14, vs_consenso: null },
      { periodo: '1S26', ingresos: 2539.3, crecimiento_pct: -0.6, crecimiento_organico_pct: 2.0, ebitda: 543.8, margen_ebitda_pct: 21.4, bpa: 1.91, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'En marzo (resultados 2025) la dirección presentó una guía de 2026 prudente, crecimiento orgánico del 2-4 % y margen EBITDA ajustado del 21,5-22,5 %, tras rebajar dos veces la de 2025 (del 5-7 % al 2,3-3,3 %) [1, 8]. El 1T26 fue flojo (crecimiento orgánico negativo en Scent & Care por la base alta de perfumería fina y los filtros UV) [10]. En julio el mensaje cambió de tono: el 2T creció un 4,5 % orgánico, con alimentación y bebidas en tasas de un dígito medio, fragancia de consumo y moléculas aromáticas en un dígito alto, Norteamérica y Asia en recuperación; se confirmó la guía y la meta de 2028 (5-7 % orgánico, margen del 21-23 %), y se anunció la compra de Floral Concept (naturales para perfumería, Grasse) [5, 6, 9]. Los analistas preguntaron por la distancia entre el 2-4 % de este año y el 5-7 % de 2028, por la alimentación animal (precios a la baja en Pet Nutrition) y por los fletes del mar Rojo y Ormuz; la dirección no cuantificó cuánto del ahorro de ONE SYM se reinvierte ni dio cifras de Floral Concept [6, 9].',
    confianza: 'Media',
  },
  balance: {
    historico: balanceH,
    vencimientos: null,
    liquidez: 'Caja de 451 M EUR a 30-jun-2026 tras amortizar 306 M netos de deuda a corto y recomprar acciones por 192 M; deuda financiera bruta de 2.096 M, casi toda a largo plazo (2.059 M) [5].',
    rating: 'Sin rating público citado en los documentos leídos',
    coste_deuda_pct: 3.7,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones de 477 M EUR a 30-jun-2026 (468 M a cierre de 2025), sobre todo planes alemanes de prestación definida [5]. Los arrendamientos suman 181 M [5]. La deuda neta publicada incluye la deuda financiera a corto y a largo plazo y los arrendamientos (1.826 M en junio); con pensiones, 2.303 M, 2,2 veces el EBITDA ajustado [5]. No hay pagos aplazados de adquisiciones relevantes. Contingencias: investigaciones de competencia desde 2023 (Comisión Europea, WEKO, DOJ, SAMR, CCI, CMA) sobre los cuatro grandes del sector; el DOJ, la CMA, la WEKO y la CCI han suspendido o propuesto suspender la de Symrise, y ninguna autoridad ha formulado cargos [5].',
    comentario: 'La deuda bruta se refinanció en 2025 (bono de noviembre de 2025 amortizado y nuevas emisiones por 809 M) [1]: por eso la deuda a corto bajó de 861 M en 2024 a 400 M en 2025 y a 37 M en junio de 2026, con la caja usada para pagar ese corto y la recompra [5]. La deuda neta con arrendamientos bajó de 1.836 M (2024) a 1.620 M (2025) y subió a 1.826 M en junio por el dividendo (172 M) y la recompra [5, 7]. El circulante comercial es alto para el sector: 32-35 % de las ventas, con existencias de 1.069-1.129 M; las existencias cayeron 214 M en 2025 tras el exceso de 2022 [1, 4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'El flujo operativo fue de 772 M EUR en 2025 (895 M en 2024) y de 297 M en el 1S26, 116 M más que un año antes por menos impuestos pagados [1, 5]. La conversión mejoró desde 2022, cuando el aumento de existencias (−308 M) hundió el flujo a 360 M [4]. El capex en efectivo bajó del 5,7 % de las ventas en 2023 al 4,3 % en 2025 [1, 2]; Symrise no separa mantenimiento y crecimiento; estimación propia: el mantenimiento se acerca a la amortización sin intangibles comprados (≈4 % de las ventas). Los intereses se pagan en financiación (58 M en 2025) [1]. La caja libre de negocio ajustada (antes de impuestos e intereses) fue del 15,8 % de las ventas en 2025 y del 13,7 % en el 1S26 [5, 7].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers GmbH Wirtschaftsprüfungsgesellschaft',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: 'Las cuentas se preparan bajo NIIF-UE con la cuenta por función [1]. Tres señales a vigilar. Primera, dos deterioros de Swedencare (126 M en 2022 y 150 M en 2025) muestran que el precio pagado en 2021-2022 no se ha recuperado; el test de junio de 2026 usó un coste de capital del 8,45 % y concluyó que el valor en uso (≈295 M) se sostiene [5], pero la cotización de Swedencare ha caído un 40 % desde diciembre y el valor de mercado de la participación ronda hoy 133 M. Segunda, los costes de transformación (ONE SYM) se ajustan cada año desde 2024: el EBITDA ajustado sobreestima el recurrente en ≈0,2-0,4 puntos de margen. Tercera, el deterioro de terpenos (149 M) se registró en amortizaciones, de modo que el EBITDA publicado de 2025 no lo recoge y el EBIT sí [1, 7]. Los pagos en acciones son menores (planes en efectivo virtual).',
    senales: [
      { senal: 'Riesgo de un tercer deterioro de Swedencare', nivel: 'Media', comentario: 'Valor contable ≈295 M EUR frente a ≈133 M a precio de mercado (22,85 SEK); la diferencia equivale a ≈1,2 EUR por acción [1, 5].' },
      { senal: 'Costes de transformación ajustados cada año', nivel: 'Baja', comentario: '≈9 M en el 1S26 y ≈18 M en 2025: recurrentes en la práctica [5, 7].' },
      { senal: 'Deterioro de activos en venta dentro de amortizaciones', nivel: 'Baja', comentario: '149 M de terpenos en 2025: el EBITDA publicado (912,6 M) no lo refleja [7].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Taste, Nutrition & Health', 'Sabores para alimentación y bebidas, naturales (Diana), alimentación animal (palatabilidad), probióticos (Probi) y la asociada Swedencare.', [['2021', 2334.6, 531], ['2022', 2912.5, 631], ['2023', 2978.0, 627], ['2024', 3090.7, 686], ['2025', 3028.1, 722]]),
      seg('Scent & Care', 'Fragancias (fina y de consumo), ingredientes cosméticos (filtros UV, activos), moléculas aromáticas (mentol, ingredientes de perfumería) y terpenos (en venta).', [['2021', 1491.1, 283], ['2022', 1706.0, 291], ['2023', 1752.2, 277], ['2024', 1907.8, 347], ['2025', 1901.2, 359]]),
    ],
    geografias: [
      { nombre: 'EAME', peso_pct: 41.0 }, { nombre: 'Norteamérica', peso_pct: 24.9 }, { nombre: 'Asia/Pacífico', peso_pct: 20.8 }, { nombre: 'Latinoamérica', peso_pct: 13.3 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '2025: 2,8 %', valor_actual: '1S26: 2,0 % (2T: 4,5 %)', variacion: 'Acelera en el 2T', comentario: 'Guía 2026: 2-4 % [5, 7].' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '2024: 20,7 %', valor_actual: '2025: 21,9 %; 1S26: 21,8 %', variacion: '+1,2 puntos en 2025', comentario: 'Guía 2026: 21,5-22,5 % [5, 7].' },
      { kpi: 'Caja libre de negocio ajustada / ventas', valor_anterior: '2024: 13,6 %', valor_actual: '2025: 15,8 %; 1S26: 13,7 %', variacion: '+2,2 puntos', comentario: 'Meta: más del 14 % [5, 7].' },
      { kpi: 'Deuda neta con arrendamientos / EBITDA', valor_anterior: '2024: 1,8x', valor_actual: 'jun-26: 1,7x', variacion: 'Estable', comentario: 'Con pensiones, 2,2x [5].' },
      { kpi: 'Empleados (FTE)', valor_anterior: 'dic-25: 12.745', valor_actual: 'jun-26: 12.936', variacion: '+191', comentario: '[5]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) nota 25 del Corporate Report 2025 (texto partido en columnas, sin calendario legible); 2) informe del 1S26 (no lo trae); 3) presentación a analistas (solo deuda neta)', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'XBRL ESEF', tipo: 'Complemento', intentos: '1) cuentas.mjs --esef "Symrise" (ninguna entidad); 2) LEI 529900D82I6R9601CF26 de GLEIF en filings.xbrl.org (404); 3) web de inversores (solo PDF)', decision: 'Cuentas tomadas de los PDF auditados; deuda e ingresos comprobados a mano (corto + largo plazo)' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Corporate Report 2025: mercado AFF (46,8 mil M EUR), mercado relevante (56,5 mil M), cuotas', editor: 'Symrise AG (con datos de IAL Consultants)', tipo: 'Primaria', fecha: '2026-03-04', url: SY + '?doc=corporate-report-2025' },
  { id: 2, titulo: 'Análisis de Givaudan del repositorio (14-oct-2026): cuentas, márgenes y valoración', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/givaudan-2026-10-14/' },
  { id: 3, titulo: 'Yahoo Finance: cotización, valor empresa, EBITDA y estimaciones de Givaudan, DSM-Firmenich, IFF, Kerry, Croda, Sensient y Novonesis', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 4, titulo: 'Interim Group Report January-June 2026 (investigaciones de competencia, Floral Concept, terpenos)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-07-30', url: SY + '?doc=interim-h1-2026' },
  { id: 5, titulo: 'Swedencare AB half-year report April-June 2026', editor: 'Swedencare AB', tipo: 'Primaria', fecha: '2026-07-22', url: 'https://www.swedencare.com/en/press/swedencare-ab-publ-half-year-report-april-1st-june-30th-2026' },
  { id: 6, titulo: 'Remuneration Report 2025 y Corporate Report 2025: historia y estructura del grupo', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-03-04', url: SY + '?doc=remuneration-report-2025' },
];
guarda('B', {
  _estado: 'Completa. Tamaño de mercado de la propia Symrise (con IAL Consultants); la ficha sectorial de ingredientes no existía al hacer esta nota.',
  historia: {
    resumen: 'Symrise nació en 2003 de la fusión de Haarmann & Reimer (fundada en 1874, de Bayer) y Dragoco (1919), ambas de Holzminden, bajo control del fondo EQT; salió a bolsa en 2006 y entró en el DAX en 2021 [1]. Creció con compras: Diana (2014, naturales y alimentación animal, 1.300 M), Pinova (2016, terpenos), ADF/IDF (2019, ingredientes de pollo para alimentación animal), Probi y una participación en Swedencare (2021-2022) [1, 6]. Desde 2024, con Jean-Yves Parisot como consejero delegado, la estrategia ONE Symrise reorganiza el grupo en dos segmentos, vende negocios de poco margen (piensos de acuicultura en Ecuador, terpenos) y busca eficiencia con el programa ONE SYM [4].',
    hitos: [
      { anio: '2003', hito: 'Fusión de Haarmann & Reimer y Dragoco bajo EQT [1].' },
      { anio: '2006', hito: 'Salida a bolsa en Fráncfort [1].' },
      { anio: '2014', hito: 'Compra de Diana: naturales y palatabilidad para alimentación animal [6].' },
      { anio: '2016', hito: 'Compra de Pinova (terpenos, EE. UU.) [6].' },
      { anio: '2021', hito: 'Entrada en el DAX; compra de participaciones en Swedencare [1].' },
      { anio: '2022', hito: 'Swedencare pasa a asociada (≈41 %); primer deterioro de 126 M [1].' },
      { anio: '2024', hito: 'Jean-Yves Parisot, consejero delegado; estrategia ONE Symrise y dos segmentos [6].' },
      { anio: '2025', hito: 'Segundo deterioro de Swedencare (150 M) y terpenos en venta [1].' },
      { anio: '2026', hito: 'Primera recompra de acciones (hasta 400 M) y compra anunciada de Floral Concept [4].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Symrise vende ingredientes que dan sabor, olor o función a productos de consumo: sabores para alimentos y bebidas (salados, dulces, bebidas, naturales), ingredientes para alimentación de mascotas (palatabilidad y nutrición), probióticos, fragancias para perfumería fina y para detergentes y cosmética, ingredientes cosméticos (filtros solares, activos, conservantes) y moléculas aromáticas como el mentol [1]. Sus clientes son fabricantes de alimentación, bebidas, cosmética, perfumes, higiene y comida para mascotas, desde multinacionales hasta empresas regionales. Tiene más de 100 centros; Holzminden (Alemania) es la mayor planta, con más de 3.000 empleados, y produce en Francia, España, Brasil, México, Singapur, China, India, Japón y EE. UU. [1].',
    como_gana_dinero: 'Cobra por kilo de ingrediente o de composición diseñada para un producto concreto del cliente. La receta queda dentro del producto final y el cliente rara vez la cambia durante su vida comercial: los ingresos son recurrentes de hecho, aunque no contractuales. El coste de un sabor o de una fragancia es una parte pequeña del coste del producto final y Symrise traslada la inflación de materias primas con meses de retraso [1]. El margen depende de la mezcla (perfumería fina y naturales, más altos; alimentación animal y moléculas aromáticas, más bajos), del precio de materias primas vegetales y petroquímicas y de la utilización de las plantas. Estacionalidad baja [4].',
    clientes: 'Symrise no publica concentración de clientes; el sector trabaja con listas cerradas de proveedores («core lists») de las grandes de consumo, lo que da estabilidad a quien está dentro y barreras a quien no [1]. El poder de precios se vio en 2022-2024: trasladó la inflación de materias primas y el margen EBITDA ajustado volvió del 19,1 % de 2023 al 21,9 % de 2025 [1]. Pierde poder de precios en negocios más genéricos: en moléculas aromáticas sufrió en 2025 la competencia china en precio y volumen, y en Pet Nutrition los precios se normalizan a la baja en 2026 [1, 4].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de sabores y fragancias, moléculas aromáticas e ingredientes cosméticos (AFF), que Symrise cifra con IAL Consultants en ≈46,8 mil M EUR en 2025, más probióticos (6,5 mil M) e ingredientes para alimentación animal (3,2 mil M): ≈56,5 mil M EUR [1]. Usamos ese perímetro porque es el que da la cuota de la empresa (≈9 %). La comparación con Givaudan se hace en el mercado AFF tradicional [1, 2].',
    tamano: '≈56,5 mil M EUR en 2025 (mercado relevante de Symrise; AFF tradicional ≈46,8 mil M) [1]',
    unidad_serie: 'millones de EUR',
    serie: [
      { anio: '2025', tamano: 56500 }, { anio: '2026e', tamano: 58200 }, { anio: '2027e', tamano: 59900 }, { anio: '2028e', tamano: 61700 },
    ],
    tcac_historico_pct: 3.0,
    tcac_previsto_pct: 3.0,
    cr5_pct: 52.0,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Consumo de alimentos procesados y bebidas en emergentes', efecto: '+', horizonte: 'Estructural', evidencia: 'Latinoamérica creció un 6,6 % orgánico en 2025 y Asia/Pacífico un 3,2 % [1].' },
      { driver: 'Naturales y etiqueta limpia', efecto: '+', horizonte: 'Estructural', evidencia: 'Naturales y salados crecieron a un dígito alto en el 2T26; compra de Floral Concept para llevarlo a perfumería [4].' },
      { driver: 'Desestocaje y volúmenes de las grandes de consumo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La guía de 2025 bajó del 5-7 % al 2,3-3,3 % orgánico por demanda débil [1].' },
      { driver: 'Competencia china en moléculas aromáticas', efecto: '−', horizonte: 'Estructural', evidencia: 'Presión de precio y volumen en Aroma Molecules en 2025 [1].' },
      { driver: 'Divisa (dólar y emergentes)', efecto: '−', horizonte: 'Cíclico', evidencia: 'La divisa restó 3,9 puntos a las ventas de 2025 y 2,4 en el 1S26 [1, 4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro grandes con el 52 % del mercado AFF compiten por proyectos de las mismas multinacionales; la rivalidad es por servicio e innovación más que por precio, salvo en moléculas aromáticas [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes muy grandes con listas cerradas de proveedores, pero el ingrediente pesa poco en su coste y cambiarlo exige reformular y volver a probar con consumidores [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas vegetales y petroquímicas diversificadas; Symrise integra parte (mentol, terpenos, cebollas, vainilla de Madagascar) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Las bibliotecas de recetas, la regulación de seguridad alimentaria y cosmética y el acceso a las listas de proveedores frenan a los nuevos [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Pocas alternativas al sabor o la fragancia diseñados; el riesgo está en la formulación interna de algunos clientes y en herramientas de IA (sección de riesgos) [1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Tras el desestocaje de 2023 y la demanda débil de 2025, el crecimiento orgánico de Symrise volvió al 4,5 % en el 2T26 y Givaudan acaba de publicar unas ventas de nueve meses que subieron su cotización un 6,5-7 % el 13-oct [2, 4]. El sector aguantó 2008-09 y 2020 con caídas pequeñas de ventas (bienes de consumo básico), y en 2022 sufrió por la inflación de costes, que trasladó con retraso. Indicadores: crecimiento orgánico trimestral de los cuatro grandes y volúmenes de las multinacionales de consumo.' },
    regulacion: 'Regulación de aditivos y aromas (Reglamento CE 1334/2008 en la UE, FDA/GRAS en EE. UU.), de cosméticos (CE 1223/2009, con restricciones a filtros UV y alérgenos) y REACH para sustancias químicas [1]. Investigaciones de competencia desde marzo de 2023 a los cuatro grandes (Comisión Europea, WEKO, DOJ, SAMR, CCI, CMA): el DOJ suspendió la de Symrise el 5-feb-2026, la CMA en mayo de 2025, la CCI en julio de 2026 y la WEKO propuso suspenderla; siguen contra IFF, Givaudan y DSM-Firmenich [4]. Aranceles estadounidenses de 2025-2026 señalados como riesgo por la empresa [1].',
    tendencias: 'Naturales, reducción de azúcar y sal, proteínas alternativas, cuidado de mascotas y biotecnología (fermentación) desplazan la demanda hacia soluciones más complejas, donde los grandes ganan [1]. La inteligencia artificial se usa en la creación de fragancias y sabores (Symrise lo hace desde 2018 con herramientas propias) y acorta los ciclos de desarrollo; es más una herramienta de los grandes, que tienen los datos de recetas y de pruebas sensoriales, que una puerta para nuevos competidores. Los competidores asiáticos ganan cuota en moléculas aromáticas genéricas [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 8.7,
    posicion: '≈8,7 % del mercado relevante de 56,5 mil M EUR (4.929 M de ventas); 4.º mundial en el mercado AFF tradicional (≈11 %), tras Givaudan (17 %), DSM-Firmenich (15 %) e IFF (9 % en Taste y Scent) según la empresa [1].',
    competidores: [
      { nombre: 'Givaudan', pais: 'Suiza', ticker: 'GIVN', ingresos: 7939, cuota_pct: 17.0, margen_ebit_pct: null, comentario: 'Líder, más margen (EBITDA ≈24 %) y más peso en perfumería fina y sabores; ROIC ≈14 % [1, 2, 3].' },
      { nombre: 'DSM-Firmenich', pais: 'Suiza/Países Bajos', ticker: 'DSFIR', ingresos: 9055, cuota_pct: 15.0, margen_ebit_pct: null, comentario: 'Firmenich (perfumería y sabores) más ingredientes de nutrición; vendiendo la nutrición animal [1, 3].' },
      { nombre: 'IFF', pais: 'EE. UU.', ticker: 'IFF', ingresos: 9630, cuota_pct: 9.0, margen_ebit_pct: null, comentario: 'Más endeudado tras la compra de N&B de DuPont; vendiendo negocios no esenciales [1, 3].' },
      { nombre: 'Kerry Group', pais: 'Irlanda', ticker: 'KRZ', ingresos: 6631, cuota_pct: null, margen_ebit_pct: null, comentario: 'Sabor y nutrición para alimentación; compite en salados y bebidas [3].' },
      { nombre: 'Croda', pais: 'Reino Unido', ticker: 'CRDA', ingresos: 2043, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ingredientes cosméticos y de fragancias (Iberchem); compite con Cosmetic Ingredients [3].' },
      { nombre: 'Sensient', pais: 'EE. UU.', ticker: 'SXT', ingresos: 1522, cuota_pct: null, margen_ebit_pct: null, comentario: 'Colores y sabores; más pequeño [3].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: negocio de proveedor industrial.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'La receta va dentro del producto del cliente; cambiarla exige reformular y volver a probar; el margen se recuperó 2,8 puntos en dos años tras la inflación [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Bibliotecas de recetas y moléculas, ≈180 solicitudes de patente en cosmética en diez años [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Integración en materias primas (mentol, naturales de Diana), pero sin ventaja en moléculas frente a China [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Cuatro grandes con el 52 % del mercado y listas cerradas de proveedores [1].' },
      ],
    },
    amenazas: 'Tres amenazas. La primera, que el crecimiento siga por debajo del de Givaudan (Symrise creció un 2,8 % orgánico en 2025 y Givaudan más), señal de que pierde proyectos [1, 2]. La segunda, la competencia china en moléculas aromáticas y en ingredientes cosméticos genéricos, que ya presiona precios [1]. La tercera, a más largo plazo, que las grandes de consumo internalicen parte de la formulación con herramientas de IA; la probabilidad es baja en cinco años porque el valor está en las recetas probadas, la regulación y el suministro.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es el abastecimiento de materias primas naturales (vainilla de Madagascar, cebollas, cítricos) con riesgo de clima y de derechos humanos, que la empresa audita con SEDEX/SMETA y que forma parte del bonus del consejero delegado [1]. Segundo, la seguridad de producto y la regulación de filtros UV y alérgenos, que ya resta ventas en Care & Wellness [4]. Tercero, las emisiones de sus plantas químicas (Holzminden, mentol), con objetivos de reducción y créditos de energía renovable [1].',
    controversias: 'Investigaciones de competencia abiertas desde marzo de 2023 a los cuatro grandes del sector; para Symrise el DOJ, la CMA y la CCI las han suspendido y la WEKO propuso hacerlo; no hay cargos [4]. Sin otras sanciones relevantes en tres años en los documentos leídos.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Corporate Report 2025 (menciona CDP sin nota legible); 2) web de sostenibilidad (no abierta por tiempo); 3) prensa (sin dato fechado)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Remuneration Report 2025', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-03-04', url: SY + '?doc=remuneration-report-2025' },
  { id: 2, titulo: 'Corporate Report 2025: informe de gobierno, objetivos y su cumplimiento', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-03-04', url: SY + '?doc=corporate-report-2025' },
  { id: 3, titulo: 'Symrise Aktie: Insider greifen zu (compras de M. König y S. Coßmann, marzo de 2026)', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.boerse-express.com/news/articles/symrise-aktie-insider-greifen-zu-874795' },
  { id: 4, titulo: 'Interim Group Report January-June 2026 (recompra: 2.591.875 acciones a 74,16 EUR)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-07-30', url: SY + '?doc=interim-h1-2026' },
  { id: 5, titulo: '31st Interim Report, Acquisition of Own Shares (acumulado 3.948.518 acciones a 11-sep-2026)', editor: 'Symrise AG (EQS)', tipo: 'Primaria', fecha: '2026-09-14', url: 'https://live.deutsche-boerse.com/news/EQS-CMS-Symrise-AG-Release-of-a-capital-market-information-481faeca-83bc-48d7-88ca-c6f65a0ccf1b' },
];
guarda('C', {
  _estado: 'Completa con huecos: votos de la junta y antigüedad de los consejeros no localizados.',
  directivos: {
    equipo: [
      { nombre: 'Jean-Yves Parisot', cargo: 'Consejero delegado (CEO)', desde: '2024', participacion_pct: null, trayectoria: 'En el comité ejecutivo desde 2016 (venía de Diana, donde dirigía nutrición animal); consejero delegado desde abril de 2024. Con él, el margen EBITDA ajustado subió del 20,7 % al 21,9 % y llegó la primera recompra, pero el crecimiento orgánico de 2025 (2,8 %) quedó lejos de la guía inicial del 5-7 % [1, 2].' },
      { nombre: 'Olaf Klinger', cargo: 'Director financiero (CFO)', desde: '2016', participacion_pct: null, trayectoria: 'Director financiero desde enero de 2016; responsable del objetivo de eficiencias de 40 M en 2025 y de la refinanciación de 2025 [1, 2].' },
      { nombre: 'Stephanie Coßmann', cargo: 'Consejera ejecutiva, personas y relaciones laborales', desde: '2023', participacion_pct: null, trayectoria: 'En el comité ejecutivo desde febrero de 2023; compró acciones en marzo de 2026 [1, 3].' },
      { nombre: 'Walter Ribeiro', cargo: 'Consejero ejecutivo', desde: '2024', participacion_pct: null, trayectoria: 'En el comité ejecutivo desde septiembre de 2024 [1].' },
      { nombre: 'Michel Friede', cargo: 'Consejero ejecutivo', desde: '2025', participacion_pct: null, trayectoria: 'Incorporado en diciembre de 2025 [1].' },
      { nombre: 'Michael König', cargo: 'Presidente del consejo de supervisión', desde: null, participacion_pct: null, trayectoria: 'Preside el consejo de supervisión; compró 1.324 acciones a 73,04 EUR el 4-mar-2026 [1, 3].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento orgánico 5-7 % (rebajado a 3-5 % en julio y a 2,3-3,3 % en octubre)', real: '2,8 %', cumplida: 'No' },
      { anio: '2025', guia: 'Margen EBITDA ≈21 % (elevado a ≈21,5 % en julio)', real: '21,9 % ajustado', cumplida: 'Sí' },
      { anio: '2025', guia: 'Caja libre de negocio ≈14 % de las ventas', real: '15,8 % ajustado (12,4 % publicado)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Deuda neta con pensiones / EBITDA 2,0-2,5x', real: '1,9x ajustado (2,3x publicado)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Orgánico 2-4 %, margen 21,5-22,5 %, caja libre > 14 %', real: '1S26: 2,0 %, 21,8 %, 13,7 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable en finanzas (Klinger desde 2016) y renovado en negocio (tres incorporaciones desde 2023) [1]. La credibilidad en ventas está tocada: la guía orgánica de 2025 se rebajó dos veces y la meta de 2028 (5-7 % anual) exige casi duplicar el ritmo de 2025-2026 [2]. En márgenes y caja la dirección cumple. No hay plan de sucesión público.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Michael König', cargo: 'Presidente del consejo de supervisión', tipo: 'Independiente', desde: null, comisiones: 'Presidencia' },
      { nombre: 'Harald Feist', cargo: 'Vicepresidente (representante de los trabajadores)', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Ursula Buck', cargo: 'Consejera (accionistas)', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Jan Zijderveld', cargo: 'Consejero (accionistas)', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Bernd Hirsch', cargo: 'Consejero (accionistas)', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Andrea Pfeifer', cargo: 'Consejera (accionistas)', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Jeannette Chiarlitti', cargo: 'Consejera (trabajadores)', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'André Kirchhoff', cargo: 'Consejero (trabajadores)', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Jakob Ley', cargo: 'Consejero (trabajadores)', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Andrea Püttcher', cargo: 'Consejera (trabajadores)', tipo: 'Otro externo', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.03, fijo: 0.98, variable_corto: 0.79, variable_largo: 0.27, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado devengó 2,03 M EUR en 2025: 0,98 M fijos, 0,79 M de bonus anual y 0,27 M del plan a largo plazo 2022-2025 [1]. El bonus combina objetivos financieros (crecimiento orgánico, margen EBITDA y caja libre) con un 10 % de seguridad laboral y un 10 % de objetivos ESG individuales [1]. El plan a largo plazo (cuatro años) se reparte 40 % BPA ajustado por divisa, 40 % rentabilidad total para el accionista frente a un grupo de comparables y 20 % ESG: premia beneficio y retorno, no solo crecimiento [1]. Se propuso añadir un periodo de bloqueo de acciones para el comité ejecutivo [1].',
    accionistas: [
      { nombre: 'Capital flotante', pct: 95.0, tipo: 'Flotante', variacion: 'Sin accionista de control [2]' },
      { nombre: 'Autocartera (recompra 2026)', pct: 2.8, tipo: 'Autocartera', variacion: '3.948.518 acciones a 11-sep-2026, para amortizar [5]' },
    ],
    insiders: [
      { fecha: '2026-03-04', persona: 'Michael König (presidente del consejo de supervisión)', operacion: 'Compra', acciones: 1324, importe: 0.10 },
      { fecha: '2026-03-05', persona: 'Stephanie Coßmann (comité ejecutivo)', operacion: 'Compra', acciones: null, importe: 0.03 },
    ],
    control_y_defensas: 'Sociedad anónima alemana con estructura dual: comité ejecutivo y consejo de supervisión de diez miembros, cinco elegidos por los accionistas y cinco por los trabajadores (codeterminación) [1]. Una acción, un voto; sin accionista de control (≈95 % de flotante) ni blindajes estatutarios [2]. La recompra de 2026 (hasta 400 M, 2-feb a 31-oct) es la primera de la historia y las acciones se amortizarán [4]. Sin operaciones vinculadas relevantes; el consejero delegado se sienta en los consejos de Swedencare y Probi, filiales o asociadas del grupo [1].',
    alertas: ['Ninguna relevante en el gobierno tras revisar el informe de remuneraciones y el de gobierno; las investigaciones de competencia están en la sección de riesgos.'],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo creciente: 1,25 EUR por 2025 (1,20 en 2024), la decimosexta subida seguida, ≈35-40 % del beneficio ajustado [2]. En 2026 la primera recompra, de hasta 400 M EUR (≈3 % del capital), entre febrero y octubre: 2,59 M de acciones por 192 M hasta junio y 3,95 M acumuladas el 11-sep [4, 5]. Prioridades declaradas: crecimiento orgánico, compras pequeñas que encajen (Floral Concept) y deuda neta con pensiones de 2,0-2,5 veces el EBITDA [2, 4].',
    adquisiciones: [
      { anio: '2014', objetivo: 'Diana (naturales y alimentación animal)', importe: 1300, ev_ebitda: null, financiacion: 'Deuda y ampliación', resultado: 'Base del segmento de nutrición; Parisot venía de ahí. Sin deterioros conocidos.' },
      { anio: '2019', objetivo: 'ADF/IDF (ingredientes de pollo, EE. UU.)', importe: null, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Integrado en Pet Food; precios a la baja en 2026.' },
      { anio: '2021-2022', objetivo: 'Swedencare (≈41 %, asociada)', importe: null, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Mal: deterioros de 126 M (2022) y 150 M (2025); valor de mercado ≈133 M frente a ≈295 M en libros.' },
      { anio: '2021-2025', objetivo: 'Probi (hasta el 100 %)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Minoritarios comprados en 2025 por 97 M; crecimiento de probióticos menguante en 2025.' },
      { anio: '2026', objetivo: 'Floral Concept (naturales para perfumería, Grasse)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Oferta vinculante en julio de 2026; importe no publicado.' },
    ],
    comentario: 'La dirección asignó mal el capital en 2021-2022: 1.370 M en compras y participaciones en dos años (Swedencare, Probi y alimentación animal) que hoy rinden por debajo del coste de capital y han exigido 276 M de deterioros [1]. Desde 2024 el giro es claro: menos compras, venta de negocios de poco margen (acuicultura, terpenos) y la primera recompra. El dividendo crece despacio y la recompra se hace a 74-90 EUR, por debajo del precio de hoy.',
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Corporate Report 2025 (no trae resultados de la junta); 2) web de la junta (no abierta); 3) prensa (sin dato)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'accionistas significativos > 3 %', tipo: 'Complemento', intentos: '1) Corporate Report 2025 (solo flotante ≈95 %); 2) notificaciones de derechos de voto (no localizadas); 3) prensa (sin lista fechada)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios SY1.DE, EXS1.DE (DAX) y EXV7.DE (químicas europeas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SY1.DE/history' },
  { id: 2, titulo: 'Symrise AG: finanzas y consenso (16 analistas, objetivo medio 101,30 EUR)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/SYMRISE-AG-534094/finances/' },
  { id: 3, titulo: 'Cotizaciones, valor empresa, EBITDA LTM y estimaciones de comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 4, titulo: 'Tipos de cambio de referencia del euro (14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Rendimiento del Bund a 10 años (3,51 % el 14-oct-2026), serie BBSIS', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: '31st Interim Report, Acquisition of Own Shares', editor: 'Symrise AG (EQS)', tipo: 'Primaria', fecha: '2026-09-14', url: 'https://live.deutsche-boerse.com/news/EQS-CMS-Symrise-AG-Release-of-a-capital-market-information-481faeca-83bc-48d7-88ca-c6f65a0ccf1b' },
  { id: 8, titulo: 'Financial calendar: Quarterly Statement Q3 2026, 28-oct-2026', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.symrise.com/investors/financial-calendar-and-presentations/' },
  { id: 9, titulo: 'Cotización de Swedencare (SECARE.ST) y EUR/SEK, 30-dic-2025 y 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SECARE.ST/' },
  { id: 10, titulo: 'Interim Group Report January-June 2026 (balance de junio, acciones en circulación)', editor: 'Symrise AG', tipo: 'Primaria', fecha: '2026-07-30', url: SY + '?doc=interim-h1-2026' },
];
const comp = (nombre, ticker, pais, capitalizacion, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, dn_ebitda) => ({ nombre, ticker, pais, capitalizacion, ev_ventas: null, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct: null, dn_ebitda, fcf_yield_pct: null });
guarda('D', {
  _estado: 'Completa. Precio y bolsa de bolsa.mjs; consenso de MarketScreener; comparables de Yahoo Finance (mismo proveedor para todos).',
  identificacion: {
    nombre: 'Symrise AG', nombre_corto: 'Symrise', ticker: 'SY1', isin: 'DE000SYM9999', mercado: 'Xetra (Deutsche Börse)', indice_referencia: 'DAX',
    pais: 'Alemania', pais_iso: 'DE', sector: 'Materiales', industria: 'Química especializada (sabores, fragancias e ingredientes)', sede: 'Holzminden (Alemania)', fundacion: '2003', empleados: 12936, web: 'www.symrise.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 135.82, capitalizacion_publicada: 13304, free_float_pct: 95.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 28,1 M EUR/día (3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía 2026, presentada el 4-mar y confirmada el 30-jul: crecimiento orgánico del 2-4 %, margen EBITDA ajustado del 21,5-22,5 % y caja libre de negocio por encima del 14 % de las ventas [10]. Metas de 2028 confirmadas: crecimiento orgánico del 5-7 % anual, margen EBITDA del 21-23 % y caja libre de más del 14 % [10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 5029, ebitda: 1095, ebit: 801.2, bpa: 3.84, dpa: 1.305, fuente: 'MarketScreener, 16 analistas [2]' },
      { periodo: '2027e', ingresos: 5259, ebitda: 1165, ebit: 881.2, bpa: 4.363, dpa: 1.402, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 5524, ebitda: 1228, ebit: 936.4, bpa: 4.626, dpa: 1.488, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 16, comprar: null, mantener: null, vender: null, po_medio: 101.30, po_min: null, po_max: null },
    revisiones: 'MarketScreener da un consenso medio de «sobreponderar» con un objetivo de 101,30 EUR, un 4,5 % sobre el precio [2]. El BPA de 2026 (3,84 EUR) es ajustado: excluye los costes de transformación. Yahoo Finance da 3,96 para 2026 y 4,39 para 2027 [3]. No hay serie de revisiones gratuita; tras el 1S26 la guía se confirmó y las estimaciones de ventas de 2026 (5.029 M) ya incorporan el efecto de la divisa. Solo hay una fuente con estimaciones completas: el objetivo y el BPA se contrastan con Yahoo.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.3,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, beta: 0.49, posicion_corta_pct: null, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((x) => +x.anio >= 2021).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: x.anio === '2021' })),
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Los cuatro grandes de sabores y fragancias que publican cuentas (Givaudan, DSM-Firmenich, IFF) más los especialistas en ingredientes con los que compite Symrise por segmento: Kerry (sabor y nutrición), Croda (ingredientes cosméticos y fragancias), Sensient (colores y sabores) y Novonesis (biotecnología e ingredientes funcionales). Todas las cifras de Yahoo Finance del 14-oct-2026; capitalización convertida a euros con el BCE [3, 4]. El PER es el del próximo ejercicio (2027 en las de año natural), la misma base que el de Symrise.',
    empresas: [
      comp('Givaudan', 'GIVN', 'CH', 37846, 25.2, 28.5, 5.5, 21.4, 2.9),
      comp('DSM-Firmenich', 'DSFIR', 'CH', 25499, 23.3, 25.2, 5.0, 14.5, 3.4),
      comp('IFF', 'IFF', 'US', 20168, 14.8, 22.3, 3.3, 17.7, 3.0),
      comp('Kerry Group', 'KRZ', 'IE', 14510, 14.6, 16.2, 5.0, 17.2, 2.0),
      comp('Croda', 'CRDA', 'GB', 5861, 22.4, 19.9, 4.8, 14.2, 2.4),
      comp('Sensient', 'SXT', 'US', 5039, 20.5, 26.5, 13.7, 18.2, 2.4),
      comp('Novonesis', 'NSIS B', 'DK', 28007, 17.5, 25.0, 7.6, 37.5, 1.7),
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) notas de adquisiciones del Corporate Report 2025 (sin múltiplos); 2) informe de Givaudan del repositorio (no tiene transacciones); 3) prensa (múltiplos de IFF-Frutarom, DSM-Firmenich o Novozymes-Chr. Hansen sin documento original abierto)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bundesanzeiger (no abierto); 2) Yahoo (no la da para Xetra); 3) prensa (sin dato)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Symrise - keiner eine Meinung? (hilo del foro, julio-octubre de 2026)', editor: 'wallstreet-online.de', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://www.wallstreet-online.de/diskussion/1151240-1/symrise-keiner-eine-meinung' },
  { id: 2, titulo: 'Seeking Alpha, feed de SYIEY (transcripciones y artículos de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-01', url: 'https://seekingalpha.com/api/sa/combined/SYIEY.xml' },
  { id: 3, titulo: 'Symrise Aktie: Insider greifen zu', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.boerse-express.com/news/articles/symrise-aktie-insider-greifen-zu-874795' },
  { id: 4, titulo: 'Symrise Aktie: Rückkauf läuft', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-09', url: 'https://www.boerse-express.com/news/articles/symrise-aktie-rueckkauf-laeuft-869305' },
  { id: 5, titulo: 'Symrise: Jetzt kann die Kursrakete durchstarten', editor: 'stock3', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://stock3.com/news/symrise-jetzt-kann-die-kursrakete-durchstarten-17214674' },
  { id: 6, titulo: 'Análisis técnico de Symrise (canal de tendencia)', editor: 'LYNX Broker', tipo: 'Foros y redes', fecha: '2026-09-01', url: 'https://www.lynxbroker.de/analysen/aktuelle-analysen/symrise' },
];
guarda('E', {
  _estado: 'Completa con poco debate: la acción se sigue poco en foros (Reddit y Stocktwits sin hilos propios).',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'wallstreet-online (foro alemán)', fecha: '2026-10', n_comentarios: 6, tono: 'Neutro', resumen: 'Poco debate: «estable, algo cara, pero siempre muy rentable»; un participante vendió cerca de 96 EUR recogiendo beneficios y se comentan la venta de terpenos a Mutares y compras de consejeros [1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios, SYIEY)', fecha: '2026-08', n_comentarios: 8, tono: 'Dividido', resumen: 'El último análisis con debate («buenas mejoras, pero el crecimiento no está claro») resume la duda principal: margen al alza y crecimiento orgánico por debajo de la meta [2].' },
      { plataforma: 'Börse Express y stock3 (prensa de inversión con comentarios)', fecha: '2026-09', n_comentarios: 10, tono: 'Positivo', resumen: 'Tras el 1S26 se habla de «cohete bursátil» y de la recompra como soporte; las compras de directivos a 73 EUR en marzo se leen como señal de confianza [3-5].' },
      { plataforma: 'LYNX (análisis técnico con comentarios)', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'La acción ha roto al alza el canal bajista de 2021-2025; los comentarios fijan soportes en la zona de 86-87 EUR [6].' },
    ],
    temas: [
      { tema: 'Recompra y compras de directivos como soporte', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto pero acotado: la recompra suma ≈3,5 % del capital y termina el 31-oct; después el soporte desaparece [3, 4].' },
      { tema: 'Valoración: cara pero de calidad', postura: 'Dividida', peso: 'Medio', contraste: 'A 23 veces nuestro BPA de 2027 cotiza por debajo de su mediana adelantada (≈29 veces) y con descuento frente a Givaudan (28,5 veces) [1, 2].' },
      { tema: 'Crecimiento orgánico frente a la meta de 2028', postura: 'Bajista', peso: 'Medio', contraste: 'Fundado: 2,8 % en 2025 y 2,0 % en el 1S26 frente al 5-7 % que promete la empresa [2].' },
      { tema: 'Recuperación tras la caída de 2021-2025', postura: 'Alcista', peso: 'Medio', contraste: 'La acción sube un 43 % en 2026 tras perder un 47 % desde el máximo; el beneficio ajustado apenas ha crecido en el mismo tiempo [5, 6].' },
    ],
    lectura: 'El sentimiento acompaña la subida sin euforia y con poco debate: los particulares ven la recompra y las compras de directivos como soporte y aceptan pagar por la calidad, mientras la única duda que se repite es la del crecimiento, la misma de nuestro análisis. No anticipa un riesgo que el informe no recoja. Ningún foro habla de Swedencare ni de la IA. El tono va con el consenso de los analistas (objetivo medio cerca del precio).',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
});
console.log('Notas A-E escritas');
