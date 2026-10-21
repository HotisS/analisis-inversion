// Escribe las notas A-E de Qt Group (corte 2026-10-21) a partir de los documentos de notas/docs (informe anual 2025,
// semestral 2026, comunicados de MFN/Cision), del XBRL ESEF (cuentas-xbrl.json), de bolsa.json (cierre del 21-oct-2026) y de
// yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026, 15:3x UTC, tras el cierre). Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/qt-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const QT = 'https://www.qt.io/hubfs/_website/QtV2/QtV2%20Investors';
const MFN = 'https://www.mfn.se/a/qt-group';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Qt Group Annual Report 2025 (informe del consejo, cuentas consolidadas NIIF, notas, auditoría, gobierno, remuneración)', editor: 'Qt Group Plc', tipo: 'Primaria', fecha: '2026-03-12', url: `${QT}/2025/Qt_AnnualReport_2025-EN.pdf` },
  { id: 2, titulo: 'Cuentas ESEF (xBRL) de Qt Group 2021-2025, LEI 743700GO2XU2ZYYDKW67 (herramienta cuentas.mjs)', editor: 'filings.xbrl.org (ESEF)', tipo: 'Primaria', fecha: '2026-03-12', url: 'https://filings.xbrl.org/' },
  { id: 3, titulo: 'Qt Group Plc Half-Year Report January-June 2026 (trimestre, ARR, deuda, guía 2026, IA y modelo de precios)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://storage.mfn.se/5033faae-f2e0-45c9-b571-f12b9c3666a7/2026-q2-en-final.pdf' },
  { id: 4, titulo: 'Qt Group Plc Interim Statement January-March 2026', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-05-13', url: `${MFN}/qt-group-plc-interim-statement-january-march-2026` },
  { id: 5, titulo: 'Qt Group Plc Financial Statements Bulletin January 1 - December 31, 2025 (4T25, guía 2026)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-02-26', url: `${MFN}/qt-group-plc-financial-statements-bulletin-for-january-1-december-31-2025` },
  { id: 6, titulo: 'Qt Group Plc Interim Report January-September 2025 (3T25, compra de IAR)', editor: 'Qt Group Plc (Cision)', tipo: 'Primaria', fecha: '2025-10-30', url: 'https://mb.cision.com/Main/14183/4259113/3753838.pdf' },
  { id: 7, titulo: 'Inside information: profit warning, Qt Group lowers its outlook for 2025', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2025-10-17', url: 'https://mfn.se/cis/a/qt-group/inside-information-profit-warning-qt-group-lowers-its-outlook-for-2025-3e8b1771' },
  { id: 8, titulo: 'Insider information: Qt Group launches operational reorganization to improve efficiency (≥ 20 M EUR de ahorro, hasta 200 puestos)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-04-20', url: `${MFN}/insider-information-qt-group-launches-operational-reorganization-to-improve-efficiency` },
  { id: 9, titulo: 'Oferta pública de Qt Group por I.A.R. Systems Group AB (folleto: 180 SEK por acción, cifras de IAR 2024)', editor: 'Qt Group Plc (Cision)', tipo: 'Primaria', fecha: '2025-07-04', url: 'https://mb.cision.com/Main/23842/4200295/3566784.pdf' },
  { id: 10, titulo: 'Qt Group Q4 2024, Q4 2023 y Q4 2022 results (presentaciones: guías anuales e historial)', editor: 'Qt Group Plc', tipo: 'Primaria', fecha: '2025-02-13', url: `${QT}/2024/Qt%20Group%20Q4%202024%20results.pdf?hsLang=en` },
];

const anios = ['2020', '2021', '2022', '2023', '2024', '2025'];
// Cuenta por naturaleza [1, 2]: coste_ventas = materiales y servicios; gastos_generales null. 2024-2025 con decimales del
// informe anual [1]; 2020-2023 del ESEF [2]. gastos_financieros = intereses (sin diferencias de cambio) solo donde el informe
// los separa (2024-2025); antes el ESEF da costes financieros con diferencias de cambio, y se dejan en null.
const cuenta = [
  { periodo: '2020', ingresos: 79.5, coste_ventas: 4.48, ebitda: 19.4, amortizaciones: 2.4, ebit: 17.0, resultado_financiero: -0.6, bai: 16.4, impuestos: 3.5, beneficio_neto: 12.8, gastos_financieros: null, bpa: 0.51, acc: 25.1 },
  { periodo: '2021', ingresos: 121.1, coste_ventas: 6.43, ebitda: 33.3, amortizaciones: 4.5, ebit: 28.8, resultado_financiero: 0.5, bai: 29.3, impuestos: 6.9, beneficio_neto: 22.4, gastos_financieros: null, bpa: 0.88, acc: 25.45 },
  { periodo: '2022', ingresos: 155.3, coste_ventas: 6.92, ebitda: 45.3, amortizaciones: 8.4, ebit: 36.9, resultado_financiero: 0.7, bai: 37.6, impuestos: 3.3, beneficio_neto: 34.3, gastos_financieros: null, bpa: 1.36, acc: 25.2 },
  { periodo: '2023', ingresos: 180.7, coste_ventas: 4.54, ebitda: 58.5, amortizaciones: 11.2, ebit: 47.3, resultado_financiero: -2.5, bai: 44.8, impuestos: 9.4, beneficio_neto: 35.5, gastos_financieros: null, bpa: 1.39, acc: 25.5 },
  { periodo: '2024', ingresos: 209.063, coste_ventas: 3.92, ebitda: 74.625, amortizaciones: 11.456, ebit: 63.169, resultado_financiero: 7.189, bai: 70.359, impuestos: 13.045, beneficio_neto: 57.314, gastos_financieros: 0.28, bpa: 2.26, acc: 25.36 },
  { periodo: '2025', ingresos: 216.281, coste_ventas: 5.293, ebitda: 55.844, amortizaciones: 13.307, ebit: 42.537, resultado_financiero: -2.277, bai: 40.26, impuestos: 8.474, beneficio_neto: 31.786, gastos_financieros: 1.131, bpa: 1.25, acc: 25.43 },
].map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: null, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit,
  resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: c.periodo === '2025' ? 5.8 : null, bpa: c.bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: c.acc,
}));
const X = lee('cuentas-xbrl.json');
const deuda = { 2020: 0, 2021: 15.0, 2022: 24.155, 2023: 16.3, 2024: 0, 2025: 134.4 };
const arr = { 2020: null, 2021: 2.0, 2022: 4.0, 2023: 4.2, 2024: 4.3, 2025: 8.8 };
const pcon = { 2020: null, 2021: 13.44, 2022: 10.23, 2023: 12.19, 2024: 14.33, 2025: 31.67 };
const acon = { 2025: 12.4 };
const res = { 2020: 7.5, 2021: 32.7, 2022: 41.0, 2023: 76.8, 2024: 133.0, 2025: 165.3 };
const pat = { 2025: 209.5 };
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const a = b.periodo;
  const o = { ...b, deuda_financiera: deuda[a], arrendamientos: arr[a], pasivos_contrato: pcon[a], activos_contrato: acon[a] ?? b.activos_contrato, minoritarios: 0, reservas: res[a], patrimonio_neto: pat[a] ?? b.patrimonio_neto, existencias: b.existencias ?? 0 };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, desinversiones: 0, dividendos: 0, recompras: f.recompras ?? 0, emision_acciones: 0 };
  delete o.fin; return o;
});
const trim = (p, ing, g, gOrg, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: gOrg, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuentas del ESEF (filings.xbrl.org) comprobadas con el informe anual 2025 y los semestrales y trimestrales de 2025-2026. Cuenta por naturaleza: coste_ventas = materiales y servicios. 2025 lleva 5,8 M EUR de costes de la compra de IAR dentro del EBITDA (no recurrentes). Deuda, arrendamientos, pasivos de contrato y reservas completados a mano con el informe anual (el ESEF no los etiqueta igual). Intereses sin diferencias de cambio solo en 2024-2025.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 231.8, ebitda: 51.0, ebit: 34.0, beneficio_neto: 22.8, bpa: 0.90, dpa: 0, dpa_extraordinario: 0, fcf: 26.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 10.1 },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'I.A.R. Systems Group (compiladores y depuradores para microcontroladores, Suecia) consolidada desde el 17-oct-2025: 8,1 M EUR de ventas en el 4T25 [1]. Oferta de 180 SEK por acción, ≈ 205 M EUR en caja, financiada con un préstamo de 150 M [9, 1]. El LTM a junio de 2026 incluye nueve meses de IAR y la base de 2025 solo dos y medio: el crecimiento de 12 meses mezcla perímetros (la empresa no publica cifras pro forma).' },
      { periodo: '2022', descripcion: 'Axivion (análisis estático de código, Alemania), comprada el 11-ago-2022 por 44,1 M EUR (25,8 en caja, 8,3 en acciones y 10,0 de pago aplazado), con 5,0 M de ventas en 2021 [1, 10].' },
      { periodo: '2021', descripcion: 'froglogic (pruebas automáticas de interfaces, Squish; Alemania) por 37,5 M EUR [10].' },
    ],
    comentario: 'Las ventas pasaron de 79,5 M EUR en 2020 a 216,3 M en 2025 (TCAC del 22,2 %), pero el crecimiento se ha frenado: +15,7 % en 2024 y +3,5 % en 2025 (+6,6 % a tipo constante y solo +2,6 % orgánico a tipo constante) [1]. En los 12 meses a junio de 2026 las ventas fueron de 231,8 M con IAR [3]. El negocio tiene tres fuentes: licencias de desarrollador y consultoría (puestos de programador, cobrados por adelantado; 141,8 M en 2025, −6,8 %), licencias de distribución (regalías por cada dispositivo que el cliente fabrica con Qt; 56,8 M en 2025, +26,4 %, «excepcionalmente altas» según la empresa) y mantenimiento (17,7 M, +48 % por IAR) [1, 3]. El EBITDA (NIIF) subió de 19,4 M en 2020 a 74,6 M en 2024 (35,7 % de las ventas) y cayó a 55,8 M en 2025 (25,8 %; 28,5 % sin los 5,8 M de costes de la compra de IAR) por la falta de crecimiento con una plantilla que se había dimensionado para crecer un 15-25 % [1, 7]. En el primer semestre de 2026 el EBITA cayó a 14,3 M (12,6 %) con 4,3 M de reorganización [3]. Beneficio neto: de 57,3 M (2,26 EUR por acción) en 2024 a 31,8 M (1,25) en 2025 y 22,8 M (0,90) en los últimos 12 meses [1, 3].',
    ajustes: 'La empresa publica el EBITA (resultado operativo antes de amortizar los intangibles de las compras): 51,8 M EUR en 2025 (24,0 %) frente a 71,2 M en 2024 (34,1 %) [1]. La amortización de esos intangibles (PPA) fue de 9,3 M en 2025 y de ≈ 6,8 M solo en el primer semestre de 2026 (≈ 13,5 M al año con IAR) [3]. No recurrentes dentro del EBITDA: 5,8 M de costes de la compra de IAR en 2025 (1,7 M en el 3T y 4,1 M en el 4T) y 4,3 M de reorganización en el 2T26 [6, 5, 3]; se devuelven al EBITDA del motor. La remuneración en acciones es pequeña en la cuenta (0,6 M de gasto en 2025 y −1,2 M en 2024 por reversión), pero el plan de 2019 se liquidó en 2022 con 23,3 M de impuestos y parte en caja que hundieron el flujo operativo de ese año [1]. El BPA de la regla a 12 meses y su historia son los PUBLICADOS (NIIF, con la amortización de PPA): el consenso de MarketScreener está en esa base, Inderes publica un BPA ajustado sin PPA.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 42.2, null, null, 11.12, 0.30, null),
      trim('4T24', 68.48, null, null, 32.36, 1.13, null),
      trim('1T25', 47.24, null, null, 9.40, 0.20, null),
      trim('2T25', 51.22, null, null, 12.54, 0.27, null),
      trim('3T25', 40.72, -3.5, null, 5.21, 0.06, 'Inferior'),
      trim('4T25', 77.1, 12.6, 6.1, 28.70, 0.73, 'Superior'),
      trim('1T26', 52.73, 11.6, null, 6.45, 0.01, null),
      trim('2T26', 61.26, 19.6, null, 10.65, 0.09, 'Superior'),
    ],
    ultima_presentacion: 'EBITDA del trimestre = EBITA + amortización sin PPA (cálculo propio con las cifras de cada informe). Crecimiento a tipo constante: 3T25 −0,2 %, 4T25 +18,6 % (orgánico +6,1 %), 1T26 +18,4 %, 2T26 +20,9 % [6, 5, 4, 3]. El 2T26 (6-ago-2026) dio ventas de 61,3 M EUR y EBITA de 9,3 M (15,1 %) con 4,3 M de reorganización, por encima de lo que esperaba Inderes; el ARR (ingresos recurrentes anualizados) llegó a 160,4 M (+32,1 % a tipo constante con IAR; 127,1 M en diciembre sin IAR) [3]. La guía de 2026 se mantiene: ventas +10 % o más a tipo constante y margen EBITA de al menos el 15 % [3]. La empresa espera que las licencias de distribución bajen en 2026 tras un 2025 «excepcionalmente alto», que el paso de IAR a suscripción presione sus ventas en 2026, y que la venta por puesto evolucione con la IA hacia un cobro por capacidad o uso [3]. Dirección: el negocio es estable, los clientes retrasan proyectos nuevos por el entorno, hay más actividad en defensa y medicina y nuevos clientes de electrónica de consumo; APAC flojo [3]. Transcripción con preguntas de analistas no disponible (Seeking Alpha cerrado; la conferencia fue en finés e inglés en Inderes).',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 33.4 }, { anio: '2027', importe: 32.6 }, { anio: '2028', importe: 76.5 }],
    liquidez: 'Caja de 42,4 M EUR a 30-jun-2026; deuda con intereses de 126,6 M (con ≈ 8,8 M de arrendamientos), tras devolver 15 M en el 2T26 [3]. El préstamo de la compra de IAR (150 M) tiene covenants de solvencia y rentabilidad, que se cumplen [1]. Avales por 2,7 M [1].',
    rating: 'Sin calificación crediticia',
    coste_deuda_pct: 3.8,
    vida_media_anios: 2.0,
    otros_pasivos: 'Liquidación forzosa de los minoritarios de IAR: 5,1 M EUR en devengos a 31-dic-2025 [1]. Pasivos de contrato (cobros por adelantado): 25,9 M a corto y 5,8 M a largo en 2025 [1]. Sin pensiones de prestación definida relevantes.',
    comentario: 'Hasta 2024 el balance tenía caja neta (64,9 M EUR y sin deuda) [1]. La compra de IAR lo cambió: deuda financiera de 134,4 M a final de 2025 (más 8,8 M de arrendamientos) y 40,1 M de caja; 84 M de deuda neta en junio de 2026 (≈ 1,6 veces el EBITDA de 12 meses) [1, 3]. El activo está dominado por el fondo de comercio (166,9 M) y los intangibles de las compras (119,1 M en junio): 286 M de 432 M de activo total [3]. El circulante es pequeño porque los clientes pagan por adelantado (pasivos de contrato de 31,7 M) y las licencias cobradas a plazos (activos de contrato de 12,4 M) se compensan [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 40,2 M EUR en 2025 y 53,7 M en 2024; en 2022 fue negativo (−3,9 M) por la liquidación del plan de acciones de 2019 (impuestos y parte en caja: 23,3 M) [1]. La inversión es mínima (1,1 M en 2025, 0,5 % de las ventas) y los arrendamientos 2,6 M: el flujo libre es alto, ≈ 26,5 M en los 12 meses a junio de 2026 (11 % de las ventas) [1, 3]. La caja se ha ido a compras (195,3 M en 2025 por IAR; 25,8 M en 2022 y 24 M en 2021) y a recompras en 2020-2021 (16,4 M); nunca ha pagado dividendo [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG Oy Ab', anios_auditor: 11, opinion: 'Favorable (sin salvedades) en 2025 [1]',
    comentario: 'Cuentas limpias, con tres cosas que mirar. 1) Las licencias de plazo fijo se reconocen enteras al entregarlas y las regalías de distribución dependen de los informes de producción de los clientes: el cuarto trimestre concentra un tercio de las ventas y casi todo el beneficio (4T25: 77,1 M de ventas y 28,7 M de EBITDA) y los activos de contrato (12,4 M) son ventas reconocidas antes de facturar [1, 5]. 2) La amortización de los intangibles comprados (≈ 13,5 M al año con IAR) separa el EBITA de la empresa del EBIT y del BPA publicados [3]. 3) La remuneración en acciones: el plan de 2019 costó en 2022 ≈ 23 M en caja e impuestos y 15,4 M al consejero delegado; los planes actuales son pequeños (hasta 214.000 acciones, 0,8 %) [1].',
    senales: [
      { senal: 'Ventas concentradas en el cuarto trimestre', nivel: 'Media', comentario: 'Licencias de plazo fijo reconocidas al entregarlas: el 4T25 dio 77,1 M de 216,3 M y el 51 % del EBITDA del año [5, 1].' },
      { senal: 'EBITA frente a EBIT', nivel: 'Baja', comentario: 'La empresa guía con EBITA (sin la amortización de PPA, ≈ 13,5 M al año); el BPA publicado sí la lleva [3].' },
      { senal: 'Regalías de distribución que dependen de informes de clientes', nivel: 'Media', comentario: '56,8 M en 2025 (+26 %), «excepcionalmente altas»; la empresa espera menos en 2026 y bajaron un 17 % en el primer semestre [1, 3].' },
      { senal: 'Remuneración en acciones liquidada en caja (2022)', nivel: 'Baja', comentario: 'Plan de 2019: ≈ 23 M de salida de caja e impuestos en 2022; los planes de hoy son pequeños [1].' },
      { senal: 'Fondo de comercio e intangibles = 66 % del activo', nivel: 'Media', comentario: '286 M de 432 M en junio de 2026; la prueba de deterioro de 2025 usa crecimientos del 8-19 % y márgenes EBIT del 15-23 % [1, 3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Sin dividendo: la caja se reinvierte en crecimiento y compras. La junta de 2026 autorizó recomprar y emitir hasta 2 M de acciones cada una (≈ 8 %) [1]. Tras IAR, la prioridad es devolver deuda (15 M devueltos en el 2T26; vencimientos de 33,4 M en 2026 y 32,6 M en 2027) [3].',
    adquisiciones: [
      { anio: '2021', objetivo: 'froglogic (Squish, pruebas automáticas de interfaces)', importe: 37.5, ev_ebitda: null, financiacion: 'Caja y pago aplazado', resultado: 'Integrada en la línea de calidad de software [10].' },
      { anio: '2022', objetivo: 'Axivion (análisis estático de código)', importe: 44.1, ev_ebitda: null, financiacion: 'Caja (25,8), acciones (8,3) y pago aplazado (10,0)', resultado: '≈ 8,8 veces las ventas de 2021; hoy integrada con NVIDIA Halos para automoción [1].' },
      { anio: '2025', objetivo: 'I.A.R. Systems Group (compiladores, depuradores y herramientas para microcontroladores)', importe: 205.1, ev_ebitda: 13.2, financiacion: 'Préstamo de 150 M y caja', resultado: 'Prima del 66 %; 122,5 M de fondo de comercio; ventas de IAR en descenso en 2026 por el paso a suscripción; se cierran sus productos de seguridad [9, 1, 3].' },
    ],
    comentario: 'La empresa crece comprando herramientas que se venden a los mismos programadores de sistemas embebidos: froglogic y Axivion (pruebas y análisis de código) y en 2025 IAR, la mayor compra de su historia (≈ 205 M EUR, el 95 % de las ventas de Qt de un año) [9, 1]. Pagó ≈ 4,7 veces las ventas y ≈ 13,2 veces el EBITDA de IAR de 2024, con una prima del 66 %, justo cuando su propio crecimiento se paraba [9, 7]. El capital invertido pasó de ≈ 114 M en 2024 a ≈ 300 M en 2025, y el ROIC cayó del ≈ 45 % a ≈ 12 % [1]. Las recompras de 2020-2021 (16,4 M a 30-130 EUR por acción) se hicieron cerca de máximos [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Licencias de desarrollador y consultoría', descripcion: 'Puestos de programador para Qt (marco de interfaces), Qt Design Studio, herramientas de calidad (Squish, Axivion, Coco) y de IAR (compiladores Embedded Workbench), más consultoría; desde 2026 incluye las ventas de hardware de IAR.', tipo_resultado: 'Sin resultado publicado', historico: [{ periodo: '2023', ingresos: 123.661, resultado: null }, { periodo: '2024', ingresos: 152.187, resultado: null }, { periodo: '2025', ingresos: 141.796, resultado: null }] },
      { nombre: 'Licencias de distribución (regalías por dispositivo)', descripcion: 'Pago por cada dispositivo que el cliente fabrica con Qt dentro (paneles de coches, equipos médicos, electrodomésticos, automatización); depende del volumen de producción de los clientes.', tipo_resultado: 'Sin resultado publicado', historico: [{ periodo: '2023', ingresos: 44.115, resultado: null }, { periodo: '2024', ingresos: 44.954, resultado: null }, { periodo: '2025', ingresos: 56.811, resultado: null }] },
      { nombre: 'Mantenimiento', descripcion: 'Soporte y actualizaciones de licencias perpetuas (sobre todo de IAR).', tipo_resultado: 'Sin resultado publicado', historico: [{ periodo: '2023', ingresos: 12.967, resultado: null }, { periodo: '2024', ingresos: 11.922, resultado: null }, { periodo: '2025', ingresos: 17.674, resultado: null }] },
    ],
    geografias: [{ nombre: 'Resto de Europa', peso_pct: 39.8 }, { nombre: 'Norteamérica', peso_pct: 34.3 }, { nombre: 'Asia-Pacífico', peso_pct: 25.2 }, { nombre: 'Finlandia', peso_pct: 0.7 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'ARR (M EUR)', valor_anterior: '119,9 (jun-25)', valor_actual: '160,4 (jun-26)', variacion: '+32,1 % a tipo constante', comentario: 'Con IAR; sin IAR, 127,1 M en dic-25 (+8,3 %) [3, 5].' },
      { kpi: 'Licencias de distribución (M EUR)', valor_anterior: '44,95 (2024)', valor_actual: '56,81 (2025)', variacion: '+26,4 %', comentario: 'Bajaron un 17,4 % en el primer semestre de 2026 (27,9 M) [1, 3].' },
      { kpi: 'Crecimiento orgánico a tipo constante', valor_anterior: '+15,7 % (2024, total)', valor_actual: '+2,6 % (2025)', variacion: '−13 puntos', comentario: 'El frenazo que provocó el aviso de beneficios de octubre de 2025 [1, 7].' },
      { kpi: 'Margen EBITA', valor_anterior: '34,1 % (2024)', valor_actual: '24,0 % (2025); 12,6 % (1S26)', variacion: '−10 puntos', comentario: 'Guía 2026: al menos 15 % [1, 3].' },
      { kpi: 'Plantilla media', valor_anterior: '834 (2024)', valor_actual: '1.099 (1S26)', variacion: '+32 %', comentario: 'Con IAR; la reorganización recorta hasta 200 puestos [3, 8].' },
    ],
    clientes: 'Ningún cliente pasa del 10 % de las ventas [1]. Vende a fabricantes de coches y proveedores de automoción, de equipos médicos, de automatización industrial y de electrónica de consumo, más aeroespacial y defensa [1, 3]. Los programadores pagan licencias por puesto (renovaciones estables, con retención alta en Europa y América según la dirección) y los fabricantes pagan regalías por cada aparato que sale de su fábrica con Qt: esa parte sigue los ciclos de producción de coches y electrónica [3]. Qt también se distribuye con licencia abierta (LGPL/GPL): quien acepta publicar su código puede usarla gratis, y eso limita el precio que se puede cobrar a clientes pequeños [1].',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Qt Group Annual Report 2025 (negocio, mercado, competencia, riesgos)', editor: 'Qt Group Plc', tipo: 'Primaria', fecha: '2026-03-12', url: `${QT}/2025/Qt_AnnualReport_2025-EN.pdf` },
  { id: 2, titulo: 'Embedded Software Market Size, Share & Trends Analysis Report 2026-2033 (19,2 mil M USD en 2025; TCAC del 10,8 %)', editor: 'Grand View Research', tipo: 'Sectorial', fecha: '2026', url: 'https://www.grandviewresearch.com/industry-analysis/embedded-software-market-report' },
  { id: 3, titulo: 'Embedded Software Market Size report 2026-2035 (21 mil M USD en 2025; TCAC del 8,7 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/embedded-software-market' },
  { id: 4, titulo: 'Fichas de competidores y comparables (ventas, márgenes, capitalización) del 21-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Qt Group Plc Half-Year Report January-June 2026 (IA, modelo de precios, demanda por industrias)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://storage.mfn.se/5033faae-f2e0-45c9-b571-f12b9c3666a7/2026-q2-en-final.pdf' },
  { id: 6, titulo: 'SAUTER selects Qt Group to bring next-generation user experiences to building automation', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026', url: `${MFN}/sauter-selects-qt-group-to-bring-next-generation-user-experiences-to-building-automation` },
  { id: 7, titulo: 'Oferta por I.A.R. Systems Group (mercado de herramientas para microcontroladores, cifras de IAR 2024)', editor: 'Qt Group Plc (Cision)', tipo: 'Primaria', fecha: '2025-07-04', url: 'https://mb.cision.com/Main/23842/4200295/3566784.pdf' },
];
const fx = { EUR: 1, USD: 1 / Y['EURUSD=X'].precio, SEK: 1 / Y['EURSEK=X'].precio, CNY: 1 / Y['EURCNY=X'].precio };
const vEUR = (t) => Math.round(Y[t].ventas * fx[Y[t].divisa] / 1e6);
const B_ = {
  _estado: 'Completa con límites: no hay estudio público del mercado concreto de Qt (marcos de interfaces para sistemas embebidos y herramientas de desarrollo y prueba); se usa el de software embebido (dos casas de estudios, que difieren) y la cuota es estimación propia.',
  sector: {
    definicion: 'Mercado relevante: las herramientas de software con las que los fabricantes programan los dispositivos con pantalla o microcontrolador (sistemas embebidos): marcos para crear interfaces gráficas (Qt), compiladores y depuradores para microcontroladores (IAR) y herramientas de prueba y calidad de código (Squish, Axivion, Coco) [1]. Los clientes son fabricantes de coches y proveedores de automoción, equipos médicos, automatización industrial, electrónica de consumo, aeroespacial y defensa [1, 5]. No hay estudio público de ese perímetro: se mide con el mercado de software embebido, que es más amplio (incluye sistemas operativos y middleware) [2, 3].',
    tamano: '≈ 19.200-21.000 M USD de software embebido en 2025 según Grand View Research y Global Market Insights [2, 3]; el perímetro de Qt es una fracción de ese mercado',
    unidad_serie: 'millones de USD (software embebido, Grand View Research)',
    serie: [{ anio: '2025', tamano: 19200 }, { anio: '2026e', tamano: 20800 }, { anio: '2033e', tamano: 42600 }],
    tcac_historico_pct: null, tcac_previsto_pct: 10.8, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Más pantallas y software en coches, equipos médicos e industria', efecto: '+', horizonte: 'Estructural', evidencia: 'El «coche definido por software» y la digitalización de máquinas suben el número de pantallas y de líneas de código por aparato [1, 2].' },
      { driver: 'Normas de seguridad y certificación (ISO 26262, IEC 62304, ciberseguridad de la UE)', efecto: '+', horizonte: 'Estructural', evidencia: 'Exigen herramientas certificadas y pruebas trazables, el terreno de IAR, Axivion y Squish [1, 5].' },
      { driver: 'Ciclo de producción de automoción y electrónica', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las regalías de distribución siguen el volumen de fabricación de los clientes: +26 % en 2025 y −17 % en el primer semestre de 2026 [1, 5].' },
      { driver: 'Inteligencia artificial en la programación', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Más código exige más prueba y certificación; pero la IA abarata escribir interfaces con herramientas gratuitas y empuja la venta por puesto hacia el cobro por uso [5].' },
      { driver: 'Alternativas abiertas y motores de videojuegos', efecto: '−', horizonte: 'Estructural', evidencia: 'Flutter (Google), Slint y LVGL gratuitos; Unity y Unreal entran en paneles de coche [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Competidores con más recursos (Google con Flutter, Unity, Epic) y alternativas gratuitas; el crecimiento orgánico de Qt bajó al 2,6 % en 2025 [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Ningún cliente pasa del 10 %, pero los fabricantes de coches negocian regalías por volumen y pueden cambiar de herramienta en la siguiente plataforma [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'El insumo es el talento de programación; materiales y servicios son el 2,4 % de las ventas [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Un marco de interfaces nuevo tarda años en madurar y certificarse, pero la IA y el código abierto bajan la barrera [5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Navegador y tecnologías web en las pantallas, Android Automotive, herramientas propias de los fabricantes de chips y la IA que genera interfaces [1, 5].' },
    ],
    ciclo: { posicion: 'Desaceleración', comentario: 'La demanda de herramientas sigue a los proyectos nuevos de los clientes, que se retrasan por la geopolítica, los aranceles y la crisis de la automoción europea; la dirección dice que los clientes son prudentes con las decisiones de largo plazo [5]. Las regalías siguen a la producción de coches y aparatos. 2026: Europa y América estables, Asia floja [5].' },
    regulacion: 'Las normas de seguridad funcional (ISO 26262 en coches, IEC 62304 en equipos médicos, IEC 61508 en industria) y la Ley de Ciberresiliencia de la UE exigen herramientas y procesos certificados: favorecen a proveedores con certificación como IAR y Axivion [1]. Controles de exportación a algunos países y entidades [1]. Licencia abierta de Qt (LGPL/GPL): fija lo que se puede hacer sin pagar.',
    tendencias: 'Tres tendencias: más software y pantallas en cada aparato (coche, médico, industria) [2]; consolidación de herramientas en suites (Qt compró froglogic, Axivion e IAR; Siemens compró Altair; Synopsys, Ansys) [1]; y la IA, que hace más rápido escribir código e interfaces y lleva a cobrar por uso en vez de por puesto, como ya hace IAR [5]. Qt sale de la automoción hacia edificios, defensa y medicina: SAUTER la eligió en 2026 para las pantallas de automatización de edificios [6, 5].',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: 1.2, posicion: 'Líder en marcos multiplataforma de interfaces para sistemas embebidos con pantalla; con IAR, uno de los principales proveedores independientes de compiladores para microcontroladores. Cuota ≈ 1,2 % del mercado amplio de software embebido (estimación propia: 232 M EUR de ventas frente a ≈ 20.800 M USD) [2]',
    competidores: [
      { nombre: 'Unity Software', pais: 'EE. UU.', ticker: 'U', ingresos: vEUR('U'), cuota_pct: null, margen_ebit_pct: r1(Y.U.margen_ebit * 100), comentario: 'Motor de videojuegos que vende para paneles de coche e industria; pérdidas operativas [4].' },
      { nombre: 'Epic Games (Unreal Engine, privada)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Unreal para cuadros de mando y pantallas de coche de alta gama [1].' },
      { nombre: 'Google (Flutter, gratuito)', pais: 'EE. UU.', ticker: 'GOOGL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Marco abierto y gratuito que gana uso en aparatos embebidos; lo citan como amenaza los inversores de Qt [1].' },
      { nombre: 'BlackBerry (QNX)', pais: 'Canadá', ticker: 'BB', ingresos: vEUR('BB'), cuota_pct: null, margen_ebit_pct: r1(Y.BB.margen_ebit * 100), comentario: 'Sistema operativo en tiempo real de automoción; socio y competidor parcial [4].' },
      { nombre: 'Arm (Keil)', pais: 'Reino Unido', ticker: 'ARM', ingresos: vEUR('ARM'), cuota_pct: null, margen_ebit_pct: r1(Y.ARM.margen_ebit * 100), comentario: 'Compiladores Keil para microcontroladores, rival directo de IAR [7, 4].' },
      { nombre: 'ThunderSoft (Kanzi)', pais: 'China', ticker: '300496.SZ', ingresos: vEUR('300496.SZ'), cuota_pct: null, margen_ebit_pct: r1(Y['300496.SZ'].margen_ebit * 100), comentario: 'Kanzi, herramienta de interfaces de automoción, fuerte con fabricantes chinos [4].' },
      { nombre: 'Slint y LVGL (abiertas)', pais: 'Alemania / Hungría', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Marcos de interfaces abiertos y ligeros para microcontroladores, gratuitos [1].' },
      { nombre: 'Green Hills Software (privada)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compiladores certificados y sistemas operativos para seguridad; rival de IAR [7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'En erosión',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Comunidad de programadores, código abierto y ecosistema de componentes de 30 años; quien aprende Qt lo pide en el siguiente proyecto [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Una plataforma de coche o de equipo médico se programa y certifica para 5-10 años: cambiar de marco obliga a reescribir y recertificar; renovaciones estables [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Certificaciones de seguridad de IAR y Axivion; marca Qt entre programadores [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'No: Flutter y las alternativas abiertas son gratuitas [1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Nichos pequeños donde caben pocos proveedores especializados (compiladores para microcontroladores) [7].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el foso: 1) la IA, que abarata escribir interfaces con herramientas gratuitas (Flutter, web, LVGL) y reduce el número de programadores por proyecto, la base de la venta por puesto; 2) Flutter y los motores de videojuegos (Unity, Unreal) en las pantallas de coche; 3) los fabricantes de coches chinos, que usan herramientas locales (Kanzi) o propias, y Android Automotive en el infoentretenimiento [1, 5]. A favor: los costes de cambio de una plataforma certificada y la exigencia de herramientas certificadas, que la IA no elimina.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Qt Group (Espoo, Finlandia) vende herramientas para programar los aparatos con pantalla o chip: el marco Qt para crear interfaces gráficas que funcionan igual en un coche, un equipo médico o una lavadora; herramientas para probar y revisar el código (Squish, Axivion, Coco); y, desde octubre de 2025, los compiladores y depuradores de IAR para microcontroladores [1]. Tenía 1.136 empleados a final de 2025 en 17 oficinas de 11 países [1].',
    como_gana_dinero: 'Cobra de dos formas. 1) Licencias de desarrollador: cada programador que usa Qt o IAR paga una suscripción anual por puesto (141,8 M EUR en 2025, con consultoría) [1]. 2) Licencias de distribución: una regalía por cada dispositivo que el cliente fabrica con Qt dentro (56,8 M en 2025, 26 % de las ventas), que depende de la producción de coches, equipos y electrónica [1]. Más mantenimiento de licencias perpetuas (17,7 M). El margen bruto es casi total (materiales y servicios: 2,4 % de las ventas); el coste es la plantilla (gasto de personal de 111 M en 2025) [1]. La empresa espera cobrar más por capacidad o uso y menos por puesto a medida que la IA cambia la programación [5].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado concreto (marcos de interfaces embebidas y herramientas de desarrollo y prueba)', tipo: 'Complemento', intentos: '1) informe anual de Qt (no lo cuantifica); 2) Grand View Research y Global Market Insights (solo software embebido amplio); 3) MarketsandMarkets y Precedence Research (sin cifras legibles)', decision: 'Se usa el mercado amplio y se dice' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Qt Group Annual Report 2025 (gobierno corporativo, consejo, dirección, informe de remuneración, accionistas)', editor: 'Qt Group Plc', tipo: 'Primaria', fecha: '2026-03-12', url: `${QT}/2025/Qt_AnnualReport_2025-EN.pdf` },
  { id: 2, titulo: 'Decisiones de la junta de accionistas de 2026 y reunión constitutiva del consejo', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-04-14', url: `${MFN}/the-decisions-of-qt-group-plcs-annual-general-meeting-and-the-organizing-meeting-of-the-companys-board-of-directors` },
  { id: 3, titulo: 'Change in Qt Group\'s Management Team: Ann Zetterberg appointed as permanent CFO', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-04-07', url: `${MFN}/change-in-qt-groups-management-team-ann-zetterberg-appointed-as-permanent-cfo` },
  { id: 4, titulo: 'Managers\' transactions: Ingman Development Oy Ab (50.000 acciones)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-05-20', url: `${MFN}/qt-group-plc-managers-transactions-ingman-development-oy-ab` },
  { id: 5, titulo: 'Managers\' transactions: Robert Ingman (2.000 acciones)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-05-20', url: `${MFN}/qt-group-plc-managers-transactions-robert-ingman` },
  { id: 6, titulo: 'Notificaciones de participación significativa (Goldman Sachs, capítulo 9 de la Ley del Mercado de Valores de Finlandia), may-jun 2026', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-06', url: `${MFN}/announcement-of-a-change-in-shareholding-according-to-chapter-9-section-10-of-the-finnish-securities-market-act` },
  { id: 7, titulo: 'Presentaciones de resultados Q4 2022, Q4 2023 y Q4 2024 (guías anuales) y aviso de beneficios de octubre de 2025', editor: 'Qt Group Plc', tipo: 'Primaria', fecha: '2025-10-17', url: `${QT}/2024/Qt%20Group%20Q4%202024%20results.pdf?hsLang=en` },
  { id: 8, titulo: 'Qt Group Plc Half-Year Report January-June 2026 (accionistas a 30-jun-2026, cambios de dirección)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://storage.mfn.se/5033faae-f2e0-45c9-b571-f12b9c3666a7/2026-q2-en-final.pdf' },
];
const C = {
  _estado: 'Completa. Informe anual 2025 (gobierno y remuneración), junta de abril de 2026, cambios de dirección y operaciones de directivos de 12 meses en MFN. El porcentaje de votos de la junta sobre el informe de remuneración no se publica.',
  directivos: {
    equipo: [
      { nombre: 'Juha Varelius', cargo: 'Presidente y consejero delegado', desde: '2016', participacion_pct: 1.6, trayectoria: 'Consejero delegado de Digia (2008-2016) y de Qt desde la escisión de 2016. Llevó las ventas de 39 M EUR a 216 M y el margen EBITA al 34 % en 2024; también la compra de IAR y el aviso de beneficios de 2025 [1].' },
      { nombre: 'Ann Zetterberg', cargo: 'Directora financiera', desde: '2026', participacion_pct: null, trayectoria: 'Directora financiera de IAR; interina desde el 6-feb-2026 y fija desde el 7-abr-2026, tras la salida de Jouni Lintunen [3].' },
      { nombre: 'Thilak Ramanna', cargo: 'Vicepresidente sénior, unidad de negocio Qt', desde: '2026', participacion_pct: null, trayectoria: 'Al frente de la unidad Qt desde enero de 2026 [1].' },
      { nombre: 'Karin Schreil', cargo: 'Vicepresidenta sénior, unidad de negocio IAR', desde: '2026', participacion_pct: null, trayectoria: 'Desde el 4-may-2026, tras la salida de Cecilia Wachtmeister [8].' },
      { nombre: 'Erik Rehn', cargo: 'Vicepresidente de ventas', desde: '2025', participacion_pct: null, trayectoria: 'Desde noviembre de 2025 [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Ventas +20-30 % a tipo constante; margen EBITA 20-30 %', real: '+16,4 %; 30,6 %', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Ventas +20-30 % a tipo constante; margen EBITA 25-35 %', real: '+15,7 %; 34,1 %', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Ventas +15-25 % y margen EBITA 30-40 % (rebajada en abril a +10-20 % y en octubre a +3-10 % y 20-30 %)', real: '+6,6 %; 24,0 %', cumplida: 'No' },
      { anio: '2026', guia: 'Ventas +10 % o más a tipo constante; margen EBITA de al menos el 15 % (reiterada en agosto)', real: 'En curso: 1S26 +19,6 % y EBITA del 12,6 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo con una trayectoria de crecimiento muy buena hasta 2024 y una credibilidad dañada desde entonces: tres años seguidos por debajo de la guía de ventas, en 2025 con dos rebajas y un aviso de beneficios [7, 1]. La dirección dimensionó la plantilla para crecer un 20 % y tuvo que reorganizar en abril de 2026 (hasta 200 puestos) [1]. Mucho cambio en la cúpula en 2026: director financiero, responsables de las dos unidades y de ventas [3, 8]. El consejero delegado lleva 18 años al frente (Digia y Qt) y tiene el 1,6 % de las acciones.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Robert Ingman', cargo: 'Presidente del consejo', tipo: 'Dominical', desde: '2016', comisiones: 'Remuneración' },
      { nombre: 'Mikko Marsio', cargo: 'Vicepresidente del consejo', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría' },
      { nombre: 'Elina Anckar', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Marika Auramo', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Matti Heikkonen', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración (presidente)' },
      { nombre: 'Jouni Toijala', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 0.447, fijo: 0.429, variable_corto: 0, variable_largo: 0, ratio_salario_medio: 3.9 },
    remuneracion: 'El consejero delegado cobró 0,45 M EUR en 2025, casi todo fijo: sin variable por no cumplir los objetivos [1]. Ratio frente al coste medio por empleado: ≈ 3,9 veces. El riesgo está en los planes de acciones: con el plan de 2019 recibió acciones por 15,4 M en 2022 y vendió opciones por 26,8 M [1]. El plan 2025-2027 (hasta 214.000 acciones para la dirección) se liga a las ventas de 2027 con un umbral de margen EBITA, no al rendimiento del capital: premia crecer, también comprando, y es una de las críticas de los inversores [1].',
    accionistas: [
      { nombre: 'Ingman Group (Robert Ingman)', pct: 21.6, tipo: 'Familia / fundador de referencia', variacion: 'Compró 52.000 acciones el 19-20 de mayo de 2026' },
      { nombre: 'Skandinaviska Enskilda Banken (custodio)', pct: 11.1, tipo: 'Custodio', variacion: '30-jun-2026' },
      { nombre: 'Ilmarinen', pct: 5.4, tipo: 'Institucional', variacion: '30-jun-2026' },
      { nombre: 'Varma', pct: 3.0, tipo: 'Institucional', variacion: '30-jun-2026' },
      { nombre: 'Goldman Sachs', pct: 5.0, tipo: 'Institucional', variacion: 'En torno al 5 % en may-jun 2026, sobre todo con instrumentos financieros' },
      { nombre: 'Juha Varelius', pct: 1.6, tipo: 'Internos', variacion: '400.982 acciones' },
    ],
    insiders: [
      { fecha: '2026-05-19', persona: 'Ingman Development Oy Ab (sociedad del presidente)', operacion: 'Compra', acciones: 50000, importe: 1.309 },
      { fecha: '2026-05-20', persona: 'Robert Ingman (presidente)', operacion: 'Compra', acciones: 2000, importe: 0.052 },
    ],
    control_y_defensas: 'Sin accionista de control: Ingman Group es el de referencia con el 21,6 % y su dueño preside el consejo desde 2016 [8, 1]. Una acción, un voto; consejo elegido cada año; presidente separado del consejero delegado; cinco de seis consejeros independientes; comisión de auditoría de independientes [2]. La junta autorizó recomprar y emitir hasta 2 M de acciones (≈ 8 %) [2]. Sin operaciones vinculadas relevantes [1]. Goldman Sachs cruzó varias veces el 5 % en mayo-junio de 2026, sobre todo con instrumentos financieros (préstamo de valores, no una inversión estable) [6]. El presidente y su sociedad compraron 52.000 acciones a ≈ 26 EUR en mayo de 2026: son las únicas operaciones de directivos publicadas en MFN en los últimos 12 meses [4, 5].',
    alertas: [
      'Tres años sin cumplir la guía de ventas y aviso de beneficios en octubre de 2025 [7].',
      'Cambio de director financiero (febrero-abril de 2026) y de los responsables de las dos unidades en 2026 [3, 8].',
      'Incentivos de la dirección ligados a las ventas de 2027, no al rendimiento del capital [1].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'porcentaje de votos de la junta de 2026 sobre el informe de remuneración', tipo: 'Complemento', intentos: '1) comunicado de decisiones de la junta; 2) informe anual 2025; 3) web de inversores', decision: 'Omitido: en Finlandia el voto es consultivo y no se publica el porcentaje' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de QTCOM.HE, EXSA.DE (Stoxx Europe 600) y EXV3.DE (tecnología europea): precio, rango, rentabilidades, betas, cierres de ejercicio; herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/QTCOM.HE/history' },
  { id: 2, titulo: 'Consenso de QTCOM.HE y comparables (BPA, ventas, objetivos, recomendaciones; precio tras el cierre del 21-oct): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/QTCOM.HE/analysis' },
  { id: 3, titulo: 'Qt Group Oyj: consenso de 4 analistas (ventas, EBITDA, EBIT, beneficio y BPA 2026-2028; objetivo medio 34,25 EUR) y cambios de recomendación', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/QT-GROUP-OYJ-30049777/finances/' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (serie diaria BBSIS): 3,44 % el 21-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Qt Group Plc Half-Year Report January-June 2026 (guía 2026, ARR, deuda)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://storage.mfn.se/5033faae-f2e0-45c9-b571-f12b9c3666a7/2026-q2-en-final.pdf' },
  { id: 7, titulo: 'Inside information: profit warning, Qt Group lowers its outlook for 2025', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2025-10-17', url: 'https://mfn.se/cis/a/qt-group/inside-information-profit-warning-qt-group-lowers-its-outlook-for-2025-3e8b1771' },
  { id: 8, titulo: 'Insider information: operational reorganization (20-abr-2026)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-04-20', url: `${MFN}/insider-information-qt-group-launches-operational-reorganization-to-improve-efficiency` },
  { id: 9, titulo: 'Managers\' transactions de Ingman Development y Robert Ingman (19-20 de mayo de 2026)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-05-20', url: `${MFN}/qt-group-plc-managers-transactions-ingman-development-oy-ab` },
  { id: 10, titulo: 'Movimiento del precio de QTCOM.HE (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/QTCOM.HE/history' },
  { id: 11, titulo: 'Qt Group Plc Financial Statements Bulletin 2025 y Interim Statement 1T26 (resultados, guía cauta)', editor: 'Qt Group Plc (MFN)', tipo: 'Primaria', fecha: '2026-05-13', url: `${MFN}/qt-group-plc-interim-statement-january-march-2026` },
  { id: 12, titulo: 'Oferta por I.A.R. Systems Group (180 SEK por acción, prima del 66,4 %, cifras de IAR 2024)', editor: 'Qt Group Plc (Cision)', tipo: 'Primaria', fecha: '2025-07-04', url: 'https://mb.cision.com/Main/23842/4200295/3566784.pdf' },
  { id: 13, titulo: 'Siemens to acquire Altair Engineering (113 USD por acción, ≈ 10.000 M USD de valor de empresa) y Form 10-K de Altair (ventas 2024: 665,8 M USD)', editor: 'Siemens AG / Altair Engineering (SEC)', tipo: 'Primaria', fecha: '2024-10-30', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001701732' },
  { id: 14, titulo: 'Qt Group Annual Report 2025 (compras de froglogic, Axivion e IAR: precio y asignación)', editor: 'Qt Group Plc', tipo: 'Primaria', fecha: '2026-03-12', url: `${QT}/2025/Qt_AnnualReport_2025-EN.pdf` },
  { id: 15, titulo: 'Foro de Inderes (hilo de Qt Group) y prensa finlandesa (cambios de recomendación de Danske, SEB, OP e Inderes)', editor: 'Inderes (foro) y MarketScreener', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://forum.inderes.com/t/274' },
];
const q = Y['QTCOM.HE'];
const t = Object.fromEntries(q.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
const comp = (t_, nombre, pais) => {
  const y = Y[t_]; const k = fx[y.divisa];
  return { nombre, ticker: t_, pais, capitalizacion: Math.round(y.cap * k / 1e6), ev_ventas: r2(y.ev_ventas), ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(y.per_adelantado),
    crecimiento_pct: r1(y.crec_ventas_ttm * 100), margen_ebitda_pct: r1(y.margen_ebitda * 100), roic_pct: null, dn_ebitda: r1((y.deuda - y.caja) / y.ebitda), fcf_yield_pct: r1(y.fcf / y.cap * 100) };
};
const comps = [
  comp('SNPS', 'Synopsys', 'US'), comp('CDNS', 'Cadence Design Systems', 'US'), comp('PTC', 'PTC', 'US'), comp('DSY.PA', 'Dassault Systèmes', 'FR'),
  comp('NEM.DE', 'Nemetschek', 'DE'), comp('ADSK', 'Autodesk', 'US'), comp('BB', 'BlackBerry (QNX)', 'CA'), comp('VIT-B.ST', 'Vitec Software Group', 'SE'),
];
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const precio = B.identificacion.precio;
const mov = { var_1m_pct: 0.0, var_3m_pct: 46.6, var_6m_pct: 79.0, var_12m_pct: -11.6 };
const D = {
  _estado: `Completa. Precio de cierre del 21-oct-2026 (${n2(precio)} EUR; último cruce a las 15:29:52 UTC). Mediana del PER adelantado de los comparables: ${n2(perMed)} (casi todos en BPA ajustado, no NIIF).`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Qt Group Oyj', nombre_corto: 'Qt Group', ticker: 'QTCOM', isin: 'FI4000198031', mercado: 'Nasdaq Helsinki', indice_referencia: 'OMX Helsinki 25 / Stoxx Europe 600',
    pais: 'Finlandia', pais_iso: 'FI', sector: 'Tecnología', industria: 'Software (herramientas de desarrollo para sistemas embebidos)', sede: 'Espoo (Finlandia)', fundacion: '2016 (escisión de Digia; tecnología Qt desde 1995, Trolltech)', empleados: 1136, web: 'https://www.qt.io',
    precio, fecha_precio: B.identificacion.fecha_precio, acciones: 25.391, capitalizacion_publicada: Math.round(q.cap / 1e6), free_float_pct: 69,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${n2(B.volumen_3m.importe_dia_millones)} M EUR/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía de 2026 (26-feb-2026, reiterada el 13-may y el 6-ago): ventas +10 % o más a tipo constante y margen EBITA de al menos el 15 % [6]. La empresa espera menos licencias de distribución que en 2025 y presión en las ventas de IAR por el paso a suscripción; la reorganización (≥ 20 M EUR de ahorro anual, completo en 2027) apoya el margen del segundo semestre [6, 8].',
    estimaciones: [
      { periodo: '2026e', ingresos: 240.5, ebitda: 57.9, ebit: 38.6, bpa: 1.00, dpa: 0, fuente: 'MarketScreener, 4 analistas [3]' },
      { periodo: '2027e', ingresos: 262.2, ebitda: 79.7, ebit: 60.8, bpa: 1.76, dpa: 0, fuente: 'MarketScreener, 4 analistas [3]' },
      { periodo: '2028e', ingresos: 284.9, ebitda: 93.1, ebit: 75.0, bpa: 2.25, dpa: 0, fuente: 'MarketScreener, 4 analistas [3]' },
    ],
    recomendaciones: { n_analistas: q.reco.strongBuy + q.reco.buy + q.reco.hold + q.reco.sell + q.reco.strongSell, comprar: q.reco.strongBuy + q.reco.buy, mantener: q.reco.hold, vender: q.reco.sell + q.reco.strongSell, po_medio: r2(q.po_medio), po_min: q.po_min, po_max: q.po_max },
    revisiones: `Al alza tras el semestral: el BPA de 2026 de Yahoo pasó de ${n2(r2(t['0y'].bpa_hace90))} EUR hace 90 días a ${n2(r2(t['0y'].bpa))} y el de 2027 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))} [2]. Recomendaciones: SEB a comprar con 40 EUR (25-sep), Inderes acumular con 38 (7-ago), OP comprar con 40 (7-ago), Danske vender con 15 (22-abr) [3, 15]. Ojo con la base: MarketScreener da BPA publicado (NIIF) y Yahoo mezcla; Inderes publica un BPA ajustado sin amortización de PPA de 1,53 / 2,51 / 2,84 EUR para 2026-2028 [15].`,
    base_ebitda: 'publicado', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: null,
    comentario: `La acción es muy volátil (volatilidad del ${n2(bol.volatilidad_pct)} % a un año y del 56 % a 60 sesiones) y ha perdido mucho: −89,7 % desde el máximo de octubre de 2021 hasta marzo de 2026, −13,5 % en 12 meses frente a +15,2 % del índice [1]. Pasó de 133,6 EUR al cierre de 2021 (≈ 98 veces el beneficio del año siguiente) a 18,04 en marzo de 2026, con el frenazo del crecimiento, el aviso de beneficios y el miedo a la IA; desde entonces sube un 90 % por el semestral, las compras de Ingman y la reorganización [1, 10]. Betas: 2,0 mensual a cinco años, 1,59 semanal a cinco años y 1,21 semanal a dos años frente al Stoxx Europe 600 [1].`,
    contexto: {
      movimiento: { fecha: '2026-10-21', ...mov, dist_max_52s_pct: r1((precio / B.identificacion.max_52s - 1) * 100), dist_min_52s_pct: r1((precio / B.identificacion.min_52s - 1) * 100), dist_max_historico_pct: -80.9, tendencia: 'alcista', volatilidad_60d_pct: 56.0, avisos: ['P1: subida fuerte, +47 % en tres meses'] },
      movimientos_fuertes: [
        { periodo: 'oct 2025', var_pct: -6.7, causa: 'Aviso de beneficios del 17-oct-2025 (guía de 2025 rebajada a +3-10 % y EBITA del 20-30 %) y resultados del 3T25 el 30-oct (ventas −3,5 %) [7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ene-mar 2026', var_pct: -45.0, causa: 'De ≈ 33 EUR a 18,04 el 23-mar: −9,6 % el 29-ene el mismo día que SAP cayó un 16 % (miedo a la IA en el software), Danske a mantener (30-ene), guía cauta de 2026 el 26-feb (−8,2 %) y −7,0 % el 2-mar [11, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr 2026', var_pct: -12.0, causa: 'Reorganización de hasta 200 puestos (20-abr, −4,8 %) y Danske a vender con objetivo de 15 EUR (22-abr, −7,7 %) [8, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may 2026', var_pct: 59.5, causa: 'Resultados del 1T26 (13-may; +6,5 % y +11,6 % el 15-may), compras de 52.000 acciones del presidente y su sociedad (19-20 de mayo, +9,4 %) y SEB a comprar [11, 9, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-jul 2026', var_pct: -24.3, causa: 'Caída sin noticia propia de la empresa (mayor caída de un mes hasta el 2-jul); tres búsquedas (comunicados de MFN, foro de Inderes, prensa) sin causa concreta: devolución de la subida de mayo con el sector de software [10, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago 2026', var_pct: 26.7, causa: 'Semestral del 6-ago (ventas +19,6 %, ARR +32 %, guía reiterada): +26,7 % en el día; Inderes, OP y SEB suben objetivos [6, 15].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados del 3T26 el 29-oct-2026 (el consenso de Yahoo espera 0,03 EUR por acción y 47,6 M de ventas) [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-25', tipo: 'recomendación', hecho: 'SEB sube a comprar con objetivo de 40 EUR [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'resultados', hecho: 'Semestral: ventas del 2T +19,6 %, EBITA del 15,1 % con 4,3 M de reorganización, ARR de 160,4 M; guía de 2026 reiterada [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07', tipo: 'deuda o capital', hecho: 'Data I/O firma una carta de intención no vinculante para comprar los productos de seguridad de IAR que Qt cierra (≈ 3 M de ahorro al año) [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-20', tipo: 'directivos', hecho: 'El presidente (Robert Ingman) y su sociedad compran 52.000 acciones por 1,36 M EUR a ≈ 26,2 EUR [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-20', tipo: 'otro', hecho: 'Reorganización: ahorro de al menos 20 M EUR al año, hasta 200 puestos, coste de 4,3 M en el 2T26 [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-07', tipo: 'directivos', hecho: 'Ann Zetterberg, directora financiera fija tras la salida de Jouni Lintunen en febrero [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-26', tipo: 'resultados', hecho: 'Resultados de 2025 y guía de 2026 (ventas +10 % o más, EBITA de al menos el 15 %) [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10-17', tipo: 'resultados', hecho: 'Aviso de beneficios: guía de 2025 rebajada por segunda vez; cierre de la compra de IAR el mismo día [7, 12].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'Salta el aviso P1 (subida fuerte, +47 % en tres meses), que no cambia la señal por sí solo (regla 13). La subida tiene causas en hechos de la empresa: un semestral mejor de lo esperado, la reorganización, compras del presidente y subidas de recomendación; parte de un mínimo de 18 EUR al que llevaron el aviso de beneficios y el miedo a la IA en el software [6, 9, 15]. La acción sigue un 16 % por debajo del máximo de 52 semanas y un 81 % por debajo del de cinco años. El tramo de junio-julio (−24 %) no tiene causa propia encontrada. No hay colocaciones, ampliaciones, litigios ni votaciones con fecha que puedan mover el precio más de un 5 % en contra; los resultados del 3T26 (29-oct) no retrasan nada (regla 11), aunque el trimestre es estacionalmente el más flojo. Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2020', precio_cierre: 57.6, ev_ebitda_ntm: null, per_ntm: 65.5, excluir: false },
      { anio: '2021', precio_cierre: 133.6, ev_ebitda_ntm: null, per_ntm: 98.2, excluir: true },
      { anio: '2022', precio_cierre: 44.5, ev_ebitda_ntm: null, per_ntm: 32.0, excluir: false },
      { anio: '2023', precio_cierre: 64.16, ev_ebitda_ntm: null, per_ntm: 28.4, excluir: false },
      { anio: '2024', precio_cierre: 67.2, ev_ebitda_ntm: null, per_ntm: 53.8, excluir: false },
      { anio: '2025', precio_cierre: 32.94, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'PER adelantado = precio de cierre de cada ejercicio (Yahoo [1]) ÷ BPA publicado del ejercicio siguiente [14]. El de 2025 usa nuestro BPA de 2026e (en propio). Se excluye 2021 (98 veces: burbuja del software con tipos cero, el pico de la acción). El de 2024 (53,8) está inflado porque el BPA de 2025 cayó por la compra de IAR y el frenazo. El múltiplo de Qt ha sido siempre de crecimiento (28-65 veces); hoy, tras caer un 75 % desde 2021, cotiza a ≈ 20-22 veces el beneficio de los próximos 12 meses, el nivel de un software maduro.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Empresas de software de ingeniería y de herramientas para programar productos (Synopsys, Cadence, PTC, Dassault, Nemetschek, Autodesk), BlackBerry por QNX (software de automoción) y Vitec (software nórdico) [2]. Ninguna es igual: Qt es mucho más pequeña, más cíclica (regalías) y crece menos que las de diseño de chips. Fuera: Unity (PER sin sentido, pérdidas operativas), JFrog (EBITDA negativo), Arm (PER de 73 veces por la IA) y ThunderSoft (servicios con margen EBITDA del 5 %).',
    empresas: comps,
    comentario: `Qt cotiza a ${n2(r1(q.per_adelantado))} veces el BPA de 2027 de Yahoo y a ${n2(r1(q.ev_ebitda))} veces el EBITDA de 12 meses (con 10,1 M de no recurrentes dentro), frente a una mediana de ${n2(perMed)} veces de PER adelantado de los comparables [2]. Cuidado: los comparables de EE. UU. publican BPA ajustado (sin pagos en acciones ni amortización de compras), así que su PER en base NIIF sería más alto, y el de Qt también está en BPA del consenso con mezcla de bases. Con crecimiento del 8-10 % y márgenes en recuperación, la mediana es una referencia razonable pero exigente para Qt; la regla a 12 meses la usa solo en el alcista.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-10', objetivo: 'I.A.R. Systems Group (compiladores para microcontroladores)', comprador: 'Qt Group', ev: 205.1, ev_ventas: 4.7, ev_ebitda: 13.2, prima_pct: 66.4, excluir: false, comentario: '180 SEK por acción, 2.293 M SEK; múltiplos sobre las cifras de IAR de 2024 (ventas de 487 M SEK, EBITDA del 35,8 %) y el valor de las acciones [12].' },
      { fecha: '2024-10', objetivo: 'Altair Engineering (software de simulación)', comprador: 'Siemens', ev: null, ev_ventas: 15.0, ev_ebitda: null, prima_pct: 19, excluir: false, comentario: '≈ 10.000 M USD de valor de empresa sobre 665,8 M USD de ventas de 2024 [13].' },
      { fecha: '2022-08', objetivo: 'Axivion (análisis estático de código)', comprador: 'Qt Group', ev: 44.1, ev_ventas: 8.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Con pago aplazado y acciones; ventas de 5,0 M en 2021 [14].' },
      { fecha: '2021', objetivo: 'froglogic (pruebas de interfaces)', comprador: 'Qt Group', ev: 37.5, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas no publicadas [14].' },
    ],
    comentario: 'Las compras de herramientas de software se pagan caras: 4,7-15 veces las ventas. A 4,0 veces sus ventas de 12 meses (valor de empresa de ≈ 930 M EUR), Qt cotiza por debajo de lo que ella misma pagó por IAR y muy por debajo de Altair. Con un accionista de referencia del 21,6 % (Ingman) que acaba de comprar más, una opa hostil es difícil; una amistosa de un grupo industrial o de software de ingeniería es posible pero no hay ninguna señal.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta registrada', tipo: 'Complemento', intentos: '1) registro de posiciones cortas de la FIN-FSA (no abre sin navegador); 2) Yahoo (sin dato); 3) foro de Inderes (≈ 8 % en marzo y ≈ 4,2 % en junio, sin fuente primaria)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'causa de la caída de junio-julio de 2026', tipo: 'Complemento', intentos: '1) comunicados de MFN de junio-julio (ninguno con hechos de negocio); 2) foro de Inderes; 3) prensa finlandesa', decision: 'Se explica como devolución de la subida de mayo, sin causa concreta' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Inderes, hilo de Qt Group (8.179 mensajes; leídos los últimos 80, ago-oct 2026)', editor: 'Inderes (foro)', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://forum.inderes.com/t/274' },
  { id: 2, titulo: 'Inderes: análisis y estimaciones de Qt Group (BPA ajustado, crecimiento orgánico del ARR)', editor: 'Inderes', tipo: 'Analistas', fecha: '2026-08-07', url: 'https://www.inderes.fi/en/companies/Qt-Group/financials-and-estimates/income-statements' },
  { id: 3, titulo: 'Seeking Alpha: titulares de QTCOM (RSS; transcripciones de pago)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/QTCOM.xml' },
  { id: 4, titulo: 'Stocktwits, flujo de $QTCOM (vacío)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/QTCOM.json' },
];
const E = {
  _estado: 'Completa con límites: el debate está en el foro finlandés de Inderes; Stocktwits vacío y Seeking Alpha solo con titulares.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejorando',
    revisadas: [
      { plataforma: 'Foro de Inderes (hilo de Qt Group)', fecha: '2026-10', n_comentarios: 80, tono: 'Dividido', resumen: 'Los optimistas destacan las compras de Ingman, el semestral, los ahorros de la reorganización y una frase de la dirección sobre un negocio de 500 M EUR; los escépticos, el crecimiento orgánico flojo, el precio pagado por IAR, los incentivos ligados a las ventas, Flutter y el «vibe coding» con IA [1].' },
      { plataforma: 'Inderes (casa de análisis)', fecha: '2026-08', n_comentarios: 1, tono: 'Positivo', resumen: 'Acumular con objetivo de 38 EUR; ve exagerados los temores sobre la IA [2].' },
      { plataforma: 'Seeking Alpha y Stocktwits', fecha: '2026-10', n_comentarios: 0, tono: 'Neutral', resumen: 'Sin debate en inglés: titulares de resultados y nada en Stocktwits [3, 4].' },
    ],
    temas: [
      { tema: 'La IA como amenaza («vibe coding»)', postura: 'Bajista', peso: 'Alto', contraste: 'Riesgo real para la venta por puesto; la empresa ya prevé cobrar por capacidad o uso. Las cifras aún no lo muestran: renovaciones estables y ARR orgánico sin IAR +11,5 % en el 1T26 según Inderes [2].' },
      { tema: 'Compras del presidente (Ingman)', postura: 'Alcista', peso: 'Alto', contraste: '52.000 acciones por 1,36 M EUR a ≈ 26 EUR; señal de confianza del accionista de referencia [1].' },
      { tema: 'Precio pagado por IAR', postura: 'Bajista', peso: 'Medio', contraste: 'Prima del 66 % y ≈ 13 veces el EBITDA de IAR; las ventas de IAR bajan en 2026 por la suscripción [1].' },
      { tema: 'Reorganización y vuelta al margen del 30 %', postura: 'Alcista', peso: 'Medio', contraste: 'Ahorro de ≥ 20 M al año; el consenso de 2027 (EBITDA del 30 %) ya lo da por hecho [1].' },
    ],
    lectura: 'Sentimiento dividido que mejora desde el mínimo de marzo: el miedo a la IA y el aviso de beneficios llevaron la acción a 18 EUR; el semestral y las compras del presidente le han dado la vuelta. No hay euforia (los analistas siguen en mantener de media, objetivo de 34,25 EUR) ni capitulación. El debate coincide con los riesgos del informe (IA, IAR, crecimiento orgánico). Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Precio', precio, 'Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
