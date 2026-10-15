// Escribe las notas A-E de Trane Technologies (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// los 10-K 2020, 2022 y 2025, el 10-Q del 2T26, las notas de prensa de resultados (8-K 99.1), el proxy de 2026,
// Form 4, bolsa.mjs, Yahoo Finance, Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/1466258';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas; ingresos por producto y servicio y por segmento; deuda; pensiones; cartera de pedidos; Aldrich y Murray)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-05', url: `${E}/000162828026005731/tt-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001466258.json' },
  { id: 3, titulo: 'Trane Technologies Reports Strong Second Quarter Results; Raises Full-Year Revenue and EPS Guidance (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E}/000162828026050743/exhibit991-q22026earningsr.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (compras de Stellar Energy y LiquidStack, 49 % de Kieback&Peter, acciones en circulación)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E}/000162828026051117/tt-20260630.htm` },
  { id: 5, titulo: 'Resultados del 1T26 (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${E}/000162828026028547/exhibit991-q12026earningsr.htm` },
  { id: 6, titulo: 'Resultados del 4T25 y del ejercicio 2025, guía 2026 (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-29', url: `${E}/000162828026003953/exhibit991-q42025earningsr.htm` },
  { id: 7, titulo: 'Resultados del 3T25 (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-30', url: `${E}/000162828025047261/exhibit991-q32025earningsr.htm` },
  { id: 8, titulo: 'Resultados del 2T25 (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-07-30', url: `${E}/000146625825000149/exhibit991-q22025earningsr.htm` },
  { id: 9, titulo: 'Resultados del 1T25 (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-04-30', url: `${E}/000146625825000121/exhibit991-q12025earningsr.htm` },
  { id: 10, titulo: 'Resultados del 4T24 y guía 2025 (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-01-30', url: `${E}/000146625825000005/exhibit991-q42024earningsr.htm` },
  { id: 11, titulo: 'Form 10-K 2022 (cuenta de resultados 2020-2022 de las actividades continuadas; segmentos 2020-2022)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-10', url: `${E}/000146625823000058/tt-20221231.htm` },
  { id: 12, titulo: 'Form 10-K 2020 (datos seleccionados 2016-2020 de las actividades continuadas tras la separación de Ingersoll Rand Industrial)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-09', url: `${E}/000146625821000027/tt-20201231.htm` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Beneficio y BPA de las actividades continuadas (el XBRL da el total con las discontinuadas: Aldrich, Murray e Industrial)
const contNI = { 2020: 977.2, 2021: 1444.0, 2022: 1778.0, 2023: 2051.1, 2024: 2592.6, 2025: 2955.6 };
const contBPA = { 2020: 4.02, 2021: 5.96, 2022: 7.57, 2023: 8.89, 2024: 11.35, 2025: 13.14 };
const minor = { 2020: 14.2, 2021: 13.2, 2022: 18.2, 2023: 17.8, 2024: 21.6, 2025: 17.1 };
const coste = { 2020: 8651.3, 2021: 9666.8, 2022: 11026.9, 2023: 11820.4, 2024: 12757.7, 2025: 13611.7 };
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: coste[y], gastos_generales: c.gastos_generales, ebitda: r1(c.ebit + c.amortizaciones), amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: minor[y], beneficio_neto: contNI[y], gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: contBPA[y], dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones, desinversiones: f.desinversiones, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0 };
});
const seg = (nombre, descripcion, ing, res) => ({ nombre, descripcion, tipo_resultado: 'EBITDA', historico: ANIOS.map((y, i) => ({ periodo: y, ingresos: ing[i], resultado: res[i] })) });
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 22209.9, ebitda: 4374.9, ebit: 3984.7, beneficio_neto: 2999.6, bpa: 13.42, dpa: 3.98, dpa_extraordinario: 0, fcf: 3556, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Desde la separación del negocio industrial (29-feb-2020) Trane es un grupo de climatización puro y las cifras de 2020-2025 tienen el mismo perímetro [2, 12]. Los ingresos pasan de 12.455 M USD en 2020 a 21.322 M en 2025 (+11,4 % anual), casi todo orgánico: las compras sumaron un 0,8 % en 2025 (volumen +3,2 %, precio +3,0 %) [1]. El margen EBIT sube del 12,3 % de 2020 al 18,6 % de 2025: margen bruto del 36,2 % (+50 pb en 2025) por productividad y precio, y gastos comerciales y generales que bajan del 18,2 % al 17,6 % de las ventas [1]. En el 1S26 las ventas crecen un 8,5 % (orgánico ≈ +6 %) y el margen EBIT cae del 19,0 % al 17,7 % por la amortización de la cartera comprada con Stellar Energy, reestructuración y la reinversión en EMEA [3, 5]. El beneficio que usamos es el de las actividades continuadas: las discontinuadas (−37 M en 2025) son los gastos legales de las filiales en concurso por amianto (Aldrich y Murray) [1].',
    ajustes: 'La empresa publica un BPA ajustado que excluye reestructuración, costes de compras, la amortización de la cartera de pedidos adquirida (14,7 M en el 2T26) y ajustes de contraprestaciones contingentes; en 2025 el ajustado (13,06 USD) quedó por DEBAJO del contable (13,14) porque la liberación de contraprestaciones contingentes (61,2 M) bajó los gastos [1, 6]. En 2026 la guía contable es de 15,00-15,10 USD y la ajustada de 15,20-15,30 [3]. Usamos el BPA contable de las actividades continuadas; la diferencia con el ajustado es de un 1-2 % y no cambia la valoración. La reestructuración (31 M en 2025, 5 M en 2024, 15 M en 2023) se repite todos los años y no se trata como no recurrente.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 5441, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1127, margen_ebitda_pct: 20.7, bpa: 3.43, vs_consenso: null },
      { periodo: '4T24', ingresos: 4874, crecimiento_pct: 10, crecimiento_organico_pct: 10, ebitda: 894, margen_ebitda_pct: 18.3, bpa: 2.67, vs_consenso: null },
      { periodo: '1T25', ingresos: 4688, crecimiento_pct: 11, crecimiento_organico_pct: 11, ebitda: 851, margen_ebitda_pct: 18.1, bpa: 2.71, vs_consenso: null },
      { periodo: '2T25', ingresos: 5746, crecimiento_pct: 8, crecimiento_organico_pct: 7, ebitda: 1250, margen_ebitda_pct: 21.8, bpa: 3.87, vs_consenso: null },
      { periodo: '3T25', ingresos: 5743, crecimiento_pct: 6, crecimiento_organico_pct: 4, ebitda: 1252, margen_ebitda_pct: 21.8, bpa: 3.82, vs_consenso: null },
      { periodo: '4T25', ingresos: 5145, crecimiento_pct: 6, crecimiento_organico_pct: 4, ebitda: 923, margen_ebitda_pct: 17.9, bpa: 2.74, vs_consenso: null },
      { periodo: '1T26', ingresos: 4969, crecimiento_pct: 6, crecimiento_organico_pct: 3, ebitda: 881, margen_ebitda_pct: 17.7, bpa: 2.66, vs_consenso: null },
      { periodo: '2T26', ingresos: 6354, crecimiento_pct: 11, crecimiento_organico_pct: 9, ebitda: 1340, margen_ebitda_pct: 21.1, bpa: 4.20, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'EBITDA ajustado de la empresa y BPA contable de las actividades continuadas. En el 2T26 los pedidos orgánicos subieron un 37 % (Climatización comercial de América +50 %; equipos aplicados, que incluyen las enfriadoras para centros de datos, +130 %), la relación pedidos/facturación fue del 123 % y la cartera llegó al récord de 12.100 M USD (+70 %) [3]. La dirección subió la guía 2026 por segunda vez: crecimiento orgánico ≈9 % (antes ≈7 %; en enero, 6-7 %) y BPA ajustado de 15,20-15,30 USD (enero: 14,65-14,85) [3, 5, 6]. El mensaje cambió entre enero y julio: de un año de transición en residencial (cambio de refrigerante) a residencial y transporte «mejorando» [3, 6]. Lo que no se resuelve: el margen bajó 60-100 pb en el trimestre (EMEA −420 pb en margen EBIT ajustado por la integración de compras y el conflicto de Oriente Medio; Asia −60 pb) y la dirección no da el peso de los centros de datos en la cartera [3]. El 2T26 superó el consenso en 0,05 USD de BPA ajustado y en 150 M de ventas (Seeking Alpha, 30-jul-2026). Los trimestres de 2025 salen de sus notas de prensa [7-10].',
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 693 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 548.5 }, { anio: '2029', importe: 747.8 }, { anio: '2030', importe: 0 }, { anio: '2031+', importe: 2625.8 }],
    liquidez: 'Caja de 1.318 M USD a 30-jun-2026 y dos líneas de crédito comprometidas de 1.000 M cada una sin disponer (vencen en abril de 2027 y mayo de 2030), que respaldan un programa de pagarés de 2.000 M sin saldo vivo [1, 3].',
    rating: 'BBB (S&P) / Baa1 (Moody\'s), según la prensa financiera; no figura en el 10-K (estimación sin fuente primaria).',
    coste_deuda_pct: 4.8,
    vida_media_anios: 10.5,
    otros_pasivos: 'Pensiones con un déficit neto de 194,6 M USD a cierre de 2025 y obligaciones de salud de jubilados sin fondo de 217,0 M [1]. Las filiales Aldrich y Murray (amianto) están en concurso desde junio de 2020 y fuera del perímetro; Trane tiene acuerdos de financiación para pagar su fideicomiso del artículo 524(g): en 2022 aportó 270 M a un fondo de liquidación y las discontinuadas cargan 26-37 M al año de gastos legales; el comité de demandantes impugna la reestructuración de 2020 [1]. Hay obligaciones con opción de venta anual por 293 M (256 M ejercitables en noviembre de 2026) y garantías de ahorro energético en contratos de servicios [1]. Contraprestaciones contingentes de compras: 60,6 M en 2026 [4].',
    comentario: 'La deuda financiera bruta lleva estable en 4.600-4.800 M USD desde 2021 mientras el EBITDA casi se dobla: la deuda neta baja de 1,1 veces el EBITDA en 2020 a 0,7 veces en 2025, y a 30-jun-2026 es de 3.299 M (caja 1.318 M) tras pagar 742 M en compras y 756 M en recompras en el semestre [1, 3]. El capital circulante comercial (clientes + existencias − proveedores) ronda el 15 % de las ventas, pero la empresa cobra anticipos de clientes (pasivos de contrato de 1.725 M en 2025) que lo dejan en el 0,9 % de las ventas con su definición [3]. El fondo de comercio sube a 7.032 M por Stellar Energy (379 M) y LiquidStack [4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La caja operativa pasa de 1.435 M USD en 2020 a 3.195 M en 2025, con conversión del beneficio superior al 100 % desde 2023 (2022 fue bajo por los inventarios y por los 270 M del fondo del amianto) [1, 11]. El capex es pequeño (1,8 % de las ventas en 2025, 383 M) y la empresa no separa mantenimiento y crecimiento; estimación propia: el mantenimiento ronda la amortización material (≈1,3 % de las ventas) y el resto es capacidad para enfriadoras y centros de datos. En 1S26 la caja libre fue de 1.603 M, casi el doble que un año antes, por los anticipos de los grandes pedidos [3]. De 2020 a 2025 la caja se usó en dividendos (≈4.000 M), recompras (≈6.000 M) y compras (≈2.000 M), sin subir la deuda.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 120, opinion: 'Favorable (sin salvedades; control interno eficaz)',
    comentario: 'PwC audita a la empresa «al menos desde 1906» [1]: una relación muy larga, que es más un riesgo de familiaridad que una alerta. La materia crítica de auditoría es el reconocimiento de ingresos de contratos en el tiempo (21 % de las ventas) [1]. No hay capitalización de I+D (348 M de gasto en 2025). Los pagos en acciones son modestos frente al beneficio. Dos partidas piden atención: (1) las liberaciones de contraprestaciones contingentes (61 M en 2025, 25 M en 2024, 47 M en 2022) suben el beneficio contable [1, 11]; (2) el amianto se lleva por debajo de la línea, en discontinuadas, y la impugnación de la reestructuración de 2020 no tiene provisión [1]. Lectura de los indicadores de calidad del informe: Altman, Piotroski y Beneish sin señales de manipulación; el Altman alto refleja la capitalización bursátil, no solo el balance.',
    senales: [
      { senal: 'Contraprestaciones contingentes liberadas a resultados', nivel: 'Baja', comentario: '61,2 M en 2025 (≈0,2 USD por acción): el BPA ajustado de 2025 fue inferior al contable por esto [1].' },
      { senal: 'Amianto de Aldrich y Murray fuera del perímetro', nivel: 'Media', comentario: 'Concurso desde 2020; la impugnación del comité de demandantes podría devolver pasivos al grupo [1].' },
      { senal: 'Auditor con más de un siglo de relación', nivel: 'Baja', comentario: 'PwC desde al menos 1906 [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'La empresa declara un dividendo «competitivo y creciente» y desplegar el 100 % de la caja sobrante en el tiempo; el dividendo trimestral pasa de 0,53 USD (2020) a 1,05 (2026, +12 %) [1]. Hay 4.800 M de recompras autorizadas a cierre de 2025 (autorización de 5.000 M de diciembre de 2024); hasta julio de 2026 se destinaron 840 M a recompras, 690 M a dividendos y 340 M comprometidos en compras [1, 3].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Stellar Energy Americas (refrigeración llave en mano de centros de datos)', importe: 553.4, ev_ebitda: null, financiacion: 'Caja (se adquirieron 185,4 M de caja)', resultado: 'Fondo de comercio de 379 M e intangibles de 315 M; demasiado pronto para juzgar [4].' },
      { anio: '2026', objetivo: 'LiquidStack (refrigeración líquida; resto del capital) y distribuidores de Thermo King; 49 % de Kieback&Peter', importe: 314.8, ev_ebitda: null, financiacion: 'Caja, con 60,6 M contingentes', resultado: 'Ganancia no monetaria por la participación previa en LiquidStack [3, 4].' },
      { anio: '2025', objetivo: 'BrainBox AI (optimización de climatización con IA) y compras en EMEA', importe: 276, ev_ebitda: null, financiacion: 'Caja', resultado: 'EMEA perdió 150 pb de margen por la integración [1].' },
      { anio: '2023', objetivo: 'MTA S.p.A. (refrigeración de procesos industriales, Italia)', importe: 224.4, ev_ebitda: null, financiacion: 'Pagarés y caja', resultado: 'Sin deterioros [1].' },
    ],
    comentario: 'Asignación de capital disciplinada: de 2020 a 2025 devolvió unos 10.000 M (dividendos y recompras) frente a ≈2.000 M en compras pequeñas, sin endeudarse y con el número de acciones diluidas bajando de 243 a 225 M (−1,5 % al año) [1]. Las compras son complementos tecnológicos (refrigeración líquida, control con IA) que no han deteriorado fondo de comercio. El giro de 2026 es más caro: ≈870 M en Stellar y LiquidStack para ganar posición en centros de datos.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('América', 'Climatización comercial (enfriadoras, sistemas aplicados, controles, servicios energéticos), residencial y Thermo King en Norteamérica y Latinoamérica', [9685.9, 10957.1, 12640.8, 13832.0, 15903.2, 17168.8], [1677.7, 2008.8, 2326.3, 2669.6, 3318.3, 3713.4]),
      seg('EMEA', 'Climatización comercial, servicios y Thermo King en Europa, Oriente Medio y África', [1648.1, 1944.9, 2034.5, 2401.2, 2556.7, 2802.1], [265.7, 359.2, 338.1, 464.7, 505.1, 512.7]),
      seg('Asia-Pacífico', 'Climatización comercial, servicios y Thermo King en Asia-Pacífico', [1120.7, 1234.4, 1316.4, 1444.4, 1378.3, 1351.0], [188.8, 228.5, 248.3, 321.3, 329.3, 323.5]),
    ],
    geografias: [{ nombre: 'América', peso_pct: 80.5 }, { nombre: 'EMEA', peso_pct: 13.1 }, { nombre: 'Asia-Pacífico', peso_pct: 6.4 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Pedidos (M USD)', valor_anterior: '2024: ≈20.300', valor_actual: '2025: 22.600 (2T26: 7.818, +39 %)', variacion: '+11 % orgánico', comentario: 'Récord; equipos aplicados de América +130 % en el 2T26 [3, 6].' },
      { kpi: 'Cartera de pedidos (M USD)', valor_anterior: 'Dic-2024: 6.748', valor_actual: 'Dic-2025: 7.769; jun-2026: 12.100', variacion: '+15 % y +70 % interanual', comentario: 'Ingresos de 2026-2027 asegurados en buena parte [1, 3].' },
      { kpi: 'Servicios (% de ventas)', valor_anterior: '2023: 32,3 %', valor_actual: '2025: 34,4 %', variacion: '+2,1 pp', comentario: '7.340 M USD de servicios recurrentes sobre la base instalada [1].' },
      { kpi: 'Crecimiento orgánico', valor_anterior: '2024: ≈12 %', valor_actual: '2025: 6,2 %; guía 2026 ≈9 %', variacion: '', comentario: 'Volumen +3,2 % y precio +3,0 % en 2025 [1, 3].' },
      { kpi: 'Margen EBITDA ajustado de la empresa', valor_anterior: '2024: 19,4 %', valor_actual: '2025: 20,1 %', variacion: '+70 pb', comentario: 'El 2T26 bajó 70 pb [3, 6].' },
      { kpi: 'Relación pedidos/facturación', valor_anterior: '2T25: 98 %', valor_actual: '2T26: 123 %', variacion: '+25 pp', comentario: 'Mayor que 100 % en las tres regiones [3].' },
    ],
  },
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, productos, competencia, distribución, estacionalidad, empleados y riesgos', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-05', url: `${E}/000162828026005731/tt-20251231.htm` },
  { id: 2, titulo: 'HVAC System Market worth $407.77 billion by 2030 (MarketsandMarkets)', editor: 'MarketsandMarkets (vía Webull)', tipo: 'Sectorial', fecha: '2025-09', url: 'https://www.webull.com/news/13414319103181824' },
  { id: 3, titulo: 'HVAC market to reach USD 382.66 billion by 2030 (Grand View Research)', editor: 'Refindustry', tipo: 'Sectorial', fecha: '2025-12', url: 'https://refindustry.com/news/market-research/hvac-market-to-reach-usd-382-66-billion-by-2030/' },
  { id: 4, titulo: 'Ficha sectorial «Componentes de climatización (HVAC) y control de edificios» y comparables de Yahoo Finance del 14-oct-2026', editor: 'Yahoo Finance (quoteSummary) recopilado en el repositorio', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/TT/' },
  { id: 5, titulo: 'Is Nvidia disrupting HVAC? Johnson Controls, Trane shares dip amid cooling shift (Barclays: centros de datos ≈10 % de las ventas de Trane)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-01-06', url: 'https://www.investing.com/news/stock-market-news/is-nvidia-disrupting-hvac-johnson-controls-trane--shares-dip-amid-cooling-shift-4432573' },
  { id: 6, titulo: 'Eaton Signs Agreement to Acquire Boyd Thermal (9.500 M USD, 22,5 veces el EBITDA ajustado 2026e)', editor: 'Eaton / Business Wire', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/Eaton-Signs-Agreement-to-Acquire-Boyd-Thermal-Expanding-Solutions-for-Data-Center-Customers-to-Include-Critical-Liquid-Cooling-Technology' },
  { id: 7, titulo: 'Form 10-Q del 2T26 (Stellar Energy, LiquidStack, Kieback&Peter; tendencias de mercado)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E}/000162828026051117/tt-20260630.htm` },
  { id: 8, titulo: 'Trane Technologies, Eaton unveil power and cooling design for AI data centers', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-08-17', url: 'https://seekingalpha.com/symbol/TT' },
  { id: 9, titulo: 'Resultados del 2T26 (8-K, anexo 99.1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E}/000162828026050743/exhibit991-q22026earningsr.htm` },
  { id: 10, titulo: 'Form 10-K 2020 (separación de Ingersoll Rand Industrial, febrero de 2020)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-09', url: `${E}/000146625821000027/tt-20201231.htm` },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Trane nace de la fusión de dos marcas centenarias dentro de Ingersoll-Rand: Thermo King (refrigeración de transporte, comprada en 1997) y Trane (climatización comercial, comprada a American Standard en 2008 por ≈10.000 M USD). En 2009 el grupo se domicilia en Irlanda. En febrero de 2020 separa su negocio industrial y lo fusiona con Gardner Denver (Reverse Morris Trust): lo que queda se llama Trane Technologies, un grupo puro de climatización [10]. En junio de 2020 lleva a concurso dos filiales con el amianto heredado (Aldrich y Murray) [1]. Desde entonces ha casi doblado sus ingresos y en 2025-2026 compra posiciones en refrigeración de centros de datos (BrainBox AI, Stellar Energy, LiquidStack) [1, 7].',
    hitos: [
      { anio: '1913', hito: 'Fundación de Trane en La Crosse (Wisconsin).' },
      { anio: '1938', hito: 'Fundación de Thermo King (primer equipo de frío para camiones).' },
      { anio: '1997', hito: 'Ingersoll-Rand compra Thermo King.' },
      { anio: '2008', hito: 'Ingersoll-Rand compra Trane a American Standard.' },
      { anio: '2020', hito: 'Separación del negocio industrial (29-feb) y nace Trane Technologies; Aldrich y Murray en concurso por amianto (18-jun) [1, 10].' },
      { anio: '2021', hito: 'Dave Regnery, consejero delegado (julio); presidente desde enero de 2022 [1].' },
      { anio: '2025', hito: 'Compra de BrainBox AI (control de climatización con IA) [1].' },
      { anio: '2026', hito: 'Compras de Stellar Energy (553 M) y del resto de LiquidStack; 49 % de Kieback&Peter; cartera récord de 12.100 M [7, 9].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Trane diseña, fabrica, instala y mantiene equipos de climatización (calefacción, ventilación y aire acondicionado) para edificios comerciales e industriales (enfriadoras, unidades de cubierta, sistemas de agua y de aire, bombas de calor, controles y gestión de edificios), viviendas (marca Trane y American Standard) y transporte refrigerado (Thermo King: equipos de frío para camiones, remolques, contenedores y autobuses) [1]. Vende a constructoras, ingenierías, propietarios de edificios, centros de datos, hospitales, fábricas y flotas, por oficinas comerciales propias, distribuidores y concesionarios. En 2025 facturó 21.322 M USD: 66 % equipos y 34 % servicios y repuestos; el 75 % en EE. UU. [1]. Tiene unos 44.000 empleados en 62 países y fábricas en las tres regiones con la estrategia «en la región, para la región» [1].',
    como_gana_dinero: 'El beneficio sale de la climatización comercial: equipos aplicados (enfriadoras de gran tamaño) que se diseñan a medida para cada edificio o centro de datos y que se especifican en el proyecto; luego, 20-30 años de servicio, repuestos y contratos de mantenimiento sobre la base instalada (34 % de las ventas en 2025, recurrentes y de mayor margen) [1]. El 79 % de los ingresos se reconoce en un momento puntual y el 21 % a lo largo del contrato [1]. El margen depende del precio (+3,0 % en 2025), la productividad de fábrica y la mezcla (más aplicados y servicios); los costes son acero, cobre, aluminio y componentes. La demanda es estacional (2T y 3T, verano del hemisferio norte) [1]. Apalancamiento operativo: en 2025 cada dólar adicional de ventas dejó ≈31 céntimos de EBIT.',
    clientes: 'Ningún cliente supera el 10 % de las ventas en 2023-2025 ni hay dependencia de un grupo pequeño [1]. Barclays estima que los centros de datos son ≈10 % de las ventas de Trane [5]; con la cartera del 2T26 (equipos aplicados de América +130 %) ese peso sube. Los contratos de servicio duran de 12 a 60 meses [1]. El poder de precios está demostrado: precio +3,0 % en 2025 (+3,8 % en América) con inflación de costes y aranceles, y el margen bruto subió 50 pb [1]. Thermo King depende del ciclo de flotas de transporte por carretera en EE. UU., débil en 2025-2026 [1, 7].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el de sistemas de climatización (equipos y servicios) para edificios comerciales, residenciales e industriales y el frío de transporte, en todo el mundo. Usamos la medida de MarketsandMarkets (≈299.000 M USD en 2025, +6,4 % anual hasta 2030) [2] y la contrastamos con Grand View Research (≈259.000 M USD en 2025, +7 % anual) [3]: la diferencia es de perímetro (servicios y residencial). Trane pesa más en la parte comercial aplicada de Norteamérica, donde es líder; su peso sobre el total mundial ronda el 7 % [1, 2].',
    tamano: '≈299.000 M USD en 2025 (MarketsandMarkets) [2]; ≈259.000 M USD (Grand View Research) [3].',
    unidad_serie: 'miles de millones de USD (MarketsandMarkets; 2026-2030 previsión)',
    serie: [
      { anio: '2025', tamano: 299 }, { anio: '2026e', tamano: 318 }, { anio: '2027e', tamano: 338 }, { anio: '2028e', tamano: 360 }, { anio: '2029e', tamano: 383 }, { anio: '2030e', tamano: 408 },
    ],
    tcac_historico_pct: null, tcac_previsto_pct: 6.4, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Equipos aplicados de América +130 % en pedidos del 2T26; compras de Stellar Energy y LiquidStack [7, 9].' },
      { driver: 'Eficiencia energética y descarbonización de edificios', efecto: '+', horizonte: 'Estructural', evidencia: 'Bombas de calor y renovación; la empresa lo cita como motor de la climatización comercial de América y Europa [1].' },
      { driver: 'Cambio de refrigerantes (AIM Act, gases fluorados)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Hundió el residencial de EE. UU. en 2025 y sube el precio medio [1].' },
      { driver: 'Obra nueva no residencial y tipos de interés', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Bono a 10 años de EE. UU. del 5,2 %; la empresa cita los tipos altos como incertidumbre en residencial [1].' },
      { driver: 'Transporte por carretera (Thermo King)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Demanda débil de transporte refrigerado en 2025-2026 [1, 7].' },
      { driver: 'Aranceles de EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Repercutidos en precio; producción regional [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco grandes (Carrier, Daikin, Johnson Controls, Trane, Lennox) más especialistas; en aplicados compiten por especificación y plazo, no solo precio [1, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Hiperescaladores con pedidos enormes negocian; el resto de clientes está atomizado (ninguno > 10 %) [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Acero, cobre y aluminio de muchos proveedores; algunos componentes con escasez puntual [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Base instalada, red de servicio y especificación en ingenierías; en refrigeración líquida entran integradores eléctricos (Eaton, Schneider, Vertiv) [6].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Chips que toleran agua más caliente pueden reducir enfriadoras en centros de datos (comentario de Nvidia de enero de 2026) [5].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La climatización comercial está en expansión por centros de datos (cartera +70 %), mientras residencial y transporte salen de un fondo en 2025 [1, 9]. En 2020 los ingresos de Trane cayeron un 4,8 % y en 2009 los del sector un 10-20 % (ficha sectorial) [4, 10]; 2022 fue de desabastecimiento y subidas de precio. El riesgo de ciclo está en la obra nueva y en el capex de centros de datos; el servicio (34 %) amortigua.' },
    regulacion: 'En EE. UU., la AIM Act obliga desde el 1-ene-2025 a refrigerantes de menor potencial de calentamiento (R-454B, R-32), con un año de transición en residencial [1]; en la UE, el reglamento de gases fluorados de 2024 y la directiva de eficiencia de edificios (EPBD refundida) empujan bombas de calor y automatización. Los aranceles de 2025 de EE. UU. y las respuestas de otros países cambian costes de componentes [1].',
    tendencias: 'Tres tendencias favorecen a Trane: la electrificación de la calefacción (bombas de calor), la refrigeración de centros de datos (por aire y líquida directa al chip, con la compra de LiquidStack y la colaboración con Eaton para diseños de potencia y frío) [7, 8] y el control digital con IA (BrainBox AI) [1]. La amenaza tecnológica es que los chips nuevos necesiten menos enfriadoras: el 6-ene-2026 la acción cayó un 5 % por ese comentario [5]. Gana si sigue vendiendo el sistema completo (enfriadora, líquido y control) y pierde si la refrigeración se integra en el rack de Vertiv o Schneider.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 7.1,
    posicion: 'Líder en climatización comercial aplicada de Norteamérica; ≈7 % del mercado mundial de climatización (21.322 M sobre ≈299.000 M USD) [1, 2]; uno de los dos líderes mundiales en frío de transporte (Thermo King, con Carrier Transicold).',
    competidores: [
      { nombre: 'Johnson Controls', pais: 'Irlanda', ticker: 'JCI', ingresos: 24995, cuota_pct: null, margen_ebit_pct: null, comentario: 'Enfriadoras York y controles de edificio; vendió su residencial a Bosch en 2024; margen EBITDA 14,8 % [4].' },
      { nombre: 'Carrier Global', pais: 'EE. UU.', ticker: 'CARR', ingresos: 22059, cuota_pct: null, margen_ebit_pct: null, comentario: 'Más residencial y Europa (Viessmann); margen EBITDA 13,9 %, ROIC 6 % [4].' },
      { nombre: 'Daikin Industries', pais: 'Japón', ticker: '6367', ingresos: 31599, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor fabricante mundial (Goodman en EE. UU.); fuerte en residencial y split; margen EBITDA 14,3 % [4].' },
      { nombre: 'Lennox International', pais: 'EE. UU.', ticker: 'LII', ingresos: 5310, cuota_pct: null, margen_ebit_pct: null, comentario: 'Residencial y unidades de cubierta en EE. UU.; margen EBITDA 22 %, ROIC 34 % [4].' },
      { nombre: 'Vertiv', pais: 'EE. UU.', ticker: 'VRT', ingresos: 11471, cuota_pct: null, margen_ebit_pct: null, comentario: 'Especialista en potencia y frío de centros de datos; rival directo en refrigeración líquida [4].' },
      { nombre: 'Schneider Electric', pais: 'Francia', ticker: 'SU', ingresos: 46816, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compró Motivair (refrigeración líquida) en 2024; control de edificios [4].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red de servicio propia que se refuerza con la base instalada; no es un efecto de red en sentido estricto [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Equipos especificados para 20-30 años y servicio recurrente (34 % de las ventas) [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marcas Trane y Thermo King (2.610 M de marcas de vida indefinida en balance); programa de formación de ingenieros comerciales desde 1926 [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBITDA del 20 % frente al 14-15 % de Carrier, Daikin y Johnson Controls [4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Pocos fabricantes con capacidad de enfriadoras grandes y servicio nacional en EE. UU. [1].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) que la nueva generación de chips reduzca la necesidad de enfriadoras en los centros de datos (probabilidad media; el mercado ya lo castigó en enero de 2026) [5]; (2) que los integradores eléctricos (Vertiv, Schneider, Eaton) capten el valor de la refrigeración líquida dentro del rack (media; Eaton pagó 22,5 veces el EBITDA por Boyd Thermal) [6]; (3) presión de precios de fabricantes asiáticos en residencial y unidades de cubierta (baja en aplicados).',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El asunto material es el producto: la empresa fija el objetivo de reducir en una gigatonelada las emisiones de sus clientes en 2030 y de diseñar para la circularidad y un 40 % menos de carbono incorporado [1]. Los refrigerantes de menor potencial de calentamiento (AIM Act, gases fluorados) son a la vez coste regulatorio y motor de renovación. La seguridad laboral es buena: tasa de accidentes con baja de 0,06 en 2025 [1]. El variable anual de la dirección incluye objetivos de sostenibilidad [1].',
    controversias: 'Amianto heredado: Aldrich y Murray en concurso desde junio de 2020, con un fondo de 270 M aportado en 2022 y la reestructuración de 2020 impugnada por el comité de demandantes [1]. Expedientes medioambientales de antiguas fábricas sin importe material [1]. Sin sanciones relevantes en tres años en el 10-K.',
    confianza: 'Media',
  },
  fuentes: fB,
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, comisiones, remuneración 2025, ratio de pago 402:1, accionistas > 5 %', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-23', url: `${E}/000162828026026679/tt-20260421.htm` },
  { id: 2, titulo: 'Form 10-K 2025: directivos (Item 1)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-05', url: `${E}/000162828026005731/tt-20251231.htm` },
  { id: 3, titulo: 'Trane Technologies Names Donny Simmons as Chief Operating Officer (8-K)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-10', url: `${E}/000162828026042055/projectsouthernpressrelease.htm` },
  { id: 4, titulo: '8-K: salida de Gary Guo (director global de cadena de suministro), 1-ago-2026', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-22', url: `${E}/000162828026049227/tt-20260720.htm` },
  { id: 5, titulo: 'Form 4 presentados entre el 15-oct-2025 y el 15-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001466258&type=4' },
  { id: 6, titulo: 'Resultados del 4T24 y guía 2025', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-01-30', url: `${E}/000146625825000005/exhibit991-q42024earningsr.htm` },
  { id: 7, titulo: 'Resultados del 4T25 y guía 2026', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-29', url: `${E}/000162828026003953/exhibit991-q42025earningsr.htm` },
  { id: 8, titulo: 'Resultados del 2T26 (guía 2026 elevada)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E}/000162828026050743/exhibit991-q22026earningsr.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones = null) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'David S. Regnery', cargo: 'Presidente y consejero delegado', desde: '2021', participacion_pct: 0.08, trayectoria: 'En la empresa desde 1986 (Thermo King y Trane); consejero delegado desde julio de 2021 y presidente desde enero de 2022 [2]. Con él los ingresos pasan de 14.136 M (2021) a 21.322 M (2025) y el BPA continuado de 5,96 a 13,14 USD.' },
      { nombre: 'Christopher J. Kuehn', cargo: 'Director financiero', desde: '2020', participacion_pct: 0.02, trayectoria: 'Director financiero desde marzo de 2020; antes, responsable de contabilidad del grupo [2]. Deuda bruta estable y 10.000 M devueltos al accionista desde 2020.' },
      { nombre: 'Donald E. (Donny) Simmons', cargo: 'Director de operaciones (desde 1-jul-2026)', desde: '2026', participacion_pct: 0.01, trayectoria: '25 años en la empresa; dirigió América (2024-2026) y la climatización comercial de Norteamérica y EMEA [3]. Su nombramiento ordena la sucesión del consejero delegado (63 años).' },
      { nombre: 'Mauro Atalla', cargo: 'Director de tecnología y sostenibilidad', desde: '2025', participacion_pct: null, trayectoria: 'Antes en Collins Aerospace (ingeniería y tecnología) [2].' },
      { nombre: 'Victoria V. Lazar', cargo: 'Secretaria general', desde: '2025', participacion_pct: null, trayectoria: 'Antes jefa jurídica de TechnipFMC [2].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Enero: crecimiento orgánico 7-8 %, BPA ajustado 12,70-12,90 USD', real: 'Orgánico 6,2 %; BPA ajustado 13,06', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Enero: orgánico 6-7 %, BPA 14,65-14,85 USD; subida en abril (≈7 %, 14,75-14,95) y en julio (≈9 %, ajustado 15,20-15,30)', real: 'En curso (1S26 por encima del plan)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de casa: Regnery lleva 40 años en el grupo y el director financiero seis en el cargo. En 2025 batió la guía de BPA (13,06 frente a 12,70-12,90) aunque se quedó corto en crecimiento orgánico por residencial [6, 7]; en 2026 la ha subido dos veces [8]. El nombramiento de Simmons como director de operaciones (junio de 2026) apunta a sucesor del consejero delegado [3]. La salida a los ocho meses del director de cadena de suministro fichado de Coca-Cola (julio de 2026) es una nota negativa menor [4].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('David S. Regnery', 'Presidente y consejero delegado', 'Ejecutivo', '2021', 'Ejecutiva (presidente)'),
      cons('John P. Surma', 'Consejero coordinador independiente', 'Independiente', '2013'),
      cons('Kirk E. Arnold', 'Consejera', 'Independiente', '2018'),
      cons('Ana P. Assis', 'Consejera', 'Independiente', '2023'),
      cons('Ann C. Berzin', 'Consejera', 'Independiente', '2001'),
      cons('April Miller Boise', 'Consejera', 'Independiente', '2020'),
      cons('Mark R. George', 'Consejero', 'Independiente', '2022'),
      cons('John A. Hayes', 'Consejero', 'Independiente', '2023'),
      cons('Myles P. Lee', 'Consejero', 'Independiente', '2015'),
      cons('Matthew F. Pine', 'Consejero', 'Independiente', '2025'),
      cons('Melissa N. Schaeffer', 'Consejera', 'Independiente', '2022'),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 90.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 27.26, fijo: 1.51, variable_corto: 2.83, variable_largo: 14.6, ratio_salario_medio: 402 },
    remuneracion: 'El primer ejecutivo cobró 27,3 M USD en 2025 (28,2 M en 2024): 1,5 M de fijo, 2,8 M de variable anual y 14,6 M en acciones y opciones; el resto es el aumento del valor de su pensión (7,5 M) [1]. El variable anual mide ingresos, EBITDA ajustado, caja y objetivos de sostenibilidad; las acciones por objetivos (PSU, tres años) miden el rendimiento del capital en caja (CROIC) y la rentabilidad para el accionista frente al S&P 500 Industriales, a partes iguales [1]. El voto consultivo de 2025 sobre la remuneración obtuvo ≈90 % a favor [1]. La ratio frente al empleado mediano es de 402:1 [1].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 8.5, tipo: 'Institucional', variacion: 'Estable (13G/A de febrero de 2024)' },
      { nombre: 'BlackRock', pct: 7.8, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'JPMorgan Chase & Co.', pct: 7.4, tipo: 'Institucional', variacion: '13G/A de enero de 2026' },
      { nombre: 'FMR (Fidelity)', pct: 5.1, tipo: 'Institucional', variacion: 'Nueva declaración en noviembre de 2025' },
      { nombre: 'Consejeros y directivos', pct: 0.39, tipo: 'Insiders', variacion: '' },
    ],
    insiders: [
      { fecha: '2025-10-15', persona: 'David S. Regnery (presidente y consejero delegado), varias ventas con plan 10b5-1 hasta oct-2026', operacion: 'Venta', acciones: null, importe: 62.14 },
      { fecha: '2025-10-15', persona: 'Donald E. Simmons (director de operaciones), ventas con plan 10b5-1', operacion: 'Venta', acciones: null, importe: 8.10 },
      { fecha: '2025-10-15', persona: 'Christopher J. Kuehn (director financiero), ventas con plan 10b5-1', operacion: 'Venta', acciones: null, importe: 4.98 },
      { fecha: '2025-10-15', persona: 'John A. Hayes (consejero), compra en mercado', operacion: 'Compra', acciones: null, importe: 0.17 },
    ],
    control_y_defensas: 'Sin accionista de control: los cuatro mayores son gestoras indexadas o institucionales (28,8 % entre las cuatro) [1]. Una clase de acciones y una acción, un voto; sociedad irlandesa sujeta a las reglas de opas de Irlanda. El presidente es el consejero delegado, contrapesado por un consejero coordinador independiente (Surma) y 10 de 11 consejeros independientes [1]. No hay operaciones vinculadas relevantes.',
    alertas: [
      'Ventas de directivos por 75,9 M USD en 12 meses, casi todas con planes 10b5-1 (62,1 M del consejero delegado), sin compras salvo un consejero (0,17 M) [5].',
      'Salida del director global de cadena de suministro a los ocho meses de fichar (1-ago-2026) [4].',
      'Presidente y consejero delegado en la misma persona [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de TT, SPY y XLI (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/TT/history/' },
  { id: 2, titulo: 'Consenso de BPA y ventas 2026-2027, recomendaciones, precio objetivo y cambios de recomendación (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/TT/analysis/' },
  { id: 3, titulo: 'TT stock forecast (objetivo medio 528,69 USD, 26 analistas)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/tt/forecast/' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'DGS10: bono del Tesoro de EE. UU. a 10 años, 13-oct-2026 (5,21 %)', editor: 'FRED, Banco de la Reserva Federal de St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Comparables de climatización y control de edificios (capitalización, EV/EBITDA, PER adelantado, márgenes, ROIC) del 14-oct-2026', editor: 'Yahoo Finance (sectores/climatizacion-hvac-2026-10-14-comparables.json)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'Eaton Signs Agreement to Acquire Boyd Thermal', editor: 'Eaton / Business Wire', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/Eaton-Signs-Agreement-to-Acquire-Boyd-Thermal-Expanding-Solutions-for-Data-Center-Customers-to-Include-Critical-Liquid-Cooling-Technology' },
  { id: 8, titulo: 'Carrier Global, Form 10-K 2024 (contraprestación de Viessmann Climate Solutions: 14.200 M USD)', editor: 'Carrier Global / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02', url: 'https://www.sec.gov/Archives/edgar/data/1783180/000178318025000008/Financial_Report.xlsx' },
  { id: 9, titulo: 'Is Carrier Corporation Making a Huge Mistake? (EBITDA 2023 de Viessmann ≈770 M USD)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2023-05-01', url: 'https://www.fool.com/investing/2023/05/01/is-carrier-corporation-making-a-huge-mistake' },
  { id: 10, titulo: 'Form 10-Q del 2T26 (Stellar Energy: 553,4 M USD)', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E}/000162828026051117/tt-20260630.htm` },
  { id: 11, titulo: 'Trane Technologies upgraded, Lennox and Carrier downgraded at Goldman Sachs', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/TT' },
  { id: 12, titulo: 'Trane Technologies slides 4% as no fresh company catalyst emerges', editor: 'Quiver Quantitative', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://www.quiverquant.com/news/Trane+Technologies+Slides+4%25+as+No+Fresh+Company+Catalyst+Emerges' },
  { id: 13, titulo: 'Is Nvidia disrupting HVAC? Johnson Controls, Trane shares dip amid cooling shift', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-01-06', url: 'https://www.investing.com/news/stock-market-news/is-nvidia-disrupting-hvac-johnson-controls-trane--shares-dip-amid-cooling-shift-4432573' },
  { id: 14, titulo: 'Resultados del 2T26 y guía 2026', editor: 'Trane Technologies plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E}/000162828026050743/exhibit991-q22026earningsr.htm` },
  { id: 15, titulo: 'HVAC stocks slide as rising Treasury yields hit AI infrastructure trade; HVAC stocks sink as earnings, margin pressure, data-center qualms trigger selloff', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-08-18', url: 'https://seekingalpha.com/symbol/TT' },
  { id: 16, titulo: 'Cotización intradía del 15-oct-2026 de TT, JCI, VRT, CARR, LII, XLI y SPY (chart v8)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/TT/' },
];
const comps = [
  ['Johnson Controls', 'JCI', 'IE', 91471, 4.04, 27.3, 24.7, 14.8, 11.3, 2.57, 1.8],
  ['Carrier Global', 'CARR', 'US', 44244, 2.47, 17.7, 16.2, 13.9, 6.1, 3.34, 4.4],
  ['Lennox International', 'LII', 'US', 11936, 2.49, 11.3, 13.3, 22.0, 34.0, 1.1, 6.2],
  ['Daikin Industries', '6367', 'JP', 37873, 1.23, 8.6, null, 14.3, 7.6, 0.22, 4.3],
  ['Vertiv', 'VRT', 'US', 84978, 7.51, 33.7, 24.0, 22.2, 24.2, 0.46, 3.4],
  ['Schneider Electric', 'SU', 'FR', 165936, 3.86, 18.5, 21.4, 20.9, 12.9, 1.51, 3.9],
  ['Siemens', 'SIE', 'DE', 234571, 3.07, 14.8, 21.2, 20.7, 8.9, 2.28, 5.6],
].map(([nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct]) => ({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct: null, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct }));
const cierres = Object.fromEntries(BOLSA.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Trane Technologies plc', nombre_corto: 'Trane', ticker: 'TT', isin: 'IE00BK9ZQ967', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Irlanda (sede); negocio principal en EE. UU.', pais_iso: 'IE', sector: 'Industria', industria: 'Productos de construcción (climatización)', sede: 'Swords, Dublín (Irlanda)', fundacion: '1913', empleados: 44000, web: 'tranetechnologies.com',
    precio: 471.29, fecha_precio: '2026-10-14', acciones: 222.0, capitalizacion_publicada: 103700, free_float_pct: 99.6,
    max_52s: 505.87, min_52s: 348.06, volumen_medio_diario: '≈ 527 M USD/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía 2026 (30-jul-2026, segunda subida del año): ingresos +11,5 % publicados y ≈+9 % orgánicos; BPA contable de 15,00-15,10 USD y ajustado de 15,20-15,30 USD [14]. La empresa no publica objetivos a medio plazo en los documentos leídos; su marco de largo plazo (crecimiento orgánico de un dígito alto y apalancamiento operativo del 25 %) se repite en las presentaciones. Próximos resultados (3T26): 29-oct-2026 [2].',
    estimaciones: [
      { periodo: '2026e', ingresos: 23758, ebitda: null, ebit: null, bpa: 15.27, dpa: 4.20, fuente: 'Yahoo Finance, 24 analistas (BPA ajustado) [2]' },
      { periodo: '2027e', ingresos: 26077, ebitda: null, ebit: null, bpa: 17.63, dpa: null, fuente: 'Yahoo Finance, 25 analistas (BPA ajustado) [2]' },
    ],
    recomendaciones: { n_analistas: 26, comprar: 17, mantener: 8, vender: 1, po_medio: 528.69, po_min: 422, po_max: 575 },
    revisiones: 'En 90 días el BPA de consenso de 2026 sube de 14,90 a 15,27 USD (+2,5 %) y el de 2027 de 17,08 a 17,63 (+3,2 %), por la subida de la guía del 30-jul y la cartera récord [2]. Los objetivos se mueven al alza: Goldman Sachs pasa a Comprar el 14-oct-2026 (565 USD; su BPA 2027 está ≈4 % por encima del consenso) y Wells Fargo inicia en Sobreponderar (536 USD) el 25-sep; RBC sigue en Neutral (502 USD) [2, 11]. Solo hay una fuente gratuita con estimaciones completas (Yahoo); Stock Analysis da el mismo objetivo medio, 528,69 USD [3].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.5,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    beta: 1.17, volatilidad_pct: 28.8, max_drawdown_pct: -39.8, posicion_corta_pct: 1.7,
    comentario: 'La acción multiplica casi por 3,2 su precio desde la separación de 2020 (rentabilidad total del 23,5 % anual en cinco años frente al 13,0 % del S&P 500) gracias a que el BPA pasó de 4,02 a 13,14 USD y el PER subió con la tesis de los centros de datos [1]. En 2025 se quedó atrás (+6,1 % frente a +17,7 %) por el frenazo de residencial y el temor a los chips que necesitan menos frío; en 2026 recupera (+21,9 % en el año) con pedidos récord [1, 13]. Posición corta baja (1,7 % del capital) [2].',
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 6.4, var_3m_pct: -4.5, var_6m_pct: -2.5, var_12m_pct: 5.8, dist_max_52s_pct: -10.9, dist_min_52s_pct: 19.2, dist_max_historico_pct: -10.9, tendencia: 'lateral', volatilidad_60d_pct: 26.5, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'mar-abr 2026', var_pct: 19.3, causa: 'Rebote de un mes hasta el 27-abr tras la caída de marzo, antes de unos resultados del 1T26 con pedidos +24 % orgánicos y cartera de 10.700 M [1, 14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-sep 2026', var_pct: -12.0, causa: 'Caída de un mes hasta el 15-sep: venta de los valores de infraestructura de IA por la subida de los tipos a largo y recogida de beneficios, sin noticia de la empresa (Quiver Quant y Seeking Alpha) [12, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: '6-ene-2026', var_pct: -5.3, causa: 'Nvidia dijo en el CES que sus chips Vera Rubin no necesitarían enfriadoras de agua; Barclays estimó que los centros de datos son ≈10 % de las ventas de Trane [13].', veredicto: 'no cambia', condicion: null },
        { periodo: '15-oct-2026 (intradía)', var_pct: -4.9, causa: 'Caída de los valores de frío para centros de datos (Vertiv −6,6 %, Johnson Controls −5,3 %) con Carrier y Lennox al alza y el S&P 500 plano: movimiento del sector, sin noticia propia encontrada [16].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'Goldman Sachs sube a Comprar (objetivo 565 USD); RBC mantiene Neutral y sube el objetivo a 502 USD [2, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-25', tipo: 'recomendación', hecho: 'Wells Fargo inicia en Sobreponderar con objetivo de 536 USD [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-30', tipo: 'resultados', hecho: '2T26: pedidos +37 % orgánicos, cartera 12.100 M, guía elevada; la acción había caído el día anterior con el sector por márgenes y dudas de centros de datos [14, 15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-20', tipo: 'directivos', hecho: 'Sale el director global de cadena de suministro (1-ago); el 10-jun se nombró director de operaciones a Donny Simmons (Form 4 y 8-K de la SEC).', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'directivos', hecho: 'Ventas de directivos con planes 10b5-1 por 75,9 M USD en 12 meses (62,1 M del consejero delegado), programadas y ligadas a opciones; no es una salida de quien mejor conoce la empresa sin motivo (Form 4 y 8-K de la SEC).', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados del 3T26 el 29-oct-2026 (consenso BPA ajustado 4,73 USD, ventas 6.490 M) [2].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está lateral (−0,6 % frente a la media de 200 sesiones) y un 10,9 % por debajo de su máximo histórico de junio. Sus movimientos fuertes de 2026 los explica el sector (tipos, dudas sobre el frío de los centros de datos) y no la empresa, que sube la guía y bate pedidos. No hay colocaciones, ampliaciones, ofertas ni decisiones con fecha pendientes; el litigio del amianto no tiene hito próximo. Las ventas de directivos son programadas. Unos resultados cercanos no retrasan la decisión (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: cierres[y], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'El PER de los últimos doce meses pasa de ≈36x en 2020 (BPA deprimido por la pandemia) a ≈30x en 2025; el PER adelantado (precio de cierre entre el BPA del año siguiente) se mueve entre 18,9x (2022) y 28,1x (2024), con mediana de cinco años de 25,9x. Hoy cotiza a 27,4x el BPA propio de 2027e, algo por encima de su mediana: el mercado paga ya la aceleración por centros de datos. Desde 2020 el múltiplo ha subido de forma estructural porque el grupo es más rentable (margen EBIT del 12 % al 19 %) y crece más.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes de climatización con negocio comparable (Carrier, Daikin, Johnson Controls, Lennox), el especialista en frío de centros de datos (Vertiv) y dos grupos de control de edificios y electrificación que compiten en centros de datos (Schneider, Siemens). Cifras de Yahoo Finance del 14-oct-2026, mismo día que nuestro precio, pasadas a USD [6]. Excluimos a Belimo, Halma y Spirax (componentes, no equipos). El PER adelantado es el de consenso (ajustado), como el BPA ajustado de Trane, que difiere del contable en un 1-2 %.',
    empresas: comps,
    comentario: 'Trane cotiza con prima sobre los fabricantes de climatización (PER adelantado de Yahoo 26,5x frente a 13-25x) y en línea con Johnson Controls y Vertiv, los otros expuestos a centros de datos [6]. La prima se apoya en un margen EBITDA del 20 % (14-15 % en Carrier, Daikin y JCI) y en un ROIC del 24 % (6-11 % en los compradores con fondo de comercio grande) [6]. La mediana de PER de los comparables (21,3x) implica un valor por debajo del precio; usamos los comparables con peso moderado porque Lennox y Carrier dependen del residencial y Daikin no tiene PER publicado.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida)', comprador: 'Eaton', ev: 9500, ev_ventas: null, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: 'Múltiplo sobre EBITDA ajustado 2026e [7].' },
      { fecha: '2024-01', objetivo: 'Viessmann Climate Solutions', comprador: 'Carrier Global', ev: 14200, ev_ventas: null, ev_ebitda: 18.4, prima_pct: null, excluir: false, comentario: 'Contraprestación de 14.200 M del 10-K de Carrier sobre un EBITDA 2023 de ≈770 M (prensa); estimación propia [8, 9].' },
      { fecha: '2026-02', objetivo: 'Stellar Energy Americas', comprador: 'Trane Technologies', ev: 553.4, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Múltiplo no publicado [10].' },
    ],
    comentario: 'Las compras de refrigeración para centros de datos se pagan muy caras (Boyd Thermal a 22,5 veces el EBITDA) y las de climatización tradicional, a 15-18 veces (Viessmann) [7-9]. Trane cotiza a ≈24 veces su EBITDA de los últimos doce meses, en la parte alta de ese rango: no hay prima de control que ganar. Con 104.000 M de capitalización y sin accionista de control, no es objetivo realista de una operación.',
    confianza: 'Baja',
  },
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $TT (julio-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://stocktwits.com/symbol/TT' },
  { id: 2, titulo: 'Seeking Alpha, noticias y análisis de TT (titulares de agosto-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/TT' },
  { id: 3, titulo: 'Trane Technologies slides 4% as no fresh company catalyst emerges', editor: 'Quiver Quantitative', tipo: 'Foros y redes', fecha: '2026-09-14', url: 'https://www.quiverquant.com/news/Trane+Technologies+Slides+4%25+as+No+Fresh+Company+Catalyst+Emerges' },
];
const Ent = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($TT)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Mezcla de mensajes alcistas tras la subida de Goldman y quejas por la debilidad de agosto («¿por qué está tan floja?»); poco debate de fondo [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 15, tono: 'Positivo', resumen: 'Artículos que la ven como «compra en las caídas» y como calidad con punto de entrada; titulares sobre ventas del sector por tipos y dudas de centros de datos [2].' },
      { plataforma: 'Quiver Quant (notas de mercado)', fecha: '2026-09', n_comentarios: 5, tono: 'Neutro', resumen: 'Atribuye las caídas de septiembre a la valoración y a los tipos, no a la empresa [3].' },
    ],
    temas: [
      { tema: 'Centros de datos e IA como motor', postura: 'Alcista', peso: 'Alto', contraste: 'Los pedidos lo confirman (equipos aplicados +130 % en el 2T26), pero Barclays cifra el peso en ≈10 % de las ventas: la tesis es más amplia que la IA [1, 2].' },
      { tema: 'Valoración exigente', postura: 'Dividida', peso: 'Medio', contraste: 'Cierto: 27,4x el BPA propio de 2027e, por encima de su mediana de cinco años (25,9x) [2, 3].' },
      { tema: 'Sustitución de enfriadoras por chips que toleran más calor', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real pero lento; la empresa responde con refrigeración líquida (LiquidStack) [2].' },
    ],
    lectura: 'El inversor particular es mayoritariamente alcista y compra la historia de los centros de datos; el debate gira sobre si el precio ya la descuenta, que es la misma conclusión de este informe. No hay euforia ni capitulación: la acción está lateral y a un 11 % de máximos. El sentimiento no aporta un riesgo que el análisis no tuviera.',
    confianza: 'Baja',
  },
  fuentes: fE,
};
guarda('E', Ent);
console.log('Notas A-E escritas');
