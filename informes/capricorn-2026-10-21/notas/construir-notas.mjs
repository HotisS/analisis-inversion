// Escribe las notas A-E de Capricorn Metals (corte 2026-10-21) a partir de los documentos de notas/docs (informes anuales
// auditados FY22-FY26, informes trimestrales de la ASX, PFS de Mt Gibson, reservas, juntas y avisos de consejeros), de
// bolsa.json, yahoo-datos.json y yahoo-comparables.json (Yahoo, cierre de Sídney del 21-oct-2026), del RBA (bono a 10 años)
// y de Damodaran. Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejercicio a 30 de junio, etiqueta «fin» (FY2026 = julio de 2025 a junio de 2026). Cuentas y cotización en AUD.
// Ejecutar: node informes/capricorn-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const r3 = (x) => (x == null ? null : Math.round(x * 1000) / 1000);
const B = lee('bolsa.json');
const YC = lee('yahoo-comparables.json').datos;
const Y = lee('yahoo-datos.json').datos;
const ASX = 'https://announcements.asx.com.au/asxpdf';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2026: informe de gestión, informe de remuneración y estados financieros auditados a 30-jun-2026 (con FY25 comparativo), notas de ingresos, gastos, impuestos, capital y coberturas', editor: 'Capricorn Metals Ltd', tipo: 'Primaria', fecha: '2026-08-27', url: `${ASX}/20260827/pdf/0738zj3hnws8n9.pdf` },
  { id: 2, titulo: 'Capricorn Delivers Record Full Year Results (FY26): resultado subyacente, conciliación con el estatutario, guía FY27', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-08-27', url: `${ASX}/20260827/pdf/0738zqgkrrk78h.pdf` },
  { id: 3, titulo: 'Full Year Statutory Accounts FY25 (estados auditados a 30-jun-2025 con FY24 comparativo y nota de resultados)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2025-08-29', url: `${ASX}/20250829/pdf/06nk3sb6k3l5dr.pdf` },
  { id: 4, titulo: 'Full Year Statutory Accounts FY24 (nota de resultados «Strong FY24 Financial Results» y estados auditados)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2024-09-05', url: `${ASX}/20240905/pdf/067jtr3kq3fnr8.pdf` },
  { id: 5, titulo: 'Full Year Statutory Accounts FY23 (estados auditados a 30-jun-2023 con FY22 comparativo; cierre de coberturas)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2023-09-08', url: `${ASX}/20230908/pdf/05tnqrfn9w8td1.pdf` },
  { id: 6, titulo: 'Full Year Statutory Accounts FY22 (primer año completo de Karlawinda; compra de Mt Gibson)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2022-09-29', url: `${ASX}/20220929/pdf/45fmgptntnw748.pdf` },
  { id: 7, titulo: 'Record Half Year Results and Maiden 5cps Fully Franked Dividend (1S FY26)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-02-26', url: `${ASX}/20260226/pdf/06ws1txx7hmp1v.pdf` },
  { id: 8, titulo: 'Quarterly Activities Report, December 2025 quarter', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-01-29', url: `${ASX}/20260129/pdf/06vp6whvlxhhfg.pdf` },
  { id: 9, titulo: 'Quarterly Activities Report, March 2026 quarter', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ASX}/20260429/pdf/06yz0zr8dvwl81.pdf` },
  { id: 10, titulo: 'Quarterly Activities Report, June 2026 quarter (operación de Karlawinda, guía FY27, caja y oro)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ASX}/20260731/pdf/0727yfyjnyf8wg.pdf` },
  { id: 11, titulo: 'KGP Q1 Production 31koz, KEP Completed on Schedule (producción del trimestre a septiembre de 2026, caja y oro a 30-sep)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-10-05', url: `${ASX}/20261005/pdf/074xtm2xkmsjyq.pdf` },
  { id: 12, titulo: 'Karlawinda Expansion Project Completed on Schedule (6,5 Mtpa)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-09-23', url: `${ASX}/20260923/pdf/074db1jmfrh361.pdf` },
  { id: 13, titulo: 'Capricorn Gold Reserves Increase to 5.2 Million Ounces (reservas y recursos de Karlawinda y Mt Gibson)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ASX}/20260727/pdf/07227v0pncnlhm.pdf` },
  { id: 14, titulo: 'Compelling Mt Gibson PFS Update (producción, AISC, inversión, calendario, sensibilidades)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ASX}/20260727/pdf/07227rwp92pp8d.pdf` },
  { id: 15, titulo: 'Range 500 Aspiration (perspectiva de producción del grupo FY27-FY31)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ASX}/20260727/pdf/07227x43cmzn1p.pdf` },
  { id: 16, titulo: 'Final Hedge Book Closure', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2025-06-11', url: `${ASX}/20250611/pdf/06kn0b0gqlv1mp.pdf` },
  { id: 17, titulo: 'Capricorn Repays Residual $50M Debt, Now Gold Hedging & Debt Free', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2025-06-27', url: `${ASX}/20250627/pdf/06l5wd321x0b1q.pdf` },
  { id: 18, titulo: 'Divestment of the Big Springs Gold Project (venta a Sentinel por 26 M AUD)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-02', url: `${ASX}/20260702/pdf/0718ywx4lrpcyr.pdf` },
  { id: 19, titulo: 'Top End of FY26 Guidance Delivered at KGP', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-06', url: `${ASX}/20260706/pdf/071dhqm3cy2jvt.pdf` },
];
// Cuenta: ingresos = ventas de oro (cobradas; «sales revenue» subyacente de la empresa). Los ingresos estatutarios restan
// un ajuste contable de coberturas cerradas (57,985 M en FY26 y 22,317 M en FY25, sin caja), que aquí va en el resultado
// financiero junto con las pérdidas de valor de las opciones y los forwards de oro: así EBIT y EBITDA miden la mina y el BAI
// y el beneficio cuadran con los estatutarios [1, 2, 3]. Coste de ventas = producción + regalías + amortización de la mina.
// gastos_generales = personal, pagos en acciones, administración, exploración en resultados, deterioro de exploración y
// amortización corporativa. Otros ingresos (alquileres, primas de opciones, otros) suman al EBIT.
const cuenta = [
  { periodo: 'FY2022', ingresos: 287.043, coste_ventas: 149.480, gastos_generales: 14.248, ebitda: r3(287.043 - 149.480 - 14.248 + 0.229 + 30.730), amortizaciones: 30.730, ebit: r3(287.043 - 149.480 - 14.248 + 0.229), resultado_financiero: r3(-11.703 - 0.935), bai: 110.906, impuestos: 21.423, minoritarios: 0, beneficio_neto: 89.483, gastos_financieros: 6.282, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.2391, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 374.197 },
  { periodo: 'FY2023', ingresos: 320.840, coste_ventas: 171.570, gastos_generales: 12.861, ebitda: r3(320.840 - 171.570 - 12.861 + 0.034 + 25.482), amortizaciones: 25.482, ebit: r3(320.840 - 171.570 - 12.861 + 0.034), resultado_financiero: r3(-125.249 - 2.028), bai: 9.166, impuestos: 4.767, minoritarios: 0, beneficio_neto: 4.399, gastos_financieros: 6.445, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.0117, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 375.721 },
  { periodo: 'FY2024', ingresos: 359.727, coste_ventas: 202.820, gastos_generales: 15.937, ebitda: r3(359.727 - 202.820 - 15.937 + 0.256 + 27.227), amortizaciones: 27.227, ebit: r3(359.727 - 202.820 - 15.937 + 0.256), resultado_financiero: r3(5.783 - 19.826 - 1.496), bai: 125.687, impuestos: 38.549, minoritarios: 0, beneficio_neto: 87.138, gastos_financieros: 6.702, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.2302, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 378.457 },
  { periodo: 'FY2025', ingresos: 528.209, coste_ventas: 234.237, gastos_generales: 23.024, ebitda: r3(528.209 - 234.237 - 23.024 + 0.183 + 24.741), amortizaciones: 24.741, ebit: r3(528.209 - 234.237 - 23.024 + 0.183), resultado_financiero: r3(11.632 - 41.315 - 1.294 - 22.317), bai: 217.837, impuestos: 67.560, minoritarios: 0, beneficio_neto: 150.277, gastos_financieros: 6.081, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.3694, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 406.837 },
  { periodo: 'FY2026', ingresos: 769.346, coste_ventas: 288.600, gastos_generales: 27.683, ebitda: r3(769.346 - 288.600 - 27.683 + 1.311 + 29.581), amortizaciones: 29.581, ebit: r3(769.346 - 288.600 - 27.683 + 1.311), resultado_financiero: r3(16.055 - 7.656 - 57.985), bai: 404.788, impuestos: 122.594, minoritarios: 0, beneficio_neto: 282.194, gastos_financieros: 1.762, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.6303, dpa: 0.10, dpa_extraordinario: 0, acciones_diluidas: 447.689 },
];
// Balance: inmovilizado_material = todo el activo no corriente (planta, derechos de uso, propiedades mineras en desarrollo y
// en producción, exploración capitalizada y existencias a largo plazo de mineral de baja ley); existencias = las corrientes.
const balance = [
  { periodo: 'FY2022', activo_total: 448.512, activo_corriente: 84.544, pasivo_corriente: 74.493, pasivo_total: 200.977, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 363.968, existencias: 14.913, clientes: 2.235, proveedores: 27.407, activos_contrato: null, pasivos_contrato: null, caja: 61.502, deuda_financiera: 65.386, arrendamientos: 45.435, patrimonio_neto: 247.535, minoritarios: 0, reservas: 37.910 },
  { periodo: 'FY2023', activo_total: 536.485, activo_corriente: 131.998, pasivo_corriente: 44.724, pasivo_total: 279.948, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 404.487, existencias: 16.619, clientes: 2.535, proveedores: 33.226, activos_contrato: null, pasivos_contrato: null, caja: 106.471, deuda_financiera: 50.613, arrendamientos: 41.197, patrimonio_neto: 256.537, minoritarios: 0, reservas: 49.981 },
  { periodo: 'FY2024', activo_total: 623.559, activo_corriente: 147.784, pasivo_corriente: 112.615, pasivo_total: 314.294, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 475.775, existencias: 16.073, clientes: 3.255, proveedores: 50.293, activos_contrato: null, pasivos_contrato: null, caja: 119.917, deuda_financiera: 50.658, arrendamientos: 33.452, patrimonio_neto: 309.265, minoritarios: 0, reservas: 141.754 },
  { periodo: 'FY2025', activo_total: 1039.687, activo_corriente: 426.486, pasivo_corriente: 85.940, pasivo_total: 258.478, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 613.201, existencias: 55.423, clientes: 6.209, proveedores: 70.339, activos_contrato: null, pasivos_contrato: null, caja: 355.748, deuda_financiera: 0, arrendamientos: 31.803, patrimonio_neto: 781.209, minoritarios: 0, reservas: 297.299 },
  { periodo: 'FY2026', activo_total: 1843.926, activo_corriente: 621.288, pasivo_corriente: 196.652, pasivo_total: 411.807, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 1222.638, existencias: 88.730, clientes: 10.767, proveedores: 88.087, activos_contrato: null, pasivos_contrato: null, caja: 504.811, deuda_financiera: 0, arrendamientos: 20.295, patrimonio_neto: 1432.119, minoritarios: 0, reservas: 562.492 },
];
// Flujos: capex = planta y propiedades mineras en desarrollo + exploración capitalizada + propiedades mineras (prestripping).
// Los pagos por cerrar coberturas (FY23 33,1; FY24 64,3 + 5,2 de puts; FY25 48,9 + 7,8 de puts, más 17,7 M de acciones) van en
// financiación en las cuentas y no tienen campo propio: se explican en el comentario [3, 5].
const flujos = [
  { periodo: 'FY2022', flujo_operativo: 134.657, capex: r3(5.777 + 18.437 + 26.548), pagos_arrendamientos: 7.424, adquisiciones: 26.744, desinversiones: 0.187, dividendos: 0, recompras: 0, emision_acciones: r3(6.0 - 0.042), intereses_en_financiacion: 0 },
  { periodo: 'FY2023', flujo_operativo: 152.560, capex: r3(11.474 + 35.606 + 0.023), pagos_arrendamientos: 8.644, adquisiciones: 0.200, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0.135, intereses_en_financiacion: 0 },
  { periodo: 'FY2024', flujo_operativo: 158.184, capex: r3(16.872 + 31.982 + 16.786), pagos_arrendamientos: 9.515, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2025', flujo_operativo: 259.314, capex: r3(14.284 + 53.317 + 29.848), pagos_arrendamientos: 10.601, adquisiciones: 0.371, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: r3(200 - 8.434), intereses_en_financiacion: 0 },
  { periodo: 'FY2026', flujo_operativo: 470.171, capex: r3(162.419 + 94.980 + 43.269), pagos_arrendamientos: 10.737, adquisiciones: r3(1.550 + 1.815), desinversiones: r3(0.962 + 13.803), dividendos: 22.836, recompras: 0, emision_acciones: r3(1.990 - 0.257), intereses_en_financiacion: 0 },
];
// Semestres (cifras subyacentes de la empresa; el 2S = año − 1S) [2, 7, 3]
const sem = (p, ing, ant, ebitda, bpa) => ({ periodo: p, ingresos: ing, crecimiento_pct: ant ? r1((ing / ant - 1) * 100) : null, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa, vs_consenso: null });
const A = {
  _estado: 'Completa. Australia no tiene XBRL en cuentas.mjs: cuentas FY2022-FY2026 copiadas de los estados auditados (miles → millones de AUD) e informes trimestrales de la ASX. Ingresos = ventas de oro (subyacentes); el ajuste contable de coberturas y las pérdidas de derivados van al resultado financiero.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 769.346, ebitda: cuenta[4].ebitda, ebit: cuenta[4].ebit, beneficio_neto: 282.194, bpa: 0.6303, dpa: 0.10, dpa_extraordinario: 0, fcf: r3(470.171 - 300.668 - 10.737), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: 'FY2026', descripcion: 'Warriedar Resources (Golden Range, exploración), comprada el 25-nov-2025 con 23,8 M de acciones (324,9 M AUD): entra en balance como exploración capitalizada; no aporta ingresos.' }],
    comentario: 'Karlawinda (KGP) produjo su primer oro en junio de 2021 y es la única mina en producción. Las ventas pasaron de 287,0 M AUD en FY2022 a 769,3 M en FY2026 (TCAC del 28 %) con la producción casi plana: 118.432 onzas en FY2022 y 123.589 en FY2026 [6, 2]. Casi todo el crecimiento es precio: el realizado subió de 3.185 AUD/oz en FY2024 a 6.241 en FY2026 [4, 2]. El margen EBITDA subyacente pasó del 47 % (FY2024) al 63 % (FY2026) porque el coste por onza sube mucho menos que el precio: AISC de 1.208 AUD/oz en FY2023, 1.421 en FY2024, 1.468 en FY2025 y 1.629 en FY2026 [5, 4, 3, 2]. Las regalías (estatales del 2,5 % y privadas) sí suben con el precio: 42,9 M en FY2026 frente a 28,6 M en FY2025 [1]. FY2023 no es comparable en beneficio: el cierre anticipado de coberturas costó 83,2 M de pérdida de valor y 33,1 M de coste de forwards, y el beneficio neto quedó en 4,4 M (85,8 M sin ellas) [5].',
    ajustes: 'Ingresos = ventas de oro cobradas (la «sales revenue» de la empresa). Los ingresos estatutarios restan un ajuste contable sin caja por coberturas cerradas antes de su fecha (57,985 M en FY2026 y 22,317 M en FY2025), que aquí va al resultado financiero con las pérdidas de valor de opciones y forwards de oro (FY2023: 116,4 M; FY2024: 13,6 M; FY2025: 34,9 M; FY2026: 4,7 M) [1, 3, 5]. Con ello el BAI y el beneficio neto son los estatutarios. El beneficio subyacente de la empresa (sin esos efectos) fue de 85,8 M en FY2023, 87,1 M en FY2024, 206,4 M en FY2025 y 327,2 M en FY2026 (BPA subyacente de 73,37 céntimos frente a 63,03 diluido estatutario) [2, 4, 5]. Desde junio de 2025 no hay coberturas ni deuda, así que el ajuste desaparece en FY2027 [16, 17].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      sem('1S25', 213.397, null, 107.096, 0.1640),
      sem('2S25', r3(528.209 - 213.397), null, r3(295.691 - 107.096), r2(0.5093 - 0.1640)),
      sem('1S26', 350.073, 213.397, 215.346, 0.3324),
      sem('2S26', r3(769.346 - 350.073), r3(528.209 - 213.397), r3(483.645 - 215.346), r2(0.7337 - 0.3324)),
    ],
    ultima_presentacion: 'Semestres con cifras subyacentes de la empresa (EBITDA y BPA sin el ajuste de coberturas) [7, 2, 3]. En el 2S26 vendió 63.280 onzas a ≈ 6.627 AUD (29.009 a 7.034 en el trimestre a marzo y 34.271 a 6.267 en el de junio) [9, 10]. El mensaje del resultado anual (27-ago-2026) y de la presentación del 27-jul fue el crecimiento: ampliación de Karlawinda (KEP) a 6,5 Mt/año y ≈ 150.000 onzas, terminada el 23-sep a tiempo y dentro de presupuesto; PFS de Mt Gibson con 260.000 onzas al año en régimen y 19 años de vida; reservas del grupo de 5,24 Moz; y la aspiración «Range 500» (500.000 onzas al año en cinco años, que la empresa reconoce sin base razonable todavía) [12, 14, 13, 15]. Lo que cambió entre las dos presentaciones: la guía de AISC de FY2027 sube a 1.900-2.100 AUD/oz (+23 % sobre FY2026) porque las reservas se optimizan a 2.600 AUD en vez de 2.200 y entra mineral de menor ley, y el pago único de impuestos de FY2026 (90-100 M) sale en FY2027 [10, 2]. No hay transcripción pública de la conferencia del 27-jul.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja de 504,8 M AUD a 30-jun-2026 sin deuda financiera; caja y oro de 535,0 M a 30-sep-2026 tras 42,7 M de inversión en el trimestre [1, 11]. La deuda de Macquarie (50 M) se devolvió el 27-jun-2025 [17].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Impuesto sobre beneficios a pagar de 102,8 M a 30-jun-2026: la empresa espera un pago único de 90-100 M en FY2027 por FY2026, porque los pagos a cuenta eran bajos mientras usaba bases negativas [1, 2]. Provisiones de rehabilitación de 79,5 M a largo plazo (más 2,8 M a corto) por el cierre de Karlawinda y Mt Gibson [1]. Pasivos por arrendamiento de 20,3 M (centrales eléctricas y equipos) [1]. Sin coberturas de oro desde junio de 2025, salvo puts residuales con valor de 0,3 M [16, 1]. Activos mantenidos para la venta de 13,7 M (Big Springs, vendido en agosto de 2026 por 8,5 M en efectivo, 5,0 M en acciones de Sentinel y pagos diferidos) [18].',
    comentario: 'La deuda bruta (65,4 M en FY2022) se pagó en tres años y desde FY2025 hay caja neta: 355,7 M en FY2025 y 504,8 M en FY2026 [3, 1]. En FY2025 ayudó una colocación de 200 M a 6,00 AUD (noviembre de 2024) para financiar la ampliación y Mt Gibson [3]. El circulante comercial es pequeño (existencias corrientes + clientes − proveedores ≈ 11 M, 1,5 % de las ventas) pero hay 87,5 M de mineral de baja ley a largo plazo, que se procesará al final de la vida de Karlawinda [1]. El activo no corriente casi se dobla en FY2026 por la compra de Warriedar (exploración capitalizada de 617,0 M frente a 185,0 M) y la ampliación (propiedades en desarrollo de 158,9 M) [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es alta: flujo operativo de 470,2 M en FY2026 frente a un EBITDA subyacente de 483,6 M, porque los impuestos casi no se pagaron (18,7 M) [1, 2]. En FY2027 el flujo bajará por el pago único de 90-100 M de impuestos de FY2026 y el paso al régimen normal [2]. La inversión de FY2026 (300,7 M) es sobre todo de crecimiento: 133,4 M en la ampliación de Karlawinda y obras previas de Mt Gibson, 74,0 M de exploración y 21,0 M de estudios [2]; la de mantenimiento está dentro del AISC (≈ 400 AUD por onza sobre el coste en efectivo, estimación propia: AISC 1.629 frente a coste en efectivo neto de ≈ 1.250) [10]. Entre FY2023 y FY2025 la empresa pagó ≈ 211 M en efectivo y 142 M en acciones (17,7 M de acciones a 8,02 AUD) por cerrar las coberturas a precios de 2.400-2.600 AUD, que figuran en financiación y no en este cuadro [5, 4, 3].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG (Perth)', anios_auditor: null, opinion: 'Favorable (sin salvedades) sobre las cuentas de FY2026 [1]',
    comentario: 'Cuentas sencillas: una mina en producción, sin fondo de comercio y sin deuda. Lo complejo fueron las coberturas: la empresa vendió a plazo parte de la producción a ≈ 2.400-2.600 AUD/oz para financiar Karlawinda y las fue cerrando entre 2023 y 2025 con pérdidas contables de 116 M (FY2023), 14 M (FY2024) y 35 M (FY2025) y ajustes de ingresos sin caja de 22 M y 58 M en FY2025-FY2026 [5, 4, 3, 1]. El beneficio subyacente de la empresa los excluye y cuadra con el estatutario en la nota del resultado [2]. La amortización es por unidades de producción y baja (3,8 % de las ventas en FY2026) porque Karlawinda costó poco y parte del coste está en existencias a largo plazo [1]. La exploración se capitaliza (95,0 M en FY2026) y se deteriora poco (0,8 M); el riesgo es que una parte de los 617 M capitalizados (325 M de Warriedar) no llegue a mina [1]. Los pagos en acciones (8,1 M) son el 2,9 % del beneficio [1].',
    senales: [
      { senal: 'Exploración capitalizada creciente', nivel: 'Media', comentario: '617,0 M (33 % del activo) a 30-jun-2026, 325 M de ellos por la compra de Warriedar pagada en acciones; un deterioro no afectaría a la caja pero sí al ROIC y al patrimonio [1].' },
      { senal: 'Ajustes de coberturas cerradas', nivel: 'Baja', comentario: 'Terminan en FY2026; el beneficio estatutario de FY2023-FY2026 está por debajo del subyacente [2, 5].' },
      { senal: 'Existencias a largo plazo', nivel: 'Baja', comentario: '87,5 M de mineral de baja ley valorado a coste; si el oro cae mucho podría haber ajuste a valor neto realizable [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo desde FY2026: 5 céntimos a cuenta y 5 de final, totalmente «franked» (con crédito fiscal), 45,7 M en total; el pago empieza al pasar a pagar impuestos [2]. No hay recompra en vigor [1]. Prioridad declarada: financiar con caja propia la ampliación de Karlawinda y Mt Gibson sin deuda y mantener el reparto [2]. Compras pequeñas de terrenos alrededor de Mt Gibson (Golden Range) pagadas en acciones [1].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Mt Gibson Gold Project (proyecto; a Tetris y otros)', importe: null, ev_ebitda: null, financiacion: '8,3 M de acciones a 1,83 AUD (15,2 M) y pagos en efectivo (26,7 M en FY2022)', resultado: 'Recursos de 5,67 Moz y reservas de 3,67 Moz en 2026, frente a 2,8 Moz de recursos en 2022; PFS con VAN de 6.065 M AUD antes de impuestos [6, 14].' },
      { anio: '2025', objetivo: 'Warriedar Resources (Golden Range, 1,38 Moz de recursos)', importe: 324.9, ev_ebitda: null, financiacion: '23,8 M de acciones a 13,64 AUD (≈ 5,5 % del capital) y 1,07 M de opciones', resultado: 'Sin producción; estudio de una segunda planta en Golden Range (resultados preliminares en el 2T FY2027, decisión en 2027) [1, 15].' },
      { anio: '2026', objetivo: 'Venta de Big Springs (Nevada, EE. UU.)', importe: 26.0, ev_ebitda: null, financiacion: 'Cobro: 8,5 M en efectivo, 5,0 M en acciones de Sentinel y el resto aplazado', resultado: 'Desinversión de un activo no estratégico [18].' },
    ],
    comentario: 'La dirección ha creado mucho valor con la caja: Karlawinda se construyó por ≈ 200 M AUD y ha generado 1.175 M de flujo operativo en cinco años; Mt Gibson se compró por ≈ 42 M y hoy tiene 3,67 Moz de reservas [6, 1, 14]. Lo discutible es la dilución: las acciones diluidas pasaron de 374 M (FY2022) a 448 M (FY2026), +20 %, por la colocación de 2024 (33,3 M a 6,00), el cierre de coberturas pagado en acciones (17,7 M a 8,02) y Warriedar (23,8 M a 13,64) [1, 3]. Las coberturas a 2.400-2.600 AUD fueron caras (≈ 350 M entre efectivo y acciones) pero permitieron financiar la mina sin una gran ampliación. El dividendo es simbólico (≈ 0,7 % de rentabilidad) mientras se construye Mt Gibson.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Oro (Karlawinda)', descripcion: 'Venta de oro refinado de la mina a cielo abierto de Karlawinda (Pilbara, Australia Occidental), única mina en producción; un solo segmento operativo más exploración y desarrollo.', tipo_resultado: null, historico: cuenta.map((c) => ({ periodo: c.periodo, ingresos: c.ingresos, resultado: null })) },
    ],
    geografias: [{ nombre: 'Australia (ventas de oro a refinerías y bancos)', peso_pct: 100 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Producción de oro (onzas)', valor_anterior: '117.076 (FY2025)', valor_actual: '123.589 (FY2026)', variacion: '+5,6 %', comentario: 'Guía FY2027: 137.000-147.000; 31.218 en el trimestre a septiembre de 2026 [2, 11].' },
      { kpi: 'Precio realizado (AUD/oz)', valor_anterior: '≈ 4.500 (FY2025)', valor_actual: '6.241 (FY2026)', variacion: '≈ +39 %', comentario: 'Máximo trimestral de 7.034 en enero-marzo de 2026; sin coberturas [2, 9].' },
      { kpi: 'AISC (AUD/oz)', valor_anterior: '1.468', valor_actual: '1.629', variacion: '+11 %', comentario: 'Guía FY2027: 1.900-2.100 (+23 %) [2].' },
      { kpi: 'Ley de cabeza (g/t)', valor_anterior: '0,92', valor_actual: '0,92', variacion: '0', comentario: 'Reservas de Karlawinda a 0,6 g/t: la ley media de las reservas está por debajo de la que se procesa hoy [2, 13].' },
      { kpi: 'Mineral procesado (Mt)', valor_anterior: '4,32', valor_actual: '4,63', variacion: '+7 %', comentario: 'Capacidad de 6,5 Mt/año desde septiembre de 2026 con la ampliación [2, 12].' },
      { kpi: 'Reservas del grupo (Moz)', valor_anterior: '3,94', valor_actual: '5,24', variacion: '+33 %', comentario: 'Karlawinda 1,57; Mt Gibson 3,31 a cielo abierto y 0,36 subterráneas; optimizadas a 2.200-2.600 AUD/oz [13].' },
      { kpi: 'Caja neta (M AUD)', valor_anterior: '355,7', valor_actual: '504,8', variacion: '+42 %', comentario: 'Caja y oro de 535,0 M a 30-sep-2026 [1, 11].' },
    ],
    clientes: 'El oro se vende refinado en un mercado mundial líquido (refinería Perth Mint y bancos); la empresa no tiene clientes que importen ni poder de precio: cobra el precio de contado en AUD [1]. No hay contratos a plazo desde junio de 2025 [16]. Lo que decide el margen es el coste por onza, y ahí Karlawinda es de coste medio en Australia (AISC de 1.629 AUD/oz en FY2026) a pesar de una ley muy baja (0,9 g/t), por la escala de la planta y un ratio de desmonte moderado [2].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) Informe del auditor del Annual Report 2026; 2) Corporate Governance Statement 2026; 3) cuentas de FY2022 (KPMG ya auditaba)', decision: 'Omitido (KPMG desde al menos FY2022)' },
    { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) Notas de resultados (no citan consenso); 2) FNArena (solo cambios de objetivo); 3) prensa (Motley Fool, sin consenso previo)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Gold Demand Trends Full Year 2025: oferta (producción minera de 3.672 t) y demanda', editor: 'World Gold Council', tipo: 'Sectorial', fecha: '2026-01-29', url: 'https://www.gold.org/goldhub/research/gold-demand-trends/gold-demand-trends-full-year-2025/supply' },
  { id: 2, titulo: 'Cotización del oro (GC=F) y del AUD/USD: serie mensual y diaria hasta el 21-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GC%3DF/' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary de las productoras australianas (ventas, EBITDA, márgenes, caja y deuda)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/' },
  { id: 4, titulo: 'Annual Report 2026 de Capricorn: estrategia, riesgos, regalías, empleados y sostenibilidad', editor: 'Capricorn Metals Ltd', tipo: 'Primaria', fecha: '2026-08-27', url: `${ASX}/20260827/pdf/0738zj3hnws8n9.pdf` },
  { id: 5, titulo: 'Compelling Mt Gibson PFS Update (regalías del 2,5 % al Estado y privadas, permisos, riesgos)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ASX}/20260727/pdf/07227rwp92pp8d.pdf` },
  { id: 6, titulo: 'Federal Environmental Approval Received for MGGP', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-06-30', url: `${ASX}/20260630/pdf/0714snbhsb508j.pdf` },
  { id: 7, titulo: 'Quarterly Activities Report, June 2026 quarter (estado de los permisos de Mt Gibson)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ASX}/20260731/pdf/0727yfyjnyf8wg.pdf` },
  { id: 8, titulo: 'Gold Fields completes AU$3.7 billion acquisition of Gold Road', editor: 'Nasdaq / RTTNews', tipo: 'Prensa', fecha: '2025-09-27', url: 'https://www.nasdaq.com/articles/gold-fields-completes-au-37-billion-acquisition-gold-road' },
  { id: 9, titulo: 'Northern Star finalises $5bn De Grey acquisition', editor: 'Australian Mining', tipo: 'Prensa', fecha: '2025-05-05', url: 'https://www.australianmining.com.au/northern-star-finalises-5bn-de-grey-acquisition/' },
];
const OZ_T = 32150.7;
const comp = (n, t, pais, c) => { const d = YC[t]; return { nombre: n, pais, ticker: t, ingresos: Math.round(d.ventas / 1e6), cuota_pct: r2(d.ventas / 1e6 / (3672 * OZ_T / 1e6 * 6241) * 100), margen_ebit_pct: null, comentario: `${c} Margen EBITDA de los últimos 12 meses: ${r1(d.margen_ebitda * 100)} % [3].` }; };
// Valor de la producción minera mundial: toneladas × 32.150,7 oz/t × precio medio en AUD (estimación propia con WGC y Yahoo).
const serie = [
  { anio: '2024', tamano: Math.round(3661 * OZ_T * 3550 / 1e6) },
  { anio: '2025', tamano: Math.round(3672 * OZ_T * 5200 / 1e6) },
];
const B_ = {
  _estado: 'Completa. Mercado = valor de la producción minera mundial de oro en AUD (WGC × precio medio, estimación propia). Márgenes de los competidores de Yahoo (EBITDA).',
  sector: {
    definicion: 'El mercado relevante es la producción minera de oro: Capricorn vende onzas al precio de contado y compite por yacimientos, permisos, personal y capital, no por clientes. Se mide como el valor de la producción minera mundial (toneladas del World Gold Council por el precio medio en AUD), porque es lo que define el ingreso del sector [1, 2]. El submercado que importa para costes y permisos es Australia Occidental, el primer distrito aurífero del país, donde están las dos minas de la empresa y casi todos sus comparables [4].',
    tamano: `≈ ${Math.round(serie[1].tamano / 1000)}.000 M AUD en 2025 (3.672 t a un precio medio estimado de ≈ 5.200 AUD/oz) [1, 2]`,
    unidad_serie: 'millones de AUD (valor de la producción minera mundial, estimación propia)',
    serie,
    tcac_historico_pct: r1((serie[1].tamano / serie[0].tamano - 1) * 100),
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Precio del oro en AUD', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'De ≈ 4.500 AUD/oz a principios de 2025 a un máximo de ≈ 7.000 en el 1T de 2026 y 5.894 el 21-oct-2026 (4.142 USD con el AUD a 0,703) [2].' },
      { driver: 'Compras de bancos centrales e inversión', efecto: '+', horizonte: 'Estructural', evidencia: 'Demanda récord de 5.002 t en 2025; bancos centrales 863 t e inversión 2.175 t [1].' },
      { driver: 'Oferta minera rígida', efecto: '+', horizonte: 'Estructural', evidencia: 'Producción de 3.672 t en 2025, +1 %, casi igual al récord de 2018 pese al precio [1].' },
      { driver: 'Inflación de costes y regalías ligadas al precio', efecto: '−', horizonte: 'Cíclico', evidencia: 'AISC de Capricorn de 1.208 AUD/oz en FY2023 a 1.629 en FY2026 y guía de 1.900-2.100 en FY2027; las regalías subieron ≈ 100 AUD/oz por el precio [4, 7].' },
      { driver: 'Tipo de cambio AUD/USD', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El AUD pasó de 0,62 (enero de 2025) a 0,70 (octubre de 2026): resta ≈ 11 % al oro en AUD con el mismo precio en USD [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'No se compite por precio: cada onza se vende al de mercado; la rivalidad es por yacimientos (compras de 2,4-5,0 mil M AUD en 2025) y por personal y contratistas en Australia Occidental [8, 9].' },
      { fuerza: 'Poder de los clientes', intensidad: 1, justificacion: 'Mercado mundial líquido; la refinería cobra poco [4].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Contratistas mineros (MACA en Mt Gibson), energía y personal escasos en Australia Occidental; el Estado cobra una regalía del 2,5 % y hay regalías privadas [5, 4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Llevar un proyecto a mina pide 3-5 años de permisos (Mt Gibson: aprobación federal en junio de 2026 y estatal en curso) y 300-500 M de inversión [6, 5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Para la inversión, el oro compite con bonos y activos digitales; la demanda de bancos centrales no tiene sustituto cercano [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El precio del oro en USD se duplicó entre 2023 y enero de 2026 (máximo cercano a 5.300 USD) y desde entonces ha caído ≈ 22 % (4.142 USD el 21-oct-2026) [2]. En AUD la caída es algo mayor por la subida del AUD (de 0,62 a 0,70). Las mineras australianas multiplicaron su margen EBITDA hasta el 50-70 % [3] y gastan en exploración y compras, rasgos de la parte alta del ciclo. En 2013 el oro cayó un 28 % en un año y muchas mineras de Australia Occidental de baja ley cerraron o se deterioraron; en 2020 y 2022 el oro aguantó. La lectura: margen alto con riesgo de que la caída continúe.' },
    regulacion: 'Australia Occidental cobra una regalía del 2,5 % sobre el valor del oro producido (con exención de las primeras 2.500 onzas) y hay regalías privadas sobre Karlawinda y Mt Gibson (1 % NSR a Avenger, más otra a St Barbara); en la PFS de Mt Gibson suman el 3,35 % [5, 4]. Los permisos ambientales son federales (EPBC Act, ya concedido para Mt Gibson en junio de 2026) y estatales (Parte IV de la EP Act con la EPA, en revisión pública cerrada en el 1T FY2027, y Parte V) [6, 7]. Impuesto de sociedades del 30 %. Sin cambios fiscales en tramitación conocidos que afecten al oro.',
    tendencias: 'Concentración: las grandes de Australia compran proyectos y productoras (Northern Star–De Grey por ≈ 5.000 M AUD en 2025; Gold Fields–Gold Road por 3.700 M; Ramelius–Spartan por ≈ 2.400 M) [9, 8]. Las medianas como Capricorn tienen poca deuda y financian el crecimiento con caja. El coste sube por la escasez de personal y contratistas. La automatización (camiones y perforadoras autónomas, control de planta) reduce costes en las grandes; en una mina de contratista como Karlawinda llega a través del contratista. Capricorn gana con el precio alto (más reservas económicas) y pierde con la inflación de costes.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: r3(123589 / (3672 * OZ_T) * 100),
    posicion: 'Productora mediana de Australia Occidental: ≈ 0,1 % de la producción minera mundial (123.589 onzas en FY2026 frente a ≈ 118 Moz) [1, 4]. Con la ampliación (150.000 onzas) y Mt Gibson (hasta 260.000) pasaría a ≈ 400.000 onzas, el tamaño de Ramelius, Genesis o Vault [4, 5].',
    competidores: [
      comp('Northern Star Resources', 'NST.AX', 'Australia', 'Mayor productora de Australia (Kalgoorlie, Yandal, Pogo); compró De Grey (Hemi).'),
      comp('Evolution Mining', 'EVN.AX', 'Australia', 'Productora de oro y cobre (Cowal, Red Lake, Ernest Henry, Northparkes).'),
      comp('Genesis Minerals', 'GMD.AX', 'Australia', 'Productora de Leonora (Australia Occidental) en crecimiento hacia 300.000 onzas.'),
      comp('Ramelius Resources', 'RMS.AX', 'Australia', 'Productora de Mt Magnet y Edna May; compró Spartan (Dalgaranga), vecina de Mt Gibson.'),
      comp('Regis Resources', 'RRL.AX', 'Australia', 'Duketon y Tropicana (30 %); la dirigió Mark Clark hasta 2016.'),
      comp('Vault Minerals', 'VAU.AX', 'Australia', 'Fusión de Red 5 y Silver Lake (King of the Hills, Deflector, Mount Monger).'),
      comp('Westgold Resources', 'WGX.AX', 'Australia', 'Productora subterránea del Murchison y Southern Goldfields.'),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a una mina.' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'El oro se vende al precio de mercado.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Concesiones mineras con 5,24 Moz de reservas y 8,66 Moz de recursos; Mt Gibson con aprobación federal y diseño terminado [13 de A; 6].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA subyacente del 63 % en FY2026 frente al 43-71 % de los comparables, pese a una ley de 0,9 g/t; el AISC sube a 1.900-2.100 AUD en FY2027 [3, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Planta de 6,5 Mt/año ya construida en Karlawinda y vida de más de 10 años; Mt Gibson con 19 años de vida y AISC de 1.870 AUD/oz [5].' },
      ],
    },
    amenazas: 'El foso es de reservas y de permisos, no comercial. Lo erosionan tres cosas: (1) una caída del oro, que con una ley de 0,6-1,0 g/t aprieta el margen más que en minas de alta ley (cada 500 AUD/oz menos restan ≈ 8 puntos de margen) [2, 4]; (2) la inflación de costes en Australia Occidental, que ya sube el AISC un 23 % en FY2027 [7]; y (3) un retraso o condiciones en la aprobación estatal de Mt Gibson, que es el 60 % de la producción futura [5, 7]. Probabilidad: media para las tres.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Capricorn Metals (West Perth; antes Malagasy Minerals, rebautizada en 2016) es dueña al 100 % de Karlawinda, una mina de oro a cielo abierto en el Pilbara (Australia Occidental) que produce desde junio de 2021, y del proyecto Mt Gibson (Murchison, 280 km al noreste de Perth), con aprobación federal desde junio de 2026 y pendiente de la estatal [4, 6]. Karlawinda procesa ≈ 4,6 Mt al año de mineral de 0,9 g/t; la ampliación terminada en septiembre de 2026 sube la planta a 6,5 Mt y la producción a ≈ 150.000 onzas al año durante más de 10 años [4]. Mt Gibson tiene 3,67 Moz de reservas y una PFS de 19 años de vida con 260.000 onzas al año en régimen [5]. Tiene además Golden Range (Warriedar) en exploración. La minería la hacen contratistas; la empresa tiene 212 empleados [4].',
    como_gana_dinero: 'Ingresos = onzas vendidas × precio del oro en AUD, sin coberturas desde junio de 2025 [4]. El coste es casi fijo por tonelada movida y procesada, así que el coste por onza depende de la ley y del ratio de desmonte, y el margen sube y baja con el precio con apalancamiento: en FY2026 el AISC fue de 1.629 AUD/oz frente a un precio de 6.241 [4]. Las regalías (≈ 5,6 % de las ventas en Karlawinda) suben con el precio [4]. No hay estacionalidad relevante. El beneficio crecerá por volumen (de 124.000 a ≈ 400.000 onzas si Mt Gibson se construye) y el riesgo es de precio y de ejecución.',
  },
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) WGC Gold Demand Trends (sin producción por empresa); 2) informes anuales de los grandes (no reunidos a la misma fecha); 3) Yahoo (solo ventas)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_previsto_pct', tipo: 'Complemento', intentos: '1) WGC (sin previsión de valor); 2) USGS (sin previsión); 3) derivarlo exigiría suponer el precio del oro, que es la variable del análisis', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen_ebit_pct', tipo: 'Complemento', intentos: '1) Yahoo (solo margen EBITDA); 2) informes anuales de los comparables (no copiados por presupuesto); 3) MarketScreener (no abre)', decision: 'Omitido: se da el margen EBITDA en el comentario' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2026: informe de los consejeros, biografías, participaciones e informe de remuneración auditado', editor: 'Capricorn Metals Ltd', tipo: 'Primaria', fecha: '2026-08-27', url: `${ASX}/20260827/pdf/0738zj3hnws8n9.pdf` },
  { id: 2, titulo: 'Results of 2025 Annual General Meeting (votos por delegación y en la votación)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2025-11-25', url: `${ASX}/20251125/pdf/06sgw7vq80g7h1.pdf` },
  { id: 3, titulo: 'Results of General Meeting (junta extraordinaria del 3-mar-2026, fondo de retribución de consejeros)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-03-03', url: `${ASX}/20260303/pdf/06x0dnb26khsqg.pdf` },
  { id: 4, titulo: 'CEO Update (cargo contra el consejero delegado Paul Criddle y su baja)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2025-04-22', url: `${ASX}/20250422/pdf/06hyfptrm304z7.pdf` },
  { id: 5, titulo: 'Management Update (cargo desestimado, dimisión de Criddle como consejero delegado; Mark Clark asume sus funciones)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2025-05-15', url: `${ASX}/20250515/pdf/06js5mrhbt964d.pdf` },
  { id: 6, titulo: 'Change of Director’s Interest Notices (Appendix 3Y): Mark Clark (3-sep-2025, 22-dic-2025, 4-sep-2026) y Jillian Irvin (6-may-2026)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-09-04', url: `${ASX}/20260904/pdf/073r7vz0xrk78g.pdf` },
  { id: 7, titulo: 'Notas de resultados FY2022-FY2026 (guía anual y resultado)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-08-27', url: `${ASX}/20260827/pdf/0738zqgkrrk78h.pdf` },
  { id: 8, titulo: 'Full Year Statutory Accounts FY24 (guía de producción revisada y AISC por encima de la guía)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2024-09-05', url: `${ASX}/20240905/pdf/067jtr3kq3fnr8.pdf` },
  { id: 9, titulo: 'Full Year Statutory Accounts FY22 y FY23 (guías y resultados)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2023-09-08', url: `${ASX}/20230908/pdf/05tnqrfn9w8td1.pdf` },
  { id: 10, titulo: 'Change in substantial holding y Ceasing to be a substantial holder (junio de 2026)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-06-23', url: `${ASX}/20260623/pdf/070wvr11n0b023.pdf` },
];
const C = {
  _estado: 'Completa. Consejo, remuneración y participaciones del Annual Report 2026; votos de las juntas de la ASX; operaciones de consejeros de los Appendix 3Y de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Mark Clark', cargo: 'Presidente ejecutivo (hace de consejero delegado desde mayo de 2025)', desde: '2019', participacion_pct: r2(17.568 / 457.14 * 100), trayectoria: 'Consejero delegado de Equigold hasta su fusión con Lihir por 1.200 M AUD (2008) y de Regis Resources (2009-2016), donde desarrolló Duketon hasta más de 300.000 onzas al año [1]. En Capricorn ha construido Karlawinda (primer oro en 2021), la ampliación (a tiempo y en presupuesto) y ha llevado Mt Gibson de 2,8 a 5,67 Moz de recursos [1].' },
      { nombre: 'William Nguyen', cargo: 'Director financiero y secretario del consejo', desde: null, participacion_pct: null, trayectoria: 'Ha llevado la devolución de la deuda, el cierre de las coberturas (2023-2025) y el primer dividendo; remuneración de 1,40 M AUD en FY2026 [1].' },
      { nombre: 'Paul Criddle', cargo: 'Consejero delegado adjunto (desarrollo de proyectos)', desde: '2024', participacion_pct: null, trayectoria: 'Entró como director de operaciones en mayo de 2024 y fue consejero delegado de febrero a mayo de 2025; dimitió tras un cargo penal personal que fue desestimado y volvió a un puesto de desarrollo de proyectos [4, 5, 1].' },
      { nombre: 'Tony Hinkley', cargo: 'Director de operaciones', desde: null, participacion_pct: null, trayectoria: 'Responsable de Karlawinda: producción en la parte alta de la guía en FY2025 y FY2026 [1, 7].' },
      { nombre: 'Shane Clark', cargo: 'Director de desarrollo', desde: null, participacion_pct: null, trayectoria: 'Dirige la construcción de la ampliación de Karlawinda (12 meses) y la de Mt Gibson [1, 5].' },
    ],
    historial_guidance: [
      { anio: 'FY2022', guia: 'Primer año de Karlawinda; AISC en la horquilla de la guía', real: '118.432 oz (parte alta de la guía); AISC de 1.112 AUD/oz (parte baja)', cumplida: 'Sí' },
      { anio: 'FY2023', guia: '115.000-125.000 oz; AISC 1.160-1.260 AUD/oz', real: '120.014 oz; AISC 1.208', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Producción revisada a 112.000-115.000 oz; AISC 1.270-1.370 AUD/oz', real: '113.007 oz; AISC 1.421 (4 % por encima)', cumplida: 'No' },
      { anio: 'FY2025', guia: '110.000-120.000 oz; AISC 1.370-1.470 AUD/oz', real: '117.076 oz; AISC 1.468', cumplida: 'Sí' },
      { anio: 'FY2026', guia: '115.000-125.000 oz; AISC 1.530-1.630 AUD/oz', real: '123.589 oz; AISC 1.629', cumplida: 'Sí' },
      { anio: 'FY2027', guia: '137.000-147.000 oz; AISC 1.900-2.100 AUD/oz', real: '31.218 oz en el primer trimestre (en línea con el plan)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo de constructores de minas con historial: Clark hizo crecer Regis hasta más de 300.000 onzas y en Capricorn ha cumplido la guía de producción cuatro de cinco años y el coste en cuatro de cinco (FY2024 se pasó un 4 %) [1, 7, 8, 9]. La ampliación de Karlawinda se terminó a tiempo y en presupuesto [5 de A]. El punto débil es la dependencia de Clark: es presidente y hace de consejero delegado desde mayo de 2025, tras la salida de Criddle [5]. No hay plan de sucesión publicado. El equipo tiene acciones: Clark posee el 3,8 % [1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Mark Clark', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Mark Okeby', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría y riesgos; Remuneración, nombramientos y diversidad' },
      { nombre: 'Myles Ertzen', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneración, nombramientos y diversidad' },
      { nombre: 'Bernard De Araugo', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría y riesgos' },
      { nombre: 'Jillian Irvin', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Sostenibilidad' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 99.25, voto_remuneracion_contra_pct: 0.75, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 2.89, fijo: 1.14, variable_corto: 0.89, variable_largo: 0.79, ratio_salario_medio: null },
    remuneracion: 'Mark Clark cobró 2,89 M AUD en FY2026: salario de 1,10 M, variable anual de 0,89 M (79 % del objetivo) y derechos sobre acciones de 0,79 M [1]. El variable anual mide producción (35 %), AISC (35 %), seguridad y medio ambiente (15 %) y crecimiento de reservas (15 %); el de largo plazo, solo el TSR relativo frente a 17 mineras australianas (0 % por debajo de la mediana, 100 % desde el percentil 75) [1]. El diseño premia producir y añadir reservas, no el retorno sobre el capital: el TSR relativo mide algo, pero no castiga diluir. El informe de remuneración tuvo un 99,25 % a favor en 2025, pero la emisión de derechos a Clark tuvo un 22,2 % en contra [2]. Los consejeros externos subieron su fondo de retribución en marzo de 2026 con un 99,7 % a favor [3].',
    accionistas: [
      { nombre: 'BlackRock Group', pct: 8.82, tipo: 'Institucional', variacion: 'Avisos de entrada y salida frecuentes en 2025-2026 [1, 10]' },
      { nombre: 'Van Eck Associates (ETF de mineras de oro)', pct: 6.16, tipo: 'Institucional (índices)', variacion: '—' },
      { nombre: 'State Street Corporation', pct: 6.11, tipo: 'Institucional (índices)', variacion: '—' },
      { nombre: 'Vanguard Group', pct: 5.18, tipo: 'Institucional (índices)', variacion: '—' },
      { nombre: 'Mark Clark (Samoz Pty Ltd)', pct: 3.84, tipo: 'Consejero ejecutivo', variacion: '+77.335 acciones por derechos en septiembre de 2026 [6]' },
    ],
    insiders: [
      { fecha: '2026-05-06', persona: 'Jillian Irvin (consejera)', operacion: 'Compra', acciones: 7750, importe: r2(7750 * 12.86 / 1e6) },
    ],
    control_y_defensas: 'No hay accionista de control: los cuatro mayores son gestoras de índices y fondos (26,3 % entre las cuatro) y el consejo y la dirección tienen ≈ 5 % [1]. Una acción, un voto; sin blindajes ni clases de acciones [1]. El presidente es ejecutivo y hace de consejero delegado, y no hay consejero independiente coordinador: la concentración de poder en una persona es el punto débil del gobierno, compensado en parte por cuatro consejeros independientes de cinco y comisiones presididas por ellos [1].',
    alertas: [
      'Presidente ejecutivo que hace también de consejero delegado desde mayo de 2025 y sin consejero coordinador independiente [5, 1].',
      'Salida del consejero delegado en mayo de 2025 tras un cargo penal personal (desestimado); sigue en la empresa como consejero delegado adjunto [4, 5].',
      'Rotación del personal del 29 % en FY2026 [1].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'directivos', campo: 'participacion_pct', tipo: 'Complemento', intentos: '1) Annual Report 2026 (solo consejeros); 2) Appendix 3Y (solo consejeros); 3) informe de remuneración (derechos, no acciones de los directivos no consejeros)', decision: 'Omitido para los directivos no consejeros' },
    { seccion: 'gobierno', campo: 'ratio_salario_medio', tipo: 'Complemento', intentos: '1) Informe de remuneración (sin ratio); 2) gasto de personal / empleados (mezcla personal de mina y capitalizado); 3) informe de sostenibilidad (sin salario medio)', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de CMM.AX, STW.AX (S&P/ASX 200) y GDX.AX (VanEck Gold Miners en la ASX), con dividendos', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/CMM.AX/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de CMM.AX: consenso de BPA y ventas FY2027-FY2028, recomendaciones y objetivos (8 analistas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/CMM.AX/analysis/' },
  { id: 3, titulo: 'FNArena: consenso de CMM (BPA FY2027 de 86,8 céntimos, dividendo 10,3; objetivo medio 20,03 AUD de 6 brokers; Macquarie Neutral 15,50 el 2-oct-2026; Canaccord Buy 19,20 el 30-ago-2026)', editor: 'FNArena', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://fnarena.com/index.php/analysis-data/consensus-forecasts/stock-analysis/?code=CMM' },
  { id: 4, titulo: 'Yahoo Finance quoteSummary de los comparables (precio, capitalización, caja, deuda, EBITDA, ventas, FCF y consenso de BPA y ventas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026 (T12m with sustainable payout)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tabla F2 Capital Market Yields – Government Bonds (diaria): bono australiano a 10 años al 5,314 % el 14-oct-2026', editor: 'Reserve Bank of Australia', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.rba.gov.au/statistics/tables/xls/f02d.xlsx' },
  { id: 7, titulo: 'Betas by sector, global (betaGlobal.xls, enero de 2026): Precious Metals, beta sin deuda corregida por caja 1,37', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaGlobal.xls' },
  { id: 8, titulo: 'Gold Fields completes AU$3.7 billion acquisition of Gold Road', editor: 'Nasdaq / RTTNews', tipo: 'Prensa', fecha: '2025-09-27', url: 'https://www.nasdaq.com/articles/gold-fields-completes-au-37-billion-acquisition-gold-road' },
  { id: 9, titulo: 'Northern Star finalises $5bn De Grey acquisition', editor: 'Australian Mining', tipo: 'Prensa', fecha: '2025-05-05', url: 'https://www.australianmining.com.au/northern-star-finalises-5bn-de-grey-acquisition/' },
  { id: 10, titulo: 'Ramelius completes acquisition of Spartan', editor: 'Mining Technology', tipo: 'Prensa', fecha: '2025-08-01', url: 'https://www.mining-technology.com/news/ramelius-completes-acquisition-of-spartan/' },
  { id: 11, titulo: 'Annual Report 2026: compra de Warriedar (25-nov-2025) y venta de Big Springs; accionistas significativos a 31-jul-2026', editor: 'Capricorn Metals Ltd', tipo: 'Primaria', fecha: '2026-08-27', url: `${ASX}/20260827/pdf/0738zj3hnws8n9.pdf` },
  { id: 12, titulo: 'Cotización del oro (GC=F) y AUD/USD diarios hasta el 21-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GC%3DF/' },
  { id: 13, titulo: 'Anuncios de la ASX de CMM de 12 meses (listado anual 2025-2026: resultados, PFS, permisos, compras, juntas, avisos de accionistas)', editor: 'ASX', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.asx.com.au/asx/v2/statistics/announcements.do?by=asxCode&asxCode=CMM&timeframe=Y&year=2026' },
  { id: 14, titulo: 'Date of Annual General Meeting (24-nov-2026)', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-09-29', url: `${ASX}/20260929/pdf/074mvzd2tgwh36.pdf` },
  { id: 15, titulo: 'Quarterly Activities Report, June 2026 quarter, y avance del trimestre a septiembre (5-oct-2026): permisos de Mt Gibson e informe trimestral «a finales de octubre»', editor: 'Capricorn Metals Ltd (ASX)', tipo: 'Primaria', fecha: '2026-10-05', url: `${ASX}/20261005/pdf/074xtm2xkmsjyq.pdf` },
  { id: 16, titulo: 'Motley Fool Australia: «6 ASX shares upgraded by experts amid a weak market» (30-sep-2026) y página de noticias de CMM', editor: 'The Motley Fool Australia', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://www.fool.com.au/tickers/asx-cmm/' },
];
const AUDUSD = 0.7028395;
const compsT = [['Northern Star', 'NST.AX', 'AU'], ['Evolution Mining', 'EVN.AX', 'AU'], ['Genesis Minerals', 'GMD.AX', 'AU'], ['Ramelius Resources', 'RMS.AX', 'AU'], ['Regis Resources', 'RRL.AX', 'AU'], ['Vault Minerals', 'VAU.AX', 'AU'], ['Westgold Resources', 'WGX.AX', 'AU'], ['Emerald Resources', 'EMR.AX', 'AU']];
// Próximos 12 meses desde el 21-oct-2026: 0,69 × FY2027 (hasta jun-2027) + 0,31 × FY2028.
const W0 = 0.69, W1 = 0.31;
const comps = compsT.map(([n, t, p]) => {
  const d = YC[t];
  const cap = d.cap / 1e6;
  const ev = cap + (d.deuda - d.caja) / 1e6;
  const t0 = d.trend.find((x) => x.p === '0y'), t1 = d.trend.find((x) => x.p === '+1y');
  const bpaNtm = W0 * t0.bpa + W1 * t1.bpa;
  const ventasNtm = W0 * t0.ventas + W1 * t1.ventas;
  const ebitdaNtm = d.ebitda * ventasNtm / d.ventas; // estimación propia: margen de los últimos 12 meses constante
  return {
    nombre: n, ticker: t, pais: p, capitalizacion: Math.round(cap), ev_ventas: r2(ev / (d.ventas / 1e6)), ev_ebitda_ltm: r1(ev / (d.ebitda / 1e6)), ev_ebitda_ntm: r1(ev / (ebitdaNtm / 1e6)),
    per_ntm: r1(d.precio / bpaNtm), crecimiento_pct: r1((ventasNtm / d.ventas - 1) * 100), margen_ebitda_pct: r1(d.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r1((d.deuda - d.caja) / d.ebitda), fcf_yield_pct: r1(d.fcf / 1e6 / cap * 100),
  };
});
const pers = comps.map((c) => c.per_ntm).sort((a, b) => a - b);
const perMed = pers.length % 2 ? pers[(pers.length - 1) / 2] : r1((pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2);
const cierres = B.cierres_ejercicio.filter((c) => +c.anio.slice(2) >= 2022);
const CM = Y['CMM.AX'];
const D = {
  _estado: 'Completa. Precio, rangos, betas y cierres de bolsa.mjs (AUD). Consenso: Yahoo (BPA y ventas FY2027-FY2028, 7 analistas) y FNArena (BPA FY2027, objetivo de 6 brokers). Comparables de Yahoo; EBITDA de los próximos 12 meses estimado con el margen actual. Transacciones sin múltiplo publicado.',
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Capricorn Metals Ltd', nombre_corto: 'Capricorn', ticker: 'CMM', isin: 'AU000000CMM9', mercado: 'ASX (Sídney)', indice_referencia: 'S&P/ASX 200',
    pais: 'Australia', pais_iso: 'AU', sector: 'Materiales', industria: 'Metales y minería (oro)', sede: 'West Perth (Australia Occidental)', fundacion: '2006', empleados: 212, web: 'www.capmetals.com.au',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 459.5, capitalizacion_publicada: Math.round(CM.cap / 1e6), free_float_pct: r1(100 - CM.insiders_pct * 100),
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M AUD/día (3 meses) [1]`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía FY2027 (31-jul-2026, confirmada el 5-oct-2026): 137.000-147.000 onzas en Karlawinda con un AISC de 1.900-2.100 AUD/oz y 70-85 M de inversión de crecimiento (prestripping); la planta ampliada (6,5 Mt/año) trabaja a ≈ 150.000 onzas al año desde el 2T FY2027 [15]. Mt Gibson: inicio de obras previsto en el 2T FY2027 (octubre-diciembre de 2026) si llega la aprobación estatal, y de la producción en el 3T FY2028; inversión de 345 M en planta más 129 M de minería previa [15]. Perspectiva del grupo (no es guía): 145.000 onzas en FY2027, 220.000 en FY2028, 330.000 en FY2029, 380.000 en FY2030 y 410.000 en FY2031 [11].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: r1(CM.trend.find((x) => x.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r3(CM.trend.find((x) => x.periodo === '0y').bpa), dpa: 0.103, fuente: 'Yahoo (7 analistas; BPA 0,85 AUD) [2]; FNArena: BPA 0,868 y dividendo 0,103 [3]' },
      { periodo: 'FY2028e', ingresos: r1(CM.trend.find((x) => x.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r3(CM.trend.find((x) => x.periodo === '+1y').bpa), dpa: null, fuente: 'Yahoo (7 analistas) [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: 7, mantener: 1, vender: 0, po_medio: r2(CM.po_medio), po_min: CM.po_min, po_max: CM.po_max },
    revisiones: 'El BPA de FY2027 de Yahoo bajó de 0,874 hace 90 días a 0,855 hace 30 y 0,850 hoy (−3 %), y el de FY2028 de 1,290 a 1,252 (−3 %), por la caída del oro desde agosto [2]. Macquarie recortó su objetivo de 17,70 a 15,50 AUD el 2-oct-2026 (Neutral); Canaccord lo subió de 19,05 a 19,20 tras el resultado anual (Buy) [3]. El objetivo medio de FNArena (6 brokers) es 20,03 AUD y el de Yahoo (8) 19,61 [3, 2]. Solo hay dos ejercicios de consenso con ventas; el EBITDA del consenso no es accesible gratis.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: -10.3, var_3m_pct: 16.6, var_6m_pct: 21.2, var_12m_pct: 6.7, dist_max_52s_pct: -21.9, dist_min_52s_pct: 47.5, dist_max_historico_pct: -21.9, tendencia: 'alcista', volatilidad_60d_pct: 46, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'ene-feb 2026', var_pct: -16.7, causa: 'Desplome del oro desde el máximo de ≈ 5.300 USD (28-ene) a ≈ 4.650 (2-feb): la acción cayó de 16,05 a 13,37 AUD en una semana (−7,9 % el 30-ene y −7,7 % el 2-feb) sin noticia propia [12, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar 2026', var_pct: -19.2, causa: 'Nueva caída del oro (de 5.126 a 4.400 USD entre el 12 y el 24-mar): la acción tocó su mínimo de 52 semanas (9,41 AUD el 22-mar; −9,3 % el 19-mar y −8,4 % el 23-mar) [12, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jun 2026', var_pct: -19.3, causa: 'Oro de 4.590 a 4.110 USD (−10 %) entre finales de mayo y el 11-jun; −8,1 % el 28-may [12, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago 2026', var_pct: 49.0, causa: 'PFS de Mt Gibson, reservas de 5,24 Moz y «Range 500» el 27-jul (+15 % en el día), y subida del oro de 4.040 a 4.700 USD en agosto con el resultado anual récord del 27-ago [13, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: -21.9, causa: 'Recogida desde el máximo de 18,26 AUD (26-ago) con el oro de vuelta a ≈ 4.140 USD; Macquarie recortó el objetivo a 15,50 el 2-oct [12, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-06-30', tipo: 'demanda o regulador', hecho: 'Aprobación federal (EPBC) de Mt Gibson; la evaluación estatal (Parte IV, EPA) cerró su revisión pública en el trimestre a septiembre y la Parte V va en paralelo; la empresa quiere empezar obras en el 2T FY2027 [15, 13]. La decisión estatal está pendiente y sin fecha publicada.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-27', tipo: 'resultados', hecho: 'PFS de Mt Gibson (VAN antes de impuestos de 6.065 M AUD a 5.500 AUD/oz), reservas del grupo de 5,24 Moz y «Range 500» [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-27', tipo: 'resultados', hecho: 'Resultado FY2026 récord (beneficio subyacente de 327,2 M, +59 %) y dividendo final de 5 céntimos; guía FY2027 con AISC +23 % [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-26', tipo: 'fusión u oferta', hecho: 'Venta de Big Springs (EE. UU.) a Sentinel por 26 M AUD; Capricorn pasa a accionista significativo de Sentinel [11, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-02', tipo: 'recomendación', hecho: 'Macquarie mantiene Neutral y baja el objetivo de 17,70 a 15,50 AUD; a finales de septiembre varios brokers subieron la recomendación tras la caída [3, 16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-23', tipo: 'accionista de referencia', hecho: 'Entradas y salidas de BlackRock y otros institucionales por encima y por debajo del 5 % (avisos de 2025-2026); no hay un accionista de referencia que coloque un paquete [11, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Informe trimestral del 1T FY2027 «a finales de octubre» (costes y permisos de Mt Gibson); junta general el 24-nov-2026 [15, 14].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 22 % por debajo de su máximo de 52 semanas (y del histórico) y un 47 % por encima del mínimo, en tendencia alcista (1,2 % sobre la media de 200 sesiones) y sin avisos P de la herramienta. Todos los movimientos fuertes de 12 meses los explica el oro, con una sensibilidad de 2-3 veces, y uno el 27-jul por la PFS de Mt Gibson [12, 13]. No hay colocaciones, ventas de directivos (solo una compra pequeña de una consejera) ni ofertas pendientes. El único hecho pendiente que puede mover el precio es la aprobación estatal de Mt Gibson; no tiene fecha y la tesis ya recoge el riesgo de retraso, así que no retrasa. Veredicto: no cambia. Fecha del informe trimestral estimada (la empresa dice «finales de octubre»).',
    },
    comentario: 'Rentabilidades en AUD con dividendos. La acción ha rendido un 40,8 % anual en cinco años y un 37,0 % en diez frente al 7,7 % y el 9,1 % del S&P/ASX 200 y al 24,9 % y el 15,6 % del índice de mineras de oro (GDX.AX) [1]: pasó de proyecto a productora (primer oro en junio de 2021) y luego se benefició del oro. En 2025 subió un 129 % con el oro en AUD (de ≈ 4.500 a ≈ 6.500 AUD/oz) y la mejora de Mt Gibson; en 2026 va −2,7 % frente a +4,1 % del índice [1]. Beta mensual de 5 años de 1,44 frente al S&P/ASX 200 (ajustada 1,29) y volatilidad del 56 % [1]. La caída máxima de 5 años (−44,5 %) fue en 2022, con las coberturas que impedían ganar con el oro [1].',
  },
  multiplos_historicos: {
    serie: cierres.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === 'FY2023' })),
    comentario: 'Cierres de junio de cada ejercicio [1]. El PER estatutario de FY2023 (345 veces) está deformado por la pérdida del cierre de coberturas y se excluye; con el beneficio subyacente de FY2023 (85,8 M) sería de ≈ 18 veces. En los demás años el PER de los últimos 12 meses ha estado entre 13 y 21 veces y el EV/EBITDA entre ≈ 6 y 13 veces. La empresa ha cotizado casi siempre con prima frente a las productoras australianas (PER adelantado de ≈ 7-12 veces) por la opción de crecimiento de Mt Gibson; hoy esa opción ya tiene PFS y aprobación federal.',
    confianza: 'Media',
  },
  comparables: {
    criterio: `Productoras de oro de la ASX con minas en Australia, consenso y balances en AUD en Yahoo: grandes (Northern Star, Evolution), medianas en crecimiento (Genesis, Ramelius, Vault, Westgold) y de pocas minas con prima de calidad (Regis, Emerald). Fuera: Perseus (minas en África, cuentas en USD), Greatland (datos de ventas inconsistentes en Yahoo) y Bellevue (beneficio casi nulo). El EBITDA de los próximos 12 meses es estimación propia (ventas del consenso × margen actual) [4].`,
    empresas: comps,
    comentario: `Capricorn cotiza a ≈ 11 veces el BPA de los próximos 12 meses del consenso (≈ 18 con nuestro BPA, que supone el oro a 5.900 AUD) frente a una mediana de ${String(perMed).replace('.', ',')} veces de las comparables [4, 2]. La prima con el consenso es pequeña y con nuestras cifras grande; la justifica el crecimiento en volumen (de 124.000 a ≈ 400.000 onzas en cinco años si Mt Gibson se construye) que ninguna comparable tiene en esa proporción, y la penaliza que hoy es una sola mina de baja ley. En EV/EBITDA de los últimos 12 meses Capricorn (≈ 12-14 veces) está entre las más caras; las comparables cotizan a 4-11 veces.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-12', objetivo: 'De Grey Mining (Hemi, Pilbara; proyecto sin producción)', comprador: 'Northern Star Resources', ev: 5000, ev_ventas: null, ev_ebitda: null, prima_pct: 37.1, excluir: false, comentario: '≈ 5.000 M AUD en acciones; 11,2 Moz de recursos; sin EBITDA [9].' },
      { fecha: '2025-03', objetivo: 'Spartan Resources (Dalgaranga, Murchison; proyecto)', comprador: 'Ramelius Resources', ev: 2400, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 2.400 M AUD en acciones y efectivo; proyecto vecino de Mt Gibson [10].' },
      { fecha: '2025-05', objetivo: 'Gold Road Resources (50 % de Gruyere, Australia Occidental)', comprador: 'Gold Fields', ev: 3700, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 3.700 M AUD en efectivo; múltiplo no publicado en la fuente [8].' },
      { fecha: '2025-07', objetivo: 'Warriedar Resources (Golden Range, exploración)', comprador: 'Capricorn Metals', ev: 324.9, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '23,8 M de acciones de Capricorn a 13,64 AUD; 1,38 Moz de recursos [11].' },
    ],
    comentario: 'Las compras de minas y proyectos de oro en Australia se pagan por onzas y por valor neto de los activos, no por EBITDA: ninguna fuente publica el múltiplo. Sirven para el control: sin accionista de control y con 5,24 Moz de reservas en Australia Occidental, Capricorn es un objetivo posible para las grandes (Northern Star, Evolution, Gold Fields) que compraron proyectos de 2.400-5.000 M AUD en 2025 [9, 10, 8]. No hay ninguna oferta conocida y no entra en la valoración.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'ev_ebitda', tipo: 'Complemento', intentos: '1) Búsqueda de múltiplos EV/EBITDA de las compras de oro australianas de 2024-2026; 2) prensa sectorial (Australian Mining, Mining Technology: solo importes); 3) Nasdaq/RTTNews (importe)', decision: 'Omitido: transacciones sin múltiplo, peso 0' },
    { seccion: 'comparables', campo: 'roic_pct', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (sin ROIC); 2) MarketScreener (no abre sin sesión); 3) Stock Analysis (no consultado por presupuesto)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) ASIC, informe diario agregado (no descargado: la fecha de corte deja ≈ 4 días de retraso); 2) Yahoo (sin dato para la ASX); 3) Motley Fool (sin dato)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'ebitda', tipo: 'Complemento', intentos: '1) Yahoo (solo ventas y BPA); 2) FNArena (BPA y dividendo); 3) MarketScreener (pide sesión)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Motley Fool Australia: página de CMM (artículos del 23-sep al 13-oct-2026: ampliación terminada, producción del 1T, mejoras de recomendación, «Capricorn Metals vs PDI Gold»)', editor: 'The Motley Fool Australia', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://www.fool.com.au/tickers/asx-cmm/' },
  { id: 2, titulo: 'Motley Fool Australia: página 2 de CMM (jun-sep 2026)', editor: 'The Motley Fool Australia', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://www.fool.com.au/tickers/asx-cmm/page/2/' },
  { id: 3, titulo: 'FNArena: cambios de recomendación y objetivo de los brokers (Macquarie, Canaccord)', editor: 'FNArena', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://fnarena.com/index.php/analysis-data/consensus-forecasts/stock-analysis/?code=CMM' },
];
const E = {
  _estado: 'Parcial: HotCopper, Market Index, Livewire y Simply Wall St no abren (403 o JavaScript, lecciones de Australia). Solo Motley Fool Australia y los cambios de brokers de FNArena.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Motley Fool Australia (artículos y teasers de sep-oct 2026)', fecha: '2026-10', n_comentarios: 5, tono: 'Positivo', resumen: 'Ampliación terminada a tiempo, producción del 1T en línea, mejoras de recomendación tras la caída de septiembre y comparativas con otras mineras «que han volado» [1].' },
      { plataforma: 'Motley Fool Australia (jun-sep 2026)', fecha: '2026-09', n_comentarios: 3, tono: 'Positivo', resumen: 'Poca cobertura propia: la ampliación de Karlawinda y artículos generales de mineras de oro [2].' },
      { plataforma: 'FNArena (resumen de brokers)', fecha: '2026-10', n_comentarios: 2, tono: 'Dividido', resumen: 'Canaccord Buy con 19,20 AUD tras el resultado y Macquarie Neutral con 15,50 tras la caída del oro [3].' },
    ],
    temas: [
      { tema: 'Crecimiento a 400.000-500.000 onzas', postura: 'Alcista', peso: 'Alto', contraste: 'Respaldado por la PFS y las reservas, pero depende de la aprobación estatal de Mt Gibson y de construir en 15 meses; «Range 500» la empresa dice que aún no tiene base razonable [1].' },
      { tema: 'Precio del oro', postura: 'Dividida', peso: 'Alto', contraste: 'Es la variable que decide: la acción sube y baja 2-3 veces lo que el oro [3].' },
      { tema: 'Ejecución (ampliación a tiempo)', postura: 'Alcista', peso: 'Medio', contraste: 'Correcto: KEP en 12 meses y en presupuesto [1].' },
    ],
    lectura: 'El poco debate accesible es favorable y gira sobre el crecimiento; no hay euforia ni capitulación: los brokers se dividen entre los que ven el crecimiento (objetivos de 19-24 AUD) y los que miran el oro (15,50) [3]. No aporta un riesgo que el informe no recoja. Confianza baja por la cobertura: los foros australianos (HotCopper) no abren sin navegador.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'sentimiento', campo: 'revisadas (HotCopper, Reddit)', tipo: 'Complemento', intentos: '1) HotCopper (403); 2) Market Index y Livewire (JavaScript); 3) Motley Fool Australia (abre, solo artículos)', decision: 'Omitido: sección con dos fuentes' },
  ],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} per ${x.per_ntm} cap ${x.capitalizacion} ev/ebitda ${x.ev_ebitda_ltm}/${x.ev_ebitda_ntm} crec ${x.crecimiento_pct}`).join(' | '));
console.log('Cuenta:', cuenta.map((c) => `${c.periodo} EBITDA ${c.ebitda} EBIT ${c.ebit} BAI calc ${r3(c.ebit + c.resultado_financiero)} vs ${c.bai}`).join(' | '));
