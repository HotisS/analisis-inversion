// Escribe las notas A-E de Motorola Solutions (corte 2026-10-21, precio del cierre del 20-oct-2026) a partir de los
// documentos de notas/docs (EDGAR), del XBRL de la SEC (cuentas-xbrl.json y companyfacts), de bolsa.json, de
// yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026, 15:18 UTC) y de form4.json. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/motorola-2026-10-21/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/68505';
const ANIOS = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025: cuentas, segmentos, ventas por región y tecnología, cartera, deuda, pensiones, Silvus, Hytera, riesgos', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${ED}/000006850526000010/msi-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (a 4-jul-2026): balance, earnout de Silvus, Hytera (civil y penal), recompras', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000006850526000028/msi-20260704.htm` },
  { id: 3, titulo: 'Motorola Solutions Reports Second-Quarter 2026 Financial Results (conciliaciones no GAAP, guía 2026, D-Fend)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000006850526000027/msiq22026pressrelease.htm` },
  { id: 4, titulo: 'Motorola Solutions Reports First-Quarter 2026 Financial Results (earnout, Exacom, Hyper, Bell Canada)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000006850526000018/msiq12026pressrelease.htm` },
  { id: 5, titulo: 'Motorola Solutions Reports Fourth-Quarter and Full-Year 2025 Financial Results (guía 2026)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000006850526000006/msiq42025pressrelease.htm` },
  { id: 6, titulo: 'Motorola Solutions Reports Third-Quarter 2025 Financial Results', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-30', url: `${ED}/000006850525000050/msiq32025pressrelease.htm` },
  { id: 7, titulo: 'Motorola Solutions Reports Second-Quarter 2025 Financial Results (financiación de Silvus)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-07', url: `${ED}/000006850525000038/msiq22025pressrelease.htm` },
  { id: 8, titulo: 'Notas de resultados anuales 2017-2024 (resultado operativo y BPA no GAAP, guías anuales)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-13', url: `${ED}/000006850525000008/msiq42024pressrelease.htm` },
  { id: 9, titulo: 'Form 10-K 2023 (segmentos 2021-2023, salida de ESN)', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-15', url: `${ED}/000006850524000008/msi-20231231.htm` },
  { id: 10, titulo: 'Form 10-K 2021 (segmentos 2019-2021, compras)', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2022-02-16', url: `${ED}/000006850522000010/msi-20211231.htm` },
  { id: 11, titulo: 'XBRL company facts de Motorola Solutions (pagos en acciones, amortización de intangibles, depreciación)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000068505.json' },
  { id: 12, titulo: 'Motorola Solutions Q2 2026 Earnings Call Highlights (Silvus 850 M, memoria 150 M, VESTA con IA, fábrica de Salt Lake City)', editor: 'GuruFocus', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.gurufocus.com/news/9009623/motorola-solutions-inc-msi-q2-2026-earnings-call-highlights-record-sales-and-raised-guidance-signal-strong-momentum' },
  { id: 13, titulo: 'Folleto 424B2: bonos de 950 M USD (4,85 % 2029 y 5,65 % 2036), compra de D-Fend y capitalización a 4-jul-2026', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-10', url: `${ED}/000119312526342454/d162983d424b2.htm` },
  { id: 14, titulo: 'Presentación del anuncio de la compra de Silvus (≈ 475 M USD de ventas 2025 y ≈ 45 % de margen EBITDA ajustado)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-05-27', url: `${ED}/000119312525127588/d934424dex992.htm` },
];

// No recurrentes DENTRO del EBIT (positivos si son gasto) [1, 9, 8]: deterioro de 147 M por la salida de ESN en 2022 menos
// 15 M de ganancia de Hytera; ganancias de Hytera de 61 M (2024) y 157 M (2025). Las reestructuraciones (≈ 50-60 M al año)
// y los gastos de compras se repiten y NO se tratan como no recurrentes.
const NOREC = { 2019: null, 2020: null, 2021: null, 2022: 132, 2023: null, 2024: -61, 2025: -157 };
const ADQ = { 2019: 709, 2020: 287, 2021: 521, 2022: 1177, 2023: 180, 2024: 290, 2025: 4916 };
const cuenta = X.financieros.cuenta.filter((c) => ANIOS.includes(c.periodo)).map((c) => {
  const o = { ...c, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[c.periodo], dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => ANIOS.includes(b.periodo)).map((b) => {
  const o = { ...b, arrendamientos: 0 }; delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => ANIOS.includes(f.periodo)).map((f) => {
  const o = { ...f, adquisiciones: ADQ[f.periodo], pagos_arrendamientos: f.pagos_arrendamientos ?? 0, desinversiones: f.desinversiones ?? 0 };
  delete o.fin; return o;
});

// Trimestres: BPA NO GAAP de la empresa (base de la guía y del consenso); EBITDA = resultado operativo GAAP + amortizaciones
// del estado de flujos del trimestre [3-7]. Crecimiento orgánico = (ventas − ventas de compras) ÷ ventas del año anterior.
const tq = (p, ing, g, org, oe, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: org, ebitda: oe + da, margen_ebitda_pct: r1((oe + da) / ing * 100), bpa, vs_consenso: vs });
const trimestres = {
  items: [
    tq('3T24', 2790, null, null, 711, 84, 3.74, null),
    tq('4T24', 3010, 5.7, null, 814, 87, 4.04, null),
    tq('1T25', 2528, 5.8, null, 582, 81, 3.18, null),
    tq('2T25', 2765, 5.2, 3.7, 692, 86, 3.57, null),
    tq('3T25', 3009, 7.8, 3.4, 770, 115, 4.06, 'Superior'),
    tq('4T25', 3380, 12.3, 6.0, 944, 143, 4.59, 'Superior'),
    tq('1T26', 2714, 7.4, -1.3, 525, 143, 3.37, 'Superior'),
    tq('2T26', 3133, 13.3, 4.5, 809, 148, 4.41, 'Superior'),
  ],
  ultima_presentacion: 'Dos conferencias con mensajes distintos. En la del 1T26 (7-may) la dirección subió la guía anual a 12.800 M USD de ventas y 16,87-16,99 USD de BPA no GAAP con Silvus en ≈ 750 M, pero el trimestre mostró la debilidad que el mercado castigó: ventas orgánicas −1,3 % (2.714 M con 219 M de compras), Products and Systems Integration +1 % con MCN a la baja y margen operativo GAAP del 19,3 % por el ajuste del earnout de Silvus (75 M) y la amortización de intangibles [4]. En la del 2T26 (5-ago) el tono cambió: ventas +13 % (orgánico ≈ +4,5 %), margen no GAAP del 32,9 % (190 pb por las devoluciones de aranceles IEEPA), cartera récord de 15.600 M y guía subida a 12.975 M y 17,62-17,72 USD [3]. Silvus vendió ≈ 230 M en el trimestre y su guía anual pasa a ≈ 850 M; la memoria (por la demanda de la IA) costará ≈ 150 M en 2026 frente a 50 M en 2025, y la empresa sube precios «quirúrgicamente» en servidores de vídeo [12]. Los analistas preguntaron por la memoria, por el margen bruto y por la deuda de D-Fend; la dirección promete pedidos de dos dígitos en el segundo semestre pero no cuantificó 2027 ni el efecto neto de D-Fend [12, 3].',
  confianza: 'Alta',
};

const A = {
  _estado: 'Completa. Cuentas 2019-2025 del XBRL de la SEC comprobadas con el 10-K; LTM a 4-jul-2026 (10-Q del 2T26).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jul-26', fecha_fin: '2026-07-04', ingresos: 12237, ebitda: 3597, ebit: 3048, beneficio_neto: 2134, bpa: 12.69, dpa: 4.84, dpa_extraordinario: 0, fcf: 2677, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -106 },
    cambios_perimetro: [{ periodo: '2025', descripcion: 'Silvus Technologies (4.400 M USD), consolidada desde el 6-ago-2025: entra entera en el balance (fondo de comercio de 3.526 a 6.800 M) y solo cinco meses en la cuenta (≈ 185 M de ventas).' }],
    comentario: 'Las ventas pasan de 7.887 M USD en 2019 a 11.682 M en 2025 (+6,6 % anual) y a 12.237 M en los últimos doce meses [1, 2]. El crecimiento de 2025 (+8 %) lleva 382 M de compras y 35 M de divisa: el orgánico fue ≈ +4 % [5]. En 2026 la empresa espera 12.975 M (+11 %), con Silvus (≈ 850 M) como principal motor; el orgánico del primer semestre fue de solo +1,7 % (5.382 M frente a 5.290 M) [3, 12]. El margen operativo GAAP sube del 20,0 % en 2019 al 25,6 % en 2025 por la mezcla hacia software y servicios, la caída del coste de materiales de 2023 y el apalancamiento operativo; el no GAAP de la empresa, del 25,0 % al 30,3 % [8, 5]. Años no comparables: 2022 (deterioro de 147 M por la salida de ESN en el Reino Unido), 2024 (pérdida de 585 M por la recompra del convertible de Silver Lake, bajo el EBIT) y 2025 (Silvus) [9, 5]. Los pagos en acciones crecen más que el negocio: de 118 M en 2019 a 293 M en 2025 y ≈ 410 M en 2026 (204 M en el primer semestre) [11, 3].',
    ajustes: 'El BPA no GAAP de la empresa excluye los pagos en acciones, la amortización de intangibles comprados y las «partidas destacadas» (reestructuración, gastos de compras, ajustes del earnout, litigios, Hytera, deuda) [3]. En 2025 fue de 15,38 USD frente a 12,75 GAAP (2,63 de diferencia) y en el primer semestre de 2026 de 7,78 frente a 5,51 [5, 3]. En las cuentas del informe solo se tratan como no recurrentes el deterioro de ESN (2022) y las ganancias de Hytera (61 M en 2024, 157 M en 2025, 60 M en el 1S26) más el earnout de Silvus del 1S26 (91 M): son partidas que no se repiten con el negocio. La reestructuración (≈ 60 M al año), los gastos de compras y los pagos en acciones se repiten y se quedan como coste. Las devoluciones de aranceles IEEPA (60 M en el 2T26) mejoran el margen de 2026 y no se repetirán [3].',
    confianza: 'Alta',
  },
  trimestres,
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 750 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 1500 }, { anio: '2029', importe: 1200 }, { anio: '2030', importe: 1500 }, { anio: '2031+', importe: 4212 }],
    liquidez: 'Caja de 710 M USD a 4-jul-2026 y línea de crédito no dispuesta de 2.250 M hasta abril de 2030, que respalda un programa de papel comercial de hasta 2.200 M [2, 1]. En agosto de 2026 emitió 950 M de bonos (350 M al 4,85 % a 2029 y 600 M al 5,65 % a 2036) y un préstamo de 300 M para pagar D-Fend (1.500 M) [13].',
    rating: 'Grado de inversión en las tres agencias (la empresa no publica la nota en el 10-K) [1].',
    coste_deuda_pct: 4.6, vida_media_anios: null,
    otros_pasivos: 'Pensiones: déficit neto de 418 M USD a cierre de 2025 (EE. UU. −416, fuera de EE. UU. −39 y sanidad de jubilados +37), ≈ 322 M después de impuestos; el gasto contable de los planes es un ingreso (−79 M en EE. UU.) por la rentabilidad esperada de los activos [1]. Earnout de Silvus: hasta 600 M USD en acciones (150 M por el año jul-26/jul-27 y 450 M por jul-27/jul-28), valorado en 127 M a 4-jul-2026 tras subirlo 91 M en el semestre porque Silvus va por encima del plan [2]. Hytera: el tribunal le ordenó pagar 100 M al año desde 2026 hasta saldar la condena civil (407 M confirmados más costas e intereses; 232 M cobrados); es un activo contingente que no está en el balance [2]. Garantías y avales de contratos de varios años con gobiernos [1].',
    comentario: 'La deuda bruta pasa de 6.018 M USD en 2023 a 9.162 M en 2025 por Silvus (2.000 M de bonos y 1.500 M de préstamo) y a 10.467 M tras D-Fend en agosto de 2026 [1, 13]. Deuda neta / EBITDA ≈ 2,4 veces en el LTM y ≈ 2,7 tras D-Fend, con un flujo libre de ≈ 2.700 M que la baja en un año [13, 2]. El patrimonio era negativo hasta 2021 (−40 M) por décadas de recompras y la escisión de 2011, y hoy es de 2.672 M: el ROE no significa nada [1, 2]. El circulante comercial sube en 2026 por las existencias (de 983 a 1.333 M) para asegurar memoria y componentes ante aranceles [3]. Los pasivos de contrato (anticipos de clientes, 2.341 M) superan a los activos de contrato (1.455 M) [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es alta y estable: flujo operativo de 2.837 M USD en 2025 frente a un beneficio de 2.154 M, y flujo libre (operativo menos inversión) de 2.572 M, el 22 % de las ventas [5]. El capex es pequeño (265 M, el 2,3 % de las ventas) y casi todo de mantenimiento; en 2026 sube por la nueva fábrica de Salt Lake City (≈ 300 M) [1, 12]. 2019 y 2020 llevan pagos a la seguridad social de pensiones y la COVID; 2024 el pago del convertible de Silver Lake [8, 1]. Usos de la caja en 2019-2025: 8.080 M en compras (4.916 M en 2025), 4.033 M en recompras y 3.798 M en dividendos frente a 14.368 M de flujo operativo [1, 9, 10]. Los pagos en acciones (293 M en 2025) no consumen caja pero diluyen: las recompras netas los compensan [11].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades) en 2025, también sobre el control interno [1]',
    comentario: 'Cuentas limpias con dos matices. El primero, la distancia entre el BPA no GAAP y el GAAP crece: 2,63 USD en 2025 y 2,27 en el primer semestre de 2026, por la amortización de Silvus (≈ 370 M al año) y los pagos en acciones (≈ 410 M) [5, 3]. Los pagos en acciones son coste real; el informe los resta en el DCF aunque la regla a 12 meses usa el BPA no GAAP (la misma base que la historia y el consenso). El segundo, los ingresos de Hytera (157 M en 2025) entran como menor gasto en «Other charges» y la empresa los excluye del no GAAP; aquí también se excluyen [1]. La asignación del precio de Silvus (820 M de relaciones con clientes y 920 M de tecnología) es una cuestión crítica de auditoría [1]. Indicadores del motor: el Altman y el Beneish pierden sentido con el patrimonio que fue negativo hasta 2021 y con el salto del balance de 2025 por Silvus; se leen con cuidado.',
    senales: [
      { senal: 'BPA no GAAP muy por encima del GAAP', nivel: 'Media', comentario: '15,38 frente a 12,75 USD en 2025; la diferencia sube con la amortización de Silvus y los pagos en acciones [5].' },
      { senal: 'Pagos en acciones crecientes', nivel: 'Media', comentario: 'De 118 M USD en 2019 a 293 M en 2025 y 204 M solo en el 1S26 (≈ 3 % de las ventas) [11, 3].' },
      { senal: 'Earnout de Silvus que sube', nivel: 'Baja', comentario: 'De 37 a 127 M USD en seis meses; hasta 600 M en acciones (≈ 1,3 M de acciones) [2].' },
      { senal: 'Ingresos de Hytera dentro del resultado operativo GAAP', nivel: 'Baja', comentario: '61 M (2024), 157 M (2025) y 60 M (1S26) como menor gasto; no recurrentes [1, 3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: inversión en el negocio, compras que amplíen el ecosistema (comunicaciones críticas, vídeo, centros de mando, defensa), dividendo creciente (1,21 USD trimestrales desde 2026, +11 %) y recompras oportunistas [5, 3]. El consejo amplió el programa de recompras en 2.000 M el 9-sep-2026 (20.000 M acumulados desde 2011); quedaban ≈ 600 M antes de la ampliación [3]. En 2025 recompró 1.154 M a 420,21 USD de media y en el 1S26, 449 M (326 M a 413,53 en el 2T26) [5, 3].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Silvus Technologies (redes MANET para drones y defensa)', importe: 4400, ev_ebitda: 20.6, financiacion: '2.000 M de bonos, 1.500 M de préstamo y 900 M de caja y papel comercial', resultado: 'Por encima del plan: ≈ 850 M de ventas guiadas en 2026 frente a ≈ 475 M en 2025; earnout de hasta 600 M en acciones [14, 12, 2].' },
      { anio: '2025', objetivo: 'RapidDeploy (911 en la nube) y Theatro (voz e IA para trabajadores)', importe: 414, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en Command Center, que crece un 15 % en 2025 [1].' },
      { anio: '2026', objetivo: 'D-Fend Solutions (antidrones por radiofrecuencia)', importe: 1500, ev_ebitda: null, financiacion: '950 M de bonos, 300 M de préstamo y caja', resultado: 'Cerrada el 20-ago-2026; sin cifras de ventas publicadas [13].' },
      { anio: '2026', objetivo: 'Servicios de redes LMR de Bell Canada', importe: 500, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Pendiente de cierre en el 4T26 (675 M CAD) [4].' },
      { anio: '2022', objetivo: 'Rave Mobile Safety, Calipsa, TETRA Ireland y otras', importe: 1177, ev_ebitda: null, financiacion: 'Caja', resultado: 'Rave reforzó Command Center; sin deterioros [9].' },
      { anio: '2019', objetivo: 'WatchGuard (cámaras de policía) y otras', importe: 709, ev_ebitda: null, financiacion: 'Caja', resultado: 'Base del vídeo móvil, hoy 21 % de Software and Services [10, 1].' },
    ],
    comentario: 'Buena asignadora de capital con historial: ha convertido una empresa de radios en un ecosistema de seguridad comprando vídeo (Avigilon, WatchGuard, Pelco) y software (Rave, RapidDeploy) sin deterioros relevantes, y el margen no GAAP subió 5 puntos en seis años [8, 1]. Las acciones diluidas bajan de 176 M en 2019 a 169 M en 2025 pese a los pagos en acciones [1]. El giro reciente es más caro y más arriesgado: 5.900 M en Silvus y D-Fend en un año, a ≈ 20 veces el EBITDA de Silvus, en defensa y drones, un mercado nuevo para la empresa, financiado con deuda (≈ 2,7 veces el EBITDA tras D-Fend) [14, 13]. Silvus va por encima del plan; D-Fend está por probar.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Products and Systems Integration', descripcion: 'Radios y redes de comunicaciones críticas (P25, TETRA, DMR), MANET de Silvus, cámaras fijas y de vehículos, control de accesos e integración de sistemas.', tipo_resultado: 'EBIT', historico: [{ periodo: '2019', ingresos: 5329, resultado: 994 }, { periodo: '2020', ingresos: 4634, resultado: 656 }, { periodo: '2021', ingresos: 5033, resultado: 760 }, { periodo: '2022', ingresos: 5728, resultado: 913 }, { periodo: '2023', ingresos: 6242, resultado: 1244 }, { periodo: '2024', ingresos: 6883, resultado: 1676 }, { periodo: '2025', ingresos: 7253, resultado: 1761 }] },
      { nombre: 'Software and Services', descripcion: 'Servicios y mantenimiento de redes de radio, software de centros de emergencia (911, despacho, registros), software y cámaras de vídeo por suscripción y servicios gestionados.', tipo_resultado: 'EBIT', historico: [{ periodo: '2019', ingresos: 2558, resultado: 587 }, { periodo: '2020', ingresos: 2780, resultado: 727 }, { periodo: '2021', ingresos: 3138, resultado: 907 }, { periodo: '2022', ingresos: 3384, resultado: 748 }, { periodo: '2023', ingresos: 3736, resultado: 1050 }, { periodo: '2024', ingresos: 3934, resultado: 1012 }, { periodo: '2025', ingresos: 4429, resultado: 1227 }] },
    ],
    geografias: [{ nombre: 'Norteamérica', peso_pct: 71.6 }, { nombre: 'Internacional', peso_pct: 28.4 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos (M USD)', valor_anterior: '14.697', valor_actual: '15.742', variacion: '+7 %', comentario: '15.600 M a 4-jul-2026 (+11 %); ≈ 4.800 M se facturan en 2026 [1, 3].' },
      { kpi: 'BPA no GAAP (USD)', valor_anterior: '13,84', valor_actual: '15,38', variacion: '+11 %', comentario: 'Guía 2026: 17,62-17,72 [5, 3].' },
      { kpi: 'Ventas de Software and Services (M USD)', valor_anterior: '3.934', valor_actual: '4.429', variacion: '+13 %', comentario: 'Margen no GAAP del 32,5 % [5].' },
      { kpi: 'Ventas de vídeo (M USD)', valor_anterior: '1.920', valor_actual: '2.120', variacion: '+10 %', comentario: 'Cámaras, control de accesos y software [1].' },
      { kpi: 'Ventas de Command Center (M USD)', valor_anterior: '797', valor_actual: '915', variacion: '+15 %', comentario: 'Software de 911 y despacho [1].' },
      { kpi: 'Flujo libre (M USD)', valor_anterior: '2.134', valor_actual: '2.572', variacion: '+21 %', comentario: 'Operativo menos inversión [5].' },
      { kpi: 'Ventas de Silvus (M USD)', valor_anterior: '≈ 475 (2025, año completo)', valor_actual: '≈ 850 (guía 2026)', variacion: '≈ +80 %', comentario: 'Drones y defensa; earnout ligado a sus ventas [14, 12].' },
    ],
    clientes: 'Clientes muy fragmentados: miles de agencias federales, estatales, de condado y municipales de policía, bomberos y emergencias, ejércitos y empresas (escuelas, hospitales, servicios públicos) [1]. El mayor cliente es el Gobierno federal de EE. UU., con ≈ 8 % de las ventas, y todos los contratos públicos de EE. UU. se pueden cancelar a conveniencia del cliente [1]. El 74 % de las ventas es venta directa [1]. Los sistemas de radio duran 10-20 años y generan servicios, actualizaciones y ciberseguridad recurrentes: la cartera de servicios y software es de 11.930 M USD (2,7 veces sus ventas anuales) y Maryland renovó diez años de servicios P25 por 201 M [1, 5]. Poder de precios demostrado: el margen bruto subió del 49,8 % en 2023 al 51,7 % en 2025 pese a aranceles, y en 2026 la empresa sube precios en productos con mucha memoria [1, 12]. El precio de Airwave en el Reino Unido lo fija desde 2023 un control del regulador (CMA), que redujo sus ventas [1].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'Crecimiento del 3T24 y comparación con el consenso del 3T24-2T25', tipo: 'Complemento', intentos: '1) notas de resultados del 3T25 y 2T25 (solo dan el año anterior del propio trimestre); 2) 10-K 2025 (sin trimestres); 3) titulares de Seeking Alpha (solo desde el 1T26)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'Años de PwC como auditor', tipo: 'Complemento', intentos: '1) 10-K 2025 (no lo dice); 2) proxy 2026 (ratificación sin antigüedad); 3) búsqueda no hecha por presupuesto', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: tecnologías, competidores por tecnología, clientes, regulación (BIPA, ALPR, espectro), OBBBA', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${ED}/000006850526000010/msi-20251231.htm` },
  { id: 2, titulo: 'Land Mobile Radio Market Size, Share & Industry Analysis (18.640 M USD en 2025; 45.180 M en 2034; TCAC 10,4 %)', editor: 'Fortune Business Insights', tipo: 'Sectorial', fecha: '2026-01', url: 'https://www.fortunebusinessinsights.com/land-mobile-radio-market-113222' },
  { id: 3, titulo: 'Land Mobile Radio Market worth $32.24 billion by 2030 (17.890 M USD en 2024; TCAC 10,7 % 2025-2030)', editor: 'MarketsandMarkets (nota de prensa)', tipo: 'Sectorial', fecha: '2025-11', url: 'https://www.webull.com/news/13878805249434624' },
  { id: 4, titulo: 'Yahoo Finance quoteSummary: ventas, márgenes y capitalización de L3Harris, Axon, Zebra, Tyler, Hytera, JVCKenwood', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MSI' },
  { id: 5, titulo: 'Motorola Solutions Reports Second-Quarter 2026 Financial Results (D-Fend, memoria por la IA, aranceles)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000006850526000027/msiq22026pressrelease.htm` },
  { id: 6, titulo: 'Form 10-Q del 2T26: Hytera (condena penal, 100 M USD al año)', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000006850526000028/msi-20260704.htm` },
  { id: 7, titulo: 'Motorola Solutions Q2 2026 Earnings Call Highlights (VESTA con IA, Silvus, memoria)', editor: 'GuruFocus', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.gurufocus.com/news/9009623/motorola-solutions-inc-msi-q2-2026-earnings-call-highlights-record-sales-and-raised-guidance-signal-strong-momentum' },
  { id: 8, titulo: 'Presentación del anuncio de Silvus (MANET, drones, margen EBITDA ≈ 45 %)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-05-27', url: `${ED}/000119312525127588/d934424dex992.htm` },
  { id: 9, titulo: 'Form 10-K 2023 (salida de ESN, control de precios de Airwave)', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-15', url: `${ED}/000006850524000008/msi-20231231.htm` },
];
const yv = (t) => Y[t];
const FXJ = 1 / 158.10, FXC = 1 / 6.664; // JPY y CNY por USD, Yahoo 21-oct-2026
const B_ = {
  _estado: 'Completa. Mercado LMR con dos fuentes; vídeo y centros de mando sin tamaño propio (se dice).',
  sector: {
    definicion: 'Mercado relevante: comunicaciones críticas de radio (LMR: P25, TETRA, DMR, redes y terminales, más sus servicios), que es el 74 % de las ventas de la empresa (MCN, 8.647 M USD en 2025) [1]. Se usa la serie de Fortune Business Insights (18.640 M en 2025) porque da el año y la previsión a 2034; MarketsandMarkets da 17.890 M en 2024 y 32.240 M en 2030 (+10,7 % anual), coherente con la primera [2, 3]. Las dos incluyen terminales comerciales de gama baja y crecen más de lo que ha crecido la empresa (+6 % anual en MCN): se toman como techo. Vídeo (2.120 M) y Command Center (915 M) compiten en mercados de seguridad física y de software público mucho mayores y más fragmentados, sin una cifra comparable gratuita.',
    tamano: '≈ 18.640 M USD en 2025 [2]; 17.890 M en 2024 según MarketsandMarkets [3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2024', tamano: 17890 }, { anio: '2025', tamano: 18640 }, { anio: '2026e', tamano: 20480 }, { anio: '2030e', tamano: 30420 }, { anio: '2034e', tamano: 45180 }],
    tcac_historico_pct: null, tcac_previsto_pct: 10.4, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Renovación de redes P25 y TETRA de policía y emergencias', efecto: '+', horizonte: 'Estructural', evidencia: 'Contratos de 110 M (Colorado), 84 M (Tennessee) y 180 M (Tennessee) en 2025; ciclos de 10-20 años [1].' },
      { driver: 'Gasto en defensa y drones (MANET, antidrones)', efecto: '+', horizonte: 'Estructural', evidencia: 'Silvus pasa de ≈ 475 M USD en 2025 a ≈ 850 M guiados en 2026; compra de D-Fend por 1.500 M [8, 7, 5].' },
      { driver: 'Presupuestos públicos de EE. UU. (federal, estatal y local) y subvenciones', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Gobierno federal ≈ 8 % de las ventas; la OBBBA aporta fondos de seguridad fronteriza y nacional a cuatro años; los contratos se pueden cancelar a conveniencia [1].' },
      { driver: 'Vídeo y analítica con IA en seguridad pública y empresas', efecto: '+', horizonte: 'Estructural', evidencia: 'Vídeo +10 % en 2025 (2.120 M USD); todas las ventas de VESTA del 2T26 con IA [1, 7].' },
      { driver: 'Coste de la memoria y aranceles', efecto: '−', horizonte: 'Cíclico', evidencia: 'Memoria ≈ 150 M USD en 2026 frente a 50 M en 2025 por la demanda de la IA [7, 5].' },
      { driver: 'Banda ancha (LTE/5G para emergencias) como sustituto parcial de la radio', efecto: '+/−', horizonte: 'Estructural', evidencia: 'La empresa vende terminales LTE y aplicaciones que unen radio y banda ancha; la voz crítica sigue en LMR [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'En P25 de EE. UU. compiten sobre todo Motorola y L3Harris; en TETRA, Airbus, Sepura y Hytera. Márgenes no GAAP del 30 % frente al 18 % de L3Harris [4, 1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Gobiernos con concursos públicos, presupuestos y cancelación a conveniencia; pero cambiar de red cuesta años y cientos de millones [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Memoria y semiconductores: la demanda de la IA triplica el gasto en memoria en 2026 [5, 7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Certificaciones (P25, TETRA), relaciones de décadas y base instalada; las chinas (Hytera) están vetadas en EE. UU. y condenadas por robo de secretos [6, 1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Banda ancha comercial y FirstNet para datos; en vídeo y software, rivales nativos de la nube (Axon, Flock, Verkada) [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Gasto en seguridad pública y defensa al alza: pedidos récord y cartera de 15.600 M USD (+11 %) en el 2T26 [5]. El sector es defensivo: en 2020 las ventas de la empresa cayeron un 6 % (retrasos de concursos por la COVID) y en 2009 su predecesora sufrió más por los móviles que por la radio; en 2022 la escasez de chips retrasó entregas pero subió la cartera [1]. El riesgo cíclico es presupuestario: recortes federales o estatales, o cierres del Gobierno que retrasan adjudicaciones.' },
    regulacion: 'Espectro: las redes funcionan en bandas asignadas por la FCC y sus equivalentes; la banda T (470-512 MHz) y la de 800 MHz son debates recurrentes [1]. EE. UU. prohíbe equipos de Hytera, Hikvision y Dahua para usos de seguridad, lo que protege a los fabricantes occidentales [1]. Privacidad: la BIPA de Illinois y las leyes estatales de lectura de matrículas (ALPR) dan acción privada a los afectados y crecen en número [1]. Reino Unido: control de precios del regulador (CMA) sobre Airwave desde 2023 [9]. Contratos públicos de EE. UU.: auditorías y cancelación a conveniencia [1].',
    tendencias: 'Tres cambios. Primero, la radio se integra con vídeo, datos y software en un «ecosistema» (centros de mando, cámaras corporales, IA); la empresa gana porque tiene la base instalada de radio [1]. Segundo, la defensa y los drones abren un mercado nuevo (MANET, antidrones) donde la empresa entra comprando (Silvus, D-Fend) [8, 5]. Tercero, la IA: asistentes en 911 y despacho (Hyper, VESTA con IA en todas las ventas del 2T26) y analítica de vídeo; ayuda a vender software, pero también abre la puerta a rivales de software y encarece la memoria [7, 5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 46.4,
    posicion: '1.º mundial en comunicaciones críticas de radio (LMR): ventas de MCN de 8.647 M USD frente a un mercado de ≈ 18.640 M en 2025 (≈ 46 %, estimación propia) [1, 2]. En vídeo de seguridad y en software de 911 y despacho es uno de varios grandes, sin cuota publicada.',
    competidores: [
      { nombre: 'L3Harris Technologies', pais: 'EE. UU.', ticker: 'LHX', ingresos: Math.round(yv('LHX').ventas / 1e6), cuota_pct: null, margen_ebit_pct: 12.6, comentario: 'Segundo en P25 en EE. UU. (radios de seguridad pública) y fuerte en radios tácticas militares; grupo de defensa diversificado [4, 1].' },
      { nombre: 'Axon Enterprise', pais: 'EE. UU.', ticker: 'AXON', ingresos: Math.round(yv('AXON').ventas / 1e6), cuota_pct: null, margen_ebit_pct: 5.2, comentario: 'Líder en cámaras corporales, pistolas eléctricas y evidencias en la nube; compite en vídeo y en centros de mando; crece ≈ 35 % [4, 1].' },
      { nombre: 'Hytera Communications', pais: 'China', ticker: '002583.SZ', ingresos: Math.round(yv('002583.SZ').ventas / 1e6 * FXC), cuota_pct: null, margen_ebit_pct: 8.4, comentario: 'Tercero mundial en radios profesionales (DMR, TETRA); vetado en EE. UU. y condenado por robo de secretos de Motorola [4, 6].' },
      { nombre: 'Zebra Technologies', pais: 'EE. UU.', ticker: 'ZBRA', ingresos: Math.round(yv('ZBRA').ventas / 1e6), cuota_pct: null, margen_ebit_pct: 21.3, comentario: 'Terminales robustos para empresas; compite en comunicaciones de trabajadores de primera línea [4, 1].' },
      { nombre: 'Tyler Technologies', pais: 'EE. UU.', ticker: 'TYL', ingresos: Math.round(yv('TYL').ventas / 1e6), cuota_pct: null, margen_ebit_pct: 14.7, comentario: 'Software para administraciones (incluido despacho y registros policiales) [4, 1].' },
      { nombre: 'JVCKenwood', pais: 'Japón', ticker: '6632.T', ingresos: Math.round(yv('6632.T').ventas / 1e6 * FXJ), cuota_pct: null, margen_ebit_pct: 1.7, comentario: 'Radios profesionales (incluido P25 de gama media) dentro de un grupo de electrónica de consumo [4, 1].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'La interoperabilidad entre agencias favorece al proveedor dominante de la región, pero P25 es un estándar abierto [1].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Redes de 10-20 años, integradas con centros de 911 y despacho; servicios renovados a diez años (Maryland, 201 M USD) y cartera de servicios de 2,7 veces sus ventas [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '≈ 6.630 patentes; certificaciones; condena de Hytera por robar su código y sus secretos [1, 6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala en I+D (970 M USD en 2025) frente a rivales de radio más pequeños; margen no GAAP del 30 % [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de nicho con dos proveedores en P25 en EE. UU.; ≈ 46 % del LMR mundial [1, 2].' },
      ],
    },
    amenazas: 'Tres amenazas, en orden. (1) Rivales de software y vídeo nativos de la nube (Axon, Flock, Verkada) que crecen más deprisa en las partes que más crecen (vídeo y centros de mando) y que la IA puede reforzar; probabilidad media [1, 4]. (2) La banda ancha y los móviles robustos sustituyen parte de la radio para datos; la voz crítica aguanta por fiabilidad, probabilidad baja a cinco años [1]. (3) Presupuestos públicos y controles de precios (Airwave) que limitan precios; probabilidad media en el Reino Unido, baja en EE. UU. [9, 1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Motorola Solutions fabrica y mantiene las radios y redes de comunicaciones que usan policías, bomberos, ejércitos y empresas para hablar cuando el móvil falla, y vende el software de los centros de emergencia (911 y despacho), cámaras de vigilancia y corporales con analítica, y control de accesos [1]. Organiza la oferta en tres tecnologías: Mission Critical Networks (MCN: radios P25, TETRA y DMR, redes y, desde 2025, las redes MANET de Silvus para drones y defensa), Video Security and Access Control y Command Center [1]. Vende sobre todo directamente (74 %) y a través de distribuidores; Norteamérica es el 72 % de las ventas y el Gobierno federal de EE. UU. el ≈ 8 % [1]. Tiene ≈ 23.000 empleados, el 40 % en I+D e ingeniería [1].',
    como_gana_dinero: 'Dos motores. Products and Systems Integration (62 % de las ventas de 2025, margen operativo GAAP del 24 %) vende terminales y construye redes por proyecto, con ingresos al cumplir hitos [1]. Software and Services (38 %, margen del 28 % GAAP y 32,5 % no GAAP) cobra contratos plurianuales de mantenimiento, ciberseguridad, actualizaciones, servicios gestionados y software por suscripción [1, 5]. La base instalada de radio alimenta el segundo durante 10-20 años [1]. El margen depende de la mezcla (más software, más margen), del coste de componentes (memoria, aranceles) y del apalancamiento operativo; el cuarto trimestre es el más fuerte por los presupuestos públicos [1].',
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la privacidad y el uso de la IA en vídeo: la BIPA de Illinois y las leyes estatales de lectura de matrículas dan derecho de demanda a los particulares y crecen en número; el uso policial de reconocimiento facial y matrículas es un riesgo de reputación y de contratos [1]. Segundo, la ciberseguridad de redes críticas: un fallo en una red de emergencias costaría contratos [1]. Tercero, la cadena de suministro (subcontratistas en Asia, minerales) [1].',
    controversias: 'Sin sanciones relevantes en tres años en los documentos leídos. Litigio activo como demandante contra Hytera (condena penal en marzo de 2026) [6]. Debate público sobre la vigilancia policial con lectores de matrículas y vídeo con IA, que afecta al sector (Flock, Axon) [1].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Motorola nació en Chicago en 1928 como Galvin Manufacturing, fabricó radios para coches y, en la Segunda Guerra Mundial, los primeros walkie-talkies [1]. En 2011 se dividió: el negocio de móviles salió como Motorola Mobility (luego Google y Lenovo) y la empresa de radios y redes para gobiernos y empresas siguió como Motorola Solutions [1]. Desde 2011, con Greg Brown al frente, vendió negocios no estratégicos (Enterprise a Zebra en 2014), entró en servicios gestionados (Airwave, 2016), en vídeo (Avigilon 2018, WatchGuard 2019, Pelco 2020) y en software de emergencias (Spillman, Rave, RapidDeploy), y desde 2025 en defensa y drones (Silvus, D-Fend) [1, 5].',
    hitos: [
      { anio: '1928', hito: 'Fundación como Galvin Manufacturing en Chicago.' },
      { anio: '2011', hito: 'Escisión de Motorola Mobility; nace Motorola Solutions.' },
      { anio: '2014', hito: 'Venta del negocio Enterprise a Zebra Technologies.' },
      { anio: '2016', hito: 'Compra de Airwave, la red de emergencias del Reino Unido.' },
      { anio: '2018', hito: 'Compra de Avigilon (vídeo con analítica).' },
      { anio: '2020', hito: 'Jurado de EE. UU. condena a Hytera por robo de secretos (764,6 M USD).' },
      { anio: '2022', hito: 'Salida del contrato ESN del Reino Unido; compra de Rave Mobile Safety.' },
      { anio: '2025', hito: 'Compra de Silvus Technologies por 4.400 M USD (MANET para drones y defensa).' },
      { anio: '2026', hito: 'Compra de D-Fend (antidrones, 1.500 M USD); Hytera condenada en lo penal.' },
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'Cuota conjunta de los cinco primeros (CR5) y TCAC histórica del LMR', tipo: 'Complemento', intentos: '1) Fortune Business Insights (sin cuotas); 2) MarketsandMarkets (solo lista de empresas); 3) 10-K 2025 (sin cuota)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'Calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) informe de sostenibilidad no descargado (presupuesto); 2) proxy 2026 (sin notas); 3) páginas de MSCI y Sustainalytics requieren sesión', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas, ratio de pago', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-02', url: `${ED}/000119312526139004/d50373ddef14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (18-may-2026)', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-20', url: `${ED}/000119312526232694/d107048d8k.htm` },
  { id: 3, titulo: 'Form 8-K: resultados de la junta de 2025', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-05-19', url: `${ED}/000119312525122455/d928031d8k.htm` },
  { id: 4, titulo: 'Form 8-K: resultados de la junta de 2024', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-05-17', url: `${ED}/000119312524141186/d841624d8k.htm` },
  { id: 5, titulo: 'Form 4 de directivos y consejeros (21-oct-2025 a 21-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000068505&type=4' },
  { id: 6, titulo: 'Form 8-K: nombramiento de Mark Lashier como consejero', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-18', url: `${ED}/000119312525286239/d36380dex991.htm` },
  { id: 7, titulo: 'Form 8-K: nombramiento de Peter Leav como consejero', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-12', url: `${ED}/000119312526104278/d53953dex991.htm` },
  { id: 8, titulo: 'Notas de resultados anuales 2017-2025 (guías anuales y resultados no GAAP)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000006850526000006/msiq42025pressrelease.htm` },
  { id: 9, titulo: 'Motorola Solutions Announces Increase to Share Repurchase Program (2.000 M USD)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-09-09', url: `${ED}/000119312526386490/d492220dex991.htm` },
  { id: 10, titulo: 'Form 10-K 2025: directivos de la empresa', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${ED}/000006850526000010/msi-20251231.htm` },
  { id: 11, titulo: 'Motorola Solutions Reports Second-Quarter 2026 Financial Results (guía 2026 subida)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000006850526000027/msiq22026pressrelease.htm` },
];
const F4 = lee('form4.json');
const ventas = F4.operaciones.filter((o) => o.codigo === 'S');
const porPersona = {};
for (const o of ventas) { const k = o.persona; porPersona[k] = porPersona[k] || { acc: 0, imp: 0, f: o.fecha, cargo: o.cargo }; porPersona[k].acc += o.acciones; porPersona[k].imp += o.importe; if (o.fecha > porPersona[k].f) porPersona[k].f = o.fecha; }
const insiders = Object.entries(porPersona).sort((a, b) => b[1].imp - a[1].imp).slice(0, 6).map(([p, v]) => ({ fecha: v.f, persona: `${p} (${v.cargo})`, operacion: 'Venta', acciones: Math.round(v.acc), importe: r2(v.imp / 1e6) }));
const C = {
  _estado: 'Completa. Proxy 2026, votaciones de 2024-2026 y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Gregory Q. Brown', cargo: 'Presidente y consejero delegado', desde: '2008', participacion_pct: 0.23, trayectoria: 'Consejero delegado desde 2008 y presidente desde 2011; antes dirigió Micromuse. Llevó la escisión de 2011 y la transformación hacia software, vídeo y defensa; la acción ha rendido ≈ 22 % anual en diez años [1, 10].' },
      { nombre: 'Jason J. Winkler', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2020', participacion_pct: 0.01, trayectoria: 'Director financiero desde 2020, antes responsable de finanzas de las divisiones; financió Silvus y D-Fend con grado de inversión [1, 10].' },
      { nombre: 'John P. (Jack) Molloy', cargo: 'Vicepresidente ejecutivo y director de operaciones', desde: '2023', participacion_pct: 0.04, trayectoria: 'Responsable de ventas y operaciones mundiales; candidato natural a la sucesión [1].' },
      { nombre: 'Mahesh Saptharishi', cargo: 'Vicepresidente ejecutivo y director de tecnología', desde: '2019', participacion_pct: 0.02, trayectoria: 'Llegó con Avigilon (vídeo e IA) y dirige la tecnología y la IA del grupo [1].' },
      { nombre: 'Kenneth D. Denman', cargo: 'Consejero independiente coordinador', desde: '2017', participacion_pct: 0.0, trayectoria: 'Coordinador independiente desde 2019; antes consejero delegado de Emotient (IA, comprada por Apple), Openwave e iPass [1].' },
    ],
    historial_guidance: [
      { anio: '2019', guia: 'BPA no GAAP 7,55-7,70 USD', real: '7,96', cumplida: 'Sí' },
      { anio: '2020', guia: 'BPA no GAAP 8,65-8,80 USD', real: '7,69 (COVID)', cumplida: 'No' },
      { anio: '2021', guia: 'BPA no GAAP 8,50-8,62 USD', real: '9,15', cumplida: 'Sí' },
      { anio: '2022', guia: 'BPA no GAAP 9,80-9,95 USD', real: '10,36', cumplida: 'Sí' },
      { anio: '2023', guia: 'BPA no GAAP 11,10-11,22 USD', real: '11,95', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA no GAAP 12,62-12,72 USD', real: '13,84', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA no GAAP 14,64-14,74 USD', real: '15,38', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA no GAAP 16,70-16,85 USD (feb-26)', real: 'Guía subida a 17,62-17,72 (ago-26)', cumplida: 'Parcial' },
    ],
    comentario: 'Credibilidad alta: en siete de los ocho últimos años la empresa batió la guía inicial de BPA, y la única vez que no lo hizo fue 2020 (COVID) [8, 11]. Equipo estable: Brown lleva 18 años como consejero delegado, Winkler seis como director financiero [1]. La sucesión es el punto débil: Brown tiene 65 años, es a la vez presidente y consejero delegado, y no hay sucesor anunciado; Molloy (operaciones) es el candidato interno más visible [1]. Las ventas de Brown en 12 meses (87 M USD) son ejercicios de opciones de 2016-2017 a 71-81 USD cerca de su vencimiento; conserva ≈ 384.000 acciones y 1,19 millones de opciones [5, 1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Gregory Q. Brown', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2007', comisiones: 'Ejecutiva' },
      { nombre: 'Kenneth D. Denman', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2017', comisiones: 'Retribuciones; Gobierno y nombramientos (presidente); Ejecutiva' },
      { nombre: 'Nicole Anasenes', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidenta); Ejecutiva' },
      { nombre: 'Ayanna M. Howard', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Mark E. Lashier', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Gobierno y nombramientos' },
      { nombre: 'Peter A. Leav', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Retribuciones' },
      { nombre: 'Elizabeth D. Mann', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Joseph M. Tucci', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Retribuciones (presidente); Gobierno y nombramientos; Ejecutiva' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 80.0, voto_remuneracion_contra_pct: 19.6, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 34.45, fijo: 1.35, variable_corto: 4.51, variable_largo: 28.09, ratio_salario_medio: 322 },
    remuneracion: 'Brown cobró 34,5 M USD en 2025 (30,9 M en 2024): 1,35 M de sueldo, 4,5 M de variable anual y 28,1 M en acciones y opciones [1]. El variable a largo plazo es 100 % por resultados: unidades y opciones que se ganan según la rentabilidad total para el accionista frente al S&P 500 (pago objetivo solo por encima de la mediana; máximo del 250 % en el percentil 90) y unidades ligadas al precio [1]. El variable anual mide ventas, resultado operativo y flujo [1]. El ratio frente al empleado medio es de 322 veces [1]. En la junta de 2025 el 19,6 % votó en contra de la remuneración (80,0 % a favor), un aviso; en 2026 el rechazo bajó al 8,5 % [3, 2]. No mide el ROIC.',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 13.34, tipo: 'Gestora (índices)', variacion: '13G/A de octubre de 2025' },
      { nombre: 'BlackRock, Inc.', pct: 8.02, tipo: 'Gestora (índices)', variacion: '13G/A de abril de 2025' },
      { nombre: 'Consejeros y directivos (16 personas, con opciones)', pct: 1.28, tipo: 'Directivos', variacion: 'Ventas netas en 12 meses' },
    ],
    insiders,
    control_y_defensas: 'Sin accionista de control: los dos mayores son gestoras de índices (21 % juntas) [1]. Una acción, un voto; consejo elegido cada año por mayoría [2]. El presidente es el consejero delegado, con un consejero coordinador independiente con funciones reales (evaluación del consejo, agenda) [1]. Sin operaciones vinculadas relevantes en el proxy [1]. Siete de ocho consejeros son independientes; dos entraron en 2025-2026 (Lashier y Leav) y salió Mondre (Silver Lake) [6, 7, 1].',
    alertas: ['Presidente y consejero delegado en la misma persona desde 2011, con 65 años y sin sucesor anunciado [1].', 'Voto en contra de la remuneración del 19,6 % en 2025 [3].', 'Ventas de directivos por 101,5 M USD en 12 meses sin ninguna compra (87,4 M de Brown, por ejercicio de opciones antiguas) [5].'],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (MSI, SPY, XLK) con herramientas/bolsa.mjs y movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MSI/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: consenso de BPA y ventas, objetivos, recomendaciones y comparables (21-oct-2026, 15:18 UTC)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MSI/analysis' },
  { id: 3, titulo: 'Motorola Solutions price target, forecast and analyst ratings (cambios de recomendación y objetivo de 12 meses)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://www.marketbeat.com/stocks/NYSE/MSI/forecast/' },
  { id: 4, titulo: 'Titulares de Motorola Solutions (fecha de resultados del 3T26 el 4-nov, cierre de D-Fend, contrato de Luisiana)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.marketbeat.com/stocks/NYSE/MSI/news/' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Teledyne Completes Acquisition of FLIR (≈ 8.200 M USD con deuda neta)', editor: 'Teledyne Technologies (SEC, 8-K)', tipo: 'Primaria', fecha: '2021-05-14', url: 'https://www.sec.gov/Archives/edgar/data/1094285/000119312521161542/d494339dex991.htm' },
  { id: 8, titulo: 'Thoma Bravo completes acquisition of Everbridge (≈ 1.800 M USD)', editor: 'Everbridge, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-07-02', url: 'https://www.sec.gov/Archives/edgar/data/1437352/000119312524173902/d804733dex991.htm' },
  { id: 9, titulo: 'XBRL company facts de FLIR Systems (2020) y Everbridge (2023): ventas, resultado operativo y amortizaciones', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000354908.json' },
  { id: 10, titulo: 'Presentación del anuncio de Silvus (≈ 475 M USD de ventas y ≈ 45 % de margen EBITDA ajustado en 2025)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-05-27', url: `${ED}/000119312525127588/d934424dex992.htm` },
  { id: 11, titulo: 'Motorola Solutions Reports First-Quarter 2026 Financial Results (Bell Canada, Exacom, Hyper)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000006850526000018/msiq12026pressrelease.htm` },
  { id: 12, titulo: 'Why Motorola Solutions (MSI) shares are falling today (8-may-2026)', editor: 'StockStory', tipo: 'Prensa', fecha: '2026-05-08', url: 'https://stocks.observer-reporter.com/observerreporter/article/stockstory-2026-5-8-why-motorola-solutions-msi-shares-are-falling-today' },
  { id: 13, titulo: 'Motorola Solutions Reports Third-Quarter 2025 Financial Results', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-30', url: `${ED}/000006850525000050/msiq32025pressrelease.htm` },
  { id: 14, titulo: 'Motorola Solutions Reports Second-Quarter 2026 Financial Results', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000006850526000027/msiq22026pressrelease.htm` },
  { id: 15, titulo: 'Form 4 de directivos y consejeros (21-oct-2025 a 21-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000068505&type=4' },
  { id: 16, titulo: 'Motorola Solutions Announces Increase to Share Repurchase Program', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-09-09', url: `${ED}/000119312526386490/d492220dex991.htm` },
  { id: 17, titulo: 'Form 10-Q del 2T26 (acciones en circulación a 31-jul-2026: 165,49 M; Hytera)', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000006850526000028/msi-20260704.htm` },
  { id: 18, titulo: 'Folleto 424B2 de agosto de 2026 (bonos de 950 M USD para D-Fend)', editor: 'Motorola Solutions, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-10', url: `${ED}/000119312526342454/d162983d424b2.htm` },
  { id: 19, titulo: 'Motorola Solutions Reports Fourth-Quarter and Full-Year 2025 Financial Results (guía 2026)', editor: 'Motorola Solutions, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000006850526000006/msiq42025pressrelease.htm` },
];
const c = Y.MSI;
const tr = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
// Comparables: Yahoo del 21-oct-2026 (15:18 UTC, sesión abierta) [2]. PER de los próximos 12 meses = precio ÷ (peso × BPA del
// ejercicio en curso + resto × BPA del siguiente); con cierre en diciembre quedan 2,3 meses de 2026 (peso 0,19). Cisco cierra
// en julio: su ejercicio en curso (FY2027) tiene 9,3 meses por delante (peso 0,77). EV/EBITDA LTM de Yahoo (EBITDA publicado).
const FCF = { LHX: 1609, AXON: 222, TDY: 913, ZBRA: 577, TYL: 594, ALLE: 484, ROP: 2266, CSCO: 11183 };
const pais = { LHX: 'US', AXON: 'US', TDY: 'US', ZBRA: 'US', TYL: 'US', ALLE: 'US', ROP: 'US', CSCO: 'US' };
const nom = { LHX: 'L3Harris Technologies', AXON: 'Axon Enterprise', TDY: 'Teledyne Technologies', ZBRA: 'Zebra Technologies', TYL: 'Tyler Technologies', ALLE: 'Allegion', ROP: 'Roper Technologies', CSCO: 'Cisco Systems' };
const comps = Object.keys(nom).map((t) => {
  const y = Y[t]; const T = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const w = t === 'CSCO' ? 0.77 : 0.19;
  const bpaNtm = w * T['0y'].bpa + (1 - w) * T['+1y'].bpa;
  const ventasNtm = w * T['0y'].ventas + (1 - w) * T['+1y'].ventas;
  return { nombre: nom[t], ticker: t, pais: pais[t], capitalizacion: Math.round(y.cap / 1e6), ev_ventas: r2(y.ev / y.ventas), ev_ebitda_ltm: r1(y.ev / y.ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.precio / bpaNtm), crecimiento_pct: r1((ventasNtm / y.ventas - 1) * 100), margen_ebitda_pct: r1(y.ebitda / y.ventas * 100), roic_pct: null,
    dn_ebitda: r2((y.ev - y.cap) / y.ebitda), fcf_yield_pct: r1(FCF[t] / (y.cap / 1e6) * 100) };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2; })();
const bol = B.bolsa;
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (${n2(B.identificacion.precio)} USD); la sesión del 21-oct estaba abierta (${n2(r2(c.precio))} USD a las 15:18 UTC). Mediana del PER NTM de los comparables: ${n2(perMed)}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Motorola Solutions, Inc.', nombre_corto: 'Motorola Solutions', ticker: 'MSI', isin: 'US6200763075', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Equipos de comunicaciones', sede: 'Chicago (Illinois)', fundacion: '1928', empleados: 23000, web: 'https://www.motorolasolutions.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 166.9, capitalizacion_publicada: Math.round(c.cap / 1e6), free_float_pct: 99.6,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía de 2026 subida dos veces: en febrero, ventas de ≈ 12.700 M USD y BPA no GAAP de 16,70-16,85; en mayo, 12.800 M y 16,87-16,99; el 5-ago-2026, 12.975 M (+11 %) y 17,62-17,72 USD, con ≈ 168 M de acciones y un tipo no GAAP del 22-22,5 % [19, 11, 14]. Para el 3T26: ventas +8 % y BPA no GAAP de 4,39-4,44 USD [14]. Silvus ≈ 850 M de ventas en 2026. La empresa no da objetivos a medio plazo. La guía incluye 60 M de devoluciones de aranceles IEEPA (0,25 USD por acción) que no se repetirán [14].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(tr['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(tr['0y'].bpa), dpa: 4.84, fuente: `Yahoo Finance, ${tr['0y'].n} analistas, BPA no GAAP [2]` },
      { periodo: '2027e', ingresos: Math.round(tr['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(tr['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${tr['+1y'].n} analistas, BPA no GAAP [2]` },
    ],
    recomendaciones: { n_analistas: c.reco.strongBuy + c.reco.buy + c.reco.hold + c.reco.sell + c.reco.strongSell, comprar: c.reco.strongBuy + c.reco.buy, mantener: c.reco.hold, vender: c.reco.sell + c.reco.strongSell, po_medio: r2(c.po_medio), po_min: c.po_min, po_max: c.po_max },
    revisiones: `El BPA de 2026 del consenso subió de ${n2(r2(tr['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(tr['0y'].bpa))} hoy y el de 2027 de ${n2(r2(tr['+1y'].bpa_hace90))} a ${n2(r2(tr['+1y'].bpa))}, tras el 2T26 [2]. Objetivos al alza: Evercore 525 → 550 USD (8-oct), Piper Sandler 530 → 531 (22-sep), Northcoast 510 → 525, Truist 525 → 545, JPMorgan 525 → 545, Barclays 509 → 529, UBS 510 → 520, Raymond James 530 → 550 y Morgan Stanley 470 → 476 tras el 2T26; Zacks bajó de «compra fuerte» a «mantener» el 18-ago [3]. MarketBeat da 13 analistas (12 comprar, 1 mantener) con objetivo medio de 530,10 USD; Yahoo, ${c.n_analistas} objetivos con media ${n2(r2(c.po_medio))} USD (${c.po_min}-${c.po_max}) [3, 2]. El consenso de 2027 incluye D-Fend y Bell Canada; sin consenso gratuito de 2028.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA no GAAP y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(c.corto_pct * 100),
    comentario: 'La acción ha batido al índice a diez años (+22,0 % anual frente a +15,5 % del SPY) y a cinco, pero no en el último año (+4,5 % frente a +15,8 %) ni a tres (+19,4 % frente a +23,7 %) [1]. En 2025 cayó un 16,2 % con el mercado al alza: el múltiplo se desinfló desde ≈ 30 veces el BPA adelantado a finales de 2024 y la compra de Silvus abrió dudas; en 2026 recupera un 21,9 % por los resultados del 2T26 [1, 14]. Beta baja (0,88 mensual a cinco años; 0,49 semanal a dos) y volatilidad del 26 % en el último año, con dos caídas de más del 5 % en un día tras resultados [1].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 1.8, var_3m_pct: 14.3, var_6m_pct: 5.3, var_12m_pct: 3.7, dist_max_52s_pct: -5.3, dist_min_52s_pct: 27.8, dist_max_historico_pct: -7.8, tendencia: 'alcista', volatilidad_60d_pct: 24.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'oct-2025', var_pct: -5.8, causa: 'Caída del 5,8 % el 31-oct-2025 tras el 3T25: BPA no GAAP de 4,06 USD por encima de la guía, pero guía de ventas de 2025 sin cambios (11.650 M) y orgánico de solo +3 %; la acción ya bajaba desde máximos [13, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: -13.2, causa: 'Caída del 11,4 % el 8-may-2026 (−13,2 % en un mes) tras el 1T26: margen operativo GAAP del 19,3 % frente al 23,0 % por el earnout de Silvus y la amortización, flujo libre más bajo y ventas orgánicas en negativo (−1,3 %), aunque subió la guía [11, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026', var_pct: 18.4, causa: 'Subida del 18,4 % en un mes hasta el 19-ago tras el 2T26 (5-ago): ventas +13 %, BPA no GAAP de 4,41 USD frente a una guía de 3,82-3,88, cartera récord y guía anual subida a 17,62-17,72 USD [14, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-04', tipo: 'resultados', hecho: 'Resultados del 3T26 el 4-nov-2026 (guía: ventas +8 % y BPA no GAAP de 4,39-4,44 USD) [4, 14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'recomendación', hecho: 'Evercore sube el objetivo de 525 a 550 USD; consenso de 12 «comprar» y 1 «mantener» con objetivo medio de 530 USD (MarketBeat) [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-09', tipo: 'ampliación o convertible', hecho: 'Ampliación del programa de recompras en 2.000 M USD (≈ 2,6 % de la capitalización) [16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-02', tipo: 'directivos', hecho: 'Ventas de directivos por 101,5 M USD en 12 meses y ninguna compra; 87,4 M de Brown, casi todo al ejercer opciones de 2016-2017 a 71-81 USD antes de su vencimiento (motivo declarado en el Form 4); conserva ≈ 384.000 acciones y 1,19 M de opciones [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-20', tipo: 'fusión u oferta', hecho: 'Cierre de la compra de D-Fend (antidrones) por 1.500 M USD, pagada con 950 M de bonos, 300 M de préstamo y caja; deuda bruta ajustada de 10.467 M [4, 18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-18', tipo: 'recomendación', hecho: 'Zacks baja de «compra fuerte» a «mantener»; el resto de casas suben objetivos tras el 2T26 [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-07', tipo: 'fusión u oferta', hecho: 'Acuerdo para comprar los servicios de redes LMR de Bell Canada por 675 M CAD (≈ 500 M USD), con cierre previsto en el 4T26 [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-05', tipo: 'demanda o regulador', hecho: 'Hytera condenada en lo penal: deberá pagar 100 M USD al año a Motorola hasta saldar la condena civil (232 M cobrados); Motorola recurre la sentencia [17].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-04',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sube un 14,3 % en tres meses y está un 5,3 % por debajo de su máximo de 52 semanas y un 7,8 % del histórico, con tendencia alcista (6,7 % sobre la media de 200 sesiones) y sin avisos P [1]. Los tres movimientos fuertes tienen causa en resultados de la propia empresa: el castigo del 1T26 por el margen GAAP y el orgánico negativo, y la recuperación con el 2T26 [11, 14]. No hay colocaciones, ampliaciones ni decisiones judiciales con fecha que puedan mover el precio más de un 5 % en contra: Hytera es un cobro, no un pago, y el earnout de Silvus se paga en acciones (hasta ≈ 1,3 M, 0,8 % del capital) [17]. Las ventas de Brown son ejercicio de opciones con vencimiento, no una salida sin motivo. Los resultados del 4-nov no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => ANIOS.includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada año de Yahoo [1]. Con el BPA GAAP del mismo año el PER va de ≈ 33 veces (2019) a ≈ 50 (2024, por la pérdida del convertible de Silver Lake) y ≈ 30 en 2025; en base no GAAP adelantada (la de la regla a 12 meses) pasa de ≈ 14 veces a finales de 2018 a 21-23 en 2021-2023, ≈ 30 a finales de 2024 y ≈ 22 a finales de 2025 [1, 8]. El mercado revalorizó la empresa por la mezcla hacia software y servicios recurrentes y un crecimiento del BPA no GAAP del 11-15 % anual desde 2021; en 2025 devolvió parte de la subida.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Ocho cotizadas de EE. UU. con negocio de seguridad, comunicaciones críticas o software para gobiernos y calidad parecida: L3Harris (radio P25 y defensa), Axon (vídeo y software policial), Teledyne (vídeo térmico, FLIR), Zebra (terminales robustos), Tyler (software público), Allegion (control de accesos), Roper (software vertical, comprador en serie) y Cisco (redes) [2]. Fuera Hytera y JVCKenwood (sin consenso fiable o márgenes de electrónica de consumo) y Hexagon (cifras en dos divisas en Yahoo). Ninguna es un comparable puro: Motorola es la única con radio crítica, vídeo y software de emergencias juntos.',
    empresas: comps,
    comentario: `Motorola cotiza a ≈ 24 veces el BPA no GAAP de los próximos 12 meses, por encima de la mediana de los comparables (${n2(perMed)}x) y al nivel de Teledyne y Tyler; solo Axon (crecimiento del 30 %) cotiza mucho más caro [2]. La prima frente a L3Harris (≈ 18x) se apoya en un margen EBITDA del 31 % frente al 18 % y en más ingresos recurrentes; frente a Roper (≈ 16x), en más crecimiento orgánico. El EV/EBITDA LTM (22,8x) no es comparable entre todas porque mezcla EBITDA con y sin pagos en acciones; el PER es la referencia. Múltiplo de referencia: la mediana (${n2(perMed)}x), que el motor usa como suelo del alcista; aplicada al BPA de Motorola da un valor claramente inferior al precio.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Silvus Technologies (MANET para drones y defensa)', comprador: 'Motorola Solutions', ev: 4400, ev_ventas: 9.26, ev_ebitda: 20.6, prima_pct: null, excluir: false, comentario: 'Sobre ventas de ≈ 475 M USD y margen EBITDA ajustado del ≈ 45 % previstos para 2025; más un earnout de hasta 600 M [10].' },
      { fecha: '2021-05', objetivo: 'FLIR Systems (imagen térmica y vídeo)', comprador: 'Teledyne Technologies', ev: 8200, ev_ventas: 4.26, ev_ebitda: 19.9, prima_pct: null, excluir: false, comentario: 'Ventas de 1.924 M USD y EBITDA GAAP de 412 M en 2020 (resultado operativo 317 + amortizaciones 95) [7, 9].' },
      { fecha: '2024-07', objetivo: 'Everbridge (gestión de emergencias críticas, software)', comprador: 'Thoma Bravo', ev: 1800, ev_ventas: 4.01, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas de 449 M USD en 2023; EBITDA GAAP negativo (−3 M) [8, 9].' },
      { fecha: '2026-08', objetivo: 'D-Fend Solutions (antidrones)', comprador: 'Motorola Solutions', ev: 1500, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin ventas publicadas [18].' },
      { fecha: '2026-05', objetivo: 'Servicios de redes LMR de Bell Canada', comprador: 'Motorola Solutions', ev: 500, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '675 M CAD; cierre previsto en el 4T26 [11].' },
    ],
    comentario: 'Las compras del sector se pagan a 4-9 veces las ventas y ≈ 20 veces el EBITDA cuando el negocio es de crecimiento (Silvus, FLIR); Motorola cotiza a ≈ 7,0 veces las ventas y ≈ 23 veces el EBITDA LTM, en la parte alta de ese rango, sin prima de control [2]. Con ≈ 77.000 M USD de capitalización y sin accionista de control, no es objetivo realista de una compra: el valor de control no cuenta en la tesis.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA del consenso y BPA de 2028e', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo 2026 y 2027, sin EBITDA); 2) MarketBeat (objetivos, sin estimaciones a 2028); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ROIC homogéneo de los comparables', tipo: 'Complemento', intentos: '1) Yahoo (no lo da); 2) Stock Analysis (no consultado por presupuesto); 3) cálculo propio no homogéneo', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de $MSI (30 mensajes, agosto-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://stocktwits.com/symbol/MSI' },
  { id: 2, titulo: 'Seeking Alpha, artículos y noticias de MSI (RSS, mayo-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://seekingalpha.com/symbol/MSI' },
  { id: 3, titulo: 'MarketBeat, titulares y artículos de opinión de MSI (agosto-octubre de 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://www.marketbeat.com/stocks/NYSE/MSI/news/' },
];
const E = {
  _estado: 'Completa con tres sitios (Reddit y foros con 403).',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mayoría alcista desde el 2T26 («vuelta a máximos», «objetivo 500») y comparaciones con Axon tras publicar el mismo día; algún bajista aislado que abre cortos o rota a Cisco [1].' },
      { plataforma: 'Seeking Alpha', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'Artículos favorables («rentabilidad futura atractiva tras un trimestre fuerte», «infravalorada para inversores de dividendo») junto a dudas sobre la apuesta de 1.500 M en antidrones y una lista de «gigantes que no se han movido en un año» [2].' },
      { plataforma: 'MarketBeat (artículos y titulares)', fecha: '2026-10', n_comentarios: 15, tono: 'Dividido', resumen: 'Titulares que la ven a la vez «infravalorada un 11 %» y «sobrevalorada frente a su valor razonable»; atención a las ventas del consejero delegado y a la demanda de defensa [3].' },
    ],
    temas: [
      { tema: 'Resultados y guía tras el 2T26', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: BPA no GAAP de 4,41 USD frente a una guía de 3,82-3,88 y guía anual subida; pero 0,25 USD vinieron de las devoluciones IEEPA, que no se repiten [1, 2].' },
      { tema: 'Competencia con Axon y Flock en vídeo y matrículas', postura: 'Dividida', peso: 'Medio', contraste: 'El vídeo de Motorola crece ≈ 10 % frente a ≈ 35 % de Axon: gana dinero pero pierde peso en la parte de más crecimiento [1, 3].' },
      { tema: 'Compras en defensa y drones (Silvus, D-Fend)', postura: 'Dividida', peso: 'Medio', contraste: 'Silvus va por encima del plan (≈ 850 M USD en 2026); D-Fend no tiene cifras publicadas y sube la deuda [2].' },
      { tema: 'Valoración', postura: 'Dividida', peso: 'Medio', contraste: 'A ≈ 24 veces el BPA no GAAP adelantado, por encima de los comparables; el informe le da un valor intrínseco inferior al precio [3].' },
    ],
    lectura: 'El inversor particular está más contento que hace seis meses (tras el castigo de mayo), pero sin euforia: los temas que preocupan (competencia en vídeo, deuda por compras, valoración) son los mismos que recoge el informe. Nada en los foros contradice las cifras ni señala un riesgo nuevo; el sentimiento no aporta a la decisión más allá de confirmar que el mercado ya descuenta un buen 2T26 y espera más subidas de guía.',
    confianza: 'Baja',
  },
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit y foros de particulares', tipo: 'Complemento', intentos: '1) Reddit (403); 2) foros de Yahoo (requiere sesión); 3) Motley Fool (sin hilos recientes de MSI)', decision: 'Omitido' }],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER NTM comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(' · '));
