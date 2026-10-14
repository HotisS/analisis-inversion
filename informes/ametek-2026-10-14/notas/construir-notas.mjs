// Escribe las notas A-E de AMETEK, Inc. (corte 2026-10-14) a partir de los documentos de notas/docs
// (10-K 2025 y 2022, 10-Q 2T26, notas de resultados 3T24-2T26, 8-K de Indicor, First Aviation, crédito,
// papel comercial y junta, proxy 2026, Form 4, XBRL) y de los informes del repo del 14-oct (Roper, Halma,
// Spirax, Mettler-Toledo) para los comparables. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const SEC = 'https://www.sec.gov/Archives/edgar/data/1037868';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'AMETEK, Form 10-K 2025 (cuentas, segmentos, adquisiciones, deuda, pensiones)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${SEC}/000103786826000016/ame-20251231.htm` },
  { id: 2, titulo: 'AMETEK Announces Record Fourth Quarter and Full Year 2025 Results (nota de resultados y guía 2026)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-03', url: `${SEC}/000103786826000006/ametek8kexhibit99102032026.htm` },
  { id: 3, titulo: 'AMETEK Announces Record Second Quarter 2026 Results and Raises Full Year Guidance', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${SEC}/000103786826000173/ametek8kexhibit99108042026.htm` },
  { id: 4, titulo: 'AMETEK, Form 10-Q 2T26 (deuda, papel comercial, pedidos y cartera, flujos del semestre)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${SEC}/000103786826000175/ame-20260630.htm` },
  { id: 5, titulo: 'AMETEK: hechos XBRL (companyfacts), series anuales y trimestrales', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001037868.json' },
  { id: 6, titulo: 'AMETEK, Form 10-K 2022 (segmentos 2020-2022, adquisiciones de 2022)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-21', url: `${SEC}/000103786823000012/ame-20221231.htm` },
  { id: 7, titulo: 'AMETEK Completes Acquisition of Indicor Instrumentation (8-K, 26-ago-2026)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-26', url: `${SEC}/000103786826000191/exhibit-991indicorinstrume.htm` },
  { id: 8, titulo: 'AMETEK, notas de resultados 3T24, 1T25, 2T25, 3T25 y 1T26', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${SEC}/000103786826000141/ametek8kexhibit99104302026.htm` },
];

const C = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const dpa = { 2021: 0.80, 2022: 0.88, 2023: 1.00, 2024: 1.12, 2025: 1.24 };
const anios = ['2021', '2022', '2023', '2024', '2025'];
const cuenta = anios.map((p) => {
  const r = C[p];
  return { periodo: p, ingresos: r.ingresos, coste_ventas: r.coste_ventas, gastos_generales: r.gastos_generales, ebitda: r.ebitda, amortizaciones: r.amortizaciones, ebit: r.ebit,
    resultado_financiero: r.resultado_financiero, bai: r.bai, impuestos: r.impuestos, minoritarios: 0, beneficio_neto: r.beneficio_neto, gastos_financieros: r.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r.bpa, dpa: dpa[p], dpa_extraordinario: 0, acciones_diluidas: r.acciones_diluidas };
});
// Deuda total = corto (DebtCurrent: papel comercial + vencimientos del año) + largo (LongTermDebtNoncurrent); cuentas.mjs solo cogía el largo.
const deuda = { 2021: 2544.2, 2022: 2385.0, 2023: 3313.3, 2024: 2079.7, 2025: 2283.3 };
const balance = X.balance.historico.filter((r) => r.periodo >= '2021').map((r) => ({
  periodo: r.periodo, activo_total: r.activo_total, activo_corriente: r.activo_corriente, pasivo_corriente: r.pasivo_corriente, pasivo_total: r.pasivo_total,
  fondo_comercio: r.fondo_comercio, intangibles: r.intangibles, inmovilizado_material: r.inmovilizado_material, existencias: r.existencias, clientes: r.clientes,
  proveedores: r.proveedores, activos_contrato: null, pasivos_contrato: r.pasivos_contrato, caja: r.caja, deuda_financiera: deuda[r.periodo],
  arrendamientos: 0, patrimonio_neto: r.patrimonio_neto, minoritarios: 0, reservas: r.reservas }));
const F = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
const flujos = anios.map((p) => ({ periodo: p, flujo_operativo: F[p].flujo_operativo, capex: F[p].capex, pagos_arrendamientos: 0,
  adquisiciones: F[p].adquisiciones, desinversiones: F[p].desinversiones ?? 0, dividendos: F[p].dividendos, recompras: F[p].recompras ?? 0, emision_acciones: F[p].emision_acciones, intereses_en_financiacion: 0 }));

const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 7863.9, ebitda: 2457.0, ebit: 2036.9, beneficio_neto: 1576.3, bpa: 6.84, dpa: 1.30, dpa_extraordinario: 0, fcf: 1825.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Paragon Medical (≈1.900 M USD) y Amplifier Research, consolidadas a final de año: entran en el balance de 2023 y casi nada en su cuenta.' },
      { periodo: '2025', descripcion: 'FARO Technologies (julio, 1.024 M de precio, ≈340 M de ventas) y Kern Microtechnik (enero): medio año de FARO en la cuenta.' },
    ],
    comentario: 'Los ingresos pasan de 5.547 M USD en 2021 a 7.401 M en 2025 (TCAC del 7,5 %) y a 7.864 M en los últimos doce meses a junio de 2026 [1, 3]. Algo menos de la mitad es orgánico: en 2025 el grupo creció un 6,6 %, con el orgánico de EIG en −1 % y el de EMG en +8 % [1]; en el 2T26 el orgánico fue del 7 % en EIG y del 15 % en EMG [4]. El margen EBITDA contable sube de 28,9 % en 2021 a 31,5 % en 2025 y el EBIT del 23,6 % al 25,8 %, por la excelencia operativa y la mezcla, pese a la dilución de las compras (−60 puntos básicos en 2025) y a los costes de integración (25,3 M en 2025, 29,2 M en 2024, 16,2 M en el 2T26) [1, 3]. La amortización de intangibles de compras (277 M en 2025, 3,7 % de las ventas) está dentro del EBIT [1]. El 26-ago-2026 cerró la compra de Indicor Instrumentation (5.000 M en caja, ≈1.100 M de ventas): aportará ≈350 M a las ventas de 2026 y no está en el LTM [7].',
    ajustes: 'Usamos el BPA GAAP diluido. La empresa publica un BPA ajustado que suma la amortización de intangibles de compras después de impuestos y quita costes de compras: 7,43 USD en 2025 frente a 6,40 GAAP (+16 %) [2]. No hay partidas no recurrentes relevantes dentro del EBITDA: los costes de integración se repiten casi todos los años (Paragon en 2024, FARO en 2025, Indicor en 2026) y los dejamos dentro. En 2Q26 la cuenta lleva 10,0 M de comisiones del préstamo puente de Indicor en gastos financieros [3]. En 2020 (fuera de la serie) hubo una plusvalía de 140 M por la venta de Reading Alloys.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1708.6, crecimiento_pct: 5.3, crecimiento_organico_pct: null, ebitda: 536.3, margen_ebitda_pct: 31.4, bpa: 1.47, vs_consenso: 'Superior' },
      { periodo: '4T24', ingresos: 1761.6, crecimiento_pct: 1.8, crecimiento_organico_pct: null, ebitda: 564.9, margen_ebitda_pct: 32.1, bpa: 1.67, vs_consenso: null },
      { periodo: '1T25', ingresos: 1732.0, crecimiento_pct: -0.2, crecimiento_organico_pct: null, ebitda: 561.2, margen_ebitda_pct: 32.4, bpa: 1.52, vs_consenso: null },
      { periodo: '2T25', ingresos: 1778.1, crecimiento_pct: 2.5, crecimiento_organico_pct: null, ebitda: 569.3, margen_ebitda_pct: 32.0, bpa: 1.55, vs_consenso: null },
      { periodo: '3T25', ingresos: 1892.6, crecimiento_pct: 10.8, crecimiento_organico_pct: null, ebitda: 591.5, margen_ebitda_pct: 31.3, bpa: 1.60, vs_consenso: null },
      { periodo: '4T25', ingresos: 1998.4, crecimiento_pct: 13.4, crecimiento_organico_pct: null, ebitda: 611.2, margen_ebitda_pct: 30.6, bpa: 1.73, vs_consenso: null },
      { periodo: '1T26', ingresos: 1928.4, crecimiento_pct: 11.3, crecimiento_organico_pct: null, ebitda: 620.4, margen_ebitda_pct: 32.2, bpa: 1.74, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 2044.4, crecimiento_pct: 15.0, crecimiento_organico_pct: null, ebitda: 634.1, margen_ebitda_pct: 31.0, bpa: 1.77, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En febrero de 2026 la dirección guio unas ventas «de un dígito medio a alto» y un BPA ajustado de 7,87-8,07 USD, con «cartera récord» y «flexibilidad financiera» para comprar [2]. En abril subió el orgánico a «un dígito medio» y el BPA a 7,94-8,14; en mayo anunció la compra de Indicor Instrumentation por 5.000 M (≈14 veces el EBITDA, sinergias del 10-12 % de las ventas, apalancamiento de ≈2,3 veces al cierre) [8, 7]. En agosto el discurso pasó de «recuperación» a «crecimiento secular»: pedidos +28 % en el 2T26 (25 % orgánico, tras +23 % en el 1T26) por semiconductores, aeronáutica comercial, tecnología médica, defensa y automatización, cartera récord de 4.110 M, y la guía de BPA ajustado sube a 8,20-8,30 USD (+10-12 %) con ventas +10 % sin Indicor [3, 4]. Las preguntas se centraron en cuánto de los pedidos es adelanto de compras por aranceles o ciclo de semiconductores y en el precio pagado por Indicor; la dirección no dio el EBITDA exacto ni el reparto del precio entre fondo de comercio e intangibles. Los vs_consenso de 1T26 y 2T26 son «Superior» porque el BPA ajustado batió su propia guía (1,97 y 2,09 frente a 1,85-1,90 y la del 2T); el de 3T24, según la nota de la empresa («beneficio por encima de lo esperado») [8, 3].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 1209.0 },
      { anio: '2027+', importe: 1074.3 },
    ],
    liquidez: 'Caja 495 M a 30-jun-26 y 2.904 M disponibles en la línea de crédito de 3.500 M (vence en 2031); papel comercial de hasta 3.500 M (545 M dispuestos en junio) [4]. Después del balance: préstamo a plazo de 4.000 M (tramos de 1.625 M a 3 años, 1.625 M a 4 y 750 M a 5) y unos 1.000 M de la línea o del papel comercial para pagar Indicor el 26-ago-2026 [4, 7].',
    rating: null,
    coste_deuda_pct: 3.7, vida_media_anios: null,
    otros_pasivos: 'Pensiones con superávit: el estado de financiación de los planes de prestación definida es positivo (+301 M a 31-dic-25, +246 M un año antes) y las aportaciones previstas para 2026 son de 6,5-8,5 M [1]. Arrendamientos operativos (US GAAP): 288 M de pasivo a 2025; su coste ya está en el EBITDA y no van a la deuda. Pagos aplazados de compras: el variable de Kern (8,9 M) [1]. Pasivos por contrato (anticipos de clientes) de 448,8 M, de los que 52,7 M a largo plazo [1]. Los acuerdos de crédito exigen un apalancamiento neto máximo o, más adelante, una cobertura mínima de intereses; con ≈2,3 veces al cierre de Indicor hay holgura [4, 7]. Los costes de 10 M del préstamo puente ya se pagaron en el 2T26 [3].',
    comentario: 'Hasta junio de 2026 el balance era casi de caja neta: deuda de 2.036 M (981 M a corto, sobre todo papel comercial, y 1.056 M a largo) frente a 495 M de caja y un EBITDA de 2.457 M (0,6 veces) [3, 4]. Con Indicor la deuda bruta sube en unos 5.000 M y el apalancamiento a ≈2,3 veces, el mayor de la última década [7]. AMETEK ya lo hizo con Paragon en 2023 (deuda de 3.313 M) y lo bajó a 2.080 M en un año con la caja libre [1, 5]. El circulante comercial ronda el 21-22 % de las ventas (existencias de 1.106 M y clientes de 1.119 M frente a proveedores de 618 M en 2025) [1]. La deuda del XBRL de cuentas.mjs (solo el largo) se ha corregido sumando el corto (DebtCurrent) [5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'AMETEK convierte en caja más de lo que gana: la caja libre (flujo operativo menos capex) fue de 1.672 M en 2025 frente a 1.480 M de beneficio (113 %), y de 1.825 M en los últimos doce meses a junio de 2026 (flujo operativo de 1.960 M menos 135 M de capex) [1, 4]. 2021 y 2022 son años bajos (1.050 M y 1.010 M de caja libre) porque las existencias crecieron con la escasez de componentes [5]. El capex es pequeño (1,6-2,3 % de las ventas): casi todo es de mantenimiento y productividad, la empresa no da el reparto [1]. El uso de la caja es la compra de empresas: 5.678 M en 2021-2025, frente a 1.161 M de dividendos y 1.002 M de recompras [5].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 96, opinion: 'Favorable (sin salvedades) sobre cuentas y control interno de 2025',
    comentario: 'EY es auditor desde 1930: 96 años sin rotación de firma, lo que es una alerta de independencia aunque la ley de EE. UU. solo obliga a rotar al socio; en la junta de 2026 la ratificación tuvo un 9,3 % en contra [1, A].',
    senales: [],
    confianza: 'Alta',
  },
  capital: {
    politica: 'La prioridad declarada es comprar empresas («Strategic Acquisitions» es una de las cuatro estrategias del modelo de crecimiento) y pagar un dividendo creciente; las recompras son oportunistas [1]. En febrero de 2026 subió el dividendo trimestral un 9,7 %, a 0,34 USD [9]. Desde 2021 hasta 2025 completó 15 compras con unas ventas anuales de unos 1.800 M [1]; en 2026 añadió LKC Technologies, First Aviation Services (≈80 M de ventas) e Indicor Instrumentation (≈1.100 M) [4, 7].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Abaco Systems, Alphasense, Magnetrol, EGS, Crank Software y otras', importe: 1959.2, ev_ebitda: null, financiacion: 'Caja y papel comercial', resultado: 'Integradas; sin deterioros del fondo de comercio [1, 6].' },
      { anio: '2022', objetivo: 'Navitar y RTDS Technologies', importe: 429.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en EIG; sin deterioros [6].' },
      { anio: '2023', objetivo: 'Paragon Medical y Amplifier Research', importe: 2237.9, ev_ebitda: null, financiacion: 'Papel comercial y caja', resultado: 'Paragon tuvo un 2024 flojo (costes de integración de 29,2 M, ventas planas) y se recuperó en 2025 con pedidos al alza [1, 8].' },
      { anio: '2025', objetivo: 'FARO Technologies y Kern Microtechnik', importe: 933.2, ev_ebitda: null, financiacion: 'Caja y papel comercial', resultado: 'FARO (≈340 M de ventas) diluye el margen de EIG ≈1 punto en 2026; integración en curso [1, 3].' },
      { anio: '2026', objetivo: 'Indicor Instrumentation (de Indicor, LLC: diez negocios de instrumentación)', importe: 5000, ev_ebitda: 14.0, financiacion: 'Préstamo a plazo de 4.000 M y línea de crédito o papel comercial', resultado: 'Cerrada el 26-ago-2026; ≈50 % de ingresos de posventa; sinergias del 10-12 % de las ventas previstas [7, 10].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Electronic Instruments (EIG)', 'Instrumentos de análisis, prueba y medida, procesos, energía y aeronáutica.', [['2021', 3763.8, 958.2], ['2022', 4229.4, 1089.7], ['2023', 4624.3, 1311.0], ['2024', 4659.9, 1428.4], ['2025', 4919.1, 1447.1]]),
      seg('Electromechanical (EMG)', 'Motores y control de movimiento de precisión, componentes médicos (Paragon), gestión térmica, metales especiales e interconexión; MRO aeronáutico.', [['2021', 1782.8, 437.4], ['2022', 1921.2, 503.6], ['2023', 1972.7, 496.6], ['2024', 2281.3, 456.5], ['2025', 2482.0, 578.9]]),
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 51.8 }, { nombre: 'Asia', peso_pct: 20.1 }, { nombre: 'Unión Europea', peso_pct: 14.7 },
      { nombre: 'Reino Unido', peso_pct: 3.5 }, { nombre: 'Otros', peso_pct: 9.9 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos (M USD)', valor_anterior: '6.810 (2024)', valor_actual: '7.579 (2025); 2.284 en el 2T26', variacion: '+11,3 %; +28,2 % en el 2T26', comentario: '25 % orgánico en el 2T26 [1, 4].' },
      { kpi: 'Cartera de pedidos (M USD)', valor_anterior: '3.403 (dic-24)', valor_actual: '4.110 (jun-26)', variacion: '+20,8 %', comentario: 'Récord; 3.582 M a dic-25 [1, 4].' },
      { kpi: 'Margen operativo ajustado del 2T', valor_anterior: '26,0 %', valor_actual: '26,6 % (núcleo 27,1 %)', variacion: '+60 pb (+110 pb núcleo)', comentario: 'EMG núcleo +290 pb [3].' },
      { kpi: 'Conversión de caja libre sobre beneficio', valor_anterior: '124 % (2024)', valor_actual: '113 % (2025); 111 % en el 2T26', variacion: '−11 puntos', comentario: '[1, 3]' },
      { kpi: 'Ventas internacionales', valor_anterior: '47,4 %', valor_actual: '48,2 % (2025)', variacion: '+0,8 puntos', comentario: 'Exportaciones desde EE. UU. 2.041 M [1].' },
      { kpi: 'I+D e ingeniería (M USD)', valor_anterior: '372 (2024)', valor_actual: '383 (2025)', variacion: '+2,9 %', comentario: '5,2 % de las ventas [1].' },
    ],
    confianza: 'Alta',
  },
  fuentes: [...fA,
    { id: 9, titulo: 'AMETEK raises quarterly cash dividend 10% (8-K, 12-feb-2026)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-12', url: `${SEC}/000103786826000009/exhibit-991divinc2x12x26.htm` },
    { id: 10, titulo: "AMETEK's Strategic Acquisition of Indicor Instrumentation (presentación a inversores, 8-K de 6-may-2026)", editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-06', url: `${SEC}/000103786826000146/projectivy_irdeckfinal.htm` },
  ],
  huecos: [
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) 10-K 2025 y 10-Q 2T26: solo dicen que el margen del crédito depende del rating, sin dar la nota; 2) 8-K del crédito de junio de 2026: igual; 3) no hemos abierto las páginas de S&P o Moody\'s (de pago)', decision: 'Omitido' },
  ],
};
// La señal de auditoría se completa aquí para poder citar la junta (fuente 11 de A).
A.fuentes.push({ id: 11, titulo: 'AMETEK, 8-K de la junta de accionistas del 7-may-2026 (resultados de las votaciones)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-11', url: `${SEC}/000103786826000157/ame-20260507.htm` });
A.calidad.comentario = 'EY es auditor desde 1930: 96 años sin rotación de firma; la ley de EE. UU. solo obliga a rotar al socio, y en la junta de 2026 la ratificación tuvo un 9,3 % de votos en contra [1, 11]. Opinión favorable sobre cuentas y control interno [1]. No vemos cambios de criterio contable relevantes en 2023-2025; la I+D se lleva a gasto (383 M en 2025, dentro del coste de ventas) [1]. La remuneración en acciones es baja (47,8 M en 2025, 0,6 % de las ventas) [5]. Lo que más pesa en la lectura de las cifras es la contabilidad de compras: 7.171 M de fondo de comercio y 4.128 M de intangibles a 2025 (70 % del activo), sin deterioros en la década; la amortización de intangibles (277 M) reduce el BPA GAAP un 16 % frente al ajustado [1, 2]. Los indicadores del motor (Altman, Piotroski y Beneish) se leen con el aviso de que 2023 y 2025 llevan compras a final de año en el balance.';
A.calidad.senales = [
  { senal: 'Auditor durante 96 años', nivel: 'Media', comentario: 'EY desde 1930; 9,3 % en contra de su ratificación en 2026 [1, 11].' },
  { senal: 'Fondo de comercio e intangibles = 70 % del activo', nivel: 'Media', comentario: '11.299 M a 2025, más ≈4.500 M con Indicor; un deterioro no afecta a la caja pero sí al ROIC publicado y a la deuda/patrimonio [1, 7].' },
  { senal: 'Costes de integración casi todos los años', nivel: 'Baja', comentario: '29,2 M (2024), 25,3 M (2025), 16,2 M en el 2T26: los dejamos dentro del EBITDA [1, 3].' },
];
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'AMETEK, Form 10-K 2025 (negocio, mercados finales, competencia, riesgos)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${SEC}/000103786826000016/ame-20251231.htm` },
  { id: 2, titulo: 'Test and Measurement Equipment Market (48,65 mil M USD en 2025; 76,38 en 2032; TCAC 6,4 %)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2026-05', url: 'https://www.marketsandmarkets.com/ResearchInsight/test-measurement-equipment-market-trends.asp' },
  { id: 3, titulo: 'Analytical Instrumentation Market (41,8 mil M USD en 2025; 71,9 en 2035; TCAC 5,7 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/analytical-instrumentation-market' },
  { id: 4, titulo: "AMETEK's Strategic Acquisition of Indicor Instrumentation (mercados finales de AMETEK y de Indicor)", editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-06', url: `${SEC}/000103786826000146/projectivy_irdeckfinal.htm` },
  { id: 5, titulo: 'AMETEK, Form 10-Q 2T26 (pedidos por mercado, aranceles)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${SEC}/000103786826000175/ame-20260630.htm` },
  { id: 6, titulo: 'Stock Analysis: estadísticas de Keysight (KEYS) y Teledyne (TDY) a 14-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/keys/statistics/' },
  { id: 7, titulo: 'Informes del repositorio del 14-oct-2026: Roper, Halma, Spirax y Mettler-Toledo (cifras de cada comparable de sus propias cuentas)', editor: 'Análisis propio (repositorio)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/roper-2026-10-14, informes/halma-2026-10-14, informes/spirax-2026-10-14, informes/mettler-toledo-2026-10-14 (datos.json)' },
  { id: 8, titulo: 'AMETEK Announces Record Second Quarter 2026 Results', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${SEC}/000103786826000173/ametek8kexhibit99108042026.htm` },
];
const B = {
  historia: {
    resumen: 'AMETEK nace en 1930 como American Machine and Metals, un fabricante de maquinaria y metales que cotiza en la bolsa de Nueva York desde hace más de 95 años [1]. En los noventa, ya con el nombre actual, abandona los negocios de bajo margen y en 1997 se separa de su división de agua y climatización; desde entonces se reinventa como fabricante de instrumentos electrónicos y dispositivos electromecánicos en nichos. El «modelo de crecimiento» de cuatro estrategias (excelencia operativa, compras, expansión global y nuevos productos) la ha llevado a comprar más de 100 empresas; entre 2021 y 2025 hizo 15 compras con 1.800 M de ventas y en 2026 la mayor de su historia, Indicor Instrumentation por 5.000 M [1, 4]. David Zapico es primer ejecutivo desde 2016 y presidente desde 2017.',
    hitos: [
      { anio: '1930', hito: 'Fundación como American Machine and Metals; cotiza en la NYSE [1].' },
      { anio: '1997', hito: 'Escisión de la división de agua y climatización; la nueva AMETEK se centra en instrumentos y electromecánica.' },
      { anio: '2016', hito: 'David Zapico, primer ejecutivo (presidente desde 2017).' },
      { anio: '2021', hito: 'Año récord de compras: 1.959 M (Abaco Systems, Alphasense, Magnetrol, entre otras) [1].' },
      { anio: '2023', hito: 'Compra de Paragon Medical (≈1.900 M): entrada fuerte en componentes de tecnología médica [1].' },
      { anio: '2025', hito: 'Compra de FARO Technologies (metrología 3D, ≈1.024 M) [1].' },
      { anio: '2026', hito: 'Compra de Indicor Instrumentation por 5.000 M (≈14 veces el EBITDA), la mayor de su historia; cierra el 26-ago [4].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'AMETEK fabrica instrumentos electrónicos y dispositivos electromecánicos para nichos industriales. EIG (66 % de las ventas de 2025) hace analizadores de procesos y de laboratorio, instrumentos de prueba y medida, de energía y de aeronáutica (Spectro, Zygo, FARO, Gatan, Brookfield, Creaform); EMG (34 %) hace motores y control de movimiento de precisión, componentes médicos (Paragon), sistemas térmicos para aviones, metales especiales y conectores, y da servicios de mantenimiento aeronáutico [1]. Sus mercados finales, tras Indicor: medicina 20 %, aeroespacial y defensa 17 %, energía 10 %, investigación 10 %, semiconductores 4 %, petróleo y gas 6 %, alimentación 4 % e industria general 29 % [4]. Fabrica en 22 países además de EE. UU. y la mitad de sus ventas son internacionales [1].',
    como_gana_dinero: 'Vende equipos caros de fabricar en series cortas, a clientes que pagan por la precisión y la certificación: un analizador o un componente de un avión cuesta poco frente al coste de un fallo. Eso da poder de precios: el margen bruto sube del 34,5 % en 2021 al 36,0 % en 2025 [1]. Una parte relevante es posventa (consumibles, servicio, recambios): en Indicor ronda el 50 % [4]. El otro motor es comprar empresas de nicho (unas 14 veces el EBITDA en Indicor) y subirles el margen 10-12 puntos de ventas con el sistema de gestión de AMETEK (compras, fábricas de bajo coste, cierre de plantas) [4]. Hay apalancamiento operativo: el margen de EMG subió 290 puntos básicos en el 2T26 con un orgánico del 15 % [8].',
    clientes: 'No hay concentración: ningún cliente llega al 10 % de las ventas y la base es muy diversa por mercado y geografía (EE. UU. 52 %, Asia 20 %, UE 15 %) [1]. Los contratos son sobre todo pedidos de corto plazo; la cartera de 4.110 M (junio de 2026) cubre unos seis meses de ventas y 627 M de obligaciones se entregan a más de un año [1, 5]. El poder de precios se ve en 2022-2023: con inflación de costes, el margen bruto subió de 34,9 % a 36,1 % [1]. En 2025 la empresa trasladó los aranceles con «iniciativas de precios dirigidas» sin daño material en el resultado [1].',
  },
  sector: {
    definicion: 'El mercado relevante es el de instrumentos electrónicos y de precisión: equipos de prueba y medida (osciloscopios, analizadores, metrología) e instrumentación analítica (espectrometría, análisis de materiales y de procesos), donde vende EIG. Usamos las dos estimaciones de mercado juntas como perímetro de EIG: 48.650 M USD de prueba y medida según MarketsandMarkets y 41.800 M de instrumentación analítica según Global Market Insights en 2025 [2, 3]; no se solapan del todo, pero AMETEK tiene productos en las dos. Los componentes electromecánicos de EMG (motores, médico, aeronáutica) son nichos sin estadística común y no los sumamos.',
    tamano: '≈90.450 M USD en 2025 (48.650 M de prueba y medida [2] + 41.800 M de instrumentación analítica [3])',
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2025', tamano: 90450 }, { anio: '2026e', tamano: 95877 }, { anio: '2027e', tamano: 101630 }, { anio: '2028e', tamano: 107728 }, { anio: '2030e', tamano: 121042 },
    ],
    tcac_historico_pct: null, tcac_previsto_pct: 6.0, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Construcción de infraestructura eléctrica y centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'La dirección atribuye los pedidos de +28 % del 2T26 al «crecimiento secular» y a la construcción de infraestructura global [8].' },
      { driver: 'Ciclo de semiconductores', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Pedidos fuertes de semiconductores en EIG en el 2T26; es el 4-5 % de las ventas [4, 8].' },
      { driver: 'Aeronáutica comercial y defensa', efecto: '+', horizonte: 'Estructural', evidencia: '17-18 % de las ventas; el 30 % de EMG es aeroespacial; First Aviation amplía el MRO [1, 4].' },
      { driver: 'Tecnología médica', efecto: '+', horizonte: 'Estructural', evidencia: 'Medicina es el 20-21 % de las ventas; Paragon con pedidos al alza en 2025 [4, 8].' },
      { driver: 'Industria general y PMI', efecto: '+/−', horizonte: 'Cíclico', evidencia: '29 % de las ventas; en 2024-1S25 el orgánico fue negativo con la industria débil [1, 4].' },
      { driver: 'Aranceles', efecto: '−', horizonte: 'Cíclico', evidencia: 'Trasladados con precios en 2025; la empresa avisa de que la situación sigue abierta [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Muchos nichos con 2-4 rivales en cada uno; compiten Keysight, Thermo Fisher, Mettler-Toledo, Teledyne, Fortive o Spectris según el producto [1, 3].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes muy diversos, ninguno > 10 %; el coste del instrumento es pequeño frente al del fallo [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Depende de chips, metales y componentes con pocos proveedores; la escasez de 2021-2022 subió existencias y costes [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Certificaciones (aeronáutica, médica), base instalada y marcas de décadas frenan la entrada [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Sensores baratos y software con IA pueden sustituir parte de la medida de gama baja; en la de precisión, poco [1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Los pedidos del grupo crecieron un 23 % en el 1T26 y un 28 % en el 2T26 tras un 2024 y un 1S25 de orgánico negativo o plano: es la salida de la recesión industrial de 2023-2025 [5, 8]. En 2009 las ventas de AMETEK cayeron un 19 %; en 2020, un 12 %, con el margen defendido por recortes; en 2022 crecieron un 11 % con inflación. El riesgo es que parte de los pedidos de 2026 sea acopio ante aranceles o un pico de semiconductores.' },
    regulacion: 'No hay una regulación que fije sus precios. Le afectan los controles a la exportación (EE. UU. y China, sobre todo en semiconductores y defensa), los aranceles de EE. UU. sobre importaciones desde 2025 (trasladados a precios) y la certificación de la FAA y de la FDA en aeronáutica y medicina [1]. Las normas de emisiones y seguridad (agua, aire, petróleo) crean demanda de analizadores [1].',
    tendencias: 'La automatización, la electrificación y los centros de datos piden más medida de precisión; la IA se usa para analizar datos de instrumentos y puede abaratar el software de análisis, pero no sustituye al sensor físico calibrado ni a la certificación. La consolidación sigue: AMETEK, Roper, Fortive o Halma compran nichos; los fondos venden carteras como Indicor. AMETEK gana con las tres tendencias si mantiene la disciplina de precio en las compras [1, 4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.4, posicion: 'Líder en nichos (espectrometría de emisión, metrología de superficies, motores de precisión, analizadores de procesos), con ≈5,4 % del mercado conjunto de prueba y medida e instrumentación analítica (ventas de EIG de 4.919 M sobre ≈90.450 M); en componentes médicos y aeronáuticos de EMG no hay estadística de cuota [1, 2, 3].',
    competidores: [
      { nombre: 'Keysight Technologies', pais: 'EE. UU.', ticker: 'KEYS', ingresos: 6580, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en prueba y medida electrónica; margen EBITDA del 25,8 % (últimos 12 meses) [6].' },
      { nombre: 'Teledyne Technologies', pais: 'EE. UU.', ticker: 'TDY', ingresos: 6370, cuota_pct: null, margen_ebit_pct: null, comentario: 'Instrumentación, imagen digital y defensa; también comprador en serie; margen EBITDA del 25,0 % [6].' },
      { nombre: 'Mettler-Toledo', pais: 'EE. UU./Suiza', ticker: 'MTD', ingresos: 4128, cuota_pct: null, margen_ebit_pct: null, comentario: 'Pesaje y analítica de laboratorio; margen EBITDA del 31 % [7].' },
      { nombre: 'Fortive', pais: 'EE. UU.', ticker: 'FTV', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Instrumentos de precisión (Fluke, Tektronix) tras escindir Ralliant; margen EBITDA del 29,6 % [7].' },
      { nombre: 'Halma', pais: 'Reino Unido', ticker: 'HLMA', ingresos: 3426, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comprador en serie de nichos de seguridad, medio ambiente y salud; margen EBITDA del 25,4 % [7].' },
      { nombre: 'Thermo Fisher Scientific', pais: 'EE. UU.', ticker: 'TMO', ingresos: null, cuota_pct: 21, margen_ebit_pct: null, comentario: 'Líder de la instrumentación analítica con más del 21 % del mercado [3].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta de equipos sin plataforma de usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Instrumentos y componentes certificados dentro de procesos y aviones: cambiar exige recalificar; ≈50 % de posventa en Indicor [1, 4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas de nicho con décadas (Spectro, Zygo, Brookfield) y 383 M de I+D en 2025; margen bruto del 36 % al alza [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Fábricas de bajo coste (China, México, Chequia, Malasia, Serbia) y compras centralizadas: sube 10-12 puntos el margen de lo que compra [1, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nichos pequeños donde caben dos o tres fabricantes; margen operativo del 26 % frente al 25 % de Keysight o Teledyne en EBITDA [6].' },
      ],
    },
    amenazas: 'Las amenazas más probables son tres. Un cambio de ciclo en semiconductores o en la industria general (29 % de las ventas) que convierta en caída los pedidos de 2026. Competidores con más escala en un nicho concreto (Thermo Fisher, Keysight) o compradores rivales que encarezcan las compras. Y la IA aplicada a la medida, que puede abaratar el software de análisis y los instrumentos de gama baja; la parte de precisión calibrada y certificada está menos expuesta. La probabilidad de erosión en cinco años nos parece baja-media.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos ESG que más pesan en las cifras son la seguridad del producto en medicina y aeronáutica (un fallo de certificación cuesta contratos), las emisiones de sus fábricas (energía de metales especiales) y la cadena de suministro en países de riesgo (China, Malasia, México) [1]. Una parte del negocio vende a la transición energética (analizadores de emisiones, red eléctrica): es una oportunidad más que un coste [1, 4].',
    controversias: 'No hemos encontrado sanciones ni litigios relevantes en los últimos tres años en el 10-K ni en los 8-K; el 10-K dice que no hay procedimientos legales materiales [1].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy 2026: no dan calificaciones de terceros; 2) MSCI y Sustainalytics: piden registro; 3) búsqueda en prensa: sin una cifra fechada fiable', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'AMETEK, proxy statement 2026 (DEF 14A): consejo, remuneración, accionistas', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-11', url: `${SEC}/000103786826000062/ame-20260311.htm` },
  { id: 2, titulo: 'AMETEK, 8-K de la junta de 7-may-2026 (votaciones)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-11', url: `${SEC}/000103786826000157/ame-20260507.htm` },
  { id: 3, titulo: 'AMETEK, 8-K de la junta de 7-may-2025 (votaciones)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2025-05-08', url: `${SEC}/000103786825000044/ame-20250507.htm` },
  { id: 4, titulo: 'SEC EDGAR: Form 4 de AMETEK (oct-2025 a oct-2026), resumido con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1037868&type=4' },
  { id: 5, titulo: 'AMETEK, 8-K del nombramiento de Nick L. Stanage como consejero (8-may-2026)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-08', url: `${SEC}/000103786826000151/ame-20260507.htm` },
  { id: 6, titulo: 'AMETEK, 8-K del nuevo interventor (Robert J. Amodei, 7-nov-2025)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-10', url: `${SEC}/000103786825000082/ame-20251107.htm` },
  { id: 7, titulo: 'AMETEK, notas de resultados 3T24 a 2T26 (guías de cada año)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${SEC}/000103786826000173/ametek8kexhibit99108042026.htm` },
];
const cons = (nombre, tipo, desde, comisiones, cargo = 'Consejero') => ({ nombre, cargo, tipo, desde, comisiones });
const Cn = {
  directivos: {
    equipo: [
      { nombre: 'David A. Zapico', cargo: 'Presidente y primer ejecutivo', desde: '2016', participacion_pct: 0.25, trayectoria: '36 años en la empresa; primer ejecutivo desde 2016 y presidente desde 2017. Con él las ventas pasaron de 3.840 M (2016) a 7.401 M (2025) y el BPA GAAP de 2,19 a 6,40 USD [1].' },
      { nombre: 'Dalip M. Puri', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2024', participacion_pct: 0.01, trayectoria: 'Director financiero desde abril de 2024; antes controller de grupo y finanzas operativas; 8 años en AMETEK [1].' },
      { nombre: 'Tony J. Ciampitti', cargo: 'Presidente de Electronic Instruments', desde: '2017', participacion_pct: null, trayectoria: '29 años en la empresa [1].' },
      { nombre: 'David F. Hermance', cargo: 'Presidente de Electromechanical Group', desde: '2022', participacion_pct: 0.03, trayectoria: '34 años en la empresa; EMG pasó de un margen del 20 % en 2024 al 26 % en el 2T26 [1].' },
      { nombre: 'Robert J. Amodei', cargo: 'Vicepresidente sénior y controller', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a Thomas Montgomery (jubilado) desde enero de 2026; carrera interna en auditoría y control [6].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'BPA ajustado 6,77-6,82 USD (oct-24); ventas +5-7 %', real: 'BPA ajustado 6,83 USD; ventas +5,2 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado 7,02-7,18 USD (inicial, reiterada en abril); ventas +bajo dígito', real: 'BPA ajustado 7,43 USD; ventas +6,6 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado 7,87-8,07 USD (feb-26); ventas +medio-alto dígito', real: 'Subida a 7,94-8,14 (abr) y 8,20-8,30 (ago); ventas +10 % sin Indicor', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo muy estable y de casa: el primer ejecutivo lleva 36 años en la empresa y los presidentes de grupo entre 27 y 34. Cumple o supera su guía: en 2024 y 2025 el BPA ajustado quedó en lo alto o por encima del rango y en 2026 la ha subido dos veces [7]. El relevo del director financiero (2024) y del controller (2026) fue interno [1, 6]. No hay un sucesor del primer ejecutivo anunciado; la propia empresa dice que el consejo revisa la sucesión periódicamente [1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('David A. Zapico', 'Ejecutivo', '2016', '—', 'Presidente y primer ejecutivo'),
      cons('Thomas A. Amato', 'Independiente', '2017', 'Remuneración'),
      cons('Anthony J. Conti', 'Independiente', '2010', 'Auditoría; Remuneración; Gobierno'),
      cons('Gretchen W. McClain', 'Independiente', '2014', 'Gobierno'),
      cons('Tod E. Carpenter', 'Independiente', null, '—'),
      cons('Karleen M. Oberton', 'Independiente', null, '—'),
      cons('Suzanne L. Stefany', 'Independiente', null, '—'),
      cons('Dean Seavers', 'Independiente', null, '—'),
      cons('Nick L. Stanage', 'Independiente', '2026', '—'),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.9, voto_remuneracion_contra_pct: 6.0, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 16.46, fijo: 1.40, variable_corto: 3.20, variable_largo: 10.95, ratio_salario_medio: 258 },
    remuneracion: 'El primer ejecutivo cobró 16,46 M USD en 2025: 1,40 M de fijo, 3,20 M de variable anual (2,44 M por fórmula y 0,76 M discrecional), 10,95 M en acciones y opciones y 0,92 M de otros [1]. El variable anual depende de ventas, beneficio operativo y caja. El largo plazo es 55 % en acciones por objetivos (PRSU), 25 % en opciones y 20 % en acciones restringidas; las PRSU dependen a partes iguales del rendimiento sobre el capital tangible (ROTC) y del TSR relativo frente al S&P 500 Industrials [1]. Lo que no nos gusta: el ROTC excluye el fondo de comercio, así que no castiga pagar caro por las compras, que es justo el riesgo del modelo. Hay cláusula de recuperación (clawback). El voto en contra de la remuneración fue del 6,0 % en 2025 y del 5,8 % en 2026 [2, 3]. Ratio frente al empleado medio: 258 veces [1].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.0, tipo: 'Gestora indexada', variacion: 'Dato del 13G/A de feb-24 recogido en el proxy 2026' },
      { nombre: 'BlackRock', pct: 7.5, tipo: 'Gestora', variacion: 'Dato del 13G/A de ene-24 recogido en el proxy 2026' },
      { nombre: 'Consejeros y directivos (16 personas)', pct: 0.5, tipo: 'Internos', variacion: '1,32 M de acciones con opciones ejercitables y diferidos' },
    ],
    insiders: [
      { fecha: '2025-10-31', persona: 'Ronald J. Oscher (director administrativo)', operacion: 'Venta', acciones: 26290, importe: 5.26 },
      { fecha: '2025-11-25', persona: 'David A. Zapico (primer ejecutivo)', operacion: 'Venta', acciones: 88000, importe: 17.28 },
      { fecha: '2025-12-12', persona: 'David A. Zapico (primer ejecutivo)', operacion: 'Venta', acciones: 28390, importe: 5.73 },
      { fecha: '2025-12-15', persona: 'Thomas C. Marecic (presidente de EIG)', operacion: 'Venta', acciones: 14310, importe: 2.89 },
      { fecha: '2025-12-22', persona: 'Thomas M. Montgomery (controller saliente)', operacion: 'Venta', acciones: 6388, importe: 1.31 },
      { fecha: '2026-08-07', persona: 'David F. Hermance (presidente de EMG)', operacion: 'Venta', acciones: 6608, importe: 1.68 },
      { fecha: '2026-08-11', persona: 'Nick L. Stanage (consejero)', operacion: 'Compra', acciones: 4000, importe: 1.02 },
    ],
    control_y_defensas: 'No hay accionista de control: los dos mayores son gestoras (Vanguard 11,0 % y BlackRock 7,5 %) y los internos tienen ≈0,5 % [1]. Una acción, un voto. La defensa principal es el **consejo escalonado**: tres clases que se renuevan por tercios cada año (en 2026 se eligieron Amato, Conti y McClain hasta 2029), lo que dificulta un cambio de control [2]. El presidente es también primer ejecutivo, con un consejero independiente coordinador [1]. El apoyo a los consejeros es más bajo de lo habitual: McClain tuvo un 13,3 % en contra en 2026 y Conti, con 16 años en el consejo y 77 de edad, un 10,2 % [2]. No hay operaciones vinculadas relevantes.',
    alertas: [
      'Consejo escalonado (renovación por tercios): defensa frente a una opa.',
      'Ventas de directivos de 34,8 M USD en 12 meses (23,0 M del primer ejecutivo), sin plan 10b5-1 declarado; una sola compra en mercado (consejero nuevo, 1,02 M) [4].',
      'El incentivo a largo plazo usa el rendimiento sobre capital tangible, que no penaliza el fondo de comercio de las compras [1].',
      'Auditor desde 1930 (EY); 9,3 % en contra de su ratificación en 2026 [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'consejo.desde (cinco consejeros)', tipo: 'Complemento', intentos: '1) proxy 2026, tabla de candidatos: solo da el año de los tres que se votaban; 2) biografías del proxy: sin año de entrada; 3) 8-K de junta 2025: no lo da', decision: 'Omitido' },
  ],
};
guarda('C', Cn);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de AME, ^GSPC y XLI hasta el 14-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/AME/history' },
  { id: 2, titulo: 'MarketScreener: AMETEK, finanzas y estimaciones 2026-2028 (20 analistas)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AMETEK-INC-11635/finances/' },
  { id: 3, titulo: 'MarketBeat: AMETEK, previsiones y acciones de los analistas', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketbeat.com/stocks/NYSE/AME/forecast/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,19 % el 14-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Damodaran, Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Stock Analysis: estadísticas de AMETEK, Keysight y Teledyne a 14-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ame/statistics/' },
  { id: 7, titulo: 'Informes del repositorio del 14-oct-2026 (Roper, Halma, Spirax, Mettler-Toledo): múltiplos de cada comparable con sus cuentas y consenso', editor: 'Análisis propio (repositorio)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/roper-2026-10-14, informes/halma-2026-10-14, informes/spirax-2026-10-14, informes/mettler-toledo-2026-10-14 (datos.json)' },
  { id: 8, titulo: 'BCE, tipos de cambio de referencia del 14-oct-2026 (USD 1,1195 y GBP 0,84385 por EUR)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 9, titulo: "AMETEK's Strategic Acquisition of Indicor Instrumentation (≈14 veces el EBITDA)", editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-06', url: `${SEC}/000103786826000146/projectivy_irdeckfinal.htm` },
  { id: 10, titulo: 'AMETEK, Form 10-Q 2T26 (acciones en circulación a 28-jul-2026: 229.261.244)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${SEC}/000103786826000175/ame-20260630.htm` },
  { id: 11, titulo: 'AMETEK, Form 10-K 2025 y 2022 (precios de compra de FARO, Kern, Navitar y RTDS)', editor: 'AMETEK / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${SEC}/000103786826000016/ame-20251231.htm` },
];
const B1 = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const cierre = Object.fromEntries(B1.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const usdgbp = 1.1195 / 0.84385; // USD por GBP
const D = {
  identificacion: {
    nombre: 'AMETEK, Inc.', nombre_corto: 'AMETEK', ticker: 'AME', isin: 'US0311001004', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Equipos e instrumentos electrónicos', sede: 'Berwyn (Pensilvania)', fundacion: '1930', empleados: 22500, web: 'www.ametek.com',
    precio: B1.identificacion.precio, fecha_precio: B1.identificacion.fecha_precio, acciones: 229.9, capitalizacion_publicada: 56530, free_float_pct: 99.6,
    max_52s: B1.identificacion.max_52s, min_52s: B1.identificacion.min_52s, volumen_medio_diario: '≈ 321 M USD/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía de 2026 (4-ago-2026, antes de cerrar Indicor): ventas +≈10 % frente a 2025 y BPA ajustado de 8,20-8,30 USD (+10-12 %), equivalente a 7,19-7,29 USD GAAP; 3T26: ventas +«alto dígito» y BPA ajustado de 2,08-2,10 [A3]. El 26-ago la empresa añadió que Indicor aportará ≈350 M de ventas en 2026 y será «ligeramente positiva» para el BPA ajustado [A7]. No hay plan a medio plazo con cifras: el objetivo declarado es crecer el BPA a doble dígito a lo largo del ciclo.',
    estimaciones: [
      { periodo: '2026e', ingresos: 8434, ebitda: 2669, ebit: 2246, bpa: 7.35, dpa: 1.36, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 9898, ebitda: 3171, ebit: 2675, bpa: 8.38, dpa: 1.48, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 10283, ebitda: 3289, ebit: 2871, bpa: 9.58, dpa: 1.61, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: 14, mantener: 5, vender: 0, po_medio: 274.41, po_min: 230, po_max: 318 },
    revisiones: 'Las estimaciones y los objetivos suben desde agosto: tras el 2T26 subieron sus objetivos RBC (260→291), KeyBanc (260→295), Mizuho (270→285), BMO (262→282), Truist (303→316) y Redburn (265→275); en septiembre-octubre, Deutsche Bank (288→318), BNP Paribas Exane (280→290), Baird (275→280), Morgan Stanley (245→275) y Citi (261→263) [3]. El objetivo medio es de 282,06 USD en MarketScreener (20 analistas) y de 274,41 USD en MarketBeat (19) [2, 3]. El BPA del consenso (GAAP en MarketScreener) es 7,35 USD en 2026 y 8,38 en 2027 [2].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.4,
    confianza: 'Media',
  },
  bolsa: {
    ...B1.bolsa,
    posicion_corta_pct: 1.67,
    comentario: 'AMETEK sube un 32,8 % en un año frente al 16,2 % del S&P 500 y el 9,0 % del sector industrial (XLI), y está a un 5,5 % de su máximo de 52 semanas (261,16 USD, 13-ago-2026) [1]. En tres años va por detrás del índice (18,4 % anual frente a 21,3 %): 2023-2024 fueron años de orgánico plano con la industria en recesión. La subida de 2026 la explican los pedidos (+23 % en el 1T y +28 % en el 2T) y la subida de la guía [A3]; la compra de Indicor en mayo no la frenó. Beta mensual de 0,96 a 5 años y volatilidad del 23,5 % [1]. Posición corta del 1,67 % del capital flotante [6].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierre[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el precio de cierre de cada año y el BPA GAAP del mismo año, AMETEK cotizó a 34,6 veces en 2021, 27,9 en 2022, 29,1 en 2023, 30,4 en 2024 y 32,1 en 2025 [1, A5]; hoy, a 36,1 veces el BPA de los últimos 12 meses. Con el PER adelantado (cierre del año ÷ BPA del año siguiente) la mediana de 2021-2025 es de 28,2 veces y hoy cotiza a 31 veces nuestro BPA de 2027. La prima frente a su historia (≈10 %) refleja el giro de los pedidos y la tasa libre no la justifica: el bono a 10 años está en el 5,2 % frente al 1,5-4 % de 2021-2024.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Siete fabricantes de instrumentos y tecnología industrial de nicho, la mitad compradores en serie como AMETEK: Roper, Halma y Teledyne (compradores en serie), Fortive y Keysight (prueba y medida), Mettler-Toledo y Spirax (instrumentación de procesos y laboratorio). Cifras de Roper, Halma, Spirax, Mettler-Toledo y Fortive de los informes del repositorio del 14-oct-2026 (precio de cierre del 13 o 14-oct) [7]; Keysight y Teledyne de Stock Analysis del 14-oct, cuyo PER adelantado usa el BPA ajustado del consenso (más alto que el GAAP: su PER GAAP sería mayor) [6]. Halma y Spirax pasadas a USD con el BCE (1,3267 USD/GBP) [8]. Dejamos fuera a Thermo Fisher y Danaher (ciencias de la vida, diez veces más grandes).',
    empresas: [
      { nombre: 'Roper Technologies', ticker: 'ROP', pais: 'US', capitalizacion: 36730, ev_ventas: 5.57, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: 13.0, per_ntm: 18.3, crecimiento_pct: 8.4, margen_ebitda_pct: 39.1, roic_pct: 6.4, dn_ebitda: 3.4, fcf_yield_pct: 7.1 },
      { nombre: 'Halma', ticker: 'HLMA', pais: 'GB', capitalizacion: Math.round(13737 * usdgbp), ev_ventas: 5.66, ev_ebitda_ltm: 22.3, ev_ebitda_ntm: 19.2, per_ntm: 29.9, crecimiento_pct: null, margen_ebitda_pct: 25.4, roic_pct: 13.0, dn_ebitda: 1.3, fcf_yield_pct: 3.0 },
      { nombre: 'Spirax Group', ticker: 'SPX', pais: 'GB', capitalizacion: Math.round(5235 * usdgbp), ev_ventas: 3.35, ev_ebitda_ltm: 13.9, ev_ebitda_ntm: null, per_ntm: 22.2, crecimiento_pct: null, margen_ebitda_pct: 24.1, roic_pct: 12.3, dn_ebitda: 1.5, fcf_yield_pct: 4.4 },
      { nombre: 'Mettler-Toledo', ticker: 'MTD', pais: 'US', capitalizacion: 32065, ev_ventas: 8.26, ev_ebitda_ltm: 26.7, ev_ebitda_ntm: null, per_ntm: 31.6, crecimiento_pct: 2.5, margen_ebitda_pct: 31.0, roic_pct: 47.6, dn_ebitda: 1.6, fcf_yield_pct: 2.6 },
      { nombre: 'Fortive', ticker: 'FTV', pais: 'US', capitalizacion: 17746, ev_ventas: null, ev_ebitda_ltm: 16.7, ev_ebitda_ntm: 15.1, per_ntm: 26.6, crecimiento_pct: 4.5, margen_ebitda_pct: 29.6, roic_pct: null, dn_ebitda: 2.3, fcf_yield_pct: 5.5 },
      { nombre: 'Keysight Technologies', ticker: 'KEYS', pais: 'US', capitalizacion: 60870, ev_ventas: 9.27, ev_ebitda_ltm: 35.9, ev_ebitda_ntm: null, per_ntm: 26.5, crecimiento_pct: null, margen_ebitda_pct: 25.8, roic_pct: 17.6, dn_ebitda: 0.1, fcf_yield_pct: 2.4 },
      { nombre: 'Teledyne Technologies', ticker: 'TDY', pais: 'US', capitalizacion: 28230, ev_ventas: 4.68, ev_ebitda_ltm: 18.7, ev_ebitda_ntm: null, per_ntm: 27.9, crecimiento_pct: null, margen_ebitda_pct: 25.0, roic_pct: 8.1, dn_ebitda: 1.1, fcf_yield_pct: 4.1 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'Indicor Instrumentation (diez negocios de instrumentación)', comprador: 'AMETEK', ev: 5000, ev_ventas: 4.55, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: 'Ventas ≈1.100 M; ≈14 veces el EBITDA según la empresa [9].' },
      { fecha: '2025-07', objetivo: 'FARO Technologies', comprador: 'AMETEK', ev: 1024, ev_ventas: 3.01, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio total 1.023,7 M con la deuda convertible; ventas ≈340 M [11].' },
      { fecha: '2022-10', objetivo: 'Navitar y RTDS Technologies', comprador: 'AMETEK', ev: 430, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago conjunto de 429,7 M; sin múltiplo publicado [11].' },
    ],
    comentario: 'AMETEK paga entre 3 y 4,6 veces las ventas y unas 14 veces el EBITDA por negocios de instrumentación de nicho [9, 11]; en bolsa cotiza a ≈23 veces su EBITDA de los últimos 12 meses. Esa diferencia es la base de su modelo: compra a 14 veces, sube el margen y el mercado le paga 20 o más. Como objetivo de opa es improbable por tamaño (≈57.000 M de capitalización) y por el consejo escalonado. Con solo una operación con múltiplo publicado no usamos las transacciones en la valoración.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones (5-10 con múltiplo)', tipo: 'Complemento', intentos: '1) 10-K 2022-2025: AMETEK no publica el múltiplo de sus compras salvo Indicor; 2) notas de prensa de FARO, Paragon y Virtek: sin EBITDA; 3) transacciones de otros (Spectris-KKR, Emerson-AspenTech) no son del mismo perímetro', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: feed de artículos y noticias de AME (feb-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/AME.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $AME (ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/AME.json' },
  { id: 3, titulo: 'Ametek: The Quiet Control Layer Behind The Next Industrial Investment Cycle', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-09-01', url: 'https://seekingalpha.com/symbol/AME/analysis' },
  { id: 4, titulo: 'Ametek: Continued Additions To Its M&A Track Record', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-07-01', url: 'https://seekingalpha.com/symbol/AME/analysis' },
  { id: 5, titulo: 'MarketBeat: noticias y comentarios de AME (acciones de analistas jul-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://www.marketbeat.com/stocks/NYSE/AME/forecast/' },
];
const E = {
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($AME)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes casi todos técnicos y alcistas: nuevo máximo de 52 semanas en agosto, opciones de compra a corto plazo y vigilancia de la media de 10 y 50 sesiones; alguno vende al perder soportes y otro ve la valoración «rica» como freno [2].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-09', n_comentarios: 20, tono: 'Positivo', resumen: 'El artículo de septiembre presenta a AMETEK como la «capa de control» del nuevo ciclo de inversión industrial; el de julio valora bien su historial de compras [3, 4].' },
      { plataforma: 'Seeking Alpha (artículos y noticias)', fecha: '2026-08', n_comentarios: 15, tono: 'Dividido', resumen: 'Tras el 2T26 dominan los titulares de batida y subida de guía; los de abril y febrero hablaban de «negocio muy bien gestionado y valorado en consecuencia» y de «cerca de una rebaja por valoración» [1].' },
      { plataforma: 'MarketBeat (noticias y comentarios)', fecha: '2026-10', n_comentarios: 15, tono: 'Positivo', resumen: 'Cadena de subidas de objetivo en agosto-octubre; un comentario en Stocktwits recoge la misma idea: «muchas mejoras de analistas, falta ver si las ventas lo justifican» [5, 2].' },
    ],
    temas: [
      { tema: 'Pedidos récord y ciclo de inversión industrial', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo apoyan: pedidos +28 % en el 2T26 (25 % orgánico) y cartera de 4.110 M; falta saber cuánto es acopio por aranceles o pico de semiconductores [A4].' },
      { tema: 'Valoración exigente', postura: 'Dividida', peso: 'Medio', contraste: 'Cierto: 36 veces el BPA de los últimos 12 meses y 31 veces nuestro BPA de 2027, por encima de su mediana de 28 veces.' },
      { tema: 'Compra de Indicor y disciplina en las compras', postura: 'Alcista', peso: 'Medio', contraste: 'El precio (≈14 veces el EBITDA) es el habitual de AMETEK; el ROIC publicado baja y la deuda sube a ≈2,3 veces el EBITDA.' },
      { tema: 'Análisis técnico (medias móviles)', postura: 'Dividida', peso: 'Medio', contraste: 'No entra en la valoración.' },
    ],
    lectura: 'El sentimiento de los particulares es positivo y mejora desde la primavera, al ritmo de los pedidos y de las subidas de objetivo de los analistas. No es euforia: la objeción que más se repite es la misma que la nuestra, la valoración. Nadie en los foros discute el riesgo de que los pedidos de 2026 sean un adelanto, ni el ROIC tras Indicor; tampoco aparece la IA como amenaza para AMETEK, sino como motor de demanda (centros de datos, semiconductores). No cambia la tesis.',
    confianza: 'Media',
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas');
