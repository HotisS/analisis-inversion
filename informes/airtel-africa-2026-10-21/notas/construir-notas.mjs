// Escribe las notas A-E de Airtel Africa (corte 2026-10-21) a partir de los documentos de notas/docs (informe anual FY2026,
// notas de resultados FY2022-FY2026 y 1T FY2027, hoja histórica del 3T FY2026, RNS de Investegate), del XBRL ESEF
// (cuentas-xbrl.json), de bolsa.json y de yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026, sesión abierta).
// Cada nota cita solo con [n] de su propia lista de fuentes. Millones de USD; ejercicio a 31 de marzo etiquetado por el año
// en que termina (FY2026 = abr-25 a mar-26).
// Ejecutar: node informes/airtel-africa-2026-10-21/notas/construir-notas.mjs
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
const CDN = 'https://cdn-webportal.airtelstream.net/website/investor/main/pdf';
const INV = 'https://www.investegate.co.uk/announcement/rns/airtel-africa--aaf';
const USD_GBP_P = 1.1215 / 0.84028 / 100; // USD por penique, 20-oct-2026 (BCE: 1,1215 USD y 0,84028 GBP por EUR)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report and Accounts 2026 (ejercicio cerrado el 31-mar-2026): cuentas consolidadas y notas (segmentos, deuda, arrendamientos, impuestos, minoritarios, opción de venta de Airtel Money)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-05-07', url: `${CDN}/Airtel_Africa_plc_Annual_Report_and_Accounts_2026.pdf` },
  { id: 2, titulo: 'Results for year ended 31 March 2026 (nota de resultados FY2026, con cuentas y conciliaciones de las medidas alternativas)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-05-08', url: `${CDN}/Q4-2026/Press_release_FY'2026.pdf` },
  { id: 3, titulo: 'Results for quarter ended 30 June 2026 (1T FY2027)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-07-23', url: `${CDN}/Q1-2027/Airtel_Africa_Q127_press_release.pdf` },
  { id: 4, titulo: 'Investor relations pack Q1 2027 (deuda neta y apalancamiento a 30-jun-2026, conciliaciones)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-07-23', url: `${CDN}/Q1-2027/Africa_IR_Pack_Q127.pdf` },
  { id: 5, titulo: 'Historical data sheet Q3 2026 (trimestres FY2024-3T FY2026 del grupo, regiones y Airtel Money)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-01-30', url: `${CDN}/Q3-2026/Historical-data-sheet-Q3-26.xlsx` },
  { id: 6, titulo: 'Results for year ended 31 March 2025', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2025-05-14', url: `${CDN}/Q4-2025/Press-release-FY'25_final.pdf` },
  { id: 7, titulo: 'Results for year ended 31 March 2024', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2024-05-15', url: `${CDN}/H1-2023/Press-release-FY'24-Final.pdf` },
  { id: 8, titulo: 'Results for year ended 31 March 2023', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2023-05-11', url: `${CDN}/H1-2023/press-release-FY-2023.pdf` },
  { id: 9, titulo: 'Results for year ended 31 March 2022', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2022-05-13', url: `${CDN}/FY-2022/Press-release-FY-2022.pdf` },
  { id: 10, titulo: 'Results for the half-year ended 30 September 2025 (1S FY2026) y del 3T FY2026', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-01-30', url: `${CDN}/Q3-2026/Press-release-Q3-26.pdf` },
  { id: 11, titulo: 'Transcripción de la conferencia de resultados FY2026', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-05-08', url: `${CDN}/Q4-2026/Airtel_Africa_FY2026_results_transcript.pdf` },
  { id: 12, titulo: 'Transcripción de la conferencia del 1T FY2027 (gasóleo, inversiones, Starlink, IHS-MTN, salida a bolsa de Airtel Money)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-07-23', url: `${CDN}/Q1-2027/Airtel_Africa_Q12027_results_transcript.pdf` },
  { id: 13, titulo: 'Informes anuales ESEF de Airtel Africa plc FY2021-FY2026 (xBRL-JSON)', editor: 'XBRL International, filings.xbrl.org', tipo: 'Primaria', fecha: '2026-05-07', url: 'https://filings.xbrl.org/' },
  { id: 14, titulo: 'Seeking Alpha, titulares de resultados de Airtel Africa (1T FY2027: ingresos 130 M USD por encima del consenso)', editor: 'Seeking Alpha', tipo: 'Datos de mercado', fecha: '2026-07-23', url: 'https://seekingalpha.com/api/sa/combined/AAFRF.xml' },
];

// Cuenta del XBRL ESEF [13], comprobada con las notas de resultados [2, 6-9]: BPA básico publicado y acciones medias
// ponderadas de cada ejercicio; DPA total (a cuenta + final) de cada ejercicio; FY2025 con 16 M de partida excepcional
// operativa dentro del EBIT (litigio de una antigua filial) [6].
const ACC = { 2021: 3758, 2022: 3754, 2023: 3752, 2024: 3751, 2025: 3703, 2026: 3650 };
const BPA = { 2021: 0.090, 2022: 0.168, 2023: 0.177, 2024: -0.044, 2025: 0.060, 2026: 0.186 };
const DPA = { 2021: 0.04, 2022: 0.05, 2023: 0.0545, 2024: 0.0595, 2025: 0.065, 2026: 0.071 };
const GFIN = { 2024: null, 2025: 663, 2026: 867 }; // «other finance costs» de la nota de segmentos [1, 2]
const cuenta = X.financieros.cuenta.map((c) => {
  const a = c.periodo.replace('FY', '');
  const o = { ...c, coste_ventas: null, gastos_generales: null, participadas_en_ebitda: null,
    no_recurrentes_en_ebitda: a === '2025' ? 16 : null, bpa: BPA[a], dpa: DPA[a], dpa_extraordinario: 0, acciones_diluidas: ACC[a],
    gastos_financieros: c.gastos_financieros ?? GFIN[a] ?? null };
  delete o.fin; delete o.dpa_base; return o;
});
// Balance: XBRL [13]; inmovilizado (material + obra en curso, sin derechos de uso) e intangibles (sin fondo de comercio) de
// FY2025-FY2026 del informe anual [1]; los años anteriores no se buscaron en cada informe anual (hueco de complemento).
const INM = { 2025: 2086 + 194, 2026: 2425 + 265 };
const INT = { 2025: 810 + 8, 2026: 871 + 25 };
const balance = X.balance.historico.map((b) => {
  const a = b.periodo.replace('FY', '');
  const o = { ...b, intangibles: INT[a] ?? null, inmovilizado_material: INM[a] ?? null, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const REC = { 2024: null, 2025: 120, 2026: 74 };
const flujos = X.flujos.historico.map((f) => {
  const a = f.periodo.replace('FY', '');
  const o = { ...f, adquisiciones: 0, emision_acciones: a === '2025' ? 10 : 0, desinversiones: f.desinversiones ?? 0, recompras: f.recompras ?? REC[a] ?? null };
  delete o.fin; return o;
});

const trim = (p, ing, g, gcc, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: gcc, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL ESEF FY2021-FY2026 comprobadas con las notas de resultados; trimestres de la hoja histórica y de las notas trimestrales. Ejercicio a 31 de marzo etiquetado por el año en que termina.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 6415 - 1415 + 1853, ebitda: 3162 - 679 + 928, ebit: 2115 - 446 + 627, beneficio_neto: 679 - 126 + 160, bpa: 0.196, dpa: 0.071, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos en dólares pasaron de 3.908 M USD en FY2021 a 6.415 M en FY2026 (TCAC del 10,4 %), con dos años de caída por las devaluaciones: FY2024 (−5,3 %, la naira perdió más de la mitad de su valor en junio de 2023 y en enero-febrero de 2024) y FY2025 (−0,5 %) [7, 6]. En moneda constante el grupo creció un 20 % en FY2024, un 20,5 % en FY2025 y un 24,0 % en FY2026, este último con la subida de tarifas de Nigeria del 50 % autorizada en febrero de 2025 (Nigeria +47,5 % en moneda constante) [2]. En el 1T FY2027 los ingresos subieron un 31,0 % en dólares y un 21,1 % en moneda constante, con la naira y otras monedas más fuertes [3]. El margen EBITDA subyacente bajó del 48,8 % de FY2024 al 46,5 % de FY2025 por los costes en dólares (torres y energía) y subió al 49,3 % en FY2026 y al 50,1 % en el 1T FY2027, por precio, volumen y el programa de eficiencia [2, 3]. El EBIT de FY2026 fue de 2.115 M (margen del 33,0 %) [2].',
    ajustes: 'Airtel Africa publica el «BPA antes de partidas excepcionales» y, en los informes de resultados, el BPA sin partidas excepcionales ni pérdidas o ganancias de divisa y derivados: FY2023 20,6 centavos, FY2024 18,3, FY2025 9,8 y FY2026 16,2 [8, 7, 6, 2]. Las excepcionales fueron sobre todo las pérdidas de divisa de la devaluación de la naira en FY2024 (806 M USD de coste financiero excepcional) y FY2025 (87 M), una provisión de litigio de una antigua filial (16 M en FY2025, dentro del EBIT) y, en el 1T FY2027, 37 M de un acuerdo comercial en una filial [5, 3]. FY2026 no tuvo excepcionales, pero sí 127 M USD de ganancias de divisa y derivados (149 M de la naira); sin ellas el BPA fue de 16,2 centavos frente a 18,6 publicado [2]. El tipo efectivo del 40,1 % supera el nominal medio (≈ 32 %) por la mezcla de países y las retenciones sobre dividendos de las filiales [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('2T25', 1213.8, -2.6, null, 563.5, 0.006, null),
      trim('3T25', 1268.1, 2.4, null, 594.3, 0.036, null),
      trim('4T25', 1317.0, 17.8, null, 623.1, 0.015, null),
      trim('1T26', 1414.5, 22.4, null, 679.2, 0.034, null),
      trim('2T26', 1567.0, 29.1, null, 767.7, 0.049, null),
      trim('3T26', 1685.0, 32.9, null, 836.5, 0.049, null),
      trim('4T26', 1748.0, 32.7, 22.3, 879.0, 0.055, null),
      trim('1T27', 1853.0, 31.0, 21.1, 928.0, 0.044, 'Superior'),
    ],
    ultima_presentacion: 'En la conferencia del 1T FY2027 (23-jul-2026) la dirección repitió los mensajes de mayo: crecimiento de doble dígito en moneda constante en las tres regiones, penetración de smartphones del 51 % y tráfico de datos +56 % [3, 12]. Cambió el tono sobre los costes: el gasóleo y la energía restan 2,5-3 puntos de margen EBITDA en ritmo anual, la mitad entró en el 1T y el resto llega en el 2T por cómo están indexados los contratos de torres; una parte se compensa con el programa de eficiencia [12]. Reiteró una inversión de ≈ 1.100 M USD en FY2027, adelantada al 1T (389 M) [3, 12]. Los analistas preguntaron por el gasóleo en Nigeria, por si la inversión puede pasar de la guía, por la compra de IHS Towers por MTN (la dirección no ve efecto en la compartición de emplazamientos) y por los satélites: Starlink es complementario (transmisión y cobertura directa al móvil con el espectro de Airtel) [12]. Sobre la salida a bolsa de Airtel Money solo confirmó Londres y «2026»; no dio el tamaño ni la valoración, que llegaron en septiembre [12]. No dio guía de margen ni de crecimiento [12]. Frente al consenso, los ingresos del 1T superaron en 130 M USD la media [14].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2027', importe: 1022 }, { anio: 'FY2028', importe: 591 }, { anio: 'FY2029-FY2031', importe: 497 }, { anio: 'FY2032+', importe: 86 }],
    liquidez: 'Caja y equivalentes 697 M USD, depósitos 150 M e inversiones corrientes 20 M a 30-jun-2026 [4]; los 1.395 M de saldos de clientes de Airtel Money (fideicomiso) no son de la empresa y no cuentan [1].',
    rating: 'Sin rating de emisor vigente comprobado: los bonos en dólares de la sociedad holding se amortizaron y la deuda es hoy bancaria y local [1]',
    coste_deuda_pct: 11.0,
    vida_media_anios: 1.8,
    otros_pasivos: 'Pasivos por arrendamiento de 4.369 M USD a 30-jun-2026 (sobre todo torres; 4.224 M en marzo), que crecen con la renovación de contratos de torres de septiembre de 2024 y el despliegue de emplazamientos [4, 2]. Opción de venta de 515 M USD a favor de The Rise Fund (TPG) y Mastercard por su participación en Airtel Money, ejercitable si no había salida a bolsa; la salida a bolsa del 14-oct-2026 la deja sin objeto [1]. Pasivo diferido por espectro (pagos de 31 M en FY2026), pasivos fiscales corrientes de 174 M y provisiones de 37 M [1, 2]. La deuda bruta de 2.196 M está en 11 monedas: 681 M en dólares, 74 M en euros y el resto en moneda local (KES 385, NGN 301, XAF 199, ZMW 155, UGX 149); 1.347 M a tipo variable [1]. Vencen 1.022 M en FY2027 [1].',
    comentario: 'La deuda neta del grupo (con arrendamientos) pasó de 3.505 M USD en marzo de 2024 a 5.363 M en marzo de 2025 por la renovación de los contratos de torres, que subió los arrendamientos, y a 5.590 M en marzo de 2026 y 5.739 M en junio de 2026; el apalancamiento bajó de 2,3 a 1,7 veces el EBITDA porque el EBITDA creció más [4, 5]. Sin arrendamientos la deuda neta es ≈ 1.370 M (0,5 veces) [4]. La empresa ha sustituido la deuda en dólares de la holding por deuda local en las filiales para reducir el descalce de monedas: los dólares bajaron de 755 M a 681 M en un año [1]. El circulante comercial es negativo (proveedores 612 M frente a clientes 193 M y existencias 16 M) [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo de explotación subió de 1.666 M USD en FY2021 a 3.195 M en FY2026 (101 % del EBITDA, con 279 M de aumento de saldos de monederos de Airtel Money, que no es caja libre) [13, 2]. El capex de caja fue de 884 M en FY2026 (13,8 % de las ventas) y la guía de FY2027 es de ≈ 1.100 M (389 M ya en el 1T) [2, 3]. Los intereses pagados (839 M, de ellos 467 M por arrendamientos) y la devolución de arrendamientos (204 M) van en financiación [2]. Con NIIF 16 las altas de derechos de uso (697 M en FY2026 y 1.867 M en FY2025 por las renovaciones de torres) son inversión aunque no pasen por el capex [1]. Flujo libre del accionista aproximado de FY2026: 3.195 − 875 − 204 − 839 = 1.277 M, del que salieron 246 M en dividendos, 105 M a minoritarios y 74 M en recompras [2]. Casi todo el capex es de crecimiento (emplazamientos, fibra, centros de datos): la empresa no separa el de mantenimiento.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte LLP (desde la salida a bolsa de 2019; Ernst & Young propuesto para FY2028)', anios_auditor: 7, opinion: 'Favorable',
    comentario: 'Sin salvedades de Deloitte en FY2026 [1]. La comisión de auditoría hizo un concurso y propone a EY a partir de la junta de julio de 2027 [1]. Las cifras dependen mucho de la conversión: Nigeria aplica tipos oficiales y en FY2024 hubo 806 M de pérdidas de divisa clasificadas como excepcionales [5]; Malawi se contabilizó como economía hiperinflacionaria (ganancia monetaria de 17 M en FY2026) [2]. La empresa da su crecimiento en moneda constante, con los tipos de cierre de marzo del año anterior, y la remuneración variable también se mide así [1]: el inversor cobra en dólares y esa cifra es más alta que la reportada en los años de devaluación. El BPA de FY2026 lleva 127 M de ganancias de divisa (16,2 centavos sin ellas frente a 18,6) [2]. El EBITDA «subyacente» solo excluye 16 M en FY2025 [6]. Altman y Piotroski del motor se leen con cautela por el circulante negativo y los saldos de Airtel Money en el balance.',
    senales: [
      { senal: 'Dependencia del tipo de cambio en el BPA', nivel: 'Media', comentario: 'Pérdidas y ganancias de divisa de −806 M (FY2024), −179 M (FY2025) y +127 M (FY2026) [5, 2]; el BPA publicado oscila más que el negocio.' },
      { senal: 'Tipo efectivo alto y variable', nivel: 'Baja', comentario: '40,1 % en FY2026 por retenciones sobre dividendos de las filiales y pérdidas no deducibles [2].' },
      { senal: 'Cambio de auditor previsto', nivel: 'Baja', comentario: 'Concurso ordinario tras siete años de Deloitte; EY propuesto para FY2028 [1].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Nigeria', descripcion: 'Telefonía móvil, datos y servicios de pago (PSB) en Nigeria', tipo_resultado: 'EBITDA', historico: [{ periodo: 'FY2024', ingresos: 1504.1, resultado: 805.3 }, { periodo: 'FY2025', ingresos: 1048.2, resultado: 520.8 }, { periodo: 'FY2026', ingresos: 1603, resultado: 922 }] },
      { nombre: 'África Oriental', descripcion: 'Kenia, Uganda, Tanzania, Ruanda, Zambia, Malawi: móvil y Airtel Money', tipo_resultado: 'EBITDA', historico: [{ periodo: 'FY2024', ingresos: 2125.45, resultado: 1133.74 }, { periodo: 'FY2025', ingresos: 2432.0, resultado: 1284.02 }, { periodo: 'FY2026', ingresos: 3015, resultado: 1602 }] },
      { nombre: 'África francófona', descripcion: 'RD del Congo, Congo, Gabón, Chad, Níger, Madagascar y Seychelles: móvil y Airtel Money', tipo_resultado: 'EBITDA', historico: [{ periodo: 'FY2024', ingresos: 1349.82, resultado: 620.47 }, { periodo: 'FY2025', ingresos: 1469.19, resultado: 636.76 }, { periodo: 'FY2026', ingresos: 1786, resultado: 786 }] },
      { nombre: 'Sede y eliminaciones', descripcion: 'Costes centrales y eliminaciones entre regiones', tipo_resultado: 'EBITDA', historico: [{ periodo: 'FY2024', ingresos: -0.27, resultado: -131.1 }, { periodo: 'FY2025', ingresos: 5.9, resultado: -137.6 }, { periodo: 'FY2026', ingresos: 11, resultado: -148 }] },
    ],
    geografias: [{ nombre: 'África Oriental', peso_pct: 47.0 }, { nombre: 'África francófona', peso_pct: 27.8 }, { nombre: 'Nigeria', peso_pct: 25.0 }, { nombre: 'Otros', peso_pct: 0.2 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Clientes (millones)', valor_anterior: '166,1', valor_actual: '183,5', variacion: '+10,5 %', comentario: '189,0 M en junio de 2026 (+11,6 %) [2, 3]' },
      { kpi: 'Clientes de datos (millones)', valor_anterior: '73,4', valor_actual: '84,2', variacion: '+14,8 %', comentario: 'Penetración de smartphones del 49,5 % (51,0 % en junio) [2, 3]' },
      { kpi: 'Consumo de datos por cliente (GB/mes)', valor_anterior: '7,0', valor_actual: '8,9', variacion: '+27 %', comentario: '10,6 GB en el 1T FY2027 [2, 3]' },
      { kpi: 'Clientes de Airtel Money (millones)', valor_anterior: '44,6', valor_actual: '54,1', variacion: '+21,3 %', comentario: '56,5 M en junio de 2026 [2, 3]' },
      { kpi: 'Valor procesado anualizado de Airtel Money (4T, miles de M USD)', valor_anterior: '≈ 145', valor_actual: '> 215', variacion: '+49 %', comentario: '> 245 en el 1T FY2027 (+51,5 %) [2, 3]' },
      { kpi: 'Margen EBITDA subyacente', valor_anterior: '46,5 %', valor_actual: '49,3 %', variacion: '+280 pb', comentario: '50,1 % en el 1T FY2027 [2, 3]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'intangibles e inmovilizado FY2021-FY2024', tipo: 'Complemento', intentos: '1) XBRL ESEF (no da los conceptos); 2) informe anual FY2026 (solo FY2025-FY2026); 3) no se descargaron los informes anuales FY2021-FY2024 por tiempo', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const zar = Y['ZARUSD=X'].precio, inr = Y['INRUSD=X'].precio, tr = Y['TRYUSD=X'].precio;
const fB = [
  { id: 1, titulo: 'The Mobile Economy Africa 2026 (ingresos de los operadores 60.500 M USD en 2025 y 90.300 M en 2030; inversión 2025-2030 de 76.200 M; 5G 21 % en 2030)', editor: 'GSMA Intelligence', tipo: 'Sectorial', fecha: '2026-06', url: 'https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/wp-content/uploads/2026/06/The-Mobile-Economy-Africa-2026.pdf' },
  { id: 2, titulo: 'Annual Report and Accounts 2026 (mercados, posiciones, regulación, riesgos)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-05-07', url: `${CDN}/Airtel_Africa_plc_Annual_Report_and_Accounts_2026.pdf` },
  { id: 3, titulo: 'Results for year ended 31 March 2026', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-05-08', url: `${CDN}/Q4-2026/Press_release_FY'2026.pdf` },
  { id: 4, titulo: 'Transcripción de la conferencia del 1T FY2027', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-07-23', url: `${CDN}/Q1-2027/Airtel_Africa_Q12027_results_transcript.pdf` },
  { id: 5, titulo: 'Yahoo Finance quoteSummary de MTN, Vodacom, Bharti Airtel, Turkcell y Telkom (ingresos y EBITDA de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/' },
  { id: 6, titulo: 'Airtel Money intention to float (RNS)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-09-23', url: `${INV}/airtel-money-intention-to-float-announcement-/9785842` },
  { id: 7, titulo: 'The Mobile Economy Africa 2025 (ingresos de los operadores ≈ 52.000 M USD en 2024)', editor: 'GSMA Intelligence', tipo: 'Sectorial', fecha: '2025-10', url: 'https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/wp-content/uploads/2025/10/GSMA_AFRICA_ME2025_R_Web-3.pdf' },
];
const ing = (t, fx) => Math.round(Y[t].ventas * fx / 1e6);
const B_ = {
  _estado: 'Completa. Tamaño de mercado de GSMA (dos ediciones); competidores con datos de Yahoo (ingresos y margen EBITDA de 12 meses; el margen EBIT de sus cuentas no se comprobó).',
  negocio: {
    descripcion: 'Airtel Africa es el segundo operador de telefonía móvil de África por clientes: 183,5 millones en 14 países del África subsahariana a marzo de 2026 (189 millones en junio), con voz, datos móviles, banda ancha fija inalámbrica, servicios a empresas y dinero móvil (Airtel Money, 54,1 millones de clientes) [3, 2]. Opera en tres regiones: Nigeria (25 % de los ingresos), África Oriental (Kenia, Uganda, Tanzania, Ruanda, Zambia y Malawi; 47 %) y África francófona (RD del Congo, Congo, Gabón, Chad, Níger, Madagascar y Seychelles; 28 %) [3]. Vende sobre todo prepago a particulares a través de más de un millón de puntos de venta y agentes. Tiene 81.900 km de fibra y desplegó más de 3.250 emplazamientos en FY2026; las torres son en su mayoría de terceros (Helios, IHS, American Tower) en arrendamiento [3, 2]. Airtel Money (Airtel Mobile Commerce N.V.) cotiza en Londres desde el 14-oct-2026; Airtel Africa conserva el 77,85 % [6].',
    como_gana_dinero: 'Casi todo es ingreso recurrente de prepago: voz (36 % en FY2026), datos (39 %), dinero móvil (21 %, 1.355 M USD antes de eliminaciones) y otros (7 %) [3]. El margen depende del volumen (clientes +10,5 %, datos por cliente +27 %), del precio (subidas de tarifa, sobre todo la de Nigeria de febrero de 2025) y de costes en dólares o indexados al dólar: alquiler de torres, energía y equipos [3, 4]. El apalancamiento operativo es alto: con ingresos +24 % en moneda constante el margen EBITDA subió 2,4 puntos, hasta el 49,3 % [3]. Airtel Money cobra comisiones por retiradas, envíos, pagos a comercios y préstamos; su margen EBITDA es del 50,8 % y pide poco capital (capex del 3 % de sus ventas) [3]. Sin estacionalidad apreciable. Los ingresos se convierten a dólares: cada 1 % que se deprecian las monedas locales resta 60-62 M de ingresos y 29-31 M de EBITDA [3].',
    clientes: 'Clientes particulares de prepago, sin concentración: ningún cliente pesa de forma material [2]. La fuga mensual de clientes no se publica; la base crece un 10-12 % al año desde FY2024 [3]. El poder de precios es limitado y depende del regulador: en Nigeria las tarifas estuvieron congeladas desde 2013 hasta que la Comisión de Comunicaciones autorizó una subida del 50 % en febrero de 2025, tras una devaluación de la naira del 70 % [2, 3]. En los demás países el ARPU sube con el consumo de datos (ARPU de datos +16,2 % en moneda constante en FY2026) más que con subidas de tarifa [3]. Airtel Money tiene un ARPU de 2,4 USD al mes y crece con más usos (comercios, préstamos, remesas) [3].',
  },
  sector: {
    definicion: 'Servicios de telecomunicación móvil y de dinero móvil en África. El tamaño de referencia es el de GSMA para toda África (ingresos de los operadores móviles), porque no publica cifras de los 14 países de Airtel por separado; incluye mercados donde Airtel no está (Sudáfrica, Egipto, Marruecos, Etiopía) y por eso la cuota de Airtel sobre él es una cota baja [1]. Las dos ediciones de GSMA (2025 y 2026) son la única fuente independiente con serie [1, 7].',
    tamano: '≈ 60.500 M USD de ingresos de los operadores móviles en África en 2025 y 90.300 M previstos en 2030 [1]; ≈ 52.000 M en 2024 según la edición anterior [7]',
    unidad_serie: 'millones de USD (ingresos de los operadores móviles en África)',
    serie: [{ anio: '2024', tamano: 52000 }, { anio: '2025', tamano: 60500 }, { anio: '2030e', tamano: 90300 }],
    tcac_historico_pct: null, tcac_previsto_pct: 8.3, cr5_pct: null, estructura: 'Concentrada en cada país (dos o tres operadores), fragmentada en el continente',
    drivers: [
      { driver: 'Penetración de smartphones y datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Penetración de smartphones de Airtel del 49,5 % en FY2026 (+4,7 puntos) y tráfico de datos +56 % en el 1T FY2027 [3, 4]' },
      { driver: 'Dinero móvil y bancarización', efecto: '+', horizonte: 'Estructural', evidencia: 'El 64 % de los adultos de los mercados de Airtel no está bancarizado; valor procesado de Airtel Money +49 % [2, 3]' },
      { driver: 'Demografía', efecto: '+', horizonte: 'Estructural', evidencia: 'Suscriptores únicos de África de 710 M en 2024 a 915 M en 2030 según GSMA [7]' },
      { driver: 'Tipos de cambio frente al dólar', efecto: '−', horizonte: 'Cíclico', evidencia: 'La devaluación de la naira llevó los ingresos en dólares a −5,3 % en FY2024 con +20 % en moneda constante [3]' },
      { driver: 'Coste de la energía', efecto: '−', horizonte: 'Cíclico', evidencia: 'El gasóleo resta 2,5-3 puntos de margen EBITDA en 2026 [4]' },
      { driver: 'Regulación de tarifas e impuestos al sector', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Subida de tarifas del 50 % en Nigeria en 2025; tasas sobre transacciones de dinero móvil en varios países [2, 1]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Dos o tres operadores por país: MTN en Nigeria, Uganda, Zambia, Ruanda y Congo; Safaricom (Vodacom) en Kenia; Vodacom y Orange en RD del Congo [2].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes de prepago atomizados; la portabilidad y las tarjetas múltiples dan algo de poder, pero el ARPU de datos sube [3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Torreras con contratos indexados al dólar y a la energía (IHS, que compra MTN; Helios) y pocos proveedores de equipos [4, 2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias y espectro limitados, y la red de distribución y de agentes tarda años en construirse [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Los satélites directos al móvil (Starlink) llegan con el espectro de los operadores; la voz migra a aplicaciones pero viaja por los datos del operador [4].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El volumen no tiene ciclo: los clientes y el consumo de datos crecieron en 2008-09, 2020 y 2022. El ciclo que manda es el de las monedas: la caída del petróleo de 2015-16 y la devaluación de la naira de 2023-24 hundieron los ingresos en dólares de los operadores con +20 % en moneda local [3]. Hoy la naira y el chelín keniano están estables o más fuertes y el Banco Central de Nigeria bajó tipos en septiembre de 2026 [3]: fase favorable del ciclo de divisa, que puede darse la vuelta con el precio del petróleo.' },
    regulacion: 'En Nigeria la Comisión de Comunicaciones autorizó en febrero de 2025 la primera subida de tarifas desde 2013 (hasta un 50 %) [2]. Los reguladores africanos cobran tasas sobre ingresos, sobre transacciones de dinero móvil y, en algunos países, sobre la importación de terminales; Ghana derogó en 2025 su tasa de dinero móvil y el volumen subió un 31 % [1]. Las licencias de servicios de pago separan el dinero móvil de la teleco (Nigeria: licencia de banco de servicios de pago desde 2022) [2]. La regulación de satélites directos al móvil obliga a pasar por el espectro de un operador local [4].',
    tendencias: 'Más datos y menos voz: el 4G y el 5G pasarán a dominar las conexiones y GSMA prevé un 21 % de conexiones 5G en África en 2030 [1]. Los operadores construyen fibra, centros de datos y banda ancha doméstica (Airtel invierte ≈ 1.100 M en FY2027) [3]. El dinero móvil se separa en sociedades cotizadas (Airtel Money en Londres en 2026; M-Pesa dentro de Safaricom) [6]. Los satélites se usan para llevar señal a zonas rurales a menor coste: Airtel firmó con Starlink en diciembre de 2025 [4]. Airtel gana con esto mientras siga invirtiendo al ritmo de la demanda.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 10.6,
    posicion: '2.º operador móvil de África por clientes (183,5 M); n.º 1 o 2 en la mayoría de sus 14 países; ≈ 10,6 % de los ingresos de los operadores móviles africanos de 2025 según GSMA (6.415 M de FY2026 sobre 60.500 M) [1, 3]',
    competidores: [
      { nombre: 'MTN Group', pais: 'Sudáfrica', ticker: 'MTN.JO', ingresos: ing('MTN.JO', zar), cuota_pct: null, margen_ebit_pct: null, comentario: `Rival directo en Nigeria, Uganda, Zambia, Ruanda y Congo; margen EBITDA de 12 meses del ${r1(Y['MTN.JO'].ebitda / Y['MTN.JO'].ventas * 100)} % [5]. Compra IHS Towers [4].` },
      { nombre: 'Vodacom Group (con Safaricom)', pais: 'Sudáfrica', ticker: 'VOD.JO', ingresos: ing('VOD.JO', zar), cuota_pct: null, margen_ebit_pct: null, comentario: `Rival en Kenia (Safaricom y M-Pesa), Tanzania y RD del Congo; margen EBITDA del ${r1(Y['VOD.JO'].ebitda / Y['VOD.JO'].ventas * 100)} % [5].` },
      { nombre: 'Orange Middle East and Africa', pais: 'Francia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en RD del Congo y en África francófona occidental; su negocio africano no cotiza por separado [2].' },
      { nombre: 'Telkom SA', pais: 'Sudáfrica', ticker: 'TKG.JO', ingresos: ing('TKG.JO', zar), cuota_pct: null, margen_ebit_pct: null, comentario: `Solo Sudáfrica (no compite con Airtel); referencia de valoración de teleco africana [5].` },
      { nombre: 'Globacom', pais: 'Nigeria', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Tercer operador en Nigeria, privado, sin cuentas públicas [2].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Airtel Money: 56,5 M de clientes y > 245.000 M USD de valor procesado anualizado; la red de agentes y comercios atrae usuarios y al revés [3].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Prepago con portabilidad y tarjetas múltiples; el monedero de Airtel Money ata más que la línea [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencias y espectro en 14 países; marca Airtel reconocida [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA del 49,3 %, por encima del de MTN (≈ 43 %) y de Vodacom (≈ 32 %), pero con las torres alquiladas y costes en dólares [3, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercados de dos o tres operadores con espectro limitado; la red y la distribución no se replican [2].' },
      ],
    },
    amenazas: 'La principal es MTN, más grande en Nigeria y con sus propias torres si cierra la compra de IHS: podría encarecer o retrasar la compartición de emplazamientos (la dirección no lo cree) [4]. En dinero móvil, M-Pesa domina Kenia y los bancos y las fintech (Opay, Moniepoint en Nigeria) compiten en pagos [2]. Los satélites directos al móvil son complementarios mientras usen el espectro de los operadores; un cambio regulatorio que dé espectro propio a los satélites sería una amenaza de baja probabilidad en cinco años [4]. La regulación de tarifas e impuestos al sector puede recortar márgenes en cualquier país.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'El negocio nace como Celtel (1998), que Zain compró en 2005; Bharti Airtel adquirió en 2010 las operaciones africanas de Zain por 10.700 M USD [2]. Tras años de pérdidas y ventas de torres, se reorganizó con foco en datos y dinero móvil y salió a bolsa en Londres y Lagos en junio de 2019 a 80 peniques [2]. En 2021 vendió el 23 % de Airtel Money a TPG (The Rise Fund), Mastercard, QIA y Chimera por ≈ 650 M USD [2]. La devaluación de la naira de 2023-24 hundió los ingresos en dólares; la subida de tarifas de Nigeria de 2025 y la recuperación de la moneda llevaron la acción de 114 a 355 peniques en 2025 [3]. En 2026 Bharti subió al 79,2 % y Airtel Money salió a bolsa en Londres [6].',
    hitos: [
      { anio: '2010', hito: 'Bharti Airtel compra las operaciones africanas de Zain (antes Celtel) por 10.700 M USD [2].' },
      { anio: '2019', hito: 'Salida a bolsa en Londres y Lagos a 80 peniques; entra en el FTSE 100 en 2022 [2].' },
      { anio: '2021', hito: 'TPG, Mastercard, QIA y Chimera compran ≈ 23 % de Airtel Money; ventas de torres en varios países [2].' },
      { anio: '2023-2024', hito: 'Devaluación de la naira: ingresos en dólares −5,3 % en FY2024 y pérdida neta de 165 M USD [3].' },
      { anio: '2024', hito: 'Sunil Taldar consejero delegado (julio); renovación de contratos de torres que sube los arrendamientos [2].' },
      { anio: '2025', hito: 'Subida de tarifas del 50 % en Nigeria (febrero); acuerdo con Starlink (diciembre) [2, 4].' },
      { anio: '2026', hito: 'Bharti sube al 79,2 % (junio); Airtel Money cotiza en Londres desde el 14-oct a 196 peniques (≈ 7.000 M USD) [6].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que más mueve las cifras es la inclusión digital y financiera (el negocio mismo: 54 M de clientes de dinero móvil, muchos sin cuenta bancaria) y la energía: buena parte de los emplazamientos funciona con gasóleo, que en 2026 restó 2,5-3 puntos de margen EBITDA [2, 4]. La seguridad de los datos y el fraude en dinero móvil son riesgos regulatorios [2].',
    controversias: 'En el 1T FY2027 registró 37 M USD por un acuerdo de principio en un litigio comercial de una filial; en FY2025, 16 M por un litigio de una antigua filial [2]. No se comprobó ninguna sanción relevante de un regulador en los tres últimos años con fuente primaria.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Yahoo (solo EBITDA); 2) no se descargaron los informes anuales de MTN y Vodacom por tiempo; 3) se da el margen EBITDA de 12 meses en el comentario', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe anual 2026; 2) web de inversores; 3) sin búsqueda en agencias por tiempo', decision: 'Omitido' },
  ],
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2026: consejo, comisiones, remuneración, acuerdo de relación con Bharti', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-05-07', url: `${CDN}/Airtel_Africa_plc_Annual_Report_and_Accounts_2026.pdf` },
  { id: 2, titulo: 'Directorate Change: Sunil Bharti Mittal deja la presidencia; Gopal Vittal presidente; Shravin Bharti Mittal vicepresidente (RNS)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-03-25', url: `${INV}/directorate-change/9490320` },
  { id: 3, titulo: 'Directorate Change: V. K. Viswanathan consejero independiente (RNS)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-07-22', url: `${INV}/directorate-change/9682721` },
  { id: 4, titulo: 'TR-1: Bharti Airtel Limited pasa al 79,22 % de los derechos de voto (22-jun-2026)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-06-25', url: `${INV}/holding-s-in-company/9637696` },
  { id: 5, titulo: 'TR-1: Indian Continent Investment Limited baja del 16,14 % al 0 % (22-jun-2026)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-06-25', url: `${INV}/holding-s-in-company/9637760` },
  { id: 6, titulo: 'Director/PDMR Shareholdings: concesión de acciones del plan a largo plazo a Taldar y Dua (26-jun-2026)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-07-01', url: `${INV}/director-pdmr-shareholding/9645679` },
  { id: 7, titulo: 'Director/PDMR Shareholdings: Bharti Airtel, liberación de prenda sobre 595,2 M de acciones a 3,66 GBP', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-06-29', url: `${INV}/director-pdmr-shareholding/9641715` },
  { id: 8, titulo: 'Result of AGM 2026 (votaciones)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-07-09', url: `${INV}/result-of-agm/9661887` },
  { id: 9, titulo: 'Total Voting Rights and Capital a 30-sep-2026 (3.624,2 M de derechos de voto)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: `${INV}/total-voting-rights/9802839` },
  { id: 10, titulo: 'Transaction in own shares: fin del primer tramo de recompra (24,5 M de acciones a 331,29 peniques de media)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-09-29', url: `${INV}/transaction-in-own-shares/9795214` },
  { id: 11, titulo: 'Notas de resultados FY2022-FY2026 (guía de capex y objetivos de cada año)', editor: 'Airtel Africa plc', tipo: 'Primaria', fecha: '2026-05-08', url: `${CDN}/Q4-2026/Press_release_FY'2026.pdf` },
];
const C = {
  _estado: 'Completa. Consejo y remuneración del informe anual 2026; participaciones y operaciones de directivos de los RNS de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Sunil Taldar', cargo: 'Consejero delegado', desde: '2024', participacion_pct: null, trayectoria: 'Entró en 2023 como director de transformación y es consejero delegado desde julio de 2024; antes, más de 30 años en consumo y telecomunicaciones en China, India, Indonesia y Singapur [1]. Con él la empresa pasó de un margen EBITDA del 46,5 % a uno del 49,3 % y de crecer un 20,5 % a un 24 % en moneda constante [11].' },
      { nombre: 'Kamal Dua', cargo: 'Director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Director financiero y consejero desde el 9-jul-2025; sustituyó a Jaideep Paul. Venía del propio grupo [1].' },
      { nombre: 'Gopal Vittal', cargo: 'Presidente no ejecutivo (nombrado por Bharti)', desde: '2024', participacion_pct: null, trayectoria: 'Consejero desde octubre de 2024 y presidente desde la junta de julio de 2026; fue consejero delegado de Bharti Airtel en India [2, 1].' },
      { nombre: 'Shravin Bharti Mittal', cargo: 'Vicepresidente no ejecutivo', desde: '2019', participacion_pct: null, trayectoria: 'Hijo del fundador de Bharti; consejero de Airtel Money y enlace con la sede de Dubái [2].' },
      { nombre: 'Tsega Gebreyes', cargo: 'Consejera independiente coordinadora', desde: '2019', participacion_pct: null, trayectoria: 'Consejera independiente desde la salida a bolsa [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Capex de 800-825 M USD, revisado al alza durante el año', real: '884 M, «en línea con la guía revisada»', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: 'Capex de 725-750 M USD', real: '670 M', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Capex de 800-825 M USD', real: '737 M (por las devaluaciones)', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Capex de ≈ 1.100 M USD', real: '389 M en el 1T, guía reiterada', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección publica solo la guía de capex; no da objetivos de ingresos ni de margen, así que su historial es corto. Las cifras de capex se cumplen casi siempre por debajo, en parte porque se miden en dólares [11]. El equipo es estable pero rota con el grupo Bharti: el consejero delegado y el director financiero cambiaron en julio de 2024 y julio de 2025 [1]. No se ha publicado un plan de sucesión.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Gopal Vittal', cargo: 'Presidente', tipo: 'Dominical', desde: '2024', comisiones: 'Nombramientos' },
      { nombre: 'Shravin Bharti Mittal', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2019', comisiones: '—' },
      { nombre: 'Sunil Taldar', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
      { nombre: 'Kamal Dua', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Tsega Gebreyes', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneración, Nombramientos' },
      { nombre: 'Paul Arkwright', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos' },
      { nombre: 'Awuneba Ajumogobia', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría y riesgos, Nombramientos' },
      { nombre: 'Cynthia Gordon', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos, Sostenibilidad' },
      { nombre: 'Ravi Rajagopal', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría y riesgos, Remuneración' },
      { nombre: 'V. K. Viswanathan', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría y riesgos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 87.18, voto_remuneracion_contra_pct: 12.82, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 2.15, fijo: 1.065, variable_corto: 1.085, variable_largo: 0, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado cobró 2,15 M USD en FY2026 (1,07 M fijos con vivienda y coche de expatriado y 1,09 M de bonus anual; sin plan a largo plazo cobrado) [1]. El bonus se mide en moneda constante con el plan anual [1]. El plan a largo plazo de 2026 (418.827 acciones de rendimiento al consejero delegado) mide el crecimiento anual compuesto de los ingresos netos, la mejora del margen EBITDA y el rendimiento total frente al índice MSCI de comunicaciones de mercados emergentes, con un periodo de mantenimiento hasta el quinto año; las acciones restringidas tienen como condición el flujo de caja operativo [6]. La política de remuneración tuvo un 12,8 % de votos en contra en la junta de 2026, con el accionista de control votando a favor [8].',
    accionistas: [
      { nombre: 'Bharti Airtel Limited (a través de Airtel Africa Mauritius)', pct: 79.22, tipo: 'Control', variacion: 'Sube del 62,9 % al 79,22 % el 22-jun-2026 al recibir el 16,3 % de Indian Continent Investment (familia Mittal) a cambio de 146,8 M de acciones nuevas de Bharti [4, 5]' },
      { nombre: 'Indian Continent Investment Limited (familia Mittal)', pct: 0, tipo: 'Antiguo accionista de referencia', variacion: 'Del 16,14 % al 0 % el 22-jun-2026 [5]' },
      { nombre: 'Autocartera', pct: 0.17, tipo: 'Autocartera', variacion: '6,1 M de acciones; recompra en curso [9, 10]' },
      { nombre: 'Capital flotante', pct: 20.6, tipo: 'Flotante', variacion: 'Baja del ≈ 37 % al ≈ 20 % con la operación de Bharti [4]' },
    ],
    insiders: [
      { fecha: '2026-06-22', persona: 'Indian Continent Investment (vinculada a Shravin Bharti Mittal)', operacion: 'Venta', acciones: 595204251, importe: null },
      { fecha: '2026-06-22', persona: 'Bharti Airtel (vinculada a Sunil Bharti Mittal y Gopal Vittal)', operacion: 'Compra', acciones: 595204251, importe: null },
    ],
    control_y_defensas: 'Bharti Airtel controla el 79,22 % de los votos desde junio de 2026 [4]. Un acuerdo de relación de 2019 con Bharti obliga a que las operaciones vinculadas se aprueben con mayoría de independientes y deja al consejo funcionar con independencia; dura mientras Bharti tenga al menos el 10 % [1]. Bharti nombra al presidente (Gopal Vittal, no independiente) [2]. Bharti presta servicios a la empresa (contrato de servicios) [1]. El flotante del 20 % deja a los minoritarios sin capacidad de bloqueo en las juntas, salvo en las votaciones de independientes, que se cuentan aparte [8]. No hay clases de acciones ni límites de voto. Un riesgo y una opción a la vez: Bharti podría lanzar una oferta por el resto o, al contrario, la acción puede salir del FTSE 100 si el flotante baja más [4].',
    alertas: [
      'Bharti subió al 79,22 % comprando el 16,3 % a la familia Mittal con un descuento del ≈ 11,6 % sobre el cierre previo (13-may-2026) [4, 5].',
      'Cambio de presidente (Sunil Bharti Mittal → Gopal Vittal, julio de 2026) y de director financiero (julio de 2025) [2, 1].',
      'Cambio de auditor propuesto (Deloitte → EY) para FY2028 [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de AAF.L, ^FTSE y EXV2.DE (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/AAF.L/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de Airtel Africa, Airtel Money y comparables (estimaciones, recomendaciones, precio objetivo, múltiplos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/AAF.L/analysis' },
  { id: 3, titulo: "Analysts' consensus for Airtel Africa plc (FY'26-FY'28, media de 10 analistas a 31-mar-2026)", editor: 'Airtel Africa plc', tipo: 'Analistas', fecha: '2026-03-31', url: `${CDN}/Q4-2026/Airtel_Africa_plc_FY'26_consensus.pdf` },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Country Default Spreads and Risk Premiums (ctryprem.xlsx, enero de 2026)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/ctryprem.xlsx' },
  { id: 7, titulo: 'Tipos de cambio de referencia del euro (USD y GBP), 16 a 21-oct-2026', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD+GBP.EUR.SP00.A' },
  { id: 8, titulo: 'Airtel Money announcement of offer price (196 peniques; 5.300 M GBP de capitalización)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: `${INV}/airtel-money-announcement-of-offer-price/9801247` },
  { id: 9, titulo: 'Airtel Money announcement of final offer details (2.700 M de acciones; 270 M vendidas por los minoritarios; bloqueo de 180 días)', editor: 'Airtel Mobile Commerce N.V. (RNS)', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://www.investegate.co.uk/announcement/rns/airtel-mobile-commerce-n-v---amc/airtel-money-announcement-of-final-offer-details/9814566' },
  { id: 10, titulo: 'Airtel Money intention to float (Airtel Africa tiene el 77,85 %)', editor: 'Airtel Africa plc (RNS)', tipo: 'Primaria', fecha: '2026-09-23', url: `${INV}/airtel-money-intention-to-float-announcement-/9785842` },
  { id: 11, titulo: 'Airtel Africa Aktie nach dem Börsengang von Airtel Money: Kursmarken und wichtige Termine (cronología de 2025-2026)', editor: 'Admiral Markets', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://admiralmarkets.com/de/wissen/articles/shares/airtel-africa-aktie-kurs' },
  { id: 12, titulo: 'Airtel Africa falls as Bharti Airtel raises stake at discounted price (Alliance News)', editor: 'Placera / Alliance News', tipo: 'Prensa', fecha: '2026-05-13', url: 'https://www.placera.se/telegram/airtel-africa-airtel-africa-falls-as-bharti-airtel-raises-stake-at-discounted-price-20260513' },
  { id: 13, titulo: 'Airtel Africa shares sink as Airtel Money said to cut IPO size', editor: 'Hargreaves Lansdown (Alliance News)', tipo: 'Prensa', fecha: '2026-09-18', url: 'https://www.hl.co.uk/shares/stock-market-news/company--news/airtel-africa-shares-sink-as-airtel-money-said-to-cut-ipo-size' },
  { id: 14, titulo: 'herramientas/movimiento.mjs AAF.L (Yahoo, sesión del 21-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/AAF.L' },
  { id: 15, titulo: 'Airtel Money: notice of results (resultados del 1S el 26-oct-2026)', editor: 'Airtel Mobile Commerce N.V. (RNS)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.investegate.co.uk/announcement/rns/airtel-mobile-commerce-n-v---amc/notice-of-results/9834711' },
  { id: 16, titulo: 'Bharti Airtel Limited agreed to acquire 16.31% stake in Airtel Africa Plc from Indian Continent Investment Limited for £1.9 billion', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-05-12', url: 'https://www.marketscreener.com/' },
  { id: 17, titulo: 'Airtel Money shares dip below IPO price in USD 7 billion London debut', editor: 'The Paypers', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://thepaypers.com/payments/news/airtel-money-shares-dip-below-ipo-price-in-usd-7-billion-london-debut' },
  { id: 18, titulo: 'Airtel Africa Shares Jump after Major Shareholder Mulls Increasing Stake', editor: 'Dow Jones / Morningstar', tipo: 'Prensa', fecha: '2026-05-11', url: 'https://www.morningstar.com/news/dow-jones/202605113123/airtel-africa-shares-jump-after-major-shareholder-mulls-increasing-stake' },
  { id: 19, titulo: 'Bharti Airtel share price: What CLSA says on Airtel Money IPO', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-06-05', url: 'https://www.businesstoday.in/amp/markets/stocks/story/bharti-airtel-share-price-what-clsa-says-on-airtel-money-ipo-sees-27-upside-535019-2026-06-05' },
];
const aaf = Y['AAF.L'];
const usd = (p) => Math.round(p * USD_GBP_P * 10000) / 10000;
// Comparables: capitalización en millones de USD; PER de los próximos 12 meses = precio ÷ (BPA de los ejercicios estimados
// ponderados por los meses que caen en los próximos 12 desde el 21-oct-2026). EV/EBITDA de 12 meses de Yahoo.
const comp = (t, nombre, pais, fx, pesoAno1, divPrecio = 100) => {
  const y = Y[t]; const tr = y.trend.filter((x) => x.periodo === '0y' || x.periodo === '+1y');
  const bpaNtm = pesoAno1 * tr[0].bpa + (1 - pesoAno1) * tr[1].bpa;
  const precio = y.precio / divPrecio;
  return { nombre, ticker: t, pais, capitalizacion: Math.round(y.cap * fx / divPrecio * (divPrecio === 1 ? 1 : 1) / 1e6), ev_ventas: y.ev ? r2(y.ev / y.ventas) : null, ev_ebitda_ltm: y.ev_ebitda ? r1(y.ev_ebitda) : null, ev_ebitda_ntm: null, per_ntm: r1(precio / bpaNtm), crecimiento_pct: r1((tr[1].ventas / tr[0].ventas - 1) * 100), margen_ebitda_pct: r1(y.ebitda / y.ventas * 100), roic_pct: null, dn_ebitda: y.ev ? r1((y.ev - y.cap / divPrecio * (divPrecio === 1 ? 1 : 1)) / y.ebitda) : null, fcf_yield_pct: null };
};
const comps = [
  comp('MTN.JO', 'MTN Group', 'ZA', zar, 2.3 / 12),
  comp('VOD.JO', 'Vodacom Group', 'ZA', zar, 5.3 / 12),
  comp('BHARTIARTL.NS', 'Bharti Airtel', 'IN', inr, 5.3 / 12, 1),
  comp('TCELL.IS', 'Turkcell', 'TR', tr, 2.3 / 12, 1),
  comp('TKG.JO', 'Telkom SA', 'ZA', zar, 5.3 / 12),
];
// Yahoo da la cotización de las surafricanas en céntimos de rand pero la capitalización y el EV ya en rand.
for (const c of comps) if (c.pais === 'ZA') { const y = Y[c.ticker]; c.capitalizacion = Math.round(y.cap * zar / 1e6); c.dn_ebitda = r1((y.ev - y.cap) / y.ebitda); }
for (const c of comps) if (c.pais !== 'ZA') { const y = Y[c.ticker]; c.dn_ebitda = r1((y.ev - y.cap) / y.ebitda); }
const D = {
  _estado: 'Completa. Precio del informe: cierre del 20-oct-2026 (280,6 peniques; la sesión del 21-oct estaba abierta). Consenso de Yahoo y de la propia empresa (31-mar-2026); comparables de Yahoo del 21-oct.',
  identificacion: {
    nombre: 'Airtel Africa plc', nombre_corto: 'Airtel Africa', ticker: 'AAF', isin: 'GB00BKDRYJ47', mercado: 'London Stock Exchange (también Nigerian Exchange)', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido (sede operativa en Dubái; negocio en 14 países africanos)', pais_iso: 'GB', sector: 'Communication Services', industria: 'Wireless Telecommunication Services', sede: 'Londres', fundacion: '2010', empleados: 3168, web: 'https://airtel.africa',
    precio: usd(280.6), fecha_precio: '2026-10-20', acciones: 3624.2, capitalizacion_publicada: Math.round(aaf.cap * USD_GBP_P * 100 / 1e6), free_float_pct: 20.6,
    max_52s: usd(B.identificacion.max_52s), min_52s: usd(B.identificacion.min_52s), volumen_medio_diario: `≈ 3,7 M de acciones al día (≈ ${Math.round(3677266 * 3.2 * 1.3346 / 1e6)} M USD, 3 meses) [1]`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'La empresa solo da guía de capex: ≈ 1.100 M USD en FY2027 (reiterada el 23-jul-2026, con 389 M ya invertidos en el 1T) [3]. Avisó de que el gasóleo restará 2,5-3 puntos de margen EBITDA en ritmo anual, la mitad en el 1T y el resto en el 2T, en parte compensados con eficiencias. Dividendo progresivo: 7,1 centavos por acción en FY2026 (+9,2 %). Recompra de hasta el 1 % del capital aprobada en mayo de 2026 (primer tramo terminado: 24,5 M de acciones a 331,29 peniques de media).',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: Math.round(aaf.trend[2].ventas / 1e6), ebitda: 3779, ebit: null, bpa: Math.round(aaf.trend[2].bpa * 1000) / 1000, dpa: null, fuente: 'Yahoo (BPA de 2 analistas; ingresos) [2]; EBITDA del consenso de la empresa a 31-mar-2026 [3]' },
      { periodo: 'FY2028e', ingresos: Math.round(aaf.trend[3].ventas / 1e6), ebitda: 4394, ebit: null, bpa: Math.round(aaf.trend[3].bpa * 1000) / 1000, dpa: null, fuente: 'Yahoo (BPA de 5 analistas) [2]; EBITDA del consenso de la empresa [3]' },
      { periodo: 'FY2029e', ingresos: null, ebitda: null, ebit: null, bpa: null, dpa: null, fuente: 'Sin estimaciones gratuitas' },
    ],
    recomendaciones: { n_analistas: 6, comprar: 2, mantener: 3, vender: 0, po_medio: usd(aaf.po_medio), po_min: usd(aaf.po_min), po_max: usd(aaf.po_max) },
    revisiones: 'Según Yahoo, el BPA de FY2028 pasó de 32,4 centavos hace 90 días a 34,4 hoy, y el de FY2027 de 25,1 a 24,9 [2]. El consenso compilado por la empresa a 31-mar-2026 (10 analistas: ABSA, Bank of America, Barclays, CardinalStone, Citi, Goldman Sachs, HSBC, New Street, SBG y Deutsche Bank) daba ingresos de 7.548 M en FY2027 y 8.686 M en FY2028, EBITDA de 3.779 y 4.394 M y BPA de 23,5 y 31,3 centavos [3]: los ingresos estimados han subido después del 1T por la fortaleza de las monedas. HSBC rebajó a mantener en enero de 2026 y CardinalStone en agosto [11].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción subió un 212,7 % en 2025 (de 113,6 a 355,2 peniques), con la subida de tarifas de Nigeria, la recuperación de la naira y la promesa de sacar a bolsa Airtel Money [11]. En 2026 cae un 21 % hasta el 20-oct: tocó un máximo de 436 peniques el 11-may tras los resultados anuales, cayó un 13 % el 13-may cuando Bharti anunció que compraba el 16,3 % de la familia Mittal con un descuento del 11,6 % [12], y cayó un 9,9 % el 18-sep cuando se supo que la salida a bolsa de Airtel Money sería más pequeña (al menos 800 M USD frente a 1.500-2.000 M) [13]. Airtel Money se colocó a 196 peniques (≈ 7.000 M USD) y cotiza por debajo: 182,6 peniques el 20-oct [8, 2]. Beta mensual de 5 años de 1,6 frente al FTSE 100 y semanal de 2 años de 1,0 [1].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: -9.9, var_3m_pct: -18.7, var_6m_pct: -23.1, var_12m_pct: 24.1, dist_max_52s_pct: -33.1, dist_min_52s_pct: 23.2, dist_max_historico_pct: -33.1, tendencia: 'bajista', volatilidad_60d_pct: 36.4, avisos: ['P5 Un 18 % por debajo de la media de 200 sesiones (tendencia bajista)'] },
      movimientos_fuertes: [
        { periodo: '30-ene-2026', var_pct: -6.6, causa: 'Resultados del 3T FY2026 (30-ene): crecimiento fuerte pero margen EBITDA algo menor por costes de red y energía; recogida de beneficios tras la subida del 212 % de 2025 [1, 11].', veredicto: 'no cambia', condicion: null },
        { periodo: '11-may-2026', var_pct: 13.0, causa: 'Bharti Airtel dice que estudia subir su participación: máximo histórico (436 peniques) [18].', veredicto: 'no cambia', condicion: null },
        { periodo: '13 y 15-may-2026', var_pct: -22.5, causa: 'Bharti compra el 16,31 % a la familia Mittal (ICIL) con un descuento del 11,6 % y sin oferta a los minoritarios: −13,1 % el 13-may y −10,8 % el 15-may [12, 16, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jun 2026', var_pct: 17.9, causa: 'Recuperación tras la caída de mayo (máximo del mes el 17-jun): informes favorables sobre la salida a bolsa de Airtel Money (CLSA, 5-jun) y cierre de la compra de Bharti el 22-jun [19, 16].', veredicto: 'no cambia', condicion: null },
        { periodo: '18-sep-2026', var_pct: -11.3, causa: 'Se sabe que la salida a bolsa de Airtel Money será más pequeña tras escuchar a los inversores [13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: -20.3, causa: 'Airtel Money sale a 196 peniques (≈ 7.000 M USD, por debajo de lo esperado en primavera) y cotiza por debajo del precio de salida desde el primer día (9-oct, −6,3 % de Airtel Africa ese día); el mercado rebaja el valor de la filial que justificaba buena parte de la subida [8, 9, 17, 1].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-26', tipo: 'resultados', hecho: 'Airtel Money publica sus primeros resultados como cotizada (1S) el 26-oct [15]; los de Airtel Africa del 1S FY2027 no tienen fecha anunciada (el año pasado, 28-oct) [1, 11].', veredicto: 'retrasa', condicion: 'Hasta los resultados del 1S FY2027 de Airtel Africa (previstos hacia el 28-oct-2026)' },
        { fecha: '2026-10-14', tipo: 'accionista de referencia', hecho: 'Airtel Money empieza a cotizar sin condiciones; la colocación (270 M de acciones de minoritarios y hasta 27 M de Mastercard, ≈ 11 % del capital) no incluye acciones de Airtel Africa, que conserva el 77,85 %. Bloqueo de 180 días para los vendedores, hasta abril de 2027 [9, 10, 17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-29', tipo: 'directivos', hecho: 'Termina el primer tramo de recompra: 24,5 M de acciones a 331,29 peniques de media [C10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-22', tipo: 'accionista de referencia', hecho: 'Bharti Airtel pasa al 79,22 % tras comprar el 16,31 % a ICIL; el flotante baja al ≈ 20,6 %. No hay colocación anunciada ni probable: Bharti compra, no vende [16, 12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-23', tipo: 'resultados', hecho: 'Resultados del 1T FY2027: ingresos +21 % en moneda constante, margen EBITDA del 50,1 %, aviso de que el gasóleo restará 2,5-3 puntos de margen [A3].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'retrasa',
      condicion: 'Hasta los resultados del 1S FY2027 de Airtel Africa (previstos hacia el 28-oct-2026, sin fecha anunciada) y los de Airtel Money del 26-oct',
      comentario: 'La acción cae un 23 % en seis meses y está un 18 % bajo su media de 200 sesiones: el mercado ha recortado lo que pagaba por Airtel Money (salida a bolsa más pequeña y por debajo del precio de colocación) y castigó la compra de Bharti con descuento. No hay colocación pendiente: Bharti compra y Airtel Africa no vendió en la salida a bolsa de su filial. El veredicto es «retrasa» por la regla de tendencia bajista con resultados a menos de 15 días: los de Airtel Money el 26-oct y, previsiblemente, los propios hacia el 28-oct, que mostrarán el efecto del gasóleo en el margen [1, 14, 15].',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => c.anio >= 'FY2021').map((c) => {
      const fx = { FY2021: 1.3786, FY2022: 1.3147, FY2023: 1.2387, FY2024: 1.2617, FY2025: 1.2921, FY2026: 1.3243 }[c.anio];
      return { anio: c.anio, precio_cierre: r2(c.precio_cierre / 100 * fx * 1000) / 1000, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === 'FY2024' };
    }),
    comentario: 'Precios de cierre de cada ejercicio (31 de marzo) en peniques [1] pasados a dólares con el GBPUSD de ese día. El PER al cierre de FY2024 se excluye: el BPA de ese año fue negativo por las pérdidas de divisa de la naira. El múltiplo se ha más que duplicado desde 2024: la acción cotizaba a 7-9 veces el BPA del año siguiente (sin divisas) entre 2021 y 2023 y hoy a ≈ 15 veces el nuestro de los próximos 12 meses. Lo explican la recuperación de la naira y la subida de tarifas (beneficio más alto y más estable en dólares) y el valor que el mercado da ahora a Airtel Money por separado.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Operadores móviles de mercados emergentes con dinero móvil o mucho crecimiento: MTN (el rival africano más parecido), Vodacom (con Safaricom y M-Pesa), Bharti Airtel (matriz, India), Turkcell (emergente con inflación alta) y Telkom (África, más madura). Fuera: Maroc Telecom (Yahoo no da estimaciones), Safaricom (Yahoo no tiene la cotización de Nairobi) y Helios Towers (torres, otro negocio). Todo a precios del 21-oct-2026 de Yahoo y en dólares [2].',
    empresas: comps,
    comentario: 'La mediana del PER de los próximos 12 meses de los cinco es de ≈ 9,5 veces; Airtel Africa cotiza a ≈ 12,4 veces el BPA del consenso de los próximos 12 meses y a ≈ 15 veces el nuestro. Su prima frente a MTN (≈ 9,5 veces) y Telkom (≈ 6,8) se apoya en un crecimiento mayor (+15-20 % en dólares frente a +11-15 %), un margen EBITDA más alto (49 % frente a 43 % de MTN) y la participación cotizada en Airtel Money; frente a Bharti (≈ 26 veces), el descuento es por el riesgo de divisa africano. Turkcell (≈ 6,4) está distorsionada por la inflación turca. El EV/EBITDA de 12 meses de Airtel Africa (≈ 5,5 veces según Yahoo) está en la zona de MTN (4,9) y Turkcell (5,7) [2].',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'Airtel Africa (16,31 %)', comprador: 'Bharti Airtel (a Indian Continent Investment)', ev: 21400, ev_ventas: 3.34, ev_ebitda: 6.8, prima_pct: null, excluir: false, comentario: 'Pago en 146,8 M de acciones de Bharti por ≈ 1.900 M GBP (≈ 3,19 GBP por acción, descuento del ≈ 11,6 %); valor empresa implícito estimación propia: capital ≈ 15.600 M USD + deuda neta 5.590 + minoritarios contables 340, sobre el EBITDA de FY2026 [16, 12].' },
      { fecha: '2026-10', objetivo: 'Airtel Money (salida a bolsa, 11 % del capital)', comprador: 'Inversores en la colocación', ev: 7000, ev_ventas: 5.17, ev_ebitda: 10.2, prima_pct: null, excluir: false, comentario: 'Precio de 196 peniques, ≈ 7.000 M USD de capitalización; múltiplos sobre los ingresos (1.355 M) y el EBITDA (689 M) de FY2026, sin restar su caja propia (estimación propia) [8, 9].' },
      { fecha: '2021-07', objetivo: 'Airtel Money (≈ 23 % en varias rondas)', comprador: 'TPG The Rise Fund, Mastercard, QIA y Chimera', ev: 2650, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Valoración de ≈ 2.650 M USD de la primera ronda; sin EBITDA publicado del perímetro en esa fecha [10].' },
    ],
    comentario: 'Las dos referencias recientes son internas: Bharti compró a su propia familia el 16,3 % a ≈ 6,8 veces el EBITDA, con descuento, y el mercado pagó ≈ 10 veces el EBITDA por Airtel Money. Con el 79,2 % en manos de Bharti, una oferta de un tercero no es posible; una oferta de Bharti por el 20 % restante sí lo es, pero no hay ningún indicio publicado y la última compra la hizo con descuento.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones de terceros con múltiplo (5-10)', tipo: 'Complemento', intentos: '1) informe anual y RNS (solo operaciones internas); 2) búsqueda de compras de operadores africanos con múltiplo publicado; 3) prensa: no se encontraron múltiplos fiables en el tiempo disponible', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) registro de la FCA (posiciones netas cortas); 2) Investegate; 3) Yahoo: sin dato', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha, feed de Airtel Africa (artículo «Strong Operating Momentum, But Valuation Now Looks Balanced», 20-mar-2026, y titulares de resultados)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-23', url: 'https://seekingalpha.com/api/sa/combined/AAFRF.xml' },
  { id: 2, titulo: 'The Motley Fool UK, página del valor (artículos de marzo a octubre de 2026: «After plummeting 9.6% in a day, is there opportunity in this star FTSE 100 stock?», 21-sep-2026)', editor: 'The Motley Fool UK', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://www.twelfthmagpie.com/tickers/lse-aaf/' },
  { id: 3, titulo: 'Airtel Money shares dip below IPO price in USD 7 billion London debut (lectores y analistas de la colocación)', editor: 'The Paypers', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://thepaypers.com/payments/news/airtel-money-shares-dip-below-ipo-price-in-usd-7-billion-london-debut' },
  { id: 4, titulo: 'Airtel Money weighs smaller London IPO after investor feedback', editor: 'Daba Finance', tipo: 'Foros y redes', fecha: '2026-09-21', url: 'https://dabafinance.com/en/news/airtel-money-weighs-smaller-london-ipo-after-investor-feedback' },
];
const E = {
  _estado: 'Parcial. Stocktwits no tiene el símbolo; LSE Chat y Reddit no abren. Opiniones de Seeking Alpha, Motley Fool UK y prensa especializada de los últimos meses.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha', fecha: '2026-07', n_comentarios: 6, tono: 'Neutro', resumen: 'El último análisis largo (marzo de 2026) ve el impulso operativo intacto pero la valoración «equilibrada»; los titulares de julio destacan que los ingresos superaron el consenso [1].' },
      { plataforma: 'The Motley Fool UK', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'Tras la caída del 9,6 % del 18-sep los autores se preguntan si es una oportunidad; en marzo destacaban que subía mientras el FTSE caía por el conflicto de Oriente Medio [2].' },
      { plataforma: 'Prensa especializada en pagos (The Paypers, Daba Finance)', fecha: '2026-10', n_comentarios: 5, tono: 'Negativo', resumen: 'La colocación de Airtel Money se recortó tras escuchar a los inversores y la acción cayó bajo el precio de salida; se lee como «mercado de compradores» [3, 4].' },
    ],
    temas: [
      { tema: 'Valor de Airtel Money', postura: 'Dividida', peso: 'Alto', contraste: 'La colocación salió a ≈ 7.000 M USD frente a los ≈ 10.000 M que se comentaban en junio, y cotiza por debajo; aun así la participación del 77,85 % vale ≈ 5.100 M USD, ≈ 38 % de la capitalización de Airtel Africa.' },
      { tema: 'Control de Bharti y flotante', postura: 'Bajista', peso: 'Medio', contraste: 'Bharti compró con descuento y el flotante bajó al 20 %: menos liquidez y peso en los índices; no hay indicio de oferta por el resto.' },
      { tema: 'Naira y tarifas de Nigeria', postura: 'Alcista', peso: 'Medio', contraste: 'Nigeria creció un 47,5 % en moneda constante en FY2026 y su margen EBITDA pasó del 50 % al 58 %; la moneda está estable, pero es el mayor riesgo de los números.' },
      { tema: 'Satélites (Starlink, espectro de SpaceX)', postura: 'Bajista', peso: 'Bajo', contraste: 'La empresa los usa como complemento con su propio espectro; el riesgo de sustitución a 3-5 años es bajo.' },
    ],
    lectura: 'El sentimiento ha pasado de entusiasta (2025) a dividido: la salida a bolsa de Airtel Money, que era el catalizador, salió más pequeña y barata de lo esperado, y el control de Bharti ha subido. No aporta ningún riesgo que el informe no recoja; confirma que el mercado ya no paga la prima de 2025 por Airtel Money. No es capitulación: la acción sigue un 23 % por encima del mínimo de 52 semanas.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. Comparables:', comps.map((c) => `${c.nombre} PER ${c.per_ntm} cap ${c.capitalizacion} DN/EBITDA ${c.dn_ebitda}`).join('; '));
