// Escribe las notas A-E de Diagnostyka (DIA, GPW; corte 2026-10-15) a partir de los documentos de notas/docs
// (cuentas consolidadas 2024 y 2025, informe semestral 1S26, informes de gestión y presentaciones de resultados)
// y de datos de mercado (Yahoo Finance, BCE, Damodaran). Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/diagnostyka-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const U = 'https://grupadiagnostyka.pl/app/uploads';
const ACC = 33.7565; // millones de acciones (33.756.500), sin autocartera

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Skonsolidowane sprawozdanie finansowe Grupy Diagnostyka za 2025 r. (cuentas consolidadas auditadas, NIIF-UE)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-04-20', url: `${U}/2026/04/SSF_Diagnostyka_2025_ESEF_FV_2_27032026.pdf` },
  { id: 2, titulo: 'Skonsolidowane sprawozdanie finansowe Grupy Diagnostyka za 2024 r.', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2025-04-24', url: `${U}/2025/04/SSF_Diagnostyka_2024_ESEF_FV_2.pdf` },
  { id: 3, titulo: 'Półroczne skrócone skonsolidowane sprawozdanie finansowe za 1S26 (revisado por EY)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-10', url: `${U}/2026/09/SSF-JSF-DIAGNOSTYKA-HY26-sig-sig-sig-sig-sig-sig.pdf` },
  { id: 4, titulo: 'Wyniki finansowe Grupy Diagnostyka za Q2 2026 r. (presentación de resultados, 11-sep-2026)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-11', url: `${U}/2026/09/Prezentacja-wynikowa_Q2-2026-Diagnostyka.pdf` },
  { id: 5, titulo: 'Prezentacja wynikowa Q4 2025 (resultados 2025 y guía 2026)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-04-21', url: `${U}/2026/04/Prezentacja-wynikowa_Diagnostyka_Q4-2025.pdf` },
  { id: 6, titulo: 'Wyniki finansowe 2024 (presentación; serie 2021-2024 con y sin COVID)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2025-04-24', url: `${U}/2025/04/Diagnostyka_wyniki_finansowe_prezentacja_24_04_PL.pdf` },
  { id: 7, titulo: 'Results presentation Q1 2026', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-05-28', url: `${U}/2026/05/Diagnostyka-Results-Presentation-Q1-2026.pdf` },
  { id: 8, titulo: 'Financial results presentation for Q3 2025', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2025-11-27', url: `${U}/2025/11/Financial-results-presentation-for-Q3-2025-1.pdf` },
  { id: 9, titulo: 'Sprawozdanie Zarządu z działalności Diagnostyka S.A. oraz Grupy Diagnostyka za 2025 rok (informe de gestión)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-04-20', url: `${U}/2026/05/Sprawozdanie-Zarzadu-Grupy-Diagnostyka-za-rok-2025.pdf` },
  { id: 10, titulo: 'Sprawozdanie Zarządu Grupy Diagnostyka za I półrocze 2026 (informe de gestión semestral)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-10', url: `${U}/2026/09/Sprawozdanie-Zarzadu-Grupy-Diagnostyka-H1-2026-sig-sig-sig-sig-sig.pdf` },
];
const c = (periodo, o) => ({ periodo, ingresos: null, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: null, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: null, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: null, dpa_extraordinario: 0, acciones_diluidas: ACC, ...o });
const A = {
  _estado: 'Completo con las cuentas consolidadas 2023-2025 (auditadas), 1S26 (revisado) y presentaciones; 2021-2022 solo con las cifras de la presentación de 2024 y la tabla de dividendos (no hay cuentas consolidadas públicas anteriores a la OPV).',
  negocio: {
    descripcion: 'Diagnostyka es la mayor red de laboratorios de análisis clínicos de Polonia: 155 laboratorios, unas 1.300 tomas de muestra propias, más de 4.300 pruebas en catálogo y 174,4 millones de pruebas vendidas en 2025 [9, 10]. Hace análisis de rutina (bioquímica, hematología), especializados, genética, histopatología y, desde 2024-2025, diagnóstico por imagen (resonancia y TAC, 25 centros) [9]. Atiende a dos tipos de cliente: pacientes que pagan de su bolsillo en sus puntos de extracción o en su tienda en línea (B2C, 37,3 % de los ingresos de 2025) y clientes institucionales (B2B, 62,4 %): consultas de atención primaria, clínicas y hospitales públicos y privados que le encargan las pruebas, tanto con contratos del NFZ (el fondo público de salud) como en régimen privado [9]. La red funciona en estrella: laboratorios centrales en Cracovia y Varsovia, regionales y satélites, unidos por una red propia de mensajería [9]. Todo el negocio está en Polonia [1].',
    como_gana_dinero: 'Cobra por prueba. En 2025 el precio medio en análisis clínicos (MLT) fue de 13,1 PLN y en imagen de 209,1 PLN [5]. Casi todo el ingreso es recurrente en el sentido de que la demanda se repite (crónicos, chequeos, embarazo), pero no hay contratos plurianuales con volumen garantizado: el B2B se negocia con cada cliente y el B2C se paga en ventanilla [9]. El margen depende de llenar los laboratorios centrales (coste fijo de equipos y personal) y del precio: el personal es el 38 % de los ingresos y los reactivos y la energía el 21 % [4]. La empresa sube precios cada año por encima de la inflación (+9,5 % en MLT en 2025, +10,0 % en el 1S26) [5, 4], porque la mayor parte de sus precios no están fijados por el NFZ sino negociados con sus clientes o fijados en su tarifa al público [9]. El cuarto trimestre es el más flojo (margen EBITDA recurrente del 19,4 % en el 4T25 frente al 24,3 % del año) [5].',
    segmentos: [
      { nombre: 'Clientes institucionales (B2B)', descripcion: 'Consultas, clínicas y hospitales públicos y privados que encargan pruebas (NFZ y privado)', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 1174.6, resultado: null }, { periodo: '2025', ingresos: 1504.4, resultado: null }] },
      { nombre: 'Clientes particulares (B2C)', descripcion: 'Pacientes que pagan en punto de extracción, centro de imagen o en línea', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 766.6, resultado: null }, { periodo: '2025', ingresos: 900.1, resultado: null }] },
      { nombre: 'Venta de mercancías (reactivos)', descripcion: 'Venta de reactivos a un solo comprador', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 9.0, resultado: null }, { periodo: '2025', ingresos: 6.0, resultado: null }] },
    ],
    geografias: [{ nombre: 'Polonia', peso_pct: 100 }],
    geografias_criterio: 'destino',
    clientes: 'La cartera está muy repartida: los dos mayores clientes sumaron unos 228 M PLN en 2025, el 9,4 % de las ventas (178 M y 9 % en 2024) [1]; el contrato con Penta Hospitals, el mayor grupo hospitalario privado del país, se renovó y amplió por concurso en julio de 2026 [10]. Los particulares (37 % de los ingresos) diversifican el riesgo de precio frente a los grandes clientes institucionales [9]. El poder de precios está demostrado con datos: el precio medio por prueba subió un 7,3 % en 2024 con una inflación del 3,7 %, un 9,5 % en MLT en 2025 y un 10,0 % en el 1S26, mientras el volumen seguía creciendo (+14,8 %, +7,8 % y +2,6 %) [6, 5, 4]. La exposición directa al NFZ es pequeña en laboratorio (programas de cribado como el de cáncer de cuello de útero) y mayor en imagen, donde los centros comprados tienen contratos con las delegaciones regionales del NFZ [9]. Hasta abril de 2025 el programa público «Profilaktyka 40 PLUS» generó un volumen alto de pruebas que dejó una base de comparación exigente en el 1T26 [10].',
    kpis: [
      { kpi: 'Pruebas vendidas (millones)', valor_anterior: '161,3 (2024)', valor_actual: '174,4 (2025)', variacion: '+8,1 %', comentario: 'MLT +7,8 %; 1S26: 91,3 M (+2,6 %) [5, 4]' },
      { kpi: 'Precio medio por prueba MLT (PLN)', valor_anterior: '12,0 (2024)', valor_actual: '13,1 (2025)', variacion: '+9,5 %', comentario: '1S26: 14,0 (+10,0 %) [5, 4]' },
      { kpi: 'Precio medio por prueba de imagen (PLN)', valor_anterior: '127,8 (2024)', valor_actual: '209,1 (2025)', variacion: '+63,7 %', comentario: 'Menos teleradiología barata; 1S26: 219,7 [5, 4]' },
      { kpi: 'Peso de imagen (DI) en ingresos', valor_anterior: '1,5 % (4T24)', valor_actual: '6,0 % (2T26)', variacion: '+4,5 pp', comentario: 'Compras de centros con contrato NFZ [4]' },
      { kpi: 'Laboratorios / puntos de extracción', valor_anterior: '155 / ~1.200 (2025)', valor_actual: '~1.300 puntos (1S26)', variacion: '+~100 puntos', comentario: '[9, 10]' },
      { kpi: 'Empleo (equivalentes a tiempo completo)', valor_anterior: '6.967 (2024)', valor_actual: '7.635 (2025)', variacion: '+9,6 %', comentario: 'Contratos laborales y civiles [9]' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta: [
      c('2022', { ingresos: 1436, ebitda: 373.1, beneficio_neto: 167.4, bpa: 4.96, dpa: 3.32 }),
      c('2023', { ingresos: 1588.0, coste_ventas: 361.2, ebitda: 381.5, amortizaciones: 147.2, ebit: 234.3, resultado_financiero: -60.6, bai: 173.6, impuestos: 43.6, minoritarios: 6.6, beneficio_neto: 123.4, gastos_financieros: 58.3, bpa: 3.66, dpa: 3.13 }),
      c('2024', { ingresos: 1950.1, coste_ventas: 420.0, ebitda: 499.5, amortizaciones: 161.5, ebit: 338.0, resultado_financiero: -46.8, bai: 291.2, impuestos: 59.2, minoritarios: 8.6, beneficio_neto: 223.3, gastos_financieros: 57.4, bpa: 6.62, dpa: 3.31 }),
      c('2025', { ingresos: 2410.5, coste_ventas: 505.0, ebitda: 584.5, amortizaciones: 201.8, ebit: 382.7, resultado_financiero: -65.8, bai: 316.9, impuestos: 55.0, minoritarios: 10.3, beneficio_neto: 251.6, gastos_financieros: 68.9, bpa: 7.45, dpa: 4.40 }),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2584.5, ebitda: 606.3, ebit: 385.8, beneficio_neto: 254.8, bpa: 7.55, dpa: 4.40, dpa_extraordinario: 0, fcf: 113, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos por contratos con clientes pasaron de 1.588 M PLN en 2023 a 2.410 M en 2025 (+23,2 % anual) y a 2.585 M en los doce meses a junio de 2026 [1, 2, 3]. El crecimiento es sobre todo orgánico: +20,9 % en 2023, +20,7 % en 2024 y +17,9 % en 2025, con volumen y precio a partes casi iguales hasta 2024 y más precio desde 2025 [6, 5]; en el 1T26 el orgánico fue de en torno al 11 % [7]. Las compras (laboratorios regionales y centros de imagen) añadieron 2-4 puntos al año [5]. 2021 y 2022 no son comparables: en 2021 las pruebas de COVID dieron 716 M PLN de ingresos y un EBITDA recurrente de 808 M (43,8 % de margen) [6]. El margen EBITDA publicado fue del 24,0 % en 2023, 25,6 % en 2024 y 24,2 % en 2025; sin las revalorizaciones de participadas y el deterioro de 2025, el recurrente bajó del 25,5 % al 24,6 % por la imagen (menos margen), los servicios de TI y la subida de reactivos [5]. En el 2T26 cayó al 22,6 % por el arranque de SAP y el ajuste de inventarios [4]. La cuenta se presenta por naturaleza; en coste de ventas ponemos materiales, energía y mercancías vendidas.',
    ajustes: 'Usamos las cifras publicadas. La empresa da un «EBITDA recurrente» que excluye los costes de la OPV y el plan de acciones ligado a ella: 9,1 M PLN en 2024 y 1,9 M en 2025, nada en el 1S26 [6, 5, 4]. Dentro del EBITDA publicado hay partidas que no se repiten y que no hemos quitado por ser pequeñas: revalorización de participaciones al tomar el control de centros de imagen (+11,5 M en el 4T24, +4,3 M en el 1S26) y un deterioro de 6,4 M en el 4T25 [5, 4]. En 2024 el resultado financiero lleva una valoración positiva de las coberturas de tipos (IRS) y en 2023 un deterioro de una asociada de 4,9 M [2]. El tipo efectivo de 2025 (17,4 %) es bajo frente al 19 % legal y al 20,3 % de 2024 [1].',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 483.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 125.2, margen_ebitda_pct: 25.9, bpa: 1.52, vs_consenso: null },
      { periodo: '4T24', ingresos: 505.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 125.3, margen_ebitda_pct: 24.8, bpa: 1.59, vs_consenso: null },
      { periodo: '1T25', ingresos: 591.6, crecimiento_pct: 23.1, crecimiento_organico_pct: null, ebitda: 161.2, margen_ebitda_pct: 27.2, bpa: 2.16, vs_consenso: null },
      { periodo: '2T25', ingresos: 588.3, crecimiento_pct: 22.4, crecimiento_organico_pct: null, ebitda: 152.9, margen_ebitda_pct: 26.0, bpa: 1.89, vs_consenso: 'En línea' },
      { periodo: '3T25', ingresos: 612.3, crecimiento_pct: 26.6, crecimiento_organico_pct: 19.9, ebitda: 152.2, margen_ebitda_pct: 24.9, bpa: 2.31, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 618.3, crecimiento_pct: 22.4, crecimiento_organico_pct: null, ebitda: 120.1, margen_ebitda_pct: 19.4, bpa: 1.09, vs_consenso: null },
      { periodo: '1T26', ingresos: 670.9, crecimiento_pct: 13.4, crecimiento_organico_pct: 11.0, ebitda: 179.6, margen_ebitda_pct: 26.8, bpa: 2.45, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 683.0, crecimiento_pct: 16.1, crecimiento_organico_pct: null, ebitda: 154.4, margen_ebitda_pct: 22.6, bpa: 1.70, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En el 1T26 (28-may) la dirección explicó el frenazo del volumen (+1,2 %) por la base alta del programa público 40 PLUS en 2025 y el mal tiempo, y defendió que el precio medio seguía subiendo un 10 % en laboratorio; el beneficio batió al consenso [7]. En el 2T26 (11-sep) el volumen volvió a acelerar (+4,1 %) y los ingresos crecieron un 16,1 %, pero el EBITDA recurrente solo subió un 1,0 % y el margen cayó al 22,6 % [4]. La dirección lo atribuyó a la puesta en marcha de SAP (inventario y ajuste de consumos de materiales «de una vez»), a servicios de TI y a más peso de la imagen; el beneficio atribuido cayó un 10,1 % y quedó por debajo del consenso de PAP (57,4 M frente a 63,6 M) [4]. Mantuvo la guía de 2026: ventas con crecimiento «low/mid teens», precio «high single digit», volumen «low/mid single digit» y margen EBITDA recurrente «cercano a 2025» [4]. Cambió el discurso de compras: más selectivas en imagen tras los cambios del NFZ, que en el 2T26 sacó de los límites las resonancias y TAC de control oncológico [4]. Nombró un director financiero nuevo, Jakub Tatak, ex-CFO de LUX MED, desde el 1-sep [10]. No cuantificó cuánto del gasto del 2T26 es de una sola vez ni cuándo volverá el margen del 24-25 %.',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2023', activo_total: 1398.1, activo_corriente: 323.2, pasivo_corriente: 313.1, pasivo_total: 1062.3, fondo_comercio: 303.9, intangibles: 57.1, inmovilizado_material: 322.2, existencias: 38.7, clientes: 158.4, proveedores: 78.3, activos_contrato: null, pasivos_contrato: null, caja: 94.9, deuda_financiera: 535.1, arrendamientos: 315.4, patrimonio_neto: 325.1, minoritarios: 10.8, reservas: 211.0 },
      { periodo: '2024', activo_total: 1718.0, activo_corriente: 327.0, pasivo_corriente: 396.0, pasivo_total: 1284.5, fondo_comercio: 414.8, intangibles: 122.5, inmovilizado_material: 422.4, existencias: 45.4, clientes: 222.8, proveedores: 100.8, activos_contrato: null, pasivos_contrato: null, caja: 40.5, deuda_financiera: 594.3, arrendamientos: 375.1, patrimonio_neto: 418.6, minoritarios: 14.9, reservas: 309.8 },
      { periodo: '2025', activo_total: 2069.5, activo_corriente: 368.7, pasivo_corriente: 506.8, pasivo_total: 1522.3, fondo_comercio: 478.1, intangibles: 174.6, inmovilizado_material: 514.1, existencias: 68.7, clientes: 258.3, proveedores: 135.0, activos_contrato: null, pasivos_contrato: null, caja: 18.4, deuda_financiera: 633.8, arrendamientos: 446.8, patrimonio_neto: 528.4, minoritarios: 18.8, reservas: 349.8 },
    ],
    vencimientos: [{ anio: '2026', importe: 6 }, { anio: '2027', importe: 543 }, { anio: '2028+', importe: 85 }],
    liquidez: 'Caja de 17,6 M PLN a 30-jun-2026 y financiación disponible de 222,3 M (líneas de crédito no dispuestas) [4]. El grueso de la deuda bancaria es un crédito sindicado a plazo de 540 M y dos líneas renovables de 125 M cada una, a WIBOR 1M más margen, con vencimiento en septiembre de 2027 [1].',
    rating: 'Sin rating',
    coste_deuda_pct: 6.6,
    vida_media_anios: 1.5,
    otros_pasivos: 'El crédito sindicado tiene covenants (deuda neta/EBITDA, entre otros) que la empresa cumple; EY calcula los ratios para los bancos [1, 9]. Los arrendamientos (NIIF 16) suman 478,8 M PLN a junio de 2026 (laboratorios, puntos de extracción, equipos de laboratorio en cesión, y desde 2026 la licencia de SAP) [3, 4]. «Otros pasivos financieros» suman 103,7 M a junio de 2026: sobre todo opciones de venta de los minoritarios de las filiales compradas (44,4 M reconocidos en 2025) y pagos aplazados de compras; los tratamos como deuda en el puente [3, 1]. Pensiones casi nulas (3,8 M a largo plazo). Las coberturas de tipos (IRS) vencieron o se liquidaron: 0 a junio de 2026 [3].',
    comentario: 'La deuda neta con arrendamientos subió de 1.062 M PLN a final de 2025 a 1.204 M en junio de 2026 (2,0 veces el EBITDA de doce meses), por más deuda bancaria (+115,6 M en un año) para pagar el dividendo de 148,5 M y las compras, y por los arrendamientos nuevos de SAP y equipos [4]. El circulante comercial subió a 243,5 M (+41 % en un año) porque los cobros se alargaron de 63 a 70 días [4]. La guía de deuda neta/EBITDA es de 1,7-2,0 veces [4]: el balance aguanta, pero el margen para compras grandes es pequeño y el crédito principal vence en septiembre de 2027.',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2023', flujo_operativo: 336.0, capex: 81.3, pagos_arrendamientos: 100.5, adquisiciones: 93.4, desinversiones: 2.8, dividendos: 112.1, recompras: 0, emision_acciones: 2.2, intereses_en_financiacion: 55.7 },
      { periodo: '2024', flujo_operativo: 415.4, capex: 132.7, pagos_arrendamientos: 116.4, adquisiciones: 102.2, desinversiones: 3.3, dividendos: 105.7, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 55.8 },
      { periodo: '2025', flujo_operativo: 551.8, capex: 204.8, pagos_arrendamientos: 129.1, adquisiciones: 82.3, desinversiones: 12.0, dividendos: 111.7, recompras: 0, emision_acciones: 6.1, intereses_en_financiacion: 67.4 },
    ],
    comentario: 'El flujo operativo es alto (551,8 M PLN en 2025, el 94 % del EBITDA) porque el circulante apenas consume y los impuestos pagados fueron bajos (40,8 M) [1]. Pero el flujo libre para el accionista es mucho menor: tras el capex (204,8 M), el principal de los arrendamientos (129,1 M) y los intereses pagados (67,4 M, clasificados en financiación) quedaron unos 150 M en 2025, y en los doce meses a junio de 2026 unos 113 M, menos que el dividendo de 148,5 M [1, 3]. El capex sin compras fue del 8,5 % de las ventas en 2025 por la construcción de laboratorios centrales en Łódź, Bydgoszcz, Gdynia y Gliwice y por la inversión en TI; la guía de 2026 es de 170-220 M (6-8 %) más 50-100 M de compras [5, 4]. La empresa no separa mantenimiento y crecimiento; estimación propia: el mantenimiento se parece a la depreciación del inmovilizado propio (unos 80 M, 3,3 % de las ventas), y el resto es crecimiento.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young Audyt Polska sp. z o.o. sp.k.',
    anios_auditor: 3,
    opinion: 'Favorable',
    comentario: 'EY audita las cuentas consolidadas 2025 sin salvedades y revisó el semestral de 2026 [1, 3]. Lo que hay que vigilar: (1) los «otros ingresos operativos» incluyen revalorizaciones de participaciones al tomar el control de centros de imagen (11,5 M en el 4T24, 4,3 M en el 1S26), que inflan el EBITDA de esos trimestres [5, 4]; (2) el ajuste de inventarios por el cambio a SAP en el 2T26 sugiere que los consumos de materiales estaban mal medidos antes del cambio [4]; (3) los cobros se alargaron 7 días en un año (69,5 días en el 2T26) [4]; (4) el plan de acciones ligado a la OPV lo pagó el vendedor (LX Beta, de Mid Europa) pero pasó por la cuenta como gasto [9]; (5) las opciones de venta de minoritarios se cargan contra patrimonio y no contra resultados [1]. El motor da un Altman Z y un Piotroski F razonables para una empresa con deuda moderada; el Beneish M sale de solo tres años comparables y hay que leerlo con cuidado.',
    senales: [
      { senal: 'Cobros más lentos', nivel: 'Media', comentario: 'DSO de 62,7 a 69,5 días en un año; clientes +34 % en el semestre con ventas +15 % [4, 3]' },
      { senal: 'Ajuste de inventario con el cambio a SAP', nivel: 'Media', comentario: 'Consumos de materiales +26,5 % en el 2T26; la empresa lo llama ajuste de una vez sin cuantificarlo [4]' },
      { senal: 'Revalorizaciones de participadas en el EBITDA', nivel: 'Baja', comentario: '+11,5 M (4T24) y +4,3 M (1S26) por tomar el control de centros de imagen [5, 4]' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'La dirección quiere repartir el 50 % del beneficio atribuido, con más en años muy buenos: 3,31 PLN por acción con el beneficio de 2024 (50 %) y 4,40 PLN con el de 2025 (59 %, 148,5 M pagados en junio de 2026) [10]. No hay recompras. Las prioridades de caja son la red de laboratorios y puntos, la TI (SAP, nuevo sistema de laboratorio xLAB) y compras selectivas de laboratorios regionales y centros de imagen, con una deuda neta/EBITDA de 1,7-2,0 veces [4, 10].',
    adquisiciones: [
      { anio: '2023', objetivo: 'Laboratorios regionales y participaciones en centros de imagen (varias)', importe: 93.4, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Deterioro de 4,9 M en una asociada en 2023 [2]' },
      { anio: '2024', objetivo: 'Livmed, Wyrobek y otros centros de imagen (control)', importe: 102.2, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Imagen pasa del 1,5 % al 6 % de los ingresos; margen menor que laboratorio [5, 4]' },
      { anio: '2025', objetivo: '10 compras (laboratorio, genética de tumores en Toruń, imagen)', importe: 82.3, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Deterioro no monetario de 6,4 M en el 4T25 [5]' },
      { anio: '2026', objetivo: '8 compras en laboratorio y 3 en imagen (1S26); Aidport (63,7 %) en agosto', importe: 41.1, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Pronto para juzgar [4, 10]' },
    ],
    comentario: 'La asignación de capital ha sido disciplinada en tamaño: las compras sumaron unos 280 M PLN en 2023-2025, el 5 % de las ventas acumuladas, y el fondo de comercio subió de 304 M a 478 M [1, 2]. El crecimiento sale de la red propia, que se financia con el flujo operativo. Lo discutible es la imagen: rinde menos margen que el laboratorio, depende de contratos del NFZ y ya obligó a un deterioro en 2025 [5]. El reparto del 59 % del beneficio en 2025 se pagó en parte con deuda: el flujo libre tras arrendamientos e intereses no lo cubrió [3]. Con el crédito principal venciendo en 2027, conviene que el dividendo vuelva al 50 %.',
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'cuenta, balance y flujos completos de 2021-2022', tipo: 'Complemento', intentos: '1) Repositorio ESEF de filings.xbrl.org (la entidad no está; LEI 259400TB69IYA2WJEU71); 2) web de inversores (la OPV es de 2025: solo hay cuentas consolidadas públicas desde 2024, con 2023 comparativo; el folleto está tras un aviso legal que no se puede abrir sin navegador); 3) presentación de 2024 y tabla de dividendos del informe semestral (ingresos, EBITDA recurrente, beneficio y dividendo)', decision: 'Calculado y marcado como estimación' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Sprawozdanie Zarządu Grupy Diagnostyka za 2025 (capítulo de mercado: datos de Bain & Company y NFZ/Pekao)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-04-20', url: `${U}/2026/05/Sprawozdanie-Zarzadu-Grupy-Diagnostyka-za-rok-2025.pdf` },
  { id: 2, titulo: 'Medicover AB, Sonic Healthcare, Quest Diagnostics, Labcorp, Eurofins, Australian Clinical Labs: datos financieros y estimaciones (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/MCOV-B.ST/' },
  { id: 3, titulo: 'Wyniki finansowe Grupy Diagnostyka za Q2 2026 r.', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-11', url: `${U}/2026/09/Prezentacja-wynikowa_Q2-2026-Diagnostyka.pdf` },
  { id: 4, titulo: 'Wyniki finansowe 2024 (presentación; ingresos COVID 2021-2022)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2025-04-24', url: `${U}/2025/04/Diagnostyka_wyniki_finansowe_prezentacja_24_04_PL.pdf` },
  { id: 5, titulo: 'Sprawozdanie Zarządu Grupy Diagnostyka za I półrocze 2026', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-10', url: `${U}/2026/09/Sprawozdanie-Zarzadu-Grupy-Diagnostyka-H1-2026-sig-sig-sig-sig-sig.pdf` },
];
const B = {
  _estado: 'Completo con el informe de gestión 2025 (datos de Bain y del NFZ que cita) y datos de mercado de las cotizadas; las privadas polacas (ALAB, Synevo dentro de Medicover, LUX MED) sin cifras propias de laboratorio.',
  historia: {
    resumen: 'Diagnostyka nació en 1998 como sociedad civil en Cracovia y abrió su primer laboratorio ese año [1]. Creció comprando laboratorios locales (Medica, ODM Kielce, Top-Lab) y en 2011 entró el fondo Mid Europa Partners y se fusionó con la red de Marcin Fryda, lo que la llevó a todas las regiones en 2012 [1]. En 2014 abrió en Cracovia su laboratorio central, el mayor del país, y desde 2013-2019 añadió histopatología y genética [1]. En la pandemia fue el gran laboratorio de pruebas COVID: 716 M PLN de ingresos COVID en 2021 [4]. En 2024-2025 entró en imagen médica comprando centros con contrato del NFZ, y en febrero de 2025 salió a bolsa en Varsovia a 105 PLN por acción con la venta de toda la participación de Mid Europa; los fundadores conservan el control con acciones de voto doble [1].',
    hitos: [
      { anio: '1998', hito: 'Fundación en Cracovia y primer laboratorio [1]' },
      { anio: '2011', hito: 'Entrada de Mid Europa Partners y fusión con la red de Marcin Fryda [1]' },
      { anio: '2012', hito: 'Compra de Medis y Alpha Medical: presencia en todas las regiones [1]' },
      { anio: '2014', hito: 'Laboratorio central de Cracovia, el mayor de Polonia [1]' },
      { anio: '2018', hito: 'Compra de Genesis (genética) y Vitalabo [1]' },
      { anio: '2021', hito: 'Pico COVID: 1.843 M PLN de ingresos y 808 M de EBITDA recurrente [4]' },
      { anio: '2024', hito: 'Entrada en diagnóstico por imagen (Livmed, Wyrobek y otros) [4]' },
      { anio: '2025', hito: 'Salida a bolsa en la GPW (febrero) a 105 PLN; venta total de Mid Europa [1]' },
      { anio: '2026', hito: 'Cambio a SAP; nuevo director financiero; contrato ampliado con Penta Hospitals [5]' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el de análisis clínicos hechos por laboratorios privados en Polonia (pruebas encargadas por particulares, clínicas privadas, consultas con contrato del NFZ y hospitales que externalizan), que Bain & Company estima para Diagnostyka en 0,7 mil millones de EUR en 2023 [1]. No incluye los laboratorios propios de los hospitales públicos, que la empresa ve como cuota a ganar por externalización. Usamos la cifra de Bain (la única con serie) y la contrastamos con el tamaño de la empresa: Diagnostyka facturó 1.588 M PLN en 2023 (unos 0,37 mil millones de EUR), la mitad del mercado así definido. La imagen médica (TAC y resonancia), 6 % de los ingresos, es un mercado aparte y no entra en la cuota [3].',
    tamano: '≈ 0,7 mil millones de EUR (≈ 3.000 M PLN) en 2023; ≈ 1,4 mil millones de EUR previstos en 2030 (Bain & Company) [1]',
    unidad_serie: 'miles de millones de EUR',
    serie: [{ anio: '2020', tamano: 0.6 }, { anio: '2022', tamano: 0.7 }, { anio: '2023', tamano: 0.7 }, { anio: '2025e', tamano: 0.9 }, { anio: '2027e', tamano: 1.1 }, { anio: '2030e', tamano: 1.4 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 10,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Gasto por habitante muy bajo frente a Europa occidental', efecto: '+', horizonte: 'Estructural', evidencia: '41 EUR por habitante en Polonia en 2023 frente a 126 en Alemania y 113 en Francia [1]' },
      { driver: 'Envejecimiento y más pruebas por paciente', efecto: '+', horizonte: 'Estructural', evidencia: 'Bain prevé un volumen de pruebas generales +5 % anual en 2023-2030 [1]' },
      { driver: 'Precio: mezcla hacia pruebas especializadas y traslado de los salarios sanitarios', efecto: '+', horizonte: 'Estructural', evidencia: 'Bain: precio medio +4-5 % anual; Diagnostyka subió un 9,5 % en MLT en 2025 [1, 3]' },
      { driver: 'Externalización de los laboratorios hospitalarios públicos', efecto: '+', horizonte: 'Estructural', evidencia: 'Los privados ganan cuota a los públicos según Bain; contrato ampliado con Penta Hospitals en 2026 [1, 5]' },
      { driver: 'Programas públicos de cribado', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El fin de «Profilaktyka 40 PLUS» (abril de 2025) frenó el volumen al +1,2 % en el 1T26 [5]' },
      { driver: 'Salario mínimo sanitario por ley', efecto: '−', horizonte: 'Estructural', evidencia: 'La ley de salarios mínimos en sanidad sube cada julio el coste de personal (38 % de los ingresos) [5, 3]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro redes nacionales (Diagnostyka, ALAB, Synevo-Medicover, LUX MED con laboratorio propio) y cientos de locales; el precio sube un 10 % al año, señal de rivalidad contenida [1, 3]' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'B2B 62 % de las ventas, con grandes redes y hospitales que licitan; los dos mayores clientes son el 9,4 % [1]' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Pocos fabricantes de analizadores y reactivos (Roche, Abbott, Siemens); el personal sanitario es escaso y su salario lo fija la ley [5]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta red de extracción, mensajería y laboratorios centrales automatizados: la escala de 174 M de pruebas al año no se replica rápido [1]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Pruebas en el punto de atención y en casa existen pero no sustituyen a la bioquímica de rutina; la IA ayuda a leer, no a hacer la prueba [1]' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La demanda de análisis clínicos es poco cíclica: en 2009 los laboratorios europeos siguieron creciendo y en 2022-2023, con inflación del 14 % y 12 % en Polonia, Diagnostyka creció un 12 % y un 21 % orgánico subiendo precios [4]. 2020-2022 fue un ciclo propio: COVID infló 2021 y la normalización hundió los ingresos de 1.843 M a 1.436 M en 2022 [4]. Hoy el mercado crece en torno al 10 % anual (Bain) y la empresa algo más; los indicadores son el volumen de pruebas y el precio medio que publica cada trimestre [1, 3].' },
    regulacion: 'El NFZ financia la atención primaria con una cápita que incluye las pruebas: la consulta paga al laboratorio, por eso la mayor parte de los precios de Diagnostyka se negocian y no están fijados por el NFZ [1]. Donde sí hay precio público es en los programas de cribado y en la imagen (contratos con las delegaciones del NFZ): en el 2T26 el NFZ sacó de los límites las resonancias y TAC de control oncológico, y la dirección dice que los cambios regulatorios en imagen le hacen más selectiva en compras [3]. La ley de salarios mínimos sanitarios sube el coste cada 1 de julio [5]. La ley de laboratorios (diagnostas) exige acreditación y supervisión de la Cámara Nacional de Diagnostas.',
    tendencias: 'Tres tendencias: (1) automatización de los laboratorios centrales (línea nueva en Poznań, laboratorios en construcción en Gdynia y Gliwice), que baja el coste por prueba y favorece al grande [1, 5]; (2) canal directo al paciente con pago de su bolsillo (B2C 37 %, aplicación móvil, paquetes de prevención), donde el precio es más alto [1]; (3) IA en lectura de imagen y en la validación de resultados, que Diagnostyka ya usa en imagen; reduce el coste de radiólogos y de validación pero no el de hacer la prueba [5]. Gana con las tres por escala.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 52,
    posicion: '1.º en análisis clínicos privados en Polonia (estimación propia: unos 2.265 M PLN de ingresos de laboratorio en 2025 frente a un mercado de ≈ 1,0 mil millones de EUR según la serie de Bain) [1, 3]',
    competidores: [
      { nombre: 'Synevo (Medicover Diagnostic Services)', pais: 'Polonia / Suecia', ticker: 'MCOV-B.ST', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segunda red de laboratorios del país, dentro del grupo Medicover (margen EBITDA del grupo 11,3 %) [2]' },
      { nombre: 'ALAB laboratoria', pais: 'Polonia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Red nacional privada sin cuentas públicas accesibles' },
      { nombre: 'LUX MED (Bupa)', pais: 'Polonia / Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Grupo sanitario con laboratorio propio para su red de abonados' },
      { nombre: 'Laboratorios de hospitales públicos', pais: 'Polonia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cuota que el sector privado gana por externalización [1]' },
      { nombre: 'Sonic Healthcare (referencia internacional)', pais: 'Australia', ticker: 'SHL.AX', ingresos: 26283, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor laboratorio privado de Europa y Australia; margen EBITDA 12,4 % [2]' },
      { nombre: 'Eurofins (referencia internacional)', pais: 'Luxemburgo', ticker: 'ERF.PA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Clínico y análisis; margen EBITDA 20,8 % [2]' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Más puntos de extracción atraen más pacientes y más clientes B2B, pero no hay efecto de red propiamente dicho' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Integración informática con las consultas que encargan pruebas (eLab/xLab); los hospitales licitan cada pocos años [1]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca más reconocida del sector según la empresa; acreditación ISO/IEC 17025 desde 2010 [1]' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen EBITDA del 24-26 % frente al 11-21 % de los grandes laboratorios cotizados; 174 M de pruebas al año en laboratorios centrales automatizados [2, 1]' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: '1.300 puntos de extracción y mensajería propia; un rival nuevo necesita años de pérdidas para llenar un laboratorio central [5]' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable: (1) el coste de personal sube por ley más rápido que el precio que aceptan los grandes clientes B2B, y el margen va bajando (del 25,5 % al 24,4 % recurrente sin extraordinarios en dos años) [3]; (2) un competidor con dueño de capital riesgo o internacional (Medicover-Synevo, ALAB) compite por precio en los concursos hospitalarios; (3) el NFZ cambia la financiación de la imagen o pasa a pagar directamente las pruebas de atención primaria con tarifa. Probabilidad media de la primera, baja de las otras dos.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material son tres asuntos: (1) personal: 7.635 empleos a tiempo completo y un coste del 38 % de las ventas, con salario mínimo sanitario fijado por ley [5, 3]; (2) calidad y seguridad del paciente y protección de datos médicos (ISO 27001 desde 2016) [1]; (3) energía de los laboratorios y residuos médicos. Publica un informe de sostenibilidad con verificación de EY desde 2024 [1].',
    controversias: 'No hemos encontrado sanciones ni litigios relevantes en los últimos tres años en los informes de gestión 2025 y 1S26; el único pleito citado es antiguo (PAAN Capital frente a Laboratoria RH+, en quiebra, por la compra de 2016) [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'ingresos y márgenes de ALAB, Synevo Polonia y LUX MED', tipo: 'Complemento', intentos: '1) Informe de gestión de Diagnostyka (no da cifras de rivales); 2) Medicover: solo cifras del grupo en Yahoo; 3) prensa polaca (sin cifras de laboratorio)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'CR5 del mercado polaco', tipo: 'Complemento', intentos: '1) Bain en el informe de gestión; 2) informe de gestión 1S26; 3) prensa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Sprawozdanie Zarządu Grupy Diagnostyka za 2025 (gobierno, remuneraciones, accionistas, comité de auditoría)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-04-20', url: `${U}/2026/05/Sprawozdanie-Zarzadu-Grupy-Diagnostyka-za-rok-2025.pdf` },
  { id: 2, titulo: 'Sprawozdanie Zarządu Grupy Diagnostyka za I półrocze 2026 (accionariado, consejo, dividendos)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-10', url: `${U}/2026/09/Sprawozdanie-Zarzadu-Grupy-Diagnostyka-H1-2026-sig-sig-sig-sig-sig.pdf` },
  { id: 3, titulo: 'Prezentacja wynikowa Q4 2025 (guía 2026)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-04-21', url: `${U}/2026/04/Prezentacja-wynikowa_Diagnostyka_Q4-2025.pdf` },
  { id: 4, titulo: 'Wyniki finansowe Grupy Diagnostyka za Q2 2026 r.', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-11', url: `${U}/2026/09/Prezentacja-wynikowa_Q2-2026-Diagnostyka.pdf` },
];
const C = {
  _estado: 'Completo con los informes de gestión; sin votos de la junta sobre remuneraciones (primera junta como cotizada en mayo de 2026, actas no leídas).',
  directivos: {
    equipo: [
      { nombre: 'Jakub Swadźba', cargo: 'Presidente del consejo de administración (CEO)', desde: null, participacion_pct: 9.44, trayectoria: 'Primer ejecutivo y tercer accionista; dirige la estrategia, las compras y la salida a bolsa de 2025. Desde la OPV los ingresos crecieron de 1.950 M PLN (2024) a 2.585 M en los doce meses a junio de 2026 [1, 2]. Elegido directivo del año 2022 [1].' },
      { nombre: 'Jakub Tatak', cargo: 'Vicepresidente y director financiero (CFO)', desde: '2026', participacion_pct: 0, trayectoria: 'Desde el 1-sep-2026. Fue director financiero y miembro del consejo de LUX MED (Bupa) desde 2018, con compras e integración de empresas; antes en First Data Polska y PolCard [2].' },
      { nombre: 'Dariusz Zowczak', cargo: 'Vicepresidente', desde: '2007', participacion_pct: 0.0, trayectoria: 'En la empresa desde 2004 y en el consejo desde 2007; ventas, compras y red de puntos de extracción [1].' },
      { nombre: 'Jaromir Pelczarski', cargo: 'Vicepresidente', desde: null, participacion_pct: 0.01, trayectoria: 'Miembro del consejo de administración; 5.000 acciones [2].' },
      { nombre: 'Artur Olender', cargo: 'Presidente del consejo de supervisión', desde: null, participacion_pct: 0, trayectoria: 'Consejero independiente según la ley de auditores [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ventas +20 % o más; margen EBITDA recurrente mantenido (≈ 26 %)', real: 'Ventas +23,6 %; margen recurrente 24,3 % (24,6 % sin extraordinarios)', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Ventas «low/mid teens»; precio «high single digit»; volumen «low/mid single digit»; margen cercano a 2025; DN/EBITDA 1,7-2,0', real: '1S26: ventas +14,8 %, precio +11,9 %, volumen +2,6 %, margen 24,7 %, DN/EBITDA 2,0', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y con mucho capital propio: el CEO tiene el 9,4 % del capital y el 12,8 % de los votos, y dos fundadores del consejo de supervisión otro 37,8 % del capital [2]. Ha cumplido el crecimiento prometido desde la OPV pero no el margen: en 2025 cayó 1,8 puntos y el 2T26 decepcionó [3, 4]. El cambio de CFO en septiembre de 2026 trae a alguien con experiencia en grupos sanitarios grandes; [2]. No hay plan de sucesión público para el CEO.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Artur Olender', cargo: 'Presidente del consejo de supervisión', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Jacek Prusek', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Grzegorz Głownia', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: 'Auditoría (desde jun-2025)' },
      { nombre: 'Marcin Fryda', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Patrycja Swadźba', cargo: 'Consejera', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Paweł Leżański', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: false, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 6.66, fijo: 3.64, variable_corto: 0.30, variable_largo: 2.72, ratio_salario_medio: null },
    remuneracion: 'El CEO cobró 3,64 M PLN de la sociedad y 0,30 M de filiales en 2025, más 2,72 M de valoración del plan de incentivos ligado a la OPV, que pagó el vendedor (LX Beta, de Mid Europa) y no la empresa [1]. El nuevo plan a largo plazo (LTIP-Z y LTIP-P) da unidades convertibles en acciones; el informe de gestión no detalla métricas de rentabilidad sobre el capital, por eso marcamos que el variable no está ligado al ROIC [1]. La primera votación consultiva del informe de remuneraciones como cotizada fue en la junta de mayo de 2026; no hemos leído el acta.',
    accionistas: [
      { nombre: 'Grzegorz Głownia (directamente y vía ACER Capital Partners)', pct: 18.88, tipo: 'Fundador; acciones A de voto doble (25,65 % de los votos)', variacion: 'Sin cambios; bloqueo de venta hasta el 2-feb-2026' },
      { nombre: 'Jacek Prusek (directamente y vía ACACIA Capital Partners)', pct: 18.88, tipo: 'Fundador; acciones B de voto doble (25,65 % de los votos)', variacion: 'Sin cambios' },
      { nombre: 'Jakub Swadźba (CEO)', pct: 9.44, tipo: 'Directivo; acciones C de voto doble (12,83 % de los votos)', variacion: 'Sin cambios' },
      { nombre: 'Marcin Fryda', pct: 4.21, tipo: 'Consejero', variacion: 'Sin cambios' },
      { nombre: 'Resto (flotante)', pct: 48.59, tipo: 'Institucionales y particulares', variacion: 'Mid Europa (LX Beta) vendió todo en la OPV de febrero de 2025' },
    ],
    insiders: [],
    control_y_defensas: 'Los tres socios históricos (Głownia, Prusek y Swadźba) tienen el 47,2 % del capital y el 64,1 % de los votos porque sus acciones nominativas A, B y C votan doble [2, 1]. No hay un pacto de accionistas público, pero de hecho deciden la junta y el consejo de supervisión: cuatro de los seis consejeros son dominicales (dos fundadores, Marcin Fryda y Patrycja Swadźba) [2]. El bloqueo de venta de la OPV venció el 2-feb-2026 [1]. El comité de auditoría lo preside una independiente (Aniela Hejnowska en 2025) pero integra a un fundador [1]. Para el minoritario: el voto doble protege la estrategia de largo plazo pero impide una OPA hostil y deja la política de dividendos en manos de los fundadores, que cobran el 47 % del dividendo.',
    alertas: ['Rotación en la dirección financiera en 2026: entra Jakub Tatak (ex-LUX MED) el 1-sep-2026 [2]', 'Acciones de voto doble de los fundadores y del CEO: 64 % de los votos con el 47 % del capital [2]'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto de la junta sobre remuneraciones', tipo: 'Complemento', intentos: '1) Informe de gestión 1S26 (no lo recoge); 2) relación de informes corrientes en la web de inversores (acta de la junta de mayo de 2026 no descargada por tiempo); 3) prensa (sin datos)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) Informe semestral: sin cambios en las participaciones de consejeros desde el 1T26; 2) informes corrientes art. 19 MAR en la web (no revisados uno a uno); 3) prensa (sin noticias de ventas tras el fin del bloqueo)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'DIA.WA, WIG20TR (ETFBW20TR.WA), STOXX Europe 600 Health Care (EXV4.DE): históricos diarios y semanales', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/DIA.WA/history/' },
  { id: 2, titulo: 'Diagnostyka (DIA.WA), Quest, Labcorp, Eurofins, Sonic, Australian Clinical Labs, Medicover: estimaciones, recomendaciones y múltiplos (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/DIA.WA/analysis/' },
  { id: 3, titulo: 'Euro foreign exchange reference rates, 14-oct-2026 (PLN 4,3658; USD 1,1195; AUD 1,5971; SEK 11,158)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 4, titulo: 'Long-term interest rate for convergence purposes, Poland, 10 años (IRS.M.PL.L.L40.CI.0000.PLN.N.Z): 6,23 % en sep-2026', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://data.ecb.europa.eu/data/datasets/IRS/IRS.M.PL.L.L40.CI.0000.PLN.N.Z' },
  { id: 5, titulo: 'Country Default Spreads and Risk Premiums (Polonia: A2, prima de riesgo país 1,10 %)', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Kurs Diagnostyki mocno w dół po publikacji wyników (PAP Biznes: consenso del 2T26)', editor: 'xyz.pl / PAP Biznes', tipo: 'Prensa', fecha: '2026-09-11', url: 'https://xyz.pl/?p=248340' },
  { id: 8, titulo: 'Terminy publikacji raportów okresowych Diagnostyka S.A. w 2026 r. (3T26: 26-nov-2026)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-01-26', url: 'https://grupadiagnostyka.pl/raporty-biezace/terminy-publikacji-raportow-okresowych-diagnostyka-s-a-w-2026-r/' },
  { id: 9, titulo: 'Wyniki finansowe Grupy Diagnostyka za Q2 2026 r. (guía 2026, deuda neta)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-11', url: `${U}/2026/09/Prezentacja-wynikowa_Q2-2026-Diagnostyka.pdf` },
  { id: 10, titulo: 'Fleury (FLRY3) conclui aquisição de laboratórios por R$ 130 milhões (5,3x EV/EBITDA LTM)', editor: 'Finance News', tipo: 'Prensa', fecha: '2025-06', url: 'https://financenews.com.br/2025/06/fleury-flry3-conclui-aquisicao-de-laboratorios-por-r-130-milhoes/' },
  { id: 11, titulo: 'Diagnostyka (DIA) akcje – rekomendacje, prognozy, dywidenda 2026 (6 analistas, objetivo medio 211,6 PLN)', editor: 'PPCG', tipo: 'Analistas', fecha: '2026-05-26', url: 'https://ppcg.com.pl/diagnostyka-akcje/' },
  { id: 12, titulo: 'Półroczne skrócone skonsolidowane sprawozdanie finansowe za 1S26 (balance a 30-jun-2026)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2026-09-10', url: `${U}/2026/09/SSF-JSF-DIAGNOSTYKA-HY26-sig-sig-sig-sig-sig-sig.pdf` },
  { id: 13, titulo: 'Skonsolidowane sprawozdanie finansowe 2024 (deuda neta a 31-dic-2024; precio de la OPV en hechos posteriores)', editor: 'Diagnostyka S.A.', tipo: 'Primaria', fecha: '2025-04-24', url: `${U}/2025/04/SSF_Diagnostyka_2024_ESEF_FV_2.pdf` },
];
const D = {
  _estado: 'Completo. Precio: cierre del 14-oct-2026 en Yahoo (la sesión del 15-oct seguía abierta); Yahoo repite 159,00 sin volumen del 5 al 13-oct (dato que falta), el 14-oct sí trae volumen. Consenso de Yahoo (7 analistas) contrastado con PPCG (6 analistas, mayo).',
  identificacion: {
    nombre: 'Diagnostyka S.A.', nombre_corto: 'Diagnostyka', ticker: 'DIA', isin: 'PLDGNST00012', mercado: 'Bolsa de Varsovia (GPW), mercado principal', indice_referencia: 'mWIG40',
    pais: 'Polonia', pais_iso: 'PL', sector: 'Salud', industria: 'Proveedores y servicios sanitarios (laboratorios)', sede: 'Cracovia', fundacion: '1998', empleados: 7635, web: 'https://grupadiagnostyka.pl',
    precio: 159.0, fecha_precio: '2026-10-14', acciones: ACC, capitalizacion_publicada: 5344, free_float_pct: 48.6,
    max_52s: 208.0, min_52s: 146.4, volumen_medio_diario: '≈ 4,5 M PLN/día (3 meses)', proximos_resultados: '2026-11-26',
  },
  consenso: {
    guidance: 'Guía de 2026, publicada con los resultados de 2025 (abril) y confirmada el 11-sep-2026: ingresos con crecimiento «low/mid teens» (en torno al 12-15 %), precio medio por prueba «high single digit», volumen «low/mid single digit», margen EBITDA recurrente «cercano a 2025» (24,3 %), capex sin compras de 170-220 M PLN, compras de 50-100 M y deuda neta/EBITDA de 1,7-2,0 veces [9]. No hay plan a medio plazo con cifras; la empresa habla de seguir creciendo por encima del mercado (Bain: 9-11 % anual hasta 2030) con crecimiento orgánico y compras selectivas.',
    estimaciones: [
      { periodo: '2026e', ingresos: 2744, ebitda: null, ebit: null, bpa: 7.81, dpa: null, fuente: 'Yahoo Finance, 7 analistas [2]' },
      { periodo: '2027e', ingresos: 3065, ebitda: null, ebit: null, bpa: 10.10, dpa: null, fuente: 'Yahoo Finance [2]' },
    ],
    recomendaciones: { n_analistas: 7, comprar: 5, mantener: 2, vender: 0, po_medio: 196.39, po_min: 176.0, po_max: 215.0 },
    revisiones: 'Los objetivos bajaron: en mayo la media de 6 analistas era de 211,6 PLN (rango 188-230) según PPCG, y hoy la de Yahoo es de 196,4 (176-215) con 7 analistas [11, 2]. El 2T26 quedó por debajo del consenso de PAP (beneficio 57,4 M frente a 63,6 M; EBITDA recurrente 154,4 M frente a 155,6 M) [7]. Solo hay una fuente gratuita con BPA de dos años (Yahoo); su BPA de 2027 (10,10) supone un salto del 29 % que exige recuperar un margen del 25-26 %, y no tenemos el desglose de EBITDA del consenso.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -4.7, indice_pct: null, sector_pct: -2.3 },
      { periodo: '1 año', accion_pct: -9.4, indice_pct: null, sector_pct: 2.5 },
    ],
    anual: [],
    beta: 0.85, volatilidad_pct: 29.6, max_drawdown_pct: -31.7, posicion_corta_pct: null,
    comentario: 'La acción salió a bolsa a 105 PLN en febrero de 2025, subió hasta 208 PLN en enero de 2026 y cayó un 31,7 % hasta 146,4 PLN en abril de 2026 [1, 13]. Cotiza a 159 PLN, un 9,4 % menos que hace un año con dividendos, mientras el sector sanitario europeo sube un 2,5 % y el WIG20 con dividendos un 78 % desde la OPV [1]. Lo que explica el peor comportamiento es el margen: el EBITDA recurrente pasó de crecer un 15 % en 2025 a un 1 % en el 2T26, y el mercado castigó cada trimestre flojo (−6,3 % el 21-abr y −4 % el 11-sep) [1, 7]. La beta propia frente al WIG20TR, con solo 87 semanas, es de 0,56; usamos 0,85 (laboratorios cotizados), porque el índice polaco pesa mucho la banca.',
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [{ anio: '2025', precio_cierre: 171.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false }],
    comentario: 'Solo hay un cierre de ejercicio como cotizada (171 PLN el 30-dic-2025): 23,0 veces el BPA de 2025 y 22,5 veces nuestro BPA de 2026 [1]. En la OPV (105 PLN) cotizaba a 15,9 veces el BPA de 2024 y unas 9 veces el EBITDA. Hoy, a 159 PLN, está a 21,1 veces el BPA de los últimos doce meses y a 17,7 veces nuestro BPA de 2027: el mercado ha quitado la prima que pagaba en 2025 porque el margen ya no acompaña al crecimiento de las ventas. La historia es demasiado corta para hablar de prima o descuento estructural.',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Grandes redes de laboratorios clínicos cotizadas: Quest y Labcorp (EE. UU.), Sonic y Australian Clinical Labs (Australia y Europa), Eurofins (clínico y análisis) y Medicover (dueño de Synevo, el segundo laboratorio de Polonia). No hay otra red de laboratorios cotizada en Polonia. Se excluyen Healius (en pérdidas) e Integrated Diagnostics (cifras de Yahoo en libras egipcias y dólares mezcladas). Todas con datos de Yahoo del 15-oct-2026, capitalización en PLN con el BCE del 14-oct; PER de los próximos 12 meses ponderando los dos ejercicios estimados; EV/EBITDA NTM estimado como el LTM dividido por (1 + crecimiento esperado de las ventas).',
    empresas: [
      { nombre: 'Quest Diagnostics', ticker: 'DGX', pais: 'US', capitalizacion: 100476, ev_ventas: 2.73, ev_ebitda_ltm: 13.9, ev_ebitda_ntm: 13.3, per_ntm: 19.7, crecimiento_pct: 4.6, margen_ebitda_pct: 19.6, roic_pct: null, dn_ebitda: 2.5, fcf_yield_pct: 3.5 },
      { nombre: 'Labcorp', ticker: 'LH', pais: 'US', capitalizacion: 100366, ev_ventas: 2.26, ev_ebitda_ltm: 14.0, ev_ebitda_ntm: 13.3, per_ntm: 16.3, crecimiento_pct: 4.8, margen_ebitda_pct: 16.2, roic_pct: null, dn_ebitda: 2.9, fcf_yield_pct: 3.5 },
      { nombre: 'Eurofins Scientific', ticker: 'ERF.PA', pais: 'LU', capitalizacion: 58837, ev_ventas: 2.35, ev_ebitda_ltm: 11.3, ev_ebitda_ntm: 10.7, per_ntm: 17.4, crecimiento_pct: 5.4, margen_ebitda_pct: 20.8, roic_pct: null, dn_ebitda: 2.5, fcf_yield_pct: 2.5 },
      { nombre: 'Sonic Healthcare', ticker: 'SHL.AX', pais: 'AU', capitalizacion: 24981, ev_ventas: 1.32, ev_ebitda_ltm: 10.7, ev_ebitda_ntm: 10.2, per_ntm: 14.9, crecimiento_pct: 4.1, margen_ebitda_pct: 12.4, roic_pct: null, dn_ebitda: 3.9, fcf_yield_pct: 8.4 },
      { nombre: 'Medicover (Synevo)', ticker: 'MCOV-B.ST', pais: 'SE', capitalizacion: 15669, ev_ventas: 2.01, ev_ebitda_ltm: 17.8, ev_ebitda_ntm: 16.4, per_ntm: 28.1, crecimiento_pct: 8.4, margen_ebitda_pct: 11.3, roic_pct: null, dn_ebitda: 4.9, fcf_yield_pct: 4.2 },
      { nombre: 'Australian Clinical Labs', ticker: 'ACL.AX', pais: 'AU', capitalizacion: 1448, ev_ventas: 1.14, ev_ebitda_ltm: 10.3, ev_ebitda_ntm: 9.9, per_ntm: 14.8, crecimiento_pct: 4.0, margen_ebitda_pct: 11.1, roic_pct: null, dn_ebitda: 3.8, fcf_yield_pct: null },
    ],
    comentario: 'Diagnostyka crece el doble o el triple que los grandes laboratorios (12-14 % frente al 4-8 %) y con más margen EBITDA (23-24 % frente al 11-21 %), pero cotiza a múltiplos parecidos: 15,7 veces el BPA de Yahoo de 2027 y unas 10 veces el EBITDA, frente a una mediana de 16,9 veces el PER y 12 veces el EV/EBITDA de los comparables [2]. Solo Medicover, también polaca y en plena expansión, cotiza claramente más cara (28 veces). El descuento se explica por el riesgo país (bono polaco al 6,2 %), la falta de historia como cotizada y el control de los fundadores; el crecimiento y el margen pedirían prima. Usaríamos el PER, que recoge la carga de arrendamientos e intereses mejor que el EV/EBITDA en una empresa con NIIF 16.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-02', objetivo: 'Diagnostyka (OPV: venta del 100 % de Mid Europa)', comprador: 'Mercado (OPV en la GPW)', ev: 4473, ev_ventas: 2.29, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: 'Estimación propia: 105 PLN × 33,76 M acciones + deuda neta con arrendamientos de 929 M a 31-dic-2024, sobre ventas y EBITDA publicados de 2024 [13]. No hay prima de control.' },
      { fecha: '2025-06', objetivo: 'Laboratorios en Campinas (Brasil)', comprador: 'Fleury', ev: 88, ev_ventas: 1.12, ev_ebitda: 5.3, prima_pct: null, excluir: false, comentario: 'R$ 130 M por R$ 116 M de ventas; 5,3x EV/EBITDA antes de sinergias; pasado a PLN a ≈ 0,68 PLN/BRL [10]' },
      { fecha: '2024-07', objetivo: 'Synlab (exclusión de bolsa)', comprador: 'Cinven', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 42, excluir: false, comentario: 'Oferta de 10 EUR (2023) con una prima del 42 % y exclusión a 11,09 EUR en 2024; múltiplo no publicado' },
    ],
    comentario: 'Hay pocas transacciones con múltiplo publicado. La referencia más útil es la propia OPV de Diagnostyka: el fondo vendedor aceptó unas 9 veces el EBITDA, por debajo de los 10-11 de hoy. Las compras de laboratorios pequeños se hacen a 5-6 veces el EBITDA (Fleury en Brasil; Diagnostyka no publica lo que paga). Con el 64 % de los votos en manos de los fundadores, una OPA no es probable sin su acuerdo; por eso no ponderamos las transacciones.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y BPA de 2028 del consenso', tipo: 'Complemento', intentos: '1) Yahoo (solo dos ejercicios); 2) MarketScreener (no abre la página de la empresa); 3) PPCG (solo objetivos y un trimestre)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de Synlab, Cerba, Unilabs y LADR', tipo: 'Complemento', intentos: '1) Búsqueda de la oferta de Cinven por Synlab (sin múltiplo); 2) prensa alemana (valoración de 2,22 mil millones, sin EBITDA); 3) búsqueda de operaciones europeas de laboratorios (sin cifras)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'rentabilidad del índice WIG', tipo: 'Complemento', intentos: '1) bolsa.mjs con WIG20.WA y WIG.WA (Yahoo devuelve una serie plana); 2) ETF WIG20TR (ETFBW20TR.WA, solo semanal para la beta); 3) stooq (bloqueo antibot)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Kurs Diagnostyki mocno w dół po publikacji wyników (PAP Biznes)', editor: 'xyz.pl', tipo: 'Foros y redes', fecha: '2026-09-11', url: 'https://xyz.pl/?p=248340' },
  { id: 2, titulo: 'Diagnostyka rozczarowała, akcje tanieją', editor: 'Parkiet', tipo: 'Foros y redes', fecha: '2026-09-11', url: 'https://www.parkiet.com/medycyna-i-zdrowie/art45128551-diagnostyka-rozczarowala-akcje-tanieja' },
  { id: 3, titulo: 'Diagnostyka (DIA) akcje – rekomendacje, prognozy, dywidenda 2026 (blog de inversión)', editor: 'PPCG', tipo: 'Foros y redes', fecha: '2026-05-26', url: 'https://ppcg.com.pl/diagnostyka-akcje/' },
];
const E = {
  _estado: 'Parcial: los foros polacos (Bankier, Stockwatch) no abren o redirigen a otra empresa; resumen hecho con la cobertura de prensa y blogs que leen los particulares.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'xyz.pl / PAP Biznes (noticia del día de resultados)', fecha: '2026-09', n_comentarios: 0, tono: 'Negativo', resumen: 'La acción cayó un 3,8 % al abrir tras el 2T26, con el beneficio un 10 % por debajo del consenso y el margen en mínimos; recoge el mensaje de la dirección de que el crecimiento orgánico sigue fuerte [1].' },
      { plataforma: 'Parkiet (prensa económica)', fecha: '2026-09', n_comentarios: 0, tono: 'Dividido', resumen: '«Diagnostyka decepcionó»: caída del 4 % con mucho volumen, pero el semestre completo se ve mejor que el trimestre [2].' },
      { plataforma: 'PPCG (blog para inversores particulares)', fecha: '2026-05', n_comentarios: 0, tono: 'Positivo', resumen: 'Antes del 2T26 el discurso de los particulares era de compra: dividendo récord, consenso «comprar» y objetivos por encima de 211 PLN [3].' },
    ],
    temas: [
      { tema: 'Margen a la baja pese al crecimiento de ventas', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: margen recurrente del 26,1 % en 2024 al 24,3 % en 2025 y 22,6 % en el 2T26; parte es SAP y ajuste de inventario, parte es estructural (imagen y salarios) [1, 2]' },
      { tema: 'Subidas de precio del 10 % al año sin perder volumen', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto hasta ahora: precio MLT +10 % y volumen +2,6 % en el 1S26 [1]' },
      { tema: 'Dividendo como apoyo', postura: 'Alcista', peso: 'Medio', contraste: 'El 4,40 PLN de 2026 (2,8 %) se pagó en parte con deuda; sostenible al 50 % del beneficio [3]' },
    ],
    lectura: 'No hay euforia ni capitulación: el ánimo de los particulares pasó de entusiasta tras la OPV (la acción duplicó el precio de salida) a escéptico tras dos trimestres de márgenes flojos. El tema que más preocupa, el margen, es el mismo que señala nuestro análisis y está en los riesgos. No añade un riesgo nuevo ni contradice a los analistas, que siguen mayoritariamente en «comprar» con objetivos más bajos. Con tan pocas fuentes de debate abiertas, no pesa en la decisión.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de inversores (Bankier, Stockwatch, StrefaInwestorów)', tipo: 'Complemento', intentos: '1) Foro de Bankier (la URL redirige a otra empresa); 2) Stockwatch (404) y StrefaInwestorów (404); 3) búsqueda web de debates (solo prensa)', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas en', dir);
