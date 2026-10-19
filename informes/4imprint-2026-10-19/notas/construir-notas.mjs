// Escribe las notas A-E de 4imprint Group plc (corte 2026-10-19) a partir de los documentos de notas/docs (informes anuales
// ESEF 2022-2025 de filings.xbrl.org, notas de resultados de la web de inversores, semestral de 2026), del XBRL ESEF
// (cuentas-xbrl.json), de bolsa.json (Yahoo, cierre de Londres del 19-oct-2026) y de yahoo-datos.json (quoteSummary del
// 19-oct-2026). Cada nota cita solo con [n] de su propia lista de fuentes. Cuentas en millones de USD; cotiza en peniques.
// Ejecutar: node informes/4imprint-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const r4 = (x) => (x == null ? null : Math.round(x * 10000) / 10000);
const n2 = (x) => String(x).replace('.', ',');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const FX = Y['GBPUSD=X'].precio; // USD por GBP, 19-oct-2026
const ESEF = 'https://filings.xbrl.org/213800G95T751RN2CT94';
const IR = 'https://investors.4imprint.com';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report & Accounts 2025 (52 semanas al 27-dic-2025): cuentas, notas, segmentos, riesgos, remuneración (ESEF)', editor: '4imprint Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-04-14', url: `${ESEF}/2025-12-27/ESEF/GB/0/213800G95T751RN2CT94-2025-12-27/reports/213800G95T751RN2CT94-2025-12-27-T01.xhtml` },
  { id: 2, titulo: 'Final results for the period ended 27 December 2025 (nota de resultados)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-03-11', url: `${IR}/media/v4okh2w0/results-announcement-fy-2025-final.pdf` },
  { id: 3, titulo: 'Half year results for the 26 weeks ended 27 June 2026 (cuentas semestrales, partidas de ajuste fiscales, guía 2026)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-08-05', url: `${IR}/media/av0ltear/4imprint-2026-interim-announcement-final-clean.pdf` },
  { id: 4, titulo: 'Annual Report & Accounts 2024 (52 semanas al 28-dic-2024) (ESEF)', editor: '4imprint Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2025-04-15', url: `${ESEF}/2024-12-28/ESEF/GB/0/213800G95T751RN2CT94-2024-12-28/reports/213800G95T751RN2CT94-2024-12-28-T01.xhtml` },
  { id: 5, titulo: 'Annual Report & Accounts 2023 (52 semanas al 30-dic-2023), con el registro financiero de cinco años 2019-2023 (ESEF)', editor: '4imprint Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-04-16', url: `${ESEF}/2023-12-30/ESEF/GB/0/213800G95T751RN2CT94-2023-12-30/reports/213800G95T751RN2CT94-2023-12-30-T01.xhtml` },
  { id: 6, titulo: 'Annual Report & Accounts 2022 (52 semanas al 31-dic-2022; comparativo 2021) (ESEF)', editor: '4imprint Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2023-04-18', url: `${ESEF}/2022-12-31/ESEF/GB/0/213800G95T751RN2CT94-2022-12-31/reports/213800G95T751RN2CT94-2022-12-31-T01.xhtml` },
  { id: 7, titulo: 'Half year results 2024 y 2025 (26 semanas al 29-jun-2024 y al 28-jun-2025)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2025-08-06', url: `${IR}/investors/latest-news/2025/half-year-results-for-the-26-weeks-ended-28-june-2025/` },
  { id: 8, titulo: 'Trading Update and Notice of Final Results (20-ene-2026)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-01-20', url: `${IR}/media/cwshw5ek/4imprint-january-2026-trading-update.pdf` },
  { id: 9, titulo: 'AGM Trading Update and Notice of Results (20-may-2026)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-05-20', url: `${IR}/media/04ibv3jr/4imprint-trading-update-20-may-2026.pdf` },
  { id: 10, titulo: 'Informes anuales ESEF 2020-2025 en xBRL-JSON (cuenta, balance y flujos)', editor: 'XBRL International, filings.xbrl.org (LEI 213800G95T751RN2CT94)', tipo: 'Primaria', fecha: '2026-10-19', url: `${ESEF}` },
];

// Ejercicios de 52/53 semanas que cierran a finales de diciembre (el de 2020 cerró el 2-ene-2021 y el de 2021 el 1-ene-2022:
// cuentas.mjs los etiquetó 2021 y 2022). Aquí: FY2021 = 53 semanas al 1-ene-2022 ... FY2025 = 52 semanas al 27-dic-2025.
// Cifras del registro de cinco años [1, 5] y de las cuentas [1, 4, 5, 6]; amortizaciones = depreciación y amortización +
// depreciación de derechos de uso (resumen de flujos [1, 5, 6]).
const C = [
  { periodo: '2021', ingresos: 787.3, gb: 226.0, ebit: 30.6, rf: -0.4, bai: 30.2, imp: 7.6, bn: 22.6, am: 5.0, gf: 0.4, bpa: 0.8026, dpa: 0.45, dpaex: 0, acc: 28.14 },
  { periodo: '2022', ingresos: 1140.3, gb: 321.9, ebit: 102.9, rf: 0.8, bai: 103.7, imp: 23.6, bn: 80.1, am: 5.5, gf: 0.4, bpa: 2.8495, dpa: 3.60, dpaex: 2.00, acc: 28.125 },
  { periodo: '2023', ingresos: 1326.5, gb: 401.9, ebit: 136.2, rf: 4.5, bai: 140.7, imp: 34.5, bn: 106.2, am: 6.4, gf: 0.4, bpa: r4(106.2 / 28.171), dpa: 2.15, dpaex: 0, acc: 28.171 },
  { periodo: '2024', ingresos: 1367.9, gb: 435.4, ebit: 148.1, rf: 6.3, bai: 154.4, imp: 37.2, bn: 117.2, am: 6.8, gf: 0.4, bpa: r4(117.2 / 28.22), dpa: 4.90, dpaex: 2.50, acc: 28.22 },
  { periodo: '2025', ingresos: 1346.8, gb: 436.0, ebit: 145.2, rf: 5.6, bai: 150.8, imp: 37.2, bn: 113.6, am: 6.9, gf: 0.2, bpa: 4.033, dpa: 2.40, dpaex: 0, acc: 28.167 },
];
const cuenta = C.map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: r1(c.ingresos - c.gb), gastos_generales: r1(c.gb - c.ebit), ebitda: r1(c.ebit + c.am), amortizaciones: c.am,
  ebit: c.ebit, resultado_financiero: c.rf, bai: c.bai, impuestos: c.imp, minoritarios: 0, beneficio_neto: c.bn, gastos_financieros: c.gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(c.bpa), dpa: c.dpa, dpa_extraordinario: c.dpaex, acciones_diluidas: c.acc,
}));
// Balance: caja = «cash and bank deposits» (efectivo + depósitos bancarios, medida de la empresa) [1, 5]; activo y pasivo total
// desde el registro de cinco años (activo no corriente + corriente; pasivo = activo − patrimonio). Sin deuda financiera.
const Bh = [
  { periodo: '2021', at: 167.8, ac: 127.8, pc: 73.0, inm: 24.7, fc: 0, intang: 1.0, ex: 20.6, cli: 63.6, prov: 71.9, caja: 41.6, arr: 12.1, pn: 83.0, res: -10.3 },
  { periodo: '2022', at: 240.3, ac: 192.4, pc: 87.4, inm: 29.2, fc: 1.0, intang: 1.0, ex: 18.1, cli: 87.5, prov: 84.8, caja: 86.8, arr: 13.7, pn: 140.2, res: 48.5 },
  { periodo: '2023', at: 238.3, ac: 186.9, pc: 91.3, inm: 34.7, fc: 1.0, intang: null, ex: 13.6, cli: 68.4, prov: 89.9, caja: 104.5, arr: 12.3, pn: 134.5, res: 39.0 },
  { periodo: '2024', at: 287.5, ac: 229.5, pc: 96.9, inm: 49.3, fc: 1.0, intang: null, ex: 17.1, cli: 64.4, prov: 95.0, caja: 147.6, arr: 5.3, pn: 185.1, res: 90.7 },
  { periodo: '2025', at: 262.3, ac: 205.8, pc: 95.2, inm: 49.0, fc: 1.0, intang: null, ex: 14.7, cli: 57.7, prov: 93.7, caja: 132.8, arr: 3.4, pn: 163.3, res: 60.0 },
];
const balance = Bh.map((b) => ({
  periodo: b.periodo, activo_total: b.at, activo_corriente: b.ac, pasivo_corriente: b.pc, pasivo_total: r1(b.at - b.pn), fondo_comercio: b.fc, intangibles: b.intang,
  inmovilizado_material: b.inm, existencias: b.ex, clientes: b.cli, proveedores: b.prov, activos_contrato: null, pasivos_contrato: null, caja: b.caja,
  deuda_financiera: 0, arrendamientos: b.arr, patrimonio_neto: b.pn, minoritarios: 0, reservas: b.res,
}));
const flujos = [
  { periodo: '2021', flujo_operativo: 11.4, capex: 3.5, pagos_arrendamientos: 1.1, adquisiciones: 0, desinversiones: 0, dividendos: 4.1, recompras: 0.8, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 76.9, capex: 8.0, pagos_arrendamientos: 1.2, adquisiciones: 0, desinversiones: 0, dividendos: 18.7, recompras: 1.2, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 137.0, capex: 9.7, pagos_arrendamientos: 1.4, adquisiciones: 0, desinversiones: 0.3, dividendos: 110.8, recompras: 1.1, emision_acciones: 2.4, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 132.6, capex: 19.5, pagos_arrendamientos: 1.5, adquisiciones: 0, desinversiones: 0.1, dividendos: 65.5, recompras: 2.0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 130.9, capex: 3.9, pagos_arrendamientos: 1.9, adquisiciones: 0, desinversiones: 0, dividendos: 142.8, recompras: 5.4, emision_acciones: 0, intereses_en_financiacion: 0 },
];
// Semestres [3, 7, 1, 5]: el segundo semestre = año − primer semestre. EBITDA = resultado operativo (ajustado en 1S26) +
// depreciación y amortización (incluidos derechos de uso) del semestre.
const sem = (p, ing, g, ebit, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: r1(ebit + da), margen_ebitda_pct: r2((ebit + da) / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del ESEF (filings.xbrl.org) comprobadas con el registro de cinco años y las notas de resultados; las etiquetas de cuentas.mjs estaban desplazadas un año en 2020-2021 (ejercicios de 53 semanas que cierran a primeros de enero). Caja = efectivo + depósitos bancarios. Sin deuda financiera.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-27', ingresos: r1(1346.8 - 659.4 + 666.4), ebitda: r1(145.2 - 70.7 + 59.6 + 6.9 - 3.6 + 3.4), ebit: r1(145.2 - 70.7 + 59.6), beneficio_neto: r1(113.6 - 55.5 + 43.5), bpa: r2((404.4 - 197.4 + 155.1) / 100), dpa: 2.40, dpa_extraordinario: 0, fcf: r1(128.0 - 74.6 + 49.3), participadas_en_ebitda: null, no_recurrentes_en_ebitda: 2.9 },
    cambios_perimetro: [],
    comentario: 'Crecimiento 100 % orgánico: 4imprint no compra empresas [1]. Las ventas se recuperaron de la pandemia (787 M USD en 2021, +45 % en 2022 hasta 1.140 M y +16 % en 2023 hasta 1.327 M) y desde entonces están planas: +3 % en 2024 y −2 % en 2025 (1.347 M), con los pedidos de clientes nuevos −12 % en 2025 [1, 2]. El margen operativo pasó del 3,9 % de 2021 al 10,8 % de 2024 y 2025 por dos causas: margen bruto del 28,7 % al 32,4 % (precio y mezcla, más bordado e impresión propios) y eficiencia del marketing (ingresos por dólar de marketing de 7,86 USD frente a la norma de antes de 2020, gracias a la publicidad de marca) [1, 5]. En el 1S26 el margen bruto bajó al 31,5 % por los aranceles repercutidos por los proveedores y el margen operativo ajustado al 9,4 % [3]. FY2021 tuvo 53 semanas; el resto, 52.',
    ajustes: 'Hasta 2025 no hubo partidas de ajuste: las cifras ajustadas y las publicadas coinciden [1]. En el 1S26 la empresa separa 5,2 M USD antes de impuestos (2,9 M en gastos operativos y 2,3 M netos en financieros; 5,1 M después de impuestos) por tratamientos fiscales inciertos: deja de considerar probable que se acepten ciertos tratamientos históricos del impuesto de sociedades, lo que recoloca pagos entre jurisdicciones (activo fiscal corriente de 19,0 M y pasivo de 19,5 M) y genera costes únicos de 4,6 M [3]. Es no recurrente y se excluye del BPA ajustado (173,2 frente a 155,1 centavos) y del LTM (2,9 M en el EBITDA de los últimos doce meses).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      sem('1S23', 635.5, null, 63.8, 3.0, 1.76, null),
      sem('2S23', 691.0, null, 72.4, 3.4, 2.02, null),
      sem('1S24', 667.5, 5.0, 69.9, 3.4, 1.94, 'En línea'),
      sem('2S24', 700.4, 1.4, 78.2, 3.4, 2.22, null),
      sem('1S25', 659.4, -1.2, 70.7, 3.6, 1.97, null),
      sem('2S25', 687.4, -1.9, 74.5, 3.3, 2.07, 'Superior'),
      sem('1S26', 666.4, 1.1, 62.5, 3.4, 1.73, 'Superior'),
    ],
    ultima_presentacion: 'La empresa no publica transcripciones; resume sus mensajes en las notas de resultados y en una retransmisión para analistas. En marzo de 2026 (resultados de 2025) el mensaje fue de resistencia: ventas −2 %, pedidos de clientes nuevos −12 % «constantes durante el año», margen operativo del 10,8 % sostenido por un margen bruto del 32,4 % y por la flexibilidad del marketing, y aviso de que los costes de los aranceles «se están repercutiendo» y podían afectar a ventas y márgenes de 2026 [2]. En agosto de 2026 (1S26) el tono mejoró: pedidos de clientes nuevos −9 % en el 1T y −5 % en el 2T, valor medio del pedido +3 % por subidas de precio «cuidadosamente consideradas», margen bruto del 31,5 % y guía de 2026 por encima de la horquilla de los analistas: ventas algo por encima de 1.350 M y beneficio antes de impuestos ajustado de ≈ 130 M [3]. Lo que no se cuantificó: cuánto margen bruto queda por recuperar con precio, qué parte del marketing va ya a buscadores con resúmenes de IA y por qué la cuota cae frente a Custom Ink, Staples o BDA, que crecieron en 2025 [3, 1].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja y depósitos de 136,9 M USD al 27-jun-2026 + línea de circulante de 20 M USD con JPMorgan (SOFR + 1,6 %, hasta el 31-may-2030) y descubierto de 1 M GBP con Lloyds, sin disponer [3].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Sin deuda financiera; solo arrendamientos de 2,9 M USD al 27-jun-2026 [3]. La línea de JPMorgan tiene covenants de beneficio neto mínimo y deuda/EBITDA, irrelevantes sin disposición [3]. Plan de pensiones de prestación definida en el Reino Unido cubierto con una póliza de anualidades desde 2023; la liquidación se inició en noviembre de 2025 y se espera cerrar en 2026 (activo de 0,3 M) [1]. Tratamientos fiscales inciertos: activo fiscal de 19,0 M, pasivo fiscal de 19,5 M y provisión de 5,7 M al 27-jun-2026, a usar en 12 meses; su importe «puede cambiar materialmente» [3]. No hay factoring ni confirming; los proveedores cobran en sus plazos y gran parte de los clientes pagan con tarjeta [1].',
    comentario: 'El circulante es negativo (−21,3 M USD a fin de 2025 y −24,2 M en junio de 2026): existencias bajas (14,7 M) porque el modelo es de envío directo desde el proveedor, clientes que pagan con tarjeta y proveedores pagados a plazo [1, 3]. Por eso crecer genera caja. La caja y los depósitos oscilan con los dividendos extraordinarios (147,6 M en 2024, 132,8 M en 2025 tras pagar 73,1 M de extraordinario, 136,9 M en junio de 2026) [1, 3]. La política es no endeudarse y mantener caja suficiente para la inversión y el dividendo ordinario del año siguiente; el exceso se reparte con dividendos extraordinarios [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'Conversión en caja muy alta: el flujo operativo subyacente fue de 158,0 M USD en 2025, el 109 % del resultado operativo (96 % en 2024) [1]. El capex es pequeño y en parte de expansión: 19,5 M en 2024 (ampliación del centro de distribución y placas solares, proyecto de 20 M) y 3,9 M en 2025; en 2026 ≈ 10 M por el traslado de las oficinas de Oshkosh al centro de distribución (7,4 M en el 1S26) [1, 3]. El capex de mantenimiento es del orden de la amortización (≈ 7 M, 0,5 % de las ventas; estimación propia). El flujo libre de la empresa (antes de dividendos) fue de 128,0 M en 2025 y 49,3 M en el 1S26 (74,6 M en el 1S25, con ganancias de cambio) [1, 3]. 2021 tuvo un flujo operativo de solo 11,4 M por la reconstrucción del circulante tras la pandemia [6].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP',
    anios_auditor: 7,
    opinion: 'Favorable',
    comentario: 'Cuentas sencillas: un solo negocio, sin compras, sin deuda, sin capitalización de desarrollo relevante (intangibles de software de ≈ 1 M) y sin partidas de ajuste hasta 2026 [1]. El único juicio contable crítico que señala la dirección es el reconocimiento de ingresos (agente o principal: 4imprint actúa como principal en pedidos que fabrican y envían los proveedores) [1]. La remuneración en acciones es pequeña (3,0 M USD en 2025, el 2 % del resultado operativo) [1]. La novedad es fiscal: en el 1S26 se reconocen 5,2 M de costes y un pasivo de 19,5 M por tratamientos del impuesto de sociedades que ya no se consideran probables de aceptar; la empresa los trata como no recurrentes [3]. EY audita desde el ejercicio 2019 (concurso de 2018) y habrá concurso en 2028 [1]. Altman y Beneish del motor: el capital invertido casi nulo hace que el Altman Z salga muy alto y que los índices de Beneish sean volátiles con pequeños cambios del circulante.',
    senales: [
      { senal: 'Tratamientos fiscales inciertos (1S26)', nivel: 'Media', comentario: 'Pasivo fiscal de 19,5 M USD y costes únicos de 4,6 M; importe sujeto a cambio material en 12 meses [3].' },
      { senal: 'Margen bruto presionado por aranceles', nivel: 'Baja', comentario: '31,5 % en el 1S26 frente a 32,8 % en el 1S25; no es contable, pero cambia la base del margen [3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: (1) inversión orgánica (marketing, personas, tecnología, instalaciones); (2) dividendo a cuenta y final que crece en línea con el BPA a lo largo del ciclo y que, como mínimo, se mantiene en una recesión; (3) compras de empresas, «no prioritarias a corto plazo»; (4) devolución del exceso de caja sobre la necesaria, sobre todo con dividendos extraordinarios [1]. Dividendo ordinario de 240 centavos por acción en 2024 y 2025 y a cuenta de 80 en 2026 [1, 3]; extraordinarios de 200 centavos (2022) y 250 (2024, pagado en junio de 2025, 73,1 M USD) [1]. No hay programa de recompras: la autocartera solo cubre los planes de empleados [1].',
    adquisiciones: [],
    comentario: 'La dirección ha sido una asignadora de capital disciplinada: ningún deterioro ni compra fallida en diez años, todo el crecimiento orgánico y el exceso de caja devuelto. Entre 2021 y 2025 repartió ≈ 342 M USD en dividendos frente a ≈ 489 M de flujo operativo y ≈ 45 M de capex [1, 5, 6]. La dilución es nula (28,1-28,2 M de acciones diluidas desde 2021). La crítica posible es que no recompra acciones con la caja sobrante cuando la acción cae (como en 2025, a 13-15 veces beneficios), y que la inversión en marca, que se gasta en la cuenta, no se mide con un retorno publicado más allá de los ingresos por dólar de marketing [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Norteamérica', descripcion: 'EE. UU. y Canadá, desde Oshkosh y Appleton (Wisconsin).', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: 773.7, resultado: 36.0 }, { periodo: '2022', ingresos: 1120.5, resultado: 108.0 }, { periodo: '2023', ingresos: 1302.6, resultado: 141.0 }, { periodo: '2024', ingresos: 1342.7, resultado: 153.6 }, { periodo: '2025', ingresos: 1321.5, resultado: 151.9 } ] },
      { nombre: 'Reino Unido e Irlanda', descripcion: 'Desde Mánchester.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: 13.6, resultado: -1.5 }, { periodo: '2022', ingresos: 19.8, resultado: -0.1 }, { periodo: '2023', ingresos: 23.9, resultado: 0.2 }, { periodo: '2024', ingresos: 25.2, resultado: -0.4 }, { periodo: '2025', ingresos: 25.3, resultado: -0.1 } ] },
      { nombre: 'Costes centrales', descripcion: 'Sede de Londres.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: 0, resultado: -3.9 }, { periodo: '2022', ingresos: 0, resultado: -5.0 }, { periodo: '2023', ingresos: 0, resultado: -5.0 }, { periodo: '2024', ingresos: 0, resultado: -5.1 }, { periodo: '2025', ingresos: 0, resultado: -6.6 } ] },
    ],
    geografias: [{ nombre: 'Norteamérica (EE. UU. y Canadá)', peso_pct: 98.1 }, { nombre: 'Reino Unido e Irlanda', peso_pct: 1.9 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos totales', valor_anterior: '2.124.000 (2024)', valor_actual: '2.060.000 (2025)', variacion: '−3 %', comentario: '1S26: 1.040.000 (−1 %) [3, 1].' },
      { kpi: 'Pedidos de clientes nuevos', valor_anterior: '480.000 (2024)', valor_actual: '421.000 (2025)', variacion: '−12 %', comentario: '1S26: 202.000 (−7 %; −9 % en el 1T y −5 % en el 2T) [3, 1].' },
      { kpi: 'Pedidos de clientes existentes', valor_anterior: '≈ 1.644.000 (2024)', valor_actual: '1.639.000 (2025)', variacion: 'plano', comentario: '1S26: 838.000, plano [3, 1].' },
      { kpi: 'Valor medio del pedido', valor_anterior: '—', valor_actual: '+1 % (2025)', variacion: '+1 %', comentario: '+3 % en el 1S26 por precio [3, 1].' },
      { kpi: 'Margen bruto', valor_anterior: '31,8 % (2024)', valor_actual: '32,4 % (2025)', variacion: '+0,6 pp', comentario: '31,5 % en el 1S26 (32,8 % en el 1S25) por aranceles [3, 1].' },
      { kpi: 'Ingresos por dólar de marketing', valor_anterior: '7,88 USD (2024)', valor_actual: '7,86 USD (2025)', variacion: 'plano', comentario: '7,75 en el 1S26; 8,30 en 2023 y 8,86 en 2022 [3, 1, 5].' },
    ],
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report & Accounts 2025: mercado, posición, clientes, proveedores y riesgos', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-04-14', url: `${ESEF}/2025-12-27/ESEF/GB/0/213800G95T751RN2CT94-2025-12-27/reports/213800G95T751RN2CT94-2025-12-27-T01.xhtml` },
  { id: 2, titulo: 'North American Promotional Products Industry Grows 4.2% in 2025 to Record $27.7 Billion', editor: 'Advertising Specialty Institute (ASI)', tipo: 'Sectorial', fecha: '2026-01-28', url: 'https://asicentral.com/press-releases/north-america-promo-industry-grows-4-percent-in-2025/' },
  { id: 3, titulo: 'ASI Reports Record $26.6 Billion in Annual Sales for Promo Products Industry (2024)', editor: 'Advertising Specialty Institute (ASI)', tipo: 'Sectorial', fecha: '2025-01-29', url: 'https://asicentral.com/press-releases/asi-reports-record-26-6-billion-in-annual-sales-for-promo-products-industry/' },
  { id: 4, titulo: 'PPAI Research: U.S. distributor sales reached new height in 2025 but hampered by volatility (27.100 M USD)', editor: 'Promotional Products Association International (PPAI)', tipo: 'Sectorial', fecha: '2026-05', url: 'https://www.ppai.org/media-hub/ppai-research-u-s-distributor-sales-reached-new-height-in-2025-but-hampered-by-volatility/' },
  { id: 5, titulo: 'Counselor Top 40 Distributors 2026 (ventas de 2025 en EE. UU. y Canadá)', editor: 'ASI Counselor', tipo: 'Sectorial', fecha: '2026-07-22', url: 'https://members.asicentral.com/news/strategy/july-2026/counselor-top-40-distributors-2026/' },
  { id: 6, titulo: 'Half year results for the 26 weeks ended 27 June 2026', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-08-05', url: `${IR}/media/av0ltear/4imprint-2026-interim-announcement-final-clean.pdf` },
  { id: 7, titulo: 'Supreme Court Strikes Down IEEPA Tariffs, But White House Announces New 10% Global Tariff in Response', editor: 'Honigman LLP', tipo: 'Prensa', fecha: '2026-02-21', url: 'https://www.honigman.com/alert-3240' },
  { id: 8, titulo: 'Understanding the new US tariff rules and refund steps', editor: 'Business Sweden', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.business-sweden.com/insights/articles/Understanding-the-new-US-tariff-rules-and-refund-steps/' },
  { id: 9, titulo: 'Datos de mercado de Cimpress, Superior Group, Deluxe y Ennis (ventas, margen EBITDA)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/CMPR/' },
  { id: 10, titulo: 'Annual Report & Accounts 2023: historia y registro de cinco años 2019-2023', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2024-04-16', url: `${ESEF}/2023-12-30/ESEF/GB/0/213800G95T751RN2CT94-2023-12-30/reports/213800G95T751RN2CT94-2023-12-30-T01.xhtml` },
];
const yv = (t) => Y[t];
const B_ = {
  _estado: 'Completa. Tamaño de mercado de ASI (dos años) y PPAI; ranking de distribuidores de ASI Counselor 2026; competidores privados sin margen publicado.',
  sector: {
    definicion: 'Distribución de artículos promocionales con marca o logotipo (ropa, bolígrafos, bolsas, botellas, tecnología, material de ferias) a empresas y organizaciones en EE. UU. y Canadá, que es el 98 % de las ventas de 4imprint; el Reino Unido e Irlanda se suman aparte [1]. Usamos la cifra de ASI (ventas de los distribuidores en Norteamérica, 27.700 M USD en 2025), que es la que cita la propia empresa; la de PPAI (27.100 M, solo distribuidores de EE. UU., método distinto) sirve de contraste y da lo mismo en orden de magnitud [2, 4, 1]. El perímetro para la cuota es Norteamérica más el Reino Unido e Irlanda (≈ 1.300 M GBP, 1.700 M USD) [1].',
    tamano: '≈ 27.700 M USD en Norteamérica en 2025 (ASI) [2]; 27.100 M USD solo EE. UU. (PPAI) [4]; ≈ 1.700 M USD en Reino Unido e Irlanda [1]',
    unidad_serie: 'millones de USD (Norteamérica, ventas de distribuidores según ASI)',
    serie: [
      { anio: '2024', tamano: 26600 }, { anio: '2025', tamano: 27700 }, { anio: '2026e', tamano: 28500 }, { anio: '2027e', tamano: 29500 }, { anio: '2028e', tamano: 30500 },
    ],
    tcac_historico_pct: 3.0,
    tcac_previsto_pct: 3.5,
    cr5_pct: 16.9,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Presupuestos de marketing y contratación de las pymes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las ventas del sector cayeron dos trimestres seguidos a principios de 2025 y subieron un 5,1 % en el 4T25; los pedidos de clientes nuevos de 4imprint cayeron un 12 % en 2025 [2, 1].' },
      { driver: 'Precios y aranceles a productos de Asia', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Casi el 90 % de los distribuidores subió precios en 2025 para compensar costes de importación; el 50 % de las ventas de 4imprint son productos hechos en China (60 % en 2024) [2, 1].' },
      { driver: 'Eventos presenciales, ferias y vuelta a la oficina', efecto: '+', horizonte: 'Estructural', evidencia: 'Las ventas del sector cayeron un 20 % en 2020 y se recuperaron por encima de 2019 en 2022 [10].' },
      { driver: 'Consolidación hacia distribuidores con escala en marketing digital y marca', efecto: '+', horizonte: 'Estructural', evidencia: 'Casi la mitad de las ventas de EE. UU. la hacen distribuidores con menos de 2,5 M USD de ventas; menos de 40 superan los 50 M [1].' },
      { driver: 'Búsqueda con IA y diseño automático', efecto: '−', horizonte: 'Estructural', evidencia: 'La empresa añadió en 2025 como riesgo emergente los resúmenes con IA de los buscadores y la IA agéntica [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Miles de distribuidores pequeños y grandes con catálogos parecidos; los grandes crecieron en 2025 (Custom Ink +15 %, BDA +17 %, Staples +4 %) mientras 4imprint caía un 1,6 % [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes muy dispersos (pedido medio de unos cientos de dólares; ningún cliente relevante), pero sin coste de cambio: comparan precio con facilidad [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Proveedores medianos de EE. UU. (Tier 1) que importan de Asia; 4imprint es su mayor cliente en muchos casos y negocia la repercusión de los aranceles [1, 6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Abrir una tienda en línea es barato, pero ganar confianza y escala en marketing no: el gasto de marketing de 4imprint fue de 171 M USD en 2025 [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Compite con otros usos del presupuesto de marketing (digital, eventos) y con compras directas en grandes plataformas de comercio electrónico [1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El sector salió de una fase floja: ASI midió +1,8 % en 2024 y +4,2 % en 2025, con dos trimestres de caída a principios de 2025 y +5,1 % en el 4T25, pero buena parte del crecimiento fue precio por los aranceles [3, 2]. En 2008-09 el sector cayó en torno a un 15-20 % y en 2020 un 20 %; 4imprint cayó un 35 % en 2020 y volvió a superar 2019 en 2022 [10]. En 2022 el sector creció con la vuelta a la oficina y la inflación. Los pedidos de clientes nuevos de 4imprint mejoraron en el 2T26 (−5 %), indicio de que lo peor de la demanda de pymes pasó [6].' },
    regulacion: 'Lo que más mueve las cifras es la política arancelaria de EE. UU.: el Tribunal Supremo anuló los aranceles IEEPA el 20-feb-2026 y se ordenó devolverlos a los importadores; la Administración aplicó a continuación un recargo global temporal del 10-15 % (sección 122) sobre los aranceles de la sección 301 a China, que siguen [7, 8]. 4imprint no importa: compra a proveedores de EE. UU., que repercuten los costes; las devoluciones no le llegan directamente [6]. También pesan la normativa de privacidad de datos (marketing) y la de seguridad de productos (CPSIA, Proposición 65) [1].',
    tendencias: 'Tres tendencias. (1) Marca frente a marketing directo: 4imprint pasó del catálogo y los envíos de muestras a la publicidad de marca en televisión y vídeo y a los buscadores, con mejor rendimiento por dólar [1]. (2) Sustitución de la búsqueda tradicional por resúmenes con IA y agentes de compra, que puede reducir el tráfico de pago y orgánico hacia las tiendas en línea; la empresa no ve aún entrada de competidores basados en IA [1]. (3) Diversificación de fabricación fuera de China (el 50 % de las ventas frente al 60 % en 2024; 18 % de otros países asiáticos) [1]. La primera favorece al líder; la segunda es la mayor incógnita.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.6,
    posicion: '1.er distribuidor de artículos promocionales de Norteamérica por cuarto año (1.321,5 M USD en 2025 según ASI Counselor, ≈ 4,8 % de 27.700 M); top 5 en el Reino Unido [5, 1]',
    competidores: [
      { nombre: 'HALO Branded Solutions', pais: 'EE. UU.', ticker: null, ingresos: 964.4, cuota_pct: 3.5, margen_ebit_pct: null, comentario: 'Privada (Audax); venta con comerciales y crecimiento comprando distribuidores pequeños [5].' },
      { nombre: 'Staples Promotional Products', pais: 'EE. UU.', ticker: null, ingresos: 961.1, cuota_pct: 3.5, margen_ebit_pct: null, comentario: 'Filial de Staples (privada), venta a grandes cuentas; +4,0 % en 2025 [5].' },
      { nombre: 'Custom Ink', pais: 'EE. UU.', ticker: null, ingresos: 747.5, cuota_pct: 2.7, margen_ebit_pct: null, comentario: 'Privada, comercio electrónico de ropa personalizada con diseño en línea; +15,0 % en 2025: el competidor que más cuota gana en el canal digital [5].' },
      { nombre: 'Proforma', pais: 'EE. UU.', ticker: null, ingresos: 668.0, cuota_pct: 2.4, margen_ebit_pct: null, comentario: 'Red de propietarios franquiciados [5].' },
      { nombre: 'BDA', pais: 'EE. UU.', ticker: null, ingresos: 551.8, cuota_pct: 2.0, margen_ebit_pct: null, comentario: 'Programas de marca para grandes empresas; +17,3 % en 2025 [5].' },
      { nombre: 'Cimpress (Vistaprint y National Pen)', pais: 'Irlanda/EE. UU.', ticker: 'CMPR', ingresos: 350.9, cuota_pct: 1.3, margen_ebit_pct: null, comentario: `Ventas de artículos promocionales en Norteamérica; el grupo factura ${Math.round(yv('CMPR').ventas / 1e6)} M USD con margen EBITDA del ${r1(yv('CMPR').margen_ebitda * 100)} % y deuda neta alta [5, 9].` },
      { nombre: 'Superior Group of Companies (BAMKO)', pais: 'EE. UU.', ticker: 'SGC', ingresos: Math.round(yv('SGC').ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: `Grupo con la división de artículos de marca BAMKO; margen EBITDA del grupo ${r1(yv('SGC').margen_ebitda * 100)} % [9].` },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay: el cliente no gana nada porque otros compren en 4imprint.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Bajos, pero la retención es alta: los pedidos de clientes existentes se mantuvieron planos en 2025 con el mercado flojo (1.639.000) [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca reconocida en un sector sin marcas: ingresos por dólar de marketing de 7,86 USD frente a la norma de antes de 2020, y primera posición de ASI y PPAI [1, 5].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo del 10,8 % frente al 5 % de margen EBITDA de Superior Group; escala en compras con proveedores Tier 1 y en marketing nacional que los distribuidores pequeños no pueden pagar [1, 9].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Centro de distribución y bordado propios en Oshkosh, pero el mercado es lo bastante grande para varios distribuidores con escala (HALO, Staples, Custom Ink) [5].' },
      ],
    },
    amenazas: 'La erosión más probable viene del canal digital: Custom Ink (+15 %) y BDA (+17 %) crecieron en 2025 mientras 4imprint caía un 1,6 % [5], y los pedidos de clientes nuevos de 4imprint llevan dos años y medio cayendo [1, 6]. Si los resúmenes con IA y los agentes de compra reducen el valor de aparecer el primero en Google, la ventaja de escala en marketing pierde peso; probabilidad media a tres-cinco años. La competencia de plataformas generalistas (Amazon y Temu con personalización) es la segunda amenaza [1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: '4imprint vende por internet, catálogo y teléfono artículos promocionales personalizados con el logotipo del cliente: ropa, bolsas, botellas y tazas, bolígrafos, tecnología, material para ferias y regalos de empresa [1]. El cliente tipo es una persona que encarga para una organización de 25 o más empleados (empresas, colegios, organizaciones benéficas, administraciones) en EE. UU. y Canadá (98 % de las ventas), y en el Reino Unido e Irlanda [1]. El modelo es de «envío directo»: la empresa capta el pedido y prepara el diseño, y el proveedor (sobre todo grandes proveedores de EE. UU.) imprime y envía; una parte creciente se borda o imprime en sus instalaciones de Oshkosh (Wisconsin) [1]. La promesa comercial «4imprint Certain» garantiza fecha de entrega, precio y satisfacción [1].',
    como_gana_dinero: 'Gana el margen entre el precio de venta y el coste del producto que factura el proveedor: margen bruto del 32,4 % en 2025 (31,5 % en el 1S26) [1, 6]. De ese margen, 13 puntos se van en marketing (171 M USD en 2025), 4 en atención comercial y 5 en administración, y queda un margen operativo del 10,8 % [1]. Casi nada es contractual, pero es muy repetitivo: el 80 % de los pedidos son de clientes existentes [1]. El margen depende de la eficiencia del marketing (ingresos por dólar gastado), del coste del producto (aranceles) y del precio que el cliente acepta. Hay apalancamiento operativo moderado, porque el marketing se ajusta a la demanda, y algo de estacionalidad (el segundo semestre vende un 3-5 % más) [1, 6].',
    clientes: 'Cartera muy dispersa: más de 2 millones de pedidos al año, un valor medio de unos cientos de dólares y ningún cliente con peso relevante [1]. El 80 % de los pedidos (1.639.000 en 2025) viene de clientes que repiten; la retención se mantuvo con el mercado flojo [1]. El punto débil es la captación: 421.000 pedidos de clientes nuevos en 2025 (−12 %) frente a 529.000 en 2023, y 202.000 en el 1S26 (−7 %) [1, 6]. El poder de precios es demostrable pero limitado: el valor medio del pedido subió un 1 % en 2025 y un 3 % en el 1S26 al repercutir aranceles, sin recuperar todo el margen bruto (31,5 % frente a 32,8 %) [6].',
  },
  huecos: [
    { seccion: 'sector', campo: 'previsión de crecimiento del mercado a cinco años', tipo: 'Complemento', intentos: '1) Notas de prensa de ASI y PPAI (solo dan el año cerrado); 2) informe anual de 4imprint (no da previsión); 3) búsqueda de previsiones de ASI 2026', decision: 'Calculado y marcado como estimación: serie 2026e-2028e al 3-3,5 % anual (estimación propia, la tasa histórica)' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report & Accounts 2025: consejo, informe de gobierno, informe de remuneraciones, accionistas significativos', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-04-14', url: `${ESEF}/2025-12-27/ESEF/GB/0/213800G95T751RN2CT94-2025-12-27/reports/213800G95T751RN2CT94-2025-12-27-T01.xhtml` },
  { id: 2, titulo: 'Director/PDMR Shareholding (4-jun-2026): entrega del LTIP a la directora financiera y venta para impuestos', editor: '4imprint Group plc (RNS)', tipo: 'Primaria', fecha: '2026-06-04', url: 'https://www.ticker.app/lse/FOUR/rns/2026-06-04/DirectorPDMR-Shareholding/9930G' },
  { id: 3, titulo: 'Director/PDMR Shareholding (15-may-2026): opciones del plan de compra de acciones de empleados', editor: '4imprint Group plc (RNS 5153E)', tipo: 'Primaria', fecha: '2026-05-15', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/ee65576e-bf5f-46c9-9503-8f942f398087.html' },
  { id: 4, titulo: 'Holding(s) in Company: FMR LLC baja del 5 % (4,97 %) el 26-jun-2026', editor: '4imprint Group plc (RNS)', tipo: 'Primaria', fecha: '2026-06-30', url: 'https://www.ticker.app/lse/FOUR/rns/2026-06-30/Holding(s)-in-Company/2551K' },
  { id: 5, titulo: 'Lista de comunicados regulatorios de 4imprint (oct-2025 a oct-2026)', editor: 'Investegate', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.investegate.co.uk/company/FOUR' },
  { id: 6, titulo: 'Final results 2025 y Trading Update de enero de 2026 (guía frente a resultado)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-03-11', url: `${IR}/media/v4okh2w0/results-announcement-fy-2025-final.pdf` },
  { id: 7, titulo: 'Half year results 2024 (guía de 2024)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2024-08-07', url: `${IR}/investors/latest-news/2024/half-year-results-for-the-26-weeks-ended-29-june-2024/` },
  { id: 8, titulo: 'Half year results 2026 (guía de 2026)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-08-05', url: `${IR}/media/av0ltear/4imprint-2026-interim-announcement-final-clean.pdf` },
];
const Cn = {
  _estado: 'Completa. Informe anual 2025 (consejo, remuneración, votos de la junta de 2025, accionistas notificados), comunicados de directivos de 2026. Sin el acta de la junta del 20-may-2026 (Investegate y ticker.app dan 403 al texto).',
  directivos: {
    equipo: [
      { nombre: 'Kevin Lyons-Tarr', cargo: 'Consejero delegado', desde: '2015', participacion_pct: 0.97, trayectoria: 'En la empresa desde 1991 (director de sistemas, director de operaciones) y presidente del negocio de marketing directo desde 2004; consejero delegado desde marzo de 2015. Con él las ventas pasaron de ≈ 550 M USD en 2015 a 1.347 M en 2025 y el margen operativo del ≈ 6 % al 10,8 % [1].' },
      { nombre: 'Michelle Brukwicki', cargo: 'Directora financiera', desde: '2025', participacion_pct: 0.05, trayectoria: 'Contable pública certificada, exdirectora financiera de TDS Telecom; más de 25 años en cotizadas. Directora financiera desde el 1-may-2025, sustituyendo a David Seekings [1, 2].' },
      { nombre: 'Paul Forman', cargo: 'Presidente no ejecutivo', desde: '2026', participacion_pct: 0.0, trayectoria: 'Exconsejero delegado de Essentra, Coats Group y Low & Bonar; preside Topps Tiles. Consejero desde el 1-ene-2026 y presidente desde el 16-mar-2026, tras Paul Moody (presidente desde 2016) [1].' },
      { nombre: 'John Gibney', cargo: 'Consejero independiente coordinador', desde: '2021', participacion_pct: 0.01, trayectoria: 'Director financiero de Britvic durante 17 años; preside la comisión de auditoría [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Ventas creciendo a un ritmo similar al del 1S (+5 %) y beneficio antes de impuestos dentro de la horquilla de los analistas (ago-2024) [7]', real: 'Ventas +3 % (1.367,9 M) y beneficio antes de impuestos de 154,4 M [1]', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Beneficio antes de impuestos de no menos de 149 M USD y ventas de 1.350 M (avance del 20-ene-2026, por encima de la horquilla de los analistas) [6]', real: 'Beneficio antes de impuestos de 150,8 M y ventas de 1.346,8 M [6]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas algo por encima de 1.350 M y beneficio antes de impuestos ajustado de ≈ 130 M (ago-2026), por encima de la horquilla de los analistas [8]', real: 'Pendiente (avance de enero de 2027)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y con muchos años en la casa: el consejero delegado lleva 35 años en la empresa y once en el cargo, y tiene 271.523 acciones (≈ 12 M GBP, más de 20 veces su sueldo) [1]. La sucesión del director financiero (2025) y del presidente (2026) se hizo con relevos anunciados y periodos de solape [1]. La dirección es conservadora en sus guías: en 2025 y 2026 anunció resultados por encima de la horquilla de los analistas [6, 8]. El riesgo de sucesión está en el consejero delegado, que lleva el negocio de EE. UU. desde 2004; el informe anual no nombra sucesor.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Paul Forman', cargo: 'Presidente', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos (presidente)' },
      { nombre: 'Kevin Lyons-Tarr', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2012', comisiones: '—' },
      { nombre: 'Michelle Brukwicki', cargo: 'Directora financiera', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'John Gibney', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría (presidente), Nombramientos, Remuneraciones' },
      { nombre: 'Christina Southall', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneraciones (presidenta), Auditoría, Nombramientos' },
      { nombre: 'Lindsay Beardsell', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, Nombramientos, Remuneraciones' },
      { nombre: 'Jaz Rabadia', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, Nombramientos, Remuneraciones' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 95.21, voto_remuneracion_contra_pct: 4.79, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 0.78, fijo: 0.61, variable_corto: 0.17, variable_largo: 0, ratio_salario_medio: 14 },
    remuneracion: 'Remuneración baja para una empresa del FTSE 250: el consejero delegado cobró 775.045 USD en 2025 (sueldo de 571.784, bonus de 169.579 y nada del plan a largo plazo, que entregó su primer tramo en 2026) [1]. Sueldos de 2026: 582.000 USD el consejero delegado y 484.000 la directora financiera (+3 %) [1]. El bonus anual se paga en parte en acciones diferidas (plan DBP) y el plan a largo plazo (LTIP, desde 2023) mide el crecimiento del BPA y la rentabilidad total para el accionista, no el ROIC [1]. Hay cláusulas de recuperación (malus y clawback de hasta cinco años) y exigencia de tener acciones por el 200 % del sueldo [1]. El informe de remuneraciones de 2025 obtuvo un 95,21 % a favor y un 4,79 % en contra en la junta de 2025; la política, un 95,65 % [1].',
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 7.13, tipo: 'Institucional', variacion: '6,82 % en dic-2025 → 7,13 % en feb-2026 [1]' },
      { nombre: 'FMR LLC (Fidelity)', pct: 4.97, tipo: 'Institucional', variacion: '4,90 % en feb-2026, 5,03 % y de nuevo 4,97 % el 26-jun-2026 [1, 4]' },
      { nombre: 'Norges Bank', pct: 2.99, tipo: 'Institucional', variacion: 'notificado el 3-abr-2025 [1]' },
      { nombre: 'Montanaro Asset Management', pct: 2.94, tipo: 'Institucional', variacion: 'notificado el 21-oct-2025 [1]' },
      { nombre: 'Consejo y directivos', pct: 1.0, tipo: 'Directivos', variacion: 'Kevin Lyons-Tarr 271.523 acciones, sin cambios [1]' },
    ],
    insiders: [
      { fecha: '2026-06-03', persona: 'Michelle Brukwicki (directora financiera)', operacion: 'Venta', acciones: 1400, importe: r2(1400 * 37.06 * 1.3427 / 1e6) },
    ],
    control_y_defensas: 'Sin accionista de control ni pactos: el mayor accionista es BlackRock con un 7,13 % y el capital está en manos de institucionales (≈ 87 %) [1]. Una acción, un voto; no hay clases de acciones, límites de voto ni blindajes estatutarios [1]. No hay operaciones vinculadas relevantes [1]. El tamaño (≈ 1.700 M USD de capitalización), la caja neta y el liderazgo del sector la harían atractiva para un comprador de capital riesgo, pero no hay ningún indicio de operación [5].',
    alertas: ['Ninguna relevante detectada tras revisar el informe anual 2025, los comunicados regulatorios de 12 meses y las operaciones de directivos; la única venta de directivos (directora financiera, junio de 2026) fue para pagar impuestos de una entrega de acciones [2, 5].'],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta del 20-may-2026', tipo: 'Complemento', intentos: '1) Comunicado «Result of AGM» en Investegate y ticker.app (403 al texto); 2) web de inversores (documentos de la junta, sin acta); 3) búsqueda en prensa', decision: 'Omitido: se usan los votos de la junta de 2025 del informe anual' },
  ],
  fuentes: fC,
};
guarda('C', Cn);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de FOUR.L, FTSE 250 (^FTMC) e iShares Russell 2000 (IWM) y GBPUSD=X', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/FOUR.L/history' },
  { id: 2, titulo: 'Consenso de BPA, ventas, recomendaciones y objetivos de 4imprint y comparables (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/FOUR.L/analysis' },
  { id: 3, titulo: '4imprint Group plc: estimaciones 2026-2028 (ventas, EBITDA, EBIT, BPA, DPA, caja neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/4IMPRINT-GROUP-PLC-4002215/finances/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Half year results 2026 (acciones, caja, guía)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-08-05', url: `${IR}/media/av0ltear/4imprint-2026-interim-announcement-final-clean.pdf` },
  { id: 7, titulo: '4imprint lifts guidance as price rises help average order value grow', editor: 'AJ Bell', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.ajbell.co.uk/news/articles/4imprint-lifts-guidance-price-rises-help-average-order-value-grow' },
  { id: 8, titulo: '4imprint shares fall after full-year results (−8,9 % a 3.520 peniques)', editor: 'MoneyAM / Alliance News', tipo: 'Prensa', fecha: '2026-03-11', url: 'https://old.moneyam.com/action/news/showArticle?id=7383518' },
  { id: 9, titulo: 'Lista de comunicados regulatorios de 4imprint (oct-2025 a oct-2026)', editor: 'Investegate', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.investegate.co.uk/company/FOUR' },
  { id: 10, titulo: 'Annual Report & Accounts 2025 y 2023 (BPA de 2019-2025)', editor: '4imprint Group plc', tipo: 'Primaria', fecha: '2026-04-14', url: `${ESEF}/2025-12-27/ESEF/GB/0/213800G95T751RN2CT94-2025-12-27/reports/213800G95T751RN2CT94-2025-12-27-T01.xhtml` },
  { id: 11, titulo: 'Página de resultados semestrales con cotización de 4.540 GBX a las 16:36 del 19-oct-2026', editor: '4imprint Group plc (web de inversores)', tipo: 'Primaria', fecha: '2026-10-19', url: `${IR}/investors/latest-news/2026/half-year-results-for-the-26-weeks-ended-27-june-2026/` },
];
const f = Y['FOUR.L'];
const tr = Object.fromEntries(f.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
const usd = (gbp) => gbp * FX; // GBP → USD
const compsDef = [
  ['CMPR', 'Cimpress', 'IE', 1], ['SGC', 'Superior Group of Companies', 'US', 1], ['EBF', 'Ennis', 'US', 1], ['DLX', 'Deluxe', 'US', 1],
  ['GIC', 'Global Industrial', 'US', 1], ['MSM', 'MSC Industrial Direct', 'US', 1], ['RS1.L', 'RS Group', 'GB', FX], ['BNZL.L', 'Bunzl', 'GB', FX],
];
const comps = compsDef.map(([t, nombre, pais, fx]) => {
  const y = Y[t];
  const deudaN = (y.deuda ?? 0) - (y.caja ?? 0);
  const ev = y.ev, cap = y.cap ?? (ev - deudaN);
  const t1 = (y.trend || []).find((x) => x.periodo === '+1y');
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(cap * fx / 1e6), ev_ventas: r2(y.ev_ventas), ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.per_adelantado), crecimiento_pct: t1?.crec_ventas != null ? r1(t1.crec_ventas * 100) : null, margen_ebitda_pct: r1(y.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r1(deudaN / y.ebitda), fcf_yield_pct: y.fcf != null ? r1(y.fcf / cap * 100) : null,
  };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).filter((x) => x != null).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2; })();
const cierresUSD = { 2021: [2820, 1.3498], 2022: [4275, 1.2056], 2023: [4570, 1.2734], 2024: [4855, 1.2549], 2025: [3845, 1.3467] };
const D = {
  _estado: `Completa. Precio = cierre de Londres del 19-oct-2026 (4.540 GBp; GBPUSD ${r4(FX)} → ${r2(45.40 * FX)} USD). Mediana del PER adelantado de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: '4imprint Group plc', nombre_corto: '4imprint', ticker: 'FOUR', isin: 'GB0006640972', mercado: 'Bolsa de Londres (Main Market, FTSE 250)', indice_referencia: 'FTSE 250',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Consumo discrecional', industria: 'Distribución por internet y marketing directo (artículos promocionales)', sede: 'Londres (operaciones en Oshkosh, Wisconsin)', fundacion: null, empleados: 1551, web: 'https://investors.4imprint.com',
    precio: r2(45.40 * FX), fecha_precio: '2026-10-19', acciones: 28.12, capitalizacion_publicada: Math.round(usd(f.cap) / 1e6), free_float_pct: 97.4,
    max_52s: r2(51.35 * 1.3455), min_52s: r2(30.30 * 1.3405), volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.acciones_dia / 1000)} mil acciones/día (3 meses), ≈ ${r1(B.volumen_3m.importe_dia_millones / 100)} M GBP/día`, proximos_resultados: '2027-01-20',
  },
  consenso: {
    guidance: 'Guía del 5-ago-2026 (semestrales), «por encima de la horquilla de los analistas»: ventas de 2026 algo por encima de las de 2025 (1.350 M USD) y beneficio antes de impuestos ajustado de ≈ 130 M (150,8 M en 2025) [6]. Antes, el 20-may-2026, «en línea con lo esperado», ventas planas y pedidos −2 % en cuatro meses [6]. No hay objetivos a medio plazo publicados: la empresa retiró en 2023 su objetivo de 2.000 M USD de ventas al alcanzar el escalón de margen; la estrategia es ganar cuota con crecimiento orgánico «atractivo» [6]. El próximo avance (resultados de 2026) suele publicarse a finales de enero; resultados anuales en marzo de 2027.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(tr['0y'].ventas / 1e6), ebitda: 133.3, ebit: 126.1, bpa: r2(tr['0y'].bpa), dpa: 2.40, fuente: `Yahoo Finance (${tr['0y'].n} analistas) para ventas y BPA [2]; EBITDA, EBIT y DPA de MarketScreener (BPA 3,365, base publicada) [3]` },
      { periodo: '2027e', ingresos: Math.round(tr['+1y'].ventas / 1e6), ebitda: 137.7, ebit: 130.5, bpa: r2(tr['+1y'].bpa), dpa: 2.46, fuente: `Yahoo Finance (${tr['+1y'].n} analistas) [2]; MarketScreener (BPA 3,599) [3]` },
      { periodo: '2028e', ingresos: 1423, ebitda: 144.7, ebit: 137.5, bpa: 3.71, dpa: 2.56, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: f.reco.strongBuy + f.reco.buy + f.reco.hold + f.reco.sell + f.reco.strongSell, comprar: f.reco.strongBuy + f.reco.buy, mantener: f.reco.hold, vender: f.reco.sell + f.reco.strongSell, po_medio: r2(f.po_medio / 100 * FX), po_min: r2(f.po_min / 100 * FX), po_max: r2(f.po_max / 100 * FX) },
    revisiones: `Tras la guía del 5-ago-2026, el BPA de 2026 del consenso subió de ${n2(r2(tr['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(tr['0y'].bpa))} y el de 2027 de ${n2(r2(tr['+1y'].bpa_hace90))} a ${n2(r2(tr['+1y'].bpa))} (+11 % y +9 %) [2]. Antes, en marzo de 2026, las estimaciones se habían recortado tras los resultados de 2025 y el aviso de aranceles (la acción cayó un 8,9 % ese día) [8]. Los objetivos de precio medios (${Math.round(f.po_medio)} GBp, entre ${Math.round(f.po_min)} y ${Math.round(f.po_max)}) están un 20 % por encima del precio [2]. Solo hay cinco o seis analistas (casas de bolsa de la empresa incluidas: Peel Hunt y Berenberg) y MarketScreener da un BPA de 2026 en base publicada (3,365, con las partidas fiscales) y Yahoo en base ajustada (${n2(r2(tr['0y'].bpa))}) [3, 2].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: null,
    comentario: 'La acción en peniques subió un 48,6 % en 12 meses frente al +11,9 % del FTSE 250, pero en tres años apenas se movió (+0,7 % anual frente al +12,3 %) y en cinco y diez años batió al índice (+8,6 % y +10,4 % anual) [1]. La caída de 2024-2025 (−53,6 % desde el máximo de abril de 2024 al mínimo de abril de 2025) refleja el paso de crecer al 15 % a ventas planas y la caída de los pedidos de clientes nuevos; el rebote de 2026 viene de la guía de agosto, que sacó al BPA de su tendencia bajista [1, 6]. Beta de 1,0 mensual a cinco años frente al FTSE 250 (1,15 semanal; 1,52 semanal a dos años); Yahoo da 0,71 [1, 2]. Rentabilidad de precio sin dividendos; la rentabilidad por dividendo ordinario es de ≈ 4 % [2].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 3.1, var_3m_pct: 14.4, var_6m_pct: 17.9, var_12m_pct: 48.6, dist_max_52s_pct: -9.2, dist_min_52s_pct: 45.5, dist_max_historico_pct: -30.6, tendencia: 'alcista', volatilidad_60d_pct: 33.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'oct-2025 a feb-2026', var_pct: 29.7, causa: 'Rebote desde el mínimo de 52 semanas (3.030 GBp el 20-oct-2025) con el avance del 20-ene-2026: resultados de 2025 por encima de la horquilla de los analistas [9, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-2026', var_pct: -8.9, causa: 'Resultados de 2025 (11-mar): beneficio −2 % y aviso de que los aranceles se repercuten en 2026; −8,9 % el día y −6,9 % el 11-mar en cierre [8, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago 2026', var_pct: 38.7, causa: 'Semestrales del 5-ago: guía de 2026 por encima de los analistas (beneficio antes de impuestos ajustado ≈ 130 M) y mejora de los pedidos de clientes nuevos en el 2T; +10 % el día, mejor valor del FTSE 250, y subida previa en julio [7, 6, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-sep 2026', var_pct: -11.9, causa: 'Recogida de beneficios tras la subida de agosto, con el ex-dividendo de 59,4 peniques a mediados de agosto; sin comunicado de la empresa entre el 5-ago y el 19-oct [9, 1].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-08-05', tipo: 'resultados', hecho: 'Semestrales: ventas +1 %, beneficio antes de impuestos ajustado −12 % y guía de 2026 por encima del consenso (≈ 130 M); 5,2 M de partidas fiscales no recurrentes [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-05', tipo: 'recomendación', hecho: `El BPA de 2026 del consenso sube un 11 % en 90 días; objetivo medio ${Math.round(f.po_medio)} GBp, cuatro de cinco analistas recomiendan comprar [2].`, veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-30', tipo: 'accionista de referencia', hecho: 'FMR (Fidelity) baja del 5,03 % al 4,97 %; BlackRock subió al 7,13 % en febrero. Movimientos pequeños, sin colocación [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-04', tipo: 'directivos', hecho: 'La directora financiera recibe 9.371 acciones del LTIP y vende 4.399 para impuestos (≈ 37 GBP); el consejero delegado no vende [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-16', tipo: 'directivos', hecho: 'Paul Forman sustituye a Paul Moody como presidente (relevo anunciado el 3-dic-2025) [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-20', tipo: 'demanda o regulador', hecho: 'El Tribunal Supremo de EE. UU. anula los aranceles IEEPA; siguen los de la sección 301 a China y un recargo global temporal; 4imprint no importa directamente [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-01-20', tipo: 'resultados', hecho: 'Avance de resultados de 2026 hacia el 20-ene-2027 (el de 2025 fue el 20-ene-2026) y resultados anuales en marzo [9].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-01-20',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sube un 48,6 % en 12 meses y está un 9,2 % por debajo del máximo de 52 semanas (5.135 GBp el 7-ago), sin avisos P de la herramienta. La subida tiene causa en hechos de la empresa (avance de enero, guía de agosto) y la caída de agosto-septiembre es recogida de beneficios sin noticia [9, 6]. No hay hechos pendientes que puedan mover el precio más de un 5 % en contra (ninguna colocación, ampliación, litigio ni oferta); la incertidumbre arancelaria es continua y ya está en la tesis. Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: Object.entries(cierresUSD).map(([a, [p, fx]]) => ({ anio: a, precio_cierre: r2(p / 100 * fx), ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2021' })),
    comentario: 'Cierres de cada año en peniques de Yahoo pasados a USD con el GBPUSD del mismo día [1], para compararlos con el BPA en USD. El PER de los últimos 12 meses de 2021 (≈ 47 veces el BPA de 2021, todavía deprimido por la pandemia) se excluye. Con el BPA del año siguiente (la base de la regla a 12 meses) el múltiplo ha estado entre 13 y 15 veces desde 2021, frente a 15-20 antes de la pandemia, cuando la empresa crecía a doble dígito: el mercado ya paga a 4imprint como una empresa de crecimiento bajo [1, 10].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'No hay otro distribuidor de artículos promocionales cotizado y puro: HALO, Staples Promotional Products, Custom Ink, Proforma y BDA son privados [5 de B]. Usamos los cotizados más cercanos por producto o por modelo: Cimpress (Vistaprint y National Pen) y Superior Group (BAMKO), que venden artículos de marca; Ennis y Deluxe, impresión y productos de marca para empresas; y distribuidores B2B por internet y catálogo con modelo parecido de captación y envío (Global Industrial, MSC Industrial, RS Group, Bunzl) [2]. Ninguno tiene caja neta y circulante negativo como 4imprint.',
    empresas: comps,
    comentario: `4imprint cotiza a ≈ 16-17 veces el BPA adelantado, por encima de la mediana de los comparables (${n2(perMed)}x) y con menos crecimiento esperado de ventas (+1,8 % en 2027 frente a +4-5 % de los distribuidores B2B) [2]. La prima se justifica por el balance (caja neta de 134 M USD frente a deuda en casi todos los comparables), la conversión en caja y un ROIC muy superior; no por el crecimiento. Deluxe (5,6x) es un caso aparte por su deuda y su negocio de cheques en declive y distorsiona la media, no la mediana. Usaríamos el PER, porque los EV/EBITDA de Yahoo mezclan bases [2].`,
    confianza: 'Media',
  },
  transacciones: null,
  huecos: [
    { seccion: 'transacciones', campo: 'transacciones precedentes con múltiplo', tipo: 'Complemento', intentos: '1) Notas de ASI y PrintandPromo de las compras de HALO (Star Promotions 2024, Think It Then Ink It 2024, What\'s Happening Promotions 2025): sin precio; 2) compra de HALO por Audax (2016): sin términos; 3) búsqueda de múltiplos EV/EBITDA de distribuidores de promocionales: ninguna publicada', decision: 'Omitido: el sector se consolida con compras pequeñas de distribuidores privados sin precio publicado' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la FCA (ninguna por encima del 0,5 % publicada para FOUR); 2) Yahoo (sin dato); 3) Stock Analysis (sin dato)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: '£503 buys 14 shares in this FTSE 250 stock that returned 23.9% annually for the last 15 years', editor: 'The Motley Fool UK', tipo: 'Foros y redes', fecha: '2026-05-18', url: 'https://www.twelfthmagpie.com/tickers/lse-four/' },
  { id: 2, titulo: '4imprint lifts guidance as price rises help average order value grow (con comentarios de lectores)', editor: 'AJ Bell', tipo: 'Foros y redes', fecha: '2026-08-05', url: 'https://www.ajbell.co.uk/news/articles/4imprint-lifts-guidance-price-rises-help-average-order-value-grow' },
  { id: 3, titulo: '4imprint raises FY guidance despite tariff-related headwinds', editor: 'Hargreaves Lansdown', tipo: 'Foros y redes', fecha: '2026-08-05', url: 'https://www.hl.co.uk/shares/stock-market-news/company--news/4imprint-raises-fy-guidance-despite-tariff-related-headwinds' },
  { id: 4, titulo: '4imprint Group plc (LSE:FOUR): what does the current half-year customer-demand update mean?', editor: 'Kalkine Media', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://kalkinemedia.com/uk/' },
  { id: 5, titulo: '4IMPRINT GROUP PLC (FOUR.L) Stock Analysis: Strong Dividend Yield & Potential Upside for Investors', editor: 'DirectorsTalk Interviews', tipo: 'Foros y redes', fecha: '2026-08-18', url: 'https://www.directorstalkinterviews.com/4imprint-group-plc-ord-38-613p-four-l-investor-outlook-highlights-robust-roe-and-dividend-yield/4121260009' },
];
const E = {
  _estado: 'Parcial: poco debate de particulares. Stocktwits no tiene el símbolo, LSE Chat y Reddit no abren; se leen artículos de opinión para inversores particulares (Motley Fool UK, AJ Bell, Hargreaves Lansdown, Kalkine, DirectorsTalk).',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'The Motley Fool UK', fecha: '2026-05', n_comentarios: 3, tono: 'Positivo', resumen: 'Presenta a 4imprint como compañía de calidad del FTSE 250 con rentabilidades a largo plazo muy altas y la ve barata tras la caída de 2025 [1].' },
      { plataforma: 'AJ Bell (noticias para inversores)', fecha: '2026-08', n_comentarios: 1, tono: 'Positivo', resumen: 'Destaca la subida de la guía y el mayor valor del pedido por precio; el margen bruto presionado por aranceles aparece como el matiz [2].' },
      { plataforma: 'Hargreaves Lansdown (noticias para clientes)', fecha: '2026-08', n_comentarios: 1, tono: 'Positivo', resumen: 'Subida de la guía «pese a los aranceles»; sin entrar en la caída de clientes nuevos [3].' },
      { plataforma: 'Kalkine Media y DirectorsTalk', fecha: '2026-10', n_comentarios: 2, tono: 'Neutro', resumen: 'Repasan la demanda de clientes del semestre, el dividendo (≈ 4 %) y el potencial frente al objetivo medio de los analistas [4, 5].' },
    ],
    temas: [
      { tema: 'Dividendo y caja neta', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: 240 centavos ordinarios y caja de 136,9 M USD sin deuda; el dividendo cubre ≈ 1,4 veces el BPA de 2026 [A3].' },
      { tema: 'Recuperación de la demanda de pymes', postura: 'Alcista', peso: 'Medio', contraste: 'Los pedidos de clientes nuevos mejoraron (−9 % → −5 %) pero siguen cayendo; el informe no supone recuperación plena hasta 2028 [A3].' },
      { tema: 'Aranceles', postura: 'Dividida', peso: 'Medio', contraste: 'El margen bruto bajó 1,3 puntos en el 1S26; la repercusión de precios ha funcionado en parte [A3].' },
      { tema: 'Riesgo de la IA en la captación de clientes', postura: 'Bajista', peso: 'Bajo', contraste: 'Casi no aparece en el debate de particulares, aunque la empresa lo declara como riesgo emergente: el informe lo trata como riesgo principal [A1].' },
    ],
    lectura: 'El sentimiento de los particulares es positivo y algo autocomplaciente: se centra en el dividendo, la caja y el historial a largo plazo, y casi nadie discute la caída de la captación de clientes ni el efecto de la IA en los buscadores, que es la objeción de fondo del informe. No hay euforia ni capitulación; el sentimiento va con el de los analistas (cuatro de cinco comprar). No aporta un riesgo nuevo; sí confirma que el riesgo de IA está poco descontado en la conversación.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, 'FX', FX);
