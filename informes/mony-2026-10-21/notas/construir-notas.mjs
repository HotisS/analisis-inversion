// Escribe las notas A-E de MONY Group (corte 2026-10-21) a partir de los documentos de notas/docs (resultados anuales y
// semestrales de la empresa, informes anuales ESEF, RNS de Investegate, prensa), del XBRL ESEF (cuentas-xbrl.json), de
// bolsa.json (Yahoo, hasta el 19-oct-2026) y de yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026, 07:37 UTC).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/mony-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const BO = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const WEB = 'https://www.monygroup.com/application/files';
const XBRL = 'https://filings.xbrl.org/54930016B7VO33FBE722';
const INV = 'https://www.investegate.co.uk/announcement/rns/moneysupermarket-com-group--mony';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Preliminary results for the year ended 31 December 2025 (cuentas, segmentos, partidas no recurrentes, BPA ajustado, deuda, dividendos)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-02-23', url: `${WEB}/4417/7183/0120/Preliminary_2025_Statement_-_MONY_Group_-_23rd_February_2026.pdf` },
  { id: 2, titulo: 'Annual Report and Accounts 2025 (ESEF): notas de arrendamientos, vencimientos, covenants, intangibles, auditor, remuneración', editor: 'MONY Group PLC (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-17', url: `${XBRL}/2025-12-31/ESEF/GB/0/54930016B7VO33FBE722-2025-12-31/reports/54930016B7VO33FBE722-2025-12-31-T01.xhtml` },
  { id: 3, titulo: 'Interim results for the six months ended 30 June 2026 (cuentas semestrales, segmentos, deuda neta, IVA con HMRC, PPC)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: `${WEB}/1417/8461/3686/Interim_2026_Statement_-_MONY_Group_-_21st_July_2026_-_FFV.pdf` },
  { id: 4, titulo: 'Interim results for the six months ended 30 June 2025', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2025-07-21', url: `${WEB}/6817/5307/6582/Interim_2025_Statement_-_MONY_Group_-_21_July_2025.pdf` },
  { id: 5, titulo: 'Preliminary results for the year ended 31 December 2024 (2023 reexpresado con el IVA)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2025-02-17', url: `${WEB}/1317/3977/6070/Preliminary_2024_Statement_-_MONY_Group_-_17th_February_2025.pdf` },
  { id: 6, titulo: 'Preliminary results 2023', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2024-02-19', url: `${WEB}/2217/1319/0666/preliminary-results-2023.pdf` },
  { id: 7, titulo: 'FY22 preliminary results statement (compra de Quidco, segmentos 2021-2022)', editor: 'Moneysupermarket.com Group PLC', tipo: 'Primaria', fecha: '2023-02-20', url: `${WEB}/4517/1319/6419/fy22-prelims-results-statement.pdf` },
  { id: 8, titulo: 'FY2021 results presentation (EBITDA ajustado 2020-2021, BPA ajustado, deuda neta y Quidco)', editor: 'Moneysupermarket.com Group PLC', tipo: 'Primaria', fecha: '2022-02-21', url: 'https://www.monygroup.com/investors/results-reports-and-presentations/' },
  { id: 9, titulo: 'FY2020 results presentation (BPA ajustado 2019-2020)', editor: 'Moneysupermarket.com Group PLC', tipo: 'Primaria', fecha: '2021-02-22', url: 'https://www.monygroup.com/investors/results-reports-and-presentations/' },
  { id: 10, titulo: 'Annual Report and Accounts 2023 (ESEF): arrendamientos 2022-2023', editor: 'Moneysupermarket.com Group PLC (filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-03-15', url: `${XBRL}/2023-12-31/ESEF/GB/0/54930016B7VO33FBE722-2023-12-31/reports/54930016B7VO33FBE722-2023-12-31-T01.xhtml` },
  { id: 11, titulo: 'Interim Results Presentation and Q&A, 21 July 2026 (transcripción)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: `${WEB}/1317/8765/0531/Transcripts_-_MONY_Group_-_Interim_Results_Presentation_and_Q_and_A_-_21st_July_2026.pdf` },
  { id: 12, titulo: 'Preliminary 2025 Results Presentation and Q&A, 23 February 2026 (transcripción)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-02-23', url: `${WEB}/3117/7305/0612/Combined_Transcripts_-_Prelim_Presentation_and_Prelim_Q_and_A_-_Monday_23rd_February_2026.pdf` },
  { id: 13, titulo: 'Preliminary results 2019 y 2018 (BPA ajustado 2018-2019)', editor: 'Moneysupermarket.com Group PLC', tipo: 'Primaria', fecha: '2020-02-24', url: `${WEB}/3717/1378/7808/preliminary-2019-pr.pdf` },
  { id: 14, titulo: 'Total Voting Rights a 30 de septiembre de 2026 (511.634.063 acciones, sin autocartera)', editor: 'MONY Group PLC (RNS, Investegate)', tipo: 'Primaria', fecha: '2026-09-30', url: `${INV}/total-voting-rights/9799585` },
  { id: 15, titulo: 'XBRL ESEF de MONY Group 2020-2025 (cuenta, balance y flujos)', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=54930016B7VO33FBE722' },
];

const anios = ['2021', '2022', '2023', '2024', '2025'];
// No recurrentes dentro del EBITDA publicado [1, 5, 8]: 2021 gastos de la compra de Quidco (3,6); 2023-2025 provisión de
// IVA irrecuperable y costes legales (1,0 / 3,0 / 4,4). Acciones diluidas medias [1, 5, 7].
const NR = { 2021: 3.6, 2022: null, 2023: 1.0, 2024: 3.0, 2025: 4.4 };
const DIL = { 2021: 536.5, 2022: 538.9, 2023: 539.1, 2024: 539.9, 2025: 533.0 };
const BPA = { 2021: 0.098, 2022: 0.127, 2023: 0.135, 2024: 0.150, 2025: 0.153 };
const DPA = { 2021: 0.1171, 2022: 0.1171, 2023: 0.121, 2024: 0.125, 2025: 0.1263 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, no_recurrentes_en_ebitda: NR[c.periodo], participadas_en_ebitda: null, bpa: BPA[c.periodo], dpa: DPA[c.periodo], dpa_extraordinario: 0, acciones_diluidas: DIL[c.periodo] };
  delete o.fin; delete o.dpa_base; return o;
});
// Balance: fondo de comercio e intangibles de la nota 7 [1, 7, 10]; arrendamientos = pasivo por arrendamiento (flujos
// no descontados − descuento de la nota de riesgo de liquidez) [2, 10]; 2021 sin dato publicado en los documentos leídos.
const GW = { 2021: 214.8, 2022: 214.3, 2023: 214.3, 2024: 214.3, 2025: 202.8 };
const INT = { 2021: 73.6, 2022: 65.6, 2023: 46.0, 2024: 38.2, 2025: 25.5 };
const ARR = { 2021: null, 2022: 28.6, 2023: 26.1, 2024: 23.0, 2025: 20.0 };
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, fondo_comercio: GW[b.periodo], intangibles: INT[b.periodo], existencias: 0, arrendamientos: ARR[b.periodo], activos_contrato: null, pasivos_contrato: null };
  if (b.periodo === '2025') o.inmovilizado_material = 26.0;
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f };
  if (f.periodo === '2023') o.desinversiones = 0;
  // 2025: venta de Flagstone 7,9 − caja de ITG al perder el control 3,9; compra de participadas 1,3 [1].
  if (f.periodo === '2025') { o.desinversiones = 4.0; o.adquisiciones = 1.3; }
  delete o.fin; return o;
});

const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 448.1, ebitda: 141.0, ebit: 118.6, beneficio_neto: 81.8, bpa: 0.156, dpa: 0.1266, dpa_extraordinario: 0, fcf: 84.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 4.5 },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Quidco (cashback), comprada el 1-nov-2021 por 104,6 M GBP: solo dos meses en la cuenta y entera en el balance de 2021 [7].' },
      { periodo: '2025', descripcion: 'Ice Travel Group (TravelSupermarket e icelolly): pérdida de control el 1-dic-2025, queda el 49,9 % como asociada; 11 meses en la cuenta de 2025 (17,6 M de ingresos) y fuera del balance [1].' },
    ],
    comentario: 'Los ingresos pasan de 316,7 M GBP en 2021 a 446,3 M en 2025 (TCAC del 9 %), pero casi todo el salto es de 2022-2023: la compra de Quidco (52,7-60,8 M anuales de cashback) y la inflación de las primas de coche de 2023 [7, 6]. En 2024 y 2025 la cifra crece un 2 % por año: el seguro de coche cae (primas −9 % en 2025) y lo compensan Money (+8 %) y Home Services (+33 %, vuelta del cambio de energía) [1]. En el primer semestre de 2026 los ingresos crecen un 6 % sin Travel (+1 % publicado) y el seguro vuelve a crecer (+4 %) [3]. El margen bruto baja de 66,2 % a 64,4 % en 2025 y a 63 % en el semestre por la inflación del coste por clic de Google (+21 % en 2024 y en 2025; ≈ 8 % a mitad de 2026) [1, 3]. El margen EBITDA ajustado se sostiene (32,5 % en 2025, 33,2 % en el semestre) porque los gastos de personal bajan un 11 % y la plantilla un 9 % con automatización e IA [1, 3].',
    ajustes: 'La empresa publica un EBITDA ajustado que suma la provisión por IVA irrecuperable y sus costes legales (1,0 M en 2023, 3,0 M en 2024, 4,4 M en 2025 y 2,3 M en el semestre de 2026) y, en 2021, 3,6 M de gastos de la compra de Quidco; van como partidas no recurrentes dentro del EBITDA [1, 5, 8]. El IVA no es del todo puntual: HMRC retiró en 2024 el método de recuperación acordado en 2012, la empresa ya paga liquidaciones y espera que la disputa siga en 2027 [3]. El BPA ajustado suma además la amortización de intangibles comprados (8,1 M en 2025; 21,1 M en 2023), la pérdida de 6,7 M por la cesión de ITG y las plusvalías de 2025 (2,5 + 0,6 M), y aplica un 25 % fijo de impuesto: 17,9 peniques en 2025 frente a 15,3 publicados [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 223.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 74.0, margen_ebitda_pct: 33.1, bpa: 0.089, vs_consenso: null },
      { periodo: '2S24', ingresos: 215.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 67.8, margen_ebitda_pct: 31.4, bpa: 0.082, vs_consenso: null },
      { periodo: '1S25', ingresos: 225.3, crecimiento_pct: 0.8, crecimiento_organico_pct: null, ebitda: 75.1, margen_ebitda_pct: 33.3, bpa: 0.093, vs_consenso: 'En línea' },
      { periodo: '2S25', ingresos: 221.0, crecimiento_pct: 2.5, crecimiento_organico_pct: null, ebitda: 70.0, margen_ebitda_pct: 31.7, bpa: 0.086, vs_consenso: 'En línea' },
      { periodo: '1S26', ingresos: 227.1, crecimiento_pct: 0.8, crecimiento_organico_pct: 6.0, ebitda: 75.5, margen_ebitda_pct: 33.2, bpa: 0.097, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'En febrero de 2026 la dirección vendió el giro a «empresa con IA»: acuerdo empresarial con OpenAI, aplicación de MoneySuperMarket en ChatGPT, Price Optimiser y Savings; los analistas preguntaron por el coste por clic (+21 % en 2025) y por cuánto tráfico podía llegar desde los modelos de lenguaje [12]. En julio de 2026 el mensaje cambió de defensa a producto: aplicación de MoneySuperMarket como «compañero financiero», Investments, SuperSaveClub Insurance (corredor digital propio) y banca para pymes [11]. La pregunta más repetida fue el coste de Google: el director financiero atribuye la inflación de 2025 a los AI Overviews, que empujaron los resultados orgánicos hacia abajo y cambiaron el formato de los anuncios, y dice que al cierre del semestre el coste por clic sube ≈ 8 % [11]. Sobre ChatGPT, la dirección reconoce «tráfico muy limitado» desde los modelos («uno de cada cinco búsquedas en el Reino Unido pasa ya por modelos de lenguaje») y no da cifras de la aplicación [11]. No cuantificó el margen bruto de la segunda mitad ni el efecto del modo IA de Google, y evitó dar un plazo para que el corredor propio aporte ingresos [11].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2028', importe: 48.0 }],
    liquidez: 'Caja 18,5 M GBP y línea de crédito renovable de 125 M (dispuestos 48,0 M a 30-jun-2026; vence en junio de 2028) [3, 1].',
    rating: 'Sin rating',
    coste_deuda_pct: 6.5,
    vida_media_anios: 2.0,
    otros_pasivos: 'Pasivo por arrendamientos de 20,0 M GBP a cierre de 2025 (23,0 M en 2024), sobre todo oficinas de Ewloe y Londres [2]. Provisión de 6,2 M por IVA irrecuperable a cierre de 2025 (9,4 M de provisiones totales a junio de 2026, con 1,9 M de desmantelamiento): HMRC rechaza el método de recuperación de IVA acordado en 2012, ya ha emitido liquidaciones que la empresa paga y la disputa seguirá en 2027 [1, 3]. Pagarés con los minoritarios de Podium de 2,3 M [3]. Covenants de apalancamiento y de cobertura de intereses con «holgura significativa» [2]. No hay pensiones de prestación definida, factoring ni pagos aplazados de compras pendientes (los de Quidco, 14,6 M en 2021, ya se pagaron) [7, 1].',
    comentario: 'La deuda bruta (crédito renovable) sube de 0 en 2020 a 57,5 M en 2021 por la compra de Quidco y baja a 14,0 M en 2025; a junio de 2026 vuelve a 48,0 M por la recompra (16,5 M), el dividendo final (48,5 M) y la estacionalidad del circulante [7, 1, 3]. Deuda neta sin arrendamientos de 31,8 M en junio frente a caja neta de 4,1 M en diciembre: la empresa reparte casi todo el flujo libre y se apoya en la línea de crédito [3]. El circulante es negativo (clientes 87,6 M frente a proveedores 98,1 M en 2025), pero los cobros a proveedores de energía y seguros de vida son más lentos y los clientes suben a 98,8 M en junio [1, 3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo es de 102-116 M GBP en 2022-2025 y convierte en caja casi todo el beneficio: con un capex de 9,6-14,1 M (casi todo desarrollo de software capitalizado) y 2,9 M de arrendamientos, el flujo libre ronda 90-98 M al año [1, 5]. Se reparte entero: dividendos de 62,8-66,9 M y, desde 2025, recompras (30,2 M en 2025; 25 M previstos en 2026) [1, 3]. El flujo operativo cae un 7 % en 2025 y un 17 % en el semestre de 2026 por el circulante (cobros más lentos de energía y vida, y menos saldo pendiente con los socios de Quidco) [1, 3]. La dirección considera el capex «particularmente bajo» y sin subidas previstas: la amortización de tecnología será ≈ 12 M en 2026 [3, 11]. Estimación propia: casi todo el capex es de mantenimiento del producto (la plataforma ya está en la nube); el crecimiento no exige inversión neta.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP (2025); PwC propuesto para 2026 tras el concurso', anios_auditor: 18, opinion: 'Favorable',
    comentario: 'KPMG audita desde la salida a bolsa de 2007 y el concurso de 2025 elige a PwC desde 2026 [2]. Las cuentas son sencillas: ingresos por comisión de cada cambio o clic, sin existencias y con poco capex. Tres puntos a vigilar: (1) el desarrollo de software capitalizado (8,0 M en 2025, 13,3 M en 2024) se amortiza fuera del EBITDA; (2) el EBITDA y el BPA ajustados excluyen el IVA irrecuperable, que lleva tres años seguidos y ya se paga en caja [1, 3]; (3) la cesión de ITG en 2025 (pérdida de 6,7 M) saca del perímetro un negocio con margen del 12 % [1]. Los pagos en acciones son pequeños (2,8 M, 2 % del beneficio). Lectura de los indicadores del motor en el texto de rentabilidad y en la síntesis.',
    senales: [
      { senal: 'IVA irrecuperable excluido del EBITDA ajustado tres años seguidos', nivel: 'Media', comentario: '1,0 / 3,0 / 4,4 M en 2023-2025 y 2,3 M en el semestre; disputa con HMRC hasta 2027 [1, 3].' },
      { senal: 'Auditor durante 18 años', nivel: 'Baja', comentario: 'KPMG desde 2007; rotación a PwC aprobada para 2026 [2].' },
      { senal: 'Circulante que consume caja', nivel: 'Baja', comentario: 'Clientes +11 % en el semestre por energía y vida; flujo operativo −17 % [3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo progresivo (12,63 peniques en 2025, +1 %; a cuenta de 2026 3,36, +1 %), con el crecimiento del dividendo moderado a propósito para reconstruir la cobertura, y devolución del flujo libre «sobrante» con recompras: 30 M GBP en 2025 (15 M de acciones) y 25 M en 2026, terminada en agosto [1, 3]. La dirección mantiene capacidad para compras «estratégicas y que creen valor» [1].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Quidco (Maple Syrup Media), cashback', importe: 104.6, ev_ebitda: null, financiacion: 'Deuda bancaria y crédito renovable (90,1 M iniciales netos de 32,5 M de caja adquirida; 14,6 M aplazados)', resultado: 'Ingresos de cashback de 57,6 M en 2022 frente a 52,7 M en 2025 y 23,8 M en el semestre de 2026 (−13 %); contribución de 7,8 M en 2025. Sin deterioro, pero por debajo del plan [7, 1, 3].' },
      { anio: '2021', objetivo: 'icelolly.com, integrada con TravelSupermarket en Ice Travel Group (67 %)', importe: null, ev_ebitda: null, financiacion: 'Aportación de TravelSupermarket', resultado: 'Travel cayó a 17,6 M de ingresos en 2025 con margen del 12 %; control cedido el 1-dic-2025 con pérdida de 6,7 M; queda el 49,9 % [1].' },
      { anio: '2022', objetivo: 'Podium Solutions (52 %), banca abierta', importe: 1.6, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pérdidas de 1,3-1,4 M anuales; patrimonio negativo [1].' },
    ],
    comentario: 'La dirección devuelve casi todo lo que genera: dividendos y recompras de 96 M en 2025 con un flujo libre de ≈ 95 M [1]. Las compras recientes han rendido poco: Quidco (104,6 M) ingresa hoy menos que cuando se compró y Travel se cedió con pérdida [1, 3]. La recompra de 2025-2026 se hizo a 150-200 peniques, con un PER de ≈ 10 veces, lo que crea valor si el beneficio se sostiene.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Insurance', descripcion: 'Comparación de seguros de coche, hogar, vida, viaje, mascotas y furgonetas; B2B', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 158.7, resultado: 94.7 }, { periodo: '2022', ingresos: 172.0, resultado: 98.3 }, { periodo: '2023', ingresos: 220.0, resultado: 126.5 }, { periodo: '2024', ingresos: 235.6, resultado: 133.8 }, { periodo: '2025', ingresos: 232.5, resultado: 125.1 }] },
      { nombre: 'Money', descripcion: 'Tarjetas, préstamos, cuentas, ahorro e hipotecas', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 75.2, resultado: 50.8 }, { periodo: '2022', ingresos: 103.3, resultado: 72.3 }, { periodo: '2023', ingresos: 100.2, resultado: 66.5 }, { periodo: '2024', ingresos: 97.8, resultado: 65.8 }, { periodo: '2025', ingresos: 105.7, resultado: 67.1 }] },
      { nombre: 'Home Services', descripcion: 'Energía, banda ancha y móvil', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 68.1, resultado: 33.2 }, { periodo: '2022', ingresos: 39.8, resultado: 25.2 }, { periodo: '2023', ingresos: 39.0, resultado: 26.5 }, { periodo: '2024', ingresos: 36.1, resultado: 25.0 }, { periodo: '2025', ingresos: 48.2, resultado: 32.9 }] },
      { nombre: 'Cashback', descripcion: 'Quidco', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 10.6, resultado: 1.8 }, { periodo: '2022', ingresos: 57.6, resultado: 9.5 }, { periodo: '2023', ingresos: 59.8, resultado: 7.7 }, { periodo: '2024', ingresos: 60.8, resultado: 8.4 }, { periodo: '2025', ingresos: 52.7, resultado: 7.8 }] },
      { nombre: 'Travel', descripcion: 'TravelSupermarket e icelolly (asociada desde dic-2025)', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 4.1, resultado: -0.9 }, { periodo: '2022', ingresos: 14.9, resultado: 4.9 }, { periodo: '2023', ingresos: 20.6, resultado: 5.4 }, { periodo: '2024', ingresos: 19.6, resultado: 3.9 }, { periodo: '2025', ingresos: 17.6, resultado: 2.1 }] },
      { nombre: 'Costes compartidos', descripcion: 'Plataforma de datos, marca y estructura, sin repartir', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 0, resultado: -79.1 }, { periodo: '2022', ingresos: 0, resultado: -94.7 }, { periodo: '2023', ingresos: 0, resultado: -100.7 }, { periodo: '2024', ingresos: 0, resultado: -95.1 }, { periodo: '2025', ingresos: 0, resultado: -89.9 }] },
      { nombre: 'Eliminaciones', descripcion: 'Ventas entre verticales (Cashback y Travel)', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 0, resultado: 0 }, { periodo: '2022', ingresos: 0, resultado: 0 }, { periodo: '2023', ingresos: -7.5, resultado: 0 }, { periodo: '2024', ingresos: -10.7, resultado: 0 }, { periodo: '2025', ingresos: -10.4, resultado: 0 }] },
    ],
    geografias: [{ nombre: 'Reino Unido', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ahorro estimado de los clientes', valor_anterior: '2,9 bn GBP', valor_actual: '2,8 bn GBP', variacion: '−3 %', comentario: '1,5 bn en el semestre de 2026 [1, 3].' },
      { kpi: 'Margen de marketing del grupo', valor_anterior: '58 %', valor_actual: '57 %', variacion: '−1 pp', comentario: 'Gasto en marketing de 194,0 M en 2025 (183,0 M en 2024) [1].' },
      { kpi: 'Usuarios activos (MSM y Quidco)', valor_anterior: '13,8 M', valor_actual: '12,7 M', variacion: '−8 %', comentario: 'Menos consultas de coche [1].' },
      { kpi: 'Ingreso por usuario activo', valor_anterior: '18,54 GBP', valor_actual: '20,21 GBP', variacion: '+9 %', comentario: 'Energía, vida y préstamos [1].' },
      { kpi: 'Socios de SuperSaveClub', valor_anterior: '1,0 M (feb-2025)', valor_actual: '2,5 M (jun-2026)', variacion: '+150 %', comentario: '19 % de los ingresos del grupo en el semestre de 2026; ingreso por socio 35 GBP frente a 20 GBP [1, 3].' },
      { kpi: 'Consulta en más de un canal (MSM)', valor_anterior: '25 %', valor_actual: '22 %', variacion: '−3 pp', comentario: 'Menos coche [1].' },
      { kpi: 'NPS de MSM y MSE', valor_anterior: '72', valor_actual: '73', variacion: '+1', comentario: 'YouGov [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'arrendamientos 2021', tipo: 'Complemento', intentos: '1) nota de riesgo de liquidez del informe anual 2023 (solo 2022-2023); 2) presentación de resultados de 2021 (no da el pasivo por arrendamiento); 3) XBRL ESEF (cuentas.mjs no trae el concepto)', decision: 'Omitido' },
  ],
  _estado: 'completa',
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Price Comparison Websites in the UK - Industry Analysis 2026 (resumen público: tamaño, crecimiento, márgenes)', editor: 'IBISWorld', tipo: 'Sectorial', fecha: '2026-06', url: 'https://www.ibisworld.com/united-kingdom/industry/price-comparison-websites/6258/' },
  { id: 2, titulo: 'Compare The Market: higher premiums help profit pass £200m (cuentas de Companies House del ejercicio a 30-jun-2024)', editor: 'City A.M.', tipo: 'Prensa', fecha: '2025-01', url: 'https://www.cityam.com/?p=2319536' },
  { id: 3, titulo: 'Future plc 2025 full year results (Go.Compare: ingresos 191,8 M GBP, −5 %)', editor: 'Future plc', tipo: 'Primaria', fecha: '2025-12-04', url: 'https://futureplc.com/wp-content/uploads/2025/12/Future-plc-2025-FULL-YEAR-RESULTS.pdf' },
  { id: 4, titulo: 'GoCo Group plc preliminary results for the year ended 31 December 2019', editor: 'GoCo Group plc (archivo de Future plc)', tipo: 'Primaria', fecha: '2020-03-03', url: 'https://futureplc.com/wp-content/uploads/2021/09/goco-group-preliminary-results-2019_press-release.pdf' },
  { id: 5, titulo: 'Preliminary results for the year ended 31 December 2025 (estrategia, segmentos, SuperSaveClub, coste por clic, OpenAI)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-02-23', url: `${WEB}/4417/7183/0120/Preliminary_2025_Statement_-_MONY_Group_-_23rd_February_2026.pdf` },
  { id: 6, titulo: 'Interim results 2026 (primas de coche −5 %, hogar −3 %, coste por clic +8 %, AI Overviews)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: `${WEB}/1417/8461/3686/Interim_2026_Statement_-_MONY_Group_-_21st_July_2026_-_FFV.pdf` },
  { id: 7, titulo: 'Money Supermarket shares tumble to 13-year low on AI fears (Insurify en ChatGPT)', editor: 'City A.M.', tipo: 'Prensa', fecha: '2026-02-10', url: 'https://www.cityam.com/money-supermarket-shares-tumble-to-13-year-low-on-ai-fears/' },
  { id: 8, titulo: 'Berenberg: la caída de Mony y Future por la aplicación de Insurify es exagerada', editor: 'Scottish Widows (Alliance News)', tipo: 'Analistas', fecha: '2026-02-11', url: 'https://www.investments.scottishwidows.co.uk/research-centre/market-news/article/?id=21661002&type=bsm' },
  { id: 9, titulo: 'Are agentic AI fears really behind the sharp fall in MONY Group shares?', editor: 'Kalkine Media', tipo: 'Prensa', fecha: '2026-09-25', url: 'https://kalkinemedia.com/uk/stocks/growth/are-agentic-ai-fears-really-behind-the-sharp-fall-in-mony-group-lsemony-shares' },
  { id: 10, titulo: "MoneySuperMarket's Response to the CMA Google Consultation (conducta de clasificación justa en el buscador)", editor: 'MoneySuperMarket (CMA, gov.uk)', tipo: 'Primaria', fecha: '2026-03', url: 'https://assets.publishing.service.gov.uk/media/69b970db635612b767a46665/MoneySuperMarket.pdf' },
  { id: 11, titulo: 'Interim Results Presentation and Q&A, 21 July 2026 (transcripción)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: `${WEB}/1317/8765/0531/Transcripts_-_MONY_Group_-_Interim_Results_Presentation_and_Q_and_A_-_21st_July_2026.pdf` },
  { id: 12, titulo: 'Annual Report and Accounts 2025 (ESEF): riesgos principales, CDP, objetivos de emisiones', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-03-17', url: `${XBRL}/2025-12-31/ESEF/GB/0/54930016B7VO33FBE722-2025-12-31/reports/54930016B7VO33FBE722-2025-12-31-T01.xhtml` },
  { id: 13, titulo: 'Yahoo Finance quoteSummary (ingresos y EBITDA de los últimos 12 meses de los competidores cotizados)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/FUTR.L' },
];
const B = {
  historia: {
    resumen: 'Simon Nixon y Duncan Cameron fundaron Mortgage 2000 en 1993, un intermediario de hipotecas que en 1999 se convirtió en moneysupermarket.com. La empresa salió a bolsa en Londres en julio de 2007 y, tras la caída de 2008, se rehízo como el comparador de seguros más grande del país. En 2012 compró MoneySavingExpert (87 M GBP), la web de consejos de Martin Lewis, y en 2021 Quidco (104,6 M), para crear un club de ahorro con cashback. Peter Duffy (antes Just Eat y easyJet) es consejero delegado desde 2020. En 2024 el grupo cambió su nombre a MONY Group y en 2025 cedió el control de su negocio de viajes. Desde 2025 se presenta como «empresa con IA» con acuerdo con OpenAI [5, 12].',
    hitos: [
      { anio: '1993', hito: 'Fundación de Mortgage 2000 (hipotecas) por Simon Nixon y Duncan Cameron.' },
      { anio: '1999', hito: 'Lanzamiento de moneysupermarket.com.' },
      { anio: '2007', hito: 'Salida a bolsa en Londres.' },
      { anio: '2012', hito: 'Compra de MoneySavingExpert por 87 M GBP.' },
      { anio: '2020', hito: 'Peter Duffy, consejero delegado; COVID hunde viajes y energía.' },
      { anio: '2021', hito: 'Compra de Quidco (104,6 M) y de icelolly.com; quiebras masivas de comercializadoras de energía: el cambio de energía desaparece hasta 2025 [5].' },
      { anio: '2023', hito: 'Lanzamiento de SuperSaveClub (club de socios con recompensas).' },
      { anio: '2024', hito: 'Cambio de nombre a MONY Group; HMRC retira el método de IVA de 2012 [5].' },
      { anio: '2025', hito: 'Acuerdo con OpenAI, aplicación en ChatGPT; cesión del control de Ice Travel Group; primera recompra (30 M) [5].' },
      { anio: '2026', hito: 'Caída a mínimos de 13 años por la aplicación de Insurify en ChatGPT (10-feb); Investments, SuperSaveClub Insurance y banca para pymes [7, 6].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Comparadores de precios de servicios financieros y del hogar en el Reino Unido: webs y aplicaciones que cobran al proveedor una comisión por cada cliente que contrata (seguros de coche, hogar y vida, tarjetas y préstamos, cuentas, energía, banda ancha) y, en el cashback, al comercio. Es el mercado de MONY, que solo opera en el Reino Unido. Se usa IBISWorld (≈ 2.100 M GBP de ingresos en 2026-27) y se contrasta con la suma de los cuatro grandes: MONY 446 M, Compare the Market 564 M (ejercicio a junio de 2024), Go.Compare 192 M y Confused.com (sin cifras públicas desde que la compró RVU en 2021) [1, 2, 3, 5].',
    tamano: '≈ 2.100 M GBP en 2026-27 (IBISWorld) [1]; los tres grandes con cifras públicas suman ≈ 1.200 M [2, 3, 5]',
    unidad_serie: 'millones de GBP (estimación propia a partir del TCAC de IBISWorld)',
    serie: [{ anio: '2022', tamano: 1890 }, { anio: '2023', tamano: 1940 }, { anio: '2024', tamano: 1950 }, { anio: '2025', tamano: 1995 }, { anio: '2026', tamano: 2100 }, { anio: '2027e', tamano: 2160 }, { anio: '2028e', tamano: 2220 }],
    tcac_historico_pct: 2.7, tcac_previsto_pct: 2.8, cr5_pct: 75, estructura: 'Concentrada',
    drivers: [
      { driver: 'Ciclo de las primas de seguro de coche', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Primas −9 % en 2025 y −5 % en el primer semestre de 2026; IBISWorld ve subidas en 2026-27 por costes de reparación [6, 1].' },
      { driver: 'Coste del tráfico de Google (clic de pago y AI Overviews)', efecto: '−', horizonte: 'Estructural', evidencia: 'Coste por clic +21 % en 2024 y en 2025, +8 % a mitad de 2026; el margen bruto de MONY baja de 66,2 % a 63 % [5, 6].' },
      { driver: 'Asistentes de IA y agentes de compra', efecto: '−', horizonte: 'Estructural', evidencia: 'Insurify en ChatGPT (feb-2026) y la ola de «IA agéntica» de septiembre de 2026 hundieron a MONY un 8,6 % y un 7,8 % en un día [7, 9].' },
      { driver: 'Reapertura del mercado de energía', efecto: '+', horizonte: 'Cíclico', evidencia: 'Home Services +33 % en 2025 y +30 % en el semestre de 2026 con el primer cambio colectivo en cinco años [5, 6].' },
      { driver: 'Tipos de interés y crédito', efecto: '+', horizonte: 'Cíclico', evidencia: 'Money +8 % en 2025 y +9 % en el semestre por cuentas, ahorro y tarjetas [5, 6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cuatro marcas que pujan por las mismas palabras en Google: Compare the Market, MoneySuperMarket, Go.Compare y Confused.com; Go.Compare −5 % en 2025 [3, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los proveedores (aseguradoras, bancos) dependen de los comparadores para captar clientes de coche, pero pueden bajar la comisión cuando el mercado se contrae [5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 5, justificacion: 'Google decide el coste y la visibilidad del tráfico: MONY se describe como «uno de los mayores socios de Google en el Reino Unido» y pide a la CMA transparencia sobre los anuncios [10].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Un comparador nuevo necesita conexiones con ≈ 250 proveedores, autorización de la FCA y marca; un asistente de IA podría saltarse esa barrera con acuerdos con los propios comparadores [8].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Asistentes de IA (ChatGPT, modo IA de Google) que responden «el seguro más barato» sin pasar por la web; hoy el tráfico de los modelos es «muy limitado» para MONY [11, 7].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El seguro de coche sale de un año de deflación de primas (−9 % en 2025) y en el primer semestre de 2026 las caídas se moderan (−5 %) con el hogar nueve meses por detrás [6]. Energía y banca están en fase alta. En 2008-09 el grupo resistió por el seguro de coche; en 2020 cayó un 11 % por viajes y energía y en 2021-22 el colapso de las comercializadoras de energía se llevó la mitad de Home Services [5].' },
    regulacion: 'La FCA regula la intermediación de seguros y crédito (deber del consumidor desde julio de 2023) y en 2022 prohibió cobrar más en la renovación que a un cliente nuevo, lo que redujo el beneficio de cambiar [12]. Ofgem fija el tope de precio de la energía, que decide si hay ofertas que comparar [6]. La CMA designó a Google con «estatus de mercado estratégico» en búsqueda (2025) y consulta normas de clasificación justa; MONY pide que incluyan los anuncios y los resúmenes de IA [10]. HMRC discute el método de recuperación de IVA de la empresa [6].',
    tendencias: 'Tres tendencias. Primera, el buscador cambia: los AI Overviews y el modo IA de Google empujan los resultados orgánicos y encarecen el clic [6, 11]. Segunda, los asistentes de IA empiezan a comparar dentro de la conversación (Insurify y Tuio en ChatGPT; uno de cada cinco búsquedas británicas ya pasa por modelos de lenguaje) [7, 11]. Tercera, los comparadores responden con clubes de socios y aplicaciones propias para que el cliente llegue directo (SuperSaveClub, 2,5 M de socios; Go.Compare relanza su aplicación) y con aplicaciones dentro de ChatGPT [6, 3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 21, posicion: 'N.º 2 de los comparadores del Reino Unido por ingresos (≈ 21 % del mercado de IBISWorld), detrás de Compare the Market (≈ 27 %) y por delante de Go.Compare (≈ 9 %) y Confused.com [1, 2, 3].',
    competidores: [
      { nombre: 'Compare the Market (BGL Group)', pais: 'Reino Unido', ticker: null, ingresos: 563.7, cuota_pct: 27, margen_ebit_pct: 39.3, comentario: 'Líder; ejercicio a junio de 2024; beneficio antes de impuestos 221,6 M (margen sobre ventas del 39 %, se usa como aproximación del EBIT) [2].' },
      { nombre: 'Go.Compare (Future plc)', pais: 'Reino Unido', ticker: 'FUTR', ingresos: 191.8, cuota_pct: 9, margen_ebit_pct: null, comentario: 'Ejercicio a septiembre de 2025, −5 %; Future no publica el EBIT del segmento [3].' },
      { nombre: 'Confused.com (RVU, ZPG)', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, comentario: 'Comprada a Admiral en 2021 dentro de un paquete de 508 M; sin cifras públicas [1].', margen_ebit_pct: null },
      { nombre: 'Uswitch (RVU, ZPG)', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Fuerte en energía y banda ancha; sin cifras públicas.' },
      { nombre: 'TopCashback', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Principal rival de Quidco en cashback; privada.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Mercado de dos lados con ≈ 250 proveedores conectados en tiempo real; más usuarios atraen mejores ofertas exclusivas (cambio colectivo de energía de 2025) [8, 5].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El usuario compara en varias webs; SuperSaveClub intenta crear fidelidad (2,5 M de socios, ingreso por socio 35 GBP frente a 20) [6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'MoneySavingExpert, la marca financiera más recomendada del país, 9 M de suscriptores al correo semanal y 3,5 M de descargas de la aplicación; autorización de la FCA [6].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA ajustado del 32,5 % en 2025 frente a ≈ 39 % de margen antes de impuestos de Compare the Market [5, 2].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Cuatro marcas se reparten un mercado de ≈ 2.100 M que crece ≈ 3 %: poco atractivo para un entrante clásico [1].' },
      ],
    },
    amenazas: 'Dos amenazas con probabilidad alta. La primera, Google: cada cambio del buscador (AI Overviews en 2024-25, modo IA en 2026) ha subido el coste del clic y ha bajado el margen bruto de MONY del 66,2 % al 63 % [6]. La segunda, los asistentes de IA que comparan y contratan sin pasar por la web; hoy aportan «tráfico muy limitado», pero el analista de Berenberg admite que es «la forma en que probablemente evolucionará el mercado» [11, 8]. El foso que queda son la marca MoneySavingExpert, las conexiones reguladas con los proveedores y los clubes de socios.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'CDP (cambio climático)', calificacion: 'B', fecha: '2025-12' }],
    materialidad: 'Lo material para las cifras es la conducta con el consumidor y los datos: la empresa trata más de 40 datos personales por cada consulta de seguro de coche y más de 100 en casos complejos [11]; un incidente de datos o una sanción de la FCA por el deber del consumidor afectaría a la marca, que es su foso. El impacto ambiental es pequeño (oficinas; objetivo de cero emisiones operativas en 2030) [12].',
    controversias: 'Sin sanciones ni litigios materiales en tres años; la empresa es demandada en «un pequeño número» de disputas propias de su actividad [12]. La disputa de IVA con HMRC está provisionada [6].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'MONY Group es el segundo comparador de precios del Reino Unido. Opera tres marcas: MoneySuperMarket (comparador de seguros, préstamos, tarjetas, cuentas, energía y banda ancha, con el club SuperSaveClub y una aplicación), MoneySavingExpert (web de consejos de Martin Lewis, 9 M de suscriptores al correo semanal) y Quidco (cashback en tiendas en línea). Además vende su plataforma a terceros (B2B: Which?, Rightmove, Autotrader, Blue Light Card), espacios publicitarios a proveedores y datos de conversión (Market Boost). Desde 2026 añade productos propios: ahorro e inversión, un corredor digital de seguros y banca para pymes [5, 6].',
    como_gana_dinero: 'Cobra una comisión fija al proveedor por cada cliente que contrata (coste por adquisición), y en Quidco una comisión del comercio de la que devuelve una parte al socio. El ingreso depende del número de cambios (más en años de primas al alza o con ofertas de energía) y de la comisión. El principal coste es comprar tráfico: el gasto en marketing fue de 194 M en 2025 (43 % de los ingresos), sobre todo clics de Google y televisión; el margen bruto es del 64 % [5]. Los costes fijos (plataforma y personal) son el resto: margen EBITDA ajustado del 32,5 % [5]. Hay apalancamiento operativo pero poco ingreso recurrente; los socios del club, con un ingreso medio de 35 GBP, son la parte más estable [6].',
    clientes: 'Los clientes que pagan son los proveedores: ≈ 250 aseguradoras, bancos y comercializadoras conectados en tiempo real; ninguno supera el 10 % de los ingresos según el informe anual [8, 12]. El poder de precios es bajo: la comisión por cliente la fija la competencia entre los cuatro comparadores, y la empresa no ha podido trasladar el +21 % anual del coste por clic (el margen bruto baja 3 puntos en dos años) [5, 6]. Del lado del consumidor, el uso es gratuito y la fidelidad se compra con recompensas (SuperSaveClub: 2,5 M de socios, 80 % ya eran usuarios) [5, 6].',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'ingresos y margen de Confused.com y Uswitch', tipo: 'Complemento', intentos: '1) búsqueda de las cuentas de RVU en prensa; 2) comunicado de Admiral de 2021 (503 de la web); 3) Insurance Insider (pago)', decision: 'Omitido' },
  ],
  _estado: 'completa',
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025: consejo, informe de remuneraciones, participaciones y accionistas', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-03-17', url: `${XBRL}/2025-12-31/ESEF/GB/0/54930016B7VO33FBE722-2025-12-31/reports/54930016B7VO33FBE722-2025-12-31-T01.xhtml` },
  { id: 2, titulo: 'Result of AGM 2026 (votos de la política de remuneración y del informe)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-04-30', url: `${INV}/result-of-agm/9546846` },
  { id: 3, titulo: 'Board Changes: Emma Lloyd entra y Sarah Warby sale (oct-2026)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-07-20', url: `${INV}/directorate-changes/9675793` },
  { id: 4, titulo: 'Holding(s) in Company: Moltiply Group SpA llega al 12,02 % (9-jun-2026)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-06-10', url: `${INV}/holding-s-in-company/9611929` },
  { id: 5, titulo: 'Holding(s) in Company: BlackRock 5,92 % (5-oct-2026)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-10-06', url: `${INV}/holding-s-in-company/9811095` },
  { id: 6, titulo: 'Holding(s) in Company: JPMorgan Asset Management 5,82 % (16-oct-2026)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-10-19', url: `${INV}/holding-s-in-company/9831747` },
  { id: 7, titulo: 'Director/PDMR Shareholding: venta para impuestos de Michael Phillips y concesión de acciones (30-mar-2026)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-03-31', url: `${INV}/director-pdmr-shareholding/9500942` },
  { id: 8, titulo: 'Director/PDMR Shareholding: Peter Duffy, venta y recompra inmediata («bed and ISA») de 12.118 acciones (10-abr-2026)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-04-13', url: `${INV}/director-pdmr-shareholding/9515502` },
  { id: 9, titulo: 'Director/PDMR Shareholding: compras mensuales del plan de acciones de empleados (mayo de 2026)', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-05-08', url: `${INV}/director-pdmr-shareholding/9562194` },
  { id: 10, titulo: 'Stockwatch: enigmatic share offering 8.5% yield (compra de 20.000 GBP de un consejero no ejecutivo a 158 peniques)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-02-24', url: 'https://www.ii.co.uk/analysis-commentary/stockwatch-enigmatic-share-offering-85-yield-ii538232' },
  { id: 11, titulo: 'Resultados y guías anuales 2021-2026 (consenso de EBITDA ajustado al empezar cada año)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: `${WEB}/1417/8461/3686/Interim_2026_Statement_-_MONY_Group_-_21st_July_2026_-_FFV.pdf` },
  { id: 12, titulo: 'December Statement 2025 (consenso de 2025 rebajado a 142,7 M)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2025-12-03', url: `${WEB}/1417/6474/5013/MONY_Group_-_December_Statement_-_3rd_December_2025.pdf` },
];
const C = {
  directivos: {
    equipo: [
      { nombre: 'Peter Duffy', cargo: 'Consejero delegado', desde: '2020', participacion_pct: 0.2, trayectoria: 'Antes consejero delegado de Just Eat, director comercial de easyJet y director de marketing de Audi UK. Con él, el EBITDA ajustado pasa de 100,5 M (2021) a 145,1 M (2025) y la plantilla se reduce con la nueva plataforma en la nube; el precio de la acción cae un 23 % en el mismo periodo [1, 11].' },
      { nombre: 'Niall McBride', cargo: 'Director financiero', desde: '2023', participacion_pct: 0.0, trayectoria: 'Antes director financiero de Ocado Retail y director en Rothschild & Co. Ha llevado la primera recompra (2025) y la reducción de costes de personal (−11 % en 2025) [1].' },
      { nombre: 'Jonathan Bewes', cargo: 'Presidente (no ejecutivo)', desde: '2025', participacion_pct: 0.0, trayectoria: 'Banquero de inversión 25 años y vicepresidente de banca corporativa de Standard Chartered; preside la comisión de auditoría de Sage y Next. Compró 20.000 acciones [1].' },
      { nombre: 'Shazadi Stinton', cargo: 'Directora jurídica y secretaria del consejo', desde: '2022', participacion_pct: null, trayectoria: 'Antes jefa de asesoría jurídica de Severn Trent [1].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'Consenso de EBITDA ajustado de 96,4-128,8 M (media 116,8 M)', real: '100,5 M', cumplida: 'Parcial' },
      { anio: '2023', guia: 'Consenso de 114,6-129,7 M (media 123,2 M)', real: '131,9 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'Consenso de 133,8-146,2 M (media 141,1 M)', real: '141,8 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Consenso de 147,0 M (143,1-151,7 M) en febrero; rebajado a 142,7 M en diciembre sin ITG', real: '145,1 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Dentro del consenso de 140-148 M (media 146 M), confirmado en julio', real: '75,5 M en el primer semestre', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable: consejero delegado desde 2020 y director financiero desde 2023, sin cambios en la cúpula en 24 meses [1]. La dirección cumple la guía de EBITDA desde 2023, aunque suele guiar con el consenso y no con cifras propias [11, 12]. Lo que no ha cumplido es el crecimiento: los ingresos sin Travel crecen ≈ 2 % al año desde 2023 y la cotización cae un 23 % desde 2021. El plan de sucesión no es público; el consejo renueva consejeros independientes de forma escalonada (Warby sale tras ocho años) [3].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jonathan Bewes', cargo: 'Presidente', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos (presidente)' },
      { nombre: 'Peter Duffy', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2020', comisiones: '—' },
      { nombre: 'Niall McBride', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Caroline Britton', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría (presidenta), Nombramientos, Remuneración, Riesgos' },
      { nombre: 'Lesley Jones', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Riesgos y sostenibilidad (presidenta), Auditoría, Nombramientos' },
      { nombre: 'Rakesh Sharma', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, Nombramientos, Remuneración, Riesgos' },
      { nombre: 'Mary Beth Christie', cargo: 'Consejera (representante de los empleados)', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Nombramientos, Remuneración, Riesgos' },
      { nombre: 'Emma Lloyd', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, Remuneración, Nombramientos, Riesgos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 87.25, voto_remuneracion_contra_pct: 12.75, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.83, fijo: 0.72, variable_corto: 0.67, variable_largo: 0.44, ratio_salario_medio: 25 },
    remuneracion: 'El consejero delegado cobró 1,83 M GBP en 2025: 0,66 M de salario, 0,67 M de bonus (68,3 % del máximo, ligado al EBITDA ajustado) y 0,44 M de acciones restringidas que se consolidan [1]. Desde 2025 el plan a largo plazo pasa de incentivos por objetivos (BPA ajustado) a acciones restringidas con condiciones mínimas, y en 2026 la junta aprobó un plan «híbrido» (92,26 % a favor) y una política nueva con el 91,17 % [1, 2]. La política de 2023 tuvo el 12,75 % de votos en contra [1]. El variable premia EBITDA y BPA ajustados, no la rentabilidad del capital ni el flujo libre. Relación con el salario mediano: 25 veces [1]. Hay cláusulas de recuperación (malus y clawback) [1].',
    accionistas: [
      { nombre: 'Moltiply Group SpA (Facile.it, Italia)', pct: 12.0, tipo: 'Industrial (comparadores)', variacion: 'De 9,06 % (dic-2025) a 10,01 % (feb-2026) y 12,02 % (9-jun-2026) [1, 4]' },
      { nombre: 'BlackRock, Inc.', pct: 5.92, tipo: 'Institucional', variacion: 'Sube de 5,0 % a 5,92 % (con derivados) en 2026 [5]' },
      { nombre: 'JPMorgan Asset Management', pct: 5.82, tipo: 'Institucional', variacion: 'Pasa el 5 % el 16-oct-2026 [6]' },
      { nombre: 'Prudential plc (M&G)', pct: 5.07, tipo: 'Institucional', variacion: 'Notificado a dic-2025 [1]' },
      { nombre: 'Allianz Global Investors', pct: 4.99, tipo: 'Institucional', variacion: 'Notificado a dic-2025 [1]' },
      { nombre: 'Massachusetts Financial Services', pct: 4.98, tipo: 'Institucional', variacion: 'Notificado a dic-2025 [1]' },
      { nombre: 'Autocartera', pct: 0, tipo: 'Autocartera', variacion: 'Las acciones recompradas se amortizan; 511,6 M en circulación a 30-sep-2026 [1]' },
    ],
    insiders: [
      { fecha: '2026-02-24', persona: 'Consejero no ejecutivo (según interactive investor)', operacion: 'Compra', acciones: 12658, importe: 0.02 },
      { fecha: '2026-03-30', persona: 'Michael Phillips (directivo)', operacion: 'Venta', acciones: 38124, importe: 0.06 },
      { fecha: '2026-04-10', persona: 'Peter Duffy (venta y recompra inmediata para una cuenta ISA)', operacion: 'Venta', acciones: 12118, importe: 0.02 },
    ],
    control_y_defensas: 'Sin accionista de control, una acción un voto y sin blindajes [1]. El dato relevante es Moltiply Group, dueña de los comparadores Facile.it (Italia) y de negocios de corretaje, que ha subido del 9 % al 12 % en 2026 [4]. Con el código de OPAs británico, un accionista que supera el 30 % tiene que lanzar oferta; Moltiply no ha dicho que vaya a hacerlo. Es a la vez un posible comprador y un freno a una oferta de terceros.',
    alertas: ['Moltiply Group sube al 12 % sin declarar intenciones (posible oferta o bloqueo) [4].', 'Cambio de auditor de KPMG (18 años) a PwC en 2026 [1].'],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
  _estado: 'completa',
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fx = { GBp: 0.01, GBP: 1, EUR: 0.84028, USD: 0.84028 / 1.1215, SEK: 0.84028 / 11.123 };
const comps = [
  ['Auto Trader', 'AUTO.L', 'GB'], ['Rightmove', 'RMV.L', 'GB'], ['Baltic Classifieds', 'BCG.L', 'GB'], ['Scout24', 'G24.DE', 'DE'],
  ['Hemnet', 'HEM.ST', 'SE'], ['Future (Go.Compare)', 'FUTR.L', 'GB'], ['EverQuote', 'EVER', 'US'], ['MediaAlpha', 'MAX', 'US'], ['LendingTree', 'TREE', 'US'],
];
const empresas = comps.map(([nombre, t, pais]) => {
  const d = Y[t];
  const f = d.divisa === 'GBp' ? 1 : fx[d.divisa]; // cap/ev de Yahoo para GBp ya vienen en GBP
  const ys = d.trend.filter((x) => x.periodo.endsWith('y'));
  const g0 = ys[0]?.crec_ventas, g1 = ys[1]?.crec_ventas;
  const meses0 = Math.max(0, (new Date(ys[0].fin) - new Date('2026-10-21')) / (30.44 * 86400000));
  const w0 = Math.min(12, meses0) / 12;
  const crec = g0 != null && g1 != null ? (w0 * g0 + (1 - w0) * g1) * 100 : null;
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(d.cap * f / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(d.per_adelantado), crecimiento_pct: r1(crec), margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: null,
    dn_ebitda: r1((d.ev - d.cap) / d.ebitda), fcf_yield_pct: null,
  };
});
const fD = [
  { id: 1, titulo: 'Históricos diarios de MONY.L, ^FTMC y ^FTAS (precio, rango, volumen, beta, cierres de cada ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/MONY.L/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de MONY.L y de los comparables (BPA esperado, recomendaciones, objetivo medio, múltiplos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MONY.L/analysis' },
  { id: 3, titulo: 'MONY Group plc: estimaciones anuales 2026-2028 (ingresos, EBITDA, EBIT, BPA, dividendo, caja neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/MONY-GROUP-PLC-4007304/finances/' },
  { id: 4, titulo: 'Rendimiento nominal del gilt a 10 años (serie IUDMNPY), 1 a 16 de octubre de 2026', editor: 'Bank of England (IADB)', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro (USD 1,1215; GBP 0,84028; SEK 11,123)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Interim results 2026 (consenso de EBITDA ajustado 2026: 140-148 M, media 146 M; deuda neta)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: `${WEB}/1417/8461/3686/Interim_2026_Statement_-_MONY_Group_-_21st_July_2026_-_FFV.pdf` },
  { id: 8, titulo: 'GoCo Group plc preliminary results 2019 (ingresos 152,4 M; EBITDA ajustado 32,2 M; deuda neta 71,6 M)', editor: 'GoCo Group plc', tipo: 'Primaria', fecha: '2020-03-03', url: 'https://futureplc.com/wp-content/uploads/2021/09/goco-group-preliminary-results-2019_press-release.pdf' },
  { id: 9, titulo: 'Future plc: recommended offer for GoCo Group plc (594 M GBP)', editor: 'Future plc', tipo: 'Primaria', fecha: '2020-11-25', url: 'https://futureplc.com/?p=4296' },
  { id: 10, titulo: 'FY22 preliminary results: compra de Quidco (104,6 M; 32,5 M de caja adquirida) y segmentos 2022', editor: 'Moneysupermarket.com Group PLC', tipo: 'Primaria', fecha: '2023-02-20', url: `${WEB}/4517/1319/6419/fy22-prelims-results-statement.pdf` },
  { id: 11, titulo: 'Admiral and Mapfre to sell comparison sites to RVU for £508mn', editor: 'Insurance Insider', tipo: 'Prensa', fecha: '2021-04', url: 'https://insuranceinsider.com/articles/137485/admiral-and-mapfre-to-sell-comparison-sites-to-rvu-for-508mn' },
  { id: 12, titulo: 'Posiciones cortas netas notificadas a la FCA (histórico), MONY Group', editor: 'Financial Conduct Authority', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.fca.org.uk/markets/short-selling/notification-disclosure-net-short-positions' },
  { id: 13, titulo: 'Total Voting Rights a 30-sep-2026', editor: 'MONY Group PLC (RNS)', tipo: 'Primaria', fecha: '2026-09-30', url: `${INV}/total-voting-rights/9799585` },
  { id: 14, titulo: 'Preliminary results 2025 (puente, arrendamientos, dividendo final, recompra de 25 M)', editor: 'MONY Group PLC', tipo: 'Primaria', fecha: '2026-02-23', url: `${WEB}/4417/7183/0120/Preliminary_2025_Statement_-_MONY_Group_-_23rd_February_2026.pdf` },
];
const mony = Y['MONY.L'];
const D = {
  identificacion: {
    nombre: 'MONY Group PLC', nombre_corto: 'MONY Group', ticker: 'MONY', isin: 'GB00B1ZBKY84', mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 250',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Servicios de comunicación', industria: 'Medios interactivos y servicios', sede: 'Ewloe (Gales, Reino Unido)', fundacion: '1993', empleados: null, web: 'www.monygroup.com',
    precio: 2.006, fecha_precio: '2026-10-20', acciones: 514.4, capitalizacion_publicada: Math.round(mony.cap / 1e6), free_float_pct: 87.5,
    max_52s: 2.14, min_52s: 1.397, volumen_medio_diario: `≈ ${String(r1(BO.volumen_3m.importe_dia_millones / 100)).replace('.', ',')} M GBP/día (3 meses)`, proximos_resultados: '2027-02-22',
  },
  consenso: {
    guidance: 'La empresa no da cifras propias: «confía en lograr un EBITDA ajustado de 2026 dentro del consenso publicado», de 140-148 M GBP con media de 146 M (21-jul-2026; en febrero era 142-153 M con media 146 M) [7]. No hay plan a medio plazo con objetivos numéricos. El consenso del propio grupo no se pudo abrir (página con aviso legal); se usa el de Yahoo para el BPA y el de MarketScreener para ingresos, EBITDA y dividendo [2, 3].',
    estimaciones: [
      { periodo: '2026e', ingresos: 451.4, ebitda: 145.3, ebit: 129.3, bpa: 0.187, dpa: 0.1288, fuente: 'Yahoo (BPA ajustado, 11 analistas) y MarketScreener (resto) [2, 3]' },
      { periodo: '2027e', ingresos: 467.6, ebitda: 151.1, ebit: 135.2, bpa: 0.200, dpa: 0.1345, fuente: 'Yahoo (BPA ajustado, 11 analistas) y MarketScreener (resto) [2, 3]' },
      { periodo: '2028e', ingresos: 485.0, ebitda: 159.0, ebit: 143.3, bpa: null, dpa: 0.1403, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 7, mantener: 4, vender: 0, po_medio: r2(mony.po_medio / 100), po_min: r2(mony.po_min / 100), po_max: r2(mony.po_max / 100) },
    revisiones: 'El BPA ajustado de 2026 del consenso sube de 18,55 a 18,71 peniques en 90 días y el de 2027 de 19,93 a 20,00: estable tras el semestre [2]. Berenberg rebajó su objetivo de 275 a 250 peniques el 28-jul tras el margen bruto del semestre (63 % frente a 66 %), manteniendo comprar (MarketBeat). El EBITDA de MarketScreener es el ajustado de la empresa (145,1 M en 2025) y su BPA, el publicado (15,2 peniques en 2025): para el PER se usa el ajustado de Yahoo, que es la base de nuestros casos [2, 3].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.0,
    confianza: 'Media',
  },
  bolsa: {
    ...BO.bolsa,
    anual: BO.bolsa.anual ?? BO.anual,
    posicion_corta_pct: 2.4,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: r2(BO.cierres_ejercicio.find((c) => c.anio === a).precio_cierre / 100), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay comparadores de seguros cotizados puros en el Reino Unido salvo Future (dueña de Go.Compare, que pesa el 27 % de sus ingresos). Se usan tres grupos: (1) Future, el rival directo; (2) captadores de clientes de seguros y crédito de EE. UU. que cobran por cliente (EverQuote, MediaAlpha, LendingTree), con el mismo riesgo de Google y de la IA; (3) portales de anuncios europeos de dos lados (Auto Trader, Rightmove, Baltic Classifieds, Scout24, Hemnet), que comparten el riesgo de la IA agéntica pero tienen más foso. Se excluye Admiral (aseguradora). Cifras de Yahoo a 21-oct-2026, convertidas con el BCE [2, 6].',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2020-11', objetivo: 'GoCo Group (Go.Compare)', comprador: 'Future plc', ev: 665.6, ev_ventas: 4.37, ev_ebitda: 20.7, prima_pct: 23.6, excluir: false, comentario: 'Capital 594 M + deuda neta 71,6 M; EBITDA ajustado de 2019 de 32,2 M, deprimido por la inversión en AutoSave [8, 9].' },
      { fecha: '2021-04', objetivo: 'Penguin Portals (Confused.com, Rastreator, LeLynx) y 50 % de Preminen', comprador: 'RVU (ZPG, Silver Lake)', ev: 508, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor total de 508 M; Admiral no publicó el beneficio del perímetro vendido [11].' },
      { fecha: '2021-11', objetivo: 'Quidco (cashback)', comprador: 'Moneysupermarket.com Group', ev: 72.1, ev_ventas: 1.25, ev_ebitda: 7.6, prima_pct: null, excluir: false, comentario: '104,6 M menos 32,5 M de caja adquirida; ventas y contribución EBITDA de 2022 (57,6 y 9,5 M, antes de costes compartidos) [10].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'más operaciones con múltiplo', tipo: 'Complemento', intentos: '1) comunicados de Admiral (sin beneficio del perímetro vendido); 2) prensa sobre RVU y Uswitch (sin cifras); 3) operaciones de comparadores europeos (Moltiply, Check24: privadas o sin múltiplo publicado)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'consenso compilado por la empresa', tipo: 'Complemento', intentos: '1) página analyst-consensus (aviso legal que bloquea la descarga); 2) descarga con cookie; 3) MarketScreener y Yahoo como sustitutos', decision: 'Calculado y marcado como estimación' },
  ],
  _estado: 'completa',
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stockwatch: enigmatic share offering 8.5% yield (artículo y comentarios de lectores)', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-02-24', url: 'https://www.ii.co.uk/analysis-commentary/stockwatch-enigmatic-share-offering-85-yield-ii538232' },
  { id: 2, titulo: 'MONY Group dividend yield holds up as shares slip 5% on H1 results', editor: 'ABC Money', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.abcmoney.co.uk/2026/08/mony-group-dividend-yield-holds-up-as-shares-slip-5-on-h1-results' },
  { id: 3, titulo: 'Are agentic AI fears really behind the sharp fall in MONY Group shares?', editor: 'Kalkine Media', tipo: 'Foros y redes', fecha: '2026-09-25', url: 'https://kalkinemedia.com/uk/stocks/growth/are-agentic-ai-fears-really-behind-the-sharp-fall-in-mony-group-lsemony-shares' },
  { id: 4, titulo: 'Titulares de MarketBeat sobre MONY (artículos de Motley Fool UK sobre el dividendo, ago-oct 2026)', editor: 'MarketBeat / Motley Fool UK', tipo: 'Foros y redes', fecha: '2026-10-17', url: 'https://www.marketbeat.com/stocks/LON/MONY/news/' },
  { id: 5, titulo: 'Money Supermarket shares tumble to 13-year low on AI fears (comentario de AJ Bell)', editor: 'City A.M.', tipo: 'Foros y redes', fecha: '2026-02-10', url: 'https://www.cityam.com/money-supermarket-shares-tumble-to-13-year-low-on-ai-fears/' },
];
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'interactive investor (Stockwatch y comentarios)', fecha: '2026-02', n_comentarios: 15, tono: 'Dividido', resumen: '¿Golpe existencial de la IA o miedo exagerado con un dividendo cubierto 1,4 veces? El autor ve la tendencia bajista y duda de que la recompra cree valor si el negocio decae [1].' },
      { plataforma: 'ABC Money', fecha: '2026-08', n_comentarios: 5, tono: 'Neutro', resumen: 'La rentabilidad por dividendo del 6,4 % se sostiene; el semestre no trae sorpresa y la caída del flujo operativo es lo que hay que vigilar [2].' },
      { plataforma: 'Kalkine Media', fecha: '2026-09', n_comentarios: 5, tono: 'Negativo', resumen: 'La caída del 23-sep fue por miedo a la IA agéntica en todos los portales, sin noticia de la empresa [3].' },
      { plataforma: 'Motley Fool UK (vía MarketBeat)', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: 'Media docena de artículos de agosto a octubre la presentan como acción de rentas del FTSE 250 con un 6,5-7,4 % de dividendo [4].' },
      { plataforma: 'City A.M. (comentario de AJ Bell)', fecha: '2026-02', n_comentarios: 4, tono: 'Negativo', resumen: '«Reacciones instintivas» de inversores que temen que la IA se coma a corredores y comparadores [5].' },
    ],
    temas: [
      { tema: 'La IA dejará sin tráfico a los comparadores', postura: 'Bajista', peso: 'Alto', contraste: 'Riesgo real pero aún no visible en las cifras: ingresos sin Travel +6 % en el semestre; la dirección admite tráfico «muy limitado» desde los modelos de lenguaje. Lo que sí se ve es el coste de Google [1, 3].' },
      { tema: 'Dividendo alto y cubierto', postura: 'Alcista', peso: 'Alto', contraste: 'Dividendo de 12,63 peniques con BPA ajustado de 17,9: cobertura de 1,4 veces; el flujo libre (≈ 95 M) cubre dividendo y recompra [2, 4].' },
      { tema: 'Recompras en un negocio que no crece', postura: 'Dividida', peso: 'Medio', contraste: 'La recompra a un PER de ≈ 10 sube el BPA un 2-3 % al año si el beneficio aguanta [1].' },
      { tema: 'Quidco no ha funcionado', postura: 'Bajista', peso: 'Bajo', contraste: 'Cierto: el cashback ingresa 52,7 M en 2025 frente a 57,6 M en 2022 [1].' },
    ],
    lectura: 'El inversor particular la ve como acción de rentas con un riesgo de IA que no sabe medir; no hay euforia ni capitulación (la acción ya ha recuperado un 38,8 % desde el mínimo de febrero). El sentimiento no aporta un riesgo que el informe no tenga: coincide en que la IA es el tema central y en que el dividendo es el soporte. No contradice al consenso de analistas (7 de 11 comprar).',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
  _estado: 'completa',
};
guarda('E', E);
console.log('Notas A-E escritas;', empresas.length, 'comparables:', empresas.map((e) => `${e.ticker} PER ${e.per_ntm} cap ${e.capitalizacion} crec ${e.crecimiento_pct}`).join('; '));
