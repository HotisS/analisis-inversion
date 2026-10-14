// Escribe las notas A-E de Sonova (corte 2026-10-14) a partir de los documentos de notas/docs (informes anuales 2022/23,
// 2024/25 y 2025/26, notas de resultados, cifras reexpresadas, gobierno y remuneración) y de las fuentes de mercado.
// Suiza no tiene XBRL: cuentas copiadas de los estados financieros consolidados. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/sonova-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const WP = 'https://www.sonova.com/wp-content/uploads';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Sonova Annual Report 2025/26 – Financial Report (estados consolidados, notas 2.2, 3.5, 4.2, 4.5, 6.3, cifras clave de cinco años, conciliación de medidas normalizadas)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/08_Sonova_AR_25-26_Finance_en.pdf` },
  { id: 2, titulo: 'Media release: Sonova delivers strong FY 2025/26 results (ventas 3.605,9 M, EBITA normalizado 811,2 M, guía 2026/27)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Sonova_FY25-26-Results_EN.pdf` },
  { id: 3, titulo: 'Sonova Annual Report 2024/25 – Financial Report (estados consolidados 2023/24 y 2024/25)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2025-05-09', url: `${WP}/2025/05/08_Sonova_AR_24-25_Finance_en_0.pdf` },
  { id: 4, titulo: 'Sonova Annual Report 2022/23 – Financial Report (estados 2021/22 y 2022/23, cinco años 2018/19-2022/23, nota 6.1 de compras)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2023-05-16', url: `${WP}/2023/05/08_Sonova_AR_2022_23_Financial_report_en.pdf` },
  { id: 5, titulo: 'Restated comparative figures FY 24/25 and FY 25/26 (semestres reexpresados sin Consumer Hearing; EBIT «core»)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Restated-comparative-figures.pdf` },
  { id: 6, titulo: 'Media release: Sonova presents renewed strategy … CHF 6 billion in revenue by FY 2030/31 (venta de Consumer Hearing)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-03-23', url: `${WP}/2026/03/260323_Sonova-Strategy-Update-EN.pdf` },
  { id: 7, titulo: 'Half-Year Results 1H 2025/26 – presentación', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2025-11-14', url: `${WP}/2025/11/Sonova_HY-25-26-Presentation_0.pdf` },
  { id: 8, titulo: 'Full-Year 2025/26 results presentation (calendario: resultados semestrales el 17-nov-2026)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Sonova-FY_25-26_Presentation.pdf` },
  { id: 9, titulo: 'Media release: resultados FY 2024/25 y guía 2025/26', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2025-05-09', url: `${WP}/2025/05/Sonova_FY24-2520Results20EN.pdf` },
  { id: 10, titulo: 'Media release: resultados FY 2023/24 y guía 2024/25', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2024-05-13', url: `${WP}/2024/05/Sonova_FY23-2420Results_EN.pdf` },
];

// Cuenta: 2021/22-2023/24 tal como se publicaron (incluyen Consumer Hearing); 2024/25 reexpresado y 2025/26 de actividades continuadas.
// EBITDA = EBIT + amortizaciones, depreciaciones y deterioros del estado de flujos (incluye derechos de uso). Resultado financiero con asociadas.
// no_recurrentes_en_ebitda = partidas normalizadas dentro del EBITDA (litigios, responsabilidad de producto, costes de compras); el deterioro
// de software de 2025/26 (34,7 M) va en amortizaciones. Gastos financieros = intereses + intereses de arrendamientos (nota 4.2).
const cuenta = [
  { periodo: 'FY2022', ingresos: 3363.9, coste_ventas: 903.3, gastos_generales: 1458.5, ebitda: 971.1, amortizaciones: 211.1, ebit: 760.0, resultado_financiero: -31.8, bai: 728.2, impuestos: 64.5, minoritarios: 14.7, beneficio_neto: 649.0, gastos_financieros: 21.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 28.0, bpa: 10.35, dpa: 4.40, dpa_extraordinario: 0, acciones_diluidas: 62.7 },
  { periodo: 'FY2023', ingresos: 3738.4, coste_ventas: 1101.0, gastos_generales: 1646.6, ebitda: 986.4, amortizaciones: 239.7, ebit: 746.7, resultado_financiero: -31.0, bai: 715.6, impuestos: 57.4, minoritarios: 10.7, beneficio_neto: 647.5, gastos_financieros: 22.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 23.2, bpa: 10.72, dpa: 4.60, dpa_extraordinario: 0, acciones_diluidas: 60.4 },
  { periodo: 'FY2024', ingresos: 3626.9, coste_ventas: 1016.5, gastos_generales: 1700.9, ebitda: 916.1, amortizaciones: 246.2, ebit: 669.9, resultado_financiero: -22.5, bai: 647.3, impuestos: 37.8, minoritarios: 8.5, beneficio_neto: 601.0, gastos_financieros: 27.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 20.7, bpa: 10.05, dpa: 4.30, dpa_extraordinario: 0, acciones_diluidas: 59.8 },
  { periodo: 'FY2025', ingresos: 3612.9, coste_ventas: 928.5, gastos_generales: 1750.5, ebitda: 952.4, amortizaciones: 232.6, ebit: 719.8, resultado_financiero: -35.5, bai: 684.3, impuestos: 119.4, minoritarios: 6.4, beneficio_neto: 558.5, gastos_financieros: 26.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 13.8, bpa: 9.34, dpa: 4.40, dpa_extraordinario: 0, acciones_diluidas: 59.78 },
  { periodo: 'FY2026', ingresos: 3605.9, coste_ventas: 947.6, gastos_generales: 1742.9, ebitda: 936.1, amortizaciones: 260.3, ebit: 675.8, resultado_financiero: -34.1, bai: 641.7, impuestos: 95.7, minoritarios: 8.9, beneficio_neto: 537.1, gastos_financieros: 28.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 52.4, bpa: 9.01, dpa: 4.70, dpa_extraordinario: 0, acciones_diluidas: 59.63 },
];
// Deuda financiera = pasivos financieros corrientes y no corrientes (bonos, bancos, pagos aplazados y contingentes de compras).
// Inmovilizado material incluye derechos de uso. Intangibles sin fondo de comercio (nota 3.5).
const balanceH = [
  { periodo: 'FY2022', activo_total: 5588.2, activo_corriente: 1659.7, pasivo_corriente: 1505.7, pasivo_total: 3155.4, fondo_comercio: 2298.4, intangibles: 650.5, inmovilizado_material: 632.7, existencias: 412.7, clientes: 474.3, proveedores: 189.2, activos_contrato: null, pasivos_contrato: null, caja: 618.9, deuda_financiera: 1334.1, arrendamientos: 284.3, patrimonio_neto: 2410.5, minoritarios: 22.3, reservas: 3128.2 },
  { periodo: 'FY2023', activo_total: 5552.5, activo_corriente: 1512.9, pasivo_corriente: 1104.2, pasivo_total: 3321.1, fondo_comercio: 2401.3, intangibles: 656.6, inmovilizado_material: 659.5, existencias: 419.1, clientes: 524.7, proveedores: 192.9, activos_contrato: null, pasivos_contrato: null, caja: 424.9, deuda_financiera: 1613.8, arrendamientos: 296.9, patrimonio_neto: 2212.4, minoritarios: 18.9, reservas: 2638.4 },
  { periodo: 'FY2024', activo_total: 5791.8, activo_corriente: 1652.4, pasivo_corriente: 1137.9, pasivo_total: 3300.4, fondo_comercio: 2419.6, intangibles: 619.0, inmovilizado_material: 649.8, existencias: 435.6, clientes: 538.3, proveedores: 202.4, activos_contrato: null, pasivos_contrato: null, caja: 524.3, deuda_financiera: 1594.9, arrendamientos: 279.1, patrimonio_neto: 2470.4, minoritarios: 20.9, reservas: 2471.2 },
  { periodo: 'FY2025', activo_total: 5924.2, activo_corriente: 1911.3, pasivo_corriente: 1500.1, pasivo_total: 3239.6, fondo_comercio: 2407.5, intangibles: 577.1, inmovilizado_material: 617.6, existencias: 468.5, clientes: 576.9, proveedores: 269.0, activos_contrato: null, pasivos_contrato: null, caja: 699.1, deuda_financiera: 1579.6, arrendamientos: 248.6, patrimonio_neto: 2664.6, minoritarios: 20.0, reservas: 2667.2 },
  { periodo: 'FY2026', activo_total: 5628.8, activo_corriente: 2083.6, pasivo_corriente: 1188.5, pasivo_total: 2992.9, fondo_comercio: 2284.2, intangibles: 336.8, inmovilizado_material: 592.4, existencias: 381.0, clientes: 527.3, proveedores: 177.1, activos_contrato: null, pasivos_contrato: null, caja: 732.9, deuda_financiera: 1477.2, arrendamientos: 240.9, patrimonio_neto: 2613.9, minoritarios: 22.0, reservas: 2656.5 },
];
// Flujos: 2024/25 y 2025/26 de actividades continuadas (reexpresado); recompras = programa de recompra + compra de autocartera; emisión = venta de autocartera.
const flujosH = [
  { periodo: 'FY2022', flujo_operativo: 941.1, capex: 106.6, pagos_arrendamientos: 64.0, adquisiciones: 594.1, desinversiones: 1.9, dividendos: 201.6, recompras: 757.9, emision_acciones: 26.3, intereses_en_financiacion: 19.7 },
  { periodo: 'FY2023', flujo_operativo: 783.9, capex: 154.3, pagos_arrendamientos: 75.9, adquisiciones: 261.1, desinversiones: 2.0, dividendos: 267.6, recompras: 502.7, emision_acciones: 16.2, intereses_en_financiacion: 21.7 },
  { periodo: 'FY2024', flujo_operativo: 753.3, capex: 128.6, pagos_arrendamientos: 75.1, adquisiciones: 101.6, desinversiones: 1.2, dividendos: 274.1, recompras: 51.3, emision_acciones: 19.9, intereses_en_financiacion: 25.6 },
  { periodo: 'FY2025', flujo_operativo: 790.3, capex: 131.7, pagos_arrendamientos: 71.9, adquisiciones: 71.9, desinversiones: 1.6, dividendos: 256.2, recompras: 67.3, emision_acciones: 29.2, intereses_en_financiacion: 25.2 },
  { periodo: 'FY2026', flujo_operativo: 734.5, capex: 102.7, pagos_arrendamientos: 72.0, adquisiciones: 45.5, desinversiones: 0.7, dividendos: 262.3, recompras: 63.1, emision_acciones: 5.7, intereses_en_financiacion: 27.6 },
];

guarda('A', {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Hearing Instruments: Wholesale', descripcion: 'Fabricación y venta mayorista de audífonos (Phonak, Unitron) a audioprotesistas independientes, cadenas (Costco con marca Sennheiser bajo licencia), clientes multinacionales y públicos (VA en EE. UU.).', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 1821.4, resultado: null }, { periodo: 'FY2026', ingresos: 1861.8, resultado: null }] },
      { nombre: 'Hearing Instruments: Retail', descripcion: 'Red propia de clínicas audiológicas (AudioNova, Boots Hearingcare, Geers, HearUSA, Alpaca, HYSOUND y marcas regionales) que vende audífonos y servicio al usuario final.', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 1487.5, resultado: null }, { periodo: 'FY2026', ingresos: 1491.9, resultado: null }] },
      { nombre: 'Cochlear Implants (Advanced Bionics)', descripcion: 'Implantes cocleares, procesadores de sonido y renovaciones para pérdida auditiva severa a profunda.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2025', ingresos: 303.9, resultado: 27.6 }, { periodo: 'FY2026', ingresos: 252.1, resultado: -34.6 }] },
    ],
    geografias: [
      { nombre: 'EMEA', peso_pct: 52.8 }, { nombre: 'EE. UU.', peso_pct: 30.3 }, { nombre: 'Américas sin EE. UU.', peso_pct: 7.3 }, { nombre: 'Asia-Pacífico', peso_pct: 9.6 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento en moneda local del negocio mayorista', valor_anterior: '≈ 7 % (FY2025)', valor_actual: '9,5 % (FY2026); 10,9 % en el 2S', variacion: 'Acelera', comentario: 'Infinio Ultra, Sphere y Virto R; la mayor ganancia de cuota en seis años según la empresa [1, 8].' },
      { kpi: 'Crecimiento orgánico del grupo (continuadas)', valor_anterior: '6,4 % (FY2025, con Consumer)', valor_actual: '5,4 % (FY2026)', variacion: '−1 pp', comentario: 'Lastrado por implantes (−11,1 % en moneda local por la compra centralizada en China) [1, 9].' },
      { kpi: 'Margen EBITA normalizado', valor_anterior: '21,6 % (FY2025 reexpresado)', valor_actual: '22,5 % (FY2026)', variacion: '+0,9 pp (+2,3 pp en moneda local)', comentario: 'Apalancamiento operativo y ahorro en Retail; la divisa restó 1,5 pp [1].' },
      { kpi: 'Margen bruto', valor_anterior: '74,3 % (FY2025)', valor_actual: '73,7 % (FY2026)', variacion: '−0,6 pp', comentario: 'Costes de arranque de la regionalización de fábricas y logística en el 1S [1].' },
      { kpi: 'Ventas de implantes cocleares', valor_anterior: '303,9 M (FY2025)', valor_actual: '252,1 M (FY2026)', variacion: '−17,1 % en CHF', comentario: 'Fuera de China, sistemas +0,7 %; renovaciones −13,1 % por el ciclo del procesador Marvel [1].' },
      { kpi: 'Deuda neta / EBITDA', valor_anterior: '1,2x (mar-25)', valor_actual: '1,1x (mar-26)', variacion: '−0,1x', comentario: 'Deuda neta de 994,3 M con arrendamientos [1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: 3605.9, ebitda: 936.1, ebit: 675.8, beneficio_neto: 537.1, bpa: 9.01, dpa: 4.70, dpa_extraordinario: 0, fcf: 532.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 52.4 },
    cambios_perimetro: [
      { periodo: 'FY2025', descripcion: 'Consumer Hearing (Sennheiser) pasa a actividad interrumpida desde FY2026: la cuenta y los flujos de FY2025 están reexpresados (ventas 3.612,9 M frente a 3.865,4 M publicados); FY2022-FY2024 incluyen el negocio (≈ 250 M de ventas al año) y no son del todo comparables [1, 3].' },
      { periodo: 'FY2022', descripcion: 'Compras de Sennheiser Consumer y Alpaca Audiology cerradas el 1-mar-2022: entran en el balance de marzo de 2022 con un mes de cuenta [4].' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 1716.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.68, vs_consenso: null },
      { periodo: '2S25', ingresos: 1896.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 5.69, vs_consenso: null },
      { periodo: '1S26', ingresos: 1718.7, crecimiento_pct: 0.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.46, vs_consenso: 'Inferior' },
      { periodo: '2S26', ingresos: 1887.2, crecimiento_pct: -0.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 5.55, vs_consenso: 'En línea' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: 'FY2027', importe: 118 }, { anio: 'FY2029', importe: 300 }, { anio: 'FY2030', importe: 300 }, { anio: 'FY2031', importe: 200 }, { anio: 'FY2032+', importe: 559 }],
    liquidez: 'Caja de 721,9 M a 31-mar-2026 más 296 M sin disponer de la línea sindicada de 400 M (hasta abril de 2029, ampliable a 500 M) [1].',
    rating: 'Sin rating de agencia publicado en el informe anual; bonos senior en CHF al 0-1,95 % [1].',
    coste_deuda_pct: 1.4, vida_media_anios: 4.2,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young AG, Zúrich (reelegido en la junta de 2025)', anios_auditor: null, opinion: 'Favorable', confianza: 'Media' },
  capital: {
    adquisiciones: [
      { anio: 'FY2022', objetivo: 'Sennheiser Consumer Division (auriculares premium)', importe: 330.6, ev_ebitda: null, financiacion: 'Caja (98 M aplazados)', resultado: 'Fracaso: pérdidas operativas, deterioro de 38,3 M en FY2026 y valor neto en venta de solo 110,7 M; se vende en FY2027 [4, 1].' },
      { anio: 'FY2022', objetivo: 'Alpaca Audiology (≈ 220 clínicas en EE. UU.)', importe: 286.3, ev_ebitda: null, financiacion: 'Caja y bonos', resultado: 'Integrada en Retail EE. UU.; sin deterioro del fondo de comercio de audífonos [4, 1].' },
      { anio: 'FY2023', objetivo: 'HYSOUND (≈ 200 clínicas en China)', importe: 243.8, ev_ebitda: null, financiacion: 'Caja y bonos', resultado: 'Retail China crece a dos dígitos en FY2026 [4, 1].' },
      { anio: 'FY2025-FY2026', objetivo: 'Compras pequeñas de clínicas (Alemania, Italia, Francia, Australia, Canadá)', importe: 117.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aportan 0,5-1,3 pp de crecimiento al año [1, 3].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA y crecimiento orgánico por semestre de actividades continuadas', tipo: 'Complemento', intentos: '1) Cifras reexpresadas (solo EBIT por semestre); 2) presentación del 1S26 (con Consumer Hearing); 3) informe anual 2025/26 (solo anual)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Ventas mayorista/minorista anteriores a FY2025 sin Consumer Hearing', tipo: 'Complemento', intentos: '1) Informe anual 2025/26 (solo FY2025-26 reexpresados); 2) cifras reexpresadas (dos años); 3) informes anteriores con la segmentación vieja (HI con Consumer)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Ficha sectorial «Audífonos y audiología» (perímetro, tamaño, comparables, riesgo OTC/AirPods/IA), hecha desde el informe anual 2025 de Demant', editor: 'Repositorio analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/audifonos-2026-10-14.md' },
  { id: 2, titulo: 'Sonova Annual Report 2025/26 – Financial Report y nota de resultados (mercado 2-4 % en FY2027, 3-5 % a medio plazo)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Sonova_FY25-26-Results_EN.pdf` },
  { id: 3, titulo: 'Strategy update: crecimiento de ventas del 5-10 % y EBIT core del 7-12 % anual a medio plazo; venta de Consumer Hearing', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-03-23', url: `${WP}/2026/03/260323_Sonova-Strategy-Update-EN.pdf` },
  { id: 4, titulo: 'Análisis value de Demant (cuentas 2025, margen, ROIC, guía 2026 y valoración)', editor: 'Repositorio analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'informes/demant-2026-10-14/datos.json' },
  { id: 5, titulo: 'EUHA 2026 – Innovation that drives adoption (Phonak EON: chip propio, red neuronal, 25 % más pequeño)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-10-14', url: `${WP}/2026/10/Investor-Presentation-EUHA-2026-1.pdf` },
  { id: 6, titulo: 'Fortell raises $163M for AI hearing aids at a $740M valuation', editor: 'Dealroom', tipo: 'Prensa', fecha: '2026', url: 'https://dealroom.co/news/149734-fortell-raises-163m-for-ai-hearing-aids-at-a-740m-valuation/' },
  { id: 7, titulo: 'Sonova Annual Report 2022/23 (fundación, historia de compras)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2023-05-16', url: `${WP}/2023/05/08_Sonova_AR_2022_23_Financial_report_en.pdf` },
  { id: 8, titulo: 'Análisis value de Cochlear (cuentas FY2026)', editor: 'Repositorio analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-08', url: 'informes/cochlear-2026-10-08/' },
  { id: 9, titulo: 'Sonova FY 2025/26 results presentation (CSA de S&P Global 78/100; EcoVadis)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Sonova-FY_25-26_Presentation.pdf` },
  { id: 10, titulo: 'Sennheiser All-Day Clear: Sonova lanza un audífono OTC autoajustable en EE. UU.', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2023-06', url: 'https://www.sonova.com/sites/default/files/2023-06/All-Day%20Clear%20Media%20Release%20EN.pdf' },
];
guarda('B', {
  _estado: 'completo',
  historia: {
    resumen: 'Sonova nació en 1947 en Zúrich como AG für Elektroakustik, el origen de Phonak; dos familias fundadoras de la etapa moderna (Diethelm y Rihs) siguen con el 17 % del capital [7]. Cotiza en la SIX desde 1994 y adoptó el nombre Sonova en 2007. Creció comprando: Unitron (2001), Advanced Bionics (implantes, 2009), las redes minoristas que hoy forman AudioNova y Boots Hearingcare, y en 2022 Alpaca (EE. UU.), HYSOUND (China) y la división de consumo de Sennheiser. Esta última fue un error: se vende en 2026/27 tras perder valor. En 2025 cambió casi toda la cúpula (presidente, consejero delegado, director financiero y de operaciones) y en marzo de 2026 presentó una estrategia centrada en audífonos e implantes con la ambición de 6.000 M de ventas en FY2031 [3].',
    hitos: [
      { anio: '1947', hito: 'Fundación en Zúrich (AG für Elektroakustik, origen de Phonak).' },
      { anio: '1994', hito: 'Salida a bolsa en la SIX Swiss Exchange.' },
      { anio: '2009', hito: 'Compra de Advanced Bionics: entrada en implantes cocleares.' },
      { anio: '2022', hito: 'Compras de Sennheiser Consumer (330,6 M), Alpaca Audiology (286,3 M) y HYSOUND en China (243,8 M).' },
      { anio: '2024', hito: 'Lanzamiento de Phonak Infinio y Sphere Infinio, primer audífono con red neuronal dedicada en el chip.' },
      { anio: '2025', hito: 'Eric Bernard (ex WS Audiology) sustituye a Arnd Kaldowski como consejero delegado; Gilbert Achermann preside el consejo.' },
      { anio: '2026', hito: 'Nueva estrategia y venta de Consumer Hearing (marzo); lanzamiento de la plataforma Phonak EON con el chip HYPERSONIC (agosto-octubre).' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Mismo perímetro que la ficha sectorial del repositorio y que el informe de Demant: cadena del audífono con prescripción (fabricación mayorista y venta minorista con adaptación profesional) más diagnóstico audiológico, mundial [1]. Fuera: implantes cocleares (7 % de las ventas de Sonova) y audio de consumo (Sennheiser, en venta). Usamos el tamaño minorista de Demant (≈ 20.700 M USD en 2025) pasado a CHF; Sonova no publica tamaño en valor, pero sí el crecimiento: 2-4 % en FY2027 y 3-5 % a medio plazo, por debajo del 4-6 % de Demant [2]. Las dos estimaciones de crecimiento son la segunda fuente.',
    tamano: '≈ 17.250 M CHF en 2025 (valor minorista + diagnóstico, 20.700 M USD al cambio del BCE del 14-oct-2026) [1]; mayorista ≈ 5.800 M CHF (7.000 M USD) [1].',
    unidad_serie: 'millones de CHF (valor minorista + diagnóstico)',
    serie: [
      { anio: '2025', tamano: 17250 }, { anio: '2026e', tamano: 17940 }, { anio: '2027e', tamano: 18750 }, { anio: '2028e', tamano: 19590 }, { anio: '2029e', tamano: 20470 }, { anio: '2030e', tamano: 21390 },
    ],
    tcac_historico_pct: 4.0, tcac_previsto_pct: 4.5, cr5_pct: 90, estructura: 'Concentrada (fabricación); fragmentada (minorista)',
    drivers: [
      { driver: 'Envejecimiento y mayor acceso', efecto: '+', horizonte: 'Estructural', evidencia: 'Unidades +6 % anual de media en diez años; la penetración sigue baja [1, 3].' },
      { driver: 'Ciclo de producto e IA en el chip', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Infinio llevó el mayorista de Sonova al +10,9 % en el 2S26; Oticon Reveal llevó el de Demant al +17 % en el 3T26 [2, 4]. Cuota que se gana y se pierde en 12-18 meses.' },
      { driver: 'Mercado frenado en EE. UU. y China', efecto: '−', horizonte: 'Cíclico', evidencia: 'Sonova espera solo un 2-4 % de crecimiento del mercado en FY2027; la compra centralizada (VBP) de China hundió los implantes [2].' },
      { driver: 'OTC y auriculares con función de audífono', efecto: '−', horizonte: 'Estructural', evidencia: 'Regla OTC de la FDA (2022) y AirPods Pro autorizados como audífono para pérdida leve a moderada (2024) [1]; Sonova vendía su propio OTC (Sennheiser All-Day Clear) dentro de Consumer [10].' },
      { driver: 'Reembolso público y grandes pagadores', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Francia, Alemania, NHS y VA fijan buena parte del volumen; VA y managed care presionan el precio medio [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco fabricantes con ≈ 90 % del mayorista; ciclos de 18-24 meses: Sonova ganó cuota en FY2026 y Demant la recupera en 2026 con Reveal [1, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Costco, VA, managed care y cadenas negocian volumen; Costco vende Phonak con marca Sennheiser [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Chips propios (SWORD, DEEPSONIC, HYPERSONIC) [5]; riesgo de suministro y aranceles, no de precio.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Regulación de producto sanitario e I+D de 218 M CHF al año [2]; entrantes con IA (Fortell, 163 M USD captados) aún a escala de clínicas propias [6].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'AirPods Pro y OTC para pérdida leve a moderada; implantes solo para pérdida profunda [1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El mercado de audífonos creció por debajo de su tendencia en 2025 (incertidumbre en EE. UU.) y se recupera en 2026: Demant habla de +6-7 % en valor en el 3T y Sonova de un mercado del 2-4 % que mejora a lo largo de FY2027 [2, 4]. Históricamente es poco cíclico: en 2008-09 apenas cayó; en 2020 las ventas de Sonova bajaron un 10,8 % por el cierre de clínicas y rebotaron un 29 % en FY2022 [7]; la inflación de 2022-23 no tocó la demanda.' },
    regulacion: 'En EE. UU., la regla OTC de la FDA (octubre de 2022) permite vender audífonos sin receta para pérdida leve a moderada, y desde septiembre de 2024 los AirPods Pro pueden funcionar como audífono autorizado [1]. En China, la compra centralizada por volumen (VBP) de implantes cocleares rebajó precios y volumen de Advanced Bionics en FY2026 [2]. En Europa, el reembolso público (Francia «100 % Santé», Alemania, NHS) sostiene el volumen. Aranceles de EE. UU. desde 2025: Sonova fabrica en Suiza, China, Vietnam y México y regionaliza producción y logística [2].',
    tendencias: 'La IA en el chip es el argumento de venta del premium: Phonak Sphere Infinio fue el primer audífono con red neuronal dedicada (2024) y EON (agosto de 2026) promete un 37 % más de eficiencia total y un 25 % menos de tamaño [5]. La ventaja dura un ciclo: Oticon Reveal de Demant respondió en 2026 [4]. Entrantes financiados por capital riesgo (Fortell, 740 M USD de valoración, 6.800 USD el par) atacan el tramo premium con clínicas propias [6]. Sonova gana con la IA mientras pueda financiar el chip; pierde si el tramo leve se va a la electrónica de consumo, de la que acaba de salir.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 19.4,
    posicion: '1.º fabricante mundial de audífonos (Phonak, Unitron; ≈ 32 % del mayorista medido con sus ventas mayoristas) y 2.º-3.º minorista; 19,4 % del perímetro minorista + diagnóstico con las ventas de audífonos (3.353,8 M); 3.º en implantes cocleares (Advanced Bionics) [2, 1].',
    competidores: [
      { nombre: 'Demant', pais: 'Dinamarca', ticker: 'DEMANT.CO', ingresos: 2867, cuota_pct: 16.6, margen_ebit_pct: 17.2, comentario: 'N.º 2 integrado (Oticon, clínicas, diagnóstico); EBIT antes de especiales del 17,2 % en 2025 frente al 21,2 % de Sonova; deuda neta 3,0x [4].' },
      { nombre: 'WS Audiology', pais: 'Dinamarca/Singapur', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Signia y Widex; de EQT y las familias de Widex; el actual consejero delegado de Sonova la dirigió en 2019-2024.' },
      { nombre: 'Amplifon (con GN Hearing)', pais: 'Italia', ticker: 'AMP.MI', ingresos: 2235, cuota_pct: null, margen_ebit_pct: 11.7, comentario: 'Mayor minorista mundial; compra GN Hearing (ReSound, ≈ 900 M CHF de ventas) por 17.000 M DKK y pasa a fabricante integrado: riesgo de desvío de volumen [1, 4].' },
      { nombre: 'Starkey', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privado; fuerte en el canal independiente de EE. UU.' },
      { nombre: 'Cochlear', pais: 'Australia', ticker: 'COH.AX', ingresos: 1371, cuota_pct: null, margen_ebit_pct: 18.4, comentario: 'Líder en implantes; su nuevo procesador del 2S26 le quitó cuota a Advanced Bionics en mercados desarrollados [8, 2].' },
      { nombre: 'Apple (AirPods Pro) y OTC', pais: 'EE. UU.', ticker: 'AAPL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Función de audífono autorizada por la FDA para pérdida leve a moderada y autoajuste; compite en el tramo de entrada [1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Las clínicas propias y el motor de captación de clientes dirigen volumen a Phonak, pero no hay red entre usuarios [3].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'El audioprotesista trabaja con el software de ajuste del fabricante (Target) y la reposición cada 4-6 años tiende a repetir marca.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Phonak y chip propio con IA; I+D de 217,7 M (6,0 % de las ventas) [2]; ROCE del 18-24 % durante cinco años [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Mayor escala del sector: margen EBITA normalizado del 22,5 % frente al 17,2 % de EBIT de Demant y el 11,7 % de Amplifon [2, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Cinco fabricantes con ≈ 90 % del mayorista; la regulación y la I+D hacen inviable un sexto fabricante con receta a gran escala [1].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable. Primera, el ciclo de producto: la ventaja de Infinio duró dos años y Oticon Reveal ya gana cuota; si EON no la recupera en 2027, el mayorista volvería a crecer como el mercado (2-4 %) [2, 4]. Segunda, la integración de GN en Amplifon, primer cliente minorista independiente del sector, que puede desviar volumen a ReSound. Tercera, la electrónica de consumo en el tramo leve (AirPods Pro, OTC): probabilidad media a largo plazo, impacto bajo en el valor porque el grueso del mercado son pérdidas moderadas a profundas con adaptación profesional [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'S&P Global CSA', calificacion: '78/100 (percentil 98 en salud)', fecha: '2026-05' }],
    materialidad: 'Lo material para las cifras es la seguridad del producto (Sonova dotó 23,6 M en FY2026 por la responsabilidad de un implante antiguo) y los litigios de patentes (28,2 M en FY2026) [2]; la privacidad de los datos de audición de audífonos conectados; y el acceso: reembolso público y precio en mercados emergentes, donde la nueva estrategia quiere productos más baratos para Asia [3].',
    controversias: 'Revaluación de la provisión de responsabilidad de producto de un implante antiguo de Advanced Bionics (23,6 M) y litigios de patentes con acuerdo (28,2 M) en FY2026 [2]. Sin sanciones de reguladores en tres años en los documentos leídos.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado publicado por Sonova', tipo: 'Complemento', intentos: '1) Informe anual 2025/26 (solo crecimiento del mercado); 2) presentación de estrategia (penetración, sin cifra en valor); 3) ficha sectorial con el tamaño de Demant', decision: 'Calculado y marcado como estimación' },
    { seccion: 'competencia', campo: 'ventas y margen de WS Audiology y Starkey', tipo: 'Complemento', intentos: '1) No cotizan; 2) prensa (sin cuentas completas); 3) ficha sectorial', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- C. Gobierno y directivos
const fC = [
  { id: 1, titulo: 'Sonova Annual Report 2025/26 – Corporate Governance Report (accionistas, consejo, dirección, auditor)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/06_Sonova_AR_25-26_CorpGov_en.pdf` },
  { id: 2, titulo: 'Sonova Annual Report 2025/26 – Compensation Report (remuneración del consejero delegado, votos de la junta de 2025, nuevo plan a largo plazo)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/07_Sonova_AR_25-26_Comp_en.pdf` },
  { id: 3, titulo: 'Media release FY 2025/26: propuesta de tres consejeros nuevos y salida de L. Dorsey Bleil y R. van der Vis', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Sonova_FY25-26-Results_EN.pdf` },
  { id: 4, titulo: 'Media releases de resultados FY2023/24, FY2024/25 y FY2025/26 (guías y resultados)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2025/05/Sonova_FY24-2520Results20EN.pdf` },
  { id: 5, titulo: 'Investor news: T. Rowe Price Associates controls less than 3% of Sonova Holding AG', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2025-12-09', url: 'https://www.sonova.com/en/investor-news' },
];
guarda('C', {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Eric Bernard', cargo: 'Consejero delegado (CEO)', desde: '2025', participacion_pct: null, trayectoria: 'Consejero delegado de WS Audiology en 2019-2024 (fusión de Widex y Sivantos) y 25 años en Essilor. En su primer año: estrategia nueva, venta de Consumer Hearing y regionalización de la operación [1].' },
      { nombre: 'Elodie Carr-Cingari', cargo: 'Directora financiera (CFO)', desde: '2025', participacion_pct: null, trayectoria: 'Directora financiera de Landis+Gyr (2020-2025) y de Hoerbiger; antes en Alstom y General Electric [1].' },
      { nombre: 'Gilbert Achermann', cargo: 'Presidente del consejo', desde: '2025', participacion_pct: null, trayectoria: 'Presidente de Straumann de 2010 a 2024, tras ser su director financiero y consejero delegado: la referencia de creación de valor en la tecnología médica suiza [1].' },
      { nombre: 'Roberto di Fiore', cargo: 'Director de operaciones (COO)', desde: '2025', participacion_pct: null, trayectoria: 'Entra en noviembre de 2025 para sustituir a Ludger Althoff; dirige la regionalización de fábricas y logística [1, 2].' },
      { nombre: 'Anders Rosengren', cargo: 'Director de I+D', desde: '2025', participacion_pct: null, trayectoria: 'Antes en Ericsson (estrategia, software y arquitectura); responsable de la plataforma EON [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Ventas +5-9 % y EBITA normalizado +14-18 % en moneda local (mayo de 2025); en marzo de 2026, «parte baja»', real: 'Ventas +5,9 % y EBITA normalizado +17,3 % (actividades continuadas)', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ventas +6-9 % y EBITA ajustado +7-11 % en moneda local (mayo de 2024)', real: 'Ventas +7,6 % y EBITA ajustado +7,4 %', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'n.d. en los documentos leídos', real: 'Ventas +3,2 % y EBITA ajustado +4,4 % en moneda local; −3,0 % en CHF', cumplida: 'Parcial' },
      { anio: 'FY2027', guia: 'Ventas +5-8 % y EBIT core +7-10 % en moneda local; divisa −1-2 pp en ventas y −3-4 pp en EBIT', real: 'Pendiente (semestre el 17-nov-2026)', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Gilbert Achermann', cargo: 'Presidente', tipo: 'Independiente', desde: '2024', comisiones: 'Tecnología e innovación (presidente)' },
      { nombre: 'Adrian Widmer', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Roland Diggelmann', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos y retribuciones (presidente)' },
      { nombre: 'Gregory Behar', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: null },
      { nombre: 'Julie Tay', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: null },
      { nombre: 'Laura Stoltenberg', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Ingrid Cotoros', cargo: 'Consejera (propuesta en la junta de junio de 2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Malina Man Lin Ngai', cargo: 'Consejera (propuesta en la junta de junio de 2026)', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos y retribuciones (propuesta)' },
      { nombre: 'Hooi Ling Tan', cargo: 'Consejera (propuesta en la junta de junio de 2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 2,
    voto_remuneracion_pct: 89.97, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 2.61, fijo: 0.75, variable_corto: 0.66, variable_largo: 1.05, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Beda Diethelm y Annamaria Diethelm-Pandiani', pct: 11.26, tipo: 'Familia fundadora', variacion: 'Estable; sin pacto con otros accionistas' },
      { nombre: 'Familia Rihs (Hans-Ulrich, Gabriela y Stefan)', pct: 6.18, tipo: 'Familia fundadora', variacion: 'Estable' },
      { nombre: 'UBS Fund Management (Switzerland)', pct: 5.48, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 5.10, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'MFS Investment Management', pct: 3.02, tipo: 'Institucional', variacion: 'Nuevo por encima del 3 %' },
      { nombre: 'T. Rowe Price', pct: 3.0, tipo: 'Institucional', variacion: 'Bajó del 5,08 % a menos del 3 % (dic-2025)' },
      { nombre: 'Autocartera', pct: 0.37, tipo: 'Autocartera', variacion: '222.207 acciones (18.825 un año antes)' },
    ],
    insiders: [],
    alertas: ['Rotación casi completa de la cúpula en 2025: presidente (junio), director financiero (julio), consejero delegado (septiembre), I+D (octubre) y operaciones (diciembre) [1, 2].', 'Venta de Consumer Hearing con pérdida: valor en libros de 110,7 M frente a 330,6 M pagados en 2022 [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de directivos de 12 meses', tipo: 'Complemento', intentos: '1) SIX: las operaciones de directivos son anónimas (solo cargo e importe); 2) informe de remuneración (solo tenencias a cierre); 3) prensa suiza', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'votos en contra de la remuneración y votos de la junta de 2026', tipo: 'Complemento', intentos: '1) Informe de remuneración 2025/26 (solo a favor en 2025); 2) web de inversores (no accesible); 3) prensa', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'SOON.SW, ^SSMI y EXV4.DE: históricos diarios (precio, rango, beta, volatilidad, cierres de ejercicio a 31 de marzo)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SOON.SW/history' },
  { id: 2, titulo: 'Sonova Holding AG: finances (consenso FY2027-FY2029: ventas, EBITDA, EBIT, BPA, DPA, deuda neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/SONOVA-HOLDING-AG-70127/finances/' },
  { id: 3, titulo: 'Sonova Holding AG: consensus (19 analistas, «Outperform», objetivo medio 250,37 CHF, máx. 350, mín. 170)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/SONOVA-HOLDING-AG-70127/consensus/' },
  { id: 4, titulo: 'Swiss Bond Yield at One-Week High (0,54 %, 8-oct-2026)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://tradingeconomics.com/switzerland/government-bond-yield/news/590510' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio de referencia del BCE (14-oct-2026: 0,9330 CHF/EUR; 7,4754 DKK/EUR; 1,1195 USD/EUR; 1,5971 AUD/EUR)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Comparables del sector de audífonos al 14-oct-2026 (Demant, Cochlear, Straumann, Coloplast, Amplifon; MarketScreener y Yahoo)', editor: 'Repositorio analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/audifonos-2026-10-14-comparables.json' },
  { id: 8, titulo: 'Análisis de Straumann (comparables de tecnología médica de MarketScreener a 3-oct-2026: Alcon, Smith & Nephew, Edwards)', editor: 'Repositorio analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-03', url: 'informes/straumann-2026-10-14/datos.json' },
  { id: 9, titulo: 'Análisis de Demant (transacciones Amplifon–GN Hearing y Demant–KIND con sus notas oficiales)', editor: 'Repositorio analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'informes/demant-2026-10-14/datos.json' },
  { id: 10, titulo: 'Sonova Annual Report 2022/23 – nota 6.1 (precio pagado por Sennheiser Consumer, Alpaca y HYSOUND)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2023-05-16', url: `${WP}/2023/05/08_Sonova_AR_2022_23_Financial_report_en.pdf` },
  { id: 11, titulo: 'Sonova Annual Report 2025/26 – Corporate Governance Report (59.626.809 acciones, 222.207 en autocartera)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/06_Sonova_AR_25-26_CorpGov_en.pdf` },
  { id: 12, titulo: 'Full-Year 2025/26 results presentation: calendario financiero (resultados semestrales el 17-nov-2026)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Sonova-FY_25-26_Presentation.pdf` },
  { id: 13, titulo: 'Media release FY 2025/26 (guía FY2027, dividendo de 4,70 CHF)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/Sonova_FY25-26-Results_EN.pdf` },
  { id: 14, titulo: 'Sonova Annual Report 2025/26 – cifras clave de cinco años (BPA normalizado FY2022-FY2026) y 2022/23 (BPA ajustado FY2019-FY2021)', editor: 'Sonova Holding AG', tipo: 'Primaria', fecha: '2026-05-18', url: `${WP}/2026/05/08_Sonova_AR_25-26_Finance_en.pdf` },
];
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
// Comparables en CHF al 14-oct-2026: los del sector (M DKK) pasados con 0,12481 CHF/DKK (BCE: 0,9330/7,4754). Alcon, Smith & Nephew y Edwards
// del informe de Straumann (MarketScreener a 3-oct; capitalización no recogida allí: null).
const k = 0.9330 / 7.4754;
const comp = [
  { nombre: 'Demant', ticker: 'DEMANT.CO', pais: 'DK', capitalizacion: Math.round(74827 * k), ev_ventas: 3.76, ev_ebitda_ltm: 15.7, ev_ebitda_ntm: 13.5, per_ntm: 22.7, crecimiento_pct: 10.6, margen_ebitda_pct: 23.9, roic_pct: 11.1, dn_ebitda: 3.2, fcf_yield_pct: 4.3 },
  { nombre: 'Amplifon', ticker: 'AMP.MI', pais: 'IT', capitalizacion: Math.round(20780 * k), ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 18.3, crecimiento_pct: 1.5, margen_ebitda_pct: 22.6, roic_pct: null, dn_ebitda: 2.8, fcf_yield_pct: 8.3 },
  { nombre: 'Cochlear', ticker: 'COH.AX', pais: 'AU', capitalizacion: Math.round(39520 * k), ev_ventas: 3.54, ev_ebitda_ltm: 15.4, ev_ebitda_ntm: 14.6, per_ntm: 27.4, crecimiento_pct: 2.0, margen_ebitda_pct: 23.0, roic_pct: null, dn_ebitda: -0.3, fcf_yield_pct: 3.3 },
  { nombre: 'Straumann', ticker: 'STMN.SW', pais: 'CH', capitalizacion: Math.round(118400 * k), ev_ventas: 5.44, ev_ebitda_ltm: 17.6, ev_ebitda_ntm: 15.7, per_ntm: 25.8, crecimiento_pct: 8.7, margen_ebitda_pct: 30.6, roic_pct: null, dn_ebitda: -0.16, fcf_yield_pct: 2.7 },
  { nombre: 'Coloplast', ticker: 'COLO-B.CO', pais: 'DK', capitalizacion: Math.round(102580 * k), ev_ventas: 4.80, ev_ebitda_ltm: 15.1, ev_ebitda_ntm: 14.4, per_ntm: 18.9, crecimiento_pct: 7.6, margen_ebitda_pct: 31.8, roic_pct: 11.9, dn_ebitda: 2.5, fcf_yield_pct: 5.3 },
  { nombre: 'Alcon', ticker: 'ALC.SW', pais: 'CH', capitalizacion: null, ev_ventas: 3.09, ev_ebitda_ltm: 11.7, ev_ebitda_ntm: 10.6, per_ntm: null, crecimiento_pct: 6.2, margen_ebitda_pct: 25.7, roic_pct: 4.75, dn_ebitda: 1.2, fcf_yield_pct: 5.7 },
  { nombre: 'Smith & Nephew', ticker: 'SN.L', pais: 'GB', capitalizacion: null, ev_ventas: 2.26, ev_ebitda_ltm: 8.7, ev_ebitda_ntm: 8.2, per_ntm: 15.2, crecimiento_pct: 5.1, margen_ebitda_pct: 26.1, roic_pct: null, dn_ebitda: 1.7, fcf_yield_pct: 7.4 },
  { nombre: 'Edwards Lifesciences', ticker: 'EW', pais: 'US', capitalizacion: null, ev_ventas: 7.0, ev_ebitda_ltm: 22.9, ev_ebitda_ntm: 19.4, per_ntm: 27.1, crecimiento_pct: 10.5, margen_ebitda_pct: 29.7, roic_pct: null, dn_ebitda: -1.85, fcf_yield_pct: 2.2 },
];
// Cierres de ejercicio (31 de marzo) para los múltiplos históricos: FY2022-FY2026.
const serie = (B.cierres_ejercicio || []).filter((c) => ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false }));
guarda('D', {
  _estado: 'completo',
  identificacion: {
    nombre: 'Sonova Holding AG', nombre_corto: 'Sonova', ticker: 'SOON', isin: 'CH0012549785', mercado: 'SIX Swiss Exchange', indice_referencia: 'SMI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Salud', industria: 'Equipos y suministros sanitarios (audífonos e implantes)', sede: 'Stäfa (Suiza)', fundacion: '1947', empleados: 18447, web: 'https://www.sonova.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 59.45, capitalizacion_publicada: null, free_float_pct: 82,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M CHF/día (3 meses)`, proximos_resultados: '2026-11-17',
  },
  consenso: {
    guidance: 'Guía FY2027 (abril de 2026 a marzo de 2027), del 18-may-2026: ventas +5-8 % y EBIT «core» +7-10 % en moneda local; con los cambios de principios de mayo, la divisa resta 1-2 puntos a las ventas y 3-4 al EBIT en francos [13]. A medio plazo (estrategia del 23-mar-2026): ventas +5-10 % y EBIT core +7-12 % anual en moneda local, con la ambición de 6.000 M de ventas en FY2031 [13]. Mercado esperado: 2-4 % en FY2027, hacia el 3-5 % a medio plazo. Dividendo de 4,70 CHF (≈ 45 % de reparto). Sin cambios de guía desde mayo; el semestre se publica el 17-nov-2026 [12].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 3867, ebitda: 1070, ebit: 832.6, bpa: 10.32, dpa: 4.84, fuente: 'MarketScreener, 19 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 4119, ebitda: 1163, ebit: 914.1, bpa: 12.09, dpa: 5.21, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 4395, ebitda: 1269, ebit: 997.6, bpa: 13.25, dpa: 5.72, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: null, mantener: null, vender: null, po_medio: 250.37, po_min: 170, po_max: 350 },
    revisiones: 'Solo hay una fuente gratuita con estimaciones completas (MarketScreener) [2]. El objetivo medio (250,37 CHF) va un 6 % por debajo del precio tras la subida del 65 % desde el mínimo de marzo; la recomendación media es «Outperform» [3]. Las ventas de FY2027e (3.867 M) son un 7,2 % más que FY2026, en la parte alta de la guía en moneda local sin descontar la divisa; el BPA de FY2027e (10,32) parece mezclar el publicado con partidas no recurrentes y la venta de Consumer, porque el EBIT esperado (832,6 M) daría más de 11 CHF por acción. Sin serie de revisiones legible.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: { serie, confianza: 'Alta' },
  comparables: { empresas: comp, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2026-03', objetivo: 'GN Hearing (ReSound, Beltone)', comprador: 'Amplifon', ev: 2122, ev_ventas: 2.36, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: '17.000 M DKK libre de caja y deuda; EBITDA pro forma 2025 de 1.185 M DKK [9].' },
      { fecha: '2025-06', objetivo: 'KIND Group (≈ 650 clínicas en Alemania)', comprador: 'Demant', ev: 652, ev_ventas: 2.61, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '700 M EUR; ≈ 17 veces el EBIT [9].' },
      { fecha: '2022-03', objetivo: 'Sennheiser Consumer Division', comprador: 'Sonova', ev: 265, ev_ventas: 1.0, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Precio de 330,6 M CHF menos 65,4 M de caja adquirida; ventas ≈ 250 M EUR (estimación propia del múltiplo). Audio de consumo: no comparable [10].' },
      { fecha: '2022-03', objetivo: 'Alpaca Audiology (≈ 220 clínicas en EE. UU.)', comprador: 'Sonova', ev: 286, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin ventas ni EBITDA publicados [10].' },
      { fecha: '2022-12', objetivo: 'HYSOUND (≈ 200 clínicas en China)', comprador: 'Sonova', ev: 244, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin ventas ni EBITDA publicados [10].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Suiza no tiene registro público de posiciones cortas; 2) prensa; 3) proveedores gratuitos', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'segunda fuente de estimaciones y reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (solo media); 2) Investing (JavaScript); 3) prensa suiza (cash.ch, sin cifras completas)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de HearingTracker: «How often to upgrade Phonak hearing aids?» (EON frente a Infinio y Sphere; 16 respuestas)', editor: 'HearingTracker Forum', tipo: 'Foros y redes', fecha: '2026-09-25', url: 'https://forum.hearingtracker.com/t/-/135050/2' },
  { id: 2, titulo: 'Foro de HearingTracker: «Sennheiser is for sale: Sonova wants to divest itself of the headphone brand»', editor: 'HearingTracker Forum', tipo: 'Foros y redes', fecha: '2026-03-31', url: 'https://forum.hearingtracker.com/t/sennheiser-is-for-sale-sonova-wants-to-divest-itself-of-the-headphone-brand/111627' },
  { id: 3, titulo: 'Sonova Holding AG (SONVY): news and analysis feed («Sonova unveils next-gen AI hearing aids», 24-ago-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-24', url: 'https://seekingalpha.com/api/sa/combined/SONVY.xml' },
  { id: 4, titulo: 'Sonova: consensus (Outperform, objetivo medio por debajo del precio)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/SONOVA-HOLDING-AG-70127/consensus/' },
  { id: 5, titulo: 'Phonak launches Eon – «a new benchmark for intelligent hearing» (cobertura sectorial: sin datos clínicos independientes al lanzamiento)', editor: 'Audiology Worldnews', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.audiology-worldnews.com/new-products/phonak-launches-eon-a-new-benchmark-for-intelligent-hearing/' },
];
guarda('E', {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Foro de HearingTracker (usuarios de audífonos)', fecha: '2026-09', n_comentarios: 16, tono: 'Dividido', resumen: 'Interés por EON pero pocas ganas de cambiar: varios usuarios de Infinio y Sphere dicen que la diferencia de tamaño no justifica renovar y que el habla en ruido sigue siendo difícil con cualquier marca; Sphere sí se valora como salto real [1].' },
      { plataforma: 'Foro de HearingTracker (venta de Sennheiser)', fecha: '2026-03', n_comentarios: 5, tono: 'Neutro', resumen: 'La venta de Consumer se ve lógica; la duda es si afecta a los audífonos con marca Sennheiser de Costco. Un usuario devolvió el OTC de Sennheiser por simple y opina que unos AirPods de 200 USD rinden igual [2].' },
      { plataforma: 'Seeking Alpha (SONVY)', fecha: '2026-08', n_comentarios: 6, tono: 'Positivo', resumen: 'Noticias y transcripciones (estrategia, resultados, lanzamiento de EON) sin debate apreciable de lectores en el ADR [3].' },
      { plataforma: 'Consenso de analistas en MarketScreener y prensa sectorial', fecha: '2026-10', n_comentarios: 19, tono: 'Dividido', resumen: 'Recomendación media «Outperform» pero objetivo medio un 6 % por debajo del precio: los analistas llegan tarde a la subida desde 163 CHF. La prensa sectorial recuerda que EON no tiene aún datos clínicos independientes [4, 5].' },
    ],
    temas: [
      { tema: 'EON y la IA en el chip como motor de cuota', postura: 'Alcista', peso: 'Alto', contraste: 'Infinio llevó el mayorista al +10,9 % en el 2S26; EON aún sin datos de venta (semestre el 17-nov).' },
      { tema: 'Ciclo de renovación lento de los usuarios', postura: 'Bajista', peso: 'Medio', contraste: 'Coherente con un mercado que Sonova prevé en solo un 2-4 % en FY2027: la nueva plataforma gana cuota, no amplía mucho el mercado.' },
      { tema: 'Venta de Sennheiser y canal Costco', postura: 'Dividida', peso: 'Bajo', contraste: 'Los audífonos Sennheiser de Costco los fabrica Phonak bajo licencia de marca; el negocio en venta es el de consumo (233 M de ventas, pérdidas).' },
      { tema: 'AirPods y OTC frente a la receta', postura: 'Dividida', peso: 'Bajo', contraste: 'En los foros se ven como sustituto del OTC barato, no del audífono con adaptación: lo mismo que dicen las cifras.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de inversores suizos y Reddit', tipo: 'Complemento', intentos: '1) cash.ch y finanzen.net (sin hilo accesible: 404); 2) stock3 (sin comentarios); 3) Reddit (403 en la nube) y Stocktwits (símbolo inexistente)', decision: 'Omitido' },
  ],
});
console.log('Notas A-E escritas');
