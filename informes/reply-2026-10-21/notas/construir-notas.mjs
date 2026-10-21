// Escribe las notas A-E de Reply S.p.A. (corte 2026-10-21) a partir de los documentos de notas/docs (informes anuales ESEF
// 2023 y 2025, informes en inglés 2019/2021/2024, semestral 2026, trimestrales, transcripciones, gobierno, remuneración, junta),
// del XBRL ESEF (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json y yahoo-financieros.json (Yahoo, 21-oct-2026, 10:34 UTC)
// y de prensa (Milano Finanza, Teleborsa, Websim, Money.it, Forbes.it, Corriere Comunicazioni). Cada nota cita solo con [n]
// de su propia lista de fuentes.
// Ejecutar: node informes/reply-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const YF = lee('yahoo-financieros.json');
const RC = 'https://www.reply.com/contents';
const ESEF25 = 'https://filings.xbrl.org/815600DAEFB0388F3521/2025-12-31/ESEF/IT/0/815600DAEFB0388F3521-2025-12-31-1-it/reports/815600DAEFB0388F3521-2025-12-31-1-it.html';
const ESEF23 = 'https://filings.xbrl.org/815600DAEFB0388F3521/2023-12-31/ESEF/IT/0/815600DAEFB0388F3521-2023-12-31-it/reports/815600DAEFB0388F3521-2023-12-31-it.html';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Relazione finanziaria annuale 2025 (ESEF): cuentas consolidadas, segmentos (Region 1-3), contratos a precio fijo, deuda, earn-out, litigios y secuestro preventivo, auditoría', editor: 'Reply S.p.A. (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-12', url: ESEF25 },
  { id: 2, titulo: 'Half-Year Financial Report at 30 June 2026 (cuenta del semestre y del 2T, balance, acciones propias, earn-out, TFR)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RC}/Half_year_Financial_Report_2026.pdf` },
  { id: 3, titulo: 'Annual Financial Report 2024 (cuentas 2024 y 2023, compra de Solirius, segmentos)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2025-03-13', url: `${RC}/REP25_Bilancio_ENG_2024.pdf` },
  { id: 4, titulo: 'Relazione finanziaria annuale 2023 (ESEF): cuentas 2023 y 2022', editor: 'Reply S.p.A. (filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-03-14', url: ESEF23 },
  { id: 5, titulo: 'Annual Reports 2021 y 2019 (cuentas 2019-2021, BPA y dividendos tras el desdoblamiento de 2017)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2022-03-15', url: `${RC}/2021_REPLY_Annual_Report_EN.pdf` },
  { id: 6, titulo: 'XBRL ESEF de Reply 2020-2025 (herramienta cuentas.mjs)', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://filings.xbrl.org/815600DAEFB0388F3521/' },
  { id: 7, titulo: 'Interim Management Reports at 30 September 2025 y at 31 March 2026 (trimestres)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-05-15', url: 'https://dam-media.reply.com/contents/Interim_Management_Report_at_31_March_2026-1.pdf' },
  { id: 8, titulo: 'Fourth Quarter 2025 Earnings Call: transcripción y material del director financiero (presión de tarifas, IA, T&M)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-03-12', url: `${RC}/Fourth_Quarter_2025_Earnings_Call_Supporting_Materials.zip` },
  { id: 9, titulo: 'Reply Earnings Call 2026 Q1 y Q2: transcripciones (tarifas, productividad, contratistas, clientes, FedTec)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RC}/Reply_Earnings_Call_2026_Q2_transcript.pdf` },
  { id: 10, titulo: 'Comunicato stampa: il CdA approva il progetto di bilancio 2025 (12-mar-2026)', editor: 'Reply S.p.A. (eMarket Storage)', tipo: 'Primaria', fecha: '2026-03-12', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-03/20260312_178698.pdf' },
  { id: 11, titulo: 'Reply: avvio del programma di acquisto di azioni proprie (fino a 3.607.950 azioni / 550 M EUR)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-04-09', url: 'https://www.reply.com/it/newsroom/financial-news/reply-launch-of-a-share-buyback-program-for-a-maximum-number-of-3607950-shares' },
  { id: 12, titulo: 'Reply, Intermonte alza target price con crescita più sostenuta e acquisizione negli USA (FedTec)', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.teleborsa.it/AMP/News/2026/07/31/reply-intermonte-alza-target-price-con-crescita-piu-sostenuta-e-acquisizione-negli-usa-167.html' },
];

// Cuenta por naturaleza [1, 3, 4, 5, 6]. EBITDA = el de la empresa (antes del ajuste de valor razonable de los earn-out, que la
// empresa pone bajo el EBITDA y dentro del resultado operativo); aquí el ajuste de los earn-out pasa al resultado financiero
// (no es explotación: es el cambio de estimación de un precio de compra), así que el EBIT = EBITDA − amortizaciones y el BAI y el
// beneficio son los publicados. coste_ventas = «Acquisti» (licencias y hardware para reventa).
const C = {
  2020: { ing: 1250.2, acq: 21.5, ebitda: 207.9, am: 42.4, bai: 162.1, imp: 37.8, min: 0.6, bn: 123.6, bpa: 3.30, dpa: 0.56, acc: 37.45, nr: null },
  2021: { ing: 1483.8, acq: 21.5, ebitda: 262.8, am: 48.4, bai: 213.3, imp: 60.9, min: 1.7, bn: 150.7, bpa: 4.03, dpa: 0.80, acc: 37.39, nr: null },
  2022: { ing: 1891.1, acq: 27.3, ebitda: 340.3, am: 58.6, bai: 268.7, imp: 76.5, min: 1.2, bn: 191.0, bpa: 5.13, dpa: 1.00, acc: 37.23, nr: null },
  2023: { ing: 2118.0, acq: 29.4, ebitda: 352.1, am: 75.2, bai: 271.6, imp: 83.1, min: 1.8, bn: 186.7, bpa: 5.01, dpa: 1.00, acc: 37.27, nr: null },
  2024: { ing: 2295.9, acq: 46.4, ebitda: 410.6, am: 84.9, bai: 313.2, imp: 99.5, min: 2.6, bn: 211.1, bpa: 5.65, dpa: 1.15, acc: 37.38, nr: 25.2 },
  2025: { ing: 2450.0, acq: 46.9, ebitda: 467.6, am: 89.4, bai: 369.7, imp: 117.1, min: 1.7, bn: 250.9, bpa: 6.73, dpa: 1.35, acc: 37.28, nr: -29.0 },
};
const DEUDA = { 2020: 30.6, 2021: 23.7, 2022: 97.8, 2023: 84.8, 2024: 68.5, 2025: 45.7 };
const CAPEX = { 2020: 16.4, 2021: 37.1, 2022: 41.8, 2023: 29.3, 2024: 56.8, 2025: 45.9 };
const anios = ['2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = anios.map((a) => {
  const c = C[a]; const ebit = r1(c.ebitda - c.am);
  return { periodo: a, ingresos: c.ing, coste_ventas: c.acq, gastos_generales: null, ebitda: c.ebitda, amortizaciones: c.am, ebit, resultado_financiero: r1(c.bai - ebit), bai: c.bai, impuestos: c.imp, minoritarios: c.min, beneficio_neto: c.bn, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: c.nr, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acc };
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => { const o = { ...b, deuda_financiera: DEUDA[b.periodo], existencias: 0, pasivos_contrato: null }; delete o.fin; return o; });
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => { const o = { ...f, capex: CAPEX[f.periodo], desinversiones: 0, emision_acciones: 0, recompras: f.recompras ?? 0 }; delete o.fin; return o; });

const trim = (p, ing, g, org, ebitda, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: org, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa: null, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas de 2020-2025 del XBRL ESEF comprobadas con los informes anuales (2025 y 2023 en italiano, 2024, 2021 y 2019 en inglés) y el semestral de 2026. El EBITDA es el de la empresa; el ajuste de valor razonable de los earn-out (que Reply pone entre el EBITDA y el EBIT) va al resultado financiero, por eso el EBIT y el resultado financiero difieren del XBRL (391,7 y −22,0 en 2025) y el BAI coincide. Ingresos = los de la cuenta NIIF (sin subvenciones públicas, que la empresa suma a sus «ingresos de gestión» desde el 3T25: 2.483,6 M en 2025).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2535.4, ebitda: 477.1, ebit: 404.6, beneficio_neto: 257.9, bpa: 6.97, dpa: 1.35, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -12.5 },
    cambios_perimetro: [
      { periodo: '2026', descripcion: 'Cyberis y Movar (Reino Unido, ciberseguridad e ingeniería; 8-9 M EUR en el 1T26) y FedTec LLC (EE. UU., defensa y administración federal; 14-jul-2026, precio no publicado, ≤ 2 % de las ventas de 2026) [2, 9, 12].' },
      { periodo: '2025', descripcion: 'Red Scientific (Reino Unido, defensa) y Root16 (EE. UU.); pagos por compras de 68,8 M EUR netos de la caja adquirida [1].' },
      { periodo: '2024', descripcion: 'Solirius (Reino Unido, sector público): valor de la operación de 117,7 M EUR con 60,0 M de fondo de comercio, consolidada desde octubre [3].' },
    ],
    comentario: 'Los ingresos pasaron de 1.250,2 M EUR en 2020 a 2.450,0 M en 2025 (TCAC del 14,4 %) y el EBITDA de la empresa de 207,9 a 467,6 M (17,6 %) [1, 5]. El crecimiento se ha frenado: +20,3 % en 2022, +12,0 % en 2023, +8,4 % en 2024 y +6,7 % en 2025, con el cuarto trimestre de 2025 en +5,2 % [1, 7]. En el primer semestre de 2026 los ingresos de gestión subieron un 7,4 % (1.311,9 M; 2T26 +8,7 %, orgánico +7,3 %) y el EBITDA un 4,3 % (233,2 M, margen del 17,8 % frente al 18,3 %) [2]. El EBITDA publicado de 2025 (+13,9 %) exagera la mejora: lleva 29,0 M de ingresos no recurrentes (liberación de una provisión de responsabilidad profesional de 24 M tras un acuerdo de 15 M cubierto por el seguro y 5 M de un fondo ligado al secuestro preventivo), y el de 2024 llevaba 25,2 M de gastos no recurrentes (la dotación de esa provisión y 1,2 M del secuestro) [1, 3]. Sin ellos el EBITDA fue de 435,8 M en 2024 (19,0 % de los ingresos NIIF) y de 438,6 M en 2025 (17,9 %): el margen subyacente bajó 1,1 puntos y el EBITDA subyacente creció un 0,6 % [1]. No recurrentes en el LTM (−12,5 M): la parte de 2025 que cae en el segundo semestre, estimación propia (29,0 menos 16,5 del 2T25).',
    ajustes: 'Partidas que distorsionan el beneficio [1, 2]: (1) ajuste de valor razonable de los earn-out, entre el EBITDA y el EBIT: +4,0 M en 2020, −5,1 en 2021, +3,8 en 2022, +15,9 en 2023, +4,7 en 2024, +13,4 en 2025 y −8,1 en el 1S26 (Solirius); aquí va en el resultado financiero; (2) no recurrentes dentro del EBITDA (2024 +25,2 de gasto, 2025 −29,0 de ingreso); (3) amortizaciones de 2025 con 19 M de deterioro del fondo de comercio de Francia (Region 3) [1]; (4) deterioros de participaciones en empresas emergentes (−20,0 M en 2024 y −8,5 M en 2025), bajo el EBIT y recurrentes; (5) diferencias de cambio: −14,1 M en 2025 frente a +3,6 M en 2024 [1]. El BPA publicado (6,73 EUR en 2025) es el que usa la regla a 12 meses; no hay BPA ajustado de la empresa. LTM: 2025 menos el 1S25 más el 1S26 (BPA LTM estimado = 6,73 − 3,34 + 3,58).',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      trim('3T24', 553.8, null, null, 95.0, null),
      trim('4T24', 630.9, null, null, 135.1, null),
      trim('1T25', 607.5, null, null, 105.3, null),
      trim('2T25', 613.7, null, null, 118.4, null),
      trim('3T25', 598.5, 8.1, null, 111.8, null),
      trim('4T25', 663.8, 5.2, null, 132.1, null),
      trim('1T26', 645.0, 6.2, 6.6, 112.0, null),
      trim('2T26', 667.0, 8.7, 7.3, 121.2, 'Superior'),
    ],
    ultima_presentacion: 'Ingresos de gestión y EBITDA de la empresa por trimestre [7, 2]; Reply no publica BPA trimestral. El 2T25 lleva ≈ 16,5 M de ingresos no recurrentes en el EBITDA y el 4T24 ≈ 35 M de gastos «otros» [3, 1]. En el 2T26 (30-jul-2026) los ingresos subieron un 8,7 % (orgánico +7,3 %) y el EBITDA 121,2 M (18,2 %), por encima de lo que esperaban Equita e Intermonte [2, 12]. La empresa no da guía numérica: «perspectivas positivas» y un tercer trimestre «en línea» según el consejero delegado [9]. En las conferencias de 2026 la dirección dijo que hay presión en las tarifas, que la productividad de la IA se usa para ganar cuota y no para subir el margen, que los contratistas bajaron del 19,2 % al 17 % de los ingresos, que los ingresos por empleado se mantienen en ≈ 153.000 EUR y que los 20 primeros clientes son ≈ 40 % de las ventas [9]. Los analistas preguntaron por el coste de los «tokens» de IA, por la caída del tiempo y materiales y por la recompra. Próximos resultados: 3T26, el 12-nov-2026.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026-2027 (corto plazo)', importe: 11.9 }, { anio: '2028-2031', importe: 27.9 }],
    liquidez: 'Caja de 512,8 M EUR y activos financieros corrientes de 69,1 M a 30-jun-2026, frente a 39,8 M de deuda bancaria (11,9 a corto) y 139,9 M de arrendamientos [2]. Líneas de Intesa Sanpaolo para compras y una hipoteca de Unicredit (34,5 M a 2031, edificio de Via De Sonnaz en Turín); covenants cumplidos [1].',
    rating: 'Sin calificación crediticia (no tiene bonos)',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Pagos aplazados por compras de filiales (earn-out) y opciones de venta de minoritarios: 114,4 M EUR en 2023, 109,6 en 2024, 45,3 en 2025 y 63,2 a 30-jun-2026 (55,3 de earn-out), sobre todo de Region 3 (Reino Unido) [1, 2]. Beneficios a empleados (TFR italiano): 118,7 M en 2025 y 83,0 M a 30-jun-2026 tras traspasar parte al fondo de tesorería del INPS [2]. Provisiones no corrientes de 22,7 M [1]. Secuestro preventivo de la Fiscalía de Milán (fraude informático, 2017-2019, servicios de valor añadido de telefonía móvil): provisión de 8 M rebajada a 2,9 M; la empresa no tiene imputada la responsabilidad administrativa (231/2001) [1]. La demanda de responsabilidad profesional se cerró en 2025 con un acuerdo de 15 M cubierto por el seguro [1].',
    comentario: 'Balance con caja neta: a 30-jun-2026 la caja y los activos financieros (581,9 M EUR) superan la deuda bancaria (39,8) y los arrendamientos (139,9): 402,0 M de posición financiera neta de gestión, frente a 643,0 M en marzo, tras pagar el dividendo (≈ 51 M) y ≈ 64 M de recompra [2]. Restando los earn-out (63,2) y el TFR después de impuestos, la caja neta ajustada es de ≈ 275 M. El circulante es alto, como en toda consultoría: clientes y activos de contrato de 875,6 M en 2025 (36 % de las ventas) frente a 179,8 M de proveedores [1]. El fondo de comercio (667,1 M) es el 45 % del patrimonio (1.487,8 M) [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 326,0 M EUR en 2025 y de 353,2 M en 2024, el 130 % del beneficio, aunque con mucha variación por el circulante (184,6 M en 2022) [1, 3]. La inversión es baja (45,9 M en 2025, 1,9 % de las ventas) y los pagos de arrendamientos rondan los 36 M al año [1]. Flujo libre después de arrendamientos: ≈ 244 M en 2025 (326,0 − 45,9 − 36,2). La caja se va a compras (68,8 M en 2025; 190,0 M en 2022), dividendos (45,0 M) y, desde abril de 2026, a la recompra: ≈ 64 M pagados en el 1S26 [1, 2, 11]. En el 1S26 el flujo operativo fue de 120,9 M (estacional: el segundo semestre cobra más) [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers S.p.A.', anios_auditor: 7, opinion: 'Favorable, sin salvedades, en 2025 (encargo 2019-2027) [1]',
    comentario: 'Cuentas limpias y conservadoras en el balance (caja neta, sin bonos), pero con partidas que mueven el beneficio: los ajustes de los earn-out (+13,4 M en 2025, −8,1 M en el 1S26), los no recurrentes dentro del EBITDA (−29,0 M en 2025 tras +25,2 M en 2024) y las subvenciones públicas que la empresa suma a sus «ingresos de gestión» desde el 3T25 (33,6 M en 2025) [1, 2]. La remuneración de los socios (82,9 M de «amministratori» en 2025, reparto de beneficios) va en el coste de personal y es variable: amortigua los años malos [1]. Investigación penal abierta (fraude informático, caso de servicios de valor añadido de TIM 2017-2019) con secuestro preventivo; provisión de 2,9 M [1].',
    senales: [
      { senal: 'No recurrentes dentro del EBITDA', nivel: 'Media', comentario: '+25,2 M de gasto en 2024 y −29,0 M de ingreso en 2025: el EBITDA publicado sube un 13,9 % y el subyacente un 0,6 % [1].' },
      { senal: 'Ajustes de los earn-out en el resultado operativo', nivel: 'Media', comentario: '+15,9 M en 2023, +13,4 M en 2025 y −8,1 M en el 1S26: estimaciones de la dirección sobre lo que se pagará por las compras [1, 2].' },
      { senal: 'Subvenciones en los ingresos de gestión', nivel: 'Baja', comentario: 'Desde el 3T25 la empresa suma subvenciones públicas a sus ingresos de gestión (33,6 M en 2025): crecimiento comparable algo mayor que el NIIF [1].' },
      { senal: 'Deterioros recurrentes de empresas emergentes', nivel: 'Baja', comentario: '−20,0 M en 2024 y −8,5 M en 2025 bajo el EBIT [1].' },
      { senal: 'Investigación penal con secuestro preventivo', nivel: 'Media', comentario: 'Fiscalía de Milán, fraude informático en servicios de valor añadido (2017-2019); provisión de 2,9 M y sin responsabilidad 231/2001 imputada [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo del ≈ 20 % del beneficio (1,35 EUR por acción de 2025, pagado el 20-may-2026) [1]. Compras pequeñas de especialistas, sobre todo en Reino Unido, Alemania y EE. UU., con pagos aplazados ligados a resultados (earn-out), e incubadora de empresas emergentes (≈ 290 sociedades; ≈ 40 creadas en 2026) [1, 9]. Primera recompra grande: anunciada el 9-abr-2026, del 13-abr al 23-oct-2026, hasta 3.607.950 acciones (9,6 % del capital) o 550 M EUR; a 30-jul-2026 la empresa tenía 1.083.192 acciones propias (2,9 %) [11, 2, 9]. La junta del 23-abr-2026 renovó la autorización hasta el 23-oct-2027 con los mismos límites [2].',
    adquisiciones: [
      { anio: '2022', objetivo: 'Varias compras (Reino Unido, Alemania, Italia)', importe: 190.0, ev_ebitda: null, financiacion: 'Caja y deuda bancaria', resultado: 'La deuda bancaria subió a 97,8 M; parte de los earn-out se revisaron después a la baja [4, 6].' },
      { anio: '2024', objetivo: 'Solirius Ltd (Reino Unido, sector público)', importe: 117.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de 60,0 M; earn-out ajustado en −8,1 M en el 1S26 (paga más de lo previsto) [3, 2].' },
      { anio: '2025', objetivo: 'Red Scientific (Reino Unido, defensa) y Root16 (EE. UU.)', importe: 68.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Importe = pagos netos de compras del año [1].' },
      { anio: '2026', objetivo: 'Cyberis y Movar (Reino Unido); FedTec LLC (EE. UU., defensa)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cyberis y Movar 8-9 M; FedTec sin precio publicado, ≈ 10 veces el EV/EBIT según Equita [2, 12].' },
    ],
    comentario: 'La asignación de capital ha sido buena durante dos décadas: crecimiento orgánico más compras pequeñas, sin ampliaciones (las acciones apenas cambian: 37,4 M) y con caja neta [1, 5]. Lo que ha empeorado es Region 3 (Reino Unido, Francia, Benelux): 19 M de deterioro de Francia en 2025 y margen EBITDA del 11 % frente al 21 % de Region 1 [1]. La recompra de 2026 es el cambio relevante: con la acción en mínimos (76,65 EUR en marzo), la empresa pasó de acumular caja a recomprar hasta 550 M (≈ 12 % de la capitalización) [11].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Region 1 (Italia, EE. UU., Brasil y otros)', descripcion: 'Sede y mayor parte del negocio; 82 % de los proyectos a precio fijo.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: 1341.2, resultado: 253.2 }, { periodo: '2024', ingresos: 1478.4, resultado: 294.2 }, { periodo: '2025', ingresos: 1594.1, resultado: 341.2 }] },
      { nombre: 'Region 2 (Alemania, Polonia y otros)', descripcion: 'Consultoría y sistemas en Alemania; 45 % a precio fijo.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: 428.6, resultado: 57.7 }, { periodo: '2024', ingresos: 469.7, resultado: 70.4 }, { periodo: '2025', ingresos: 473.6, resultado: 71.9 }] },
      { nombre: 'Region 3 (Reino Unido, Francia, Benelux y otros)', descripcion: 'Reino Unido (sector público, defensa, finanzas), Francia y Benelux; 48 % a precio fijo.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: 388.7, resultado: 41.2 }, { periodo: '2024', ingresos: 416.9, resultado: 46.1 }, { periodo: '2025', ingresos: 486.6, resultado: 54.4 }] },
      { nombre: 'Eliminaciones y subvenciones', descripcion: 'Ventas entre regiones y, en 2025, las subvenciones públicas que la empresa incluye en sus ingresos de gestión (33,6 M) y que no son ingresos NIIF.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: -40.5, resultado: 0 }, { periodo: '2024', ingresos: -69.1, resultado: -0.1 }, { periodo: '2025', ingresos: -104.3, resultado: 0.1 }] },
    ],
    geografias: [{ nombre: 'Italia', peso_pct: 49.4 }, { nombre: 'Alemania', peso_pct: 17.0 }, { nombre: 'Reino Unido', peso_pct: 13.0 }, { nombre: 'EE. UU.', peso_pct: 8.1 }, { nombre: 'Francia', peso_pct: 4.0 }, { nombre: 'Luxemburgo', peso_pct: 2.0 }, { nombre: 'Resto', peso_pct: 6.5 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ingresos de gestión (M EUR)', valor_anterior: '2.300,5', valor_actual: '2.483,6', variacion: '+8,0 %', comentario: '2025; NIIF 2.450,0 (+6,7 %); 1S26 +7,4 % [1, 2].' },
      { kpi: 'EBITDA subyacente (M EUR)', valor_anterior: '435,8', valor_actual: '438,6', variacion: '+0,6 %', comentario: 'Sin no recurrentes; margen del 19,0 % al 17,9 % de los ingresos NIIF [1].' },
      { kpi: 'Empleados', valor_anterior: '15.667', valor_actual: '16.624', variacion: '+6,1 %', comentario: '17.297 en junio de 2026 [1, 2].' },
      { kpi: 'Ingresos por empleado (miles EUR)', valor_anterior: '≈ 153', valor_actual: '≈ 153', variacion: '≈ 0 %', comentario: 'Estables gracias a la automatización, según la dirección (1T26) [9].' },
      { kpi: 'Contratistas sobre ingresos', valor_anterior: '19,2 %', valor_actual: '17 %', variacion: '−2,2 puntos', comentario: 'La IA sustituye primero a los subcontratistas [9].' },
      { kpi: 'Proyectos a precio fijo (Region 3)', valor_anterior: '36,0 %', valor_actual: '48,1 %', variacion: '+12,1 puntos', comentario: 'El grupo pasa de tiempo y materiales a precio cerrado [1].' },
    ],
    clientes: 'Ningún cliente supera el 10 % de los ingresos y los 20 primeros son ≈ 40 %, sin cambios en 2025-2026 [1, 8, 9]. Servicios financieros (bancos y seguros) son ≈ 30 % y ninguna otra industria supera el 20 % (telecomunicaciones, industria, energía, sector público, distribución) [9]. Por líneas: Technologies 60,3 %, Applications 29,9 % y Processes 9,8 % en 2025 [1]. Poder de precios en retroceso: el consejero delegado dijo en marzo de 2026 que «el mercado está deteriorando nuestras tarifas» y que la presión seguirá en 2026-2027 [8]. El 82 % de los proyectos de Region 1 son a precio fijo, lo que deja a Reply quedarse con parte del ahorro de la IA si lo entrega a precio cerrado [1].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'BPA trimestral y consenso de cada trimestre', tipo: 'Complemento', intentos: '1) informes trimestrales (solo ingresos, EBITDA, EBIT y BAI); 2) Yahoo (sin estimaciones trimestrales); 3) prensa (Equita/Intermonte: «por encima de lo esperado» sin cifra del consenso)', decision: 'Omitido; se usa el comentario de los analistas' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Relazione finanziaria annuale 2025 (ESEF): descripción del negocio, ofertas de IA, regiones, contratos', editor: 'Reply S.p.A. (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-12', url: ESEF25 },
  { id: 2, titulo: 'Anitec-Assinform: nel 2025 il mercato digitale in Italia raggiunge 84,4 miliardi (servicios ICT 18,8 mil M, +8,1 %; IA +47,6 %; previsión 2026-2029 +3,6 % anual)', editor: 'Affaritaliani (Anitec-Assinform)', tipo: 'Sectorial', fecha: '2026-07-01', url: 'https://www.affaritaliani.it/distretto-italia/anitec-assinform-nel-2025-il-mercato-digitale-in-italia-raggiunge-844-miliardi-ecosistema-ict-con-oltre-132mila-imprese-e-piu-di-638mila-addetti.html' },
  { id: 3, titulo: 'Gartner Estimates Worldwide IT Spending at $6.31T for 2026 (servicios de TI ≈ 1,87 billones USD)', editor: 'Campus Technology (Gartner)', tipo: 'Sectorial', fecha: '2026-05-20', url: 'https://campustechnology.com/articles/2026/05/20/gartner-estimates-worldwide-it-spending-at-6-31t-for-2026.aspx' },
  { id: 4, titulo: 'Fichas de competidores (ventas, márgenes, crecimiento, caja y deuda; últimos doce meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Reply Earnings Call 2026 Q1 y Q2 y 2025 Q4: transcripciones (tarifas, IA, contratistas, clientes)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RC}/Reply_Earnings_Call_2026_Q2_transcript.pdf` },
  { id: 6, titulo: 'Reply, doppio taglio del target price: Berenberg ed Equita abbassano le stime, colpa dell’AI', editor: 'Milano Finanza', tipo: 'Prensa', fecha: '2025-11-17', url: 'https://www.milanofinanza.it/news/reply-doppio-taglio-del-target-price-berenberg-e-equita-abbassano-le-stime-colpa-dell-ai-202511171131106771' },
  { id: 7, titulo: 'Titoli IT indiani in calo, crescono i timori per il nuovo strumento di IA di Anthropic', editor: 'Forbes Italia', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://forbes.it/2026/02/04/titoli-it-indiani-in-calo-crescono-i-timori-per-il-nuovo-strumento-di-ia-di-anthropic' },
  { id: 8, titulo: 'Annual Financial Report 2024 y Annual Report 2019 (historia, regiones, fundadores)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2025-03-13', url: `${RC}/REP25_Bilancio_ENG_2024.pdf` },
];
const fx = 1.1215; // USD por EUR, BCE 20-oct-2026
const yc = (t) => { const f = YF[t]; return { ing: Math.round(f.rev / 1e6 / (f.fx === 'USD' ? fx : 1)), m: r1(f.op * 100) }; };
const B_ = {
  _estado: 'Completa. Sin ficha sectorial previa de consultoría tecnológica: perímetro y tamaño de Anitec-Assinform (Italia) y Gartner (mundo); comparables con Yahoo (21-oct-2026).',
  sector: {
    definicion: 'Mercado relevante: los servicios de tecnología de la información para empresas y administraciones (consultoría, integración de sistemas, desarrollo de aplicaciones, nube, datos, ciberseguridad e IA) en Italia, Alemania y Reino Unido, donde Reply hace el 79 % de sus ventas [1]. Se mide con el mercado italiano de servicios ICT de Anitec-Assinform (18.800 M EUR en 2025, +8,1 %), porque Italia es la mitad de las ventas; el de Alemania y Reino Unido no tiene una fuente gratuita equivalente [2]. Fuera del perímetro: software y hardware (Reply revende poco: las compras son el 1,9 % de las ventas) y la externalización de procesos de bajo coste [1].',
    tamano: '≈ 18.800 M EUR de servicios ICT en Italia en 2025 (Anitec-Assinform); ≈ 1,87 billones USD de servicios de TI en el mundo en 2026 (Gartner) [2, 3]',
    unidad_serie: 'millones de EUR (servicios ICT en Italia, Anitec-Assinform; 2024 deducido del crecimiento del 8,1 %)',
    serie: [{ anio: '2024', tamano: 17391 }, { anio: '2025', tamano: 18800 }],
    tcac_historico_pct: 8.1, tcac_previsto_pct: 3.6, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'IA generativa y agentes', efecto: '+/−', horizonte: 'Estructural', evidencia: 'El mercado de IA en Italia creció un 47,6 % en 2025 (1.380 M EUR) [2]; a la vez baja las horas por proyecto: «con la IA se hace más con menos gente, pero el volumen de cada proyecto es menor» (consejero delegado, marzo de 2026) [5].' },
      { driver: 'Nube, datos y modernización de sistemas heredados', efecto: '+', horizonte: 'Estructural', evidencia: 'Technologies es el 60 % de las ventas de Reply; la migración y la modernización con IA es el mayor motor de 2026 según la dirección [1, 5].' },
      { driver: 'Ciberseguridad, defensa y sector público', efecto: '+', horizonte: 'Estructural', evidencia: 'Compras de Red Scientific, Cyberis y FedTec y gasto de defensa europeo al alza [1, 5].' },
      { driver: 'Gasto tecnológico de las empresas europeas', efecto: '−', horizonte: 'Cíclico', evidencia: 'La industria alemana y la automoción frenan: Region 2 creció un 0,8 % en 2025 [1]; previsión del mercado digital italiano de +3,6 % anual en 2026-2029 frente a +8,1 % de los servicios ICT en 2025 [2].' },
      { driver: 'Presión en las tarifas', efecto: '−', horizonte: 'Cíclico', evidencia: '«El mercado está deteriorando nuestras tarifas… espero que la presión siga al menos en 2026 y 2027» (marzo de 2026) [5].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Mercado fragmentado con consultoras globales (Accenture, Capgemini, Deloitte), indias de bajo coste y cientos de locales; márgenes operativos del 4-11 % en los cotizados frente al 15,7 % de Reply [4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes bancos, aseguradoras y telecos con departamentos de compras; ninguno supera el 10 % de las ventas de Reply y los 20 primeros suman ≈ 40 % [1, 5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El recurso es el talento (personal = 56 % de las ventas); hiperescaladores y laboratorios de IA (AWS, Microsoft, Google, OpenAI, Anthropic) son socios, pero también fijan el precio de los «tokens» [1, 5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras bajas en proyectos pequeños; altas en grandes clientes por referencias, acreditaciones de los hiperescaladores y confianza [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Herramientas de IA que escriben código y automatizan pruebas y mantenimiento (agentes de Anthropic, OpenAI, GitHub) sustituyen horas de consultoría; el temor movió a todo el sector en febrero de 2026 [7].' },
    ],
    ciclo: { posicion: 'Desaceleración', comentario: 'El gasto en servicios de TI depende del ciclo de inversión de las empresas: Reply creció un 20 % en 2022 y un 7 % en 2025 [1]. En 2025-2026 la industria alemana y la automoción frenan y la IA hace que los clientes esperen proyectos más baratos; a la vez, la banca italiana, la defensa y el sector público siguen invirtiendo [1, 5]. El mercado italiano de servicios ICT creció un 8,1 % en 2025, pero el conjunto digital se prevé al 3,6 % anual hasta 2029 [2].' },
    regulacion: 'Sin regulación sectorial específica. Le afectan la Ley de IA de la UE (obligaciones para sistemas de alto riesgo que Reply construye para clientes), NIS2 y DORA (ciberseguridad y resiliencia digital de la banca: más demanda), el PNRR italiano (fondos de digitalización hasta 2026) y las normas laborales italianas (TFR) [1].',
    tendencias: 'Tres tendencias: (1) la IA pasa de pruebas a producción, con agentes que escriben y mantienen código: más demanda de integración, pero menos horas por proyecto [1, 5]; (2) el tiempo y materiales se sustituye por precio cerrado y por resultados: el consejero delegado espera que «casi desaparezca» [5]; (3) las grandes consultoras compran especialistas de nube, datos y ciberseguridad y los hiperescaladores ganan peso en el canal [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 6.4, posicion: 'Una de las mayores consultoras tecnológicas de capital italiano: ≈ 6,4 % de los servicios ICT de Italia (estimación propia: ventas en Italia de ≈ 1.210 M EUR sobre 18.800 M) [1, 2]; nicho en Alemania y Reino Unido',
    competidores: [
      { nombre: 'Accenture', pais: 'Irlanda', ticker: 'ACN', ingresos: yc('ACN').ing, cuota_pct: null, margen_ebit_pct: yc('ACN').m, comentario: 'Líder mundial; en Italia es el rival principal en banca y grandes cuentas [4].' },
      { nombre: 'Capgemini', pais: 'Francia', ticker: 'CAP.PA', ingresos: yc('CAP.PA').ing, cuota_pct: null, margen_ebit_pct: yc('CAP.PA').m, comentario: 'Rival en Europa continental; compró WNS en 2025 [4].' },
      { nombre: 'Sopra Steria', pais: 'Francia', ticker: 'SOP.PA', ingresos: yc('SOP.PA').ing, cuota_pct: null, margen_ebit_pct: yc('SOP.PA').m, comentario: 'Consultora europea con peso en sector público y banca [4].' },
      { nombre: 'Engineering Ingegneria Informatica (privada)', pais: 'Italia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor rival italiano en administración pública e industria; propiedad de fondos [1].' },
      { nombre: 'Sesa', pais: 'Italia', ticker: 'SES.MI', ingresos: yc('SES.MI').ing, cuota_pct: null, margen_ebit_pct: yc('SES.MI').m, comentario: 'Distribución y servicios de TI en Italia, más reventa y menos margen [4].' },
      { nombre: 'adesso', pais: 'Alemania', ticker: 'ADN1.DE', ingresos: yc('ADN1.DE').ing, cuota_pct: null, margen_ebit_pct: yc('ADN1.DE').m, comentario: 'Rival directo en Alemania (Region 2) [4].' },
      { nombre: 'EPAM Systems', pais: 'EE. UU.', ticker: 'EPAM', ingresos: yc('EPAM').ing, cuota_pct: null, margen_ebit_pct: yc('EPAM').m, comentario: 'Ingeniería de software con equipos en Europa del Este; el más expuesto a la IA [4].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red de ≈ 290 sociedades especializadas comparte clientes y conocimiento, pero no hay red de usuarios [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Relaciones de décadas con la banca y las telecos italianas; los 20 primeros clientes, estables en ≈ 40 % [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Acreditaciones de primer nivel con AWS, Microsoft, Google y Salesforce y asociaciones con OpenAI y Anthropic; plataformas propias (Silicon Shoring, Model Factory) [1, 5].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen operativo del 15,7 % frente al 4-11 % de los rivales europeos, por mezcla de proyectos a precio fijo y equipos en Italia [4].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado fragmentado: no hay nichos que solo quepan para uno [2].' },
      ],
    },
    amenazas: 'La mayor amenaza es la IA que abarata el trabajo por horas: el código, las pruebas y el mantenimiento que facturan las consultoras pueden hacerlo agentes, y los clientes lo saben [5, 7]. Reply responde vendiendo esa misma IA (agentes, migraciones, Model Factory) y pasando a precio fijo, y hasta ahora mantiene el crecimiento (+7,4 % en el 1S26), pero con tarifas a la baja y margen subyacente que retrocede [5]. Segunda: las grandes consultoras y los hiperescaladores en las cuentas grandes. Tercera: la debilidad de la industria alemana (Region 2).',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Reply es una consultora tecnológica italiana con sede en Turín: diseña, construye y mantiene sistemas informáticos para grandes empresas y administraciones (nube, datos, IA, ciberseguridad, aplicaciones de gestión, comercio digital, Internet de las cosas) [1]. Trabaja con una red de ≈ 290 sociedades pequeñas y especializadas y 17.297 empleados (junio de 2026), con el 49 % de las ventas en Italia, el 17 % en Alemania y el 13 % en Reino Unido [1]. La fundó Mario Rizzante en 1996 y su familia la controla [8].',
    como_gana_dinero: 'Cobra por proyectos: el 70 % a precio fijo (82 % en Italia) y el resto por tiempo y materiales [1]. Gana la diferencia entre lo que factura y el coste de sus consultores (personal, 56 % de las ventas) y subcontratistas (servicios, 26 %); el margen EBITDA ronda el 18 % y el operativo el 15-16 %, el doble que la media europea del sector, por la mezcla de proyectos a precio fijo y la menor dependencia de subcontratas [1, 4]. Technologies (nube, datos, IA) es el 60 % de las ventas, Applications (aplicaciones de gestión) el 30 % y Processes (consultoría de procesos) el 10 % [1]. Apenas necesita inversión fija (1,9 % de las ventas) pero sí circulante (clientes del 36 % de las ventas).',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de servicios de TI en Alemania y Reino Unido y CR5 de Italia', tipo: 'Complemento', intentos: '1) Bitkom y TechUK (sin cifra gratuita de servicios); 2) Gartner (solo total mundial); 3) Anitec-Assinform (sin cuotas por empresa)', decision: 'Se usa Italia como perímetro y la cuota es estimación propia' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Report on Corporate Governance and Ownership Structure 2025 (consejo, comisiones, voto aumentado, accionistas)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-03-12', url: `${RC}/REPLY_Relazione_Governo_Societario_2025_ENG.pdf` },
  { id: 2, titulo: 'Report on Remuneration Policy and Compensation Paid 2025', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-03-12', url: `${RC}/REPLY_Relazione_Remunerazione_e_Compensi_2025_ENG.pdf` },
  { id: 3, titulo: 'Concise report of voting on the agenda, junta del 23-abr-2026', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-04-28', url: `${RC}/Concise_Report_of_voting_on_Agenda_EN.pdf` },
  { id: 4, titulo: 'Relazione finanziaria annuale 2025 (ESEF): partes vinculadas, remuneración de consejeros (nota 40), litigios', editor: 'Reply S.p.A. (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-12', url: ESEF25 },
  { id: 5, titulo: 'Annual Financial Report 2024 (biografías del consejo)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2025-03-13', url: `${RC}/REP25_Bilancio_ENG_2024.pdf` },
  { id: 6, titulo: 'Relazioni illustrative del CdA alla junta de 2026 (autorización de recompra, política de remuneración)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-03-20', url: `${RC}/REPLY_Relazioni_Illustrative_Consiglio_Amministrazione_2026_ENG.pdf` },
  { id: 7, titulo: 'TIM e il caso del sequestro dei 250 milioni dopo 5 anni dai fatti (servicios de valor añadido; Reply entre los proveedores)', editor: 'Corriere Comunicazioni', tipo: 'Prensa', fecha: '2024', url: 'https://www.corrierecomunicazioni.it/telco/tim-e-il-caso-del-sequestro-dei-250-milioni-dopo-5-anni-dai-fatti/' },
  { id: 8, titulo: 'Half-Year Financial Report at 30 June 2026 (acciones propias, recompra)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RC}/Half_year_Financial_Report_2026.pdf` },
];
const C_ = {
  _estado: 'Completa. Gobierno, remuneración y votos de la junta del 23-abr-2026 de fuente primaria. Operaciones de directivos (internal dealing) no revisadas una a una: el registro de la empresa no se pudo abrir.',
  directivos: {
    equipo: [
      { nombre: 'Mario Rizzante', cargo: 'Fundador, presidente y consejero delegado', desde: '1996', participacion_pct: 37.08, trayectoria: 'Informático; fundó Reply en 1996 y la dirige desde entonces. Controla Alika S.r.l. (37,08 % del capital y ≈ 63 % de los votos) a través de Iceberg [5, 1].' },
      { nombre: 'Tatiana Rizzante', cargo: 'Consejera delegada', desde: '1996', participacion_pct: null, trayectoria: 'Ingeniera informática y cofundadora; lleva la estrategia internacional y preside el comité de sostenibilidad [5].' },
      { nombre: 'Filippo Rizzante', cargo: 'Consejero ejecutivo y director de tecnología', desde: '1999', participacion_pct: null, trayectoria: 'Lleva la oferta tecnológica y las alianzas con hiperescaladores y laboratorios de IA [5].' },
      { nombre: 'Marco Cusinato', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Ingeniero informático; antes jefe de proyecto en Cluster Reply (IoT y nube) [5].' },
      { nombre: 'Elena Maria Previtera', cargo: 'Consejera ejecutiva', desde: null, participacion_pct: null, trayectoria: 'Socia ejecutiva: supervisa las sociedades tecnológicas del grupo, CRM y experiencia de cliente [5].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Sin guía numérica: «perspectivas positivas»', real: 'Ingresos +27 % (1.891 M EUR)', cumplida: 'Sí' },
      { anio: '2023', guia: 'Sin guía numérica: crecimiento', real: 'Ingresos +12 %; BPA −2 %', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Sin guía numérica: crecimiento', real: 'Ingresos +8,4 %; BPA +13 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'Sin guía numérica: crecimiento', real: 'Ingresos +6,7 %; EBITDA subyacente +0,6 %; BPA +19 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo fundador con treinta años al frente: de una empresa de Turín en 1996 a 2.450 M EUR de ventas, siempre con beneficio y caja neta [4, 5]. No da guía numérica, lo que impide medir su credibilidad con cifras; sus mensajes de 2025-2026 han sido francos sobre la presión de las tarifas y el efecto de la IA. El riesgo es la sucesión y la dependencia de la familia: presidente y consejero delegado es el fundador (≈ 70 años) y la otra consejera delegada es Tatiana Rizzante; el CFO viene de dentro [5].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Mario Rizzante', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '1996', comisiones: 'Comité de ética de la IA' },
      { nombre: 'Tatiana Rizzante', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '1996', comisiones: 'Sostenibilidad (presidenta); ética de la IA' },
      { nombre: 'Filippo Rizzante', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: null, comisiones: '—' },
      { nombre: 'Marco Cusinato', cargo: 'Consejero ejecutivo (director financiero)', tipo: 'Ejecutivo', desde: null, comisiones: '—' },
      { nombre: 'Elena Maria Previtera', cargo: 'Consejera ejecutiva', tipo: 'Ejecutivo', desde: null, comisiones: '—' },
      { nombre: 'Daniele Angelucci', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: 'Remuneración; Control y Riesgos' },
      { nombre: 'Patrizia Polliotto', cargo: 'Consejera coordinadora independiente', tipo: 'Independiente', desde: null, comisiones: 'Control y Riesgos (presidenta); partes vinculadas' },
      { nombre: 'Secondina Giulia Ravera', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Remuneración; Sostenibilidad' },
      { nombre: 'Domenico Siniscalco', cargo: 'Consejero (lista de inversores)', tipo: 'Independiente', desde: null, comisiones: 'Remuneración (presidente); Sostenibilidad' },
      { nombre: 'Federico Ferro-Luzzi', cargo: 'Consejero (lista de inversores)', tipo: 'Independiente', desde: null, comisiones: 'Control y Riesgos' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 76.9, voto_remuneracion_contra_pct: 22.9, voto_remuneracion_contra_libre_pct: 91.0, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.55, fijo: 0.85, variable_corto: 0.70, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'Mario Rizzante cobró 1,55 M EUR en 2025 (0,85 fijo y 0,70 de participación en beneficios) y Tatiana Rizzante 1,43 M (0,73 y 0,70); Filippo Rizzante 1,19 M, Elena Maria Previtera 1,08 M y Marco Cusinato 1,19 M; los directivos clave, 4,72 M en total [2]. El total de consejeros y directivos fue de 10,57 M [4]. Hay un plan a medio plazo 2023-2026 ligado al EBIT, la rentabilidad para el accionista, el flujo operativo y objetivos ESG, con cláusula de devolución [2]. Cifras modestas para el tamaño de la empresa. Pero en la junta del 23-abr-2026 la política obtuvo el 76,9 % a favor y el 22,9 % en contra, y el informe de retribuciones el 77,0 % y el 22,8 % [3]: como Alika vota a favor con ≈ 41,6 M de votos de 55,6 M presentes, el capital libre presente votó en contra en ≈ 91 % (12,7 M de ≈ 14,0 M de votos; estimación propia). Los inversores rechazan la política, sobre todo por el peso discrecional de la participación en beneficios y la falta de métricas a largo plazo claras.',
    accionistas: [
      { nombre: 'Alika S.r.l. (familia Rizzante; Iceberg tiene el 51 %)', pct: 37.08, tipo: 'Control', variacion: '13.872.740 acciones; ≈ 63-64 % de los votos con el voto aumentado desde el 30-sep-2025' },
      { nombre: 'Smallcap World Fund (Capital Group)', pct: 3.1, tipo: 'Institucional', variacion: 'Entre el 3,1 % y el 3,9 % según la fecha' },
      { nombre: 'Acciones propias', pct: 2.9, tipo: 'Autocartera', variacion: '1.083.192 a 30-jul-2026 (133.192 a fin de 2025) por la recompra [8]' },
      { nombre: 'Capital flotante', pct: 57, tipo: 'Libre', variacion: '≈ 60 % antes de la recompra' },
    ],
    insiders: [],
    control_y_defensas: 'La familia Rizzante controla Reply: Alika S.r.l. tiene el 37,08 % del capital y, con el voto aumentado (tres votos por acción desde el 30-sep-2025), ≈ 63-64 % de los votos de la junta [1, 3]. El voto aumentado blinda el control y hace imposible una opa hostil. El presidente es el fundador y consejero delegado; hay consejera coordinadora independiente y cuatro independientes de diez (dos elegidos por la lista de inversores institucionales) [1]. Las comisiones de Control y Riesgos y de Remuneración tienen mayoría de independientes y las presiden independientes [1]. Consejo elegido el 23-abr-2024 hasta la junta que apruebe las cuentas de 2026 [1].',
    alertas: [
      'Voto en contra de la remuneración del ≈ 91 % del capital libre presente en la junta de 2026 (22,9 % del total) [3].',
      'Voto aumentado (tres votos por acción) desde septiembre de 2025: la familia tiene ≈ 63 % de los votos con el 37 % del capital [1].',
      'Investigación penal de la Fiscalía de Milán (fraude informático, servicios de valor añadido de TIM 2017-2019) con secuestro preventivo a Reply S.p.A. [4, 7].',
      'Sucesión: el fundador (presidente y consejero delegado) sigue al frente; el consejo se renueva con las cuentas de 2026 (primavera de 2027) [1].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de directivos de los últimos 12 meses (internal dealing)', tipo: 'Complemento', intentos: '1) web de Reply, sección internal dealing (no abre); 2) eMarket Storage (sin listado navegable); 3) prensa (ninguna noticia de compras o ventas de los Rizzante en 12 meses)', decision: 'Omitido; insiders_sin_operaciones = false (no comprobado)' },
    { seccion: 'gobierno', campo: 'votos de remuneración de las juntas de 2024 y 2025', tipo: 'Complemento', intentos: '1) web de la junta (solo el acta de 2026 a mano); 2) informe de gobierno; 3) prensa', decision: 'Se usa la junta de 2026' },
  ],
  fuentes: fC,
};
guarda('C', C_);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de REY.MI, FTSE MIB y STOXX Europe 600 Technology (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/REY.MI/history' },
  { id: 2, titulo: 'Consenso de REY.MI y comparables (BPA y ventas 2026-2027, objetivos, recomendaciones; precio de la sesión del 21-oct a las 10:34 UTC): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/REY.MI/analysis' },
  { id: 3, titulo: 'Reply S.p.A. interim results: here’s what analysts are forecasting (11 analistas; ventas 2026 2.710 M; BPA 7,53; objetivo 153 EUR)', editor: 'Simply Wall St', tipo: 'Analistas', fecha: '2026-08-05', url: 'https://simplywall.st/stocks/it/software/bit-rey/reply-shares/news/reply-spa-bitrey-interim-results-heres-what-analysts-are-for' },
  { id: 4, titulo: 'Reply, Intermonte alza target price (195 EUR) con crescita più sostenuta e acquisizione negli USA', editor: 'Teleborsa', tipo: 'Analistas', fecha: '2026-07-31', url: 'https://www.teleborsa.it/AMP/News/2026/07/31/reply-intermonte-alza-target-price-con-crescita-piu-sostenuta-e-acquisizione-negli-usa-167.html' },
  { id: 5, titulo: 'Reply, Equita alza target price (130 EUR) con risultati sopra le attese e outlook incoraggiante', editor: 'Teleborsa', tipo: 'Analistas', fecha: '2026-07-31', url: 'https://www.teleborsa.it/AMP/News/2026/07/31/reply-equita-alza-target-price-con-risultati-sopra-le-attese-e-outlook-incoraggiante-111.html' },
  { id: 6, titulo: 'Reply, Deutsche Bank e Intesa Sanpaolo confermano Buy (140 y 155 EUR)', editor: 'Teleborsa', tipo: 'Analistas', fecha: '2026-08-03', url: 'https://www.teleborsa.it/AMP/News/2026/08/03/reply-deutsche-bank-e-intesa-sanpaolo-confermano-buy-183.html' },
  { id: 7, titulo: 'Reply, doppio taglio del target price: Berenberg (Hold, 150) ed Equita (150) abbassano le stime, colpa dell’AI', editor: 'Milano Finanza', tipo: 'Analistas', fecha: '2025-11-17', url: 'https://www.milanofinanza.it/news/reply-doppio-taglio-del-target-price-berenberg-e-equita-abbassano-le-stime-colpa-dell-ai-202511171131106771' },
  { id: 8, titulo: 'Rendimiento del Bund a 10 años (3,44 % el 21-oct-2026) y curva AAA del BCE', editor: 'Deutsche Bundesbank / BCE', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?lastNObservations=5&format=csv' },
  { id: 9, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 10, titulo: 'Movimiento del precio de REY.MI (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/REY.MI/history' },
  { id: 11, titulo: 'Titoli IT indiani in calo, crescono i timori per il nuovo strumento di IA di Anthropic (caída del sector del 3-feb-2026)', editor: 'Forbes Italia', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://forbes.it/2026/02/04/titoli-it-indiani-in-calo-crescono-i-timori-per-il-nuovo-strumento-di-ia-di-anthropic' },
  { id: 12, titulo: 'Reply cerca il riscatto (la acción en ≈ 97 EUR sin motivo concreto)', editor: 'Milano Finanza', tipo: 'Prensa', fecha: '2026-02-07', url: 'https://www.milanofinanza.it/news/reply-cerca-il-riscatto-2693874' },
  { id: 13, titulo: 'A Piazza Affari è scattato un segnale rialzista da +50 %: occhio al rally di Reply (−54 % de marzo de 2025 a marzo de 2026; la recompra como giro)', editor: 'Money.it', tipo: 'Prensa', fecha: '2026-05-19', url: 'https://www.money.it/a-piazza-affari-e-scattato-un-segnale-rialzista-da-50-occhio-al-rally-di-reply' },
  { id: 14, titulo: 'Comunicato stampa: bilancio 2025 (12-mar-2026, 13:47) y Fourth Quarter 2025 Earnings Call', editor: 'Reply S.p.A. (eMarket Storage)', tipo: 'Primaria', fecha: '2026-03-12', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-03/20260312_178698.pdf' },
  { id: 15, titulo: 'Reply: avvio del programma di acquisto di azioni proprie (9-abr-2026)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-04-09', url: 'https://www.reply.com/it/newsroom/financial-news/reply-launch-of-a-share-buyback-program-for-a-maximum-number-of-3607950-shares' },
  { id: 16, titulo: 'Mercati del Vecchio Continente chiudono all’insegna della cautela; titoli tech guardano ad Anthropic', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.teleborsa.it/DettaglioNews/225_2026-09-29_TLB/Mercati-del-Vecchio-Continente-chiudono-allinsegna-della-cauta-Titoli-tech-guardano-ad-Anthropic.html' },
  { id: 17, titulo: 'Financial calendar and events (3T26 el 12-nov-2026)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.reply.com/en/investors/financial-calendar-and-events' },
  { id: 18, titulo: 'Half-Year Financial Report at 30 June 2026 y transcripción del 2T26 (FedTec, perspectivas)', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RC}/Half_year_Financial_Report_2026.pdf` },
  { id: 19, titulo: 'Titulares de Seeking Alpha sobre Reply (RSS de RPYTF, 2025-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/RPYTF.xml' },
  { id: 20, titulo: 'Tipos de cambio de referencia del euro (1,1215 USD por EUR el 20-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 21, titulo: 'TIM e il caso del sequestro dei 250 milioni dopo 5 anni dai fatti (Reply entre los proveedores de servicios de valor añadido)', editor: 'Corriere Comunicazioni', tipo: 'Prensa', fecha: '2024', url: 'https://www.corrierecomunicazioni.it/telco/tim-e-il-caso-del-sequestro-dei-250-milioni-dopo-5-anni-dai-fatti/' },
  { id: 22, titulo: 'Concise report of voting on the agenda, junta del 23-abr-2026', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-04-28', url: 'https://www.reply.com/contents/Concise_Report_of_voting_on_Agenda_EN.pdf' },
];
const c = Y['REY.MI'];
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables (Yahoo, 21-oct-2026). PER NTM = precio ÷ (BPA del año en curso × meses que quedan + BPA del siguiente × meses que
// entran) / 12; para Accenture (agosto) y Sesa (abril) se ponderan sus ejercicios fiscales. Capitalización en millones de EUR.
const NTM = { 'ACN': [10.3, 1.7], 'SES.MI': [6.3, 5.7] };
const nom = { 'CAP.PA': ['Capgemini', 'FR'], 'SOP.PA': ['Sopra Steria', 'FR'], 'ATE.PA': ['Alten', 'FR'], 'ADN1.DE': ['adesso', 'DE'], 'NA9.DE': ['Nagarro', 'DE'], 'SES.MI': ['Sesa', 'IT'], 'ACN': ['Accenture', 'IE'], 'EPAM': ['EPAM Systems', 'US'], 'GLOB': ['Globant', 'LU'], 'TIETO.HE': ['Tietoevry', 'FI'] };
const comps = Object.keys(nom).map((k) => {
  const y = Y[k], f = YF[k], tt = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const [m0, m1] = NTM[k] ?? [2.3, 9.7];
  const bpaNtm = (tt['0y'].bpa * m0 + tt['+1y'].bpa * m1) / 12;
  const k$ = y.divisa === 'USD' ? fx : 1;
  const ebitda = f.eb * f.rev;
  return { nombre: nom[k][0], ticker: k, pais: nom[k][1], capitalizacion: Math.round(y.cap / 1e6 / k$), ev_ventas: r2(y.ev / f.rev), ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.precio / bpaNtm), crecimiento_pct: r1(f.rg * 100), margen_ebitda_pct: r1(f.eb * 100), roic_pct: null, dn_ebitda: r1((f.debt - f.cash) / ebitda), fcf_yield_pct: f.fcf == null ? null : r1(f.fcf / y.cap * 100) };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const hora = new Date(c.hora * 1000).toISOString().slice(11, 16);
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (128,30 EUR); la sesión del 21-oct estaba abierta (${n2(c.precio)} EUR a las ${hora} UTC). Mediana del PER NTM de los comparables: ${n2(perMed)}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Reply S.p.A.', nombre_corto: 'Reply', ticker: 'REY', isin: 'IT0005282865', mercado: 'Euronext Milan (segmento STAR)', indice_referencia: 'FTSE MIB',
    pais: 'Italia', pais_iso: 'IT', sector: 'Tecnología', industria: 'Servicios de TI y consultoría', sede: 'Turín', fundacion: '1996', empleados: 17297, web: 'https://www.reply.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 36.33, capitalizacion_publicada: Math.round(c.cap / 1e6), free_float_pct: 57,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${n2(B.volumen_3m.importe_dia_millones)} M EUR/día (3 meses)`, proximos_resultados: '2026-11-12',
  },
  consenso: {
    guidance: 'Reply no da guía numérica. En el 2T26 (30-jul-2026) mantuvo «perspectivas positivas» para 2026; el consejero delegado espera un tercer trimestre «en línea» con el primer semestre (+7,4 % de ingresos) y FedTec suma ≤ 2 % de las ventas del año [18].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['0y'].n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: c.reco.strongBuy + c.reco.buy + c.reco.hold + c.reco.sell + c.reco.strongSell, comprar: c.reco.strongBuy + c.reco.buy, mantener: c.reco.hold, vender: c.reco.sell + c.reco.strongSell, po_medio: r2(c.po_medio), po_min: c.po_min, po_max: c.po_max },
    revisiones: `El BPA del consenso subió tras el 2T26: 2026 de ${n2(r2(t['0y'].bpa_hace90))} EUR hace 90 días a ${n2(r2(t['0y'].bpa))} y 2027 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))} [2]. Objetivos tras el 2T26: Intermonte Comprar 195 EUR (desde 187), Intesa Comprar 155, Deutsche Bank Comprar 140 (desde 130), Equita 130 (+4 %; ≈ 7 veces el EV/EBIT y 12 veces el PER de 2027) [4, 5, 6]. Antes, el 17-nov-2025, Berenberg (Mantener) y Equita bajaron el objetivo de 165 y 172 a 150 EUR por la IA: Berenberg recortó el BPA a 7,40 (2026) y 7,92 (2027) [7]. Media de Yahoo: ${n2(r2(c.po_medio))} EUR (${c.n_analistas} objetivos, ${c.po_min}-${c.po_max}); 10 comprar y 1 mantener [2]. Simply Wall St (5-ago): 11 analistas, ventas de 2026 de 2.710 M y BPA de 7,53 [3]. Sin consenso gratuito de 2028.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: null,
    comentario: 'La acción ha ido mucho peor que el índice en cinco años (−4,3 % anual frente a +13,1 % del FTSE MIB) y mejor en diez (+16,7 % frente a +11,1 %) [1]. Del máximo de noviembre de 2021 (≈ 185 EUR) cayó un 57 % hasta marzo de 2026 (76,65 EUR), primero por la subida de tipos de 2022 y después por el temor a la IA en las consultoras (2025: −24,7 % con el índice +31,5 %) [1, 13]. Desde marzo ha subido un 67 %: recompra de hasta 550 M (abril), resultados del 2T26 mejores de lo esperado (julio) y vuelta del sector [10, 15, 4]. Beta baja frente al FTSE MIB (0,61 mensual a cinco años; 0,74 ajustada) y volatilidad alta (38,6 % en el último año) [1].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 8.8, var_3m_pct: 29.3, var_6m_pct: 41.3, var_12m_pct: 7.5, dist_max_52s_pct: 0.0, dist_min_52s_pct: 67.5, dist_max_historico_pct: -30.4, tendencia: 'alcista', volatilidad_60d_pct: 29, avisos: ['P2 A un 0 % del máximo de 52 semanas tras subir un 29 % en tres meses'] },
      movimientos_fuertes: [
        { periodo: 'nov-2025', var_pct: -5.6, causa: 'Resultados del 3T25 (13-nov) con ingresos +8,1 % y caída del 5,6 % el 14-nov; el 17-nov Berenberg y Equita bajaron objetivos (165 y 172 a 150 EUR) y estimaciones por el efecto de la IA en las horas facturables [7, 2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-2026', var_pct: -8.9, causa: 'El 3-feb-2026 (−8,9 %) cayeron las consultoras y el software en todo el mundo por las nuevas herramientas de agentes de Anthropic; Milano Finanza no encontró motivo propio de la empresa (7-feb, ≈ 97 EUR) [11, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-2026', var_pct: -14.8, causa: 'El 12-mar-2026, día de las cuentas de 2025 (nota a las 13:47), −14,8 %: 4T25 con ingresos +5,2 % y EBITDA de 132,1 M frente a 135,1 M, sin guía, y el consejero delegado anunció presión en tarifas en 2026-2027 y menos tiempo y materiales. La causa concreta de la caída no la da ninguna fuente: es lectura propia de los resultados y de la conferencia [14]. Mínimo de 76,65 EUR el 23-mar.', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may 2026', var_pct: 25.0, causa: 'Recompra de hasta 550 M EUR anunciada el 9-abr (+5,5 % el 10-abr) y resultados del 1T26 (+6,2 %) el 15-may; Money.it la llama el punto de giro [15, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-2026', var_pct: -15.6, causa: 'Caída del 15,6 % en el mes (−6,0 % el 19-jun) sin nota de la empresa; causa no encontrada en tres búsquedas (notas de prensa de Reply, Teleborsa, titulares de Seeking Alpha): coincide con ventas en el sector de servicios de TI [10, 19].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago 2026', var_pct: 28.9, causa: 'Resultados del 2T26 (30-jul) por encima de lo esperado (ingresos +8,7 %, EBITDA 121,2 M) y compra de FedTec; subidas de objetivo de Intermonte, Deutsche Bank y Equita [4, 5, 6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2026', var_pct: 8.8, causa: 'Subida hasta el máximo de 52 semanas (130,80 el 19-oct) sin noticia propia: vuelta del sector (+6,6 % el 1-oct) y recompra en marcha hasta el 23-oct [10, 16].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-12', tipo: 'resultados', hecho: 'Resultados del 3T26 el 12-nov-2026 [17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-23', tipo: 'ampliación o convertible', hecho: 'Termina el programa de recompra (13-abr a 23-oct-2026; ≈ 1,08 M de acciones compradas hasta julio de un máximo de 3,6 M); la junta autorizó otro hasta el 23-oct-2027 con los mismos límites, sin anunciar si lo usará [15, 18]. Es la retirada de un comprador, no una venta: no se puede medir y no hay colocación.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-29', tipo: 'rumor', hecho: 'Las tecnológicas europeas pendientes de Anthropic (salida a bolsa y nuevas herramientas): el temor a la IA sigue moviendo al sector [16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-03', tipo: 'recomendación', hecho: 'Deutsche Bank (Comprar, 140 EUR) e Intesa Sanpaolo (Comprar, 155) confirman [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-31', tipo: 'recomendación', hecho: 'Intermonte sube el objetivo a 195 EUR (Comprar) y Equita a 130 [4, 5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-14', tipo: 'fusión u oferta', hecho: 'Compra de FedTec LLC (EE. UU., defensa y administración federal), ≤ 2 % de las ventas de 2026, precio no publicado [18, 4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-23', tipo: 'accionista de referencia', hecho: 'Junta: 22,9 % en contra de la política de remuneración (≈ 91 % del capital libre presente) y nueva autorización de recompra hasta 2027; Alika (familia Rizzante) no vende [22, 18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-09', tipo: 'ampliación o convertible', hecho: 'Recompra de hasta 3.607.950 acciones (9,6 %) o 550 M EUR [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-12', tipo: 'resultados', hecho: 'Cuentas de 2025: ingresos +6,7 %, EBITDA subyacente plano, presión de tarifas anunciada para 2026-2027; −14,8 % ese día [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-11-17', tipo: 'recomendación', hecho: 'Berenberg (Mantener) y Equita bajan el objetivo a 150 EUR por la IA [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-12', tipo: 'demanda o regulador', hecho: 'El informe anual de 2025 actualiza la investigación de la Fiscalía de Milán (fraude informático, servicios de valor añadido de TIM 2017-2019) con secuestro preventivo a Reply: liberación parcial y provisión rebajada de 8 M a 2,9 M; sin fecha de juicio [14, 21].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-12',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está en su máximo de 52 semanas tras subir un 29 % en tres meses (aviso P2 de la herramienta, que no cambia la señal pero obliga a explicar la causa) [10]. La subida tiene causa en hechos de la empresa: la recompra (abril), dos trimestres de crecimiento al 6-9 % y las subidas de objetivo de julio; y viene de un mínimo (76,65 EUR en marzo) causado por el temor a la IA en todo el sector [11, 15, 4]. No hay colocaciones, ampliaciones ni decisiones judiciales con fecha: la familia no vende y el procedimiento penal no tiene calendario. El fin de la recompra el 23-oct retira un comprador, pero no es un hecho que pueda mover el precio más de un 5 % en contra de forma identificable, y la junta ya autorizó otra. Los resultados del 12-nov no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => +x.anio >= 2020).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada ejercicio (Yahoo) [1]. El PER adelantado (cierre ÷ BPA real del año siguiente) fue de 14-17 veces en 2016-2018, subió a 21-24 en 2019-2020 y a 34,8 en el pico de 2021, y se quedó en 21-23 en 2022-2024; al cierre de 2025 cayó a ≈ 15 veces con el temor a la IA. Hoy cotiza a ≈ 15,8 veces el BPA de los próximos 12 meses. La historia está en el BPA publicado (no hay ajustado) y no tiene pérdidas: no hay años que excluir.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Consultoras y empresas de servicios de TI europeas cotizadas (Capgemini, Sopra Steria, Alten, adesso, Nagarro, Sesa, Tietoevry) y las globales con las que compite en grandes cuentas o en ingeniería de software (Accenture, EPAM, Globant) [2]. Ninguna es igual: Reply tiene más margen (EBITDA del 17 % frente al 6-19 %) y más peso de Italia; Accenture es la más parecida en calidad. Tietoevry tiene el margen operativo deformado por ventas de negocios.',
    empresas: comps,
    comentario: `Reply cotiza a ≈ 15,8 veces el BPA de los próximos 12 meses frente a una mediana de ${n2(perMed)} de los comparables (Capgemini ${n2(comps.find((x) => x.ticker === 'CAP.PA').per_ntm)}, Accenture ${n2(comps.find((x) => x.ticker === 'ACN').per_ntm)}) [2]. La prima frente a las europeas la explican el margen (doble que la media) y la caja neta; frente a Accenture cotiza con descuento. Todo el sector se ha abaratado por el temor a la IA: los PER de 9-10 veces de Capgemini, Sopra Steria y EPAM eran de 15-25 hace tres años. Múltiplo de referencia del motor en el alcista: la mediana (${n2(perMed)}), que no llega a la historia de Reply y no cuenta.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-10', objetivo: 'Solirius Ltd (Reino Unido, consultoría digital del sector público)', comprador: 'Reply', ev: 117.7, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de la operación con earn-out; activos netos de 32,6 M (29,3 de caja) [18].' },
      { fecha: '2026-07', objetivo: 'FedTec LLC (EE. UU., defensa)', comprador: 'Reply', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 10 veces el EV/EBIT según Equita; precio no publicado [5].' },
    ],
    comentario: 'Reply compra especialistas pequeños a 8-10 veces el EBIT con pagos aplazados; no hay transacciones grandes de consultoras europeas comparables con múltiplos publicados en fuentes gratuitas. Con la familia Rizzante con ≈ 63 % de los votos, una oferta por Reply solo es posible si la familia quiere vender: el valor de control no es relevante.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y BPA de 2028e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo 2026 y 2027); 2) MarketScreener (no abre sin sesión); 3) Simply Wall St (solo 2026)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'causa de la caída de junio de 2026 (−15,6 % en el mes)', tipo: 'Complemento', intentos: '1) notas de prensa de Reply de junio; 2) Teleborsa y Milano Finanza; 3) titulares de Seeking Alpha', decision: 'Se explica como caída del sector, sin causa concreta' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'Sin datos suficientes. Stocktwits no tiene flujo de REY.MI (404) y el de RPYTF está vacío; Reddit no abre (403); Seeking Alpha solo da titulares (transcripciones y presentaciones, sin artículos de opinión recientes); el foro de FinanzaOnline no devuelve hilos de Reply. Sin debate de particulares que leer.',
  sentimiento: null,
  huecos: [
    { seccion: 'sentimiento', campo: 'sentimiento de foros y redes', tipo: 'Complemento', intentos: '1) Stocktwits (REY.MI 404; RPYTF sin mensajes); 2) Reddit (403); 3) Seeking Alpha (solo titulares de transcripciones) y FinanzaOnline (sin hilos)', decision: 'Omitido' },
  ],
  fuentes: [],
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
