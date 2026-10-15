// Escribe las notas A-E de Rollins (corte 2026-10-15) sin subagentes, a partir de los documentos de notas/docs
// (10-K 2025, 2023 y 2021; notas de prensa 8-K de 3T25-2T26; 10-Q 2T26; proxy 2026; 8-K de la junta, del CFO y de la venta
// secundaria de nov-2025; presentación del día del inversor de mayo de 2026), del XBRL de la SEC (cuentas-xbrl.json),
// de bolsa.json y de datos de mercado (Yahoo, Stock Analysis, MarketScreener). Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/84839';

// ------------------------------------------------------------------ A. Cuentas
const fA = [
  { id: 1, titulo: 'Rollins, Inc., Form 10-K del ejercicio 2025 (cuentas y notas 1-20)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000008483926000008/rol-20251231.htm` },
  { id: 2, titulo: 'Rollins, Inc., Form 10-K del ejercicio 2023 (balance 2022-2023: intangibles y deuda)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-15', url: `${EDGAR}/000008483924000025/rol-20231231.htm` },
  { id: 3, titulo: 'Rollins, Inc., Form 10-K del ejercicio 2021 (balance 2020-2021: intangibles y deuda)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2022-02-25', url: `${EDGAR}/000008483922000011/rol-20211231x10k.htm` },
  { id: 4, titulo: 'Rollins, Inc.: hechos XBRL de los 10-K y 10-Q (companyfacts)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000084839.json' },
  { id: 5, titulo: 'Rollins, Inc. Reports Second Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-22', url: `${EDGAR}/000008483926000038/rol-20260722xex991.htm` },
  { id: 6, titulo: 'Rollins, Inc. Reports First Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-22', url: `${EDGAR}/000008483926000019/rol-20260422xex991.htm` },
  { id: 7, titulo: 'Rollins, Inc. Reports Fourth Quarter and Full Year 2025 Financial Results (8-K, anexo 99.1)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000008483926000003/rol-20260211xex991.htm` },
  { id: 8, titulo: 'Rollins, Inc. Reports Third Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-29', url: `${EDGAR}/000008483925000097/rol-20251029xex991.htm` },
  { id: 9, titulo: 'Rollins, Inc., Form 10-Q del segundo trimestre de 2026 (Romex, recompras, acciones en circulación)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${EDGAR}/000008483926000040/rol-20260630.htm` },
  { id: 10, titulo: 'Earnings call transcript: Rollins misses Q2 2026 estimates and cuts outlook', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-rollins-misses-q2-2026-estimates-and-cuts-outlook-93CH-4809226' },
  { id: 11, titulo: 'Rollins Investor & Analyst Conference 2026 (presentación del 14-may-2026)', editor: 'Rollins, Inc.', tipo: 'Primaria', fecha: '2026-05-14', url: 'https://d1io3yog0oux5.cloudfront.net/_fe47ecebf5c568f5b342d6a85a9e8851/rollins/db/952/11232/presentation/Rollins+Investor+Analyst+Conference_Agenda-combined%C2%A0%281%29.pdf' },
  { id: 12, titulo: 'Rollins (ROL) U.S. All Stars Conference: resumen (23-sep-2026)', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://quartr.com/events/rollins-inc-rol-u-s-all-stars-conference_3g7P9djY' },
];
const intang = { 2020: 418.8, 2021: 446.6, 2022: 418.7, 2023: 545.7, 2024: 541.6, 2025: 582.4 }; // contratos de clientes + marcas + otros [1, 2, 3]
const deuda = { 2020: 203.0, 2021: 155.0, 2022: 54.9, 2023: 490.8, 2024: 395.3, 2025: 609.8 }; // largo + corto plazo [1, 2, 3]
const cuenta = X.financieros.cuenta.filter((c) => +c.periodo >= 2020).map((c) => ({
  periodo: c.periodo, ingresos: r1(c.ingresos), coste_ventas: r1(c.coste_ventas ?? (c.ingresos - c.gastos_generales - c.amortizaciones - c.ebit)), gastos_generales: r1(c.gastos_generales),
  ebitda: r1(c.ebitda), amortizaciones: r1(c.amortizaciones), ebit: r1(c.ebit), resultado_financiero: r1(c.resultado_financiero),
  bai: r1(c.bai), impuestos: r1(c.impuestos), minoritarios: 0, beneficio_neto: r1(c.beneficio_neto), gastos_financieros: r1(c.gastos_financieros),
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa: r2(c.bpa), dpa: r2(c.dpa), dpa_extraordinario: 0, acciones_diluidas: r1(c.acciones_diluidas),
}));
const balance = X.balance.historico.filter((b) => +b.periodo >= 2020).map((b) => ({
  periodo: b.periodo, activo_total: r1(b.activo_total), activo_corriente: r1(b.activo_corriente), pasivo_corriente: r1(b.pasivo_corriente),
  pasivo_total: r1(b.pasivo_total), fondo_comercio: r1(b.fondo_comercio), intangibles: intang[b.periodo], inmovilizado_material: r1(b.inmovilizado_material),
  existencias: r1(b.existencias), clientes: r1(b.clientes), proveedores: r1(b.proveedores), activos_contrato: null, pasivos_contrato: null,
  caja: r1(b.caja), deuda_financiera: deuda[b.periodo], arrendamientos: 0, patrimonio_neto: r1(b.patrimonio_neto), minoritarios: 0, reservas: r1(b.reservas),
}));
const flujos = X.flujos.historico.filter((f) => +f.periodo >= 2020).map((f) => ({
  periodo: f.periodo, flujo_operativo: r1(f.flujo_operativo), capex: r1(f.capex), pagos_arrendamientos: 0, adquisiciones: r1(f.adquisiciones),
  desinversiones: r1(f.desinversiones ?? 0), dividendos: r1(f.dividendos), recompras: r1(f.recompras), emision_acciones: 0, intereses_en_financiacion: 0,
}));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3924.0, ebitda: 861.8, ebit: 731.9, beneficio_neto: 531.7, bpa: 1.10, dpa: 0.71, dpa_extraordinario: 0, fcf: 619.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Rollins pasó de 2.161 M USD de ventas en 2020 a 3.761 M en 2025 (11,7 % anual) [1, 4]. Algo más de la mitad es orgánico: 6,9 % en 2025 (residencial 5,0 %, comercial 7,6 %, termitas y servicios auxiliares 9,9 %) y 4,1 puntos de compras, sobre todo Saela (207,2 M, abril de 2025) [7, 1]. En 2026 el orgánico baja: 6,6 % en el 1T y 5,7 % en el 2T, con residencial al 3,6 % en el 2T [6, 5]. El margen EBIT se movió poco: 17,4 % en 2020, 19,3 % en 2025 y 18,7 % en el 2T26 frente al 19,8 % del 2T25 [4, 5]: el coste de personal de servicio (30,5 % de las ventas en el 2T26 frente a 29,8 %), la flota y los gastos médicos crecieron más que las ventas con menos contactos residenciales [5]. La amortización de intangibles comprados pasó de 38,7 M en 2020 a 90,4 M en 2025 [1, 4]: es el coste contable de crecer comprando.',
    ajustes: 'Usamos las cifras publicadas (US GAAP). La empresa da un BPA ajustado que suma la amortización de intangibles y el ajuste del pago contingente de tres compras (Fox, Saela y Romex) y quita plusvalías por venta de activos: 1,12 USD frente a 1,09 publicados en 2025 y 0,55 frente a 0,52 en el primer semestre de 2026 [7, 5]. No lo usamos: la amortización de lo comprado es un coste real de un comprador en serie. El EBITDA del XBRL es EBIT + toda la amortización (incluida la de intangibles: 90,4 M de 124,7 M en 2025) [1]; el ajustado de la empresa (855 M en 2025) suma además unos 4 M de pagos contingentes y quita plusvalías [7]. Sin partidas no recurrentes relevantes en 2020-2025 salvo la plusvalía de 2,3 M en 2025 [7]. El tipo efectivo de 2025 (24,9 %) baja por la compra de créditos fiscales transferibles [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 916.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.28, vs_consenso: null },
      { periodo: '4T24', ingresos: 832.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.22, vs_consenso: null },
      { periodo: '1T25', ingresos: 822.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 171.9, margen_ebitda_pct: 20.9, bpa: 0.22, vs_consenso: null },
      { periodo: '2T25', ingresos: 999.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 230.4, margen_ebitda_pct: 23.0, bpa: 0.29, vs_consenso: null },
      { periodo: '3T25', ingresos: 1026.1, crecimiento_pct: 12.0, crecimiento_organico_pct: 7.2, ebitda: null, margen_ebitda_pct: null, bpa: 0.34, vs_consenso: null },
      { periodo: '4T25', ingresos: 912.9, crecimiento_pct: 9.7, crecimiento_organico_pct: 5.7, ebitda: null, margen_ebitda_pct: null, bpa: 0.24, vs_consenso: null },
      { periodo: '1T26', ingresos: 906.4, crecimiento_pct: 10.2, crecimiento_organico_pct: 6.6, ebitda: 178.0, margen_ebitda_pct: 19.6, bpa: 0.22, vs_consenso: 'En línea' },
      { periodo: '2T26', ingresos: 1078.6, crecimiento_pct: 7.9, crecimiento_organico_pct: 5.7, ebitda: 232.8, margen_ebitda_pct: 21.6, bpa: 0.30, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En el 2T26 (22-23-jul-2026) la dirección admitió que los resultados quedaron «por debajo de lo esperado»: los contactos de clientes residenciales que llegan por buscadores, medios digitales y llamadas «empeoraron a lo largo del trimestre», sobre todo en Orkin, mientras las marcas de venta puerta a puerta y de constructores crecieron (Fox en torno al 15-19 % orgánico, HomeTeam a doble dígito) [5, 10]. Rebajó la guía de 2026 a un orgánico de «al menos el 6 %» (en el 10-K y en el día del inversor de mayo era del 7-8 %) y a un margen incremental de al menos el 10 % (25-30 % en mayo), y mantuvo el 2-3 % de compras y el objetivo a medio plazo [10, 11, 1]. Las preguntas se repitieron sobre la causa de la caída de contactos y el papel de la búsqueda con IA: el primer ejecutivo dijo que «no lo puede cuantificar» y que no hay una sola explicación [10]. En la conferencia de JPMorgan del 23-sep la dirección atribuyó, según un resumen de terceros, el 50-60 % de la caída de contactos al cambio a las respuestas con IA de Google desde mayo, y dijo haber recomprado unos 100 M de acciones en el 3T [12]. Frente al 1T (22-abr), cuando el director financiero hablaba de un marzo con un 8 % orgánico y de un «buen arranque» de temporada [6], el discurso pasó de la confianza a la cautela, y el director financiero dejó la empresa el 15-jun.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 215.9 }, { anio: '2027-2034', importe: 0 }, { anio: '2035', importe: 500 }],
    liquidez: 'Caja de 109,1 M al 30-jun-2026; línea de crédito revolving de 1.000 M sin disponer que respalda un programa de papel comercial de 1.000 M (215,9 M de deuda a corto en junio) [5, 1].',
    rating: 'BBB+ (Fitch) y BBB (S&P), grado de inversión [11]',
    coste_deuda_pct: 4.9,
    vida_media_anios: 7.0,
    otros_pasivos: 'Arrendamientos operativos de 412,3 M a junio de 2026 (US GAAP: su gasto, 159,9 M en 2025, ya está en el EBITDA, así que no van al puente) [5, 1]. Pasivo por seguros (autoseguro de accidentes, flota y salud) de 141,1 M entre corto y largo plazo [5]. Pagos contingentes y retenciones de compras dentro de otros pasivos (Fox 28,0 M de contingente al cierre de 2023; Saela y Romex con retenciones) [1, 9]. Ingresos anticipados de clientes de 196,5 M [5]. Sin pensiones de prestación definida relevantes tras la liquidación de 2019 [4]. Avales y cartas de crédito por importes pequeños [1].',
    comentario: 'La deuda financiera subió de 54,9 M en 2022 a 609,8 M en 2025 y 703,0 M en junio de 2026, para pagar la recompra de 2023 (300 M), la de 2025 (200 M) y las compras de Fox, Saela y Romex [1, 2, 5]. Aun así el apalancamiento es bajo: 1,0 veces con la definición de la empresa (deuda + arrendamientos − 90 % de la caja, sobre EBITDAR) y unas 0,7 veces la deuda neta sobre el EBITDA [5]. El circulante comercial es pequeño (existencias + clientes − proveedores ≈ 5 % de las ventas) y los ingresos anticipados lo financian; además hay 167 M de financiación a clientes de termitas a largo plazo [5]. Los 500 M de bonos al 5,25 % vencen en 2035 [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'Conversión muy alta: flujo operativo de 678 M y caja libre (después de 28 M de capex) de 650 M en 2025, un 123 % del beneficio neto, porque la amortización de intangibles (90 M) no es caja y el capex es menos del 1 % de las ventas [1, 7]. En el primer semestre de 2026 la caja libre bajó un 10 % (277 frente a 308 M) por 40 M de impuestos adelantados por la estrategia de créditos fiscales y 9 M del paso a intereses semestrales de los bonos [6, 5]. El capex de mantenimiento es casi todo el capex (vehículos en arrendamiento, sistemas): la inversión de crecimiento de Rollins son las compras, 310 M en 2025 (8 % de las ventas) y 1.255 M en 2020-2025 [1, 4]. Uso de la caja 2015-2025 según la empresa: 42 % dividendos, 39 % compras, 13 % recompras y 6 % capex [11].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: 3, opinion: 'Favorable, sin salvedades ni asuntos críticos de auditoría; control interno eficaz [1]',
    comentario: 'Pocas señales contables. Deloitte audita desde 2023 (antes Grant Thornton) [1]. El ingreso se reconoce al prestar el servicio; los contratos anuales cobrados por adelantado (196,5 M de ingresos anticipados) y la financiación a clientes de termitas (167 M) son las partidas con juicio [5]. El riesgo contable relevante está en las compras: el fondo de comercio llega a 1.449 M (43 % del activo) y los intangibles a 602 M, con contratos de clientes amortizados en 7-20 años [5, 1]; alargar vidas útiles o pagar más por contingentes mueve el beneficio, y la empresa presenta un BPA ajustado que suma esa amortización [7]. No hubo deterioros en 2021-2025 [4]. La remuneración en acciones es de 39,7 M (7,5 % del beneficio neto) [4]. En 2019 una liquidación de pensiones (unos 50 M) bajó el resultado financiero [4]. Lectura de los indicadores del motor en el informe.',
    senales: [
      { senal: 'Fondo de comercio e intangibles de compras', nivel: 'Media', comentario: '2.051 M entre los dos a junio de 2026 (61 % del activo); la amortización de intangibles se ajusta en el BPA de la empresa [5, 7].' },
      { senal: 'Créditos fiscales transferibles', nivel: 'Baja', comentario: 'Bajan el tipo efectivo (24,9 % en 2025 frente a 26,0 %) y adelantan pagos de impuestos (40 M en el 1T26) [1, 6].' },
      { senal: 'Cambio de director financiero', nivel: 'Baja', comentario: 'El director financiero dejó la empresa el 15-jun-2026 por otra de otro sector; le sustituye el director contable, en la empresa desde 2025 [1, 9].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral creciente: 0,1825 USD desde el 1T26 (0,73 USD al año, +10,6 %), un 60-65 % del beneficio [5, 1]. Recompras oportunistas ligadas a las ventas de la familia: 300 M con la colocación de 2023 y 200 M con la de noviembre de 2025 (3,48 M de acciones a 56,93 USD) [11, 1]; 20 M en mercado en el 2T26 y unos 100 M en el 3T26 según la dirección [9, 12]. Prioridades declaradas: compras primero, luego dividendo y recompras, con un apalancamiento bajo [12, 11]. Objetivo a medio plazo: 7-8 % orgánico más 2-3 % de compras, márgenes incrementales del 30-35 % y conversión de caja por encima del 100 % [11].',
    adquisiciones: [
      { anio: '2019', objetivo: 'Clark Pest Control (California)', importe: 400, ev_ebitda: null, financiacion: 'Deuda bancaria', resultado: 'Integrada; sin deterioros [4].' },
      { anio: '2023', objetivo: 'Fox Pest Control (residencial, puerta a puerta)', importe: 339.5, ev_ebitda: null, financiacion: 'Caja y deuda; 28,0 M de pago contingente', resultado: 'Crece en torno al 15-19 % orgánico en el 2T26: la mejor marca del grupo [1, 10].' },
      { anio: '2025', objetivo: 'Saela Pest Control (residencial, puerta a puerta)', importe: 207.2, ev_ebitda: null, financiacion: 'Caja y papel comercial', resultado: 'Aportó 54,9 M de ventas en nueve meses de 2025 (unas 2,8 veces las ventas anualizadas, estimación propia) [1].' },
      { anio: '2026', objetivo: 'Romex Pest Control', importe: 95.7, ev_ebitda: null, financiacion: 'Caja y papel comercial', resultado: 'Aportó 10,2 M de ventas y 0,8 M de beneficio en el 2T26 [9].' },
      { anio: '2023-2025', objetivo: '94 compras pequeñas y medianas en tres años', importe: 835, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aportaron un 4 % de crecimiento medio anual [11, 4].' },
    ],
    comentario: 'Asignación disciplinada pero cara para el accionista de hoy: entre 2015 y 2025 la empresa generó unos 5.000 M de caja libre y gastó 2.000 M en compras y 2.100 M en dividendos [11]. Las compras rinden poco sobre el precio: Saela costó unas 2,8 veces sus ventas anualizadas (estimación propia), y con márgenes EBITDA del 20-25 % eso es un rendimiento antes de impuestos de un 7-9 %, por debajo del ROIC del grupo; por eso el ROIC con fondo de comercio baja poco a poco. Las recompras de 2023 y 2025 se hicieron a 41-57 USD, muy por encima del precio de hoy (32,63) [1]. Las acciones diluidas bajaron de 492 M (2020) a 481 M (junio de 2026) [4, 5].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Residencial', descripcion: 'Control de plagas e insectos en viviendas (Orkin, HomeTeam, Fox, Saela, Aardwolf…), contratos recurrentes y servicios puntuales.', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 1409.9, resultado: null }, { periodo: '2024', ingresos: 1535.1, resultado: null }, { periodo: '2025', ingresos: 1693.2, resultado: null }] },
      { nombre: 'Comercial', descripcion: 'Restauración, alimentación, sanidad, logística, hoteles; contratos anuales con visitas periódicas.', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 1024.2, resultado: null }, { periodo: '2024', ingresos: 1126.0, resultado: null }, { periodo: '2025', ingresos: 1244.7, resultado: null }] },
      { nombre: 'Termitas y servicios auxiliares', descripcion: 'Tratamientos y renovaciones de garantías de termitas, aislamiento, mosquitos y fauna.', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 605.5, resultado: null }, { periodo: '2024', ingresos: 688.2, resultado: null }, { periodo: '2025', ingresos: 781.5, resultado: null }] },
      { nombre: 'Franquicias y otros', descripcion: 'Cánones de franquiciados (131 en EE. UU. y 66 fuera) y otros.', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 33.7, resultado: null }, { periodo: '2024', ingresos: 39.5, resultado: null }, { periodo: '2025', ingresos: 41.5, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 92.8 }, { nombre: 'Otros países (Canadá, Australia, Reino Unido, Singapur…)', peso_pct: 7.2 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '7,9 % (2024)', valor_actual: '6,9 % (2025); 5,7 % (2T26)', variacion: '−1,0 pp; −2,2 pp', comentario: 'Guía 2026 rebajada a «al menos el 6 %» [7, 5, 10].' },
      { kpi: 'Orgánico residencial', valor_anterior: '5,0 % (2025)', valor_actual: '3,6 % (2T26)', variacion: '−1,4 pp', comentario: 'Caída de contactos digitales en Orkin [7, 5].' },
      { kpi: 'Orgánico comercial', valor_anterior: '7,6 % (2025)', valor_actual: '7,2 % (2T26)', variacion: '−0,4 pp', comentario: 'Estable [7, 5].' },
      { kpi: 'Orgánico termitas y auxiliares', valor_anterior: '9,9 % (2025)', valor_actual: '8,9 % (2T26)', variacion: '−1,0 pp', comentario: '[7, 5].' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '23,1 % (2T25)', valor_actual: '21,9 % (2T26)', variacion: '−120 pb', comentario: 'Personal, gastos médicos y flota [5].' },
      { kpi: 'Clientes y empleados', valor_anterior: '20.265 empleados (2024)', valor_actual: '> 2,8 millones de clientes; 21.946 empleados (2025)', variacion: '+8,3 % empleados', comentario: 'Más de 850 sucursales [1, 5].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento de 3T24-2T25 y EBITDA de 3T24, 4T24, 3T25 y 4T25', tipo: 'Complemento', intentos: '1) notas de prensa de 3T25 y 4T25 (dan EBITDA ajustado, no el publicado); 2) XBRL trimestral (sin amortización del 4T); 3) notas de 2024 no descargadas por tiempo', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'ingresos por línea de servicio de 2023 (comercial, termitas, franquicias) y resultado por línea', tipo: 'Complemento', intentos: '1) 10-K 2025 (tabla de 2023 solo leída en residencial); 2) Rollins tiene un solo segmento y no da resultado por línea [1]; 3) día del inversor (sin margen por línea)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ------------------------------------------------------------------ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Rollins, Inc., Form 10-K del ejercicio 2025 (negocio, competencia, riesgos, empleados)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000008483926000008/rol-20251231.htm` },
  { id: 2, titulo: 'Rollins Investor & Analyst Conference 2026 (mercado de 27.000 M USD, crecimiento del 6 %, PCT Top 100, IBISWorld, Veseris)', editor: 'Rollins, Inc.', tipo: 'Sectorial', fecha: '2026-05-14', url: 'https://d1io3yog0oux5.cloudfront.net/_fe47ecebf5c568f5b342d6a85a9e8851/rollins/db/952/11232/presentation/Rollins+Investor+Analyst+Conference_Agenda-combined%C2%A0%281%29.pdf' },
  { id: 3, titulo: 'Rentokil Initial plc, Annual Report 2025 (anexo 15.1 del Form 20-F): mercado mundial de 29.000 M USD, Norteamérica 14.200 M', editor: 'Rentokil Initial plc (SEC)', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.sec.gov/Archives/edgar/data/930157/000110465926034062/rto-20251231xex15d1.htm' },
  { id: 4, titulo: 'Ecolab Inc., Form 10-K 2025 (segmento Global Pest Elimination)', editor: 'Ecolab Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-23', url: 'https://www.sec.gov/Archives/edgar/data/31462/000110465926018357/ecl-20251231x10k.htm' },
  { id: 5, titulo: 'Anticimex Report 2023', editor: 'Anticimex Group', tipo: 'Primaria', fecha: '2024', url: 'https://uploads1.craft.co/uploads/unified_record/source/document/2110991/baa51edb3a5ecd12.pdf' },
  { id: 6, titulo: 'Análisis de Rentokil Initial del repositorio (sector, competidores y transacciones, 7-oct-2026)', editor: 'Análisis propio (repositorio)', tipo: 'Analistas', fecha: '2026-10-07', url: 'informes/rentokil-2026-10-07/datos-v4.json' },
  { id: 7, titulo: 'Ficha sectorial: control de plagas (15-oct-2026)', editor: 'Análisis propio (repositorio)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/control-plagas-2026-10-15.md' },
  { id: 8, titulo: 'Earnings call transcript: Rollins misses Q2 2026 estimates and cuts outlook', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-rollins-misses-q2-2026-estimates-and-cuts-outlook-93CH-4809226' },
  { id: 9, titulo: 'Rollins (ROL) U.S. All Stars Conference: resumen (23-sep-2026)', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://quartr.com/events/rollins-inc-rol-u-s-all-stars-conference_3g7P9djY' },
];
const Bn = {
  _estado: 'completo',
  historia: {
    resumen: 'Orkin nace en 1901 en Pensilvania; en 1964 la compra Rollins Broadcasting, la empresa de radio y televisión de los hermanos O. Wayne y John Rollins, en una de las primeras compras apalancadas de EE. UU. [1]. La familia Rollins convirtió a Orkin en el núcleo del grupo, separó las demás actividades (RPC y Marine Products, hoy cotizadas y controladas por la familia) y desde 2015 acelera las compras: HomeTeam (2008), Northwest (2016), Clark (2019), Fox (2023), Saela (2025) y Romex (2026) [1, 2]. La familia sigue con el 38 % del voto, pero vendió acciones en 2023 y en noviembre de 2025 y dejó de ser «empresa controlada» según la propia compañía [2]. Gary W. Rollins dejó el consejo en abril de 2026 [1].',
    hitos: [
      { anio: '1901', hito: 'Otto Orkin funda el negocio de control de plagas.' },
      { anio: '1964', hito: 'Rollins Broadcasting compra Orkin por unos 62 M USD.' },
      { anio: '2008', hito: 'Compra de HomeTeam Pest Defense (canal de constructores) [1].' },
      { anio: '2019', hito: 'Compra de Clark Pest Control (California) por unos 400 M USD.' },
      { anio: '2023', hito: 'Primera venta secundaria de la familia con recompra de 300 M; compra de Fox Pest Control (339,5 M) [2, 1].' },
      { anio: '2025', hito: 'Compra de Saela (207,2 M); bonos de 500 M a 2035; segunda venta de la familia (1.150 M USD a 57,50) con recompra de 200 M [1].' },
      { anio: '2026', hito: 'Día del inversor (mayo); salida del director financiero (junio); rebaja de la guía orgánica (julio) y caída de la acción de más del 50 % desde febrero [1, 8].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Rollins es el mayor grupo de control de plagas de EE. UU. y el segundo del mundo tras Rentokil-Terminix: más de 2,8 millones de clientes, unos 22.000 empleados y más de 850 sucursales, con un 92,8 % de las ventas en EE. UU. [1]. Vende tres servicios: residencial (45 % de las ventas de 2025), comercial (33 %: restauración, alimentación, sanidad, almacenes) y termitas y servicios auxiliares (21 %: tratamientos, renovación anual de garantías, mosquitos, fauna), más un 1 % de franquicias [1]. Opera con marcas propias que compiten entre sí y se reparten los canales: Orkin (nacional, capta por buscadores y llamadas), HomeTeam (constructores de viviendas nuevas), Fox y Saela (venta puerta a puerta), Clark, Northwest, Western y otras regionales [1, 8]. Fuera de EE. UU. está en Canadá, Australia, Reino Unido y Singapur, y franquicia en otros 60 países [1].',
    como_gana_dinero: 'Unos tres cuartos de las ventas son contratos de servicio recurrentes (mensuales, trimestrales o anuales, renovación de garantías de termitas) y el resto servicios puntuales [2]. El margen depende de la densidad de las rutas (más clientes por técnico y por kilómetro), del precio (la empresa sube por encima de la inflación: el precio aporta 3-4 puntos del crecimiento orgánico) y de los costes de personal, seguros, sanidad y flota [2, 1]. Captar un cliente residencial cuesta mucho (marketing y comerciales: 14,1 % de las ventas en el 2T26) y se recupera en varios años de retención, así que una caída de contactos con los costes ya dimensionados hunde el margen incremental (6,5 % en el 2T26 frente a un objetivo del 30-35 %) [8, 2]. Estacionalidad: el 2T y 3T concentran la temporada de plagas y la mayor parte del beneficio [1].',
    clientes: 'Clientes muy atomizados: más de 2,8 millones, ninguno relevante [1]. La empresa no publica la tasa de retención; dice que la retención y el precio «no son el problema» en 2026 y que la reacción a la subida de tarifas fue favorable [8]. Poder de precios: precio de 3-4 puntos al año dentro del crecimiento orgánico durante el último ciclo, con un margen EBIT estable en el 19-20 % [2, 1]. El riesgo está en la captación: en el 2T26 los contactos residenciales cayeron a doble dígito, y algunas categorías puntuales (roedores en vivienda) bajaron un 30-50 % en partes del trimestre [9, 8]. Los contratos comerciales retienen más y duran más [2].',
  },
  sector: {
    definicion: 'Servicios profesionales de control de plagas (residencial, comercial y termitas). Rollins vende casi todo en EE. UU., así que el mercado relevante es Norteamérica, unos 14.200 M USD en 2025 según Rentokil (que cita a Allied Market Research, Specialty Consultants y QuinceMarket Insights) [3], frente a unos 27.000 M USD mundiales en 2024 según la presentación de Rollins con datos de Vantage Market Research [2]. Contraste: las 100 mayores empresas de EE. UU. del ranking PCT Top 100 sumaron 13.300 M USD en 2024 [2], así que el mercado de EE. UU. con los operadores pequeños supera claramente los 14.200 M; usamos la cifra de Rentokil como perímetro de la cuota con esa salvedad. Detalle en la ficha sectorial [7].',
    tamano: '≈ 14.200 M USD en Norteamérica y 29.000 M USD en el mundo (2025, Rentokil) [3]; ≈ 27.000 M USD mundiales en 2024 (Rollins) [2]',
    unidad_serie: 'millones de USD (Norteamérica; 2030e estimación propia al 6 %)',
    serie: [{ anio: '2025', tamano: 14200 }, { anio: '2026e', tamano: 15050 }, { anio: '2028e', tamano: 16900 }, { anio: '2030e', tamano: 19000 }],
    tcac_historico_pct: 6.6, tcac_previsto_pct: 6.0, cr5_pct: 55, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Precio por encima de la inflación', efecto: '+', horizonte: 'Estructural', evidencia: 'El precio aporta 3-4 puntos del crecimiento orgánico de Rollins [2].' },
      { driver: 'Clima más cálido y urbanización', efecto: '+', horizonte: 'Estructural', evidencia: 'Temporadas más largas y nuevas especies; el mercado creció un 6,6 % anual en 2015-2025 sin años de caída [3].' },
      { driver: 'Exigencias sanitarias de los clientes comerciales', efecto: '+', horizonte: 'Estructural', evidencia: 'Comercial crece al 7-8 % orgánico en Rollins [1].' },
      { driver: 'Captación residencial por buscadores y respuestas de IA', efecto: '−', horizonte: 'Estructural', evidencia: 'Contactos residenciales con caída de doble dígito en el 2T26; la dirección atribuye un 50-60 % a las respuestas con IA de Google [9, 8].' },
      { driver: 'Consolidación por compras', efecto: '+', horizonte: 'Estructural', evidencia: 'Las 18 empresas de EE. UU. con más de 100 M sumaron 11.400 M en 2024 frente a 4.500 M de 11 en 2014 [2].' },
      { driver: 'Vivienda nueva y mudanzas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'HomeTeam crece con los constructores; los tipos altos frenan la compraventa de viviendas [1, 8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Unas 33.000 empresas de menos de 50 M; Rentokil-Terminix y Rollins compiten en precio y en captación digital [2, 3].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Millones de clientes pequeños; en comercial hay grandes cuentas que licitan [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Productos de Bayer, BASF, Syngenta y distribuidores; materiales son el 6 % de las ventas [8].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras bajas y licencias estatales sencillas; la escala da ventaja en marketing y densidad, no en el servicio [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Productos de bricolaje, que la IA puede recomendar al consumidor en vez de un profesional [8].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Mercado poco cíclico: creció un 6,6 % anual en 2015-2025 según Rentokil sin años de caída [3]; Rollins creció en 2008-09 y en 2020 (99 trimestres seguidos de crecimiento de ventas hasta el 2T26) [1, 8]. En 2022-2023 repercutió la inflación con precio. La desaceleración de 2026 no es de demanda de fondo sino de captación residencial: el comercial y las termitas siguen al 7-9 %, el residencial baja al 3,6 % [8].' },
    regulacion: 'Los plaguicidas necesitan registro federal (EPA) y estatal y pueden restringirse; los técnicos necesitan licencia estatal [1]. La FTC ha pedido a Rollins información sobre sus pactos de no competencia con empleados [6]. Los reguladores estatales vigilan las garantías y renovaciones de termitas, donde Terminix pagó multas en el pasado [6]. No hay cambios con fecha que muevan las cifras de 2026-2027.',
    tendencias: 'La captación residencial se desplaza de la publicidad pagada en buscadores a las respuestas de IA y a la presencia local: Rollins y Rentokil vieron menos contactos en 2026, y Rentokil rehízo unas 800 páginas para buscadores y asistentes de IA [9, 3]. Las marcas con venta puerta a puerta (Fox, Saela, Aptive) y con constructores (HomeTeam) aguantan mejor [8]. En comercial avanza el control conectado (trampas con sensores) [3]. Gana quien tenga marca, datos y presupuesto para adaptarse; el riesgo para Orkin es que el asistente de IA recomiende productos de bricolaje o a un competidor local.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 24, posicion: '1.º de EE. UU. y 2.º del mundo en control de plagas: ventas de 3.491 M en EE. UU. en 2025 sobre un mercado norteamericano de unos 14.200 M (≈ 24 %, estimación propia; con el perímetro del PCT Top 100, ≈ 26 % del total de las 100 mayores) [1, 3, 2]',
    competidores: [
      { nombre: 'Rentokil Initial (Terminix en EE. UU.)', pais: 'Reino Unido', ticker: 'RTO', ingresos: 7133, cuota_pct: 20, margen_ebit_pct: 12.8, comentario: 'Líder mundial; Norteamérica crece un 2-4 % orgánico frente al 6-7 % de Rollins y tiene un margen operativo ajustado del 17,4 % frente al 20,0 % de Rollins [6].' },
      { nombre: 'Anticimex (EQT)', pais: 'Suecia', ticker: null, ingresos: 1548, cuota_pct: 5.3, margen_ebit_pct: 13.8, comentario: 'Privado; compra mucho (53 operaciones en 2023) y está en EE. UU. [5].' },
      { nombre: 'Ecolab (Global Pest Elimination)', pais: 'EE. UU.', ticker: 'ECL', ingresos: 1219, cuota_pct: 4.2, margen_ebit_pct: 19.4, comentario: 'Solo comercial, vendido con la higiene de Ecolab; orgánico del 6,1 % en 2025 [4].' },
      { nombre: 'Aptive Environmental', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privado; residencial puerta a puerta, rival directo de Fox y Saela.' },
      { nombre: 'Operadores locales (≈ 33.000 empresas de menos de 50 M)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Sumaban 1.500 M entre las 76 menores del PCT Top 100 en 2024 [2].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'Sin efectos de red entre clientes.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Contratos recurrentes y garantías de termitas; cambiar de proveedor es fácil en residencial [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Orkin es la marca más conocida del sector; su valor depende de la captación por buscadores, que la IA está cambiando [8, 9].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo ajustado del 20,0 % frente al 17,4 % de Rentokil Norteamérica [6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Densidad de rutas en 850 sucursales y compras de 94 empresas en tres años; pero las barreras de entrada son bajas [1, 2].' },
      ],
    },
    amenazas: 'La amenaza principal es la captación: si los asistentes de IA y las respuestas de Google desplazan la búsqueda local, Orkin pierde el canal que le daba clientes a bajo coste y tendrá que pagar más por cada uno o moverse al puerta a puerta, que ya domina con Fox y Saela [8, 9]. Probabilidad media de un efecto material en tres años: en el 2T26 el residencial pasó del 5 % al 3,6 % orgánico [8]. Segunda amenaza: Rentokil-Terminix con precios agresivos para recuperar cuota en Norteamérica [6]. Tercera: el bricolaje recomendado por la IA para plagas leves [8].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Uso seguro de plaguicidas y registro de productos (riesgo regulatorio y reputacional) [1]. Seguridad laboral y rotación de técnicos en una plantilla de 21.946 personas, con autoseguro de accidentes y salud cuyo coste sube (gastos médicos citados en el 2T26) [1, 8]. Flota de vehículos: combustible por debajo del 2 % de las ventas y paso a híbridos [8, 9].',
    controversias: 'Investigación de la FTC sobre pactos de no competencia con empleados citada en el análisis de Rentokil [6]; sin sanciones materiales en el 10-K de 2025 [1].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy (no las citan); 2) día del inversor (no las cita); 3) MSCI y Sustainalytics requieren registro', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ------------------------------------------------------------------ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Rollins, Inc., Proxy Statement 2026 (DEF 14A)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-17', url: `${EDGAR}/000008483926000014/rol-20260317.htm` },
  { id: 2, titulo: 'Form 4 de Rollins presentados entre el 15-oct-2025 y el 15-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000084839&type=4' },
  { id: 3, titulo: 'Rollins 8-K del 1-may-2026: resultados de la junta del 28-abr-2026', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: `${EDGAR}/000008483926000029/rol-20260428.htm` },
  { id: 4, titulo: 'Rollins Announces CFO Transition (8-K del 27-may-2026, anexo 99.1)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-27', url: `${EDGAR}/000008483926000032/exhibit991pressreleasedate.htm` },
  { id: 5, titulo: 'Rollins Announces Closing of Secondary Public Offering (8-K del 12-nov-2025, anexo 99.1)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-12', url: `${EDGAR}/000162828025051604/exhibit991-closing8xkxnove.htm` },
  { id: 6, titulo: 'Form 4 del Gary W. Rollins Voting Trust del 21-sep-2026 (reparto de acciones con voto de LOR, Inc. al beneficiario)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-21', url: `${EDGAR}/000110465926109325/tm2623803-1_4seq1.xml` },
  { id: 7, titulo: 'Rollins, Inc., Form 10-K del ejercicio 2025 (guía 2026: 7-8 % orgánico)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000008483926000008/rol-20251231.htm` },
  { id: 8, titulo: 'Earnings call transcript: Rollins misses Q2 2026 estimates and cuts outlook', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-rollins-misses-q2-2026-estimates-and-cuts-outlook-93CH-4809226' },
  { id: 9, titulo: 'Rollins Investor & Analyst Conference 2026 (cumplimiento de objetivos desde el día del inversor anterior)', editor: 'Rollins, Inc.', tipo: 'Primaria', fecha: '2026-05-14', url: 'https://d1io3yog0oux5.cloudfront.net/_fe47ecebf5c568f5b342d6a85a9e8851/rollins/db/952/11232/presentation/Rollins+Investor+Analyst+Conference_Agenda-combined%C2%A0%281%29.pdf' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Jerry E. Gahlhoff, Jr.', cargo: 'Presidente y primer ejecutivo', desde: '2022', participacion_pct: 0.08, trayectoria: 'Entró con la compra de HomeTeam (2008), dirigió las marcas y Orkin y es primer ejecutivo desde 2022. Con él las ventas pasaron de 2.696 M (2022) a 3.761 M (2025) y el BPA de 0,75 a 1,09 USD, pero en 2026 incumplió la guía orgánica [1, 7, 8].' },
      { nombre: 'John F. Wilson', cargo: 'Presidente ejecutivo del consejo', desde: '2022', participacion_pct: 0.13, trayectoria: 'Antes vicepresidente del consejo y presidente de operaciones; ligado a la familia por un contrato de franquicia de su hijo con Orkin (0,5 M de cánones en 2025) [1].' },
      { nombre: 'William W. Harkins', cargo: 'Director financiero', desde: '2026', participacion_pct: 0.01, trayectoria: 'Director contable desde marzo de 2025; antes director contable de Mohawk. Sustituyó el 15-jun-2026 a Kenneth Krause, que se fue a otra empresa [4].' },
      { nombre: 'Elizabeth B. Chandler', cargo: 'Directora jurídica y secretaria del consejo', desde: '2013', participacion_pct: 0.01, trayectoria: 'En la empresa desde 2013 [1].' },
      { nombre: 'Gary W. Rollins', cargo: 'Presidente emérito (sin voto en el consejo desde abril de 2026)', desde: '1964', participacion_pct: 3.22, trayectoria: 'Dirigió la empresa durante décadas; dejó el consejo en la junta de 2026 y sigue como invitado sin voto [1].' },
    ],
    historial_guidance: [
      { anio: '2023-2025', guia: 'Objetivo a medio plazo: 7-8 % orgánico, 2-3 % de compras, márgenes incrementales del 30-35 %', real: '8 % orgánico, 4 % de compras, margen incremental del 25 % de media [9]', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Crecimiento orgánico del 7-8 %', real: '6,9 % orgánico; BPA +13,5 % [7]', cumplida: 'Parcial' },
      { anio: '2026', guia: '7-8 % orgánico y 25-30 % de margen incremental (febrero y mayo)', real: 'Rebajada en julio a «al menos el 6 %» y «al menos el 10 %» [7, 9, 8]', cumplida: 'No' },
    ],
    comentario: 'Equipo de la casa, con credibilidad dañada en 2026: tres meses después de reafirmar en el día del inversor un 7-8 % orgánico para 2026, la dirección lo bajó a «al menos el 6 %» y reconoció haber dimensionado la plantilla para una demanda que no llegó [9, 8]. El director financiero que llevó la modernización financiera (bonos, papel comercial, ventas de la familia) se fue en junio a otra empresa [4]. La sucesión del primer ejecutivo no está anunciada; Gahlhoff tiene 55 años. El presidente ejecutivo y la directora jurídica son de la órbita de la familia [1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'John F. Wilson', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '2013', comisiones: '—' },
      { nombre: 'Jerry E. Gahlhoff, Jr.', cargo: 'Consejero y primer ejecutivo', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Louise S. Sams', cargo: 'Consejera coordinadora', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos y gobierno' },
      { nombre: 'Susan R. Bell', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Donald P. Carson', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría' },
      { nombre: 'Paul D. Donahue', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Retribuciones' },
      { nombre: 'Patrick J. Gunning', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría' },
      { nombre: 'Gregory B. Morrison', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Retribuciones (presidente)' },
      { nombre: 'Timothy C. Rollins', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 92.4, voto_remuneracion_contra_pct: 7.6, voto_remuneracion_contra_libre_pct: 12.9, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 8.97, fijo: 1.10, variable_corto: 1.68, variable_largo: 6.13, ratio_salario_medio: 138 },
    remuneracion: 'El variable a largo plazo del primer ejecutivo es en acciones restringidas y unidades de rendimiento que dependen del crecimiento anual compuesto de tres años, del margen EBITDA ajustado y de la rentabilidad para el accionista frente a un grupo [1]: hay métrica de rentabilidad para el accionista, no de ROIC. Total de 2025: 8,97 M USD (1,10 fijo, 1,68 de bonus anual y 6,13 en acciones), 138 veces el salario mediano de 65.116 USD [1]. Cláusula de recuperación desde 2023 y prohibición de cobertura y pignoración [1]. El voto consultivo se hace cada tres años: en 2026 salió con un 92,4 % a favor y un 7,6 % en contra (estimación propia del voto en contra sobre el capital libre presente, descontando los 182,5 M de votos del grupo familiar: 12,9 %) [3, 1].',
    accionistas: [
      { nombre: 'Grupo familiar Rollins (LOR, Inc., fideicomisos de voto y familiares)', pct: 37.86, tipo: 'Familia de control', variacion: 'Vendió 20,0 M de acciones en nov-2025 (1.150 M USD a 57,50); bloqueo de 365 días hasta nov-2026; en sep-2026 el fideicomiso de voto de Gary W. Rollins repartió el voto de LOR a su beneficiario [5, 6]' },
      { nombre: 'Vanguard', pct: 7.94, tipo: 'Institucional', variacion: '13G' },
      { nombre: 'BlackRock', pct: 5.92, tipo: 'Institucional', variacion: '13G/A' },
    ],
    insiders: [
      { fecha: '2025-11-10', persona: 'LOR, Inc. y Rollins Holding Company (familia Rollins)', operacion: 'Venta', acciones: 20000000, importe: 1150.0 },
      { fecha: '2026-01-26', persona: 'Gary W. Rollins (presidente emérito)', operacion: 'Venta', acciones: 29449, importe: 1.86 },
      { fecha: '2026-01-26', persona: 'John F. Wilson (presidente ejecutivo)', operacion: 'Venta', acciones: 14402, importe: 0.90 },
      { fecha: '2026-02-25', persona: 'Elizabeth B. Chandler (directora jurídica)', operacion: 'Venta', acciones: 17681, importe: 1.06 },
      { fecha: '2026-01-26', persona: 'Jerry E. Gahlhoff, Jr. (primer ejecutivo)', operacion: 'Venta', acciones: 5817, importe: 0.37 },
    ],
    control_y_defensas: 'Una sola clase de acciones; el consejo pasa a elegirse cada año desde 2025 [9]. El grupo familiar Rollins controla el 37,86 % del voto y decide de hecho el consejo: tiene dos consejeros dominicales hasta 2026 (Pamela y Timothy Rollins; Gary W. Rollins salió en abril) y controla también más del 50 % de RPC y Marine Products, con consejeros compartidos [1]. La empresa dice que dejó de ser «empresa controlada» tras la colocación de 2023 [9]. Operaciones vinculadas pequeñas pero constantes: alquiler del avión de Gary W. Rollins (0,7 M), servicios de pilotos y hangar a LOR (2,7 M cobrados) y una franquicia de Orkin del hijo del presidente ejecutivo [1]. La familia vende de forma ordenada con recompra de la empresa (2023 y 2025); el bloqueo de la última colocación vence en noviembre de 2026 [5].',
    alertas: [
      'Ventas recurrentes del grupo familiar (2023 y nov-2025: 1.150 M USD) con la empresa recomprando a 56,93 USD, un 74 % por encima del precio de hoy; el bloqueo vence el 10-nov-2026 [5].',
      'Reorganización del control familiar: el 17-sep-2026 el fideicomiso de voto de Gary W. Rollins repartió el voto de LOR, Inc. a su beneficiario [6].',
      'Salida del director financiero en junio de 2026, un mes antes de la rebaja de la guía [4, 8].',
      'Ninguna compra de directivos en mercado en 12 meses pese a una caída de más del 50 % [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ------------------------------------------------------------------ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (ROL, SPY, XLI) hasta el 14-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ROL/history/' },
  { id: 2, titulo: 'Rollins, Inc.: previsiones financieras 2024-2028 (ventas, EBITDA, beneficio, BPA, DPA)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://ca.marketscreener.com/quote/stock/ROLLINS-INC-209671901/finances/' },
  { id: 3, titulo: 'Rollins (ROL) Stock Forecast & Price Target (19 analistas)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rol/forecast/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,19 % el 14-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Ficha sectorial de servicios a empresas (comparables al 13-oct-2026)', editor: 'Análisis propio (repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/servicios-uniformes-2026-10-14-comparables.json' },
  { id: 7, titulo: 'Yahoo Finance: cierres del 13 y 14-oct-2026 de CTAS, ECL, ABM, VSTS y ARMK', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://query1.finance.yahoo.com/v8/finance/chart/' },
  { id: 8, titulo: 'Análisis de Rentokil Initial del repositorio (transacciones: Terminix, France Workwear, SOLitude)', editor: 'Análisis propio (repositorio)', tipo: 'Analistas', fecha: '2026-10-07', url: 'informes/rentokil-2026-10-07/datos-v4.json' },
  { id: 9, titulo: 'Rollins, Inc., Form 10-K 2025 (compra de Saela: 207,2 M; 54,9 M de ventas en nueve meses)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000008483926000008/rol-20251231.htm` },
  { id: 10, titulo: 'Rollins, Inc., Form 10-Q 2T26 (Romex: 95,7 M; 10,2 M de ventas en el trimestre; 481,1 M de acciones al 13-jul-2026)', editor: 'Rollins, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${EDGAR}/000008483926000040/rol-20260630.htm` },
  { id: 11, titulo: 'Cintas to acquire UniFirst (8-K, anexo 99.1)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-11', url: 'https://www.sec.gov/Archives/edgar/data/723254/000095010326003567/dp243132_ex9901.htm' },
  { id: 12, titulo: 'Rollins stock heads into the open after a 6.43 percent drop (Piper Sandler rebaja a neutral, objetivo 33 USD)', editor: 'ad-hoc-news (MarketBeat/Yahoo)', tipo: 'Prensa', fecha: '2026-09-24', url: 'https://www.ad-hoc-news.de/boerse/news/vorboerse/rollins-stock-heads-into-the-open-after-a-6-43-percent-drop/70181850' },
  { id: 13, titulo: 'Rollins Inc. schedules date for release of third quarter 2026 financial results (21-oct-2026)', editor: 'Finviz (nota de prensa)', tipo: 'Primaria', fecha: '2026-10', url: 'https://finviz.com/news/400010/rollins-inc-schedules-date-for-release-of-third-quarter-2026-financial-results' },
];
const sube = (e, r) => {
  const ev = e.capitalizacion / (1 - (e.dn_ebitda ?? 0) / e.ev_ebitda_ltm);
  const evN = ev + e.capitalizacion * (r - 1); const k = evN / ev;
  return { ...e, capitalizacion: Math.round(e.capitalizacion * r), ev_ventas: r2(e.ev_ventas * k), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: e.ev_ebitda_ntm == null ? null : r1(e.ev_ebitda_ntm * k), per_ntm: r1(e.per_ntm * r), fcf_yield_pct: r1(e.fcf_yield_pct / r) };
};
// Comparables de la ficha de servicios a empresas (13-oct) llevados al 14-oct en EE. UU. [6, 7]; los europeos se quedan al 13-oct.
const comps = [
  sube({ nombre: 'Cintas', ticker: 'CTAS', pais: 'US', capitalizacion: 82800, ev_ventas: 7.6, ev_ebitda_ltm: 26.4, ev_ebitda_ntm: null, per_ntm: 35.8, crecimiento_pct: 7.9, margen_ebitda_pct: 28.1, roic_pct: 29.6, dn_ebitda: 0.7, fcf_yield_pct: 2.3 }, 208.63 / 206.38),
  sube({ nombre: 'Ecolab', ticker: 'ECL', pais: 'US', capitalizacion: 80079, ev_ventas: 5.52, ev_ebitda_ltm: 22.9, ev_ebitda_ntm: 18.3, per_ntm: 32.2, crecimiento_pct: 10, margen_ebitda_pct: 24.1, roic_pct: 13.4, dn_ebitda: 2.3, fcf_yield_pct: 2.3 }, 287.71 / 285.66),
  { nombre: 'Rentokil Initial', ticker: 'RTO', pais: 'GB', capitalizacion: 10338, ev_ventas: 1.99, ev_ebitda_ltm: 9.7, ev_ebitda_ntm: 9.7, per_ntm: 20.2, crecimiento_pct: 3.3, margen_ebitda_pct: 20.4, roic_pct: 7, dn_ebitda: 2.5, fcf_yield_pct: 5 },
  { nombre: 'Elis', ticker: 'ELIS', pais: 'FR', capitalizacion: 5300, ev_ventas: 1.89, ev_ebitda_ltm: 5.3, ev_ebitda_ntm: 4.9, per_ntm: 12.7, crecimiento_pct: 4.8, margen_ebitda_pct: 35.4, roic_pct: 6.1, dn_ebitda: 2.6, fcf_yield_pct: 7.7 },
  sube({ nombre: 'ABM Industries', ticker: 'ABM', pais: 'US', capitalizacion: 2974, ev_ventas: 0.55, ev_ebitda_ltm: 9.5, ev_ebitda_ntm: 8.1, per_ntm: 12.2, crecimiento_pct: 4.5, margen_ebitda_pct: 5.7, roic_pct: 7.3, dn_ebitda: 3.6, fcf_yield_pct: 5.2 }, 50.64 / 50.69),
  sube({ nombre: 'Aramark', ticker: 'ARMK', pais: 'US', capitalizacion: 14470, ev_ventas: 1.03, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: null, per_ntm: 20.8, crecimiento_pct: 8.3, margen_ebitda_pct: 7.3, roic_pct: 7.4, dn_ebitda: 4.1, fcf_yield_pct: 3.0 }, 54.75 / 54.78),
  sube({ nombre: 'Vestis', ticker: 'VSTS', pais: 'US', capitalizacion: 1850, ev_ventas: 1.16, ev_ebitda_ltm: 12.4, ev_ebitda_ntm: null, per_ntm: 19.4, crecimiento_pct: 0.6, margen_ebitda_pct: 9.3, roic_pct: 5.2, dn_ebitda: 5.1, fcf_yield_pct: 7.4 }, 13.97 / 14.31),
];
const ms = (y) => B.cierres_ejercicio.find((c) => c.anio === y)?.precio_cierre ?? null;
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Rollins, Inc.', nombre_corto: 'Rollins', ticker: 'ROL', isin: 'US7757111049', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industriales', industria: 'Servicios comerciales y suministros (servicios ambientales y de instalaciones: control de plagas)', sede: 'Atlanta (Georgia)', fundacion: '1948', empleados: 21946, web: 'www.rollins.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 481.1, capitalizacion_publicada: 15700, free_float_pct: 60.6,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 230 M USD/día (3 meses)', proximos_resultados: '2026-10-21',
  },
  consenso: {
    guidance: 'Guía de 2026 rebajada el 22-jul-2026: crecimiento orgánico de «al menos el 6 %» (antes 7-8 %), compras del 2-3 % de las ventas, margen EBITDA incremental ajustado de «al menos el 10 %» (antes 25-30 %), conversión de caja libre por encima del 100 %, tipo fiscal por debajo del 25 % y combustible por debajo del 2 % de las ventas. Objetivo a medio plazo (día del inversor de mayo, mantenido en julio): 7-8 % orgánico, 2-3 % de compras, márgenes incrementales del 30-35 % y crecimiento de doble dígito del beneficio y la caja. Próximos resultados: 21-oct-2026 tras el cierre [13].',
    estimaciones: [
      { periodo: '2026e', ingresos: 4085, ebitda: 889, ebit: 766, bpa: 1.12, dpa: 0.74, fuente: 'MarketScreener [2]; Stock Analysis da 4.090 M y BPA ajustado de 1,17 (17 analistas) [3]' },
      { periodo: '2027e', ingresos: 4434, ebitda: 980, ebit: 850, bpa: 1.26, dpa: 0.81, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 4805, ebitda: 1079, ebit: 936, bpa: 1.39, dpa: 0.87, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: 7, mantener: 10, vender: 2, po_medio: 41.59, po_min: 27, po_max: 66 },
    revisiones: 'A la baja. El beneficio neto de consenso de 2026 bajó de unos 585 M a 543 M entre las dos versiones de MarketScreener de los últimos meses (−7 %) [2]. Desde mayo, las recomendaciones de compra pasaron de 11 a 7 y aparecieron 2 de venta [3]; Piper Sandler bajó a neutral el 23-sep (objetivo de 46 a 33 USD) por el efecto de la búsqueda con IA y la competencia [12], Wells Fargo a 27 USD, UBS de 43 a 36, JP Morgan de 40 a 35 [3]. El BPA y el EBITDA de MarketScreener son los publicados por la empresa para el beneficio (1,09 en 2025) y ajustados para el EBITDA (855 M en 2025) [2]. Dos fuentes: MarketScreener (estimaciones a 3 años) y Stock Analysis (objetivos y recomendaciones) [2, 3].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.1,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: '',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((y) => ({ anio: y, precio_cierre: ms(y), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: '',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay comparables cotizados puros de plagas en EE. UU.: Rentokil-Terminix es el único grande y cotiza en Londres con un ROIC de un dígito; Ecolab tiene plagas solo como segmento comercial y Anticimex y Aptive no cotizan. Usamos servicios recurrentes en ruta de alta calidad (Cintas, Ecolab), el rival directo (Rentokil), textil e higiene europeo (Elis) y servicios externalizados de EE. UU. (ABM, Aramark, Vestis). Cifras de la ficha sectorial de servicios a empresas del 13-oct, las de EE. UU. llevadas al cierre del 14-oct con la variación de precio [6, 7]; los europeos se quedan al 13-oct.',
    empresas: comps,
    comentario: '',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-10', objetivo: 'Terminix Global Holdings (EE. UU., plagas y termitas)', comprador: 'Rentokil Initial', ev: 5013, ev_ventas: 2.45, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: 'Precio contabilizado de 4.537 M GBP con deuda; sobre ventas y EBITDA de 2021 (del análisis de Rentokil) [8].' },
      { fecha: '2026-03', objetivo: 'UniFirst (EE. UU., uniformes)', comprador: 'Cintas', ev: 5500, ev_ventas: 2.26, ev_ebitda: 17.6, prima_pct: null, excluir: false, comentario: 'Servicio en ruta comparable; 17,6 veces el EBITDA sin sinergias (estimación del análisis de Rentokil) [8, 11].' },
      { fecha: '2025-04', objetivo: 'Saela Pest Control (EE. UU., residencial puerta a puerta)', comprador: 'Rollins', ev: 207, ev_ventas: 2.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '207,2 M; 54,9 M de ventas en nueve meses (unas 73 M anualizadas, estimación propia: 2,8 veces) [9].' },
      { fecha: '2026-04', objetivo: 'Romex Pest Control (EE. UU.)', comprador: 'Rollins', ev: 96, ev_ventas: 2.3, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '95,7 M; 10,2 M de ventas en el 2T26 (unas 41 M anualizadas, estimación propia con estacionalidad no corregida) [10].' },
      { fecha: '2026-09', objetivo: 'SOLitude Lake Management (EE. UU.)', comprador: 'Bain Capital (vende Rentokil)', ev: 230, ev_ventas: 2.05, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '14,4 veces el beneficio operativo ajustado; sin EBITDA publicado [8].' },
      { fecha: '2025-05', objetivo: 'France Workwear (textil de Rentokil en Francia)', comprador: 'H.I.G. Capital', ev: 465, ev_ventas: 1.44, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '8,2 veces el beneficio operativo ajustado [8].' },
    ],
    comentario: '',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Stock Analysis (página de estadísticas no consultada por tiempo); 2) Yahoo (sin dato en la API de cotización); 3) Nasdaq short interest (requiere JavaScript)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'EV/EBITDA de las compras de Rollins', tipo: 'Complemento', intentos: '1) 10-K 2025 y 10-Q 2T26 (precio y ventas, sin EBITDA); 2) día del inversor (sin múltiplos); 3) prensa sectorial (sin cifra fiable)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ------------------------------------------------------------------ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: artículos y noticias de ROL (RSS, jul-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-04', url: 'https://seekingalpha.com/api/sa/combined/ROL.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $ROL (sep-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://api.stocktwits.com/api/2/streams/symbol/ROL.json' },
  { id: 3, titulo: 'Rollins Slides as Analyst Downgrade Pressures Shares / Rollins stock draws target cuts (resúmenes de noticias con comentarios)', editor: 'ad-hoc-news / Quiver Quant', tipo: 'Foros y redes', fecha: '2026-09-29', url: 'https://www.quiverquant.com/news/Rollins+Slides+as+Analyst+Downgrade+Pressures+Shares' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores y noticias)', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'Tras la caída se publicaron a la vez artículos de compra («negocio excepcional en rebajas», «la caída crea una oportunidad») y de cautela («las valoraciones siguen siendo una plaga», «la recuperación del beneficio necesita más pruebas») [1].' },
      { plataforma: 'Stocktwits ($ROL)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mayoría de particulares que buscan suelo en 30-32 USD y hablan de rebote técnico; una minoría la llama «trampa» y critica que los directivos no compren [2].' },
      { plataforma: 'Noticias con comentarios de lectores (rebajas de analistas)', fecha: '2026-09', n_comentarios: 8, tono: 'Negativo', resumen: 'Se repiten las rebajas de Piper Sandler, Wells Fargo y UBS por la búsqueda con IA y la competencia [3].' },
    ],
    temas: [
      { tema: 'La IA (respuestas de Google y asistentes) le quita clientes residenciales', postura: 'Bajista', peso: 'Alto', contraste: '' },
      { tema: 'Negocio de calidad a un múltiplo que no se veía en una década', postura: 'Alcista', peso: 'Alto', contraste: '' },
      { tema: 'Ventas de la familia y falta de compras de directivos', postura: 'Bajista', peso: 'Medio', contraste: '' },
      { tema: 'Suelo técnico en 30 USD y rebote', postura: 'Alcista', peso: 'Medio', contraste: '' },
    ],
    lectura: '',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y foros con más debate', tipo: 'Complemento', intentos: '1) Reddit (403 en la nube); 2) Motley Fool (no consultado por tiempo); 3) comentarios de Seeking Alpha (requieren registro)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
