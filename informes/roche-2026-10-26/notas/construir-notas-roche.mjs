// Notas A-E de Roche (corte 26-oct-2026). Hechos con fuente; sin juicio. Se ejecuta por partes: node construir-notas-roche.mjs A|B|C|D|E|todas
// Fuentes primarias descargadas en notas/docs (Finance Reports 2020-2025, Half-Year Report 2026, Annual Report 2025, presentaciones y ad hoc del 3T26).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const TX = await import('./abc-textos-roche.mjs');
const funde = (o, t) => { for (const [k, v] of Object.entries(t ?? {})) { o[k] = (v && typeof v === 'object' && !Array.isArray(v) && o[k] && typeof o[k] === 'object') ? funde(o[k], v) : v; } return o; };
const w = (l, o) => { const t = { A: TX.A_textos, B: TX.B_textos, C: TX.C_textos }[l]; fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(t ? funde(structuredClone(o), t) : o, null, 2), 'utf8'); };
const que = process.argv[2] ?? 'todas';
const RA = 'https://assets.roche.com/f/176343/x/';

// ---------------------------------------------------------------- A. Cuentas
const A = {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Farma', descripcion: 'Medicamentos de Roche Pharma, Genentech (EE. UU.) y Chugai (Japón, 61,1 %): oncología y hematología, neurología, inmunología y oftalmología. Ingresos = ventas + otros ingresos (royalties e hitos).', tipo_resultado: 'EBIT',
        historico: [
          { periodo: '2021', ingresos: 48010, resultado: 15530 }, { periodo: '2022', ingresos: 48016, resultado: 16766 }, { periodo: '2023', ingresos: 46279, resultado: 17132 },
          { periodo: '2024', ingresos: 48042, resultado: 15587 }, { periodo: '2025', ingresos: 49451, resultado: 21666 }] },
      { nombre: 'Diagnóstico', descripcion: 'Laboratorio central (cobas, Elecsys), laboratorio molecular (PCR y secuenciación), anatomía patológica (Ventana) y cuidado cercano al paciente (diabetes, punto de atención).', tipo_resultado: 'EBIT',
        historico: [
          { periodo: '2021', ingresos: 17840, resultado: 3319 }, { periodo: '2022', ingresos: 17798, resultado: 4149 }, { periodo: '2023', ingresos: 14162, resultado: 2171 },
          { periodo: '2024', ingresos: 14353, resultado: 1946 }, { periodo: '2025', ingresos: 13905, resultado: 1070 }] },
      { nombre: 'Corporativo', descripcion: 'Costes centrales del grupo (2021 sin reexpresar: solo gastos generales; desde 2022 incluye funciones trasladadas desde las divisiones).', tipo_resultado: 'EBIT',
        historico: [
          { periodo: '2021', ingresos: 0, resultado: -694 }, { periodo: '2022', ingresos: 0, resultado: -3439 }, { periodo: '2023', ingresos: 0, resultado: -3908 },
          { periodo: '2024', ingresos: 0, resultado: -4116 }, { periodo: '2025', ingresos: 0, resultado: -4260 }] },
    ],
    // Ventas 2025 por destino (61.516 M CHF) [1]: EE. UU. 29.504; resto de Norteamérica 972; Europa 14.801; Japón 3.035; China 4.815; resto de Asia 3.784; Latinoamérica 3.245; África y Oceanía 1.360.
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 48.0 }, { nombre: 'Europa', peso_pct: 24.1 }, { nombre: 'China', peso_pct: 7.8 }, { nombre: 'Resto de Asia', peso_pct: 6.2 },
      { nombre: 'Latinoamérica', peso_pct: 5.3 }, { nombre: 'Japón', peso_pct: 4.9 }, { nombre: 'Otros (resto de Norteamérica, África y Oceanía)', peso_pct: 3.7 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas del grupo, crecimiento a tipo constante', valor_anterior: '+7 % (2025)', valor_actual: '+6 % (ene-sep 2026)', variacion: '3T26: +7 % a tipo constante y +8 % en CHF', comentario: 'Farma +7 % y Diagnóstico +4 % en nueve meses; el 3T de Japón lleva un adelanto por el cambio de ERP [6, 7].' },
      { kpi: 'BPA core diluido (CHF)', valor_anterior: '18,80 (2024)', valor_actual: '19,46 (2025); 10,85 (1S26)', variacion: '+11 % a tipo constante en 2025; +9 % en el 1S26', comentario: 'El franco restó 7 puntos en 2025 y 11 en el 1S26 [1, 5].' },
      { kpi: 'Margen operativo core', valor_anterior: '34,4 % (2024)', valor_actual: '35,5 % (2025); 39,0 % (1S26)', variacion: '+1,1 puntos en 2025', comentario: 'Farma 53,0 % y Diagnóstico 17,5 % en el 1S26 [1, 5].' },
      { kpi: 'Ventas de los cinco motores (Xolair, Hemlibra, Ocrevus, Phesgo, Vabysmo)', valor_anterior: '—', valor_actual: '16.800 M CHF (ene-sep 2026)', variacion: '+12 % a tipo constante', comentario: 'Compensan la caída de los productos sin patente (−0,4 bn a tipo constante) [6].' },
      { kpi: 'Impacto de pérdidas de exclusividad', valor_anterior: '−0,7 bn CHF (2025)', valor_actual: '≈ −0,6 bn CHF previsto en 2026', variacion: 'Rebajado desde ≈ −1 bn en enero', comentario: 'Avastin, Herceptin, MabThera, Lucentis y Actemra [7, 11, 12].' },
      { kpi: 'Flujo de caja libre (definición de Roche)', valor_anterior: '15.336 M CHF (2024)', valor_actual: '11.807 M (2025); 4.197 M (1S26)', variacion: '−23 % en CHF en 2025', comentario: 'Más circulante, compras de intangibles e impuestos en 2025; el 1S26 sube un 26 % [1, 5].' },
      { kpi: 'Ventas de Diagnóstico', valor_anterior: '13.847 M CHF (2025, +4 % a tipo constante)', valor_actual: '10.281 M (ene-sep 2026)', variacion: '+4 % a tipo constante', comentario: 'Asia-Pacífico −4 % por las reformas de precios en China; Norteamérica +9 % [6].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    // Finance Reports [1-4]; 2022 reexpresado (fb23e). gastos_generales = venta, generales y administración (2021: distribución + administración).
    // amortizaciones = depreciación de inmovilizado y de derechos de uso + amortización de intangibles; los deterioros (fondo de comercio, intangibles,
    // inmovilizado y derechos de uso) van en no_recurrentes_en_ebitda (nota «Cash generated from operations»).
    cuenta: [
      { periodo: '2021', ingresos: 65850, coste_ventas: 19647, gastos_generales: 13249, ebitda: 22598, amortizaciones: 4443, ebit: 18155, resultado_financiero: -757, bai: 17398, impuestos: 2463, minoritarios: 1005, beneficio_neto: 13930, gastos_financieros: 418, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 653, bpa: 16.2, dpa: 9.3, dpa_extraordinario: 0, acciones_diluidas: 860 },
      { periodo: '2022', ingresos: 65814, coste_ventas: 19737, gastos_generales: 14201, ebitda: 21320, amortizaciones: 3844, ebit: 17476, resultado_financiero: -1149, bai: 16327, impuestos: 2796, minoritarios: 1110, beneficio_neto: 12421, gastos_financieros: 665, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 2965, bpa: 15.37, dpa: 9.5, dpa_extraordinario: 0, acciones_diluidas: 808 },
      { periodo: '2023', ingresos: 60441, coste_ventas: 16357, gastos_generales: 14881, ebitda: 18859, amortizaciones: 3464, ebit: 15395, resultado_financiero: -1316, bai: 14079, impuestos: 1721, minoritarios: 860, beneficio_neto: 11498, gastos_financieros: 996, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1868, bpa: 14.31, dpa: 9.6, dpa_extraordinario: 0, acciones_diluidas: 804 },
      { periodo: '2024', ingresos: 62395, coste_ventas: 16283, gastos_generales: 14896, ebitda: 16840, amortizaciones: 3423, ebit: 13417, resultado_financiero: -1624, bai: 11793, impuestos: 2606, minoritarios: 910, beneficio_neto: 8277, gastos_financieros: 1412, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 5417, bpa: 10.31, dpa: 9.7, dpa_extraordinario: 0, acciones_diluidas: 802 },
      { periodo: '2025', ingresos: 63356, coste_ventas: 16645, gastos_generales: 15161, ebitda: 21862, amortizaciones: 3386, ebit: 18476, resultado_financiero: -1503, bai: 16973, impuestos: 3174, minoritarios: 919, beneficio_neto: 12880, gastos_financieros: 1349, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 715, bpa: 16.04, dpa: 9.8, dpa_extraordinario: 0, acciones_diluidas: 803 },
    ],
    // LTM jun-26 = 2025 − 1S25 + 1S26 [1, 5]. FCF = flujo operativo 19.387 − capex 5.494 − arrendamientos 334 − intereses 1.139.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 62959, ebitda: 21214, ebit: 17817, beneficio_neto: 12341, bpa: 15.33, dpa: 9.8, dpa_extraordinario: 0, fcf: 12420, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1496 },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Telavant (anticuerpo anti-TL1A), compra de activos cerrada el 14-dic-23 por 7.100 M USD (6.200 M CHF): entra en el balance (intangibles) y no en la cuenta.' },
    ],
    // BPA core diluido (el que guía Roche y sigue el mercado): 2019 20,16; 2020 19,16; 2021 19,81; 2022 20,30; 2023 18,57; 2024 18,80; 2025 19,46 [1-4, 10].
    // Beneficio core atribuido: 2021 17.037; 2022 16.400; 2023 14.927; 2024 15.081; 2025 15.622 (M CHF).
    // Beneficio operativo core: 2021 21.897; 2022 22.173; 2023 19.240; 2024 20.823; 2025 21.833; 1S26 11.856.
    confianza: 'Alta',
  },
  trimestres: {
    // Ventas trimestrales (no publica beneficios trimestrales). CHF: 9M24 44.984 [9]; 1T25 15.440 y 1T26 14.722 [8]; 1S25 30.944 y 1S26 30.364 [5];
    // 9M25 45.862 y 9M26 46.493 [6]; ejercicios 2024 60.495 y 2025 61.516 [1]. Crecimiento a tipo constante por trimestre [7, 9].
    items: [
      { periodo: '4T24', ingresos: 15511, crecimiento_pct: null, crecimiento_organico_pct: 9, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 15440, crecimiento_pct: null, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 15504, crecimiento_pct: null, crecimiento_organico_pct: 8, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 14918, crecimiento_pct: null, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 15654, crecimiento_pct: 0.9, crecimiento_organico_pct: 8, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 14722, crecimiento_pct: -4.7, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'En línea' },
      { periodo: '2T26', ingresos: 15642, crecimiento_pct: 0.9, crecimiento_organico_pct: 5, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T26', ingresos: 16129, crecimiento_pct: 8.1, crecimiento_organico_pct: 7, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    // Finance Reports [1, 2]; caja = efectivo + valores negociables; deuda = largo + corto plazo (sin arrendamientos, que Roche no incluye en la deuda).
    historico: [
      { periodo: '2021', activo_total: 92317, activo_corriente: 35627, pasivo_corriente: 38416, pasivo_total: 63972, fondo_comercio: 10809, intangibles: 12117, inmovilizado_material: 23163, existencias: 7715, clientes: 10806, proveedores: 4637, activos_contrato: null, pasivos_contrato: null, caja: 13031, deuda_financiera: 31198, arrendamientos: 1354, patrimonio_neto: 24489, minoritarios: 3856, reservas: 34161 },
      { periodo: '2022', activo_total: 88151, activo_corriente: 33816, pasivo_corriente: 27239, pasivo_total: 56136, fondo_comercio: 10820, intangibles: 9685, inmovilizado_material: 23075, existencias: 8605, clientes: 11606, proveedores: 4556, activos_contrato: null, pasivos_contrato: null, caja: 9767, deuda_financiera: 25351, arrendamientos: 1193, patrimonio_neto: 27992, minoritarios: 4023, reservas: 38937 },
      { periodo: '2023', activo_total: 90468, activo_corriente: 33446, pasivo_corriente: 24824, pasivo_total: 57205, fondo_comercio: 9390, intangibles: 14828, inmovilizado_material: 21724, existencias: 7749, clientes: 11021, proveedores: 4325, activos_contrato: null, pasivos_contrato: null, caja: 10510, deuda_financiera: 29209, arrendamientos: 1573, patrimonio_neto: 29315, minoritarios: 3948, reservas: 42347 },
      { periodo: '2024', activo_total: 101801, activo_corriente: 40036, pasivo_corriente: 27023, pasivo_total: 65640, fondo_comercio: 7876, intangibles: 17303, inmovilizado_material: 22557, existencias: 7606, clientes: 11297, proveedores: 4894, activos_contrato: null, pasivos_contrato: null, caja: 17317, deuda_financiera: 34654, arrendamientos: 1700, patrimonio_neto: 31767, minoritarios: 4394, reservas: 43842 },
      { periodo: '2025', activo_total: 100703, activo_corriente: 38729, pasivo_corriente: 28001, pasivo_total: 62823, fondo_comercio: 7492, intangibles: 19321, inmovilizado_material: 21949, existencias: 7479, clientes: 11506, proveedores: 5779, activos_contrato: null, pasivos_contrato: null, caja: 15476, deuda_financiera: 31636, arrendamientos: 1555, patrimonio_neto: 33802, minoritarios: 4078, reservas: 48837 },
    ],
    // Bonos y obligaciones a 30-jun-26, nominal por vencimiento (M CHF) [5]; 2026 incluye solo lo que queda del año; papel comercial 3.000 M USD aparte.
    vencimientos: [
      { anio: '2026', importe: 1130 }, { anio: '2027', importe: 3074 }, { anio: '2028', importe: 3289 }, { anio: '2029', importe: 2725 },
      { anio: '2030', importe: 2747 }, { anio: '2031-2035', importe: 9018 }, { anio: '2036+', importe: 6937 },
    ],
    liquidez: 'Caja y valores negociables de 9.734 M CHF a 30-jun-26 (15.476 M a dic-25) y una línea comprometida de 7.500 M USD que respalda el papel comercial (3.000 M USD emitidos) [5]. Deuda neta de 22.071 M CHF a jun-26 tras pagar 8.273 M de dividendos (16.160 M a dic-25) [5].',
    rating: 'S&P AA, Moody’s Aa2 y Fitch AA (máximas notas a corto plazo) [1, 5]',
    coste_deuda_pct: 3.6,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: {
    // Estados de flujos [1-4]. 2021 sin las ventas de productos (496 M), que desde 2022 van en inversión. adquisiciones = combinaciones de negocios + compras de activos;
    // desinversiones = venta de productos y filiales (2024: 1.049 M de la planta de Vacaville); recompras = recompra a Novartis (2021) + compras netas de títulos propios
    // para los planes de remuneración; intereses_en_financiacion = intereses pagados (Roche los clasifica en financiación).
    historico: [
      { periodo: '2021', flujo_operativo: 20480, capex: 4549, pagos_arrendamientos: 382, adquisiciones: 2361, desinversiones: 503, dividendos: 8132, recompras: 20397, emision_acciones: 0, intereses_en_financiacion: 405 },
      { periodo: '2022', flujo_operativo: 17803, capex: 4552, pagos_arrendamientos: 405, adquisiciones: 245, desinversiones: 613, dividendos: 7832, recompras: 1257, emision_acciones: 0, intereses_en_financiacion: 557 },
      { periodo: '2023', flujo_operativo: 16095, capex: 4649, pagos_arrendamientos: 339, adquisiciones: 6220, desinversiones: 559, dividendos: 7926, recompras: 1144, emision_acciones: 0, intereses_en_financiacion: 770 },
      { periodo: '2024', flujo_operativo: 20094, capex: 5009, pagos_arrendamientos: 350, adquisiciones: 3119, desinversiones: 1426, dividendos: 8043, recompras: 1130, emision_acciones: 0, intereses_en_financiacion: 1145 },
      { periodo: '2025', flujo_operativo: 18852, capex: 5779, pagos_arrendamientos: 364, adquisiciones: 3078, desinversiones: 59, dividendos: 8385, recompras: 987, emision_acciones: 0, intereses_en_financiacion: 1189 },
    ],
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG AG', anios_auditor: 17, opinion: 'Favorable (sin salvedades) en las cuentas de 2025; revisión limitada sin salvedades del semestral de 2026',
    senales: [
      { senal: 'Deterioros recurrentes de intangibles y fondo de comercio', nivel: 'Media', comentario: '653 M (2021), 2.965 M (2022), 1.868 M (2023), 5.417 M (2024; 2.122 M del fondo de comercio de Spark y el resto sobre todo de Flatiron), 715 M (2025) y 1.065 M en el 1S26: compras de I+D que no cumplen [1, 5].' },
      { senal: 'BPA core frente a NIIF', nivel: 'Media', comentario: 'El BPA core (19,46 en 2025) excluye amortización y deterioro de intangibles, reestructuraciones y litigios; el NIIF fue 16,04. La brecha media 2021-2025 es de 4,5 CHF por acción [1-4].' },
      { senal: 'Reestructuraciones casi todos los años', nivel: 'Baja', comentario: 'Los planes globales de reestructuración se repiten (0,8 bn en el 1S26) y Roche los excluye del core [5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    adquisiciones: [
      { anio: '2018', objetivo: 'Flatiron Health (datos clínicos oncológicos)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio deteriorado en 2024 junto con otros activos [1].' },
      { anio: '2019', objetivo: 'Spark Therapeutics (terapia génica)', importe: 4688, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Fondo de comercio de 2.122 M CHF deteriorado entero en 2024 y reorganización en 2025: compra fallida [1].' },
      { anio: '2021', objetivo: 'Recompra de 53,3 M de acciones al portador a Novartis (amortizadas)', importe: 18991, ev_ebitda: null, financiacion: 'Deuda (préstamo puente de 13.500 M CHF, refinanciado con bonos)', resultado: 'Acciones diluidas de 860 M (2021) a 808 M (2022): +6 % de BPA [3, 4].' },
      { anio: '2021', objetivo: 'GenMark Diagnostics y TIB Molbiol (diagnóstico molecular)', importe: 2200, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en Diagnóstico molecular; sin deterioros relevantes publicados [4].' },
      { anio: '2023', objetivo: 'Telavant (anti-TL1A, colitis y Crohn)', importe: 6220, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Afimkibart en fase III; aún sin ventas [2].' },
      { anio: '2024', objetivo: 'Carmot Therapeutics (obesidad: CT-388 y CT-996)', importe: 2600, ev_ebitda: null, financiacion: 'Caja', resultado: 'Enicepatida y CT-996 (tifeglipron) con fase II positiva en 2026 [1, 7].' },
      { anio: '2025', objetivo: '89bio (pegozafermina, MASH) y Poseida (CAR-T alogénico)', importe: 3000, ev_ebitda: null, financiacion: 'Caja', resultado: '89bio: 2.428 M USD más hasta 1.044 M USD de pagos contingentes; Poseida: 1.132 M USD [1].' },
    ],
    confianza: 'Alta',
  },
  fuentes: [
    { id: 1, titulo: 'Finance Report 2025 (cuentas consolidadas y notas)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}fca190f63e/fb25e.pdf` },
    { id: 2, titulo: 'Finance Report 2023 (cuentas 2023 y 2022 reexpresado; balance 2021)', editor: 'Roche', tipo: 'Primaria', fecha: '2024-02-01', url: `${RA}3b1fb647e2/fb23e.pdf` },
    { id: 3, titulo: 'Finance Report 2022 (flujos 2022-2021, arrendamientos 2021)', editor: 'Roche', tipo: 'Primaria', fecha: '2023-02-02', url: `${RA}537a274a55/fb22e.pdf` },
    { id: 4, titulo: 'Finance Report 2021 (cuentas 2021)', editor: 'Roche', tipo: 'Primaria', fecha: '2022-02-03', url: `${RA}0a222028d9/fb21e.pdf` },
    { id: 5, titulo: 'Half-Year Report 2026', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: `${RA}8a0b362d66/hy26e.pdf` },
    { id: 6, titulo: 'Investor Update: Roche continues strong momentum in the third quarter (ad hoc, ventas de enero-septiembre de 2026)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-10-22', url: `${RA}cb5207798e/221026_ir_q3.pdf` },
    { id: 7, titulo: 'YTD September 2026 sales (presentación a inversores)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-10-22', url: `${RA}214d9ddfff/irp261022.pdf` },
    { id: 8, titulo: 'Q1 2026 sales (presentación a inversores)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-04-23', url: `${RA}75c58a5152/irp260423.pdf` },
    { id: 9, titulo: 'YTD September 2025 sales (presentación a inversores)', editor: 'Roche', tipo: 'Primaria', fecha: '2025-10-23', url: `${RA}a22e1c7d2f/irp251023.pdf` },
    { id: 10, titulo: 'Finance Report 2020 (BPA core 2019-2020)', editor: 'Roche', tipo: 'Primaria', fecha: '2021-02-04', url: `${RA}42a7f33c0c/fb20e.pdf` },
    { id: 11, titulo: '2025 results (presentación a inversores)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}dea78e334b/irp260129.pdf` },
    { id: 12, titulo: 'HY 2026 results (presentación a inversores)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: `${RA}24b5ddb84d/irp260723.pdf` },
    { id: 13, titulo: 'Annual Report 2025 (informe de gobierno, remuneración y sostenibilidad)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}fa3c863601/ar25e.pdf` },
    { id: 14, titulo: 'Roche Q3 results beat on revenue, though pharma sales a slight miss (titular)', editor: 'Seeking Alpha News', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://seekingalpha.com/symbol/RHHBY/news' },
  ],
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento en CHF de 4T24-3T25 y transcripción de la conferencia del 3T26', tipo: 'Complemento', intentos: '1) presentaciones de resultados (solo crecimiento a tipo constante por trimestre y ventas acumuladas); 2) transcripción de Seeking Alpha (bloqueada) y GuruFocus (de pago); 3) prensa (pharmaphorum, cash.ch): sin resumen de las preguntas', decision: 'Omitido; el discurso de la dirección se toma de la presentación y del comunicado' },
    { seccion: 'balance', campo: 'vida media de la deuda', tipo: 'Complemento', intentos: '1) nota 21 del Finance Report 2025; 2) nota 11 del semestral 2026 (solo calendario); 3) cálculo con el calendario por tramos (los de 2031-2035 y 2036+ no dan año exacto)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const B = {
  _estado: 'completo',
  historia: {
    hitos: [
      { anio: '1896', hito: 'Fritz Hoffmann-La Roche funda la empresa en Basilea; las familias fundadoras mantienen un pacto de voto desde 1948 [1].' },
      { anio: '1990', hito: 'Roche toma la mayoría de Genentech (EE. UU.), base de su biotecnología oncológica [2].' },
      { anio: '2002', hito: 'Entra en Chugai (Japón), hoy filial cotizada consolidada al 61,1 % [3].' },
      { anio: '2009', hito: 'Compra el resto de Genentech [2].' },
      { anio: '2017-2020', hito: 'Ocrevus, Hemlibra y Tecentriq relevan a Avastin, Herceptin y MabThera, que pierden la patente y caen ante biosimilares [4].' },
      { anio: '2021', hito: 'Recompra por 19.000 M CHF del 33 % de las acciones al portador que tenía Novartis desde 2001 [5].' },
      { anio: '2023', hito: 'Thomas Schinecker pasa a consejero delegado y Severin Schwan a presidente; compra de Telavant (anti-TL1A) [6].' },
      { anio: '2024-2025', hito: 'Compras para obesidad y metabolismo (Carmot, alianza con Zealand, 89bio) y deterioro total del fondo de comercio de Spark [3].' },
      { anio: '2026', hito: 'Los Genussscheine (ROG) se canjean 1 por 1 por bonos de participación (ROP) desde el 17 de marzo [7].' },
    ],
    confianza: 'Alta',
  },
  sector: {
    // Evaluate World Preview 2026: ventas mundiales de medicamentos con receta > 2 billones USD en 2032, TCAC > 7 % desde 2025 → 2025 ≈ 1,25 billones (estimación propia).
    // World Preview 2025: > 1,75 billones en 2030. IQVIA (2026): gasto en medicamentos (precio de lista) > 2,6 billones USD en 2030, +5-8 % al año.
    // Diagnóstico (Roche, Diagnostics Day 2026, con IQVIA): laboratorio central 40, PCR 9, secuenciación 7, patología 4, punto de atención 9 y diabetes 15 bn CHF en 2025.
    drivers: [
      { driver: 'Nuevas clases terapéuticas (obesidad, inmunología, oncología)', efecto: '+', horizonte: 'Estructural', evidencia: 'Evaluate prevé ventas con receta de más de 2 billones USD en 2032 (+7 % anual desde 2025), lideradas por obesidad y autoinmunes [8].' },
      { driver: 'Pérdidas de patente y biosimilares', efecto: '−', horizonte: 'Estructural', evidencia: 'Roche espera un impacto de ≈0,6 bn CHF en 2026 (0,7 bn en 2025); el primer biosimilar de Xolair en EE. UU. ya se ha lanzado [4, 9].' },
      { driver: 'Precios en EE. UU. (nación más favorecida, aranceles, IRA)', efecto: '−', horizonte: 'Estructural', evidencia: 'Roche anuncia 50.000 M USD de inversión en fabricación e I+D en EE. UU., ligada a los acuerdos de precios y aranceles [10].' },
      { driver: 'Reformas de precios del diagnóstico en China', efecto: '−', horizonte: 'Cíclico', evidencia: 'Asia-Pacífico −4 % a tipo constante en las ventas de Diagnóstico de enero-septiembre de 2026 [10].' },
      { driver: 'Envejecimiento y uso de medicamentos', efecto: '+', horizonte: 'Estructural', evidencia: 'IQVIA: el uso mundial se acerca a 4 billones de dosis diarias en 2030 (+2,7 % anual) [11].' },
    ],
    confianza: 'Media',
  },
  competencia: {
    // Cuentas de 2025 de cada competidor (Stock Analysis, de S&P Global); convertidas a CHF al cambio del 23-oct-26 (0,8244 CHF/USD; 0,9227 CHF/EUR, BCE).
    competidores: [
      { nombre: 'Johnson & Johnson', pais: 'EE. UU.', ticker: 'JNJ', ingresos: 77653, cuota_pct: null, margen_ebit_pct: 28.0, comentario: 'Inmunología, oncología (Darzalex) y neurociencia; 94.193 M USD de ingresos y 26.333 M de EBIT en 2025 [12].' },
      { nombre: 'Merck & Co', pais: 'EE. UU.', ticker: 'MRK', ingresos: 53595, cuota_pct: null, margen_ebit_pct: 37.6, comentario: 'Keytruda compite con Tecentriq en inmunooncología; 65.011 M USD y 24.467 M de EBIT [12].' },
      { nombre: 'AstraZeneca', pais: 'Reino Unido', ticker: 'AZN', ingresos: 48424, cuota_pct: null, margen_ebit_pct: 24.3, comentario: 'Rival en cáncer de mama (Enhertu, camizestrant frente a giredestrant) y pulmón; 58.739 M USD [12].' },
      { nombre: 'Novartis', pais: 'Suiza', ticker: 'NOVN', ingresos: 46722, cuota_pct: null, margen_ebit_pct: 33.5, comentario: 'Kesimpta compite con Ocrevus en esclerosis múltiple; 56.674 M USD y 19.005 M de EBIT [12].' },
      { nombre: 'Sanofi', pais: 'Francia', ticker: 'SAN', ingresos: 43105, cuota_pct: null, margen_ebit_pct: 20.7, comentario: 'Inmunología (Dupixent frente a Xolair en asma y urticaria); 46.716 M EUR [12].' },
      { nombre: 'AbbVie', pais: 'EE. UU.', ticker: 'ABBV', ingresos: 50420, cuota_pct: null, margen_ebit_pct: 34.5, comentario: 'Inmunología y hematología (Venclexta, socio de Roche); 61.160 M USD y 21.115 M de EBIT [12].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Finance Report 2025, nota 4 de Roche Holding (accionistas significativos: pacto desde 1948)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}fca190f63e/fb25e.pdf` },
    { id: 2, titulo: 'Annual Report 2025 (historia y estructura del grupo)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}fa3c863601/ar25e.pdf` },
    { id: 3, titulo: 'Half-Year Report 2026 (Chugai al 61,1 %; nota 13)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: `${RA}8a0b362d66/hy26e.pdf` },
    { id: 4, titulo: 'YTD September 2026 sales (presentación: LOE, motores de crecimiento)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-10-22', url: `${RA}214d9ddfff/irp261022.pdf` },
    { id: 5, titulo: 'Finance Report 2021 (recompra de la participación de Novartis)', editor: 'Roche', tipo: 'Primaria', fecha: '2022-02-03', url: `${RA}0a222028d9/fb21e.pdf` },
    { id: 6, titulo: 'Finance Report 2023 (compra de Telavant)', editor: 'Roche', tipo: 'Primaria', fecha: '2024-02-01', url: `${RA}3b1fb647e2/fb23e.pdf` },
    { id: 7, titulo: 'Half-Year Report 2026, nota 12 (canje de Genussscheine por bonos de participación)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: `${RA}8a0b362d66/hy26e.pdf` },
    { id: 8, titulo: 'World Preview 2026: Big Drugs. Bigger Questions', editor: 'Evaluate', tipo: 'Sectorial', fecha: '2026-06', url: 'https://www.evaluate.com/thought-leadership/world-preview-2026/' },
    { id: 9, titulo: 'Half-Year Report 2026 (patentes de Xolair y Perjeta)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: `${RA}8a0b362d66/hy26e.pdf` },
    { id: 10, titulo: 'Investor Update del 3T26 (inversión en EE. UU., Diagnóstico por regiones)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-10-22', url: `${RA}cb5207798e/221026_ir_q3.pdf` },
    { id: 11, titulo: 'The Global Use of Medicines: outlook through 2030', editor: 'IQVIA Institute', tipo: 'Sectorial', fecha: '2026', url: 'https://www.iqvia.com/insights/the-iqvia-institute/reports-and-publications/reports/the-global-use-of-medicines-outlook-through-2029' },
    { id: 12, titulo: 'Cuentas de 2025 de Johnson & Johnson, Merck, AstraZeneca, Novartis, Sanofi y AbbVie (financials)', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://stockanalysis.com/stocks/nvs/financials/' },
    { id: 13, titulo: 'Diagnostics Day 2026 (tamaños de mercado del diagnóstico in vitro, IQVIA y estudios internos)', editor: 'Roche', tipo: 'Primaria', fecha: '2026', url: `${RA}d7d2be3148/diagnositcs-day-2026.pdf` },
    { id: 14, titulo: '2025 World Preview: Pharma Growth Steady Amid Turbulent Seas (más de 1,75 billones USD en 2030)', editor: 'Evaluate', tipo: 'Sectorial', fecha: '2025-06-17', url: 'https://evaluate.com/thought-leadership/2025-world-preview' },
    { id: 15, titulo: 'Evaluate Releases 2030 Forecasts for Global Pharmaceutical Market (World Preview 2024)', editor: 'Evaluate', tipo: 'Sectorial', fecha: '2024-07-10', url: 'https://www.evaluate.com/press-release/evaluate-releases-2030-forecasts-for-global-pharmaceutical-market/' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'tamaño exacto del mercado farmacéutico de 2025 y CR5', tipo: 'Núcleo', intentos: '1) IQVIA Global Use of Medicines 2026 (solo cifras de 2030 en abierto); 2) Evaluate World Preview 2024-2026 (cifras de 2030 y 2032 con su TCAC); 3) derivado: 2 billones USD en 2032 ÷ 1,07^7 ≈ 1,25 billones en 2025', decision: 'Calculado y marcado como estimación' },
    { seccion: 'esg', campo: 'calificaciones ESG con fecha', tipo: 'Complemento', intentos: '1) Annual Report 2025 (sostenibilidad: sin notas de agencias); 2) MSCI y Sustainalytics: páginas con JavaScript, sin cifra legible; 3) prensa: sin fecha verificable', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Thomas Schinecker', cargo: 'Consejero delegado (CEO Roche Group)', desde: '2023', participacion_pct: null, trayectoria: 'Antes dirigió Roche Diagnostics (2019-2023). Con él, la guía de 2023, 2024 y 2025 se cumplió o se superó y el margen operativo core pasó del 32,8 % (2023) al 35,5 % (2025) [1, 2].' },
      { nombre: 'Alan Hippe', cargo: 'Director financiero', desde: '2011', participacion_pct: null, trayectoria: 'Director financiero desde 2011; ha mantenido la calificación AA y financió con deuda la recompra de 19.000 M CHF a Novartis en 2021 [1, 3].' },
      { nombre: 'Severin Schwan', cargo: 'Presidente', desde: '2023', participacion_pct: 0.04, trayectoria: 'Consejero delegado de 2008 a 2023; reelegido presidente en 2026 con el 97,75 % de los votos; tiene 265.962 acciones y 91.693 bonos [1, 4].' },
      { nombre: 'Teresa Graham', cargo: 'CEO de Roche Pharmaceuticals', desde: '2023', participacion_pct: null, trayectoria: 'Dirige Farma: margen operativo core del 53,0 % en el 1S26, +2,0 puntos [1, 5].' },
      { nombre: 'Matt Sause', cargo: 'CEO de Roche Diagnostics', desde: '2023', participacion_pct: null, trayectoria: 'Dirige Diagnóstico: ventas +4 % a tipo constante en 2026 pese a China; lanzamientos de AXELIOS 1 y del espectrómetro cobas i 601 [1, 6].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'Ventas: crecimiento bajo a medio de un dígito; BPA core en línea con las ventas (tipo constante)', real: 'Ventas +9 %; BPA core +6 %', cumplida: 'Sí' },
      { anio: '2022', guia: 'Ventas: estables a crecimiento bajo de un dígito; BPA core: bajo a medio de un dígito', real: 'Ventas +2 %; BPA core +5 %', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ventas: caída baja de un dígito (fin de la COVID); BPA core en línea con las ventas', real: 'Ventas +1 %; BPA core +6 % (+1 % sin la resolución de disputas fiscales)', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas: crecimiento medio de un dígito; BPA core: alto de un dígito sin el efecto fiscal de 2023 (subida en el 1S)', real: 'Ventas +7 %; BPA core +12 % (+7 % con el efecto fiscal)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas: medio de un dígito; BPA core: alto de un dígito a bajo de dos dígitos (subida desde alto de un dígito)', real: 'Ventas +7 %; BPA core +11 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas: medio de un dígito; BPA core: alto de un dígito; dividendo al alza (tipo constante)', real: 'Ene-sep: ventas +6 %; 1S: BPA core +9 % (guía confirmada el 22-oct)', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Severin Schwan', cargo: 'Presidente', tipo: 'Otro externo', desde: '2013', comisiones: 'Presidencia y nombramientos (presidente)' },
      { nombre: 'André Hoffmann', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '1996', comisiones: 'Gobierno y sostenibilidad (presidente); presidencia y nombramientos' },
      { nombre: 'Jörg Duschmalé', cargo: 'Consejero', tipo: 'Dominical', desde: '2020', comisiones: 'Auditoría; remuneración (presidente)' },
      { nombre: 'Patrick Frost', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Anita Hauser', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Remuneración; presidencia y nombramientos' },
      { nombre: 'Akiko Iwasaki', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Gobierno y sostenibilidad' },
      { nombre: 'Richard P. Lifton', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Remuneración' },
      { nombre: 'Jemilah Mahmood', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Gobierno y sostenibilidad' },
      { nombre: 'Mark Schneider', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Claudia Suessmuth Dyckerhoff', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Gobierno y sostenibilidad; auditoría' },
      { nombre: 'Lubomira Rochet', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    // Junta del 10-mar-26 [4]: el voto más bajo fue la remuneración máxima del comité ejecutivo, 90,18 % a favor. Presentes: 77,22 % de 106,691 M de acciones
    // = 82,39 M; el pacto (69,318 M) vota siempre a favor → capital libre presente ≈ 13,07 M; en contra o abstención como mucho el 9,82 % (8,09 M) → hasta ≈ 62 % del libre (estimación propia, cota superior).
    voto_remuneracion_pct: 90.18, voto_remuneracion_contra_pct: 9.82, voto_remuneracion_contra_libre_pct: 61.9, voto_cupula_pct: null,
    // CEO 2025 [1]: salario 3.525.000; bonus 2.962.874; S-SARs 2.788.169; RSU 491.362; pensiones 350.938; otros 105.634 → total 10.223.977 CHF.
    remuneracion_ceo: { anio: '2025', total: 10.22, fijo: 3.98, variable_corto: 2.96, variable_largo: 3.28, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Pacto de voto de las familias Hoffmann y Oeri (desde 1948)', pct: 8.6, tipo: 'Control: 69,318 M de acciones al portador = 64,97 % de los votos', variacion: 'Sin cambios en 2024-2025' },
      { nombre: 'Maja Oeri (fuera del pacto)', pct: 0.5, tipo: '4,05 M de acciones al portador = 3,79 % de los votos', variacion: 'Bajó del 7,58 % al 3,79 % de los votos en 2025' },
      { nombre: 'Melchior Oeri (fuera del pacto)', pct: 0.5, tipo: '4,05 M de acciones al portador = 3,79 % de los votos', variacion: 'Nueva en 2025 (recibió la mitad del paquete de Maja Oeri)' },
      { nombre: 'Autocartera', pct: 1.5, tipo: '12,5 M de títulos (0,4 M acciones y 12,1 M bonos de participación) para los planes de remuneración', variacion: '13,6 M a dic-25' },
    ],
    insiders: [],
    alertas: [
      'Control familiar: el pacto Hoffmann-Oeri decide la junta con el 8,6 % del capital; los bonos de participación (ROP, 87 % del capital) no votan.',
      'Pago de 0,999 CHF por acción al portador (106,6 M CHF) en 2026 para igualarla con los nuevos bonos de participación: favorece solo a los que votan.',
      'Roche suspende inversiones en Alemania por la reforma sanitaria (19-oct-2026).',
    ],
    confianza: 'Alta',
  },
  fuentes: [
    { id: 1, titulo: 'Annual Report 2025: Corporate Governance Report y Remuneration Report', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}fa3c863601/ar25e.pdf` },
    { id: 2, titulo: '2025 results: guía cumplida (presentación)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}dea78e334b/irp260129.pdf` },
    { id: 3, titulo: 'Finance Report 2021 (préstamo puente para la recompra a Novartis)', editor: 'Roche', tipo: 'Primaria', fecha: '2022-02-03', url: `${RA}0a222028d9/fb21e.pdf` },
    { id: 4, titulo: 'Roche Annual General Meeting 2026 (resultados de las votaciones)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-03-10', url: 'https://www.roche.com/investors/updates/inv-update-2026-03-10' },
    { id: 5, titulo: 'Half-Year Report 2026', editor: 'Roche', tipo: 'Primaria', fecha: '2026-07-23', url: `${RA}8a0b362d66/hy26e.pdf` },
    { id: 6, titulo: 'YTD September 2026 sales (presentación)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-10-22', url: `${RA}214d9ddfff/irp261022.pdf` },
    { id: 7, titulo: '2021 results: guidance fully achieved (presentación)', editor: 'Roche', tipo: 'Primaria', fecha: '2022-02-03', url: `${RA}fca1d76d92/irp220203.pdf` },
    { id: 8, titulo: '2022 results: guidance achieved (presentación)', editor: 'Roche', tipo: 'Primaria', fecha: '2023-02-02', url: `${RA}07a64bfb85/irp230202.pdf` },
    { id: 9, titulo: '2023 results: guidance exceeded (presentación)', editor: 'Roche', tipo: 'Primaria', fecha: '2024-02-01', url: `${RA}1a564f0bae/irp240201.pdf` },
    { id: 10, titulo: '2024 results: guidance exceeded (presentación)', editor: 'Roche', tipo: 'Primaria', fecha: '2025-01-30', url: `${RA}63b9606d3b/irp250130.pdf` },
    { id: 11, titulo: 'Finance Report 2025, nota 4 de Roche Holding (accionistas significativos)', editor: 'Roche', tipo: 'Primaria', fecha: '2026-01-29', url: `${RA}fca190f63e/fb25e.pdf` },
    { id: 12, titulo: 'Roche pauses German investments over healthcare reforms', editor: 'Seeking Alpha News', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://seekingalpha.com/symbol/RHHBY/news' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de consejeros y directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) SIX Management Transactions: anónimas (solo cargo e importe), sin consulta por emisor accesible; 2) Annual Report 2025: tenencias a fin de año (Schwan 265.962 acciones, de 254.090) sin fechas de operación; 3) prensa suiza: ninguna venta relevante publicada', decision: 'Omitido; insiders_sin_operaciones = false porque no se pudo comprobar' },
    { seccion: 'gobierno', campo: 'ratio de remuneración del CEO sobre el empleado medio', tipo: 'Complemento', intentos: '1) Remuneration Report 2025: no lo publica; 2) Finance Report 2025: coste de personal sin cifra limpia de plantilla media; 3) cálculo con 112.774 empleados (recuento, no media)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'voto en contra exacto de la junta de 2026', tipo: 'Complemento', intentos: '1) comunicado de la junta: solo % a favor; 2) acta de la junta: no publicada en la web; 3) cálculo de la cota superior con la asistencia y el pacto', decision: 'Calculado y marcado como estimación' },
  ],
};

if (que === 'A' || que === 'todas') w('A', A);
if (que === 'B' || que === 'todas') w('B', B);
if (que === 'C' || que === 'todas') w('C', C);
const extra = await import('./construir-notas-roche-de.mjs').catch(() => null);
if (extra && (que === 'D' || que === 'todas')) w('D', extra.D);
if (extra && (que === 'E' || que === 'todas')) w('E', extra.E);
console.log('notas escritas:', que);
