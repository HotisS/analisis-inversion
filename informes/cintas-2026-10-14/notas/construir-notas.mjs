// Escribe las notas A-E de Cintas (corte 2026-10-14) sin subagentes, a partir de los documentos de notas/docs
// (10-K FY2026 y FY2024, 10-Q 1T FY2027, notas de prensa 8-K, proxy 2026, 8-K de la fusión con UniFirst),
// del XBRL de la SEC (cuentas-xbrl.json) y de datos de mercado (bolsa.json, Yahoo, Stock Analysis, MarketScreener).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/723254';

// ------------------------------------------------------------------ A. Cuentas
const fA = [
  { id: 1, titulo: 'Cintas Corporation, Form 10-K del ejercicio cerrado el 31-may-2026 (cuentas, notas 1-14)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-29', url: `${EDGAR}/000072325426000028/ctas-20260531.htm` },
  { id: 2, titulo: 'Cintas Corporation, Form 10-K del ejercicio cerrado el 31-may-2024 (segmentos FY2022-FY2024, litigio City of Laurel)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2024-07-25', url: `${EDGAR}/000072325424000036/ctas-20240531.htm` },
  { id: 3, titulo: 'Cintas Corporation: hechos XBRL de los 10-K y 10-Q (companyfacts)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000723254.json' },
  { id: 4, titulo: 'Cintas Corporation Announces Fiscal 2027 First Quarter Results (8-K, anexo 99)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-23', url: `${EDGAR}/000072325426000044/ex992026-8x31.htm` },
  { id: 5, titulo: 'Cintas Corporation Announces Fiscal 2026 Fourth Quarter and Full Year Results (8-K, anexo 99)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-15', url: `${EDGAR}/000072325426000025/ex992026-5x31.htm` },
  { id: 6, titulo: 'Cintas Corporation Announces Fiscal 2026 Third Quarter Results (8-K, anexo 99)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-25', url: `${EDGAR}/000072325426000006/ex992026-2x28.htm` },
  { id: 7, titulo: 'Cintas Corporation, Form 10-Q del trimestre cerrado el 31-ago-2026', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-07', url: `${EDGAR}/000072325426000047/ctas-20260831.htm` },
  { id: 8, titulo: 'Transcript: Cintas Q1 earnings call highlights (resumen de la conferencia del 23-sep-2026)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://www.marketbeat.com/instant-alerts/transcript-cintas-q1-earnings-call-highlights-2026-09-23/' },
  { id: 9, titulo: 'Cintas Says Volume, Not Price Hikes, Is Powering Its Growth', editor: 'Tiger Brokers (Dow Jones)', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://www.itiger.com/news/2669433948' },
  { id: 10, titulo: 'Credit Agreement de 2.000 M USD con KeyBank (8-K, punto 1.01)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-31', url: `${EDGAR}/000072325426000010/ctas-20260327.htm` },
  { id: 11, titulo: 'Cintas to acquire UniFirst in $5.5 billion transaction (8-K, anexo 99.1)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-11', url: `${EDGAR}/000095010326003567/dp243132_ex9901.htm` },
];
const ajusteSplit = (p) => (+p.periodo <= 2022 ? 4 : 1); // split 4:1 de sep-2024: 2017-2022 en acciones de entonces
const noRec = { 2024: 45.0, 2025: -15.0, 2026: 15.1 }; // litigio City of Laurel (FY24), plusvalía inmueble (FY25), costes UniFirst (FY26)
const cuenta = X.financieros.cuenta.filter((c) => +c.periodo >= 2019).map((c) => {
  const k = ajusteSplit(c);
  const cv = c.coste_ventas ?? r1(c.ingresos - c.gastos_generales - c.ebit); // FY2019-22: ingresos − gastos comerciales − EBIT
  return {
    periodo: `FY${c.periodo}`, ingresos: r1(c.ingresos), coste_ventas: r1(cv), gastos_generales: r1(c.gastos_generales),
    ebitda: r1(c.ebitda), amortizaciones: r1(c.amortizaciones), ebit: r1(c.ebit), resultado_financiero: r1(c.resultado_financiero),
    bai: r1(c.bai), impuestos: r1(c.impuestos), minoritarios: 0, beneficio_neto: r1(c.beneficio_neto), gastos_financieros: r1(c.gastos_financieros),
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec[c.periodo] ?? null,
    bpa: r2(c.bpa / k), dpa: r2(c.dpa / k), dpa_extraordinario: 0, acciones_diluidas: r1(c.acciones_diluidas * k),
  };
});
const balance = X.balance.historico.filter((b) => +b.periodo >= 2019).map((b) => ({
  periodo: `FY${b.periodo}`, activo_total: r1(b.activo_total), activo_corriente: r1(b.activo_corriente), pasivo_corriente: r1(b.pasivo_corriente),
  pasivo_total: r1(b.pasivo_total), fondo_comercio: r1(b.fondo_comercio), intangibles: r1(b.intangibles), inmovilizado_material: r1(b.inmovilizado_material),
  existencias: r1(b.existencias), clientes: r1(b.clientes), proveedores: r1(b.proveedores), activos_contrato: null, pasivos_contrato: null,
  caja: r1(b.caja), deuda_financiera: r1(b.deuda_financiera), arrendamientos: 0, patrimonio_neto: r1(b.patrimonio_neto), minoritarios: 0, reservas: r1(b.reservas),
}));
const flujos = X.flujos.historico.filter((f) => +f.periodo >= 2019).map((f) => ({
  periodo: `FY${f.periodo}`, flujo_operativo: r1(f.flujo_operativo), capex: r1(f.capex), pagos_arrendamientos: 0, adquisiciones: r1(f.adquisiciones),
  desinversiones: r1(f.desinversiones ?? 0), dividendos: r1(f.dividendos), recompras: r1(f.recompras), emision_acciones: r1(f.emision_acciones), intereses_en_financiacion: 0,
}));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM ago-26', fecha_fin: '2026-08-31', ingresos: 11560.7, ebitda: 3214.7, ebit: 2700.5, beneficio_neto: 2060.6, bpa: 5.07, dpa: 1.87, dpa_extraordinario: 0, fcf: 2033.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 29.5 },
    cambios_perimetro: [],
    comentario: 'Cintas ha crecido de 6.892 M USD (FY2019) a 11.265 M (FY2026) casi sin compras: en FY2026 las ventas subieron un 8,9 %, un 8,3 % orgánico y solo 0,6 puntos por adquisiciones [1]; en FY2024, un 8,0 % orgánico [2]. El margen EBIT pasó del 16,5 % de FY2019 al 23,1 % de FY2026 y al 23,6 % del 1T FY2027 [1, 4]: el margen bruto de alquiler de uniformes subió de 49,3 % a 50,0 % por un uso más eficiente del inventario en servicio y productividad de las plantas, y el de primeros auxilios del 57,2 % al 57,7 % por mezcla y compras [1]. Los gastos comerciales se mantienen en el 27,4 % de las ventas: el apalancamiento operativo viene del margen bruto. FY2024 lleva un acuerdo de 45 M en el litigio City of Laurel, FY2025 una plusvalía de 15 M por la venta de un inmueble y FY2026 15,1 M de costes de la operación UniFirst [1, 2].',
    ajustes: 'Usamos las cifras publicadas (US GAAP). La empresa solo ajusta el BPA por los costes de la operación UniFirst: 0,03 USD en FY2026 (4,94 frente a 4,91) y en el 1T FY2027 (1,39 frente a 1,36) [4, 5]. Los devolvemos al EBITDA como no recurrentes (15,1 M en FY2026 y 29,5 M en los últimos doce meses), igual que el acuerdo del litigio City of Laurel de FY2024 (45 M) y, con signo contrario, la plusvalía inmobiliaria de FY2025 (15 M) [1, 2]. El EBITDA suma toda la amortización del estado de flujos, que incluye 105,4 M de amortización de comisiones activadas (costes de obtener contratos) y 34,1 M de software [1]: es una definición algo más generosa que la del flujo de caja, porque esas comisiones se pagan dentro del flujo operativo. BPA, DPA y acciones de FY2019-FY2022 se dividen entre 4 por el desdoblamiento de septiembre de 2024 [3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '2T25', ingresos: 2561.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.09, vs_consenso: null },
      { periodo: '3T25', ingresos: 2609.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.13, vs_consenso: null },
      { periodo: '4T25', ingresos: 2667.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.09, vs_consenso: null },
      { periodo: '1T26', ingresos: 2718.1, crecimiento_pct: 8.7, crecimiento_organico_pct: 7.8, ebitda: 743.8, margen_ebitda_pct: 27.4, bpa: 1.2, vs_consenso: null },
      { periodo: '2T26', ingresos: 2800.0, crecimiento_pct: 9.3, crecimiento_organico_pct: 8.6, ebitda: null, margen_ebitda_pct: null, bpa: 1.21, vs_consenso: null },
      { periodo: '3T26', ingresos: 2841.4, crecimiento_pct: 8.9, crecimiento_organico_pct: 8.2, ebitda: null, margen_ebitda_pct: null, bpa: 1.24, vs_consenso: null },
      { periodo: '4T26', ingresos: 2905.3, crecimiento_pct: 8.9, crecimiento_organico_pct: 8.4, ebitda: null, margen_ebitda_pct: null, bpa: 1.26, vs_consenso: 'Superior' },
      { periodo: '1T27', ingresos: 3014.0, crecimiento_pct: 10.9, crecimiento_organico_pct: 8.9, ebitda: 839.2, margen_ebitda_pct: 27.8, bpa: 1.36, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En el 1T FY2027 (23-sep-2026) la dirección insistió en que el crecimiento viene del volumen y no del precio: la subida de tarifas fue «coherente con años anteriores» y mejoraron las altas, la retención y la venta cruzada [8, 9]. Más de dos tercios de las altas son empresas que gestionaban sus uniformes y suministros por su cuenta, y Cintas cifra su mercado en 16-20 millones de empresas frente al millón que atiende [8]. Uniformes creció un 8,0 % orgánico, primeros auxilios un 14,2 %, protección contra incendios un 9,2 % [8]. El margen bruto récord del 51,5 % y el margen operativo del 23,6 % (17,6 % de subida del beneficio operativo sin los costes de UniFirst) llevaron a subir la guía de ventas a 12.150-12.270 M y la de BPA ajustado a 5,45-5,54 USD [4]. Frente a julio, cuando la dirección avisó de un viento en contra de unos 100 puntos básicos en protección contra incendios por la implantación de SAP, el sistema sigue en piloto [8]. Las preguntas se repitieron sobre UniFirst: la dirección no dio detalles de la revisión de la FTC ni de posibles desinversiones, más allá de esperar el cierre antes de fin de 2026 [8]. Tampoco cuantificó la subida de precios ni la retención [8, 9].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2027', importe: 1000 }, { anio: 'FY2028', importe: 400 }, { anio: 'FY2029-FY2031', importe: 0 }, { anio: 'FY2032', importe: 800 }, { anio: 'FY2037', importe: 236.6 }],
    liquidez: 'Caja de 243,6 M al 31-ago-2026 y línea de crédito no dispuesta de 2.000 M hasta marzo de 2031, ampliable en 1.000 M; programa de papel comercial sin saldo [7, 10]. Financiación puente comprometida para la parte en efectivo de UniFirst [1].',
    rating: null,
    coste_deuda_pct: 4.1,
    vida_media_anios: 3.6,
    otros_pasivos: 'Sin pensiones de prestación definida relevantes: el Partners\' Plan es de aportación definida [1]. Arrendamientos operativos de 280,7 M (US GAAP: su gasto ya está en el EBITDA, no van al puente) [7]. Cartas de crédito por 125,8 M [1]. Covenant de deuda/EBITDA de 3,5 veces, ampliable a 4,0 durante cuatro trimestres tras una compra relevante; hoy está en 0,7 veces [10]. Pasivo diferido de 548,9 M por impuestos [7]. Coberturas de tipos sobre 500 M de emisiones futuras con valor positivo de 109,5 M [1]. Inversiones de 448,9 M que respaldan el plan de compensación diferida [7]. La compra de UniFirst supondrá unos 2.900 M en efectivo (155 USD por acción) financiados con deuda: la empresa prevé un apalancamiento neto de 1,5 veces al cierre [11].',
    comentario: 'La deuda bruta se ha quedado en unos 2.430 M desde FY2023 mientras el EBITDA pasó de 2.212 a 3.119 M: la deuda neta cayó de 1,1 a 0,7 veces el EBITDA [1]. El circulante comercial (existencias + clientes − proveedores) ronda el 13-14 % de las ventas, pero hay que sumarle el inventario de uniformes en servicio (1.276 M en FY2026, un 11 % de las ventas), que se amortiza en el coste de ventas y crece con los clientes: en FY2026 absorbió 137,6 M de caja [1]. Vencen 1.000 M al 3,70 % en FY2027 (junio de 2027): con UniFirst habrá que refinanciarlos a tipos más altos [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta: el flujo operativo de FY2026 fue de 2.276 M y la caja libre (después de 395 M de capex) de 1.881 M, un 94 % del beneficio neto [1]. En los últimos doce meses, 2.034 M [4]. El capex se mantiene en el 3,5-4,3 % de las ventas desde FY2023; la empresa no separa mantenimiento y crecimiento. Estimación propia: el capex de mantenimiento ronda la depreciación del inmovilizado (318,6 M); el resto es capacidad, tecnología y SAP [1]. Además de lo que se ve en el capex, el flujo operativo ya descuenta dos inversiones de crecimiento: el aumento del inventario en servicio (137,6 M) y las comisiones activadas (unos 134 M, estimación propia con la variación del saldo de 371,8 a 400,7 M más 105,4 M de amortización) [1]. Las compras son pequeñas (164,5 M en FY2026). La caja se devolvió casi entera: 701 M de dividendos y 952 M de recompras en FY2026 [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 58, opinion: 'Favorable, sin salvedades; control interno eficaz [1]',
    comentario: 'Pocas señales. El auditor es el mismo desde 1968 [1]: rotación nula, aunque el socio rota por ley. Activaciones: comisiones de venta (400,7 M de saldo, amortizadas en 8 años de media) y software (387,5 M en equipo y 77,1 M en curso, a 10 años) [1]; ambas suben el EBITDA frente a la caja, por unos 140 M al año. La remuneración en acciones es de 128,1 M (6,4 % del beneficio neto) [1]. El inventario en servicio se amortiza en 18-30 meses: alargar esas vidas mejoraría el margen bruto sin caja, y es justo la partida que la dirección cita como fuente de mejora del margen («uso más eficiente del inventario en servicio») [1]; no vemos cambio de criterio, pero hay que vigilarlo. El tipo efectivo (20,2 %) baja por el efecto fiscal de las opciones [1]. Leemos los indicadores del motor en el informe: Altman alto por el poco endeudamiento, Piotroski alto por márgenes y caja crecientes, Beneish sin alarma.',
    senales: [
      { senal: 'Margen bruto apoyado en la amortización del inventario en servicio', nivel: 'Media', comentario: 'La mejora de 70 puntos básicos del margen de uniformes se atribuye a un uso más eficiente del inventario en servicio; no hay cambio de vidas útiles publicado [1].' },
      { senal: 'Comisiones y software activados', nivel: 'Baja', comentario: 'Unos 140 M de amortización al año que el EBITDA suma; la caja libre los descuenta [1].' },
      { senal: 'Auditor desde 1968', nivel: 'Baja', comentario: 'Independencia formal: comisión de auditoría solo de independientes [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral creciente: subió un 15,6 % en julio de 2026, hasta 0,52 USD por trimestre (2,08 USD al año) [4]. Recompras: quedan unos 440 M del programa de julio de 2024 y 1.000 M del de octubre de 2025; en el 1T FY2027 y hasta el 22-sep se recompraron 544,7 M [1, 4]. Prioridades declaradas: crecimiento orgánico, compras, recompras y dividendos según la perspectiva económica [1]. La compra de UniFirst (unos 2.900 M en efectivo) se financia con deuda y llevará el apalancamiento a 1,5 veces [11].',
    adquisiciones: [
      { anio: '2017', objetivo: 'G&K Services (uniformes, EE. UU. y Canadá)', importe: 2102, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Integrada: el margen EBIT del grupo pasó de 14,5 % en FY2017 a 23,1 % en FY2026; sin deterioros del fondo de comercio [3, 1].' },
      { anio: '2022-2026', objetivo: 'Compras pequeñas de franquicias de uniformes, primeros auxilios y protección contra incendios', importe: 797, ev_ebitda: null, financiacion: 'Caja', resultado: 'Suman 0,4-1,2 puntos de crecimiento al año; sin deterioros [1, 3].' },
      { anio: '2026', objetivo: 'UniFirst (uniformes, EE. UU. y Canadá); pendiente de la FTC', importe: 5500, ev_ebitda: 8.0, financiacion: '155 USD en efectivo (deuda) y 0,7720 acciones de Cintas por acción', resultado: 'Pendiente. 8,0 veces el EBITDA con 375 M de sinergias en cuatro años; sin ellas, unas 17 veces (estimación propia con el EBITDA de consenso de UniFirst) [11].' },
    ],
    comentario: 'Cintas es buena asignadora de capital: con un ROIC alto, reinvierte poco y devuelve casi toda la caja libre, y las recompras han reducido las acciones diluidas de 440 M (FY2019, en acciones de hoy) a 406 M en FY2026 [3]. G&K, la última gran compra, se integró con márgenes crecientes. UniFirst es la apuesta grande: 5.500 M (el 7 % del valor de Cintas) a 17 veces el EBITDA sin sinergias, y emisión de unos 14 M de acciones (3,5 % de dilución, estimación propia con unos 18,6 M de acciones de UniFirst). Solo se paga si llegan las sinergias de 375 M, que equivalen a un 15 % de las ventas de UniFirst.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Uniformes y servicios a instalaciones', descripcion: 'Alquiler y lavado de uniformes, alfombrillas, mopas, toallas; aseos y suministros en ruta.', tipo_resultado: 'EBIT', historico: [
        { periodo: 'FY2022', ingresos: 6227.0, resultado: 1353.5 }, { periodo: 'FY2023', ingresos: 6897.1, resultado: 1478.8 }, { periodo: 'FY2024', ingresos: 7465.2, resultado: 1659.5 }, { periodo: 'FY2025', ingresos: 7976.1, resultado: 1873.4 }, { periodo: 'FY2026', ingresos: 8621.6, resultado: 2077.0 }] },
      { nombre: 'Primeros auxilios y seguridad', descripcion: 'Botiquines, equipos de protección, desfibriladores, agua en el puesto de trabajo, formación.', tipo_resultado: 'EBIT', historico: [
        { periodo: 'FY2022', ingresos: 832.5, resultado: 106.8 }, { periodo: 'FY2023', ingresos: 951.5, resultado: 180.7 }, { periodo: 'FY2024', ingresos: 1067.3, resultado: 239.2 }, { periodo: 'FY2025', ingresos: 1218.1, resultado: 294.7 }, { periodo: 'FY2026', ingresos: 1391.9, resultado: 353.4 }] },
      { nombre: 'Otros (protección contra incendios y venta directa de uniformes)', descripcion: 'Extintores, rociadores, alarmas; venta de uniformes a grandes cuentas.', tipo_resultado: 'EBIT', historico: [
        { periodo: 'FY2022', ingresos: 795.0, resultado: 127.1 }, { periodo: 'FY2023', ingresos: 967.1, resultado: 143.2 }, { periodo: 'FY2024', ingresos: 1064.1, resultado: 170.0 }, { periodo: 'FY2025', ingresos: 1146.0, resultado: 191.6 }, { periodo: 'FY2026', ingresos: 1251.3, resultado: 191.2 }] },
      { nombre: 'Corporativo (costes de UniFirst)', descripcion: 'Costes de la operación UniFirst.', tipo_resultado: 'EBIT', historico: [
        { periodo: 'FY2022', ingresos: 0, resultado: 0 }, { periodo: 'FY2023', ingresos: 0, resultado: 0 }, { periodo: 'FY2024', ingresos: 0, resultado: 0 }, { periodo: 'FY2025', ingresos: 0, resultado: 0 }, { periodo: 'FY2026', ingresos: 0, resultado: -15.1 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 91 }, { nombre: 'Canadá y Latinoamérica', peso_pct: 9 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '7,8 % (1T FY2026)', valor_actual: '8,9 % (1T FY2027)', variacion: '+1,1 pp', comentario: 'FY2026: 8,3 % [1, 4].' },
      { kpi: 'Margen bruto', valor_anterior: '50,0 % (FY2025)', valor_actual: '50,7 % (FY2026); 51,5 % 1T27', variacion: '+70 pb', comentario: 'Récord histórico [1, 4].' },
      { kpi: 'Margen operativo', valor_anterior: '22,8 % (FY2025)', valor_actual: '23,1 % (FY2026); 23,6 % 1T27', variacion: '+30 pb', comentario: 'Con costes de UniFirst [1, 4].' },
      { kpi: 'Rutas de reparto', valor_anterior: 'n. d.', valor_actual: '≈ 12.500 rutas, 484 instalaciones', variacion: 'n. d.', comentario: 'A 31-may-2026 [1].' },
      { kpi: 'Clientes', valor_anterior: 'n. d.', valor_actual: '> 1 millón de empresas', variacion: 'n. d.', comentario: 'Ninguno supera el 1 % de las ventas [1].' },
      { kpi: 'Empleados', valor_anterior: 'n. d.', valor_actual: '≈ 48.100', variacion: 'n. d.', comentario: 'Unos 800 sindicados [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento y EBITDA de 2T25-4T25 y 2T26-4T26', tipo: 'Complemento', intentos: '1) XBRL trimestral de companyfacts (solo ingresos, EBIT y BPA; el 4T se deriva del anual); 2) notas de prensa del 3T26 y 4T26 (comparativas de ingresos y BPA); 3) amortización trimestral no publicada en las notas', decision: 'Omitido' },
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) 10-K FY2026 (no lo cita); 2) 8-K de la línea de crédito (márgenes por rating sin la nota); 3) folletos de bonos no descargados por tiempo', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ------------------------------------------------------------------ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Cintas Corporation, Form 10-K FY2026 (negocio, competencia, regulación, empleados)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-29', url: `${EDGAR}/000072325426000028/ctas-20260531.htm` },
  { id: 2, titulo: 'Vestis: Company Information («estimated $48 billion dollar industry»)', editor: 'Vestis Corporation', tipo: 'Primaria', fecha: '2026-10', url: 'https://ir.vestis.com/company-information' },
  { id: 3, titulo: 'Transcript: Cintas Q1 earnings call highlights (16-20 millones de empresas en su mercado)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://www.marketbeat.com/instant-alerts/transcript-cintas-q1-earnings-call-highlights-2026-09-23/' },
  { id: 4, titulo: 'UniFirst Corporation: previsiones financieras (ventas y EBITDA FY2021-FY2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/UNIFIRST-CORPORATION-14749/finances/' },
  { id: 5, titulo: 'Vestis Corporation (VSTS): Statistics & Valuation', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/vsts/statistics/' },
  { id: 6, titulo: 'Aramark (ARMK): Statistics & Valuation', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/armk/statistics/' },
  { id: 7, titulo: 'Cintas to acquire UniFirst (8-K, anexo 99.1): competencia de grupos con flotas de última milla y de la compra directa', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-11', url: `${EDGAR}/000095010326003567/dp243132_ex9901.htm` },
  { id: 8, titulo: 'Cintas 8-K del 6-oct-2026: FTC (segunda solicitud, acuerdo de plazos hasta el 11-dic-2026) y Competition Bureau de Canadá', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-06', url: `${EDGAR}/000095010326015293/dp254677_8k.htm` },
  { id: 9, titulo: 'Análisis de Rentokil Initial del repositorio (Elis, ABM, Rollins, Ecolab, ISS: márgenes y comparables a 7-oct-2026)', editor: 'Análisis propio (repositorio)', tipo: 'Analistas', fecha: '2026-10-07', url: 'informes/rentokil-2026-10-07/datos-v3.json' },
  { id: 10, titulo: 'Cintas Corporation, Form 10-K FY2024 (segmentos FY2022-FY2024)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2024-07-25', url: `${EDGAR}/000072325424000036/ctas-20240531.htm` },
  { id: 11, titulo: 'Ficha sectorial: servicios a empresas, uniformes, higiene y seguridad (14-oct-2026)', editor: 'Análisis propio (repositorio)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/servicios-uniformes-2026-10-14.md' },
];
const Bn = {
  _estado: 'completo',
  historia: {
    resumen: 'Cintas nace en 1968, cuando Richard T. Farmer deja la lavandería industrial familiar (que recogía trapos de taller desde 1929) para vender programas de uniformes con un tejido nuevo; a principios de los setenta compra el negocio familiar [1]. Durante cinco décadas añade productos a la misma ruta: alfombrillas, aseos, primeros auxilios, protección contra incendios. Scott D. Farmer, hijo del fundador, fue primer ejecutivo de 2003 a 2021 y hoy es presidente ejecutivo con el 14 % del capital [1]. En 2017 compró G&K Services por unos 2.100 M y en 2026 acordó comprar UniFirst, el tercer competidor, por 5.500 M [1, 7].',
    hitos: [
      { anio: '1929', hito: 'La familia Farmer empieza a lavar y revender trapos de taller en Cincinnati [1].' },
      { anio: '1968', hito: 'Richard T. Farmer funda Cintas con programas de uniformes [1].' },
      { anio: '1983', hito: 'Salida a bolsa en el Nasdaq.' },
      { anio: '2003', hito: 'Scott D. Farmer, primer ejecutivo [1].' },
      { anio: '2017', hito: 'Compra de G&K Services (unos 2.100 M) [1].' },
      { anio: '2021', hito: 'Todd M. Schneider, primer ejecutivo; Farmer pasa a presidente ejecutivo [1].' },
      { anio: '2024', hito: 'Desdoblamiento 4 por 1 de las acciones (septiembre).' },
      { anio: '2026', hito: 'Acuerdo de compra de UniFirst por 5.500 M (10-mar); segunda solicitud de la FTC (11-jun) [7, 8].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Cintas alquila y lava uniformes y artículos de higiene (alfombrillas, mopas, toallas, suministros de aseos) a más de un millón de empresas de todos los tamaños, sobre todo en EE. UU. (más del 90 % de las ventas) y Canadá [1]. Lo reparte con unas 12.500 rutas desde 484 instalaciones y 12 centros de distribución, con cinco fábricas propias de prendas [1]. Sobre la misma relación vende primeros auxilios y seguridad (botiquines, equipos de protección, desfibriladores, agua, formación: 12,4 % de las ventas), protección contra incendios (extintores, rociadores, alarmas: 8,2 %) y venta directa de uniformes (2,9 %) [1]. Ningún cliente supera el 1 % de las ventas [1].',
    como_gana_dinero: 'Casi todo es recurrente: contratos de servicio en ruta (habitualmente plurianuales) con una visita semanal en la que se recogen y entregan prendas y artículos. El margen depende de la densidad de la ruta (más clientes y más productos por parada reparten el mismo camión y la misma planta), del aprovechamiento del inventario en servicio y del coste de personal, energía y combustible [1]. Por eso el crecimiento por venta cruzada es tan rentable: el beneficio operativo subió un 10,5 % en FY2026 con ventas +8,9 % [1]. Un 77 % de las ventas es alquiler de uniformes y servicios a instalaciones con un margen operativo del 24,1 %; primeros auxilios gana un 25,4 % [1]. La facturación depende en parte del número de empleados de los clientes con uniforme: es sensible al empleo industrial y de servicios.',
    clientes: 'Clientes muy atomizados: más de un millón de empresas y ninguno con más del 1 % de las ventas [1]. Dos tercios de las altas del 1T FY2027 eran empresas que no tenían un programa externo («no programmers») [3]: el mercado está poco penetrado (1 millón de clientes sobre 16-20 millones de empresas, según la dirección) [3]. Retención: la empresa dice que mejoró ligeramente en uniformes, sin dar la cifra [3]. Poder de precios: el margen bruto pasó del 50,0 % al 50,7 % en FY2026 con subidas de precio «coherentes con años anteriores» y presión de costes salariales y médicos [1, 3]; es decir, repercute la inflación y algo más. Los contratos de uniformes suelen ser de 3-5 años con penalización por cancelación (práctica sectorial; la empresa no publica la duración media).',
  },
  sector: {
    definicion: 'Servicios de alquiler y lavado de uniformes y de higiene en el lugar de trabajo (alfombrillas, toallas, aseos) en Norteamérica, más los servicios en ruta que Cintas añade: primeros auxilios y seguridad y protección contra incendios. Usamos el tamaño de Vestis, 48.000 M USD para uniformes y suministros del lugar de trabajo en Norteamérica [2], como mercado de la cuota de uniformes; es una estimación de un competidor, sin año ni metodología publicados. La dirección de Cintas lo mide en empresas: 16-20 millones de posibles clientes frente al millón que atiende [3]. No hay estadística oficial del tamaño; la cuota se calcula con las ventas del segmento de uniformes. Detalle en la ficha sectorial [11].',
    tamano: '≈ 48.000 M USD (Norteamérica, uniformes y suministros del lugar de trabajo; estimación de Vestis) [2]',
    unidad_serie: 'millones de USD (estimación propia con crecimiento del 4,5 %)', serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: 4.5, cr5_pct: 30, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Externalización de quien hoy gestiona sus uniformes', efecto: '+', horizonte: 'Estructural', evidencia: 'Dos tercios de las altas de Cintas son empresas sin programa externo [3].' },
      { driver: 'Empleo en industria, servicios y sanidad', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La factura depende de los empleados con uniforme; en FY2021 (pandemia) las ventas de Cintas crecieron un 0,4 % [1].' },
      { driver: 'Venta cruzada en la misma ruta (primeros auxilios, incendios, aseos)', efecto: '+', horizonte: 'Estructural', evidencia: 'Primeros auxilios crece al 14 % orgánico con margen operativo del 25,4 % [1].' },
      { driver: 'Coste de personal, energía y algodón', efecto: '−', horizonte: 'Cíclico', evidencia: 'La energía bajó como % de ventas en FY2026 y ayudó al margen de primeros auxilios [1].' },
      { driver: 'Concentración (Cintas-UniFirst)', efecto: '+/−', horizonte: 'Estructural', evidencia: '375 M de sinergias previstas; revisión de la FTC con segunda solicitud [7, 8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Tres nacionales (Cintas, UniFirst, Vestis) y cientos de locales; Vestis pierde clientes y margen (EBITDA del 9,3 %) [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes muy pequeños y atomizados; ninguno pesa más del 1 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Tejidos y prendas de muchos proveedores; cinco fábricas propias [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta red de plantas y rutas densa; Cintas cita como amenaza a grupos con flotas de última milla [7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Compra directa de prendas y lavado propio; la empresa lo reconoce como competencia [1, 7].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El empleo de EE. UU. crece poco, pero Cintas no ve ciclos de venta más largos ni cambios de comportamiento de los clientes [3]. En la crisis de 2008-09 las ventas del sector cayeron con el empleo industrial; en FY2021 (pandemia) Cintas solo creció un 0,4 % y mantuvo el margen gracias a la venta de equipos de protección [1]; en 2022 la inflación de salarios y energía se repercutió con precio. Es un negocio defensivo con algo de ciclo en el volumen.' },
    regulacion: 'Leyes ambientales sobre aguas residuales de lavandería (Clean Water Act, Clean Air Act, RCRA y Superfund) y normas de salud laboral; Cintas dice que no tuvieron efecto material en FY2026 [1]. Lo que más pesa hoy es la competencia: la FTC envió una segunda solicitud sobre UniFirst el 11-jun-2026; las partes certificaron su cumplimiento el 2-oct y no cerrarán antes del 11-dic-2026 salvo aviso de la FTC; Canadá envió una solicitud complementaria [8]. Aranceles: Cintas fabrica parte de las prendas en Honduras y México [1].',
    tendencias: 'Tecnología en las rutas y en las plantas (SAP en protección contra incendios, planificación de rutas, telemetría) que sube el margen; competencia de grupos con flotas de última milla y de la compra directa por internet [7]. La inteligencia artificial afecta poco al servicio físico (lavar y repartir) y algo al empleo de oficina de los clientes, que no lleva uniforme; puede ayudar en la venta y en las rutas. Cintas gana con la consolidación si la FTC aprueba UniFirst.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 18, posicion: '1.º de Norteamérica en alquiler de uniformes (segmento de 8.622 M frente a unos 48.000 M del mercado de uniformes y suministros, estimación propia con la cifra de Vestis); 1.º también en primeros auxilios en ruta',
    competidores: [
      { nombre: 'UniFirst', pais: 'EE. UU.', ticker: 'UNF', ingresos: 2432, cuota_pct: 5, margen_ebit_pct: 7.9, comentario: 'Tercero; en compra por Cintas. Margen EBIT del 7,9 % en FY2025 (ejercicio a agosto) [4].' },
      { nombre: 'Vestis', pais: 'EE. UU.', ticker: 'VSTS', ingresos: 2700, cuota_pct: 5.6, margen_ebit_pct: 4.2, comentario: 'Segregada de Aramark en 2023; pierde clientes y está muy endeudada (deuda neta 5 veces el EBITDA) [5].' },
      { nombre: 'Aramark (uniformes en Canadá y servicios de alimentación)', pais: 'EE. UU.', ticker: 'ARMK', ingresos: 19850, cuota_pct: null, margen_ebit_pct: 4.7, comentario: 'Comparable de servicios externalizados; ya no tiene uniformes en EE. UU. [6].' },
      { nombre: 'Elis', pais: 'Francia', ticker: 'ELIS', ingresos: 5000, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder europeo de textil e higiene; no está en Norteamérica [9].' },
      { nombre: 'Rentokil Initial', pais: 'Reino Unido', ticker: 'RTO', ingresos: 7133, cuota_pct: null, margen_ebit_pct: 12.8, comentario: 'Higiene (Initial) y plagas; vendió su textil francés en 2025 [9].' },
      { nombre: 'ABM Industries', pais: 'EE. UU.', ticker: 'ABM', ingresos: 8700, cuota_pct: null, margen_ebit_pct: 3.6, comentario: 'Limpieza y mantenimiento de edificios; intensivo en personal [9].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay efectos de red entre clientes; sí densidad de rutas.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Contratos plurianuales, prendas personalizadas e inventario en servicio; la retención mejora [3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca conocida en empresas pequeñas; sin patentes relevantes.' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen EBIT del 23,1 % frente al 7,9 % de UniFirst y el 4,2 % de Vestis con el mismo producto [1, 4, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Densidad de 12.500 rutas y 484 instalaciones; cada producto añadido a la parada reparte el coste fijo [1].' },
      ],
    },
    amenazas: 'La amenaza principal no es tecnológica sino de competencia y regulación. La FTC puede bloquear UniFirst o exigir ventas de plantas (riesgo de desenlace en diciembre de 2026; las partes ya evalúan remedios según CTFN) [8]. Vestis, en dificultades, puede competir en precio para retener clientes. A largo plazo, grandes grupos con flotas de última milla y la compra directa por internet podrían captar a los clientes pequeños [7]. Probabilidad baja de erosión material en cinco años: la diferencia de márgenes frente a UniFirst y Vestis (15-19 puntos) lleva una década [1, 4, 5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Agua y energía de las lavanderías industriales: los procesos usan menos agua que el lavado doméstico y las aguas se tratan en planta según los permisos locales [1]; el coste de la energía es material para el margen bruto (su bajada ayudó en FY2026) [1]. Seguridad laboral en plantas y rutas, con 48.100 empleados [1]. Cadena de suministro textil (Honduras, México y proveedores externos) con código de conducta de proveedores [1].',
    controversias: 'Litigio City of Laurel (contratos con agencias públicas): acuerdo de 45 M en marzo de 2024 [10]. No encontramos sanciones ambientales materiales en el 10-K de FY2026 [1].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy (no las citan); 2) web de la empresa (no consultada por tiempo); 3) MSCI y Sustainalytics requieren registro', decision: 'Omitido' },
    { seccion: 'sector', campo: 'serie de tamaño del mercado y segunda fuente independiente', tipo: 'Complemento', intentos: '1) 10-K de Cintas (solo número de empresas); 2) web de Vestis (48.000 M sin año); 3) búsqueda de informes sectoriales (sin cifra fiable)', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ------------------------------------------------------------------ C. Equipo y gobierno
const fC = [
  { id: 7, titulo: 'Proxy 2026: grupo de comparación del rendimiento para el accionista (ABM, Aramark, Rollins y UniFirst)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-15', url: `${EDGAR}/000072325426000040/ctas-20260915.htm#tsr` },
  { id: 1, titulo: 'Cintas Corporation, Proxy Statement 2026 (DEF 14A)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-15', url: `${EDGAR}/000072325426000040/ctas-20260915.htm` },
  { id: 2, titulo: 'Form 4 de Cintas presentados entre el 14-oct-2025 y el 14-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000723254&type=4' },
  { id: 3, titulo: 'Cintas 8-K del 27-ago-2026: Melanie W. Barstad no se presenta a la reelección', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-27', url: `${EDGAR}/000095010326013001/dp252376_8k.htm` },
  { id: 4, titulo: 'Notas de prensa de resultados con la guía anual (FY2026 3T y 4T, FY2027 1T)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-23', url: `${EDGAR}/000072325426000044/ex992026-8x31.htm` },
  { id: 5, titulo: 'Cintas Corporation, Form 10-K FY2026 (MD&A: crecimiento orgánico; guía FY2026)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-29', url: `${EDGAR}/000072325426000028/ctas-20260531.htm` },
  { id: 6, titulo: 'Cintas outlines $11.21B–$11.24B FY26 revenue target (3T FY2026)', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-03-25', url: 'https://seekingalpha.com/symbol/CTAS/news' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Todd M. Schneider', cargo: 'Primer ejecutivo (presidente hasta jul-2026)', desde: '2021', participacion_pct: 0.18, trayectoria: 'En Cintas desde 1989; fue director de operaciones. Con él, el margen operativo pasó del 19,5 % (FY2021) al 23,1 % (FY2026) y el BPA de 2,56 a 4,91 USD [1, 5].' },
      { nombre: 'Scott D. Farmer', cargo: 'Presidente ejecutivo del consejo', desde: '1981', participacion_pct: 14.0, trayectoria: 'Hijo del fundador; primer ejecutivo de 2003 a 2021 y presidente desde 2016. Controla el 14,0 % del capital a través de sociedades familiares [1].' },
      { nombre: 'James N. Rozakis', cargo: 'Presidente y director de operaciones', desde: '2026', participacion_pct: 0.08, trayectoria: 'Antes director de operaciones; desde el 1-ago-2026 presidente y COO al separarse los cargos de presidente y primer ejecutivo: posible sucesor [1].' },
      { nombre: 'Scott A. Garula', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.05, trayectoria: 'Vicepresidente ejecutivo y director financiero; primer año completo en FY2026 [1].' },
      { nombre: 'D. Brock Denton', cargo: 'Secretario general y director jurídico', desde: '2021', participacion_pct: 0.02, trayectoria: 'Lleva la operación UniFirst ante la FTC [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Ventas 11.210-11.240 M (marzo de 2026)', real: '11.265 M; BPA 4,91 (ajustado 4,94) [5, 6]', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ventas 12.100-12.250 M y BPA ajustado 5,36-5,50 (julio); subida a 12.150-12.270 M y 5,45-5,54 (septiembre)', real: 'En curso: 1T con BPA ajustado 1,39 frente a 1,35 de consenso [4]', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: 'Guía subida durante el año (patrón habitual)', real: 'BPA 4,40 USD, +16 % [5]', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y formado dentro de la casa: Schneider lleva 37 años en la empresa y Rozakis asciende a presidente y COO en agosto de 2026, lo que ordena la sucesión [1]. La guía es conservadora y se sube durante el año: en FY2027 ya la subieron en septiembre [4]. El control de la familia Farmer (14 %) da estabilidad y horizonte largo, pero concentra el poder en la presidencia ejecutiva y en un comité ejecutivo con el cuñado de Farmer [1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Scott D. Farmer', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '1994', comisiones: 'Ejecutiva' },
      { nombre: 'Todd M. Schneider', cargo: 'Consejero y primer ejecutivo', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Joseph Scaminace', cargo: 'Consejero coordinador', tipo: 'Independiente', desde: '2010', comisiones: 'Ejecutiva (presidente), Nombramientos (presidente)' },
      { nombre: 'Robert E. Coletti', cargo: 'Consejero', tipo: 'Otro externo', desde: '2016', comisiones: 'Ejecutiva' },
      { nombre: 'Beverly K. Carmichael', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Retribuciones, Nombramientos' },
      { nombre: 'Karen L. Carnahan', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Martin Mucci', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Ronald W. Tysoe', cargo: 'Consejero', tipo: 'Independiente', desde: '2008', comisiones: 'Auditoría, Retribuciones, Nombramientos' },
      { nombre: 'Melanie W. Barstad', cargo: 'Consejera (sale en la junta de 2026)', tipo: 'Independiente', desde: null, comisiones: 'Retribuciones, Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 95, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 12.16, fijo: 1.15, variable_corto: 3.07, variable_largo: 7.89, ratio_salario_medio: 160 },
    remuneracion: 'El variable del primer ejecutivo depende del BPA diluido, del crecimiento de las ventas y de objetivos no financieros [1]; no hay métrica de rentabilidad del capital (ROIC) ni de rentabilidad para el accionista, lo que en teoría premia crecer comprando (UniFirst). En la práctica el BPA penaliza compras caras. FY2026: 12,16 M en total, con 7,89 M en acciones y 3,07 M de bonus anual; el BPA ajustado quedó entre el objetivo y el máximo [1]. Ratio de 160 veces el salario mediano (75.766 USD) [1]. Farmer cobra 0,99 M sin variable desde FY2025 [1]. El voto consultivo de 2025 aprobó la remuneración con un 95 % [1]. Política contra coberturas de acciones de consejeros [1].',
    accionistas: [
      { nombre: 'Scott D. Farmer (sociedades familiares Summer Hill)', pct: 14.0, tipo: 'Familia fundadora', variacion: 'Estable' },
      { nombre: 'Vanguard', pct: 7.2, tipo: 'Institucional', variacion: '13G de abril de 2026' },
      { nombre: 'BlackRock', pct: 7.2, tipo: 'Institucional', variacion: '13G/A de enero de 2024' },
      { nombre: 'Autocartera', pct: 48.9, tipo: 'Autocartera (sobre acciones emitidas)', variacion: '381,2 M de 780,7 M emitidas al 31-ago-2026' },
    ],
    insiders: [
      { fecha: '2025-10/2026-10', persona: 'Melanie W. Barstad (consejera)', operacion: 'Venta', acciones: null, importe: 1.86 },
      { fecha: '2025-10/2026-10', persona: 'Ronald W. Tysoe (consejero)', operacion: 'Venta', acciones: null, importe: 1.71 },
    ],
    control_y_defensas: 'Una sola clase de acciones y consejo elegido cada año [1]. La familia Farmer controla el 14,0 % y la presidencia ejecutiva; el comité ejecutivo lo forman el consejero coordinador, Farmer y su cuñado Robert E. Coletti, que no cuenta como independiente [1]. Con el 14 % y la autocartera no hay comprador posible sin la familia, y la operación UniFirst hará entrar como accionista a la familia Croatti (que dice que mantendrá su posición) [1]. Seis de nueve consejeros son independientes; auditoría, retribuciones y nombramientos solo con independientes [1]. Sin operaciones vinculadas relevantes publicadas.',
    alertas: ['Ventas de dos consejeros independientes por 3,6 M USD en 12 meses; ninguna compra en mercado de directivos [2].', 'Cuñado del presidente en el consejo y en el comité ejecutivo [1].'],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto en contra de la remuneración (tres últimas juntas)', tipo: 'Complemento', intentos: '1) proxy 2026 (solo «aproximadamente un 95 % a favor» en 2025); 2) 8-K de resultados de la junta de 2025 (no descargado por tiempo); 3) prensa (sin cifra)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ------------------------------------------------------------------ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (CTAS, ^GSPC, XLI) hasta el 13-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/CTAS/history/' },
  { id: 2, titulo: 'Cintas (CTAS): Analysis (consenso de ventas y BPA FY2027-FY2028, tendencia a 90 días)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CTAS/analysis/' },
  { id: 3, titulo: 'Cintas (CTAS) Stock Forecast & Price Target (20 analistas, objetivo medio, mínimo y máximo)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ctas/forecast/' },
  { id: 4, titulo: 'Cintas (CTAS): Statistics & Valuation (capitalización, posición corta, participación de directivos)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ctas/statistics/' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,21 % el 13-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Análisis de Rentokil Initial del repositorio: comparables a 7-oct-2026 (MarketScreener y Stock Analysis)', editor: 'Análisis propio (repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'informes/rentokil-2026-10-07/datos-v3.json' },
  { id: 8, titulo: 'Yahoo Finance: cierres del 7 y 13-oct-2026 de ROL, ECL, ELIS.PA, ISS.CO, ABM, RTO.L, UNF, VSTS y ARMK', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://query1.finance.yahoo.com/v8/finance/chart/' },
  { id: 9, titulo: 'Vestis Corporation (VSTS): Statistics & Valuation', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/vsts/statistics/' },
  { id: 10, titulo: 'Aramark (ARMK): Statistics & Valuation', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/armk/statistics/' },
  { id: 11, titulo: 'Cintas to acquire UniFirst in $5.5 billion transaction (8-K, anexo 99.1)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-11', url: `${EDGAR}/000095010326003567/dp243132_ex9901.htm` },
  { id: 12, titulo: 'UniFirst Corporation: previsiones financieras (EBITDA FY2026e 321,8 M)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/UNIFIRST-CORPORATION-14749/finances/' },
  { id: 13, titulo: 'Cintas Corporation, Form 10-Q 1T FY2027 (acciones en circulación al 30-sep-2026: 397.075.093)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-07', url: `${EDGAR}/000072325426000047/ctas-20260831.htm` },
  { id: 15, titulo: 'Cintas Corporation Announces Fiscal 2027 First Quarter Results (8-K, anexo 99; guía FY2027)', editor: 'Cintas Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-23', url: `${EDGAR}/000072325426000044/ex992026-8x31.htm` },
  { id: 14, titulo: 'Cintas FY27 Q1: beat (BPA ajustado 1,39 frente a 1,35; ventas 3.014 M frente a 2.984 M de consenso)', editor: 'Tiger Brokers (Dow Jones)', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://www.itiger.com/news/2669433948' },
];
// Comparables del análisis de Rentokil (7-oct) llevados al cierre del 13-oct con la variación de precio [7, 8]
const mover = (e, r) => {
  const ev = e.capitalizacion / (1 - (e.dn_ebitda ?? 0) / e.ev_ebitda_ltm);
  const evN = ev + e.capitalizacion * (r - 1); const k = evN / ev;
  return { ...e, capitalizacion: Math.round(e.capitalizacion * r), ev_ventas: r2(e.ev_ventas * k), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: e.ev_ebitda_ntm == null ? null : r1(e.ev_ebitda_ntm * k), per_ntm: r1(e.per_ntm * r), dn_ebitda: e.dn_ebitda, fcf_yield_pct: r1(e.fcf_yield_pct / r) };
};
const comps = [
  mover({ nombre: 'Rollins', ticker: 'ROL', pais: 'US', capitalizacion: 14850, ev_ventas: 4.22, ev_ebitda_ltm: 18.5, ev_ebitda_ntm: 16.5, per_ntm: 25.3, crecimiento_pct: 8.6, margen_ebitda_pct: 22.7, roic_pct: 23.5, dn_ebitda: 1.2, fcf_yield_pct: 4.4 }, 32.15 / 30.87),
  mover({ nombre: 'Ecolab', ticker: 'ECL', pais: 'US', capitalizacion: 77960, ev_ventas: 5.39, ev_ebitda_ltm: 22.4, ev_ebitda_ntm: 17.9, per_ntm: 31.3, crecimiento_pct: 10, margen_ebitda_pct: 24.1, roic_pct: 13.4, dn_ebitda: 2.3, fcf_yield_pct: 2.4 }, 285.66 / 278.1),
  mover({ nombre: 'Rentokil Initial', ticker: 'RTO', pais: 'GB', capitalizacion: 10064, ev_ventas: 1.95, ev_ebitda_ltm: 9.5, ev_ebitda_ntm: 9.5, per_ntm: 19.7, crecimiento_pct: 3.3, margen_ebitda_pct: 20.4, roic_pct: 7, dn_ebitda: 2.5, fcf_yield_pct: 5.1 }, 306.0 / 297.9),
  mover({ nombre: 'Elis', ticker: 'ELIS', pais: 'FR', capitalizacion: 5116, ev_ventas: 1.86, ev_ebitda_ltm: 5.2, ev_ebitda_ntm: 4.8, per_ntm: 12.3, crecimiento_pct: 4.8, margen_ebitda_pct: 35.4, roic_pct: 6.1, dn_ebitda: 2.6, fcf_yield_pct: 7.9 }, 21.9 / 21.14),
  mover({ nombre: 'ISS', ticker: 'ISS', pais: 'DK', capitalizacion: 6683, ev_ventas: 0.71, ev_ebitda_ltm: 10.5, ev_ebitda_ntm: 8.8, per_ntm: 13.3, crecimiento_pct: 7.1, margen_ebitda_pct: 6.8, roic_pct: 13.5, dn_ebitda: 2.8, fcf_yield_pct: 7.5 }, 298.6 / 287.0),
  mover({ nombre: 'ABM Industries', ticker: 'ABM', pais: 'US', capitalizacion: 2860, ev_ventas: 0.53, ev_ebitda_ltm: 9.3, ev_ebitda_ntm: 7.9, per_ntm: 11.7, crecimiento_pct: 4.5, margen_ebitda_pct: 5.7, roic_pct: 7.3, dn_ebitda: 3.6, fcf_yield_pct: 5.4 }, 50.69 / 48.75),
  { nombre: 'Vestis', ticker: 'VSTS', pais: 'US', capitalizacion: 1850, ev_ventas: 1.16, ev_ebitda_ltm: 12.4, ev_ebitda_ntm: null, per_ntm: 19.4, crecimiento_pct: 0.6, margen_ebitda_pct: 9.3, roic_pct: 5.2, dn_ebitda: 5.1, fcf_yield_pct: 7.4 },
  { nombre: 'Aramark', ticker: 'ARMK', pais: 'US', capitalizacion: 14470, ev_ventas: 1.03, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: null, per_ntm: 20.8, crecimiento_pct: 8.3, margen_ebitda_pct: 7.3, roic_pct: 7.4, dn_ebitda: 4.1, fcf_yield_pct: 3.0 },
];
const ms = (y) => B.cierres_ejercicio.find((c) => c.anio === y)?.precio_cierre ?? null;
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Cintas Corporation', nombre_corto: 'Cintas', ticker: 'CTAS', isin: 'US1729081059', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industriales', industria: 'Servicios comerciales y suministros (uniformes y servicios diversificados)', sede: 'Cincinnati (Ohio)', fundacion: '1968', empleados: 48100, web: 'www.cintas.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 401.2, capitalizacion_publicada: 82290, free_float_pct: 85.5,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 419 M USD/día (3 meses)', proximos_resultados: '2026-12-17',
  },
  consenso: {
    guidance: 'Guía de FY2027 (a mayo de 2027), subida el 23-sep-2026: ventas de 12.150-12.270 M (+7,9-8,9 %; +7,4-8,5 % ajustado por un día laborable más) y BPA ajustado de 5,45-5,54 USD (+10,3-12,1 % sobre 4,94), con intereses netos de unos 103 M y un tipo fiscal del 20,4 % [4 de la nota A: nota de prensa]. Excluye UniFirst, compras futuras y recompras futuras. En julio la guía inicial era de 12.100-12.250 M y 5,36-5,50 USD.',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 12250, ebitda: null, ebit: null, bpa: 5.54, dpa: null, fuente: 'Yahoo Finance, 18 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 13170, ebitda: null, ebit: null, bpa: 6.16, dpa: null, fuente: 'Yahoo Finance, 18 analistas [2]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: null, mantener: null, vender: null, po_medio: 218.31, po_min: 181, po_max: 250 },
    revisiones: 'Al alza y pequeñas: el BPA de FY2027 pasó de 5,44 hace 90 días a 5,54 hoy (+1,8 %) y el de FY2028 de 6,05 a 6,16 (+1,8 %) tras subir la guía en septiembre [2]. El 1T batió en ventas (3.014 frente a 2.984 M) y en BPA ajustado (1,39 frente a 1,35) [14]. Solo hay una fuente gratuita con estimaciones completas (Yahoo); el objetivo de precio y el número de analistas se contrastan con Stock Analysis (20 analistas, consenso «Comprar») [3]. Ni una ni otra incluyen UniFirst.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: 3.15,
    comentario: 'Cintas ha batido al S&P 500 a 5 y 10 años (14,7 % y 22,4 % anual de precio frente a 12,0 % y 13,9 %) pero se queda atrás a 1 y 3 años (9,6 % frente a 17,5 %; 17,2 % frente a 21,7 %) [1]. La caída máxima de 5 años (−27,7 %) fue de junio de 2025 a mayo de 2026: el múltiplo bajó de 46 a 31 veces el BPA siguiente, con la acción en 161 USD el 13-may-2026 por el miedo al empleo y a la FTC [1]. Desde entonces ha recuperado un 28 % con dos trimestres de subida de guía. La posición corta (3,2 % de las acciones) es alta para Cintas: es la pata corta del arbitraje sobre UniFirst [4].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((y) => ({ anio: y, precio_cierre: ms(y), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: '',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay comparables puros: UniFirst cotiza anclada a la oferta (258 USD frente a 314 de valor implícito) y se excluye. Usamos servicios recurrentes en ruta en EE. UU. de alta calidad (Rollins, Ecolab), higiene y textil europeo (Rentokil, Elis), servicios a edificios y externalizados (ISS, ABM, Aramark) y el rival directo en dificultades (Vestis). Las cifras de los seis primeros son las del análisis de Rentokil del 7-oct llevadas al cierre del 13-oct con la variación de precio; Vestis y Aramark, de Stock Analysis del 14-oct, sin EBITDA de los próximos 12 meses.',
    empresas: comps,
    comentario: '',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-03', objetivo: 'UniFirst (uniformes, EE. UU. y Canadá)', comprador: 'Cintas', ev: 5500, ev_ventas: 2.26, ev_ebitda: 17.1, prima_pct: null, excluir: false, comentario: '310 USD por acción (155 en efectivo y 0,7720 acciones de Cintas a 200,77); Cintas publica 8,0 veces el EBITDA de 12 meses con 375 M de sinergias [11]; sin sinergias, 17,1 veces el EBITDA de FY2026e de consenso (321,8 M) [12]. Pendiente de la FTC.' },
      { fecha: '2022-10', objetivo: 'Terminix (control de plagas, EE. UU.)', comprador: 'Rentokil Initial', ev: 6719, ev_ventas: 2.45, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: 'Del análisis de Rentokil del repositorio (4.537 M GBP a 1,105 USD/GBP; múltiplos sobre las cifras de 2021) [7].' },
      { fecha: '2025-05', objetivo: 'France Workwear (textil de Rentokil en Francia)', comprador: 'H.I.G. Capital', ev: 465, ev_ventas: 1.44, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Unos 410 M EUR; 8,2 veces el beneficio operativo ajustado; sin EBITDA publicado [7].' },
    ],
    comentario: '',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA de consenso y BPA de FY2029', tipo: 'Complemento', intentos: '1) Yahoo Finance (solo ventas y BPA de dos años); 2) MarketScreener (página de Cintas no localizada sin registro); 3) Stock Analysis (FY2028-29 de pago)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EBITDA de los próximos 12 meses de Vestis y Aramark', tipo: 'Complemento', intentos: '1) Stock Analysis (solo LTM); 2) MarketScreener (502 y páginas no localizadas); 3) Yahoo (sin EBITDA de consenso)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ------------------------------------------------------------------ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: noticias y análisis de CTAS (RSS, mar-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://seekingalpha.com/api/sa/combined/CTAS.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $CTAS (sep-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/CTAS.json' },
  { id: 3, titulo: 'Stocktwits: flujo de mensajes de $UNF (jun-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-08', url: 'https://api.stocktwits.com/api/2/streams/symbol/UNF.json' },
  { id: 4, titulo: 'UniFirst finishes FTC information request, parties evaluate remedies (CTFN, titular)', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-10-02', url: 'https://seekingalpha.com/symbol/CTAS/news' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'Una docena de análisis desde abril: la mitad ve el negocio excelente pero la acción «totalmente valorada» o «un poco cara» (septiembre), y la otra mitad habla de «comprar la caída» tras el desplome de mayo; uno la presenta como refugio frente a la IA [1].' },
      { plataforma: 'Stocktwits ($CTAS)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Tras los resultados del 23-sep dominan los mensajes de «batir y subir» (crecimiento orgánico 8,9 %, margen récord); los bajistas apuntan a 160 USD y a que «cae con cualquier resultado»; algunos esperan 260 USD si se aprueba UniFirst [2].' },
      { plataforma: 'Stocktwits ($UNF, arbitraje)', fecha: '2026-09', n_comentarios: 25, tono: 'Negativo', resumen: 'Los arbitrajistas ven creciente el riesgo regulatorio: comentan que Bernstein alertó en septiembre de más escrutinio y de la ampliación de la diferencia entre las dos acciones [3].' },
      { plataforma: 'Seeking Alpha (noticias, comentarios)', fecha: '2026-10', n_comentarios: 8, tono: 'Neutro', resumen: 'Titulares de cumplimiento con la FTC y de que las partes evalúan remedios (desinversiones) [1, 4].' },
    ],
    temas: [
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Alto', contraste: '' },
      { tema: 'Aprobación de UniFirst por la FTC', postura: 'Dividida', peso: 'Alto', contraste: '' },
      { tema: 'Crecimiento por volumen y márgenes récord', postura: 'Alcista', peso: 'Medio', contraste: '' },
      { tema: 'Empleo y ciclo (facturan por empleado)', postura: 'Dividida', peso: 'Medio', contraste: '' },
      { tema: 'Refugio frente a la IA', postura: 'Alcista', peso: 'Bajo', contraste: '' },
    ],
    lectura: '',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit y comentarios de lectores', tipo: 'Complemento', intentos: '1) Reddit (bloqueado, 403); 2) búsqueda en la web de hilos de Reddit (sin resultados útiles); 3) se sustituye por Stocktwits de UniFirst (arbitraje)', decision: 'Omitido' }],
};
guarda('E', E);
console.log('Notas A-E escritas');
