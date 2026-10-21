// Escribe las notas A-E de Amphenol (APH, corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del XBRL
// de la SEC (cuentas-xbrl.json), de bolsa.json (Yahoo, cierre del 20-oct-2026), de yahoo-datos.json (Yahoo quoteSummary
// del 21-oct-2026, sesión abierta) y de las fuentes web leídas. Cada nota cita solo con [n] de su propia lista de fuentes.
// Split 2 por 1 efectivo el 2-sep-2026 (y antes en marzo de 2021 y junio de 2024): todas las cifras por acción y el número
// de acciones van en acciones de HOY (tras el split de 2026).
// Ejecutar: node informes/amphenol-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const r3 = (x) => (x == null ? null : Math.round(x * 1000) / 1000);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/820313';

// Factor de split hasta acciones de hoy: el XBRL da cada año como se publicó en el 10-K más reciente que lo incluye.
// 2016-2018 (10-K 2018, antes del split de 2021): ×8; 2019-2021 (10-K 2021, tras el de 2021): ×4; 2022-2025 (10-K 2024/2025, tras el de 2024): ×2.
const FS = { 2016: 8, 2017: 8, 2018: 8, 2019: 4, 2020: 4, 2021: 4, 2022: 2, 2023: 2, 2024: 2, 2025: 2 };

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: cuentas, segmentos, mercados finales, adquisiciones, deuda, impuestos, riesgos', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000110465926013549/aph-20251231x10k.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, deuda, compra de CommScope CCS, segmentos, geografías', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000110465926089194/aph-20260630x10q.htm` },
  { id: 3, titulo: 'Form 10-Q del 1T26 (31-mar-2026): asunto fiscal en China, CCS', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: `${ED}/000110465926054128/aph-20260331x10q.htm` },
  { id: 4, titulo: 'Amphenol Reports Record Second Quarter 2026 Results (pedidos, conciliación GAAP-ajustado, guía del 3T26)', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-29', url: `${ED}/000110465926087904/aph-20260729xex99d1.htm` },
  { id: 5, titulo: 'Amphenol Reports Record First Quarter 2026 Results', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000110465926050984/aph-20260429xex99d1.htm` },
  { id: 6, titulo: 'Amphenol Reports Record Fourth Quarter and Full Year 2025 Results', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-28', url: `${ED}/000110465926007259/aph-20260128xex99d1.htm` },
  { id: 7, titulo: 'Notas de resultados del 1T, 2T y 3T de 2025', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-22', url: `${ED}/000110465925101429/aph-20251022xex99d1.htm` },
  { id: 8, titulo: 'Notas de resultados anuales 2020-2024 (BPA ajustado de cada ejercicio y crecimiento orgánico)', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-01-22', url: `${ED}/000155837025000305/aph-20250122xex99d1.htm` },
  { id: 9, titulo: 'Hechos XBRL de Amphenol (companyfacts): cuenta, balance y flujos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000820313.json' },
  { id: 10, titulo: 'Amphenol Announces Two-for-One Stock Split and Third Quarter 2026 Dividend; 8-K del 4-sep-2026 (split efectuado)', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000110465926091969/tm2622441d1_ex99-1.htm` },
  { id: 11, titulo: 'Amphenol Q2 2026 Earnings Call Transcript', editor: 'Earnings Whispers', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://earningswhispers.com/transcript/APH/Q22026' },
  { id: 12, titulo: 'APH 1Q26 AI Summary (guía del 2T26, tipo impositivo e intereses)', editor: 'Platform Aeronaut', tipo: 'Prensa', fecha: '2026-04-29', url: 'https://transcripts.platformaeronaut.com/summaries/APH-1Q26-AI-Summary' },
  { id: 13, titulo: 'Amphenol to acquire Connectivity and Cable Solutions business from CommScope; Amphenol completes acquisition of CCS', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-12', url: `${ED}/000110465925073344/tm2522435d1_ex99-1.htm` },
];

const cuenta = X.financieros.cuenta.map((c) => {
  const f = FS[c.periodo];
  const o = { ...c }; delete o.fin;
  o.bpa = r3(c.bpa / f); o.dpa = r3(c.dpa / f); o.acciones_diluidas = r1(c.acciones_diluidas * f); o.dpa_extraordinario = 0;
  if (c.periodo === '2021') { o.minoritarios = 10.7; } // XBRL sin dato; 10,7 M de la nota de resultados 4T21 (1.590,8 incluye 21,4 de actividades interrumpidas: MTS)
  return o;
});
const balanceH = X.balance.historico.map((b) => { const o = { ...b }; delete o.fin; o.arrendamientos = 0; return o; });
const flujosH = X.flujos.historico.map((b) => { const o = { ...b }; delete o.fin; o.pagos_arrendamientos = 0; return o; });

// LTM a 30-jun-2026 = 2025 + 1S26 − 1S25 [6, 4]
const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: r1(23094.7 + 16378.2 - 10461.3), ebitda: r1(5868.6 + 4416.4 - 2443.6 + 922.4 + 827.2 - 445.7),
  ebit: r1(5868.6 + 4416.4 - 2443.6), beneficio_neto: r1(4270.3 + 2702.2 - 1829.1), bpa: r3((3.34 + 2.10 - 1.44) / 2), dpa: r3((0.165 + 0.25 + 0.25 + 0.25) / 2), dpa_extraordinario: 0,
  fcf: r1(5374.7 - 996.6 + 14.8 + 2036.7 - 1701.7), participadas_en_ebitda: null, no_recurrentes_en_ebitda: -80,
};

const A = {
  _estado: 'Completa. Cuentas 2016-2025 del XBRL de la SEC comprobadas con los 10-K y las notas de resultados; BPA, DPA y acciones pasados a acciones de hoy (split 2:1 de sep-2026, y los de 2021 y 2024). LTM a 30-jun-2026.',
  financieros: {
    cuenta,
    ltm,
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Andrew (redes móviles de CommScope, 2.023 M USD, desde el 31-ene-2025) y Trexon (1.050 M USD, desde nov-2025) entran en la cuenta; además, el balance de cierre lleva la caja (11.131 M) y la deuda emitida para pagar CCS, que se cerró el 9-ene-2026 y no está en la cuenta de 2025 [1, 13].' },
      { periodo: '2024', descripcion: 'CIT (Carlisle Interconnect Technologies, 2.025 M USD) consolidada desde mayo de 2024: entra en balance y en ocho meses de cuenta [1].' },
      { periodo: '2021', descripcion: 'MTS Systems (abril de 2021; se quedó la parte de sensores y vendió la de ensayos) y Halo: compras por 2.225 M USD en el año [8].' },
    ],
    comentario: 'Las ventas pasaron de 6.286 M USD en 2016 a 23.095 M en 2025 (+52 % en 2025, +38 % orgánico) y a 29.012 M en los doce meses a junio de 2026 [1, 4, 9]. Hasta 2023 el crecimiento era de un dígito alto con compras (2023: −1 % en dólares); el salto de 2024-2026 lo explica el mercado de centros de datos (IT datacom pasó del ≈ 20 % de las ventas en 2023 al 36 % en 2025 y al 43 % en el 2T26) y una racha de compras: CIT, Andrew, Trexon y CommScope CCS (10.500 M USD, la mayor de su historia) [1, 2, 11]. En el 1S26 el crecimiento fue del 57 %, del que 24 puntos son compras y 32 orgánicos [4]. El margen operativo pasó del 20,4 % de 2023 al 25,4 % de 2025 y al 29,5 % del 2T26 (29,8 % ajustado, con 80 M de devolución de aranceles IEEPA) por volumen, mezcla de productos de alta velocidad y apalancamiento operativo [4, 6]. 2025 no es comparable en balance (caja y deuda de CCS prefinanciadas) y 2026 llevará un año completo de CCS (4.600 M de ventas previstas) [4].',
    ajustes: 'El BPA ajustado de la empresa excluye los gastos de adquisición, el aumento de valor de existencias compradas, el beneficio fiscal de las opciones ejercidas y partidas fiscales discretas, pero NO excluye la amortización de intangibles comprados: por eso el ajustado y el publicado casi coinciden (2025: 3,34 USD antes del split en los dos) [1, 6]. En el 1S26 el publicado (2,10 antes del split) quedó por debajo del ajustado (2,42) por 290 M de devengos fiscales en China (decisiones desfavorables de inspecciones de años anteriores, 230 M de avisos de pago más 160 M por reestimar otros años) y 132 M de revalorización de existencias de CCS [3, 4]. El LTM lleva un ingreso no recurrente de 80 M por la devolución de aranceles IEEPA (2T26), que se resta en no_recurrentes_en_ebitda [4]. El análisis usa el BPA ajustado, en acciones de hoy, para la historia del PER y la regla a 12 meses.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 4038.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(819.5 + 201.2), margen_ebitda_pct: r1((819.5 + 201.2) / 4038.8 * 100), bpa: 0.25, vs_consenso: null },
      { periodo: '4T24', ingresos: 4317.9, crecimiento_pct: 30, crecimiento_organico_pct: 20, ebitda: r1(953.7 + 143.8), margen_ebitda_pct: r1((953.7 + 143.8) / 4317.9 * 100), bpa: 0.275, vs_consenso: null },
      { periodo: '1T25', ingresos: 4811.0, crecimiento_pct: 48, crecimiento_organico_pct: 33, ebitda: r1(1024.8 + 236.3), margen_ebitda_pct: r1((1024.8 + 236.3) / 4811 * 100), bpa: 0.315, vs_consenso: null },
      { periodo: '2T25', ingresos: 5650.3, crecimiento_pct: 57, crecimiento_organico_pct: 41, ebitda: r1(1418.8 + 209.4), margen_ebitda_pct: r1((1418.8 + 209.4) / 5650.3 * 100), bpa: 0.405, vs_consenso: null },
      { periodo: '3T25', ingresos: 6194.4, crecimiento_pct: 53, crecimiento_organico_pct: 41, ebitda: r1(1702.3 + 227.7), margen_ebitda_pct: r1((1702.3 + 227.7) / 6194.4 * 100), bpa: 0.465, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 6439.0, crecimiento_pct: 49, crecimiento_organico_pct: 37, ebitda: r1(1722.7 + 249.0), margen_ebitda_pct: r1((1722.7 + 249) / 6439 * 100), bpa: 0.485, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 7620.1, crecimiento_pct: 58, crecimiento_organico_pct: 33, ebitda: r1(1831.8 + 485.8), margen_ebitda_pct: r1((1831.8 + 485.8) / 7620.1 * 100), bpa: 0.53, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 8758.1, crecimiento_pct: 55, crecimiento_organico_pct: 30, ebitda: r1(2584.6 + 341.4), margen_ebitda_pct: r1((2584.6 + 341.4) / 8758.1 * 100), bpa: 0.675, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'BPA ajustado en acciones de hoy (el publicado entonces, dividido por el split de sep-2026); EBITDA = resultado operativo publicado + amortizaciones del estado de flujos [4-7]. «vs consenso» con el BPA estimado de Yahoo antes de cada resultado (3T25 0,40 frente a 0,465; 4T25 0,47 frente a 0,485; 1T26 0,47 frente a 0,53; 2T26 0,60 frente a 0,675).\n\nEn la conferencia del 2T26 (29-jul) la dirección habló de «la revolución de la electrónica»: IT datacom fue el 43 % de las ventas, +89 % en dólares y +63 % orgánico, con IA creciendo más que eso y la inferencia más que el entrenamiento; los clientes «necesitan más de todo» (cobre de alta velocidad, fibra y potencia) y la única dependencia que reconoce es que siga la inversión [11]. Pedidos récord de 10.732 M (relación pedidos/ventas 1,23) y CommScope por encima del plan (4.600 M de ventas y 0,30 USD de BPA en 2026, antes 4.100 M y 0,15) por mejoras de fábrica y de compras, no por precio [4, 11]. Frente al 1T26 (pedidos de 9.400 M, relación 1,24, tipo impositivo ajustado del 27 % por China e intereses de ≈ 200 M por trimestre) el discurso pasó de integrar CCS a capacidad: inversión en el máximo del 3-4 % de las ventas [11, 12]. Los analistas preguntaron por la parte de fibra en las ventas de IA, la arquitectura de los bastidores (cobre frente a óptica), cuellos de botella en fibra y la inversión de CCS; la dirección no desglosó la fibra en IA, no aisló la inversión de CCS y evitó hablar de programas de clientes concretos [11].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [
      { anio: '2026', importe: 0 }, { anio: '2027', importe: 2884.5 }, { anio: '2028', importe: 2068.5 }, { anio: '2029', importe: 3167.9 }, { anio: '2030', importe: 1898.9 }, { anio: '2031+', importe: 8901.0 },
    ],
    liquidez: 'Caja e inversiones a corto 5.419 M USD a 30-jun-2026 y línea de crédito revolvente sin disponer; liquidez total de ≈ 8.400 M según la dirección [2, 11].',
    rating: 'Grado de inversión: papel comercial A-2 (S&P) y P-2 (Moody\'s) [1]; S&P subió la calificación a largo plazo a A- en mayo de 2026 según prensa (sin el informe de la agencia).',
    coste_deuda_pct: 4.5,
    vida_media_anios: 6.5,
    otros_pasivos: 'Deuda bruta de 18.811 M USD a 30-jun-2026 (1.634 M a corto): bonos en dólares y euros de 2027 a 2055 y dos préstamos de la compra de CCS (934 M a 364 días y 1.534 M a tres años) [2]. Pensiones: 158,9 M de obligaciones netas en el balance [2]. Arrendamientos operativos de 649 M de pagos futuros (US GAAP: dentro del EBITDA, fuera de la deuda) [1]. Impuestos: 230 M de avisos de pago en China ya devengados y 160 M más por reestimar años anteriores (1T26); la inspección sigue y puede haber más [3]. Sin pagos aplazados de compras relevantes, sin factoring declarado. Los covenants del crédito y de los préstamos se cumplen con holgura según la empresa [1, 2].',
    comentario: 'La deuda neta era casi nula antes de CCS (2024: 3.569 M, 0,96 veces el EBITDA) y saltó a 13.392 M a junio de 2026 (deuda 18.811 − caja e inversiones 5.419), 1,3 veces el EBITDA según la dirección [2, 11]. El circulante comercial sube con las ventas: clientes de 4.717 a 6.790 M y existencias de 3.425 a 4.552 M en seis meses (con CCS), y restó 1.176 M de caja en el 1S26 [2]. Con el flujo libre actual (≈ 4.700 M en doce meses) la deuda neta de CCS se paga en unos tres años sin cortar el dividendo [4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'La conversión es buena: el flujo libre (operativo − inversión neta) fue de 4.393 M USD en 2025, el 103 % del beneficio neto, y de 2.037 M en el 1S26 (75 % del beneficio, con 1.176 M de circulante consumido por el crecimiento) [4, 6]. La inversión pasó del 2,5-3 % de las ventas en 2016-2023 al 4,3 % en 2025 y al 4,0 % en el 1S26, en el máximo del rango del 3-4 % que da la dirección, por capacidad para IT datacom [1, 4, 11]. Estimación propia: el mantenimiento es ≈ la depreciación del inmovilizado (≈ 2,5 % de las ventas) y el resto es crecimiento. Las compras consumieron 3.819 M en 2025 y 10.684 M en el 1S26 (CCS), financiadas con bonos, préstamos y caja [2]. Recompras modestas (665 M en 2025) y dividendos crecientes (802 M en 2025) [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: 29, opinion: 'Favorable (sin salvedades) en 2025, con el control interno también favorable [1].',
    comentario: 'Cuentas limpias y conservadoras: el BPA ajustado de la empresa no quita la amortización de intangibles comprados, la remuneración en acciones es baja (135 M en 2025, 0,6 % de las ventas) y no hay deterioros de fondo de comercio en la historia de la empresa [1]. Tres asuntos a vigilar: (1) el fondo de comercio y los intangibles (22.844 M a junio de 2026) superan ya al patrimonio (15.492 M), por CCS [2]; (2) los devengos fiscales en China (390 M entre el 4T25 y el 1T26) muestran que el tipo impositivo histórico del 20-24 % tenía riesgo [3]; (3) el ajustado resta el beneficio fiscal de las opciones ejercidas (247 M en 2025), que se repite cada año con los directivos ejerciendo opciones [1]. Los indicadores del motor (Altman Z, Piotroski F y Beneish M) se leen con cautela en 2024-2025, años con compras grandes y caja prefinanciada.',
    senales: [
      { senal: 'Fondo de comercio e intangibles por encima del patrimonio', nivel: 'Media', comentario: '22.844 M frente a 15.492 M a jun-2026 tras CCS (10.736 M de activos netos comprados, 7.008 M de fondo de comercio) [2].' },
      { senal: 'Devengos fiscales en China', nivel: 'Media', comentario: '100 M en el 4T25 y 290 M en el 1T26 (avisos de pago de 230 M y reestimación de otros años); tipo ajustado guiado al 27 % frente al 24,5 % de 2025 [3, 12].' },
      { senal: 'Beneficio fiscal de opciones excluido del ajustado', nivel: 'Baja', comentario: '247 M en 2025 y 131 M en el 1S26: el ajustado es algo más prudente que el publicado [1, 4].' },
      { senal: 'Circulante creciente', nivel: 'Baja', comentario: 'Clientes +44 % y existencias +33 % en el 1S26 con ventas +57 %: acorde con el crecimiento y con CCS [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: crecer (inversión e I+D), comprar empresas y devolver caja con dividendo y recompras [1]. Dividendo trimestral de 0,25 USD antes del split (0,125 después) desde el 3T25, +52 % sobre los 0,165 anteriores; programa de recompra de 2.000 M hasta abril de 2027, del que se han usado 386 M en el 1S26 [2, 10]. Tras CCS la caja se dedica a bajar deuda; la dirección no ha anunciado recompras extraordinarias [11].',
    adquisiciones: [
      { anio: '2026', objetivo: 'CommScope CCS (fibra óptica para centros de datos, banda ancha y edificios)', importe: 10593, ev_ebitda: 11.2, financiacion: 'Bonos de nov-2025, préstamos a 364 días y tres años y caja', resultado: 'Ventas previstas en 2026 de 4.600 M frente a 4.100 M al cerrar y BPA +0,30 USD frente a +0,15 (antes del split); IT datacom pasa a casi la mitad de sus ventas [4, 11, 13].' },
      { anio: '2025', objetivo: 'Trexon (cables y conectores de alta fiabilidad para defensa)', importe: 1050, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Integrado en Harsh Environment, que creció un 22 % orgánico en el 1S26 [1, 2].' },
      { anio: '2025', objetivo: 'Andrew (antenas exteriores y DAS de CommScope)', importe: 2023, ev_ebitda: 7.0, financiacion: 'Caja y deuda', resultado: 'Comunicaciones sigue débil en orgánico (−6 % en el 2T26): la compra aporta volumen, no crecimiento [1, 11].' },
      { anio: '2024', objetivo: 'CIT (interconexión para aeronáutica y defensa, de Carlisle)', importe: 2156, ev_ebitda: 11.3, financiacion: 'Caja, bonos de abril de 2024 y papel comercial', resultado: 'Base del crecimiento de defensa y aeronáutica (+24 % y +21 % orgánico en el 2T26) [1, 11].' },
      { anio: '2023', objetivo: 'Varias (PCTEL, Airmar, otras)', importe: 970, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin deterioros [1].' },
      { anio: '2021', objetivo: 'MTS Systems (sensores; vendió la parte de ensayos) y Halo', importe: 2225, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Sensores integrados en Interconnect and Sensor Systems, el segmento que menos crece (+15 % orgánico en el 1S26) [8, 2].' },
      { anio: '2016', objetivo: 'FCI (conectores, Francia)', importe: 1305, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Hoy parte de la gama de alta velocidad [9].' },
    ],
    comentario: 'Amphenol es un comprador en serie disciplinado: ha invertido ≈ 21.000 M USD en compras desde 2016, sin un solo deterioro, y las grandes (CIT, Andrew, CCS) se pagaron a 7-11 veces el EBITDA, por debajo de su propio múltiplo [1, 13]. El crecimiento del BPA ajustado de 0,47 USD (2019) a 1,67 (2025) en acciones de hoy viene a la vez de compras y de crecimiento orgánico; la dilución es baja (acciones diluidas de 2.522 M en 2016 a 2.555 M en 2025, con las recompras compensando las opciones) [9]. CCS rompe el patrón: es una compra grande y apalancada (deuda neta de ≈ 0 a 13.392 M) justo en el pico del ciclo de centros de datos; por ahora ha salido mejor de lo previsto [4].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Communications Solutions', descripcion: 'Conectores de alta velocidad, radiofrecuencia, potencia y fibra, cables y antenas para IT datacom, móviles, redes y automóvil; incluye CCS desde 2026.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 4912.8, resultado: 1063.5 }, { periodo: '2024', ingresos: 6323.8, resultado: 1569.6 }, { periodo: '2025', ingresos: 12056.0, resultado: 3746.6 }] },
      { nombre: 'Harsh Environment Solutions', descripcion: 'Interconexión robusta para industria, defensa, aeronáutica y automóvil; circuitos impresos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 3530.8, resultado: 943.9 }, { periodo: '2024', ingresos: 4417.4, resultado: 1093.2 }, { periodo: '2025', ingresos: 5881.7, resultado: 1541.4 }] },
      { nombre: 'Interconnect and Sensor Systems', descripcion: 'Sensores y sistemas de interconexión con valor añadido para automóvil, industria y centros de datos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 4111.1, resultado: 753.7 }, { periodo: '2024', ingresos: 4481.5, resultado: 825.9 }, { periodo: '2025', ingresos: 5157.0, resultado: 1005.1 }] },
      { nombre: 'Corporativo y ajustes', descripcion: 'Remuneración en acciones, gastos de adquisición, revalorización de existencias compradas y otros gastos no asignados.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 0, resultado: -201.5 }, { periodo: '2024', ingresos: 0, resultado: -331.8 }, { periodo: '2025', ingresos: 0, resultado: -424.5 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 34.6 }, { nombre: 'China', peso_pct: 15.9 }, { nombre: 'Resto del mundo', peso_pct: 49.5 }],
    geografias_criterio: 'destino',
    clientes: 'Muy diversificada: ningún cliente llegó al 10 % de las ventas en 2023-2025; vende a fabricantes, subcontratistas (EMS y ODM), operadores y nubes, y un 19 % a través de distribuidores [1]. La exposición real a las cuatro grandes nubes y a Nvidia es mayor de lo que dice esa cifra, porque buena parte llega a través de ODM y fabricantes de servidores: IT datacom fue el 36 % de las ventas en 2025 y el 43 % en el 2T26 [1, 11]. Poder de precios: el margen operativo ajustado subió 420 puntos básicos en un año (25,6 % → 29,8 % en el 2T26) con ventas al alza y sin que la dirección lo atribuya a precio; la integración de CCS mejoró por fábrica y compras [4, 11]. La relación pedidos/ventas de 1,23-1,24 en 2026 da visibilidad de unos meses, no de años [4, 5].',
    kpis: [
      { kpi: 'Pedidos (M USD, trimestre)', valor_anterior: '5.520 (2T25)', valor_actual: '10.732 (2T26)', variacion: '+94 %', comentario: 'Relación pedidos/ventas 1,23 [4, 11]' },
      { kpi: 'Crecimiento orgánico', valor_anterior: '13 % (2024)', valor_actual: '38 % (2025); 30 % (2T26)', variacion: '+25 puntos', comentario: 'Sin divisa ni compras [1, 4]' },
      { kpi: 'IT datacom (% de ventas)', valor_anterior: '36 % (2025)', valor_actual: '43 % (2T26)', variacion: '+7 puntos', comentario: '+63 % orgánico en el 2T26 [1, 11]' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '26,2 % (2025)', valor_actual: '29,8 % (2T26)', variacion: '+3,6 puntos', comentario: '≈ 29 % sin la devolución de aranceles IEEPA [4, 11]' },
      { kpi: 'BPA ajustado (USD, acciones de hoy)', valor_anterior: '0,945 (2024)', valor_actual: '1,67 (2025)', variacion: '+77 %', comentario: '1S26: 1,21 frente a 0,72 [4, 6]' },
      { kpi: 'Flujo libre (M USD)', valor_anterior: '2.157 (2024)', valor_actual: '4.393 (2025)', variacion: '+104 %', comentario: '2.037 en el 1S26 [4, 6]' },
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento del 3T24 y consenso antes de los resultados de 3T24 a 2T25', tipo: 'Complemento', intentos: '1) Notas de resultados de 2025 (solo comparan con el año anterior); 2) Yahoo earningsHistory (solo cuatro trimestres); 3) MarketBeat (sin histórico gratuito)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, mercados finales (peso de cada uno en las ventas), competencia, estrategia', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000110465926013549/aph-20251231x10k.htm` },
  { id: 2, titulo: 'Bishop reveals Top 10 connector manufacturers (ventas de conectores 2024 y mercado mundial de 86.480 M USD)', editor: 'Passive Components Blog (Bishop & Associates)', tipo: 'Sectorial', fecha: '2025-12-05', url: 'https://passive-components.eu/bishop-reveals-top-10-connector-manufacturers/' },
  { id: 3, titulo: 'Analysis of the World\'s Top 100 Electronic Connector Manufacturers (2025: 81.386 M USD de los 100 primeros, 82,1 % del mercado)', editor: 'Bishop & Associates (vía GII Research)', tipo: 'Sectorial', fecha: '2026-08-12', url: 'https://www.giiresearch.com/report/bs2110463-analysis-worlds-top-100-electronic-connector.html' },
  { id: 4, titulo: 'Connector Market Size, 2025-2035 (75.000 M USD en 2025; 3,7 % anual hasta 2035)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026-03', url: 'https://gminsights.com/industry-analysis/connector-market' },
  { id: 5, titulo: 'Datos de mercado de TE Connectivity, Hirose, JAE, Corning y otros (ventas, márgenes y estimaciones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/TEL/' },
  { id: 6, titulo: '«Magnificent 7» earnings rush reveals AI spending surge, with hyperscaler capex set to reach $725 billion in 2026', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-08-01', url: 'https://finance.yahoo.com/markets/article/magnificent-7-earnings-rush-reveals-ai-spending-surge-with-hyperscaler-capex-set-to-reach-725-billion-in-2026-224901707.html' },
  { id: 7, titulo: 'Amphenol Q2 2026 Earnings Call Transcript', editor: 'Earnings Whispers', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://earningswhispers.com/transcript/APH/Q22026' },
  { id: 8, titulo: 'Form 10-Q del 2T26: ventas por segmento, geografía y canal', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000110465926089194/aph-20260630x10q.htm` },
  { id: 9, titulo: 'Amphenol rises after Jefferies assumes coverage with Buy (óptica frente a cobre en los bastidores de IA)', editor: 'Stockopedia', tipo: 'Prensa', fecha: '2026-06', url: 'https://www.stockopedia.com/share-prices/amphenol-NYQ:APH/news/amphenol-rises-after-jefferies-assumes-coverage-with-apos-buy-apos-rating-019e6a19-2ee2-7c4e-9d84-e901a1ba7015/' },
  { id: 10, titulo: 'Amphenol Corp ESG Risk Rating', editor: 'Morningstar Sustainalytics', tipo: 'Datos de mercado', fecha: '2025-01', url: 'https://sustainalytics.com/esg-rating/amphenol-corp/1007903073' },
  { id: 11, titulo: 'Amphenol Corporation ESG ratings (MSCI BBB, según el agregador)', editor: 'KnowESG', tipo: 'Datos de mercado', fecha: '2026', url: 'https://knowesg.com/esg-ratings/amphenol-corporation' },
];
const usdjpy = 158.132;
const B_ = {
  _estado: 'Completa. Mercado de conectores de Bishop (2024 y 2025) y de GMI; competidores con datos de Yahoo y de Bishop.',
  sector: {
    definicion: 'Mercado relevante: conectores y sistemas de interconexión electrónicos en todo el mundo (conectores, cables ensamblados, fibra óptica de interconexión), el perímetro de Bishop & Associates, que es la referencia del sector y la que usa la propia industria para las cuotas [2, 3]. Amphenol vende además sensores y antenas (≈ 15-20 % de sus ventas) que quedan fuera. Se usa Bishop y no Global Market Insights (75.000 M USD en 2025) porque GMI mide un perímetro más estrecho y no da cuotas comparables [4].',
    tamano: '≈ 99.200 M USD en 2025 (81.386 M de los 100 primeros fabricantes, el 82,1 % del total; estimación propia del total) y 86.480 M en 2024 [2, 3]',
    unidad_serie: 'millones de USD (ventas mundiales de conectores, Bishop & Associates)',
    serie: [{ anio: '2024', tamano: 86480 }, { anio: '2025', tamano: 99169 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 3.7,
    cr5_pct: 42.6,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Inversión en centros de datos de IA', efecto: '+', horizonte: 'Cíclico', evidencia: 'Las cuatro grandes nubes invertirán ≈ 725.000-785.000 M USD en 2026 y más de un billón en 2027 según los analistas [6]; IT datacom creció un 63 % orgánico en el 2T26 [7].' },
      { driver: 'Contenido electrónico por equipo (velocidad, potencia, fibra)', efecto: '+', horizonte: 'Estructural', evidencia: 'Cada generación de servidores de IA pide más cobre de alta velocidad, más fibra y más potencia: «necesitan más de todo» [7].' },
      { driver: 'Electrificación del automóvil y la industria', efecto: '+', horizonte: 'Estructural', evidencia: 'Automóvil 15 % e industria 19 % de las ventas de 2025; industria +18 % orgánico en el 2T26 [1, 7].' },
      { driver: 'Gasto en defensa', efecto: '+', horizonte: 'Estructural', evidencia: 'Defensa 9 % de las ventas en 2025 y +24 % orgánico en el 2T26 [1, 7].' },
      { driver: 'Ciclo de existencias de distribuidores y fabricantes', efecto: '−', horizonte: 'Cíclico', evidencia: 'En 2023 las ventas de Amphenol cayeron un 1 % y el orgánico fue negativo tras el exceso de existencias de 2022 [1].' },
      { driver: 'Óptica integrada (CPO) frente a cobre en los bastidores', efecto: '+/−', horizonte: 'Estructural', evidencia: 'El mercado castigó a la acción por miedo a que la óptica sustituya al cobre; Jefferies cree que el cobre domina al menos dos años más [9]. Con CCS Amphenol vende también la fibra.' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'TE Connectivity (14,9 % del mercado en 2024) y Amphenol (13,3 %) lideran; detrás, Molex (5,6 %), Aptiv, Foxconn Interconnect y Luxshare, que compiten en precio en móviles y servidores [2]. Márgenes altos de los líderes (TE ≈ 21 % operativo) indican rivalidad moderada [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Ningún cliente pasa del 10 % de las ventas de Amphenol, pero en centros de datos compran pocas nubes y fabricantes de servidores con mucho volumen [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Metales (cobre, oro), plásticos y fibra; la dirección dice tener asegurada la fibra de CCS y no ve cuellos de botella [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hay que estar en el diseño desde el principio, con calificaciones largas en defensa, aeronáutica y automóvil; los chinos (Luxshare) entran en volumen [1, 2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Óptica integrada en el chip (CPO) y cambios de arquitectura de Nvidia pueden quitar cobre o cables de los bastidores; Amphenol cubre ambas tecnologías [7, 9].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Pedidos récord (relación pedidos/ventas 1,23-1,24 en los dos primeros trimestres de 2026) y crecimiento orgánico del 30-41 % durante seis trimestres indican expansión avanzada en centros de datos [4, 7, 8]. En 2009 las ventas de conectores cayeron con fuerza; en 2020 Amphenol creció un 5 %; en 2023 cayeron un 1 % por el ajuste de existencias tras 2022 [1]. Comunicaciones (−6 % orgánico) y automóvil (+6 %) van más flojos que IA y defensa [7].' },
    regulacion: 'Aranceles de EE. UU.: la empresa recuperó 80 M USD de aranceles IEEPA en el 2T26 y los aranceles a China, México y Asia siguen siendo un riesgo de coste y de precio [8]. Controles de exportación de tecnología a China (el 16 % de las ventas de 2025 se envía a China) y sanciones [1]. Inspecciones fiscales en China con 390 M USD devengados [8]. No hay regulación sectorial específica de precios.',
    tendencias: 'La IA multiplica el contenido de interconexión por bastidor (cobre de alta velocidad dentro del bastidor, fibra entre bastidores, potencia) y Amphenol gana con las dos tecnologías desde que compró CCS [7]. El riesgo es la óptica integrada en el chip (CPO), que en 2028-2030 podría quitar parte del cobre; los rivales chinos (Luxshare, Foxconn Interconnect) ganan cuota en volumen [2, 9]. En automóvil, la electrificación sube el contenido aunque las ventas de coches no crezcan [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 13.3,
    posicion: '2.º fabricante mundial de conectores, con el 13,3 % del mercado en 2024 (11.511 M USD de ventas de conectores), detrás de TE Connectivity (14,9 %) [2]; con CCS y el crecimiento de 2025-2026 probablemente ya es el primero (estimación propia, sin ranking de 2025 publicado).',
    competidores: [
      { nombre: 'TE Connectivity', pais: 'Suiza/EE. UU.', ticker: 'TEL', ingresos: 12884, cuota_pct: 14.9, margen_ebit_pct: r1(Y.TEL.margen_op * 100), comentario: 'Líder en automóvil e industria; menos expuesto a centros de datos. Ingresos = ventas de conectores de 2024 (Bishop); margen operativo de los últimos doce meses del grupo (19.322 M de ventas) [2, 5].' },
      { nombre: 'Molex (Koch Industries)', pais: 'EE. UU.', ticker: null, ingresos: 4872, cuota_pct: 5.6, margen_ebit_pct: null, comentario: 'No cotiza; fuerte en centros de datos, móviles y medicina [2].' },
      { nombre: 'Aptiv (conectores)', pais: 'Irlanda', ticker: 'APTV', ingresos: 4637, cuota_pct: 5.4, margen_ebit_pct: null, comentario: 'Casi solo automóvil; sin margen de la línea de conectores [2].' },
      { nombre: 'Foxconn Interconnect Technology', pais: 'Taiwán', ticker: '6088.HK', ingresos: 2950, cuota_pct: 3.4, margen_ebit_pct: null, comentario: 'Cables y conectores para servidores y móviles de Hon Hai; compite en precio [2].' },
      { nombre: 'Luxshare Precision', pais: 'China', ticker: '002475.SZ', ingresos: 2643, cuota_pct: 3.1, margen_ebit_pct: null, comentario: 'Gana cuota en cables de alta velocidad para servidores de IA [2].' },
      { nombre: 'Hirose Electric', pais: 'Japón', ticker: '6806.T', ingresos: Math.round(Y['6806.T'].ventas / 1e6 / usdjpy), cuota_pct: null, margen_ebit_pct: r1(Y['6806.T'].margen_op * 100), comentario: 'Conectores de precisión para móviles e industria; ventas de doce meses convertidas a 158,13 JPY/USD [5].' },
      { nombre: 'Japan Aviation Electronics (JAE)', pais: 'Japón', ticker: '6807.T', ingresos: Math.round(Y['6807.T'].ventas / 1e6 / usdjpy), cuota_pct: 1.5, margen_ebit_pct: r1(Y['6807.T'].margen_op * 100), comentario: 'Décimo del ranking de 2024 (1.263 M en conectores); margen hundido en los últimos doce meses [2, 5].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: el producto no gana valor con más usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Se diseña con el cliente desde el inicio de cada plataforma; en defensa, aeronáutica y automóvil la calificación de un conector dura años [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Tecnología de alta velocidad, potencia y fibra (CCS); 6.400 empleados en I+D a finales de 2025 [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Fabricación en ≈ 40 países con costes bajos y unidades de negocio pequeñas y autónomas; margen operativo del 25-30 % frente al ≈ 21 % de TE [1, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Segundo del mundo con el 13,3 % de un mercado de ≈ 99.000 M; la gama más amplia de la industria [2, 3].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el foso es tecnológico: si la óptica integrada en el chip (CPO) llega antes de lo previsto, o si Nvidia cambia la arquitectura de sus bastidores (en 2024 ya se temió que cambiara cables por placas), parte del contenido de cobre de Amphenol desaparece [9]. Probabilidad media a 3-5 años; CCS (fibra) lo mitiga. Segundo, la competencia china en cables de alta velocidad (Luxshare) presiona precios en volumen [2]. Tercero, la concentración de la demanda de IA en pocas nubes da poder de negociación a esos clientes.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Amphenol diseña y fabrica conectores, cables, antenas y sensores: las piezas que unen y alimentan los componentes de un equipo electrónico. Vende a siete mercados finales: IT datacom (servidores, redes y centros de datos de IA, 36 % de las ventas de 2025 y 43 % en el 2T26), industria (19 %), automóvil (15 %), redes de comunicaciones (10 %), defensa (9 %), móviles (6 %) y aeronáutica comercial (5 %) [1, 7]. Los clientes son fabricantes, subcontratistas y operadores de todo el mundo; el 34,6 % de las ventas se envía a EE. UU. y el 15,9 % a China. Fabrica en ≈ 40 países con ≈ 170.000 empleados, organizados en tres divisiones y muchas unidades de negocio pequeñas con su propio director general [1].',
    como_gana_dinero: 'Cobra por pieza o por cable ensamblado; casi nada es recurrente por contrato, pero cada diseño ganado se vende durante toda la vida de la plataforma del cliente (años en automóvil y defensa, 1-2 años por generación en servidores) [1]. El margen depende del volumen (fábricas con costes fijos), de la mezcla (alta velocidad, potencia y fibra para IA son las de más margen: Communications Solutions ganó un 33,6 % en el 2T26 frente al 21,0 % de sensores) y del coste del cobre y del oro [8]. El apalancamiento operativo es alto: con ventas +55 % el margen operativo subió 4,4 puntos en el 2T26 [8]. Poca estacionalidad.',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie de 5-8 años del mercado de conectores (Bishop) y TCAC histórico', tipo: 'Complemento', intentos: '1) Informes de Bishop & Associates (de pago; solo los titulares de 2024 y 2025 son públicos); 2) Global Market Insights y GII (otro perímetro, sin serie gratuita); 3) prensa sectorial (passive-components.eu: solo 2024)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comités, remuneración, participaciones', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-08', url: `${ED}/000110465926040688/tm261344-1_def14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 21-may-2026', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-22', url: `${ED}/000110465926065682/tm2615386d1_8k.htm` },
  { id: 3, titulo: 'Form 4 de directivos y consejeros, 21-oct-2025 a 21-oct-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000820313&type=4' },
  { id: 4, titulo: 'Amphenol Announces Board Succession Plan (Norwitt presidente; Loeffler se retira)', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000110465926010676/tm265098d1_ex99-1.htm` },
  { id: 5, titulo: 'Amphenol Appoints Sanjiv Lamba to Board of Directors', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-08', url: `${ED}/000110465926002183/tm262604d1_ex99-1.htm` },
  { id: 6, titulo: 'Form 8-K: relevo en la división Harsh Environment Solutions (Luc Walter → Ryan Fisher, 1-ene-2027)', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-06', url: `${ED}/000110465926114035/tm2627036d1_8k.htm` },
  { id: 7, titulo: 'Notas de resultados trimestrales 4T23-2T26 (guía de cada trimestre y resultado)', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-29', url: `${ED}/000110465926087904/aph-20260729xex99d1.htm` },
  { id: 8, titulo: 'Accionistas institucionales y participación de directivos', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/APH/holders/' },
];
const C = {
  _estado: 'Completa. Proxy 2026, votos de la junta de mayo de 2026, Form 4 de 12 meses y 8-K de nombramientos.',
  directivos: {
    equipo: [
      { nombre: 'R. Adam Norwitt', cargo: 'Presidente del consejo y consejero delegado', desde: '2009', participacion_pct: 0.33, trayectoria: 'En Amphenol desde 1998; consejero delegado desde 2009 y presidente del consejo desde mayo de 2026 [1, 4]. Con él las ventas pasaron de ≈ 2.800 M USD (2009) a 23.095 M (2025) y el BPA se multiplicó con crecimiento orgánico y más de 20.000 M en compras sin deterioros [1].' },
      { nombre: 'Craig A. Lampo', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2015', participacion_pct: 0.11, trayectoria: 'Director financiero desde 2015; antes interventor (2004-2015) y tesorero. Ha financiado CCS con bonos en dólares y euros y préstamos a plazo [1].' },
      { nombre: 'William J. Doherty', cargo: 'Presidente de la división Communications Solutions', desde: '2022', participacion_pct: null, trayectoria: 'Dirige la división de IT datacom y CCS: ventas +91 % en 2025 (71 % orgánico) y margen del 33,6 % en el 2T26 [1].' },
      { nombre: 'Luc Walter', cargo: 'Presidente de la división Harsh Environment Solutions', desde: '2022', participacion_pct: null, trayectoria: '43 años en la empresa; pasa a un cargo de programas estratégicos el 1-ene-2027 y le sucede Ryan Fisher (militar de Norteamérica) [6].' },
      { nombre: 'Peter J. Straub', cargo: 'Presidente de la división Interconnect and Sensor Systems', desde: '2024', participacion_pct: null, trayectoria: 'Antes director del grupo de sensores; su división es la de menos margen (21,0 % en el 2T26) [1].' },
      { nombre: 'Lance E. D\'Amico', cargo: 'Vicepresidente ejecutivo, secretario y director jurídico', desde: '2016', participacion_pct: null, trayectoria: 'Director jurídico desde 2016 [1].' },
    ],
    historial_guidance: [
      { anio: '1T24', guia: 'Ventas 3.040-3.100 M USD; BPA ajustado 0,71-0,73 (antes de los splits de 2024 y 2026)', real: 'Ventas 3.256 M; BPA 0,80', cumplida: 'Sí' },
      { anio: '1T25', guia: 'Ventas 4.000-4.100 M; BPA 0,49-0,51 (antes del split de 2026)', real: 'Ventas 4.811 M; BPA 0,63', cumplida: 'Sí' },
      { anio: '2T25', guia: 'Ventas 4.900-5.000 M; BPA 0,64-0,66', real: 'Ventas 5.650 M; BPA 0,81', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas 22.660-22.760 M; BPA 3,26-3,28 (oct-2025)', real: 'Ventas 23.095 M; BPA 3,34', cumplida: 'Sí' },
      { anio: '1T26', guia: 'Ventas 6.900-7.000 M; BPA 0,91-0,93', real: 'Ventas 7.620 M; BPA 1,06', cumplida: 'Sí' },
      { anio: '2T26', guia: 'Ventas 8.100-8.200 M; BPA 1,14-1,16', real: 'Ventas 8.758 M; BPA 1,35 (0,04 de aranceles recuperados)', cumplida: 'Sí' },
    ],
    comentario: 'Equipo muy estable y de la casa: el consejero delegado lleva 17 años en el cargo, el director financiero 11 y los presidentes de división vienen de dentro [1]. La credibilidad es alta: la empresa da guía trimestral y la ha superado en todos los trimestres revisados, en 2025-2026 por 7-15 % en ventas [7]. Riesgo de persona clave: Norwitt (56 años) concentra ahora la presidencia y la dirección; el consejero independiente coordinador (Falck, 73 años) es el contrapeso [1, 4]. Sucesión en divisiones ordenada (Walter → Fisher, anunciada con tres meses) [6].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'R. Adam Norwitt', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2009', comisiones: 'Ejecutiva' },
      { nombre: 'David P. Falck', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría, Retribuciones, Nombramientos (presidente)' },
      { nombre: 'Nancy A. Altobello', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría (presidenta), Retribuciones, Nombramientos' },
      { nombre: 'Sanjiv Lamba', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
      { nombre: 'Rita S. Lane', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Retribuciones (presidenta), Nombramientos' },
      { nombre: 'Robert A. Livingston', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría, Finanzas (presidente), Nombramientos' },
      { nombre: 'Prahlad Singh', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Retribuciones, Nombramientos' },
      { nombre: 'Anne Clarke Wolff', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría, Finanzas, Nombramientos' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: r1(984297730 / (984297730 + 83096067 + 5323917) * 100), voto_remuneracion_contra_pct: r1(83096067 / (984297730 + 83096067 + 5323917) * 100), voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 22.35, fijo: 1.57, variable_corto: 5.63, variable_largo: 14.65, ratio_salario_medio: 1188 },
    remuneracion: 'El variable anual depende del crecimiento de las ventas en moneda constante y del BPA ajustado (objetivo 7 % y 11 %, máximo 200 % con 17,5 % y 27,5 %); en 2025 se pagó el máximo (ventas +51 %, BPA +77 %) [1]. El largo plazo son solo opciones sobre acciones que consolidan por tiempo, sin condición de rentabilidad sobre el capital ni de rentabilidad para el accionista: premian la subida de la acción, no el ROIC [1]. Remuneración total del consejero delegado de 22,35 M USD en 2025 (17,16 M en 2024); «compensación realmente pagada» de 141,6 M por la revalorización de sus opciones; 1.188 veces el empleado mediano (un operario en China) [1]. Hay política de recuperación (clawback) [1]. La junta de 2026 aprobó la remuneración con el 91,7 % a favor y el 7,7 % en contra [2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.2, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 8.0, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'FMR (Fidelity)', pct: 7.0, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Consejeros y directivos', pct: 0.53, tipo: 'Directivos', variacion: 'Bajan por ejercicio y venta de opciones' },
    ],
    insiders: [
      { fecha: '2026-08-04', persona: 'Craig A. Lampo (director financiero)', operacion: 'Venta', acciones: 193200, importe: 32.32 },
      { fecha: '2026-07-31', persona: 'R. Adam Norwitt (consejero delegado)', operacion: 'Venta', acciones: 686104, importe: 110.99 },
      { fecha: '2026-05-05', persona: 'R. Adam Norwitt (consejero delegado)', operacion: 'Venta', acciones: 130775, importe: 18.71 },
      { fecha: '2026-02-18', persona: 'Craig A. Lampo (director financiero)', operacion: 'Venta', acciones: 100000, importe: 15.0 },
      { fecha: '2026-02-12', persona: 'R. Adam Norwitt (consejero delegado)', operacion: 'Venta', acciones: 608333, importe: 89.58 },
      { fecha: '2026-02-05', persona: 'Robert A. Livingston (consejero)', operacion: 'Compra', acciones: 10000, importe: 1.29 },
      { fecha: '2025-11-11', persona: 'Craig A. Lampo (director financiero)', operacion: 'Venta', acciones: 298076, importe: 42.7 },
    ],
    control_y_defensas: 'Sin accionista de control: los tres primeros son gestoras indexadas o activas (Vanguard 10,2 %, BlackRock 8,0 %, FMR 7,0 %) [1]. Una sola clase de acciones con un voto. Consejo de ocho miembros con siete independientes, elegidos cada año [1, 2]. Desde mayo de 2026 el consejero delegado preside también el consejo, con un consejero independiente coordinador (Falck); el 5,4 % votó en contra de Norwitt como consejero y el 4,8 % contra Falck [2, 4]. No hay operaciones vinculadas relevantes ni blindajes conocidos.',
    alertas: [
      'Ventas de directivos de 512 M USD en 12 meses, todas por ejercicio de opciones con precio de 22 USD (antes del split) y venta el mismo día; sin plan 10b5-1 declarado en los Form 4 [3].',
      'Unión de presidente y consejero delegado desde mayo de 2026 (Norwitt), con consejero coordinador independiente [4].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de APH, SPY y XLK (precio, rentabilidades, beta, volatilidad, cierres de cada ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/APH/history/' },
  { id: 2, titulo: 'Consenso, recomendaciones, objetivos y cambios de los analistas de Amphenol y de sus comparables (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/APH/analysis/' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (bono a 10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Amphenol Corporation to Acquire CIT Business From Carlisle (2.025 M USD; ventas de 900 M y margen EBITDA del 20 %)', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-01-30', url: `${ED}/000110465924008232/tm244465d1_ex99-1.htm` },
  { id: 6, titulo: 'Amphenol Corporation to Acquire Mobile Networks Businesses From CommScope (2.100 M USD; 1.200 M de ventas, margen EBITDA del 25 %)', editor: 'Business Wire', tipo: 'Primaria', fecha: '2024-07-18', url: 'https://www.businesswire.com/news/home/20240718840558/en/Amphenol-Corporation-to-Acquire-Mobile-Networks-Businesses-From-CommScope' },
  { id: 7, titulo: 'Amphenol Corporation to Acquire Connectivity and Cable Solutions Business from CommScope (10.500 M USD; 3.600 M de ventas y 26 % de margen EBITDA en 2025)', editor: 'Amphenol Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-04', url: `${ED}/000110465925073344/tm2522435d1_ex99-1.htm` },
  { id: 8, titulo: 'TE Connectivity to Acquire Richards Manufacturing for $2.3 Billion (≈ 400 M de ventas, margen EBITDA de «mid-30s»)', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2025-02-20', url: 'https://finance.yahoo.com/news/te-connectivity-acquire-richards-manufacturing-192024833.html' },
  { id: 9, titulo: 'Form 10-K 2025 (Trexon: 1.050 M USD) y Form 10-Q del 2T26 (balance del puente a 30-jun-2026)', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000110465926089194/aph-20260630x10q.htm` },
  { id: 10, titulo: 'Movimiento del precio de APH (1-12 meses, máximos, medias, volatilidad, avisos)', editor: 'Yahoo Finance (herramientas/movimiento.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/APH/chart/' },
  { id: 11, titulo: 'Amphenol crashes despite strong Q4 results, guidance', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-01-28', url: 'https://seekingalpha.com/news/4543490-amphenol-crashes-despite-strong-q4-results-guidance' },
  { id: 12, titulo: 'Why Shares in Amphenol Slumped 11% Today (4-feb-2026: venta general de valores de IA)', editor: 'The Motley Fool (vía AOL)', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://www.aol.com/articles/why-shares-amphenol-slumped-11-201655859.html' },
  { id: 13, titulo: 'Why Amphenol stock topped the market on Tuesday (Goldman Sachs sube el objetivo a 116 USD; Baird a 105)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.fool.com/investing/2026/10/06/why-amphenol-stock-topped-the-market-on-tuesday/' },
  { id: 14, titulo: 'Amphenol: fecha de los resultados del 3T26 (28-oct-2026) y noticias recientes', editor: 'MarketBeat / AJ Bell', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.marketbeat.com/stocks/NYSE/APH/news/' },
  { id: 15, titulo: 'Form 8-K: emisión de bonos en euros (3,375 % 2029 y 3,875 % 2034) y en marzo (3,625 % 2031)', editor: 'Amphenol Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-06', url: `${ED}/000110465926055888/tm2613386d4_ex99-1.htm` },
];
const bol = B.bolsa;
const ya = Y.APH;
const mov = { fecha: '2026-10-21', var_1m_pct: -3.5, var_3m_pct: 1.6, var_6m_pct: 8.0, var_12m_pct: 25.3, dist_max_52s_pct: -9.8, dist_min_52s_pct: 34.2, dist_max_historico_pct: -9.8, tendencia: 'alcista', volatilidad_60d_pct: 37.8, avisos: [] };

// Comparables (Yahoo, 21-oct-2026, sesión abierta; JPY a 158,13 por USD): PER de los próximos 12 meses = precio ÷ (BPA del
// ejercicio en curso × meses que quedan + BPA del siguiente × meses que entran) ÷ 12. Crecimiento de ventas igual.
function ntm(t, mesesQuedan) {
  const d = Y[t]; const tr = d.trend; const y0 = tr.find((x) => x.periodo === '0y'), y1 = tr.find((x) => x.periodo === '+1y');
  const w0 = mesesQuedan / 12, w1 = 1 - w0;
  const bpa = y0.bpa * w0 + y1.bpa * w1; const ventas = y0.ventas * w0 + y1.ventas * w1;
  return { per: r1(d.precio / bpa), crec: r1((ventas / d.ventas - 1) * 100) };
}
const fx = (t) => (Y[t].divisa === 'JPY' ? usdjpy : 1);
const comp = (t, nombre, pais, meses) => {
  const d = Y[t]; const n = ntm(t, meses);
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(d.cap / 1e6 / fx(t)), ev_ventas: r2(d.ev_ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: n.per, crecimiento_pct: n.crec, margen_ebitda_pct: r1(d.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r1((d.deuda - d.caja) / d.ebitda), fcf_yield_pct: d.fcf ? r1(d.fcf / d.cap * 100) : null,
  };
};
// Meses que quedan del ejercicio en curso a 21-oct-2026: diciembre 2,3; septiembre (TE) 11,3 (FY2027 ya en curso: usa +1y y la mitad siguiente no existe → se usa 0y=FY2026 cerrado? ver abajo); marzo 5,3.
const empresas = [
  // TE: ejercicio a septiembre; FY2026 (0y) ya cerrado el 25-sep y aún sin publicar; los 12 meses siguientes ≈ FY2027 (+1y).
  { ...comp('TEL', 'TE Connectivity', 'US', 0), },
  comp('GLW', 'Corning', 'US', 2.3),
  comp('LFUS', 'Littelfuse', 'US', 2.3),
  comp('ST', 'Sensata Technologies', 'US', 2.3),
  comp('BDC', 'Belden', 'US', 2.3),
  comp('6807.T', 'Japan Aviation Electronics', 'JP', 5.3),
  comp('VRT', 'Vertiv', 'US', 2.3),
  comp('CLS', 'Celestica', 'CA', 2.3),
];
const pers = empresas.map((e) => e.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medianaPer = (pers[(pers.length - 1) >> 1] + pers[pers.length >> 1]) / 2;

const D = {
  _estado: 'Completa. Precio de cierre del 20-oct-2026 (la sesión del 21-oct estaba abierta); consenso y comparables de Yahoo del 21-oct; transacciones de los comunicados.',
  _per_mediana_comparables: r1(medianaPer),
  identificacion: {
    nombre: 'Amphenol Corporation', nombre_corto: 'Amphenol', ticker: 'APH', isin: 'US0320951017', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnología de la información', industria: 'Componentes electrónicos', sede: 'Wallingford (Connecticut)', fundacion: '1932', empleados: 170000, web: 'https://www.amphenol.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: r1(1289.2 * 2), capitalizacion_publicada: Math.round(ya.acciones * B.identificacion.precio / 1e6), free_float_pct: 99.5,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'La empresa da guía trimestral, no anual. Para el 3T26 (dada el 29-jul-2026): ventas de 9.300-9.400 M USD (+50-52 %) y BPA ajustado de 1,40-1,42 USD antes del split, 0,70-0,71 después (+51-53 %), sin más devoluciones de aranceles [2]. CCS: 4.600 M de ventas y +0,30 USD de BPA (antes del split) en 2026. Inversión en el máximo del 3-4 % de las ventas en el 2S26; intereses netos de ≈ 200 M por trimestre y tipo impositivo ajustado del 27 % [2]. Resultados del 3T26 el 28-oct-2026 [14].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(ya.trend.find((x) => x.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(ya.trend.find((x) => x.periodo === '0y').bpa), dpa: 0.44, fuente: `Yahoo Finance, ${ya.trend.find((x) => x.periodo === '0y').n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(ya.trend.find((x) => x.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(ya.trend.find((x) => x.periodo === '+1y').bpa), dpa: 0.5, fuente: `Yahoo Finance, ${ya.trend.find((x) => x.periodo === '+1y').n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: 19, comprar: 17, mantener: 2, vender: 0, po_medio: r2(ya.po_medio), po_min: ya.po_min, po_max: ya.po_max },
    revisiones: 'Al alza: el BPA de 2026 del consenso pasó de 2,45 USD hace 90 días a 2,69 hoy (+10 %) y el de 2027 de 2,92 a 3,33 (+14 %), tras el 2T26 y la mejora de CCS [2]. En octubre subieron el objetivo Goldman Sachs (116 USD), Citi (112), UBS (105), Evercore (100) y Bank of America (104); Bernstein empezó con Superar (99) [2, 13]. TD Cowen mantiene Mantener con 90 USD. Una sola fuente con estimaciones completas (Yahoo); el objetivo medio se contrasta con MarketBeat (96,85 USD) [14].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bol.tipo_rentabilidad, rentabilidades: bol.rentabilidades, anual: bol.anual, beta: bol.beta, volatilidad_pct: bol.volatilidad_pct, max_drawdown_pct: bol.max_drawdown_pct, posicion_corta_pct: r1(ya.corto_pct * 100),
    comentario: `La acción ha multiplicado al índice: +${bol.rentabilidades[3].accion_pct} % anual a cinco años frente al +${bol.rentabilidades[3].indice_pct} % del SPY y +96 % en 2025 [1]. El motor es el ciclo de IA: la acción sube y baja con las noticias de inversión de las nubes y de Nvidia, con caídas de un día del 12 % (28-ene-2026, tras unos resultados mejores de lo esperado pero una guía del 1T26 que no bastó) y del 11,6 % (4-feb-2026, venta general de valores de IA) [11, 12]. Volatilidad de un año del ${bol.volatilidad_pct} % y beta de ${bol.beta} (semanal de dos años 1,58): ya no se comporta como una industrial defensiva [1]. Desde junio de 2026 se mueve en un rango de 75-90 USD (en acciones de hoy) [10].`,
    contexto: {
      movimiento: mov,
      movimientos_fuertes: [
        { periodo: 'sep-oct 2025', var_pct: 12.6, causa: 'Resultados del 3T25 (22-oct-2025) por encima de la guía y anuncio de la financiación de CCS [2, 11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ene-feb 2026', var_pct: -12.2, causa: 'Caída del 12,2 % el 28-ene-2026 tras los resultados del 4T25: mejores de lo esperado, pero guía del 1T26 que el mercado consideró corta; el 4-feb, −11,6 % en la venta general de valores de IA [11, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-2026', var_pct: -13.5, causa: 'Caída del mes sin un hecho propio identificado (−7,5 % el 2-mar); coincide con la corrección del sector de IA y la emisión de bonos de marzo [15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-2026', var_pct: 16.6, causa: 'Resultados del 1T26 (29-abr): ventas de 7.620 M frente a una guía de 6.900-7.000 M y pedidos récord [2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may 2026', var_pct: -22.0, causa: 'Caída de un mes hasta el 19-may sin hecho propio confirmado; la prensa la atribuyó a la deuda de CCS y al miedo a la óptica frente al cobre en los bastidores de IA [2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jun 2026', var_pct: 37.6, causa: 'Rebote hasta el 18-jun con la vuelta del sector de IA y notas positivas (Evercore «valor preferido», subidas de precios según Wedbush) [2].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26 el 28-oct-2026 antes de la apertura; guía de 9.300-9.400 M de ventas y 0,70-0,71 USD de BPA [2, 14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-06', tipo: 'recomendación', hecho: 'Goldman Sachs sube el objetivo de 102 a 116 USD y Baird de 95 a 105; en octubre también Citi (112), UBS (105) y Evercore (100) [2, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-01', tipo: 'directivos', hecho: 'Luc Walter deja la presidencia de Harsh Environment el 1-ene-2027 tras 43 años; le sucede Ryan Fisher [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-02', tipo: 'ampliación o convertible', hecho: 'Split 2 por 1 efectuado (sin efecto económico); dividendo trimestral de 0,125 USD tras el split [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-04', tipo: 'directivos', hecho: 'Ventas de directivos de 512 M USD en 12 meses, todas por ejercicio de opciones (Norwitt 219 M, Lampo 90 M); la última, el 4-ago-2026 [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-29', tipo: 'resultados', hecho: '2T26 récord (ventas +55 %, BPA ajustado +67 %, pedidos de 10.732 M) y mejora de la previsión de CCS [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-06', tipo: 'ampliación o convertible', hecho: 'Emisión de bonos en euros (2029 y 2034) para refinanciar deuda de CCS; sin ampliación de capital [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-01-09', tipo: 'fusión u oferta', hecho: 'Cierre de la compra de CommScope CCS por 10.500 M USD, la mayor de su historia [7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 9,8 % por debajo de su máximo histórico (6-oct-2026) y un 34 % por encima del mínimo de 52 semanas, con tendencia alcista (6 % sobre la media de 200 sesiones) y sin avisos P1-P5 [10]. Los movimientos fuertes tienen causa en resultados o en el sentimiento sobre la IA, no en hechos propios negativos. No hay colocaciones, ampliaciones ni litigios pendientes; las ventas de directivos son ejercicios de opciones que vencen, y se tratan como información, no como señal. Los resultados del 28-oct no retrasan la decisión (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precios de cierre de cada ejercicio en acciones de hoy (Yahoo ajusta los tres splits) [1]. El PER adelantado (cierre ÷ BPA ajustado del año siguiente) se movió entre 21x y 29x en 2020-2025, con mediana de ≈ 25x; hoy cotiza a un múltiplo parecido sobre un BPA que se ha duplicado en dos años. El EV/EBITDA de los últimos doce meses sube de ≈ 15-17x antes de 2023 a ≈ 23x hoy, porque el precio ha subido más que el EBITDA de un negocio que el mercado ve ya como «infraestructura de IA».',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes de conectores y componentes de interconexión (TE Connectivity, Littelfuse, Sensata, Belden, JAE) y dos proveedores del mismo ciclo de centros de datos con su propio múltiplo: Corning (fibra, competidor directo de CCS), Vertiv (potencia y refrigeración) y Celestica (montaje de redes y servidores) [2]. Molex no cotiza; Hirose se excluye porque Yahoo no da su BPA adelantado coherente (crecimiento de ventas del 65 % mal medido); Yageo, por ser componentes pasivos. Datos de Yahoo de la sesión del 21-oct-2026 (precios casi iguales al cierre del 20-oct); JPY a 158,13 por USD. PER de los próximos 12 meses con el BPA del consenso; sin EBITDA adelantado de la misma fuente, el EV/EBITDA es de los últimos 12 meses.',
    empresas,
    comentario: `La mediana del PER de los próximos 12 meses de los comparables es de ≈ ${r1(medianaPer)}x. Amphenol cotiza por encima de los conectores clásicos (TE ≈ 16x, Sensata y Belden ≈ 10-11x, JAE ≈ 13x) y cerca de los proveedores de IA (Vertiv, Corning), porque crece más (ventas +54 % en 2026 y +20 % en 2027 según el consenso) y tiene más margen (EBITDA del 33 % en los últimos doce meses frente al 26 % de TE) [2]. La prima frente a TE (≈ 50 %) se justifica en parte por el crecimiento y el ROIC, pero supone que el ciclo de IA sigue: si Amphenol creciera como TE (≈ 10 %), su múltiplo debería acercarse al de TE.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'CommScope CCS (fibra para centros de datos, banda ancha, edificios)', comprador: 'Amphenol', ev: 10500, ev_ventas: r2(10500 / 3600), ev_ebitda: r1(10500 / (3600 * 0.26)), prima_pct: null, excluir: false, comentario: 'Ventas de 3.600 M y margen EBITDA del 26 % previstos para 2025 [7].' },
      { fecha: '2025-08', objetivo: 'Trexon (interconexión de alta fiabilidad para defensa)', comprador: 'Amphenol', ev: 1050, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin ventas ni EBITDA publicados [9].' },
      { fecha: '2025-02', objetivo: 'Richards Manufacturing (conectores y accesorios para redes eléctricas)', comprador: 'TE Connectivity', ev: 2300, ev_ventas: r2(2300 / 400), ev_ebitda: r1(2300 / 140), prima_pct: null, excluir: false, comentario: 'Ventas de ≈ 400 M y margen EBITDA de «mid-30s» (35 % para el cálculo) [8].' },
      { fecha: '2024-07', objetivo: 'Redes móviles de CommScope (antenas exteriores y DAS, Andrew)', comprador: 'Amphenol', ev: 2100, ev_ventas: r2(2100 / 1200), ev_ebitda: r1(2100 / 300), prima_pct: null, excluir: false, comentario: 'Ventas de 1.200 M y margen EBITDA del 25 % previstos para 2024; negocio en declive [6].' },
      { fecha: '2024-01', objetivo: 'CIT (Carlisle Interconnect Technologies)', comprador: 'Amphenol', ev: 2025, ev_ventas: r2(2025 / 900), ev_ebitda: r1(2025 / 180), prima_pct: null, excluir: false, comentario: 'Ventas de 900 M y margen EBITDA ajustado del 20 % previstos para 2024 [5].' },
    ],
    comentario: 'Las compras del sector se han pagado a 7-16 veces el EBITDA (mediana ≈ 11x): muy por debajo de las ≈ 23 veces del EBITDA de los últimos doce meses a las que cotiza Amphenol [5-8]. Eso explica por qué comprar crea valor para Amphenol (compra a 11x lo que la bolsa le paga a 20x o más), pero no sirve para valorar la propia Amphenol: con 200.000 M USD de capitalización y sin accionista de control, no es objeto probable de una operación.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'causa de la caída de abril-mayo de 2026 (−22 % en un mes) y de marzo de 2026 (−13,5 %)', tipo: 'Complemento', intentos: '1) 8-K de la empresa de marzo-mayo de 2026 (solo emisiones de bonos y la junta); 2) titulares de Seeking Alpha (RSS) y MarketBeat; 3) búsquedas en prensa (Zacks vía Chartmill: 403; Trading Economics sin causa)', decision: 'Se explica como corrección del sector de IA, sin hecho propio confirmado' },
    { seccion: 'consenso', campo: 'EBITDA del consenso y BPA de 2028e', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo BPA y ventas de dos ejercicios); 2) MarketBeat (solo el objetivo medio); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Amphenol Corporation - News and Analysis (titulares y artículos de opinión, jun-oct 2026)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/APH' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $APH (30 mensajes, 3-19 oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://stocktwits.com/symbol/APH' },
  { id: 3, titulo: 'MarketBeat: noticias y opiniones de APH (octubre de 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://www.marketbeat.com/stocks/NYSE/APH/news/' },
  { id: 4, titulo: 'Why Amphenol stock topped the market on Tuesday', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://www.fool.com/investing/2026/10/06/why-amphenol-stock-topped-the-market-on-tuesday/' },
];
const E = {
  _estado: 'Completa (presupuesto corto). Seeking Alpha, Stocktwits, MarketBeat y Motley Fool; Reddit da 403.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de opinión)', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'Mayoría alcista («Amphenol continues to impress», «A powerhouse powering on»), pero con piezas que discuten el precio: «What Q3 must show to justify its premium», «The 6x revenue multiple is not» y «Should continue to rise until the AI race cools off» [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Nueve de los treinta mensajes marcados como alcistas y ninguno bajista; se habla de máximos, de los objetivos de Goldman (116) y Bank of America (104) y de compras de opciones de noviembre; algunos esperan a 80 USD para entrar [2].' },
      { plataforma: 'MarketBeat (noticias y opinión)', fecha: '2026-10', n_comentarios: 40, tono: 'Positivo', resumen: 'Titulares de subidas de objetivos, inicio de cobertura de Bernstein y Wolfe, y algún aviso de valoración («May be near fair value», Zacks la baja a Mantener) [3].' },
      { plataforma: 'The Motley Fool', fecha: '2026-10', n_comentarios: 1, tono: 'Positivo', resumen: 'Explica la subida del 6-oct por Goldman y Baird y pide «vigilar» cualquier pausa en la construcción de centros de datos de IA [4].' },
    ],
    temas: [
      { tema: 'IA como motor de crecimiento', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo respaldan: IT datacom +63 % orgánico y 43 % de las ventas en el 2T26; es también la concentración de riesgo del informe [1, 2].' },
      { tema: 'Valoración exigente', postura: 'Dividida', peso: 'Medio', contraste: 'Cotiza a ≈ 30x el BPA de 2026 y ≈ 24x el de 2027 del consenso; el informe coincide en que el precio ya descuenta mucho crecimiento [1].' },
      { tema: 'Cuándo se frena la IA («AI race cools off»)', postura: 'Bajista', peso: 'Medio', contraste: 'Es el riesgo principal del informe (escenario bajista con digestión de la inversión en 2028) [1, 4].' },
      { tema: 'Resultados del 3T26 (28-oct)', postura: 'Alcista', peso: 'Medio', contraste: 'El consenso espera 0,73 USD frente a una guía de 0,70-0,71: la empresa suele batir su guía, el listón ya lo descuenta [2].' },
    ],
    lectura: 'El sentimiento de los particulares es positivo y va con el de los analistas (17 de 19 recomiendan comprar), sin euforia extrema: hay debate abierto sobre la valoración y sobre cuándo se frena la inversión en IA. No aporta un riesgo que el informe no tenga; confirma que la acción es un vehículo de la tesis de IA y que reaccionará con fuerza a cualquier señal de digestión de la inversión de las nubes. Las cifras de los foros no se usan.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', r1(medianaPer), pers);
