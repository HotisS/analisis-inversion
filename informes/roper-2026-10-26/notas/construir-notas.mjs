// Escribe las notas A-E de Roper Technologies (corte 2026-10-26, iteración tras el 3T26) a partir de los documentos de notas/docs
// (10-K 2025, 10-Q 2T26, nota de resultados del 3T26 del 22-oct, conferencia del 22-oct, proxy 2026, 8-K, Form 4 y 144, XBRL) y de los informes del repo
// (Constellation Software 10-oct, Veeva 14-oct, Intuit 10-oct: sector, transacciones y comparables).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs [A|B|C|D|E] (sin letra, todas; guarda cada nota al terminarla)
const SOLO = process.argv[2] || null;
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => (SOLO && SOLO !== letra) ? null : fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const SEC = 'https://www.sec.gov/Archives/edgar/data/882835';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Roper Technologies, Form 10-K 2025 (cuentas, segmentos, deuda, ingresos por tipo)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: `${SEC}/000088283526000009/rop-20251231.htm` },
  { id: 2, titulo: 'Roper Technologies announces 2025 financial results (nota de resultados del 4T25 y guía 2026)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-27', url: `${SEC}/000088283526000003/a2025q4earningsrelease.htm` },
  { id: 3, titulo: 'Roper Technologies announces second quarter financial results (2T26)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-23', url: `${SEC}/000088283526000031/a2026q2earningsrelease.htm` },
  { id: 4, titulo: 'Roper Technologies, Form 10-Q 2T26', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${SEC}/000088283526000036/rop-20260630.htm` },
  { id: 5, titulo: 'Roper Technologies announces 2023 financial results (4T23)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2024-01-31', url: `${SEC}/000088283524000002/a2023q4earningsrelease.htm` },
  { id: 6, titulo: 'Roper Technologies announces 2022 financial results (4T22; flujos de operaciones continuadas 2021-2022)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2023-01-27', url: `${SEC}/000088283523000010/a2022q4earningsrelease.htm` },
  { id: 7, titulo: 'Roper Technologies: hechos XBRL (companyfacts), series anuales y trimestrales', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000882835.json' },
  { id: 8, titulo: 'Roper Technologies announces 2024 financial results (4T24 y guía 2025)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2025-01-30', url: `${SEC}/000088283525000003/a2024q4earningsrelease.htm` },
  { id: 9, titulo: 'Roper Technologies announces third quarter financial results (3T26: cuenta, balance a 30-sep-2026, flujos de nueve meses, segmentos y guía 2026 elevada)', editor: 'Roper Technologies / SEC EDGAR (8-K, Exhibit 99.1)', tipo: 'Primaria', fecha: '2026-10-22', url: `${SEC}/000088283526000042/a2026q3earningsrelease.htm` },
  { id: 10, titulo: 'Roper Technologies Q3 2026 earnings call transcript (22-oct-2026)', editor: 'MarketBeat', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.marketbeat.com/earnings/reports/2026-10-22-roper-technologies-inc-stock/' },
  { id: 11, titulo: 'ROP earnings: BPA del 3T26 frente al consenso (5,89 frente a 5,79 USD) y ventas frente a la estimación', editor: 'Earnings Whispers', tipo: 'Datos de mercado', fecha: '2026-10-22', url: 'https://www.earningswhispers.com/epsdetails/ROP' },
  { id: 12, titulo: 'Xylem to Acquire Cornell Pump and Roper Pump (comprador de los negocios de bombas de Indicor, 1.460 M USD)', editor: 'Xylem (comunicado vía Placera)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://www.placera.se/pressmeddelanden/xylem-xylem-to-acquire-cornell-pump-and-roper-pump-strengthening-industrial-presence-in-high-growth-sectors-20260811' },
];

// Cuenta de operaciones continuadas (reexpresada tras las ventas de 2022): beneficio y BPA de operaciones continuadas.
const C = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const cont = { 2021: [805.3, 7.56], 2022: [985.6, 9.23], 2023: [1368.4, 12.74], 2024: [1549.3, 14.35], 2025: [1536.3, 14.2] };
const cuenta = ['2021', '2022', '2023', '2024', '2025'].map((p) => {
  const r = C[p];
  return { periodo: p, ingresos: r.ingresos, coste_ventas: r.coste_ventas, gastos_generales: r.gastos_generales, ebitda: r.ebitda, amortizaciones: r.amortizaciones, ebit: r.ebit,
    resultado_financiero: r.resultado_financiero, bai: r.bai, impuestos: r.impuestos, minoritarios: 0, beneficio_neto: cont[p][0], gastos_financieros: r.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: cont[p][1], dpa: r.dpa, dpa_extraordinario: 0, acciones_diluidas: r.acciones_diluidas };
});
const prov = { 2021: 98.3, 2022: 122.6, 2023: 143.0, 2024: 148.1, 2025: 150.3 };
const balance = X.balance.historico.filter((r) => r.periodo >= '2021').map((r) => ({
  periodo: r.periodo, activo_total: r.activo_total, activo_corriente: r.activo_corriente, pasivo_corriente: r.pasivo_corriente, pasivo_total: r.pasivo_total,
  fondo_comercio: r.fondo_comercio, intangibles: r.intangibles, inmovilizado_material: r.inmovilizado_material, existencias: r.existencias, clientes: r.clientes,
  proveedores: prov[r.periodo], activos_contrato: null, pasivos_contrato: r.pasivos_contrato, caja: r.caja, deuda_financiera: r.deuda_financiera,
  arrendamientos: 0, patrimonio_neto: r.patrimonio_neto, minoritarios: 0, reservas: r.reservas }));
const capex = { 2021: 28.5 + 29.7, 2022: 40.1 + 30.2, 2023: 68.0 + 40.0, 2024: 66.0 + 45.0, 2025: 47.4 + 57.3 };
const F = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
const ocf = { 2021: 1655.8, 2022: 606.6 + 953.8, 2023: 2035.1, 2024: 2393.2, 2025: 2540.3 };
const desinv = { 2021: 142.7, 2022: 5561.8, 2023: 0, 2024: 245.6, 2025: 0 };
const flujos = ['2021', '2022', '2023', '2024', '2025'].map((p) => ({ periodo: p, flujo_operativo: ocf[p], capex: +capex[p].toFixed(1), pagos_arrendamientos: 0,
  adquisiciones: F[p].adquisiciones, desinversiones: desinv[p], dividendos: F[p].dividendos, recompras: F[p].recompras ?? 0, emision_acciones: F[p].emision_acciones, intereses_en_financiacion: 0 }));

const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 8434.6, ebitda: 3292.8, ebit: 2365.8, beneficio_neto: 1604.3, bpa: 15.88, dpa: 3.56, dpa_extraordinario: 0, fcf: 2514, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Venta de TransCore, Zetec, CIVCO Radiotherapy y de la mayoría del negocio industrial (Indicor) a CD&R: 5.562 M de cobros; la cuenta 2021-2022 es la de operaciones continuadas reexpresada y el balance de 2021 aún incluye esos negocios.' },
    ],
    comentario: 'Los ingresos de operaciones continuadas pasan de 4.834 M USD en 2021 a 7.903 M en 2025 (TCAC del 13,1 %): unos 5-6 puntos anuales son orgánicos (5,4 % en 2025, 8 % en 2023) y el resto, compras (6,7 puntos en 2025: CentralReach, Subsplash, Transact, Procare) [1, 5]. El margen EBITDA contable sube de 38,4 % a 39,7 % y el EBIT ronda el 28 %, lastrado por la amortización de intangibles comprados (858 M en 2025, 10,9 % de las ventas) [1]. El beneficio de operaciones continuadas incluye revalorizaciones de las participaciones en Indicor y Certinia (1,25 USD por acción en 2023, 1,68 en 2024 y 0,22 en 2025) que no son operativas [2, 5]. En los nueve primeros meses de 2026 la cuenta lleva 1.059 M antes de impuestos de ganancias de Indicor (9,86 USD por acción), por lo que el LTM se da sin ellas [9]. El 3T26 creció un 7,6 % (7 % orgánico, el mejor trimestre desde 2023) con un margen EBITDA contable del 39,5 %, 0,4 puntos menos que un año antes por la mezcla de Neptune en productos [9, 10].',
    ajustes: 'Usamos el BPA GAAP de operaciones continuadas. La empresa publica además un BPA ajustado que suma la amortización de intangibles de compras (5,95 USD en 2025) y quita los efectos de las participaciones minoritarias: 20,00 USD en 2025 frente a 14,20 GAAP [2]. Para la historia del PER usamos un BPA GAAP «limpio» (sin participaciones ni partidas puntuales, con la amortización): 9,83 USD en 2022, 11,59 en 2023, 12,88 en 2024 y 14,04 en 2025 [2, 5, 6]. El LTM a septiembre de 2026 excluye las ganancias de Indicor (1.059 M antes de impuestos y 996 M después en nueve meses) y se calcula como el BPA limpio de los 12 meses a junio (15,30 USD) menos el del 3T25 (5,14 − 1,53 − 0,03 = 3,58) más el del 3T26 (5,89 − 1,68 − 0,05 = 4,16): 15,88 USD (BPA ajustado − amortización de compras − costes de compras, de las conciliaciones de la empresa) [3, 9].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 1877.1, crecimiento_pct: 16.3, crecimiento_organico_pct: null, ebitda: 735.8, margen_ebitda_pct: 39.2, bpa: 4.28, vs_consenso: null },
      { periodo: '1T25', ingresos: 1882.8, crecimiento_pct: 12.0, crecimiento_organico_pct: null, ebitda: 738.9, margen_ebitda_pct: 39.2, bpa: 3.06, vs_consenso: null },
      { periodo: '2T25', ingresos: 1943.6, crecimiento_pct: 13.2, crecimiento_organico_pct: null, ebitda: 772.0, margen_ebitda_pct: 39.7, bpa: 3.49, vs_consenso: null },
      { periodo: '3T25', ingresos: 2017.5, crecimiento_pct: 14.3, crecimiento_organico_pct: null, ebitda: 804.1, margen_ebitda_pct: 39.9, bpa: 3.68, vs_consenso: null },
      { periodo: '4T25', ingresos: 2058.6, crecimiento_pct: 9.7, crecimiento_organico_pct: 4.0, ebitda: 818.6, margen_ebitda_pct: 39.8, bpa: 3.97, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 2095.3, crecimiento_pct: 11.3, crecimiento_organico_pct: null, ebitda: 800.0, margen_ebitda_pct: 38.2, bpa: 4.87, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 2108.9, crecimiento_pct: 8.5, crecimiento_organico_pct: 4.9, ebitda: 815.3, margen_ebitda_pct: 38.7, bpa: 11.62, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 2171.8, crecimiento_pct: 7.6, crecimiento_organico_pct: 7.0, ebitda: 858.9, margen_ebitda_pct: 39.5, bpa: 4.88, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En julio la dirección subió la guía a un orgánico de ~6 % y a 22,15-22,30 USD de BPA ajustado, y el mensaje fue la recompra (9,0 M de acciones en tres trimestres) [3, 4]. En la conferencia del 22-oct el discurso cambió: el 3T26 creció un 7 % orgánico (software recurrente +8 %), el BPA ajustado de 5,89 USD batió su propia guía (5,75-5,80) y el consenso (5,79), y la guía anual sube a 22,35-22,40 USD [9, 10, 11]. La recompra se paró en el trimestre «para conservar opciones de compra»: 436 M en tres compras complementarias (Origo para iPipeline, Playground para Procare y C Myers para Strata), y capacidad de más de 6.000 M en 12 meses [9, 10]. La dirección insistió en la IA: 17 o 18 de sus 21 negocios de software tienen agentes a la venta, con margen bruto «de software»; CentralReach es el ejemplo de monetización visible [10]. Las preguntas de los analistas se repitieron en tres temas: la IA (adopción, precios y modelos), Deltek (buenas contrataciones en la nube, pero «un trimestre más» para hablar de giro en la contratación pública) y Neptune (mezcla hacia contadores mecánicos más baratos, segundo semestre algo peor de lo previsto) [10]. La dirección no cuantificó el efecto del retraso de cobros de Illumia en la caja libre (−4 % en el trimestre), no dio cifra de ingresos de IA del grupo ni guía para 2027, más allá de llamarlo «en general constructivo» [10].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 705.8 }, { anio: '2027', importe: 1550.1 }, { anio: '2028', importe: 1300 }, { anio: '2029', importe: 1200 }, { anio: '2030', importe: 1100 }, { anio: '2031+', importe: 3500 }],
    liquidez: 'Caja 311,0 M USD a 30-sep-2026 y línea de crédito revolvente de 3.500 M, con 1.300 M dispuestos (2.850 M en junio): el cobro de 1.239 M de Indicor por la venta de su instrumentación y la caja del trimestre devolvieron 1.550 M [9, 10]. Queda un cobro de ~600 M antes de impuestos en el 4T26 por la venta de las bombas de Indicor a Xylem, pendiente de aprobación [10, 12].',
    rating: null,
    coste_deuda_pct: 3.8,
    vida_media_anios: null,
    otros_pasivos: 'Deuda bruta de 9.720 M USD a 30-sep-2026 (1.415 M a corto), frente a 11.319 M en junio [4, 9]; a 31-dic-2025 eran 8.500 M de bonos y 850 M de línea [1]. Los impuestos a pagar subieron de 28 M en diciembre a 212 M en septiembre, sobre todo por el cobro de Indicor (estimación propia: ~200 M de impuesto pendiente) [9]. El único covenant es deuda total/capital total ≤ 0,65 (32 % a cierre de 2025) [1]. Arrendamientos operativos de 267 M de pagos futuros, que en US GAAP no sumamos a la deuda [1]. Obligaciones de compra de 1.391 M [1]. Impuestos diferidos pasivos de 1.785 M, ligados a los intangibles comprados [9]. Lo que queda de la participación en Indicor está a valor razonable (577 M a 30-sep-2026, 1.792 M en junio) y no consolida; Indicor vende ese resto (bombas Cornell y Roper) a Xylem [9, 12].',
    comentario: 'El circulante es negativo de forma estructural: los ingresos diferidos (1.889 M a 30-sep-2026) superan a clientes más existencias (1.135 M) [9]. La deuda neta subió de 6.116 M en 2023 a 9.004 M en 2025 por las compras (CentralReach 1.850 M, Subsplash 800 M), a ~10.950 M en junio de 2026 por las recompras y bajó a 9.409 M en septiembre con el cobro de Indicor [1, 4, 9]. Con el EBITDA LTM contable de 3.293 M, la deuda neta queda en 2,9 veces (la empresa da 2,9 con su EBITDA ajustado), medio punto menos que en junio [9, 10]; el cobro de Xylem la bajaría otras ~0,15 veces.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta: el flujo operativo de 2025 (2.540 M) equivale al 165 % del beneficio, porque la amortización de intangibles (858 M) no es salida de caja y el negocio cobra por adelantado [1]. El capex más el software activado es solo 1,0-1,6 % de las ventas y la empresa espera 1,0-1,5 % [1]. La caja libre ajustada fue 2.466 M en 2025 (+8 %) [2]. El flujo de 2022 se da sin los 954 M de impuestos pagados por las plusvalías de las ventas de TransCore e industrial (el publicado de operaciones continuadas fue 607 M) [6]. El dinero se ha ido a compras (13.454 M en 2021-2025) más que a dividendos (1.466 M); en 2026 el destino principal pasó a ser la recompra (2.727 M en el 1S26, nada en el 3T26) [4, 9]. En nueve meses de 2026 el flujo operativo fue de 1.882 M (+4 %) y la inversión, 82 M; la caja libre del 3T26 bajó un 4 % por el calendario de cupones y un retraso de cobros en Illumia [9, 10].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades; control interno eficaz a 31-dic-2025)',
    comentario: 'PwC audita a Roper desde 2002 [1]. No hay cambios de criterio relevantes. La remuneración en acciones fue de 166 M en 2025 (2,1 % de las ventas) y se trata como gasto en el EBITDA [7]. La cuenta tiene dos fuentes de ruido: la revalorización a valor razonable de la participación en Indicor (nivel 3, con supuestos de la dirección; +996 M en el 1S26) y los intangibles de compras, que suman 31.105 M (fondo de comercio 21.341 M e intangibles 9.764 M), el 90 % del activo [1, 4]. No ha habido deterioros relevantes del fondo de comercio en cinco años (solo 94 M de intangibles en 2021) [6]. El software activado es pequeño (57 M en 2025) [1].',
    senales: [
      { senal: 'Ganancias de valor razonable de Indicor en el beneficio', nivel: 'Media', comentario: '1.059 M antes de impuestos en nueve meses de 2026 (9,86 USD por acción), ya casi realizadas en caja (1.239 M cobrados en el 3T26 y ~600 M pendientes de Xylem); se excluyen del BPA que usamos [9, 12].' },
      { senal: 'Fondo de comercio e intangibles = 90 % del activo', nivel: 'Media', comentario: 'Un cambio de la IA que reduzca el valor de los negocios comprados obligaría a deterioros; no ha pasado todavía [1].' },
      { senal: 'Tipo impositivo bajo en 2026', nivel: 'Baja', comentario: '14,0 % en nueve meses (15,3 % en el 3T26) por beneficios fiscales ligados a Indicor y a una reestructuración societaria; la guía del 4T26 es del 20-21 % [4, 9, 10].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Roper reparte un dividendo creciente (3,39 USD en 2025; 0,91 USD trimestrales en 2026, payout de ~16 % del BPA ajustado) y dedica el resto de la caja a compras de software vertical [1, 3]. En octubre de 2025 aprobó por primera vez un programa de recompra de 3.000 M y en abril de 2026 lo amplió en otros 3.000 M; a 30-jun-2026 quedaban 2.776 M [4]. En el 3T26 no recompró: dedicó 436 M a tres compras complementarias y prefiere conservar capacidad (más de 6.000 M en 12 meses) para compras; la autorización sigue disponible [9, 10].',
    adquisiciones: [
      { anio: '2022', objetivo: 'Frontline Education (software para centros escolares)', importe: 3700, ev_ebitda: null, financiacion: 'Caja de las ventas de 2022', resultado: 'Integrada en Application Software; sin deterioros [1].' },
      { anio: '2023', objetivo: 'Syntellis Performance Solutions (software de planificación para hospitales)', importe: 1250, ev_ebitda: null, financiacion: 'Caja y línea de crédito', resultado: 'Combinada con Strata; sin deterioros [5].' },
      { anio: '2024', objetivo: 'Procare Solutions (software para guarderías)', importe: 1860, ev_ebitda: null, financiacion: 'Línea de crédito y bonos', resultado: 'Citada entre los negocios más flojos en 2026 [1].' },
      { anio: '2024', objetivo: 'Transact Campus (pagos y credenciales universitarios)', importe: 1600, ev_ebitda: null, financiacion: 'Bonos', resultado: 'Integrada con CBORD; aporta pagos con menor margen bruto [1].' },
      { anio: '2025', objetivo: 'CentralReach (software para terapia del autismo y discapacidad)', importe: 1850, ev_ebitda: null, financiacion: 'Línea de crédito y bonos', resultado: 'Fondo de comercio 1.049 M e intangibles 890 M; motor del crecimiento por compras de 2025-2026 [1].' },
      { anio: '2025', objetivo: 'Subsplash (software y pagos para iglesias)', importe: 800, ev_ebitda: null, financiacion: 'Línea de crédito', resultado: 'Baja el margen bruto de Network Software por la mezcla de pagos; orgánica desde el 4T26 [1, 10].' },
      { anio: '2026', objetivo: 'Origo (iPipeline), Playground (Procare) y C Myers (Strata): tres compras complementarias', importe: 436, ev_ebitda: null, financiacion: 'Caja y cobro de Indicor', resultado: 'Recién cerradas; restan unos céntimos al BPA del 4T26 [9, 10].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Application Software', descripcion: 'Software de gestión vertical (Deltek, Aderant, Vertafore, Strata, Clinisys, Procare, CentralReach…).', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 3186.9, resultado: 820.8 }, { periodo: '2024', ingresos: 3868.3, resultado: 1023.4 }, { periodo: '2025', ingresos: 4483.0, resultado: 1203.1 }] },
      { nombre: 'Network Software', descripcion: 'Redes de software con efectos de red (DAT en fletes, ConstructConnect, SHP/MHA en salud alternativa, Subsplash).', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1439.4, resultado: 632.4 }, { periodo: '2024', ingresos: 1475.6, resultado: 666.5 }, { periodo: '2025', ingresos: 1600.8, resultado: 695.8 }] },
      { nombre: 'Technology Enabled Products', descripcion: 'Productos con tecnología: Verathon (vías aéreas), Neptune (contadores de agua), Northern Digital (medición médica), control de accesos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1551.5, resultado: 518.7 }, { periodo: '2024', ingresos: 1695.3, resultado: 574.3 }, { periodo: '2025', ingresos: 1818.7, resultado: 626.7 }] },
      { nombre: 'Corporativo', descripcion: 'Gastos centrales no asignados y remuneración en acciones del grupo.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 0, resultado: -226.7 }, { periodo: '2024', ingresos: 0, resultado: -267.4 }, { periodo: '2025', ingresos: 0, resultado: -290.2 }] },
    ],
    geografias: null,
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '6 % (2024)', valor_actual: '5,4 % (2025); 7 % (3T26)', variacion: '+1,6 p (3T26 frente a 2025)', comentario: 'Guía 2026 de ~6 %; software recurrente orgánico +8 % en el 3T26 [1, 9, 10].' },
      { kpi: 'Ingresos recurrentes de software', valor_anterior: '3.976 M (2024)', valor_actual: '4.483 M (2025)', variacion: '+12,7 %', comentario: '57 % de las ventas; con los «reoccurring» (transacciones) llega al 67 % [1].' },
      { kpi: 'Cartera a 12 meses (backlog)', valor_anterior: '3.105 M (2024)', valor_actual: '3.425 M (2025)', variacion: '+10,3 %', comentario: '3.286 M a junio de 2026, +11 % interanual [1, 4].' },
      { kpi: 'Caja libre ajustada', valor_anterior: '2.282 M (2024)', valor_actual: '2.466 M (2025)', variacion: '+8 %', comentario: '31 % de las ventas [2].' },
      { kpi: 'Acciones en circulación', valor_anterior: '106,6 M (dic-25)', valor_actual: '99,0 M (sep-26)', variacion: '−7,1 %', comentario: 'Recompras del 1S26; ninguna en el 3T26 [9].' },
      { kpi: 'Retención bruta del software empresarial', valor_anterior: 'mediados del 90 % (2025)', valor_actual: 'mediados del 90 % (3T26)', variacion: 'estable', comentario: 'La dirección no da la retención neta [10].' },
    ],
  },
  huecos: [
    { seccion: 'negocio', campo: 'geografías', tipo: 'Complemento', intentos: '1) 10-K 2025, nota de segmentos (solo por segmento y tipo de ingreso); 2) 10-Q 2T26; 3) XBRL (sin desglose geográfico de ingresos útil)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'presentación de resultados del 3T26', tipo: 'Complemento', intentos: '1) 8-K del 22-oct en EDGAR (solo la nota de prensa, sin presentación); 2) web de inversores ropertech.gcs-web.com (la descarga se bloquea); 3) transcripción de la conferencia en MarketBeat (usada en su lugar)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) 10-K 2025 (no lo cita); 2) 10-Q 2T26; 3) 8-K de financiación de abril de 2026 (línea de crédito, sin rating)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia (sector reutilizado del informe de Constellation Software, 10-oct-2026)
const fB = [
  { id: 1, titulo: 'Vertical Software Market Size and Share', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026-03-13', url: 'https://www.mordorintelligence.com/industry-reports/vertical-software-market' },
  { id: 2, titulo: 'Vertical Software Market Size, Share & Trends (Grand View Research, vía GII)', editor: 'Grand View Research', tipo: 'Sectorial', fecha: '2025-08-12', url: 'https://www.gii.tw/report/grvi1814014-vertical-software-market-size-share-trends.html' },
  { id: 3, titulo: 'IGV Bounces 5% But the SaaS Selloff May Not Be Over Yet', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-03-05', url: 'https://finance.yahoo.com/news/igv-bounces-5-saas-selloff-184237901.html' },
  { id: 4, titulo: 'US stocks: Anthropic AI tool sparks software selloff', editor: 'CNN', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://edition.cnn.com/2026/02/04/investing/us-stocks-anthropic-software' },
  { id: 5, titulo: 'Tyler Technologies, Form 10-K 2025 (datos XBRL)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-18', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000860731.json' },
  { id: 6, titulo: 'Constellation Software, Consolidated Financial Statements 2025', editor: 'Constellation Software Inc.', tipo: 'Primaria', fecha: '2026-03-09', url: 'https://www.csisoftware.com/wp-content/uploads/2026/04/CSI-Financial-Statement-Q425-Final.pdf' },
  { id: 7, titulo: 'Veeva Systems, resultados del 4T del ejercicio 2026 (Exhibit 99.1)', editor: 'Veeva Systems / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.sec.gov/Archives/edgar/data/1393052/000139305226000007/veev-20260131q426xex991.htm' },
  { id: 8, titulo: 'Intuit, Form 10-K ejercicio 2026', editor: 'Intuit / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09', url: 'https://www.sec.gov/Archives/edgar/data/896878/000089687826000037/intu-20260731.htm' },
  { id: 9, titulo: 'AMETEK, Inc.: estimaciones anuales y consenso', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AMETEK-INC-11635/finances/' },
  { id: 10, titulo: 'Fortive Corporation: estimaciones anuales y consenso', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/FORTIVE-CORPORATION-28859043/finances/' },
  { id: 11, titulo: 'Roper Technologies, Form 10-K 2025 (Item 1, negocio; Item 1A, riesgos)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: `${SEC}/000088283526000009/rop-20251231.htm` },
  { id: 12, titulo: 'Roper Technologies, Form 10-Q 2T26 (nota 10, Indicor)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${SEC}/000088283526000036/rop-20260630.htm` },
  { id: 13, titulo: 'Roper Technologies announces second quarter financial results (2T26)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-23', url: `${SEC}/000088283526000031/a2026q2earningsrelease.htm` },
  { id: 14, titulo: 'Roper Technologies announces third quarter financial results (3T26)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-22', url: `${SEC}/000088283526000042/a2026q3earningsrelease.htm` },
  { id: 15, titulo: 'Roper Technologies Q3 2026 earnings call transcript', editor: 'MarketBeat', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.marketbeat.com/earnings/reports/2026-10-22-roper-technologies-inc-stock/' },
  { id: 16, titulo: 'Xylem to Acquire Cornell Pump and Roper Pump (1.460 M USD)', editor: 'Xylem (comunicado vía Placera)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://www.placera.se/pressmeddelanden/xylem-xylem-to-acquire-cornell-pump-and-roper-pump-strengthening-industrial-presence-in-high-growth-sectors-20260811' },
  { id: 17, titulo: 'Históricos diarios del ETF de software IGV (rentabilidad de 1, 3 y 12 meses a 23-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/IGV/history/' },
];
const B = {
  historia: {
    resumen: 'Roper nació en 1981 como fabricante de bombas industriales en Georgia y salió a bolsa en 1992. Con Brian Jellison (2001-2018) se convirtió en un comprador en serie que reinvertía la caja de negocios de nicho en compras cada vez más de software. Neil Hunn, consejero delegado desde 2018, completó el giro: en 2022 vendió TransCore, Zetec, CIVCO y la mayoría del negocio industrial (Indicor, a CD&R) por más de 5.500 M y hoy el 78 % de las ventas es software vertical [11, 12]. En 2023 pasó a cotizar en el Nasdaq. Desde finales de 2025 combina compras con recompras, tras la caída de la acción por el miedo a la IA [13]. En 2026 Indicor vendió su instrumentación a AMETEK y vende las bombas a Xylem: la participación industrial que quedaba de 2022 se convierte en caja [14, 16].',
    hitos: [
      { anio: '1981', hito: 'Fundación como Roper Industries (bombas industriales).' },
      { anio: '1992', hito: 'Salida a bolsa.' },
      { anio: '2001', hito: 'Brian Jellison, consejero delegado: empieza la estrategia de compras de nichos con caja libre.' },
      { anio: '2016', hito: 'Compra de Deltek (2.800 M), su mayor compra de software hasta entonces.' },
      { anio: '2018', hito: 'Neil Hunn sucede a Jellison.' },
      { anio: '2022', hito: 'Ventas de TransCore e industrial (5.562 M de cobros); compra de Frontline Education [11].' },
      { anio: '2025', hito: 'Compras de CentralReach (1.850 M) y Subsplash (800 M); primer programa de recompra (3.000 M) [11].' },
      { anio: '2026', hito: 'Recompra de 9,0 M de acciones en tres trimestres; Indicor vende su instrumentación a AMETEK (5.000 M de valor empresa) y sus bombas a Xylem (1.460 M); 17-18 de sus 21 negocios de software venden ya agentes de IA [12-16].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Roper es un conglomerado de unas 30 empresas de nicho que gestiona de forma descentralizada. Application Software (57 % de las ventas de 2025) vende programas de gestión a sectores concretos: ingeniería y contratistas públicos (Deltek), despachos de abogados (Aderant), corredores de seguros (Vertafore), hospitales (Strata, Clinisys), guarderías (Procare), universidades (CBORD/Transact) y terapia del autismo (CentralReach). Network Software (20 %) son redes con efectos de red: la bolsa de cargas de camiones DAT, ConstructConnect en construcción, compras agrupadas para residencias y Subsplash para iglesias. Technology Enabled Products (23 %) fabrica productos de medición médica (Northern Digital, Verathon), contadores de agua (Neptune) y control de accesos [11].',
    como_gana_dinero: 'El 57 % de las ventas son ingresos recurrentes de software (suscripciones, licencias anuales y mantenimiento) y otro 11 % son comisiones por transacción que se repiten; solo el 10 % es software no recurrente y el 22 % producto [11]. El margen bruto es del 69 % y el margen de los segmentos, del 32 %: Network Software llega al 43,5 % y Application Software al 26,8 % [11]. El crecimiento orgánico (5-6 %) sale de subidas de precio, venta de módulos y paso a la nube; el resto lo aportan las compras, pagadas con la caja libre (31 % de las ventas). Hay poca estacionalidad; los cobros anticipados de enero hacen negativo el circulante [11].',
    clientes: 'Ningún cliente pesa de forma relevante: son decenas de miles de empresas medianas, despachos, hospitales y administraciones en nichos donde el producto de Roper suele ser el líder [11]. Los contratos son mayoritariamente anuales con renovación; la cartera a 12 meses (3.425 M a cierre de 2025) cubre el 43 % de las ventas del año siguiente [11]. El poder de precios se ve en la estabilidad del margen bruto (69 % en 2023-2025) pese a la inflación salarial, y en el crecimiento de los ingresos recurrentes del 12,7 % en 2025. La debilidad está en los negocios ligados al gasto público (Deltek, tras los recortes de contratos federales) y en Neptune [11, 13]. En el 3T26 la dirección dio una retención bruta del software empresarial «a mediados del 90 %» y un orgánico recurrente del 8 %; Deltek tuvo buenas contrataciones en la nube y Neptune sufrió la mezcla hacia contadores mecánicos más baratos [15].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el software vertical: aplicaciones específicas de un sector (sanidad, administración y contratistas públicos, despachos, seguros, educación, construcción, transporte) vendidas a organizaciones en todo el mundo, con peso de Norteamérica [1]. No hay estadística oficial. Usamos Mordor Intelligence (147.110 M USD en 2025) [1] y lo contrastamos con Grand View Research (150.250 M USD en 2024) [2]; ambos dan crecimientos del 11,5-12,5 % anual. Son estimaciones privadas que sirven como orden de magnitud. El segmento de productos de Roper (23 % de las ventas) queda fuera de este perímetro.',
    tamano: '≈ 147.110 M USD en 2025 según Mordor Intelligence [1]; ≈ 150.250 M USD en 2024 según Grand View Research [2].',
    unidad_serie: 'millones de USD (Mordor Intelligence)',
    serie: [{ anio: '2025', tamano: 147110 }, { anio: '2026e', tamano: 164060 }, { anio: '2031e', tamano: 282980 }],
    tcac_historico_pct: null, tcac_previsto_pct: 11.5, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Digitalización de procesos en nichos (sanidad, sector público, pymes)', efecto: '+', horizonte: 'Estructural', evidencia: 'Previsiones del 11,5 % anual en 2026-2031 [1] y del 12,5 % en 2025-2033 [2].' },
      { driver: 'Paso a SaaS y venta de módulos (incluidos los de IA)', efecto: '+', horizonte: 'Estructural', evidencia: 'Los ingresos recurrentes de software de Roper crecieron un 12,7 % en 2025 [11].' },
      { driver: 'IA generativa y agentes: menor barrera de entrada y menos usuarios por cliente', efecto: '−', horizonte: 'Estructural', evidencia: 'El 3-feb-2026 los complementos de Claude Cowork hundieron el software (−16 % Thomson Reuters) [4]; el ETF IGV llegó a caer un 18 % en el año en marzo [3].' },
      { driver: 'Presupuestos públicos y de contratistas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Roper atribuye la caída del ingreso no recurrente de Deltek al mercado de contratación federal [11].' },
      { driver: 'Oferta de empresas en venta del capital riesgo', efecto: '+', horizonte: 'Cíclico', evidencia: 'Las valoraciones privadas del software han bajado tras la caída de las cotizadas en 2026 [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Nichos con uno o dos líderes; los márgenes de segmento de Roper (32 %) se mantienen desde 2023 [11].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes pequeños y muy numerosos, con costes de cambio altos (datos, flujos de trabajo, formación).' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El coste principal es el personal; la nube (AWS, Azure) es una mercancía, aunque los modelos de IA añaden un proveedor nuevo con poder.' },
      { fuerza: 'Amenaza de entrada', intensidad: 4, justificacion: 'La IA abarata escribir software: un competidor nativo en IA puede replicar funciones en meses; la barrera que queda son los datos, la integración y la confianza del regulador [3, 4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Los agentes de IA generalistas pueden hacer parte del trabajo (revisión de documentos jurídicos, propuestas) sin el programa vertical [4].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El software vertical crece poco con el ciclo: Roper mantuvo crecimiento orgánico en software en 2020 y en 2022 subió el 6-8 % [11]. Lo cíclico es el producto (Neptune, medición) y el gasto público. Hoy el indicador que manda no es el ciclo económico sino la percepción de la IA: el IGV cayó con fuerza en el 1T26 y el múltiplo de Roper se desplomó sin que lo hicieran sus resultados [3]; desde julio el IGV ha recuperado un 21,6 % en tres meses y Roper un 16,8 %, la mitad del último mes tras su 3T26 [17].' },
    regulacion: 'Los negocios de salud (Clinisys, CentralReach, Strata) dependen de la regulación de datos sanitarios de EE. UU. (HIPAA) y de los reembolsos de Medicaid en terapia del autismo; Deltek depende de las reglas de contratación federal (FAR), que la administración actual revisa y recorta [11]. No hay regulación específica de la IA en EE. UU. que afecte a sus cifras.',
    tendencias: 'La tendencia que decide es la IA generativa. Juega en dos sentidos: Roper puede vender módulos de IA sobre sus datos propios (17-18 de sus 21 negocios de software tienen agentes a la venta; Vertafore ha lanzado 12 este año y en CentralReach una parte alta de las contrataciones ya son de IA) [15], pero la IA reduce la barrera de entrada y puede reducir el número de puestos que pagan licencia. Los negocios con efectos de red (DAT) o con datos regulados (sanidad, seguros) parecen más protegidos que los de productividad documental (Aderant en despachos, Deltek en propuestas).',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Líder o número dos en la mayoría de sus nichos (Deltek en contratistas públicos, Aderant en grandes despachos, DAT en fletes, Vertafore en corredores de seguros); en el conjunto del software vertical su cuota es ~4 % (6.130 M de software sobre ~147.000 M) [1, 11].',
    competidores: [
      { nombre: 'Constellation Software', pais: 'Canadá', ticker: 'CSU', ingresos: 11623, cuota_pct: null, margen_ebit_pct: 16.3, comentario: 'Comprador en serie de software vertical (cientos de compras pequeñas); compite por los mismos activos [6].' },
      { nombre: 'Tyler Technologies', pais: 'EE. UU.', ticker: 'TYL', ingresos: 2332.3, cuota_pct: null, margen_ebit_pct: 15.3, comentario: 'Software para administraciones locales; rival en tribunales y servicios públicos (Neptune/Muni-Link) [5].' },
      { nombre: 'Veeva Systems', pais: 'EE. UU.', ticker: 'VEEV', ingresos: 3195.3, cuota_pct: null, margen_ebit_pct: 28.7, comentario: 'Software vertical de ciencias de la vida; referencia de margen y de crecimiento orgánico [7].' },
      { nombre: 'Intuit', pais: 'EE. UU.', ticker: 'INTU', ingresos: 21448, cuota_pct: null, margen_ebit_pct: 27.4, comentario: 'Software para pymes y contribuyentes; misma exposición al riesgo de IA en tareas administrativas [8].' },
      { nombre: 'AMETEK', pais: 'EE. UU.', ticker: 'AME', ingresos: 7401, cuota_pct: null, margen_ebit_pct: 26.2, comentario: 'Conglomerado de instrumentos de nicho; compite con Technology Enabled Products y compra Indicor Instrumentation [9, 12].' },
      { nombre: 'Fortive', pais: 'EE. UU.', ticker: 'FTV', ingresos: 4159, cuota_pct: null, margen_ebit_pct: 17.3, comentario: 'Conglomerado de instrumentación y software (tras escindir Ralliant); modelo de gestión parecido [10].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Network Software (20 % de las ventas, margen 43,5 %): DAT y ConstructConnect valen más cuanto más cargadores y contratistas tienen [11].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Software de gestión con datos históricos y flujos de trabajo del cliente; ingresos recurrentes +12,7 % en 2025 y margen bruto estable del 69 % [11].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marcas de nicho y datos propios; pocas patentes relevantes [11].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Ventaja de capital: coste de la deuda del 3,8 % y capacidad de compra; no de coste operativo.' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Nichos pequeños donde caben uno o dos proveedores rentables [1].' },
      ],
    },
    amenazas: 'La amenaza principal es la IA: abarata replicar funciones y puede sustituir parte del trabajo que hoy se hace con el programa (revisión de contratos en despachos, propuestas en contratistas). La caída del 3-feb-2026 (−6,4 % Roper, −16 % Thomson Reuters) muestra que el mercado ve probable ese escenario [4]. Le damos una probabilidad media de erosión parcial en cinco años en los negocios documentales (Aderant, parte de Deltek, ~20 % de las ventas) y baja en los de red, datos regulados o productos físicos. Segunda amenaza: la competencia por compras con el capital riesgo, que encarece los precios.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para Roper no es el carbono (negocio de software y productos ligeros) sino la ciberseguridad y la privacidad de los datos de clientes sanitarios, educativos y jurídicos, y el capital humano (más de la mitad de los costes son personal) [11]. Un incidente de ciberseguridad en un negocio de datos regulados (Clinisys, CentralReach) tendría coste legal y de reputación. Roper mantiene un plan centralizado de respuesta a incidentes y seguros cibernéticos [11].',
    controversias: 'No hemos encontrado sanciones ni litigios materiales en tres años; en 2022 registró un cargo por un acuerdo legal (0,33 USD por acción) y en 2024 otro menor (0,08 USD) [11].',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K 2025 (no las cita); 2) proxy 2026 (sin calificaciones); 3) no se buscó en las agencias por presupuesto', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Roper Technologies, Proxy Statement 2026 (DEF 14A)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-07', url: `${SEC}/000119312526145481/d204543ddef14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 19-may-2026 (Item 5.07)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-19', url: `${SEC}/000119312526230480/d156759d8k.htm` },
  { id: 3, titulo: 'Form 4 de Roper Technologies (CIK 882835), 26-oct-2025 a 26-oct-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000882835&type=4' },
  { id: 4, titulo: 'Abhijit Dubey joins Roper Technologies Board of Directors', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-01', url: `${SEC}/000088283526000039/exhibit991pressreleaseoct1.htm` },
  { id: 5, titulo: 'Roper Technologies announces 2023 financial results (guía 2024)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2024-01-31', url: `${SEC}/000088283524000002/a2023q4earningsrelease.htm` },
  { id: 6, titulo: 'Roper Technologies announces 2022 financial results (guía 2023)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2023-01-27', url: `${SEC}/000088283523000010/a2022q4earningsrelease.htm` },
  { id: 7, titulo: 'Roper Technologies announces 2024 financial results (guía 2025)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2025-01-30', url: `${SEC}/000088283525000003/a2024q4earningsrelease.htm` },
  { id: 8, titulo: 'Roper Technologies announces 2025 financial results (guía 2026)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-27', url: `${SEC}/000088283526000003/a2025q4earningsrelease.htm` },
  { id: 9, titulo: 'Roper Technologies announces second quarter financial results (guía 2026 elevada)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-23', url: `${SEC}/000088283526000031/a2026q2earningsrelease.htm` },
  { id: 10, titulo: 'Roper Technologies, Form 10-Q 2T26 (acciones en circulación, recompras)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${SEC}/000088283526000036/rop-20260630.htm` },
  { id: 11, titulo: 'Roper Technologies announces third quarter financial results (guía 2026 elevada a 22,35-22,40 USD)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-22', url: `${SEC}/000088283526000042/a2026q3earningsrelease.htm` },
  { id: 12, titulo: 'Form 144 de Jason Conley (aviso de venta de 12.000 acciones de opciones ejercidas, 5,23 M USD)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.sec.gov/Archives/edgar/data/882835/000195917326007473/primary_doc.xml' },
];
const cons = (nombre, tipo, desde, comisiones, cargo = 'Consejero') => ({ nombre, cargo, tipo, desde, comisiones });
const Cn = {
  directivos: {
    equipo: [
      { nombre: 'L. Neil Hunn', cargo: 'Presidente ejecutivo de operaciones y consejero delegado (President and CEO)', desde: '2018', participacion_pct: 0.54, trayectoria: 'Entró en Roper en 2011 como vicepresidente de grupo tras dirigir MedAssets; consejero delegado desde agosto de 2018. Ha llevado el giro a software (78 % de las ventas) con ventas por 5.562 M en 2022 y compras por más de 13.000 M; el BPA ajustado pasó de 14,28 USD en 2022 a 20,00 en 2025 [1, 6, 8].' },
      { nombre: 'Jason P. Conley', cargo: 'Director financiero (EVP, CFO)', desde: '2018', participacion_pct: 0.11, trayectoria: 'Antes controller y director de contabilidad de Roper; financió las compras de 2023-2025 con bonos a coste medio del 3,8 % y dirige ahora la recompra [1].' },
      { nombre: 'Amy Woods Brinkley', cargo: 'Presidenta independiente del consejo', desde: '2015', participacion_pct: 0.02, trayectoria: 'Ex directora de riesgos de Bank of America; preside el consejo desde junio de 2021 [1].' },
      { nombre: 'John K. Stipancich', cargo: 'Secretario general y director jurídico (EVP, General Counsel)', desde: '2016', participacion_pct: null, trayectoria: 'Ex director jurídico de Newell Brands [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'BPA ajustado 15,90-16,20 USD; orgánico +5-6 % [6]', real: '16,71 USD; orgánico +8 % [5]', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA ajustado 17,85-18,15 USD; orgánico +5-6 % [5]', real: '18,31 USD [8]', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado 19,75-20,00 USD; ventas +10 %; orgánico +6-7 % [7]', real: '20,00 USD; ventas +12 %; orgánico +5 % [8]', cumplida: 'Parcial' },
      { anio: '2026', guia: 'BPA ajustado 21,30-21,55 USD; orgánico +5-6 % [8]', real: 'En curso: guía elevada tres veces, a 22,35-22,40 USD en octubre, con orgánico de ~6 % y 3T26 por encima de su propia guía (5,89 frente a 5,75-5,80) [9, 11]', cumplida: 'Sí' },
    ],
    comentario: 'La dirección cumple casi siempre la guía de BPA ajustado y la eleva durante el año (2023, 2024, 2026); falló en el crecimiento orgánico de 2025 (5 % frente a 6-7 %), con dos trimestres por debajo de lo esperado en ventas [7, 8]. El equipo es estable: Hunn y Conley llevan desde 2018. Hunn compró 4,5 M USD de acciones en noviembre de 2025 a ~452 USD, aunque vendió 13,3 M con un plan 10b5-1 un día antes [3]. No hay plan de sucesión público; el consejo incorporó en octubre de 2026 a Abhijit Dubey (consejero delegado y responsable de IA de NTT DATA) para reforzar la estrategia de IA [4]. Tras el 3T26, el director financiero avisó (Form 144) la venta de 12.000 acciones de opciones ejercidas el 23-oct, por 5,23 M USD: ejercicio de opciones, no una venta de su cartera [12].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Amy Woods Brinkley', 'Independiente', '2015', 'Ejecutiva (presidenta); Nombramientos', 'Presidenta del consejo'),
      cons('L. Neil Hunn', 'Ejecutivo', '2018', '—', 'Consejero delegado'),
      cons('Shellye L. Archambeau', 'Independiente', '2018', 'Nombramientos y Gobierno (presidenta)'),
      cons('Irene M. Esteves', 'Independiente', '2021', 'Auditoría'),
      cons('Robert D. Johnson', 'Independiente', '2005', 'Retribuciones'),
      cons('Thomas P. Joyce, Jr.', 'Independiente', '2021', 'Auditoría'),
      cons('John F. Murphy', 'Independiente', '2024', 'Auditoría'),
      cons('Laura G. Thatcher', 'Independiente', '2015', 'Retribuciones (presidenta)'),
      cons('Richard F. Wallman', 'Independiente', '2007', 'Auditoría (presidente)'),
      cons('Abhijit Dubey', 'Independiente', '2026', 'Pendiente de asignar'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.6, voto_remuneracion_contra_pct: 5.9, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 26.21, fijo: 1.0, variable_corto: 2.10, variable_largo: 22.63, ratio_salario_medio: 260 },
    remuneracion: 'El primer ejecutivo cobró 26,2 M USD en 2025: 1,0 M fijo, 2,1 M de bonus anual y 22,6 M en acciones con objetivos (17,5 M) y opciones (5,1 M) [1]. El bonus depende del crecimiento del EBITDA ajustado (+11 % en 2025, pago del 104,8 %); las acciones con objetivos, de la TCAC a tres años del beneficio neto ajustado y del rendimiento total relativo (percentiles 30-80) [1]. El problema: el beneficio ajustado excluye la amortización de lo comprado, así que premia comprar aunque sea caro; no hay métrica de ROIC. Hay recuperación (clawback) reforzada [1]. El voto consultivo sobre la remuneración obtuvo un 93,6 % a favor y un 5,9 % en contra en 2026 [2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.6, tipo: 'Gestora indexada', variacion: 'Desagregó su declaración en marzo de 2026 [1]' },
      { nombre: 'BlackRock', pct: 9.0, tipo: 'Gestora', variacion: 'Dato de su 13G de 2024 [1]' },
      { nombre: 'Windacre Partnership', pct: 6.9, tipo: 'Fondo de inversión concentrado', variacion: 'Nuevo accionista significativo [1]' },
      { nombre: 'Autocartera', pct: 9.6, tipo: 'Autocartera', variacion: '10,5 M de acciones a 30-jun-2026, desde 2,7 M en diciembre [10]' },
    ],
    insiders: [
      { fecha: '2025-11-11', persona: 'L. Neil Hunn (consejero delegado)', operacion: 'Venta', acciones: 29600, importe: 13.31 },
      { fecha: '2025-11-12', persona: 'L. Neil Hunn (consejero delegado)', operacion: 'Compra', acciones: 10000, importe: 4.52 },
      { fecha: '2025-11-12', persona: 'Amy Woods Brinkley (presidenta)', operacion: 'Compra', acciones: 1200, importe: 0.54 },
      { fecha: '2025-12-01', persona: 'Jason Conley (director financiero)', operacion: 'Venta', acciones: 6000, importe: 2.67 },
      { fecha: '2026-02-06', persona: 'Thomas P. Joyce, Jr. (consejero)', operacion: 'Compra', acciones: 1400, importe: 0.50 },
      { fecha: '2026-07-24', persona: 'Richard F. Wallman (consejero)', operacion: 'Venta', acciones: 6434, importe: 2.32 },
      { fecha: '2026-07-27', persona: 'John K. Stipancich (director jurídico)', operacion: 'Venta', acciones: 2000, importe: 0.76 },
    ],
    control_y_defensas: 'No hay accionista de control: los mayores son gestoras (Vanguard 11,6 %, BlackRock 9,0 %) y Windacre (6,9 %) [1]. Una acción, un voto; consejeros elegidos cada año por mayoría; presidenta independiente separada del consejero delegado [1]. En la junta de 2026 los accionistas rechazaron (0,6 % a favor) una propuesta para estudiar escindir los segmentos de software, y aprobaron 14,15 M de acciones nuevas para el plan de incentivos (un 14 % del capital en circulación, aunque se emiten a lo largo de años) y un plan de compra para empleados con descuento del 15 % [2].',
    alertas: [
      'Plan de incentivos ampliado en 14,15 M de acciones (≈14 % del capital en circulación) en mayo de 2026: dilución potencial si no se compensa con recompras [2].',
      'Variable a largo plazo ligado al beneficio neto ajustado, que excluye la amortización de lo comprado: incentivo a crecer comprando [1].',
      'Aviso de venta (Form 144) del director financiero el 23-oct-2026: 12.000 acciones de opciones ejercidas, 5,23 M USD, al día siguiente de la subida del 9,7 % por los resultados [12].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};
guarda('C', Cn);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ROP, ^GSPC e IGV (precio, rango, volumen, betas, cierres de ejercicio y movimiento a 1-12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/ROP/history/' },
  { id: 2, titulo: 'Roper Technologies: estimaciones anuales y consenso (19 analistas; datos a 16-oct-2026, antes del 3T26)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/ROPER-TECHNOLOGIES-INC-14279/finances/' },
  { id: 3, titulo: 'Roper Technologies (ROP) price target and analyst ratings (19 analistas, objetivo medio 460,33 USD a 23-oct-2026)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-23', url: 'https://www.marketbeat.com/stocks/NASDAQ/ROP/forecast/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,00 % el 23-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Roper Technologies announces third quarter financial results (3T26, balance a 30-sep-2026, guía 2026)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-22', url: `${SEC}/000088283526000042/a2026q3earningsrelease.htm` },
  { id: 7, titulo: 'MeridianLink, DEFM14A: Selected Precedent Transactions Analysis (Centerview)', editor: 'MeridianLink / SEC EDGAR', tipo: 'Primaria', fecha: '2025-09-22', url: 'https://www.sec.gov/Archives/edgar/data/1834494/000114036125035721/ny20054829x2_defm14a.htm' },
  { id: 8, titulo: 'Weave Communications, DEFM14A, fusión con Francisco Partners', editor: 'Weave Communications / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-25', url: 'https://www.sec.gov/Archives/edgar/data/1609151/000114036126037628/ny20081403x2_defm14a.htm' },
  { id: 9, titulo: 'Estimaciones y múltiplos de Tyler Technologies y Descartes Systems (MarketScreener, 10-13-oct-2026; recogidos en los informes de Constellation Software y Tyler del repo; llevados al cierre del 23-oct con el precio de Yahoo)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-10', url: 'https://www.marketscreener.com/quote/stock/ROPER-TECHNOLOGIES-INC-14279/finances/' },
  { id: 10, titulo: 'Múltiplos de Constellation Software, Veeva e Intuit (informes del repo del 10 y 14-oct-2026, con MarketScreener y cuentas; llevados al cierre del 23-oct con el precio de Yahoo)', editor: 'MarketScreener / cuentas de las empresas', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CONSTELLATION-SOFTWARE-IN-1409607/finances/' },
  { id: 11, titulo: 'AMETEK, Inc.: estimaciones anuales (cierre 250,48 USD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AMETEK-INC-11635/finances/' },
  { id: 12, titulo: 'Fortive Corporation: estimaciones anuales (cierre 58,07 USD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/FORTIVE-CORPORATION-28859043/finances/' },
  { id: 14, titulo: 'Roper Technologies announces second quarter financial results (guía 2026)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-23', url: `${SEC}/000088283526000031/a2026q2earningsrelease.htm` },
  { id: 13, titulo: 'Roper Technologies, Form 10-Q 2T26 (balance, acciones a 28-jul-2026)', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${SEC}/000088283526000036/rop-20260630.htm` },
  { id: 15, titulo: 'ROP: BPA ajustado del 3T26 (5,89) frente al consenso (5,79)', editor: 'Earnings Whispers', tipo: 'Datos de mercado', fecha: '2026-10-22', url: 'https://www.earningswhispers.com/epsdetails/ROP' },
  { id: 16, titulo: 'Roper Technologies (ROP) forecast: BPA ajustado 2026 del consenso (S&P Global), actualizado a 23-oct-2026', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/rop/forecast/' },
  { id: 17, titulo: 'Xylem to Acquire Cornell Pump and Roper Pump (1.460 M USD, 11,6x EBITDA 2026e con sinergias)', editor: 'Xylem (comunicado vía Placera)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://www.placera.se/pressmeddelanden/xylem-xylem-to-acquire-cornell-pump-and-roper-pump-strengthening-industrial-presence-in-high-growth-sectors-20260811' },
  { id: 18, titulo: 'Roper Technologies Q3 2026 earnings call transcript', editor: 'MarketBeat', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.marketbeat.com/earnings/reports/2026-10-22-roper-technologies-inc-stock/' },
  { id: 19, titulo: 'Form 144 de Jason Conley (aviso de venta, 23-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.sec.gov/Archives/edgar/data/882835/000195917326007473/primary_doc.xml' },
  { id: 20, titulo: 'Seeking Alpha, titulares de ROP (22-23-oct-2026: «Roper surges 10% on earnings beat, raised guidance»)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://seekingalpha.com/api/sa/combined/ROP.xml' },
  { id: 21, titulo: 'Noticias de ROP de septiembre y octubre de 2026 (Reuters, GlobeNewswire)', editor: 'Tiger Brokers (agregador)', tipo: 'Prensa', fecha: '2026-10-08', url: 'https://itiger.com/stock/ROP/news?page=3' },
];
// Comparables llevados del día de su fuente al cierre del 23-oct-2026 (Yahoo): capitalización y PER con el precio; múltiplos de valor empresa con el valor empresa (deuda neta constante).
const FACTOR = { CSU: 3395 / 3003.78, TYL: 390.14 / 346.9, VEEV: 323.04 / 296.13, INTU: 343.39 / 302.75, AME: 240.03 / 250.48, FTV: 60.25 / 58.07, DSG: 131.57 / 118.14 };
const r2 = (x, d = 1) => (x == null ? null : +x.toFixed(d));
function escalar(e) {
  const f = FACTOR[e.ticker];
  const ev = e.capitalizacion / (1 - e.dn_ebitda / e.ev_ebitda_ltm);
  const k = (ev - e.capitalizacion + e.capitalizacion * f) / ev;
  return { ...e, capitalizacion: Math.round(e.capitalizacion * f), ev_ventas: r2(e.ev_ventas * k, 2), ev_ebitda_ltm: r2(e.ev_ebitda_ltm * k), ev_ebitda_ntm: r2(e.ev_ebitda_ntm == null ? null : e.ev_ebitda_ntm * k), per_ntm: r2(e.per_ntm * f), fcf_yield_pct: r2(e.fcf_yield_pct / f) };
}
const B1 = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const cierre = Object.fromEntries(B1.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  identificacion: {
    nombre: 'Roper Technologies, Inc.', nombre_corto: 'Roper', ticker: 'ROP', isin: 'US7766961061', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software', sede: 'Sarasota (Florida)', fundacion: '1981', empleados: null, web: 'www.ropertech.com',
    precio: 438.14, fecha_precio: '2026-10-23', acciones: 99.5, capitalizacion_publicada: null, free_float_pct: 99.0,
    max_52s: 476.53, min_52s: 305.96, volumen_medio_diario: '≈ 313 M USD/día (3 meses)', proximos_resultados: '2027-01-27',
  },
  consenso: {
    guidance: 'Guía 2026 (22-oct-2026): BPA ajustado de 22,35-22,40 USD (21,30-21,55 en enero, 21,80-22,05 en abril y 22,15-22,30 en julio), crecimiento de ventas por encima del 8 % y orgánico de ~6 %; 4T26 de 5,95-6,00 USD con un tipo impositivo del 20-21 % [6, 18]. En BPA GAAP la guía es 25,60-25,65 USD, con 9,86 USD de ganancias de Indicor y 6,56 USD de amortización de intangibles comprados [6]. No incluye compras futuras, recompras ni el cobro de ~600 M de Xylem. Caja libre del 30 % de las ventas o más. No hay plan a medio plazo con cifras; para 2027 la dirección solo dijo que el punto de partida es «en general constructivo» [18].',
    estimaciones: [
      { periodo: '2026e', ingresos: 8558, ebitda: 3352, ebit: 2428, bpa: 25.18, dpa: 3.59, fuente: 'MarketScreener, 19 analistas (BPA GAAP con la ganancia de Indicor) [2]' },
      { periodo: '2027e', ingresos: 9091, ebitda: 3586, ebit: 2662, bpa: 18.72, dpa: 3.88, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 9674, ebitda: 3790, ebit: 2882, bpa: 20.16, dpa: 4.31, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: 7, mantener: 9, vender: 3, po_medio: 460.33, po_min: 355, po_max: 540 },
    revisiones: 'Las estimaciones a tres años solo están en MarketScreener, con datos del 16-oct, antes del 3T26 [2]; Stock Analysis (S&P Global, 23-oct) da un BPA ajustado de 2026 de 22,35 USD, ya en la guía nueva [16]. MarketBeat da a 23-oct 7 comprar, 9 mantener y 3 vender, y un objetivo medio de 460,33 USD (355-540) [3]. Tras el 3T26 los objetivos subieron: Jefferies de 500 a 540 USD (comprar), Citi de 450 a 525 (comprar), Truist de 475 a 500 (comprar), RBC de 417 a 450 (neutral) y BMO mantuvo 462 (neutral) [3]. El BPA ajustado de 2026 sube 0,15 USD con la guía; el 3T26 batió el consenso (5,89 frente a 5,79) con ventas en línea (2.172 M frente a ~2.180) [15]. El BPA GAAP de 2026 del consenso (25,18) incluye la ganancia de Indicor.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B1.bolsa,
    posicion_corta_pct: null,
    comentario: 'Roper pierde un 8,5 % en un año frente al +12,3 % del S&P 500 y el −4,7 % del ETF de software IGV, y un 1,6 % en el año [1]. La caída tuvo dos golpes: el 27-ene-2026 (−9,6 %) por una guía 2026 floja y el 3-feb-2026 (−6,4 %) en la venta masiva del software por los complementos de IA de Anthropic. El mínimo fue de 305,96 USD el 13-may-2026; desde ahí sube un 43 %: los resultados del 2T26 y la recompra la llevaron a 426 USD a finales de agosto, septiembre la devolvió a 349 USD sin noticia propia, y el 3T26 la subió un 9,7 % el 22-oct, hasta 438,14 USD el 23-oct [1, 20]. La beta mensual de cinco años es 0,70 (ajustada 0,80; semanal de dos años 0,44) y la volatilidad, del 31 %, alta para su historia [1].',
    contexto: {
      movimiento: { fecha: '2026-10-23', var_1m_pct: 20.4, var_3m_pct: 16.8, var_6m_pct: 24.0, var_12m_pct: -13.9, dist_max_52s_pct: -8.7, dist_min_52s_pct: 38.9, dist_max_historico_pct: -26.2, tendencia: 'alcista', volatilidad_60d_pct: 30.5, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'jul-ago 2026', var_pct: 21.9, causa: 'Del 22-jul al 20-ago: 2T26 por encima de lo esperado con la guía elevada (+5,5 % el 23-jul), recompra de 9,0 M de acciones y rebote del software (IGV +14 % en el mismo periodo) [1, 14, 20].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep 2026', var_pct: -18.0, causa: 'Del 28-ago al 29-sep, sin noticia propia: no hubo cambios de recomendación, guía ni hechos relevantes en EDGAR; solo compras pequeñas (Playground) y lanzamientos de agentes de Vertafore [21]. El IGV cayó un 4 % en ese tiempo: la caída de Roper fue mayor que la del sector y la recuperó con el 3T26 (estimación propia: rotación fuera del software de aplicaciones).', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 20.4, causa: 'Del 23-sep al 23-oct: el 3T26 (orgánico del 7 %, BPA ajustado de 5,89 USD frente a 5,79 de consenso, guía elevada) subió la acción un 9,7 % el 22-oct, y los analistas subieron sus objetivos [3, 6, 15, 20].', veredicto: 'no cambia', condicion: null },
        { periodo: '27-ene-2026 y 3-feb-2026', var_pct: -9.6, causa: 'Días de −9,6 % (guía 2026 por debajo de lo esperado) y −6,4 % (venta masiva del software por los complementos de IA de Anthropic). Ya están en la tesis: es el riesgo de IA del bajista [1].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-22', tipo: 'resultados', hecho: '3T26: ventas +8 % (7 % orgánico), BPA ajustado de 5,89 USD (+15 %) y guía 2026 elevada a 22,35-22,40 USD; recompra parada para conservar capacidad de compra [6, 18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-23', tipo: 'recomendación', hecho: 'Suben objetivos Jefferies (540), Citi (525), Truist (500) y RBC (450); BMO mantiene 462 [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-23', tipo: 'directivos', hecho: 'Form 144 del director financiero: venta de 12.000 acciones de opciones ejercidas (5,23 M USD). Es un ejercicio de opciones, no venta de su cartera, y no hay ventas en serie de la cúpula (el consejero delegado compró 4,5 M en noviembre de 2025) [19].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-11', tipo: 'fusión u oferta', hecho: 'Indicor vende sus bombas a Xylem por 1.460 M; Roper espera ~600 M antes de impuestos en el 4T26, pendiente de la aprobación de competencia. Ya está en el puente a valor razonable (577 M) [17, 18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-01', tipo: 'directivos', hecho: 'Entra en el consejo Abhijit Dubey, consejero delegado de NTT DATA, para reforzar la estrategia de IA [21].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-22', tipo: 'recomendación', hecho: 'Raymond James rebaja a «market perform»; Mizuho inicia con 355 USD; JPMorgan mantiene infraponderar (415) [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-01-27', tipo: 'resultados', hecho: 'Resultados del 4T26 y guía 2027, hacia finales de enero (estimación propia por el calendario de 2026: 27-ene) [6].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-01-27',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sube un 20,4 % en un mes y un 43 % desde el mínimo de mayo, con tendencia alcista (20 % sobre la media de 200 sesiones); no salta ningún aviso P1-P5. La subida tiene causa conocida y propia: el 3T26 batió al consenso y subió la guía. No hay hechos pendientes ajenos al análisis que puedan mover el precio más de un 5 % en contra: ni colocaciones, ni ampliaciones, ni litigios con fecha; el cobro de Xylem es a favor y ya está en el puente. La venta avisada del director financiero es de opciones ejercidas. Veredicto: no cambia [1, 3, 6, 19].',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierre[a], ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2021' })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Seis compañías en dos grupos: software vertical cotizado en Norteamérica (Constellation Software, Tyler, Veeva e Intuit) y conglomerados de nicho con gestión descentralizada y compras (AMETEK y Fortive) [9-12]. Roper está entre los dos: 78 % software, 22 % productos. Añadimos Descartes (software logístico, comparable de DAT). Excluimos Danaher (salud) y Topicus/Lumine (filiales de Constellation). Las cifras de Tyler, Descartes, Constellation, Veeva e Intuit vienen de los informes del repo del 10 y 14-oct con MarketScreener; las de AMETEK y Fortive, de MarketScreener a 13-oct, con el EBITDA y el BPA del mismo proveedor. Todas se han llevado al cierre del 23-oct con el precio de Yahoo (el software ha subido un 9-13 % desde entonces; AMETEK ha bajado un 4 %), con la deuda neta y las estimaciones constantes. El PER de los comparables mezcla bases (GAAP y ajustado): solo entra en el alcista de la regla.',
    empresas: [
      { nombre: 'Constellation Software', ticker: 'CSU', pais: 'CA', capitalizacion: 44603, ev_ventas: 4.2, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: 12.5, per_ntm: 34.8, crecimiento_pct: 23.5, margen_ebitda_pct: 27.6, roic_pct: 21.7, dn_ebitda: 1.3, fcf_yield_pct: 5.4 },
      { nombre: 'Tyler Technologies', ticker: 'TYL', pais: 'US', capitalizacion: 13496, ev_ventas: 5.73, ev_ebitda_ltm: 26.2, ev_ebitda_ntm: 22.2, per_ntm: 33.2, crecimiento_pct: 9.8, margen_ebitda_pct: 21.4, roic_pct: 7.4, dn_ebitda: 0.9, fcf_yield_pct: 4.4 },
      { nombre: 'Veeva Systems', ticker: 'VEEV', pais: 'US', capitalizacion: 48773, ev_ventas: 12.01, ev_ebitda_ltm: 38.8, ev_ebitda_ntm: null, per_ntm: 29.8, crecimiento_pct: 14.6, margen_ebitda_pct: 30.9, roic_pct: null, dn_ebitda: -6.8, fcf_yield_pct: 3.4 },
      { nombre: 'Intuit', ticker: 'INTU', pais: 'US', capitalizacion: 80906, ev_ventas: 3.91, ev_ebitda_ltm: 12.8, ev_ebitda_ntm: 9.9, per_ntm: 14.5, crecimiento_pct: 9.2, margen_ebitda_pct: 30.6, roic_pct: 20.3, dn_ebitda: 0.45, fcf_yield_pct: 10.7 },
      { nombre: 'AMETEK', ticker: 'AME', pais: 'US', capitalizacion: 57530, ev_ventas: 8.0, ev_ebitda_ltm: 25.2, ev_ebitda_ntm: 22.2, per_ntm: 30.7, crecimiento_pct: 14.0, margen_ebitda_pct: 31.9, roic_pct: null, dn_ebitda: 0.8, fcf_yield_pct: 2.9 },
      { nombre: 'Fortive', ticker: 'FTV', pais: 'US', capitalizacion: 17746, ev_ventas: 4.95, ev_ebitda_ltm: 16.7, ev_ebitda_ntm: 15.1, per_ntm: 26.6, crecimiento_pct: 4.5, margen_ebitda_pct: 29.6, roic_pct: null, dn_ebitda: 2.3, fcf_yield_pct: 5.5 },
      { nombre: 'Descartes Systems', ticker: 'DSG', pais: 'CA', capitalizacion: 7082, ev_ventas: 8.58, ev_ebitda_ltm: 20.1, ev_ebitda_ntm: 17.1, per_ntm: 32.3, crecimiento_pct: 12.3, margen_ebitda_pct: 42.3, roic_pct: 10.2, dn_ebitda: -1.18, fcf_yield_pct: 4.3 },
    ].map(escalar),
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'Weave Communications (software vertical para clínicas)', comprador: 'Francisco Partners', ev: null, ev_ventas: 2.27, ev_ebitda: null, prima_pct: 34, excluir: false, comentario: 'Prima del 34 %; EV/ventas de 12 meses [8].' },
      { fecha: '2025-08', objetivo: 'MeridianLink (software vertical de préstamos)', comprador: 'Centerbridge Partners', ev: 1856, ev_ventas: null, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: 'EV/EBITDA ajustado de 12 meses [7].' },
      { fecha: '2024-08', objetivo: 'NCR Digital Banking', comprador: 'Veritas Capital', ev: null, ev_ventas: null, ev_ebitda: 15.8, prima_pct: null, excluir: false, comentario: 'EV/EBITDA ajustado de 12 meses calculado por Centerview [7].' },
      { fecha: '2022-08', objetivo: 'Computer Services, Inc. (software para bancos)', comprador: 'Centerbridge Partners', ev: null, ev_ventas: null, ev_ebitda: 15.1, prima_pct: null, excluir: false, comentario: 'Centerview [7].' },
      { fecha: '2022-05', objetivo: 'Black Knight (software hipotecario)', comprador: 'Intercontinental Exchange', ev: null, ev_ventas: null, ev_ebitda: 21.4, prima_pct: null, excluir: false, comentario: 'Oferta inicial; Centerview [7].' },
      { fecha: '2021-12', objetivo: 'Bottomline Technologies (software de pagos)', comprador: 'Thoma Bravo', ev: null, ev_ventas: null, ev_ebitda: 26.6, prima_pct: null, excluir: false, comentario: 'Centerview [7].' },
      { fecha: '2021-02', objetivo: 'CoreLogic (datos y software inmobiliario)', comprador: 'Stone Point e Insight', ev: null, ev_ventas: null, ev_ebitda: 13.1, prima_pct: null, excluir: false, comentario: 'Centerview [7].' },
      { fecha: '2026-05', objetivo: 'Indicor Instrumentation (participada de Roper)', comprador: 'AMETEK', ev: 5000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Instrumentación industrial, no software; sin múltiplo publicado. Roper cobró 1.239 M en el 3T26 [6, 13].' },
      { fecha: '2026-08', objetivo: 'Cornell Pump y Roper Pump (Indicor)', comprador: 'Xylem', ev: 1460, ev_ventas: 5.6, ev_ebitda: 11.6, prima_pct: null, excluir: true, comentario: 'Bombas industriales, no software: 11,6x el EBITDA 2026e después de sinergias y ventajas fiscales; ventas de más de 260 M. Roper espera ~600 M antes de impuestos [17, 18].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: feed de artículos y noticias de ROP (jul-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://seekingalpha.com/api/sa/combined/ROP.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $ROP (jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://api.stocktwits.com/api/2/streams/symbol/ROP.json' },
  { id: 3, titulo: 'Roper Technologies: A Cautious Buy Despite The Risks', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-08-23', url: 'https://seekingalpha.com/article/4939467-roper-technologies-cautious-buy-despite-the-risks' },
  { id: 4, titulo: "Roper Technologies' $3.2 Billion Bet On Itself Looks Smart", editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-08-20', url: 'https://seekingalpha.com/article/4938770-roper-technologies-3-2-billion-bet-on-itself-look' },
  { id: 5, titulo: 'Roper Technologies: Another Good Quarter Should Power More Gains', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-10-22', url: 'https://seekingalpha.com/article/4956657-roper-technologies-another-good-quarter-should-power-more-gains' },
  { id: 6, titulo: 'Roper Stock Has Lost 38% From Its Highs: Is the Selloff a Buying Opportunity in 2026?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.tikr.com/blog/roper-stock-has-lost-38-from-its-highs-is-the-selloff-a-buying-opportunity-in-2026' },
];
const E = {
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($ROP)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Tras el 22-oct los mensajes resumen el 3T26 y la guía elevada y algunos dicen que la acción ha cerrado parte de la distancia a su valor razonable; a principios de octubre dominaban los mensajes técnicos bajistas (media de 200 sesiones a la baja) [2].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 20, tono: 'Positivo', resumen: 'Un artículo del 22-oct defiende que «otro buen trimestre» debería traer más subidas; los titulares hablan de subida del 10 % por el BPA y la guía [1, 5].' },
      { plataforma: 'Seeking Alpha (artículos de agosto)', fecha: '2026-08', n_comentarios: 25, tono: 'Positivo', resumen: 'Dos artículos ven la recompra de 3.200 M como una buena apuesta y la acción como «compra prudente» pese a los riesgos [3, 4].' },
      { plataforma: 'TIKR (blog con comentarios)', fecha: '2026-07', n_comentarios: 10, tono: 'Dividido', resumen: 'Se pregunta si la caída del 38 % es oportunidad; destaca la capacidad de 6.000 M para compras o recompras frente al miedo a la IA [6].' },
    ],
    temas: [
      { tema: 'Batida y guía elevada del 3T26', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: orgánico del 7 % y BPA ajustado por encima de la guía; pero las ventas quedaron en línea y la caja libre del trimestre bajó un 4 % [1, 5].' },
      { tema: 'La IA se come el software vertical', postura: 'Dividida', peso: 'Medio', contraste: 'Las cifras aún no lo muestran (software recurrente +8 % orgánico, retención bruta a mediados del 90 %); el riesgo es de múltiplo y a 3-5 años, no de resultados hoy.' },
      { tema: 'Recompra y uso de la caja', postura: 'Alcista', peso: 'Medio', contraste: 'La recompra se paró en el 3T26 para comprar empresas: el argumento de agosto pierde fuerza [3, 4].' },
      { tema: 'Análisis técnico', postura: 'Dividida', peso: 'Bajo', contraste: 'No entra en la valoración; la tendencia ha pasado de bajista a alcista en un mes.' },
    ],
    lectura: 'El sentimiento de los particulares ha pasado de dividido a positivo en un mes, al ritmo del precio (+20 %): tras el 22-oct domina la lectura de «batida y subida de guía» y desaparecen los mensajes técnicos bajistas. No hay euforia: nadie aporta datos nuevos sobre la IA y los analistas siguen repartidos (7 comprar, 9 mantener, 3 vender). Lo único que aporta a la decisión es que parte de la mejora ya está en el precio.',
    confianza: 'Media',
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas');
