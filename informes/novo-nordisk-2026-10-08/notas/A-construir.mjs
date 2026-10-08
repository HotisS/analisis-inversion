// Construye notas/A.json (subagente A, Novo Nordisk). Ejecutar: node A-construir.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));

const E = 'https://www.sec.gov/Archives/edgar/data/353278/';
const fuentes = [
  { id: 1, titulo: 'Novo Nordisk Annual Report 2025 (anexo al Form 20-F 2025)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2026-02-04', url: E + '000035327826000012/nvo-20251231_d2.htm' },
  { id: 2, titulo: 'Novo Nordisk Annual Report 2023 (anexo al Form 20-F 2023)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2024-01-31', url: E + '000162828024002635/nvo-20231231_d2.htm' },
  { id: 3, titulo: 'Financial report for the period 1 January 2021 to 31 December 2021 (Company announcement 7/2022, 6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2022-02-02', url: E + '000162828022001621/caq42021.htm' },
  { id: 4, titulo: 'Financial report for the period 1 January 2026 to 30 June 2026 (Company announcement 48/2026, 6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2026-08-04', url: E + '000035327826000023/caq22026.htm' },
  { id: 5, titulo: 'Investor presentation, second quarter of 2026', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/pdfs/financial-results/2026/Q2-2026-Full%20presentation.pdf' },
  { id: 6, titulo: 'Form 20-F 2025 (incluye el informe de auditoría de Deloitte)', editor: 'Novo Nordisk A/S (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-04', url: E + '000035327826000012/nvo-20251231.htm' },
  { id: 7, titulo: 'Financial report for the period 1 January 2024 to 30 September 2024 (6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2024-11-06', url: E + '000162828024045439/caq32024.htm' },
  { id: 8, titulo: 'Financial report for the period 1 January 2024 to 31 December 2024 (6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2025-02-05', url: E + '000162828025003924/caq42024.htm' },
  { id: 9, titulo: 'Financial report for the period 1 January 2025 to 31 March 2025 (6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2025-05-07', url: E + '000162828025022877/caq12025.htm' },
  { id: 10, titulo: 'Financial report for the period 1 January 2025 to 30 June 2025 (6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2025-08-06', url: E + '000162828025038087/caq22025.htm' },
  { id: 11, titulo: 'Financial report for the period 1 January 2025 to 30 September 2025 (6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2025-11-05', url: E + '000035327825000005/caq32025.htm' },
  { id: 12, titulo: 'Financial report for the period 1 January 2025 to 31 December 2025 (Company announcement 4/2026, 6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2026-02-03', url: E + '000035327826000006/caq42025.htm' },
  { id: 13, titulo: 'Financial report for the period 1 January 2026 to 31 March 2026 (6-K)', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2026-05-06', url: E + '000035327826000018/caq12026.htm' },
  { id: 14, titulo: 'Capital Markets Day 2026: Financials presentation', editor: 'Novo Nordisk A/S', tipo: 'Primaria', fecha: '2026-09-21', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/pdfs/capital-markets-day/2026/financials-presentation-cmd-2026.pdf' },
];

// ---------- negocio ----------
const negocio = {
  descripcion: 'Novo Nordisk es una farmacéutica danesa centrada en enfermedades crónicas. El 94 % de sus ventas de 2025 (289.456 de 309.064 M DKK) viene de obesidad y diabetes: análogos de GLP-1 basados en la semaglutida (Ozempic 127.089 M, Wegovy 79.106 M, Rybelsus 22.093 M), insulinas (53.137 M) y Saxenda; el 6 % restante, de enfermedades raras de la sangre y endocrinas (19.608 M) [1]. Vende a través de dos unidades: EE. UU. (56 % de las ventas) e Internacional (Europa y Canadá, mercados emergentes, APAC y China) [1]. En EE. UU. cobra a través de mayoristas, aseguradoras y programas públicos, y desde 2026 también en venta directa al paciente y telemedicina, con el Wegovy en pastilla lanzado el 5-ene-2026 [4]. Fabrica sobre todo en Dinamarca (194.790 M DKK de inmovilizado e intangibles) y en EE. UU. (77.394 M), incluidas las tres plantas de llenado compradas a Catalent en 2024 [1]. Tenía 69.505 empleados a fin de 2025 y sus productos de obesidad y diabetes llegan a 45,6 millones de pacientes [1].',
  como_gana_dinero: 'Novo vende medicamentos crónicos de prescripción con un margen bruto del 81,0 % en 2025 (83,2 % en 2021) y un margen operativo del 41,3 % [1]. El precio de catálogo no es el precio cobrado: en 2025 las ventas brutas fueron 729.423 M DKK y las deducciones (descuentos a aseguradoras, Medicare, Medicaid, 340B, contracargos de mayoristas y devoluciones) 420.359 M; en EE. UU. los descuentos son el 70 % de la venta bruta (69 % en 2024, 74 % en 2023) [1]. Por eso el beneficio depende sobre todo del precio neto en EE. UU. y de las provisiones de descuentos, que se revisan cada trimestre: en 2025 se revirtieron 4.193 M de provisiones de años anteriores y en el 1T26 26.760 M de la provisión del 340B [1, 4]. El crecimiento de 2026 viene de volumen (GLP-1 en obesidad) con precio realizado a la baja [4, 5]. La I+D pesa el 16,8 % de las ventas y el capex llegó a su máximo en 2025 [1, 14].',
  segmentos: [
    { nombre: 'Obesidad y diabetes (Obesity and Diabetes care)', descripcion: 'GLP-1 (Ozempic, Rybelsus, Victoza, Wegovy, Saxenda), insulinas y otros productos de diabetes; incluye enfermedades cardiovasculares y emergentes. Hasta 2024 se llamaba Diabetes and Obesity care.', tipo_resultado: 'EBIT', historico: [
      { periodo: '2021', ingresos: 121597, resultado: 49538 },
      { periodo: '2022', ingresos: 156412, resultado: 67395 },
      { periodo: '2023', ingresos: 215098, resultado: 99623 },
      { periodo: '2024', ingresos: 271764, resultado: 127719 },
      { periodo: '2025', ingresos: 289456, resultado: 126446 },
    ] },
    { nombre: 'Enfermedades raras (Rare disease)', descripcion: 'Trastornos raros de la sangre (hemofilia A y B, NovoSeven) y endocrinos (hormona de crecimiento: Norditropin, Sogroya) y terapia hormonal sustitutiva.', tipo_resultado: 'EBIT', historico: [
      { periodo: '2021', ingresos: 19203, resultado: 9106 },
      { periodo: '2022', ingresos: 20542, resultado: 7414 },
      { periodo: '2023', ingresos: 17163, resultado: 2951 },
      { periodo: '2024', ingresos: 18639, resultado: 620 },
      { periodo: '2025', ingresos: 19608, resultado: 1212 },
    ] },
  ],
  geografias: [
    { nombre: 'EE. UU. (US Operations)', peso_pct: 56.0 },
    { nombre: 'Europa y Canadá (EUCAN)', peso_pct: 21.4 },
    { nombre: 'Mercados emergentes (Latinoamérica, Oriente Medio, África)', peso_pct: 9.8 },
    { nombre: 'APAC (Japón, Corea, Oceanía, Sudeste Asiático)', peso_pct: 6.7 },
    { nombre: 'Región China (China, Hong Kong, Taiwán)', peso_pct: 6.1 },
  ],
  geografias_criterio: 'destino',
  clientes: 'En EE. UU. (56 % de las ventas de 2025) Novo vende a mayoristas, pero el precio lo fijan los pagadores: gestoras de beneficios farmacéuticos y aseguradoras (247.003 M DKK de descuentos en 2025), Medicaid (38.749 M), contracargos de mayoristas (69.504 M) y el programa 340B [1]. En noviembre de 2025 pactó con la Administración de EE. UU. (acuerdo de «nación más favorecida») más acceso y menor precio de la semaglutida en Medicare Part D, Medicaid y venta directa al paciente; el Wegovy oral se vende en autopago a 149-299 USD al mes según dosis [4]. El poder de precios se está perdiendo: el 2T26 y el 1S26 crecen por volumen con precio realizado más bajo, en China el precio de obesidad cae y en Canadá la pérdida de exclusividad de la semaglutida ha bajado el precio con volumen estable [4]. La empresa no publica la concentración por cliente en los documentos leídos.',
  kpis: [
    { kpi: 'Ventas de Wegovy (M DKK)', valor_anterior: '58.206 (2024)', valor_actual: '79.106 (2025)', variacion: '+35,9 %', comentario: 'EE. UU. 51.015 e Internacional 28.091 en 2025; en el 2T26, recetas semanales de Wegovy en EE. UU. ~575.000, de ellas ~265.000 de la pastilla [1, 5].' },
    { kpi: 'Ventas de Ozempic (M DKK)', valor_anterior: '120.342 (2024)', valor_actual: '127.089 (2025)', variacion: '+5,6 %', comentario: 'Producto más vendido; EE. UU. 88.467. En el 1T26 la diabetes GLP-1 en EE. UU. cayó por volumen y precio [1, 13].' },
    { kpi: 'Ventas de Rybelsus (M DKK)', valor_anterior: '23.301 (2024)', valor_actual: '22.093 (2025)', variacion: '-5,2 %', comentario: 'Cae en EE. UU. (8.833 frente a 10.795) y crece en Internacional [1].' },
    { kpi: 'Ventas de insulinas (M DKK)', valor_anterior: '55.373 (2024)', valor_actual: '53.137 (2025)', variacion: '-4,0 %', comentario: 'Levemir prácticamente desaparece en EE. UU. (6 frente a 2.451) [1].' },
    { kpi: 'Obesidad frente a diabetes (ventas, M DKK)', valor_anterior: 'Obesidad 65.146 / Diabetes 206.618 (2024)', valor_actual: 'Obesidad 82.347 / Diabetes 207.109 (2025)', variacion: 'Obesidad +26,4 %; diabetes +0,2 %', comentario: 'La obesidad pasa del 22 % al 27 % de las ventas; 1S26 obesidad 44.064 M (+19 % a tipo constante) [1, 4].' },
    { kpi: 'EE. UU. frente a Internacional (ventas, M DKK)', valor_anterior: 'EE. UU. 167.402 / IO 122.999 (2024)', valor_actual: 'EE. UU. 173.166 / IO 135.898 (2025)', variacion: 'EE. UU. +3,4 %; IO +10,5 %', comentario: '1S26 ajustado: EE. UU. 76.254 M (-4 % a tipo constante), IO 72.297 M (+8 %) [1, 4, 12].' },
    { kpi: 'Volumen frente a precio (2T26)', valor_anterior: '1T26: ventas ajustadas -4 % a tipo constante', valor_actual: '2T26: ventas ajustadas +7 % a tipo constante', variacion: 'Volumen al alza, precio realizado a la baja', comentario: 'La empresa no cuantifica el reparto: atribuye el 2T26 al volumen de GLP-1 en ambas unidades, compensado en parte por precios realizados más bajos, y a ajustes favorables de descuentos en EE. UU. [4, 5, 13].' },
    { kpi: 'Plantilla (personas, fin de año)', valor_anterior: '77.349 (2024)', valor_actual: '69.505 (2025)', variacion: '-10 %', comentario: 'Reestructuración de ~9.000 puestos anunciada el 10-sep-2025; -13.000 FTE (-16 %) de agosto de 2025 a agosto de 2026 [1, 14].' },
  ],
  confianza: 'Alta',
};

// ---------- financieros ----------
const cuenta = [
  { periodo: '2021', ingresos: 140800, coste_ventas: 23658, gastos_generales: 41058, ebitda: 64669, amortizaciones: 6025, ebit: 58644, resultado_financiero: 436, bai: 59080, impuestos: 11323, minoritarios: 0, beneficio_neto: 47757, gastos_financieros: 289, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 10.37, dpa: 5.20, dpa_extraordinario: 0, acciones_diluidas: 4606.2 },
  { periodo: '2022', ingresos: 176954, coste_ventas: 28448, gastos_generales: 50684, ebitda: 82171, amortizaciones: 7362, ebit: 74809, resultado_financiero: -5747, bai: 69062, impuestos: 13537, minoritarios: 0, beneficio_neto: 55525, gastos_financieros: 378, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 12.22, dpa: 6.20, dpa_extraordinario: 0, acciones_diluidas: 4544.6 },
  { periodo: '2023', ingresos: 232261, coste_ventas: 35765, gastos_generales: 61598, ebitda: 111987, amortizaciones: 9413, ebit: 102574, resultado_financiero: 2100, bai: 104674, impuestos: 20991, minoritarios: 0, beneficio_neto: 83683, gastos_financieros: 542, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 18.62, dpa: 9.40, dpa_extraordinario: 0, acciones_diluidas: 4494.8 },
  { periodo: '2024', ingresos: 290403, coste_ventas: 44522, gastos_generales: 67377, ebitda: 147446, amortizaciones: 19107, ebit: 128339, resultado_financiero: -1148, bai: 127191, impuestos: 26203, minoritarios: 0, beneficio_neto: 100988, gastos_financieros: 1640, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 22.63, dpa: 11.40, dpa_extraordinario: 0, acciones_diluidas: 4463.0 },
  { periodo: '2025', ingresos: 309064, coste_ventas: 58788, gastos_generales: 70279, ebitda: 149640, amortizaciones: 21982, ebit: 127658, resultado_financiero: 2882, bai: 130540, impuestos: 28106, minoritarios: 0, beneficio_neto: 102434, gastos_financieros: 4207, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 2995, bpa: 23.03, dpa: 11.70, dpa_extraordinario: 0, acciones_diluidas: 4447.7 },
];

const financieros = {
  cuenta,
  ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 329431, ebitda: 169256, ebit: 142097, beneficio_neto: 116443, bpa: 26.20, dpa: 11.70, dpa_extraordinario: 0, fcf: 72518, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -18116 },
  cambios_perimetro: [
    { periodo: '2024', descripcion: 'Tres plantas de llenado y acabado de Catalent, compradas a Novo Holdings el 18-dic-2024 por 11.723 M USD (82.146 M DKK): entran en el balance de 2024 y casi nada en la cuenta; consolidan el año entero desde 2025.' },
  ],
  comentario: 'Las ventas pasan de 140.800 M DKK en 2021 a 309.064 M en 2025 (x2,2), todo orgánico salvo las plantas de Catalent, que aportan capacidad y no ventas [1, 2]. El crecimiento a tipo constante se frena del 35,6 % de 2023 al 25,7 % de 2024 y al 10,3 % de 2025 [1]. El margen operativo se mantiene en el 41-44 % hasta 2024 y cae 290 pb en 2025, al 41,3 %: el margen bruto pierde 370 pb (84,7 % a 81,0 %) por los costes de reestructuración (~3.000 M en el coste de ventas), deterioros de plantas y la amortización de las plantas de Catalent [1, 11]. La I+D sube del 12,6 % de las ventas en 2021 al 16,8 % en 2025, y los gastos comerciales bajan del 26,3 % al 20,8 % [1]. Las amortizaciones y deterioros saltan de 9.413 M en 2023 a 19.107 M en 2024 (deterioro de ocedurenona de 5.700 M) y 21.982 M en 2025 [1, 12]. En el 1S26 el beneficio operativo publicado sube un 20 % (86.679 M) solo por la reversión del 340B; el ajustado baja de 69.591 M a 66.247 M [4]. 2024 no es comparable en balance por Catalent.',
  ajustes: 'Desde 2026 Novo publica ventas y beneficio operativo ajustados, que excluyen las reversiones de la provisión del 340B (2.649 M DKK de ventas en el 2T25 y 26.760 M en el 1T26), los deterioros de más de 1.000 M (6.328 M en el 2T26, 4.000 M de ellos de monlunabant) y los litigios de más de 1.000 M [4]. En 2025 la reestructuración costó 9.366 M: 5.220 M de indemnizaciones y 424 M de contratos cancelados (dentro del EBITDA), y 2.370 M de deterioro de inmovilizado y 1.352 M de intangibles (fuera del EBITDA, en amortizaciones) [1]. Los no recurrentes dentro del EBITDA son: 2025, 5.644 M de reestructuración menos 2.649 M del 340B = 2.995 M; LTM jun-26, 5.644 M (3T25) menos 26.760 M (1T26) más ~3.000 M de costes únicos por redimensionar contratos de capacidad de fabricación (2T26, en el margen bruto; Novo no los ajusta) = -18.116 M [1, 4, 11]. No se ajustan los ajustes de descuentos de años anteriores, que se repiten: 4.193 M revertidos en 2025, 6.452 M en 2024 [1]. El BPA ajustado de 2025 (26,17 DKK) excluye además la amortización de intangibles [1]. El FCF del LTM (72.518 M) es estimación propia, con el mismo criterio de capex que los flujos: flujo operativo antes de intereses 133.902 M menos capex material 56.043 M, software ~528 M (cifra de 2025), intereses netos pagados 3.310 M y arrendamientos de 2025 (1.503 M). Las compras de intangibles de I+D del LTM (unos 27.500 M, sobre todo Akero) se tratan como adquisiciones.',
  confianza: 'Alta',
};

// ---------- trimestres ----------
const tq = [
  ['3T24', 71311, 21, 23, 35972, 6.12],
  ['4T24', 85683, 30, 30, 41935, 6.34],
  ['1T25', 78087, 19, 18, 42621, 6.53],
  ['2T25', 76857, 13, 18, 38282, 5.96],
  ['3T25', 74976, 5, 11, 31439, 4.50],
  ['4T25', 79144, -8, -2, 37298, 6.04],
  ['1T26', 96823, 24, 32, 63154, 10.91],
  ['2T26', 78488, 2, 3, 37365, 4.75],
];
const trimestres = {
  items: tq.map(([periodo, ingresos, c, co, ebitda, bpa]) => ({ periodo, ingresos, crecimiento_pct: c, crecimiento_organico_pct: co, ebitda, margen_ebitda_pct: Math.round((ebitda / ingresos) * 1000) / 10, bpa, vs_consenso: null })),
  ultima_presentacion: 'Las cifras de crecimiento orgánico son a tipo de cambio constante (la empresa no tiene compras relevantes en el periodo), tomadas de cada informe trimestral [7-13], y sobre ventas publicadas, que incluyen las reversiones del 340B: el 1T26 sube un 32 % publicado pero baja un 4 % ajustado, y el 2T26 sube un 3 % publicado y un 7 % ajustado [4, 13]. El 2T25 llevaba ~3.000 M DKK de ajustes de descuentos de años anteriores y el 3T25 ~2.000 M de ajustes y ~1.000 M de compras de mayoristas [10, 11].\n\nEn mayo de 2026 la dirección guiaba una caída de las ventas y del beneficio operativo ajustados del 4 % al 12 % a tipo constante; en agosto la subió a una caída del 0 % al 6 % en ambas, por más ventas de GLP-1 [5]. Sin ajustar, el punto medio sería +5 % en ventas y +12 % en beneficio operativo [5]. El mensaje cambió de defender la base a la tracción del Wegovy oral: más de 5 millones de recetas en EE. UU. desde su lanzamiento el 5-ene-2026 y ~265.000 recetas semanales, el mejor lanzamiento de un GLP-1 en volumen [4, 5]. A la vez reconoció precios realizados más bajos, el fracaso del ensayo ZEUS de ziltivekimab y 6.328 M de deterioros en el 2T26 [4, 5]. En el Capital Markets Day del 21-sep-2026 fijó crecer en 2026-2030 al ritmo de sus pares con un margen operativo ajustado estable (41 % en 2025) y un capex en descenso desde el máximo de 2025 [14]. No se han leído transcripciones de las conferencias, así que este texto no recoge las preguntas de los analistas.',
  confianza: 'Media',
};

// ---------- balance ----------
const balance = {
  historico: [
    { periodo: '2021', activo_total: 194508, activo_corriente: 85595, pasivo_corriente: 99516, pasivo_total: 123762, fondo_comercio: 4346, intangibles: 38825, inmovilizado_material: 55362, existencias: 19621, clientes: 40643, proveedores: 8870, activos_contrato: null, pasivos_contrato: null, caja: 17485, deuda_financiera: 22516, arrendamientos: 4129, patrimonio_neto: 70746, minoritarios: 0, reservas: 72004 },
    { periodo: '2022', activo_total: 241257, activo_corriente: 108194, pasivo_corriente: 120940, pasivo_total: 157771, fondo_comercio: 4615, intangibles: 46324, inmovilizado_material: 66671, existencias: 24388, clientes: 50560, proveedores: 15587, activos_contrato: null, pasivos_contrato: null, caja: 23574, deuda_financiera: 21255, arrendamientos: 4529, patrimonio_neto: 83486, minoritarios: 0, reservas: 80587 },
    { periodo: '2023', activo_total: 314486, activo_corriente: 139646, pasivo_corriente: 169655, pasivo_total: 207925, fondo_comercio: 4464, intangibles: 55942, inmovilizado_material: 90961, existencias: 31811, clientes: 64770, proveedores: 25606, activos_contrato: null, pasivos_contrato: null, caja: 30230, deuda_financiera: 21280, arrendamientos: 5726, patrimonio_neto: 106561, minoritarios: 0, reservas: 104839 },
    { periodo: '2024', activo_total: 465630, activo_corriente: 161788, pasivo_corriente: 217614, pasivo_total: 322144, fondo_comercio: 20017, intangibles: 90804, inmovilizado_material: 161680, existencias: 40849, clientes: 71949, proveedores: 17140, activos_contrato: null, pasivos_contrato: null, caja: 26308, deuda_financiera: 96021, arrendamientos: 6766, patrimonio_neto: 143486, minoritarios: 0, reservas: 144448 },
    { periodo: '2025', activo_total: 542902, activo_corriente: 172453, pasivo_corriente: 215661, pasivo_total: 348855, fondo_comercio: 19845, intangibles: 110208, inmovilizado_material: 208378, existencias: 49623, clientes: 70856, proveedores: 19758, activos_contrato: null, pasivos_contrato: null, caja: 26962, deuda_financiera: 122386, arrendamientos: 8572, patrimonio_neto: 194047, minoritarios: 0, reservas: 195298 },
  ],
  vencimientos: [
    { anio: '2026', importe: 10638 },
    { anio: '2027', importe: 19045 },
    { anio: '2028', importe: 15685 },
    { anio: '2029', importe: 12324 },
    { anio: '2030', importe: 11203 },
    { anio: '2031+', importe: 53776 },
  ],
  liquidez: 'A 31-dic-2025: caja 26.464 M DKK + valores negociables 498 M + línea de crédito comprometida no dispuesta 24.401 M (3.267 M EUR, vence en 2030) + préstamo puente no dispuesto 7.469 M; reservas financieras de 48.151 M netas de la deuda que vence en 12 meses [1]. A 30-jun-2026 la caja era de 44.482 M [4].',
  rating: "Moody's Aa3 (subido el 22-ene-2025) y S&P AA (subido el 19-may-2025); perspectiva no indicada en los documentos leídos",
  coste_deuda_pct: 3.9,
  vida_media_anios: null,
  otros_pasivos: 'El pasivo más grande no es deuda: las deducciones de ventas y devoluciones (descuentos en EE. UU., Medicaid, 340B, contracargos) suman 134.400 M DKK a fin de 2025 (135.909 M en 2024), el 39 % de todo el pasivo, y 141.730 M a junio de 2026 [1, 4]. Son estimaciones: el auditor las señala como asunto clave de auditoría, y en el 1T26 se revirtieron 26.760 M de la provisión del 340B [4, 6]. Otras provisiones (litigios, devoluciones de producto fuera de EE. UU., otras) 6.104 M y pensiones 861 M en 2025 [1]. La compra de las plantas de Catalent a Novo Holdings tiene mecanismos de cierre: 1.004 M ya cobrados y posibles ajustes futuros que irían a resultados [1]. No hay covenants financieros en los documentos leídos. Desde 2025 hay papel comercial (745 M) y préstamos bancarios casi amortizados (384 M) [1].',
  comentario: 'Novo pasó de caja neta a deuda: la deuda financiera sin arrendamientos sube de 21.280 M DKK en 2023 a 96.021 M en 2024 y 122.386 M en 2025, para pagar las plantas de Catalent (82.146 M) y luego Akero [1]. En 2025 emitió once tramos de eurobonos por 10.000 M EUR y devolvió los préstamos puente; la deuda neta de la empresa fue de 95.424 M (0,64x el EBITDA) [1, 14]. En 2026 devolvió 1.300 M EUR en mayo y emitió 1.090 M CHF en junio; hay 15.000 M EUR y 1.090 M CHF en bonos [4]. El circulante es negativo porque las provisiones de descuentos superan clientes y existencias; los clientes saltan de 70.856 M a 88.949 M en el 1S26 [4]. El inmovilizado material casi se triplica en dos años (90.961 M en 2023 a 208.378 M en 2025) por el capex de capacidad [1].',
  confianza: 'Alta',
};

// ---------- flujos ----------
const flujos = {
  historico: [
    { periodo: '2021', flujo_operativo: 55000, capex: 7385, pagos_arrendamientos: 874, adquisiciones: 18283, desinversiones: 0, dividendos: 21517, recompras: 19447, emision_acciones: 0, intereses_en_financiacion: 0 },
    { periodo: '2022', flujo_operativo: 78887, capex: 13572, pagos_arrendamientos: 998, adquisiciones: 8256, desinversiones: 0, dividendos: 25303, recompras: 24086, emision_acciones: 0, intereses_en_financiacion: 0 },
    { periodo: '2023', flujo_operativo: 108908, capex: 26306, pagos_arrendamientos: 1448, adquisiciones: 12590, desinversiones: 0, dividendos: 31767, recompras: 29924, emision_acciones: 0, intereses_en_financiacion: 0 },
    { periodo: '2024', flujo_operativo: 120968, capex: 47874, pagos_arrendamientos: 1417, adquisiciones: 85598, desinversiones: 0, dividendos: 44140, recompras: 20181, emision_acciones: 0, intereses_en_financiacion: 0 },
    { periodo: '2025', flujo_operativo: 119102, capex: 60668, pagos_arrendamientos: 1503, adquisiciones: 29445, desinversiones: 1004, dividendos: 51763, recompras: 1388, emision_acciones: 0, intereses_en_financiacion: 0 },
  ],
  comentario: 'El flujo operativo se dobla de 55.000 M DKK en 2021 a 119.102 M en 2025, pero el capex material se multiplica por diez (6.335 M a 60.140 M) y el FCF que publicaba la empresa cae de 68.326 M en 2023 a -14.707 M en 2024 (Catalent) y 28.295 M en 2025 [1]. Criterio del capex: inmovilizado material más altas de software; el resto de la compra de intangibles (derechos de propiedad intelectual y know-how: licencias y compras de cartera de I+D) va en adquisiciones. En 2025 la compra de intangibles fue de 29.973 M, de ellos 28.719 M de altas de propiedad intelectual (sobre todo Akero, contabilizada como compra de activos y no como combinación de negocios) y 528 M de software; en 2023, 13.090 M (12.567 M de propiedad intelectual, 500 M de software); en 2024, 4.145 M (710 M de software); en 2022, 2.607 M (1.426 M de software) [1, 2]. En 2021 no hay desglose y los 1.050 M quedan en capex. Así, las adquisiciones suman 29.445 M en 2025, 85.598 M en 2024 (82.163 M de Catalent), 12.590 M en 2023 y 8.256 M en 2022. Desde 2026 la empresa define el FCF como flujo operativo menos inmovilizado material: 61.000 M en 2025 y 55.300 M en el 1S26, con un capex material guiado de ~55.000 M y un FCF de 45.000-55.000 M para 2026 [4, 5, 14]. Novo dice que el capex tocó techo en 2025 y bajará hacia la media del sector, pero no separa mantenimiento y crecimiento. Estimación propia: si el mantenimiento se aproxima a la depreciación material (~8.100 M en 2025 = 14.666 M de amortizaciones menos 6.529 M de intangibles), ~52.000 M del capex de 2025 fue de capacidad, y el FCF sin ese capex ni la compra de Akero habría rondado 109.000 M. Los intereses fueron en el flujo operativo hasta 2025; desde 2026, en financiación e inversión [4].',
  confianza: 'Alta',
};

// ---------- calidad ----------
const calidad = {
  auditor: 'Deloitte Statsautoriseret Revisionspartnerselskab (PCAOB 1294)',
  anios_auditor: 5,
  opinion: 'Favorable (sin salvedades) sobre las cuentas de 2025 y sobre el control interno; asunto clave de auditoría: descuentos de ventas en EE. UU., incluidas las provisiones del 340B',
  comentario: 'Deloitte audita a Novo desde 2021 y da opinión favorable sobre las cuentas y el control interno de 2025 [6]. El riesgo contable está en el reconocimiento de ingresos: las ventas netas salen de restar 420.359 M DKK de descuentos estimados a 729.423 M de ventas brutas, y la empresa revierte provisiones de años anteriores todos los años (2.364 M en 2023, 6.452 M en 2024, 4.193 M en 2025, más 26.760 M del 340B en el 1T26) [1, 4]. Un error del 1 % en los descuentos de EE. UU. mueve unos 3.900 M del beneficio operativo. Los deterioros de I+D se repiten: ocedurenona (5.700 M en el 2T24, comprada en 2023), 2.760 M de intangibles en 2025 y 6.328 M en el 2T26, de ellos 4.000 M de monlunabant (de Inversago, 2023) [1, 4, 12]. La empresa cambió en 2025-2026 la presentación del balance (fondo de comercio y deducciones de ventas en partidas propias), la definición del FCF y la clasificación de intereses, e introdujo métricas ajustadas: cada cambio está explicado, pero complica la comparación. La I+D no se capitaliza salvo licencias y compras. Altman, Piotroski y Beneish los calcula el motor; 2024 lleva el salto de activo de Catalent.',
  senales: [
    { senal: 'Provisiones de descuentos en EE. UU. enormes y con reversiones recurrentes', nivel: 'Alta', comentario: '134.400 M DKK a fin de 2025; reversiones de 340B de 2.649 M (2T25) y 26.760 M (1T26) y ajustes de años anteriores todos los años [1, 4].' },
    { senal: 'Ajustes de descuentos de años anteriores que mejoran trimestres concretos', nivel: 'Media', comentario: '4T24, 2T25 (~3.000 M), 3T25 (~2.000 M), 4T25 y 2T26 citan ajustes favorables en EE. UU. que la empresa no excluye de lo ajustado [8, 10, 11, 12, 4].' },
    { senal: 'Deterioros repetidos de activos comprados', nivel: 'Media', comentario: 'Ocedurenona 5.700 M (2T24), monlunabant 4.000 M (2T26), 2.760 M de intangibles en 2025 [1, 4, 12].' },
    { senal: 'Operación con el accionista de control', nivel: 'Media', comentario: 'Plantas de Catalent compradas a Novo Holdings por 82.146 M DKK, con 15.245 M de fondo de comercio y mecanismos de cierre aún abiertos [1].' },
    { senal: 'Cambios de definición y presentación', nivel: 'Baja', comentario: 'Métricas ajustadas desde 2026, nueva definición del FCF, intereses fuera del flujo operativo y reclasificaciones de balance en 2025 [1, 4, 14].' },
    { senal: 'Subida de clientes en el 1S26', nivel: 'Baja', comentario: 'Clientes de 70.856 M a 88.949 M en seis meses con ventas ajustadas planas: vigilar los días de cobro [4].' },
  ],
  confianza: 'Media',
};

// ---------- capital ----------
const capital = {
  politica: 'Novo reparte cerca del 50 % del beneficio (payout del 49,6 % al 50,7 % en 2021-2025) en dos pagos: un dividendo a cuenta en agosto y el complementario tras la junta de marzo [1]. Para 2025 fueron 11,70 DKK por acción (3,75 a cuenta y 7,95 complementario) y para 2026 hay 3,75 DKK a cuenta pagados el 18-ago-2026 [1, 4]. Lleva 31 años seguidos subiendo el dividendo por acción [14]. Las recompras bajaron de 29.924 M en 2023 a 1.388 M en 2025; en 2026 hay un programa de hasta 15.000 M en 12 meses desde el 4-feb-2026, con 7.533 M ejecutados a 3-ago-2026 [1, 4]. Prioridades declaradas: crecimiento interno, dividendo por acción atractivo, compras pequeñas para la cartera de I+D y recompras flexibles [14].',
  adquisiciones: [
    { anio: '2021', objetivo: 'Dicerna Pharmaceuticals (ARN de interferencia)', importe: 18283, ev_ebitda: null, financiacion: 'Préstamo puente refinanciado en 2022 con eurobonos', resultado: 'Plataforma de I+D sin ventas; no se ha evaluado su resultado en esta nota [1, 2].' },
    { anio: '2022', objetivo: 'Forma Therapeutics (etavopivat, anemia falciforme)', importe: 7075, ev_ebitda: null, financiacion: 'Caja', resultado: 'Etavopivat completó con éxito la fase 3 HIBISCUS en 2026; presentación a EE. UU. y la UE prevista en el 4T26 [2, 5].' },
    { anio: '2023', objetivo: 'Inversago (monlunabant, obesidad) y ocedurenona (KBP Biosciences, hipertensión)', importe: null, ev_ebitda: null, financiacion: 'Caja (compras de intangibles: 13.090 M en 2023)', resultado: 'Mal: ocedurenona deteriorada en 5.700 M en el 2T24 y monlunabant en 4.000 M en el 2T26 [1, 4, 12].' },
    { anio: '2024', objetivo: 'Tres plantas de llenado y acabado de Catalent, compradas a Novo Holdings', importe: 82146, ev_ebitda: null, financiacion: 'Préstamos puente y papel comercial, refinanciados con eurobonos en 2025', resultado: 'Capacidad, no ventas: 41.102 M de know-how y 15.245 M de fondo de comercio; elevan amortizaciones y coste de ventas desde 2025, y en el 2T26 hubo ~3.000 M de costes por redimensionar contratos de capacidad [1, 4, 11].' },
    { anio: '2025', objetivo: 'Akero Therapeutics (efruxifermin, MASH)', importe: null, ev_ebitda: null, financiacion: 'Eurobonos emitidos en 2025', resultado: 'Contabilizada como compra de activos dentro de los 28.719 M de altas de propiedad intelectual de 2025 (en adquisiciones en los flujos de esta nota); la fase 3 sigue en curso, con resultados de seguridad previstos en el 4T26 [1, 5].' },
  ],
  comentario: 'En 2021-2025 Novo generó 482.865 M DKK de flujo operativo y los usó así: 155.805 M de capex (inmovilizado material y software), 154.172 M en compras de negocios y de activos de I+D (82.163 M de ellos en Catalent, 2024, y ~28.700 M en Akero y otras licencias en 2025), 174.490 M en dividendos y 95.026 M en recompras [1, 2]. Como el flujo no alcanzó, la deuda financiera sin arrendamientos pasó de 22.516 M a 122.386 M [1, 3]. Las acciones diluidas bajaron de 4.606 M a 4.448 M (-3,4 %) por las recompras [1, 2]. Las compras de I+D tienen un historial irregular: dos de las de 2023 se deterioraron en 9.700 M en total; Forma (etavopivat) sí ha dado una fase 3 positiva [1, 4, 5, 12]. La compra de Catalent a su propio accionista de control es la mayor de su historia y todavía no tiene un rendimiento medible por separado.',
  confianza: 'Media',
};

const huecos = [
  { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) Informes trimestrales y presentaciones de la empresa: no publican el consenso; 2) web de inversores de Novo (consenso de analistas): novonordisk.com no respondía a las descargas; 3) búsqueda de prensa no hecha para no gastar el cupo compartido de búsquedas', decision: 'Omitido' },
  { seccion: 'trimestres', campo: 'preguntas de los analistas en las conferencias del 1T26 y 2T26', tipo: 'Complemento', intentos: '1) Transcripción en la web de Novo: la web no respondía; 2) 6-K en EDGAR: Novo no deposita las transcripciones; 3) resumen de prensa no buscado por el límite de búsquedas', decision: 'Omitido' },
  { seccion: 'capital', campo: 'importe de las compras de Inversago, ocedurenona y Akero', tipo: 'Complemento', intentos: '1) Nota 5.3 del informe anual 2025: no fueron combinaciones de negocios, no se desglosan; 2) informes del 4T23 y 4T25: solo el total de compras de intangibles; 3) derivar: solo se puede acotar por las compras de intangibles (13.090 M en 2023, 29.973 M en 2025)', decision: 'Omitido' },
  { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) Nota 4.6 del informe anual 2025: no la da; 2) presentación del 2T26 y CMD de finanzas: no la dan; 3) calcularla con la tabla de bonos: posible, pero no hecha', decision: 'Omitido' },
  { seccion: 'flujos', campo: 'capex de mantenimiento', tipo: 'Complemento', intentos: '1) Informe anual 2025: no lo separa; 2) CMD 2026 de finanzas: solo dice que el capex tocó techo en 2025; 3) estimación por la depreciación material', decision: 'Calculado y marcado como estimación' },
];

const nota = { negocio, financieros, trimestres, balance, flujos, calidad, rentabilidad: null, capital, fuentes, huecos };
writeFileSync(path.join(dir, 'A.json'), JSON.stringify(nota, null, 2), 'utf8');
console.log('A.json escrito');
