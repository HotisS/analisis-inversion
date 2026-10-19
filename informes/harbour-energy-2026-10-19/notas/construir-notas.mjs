// Construye las notas A-E de Harbour Energy (corte 2026-10-19). Cada nota lleva sus propias fuentes [n].
// node informes/harbour-energy-2026-10-19/notas/construir-notas.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (n, o) => writeFileSync(join(DIR, `${n}.json`), JSON.stringify(o, null, 2));
const H = 'https://www.harbourenergy.com/media/';
const INV = 'https://www.investegate.co.uk/announcement/rns/harbour-energy--hbr/';

// ───────────────────────────── A: cuentas, balance, flujos, calidad, capital, negocio ─────────────────────────────
const A = {
  _estado: 'Completa. Cuentas 2021-2025 del ESEF (filings.xbrl.org) comprobadas con los comunicados de resultados y el informe anual 2025; semestre a 30-jun-2026 del comunicado del 6-ago-2026.',
  financieros: {
    cuenta: [
      { periodo: '2021', ingresos: 3618, coste_ventas: 2453, gastos_generales: 103, ebitda: 2381, amortizaciones: 1741, ebit: 640, resultado_financiero: -326, bai: 315, impuestos: 213, minoritarios: 0, beneficio_neto: 101, gastos_financieros: 375, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.12, dpa: 0.11, dpa_extraordinario: 0, acciones_diluidas: 872.5 },
      { periodo: '2022', ingresos: 5431, coste_ventas: null, gastos_generales: 121, ebitda: 3969, amortizaciones: 1428, ebit: 2541, resultado_financiero: -79, bai: 2462, impuestos: 2454, minoritarios: 0, beneficio_neto: 8, gastos_financieros: 358, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.01, dpa: 0.23, dpa_extraordinario: 0, acciones_diluidas: 912.1 },
      { periodo: '2023', ingresos: 3751, coste_ventas: null, gastos_generales: 149, ebitda: 2639, amortizaciones: 1707, ebit: 932, resultado_financiero: -316, bai: 616, impuestos: 571, minoritarios: 0, beneficio_neto: 45, gastos_financieros: 420, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.06, dpa: 0.25, dpa_extraordinario: 0, acciones_diluidas: 804 },
      { periodo: '2024', ingresos: 6226, coste_ventas: null, gastos_generales: 352, ebitda: 3959, amortizaciones: 2311, ebit: 1648, resultado_financiero: -429, bai: 1219, impuestos: 1312, minoritarios: 15, beneficio_neto: -108, gastos_financieros: 602, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 119, bpa: -0.10, dpa: 0.2619, dpa_extraordinario: 0, acciones_diluidas: 1083 },
      { periodo: '2025', ingresos: 10261, coste_ventas: null, gastos_generales: 536, ebitda: 7012, amortizaciones: 3522, ebit: 3490, resultado_financiero: -689, bai: 2801, impuestos: 2983, minoritarios: 81, beneficio_neto: -263, gastos_financieros: 1150, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 78, bpa: -0.15, dpa: 0.2124, dpa_extraordinario: 0, acciones_diluidas: 1710 },
    ],
    ltm: null,
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Fusión inversa de Chrysaor con Premier Oil (31-mar-2021): nace Harbour Energy, cotizada en Londres; 2021 incluye Premier nueve meses [7].' },
      { periodo: '2024', descripcion: 'Compra de casi todos los activos de producción de Wintershall Dea a BASF y LetterOne (3-sep-2024): Noruega, Alemania, Argentina, México, norte de África, CCS. Contraprestación de 5.291 M USD (921 M de acciones nuevas + caja) más 3.079 M de deuda y 1.548 M de bonos subordinados asumidos; 2024 lleva cuatro meses [4].' },
      { periodo: '2026', descripcion: 'LLOG (golfo de EE. UU., aguas profundas): cerrada el 11-feb-2026 por 3.127 M USD (2.592 en caja y 174,9 M de acciones); Waldorf (Reino Unido) el 10-jul-2026 por 163 M; venta de Indonesia (215 M) el 26-may-2026 [3, 9, 10].' },
    ],
    comentario: 'Los ingresos pasaron de 3.618 M USD en 2021 a 10.261 M en 2025, casi todo por compras (Wintershall Dea en sep-2024) y no por crecimiento propio: la producción del perímetro del Reino Unido cae año tras año. El EBITDA (EBITDAX menos exploración llevada a gastos) tiene márgenes del 63-73 %, propios de un productor, pero el beneficio neto es casi nulo o negativo en cuatro de cinco años: el impuesto real se come el 75-106 % del beneficio antes de impuestos (EPL británico del 38 % sobre el 40 % ordinario, 78 % en Noruega) y los deterioros y bajas de exploración son recurrentes (365 M y 200 M en 2025) [1, 2, 4]. El primer semestre de 2026 (Brent medio de 92 USD por la guerra de Irán) dio 6.408 M de ingresos y 21 céntimos de BPA [3].',
    ajustes: 'La empresa publica desde 2025 un «beneficio ajustado»: sin deterioros, bajas de exploración, partidas fiscales extraordinarias (311 M USD por alargar el EPL a 2030 en 2025; 1.469 M en 2022) ni diferencias de cambio no realizadas sobre los impuestos (485 M en 2025). BPA ajustado de 31 céntimos en 2025 (33 en 2024) frente a −15 publicado [2]. Nuestro BPA resta además el cupón de los bonos subordinados (81 M en 2025, ≈ 100 M al año desde 2026) y usa las acciones económicas (sin voto de LetterOne × 1,13 por su prima de dividendo). El EBITDA de la cuenta es el EBITDAX publicado menos la exploración llevada a gastos; los gastos no recurrentes dentro del EBITDA son los costes de las compras (119 M en 2024, 78 M en 2025) [2, 4].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 1916, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1250, margen_ebitda_pct: 65.2, bpa: 0.11, vs_consenso: null },
      { periodo: '2S24', ingresos: 4310, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2896, margen_ebitda_pct: 67.2, bpa: null, vs_consenso: null },
      { periodo: '1S25', ingresos: 5271, crecimiento_pct: 175.1, crecimiento_organico_pct: null, ebitda: 3888, margen_ebitda_pct: 73.8, bpa: 0.22, vs_consenso: null },
      { periodo: '2S25', ingresos: 4990, crecimiento_pct: 15.8, crecimiento_organico_pct: null, ebitda: 3308, margen_ebitda_pct: 66.3, bpa: 0.09, vs_consenso: null },
      { periodo: '1S26', ingresos: 6408, crecimiento_pct: 21.6, crecimiento_organico_pct: null, ebitda: 4465, margen_ebitda_pct: 69.7, bpa: 0.28, vs_consenso: null },
    ],
    ultima_presentacion: 'Harbour publica semestres (y avances de producción en mayo y noviembre). EBITDA = EBITDAX ajustado de la empresa; BPA = BPA ajustado por acción con voto (2S = año menos 1S, aproximado). 1S26 (6-ago-2026): 509 kbep/d, ingresos de 6.408 M, EBITDAX ajustado de 4.465 M, beneficio ajustado de 562 M (28 céntimos), flujo libre de 1.765 M, deuda neta de 5.170 M (0,7x) [3]. Siguiente: avance del tercer trimestre en noviembre de 2026 (sin fecha publicada).',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 14505, activo_corriente: 2294, pasivo_corriente: 4103, pasivo_total: 14031, fondo_comercio: 1327, intangibles: 874, inmovilizado_material: 7247, existencias: 211, clientes: 1342, proveedores: 1235, activos_contrato: null, pasivos_contrato: null, caja: 699, deuda_financiera: 2948, arrendamientos: 654, patrimonio_neto: 474, minoritarios: null, reservas: 75 },
      { periodo: '2022', activo_total: 12566, activo_corriente: 2127, pasivo_corriente: 4096, pasivo_total: 11545, fondo_comercio: 1327, intangibles: 880, inmovilizado_material: 5690, existencias: 143, clientes: 1403, proveedores: 1252, activos_contrato: null, pasivos_contrato: null, caja: 500, deuda_financiera: 1238, arrendamientos: 825, patrimonio_neto: 1021, minoritarios: null, reservas: 1456 },
      { periodo: '2023', activo_total: 9916, activo_corriente: 1546, pasivo_corriente: 2016, pasivo_total: 8363, fondo_comercio: 1302, intangibles: 1172, inmovilizado_material: 4836, existencias: 217, clientes: 873, proveedores: 915, activos_contrato: null, pasivos_contrato: null, caja: 286, deuda_financiera: 509, arrendamientos: 768, patrimonio_neto: 1553, minoritarios: null, reservas: 1093 },
      { periodo: '2024', activo_total: 30277, activo_corriente: 3917, pasivo_corriente: 5614, pasivo_total: 24026, fondo_comercio: 5062, intangibles: 5714, inmovilizado_material: 14578, existencias: 368, clientes: 2322, proveedores: 1755, activos_contrato: null, pasivos_contrato: null, caja: 805, deuda_financiera: 5229, arrendamientos: 792, patrimonio_neto: 6251, minoritarios: null, reservas: 807 },
      { periodo: '2025', activo_total: 29093, activo_corriente: 4113, pasivo_corriente: 3961, pasivo_total: 22887, fondo_comercio: 5062, intangibles: 5749, inmovilizado_material: 13210, existencias: 398, clientes: 1994, proveedores: 1424, activos_contrato: null, pasivos_contrato: null, caja: 846, deuda_financiera: 5151, arrendamientos: 634, patrimonio_neto: 6206, minoritarios: null, reservas: 53 },
    ],
    vencimientos: [
      { anio: '2027', importe: 1000 }, { anio: '2028', importe: 1140 }, { anio: '2029', importe: 1798 },
      { anio: '2031', importe: 1140 }, { anio: '2032', importe: 1026 }, { anio: '2035', importe: 900 },
    ],
    liquidez: 'Liquidez de 4.100 M USD a 30-jun-2026 (caja de 1.643 M y línea revolvente de 3.000 M sin disponer, refinanciada en julio hasta 2031 a 80 puntos básicos). Préstamo puente de 1.000 M (12 meses prorrogables, para LLOG) y préstamo a plazo de 1.000 M (tres años, SOFR + 1,467) [3, 11].',
    rating: 'Grado de inversión: Moody\'s Baa2 (perspectiva negativa), S&P BBB− (estable) y Fitch BBB− (estable) [3, 11].',
    coste_deuda_pct: 4.8,
    vida_media_anios: 4.5,
    otros_pasivos: 'Desmantelamiento: provisión de 7.423 M USD a 30-jun-2026 (7.021 M al cierre de 2025), con un activo fiscal diferido asociado de 2.739 M (≈ 39 %: el gasto desgrava al 40 % en el Reino Unido y al 78 % en Noruega, no en el EPL). Impuestos corrientes a pagar de 2.327 M (1.452 M al cierre de 2025): se pagan ≈ 60 % en el segundo semestre y ≈ 40 % en el primero del año siguiente. Bonos subordinados híbridos de 2.044 M dentro del patrimonio (cupón ≈ 100 M al año). Contraprestación contingente de 68 M; impuesto diferido pasivo de 5.409 M [1, 3].',
    comentario: 'El balance cambió de escala con Wintershall Dea (2024) y LLOG (2026): deuda financiera bruta de 7.011 M USD y deuda neta de 5.170 M a 30-jun-2026 (0,7 veces el EBITDAX de 12 meses, 7.605 M), más 2.044 M de híbridos y 7.423 M de desmantelamiento. El fondo de comercio (5.038 M) nace sobre todo del impuesto diferido de Wintershall y la empresa avisa de que se irá deteriorando a medida que ese impuesto revierta [1, 3, 4]. El circulante es pequeño salvo por el impuesto a pagar, que en 2026-2027 sube por los precios de la guerra.',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 1614, capex: 709, pagos_arrendamientos: 160, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 0, emision_acciones: null, intereses_en_financiacion: 205 },
      { periodo: '2022', flujo_operativo: 3130, capex: 684, pagos_arrendamientos: 254, adquisiciones: null, desinversiones: null, dividendos: 191, recompras: 361, emision_acciones: null, intereses_en_financiacion: 142 },
      { periodo: '2023', flujo_operativo: 2150, capex: 721, pagos_arrendamientos: 207, adquisiciones: 0, desinversiones: null, dividendos: 190, recompras: 249, emision_acciones: null, intereses_en_financiacion: 150 },
      { periodo: '2024', flujo_operativo: 1615, capex: 1544, pagos_arrendamientos: 265, adquisiciones: 1044, desinversiones: null, dividendos: 199, recompras: 0, emision_acciones: null, intereses_en_financiacion: 181 },
      { periodo: '2025', flujo_operativo: 3386, capex: 1946, pagos_arrendamientos: 257, adquisiciones: 0, desinversiones: null, dividendos: 455, recompras: 90, emision_acciones: null, intereses_en_financiacion: 246 },
    ],
    comentario: 'Capex = «inversión de capital» de la empresa (altas de inmovilizado y de exploración, sin desmantelamiento): 709 M USD en 2021 y 1.946 M en 2025; el desmantelamiento suma 226-374 M al año aparte. Flujo libre publicado: 0,7 bn en 2021, 2,1 bn en 2022, 0,1 bn en 2024 y 1,1 bn en 2025; 1.765 M en el 1S26 [2, 3, 4, 6]. Los impuestos se pagan con retraso (≈ 60 % en el segundo semestre y ≈ 40 % en el primero del año siguiente): parte del flujo del 1S26 es impuesto que sale en el 2S26 (≈ 2.400 M) y en el 1S27 [3, 13].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP',
    anios_auditor: 5,
    opinion: 'Favorable (sin salvedades) en 2025. EY audita a Harbour desde 2021 (y a Premier desde 2017); reelegida tras concurso, socio nuevo (Daniel Trotman) desde 2026; el FRC revisó la auditoría de 2024 [1].',
    comentario: 'Cuentas limpias pero ruidosas: el resultado publicado depende de impuestos extraordinarios (EPL), deterioros, bajas de exploración y diferencias de cambio sobre los impuestos. La empresa empezó a publicar un beneficio ajustado en 2025, y la diferencia con el publicado es grande (31 frente a −15 céntimos en 2025). El fondo de comercio de Wintershall se irá deteriorando por diseño [1, 2, 4].',
    senales: [
      { senal: 'BPA ajustado frente a NIIF', nivel: 'Media', comentario: '31 céntimos ajustado frente a −15 publicado en 2025: 485 M de diferencias de cambio no realizadas, 365 M de deterioros, 200 M de bajas y 311 M del EPL alargado [2].' },
      { senal: 'Tipo impositivo efectivo', nivel: 'Alta', comentario: '106 % en 2025, 108 % en 2024, 100 % en 2022 (cargo del EPL de 1.469 M): el impuesto real del negocio es del 75-80 % y cambia con la política fiscal [2, 4, 6].' },
      { senal: 'Fondo de comercio por impuestos diferidos', nivel: 'Media', comentario: 'Los 3.845 M de Wintershall nacen del impuesto diferido sin descontar; la empresa dice que «se cargará a resultados con el tiempo como deterioro» [4].' },
      { senal: 'Deterioros recurrentes', nivel: 'Media', comentario: '201 M en 2023, 393 M en 2024 y 365 M en 2025 (México, norte de África, Alemania); 27 M en el 1S26 [2, 3, 4].' },
      { senal: 'Reexpresión de 2024', nivel: 'Baja', comentario: 'Asignación del precio de Wintershall cerrada en 2025: 2024 reexpresado (EBITDAX de 4.006 a 4.027 M) [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Desde marzo de 2026 devuelve el 45-75 % del flujo libre cada año, con un dividendo base de 16,10 céntimos por acción con voto (≈ 300 M USD con la prima de las sin voto); hacia la parte baja mientras la deuda neta pase de 1 vez el EBITDAX. En 2025 repartió 478 M (≈ 45 % del flujo libre). En 2026: dividendo a cuenta de 8,05 céntimos (150 M, pagado el 24-sep), recompra de 250 M anunciada el 6-ago y compra de 53 M de acciones a BASF (190 M, 40 M dentro del programa) el 24-sep [2, 3, 15].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Premier Oil (fusión inversa con Chrysaor)', importe: null, ev_ebitda: null, financiacion: 'Acciones', resultado: 'Dio la cotización en Londres; los activos británicos de Premier y Chrysaor llevan años en declive y con deterioros [7].' },
      { anio: '2024', objetivo: 'Wintershall Dea (activos de producción de BASF y LetterOne)', importe: 11200, ev_ebitda: null, financiacion: 'Acciones (921 M), caja y deuda y bonos subordinados asumidos', resultado: 'Multiplicó la producción por dos y medio y diversificó fuera del Reino Unido; BASF y LetterOne pasaron a ser los mayores accionistas y BASF lleva todo 2026 vendiendo (47 % → 16,4 %) [4, 1].' },
      { anio: '2026', objetivo: 'LLOG Exploration (golfo de EE. UU.)', importe: 3127, ev_ebitda: null, financiacion: 'Caja (2.592 M, con préstamo puente y a plazo) y 174,9 M de acciones', resultado: '34 kbep/d, 271 Mbep 2P (22 años de vida), coste de 12 USD/bep e impuesto ≈ 23 %; la producción debería doblarse en 2028 [9, 10].' },
      { anio: '2026', objetivo: 'Waldorf (Reino Unido)', importe: 163, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada el 10-jul-2026: 14 kbep/d y 25 Mbep, con más de 400 M de caja y pérdidas fiscales que liberar [3].' },
    ],
    comentario: 'Harbour se ha hecho a base de compras grandes, bien en precio (Wintershall en mínimo de ciclo, LLOG antes de la subida de la guerra), y paga con el flujo y con deuda. El reparto está ligado al flujo libre, que es lo prudente en una petrolera. Lo que falta demostrar es la reposición de reservas sin comprar: la empresa se marca más del 100 % en 2025-2028 [2, 14].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Noruega', descripcion: 'Campos de Wintershall Dea (Aasta Hansteen, Maria, Nova, Dvalin, Njord…): 169 kbep/d en 2025, 180 en el 1S26.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 1465, resultado: 837 }, { periodo: '2025', ingresos: 4330, resultado: 1344 }] },
      { nombre: 'Reino Unido', descripcion: 'Mar del Norte británico (J-Area, Elgin-Franklin, Britannia, Catcher, Beryl, Clair): 155 kbep/d en 2025, 148 en el 1S26; EPL hasta 2030.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 3917, resultado: 714 }, { periodo: '2025', ingresos: 3870, resultado: 1393 }] },
      { nombre: 'Argentina', descripcion: 'Gas de Tierra del Fuego y Vaca Muerta (Aguada Pichana, San Roque): 74 kbep/d en el 1S26.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 147, resultado: 18 }, { periodo: '2025', ingresos: 574, resultado: 162 }] },
      { nombre: 'Alemania', descripcion: 'Campos maduros de petróleo y gas en tierra (Mittelplate): 28 kbep/d en el 1S26.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 246, resultado: -42 }, { periodo: '2025', ingresos: 680, resultado: -119 }] },
      { nombre: 'México, norte de África, Sudeste Asiático y CCS', descripcion: 'Zama y Kan (México), Egipto, Argelia y Libia, Vietnam (Indonesia vendida en 2026) y almacenamiento de CO2.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 436, resultado: 66 }, { periodo: '2025', ingresos: 632, resultado: -298 }] },
      { nombre: 'Corporativo y comercialización', descripcion: 'Venta centralizada de crudo y gas (compra a los segmentos y vende fuera) y estructura central.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 1894, resultado: 61 }, { periodo: '2025', ingresos: 6981, resultado: 1008 }] },
      { nombre: 'Eliminaciones', descripcion: 'Ventas entre segmentos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: -1879, resultado: -6 }, { periodo: '2025', ingresos: -6806, resultado: 0 }] },
    ],
    geografias: [
      { nombre: 'Noruega', peso_pct: 35 }, { nombre: 'Reino Unido', peso_pct: 29 }, { nombre: 'Argentina', peso_pct: 15 },
      { nombre: 'Estados Unidos', peso_pct: 7 }, { nombre: 'Resto (Alemania, México, norte de África, Sudeste Asiático)', peso_pct: 14 },
    ],
    geografias_criterio: 'origen (producción del 1S26 en kbep/d)',
    kpis: [
      { kpi: 'Producción (kbep/d)', valor_anterior: '474 (2025)', valor_actual: '509 (1S26)', variacion: '+7 %', comentario: 'Guía 2026 de 490-500; 475-500 en 2027-2030 [3, 11].' },
      { kpi: 'Coste operativo (USD/bep)', valor_anterior: '12,8 (2025)', valor_actual: '≈ 14,5 (guía 2026)', variacion: '+13 %', comentario: 'Sube por la mezcla (México, Alemania) y la inflación [3].' },
      { kpi: 'Reservas 2P (Mbep)', valor_anterior: '1.121 (fin 2025)', valor_actual: '≈ 1.400 (con LLOG y Waldorf)', variacion: '+25 %', comentario: '≈ 7-8 años de vida al ritmo actual; 2C de 1.839 Mbep [2, 11].' },
      { kpi: 'Flujo libre (M USD)', valor_anterior: '1.066 (2025)', valor_actual: '1.765 (1S26)', variacion: 'n. s.', comentario: 'Guía 2026 ≈ 1.800 M con 80 USD y 16 USD/mscf en el 2S [3].' },
      { kpi: 'Deuda neta / EBITDAX', valor_anterior: '0,6x (2025)', valor_actual: '0,7x (1S26)', variacion: '+0,1x', comentario: 'Tras pagar LLOG; objetivo por debajo de 1x [3].' },
      { kpi: 'Precio realizado (antes de coberturas)', valor_anterior: '68 USD/bbl y 11,3 USD/mscf (2025)', valor_actual: '90 USD/bbl y 15,0 USD/mscf (1S26)', variacion: '+32 %', comentario: 'Coberturas: −270 M en el 1S26 [3].' },
    ],
    clientes: 'Vende crudo y gas en mercados líquidos (Brent, NBP, TTF) a grandes compradores; sin concentración relevante de clientes. El gas europeo es ≈ 40 % de la producción, el líquido ≈ 40 % y el gas fuera de Europa (Argentina, norte de África) ≈ 20 % [3, 11].',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: [
    { id: 1, titulo: 'Annual Report and Accounts 2025 (cuentas consolidadas, notas, remuneración, gobierno)', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-03-05', url: H + 'a11hxbdn/harbour-energy-annual-report-accounts-2025_web.pdf' },
    { id: 2, titulo: '2025 Full Year Results (comunicado y estados financieros)', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-03-05', url: H + 'ppzaeeqo/harbour-energy-2025-full-year-results.pdf' },
    { id: 3, titulo: 'Half Year Results 2026 (estados financieros intermedios a 30-jun-2026)', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-08-06', url: H + 'xhka5ldn/harbour-energy-half-year-results-2026-2.pdf' },
    { id: 4, titulo: '2024 Full Year Results', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2025-03-06', url: H + '3azjfyq4/harbour-energy-plc-2024-full-year-results-6-march-2025-final.pdf' },
    { id: 5, titulo: 'Full Year Results 2023', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2024-03-07', url: H + 'hypjgsuu/harbour_energy_full_year_results_2023.pdf' },
    { id: 6, titulo: '2022 Full Year Results', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2023-03-09', url: H + 'mrhpslnp/2022-fy-results-press-release-vfinal.pdf' },
    { id: 7, titulo: '2021 Annual Results', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2022-03-16', url: H + 'yu3oswzo/220316-2021-annual-results-press-release-vf-full.pdf' },
    { id: 8, titulo: 'Informes anuales ESEF 2020-2025 (XBRL), LEI 213800YPC42DYBKVPF97', editor: 'XBRL International (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://filings.xbrl.org/213800YPC42DYBKVPF97/' },
    { id: 9, titulo: 'Strategic acquisition of LLOG Exploration (anuncio)', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2025-12-22', url: H + 'l3cm1w4o/harbour_energy_strategic_acquisition_of_llog_exploration_december_2025.pdf' },
    { id: 10, titulo: 'Completion of LLOG acquisition', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-02-11', url: H + 't4jfmkwo/harbour-energy-completion-of-llog-acquisition-11-february-2026.pdf' },
    { id: 11, titulo: 'Investor Presentation, October 2026 (guía, deuda, reservas, coberturas)', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-10', url: H + 'rnojrs1e/harbour-energy-investor-presentation-october-2026.pdf' },
    { id: 12, titulo: 'Trading and Operations Update, 7 May 2026', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-05-07', url: H + 'ii1lkg44/harbour-energy-trading-operations-update-7th-may-2026.pdf' },
    { id: 13, titulo: 'Half Year Results 2026: transcripción de la conferencia', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-08-06', url: H + '0ipojjuv/harbour-energy-2026-half-year-results-transcript.pdf' },
    { id: 14, titulo: 'Capital Markets Update, 6 March 2025', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2025-03-06', url: H + 'olxdz4ps/harbour-energy-plc-capital-markets-update-6-march-2025.pdf' },
    { id: 15, titulo: 'RNS: programa de recompra de 250 M USD (6-ago) y compra fuera de mercado junto a la venta de BASF (10, 11 y 24-sep-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-09-24', url: INV + 'completion-of-off-market-buyback-and-voting-rights/9790015' },
  ],
};
w('A', A);

// ───────────────────────────── B: sector, competencia, negocio ─────────────────────────────
const B = {
  _estado: 'Completa. Sector: productores independientes de petróleo y gas con base en el mar del Norte (Reino Unido y Noruega) y cartera internacional. Sin ficha sectorial previa en el repo; datos de producción de las estadísticas oficiales (NSTA, Offshore Norge/Sokkeldirektoratet).',
  sector: {
    definicion: 'Mercado relevante: la producción de petróleo y gas de la plataforma continental del Reino Unido y Noruega, donde Harbour tiene ≈ 64 % de su producción. Los precios los fija el mercado mundial (Brent) y el europeo de gas (NBP, TTF): Harbour es tomadora de precios. El 36 % restante (Argentina, golfo de EE. UU., México, Alemania, norte de África) compite en sus propias cuencas [1, 2].',
    tamano: '≈ 5,1 millones de bep/día en 2025: Noruega 4,1 (239 MSm³ o.e.) y Reino Unido ≈ 1,0 (0,60 de petróleo y 0,41 de gas); a 60-70 USD/bep, ≈ 120.000 M USD de valor de producción al año [3, 4].',
    unidad_serie: 'miles de bep/día (producción del Reino Unido y Noruega)',
    serie: [{ anio: '2025', tamano: 5130 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: -2,
    cr5_pct: 55,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Precio del Brent', efecto: '+', horizonte: 'Corto plazo', evidencia: 'Guerra de Irán: pico de 119 USD en marzo de 2026, 73 en junio y 100-110 en sep-oct; la curva baja a 87 en dic-27 y 78 en dic-28 [5]. +5 USD/bbl = +170 M USD de flujo libre de Harbour en 2026 [1].' },
      { driver: 'Precio del gas europeo (TTF, NBP)', efecto: '+', horizonte: 'Corto plazo', evidencia: 'TTF a 86 EUR/MWh en octubre; la curva baja a ≈ 45 en 2028 con el gas licuado nuevo de EE. UU. y Qatar [5]. +1 USD/mscf = +150 M USD de flujo libre [1].' },
      { driver: 'Política fiscal del Reino Unido', efecto: '−', horizonte: 'Medio plazo', evidencia: 'EPL del 38 % (78 % en total) alargado al 31-mar-2030 y sustituido después por un mecanismo permanente de precios (OGPM); sin licencias nuevas de exploración [2, 6].' },
      { driver: 'Declino de las cuencas maduras', efecto: '−', horizonte: 'Estructural', evidencia: 'La producción británica cae ≈ 5-10 % al año sin inversión nueva; Noruega mantiene la meseta con proyectos aprobados en 2022-2023 [3, 4].' },
      { driver: 'Transición energética y demanda de gas', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Europa necesita gas propio tras Rusia y Ormuz; a la vez, la presión regulatoria sobre el petróleo y el carbono limita licencias y encarece el capital [2, 6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Los productores no compiten por clientes: venden a precio de mercado. La rivalidad es por licencias, compras de activos y equipos de perforación.' },
      { fuerza: 'Poder de los clientes', intensidad: 1, justificacion: 'Mercados de materias primas líquidos y globales; ningún comprador fija precio.' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Plataformas de perforación, buques y servicios con inflación de costes en los picos de precio; el Estado (fisco) es el «proveedor» más poderoso: se queda con el 78 % del beneficio.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Capital intensivo y licencias escasas; pero los activos maduros cambian de manos a menudo (compras a las grandes, capital privado).' },
      { fuerza: 'Sustitutos', intensidad: 3, justificacion: 'Renovables, electrificación y bombas de calor sustituyen gas y petróleo a largo plazo; a 5 años, el gas europeo sigue siendo necesario.' },
    ],
    ciclo: { posicion: 'Pico', comentario: 'Precios de crisis por la guerra de Irán y el cierre de Ormuz (Brent 100-110 USD, TTF 86 EUR/MWh) con una curva de futuros muy invertida: el mercado descuenta que 2026-2027 son años de pico y que 2028-2029 vuelven a 70-78 USD [5].' },
    regulacion: 'Reino Unido: impuesto corporativo del 30 % + recargo del 10 % + EPL del 38 % (78 %) hasta el 31-mar-2030, con suelo de precios (si el gas y el petróleo bajan de 54 USD/bbl y 0,59 GBP/termia durante dos trimestres, el EPL se desactiva); desde 2030, OGPM permanente. El gobierno no concede licencias nuevas de exploración y exige compatibilidad climática en los proyectos. Noruega: 78 % estable con deducción inmediata de la inversión. EE. UU.: ≈ 23 % efectivo en LLOG [1, 2, 6].',
    tendencias: 'Las grandes petroleras salen del mar del Norte británico y los independientes consolidan (Harbour con Wintershall, Ithaca con Eni UK, Equinor y Shell con Adura); los productores europeos diversifican hacia EE. UU., Latinoamérica y África buscando regímenes fiscales más bajos (Harbour con LLOG) y hacia la captura de CO2 [1, 2, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 6,
    posicion: 'Mayor productor independiente del Reino Unido (≈ 15 % de su producción) y uno de los grandes de Noruega (≈ 4 %); ≈ 6 % de la producción conjunta [1, 3, 4].',
    competidores: [
      { nombre: 'Equinor', pais: 'Noruega', ticker: 'EQNR', ingresos: null, cuota_pct: 50, margen_ebit_pct: null, comentario: 'Operador dominante de Noruega (estatal al 67 %); también en el Reino Unido (Adura con Shell).' },
      { nombre: 'Aker BP', pais: 'Noruega', ticker: 'AKRBP', ingresos: 11889, cuota_pct: 10, margen_ebit_pct: null, comentario: 'El independiente noruego de referencia: Johan Sverdrup, Yggdrasil; coste ≈ 7 USD/bep.' },
      { nombre: 'Vår Energi', pais: 'Noruega', ticker: 'VAR', ingresos: 10667, cuota_pct: 9, margen_ebit_pct: null, comentario: 'Filial cotizada de Eni; crecimiento por Johan Castberg y Balder.' },
      { nombre: 'Ithaca Energy', pais: 'Reino Unido', ticker: 'ITH', ingresos: 3185, cuota_pct: 12, margen_ebit_pct: null, comentario: 'Rival directo en el Reino Unido tras absorber Eni UK; dividendo alto, sin diversificar fuera.' },
      { nombre: 'Serica Energy y EnQuest', pais: 'Reino Unido', ticker: 'SQZ / ENQ', ingresos: 2073, cuota_pct: 5, margen_ebit_pct: null, comentario: 'Independientes británicos pequeños, muy expuestos al EPL.' },
    ],
    foso: {
      veredicto: 'Ninguno',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: vende una materia prima.' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'Los compradores cambian de vendedor sin coste.' },
        { fuente: 'Intangibles', puntuacion: 1, evidencia: 'Licencias y conocimiento del subsuelo; no dan precio, solo acceso.' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Coste operativo de ≈ 14,5 USD/bep, en la mitad del sector (Aker BP, por debajo; EnQuest, por encima); LLOG a 12 [1, 9].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Las infraestructuras (oleoductos, plataformas) dan ventaja local a quien las opera en cada zona (J-Area, Aasta Hansteen).' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el negocio no es un competidor, sino el precio y el fisco: una vuelta del Brent a 60 USD y del TTF a 25-30 EUR/MWh (antes de la guerra) dejaría el beneficio en una fracción del actual, y el Reino Unido ha cambiado su régimen fiscal cuatro veces desde 2022 [2, 6].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Harbour Energy es el mayor productor independiente de petróleo y gas del Reino Unido y uno de los mayores de Europa: produce ≈ 500.000 barriles equivalentes al día en Noruega, el Reino Unido, Argentina, el golfo de EE. UU., Alemania, México y el norte de África, y desarrolla almacenamiento de CO2 en el Reino Unido y Dinamarca [1].',
    como_gana_dinero: 'Extrae petróleo y gas y los vende a precio de mercado: en 2025 ingresó 10.261 M USD con un coste operativo de 12,8 USD/bep, un EBITDAX de 7.196 M (70 % de margen) y una amortización de las reservas de 16-17 USD/bep. El Estado se queda con el 75-80 % del beneficio antes de impuestos en el Reino Unido y Noruega, y la deuda se lleva otros 600-700 M al año: del EBITDAX quedan ≈ 600 M de beneficio ajustado. Sin inversión (≈ 2.000 M al año), la producción caería un 10-15 % al año [1, 8].',
  },
  huecos: [
    { seccion: 'sector', campo: 'Serie histórica de 5 años del tamaño del mercado', tipo: 'Complemento', intentos: '1) norskpetroleum.no (solo 2025 en la página leída); 2) NSTA vía Rigzone (2025); 3) OEUK Business Outlook (proyección, no serie)', decision: 'Omitido: se da 2025 y la tendencia esperada (−2 % anual combinado: declive británico, meseta noruega).' },
  ],
  fuentes: [
    { id: 1, titulo: 'Half Year Results 2026 y presentación de octubre de 2026 (producción, sensibilidades, guía)', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-10', url: H + 'rnojrs1e/harbour-energy-investor-presentation-october-2026.pdf' },
    { id: 2, titulo: 'Annual Report and Accounts 2025 (mercado, riesgos, régimen fiscal)', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-03-05', url: H + 'a11hxbdn/harbour-energy-annual-report-accounts-2025_web.pdf' },
    { id: 3, titulo: 'Producción de Noruega 2025 (239,2 MSm³ o.e.)', editor: 'Norsk Petroleum (Ministerio de Energía y Sokkeldirektoratet)', tipo: 'Estadística oficial', fecha: '2026-01', url: 'https://www.norskpetroleum.no/en/production-and-exports/oil-and-gas-production/' },
    { id: 4, titulo: 'UK oil and gas production 2025 (datos de la NSTA)', editor: 'Rigzone / North Sea Transition Authority', tipo: 'Estadística oficial', fecha: '2026-03', url: 'https://www.nstauthority.co.uk/data-centre/' },
    { id: 5, titulo: 'Futuros de Brent (NYMEX BZ) y TTF (ICE Endex) a 19-oct-2026', editor: 'Yahoo Finance y TradingView', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/BZ=F/futures' },
    { id: 6, titulo: 'Energy Profits Levy y Oil and Gas Price Mechanism (presupuesto de noviembre de 2025)', editor: 'HM Treasury / GOV.UK', tipo: 'Primaria', fecha: '2025-11', url: 'https://www.gov.uk/government/publications/energy-profits-levy' },
    { id: 7, titulo: 'Business Outlook 2026', editor: 'Offshore Energies UK (OEUK)', tipo: 'Sectorial', fecha: '2026', url: 'https://oeuk.org.uk/' },
    { id: 8, titulo: '2025 Full Year Results', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-03-05', url: H + 'ppzaeeqo/harbour-energy-2025-full-year-results.pdf' },
    { id: 9, titulo: 'Strategic acquisition of LLOG Exploration', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2025-12-22', url: H + 'l3cm1w4o/harbour_energy_strategic_acquisition_of_llog_exploration_december_2025.pdf' },
  ],
};
w('B', B);

// ───────────────────────────── C: directivos y gobierno ─────────────────────────────
const C = {
  _estado: 'Completa. Informe anual 2025 (gobierno y remuneración), RNS de la junta de 2026, cambios de consejo, operaciones de directivos y participaciones significativas (Investegate).',
  directivos: {
    equipo: [
      { nombre: 'Linda Z. Cook', cargo: 'Consejera delegada', desde: '2021', participacion_pct: 0.1, trayectoria: 'Carrera larga en Shell y después en EIG; consejera delegada de Chrysaor y de Harbour desde la fusión con Premier. Ha dirigido las compras de Wintershall Dea y LLOG [1].' },
      { nombre: 'Alexander Krane', cargo: 'Director financiero', desde: '2021', participacion_pct: 0.02, trayectoria: 'Ex director financiero de Aker BP; diseñó la financiación de Wintershall y LLOG con grado de inversión [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Producción y coste operativo de la guía anual', real: '186 kbep/d y 16 USD/bep, «dentro de la guía»', cumplida: 'Sí' },
      { anio: '2024', guia: 'Producción 150-165 kbep/d sin Wintershall; coste ≈ 18 USD/bep', real: '258 kbep/d con Wintershall (cuatro meses); 16,5 USD/bep', cumplida: 'Sí' },
      { anio: '2025', guia: 'Producción 450-475 kbep/d; capex total 2,2-2,4 bn', real: '474 kbep/d (parte alta); 12,8 USD/bep; 2,37 bn', cumplida: 'Sí' },
      { anio: '2026', guia: 'Producción 490-500 kbep/d (subida en agosto); flujo libre ≈ 1,8 bn', real: '509 kbep/d en el 1S26; 1,77 bn de flujo libre en el semestre', cumplida: 'En curso' },
    ],
    comentario: 'Equipo con historial de compras grandes bien ejecutadas y de cumplir la guía de producción y costes; el riesgo es de asignación de capital (comprar en la parte alta) más que de ejecución. La consejera delegada y el presidente vienen de EIG, que fue el accionista de control de Chrysaor y vendió todo en 2026 [1, 2, 6].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'R. Blair Thomas', cargo: 'Presidente (no ejecutivo)', tipo: 'Dominical', desde: '2021', comisiones: 'Nombramientos' },
      { nombre: 'Linda Z. Cook', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2021', comisiones: '' },
      { nombre: 'Alexander Krane', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2021', comisiones: '' },
      { nombre: 'Simon Henry', cargo: 'Consejero independiente coordinador (desde el 1-sep-2026)', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: 'Alan Ferguson', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Anne Stevens', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2021', comisiones: 'Remuneración (presidenta)' },
      { nombre: 'Margareth Øvrum', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2021', comisiones: 'Seguridad, salud y medio ambiente (presidenta)' },
      { nombre: 'Belgacem Chariag', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Seguridad' },
      { nombre: 'Louise Hough', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, remuneración' },
      { nombre: 'Gregory Hill', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Seguridad' },
      { nombre: 'Dirk Elvermann', cargo: 'Consejero dominical (BASF)', tipo: 'Dominical', desde: '2024', comisiones: '' },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: true,
    una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true,
    variable_ligado_rentabilidad: true,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: false,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: 97.72,
    voto_remuneracion_contra_pct: 2.28,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: 96.62,
    remuneracion_ceo: { anio: '2025', total: 14.8, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: 81 },
    remuneracion: 'La consejera delegada cobró 10,96 M GBP en 2025 (≈ 14,8 M USD a 1,3467), de los que 7,5 M fueron un premio extraordinario único en acciones por la integración de Wintershall (3,04 M en 2024); el director financiero, 3,23 M GBP. Salarios de 2026: 1,007 M GBP y 0,656 M GBP. Variable anual de hasta el 250 % y el 200 % del salario; plan a largo plazo de hasta el 300 % y el 240 % (rentabilidad total frente al FTSE 100, 40 %; frente al sector, 40 %; flujo libre, 20 %), más acciones restringidas del 100 % y el 80 %. En la junta de 2025 la política de remuneración tuvo un 21,19 % en contra (más del 20 %, lo que obliga a consultar); en la de 2026 el informe de remuneración pasó con el 97,72 % [1, 3, 4].',
    accionistas: [
      { nombre: 'BASF', pct: 16.38, tipo: 'Corporativo', variacion: '≈ 47 % a principios de 2026 → 16,38 % tras la colocación de septiembre (anuncio del 24-sep-2026); ha dicho que quiere salir' },
      { nombre: 'LetterOne (con acciones sin voto)', pct: 16.84, tipo: 'Inversor financiero', variacion: '3,60 % del voto + 251,5 M de acciones sin voto (16,84 % del capital total)' },
      { nombre: 'LLOG Holdings (vendedores de LLOG)', pct: 11.6, tipo: 'Inversor financiero', variacion: '174,9 M de acciones recibidas en febrero; el 70 % bloqueado hasta febrero de 2027' },
      { nombre: 'Capital flotante', pct: 55, tipo: 'Institucional', variacion: 'Sube con cada venta de BASF y EIG' },
    ],
    insiders: [
      { fecha: '2026-03-13', persona: 'Potomac View (EIG, vinculada al presidente)', operacion: 'Venta', acciones: 60000000, importe: 203 },
      { fecha: '2026-07-03', persona: 'Potomac View (EIG, vinculada al presidente)', operacion: 'Venta', acciones: 54775572, importe: 152 },
      { fecha: '2026-04-09', persona: 'Alexander Krane (director financiero)', operacion: 'Consolidación de acciones restringidas (venta para impuestos)', acciones: null, importe: null },
    ],
    control_y_defensas: 'Sin accionista de control desde que BASF bajó del 25 % en junio y vendió en septiembre: hoy BASF tiene el 16,4 % del voto y LetterOne el 16,8 % del capital (casi todo sin voto, por eso no hay una acción un voto). Hay acuerdos de relación con BASF y LetterOne (consejero dominical, bloqueos, recompras fuera de mercado autorizadas por la junta). EIG, de donde vienen el presidente y la consejera delegada, salió del todo en julio de 2026 [1, 2, 5, 6].',
    alertas: [
      'Exceso de papel: BASF (16,4 %) ha dicho que quiere salir y los vendedores de LLOG (11,6 %) quedan libres en febrero de 2027; cada colocación se ha hecho con descuento (2,05 GBP en julio, 2,66 GBP en septiembre).',
      'El presidente es socio de EIG, que vendió 114,8 M de acciones en 2026 por ≈ 355 M USD sin motivo declarado más allá de la desinversión del fondo.',
      'La política de remuneración de 2025 tuvo más de un 20 % de votos en contra y la consejera delegada cobró un premio único de 7,5 M GBP.',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: [
    { id: 1, titulo: 'Annual Report and Accounts 2025: gobierno corporativo e informe de remuneración', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-03-05', url: H + 'a11hxbdn/harbour-energy-annual-report-accounts-2025_web.pdf' },
    { id: 2, titulo: 'RNS: Holding(s) in Company (BASF, 24-sep-2026) y total voting rights (oct-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-10-01', url: INV + 'holding-s-in-company/9790123' },
    { id: 3, titulo: 'RNS: Result of AGM 2026 (7-may-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-05-07', url: INV + 'result-of-agm/9557650' },
    { id: 4, titulo: 'RNS: Directorate change (9-jun y 26-ago-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-08-26', url: INV + 'directorate-change/9741473' },
    { id: 5, titulo: 'RNS: Launch and pricing of accelerated placing (2 y 3-jul-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-07-03', url: INV + 'pricing-of-accelerated-placing-in-harbour-energy/9650704' },
    { id: 6, titulo: 'RNS: Director/PDMR shareholding (16-mar, 9-abr y 7-jul-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-07-07', url: INV + 'director-pdmr-shareholding/9656340' },
  ],
};
w('C', C);
console.log('A, B, C escritos');

// ───────────────────────────── D: identificación, consenso, bolsa, múltiplos, comparables, transacciones ─────────────────────────────
const TC = 0.013307; // USD por penique: GBPUSD 1,3307 (Yahoo, 19-oct-2026 15:47 UTC)
const NOK = 0.1062, GBP = 1.3307;
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const ntm = (a, b) => 0.2 * a + 0.8 * b; // a 19-oct quedan ≈ 2,4 meses de 2026: BPA de 12 meses = 0,2 × 2026e + 0,8 × 2027e
const comps = [
  // nombre, ticker, país, cap (M USD), EV (M USD), ventas, EBITDA (M USD, 12 m), precio USD, BPA 2026e, BPA 2027e (USD, Yahoo)
  ['Aker BP', 'AKRBP', 'NO', 236966 * NOK, 242008 * NOK, 11889, 10184, 375.7 * NOK, 3.61684, 3.05274],
  ['Vår Energi', 'VAR', 'NO', 141238 * NOK, 142801 * NOK, 10667, 8825, 56.58 * NOK, 0.74522, 0.49264],
  ['DNO', 'DNO', 'NO', 21742 * NOK, 22034 * NOK, 2416, 1553, 22.3 * NOK, 0.36, 0.44667],
  ['Ithaca Energy', 'ITH', 'GB', 4853 * GBP, 6105 * GBP, 3185, 1918, 2.94 * GBP, 0.28791, 0.28038],
  ['Serica Energy', 'SQZ', 'GB', 1064 * GBP, 1068 * GBP, 974, 277, 2.716 * GBP, 0.37288, 0.37514],
  ['Equinor', 'EQNR', 'NO', 1030261 * NOK, 1060413 * NOK, 113653, 41874, 435 * NOK, 5.75506, 4.48484],
  ['Murphy Oil', 'MUR', 'US', 6063, 7909, 2993, 1774, 42.295, 3.95409, 3.65237],
  ['APA', 'APA', 'US', 17227, 21580, 8572, 5720, 49.17, 6.55611, 4.97518],
  ['Talos Energy', 'TALO', 'US', 2980, 3734, 1979, 1133, 17.85, 1.18924, 1.49083],
  ['Kosmos Energy', 'KOS', 'US', 1673, 4310, 1585, 623, 2.81, 0.2675, 0.322],
];
const empresas = comps.map(([nombre, ticker, pais, cap, ev, v, e, p, b1, b2]) => ({
  nombre, ticker, pais, capitalizacion: Math.round(cap), ev_ventas: r2(ev / v), ev_ebitda_ltm: r1(ev / e), ev_ebitda_ntm: null,
  per_ntm: r1(p / ntm(b1, b2)), crecimiento_pct: null, margen_ebitda_pct: r1((e / v) * 100), roic_pct: null, dn_ebitda: null, fcf_yield_pct: null,
}));
empresas.push({ nombre: 'EnQuest', ticker: 'ENQ', pais: 'GB', capitalizacion: Math.round(582 * GBP), ev_ventas: r2((1461 * GBP) / 1099), ev_ebitda_ltm: r1((1461 * GBP) / 335), ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: r1((335 / 1099) * 100), roic_pct: null, dn_ebitda: null, fcf_yield_pct: null });
const pers = empresas.map((e) => e.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medPer = r1((pers[4] + pers[5]) / 2);

const PRECIO_GBP = 296.4; // cierre oficial del 19-oct-2026 (subasta de cierre; Yahoo, 15:35:06 UTC)
const ACC_ECON = 1789.4; // 1.505,2 M con voto (13-oct) + 251,5 M sin voto × 1,13
const D = {
  _estado: `Completa. Precio de cierre del 19-oct-2026 (296,4 peniques tras la subasta de cierre, Yahoo 15:35 UTC; la sesión de Londres cerró a las 16:30 hora local) pasado a USD con GBPUSD 1,3307 (15:47 UTC): ${r2(PRECIO_GBP * TC)} USD. El viernes 16-oct cerró a 293,6 peniques.`,
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'Harbour Energy plc', nombre_corto: 'Harbour Energy', ticker: 'HBR', isin: 'GB00BMBVGQ36', mercado: 'Bolsa de Londres (LSE, segmento principal)',
    indice_referencia: 'FTSE 250', pais: 'Reino Unido', pais_iso: 'GB', sector: 'Energía', industria: 'Exploración y producción de petróleo y gas',
    sede: 'Edimburgo (Escocia); oficinas centrales en Londres', fundacion: '2021 (Chrysaor, 2017; Premier Oil, 1934)', empleados: null, web: 'https://www.harbourenergy.com',
    precio: Math.round(PRECIO_GBP * TC * 10000) / 10000, fecha_precio: '2026-10-19', acciones: ACC_ECON, capitalizacion_publicada: Math.round(4405 * GBP),
    free_float_pct: 55, max_52s: r2(321 * TC), min_52s: r2(182 * TC), volumen_medio_diario: '≈ 5,6 M de acciones/día (3 meses), ≈ 15 M GBP/día', proximos_resultados: '2026-11 (avance del tercer trimestre, sin fecha publicada)',
  },
  consenso: {
    guidance: 'Guía de 2026 (6-ago-2026, presentación de octubre): producción de 490-500 kbep/d, coste operativo ≈ 14,5 USD/bep, capex total de 2,2-2,4 bn USD (con desmantelamiento) y flujo libre ≈ 1,8 bn con 80 USD/bbl y 16 USD/mscf en el segundo semestre; 2027-2030: 475-500 kbep/d y capex de 2,0-2,3 bn al año. Sensibilidad: +5 USD/bbl = +170 M de flujo libre; +1 USD/mscf = +150 M [3, 4].',
    estimaciones: [
      { periodo: '2026e', ingresos: 12844, ebitda: 9195, ebit: 5964, bpa: 0.7047, dpa: 0.19, fuente: 'MarketScreener, 11 analistas [5]' },
      { periodo: '2027e', ingresos: 11512, ebitda: 8134, ebit: 4733, bpa: 0.647, dpa: 0.2452, fuente: 'MarketScreener [5]' },
      { periodo: '2028e', ingresos: 9570, ebitda: 6129, ebit: 3207, bpa: 0.4485, dpa: 0.2349, fuente: 'MarketScreener [5]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 6, mantener: 5, vender: 0, po_medio: r2(349.02 * TC), po_min: r2(272.77 * TC), po_max: r2(508.37 * TC) },
    revisiones: 'Al alza y fuertes, por el precio del crudo: el BPA de 2026 del consenso de Yahoo pasó de 0,675 USD hace 90 días a 0,863, y el de 2027 de 0,529 a 0,819 [2]. Los objetivos de precio se movieron poco: JPMorgan 280 peniques (neutral, 10-ago), Berenberg 245 (mantener, 6-ago), Goldman 250 (de vender a neutral, 7-ago), Canaccord 425 (comprar, 24-jun), Stifel 351 (comprar, 7-may) [6].',
    base_ebitda: 'EBITDA del consenso = EBITDAX ajustado (MarketScreener)',
    ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: 49.4, indice_pct: 12.6, sector_pct: 37.6 },
      { periodo: '1 año', accion_pct: 52.1, indice_pct: 20.2, sector_pct: 50.4 },
      { periodo: '3 años (anual.)', accion_pct: 3.6, indice_pct: 17, sector_pct: 9.8 },
      { periodo: '5 años (anual.)', accion_pct: -4.6, indice_pct: 12.5, sector_pct: 14.1 },
    ],
    anual: [
      { anio: '2022', accion_pct: -14, indice_pct: 5 }, { anio: '2023', accion_pct: 1.5, indice_pct: 7.7 },
      { anio: '2024', accion_pct: -17.2, indice_pct: 9.3 }, { anio: '2025', accion_pct: -22.9, indice_pct: 25.8 },
    ],
    beta: 0.85,
    volatilidad_pct: 42.1,
    max_drawdown_pct: -71.4,
    tramo_drawdown: '2022-04-19 → 2025-04-11',
    posicion_corta_pct: null,
    comentario: 'Índice: FTSE 100 (CUKX.L, rentabilidad total); sector: petroleras y gasistas del MSCI Europa (IOGP.L). La acción perdió frente a los dos durante 2022-2025 (−71 % de caída máxima entre abril de 2022 y abril de 2025: EPL, declive británico y la dilución de Wintershall) y lo ha recuperado en parte en 2026 con la guerra de Irán (+49 % en el año). La beta semanal de 5 años es 0,85 (0,90 ajustada); la mensual, 0,39, sale baja porque el precio sigue al crudo y no al índice [1].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 5.1, var_3m_pct: 21.3, var_6m_pct: 6.5, var_12m_pct: 49.5, dist_max_52s_pct: -7.5, dist_min_52s_pct: 58.6, dist_max_historico_pct: -44.4, tendencia: 'alcista', volatilidad_60d_pct: 39, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'ene-mar 2026', var_pct: 76, causa: 'Del mínimo de 182 peniques (8-ene) al máximo de 321 (19-mar): guerra de Irán y cierre del estrecho de Ormuz; Brent a 119 USD en marzo [7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-jul 2026', var_pct: -24.2, causa: 'Mayor caída de un mes (hasta el 1-jul): alto el fuego y reapertura de Ormuz, Brent de 114 USD a primeros de mayo a ≈ 73 en junio; el 3-jul EIG colocó sus últimas 54,8 M de acciones a 205 peniques [7, 8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: 15.5, causa: 'Rebote tras la colocación de EIG y el cierre de Waldorf (10-jul), con el crudo recuperando [3, 7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: 21.3, causa: 'Vuelven los combates (31-ago), Brent a 100-110 USD; recompra de 250 M USD y compra de 53 M de acciones a BASF a 2,66 GBP [7, 9].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2025-11-06', tipo: 'resultados', hecho: 'Avance del tercer trimestre de 2025: sube la guía de producción y confirma el flujo libre [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-12-22', tipo: 'operación corporativa', hecho: 'Compra de LLOG (golfo de EE. UU.) por 3.200 M USD en caja y acciones [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-01-22', tipo: 'resultados', hecho: 'Avance de 2025 y guía de 2026: la acción cae un 7 % en el día [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-05', tipo: 'resultados', hecho: 'Resultados de 2025 y política nueva de reparto (45-75 % del flujo libre, dividendo base de 16,10 céntimos) [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-13', tipo: 'insiders', hecho: 'Potomac View (EIG, vinculada al presidente) vende 60 M de acciones a 2,55 GBP [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-08', tipo: 'macro', hecho: 'Alto el fuego en Irán: Brent a la baja y la acción −6,1 % en el día [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-03', tipo: 'insiders', hecho: 'EIG coloca sus últimas 54,8 M de acciones a 205 peniques y sale del capital [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'resultados', hecho: 'Resultados del 1S26 (BPA ajustado de 28 céntimos, flujo libre de 1.765 M), guía de producción al alza y recompra de 250 M USD [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-24', tipo: 'accionistas', hecho: 'BASF coloca acciones y Harbour le compra 53 M a 2,66 GBP (190 M USD): BASF baja del 24,3 % al 16,4 % y ha dicho que quiere salir [9].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11 (avance del tercer trimestre, sin fecha publicada)',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción no viene de una caída: sube un 49,5 % en 12 meses, cotiza un 7,5 % bajo su máximo de 52 semanas y por encima de su media de 200 sesiones. Los movimientos fuertes del año los explican el crudo y el gas (guerra de Irán) y las colocaciones de los grandes accionistas, que declararon su motivo (EIG liquidó su fondo; BASF dijo que sale de una participación no estratégica). No hay ampliación ni decisión regulatoria con fecha que pueda mover el precio más de un 5 % en contra antes de los resultados; quedan dos focos de papel sin fecha cerrada (el 16,4 % de BASF y el fin del bloqueo de los vendedores de LLOG en febrero de 2027) y el presupuesto británico de otoño, que puede tocar el régimen fiscal [8, 9].',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: r2(354 * 1.3498 / 100), ev_ebitda_ntm: null, per_ntm: 2.9, excluir: true },
      { anio: '2022', precio_cierre: r2(304.4 * 1.2056 / 100), ev_ebitda_ntm: null, per_ntm: 30.6, excluir: true },
      { anio: '2023', precio_cierre: r2(308.6 * 1.2734 / 100), ev_ebitda_ntm: null, per_ntm: 11.9, excluir: false },
      { anio: '2024', precio_cierre: r2(255.4 * 1.2549 / 100), ev_ebitda_ntm: null, per_ntm: 10.3, excluir: false },
      { anio: '2025', precio_cierre: r2(196.6 * 1.3467 / 100), ev_ebitda_ntm: null, per_ntm: 4.2, excluir: false },
    ],
    comentario: 'Cierres de cada año en peniques (Yahoo [1]) pasados a USD con el GBPUSD de ese día. PER adelantado = cierre ÷ BPA ajustado del año siguiente (2022: 1,62 USD sin el cargo único del EPL; 2023: ≈ 0,12; 2024: 0,33; 2025: 0,31; 2026e: 0,63, el nuestro). Se excluyen 2021 (BPA de 2022 de la crisis del gas, pico) y 2022 (BPA de 2023 hundido por el EPL, valle). Harbour cotizó a 10-12 veces el beneficio del año siguiente en 2023-2024, cuando el beneficio estaba deprimido por el EPL, y a 4 veces al cierre de 2025 sobre un beneficio de 2026 inflado por la guerra: el mercado no paga múltiplo por el beneficio de pico.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Productores independientes del mar del Norte (Aker BP, Vår Energi, DNO, Ithaca, Serica, EnQuest), la petrolera noruega con la que comparte cuencas (Equinor) y productores de EE. UU. con aguas profundas o perfil internacional parecido a LLOG (Murphy, APA, Talos, Kosmos). Precios del 19-oct-2026 y BPA del consenso de Yahoo; todo en USD (NOK a 0,1062 y GBP a 1,3307) [2].',
    empresas,
    comentario: `Harbour cotiza a ≈ ${r1((PRECIO_GBP * TC) / ntm(0.631, 0.909))} veces nuestro BPA de los próximos 12 meses (0,85 USD) y a ≈ 2 veces el EBITDAX de 12 meses (valor de empresa de ≈ 15.100 M USD con los híbridos y los arrendamientos), frente a una mediana de ${String(medPer).replace('.', ',')} veces de los comparables. El descuento tiene motivos: el impuesto británico (78 % hasta 2030), la vida de reservas corta (7-8 años 2P), la deuda y los híbridos, y el papel pendiente de BASF. Con el BPA del consenso (0,86 en 2026 y 0,82 en 2027) el PER sería ≈ 4,7.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2023-12', objetivo: 'Activos de producción de Wintershall Dea', comprador: 'Harbour Energy', ev: 11200, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pagado en acciones, caja y deuda asumida; ≈ 1.100 Mbep 2P adquiridos [10].' },
      { fecha: '2025-12', objetivo: 'LLOG Exploration (golfo de EE. UU.)', comprador: 'Harbour Energy', ev: 3200, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 11,5 USD por bep 2P (271 Mbep) y ≈ 94.000 USD por bep/d producido (34 kbep/d) [10].' },
      { fecha: '2025-12', objetivo: 'Waldorf Production (Reino Unido)', comprador: 'Harbour Energy', ev: 170, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 6,5 USD por bep 2P (25 Mbep), con caja y pérdidas fiscales [3].' },
    ],
    comentario: 'En el mar del Norte los activos cambian de manos a 5-12 USD por barril 2P; Harbour cotiza a ≈ 10,8 USD por barril 2P (valor de empresa de ≈ 15.100 M sobre ≈ 1.400 Mbep), en la parte alta del rango y sin contar los 1.839 Mbep de recursos 2C.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'identificacion', campo: 'Empleados', tipo: 'Complemento', intentos: '1) Informe anual 2025, nota de personal (tabla sin texto legible); 2) web de la empresa; 3) comunicados', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ROIC, deuda neta/EBITDA y flujo libre de los comparables', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary; 2) MarketScreener; 3) informes anuales (sin tiempo para diez empresas)', decision: 'Omitido: el PER y el EV/EBITDA bastan para la valoración por comparables.' },
  ],
  fuentes: [
    { id: 1, titulo: 'Históricos diarios de HBR.L, CUKX.L e IOGP.L (precio, rango, rentabilidades, beta, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/HBR.L/history' },
    { id: 2, titulo: 'Cotizaciones, consenso de BPA y recomendaciones de Harbour y comparables (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/HBR.L/analysis' },
    { id: 3, titulo: 'Half Year Results 2026, Trading Updates (nov-2025, ene y may-2026), presentación de octubre de 2026', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-10', url: H + 'xhka5ldn/harbour-energy-half-year-results-2026-2.pdf' },
    { id: 4, titulo: 'Investor Presentation, October 2026', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-10', url: H + 'rnojrs1e/harbour-energy-investor-presentation-october-2026.pdf' },
    { id: 5, titulo: 'Harbour Energy: previsiones del consenso (ventas, EBITDA, EBIT, BPA, dividendo, deuda neta 2026-2028)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/HARBOUR-ENERGY-PLC-120993565/finances/' },
    { id: 6, titulo: 'Harbour Energy (LON:HBR): acciones de los analistas y objetivos', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketbeat.com/stocks/LON/HBR/forecast/' },
    { id: 7, titulo: 'Brent: precios diarios y futuros (BZ=F, contratos a 2029)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/BZ=F/' },
    { id: 8, titulo: 'RNS: Director/PDMR shareholding (16-mar-2026) y colocación de Potomac View (2 y 3-jul-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-07-03', url: INV + 'pricing-of-accelerated-placing-in-harbour-energy/9650704' },
    { id: 9, titulo: 'RNS: compra fuera de mercado junto a la colocación de BASF y participaciones significativas (10, 11 y 24-sep-2026)', editor: 'Harbour Energy plc (Investegate)', tipo: 'Primaria', fecha: '2026-09-24', url: INV + 'update-on-off-market-purchase-alongside-basf-offer/9767540' },
    { id: 10, titulo: '2024 Full Year Results (asignación del precio de Wintershall Dea) y anuncio de la compra de LLOG', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2025-12-22', url: H + 'l3cm1w4o/harbour_energy_strategic_acquisition_of_llog_exploration_december_2025.pdf' },
  ],
};
w('D', D);

// ───────────────────────────── E: sentimiento ─────────────────────────────
const E = {
  _estado: 'Completa. Seeking Alpha (artículos de HBRIY, dic-2025 a sep-2026), MarketBeat y Simply Wall St (narrativas y objetivos), y la conferencia del 1S26.',
  sentimiento: {
    tono: 'Positivo',
    tendencia: 'Mejorando',
    revisadas: [
      { plataforma: 'Seeking Alpha (HBRIY)', fecha: '2026-09', n_comentarios: 5, tono: 'Positivo', resumen: 'Cinco artículos en diez meses, todos alcistas: «The Bargain Persists With An Enhanced Share Buyback Program» (8-sep-2026), «Second Chance» (2-jul), «Excellent Acquisition Timing» (16-abr), «Another Acquisition» (26-dic-2025) y «Turnaround May Be Beginning». Tesis común: barata por flujo libre y por barril, con compras bien compradas [1].' },
      { plataforma: 'MarketBeat y Simply Wall St', fecha: '2026-10', n_comentarios: 8, tono: 'Neutral', resumen: 'Los analistas recortaron objetivos en verano y los subieron poco después: consenso de «comprar moderado» con objetivo medio de ≈ 311 peniques (MarketBeat), cerca del precio. Las narrativas hablan de valor barato frente al riesgo fiscal británico [2, 3].' },
      { plataforma: 'Conferencia de resultados del 1S26', fecha: '2026-08-06', n_comentarios: 10, tono: 'Neutral', resumen: 'Las preguntas de los analistas fueron sobre asignación de capital frente al retraso de los impuestos en 2027, recompras, más compras, el régimen fiscal británico, la deuda por debajo de 1 vez y México [4].' },
    ],
    temas: [
      { tema: 'Barata por flujo libre y por barril', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto con los precios de hoy (flujo libre de ≈ 1,8 bn en 2026, ≈ 25 % de la capitalización), pero el flujo de 2027 lleva ≈ 1.000 M de impuestos atrasados de 2026 y la curva baja a 78 USD en 2028.' },
      { tema: 'Compras bien hechas (Wintershall, LLOG)', postura: 'Alcista', peso: 'Medio', contraste: 'LLOG se compró a ≈ 11,5 USD por bep 2P antes de la subida; Wintershall dobló la escala, pero trajo un fondo de comercio fiscal y un accionista que quiere salir.' },
      { tema: 'Exceso de papel (BASF, EIG, LLOG)', postura: 'Bajista', peso: 'Alto', contraste: 'Real: EIG salió a 205 peniques en julio, BASF colocó a 266 en septiembre y aún tiene el 16,4 %; los vendedores de LLOG quedan libres en febrero de 2027.' },
      { tema: 'Riesgo fiscal británico', postura: 'Bajista', peso: 'Medio', contraste: 'El EPL sigue hasta marzo de 2030 y el OGPM lo sustituye; el Reino Unido es ≈ 30 % de la producción y baja.' },
    ],
    lectura: 'El sentimiento de los particulares es positivo (los artículos alcistas insisten en el flujo libre y la recompra) y el de los analistas, tibio: 6 de 11 en comprar con un objetivo medio de 349 peniques en Yahoo y 311 en MarketBeat, apenas un 5-18 % sobre el precio. Lo que nadie discute es que 2026-2027 son años de precios de crisis; lo que separa a alcistas y bajistas es cuánto dura y cuánto queda después de impuestos y del papel de BASF.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: [
    { id: 1, titulo: 'Seeking Alpha: análisis de Harbour Energy (HBRIY), dic-2025 a sep-2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-08', url: 'https://seekingalpha.com/symbol/HBRIY/analysis' },
    { id: 2, titulo: 'Harbour Energy (LON:HBR): previsiones y acciones de los analistas', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketbeat.com/stocks/LON/HBR/forecast/' },
    { id: 3, titulo: 'Harbour Energy: narrativas y valoración', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://simplywall.st/stocks/gb/energy/lse-hbr/harbour-energy-shares' },
    { id: 4, titulo: 'Half Year Results 2026: transcripción de la conferencia', editor: 'Harbour Energy plc', tipo: 'Primaria', fecha: '2026-08-06', url: H + '0ipojjuv/harbour-energy-2026-half-year-results-transcript.pdf' },
  ],
};
w('E', E);
console.log('D, E escritos; mediana PER comparables', medPer, pers);
