// Escribe las notas A-E de Lotus Bakeries (corte 2026-10-14). EUR, ejercicio natural, NIIF-UE, cuenta por naturaleza.
// Cuentas de partida: notas/cuentas-xbrl.json (ESEF). Comprobado contra el informe anual 2025:
//  - deuda_financiera: el XBRL solo mapeaba LongtermBorrowings; aquí = préstamos bancarios a corto + largo (nota 22) sin arrendamientos.
//  - dpa: el XBRL daba el dividendo PAGADO en el año (el del ejercicio anterior); aquí, el dividendo del ejercicio (2025: 90 EUR, total 73,1 M).
//  - caja: efectivo + depósitos a plazo («other financial assets», que la empresa resta en su deuda neta).
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const L = 'https://www.lotusbakeries.com/sites/default/files/documents-en';
const P = (id, titulo, fecha, url, tipo = 'Primaria', editor = 'Lotus Bakeries NV') => ({ id, titulo, editor, tipo, fecha, url });
const ESEF = 'https://filings.xbrl.org/5493004C0K34IFI67I03';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  P(1, 'Annual Report 2025 (cuentas consolidadas, notas 3, 4, 21, 22 y medidas alternativas; resumen de cinco años)', '2026-03-31', `${L}/2025_Annual_Report_Lotus_Bakeries_Group_1.pdf`),
  P(2, 'Press release: 2025 Annual Results (ventas 1.355,1 M, EBIT(u) 232,4 M, dividendo 90 EUR)', '2026-02-06', `${L}/PR_2025_Annual_Results_Lotus_Bakeries_EN_1.pdf`),
  P(3, 'Press release: 2026 Half-Year Results (ventas 749,1 M, +14,0 %; programa de capex de al menos 500 M en 2026-2030)', '2026-08-07', `${L}/260807_PR_HY2026_EN.pdf`),
  P(4, 'Press release: 2025 Half-Year Results', '2025-07-25', `${L}/Press_Release_HY_Results_2025.pdf`),
  P(5, 'Informes anuales ESEF 2021-2025 en xBRL-JSON (LEI 5493004C0K34IFI67I03)', '2026-03-31', `${ESEF}/2025-12-31/ESEF/BE/0/5493004C0K34IFI67I03-2025-12-31-1-nl.json`, 'Primaria', 'XBRL International (filings.xbrl.org)'),
  P(6, 'Press release: inicio de la ampliación de la fábrica de Lembeke', '2026-05-12', `${L}/260512_Press_Release_Lembeke_expansion_Lotus%20Bakeries.pdf`),
  P(7, 'Informe anual ESEF 2022 (nota de arrendamientos: derechos de uso de 16,1 M en 2022 y 12,7 M en 2021)', '2023-03-31', `${ESEF}/2022-12-31/ESEF/BE/0/5493004C0K34IFI67I03-2022-12-31-nl/reports/5493004C0K34IFI67I03-2022-12-31-nl.xhtml`),
];

const c = (periodo, ingresos, coste_ventas, ebit, amort, rf, bai, imp, mino, bn, gf, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas, gastos_generales: null, ebitda: Math.round((ebit + amort) * 10) / 10, amortizaciones: amort, ebit, resultado_financiero: rf, bai, impuestos: imp, minoritarios: mino,
  beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('2021', 750.3, 250.6, 119.7, 23.1, -2.4, 117.3, 26.6, 0.0, 90.8, 2.8, 111.55, 40, 0.8137),
  c('2022', 877.5, 311.3, 136.4, 25.2, -2.4, 134.0, 30.7, 0.0, 103.2, 2.6, 127.18, 45, 0.8121),
  c('2023', 1063.0, 368.9, 170.4, 32.9, -2.5, 167.9, 38.6, 0.1, 129.3, 3.8, 159.20, 58, 0.8124),
  c('2024', 1231.9, 420.0, 201.5, 36.6, -2.2, 199.3, 46.8, -0.1, 152.6, 3.8, 187.65, 76, 0.8131),
  c('2025', 1355.1, 461.4, 227.6, 40.2, -2.4, 225.2, 52.9, 0.0, 172.3, 4.3, 211.88, 90, 0.8130),
];

const A = {
  _estado: 'completo',
  negocio: {
    descripcion: 'Lotus Bakeries fabrica y vende galletas y snacks de marca en tres pilares [1]. Lotus Biscoff (57 % de las ventas de marca en 2025, 670 M EUR declarados): la galleta caramelizada de especulos y la crema para untar, vendidas en más de 70 países y licenciadas a Mondelez (galletas en India, chocolate Cadbury, Milka, Côte d\'Or y desde 2026 Toblerone y otras) y a Froneri (helado) [2, 3]. Lotus Natural Foods (25 %, unos 300 M): snacks «mejores para ti» con BEAR (fruta para niños, fuerte en EE. UU.), TREK y nākd. (barritas, Reino Unido), Kiddylicious y Peter\'s Yard [2]. Lotus Local Heroes (18 %): gofres, pastelería, Dinosaurus, Peijnenburg (pan de especias) y Annas (Suecia) en sus mercados de origen [1]. Produce en Bélgica (Lembeke, la mayor fábrica de un solo tipo de galleta de Europa), Países Bajos, Francia, Suecia, Sudáfrica, EE. UU. (Mebane, desde 2019) y Tailandia (Chonburi, desde finales de 2025) [2, 3]. Vende a la gran distribución, a aerolíneas y cafeterías (el origen de la marca) y a través de socios en unos 50 países [2].',
    como_gana_dinero: 'Margen alto de marca con un producto sencillo: tras materias primas, envases y producción subcontratada quedaba el 66,0 % de las ventas en 2025 (66,6 % en 2021) [1]. Harina, azúcar, aceites vegetales, cacao (en la crema y el chocolate co-marcado) y envases son el coste variable; la empresa crece casi solo por volumen (en 2025 «casi entero volumen», en el 1S25 el precio aportó un 1,5 %) [2, 4]. El apalancamiento operativo es real pero se reinvierte: servicios y otros gastos (59 % comercial y marketing) suben con las ventas [1]. Los ingresos por licencias de Mondelez y Froneri, sin capital, mejoran el margen [2]. El EBIT subyacente pasó del 16,5 % en 2021 al 17,2 % en 2025 y al 17,5 % en el 1S26 [1, 3]. La estacionalidad es baja; el segundo semestre pesa algo más.',
    segmentos: [
      { nombre: 'Europa continental', descripcion: 'Ventas de las filiales del continente y ventas entre grupos de las fábricas europeas', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 606.3, resultado: 120.9 }, { periodo: '2025', ingresos: 660.6, resultado: 132.0 }] },
      { nombre: 'Reino Unido', descripcion: 'Lotus UK, Natural Balance Foods (TREK, nākd.), Urban Fresh Foods (BEAR), Kiddylicious y Peter\'s Yard', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 265.0, resultado: 51.7 }, { periodo: '2025', ingresos: 269.8, resultado: 59.9 }] },
      { nombre: 'Américas', descripcion: 'Filiales de EE. UU., Canadá y México y la fábrica de Mebane', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 182.5, resultado: 32.3 }, { periodo: '2025', ingresos: 217.3, resultado: 40.9 }] },
      { nombre: 'Resto del mundo', descripcion: 'Exportación desde Bélgica, filiales de Asia (China, Corea) y socios', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 178.2, resultado: 42.3 }, { periodo: '2025', ingresos: 207.3, resultado: 50.7 }] },
      { nombre: 'Eliminaciones y grupo', descripcion: 'Costes centrales no repartidos', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 0, resultado: -40.6 }, { periodo: '2025', ingresos: 0, resultado: -51.1 }] },
    ],
    geografias: [
      { nombre: 'Reino Unido', peso_pct: 19.7 },
      { nombre: 'EE. UU.', peso_pct: 16.3 },
      { nombre: 'Francia', peso_pct: 13.3 },
      { nombre: 'Bélgica', peso_pct: 12.7 },
      { nombre: 'Otros', peso_pct: 38.0 },
    ],
    geografias_criterio: 'destino',
    clientes: 'Clientes atomizados en la gran distribución de Europa y EE. UU., más canales de aerolíneas y cafeterías y socios distribuidores en unos 50 países [1, 2]. Ningún país distinto de los cuatro mayores supera el 10 % de las ventas [1]. El poder de precios se ve en que crece casi solo con volumen y aun así sube margen: en 2025 la subida de precios fue mínima y el EBITDA(u) creció un 12,4 % con las ventas al 10 % [2]. La penetración de la galleta Biscoff en los hogares de EE. UU. pasó del 9 % (2025) a más del 10 % (1S26) [2, 3]; en EE. UU. es la marca que más crece en galletas y en cremas [3]. El límite del crecimiento ha sido la capacidad, no la demanda: en 2025 la capacidad de la galleta original solo permitía +10 % de volumen [4].',
    kpis: [
      { kpi: 'Crecimiento de ventas del grupo', valor_anterior: '+10,0 % (2025)', valor_actual: '+14,0 % (1S26; −2 pp de divisa)', variacion: 'Acelera', comentario: 'Volumen de Biscoff y Natural Foods [2, 3]' },
      { kpi: 'Volumen y ventas de Biscoff', valor_anterior: '+13 % orgánico (2025)', valor_actual: 'Más del 20 % (1S26)', variacion: 'Acelera', comentario: 'Capacidad de Tailandia disponible; tendencia viral «Japanese cheesecake» [3]' },
      { kpi: 'Penetración de Biscoff en hogares de EE. UU.', valor_anterior: '9 % (2025)', valor_actual: 'Más del 10 % (1S26)', variacion: '+1 pp', comentario: 'Marca que más crece en galletas y cremas de EE. UU. [2, 3]' },
      { kpi: 'Margen EBITDA(u)', valor_anterior: '20,2 % (2025)', valor_actual: '20,9 % (1S26)', variacion: '+0,7 pp', comentario: 'Volumen, Tailandia y licencias de Mondelez [3]' },
      { kpi: 'Deuda financiera neta / EBITDA(u)', valor_anterior: '0,25x (2025)', valor_actual: '0,3x (jun-26)', variacion: 'Estable', comentario: 'Deuda neta de 94,3 M sin arrendamientos [3]' },
      { kpi: 'Capex', valor_anterior: '240 M (2024-2025)', valor_actual: 'Más de 250 M (2026-2027); al menos 500 M de Biscoff en 2026-2030', variacion: 'Sube', comentario: 'EE. UU., Tailandia y Bélgica [3]' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1446.9, ebitda: 297.8, ebit: 251.9, beneficio_neto: 191.0, bpa: 234.88, dpa: 90, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 750,3 M EUR en 2021 a 1.355,1 M en 2025 (+15,9 % anual compuesto) y a 1.446,9 M en los doce meses a junio de 2026 [1, 3]. Es crecimiento orgánico y de volumen: la última compra fue Peter\'s Yard (2022, 9,2 M) y en 2025 el precio apenas aportó [1, 2]. El margen EBIT publicado subió del 16,0 % (2021) al 16,8 % (2025): el coste de materias primas subió del 33,4 % de las ventas (2021) al 35,5 % en el pico de 2022 y volvió al 34,0 % en 2025, el personal pasó del 20,4 % al 19,2 % y la escala se reinvirtió en marketing y estructura comercial (servicios del 25,6 % al 26,3 %) [1]. En el 1S26 el EBIT(u) subió un 19,4 % con las ventas al 14 %: el margen llegó al 17,5 % pese a 8 M anuales de amortización nueva de Tailandia [3]. La divisa resta: −2,5 % en el 2S25 y −2 puntos en el 1S26 [2, 3].',
    ajustes: 'Lotus publica un EBIT «subyacente» (EBIT(u)) que excluye partidas «no subyacentes»: 4,1 M (2021), 3,8 M (2022), 2,5 M (2023), 5,2 M (2024), 4,8 M (2025) y 0,9 M en el 1S26, sobre todo costes de arranque de Tailandia y de compras [1, 3]. Como se repiten casi todos los años, usamos el EBIT y el BPA publicados (sin ajustar); el BPA subyacente de 2025 fue de 218,0 EUR frente a 211,88 publicado [2]. El EBITDA del informe es EBIT + amortizaciones (267,8 M en 2025); el EBITDA(u) de la empresa (273,4 M) suma además provisiones y depreciaciones de circulante y las partidas no subyacentes [2]. Ninguna liberación fiscal ni plusvalía relevante en la cuenta: el tipo efectivo es estable en el 23-23,5 % [1]. La venta de la participación en The Good Crisp Company (2025) entró en caja (20,4 M) por otro resultado global, no por la cuenta [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 657.3, crecimiento_pct: 9.8, crecimiento_organico_pct: null, ebitda: 129.3, margen_ebitda_pct: 19.7, bpa: 97.7, vs_consenso: null },
      { periodo: '2S25', ingresos: 697.8, crecimiento_pct: 10.2, crecimiento_organico_pct: null, ebitda: 144.0, margen_ebitda_pct: 20.6, bpa: 114.2, vs_consenso: null },
      { periodo: '1S26', ingresos: 749.1, crecimiento_pct: 14.0, crecimiento_organico_pct: 16.0, ebitda: 156.3, margen_ebitda_pct: 20.9, bpa: 120.7, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En los resultados del 1S26 (7-ago-2026) la dirección cambió el discurso de la capacidad como freno al de la capacidad como apuesta: Tailandia está plenamente operativa y «en la parte alta de lo esperado», y anunció el mayor programa de inversión de su historia, al menos 500 M EUR para Biscoff en EE. UU., Tailandia y Bélgica entre 2026 y 2030, con más de 250 M de capex del grupo en 2026-2027 [3]. Frente a febrero, cuando hablaba de unos 250 M en dos años y de riesgos comerciales [2], ahora sube la ambición: hacer de Biscoff la tercera marca de galletas del mundo y negociar con Mondelez un modelo como el de India para Brasil [3]. Avisó de presión de costes por Oriente Medio y el clima que puede seguir en 2027 y calificó la moda viral del «Japanese cheesecake» de acelerador de notoriedad, no de motor estructural [3]. No publica guía numérica de ventas ni de margen; no hay transcripción pública de las preguntas de los analistas.',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 992.1, activo_corriente: 302.0, pasivo_corriente: 183.1, pasivo_total: 472.6, fondo_comercio: 224.8, intangibles: 144.7, inmovilizado_material: 307.7, existencias: 57.9, clientes: 105.2, proveedores: 154.4, activos_contrato: null, pasivos_contrato: null, caja: 132.2, deuda_financiera: 223.4, arrendamientos: 12.9, patrimonio_neto: 519.5, minoritarios: 0, reservas: 540.0 },
      { periodo: '2022', activo_total: 1095.0, activo_corriente: 275.0, pasivo_corriente: 256.7, pasivo_total: 522.9, fondo_comercio: 225.2, intangibles: 146.7, inmovilizado_material: 428.2, existencias: 70.4, clientes: 120.1, proveedores: 173.0, activos_contrato: null, pasivos_contrato: null, caja: 76.4, deuda_financiera: 249.9, arrendamientos: 16.3, patrimonio_neto: 572.1, minoritarios: 0, reservas: 611.0 },
      { periodo: '2023', activo_total: 1243.5, activo_corriente: 367.9, pasivo_corriente: 237.4, pasivo_total: 587.3, fondo_comercio: 222.9, intangibles: 147.8, inmovilizado_material: 474.3, existencias: 76.9, clientes: 152.0, proveedores: 205.1, activos_contrato: null, pasivos_contrato: null, caja: 131.2, deuda_financiera: 270.5, arrendamientos: 20.0, patrimonio_neto: 656.2, minoritarios: 0, reservas: 704.0 },
      { periodo: '2024', activo_total: 1392.2, activo_corriente: 399.1, pasivo_corriente: 339.0, pasivo_total: 601.0, fondo_comercio: 230.1, intangibles: 150.4, inmovilizado_material: 580.4, existencias: 90.5, clientes: 166.5, proveedores: 216.3, activos_contrato: null, pasivos_contrato: null, caja: 134.2, deuda_financiera: 261.0, arrendamientos: 20.3, patrimonio_neto: 791.2, minoritarios: 0, reservas: 811.0 },
      { periodo: '2025', activo_total: 1536.5, activo_corriente: 504.2, pasivo_corriente: 339.5, pasivo_total: 676.9, fondo_comercio: 222.8, intangibles: 147.9, inmovilizado_material: 648.1, existencias: 103.8, clientes: 193.3, proveedores: 247.6, activos_contrato: null, pasivos_contrato: null, caja: 200.1, deuda_financiera: 291.0, arrendamientos: 21.3, patrimonio_neto: 859.6, minoritarios: 0, reservas: 924.8 },
    ],
    vencimientos: [{ anio: '2026', importe: 55.0 }, { anio: '2027-2030', importe: 111.0 }, { anio: '2031-2033', importe: 125.0 }],
    liquidez: 'Caja de 121,9 M y depósitos a plazo de 78,2 M a cierre de 2025 (200,1 M en total) frente a 291,0 M de préstamos bancarios y 21,3 M de arrendamientos [1]. En 2024 firmó 225 M de financiación bilateral con KBC, BNP Paribas Fortis y Belfius, la mayoría préstamos a vencimiento con tipo fijo hasta 2033; dispuso 125 M en 2025 [1]. Deuda financiera neta de 94,3 M (sin arrendamientos) a junio de 2026, 0,3 veces el EBITDA(u) [3].',
    rating: 'Sin rating (solo préstamos bilaterales de bancos belgas)',
    coste_deuda_pct: 1.9,
    vida_media_anios: null,
    otros_pasivos: 'Pasivos por pensiones de 7,8 M (2025) [1]. Opciones de venta de los minoritarios de Natural Balance Foods (2,1 %) [1]. Pasivos por impuestos diferidos de 78,4 M, sobre todo por las marcas compradas (BEAR, nākd., TREK) [1]. Sin covenants relevantes informados ni factoring. La empresa resta además su autocartera (23,5 M a coste) en su definición de deuda neta; nosotros no, porque las acciones ya se cuentan sin autocartera [1].',
    comentario: 'El balance es casi de deuda cero pese a invertir 113-123 M al año: deuda financiera neta de 67,5 M a cierre de 2025 (0,25 veces el EBITDA(u)) y de 94,3 M en junio de 2026 tras pagar 73,1 M de dividendo en mayo [1, 3]. El circulante comercial (existencias + clientes − proveedores) es bajo, del 3,7 % de las ventas en 2025, porque los proveedores financian casi todo el inventario [1]. El inmovilizado material se dobló de 307,7 M (2021) a 648,1 M (2025) con Tailandia y Mebane [1]. Ojo con el dato del XBRL: el campo de deuda solo recogía la parte a largo plazo; aquí sumamos corto y largo (312,3 M con arrendamientos en 2025) [5]. Los arrendamientos de 2021-2022 se aproximan por los derechos de uso (12,7 M y 16,1 M) [7].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 110.9, capex: 42.0, pagos_arrendamientos: 4.3, adquisiciones: 0.3, desinversiones: 0, dividendos: 28.8, recompras: 0, emision_acciones: 3.2, intereses_en_financiacion: 2.8 },
      { periodo: '2022', flujo_operativo: 110.8, capex: 123.1, pagos_arrendamientos: 4.2, adquisiciones: 9.2, desinversiones: 0, dividendos: 32.8, recompras: 8.8, emision_acciones: 0, intereses_en_financiacion: 2.6 },
      { periodo: '2023', flujo_operativo: 154.4, capex: 65.5, pagos_arrendamientos: 5.5, adquisiciones: 0, desinversiones: 0, dividendos: 36.5, recompras: 0, emision_acciones: 0.3, intereses_en_financiacion: 3.8 },
      { periodo: '2024', flujo_operativo: 182.1, capex: 117.6, pagos_arrendamientos: 6.8, adquisiciones: 0, desinversiones: 0, dividendos: 47.0, recompras: 0, emision_acciones: 2.4, intereses_en_financiacion: 3.8 },
      { periodo: '2025', flujo_operativo: 205.9, capex: 113.0, pagos_arrendamientos: 7.7, adquisiciones: 0, desinversiones: 20.4, dividendos: 61.7, recompras: 5.9, emision_acciones: 0, intereses_en_financiacion: 4.3 },
    ],
    comentario: 'El flujo de explotación creció de 110,9 M (2021) a 205,9 M (2025), en torno al 75-80 % del EBITDA tras impuestos pagados (41,5 M en 2025) [1, 5]. El capex se come buena parte: 42,0 M en 2021 y 113-123 M en 2022, 2024 y 2025 (8-14 % de las ventas), por la fábrica de Tailandia, las ampliaciones de Mebane y Lembeke [1, 5]. El flujo libre tras capex, arrendamientos e intereses fue de 80,9 M en 2025 (6,0 % de las ventas). Estimación propia del reparto: el mantenimiento ronda la amortización (40 M, el 3 % de las ventas) y el resto, 70-80 M al año, es crecimiento. Con al menos 500 M de Biscoff en 2026-2030 y más de 250 M de capex del grupo en 2026-2027, el capex seguirá en el 7-9 % de las ventas hasta 2028 [3].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte Bedrijfsrevisoren BV (socio Kurt Dehoorne)',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: 'Cuentas NIIF-UE auditadas por Deloitte, con informe ESEF sin errores de validación en los cinco ejercicios [1, 5]. No capitaliza I+D relevante; el inmovilizado sube por fábricas, no por gastos activados. Los pagos en acciones son mínimos (2,1 M en 2025, un 1 % del beneficio) y la dilución es de 1.885 opciones pendientes, un 0,2 % del capital [1]. Las partidas «no subyacentes» son pequeñas (4-5 M al año) y la empresa las detalla. Las marcas compradas (TREK, nākd., BEAR, Kiddylicious) y el fondo de comercio suman 370,8 M, el 24 % del activo, sin deterioros en el periodo [1]. La lectura de los indicadores del motor (Altman, Piotroski, Beneish) va en la sección: con deuda casi nula, márgenes estables y flujo de explotación por encima del beneficio, no esperamos señales de manipulación.',
    senales: [
      { senal: 'Partidas no subyacentes recurrentes', nivel: 'Baja', comentario: 'Entre 2,5 y 5,2 M al año desde 2021; usamos el beneficio publicado sin excluirlas [1].' },
      { senal: 'Dato de deuda del XBRL incompleto (solo largo plazo)', nivel: 'Baja', comentario: 'Corregido con la nota 22 del informe anual: 312,3 M de deuda con arrendamientos en 2025 [1, 5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo creciente 25 años seguidos: 90 EUR brutos por acción sobre 2025 (73,1 M, el 42 % del beneficio), frente a 76 EUR en 2024, 58 en 2023, 45 en 2022 y 40 en 2021 [1, 2]. Sin recompras para amortizar: la autocartera (3.960 acciones) solo cubre los planes de opciones [1]. Prioridad declarada: capacidad para Biscoff (más de 250 M en 2026-2027 y al menos 500 M de Biscoff en 2026-2030), inversión en marca y equipos comerciales, y compras pequeñas de marcas «mejores para ti»; el fondo FF2032 invierte en marcas emergentes y salió de The Good Crisp Company en 2025 [2, 3].',
    adquisiciones: [
      { anio: '2015', objetivo: 'Natural Balance Foods (nākd., TREK) y participación en Urban Fresh Foods (BEAR)', importe: null, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Base del pilar Natural Foods, que factura unos 300 M y creció más de un 15 % en 2025; sin deterioros [1, 2].' },
      { anio: '2018', objetivo: 'Kiddylicious (snacks infantiles, Reino Unido)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Natural Foods; sin deterioros [1].' },
      { anio: '2022', objetivo: 'Peter\'s Yard (crackers, Reino Unido)', importe: 9.2, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; sin deterioros [1, 5].' },
    ],
    comentario: 'Asignación de capital de crecimiento orgánico: entre 2021 y 2025 invirtió unos 461 M en capex (el 31 % del flujo de explotación acumulado de 764 M) y pagó 207 M en dividendos, sin ampliaciones de capital ni recompras relevantes [5]. El ROIC se mantiene alto pese a doblar el inmovilizado, porque la capacidad nueva se llena enseguida (Tailandia ya rinde «en la parte alta de lo esperado») [3]. Las compras han sido pocas y pequeñas y han creado un segundo motor (Natural Foods). El riesgo es el de construir capacidad por adelantado en un programa de al menos 500 M: si la demanda de Biscoff se frena, el ROIC incremental cae. La dirección se ha guardado flexibilidad para ajustar el alcance [3].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: '1S24 y 2S24 con margen y BPA', tipo: 'Complemento', intentos: '1) Nota de resultados del 1S25 (solo el crecimiento del 1S25); 2) web de inversores (solo publica los dos últimos semestres); 3) ESEF (solo anuales)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'arrendamientos 2021-2022', tipo: 'Complemento', intentos: '1) Informe ESEF 2022 (solo derechos de uso: 12,7 M y 16,1 M); 2) informe anual 2025 (solo 2024-2025); 3) aproximado por los derechos de uso', decision: 'Calculado y marcado como estimación' },
    { seccion: 'balance', campo: 'balance completo a 30-jun-2026', tipo: 'Complemento', intentos: '1) Nota de resultados del 1S26 (solo totales y deuda neta); 2) web de inversores (sin informe semestral completo enlazado); 3) ESEF (no hay semestral)', decision: 'Calculado y marcado como estimación' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  P(1, 'Annual Report 2025 (estrategia de marcas, segmentos, riesgos, sostenibilidad)', '2026-03-31', `${L}/2025_Annual_Report_Lotus_Bakeries_Group_1.pdf`),
  P(2, 'Press release: 2025 Annual Results (Biscoff, la galleta que más crece en el ranking mundial, entre las cinco primeras)', '2026-02-06', `${L}/PR_2025_Annual_Results_Lotus_Bakeries_EN_1.pdf`),
  P(3, 'Press release: 2026 Half-Year Results', '2026-08-07', `${L}/260807_PR_HY2026_EN.pdf`),
  { id: 4, titulo: 'Sweet Biscuits Market Size (110.500 M USD en 2024; 115.500 M en 2025; 175.100 M en 2034; TCAC 4,7 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://www.gminsights.com/industry-analysis/sweet-biscuits-market' },
  { id: 5, titulo: 'Global Biscuits Market (134.100 M USD en 2025; 191.400 M en 2034)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2025', url: 'https://www.imarcgroup.com/global-biscuits-market' },
  { id: 6, titulo: 'Ficha sectorial «Chocolate y confitería prémium» (comparables a 14-oct-2026)', editor: 'Elaboración propia', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/chocolate-2026-10-14.md' },
  { id: 7, titulo: 'Ficha sectorial «Galletas y snacks de marca»', editor: 'Elaboración propia', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/galletas-snacks-2026-10-14.md' },
  { id: 8, titulo: 'Mondelez, Lotus Bakeries, Froneri to Expand Biscoff Ice Cream', editor: 'Food Manufacturing', tipo: 'Prensa', fecha: '2025-03-12', url: 'https://www.foodmanufacturing.com/supply-chain/news/22936388/mondelez-lotus-bakeries-froneri-to-expand-biscoff-ice-cream' },
  P(10, 'Press release: Mondelez y Lotus Bakeries amplían su alianza al helado con Froneri', '2025-03-12', 'https://lotusbakeries.com/sites/default/files/documents-en/2025%2003%2012_Press%20Release%20cooperation%20MDLZ_Froneri.pdf'),
  { id: 9, titulo: 'Lotus Bakeries toujours bien orienté, nouvelle collaboration avec Mondelez (Toblerone con crema Biscoff)', editor: 'Option Finance / AOF', tipo: 'Prensa', fecha: '2026-09-22', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2026-09-22-lotus-bakeries-toujours-bien-oriente-nouvelle-collaboration-avec-mondelez.html' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Jan Boone sénior fundó Lotus en Lembeke (Bélgica) en 1932 con la galleta caramelizada de especulos [1]. La empresa cotiza en Bruselas desde 1988 y sigue controlada por las familias Boone y Stevens a través de la Stichting Aandelen Lotus Bakeries [1]. La tercera generación, con Jan Boone como consejero delegado desde 2011, convirtió una galleta de café en una marca global: el nombre Biscoff, la crema para untar, la fábrica de Mebane en EE. UU. (2019) y la de Chonburi en Tailandia (2025) [1, 2]. En 2015 entró en los snacks naturales (nākd., TREK, BEAR) y en 2024-2025 firmó con Mondelez la licencia de India y el chocolate co-marcado, y con Froneri el helado [2, 8]. En 2021 la fundación de control colocó un 10 % de sus acciones y el capital flotante ganó liquidez [1].',
    hitos: [
      { anio: '1932', hito: 'Jan Boone sénior funda Lotus en Lembeke con la galleta de especulos caramelizada [1].' },
      { anio: '1988', hito: 'Salida a bolsa en Bruselas [1].' },
      { anio: '2011', hito: 'Jan Boone (tercera generación) consejero delegado [1].' },
      { anio: '2015', hito: 'Compra de Natural Balance Foods (nākd., TREK) y entrada en Urban Fresh Foods (BEAR): nace Lotus Natural Foods [1].' },
      { anio: '2019', hito: 'Primera línea de Biscoff en Mebane (Carolina del Norte, EE. UU.) [3].' },
      { anio: '2021', hito: 'La Stichting coloca un 10 % de sus acciones entre institucionales [1].' },
      { anio: '2024', hito: 'Alianza con Mondelez: Biscoff fabricada y distribuida por Mondelez en India y chocolate co-marcado [2].' },
      { anio: '2025', hito: 'Licencia del helado a Froneri; arranque de Chonburi (Tailandia); exit de The Good Crisp Company [2, 8, 10].' },
      { anio: '2026', hito: 'Programa de al menos 500 M EUR para Biscoff en EE. UU., Tailandia y Bélgica (2026-2030); acción +63 % en el año [3].' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Mercado mundial de galletas dulces (sweet biscuits), en valor a precio de venta, que es donde compite Biscoff (57 % de las ventas de marca) y el perímetro de la ambición de la empresa («tercera marca de galletas del mundo») [1, 3]. Natural Foods compite en barritas y snacks de fruta, un mercado distinto que no sumamos para no mezclar perímetros. Usamos Global Market Insights (115.500 M USD en 2025, unos 103.700 M EUR al tipo del 14-oct) y lo contrastamos con IMARC (134.100 M USD para todas las galletas, con saladas y crackers) [4, 5]. Las dos fuentes son casas de estudios de pago con definiciones distintas: la cifra es orientativa.',
    tamano: '≈ 103.700 M EUR en 2025 (115.500 M USD, Global Market Insights) [4]; 134.100 M USD para todas las galletas según IMARC [5]',
    unidad_serie: 'millones de EUR (GMI convertido a 1,1141 USD/EUR; previsión con su TCAC del 4,7 %)',
    serie: [{ anio: '2024', tamano: 99200 }, { anio: '2025', tamano: 103700 }, { anio: '2026e', tamano: 108500 }, { anio: '2027e', tamano: 113600 }, { anio: '2028e', tamano: 119000 }, { anio: '2029e', tamano: 124600 }, { anio: '2030e', tamano: 130400 }],
    tcac_historico_pct: 4.5,
    tcac_previsto_pct: 4.7,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Penetración de marcas globales en mercados nuevos (EE. UU., Asia, India)', efecto: '+', horizonte: 'Estructural', evidencia: 'Biscoff pasó del 9 % a más del 10 % de los hogares de EE. UU. y Mondelez la llevó a más de 300.000 tiendas indias en cuatro semanas [2, 3].' },
      { driver: 'Redes sociales y modas virales', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La receta viral del «Japanese cheesecake» empujó la demanda en el 1S26; la empresa no la considera estructural [3].' },
      { driver: 'Co-marcado y licencias (chocolate, helado)', efecto: '+', horizonte: 'Estructural', evidencia: 'Milka, Cadbury, Côte d\'Or, Toblerone con Biscoff y helado Froneri en 13 países [3, 9].' },
      { driver: 'Coste de materias primas (azúcar, aceites, cacao, energía)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Las materias primas son el 34 % de las ventas de Lotus; aviso de presión de costes en 2026-2027 [1, 3].' },
      { driver: 'Salud, azúcar y fármacos GLP-1', efecto: '−', horizonte: 'Estructural', evidencia: 'El snack «mejor para ti» crece más que la galleta clásica; Natural Foods +17 % en 2025 [1].' },
      { driver: 'Marca blanca', efecto: '−', horizonte: 'Cíclico', evidencia: 'Las cadenas copian el especulos; Biscoff sigue ganando cuota en EE. UU. [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Mondelez (Oreo, LU, belVita), Ferrero, Pepperidge Farm (Campbell\'s), Arnott\'s y las marcas blancas; Lotus es socio de Mondelez y no rival frontal en India y chocolate [2, 3].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Gran distribución concentrada en Europa y EE. UU.; Lotus vende en más de 70 países y ningún país pequeño pasa del 10 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Harina, azúcar y aceites son materias primas abundantes; el cacao solo pesa en la crema y el chocolate [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacer un especulos es fácil; hacer una marca global y la escala de Lembeke (la mayor fábrica de un solo tipo de galleta de Europa) no [3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Otros dulces y snacks, y la presión por menos azúcar [1].' },
    ],
    ciclo: {
      posicion: 'Expansión',
      comentario: 'Las galletas de marca son defensivas: en 2009 y 2020 el volumen aguantó (en 2020 Lotus creció pese a perder aerolíneas y cafeterías) [1]. En 2022-2023 el sector subió precios por la inflación de costes y perdió algo de volumen; Lotus creció un 17 % y un 21 % [1]. En 2026 la categoría crece poco en volumen en los mercados maduros (barritas del Reino Unido al «bajo dígito») mientras Biscoff sube más del 20 % [3]. La posición de la empresa es de expansión propia, más que del ciclo del sector.',
    },
    regulacion: 'Reino Unido: restricciones de publicidad y de promociones a los productos con mucho azúcar, grasa y sal (HFSS), en vigor desde octubre de 2025-enero de 2026, que afectan a la galleta y no a la mayoría de los snacks de Natural Foods [1]. UE: reglamento de envases (PPWR) con reciclabilidad total en 2030 y reglamento de deforestación para el cacao y el aceite de palma [1]. EE. UU.: aranceles a las importaciones desde Europa en 2025, neutralizados con la producción de crema y galleta en Mebane [2].',
    tendencias: 'Tres tendencias favorecen a Lotus: las marcas globales ganan a las locales gracias a las redes sociales (TikTok y la generación Z, que la dirección cita como su público de más tracción) [3]; el co-marcado deja vender el sabor Biscoff en chocolate, helado y barritas sin capital propio [3, 9]; y el snack «mejor para ti» crece más que la galleta clásica, donde Natural Foods está bien colocada [1]. La tendencia en contra es la salud: menos azúcar, GLP-1 y regulación HFSS. La IA no cambia el producto; podría cambiar cómo se compra (asistentes de compra que eligen por precio) y abarata el marketing digital de todos.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.3,
    posicion: 'Biscoff, entre las cinco primeras marcas de galletas del mundo y la que más crece del ranking; Lotus, alrededor del 1,3 % del mercado mundial de galletas dulces (estimación propia con el grupo entero); líder del especulos y número uno en crecimiento en galletas y cremas de EE. UU. [2, 3, 4]',
    competidores: [
      { nombre: 'Mondelez', pais: 'EE. UU.', ticker: 'MDLZ', ingresos: null, cuota_pct: null, margen_ebit_pct: 22.0, comentario: 'Líder mundial de galletas (Oreo, LU, belVita, Chips Ahoy); socio de Lotus en India, chocolate y posible Brasil [3, 6].' },
      { nombre: 'Ferrero (con WK Kellogg y Kinder)', pais: 'Italia/Luxemburgo', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; galletas Kinder y Nutella Biscuits [6].' },
      { nombre: 'Mars (con Kellanova)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; compró Kellanova (Pringles, Pop-Tarts) en 2025 por 35.900 M USD [6].' },
      { nombre: 'Hershey', pais: 'EE. UU.', ticker: 'HSY', ingresos: null, cuota_pct: null, margen_ebit_pct: 23.1, comentario: 'Dulces y snacks salados en EE. UU.; rival en el pasillo de snacks [6].' },
      { nombre: 'Lindt & Sprüngli', pais: 'Suiza', ticker: 'LISP', ingresos: 6353, cuota_pct: null, margen_ebit_pct: 16.4, comentario: 'Chocolate prémium; ventas de 2025 en EUR al tipo del 14-oct; referencia de marca prémium europea [6].' },
    ],
    foso: {
      veredicto: 'Amplio',
      tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Las recetas virales y el co-marcado crean una pequeña red de notoriedad, no un efecto de red económico [3].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Ninguno para el consumidor.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Sabor único y marca global: Mondelez paga licencia para usar Biscoff en Cadbury, Milka y Toblerone; crecimiento por volumen sin subir precio [2, 3].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Lembeke, la mayor fábrica de un solo tipo de galleta de Europa, y producción local en EE. UU. y Tailandia [3].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Tres fábricas para tres regiones y socios en unos 50 países [2].' },
      ],
    },
    amenazas: 'Lo que puede erosionar el foso es que Biscoff sea una moda: parte del crecimiento de 2026 vino de una receta viral que la propia empresa dice no ser estructural [3]. Probabilidad baja de que la marca pierda relevancia en cinco años (penetración de solo el 10 % en EE. UU. y en ascenso), media de que el crecimiento vuelva al 8-10 % cuando se agote la moda. La marca blanca copia el especulos pero no ha frenado a Biscoff [3]. La dependencia de Mondelez en India y chocolate concentra riesgo en un socio que también es el mayor competidor en galletas [2].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que mueve las cifras: (1) salud y nutrición, por la regulación HFSS del Reino Unido y la presión sobre el azúcar; Natural Foods (25 % de las ventas) es la cobertura [1]; (2) emisiones y energía de los hornos, con objetivos de reducción de intensidad energética y el informe CSRD de 2025 con revisión limitada de Deloitte [1]; (3) envases reciclables antes de 2030 por el reglamento PPWR [1]. El abastecimiento de aceite de palma y cacao entra en el reglamento europeo de deforestación [1].',
    controversias: 'No constan sanciones, litigios relevantes ni retiradas de producto en 2023-2026 en los documentos de la empresa ni en la prensa revisada [1, 3].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics, CDP)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no las cita); 2) web de sostenibilidad; 3) páginas públicas de MSCI y Sustainalytics (requieren registro)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'CR5 de las galletas dulces', tipo: 'Complemento', intentos: '1) Informe anual de Lotus (solo ranking de marcas); 2) GMI e IMARC (resúmenes sin cuotas); 3) Mondelez (solo su cuota de galletas en sus mercados)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  P(1, 'Annual Report 2025: gobierno corporativo, informe de remuneraciones, estructura accionarial', '2026-03-31', `${L}/2025_Annual_Report_Lotus_Bakeries_Group_1.pdf`),
  P(2, 'Notice of the Ordinary and Extraordinary General Meeting 2026', '2026-03-31', `${L}/260331_Notice_of_AGM_and_publication_25AR_Lotus_Bakeries.pdf`),
  P(3, 'Press release: 2026 Half-Year Results', '2026-08-07', `${L}/260807_PR_HY2026_EN.pdf`),
  P(4, 'Press release: 2025 Annual Results', '2026-02-06', `${L}/PR_2025_Annual_Results_Lotus_Bakeries_EN_1.pdf`),
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Jan Boone (Stephenson NV)', cargo: 'Consejero delegado', desde: '2011', participacion_pct: null, trayectoria: 'Nieto del fundador; antes en PwC y director financiero de Lotus. Desde 2011 llevó las ventas de unos 300 M a 1.355 M EUR (2025), creó la marca global Biscoff, abrió Mebane y Chonburi y firmó las alianzas con Mondelez y Froneri [1, 4]. Su participación es indirecta, vía la Stichting familiar.' },
      { nombre: 'Mike Cuvelier', cargo: 'Director financiero', desde: '2013', participacion_pct: null, trayectoria: 'Antes auditor en PwC (1996-2000) y en puestos financieros de otros grupos (2000-2013); con él la deuda neta bajó a 0,25 veces el EBITDA pese al capex récord [1].' },
      { nombre: 'Isabelle Maes', cargo: 'CEO de Natural Foods y directora de marketing', desde: '2014', participacion_pct: null, trayectoria: 'Antes auditora en PwC y en Barry Callebaut; lleva el pilar que pasó a 300 M de ventas con +17 % en 2025 [1, 4].' },
      { nombre: 'Jan Vander Stichele (Vasticom BV)', cargo: 'Presidente del consejo (no ejecutivo)', desde: null, participacion_pct: null, trayectoria: 'Presidente no ejecutivo, reelegido en 2025 hasta la junta de 2029 [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Biscoff: volumen limitado a +10 % por capacidad de la galleta original; Tailandia operativa a finales de 2025', real: 'Biscoff +13 % orgánico; primeras galletas de Chonburi antes de fin de año', cumplida: 'Sí' },
      { anio: '2026', guia: 'Tailandia plenamente operativa al final del 1S26 «como muy tarde»; capex de unos 250 M en 2026-2027', real: 'Operativa en el 1S26 y en la parte alta de lo esperado; capex elevado a más de 250 M', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y familiar en la cabeza: Jan Boone lleva quince años de consejero delegado y el director financiero trece [1]. La empresa no publica guía numérica de ventas ni de margen, así que el historial se mide por los hitos operativos, que ha cumplido o adelantado (Tailandia) [3, 4]. La sucesión no es un asunto inmediato (Boone es de la tercera generación y su mandato llega a 2029), pero no hay plan público.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Vasticom BV (Jan Vander Stichele)', cargo: 'Presidente', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Stephenson NV (Jan Boone)', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2011', comisiones: null },
      { nombre: 'Beneconsult BV (Benedikte Boone)', cargo: 'Consejera', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'PMF NV (Emanuel Boone)', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Concellent NV (Sofie Boone)', cargo: 'Consejera', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Anton Stevens', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Benoit Graulich BV (Benoit Graulich)', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Palumi BV (Peter Bossaert)', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y sostenibilidad' },
      { nombre: 'Lema BV (Michel Moortgat)', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Eagli BV (Noelle Goris)', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.13, fijo: 1.66, variable_corto: 0.73, variable_largo: 0.73, ratio_salario_medio: 47 },
    remuneracion: 'El consejero delegado (a través de Stephenson NV) cobró 3,13 M EUR en 2025: 1,39 M de fijo, 0,23 M de pensión, 0,05 M de otros beneficios, 0,73 M de variable anual y 0,73 M de variable plurianual (53 % fijo / 47 % variable) [1]. El resto del comité de dirección, 5,78 M [1]. La ratio frente a la mediana de la plantilla es de 47 a 1 (49 en 2024) [1]. Los consejeros no ejecutivos cobran un fijo y reciben acciones [1]. El informe no detalla métricas de rentabilidad del capital (ROIC o TSR) en el variable; hay planes de opciones para directivos (1.885 pendientes) [1]. No hemos encontrado el resultado de la votación del informe de remuneraciones.',
    accionistas: [
      { nombre: 'Stichting Aandelen Lotus Bakeries (familias Boone y Stevens)', pct: 50.0, tipo: 'Control familiar (62,22 % de los votos por el voto doble)', variacion: 'Sin notificaciones en 2025; colocó un 10 % en 2021 [1]' },
      { nombre: 'Autocartera', pct: 0.49, tipo: 'Autocartera (voto suspendido)', variacion: '3.960 acciones a dic-25 [1]' },
      { nombre: 'Capital flotante', pct: 49.51, tipo: 'Institucional y minorista', variacion: 'Rotación del flotante superior al 40 % anual [1]' },
    ],
    insiders: [],
    control_y_defensas: 'La Stichting Aandelen Lotus Bakeries tiene el 50 % de las acciones y el 62,22 % de los votos gracias al voto doble de las acciones nominativas inscritas a nombre del mismo titular más de dos años [1]. Ninguna persona controla la Stichting, que agrupa a las familias Boone y Stevens [1]. Cuatro consejeros de las familias, más el consejero delegado, en un consejo de diez; tres independientes, que tienen mayoría en las comisiones de auditoría y de remuneraciones [1]. Una opa hostil es imposible. A favor del minoritario: el control familiar ha mantenido la empresa sin deuda, con dividendo creciente y reinversión a largo plazo; en contra: el voto doble rompe «una acción, un voto» y la familia decide el consejo [1].',
    alertas: ['Voto doble para las acciones nominativas de más de dos años: la Stichting tiene el 62,22 % de los votos con el 50 % del capital [1].', 'Consejo dominado por la familia: tres independientes de diez [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto del informe de remuneraciones en las tres últimas juntas', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no lo publica); 2) convocatoria de la junta de 2026 (solo propuestas); 3) actas de la junta en la web (no enlazadas)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo saldos de opciones y acciones de los consejeros); 2) registro de la FSMA (no accesible sin navegador); 3) prensa belga', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LOTB.BR, ^BFX y EXH3.DE (precio, rango, volumen, betas, cierres de año)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/LOTB.BR/history/' },
  { id: 2, titulo: 'Lotus Bakeries (LOTB): estimaciones 2026-2028 (ventas, EBITDA, EBIT, BPA, DPA, deuda neta)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/LOTUS-BAKERIES-NV-3732293/finances/' },
  { id: 3, titulo: 'Lotus Bakeries (LOTB): consenso (12 analistas, Outperform, objetivo medio 12.891,08 EUR) y cambios de recomendación', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/LOTUS-BAKERIES-NV-3732293/consensus/' },
  { id: 4, titulo: 'Comparables de chocolate y confitería (HSY, MDLZ, NESN, BARN, 2269.T, 2206.T y Lindt) a 14-oct-2026, en CHF', editor: 'Elaboración propia con Yahoo Finance (ficha sectorial)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/chocolate-2026-10-14-comparables.json' },
  { id: 5, titulo: 'Tipos de cambio EUR/CHF (0,9313) y EUR/USD (1,1141) del 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/EURCHF%3DX/' },
  P(6, 'Annual Report 2025 (acciones, autocartera, opciones, nota 22 de deuda)', '2026-03-31', `${L}/2025_Annual_Report_Lotus_Bakeries_Group_1.pdf`),
  { id: 7, titulo: 'Mars to acquire Kellanova in $35.9 billion deal (16,4 veces el EBITDA ajustado LTM)', editor: 'Bakery Production / Mars', tipo: 'Prensa', fecha: '2024-08-14', url: 'https://bakeryproduction.co.uk/mars-to-acquire-kellanova-in-35-9-billion-deal/' },
  P(8, 'Press release: 2026 Half-Year Results (acciones a 30-jun-2026, deuda neta)', '2026-08-07', `${L}/260807_PR_HY2026_EN.pdf`),
  { id: 9, titulo: 'Lotus Bakeries: noticias (Bernstein rebaja a Market Perform, 2-sep-2026; Berenberg sube objetivo, 17-ago-2026)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/LOTUS-BAKERIES-NV-3732293/news/' },
];
const eur = (chf) => Math.round(chf / 0.9313);
const comps = [
  { nombre: 'Mondelez', ticker: 'MDLZ', pais: 'US', capitalizacion: eur(66913), ev_ventas: 2.49, ev_ebitda_ltm: 16.3, ev_ebitda_ntm: 15.7, per_ntm: 19.0, crecimiento_pct: 3.4, margen_ebitda_pct: 15.3, roic_pct: null, dn_ebitda: 3.3, fcf_yield_pct: 2.8 },
  { nombre: 'Hershey', ticker: 'HSY', pais: 'US', capitalizacion: eur(27563), ev_ventas: 3.12, ev_ebitda_ltm: 13.9, ev_ebitda_ntm: 13.5, per_ntm: 17.2, crecimiento_pct: 3.0, margen_ebitda_pct: 22.4, roic_pct: null, dn_ebitda: 1.9, fcf_yield_pct: 5.3 },
  { nombre: 'Lindt & Sprüngli', ticker: 'LISP', pais: 'CH', capitalizacion: eur(17891), ev_ventas: 3.31, ev_ebitda_ltm: 15.2, ev_ebitda_ntm: 14.5, per_ntm: 23.4, crecimiento_pct: 4.1, margen_ebitda_pct: 21.8, roic_pct: 13.2, dn_ebitda: 1.1, fcf_yield_pct: 3.3 },
  { nombre: 'Nestlé', ticker: 'NESN', pais: 'CH', capitalizacion: eur(202922), ev_ventas: 2.88, ev_ebitda_ltm: 15.5, ev_ebitda_ntm: 15.0, per_ntm: 16.6, crecimiento_pct: 3.8, margen_ebitda_pct: 18.5, roic_pct: null, dn_ebitda: 3.4, fcf_yield_pct: 2.2 },
  { nombre: 'Barry Callebaut', ticker: 'BARN', pais: 'CH', capitalizacion: eur(5751), ev_ventas: 0.66, ev_ebitda_ltm: 10.7, ev_ebitda_ntm: 12.4, per_ntm: 25.8, crecimiento_pct: -13.7, margen_ebitda_pct: 6.1, roic_pct: null, dn_ebitda: 4.1, fcf_yield_pct: null },
  { nombre: 'Meiji Holdings', ticker: '2269', pais: 'JP', capitalizacion: eur(6042), ev_ventas: 1.04, ev_ebitda_ltm: 8.2, ev_ebitda_ntm: 7.8, per_ntm: 16.6, crecimiento_pct: 4.0, margen_ebitda_pct: 12.8, roic_pct: null, dn_ebitda: 0.3, fcf_yield_pct: -2.6 },
  { nombre: 'Ezaki Glico', ticker: '2206', pais: 'JP', capitalizacion: eur(1592), ev_ventas: 0.69, ev_ebitda_ltm: 8.8, ev_ebitda_ntm: 8.5, per_ntm: 29.9, crecimiento_pct: 3.5, margen_ebitda_pct: 7.9, roic_pct: null, dn_ebitda: -1.7, fcf_yield_pct: 5.2 },
];
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Lotus Bakeries NV', nombre_corto: 'Lotus Bakeries', ticker: 'LOTB', isin: 'BE0003604155', mercado: 'Euronext Bruselas', indice_referencia: 'BEL 20',
    pais: 'Bélgica', pais_iso: 'BE', sector: 'Consumo básico', industria: 'Alimentación envasada (galletas y snacks de marca)', sede: 'Lembeke (Kaprijke, Bélgica)', fundacion: '1932', empleados: 4300, web: 'https://www.lotusbakeries.com',
    precio: 12800, fecha_precio: '2026-10-14', acciones: 0.8137, capitalizacion_publicada: null, free_float_pct: 49.5,
    max_52s: 13200, min_52s: 7270, volumen_medio_diario: '≈ 8,3 M EUR/día (682 acciones al día, 3 meses)', proximos_resultados: '2027-02-05',
  },
  consenso: {
    guidance: 'Lotus no da guía numérica de ventas ni de margen. En los resultados del 1S26 (7-ago-2026) dijo que la divisa pesará menos en el 2S26 que en el 1S26, que la presión de costes (Oriente Medio, clima) puede seguir en 2027, que el capex del grupo superará los 250 M en 2026-2027 y que invertirá al menos 500 M en Biscoff en 2026-2030 [8]. La ambición a largo plazo es hacer de Biscoff la tercera marca de galletas del mundo [8]. Resultados anuales el 5-feb-2027 [8].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1533, ebitda: 322.1, ebit: 272.7, bpa: 251.9, dpa: 102.4, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 1707, ebitda: 364.0, ebit: 306.2, bpa: 286.7, dpa: 114.3, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 1887, ebitda: 407.9, ebit: 344.0, bpa: 323.8, dpa: 127.9, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: null, mantener: null, vender: null, po_medio: 12891.08, po_min: 9000, po_max: 15000 },
    revisiones: 'Los objetivos subieron tras los resultados de 2025 (BofA, Berenberg y Kepler en febrero) y del 1S26 (Berenberg el 17-ago, Bernstein el 2-sep), pero las recomendaciones bajan: Kepler y Degroof Petercam pasaron a Mantener en febrero y Bernstein a Market Perform en septiembre [3]. La lectura es que el beneficio sube y el precio sube más: el objetivo medio (12.891,08 EUR) queda solo un 0,7 % por encima de la cotización [3]. El EBITDA de MarketScreener (322,1 M en 2026) está en la base subyacente de la empresa (EBITDA(u)), unos 4-5 M por encima del EBIT + amortización publicado; su BPA de 2025 (211,9) es el publicado [2]. Una sola fuente con estimaciones completas; el objetivo y las recomendaciones se contrastan con las notas de los brókeres citadas en prensa.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.4,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: 63.1, indice_pct: 9.2, sector_pct: 4.6 },
      { periodo: '1 año', accion_pct: 64.7, indice_pct: 11.9, sector_pct: 6.7 },
      { periodo: '3 años (anual.)', accion_pct: 22.3, indice_pct: 16.5, sector_pct: -2.9 },
      { periodo: '5 años (anual.)', accion_pct: 17.7, indice_pct: 5.7, sector_pct: -4.2 },
      { periodo: '10 años (anual.)', accion_pct: 18.7, indice_pct: 4.5, sector_pct: 0.2 },
    ],
    anual: [
      { anio: '2016', accion_pct: 41, indice_pct: -3.4 }, { anio: '2017', accion_pct: -15.3, indice_pct: 10.3 }, { anio: '2018', accion_pct: 1.6, indice_pct: -18.5 }, { anio: '2019', accion_pct: 20.5, indice_pct: 22 }, { anio: '2020', accion_pct: 42.1, indice_pct: -8.5 },
      { anio: '2021', accion_pct: 51.9, indice_pct: 19 }, { anio: '2022', accion_pct: 13.1, indice_pct: -14.1 }, { anio: '2023', accion_pct: 30.2, indice_pct: 0.2 }, { anio: '2024', accion_pct: 31, indice_pct: 15 }, { anio: '2025', accion_pct: -27.2, indice_pct: 19.1 },
    ],
    beta: 0.84, volatilidad_pct: 24.8, max_drawdown_pct: -41.7, posicion_corta_pct: null,
    comentario: 'La acción sube un 63,1 % en 2026 (de 7.850 a 12.800 EUR) frente al +9,2 % del BEL 20 y el +4,6 % del sector europeo de alimentación [1]. Viene de perder un 41,7 % entre octubre de 2024 y noviembre de 2025 (mínimo de 7.270 EUR el 18-nov-2025), cuando el mercado dudó de la capacidad y del crecimiento de Biscoff [1]. La subida tiene tres tramos: enero (de 8.220 a 10.560 EUR antes y después de los resultados de 2025), mayo-junio (11.700) y agosto (de 11.140 a 12.820 con el 1S26 y el plan de 500 M) [1, 8]. En diez años ha subido un 18,7 % anual frente al 4,5 % del índice. Bélgica no publica un registro de posiciones cortas en abierto que hayamos encontrado.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 5590, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 6320, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 8230, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 10780, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 7850, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Con el cierre de cada año y el BPA del mismo año, Lotus cotizó a 50,1 veces en 2021, 49,7 en 2022, 51,7 en 2023, 57,5 en 2024 y 37,0 en 2025 [1, 6]. Con el BPA del año siguiente (base adelantada), a 44,0, 39,7, 43,9, 50,9 y 31,3 veces. Hoy cotiza a 54,5 veces el BPA de los últimos doce meses y a unas 45 veces el de 2027: vuelve a la parte alta de su historia tras el desplome de 2025. Lo que ha cambiado es el crecimiento, que se aceleró al 14 % en el 1S26 con Biscoff por encima del 20 %, y la confianza en la capacidad (Tailandia) [8]. La prima frente a los grandes de alimentación (16-19 veces) se ha ensanchado.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Grupos cotizados de galletas, chocolate y snacks de marca: Mondelez (líder mundial de galletas y socio de Lotus), Hershey, Lindt (marca prémium europea), Nestlé, Barry Callebaut (proveedor industrial, termómetro de costes) y, por Asia, Meiji y Ezaki Glico (galletas Pocky). Kellanova ya no cotiza (Mars la compró en diciembre de 2025): queda como transacción. Datos de la ficha sectorial del chocolate del mismo día, con Yahoo del 14-oct-2026, pasados de CHF a EUR (0,9313) [4, 5]. Ninguno crece como Lotus: son comparables de negocio, no de crecimiento.',
    empresas: comps,
    comentario: 'Lotus cotiza a unas 45 veces el BPA de 2027 y a más de 30 veces el EBITDA de los próximos doce meses, el doble o el triple que el grupo (mediana del PER de 19,0 veces) [4]. La prima tiene base: crece al 10-14 % frente al 3-4 % de los grandes, sin deuda (frente a 1,9-3,4 veces de Hershey, Mondelez y Nestlé) y con un margen EBITDA del 20 %, a la par de Hershey y Lindt [4]. Pero ningún comparable cotizado crece así, de modo que la tabla solo dice cuánto caería el múltiplo si Lotus pasara a crecer como una alimentaria normal: a 19-23 veces, la acción valdría menos de la mitad.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-08', objetivo: 'Kellanova (Pringles, Cheez-It, Pop-Tarts)', comprador: 'Mars', ev: 32223, ev_ventas: null, ev_ebitda: 16.4, prima_pct: 44, excluir: false, comentario: '35.900 M USD con la deuda (al tipo de hoy); 16,4 veces el EBITDA ajustado LTM; cerró en diciembre de 2025 [7].' },
    ],
    comentario: 'La única gran operación del sector con múltiplo publicado es Kellanova, a 16,4 veces el EBITDA con un 44 % de prima [7]. Lotus no es opable: la Stichting familiar tiene el 50 % del capital y el 62 % de los votos [6]. Una venta solo ocurriría por decisión de la familia y el precio de mercado ya duplica cualquier múltiplo de transacción del sector, así que no damos peso a este método.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de otras compras de galletas (Hostess por Smucker, Clif Bar por Mondelez, WK Kellogg por Ferrero)', tipo: 'Complemento', intentos: '1) Comunicados de los compradores (EBITDA no comparable); 2) prensa sectorial (solo importes); 3) notas públicas de analistas (no accesibles)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto comprar/mantener/vender', tipo: 'Complemento', intentos: '1) MarketScreener (solo gráfico); 2) Investing (bloqueado); 3) prensa (solo cambios sueltos)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Lotus Bakeries: resultados y valoración («Blijf af van dit aandeel»)', editor: 'Testaankoop Invest', tipo: 'Foros y redes', fecha: '2026-08-07', url: 'https://www.test-aankoop.be/invest/beleggen/aandelen/artikels/2026/08/lotus-bakeries-resultaten-waardering' },
  { id: 2, titulo: 'Lotus Bakeries aandeel groeit hard: te duur geworden?', editor: 'De Belegger', tipo: 'Foros y redes', fecha: '2026-08-21', url: 'https://www.debelegger.nl/post/lotus-bakeries-blijft-maar-groeien-maar-is-het-aandeel-niet-te-duur-geworden' },
  { id: 3, titulo: 'Lotus Bakeries, the most expensive speculoos on the (stock) market in Europe; Biscoff propels Lotus to a 590 % increase in ten years', editor: 'MarketScreener (titulares y comentarios)', tipo: 'Foros y redes', fecha: '2026-08-25', url: 'https://www.marketscreener.com/quote/stock/LOTUS-BAKERIES-NV-3732293/news/' },
  { id: 4, titulo: 'Lotus Bakeries toujours bien orienté, nouvelle collaboration avec Mondelez', editor: 'Tradingsat / BFM Bourse', tipo: 'Foros y redes', fecha: '2026-09-22', url: 'https://www.tradingsat.com/lotus-bakeries-BE0003604155/actualites/lotus-bakeries-lotus-bakeries-toujours-bien-oriente-nouvelle-collaboration-avec-mondelez-1170557.html' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Testaankoop Invest (revista de inversores particulares, Bélgica)', fecha: '2026-08', n_comentarios: 1, tono: 'Negativo', resumen: 'Reconoce resultados excelentes, pero aconseja no comprar y recoger beneficios: la subida viene del múltiplo y un pequeño tropiezo provocaría una corrección fuerte [1].' },
      { plataforma: 'De Belegger (web de inversores neerlandesa)', fecha: '2026-08', n_comentarios: 3, tono: 'Dividido', resumen: 'Varias piezas en 2026 con el mismo hilo: el negocio crece fuerte, pero la acción sube más rápido que el beneficio y la pregunta es si está demasiado cara [2].' },
      { plataforma: 'MarketScreener (titulares y comentario de mercado)', fecha: '2026-09', n_comentarios: 4, tono: 'Dividido', resumen: '«El especulos más caro de la bolsa europea»; rebajas de Bernstein y antes de Kepler y Degroof Petercam con objetivos al alza [3].' },
      { plataforma: 'Tradingsat / BFM Bourse', fecha: '2026-09', n_comentarios: 1, tono: 'Positivo', resumen: 'La acción sube dos sesiones seguidas por la caja de Toblerone con crema Biscoff: el mercado premia cada nueva licencia de Mondelez [4].' },
    ],
    temas: [
      { tema: 'Valoración extrema', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón en la cifra: unas 45 veces el BPA de 2027 frente a 16-23 de los comparables, y el DCF queda muy por debajo del precio [D4].' },
      { tema: 'Crecimiento de Biscoff y moda viral', postura: 'Alcista', peso: 'Alto', contraste: 'Biscoff crece más del 20 % en el 1S26; la propia empresa dice que la moda del «Japanese cheesecake» acelera la notoriedad, pero no es estructural [A3].' },
      { tema: 'Alianzas con Mondelez', postura: 'Alcista', peso: 'Medio', contraste: 'India, chocolate y helado aportan ingresos de licencia sin capital; Brasil en negociación [A3].' },
      { tema: 'Capex de 500 M', postura: 'Dividida', peso: 'Bajo', contraste: 'Financiable con el flujo (deuda neta 0,3 veces el EBITDA) pero eleva el riesgo si la demanda se frena [A3].' },
    ],
    lectura: 'El sentimiento de particulares y prensa de inversión es dividido: nadie discute el negocio y casi todos dudan del precio. Coincide con la tesis del informe (empresa excelente, acción cara) y con el movimiento de los analistas, que suben objetivos pero rebajan recomendaciones. No hay euforia minorista visible ni capitulación; el riesgo que señalan (corrección por un tropiezo pequeño con el múltiplo tan alto) ya está en nuestros escenarios. Los foros abiertos (Beursduivel, IEX, Reddit) no fueron accesibles: confianza baja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros con volumen (Beursduivel, IEX, Reddit BEFire)', tipo: 'Complemento', intentos: '1) Beursduivel e IEX (sin contenido sin navegador); 2) Reddit (bloqueado); 3) Seeking Alpha y Stocktwits (sin símbolo de Lotus)', decision: 'Omitido' },
  ],
};
const fixE = (s) => s.replace(/\[A3\]/g, '[3]').replace(/\[D4\]/g, '[3]');
const Efix = JSON.parse(fixE(JSON.stringify(E)));

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Efix);
console.log('Notas A-E escritas');
