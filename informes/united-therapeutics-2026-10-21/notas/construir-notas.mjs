// Escribe las notas A-E de United Therapeutics (UTHR, corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR,
// relación con inversores, Liquidia, Merck), del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json
// (Yahoo quoteSummary del 21-oct-2026, antes de abrir Nueva York) y de form4.json. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/united-therapeutics-2026-10-21/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/1082554';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025: cuentas, ingresos por producto y país, distribuidores, patentes, genéricos, licencias (MannKind, Lilly, Supernus), litigios, impuestos', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${ED}/000108255426000006/uthr-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, flujos del semestre, deuda, acciones, ASR de 2026, genéricos de Tyvaso y Orenitram', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000108255426000027/uthr-20260630.htm` },
  { id: 3, titulo: 'United Therapeutics Corporation Reports Second Quarter 2026 Financial Results', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000108255426000028/uthrq22026-ex991.htm` },
  { id: 4, titulo: 'United Therapeutics Corporation Reports First Quarter 2026 Financial Results', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-06', url: `${ED}/000108255426000021/uthrq12026-ex991.htm` },
  { id: 5, titulo: 'United Therapeutics Corporation Reports Fourth Quarter and Full Year 2025 Financial Results', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-25', url: `${ED}/000108255426000007/exhibit991uthr12312025.htm` },
  { id: 6, titulo: 'United Therapeutics Corporation Reports Third Quarter 2025 Financial Results', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-29', url: `${ED}/000108255425000036/uthrq32025-ex991.htm` },
  { id: 7, titulo: 'XBRL company facts de United Therapeutics (inversiones financieras, ingresos y BPA trimestrales, pagos en acciones, depreciación, línea de crédito)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001082554.json' },
  { id: 8, titulo: 'Form 10-K 2024 (balance de 2023: línea de crédito corriente 400 M y no corriente 300 M)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2025-02-26', url: `${ED}/000108255425000005/uthr-20241231.htm` },
  { id: 9, titulo: 'Form 8-K: programa de recompra de 2.000 M USD y recompras aceleradas (ASR) de 1.500 M con Citibank', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-09', url: `${ED}/000110465926025331/tm268321d1_ex99-1.htm` },
  { id: 10, titulo: 'Form 8-K: ASR de 477,6 M USD para el resto de la autorización (acciones en circulación a 4-sep-2026: 42,9 M)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${ED}/000110465926105953/tm2624887d1_ex99-1.htm` },
  { id: 11, titulo: 'Form 8-K: ASR de 1.000 M USD (agosto de 2025)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2025-08-01', url: `${ED}/000110465925073163/tm2522276d1_ex99-1.htm` },
  { id: 12, titulo: 'Form 8-K: acuerdo de transacción con Liquidia (185 M + 145,4 M USD a cobrar; 10 M a pagar; Yutrepia sin PH-ILD)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000110465926115723/tm2627546d1_ex99-1.htm` },
];

const anios = ['2021', '2022', '2023', '2024', '2025'];
// Caja del balance = efectivo + inversiones financieras corrientes y no corrientes (bonos y valores líquidos) [1, 7]: la empresa
// las presenta como «cash, cash equivalents, and marketable investments». Deuda = líneas de crédito [1, 8, 7].
const CAJA = { 2021: 3580.6, 2022: 4154.9, 2023: 4903.9, 2024: 4742.3, 2025: 4697.0 };
const DEUDA = { 2021: 800, 2022: 800, 2023: 700, 2024: 300, 2025: 0 };
const INTANG = { 2021: null, 2022: null, 2023: null, 2024: 79.6, 2025: 84.2 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, participadas_en_ebitda: null, no_recurrentes_en_ebitda: c.periodo === '2025' ? 21.7 : null, dpa: 0, dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, caja: CAJA[b.periodo], deuda_financiera: DEUDA[b.periodo], arrendamientos: 0, intangibles: INTANG[b.periodo], minoritarios: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, pagos_arrendamientos: 0, dividendos: 0, recompras: f.recompras ?? 0, desinversiones: f.desinversiones ?? 0, adquisiciones: f.adquisiciones ?? 0 };
  delete o.fin; return o;
});

// Trimestres [3-6, 7]: EBITDA = resultado operativo + amortización del año repartida por igual (estimación propia:
// 18,1 M por trimestre en 2024, 21,4 en 2025 y 23,4 en 2026, de 72,5, 85,6 y 46,8 M del semestre).
const trim = (p, ing, g, oi, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: r1(oi + da), margen_ebitda_pct: r2((oi + da) / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K 2025, el 10-K 2024 y las notas de resultados. Caja = efectivo + inversiones financieras corrientes y no corrientes (la empresa las presenta juntas). Deuda = líneas de crédito (cero desde el 2T25). Arrendamientos operativos fuera (US GAAP). Sin dividendos.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3154.5, ebitda: 1493.3, ebit: 1401.8, beneficio_neto: 1310.9, bpa: 27.95, dpa: 0, dpa_extraordinario: 0, fcf: 1087.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos crecieron de 1.685,5 M USD en 2021 a 3.182,7 M en 2025 (TCAC del 17 %), todo orgánico salvo la compra de Miromatrix (89,2 M en 2023, sin ventas relevantes) [1, 7]. El motor fue Tyvaso: Tyvaso DPI pasó de 731,1 M en 2023 a 1.292,5 M en 2025 (+25 % en 2025) y el Tyvaso nebulizado se quedó plano (585,7 M); Orenitram subió un 14 % (496,9 M) y Remodulin cayó un 2 % (526,8 M) [1]. En 2026 el crecimiento se ha parado: 781,5 M en el 1T (−2 %) y 783,3 M en el 2T (−2 %) por la competencia de Yutrepia y Winrevair, con caídas de volumen en Tyvaso nebulizado (−37,6 M en el 2T) y Remodulin (−12,3 M) compensadas en parte por precio [3, 4]. El margen operativo fue del 46,9 % en 2025 y del 42,0 % en el primer semestre de 2026: más coste de ventas (reservas de inventario de Tyvaso DPI, 133,4 M en el 1T) y más I+D de órganos y cardiopulmonar [2, 3, 4]. El resultado financiero (intereses de 4.700 M de caja e inversiones) sumó 221,4 M en 2025 y baja en 2026 tras pagar 2.000 M en recompras [2, 5].',
    ajustes: 'La empresa no publica cifras ajustadas: BPA y márgenes son US GAAP [1]. Partidas no recurrentes: deterioro de inmovilizado de 21,7 M en el 2T25 (dentro de gastos generales; se devuelve al EBITDA de 2025) [3]; en 2026, pérdidas no realizadas de 48,2 M en acciones cotizadas en el primer semestre (resultado financiero) y un tipo impositivo del 12 % en el semestre por el beneficio fiscal de las opciones ejercidas [2, 3]. El acuerdo con Liquidia del 14-oct-2026 dará en el 4T26 un ingreso no recurrente de 175 M netos (185 M a cobrar menos 10 M a pagar) y 145,4 M más en 2027 por las ventas a PH-ILD hasta el cambio de etiqueta [12]: no entran en el BPA de la regla a 12 meses. Pagos en acciones (opciones y RSU): 147,7 M en 2025 (4,6 % de las ventas), restados en el EBITDA [7].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 748.9, 22.9, 343.1, 18.1, 6.39, null),
      trim('4T24', 735.9, 19.7, 357.7, 18.1, 6.19, null),
      trim('1T25', 794.4, 17.2, 382.8, 21.4, 6.63, null),
      trim('2T25', 798.6, 11.7, 364.5, 21.4, 6.41, null),
      trim('3T25', 799.5, 6.8, 388.5, 21.4, 7.16, null),
      trim('4T25', 790.2, 7.4, 356.7, 21.4, 7.70, null),
      trim('1T26', 781.5, -1.6, 325.8, 23.4, 5.82, null),
      trim('2T26', 783.3, -1.9, 330.8, 23.4, 7.27, 'Superior'),
    ],
    ultima_presentacion: 'En el 2T26 (5-ago-2026) la dirección cambió el foco del trimestre, que caía un 2 %, a la cartera: «acabamos de presentar dos de las solicitudes más importantes de la historia de las enfermedades pulmonares raras», ralinepag en comprimidos para la HAP y Tyvaso nebulizado para la fibrosis pulmonar idiopática (FPI), con aprobaciones posibles en 2027 que llama «catalizadores de varios miles de millones», y anunció para final de año la solicitud de ralinepag inhalado y la NDA de treprostinil en nebulizador de niebla fina [3]. El presidente y director de operaciones dijo que Tyvaso DPI terminó el trimestre en máximos de inicios, derivaciones y pacientes, y la empresa reconoció por escrito que «la disponibilidad de terapias competidoras afectó negativamente» a Tyvaso nebulizado, Tyvaso DPI y Remodulin [3]. En el 1T26 (6-may) el mensaje fue el mismo: crecimiento parado y catalizadores clínicos (ralinepag cumplió su objetivo en marzo; TETON-1 en marzo) [4]. El BPA del 2T (7,27 USD) batió al consenso por el tipo impositivo del 11 %, no por las ventas, que quedaron por debajo [3]. No hemos leído las transcripciones completas (de pago): las preguntas de los analistas no se recogen aquí.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja e inversiones financieras de 3.803,4 M USD a 30-jun-2026 (1.803,2 de efectivo, 859,1 de inversiones corrientes y 1.141,1 no corrientes) y línea de crédito no dispuesta de 2.500 M hasta abril de 2031 [2]. Después del balance: 477,6 M de la ASR de septiembre y 22,4 M de recompras en el 3T26 [10], y 175 M netos a cobrar de Liquidia en 30 días hábiles desde el 14-oct (con carta de crédito) más 145,4 M en enero y abril de 2027 [12].',
    rating: 'Sin calificación crediticia pública: no tiene bonos emitidos y la única financiación es la línea bancaria sin disponer [2].',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Sin deuda financiera desde el 2T25: se devolvieron 300 M de la línea de 2022 con la nueva línea de 2.500 M, que se repagó en el mismo trimestre [1, 2]. Los arrendamientos son operativos (US GAAP: fuera de la deuda). En otros pasivos no corrientes (212,0 M a 30-jun-2026) están el plan de pensiones complementario de directivos (SERP), contraprestaciones contingentes de compras del programa de órganos y pasivos fiscales [2]. Las ASR dejan un contrato a plazo: en la de septiembre de 2026 se entregó el 75 % de las acciones y el resto se liquida en el 4T26 (puede recibir más acciones o, en casos limitados, pagar) [10]. Litigios: el acuerdo con Liquidia cierra los seis pleitos y obliga a la empresa a pagar 10 M [12]; las demandas contra un antiguo directivo por secretos comerciales siguen [12]. La licencia de Adcirca de Lilly vence el 31-dic-2026 y obliga a recomprar el producto caducado de los distribuidores [1].',
    comentario: 'El balance es de caja neta: 4.697,0 M USD a fin de 2025 y 3.803,4 M a 30-jun-2026, tras 1.500 M de recompras aceleradas en marzo [2, 9]. Desde 2024 la empresa ha dedicado 4.000 M a recompras en dos años y medio (1.000 M en 2024, 1.000 M en 2025, 2.000 M en 2026), financiadas con caja libre y con la venta de inversiones; los intereses cobrados caen con ellas (31,5 M en el 2T26 frente a 51,3 M un año antes) [3, 10]. El circulante comercial (clientes + existencias − proveedores) es del 16-17 % de las ventas: dos distribuidores (Accredo, 51 %, y CVS Specialty, 36 %, en 2025) pagan a unos 40 días [1]. El inmovilizado neto casi se ha duplicado en dos años (1.045 M en 2023, 1.930 M a 30-jun-2026) por las granjas libres de patógenos para órganos de cerdo y la fabricación de Tyvaso DPI [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta: flujo operativo de 1.561,2 M USD en 2025 (117 % del beneficio neto) y de 776,9 M en el primer semestre de 2026 [1, 2]. El capex se ha disparado: 526,0 M en 2025 (16,5 % de las ventas, frente al 6-9 % de 2021-2024) y 208,8 M en el semestre más 104,1 M de altas sin pago [1, 2]: la empresa no separa mantenimiento de crecimiento, pero la mayor parte son las tres granjas de cerdos modificados para xenotrasplante (Virginia 2024, Minnesota agosto de 2026, Texas octubre de 2026) y la capacidad de Tyvaso DPI [2]; estimación propia: el capex de mantenimiento está cerca de la amortización (85,6 M, 2,7 % de las ventas). Caja libre de 2025: 1.035 M. Usos acumulados 2021-2025: 2.000 M en recompras, 89 M en compras de empresas, sin dividendos [7].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 23, opinion: 'Favorable (cuentas de 2025 y control interno), con un asunto clave sobre las estimaciones de descuentos y devoluciones de los precios públicos [1].',
    comentario: 'Cuentas sencillas: sin deuda, sin compras grandes y con ingresos de producto vendidos a dos distribuidores [1]. Lo que exige juicio es el paso de ventas brutas a netas (descuentos de Medicaid, Medicare y 340B), que el auditor revisa como asunto clave, y las reservas de inventario (en el 1T26 el coste de ventas subió a 133,4 M por reservas de Tyvaso DPI y en el 2T por pérdidas estimadas en un contrato de suministro) [1, 2, 3]. La remuneración en acciones es moderada (147,7 M, 11 % del beneficio neto de 2025) y ya no hay el plan de seguimiento de la acción pagado en caja (STAP) que movía el gasto entre años hasta 2024 [7, 8]. La dilución por opciones es alta: 45,8 M de acciones diluidas frente a 42,6 M básicas en el 2T26 (7,5 %), porque la cúpula tiene muchas opciones en el dinero [3]. El tipo impositivo de 2026 (12 % en el semestre) está rebajado por el ejercicio de esas opciones [3]. Lectura de los indicadores del motor: Altman y Piotroski se leen sin reparos con caja neta; el Beneish no tiene ajustes que hacer.',
    senales: [
      { senal: 'Dilución por opciones de la cúpula', nivel: 'Media', comentario: '3,2 M de acciones de diferencia entre básicas y diluidas en el 2T26; los directivos ejercieron y vendieron unos 1.440 M USD en 12 meses [3].' },
      { senal: 'Reservas de inventario de Tyvaso DPI', nivel: 'Baja', comentario: 'Subieron el coste de ventas del 1T26 (133,4 M frente a 92,5 M) y del 2T26 (7,5 M de pérdidas estimadas en un contrato de suministro) [3, 4].' },
      { senal: 'Tipo impositivo bajo por opciones', nivel: 'Baja', comentario: '11 % en el 2T26 frente al 24 % un año antes: beneficio fiscal no recurrente que infla el BPA de 2026 [3].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Tyvaso DPI', descripcion: 'Treprostinil inhalado en polvo seco (licencia de MannKind, regalía del 10 %); HAP y PH-ILD.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 731.1, resultado: null }, { periodo: '2024', ingresos: 1033.6, resultado: null }, { periodo: '2025', ingresos: 1292.5, resultado: null }] },
      { nombre: 'Tyvaso nebulizado', descripcion: 'Treprostinil inhalado con nebulizador; HAP y PH-ILD; en revisión para FPI.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 502.6, resultado: null }, { periodo: '2024', ingresos: 586.8, resultado: null }, { periodo: '2025', ingresos: 585.7, resultado: null }] },
      { nombre: 'Remodulin', descripcion: 'Treprostinil en infusión subcutánea o intravenosa (con genérico desde 2019).', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 494.8, resultado: null }, { periodo: '2024', ingresos: 538.1, resultado: null }, { periodo: '2025', ingresos: 526.8, resultado: null }] },
      { nombre: 'Orenitram', descripcion: 'Treprostinil oral de liberación prolongada.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 359.4, resultado: null }, { periodo: '2024', ingresos: 434.3, resultado: null }, { periodo: '2025', ingresos: 496.9, resultado: null }] },
      { nombre: 'Unituxin', descripcion: 'Dinutuximab para el neuroblastoma de alto riesgo.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 198.9, resultado: null }, { periodo: '2024', ingresos: 238.7, resultado: null }, { periodo: '2025', ingresos: 226.8, resultado: null }] },
      { nombre: 'Adcirca y otros', descripcion: 'Tadalafilo bajo licencia de Lilly (vence en dic-2026) y bombas y otros.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 40.7, resultado: null }, { periodo: '2024', ingresos: 45.9, resultado: null }, { periodo: '2025', ingresos: 54.0, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 95.4 }, { nombre: 'Resto del mundo', peso_pct: 4.6 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de Tyvaso DPI (M USD)', valor_anterior: '1.033,6 (2024)', valor_actual: '1.292,5 (2025)', variacion: '+25 %', comentario: '2T26: 326,6 M (+4 %), con precio +9,4 M y volumen +6,9 M [1, 3].' },
      { kpi: 'Ventas de Tyvaso nebulizado (M USD)', valor_anterior: '154,4 (2T25)', valor_actual: '126,0 (2T26)', variacion: '−18 %', comentario: 'Caída de volumen en EE. UU. de 37,6 M por la competencia [3].' },
      { kpi: 'Ventas de Remodulin (M USD)', valor_anterior: '134,7 (2T25)', valor_actual: '126,3 (2T26)', variacion: '−6 %', comentario: 'Volumen en EE. UU. −12,3 M [3].' },
      { kpi: 'Ventas de Orenitram (M USD)', valor_anterior: '123,9 (2T25)', valor_actual: '125,7 (2T26)', variacion: '+1 %', comentario: 'Genéricos autorizados desde junio y diciembre de 2027 [2].' },
      { kpi: 'Peso de los dos distribuidores', valor_anterior: '86 % (2024)', valor_actual: '87 % (2025)', variacion: '+1 pp', comentario: 'Accredo 51 % y CVS Specialty 36 % de los ingresos [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso (3T24-1T26)', tipo: 'Complemento', intentos: '1) Notas de resultados de la empresa (no dan consenso); 2) Yahoo Finance (solo el último trimestre); 3) titulares de Seeking Alpha (solo el 2T26)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, competencia (Winrevair, Yutrepia, genéricos), patentes, cartera clínica y órganos', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${ED}/000108255426000006/uthr-20251231.htm` },
  { id: 2, titulo: 'Pulmonary Arterial Hypertension (PAH) Drugs Market (8.400 M USD en 2025, 8.800 M en 2026, 12.100 M en 2034; TCAC 4,05 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://www.imarcgroup.com/pulmonary-arterial-hypertension-drugs-market' },
  { id: 3, titulo: 'Pulmonary Hypertension Drugs Market (8.690 M USD en 2025, 14.230 M en 2032; TCAC 7,3 %)', editor: 'Coherent Market Insights', tipo: 'Sectorial', fecha: '2025-04-10', url: 'https://www.coherentmi.com/industry-reports/pulmonary-hypertension-drugs-market/market-size' },
  { id: 4, titulo: 'Idiopathic Pulmonary Fibrosis Market (4.045,7 M USD en los 7 grandes mercados en 2025; 7.938,8 M en 2036; TCAC 6,34 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026-04-01', url: 'https://www.imarcgroup.com/report/en/idiopathic-pulmonary-fibrosis-market' },
  { id: 5, titulo: 'Merck Announces Second Quarter 2026 Financial Results (Winrevair 588 M USD, +75 %)', editor: 'Merck & Co. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/310158/000110465926090045/tm2621496d1_ex99-1.htm' },
  { id: 6, titulo: 'Liquidia Corporation Reports Second Quarter 2026 Financial Results (Yutrepia 170,4 M USD; beneficio neto 74,7 M)', editor: 'Liquidia Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-12', url: 'https://www.sec.gov/Archives/edgar/data/1819576/000110465926094411/tm2622888d1_ex99-1.htm' },
  { id: 7, titulo: 'Form 8-K: acuerdo de transacción con Liquidia (Yutrepia retira PH-ILD; pagos a United Therapeutics)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000110465926115723/tm2627546d1_ex99-1.htm` },
  { id: 8, titulo: 'United Therapeutics Soars 13% as Court Rules Yutrepia Infringes Its Patent (sentencia del 30-sep-2026, tribunal de Delaware, patente 327)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.tikr.com/blog/united-therapeutics-soars-13-as-court-rules-yutrepia-infringes-its-patent' },
  { id: 9, titulo: 'Form 10-Q del 2T26: acuerdos con genéricos de Tyvaso nebulizado (Watson, desde enero de 2026) y Orenitram (Actavis jun-2027, ANI dic-2027)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000108255426000027/uthr-20260630.htm` },
  { id: 10, titulo: 'TETON-1 Pivotal Study of Tyvaso Meets Primary Endpoint in IPF (+130,1 mL de FVC; conjunto +111,8 mL)', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-03-30', url: `${ED}/000110465926036445/tm2610558d1_ex99-1.htm` },
  { id: 11, titulo: 'Ralinepag Achieved 55% Reduction in Risk of Clinical Worsening in Pivotal PAH Study (ADVANCE OUTCOMES)', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-03-02', url: `${ED}/000110465926021869/tm267696d1_ex99-1.htm` },
  { id: 12, titulo: 'FDA Acceptance of Supplemental NDA for Nebulized Tyvaso to Treat IPF (revisión completa a finales de abril de 2027)', editor: 'United Therapeutics Corporation (relación con inversores)', tipo: 'Primaria', fecha: '2026-09-02', url: 'https://ir.unither.com/~/media/Files/U/United-Therapeutics-IR/documents/press-releases/2026/tyvaso-ipf-snda-acceptance-press-release.pdf' },
  { id: 13, titulo: 'United Therapeutics Expands Organ Manufacturing Capabilities with Opening of Third Designated Pathogen-Free Xenograft Production Facility', editor: 'United Therapeutics Corporation (relación con inversores)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://ir.unither.com/press-releases/2026/10-20-2026-120017904' },
  { id: 14, titulo: 'TETON-2 Pivotal Study of Tyvaso Meets Primary Endpoint for IPF (+95,6 mL de FVC)', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-09-02', url: `${ED}/000110465925085976/tm2524831d1_ex99-1.htm` },
  { id: 15, titulo: 'Nota de resultados del 2T26 (efecto de la competencia en Tyvaso y Remodulin; solicitudes de ralinepag y Tyvaso en FPI)', editor: 'United Therapeutics Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000108255426000028/uthrq22026-ex991.htm` },
];
// Serie del mercado: HAP (IMARC [2]) + FPI en los 7 grandes mercados (IMARC [4]); 2027e-2030e con sus TCAC (4,05 % y 6,34 %).
const hap = { 2025: 8400, 2026: 8800 }, fpi = { 2025: 4045.7 };
for (let a = 2027; a <= 2030; a++) hap[a] = hap[a - 1] * 1.0405;
for (let a = 2026; a <= 2030; a++) fpi[a] = fpi[a - 1] * 1.0634;
const serie = [2025, 2026, 2027, 2028, 2029, 2030].map((a) => ({ anio: a <= 2026 ? String(a) : `${a}e`, tamano: Math.round(hap[a] + fpi[a]) }));
const B_ = {
  _estado: 'Completa. Tamaño de mercado con IMARC (HAP y FPI) y Coherent (hipertensión pulmonar) leídos en la página original; competidores con sus notas de resultados; genéricos y patentes del 10-K y el 10-Q.',
  historia: {
    resumen: 'Martine Rothblatt, fundadora de SiriusXM, creó United Therapeutics en 1996 para buscar un tratamiento para la hipertensión arterial pulmonar (HAP) de su hija [1]. Compró a Glaxo los derechos del treprostinil y construyó sobre esa molécula toda la empresa: Remodulin en infusión (2002), Tyvaso nebulizado (2009), Orenitram oral (2013) y Tyvaso DPI en polvo seco con la tecnología de MannKind (2022) [1]. Diversificó con Unituxin para el neuroblastoma (2015) y, desde 2011, con un programa de órganos: pulmones ex vivo, riñones y corazones de cerdo modificados genéticamente y órganos fabricados (Miromatrix, 2023) [1]. En 2021 se convirtió en la primera biofarmacéutica cotizada con forma de corporación de beneficio público (PBC) y ese año amplió Tyvaso a la PH-ILD [1]. De 2025 a 2026 pasó de defender el treprostinil frente a Yutrepia y Winrevair a una nueva ola de cartera: TETON-1 y TETON-2 en FPI y ralinepag en HAP, y cerró la guerra judicial con Liquidia en octubre de 2026 [7, 10, 11, 14].',
    hitos: [
      { anio: '1996', hito: 'Martine Rothblatt funda United Therapeutics; salida al Nasdaq en 1999.' },
      { anio: '2002', hito: 'Aprobación de Remodulin (treprostinil en infusión) para la HAP.' },
      { anio: '2009', hito: 'Aprobación de Tyvaso nebulizado.' },
      { anio: '2013', hito: 'Aprobación de Orenitram, el primer prostaciclínico oral.' },
      { anio: '2019', hito: 'Llega el genérico de Remodulin (Sandoz); pérdida neta por cargos extraordinarios.' },
      { anio: '2021', hito: 'Conversión en corporación de beneficio público; Tyvaso aprobado en PH-ILD.' },
      { anio: '2022', hito: 'Aprobación y lanzamiento de Tyvaso DPI (licencia de MannKind).' },
      { anio: '2024-2025', hito: 'Llegan Winrevair (Merck, marzo de 2024) y Yutrepia (Liquidia, junio de 2025); 2.000 M USD en recompras.' },
      { anio: '2025-2026', hito: 'TETON-2 y TETON-1 positivos en FPI; ralinepag cumple su objetivo en HAP; solicitudes a la FDA presentadas.' },
      { anio: '2026', hito: 'Sentencia favorable en la patente 327 (30-sep) y acuerdo con Liquidia (14-oct): Yutrepia sale de la PH-ILD.' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'United Therapeutics vende cinco medicamentos para enfermedades raras, casi todo en EE. UU. (95,4 % de las ventas en 2025) [1]. Cuatro son formas de un mismo principio activo, el treprostinil, un análogo de la prostaciclina para la hipertensión arterial pulmonar (HAP) y para la hipertensión pulmonar por enfermedad pulmonar intersticial (PH-ILD): Tyvaso DPI (polvo seco inhalado, 1.292,5 M USD en 2025), Tyvaso nebulizado (585,7 M), Remodulin en infusión continua (526,8 M) y Orenitram oral (496,9 M) [1]. El quinto es Unituxin, un anticuerpo para el neuroblastoma infantil (226,8 M) [1]. Vende a dos farmacias especializadas, Accredo y CVS Specialty, que reparten el producto a los pacientes [1]. Tiene en revisión de la FDA Tyvaso nebulizado para la fibrosis pulmonar idiopática (FPI, decisión a finales de abril de 2027) y ralinepag, un agonista oral de una toma al día, para la HAP [12, 15]. Además invierte en un programa de órganos de cerdo modificados para trasplante (riñón y corazón en ensayos clínicos) y órganos fabricados, sin ventas [1, 13].',
    como_gana_dinero: 'Es un negocio de patentes y de márgenes altísimos: el coste de ventas fue el 12 % de los ingresos en 2025 y el margen operativo el 46,9 % [1]. Los ingresos son recurrentes: los pacientes de HAP toman el tratamiento de por vida y se cobra por unidad dispensada, con subidas de precio anuales (en el 2T26 el precio sumó 9,4 M a Tyvaso DPI) [15]. El margen depende de tres cosas: la mezcla (Tyvaso DPI paga un 10 % de regalía a MannKind), los descuentos públicos (Medicaid, 340B y Medicare) y el gasto en I+D, que incluye los órganos y fue el 17 % de las ventas [1]. El apalancamiento operativo es alto en las dos direcciones: con las ventas planas en 2026 el margen operativo cayó al 42 % [15]. Sin estacionalidad relevante, salvo las compras de los distribuidores.',
    clientes: 'Dos distribuidores concentran el 87 % de los ingresos (Accredo el 51 % y CVS Specialty el 36 % en 2025), pero el riesgo de crédito y de negociación es bajo: son intermediarios que cobran una comisión por servicio y el que decide es el médico y la aseguradora [1]. Los pacientes son crónicos (decenas de miles en EE. UU.; la PH-ILD afecta al menos a 30.000) y la HAP se trata de por vida, con tasas de abandono bajas salvo progresión [1]. Poder de precios demostrado: subidas anuales que en el 2T26 sumaron 9,4 M en Tyvaso DPI y compensaron parte de la caída de volumen del Tyvaso nebulizado [15]. El poder de precios es menor que antes: Medicare negocia ya precios de fármacos con años en el mercado (IRA) y Tyvaso y Remodulin compiten con alternativas [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante son los fármacos para la hipertensión pulmonar (HAP y PH-ILD) y, si se aprueba Tyvaso, para la fibrosis pulmonar idiopática. Usamos la HAP de IMARC (8.400 M USD en 2025, 8.800 M en 2026), que es la definición más estrecha y reciente, y la contrastamos con la de Coherent para toda la hipertensión pulmonar (8.690 M en 2025, TCAC del 7,3 % hasta 2032) [2, 3]. A ese perímetro sumamos la FPI de los siete grandes mercados (4.045,7 M en 2025, IMARC), porque desde 2027 Tyvaso puede competir en ella [4]. Con ese perímetro conjunto (12.446 M en 2025) la cuota de la empresa es del 25,6 % (3.182,7 M); en la HAP sola, de cerca del 35 %.',
    tamano: '≈ 12.450 M USD en 2025: HAP 8.400 M [2] más FPI en los 7 grandes mercados 4.046 M [4]',
    unidad_serie: 'millones de USD (HAP + FPI; 2027e-2030e con las TCAC de IMARC)',
    serie,
    tcac_historico_pct: null,
    tcac_previsto_pct: 4.9,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Diagnóstico y tratamiento combinado en la HAP', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de HAP de 8.400 M en 2025 a 12.100 M en 2034 (TCAC 4,05 %) [2].' },
      { driver: 'Nuevas indicaciones de la prostaciclina inhalada (PH-ILD, FPI)', efecto: '+', horizonte: 'Estructural', evidencia: 'TETON-1 +130,1 mL de FVC frente a placebo; FPI de 4.046 M en los 7 grandes mercados [4, 10].' },
      { driver: 'Nuevos mecanismos (sotatercept)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Winrevair vendió 588 M en el 2T26 (+75 %); se usa sobre todo encima de la prostaciclina, pero puede retrasarla [1, 5].' },
      { driver: 'Genéricos del treprostinil', efecto: '−', horizonte: 'Estructural', evidencia: 'Remodulin genérico desde 2019; Tyvaso nebulizado genérico autorizado desde enero de 2026 (sin aprobar aún); Orenitram desde junio de 2027 [9].' },
      { driver: 'Precios públicos (IRA, Medicare)', efecto: '−', horizonte: 'Estructural', evidencia: 'Negociación de precios de Medicare y descuentos obligatorios del 10-20 % en la parte D desde 2025 [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Yutrepia (170,4 M de ventas en el 2T26) y Winrevair (588 M) han parado el crecimiento de la empresa en 2026 [5, 6, 15].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Dos distribuidores con el 87 % de las ventas, pero el poder real lo tienen las aseguradoras y Medicare [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'MannKind fabrica parte de Tyvaso DPI y cobra un 10 % de regalía; el resto se fabrica en casa [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras regulatorias altas, pero las formulaciones 505(b)(2) del treprostinil (Yutrepia) entran con ensayos pequeños [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Sotatercept, selexipag y combinaciones orales pueden retrasar o sustituir la prostaciclina [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Es un mercado de enfermedades raras sin ciclo económico: la demanda depende del diagnóstico y de los lanzamientos. En 2008-09 y en 2020 las ventas de la empresa siguieron creciendo; el bache de 2018-2019 (ingresos de 1.725 a 1.449 M) lo causó el genérico de Remodulin y la competencia de Uptravi, no la economía [1]. Hoy el mercado crece (inhalados un 40 % desde el lanzamiento de Yutrepia, según Liquidia) y el riesgo es de cuota y de patentes, no de ciclo [6].' },
    regulacion: 'Tres frentes con fechas. (1) FDA: decisión sobre Tyvaso en FPI a finales de abril de 2027 y sobre ralinepag en 2027 (NDA presentada en el 3T26) [12, 15]. (2) Genéricos: el acuerdo con Watson permite Tyvaso nebulizado genérico desde enero de 2026 si la FDA lo aprueba; Actavis y ANI pueden vender Orenitram genérico desde junio y diciembre de 2027; las patentes de fabricación del treprostinil vencen en 2028 y las de Tyvaso DPI en 2030 y 2035; la de PH-ILD (327) en 2042 [1, 9]. (3) Precios: la IRA permite a Medicare negociar precios y castiga las subidas por encima de la inflación [1].',
    tendencias: 'La prostaciclina pasa de inyectada a inhalada y oral: Tyvaso DPI y Yutrepia crecen y el nebulizado y Remodulin caen [15]. Sotatercept (Merck) se ha convertido en el gran crecimiento de la HAP (588 M en un trimestre) y se usa sobre todo en pacientes ya tratados con prostaciclina, lo que de momento suma más que resta, pero sus ensayos en fases tempranas pueden adelantar su uso [1, 5]. La FPI se abre a fármacos nuevos (TETON, nerandomilast) [10]. La empresa gana con la inhalación y la FPI; pierde con los genéricos orales y nebulizados. El programa de órganos (tercera granja abierta el 20-oct-2026) es una opción a más de cinco años [13].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 25.6,
    posicion: 'Líder mundial en prostaciclinas para la HAP y única aprobada en PH-ILD en inhalación tras el acuerdo con Liquidia; 25,6 % del perímetro HAP + FPI de 2025 y cerca del 35 % de la HAP sola [2, 4, 7].',
    competidores: [
      { nombre: 'Merck (Winrevair)', pais: 'EE. UU.', ticker: 'MRK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Winrevair (sotatercept), inhibidor de la activina en inyección subcutánea: 588 M en el 2T26 (+75 %); combina con la prostaciclina [5].' },
      { nombre: 'Liquidia (Yutrepia)', pais: 'EE. UU.', ticker: 'LQDA', ingresos: 686.8, cuota_pct: null, margen_ebit_pct: null, comentario: 'Treprostinil en polvo seco; 170,4 M de ventas en el 2T26 (686,8 M anualizados) y 74,7 M de beneficio; desde el acuerdo, solo HAP [6, 7].' },
      { nombre: 'Johnson & Johnson (Actelion)', pais: 'EE. UU.', ticker: 'JNJ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Uptravi (selexipag), Opsumit y Opsynvi: el rival oral de Orenitram y de ralinepag [1].' },
      { nombre: 'Genéricos del treprostinil (Sandoz y otros)', pais: 'Varios', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Remodulin genérico desde 2019; Tyvaso nebulizado (Watson) y Orenitram (Actavis, ANI) autorizados por acuerdos [9].' },
      { nombre: 'Boehringer Ingelheim (Ofev) y Roche (Esbriet)', pais: 'Alemania y Suiza', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Los antifibróticos de la FPI con los que Tyvaso se combinará (TETON permitía tratamiento de fondo) [10].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fármaco.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Pacientes crónicos estables que no se cambian sin motivo, pero Yutrepia captó 5.000 pacientes en 13 meses [6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Patente 327 de PH-ILD hasta 2042, confirmada el 30-sep-2026; Tyvaso DPI hasta 2030-2035; datos de TETON y ralinepag [1, 8].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Coste de ventas del 12 % y escala comercial en treprostinil; los genéricos la anulan en las formas sin patente [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mercado nicho (decenas de miles de pacientes) donde dos o tres proveedores de inhalados bastan [1].' },
      ],
    },
    amenazas: 'Tres amenazas con fecha. (1) Genéricos: Orenitram (496,9 M en 2025) puede tener genérico desde junio de 2027 y Tyvaso nebulizado desde que la FDA apruebe el de Watson; las patentes de fabricación vencen en 2028 [1, 9]. (2) Yutrepia en HAP: sigue vendiendo en HAP sin limitación y Liquidia espera más de 1.000 M de ventas en 2027 [6, 7]. (3) Sotatercept: si se adelanta en la línea de tratamiento, retrasa la prostaciclina. Probabilidad alta de erosión del treprostinil a partir de 2027-2028; el foso depende de la PH-ILD (patente hasta 2042), de la FPI y de ralinepag.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material son el acceso y el precio de los medicamentos (el 95 % de las ventas es en EE. UU. y depende de Medicare, Medicaid y 340B), la seguridad del producto y el bienestar animal y la bioseguridad del programa de xenotrasplante: granjas de cerdos modificados libres de patógenos en Virginia, Minnesota y Texas, con placas solares en las tres [1, 13]. Como corporación de beneficio público, la empresa tiene la obligación legal de equilibrar el beneficio del accionista con su propósito (terapias nuevas y órganos para trasplante) [1].',
    controversias: 'Litigios de patentes y secretos comerciales con Liquidia desde 2020, cerrados el 14-oct-2026 salvo la demanda a un antiguo directivo [7]. No hemos encontrado sanciones de reguladores en los últimos tres años en el 10-K [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y web de la empresa (no publica calificaciones); 2) MSCI y Sustainalytics (requieren registro); 3) búsqueda en prensa', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct y tcac_historico_pct', tipo: 'Complemento', intentos: '1) IMARC y Coherent (sin cuotas gratuitas); 2) 10-K de la empresa (no da cuotas); 3) notas de competidores (no publican la de su clase)', decision: 'Omitido' },
  ],
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas, ratio salarial', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000108255426000009/uthr-20260428.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 26-jun-2026 (consejeros, remuneración, plan de acciones 2026)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-06-29', url: `${ED}/000110465926078865/tm2619258d1_8k.htm` },
  { id: 3, titulo: 'Form 4 de directivos y consejeros de United Therapeutics (21-oct-2025 a 21-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001082554&type=4&dateb=&owner=include&count=40' },
  { id: 4, titulo: 'Form 8-K: nombramiento de Kevin J. Tracey como consejero', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-01-22', url: `${ED}/000110465926005810/tm263500d1_8k.htm` },
  { id: 5, titulo: 'Form 8-K: nombramiento de Victor Dzau como consejero', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000110465926086068/tm2620809d1_ex99-1.htm` },
  { id: 6, titulo: 'Form 10-K 2025: corporación de beneficio público, empleados, código de conducta', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${ED}/000108255426000006/uthr-20251231.htm` },
];
const pers = F4.personas || [];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta de 2026 y de los nombramientos, Form 4 de 12 meses (322 presentaciones). La empresa no publica guía numérica: historial de guía sin datos.',
  directivos: {
    equipo: [
      { nombre: 'Martine Rothblatt', cargo: 'Fundadora, presidenta y consejera delegada', desde: '1996', participacion_pct: 6.5, trayectoria: 'Fundó SiriusXM y United Therapeutics (1996). Ha llevado la empresa de cero a 3.182,7 M USD de ventas en 2025 con cuatro formas del treprostinil y la ha convertido en corporación de beneficio público; impulsa el programa de órganos [1, 6].' },
      { nombre: 'Michael Benkowitz', cargo: 'Presidente y director de operaciones', desde: '2016', participacion_pct: null, trayectoria: 'Entró en 2011 como vicepresidente ejecutivo de desarrollo organizativo y es presidente y director de operaciones desde 2016; lleva ventas, acceso al mercado, fabricación y, desde 2025, la fabricación comercial y la perfusión pulmonar ex vivo [1].' },
      { nombre: 'James Edgemond', cargo: 'Director financiero y tesorero', desde: '2015', participacion_pct: 1.0, trayectoria: 'Entró en 2013 como tesorero y es director financiero desde marzo de 2015; antes, controller y tesorero de Clark Construction Group [1].' },
      { nombre: 'Paul Mahon', cargo: 'Vicepresidente ejecutivo y director jurídico', desde: null, participacion_pct: null, trayectoria: 'Director jurídico; ha llevado los litigios con Liquidia hasta la sentencia del 30-sep-2026 y el acuerdo del 14-oct [1].' },
      { nombre: 'Christopher Patusky', cargo: 'Vicepresidente del consejo y consejero independiente coordinador', desde: '2002', participacion_pct: null, trayectoria: 'Fundador de Patusky Associates; consejero desde 2002 [1].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo muy estable: la fundadora lleva 30 años, el presidente diez y el director financiero once [1]. La empresa no da guía anual de ventas ni de beneficio, así que la credibilidad se mide con la cartera: TETON-2, TETON-1 y ralinepag cumplieron su objetivo principal en siete meses y las dos solicitudes a la FDA se presentaron en plazo (verano de 2026) [6]. El riesgo es de sucesión: Rothblatt tiene 71 años y es a la vez presidenta y consejera delegada; el proxy dice que hay plan de sucesión, sin nombre [1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Martine Rothblatt', cargo: 'Presidenta y consejera delegada', tipo: 'Ejecutivo', desde: '1996', comisiones: '—' },
      { nombre: 'Christopher Patusky', cargo: 'Vicepresidente; consejero coordinador', tipo: 'Independiente', desde: '2002', comisiones: 'Remuneración' },
      { nombre: 'Christopher Causey', cargo: 'Consejero', tipo: 'Independiente', desde: '2003', comisiones: 'Auditoría; Nombramientos y Gobierno (presidente)' },
      { nombre: 'Richard Giltner', cargo: 'Consejero', tipo: 'Independiente', desde: '2009', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Ray Kurzweil', cargo: 'Consejero', tipo: 'Independiente', desde: '2002', comisiones: '—' },
      { nombre: 'Jan Malcolm', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Linda Maxwell', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Remuneración' },
      { nombre: 'Nilda Mesa', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Remuneración' },
      { nombre: 'Judy Olian', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría' },
      { nombre: 'Louis Sullivan', cargo: 'Consejero', tipo: 'Independiente', desde: '2002', comisiones: 'Remuneración' },
      { nombre: 'Tommy Thompson', cargo: 'Consejero', tipo: 'Independiente', desde: '2010', comisiones: 'Auditoría' },
      { nombre: 'Kevin Tracey', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
      { nombre: 'Victor Dzau', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 97.1, voto_remuneracion_contra_pct: 2.9, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 18.04, fijo: 1.55, variable_corto: 4.28, variable_largo: 12.14, ratio_salario_medio: 76 },
    remuneracion: 'La consejera delegada cobró 18,0 M USD en 2025 (23,0 M en 2024): 1,5 M de fijo, 4,3 M de variable anual y 12,1 M en opciones y unidades de acciones [1]. El variable a largo plazo es 100 % por objetivos a tres años: las opciones dependen del margen de caja a tres años y las unidades de acciones, al 50 % del crecimiento de ingresos y al 50 % de hitos de I+D [1]. Premia la rentabilidad (margen de caja) y la cartera; no tiene objetivo de rentabilidad para el accionista. La remuneración se aprobó con el 97,1 % de los votos en 2026 (más del 95 % en 2025) [1, 2]. Ratio con el empleado medio: 76 a 1 [1]. Tiene política de recuperación (clawback) [1]. El plan de acciones de 2026 (1,5 M de acciones nuevas) solo tuvo el 71,2 % a favor [2].',
    accionistas: [
      { nombre: 'BlackRock', pct: 12.5, tipo: 'Institucional', variacion: 'Declarado a 10-abr-2026' },
      { nombre: 'Avoro Capital Advisors', pct: 6.8, tipo: 'Fondo especializado en biotecnología', variacion: 'Declarado a 10-abr-2026' },
      { nombre: 'Martine Rothblatt (con opciones ejercitables)', pct: 6.5, tipo: 'Fundadora y consejera delegada', variacion: 'Ejerce y vende opciones con plan 10b5-1 (905 M USD vendidos en 12 meses)' },
      { nombre: 'Wellington Management', pct: 5.8, tipo: 'Institucional', variacion: 'Declarado a 10-abr-2026' },
      { nombre: 'Consejeros y directivos (16 personas)', pct: 8.6, tipo: 'Insiders (con opciones)', variacion: '—' },
    ],
    insiders: [
      { fecha: '2025-10-21 a 2026-10-19', persona: 'Martine Rothblatt (consejera delegada)', operacion: 'Venta', acciones: 1709075, importe: 905.16 },
      { fecha: '2025-10-21 a 2026-10-19', persona: 'James Edgemond (director financiero)', operacion: 'Venta', acciones: 398267, importe: 211.57 },
      { fecha: '2025-10-21 a 2026-10-19', persona: 'Michael Benkowitz (presidente)', operacion: 'Venta', acciones: 419440, importe: 197.44 },
      { fecha: '2025-10-21 a 2026-10-19', persona: 'Paul Mahon (director jurídico)', operacion: 'Venta', acciones: 221000, importe: 113.74 },
      { fecha: '2025-10-21 a 2026-10-19', persona: 'Martine Rothblatt (consejera delegada)', operacion: 'Compra', acciones: null, importe: 0.86 },
    ],
    control_y_defensas: 'No hay accionista de control: la fundadora tiene un 6,5 % contando opciones y el primer accionista es BlackRock (12,5 %) [1]. Una acción, un voto; elección anual de todos los consejeros con mayoría; acceso de los accionistas a proponer consejeros [1]. La defensa singular es la forma jurídica: como corporación de beneficio público de Delaware, el consejo debe equilibrar el interés del accionista con el propósito público (terapias y órganos) y eso le da argumentos para rechazar una oferta o para gastar en órganos aunque no rinda a corto plazo [6]. Consejo largo en el cargo: seis consejeros llevan más de 15 años; la renovación ha empezado (Tracey y Dzau en 2026) [1, 4, 5].',
    alertas: [
      'Ventas de directivos de 1.442 M USD en 12 meses, casi todas ejercicio y venta de opciones con planes 10b5-1; la consejera delegada vendió 905 M [3].',
      'Presidenta y consejera delegada a la vez, con 71 años y sin sucesor nombrado [1].',
      'Corporación de beneficio público: el consejo no está obligado a maximizar solo el valor para el accionista [6].',
      'El plan de acciones de 2026 tuvo un 27,9 % de votos en contra (10,1 M de 36,2 M) [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Núcleo', intentos: '1) Notas de resultados 2021-2026 (sin guía numérica); 2) 10-K y proxy (objetivos internos de remuneración sin cifras de ingresos); 3) prensa (la empresa no da guía)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const u = Y.UTHR;
const comps = ['VRTX', 'REGN', 'NBIX', 'INCY', 'BIIB', 'JAZZ', 'EXEL', 'BMRN', 'GILD', 'HALO'];
const nombres = { VRTX: 'Vertex', REGN: 'Regeneron', NBIX: 'Neurocrine', INCY: 'Incyte', BIIB: 'Biogen', JAZZ: 'Jazz Pharmaceuticals', EXEL: 'Exelixis', BMRN: 'BioMarin', GILD: 'Gilead', HALO: 'Halozyme' };
const pais = { JAZZ: 'IE' };
const empresas = comps.map((t) => {
  const d = Y[t]; const y1 = d.trend.find((x) => x.periodo === '+1y');
  return {
    nombre: nombres[t], ticker: t, pais: pais[t] ?? 'US', capitalizacion: Math.round(d.cap / 1e6),
    ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(d.per_adelantado),
    crecimiento_pct: y1?.crec_ventas != null ? r1(y1.crec_ventas * 100) : null, margen_ebitda_pct: r1(d.ebitda / d.ventas * 100),
    roic_pct: null, dn_ebitda: r2((d.ev - d.cap) / d.ebitda), fcf_yield_pct: null,
  };
});
const pers_ = empresas.map((e) => e.per_ntm).sort((a, b) => a - b);
const perMed = r1((pers_[4] + pers_[5]) / 2);
const fD = [
  { id: 1, titulo: 'Históricos diarios de UTHR, SPY e IBB (precio, rango, rentabilidades, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/UTHR/history' },
  { id: 2, titulo: 'Consenso de United Therapeutics y de los comparables (estimaciones, recomendaciones, objetivos, capitalización, valor empresa, EBITDA)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/UTHR/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026&page&_format=csv' },
  { id: 4, titulo: 'Implied Equity Risk Premium by month (ERP T12m with sustainable payout, octubre de 2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Form 10-Q del 2T26 (42.890.692 acciones a 29-jul-2026; acciones diluidas del trimestre 45,8 M)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000108255426000027/uthr-20260630.htm` },
  { id: 6, titulo: 'Form 8-K: ASR de 477,6 M USD (entrega inicial del 75 % al cierre del 8-sep-2026; 42,9 M de acciones a 4-sep)', editor: 'United Therapeutics Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${ED}/000110465926105953/tm2624887d1_ex99-1.htm` },
  { id: 7, titulo: 'Form 8-K de Neurocrine: cierre de la compra de Soleno Therapeutics (2.900 M USD)', editor: 'Neurocrine Biosciences (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: 'https://www.sec.gov/Archives/edgar/data/914475/000119312526228013/d94926d8k.htm' },
  { id: 8, titulo: 'Johnson & Johnson closes landmark Intra-Cellular Therapies acquisition (14.600 M USD)', editor: 'Johnson & Johnson', tipo: 'Primaria', fecha: '2025-04-02', url: 'https://www.jnj.com/media-center/press-releases/johnson-johnson-closes-landmark-intra-cellular-therapies-acquisition-to-solidify-neuroscience-leadership' },
  { id: 9, titulo: 'Jazz Pharmaceuticals to acquire GW Pharmaceuticals (7.200 M USD)', editor: 'Jazz Pharmaceuticals', tipo: 'Primaria', fecha: '2021-02-03', url: 'https://investor.jazzpharma.com/news-releases' },
  { id: 10, titulo: 'Company facts XBRL de Intra-Cellular Therapies (ingresos 2024: 680,9 M USD) y de GW Pharmaceuticals (2020: 527,2 M USD)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001567514.json' },
  { id: 11, titulo: 'Seeking Alpha, titulares de UTHR (Goldman Sachs inicia con Vender el 24-sep-2026; BPA del 2T26 batió en 0,41 USD y las ventas fallaron en 21,35 M)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/UTHR.xml' },
  { id: 12, titulo: 'JPMorgan eleva el objetivo de United Therapeutics a 687 USD (consenso medio de 648,33 USD a 23-jul-2026)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.marketbeat.com/instant-alerts/jpmorgan-chase-co-raises-united-therapeutics-nasdaquthr-price-target-to-68700-2026-07-23/' },
];
const rec = u.reco;
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (553,88 USD); la sesión del 21-oct no ha abierto (Nueva York abre a las 13:30 UTC). Comparables con Yahoo (misma fuente y fecha); mediana del PER NTM ${perMed}.`,
  identificacion: {
    nombre: 'United Therapeutics Corporation', nombre_corto: 'United Therapeutics', ticker: 'UTHR', isin: 'US91307C1027', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500 (SPY)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Biotecnología', sede: 'Silver Spring (Maryland) y Research Triangle Park (Carolina del Norte)', fundacion: '1996', empleados: 1400, web: 'www.unither.com',
    precio: 553.88, fecha_precio: '2026-10-20', acciones: 45.2, capitalizacion_publicada: Math.round(u.cap / 1e6), free_float_pct: 91.4,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'La empresa no publica guía anual de ventas ni de beneficio [5]. Sus objetivos son de cartera: decisión de la FDA sobre Tyvaso en FPI a finales de abril de 2027, aprobación posible de ralinepag en 2027, solicitud de ralinepag inhalado y NDA de treprostinil en niebla fina antes de fin de 2026, y lanzamiento de dos granjas de órganos en 2026 (abiertas en agosto y octubre) [5].',
    estimaciones: [
      { periodo: '2026e', ingresos: 3196, ebitda: null, ebit: null, bpa: 26.60, dpa: 0, fuente: `Yahoo Finance, ${u.trend.find((x) => x.periodo === '0y').n} analistas, 21-oct-2026 [2]` },
      { periodo: '2027e', ingresos: 3640, ebitda: null, ebit: null, bpa: 31.72, dpa: 0, fuente: `Yahoo Finance, ${u.trend.find((x) => x.periodo === '+1y').n} analistas, 21-oct-2026 [2]` },
    ],
    recomendaciones: { n_analistas: rec.strongBuy + rec.buy + rec.hold + rec.sell + rec.strongSell, comprar: rec.strongBuy + rec.buy, mantener: rec.hold, vender: rec.sell + rec.strongSell, po_medio: r2(u.po_medio), po_min: u.po_min, po_max: u.po_max },
    revisiones: 'El BPA de 2026 del consenso bajó de 26,91 a 26,60 USD en 90 días y el de 2027 subió de 31,49 a 31,72 USD [2]: el mercado ha rebajado el año en curso (ventas planas, menos intereses tras las recompras) y ha subido 2027 tras la sentencia del 30-sep y el acuerdo con Liquidia, que devuelven la PH-ILD a Tyvaso. En julio, JPMorgan subió su objetivo a 687 USD y el consenso medio era de 648,33 USD [12]; el 24-sep Goldman Sachs empezó a cubrirla con Vender [11]. Solo Yahoo publica gratis estimaciones completas (dos años, sin EBITDA): el objetivo y las recomendaciones se contrastan con MarketBeat.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: r1(u.corto_pct * 100),
    comentario: 'La acción ha rendido un 23,8 % anual en cinco años frente al 12,6 % del S&P 500 y el 6,1 % del índice de biotecnología (IBB) [1]. El último año (+31,1 %) lo explican tres saltos con causa: +32,8 % el 2-sep-2025 (TETON-2), +12,5 % el 30-mar-2026 (TETON-1) y +12,5 % el 30-sep-2026 (sentencia de la patente 327) [1]. En medio, la acción cayó un 33 % de noviembre de 2024 a julio de 2025 por Yutrepia y Winrevair, y en 2026 se ha movido de lado (−3,4 % en seis meses) con las ventas planas [1]. Beta baja (0,50 mensual; 0,67 ajustada) y volatilidad alta (34,5 %): la acción se mueve por hechos propios (ensayos y juicios), no por el mercado.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: B.cierres_ejercicio.find((x) => x.anio === a).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'La empresa ha cotizado casi siempre barata frente a su beneficio por el riesgo de patentes del treprostinil: un PER al cierre de 12-15 veces en 2021-2025, con mínimos de 9-11 veces en 2023 (miedo a Yutrepia) [1]. Hoy, a 553,88 USD, el PER sobre el beneficio de los últimos doce meses es de unas 20 veces (27,95 USD) [1]: la prima frente a su historia descuenta que la FPI y ralinepag compensen los genéricos de 2027-2028. Ha cambiado algo estructural: la caja neta ha bajado (de 4.900 M en 2023 a 3.800 M tras las recompras) y el crecimiento a corto se ha parado.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Biofarmacéuticas de EE. UU. rentables, con franquicias en enfermedades raras o especialidad y riesgo de patentes parecido: Vertex, Regeneron, Neurocrine, Incyte, Biogen, Jazz, Exelixis, BioMarin, Gilead y Halozyme. No usamos Merck (conglomerado) ni Liquidia (un producto, beneficio de un año). Todos con datos de Yahoo del 21-oct-2026 (cierre del 20-oct) [2]. El EBITDA NTM no está disponible gratis en la misma base: solo EV/EBITDA LTM y PER NTM.',
    empresas,
    comentario: `United Therapeutics cotiza a ${r1(u.per_adelantado)} veces el BPA de los próximos 12 meses del consenso, por encima de la mediana de los comparables (${perMed} veces) y en línea con Gilead, Exelixis y Merck [2]. Su margen EBITDA (47 %) es de los más altos del grupo y su crecimiento esperado en 2027 (+13,9 % del consenso) también, pero la calidad de ese crecimiento depende de aprobaciones (FPI, ralinepag) y de que los genéricos de Orenitram y Tyvaso nebulizado no lo anulen. Vertex (25,5 veces) es el único que justifica una prima clara por crecimiento con patentes largas. Usaríamos el PER: el EV/EBITDA de los comparables mezcla definiciones de EBITDA y ajustes.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'Soleno Therapeutics (VYKAT XR)', comprador: 'Neurocrine Biosciences', ev: 2324, ev_ventas: 12.2, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Enfermedad rara con un producto en lanzamiento; 2.829,9 M menos la caja; 12,2 veces las ventas de 2025 [7].' },
      { fecha: '2025-04', objetivo: 'Intra-Cellular Therapies (CAPLYTA)', comprador: 'Johnson & Johnson', ev: 14600, ev_ventas: 21.4, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Producto en crecimiento con patentes largas; sobre ventas de 2024 de 680,9 M [8, 10].' },
      { fecha: '2021-05', objetivo: 'GW Pharmaceuticals (EPIDIOLEX)', comprador: 'Jazz Pharmaceuticals', ev: 7200, ev_ventas: 13.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Un producto para enfermedad rara; sobre ventas de 2020 de 527,2 M [9, 10].' },
    ],
    comentario: 'Las compras de biofarmacéuticas de un producto con patentes largas se pagan a 12-21 veces las ventas [7-10], frente a 7,4 veces que cotiza United Therapeutics (valor empresa ≈ 21.100 M sobre 3.155 M de ventas LTM, Yahoo [2]). La diferencia es el perfil: esas empresas crecían deprisa con patentes hasta la década de 2030 y la nuestra tiene genéricos en 2027-2028. Una oferta es poco probable: la estructura de corporación de beneficio público y una fundadora al mando lo hacen difícil, y la empresa es compradora (recompras), no vendedora.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones 2028e y EBITDA', tipo: 'Complemento', intentos: '1) Yahoo Finance (solo 2026 y 2027, sin EBITDA); 2) MarketScreener (la página abre otra empresa); 3) Investing y MarketBeat (solo objetivos)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm, roic_pct y fcf_yield_pct', tipo: 'Complemento', intentos: '1) Yahoo Finance (no da EBITDA NTM ni ROIC); 2) Stock Analysis (sin EBITDA NTM gratuito); 3) cuentas de cada comparable (fuera del presupuesto de tiempo)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $UTHR (30 mensajes, 14 a 21-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/UTHR.json' },
  { id: 2, titulo: 'Seeking Alpha: análisis de autores sobre UTHR («The Market Sees The Erosion, Not The Refill - Buy», «Strong Catalyst Flow», «Trifecta Of 2026 Tyvaso Franchise Filings»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-27', url: 'https://seekingalpha.com/api/sa/combined/UTHR.xml' },
  { id: 3, titulo: 'Seeking Alpha: titulares y noticias de UTHR y Liquidia (sentencia, acuerdo, Goldman Sachs Vender)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/UTHR/news' },
];
const E = {
  _estado: 'Completa con lo que abre: Stocktwits (API), Seeking Alpha (RSS de análisis y noticias). Reddit y los foros de Seeking Alpha no abren.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($UTHR)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Euforia por el acuerdo con Liquidia («la PH-ILD vuelve a ser terreno de United Therapeutics») y debate cruzado con accionistas de Liquidia y de MannKind, que dependen de Tyvaso DPI [1].' },
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'Los autores recomiendan comprar por los catalizadores de 2027 (FPI y ralinepag): «el mercado ve la erosión y no el relleno» [2].' },
      { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-10', n_comentarios: 10, tono: 'Dividido', resumen: 'La sentencia y el acuerdo se celebran, pero Goldman Sachs empezó a cubrirla con Vender el 24-sep y las ventas del 2T fallaron [3].' },
    ],
    temas: [
      { tema: 'Liquidia y la PH-ILD', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: Yutrepia deberá retirar la PH-ILD y Liquidia pagará 330,4 M; pero sigue en HAP, donde Liquidia espera más de 1.000 M en 2027.' },
      { tema: 'Catalizadores de 2027 (FPI y ralinepag)', postura: 'Alcista', peso: 'Alto', contraste: 'Los ensayos fueron claros (TETON-1 +130,1 mL; ralinepag −55 % de empeoramiento), pero la FDA no dio revisión prioritaria a la FPI (decisión a finales de abril de 2027).' },
      { tema: 'Erosión por genéricos y Winrevair', postura: 'Bajista', peso: 'Medio', contraste: 'Exageran poco: Orenitram tiene genérico autorizado desde junio de 2027 y las ventas de 2026 caen un 2 %.' },
      { tema: 'Recompras y ventas de la fundadora', postura: 'Dividida', peso: 'Bajo', contraste: 'Ambas son ciertas: 4.000 M de recompras y 905 M de ventas de la consejera delegada (ejercicio de opciones).' },
    ],
    lectura: 'El sentimiento de los particulares es positivo y mejora tras la sentencia del 30-sep y el acuerdo del 14-oct, en línea con el consenso de analistas (11 de 15 recomiendan comprar). No es euforia extrema: la acción está un 7 % por debajo de su máximo de mayo. El riesgo que los foros minimizan es el de los genéricos de 2027-2028 y la competencia de Yutrepia en HAP, que este informe sí recoge. Ninguna cifra del informe sale de aquí.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables', perMed, empresas.map((e) => e.ticker + ' ' + e.per_ntm).join(', '));
