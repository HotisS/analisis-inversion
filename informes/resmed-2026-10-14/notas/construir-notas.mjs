// Escribe las notas A-E de ResMed (corte 2026-10-14). Cada nota cita con [n] de su propia lista de fuentes.
// Cuentas: XBRL de la SEC (notas/cuentas-xbrl.json) comprobado contra el 10-K FY2026 y la nota de resultados del 4T26.
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const xbrl = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/943819';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 30-jun-2026 (cuentas, notas 8 deuda, 13 segmentos y 18 compras y ventas)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-13', url: `${EDGAR}/000094381926000047/rmd-20260630.htm` },
  { id: 2, titulo: 'ResMed announces results for the fourth quarter of fiscal year 2026 (Exhibit 99.1)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: `${EDGAR}/000119312526337962/d158732dex991.htm` },
  { id: 3, titulo: 'Hechos XBRL de los 10-K y 10-Q (companyfacts, CIK 943819)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000943819.json' },
  { id: 4, titulo: 'ResMed announces results for the third quarter of fiscal year 2026 (Exhibit 99.1)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: `${EDGAR}/000119312526197192/d146862dex991.htm` },
  { id: 5, titulo: 'ResMed announces results for the second quarter of fiscal year 2026 (Exhibit 99.1)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-01-29', url: `${EDGAR}/000119312526029326/d80310dex991.htm` },
  { id: 6, titulo: 'Form 8-K: acuerdo de venta de MatrixCare (220 M USD de ingresos y 55 M de beneficio operativo no GAAP en FY2026; Noctrix, 30 M de ingresos en FY2027)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-07', url: `${EDGAR}/000119312526297658/d88958d8k.htm` },
  { id: 7, titulo: 'Form 8-K: recompra acelerada (ASR) de 450 M USD con Citibank', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-01', url: `${EDGAR}/000119312526378487/d530283d8k.htm` },
  { id: 8, titulo: 'Form 8-K: cambio de auditor (KPMG sustituido por PwC desde FY2027, sin desacuerdos)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-17', url: `${EDGAR}/000119312526354154/d292919d8k.htm` },
  { id: 9, titulo: 'ResMed (RMD) Q4 2026 earnings call transcript', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.webull.com/news/15401856615130112' },
  { id: 10, titulo: 'Proxy statement 2026 (DEF 14A): acciones en circulación el 22-sep-2026 (140.639.243) y autocartera', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${EDGAR}/000094381926000080/rmd-20261001.htm` },
];

const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
const nr = { '2019': 9.4, '2021': 8.7, '2023': 9.2, '2024': 78.5, '2025': 0.5, '2026': 75.1 };
const deuda = { '2019': 1270.9, '2020': 1176.1, '2021': 655.4, '2022': 775.2, '2023': 1441.1, '2024': 707.2, '2025': 668.3, '2026': 659.4 };
const recompras = { '2019': 22.8, '2020': 0, '2021': 0 };
const capexIntang = { '2025': 10.8, '2026': 18.7 }; // patentes registradas (inversión en intangibles)
const cuenta = xbrl.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales,
  ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai,
  impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto,
  gastos_financieros: c.gastos_financieros ?? null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr[c.periodo] ?? null,
  bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas,
}));
const balance = xbrl.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente,
  pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material,
  existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null,
  caja: b.caja, deuda_financiera: deuda[b.periodo], arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
}));
const flujos = xbrl.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: Math.round((f.capex + (capexIntang[f.periodo] ?? 0)) * 10) / 10,
  pagos_arrendamientos: 0, adquisiciones: f.adquisiciones, desinversiones: 0, dividendos: f.dividendos,
  recompras: f.recompras ?? recompras[f.periodo] ?? 0, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0,
}));

const A = {
  _estado: 'Completo. Cuentas del XBRL de la SEC comprobadas contra el 10-K FY2026 y las notas de resultados; deuda total corregida a mano (el XBRL solo recogía la de largo plazo de algunos años).',
  negocio: {
    segmentos: [
      { nombre: 'Sleep and Breathing Health', descripcion: 'Equipos de presión positiva (AirSense, AirCurve), ventiladores domiciliarios (Astral), mascarillas y accesorios, y su plataforma conectada (AirView, myAir).', tipo_resultado: 'EBIT', historico: [
        { periodo: '2024', ingresos: 4101.2, resultado: 1681.4 }, { periodo: '2025', ingresos: 4504.9, resultado: 1964.4 }, { periodo: '2026', ingresos: 4977.6, resultado: 2204.5 }] },
      { nombre: 'Residential Care Software', descripcion: 'Software de gestión para proveedores fuera del hospital: Brightree (EE. UU.), MEDIFOX DAN (Alemania) y MatrixCare (en venta).', tipo_resultado: 'EBIT', historico: [
        { periodo: '2024', ingresos: 584.1, resultado: 154.5 }, { periodo: '2025', ingresos: 641.4, resultado: 205.0 }, { periodo: '2026', ingresos: 675.8, resultado: 217.7 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 63.0 }, { nombre: 'Resto del mundo', peso_pct: 37.0 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ingresos de equipos (dispositivos)', valor_anterior: '2.665 M (FY2025)', valor_actual: '2.892 M (FY2026)', variacion: '+9 % (+7 % a divisa constante)', comentario: 'Americas +7 %, resto del mundo +6 % a divisa constante [2].' },
      { kpi: 'Ingresos de mascarillas y otros', valor_anterior: '1.840 M', valor_actual: '2.085 M', variacion: '+13 % (+12 % constante)', comentario: 'El negocio recurrente de reposición crece más que los equipos [2].' },
      { kpi: 'Margen bruto no GAAP', valor_anterior: '60,0 %', valor_actual: '62,4 %', variacion: '+240 pb', comentario: 'Productividad de fabricación y logística; en el 4T26, 62,3 % [2].' },
      { kpi: 'Margen operativo no GAAP', valor_anterior: '34,3 %', valor_actual: '36,1 %', variacion: '+180 pb', comentario: 'Guía FY2027: «ligera subida» del margen operativo [2, 9].' },
      { kpi: 'Caja libre (flujo operativo − inversión material)', valor_anterior: '1.662 M', valor_actual: '1.650 M', variacion: '−1 %', comentario: 'Más inversión (156 M frente a 90 M) [2].' },
      { kpi: 'Retribución al accionista (dividendos + recompras)', valor_anterior: '611 M', valor_actual: '1.050 M', variacion: '+72 %', comentario: 'Guía FY2027: más de 1.850 M [2].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5653.4, ebitda: 2088.1, ebit: 1886.7, beneficio_neto: 1523.3, bpa: 10.43, dpa: 2.40, dpa_extraordinario: 0, fcf: 1649.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 75.1 },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'MEDIFOX DAN (Alemania), comprada en noviembre de 2022 por unos 1.000 M USD: entra la mayor parte del año [1, 3].' },
      { periodo: '2026', descripcion: 'Noctrix Health (335 M USD), consolidada desde el 4T26; MatrixCare clasificada como mantenida para la venta al 30-jun-2026 (457 M de activos) [1].' },
    ],
    comentario: 'Los ingresos pasaron de 2.607 M USD en FY2019 a 5.653 M en FY2026 (TCAC del 11,7 %), con dos saltos: la retirada de Philips de junio de 2021, que dejó a ResMed casi sola en los equipos de EE. UU., y las compras de software (MatrixCare en 2018 y MEDIFOX DAN en 2022) [1, 3]. En FY2026 crecieron un 10 % (8 % a divisa constante): equipos +9 % y mascarillas +13 % [2]. El margen bruto GAAP sufrió en FY2022-2024 por la inflación de componentes y fletes (del 58,8 % en FY2021 al 55,8 % de FY2023) y se ha recuperado hasta el 61,1 % en FY2026 (62,4 % no GAAP) por productividad y mezcla [1, 2]. El margen EBIT GAAP subió del 22,2 % de FY2019 al 33,4 % de FY2026. El beneficio de FY2026 (1.523 M) lleva 75 M de gastos no recurrentes en el EBIT: 41,9 M de la acción de campo del ventilador Astral, 21,7 M de reestructuración y 11,5 M de costes de compras y venta de cartera [2].',
    ajustes: 'Usamos las cifras GAAP. ResMed publica además un BPA «no GAAP» que suma la amortización de intangibles comprados (77,2 M en FY2026), la reestructuración, las acciones de campo y los costes de compras, y resta algunos beneficios fiscales: 11,17 USD frente a 10,43 GAAP en FY2026 y 9,55 frente a 9,51 en FY2025 [2]. Los no recurrentes dentro del EBITDA van en no_recurrentes_en_ebitda: 75,1 M en FY2026 y 78,5 M en FY2024 (reestructuración de 64,2 M y acciones de campo de mascarillas con imanes y de Astral de 14,3 M) [1, 2]. No son raros (cuatro de los ocho años tienen reestructuración), pero sí de importe variable. El impuesto de FY2021 (409 M, 46 % del beneficio antes de impuestos) incluye el acuerdo con la hacienda australiana, y el de FY2025 dos beneficios fiscales de 51,4 M; el de FY2018 (no incluido en la serie) la reforma fiscal de EE. UU. [1, 3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 1224.5, crecimiento_pct: 11.1, crecimiento_organico_pct: null, ebitda: 432.0, margen_ebitda_pct: 35.3, bpa: 2.11, vs_consenso: null },
      { periodo: '2T25', ingresos: 1282.1, crecimiento_pct: 10.3, crecimiento_organico_pct: null, ebitda: 463.7, margen_ebitda_pct: 36.2, bpa: 2.34, vs_consenso: null },
      { periodo: '3T25', ingresos: 1291.7, crecimiento_pct: 7.9, crecimiento_organico_pct: null, ebitda: 469.9, margen_ebitda_pct: 36.4, bpa: 2.48, vs_consenso: null },
      { periodo: '4T25', ingresos: 1348.0, crecimiento_pct: 10.2, crecimiento_organico_pct: null, ebitda: 518.2, margen_ebitda_pct: 38.4, bpa: 2.58, vs_consenso: null },
      { periodo: '1T26', ingresos: 1335.6, crecimiento_pct: 9.1, crecimiento_organico_pct: null, ebitda: 494.2, margen_ebitda_pct: 37.0, bpa: 2.37, vs_consenso: null },
      { periodo: '2T26', ingresos: 1422.8, crecimiento_pct: 11.0, crecimiento_organico_pct: null, ebitda: 541.5, margen_ebitda_pct: 38.1, bpa: 2.68, vs_consenso: null },
      { periodo: '3T26', ingresos: 1431.4, crecimiento_pct: 10.8, crecimiento_organico_pct: null, ebitda: 558.8, margen_ebitda_pct: 39.0, bpa: 2.74, vs_consenso: 'Superior' },
      { periodo: '4T26', ingresos: 1463.6, crecimiento_pct: 8.6, crecimiento_organico_pct: 8.0, ebitda: 493.5, margen_ebitda_pct: 33.7, bpa: 2.64, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la conferencia del 4T26 (6-ago-2026) la dirección dio la guía de FY2027: ingresos de 5.750-5.850 M USD, un crecimiento del 5-7 % en la base comparable (sin MatrixCare y sin el efecto del Astral), y BPA no GAAP de 12,00-12,25 USD, que incluye 1.500 M de recompras [9]. Suspendió las ventas del ventilador Astral mientras sustituye un componente: 75 M de ingresos menos y unos 0,15 USD de BPA en FY2027, además de la provisión de 41,9 M del 4T26 [9, 2]. Cambió el discurso sobre costes: «ya no podemos compensar la inflación solo con productividad», y anunció subidas de precio moderadas; avisó de una ligera caída interanual del margen bruto en el 1T27 [9]. Sobre los GLP-1 repitió que son un viento a favor: los pacientes con receta de PAP y de GLP-1 empiezan la terapia un 11 % más [9]. En el 3T26 (30-abr) había confirmado márgenes y anunciado la compra de Noctrix (síndrome de piernas inquietas) y el relevo del director financiero [4]. Los analistas preguntaron por el reparto entre volumen y precio de la guía y por el calendario de productos: la dirección no lo desglosó («no voy a entrar en cuánto es volumen y cuánto precio») y no habló del regreso de Philips a EE. UU. [9]. La acción cayó un 5,1 % al día siguiente.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2027', importe: 419.9 }, { anio: '2028', importe: 0 }, { anio: '2029', importe: 250 }],
    liquidez: 'Caja de 1.469 M USD y línea de crédito no dispuesta de 1.500 M a 30-jun-2026 (2.969 M de liquidez); los bonos al 3,24 % de 250 M se pagaron el 10-jul-2026 [1].',
    rating: 'Sin rating público (deuda bancaria y colocación privada de bonos)',
    coste_deuda_pct: 4.6, vida_media_anios: 1.5,
    otros_pasivos: 'La deuda bruta de 660 M a 30-jun-2026 son 500 M de bonos de colocación privada (250 M al 3,24 % vencidos el 10-jul-2026 y 250 M al 3,45 % con vencimiento en julio de 2029) y 160 M de préstamo a plazo de la filial australiana al SOFR + 0,75-1,50 % (4,58 %), que vence con la línea de crédito de 1.500 M el 29-jun-2027 [1]. El covenant es un apalancamiento máximo de deuda sobre EBITDA, con holgura enorme (deuda/EBITDA de 0,3 veces) [1]. Los arrendamientos operativos (166 M de pasivo) no van en la deuda: en US GAAP su gasto ya está en el EBITDA. Hay 334 M de ingresos diferidos (garantías ampliadas y datos de pacientes) y 213 M de otros pasivos a largo plazo [2]. Litigios: la demanda de un denunciante por sobreprecios a la sanidad de veteranos se retiró contra ResMed en abril de 2026 [1]. La recompra acelerada de 450 M con Citibank puede liquidarse en diciembre de 2026 con acciones adicionales o, en algún caso, con caja [7].',
    comentario: 'ResMed se ha desendeudado tras dos compras grandes: la deuda bruta bajó de 1.441 M en FY2023 (MEDIFOX DAN) a 660 M en FY2026, y la caja subió a 1.469 M, con lo que la caja neta es de 810 M [1, 3]. El circulante comercial (existencias + clientes − proveedores) bajó del 44 % de las ventas de FY2023, cuando la empresa acumuló componentes por la crisis de suministros, al 30 % de FY2026; las existencias de 946 M equivalen a unos 160 días de coste de ventas. Después del cierre, la empresa ha pagado unos 250 M de bonos, 450 M de la recompra acelerada y otras recompras en el mercado, y espera cobrar 490 M por MatrixCare [6, 7].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es alta y estable desde FY2024: flujo operativo de 1.401, 1.752 y 1.806 M frente a beneficios de 1.021, 1.401 y 1.523 M [1, 3]. Los años malos fueron FY2022 (351 M, el 45 % del beneficio, por el acopio de existencias en plena escasez de chips) y FY2023, que lo devolvieron en FY2024 [3]. El capex (inmovilizado más patentes) es bajo, del 1,9 % de las ventas en FY2025 y del 3,1 % en FY2026, y la guía de FY2027 lo sube a 160-180 M más patentes por una nueva capacidad de fabricación [9]; estimamos que el de mantenimiento ronda la amortización material, unos 100-110 M (estimación propia con la depreciación de 103 M). La caja ha ido a dividendos (350 M en FY2026), recompras (700 M) y compras (351 M, Noctrix) [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP (hasta FY2026); PricewaterhouseCoopers desde FY2027', anios_auditor: null, opinion: 'Favorable (sin salvedades, FY2026 y FY2025)',
    comentario: 'Las cuentas son limpias y sencillas: ingresos por envío de equipos y mascarillas a distribuidores y proveedores de equipos médicos domiciliarios, y software por suscripción [1]. Los puntos a vigilar son tres. Primero, el uso recurrente de partidas «no recurrentes»: reestructuración en FY2019, FY2021, FY2023, FY2024 y FY2026, y acciones de campo (mascarillas con imanes, Astral) en tres años [1, 2]; el BPA no GAAP de 11,17 USD está un 7 % por encima del GAAP. Segundo, la remuneración en acciones (104 M en FY2026, el 6,8 % del beneficio), que la empresa no resta en su BPA ajustado pero sí en el GAAP que usamos [2]. Tercero, el cambio de auditor en agosto de 2026, de KPMG a PwC, tras un concurso y sin desacuerdos ni «hechos reportables», según el 8-K y la carta de KPMG [8]. La I+D se gasta, no se capitaliza (378 M, el 6,7 % de las ventas). El impuesto efectivo (20,6 % en FY2026) es estable salvo FY2021 (acuerdo fiscal australiano).',
    senales: [
      { senal: 'Cambio de auditor (KPMG → PwC) en agosto de 2026', nivel: 'Baja', comentario: 'Concurso, sin desacuerdos y con carta de conformidad de KPMG [8].' },
      { senal: 'Gastos «no recurrentes» que se repiten', nivel: 'Media', comentario: 'Reestructuración o acciones de campo en cinco de ocho años; los dejamos fuera del EBITDA pero dentro del BPA GAAP [1, 2].' },
      { senal: 'Acciones de campo de producto (Astral, mascarillas con imanes)', nivel: 'Media', comentario: 'Provisión de 41,9 M y suspensión de ventas del Astral en FY2027 [2, 9].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral creciente desde 2012: 0,66 USD por acción desde septiembre de 2026 (+10 %), 2,64 USD anualizados [2]. Recompras de 700 M en FY2026 y guía de 1.500 M en FY2027, de las que 450 M son una recompra acelerada con Citibank pagada el 3-sep-2026 con el dinero de la venta de MatrixCare [7, 9]. En total, más de 1.850 M devueltos en FY2027, alrededor del 100 % de la caja libre más la venta [2]. La empresa mantiene compras pequeñas de tecnología (Noctrix, 335 M) dentro de su estrategia «2030» de sueño y respiración [1].',
    adquisiciones: [
      { anio: '2018', objetivo: 'MatrixCare (software para residencias y cuidados a largo plazo)', importe: 750, ev_ebitda: null, financiacion: 'Deuda (línea de crédito)', resultado: 'Vendida en 2026 por 490 M a Frazier Healthcare: pérdida de valor de un tercio en ocho años [6].' },
      { anio: '2022', objetivo: 'MEDIFOX DAN (software de cuidados, Alemania)', importe: 1000, ev_ebitda: null, financiacion: 'Deuda (línea de crédito), devuelta en FY2024', resultado: 'Se queda en el grupo; el segmento de software crece un 4-5 % a divisa constante y su margen operativo subió al 32 % [1].' },
      { anio: '2026', objetivo: 'Noctrix Health (dispositivo para el síndrome de piernas inquietas)', importe: 335, ev_ebitda: null, financiacion: 'Caja', resultado: 'Demasiado pronto: 30 M de ingresos esperados en FY2027 y −0,20 USD de BPA no GAAP [6].' },
    ],
    comentario: 'La asignación de capital del negocio principal es buena (ROIC por encima del 20 % y caja libre que cubre dividendos y recompras), pero la diversificación en software no lo ha sido: MatrixCare se compró por 750 M en 2018 y se vende por 490 M, y el segmento de software rinde un margen operativo del 32 % antes de costes centrales frente al 44 % de Sleep and Breathing Health [1, 6]. Desde FY2024 la dirección ha cambiado de prioridades: menos compras, más recompras (de 150 M en FY2024 a 1.500 M previstos en FY2027) y vuelta al foco en sueño. Las recompras se hacen con la acción en mínimos de varios años, lo que es una buena señal si el negocio aguanta. La dilución por remuneración en acciones se compensa: las acciones diluidas bajaron de 147,3 M en FY2025 a 146,1 M de media en FY2026 y a 140,6 M en circulación en septiembre de 2026 [10].',
    confianza: 'Alta',
  },
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: Item 1 (negocio, competencia) e Item 1A (riesgos: GLP-1, Philips, aranceles, IA)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-13', url: `${EDGAR}/000094381926000047/rmd-20260630.htm` },
  { id: 2, titulo: 'Sleep Apnea Devices Market Size report (9,3 mil M USD en 2025, 18,7 mil M en 2035, TCAC 7,2 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/sleep-apnea-devices-market-report' },
  { id: 3, titulo: 'Sleep apnea devices market (7,1 mil M USD en 2025; TCAC 7,1 % hasta 2035)', editor: 'Market Research Future', tipo: 'Sectorial', fecha: '2026', url: 'https://www.marketresearchfuture.com/reports/sleep-apnea-devices-market-2061' },
  { id: 4, titulo: 'FDA approves first medication for obstructive sleep apnea (Zepbound, tirzepatida)', editor: 'U.S. Food and Drug Administration', tipo: 'Primaria', fecha: '2024-12-20', url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-obstructive-sleep-apnea' },
  { id: 5, titulo: 'Philips Respironics: Frequently Asked Questions (consentimiento judicial; ventas de equipos nuevos en EE. UU. solo cuando se cumplan los requisitos)', editor: 'Koninklijke Philips N.V.', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://www.philips.com/c-dam/assets/corporate/global/investor/20260506_Respironics_FAQ.pdf' },
  { id: 6, titulo: 'FDA accepts NDA for Apnimed AD109 in obstructive sleep apnea (PDUFA 28-feb-2027)', editor: 'NeurologyLive', tipo: 'Prensa', fecha: '2026-07-15', url: 'https://www.neurologylive.com/view/fda-accepts-nda-apnimed-ad109-treatment-obstructive-sleep-apnea' },
  { id: 7, titulo: 'FDA approves orforglipron (Foundayo), oral GLP-1 for weight loss', editor: 'Patient Care Online', tipo: 'Prensa', fecha: '2026-04-01', url: 'https://www.patientcareonline.com/view/fda-approves-orforglipron-first-oral-glp-1-receptor-agonist-for-weight-loss-with-no-food-or-water-restrictions' },
  { id: 8, titulo: 'Benjafield et al., Estimation of the global prevalence and burden of obstructive sleep apnoea (936 M de adultos de 30-69 años)', editor: 'The Lancet Respiratory Medicine', tipo: 'Sectorial', fecha: '2019-08', url: 'https://doi.org/10.1016/S2213-2600(19)30198-5' },
  { id: 9, titulo: 'Trump’s tariffs: Resmed «well-positioned» with exemptions (Protocolo de Nairobi)', editor: 'HME News', tipo: 'Prensa', fecha: '2025-06', url: 'https://www.hmenews.com/article/trump-s-tariffs-resmed-well-positioned-with-exemptions-ceo-says' },
  { id: 10, titulo: 'Section 232 probe reignites tariff uncertainty for medtech firms', editor: 'Yahoo Finance (MedTech Dive)', tipo: 'Prensa', fecha: '2025-09', url: 'https://finance.yahoo.com/news/section-232-probe-reignites-tariff-092445650.html' },
  { id: 11, titulo: 'Datos de cotización y cuentas de Philips, Fisher & Paykel, Inspire, Inogen, Stryker y Medtronic (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/PHG/' },
  { id: 12, titulo: 'ResMed (RMD) Q4 2026 earnings call transcript', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.webull.com/news/15401856615130112' },
  { id: 13, titulo: 'Why ResMed shares are falling today (rebaja de Morgan Stanley: regreso de Philips y GLP-1)', editor: 'StockStory', tipo: 'Prensa', fecha: '2026-06-17', url: 'https://stocks.observer-reporter.com/observerreporter/article/stockstory-2026-6-17-why-resmed-rmd-shares-are-falling-today' },
];
const B = {
  _estado: 'Completo; ver ficha sectorial sectores/dispositivos-respiratorios-2026-10-14.md.',
  negocio: {
    descripcion: 'ResMed diseña, fabrica y vende equipos para tratar la apnea obstructiva del sueño y otras enfermedades respiratorias crónicas en casa: generadores de presión positiva (CPAP y APAP AirSense 11, binivel AirCurve), ventiladores domiciliarios (Astral, Stellar), mascarillas (AirFit, AirTouch) y accesorios, con más de 20 millones de equipos conectados a la nube que transmiten los datos de uso al médico y al proveedor [1]. Vende en más de 140 países, sobre todo a proveedores de equipos médicos domiciliarios (en EE. UU., distribuidores que cobran de Medicare y de las aseguradoras) y a sistemas públicos de salud fuera de EE. UU. [1]. Fabrica en Singapur, Australia, Malasia y EE. UU. Tiene además un segmento de software de gestión (Brightree, MEDIFOX DAN) para proveedores fuera del hospital, del que vende MatrixCare en 2026 [1].',
    como_gana_dinero: 'El 88 % de los ingresos de FY2026 es Sleep and Breathing Health: 2.892 M USD de equipos y 2.085 M de mascarillas y accesorios [1]. El modelo es de «cuchilla y recambio»: el equipo se vende una vez cada cinco años y la mascarilla, los cojines y los filtros se reponen varias veces al año, con reembolso de Medicare y de las aseguradoras; las mascarillas crecen más (+13 % en FY2026) y tienen más margen que los equipos [1]. El margen bruto (62 % no GAAP) depende de la mezcla, del coste de componentes (chips, imanes de tierras raras) y de los fletes, y el operativo del apalancamiento de una estructura con I+D del 7 % y gastos comerciales del 20 % de las ventas [1]. No hay estacionalidad relevante.',
    clientes: 'No hay un cliente que pase del 10 % de las ventas, pero en EE. UU. la cadena está concentrada en grandes proveedores domiciliarios (AdaptHealth, Lincare, Apria) que compran por contrato con volumen y precio pactados, y que cobran del reembolso de Medicare y de las aseguradoras [1, 12]. El poder de precios es moderado: tras la retirada de Philips en 2021 ResMed subió precios en EE. UU., y en agosto de 2026 anunció «subidas moderadas» porque la productividad ya no compensa la inflación, respetando los contratos mientras los clientes cumplan sus volúmenes [12]. La recurrencia está en la reposición de mascarillas, que ResMed impulsa con programas de reabastecimiento y con los datos de uso de sus equipos conectados.',
    confianza: 'Alta',
  },
  historia: {
    resumen: 'ResMed nació en 1989 cuando Peter Farrell compró a Baxter la tecnología de CPAP desarrollada en la Universidad de Sídney por Colin Sullivan. Salió a bolsa en el Nasdaq en 1995 y pasó a la Bolsa de Nueva York en 1999, con cotización también en Australia. Su hijo Mick Farrell es consejero delegado desde 2013 y presidente desde 2022. La historia reciente la marcan la apuesta por los equipos conectados (AirSense 10 en 2014, AirSense 11 en 2021), las compras de software para la atención fuera del hospital (Brightree 2016, MatrixCare 2018, MEDIFOX DAN 2022), la retirada de los equipos de Philips en junio de 2021, que le dejó el mercado de EE. UU. casi para ella, y el miedo a los fármacos GLP-1 desde 2023 [1].',
    hitos: [
      { anio: '1989', hito: 'Peter Farrell compra a Baxter la tecnología de CPAP de la Universidad de Sídney y funda ResMed.' },
      { anio: '1995', hito: 'Salida a bolsa en el Nasdaq; en 1999 pasa a la NYSE y cotiza también en la ASX.' },
      { anio: '2014', hito: 'AirSense 10: el primer CPAP con conexión móvil integrada de serie.' },
      { anio: '2016', hito: 'Compra de Brightree (800 M USD), software para proveedores de equipos médicos domiciliarios.' },
      { anio: '2018', hito: 'Compra de MatrixCare (750 M USD), software para cuidados a largo plazo.' },
      { anio: '2021', hito: 'Philips retira millones de CPAP por la espuma insonorizante; ResMed lanza AirSense 11.' },
      { anio: '2022', hito: 'Compra de MEDIFOX DAN en Alemania (unos 1.000 M USD).' },
      { anio: '2024', hito: 'La FDA aprueba la tirzepatida (Zepbound) para la apnea obstructiva con obesidad [4]; Philips firma el consentimiento judicial que le impide vender equipos nuevos en EE. UU. [5].' },
      { anio: '2026', hito: 'Compra de Noctrix (piernas inquietas), venta de MatrixCare por 490 M, relevo del director financiero y suspensión de ventas del Astral.' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de dispositivos para la apnea del sueño y la ventilación domiciliaria: generadores de presión positiva, mascarillas y accesorios, con los equipos de diagnóstico al lado. Las dos fuentes de pago lo cifran muy por debajo de lo que facturan los fabricantes (Global Market Insights, 9,3 mil M USD en 2025, de los que un 66 % es terapia; Market Research Future, 7,1 mil M) [2, 3], porque solo ResMed factura ya 4.978 M en Sleep and Breathing Health [1]. Usamos la cifra de Global Market Insights para el crecimiento (7 % anual) y no para la cuota, que estimamos con las ventas de los fabricantes (ficha sectorial).',
    tamano: '≈ 9.300 M USD en 2025 (Global Market Insights) [2]; ≈ 7.100 M USD según Market Research Future [3]',
    unidad_serie: 'millones de USD (Global Market Insights; 2026e-2030e con su TCAC del 7,2 %)',
    serie: [{ anio: '2024', tamano: 8800 }, { anio: '2025', tamano: 9300 }, { anio: '2026e', tamano: 9970 }, { anio: '2027e', tamano: 10688 }, { anio: '2028e', tamano: 11457 }, { anio: '2030e', tamano: 13166 }],
    tcac_historico_pct: 6.5, tcac_previsto_pct: 7.2, cr5_pct: 44.0, estructura: 'Concentrada',
    drivers: [
      { driver: 'Prevalencia sin diagnosticar', efecto: '+', horizonte: 'Estructural', evidencia: 'Unos 936 M de adultos de 30-69 años con apnea obstructiva, la mayoría sin diagnóstico [8].' },
      { driver: 'Fármacos GLP-1 (tirzepatida aprobada para la apnea desde dic-2024; orforglipron oral aprobado para obesidad en abr-2026)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'ResMed: los pacientes con receta de PAP y de GLP-1 empiezan la terapia un 11 % más; a largo plazo, menos gravedad de la apnea en quien pierde peso y mantiene la pérdida [4, 7, 12].' },
      { driver: 'Ausencia de Philips en los equipos nuevos de EE. UU.', efecto: '+', horizonte: 'Cíclico', evidencia: 'Consentimiento judicial: Philips solo vuelve a vender cuando un experto certifique sus fábricas; sin fecha a mayo de 2026 [5].' },
      { driver: 'Terapias alternativas (estimulación del hipogloso, fármaco AD109)', efecto: '−', horizonte: 'Estructural', evidencia: 'AD109 de Apnimed: reducción del índice de apneas del 44-47 % y decisión de la FDA el 28-feb-2027; un 21 % de abandonos por efectos adversos [6].' },
      { driver: 'Reembolso y aranceles', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Exención arancelaria del Protocolo de Nairobi reconfirmada en agosto de 2026; investigación de la Sección 232 sobre dispositivos médicos abierta desde septiembre de 2025 [9, 10, 12].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Duopolio mundial con Philips, hoy fuera de los equipos nuevos de EE. UU.; Fisher & Paykel fuerte en mascarillas; fabricantes chinos (BMC, Yuyue) y React Health en precio [1, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes proveedores domiciliarios en EE. UU. y licitaciones públicas fuera; el reembolso de Medicare fija el techo del precio [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Chips y motores de pocos proveedores (escasez de 2021-2022) e imanes de tierras raras con licencias de exportación chinas [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Aprobación de la FDA, escala de fabricación, red de distribución y plataforma de datos con más de 20 M de equipos conectados [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'GLP-1 (tirzepatida aprobada para la apnea), estimulación del hipogloso (Inspire) y, si se aprueba en 2027, el fármaco AD109 [4, 6].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La demanda depende del diagnóstico y del reembolso, no del PIB: en 2008-09 ResMed siguió creciendo a doble dígito; en 2020 la COVID frenó los diagnósticos y disparó los ventiladores; en 2021-22 la retirada de Philips y la escasez de chips llevaron los equipos a máximos. Hoy el crecimiento ha vuelto a un 8-9 % a divisa constante y el riesgo de ciclo es de competencia (regreso de Philips) y de sustitutos, no de demanda [1, 12].' },
    regulacion: 'En EE. UU. los equipos son de clase II (FDA) y se pagan con el reembolso de Medicare (licitación competitiva de equipos médicos domiciliarios que CMS quiere reactivar) y de aseguradoras que exigen cumplimiento de uso. El consentimiento judicial de Philips Respironics (2024) le prohíbe vender equipos nuevos de sueño y respiración en EE. UU. hasta que un experto independiente certifique sus fábricas; puede vender mascarillas y recambios [5]. La tirzepatida está aprobada para la apnea moderada o grave con obesidad desde el 20-dic-2024 [4]. Los equipos de ResMed entran en EE. UU. sin arancel por el Protocolo de Nairobi, reconfirmado en agosto de 2026 [12].',
    tendencias: 'Tres tendencias. Los fármacos contra la obesidad: hasta ahora han aumentado los diagnósticos y los inicios de terapia (más pacientes en consulta), pero una pérdida de peso sostenida reduce la gravedad de la apnea y, con versiones orales más baratas, puede limitar la demanda de equipos dentro de 3-5 años [4, 7, 12]. La competencia: Philips prepara su regreso y los fabricantes asiáticos han ganado presencia en su ausencia [1, 13]. Y la digitalización: equipos conectados, diagnóstico en casa y sensores de consumo (acuerdo con ŌURA) que llevan pacientes al embudo de ResMed; la IA generativa amenaza más al software de gestión que a los equipos [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 55.0,
    posicion: '1.º mundial en equipos de presión positiva y mascarillas para la apnea del sueño; estimación propia: ≈ 55 % de las ventas de los fabricantes de terapia (ResMed 4.978 M frente a ≈ 9.000 M del total), muy por encima en los equipos de EE. UU. desde la retirada de Philips. Global Market Insights le da un 30,6 % de su mercado, que incluye diagnóstico y otras terapias [1, 2].',
    competidores: [
      { nombre: 'Philips (Sleep & Respiratory Care)', pais: 'Países Bajos', ticker: 'PHIA', ingresos: 19970, cuota_pct: null, margen_ebit_pct: 14.0, comentario: 'Grupo de 17.834 M EUR (2025); fuera de los equipos nuevos de EE. UU. por el consentimiento judicial; vende mascarillas y fuera de EE. UU. [5, 11].' },
      { nombre: 'Fisher & Paykel Healthcare', pais: 'Nueva Zelanda', ticker: 'FPH', ingresos: 1296, cuota_pct: null, margen_ebit_pct: 28.7, comentario: 'Mascarillas de sueño y humidificación hospitalaria; compite en mascarillas, no en generadores en EE. UU. [11].' },
      { nombre: 'Inspire Medical Systems', pais: 'EE. UU.', ticker: 'INSP', ingresos: 912, cuota_pct: null, margen_ebit_pct: -0.3, comentario: 'Estimulación del nervio hipogloso para quien no tolera la CPAP; ventas en caída en 2026 (−6 % previsto) [11].' },
      { nombre: 'Inogen', pais: 'EE. UU.', ticker: 'INGN', ingresos: 349, cuota_pct: null, margen_ebit_pct: -5.1, comentario: 'Concentradores de oxígeno portátiles; respiración domiciliaria, sin rentabilidad [11].' },
      { nombre: 'React Health / BMC / Yuyue', pais: 'EE. UU. / China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Equipos de precio bajo que ganaron presencia en EE. UU. durante la ausencia de Philips [1].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Plataforma AirView/myAir con más de 20 M de equipos conectados: médicos y proveedores trabajan con sus datos de cumplimiento [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Los proveedores domiciliarios integran la reposición de mascarillas y el control de cumplimiento con Brightree y AirView [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Aprobaciones FDA, más de 10.000 patentes y diseños registrados, y marca ante médicos [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen bruto del 62 % y operativo del 36 % no GAAP, frente al 14 % operativo de Philips y el 29 % de Fisher & Paykel [11].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de dos grandes en el que un tercero no llega a la escala de I+D, fabricación y distribución [1].' },
      ],
    },
    amenazas: 'Tres amenazas con probabilidad creciente. El regreso de Philips a los equipos nuevos de EE. UU.: el consentimiento judicial no tiene fecha, pero el mercado ya lo descuenta (Morgan Stanley rebajó en junio de 2026) y los analistas suponen que recuperaría hasta un 20 % del mercado de equipos [5, 13]. Los GLP-1 orales y baratos, que pueden reducir el número de apneas graves a 3-5 años [7]. Y los sustitutos: Inspire en los que no toleran la CPAP y el fármaco AD109 si la FDA lo aprueba en febrero de 2027 [6]. La mascarilla y la plataforma de datos, que se reponen y se usan con cualquier causa de la demanda, son la parte más protegida.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la calidad y la seguridad del producto: la retirada de Philips en 2021 muestra el coste de un fallo (miles de millones en reparaciones y litigios), y ResMed ha tenido dos acciones de campo (mascarillas con imanes en 2024 y Astral en 2026, con 41,9 M de provisión y la suspensión de ventas) [A2, 12]. Le sigue la privacidad de los datos de salud de millones de pacientes conectados, regulada por HIPAA y el RGPD [1]. El suministro de imanes de tierras raras bajo licencias chinas es un riesgo de cadena [1].',
    controversias: 'Demanda de un denunciante (ley de reclamaciones falsas) contra Philips, Fisher & Paykel y ResMed por sobreprecios de CPAP a la sanidad de veteranos: el Gobierno no intervino y el demandante la retiró contra ResMed en abril de 2026 [1]. En 2020 ResMed pagó unos 37,5 M USD para cerrar una investigación del Departamento de Justicia sobre incentivos a proveedores [1].',
    confianza: 'Media',
  },
  fuentes: fB,
};
B.esg.materialidad = B.esg.materialidad.replace('[A2, 12]', '[12]');
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, voto de 2025 y accionistas', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${EDGAR}/000094381926000080/rmd-20261001.htm` },
  { id: 2, titulo: 'Form 8-K: relevo del director financiero (Brett Sandercock → Aaron Bloomer)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: `${EDGAR}/000119312526197282/d50610dex991.htm` },
  { id: 3, titulo: 'Form 8-K: Carol Burt, consejera coordinadora; retiro de Ron Taylor', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-17', url: `${EDGAR}/000119312526354154/d292919dex991.htm` },
  { id: 4, titulo: 'Form 4 de directivos y consejeros (14-oct-2025 a 14-oct-2026), resumidos con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000943819&type=4' },
  { id: 5, titulo: 'ResMed announces results for the fourth quarter of fiscal year 2026', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: `${EDGAR}/000119312526337962/d158732dex991.htm` },
];
const C = {
  directivos: {
    equipo: [
      { nombre: 'Michael (Mick) Farrell', cargo: 'Presidente y consejero delegado', desde: '2013', participacion_pct: 0.43, trayectoria: 'En ResMed desde 2000; consejero delegado desde 2013 y presidente desde 2022. Con él los ingresos pasaron de 1.500 M a 5.653 M USD y el margen operativo GAAP del 26 % al 33 % [1, 5].' },
      { nombre: 'Aaron Bloomer', cargo: 'Director financiero', desde: '2026', participacion_pct: 0.0, trayectoria: 'Ex director financiero de Exact Sciences (comprada por Abbott), antes en Baxter y 3M; sustituye en mayo de 2026 a Brett Sandercock, 20 años en el cargo [2].' },
      { nombre: 'Justin Leong', cargo: 'Director de producto', desde: '2018', participacion_pct: 0.04, trayectoria: 'Responsable de producto y de las regiones de Asia; uno de los posibles sucesores [1].' },
      { nombre: 'Michael Rider', cargo: 'Director jurídico y secretario', desde: '2018', participacion_pct: 0.01, trayectoria: 'Responsable de cumplimiento y de los litigios de producto y competencia [1].' },
      { nombre: 'Peter Farrell', cargo: 'Fundador y consejero', desde: '1989', participacion_pct: 0.04, trayectoria: 'Fundador y antiguo presidente; padre del consejero delegado [1].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Margen bruto no GAAP del 62-63 %, gastos comerciales del 19-20 %, I+D del 6-7 %, tipo impositivo del 21-23 %', real: 'Margen bruto 62,4 %, gastos comerciales 19,6 %, I+D 6,7 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'Margen bruto no GAAP del 59-60 % (subida durante el año)', real: '60,0 %', cumplida: 'Sí' },
      { anio: '2024', guia: 'Recuperación del margen bruto hacia el 58-60 %', real: '57,9 % no GAAP', cumplida: 'Parcial' },
      { anio: '2023', guia: 'Margen bruto estable tras la crisis de suministros', real: 'Bajó al 55,8 % GAAP por la inflación de componentes', cumplida: 'No' },
    ],
    comentario: 'La dirección es estable y con credibilidad en los márgenes: ha cumplido la guía de margen bruto, gastos e impuestos en FY2025 y FY2026, después de fallar en FY2023 con la inflación de componentes [1, 5]. Hay dos cambios en 2026: un director financiero de fuera, tras 20 años de Sandercock (que se queda como asesor hasta finales de 2027), y una nueva consejera coordinadora [2, 3]. El riesgo de sucesión está en el propio Mick Farrell, consejero delegado desde hace 13 años y presidente, sin un sucesor anunciado. La dirección tiene poca participación (0,58 % entre consejeros y directivos) y vende con regularidad con planes 10b5-1 [1, 4].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Michael Farrell', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2013', comisiones: '—' },
      { nombre: 'Peter Farrell', cargo: 'Consejero (fundador)', tipo: 'Otro externo', desde: '1989', comisiones: '—' },
      { nombre: 'Ronald Taylor', cargo: 'Consejero coordinador hasta nov-2026 (no se presenta a la reelección)', tipo: 'Independiente', desde: '2005', comisiones: 'Varias' },
      { nombre: 'Carol Burt', cargo: 'Consejera coordinadora desde el 15-nov-2026', tipo: 'Independiente', desde: '2013', comisiones: 'Nombramientos y gobierno (presidenta), auditoría, cumplimiento' },
      { nombre: 'Jan De Witte', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Varias' },
      { nombre: 'Christopher DelOrefice', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Karen Drexler', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Remuneración (presidenta)' },
      { nombre: 'Harjit Gill', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Varias' },
      { nombre: 'John Hernandez', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría' },
      { nombre: 'Nicole Mowad-Nassar', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Varias' },
      { nombre: 'Desney Tan', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Varias' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 84.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2026', total: 16.20, fijo: 1.27, variable_corto: 1.74, variable_largo: 13.00, ratio_salario_medio: 199 },
    remuneracion: 'El consejero delegado devengó 16,2 M USD en FY2026: 1,27 M de fijo, 1,74 M de variable anual y 13,0 M en acciones y opciones [1]. La mitad de las acciones con objetivos dependen del rendimiento total para el accionista: un 25 % del absoluto y un 25 % del relativo frente al S&P 500 a tres años (100 % en el percentil 60, 200 % en el 95, con tope si el absoluto es negativo) [1]. El sistema ha castigado de verdad: las de FY2022 se perdieron, las de FY2023 pagaron el 60,5 % y las de FY2025 y FY2026 no pagarían nada a 30-jun-2026 [1]. Hay cláusula de recuperación desde octubre de 2023. El voto consultivo sobre la remuneración obtuvo un 84 % a favor en 2024 y un 90 % en 2025 [1]. La relación con el empleado mediano es de 199 a 1 [1].',
    accionistas: [
      { nombre: 'BlackRock', pct: 9.09, tipo: 'Institucional', variacion: '13G/A de enero de 2024' },
      { nombre: 'Vanguard Capital Management', pct: 8.51, tipo: 'Institucional', variacion: '13G de abril de 2026' },
      { nombre: 'AustralianSuper', pct: 5.88, tipo: 'Institucional (fondo de pensiones australiano)', variacion: 'Aviso de accionista significativo en la ASX' },
      { nombre: 'Vanguard Portfolio Management', pct: 5.61, tipo: 'Institucional', variacion: '13G de 2026' },
      { nombre: 'Consejeros y directivos (14 personas)', pct: 0.58, tipo: 'Internos', variacion: 'Ventas con planes 10b5-1' },
      { nombre: 'Autocartera', pct: 26.4, tipo: 'Autocartera (50,4 M de acciones sobre 191,1 M emitidas)', variacion: '+6,5 M de acciones en 15 meses' },
    ],
    insiders: [
      { fecha: '2026-10-08', persona: 'Michael Farrell (presidente y CEO), acumulado 12 meses', operacion: 'Venta', acciones: 0, importe: 14.60 },
      { fecha: '2026-10-01', persona: 'Peter Farrell (consejero), acumulado 12 meses', operacion: 'Venta', acciones: 0, importe: 5.01 },
      { fecha: '2026-05-04', persona: 'Brett Sandercock (ex director financiero), acumulado 12 meses', operacion: 'Venta', acciones: 0, importe: 1.96 },
      { fecha: '2026-09-10', persona: 'Jan De Witte (consejero), acumulado 12 meses', operacion: 'Venta', acciones: 0, importe: 0.65 },
    ],
    control_y_defensas: 'No hay accionista de control: los cuatro mayores son gestoras indexadas y un fondo de pensiones australiano, con un 29 % entre todos [1]. Una sola clase de acciones, un voto por acción; cotiza en la NYSE y en la ASX mediante CDI (diez CDI por acción) [1, 5]. El consejo tiene 8 independientes de 10 candidatos y una consejera coordinadora con funciones definidas, pero el presidente es el consejero delegado y su padre, el fundador, es consejero: una familia con dos puestos y solo un 0,5 % del capital [1, 3]. No constan operaciones vinculadas relevantes. Ron Taylor, consejero coordinador durante 13 años y 21 en el consejo, se retira en noviembre de 2026 [3].',
    alertas: [
      'Presidente y consejero delegado en la misma persona desde 2022, con el fundador (su padre) en el consejo.',
      'Ventas continuadas de directivos: 22,3 M USD en 12 meses, todas con planes 10b5-1 y ninguna compra [4].',
      'Relevo del director financiero (mayo de 2026) y cambio de auditor (agosto de 2026) en el mismo año.',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de RMD, ^GSPC e IHI (herramientas/bolsa.mjs), hasta el 13-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/RMD/history/' },
  { id: 2, titulo: 'RMD, PHG, FPH.NZ, INSP, INGN, SYK, MDT: capitalización, valor empresa, múltiplos, márgenes, deuda, caja libre y estimaciones (quoteSummary, earningsTrend)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/RMD/analysis/' },
  { id: 3, titulo: 'ResMed (RMD) stock forecast: price target and analyst ratings (20 analistas)', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rmd/forecast/' },
  { id: 4, titulo: 'Statistics: ROIC de Stryker, Medtronic, Philips, Inspire y ResMed', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rmd/statistics/' },
  { id: 5, titulo: 'Market yield on U.S. Treasury securities at 10-year constant maturity (DGS10): 5,24 % el 9-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro (USD 1,1195; NZD 1,9941) del 14-oct-2026', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Resmed to report first quarter fiscal 2027 earnings on October 29, 2026', editor: 'ResMed Inc. (GlobeNewswire)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.globenewswire.com/news-release/2026/10/01/3373380/0/en/index.html' },
  { id: 9, titulo: 'Form 8-K: acuerdo de venta de MatrixCare a Frazier Healthcare Partners por 490 M USD', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-07', url: `${EDGAR}/000119312526297658/d88958d8k.htm` },
  { id: 10, titulo: 'Form 10-K FY2026, nota 18 (Noctrix, 335 M; MatrixCare mantenida para la venta)', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-13', url: `${EDGAR}/000094381926000047/rmd-20260630.htm` },
  { id: 11, titulo: 'Zoll to acquire Itamar Medical for $538 million', editor: 'MassDevice', tipo: 'Prensa', fecha: '2021-09', url: 'https://www.massdevice.com/zoll-to-acquire-itamar-medical-for-538m/' },
  { id: 13, titulo: 'ResMed (RMD) Q4 2026 earnings call transcript (guía FY2027)', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.webull.com/news/15401856615130112' },
  { id: 12, titulo: 'Proxy statement 2026 (DEF 14A): 140.639.243 acciones en circulación el 22-sep-2026', editor: 'ResMed Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${EDGAR}/000094381926000080/rmd-20261001.htm` },
];
const cierres = bolsa.cierres_ejercicio.filter((c) => ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio));
const D = {
  identificacion: {
    nombre: 'ResMed Inc.', nombre_corto: 'ResMed', ticker: 'RMD', isin: 'US7611521078', mercado: 'New York Stock Exchange (también ASX mediante CDI)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Equipos y suministros sanitarios', sede: 'San Diego (California)', fundacion: '1989', empleados: 11370, web: 'https://investor.resmed.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 140.9, capitalizacion_publicada: 32861, free_float_pct: 99.4,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 286 M USD/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía de FY2027 (6-ago-2026, confirmada en la conferencia de Morgan Stanley del 15-sep): ingresos de 5.750-5.850 M USD (crecimiento comparable del 5-7 % sin MatrixCare y sin los 75 M del Astral), BPA no GAAP de 12,00-12,25 USD con 1.500 M de recompras, «ligera subida» del margen operativo, capex de 160-180 M y más de 1.850 M devueltos al accionista [13]. En el 1T27 espera una ligera caída interanual del margen bruto por inflación [13]. Noctrix aportará unos 30 M de ingresos y restará 0,20 USD de BPA no GAAP [9].',
    estimaciones: [
      { periodo: '2027e', ingresos: 5803, ebitda: null, ebit: null, bpa: 12.09, dpa: 2.64, fuente: 'Yahoo Finance (20 analistas de BPA) y Stock Analysis (19) [2, 3]; BPA no GAAP' },
      { periodo: '2028e', ingresos: 6173, ebitda: null, ebit: null, bpa: 13.24, dpa: null, fuente: 'Yahoo Finance (20 analistas) [2]; BPA no GAAP' },
    ],
    recomendaciones: { n_analistas: 20, comprar: 9, mantener: 10, vender: 1, po_medio: 250.52, po_min: 175, po_max: 320 },
    revisiones: 'El BPA de FY2027 apenas se ha movido en 90 días (12,06 → 12,09 USD) y el de FY2028 tampoco (13,22 → 13,24) [2]. Los objetivos se recortaron en junio y julio (Morgan Stanley de 286 a 230 USD al bajar a «equal-weight» el 17-jun por Philips y los GLP-1; RBC bajó en julio por los retos de FY2027) y han subido tras el 4T26: RBC volvió a «comprar» con 262 USD el 15-sep, Mizuho subió de 235 a 240 y Citi de 235 a 240 [3]. El consenso de BPA es no GAAP (excluye unos 0,40 USD de amortización de intangibles comprados) [2].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'ResMed ha ido muy por detrás del S&P 500: −13,0 % en un año frente a +17,5 %, y −1,6 % anual en cinco años frente a +12,0 % [1]. La causa no son las cuentas (el BPA se ha duplicado desde FY2021) sino el múltiplo: el mercado pasó de pagar 46 veces el beneficio del año siguiente en junio de 2021, con Philips recién retirada, a unas 20 veces hoy, por el miedo a los GLP-1 desde 2023 y al regreso de Philips [1, 2]. En 2026 la acción marcó máximo de 277,67 USD en febrero y mínimo de 180,27 en junio, tras la rebaja de Morgan Stanley; las mayores caídas diarias fueron el 29-may y el 8-jul (−6,3 % cada una) y el 7-ago tras los resultados (−5,1 %) [1]. Desde el mínimo ha subido un 30 % con las recompras y la mejora de RBC. La beta mensual a cinco años es de 0,78 (0,93 semanal) [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: cierres.map((c) => ({ anio: c.anio.replace('FY', ''), precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === 'FY2021' })),
    comentario: 'ResMed ha cotizado históricamente con prima: entre 29 y 46 veces el beneficio del año siguiente de 2019 a 2023, por un crecimiento del BPA de doble dígito y un foso de duopolio. Desde 2024 el múltiplo se ha comprimido a 21-24 veces y hoy está en unas 20 veces nuestro BPA de FY2027, el mínimo de diez años, aunque el crecimiento del beneficio ha seguido siendo del 10-15 % [1]. El cambio es de percepción de riesgo, no de cifras: el mercado descuenta que los GLP-1 y Philips acortarán la vida del crecimiento. Excluimos FY2021 (46,5 veces el BPA siguiente), año de la retirada de Philips y de la COVID, como burbuja.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Seis cotizadas: los competidores directos en sueño y respiración (Philips, Fisher & Paykel, Inspire, Inogen) y dos grandes de tecnología médica de EE. UU. como referencia de múltiplo (Stryker, Medtronic). Fisher & Paykel e Inspire cotizan a múltiplos de crecimiento (45 veces) que no reflejan su rentabilidad actual; Inogen tiene pérdidas y no aporta múltiplos. Por eso la mediana relevante para ResMed es la de las grandes con beneficios, en torno a 15-17 veces. Cifras de Yahoo Finance del 14-oct-2026 (en sesión) en USD; Fisher & Paykel convertida con el BCE (0,5614 USD por NZD) [2, 6]. EV/EBITDA NTM: estimación propia con el EBITDA de los últimos 12 meses llevado al crecimiento de ventas previsto (margen constante).',
    empresas: [
      { nombre: 'Philips', ticker: 'PHG', pais: 'NL', capitalizacion: 24325, ev_ventas: 1.70, ev_ebitda_ltm: 12.4, ev_ebitda_ntm: 11.8, per_ntm: 13.1, crecimiento_pct: 5.2, margen_ebitda_pct: 13.7, roic_pct: 7.7, dn_ebitda: 2.3, fcf_yield_pct: 6.3 },
      { nombre: 'Fisher & Paykel Healthcare', ticker: 'FPH', pais: 'NZ', capitalizacion: 16083, ev_ventas: 12.2, ev_ebitda_ltm: 37.2, ev_ebitda_ntm: 33.5, per_ntm: 44.5, crecimiento_pct: 10.9, margen_ebitda_pct: 32.9, roic_pct: null, dn_ebitda: -0.4, fcf_yield_pct: 1.4 },
      { nombre: 'Inspire Medical Systems', ticker: 'INSP', pais: 'US', capitalizacion: 1967, ev_ventas: 1.89, ev_ebitda_ltm: 23.8, ev_ebitda_ntm: 24.3, per_ntm: 44.0, crecimiento_pct: -2.1, margen_ebitda_pct: 7.9, roic_pct: 10.1, dn_ebitda: -4.1, fcf_yield_pct: 4.8 },
      { nombre: 'Inogen', ticker: 'INGN', pais: 'US', capitalizacion: 163, ev_ventas: 0.22, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: 3.9, margen_ebitda_pct: -2.3, roic_pct: null, dn_ebitda: null, fcf_yield_pct: -1.1 },
      { nombre: 'Stryker', ticker: 'SYK', pais: 'US', capitalizacion: 107611, ev_ventas: 4.66, ev_ebitda_ltm: 16.3, ev_ebitda_ntm: 14.5, per_ntm: 16.8, crecimiento_pct: 12.5, margen_ebitda_pct: 28.5, roic_pct: 12.5, dn_ebitda: 1.6, fcf_yield_pct: 3.8 },
      { nombre: 'Medtronic', ticker: 'MDT', pais: 'US', capitalizacion: 119260, ev_ventas: 3.70, ev_ebitda_ltm: 13.3, ev_ebitda_ntm: 12.6, per_ntm: 14.5, crecimiento_pct: 5.7, margen_ebitda_pct: 27.7, roic_pct: 8.6, dn_ebitda: 1.9, fcf_yield_pct: 4.5 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'MatrixCare (software de cuidados a largo plazo)', comprador: 'Frazier Healthcare Partners', ev: 490, ev_ventas: 2.23, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Venta de ResMed: 220 M de ingresos y 55 M de beneficio operativo no GAAP (8,9 veces) [9].' },
      { fecha: '2026-06', objetivo: 'Noctrix Health (dispositivo para piernas inquietas)', comprador: 'ResMed', ev: 335, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Empresa en lanzamiento, sin beneficio; 30 M de ingresos esperados en FY2027 [10].' },
      { fecha: '2021-09', objetivo: 'Itamar Medical (diagnóstico de apnea en casa)', comprador: 'Zoll (Asahi Kasei)', ev: 538, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra de crecimiento en diagnóstico, sin beneficio [11].' },
    ],
    comentario: 'Hay pocas operaciones comparables con múltiplo publicado: el sector es un duopolio y las compras son de tecnología pequeña (Noctrix, Itamar) o de software (MatrixCare, vendida a 2,2 veces ventas y 8,9 veces beneficio operativo). ResMed, con 33.000 M USD de capitalización, no es un objetivo realista. No usamos las transacciones en la valoración.',
    confianza: 'Baja',
  },
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: mensajes sobre $RMD (agosto-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://stocktwits.com/symbol/RMD' },
  { id: 2, titulo: 'Seeking Alpha: artículos y debate sobre RMD (junio-septiembre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-15', url: 'https://seekingalpha.com/symbol/RMD' },
  { id: 3, titulo: 'Seeking Alpha: «ResMed: A Significant Upside Despite The Perceived Risk»', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-10', url: 'https://seekingalpha.com/symbol/RMD/analysis' },
  { id: 4, titulo: 'Seeking Alpha: «ResMed: GLP-1 Threats Are Overstated» y «Fear-Driven Selloff Creates A Compelling Margin Of Safety»', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-06-29', url: 'https://seekingalpha.com/symbol/RMD/analysis' },
  { id: 5, titulo: 'Simply Wall St: comunidad y narrativas de RMD', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://simplywall.st/NYSE:RMD/' },
];
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($RMD)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Más alcistas que bajistas en octubre («compro aquí»), pero con mensajes muy negativos que ven a Philips, React y los GLP-1 convertir la CPAP en «una opción más» para el paciente [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores y comentarios)', fecha: '2026-09', n_comentarios: 25, tono: 'Positivo', resumen: 'Tras el 4T26 predominan las tesis de valor: la caída por miedo deja margen de seguridad y la amenaza de los GLP-1 está exagerada [2, 3, 4].' },
      { plataforma: 'Seeking Alpha (enero-junio de 2026)', fecha: '2026-06', n_comentarios: 15, tono: 'Negativo', resumen: 'En la primera mitad del año hubo tesis de «venta fuerte» por los GLP-1 y una idea corta de un análisis independiente, junto a la rebaja de Morgan Stanley [2].' },
      { plataforma: 'Simply Wall St (comunidad)', fecha: '2026-07', n_comentarios: 10, tono: 'Dividido', resumen: 'Debate sobre si la caída del 23 % en el año ya descuenta a Philips y los GLP-1 [5].' },
    ],
    temas: [
      { tema: 'GLP-1 y fármacos orales contra la obesidad', postura: 'Dividida', peso: 'Alto', contraste: 'Hasta ahora los datos de ResMed (inicios de terapia +11 % con GLP-1) y el crecimiento de equipos (+9 %) no muestran daño; el riesgo es a 3-5 años y lo recogemos en el bajista.' },
      { tema: 'Regreso de Philips a EE. UU.', postura: 'Bajista', peso: 'Alto', contraste: 'Sin fecha oficial a mayo de 2026; nuestro bajista supone que recupera cuota y presiona precios.' },
      { tema: 'Recompras y valoración barata', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 1.500 M de recompras en FY2027 (el 4,5 % de la capitalización) y PER de unas 20 veces, mínimo de diez años.' },
      { tema: 'Márgenes e inflación de costes', postura: 'Dividida', peso: 'Bajo', contraste: 'La dirección admite que ya no compensa la inflación solo con productividad; subidas de precio moderadas.' },
    ],
    lectura: 'El inversor particular está dividido y algo más optimista desde agosto: los alcistas ven una empresa de calidad a precio de saldo con recompras, y los bajistas, un negocio que perderá su monopolio de hecho con los GLP-1, Philips y las alternativas. No es euforia ni capitulación: el sentimiento sigue al del consenso de analistas (10 mantener frente a 9 comprar). No aporta un riesgo que el informe no recoja; confirma que la tesis depende de una sola pregunta, la velocidad a la que los GLP-1 y Philips erosionan los equipos.',
    confianza: 'Media',
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas.');
