// Escribe las notas A-E de Sabesp (SBSP3, corte 2026-10-27, precio de cierre del 26-oct-2026) a partir de notas/docs
// (EDGAR: 20-F 2025, notas de resultados 2T25-2T26, ITR 2T26, 6-K de EMAE y de estatutos), de los datos abiertos de la CVM
// (DFP 2024-2025, ITR 2025-2026), del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json y de yahoo-datos.json.
// Cada nota cita solo con [n] de su lista. Ejecutar: node informes/sabesp-2026-10-27/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/1170858';
const ACC = 3417.5; // acciones de 2021-2025 en base del desdoblamiento 1:5 de 2026 (683,5 M × 5)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 20-F 2025: cuentas consolidadas NIIF, notas, contrato de concesión URAE-1, consejo, remuneración, auditor (EY), ADS', editor: 'Sabesp (SEC)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000129281426002681/sbsform20f_2025.htm` },
  { id: 2, titulo: 'Earnings Release 4Q25 (cuenta publicada y ajustada de 2025 y 2024, balance, flujos, capex)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-03-17', url: `${ED}/000129281426000921/sbspr4q25_6k.htm` },
  { id: 3, titulo: 'Earnings Release 1Q26', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-05-08', url: `${ED}/000129281426002895/sbspr1q26_6k.htm` },
  { id: 4, titulo: 'Earnings Release 2Q26 (cuenta ajustada, balance y flujos a 30-jun-2026)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-12', url: `${ED}/000129281426004210/sbsitr2q26_6k.htm` },
  { id: 5, titulo: 'Informações Trimestrais (ITR) 2T26: notas (EMAE, BPA y acciones tras el desdoblamiento 1:5, deuda, activo financiero de la concesión)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000129281426004252/sbsitr2q26_6k.htm` },
  { id: 6, titulo: 'Datos abiertos de la CVM: DFP 2024 y 2025 e ITR 2025-2026 consolidados (DRE, BPA, BPP, DFC) de Sabesp (código CVM 14443)', editor: 'Comissão de Valores Mobiliários', tipo: 'Primaria', fecha: '2026-10-27', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS/' },
  { id: 7, titulo: 'XBRL company facts de Sabesp (cuenta, balance y flujos 2015-2024 de los 20-F)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001170858.json' },
  { id: 8, titulo: 'Earnings Release 3Q25', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2025-11-12', url: `${ED}/000129281425003899/sbspr3q25_6k.htm` },
  { id: 9, titulo: 'Earnings Release 2Q25', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2025-08-13', url: `${ED}/000129281425003037/sbspr2q25_6k.htm` },
];
// Cuenta. 2021-2023: cifras publicadas sin los ingresos y costes de construcción (NIIF 12 / ICPC 01: el capex de la
// concesión se registra como ingreso de construcción con margen casi nulo, 98-126 M al año [7]); EBIT = BAI − resultado
// financiero [7]. 2024-2025: cuenta AJUSTADA de la empresa (sin construcción, sin la actualización del activo financiero de
// la indemnización y sin no recurrentes) [2]: es la base del consenso y la que repite cada trimestre.
const cuenta = [
  { periodo: '2021', ingresos: 15114, coste_ventas: 8522, gastos_generales: null, ebitda: 6399, amortizaciones: 2253, ebit: 4146, resultado_financiero: -976, bai: 3170, impuestos: 864, minoritarios: 0, beneficio_neto: 2306, gastos_financieros: 1448, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(2306 / ACC), dpa: r2(604 / ACC), dpa_extraordinario: 0, acciones_diluidas: ACC },
  { periodo: '2022', ingresos: 17192, coste_ventas: 9596, gastos_generales: null, ebitda: 7589, amortizaciones: 2451, ebit: 5138, resultado_financiero: -865, bai: 4273, impuestos: 1152, minoritarios: 0, beneficio_neto: 3121, gastos_financieros: 1956, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(3121 / ACC), dpa: r2(824 / ACC), dpa_extraordinario: 0, acciones_diluidas: ACC },
  { periodo: '2023', ingresos: 19972, coste_ventas: 10577, gastos_generales: null, ebitda: 9137, amortizaciones: 2791, ebit: 6346, resultado_financiero: -1592, bai: 4754, impuestos: 1230, minoritarios: 0, beneficio_neto: 3524, gastos_financieros: 2709, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(3524 / ACC), dpa: r2(929 / ACC), dpa_extraordinario: 0, acciones_diluidas: ACC },
  { periodo: '2024', ingresos: 21726, coste_ventas: 10517, gastos_generales: null, ebitda: 11339, amortizaciones: 2627, ebit: 8712, resultado_financiero: -1744, bai: 6968, impuestos: 1794, minoritarios: 0, beneficio_neto: 5174, gastos_financieros: 2701, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(5174 / ACC), dpa: r2(2364 / ACC), dpa_extraordinario: 0, acciones_diluidas: ACC },
  { periodo: '2025', ingresos: 22213, coste_ventas: 9555, gastos_generales: null, ebitda: 13221, amortizaciones: 2209, ebit: 11012, resultado_financiero: -2558, bai: 8454, impuestos: 2135, minoritarios: 0, beneficio_neto: 6318, gastos_financieros: 3571, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(6318 / ACC), dpa: r2(2060 / ACC), dpa_extraordinario: 0, acciones_diluidas: ACC },
];
const balance = [
  { periodo: '2021', activo_total: 53166, activo_corriente: 6503, pasivo_corriente: 5093, pasivo_total: 28234, fondo_comercio: 0, intangibles: 45054, inmovilizado_material: 291, existencias: 114, clientes: 2695, proveedores: 237, activos_contrato: null, pasivos_contrato: null, caja: 718, deuda_financiera: 17724, arrendamientos: 0, patrimonio_neto: 24932, minoritarios: 0, reservas: 1546 },
  { periodo: '2022', activo_total: 57208, activo_corriente: 7285, pasivo_corriente: 6657, pasivo_total: 29874, fondo_comercio: 0, intangibles: 47935, inmovilizado_material: 339, existencias: 124, clientes: 3063, proveedores: 431, activos_contrato: null, pasivos_contrato: null, caja: 1868, deuda_financiera: 18959, arrendamientos: 0, patrimonio_neto: 27334, minoritarios: 0, reservas: 2093 },
  { periodo: '2023', activo_total: 61471, activo_corriente: 7784, pasivo_corriente: 8408, pasivo_total: 31614, fondo_comercio: 0, intangibles: 51406, inmovilizado_material: 475, existencias: 86, clientes: 3584, proveedores: 456, activos_contrato: null, pasivos_contrato: null, caja: 839, deuda_financiera: 19536, arrendamientos: 0, patrimonio_neto: 29857, minoritarios: 0, reservas: 2363 },
  { periodo: '2024', activo_total: 80965, activo_corriente: 10609, pasivo_corriente: 11972, pasivo_total: 44037, fondo_comercio: 0, intangibles: 67251, inmovilizado_material: 562, existencias: 11, clientes: 3895, proveedores: 767, activos_contrato: null, pasivos_contrato: null, caja: 6152, deuda_financiera: 25258, arrendamientos: 0, patrimonio_neto: 36928, minoritarios: 0, reservas: 6551 },
  { periodo: '2025', activo_total: 104203, activo_corriente: 18557, pasivo_corriente: 16553, pasivo_total: 61802, fondo_comercio: 0, intangibles: 83176, inmovilizado_material: 891, existencias: 22, clientes: 4413, proveedores: 2400, activos_contrato: null, pasivos_contrato: null, caja: 12371, deuda_financiera: 40142, arrendamientos: 0, patrimonio_neto: 42401, minoritarios: 0, reservas: 21518 },
];
const flujosH = [
  { periodo: '2021', flujo_operativo: 3914, capex: 3747, pagos_arrendamientos: 580, adquisiciones: 0, desinversiones: 0, dividendos: 254, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 3968, capex: 3624, pagos_arrendamientos: 590, adquisiciones: 0, desinversiones: 0, dividendos: 604, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 4854, capex: 4139, pagos_arrendamientos: 674, adquisiciones: 0, desinversiones: 0, dividendos: 824, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 7405, capex: 8031, pagos_arrendamientos: 570, adquisiciones: 0, desinversiones: 0, dividendos: 929, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 8361, capex: 13740, pagos_arrendamientos: 480, adquisiciones: 0, desinversiones: 0, dividendos: 2364, recompras: 475, emision_acciones: 0, intereses_en_financiacion: 0 },
];
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 23184, ebitda: 13885, ebit: 11375, beneficio_neto: 5890, bpa: 1.71, dpa: 0.6, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Privatización (22-jul-2024) y contrato de concesión URAE-1 (23-jul-2024): nace el activo financiero de la indemnización (17.602 M) y se reconoce su actualización en ingresos (9.151 M en 2024), que la cuenta ajustada excluye.' },
    ],
    comentario: 'Los ingresos de saneamiento (sin construcción) crecieron de 15.114 M en 2021 a 22.213 M ajustados en 2025, un 10 % anual, por tarifas ligadas al IPCA, conexiones nuevas (+97.000 netas en 2025) y la base de activos que reconoce el contrato URAE-1 [2, 7]. El margen EBITDA ajustado pasó del 42 % al 59,5 %: tras la privatización la plantilla bajó un 17 % en 2025 (8.717 empleados), los gastos generales cayeron un 54,5 % y la energía pasó al mercado libre [2]. En el 1S26 el margen fue del 60,6 % (63 % en el 1T y 58 % en el 2T, por atención al cliente, químicos y una base de comparación con sentencias favorables) [3, 4]. El beneficio ajustado subió un 22 % en 2025, a 6.318 M, pero en el 2T26 cayó un 41 % por el coste de una deuda neta que pasó de 23.000 a 34.000 M con la Selic al 13,75-15 % [4]. 2024 no es comparable con lo anterior por la privatización.',
    ajustes: 'La cuenta publicada lleva tres partidas que no son caja ni negocio recurrente: (1) los ingresos y costes de construcción (14.437 M en 2025, margen cero: es el capex registrado como servicio de construcción según NIIF 12/ICPC 01); (2) la actualización del activo financiero de la indemnización (1.676 M en 2025 y 9.151 M en 2024, el año del nuevo contrato), un ingreso contable sin caja hasta el final de la concesión; (3) no recurrentes (en 2025, créditos fiscales de +369 M y +1.660 M de actualización de créditos fiscales en el resultado financiero; en 2024, el plan de bajas voluntarias de 630 M y otros) [2]. Este informe usa la cuenta ajustada de la empresa en 2024-2025: BPA publicado 2025 12,37 BRL antes del desdoblamiento (2,47 después) frente a 9,24 (1,85) ajustado [2]. El desdoblamiento 1:5 de 2026 se aplica a todos los años [5].',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 5565, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2999, margen_ebitda_pct: 53.9, bpa: 0.56, vs_consenso: null },
      { periodo: '1T25', ingresos: 5428, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3008, margen_ebitda_pct: 55.4, bpa: 0.34, vs_consenso: null },
      { periodo: '2T25', ingresos: 5635, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3617, margen_ebitda_pct: 64.2, bpa: 0.57, vs_consenso: null },
      { periodo: '3T25', ingresos: 5468, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3207, margen_ebitda_pct: 58.7, bpa: 0.38, vs_consenso: null },
      { periodo: '4T25', ingresos: 5682, crecimiento_pct: 2.1, crecimiento_organico_pct: null, ebitda: 3389, margen_ebitda_pct: 59.6, bpa: 0.56, vs_consenso: null },
      { periodo: '1T26', ingresos: 6021, crecimiento_pct: 10.9, crecimiento_organico_pct: null, ebitda: 3786, margen_ebitda_pct: 62.9, bpa: 0.44, vs_consenso: null },
      { periodo: '2T26', ingresos: 6013, crecimiento_pct: 6.7, crecimiento_organico_pct: null, ebitda: 3503, margen_ebitda_pct: 58.3, bpa: 0.33, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'Cifras ajustadas de la empresa (sin construcción, activo financiero, no recurrentes ni EMAE; BPA en acciones tras el desdoblamiento); el 3T25 se deduce del año menos los otros tres trimestres [2-4, 8, 9]. En el 4T25 (17-mar-2026) la dirección destacó el capex de 15.200 M en 2025, más del doble que en 2024, el cumplimiento adelantado de las metas del Factor U de 2024-2025 y un EBITDA ajustado de 13.200 M (+17 %) [2]. En el 1T26 (8-may) el EBITDA ajustado subió un 26 %, con un corte de facturación de dos días por el paso a SAP S/4HANA y un verano suave [3]. En el 2T26 (13-ago) el discurso cambió: BPA ajustado de 0,33 frente a 0,57, por menor consumo por persona, la mezcla de clientes con tarifa social, un 39 % más de servicios de atención al cliente, químicos un 97 % más caros y un resultado financiero de −1.076 M con deuda neta de 34.000 M; la dirección mantuvo la guía de capex de casi 20.000 M en 2026 y el cumplimiento del Factor U [4]. La acción cayó un 7 % ese día. Las preguntas giraron en torno a costes y deuda; la dirección no dio una guía de margen.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: null,
    liquidez: 'Caja 4.243 M + inversiones financieras a corto 13.197 M a 30-jun-2026 (17.441 M), frente a deuda bruta de 51.658 M (5.290 a corto) [4, 5].',
    rating: 'Sin dato de rating corporativo en los documentos leídos; Brasil BB (S&P), Ba1 (Moody\'s) y BB estable (Fitch) [1].',
    coste_deuda_pct: 11.1,
    vida_media_anios: null,
    otros_pasivos: 'Pasivos que no son deuda financiera pero se pagan en caja: asociaciones público-privadas (PPP de producción de agua) 3.322 M, pensiones 2.402 M, derivados de cobertura de la deuda en divisa 2.294 M, provisiones por litigios 2.148 M y obligaciones de inversión de la concesión eléctrica de EMAE 653 M a 30-jun-2026 [4]. Las PPP y los derivados van al puente como deuda (otros ajustes); las pensiones, netas de impuestos. El activo financiero de la indemnización (22.862 M) y el activo de contrato (19.009 M) son la contrapartida del capex de la concesión: los cobrará la empresa vía tarifa o al final del contrato (2060) [5].',
    comentario: 'La deuda bruta pasó de 25.258 M en 2024 a 40.142 M en 2025 y 51.658 M en jun-2026 para financiar el plan de inversión; la deuda neta, de 19.100 M a 34.200 M [2, 4]. El capital invertido (patrimonio + deuda neta) crece más deprisa que el EBITDA: es la fase de inversión del contrato, que la tarifa reconoce con retraso de un año (la base de activos se actualiza cada año en los dos primeros ciclos) [1]. Los activos de la concesión (intangible, activo de contrato y activo financiero) se agrupan en «intangibles» en este informe.',
    confianza: 'Media',
  },
  flujos: {
    historico: flujosH,
    comentario: 'El flujo operativo (después de intereses e impuestos) fue de 8.361 M en 2025 y el capex en caja de 13.740 M (15.202 M devengados) [2, 6]: el FCF es negativo desde 2024 y lo será mientras dure el plan (≈ 20.000 M de capex en 2026) [4]. Casi todo el capex es de expansión ligada a las metas de universalización de 2029 (agua 99 % y alcantarillado 90 %); el de mantenimiento no se publica (estimación propia: del orden de la amortización, 2.200-2.900 M) [1]. Los pagos de PPP (480 M en 2025) se tratan como arrendamientos.',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'Ernst & Young Auditores Independentes', anios_auditor: null, opinion: 'Favorable (20-F 2025, con informe sobre control interno)',
    comentario: 'La contabilidad de concesiones (NIIF 12/ICPC 01) complica la lectura: el capex se registra como ingreso y coste de construcción (sin margen desde 2025), el contrato URAE-1 creó un activo financiero que se actualiza en ingresos (9.151 M en 2024, 1.676 M en 2025) y los ajustes de la empresa los excluyen [1, 2]. El BPA publicado de 2024 (14,02 antes del desdoblamiento) duplica el ajustado (7,57): en esta empresa, el ajustado es el que mide el negocio. Los no recurrentes se repiten casi todos los trimestres (créditos fiscales, litigios, plan de bajas, incidente de Jaguaré), lo que obliga a vigilar que no se conviertan en recurrentes [2-4]. Los indicadores del motor (Altman, Piotroski, Beneish) salen distorsionados por la privatización de 2024 y el salto del activo.',
    senales: [
      { senal: 'Ingreso contable sin caja (actualización del activo financiero)', nivel: 'Media', comentario: '1.676 M en 2025; excluido del BPA de este informe [2].' },
      { senal: 'No recurrentes frecuentes', nivel: 'Baja', comentario: 'Cada trimestre trae alguno; la empresa los detalla [2-4].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Saneamiento (agua y alcantarillado)', descripcion: 'Ingresos netos ajustados de los servicios de agua y alcantarillado de la concesión URAE-1 y otras.', tipo_resultado: null, historico: cuenta.map((c) => ({ periodo: c.periodo, ingresos: c.ingresos, resultado: null })) },
    ],
    geografias: [{ nombre: 'Estado de São Paulo (Brasil)', peso_pct: 100 }], geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Volumen facturado (millones de m³)', valor_anterior: '4.316 (2024)', valor_actual: '4.407 (2025)', variacion: '+2,1 %', comentario: 'Conexiones nuevas [2].' },
      { kpi: 'Tarifa media (BRL/m³)', valor_anterior: '5,70 (2024)', valor_actual: '5,66 (2025)', variacion: '−0,7 %', comentario: 'Mezcla con más tarifa social [2].' },
      { kpi: 'Conexiones de agua (miles)', valor_anterior: '9.483 (4T24)', valor_actual: '9.517 (4T25)', variacion: '+0,4 %', comentario: 'Activas y registradas [2].' },
      { kpi: 'Conexiones de alcantarillado (miles)', valor_anterior: '8.194 (4T24)', valor_actual: '8.257 (4T25)', variacion: '+0,8 %', comentario: '[2]' },
      { kpi: 'Capex (M BRL)', valor_anterior: '6.911 (2024)', valor_actual: '15.202 (2025)', variacion: '+120 %', comentario: 'Guía ≈ 20.000 M en 2026 [2, 4].' },
      { kpi: 'Empleados', valor_anterior: '10.552 (2024)', valor_actual: '8.717 (2025)', variacion: '−17,4 %', comentario: '8.914 en el 2T26 con EMAE [2, 4].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de deuda del ITR 2T26 (texto sin tabla legible); 2) 20-F 2025, Item 5 (tabla no extraíble del HTML); 3) notas de resultados (no la traen)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: 'Form 20-F 2025: negocio, contrato URAE-1 (Factor U, base de activos regulada, FAUSP, ciclos tarifarios), regulación (ARSESP, Marco Legal del Saneamiento), competencia', editor: 'Sabesp (SEC)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000129281426002681/sbsform20f_2025.htm` },
  { id: 2, titulo: 'Sabesp (SBSP3): base de ativos de 2024 aprovada (BAR de 78,5 y 88 mil M BRL en 2023 y 2024; EV/BAR 26E 1,2x)', editor: 'Genial Investimentos (Analisa)', tipo: 'Analistas', fecha: '2025-11-25', url: 'https://analisa.genialinvestimentos.com.br/acoes/sabesp/sabesp-sbsp3-base-de-ativos-de-2024-aprovada/' },
  { id: 3, titulo: 'Sabesp: atualizando estimativas após o 1T25 (WACC regulatório de 7,86 % estable en el ciclo 2030-2034)', editor: 'XP Investimentos', tipo: 'Analistas', fecha: '2025-06-18', url: 'https://conteudos.xpi.com.br/acoes/relatorios/sabesp-sbsp3-atualizando-estimativas-apos-o-1t25/' },
  { id: 4, titulo: 'Mesmo com investimento 151 % maior, tarifa da Sabesp não terá aumento real para o consumidor em 2026 (≈ 70 mil M de inversión hasta 2029; IPCA de 16 meses 6,11 %)', editor: 'Secretaría de Medio Ambiente, Infraestructura y Logística de SP (SEMIL)', tipo: 'Primaria', fecha: '2025-12-02', url: 'https://semil.sp.gov.br/2025/12/mesmo-com-investimento-151-maior-tarifa-da-sabesp-nao-tera-aumento-real-para-o-consumidor-em-2026/' },
  { id: 5, titulo: 'Sabesp: por que o reajuste tarifário tira um importante fator de risco (reajuste de 6,8 % desde el 1-ene-2026; receita requerida 24,9 mil M)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2025-12-02', url: 'https://www.infomoney.com.br/?p=3125083' },
  { id: 6, titulo: 'Earnings Release 4Q25 y 2Q26 (volúmenes, conexiones, capex, metas del Factor U)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-12', url: `${ED}/000129281426004210/sbsitr2q26_6k.htm` },
  { id: 7, titulo: 'Cotizaciones y datos de Copasa, Sanepar, American Water, Severn Trent, United Utilities (ingresos, EBITDA y márgenes de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/' },
  { id: 8, titulo: 'Hechos relevantes conjuntos Sabesp-EMAE: incorporación de acciones (1,3195 acciones de Sabesp por acción de EMAE, entrega el 27-oct-2026)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-21', url: `${ED}/000129281426004962/sbs20261021_6k.htm` },
];
const B_ = {
  _estado: 'completa',
  historia: {
    resumen: 'Sabesp nació en 1973 de la fusión de las empresas de agua del Estado de São Paulo y cotiza en B3 desde 1997 y en Nueva York (ADS) desde 2002 [1]. El 22-jul-2024 el Estado vendió el 32,3 % del capital (de 50,3 % a 18 %): un 15 % a Equatorial como inversor de referencia y el resto en una oferta pública; al día siguiente entró en vigor el contrato de concesión URAE-1, que unificó 371 municipios hasta 2060 a cambio de universalizar el servicio en 2029 [1]. Desde entonces la nueva dirección recortó un 17 % la plantilla, duplicó la inversión y en 2026 compró el control de EMAE (energía y embalses), que incorpora del todo el 27-oct-2026 [1, 8].',
    hitos: [
      { anio: '1973', hito: 'Creación de Sabesp por el Estado de São Paulo [1].' },
      { anio: '1997', hito: 'Salida a bolsa en São Paulo; en 2002, Novo Mercado y ADS en la NYSE [1].' },
      { anio: '2020', hito: 'Nuevo Marco Legal del Saneamiento (Ley 14.026): metas del 99 % de agua y 90 % de alcantarillado en 2033 [1].' },
      { anio: '2023', hito: 'Ley estatal 17.853 autoriza la privatización [1].' },
      { anio: '2024', hito: 'Privatización (22-jul), Equatorial 15 %, contrato URAE-1 con metas para 2029, acción especial («golden share») del Estado [1].' },
      { anio: '2025', hito: 'Capex de 15.202 M (+120 %); ARSESP valida la base de activos de 2023 y 2024; reajuste del 6,8 % para 2026 [2, 5, 6].' },
      { anio: '2026', hito: 'Desdoblamiento 1:5 (abril), compra del 74,9 % del voto de EMAE (enero) e incorporación del resto (27-oct) [8].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Sabesp presta agua y alcantarillado a unos 28 millones de personas en el Estado de São Paulo, sobre todo en la región metropolitana de la capital, con 9,5 millones de conexiones de agua y 8,3 millones de alcantarillado [1, 6]. Es la mayor empresa de saneamiento del hemisferio sur por ingresos. El 92 % de sus activos de concesión pertenece al contrato URAE-1 (371 municipios, hasta 2060) [1]. Desde 2026 consolida EMAE, que gestiona embalses y centrales hidroeléctricas del sistema de abastecimiento [8].',
    como_gana_dinero: 'Ingresos regulados: la tarifa de equilibrio que fija ARSESP remunera la base de activos regulada (BAR: 88.000 M en 2024) a un coste de capital regulatorio (7,86 % real) más la amortización regulatoria y los costes operativos reconocidos, y se reajusta cada año por IPCA, Factor Q (calidad), Factor X (eficiencia) y Factor U (universalización) [1-3]. Si la tarifa que paga el usuario es menor, la diferencia la cubre el fondo FAUSP [1]. El beneficio crece con la base de activos (capex reconocido) y con la eficiencia por debajo de los costes reconocidos; el riesgo de volumen es pequeño (servicio esencial, tarifa mínima de 10 m³) y la estacionalidad es baja.',
    clientes: 'Millones de clientes residenciales (el 86 % del volumen facturado) y comerciales e industriales, que pagan tarifas más altas (15,6 y 21,7 BRL/m³ frente a 4,3 la residencial en el 2T26) [6]. No hay concentración: el mayor cliente es el municipio de São Paulo a través del contrato. El poder de precios no es de mercado sino regulatorio: el reajuste de 2026 fue del 6,8 % con un IPCA de 6,11 % en 16 meses [4, 5]. La expansión de la tarifa social resta (−2,6 % por mezcla en el 4T25) [6].',
    kpis: null,
  },
  sector: {
    definicion: 'El mercado relevante es el saneamiento urbano regulado del Estado de São Paulo, donde Sabesp tiene la concesión de 375 municipios; fuera de esa área no compite salvo en licitaciones nuevas. Como referencia nacional, el saneamiento brasileño se reparte entre empresas estatales (Copasa, Sanepar, Embasa…) y privadas (Aegea, Iguá, BRK) y el Marco Legal de 2020 obliga a licitar las concesiones nuevas [1]. No hay estadística oficial del tamaño del mercado en reales que sea comparable con los ingresos; el informe usa como medida los ingresos regulados que fija ARSESP (receita requerida de 24.900 M para 2026) [5].',
    tamano: '≈ 24.900 M BRL de ingresos requeridos de Sabesp en 2026 según ARSESP [5]; BAR de 88.000 M en 2024 [2].',
    unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Monopolio regulado por área de concesión',
    drivers: [
      { driver: 'Metas de universalización (Factor U, 2029)', efecto: '+', horizonte: 'Estructural', evidencia: '≈ 70.000 M de inversión hasta 2029 que entra en la base de activos [4].' },
      { driver: 'Inflación (IPCA) en la tarifa', efecto: '+', horizonte: 'Estructural', evidencia: 'Reajuste de 2026 = IPCA de 16 meses (6,11 %) [4].' },
      { driver: 'Tipos de interés (Selic)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Resultado financiero ajustado de −1.076 M en el 2T26 frente a −118 M un año antes [6].' },
      { driver: 'Tarifa social y mezcla de clientes', efecto: '−', horizonte: 'Estructural', evidencia: '−3,1 % de ingresos por mezcla en el 2T26 [6].' },
      { driver: 'Clima y consumo por persona', efecto: '+/−', horizonte: 'Cíclico', evidencia: '−1,1 % de volumen por el tiempo en el 2T26 [6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 1, justificacion: 'Monopolio natural en su área hasta 2060 [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Sin poder individual, pero la tarifa es política: el regulador y el Estado la fijan [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Energía y químicos (+97 % en el 2T26) son costes con poca alternativa [6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Concesión exclusiva de 35 años [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto del agua por red.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El sector vive un ciclo de inversión por el Marco Legal de 2020 y las privatizaciones (Sabesp 2024; Copasa y otras en estudio). La demanda apenas depende del ciclo económico: en 2020 el volumen se mantuvo y lo que cayó fue el beneficio por el tipo de cambio [1]. Lo cíclico es el coste de capital: con la Selic al 13,75 % y el bono a 10 años al 15,4 % tras las elecciones, la financiación del plan es más cara [6].' },
    regulacion: 'ARSESP regula la tarifa con el contrato URAE-1: ciclos de 2024-2029 y 2030-2034 con reajuste anual; en los dos primeros ciclos la base de activos se actualiza cada año, y el WACC regulatorio (7,86 %) está fijado para el ciclo 2030-2034 [1, 3]. El Marco Legal federal (Ley 14.026/2020) fija las metas nacionales y da a la Agencia Nacional de Aguas (ANA) normas de referencia; un gobierno federal puede cambiar decretos y normas de referencia, pero no el contrato estatal [1]. La reforma tributaria del consumo (IBS/CBS) entra entre 2026 y 2033 y la tarifa debería trasladarla.',
    tendencias: 'Digitalización de la medición y de la atención al cliente (más coste en 2026), reducción de pérdidas de agua y gestión de la presión nocturna, y el riesgo climático (sequías como la de 2014-2015) que llevó a integrar los embalses de EMAE [6, 8]. Sabesp gana con la escala: compra energía en el mercado libre y negocia el capex a gran volumen.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.ª empresa de saneamiento de Brasil y de América Latina por ingresos y clientes; concesión exclusiva en 375 municipios de São Paulo [1].',
    competidores: [
      { nombre: 'Copasa (Minas Gerais)', pais: 'Brasil', ticker: 'CSMG3', ingresos: 8689, cuota_pct: null, margen_ebit_pct: null, comentario: 'Estatal en vías de privatización; EBITDA 33 % de los ingresos publicados [7].' },
      { nombre: 'Sanepar (Paraná)', pais: 'Brasil', ticker: 'SAPR11', ingresos: 7543, cuota_pct: null, margen_ebit_pct: null, comentario: 'Estatal; EBITDA 39 % de los ingresos publicados [7].' },
      { nombre: 'American Water Works', pais: 'EE. UU.', ticker: 'AWK', ingresos: 28566, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor regulada de agua cotizada de EE. UU.; ingresos convertidos a 5,41 BRL/USD [7].' },
      { nombre: 'Severn Trent', pais: 'Reino Unido', ticker: 'SVT', ingresos: 20395, cuota_pct: null, margen_ebit_pct: null, comentario: 'Regulada por Ofwat; ingresos convertidos a 7,20 BRL/GBP [7].' },
      { nombre: 'United Utilities', pais: 'Reino Unido', ticker: 'UU', ingresos: 18848, cuota_pct: null, margen_ebit_pct: null, comentario: 'Regulada por Ofwat [7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red física no tiene efecto de red de usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'El cliente no puede cambiar de proveedor de agua por red.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Concesión exclusiva hasta 2060 [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBITDA ajustado del 59,5 % frente al 33-39 % de Copasa y Sanepar [7].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Monopolio natural de red.' },
      ],
    },
    amenazas: 'El foso es legal, no de mercado: lo erosionaría un cambio del contrato o de la regulación (tarifa, WACC regulatorio, metas imposibles con multas), no un competidor. Probabilidad baja con el gobierno estatal de Tarcísio reelegido hasta 2030; media a partir de 2031 si cambia el color político del Estado [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El negocio es el ESG: universalizar el agua y el alcantarillado (1,8 millones de personas con agua y 3,8 millones con alcantarillado nuevos en 2024-2025) [6]. Lo material para las cifras es cumplir las metas del Factor U (que ajustan la tarifa) y la calidad del servicio (Factor Q): las quejas de clientes subieron tras la privatización y en 2026 la empresa gasta más en atención al cliente [6]. B3 le dio la etiqueta de «acciones verdes» en 2024 (más del 50 % de los ingresos en actividades verdes, certificado por S&P Global) [1].',
    controversias: 'Incidente de Jaguaré en 2026 (68 M de costes no recurrentes en el 2T26) [6]; quejas de clientes y críticas políticas a la privatización en la campaña de 2026 (prensa). Sin sanciones relevantes en los documentos leídos.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie y TCAC del mercado', tipo: 'Complemento', intentos: '1) 20-F 2025 (sin tamaño de mercado en reales); 2) SNIS/SINISA (sin serie de ingresos sectoriales accesible); 3) prensa sectorial (cifras sin fuente)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 20-F 2025 (solo B3 Ações Verdes); 2) web de RI (no abierta); 3) búsqueda de MSCI/Sustainalytics (de pago)', decision: 'Omitido' },
  ],
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Directivos y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025: Item 6 (consejo, directivos, remuneración), Item 7 (accionistas, acuerdo de inversión con Equatorial), estatutos (golden share, límite de voto del 30 %, OPA al 200 %)', editor: 'Sabesp (SEC)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000129281426002681/sbsform20f_2025.htm` },
  { id: 2, titulo: 'ITR 2T26: accionistas (Estado de São Paulo 18 %, Equatorial 15 %), planes de acciones (Factor U y TSR)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000129281426004252/sbsitr2q26_6k.htm` },
  { id: 3, titulo: 'Estatutos modificados (capital de 3.534.409.282 acciones tras EMAE)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-09-23', url: `${ED}/000129281426004674/sbs20260922_6k.htm` },
  { id: 4, titulo: 'Formularios 3 y 4 de consejeros y directivos (mar-jun 2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-17', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001170858&type=4' },
  { id: 5, titulo: 'Earnings Release 4Q25 (guía de capex y metas del Factor U)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-03-17', url: `${ED}/000129281426000921/sbspr4q25_6k.htm` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Carlos Augusto Leone Piani', cargo: 'Consejero delegado (CEO)', desde: '2024', participacion_pct: null, trayectoria: 'CFA; antes presidente del consejo de Equatorial Energia, consejero delegado de HPX Corp. y responsable mundial de estrategia y fusiones de Kraft Heinz. En Sabesp desde la privatización: plantilla −17 % y capex ×2,2 en 2025 [1, 5].' },
      { nombre: 'Daniel Szlak', cargo: 'Director financiero y de relación con inversores', desde: '2024', participacion_pct: null, trayectoria: 'Director financiero de Combio (2023-2024) y de Kraft Heinz para Latinoamérica y Canadá [1].' },
      { nombre: 'Alexandre Gonçalves Silva', cargo: 'Presidente del consejo (independiente)', desde: '2024', participacion_pct: null, trayectoria: 'Presidió Embraer (2012-2025) y GE Brasil (2001-2007) [1].' },
      { nombre: 'Roberval Tavares de Souza', cargo: 'Director de ingeniería', desde: '2023', participacion_pct: null, trayectoria: 'Responsable de la ejecución del capex de universalización [1].' },
      { nombre: 'Luciane Godinho Domingues', cargo: 'Directora de regulación y compra de energía', desde: '2025', participacion_pct: null, trayectoria: 'Lleva la relación con ARSESP y los reajustes anuales [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Metas del Factor U de 2024-2025', real: 'Cumplidas un mes antes [5]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Acelerar el capex (≈ 15.000 M)', real: '15.202 M [5]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Capex cercano a 20.000 M', real: '7.458 M en el 1S26 (en curso) [2]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo nuevo desde octubre de 2024, traído en buena parte del entorno de Equatorial y Kraft Heinz, con un historial corto pero cumplido en las metas físicas y de capex [1, 5]. Lo que falta demostrar es el control de costes en la fase de atención al cliente (2T26) y la financiación del plan con tipos altos. No hay plan de sucesión publicado; el plan de acciones del CEO tiene una consolidación de 8 años ligada al Factor U y al TSR [2].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Alexandre Gonçalves Silva', cargo: 'Presidente', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'Gustavo Rocha Gattass', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'Mateus Affonso Bandeira', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'Augusto Miranda da Paz Júnior', cargo: 'Consejero', tipo: 'Dominical', desde: '2024', comisiones: 'Propuesto por Equatorial' },
      { nombre: 'Tinn Freire Amado', cargo: 'Consejero', tipo: 'Dominical', desde: '2024', comisiones: 'Consejero de Equatorial' },
      { nombre: 'Eduardo Parente Menezes', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: 'Expresidente de Equatorial' },
      { nombre: 'Karla Bertocco Trindade', cargo: 'Consejera', tipo: 'Dominical', desde: '2023', comisiones: 'Propuesta por el Estado' },
      { nombre: 'Anderson Marcio de Oliveira', cargo: 'Consejero', tipo: 'Dominical', desde: '2023', comisiones: 'Secretario ejecutivo de la SEMIL (Estado)' },
      { nombre: 'Claudia Polto da Cunha', cargo: 'Consejera', tipo: 'Dominical', desde: '2023', comisiones: 'Propuesta por el Estado' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 20.99, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'La dirección cobró 49,3 M en 2025 (8,6 M en 2024, aún con la empresa estatal), de ellos 39,5 M de variable y acciones; la remuneración individual más alta fue de 21,0 M, la del primer ejecutivo previsiblemente [1]. La junta de abril de 2026 aprobó 71,2 M para 2026 [1]. El plan de acciones restringidas consolida en 4 años (8 para el CEO) y el de rendimiento depende del Factor U y del rendimiento total para el accionista; si se cumplen las metas de 2029 la consolidación se adelanta a octubre de 2030 [2]. Con el límite global del 1 % del capital. No hemos encontrado el voto de la junta.',
    accionistas: [
      { nombre: 'Estado de São Paulo (con acción especial)', pct: 18.0, tipo: 'Público', variacion: 'Del 50,3 % al 18 % en la privatización de jul-2024 [1, 2]' },
      { nombre: 'Equatorial S.A.', pct: 15.0, tipo: 'Inversor de referencia', variacion: 'Entra en jul-2024; acuerdo de inversión hasta el 1-ene-2035 [1]' },
      { nombre: 'Capital libre', pct: 67.0, tipo: 'Libre', variacion: '[2]' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: los estatutos prohíben votar más del 30 % del capital y los pactos por encima de ese límite, y obligan a una OPA con un 200 % de prima a quien pase del 30 % [1]. El Estado conserva una acción especial con veto sobre el nombre, la sede, el objeto social (agua y alcantarillado) y el propio límite de voto, que se extingue si baja del 10 % [1, 3]. Equatorial tiene un acuerdo de inversión con el Estado hasta 2035 (permanencia y derechos de nombramiento) y propone a tres consejeros y al entorno del CEO: es influencia de hecho sin control [1]. La compra de EMAE en 2026 se hizo a un tercero.',
    alertas: ['Formularios 4 de consejeros y directivos en may-jun 2026 por la entrega de acciones de los planes (sin compras ni ventas de mercado relevantes identificadas) [4].', 'La victoria de Lula (25-oct-2026) no cambia el gobierno del Estado (Tarcísio reelegido el 4-oct), pero el PT criticó la privatización en la campaña.'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto de remuneración y comisiones del consejo', tipo: 'Complemento', intentos: '1) 20-F 2025, Item 6 (sin resultado de votos); 2) actas de la junta de abr-2026 (no descargadas: web de RI con JavaScript); 3) Formulário de Referência de la CVM (no abierto)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de SBSP3.SA, SBS, ^BVSP y EWZ (precio, rango, volumen, beta, cierres de ejercicio); cierre del 26-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/SBSP3.SA/history' },
  { id: 2, titulo: 'quoteSummary de SBSP3.SA y comparables (consenso de BPA, objetivos, recomendaciones, múltiplos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/SBSP3.SA' },
  { id: 3, titulo: 'Brazil 10-Year Government Bond Yield: 15,435 % el 26-oct-2026 (+2,46 puntos tras la victoria de Lula)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://tradingeconomics.com/brazil/government-bond-yield' },
  { id: 4, titulo: 'Brazil’s 10-Year Yield Edges Higher Ahead of Election Runoff (por encima del 13 % en octubre; Datafolha 50-50)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://tradingeconomics.com/brazil/government-bond-yield/news/594734' },
  { id: 5, titulo: 'PTAX del dólar: 5,5007 BRL/USD (venta) el 26-oct-2026', editor: 'Banco Central do Brasil', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/' },
  { id: 6, titulo: 'Ibovespa −13,9 % el 26-oct-2026; cancelación de subastas del Tesoro; Selic 13,75 %', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://tradingeconomics.com/brazil/stock-market' },
  { id: 7, titulo: 'Focus: IPCA 3,5 % en 2029-2030 y Selic 11,75 % en 2027 y 10 % en 2028 (23-oct-2026)', editor: 'Banco Central do Brasil', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/' },
  { id: 8, titulo: 'Temporada de balances del 3T26: Sabesp publica el 5-nov tras el cierre; conferencia el 6-nov', editor: 'Seu Dinheiro', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.seudinheiro.com/2026/economia/temporada-de-balancos-do-3t26-bate-a-porta-veja-as-datas-das-divulgacoes-e-das-teleconferencias-davs/' },
  { id: 9, titulo: 'Form 20-F 2025: cada ADS representa una acción ordinaria', editor: 'Sabesp (SEC)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000129281426002681/sbsform20f_2025.htm` },
  { id: 10, titulo: 'Sabesp: por que o reajuste tarifário tira um importante fator de risco (objetivos de Itaú BBA 147,10, BBI 174, Goldman 156, Morgan Stanley 145 BRL antes del desdoblamiento)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2025-12-02', url: 'https://www.infomoney.com.br/?p=3125083' },
  { id: 11, titulo: 'Damodaran: ERP implícita del S&P 500 por mes (oct-2026: 4,20 %)', editor: 'NYU Stern (A. Damodaran)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 12, titulo: 'Resultado de la elección a gobernador de São Paulo: Tarcísio de Freitas reelegido en primera vuelta (≈ 64 % de los votos válidos con la mitad escrutada)', editor: 'Correio da Manhã', tipo: 'Prensa', fecha: '2026-10-04', url: 'https://www.correiodamanha.com.br/politica/2026/10/324229-tarcisio-de-freitas-e-reeleito-governador-de-sao-paulo-no-primeiro-turno.html' },
  { id: 13, titulo: 'Como a Sabesp virou pauta na campanha de Haddad por SP (no revertir la privatización, «respeitam contratos»; analizar los efectos)', editor: 'Investidor10', tipo: 'Prensa', fecha: '2026-03-20', url: 'https://investidor10.com.br/noticias/como-a-sabesp-sbsp3-virou-pauta-na-campanha-de-haddad-por-sp-nas-eleicoes-2026-119405/' },
  { id: 14, titulo: 'Hechos relevantes Sabesp-EMAE (incorporación de acciones con entrega el 27-oct-2026)', editor: 'Sabesp (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-21', url: `${ED}/000129281426004962/sbs20261021_6k.htm` },
];
const yb = (t) => Y[t];
const FX = { 'SBSP3.SA': 1, 'CSMG3.SA': 1, 'SAPR11.SA': 1, 'EQTL3.SA': 1, 'CPFE3.SA': 1, AWK: 5.4064, 'SVT.L': 7.2042 / 100, 'UU.L': 7.2042 / 100 };
const comp = [
  ['Copasa', 'CSMG3.SA', 'BR'], ['Sanepar', 'SAPR11.SA', 'BR'], ['Equatorial', 'EQTL3.SA', 'BR'], ['CPFL Energia', 'CPFE3.SA', 'BR'],
  ['American Water Works', 'AWK', 'US'], ['Severn Trent', 'SVT.L', 'GB'], ['United Utilities', 'UU.L', 'GB'],
].map(([nombre, t, pais]) => {
  const q = yb(t); const fxCap = t.endsWith('.L') ? 7.2042 : FX[t];
  const y0 = q.trend.find((x) => x.periodo === '0y');
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round((q.cap * fxCap) / 1e6), ev_ventas: r2(q.ev / q.ventas), ev_ebitda_ltm: r1(q.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(q.per_adelantado), crecimiento_pct: y0?.crec_ventas != null ? r1(y0.crec_ventas * 100) : null, margen_ebitda_pct: r1((q.ebitda / q.ventas) * 100), roic_pct: null,
    dn_ebitda: r1((q.deuda - q.caja) / q.ebitda), fcf_yield_pct: null,
  };
});
const S0 = yb('SBSP3.SA');
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Companhia de Saneamento Básico do Estado de São Paulo – SABESP', nombre_corto: 'Sabesp', ticker: 'SBSP3', isin: 'BRSBSPACNOR5', mercado: 'B3 (Novo Mercado); ADS en la NYSE (SBS)', indice_referencia: 'Ibovespa',
    pais: 'Brasil', pais_iso: 'BR', sector: 'Utilities', industria: 'Water Utilities', sede: 'São Paulo (Brasil)', fundacion: '1973', empleados: 8914, web: 'https://ri.sabesp.com.br',
    precio: 25.27, fecha_precio: '2026-10-26', acciones: 3527.6, capitalizacion_publicada: Math.round(S0.cap / 1e6), free_float_pct: 67.0,
    max_52s: 35.32, min_52s: 23.17, volumen_medio_diario: '≈ 653 M BRL/día (3 meses)', proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'La empresa no da guía de resultados. Guía de capex: cerca de 20.000 M en 2026 (confirmada el 12-ago-2026) y ≈ 70.000 M entre jul-2024 y 2029 para universalizar (notas de resultados del 2T26 y SEMIL). Metas del Factor U del ciclo 2024-2026: 87 % de agua, 77 % de recogida y 71 % de tratamiento de alcantarillado, que la dirección dice superar.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(S0.trend[2].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(S0.trend[2].bpa), dpa: null, fuente: `Yahoo Finance, ${S0.trend[2].n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(S0.trend[3].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(S0.trend[3].bpa), dpa: null, fuente: `Yahoo Finance, ${S0.trend[3].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: S0.n_analistas, comprar: S0.reco.strongBuy + S0.reco.buy, mantener: S0.reco.hold, vender: S0.reco.sell + S0.reco.strongSell, po_medio: r2(S0.po_medio), po_min: S0.po_min, po_max: S0.po_max },
    revisiones: `El BPA de consenso de 2027 bajó de ${r2(S0.trend[3].bpa_hace90)} hace 90 días a ${r2(S0.trend[3].bpa)} (−8 %), sobre todo tras el 2T26 (costes y deuda); el de 2026, de ${r2(S0.trend[2].bpa_hace90)} a ${r2(S0.trend[2].bpa)} [2]. Las cifras de Yahoo son del 26-27 oct y es probable que aún no recojan la subida de tipos tras las elecciones. Solo hay una fuente gratuita con estimaciones completas; los objetivos se contrastan con los de Itaú BBA, BBI, Goldman y Morgan Stanley de dic-2025 (145-174 BRL antes del desdoblamiento, 29-35 después) [10].`,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -5.1, indice_pct: -5.6, sector_pct: -13.8 },
      { periodo: '1 año', accion_pct: -1.3, indice_pct: 3.5, sector_pct: -11.0 },
      ...B.bolsa.rentabilidades.filter((x) => x.periodo.startsWith('3') || x.periodo.startsWith('5') || x.periodo.startsWith('10')),
    ],
    anual: B.bolsa.anual,
    beta: B.bolsa.beta, volatilidad_pct: B.bolsa.volatilidad_pct, max_drawdown_pct: B.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La acción multiplicó por 3,4 su precio entre el cierre de 2021 (7,79) y el de 2025 (26,64) con la privatización, y en 2025 subió un 55 % frente al 34 % del Ibovespa [1]. En 2026 hizo máximos en abril (35,32), cayó un 34 % hasta agosto (2T26 flojo: −7 % el 13-ago) y rebotó un 25 % en octubre con las encuestas que daban opciones a Flávio Bolsonaro [1]. El 26-oct, tras la victoria de Lula, cayó un 21,0 % (de 31,98 a 25,27) y el ADS un 26,1 % (de 6,40 a 4,73 USD), frente al −13,9 % del Ibovespa y −19,8 % del EWZ [1, 6]. Las rentabilidades de 3, 5 y 10 años y la serie anual son de bolsa.mjs hasta el 23-oct; las de «en el año» y «1 año» incluyen el cierre del 26-oct.',
    contexto: {
      movimiento: { fecha: '2026-10-26', var_1m_pct: -5.6, var_3m_pct: -11.0, var_6m_pct: -26.7, var_12m_pct: 1.1, dist_max_52s_pct: -28.5, dist_min_52s_pct: 9.1, dist_max_historico_pct: -28.5, tendencia: 'bajista', volatilidad_60d_pct: 36, avisos: ['P3 Caída fuerte (−21 % en un día, −28,5 % desde el máximo de 52 semanas)'] },
      movimientos_fuertes: [
        { periodo: 'abr-ago 2026', var_pct: -34.4, causa: 'Del máximo de 35,32 (23-abr) al mínimo de 23,17 (20-ago): 2T26 con BPA ajustado −41 % (costes de atención al cliente, químicos, deuda neta de 34.000 M con Selic alta) y −7 % el 13-ago [1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: 24.9, causa: 'Rebote con las encuestas de la segunda vuelta que daban un empate a Flávio Bolsonaro y Lula [4].', veredicto: 'no cambia', condicion: null },
        { periodo: '26-oct-2026', var_pct: -21.0, causa: 'Victoria de Lula en la segunda vuelta del 25-oct: Ibovespa −13,9 %, bono a 10 años del 12,98 % al 15,44 %, real −9 % (PTAX 5,50), subastas del Tesoro canceladas [3, 5, 6].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-25', tipo: 'demanda o regulador', hecho: 'Lula gana la presidencia; el gobierno federal controla el Marco Legal del Saneamiento (decretos, normas de referencia de la ANA) y la financiación del BNDES, no el contrato estatal URAE-1 [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-04', tipo: 'demanda o regulador', hecho: 'Tarcísio de Freitas reelegido gobernador de São Paulo en primera vuelta: el poder concedente y la acción especial siguen en manos favorables al contrato hasta 2030 [12, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-27', tipo: 'ampliación o convertible', hecho: 'Entrega de acciones de Sabesp a los minoritarios de EMAE (1,3195 por acción; ≈ 11 M de acciones, 0,3 % del capital): emisión pequeña, ya aprobada [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-13', tipo: 'resultados', hecho: '2T26 por debajo de lo esperado (BPA ajustado 0,33 frente a 0,57) [1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 3T26 tras el cierre; conferencia el 6-nov [8].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del 26-oct es macro (tipos, real y riesgo fiscal federal), no del negocio: el gobierno estatal que firmó el contrato acaba de ser reelegido y la tarifa se reajusta por IPCA, así que la inflación no destruye la tarifa; lo que sube es el coste de la deuda (34.000 M netos, gran parte a CDI) y la tasa de descuento. No hay colocación pendiente: Equatorial está obligada a permanecer por el acuerdo de inversión y el Estado ya bajó al 18 %. El veredicto es «no cambia»: la señal la deciden la regla a 12 meses y la calidad, que no pasa.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 7.79, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 11.08, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 14.62, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 17.16, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 26.64, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precios de cierre ajustados al desdoblamiento [1]. Con el BPA ajustado, la acción cotizó a un PER de 9-11 veces el beneficio del año siguiente entre 2021 y 2024; a fin de 2025, con la euforia de la privatización y la expectativa de bajada de tipos, a 17,6 veces el BPA que estimamos para 2026. La privatización cambió el perfil (más eficiencia y más crecimiento de la base de activos), pero también la deuda: el múltiplo de antes no es del todo comparable.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Dos empresas de agua brasileñas (Copasa y Sanepar, mismas reglas del Marco Legal y la misma tasa libre), dos utilities reguladas brasileñas en reales con Equatorial, accionista de referencia de Sabesp, y CPFL, y tres reguladas de agua de mercados desarrollados (American Water, Severn Trent, United Utilities) como referencia de múltiplo para un activo de agua regulado. Todas a precios del 26-oct-2026 (Yahoo) [2]. EV/EBITDA de Yahoo: base publicada (en las brasileñas con ingresos de construcción), no ajustada; por eso el PER pesa más.',
    empresas: comp,
    comentario: 'Las brasileñas cotizan a PER de 6-21 veces y las de mercados desarrollados a 13-22 veces con tipos reales mucho más bajos. Sabesp, a 10,5 veces el BPA de consenso de 2027 (Yahoo) y 13,2 veces el nuestro, queda en el medio: prima frente a Copasa y Sanepar (estatales) por la eficiencia privada y el crecimiento de la base de activos, y descuento frente a las británicas y estadounidenses por el coste de capital en reales. La mediana del PER adelantado de los siete es de 12,9 veces.',
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo', tipo: 'Complemento', intentos: '1) 20-F 2025 (privatización: precio por acción, sin múltiplo de RAB publicado); 2) compras de Aegea (Corsan 2022) y subastas de Cedae 2021 (pagos de concesión, no valor empresa); 3) EMAE 2026 (energía, otro negocio)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) B3 (sin acceso); 2) Yahoo (sin dato para SBSP3); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de $SBS (mar-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-27', url: 'https://api.stocktwits.com/api/2/streams/symbol/SBS.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares de SBS («Political Euphoria Has Pulled Returns Forward», 7-oct-2026; «Still One Of Brazil’s Best Execution Stories», 7-jul-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://seekingalpha.com/api/sa/combined/SBS.xml' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($SBS)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Hasta septiembre dominaba la idea de «para siempre» y la calidad de la ejecución; el 26-oct, mensajes de pánico («Brazil stocks are getting slaughtered») y de compra del rebote, con volumen siete veces el normal [1].' },
      { plataforma: 'Seeking Alpha (titulares y artículos)', fecha: '2026-10', n_comentarios: 6, tono: 'Dividido', resumen: 'En julio, «una de las mejores historias de ejecución de Brasil»; el 7-oct, que la euforia política había adelantado la rentabilidad [2].' },
    ],
    temas: [
      { tema: 'Riesgo político federal tras Lula', postura: 'Bajista', peso: 'Alto', contraste: 'El contrato es estatal y el gobernador reelegido lo defiende; el canal real es el coste de capital y de la deuda, que este informe recoge en el WACC y en el BPA.' },
      { tema: 'Ejecución de la privatización', postura: 'Alcista', peso: 'Medio', contraste: 'Las cifras le dan la razón: margen EBITDA ajustado del 42 % en 2021 al 59,5 % en 2025 y metas del Factor U cumplidas.' },
      { tema: 'Valoración tras la euforia', postura: 'Dividida', peso: 'Medio', contraste: 'Coincide con nuestro DCF: con la tasa libre de hoy, el precio pide más de lo que da la tarifa.' },
    ],
    lectura: 'El sentimiento de los particulares pasó de complaciente a asustado en un día, pero sin argumentos nuevos sobre el negocio. No cambia la decisión: el riesgo político que ven ya está en la tasa de descuento, y la tesis de ejecución que defendían está en las cifras. Muestra pequeña (dos sitios con debate real; Reddit y los foros brasileños no abrieron).',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
