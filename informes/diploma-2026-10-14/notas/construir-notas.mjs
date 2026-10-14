// Escribe las notas A-E de Diploma PLC (corte 2026-10-14) a partir de los documentos de notas/docs (RNS de resultados FY20-FY25,
// H1 2026, actualizaciones de marzo y julio de 2026, transcripción del Q3, informe anual 2025), del XBRL ESEF (cuentas-xbrl.json),
// de bolsa.json (Yahoo) y de páginas abiertas con WebFetch (Stock Analysis, MarketScreener, interactive investor).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const USD_GBP = 1.1195 / 0.84385; // USD por GBP, BCE 14-oct-2026 (1,3267)

const URL = {
  fy25: 'https://www.diplomaplc.com/media/ejrpfglw/diploma-plc-fy25-preliminary-results-final-1.pdf',
  fy24: 'https://www.diplomaplc.com/media/1aajhnat/fy24-full-year-results.pdf',
  fy23: 'https://www.diplomaplc.com/media/2beds2ll/diploma-plc-preliminary-results-for-year-ended-30-september-2023.pdf',
  fy22: 'https://www.diplomaplc.com/media/zwlfmexp/diploma-plc-fy22-prelim.pdf',
  fy21: 'https://www.diplomaplc.com/media/rgzlescm/rns-fy-2021-final.pdf',
  fy20: 'https://www.diplomaplc.com/media/euxlulo5/diploma-2020-prelim-announcement.pdf',
  h126: 'https://www.diplomaplc.com/media/5m0fmngw/diploma-plc-half-year-results-2026.pdf',
  q326: 'https://www.diplomaplc.com/media/z4vpiw3u/diploma-plc-q3-trading-update.pdf',
  q3tr: 'https://www.diplomaplc.com/media/ym1ao0mc/diploma-q3-transcript-160726.pdf',
  mar26: 'https://www.diplomaplc.com/media/2badvq4n/diploma-trading-update-180326-final.pdf',
  q126: 'https://www.diplomaplc.com/media/3wbn0p3a/diploma-plc-q1-2026-trading-update.pdf',
  ar25: 'https://www.diplomaplc.com/media/5s3fi0yk/diploma-plc-annual-report-and-accounts-2025.pdf',
  esef: 'https://filings.xbrl.org/2138008OGI7VYG8FGR19/2025-09-30/ESEF/GB/0/2138008OGI7VYG8FGR19-2025-09-30/reports/2138008OGI7VYG8FGR19-2025-09-30-T01.xhtml',
};

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Preliminary results for the year ended 30 September 2025 (cuenta, balance, flujos y notas FY25 y FY24)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2025-11-18', url: URL.fy25 },
  { id: 2, titulo: 'Full year results 2024 (cuenta, balance y notas FY24 y FY23)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2024-11-19', url: URL.fy24 },
  { id: 3, titulo: 'Preliminary results for the year ended 30 September 2023', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2023-11-20', url: URL.fy23 },
  { id: 4, titulo: 'Preliminary announcement of full year results 2022', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2022-11-15', url: URL.fy22 },
  { id: 5, titulo: 'Preliminary announcement of full year results 2021', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2021-11-16', url: URL.fy21 },
  { id: 6, titulo: 'Preliminary announcement of final results 2020', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2020-11-17', url: URL.fy20 },
  { id: 7, titulo: 'Half year results for the six months ended 31 March 2026', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-05-19', url: URL.h126 },
  { id: 8, titulo: 'Q3 trading update: Strong Q3. Further 7 % FY upgrade', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-07-16', url: URL.q326 },
  { id: 9, titulo: 'Q3 Trading Update 2026: transcripción de la conferencia', editor: 'Diploma PLC / BRR Media', tipo: 'Primaria', fecha: '2026-07-16', url: URL.q3tr },
  { id: 10, titulo: 'Trading update: Significant upgrade to FY26 guidance', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-03-18', url: URL.mar26 },
  { id: 11, titulo: 'Q1 2026 trading update', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-01-14', url: URL.q126 },
  { id: 12, titulo: 'Annual Report and Accounts 2025', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2025-12-10', url: URL.ar25 },
  { id: 13, titulo: 'Informes anuales ESEF (xBRL) FY2021-FY2025 de Diploma PLC (LEI 2138008OGI7VYG8FGR19)', editor: 'XBRL International (filings.xbrl.org)', tipo: 'Primaria', fecha: '2025-12', url: URL.esef },
];

// Cuenta estatutaria (NIIF del Reino Unido). EBITDA = EBIT estatutario + toda la amortización (inmovilizado, derechos de uso e intangibles,
// incluida la de intangibles comprados). no_recurrentes_en_ebitda: plusvalías (−) o pérdidas (+) por venta de negocios y reestructuraciones.
const cuenta = [
  { periodo: 'FY2021', ingresos: 787.4, coste_ventas: 499.0, gastos_generales: 130.3, ebitda: 158.1, amortizaciones: 53.8, ebit: 104.3, resultado_financiero: -7.7, bai: 96.6, impuestos: 26.9, minoritarios: 0, beneficio_neto: 69.8, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1.6, bpa: 0.559, dpa: 0.426, dpa_extraordinario: 0, acciones_diluidas: 124.9 },
  { periodo: 'FY2022', ingresos: 1012.8, coste_ventas: 561.3, gastos_generales: 241.3, ebitda: 210.2, amortizaciones: 65.9, ebit: 144.3, resultado_financiero: -14.8, bai: 129.5, impuestos: 34.1, minoritarios: 0.7, beneficio_neto: 94.7, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -6.0, bpa: 0.759, dpa: 0.538, dpa_extraordinario: 0, acciones_diluidas: 124.8 },
  { periodo: 'FY2023', ingresos: 1200.3, coste_ventas: 658.0, gastos_generales: 277.5, ebitda: 264.8, amortizaciones: 81.5, ebit: 183.3, resultado_financiero: -27.7, bai: 155.6, impuestos: 37.3, minoritarios: 0.6, beneficio_neto: 117.7, gastos_financieros: 16.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -12.2, bpa: 0.904, dpa: 0.565, dpa_extraordinario: 0, acciones_diluidas: 130.2 },
  { periodo: 'FY2024', ingresos: 1363.4, coste_ventas: 734.5, gastos_generales: 329.9, ebitda: 299.0, amortizaciones: 91.6, ebit: 207.4, resultado_financiero: -30.8, bai: 176.6, impuestos: 46.6, minoritarios: 0.7, beneficio_neto: 129.3, gastos_financieros: 22.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 3.6, bpa: 0.961, dpa: 0.593, dpa_extraordinario: 0, acciones_diluidas: 134.5 },
  { periodo: 'FY2025', ingresos: 1524.5, coste_ventas: 818.4, gastos_generales: 330.2, ebitda: 375.9, amortizaciones: 92.2, ebit: 283.7, resultado_financiero: -35.4, bai: 248.3, impuestos: 62.8, minoritarios: 0.6, beneficio_neto: 184.9, gastos_financieros: 21.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -17.3, bpa: 1.373, dpa: 0.623, dpa_extraordinario: 0, acciones_diluidas: 134.7 },
];
const balance = [
  { periodo: 'FY2021', activo_total: 983.4, activo_corriente: 294.3, pasivo_corriente: 176.3, pasivo_total: 442.4, fondo_comercio: 260.7, intangibles: 345.0, inmovilizado_material: 35.4, existencias: 140.0, clientes: 118.0, proveedores: 127.0, activos_contrato: null, pasivos_contrato: null, caja: 24.8, deuda_financiera: 206.2, arrendamientos: 48.3, patrimonio_neto: 536.3, minoritarios: 4.7, reservas: 329.0 },
  { periodo: 'FY2022', activo_total: 1379.0, activo_corriente: 429.0, pasivo_corriente: 264.0, pasivo_total: 710.8, fondo_comercio: 372.0, intangibles: 455.0, inmovilizado_material: 49.6, existencias: 217.0, clientes: 170.0, proveedores: 190.0, activos_contrato: null, pasivos_contrato: null, caja: 41.7, deuda_financiera: 370.6, arrendamientos: 69.1, patrimonio_neto: 662.0, minoritarios: 6.2, reservas: 375.0 },
  { periodo: 'FY2023', activo_total: 1589.3, activo_corriente: 488.0, pasivo_corriente: 237.0, pasivo_total: 687.3, fondo_comercio: 439.0, intangibles: 520.0, inmovilizado_material: 59.2, existencias: 233.0, clientes: 193.0, proveedores: 192.0, activos_contrato: null, pasivos_contrato: null, caja: 62.4, deuda_financiera: 317.1, arrendamientos: 80.2, patrimonio_neto: 896.0, minoritarios: 6.4, reservas: 424.0 },
  { periodo: 'FY2024', activo_total: 1772.1, activo_corriente: 589.0, pasivo_corriente: 271.0, pasivo_total: 877.4, fondo_comercio: 541.1, intangibles: 507.8, inmovilizado_material: 63.4, existencias: 280.0, clientes: 207.0, proveedores: 204.0, activos_contrato: null, pasivos_contrato: null, caja: 55.5, deuda_financiera: 479.8, arrendamientos: 72.3, patrimonio_neto: 888.0, minoritarios: 6.7, reservas: 478.2 },
  { periodo: 'FY2025', activo_total: 1809.4, activo_corriente: 608.1, pasivo_corriente: 298.3, pasivo_total: 815.2, fondo_comercio: 563.5, intangibles: 482.1, inmovilizado_material: 66.7, existencias: 297.4, clientes: 229.0, proveedores: 245.3, activos_contrato: null, pasivos_contrato: null, caja: 81.7, deuda_financiera: 381.1, arrendamientos: 83.8, patrimonio_neto: 989.7, minoritarios: 4.5, reservas: 588.0 },
];
const flujos = [
  { periodo: 'FY2021', flujo_operativo: 116.1, capex: 6.2, pagos_arrendamientos: 9.5, adquisiciones: 451.4, desinversiones: 15.8, dividendos: 52.9, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2022', flujo_operativo: 125.0, capex: 15.4, pagos_arrendamientos: 10.9, adquisiciones: 173.0, desinversiones: 23.6, dividendos: 56.2, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2023', flujo_operativo: 189.2, capex: 23.1, pagos_arrendamientos: 13.9, adquisiciones: 258.5, desinversiones: 23.0, dividendos: 70.5, recompras: 0, emision_acciones: 236.1, intereses_en_financiacion: 0 },
  { periodo: 'FY2024', flujo_operativo: 198.1, capex: 19.7, pagos_arrendamientos: 16.0, adquisiciones: 270.5, desinversiones: 5.7, dividendos: 76.8, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2025', flujo_operativo: 267.6, capex: 14.4, pagos_arrendamientos: 14.6, adquisiciones: 58.5, desinversiones: 40.3, dividendos: 80.9, recompras: 4.1, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'Completo. Cuenta, balance y flujos del XBRL ESEF comprobados contra las notas de resultados; deuda corregida (el XBRL solo daba la parte a largo plazo en FY2021-22 y FY2025).',
  negocio: {
    segmentos: [
      { nombre: 'Controls', descripcion: 'Componentes de precisión con valor añadido (cables y conectores, sujeciones aeroespaciales de Peerless, adhesivos, cable de baja tensión de Windy City Wire) para aeroespacial, defensa, centros de datos, energía e infraestructuras.', tipo_resultado: 'EBIT', historico: [
        { periodo: 'FY2021', ingresos: 343.3, resultado: 72.4 }, { periodo: 'FY2022', ingresos: 492.8, resultado: 105.8 }, { periodo: 'FY2023', ingresos: 568.4, resultado: 136.6 }, { periodo: 'FY2024', ingresos: 652.4, resultado: 169.9 }, { periodo: 'FY2025', ingresos: 836.4, resultado: 250.6 } ] },
      { nombre: 'Seals', descripcion: 'Juntas, retenes y componentes de fluido hidráulico para reparación y mantenimiento de maquinaria pesada e infraestructuras (Hercules en EE. UU., R&G, DICSA, International Seals).', tipo_resultado: 'EBIT', historico: [
        { periodo: 'FY2021', ingresos: 263.7, resultado: 46.5 }, { periodo: 'FY2022', ingresos: 331.4, resultado: 62.6 }, { periodo: 'FY2023', ingresos: 419.0, resultado: 79.0 }, { periodo: 'FY2024', ingresos: 489.1, resultado: 90.7 }, { periodo: 'FY2025', ingresos: 456.0, resultado: 88.1 } ] },
      { nombre: 'Life Sciences', descripcion: 'Consumibles, equipos y servicio técnico para diagnóstico in vitro y tecnología médica en Canadá, Australia, Irlanda, Reino Unido y nórdicos.', tipo_resultado: 'EBIT', historico: [
        { periodo: 'FY2021', ingresos: 180.4, resultado: 43.2 }, { periodo: 'FY2022', ingresos: 188.6, resultado: 41.0 }, { periodo: 'FY2023', ingresos: 212.9, resultado: 43.2 }, { periodo: 'FY2024', ingresos: 221.9, resultado: 46.8 }, { periodo: 'FY2025', ingresos: 232.1, resultado: 45.3 } ] },
    ],
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 52.6 }, { nombre: 'Reino Unido', peso_pct: 18.4 }, { nombre: 'Resto de Europa', peso_pct: 16.2 }, { nombre: 'Resto del mundo', peso_pct: 12.8 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Crecimiento orgánico de ingresos', valor_anterior: '6 % (FY2024)', valor_actual: '11 % (FY2025); 15 % (H1 2026)', variacion: '+5 p.', comentario: 'Guía FY2026: 14 % [1, 7, 8].' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '20,9 % (FY2024)', valor_actual: '22,5 % (FY2025); 24,5 % (H1 2026)', variacion: '+160 pb', comentario: 'Guía FY2026: c. 26,5 % [1, 8].' },
      { kpi: 'ROATCE (rentabilidad sobre capital de explotación ajustado)', valor_anterior: '19,1 %', valor_actual: '20,9 % (FY2025); 22,7 % (H1 2026)', variacion: '+180 pb', comentario: 'Incluye el fondo de comercio y los cargos de compras históricos [1, 7].' },
      { kpi: 'Conversión de caja libre', valor_anterior: '101 %', valor_actual: '105 % (FY2025); 76 % (H1 2026)', variacion: '+4 p.', comentario: 'El H1 2026 acumula existencias [1, 7].' },
      { kpi: 'BPA ajustado', valor_anterior: '145,8 p', valor_actual: '176,0 p (FY2025); 109,2 p (H1 2026, +36 %)', variacion: '+21 %', comentario: 'Excluye amortización de intangibles comprados y cargos de compras [1, 7].' },
      { kpi: 'Apalancamiento (deuda neta/EBITDA de covenants)', valor_anterior: '1,3x', valor_actual: '0,8x (FY2025 y H1 2026)', variacion: '−0,5x', comentario: 'Política < 2,0x; covenant 3,5x [1, 7].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: 1647.1, ebitda: 404.3, ebit: 309.4, beneficio_neto: 189.4, bpa: 1.405, dpa: 0.632, dpa_extraordinario: 0, fcf: 274.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 2.0 },
    cambios_perimetro: [
      { periodo: 'FY2021', descripcion: 'Windy City Wire (EE. UU.), comprada el 16-oct-2020 por 347,7 M GBP: entra casi todo el año; el crecimiento de FY2021 (+46 %) es sobre todo comprado.' },
      { periodo: 'FY2024', descripcion: 'Peerless Aerospace Fastener (EE. UU.), comprada a finales de marzo de 2024 por 243,3 M GBP: medio año en la cuenta y todo en el balance.' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 652.5, crecimiento_pct: 6.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2S24', ingresos: 710.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1S25', ingresos: 728.5, crecimiento_pct: 11.6, crecimiento_organico_pct: 9, ebitda: null, margen_ebitda_pct: null, bpa: 0.712, vs_consenso: 'Superior' },
      { periodo: '2S25', ingresos: 796.0, crecimiento_pct: 12.0, crecimiento_organico_pct: 13, ebitda: null, margen_ebitda_pct: null, bpa: 0.661, vs_consenso: 'Superior' },
      { periodo: '1S26', ingresos: 851.1, crecimiento_pct: 16.8, crecimiento_organico_pct: 15, ebitda: null, margen_ebitda_pct: null, bpa: 0.744, vs_consenso: 'Superior' },
    ],
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 1.2 }, { anio: '2028', importe: 0 }, { anio: '2030', importe: 84.0 }, { anio: '2031', importe: 65.5 }, { anio: '2032', importe: 75.9 }, { anio: '2034', importe: 87.4 }, { anio: '2035+', importe: 103.4 },
    ],
    liquidez: 'Caja 68,7 M + 571,0 M sin disponer de las líneas (RCF sindicado de 555 M hasta julio de 2030 y bilateral de 100 M hasta diciembre de 2028): margen de 639,7 M a 31-mar-2026 [7].',
    rating: 'Sin rating público (financiación con colocaciones privadas en EE. UU. y créditos bancarios) [7].',
    coste_deuda_pct: 5.3,
    vida_media_anios: 6.5,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades ni párrafos de énfasis) [1, 12]', confianza: 'Media' },
  capital: {
    adquisiciones: [
      { anio: '2021', objetivo: 'Windy City Wire (cable de baja tensión, EE. UU.)', importe: 347.7, ev_ebitda: null, financiacion: 'Ampliación de 193,7 M y deuda', resultado: 'Crecimiento orgánico medio del 17 % anual desde la compra; hoy un 30 % de Controls [7, 5].' },
      { anio: '2022', objetivo: 'R&G Fluid Power y Accuscience (y otras cinco)', importe: 187.0, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Seals FY2025 +2 % orgánico; R&G dentro de International Seals, que sigue débil en el Reino Unido [4, 1].' },
      { anio: '2023', objetivo: 'DICSA (España) y T.I.E. (EE. UU.)', importe: 246.0, ev_ebitda: null, financiacion: 'Colocación de acciones (236,1 M) y deuda', resultado: 'Pagadas a 9 veces el EBIT conjunto; la empresa espera el 20 % de rentabilidad a medio plazo; cambio de director general en DICSA en 2026 [3, 9].' },
      { anio: '2024', objetivo: 'Peerless Aerospace Fastener (EE. UU.) y seis más', importe: 293.0, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Peerless pagada a 7 veces el EBIT; crecimiento muy por encima de su historia y principal motor del margen de 2025-26 [2, 10].' },
      { anio: '2026', objetivo: '15 compras en 12 meses, incluida CDM (interconexión para defensa, EE. UU., c. 80 M USD de ventas)', importe: 310.0, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Media de 8 veces el EBIT; c. 40 M de EBIT anual esperado [7, 9].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA semestral', tipo: 'Complemento', intentos: '1) Notas de resultados semestrales: solo dan resultado operativo ajustado; 2) presentaciones: igual; 3) derivarlo con amortizaciones semestrales: solo hay para H1; se deja el BPA estatutario.', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'gastos financieros FY2021-FY2022', tipo: 'Complemento', intentos: '1) Nota 5 de las notas de resultados FY2021 y FY2022; 2) XBRL ESEF: sin concepto de intereses de préstamos; 3) informe anual 2022: no descargado por tiempo.', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Fastenal Company Form 10-K 2025 (mercado norteamericano de suministros industriales > 140.000 M USD; sector grande y fragmentado)', editor: 'Fastenal / SEC', tipo: 'Primaria', fecha: '2026-02-05', url: 'https://www.sec.gov/Archives/edgar/data/815556/000081555626000009/fast-20251231.htm' },
  { id: 2, titulo: 'W.W. Grainger Form 10-K 2025 (sector MRO grande y fragmentado; ingresos 17.900 M USD)', editor: 'W.W. Grainger / SEC', tipo: 'Primaria', fecha: '2026-02', url: 'https://www.sec.gov/Archives/edgar/data/277135/000027713526000011/gww-20251231.htm' },
  { id: 3, titulo: 'Fastenal (FAST) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/fast/statistics/' },
  { id: 4, titulo: 'W.W. Grainger (GWW) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/gww/statistics/' },
  { id: 5, titulo: 'MSC Industrial Direct (MSM) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/msm/statistics/' },
  { id: 6, titulo: 'Bunzl plc (BNZL) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/lon/BNZL/statistics/' },
  { id: 7, titulo: 'RS Group plc (RS1) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/lon/RS1/statistics/' },
  { id: 8, titulo: 'Halma plc (HLMA) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/lon/HLMA/statistics/' },
  { id: 9, titulo: 'Applied Industrial Technologies (AIT) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ait/statistics/' },
  { id: 10, titulo: 'Annual Report and Accounts 2025 (estrategia, mercados finales, modelo financiero)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2025-12-10', url: URL.ar25 },
  { id: 11, titulo: 'Half year results 2026 (sectores, mercados finales)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-05-19', url: URL.h126 },
  { id: 12, titulo: 'Q3 Trading Update 2026: transcripción (Peerless, defensa, centros de datos)', editor: 'Diploma PLC / BRR Media', tipo: 'Primaria', fecha: '2026-07-16', url: URL.q3tr },
  { id: 13, titulo: 'Preliminary results FY2025 (modelo financiero, sectores)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2025-11-18', url: URL.fy25 },
  { id: 14, titulo: 'Ficha sectorial: Distribución industrial especializada (14-oct-2026)', editor: 'Análisis propio (sectores/distribucion-industrial-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14.md' },
];
const B = {
  _estado: 'Completo con la ficha sectorial y los informes de los competidores.',
  negocio: {
    descripcion: 'Diploma es un grupo de unas 70 empresas especializadas que venden componentes y consumibles críticos con valor añadido: juntas y retenes para maquinaria pesada (Seals), cables, conectores, sujeciones aeroespaciales, adhesivos y cable de baja tensión (Controls) y consumibles y equipos para diagnóstico y quirófano (Life Sciences) [10]. No fabrica en serie: compra a fabricantes, mantiene existencias, corta a medida, ensambla kits, certifica y entrega rápido a miles de clientes industriales, sobre todo para reparación y mantenimiento. Opera en EE. UU. (53 % de las ventas por origen), Reino Unido, resto de Europa, Canadá y Australia, con c. 3.400 empleados [13, 11]. Es un comprador en serie: 57 compras desde 2019 por 1.600 M GBP [11].',
    como_gana_dinero: 'Gana un margen bruto de c. 46 % (FY2025: coste de existencias vendidas de 818 M sobre 1.525 M de ventas) por el servicio: disponibilidad, personalización y conocimiento técnico en pedidos pequeños y urgentes donde el componente vale poco frente al coste de una parada [13]. Los gastos son personal y almacenes; el margen operativo ajustado fue del 22,5 % en FY2025 y la guía de FY2026 es c. 26,5 %, con apalancamiento operativo alto cuando crece el volumen [13, 12]. Necesita poco inmovilizado (capex < 1 % de las ventas) pero inmoviliza existencias (c. 20 % de las ventas en circulante) [13]. Reinvierte la caja libre en compras pequeñas a 6-9 veces el EBIT y las deja gestionar con autonomía.',
    clientes: 'Miles de clientes industriales y sanitarios, sin concentración relevante publicada: la empresa no da el peso del primer cliente y describe una base muy diversificada [10]. Los pedidos son pequeños y repetitivos (reparación y mantenimiento), sin contratos largos salvo acuerdos marco en aeroespacial y sanidad. El poder de precios se ve en el margen: el operativo ajustado subió de 20,9 % a 22,5 % en FY2025 y a 24,5 % en el H1 2026 con un crecimiento orgánico guiado por volumen [13, 11]; en Peerless la dirección admite que está bajando algo los precios al contado para ganar volumen y mantener un margen sostenible [12].',
  },
  sector: {
    definicion: 'Distribución especializada de componentes técnicos y consumibles con valor añadido (juntas, sujeciones, cables, conectores, adhesivos, componentes de fluido, consumibles sanitarios) para reparación, mantenimiento y fabricación de bajo volumen, en Norteamérica, Europa y Australia. Es un subconjunto del mercado de suministros industriales y MRO, que Fastenal estima en más de 140.000 M USD solo en Norteamérica [1]. Diploma compite en decenas de nichos que no tienen estadística propia; no hay una cifra fiable del mercado agregado de sus nichos, por lo que usamos la de suministros industriales como referencia de tamaño y no calculamos cuota del grupo.',
    tamano: '> 140.000 M USD (≈ 105.500 M GBP) el mercado norteamericano de suministros industriales, estimación de Fastenal [1]',
    unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null,
    cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Aeroespacial civil: cadena de suministro tensionada y cartera de aviones', efecto: '+', horizonte: 'Cíclico', evidencia: 'Peerless crece muy por encima de su historia; la dirección prevé que vuelva a c. 10 % y baja algo los precios al contado [12].' },
      { driver: 'Gasto en defensa en Europa y EE. UU.', efecto: '+', horizonte: 'Estructural', evidencia: 'Defensa = 6-7 % de las ventas con CDM; nuevo almacén en Chequia para Alemania y los nórdicos [12, 11].' },
      { driver: 'Centros de datos y energía', efecto: '+', horizonte: 'Estructural', evidencia: 'Centros de datos ≈ 3 % del grupo (15 % de Windy City Wire); crecimiento de dos dígitos en WCW [12].' },
      { driver: 'Producción industrial y reparación de maquinaria pesada', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Seals solo +2 % orgánico en FY2025 y H1 2026 por el Reino Unido débil [13, 11].' },
      { driver: 'Gasto sanitario y ciclos de producto en diagnóstico', efecto: '−', horizonte: 'Cíclico', evidencia: 'Life Sciences +4 % en el H1 2026 en «mercados sanitarios difíciles»; la dirección espera un dígito bajo en FY2026 [11, 12].' },
      { driver: 'Consolidación de un mercado fragmentado', efecto: '+', horizonte: 'Estructural', evidencia: 'Fastenal describe un sector «grande y fragmentado» que se consolida lentamente [1]; Diploma hizo 15 compras en 12 meses [11].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Muchos competidores locales y fabricantes con venta directa, pero en nichos pequeños donde el servicio pesa más que el precio; márgenes EBITDA de los grandes entre el 8 % (Bunzl, RS) y el 24 % (Halma, Diploma) [6, 7, 8].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes muy atomizados, pedidos pequeños y urgentes; el componente es un coste mínimo frente a una parada [10].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Algunos fabricantes de marca (Parker, Trelleborg, grandes de sujeciones aeroespaciales) tienen poder; la escasez de sujeciones aeroespaciales favorece hoy al distribuidor con existencias [12].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras de certificación (aeroespacial, sanidad), existencias y relaciones técnicas; los marketplaces digitales entran en lo estándar, no en lo personalizado [10].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La venta directa del fabricante y el comercio electrónico sustituyen la parte estándar; la de valor añadido (corte, kits, certificación) es menos sustituible [10].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Los nichos de Diploma están en un pico: crecimiento orgánico del 15 % en nueve meses frente a un modelo del 5 % y una media de cinco años del 10 % [11, 13]. En 2020 los ingresos cayeron un 1 % y el margen bajó a 16,2 % con reestructuración; en 2022-23 la inflación se trasladó a precios y el orgánico fue de dos dígitos [6, 13]. La propia dirección dice que FY2026 «no es un año normal» y que FY2027 volverá hacia el modelo financiero [12]. Seals y Life Sciences están en la parte baja.' },
    regulacion: 'Aranceles de EE. UU. sobre componentes importados: Diploma vende sobre todo dentro de cada país (el 53 % de las ventas se origina en EE. UU.) y traslada precios [13]. En aeroespacial y defensa rigen certificaciones de calidad y controles de exportación que actúan como barrera de entrada; en Life Sciences, el reglamento europeo de diagnóstico in vitro (IVDR) encarece el cumplimiento de los fabricantes y favorece a los distribuidores con servicio técnico (juicio propio, sin cifra). Sin cambios regulatorios con fecha que muevan las cifras a 12 meses.',
    tendencias: 'Los fabricantes reducen su red comercial y externalizan el servicio en pedidos pequeños: favorece a distribuidores especializados. El comercio electrónico (Amazon Business, marketplaces) presiona la parte estándar del MRO, más que los nichos técnicos de Diploma [1, 2]. La inteligencia artificial ayuda en precios, inventario y cotización, y la usan también los grandes (Grainger, Fastenal) [2, 1]. Diploma gana con la relocalización industrial en EE. UU., la defensa europea y los centros de datos [12].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Líder o número dos en muchos nichos (cable de baja tensión en EE. UU., sujeciones aeroespaciales de categoría C, juntas para maquinaria pesada en Norteamérica), pero con una cuota menor del 2 % de los suministros industriales norteamericanos [1, 10].',
    competidores: [
      { nombre: 'W.W. Grainger', pais: 'EE. UU.', ticker: 'GWW', ingresos: Math.round(17900 / USD_GBP), cuota_pct: null, margen_ebit_pct: 15.7, comentario: 'MRO generalista con catálogo amplio y logística propia; ROIC del 33 % [4, 2].' },
      { nombre: 'Fastenal', pais: 'EE. UU.', ticker: 'FAST', ingresos: Math.round(59790 / 6.53 / USD_GBP), cuota_pct: null, margen_ebit_pct: 20.5, comentario: 'Sujeciones y MRO con máquinas expendedoras en planta del cliente; ROIC del 33 % [3, 1].' },
      { nombre: 'MSC Industrial Direct', pais: 'EE. UU.', ticker: 'MSM', ingresos: Math.round(7870 / 2.01 / USD_GBP), cuota_pct: null, margen_ebit_pct: 8.8, comentario: 'Herramientas de corte y MRO de metalurgia; margen en caída [5].' },
      { nombre: 'Applied Industrial Technologies', pais: 'EE. UU.', ticker: 'AIT', ingresos: Math.round(12590 / 2.56 / USD_GBP), cuota_pct: null, margen_ebit_pct: 11.1, comentario: 'Rodamientos, transmisión y fluidos: el más parecido a Seals [9].' },
      { nombre: 'RS Group', pais: 'Reino Unido', ticker: 'RS1', ingresos: Math.round(4000 / 1.37), cuota_pct: null, margen_ebit_pct: 8.0, comentario: 'Distribución de componentes electrónicos e industriales por catálogo; compite con Controls en el Reino Unido [7].' },
      { nombre: 'Bunzl', pais: 'Reino Unido', ticker: 'BNZL', ingresos: Math.round(11120 / 0.92), cuota_pct: null, margen_ebit_pct: 6.6, comentario: 'Distribución de consumibles no críticos; comprador en serie con margen bajo [6].' },
      { nombre: 'Würth', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor distribuidor privado de sujeciones y montaje del mundo; no cotiza y no se usan sus cifras.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: no es una plataforma.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Componentes certificados y especificados en el diseño o el mantenimiento del cliente (aeroespacial, sanidad); pedidos pequeños donde cambiar de proveedor no compensa [10].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Certificaciones y acuerdos de distribución con fabricantes; sin patentes relevantes [10].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'No es el más barato: su margen bruto (c. 46 %) es alto porque cobra el servicio [13].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nichos pequeños donde un líder con existencias y conocimiento técnico deja poco sitio a un segundo; margen operativo ajustado del 22,5 % frente al 7-16 % de los grandes generalistas [13, 4, 5, 6, 7].' },
      ],
    },
    amenazas: 'La principal es cíclica, no estructural: que el margen de Peerless y de Controls vuelva a niveles normales (la dirección ya lo anuncia) [12]. Estructuralmente, la venta directa de fabricantes y los marketplaces digitales en la parte estándar del catálogo, y la competencia de grandes como Grainger o Würth si entran en nichos rentables. Probabilidad media a cinco años; el efecto sería sobre el margen, no sobre el volumen.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Diploma nació en 1931 como fabricante de equipos eléctricos y se transformó en las décadas de 1990-2000 en un grupo de distribuidores especializados del Reino Unido. Con Johnny Thomson (consejero delegado desde 2019, antes director financiero de Compass) dio el salto a EE. UU. con Windy City Wire (2020) y Peerless (2024), simplificó la estructura en tres sectores y aceleró las compras: 57 desde 2019 por 1.600 M GBP [11, 10]. Entró en el FTSE 100 en 2023 [10].',
    hitos: [
      { anio: '2019', hito: 'Johnny Thomson, consejero delegado.' },
      { anio: '2020', hito: 'Compra de Windy City Wire (EE. UU.) por 449,6 M USD, financiada con una ampliación de 193,7 M GBP.' },
      { anio: '2022', hito: 'Compra de R&G Fluid Power y Accuscience.' },
      { anio: '2023', hito: 'Compras de DICSA (España) y T.I.E. (EE. UU.); colocación de acciones; entrada en el FTSE 100.' },
      { anio: '2024', hito: 'Compra de Peerless Aerospace Fastener (EE. UU.) por 243 M GBP a 7 veces el EBIT; ventas de Kubo, Pennine y Gremtek.' },
      { anio: '2025', hito: 'Margen operativo ajustado del 22,5 %; dimite el director financiero Chris Davies (agosto).' },
      { anio: '2026', hito: 'Tres subidas de la guía (orgánico 6 → 14 %, margen 22,5 → 26,5 %); 15 compras en 12 meses, incluida CDM (defensa, EE. UU.).' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la seguridad del producto (componentes críticos en aviones, quirófanos y maquinaria) y la cadena de suministro: un fallo de calidad en sujeciones aeroespaciales o en consumibles sanitarios tendría coste reputacional y legal [10]. Las emisiones propias son pequeñas (distribución sin fabricación pesada) y la empresa publica objetivos de reducción [10].',
    controversias: 'No hemos encontrado sanciones, litigios relevantes ni incidentes en los últimos tres años en el informe anual 2025 ni en las comunicaciones de 2026 [10, 11].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual 2025: no las recoge; 2) búsqueda de MSCI y Sustainalytics: páginas con JavaScript; 3) agregadores: sin fecha fiable.', decision: 'Omitido' },
    { seccion: 'sector', campo: 'serie, TCAC y CR5', tipo: 'Complemento', intentos: '1) Informes de Fastenal y Grainger: solo tamaño sin serie; 2) MDM (Modern Distribution Management): 403, de pago; 3) Diploma no publica el tamaño de sus nichos.', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025 (consejo, remuneración, accionistas, votaciones)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2025-12-10', url: URL.ar25 },
  { id: 2, titulo: 'Director/PDMR Shareholding: venta de 30.000 acciones del consejero delegado a 56,68 GBP', editor: 'Diploma PLC (RNS, vía ticker.app)', tipo: 'Primaria', fecha: '2026-01-16', url: 'https://www.ticker.app/lse/DPLM/rns/2026-01-16/DirectorPDMR-Shareholding/2954P' },
  { id: 3, titulo: 'Full year results 2024 (guía FY2025)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2024-11-19', url: URL.fy24 },
  { id: 4, titulo: 'Preliminary results FY2025 (guía FY2026)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2025-11-18', url: URL.fy25 },
  { id: 5, titulo: 'Trading update 18-mar-2026', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-03-18', url: URL.mar26 },
  { id: 6, titulo: 'Half year results 2026', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-05-19', url: URL.h126 },
  { id: 7, titulo: 'Q3 trading update 2026', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-07-16', url: URL.q326 },
  { id: 8, titulo: 'Preliminary results FY2023 (guía FY2024)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2023-11-20', url: URL.fy23 },
];
const C = {
  _estado: 'Completo con el informe anual 2025 y los RNS de 2026.',
  directivos: {
    equipo: [
      { nombre: 'Johnny Thomson', cargo: 'Consejero delegado', desde: '2019', participacion_pct: 0.16, trayectoria: 'Antes director financiero del grupo Compass y director regional de Latinoamérica. Desde 2019 el BPA ajustado pasó de 64,3 p (FY2019) a 176,0 p (FY2025) y la empresa entró en el FTSE 100 [1, 4]. Tiene 208.500 acciones tras vender 30.000 en enero de 2026 [2].' },
      { nombre: 'Wilson Ng', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.0, trayectoria: 'En el grupo desde 2022; antes director financiero de división en Spirax y vicepresidente financiero en GKN. Interino desde agosto de 2025 y titular en 2026 [1, 5].' },
      { nombre: 'David Lowden', cargo: 'Presidente', desde: '2021', participacion_pct: null, trayectoria: 'Presidente de Capita y consejero independiente coordinador de Morgan Sindall; antes presidente de PageGroup [1].' },
      { nombre: 'Anna Lawrence', cargo: 'Directora jurídica y secretaria del consejo', desde: '2025', participacion_pct: null, trayectoria: 'Incorporada en mayo de 2025 [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2024', guia: 'Crecimiento en línea con el modelo (orgánico c. 5 %) y márgenes altos [8]', real: 'Orgánico 6 %, margen 20,9 % [3]', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Orgánico c. 6 %, compras +2 %, margen c. 21 % [3]', real: 'Orgánico 11 %, margen 22,5 % [4]', cumplida: 'Sí' },
      { anio: 'FY2026 (nov-25)', guia: 'Orgánico 6 %, compras +2 %, margen c. 22,5 % [4]', real: 'Subida en marzo (9 %, 25 %), mayo (12 %, 25 %) y julio (14 %, 26,5 %) [5, 6, 7]', cumplida: 'Sí' },
    ],
  },
  gobierno: {
    consejo: [
      { nombre: 'David Lowden', cargo: 'Presidente', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos (presidente)' },
      { nombre: 'Johnny Thomson', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Wilson Ng', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Katie Bickerstaffe', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, Remuneración, Nombramientos' },
      { nombre: 'Janice Stipp', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Jennifer Ward', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración (presidenta)' },
      { nombre: 'Dean Finch', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, Remuneración' },
      { nombre: 'Geraldine Huse', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Ian El-Mokadem', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.31, voto_remuneracion_contra_pct: 6.69, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 7.15, fijo: 0.987, variable_corto: 1.837, variable_largo: 4.326, ratio_salario_medio: 191 },
    remuneracion: 'El consejero delegado cobró 7,15 M GBP en FY2025 (4,58 M en FY2024): 0,99 M fijos, 1,84 M de bonus anual (máximo 200 % del salario) y 4,33 M del plan a largo plazo, inflado por la subida de la acción [1]. El plan de acciones por rendimiento (300 % del salario) se mide con crecimiento del BPA ajustado, rentabilidad total para el accionista frente al índice y ROATCE, con malus y clawback [1]. La ratio frente al empleado mediano del Reino Unido es de 191 a 1 [1]. Exige mantener el 300 % del salario en acciones; tenía el 1.389 % [1]. El BPA ajustado excluye la amortización de lo comprado, lo que premia comprar; el ROATCE lo compensa al incluir el fondo de comercio.',
    accionistas: [
      { nombre: 'Capital Group', pct: 12.96, tipo: 'Institucional', variacion: 'Sin cambios en 2025' },
      { nombre: 'FMR (Fidelity)', pct: 5.27, tipo: 'Institucional', variacion: 'Sin cambios' },
      { nombre: 'BlackRock', pct: 5.02, tipo: 'Institucional', variacion: 'Sube por encima del 5 % (nov-25)' },
      { nombre: 'Norges Bank', pct: 3.01, tipo: 'Institucional', variacion: 'Sin cambios' },
    ],
    insiders: [
      { fecha: '2026-01-16', persona: 'Johnny Thomson (consejero delegado)', operacion: 'Venta', acciones: 30000, importe: 1.70 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor es Capital Group con el 12,96 % y el capital está repartido entre institucionales [1]. Una acción, un voto; sin blindajes estatutarios ni pactos conocidos. Presidente independiente separado del consejero delegado, consejera coordinadora y comisiones de auditoría y remuneración solo con independientes [1]. No hay operaciones vinculadas relevantes.',
    alertas: ['Rotación del director financiero en agosto de 2025 (Chris Davies dimite por motivos no relacionados con la empresa; Wilson Ng, interino y después titular) [1].', 'Venta de 1,7 M GBP del consejero delegado en enero de 2026, tras ventas para impuestos en noviembre de 2025 [2].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (DPLM.L, ^FTSE, EXH4.DE) hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/DPLM.L/history/' },
  { id: 2, titulo: 'Diploma PLC: finances (estimaciones FY2026-FY2028 de 16 analistas)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/DIPLOMA-PLC-4001768/finances/' },
  { id: 3, titulo: 'Diploma PLC: consensus (objetivo medio 83,29 GBP, máximo 90, mínimo 70, 16 analistas, «Buy»)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/DIPLOMA-PLC-4001768/consensus/' },
  { id: 4, titulo: 'Diploma (DPLM) statistics (PER, PER adelantado 30,5, beta 0,87, posición corta n.d.)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/lon/DPLM/statistics/' },
  { id: 5, titulo: 'Fastenal (FAST) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/fast/statistics/' },
  { id: 6, titulo: 'W.W. Grainger (GWW) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/gww/statistics/' },
  { id: 7, titulo: 'MSC Industrial Direct (MSM) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/msm/statistics/' },
  { id: 8, titulo: 'Bunzl plc (BNZL) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/lon/BNZL/statistics/' },
  { id: 9, titulo: 'RS Group plc (RS1) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/lon/RS1/statistics/' },
  { id: 10, titulo: 'Halma plc (HLMA) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/lon/HLMA/statistics/' },
  { id: 11, titulo: 'Applied Industrial Technologies (AIT) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ait/statistics/' },
  { id: 12, titulo: 'Tipos de cambio de referencia del euro, 14-oct-2026 (USD 1,1195; GBP 0,84385)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 13, titulo: 'Rendimiento nominal del gilt a 10 años (IUDMNPY), 12-oct-2026: 5,3868 %', editor: 'Bank of England, Statistical Interactive Database', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 14, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 15, titulo: 'Half year results 2026 (deuda neta, acciones, pasivos por compras)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-05-19', url: URL.h126 },
  { id: 16, titulo: 'Full year results 2024 (Peerless: 243,3 M; 7 compras por 293 M a 6 veces el EBIT)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2024-11-19', url: URL.fy24 },
  { id: 17, titulo: 'Preliminary results FY2023 (DICSA y T.I.E. a 9 veces el EBIT)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2023-11-20', url: URL.fy23 },
  { id: 18, titulo: 'Preliminary results FY2025 (seis compras por 92 M a 8 veces)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2025-11-18', url: URL.fy25 },
  { id: 19, titulo: 'Preliminary results FY2022 (bolt-ons a 5 veces)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2022-11-15', url: URL.fy22 },
  { id: 20, titulo: 'Q3 Trading Update 2026: transcripción (CDM, 170 M USD)', editor: 'Diploma PLC / BRR Media', tipo: 'Primaria', fecha: '2026-07-16', url: URL.q3tr },
  { id: 21, titulo: 'Preliminary results FY2020 y FY2021 (BPA FY2019-FY2021)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2021-11-16', url: URL.fy21 },
  { id: 22, titulo: 'Q3 trading update: Strong Q3. Further 7 % FY upgrade (consenso de 454 M a 15-jul)', editor: 'Diploma PLC', tipo: 'Primaria', fecha: '2026-07-16', url: URL.q326 },
];
const ci = bolsa.identificacion;
const conv = (usdM) => Math.round(usdM / USD_GBP);
const D = {
  _estado: 'Completo.',
  identificacion: {
    nombre: 'Diploma PLC', nombre_corto: 'Diploma', ticker: 'DPLM', isin: 'GB0001826634', mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Industria', industria: 'Distribuidores de comercio', sede: 'Londres', fundacion: '1931', empleados: 3400, web: 'www.diplomaplc.com',
    precio: ci.precio / 100, fecha_precio: ci.fecha_precio, acciones: 134.8, capitalizacion_publicada: 10630, free_float_pct: 99.3,
    max_52s: ci.max_52s / 100, min_52s: ci.min_52s / 100, volumen_medio_diario: '≈ 51 M GBP/día (695.000 acciones, 3 meses)', proximos_resultados: '2026-11-17',
  },
  consenso: {
    guidance: 'Guía de FY2026 (año cerrado el 30-sep-2026, resultados el 17-nov-2026), subida tres veces: orgánico del 14 % (6 % en noviembre de 2025), compras +6 % y margen operativo ajustado de c. 26,5 % (22,5 % en noviembre), lo que da un crecimiento del resultado operativo ajustado de c. 42 % a tipo constante, un 7 % por encima del consenso de 454 M de julio [22]. Para FY2027 la dirección no guía todavía: espera volver «hacia el modelo financiero» (orgánico del 5 %, compras del 5 %, margen ≥ 20 %, BPA de dos dígitos), con el margen bajando algo por Peerless, inversiones y compras dilutivas, «más o menos donde está el consenso» [20].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 1824, ebitda: 511, ebit: 480.9, bpa: 2.179, dpa: 0.6525, fuente: 'MarketScreener, 16 analistas [2]' },
      { periodo: 'FY2027e', ingresos: 2001, ebitda: 532.5, ebit: 500.7, bpa: 2.367, dpa: 0.6867, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2028e', ingresos: 2124, ebitda: 557, ebit: 522.9, bpa: 2.515, dpa: 0.7182, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 16, comprar: null, mantener: null, vender: null, po_medio: 83.29, po_min: 70.0, po_max: 90.0 },
    revisiones: 'Las estimaciones han subido con cada actualización: el consenso de resultado operativo ajustado de FY2026 era de 377 M el 17-mar, 428 M el 18-may y 454 M el 15-jul; la guía de julio implica c. 486 M a tipo constante [15, 20]. El consenso de MarketScreener ya da 480,9 M para FY2026 y 500,7 M para FY2027 (+4 %) [2]: el mercado espera que el margen baje en FY2027. El EBIT del consenso es el ajustado (antes de la amortización de lo comprado) y el BPA mezcla criterios: 2,179 GBP en FY2026 frente a un BPA ajustado de unos 2,5 GBP; solo hay una fuente con estimaciones completas; el objetivo se contrasta con el PER adelantado de Stock Analysis (30,5 veces) [2, 4].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.8,
  },
  bolsa: {
    ...bolsa.bolsa, beta: bolsa.betas.mensual_5a, posicion_corta_pct: null,
    comentario: 'La acción sube un 49,8 % en 2026 y un 49,1 % en 12 meses frente al 8,0 % y el 13,5 % del FTSE 100: tres subidas de la guía (marzo, mayo y julio) y un 15 % de crecimiento orgánico [1]. En tres años anualiza un 39,7 % y en diez un 23,8 %, frente al 4,3 % del índice. La peor caída de cinco años fue del 37,6 % (nov-21 a jun-22), con la subida de tipos que castigó a los compuestos de múltiplo alto. El mínimo de 52 semanas fue de 49,70 GBP el 17-mar-2026, la víspera de la primera subida de la guía; el máximo, 79,80 el 6-oct [1]. Beta mensual de 5 años de 1,09 frente al FTSE 100; semanal de 2 años, 0,76.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2021', precio_cierre: 28.42, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2022', precio_cierre: 23.24, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: 30.04, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: 44.34, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 53.05, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Distribuidores industriales cotizados de Norteamérica y Reino Unido (Grainger, Fastenal, MSC, Applied Industrial, RS Group y Bunzl) más Halma, el otro compuesto británico de nichos con margen alto y compras pequeñas. Würth no cotiza. Ninguno replica el modelo de Diploma: los distribuidores generalistas tienen márgenes menores y Halma fabrica. Cifras de Stock Analysis del 14-oct-2026 (mismo proveedor y fecha para todos), pasadas a GBP con el BCE [5-12]. El PER adelantado es el de consenso ajustado de cada empresa; el crecimiento esperado no está disponible en la misma fuente y se deja vacío.',
    empresas: [
      { nombre: 'Fastenal', ticker: 'FAST', pais: 'US', capitalizacion: conv(59790), ev_ventas: 6.53, ev_ebitda_ltm: 29.0, ev_ebitda_ntm: null, per_ntm: 37.4, crecimiento_pct: null, margen_ebitda_pct: 22.5, roic_pct: 32.6, dn_ebitda: -0.1, fcf_yield_pct: 2.0 },
      { nombre: 'W.W. Grainger', ticker: 'GWW', pais: 'US', capitalizacion: conv(62100), ev_ventas: 3.37, ev_ebitda_ltm: 19.8, ev_ebitda_ntm: null, per_ntm: 27.4, crecimiento_pct: null, margen_ebitda_pct: 17.1, roic_pct: 33.2, dn_ebitda: 0.6, fcf_yield_pct: 2.5 },
      { nombre: 'MSC Industrial Direct', ticker: 'MSM', pais: 'US', capitalizacion: conv(7390), ev_ventas: 2.01, ev_ebitda_ltm: 17.7, ev_ebitda_ntm: null, per_ntm: 24.7, crecimiento_pct: null, margen_ebitda_pct: 11.4, roic_pct: 13.6, dn_ebitda: 1.1, fcf_yield_pct: 3.0 },
      { nombre: 'Applied Industrial Technologies', ticker: 'AIT', pais: 'US', capitalizacion: conv(12270), ev_ventas: 2.56, ev_ebitda_ltm: 20.7, ev_ebitda_ntm: null, per_ntm: 27.8, crecimiento_pct: null, margen_ebitda_pct: 12.4, roic_pct: 19.6, dn_ebitda: 0.5, fcf_yield_pct: 3.7 },
      { nombre: 'RS Group', ticker: 'RS1', pais: 'GB', capitalizacion: 3670, ev_ventas: 1.37, ev_ebitda_ltm: 13.8, ev_ebitda_ntm: null, per_ntm: 18.8, crecimiento_pct: null, margen_ebitda_pct: 9.3, roic_pct: 9.7, dn_ebitda: 1.2, fcf_yield_pct: 6.8 },
      { nombre: 'Bunzl', ticker: 'BNZL', pais: 'GB', capitalizacion: 8940, ev_ventas: 0.92, ev_ebitda_ltm: 9.3, ev_ebitda_ntm: null, per_ntm: 14.6, crecimiento_pct: null, margen_ebitda_pct: 8.2, roic_pct: 11.7, dn_ebitda: 2.1, fcf_yield_pct: 10.6 },
      { nombre: 'Halma', ticker: 'HLMA', pais: 'GB', capitalizacion: 13140, ev_ventas: 5.37, ev_ebitda_ltm: 21.3, ev_ebitda_ntm: null, per_ntm: 25.8, crecimiento_pct: null, margen_ebitda_pct: 24.1, roic_pct: 13.7, dn_ebitda: 1.2, fcf_yield_pct: 3.3 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-03', objetivo: 'Peerless Aerospace Fastener (sujeciones aeroespaciales, EE. UU.)', comprador: 'Diploma', ev: 243.3, ev_ventas: null, ev_ebitda: 7.0, prima_pct: null, excluir: false, comentario: 'Múltiplo publicado: 7 veces el EBIT de FY2024 [16]; con amortización operativa mínima, ≈ EV/EBITDA.' },
      { fecha: '2023-07', objetivo: 'DICSA (fluidos, España) y T.I.E. (automatización, EE. UU.)', comprador: 'Diploma', ev: 246.0, ev_ventas: null, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: '9 veces el EBIT conjunto publicado [17].' },
      { fecha: '2024-09', objetivo: 'Siete compras de FY2024 (Peerless, PAR y cinco bolt-ons)', comprador: 'Diploma', ev: 293.0, ev_ventas: null, ev_ebitda: 6.0, prima_pct: null, excluir: true, comentario: 'Media de 6 veces el EBIT [16]; incluye Peerless (no se cuenta dos veces).' },
      { fecha: '2025-11', objetivo: 'Seis compras desde el 4T de FY2025', comprador: 'Diploma', ev: 92.0, ev_ventas: null, ev_ebitda: 8.0, prima_pct: null, excluir: false, comentario: 'Media de 8 veces [18].' },
      { fecha: '2026-05', objetivo: '15 compras en 12 meses (incluida CDM, c. 80 M USD de ventas)', comprador: 'Diploma', ev: 310.0, ev_ventas: null, ev_ebitda: 8.0, prima_pct: null, excluir: false, comentario: 'Media de 8 veces el EBIT; c. 40 M de EBIT anual esperado [15]. CDM costó 170 M USD [20].' },
      { fecha: '2022-11', objetivo: 'Seis bolt-ons del 2S de FY2022', comprador: 'Diploma', ev: 19.0, ev_ventas: null, ev_ebitda: 5.0, prima_pct: null, excluir: false, comentario: 'Media de 5 veces [19].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones de terceros con múltiplo', tipo: 'Complemento', intentos: '1) Notas de compra de RS Group, Bunzl y Applied: sin EV/EBITDA publicado; 2) prensa: múltiplos sin nota oficial; 3) se usan las compras de la propia Diploma con el múltiplo de EBIT que publica.', decision: 'Calculado y marcado como estimación' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de la FCA: sin posiciones netas cortas ≥ 0,5 % publicadas para DPLM en la consulta; 2) Stock Analysis: n.d.; 3) sin otra fuente gratuita.', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stockwatch: further upside in this FTSE 100 growth share?', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-01-16', url: 'https://www.ii.co.uk/analysis-commentary/stockwatch-further-upside-ftse-100-growth-share-ii537832' },
  { id: 2, titulo: 'A FTSE 100 share about to hit record high?', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-08-04', url: 'https://www.ii.co.uk/analysis-commentary/ftse-100-share-about-hit-record-high-ii539879' },
  { id: 3, titulo: 'FTSE 100 shares round-up: more upgrades plus a takeover trigger (16-jul-2026)', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-07-16', url: 'https://www.ii.co.uk/analysis-commentary/ftse-100-shares-round-more-upgrades-plus-takeover-trigger-ii539680' },
  { id: 4, titulo: 'Diploma PLC (DPLM.L) intrinsic value (DCF de 4.405 p a 3-oct-2026)', editor: 'ValueInvesting.io', tipo: 'Foros y redes', fecha: '2026-10-03', url: 'https://valueinvesting.io/DPLM.L/valuation/intrinsic-value' },
  { id: 5, titulo: 'Diploma PLC: news and analysis feed (solo transcripciones, sin artículos de opinión en 3 meses)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/DPLMF.xml' },
];
const E = {
  _estado: 'Completo con poco debate: empresa muy seguida por analistas y poco por foros abiertos.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'interactive investor (columna Stockwatch)', fecha: '2026-01', n_comentarios: 0, tono: 'Neutro', resumen: 'Con la acción a 56,70 GBP la consideraba «totalmente valorada» (PER adelantado de unas 28 veces, PEG de 1,8) y recomendaba mantener: dudaba de que un grupo de 7.600 M pueda sostener un BPA del 20 % [1].' },
      { plataforma: 'interactive investor (análisis técnico)', fecha: '2026-08', n_comentarios: 0, tono: 'Positivo', resumen: 'Ve la acción a punto de marcar máximos, con objetivos técnicos de 78-79 GBP, ya alcanzados en octubre [2].' },
      { plataforma: 'interactive investor (resumen de mercado)', fecha: '2026-07', n_comentarios: 0, tono: 'Positivo', resumen: 'Diploma lideró el FTSE 100 el día de la tercera subida de la guía; los brókeres subieron objetivos [3].' },
      { plataforma: 'ValueInvesting.io y Simply Wall St (valoraciones de particulares)', fecha: '2026-10', n_comentarios: 0, tono: 'Negativo', resumen: 'Los modelos DCF automáticos la ven muy por encima de su valor (4.405 p frente a 7.775 p) [4].' },
    ],
    temas: [
      { tema: 'Las subidas de guía y Peerless', postura: 'Alcista', peso: 'Alto', contraste: 'Ciertas: orgánico del 15 % en nueve meses y margen del 26,5 % [3]. Pero la propia dirección dice que FY2027 volverá al modelo y que el margen bajará algo: el entusiasmo extrapola un año excepcional.' },
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Medio', contraste: 'Coincide con nuestro DCF: el precio pide más de lo que da el valor intrínseco; con el BPA estatutario cotiza a unas 38 veces el de FY2027 [1, 4].' },
      { tema: 'Capacidad de seguir componiendo al tamaño actual', postura: 'Dividida', peso: 'Medio', contraste: 'Las compras pequeñas (15 en un año a 8 veces) sostienen el crecimiento, pero cada vez hace falta más para mover 2.000 M de ventas [1].' },
    ],
    lectura: 'El sentimiento es positivo y sigue al precio: la prensa de inversión británica celebra las subidas de guía y el análisis técnico ve máximos, mientras los modelos automáticos de valoración la ven muy cara [2, 3, 4]. No hay euforia de foro (la conversación es escasa y de columnistas), pero el consenso de brókeres es de compra con objetivos que han seguido a la acción. El riesgo que el foro no ve y nosotros sí: que el mercado esté pagando el margen de un año excepcional; ninguna cifra del informe sale de aquí.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas.');
