// Notas A-E de Royal Unibrew (corte 2026-10-21), escritas por el analista (sin subagentes) con los documentos de notas/docs.
// Solo hechos con su fuente. Ejecutar: node informes/royal-unibrew-2026-10-21/notas/construir-notas.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (n, o) => writeFileSync(join(DIR, n + '.json'), JSON.stringify(o, null, 1));

const ESEF = 'https://filings.xbrl.org/529900D69KFL8IAP8Q63';

// ───────────────────────────── A. Cuentas ─────────────────────────────
const A = {
  _estado: 'completo',
  financieros: {
    cuenta: [
      { periodo: '2021', ingresos: 8746, coste_ventas: 4490, gastos_generales: 2604, ebitda: 2020, amortizaciones: 368, ebit: 1652, resultado_financiero: -5, bai: 1647, impuestos: 349, minoritarios: -1, beneficio_neto: 1299, gastos_financieros: 49, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 26.5, dpa: 14.5, dpa_extraordinario: 0, acciones_diluidas: 49.0 },
      { periodo: '2022', ingresos: 11487, coste_ventas: 6618, gastos_generales: 3353, ebitda: 1997, amortizaciones: 481, ebit: 1516, resultado_financiero: 269, bai: 1785, impuestos: 294, minoritarios: -1, beneficio_neto: 1492, gastos_financieros: 103, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 30.5, dpa: 14.5, dpa_extraordinario: 0, acciones_diluidas: 48.9 },
      { periodo: '2023', ingresos: 12927, coste_ventas: 7533, gastos_generales: 3786, ebitda: 2208, amortizaciones: 570, ebit: 1638, resultado_financiero: -232, bai: 1406, impuestos: 311, minoritarios: 0, beneficio_neto: 1095, gastos_financieros: 260, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 21.9, dpa: 14.5, dpa_extraordinario: 0, acciones_diluidas: 50.0 },
      { periodo: '2024', ingresos: 15036, coste_ventas: 8648, gastos_generales: 4420, ebitda: 2634, amortizaciones: 666, ebit: 1968, resultado_financiero: -103, bai: 1865, impuestos: 401, minoritarios: 0, beneficio_neto: 1464, gastos_financieros: 326, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 29.2, dpa: 15.0, dpa_extraordinario: 0, acciones_diluidas: 50.1 },
      { periodo: '2025', ingresos: 15723, coste_ventas: 8957, gastos_generales: 4564, ebitda: 2931, amortizaciones: 729, ebit: 2202, resultado_financiero: -236, bai: 1966, impuestos: 406, minoritarios: 0, beneficio_neto: 1560, gastos_financieros: 280, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 31.3, dpa: 16.0, dpa_extraordinario: 0, acciones_diluidas: 49.8 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 15816, ebitda: 3040, ebit: 2269, beneficio_neto: 1610, bpa: 32.7, dpa: 16.0, dpa_extraordinario: 0, fcf: 1413, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Hansa Borg Bryggerier (Noruega): paso del 25 % al 100 % en 2022 (plusvalía de 360 M por revalorizar la participación previa, fuera del EBIT) y compras menores; el activo sube un 33 %.' },
      { periodo: '2023', descripcion: 'Vrumona (Países Bajos), consolidada desde el 29-sep-2023 (precio de 2.091 M; ventas de 200 M EUR en 2022): entra entera en el balance y solo un trimestre en la cuenta; planta de San Giorgio (Italia) a final de año.' },
    ],
    comentario: 'Las ventas pasaron de 8.746 M en 2021 a 15.723 M en 2025, sobre todo por compras: Hansa Borg (Noruega, 2022), Vrumona (Países Bajos, desde el 29-sep-2023), la distribución de PepsiCo en Bélgica y Luxemburgo (2025) y las marcas finlandesas de Pernod Ricard (2025) [A1, A4]. El crecimiento orgánico de las ventas fue del 12 % en 2021, 11 % en 2022, 4 % en 2023, 6 % en 2024 y 3 % en 2025 [A1]. El margen EBIT cayó del 18,9 % de 2021 al 13,2 % de 2022 y al 12,7 % de 2023 (inflación de materias primas, latas y energía repercutida con retraso, y compras con márgenes más bajos) y se recupera desde entonces: 13,1 % en 2024 y 14,0 % en 2025 [A1]. En el primer semestre de 2026 el EBIT subió un 7,0 % (orgánico 6,7 %) con ventas +1,2 %, porque la empresa sale de negocios de poco margen (aperitivos y promociones sin margen en Países Bajos) [A2].',
    ajustes: 'La empresa publica el BPA ajustado en dos años: 2022 sin la plusvalía de 360 M por revalorizar Hansa Borg (BPA ajustado 23,1 frente a 30,5) y 2024 sin la venta de las participaciones polacas (204 M; BPA ajustado 25,2 frente a 29,2) [A1, A3]. Las dos partidas están fuera del EBIT (resultado financiero y participadas), así que el EBITDA y el EBIT publicados no llevan no recurrentes relevantes. En la historia del PER usamos el BPA ajustado de esos dos años. El dividendo de 2023 (14,5 DKK) se pagó como extraordinario en octubre de 2024 y la empresa lo imputa a 2023 [A1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 4083, crecimiento_pct: 22.4, crecimiento_organico_pct: 8.0, ebitda: 843, margen_ebitda_pct: 20.6, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 3574, crecimiento_pct: 3.8, crecimiento_organico_pct: 3.0, ebitda: 594, margen_ebitda_pct: 16.6, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 3206, crecimiento_pct: 0.2, crecimiento_organico_pct: 0.0, ebitda: 391, margen_ebitda_pct: 12.2, bpa: 2.5, vs_consenso: null },
      { periodo: '2T25', ingresos: 4438, crecimiento_pct: 6.2, crecimiento_organico_pct: 4.7, ebitda: 917, margen_ebitda_pct: 20.7, bpa: 10.6, vs_consenso: null },
      { periodo: '3T25', ingresos: 4301, crecimiento_pct: 5.3, crecimiento_organico_pct: 4.0, ebitda: 962, margen_ebitda_pct: 22.4, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 3778, crecimiento_pct: 5.7, crecimiento_organico_pct: 4.0, ebitda: 661, margen_ebitda_pct: 17.5, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 3311, crecimiento_pct: 3.3, crecimiento_organico_pct: 2.1, ebitda: 468, margen_ebitda_pct: 14.1, bpa: 3.5, vs_consenso: null },
      { periodo: '2T26', ingresos: 4426, crecimiento_pct: -0.3, crecimiento_organico_pct: -0.3, ebitda: 949, margen_ebitda_pct: 21.4, bpa: 11.0, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En el primer trimestre (21-abr-2026, adelantado por el anuncio de PepsiCo) la dirección presentó un EBIT de 273 M (+24,6 %; orgánico +21,4 %) gracias a la Semana Santa temprana y mantuvo la guía de 2026 (EBIT orgánico +6-10 %, 2.325-2.425 M) [A6]. El mensaje cambió del crecimiento con socios a «acelerar marcas propias»: la salida de PepsiCo en Dinamarca, Finlandia y los países bálticos a finales de 2028 (≈ 13 % de las ventas) «quita restricciones estructurales» y libera capacidad; la empresa prevé unos 300 M de costes de transición y un EBIT de 2030 por encima del de 2028 [A7]. En el semestral (17-ago-2026) repitió la guía, destacó la mejora del margen EBIT (+80 pb hasta el 13,3 %) y el BPA (+10,7 %), y avisó de inflación en energía, materias primas, consumibles y transporte por la geopolítica, cubierta solo en parte [A2]. Lo que no detalló: cuánto EBIT pierde exactamente en 2029 ni cómo reparte los 300 M entre 2028 y 2029 («muchas piezas en movimiento») [A7]. El BPA del semestre quedó un 3,6 % por debajo de lo esperado [D11].',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 10914, activo_corriente: 2143, pasivo_corriente: 3801, pasivo_total: 7572, fondo_comercio: 3031, intangibles: 2830, inmovilizado_material: 2734, existencias: 780, clientes: 1188, proveedores: 1721, activos_contrato: null, pasivos_contrato: null, caja: 86, deuda_financiera: 3362, arrendamientos: 260, patrimonio_neto: 3330, minoritarios: 12, reservas: 1805 },
      { periodo: '2022', activo_total: 14474, activo_corriente: 3058, pasivo_corriente: 4610, pasivo_total: 9316, fondo_comercio: 3985, intangibles: 3573, inmovilizado_material: 3680, existencias: 1213, clientes: 1500, proveedores: 1934, activos_contrato: null, pasivos_contrato: null, caja: 214, deuda_financiera: 4304, arrendamientos: 370, patrimonio_neto: 5158, minoritarios: 0, reservas: 2763 },
      { periodo: '2023', activo_total: 17778, activo_corriente: 3524, pasivo_corriente: 5244, pasivo_total: 12030, fondo_comercio: 5216, intangibles: 4253, inmovilizado_material: 4662, existencias: 1401, clientes: 1901, proveedores: 2425, activos_contrato: null, pasivos_contrato: null, caja: 57, deuda_financiera: 5934, arrendamientos: 549, patrimonio_neto: 5748, minoritarios: 0, reservas: 4129 },
      { periodo: '2024', activo_total: 17886, activo_corriente: 3534, pasivo_corriente: 5510, pasivo_total: 11478, fondo_comercio: 5149, intangibles: 4364, inmovilizado_material: 4749, existencias: 1340, clientes: 1944, proveedores: 2532, activos_contrato: null, pasivos_contrato: null, caja: 103, deuda_financiera: 5337, arrendamientos: 462, patrimonio_neto: 6408, minoritarios: 0, reservas: 4148 },
      { periodo: '2025', activo_total: 18269, activo_corriente: 3438, pasivo_corriente: 4846, pasivo_total: 11556, fondo_comercio: 5161, intangibles: 4485, inmovilizado_material: 5120, existencias: 1286, clientes: 1918, proveedores: 2482, activos_contrato: null, pasivos_contrato: null, caja: 82, deuda_financiera: 5365, arrendamientos: 447, patrimonio_neto: 6713, minoritarios: 0, reservas: 4394 },
    ],
    vencimientos: [
      { anio: '2026', importe: 408 },
      { anio: '2027-2030', importe: 4659 },
      { anio: '2031+', importe: 1138 },
    ],
    liquidez: 'Caja de 54 M a 30-jun-2026 y líneas de crédito comprometidas; deuda neta con intereses de 6.610 M (2,2 veces el EBITDA de 12 meses) [A2]. La caja es casi nula por política: la empresa se financia con líneas bancarias e hipotecas y reparte la caja libre.',
    rating: 'Sin rating público (no emite bonos; deuda bancaria e hipotecaria) [A1]',
    coste_deuda_pct: 4.1,
    vida_media_anios: null,
    otros_pasivos: 'Fuera de la deuda con intereses hay 1.283 M de impuestos diferidos (marcas y fondo de comercio de las compras) y 2.251 M de «otros acreedores» a 30-jun-2026 (impuestos especiales, depósitos de envases y bonificaciones a clientes) que no son deuda financiera [A2]. Los arrendamientos (447 M a final de 2025) están contabilizados dentro de «entidades de crédito» y la empresa los incluye en su deuda neta [A1]. No hay pensiones de prestación definida relevantes. El contrato con PepsiCo en Dinamarca, Finlandia y los países bálticos vence el 31-dic-2028 sin renovación; la empresa estima unos 300 M de costes de transición y de salida desde 2029 [A7]. Un cambio de control permite a algunos socios comerciales y prestamistas rescindir sus contratos [A1].',
    comentario: 'La deuda neta subió de 3.536 M en 2021 a 6.426 M en 2023 (2,9 veces el EBITDA) por las compras de Hansa Borg y Vrumona, y bajó a 5.730 M en 2025 (2,0 veces) [A1]. A 30-jun-2026 vuelve a 6.610 M (2,2 veces) por las recompras (544 M en el semestre) y la estacionalidad: la caja se genera en la segunda mitad [A2]. El objetivo es menos de 2,5 veces. El circulante comercial es negativo en la definición de la empresa (−1.076 M en 2025): los proveedores y los impuestos especiales cobrados financian existencias y clientes [A1]. Entre el 30-jun y el 16-oct-2026 la empresa recompró 707.857 acciones por unos 322 M más [A8].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 1753, capex: 426, pagos_arrendamientos: 68, adquisiciones: 1218, desinversiones: 16, dividendos: 653, recompras: 582, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 1135, capex: 502, pagos_arrendamientos: 116, adquisiciones: 275, desinversiones: 6, dividendos: 692, recompras: 300, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 1777, capex: 602, pagos_arrendamientos: 138, adquisiciones: 2419, desinversiones: 93, dividendos: 720, recompras: 0, emision_acciones: 249, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 2189, capex: 819, pagos_arrendamientos: 166, adquisiciones: 80, desinversiones: 219, dividendos: 726, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 2385, capex: 841, pagos_arrendamientos: 177, adquisiciones: 167, desinversiones: 46, dividendos: 749, recompras: 550, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'La caja libre de la empresa (operativo − inversiones sin compras − arrendamientos) fue de 1.296 M en 2021, 577 M en 2022 (circulante −480 M por la inflación), 1.143 M en 2023, 1.434 M en 2024 (1.233 M sin los 201 M de la venta de las cerveceras polacas) y 1.413 M en 2025 [A1, A3]. La conversión del beneficio en caja libre ronda el 90 % en los años normales. El capex de la empresa (con las altas de arrendamientos) fue del 6,4 % de las ventas en 2025 y la guía de 2026 es de un 7 % por la ampliación de almacenes y líneas [A1, A2]; la amortización es del 4,6 %. Estimación propia: el mantenimiento ronda el 4,5-5 % de las ventas y el resto es crecimiento (almacén automatizado de Faxe, latas propias en Países Bajos) [A2]. Los intereses pagados van en el flujo operativo.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte Statsautoriseret Revisionspartnerselskab', anios_auditor: null, opinion: 'Favorable',
    comentario: 'Las cuentas siguen las NIIF-UE con informe ESEF auditado por Deloitte, sin salvedades [A5, A1]. Dos partidas extraordinarias fuera del EBIT inflan el beneficio de 2022 (plusvalía de 360 M al revalorizar Hansa Borg) y de 2024 (204 M por las cerveceras polacas); la empresa las ajusta en su BPA [A1]. El fondo de comercio (5.161 M) y las marcas sin amortizar (la mayor parte de los 4.485 M de intangibles) suman el 53 % del activo; el test de deterioro de 2025 no registró pérdidas [A1]. Los pagos en acciones son pequeños (35 M en 2025) [A1]. No hay capitalización de gastos de desarrollo relevante. La conversión en caja es alta y el circulante negativo es estructural (impuestos especiales y depósitos de envases). El Altman, el Piotroski y el Beneish del motor se leen con cuidado en 2022 y 2023 por las compras.',
    senales: [
      { senal: 'Fondo de comercio y marcas = 53 % del activo', nivel: 'Media', comentario: 'Un deterioro de las marcas o del fondo de comercio de Vrumona o Finlandia sería contable, pero diría que se pagó demasiado; la licencia de PepsiCo en Países Bajos (Vrumona) y Bélgica sigue en vigor [A1, A7].' },
      { senal: 'Plusvalías fuera del EBIT en 2022 y 2024', nivel: 'Baja', comentario: 'La empresa las ajusta y las publica; no se repiten [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Objetivo de deuda neta por debajo de 2,5 veces el EBITDA y dividendo del 40-60 % del beneficio; prioridades: flexibilidad financiera, crecimiento orgánico, compras, dividendo estable y recompras para ajustar la estructura de capital [A1]. Dividendo de 16 DKK por 2025 (51 % del beneficio). En 2026: recompra de 700 M (feb-ago, 1.529.200 acciones a 457,7 DKK de media) y otra de hasta 300 M (18-ago a 18-dic) [A2, A8]. Se amortizaron 900.000 acciones propias el 29-abr-2026 [A2].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Terme di Crodo (Italia) y otras compras menores', importe: 1218, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Crodo es hoy una de las marcas que más crecen en Italia y en exportación [A2].' },
      { anio: '2022', objetivo: 'Hansa Borg Bryggerier (Noruega), del 25 % al 100 %', importe: 1934, ev_ebitda: null, financiacion: 'Acciones nuevas (821 M), acciones propias (467 M) y caja', resultado: 'Plataforma en Noruega; plusvalía contable de 360 M; Noruega crece en sidra, bebidas listas y cerveza en 2025-2026 [A4, A2].' },
      { anio: '2023', objetivo: 'Vrumona (Países Bajos), comprada a Heineken', importe: 2091, ev_ebitda: 12.0, financiacion: 'Deuda', resultado: 'Valor empresa de 300 M EUR, 12 veces el EBITDA normalizado de 2022 (25 M EUR) [A4]. Rendimiento por debajo del plan en 2024-2025; estrategia comercial revisada en el 3T25 (menos promociones sin margen); el margen de Europa Occidental mejora al 13,6 % en el 1S26 [A2].' },
      { anio: '2025', objetivo: 'Marcas locales de Pernod Ricard en Finlandia (Minttu) y distribución de PepsiCo en Bélgica y Luxemburgo', importe: 167, ev_ebitda: null, financiacion: 'Caja', resultado: 'Minttu integrada desde el 28-feb-2025 y con aportación positiva; Benelux no aporta beneficio aún en el 1S26 [A1, A2].' },
    ],
    comentario: 'La dirección duplicó el tamaño con compras de 2021 a 2023 (más de 5.700 M) y el rendimiento del capital invertido con fondo de comercio bajó del 19 % de 2021 al 11 % de 2023; vuelve al 12,8 % en los 12 meses a junio de 2026 [A1, A2]. Las compras crecieron el beneficio por acción poco: 26,5 DKK en 2021 y 31,3 en 2025 (+4,3 % anual), con el dividendo plano en 14,5 DKK hasta 2023. Desde 2025 la prioridad pasa a las recompras (550 M en 2025 y unos 1.000 M en 2026) con la deuda en 2,0-2,2 veces. Vrumona se pagó a 12 veces el EBITDA y aún no rinde lo previsto.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Northern Europe', descripcion: 'Dinamarca (con el comercio fronterizo alemán), Finlandia, Noruega, Suecia y los tres países bálticos: modelo multibebida (refrescos, cerveza, agua, energéticas, bebidas listas para tomar, vino y licores)', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 10023, resultado: 1445 }, { periodo: '2024', ingresos: 10274, resultado: 1454 }, { periodo: '2025', ingresos: 10440, resultado: 1518 }] },
      { nombre: 'Western Europe', descripcion: 'Países Bajos (Vrumona), Bélgica, Luxemburgo, Italia y Francia: modelo multinicho (Ceres, Faxe, Crodo, Lorina, Crazy Tiger; PepsiCo en el Benelux)', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1738, resultado: 141 }, { periodo: '2024', ingresos: 3316, resultado: 309 }, { periodo: '2025', ingresos: 3741, resultado: 480 }] },
      { nombre: 'International', descripcion: 'Exportación fuera de Europa: África, Norteamérica (Canadá, Amsterdam Brewery) y Europa central y del Este (Faxe, Vitamalt, Supermalt, Crodo)', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1166, resultado: 75 }, { periodo: '2024', ingresos: 1446, resultado: 209 }, { periodo: '2025', ingresos: 1542, resultado: 239 }] },
      { nombre: 'No asignado', descripcion: 'Costes centrales no repartidos', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 0, resultado: -23 }, { periodo: '2024', ingresos: 0, resultado: -4 }, { periodo: '2025', ingresos: 0, resultado: -35 }] },
    ],
    geografias: [
      { nombre: 'Dinamarca', peso_pct: 26.4 }, { nombre: 'Finlandia', peso_pct: 20.9 }, { nombre: 'Noruega', peso_pct: 10.6 }, { nombre: 'Países Bajos', peso_pct: 9.8 }, { nombre: 'Otros', peso_pct: 32.3 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Volumen (millones de hectolitros)', valor_anterior: '17,4 (2024)', valor_actual: '18,1 (2025)', variacion: '+4 % (orgánico +3,7 %)', comentario: '1S26: 9,0 (+1,8 %) [A1, A2]' },
      { kpi: 'Margen EBIT', valor_anterior: '13,1 % (2024)', valor_actual: '14,0 % (2025)', variacion: '+0,9 puntos', comentario: '1S26: 13,3 % (+0,8 puntos) [A1, A2]' },
      { kpi: 'ROIC con fondo de comercio (12 meses)', valor_anterior: '12 % (2024)', valor_actual: '12,8 % (jun-26)', variacion: '+0,8 puntos', comentario: 'Sin fondo de comercio, 20,4 % [A2]' },
      { kpi: 'Peso de las categorías de crecimiento en las ventas', valor_anterior: '≈ 60 % (2025)', valor_actual: '≈ 62 % (1S26)', variacion: '+2 puntos', comentario: 'Refrescos sin azúcar, energéticas, bebidas listas y premium [A1, A2]' },
      { kpi: 'Deuda neta / EBITDA', valor_anterior: '2,0 veces (2025)', valor_actual: '2,2 veces (jun-26)', variacion: '+0,2', comentario: 'Objetivo < 2,5 [A2]' },
      { kpi: 'Peso de PepsiCo (Dinamarca, Finlandia y bálticos) en las ventas', valor_anterior: 'n. p.', valor_actual: '≈ 13 % (abr-26)', variacion: 'Sale a final de 2028', comentario: 'Margen EBIT cercano al del grupo [A7]' },
    ],
  },
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) Informe de auditoría del informe anual 2025; 2) informe anual 2022 (Deloitte ya era auditor); 3) informe de gobierno corporativo', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) Nota de riesgos financieros del informe anual 2025 (solo da vencimientos por tramos); 2) nota de deuda; 3) semestral 2026', decision: 'Omitido' },
  ],
  fuentes: [
    { id: 1, titulo: 'Annual Report 2025 (informe anual con cuentas consolidadas, ESEF)', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2026-02-25', url: `${ESEF}/2025-12-31/ESEF/DK/0/ROYAL-2025-12-31-0-en/reports/ROYAL-2025-12-31-0-en.xhtml` },
    { id: 2, titulo: 'Interim Report H1 2026 (Company Announcement No 43/2026)', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2026-08-17', url: `${ESEF}/2026-06-30/ESEF/DK/0/ROYAL-2026-06-30-0-en/reports/ROYAL-2026-06-30-0-en.xhtml` },
    { id: 3, titulo: 'Annual Report 2024 (ESEF)', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2025-02-26', url: `${ESEF}/2024-12-31/ESEF/DK/0/ROYAL-2024-12-31-0-en/reports/ROYAL-2024-12-31-0-en.xhtml` },
    { id: 4, titulo: 'Annual Report 2023 (ESEF; nota 24, compra de Vrumona)', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2024-02-28', url: `${ESEF}/2023-12-31/ESEF/DK/0/ROYAL-2023-12-31-en/reports/ROYAL-2023-12-31-en.xhtml` },
    { id: 5, titulo: 'Annual Report 2022 (ESEF; informe del auditor Deloitte, cuentas de 2021 comparadas)', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2023-03-01', url: `${ESEF}/2022-12-31/ESEF/DK/0/ROYAL-2022-12-31/reports/ROYAL-2022-12-31.xhtml` },
    { id: 6, titulo: 'Q1 2026 Trading Statement (Company Announcement No 18/2026)', editor: 'Royal Unibrew A/S (GlobeNewswire)', tipo: 'Primaria', fecha: '2026-04-21', url: 'https://www.globenewswire.com/news-release/2026/04/21/3277649/0/en/Q1-2026-trading-statement.html' },
    { id: 7, titulo: 'Royal Unibrew and PepsiCo to end the partnership in Northern Europe upon expiry of current license agreements (Company Announcement No 17/2026)', editor: 'Royal Unibrew A/S (Inderes)', tipo: 'Primaria', fecha: '2026-04-21', url: 'https://www.inderes.dk/en/releases/royal-unibrew-and-pepsico-to-end-the-partnership-in-northern-europe-upon-expiry-of-current-license-agreements' },
    { id: 8, titulo: 'Share buy-back program (Company Announcement No 54/2026): 2.180.245 acciones propias de 49.300.000', editor: 'Royal Unibrew A/S (Ritzau)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://via.ritzau.dk/files/90446/15232393/578436/en' },
  ],
};
w('A', A);

// ───────────────────────────── B. Sector y competencia ─────────────────────────────
const B = {
  _estado: 'completo',
  negocio: {
    descripcion: 'Royal Unibrew es la segunda cervecera y refresquera de los países nórdicos y bálticos. Produce y vende cerveza (Royal, Faxe, Ceres, Lapin Kulta, Albani), refrescos (Faxe Kondi, Jaffa, Novelle, Crodo, Lorina), agua (Egekilde), energéticas (Faxe Kondi Booster, Crazy Tiger), bebidas alcohólicas listas para tomar (Original Long Drink, Shaker), sidra, vino y licores (Minttu), maltas sin alcohol (Vitamalt, Supermalt) y marcas con licencia de PepsiCo (Pepsi, 7UP, Mountain Dew) y de Heineken en Dinamarca [B1]. Tiene 20 plantas en 10 países, vendió 18,1 millones de hectolitros en 2025 y reparte directamente a supermercados, bares y tiendas en sus mercados multibebida [B1]. Fuera de los nórdicos opera como «multinicho» (Italia, Países Bajos, Bélgica, Francia) y exporta a África, Norteamérica y Europa del Este [B1].',
    como_gana_dinero: 'Vende volumen a precio por hectolitro: el margen bruto (43,0 % en 2025) depende del precio neto por hectolitro frente al coste de latas de aluminio, malta, azúcar, PET, energía y transporte, que se cubre en parte con contratos y derivados [B1, B2]. El 60-62 % de las ventas está en categorías de crecimiento (refrescos sin azúcar, energéticas, bebidas listas, premium) [B2]. Hay apalancamiento operativo: compartir líneas de llenado entre categorías y repartir con la misma flota abarata cada litro adicional [B1]. Es muy estacional: el primer trimestre deja un margen EBIT del 7-8 % y el segundo y el tercero, del 17-18 %; el tiempo del verano y la Semana Santa mueven los trimestres [A1]. Las marcas con licencia (PepsiCo ≈ 13 % de las ventas en Dinamarca, Finlandia y bálticos) dan un margen EBIT cercano al del grupo, menor que el de las marcas propias [B3].',
    clientes: 'Clientes: cadenas de supermercados (en Dinamarca, Salling y Coop; en Finlandia, Kesko y S-Group), mayoristas, hostelería y tiendas de conveniencia; ningún cliente pasa del 10 % de las ventas [A3]. Los contratos con las cadenas son anuales con bonificaciones por volumen y promociones. Poder de precios demostrado: en 2022-2023 la empresa subió precios para cubrir la inflación, aunque con retraso (margen EBIT del 18,9 % en 2021 al 12,7 % en 2023) [A1]; en 2025-2026 recupera margen subiendo el precio neto por hectolitro y saliendo de promociones sin margen en Países Bajos [B2]. La relación con PepsiCo muestra el límite: el socio decidió no renovar Dinamarca, Finlandia y bálticos y se fue con Carlsberg [B3, B4].',
  },
  sector: {
    definicion: 'Mercado relevante: bebidas embotelladas (cerveza, refrescos, agua, energéticas, bebidas alcohólicas listas para tomar y sidra) en los países nórdicos y bálticos, donde Royal Unibrew obtiene el 66 % de las ventas, más nichos de cerveza y refrescos en Italia, Benelux y Francia [A1]. No hay una fuente pública con el tamaño en coronas de ese perímetro; usamos el volumen: la cerveza de la UE (34.400 millones de litros en 2025, −0,7 %) [B5] y la industria cervecera y refresquera sueca (unos 21.000 millones de SEK de ventas, volumen +1,8 % en 2024) [B6] como referencias de un mercado maduro que crece en valor y no en volumen.',
    tamano: 'Cerveza de la UE: 34.400 millones de litros en 2025 (−0,7 %; +2,2 % frente a 2020) [B5]; industria sueca de cerveza y refrescos: ≈ 21.000 M SEK de ventas, volumen +1,8 % en 2024 [B6]',
    unidad_serie: null, serie: [],
    tcac_historico_pct: 0.4, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Moderación del alcohol', efecto: '−', horizonte: 'Estructural', evidencia: 'La propia empresa dice que el consumo de cerveza, vino y licores baja en casi todos los mercados desarrollados y que el mercado danés de cerveza cayó en 2025 [B1]; producción de cerveza de la UE −0,7 % en 2025 [B5].' },
      { driver: 'Refrescos sin azúcar y cerveza sin alcohol', efecto: '+', horizonte: 'Estructural', evidencia: 'En Suecia, refrescos sin azúcar +6,5 % y cerveza sin alcohol +6,2 % en 2024; los refrescos sin azúcar ya son el 56 % de los refrescos [B6].' },
      { driver: 'Energéticas y bebidas listas para tomar', efecto: '+', horizonte: 'Estructural', evidencia: 'Bebidas listas, la categoría que más crece en Dinamarca (Shaker y Royal Club a doble dígito) y energéticas +5 % en 2025 [B1, B2].' },
      { driver: 'Impuestos especiales y al azúcar', efecto: '−', horizonte: 'Estructural', evidencia: 'Subidas del impuesto a la cerveza e impuesto al azúcar en los bálticos en 2026 [B2].' },
      { driver: 'Coste de latas, malta, energía y transporte', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Aluminio en la LME a 3.134 USD/t el 6-oct-2026 [B7]; el 1S26 tuvo inflación en energía, materias primas y transporte cubierta en parte [B2]; en 2022-2023 el margen EBIT cayó 6 puntos [A1].' },
      { driver: 'Tiempo en verano y consumo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Mayo y junio fríos en 2025 en Finlandia y Dinamarca; confianza del consumidor baja en Finlandia y bálticos [B1, B2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Dos grandes por país (Carlsberg y Royal Unibrew en Dinamarca; Hartwall —de Royal Unibrew— y Sinebrychoff —de Carlsberg— más Olvi en Finlandia); compiten en promociones con las cadenas [B1, B4].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pocas cadenas concentran la alimentación nórdica; las promociones y las bonificaciones fijan el precio neto [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Latas de aluminio (Ball, Crown), malta y azúcar con precio de mercado; y los dueños de marcas (PepsiCo, Heineken) pueden cambiar de embotellador, como acaba de hacer PepsiCo [B3, B4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta red de reparto directo, plantas locales, depósitos de envases y marcas con décadas; los nuevos entran por nichos (energéticas, artesanas) [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'La cerveza pierde frente a bebidas sin alcohol, listas para tomar y agua; Royal Unibrew está en todas, lo que reduce el daño [B1, B6].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Volumen plano o algo al alza (+3,7 % orgánico de la empresa en 2025, +1,6 % en el 1S26) y crecimiento en valor por precio y mezcla [A1, A2]. En 2008-2009 el sector nórdico bajó poco en volumen; en 2020 cerró la hostelería y el comercio fronterizo y el volumen de la empresa quedó plano [A4]; en 2022 la inflación de latas, energía y malta hundió los márgenes un año y medio antes de repercutirla [A1]. Hoy la confianza del consumidor es baja en Finlandia y bálticos [B2].' },
    regulacion: 'Impuestos especiales al alcohol y a los refrescos azucarados: subidas en los bálticos en 2026 [B2]. Sistemas de depósito y retorno de envases obligatorios en Dinamarca, Finlandia, Noruega, Suecia y bálticos (coste de envases y logística inversa). Normativa europea de envases (PPWR) con objetivos de reutilización y contenido reciclado. Restricciones a la publicidad y venta de alcohol en Noruega, Suecia y Finlandia (monopolios de venta minorista) que frenan el alcohol fuerte [B1].',
    tendencias: 'Menos alcohol y menos azúcar: crecen la cerveza sin alcohol, los refrescos sin azúcar, las energéticas y las bebidas listas para tomar, y baja la cerveza normal [B1, B6]. Royal Unibrew gana con su cartera multibebida (60-62 % de las ventas en categorías de crecimiento) [B2]. El cambio de embotellador de PepsiCo hacia Carlsberg (Dinamarca, Finlandia y bálticos desde 2029) y la salida de Carlsberg de Coca-Cola en Dinamarca y Finlandia a final de 2028 rehacen el mapa de licencias: Coca-Cola necesitará otro embotellador en esos dos países [B4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'N.º 2 en bebidas en Dinamarca y Finlandia detrás de Carlsberg; n.º 1 en refrescos de sabores en Dinamarca (Faxe Kondi); n.º 2 en refrescos en Países Bajos (Vrumona) [A4, B1]. La empresa no publica cuotas en cifras.',
    competidores: [
      { nombre: 'Carlsberg', pais: 'Dinamarca', ticker: 'CARL-B.CO', ingresos: 90293, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder nórdico en cerveza; embotellador de PepsiCo en Suecia y Noruega y desde 2029 en Dinamarca, Finlandia y bálticos; de Coca-Cola en Dinamarca y Finlandia hasta 2028; compró Britvic en 2025 [B4, D12].' },
      { nombre: 'Heineken', pais: 'Países Bajos', ticker: 'HEIA.AS', ingresos: 245830, cuota_pct: null, margen_ebit_pct: null, comentario: 'Socio de Royal Unibrew (licencia Heineken en Dinamarca) y vendedor de Vrumona; rival en Países Bajos e Italia [A4].' },
      { nombre: 'Coca-Cola Europacific Partners', pais: 'Reino Unido', ticker: 'CCEP', ingresos: 159591, cuota_pct: null, margen_ebit_pct: null, comentario: 'Embotellador de Coca-Cola en Noruega, Suecia, Países Bajos y Bélgica; rival directo en refrescos [D12].' },
      { nombre: 'Olvi', pais: 'Finlandia', ticker: 'OLVAS.HE', ingresos: 5305, cuota_pct: null, margen_ebit_pct: null, comentario: 'Tercer grupo de bebidas en Finlandia y líder en los bálticos (A. Le Coq, Cido) [D12].' },
      { nombre: 'Harboes Bryggeri', pais: 'Dinamarca', ticker: 'HARB-B.CO', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cervecera y refresquera danesa de marcas baratas y marcas de distribuidor; rival en precio.' },
      { nombre: 'Spendrups', pais: 'Suecia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segunda cervecera sueca, no cotiza; rival en Suecia.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Las cadenas cambian de proveedor con facilidad; lo que fija es la red de reparto y el servicio en tienda [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas locales con décadas (Faxe Kondi, Royal, Lapin Kulta, Ceres) que ganan cuota [B2]; pero las licencias son revocables: PepsiCo (≈ 13 % de las ventas) se va en 2029 [B3].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Llenado de varias categorías en las mismas líneas y reparto directo; margen EBIT del 14,0 % en 2025 frente a ≈ 10-15 % de Heineken y Carlsberg en sus cuentas de 12 meses [A1, D12].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mercados pequeños con dos grandes por país, plantas locales y depósitos de envases que desaniman a un tercero [B1].' },
      ],
    },
    amenazas: 'La principal ya ocurrió: PepsiCo pasa a Carlsberg Dinamarca, Finlandia y bálticos desde 2029, y Carlsberg tendrá las dos colas grandes durante 2029 si no cede Coca-Cola, que vence a final de 2028 [B3, B4]. Riesgo de que otro socio (Heineken en Dinamarca, PepsiCo en Benelux) siga el mismo camino; probabilidad media a cinco años. La moderación del alcohol erosiona la cerveza normal (probabilidad alta, impacto lento). Las marcas de distribuidor presionan el precio en Finlandia y bálticos [B2].',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie y tamaño en DKK del mercado nórdico y báltico de bebidas', tipo: 'Complemento', intentos: '1) Informe anual 2025 de la empresa (no da tamaño); 2) asociaciones sectoriales (Bryggeriforeningen, Sveriges Bryggerier: solo volumen y Suecia 2024); 3) Eurostat vía Brewers Journal (solo cerveza de la UE en litros)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct y margen EBIT anual de los competidores', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no publica cuotas); 2) datos de Yahoo (solo margen del último trimestre); 3) informes anuales de los rivales sin desglose nórdico', decision: 'Omitido' },
  ],
  fuentes: [
    { id: 1, titulo: 'Annual Report 2025 (estrategia, categorías y mercados)', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2026-02-25', url: `${ESEF}/2025-12-31/ESEF/DK/0/ROYAL-2025-12-31-0-en/reports/ROYAL-2025-12-31-0-en.xhtml` },
    { id: 2, titulo: 'Interim Report H1 2026', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2026-08-17', url: `${ESEF}/2026-06-30/ESEF/DK/0/ROYAL-2026-06-30-0-en/reports/ROYAL-2026-06-30-0-en.xhtml` },
    { id: 3, titulo: 'Company Announcement No 17/2026: fin de la licencia de PepsiCo en el norte de Europa', editor: 'Royal Unibrew A/S (Inderes)', tipo: 'Primaria', fecha: '2026-04-21', url: 'https://www.inderes.dk/en/releases/royal-unibrew-and-pepsico-to-end-the-partnership-in-northern-europe-upon-expiry-of-current-license-agreements' },
    { id: 4, titulo: 'Carlsberg expands strategic partnership with PepsiCo to the Nordics and Baltics', editor: 'Carlsberg Group', tipo: 'Primaria', fecha: '2026-04-21', url: 'https://www.carlsberggroup.com/newsroom/carlsberg-expands-strategic-partnership-with-pepsico-to-the-nordics-and-baltics/' },
    { id: 5, titulo: 'Latest EU beer production figures revealed (Eurostat 2025)', editor: 'Brewers Journal', tipo: 'Sectorial', fecha: '2026', url: 'https://www.brewersjournal.info/?p=29674' },
    { id: 6, titulo: 'Rekordstort intresse för hälsosammare drycker (ventas de 2024, Delfi Marknadspartner)', editor: 'Sveriges Bryggerier', tipo: 'Sectorial', fecha: '2025', url: 'https://www.mynewsdesk.com/se/sverigesbryggerier/pressreleases/rekordstort-intresse-foer-haelsosammare-drycker-3365627' },
    { id: 7, titulo: 'LME aluminium offer price rises to $3,134.5/t (6-oct-2026)', editor: 'AlCircle', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.alcircle.com/news/lme-aluminium-offer-price-rises-to-3-134-5-t-as-stocks-remain-unchanged-at-240-375t-121456' },
  ],
};
w('B', B);

// ───────────────────────────── C. Equipo y gobierno ─────────────────────────────
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Lars Jensen', cargo: 'Consejero delegado (President & CEO)', desde: '2020', participacion_pct: 0.19, trayectoria: 'En la empresa desde 1993; director financiero de 2011 a 2020 y consejero delegado desde agosto de 2020 [C1]. Con él se hicieron Hansa Borg, Vrumona y la entrada en el Benelux; el EBIT pasó de 1.515 M en 2020 a 2.202 M en 2025 y el ROIC con fondo de comercio del 20 % al 13 % [C1, A4]. Tenía 88.957 acciones a final de 2025 [C1].' },
      { nombre: 'Lars Vestergaard', cargo: 'Director financiero (CFO)', desde: '2020', participacion_pct: 0.02, trayectoria: 'Antes vicepresidente en ISS, tesorero, director financiero y de sistemas de Carlsberg y director financiero de FLSmidth [C1]. Compró 1.888 acciones a 415 DKK el 22-abr-2026, tras la caída por PepsiCo [C3].' },
      { nombre: 'Peter Ruzicka', cargo: 'Presidente del consejo', desde: '2021', participacion_pct: 0.02, trayectoria: 'Presidente desde 2022; preside Pandora y está en el consejo de Axfood; experiencia en alimentación y bebidas (Orkla) [C1]. Compró 2.000 acciones a 408,80 DKK el 24-abr-2026 y otras 2.000 a 434,85 DKK el 18-ago-2026 [C2, C4].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'EBIT de 1.550-1.750 M y ventas de 13.000-14.000 M (marzo de 2023)', real: 'EBIT 1.638 M; ventas 12.927 M', cumplida: 'Parcial' },
      { anio: '2024', guia: 'EBIT orgánico +5-15 % y ventas de unos 15.000 M (inicial); +15-19 % (último)', real: 'EBIT orgánico +15 %; ventas 15.036 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'EBIT +7-13 % (2.100-2.225 M) y ventas +5-7 % (inicial); EBIT orgánico +8-12 % (último)', real: 'EBIT 2.202 M (+12 %; orgánico +10 %); ventas +5 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBIT orgánico +6-10 % (2.325-2.425 M); ventas planas', real: 'En curso: EBIT +7,0 % en el 1S26; guía repetida el 17-ago-2026', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable: el consejero delegado lleva 33 años en la casa y seis en el cargo, y el director financiero seis. Cumplen la guía de EBIT (2023 en el centro, 2024 y 2025 dentro); en ventas 2023 quedó por debajo [C1, A3]. La gran mancha es comercial: no lograron renovar PepsiCo en Dinamarca, Finlandia y bálticos, un socio de décadas [A7]. Tras la caída de abril, el presidente y el director financiero compraron acciones con su dinero [C2, C3]. No hay plan de sucesión publicado.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Peter Arne Ruzicka', cargo: 'Presidente', tipo: 'Independiente', desde: '2021', comisiones: 'Remuneraciones y nombramientos (presidente); auditoría' },
      { nombre: 'Jais Stampe Li Valeur', cargo: 'Vicepresidente', tipo: 'Otro externo', desde: '2013', comisiones: 'Remuneraciones y nombramientos' },
      { nombre: 'Anna Catharina von Stackelberg-Hammarén', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: null },
      { nombre: 'Ingeborg Plochaet', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Lise Skaarup Mortensen', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Torben Carlsen', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: null },
      { nombre: 'Claus Kærgaard', cargo: 'Consejero (elegido por los empleados)', tipo: 'Otro externo', desde: '2018', comisiones: null },
      { nombre: 'Michael Nielsen', cargo: 'Consejero (elegido por los empleados)', tipo: 'Otro externo', desde: '2022', comisiones: null },
      { nombre: 'Jeanette Dahl Henriksen', cargo: 'Consejera (elegida por los empleados)', tipo: 'Otro externo', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La dirección (dos personas) cobró 38 M en 2025: 15 M fijos, 9 M de variable anual y 14 M de variable a largo plazo [C1]. El variable anual de 2026 depende en un 70 % del EBIT, 15 % del ROIC y 15 % de seguridad y CO₂; el de 2025 pagó el 64 % del máximo (EBIT de 2.202 M frente a un objetivo de 2.000-2.200 M) [C1]. El plan a largo plazo 2026-2028 pesa un 55 % el crecimiento orgánico del EBIT y un 30 % el ROIC: premia rentabilidad y no solo tamaño [C1]. El plan 2023-2025 consolidó el 66 % (26.499 acciones). El consejo cobró 6 M. Las juntas danesas aprueban el informe de remuneraciones sin recuento publicado [C1].',
    accionistas: [
      { nombre: 'Chr. Augustinus Fabrikker A/S', pct: 14.94, tipo: 'Inversor estratégico danés (fundación)', variacion: 'Sin cambios notificados desde mayo de 2022' },
      { nombre: 'Wellington Management Group LLP', pct: 5.07, tipo: 'Gestora', variacion: 'Notificado el 9-jun-2025' },
      { nombre: 'Autocartera', pct: 4.4, tipo: 'Acciones propias', variacion: '2.180.245 acciones el 16-oct-2026 (2,4 % a final de 2025)' },
    ],
    insiders: [
      { fecha: '2026-03-16', persona: 'Vicepresidente (lista de personas con responsabilidades de dirección)', operacion: 'Venta', acciones: null, importe: null },
      { fecha: '2026-04-22', persona: 'Lars Vestergaard (director financiero)', operacion: 'Compra', acciones: 1888, importe: 0.78 },
      { fecha: '2026-04-24', persona: 'Peter Ruzicka (presidente)', operacion: 'Compra', acciones: 2000, importe: 0.82 },
      { fecha: '2026-08-18', persona: 'Peter Ruzicka (presidente, por Ventotene Holding AS)', operacion: 'Compra', acciones: 2000, importe: 0.87 },
    ],
    control_y_defensas: 'Una sola clase de acciones, un voto por acción y sin límites de voto [C1]. Ningún accionista controla: Chr. Augustinus Fabrikker tiene el 14,94 % y no está en el consejo como dominical [C1]. Tres de los nueve consejeros los eligen los empleados, como manda la ley danesa. Un cambio de control permite a algunos socios comerciales (licencias) y prestamistas rescindir contratos, lo que encarece una opa [C1]. No hay operaciones vinculadas relevantes (ventas a asociadas de 18-19 M al año) [A4].',
    alertas: ['Venta de acciones por dos vicepresidentes en marzo de 2026 a unos 583-584 DKK, un mes antes del anuncio de PepsiCo (las negociaciones con PepsiCo no eran públicas); importes no comprobados en el registro oficial [C5].'],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct y voto en contra', tipo: 'Complemento', intentos: '1) Acta de la junta del 29-abr-2026 (aprobación sin recuento); 2) informe anual 2025; 3) Ritzau/Inderes, anuncio de la junta', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo (individual)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo total de la dirección); 2) informe de remuneraciones 2025 (no descargado del sitio de la empresa, que da 404); 3) prensa danesa', decision: 'Omitido' },
  ],
  fuentes: [
    { id: 1, titulo: 'Annual Report 2025: gobierno, consejo, dirección, remuneración y accionistas', editor: 'Royal Unibrew A/S', tipo: 'Primaria', fecha: '2026-02-25', url: `${ESEF}/2025-12-31/ESEF/DK/0/ROYAL-2025-12-31-0-en/reports/ROYAL-2025-12-31-0-en.xhtml` },
    { id: 2, titulo: 'Company Announcement No 21/2026: transacciones de directivos (Peter Ruzicka, 2.000 acciones a 408,80 DKK)', editor: 'Royal Unibrew A/S (Börskollen)', tipo: 'Primaria', fecha: '2026-04-27', url: 'https://www.borskollen.se/pressmeddelanden/transactions-by-persons-discharging-managerial-responsibilities-and-or-persons-closely-associated-3281639' },
    { id: 3, titulo: 'Company Announcement No 19/2026: transacciones de directivos (Lars Vestergaard)', editor: 'Royal Unibrew A/S (Inderes)', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://www.inderes.dk/en/releases/transactions-by-persons-discharging-managerial-responsibilities-andor-persons-closely-associated-51' },
    { id: 4, titulo: 'Company Announcement No 45/2026: transacciones de directivos (Peter Ruzicka por Ventotene Holding)', editor: 'Royal Unibrew A/S (Inderes)', tipo: 'Primaria', fecha: '2026-08-20', url: 'https://www.inderes.dk/en/releases/transactions-by-persons-discharging-managerial-responsibilities-andor-persons-closely-associated-52' },
    { id: 5, titulo: 'Royal Unibrew: insynshandel (tabla de operaciones de directivos)', editor: 'Affärsvärlden', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.affarsvarlden.se/aktie/royal-unibrew' },
  ],
};
w('C', C);

// ───────────────────────────── D. Mercado y valoración ─────────────────────────────
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Royal Unibrew A/S', nombre_corto: 'Royal Unibrew', ticker: 'RBREW', isin: 'DK0060634707', mercado: 'Nasdaq Copenhague', indice_referencia: 'OMX Copenhagen 25',
    pais: 'Dinamarca', pais_iso: 'DK', sector: 'Consumo básico', industria: 'Bebidas (cerveza y refrescos)', sede: 'Faxe (Dinamarca)', fundacion: '1989', empleados: 4352, web: 'www.royalunibrew.com',
    precio: 441.2, fecha_precio: '2026-10-21', acciones: 47.36, capitalizacion_publicada: 20910, free_float_pct: 85.0,
    max_52s: 653.5, min_52s: 394.0, volumen_medio_diario: '≈ 58 M DKK/día (3 meses; 133.000 acciones)', proximos_resultados: '2026-11-11',
  },
  consenso: {
    guidance: 'Guía de 2026 (repetida el 17-ago-2026): EBIT orgánico +6-10 %, 2.325-2.425 M; ventas parecidas a las de 2025 por la salida de aperitivos y negocios de poco margen; gastos financieros de unos 250 M; tipo impositivo del 22 %; capex de un 7 % de las ventas; sin compras relevantes [A2]. Objetivo a largo plazo: EBIT orgánico +6-8 % al año, deuda < 2,5 veces el EBITDA y dividendo del 40-60 % [A1]. Con PepsiCo (21-abr-2026): EBIT en línea con el +6-8 % hasta 2028, caída de ventas y volumen en 2029, ≈ 300 M de costes de transición y EBIT de 2030 por encima del de 2028 [A7].',
    estimaciones: [
      { periodo: '2026e', ingresos: 15820, ebitda: null, ebit: null, bpa: 34.06, dpa: null, fuente: 'S&P Global vía Yahoo Finance (14 analistas) [D2]' },
      { periodo: '2027e', ingresos: 16437, ebitda: null, ebit: null, bpa: 37.65, dpa: null, fuente: 'S&P Global vía Yahoo Finance (14 analistas) [D2]' },
    ],
    recomendaciones: { n_analistas: 15, comprar: 4, mantener: 10, vender: 1, po_medio: 489.27, po_min: 420, po_max: 570 },
    revisiones: 'Tras el anuncio de PepsiCo (21-22-abr-2026) los bancos rebajaron recomendación y objetivo: BNP Paribas a neutral (690 → 440 DKK), Deutsche Bank a mantener (665 → 425), Goldman Sachs a neutral (650 → 465), Nordea a mantener, Citi de 570 a 450 y Morgan Stanley de 595 a 505 [D3]. Las recomendaciones pasaron de 6 compras, 8 mantener y 1 venta hace tres meses a 4, 10 y 1 hoy [D2]. Tras el semestral, el BPA de 2026 bajó de 34,41 a 34,12 y el objetivo medio se quedó en 490 DKK [D11]. Una sola fuente da estimaciones completas (S&P Global, vía Yahoo y Stock Analysis); no hay EBITDA ni 2028e gratis.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -23.2, indice_pct: 1.8, sector_pct: 9.1 },
      { periodo: '1 año', accion_pct: -13.4, indice_pct: 9.3, sector_pct: 4.6 },
      { periodo: '3 años (anual.)', accion_pct: -4.8, indice_pct: 4.8, sector_pct: -0.9 },
      { periodo: '5 años (anual.)', accion_pct: -11.0, indice_pct: -0.9, sector_pct: -3.4 },
      { periodo: '10 años (anual.)', accion_pct: 3.1, indice_pct: null, sector_pct: 0.7 },
    ],
    anual: null,
    beta: 0.26, volatilidad_pct: 23.0, max_drawdown_pct: null, posicion_corta_pct: null,
    comentario: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 737.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 495.3, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 451.1, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 505.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 574.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Cerveceras y embotelladores europeos y grandes cotizadas del sector, con cifras de Yahoo Finance del 21-oct-2026 convertidas a DKK con los tipos del BCE: Carlsberg (rival directo y nuevo embotellador de PepsiCo), Heineken (socio y rival), AB InBev, Coca-Cola Europacific Partners (refrescos en Escandinavia y Benelux), Olvi (Finlandia y bálticos), Molson Coors y Asahi. Fuera: Coca-Cola HBC (la compra de Coca-Cola Beverages Africa distorsiona el crecimiento y Yahoo mezcla peniques y libras) y Harboes (sin consenso). Valor empresa = capitalización + deuda − caja de Yahoo (sin minoritarios). PER de los próximos 12 meses = 2,3/12 del BPA de 2026e + 9,7/12 del de 2027e [D12].',
    empresas: [
      { nombre: 'Carlsberg', ticker: 'CARL-B.CO', pais: 'DK', capitalizacion: 127572, ev_ventas: 1.97, ev_ebitda_ltm: 9.7, ev_ebitda_ntm: null, per_ntm: 14.0, crecimiento_pct: 5.5, margen_ebitda_pct: 20.4, roic_pct: null, dn_ebitda: 2.7, fcf_yield_pct: 6.1 },
      { nombre: 'Heineken', ticker: 'HEIA.AS', pais: 'NL', capitalizacion: 316965, ev_ventas: 2.05, ev_ebitda_ltm: 10.9, ev_ebitda_ntm: null, per_ntm: 13.7, crecimiento_pct: 7.9, margen_ebitda_pct: 18.8, roic_pct: null, dn_ebitda: 3.2, fcf_yield_pct: 7.1 },
      { nombre: 'AB InBev', ticker: 'ABI.BR', pais: 'BE', capitalizacion: 1089754, ev_ventas: 3.65, ev_ebitda_ltm: 11.6, ev_ebitda_ntm: null, per_ntm: 17.3, crecimiento_pct: 6.5, margen_ebitda_pct: 31.5, roic_pct: null, dn_ebitda: 3.3, fcf_yield_pct: 6.5 },
      { nombre: 'Coca-Cola Europacific Partners', ticker: 'CCEP', pais: 'GB', capitalizacion: 325505, ev_ventas: 2.52, ev_ebitda_ltm: 15.2, ev_ebitda_ntm: null, per_ntm: 20.5, crecimiento_pct: 4.5, margen_ebitda_pct: 16.5, roic_pct: null, dn_ebitda: 2.9, fcf_yield_pct: 3.6 },
      { nombre: 'Olvi', ticker: 'OLVAS.HE', pais: 'FI', capitalizacion: 4172, ev_ventas: 0.87, ev_ebitda_ltm: 5.5, ev_ebitda_ntm: null, per_ntm: 8.1, crecimiento_pct: 7.7, margen_ebitda_pct: 16.0, roic_pct: null, dn_ebitda: 0.6, fcf_yield_pct: 5.3 },
      { nombre: 'Molson Coors', ticker: 'TAP', pais: 'US', capitalizacion: 49115, ev_ventas: 1.19, ev_ebitda_ltm: 5.8, ev_ebitda_ntm: null, per_ntm: 8.2, crecimiento_pct: -0.2, margen_ebitda_pct: 20.4, roic_pct: null, dn_ebitda: 2.6, fcf_yield_pct: 12.7 },
      { nombre: 'Asahi Group', ticker: '2502.T', pais: 'JP', capitalizacion: 102973, ev_ventas: 1.3, ev_ebitda_ltm: 8.8, ev_ebitda_ntm: null, per_ntm: 12.1, crecimiento_pct: 9.8, margen_ebitda_pct: 14.7, roic_pct: null, dn_ebitda: 3.3, fcf_yield_pct: 3.9 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2023-07', objetivo: 'Vrumona (refrescos, Países Bajos)', comprador: 'Royal Unibrew', ev: 2236, ev_ventas: 1.5, ev_ebitda: 12.0, prima_pct: null, excluir: false, comentario: 'Valor empresa de 300 M EUR; EBITDA normalizado de 2022 de 25 M EUR y ventas de 200 M EUR [A4].' },
      { fecha: '2024-07', objetivo: 'Britvic (refrescos, Reino Unido)', comprador: 'Carlsberg', ev: 36200, ev_ventas: null, ev_ebitda: 13.6, prima_pct: null, excluir: false, comentario: 'Valor empresa de ≈ 4.100 M GBP sobre un EBITDA ajustado de 303 M GBP; 10,2 veces con sinergias [D9].' },
      { fecha: '2025-09', objetivo: 'FIFCO (bebidas y distribución, Centroamérica)', comprador: 'Heineken', ev: 20400, ev_ventas: null, ev_ebitda: 11.6, prima_pct: null, excluir: false, comentario: '3.200 M USD; 11,6 veces el EBITDA de 2024 según Heineken (12,3 según FIFCO) [D10].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA, EBIT y BPA de 2028e del consenso', tipo: 'Complemento', intentos: '1) Yahoo/S&P Global (solo 2026e y 2027e, sin EBITDA); 2) Stock Analysis (2027-2028 de pago); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Stock Analysis (n.d.); 2) registro de la Finanstilsynet (xlsx mensual, solo ≥ 0,5 %: no figura); 3) Inderes', decision: 'Omitido' },
  ],
  fuentes: [
    { id: 1, titulo: 'Históricos diarios de RBREW.CO, ^OMXC25 y EXH3.DE (bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/RBREW.CO/history' },
    { id: 2, titulo: 'Royal Unibrew: estimaciones (earningsTrend), objetivo medio y tendencia de recomendaciones', editor: 'Yahoo Finance (datos de S&P Global)', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/RBREW.CO/analysis' },
    { id: 3, titulo: 'BNP Paribas Downgrades Royal Unibrew to Neutral, Cuts PT (y rebajas de Deutsche Bank, Goldman Sachs, Nordea, Citi y Morgan Stanley)', editor: 'Placera / MT Newswires', tipo: 'Prensa', fecha: '2026-04-22', url: 'https://www.placera.se/telegram/royal-unibrew-bnp-paribas-downgrades-royal-unibrew-to-neutral-cuts-pt-20260422' },
    { id: 4, titulo: 'Royal Unibrew (CPH:RBREW) Statistics y Forecast', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://stockanalysis.com/quote/cph/RBREW/statistics/' },
    { id: 5, titulo: 'Rendimiento de la deuda federal alemana a 10 años, diario: 3,47 % el 21-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
    { id: 6, titulo: 'Tipos de cambio de referencia del euro del 21-oct-2026 (DKK 7,4746; USD 1,1234; GBP 0,83825; JPY 177,36)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
    { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 8, titulo: 'Betas por sector, Europa (Beverage alcoholic / soft)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html' },
    { id: 9, titulo: 'Recommended offer to acquire Britvic plc (anuncio de Carlsberg, 8-jul-2024)', editor: 'Carlsberg Group', tipo: 'Primaria', fecha: '2024-07-08', url: 'https://www.carlsberggroup.com/media/ch3jhoji/33_08072024_recommended-offer-to-acquire-britvic-plc.pdf' },
    { id: 10, titulo: 'FIFCO announces the sale of its beverage, food and retail business to HEINEKEN', editor: 'FIFCO / Heineken', tipo: 'Primaria', fecha: '2025-09-22', url: 'https://www.fifco.com/wp-content/uploads/2025/09/FIFCO-announces-the-sale-of-its-beverage-food-and-retail-business-to-HEINEKEN.pdf' },
    { id: 11, titulo: 'Royal Unibrew: resultados del primer semestre frente a las previsiones (BPA −3,6 %; objetivo medio 490 DKK)', editor: 'Simply Wall St (vía Webull)', tipo: 'Analistas', fecha: '2026-08-20', url: 'https://www.webull.ca/news-detail/15433180209783808' },
    { id: 12, titulo: 'Comparables: quoteSummary de CARL-B.CO, HEIA.AS, ABI.BR, CCEP, OLVAS.HE, TAP y 2502.T (precio, capitalización, deuda, caja, EBITDA, ventas y estimaciones de 2026-2027)', editor: 'Yahoo Finance (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/CARL-B.CO/key-statistics' },
    { id: 13, titulo: 'Share buy-back program (Company Announcement No 54/2026)', editor: 'Royal Unibrew A/S (Ritzau)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://via.ritzau.dk/files/90446/15232393/578436/en' },
  ],
};
w('D', D);

// ───────────────────────────── E. Sentimiento ─────────────────────────────
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'getquin (foro de inversores, hilo de Royal Unibrew)', fecha: '2026-08', n_comentarios: 15, tono: 'Positivo', resumen: 'Un inversor danés la defiende como valor defensivo de consumo básico «en fase de recuperación tras el mínimo de abril», prefiere mirar la caja libre al EBITDA ajustado y espera el semestral; las respuestas dudan de cuánto pesa PepsiCo [E1].' },
      { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-08', n_comentarios: 10, tono: 'Dividido', resumen: 'Las narrativas alcistas se apoyan en la exportación y las marcas premium; las actualizaciones recortan el valor razonable tras PepsiCo y señalan el abanico de objetivos de 425 a 570 DKK [E2].' },
      { plataforma: 'Affärsvärlden (comentario y lectores)', fecha: '2026-04', n_comentarios: 5, tono: 'Dividido', resumen: 'Habla de «crisis de la cola» para la cervecera danesa, pero mantiene la recomendación de compra porque cree tácticamente equivocado rendirse tras la caída [E3, E4].' },
      { plataforma: 'Prensa danesa (sn.dk / Ritzau)', fecha: '2026-04', n_comentarios: 0, tono: 'Negativo', resumen: 'Mayor caída en 17 años el día del anuncio; el foco es la pérdida del 13 % de las ventas y los 300 M de costes [E5].' },
    ],
    temas: [
      { tema: 'Pérdida de PepsiCo en 2029', postura: 'Bajista', peso: 'Alto', contraste: 'Es real: ≈ 13 % de las ventas con margen cercano al del grupo y 300 M de costes [A7]; pero el EBIT de 2026-2028 no se toca y la empresa promete superar en 2030 el EBIT de 2028 [A7].' },
      { tema: 'Valor defensivo barato', postura: 'Alcista', peso: 'Medio', contraste: 'Cotiza a ≈ 12 veces el BPA de los próximos 12 meses frente a 16-32 veces en 2021-2025 [D1, A1]; el descuento descuenta la pérdida de PepsiCo, no un deterioro del negocio actual.' },
      { tema: 'Recompras y dividendo', postura: 'Alcista', peso: 'Medio', contraste: 'Unos 1.000 M de recompras en 2026 y 16 DKK de dividendo: ≈ 8 % de la capitalización devuelto en un año [A2, D13].' },
      { tema: 'Consumo flojo y menos cerveza', postura: 'Dividida', peso: 'Bajo', contraste: 'El volumen sube (+1,6 % orgánico en el 1S26) por refrescos, energéticas y bebidas listas, no por la cerveza [A2].' },
    ],
    lectura: 'El inversor particular está dividido y sin euforia ni capitulación: ve la acción barata y defensiva, y teme que PepsiCo sea el principio de más pérdidas de licencias. Coincide con el consenso de analistas, mayoritariamente en mantener (10 de 15) [D2]. El sentimiento no aporta un riesgo que el informe no recoja; confirma que el debate es solo PepsiCo y la capacidad de las marcas propias de sustituirla.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: [
    { id: 1, titulo: 'Royal Unibrew: hilo del foro (DK0060634707)', editor: 'getquin', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://app.getquin.com/en/stock/DK0060634707/royal-unibrew/forum-discussion' },
    { id: 2, titulo: 'Royal Unibrew: narrativas de la comunidad y actualizaciones', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://simplywall.st/community/narratives/dk/food-beverage-tobacco/cph-rbrew/royal-unibrew-shares/wo47dnga-international-expansion-and-premium-segments-will-drive-future-success-5bnx/updates' },
    { id: 3, titulo: 'Royal Unibrew: cola-kris för danska bryggeriet (comentario)', editor: 'Affärsvärlden', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.affarsvarlden.se/kommentar/royal-unibrew-cola-kris-for-danska-bryggeriet' },
    { id: 4, titulo: 'Affärsvärlden behåller köprådet för Royal Unibrew efter oväntad dansk smäll', editor: 'Börsvärlden', tipo: 'Prensa', fecha: '2026-04', url: 'https://borsvarlden.com/artiklar/affarsvarlden-behaller-kopradet-for-royal-unibrew-efter-ovantad-dansk-small' },
    { id: 5, titulo: 'Royal Unibrew-aktie på vej mod største fald i 17 år', editor: 'sn.dk (Ritzau)', tipo: 'Prensa', fecha: '2026-04-21', url: 'https://www.sn.dk/art6553339/koebenhavn-kommune/erhverv/royal-unibrew-aktie-paa-vej-mod-stoerste-fald-i-17-aar' },
  ],
};
w('E', E);
console.log('Notas A-E escritas en', DIR);
