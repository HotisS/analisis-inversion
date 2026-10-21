// Escribe las notas A-E de Kainos Group (corte 2026-10-21) a partir de los documentos de notas/docs (resultados anuales,
// semestrales, avance de agosto, informes anuales ESEF y RNS), del ESEF de filings.xbrl.org (cuentas-xbrl.json), de bolsa.json,
// de yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026) y de comparables-calc.json. Cada nota cita solo con [n] de su
// propia lista de fuentes. Millones de GBP salvo que se diga otra cosa; BPA y DPA en GBP.
// Ejecutar: node informes/kainos-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const CMP = lee('comparables-calc.json');
const Q4 = 'https://s204.q4cdn.com/951481794/files/doc_news';
const INV = 'https://www.investegate.co.uk/announcement/rns/kainos-group--knos';
const ESEF = (a) => `https://filings.xbrl.org/213800H2PQMIF3OVZY47/${a}-03-31/ESEF/GB/0/213800H2PQMIF3OVZY47-${a}-03-31/reports/213800H2PQMIF3OVZY47-${a}-03-31-T01.xhtml`;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Informe anual FY2026 (ejercicio cerrado el 31-mar-2026), ESEF: cuentas, notas, segmentos, remuneración', editor: 'Kainos Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-06-24', url: ESEF(2026) },
  { id: 2, titulo: 'Resultados anuales FY2026 (nota de prensa con estados completos, segmentos, KPI y conciliación del BAI ajustado)', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2026-05-18', url: `${Q4}/Full-Year-Results-2026.pdf` },
  { id: 3, titulo: 'Resultados anuales FY2025 (estados, reestructuración, segmentos)', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2025-05-19', url: `${Q4}/Full-year-Results-2025.pdf` },
  { id: 4, titulo: 'Resultados semestrales 1S FY2026 (a 30-sep-2025)', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2025-11-10', url: `${Q4}/Interim-results-2025.pdf` },
  { id: 5, titulo: 'Resultados semestrales 1S FY2025 (a 30-sep-2024)', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2024-11-11', url: `${Q4}/Interim-Results-2024.pdf` },
  { id: 6, titulo: 'Informes anuales FY2022, FY2023 y FY2024 (ESEF): cuentas, segmentos e indicadores', editor: 'Kainos Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-06-25', url: ESEF(2024) },
  { id: 7, titulo: 'Series ESEF FY2021-FY2026 extraídas con herramientas/cuentas.mjs (xBRL-JSON)', editor: 'XBRL International (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=213800H2PQMIF3OVZY47' },
  { id: 8, titulo: 'Resultados anuales FY2019 y FY2020 (BPA y cifras de los años anteriores)', editor: 'Kainos Group plc (FCA, National Storage Mechanism)', tipo: 'Primaria', fecha: '2020-06-08', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3604614.html' },
  { id: 9, titulo: 'Avance de resultados del 1S FY2027 (trading update del 18-ago-2026)', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2026-08-18', url: `${Q4}/Trading-Update-2026.pdf` },
  { id: 10, titulo: 'Avance de cierre del ejercicio FY2026 (year-end trading update)', editor: 'Kainos Group plc (RNS)', tipo: 'Primaria', fecha: '2026-04-20', url: `${INV}/year-end-trading-update/9526959` },
];

// Cuenta: ESEF + lo que el XBRL no trae (amortización completa, beneficio neto, acciones diluidas, DPA, no recurrentes).
const extra = {
  FY2021: { amort: 3.09, gg: 68.0, bn: 39.6, acc: 123.4, bpa: 0.321, dpa: 0.282, dpax: 0.067, nr: null },
  FY2022: { amort: 5.08, gg: 94.2, bn: 35.8, acc: 125.3, bpa: 0.285, dpa: 0.222, dpax: 0, nr: null },
  FY2023: { amort: 6.05, gg: 124.2, bn: 41.6, acc: 125.6, bpa: 0.331, dpa: 0.239, dpax: 0, nr: null },
  FY2024: { amort: 8.23, gg: 126.5, bn: 48.7, acc: 126.3, bpa: 0.386, dpa: 0.273, dpax: 0, nr: -2.15 },
  FY2025: { amort: 5.49, gg: 133.4, bn: 35.6, acc: 126.1, bpa: 0.282, dpa: 0.284, dpax: 0, nr: 8.4 },
  FY2026: { amort: 5.87, gg: 144.1, bn: 42.5, acc: 121.1, bpa: 0.351, dpa: 0.296, dpax: 0, nr: null },
};
const r1 = (x) => Math.round(x * 10) / 10;
const cuenta = X.financieros.cuenta.map((c) => {
  const e = extra[c.periodo];
  return {
    periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: e.gg,
    ebitda: r1(c.ebit + e.amort), amortizaciones: e.amort, ebit: c.ebit, resultado_financiero: c.resultado_financiero,
    bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: e.bn, gastos_financieros: c.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: e.nr, bpa: e.bpa, dpa: e.dpa, dpa_extraordinario: e.dpax, acciones_diluidas: e.acc,
  };
});

// Balance: ESEF + caja con depósitos a plazo (la «cash position» de la empresa), ingresos devengados y diferidos, deuda 0.
const cajaDep = { FY2021: 80.9, FY2022: 76.6, FY2023: 108.3, FY2024: 126.0, FY2025: 133.7, FY2026: 89.1 };
const actC = { FY2021: 18.4, FY2022: 39.5, FY2023: 38.8, FY2024: 33.2, FY2025: 22.7, FY2026: 39.5 };
const pasC = { FY2021: 22.0, FY2022: 31.0, FY2023: 37.1, FY2024: 45.0, FY2025: 46.4, FY2026: 60.8 };
const balance = X.balance.historico.map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente,
  pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material,
  existencias: 0, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: actC[b.periodo], pasivos_contrato: pasC[b.periodo],
  caja: cajaDep[b.periodo], deuda_financiera: 0, arrendamientos: b.arrendamientos, patrimonio_neto: r1(b.activo_total - b.pasivo_total),
  minoritarios: 0, reservas: b.reservas,
}));
const desinv = { FY2021: 0, FY2022: 0, FY2023: 0, FY2024: 1.5, FY2025: 6.2, FY2026: 0.1 };
const flujos = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos,
  adquisiciones: f.adquisiciones, desinversiones: desinv[f.periodo], dividendos: f.dividendos, recompras: f.recompras ?? 0,
  emision_acciones: f.emision_acciones, intereses_en_financiacion: f.intereses_en_financiacion,
}));

const A = {
  _estado: 'Completa. Cuentas del ESEF (filings.xbrl.org) comprobadas con las notas de prensa de resultados; semestres de los informes semestrales.',
  financieros: {
    cuenta,
    ltm: null,
    cambios_perimetro: [
      { periodo: 'FY2026', descripcion: 'Davis Pier (consultora canadiense de sector público), consolidada desde sep-2025: 7,9 M en caja + 3,8 M en acciones; 4,6 M de ingresos en seis meses (≈ 1 % del grupo).' },
      { periodo: 'FY2024', descripcion: 'RapidIT y Cloudbera (servicios Workday), compradas en jun-2023 por 22,9 M netos de caja.' },
    ],
    comentario: 'Los ingresos pasaron de 234,7 M GBP en FY2021 a 431,1 M en FY2026 (TCAC 12,9 %), pero con un bache: tras el pico de FY2024 (382,4 M) cayeron en FY2025 (367,2 M, −4 %) por el frenazo del gasto público británico antes de las elecciones y la menor demanda de implantaciones de Workday, y volvieron a crecer un 17 % en FY2026 (Digital Services +23 %, 20 % orgánico) [2, 3]. El margen EBITDA contable (EBIT + toda la amortización, incluida la de derechos de uso) ha bajado de un 22,8 % en FY2021 (año de covid, con la demanda del NHS) y un 18,0 % en FY2024 a un 13,1 % en FY2025 y un 14,1 % en FY2026 [7, 2]. La caída de FY2026 con más ventas tiene causas concretas: contratistas y subcontratas para dar capacidad (+14,0 M y +15,4 M frente a FY2025), comisión a Workday por el acuerdo de socio (+2,3 M), subida de la Seguridad Social británica (+3,0 M) y bonus más altos (+11,5 M) [2]. No recurrentes: reestructuración de 8,4 M en FY2025 (190 despidos; 6,2 M tras impuestos) y plusvalías de ≈ 2,15 M en FY2024 (venta de inmovilizado y revalorización del inmueble de inversión) [3, 6]. El DPA de FY2021 incluye un extraordinario de 6,7 p.',
    ajustes: 'La empresa publica un BAI ajustado (67,1 M en FY2026) que excluye la remuneración en acciones (5,4 M), la remuneración ligada a compras (2,1 M), la amortización de intangibles comprados (1,3 M) y los costes de compras (0,1 M); su BPA ajustado diluido fue de 41,1 p frente a 35,1 p contable [2]. En este informe se usa el resultado CONTABLE: la remuneración en acciones es un coste recurrente (≈ 1,2 % de las ventas) y se trata como gasto.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S FY24', ingresos: 193.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 37.9, margen_ebitda_pct: 19.6, bpa: 0.175, vs_consenso: null },
      { periodo: '2S FY24', ingresos: 189.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 39.3, margen_ebitda_pct: 20.8, bpa: 0.211, vs_consenso: null },
      { periodo: '1S FY25', ingresos: 183.1, crecimiento_pct: -5.2, crecimiento_organico_pct: null, ebitda: 37.1, margen_ebitda_pct: 20.3, bpa: 0.201, vs_consenso: null },
      { periodo: '2S FY25', ingresos: 184.1, crecimiento_pct: -2.7, crecimiento_organico_pct: null, ebitda: 27.1, margen_ebitda_pct: 14.7, bpa: 0.081, vs_consenso: null },
      { periodo: '1S FY26', ingresos: 196.1, crecimiento_pct: 7.1, crecimiento_organico_pct: null, ebitda: 32.1, margen_ebitda_pct: 16.4, bpa: 0.167, vs_consenso: null },
      { periodo: '2S FY26', ingresos: 235.0, crecimiento_pct: 27.6, crecimiento_organico_pct: null, ebitda: 36.2, margen_ebitda_pct: 15.4, bpa: 0.184, vs_consenso: null },
    ],
    ultima_presentacion: 'Kainos publica por semestres (1S = abr-sep; 2S = oct-mar, calculado como el año menos el semestre). EBITDA AJUSTADO de la empresa (sin remuneración en acciones ni costes de compras); BPA contable diluido. El 2S FY2025 lleva la reestructuración de 8,4 M en el BPA. Avance del 1S FY2027 (18-ago-2026): ingresos y beneficio del año «cómodamente por encima» del consenso de entonces (509 M de ventas y 77 M de BAI ajustado); resultados del semestre el 9-nov-2026 [4, 5, 2, 9].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Sin deuda financiera. Caja y depósitos a plazo de 89,1 M GBP a 31-mar-2026 (82,8 M de caja + 6,2 M de depósitos), tras devolver 55,7 M en recompras y pagar 34,6 M de dividendos en el año. Después del cierre: recompra de 11,6 M (programa terminado el 15-may-2026) y dividendo final de 19,8 p (≈ 23,0 M, ex-dividendo el 1-oct, se paga el 23-oct-2026) [2].',
    rating: 'Sin calificación crediticia (no tiene deuda).',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos (NIIF 16) de 6,1 M. Ingresos diferidos (cobros anticipados de clientes, sobre todo suscripciones de Workday Products) de 60,8 M, frente a 39,5 M de ingresos devengados pendientes de facturar: el circulante comercial es negativo y financia parte de la caja [1, 2].',
    comentario: 'Balance muy sólido y de poco capital: fondo de comercio de 44,3 M (compras de 2022-2025), intangibles de 8,9 M e inmovilizado de 13,1 M (más 3,9 M de un inmueble de inversión), frente a un patrimonio de 100,4 M. El circulante comercial (clientes 55,7 + devengados 39,5 − proveedores y otros 76,5 − diferidos 60,8) es negativo: −42,1 M, un −9,8 % de las ventas. La caja bajó de 133,7 a 89,1 M en FY2026 por las recompras (55,7 M), el dividendo (34,6 M), Davis Pier (7,9 M) y la nueva sede de Belfast (≈ 5,9 M) [1, 2]. La «caja neta» de la empresa incluye los depósitos a plazo y no resta los arrendamientos.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo (57,7 M en FY2026) es estable entre 45 y 69 M desde FY2021; la conversión en caja del beneficio operativo ajustado fue del 99 % (112 % en FY2025). El capex es pequeño (8,0 M en FY2026, inflado por la sede de Belfast; 1,5-5,8 M antes) y no hay I+D capitalizada (18,7 M de I+D, todo a gasto). Intereses cobrados de la caja (3,5 M) en inversión; intereses pagados de arrendamientos en financiación. Desinversiones: 6,2 M en FY2025 por la venta del inmueble de inversión [1, 2, 3]. El flujo libre (operativo − capex − arrendamientos) fue de ≈ 48,5 M en FY2026: con dividendos de 34,6 M y recompras de 55,7 M, la empresa devolvió más de lo que generó y gastó caja.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP',
    anios_auditor: 5,
    opinion: 'Favorable, sin salvedades (FY2026) [1].',
    comentario: 'Cuentas limpias y sencillas: sin deuda, sin capitalización de I+D, con ingresos reconocidos por avance en contratos de precio fijo (la parte con más juicio) y suscripciones de software. La diferencia entre BPA ajustado y contable es moderada (41,1 frente a 35,1 p) y se debe sobre todo a la remuneración en acciones [1, 2].',
    senales: [
      { senal: 'BPA ajustado frente a contable', nivel: 'Baja', comentario: 'Diferencia de 6,0 p (17 %) en FY2026: remuneración en acciones 5,4 M, remuneración ligada a compras 2,1 M, amortización de intangibles comprados 1,3 M [2].' },
      { senal: 'Ingresos devengados (activos de contrato)', nivel: 'Media', comentario: 'Subieron de 22,7 a 39,5 M en FY2026 (del 6 al 9 % de las ventas) con los contratos grandes de sector público y sanidad; es reconocimiento por avance aún sin facturar [1].' },
      { senal: 'Conversión en caja', nivel: 'Baja', comentario: 'Flujo operativo/EBITDA ajustado del 84 % en FY2026 y por encima del 100 % en FY2025; los diferidos (60,8 M) siguen subiendo [2].' },
      { senal: 'Reestructuración no recurrente', nivel: 'Baja', comentario: 'Solo una en seis años (8,4 M en FY2025, 190 despidos); no se repitió en FY2026 [3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en crecimiento orgánico, dividendo progresivo (≈ 2,5 veces de cobertura del BPA ajustado), compras pequeñas que encajen y, si sobra caja, devoluciones extraordinarias. Tres programas de recompra entre nov-2024 y may-2026 (90 M GBP en total); el consejo no tiene planes de lanzar otro [2].',
    adquisiciones: [
      { anio: 'FY2022', objetivo: 'Cloudator, Une y Blackline Group (servicios Workday en Europa y EE. UU.)', importe: 16.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Ampliaron Workday Services en Alemania y EE. UU.; Blackline salió después del negocio de procurement [6].' },
      { anio: 'FY2023', objetivo: 'Planalyse (planificación Workday Adaptive)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; base de la práctica de planificación [6].' },
      { anio: 'FY2024', objetivo: 'RapidIT y Cloudbera (servicios Workday en EE. UU. y Europa)', importe: 22.9, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en Workday Services, cuyos ingresos cayeron en FY2025 [6, 3].' },
      { anio: 'FY2026', objetivo: 'Davis Pier (consultora canadiense de sector público)', importe: 11.7, ev_ebitda: null, financiacion: 'Caja (7,9 M) y acciones (3,8 M)', resultado: '4,6 M de ingresos en seis meses; base de Digital Services en Norteamérica (+127 % en FY2026) [2].' },
    ],
    comentario: 'La asignación de capital es prudente: compras pequeñas y recompras con caja sobrante. Pero las recompras de FY2025-26 (≈ 90 M a 7-9 GBP) dejaron la caja en el mínimo de cinco años justo cuando el negocio necesitaba capacidad (contratistas, sede de Belfast) [2].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Digital Services', descripcion: 'Desarrollo y mantenimiento de servicios digitales a medida para la Administración británica (Home Office, DWP, HMRC, DVLA, DVSA, Departamento de Transporte), la sanidad (NHS England) y, cada vez más, el sector público canadiense; también datos e IA (45,8 M en FY2026).', tipo_resultado: 'EBITDA', historico: [
        { periodo: 'FY2021', ingresos: 161.6, resultado: null }, { periodo: 'FY2022', ingresos: 199.8, resultado: null }, { periodo: 'FY2023', ingresos: 224.4, resultado: null },
        { periodo: 'FY2024', ingresos: 213.1, resultado: 61.0 }, { periodo: 'FY2025', ingresos: 197.2, resultado: 50.2 }, { periodo: 'FY2026', ingresos: 241.7, resultado: 55.6 }] },
      { nombre: 'Workday Services', descripcion: 'Implantación, integración y soporte de Workday (RRHH, finanzas y planificación) como socio de servicios desde 2011, con equipos en 17 países (Reino Unido, Irlanda, EE. UU., Canadá, Europa central, Australia).', tipo_resultado: 'EBITDA', historico: [
        { periodo: 'FY2021', ingresos: 48.9, resultado: null }, { periodo: 'FY2022', ingresos: 70.9, resultado: null }, { periodo: 'FY2023', ingresos: 105.7, resultado: null },
        { periodo: 'FY2024', ingresos: 112.0, resultado: 25.4 }, { periodo: 'FY2025', ingresos: 98.7, resultado: 17.6 }, { periodo: 'FY2026', ingresos: 107.6, resultado: 12.8 }] },
      { nombre: 'Workday Products', descripcion: 'Software propio para clientes de Workday en suscripción: Kainos Smart (pruebas automatizadas), auditoría, gestión documental y el analizador de transparencia salarial que vende la propia Workday; ARR de 89,0 M y casi 700 clientes.', tipo_resultado: 'EBITDA', historico: [
        { periodo: 'FY2021', ingresos: 24.2, resultado: null }, { periodo: 'FY2022', ingresos: 31.9, resultado: null }, { periodo: 'FY2023', ingresos: 44.7, resultado: null },
        { periodo: 'FY2024', ingresos: 57.3, resultado: 15.9 }, { periodo: 'FY2025', ingresos: 71.3, resultado: 19.5 }, { periodo: 'FY2026', ingresos: 81.7, resultado: 23.6 }] },
    ],
    geografias: [
      { nombre: 'Reino Unido', peso_pct: 56.5 }, { nombre: 'Estados Unidos', peso_pct: 26.1 }, { nombre: 'Europa central', peso_pct: 7.9 },
      { nombre: 'Canadá', peso_pct: 5.8 }, { nombre: 'Irlanda', peso_pct: 2.4 }, { nombre: 'Resto', peso_pct: 1.3 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos (bookings)', valor_anterior: '382,4 M', valor_actual: '505,3 M', variacion: '+32 %', comentario: 'Digital Services 261,3 M (+29 %) con contratos grandes del Home Office, Transporte, DVSA y NHS England [2].' },
      { kpi: 'Cartera contratada', valor_anterior: '368,2 M', valor_actual: '433,9 M', variacion: '+18 %', comentario: '≈ 1 año de ventas [2].' },
      { kpi: 'ARR de Workday Products', valor_anterior: '72,6 M', valor_actual: '89,0 M', variacion: '+23 %', comentario: 'Retención de ingresos del 90 % (93 % en FY2025); 696 clientes [2].' },
      { kpi: 'Plantilla y contratistas', valor_anterior: '2.865', valor_actual: '3.475', variacion: '+21 %', comentario: 'Contratistas de 69 a 259: capacidad cara que la empresa quiere sustituir por empleados en FY2027 [2].' },
      { kpi: 'NPS de clientes', valor_anterior: '70', valor_actual: '61', variacion: '−9 puntos', comentario: 'Primer descenso relevante; coincide con el uso de contratistas [2].' },
      { kpi: 'Ingresos de IA y datos', valor_anterior: '41,1 M', valor_actual: '45,8 M', variacion: '+11 %', comentario: '19 % de Digital Services (21 % en FY2025): crecen menos que la división [2].' },
    ],
    clientes: 'Por sector, el 35 % de los ingresos es sector público, el 18 % sanidad (casi todo NHS) y el 47 % sector comercial (sobre todo clientes de Workday); el 86 % de los ingresos viene de clientes existentes. Por región, Reino Unido e Irlanda el 59 %, Norteamérica el 32 % y Europa central el 8 % [2]. La empresa no publica el peso de su mayor cliente.',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, negocio
const fB = [
  { id: 1, titulo: 'Resultados anuales FY2026: mercados, estrategia, socios y competencia', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2026-05-18', url: `${Q4}/Full-Year-Results-2026.pdf` },
  { id: 2, titulo: 'State of digital government review (gasto tecnológico del sector público británico)', editor: 'UK Government, Department for Science, Innovation and Technology (GDS)', tipo: 'Oficial', fecha: '2025-01-21', url: 'https://www.gov.uk/government/publications/state-of-digital-government-review/state-of-digital-government-review' },
  { id: 3, titulo: 'Workday: resultados del 4T y del ejercicio FY2026 y guía de FY2027', editor: 'Workday, Inc.', tipo: 'Primaria', fecha: '2026-02-24', url: 'https://investor.workday.com/files/doc_earnings/2026/q4/Earnings-Release-Q4FY26-022426_FOR-UPLOAD.pdf' },
  { id: 4, titulo: 'Comparables cotizados de servicios TI (Yahoo Finance quoteSummary, 21-oct-2026; cálculo propio en notas/comparables-calc.json)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/ACN/' },
  { id: 5, titulo: 'Informe anual FY2026 (ESEF): riesgos principales, IA responsable, sostenibilidad', editor: 'Kainos Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-06-24', url: ESEF(2026) },
  { id: 6, titulo: 'ii view: shares for UK tech company Kainos soar (avance del 18-ago-2026)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-08-18', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-shares-uk-tech-company-kainos-soar-ii540010' },
];
const compB = [
  { nombre: 'Accenture', pais: 'Irlanda/EE. UU.', ticker: 'ACN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor socio de Workday del mundo y gran proveedor del Gobierno británico; EV/EBITDA 10,7x y PER 16,3x [4].' },
  { nombre: 'Capgemini', pais: 'Francia', ticker: 'CAP.PA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gran proveedor del sector público británico (HMRC, DWP); PER 9,0x [4].' },
  { nombre: 'CGI', pais: 'Canadá', ticker: 'GIB', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integrador de Administración en Reino Unido y Canadá, donde Kainos crece; PER 11,4x [4].' },
  { nombre: 'Sopra Steria', pais: 'Francia', ticker: 'SOP.PA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Socio de servicios compartidos del Gobierno británico y del NHS; PER 9,1x [4].' },
  { nombre: 'TPXimpact', pais: 'Reino Unido', ticker: 'TPX.L', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Consultora digital de sector público, mucho más pequeña; compite en los mismos contratos del marco Digital Outcomes [1].' },
  { nombre: 'Deloitte, PwC e IBM', pais: 'Varios', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Grandes socios de implantación de Workday; no cotizan o el negocio es una parte pequeña [1].' },
];
const B_ = {
  _estado: 'Completa salvo el tamaño de mercado del perímetro exacto de Kainos (no publicado): se da el gasto tecnológico del sector público británico y el de Workday como referencia.',
  sector: {
    definicion: 'Mercado relevante: servicios de TI (desarrollo de servicios digitales a medida e implantación de software empresarial) para la Administración y la sanidad británicas, y el ecosistema de socios de Workday (implantación y software complementario) en Europa y Norteamérica.',
    tamano: 'El sector público británico gasta más de 26.000 M GBP al año en tecnología, de los que ≈ 14.500 M van a contratistas, gestores de servicios externos y consultores [2]. Workday facturó 9.552 M USD en su ejercicio FY2026 (+13 %), con 8.833 M de suscripciones (+14,5 %) y guía de +12-13 % para FY2027 [3]; el gasto de servicios de implantación del ecosistema no se publica.',
    unidad_serie: null,
    serie: [],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Modernización de sistemas heredados de la Administración y del NHS', efecto: '+', horizonte: 'Estructural', evidencia: 'El Gobierno reconoce que el 28 % de sus sistemas centrales son heredados y que la tecnología pública está por detrás de la privada [2].' },
      { driver: 'Presupuesto público británico (revisiones de gasto, elecciones)', efecto: '±', horizonte: '1-3 años', evidencia: 'El frenazo de 2024 antes de las elecciones bajó las ventas de Digital Services; la revisión de gasto de 2025 priorizó la productividad digital [1, 2].' },
      { driver: 'Crecimiento de Workday', efecto: '+', horizonte: '3-5 años', evidencia: 'Suscripciones +14,5 % en FY2026 y guía de +12-13 %; menos clientes nuevos grandes y más ampliaciones (planificación, finanzas) [3].' },
      { driver: 'IA generativa en el desarrollo de software', efecto: '±', horizonte: '1-5 años', evidencia: 'Abarata el desarrollo por horas (resta) y abre proyectos de IA y datos (suma: 45,8 M en FY2026, +11 %) [1].' },
      { driver: 'Coste laboral británico', efecto: '−', horizonte: '1-2 años', evidencia: 'La subida de la Seguridad Social de abril de 2025 costó 3,0 M a Kainos en FY2026 [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Muchos competidores (grandes integradores, consultoras, pymes del marco Digital Outcomes) y contratos que se licitan.' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'La Administración compra por concurso con marcos de precio; Workday decide qué socios recomienda.' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'El «proveedor» es el talento técnico y Workday, que cobra una comisión a sus socios (≈ 7,8 M en FY2026) [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'La IA generativa y las herramientas de bajo código reducen las horas de desarrollo; Workday puede llevar funciones de pruebas a su producto.' },
      { fuerza: 'Amenaza de entrantes', intensidad: 3, justificacion: 'Hacen falta acreditaciones de seguridad y referencias públicas; en Workday, certificación de socio.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Tras el bache de 2024-25, el gasto digital público británico y la demanda de Workday se han recuperado: pedidos +32 % en FY2026 y avance de agosto por encima del consenso [1, 6].' },
    regulacion: 'Contratación pública británica (Procurement Act 2023, en vigor desde feb-2025), acreditaciones de seguridad de la Administración y del NHS; marco de IA responsable del Gobierno.',
    tendencias: 'La Administración británica quiere menos dependencia de los grandes integradores y más proveedores medianos; la IA entra en casi todos los proyectos. En Workday, el cliente pide más automatización y pruebas, que es el nicho de Workday Products.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Uno de los mayores proveedores medianos de servicios digitales a la Administración británica (7.º proveedor de IA al sector público desde 2018, con 66 M en contratos adjudicados) y uno de los mayores socios de Workday del mundo, con el producto de pruebas automatizadas líder del ecosistema [1].',
    competidores: compB,
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay red de usuarios; las referencias públicas ayudan a ganar contratos [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'El 86 % de los ingresos viene de clientes existentes; los sistemas públicos que construye Kainos los mantiene Kainos; Smart está integrado en el ciclo de actualizaciones de Workday [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Reputación en la Administración y en Workday (NPS 61); acreditaciones de seguridad [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Plantilla en Belfast, Polonia y otros centros más baratos que Londres [1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'En el nicho de pruebas para Workday hay pocos competidores (Tricentis, Opkey) y Kainos tiene ≈ 700 clientes [1].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el foso es la IA generativa, que reduce las horas de desarrollo que Kainos factura y facilita que el cliente o Workday hagan en casa lo que hoy hace Kainos (pruebas, integraciones). Después, la dependencia del presupuesto británico y de la relación con Workday.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Kainos es una consultora informática de Belfast con tres negocios: hace servicios digitales para la Administración británica y el NHS (Digital Services, 56 % de las ventas), implanta el software de RRHH y finanzas de Workday en grandes empresas y organismos (Workday Services, 25 %) y vende su propio software de pruebas y control para clientes de Workday (Workday Products, 19 %) [1].',
    como_gana_dinero: 'Factura sobre todo por horas y por proyecto (tiempo y materiales o precio fijo) con un margen bruto del 36 % en Digital Services y del 46 % en Workday Services, y cobra suscripciones de software con un margen bruto del 78 % en Workday Products. Products da el 19 % de las ventas pero el 26 % de la contribución de las divisiones (23,6 de 92,0 M en FY2026) [1].',
  },
  huecos: [
    { seccion: 'sector', campo: 'Tamaño y serie del mercado de servicios digitales públicos y del ecosistema de servicios de Workday', tipo: 'Complemento', intentos: '1) GDS «State of digital government» (solo el gasto total en tecnología, un año); 2) informes de Workday (no publica el gasto de sus socios); 3) búsqueda de estudios de mercado (de pago)', decision: 'Se da el gasto público total y el crecimiento de Workday como referencia; sin cuota ni serie.' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Directivos y gobierno
const fC = [
  { id: 1, titulo: 'Informe anual FY2026 (ESEF): consejo, informe de remuneración, accionistas significativos', editor: 'Kainos Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-06-24', url: ESEF(2026) },
  { id: 2, titulo: 'Resultados de la junta general de accionistas', editor: 'Kainos Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-22', url: `${INV}/results-of-annual-general-meeting-/9784876` },
  { id: 3, titulo: 'Operaciones de directivos y personas vinculadas: venta de Kerry McCann (1-jul-2026)', editor: 'Kainos Group plc (RNS)', tipo: 'Primaria', fecha: '2026-07-01', url: `${INV}/director-pdmr-shareholding/9647502` },
  { id: 4, titulo: 'Operaciones de directivos (mar-jun 2026: transferencia, ejercicios y concesiones del PSP)', editor: 'Kainos Group plc (RNS)', tipo: 'Primaria', fecha: '2026-06-08', url: `${INV}/notification-of-transactions-of-director-pdmr/9607448` },
  { id: 5, titulo: 'Participaciones significativas: Qubis (8-sep-2026) y Baillie Gifford (7-oct-2026)', editor: 'Kainos Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-07', url: `${INV}/holding-s-in-company/9810997` },
  { id: 6, titulo: 'Cambios en el consejo y sus comisiones', editor: 'Kainos Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-16', url: `${INV}/board-and-board-committee-changes-/9775775` },
  { id: 7, titulo: 'Derechos de voto totales (116.263.722 acciones, 1-oct-2026)', editor: 'Kainos Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: `${INV}/total-voting-rights/9801450` },
  { id: 8, titulo: 'Resultados anuales FY2025 y FY2026 (guía y realidad de cada año)', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2026-05-18', url: `${Q4}/Full-Year-Results-2026.pdf` },
];
const C = {
  _estado: 'Completa. Informe anual FY2026, RNS de junta, consejo, directivos y participaciones hasta el 7-oct-2026.',
  directivos: {
    equipo: [
      { nombre: 'Brendan Mooney', cargo: 'Consejero delegado', desde: '2024', participacion_pct: 9.2, trayectoria: 'Consejero delegado de 2001 a 2023, cuando dejó el cargo a Russell Sloan; volvió el 11-dic-2024 tras la salida de Sloan. Tiene 10,7 M de acciones [1].' },
      { nombre: 'Richard McCann', cargo: 'Director financiero y de operaciones', desde: '2011', participacion_pct: 3.4, trayectoria: 'Director financiero desde 2011 y también de operaciones desde 2023 [1].' },
      { nombre: 'Rosaleen Blair', cargo: 'Presidenta del consejo (no ejecutiva)', desde: '2024', participacion_pct: null, trayectoria: 'Consejera desde 2021 y presidenta desde el 24-sep-2024; fundó Alexander Mann Solutions [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2023', guia: 'Crecimiento de ventas de dos dígitos', real: '+24 % (374,8 M)', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Ventas en línea con el consenso (≈ 400 M) en el avance de 2023', real: '382,4 M', cumplida: 'No' },
      { anio: 'FY2025', guia: 'Rebajada en dos avances (oct-2024 y ene-2025) por el frenazo público y de Workday', real: '367,2 M (−4 %)', cumplida: 'No' },
      { anio: 'FY2026', guia: 'Ventas y BAI ajustado en línea; luego ventas por encima del consenso (406,5 M) y BAI en línea (66,4 M)', real: '431,1 M y 67,1 M', cumplida: 'Sí' },
      { anio: 'FY2027', guia: '«Cómodamente por encima» del consenso de 509 M de ventas y 77 M de BAI ajustado (18-ago-2026)', real: 'Pendiente (1S el 9-nov-2026)', cumplida: 'Pendiente' },
    ],
    comentario: 'Equipo fundador muy alineado (Mooney tiene el 9 % y McCann el 3 %), con una etapa fallida de sucesión (Russell Sloan, 2023-24) que terminó con la vuelta de Mooney. La guía se incumplió en FY2024-25, cuando el mercado se frenó, y se ha cumplido o superado desde FY2026 [1, 8].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Rosaleen Blair', cargo: 'Presidenta', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos' },
      { nombre: 'Brendan Mooney', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2001', comisiones: null },
      { nombre: 'Richard McCann', cargo: 'Director financiero y de operaciones', tipo: 'Ejecutivo', desde: '2011', comisiones: null },
      { nombre: 'James Kidd', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Shruthi Chindalur', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración (presidenta en funciones)' },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: true,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: true,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: false,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 2,
    voto_remuneracion_pct: 98.6,
    voto_remuneracion_contra_pct: 1.4,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 0.443, fijo: 0.239, variable_corto: 0.191, variable_largo: 0.011, ratio_salario_medio: 6.3 },
    remuneracion: 'El consejero delegado cobró 443 miles de GBP en FY2026 (fijo 239, bonus 191, largo plazo 11), muy por debajo del mercado: Mooney es accionista fundador. El director financiero cobró 518 miles. Bonus por ingresos (30 %), BAI ajustado (40 %) y pedidos (30 %), con un máximo del 150 % del salario; plan de acciones (PSP) por crecimiento del BPA (50 %), rentabilidad frente al techMARK (30 %) y objetivos ESG (20 %), con malus y clawback no usados. La junta del 22-sep-2026 aprobó el informe con el 98,6 % [1, 2].',
    accionistas: [
      { nombre: 'Brendan Mooney (consejero delegado)', pct: 9.1, tipo: 'Directivo', variacion: 'Estable' },
      { nombre: 'Qubis Ltd (Queen\'s University Belfast)', pct: 8.7, tipo: 'Institucional', variacion: 'De 9,34 % a 8,67 % (3-sep-2026)' },
      { nombre: 'Paul Gannon (fundador)', pct: 5.2, tipo: 'Particular', variacion: null },
      { nombre: 'Liontrust', pct: 5.0, tipo: 'Institucional', variacion: 'Bajó de 5 % (11-mar-2026)' },
      { nombre: 'Baillie Gifford', pct: 4.5, tipo: 'Institucional', variacion: 'De 6,36 % a 4,50 % (5-oct-2026)' },
      { nombre: 'Brian Gannon', pct: 3.6, tipo: 'Particular', variacion: null },
      { nombre: 'Richard McCann (director financiero)', pct: 3.4, tipo: 'Directivo', variacion: 'Tras la venta de su cónyuge del 1-jul-2026' },
    ],
    insiders: [
      { fecha: '2026-07-01', persona: 'Kerry McCann (cónyuge del director financiero)', operacion: 'Venta', acciones: 760911, importe: 5.93 },
      { fecha: '2026-06-30', persona: 'Directivos (plan SAYE)', operacion: 'Compra', acciones: null, importe: null },
      { fecha: '2026-06-08', persona: 'Richard McCann', operacion: 'Ejercicio de opciones (PSP)', acciones: null, importe: null },
      { fecha: '2026-06-04', persona: 'Brendan Mooney y Richard McCann', operacion: 'Concesión de acciones (PSP)', acciones: null, importe: null },
      { fecha: '2026-03-13', persona: 'Brendan Mooney', operacion: 'Ejercicio de opciones (PSP)', acciones: null, importe: null },
      { fecha: '2026-03-12', persona: 'Richard McCann', operacion: 'Transferencia a su cónyuge', acciones: null, importe: null },
    ],
    control_y_defensas: 'Sin accionista de control: los fundadores y directivos (Mooney, los Gannon, McCann) y Qubis suman ≈ 30 %. Una acción, un voto; sin blindajes [1].',
    alertas: [
      'Venta de 760.911 acciones (≈ 5,9 M GBP a 7,79 GBP) de la cónyuge del director financiero el 1-jul-2026, siete semanas antes del avance que subió la acción casi un 20 % [3].',
      'Qubis y Baillie Gifford reducen participación en sep-oct 2026, tras la subida [5].',
      'Dos cambios en la cúpula en 24 meses: vuelta de Mooney como consejero delegado (dic-2024) y nueva presidenta (sep-2024); salida de Katie Davis del consejo en la junta de 2026 [1, 6].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado
const k = Y['KNOS.L'];
const fD = [
  { id: 1, titulo: 'Históricos diarios de KNOS.L, FTSE 250 (^FTMC) y sector tecnológico europeo (EXV3.DE): rentabilidades, beta, volatilidad, cierres de ejercicio', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/KNOS.L/history' },
  { id: 2, titulo: 'Consenso de analistas de Kainos: estimaciones FY2027-FY2029, objetivo de precio', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://uk.marketscreener.com/quote/stock/KAINOS-GROUP-PLC-39436248/finances/' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary de KNOS.L y comparables (precio, consenso, revisiones, objetivos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/KNOS.L/analysis' },
  { id: 4, titulo: 'Rendimiento del gilt a 10 años (serie IUDMNPY)', editor: 'Bank of England', tipo: 'Oficial', fecha: '2026-10-16', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 5, titulo: 'Implied ERP by month (prima de riesgo implícita del S&P 500)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Académica', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/' },
  { id: 6, titulo: 'Avance de resultados del 1S FY2027', editor: 'Kainos Group plc', tipo: 'Primaria', fecha: '2026-08-18', url: `${Q4}/Trading-Update-2026.pdf` },
  { id: 7, titulo: 'ii view: shares for UK tech company Kainos soar', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-08-18', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-shares-uk-tech-company-kainos-soar-ii540010' },
  { id: 8, titulo: 'ii view: NHS and AI boost tech firm Kainos (resultados FY2026)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-05-18', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-nhs-and-ai-boost-tech-firm-kainos-ii539087' },
  { id: 9, titulo: 'Kainos: estimaciones y objetivos de S&P Global (BPA ajustado, 10 analistas)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://stockanalysis.com/quote/lon/KNOS/forecast/' },
  { id: 10, titulo: 'Kalkine: Kainos share price outlook, Workday y la IA (caída de febrero de 2026 por la venta de software)', editor: 'Kalkine Media', tipo: 'Prensa', fecha: '2026-02-05', url: 'https://kalkine.co.uk/news/technology/kainos-share-price-outlook-workday-ai-momentum-puts-knos-in-focus' },
  { id: 11, titulo: 'Sopra Steria: oferta por Ordina (documento de la oferta, AMF)', editor: 'AMF / Sopra Steria', tipo: 'Primaria', fecha: '2023-03-21', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/BWR/2023/03/FCBWR148382_20230321.pdf' },
  { id: 12, titulo: 'Capgemini compra WNS por 3.300 M USD', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2025-07-07', url: 'https://in.marketscreener.com/quote/stock/CAPGEMINI-SE-4624/news/Capgemini-Acquires-WNS-for-3-3-Billion-50443652/' },
  { id: 13, titulo: 'RNS de Kainos de 2026 (participaciones, directivos, junta, derechos de voto)', editor: 'Kainos Group plc (Investegate)', tipo: 'Primaria', fecha: '2026-10-07', url: `${INV}/holding-s-in-company/9810997` },
];
const serieCierres = { FY2021: 1492, FY2022: 1323, FY2023: 1382, FY2024: 965.5, FY2025: 664, FY2026: 730 };
const D = {
  _estado: 'Completa. Precio de cierre del 21-oct-2026 (1.320 GBp); bolsa.json con cierre del 20-oct (1.287 GBp) para las rentabilidades y la beta.',
  _per_mediana_comparables: 11.15,
  identificacion: {
    nombre: 'Kainos Group plc', nombre_corto: 'Kainos', ticker: 'KNOS', isin: 'GB00BZ0D6727', mercado: 'Bolsa de Londres (LSE, segmento principal)',
    indice_referencia: 'FTSE 250', pais: 'Reino Unido', pais_iso: 'GB', sector: 'Tecnología', industria: 'Servicios de TI y software',
    sede: 'Belfast (Irlanda del Norte)', fundacion: '1986', empleados: 3475, web: 'https://www.kainos.com',
    precio: 13.20, fecha_precio: '2026-10-21', acciones: 116.26, capitalizacion_publicada: 1535, free_float_pct: 76,
    max_52s: 13.24, min_52s: 6.86, volumen_medio_diario: '≈ 5,1 M GBP/día (3 meses)', proximos_resultados: '2026-11-09',
  },
  consenso: {
    guidance: 'Avance del 18-ago-2026: ingresos y beneficio de FY2027 (a 31-mar-2027) «cómodamente por encima» del consenso de entonces (509,3 M de ventas y 77,1 M de BAI ajustado); mejora de margen en el 2S cuando se sustituyan contratistas. Resultados del 1S el 9-nov-2026 [6].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 541.0, ebitda: 85.5, ebit: 78.9, bpa: 0.464, dpa: 0.317, fuente: 'MarketScreener, 11 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 585.1, ebitda: 94.5, ebit: 87.5, bpa: 0.537, dpa: 0.339, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 648.7, ebitda: 107.1, ebit: 98.9, bpa: 0.605, dpa: 0.353, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 9, mantener: 2, vender: 0, po_medio: 12.73, po_min: 10.65, po_max: 15.0 },
    revisiones: `El BPA ajustado de FY2027 de Yahoo subió de ${k?.trend?.find?.((t) => t.periodo === '0y')?.bpa_hace90 ?? 0.484} GBP hace 90 días a 0,525 tras el avance de agosto; Berenberg subió su objetivo de 1.185 a 1.330 p y Stifel de 1.282 a 1.395 p [3, 7]. El BPA de MarketScreener (0,464 en FY2027) está en una base cercana a la contable; el de Yahoo y S&P (0,52) es el ajustado de la empresa [2, 3, 9].`,
    base_ebitda: 'ajustado',
    ajuste_ebitda_pct_ventas: 1.8,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: B.bolsa.rentabilidades,
    anual: B.bolsa.anual,
    beta: 1.23,
    volatilidad_pct: 41.9,
    max_drawdown_pct: -71.5,
    tramo_drawdown: B.bolsa.tramo_drawdown,
    posicion_corta_pct: null,
    comentario: 'La acción cayó un 71,5 % desde el máximo de nov-2021 (más de 25 GBP) hasta abr-2025, con la caída de márgenes y de ventas, y ha recuperado con fuerza: +87,8 % desde el mínimo de feb-2026 (6,86 GBP) y +64 % en tres meses tras el avance de agosto. Está en máximos de 52 semanas y aún un 37 % por debajo del máximo de cinco años. Beta mensual de 5 años frente al FTSE 250 de 1,23 (ajustada 1,15; semanal de 2 años 1,18); volatilidad del 42 % [1].',
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: Object.entries(serieCierres).map(([a, p]) => ({ anio: a, precio_cierre: p / 100, ev_ebitda_ntm: null, per_ntm: null, excluir: a === 'FY2021' })),
    comentario: 'Precio de cierre de cada ejercicio (31 de marzo) de Yahoo, en GBP [1]. El PER adelantado (precio ÷ BPA contable del ejercicio siguiente) se calcula en la valoración; el cierre de FY2021 (14,92 GBP, 52x) es de la burbuja de 2021 y se excluye.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Servicios de TI cotizados que compiten con Kainos en la Administración británica, en la implantación de Workday o en ingeniería digital: Accenture, Capgemini, CGI, Sopra Steria, EPAM, Cognizant, Globant, Reply, Nagarro y Netcompany. Fuera: Endava (empresa en apuros, PER 2,5x) y TPXimpact (demasiado pequeña). Ninguno tiene la mezcla de Kainos (≈ 19 % de software propio en suscripción).',
    empresas: CMP,
    comentario: 'La mediana del PER de los próximos 12 meses de los comparables es de 11,2x y la de EV/EBITDA de 8,3x: el sector cotiza en mínimos de una década por el miedo a la IA. Kainos cotiza a ≈ 25x su BPA contable de los próximos 12 meses (≈ 22x el ajustado): más del doble que el sector. Lo justifican en parte la caja neta, Workday Products (margen bruto del 78 %) y un crecimiento previsto mayor (+25 % en FY2027 con compras y contratos nuevos), pero la prima es grande [3, 4].',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-07', objetivo: 'WNS (externalización de procesos y TI)', comprador: 'Capgemini', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 17, excluir: true, comentario: '3.300 M USD; prima del 17 % sobre el último cierre; negocio de externalización, no comparable [12].' },
      { fecha: '2023-03', objetivo: 'Ordina (servicios TI en Países Bajos)', comprador: 'Sopra Steria', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 36, excluir: false, comentario: '518 M EUR por el capital con 429 M de ventas (≈ 1,2x las ventas); prima del 36 % [11].' },
    ],
    comentario: 'Hay pocas transacciones con múltiplos publicados en el nicho de Kainos: las compras de socios de Workday (Alight a Wipro en 2019, Cognizant a Collaborative Solutions y Accenture a Sierra-Cedar en 2020) no publicaron cifras completas; Valtech compró Kin + Carta en 2024 por 239 M GBP con 195,9 M de ventas (≈ 1,2x). Las primas de control del sector rondan el 17-36 %. No se usan en la valoración (peso 0).',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la FCA (solo ≥ 0,5 %; Kainos no aparece); 2) Yahoo (sin dato para Londres); 3) búsqueda web', decision: 'Omitido: ninguna posición corta pública ≥ 0,5 %.' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'ii view: shares for UK tech company Kainos soar', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-08-18', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-shares-uk-tech-company-kainos-soar-ii540010' },
  { id: 2, titulo: 'ii view: NHS and AI boost tech firm Kainos', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-05-18', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-nhs-and-ai-boost-tech-firm-kainos-ii539087' },
  { id: 3, titulo: 'ii view: orders growing but higher costs affect Kainos profit', editor: 'interactive investor', tipo: 'Prensa', fecha: '2025-11-10', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-orders-growing-higher-costs-affect-kainos-profit-ii537185' },
  { id: 4, titulo: 'Kalkine: Kainos share price outlook (Workday, IA)', editor: 'Kalkine Media', tipo: 'Prensa', fecha: '2026-02-05', url: 'https://kalkine.co.uk/news/technology/kainos-share-price-outlook-workday-ai-momentum-puts-knos-in-focus' },
  { id: 5, titulo: 'Seeking Alpha, artículos sobre Kainos (KNNNF)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2025-05-20', url: 'https://seekingalpha.com/api/sa/combined/KNNNF.xml' },
];
const E = {
  _estado: 'Completa con fuentes escasas: no hay flujo de Stocktwits de Kainos (0 mensajes); se usan los comentarios de interactive investor, Kalkine y Seeking Alpha.',
  sentimiento: {
    tono: 'Positivo',
    tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'interactive investor (ii view)', fecha: '2026-08', n_comentarios: 3, tono: 'Positivo', resumen: 'Tras el avance de agosto: demanda sólida, clientes y regiones diversificados, IA como motor; riesgos citados: IA, dependencia de Workday y que la acción «no es barata» [1, 2, 3].' },
      { plataforma: 'Kalkine Media', fecha: '2026-02', n_comentarios: 4, tono: 'Neutro', resumen: 'La caída de febrero se atribuye a la venta de software por las herramientas de IA (Claude Cowork) y deja el PER adelantado en mínimos de una década (≈ 14,8x) [4].' },
      { plataforma: 'Seeking Alpha (KNNNF)', fecha: '2025-05', n_comentarios: 2, tono: 'Neutro', resumen: 'Artículos de 2025 con la tesis de recuperación tras el bache; ninguno reciente [5].' },
    ],
    temas: [
      { tema: 'La IA como motor de demanda', postura: 'Alcista', peso: 'Alto', contraste: 'Parcial: los ingresos de IA y datos crecieron un 11 % (45,8 M), menos que Digital Services (+23 %); el avance de agosto cita la demanda de proyectos de IA [1].' },
      { tema: 'La IA abarata el desarrollo por horas', postura: 'Bajista', peso: 'Alto', contraste: 'Riesgo real y central: más de la mitad de las ventas son horas de desarrollo e implantación; aún no se ve en los precios ni en los pedidos (+32 %) [4].' },
      { tema: 'Recuperación de márgenes', postura: 'Alcista', peso: 'Medio', contraste: 'La empresa la promete para el 2S FY2027 al sustituir contratistas; el margen EBITDA ajustado del 2S FY2026 (15,4 %) aún estaba lejos del 20 % de FY2024 [2, 3].' },
      { tema: 'Valoración exigente tras la subida', postura: 'Bajista', peso: 'Medio', contraste: 'Correcto: ≈ 25x el BPA contable de los próximos 12 meses frente a 11x del sector [1].' },
    ],
    lectura: 'El sentimiento ha pasado de miedo (febrero, venta de software por la IA) a entusiasmo (agosto, avance por encima del consenso). Los particulares británicos ven a Kainos como ganadora de la IA; la prensa recuerda que la acción ya no es barata. Pocas fuentes y ningún foro activo: confianza media.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sentimiento', campo: 'Foros de particulares (Stocktwits, LSE Chat)', tipo: 'Complemento', intentos: '1) Stocktwits (0 mensajes de KNOS/KNNNF); 2) LSE Chat (403); 3) Motley Fool UK (sin artículos recientes que abran)', decision: 'Se usa prensa de inversión para particulares (ii, Kalkine).' },
  ],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas');
