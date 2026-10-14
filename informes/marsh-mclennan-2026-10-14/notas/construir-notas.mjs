// Escribe las notas A-E de Marsh (MRSH; antes Marsh & McLennan, MMC), corte 2026-10-14.
// Fuentes: EDGAR (10-K 2025, 2023 y 2021, 10-Q 2T26, notas de resultados 3T25-2T26, proxy 2026, 8-K), XBRL (cuentas.mjs),
// Yahoo (bolsa.mjs y fichas), MarketScreener (consenso y comparables), Tesoro de EE. UU. y prensa sectorial.
// Ejecutar: node notas/construir-notas.mjs. Cada nota cita solo su propia lista de fuentes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify({ _estado: 'completo', ...obj }, null, 2) + '\n', 'utf8');
const E = 'https://www.sec.gov/Archives/edgar/data/62709/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas consolidadas, segmentos, deuda, rating, plantilla)', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2026-02-09', url: E + '000006270926000022/mrsh-20251231.htm' },
  { id: 2, titulo: 'Form 10-K 2023 (segmentos 2021-2023, dividendos por acción 2021-2023)', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2024-02-12', url: E + '000006270924000016/mmc-20231231.htm' },
  { id: 3, titulo: 'Form 10-K 2021 (dividendos por acción 2019-2021)', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2022-02-16', url: E + '000006270922000009/mmc-20211231.htm' },
  { id: 4, titulo: 'XBRL companyfacts (serie 2019-2025 de cuenta, balance y flujos)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000062709.json' },
  { id: 5, titulo: 'Nota de resultados 2T26 (Exhibit 99.1): cuenta, balance y flujos del semestre', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-07-21', url: E + '000006270926000193/mmc2q2026ex991newsrelease.htm' },
  { id: 6, titulo: 'Nota de resultados 1T26 (Exhibit 99.1)', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-04-16', url: E + '000006270926000096/mmc1q2026ex991newsrelease.htm' },
  { id: 7, titulo: 'Nota de resultados 4T25 y ejercicio 2025 (Exhibit 99.1)', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-01-29', url: E + '000006270926000014/mmc4q2025ex991newsrelease.htm' },
  { id: 8, titulo: 'Nota de resultados 3T25 (Exhibit 99.1)', editor: 'Marsh & McLennan Companies', tipo: 'Primaria', fecha: '2025-10-16', url: E + '000006270925000123/mmc3q2025ex991newsrelease.htm' },
  { id: 9, titulo: 'Form 10-Q 2T26 (nota 17: litigio Greensill; reestructuración Thrive; adquisiciones 2026)', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2026-07-21', url: E + '000006270926000195/mrsh-20260630.htm' },
  { id: 10, titulo: 'Marsh Q2 2026 Earnings Call Transcript (titular y resumen del feed)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://seekingalpha.com/article/4923819-marsh-and-mclennan-companies-inc-mrsh-q2-2026-earnings-call-transcript' },
  { id: 11, titulo: 'Marsh expects 2026 underlying revenue growth similar to 2025 while targeting $400M Thrive savings', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-04-16', url: 'https://seekingalpha.com/symbol/MRSH/news' },
  { id: 12, titulo: 'Marsh Non-GAAP EPS of $2.96 beats by $0.07; Non-GAAP EPS of $3.29 beats by $0.07 (1T26)', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://seekingalpha.com/symbol/MRSH/news' },
  { id: 13, titulo: '8-K: emisión de 600 M USD de bonos al 4,950 % con vencimiento 2036', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2026-02-19', url: E + '000119312526059544/d112193d8k.htm' },
];

const c = (periodo, ingresos, ebit, da, rf, bai, imp, mino, bn, gf, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda: ebit + da, amortizaciones: da, ebit,
  resultado_financiero: rf, bai, impuestos: imp, minoritarios: mino, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const A = {
  negocio: {
    segmentos: [
      { nombre: 'Risk & Insurance Services (Marsh Risk y Guy Carpenter)', descripcion: 'Correduría de seguros y de reaseguro, gestión de programas, consultoría de riesgos; incluye los intereses del dinero fiduciario.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: 12085, resultado: 3080 }, { periodo: '2022', ingresos: 12645, resultado: 3089 }, { periodo: '2023', ingresos: 14089, resultado: 3945 }, { periodo: '2024', ingresos: 15395, resultado: 4365 }, { periodo: '2025', ingresos: 17265, resultado: 4636 }] },
      { nombre: 'Consulting (Mercer y Marsh Management Consulting)', descripcion: 'Mercer: salud, patrimonio (gestión delegada de pensiones) y carrera; Marsh Management Consulting (antes Oliver Wyman): consultoría de dirección.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: 7789, resultado: 1504 }, { periodo: '2022', ingresos: 8139, resultado: 1553 }, { periodo: '2023', ingresos: 8709, resultado: 1666 }, { periodo: '2024', ingresos: 9133, resultado: 1770 }, { periodo: '2025', ingresos: 9794, resultado: 1896 }] },
      { nombre: 'Corporativo y eliminaciones', descripcion: 'Eliminaciones entre segmentos y gastos centrales no asignados.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: -54, resultado: -272 }, { periodo: '2022', ingresos: -64, resultado: -362 }, { periodo: '2023', ingresos: -62, resultado: -329 }, { periodo: '2024', ingresos: -70, resultado: -318 }, { periodo: '2025', ingresos: -78, resultado: -309 }] },
    ],
    geografias: [{ nombre: 'EE. UU.', peso_pct: 49 }, { nombre: 'Resto del mundo', peso_pct: 51 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Crecimiento subyacente de ingresos (grupo)', valor_anterior: '7 % (2024)', valor_actual: '4 % (2025); 4 % 1T26 y 5 % 2T26', variacion: '−3 pp', comentario: 'Sin divisa ni perímetro; la empresa espera para 2026 algo parecido a 2025 [7, 5, 11].' },
      { kpi: 'Crecimiento subyacente Marsh Risk', valor_anterior: '4 % (2025)', valor_actual: '4 % (1S26)', variacion: '=', comentario: 'EE. UU./Canadá 4 % e Internacional 5 % en el 2T26 [5].' },
      { kpi: 'Crecimiento subyacente Guy Carpenter', valor_anterior: '5 % (2025)', valor_actual: '0 % (1S26); −2 % 2T26', variacion: '−5 pp', comentario: 'El reaseguro de daños abarata: menos comisión por la misma cobertura [5].' },
      { kpi: 'Crecimiento subyacente Consulting', valor_anterior: '5 % (2025)', valor_actual: '7 % (1S26); 8 % 2T26', variacion: '+2 pp', comentario: 'Marsh Management Consulting +13 % en el 2T26; Mercer +5 % [5].' },
      { kpi: 'Margen operativo ajustado del grupo', valor_anterior: '30,7 % (1S25)', valor_actual: '30,5 % (1S26)', variacion: '−0,2 pp', comentario: 'Excluye partidas destacadas y la amortización de intangibles adquiridos [5].' },
      { kpi: 'Intereses fiduciarios', valor_anterior: '497 M (2024)', valor_actual: '403 M (2025); 173 M 1S26 (202 M 1S25)', variacion: '−19 %', comentario: 'Bajan con los tipos de interés; son casi puro margen [1, 5].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta: [
      c('2019', 16652, 2677, 647, -238, 2439, 666, 31, 1742, 524, 3.41, 1.74, 511),
      c('2020', 17224, 3066, 741, -273, 2793, 747, 30, 2016, 515, 3.94, 1.84, 512),
      c('2021', 19820, 4312, 747, -104, 4208, 1034, 31, 3143, 444, 6.13, 2.00, 513),
      c('2022', 20720, 4280, 719, -198, 4082, 995, 37, 3050, 469, 6.04, 2.25, 505),
      c('2023', 22736, 5282, 713, -256, 5026, 1224, 46, 3756, 578, 7.53, 2.60, 499),
      c('2024', 24458, 5817, 746, -337, 5480, 1363, 57, 4060, 700, 8.18, 3.05, 496),
      c('2025', 26981, 6223, 910, -684, 5539, 1305, 74, 4160, 960, 8.43, 3.43, 494),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 27947, ebitda: 6948, ebit: 6042, beneficio_neto: 3980, bpa: 8.19, dpa: 3.69, dpa_extraordinario: 0, fcf: 4767, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 425 },
    cambios_perimetro: [
      { periodo: '2019', descripcion: 'Jardine Lloyd Thompson (JLT), consolidada desde el 1-abr-2019 (unos 5.600 M GBP de capital).' },
      { periodo: '2024', descripcion: 'McGriff Insurance Services: compra de 7.750 M USD cerrada el 15-nov-2024; entra en el balance de 2024 y solo mes y medio en la cuenta.' },
    ],
    comentario: 'Los ingresos pasan de 16.652 M (2019) a 26.981 M (2025), un 8,4 % anual: unos 4-5 puntos son crecimiento subyacente y el resto compras (JLT en 2019, McGriff a finales de 2024, que aporta casi 10 puntos al crecimiento de Marsh Risk en 2025) [1, 4]. El crecimiento subyacente se ha frenado del 7 % de 2024 al 4 % de 2025 y del 1S26, con Guy Carpenter plano por el abaratamiento del reaseguro [5, 7]. El margen operativo publicado sube de 16,1 % en 2019 a 23,1 % en 2025 (18 años seguidos de mejora del margen ajustado, según la empresa) [7]; 2026 lleva un cargo de 425 M por el litigio Greensill en el 1T26, que deja el resultado operativo del semestre en −5 % pese a un +7 % de ingresos [5, 9]. El resultado financiero empeora de −337 M a −684 M en 2025 por la deuda de McGriff (gasto por intereses de 700 M a 960 M) [1].',
    ajustes: 'Se usan cifras publicadas (US GAAP). La empresa da un BPA ajustado que excluye la amortización de intangibles adquiridos (549 M en 2025) y las «partidas destacadas» (reestructuración, integración de McGriff, cambios en contraprestaciones contingentes y litigios): 9,75 USD en 2025 frente a 8,43 publicados [7]. Las partidas destacadas se repiten todos los años (Thrive: 500 M en tres años; integración de McGriff), así que no se tratan como no recurrentes. La única excepción es el cargo de 425 M por Greensill del 1T26, que va en no_recurrentes_en_ebitda del LTM [5, 9]. Hasta 2021 el XBRL da la amortización total; desde 2022 se suma la de intangibles (338-549 M) a la de inmovilizado [1, 4].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 5697, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1288, margen_ebitda_pct: 22.6, bpa: 1.51, vs_consenso: null },
      { periodo: '4T24', ingresos: 6067, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1343, margen_ebitda_pct: 22.1, bpa: 1.59, vs_consenso: null },
      { periodo: '1T25', ingresos: 7061, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2232, margen_ebitda_pct: 31.6, bpa: 2.79, vs_consenso: null },
      { periodo: '2T25', ingresos: 6974, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2060, margen_ebitda_pct: 29.5, bpa: 2.45, vs_consenso: null },
      { periodo: '3T25', ingresos: 6351, crecimiento_pct: 11.5, crecimiento_organico_pct: 4, ebitda: 1394, margen_ebitda_pct: 21.9, bpa: 1.51, vs_consenso: null },
      { periodo: '4T25', ingresos: 6595, crecimiento_pct: 8.7, crecimiento_organico_pct: 4, ebitda: 1447, margen_ebitda_pct: 21.9, bpa: 1.68, vs_consenso: null },
      { periodo: '1T26', ingresos: 7597, crecimiento_pct: 7.6, crecimiento_organico_pct: 4, ebitda: 1981, margen_ebitda_pct: 26.1, bpa: 2.36, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 7404, crecimiento_pct: 6.2, crecimiento_organico_pct: 5, ebitda: 2126, margen_ebitda_pct: 28.7, bpa: 2.63, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En el 1T26 la dirección mantuvo un crecimiento subyacente para 2026 «parecido al de 2025» (4 %) y fijó en 400 M el ahorro del programa Thrive, que costará unos 500 M en tres años [11, 1]. El 1T26 batió en 0,07 USD el BPA ajustado esperado (3,29) y el 2T26 otra vez en 0,07 (2,96) [12]. El mensaje del 2T26 fue de «ejecución en un entorno dinámico»: subyacente del 5 %, con Marsh Management Consulting (+13 %) y Mercer Wealth (+8 %) compensando a Guy Carpenter (−2 %) y a unas primas de daños que caen [5]. Las preguntas que se repiten: cuánto restan al crecimiento las bajadas de tarifas de daños (−12 % en el 2T26 según el índice de la propia Marsh), el efecto de la IA en la intermediación, la caída de los intereses fiduciarios (173 M frente a 202 M en el semestre) y el uso de la caja (1.512 M en recompras en el semestre y 5 compras pequeñas por 181 M) [5, 9, 10]. La dirección no ha dado una guía cuantitativa de margen ni ha cuantificado el riesgo restante de Greensill (juicio con los fondos de Credit Suisse, que reclaman unos 2.000 M, previsto para septiembre de 2026) [9].',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      // Sin el efectivo fiduciario ni los pasivos fiduciarios (dinero de clientes y aseguradoras, 10.350-11.473 M), que se presentan en balance desde 2022 y se compensan exactamente.
      { periodo: '2019', activo_total: 31357, activo_corriente: 7068, pasivo_corriente: 6679, pasivo_total: 23414, fondo_comercio: 14671, intangibles: 2774, inmovilizado_material: 858, existencias: 0, clientes: 5236, proveedores: 2746, activos_contrato: null, pasivos_contrato: null, caja: 1155, deuda_financiera: 13171, arrendamientos: 0, patrimonio_neto: 7793, minoritarios: 150, reservas: 15199 },
      { periodo: '2020', activo_total: 33049, activo_corriente: 8155, pasivo_corriente: 6556, pasivo_total: 23789, fondo_comercio: 15517, intangibles: 2699, inmovilizado_material: 856, existencias: 0, clientes: 5326, proveedores: 3050, activos_contrato: null, pasivos_contrato: null, caja: 2089, deuda_financiera: 11830, arrendamientos: 0, patrimonio_neto: 9104, minoritarios: 156, reservas: 16272 },
      { periodo: '2021', activo_total: 33660, activo_corriente: 8264, pasivo_corriente: 6654, pasivo_total: 22438, fondo_comercio: 16317, intangibles: 2810, inmovilizado_material: 847, existencias: 0, clientes: 5586, proveedores: 3165, activos_contrato: null, pasivos_contrato: null, caja: 1752, deuda_financiera: 10967, arrendamientos: 0, patrimonio_neto: 11009, minoritarios: 213, reservas: 18389 },
      { periodo: '2022', activo_total: 33454, activo_corriente: 8299, pasivo_corriente: 7172, pasivo_total: 22705, fondo_comercio: 16251, intangibles: 2537, inmovilizado_material: 871, existencias: 0, clientes: 5852, proveedores: 3278, activos_contrato: null, pasivos_contrato: null, caja: 1442, deuda_financiera: 11763, arrendamientos: 0, patrimonio_neto: 10520, minoritarios: 229, reservas: 20301 },
      { periodo: '2023', activo_total: 37236, activo_corriente: 10954, pasivo_corriente: 9001, pasivo_total: 24866, fondo_comercio: 17231, intangibles: 2630, inmovilizado_material: 882, existencias: 0, clientes: 6418, proveedores: 3403, activos_contrato: null, pasivos_contrato: null, caja: 3358, deuda_financiera: 13463, arrendamientos: 0, patrimonio_neto: 12191, minoritarios: 179, reservas: 22759 },
      { periodo: '2024', activo_total: 45205, activo_corriente: 10841, pasivo_corriente: 8242, pasivo_total: 31670, fondo_comercio: 23306, intangibles: 4820, inmovilizado_material: 859, existencias: 0, clientes: 7156, proveedores: 3402, activos_contrato: null, pasivos_contrato: null, caja: 2398, deuda_financiera: 19947, arrendamientos: 0, patrimonio_neto: 13342, minoritarios: 193, reservas: 25306 },
      { periodo: '2025', activo_total: 47237, activo_corriente: 11727, pasivo_corriente: 9587, pasivo_total: 31922, fondo_comercio: 24337, intangibles: 4746, inmovilizado_material: 829, existencias: 0, clientes: 7670, proveedores: 3652, activos_contrato: null, pasivos_contrato: null, caja: 2687, deuda_financiera: 19587, arrendamientos: 0, patrimonio_neto: 15100, minoritarios: 215, reservas: 27767 },
    ],
    vencimientos: [{ anio: '2026', importe: 1300 }, { anio: '2027', importe: 1300 }, { anio: '2028', importe: 22 }, { anio: '2029', importe: 1500 }, { anio: '2030', importe: 2400 }, { anio: '2031+', importe: 13065 }],
    liquidez: 'Caja 1.700 M a 30-jun-26 (2.687 M al cierre de 2025), programa de pagarés de 3.500 M (1.024 M emitidos en el 1S26) y línea de crédito comprometida; no incluye 12.203 M de efectivo fiduciario, que pertenece a clientes y aseguradoras [5, 1].',
    rating: 'S&P A- (estable), Moody’s A3 (estable), Fitch A- (estable) [1]',
    coste_deuda_pct: 4.9,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones: activos de pensiones de 2.225 M frente a pasivos de 739 M a 30-jun-26, un superávit neto de unos 1.486 M que genera «otros créditos netos por pensiones» de ~200 M al año fuera del resultado operativo [5]. Litigios: pasivo de 425 M dotado en el 1T26 por Greensill (acuerdo con Greensill Bank en junio de 2026 y estimación para la demanda de los fondos de Credit Suisse, que reclaman unos 2.000 M más intereses; juicio previsto para septiembre de 2026), en acreedores y gastos devengados [9]. Pasivo por errores y omisiones de 280 M [5]. Arrendamientos operativos de 1.821 M (US GAAP: su coste ya está en el EBITDA, no van al puente) [5]. Las hipotecas de la sede de Nueva York no tienen recurso salvo rebaja a B [1].',
    comentario: 'La deuda financiera saltó de 13.463 M a 19.947 M en 2024 para pagar McGriff (8.170 M de bonos nuevos) y se ha mantenido: 20.561 M a junio de 2026 con 1.024 M de pagarés para financiar 1.512 M de recompras del semestre [1, 5]. Los vencimientos son cómodos (1.300 M en 2026 y 2027) y el rating A- estable [1]. El circulante operativo (clientes menos acreedores) ronda el 15 % de las ventas y es estacional: en el primer semestre se pagan los bonus (−1.319 M) y suben los cobros pendientes (−1.365 M), y la caja vuelve en el segundo [5]. El efectivo fiduciario (11.473-12.203 M) se excluye de la caja y de los pasivos de este informe: es dinero de clientes y aseguradoras con el pasivo exactamente igual.',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2019', flujo_operativo: 2361, capex: 421, pagos_arrendamientos: 0, adquisiciones: 4229, desinversiones: 10, dividendos: 890, recompras: 485, emision_acciones: 107, intereses_en_financiacion: 0 },
      { periodo: '2020', flujo_operativo: 3382, capex: 348, pagos_arrendamientos: 0, adquisiciones: 647, desinversiones: 6, dividendos: 943, recompras: 0, emision_acciones: 72, intereses_en_financiacion: 0 },
      { periodo: '2021', flujo_operativo: 3516, capex: 406, pagos_arrendamientos: 0, adquisiciones: 859, desinversiones: 84, dividendos: 1026, recompras: 1159, emision_acciones: 103, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 3465, capex: 470, pagos_arrendamientos: 0, adquisiciones: 572, desinversiones: 119, dividendos: 1138, recompras: 1950, emision_acciones: 50, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 4258, capex: 416, pagos_arrendamientos: 0, adquisiciones: 976, desinversiones: 0, dividendos: 1298, recompras: 1150, emision_acciones: 199, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 4302, capex: 316, pagos_arrendamientos: 0, adquisiciones: 8542, desinversiones: 89, dividendos: 1513, recompras: 900, emision_acciones: 264, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 5292, capex: 291, pagos_arrendamientos: 0, adquisiciones: 652, desinversiones: 22, dividendos: 1699, recompras: 2012, emision_acciones: 250, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo pasa de 2.361 M (2019) a 5.292 M (2025), por encima del beneficio neto todos los años desde 2020 (1,25 veces en 2025) porque la amortización de intangibles (549 M) y los pagos en acciones (394 M) no son caja [1]. El capex es pequeño (291 M, 1,1 % de las ventas) y casi todo de mantenimiento (tecnología y oficinas); el arrendamiento de oficinas va dentro del flujo operativo (US GAAP) [1]. La inversión que hace crecer el negocio son las compras: 4.229 M en 2019 (JLT), 8.542 M en 2024 (McGriff) y 570-980 M el resto de años [1, 4]. El flujo del semestre es estacional (835 M en el 1S26 frente a 1.049 M en el 1S25, con más cobros pendientes) [5]. En el estado de flujos, el cambio de los pasivos fiduciarios va en financiación y no se toca aquí.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 31-dic-2025)',
    comentario: 'Cuentas US GAAP sin salvedades de Deloitte [1]. Tres asuntos que mirar. Primero, el beneficio ajustado de la empresa (9,75 USD de BPA en 2025) excluye cada año «partidas destacadas» que se repiten (reestructuración, integración, contraprestaciones contingentes): en 2025 sumaron unos 525 M antes de impuestos, el 8 % del resultado operativo; este informe usa las cifras publicadas [7]. Segundo, la remuneración en acciones es de 394 M (9,5 % del beneficio neto), moderada para una firma de servicios profesionales [1]. Tercero, el balance es casi todo fondo de comercio e intangibles (29.083 M frente a 15.315 M de patrimonio) por las compras; no ha habido deterioros relevantes de JLT ni de McGriff [1]. El efectivo fiduciario se presenta en balance desde 2022 con un pasivo igual: se excluye de los ratios. La lectura de Altman, Piotroski y Beneish del motor se da en el informe.',
    senales: [
      { senal: 'Partidas «destacadas» recurrentes fuera del BPA ajustado', nivel: 'Media', comentario: 'Reestructuración Thrive (500 M en tres años), integración de McGriff y cambios de contraprestaciones: 8 % del resultado operativo en 2025 [7, 1].' },
      { senal: 'Litigio Greensill con dotación revisable', nivel: 'Media', comentario: '425 M dotados en el 1T26; la empresa avisa de que el resultado puede diferir materialmente y que podría dotar más [9].' },
      { senal: 'Intereses fiduciarios en ingresos', nivel: 'Baja', comentario: '403 M en 2025 (1,5 % de los ingresos, casi todo margen) que bajan con los tipos [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: dividendo creciente (subido un 10 % en julio de 2026 a 0,99 USD trimestrales; 16 años seguidos de subidas), compras de corredurías y consultoras, y recompras con el resto [5, 1]. En 2025 recompró 10,1 millones de acciones por 2.012 M y en el 1S26 otros 8,7 millones por 1.512 M, con parte financiada con pagarés [7, 5]. Mantiene el rating A-/A3 como límite al endeudamiento [1].',
    adquisiciones: [
      { anio: '2019', objetivo: 'Jardine Lloyd Thompson (JLT), corredor británico', importe: 6400, ev_ebitda: null, financiacion: 'Deuda (bonos)', resultado: 'Integrado; costes de integración elevaron los gastos de 2019-2020; sin deterioros del fondo de comercio [1, 4].' },
      { anio: '2024', objetivo: 'McGriff Insurance Services (EE. UU., mediana empresa)', importe: 7750, ev_ebitda: 21, financiacion: 'Bonos por 8.170 M', resultado: 'Integración completada en 2025 según la empresa; aporta unos 1.280 M de ingresos en 2025 [7, 1].' },
      { anio: '2026', objetivo: 'Cinco compras pequeñas (entre ellas AltamarCAM en España y TriBridge Partners)', importe: 181, ev_ebitda: null, financiacion: 'Caja', resultado: 'Recientes [9].' },
    ],
    comentario: 'Desde 2019 ha dedicado unos 16.400 M a compras, 8.900 M a dividendos y 7.650 M a recompras [4]. Las dos grandes (JLT y McGriff) se pagaron caras (21 veces el EBITDAC en McGriff, según una nota de analistas) y llevan el fondo de comercio a 24.337 M, lo que limita el ROIC sobre el capital total; pero el ROIC operativo sigue muy por encima del coste de capital y la dilución es negativa: las acciones diluidas bajan de 511 M (2019) a 482 M (2T26) [1, 5]. El veredicto: buena asignadora, aunque el retorno incremental de McGriff aún no se ha probado.',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento y comparación con el consenso de 3T24-2T25', tipo: 'Complemento', intentos: '1) notas de resultados de 3T25 a 2T26 en EDGAR (solo traen el trimestre comparable); 2) feed de Seeking Alpha (solo 2026); 3) no se descargaron las notas de 2024', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) nota de deuda del 10-K 2025 (solo calendario de cinco años); 2) 10-Q 2T26; 3) no se calcula sin la lista completa de bonos', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) 10-K 2025 (portada, sin año de inicio); 2) proxy 2026 (no localizado con grep); 3) sin fuente secundaria fiable', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, competencia y regulación', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2026-02-09', url: E + '000006270926000022/mrsh-20251231.htm' },
  { id: 2, titulo: 'Insurance Brokers and Agents Market Size (276.500 M USD en 2025; 9,1 % anual 2026-2035)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026-08', url: 'https://www.gminsights.com/industry-analysis/insurance-brokers-and-agents-market' },
  { id: 3, titulo: 'Insurance Brokerage Market (359.270 M USD en 2026; 572.470 M en 2031; concentración media)', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/insurance-brokerage-market' },
  { id: 4, titulo: 'Global commercial insurance rates fall 6% in Q2 2026; eighth consecutive quarterly decline (Global Insurance Market Index)', editor: 'Marsh', tipo: 'Sectorial', fecha: '2026-07-23', url: 'https://www.marsh.com/en/corp/about/news/global-commercial-insurance-falls-6-percent-q2-2026.html' },
  { id: 5, titulo: 'Insurance brokers plunge on AI fears', editor: "Leader's Edge (The Council)", tipo: 'Prensa', fecha: '2026-03', url: 'https://www.leadersedge.com/industry/insurance-brokers-plunge-on-ai-fears' },
  { id: 6, titulo: 'AI-Fueled Selloff in Insurance Brokers Overdone, Analysts Say', editor: 'Bloomberg Law', tipo: 'Prensa', fecha: '2026-02', url: 'https://news.bloomberglaw.com/insurance/ai-fueled-selloff-in-insurance-brokers-overdone-analysts-say' },
  { id: 7, titulo: 'Aon plc: datos financieros y estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AON-PLC-11994390/finances/' },
  { id: 8, titulo: 'WTW: datos financieros y estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/WILLIS-TOWERS-WATSON-PUBL-25623167/finances/' },
  { id: 9, titulo: 'Arthur J. Gallagher & Co.: datos financieros y estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/ARTHUR-J-GALLAGHER-CO-11601/finances/' },
  { id: 10, titulo: 'Brown & Brown: datos financieros y estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/BROWN-BROWN-INC-11919/finances/' },
  { id: 11, titulo: 'Ryan Specialty: datos financieros y estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/RYAN-SPECIALTY-HOLDINGS-I-124966529/finances/' },
  { id: 12, titulo: 'Nota de resultados 2T26 (Exhibit 99.1)', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-07-21', url: E + '000006270926000193/mmc2q2026ex991newsrelease.htm' },
  { id: 13, titulo: 'Fichas de Yahoo Finance (ingresos, EBIT y capital invertido 2025 de Aon, WTW, Gallagher, Brown & Brown, Ryan)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/MRSH/' },
  { id: 14, titulo: 'Form 10-K 2023 (historia reciente y crecimiento por segmentos 2023)', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2024-02-12', url: E + '000006270924000016/mmc-20231231.htm' },
];
const B = {
  historia: {
    resumen: 'Fundada en 1871 como agencia de seguros en Chicago, Marsh & McLennan nace en 1905 de la unión de Henry Marsh y Donald McLennan y cotiza en la Bolsa de Nueva York desde 1962 [1]. Se diversificó en consultoría de recursos humanos (Mercer, 1959), consultoría de dirección (Oliver Wyman, 2003) y reaseguro (Guy Carpenter). Tras el escándalo de las comisiones contingentes de 2004 se deshizo de Putnam y Kroll y se concentró en riesgo y consultoría. Con JLT (2019) y McGriff (2024) consolidó el primer puesto mundial en correduría [1]. En 2026 pasó a llamarse comercialmente «Marsh» (ticker MRSH desde el 14-ene-2026) y renombró sus unidades: Marsh Risk y Marsh Management Consulting [1].',
    hitos: [
      { anio: '1905', hito: 'Unión de Henry Marsh y Donald McLennan.' },
      { anio: '1962', hito: 'Salida a bolsa en Nueva York.' },
      { anio: '2004', hito: 'Escándalo de las comisiones contingentes (demanda del fiscal de Nueva York); cambio de cúpula y de modelo de cobro.' },
      { anio: '2019', hito: 'Compra de Jardine Lloyd Thompson (≈5.600 M GBP).' },
      { anio: '2023', hito: 'John Doyle, consejero delegado.' },
      { anio: '2024', hito: 'Compra de McGriff por 7.750 M USD (cerrada en noviembre).' },
      { anio: '2025', hito: 'Programa Thrive (500 M de coste, 400 M de ahorro) y nueva marca única.' },
      { anio: '2026', hito: 'Ticker MRSH (14-ene); cargo de 425 M por Greensill (1T26).' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Marsh es la mayor firma mundial de servicios profesionales de riesgo, seguros y recursos humanos: 26.981 M USD de ingresos en 2025, más de 95.000 empleados y clientes en 130 países [1]. Tiene dos segmentos. Risk & Insurance Services (64 % de los ingresos) agrupa a Marsh Risk (54 %), primer corredor de seguros del mundo para empresas, administraciones y particulares de patrimonio alto, y a Guy Carpenter (10 %), corredor de reaseguro para aseguradoras. Consulting (36 %) agrupa a Mercer (23 %; salud y beneficios, consultoría de pensiones y gestión delegada de inversiones, con unos 650.000 M USD de activos bajo gestión) y a Marsh Management Consulting (13 %, antes Oliver Wyman) [1].',
    como_gana_dinero: 'En correduría cobra comisiones sobre la prima que coloca (y honorarios en grandes cuentas): el ingreso sube con las tarifas de los seguros, el valor asegurado de los clientes y los clientes nuevos, y no asume el riesgo del seguro. Unos 403 M salen de los intereses del dinero de clientes que custodia (primas y siniestros en tránsito) [1]. La renovación anual es muy alta y estacional: el primer trimestre concentra las renovaciones de enero y es el de más margen (31,6 % de margen EBITDA en el 1T25 frente al 21,9 % del 4T25) [5 de A]. El coste es casi todo personal (compensación y beneficios = 56 % de los ingresos en el 1S26) [12]; el apalancamiento operativo viene de crecer más que la plantilla. En Mercer, parte de los ingresos dependen de los activos gestionados (mercados) y en consultoría de dirección, de la demanda de proyectos.',
    clientes: 'No hay concentración: decenas de miles de clientes y ninguno relevante [1]. La renovación de las pólizas en correduría supera tradicionalmente el 90 % (dato del sector; la empresa no lo publica). El poder de precios es indirecto: la comisión sigue a la prima, y la prima ha caído un 6 % en el 2T26 (octavo trimestre de bajadas; daños −12 %) mientras el crecimiento subyacente de Marsh Risk se mantiene en el 4 % gracias a clientes nuevos y a la exposición asegurada [4, 12]. La debilidad está en el reaseguro (Guy Carpenter −2 % en el 2T26) [12].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es la intermediación de seguros y reaseguros en todo el mundo: corredores y agencias que colocan riesgos de empresas y particulares por una comisión u honorario. Las estimaciones varían mucho por perímetro: Global Market Insights lo sitúa en 276.500 M USD en 2025 (corredores y agentes) y Mordor Intelligence en 359.270 M en 2026 [2, 3]. Usamos la de Global Market Insights, más prudente y con el mismo perímetro que la cuota de Risk & Insurance Services. Consulting (Mercer y consultoría de dirección) es otro mercado y no entra en la cuota.',
    tamano: '≈ 276.500 M USD en 2025 (Global Market Insights) [2]; 359.270 M en 2026 según Mordor Intelligence [3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 276500 }, { anio: '2026e', tamano: 301700 }, { anio: '2027e', tamano: 329100 }, { anio: '2028e', tamano: 359100 }, { anio: '2030e', tamano: 427400 }],
    tcac_historico_pct: null, tcac_previsto_pct: 9.1, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Tarifas de los seguros comerciales', efecto: '−', horizonte: 'Cíclico', evidencia: 'Índice de Marsh: −6 % global en el 2T26, octavo trimestre seguido de bajadas; daños −12 %, ciberriesgos −4 %, responsabilidad civil +2 % [4].' },
      { driver: 'Valores asegurados y economía (nóminas, ventas, inmuebles)', efecto: '+', horizonte: 'Estructural', evidencia: 'Crecimiento subyacente de Marsh Risk del 4 % en el 2T26 pese a las tarifas [12].' },
      { driver: 'Consolidación y compras de corredurías', efecto: '+', horizonte: 'Estructural', evidencia: 'Operaciones de 7.750-13.450 M en 2024-2025 (McGriff, AssuredPartners, Accession) [1].' },
      { driver: 'Tipos de interés (intereses fiduciarios)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Intereses fiduciarios de Marsh: 497 M en 2024, 403 M en 2025, 173 M en el 1S26 (202 M en el 1S25) [1, 12].' },
      { driver: 'IA y venta directa', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Caída media del 9 % de los corredores el 9-feb-2026 tras aplicaciones de cotización con ChatGPT en seguros personales; los analistas lo ven más en líneas personales que en comerciales [5, 6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro globales (Marsh, Aon, WTW, Gallagher) y una larga cola regional; la competencia por talento es intensa (fichajes de equipos y pleitos por pactos de no competencia) [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las grandes cuentas negocian honorarios y pueden autoasegurarse; la renovación sigue siendo alta [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Las aseguradoras dependen de los corredores para la distribución comercial; el «proveedor» crítico es el talento (56 % de los ingresos en personal) [12].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias, escala de datos y relaciones; los nuevos entran por capital privado comprando corredurías, no desde cero [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Venta directa y digital, ya clara en seguros personales; la IA podría extenderla a pymes; poco probable en grandes riesgos [5, 6].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Las tarifas comerciales llevan ocho trimestres bajando (−6 % en el 2T26) por exceso de capacidad, beneficios altos de las aseguradoras y reaseguro más barato [4]. Es el lado blando del ciclo del seguro: el crecimiento subyacente de Marsh cae del 7 % de 2024 al 4 % [5 de A]. En 2008-09 el sector sufrió por la caída de la actividad y las tarifas blandas (crecimiento cercano a cero); en 2020 apenas notó la pandemia (crecimiento subyacente positivo) y en 2022-23 el endurecimiento de tarifas lo aceleró. Un año de grandes catástrofes volvería a endurecer el mercado.' },
    regulacion: 'La correduría está regulada por los supervisores de seguros de cada país (estados de EE. UU., FCA en Reino Unido) y Mercer por los de inversión (SEC, Departamento de Trabajo, banco central irlandés) [1]. Las comisiones contingentes y los ingresos de las aseguradoras siguen bajo vigilancia desde 2004; la FCA ha revisado la remuneración de los corredores mayoristas. Las sanciones internacionales y la normativa de IA y protección de datos añaden costes [1]. El impuesto mínimo de la OCDE afecta al tipo efectivo.',
    tendencias: 'Tres cambios. La IA abarata el trabajo de colocación y de análisis (Marsh tiene 46.000 empleados formados en su academia de IA y una unidad central, Business Client Services, para automatizar) [1], pero también abre la puerta a la venta directa en riesgos sencillos [5]. El capital privado consolida corredurías medianas y encarece las compras (14-22 veces el EBITDAC) [1]. Y los mercados de capitales sustituyen parte del reaseguro (bonos catastróficos), lo que presiona a Guy Carpenter. Marsh gana con la escala y los datos en grandes cuentas y pierde algo en reaseguro.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 6.2,
    posicion: '1.º mundial en correduría de seguros y reaseguros (≈6 % de un mercado de ≈276.500 M USD, con los 17.265 M de Risk & Insurance Services); en consultoría de recursos humanos, Mercer es de los tres primeros.',
    competidores: [
      { nombre: 'Aon', pais: 'Irlanda/EE. UU.', ticker: 'AON', ingresos: 17181, cuota_pct: 6.2, margen_ebit_pct: 32.4, comentario: 'El rival más parecido (corredor y reaseguro, consultoría de salud y patrimonio); compró NFP en 2024 [7].' },
      { nombre: 'Arthur J. Gallagher', pais: 'EE. UU.', ticker: 'AJG', ingresos: 13751, cuota_pct: 5.0, margen_ebit_pct: 24.5, comentario: 'Comprador en serie de corredurías medianas; AssuredPartners por 13.450 M (2024-25) [9].' },
      { nombre: 'WTW', pais: 'Irlanda/Reino Unido', ticker: 'WTW', ingresos: 9708, cuota_pct: 2.5, margen_ebit_pct: 25.2, comentario: 'Correduría y consultoría de recursos humanos; vendió Willis Re a Gallagher en 2021 [8].' },
      { nombre: 'Brown & Brown', pais: 'EE. UU.', ticker: 'BRO', ingresos: 5902, cuota_pct: 2.1, margen_ebit_pct: 28.7, comentario: 'Corredor de pymes y mayorista; compró Accession por 9.825 M en 2025 [10].' },
      { nombre: 'Ryan Specialty', pais: 'EE. UU.', ticker: 'RYAN', ingresos: 3051, cuota_pct: 1.1, margen_ebit_pct: 16.2, comentario: 'Mayorista de riesgos especiales; crece más rápido [11].' },
      { nombre: 'Hub International', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada (capital privado); compradora agresiva en EE. UU. [3].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Más primas colocadas dan más datos y más poder ante las aseguradoras (facilidades y programas propios); el reaseguro y los grandes riesgos exigen esa escala [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Programas de seguro complejos y relaciones de años; renovaciones altas y crecimiento subyacente positivo durante ocho trimestres de tarifas a la baja [4, 12].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca de 150 años, licencias en 130 países y talento; 18 años seguidos de mejora del margen ajustado [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo ajustado del 30,5 % en el 1S26, entre los más altos de los grandes [12].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Cuatro globales en grandes riesgos y reaseguro; un nuevo entrante no puede replicar la red en 130 países [1].' },
      ],
    },
    amenazas: 'La amenaza principal es que la IA reduzca el valor de la colocación en riesgos estandarizados (pymes y particulares) y empuje las comisiones a la baja; en grandes riesgos y reaseguro es menos probable en cinco años [5, 6]. La segunda es la fuga de equipos hacia rivales financiados por capital privado. La tercera, un ciclo blando largo en daños y reaseguro. Probabilidad de erosión significativa del foso a cinco años: baja-media.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es el capital humano (personal = 56 % de los ingresos; retener a los productores) y la ética comercial (conflictos de interés en la remuneración de las aseguradoras, sanciones y anticorrupción) [1, 12]. El cambio climático es a la vez riesgo y negocio: las catástrofes endurecen el mercado y suben las comisiones [4]. La huella de carbono es pequeña (oficinas y viajes).',
    controversias: 'Litigio Greensill: Marsh fue corredor de los seguros de crédito de Greensill; 425 M dotados en el 1T26, acuerdo con Greensill Bank en junio de 2026 y juicio con fondos de Credit Suisse (2.000 M reclamados) previsto para septiembre de 2026 [9 de A]. No hay sanciones regulatorias relevantes recientes localizadas.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) 10-K 2025 (sin cuotas); 2) Mordor Intelligence (solo «concentración media»); 3) suma de ingresos de los cinco grandes sobre el mercado (≈22 %, mezcla perímetros: no se usa)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy 2026 (sin notas ESG); 2) búsqueda MSCI/Sustainalytics no hecha por presupuesto; 3) —', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, ratio salarial, accionistas', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2026-03-31', url: E + '000119312526133303/d94896ddef14a.htm' },
  { id: 2, titulo: '8-K: resultados de la junta de 2026 (votos)', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2026-05-22', url: E + '000006270926000128/a2026mmcagmresultsform8-k.htm' },
  { id: 3, titulo: '8-K: resultados de la junta de 2025 (votos)', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2025-05-19', url: E + '000095010325006177/dp228999_8k.htm' },
  { id: 4, titulo: 'Form 4 de consejeros y directivos (oct-2025 a oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000062709&type=4' },
  { id: 5, titulo: 'Marsh appoints Mark McGivney as EVP and COO in addition to CFO (Exhibit 99.1)', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-04-14', url: E + '000095010326005674/dp245126_ex9901.htm' },
  { id: 6, titulo: 'Marsh appoints Nick Studer President and CEO of Marsh Risk and Martin South Chief Client Officer (Exhibit 99.1)', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-03-10', url: E + '000006270926000071/ex_991martinsouthpressrele.htm' },
  { id: 7, titulo: 'Nota de resultados 4T25 y 2025', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-01-29', url: E + '000006270926000014/mmc4q2025ex991newsrelease.htm' },
  { id: 8, titulo: 'Form 10-K 2025', editor: 'Marsh & McLennan Companies, Inc.', tipo: 'Primaria', fecha: '2026-02-09', url: E + '000006270926000022/mrsh-20251231.htm' },
];
const cons = (nombre, tipo, desde, com, cargo = 'Consejero') => ({ nombre, cargo, tipo, desde, comisiones: com });
const C = {
  directivos: {
    equipo: [
      { nombre: 'John Q. Doyle', cargo: 'Presidente ejecutivo de la compañía (President) y consejero delegado', desde: '2023', participacion_pct: 0.05, trayectoria: 'Entró en 2016 desde AIG (presidente de seguros generales); dirigió Marsh y fue director de operaciones del grupo en 2021-22. Como consejero delegado: ingresos de 22.736 M (2023) a 26.981 M (2025), compra e integración de McGriff y programa Thrive [1, 7].' },
      { nombre: 'Mark C. McGivney', cargo: 'Director financiero y, desde abril de 2026, director de operaciones', desde: '2016', participacion_pct: null, trayectoria: 'En la empresa desde 2007 (Mercer, Marsh); director financiero desde 2016. Desde el 15-abr-2026 dirige además la estrategia de compras y la ejecución de prioridades [5].' },
      { nombre: 'Nick Studer', cargo: 'Presidente y consejero delegado de Marsh Risk', desde: '2026', participacion_pct: null, trayectoria: 'Casi 30 años en Oliver Wyman, que dirigió cinco años con fuerte crecimiento; sustituye a Martin South en Marsh Risk desde el 1-abr-2026 [6].' },
      { nombre: 'Martin South', cargo: 'Director de clientes (Chief Client Officer)', desde: '2026', participacion_pct: null, trayectoria: 'Dirigió Marsh Risk; ahora coordina clientes entre negocios y la aplicación de la IA a la experiencia del cliente [6].' },
      { nombre: 'H. Edward Hanway', cargo: 'Presidente independiente del consejo', desde: '2010', participacion_pct: null, trayectoria: 'Ex consejero delegado de CIGNA; consejero desde 2010 [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento subyacente medio de un dígito, expansión del margen ajustado y crecimiento sólido del BPA ajustado', real: 'Subyacente 4 %, margen ajustado al alza (18.º año), BPA ajustado +9 % a 9,75', cumplida: 'Sí' },
      { anio: '2026', guia: 'Crecimiento subyacente parecido al de 2025; 400 M de ahorro de Thrive', real: '4 % en el 1T26 y 5 % en el 2T26; BPA ajustado del 1S26 +8 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de la casa: el consejero delegado lleva tres años, el director financiero diez, y los relevos de 2026 (Studer a Marsh Risk, South a clientes, McGivney a director de operaciones) son internos y ordenados [5, 6]. La dirección ha cumplido de forma sistemática su promesa de mejorar el margen ajustado (18 años) [7]. El punto débil es la credibilidad en el crecimiento: el subyacente bajó del 7 % al 4 % y la guía de 2026 es poco exigente. Sucesión: McGivney gana peso como número dos.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('H. Edward Hanway', 'Independiente', '2010', 'Presidente; Ejecutiva', 'Presidente independiente'),
      cons('John Q. Doyle', 'Ejecutivo', '2023', 'Ejecutiva', 'Consejero delegado'),
      cons('Anthony K. Anderson', 'Independiente', '2016', 'Auditoría (presidente)'),
      cons('Bruce Broussard', 'Independiente', '2025', 'n.d.'),
      cons('Peter Harrison', 'Independiente', '2026', 'n.d.'),
      cons('Judith Hartmann', 'Independiente', '2023', 'n.d.'),
      cons('Deborah C. Hopkins', 'Independiente', '2017', 'Finanzas (presidenta)'),
      cons('Tamara Ingram', 'Independiente', '2019', 'Responsabilidad empresarial'),
      cons('Jane H. Lute', 'Independiente', '2020', 'n.d.'),
      cons('Steven A. Mills', 'Independiente', '2011', 'Retribuciones (presidente)'),
      cons('Morton O. Schapiro', 'Independiente', '2002', 'Consejeros y Gobierno (presidente)'),
      cons('Jan Siegmund', 'Independiente', '2024', 'n.d.'),
      cons('Lloyd M. Yates', 'Independiente', '2011', 'Retribuciones; Finanzas'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 88.0, voto_remuneracion_contra_pct: 11.5, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 25.05, fijo: 1.5, variable_corto: 5.55, variable_largo: 17.58, ratio_salario_medio: 329 },
    remuneracion: 'El consejero delegado cobró 25,05 M USD en 2025 (22,81 M en 2024): 1,5 M de fijo, 5,55 M de bonus anual y 17,58 M en acciones y opciones, 329 veces el empleado mediano (76.092 USD) [1]. El variable a largo plazo son opciones y unidades de acciones por rendimiento (PSU) que dependen del crecimiento del BPA ajustado a tres años y del TSR relativo frente al S&P 500: las PSU de 2023 pagaron el 200 % por BPA (12,7 % anual frente al 8 % objetivo) pese a un TSR en el percentil 38 [1]. Premia el BPA ajustado, que excluye la amortización de compras: incentiva comprar. Hay cláusula de recuperación y obligación de mantener acciones (seis veces el sueldo) [1]. Voto consultivo: 88,0 % a favor en 2026 y 90,6 % en 2025 [2, 3].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 9.0, tipo: 'Institucional', variacion: 'Estable (13G de feb-2024)' },
      { nombre: 'BlackRock', pct: 8.4, tipo: 'Institucional', variacion: 'Estable (13G de ene-2024)' },
      { nombre: 'Consejeros y directivos', pct: 1.0, tipo: 'Insiders', variacion: 'Menos del 1 % en conjunto' },
      { nombre: 'Autocartera', pct: 13.9, tipo: 'Autocartera', variacion: '75,8 millones de acciones a 31-dic-2025 (69,2 un año antes)' },
    ],
    insiders: [
      { fecha: '2026-09-02', persona: 'John Q. Doyle (CEO)', operacion: 'Venta', acciones: 71046, importe: 12.73 },
      { fecha: '2026-07-23', persona: 'Lloyd M. Yates (consejero)', operacion: 'Venta', acciones: 12000, importe: 2.11 },
      { fecha: '2026-08-06', persona: 'John Jude Jones (marketing)', operacion: 'Venta', acciones: 8862, importe: 1.66 },
      { fecha: '2026-07-28', persona: 'Martin South (clientes)', operacion: 'Venta', acciones: 7100, importe: 1.35 },
      { fecha: '2026-03-03', persona: 'Nick Studer (Marsh Risk)', operacion: 'Venta', acciones: 3837, importe: 0.71 },
    ],
    control_y_defensas: 'Capital disperso sin accionista de control: Vanguard (9,0 %) y BlackRock (8,4 %) son los mayores [1]. Una acción, un voto; consejo de 13 con 12 independientes, presidente independiente separado del consejero delegado y elección anual de todos los consejeros [1, 2]. No hay operaciones vinculadas relevantes ni blindajes conocidos. Las ventas de directivos de los últimos 12 meses suman 18,9 M USD (12,9 M con planes 10b5-1, casi todas del consejero delegado tras ejercer opciones) y no hay compras en mercado [4]. Dos consejeros con más de 15 años (Schapiro desde 2002, Hanway desde 2010) recibieron los mayores votos en contra (7,6 % y 5,5 %) [2].',
    alertas: [
      'Ventas de directivos por 18,9 M USD en 12 meses y ninguna compra, con la acción un 14 % abajo en el año [4].',
      'Litigio Greensill: 425 M dotados y juicio con fondos de Credit Suisse previsto para septiembre de 2026 (ver balance).',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [{ seccion: 'gobierno', campo: 'comisiones de varios consejeros', tipo: 'Complemento', intentos: '1) fichas del proxy 2026 (texto mal extraído en la tabla de comisiones); 2) grep de «Committees:»; 3) —', decision: 'Omitido (n.d. en la tabla)' }],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de MRSH, ^GSPC e IAK (precio, rango, volumen, beta, rentabilidades, cierres anuales)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/MRSH/history/' },
  { id: 2, titulo: 'Marsh & McLennan Companies: Financial Data, Forecasts, Estimates', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/MARSH-MCLENNAN-COMPANIES-13573/finances/' },
  { id: 3, titulo: 'Marsh & McLennan Companies: consensus and target prices (23 analistas; cambios de objetivo de octubre)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/MARSH-MCLENNAN-COMPANIES-13573/consensus/' },
  { id: 4, titulo: 'MRSH stock forecast (23 analistas, objetivo medio 202,67; BPA ajustado 2026-2027)', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-12', url: 'https://stockanalysis.com/stocks/mrsh/forecast/' },
  { id: 5, titulo: 'Aon plc: estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AON-PLC-11994390/finances/' },
  { id: 6, titulo: 'WTW: estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/WILLIS-TOWERS-WATSON-PUBL-25623167/finances/' },
  { id: 7, titulo: 'Arthur J. Gallagher & Co.: estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/ARTHUR-J-GALLAGHER-CO-11601/finances/' },
  { id: 8, titulo: 'Brown & Brown: estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/BROWN-BROWN-INC-11919/finances/' },
  { id: 9, titulo: 'Ryan Specialty: estimaciones', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/RYAN-SPECIALTY-HOLDINGS-I-124966529/finances/' },
  { id: 10, titulo: 'Fichas de Yahoo Finance: precio, capitalización, acciones, EBIT y capital invertido de MRSH, AON, WTW, AJG, BRO y RYAN', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/MRSH/key-statistics/' },
  { id: 11, titulo: 'Gallagher set to ramp up M&A deals after $13B purchase of AssuredPartners (múltiplos de AssuredPartners, NFP y McGriff)', editor: 'Business Insurance', tipo: 'Prensa', fecha: '2024-12-09', url: 'https://www.businessinsurance.com/gallagher-set-to-ramp-up-ma-deals-after-13b-purchase-of-assuredpartners/' },
  { id: 12, titulo: 'What made this Boston agency worth $9.8 billion to buyers (Accession: ≈15,6 veces el EBITDA ajustado)', editor: 'Agency Checklists', tipo: 'Prensa', fecha: '2025-06-16', url: 'https://agencychecklists.com/2025/06/16/what-made-this-boston-agency-worth-9-8-billion-to-buyers-76080/' },
  { id: 13, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,21 % el 13-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 14, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026 (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 15, titulo: 'Marsh to host third quarter earnings investor call on October 15', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-09', url: 'https://www.marsh.com/en/corp/about/news/marsh-to-host-third-quarter-earnings-investor-call-on-october-15.html' },
  { id: 16, titulo: 'Nota de resultados 2T26 (acciones en circulación, balance a 30-jun-2026)', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-07-21', url: E + '000006270926000193/mmc2q2026ex991newsrelease.htm' },
  { id: 17, titulo: 'Insurance Business: Gallagher acquires AssuredPartners in $13-billion megadeal', editor: 'Insurance Business', tipo: 'Prensa', fecha: '2024-12-09', url: 'https://www.insurancebusinessmag.com/uk/news/breaking-news/gallagher-acquires-assuredpartners-in-13billion-megadeal-517199.aspx' },
];
// Comparables: precio y capitalización de Yahoo (14-oct-2026, sesión en curso); estimaciones de MarketScreener (misma fuente para todas).
// NTM = 21 % del ejercicio 2026 + 79 % del 2027 (mediados de octubre); crecimiento = NTM sobre LTM (≈ media de 2025 y 2026). DN = deuda neta 2025 de MarketScreener. ROIC = EBIT × (1 − t) / capital invertido 2025 (Yahoo).
const comp = (nombre, ticker, pais, cap, dn, v25, v26, v27, e25, e26, e27, b26, b27, ebit, t, ci, fcf) => {
  const ev = cap + dn; const vN = 0.21 * v26 + 0.79 * v27; const eN = 0.21 * e26 + 0.79 * e27; const bN = 0.21 * b26 + 0.79 * b27;
  const r = (x, n = 1) => Math.round(x * 10 ** n) / 10 ** n;
  return { nombre, ticker, pais, capitalizacion: Math.round(cap), ev_ventas: r(ev / v25, 2), ev_ebitda_ltm: r(ev / e25), ev_ebitda_ntm: r(ev / eN), per_ntm: r(cap / (bN * (cap / 1)) * 0 + 0) || null, _bpa_ntm: bN, crecimiento_pct: r((vN / (0.5 * v25 + 0.5 * v26) - 1) * 100), margen_ebitda_pct: r(e25 / v25 * 100), roic_pct: r(ebit * (1 - t) / ci * 100), dn_ebitda: r(dn / e25), fcf_yield_pct: r(fcf / cap * 100) };
};
const precios = { AON: 275.48, WTW: 298.43, AJG: 235.28, BRO: 64.41, RYAN: 37.72 };
const empresas = [
  comp('Aon', 'AON', 'IE', 58436, 12451, 17181, 17919, 18990, 5751, 6129, 6497, 14.24, 15.03, 5574, 0.212, 24601, 3218),
  comp('WTW', 'WTW', 'IE', 27716, 3174, 9708, 10469, 11017, 2638, 2926, 3218, 16.60, 18.32, 2213, 0.163, 14282, 1546),
  comp('Arthur J. Gallagher', 'AJG', 'US', 60311, 11348, 13751, 16612, 18073, 4491, 5396, 6030, 8.089, 9.897, 2510, 0.197, 36291, 1785),
  comp('Brown & Brown', 'BRO', 'US', 21552, 6776, 5902, 6987, 7293, 2121, 2469, 2568, 3.497, 3.682, 1677, 0.221, 20160, 1382),
  comp('Ryan Specialty', 'RYAN', 'US', 9666, 3193, 3051, 3292, 3530, 966.7, 1021, 1101, 0.913, 1.435, 515.6, 0.27, 3999.7, 575.7),
].map((e) => { const p = precios[e.ticker]; const per = Math.round(p / e._bpa_ntm * 10) / 10; const { _bpa_ntm, ...rest } = e; return { ...rest, per_ntm: per }; });

const D = {
  identificacion: {
    nombre: 'Marsh & McLennan Companies, Inc. (marca comercial «Marsh»)', nombre_corto: 'Marsh', ticker: 'MRSH', isin: 'US5717481023', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Financiero', industria: 'Corredores de seguros', sede: 'Nueva York (EE. UU.)', fundacion: '1871', empleados: 95000, web: 'https://www.corporate.marsh.com',
    precio: 177.01, fecha_precio: '2026-10-13', acciones: 477.2, capitalizacion_publicada: 85092, free_float_pct: 99.0,
    max_52s: 206.04, min_52s: 156.6, volumen_medio_diario: '≈ 459 M USD/día (2,53 M de acciones; 3 meses)', proximos_resultados: '2026-10-15',
  },
  consenso: {
    guidance: 'Para 2026 la dirección espera un crecimiento subyacente de los ingresos parecido al de 2025 (4 %), seguir ampliando el margen ajustado y 400 M de ahorros brutos del programa Thrive (coste de unos 500 M en 2025-2027); confirmado con los resultados del 2T26 (21-jul-2026) [2]. No da guía numérica de BPA. Los resultados del 3T26 se publican el 15-oct-2026, al día siguiente de la fecha de corte [15].',
    estimaciones: [
      { periodo: '2026e', ingresos: 28555, ebitda: 8120, ebit: 7761, bpa: 8.60, dpa: 3.73, fuente: 'MarketScreener (BPA publicado; EBITDA y EBIT ajustados) [2]' },
      { periodo: '2027e', ingresos: 29956, ebitda: 8583, ebit: 8282, bpa: 10.08, dpa: 4.02, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 31490, ebitda: 9217, ebit: 8795, bpa: 11.19, dpa: 4.28, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 23, comprar: null, mantener: null, vender: null, po_medio: 202.67, po_min: 177, po_max: 238 },
    revisiones: 'Los objetivos van a la baja: en las dos últimas semanas Morgan Stanley (de 200 a 180), BMO (203 a 179), KBW (202 a 186), Mizuho (201 a 190), Evercore (234 a 224), Goldman (197 a 191), Wells Fargo (188 a 183) y BofA (182 a 177, infraponderar) recortaron, y solo UBS (216 a 222) y JPMorgan (212 a 215) subieron [3]. El consenso de BPA ajustado de Stock Analysis es 10,45 USD para 2026 y 11,42 para 2027 (16 analistas) [4]; el de MarketScreener en base publicada, 8,60 y 10,08 [2]. Solo hay una fuente con estimaciones completas; el objetivo medio coincide en las dos (202,67) [3, 4].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.9,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -4.6, indice_pct: 14.0, sector_pct: 4.6 },
      { periodo: '1 año', accion_pct: -14.5, indice_pct: 17.5, sector_pct: 6.3 },
      { periodo: '3 años (anual.)', accion_pct: -2.5, indice_pct: 21.7, sector_pct: 14.8 },
      { periodo: '5 años (anual.)', accion_pct: 2.0, indice_pct: 12.0, sector_pct: 11.5 },
      { periodo: '10 años (anual.)', accion_pct: 10.4, indice_pct: 13.9, sector_pct: 10.2 },
    ],
    anual: JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8')).bolsa.anual,
    beta: 0.56, volatilidad_pct: 26.5, max_drawdown_pct: -34.4, posicion_corta_pct: null,
    comentario: 'La acción pierde un 14,5 % en un año frente al +17,5 % del S&P 500 y el +6,3 % del ETF de seguros (IAK) [1]. Tres golpes explican la mayor parte: −8,5 % el 16-oct-2025 con los resultados del 3T25 (subyacente del 4 % y menos de lo esperado), −7,5 % el 9-feb-2026 con el pánico por la IA en los corredores (−9 % de media en el sector ese día), y el goteo del ciclo blando de tarifas [1]. El mínimo de 52 semanas (156,60) fue el 3-jun-2026; desde entonces rebota un 13 %. A diez años, la acción (+10,4 % anual) va en línea con el sector y por debajo del índice. Beta mensual de 5 años de 0,56 (0,75 ajustada semanal); volatilidad anual del 26,5 % y caída máxima del −34,4 % entre abril de 2025 y junio de 2026 [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2019', precio_cierre: 111.41, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2020', precio_cierre: 117.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2021', precio_cierre: 173.82, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 165.48, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 189.47, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 212.41, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 185.52, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Los cinco corredores cotizados de EE. UU. y Europa con negocio comparable: Aon y WTW (globales con consultoría de recursos humanos, los más parecidos), Gallagher y Brown & Brown (corredores de mediana empresa y compradores en serie) y Ryan Specialty (mayorista). Fuera: Baldwin (pérdidas), Hub y Acrisure (privadas) y las consultoras puras. Todas las cifras de MarketScreener (estimaciones en base publicada) y precios de Yahoo del 14-oct-2026; el EBITDA de MarketScreener es ajustado (sin partidas destacadas), así que sus EV/EBITDA son algo más bajos que el de Marsh con cifras publicadas [5-10].',
    empresas,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-12', objetivo: 'AssuredPartners', comprador: 'Arthur J. Gallagher', ev: 13450, ev_ventas: 4.6, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: 'EBITDAC pro forma; 11,3 veces neto del crédito fiscal y sinergias [11, 17].' },
      { fecha: '2024-11', objetivo: 'McGriff Insurance Services', comprador: 'Marsh McLennan', ev: 7750, ev_ventas: null, ev_ebitda: 21.0, prima_pct: null, excluir: false, comentario: 'Múltiplo de EBITDAC según una nota de Wells Fargo citada por la prensa [11].' },
      { fecha: '2023-12', objetivo: 'NFP', comprador: 'Aon', ev: 13400, ev_ventas: null, ev_ebitda: 22.0, prima_pct: null, excluir: false, comentario: 'Múltiplo de EBITDAC según la misma nota; incluye deuda asumida [11].' },
      { fecha: '2025-06', objetivo: 'Accession (Risk Strategies)', comprador: 'Brown & Brown', ev: 9825, ev_ventas: 5.8, ev_ebitda: 15.6, prima_pct: null, excluir: false, comentario: 'Unos 630 M de EBITDA ajustado de 2024 y 1.700 M de ingresos pro forma [12].' },
    ],
    comentario: 'Las grandes corredurías privadas se han pagado a 14-22 veces el EBITDAC en 2023-2025, muy por encima de las compras pequeñas (10-11 veces según los analistas) [11]. Es valor de control: el capital privado y los cuatro grandes compiten por las mismas plataformas. Marsh, con 84.500 M de capitalización, no es objetivo plausible de una operación; las transacciones sirven de techo para lo que vale la correduría, no de catalizador.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) bolsa.mjs (no la da); 2) FINRA (no consultado por presupuesto); 3) Yahoo (sin dato en la ficha)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (solo gráfico); 2) Stock Analysis («Hold» sin desglose); 3) Yahoo («hold», sin desglose)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Feed de Seeking Alpha de MRSH (artículos y noticias, jul-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/MRSH.xml' },
  { id: 2, titulo: 'Marsh & McLennan: A Deep-Value Insurance Broker', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-09-26', url: 'https://seekingalpha.com/article/4948778-marsh-a-deep-value-insurance-broker' },
  { id: 3, titulo: 'Marsh & McLennan: Maintaining My Buy Recommendation Following Q2 Earnings', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-07-22', url: 'https://seekingalpha.com/article/4924289-marsh-and-mclennan-maintaining-my-buy-recommendation-following-q2-earnings' },
  { id: 4, titulo: 'Marsh & McLennan shares look cheap as AI fears drive a 28% sell-off', editor: 'Complete AI Training (blog)', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://completeaitraining.com/news/marsh-mclennan-shares-look-cheap-as-ai-fears-drive-a-28/' },
  { id: 5, titulo: 'Marsh stock price (MRSH) dips as bond sale filing lands and AI fears linger', editor: 'TS2 Tech (blog)', tipo: 'Foros y redes', fecha: '2026-07-16', url: 'https://ts2.tech/en/marsh-stock-price-mrsh-dips-as-bond-sale-filing-lands-and-ai-fears-linger/' },
  { id: 6, titulo: 'Marsh McLennan: Why AI Can’t Threaten This Insurance Giant', editor: 'Capwolf (blog)', tipo: 'Foros y redes', fecha: '2026', url: 'https://capwolf.com/marsh-mclennan-why-ai-cant-threaten-this-insurance-giant/' },
  { id: 7, titulo: 'Stream de Stocktwits de MRSH (API pública)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/MRSH.json' },
];
const Ee = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores externos)', fecha: '2026-09', n_comentarios: 6, tono: 'Positivo', resumen: 'Los artículos de los últimos tres meses son alcistas: «valor profundo», «mantengo la compra tras el 2T» y 16 años de dividendo creciente; argumentan que la caída es de múltiplo y no de beneficio [1, 2, 3].' },
      { plataforma: 'Seeking Alpha (noticias y titulares)', fecha: '2026-10', n_comentarios: 14, tono: 'Neutro', resumen: 'Titulares de batidas pequeñas del BPA ajustado, subida del dividendo y compras pequeñas; ningún tema nuevo de riesgo salvo los seguros de centros de datos [1].' },
      { plataforma: 'Blogs de inversión (IA y valoración)', fecha: '2026-07', n_comentarios: 3, tono: 'Dividido', resumen: 'Ven barata la acción tras una caída de ≈28 % desde máximos por miedo a la IA y tarifas blandas, pero recogen el argumento bajista de que la desintermediación podría bajar comisiones si la IA llega a seguros comerciales [4, 5, 6].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'La API pública no devolvió mensajes: sin debate apreciable [7].' },
    ],
    temas: [
      { tema: 'La IA se come la intermediación', postura: 'Dividida', peso: 'Alto', contraste: 'El susto de febrero vino de seguros personales (comparadores con ChatGPT); Marsh vive de grandes cuentas, reaseguro y consultoría, donde la sustitución es lenta; el crecimiento subyacente del 2T26 (5 %) no muestra pérdida de clientes [4, 6].' },
      { tema: 'Valoración en mínimos de una década', postura: 'Alcista', peso: 'Alto', contraste: 'Es cierto: PER adelantado de ≈17,6 veces frente a una mediana de 23 en cinco años; pero la historia se hizo con tarifas al alza y tipos que inflaban los intereses fiduciarios [2, 4].' },
      { tema: 'Ciclo blando de tarifas', postura: 'Bajista', peso: 'Medio', contraste: 'Respaldado por el índice de la propia Marsh (−6 % en el 2T26, daños −12 %) y por Guy Carpenter (−2 %) [1].' },
      { tema: 'Dividendo y recompras', postura: 'Alcista', peso: 'Medio', contraste: 'Dividendo +10 % en julio y 1.512 M recomprados en el semestre, en parte con pagarés [1, 3].' },
    ],
    lectura: 'El inversor particular que escribe sobre Marsh es mayoritariamente alcista por valoración y dividendo, mientras los analistas recortan objetivos (ocho recortes en dos semanas) y se quedan en «mantener». No hay euforia ni capitulación: el debate es si la caída de múltiplo por la IA y el ciclo blando es temporal. El riesgo de la IA está en el informe (sección de riesgos) y ninguna cifra sale de estas fuentes. Aporta poco a la decisión salvo confirmar que el mercado ya descuenta el miedo a la IA.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit y comentarios de lectores', tipo: 'Complemento', intentos: '1) Reddit (403, según lecciones); 2) búsqueda web de hilos de Reddit (sin resultados); 3) Stocktwits API (vacía)', decision: 'Omitido' }],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Ee);
console.log('Notas A-E escritas. Comparables:', JSON.stringify(empresas.map((e) => [e.ticker, e.per_ntm, e.ev_ebitda_ntm, e.crecimiento_pct, e.roic_pct])));
