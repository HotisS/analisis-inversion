// Escribe las notas A-E de LSEG (corte 2026-10-26) con lo leído en los documentos de notas/docs (resultados 2022, 2023 y 2025,
// semestrales 2025 y 2026), el XBRL ESEF (notas/cuentas-xbrl.json), Yahoo (notas/bolsa.json) y búsquedas web citadas.
// Iteración tras la actualización del 3T26 (22-oct-2026): parte de la carpeta lseg-2026-10-14 y añade el 3T26, Octus, Trumid, acciones, bolsa y comparables al 23-oct.
// Sector y comparables: ficha sectores/bolsas-datos-financieros-2026-10-14.md; comparables llevados al 23-oct en notas/comparables-2026-10-23.json. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const GBPUSD = 1.3154; // Yahoo, 14-oct-2026 (conversiones del sector y de los competidores, de la ficha)
const GBPUSD_MKT = 1.336; // Yahoo, 26-oct-2026 (datos de mercado al corte: comparables, transacciones, Tradeweb)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Preliminary results for the year ended 31 December 2025 (cuenta, balance, flujos, deuda neta, segmentos, guía 2026 y 2027-2029)', editor: 'London Stock Exchange Group plc (FCA NSM)', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://data.fca.org.uk/artefacts/NSM/DirectUpload/NI-000139719/NI-000139719.pdf' },
  { id: 2, titulo: 'Interim results for six months ended 30 June 2026', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/interim-report/lseg-interim-report-h1-2026-30july2026.pdf' },
  { id: 3, titulo: 'Preliminary results for the year ended 31 December 2023 (cifras de 2023 y 2022, balance de 2022 reexpresado)', editor: 'London Stock Exchange Group plc (FCA NSM)', tipo: 'Primaria', fecha: '2024-02-29', url: 'https://data.fca.org.uk/artefacts/NSM/Portal/NI-000090829/NI-000090829.pdf' },
  { id: 4, titulo: 'Preliminary results for the year ended 31 December 2022 (cifras de 2022 y 2021)', editor: 'London Stock Exchange Group plc (FCA NSM)', tipo: 'Primaria', fecha: '2023-03-02', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4691300.html' },
  { id: 5, titulo: 'Interim results for six months ended 30 June 2025', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2025-07-31', url: 'https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/interim-report/lseg-interim-report-h1-2025-31july2025.pdf' },
  { id: 6, titulo: 'Cuentas consolidadas 2020-2025 en XBRL (ESEF): cuenta, balance y flujos', editor: 'filings.xbrl.org / FCA', tipo: 'Primaria', fecha: '2026-03', url: 'https://filings.xbrl.org/' },
  { id: 8, titulo: 'Q3 2026 Trading Update (ingresos por negocio y trimestre, crecimiento orgánico, KPI, guía 2026 elevada, recompras)', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/q3-2026-trading-update/9835429' },
  { id: 9, titulo: 'London Stock Exchange Group Q3 Earnings Call Highlights (conferencia del 22-oct-2026)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://www.marketbeat.com/instant-alerts/transcript-london-stock-exchange-group-q3-earnings-call-highlights-2026-10-22/' },
  { id: 10, titulo: 'LSEG to acquire Octus (precio, ingresos y margen de Octus, efecto en BPA, financiación, apalancamiento)', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/lseg-to-acquire-octus/9835254' },
  { id: 11, titulo: 'Transactions in Own Shares (19-oct-2026): 481.039.104 acciones con voto tras amortizar las recompradas hasta el 16-oct', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/transaction-in-own-shares/9830282' },
  { id: 12, titulo: 'LSEG analyst consensus Q3 2026 (13-oct-2026): ingresos del trimestre esperados por negocio', editor: 'London Stock Exchange Group plc', tipo: 'Analistas', fecha: '2026-10-13', url: 'https://www.lseg.com/en/investor-relations/consensus' },
];
// Ingresos = total income excl. recoveries; EBITDA = EBIT publicado + amortizaciones publicadas; no recurrentes = EBITDA ajustado − EBITDA publicado.
const cuenta = [
  { periodo: '2021', ingresos: 6211, coste_ventas: 859, gastos_generales: null, ebitda: 2635, amortizaciones: 1570, ebit: 1065, resultado_financiero: -171, bai: 894, impuestos: 302, minoritarios: 130, beneficio_neto: 462, gastos_financieros: 217, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 334, bpa: 0.858, dpa: 0.95, dpa_extraordinario: 0, acciones_diluidas: 538 },
  { periodo: '2022', ingresos: 7428, coste_ventas: 1064, gastos_generales: null, ebitda: 3317, amortizaciones: 1900, ebit: 1417, resultado_financiero: -176, bai: 1241, impuestos: 262, minoritarios: 189, beneficio_neto: 790, gastos_financieros: 217, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 233, bpa: 1.418, dpa: 1.07, dpa_extraordinario: 0, acciones_diluidas: 557 },
  { periodo: '2023', ingresos: 8009, coste_ventas: 1143, gastos_generales: null, ebitda: 3514, amortizaciones: 2143, ebit: 1371, resultado_financiero: -176, bai: 1195, impuestos: 247, minoritarios: 187, beneficio_neto: 761, gastos_financieros: 335, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 263, bpa: 1.389, dpa: 1.15, dpa_extraordinario: 0, acciones_diluidas: 548 },
  { periodo: '2024', ingresos: 8494, coste_ventas: 1173, gastos_generales: null, ebitda: 3945, amortizaciones: 2482, ebit: 1463, resultado_financiero: -205, bai: 1258, impuestos: 337, minoritarios: 236, beneficio_neto: 685, gastos_financieros: 380, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 203, bpa: 1.288, dpa: 1.30, dpa_extraordinario: 0, acciones_diluidas: 532 },
  { periodo: '2025', ingresos: 8986, coste_ventas: 1113, gastos_generales: null, ebitda: 4365, amortizaciones: 2238, ebit: 2127, resultado_financiero: -158, bai: 1969, impuestos: 463, minoritarios: 257, beneficio_neto: 1249, gastos_financieros: 340, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 158, bpa: 2.384, dpa: 1.50, dpa_extraordinario: 0, acciones_diluidas: 524 },
];
const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 9296, ebitda: 4725, ebit: 2494, beneficio_neto: 1411, bpa: 2.795, dpa: 1.58, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 102 },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Refinitiv consolidada desde el 29-ene-2021 (11 meses); Borsa Italiana vendida a Euronext en abril de 2021 (actividad interrumpida, fuera de la cuenta).' },
      { periodo: '2025', descripcion: 'Mayor participación en el excedente de SwapClear (intangible de 1.171 M, octubre de 2025) y venta del 20 % de Post Trade Solutions a 11 bancos.' },
    ],
    comentario: 'Los ingresos sin recuperaciones pasaron de 6.211 M GBP en 2021 (11 meses de Refinitiv) a 8.986 M en 2025: +5,8 % publicado en 2025 y +7,1 % orgánico a tipo de cambio constante [1]. El crecimiento orgánico fue del 6,6-8,4 % cada año desde 2022 [1, 3, 4]. El EBITDA ajustado subió de 2.969 M a 4.523 M y su margen, del 47,8 % al 50,3 % (+150 pb en 2025, 100 pb de ellos por el cambio del reparto del excedente de SwapClear) [1, 4]. En el 1S26 el margen ajustado llegó al 52,7 % (+320 pb, 140 pb por SwapClear, que la empresa espera que se deshagan en gran parte en el 4T26) [2]. El beneficio publicado es mucho menor que el ajustado porque la cuenta lleva unos 1.000-1.200 M al año de amortización de intangibles comprados (sobre todo Refinitiv): 1.221 M en 2025 y 1.499 M en 2024, con un deterioro de 235 M [1]. Ningún año está distorsionado por pérdidas; 2021 no es comparable (11 meses de Refinitiv). En los nueve meses de 2026 los ingresos sin recuperaciones suman 7.206 M (+7,4 % publicado y +8,6 % orgánico) y la guía de 2026 pasa a un orgánico de al menos el 8,0 % con un margen +100-120 pb [8].',
    ajustes: 'La empresa publica cifras ajustadas que excluyen la amortización y el deterioro de intangibles comprados, los costes de integración, separación y reestructuración, y los costes de transacción [1]. Las cuentas de este informe son las publicadas; los costes de integración y reestructuración que caen dentro del EBITDA (334 M en 2021, 233 M en 2022, 263 M en 2023, 203 M en 2024 y 158 M en 2025) van en no recurrentes porque bajan con el fin de la integración de Refinitiv [1, 3, 4]. El BPA ajustado (272,4 p en 2021, 317,8 p en 2022, 323,9 p en 2023, 363,5 p en 2024 y 420,6 p en 2025) es el que usa la rentabilidad a 12 meses, porque la amortización de lo comprado no es un coste de caja recurrente; el publicado fue 85,8, 141,8, 138,9, 128,8 y 238,4 p [1, 3, 4].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 2261, crecimiento_pct: null, crecimiento_organico_pct: 7.8, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 2228, crecimiento_pct: null, crecimiento_organico_pct: 7.8, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 2219, crecimiento_pct: null, crecimiento_organico_pct: 6.4, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 2278, crecimiento_pct: null, crecimiento_organico_pct: 6.2, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 2415, crecimiento_pct: 6.8, crecimiento_organico_pct: 9.8, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 2384, crecimiento_pct: 7.0, crecimiento_organico_pct: 7.1, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T26', ingresos: 2407, crecimiento_pct: 8.5, crecimiento_organico_pct: 8.8, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la actualización del 3T26 (22-oct-2026) los ingresos sin recuperaciones fueron de 2.407 M GBP, +8,5 % publicado y +8,8 % orgánico, frente a 2.386 M y +7,8 % que esperaba el consenso compilado por la empresa (el máximo era 2.406 M) [8, 12]. Markets creció un 12,5 % (OTC +16,7 %, tesorería +21,3 %, renta fija y derivados +14,4 %) y los negocios de suscripción aceleraron al 6,6 % (6,3 % en el 1S): FTSE Russell +10,2 %, Risk Intelligence +9,8 % y Data & Analytics +5,2 %, con Workflows en el 2,8 % [8]. Por tercera vez en el año la dirección subió la guía: crecimiento orgánico de al menos el 8,0 % (6,5-7,5 % en febrero, 7,0-7,5 % en julio), margen +100-120 pb (de ellos 30 pb por SwapClear) y flujo libre para el accionista de al menos 2.800 M [8, 9]. El mismo día anunció la compra de Octus (datos de crédito privado e ilíquido) por 3.535 M USD en efectivo, financiada con deuda, y Tradeweb la de Trumid por ≈ 1.750 M USD [10]. En la conferencia los analistas preguntaron sobre todo por la parte cíclica de Markets (la dirección la atribuyó también a inversión estructural: SwapClear +18 %, CDSClear +15 %) y por los ingresos de la IA: la dirección no dio cifra, habló de derechos de uso, precio por consumo y acceso MCP, y de que la conversión en ingresos llevará tiempo [9]. Dio un dato nuevo para 2027: crecimiento orgánico de las suscripciones en torno al 7 % (≈ 6,5 % en 2026) [10]. Frente a julio, el discurso pasa de defender la IA a enseñar su uso (47.000 usuarios de AI Search, más de 50.000 en octubre; dos tercios de los 50 mayores clientes conectados por MCP) [8, 9].',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 38283, activo_corriente: 4071, pasivo_corriente: 2123, pasivo_total: 12946, fondo_comercio: null, intangibles: 31724, inmovilizado_material: 832, existencias: 0, clientes: 967, proveedores: 1782, activos_contrato: null, pasivos_contrato: 245, caja: 2665, deuda_financiera: 7654, arrendamientos: 715, patrimonio_neto: 23640, minoritarios: 1879, reservas: 3816 },
      { periodo: '2022', activo_total: 42722, activo_corriente: 5357, pasivo_corriente: 3875, pasivo_total: 14411, fondo_comercio: null, intangibles: 35066, inmovilizado_material: 797, existencias: 0, clientes: 1364, proveedores: 2004, activos_contrato: null, pasivos_contrato: 257, caja: 3209, deuda_financiera: 8151, arrendamientos: 672, patrimonio_neto: 25996, minoritarios: 2155, reservas: 3840 },
      { periodo: '2023', activo_total: 41475, activo_corriente: 6104, pasivo_corriente: 4537, pasivo_total: 15025, fondo_comercio: null, intangibles: 33147, inmovilizado_material: 716, existencias: 0, clientes: 2051, proveedores: 1896, activos_contrato: null, pasivos_contrato: 273, caja: 3580, deuda_financiera: 9063, arrendamientos: 636, patrimonio_neto: 23807, minoritarios: 2137, reservas: 2917 },
      { periodo: '2024', activo_total: 40339, activo_corriente: 5562, pasivo_corriente: 3895, pasivo_total: 15026, fondo_comercio: null, intangibles: 32970, inmovilizado_material: 681, existencias: 0, clientes: 1665, proveedores: 1885, activos_contrato: null, pasivos_contrato: 290, caja: 3475, deuda_financiera: 9331, arrendamientos: 634, patrimonio_neto: 23013, minoritarios: 2140, reservas: 1879 },
      { periodo: '2025', activo_total: 39443, activo_corriente: 6309, pasivo_corriente: 6071, pasivo_total: 17092, fondo_comercio: null, intangibles: 31273, inmovilizado_material: 695, existencias: 0, clientes: 1753, proveedores: 2300, activos_contrato: null, pasivos_contrato: 273, caja: 3949, deuda_financiera: 11091, arrendamientos: 627, patrimonio_neto: 19779, minoritarios: 2389, reservas: 1399 },
    ],
    vencimientos: [],
    liquidez: 'Caja de 4.056 M GBP a 30-jun-2026, de la que 1.277 M está reservada por requisitos regulatorios y operativos, más 3.000 M de líneas de crédito comprometidas sin disponer hasta diciembre de 2027 y 500 M USD de Tradeweb hasta noviembre de 2028 [2, 1].',
    rating: 'S&P A (estable); Moody\'s A3 (estable). LCH Ltd y LCH SA: AA- (S&P) [1].',
    coste_deuda_pct: 3.3,
    vida_media_anios: null,
    otros_pasivos: 'El balance consolidado lleva 757.261 M GBP de activos y 757.444 M de pasivos de los miembros compensadores de LCH (márgenes y fondos de garantía) [1]; se quitan de las cifras de este informe porque no son del accionista ni generan su resultado, que entra como ingreso neto de tesorería (143 M en el 1S26) [2]. Quedan 250 M por pagar en 2026 por la ampliación del excedente de SwapClear [1]. Plan de pensiones con superávit neto (238 M de activo frente a 86 M de obligación en 2025) [1]. Sin factoring ni opciones de venta de minoritarios conocidas; los minoritarios de Tradeweb (cotizada) son el pasivo asimilable más grande y van a valor de mercado en el puente.',
    comentario: 'La deuda neta operativa (sin arrendamientos y con la caja regulatoria apartada) subió de 7.178 M a 8.175 M en 2025 y a 9.982 M en junio de 2026, por el pago de SwapClear (921 M) y las recompras (2.072 M en 2025 y 2.100 M en el 1S26) [1, 2]. El apalancamiento es de 1,8 veces el EBITDA ajustado en diciembre, dentro de la banda de 1,5-2,5 veces que la empresa se fija [1]. Las cifras de balance de este informe quitan los saldos de los miembros compensadores; el circulante comercial es negativo (clientes 1.753 M frente a proveedores 2.300 M en 2025) porque las suscripciones se cobran por adelantado [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 2602, capex: 632, pagos_arrendamientos: 118, adquisiciones: 0, desinversiones: 3592, dividendos: 426, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 2737, capex: 966, pagos_arrendamientos: 150, adquisiciones: 768, desinversiones: 1056, dividendos: 567, recompras: 303, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 2942, capex: 1084, pagos_arrendamientos: 156, adquisiciones: 523, desinversiones: 0, dividendos: 611, recompras: 1207, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 3396, capex: 1008, pagos_arrendamientos: 156, adquisiciones: 1173, desinversiones: 377, dividendos: 642, recompras: 1005, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 3622, capex: 985, pagos_arrendamientos: 161, adquisiciones: 921, desinversiones: 204, dividendos: 718, recompras: 2072, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo de explotación (después de intereses e impuestos) creció de 2.602 M en 2021 a 3.622 M en 2025 [6, 1]. El flujo libre para el accionista que publica la empresa (después de capex, arrendamientos y dividendos a minoritarios) fue de 2.445 M en 2025, el 111 % del beneficio ajustado atribuible, y la guía de 2026 es de al menos 2.700 M [1]. El capex (inversión en software y plataformas, 919 M en caja en 2025) baja del 11,3 % al 10,2 % de los ingresos y la guía lo lleva al 9,5 % en 2026 y al 8 % en 2029 [1]; no se separa mantenimiento de crecimiento (estimación propia: algo más de la mitad es mantenimiento, cerca de la amortización ajustada de 1.017 M). Los impuestos pagados (396 M) son la mitad del cargo ajustado (800 M) porque la amortización de intangibles comprados es deducible en parte [1]. En 2021 las desinversiones son la venta de Borsa Italiana; en 2024 y 2025 las adquisiciones incluyen la compra de minoritarios de LCH (507 M) y el pago de SwapClear (921 M) [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades ni párrafo de énfasis)',
    comentario: 'El auditor no pudo confiar en los controles informáticos de los ingresos de Data & Analytics por «deficiencias de control de TI continuadas» y amplió las pruebas sustantivas [1]: es una debilidad de control interno, no un error en las cifras, pero conviene vigilarla. La remuneración en acciones es apreciable (176 M en 2025, un 14 % del beneficio publicado) y no se resta en el EBITDA ajustado [1]. La diferencia entre beneficio publicado y ajustado es casi toda amortización de intangibles comprados (1.221 M en 2025), que no consume caja; los costes de integración bajan cada año (de 334 M en 2021 a 158 M en 2025) [1, 4]. La conversión del beneficio ajustado en flujo libre es superior al 100 % [1]. Las cifras de balance quitan los saldos de compensación, así que los indicadores del motor se calculan sobre un balance limpio de 39.000-43.000 M.',
    senales: [
      { senal: 'Deficiencias de control de TI sobre los ingresos de Data & Analytics', nivel: 'Media', comentario: 'El auditor no se apoyó en los controles y amplió las pruebas; opinión limpia [1].' },
      { senal: 'Remuneración en acciones alta', nivel: 'Baja', comentario: '176 M en 2025, fuera del EBITDA ajustado [1].' },
      { senal: 'Beneficio ajustado muy por encima del publicado', nivel: 'Baja', comentario: 'Por la amortización de lo comprado (Refinitiv, SwapClear), sin efecto en caja [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo progresivo con un reparto del 33-40 % del BPA ajustado (150 p en 2025, el 35,7 %; 55 p a cuenta de 2026, +17 %) [1, 2]. Apalancamiento objetivo de 1,5-2,5 veces la deuda neta operativa sobre el EBITDA ajustado, en torno a la mitad de la banda; la caja sobrante vuelve en recompras: 2.100 M en 2025 y 2.600 M en lo que va de 2026, con 800 M más del programa de 3.000 M hasta febrero de 2027 y capacidad para otros 1.000-1.500 M en 2027 [1, 2, 8]. Con Octus y Trumid la deuda terminará 2027 cerca del techo de la banda (2,5 veces) y volverá a la mitad a finales de 2028 [10]. Guía 2027-2029: crecimiento de dos cifras del flujo libre por acción [1].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Refinitiv (datos, terminales Eikon/Workspace, FX, 51 % de Tradeweb)', importe: 20600, ev_ebitda: 13.1, financiacion: 'Acciones (37 % económico para Blackstone y Thomson Reuters) y asunción de deuda', resultado: 'Integración terminada y objetivos de sinergias cumplidos, pero el ROIC del grupo quedó en el 6-7 % y la acción no ha superado el máximo de 2020 [1, 3].' },
      { anio: '2023', objetivo: 'Acadia (riesgo de crédito y márgenes no compensados) y GDC', importe: 523, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en Post Trade Solutions [3].' },
      { anio: '2024', objetivo: '11,6 % adicional de LCH Group y Global Data Consortium/Infinitive', importe: 1173, ev_ebitda: null, financiacion: 'Caja', resultado: 'La propiedad de LCH Group sube a más del 95 % [1, 2].' },
      { anio: '2025', objetivo: 'Mayor parte del excedente de SwapClear hasta 2045', importe: 1171, ev_ebitda: null, financiacion: 'Caja (921 M en 2025 y 250 M en 2026)', resultado: '+100 pb de margen y +2-3 % de BPA ajustado en 2025 según la empresa [1].' },
      { anio: '2026', objetivo: 'Octus (datos, análisis y flujos de trabajo de crédito privado, ilíquido y en dificultades; >300 M USD de ingresos en 2026 con margen EBITDA ajustado ≈ 40 %)', importe: Math.round(3535 / GBPUSD_MKT), ev_ebitda: 29.5, financiacion: 'Deuda externa; cierre previsto en el 1S27 sujeto a autorizaciones', resultado: 'Pendiente de cierre. La empresa espera que sea neutral para el BPA ajustado el primer año completo y que sume después; ≈ 100 M de costes de integración en 2027-2028. Múltiplo: estimación propia (3.535 M USD ÷ ≈ 120 M USD de EBITDA 2026) [9, 10].' },
      { anio: '2026', objetivo: 'Trumid (plataforma electrónica de crédito), comprada por Tradeweb', importe: Math.round(1750 / GBPUSD_MKT), ev_ebitda: null, financiacion: 'Caja de Tradeweb (precio neto ≈ 1.750 M USD)', resultado: 'Pendiente de cierre; amplía Tradeweb en crédito [8].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Data & Analytics', descripcion: 'Terminales (Workspace), datos en tiempo real y feeds, analítica (Yield Book, Lipper).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 3859, resultado: 1569 }, { periodo: '2025', ingresos: 3978, resultado: 1617 }] },
      { nombre: 'FTSE Russell', descripcion: 'Índices (FTSE 100, Russell 2000/3000, FTSE World Government Bond) por suscripción y por activos.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 911, resultado: 594 }, { periodo: '2025', ingresos: 954, resultado: 635 }] },
      { nombre: 'Risk Intelligence', descripcion: 'Identificación de clientes y riesgo (World-Check), datos de entidades.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 531, resultado: 293 }, { periodo: '2025', ingresos: 579, resultado: 333 }] },
      { nombre: 'Markets', descripcion: 'Bolsa de Londres y Turquoise, Tradeweb, FXall, LCH (SwapClear, ForexClear, CDSClear, RepoClear), Post Trade Solutions e ingreso neto de tesorería.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 3180, resultado: 1656 }, { periodo: '2025', ingresos: 3467, resultado: 1929 }] },
      { nombre: 'Otros', descripcion: 'Otros ingresos y costes centrales.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 13, resultado: 36 }, { periodo: '2025', ingresos: 8, resultado: 9 }] },
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Crecimiento orgánico de los negocios de suscripción', valor_anterior: '6,0 % (2025)', valor_actual: '6,6 % (3T26); ≈ 6,5 % previsto en 2026 y ≈ 7 % en 2027', variacion: '+0,6 pp', comentario: 'Data & Analytics, FTSE Russell y Risk Intelligence [8, 10].' },
      { kpi: 'Crecimiento orgánico de Workflows (terminales)', valor_anterior: '3,1 % (2025)', valor_actual: '2,8 % (3T26)', variacion: '−0,3 pp', comentario: 'El negocio más expuesto a la IA; 479 M en el 3T26 [8].' },
      { kpi: 'Tasa de retención de ingresos', valor_anterior: '92,4 % (dic-25)', valor_actual: '92,8 % (jun-26)', variacion: '+0,4 pp', comentario: 'No se publica en la actualización trimestral [2].' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '48,8 % (2024)', valor_actual: '50,3 % (2025); 52,7 % (1S26); guía 2026 +100-120 pb', variacion: '+150 pb', comentario: '30 pb de la guía de 2026 por SwapClear [1, 2, 9].' },
      { kpi: 'Volumen medio diario de Tradeweb', valor_anterior: '2,58 billones USD (3T25)', valor_actual: '3,15 billones USD (3T26)', variacion: '+22,4 %', comentario: 'Derivados de tipos +46 %, crédito al contado +18,9 % [8].' },
      { kpi: 'Activos en ETF ligados a FTSE Russell (fin de periodo)', valor_anterior: '1.732.000 M USD (3T25)', valor_actual: '2.261.000 M USD (3T26)', variacion: '+30,5 %', comentario: 'Ingresos por activos +14,7 % [8].' },
      { kpi: 'Usuarios de Workspace AI Search', valor_anterior: '17.000 (jul-26)', valor_actual: '47.000 (sep-26)', variacion: '+30.000', comentario: 'Más de 50.000 en octubre según la dirección [8, 9].' },
    ],
  },
  fuentes: [...fA, { id: 7, titulo: 'LSEG shares drop following H1 costs miss', editor: 'Investment Week', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.investmentweek.co.uk/news/4121525/lseg-shares-drop-following-h1-costs-miss' }],
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de deuda de los resultados 2025 (tabla de bonos con vencimiento, sin agregado anual); 2) informe semestral 2026 (sin calendario); 3) agregar bono a bono (no hecho por tiempo)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) Resultados 2025 (solo el reparto por divisa de los ingresos); 2) semestral 2026; 3) informe anual 2025 no descargado', decision: 'Omitido' },
  ],
};
A.fuentes = A.fuentes.map((f) => f); // A7 se cita como [7]
A.trimestres.ultima_presentacion = A.trimestres.ultima_presentacion.replace('[A7]', '[7]');
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia (de la ficha sectorial)
const fB = [
  { id: 1, titulo: 'Ficha sectorial: infraestructura de mercados y datos financieros (14-oct-2026), con Burton-Taylor, SEC NRSRO y FIA', editor: 'Repositorio analisis-inversion (sectores/bolsas-datos-financieros-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: null },
  { id: 2, titulo: 'Financial Market Data/Analysis: Global Share & Segment Sizing 2026', editor: 'Burton-Taylor International Consulting (TP ICAP)', tipo: 'Sectorial', fecha: '2026-03', url: 'https://tpicap.com/burtontaylor/reports/03/2026/financial-market-dataanalysis-global-share-segment-sizing-2026' },
  { id: 3, titulo: 'Market data spend reaches record 37,3bn (2022)', editor: 'Markets Media', tipo: 'Sectorial', fecha: '2023-04', url: 'https://www.marketsmedia.com/market-data-spend-reaches-record-37-3bn' },
  { id: 4, titulo: 'Global spending on financial market data reaches record (2023, 42.000 M USD)', editor: 'Markets Media', tipo: 'Sectorial', fecha: '2024-04', url: 'https://marketsmedia.com/global-spending-on-financial-market-data-reaches-record' },
  { id: 5, titulo: 'Preliminary results 2025 (segmentos, estrategia LSEG Everywhere, SwapClear)', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://data.fca.org.uk/artefacts/NSM/DirectUpload/NI-000139719/NI-000139719.pdf' },
  { id: 6, titulo: 'Interim results H1 2026 (IA, MCP, FTSE Russell, Markets)', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/interim-report/lseg-interim-report-h1-2026-30july2026.pdf' },
  { id: 7, titulo: 'Analysis: LSEG slowly sheds AI risk tag with drive to show growth (Reuters)', editor: 'MarketScreener / Reuters', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.marketscreener.com/news/lseg-slowly-sheds-ai-risk-tag-with-drive-to-show-growth-ce7f5cdbde80f22d' },
  { id: 8, titulo: 'Informes value del repositorio: S&P Global (12-oct), Moody\'s, CME, Deutsche Börse (14-oct) e ICE (8-oct): ingresos y márgenes de los competidores de sus 10-K e informes anuales', editor: 'Repositorio analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-14', url: null },
  { id: 9, titulo: 'Is London Stock Exchange Group a buy after share price slump?', editor: 'Morningstar', tipo: 'Analistas', fecha: '2026-03', url: 'https://global.morningstar.com/en-gb/stocks/is-london-stock-exchange-group-buy-after-share-price-slump' },
  { id: 10, titulo: 'LSEG to acquire Octus (mercado de datos y flujos de mercados privados de 7.000-9.000 M USD; crédito privado de ≈ 3,5 billones USD) y Q3 2026 Trading Update', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/lseg-to-acquire-octus/9835254' },
];
const usd = (x) => Math.round(x / GBPUSD);
const B = {
  historia: {
    resumen: 'La Bolsa de Londres nace en 1801 y la sociedad cotiza desde 2001. Compró Borsa Italiana en 2007 y, bajo Xavier Rolet (2009-2017), LCH (2013) y Frank Russell (2014), y unió los índices en FTSE Russell. En 2019, ya con David Schwimmer, acordó comprar Refinitiv a Blackstone y Thomson Reuters por unos 27.000 M USD en acciones; cerró en enero de 2021 tras vender Borsa Italiana a Euronext. La compra convirtió a LSEG en el segundo proveedor mundial de datos financieros, con más de la mitad de los ingresos en datos y suscripciones. Desde 2022 Microsoft es accionista (4,2 %) y socio en la nube y en Workspace. En 2025-2026 la acción cayó por el miedo a que la IA generativa sustituya los terminales, y un fondo activista entró en el capital [5, 7].',
    hitos: [
      { anio: '2007', hito: 'Compra de Borsa Italiana.' },
      { anio: '2013', hito: 'Control de LCH, la cámara de swaps de tipos (SwapClear).' },
      { anio: '2014', hito: 'Compra de Frank Russell: nace FTSE Russell.' },
      { anio: '2021', hito: 'Cierra la compra de Refinitiv (enero) y vende Borsa Italiana a Euronext (abril).' },
      { anio: '2022', hito: 'Alianza a 10 años con Microsoft, que compra el 4,2 % del capital [5].' },
      { anio: '2024', hito: 'Retirada de Eikon y paso de los clientes a Workspace; compra del 11,6 % de LCH Group.' },
      { anio: '2025', hito: 'Acuerdos de datos para IA con Anthropic, OpenAI, Databricks y Snowflake; nuevo reparto de SwapClear y venta del 20 % de Post Trade Solutions a 11 bancos [5].' },
      { anio: '2026', hito: 'Caída del 12,8 % en un día (3-feb) por el miedo a la IA; entrada de Elliott; récord del 1S26, plan de negociación 24 horas (LSE 24) y, en octubre, compra de Octus (3.535 M USD) y de Trumid por Tradeweb (≈ 1.750 M USD) con la guía de crecimiento subida al 8 % [6, 7, 10].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'LSEG vende datos y servicios de infraestructura a bancos, gestoras, aseguradoras y empresas en todo el mundo. Data & Analytics (44 % de los ingresos sin recuperaciones de 2025) vende terminales Workspace, datos en tiempo real y feeds, y analítica; FTSE Russell (11 %) licencia índices; Risk Intelligence (6 %) vende datos de identificación y riesgo (World-Check); y Markets (39 %) agrupa la Bolsa de Londres, Tradeweb (renta fija electrónica, consolidada pero con socios minoritarios), FXall, la cámara LCH (swaps de tipos, divisas, crédito, repos) y Post Trade Solutions [5]. Más de la mitad de los ingresos y de los costes son en dólares [5].',
    como_gana_dinero: 'Cerca de tres cuartas partes de los ingresos son recurrentes: suscripciones de datos, terminales e índices, que se cobran por adelantado y se renuevan con subidas anuales de precio; el resto son comisiones por negociación y compensación, que suben con la volatilidad, y el ingreso neto de tesorería de los saldos de LCH [5, 6]. El margen depende de la escala: los costes son personal (71 % de los gastos) y tecnología, casi fijos, así que cada punto de crecimiento por encima de la inflación de costes amplía el margen (de 47,8 % a 50,3 % en tres años) [5]. FTSE Russell y Markets tienen márgenes del 56-67 %; Data & Analytics, del 41 % [5].',
    clientes: 'Ningún cliente pesa de forma significativa en los ingresos (no se publica concentración) [5]. La retención de ingresos es del 92,8 % y el ASV crece un 6,1 % [6]: las bajas son pocas y el crecimiento sale sobre todo de subidas de precio y de vender más datos al mismo cliente. Contratos de suscripción anuales o plurianuales con subida anual; en 2026 la empresa añade un cargo por usar sus datos con modelos de IA y por el acceso MCP [6]. El poder de precio se ve en que el crecimiento orgánico de Data & Analytics (5,0 %) supera al número de usuarios de terminales, que no crece (estimación propia: Workflows solo +3,1 %) [5].',
  },
  sector: {
    definicion: 'El mercado relevante es el de **datos, análisis e infraestructura de los mercados financieros**, mundial (perímetro de la ficha sectorial del 14-oct-2026 [1]). Para el tamaño se usa el gasto mundial en datos y análisis de mercados financieros de Burton-Taylor, que cubre Data & Analytics y parte de FTSE Russell y Risk Intelligence, pero no las comisiones de negociación y compensación de Markets; los índices (≈ 7.200 M USD) y las bolsas se citan aparte. Como contraste, IBISWorld da 23.400 M USD para los proveedores de datos de EE. UU. [1].',
    tamano: '≈ 37.400 M GBP (49.200 M USD) de gasto mundial en datos y análisis de mercados financieros en 2025, +6,5 % (Burton-Taylor) [1, 2]; más ≈ 5.500 M GBP (7.200 M USD) de índices [1].',
    unidad_serie: 'millones de GBP (gasto mundial en datos y análisis de mercados financieros, Burton-Taylor, convertido a 1,3154 USD/GBP)',
    serie: [
      { anio: '2019', tamano: usd(32000) }, { anio: '2022', tamano: usd(37300) }, { anio: '2023', tamano: usd(42000) }, { anio: '2025', tamano: usd(49200) }, { anio: '2030e', tamano: usd(70000) },
    ],
    tcac_historico_pct: 7.4,
    tcac_previsto_pct: 7.0,
    cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Gasto de las entidades en datos (automatización, IA, volatilidad)', efecto: '+', horizonte: 'Estructural', evidencia: '+6,5 % en 2025 y TCAC del 7,4 % en 2019-2025 [1, 2, 3, 4]; el tráfico de la red en tiempo real de LSEG creció un 29 % en el 1S26 [6].' },
      { driver: 'IA generativa', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Amenaza para terminales y analítica genérica (caída del 12,8 % de la acción el 3-feb-2026) [7]; oportunidad como proveedor de datos «listos para IA» con cargo por uso (MCP, 200 clientes) [6].' },
      { driver: 'Gestión pasiva y ETF', efecto: '+', horizonte: 'Estructural', evidencia: 'Los ETF ligados a FTSE Russell llegaron a 2 billones USD; ingresos mundiales de índices +13,4 % en 2025 [1, 6].' },
      { driver: 'Volatilidad y volúmenes de negociación y compensación', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Markets +11,9 % en el 1S26; volumen de Tradeweb +24,8 % [6].' },
      { driver: 'Tipos de interés (ingreso neto de tesorería)', efecto: '+/−', horizonte: 'Cíclico', evidencia: '143 M en el 1S26, +12,6 % por más saldos de garantías [6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Bloomberg y LSEG reúnen la mitad del gasto en datos de mercado (Burton-Taylor) y en cada índice o contrato de referencia hay un líder [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los grandes bancos negocian precios de datos y han promovido alternativas; los reguladores (FCA, ESMA) revisan el precio de los datos [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Personal y nube (Microsoft) son los insumos; los datos de bolsas de terceros se repercuten (recuperaciones) [5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias de cámara y de administrador de índices, historia de datos y efecto red; la IA baja la barrera en analítica, no en datos propios ni en compensación [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Modelos de IA y agentes pueden sustituir parte del uso de terminales y de la analítica genérica; los clientes construyen sus propias capas sobre datos en bruto [1, 7].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Volúmenes de negociación y compensación en máximos (1S26: Markets +11,9 %, Tradeweb +24,8 %) y activos indexados en máximos [6]. Las suscripciones apenas notan el ciclo: en 2022, con caída de bolsas y bonos, LSEG creció un 5,7 % [A]; en 2020 los volúmenes subieron. 2008-09 no es comparable (LSEG era solo bolsa). El riesgo cíclico está en Markets (volúmenes e intereses), un 39 % de los ingresos [5].' },
    regulacion: 'LCH está supervisada por el Banco de Inglaterra y, para el euro, depende de la equivalencia de la UE, prorrogada hasta junio de 2028; EMIR 3 obliga a los bancos europeos a mantener una cuenta activa en cámaras de la UE desde junio de 2025 [1]. FTSE Russell es administrador de índices autorizado (FCA, Reglamento de Índices de Referencia revisado en la UE en 2026). La FCA revisó en 2024 el mercado de datos mayoristas y vigila el precio de los datos; la cinta consolidada de bonos del Reino Unido llega en 2026. La compensación obligatoria de bonos del Tesoro de EE. UU. (diciembre de 2026 y junio de 2027) favorece a LCH [1].',
    tendencias: 'La IA es la tendencia que decide: LSEG apuesta por vender datos con licencia para modelos (MCP, Anthropic, OpenAI, Microsoft Copilot, Google Gemini) en vez de defender el terminal, y empieza a cobrar por ese uso [5, 6]. Gana si los clientes necesitan datos fiables y auditables para sus agentes; pierde en Workflows (terminales), que solo crece un 3,1 % [5]. Otras: negociación 24 horas (LSE 24), mercados privados (Private Securities Market) y activos digitales [6]. La convergencia del crédito público y privado es la apuesta de octubre de 2026: Octus aporta datos de crédito privado e ilíquido, un segmento de 7.000-9.000 M USD que crece a dos cifras, y Trumid amplía Tradeweb en la negociación electrónica de crédito [10].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 14.7,
    posicion: '**2.º del mundo en datos financieros**, detrás de Bloomberg: Data & Analytics ingresó 3.978 M GBP en 2025, ≈ 10,6 % de un gasto mundial de ≈ 37.400 M GBP (estimación propia; Burton-Taylor da a Bloomberg y LSEG la mitad de los ingresos de datos de mercado juntos) [1, 2, 5]. Con FTSE Russell y Risk Intelligence (5.511 M), ≈ 14,7 % (la cuota de esta fila, estimación propia sobre el mismo perímetro; Markets queda fuera). **3.º en índices** (FTSE Russell, ≈ 18 %) y **1.º en compensación de swaps de tipos** (SwapClear) [1, 5].',
    competidores: [
      { nombre: 'Bloomberg', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en terminales; privada, sin cuentas publicadas [1].' },
      { nombre: 'S&P Global', pais: 'EE. UU.', ticker: 'SPGI', ingresos: usd(15336), cuota_pct: null, margen_ebit_pct: 42.2, comentario: 'Capital IQ, índices S&P DJI (1.º) y calificaciones; ingresos y margen operativo de 2025 [8].' },
      { nombre: 'Intercontinental Exchange', pais: 'EE. UU.', ticker: 'ICE', ingresos: usd(12640), cuota_pct: null, margen_ebit_pct: 39.0, comentario: 'Datos de renta fija e índices de bonos, bolsas de energía y NYSE [8].' },
      { nombre: 'MSCI', pais: 'EE. UU.', ticker: 'MSCI', ingresos: usd(3134), cuota_pct: null, margen_ebit_pct: 54.7, comentario: 'Rival directo en índices (≈ 24,8 % del sector) y analítica de carteras [8].' },
      { nombre: 'FactSet', pais: 'EE. UU.', ticker: 'FDS', ingresos: usd(2322), cuota_pct: null, margen_ebit_pct: 32.2, comentario: 'Terminales y datos para gestoras; el más expuesto a la IA [8].' },
      { nombre: 'CME Group', pais: 'EE. UU.', ticker: 'CME', ingresos: usd(6521), cuota_pct: null, margen_ebit_pct: 64.9, comentario: 'Derivados de tipos de EE. UU. y BrokerTec/EBS frente a LCH y FXall [8].' },
      { nombre: 'Deutsche Börse', pais: 'Alemania', ticker: 'DB1', ingresos: Math.round(6026 * 1.1126 / GBPUSD), cuota_pct: null, margen_ebit_pct: 50.0, comentario: 'Eurex compite en la compensación de swaps en euros (EMIR 3); STOXX en índices [8].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 5, evidencia: 'SwapClear compensa la mayoría de los swaps de tipos del mundo; Tradeweb y FXall concentran liquidez; los índices FTSE Russell son referencia de 2 billones USD en ETF [5, 6].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Retención del 92,8 %; datos integrados en sistemas de clientes; cambiar de cámara o de índice de referencia cuesta años [6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Licencias de cámara y de administrador de índices; historia de datos de mercado (Tick History, con peticiones por API +48 % en el 1S26) [6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala tecnológica compartida; margen ajustado del 50,3 % frente al 36 % de FactSet [5, 8].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Margen menor que el de CME o MSCI (EBITDA del 48 % frente a 61-71 %) por el peso de los terminales [1].' },
      ],
    },
    amenazas: 'La amenaza principal es la IA generativa en Workflows (unos 1.925 M de ingresos, el 21 % del total): si los agentes de IA sustituyen el uso del terminal, LSEG perdería usuarios y poder de precio; probabilidad media en cinco años [5, 7]. Segunda, que los grandes bancos lleven la compensación de swaps en euros a Eurex por EMIR 3 (baja-media). Tercera, que la FCA o la ESMA limiten el precio de los datos (baja). Los datos propios, los índices y la cámara están menos expuestos [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para LSEG no son las emisiones (empresa de servicios) sino la resiliencia operativa y la ciberseguridad (una caída de LCH o de los datos en tiempo real sería un riesgo sistémico regulado por DORA y el Banco de Inglaterra) y la gobernanza de los datos y de la IA [1, 6]. FTSE Russell vende índices ESG y está sujeta a la regulación de calificaciones ESG (UE desde julio de 2026) [1].',
    controversias: 'Voto en contra del 30,4 % al informe de remuneración en 2025 por la subida del sueldo del consejero delegado (ver gobierno). Sin sanciones relevantes encontradas en los tres últimos años en las fuentes leídas.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [{ seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Resultados 2025 (sin calificaciones ESG); 2) semestral 2026; 3) no se buscó en las webs de MSCI/Sustainalytics por tiempo', decision: 'Omitido' }],
};
B.sector.ciclo.comentario = B.sector.ciclo.comentario.replace(' [A]', '');
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Board of Directors', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.lseg.com/en/about-us/board-of-directors' },
  { id: 2, titulo: 'Result of AGM 2026 (23-abr-2026)', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-04-23', url: 'https://www.ticker.app/lse/LSEG/rns/2026-04-23/Result-of-AGM/7122B' },
  { id: 3, titulo: 'Result of AGM 2025 (1-may-2025)', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2025-05-01', url: 'https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/annual-general-meeting/result/lseg-annual-general-meeting-result-2025-01may2025.pdf' },
  { id: 4, titulo: 'London Stock Exchange owner faces potential shareholder revolt over plans to double chief\'s pay', editor: 'City AM', tipo: 'Prensa', fecha: '2025-04', url: 'https://www.cityam.com/?p=2147143' },
  { id: 5, titulo: 'Total Voting Rights (28-ago-2026)', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-01', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/total-voting-rights/9701675' },
  { id: 6, titulo: 'HSBC Holdings falls below 5 % voting rights threshold in London Stock Exchange Group', editor: 'Kalkine Media (RNS)', tipo: 'Prensa', fecha: '2026-08-04', url: 'https://kalkinemedia.com/uk/news/announcements/hsbc-holdings-falls-below-5-voting-rights-threshold-in-london-stock-exchange-group-as-of-july-2026' },
  { id: 7, titulo: 'Preliminary results 2022 (alianza con Microsoft y compra del 4,2 %)', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2023-03-02', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4691300.html' },
  { id: 8, titulo: 'Preliminary results 2025 y semestral 2026 (guía y cumplimiento)', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/interim-report/lseg-interim-report-h1-2026-30july2026.pdf' },
  { id: 9, titulo: 'Analysis: LSEG slowly sheds AI risk tag (Reuters): entrada de Elliott Management', editor: 'MarketScreener / Reuters', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.marketscreener.com/news/lseg-slowly-sheds-ai-risk-tag-with-drive-to-show-growth-ce7f5cdbde80f22d' },
  { id: 10, titulo: 'Preliminary results 2023 (objetivos de la compra de Refinitiv cumplidos)', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2024-02-29', url: 'https://data.fca.org.uk/artefacts/NSM/Portal/NI-000090829/NI-000090829.pdf' },
  { id: 11, titulo: 'Total Voting Rights (1-oct-2026): 482.457.344 acciones con voto y 20.188.599 en autocartera a 30-sep', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/total-voting-rights/9802417' },
  { id: 12, titulo: 'Directorate change: Amit Zavery (ServiceNow) consejero desde el 1-dic-2026', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/directorate-change/9801131' },
  { id: 13, titulo: 'Holding(s) in Company: BlackRock, Inc. 5,00 % en acciones y 2,51 % en instrumentos (15-oct-2026)', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/holding-s-in-company/9827957' },
  { id: 14, titulo: 'Listado de comunicados regulatorios de LSEG (22-jul a 22-oct-2026)', editor: 'Investegate', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://www.investegate.co.uk/company/LSEG' },
];
const C = {
  directivos: {
    equipo: [
      { nombre: 'David Schwimmer', cargo: 'Consejero delegado', desde: '2018', participacion_pct: null, trayectoria: 'Ex Goldman Sachs (25 años, banca de inversión y estructura de mercado). Cerró la compra de Refinitiv, cumplió sus objetivos de sinergias e ingresos y llevó el margen ajustado del 47,8 % al 50,3 % [8, 10].' },
      { nombre: 'Michel-Alain Proch', cargo: 'Director financiero', desde: '2024', participacion_pct: null, trayectoria: 'Antes director financiero de Publicis y de Hertz; desde 2024 ha bajado la intensidad de capex del 11,3 % al 10,2 % [1, 8].' },
      { nombre: 'Don Robert', cargo: 'Presidente', desde: '2019', participacion_pct: null, trayectoria: 'Ex consejero delegado y presidente de Experian [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Crecimiento a divisa constante del 6-8 %; margen EBITDA ajustado ≈ 48 %', real: '+8,3 % a divisa constante; margen 47,2 % (47,7 % sin divisa)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Marco 2023-2025: crecimiento orgánico del 6-8 % anual y mejora del margen', real: '+7,1 % orgánico y +150 pb de margen en 2025', cumplida: 'Sí' },
      { anio: '2026', guia: 'Orgánico 6,5-7,5 %, margen +80-100 pb (febrero)', real: 'Subida a 7,0-7,5 % y ≈ +100 pb en julio', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable: Schwimmer lleva ocho años y la empresa dice haber cumplido o superado todos los marcos de guía desde 2023 [8]. El director financiero es de 2024. El punto débil es la retribución: la subida de 2025 (sueldo +40 %, máximo total de unos 6,3 M a 13,2 M GBP) tuvo un 30,4 % de votos en contra [3, 4]. No hay sucesor público.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Don Robert', cargo: 'Presidente', tipo: 'Independiente', desde: '2019', comisiones: 'Nombramientos (presidente), Remuneración' },
      { nombre: 'David Schwimmer', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2018', comisiones: '—' },
      { nombre: 'Michel-Alain Proch', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
      { nombre: 'Cressida Hogg', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría, Nombramientos, Remuneración' },
      { nombre: 'Elizabeth Corley', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos, Riesgos' },
      { nombre: 'Kathleen DeRose', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Riesgos (presidenta), Auditoría, Nombramientos' },
      { nombre: 'Tsega Gebreyes', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, Nombramientos, Riesgos' },
      { nombre: 'Scott Guthrie', cargo: 'Consejero (Microsoft)', tipo: 'Dominical', desde: '2023', comisiones: 'Nombramientos' },
      { nombre: 'Lloyd Pitchford', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidente), Riesgos, Nombramientos' },
      { nombre: 'Val Rahmani', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Nombramientos, Remuneración, Riesgos' },
      { nombre: 'William Vereker', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración (presidente), Nombramientos, Riesgos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 69.61, voto_remuneracion_contra_pct: 30.39, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La política aprobada en 2025 subió el sueldo del consejero delegado de 1,0 M a 1,4 M GBP, el bonus máximo de 2,25 M a 4,1 M y el plan a largo plazo de 3 M a 7,5 M, para acercarlo a sus pares de EE. UU.; ISS, Glass Lewis y PIRC recomendaron votar en contra y el informe de remuneración tuvo un 30,39 % de votos en contra [3, 4]. En 2026 el voto en contra bajó al 6,81 % [2]. El plan a largo plazo se mide con el BPA ajustado y la rentabilidad total para el accionista (estimación: métricas habituales de la política, no verificadas en el informe de remuneración) [4].',
    accionistas: [
      { nombre: 'Microsoft', pct: 4.2, tipo: 'Estratégico', variacion: 'Compra en diciembre de 2022 a Blackstone; consejero dominical desde 2023 [7].' },
      { nombre: 'HSBC (posición de negociación)', pct: 4.48, tipo: 'Financiero', variacion: 'Bajó del 5,5 % a menos del 5 % de derechos de voto el 30-jul-2026 [6].' },
      { nombre: 'Elliott Management', pct: null, tipo: 'Activista', variacion: 'Empezó a comprar en febrero de 2026, tras la caída por la IA (Reuters) [9].' },
      { nombre: 'BlackRock, Inc.', pct: 5.0, tipo: 'Institucional', variacion: 'Cruza el 5 % al alza el 15-oct-2026 (4,97 % el 8-oct); 2,51 % más en instrumentos financieros, 7,51 % en total [13].' },
      { nombre: 'Autocartera', pct: 4.0, tipo: 'Autocartera', variacion: '20,19 M de acciones de 502,65 M a 30-sep-2026; las recompradas desde julio se amortizan [11].' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el mayor accionista estratégico es Microsoft (4,2 %), con un consejero; Blackstone y Thomson Reuters, que recibieron el 37 % por Refinitiv, han ido vendiendo desde 2022 (no verificado si conservan algo) [7]. Una acción, un voto. Las operaciones con Microsoft (alianza de 10 años en nube y productos, compromiso de gasto mínimo) son vinculadas y relevantes [7]. Los minoritarios de Tradeweb (cotizada en EE. UU.) y de LCH participan en filiales clave. Elliott entró en 2026 y puede empujar recompras o una revisión de la cartera de negocios [9]. El 1-dic-2026 entra Amit Zavery (presidente y director de operaciones y de producto de ServiceNow) como consejero independiente, un perfil tecnológico para la estrategia de IA [12].',
    alertas: ['Voto en contra del 30,4 % a la remuneración en 2025 [3].', 'Entrada de un activista (Elliott) en 2026 [9].', 'Deficiencias de control de TI señaladas por el auditor en los ingresos de Data & Analytics [8].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo (cifra única de 2025)', tipo: 'Complemento', intentos: '1) Informe anual 2025, informe de remuneración (no descargado); 2) resultados de la junta 2026 (solo votos); 3) prensa (solo la política máxima de 13,2 M)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders (operaciones de directivos de 12 meses)', tipo: 'Complemento', intentos: '1) Listado de comunicados de Investegate del 22-jul al 22-oct-2026: ningún «Director/PDMR Shareholding» (solo recompras, derechos de voto y participaciones) [14]; 2) informe anual 2025 (no descargado) para noviembre de 2025-julio de 2026; 3) prensa: sin compras o ventas relevantes citadas', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'LSEG.L, ^FTSE, ISF.L: históricos diarios hasta el 23-oct-2026 (precio, rango, volumen, beta, rentabilidades, cierres de año; movimiento.mjs)', editor: 'Yahoo Finance (herramientas/bolsa.mjs y movimiento.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/LSEG.L/history' },
  { id: 2, titulo: 'LSEG analyst consensus (13-oct-2026): 12 analistas, ingresos, EBITDA, BPA ajustado y dividendo 2026-2028; 15 comprar, 1 mantener, 1 vender; objetivo 11.591 p', editor: 'London Stock Exchange Group plc', tipo: 'Analistas', fecha: '2026-10-13', url: 'https://www.lseg.com/en/investor-relations/consensus' },
  { id: 3, titulo: 'Valuation y Consensus London Stock Exchange Group Plc (ventas, EBITDA, BPA publicado 2023-2028; 16 analistas, objetivo medio 118,15 GBP, mínimo 104,00 y máximo 137,70 al cierre del 23-oct)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://uk.marketscreener.com/quote/stock/LONDON-STOCK-EXCHANGE-GRO-4005918/valuation/' },
  { id: 4, titulo: 'Interim results H1 2026 (deuda neta, caja regulatoria, acciones en circulación, minoritarios)', editor: 'London Stock Exchange Group plc', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/interim-report/lseg-interim-report-h1-2026-30july2026.pdf' },
  { id: 5, titulo: 'Total Voting Rights (28-ago-2026): 485.069.319 acciones con voto', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-01', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/total-voting-rights/9701675' },
  { id: 6, titulo: 'Rendimiento del gilt a 10 años (IUDMNPY), 21-oct-2026: 5,33 % (último dato publicado)', editor: 'Bank of England, Statistical Interactive Database', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Comparables de la ficha sectorial (MarketScreener y Stock Analysis vía los informes del repo) llevados al cierre del 23-oct-2026 con la variación del precio en Yahoo', editor: 'Repositorio analisis-inversion (notas/comparables-2026-10-23.json)', tipo: 'Datos de mercado', fecha: '2026-10-23', url: null },
  { id: 9, titulo: 'Transacciones del informe de S&P Global del repo (Refinitiv, IHS Markit, Adenza, MarketAxess, With Intelligence, Preqin, Black Knight)', editor: 'Repositorio analisis-inversion (informes/sp-global-2026-10-12)', tipo: 'Datos de mercado', fecha: '2026-10-12', url: null },
  { id: 10, titulo: 'Tradeweb Markets Inc. Form 10-K FY2025 y 10-Q 3T25 (clases de acciones A, B, C y D)', editor: 'Tradeweb / SEC', tipo: 'Primaria', fecha: '2026-02', url: 'https://www.sec.gov/Archives/edgar/data/1758730/000175873026000015/tw-20251231.htm' },
  { id: 11, titulo: 'Q3 2026 Trading Update y LSEG to acquire Octus (guía 2026, recompras, apalancamiento, cierre de Octus en el 1S27)', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/q3-2026-trading-update/9835429' },
  { id: 12, titulo: 'Tipos de cambio GBPUSD=X y EURUSD=X, 26-oct-2026 (1,336 y 1,121)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/GBPUSD=X' },
  { id: 13, titulo: 'Transactions in Own Shares (19-oct-2026): 481.039.104 acciones con voto tras las compras hasta el 16-oct', editor: 'London Stock Exchange Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.investegate.co.uk/announcement/rns/london-stock-exchange-group--lseg/transaction-in-own-shares/9830282' },
  { id: 14, titulo: 'London Stock Exchange Group price target (Jefferies y Deutsche Bank reiteran Comprar con 110 GBP, 22 y 23-oct-2026)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-23', url: 'https://www.marketbeat.com/stocks/LON/LSEG/price-target/' },
  { id: 15, titulo: 'LSEG analyst consensus Q3 2026 (13-oct-2026): ingresos del 3T esperados de 2.386 M (+7,8 % orgánico)', editor: 'London Stock Exchange Group plc', tipo: 'Analistas', fecha: '2026-10-13', url: 'https://www.lseg.com/en/investor-relations/consensus' },
];
const compJ = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-2026-10-23.json'), 'utf8'));
const empresas = compJ.empresas.filter((e) => e.ticker !== 'LSEG').map(({ _variacion_precio_pct, ...e }) => ({ ...e, capitalizacion: Math.round(e.capitalizacion / GBPUSD_MKT) }));
const tx = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'sp-global-2026-10-12', 'notas', 'D.json'), 'utf8')).transacciones.operaciones
  .map((o) => ({ ...o, ev: Math.round(o.ev / GBPUSD_MKT), comentario: (o.comentario || '').replace(/\s*\[[\d,\s-]+\]/g, '') + ' Valor empresa pasado a GBP a 1,336 [9].' }));
const D = {
  identificacion: {
    nombre: 'London Stock Exchange Group plc', nombre_corto: 'LSEG', ticker: 'LSEG', isin: 'GB00B0SWJX34', mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Finanzas', industria: 'Bolsas y datos financieros', sede: 'Londres', fundacion: '1801', empleados: null, web: 'https://www.lseg.com',
    precio: 95.10, fecha_precio: '2026-10-23', acciones: 482.4, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: 101.40, min_52s: 66.84, volumen_medio_diario: '≈ 122 M GBP/día (3 meses; 1,42 M de acciones)', proximos_resultados: '2027-02-26',
  },
  consenso: {
    guidance: 'Guía 2026, subida por tercera vez el 22-oct-2026: crecimiento orgánico a divisa constante de los ingresos sin recuperaciones de al menos el 8,0 % (6,5-7,5 % en febrero y 7,0-7,5 % en julio), margen EBITDA a divisa constante +100-120 pb (antes ≈ +100 pb), flujo libre para el accionista de al menos 2.800 M (antes 2.700 M), capex ≈ 9,5 % de los ingresos y tipo impositivo subyacente del 24-25 % [11]. Marco 2027-2029 (febrero de 2026, confirmado en octubre): crecimiento orgánico de un dígito medio-alto, margen subyacente +150 pb acumulados, capex hacia el 8 % en 2029 y flujo libre por acción con crecimiento anual de dos cifras; nuevo: crecimiento orgánico de las suscripciones en torno al 7 % en 2027, al que Octus sumaría [4, 11]. Octus no cambia la guía de margen y será neutral para el BPA ajustado el primer año completo [11].',
    estimaciones: [
      { periodo: '2026e', ingresos: 9622, ebitda: 4972, ebit: 3916, bpa: 4.806, dpa: 1.673, fuente: 'Consenso de la empresa, 13-oct-2026 (12 analistas) [2]' },
      { periodo: '2027e', ingresos: 10324, ebitda: 5388, ebit: 4285, bpa: 5.509, dpa: 1.894, fuente: 'Consenso de la empresa, 13-oct-2026 [2]' },
      { periodo: '2028e', ingresos: 11038, ebitda: 5821, ebit: 4679, bpa: 6.155, dpa: 2.099, fuente: 'Consenso de la empresa, 13-oct-2026 [2]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 15, mantener: 1, vender: 1, po_medio: 118.15, po_min: 104.0, po_max: 137.7 },
    revisiones: 'El consenso compilado por la empresa sigue siendo el del 13-oct, previo al 3T26 (12 analistas): BPA ajustado de 480,6 p en 2026, 550,9 p en 2027 y 615,5 p en 2028, con recompras que bajan las acciones medias a 458,5 M en 2028; reparto de recomendaciones 15 comprar, 1 mantener y 1 vender [2]. Esperaba 2.386 M de ingresos en el 3T y un orgánico del 7,8 %; salieron 2.407 M y +8,8 % [2, 15]. Tras la subida de la guía el consenso debería subir (el de 2026 ya suponía un 8,0 % orgánico, en línea con la guía nueva, pero no el margen de +120 pb): el objetivo medio de MarketScreener es de 118,15 GBP con 16 analistas (104,00-137,70) al cierre del 23-oct, frente a 115,91 del consenso de la empresa del 13-oct [3, 2]; Jefferies y Deutsche Bank reiteraron Comprar con 110 GBP [14]. MarketScreener da en base publicada 3,06, 3,64 y 4,39 GBP de BPA [3]. Solo hay un proveedor con estimaciones completas en base ajustada y aún no recoge el 3T26: es un hueco temporal, no de fuentes.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 69.30, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 71.36, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 92.74, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 112.85, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 89.52, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Once cotizadas de la ficha sectorial del 14-oct-2026: bolsas con cámara (CME, ICE, Nasdaq, Deutsche Börse), una plataforma de renta fija como Tradeweb (que LSEG consolida), índices y analítica (MSCI), calificaciones y datos (S&P Global, Moody\'s) y datos y analítica (Thomson Reuters, Verisk, FactSet). Bloomberg, el rival más directo en datos, no cotiza; Cboe y Euronext quedan fuera por no tener estimaciones del mismo proveedor. Cifras de MarketScreener y Stock Analysis de la ficha, llevadas al cierre del 23-oct-2026 con la variación del precio desde el 13-oct (EE. UU.) y el 14-oct (Europa): subidas del 3,5-17,1 %, con estimaciones sin actualizar por los resultados del 3T de octubre, así que los PER y EV/EBITDA de los próximos 12 meses salen algo altos; capitalización en M GBP a 1,336 USD/GBP [8, 12]. El PER de los comparables es sobre BPA ajustado en la mayoría (EE. UU.), la misma base que el de LSEG en la rentabilidad a 12 meses.',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: { operaciones: tx, comentario: null, confianza: 'Media' },
  fuentes: fD,
  huecos: [],
};
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
D.bolsa = { ...bolsa.bolsa, rentabilidades: bolsa.bolsa.rentabilidades.map((r) => ({ ...r, sector_pct: null })), posicion_corta_pct: null, comentario: null, confianza: 'Alta' };
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'LSEGY: titulares y análisis de Seeking Alpha (RSS, feb-oct 2026; «Higher Guidance, AI Monetization, And Octus Deal Reinforce Our Buy», 23-oct)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-24', url: 'https://seekingalpha.com/symbol/LSEGY' },
  { id: 2, titulo: 'Is London Stock Exchange Group a buy after share price slump?', editor: 'Morningstar', tipo: 'Foros y redes', fecha: '2026-03', url: 'https://global.morningstar.com/en-gb/stocks/is-london-stock-exchange-group-buy-after-share-price-slump' },
  { id: 3, titulo: 'LSEG share research (comentarios y valoraciones de inversores)', editor: 'Hargreaves Lansdown', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.hl.co.uk/shares/shares-search-results/l/london-stock-exchange-ordinary-6,7986p/share-research' },
  { id: 4, titulo: 'LSEG shares slip despite raised guidance and first-half earnings beat', editor: 'Investing.com (comentarios de lectores)', tipo: 'Foros y redes', fecha: '2026-07-30', url: 'https://www.investing.com/news/earnings/lseg-shares-slip-despite-raised-guidance-and-firsthalf-earnings-beat-4822548' },
  { id: 5, titulo: 'Analysis: LSEG slowly sheds AI risk tag with drive to show growth', editor: 'MarketScreener / Reuters', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.marketscreener.com/news/lseg-slowly-sheds-ai-risk-tag-with-drive-to-show-growth-ce7f5cdbde80f22d' },
];
const E = {
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (titulares de análisis de autores independientes, LSEGY)', fecha: '2026-10', n_comentarios: null, tono: 'Positivo', resumen: 'Tras el 3T26 el único análisis nuevo reafirma Comprar por la guía al alza, la monetización de la IA y Octus; en julio convivían un «Buy confirmado» y una rebaja porque las recompras ya estarían en el precio [1].' },
      { plataforma: 'Morningstar (artículo de análisis para particulares)', fecha: '2026-03', n_comentarios: null, tono: 'Dividido', resumen: 'Recoge la preocupación de los inversores porque los proveedores de IA sacudan a los vendedores de datos y terminales tras la caída de febrero [2].' },
      { plataforma: 'Hargreaves Lansdown (investigación para particulares)', fecha: '2026-09', n_comentarios: null, tono: 'Positivo', resumen: 'Destaca que la dirección ha puesto la IA en el centro para presentarse como facilitadora y no como víctima [3].' },
      { plataforma: 'Investing.com (noticia de resultados)', fecha: '2026-07', n_comentarios: null, tono: 'Negativo', resumen: 'La acción bajó el día de resultados pese a la guía al alza y a superar las previsiones del semestre [4].' },
    ],
    temas: [
      { tema: 'La IA se come los terminales', postura: 'Bajista', peso: 'Alto', contraste: 'Workflows crece solo un 3,1 % y es el 21 % de los ingresos; datos y feeds crecen un 6,6 % y la retención sube al 92,8 % (resultados de la empresa). Riesgo real pero acotado; está en el bajista.' },
      { tema: 'Recompras y su efecto en la valoración', postura: 'Dividida', peso: 'Medio', contraste: '4.200 M en 12 meses con la deuda en 1,8-2,0 veces el EBITDA, dentro de la banda de la empresa (resultados de la empresa).' },
      { tema: 'Activista en el capital', postura: 'Alcista', peso: 'Medio', contraste: 'Elliott empezó a comprar en febrero de 2026; sin propuesta pública: catalizador sin fecha [5].' },
      { tema: 'Resultados buenos que el precio por fin premia', postura: 'Alcista', peso: 'Medio', contraste: 'La acción cayó el día del 1S26 (−6,4 %) y el 13-oct (−4,7 %, conversaciones por Octus), pero subió un 7,7 % el 22-oct con el 3T26 y la guía al alza (Yahoo); el PER adelantado ajustado sigue por debajo de su mediana.' },
      { tema: 'Precio pagado por Octus', postura: 'Dividida', peso: 'Medio', contraste: '3.535 M USD por ≈ 300 M USD de ingresos (≈ 12 veces ventas y ≈ 29 veces el EBITDA, estimación propia), neutral para el BPA en 2028 según la empresa y financiado con deuda (resultados de la empresa).' },
    ],
    lectura: 'Lo leído es sobre todo análisis para particulares y titulares, no hilos de foro: los foros británicos (LSE Chat) y Reddit no abren desde este entorno, así que la confianza es baja. Tras el 3T26 el tono mejora a positivo (el único análisis nuevo es alcista y la acción subió un 7,7 % en el día), con la duda del precio pagado por Octus. Antes estaba dividido: la caída por la IA dejó la idea de que el mercado no premiará los buenos resultados mientras no se vea crecimiento por la IA, pero la guía al alza, las recompras y la entrada de un activista dan argumentos a los alcistas. No hay euforia ni capitulación. Los foros apuntan el mismo riesgo que el informe (Workflows) y no añaden ninguno nuevo. Los analistas son mucho más optimistas (15 de 17 comprar).',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
