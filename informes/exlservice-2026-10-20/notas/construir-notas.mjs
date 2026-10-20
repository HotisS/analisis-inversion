// Escribe las notas A-E de ExlService (EXLS, corte 2026-10-20) a partir de los documentos de notas/docs (EDGAR y
// prensa), del XBRL de la SEC (cuentas-xbrl.json y docs/companyfacts.json), de bolsa.json, de yahoo-datos.json (Yahoo
// quoteSummary del 20-oct-2026, 12:33 UTC; sesión del 19-oct cerrada) y de form4.json. Cada nota cita solo con [n] de su
// propia lista de fuentes. Ejecutar: node informes/exlservice-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const F4 = lee('form4.json');
const ED = 'https://www.sec.gov/Archives/edgar/data/1297989';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cuentas, segmentos, clientes, divisas, deuda, impuestos, riesgos)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${ED}/000129798926000008/exls-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, deuda, recompras, iMerit, contingencias fiscales en la India', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000129798926000023/exls-20260630.htm` },
  { id: 3, titulo: 'EXL Reports 2026 Second Quarter Results (cuenta, segmentos, conciliación ajustada, guía 2026)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000129798926000021/exlq226pressrelease.htm` },
  { id: 4, titulo: 'EXL Reports 2026 First Quarter Results', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-28', url: `${ED}/000129798926000014/exlq126pressrelease.htm` },
  { id: 5, titulo: 'EXL Reports 2025 Fourth Quarter and Full Year Results (BPA ajustado 1,95 USD; guía 2026)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-24', url: `${ED}/000129798926000006/exlq42025pressrelease.htm` },
  { id: 6, titulo: 'EXL Reports 2025 Third Quarter Results', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-28', url: `${ED}/000129798925000021/exlq325pressrelease.htm` },
  { id: 7, titulo: 'XBRL company facts de ExlService (series anuales y trimestrales: ingresos, costes, pagos en acciones, amortización de intangibles, inversiones a corto)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001297989.json' },
  { id: 8, titulo: 'Notas de resultados del 4T 2021, 2022, 2023 y 2024 (BPA ajustado y guía de cada año)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-25', url: `${ED}/000129798925000001/exlq42024pressrelease.htm` },
  { id: 9, titulo: 'Form 8-K: recompra acelerada de 125 M USD con Morgan Stanley', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-18', url: `${ED}/000110465926030831/tm269205d1_8k.htm` },
  { id: 10, titulo: 'Form 8-K y nota: nuevo crédito sindicado de 1.000 M USD (préstamo de 400 M y revolving de 600 M, vencimiento 2031)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-18', url: `${ED}/000110465926098380/tm2623504d1_8k.htm` },
  { id: 11, titulo: 'EXL to acquire iMerit (hasta 310 M USD: 170 M al cierre y hasta 140 M de incentivos y pagos aplazados)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-06-24', url: `${ED}/000110465926077069/tm2618647d1_ex99-1.htm` },
  { id: 12, titulo: 'EXL Announces Share Repurchase of 1,551,970 Shares (compra a Orogen Echo)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-12-15', url: `${ED}/000110465925121104/tm2533368d1_ex99-1.htm` },
  { id: 13, titulo: 'ExlService Q2 2026 earnings call (transcripción parcial: ingresos de datos e IA, operaciones digitales, márgenes, guía, preguntas de analistas)', editor: 'StockAlarm (transcripción)', tipo: 'Datos de mercado', fecha: '2026-07-29', url: 'https://pro.stockalarm.io/quote/EXLS/earnings-calls' },
  { id: 14, titulo: 'ExlService Investor Day Spotlights AI Push, Double-Digit Growth Goals', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-05-16', url: 'https://finance.yahoo.com/sectors/technology/articles/exlservice-investor-day-spotlights-ai-230310198.html' },
  { id: 15, titulo: 'ExlService Non-GAAP EPS beats (2T26 +0,04 USD; 1T26 +0,04; 4T25 +0,03) — titulares', editor: 'Seeking Alpha (RSS)', tipo: 'Datos de mercado', fecha: '2026-07-28', url: 'https://seekingalpha.com/api/sa/combined/EXLS.xml' },
];

// Cuenta: XBRL; 2016-2020 sin reexpresar el desdoblamiento 5×1 de 2023 → BPA ÷ 5 y acciones × 5 [A1, A7].
const costeVentas = { 2016: 447.7, 2017: 495.1, 2018: 584.9, 2019: 655.5, 2020: 623.9, 2021: 690.9, 2022: 896.6, 2023: 1022.9, 2024: 1147.4, 2025: 1286.6 };
const cuenta = X.financieros.cuenta.map((c) => {
  const a = +c.periodo;
  const split = a <= 2020;
  return {
    periodo: c.periodo, ingresos: c.ingresos, coste_ventas: costeVentas[a], gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit,
    resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: a === 2024 ? 3.1 : null,
    bpa: split ? r2(c.bpa / 5) : c.bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: split ? r1(c.acciones_diluidas * 5) : c.acciones_diluidas,
  };
}).filter((c) => +c.periodo >= 2016);

// Balance: caja = efectivo + inversiones a corto (líquidas); arrendamientos = solo financieros (US GAAP: los operativos ya
// están en el EBITDA y no van a la deuda) [A1, A7].
const invCorto = { 2016: 13.5, 2017: 178.5, 2018: 184.5, 2019: 202.2, 2020: 184.3, 2021: 179.4, 2022: 179.0, 2023: 153.9, 2024: 187.2, 2025: 182.0 };
const arrFin = { 2016: 0, 2017: 0, 2018: 0, 2019: 0.7, 2020: 0.5, 2021: 0.4, 2022: 0.5, 2023: 0.8, 2024: 1.8, 2025: 2.2 };
const balance = X.balance.historico.map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
  fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: 0, clientes: b.clientes, proveedores: b.proveedores,
  activos_contrato: null, pasivos_contrato: null, caja: r1(b.caja + invCorto[+b.periodo]), deuda_financiera: b.deuda_financiera, arrendamientos: arrFin[+b.periodo],
  patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
})).filter((b) => +b.periodo >= 2016);

const flujos = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos, adquisiciones: f.adquisiciones,
  desinversiones: f.desinversiones ?? 0, dividendos: 0, recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0,
})).filter((f) => +f.periodo >= 2016);

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2237.3, ebitda: 393.5, ebit: 333.3, beneficio_neto: 250.0, bpa: 1.58, dpa: 0, dpa_extraordinario: 0, fcf: 275.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1.9 },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 958 M USD en 2020 a 2.088 M en 2025 (+16,9 % anual compuesto), con un crecimiento orgánico que la empresa sitúa en el 10-11 % en 2025 (clientes existentes +10,6 puntos; clientes nuevos y la compra de ITI Data +3,0) [A1]. El año más fuerte fue 2022 (+25,8 %, con Clairvoyant). En el primer semestre de 2026 los ingresos crecen un 14,7 % (2T26 +15,6 %, +15,9 % a divisa constante) [A3]. El margen bruto (sin amortizaciones) sube de 37,6 % en 2024 a 38,4 % en 2025 [A1] por la mezcla hacia datos e IA, que ya es el 61 % de las ventas y crece un 30 % mientras las operaciones digitales caen un 1,5 % [A13]. El margen operativo GAAP pasa del 11,5 % de 2020 al 15,0 % de 2025; en el 2T26 baja al 14,7 % por la inversión comercial (gastos comerciales y generales +170 pb, hasta el 20,9 % de las ventas) y por los pagos en acciones (24,6 M en el trimestre, 4,1 % de las ventas) [A3, A13]. Ningún año del periodo trae deterioros ni cambios de perímetro grandes; las compras (SCIO en 2018, Clairvoyant en 2021, ITI Data en 2024) son pequeñas frente a las ventas.',
    ajustes: 'La empresa publica un BPA ajustado que excluye los pagos en acciones (79,5 M USD en 2025; 3,8 % de las ventas), la amortización de intangibles comprados (13,1 M), los costes de compras y la amortización del coste del pasado por los nuevos códigos laborales de la India [A3, A5]. En 2025 el ajustado fue 1,95 USD frente a 1,54 publicado [A5]. Este informe usa una tercera medida, el «BPA con pagos en acciones»: el publicado más la amortización de intangibles comprados y los costes de compras, netos de impuestos (2025: 1,61 USD), porque los pagos en acciones son un coste recurrente y creciente (19,8 M en 2016, 79,5 M en 2025) [A7]. En 2024 hubo 3,1 M de reestructuración y litigios no recurrentes dentro del EBITDA [A1]; en el LTM, 1,9 M de costes de la compra de iMerit [A3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 472.1, crecimiento_pct: 14.9, crecimiento_organico_pct: null, ebitda: 104.4, margen_ebitda_pct: 22.1, bpa: 0.44, vs_consenso: null },
      { periodo: '4T24', ingresos: 481.4, crecimiento_pct: 16.3, crecimiento_organico_pct: null, ebitda: 102.9, margen_ebitda_pct: 21.4, bpa: 0.44, vs_consenso: null },
      { periodo: '1T25', ingresos: 501.0, crecimiento_pct: 14.8, crecimiento_organico_pct: null, ebitda: 111.2, margen_ebitda_pct: 22.2, bpa: 0.48, vs_consenso: null },
      { periodo: '2T25', ingresos: 514.5, crecimiento_pct: 14.7, crecimiento_organico_pct: null, ebitda: 111.6, margen_ebitda_pct: 21.7, bpa: 0.49, vs_consenso: null },
      { periodo: '3T25', ingresos: 529.6, crecimiento_pct: 12.2, crecimiento_organico_pct: 12.3, ebitda: 114.4, margen_ebitda_pct: 21.6, bpa: 0.48, vs_consenso: null },
      { periodo: '4T25', ingresos: 542.6, crecimiento_pct: 12.7, crecimiento_organico_pct: 12.6, ebitda: 115.1, margen_ebitda_pct: 21.2, bpa: 0.50, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 570.4, crecimiento_pct: 13.8, crecimiento_organico_pct: 13.4, ebitda: 127.9, margen_ebitda_pct: 22.4, bpa: 0.58, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 594.8, crecimiento_pct: 15.6, crecimiento_organico_pct: 15.9, ebitda: 128.4, margen_ebitda_pct: 21.6, bpa: 0.59, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'EBITDA y BPA de la tabla son los AJUSTADOS de la empresa (sin pagos en acciones) [A3, A4, A5, A6]; el crecimiento orgánico es a divisa constante (sin compras relevantes en el periodo salvo ITI Data, desde agosto de 2024). Frente al consenso, el BPA ajustado batió en 0,03 USD en el 4T25 y en 0,04 en el 1T26 y el 2T26 [A15]. En la conferencia del 2T26 (29-jul-2026) el discurso cambió de «resistimos a la IA» a «la IA acelera»: los ingresos de datos e IA aceleraron cuatro trimestres seguidos (18 %, 21 %, 28 % y 30 %) y ya son el 61 % del total, mientras las operaciones digitales caen un 1,5 %, una caída que la dirección llama «por diseño» porque el trabajo con IA incorporada pasa a la otra categoría; las operaciones en total crecen un 10 % [A13]. Subió la guía de 2026 a 2.390-2.415 M USD (+13-14 % orgánico) y el BPA ajustado a 2,25-2,29 USD, con iMerit restando 0,01 [A3, A13]. Los analistas preguntaron por la durabilidad del crecimiento por encima del 20 % en datos e IA (TD Cowen), por si los clientes externalizan menos por dudas sobre el retorno de la IA (JPMorgan) y por qué la guía implica frenar en el segundo semestre (Stifel): la dirección habló de macro «inestable», de la integración de iMerit y de prudencia, sin cuantificar la desaceleración. Tampoco cuantificó cuánto ingreso de operaciones canibaliza la IA ni el peso de la facturación por persona (solo que más del 30 % de los ingresos es por resultados, dato del día del inversor) [A14].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 2.5 }, { anio: '2027', importe: 378.8 }],
    liquidez: 'Caja 126,7 M + inversiones a corto 157,1 M + a largo 6,4 M a 30-jun-2026 [A2]; desde el 18-ago-2026, crédito de 1.000 M (préstamo de 400 M y revolving de 600 M) hasta agosto de 2031, que refinancia los 381 M dispuestos y paga los 170 M de iMerit [A10]',
    rating: 'Sin rating',
    coste_deuda_pct: 5.0,
    vida_media_anios: null,
    otros_pasivos: 'Deuda bancaria garantizada (revolving 290 M y préstamo 91 M a 30-jun-2026) con covenants cumplidos [A2]; refinanciada el 18-ago-2026 con vencimiento en 2031 [A10]. Compra de iMerit: 170 M en caja al cierre (3-ago-2026) y hasta 140 M en incentivos y pagos aplazados en dos años según hitos [A2, A11]. Litigios fiscales en la India por precios de transferencia: 44,4 M reclamados (7,4 M ya depositados o avalados), sin provisión porque la empresa cree que ganará [A2]; además 4,9 M de IVA e impuesto de servicios y 5,2 M de devoluciones de GST rechazadas. Plan de indemnización por cese (gratuity) de la India, parcialmente dotado. Coberturas de divisa por 1.134,8 M de nominal a diciembre de 2025, con una pérdida latente de 19,3 M [A1]. Arrendamientos operativos de 105 M (US GAAP: su coste ya está en el EBITDA).',
    comentario: 'La deuda neta era casi nula hasta 2025 (deuda 299 M frente a 328 M de caja e inversiones a corto) [A1]; en 2026 sube porque la empresa compra acciones con deuda: 179 M de recompras en el semestre, con la recompra acelerada de 125 M financiada en parte con el revolving [A2, A9], y a 30-jun-2026 la deuda neta es de 91 M (97 M según la dirección) [A13]. Tras iMerit (170 M) queda en torno a 0,7 veces el EBITDA. El circulante sube: los clientes pasan de 343 M a 434 M en seis meses (73 días de ventas frente a 60), en parte estacional por la facturación del semestre y en parte por iMerit no (aún no consolidado), lo que explica que el flujo operativo del semestre caiga a 90 M frente a 113 M un año antes [A2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es buena y mejora: el flujo operativo pasa de 203 M (2020) a 351 M (2025), y el flujo libre (operativo menos inversión) de 161 M a 298 M, el 119 % del beneficio neto de 2025 [A1]. La inversión es baja y casi toda de mantenimiento y equipos para la plantilla: 52,6 M en 2025 (2,5 % de las ventas) y una guía de 58-62 M para 2026 [A2]; estimación propia: un 2,0-2,2 % de las ventas es mantenimiento y el resto, desarrollo de plataformas de IA. El uso de la caja está sesgado a recompras: 329 M en 2025 y 186 M en el primer semestre de 2026, más que el flujo libre, sin dividendo [A1, A2]. El primer semestre de 2026 es flojo en caja (operativo 90 M) por el aumento de clientes; la empresa no ha cambiado su guía de caja [A13].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: 8, opinion: 'Favorable',
    comentario: 'Deloitte audita desde 2018 [A1]. Lo más relevante es la remuneración en acciones: 79,5 M USD en 2025, el 3,8 % de las ventas y el 32 % del beneficio neto, y sube al 4,1 % en el primer semestre de 2026 (46,7 M) [A2, A7]. El BPA ajustado la excluye, de modo que el múltiplo «oficial» (15,3 veces el BPA ajustado de 2027 del consenso) es un 20-25 % más bajo que el que paga el accionista en beneficio con ese coste; las recompras (329 M en 2025) sirven en gran parte para compensar la dilución. El reconocimiento de ingresos es lineal en contratos por tiempo, por transacción o por persona; en los de precio fijo se usa el grado de avance [A1]. No hay deterioros del fondo de comercio en el periodo. Las disputas fiscales de la India (44,4 M) no están provisionadas [A2]. Los clientes crecen más que las ventas en el semestre (73 días de ventas). Lectura de los indicadores del motor: un Altman alto refleja poca deuda y mucho beneficio retenido; el Piotroski y el Beneish se leen en el anexo y no apuntan a manipulación en un negocio de servicios sin existencias.',
    senales: [
      { senal: 'Pagos en acciones altos y crecientes', nivel: 'Media', comentario: '79,5 M en 2025 (3,8 % de las ventas; 19,8 M en 2016) y 4,1 % en el 1S26 [A7, A2]. Se tratan como coste en el DCF y en el BPA de este informe.' },
      { senal: 'Clientes al alza', nivel: 'Baja', comentario: 'De 343 M a 434 M en seis meses (60 → 73 días de ventas); el flujo operativo del semestre cae a 90 M [A2]. Vigilar en el 3T26.' },
      { senal: 'Disputas fiscales en la India sin provisión', nivel: 'Baja', comentario: '44,4 M reclamados por precios de transferencia, 7,4 M depositados [A2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'No reparte dividendo. La caja va a recompras y compras de empresas: programa de 500 M USD aprobado en febrero de 2026 hasta febrero de 2028 (sustituye al de 2024), con 350 M disponibles a 30-jun-2026 [A2]; en 2025 recompró 329 M y en el 1S26 186 M, incluida una recompra acelerada de 125 M a 30,10 USD de media [A2, A9]. En diciembre de 2025 compró fuera del programa 1,55 M de acciones a Orogen (sociedad del consejero coordinador) por 63,4 M a 40,83 USD [A12]. La dirección anunció en el día del inversor un reparto más equilibrado entre compras y recompras y que las recompras del segundo semestre de 2026 irán más despacio [A13, A14].',
    adquisiciones: [
      { anio: '2018', objetivo: 'SCIO Health Analytics (analítica de pagos sanitarios)', importe: 232, ev_ebitda: null, financiacion: 'Deuda (revolving)', resultado: 'Base del negocio de integridad de pagos sanitarios, hoy el motor del segmento de salud (+23,7 % en 2025); sin deterioros [A1].' },
      { anio: '2021', objetivo: 'Clairvoyant (ingeniería y gestión de datos)', importe: 76.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aportó 40-45 M de ingresos en 2022 según la guía de entonces y es la base de la gestión de datos, que crece por encima del 20 % [A8, A13].' },
      { anio: '2024', objetivo: 'ITI Data (gestión de datos)', importe: 24.3, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; aportó parte del +3,0 % de clientes nuevos en 2025; pago contingente revalorizado en 2,3 M [A1].' },
      { anio: '2026', objetivo: 'iMerit (entrenamiento y evaluación de modelos de IA)', importe: 170, ev_ebitda: null, financiacion: 'Deuda (nuevo crédito de 2026)', resultado: 'Cerrada el 3-ago-2026; hasta 140 M más en incentivos y pagos aplazados; 28-32 M de ingresos en cinco meses y −0,01 USD de BPA ajustado en 2026 [A3, A11]. Pronto para juzgarla.' },
    ],
    comentario: 'La dirección asigna bien el capital en lo operativo (compras pequeñas que se integran sin deterioros y un capital invertido que apenas crece) y de forma más discutible en las recompras: compró 329 M en 2025 a una media cercana a 45 USD y 186 M en el 1S26 a 30,9 USD, en parte con deuda, mientras emite unos 2 M de acciones al año por la remuneración en acciones. El número de acciones diluidas pasó de 171,2 M en 2021 a 152,8 M en el 2T26 (−2,2 % al año) [A1, A3]. La compra a Orogen fue a precio de mercado (media de cinco días) pero es una operación con la sociedad del consejero coordinador [A12].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Seguros', descripcion: 'Siniestros, suscripción, administración de pólizas de vida (LifePRO), subrogación (Subrosource), finanzas y analítica para aseguradoras', tipo_resultado: 'Beneficio bruto', historico: [{ periodo: '2023', ingresos: 586.4, resultado: 201.1 }, { periodo: '2024', ingresos: 656.4, resultado: 231.5 }, { periodo: '2025', ingresos: 710.6, resultado: 256.8 }] },
      { nombre: 'Salud y ciencias de la vida', descripcion: 'Integridad de pagos de aseguradoras de salud, gestión de cuidados, ciclo de ingresos de proveedores, analítica comercial', tipo_resultado: 'Beneficio bruto', historico: [{ periodo: '2023', ingresos: 366.4, resultado: 157.3 }, { periodo: '2024', ingresos: 430.7, resultado: 187.6 }, { periodo: '2025', ingresos: 532.6, resultado: 232.3 }] },
      { nombre: 'Banca, mercados de capitales e industrias diversas', descripcion: 'Riesgo de crédito, fraude, cobros, KYC, analítica de marketing; distribución, energía, medios y servicios generales', tipo_resultado: 'Beneficio bruto', historico: [{ periodo: '2023', ingresos: 411.8, resultado: 156.0 }, { periodo: '2024', ingresos: 426.7, resultado: 158.1 }, { periodo: '2025', ingresos: 482.4, resultado: 183.6 }] },
      { nombre: 'Mercados internacionales de crecimiento', descripcion: 'Todos los servicios a clientes de Reino Unido, Europa, Oriente Medio, Asia-Pacífico y Sudáfrica', tipo_resultado: 'Beneficio bruto', historico: [{ periodo: '2023', ingresos: 266.0, resultado: 93.4 }, { periodo: '2024', ingresos: 324.6, resultado: 113.9 }, { periodo: '2025', ingresos: 362.2, resultado: 128.4 }] },
    ],
    geografias: [{ nombre: 'Norteamérica', peso_pct: 82.7 }, { nombre: 'Reino Unido y Europa', peso_pct: 14.7 }, { nombre: 'Resto del mundo', peso_pct: 2.6 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ingresos de datos e IA (% del total)', valor_anterior: '53,3 % (2024)', valor_actual: '55,3 % (2025); 61 % (2T26)', variacion: '+17,9 % en 2025; +30 % en el 2T26', comentario: '1.155 M frente a 980 M [A1, A13].' },
      { kpi: 'Ingresos de operaciones digitales', valor_anterior: '858,6 M (2024)', valor_actual: '932,3 M (2025)', variacion: '+8,6 % en 2025; −1,5 % en el 2T26', comentario: 'La parte expuesta a la IA que sustituye trabajo [A1, A13].' },
      { kpi: 'Clientes (más de 50.000 USD al año)', valor_anterior: '570', valor_actual: '590', variacion: '+20', comentario: '65 clientes nuevos en 2025 [A1].' },
      { kpi: 'Concentración: diez primeros clientes', valor_anterior: '33,2 %', valor_actual: '34,0 %', variacion: '+0,8 pp', comentario: 'Tres primeros: 17,8 %; ninguno pasa del 10 % [A1].' },
      { kpi: 'Rotación de la plantilla (más de 180 días)', valor_anterior: '26,1 %', valor_actual: '23,6 %', variacion: '−2,5 pp', comentario: '[A1]' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '19,4 % (2T25 19,6 %)', valor_actual: '19,7 % (2T26)', variacion: '+0,1 pp', comentario: 'Sin pagos en acciones ni amortización de compras [A3].' },
    ],
  },
  huecos: [
    { seccion: 'negocio', campo: 'Segmentos 2021-2022 con la segmentación de 2025', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo 2023-2025 reexpresados); 2) 10-K 2024 (segmentación antigua: Seguros, Salud, Analítica, Negocios emergentes); 3) hoja de datos de relación con inversores (no descargable: 403)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'Vida media de la deuda', tipo: 'Complemento', intentos: '1) 10-Q 2T26 (solo vencimientos de la deuda antigua); 2) 8-K del 18-ago-2026 (vencimiento único en 2031, sin calendario de amortización del préstamo); 3) no hay folleto de bonos', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: negocio, competencia, precios, clientes, plantilla, divisas', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${ED}/000129798926000008/exls-20251231.htm` },
  { id: 2, titulo: 'Gartner Forecasts Worldwide IT Spending to Grow 13.5% in 2026, Totaling $6.31 Trillion (tabla: servicios de TI 1.715.650 M USD en 2025, +6,2 %; 1.870.197 M en 2026, +9,0 %)', editor: 'Gartner (reproducido por 01net)', tipo: 'Sectorial', fecha: '2026-04-22', url: 'https://www.01net.it/gartner-forecasts-worldwide-it-spending-to-grow-13-5-in-2026-totaling-6-31-trillion/' },
  { id: 3, titulo: 'Demand for tech services in Europe continues to surge, led by AI-driven infrastructure spending, in Q3 (ISG Index)', editor: 'ISG (Business Wire)', tipo: 'Sectorial', fecha: '2026-10-12', url: 'https://via.tt.se/pressmeddelande/4590434/demand-for-tech-services-in-europe-continues-to-surge-led-by-ai-driven-infrastructure-spending-in-q3-isg-indextm?lang=en' },
  { id: 4, titulo: 'Yahoo Finance quoteSummary de los competidores (ventas, margen operativo, crecimiento, múltiplos), 20-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/G/' },
  { id: 5, titulo: 'ExlService Q2 2026 earnings call (transcripción parcial)', editor: 'StockAlarm (transcripción)', tipo: 'Datos de mercado', fecha: '2026-07-29', url: 'https://pro.stockalarm.io/quote/EXLS/earnings-calls' },
  { id: 6, titulo: 'ExlService Investor Day Spotlights AI Push, Double-Digit Growth Goals', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-05-16', url: 'https://finance.yahoo.com/sectors/technology/articles/exlservice-investor-day-spotlights-ai-230310198.html' },
  { id: 7, titulo: 'EXL and TransUnion shares plummet, what you need to know (caída del sector por Gartner y la IA, 3-feb-2026)', editor: 'StockStory (Barchart)', tipo: 'Prensa', fecha: '2026-02-03', url: 'https://www.barchart.com/story/news/65/exl-and-transunion-shares-plummet-what-you-need-to-know' },
  { id: 8, titulo: 'Anthropic AI tool sparks stocks selloff (vídeo, 4-feb-2026)', editor: 'Bloomberg', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://www.bloomberg.com/news/videos/2026-02-04/anthropic-ai-tool-sparks-stocks-selloff-video' },
  { id: 9, titulo: 'EXL to acquire iMerit (entrenamiento y evaluación de modelos)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-06-24', url: `${ED}/000110465926077069/tm2618647d1_ex99-1.htm` },
];
const comp = (t, nombre, pais, ticker, ventasM) => ({ nombre, pais, ticker, ingresos: ventasM, cuota_pct: null, margen_ebit_pct: r1(Y[t].margen_operativo * 100) });
const B_ = {
  _estado: 'completo',
  sector: {
    definicion: 'El mercado relevante son los servicios de TI y de procesos para empresas (análisis y gestión de datos, ingeniería digital, implantación de IA y gestión de procesos externalizada) en las verticales de EXL: seguros, salud y banca, sobre todo en EE. UU. No hay una estadística pública de ese perímetro exacto: se usa como envolvente el gasto mundial en servicios de TI de Gartner [B2] (1,72 billones de USD en 2025), del que EXL es el 0,12 %, y como contraste la demanda de contratos gestionados del índice ISG [B3]. La cuota relevante no es la del total, sino la de nichos como la subrogación de seguros o la integridad de pagos sanitarios, donde EXL dice ser líder [B1].',
    tamano: '≈ 1.715.650 M USD de gasto mundial en servicios de TI en 2025 y 1.870.197 M en 2026 (+9,0 %) [B2]',
    unidad_serie: 'millones de USD (gasto mundial en servicios de TI)',
    serie: [{ anio: '2025', tamano: 1715650 }, { anio: '2026e', tamano: 1870197 }],
    tcac_historico_pct: null, tcac_previsto_pct: 9.0, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Adopción de IA en procesos (de pilotos a producción)', efecto: '+', horizonte: 'Estructural', evidencia: 'Los ingresos de datos e IA de EXL crecen un 30 % en el 2T26 y son el 61 % del total [B5].' },
      { driver: 'Sustitución de trabajo por IA generativa y agentes', efecto: '−', horizonte: 'Estructural', evidencia: 'Las operaciones digitales de EXL caen un 1,5 % en el 2T26 [B5]; la herramienta de Anthropic de feb-2026 hundió el sector [B7, B8].' },
      { driver: 'Presión de costes de las aseguradoras y de las aseguradoras de salud', efecto: '+', horizonte: 'Cíclico', evidencia: 'Salud +23,7 % en 2025 por la integridad de pagos [B1].' },
      { driver: 'Coste laboral en la India y tipo de cambio de la rupia', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La rupia es el 31,1 % de los gastos de EXL; la guía de 2026 supone 95 rupias por dólar frente a 87,5 en la de 2025 [B1, B5].' },
      { driver: 'Demanda de servicios gestionados', efecto: '+', horizonte: 'Cíclico', evidencia: 'El índice ISG de EMEA del 3T26 muestra crecimiento de dos cifras en servicios gestionados, liderado por la externalización de procesos [B3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Compiten Cognizant, Genpact, Infosys, TCS, Accenture y NTT Data, con ventas de 5 a 75 veces las de EXL [B1, B4]; los grandes crecen un 3-7 %.' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Grandes aseguradoras y bancos; diez clientes son el 34,0 % de las ventas y presionan para pasar de cobrar por persona a cobrar por resultados [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'El talento: rotación del 23,6 % y subidas salariales anuales en la India [B1]; los proveedores de modelos (OpenAI, Anthropic) son socios y a la vez competidores potenciales.' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras moderadas: conocimiento del proceso y datos del cliente; nuevas empresas de IA nativas y los propios proveedores de modelos entran en flujos de trabajo [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 5, justificacion: 'La IA generativa puede hacer dentro de la empresa el trabajo que hoy se externaliza por horas; es la fuerza que más ha cambiado en 2026 [B7, B8].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El gasto en servicios de TI vuelve a acelerar en 2026 (+9,0 % frente a +6,2 %) [B2], pero la demanda se desplaza de servicios por persona a infraestructura y modelos de IA [B3]. EXL creció en todos los baches recientes: −3,3 % en 2020 (pandemia; su único año de caída), +25,8 % en 2022 y +15,5 % en 2023, cuando el sector frenaba. El riesgo de ciclo es menor que el estructural.' },
    regulacion: 'Las normas que tocan las cifras son las de protección de datos sanitarios y financieros en EE. UU. (HIPAA, normas de seguros estatales) y Europa (RGPD), las reglas de la India para las zonas económicas especiales y los nuevos códigos laborales indios, que en 2025-2026 obligaron a reconocer un coste del pasado en las indemnizaciones [B1]. En EE. UU. hay propuestas para gravar o limitar la externalización al extranjero, sin ley aprobada a la fecha de corte; la reforma fiscal de julio de 2025 (OBBBA) baja la caja fiscal de EXL en EE. UU. [B1].',
    tendencias: 'Tres cambios en 2026: los clientes llevan la IA de los pilotos a producción, lo que aumenta la demanda de datos limpios y de integración, donde EXL crece un 30 % [B5]; los agentes de IA reducen el trabajo manual, que es la parte de operaciones digitales de EXL (−1,5 %) [B5]; y el mercado castiga a todo el sector de servicios: la herramienta de automatización de Anthropic del 3-feb-2026 desató una venta de 285.000 M de USD en software y servicios [B8], y EXL cayó ese día con el sector [B7]. EXL responde comprando iMerit (evaluación y entrenamiento de modelos) y con asociaciones con OpenAI, Anthropic, NVIDIA, Databricks y Snowflake [B9, B5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.12,
    posicion: 'Proveedor mediano y especializado: 0,12 % del gasto mundial en servicios de TI [B2]; en sus verticales compite con Genpact, Cognizant y las indias. Dice ser líder en subrogación de seguros (Subrosource) y uno de los primeros en integridad de pagos sanitarios [B1].',
    competidores: [
      comp('G', 'Genpact', 'EE. UU./Bermudas', 'G', r1(Y.G.ventas / 1e6)),
      comp('CTSH', 'Cognizant', 'EE. UU.', 'CTSH', r1(Y.CTSH.ventas / 1e6)),
      comp('ACN', 'Accenture', 'Irlanda', 'ACN', r1(Y.ACN.ventas / 1e6)),
      comp('INFY', 'Infosys', 'India', 'INFY', 20299),
      comp('EPAM', 'EPAM Systems', 'EE. UU.', 'EPAM', r1(Y.EPAM.ventas / 1e6)),
      comp('CNXC', 'Concentrix', 'EE. UU.', 'CNXC', r1(Y.CNXC.ventas / 1e6)),
    ].map((c) => ({ ...c, comentario: { Genpact: 'El más parecido: procesos y analítica; crece un 7 % frente al 15 % de EXL [B4].', Cognizant: 'Gran integrador con presencia fuerte en seguros y salud (TriZetto); crece un 4,5 % [B4].', Accenture: 'Consultoría e integración; el gran competidor en transformación con IA [B4].', Infosys: 'Integrador indio con negocio de procesos (Infosys BPM); margen operativo del 21 % [B4].', 'EPAM Systems': 'Ingeniería digital; compite en datos e IA [B4].', Concentrix: 'Atención al cliente; el modelo más expuesto a la sustitución por IA [B4].' }[c.nombre] })),
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Algo de efecto de datos en integridad de pagos y subrogación (más clientes, más patrones), sin red de usuarios [B1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Procesos críticos integrados en los sistemas del cliente; antigüedad media de los clientes de más de 10 años y retención neta de ingresos por encima de 1,1 [B6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Plataformas propias (LifePRO, Subrosource, modelo de lenguaje de seguros, EXLerate.ai) y patente de Xtrakto.AI [B1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Entrega desde la India y Filipinas con 95,5 % de la plantilla fuera de EE. UU.; margen operativo ajustado del 19,7 % frente al 15 % de Genpact [B1, B4].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Nichos de seguros y salud donde la experiencia de 25 años pesa, pero sin barreras de escala frente a los grandes [B1].' },
      ],
    },
    amenazas: 'La amenaza principal es la IA que hace el trabajo: el 45 % de las ventas de 2025 son operaciones digitales, que ya caen [B5], y los propios clientes o los proveedores de modelos podrían llevar dentro la parte de datos e IA (probabilidad media a cinco años). La segunda, la presión de precio de los grandes integradores que crecen poco y defienden volumen. La tercera, la salida de directivos clave: el jefe de seguros y salud (dos tercios de las ventas) se va en octubre de 2026 [B1]. EXL compensa con costes de cambio altos y crecimiento del 15 %, el más alto de su grupo [B4].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'ExlService (EXL) es una empresa de servicios de datos, IA y gestión de procesos con sede en Nueva York, fundada en 1999, con 68.000 empleados a agosto de 2026, el 95,5 % fuera de EE. UU., sobre todo en la India y Filipinas [B1]. Vende dos cosas: soluciones de datos e IA (55 % de las ventas de 2025: analítica, gestión y modernización de datos, ingeniería digital, integridad de pagos sanitarios, modelos de lenguaje del sector) y operaciones digitales (45 %: gestión externalizada de siniestros, suscripción, administración de pólizas, cobros, atención al cliente y contabilidad) [B1]. Los clientes son grandes aseguradoras, aseguradoras de salud, bancos y empresas de servicios, el 82,7 % en Norteamérica. Se organiza en cuatro unidades: seguros (34 % de las ventas), salud (25,5 %), banca e industrias diversas (23,1 %) y mercados internacionales (17,4 %).',
    como_gana_dinero: 'Cobra por tiempo y materiales, por persona dedicada, por transacción, por resultados (más del 30 % de las ventas) y por suscripción [B1, B6]. Más de tres cuartas partes de los ingresos son recurrentes (contratos de un año o más) [B6]. El margen depende del coste de la plantilla en la India y Filipinas (salarios con subidas anuales en abril, rotación del 23,6 %), de la utilización y del tipo de cambio: la rupia es el 31,1 % de los gastos, frente a ingresos casi todos en dólares, y un 10 % de subida de la rupia sube los gastos en 55 M USD antes de coberturas [B1]. Hay apalancamiento operativo en los contratos largos: los primeros 12-18 meses tienen margen bajo y luego sube. Sin estacionalidad fuerte salvo la subida salarial del 2T.',
    clientes: 'Unos 590 clientes de más de 50.000 USD al año; los tres primeros son el 17,8 % de las ventas, los cinco primeros el 23,9 % y los diez primeros el 34,0 %, sin ninguno por encima del 10 % [B1]. La concentración sectorial pesa más: las aseguradoras son el 39,8 % de las ventas por vertical (829,9 M en 2025) y la salud el 25,6 % [B1]. Los contratos son marcos de servicios con órdenes de trabajo; la antigüedad media de los clientes pasa de 10 años y la retención neta de ingresos supera 1,1 [B6]. Poder de precios: muchos contratos llevan revisión anual por inflación, que compensa en parte las subidas salariales; el margen bruto subió de 37,6 % a 38,4 % en 2025 [B1], pero la tendencia del sector es pasar del pago por persona al pago por resultado, que traslada al cliente parte de la productividad de la IA.',
  },
  huecos: [
    { seccion: 'sector', campo: 'Segunda fuente de tamaño de mercado (servicios de procesos y analítica en seguros, salud y banca)', tipo: 'Complemento', intentos: '1) Gartner, previsión de servicios de procesos (BPS) (sin cifra pública; solo el total de servicios de TI); 2) índice ISG (solo valor de contratos, no tamaño del mercado); 3) Everest y HFS (de pago)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'CR5 y serie histórica de 5 años', tipo: 'Complemento', intentos: '1) Gartner (solo 2025 y 2026 en la nota pública); 2) ISG (no da cuotas); 3) informes anuales de competidores (perímetros distintos)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración 2025, propiedad, ratio de remuneración', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-27', url: `${ED}/000119312526181891/d885936ddef14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 16-jun-2026 (votaciones)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-16', url: `${ED}/000110465926074560/tm2618091d1_8k.htm` },
  { id: 3, titulo: 'Form 4 de directivos y consejeros, 20-oct-2025 a 20-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001297989&type=4' },
  { id: 4, titulo: 'EXL announces departure of Vivek Jetley, President and Head of Insurance, Healthcare and Life Sciences (8-K)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-02', url: `${ED}/000110465926104527/tm2624603d1_ex99-1.htm` },
  { id: 5, titulo: 'EXL announces appointment of Bina Mehta to Board and lead director transition (8-K)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-21', url: `${ED}/000110465926085393/tm2621003d1_ex99-1.htm` },
  { id: 6, titulo: 'EXL appoints Bhupender Singh as President and Head of International Growth Markets (8-K)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-12', url: `${ED}/000110465926059031/tm2614273d1_ex99-1.htm` },
  { id: 7, titulo: 'EXL announces appointment of Patrick Geraghty to Board (8-K)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-20', url: `${ED}/000110465925100650/tm2528929d1_ex99-1.htm` },
  { id: 8, titulo: 'EXL Announces Share Repurchase of 1,551,970 Shares (compra a Orogen Echo, sociedad de Vikram Pandit)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-12-15', url: `${ED}/000110465925121104/tm2533368d1_ex99-1.htm` },
  { id: 9, titulo: 'Notas de resultados del 4T 2021-2025 y del 1T-2T 2026 (guías anuales y resultados)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000129798926000021/exlq226pressrelease.htm` },
  { id: 10, titulo: 'Form 10-K del ejercicio 2025 (directivos, auditor, contingencias)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${ED}/000129798926000008/exls-20251231.htm` },
];
const ventasF4 = F4.operaciones.filter((o) => o.codigo === 'S').map((o) => ({ fecha: o.fecha, persona: `${o.persona} (${o.cargo})${o.plan_10b5_1 ? ', plan 10b5-1' : ''}`, operacion: 'Venta', acciones: o.acciones, importe: r2(o.importe / 1e6) }));
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Rohit Kapoor', cargo: 'Presidente del consejo y consejero delegado', desde: '2008', participacion_pct: 2.56, trayectoria: 'Cofundador (1999); consejero delegado desde 2008 y presidente desde abril de 2024 [C1]. Bajo su mandato los ingresos pasaron de menos de 200 M a 2.088 M USD (2025) y la empresa giró de externalización de procesos a datos e IA (55 % de las ventas en 2025, 38 % en 2020) [C1, C9].' },
      { nombre: 'Maurizio Nicolelli', cargo: 'Director financiero', desde: '2020', participacion_pct: 0.21, trayectoria: 'Director financiero desde febrero de 2020; antes, 23 años en FactSet (director financiero de 2009 a 2018) y Casa Systems [C1]. Ha batido la guía de BPA ajustado en todos sus años completos.' },
      { nombre: 'Vikas Bhalla', cargo: 'Presidente, IA y operaciones', desde: '2025', participacion_pct: 0.2, trayectoria: 'En EXL desde 2006; jefe de seguros de 2014 a 2025, cuando seguros creció a 657 M (2024) [C1]. Vende acciones cada mes con un plan 10b5-1 [C3].' },
      { nombre: 'Vivek Jetley', cargo: 'Presidente, seguros, salud y ciencias de la vida (sale el 26-oct-2026)', desde: '2025', participacion_pct: 0.37, trayectoria: 'En EXL desde 2006; construyó la analítica; dirige las unidades que suman el 60 % de las ventas. Se va a ser consejero delegado de Hexaware [C4].' },
      { nombre: 'Narasimha Kini', cargo: 'Vicepresidente ejecutivo, banca e industrias diversas', desde: '2025', participacion_pct: 0.18, trayectoria: 'En EXL desde 2001; dirigió Negocios emergentes desde 2021 [C1].' },
      { nombre: 'Bhupender Singh', cargo: 'Presidente, mercados internacionales', desde: '2026', participacion_pct: 0, trayectoria: 'Fichado en mayo de 2026; antes presidente y consejero delegado adjunto de Teleperformance y consejero delegado de Intelenet [C6].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Ingresos 1.280-1.310 M; BPA ajustado 1,07-1,12 USD (5,35-5,60 antes del desdoblamiento)', real: '1.412 M; 1,20 USD', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ingresos 1.560-1.600 M; BPA ajustado 1,32-1,36 USD (6,60-6,80 antes del desdoblamiento)', real: '1.631 M; 1,43 USD', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ingresos 1.780-1.820 M; BPA ajustado 1,56-1,62 USD', real: '1.838 M; 1,65 USD', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ingresos 2.025-2.060 M; BPA ajustado 1,83-1,89 USD', real: '2.088 M; 1,95 USD', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos 2.275-2.315 M; BPA ajustado 2,14-2,19 USD (febrero); subida a 2.390-2.415 M (con 28-32 M de iMerit) y 2,25-2,29 USD en julio', real: 'En curso: 1.165 M y 1,17 USD ajustado en el primer semestre', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y creíble: el consejero delegado y fundador lleva 18 años en el cargo y la guía anual se ha batido y subido en cada uno de los últimos cuatro años [C9]. El banquillo es largo (varios presidentes con 20 años en la casa), pero 2026 trae dos cambios relevantes: la salida de Vivek Jetley, responsable de seguros y salud (60 % de las ventas), el 26-oct-2026, sin sustituto anunciado a la fecha de corte [C4], y la llegada de Bhupender Singh para internacional [C6]. No hay plan de sucesión público para el consejero delegado (61 años) [C1]; la acumulación de presidente y consejero delegado desde 2024 lo hace más importante.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Rohit Kapoor', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2002', comisiones: 'Ninguna' },
      { nombre: 'Vikram S. Pandit', cargo: 'Consejero coordinador (hasta finales de 2026)', tipo: 'Independiente', desde: '2018', comisiones: 'Remuneración' },
      { nombre: 'Sarah K. Williamson', cargo: 'Consejera (coordinadora desde finales de 2026)', tipo: 'Independiente', desde: '2023', comisiones: 'n.d.' },
      { nombre: 'Thomas Bartlett', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Remuneración (presidente), auditoría' },
      { nombre: 'Kristy Pipes', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría (presidenta), remuneración' },
      { nombre: 'Andreas Fibig', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Nombramientos y gobierno (presidente), auditoría' },
      { nombre: 'Pat Geraghty', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, nombramientos y gobierno' },
      { nombre: 'Bina Mehta', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, remuneración' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 95.2, voto_remuneracion_contra_pct: 4.6, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 16.2, fijo: 0.89, variable_corto: 1.41, variable_largo: 13.81, ratio_salario_medio: 2459 },
    remuneracion: 'El primer ejecutivo cobró 16,2 M USD en 2025 (14,2 M en 2024 y 12,3 M en 2023), un 86 % en acciones [C1]. El bonus anual pondera un 75 % los objetivos de empresa (ingresos de 2.085 M y margen operativo ajustado) y un 25 % los individuales; las acciones por objetivos de 2023 se ligaron a ingresos acumulados de tres años (5.409 M de objetivo, 5.496 M logrados) y al rendimiento para el accionista frente a un grupo de comparación [C1]. Premia crecer, no la rentabilidad del capital: no hay métrica de ROIC ni de flujo libre, y el margen ajustado excluye los pagos en acciones. Hay recuperación de variable por reexpresión y por mala conducta [C1]. La retribución variable a largo plazo depende en parte del rendimiento relativo para el accionista, de ahí el «Sí» en el criterio de rentabilidad. Apoyo de la junta: 95,2 % a favor en 2026 y en torno al 96 % en 2025 [C1, C2]. Ratio con el empleado mediano: 2.459 veces (1.292 corregido por coste de vida) [C1].',
    accionistas: [
      { nombre: 'BlackRock', pct: 10.09, tipo: 'Institucional', variacion: 'Estable (proxy de 2026)' },
      { nombre: 'The Vanguard Group', pct: 9.7, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'FMR (Fidelity)', pct: 9.36, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Rohit Kapoor (con fideicomisos familiares)', pct: 2.56, tipo: 'Consejero delegado', variacion: 'Sin ventas en 12 meses [C3]' },
      { nombre: 'Orogen Echo (Vikram Pandit y Atairos)', pct: 0, tipo: 'Antiguo accionista de referencia', variacion: 'Salió: vendió 1,55 M de acciones a la propia EXL en diciembre de 2025 [C8]' },
      { nombre: 'Autocartera', pct: 27.8, tipo: 'Autocartera', variacion: '58,4 M de acciones sobre 210,1 M emitidas a 30-jun-2026; +5,9 M en el semestre' },
    ],
    insiders: ventasF4,
    control_y_defensas: 'No hay accionista de control: los tres primeros son gestoras indexadas o institucionales con un 29 % entre las tres [C1]. Una sola clase de acciones con un voto por acción. El consejo se elige cada año (sin consejo escalonado). El presidente es el consejero delegado desde 2024, con un consejero coordinador independiente (Vikram Pandit, que pasa el testigo a Sarah Williamson a finales de 2026) [C5]. Operación vinculada: en diciembre de 2025 EXL recompró 1,55 M de acciones por 63,4 M USD a Orogen Echo, sociedad que preside el propio consejero coordinador, a la media de cinco días [C8]. La junta de 2026 dio un 13,6 % de votos en contra a Andreas Fibig, el resto por debajo del 2 % [C2].',
    alertas: [
      'Salida del presidente de seguros, salud y ciencias de la vida (60 % de las ventas) el 26-oct-2026, sin sustituto anunciado a la fecha de corte [C4].',
      'Recompra de 63,4 M USD a Orogen Echo, sociedad del consejero coordinador (dic-2025) [C8].',
      'Presidente y consejero delegado en la misma persona desde abril de 2024 [C1].',
      'Ventas recurrentes de directivos (3,1 M USD en 12 meses, el 75 % con plan 10b5-1) y ninguna compra [C3].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'Comisiones de Sarah K. Williamson', tipo: 'Complemento', intentos: '1) Proxy 2026, perfiles de comisiones (no la lista); 2) biografía del proxy; 3) 8-K del 21-jul-2026 (solo el cargo de coordinadora)', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de EXLS, SPY y XLK (herramientas/bolsa.mjs): precio, rango, volumen, rentabilidades, beta, volatilidad, cierres de ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/EXLS/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de EXLS y comparables (consenso, objetivos, recomendaciones, múltiplos), 20-oct-2026 12:33 UTC', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/EXLS/analysis/' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Form 10-Q del 2T26 (acciones en circulación a 24-jul-2026: 151.612.499; deuda y caja a 30-jun-2026)', editor: 'ExlService Holdings, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000129798926000023/exls-20260630.htm` },
  { id: 6, titulo: 'Historial de cambios de recomendación y precio objetivo (TD Cowen, Baird, Needham, JPMorgan, Stifel, Barrington)', editor: 'Yahoo Finance (upgradeDowngradeHistory)', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/EXLS/analysis/' },
  {"id":7,"titulo":"Capgemini completes the acquisition of WNS (76,50 USD por acción, ≈ 3.300 M USD sin deuda neta; cierre el 17-oct-2025) y 8-K de WNS del 7-jul-2025 (prima del 28 % sobre la media ponderada de 90 días)","editor":"Capgemini / WNS (SEC)","tipo":"Primaria","fecha":"2025-10-17","url":"https://www.capgemini.com/news/press-releases/capgemini-completes-the-acquisition-of-wns-and-creates-a-global-leader-in-agentic-ai-powered-intelligent-operations/ ; https://www.sec.gov/Archives/edgar/data/1356570/000207709625000003/ea025044801ex99-2_wns.htm"},
  { id: 8, titulo: 'EXL to acquire iMerit (hasta 310 M USD)', editor: 'ExlService Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-06-24', url: `${ED}/000110465926077069/tm2618647d1_ex99-1.htm` },
  { id: 9, titulo: 'Noticias de EXLS de 12 meses (herramientas/noticias.mjs: Google Noticias, Yahoo, 8-K de la SEC)', editor: 'Varios (recopilación)', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://news.google.com/search?q=ExlService' },
  { id: 10, titulo: 'EXL and TransUnion shares plummet, what you need to know (3-feb-2026: caída del sector tras Gartner y por la IA)', editor: 'StockStory (Barchart)', tipo: 'Prensa', fecha: '2026-02-03', url: 'https://www.barchart.com/story/news/65/exl-and-transunion-shares-plummet-what-you-need-to-know' },
  { id: 11, titulo: 'Anthropic AI tool sparks stocks selloff', editor: 'Bloomberg (vídeo)', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://www.bloomberg.com/news/videos/2026-02-04/anthropic-ai-tool-sparks-stocks-selloff-video' },
  { id: 12, titulo: 'Titulares de Seeking Alpha sobre EXLS (resultados frente al consenso, día del inversor, M&A)', editor: 'Seeking Alpha (RSS)', tipo: 'Datos de mercado', fecha: '2026-09-08', url: 'https://seekingalpha.com/api/sa/combined/EXLS.xml' },
  { id: 13, titulo: 'Why EXL (EXLS) stock is down today (31-oct-2025: competencia en servicios con IA)', editor: 'StockStory (Barchart)', tipo: 'Prensa', fecha: '2025-10-31', url: 'https://www.barchart.com/story/news/35836001/why-exl-exls-stock-is-down-today' },
];
const ntm = (t, w0) => { const tr = Object.fromEntries(Y[t].trend.map((x) => [x.periodo, x])); const e0 = tr['0y'], e1 = tr['+1y']; return { bpa: w0 * e0.bpa + (1 - w0) * e1.bpa, ventas: w0 * e0.ventas + (1 - w0) * e1.ventas }; };
// Pesos de los próximos 12 meses (oct-26 a sep-27): calendario 0,2/0,8; marzo (INFY) 0,45/0,55; agosto (ACN) 0,87/0,13; noviembre (CNXC) 0,12/0,88.
const fila = (t, nombre, pais, w0, conEv = true) => {
  const d = Y[t]; const n = ntm(t, w0);
  const crec = d.divisa === 'USD' && t !== 'INFY' ? (n.ventas / d.ventas - 1) * 100 : null;
  return {
    nombre, ticker: t, pais, capitalizacion: r1(d.cap / 1e6),
    ev_ventas: conEv ? r2(d.ev / d.ventas) : null, ev_ebitda_ltm: conEv ? r1(d.ev / d.ebitda) : null,
    ev_ebitda_ntm: conEv && crec != null ? r1(d.ev / (d.ebitda * (1 + crec / 100))) : null,
    per_ntm: r1(d.precio / n.bpa), crecimiento_pct: crec != null ? r1(crec) : (t === 'INFY' ? r1((Y.INFY.trend[3].ventas / Y.INFY.trend[2].ventas - 1) * 100) : null),
    margen_ebitda_pct: r1(d.margen_ebitda * 100), roic_pct: null, dn_ebitda: conEv ? r1((d.deuda - d.caja) / d.ebitda) : null, fcf_yield_pct: d.fcf && conEv ? r1(d.fcf / d.cap * 100) : null,
  };
};
const empresas = [
  fila('G', 'Genpact', 'US', 0.2), fila('CTSH', 'Cognizant', 'US', 0.2), fila('EPAM', 'EPAM Systems', 'US', 0.2), fila('GLOB', 'Globant', 'LU', 0.2),
  fila('ACN', 'Accenture', 'IE', 0.87), fila('INFY', 'Infosys (ADR)', 'IN', 0.45, false), fila('CNXC', 'Concentrix', 'US', 0.12), fila('TASK', 'TaskUs', 'US', 0.2),
];
const pers = empresas.map((e) => e.per_ntm).sort((a, b) => a - b);
const medPer = (pers[3] + pers[4]) / 2;
const ex = Y.EXLS;
const tr = Object.fromEntries(ex.trend.map((x) => [x.periodo, x]));
const D = {
  _estado: 'completo',
  _per_mediana_comparables: r1(medPer),
  identificacion: {
    nombre: 'ExlService Holdings, Inc.', nombre_corto: 'EXL', ticker: 'EXLS', isin: 'US3020811044', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Servicios de TI y de procesos', sede: 'Nueva York', fundacion: '1999', empleados: 68000, web: 'https://www.exlservice.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 151.9, capitalizacion_publicada: r1(ex.cap / 1e6), free_float_pct: 97.4,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía de 2026 (28-jul-2026): ingresos de 2.390-2.415 M USD (+14-16 % publicado; +13-14 % orgánico a divisa constante; incluye 28-32 M de iMerit desde el 31-jul) y BPA ajustado de 2,25-2,29 USD (+16-18 %), con un tipo de cambio de 95 rupias por dólar, inversión de 58-62 M, gastos financieros netos de 16-18 M e impuesto del 21-22 % [D5, D12]. Es la segunda subida del año (febrero: 2.275-2.315 M y 2,14-2,19 USD). A medio plazo (día del inversor, 13-may-2026): crecimiento de los ingresos de dos cifras en 2026 y 2027 y BPA ajustado creciendo más que los ingresos, sin cifras concretas [D12]. Próximos resultados: 27-oct-2026 [D2].',
    estimaciones: [
      { periodo: '2026e', ingresos: r1(tr['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(tr['0y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${tr['0y'].n} analistas (BPA ajustado, sin pagos en acciones) [D2]` },
      { periodo: '2027e', ingresos: r1(tr['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(tr['+1y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${tr['+1y'].n} analistas (BPA ajustado) [D2]` },
    ],
    recomendaciones: { n_analistas: 9, comprar: 9, mantener: 0, vender: 0, po_medio: r2(ex.po_medio), po_min: ex.po_min, po_max: ex.po_max },
    revisiones: `El BPA ajustado de 2026 del consenso sube de ${String(r2(tr['0y'].bpa_hace90)).replace('.', ',')} USD hace 90 días a ${String(r2(tr['0y'].bpa)).replace('.', ',')} y el de 2027 de ${String(r2(tr['+1y'].bpa_hace90)).replace('.', ',')} a ${String(r2(tr['+1y'].bpa)).replace('.', ',')}, tras la subida de guía de julio [D2]. Los precios objetivo bajaron en febrero de 2026 (Needham 55 → 40, Stifel 54 → 46, TD Cowen 51 → 45) con la caída del sector por la IA y volvieron a subir tras el 2T26 (Baird pasa a sobreponderar con 45; Needham 40 → 45; TD Cowen 39 → 43 → 45) [D6]. Una sola fuente con estimaciones completas (Yahoo); MarketScreener no abre sin sesión. El consenso no publica el BPA con pagos en acciones: el ajustado de 2026 (2,29) equivale a unos 1,80 USD con ese coste (estimación propia: pagos en acciones de unos 95 M × 0,78 ÷ 153 M de acciones).`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: r1(ex.corto_pct * 100),
    comentario: 'EXL ha quedado muy por detrás del mercado: −2,3 % en un año frente a +15,4 % del S&P 500 y +29,7 % del sector tecnológico, y +10,0 % anual en cinco años frente a +12,6 % [D1]. La caída máxima de cinco años es del −51,3 %, entre el 6-feb-2025 (máximo de 51,80 USD) y el 25-jun-2026 [D1]. No la explican los resultados, que crecen un 12-16 % y baten la guía, sino el castigo a todo el sector de servicios por la IA generativa: el 3-feb-2026 cayó un 18,7 % en el día con el sector tras los resultados de Gartner y la herramienta de automatización de Anthropic [D10, D11]. Desde el mínimo de junio ha subido un 58 % por el 2T26 (aceleración de datos e IA y subida de guía) [D12]. La beta mensual a cinco años es 0,87 (semanal 0,97; semanal a dos años 0,65) y la volatilidad de un año, 42,9 %, muy alta para su historia.',
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => +c.anio >= 2016).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Proveedores cotizados de servicios de procesos, datos e ingeniería digital con clientes grandes en EE. UU.: Genpact (el más parecido), Cognizant, EPAM, Globant, Accenture, Infosys, Concentrix y TaskUs [D2]. Fuera WNS (comprada por Capgemini en octubre de 2025 por 3.300 M USD [D7]), TTEC (en dificultades financieras, PER de 1,5 veces), Gartner y Verisk (información, no servicios) y las indias con cuentas en rupias salvo Infosys (ADR en USD; solo PER, margen y crecimiento, porque Yahoo mezcla rupias y dólares en su valor empresa). PER de los próximos 12 meses sobre el BPA AJUSTADO de cada empresa (sin pagos en acciones, como publica cada una); EBITDA y valor empresa de Yahoo (con los pagos en acciones restados). El NTM del EBITDA es una estimación propia: el LTM con el crecimiento de ventas previsto.',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      {"fecha":"2025-07","objetivo":"WNS (procesos y analítica)","comprador":"Capgemini","ev":3300,"ev_ventas":null,"ev_ebitda":null,"prima_pct":28,"excluir":false,"comentario":"Oferta en efectivo de 76,50 USD por acción (≈ 3.300 M USD sin la deuda neta, casi nula), anunciada el 7-jul-2025 con una prima del 28 % sobre la media ponderada de 90 días y cerrada el 17-oct-2025 [D7]. El comparable más cercano a EXL (procesos y analítica para seguros y sanidad, base en la India)."},
      { fecha: '2026-06', objetivo: 'iMerit (datos para entrenar modelos de IA)', comprador: 'ExlService', ev: 310, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '170 M al cierre y hasta 140 M en incentivos y pagos aplazados [D8]; 28-32 M de ingresos en cinco meses de 2026 implican unos 70 M al año (estimación propia: 4,4 veces las ventas con todo el pago).' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'Estimaciones de 2028e, EBITDA y EBIT del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo 2026 y 2027, BPA y ventas); 2) MarketScreener (no abre sin sesión); 3) MarketBeat (solo el año en curso)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'Múltiplos de EBITDA de WNS-Capgemini y de otras 3-5 operaciones', tipo: 'Complemento', intentos: '1) nota de Capgemini (valor y prima, sin EBITDA); 2) informes de WNS (no recalculado con el EBITDA del mismo perímetro); 3) Genpact, Concentrix-Webhelp y TaskUs-Blackstone (operaciones con perímetros o resultados distintos, sin múltiplo verificado)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $EXLS (jun-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://api.stocktwits.com/api/2/streams/symbol/EXLS.json' },
  { id: 2, titulo: 'Seeking Alpha, artículos de análisis sobre EXLS (feb-sep 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-28', url: 'https://seekingalpha.com/api/sa/combined/EXLS.xml' },
  { id: 3, titulo: 'MarketBeat, noticias y valoraciones de EXLS', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-09-26', url: 'https://www.marketbeat.com/stocks/NASDAQ/EXLS/news/' },
  { id: 4, titulo: 'Titulares de Yahoo Finance y Simply Wall St sobre EXLS (sep-oct 2026)', editor: 'Yahoo Finance / Simply Wall St', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/EXLS/news/' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Euforia tras el 2T26 («otro trimestre fuerte», subida del 18 % en el día) y queja de que el mercado trata a la empresa «como a un hijastro» pese a crecer; en junio, frustración por los mínimos de 52 semanas y opciones bajistas antes de conferencias [E1].' },
      { plataforma: 'Seeking Alpha', fecha: '2026-08', n_comentarios: 6, tono: 'Positivo', resumen: 'Artículos que la ven como «compuesto» más que como proveedor de TI y que señalan una «capa de IA» que el mercado no ve; en febrero, «el precio baja, pero sigo con compra fuerte» [E2].' },
      { plataforma: 'Yahoo Finance y Simply Wall St', fecha: '2026-10', n_comentarios: 8, tono: 'Dividido', resumen: '«Los miedos a la IA tapan unos resultados fuertes» (septiembre) y una «valoración partida» entre barata por beneficio y cara por flujo descontado [E4].' },
      { plataforma: 'MarketBeat', fecha: '2026-09', n_comentarios: 5, tono: 'Neutro', resumen: 'Mejora de calificación de Wall Street Zen en septiembre y el cierre de iMerit; sin debate de fondo [E3].' },
    ],
    temas: [
      { tema: 'La IA destruye el negocio de externalización', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos dan razón a las dos partes: las operaciones digitales caen un 1,5 % y los datos e IA suben un 30 %; el total crece un 15,6 % (2T26). El riesgo es real en el 45 % de las ventas.' },
      { tema: 'Barata frente a su historia', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto con el BPA ajustado (15,3 veces 2027); con los pagos en acciones el múltiplo sube a unas 20 veces, por encima de Genpact o Cognizant.' },
      { tema: 'Recompras agresivas', postura: 'Alcista', peso: 'Medio', contraste: '515 M en 18 meses, en parte con deuda; compensan sobre todo la dilución por pagos en acciones.' },
      { tema: 'Salida de directivos', postura: 'Bajista', peso: 'Bajo', contraste: 'La salida del jefe de seguros y salud apenas aparece en los foros, y es el cambio más relevante del año.' },
    ],
    lectura: 'El sentimiento ha pasado del desánimo de junio (mínimos de 52 semanas) a un optimismo prudente tras el 2T26, en línea con los analistas (9 de 9 con compra). No hay euforia: muchos usuarios repiten que el mercado no premia el crecimiento por el miedo a la IA. Dos cosas que el foro no ve y el informe sí: la salida del responsable de seguros y salud y el peso real de los pagos en acciones en el múltiplo.',
    confianza: 'Media',
  },
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit', tipo: 'Complemento', intentos: '1) reddit.com (403); 2) old.reddit.com (403); 3) búsqueda de hilos en buscador (sin hilos con debate en tres meses)', decision: 'Omitido' }],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER NTM de comparables:', r1(medPer), pers);
console.log(empresas.map((e) => `${e.nombre}: PER ${e.per_ntm} EV/EBITDA ${e.ev_ebitda_ltm} crec ${e.crecimiento_pct}`).join('\n'));
