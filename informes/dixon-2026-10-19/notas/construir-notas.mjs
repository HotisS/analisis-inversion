// Escribe las notas A-E de Dixon Technologies (India) Ltd (DIXON.NS, NSE; corte 2026-10-19, cierre del 19-oct en Bombay).
// Fuentes: informes anuales integrados FY2025-26, FY2024-25, FY2023-24 y FY2021-22 (estados consolidados Ind AS auditados,
// dos ejercicios cada uno; FY2022-23 sale de las comparativas del FY2023-24), resultados trimestrales consolidados de 1T FY26 a
// 1T FY27, presentaciones y transcripciones de las conferencias de resultados (web de inversores), anuncios a la NSE
// (Regulation 30), accionariado XBRL de la NSE (30-sep-2025 y 30-sep-2026), Yahoo Finance (bolsa y comparables),
// MarketScreener (consenso), FRED/OCDE (bono indio), Damodaran (prima), prensa india y el foro ValuePickr.
// India no tiene XBRL en herramientas/cuentas.mjs. Ejercicio de abril a marzo: FY2026 = abril de 2025 a marzo de 2026
// (etiqueta «fin»). Cifras en millones de INR (los estados vienen en lakhs: ÷ 10) salvo que se diga otra cosa.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/dixon-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const W = 'https://dixon-website.s3.ap-south-1.amazonaws.com/uploads';
const N = 'https://nsearchives.nseindia.com/corporate';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const raw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const FX = { INR: 1, USD: raw._fx['USDINR=X'], TWD: raw._fx['TWDINR=X'], HKD: raw._fx['HKDINR=X'] };

const URL = {
  ar26: `${W}/7056e7e5-184b-47b4-8f6f-9c2d4b639eaf-AnnualReportFY2025-26.pdf`,
  ar25: `${W}/a7a34b02-4b9e-4b24-be18-d2853458a9f6-AnnualReport-2024-25.pdf`,
  ar24: `${W}/1745428945732_dixon-annual-report-2023-24.pdf`,
  ar22: 'https://dixon-website.s3.dualstack.ap-south-1.amazonaws.com/new_uploads/Investor%20Structure%20with%20docs/Financial%20Performance-20250331T105053Z-001/Financial%20Performance/Annual%20Reports/Annual%20Report%202021-22.pdf',
  res1q27: `${W}/fd85d87b-9753-4b1d-968c-7465159e226a-FullResultsQ1-FY27-31.07.2026.pdf`,
  res4q26: `${W}/58a8adb5-b90e-49b8-a384-47594f33e1bd-FullresultsQ4FY26-12.05.2026.pdf`,
  res3q26: `${W}/ecc652a5-3caf-41ef-ab3e-87427ead1a47-Financials-31.12.2025.pdf`,
  res2q26: `${W}/634e2f79-abbe-4cf4-92bd-586d46e19594-Q2FinancialResults-17.10.2025.pdf`,
  res1q26: `${W}/2d578526-6b9d-4a53-b265-a0c06121301f-FinancialResultsQ1FY25-26.pdf`,
  pres1q27: `${W}/07150914-1f3b-43ce-82f2-f8543b60027d-EarningPresentation-Q1FY26-27.pdf`,
  pres4q26: `${W}/355b2e69-f5a3-4a7f-bd0c-21482263cd92-EarningPresentation-Q4FY25-26.pdf`,
  pres3q26: `${W}/df5e9e1f-011d-4145-801c-4a57e9dab68d-EarningPresentation-Q39MFY25-26.pdf`,
  pres2q26: `${W}/6e2f3ec7-3971-4406-a6f8-3bcc30c21287-EarningPresentation-Q2H1-FY25-26.pdf`,
  tr1q27: `${W}/0682e687-050b-41b2-afc6-54f26a960066-EarningCallTranscript-Q1FY27-31.07.2026.pdf`,
  tr4q26: `${W}/17eb4df3-5044-40f5-b3c4-3def219cbd19-EarningTranscriptQ4FY26.pdf`,
  tr3q26: `${W}/0c5cefdb-c2c9-4335-90d4-94831b7d2aff-Q3EarningCallTrsnacript.pdf`,
  tr2q26: `${W}/fb421e45-15f5-4195-9a2a-ddf72364b6e2-Q2EarningCallTranscript.pdf`,
};

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Integrated Annual Report 2025-26: estados consolidados Ind AS de FY2026 y FY2025 (situación, resultados, flujos, notas), informe del auditor con párrafo de énfasis (nota 59 a), dividendos', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-09', url: URL.ar26 },
  { id: 2, titulo: 'Annual Report 2024-25: estados consolidados de FY2025 y FY2024; plusvalía de Aditya Infotech como partida excepcional', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2025-08', url: URL.ar25 },
  { id: 3, titulo: 'Annual Report 2023-24: estados consolidados de FY2024 y FY2023', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2024-08', url: URL.ar24 },
  { id: 4, titulo: 'Annual Report 2021-22: estados consolidados de FY2022 y FY2021', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2022-08', url: URL.ar22 },
  { id: 5, titulo: 'Resultados consolidados no auditados del trimestre a 30-jun-2026 (1T FY27), con comparativas de 4T FY26 y 1T FY26', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-07-31', url: URL.res1q27 },
  { id: 6, titulo: 'Resultados consolidados auditados de FY2026 y del 4T FY26 (con balance y flujos y la nota del incentivo PLI de Padget)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-05-12', url: URL.res4q26 },
  { id: 7, titulo: 'Resultados consolidados del 3T FY26 (a 31-dic-2025)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-01', url: URL.res3q26 },
  { id: 8, titulo: 'Resultados consolidados del 2T FY26 (a 30-sep-2025)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2025-10-17', url: URL.res2q26 },
  { id: 9, titulo: 'Earnings Presentation 1T FY27: beneficio operativo, beneficio ajustado tras minoritarios, divisiones, balance a 30-jun-2026', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-07-31', url: URL.pres1q27 },
  { id: 10, titulo: 'Earnings Presentation 4T FY26: resultados de FY2026, divisiones, ROCE, ROE, circulante, flujo de caja libre', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-05-12', url: URL.pres4q26 },
  { id: 11, titulo: 'Earnings Presentation 3T FY26 (9M FY26): beneficio ajustado por trimestre', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-01', url: URL.pres3q26 },
  { id: 12, titulo: 'Earnings Presentation 2T FY26 (1S FY26)', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2025-10-17', url: URL.pres2q26 },
  { id: 13, titulo: 'Transcripción de la conferencia de resultados del 1T FY27 (volúmenes de móviles, objetivo de ingresos de FY27, Vivo, margen)', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-07-31', url: URL.tr1q27 },
  { id: 14, titulo: 'Transcripción de la conferencia de resultados del 4T FY26 (fin del PLI de móviles, memoria, guía de FY27)', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-05-12', url: URL.tr4q26 },
  { id: 15, titulo: 'Transcripción de la conferencia de resultados del 3T FY26', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-01', url: URL.tr3q26 },
  { id: 16, titulo: 'ICRA: rating AA (Stable) / A1+ confirmado (comunicación a la NSE)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-01-07', url: `${N}/DIXON_07012026155143_CreditRatingDisclosure07012026.pdf` },
];

// Cuenta por naturaleza (Ind AS). coste_ventas = materiales consumidos + variación de existencias; gastos_generales = null.
// EBITDA operativo = ingresos de explotación − materiales − variación de existencias − personal − otros gastos (sin «otros
// ingresos»; es la cifra que la empresa llama «operating profit»). resultado_financiero = BAI − EBIT: otros ingresos − gastos
// financieros + participadas (JV) + excepcionales. BPA = beneficio atribuido a los dueños ÷ acciones diluidas (el BPA
// diluido publicado divide el beneficio ANTES de minoritarios desde FY2025: 202,58 y 269,35 INR). DPA del ejercicio.
const cuenta = [
  { periodo: 'FY2022', ingresos: 106970.8, coste_ventas: 97792.4, gastos_generales: null, ebitda: 3791.1, amortizaciones: 839.5, ebit: 2951.6, resultado_financiero: -404.5, bai: 2547.1, impuestos: 643.8, minoritarios: 1.6, beneficio_neto: 1901.7, gastos_financieros: 442.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 31.97, dpa: 2, dpa_extraordinario: 0, acciones_diluidas: 59.48 },
  { periodo: 'FY2023', ingresos: 121920.1, coste_ventas: 110207.4, gastos_generales: null, ebitda: 5127.5, amortizaciones: 1146.3, ebit: 3981.2, resultado_financiero: -533.4, bai: 3447.8, impuestos: 897.0, minoritarios: -4.4, beneficio_neto: 2555.2, gastos_financieros: 605.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 42.69, dpa: 3, dpa_extraordinario: 0, acciones_diluidas: 59.86 },
  { periodo: 'FY2024', ingresos: 176909.0, coste_ventas: 160389.5, gastos_generales: null, ebitda: 6976.3, amortizaciones: 1618.8, ebit: 5357.5, resultado_financiero: -419.2, bai: 4938.3, impuestos: 1189.1, minoritarios: 71.7, beneficio_neto: 3677.5, gastos_financieros: 747.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 61.26, dpa: 5, dpa_extraordinario: 0, acciones_diluidas: 60.03 },
  { periodo: 'FY2025', ingresos: 388601.0, coste_ventas: 358328.2, gastos_generales: null, ebitda: 15075.8, amortizaciones: 2810.2, ebit: 12265.6, resultado_financiero: 3432.4, bai: 15698.0, impuestos: 3372.2, minoritarios: 1370.4, beneficio_neto: 10955.4, gastos_financieros: 1543.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 180.06, dpa: 8, dpa_extraordinario: 0, acciones_diluidas: 60.84 },
  { periodo: 'FY2026', ingresos: 488728.0, coste_ventas: 452771.8, gastos_generales: null, ebitda: 18665.2, amortizaciones: 3929.8, ebit: 14735.4, resultado_financiero: 5970.2, bai: 20705.6, impuestos: 4263.1, minoritarios: 2056.1, beneficio_neto: 14386.4, gastos_financieros: 1374.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 235.68, dpa: 10, dpa_extraordinario: 0, acciones_diluidas: 61.04 },
];
// Balance. caja = efectivo + otros saldos bancarios + inversiones corrientes (fondos). deuda_financiera = préstamos a largo y
// a corto. inmovilizado_material = inmovilizado + obra en curso + derechos de uso (los arrendamientos van aparte como deuda).
// proveedores = pymes + resto (y los 546 lakhs a largo de FY2024). patrimonio_neto = atribuible a los dueños.
const balanceHist = [
  { periodo: 'FY2022', activo_total: 42771.7, activo_corriente: 31470.0, pasivo_corriente: 27358.9, pasivo_total: 32798.4, fondo_comercio: 303.1, intangibles: 191.3, inmovilizado_material: 9762.4, existencias: 11556.9, clientes: 13563.5, proveedores: 23137.4, activos_contrato: null, pasivos_contrato: null, caja: 3173.6, deuda_financiera: 4579.9, arrendamientos: 2089.1, patrimonio_neto: 9967.8, minoritarios: 5.5, reservas: 9849.1 },
  { periodo: 'FY2023', activo_total: 46794.3, activo_corriente: 31392.7, pasivo_corriente: 29409.9, pasivo_total: 33948.0, fondo_comercio: 303.1, intangibles: 224.4, inmovilizado_material: 13105.9, existencias: 9578.7, clientes: 17154.5, proveedores: 24518.8, activos_contrato: null, pasivos_contrato: null, caja: 2591.8, deuda_financiera: 1826.2, arrendamientos: 2704.7, patrimonio_neto: 12849.1, minoritarios: -2.8, reservas: 12730.0 },
  { periodo: 'FY2024', activo_total: 69914.5, activo_corriente: 48362.8, pasivo_corriente: 47316.2, pasivo_total: 52689.9, fondo_comercio: 303.1, intangibles: 347.2, inmovilizado_material: 19995.6, existencias: 16950.1, clientes: 23178.8, proveedores: 40652.1, activos_contrato: null, pasivos_contrato: null, caja: 2086.5, deuda_financiera: 1550.3, arrendamientos: 3339.5, patrimonio_neto: 16948.5, minoritarios: 276.1, reservas: 16828.9 },
  { periodo: 'FY2025', activo_total: 167668.7, activo_corriente: 130943.8, pasivo_corriente: 125954.4, pasivo_total: 132975.4, fondo_comercio: 570.2, intangibles: 393.3, inmovilizado_material: 29343.6, existencias: 39924.0, clientes: 69654.5, proveedores: 108836.5, activos_contrato: null, pasivos_contrato: null, caja: 2635.3, deuda_financiera: 2022.8, arrendamientos: 4686.8, patrimonio_neto: 30102.0, minoritarios: 4591.3, reservas: 29981.5 },
  { periodo: 'FY2026', activo_total: 191616.4, activo_corriente: 135153.9, pasivo_corriente: 126982.9, pasivo_total: 137749.7, fondo_comercio: 5800.0, intangibles: 406.4, inmovilizado_material: 41218.5, existencias: 38365.2, clientes: 65299.1, proveedores: 107221.8, activos_contrato: null, pasivos_contrato: null, caja: 12413.7, deuda_financiera: 4675.0, arrendamientos: 5267.2, patrimonio_neto: 46766.7, minoritarios: 7100.0, reservas: 46645.1 },
];
// Flujos (Ind AS: intereses pagados en financiación). capex = inmovilizado material e intangibles. adquisiciones = compra de
// filiales neta de caja (FY2025: Ismartu; FY2026: Q Tech India). desinversiones = venta de inmovilizado + venta de acciones
// de Aditya Infotech (FY2026: 6.582,6 M) o salida de la JV de seguridad (FY2025: 2.486,3 M). emision_acciones incluye
// la aportación de los minoritarios a las filiales.
const flujosHist = [
  { periodo: 'FY2022', flujo_operativo: 2727.4, capex: 4206.4, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 58.6, recompras: 0, emision_acciones: 642.0, intereses_en_financiacion: 566.5 },
  { periodo: 'FY2023', flujo_operativo: 7257.5, capex: 4612.0, pagos_arrendamientos: 305.7, adquisiciones: 0, desinversiones: 0, dividendos: 118.7, recompras: 0, emision_acciones: 335.7, intereses_en_financiacion: 431.6 },
  { periodo: 'FY2024', flujo_operativo: 5843.1, capex: 5844.3, pagos_arrendamientos: 427.9, adquisiciones: 0, desinversiones: 0, dividendos: 178.6, recompras: 0, emision_acciones: 677.1, intereses_en_financiacion: 494.4 },
  { periodo: 'FY2025', flujo_operativo: 11497.5, capex: 9393.5, pagos_arrendamientos: 699.5, adquisiciones: 3209.8, desinversiones: 2486.3, dividendos: 329.1, recompras: 0, emision_acciones: 1399.3, intereses_en_financiacion: 1219.2 },
  { periodo: 'FY2026', flujo_operativo: 17822.9, capex: 10675.1, pagos_arrendamientos: 859.8, adquisiciones: 4305.1, desinversiones: 6679.0, dividendos: 1178.3, recompras: 0, emision_acciones: 2631.8, intereses_en_financiacion: 1029.5 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = FY2026 − 1T FY26 + 1T FY27 [5]. EBITDA operativo 18.665 − 4.820 + 4.630; amortización 3.930 − 927 + 1.070.
    // Beneficio AJUSTADO tras minoritarios (sin la plusvalía de Aditya): 8.450 − 2.250 + 2.180 = 8.380 M; publicado 18.770 M.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 515848, ebitda: 18475, ebit: 14403, beneficio_neto: 8380, bpa: 135.8, dpa: 10, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2025', descripcion: 'Compra del 50,1 % de Ismartu India (fabricante de los móviles de Transsion: itel, Tecno, Infinix) y venta de la JV de seguridad a Aditya Infotech a cambio de acciones de esta [2].' },
      { periodo: 'FY2026', descripcion: 'Compra del 51 % de Q Tech India (módulos de cámara; fondo de comercio de 5.230 M) y traspaso del negocio de iluminación a la JV Lightanium con Signify; Dixtel (74 % con Longcheer) empieza a operar [1, 10].' },
      { periodo: 'FY2027', descripcion: 'JV Adivistar con Vivo India (51 % Dixon), constituida el 13-ago-2026 y con la primera aportación el 21-sep-2026; aún sin ventas en el 1T FY27 [9, 13].' },
    ],
    comentario: 'Los ingresos pasaron de 106.971 M INR en FY2022 a 488.728 M en FY2026: un 46 % anual, casi todo por los móviles para terceros (Motorola, Transsion a través de Ismartu, Xiaomi, Oppo a través de Longcheer y Google), que en FY2026 fueron 442.570 M, el 91 % del total [1, 10]. Es crecimiento de volumen con el coste de los componentes dentro de la factura: el margen EBITDA operativo es del 3,5-4,2 % y no sube (4,2 % en FY2023, 3,9 % en FY2024 y FY2025, 3,8 % en FY2026) [1, 2, 3]. Dentro de los ingresos están los incentivos PLI (3.140 M en FY2026 y 2.563 M en FY2025), es decir, alrededor del 17 % del EBITDA [1]. El PLI de móviles terminó en marzo de 2026 y la empresa cifra su impacto en 50-70 puntos básicos de margen [14]. En el 1T FY27 los ingresos crecieron un 21 % (155.477 M), pero el margen operativo bajó al 3,0 % (3,8 % un año antes) por el fin del PLI y el encarecimiento de la memoria [9, 13]. El beneficio publicado de FY2025 y FY2026 está inflado por la revalorización de la participación en Aditya Infotech; ajustado y tras minoritarios fue de 7.060 M (FY2025) y 8.450 M (FY2026) [10].',
    ajustes: 'Cifras publicadas Ind AS, sin ajustes en la cuenta. Tres matices. (1) No recurrente: la plusvalía a valor razonable de las acciones de Aditya Infotech (4.599,8 M en FY2025 como partida excepcional; 6.707,5 M en FY2026 y 5.190 M en el 1T FY27 dentro de «otros ingresos») y 218,8 M de plusvalía por el traspaso de la iluminación en FY2026 [1, 2, 5]. Sin ellas, el beneficio tras minoritarios fue de 7.060 M en FY2025 y 8.450 M en FY2026 (cifra «ajustada» de la empresa) [10]. (2) BPA: el diluido publicado (202,58 y 269,35 INR) divide el beneficio antes de minoritarios; aquí se usa el atribuido a los dueños (180,06 y 235,68 INR), y en la valoración el ajustado (116,0 y 138,4 INR). (3) Los «otros incentivos» (PLI) van dentro de los ingresos de explotación: 3.140 M en FY2026 [1].',
    confianza: 'Alta',
  },
  trimestres: {
    // Ingresos de explotación, «operating profit» (EBITDA sin otros ingresos) y BPA ajustado tras minoritarios (beneficio
    // ajustado ÷ ≈ 60,8-61,7 M de acciones diluidas) [5-12].
    items: [
      { periodo: '2T FY25', ingresos: 115341, crecimiento_pct: 132.2, crecimiento_organico_pct: null, ebitda: 4260, margen_ebitda_pct: 3.7, bpa: null, vs_consenso: null },
      { periodo: '3T FY25', ingresos: 104537, crecimiento_pct: 117.1, crecimiento_organico_pct: null, ebitda: 3910, margen_ebitda_pct: 3.7, bpa: 28.3, vs_consenso: null },
      { periodo: '4T FY25', ingresos: 102925, crecimiento_pct: 120.8, crecimiento_organico_pct: null, ebitda: 4430, margen_ebitda_pct: 4.3, bpa: 30.4, vs_consenso: null },
      { periodo: '1T FY26', ingresos: 128357, crecimiento_pct: 95.1, crecimiento_organico_pct: null, ebitda: 4820, margen_ebitda_pct: 3.8, bpa: 37.0, vs_consenso: null },
      { periodo: '2T FY26', ingresos: 148550, crecimiento_pct: 28.8, crecimiento_organico_pct: null, ebitda: 5610, margen_ebitda_pct: 3.8, bpa: 40.7, vs_consenso: null },
      { periodo: '3T FY26', ingresos: 106716, crecimiento_pct: 2.1, crecimiento_organico_pct: null, ebitda: 4150, margen_ebitda_pct: 3.9, bpa: 29.5, vs_consenso: null },
      { periodo: '4T FY26', ingresos: 105105, crecimiento_pct: 2.1, crecimiento_organico_pct: null, ebitda: 4090, margen_ebitda_pct: 3.9, bpa: 31.5, vs_consenso: null },
      { periodo: '1T FY27', ingresos: 155477, crecimiento_pct: 21.1, crecimiento_organico_pct: null, ebitda: 4630, margen_ebitda_pct: 3.0, bpa: 35.4, vs_consenso: null },
    ],
    ultima_presentacion: 'En la conferencia del 31-jul-2026 (1T FY27) la dirección dio un objetivo de ingresos de FY2027 de unos 560.000 M INR sin Vivo, con un volumen de móviles plano en ≈ 32 M de unidades (7,5 M en el 1T y 9-9,2 M esperados en el 2T), frente a los 40-42 M que llegó a anunciar para FY2026 [13]. Explicó que la memoria (DRAM y NAND) ha encarecido los móviles baratos, que son su mercado, y que las marcas fabrican menos [13, 14]. Sobre el margen, dijo que FY2027 no mejorará y que la mejora vendrá en FY2028 con los componentes (pantallas con HKC, cámaras con Q Tech) [13]. La JV con Vivo (51 % Dixon) añadiría 20-22 M de unidades al año, unos 300.000 M INR de ingresos a pleno ritmo, a partir del 2S FY27 [13]. Lo que se preguntó y no se aclaró del todo: si hace falta además la aprobación china para la JV, cuánto margen deja Vivo a Dixon y cuándo se cobra el PLI pendiente de Padget [13, 6]. El 1T dejó un beneficio ajustado tras minoritarios de 2.180 M (−3 %), con un margen operativo del 3,0 % [9].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [{ anio: 'FY2027', importe: 1078 }, { anio: 'FY2028+', importe: 3597 }],
    liquidez: 'A 30-jun-2026: caja, bancos e inversiones a corto de 8.050 M INR frente a 5.790 M de deuda financiera (caja neta de 2.260 M, sin arrendamientos) [9]. A 31-mar-2026, 12.414 M de caja frente a 4.675 M de deuda [1]. Rating ICRA AA (Stable) / A1+, confirmado el 6-ene-2026 [16].',
    rating: 'ICRA AA (Stable) / A1+',
    coste_deuda_pct: 8.5,
    vida_media_anios: null,
    otros_pasivos: 'Lo relevante fuera de la deuda es el incentivo PLI de Padget Electronics (filial de móviles): a 31-mar-2026 hay una cuenta a cobrar del Gobierno de 11.100 M y un pasivo frente al cliente de 7.263 M (6.040 M a 30-jun-2026), porque parte del incentivo se traslada a la marca; la exposición neta es de unos 5.060 M antes de impuestos [1, 5]. El auditor (S N Dhawan & Co LLP) incluye un párrafo de énfasis sobre ese cobro, que depende de que el Gobierno reconozca el exceso sobre el techo de otros beneficiarios (nota 59 a) [1]. Sin pensiones relevantes. Proveedores de 107.222 M a marzo: el negocio se financia con ellos (circulante de −8 días) [1, 10].',
    comentario: 'Balance de caja neta y muy apalancado en proveedores. Con unas ventas de 488.728 M, el circulante comercial (existencias 38.365 M + clientes 65.299 M − proveedores 107.222 M) es negativo, −3.558 M a marzo de 2026 [1]. Por eso un ROCE del 45 % convive con un margen operativo del 3,8 % [10]. El riesgo del balance es la cuenta a cobrar del PLI (11.100 M, el 24 % del patrimonio atribuido) y la concentración: tres clientes suman cada uno más del 10 % de la cartera de clientes [1]. A 30-jun-2026 la caja neta bajó a 2.260 M por el circulante del 1T (flujo operativo de −3.410 M) [9].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo pasó de 2.727 M en FY2022 a 17.823 M en FY2026 [4, 1]. El capex creció con las fábricas de móviles: 4.206 M en FY2022 y 10.675 M en FY2026 (2,2 % de las ventas) [1]. El flujo de caja libre (operativo − capex − arrendamientos) fue de 6.288 M en FY2026; la empresa da 7.240 M con su definición [10]. Estimación propia: capex de mantenimiento cercano a la amortización (≈ 0,8 % de las ventas); el resto es ampliación (Noida, Chennai, componentes). En FY2026 la caja también vino de vender acciones de Aditya Infotech (6.583 M) y de las aportaciones de los socios minoritarios; se fue en Q Tech (4.305 M) y dividendos (1.178 M) [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'S N Dhawan & Co LLP',
    anios_auditor: 8,
    opinion: 'Favorable con párrafo de énfasis (cobro del PLI de Padget, nota 59 a)',
    comentario: 'El auditor externo es S N Dhawan & Co LLP, que en la junta de 2023 empezó su segundo mandato de cinco años (el primero arrancó en 2018) para un segundo mandato de cinco años hasta la junta de 2028 [1]. Opinión favorable sobre FY2026 con un párrafo de énfasis: el cobro del incentivo PLI de Padget (11.100 M a cobrar) depende de que el Gobierno acepte la reasignación del techo no usado por otros beneficiarios [1]. Auditoría interna de EY y Deloitte (móviles). Criterios a vigilar: (1) las plusvalías de Aditya Infotech hinchan el beneficio publicado de FY2025, FY2026 y 1T FY27 [1, 5]; (2) el BPA publicado incluye a los minoritarios, que ya se llevan el 19,5 % del beneficio ajustado [10]; (3) los pagos en acciones son altos para un fabricante por encargo (748,6 M de valor de opciones del vicepresidente en FY2026) [1]; (4) las provisiones de clientes son mínimas (95,6 M dotados en FY2026 sobre 65.299 M de cartera) [1].',
    senales: [
      { senal: 'Cuenta a cobrar del PLI pendiente de reconocimiento del Gobierno (párrafo de énfasis)', nivel: 'Media', comentario: '11.100 M a cobrar y 6.040 M a devolver al cliente (jun-26); neto ≈ 5.060 M [1, 5].' },
      { senal: 'Beneficio publicado con plusvalías de una participación cotizada', nivel: 'Media', comentario: 'Aditya Infotech: 4.600 M en FY2025, 6.708 M en FY2026 y 5.190 M en el 1T FY27 [1, 5].' },
      { senal: 'BPA publicado antes de minoritarios', nivel: 'Baja', comentario: 'El ajustado tras minoritarios de FY2026 es 138,4 INR frente a 269,35 publicado [10].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo pequeño y creciente: 2 INR por acción en FY2022, 3 en FY2023, 5 en FY2024, 8 en FY2025 y 10 en FY2026 (pagado tras la junta de septiembre de 2026), entre el 4 % y el 7 % del beneficio ajustado [1]. Sin recompras. La prioridad es invertir: fábricas, componentes (pantallas, cámaras, baterías) y JV con marcas chinas y taiwanesas para cumplir las normas de inversión china (Press Note 3) [1, 13]. Las opciones sobre acciones diluyen un 0,5-1 % al año [1].',
    adquisiciones: [
      { anio: 'FY2025', objetivo: 'Ismartu India (50,1 %; móviles de Transsion)', importe: 3209.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aporta el cliente Transsion y exportaciones [2].' },
      { anio: 'FY2026', objetivo: 'Q Tech India (51 %; módulos de cámara)', importe: 5530, ev_ebitda: null, financiacion: 'Caja (428 + 125 cr)', resultado: 'Fondo de comercio de 5.230 M; base de componentes [1].' },
      { anio: 'FY2027', objetivo: 'Adivistar (51 %, JV con Vivo India)', importe: 25.5, ev_ebitda: null, financiacion: 'Aportación de capital inicial', resultado: 'Constituida el 13-ago-2026; debe sumar 20-22 M de móviles al año [13].' },
    ],
    comentario: 'La asignación de capital es razonable: el ROCE se mantiene en el 45-49 % porque el crecimiento se financia con proveedores, y las compras son pequeñas y de componentes [10]. El coste está en la estructura: casi todo lo nuevo se hace en JV con un socio chino o taiwanés (Longcheer 26 %, HKC 26 %, Vivo 49 %, Q Tech 49 %, Gemtek 40 %), así que una parte creciente del beneficio va a minoritarios [1, 13]. La plusvalía de Aditya Infotech (salida a bolsa en julio de 2025) es una buena inversión no recurrente [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Móviles y EMS', descripcion: 'Smartphones y teléfonos básicos para terceros, informática (portátiles), telecomunicaciones, wearables y componentes', tipo_resultado: 'EBITDA', historico: [
        { periodo: 'FY2024', ingresos: 109190, resultado: null }, { periodo: 'FY2025', ingresos: 330430, resultado: 11530 }, { periodo: 'FY2026', ingresos: 442570, resultado: 15530 } ] },
      { nombre: 'Electrónica de consumo', descripcion: 'Televisores LED y sus placas, monitores', tipo_resultado: 'EBITDA', historico: [
        { periodo: 'FY2024', ingresos: 41480, resultado: null }, { periodo: 'FY2025', ingresos: 35900, resultado: 1440 }, { periodo: 'FY2026', ingresos: 28920, resultado: 1430 } ] },
      { nombre: 'Electrodomésticos', descripcion: 'Lavadoras semiautomáticas y automáticas, frigoríficos', tipo_resultado: 'EBITDA', historico: [
        { periodo: 'FY2024', ingresos: 7870, resultado: null }, { periodo: 'FY2025', ingresos: 13660, resultado: 1500 }, { periodo: 'FY2026', ingresos: 14260, resultado: 1580 } ] },
      { nombre: 'Otros (iluminación hasta su traspaso y ajustes)', descripcion: 'Iluminación LED (traspasada a la JV con Signify en FY2026) y diferencias', tipo_resultado: null, historico: [
        { periodo: 'FY2024', ingresos: 18369, resultado: null }, { periodo: 'FY2025', ingresos: 8611, resultado: null }, { periodo: 'FY2026', ingresos: 2978, resultado: null } ] },
    ],
    geografias: [
      { nombre: 'India', peso_pct: 88.9 },
      { nombre: 'Exportación', peso_pct: 11.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Volumen de smartphones (millones de unidades)', valor_anterior: '≈ 32 (FY2026)', valor_actual: '7,5 (1T FY27); FY2027 plano en ≈ 32', variacion: 'Plano; guía previa de 40-42 M', comentario: 'Sin Vivo [13].' },
      { kpi: 'Margen operativo del grupo', valor_anterior: '3,8 % (1T FY26)', valor_actual: '3,0 % (1T FY27)', variacion: '−0,8 puntos', comentario: 'Fin del PLI de móviles y memoria [9].' },
      { kpi: 'Margen operativo de Móviles y EMS', valor_anterior: '3,5 % (FY2026)', valor_actual: '2,6 % (1T FY27)', variacion: '−0,9 puntos', comentario: '[9, 10]' },
      { kpi: 'ROCE del grupo', valor_anterior: '48,5 % (FY2025)', valor_actual: '44,8 % (FY2026)', variacion: '−3,7 puntos', comentario: 'Antes de impuestos, definición de la empresa [10].' },
      { kpi: 'Circulante (días)', valor_anterior: '−5 (FY2025)', valor_actual: '−8 (FY2026)', variacion: '−3 días', comentario: '[10]' },
      { kpi: 'Exportaciones (millones de INR)', valor_anterior: '≈ 54.200 (FY2026, 11,1 %)', valor_actual: '11.000 (1T FY27)', variacion: null, comentario: '[1, 13]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Comparación con el consenso de cada trimestre', tipo: 'Complemento', intentos: '1) MarketScreener (solo consenso vigente); 2) presentaciones (no lo dan); 3) prensa de cada publicación (cifras dispares entre medios)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Resultado de las divisiones de FY2022-FY2024', tipo: 'Complemento', intentos: '1) Informes anuales (un solo segmento contable, «Electronics Goods»); 2) presentaciones de 4T de cada año (no descargadas las de FY2024); 3) prensa', decision: 'Omitido; ingresos de FY2024 del informe de gestión' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Integrated Annual Report 2025-26: informe de gestión (mercado indio de electrónica y EMS según KPMG, producción de electrónica), divisiones y estrategia', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-09', url: URL.ar26 },
  { id: 2, titulo: 'India’s Electronic Manufacturing Services (EMS) opportunity: EMS indio de 40-45 mil M USD en FY2025 a más de 150 mil M en FY2030 (+25 % anual)', editor: 'KPMG India', tipo: 'Sectorial', fecha: '2026-06', url: 'https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2026/06/indias-electronic-manufacturing-services-ems-opportunity.pdf' },
  { id: 3, titulo: 'Electronic manufacturing services in India (EMS de 10-12 mil M USD en FY2020 a 40-45 mil M en FY2025; escenarios a 2035)', editor: 'Kotak Mahindra AMC', tipo: 'Sectorial', fecha: '2026-07-23', url: 'https://www.kotakmf.com/Information/blogs/electronic-manufacturing-services-india' },
  { id: 4, titulo: 'Fichas de Kaynes, Amber, Syrma SGS, PG Electroplast, Avalon, Hon Hai, Jabil, Flex y Celestica (ventas y márgenes de los últimos doce meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/KAYNES.NS' },
  { id: 5, titulo: 'Earnings Presentation 4T FY26: divisiones, cuota y clientes', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-05-12', url: URL.pres4q26 },
  { id: 6, titulo: 'Transcripción del 1T FY27: volúmenes, memoria, Vivo, componentes', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-07-31', url: URL.tr1q27 },
  { id: 7, titulo: 'Annual Report 2023-24: historia, divisiones e ingresos por división de FY2024', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2024-08', url: URL.ar24 },
  { id: 8, titulo: 'Anuncio a la NSE: aprobación de la Press Note 3 para la JV con HKC (pantallas)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-03-09', url: `${N}/DIXON_09032026193414_Regulation30DisclosurePN3.pdf` },
  { id: 9, titulo: 'Anuncio a la NSE: JV 60:40 con Gemtek Technology (transceptores ópticos)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-10-07', url: `${N}/DIXON_07102026150006_Regulation30_DisclosureGemtek07102026.pdf` },
  { id: 10, titulo: 'Integrated Annual Report 2025-26: BRSR y calificaciones ESG (DJSI 76, NSE Sustainability 69, SES 63,7)', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-09', url: URL.ar26 },
  { id: 11, titulo: 'Anuncio a la NSE: multa de GST de 15,6 lakh', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-05-08', url: `${N}/DIXON_08052026193006_Reg30DisclosurePenalty08052026.pdf` },
  { id: 12, titulo: 'Anuncios a la NSE: aclaración de las protestas laborales de Noida (13-abr-2026) y Dehradun (15-may-2026)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-05-15', url: `${N}/DIXON_13042026184056_Reg_30_DIsclosure_Clarification_on_Labour_issues_Noida.pdf` },
];
const ninr = (s, v) => Math.round(v * FX[s] / 1e6);
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Dixon nació en 1993 en Noida, fundada por Sunil Vachani, para montar televisores en color por encargo [7]. Durante veinte años fabricó para marcas televisores, lavadoras, iluminación LED y decodificadores, siempre con márgenes estrechos y con una estrategia de «fabricante de diseño propio» (ODM) en algunas líneas [7]. Salió a bolsa en la NSE y la BSE en septiembre de 2017. El giro llegó con el plan de incentivos a la producción (PLI) de móviles de 2020: Padget Electronics, su filial, se convirtió en uno de los grandes ensambladores de smartphones de India para Motorola, Xiaomi, Transsion (a través de Ismartu), Oppo (a través de la JV con Longcheer) y Google [1, 7]. Las ventas se multiplicaron por siete entre FY2021 y FY2026. Desde 2025 busca subir en la cadena de valor con componentes (pantallas con HKC, cámaras con Q Tech, ópticos con Gemtek) y con JV con marcas chinas, que necesitan autorización del Gobierno (Press Note 3) [1, 8, 9].',
    hitos: [
      { anio: '1993', hito: 'Fundación por Sunil Vachani en Noida (televisores) [7].' },
      { anio: '2017', hito: 'Salida a bolsa en la NSE y la BSE (septiembre) [7].' },
      { anio: '2020', hito: 'Aprobado en el PLI de móviles con Padget Electronics [7].' },
      { anio: '2023', hito: 'Ventas por encima de 120.000 M INR; móviles ya mayoría [7].' },
      { anio: '2024', hito: 'Compra del 50,1 % de Ismartu (Transsion); JV con Longcheer [1].' },
      { anio: '2025', hito: 'Compra del 51 % de Q Tech; salida a bolsa de Aditya Infotech (participada); iluminación a la JV con Signify [1].' },
      { anio: '2026', hito: 'Aprobaciones PN3 para HKC (marzo) y Vivo (julio); JV Adivistar con Vivo (agosto); JV con Gemtek (octubre) [1, 8, 9].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Dixon es el mayor fabricante de electrónica por encargo de India. Monta para marcas, en fábricas propias de Noida, Tirupati, Chennai y Dehradun, smartphones y teléfonos básicos (Motorola, Transsion, Xiaomi, Oppo, Google, Vivo desde 2026), portátiles, televisores LED, lavadoras y frigoríficos, y cada vez más componentes (placas, módulos de cámara, pantallas) [1, 5]. En FY2026 los móviles y la electrónica para terceros (EMS) fueron el 91 % de las ventas, la electrónica de consumo el 6 % y los electrodomésticos el 3 % [5]. El 89 % se vende en India; el 11 % se exporta [1]. Los clientes son marcas que diseñan el producto y le compran el montaje con los componentes incluidos.',
    como_gana_dinero: 'Cobra por fabricar: el precio incluye el coste de los componentes (que el cliente fija o aprueba) y un margen de montaje pequeño. Por eso el margen EBITDA es del 3-4 % y el margen bruto del 7-8 %, pero el capital que necesita es bajo: las fábricas son de montaje y los proveedores financian las existencias (circulante de −8 días) [1, 5]. El beneficio depende del volumen y de la utilización de las líneas; el incentivo PLI añadía 50-70 puntos básicos al margen de los móviles hasta marzo de 2026 [6]. Casi nada es recurrente por contrato: los clientes renuevan modelo a modelo. Estacionalidad: el 2T (julio-septiembre) es el más fuerte por las fiestas indias (Diwali), y el 4T el más flojo [5].',
    clientes: 'Pocos clientes grandes. Tres pesan más del 10 % de la cartera a cobrar cada uno [1]; por volumen, Motorola es el mayor, seguido de Transsion (Ismartu), Xiaomi y Oppo/Longcheer; Vivo entra en el 2S FY27 con el 51 % de Dixon [6]. La pérdida o la caída de un cliente mueve las ventas (Motorola bajó sus volúmenes domésticos en FY2026) [6]. Poder de precios: bajo; el cliente negocia el margen de montaje y se lleva parte del PLI (por eso hay 6.040 M a devolver a un cliente) [1]. Lo que retiene al cliente es la escala, la homologación y la capacidad de cumplir las normas de inversión china en India, no el precio.',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de fabricación de electrónica por encargo (EMS) en India, sobre todo móviles, que es lo que hace Dixon. KPMG lo cifra en 40-45 mil M USD en FY2025 y en más de 150 mil M en FY2030, con un crecimiento de más del 25 % anual [1, 2]; Kotak recoge la misma serie (10-12 mil M USD en FY2020) [3]. La producción total de electrónica en India fue de 11,3 lakh crore INR en FY2025, con un objetivo oficial de 27,7 lakh crore en FY2028 [1]. Usamos el EMS de KPMG como mercado final, con un crecimiento del 25 % que tomamos como techo.',
    tamano: '≈ 45.000 M USD (EMS en India, FY2025) [2]',
    unidad_serie: 'millones de USD',
    serie: [
      { anio: 'FY2020', tamano: 11000 }, { anio: 'FY2025', tamano: 45000 }, { anio: 'FY2030e', tamano: 150000 },
    ],
    tcac_historico_pct: 32.5,
    tcac_previsto_pct: 25.0,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Política industrial: PLI, PLI 2.0 de componentes y aranceles a la importación', efecto: '+/−', horizonte: 'Estructural', evidencia: 'El PLI de móviles terminó en marzo de 2026 (−50-70 pb de margen); se discute un plan de móviles de 62.500 crore [1, 6].' },
      { driver: '«China + 1»: marcas que trasladan montaje a India', efecto: '+', horizonte: 'Estructural', evidencia: 'Los móviles pasaron del puesto 153 al primer producto de exportación de India en diez años [1].' },
      { driver: 'Precio de la memoria (DRAM/NAND)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Encarece los móviles baratos; volumen de Dixon plano en FY2027 [6].' },
      { driver: 'Externalización de las marcas chinas por la Press Note 3', efecto: '+', horizonte: 'Estructural', evidencia: 'JV aprobadas con HKC (marzo de 2026) y Vivo (julio de 2026) [8, 1].' },
      { driver: 'Consumo indio de electrónica', efecto: '+', horizonte: 'Cíclico', evidencia: 'Mercado de electrónica de 185 mil M USD en FY2025 y 415 mil M en FY2030 según KPMG [1, 2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Foxconn, Tata Electronics y Pegatron (Apple), Bhagwati (Micromax) que crece con Longcheer, y las propias marcas (Samsung, Vivo antes de la JV) [6].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Cinco marcas concentran casi todo el volumen y se quedan parte del incentivo PLI [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Memoria, chips y pantallas importados; la subida de la memoria en 2026 frenó los volúmenes [6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La escala y la homologación protegen, pero el capital necesario es bajo.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La alternativa es que la marca monte ella misma (Samsung, Vivo antes de 2026).' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El mercado sigue creciendo más del 20 % al año, pero el ciclo del móvil barato está en pausa por la memoria: los volúmenes de Dixon serán planos en FY2027 [6]. En la pandemia (FY2021) las ventas de Dixon crecieron un 46 % [4 de la nota A]. Indicadores: producción de móviles en India, precio de la DRAM y aprobaciones PN3.' },
    regulacion: 'Muy dependiente del Gobierno. (1) PLI de móviles (2020-2026) terminado; PLI 2.0 de componentes (ECMS) con aprobaciones a Dixon para cámaras y pantallas [1]. (2) Press Note 3 (2020): toda inversión de países con frontera terrestre (China) necesita autorización; Dixon la obtuvo para HKC y Vivo [8]. Desde el 1-jul-2026 China también exige aprobación a sus empresas que invierten fuera, lo que podría retrasar la JV con Vivo. (3) Aranceles a la importación de móviles y componentes.',
    tendencias: 'Tres. (1) Integración hacia componentes (pantallas, cámaras, baterías) para capturar más margen y el PLI 2.0 [1]. (2) Las marcas chinas ceden fábricas a socios indios para cumplir las normas y el Gobierno lo empuja [8]. (3) Diversificación hacia telecomunicaciones, servidores y ópticos (Gemtek) [9]. La inteligencia artificial entra en la planta (inspección visual, mantenimiento) y en la demanda (servidores y equipos ópticos para centros de datos), no en el producto que hoy monta Dixon.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 11.0,
    posicion: 'Primer fabricante por encargo de India que no trabaja para Apple; estimación propia del 11 % del mercado EMS indio de FY2025 (ventas de 388.601 M INR ≈ 4.600 M USD frente a 40-45 mil M) [2, nota A]. Líder en televisores y lavadoras semiautomáticas por encargo y segundo exportador de móviles no Apple [7].',
    competidores: [
      { nombre: 'Kaynes Technology', pais: 'India', ticker: 'KAYNES.NS', ingresos: ninr('INR', 38989049856), cuota_pct: null, margen_ebit_pct: 11.7, comentario: 'EMS industrial y de automoción, más margen [4].' },
      { nombre: 'Amber Enterprises', pais: 'India', ticker: 'AMBER.NS', ingresos: ninr('INR', 126250688512), cuota_pct: null, margen_ebit_pct: 5.2, comentario: 'Aire acondicionado y electrónica por encargo [4].' },
      { nombre: 'Syrma SGS', pais: 'India', ticker: 'SYRMA.NS', ingresos: ninr('INR', 54636969984), cuota_pct: null, margen_ebit_pct: 8.8, comentario: 'EMS diversificado [4].' },
      { nombre: 'PG Electroplast', pais: 'India', ticker: 'PGEL.NS', ingresos: ninr('INR', 58181287936), cuota_pct: null, margen_ebit_pct: 6.0, comentario: 'Electrodomésticos por encargo; competidor en lavadoras y aire [4].' },
      { nombre: 'Hon Hai (Foxconn)', pais: 'Taiwán', ticker: '2317.TW', ingresos: ninr('TWD', 9310748803072), cuota_pct: null, margen_ebit_pct: 3.8, comentario: 'El mayor del mundo; monta iPhone en India [4].' },
      { nombre: 'Jabil', pais: 'EE. UU.', ticker: 'JBL', ingresos: ninr('USD', 35953999872), cuota_pct: null, margen_ebit_pct: 5.9, comentario: '[4]' },
      { nombre: 'Flex', pais: 'EE. UU. / Singapur', ticker: 'FLEX', ingresos: ninr('USD', 29266999296), cuota_pct: null, margen_ebit_pct: 5.0, comentario: '[4]' },
      { nombre: 'Bhagwati Products (Micromax)', pais: 'India', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; crece con volúmenes de Longcheer.' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No aplica a un fabricante por encargo.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Homologación de líneas y JV con la marca (Vivo, Longcheer) que atan al cliente unos años [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Aprobaciones PN3 y del PLI 2.0, difíciles de conseguir [8].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala: el mayor volumen no Apple de India; circulante negativo [5].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Hay sitio para varios grandes y el capital necesario es bajo.' },
      ],
    },
    amenazas: 'Lo más probable es la presión de margen: los clientes negocian cada modelo y reparten el volumen entre varios montadores (Longcheer da volumen también a Bhagwati) [6]. Segundo, que las marcas reduzcan producción en India por la memoria o la demanda (volumen plano en FY2027) [6]. Tercero, que el Gobierno o China frenen las JV (la de Vivo necesitó un año de trámites) [1]. Foxconn y Tata compiten por clientes no Apple con más capital.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'S&P Global CSA (DJSI)', calificacion: '76/100', fecha: '2026' },
      { agencia: 'NSE Sustainability Ratings & Analytics', calificacion: '69/100', fecha: '2026' },
      { agencia: 'SES ESG Research', calificacion: '63,7/100', fecha: '2026' },
    ],
    materialidad: 'Lo material es social y de gobierno: (1) mano de obra: miles de trabajadores temporales (más de 7.000 en la matriz) y protestas salariales en Noida (abril) y Dehradun (mayo de 2026), sin impacto material según la empresa [10, 12]; (2) cadena de suministro con componentes chinos y normas de inversión; (3) residuos electrónicos (100 % reciclado por terceros autorizados) [10].',
    controversias: 'Multa de GST de 15,6 lakh (mayo de 2026) [11]; protestas laborales en Noida y Dehradun en 2026 [12]. Sin litigios materiales.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'Cuotas de mercado y CR5', tipo: 'Complemento', intentos: '1) Informe anual (no da cuotas); 2) KPMG (solo tamaño); 3) prensa (cifras de unidades sin fuente primaria)', decision: 'Omitido; cuota estimada' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Integrated Annual Report 2025-26: informe de gobierno corporativo (consejo, comisiones, asistencia), remuneración de consejeros, informe secretarial y auditor', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-09', url: URL.ar26 },
  { id: 2, titulo: 'Accionariado trimestral a 30-sep-2026 y 30-sep-2025 (XBRL de la NSE)', editor: 'NSE India', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.nseindia.com/get-quotes/equity?symbol=DIXON' },
  { id: 3, titulo: 'Anuncio a la NSE: resultados de la junta del 28-sep-2026 (reelección de Sunil Vachani y Atul B. Lall para 2027-2032)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-09-29', url: `${N}/DIXON_29092026182828_Regulation30DisclosureAGM28092026.pdf` },
  { id: 4, titulo: 'Anuncio a la NSE: nombramiento de Saurabh Gupta como consejero de finanzas (votación postal, 23-dic-2025)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2025-12-23', url: `${N}/DIXON_23122025173234_Regulation30DisclosureAppointment23122025.pdf` },
  { id: 5, titulo: 'Anuncio a la NSE: jubilación de K K Kaul (alta dirección)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-06-30', url: `${N}/DIXON_30062026215609_ChangeinSeniorManagementMrKKKaul_30062026.pdf` },
  { id: 6, titulo: 'Transcripciones de 3T FY26, 4T FY26 y 1T FY27 (guías de volumen y de ingresos)', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-07-31', url: URL.tr1q27 },
  { id: 7, titulo: 'Earnings Presentation 1T FY26 y 2T FY26 (guías de FY2026)', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2025-10-17', url: URL.pres2q26 },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Sunil Vachani', cargo: 'Presidente ejecutivo y fundador', desde: '1993', participacion_pct: 21.67, trayectoria: 'Fundó la empresa en 1993; presidente ejecutivo. Controla el grupo promotor (28,5 %), en gran parte a través de fideicomisos familiares (PSV Trust 15,45 %, KSV Trust 3,86 %) y de su familia [1, 2]. Reelegido para 2027-2032 [3].' },
      { nombre: 'Atul B. Lall', cargo: 'Vicepresidente y consejero delegado', desde: '2000', participacion_pct: 3.18, trayectoria: 'Consejero desde junio de 2000 y primer ejecutivo; artífice del giro a los móviles. Reelegido para 2027-2032 [1, 3].' },
      { nombre: 'Saurabh Gupta', cargo: 'Consejero de finanzas (director financiero)', desde: '2025', participacion_pct: 0.0, trayectoria: 'Director financiero; consejero ejecutivo desde el 17-oct-2025 [4].' },
      { nombre: 'Manoj Maheshwari', cargo: 'Consejero externo no independiente', desde: '2025', participacion_pct: 0.0, trayectoria: 'Nombrado el 3-may-2025 por cinco años [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: '40-42 M de smartphones (2025)', real: '≈ 32 M', cumplida: 'No' },
      { anio: 'FY2026', guia: 'Margen estable con el PLI', real: 'Margen operativo del 3,8 % (3,9 % en FY2025)', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ingresos de ≈ 560.000 M INR sin Vivo y volumen plano (31-jul-2026)', real: '1T: 155.477 M (+21 %)', cumplida: 'En curso' },
    ],
    comentario: 'Equipo estable y fundador al mando: Vachani y Lall llevan más de 25 años juntos y la junta los ha reelegido hasta 2032 [3]. La ejecución industrial es buena (siete veces más ventas en cinco años sin perder el ROCE), pero las guías de volumen de móviles fallaron en FY2026 (32 M frente a 40-42 M) y la de la JV con Vivo se retrasó un año [6, 7]. Primer cambio en finanzas en 2025 (Saurabh Gupta) y jubilación de K K Kaul en junio de 2026 [4, 5]. No hay plan de sucesión publicado.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Sunil Vachani', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '1993', comisiones: null },
      { nombre: 'Atul B. Lall', cargo: 'Vicepresidente y consejero delegado', tipo: 'Ejecutivo', desde: '2000', comisiones: null },
      { nombre: 'Saurabh Gupta', cargo: 'Consejero de finanzas', tipo: 'Ejecutivo', desde: '2025', comisiones: null },
      { nombre: 'Manoj Maheshwari', cargo: 'Consejero externo', tipo: 'Otro externo', desde: '2025', comisiones: null },
      { nombre: 'Arun Seth', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (presidente)' },
      { nombre: 'Geeta Mathur', cargo: 'Consejera independiente', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Rakesh Mohan', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Keng Tsung Kuo', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 818.9, fijo: 40.8, variable_corto: 29.5, variable_largo: 748.6, ratio_salario_medio: null },
    remuneracion: 'En FY2026 el vicepresidente y consejero delegado, Atul B. Lall, recibió 818,9 M INR: 40,8 M de sueldo fijo, 29,5 M de comisión sobre beneficios y 748,6 M de valor de opciones ejercidas [1]. El presidente, Sunil Vachani, cobró 72,2 M (42,7 M fijo y 29,5 M de comisión) y el consejero de finanzas 265,7 M (185,0 M en opciones) [1]. No hay bonus ligado a objetivos: el variable es una comisión sobre el beneficio y opciones sobre acciones, y la junta aprobó en 2025 pagar a Vachani y Lall por encima de los límites de la ley de sociedades [1]. La mediana del consejo (7 personas) es de 2,6 M INR [1].',
    accionistas: [
      { nombre: 'Grupo promotor (Sunil Vachani, fideicomisos PSV y KSV, Gayatri Vachani, Suresh Vaswani)', pct: 28.5, tipo: 'Fundador', variacion: '28,92 % un año antes; la caída es dilución por opciones [2]' },
      { nombre: 'Kamla Vachani (familia, fuera del grupo promotor)', pct: 6.17, tipo: 'Familia', variacion: '6,28 % un año antes [2]' },
      { nombre: 'Atul B. Lall', pct: 3.18, tipo: 'Directivo', variacion: '3,25 % un año antes [2]' },
      { nombre: 'Fondos de inversión indios', pct: 19.26, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Inversores extranjeros (FPI)', pct: 18.96, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Aseguradoras y fondos de pensiones', pct: 8.91, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Minoristas y no residentes', pct: 15.0, tipo: 'Flotante', variacion: '[2]' },
    ],
    insiders: [],
    control_y_defensas: 'El fundador y su familia tienen el 28,5 % como grupo promotor, más un 6,17 % de Kamla Vachani y el 3,18 % del consejero delegado: unos 38 % entre familia y dirección [2]. De hecho, la familia Vachani controla la junta y elige al presidente (que es Sunil Vachani). No hay acciones de voto múltiple ni blindajes; en India una OPA obligatoria salta al 25 %. Cuatro de los ocho consejeros son independientes y presiden auditoría [1].',
    alertas: [
      'Remuneración del consejero delegado de 818,9 M INR en FY2026, casi toda en opciones, y aprobada por encima de los límites legales [1].',
      'Presidente ejecutivo fundador; las comisiones de auditoría y nombramientos las presiden independientes [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Votos de la junta de 2026 sobre la remuneración', tipo: 'Complemento', intentos: '1) Anuncio de resultados de la junta en la NSE (resumen sin porcentajes por punto); 2) informe de escrutinio (no localizado en la NSE); 3) prensa', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'Fecha de entrada de los independientes', tipo: 'Complemento', intentos: '1) Informe de gobierno (da cargos, no fechas); 2) web de la empresa; 3) anuncios de la NSE (solo los de 2025-2026)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de DIXON.NS y del Nifty 50 (^NSEI); cierres de cada ejercicio, beta y volatilidad', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/DIXON.NS' },
  { id: 2, titulo: 'Dixon Technologies: consenso FY2027-FY2029 (ventas, EBITDA, EBIT, beneficio, BPA, DPA), 27 analistas y objetivos', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://in.marketscreener.com/quote/stock/DIXON-TECHNOLOGIES-INDIA-42739483/finances/' },
  { id: 3, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas y EBITDA de los últimos doce meses, estimaciones de BPA)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/KAYNES.NS' },
  { id: 4, titulo: 'Long-Term Government Bond Yields: 10-year for India (INDIRLTLT01STM), septiembre de 2026: 7,06 %', editor: 'OECD vía FRED (Federal Reserve Bank of St. Louis)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/INDIRLTLT01STM' },
  { id: 5, titulo: 'Tipos de cambio USDINR (94,915), TWDINR (2,921) y HKDINR (12,0965), 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/USDINR=X' },
  { id: 6, titulo: 'Implied ERP by month: octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Aditya Infotech (CPPLUS.NS): precio de 4.010 INR y 122,63 M de acciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/CPPLUS.NS' },
  { id: 8, titulo: 'Integrated Annual Report 2025-26 (compra de Q Tech, participación en Aditya, JV)', editor: 'Dixon Technologies (India) Ltd', tipo: 'Primaria', fecha: '2026-09', url: URL.ar26 },
  { id: 9, titulo: 'Anuncio a la NSE: aportación a Adivistar (JV con Vivo India, 51 %)', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-09-21', url: `${N}/DIXON_21092026184010_AcquisitionAdivistarFinal21092026.pdf` },
  { id: 10, titulo: 'Business Today: «Dixon Technologies shares fall from 52-week high; mixed views on outlook, price targets» (CLSA infraponderar con 10.400 INR)', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-06-25', url: 'https://www.businesstoday.in/markets/stocks/story/dixon-technologies-shares-fall-from-52-week-high-mixed-views-on-outlook-price-targets-539076-2026-06-25' },
  { id: 11, titulo: 'Business Today: Nomura ve un 50 % de potencial tras la aprobación de la JV con HKC', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-03-10', url: 'https://www.businesstoday.in/amp/markets/stocks/story/dixon-tech-share-price-target-nomura-sees-50-upside-after-hkc-display-jv-approval-519805-2026-03-10' },
  { id: 12, titulo: 'Anuncio a la NSE: aclaración sobre la noticia de la aprobación de la JV con Vivo', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-06-17', url: `${N}/DIXON_17062026133723_Reg30NewsVerificationNSE.pdf` },
  { id: 13, titulo: 'Anuncio a la NSE: aprobación PN3 de la JV con Vivo India', editor: 'Dixon Technologies (India) Ltd / NSE', tipo: 'Primaria', fecha: '2026-07-09', url: `${N}/DIXON_09072026203710_AnnouncemnetPN309072026Final.pdf` },
  { id: 14, titulo: 'Angel One: Dixon firma la JV con Gemtek; la acción a 12.990 INR el 7-oct', editor: 'Angel One', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.angelone.in/news/stocks/dixon-technologies-share-price-in-focus-signs-jv-agreement-with-gemtek-to-manufacture-telecom-products' },
  { id: 15, titulo: 'Baroda BNP Paribas: Dixon Technologies, revisión del 4T FY26 (Mantener, 11.200 INR; recorte de estimaciones por la memoria y el retraso de Vivo)', editor: 'Baroda BNP Paribas', tipo: 'Analistas', fecha: '2026-05-13', url: 'https://www.barodaetrade.com/Reports/DixonTechnologies-Q4FY26ResultReview13May26-Research.pdf' },
];
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
// Peso del ejercicio en curso en los próximos 12 meses desde el 19-oct-2026: meses que le quedan ÷ 12.
const PESO0 = { 3: 5.4 / 12, 12: 2.4 / 12, 8: 10.4 / 12 };
const nombres = {
  'KAYNES.NS': ['Kaynes Technology', 'IN', 3], 'AMBER.NS': ['Amber Enterprises', 'IN', 3], 'SYRMA.NS': ['Syrma SGS', 'IN', 3], 'PGEL.NS': ['PG Electroplast', 'IN', 3], 'AVALON.NS': ['Avalon Technologies', 'IN', 3],
  '2317.TW': ['Hon Hai (Foxconn)', 'TW', 12], JBL: ['Jabil', 'US', 8], FLEX: ['Flex', 'US', 3], CLS: ['Celestica', 'CA', 12],
};
const comparables = Object.entries(nombres).map(([s, [nombre, pais, mes]]) => {
  const v = raw[s]; const p = v.price; const f = v.financialData; const k = v.defaultKeyStatistics;
  const fx = FX[p.currency];
  const tr = v.earningsTrend.trend; const e0 = tr.find((t) => t.period === '0y'); const e1 = tr.find((t) => t.period === '+1y');
  const w = PESO0[mes];
  const eps = w * e0.earningsEstimate.avg.raw + (1 - w) * e1.earningsEstimate.avg.raw;
  const rev = w * e0.revenueEstimate.avg.raw + (1 - w) * e1.revenueEstimate.avg.raw;
  const ebitda = f.ebitda?.raw; const ventas = f.totalRevenue?.raw;
  return {
    nombre, ticker: s, pais,
    capitalizacion: Math.round((p.marketCap.raw * fx) / 1e6),
    ev_ventas: r2(k.enterpriseValue.raw / ventas), ev_ebitda_ltm: r1(k.enterpriseValue.raw / ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(p.regularMarketPrice.raw / eps),
    crecimiento_pct: r1((rev / ventas - 1) * 100),
    margen_ebitda_pct: r1((ebitda / ventas) * 100),
    roic_pct: null,
    dn_ebitda: r2(((f.totalDebt?.raw ?? 0) - (f.totalCash?.raw ?? 0)) / ebitda),
    fcf_yield_pct: f.freeCashflow?.raw != null ? r1((f.freeCashflow.raw / p.marketCap.raw) * 100) : null,
  };
});
const cl = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Dixon Technologies (India) Ltd', nombre_corto: 'Dixon', ticker: 'DIXON', isin: 'INE935N01020', mercado: 'National Stock Exchange of India (NSE) y BSE', indice_referencia: 'Nifty 50',
    pais: 'India', pais_iso: 'IN', sector: 'Consumer Discretionary', industria: 'Household Durables', sede: 'Noida (Uttar Pradesh)', fundacion: '1993', empleados: null, web: 'https://www.dixoninfo.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 61.74, capitalizacion_publicada: 740164, free_float_pct: 61.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 4.611 M INR/día (3 meses; 332.976 acciones)', proximos_resultados: null,
  },
  consenso: {
    guidance: 'Para FY2027 la dirección da unos ingresos de ≈ 560.000 M INR sin Vivo, volumen de smartphones plano en ≈ 32 M y un margen sin mejora; la JV con Vivo sumaría 20-22 M de unidades al año a pleno ritmo (≈ 300.000 M INR) desde el 2S FY27 y los componentes mejorarían el margen en FY2028 (nota A [13]). No da guía de beneficio.',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 724802, ebitda: 22733, ebit: 18262, bpa: 183.1, dpa: 11.13, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2028e', ingresos: 982637, ebitda: 35252, ebit: 29462, bpa: 280.0, dpa: 14.86, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 1141132, ebitda: 44302, ebit: 37612, bpa: 354.9, dpa: 20.84, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 27, comprar: null, mantener: null, vender: null, po_medio: 14876.59, po_min: 8817, po_max: 17800 },
    revisiones: 'A la baja en los últimos tres meses. CLSA pasó a Infraponderar con 10.400 INR y JM Financial a Comprar con 14.200 INR el 25-jun [10]; Baroda BNP Paribas recortó el beneficio de FY2027-FY2028 por la memoria y el retraso de Vivo (Mantener, 11.200) [15]; Jefferies está en Mantener con 10.280 y Nomura en Comprar con 13.813 [2]. El consenso de BPA de MarketScreener (183,1 INR para FY2027e) parece incluir parte de la plusvalía de Aditya del 1T (el publicado del 1T fue 117,87 INR) [2].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción pasó de 2.861 INR (marzo de 2023) a un máximo de 16.999 INR el 20-oct-2025 y desde entonces ha caído un 29 %, hasta 12.100 [1]. En doce meses pierde un 27,5 % frente al −11 % del Nifty 50, pero en el año está plana frente al −12,4 % del índice [1]. Las caídas: diciembre de 2025 (ampliación de normas de importación y recortes de CLSA y Morgan Stanley), febrero-marzo de 2026 (memoria; mínimo de 9.600 el 30-mar) y septiembre-octubre de 2026 (CLSA prevé volúmenes un 14-16 % menores) [10]. Las subidas: aprobaciones de HKC (+11,3 % el 10-mar) y Vivo, y resultados del 4T (+9,7 % el 13-may) [11, 13].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((a) => ({ anio: a, precio_cierre: cl[a] ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Dixon siempre ha cotizado cara: entre 47 y 115 veces el beneficio ajustado del ejercicio siguiente al cierre de cada ejercicio (FY2021-FY2026), con 47 veces en marzo de 2023 como mínimo [1, nota A]. Hoy, a 12.100 INR, son 87 veces el beneficio ajustado de FY2026 y unas 37 veces el EBITDA de los últimos doce meses. Lo que ha cambiado: el beneficio ya no crece al 50-60 % anual (FY2027 plano), el PLI terminó y una parte creciente va a minoritarios.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes por encargo de electrónica cotizados en India (Kaynes, Amber, Syrma SGS, PG Electroplast, Avalon) y los grandes mundiales (Hon Hai, Jabil, Flex, Celestica). Quitamos BYD Electronic (margen operativo del 0,7 %, cuentas en CNY). PER de los próximos 12 meses = precio ÷ media de los BPA de Yahoo del ejercicio en curso y del siguiente, ponderada por los meses que quedan de cada uno.',
    empresas: comparables,
    comentario: 'Los EMS indios cotizan a 31-55 veces el BPA de los próximos doce meses y 27-69 veces el EBITDA, con márgenes del 7-15 %; los mundiales, a 10-15 veces con márgenes del 4-10 %. Dixon, con el margen más bajo de todos (3,6 % de EBITDA en los últimos doce meses), cotiza a 37 veces el EBITDA y a unas 55-60 veces nuestro BPA de FY2028e: en la parte alta de los indios y a cuatro veces Hon Hai, que tiene un margen parecido.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-09', objetivo: 'Q Tech India (51 %)', comprador: 'Dixon', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: '428 + 125 crore por el 51 %; fondo de comercio de 5.230 M; sin cuentas del objetivo publicadas [8].' },
      { fecha: '2024-2025', objetivo: 'Ismartu India (50,1 %)', comprador: 'Dixon', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Pago en caja de 3.210 M neto; sin múltiplo publicado [8].' },
      { fecha: '2026-09', objetivo: 'Adivistar (51 %, JV con Vivo India)', comprador: 'Dixon', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Constitución con 25,5 M de aportación inicial; los activos de Vivo se aportarán después [9].' },
    ],
    comentario: 'No hay transacciones comparables con múltiplo publicado: las operaciones de Dixon son JV y compras de minorías en componentes. No se usan para el valor.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'Múltiplos de operaciones del sector EMS indio', tipo: 'Complemento', intentos: '1) Informes anuales de Dixon (sin cuentas de los objetivos); 2) prensa de las operaciones de Kaynes, Syrma y Amber (sin EV/EBITDA); 3) MarketScreener', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) NSE (préstamo de valores sin saldo agregado público); 2) Yahoo (no da); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'ValuePickr, hilo «Dixon Technologies» (posts de octubre de 2025 a octubre de 2026)', editor: 'ValuePickr', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://forum.valuepickr.com/t/dixon-technologies/19020' },
  { id: 2, titulo: 'Business Today: opiniones divididas de los analistas tras el máximo de junio', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-06-25', url: 'https://www.businesstoday.in/markets/stocks/story/dixon-technologies-shares-fall-from-52-week-high-mixed-views-on-outlook-price-targets-539076-2026-06-25' },
  { id: 3, titulo: 'HDFC Sky: «Dixon Tech shares jump 5 % on Vivo JV approval buzz»', editor: 'HDFC Sky', tipo: 'Prensa', fecha: '2026-06-17', url: 'https://hdfcsky.com/news/dixon-tech-shares-jump-5percent-on-vivo-jv-approval-buzz' },
  { id: 4, titulo: 'DSIJ: «Strategic JV Alert! This Tech Manufacturer Expands Into Optical Connectivity» (Gemtek)', editor: 'Dalal Street Investment Journal', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://insights.dsij.in/dsijarticledetail/strategic-jv-alert-this-tech-manufacturer-expands-into-optical-connectivity-id022' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido',
    tendencia: 'Estable',
    revisadas: [
      { plataforma: 'ValuePickr (hilo de Dixon)', fecha: '2026-10', n_comentarios: 20, tono: 'Negativo', resumen: 'Escepticismo con la valoración («un 15 % de crecimiento para una acción a más de 100 veces es un crimen»), cálculo del PER ajustado por minoritarios y por Aditya (≈ 75-80 veces), miedo a la memoria (los móviles baratos han subido un 50 %) y a Bhagwati, que crece con volúmenes de Longcheer; el último post (7-oct) celebra la JV con Gemtek en ópticos [1].' },
      { plataforma: 'Prensa financiera india (Business Today, HDFC Sky)', fecha: '2026-06', n_comentarios: null, tono: 'Dividido', resumen: 'Analistas divididos: JM Financial sube a Comprar con 14.200 INR y CLSA baja a Infraponderar con 10.400 INR el mismo día; la noticia de la aprobación de Vivo dio un +5 % en junio [2, 3].' },
      { plataforma: 'Prensa de mercado (DSIJ, Angel One)', fecha: '2026-10', n_comentarios: null, tono: 'Positivo', resumen: 'La JV con Gemtek abre telecomunicaciones y centros de datos (transceptores ópticos); tono de oportunidad, sin cifras [4].' },
    ],
    temas: [
      { tema: 'Valoración: el PER real es mucho más alto que el que se ve', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: el BPA publicado incluye minoritarios y plusvalías; ajustado, el PER de los últimos doce meses es de ≈ 89 veces (nota A).' },
      { tema: 'Memoria y móviles baratos', postura: 'Bajista', peso: 'Alto', contraste: 'La empresa lo confirma: volumen plano en FY2027 y margen sin mejora (nota A).' },
      { tema: 'Vivo y los componentes cambian la escala', postura: 'Alcista', peso: 'Medio', contraste: 'Vivo suma ≈ 300.000 M INR de ingresos a pleno ritmo, pero Dixon solo tiene el 51 %.' },
      { tema: 'Competencia de Bhagwati y clientes que reparten volumen', postura: 'Bajista', peso: 'Medio', contraste: 'Sin cifras primarias de Bhagwati; Longcheer es socio de Dixon en Dixtel.' },
    ],
    lectura: 'El inversor particular informado (ValuePickr) es escéptico con el precio, no con el negocio: calcula bien el beneficio ajustado y no paga 75-80 veces por un crecimiento que se ha frenado. La prensa vive de las noticias de JV (Vivo, HKC, Gemtek), que dan subidas de un día. Coincide con los datos en que FY2027 será un año plano en beneficio y en que la acción depende de que Vivo y los componentes lleguen a tiempo.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit (r/IndianStockMarket)', tipo: 'Complemento', intentos: '1) API de Reddit (bloqueada desde este entorno); 2) búsqueda web (sin hilos recientes); 3) ValuePickr como sustituto', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables:', comparables.map((c) => `${c.nombre} PER ${c.per_ntm} EV/EBITDA ${c.ev_ebitda_ltm}`).join(', '));
