// Escribe las notas A-E de Pandora A/S (PNDORA, Nasdaq Copenhague; corte 2026-10-19). Ejercicio natural; cuentas NIIF-UE en DKK.
// Fuentes primarias: informes anuales 2021, 2023 y 2025 (con 2020-2025), informes trimestrales 3T24-2T26, presentaciones,
// consenso recogido por la propia empresa (Visible Alpha, 28-ago-2026), informe de remuneraciones 2025 y declaración de gobierno
// (todo en pandora.a.bigcontent.io, enlazado desde pandoragroup.com/investor), XBRL ESEF 2024-2025 (filings.xbrl.org),
// BCE y Bundesbank. Mercado: Yahoo Finance. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/pandora-2026-10-19/notas/construir-notas.mjs. Cifras en millones de DKK salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const raw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const BC = (n) => `https://pandora.a.bigcontent.io/v1/static/${encodeURIComponent(n)}`;
const r1 = (x) => (x == null || Number.isNaN(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || Number.isNaN(x) ? null : Math.round(x * 100) / 100);

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025: estados consolidados 2025 y 2024, resumen de cinco años, notas de deuda, arrendamientos, capital, financieros y remuneración', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Annual Report 2025') },
  { id: 2, titulo: 'Interim Financial Report Q2 2026 (Company announcement 1015): cuenta, balance a 30-jun-2026, flujos, canales, deuda neta, coberturas, guía 2026', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-08-12', url: BC('Pandora Q2 2026 Interim Report Company announcement_No_1015') },
  { id: 3, titulo: 'Annual Report 2023: estados consolidados 2023 y 2022', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2024-02-07', url: BC('Annual Report 2023') },
  { id: 4, titulo: 'Annual Report 2021: estados consolidados 2021 y 2020', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2022-02-08', url: BC('Annual Report 2021') },
  { id: 5, titulo: 'Interim Financial Report Q4 2025 (Company announcement 997): 4T25, segmentos, colecciones, regiones y canales de 2025; plan de platino y margen EBIT de 2027', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Pandora Q4 2025 Interim Report Company Announcement No 997') },
  { id: 6, titulo: 'Interim Financial Report Q1 2026 (Company announcement 1012)', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-05-06', url: BC('Pandora Q1 2026 Interim Report Company announcement_No_1012') },
  { id: 7, titulo: 'Interim Financial Reports Q3 2024, Q4 2024, Q1 2025, Q2 2025 y Q3 2025 (comparativos trimestrales)', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2025-11-05', url: BC('Pandora Q3 2025 Interim Report Company Announcement No 981') },
  { id: 8, titulo: 'Informes anuales ESEF 2024 y 2025 en XBRL (LEI 5299007OWYZ6I1E46843)', editor: 'XBRL International (filings.xbrl.org) / Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=5299007OWYZ6I1E46843' },
  { id: 9, titulo: 'Q3 2026 Aide Memoire (guía vigente, comentario del 3T en curso, fecha del 4-nov)', editor: 'Pandora A/S, Investor Relations', tipo: 'Primaria', fecha: '2026-10-07', url: BC('Pandora Q3 2026 - Aide Memoire') },
  { id: 10, titulo: 'Investor Presentation Q2 2026', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-08-12', url: BC('Investor Presentation Q2 2026_website version') },
];

const cuenta = [
  { periodo: '2021', ingresos: 23394, coste_ventas: 5590, gastos_generales: 11965, ebitda: 7838, amortizaciones: 1999, ebit: 5839, resultado_financiero: -461, bai: 5378, impuestos: 1218, minoritarios: 0, beneficio_neto: 4160, gastos_financieros: 133, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 41.7, dpa: 16.0, dpa_extraordinario: 0, acciones_diluidas: 99.67 },
  { periodo: '2022', ingresos: 26463, coste_ventas: 6273, gastos_generales: 13447, ebitda: 8716, amortizaciones: 1973, ebit: 6743, resultado_financiero: -210, bai: 6533, impuestos: 1504, minoritarios: 0, beneficio_neto: 5029, gastos_financieros: 262, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 53.7, dpa: 16.0, dpa_extraordinario: 0, acciones_diluidas: 93.70 },
  { periodo: '2023', ingresos: 28136, coste_ventas: 6012, gastos_generales: 15086, ebitda: 9118, amortizaciones: 2079, ebit: 7039, resultado_financiero: -805, bai: 6234, impuestos: 1494, minoritarios: 0, beneficio_neto: 4740, gastos_financieros: 644, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 55.1, dpa: 18.0, dpa_extraordinario: 0, acciones_diluidas: 86.08 },
  { periodo: '2024', ingresos: 31680, coste_ventas: 6391, gastos_generales: 17315, ebitda: 10327, amortizaciones: 2353, ebit: 7974, resultado_financiero: -1049, bai: 6926, impuestos: 1699, minoritarios: 0, beneficio_neto: 5227, gastos_financieros: 801, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 64.6, dpa: 20.0, dpa_extraordinario: 0, acciones_diluidas: 80.92 },
  { periodo: '2025', ingresos: 32549, coste_ventas: 6802, gastos_generales: 17964, ebitda: 10316, amortizaciones: 2533, ebit: 7783, resultado_financiero: -870, bai: 6913, impuestos: 1671, minoritarios: 0, beneficio_neto: 5241, gastos_financieros: 846, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 67.9, dpa: 22.0, dpa_extraordinario: 0, acciones_diluidas: 77.19 },
];

const balanceH = [
  { periodo: '2021', activo_total: 18542, activo_corriente: 5988, pasivo_corriente: 8246, pasivo_total: 11541, fondo_comercio: 4418, intangibles: 2676, inmovilizado_material: 1816, existencias: 2991, clientes: 1009, proveedores: 3267, activos_contrato: null, pasivos_contrato: null, caja: 1043, deuda_financiera: 1316, arrendamientos: 2610, patrimonio_neto: 7001, minoritarios: 0, reservas: 9523 },
  { periodo: '2022', activo_total: 22013, activo_corriente: 7731, pasivo_corriente: 11181, pasivo_total: 14846, fondo_comercio: 4822, intangibles: 2746, inmovilizado_material: 2226, existencias: 4211, clientes: 1262, proveedores: 3131, activos_contrato: null, pasivos_contrato: null, caja: 794, deuda_financiera: 4525, arrendamientos: 3063, patrimonio_neto: 7167, minoritarios: 0, reservas: 8044 },
  { periodo: '2023', activo_total: 23798, activo_corriente: 7998, pasivo_corriente: 8053, pasivo_total: 18443, fondo_comercio: 4914, intangibles: 2887, inmovilizado_material: 2746, existencias: 4166, clientes: 1342, proveedores: 3211, activos_contrato: null, pasivos_contrato: null, caja: 1397, deuda_financiera: 7286, arrendamientos: 3881, patrimonio_neto: 5355, minoritarios: 0, reservas: 7530 },
  { periodo: '2024', activo_total: 27758, activo_corriente: 9226, pasivo_corriente: 9877, pasivo_total: 22250, fondo_comercio: 5126, intangibles: 3106, inmovilizado_material: 3475, existencias: 4426, clientes: 1217, proveedores: 3894, activos_contrato: null, pasivos_contrato: null, caja: 2394, deuda_financiera: 8228, arrendamientos: 5173, patrimonio_neto: 5508, minoritarios: 0, reservas: 6219 },
  { periodo: '2025', activo_total: 29603, activo_corriente: 10226, pasivo_corriente: 11252, pasivo_total: 24321, fondo_comercio: 5020, intangibles: 3344, inmovilizado_material: 3817, existencias: 4883, clientes: 1163, proveedores: 4623, activos_contrato: null, pasivos_contrato: null, caja: 1305, deuda_financiera: 9356, arrendamientos: 5668, patrimonio_neto: 5282, minoritarios: 0, reservas: 6535 },
];

const flujosH = [
  { periodo: '2021', flujo_operativo: 6228, capex: 585, pagos_arrendamientos: 991, adquisiciones: 66, desinversiones: 2, dividendos: 1479, recompras: 3325, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 4434, capex: 1191, pagos_arrendamientos: 1068, adquisiciones: 562, desinversiones: 5, dividendos: 1514, recompras: 3527, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 7384, capex: 1488, pagos_arrendamientos: 1107, adquisiciones: 349, desinversiones: 0, dividendos: 1412, recompras: 5022, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 8721, capex: 1679, pagos_arrendamientos: 1162, adquisiciones: 194, desinversiones: 14, dividendos: 1471, recompras: 4013, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 7361, capex: 1911, pagos_arrendamientos: 1260, adquisiciones: 373, desinversiones: 7, dividendos: 1567, recompras: 4384, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 32456, ebitda: 10420, ebit: 7806, beneficio_neto: 5154, bpa: 67.8, dpa: 22.0, dpa_extraordinario: 0, fcf: 5739, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -180 },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasan de 23.394 M DKK en 2021 a 32.549 M en 2025 (crecimiento orgánico del 23 %, 7 %, 8 %, 13 % y 6 %) [1, 3, 4]. El crecimiento de 2025 en coronas fue solo del 3 % por la caída del dólar [1]. La compra de tiendas a franquiciados («integración hacia delante») añade algo cada año (adquisiciones de 66-562 M), pero no cambia el perímetro de forma relevante [1, 3]. El margen bruto sube de 76,1 % en 2021 a 79,8 % en 2024 por la mezcla de canal (más tienda propia) y precio, y cae a 79,1 % en 2025 por la plata, el oro y los aranceles de EE. UU. [1]. El margen EBIT se mueve entre 25,0 % y 25,5 % de 2021 a 2024 y baja a 23,9 % en 2025 (−130 pb) [1]. En el primer semestre de 2026 el margen EBIT es del 20,6 % (20,3 % en 2025), con 180 M de devolución de aranceles IEEPA y gastos retrasados al segundo semestre [2]. El negocio es muy estacional: el cuarto trimestre aporta en torno al 36 % de las ventas y más del 50 % del EBIT [5].',
    ajustes: 'Cifras publicadas NIIF. Pandora no publica un EBIT ajustado: los costes de reestructuración y de la transición al platino van dentro del EBIT. EBITDA = EBIT + amortizaciones según la empresa (2025: 10.316 M; el estado de flujos suma 2.586 M de «amortización, etc.» porque incluye otras partidas) [1]. En los últimos doce meses a junio de 2026 hay un ingreso no recurrente de 180 M (devolución parcial de aranceles IEEPA de EE. UU., en coste de ventas) que restamos del EBITDA recurrente (−180) [2]; el resto de la reclamación (44 M USD) se reconocerá en el segundo semestre [2]. En 2025 hubo un beneficio fiscal no recurrente por el acuerdo de precios de transferencia entre Dinamarca y Australia (tipo efectivo 24,2 % frente al ≈ 25 % previsto en 2026) [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 6103, crecimiento_pct: 10, crecimiento_organico_pct: 11, ebitda: 1571, margen_ebitda_pct: 25.7, bpa: 7.3, vs_consenso: null },
      { periodo: '4T24', ingresos: 11973, crecimiento_pct: 11, crecimiento_organico_pct: 11, ebitda: 4772, margen_ebitda_pct: 39.9, bpa: 35.5, vs_consenso: null },
      { periodo: '1T25', ingresos: 7347, crecimiento_pct: 8, crecimiento_organico_pct: 7, ebitda: 2265, margen_ebitda_pct: 30.8, bpa: 14.0, vs_consenso: null },
      { periodo: '2T25', ingresos: 7075, crecimiento_pct: 4, crecimiento_organico_pct: 8, ebitda: 1911, margen_ebitda_pct: 27.0, bpa: 10.3, vs_consenso: null },
      { periodo: '3T25', ingresos: 6269, crecimiento_pct: 3, crecimiento_organico_pct: 6, ebitda: 1524, margen_ebitda_pct: 24.3, bpa: 6.3, vs_consenso: null },
      { periodo: '4T25', ingresos: 11859, crecimiento_pct: -1, crecimiento_organico_pct: 4, ebitda: 4617, margen_ebitda_pct: 38.9, bpa: 36.9, vs_consenso: null },
      { periodo: '1T26', ingresos: 7109, crecimiento_pct: -3, crecimiento_organico_pct: 2, ebitda: 2146, margen_ebitda_pct: 30.2, bpa: 12.6, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 7219, crecimiento_pct: 2, crecimiento_organico_pct: 3, ebitda: 2133, margen_ebitda_pct: 29.5, bpa: 11.7, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En febrero de 2026 la nueva consejera delegada, Berta de Pablos-Barbier, rebajó el tono: 2025 cerró con un 6 % orgánico (guía 7-8 %), la guía de 2026 fue de −1 % a +2 % orgánico y 21-22 % de margen EBIT, se suspendieron las recompras y se anunció el paso de la plata al platino chapado (≥ 12 % de margen EBIT en 2027 con la plata a 82 USD/oz) [5]. En mayo (1T26: 2 % orgánico, LFL 0 %) mantuvo la guía y fijó el calendario del platino [6]. En agosto (2T26: 3 % orgánico, LFL 1 %, 20,3 % de margen EBIT con 250 pb de la devolución de aranceles) subió la guía a 0-3 % y 22-23 %, dijo que la plata de 2027 está cubierta al 90-100 % a ≈ 65 USD/oz (unos +200 pb frente al plan) y que el 3T empezó con LFL de un dígito medio, avisando de que julio no es representativo por el calendario de rebajas [2, 9]. Los analistas preguntaron sobre todo por el margen de 2027, por cuándo vuelven las recompras y por el LFL negativo del Core (−1 %) en Europa y Estados Unidos; la dirección remitió la respuesta sobre 2027 a la actualización estratégica del 4-nov [2, 9].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [
      { anio: '2026', importe: 1735 }, { anio: '2027-2030', importe: 8902 },
    ],
    liquidez: 'Caja de 908 M y líneas comprometidas sin disponer de 6.721 M a 30-jun-2026 [2]. Además usa financiación a corto no comprometida (≈ 0,9 M de millones) y un programa de financiación de proveedores de 1.300 M que no alarga los plazos de pago [2].',
    rating: 'S&P BBB (estable); Moody\'s Baa2 (estable) [1]',
    coste_deuda_pct: 4.6, vida_media_anios: 3.0,
    otros_pasivos: 'La deuda financiera son sobre todo dos bonos de 500 M EUR (2028 y 2030, emitidos en 2023 y 2024, permutados a DKK a tipo fijo) y créditos bancarios renovables [1]. Los arrendamientos (6.291 M a junio de 2026) son de tiendas: Pandora no posee ningún local [2]. Provisiones de 556 M y pasivos por devoluciones de 571 M [2]. El programa de financiación de proveedores (1.300 M en junio frente a 770 M en diciembre) se clasifica como proveedores; si se tratara como deuda, la deuda neta subiría un 8 % [2]. La venta del derecho a la devolución de aranceles IEEPA (55 M USD cobrados) es un pasivo financiero que se cancela con las devoluciones [2]. Sin covenants publicados relevantes; política de apalancamiento de 0,5-1,5 veces la deuda neta sobre EBITDA [1].',
    comentario: 'La deuda neta (con arrendamientos) sube de 2.882 M en 2021 a 13.719 M en 2025 y 15.643 M en junio de 2026, porque Pandora devolvió más del 100 % de su caja libre con recompras (4.000-5.000 M al año) [1, 2]. El apalancamiento pasó de 0,4 a 1,3 veces el EBITDA en 2025 y está en 1,5 en junio; la empresa espera ≈ 1,5 a final de 2026 [2]. El patrimonio es pequeño (4.305 M) por las recompras. El circulante sin derivados es ≈ 3 % de las ventas, pero las existencias suben al 17,8 % de las ventas (14,6 % un año antes) por el precio de los metales y la transición al platino, y seguirán altas en 2026-2027 [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'La caja libre después de arrendamientos fue de 5.137, 2.602, 5.489, 6.767 y 5.022 M de 2021 a 2025 [1, 3]. 2022 fue anómalo (más existencias, 1.012 M) y 2025 bajó por las existencias y los derivados de metales [1]. La conversión de caja (caja libre con arrendamientos entre beneficio) fue del 65 % en 2025 y del 85 % en 2024 [1]. El capex (inmovilizado e intangibles) sube del 2,7 % de las ventas en 2021 al 6,0 % en 2025 y a ≈ 7 % en 2026 (unos 400 M para la capacidad de chapado en platino, de un total de ≈ 600 M) [1, 2]. A eso se suman las altas de derechos de uso de tiendas (2.102 M en 2025) [1]. Estimación propia: el capex de mantenimiento ronda el 3 % de las ventas (refrescos de tiendas e informática); el resto es expansión de tiendas propias, ERP y platino.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY Godkendt Revisionspartnerselskab', anios_auditor: 15, opinion: 'Favorable',
    comentario: 'EY audita Pandora desde 2011 y fue reelegida en 2025 tras un concurso [1]. No hay cambios de criterio relevantes: NIIF 16 desde 2019 y presentación de la cuenta por función [1]. Puntos que mirar: (1) las coberturas de plata y oro se registran en patrimonio y pasan a existencias y luego a coste de ventas con 5-10 meses de retraso, así que el margen de un año refleja los precios del año anterior [2]; (2) el ingreso de 180 M por la devolución de aranceles de 2026 es no recurrente [2]; (3) la financiación de proveedores (1.300 M) mejora la caja operativa [2]; (4) los pagos en acciones son pequeños (103 M en 2025) [1]. Los indicadores del motor (Altman, Piotroski, Beneish) se leen con cuidado: el patrimonio es pequeño por las recompras y eso baja el Altman sin que haya tensión de liquidez.',
    senales: [
      { senal: 'Financiación de proveedores creciente (770 → 1.300 M en seis meses)', nivel: 'Baja', comentario: 'No alarga plazos según la empresa; mejora la caja operativa de 2026 [2].' },
      { senal: 'Ingreso no recurrente por aranceles IEEPA en el margen de 2026', nivel: 'Baja', comentario: '≈ 100 pb del margen EBIT de 2026 [2]; separado en el LTM.' },
      { senal: 'Coberturas de metales con efecto retardado en el margen', nivel: 'Media', comentario: 'El margen de 2026 refleja plata a ≈ 32 USD/oz y el de 2027 a ≈ 65 USD/oz [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo ordinario creciente (22 DKK por acción por 2025, +10 %) y, hasta 2025, recompras grandes: Pandora ha devuelto más del 100 % de su caja libre (payout total del 114 % en 2025 y del 105-136 % en 2022-2024) [1]. En 2026 no hay recompras: se reanudarán cuando la transición al platino esté más avanzada [2]. Política de apalancamiento: 0,5-1,5 veces la deuda neta sobre EBITDA a final de año; objetivo de ≈ 1,5 veces a final de 2026 [1, 2].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Tiendas de franquiciados (integración hacia delante, varios mercados)', importe: 373, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de 164 M; arrastre temporal en el margen de 2025 que se revierte en 2026 [1, 2].' },
      { anio: '2024', objetivo: 'Tiendas de franquiciados', importe: 194, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin deterioros [1].' },
      { anio: '2023', objetivo: 'Tiendas de franquiciados', importe: 349, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin deterioros [3].' },
      { anio: '2022', objetivo: 'Tiendas de franquiciados (incluidas en Estados Unidos)', importe: 562, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin deterioros [3].' },
    ],
    comentario: 'Pandora no hace compras grandes: sus adquisiciones son tiendas de sus propios franquiciados (≈ 1.500 M en cuatro años) [1, 3]. El capital va a dividendos y recompras: entre 2021 y 2025 recompró acciones por 20.271 M y redujo el número de acciones diluidas de 99,7 a 77,2 M (−23 %), lo que explica que el BPA creciera un 13 % anual con un beneficio que creció un 6 % [1, 3, 4]. Las recompras de 2024 se hicieron a precios de 1.000-1.300 DKK, muy por encima del precio actual: con la caída de 2025-2026 destruyeron valor [1]. La pausa de 2026 es prudente con la deuda neta en 1,5 veces el EBITDA.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Core', descripcion: 'Charms y pulseras (Moments, Collabs, Pandora ME). Margen bruto 77,9 % en 2025.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 23542, resultado: null }, { periodo: '2025', ingresos: 24235, resultado: null }] },
      { nombre: 'Fuel with more', descripcion: 'Timeless, Signature, PANDORA ESSENCE y diamantes de laboratorio. Margen bruto 82,8 % en 2025.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 8139, resultado: null }, { periodo: '2025', ingresos: 8314, resultado: null }] },
    ],
    geografias: [
      { nombre: 'EMEA', peso_pct: 49.6 }, { nombre: 'Norteamérica', peso_pct: 36.1 }, { nombre: 'Latinoamérica', peso_pct: 6.5 }, { nombre: 'Asia-Pacífico', peso_pct: 7.8 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '13 % (2024)', valor_actual: '6 % (2025); 2 % (1S26)', variacion: '−7 pp', comentario: 'Guía 2026: 0-3 % [2, 5].' },
      { kpi: 'Crecimiento comparable (LFL)', valor_anterior: '7 % (2024)', valor_actual: '2 % (2025); 0 % (1S26)', variacion: '−5 pp', comentario: 'Core −1 %, Fuel with more +6 % en el 2T26 [2].' },
      { kpi: 'Venta en canales propios (tiendas y online)', valor_anterior: '82,5 % (2024)', valor_actual: '85,8 % (2025); 87 % (1S26)', variacion: '+3,3 pp', comentario: 'Online propio 22,9 % de las ventas en 2025 [5].' },
      { kpi: 'Tiendas concepto', valor_anterior: '2.788 (jun-25)', valor_actual: '2.811 (jun-26)', variacion: '+23', comentario: '2.213 propias; −95 netas en China [2].' },
      { kpi: 'Margen bruto', valor_anterior: '79,8 % (2024)', valor_actual: '79,1 % (2025)', variacion: '−70 pb', comentario: 'Plata, oro y aranceles [1].' },
      { kpi: 'Margen EBIT', valor_anterior: '25,2 % (2024)', valor_actual: '23,9 % (2025)', variacion: '−130 pb', comentario: 'Guía 2026: 22-23 % con ≈ 100 pb no recurrentes [2].' },
      { kpi: 'ROIC publicado (EBIT / capital invertido)', valor_anterior: '46 % (2024)', valor_actual: '41 % (2025); 39 % (jun-26)', variacion: '−5 pp', comentario: 'Definición de la empresa, antes de impuestos [1, 2].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Comparación con el consenso de 3T24-4T25', tipo: 'Complemento', intentos: '1) Consenso previo recogido por Pandora (solo bajados el de 1T26 y 2T26); 2) Yahoo (sin histórico de sorpresas para DKK); 3) prensa (sin cifras de EBIT esperado)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Segmentos Core / Fuel with more antes de 2024 y resultado por segmento (solo margen bruto)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (dos ejercicios); 2) informe anual 2023 (otra segmentación por colecciones); 3) informes trimestrales (solo margen bruto por segmento)', decision: 'Omitido' },
  ],
};

// ================================================================ B. Sector, competencia, historia, ESG y descripción del negocio
const fB = [
  { id: 1, titulo: 'Annual Report 2025: modelo de negocio, estrategia Phoenix, canales, mercados y sostenibilidad', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Annual Report 2025') },
  { id: 2, titulo: 'Interim Financial Report Q2 2026: canales, red de tiendas, platino, aranceles', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-08-12', url: BC('Pandora Q2 2026 Interim Report Company announcement_No_1015') },
  { id: 3, titulo: 'State of Fashion: Watches and Jewellery (mercado de joyería de 280.000 M USD en 2019 y 340.000-360.000 M USD previstos para 2025; joyería de marca 25-30 %)', editor: 'McKinsey & Company (resumido por FashionNetwork y Centurion)', tipo: 'Sectorial', fecha: '2021-06', url: 'https://hk.fashionnetwork.com/news/McKinsey-Fine-jewellery-to-see-growth-of-8-12-in-next-5-years,1319607.html' },
  { id: 4, titulo: 'Global Jewellery Market Forecast to Reach US$578 Billion by 2033 (381.500 M USD en 2025)', editor: 'Jewellery World', tipo: 'Sectorial', fecha: '2026', url: 'https://jewelleryworld.net.au/?p=275264' },
  { id: 5, titulo: 'Datos de mercado de los competidores (ingresos y margen operativo de los últimos doce meses)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/SIG/' },
  { id: 6, titulo: 'Interim Financial Report Q4 2025: plan de platino, ventas por colección y canal', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Pandora Q4 2025 Interim Report Company Announcement No 997') },
  { id: 7, titulo: 'Annual Report 2021: historia, Phoenix y recuperación de 2019-2020', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2022-02-08', url: BC('Annual Report 2021') },
  { id: 8, titulo: 'Silver is so pricey that the world\'s largest jeweler is switching to platinum', editor: 'Der Standard / Bloomberg', tipo: 'Prensa', fecha: '2026-02', url: 'https://www.derstandard.at/story/3000000307417/silver-is-so-pricey-that-the-worlds-largest-jeweler-is-switching-to-platinum' },
  { id: 9, titulo: 'Plata (SI=F) y oro (GC=F): cierres mensuales de futuros', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/SI%3DF/' },
];

const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Pandora nace en 1982 como joyería familiar en Copenhague (Per y Winnie Enevoldsen) y en 2000 lanza la pulsera de charms intercambiables que define la marca [7]. Crece con distribuidores hasta salir a bolsa en Copenhague en 2010 [7]. En 2018 la acción cae un 61 % por el frenazo de ventas y los descuentos; Alexander Lacik (2019) hace un plan de reestructuración y en 2021 lanza la estrategia Phoenix: marca, diseño, personalización y mercados núcleo, con más tiendas propias y online [7]. Entre 2021 y 2024 crece un 7-13 % orgánico al año con márgenes EBIT del 25 % [1]. En 2025 la plata se triplica y en 2026 la nueva consejera delegada, Berta de Pablos-Barbier, anuncia el paso de buena parte del surtido de plata a platino chapado [6].',
    hitos: [
      { anio: '1982', hito: 'Fundación en Copenhague [7].' },
      { anio: '2000', hito: 'Lanzamiento de la pulsera de charms [7].' },
      { anio: '2005', hito: 'Primera fábrica en Tailandia, base de su integración vertical [1].' },
      { anio: '2010', hito: 'Salida a bolsa en Nasdaq Copenhague [7].' },
      { anio: '2018', hito: 'Caída de ventas comparables y de la acción (−61 %) [7].' },
      { anio: '2021', hito: 'Estrategia Phoenix y vuelta al crecimiento (23 % orgánico) [7].' },
      { anio: '2023', hito: 'Día del inversor: crecimiento orgánico «alto de un dígito» con la plata a ≈ 24 USD/oz [2].' },
      { anio: '2026', hito: 'Nueva consejera delegada; suspensión de recompras y paso al platino chapado [6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Pandora diseña, fabrica y vende joyería asequible de marca propia: charms y pulseras (Core, 74 % de las ventas en 2025) y colecciones como Timeless, Signature, ESSENCE y diamantes de laboratorio (Fuel with more, 26 %) [6]. Fabrica casi todo en sus talleres de Tailandia (y pronto Vietnam) con plata y oro 100 % reciclados [1]. Vende en más de 100 países en ≈ 7.000 puntos de venta, de ellos 2.811 tiendas concepto [2]. **Reparto por canal (2025): 85,8 % en canales propios —tiendas concepto propias 56,5 %, otros puntos propios (tiendas en tienda) 6,5 % y online propio 22,9 %—, 11,9 % a franquiciados y mayoristas y 2,3 % a distribuidores** [6]. En el primer semestre de 2026 los canales propios llegan al 87 % (tiendas 66 %, online 20 %) y franquicia y mayoristas al 11 %, más un 3 % de distribuidores [2]. Pandora no posee ningún local: todos son alquilados [2].',
    como_gana_dinero: 'Pandora es una marca que controla toda la cadena: diseña, fabrica y vende sobre todo en sus propias tiendas, como Hermès o las marcas de LVMH, pero a precios accesibles (un charm cuesta 50-100 USD) [1]. El margen bruto ronda el 79-80 % porque el producto cuesta poco frente al precio [1]; el beneficio depende de las ventas comparables de las tiendas (que diluyen los alquileres y el personal) y del precio de la plata y el oro, que pesan en el coste de ventas con 5-10 meses de retraso por las coberturas [2]. Los gastos de venta y distribución son el 37 % de las ventas y el marketing el 14 % [2]. Es muy estacional: el cuarto trimestre (Navidad) da en torno al 36 % de las ventas [6]. Nada es recurrente por contrato; la recompra viene de la colección de charms.',
    clientes: 'Clientela minorista muy dispersa: no hay clientes relevantes salvo los franquiciados y mayoristas (14 % de las ventas en 2025) [6]. El poder de precios está demostrado: entre 2021 y 2024 subió el margen bruto 3,7 puntos con la plata al alza [1], y en 2026 reposicionó precios en Latinoamérica con un LFL del 18 % en el 2T [2]. Su límite también: con la plata a 70-90 USD/oz no pudo subir precios lo suficiente sin perder el posicionamiento asequible, y por eso cambia de material [6]. El LFL del Core (charms) es −1 % en el 2T26: la marca ha perdido algo de tirón en sus mercados más maduros (Italia, Reino Unido, Alemania, Francia) [2].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es la joyería mundial al por menor (con y sin marca), donde Pandora tiene una cuota en torno al 1,4 %. McKinsey estimaba 280.000 M USD en 2019 y 340.000-360.000 M USD para 2025 [3]; una estimación de prensa sectorial da 381.500 M USD en 2025 [4]. Usamos la de McKinsey (360.000 M USD, ≈ 2,4 billones de DKK al cambio de hoy) por ser la fuente más conocida y por coincidir en orden de magnitud con la otra. La joyería de marca es solo el 25-30 % del mercado y gana cuota [3].',
    tamano: '≈ 360.000 M USD en 2025 (≈ 2.400.000 M DKK) [3]; 381.500 M USD según otra estimación [4]',
    unidad_serie: 'millones de DKK (al cambio de hoy, 6,66 DKK por USD)',
    serie: [
      { anio: '2019', tamano: 1864000 }, { anio: '2025', tamano: 2397000 }, { anio: '2030e', tamano: 2917000 },
    ],
    tcac_historico_pct: 4.3, tcac_previsto_pct: 4.0, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Paso de joyería sin marca a joyería de marca', efecto: '+', horizonte: 'Estructural', evidencia: 'La de marca pasaría del 20 % a 25-30 % del mercado [3].' },
      { driver: 'Precio de la plata y el oro', efecto: '−', horizonte: 'Cíclico', evidencia: 'Plata de 30 a 93 USD/oz entre 2025 y febrero de 2026; 57 USD/oz hoy [9].' },
      { driver: 'Confianza del consumidor de rentas medias en EE. UU. y Europa', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Menos tráfico en EE. UU.: LFL de −1 % en Norteamérica en el 2T26 [2].' },
      { driver: 'Aranceles de EE. UU. a las importaciones de Tailandia', efecto: '−', horizonte: 'Cíclico', evidencia: '19 % en 2025-2026, 12,5 % desde julio de 2026; 100 pb de margen en 2026 [2].' },
      { driver: 'Diamantes de laboratorio que abaratan la joyería con diamante', efecto: '+', horizonte: 'Estructural', evidencia: 'Pandora Lab-Grown Diamonds +15 % LFL en 2025 [6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Mercado fragmentado con miles de joyeros locales, marcas de moda y competidores online baratos; Pandora tiene ≈ 1,4 % de cuota [3].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes individuales sin poder de negociación; el 86 % de la venta es en canales propios [6].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'La plata y el oro cotizan en mercados mundiales; su precio se triplicó y obliga a cambiar de material [6, 9].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Fabricar es fácil; crear una marca global con 2.800 tiendas no. Las marcas nativas digitales entran por precio [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Compite con otros regalos y con la bisutería de moda; el diamante de laboratorio sustituye al natural [6].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La joyería asequible depende del consumo discrecional de rentas medias. En 2020 las ventas de Pandora cayeron un 13 % y se recuperaron un 23 % en 2021 [7]; en 2008-09 la empresa todavía crecía por expansión. Hoy el tráfico en EE. UU. está bajo por la confianza del consumidor, Europa está plana (LFL −2 % en EMEA en el 2T26) y crecen Latinoamérica y Asia [2]. Los indicadores que lo dicen: LFL por región y comentarios sobre tráfico en tienda.' },
    regulacion: 'Lo que más pesa son los aranceles de EE. UU.: la joyería de Tailandia pagó un 19 % en 2025 y paga un 12,5 % desde el anuncio de julio de 2026; además el Tribunal Supremo de EE. UU. anuló los aranceles IEEPA y Pandora recupera 72 M USD (vendió el derecho por 55 M USD en mayo de 2026) [2]. En Europa, la directiva de información de sostenibilidad (CSRD) ya se aplica en su informe anual [1]. Tailandia retira algunos incentivos fiscales en 2026 (tipo efectivo ≈ 25 %) [2].',
    tendencias: 'El diamante de laboratorio abarata la joyería con piedra y Pandora lo vende desde 2021 [6]. El cambio de material (plata a platino chapado sobre su aleación EVERSHINE) es la apuesta de 2026-2028 para reducir la dependencia de la plata: si el cliente lo acepta como «joya de verdad», la marca gana margen; si no, pierde posicionamiento [2, 8]. Las redes sociales y las colaboraciones (Collabs +18 % LFL en 2025: Disney, Marvel, Harry Potter) mueven la demanda más que la publicidad tradicional [6]. Pandora gana con la marca y la integración vertical, y pierde si el charm pasa de moda.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.4,
    posicion: '1.ª marca de joyería del mundo por unidades y la única global en joyería asequible; ≈ 1,4 % del mercado mundial de joyería y ≈ 2 % en Norteamérica [1, 3].',
    competidores: [
      { nombre: 'Chow Tai Fook', pais: 'Hong Kong', ticker: '1929.HK', ingresos: 80100, cuota_pct: 3.3, margen_ebit_pct: 21.0, comentario: 'Mayor joyero del mundo por ventas, sobre todo oro en China; margen operativo de Yahoo [5].' },
      { nombre: 'Richemont (joyería: Cartier, Van Cleef & Arpels)', pais: 'Suiza', ticker: 'CFR.SW', ingresos: 167600, cuota_pct: null, margen_ebit_pct: 19.4, comentario: 'Lujo alto, no asequible; ingresos del grupo y margen operativo de Yahoo [5].' },
      { nombre: 'Signet Jewelers', pais: 'EE. UU.', ticker: 'SIG', ingresos: 45400, cuota_pct: 1.9, margen_ebit_pct: 6.3, comentario: 'Mayor minorista de joyería con diamantes de EE. UU. (Kay, Zales, Jared): minorista multimarca [5].' },
      { nombre: 'Luk Fook', pais: 'Hong Kong', ticker: '0590.HK', ingresos: 14600, cuota_pct: null, margen_ebit_pct: 18.1, comentario: 'Joyería de oro en China [5].' },
      { nombre: 'Titan (Tanishq)', pais: 'India', ticker: 'TITAN.NS', ingresos: 64800, cuota_pct: null, margen_ebit_pct: 12.3, comentario: 'Mayor marca de joyería de la India [5].' },
      { nombre: 'Swarovski', pais: 'Austria', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidor directo en joyería asequible de cristal; no cotiza ni publica márgenes completos.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'La pulsera de charms crea colección: el cliente vuelve a comprar sobre su pulsera; Moments es el 61 % de las ventas [6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca con el mayor reconocimiento del sector y margen bruto del 79 % durante años [1]; licencias de Disney, Marvel y otras (Collabs, 10 % de las ventas) [6].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Fabricación propia a escala en Tailandia; margen EBIT del 24-25 % frente al 6 % de Signet y el 12-21 % de los grandes joyeros [1, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '2.811 tiendas concepto y 7.000 puntos de venta; ningún competidor asequible tiene esa red global [2].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) que el charm pase de moda en los mercados maduros (Core LFL −1 % en el 2T26; en 2018 la acción perdió el 61 % por eso) [2, 7]; (2) que el platino chapado se perciba como un producto de menos valor que la plata de ley y dañe la marca [8]; (3) marcas digitales y de moda que copian el formato a menor precio. La probabilidad de las dos primeras es media; se sabrá en 2027 con el LFL y la aceptación del platino.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'CDP (clima)', calificacion: 'A', fecha: '2025-12' },
      { agencia: 'CDP Supplier Engagement Assessment', calificacion: 'A (cuarto año)', fecha: '2026-07' },
      { agencia: 'TIME World\'s Most Sustainable Companies', calificacion: 'Puesto 14', fecha: '2026-06' },
    ],
    materialidad: 'Lo que mueve las cifras: (1) los metales: Pandora usa plata y oro 100 % reciclados, lo que le da una historia de marca pero no le libra del precio de mercado; el paso al platino cambia su exposición [1, 2]; (2) las emisiones: −17 % en alcances 1-3 desde 2019 con ventas +49 % y objetivo de reducirlas a la mitad en 2030 [2]; (3) las condiciones laborales en sus talleres de Tailandia, con ≈ 39.000 empleados en el grupo [2]. El diamante de laboratorio lleva etiqueta de carbono (12,58 kg de CO₂e por quilate) [2].',
    controversias: 'Sin sanciones ni litigios relevantes en los últimos tres años en los informes anuales y trimestrales revisados [1, 2]. La reclamación de aranceles IEEPA es a favor de Pandora [2].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Cuota de los cinco primeros (CR5)', tipo: 'Complemento', intentos: '1) Informe anual de Pandora (no la da); 2) McKinsey (solo la cuota de la joyería de marca); 3) prensa sectorial (sin cifra fiable)', decision: 'Omitido' },
  ],
};

// ================================================================ C. Directivos y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: gobierno, consejo, comités, equipo directivo, accionistas y retribución', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Annual Report 2025') },
  { id: 2, titulo: 'Remuneration Report 2025', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Remuneration Report 2025') },
  { id: 3, titulo: 'Interim Financial Report Q2 2026: relevo del director financiero, nombramiento en Norteamérica', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-08-12', url: BC('Pandora Q2 2026 Interim Report Company announcement_No_1015') },
  { id: 4, titulo: 'Interim Financial Report Q1 2026: consejo tras la junta del 11-mar-2026 y nueva directora de producto', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-05-06', url: BC('Pandora Q1 2026 Interim Report Company announcement_No_1012') },
  { id: 5, titulo: 'Trading in Pandora A/S shares by Board members, Executives and Associated persons (compra de 1.620 acciones por la consejera delegada)', editor: 'Pandora A/S (vía Inderes)', tipo: 'Primaria', fecha: '2026-08-17', url: 'https://www.inderes.dk/releases/trading-in-pandora-as-shares-by-board-members-executives-and-associated-persons-38' },
  { id: 6, titulo: 'Corporate Governance Statement 2025', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Corporate_Governance_Statement_2025_107b') },
  { id: 7, titulo: 'Annual Report 2023 y 2021 (guías anuales)', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2024-02-07', url: BC('Annual Report 2023') },
  { id: 8, titulo: 'Interim Financial Reports Q4 2024 y Q4 2025 (guía y real)', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-02-04', url: BC('Pandora Q4 2024 Interim Report Company Announcement No 921_1') },
  { id: 9, titulo: 'Jewellery maker Pandora hit by weak US holiday shopping (avance de 2025 del 9-ene-2026)', editor: 'Reuters / Global Banking & Finance Review', tipo: 'Prensa', fecha: '2026-01-09', url: 'https://www.globalbankingandfinance.com/jewellery-maker-pandora-weak-consumer-sentiment-hits-growth/' },
];

const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Berta de Pablos-Barbier', cargo: 'Presidenta y consejera delegada', desde: '2026', participacion_pct: 0.01, trayectoria: 'Directora de marketing de Pandora desde 2024; antes presidenta de Moët & Chandon, Dom Pérignon y Mercier (LVMH), directora de crecimiento en Mars Wrigley y de marketing en Lacoste [1]. Sus resultados en el cargo: guía de 2026 subida en agosto y LFL de 0 % a 1 % en el 1S26 [3].' },
      { nombre: 'Anders Boyer', cargo: 'Director financiero (sale el 30-nov-2026)', desde: '2018', participacion_pct: null, trayectoria: 'Antes director financiero de Hempel y GN Store Nord. Con Lacik dirigió la reestructuración de 2019-2020 y la estrategia Phoenix; ingresos +389 % durante su mandato según la empresa [3].' },
      { nombre: 'Paulo Garcia', cargo: 'Director financiero desde el 1-dic-2026', desde: '2026', participacion_pct: null, trayectoria: 'Director financiero de Walmart México y Centroamérica (Walmex); antes en Ahold Delhaize y Unilever [3].' },
      { nombre: 'Peter A. Ruzicka', cargo: 'Presidente del consejo', desde: '2019', participacion_pct: null, trayectoria: 'Presidente de Royal Unibrew y de Aspelin Eiendom; ex consejero delegado de Orkla [1].' },
      { nombre: 'Philippa Newman', cargo: 'Directora de producto', desde: '2026', participacion_pct: null, trayectoria: 'Lidera la estrategia de diseño y los nuevos materiales desde el 9-mar-2026 [4].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Orgánico 3-6 %; margen EBIT 25,0-25,5 % [7]', real: 'Orgánico 7 %; margen 25,5 % [1]', cumplida: 'Sí' },
      { anio: '2023', guia: 'Margen EBIT 25-27 % (objetivo) [7]', real: 'Orgánico 8 %; margen 25,0 % [7]', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Orgánico 6-9 %; margen ≈ 25 % [7]', real: 'Orgánico 13 %; margen 25,2 % [8]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Orgánico 7-8 %; margen ≈ 24,5 % (rebajado a ≈ 24 % en mayo) [8]', real: 'Orgánico 6 %; margen 23,9 % [8, 9]', cumplida: 'No' },
    ],
    comentario: 'La credibilidad fue alta en 2021-2024 (guías cumplidas o batidas) y se rompió en 2025: el 9-ene-2026 la empresa avisó de un 6 % orgánico frente al 7-8 % y la acción cayó un 13 % [9]. El equipo está en plena renovación: nueva consejera delegada desde enero de 2026, nueva directora de producto en marzo, nuevo presidente para Norteamérica en agosto y nuevo director financiero en diciembre [1, 3, 4]. Es un riesgo de ejecución, mitigado porque la consejera delegada venía del propio equipo y el director financiero saliente se queda hasta marzo de 2027 para el relevo [3]. La guía de 2026 se ha subido una vez (agosto) [3].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Peter A. Ruzicka', cargo: 'Presidente', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneración (presidente), nombramientos' },
      { nombre: 'Marianne Kirkegaard', cargo: 'Vicepresidenta', tipo: 'Independiente', desde: '2020', comisiones: 'Nombramientos (presidenta), remuneración' },
      { nombre: 'Lilian Fossum Biner', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Birgitta Stymne Göransson', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Auditoría, nombramientos' },
      { nombre: 'Catherine Spindler', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: '—' },
      { nombre: 'Jan Zijderveld', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, remuneración' },
      { nombre: 'Lars Sandahl Sørensen', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 29.5, fijo: 15.9, variable_corto: 0.0, variable_largo: 13.6, ratio_salario_medio: 122 },
    remuneracion: 'El variable anual (STIP, 80 % del fijo como objetivo) depende en un 60 % del crecimiento comparable y en un 40 % del margen EBIT; en 2025 pagó 0 % porque no se alcanzaron los umbrales [2]. El variable a largo plazo (acciones de rendimiento con cinco años de bloqueo) depende en un 75 % del BPA y en un 25 % de objetivos de sostenibilidad [2]. El BPA como métrica premia las recompras con deuda, algo a vigilar. El consejero delegado saliente, Alexander Lacik, cobró 29,5 M DKK en 2025 y recibe 43,6 M DKK por su salida (sueldo y bonus del preaviso) más 12 M en acciones aceleradas [1, 2]. Hay cláusula de recuperación (clawback) según la política de 2024 [2]. La junta danesa aprueba el informe de remuneración sin publicar el recuento [2].',
    accionistas: [
      { nombre: 'Parvus Asset Management', pct: 12.5, tipo: 'Fondo activista (Jersey)', variacion: 'Comunicado en 2025 [1]' },
      { nombre: 'BlackRock', pct: 10.0, tipo: 'Gestora', variacion: 'Sube de 8,3 % a 10 % en 2026 [1]' },
      { nombre: 'Autocartera', pct: 0.3, tipo: 'Pandora A/S', variacion: '5,6 % a dic-25; 4,0 M de acciones amortizadas en marzo de 2026 [1, 4]' },
    ],
    insiders: [
      { fecha: '2026-08-17', persona: 'Berta de Pablos-Barbier (consejera delegada)', operacion: 'Compra', acciones: 1620, importe: 1.30 },
      { fecha: '2026-02-16', persona: 'Lilian Fossum Biner (consejera)', operacion: 'Compra', acciones: 500, importe: 0.27 },
      { fecha: '2026-02-10', persona: 'Jan Zijderveld (consejero)', operacion: 'Compra', acciones: 250, importe: 0.14 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor es Parvus con el 12,5 % y BlackRock tiene el 10 % [1]. Una sola clase de acciones con un voto por acción [1]. Consejo de siete miembros, todos independientes tras la salida de Christian Frigast en la junta de 2026, elegidos cada año [1, 4]. Sin operaciones vinculadas relevantes ni blindajes conocidos [1, 6]. La presencia de un fondo activista con el 12,5 % puede presionar por recompras o por una venta, pero no hay nada anunciado.',
    alertas: [
      'Rotación casi completa de la cúpula en 2026: consejera delegada (enero), directora de producto (marzo), presidente de Norteamérica (agosto) y director financiero (diciembre) [1, 3, 4].',
      'Indemnización de salida de 43,6 M DKK al consejero delegado anterior más acciones aceleradas [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Voto en contra de la remuneración en las tres últimas juntas', tipo: 'Complemento', intentos: '1) Actas de la junta del 11-mar-2026 (Dinamarca no publica recuento de este punto); 2) informe de remuneración 2025 (solo menciona la opinión de los accionistas); 3) prensa (sin cifras)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'Participación de cada directivo y consejero', tipo: 'Complemento', intentos: '1) Informe anual 2025 (total del consejo 85.264 y de la dirección 386.104 acciones); 2) informe de remuneración (solo consejo); 3) anuncios de operaciones (solo la consejera delegada: 6.320 acciones)', decision: 'Omitido' },
  ],
};

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de PNDORA.CO, OMXC25 y STOXX Europe 600 Personal & Household Goods (EXH7.DE)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/PNDORA.CO/history/' },
  { id: 2, titulo: 'Consenso de Pandora y de los comparables (quoteSummary: PER adelantado, múltiplos, estimaciones, recomendaciones y objetivos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/PNDORA.CO/analysis/' },
  { id: 3, titulo: 'Consensus - Post-Q2 2026 results (Visible Alpha, 28-ago-2026; 11-15 analistas)', editor: 'Pandora A/S, Investor Relations', tipo: 'Analistas', fecha: '2026-09', url: BC('Post-Q2_2026_collected consensus') },
  { id: 4, titulo: 'Tipos de cambio de referencia del euro', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Rendimiento del Bund a 10 años (curva de Svensson, BBSIS)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Interim Financial Report Q2 2026 (guía 2026, deuda neta, acciones)', editor: 'Pandora A/S', tipo: 'Primaria', fecha: '2026-08-12', url: BC('Pandora Q2 2026 Interim Report Company announcement_No_1015') },
  { id: 8, titulo: 'Consensus - Pre-Q2 2026 y Pre-Q1 2026 results', editor: 'Pandora A/S, Investor Relations', tipo: 'Analistas', fecha: '2026-08', url: BC('Pre-Q2_2026_collected consensus-PDF') },
];
const fxDKK = { DKK: 1, EUR: 7.4747, CHF: 7.4747 / 0.9261, USD: 7.4747 / 1.1225, HKD: 7.4747 / 8.8097, INR: 7.4747 / 106.559 };
const nombres = {
  'CFR.SW': ['Richemont', 'CFR', 'CH'], SIG: ['Signet Jewelers', 'SIG', 'US'], 'UHR.SW': ['Swatch Group', 'UHR', 'CH'], '1929.HK': ['Chow Tai Fook', '1929', 'HK'],
  TPR: ['Tapestry', 'TPR', 'US'], 'KER.PA': ['Kering', 'KER', 'FR'], '0590.HK': ['Luk Fook', '0590', 'HK'], 'MC.PA': ['LVMH', 'MC', 'FR'],
};
const empresas = Object.entries(nombres).map(([s, [nombre, ticker, pais]]) => {
  const v = raw[s] || {}; const p = v.price || {}; const f = v.financialData || {}; const k = v.defaultKeyStatistics || {}; const sd = v.summaryDetail || {};
  const cur = p.currency || 'EUR';
  const t1 = (v.earningsTrend?.trend || []).find((t) => t.period === '+1y');
  const debt = f.totalDebt?.raw ?? null; const cash = f.totalCash?.raw ?? null; const ebitda = f.ebitda?.raw ?? null;
  const dn = debt != null && cash != null && ebitda ? (debt - cash) / ebitda : null;
  const fcfy = f.freeCashflow?.raw != null && p.marketCap?.raw ? (f.freeCashflow.raw / p.marketCap.raw) * 100 * (f.financialCurrency && f.financialCurrency !== cur ? (fxDKK[f.financialCurrency] / fxDKK[cur]) : 1) : null;
  return { nombre, ticker, pais, capitalizacion: Math.round((p.marketCap?.raw ?? 0) / 1e6 * (fxDKK[cur] ?? 1)), ev_ventas: r2(k.enterpriseToRevenue?.raw), ev_ebitda_ltm: r1(k.enterpriseToEbitda?.raw), ev_ebitda_ntm: null, per_ntm: r1(sd.forwardPE?.raw ?? k.forwardPE?.raw), crecimiento_pct: r1((t1?.revenueEstimate?.growth?.raw ?? null) * 100), margen_ebitda_pct: r1((f.ebitdaMargins?.raw ?? null) * 100), roic_pct: null, dn_ebitda: r1(dn), fcf_yield_pct: r1(fcfy) };
});

const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Pandora A/S', nombre_corto: 'Pandora', ticker: 'PNDORA', isin: 'DK0060252690', mercado: 'Nasdaq Copenhague', indice_referencia: 'OMX Copenhagen 25',
    pais: 'Dinamarca', pais_iso: 'DK', sector: 'Consumer Discretionary', industria: 'Apparel, Accessories & Luxury Goods (GICS 25203010)', sede: 'Copenhague, Dinamarca', fundacion: '1982', empleados: 42281, web: 'https://pandoragroup.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 75.0, capitalizacion_publicada: 63581, free_float_pct: 99,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M DKK/día (3 meses; ${(bolsa.volumen_3m.acciones_dia / 1e3).toFixed(0)} mil acciones)`, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía de 2026 (12-ago-2026, confirmada en la nota previa al 3T del 7-oct): crecimiento orgánico del 0-3 % (LFL −2 % a +1 %, red +3 %, venta a socios −1 %), efecto divisa ≈ −0,6 %, margen EBIT del 22-23 % (incluye ≈ 100 pb de la devolución de aranceles IEEPA), capex ≈ 7 % de las ventas, tipo impositivo ≈ 25 % y gastos financieros netos de 1.100-1.150 M [7]. Para 2027: margen EBIT de al menos 12 % (14 % sin costes únicos de la transición) con la plata a 82 USD/oz; con la plata de 2027 cubierta al 90-100 % a ≈ 65 USD/oz, unos +200 pb. A medio plazo: margen EBIT por encima del 21 % [7]. Habrá una actualización de 2027 y de la estrategia el 4-nov-2026 [7].',
    estimaciones: [
      { periodo: '2026e', ingresos: 33364, ebitda: null, ebit: 7613, bpa: 65.0, dpa: 20.0, fuente: 'Consenso recogido por Pandora (Visible Alpha, 28-ago-2026; 14-15 analistas) [3]' },
      { periodo: '2027e', ingresos: 34884, ebitda: null, ebit: 5547, bpa: 46.0, dpa: 19.0, fuente: 'Ídem [3]; Yahoo 48,44 (18 analistas) [2]' },
      { periodo: '2028e', ingresos: 36544, ebitda: null, ebit: 7311, bpa: 64.0, dpa: 20.0, fuente: 'Ídem [3]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: 5, mantener: 13, vender: 1, po_medio: 857.17, po_min: 440, po_max: 1300 },
    revisiones: 'Subidas desde junio: el BPA de 2027 de Yahoo pasó de 41,16 a 48,44 DKK en 90 días y el de 2026 de 62,07 a 64,82 DKK, por la caída de la plata (de 75 a 57 USD/oz) y la subida de la guía de agosto [2]. El consenso recogido por la empresa da un margen EBIT de 15,9 % en 2027 y de 20,0 % en 2028 [3]. Las recomendaciones son sobre todo «mantener» (13 de 19) y el objetivo medio, 857 DKK, coincide con el precio [2].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, comentario: 'La acción cerró a 847 DKK el 16-oct-2026, un 6 % por debajo del máximo de 52 semanas (904,4 el 28-oct-2025) y un 97 % por encima del mínimo (430 el 17-mar-2026) [1]. En el año sube un 19,7 % frente al +2,3 % del OMXC25 y al −8,7 % del sector europeo de bienes personales [1]. El recorrido tiene dos fases: de enero de 2025 a marzo de 2026 cae un 67 % (aviso de ventas de 2025, plata a 93 USD/oz, aranceles y pausa de las recompras) y desde marzo casi se duplica con la caída de la plata y dos trimestres mejores de lo esperado [1, 7]. A cinco y diez años la rentabilidad de precio es prácticamente nula (−0,4 % y −0,6 % anual) [1]. Beta mensual a 5 años de 1,34 frente al OMXC25 (1,05 semanal a 5 años; 0,76 semanal a 2 años) [1].', tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 815.4, ev_ebitda_ntm: null, per_ntm: 15.2, excluir: false },
      { anio: '2022', precio_cierre: 488.1, ev_ebitda_ntm: null, per_ntm: 8.9, excluir: false },
      { anio: '2023', precio_cierre: 933.2, ev_ebitda_ntm: null, per_ntm: 14.4, excluir: false },
      { anio: '2024', precio_cierre: 1317.0, ev_ebitda_ntm: null, per_ntm: 19.4, excluir: false },
      { anio: '2025', precio_cierre: 707.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Cierres de diciembre de Yahoo [1]. PER adelantado = cierre ÷ BPA diluido real del año siguiente (2021: 815,4 ÷ 53,7; 2024: 1.317 ÷ 67,9) [1]. La acción ha cotizado entre 9 y 19 veces el beneficio del año siguiente: el mínimo de 2022 coincide con el miedo a la recesión y el máximo de 2024 con el 13 % de crecimiento orgánico. Hoy cotiza a ≈ 13 veces el BPA de consenso de 2026 y a ≈ 17-18 veces el de 2027, el año del golpe de la plata [2]: la prima frente a la historia es solo aparente si 2027 es un año de beneficio deprimido y no la nueva normalidad.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Marcas de joyería y de lujo accesible con tienda propia y fabricación o diseño propios: Richemont (Cartier, Van Cleef), Swatch, Chow Tai Fook, Luk Fook, Tapestry (Coach, Kate Spade), Kering y LVMH (Tiffany, Bulgari), más Signet como minorista de joyería de EE. UU. Se excluye Titan (India), que cotiza a ≈ 50 veces el beneficio por su crecimiento del 17-29 % y distorsiona la mediana, y Laopu Gold por la misma razón. Ninguno es un comparable puro: Pandora es la única marca global de joyería asequible.',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'Operaciones comparables con múltiplos', tipo: 'Complemento', intentos: '1) Compras de tiendas de franquiciados de Pandora (sin múltiplos publicados); 2) LVMH-Tiffany (2021) y Signet-Blue Nile/Diamonds Direct (2021-2022): sin EBITDA publicado en la nota oficial accesible; 3) prensa (múltiplos con perímetros mezclados)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) Finanstilsynet (xlsx mensual no descargado a tiempo); 2) Yahoo (sin dato para Copenhague); 3) prensa (sin cifra)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'EBITDA del consenso', tipo: 'Complemento', intentos: '1) Consenso recogido por Pandora (no lo incluye); 2) Yahoo (solo ventas y BPA); 3) MarketScreener (sin acceso)', decision: 'Omitido' },
  ],
};

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Pandora: recomendaciones de 19 analistas (5 comprar, 13 mantener, 1 vender) y revisiones del BPA', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/PNDORA.CO/analysis/' },
  { id: 2, titulo: 'Silver is so pricey that the world\'s largest jeweler is switching to platinum', editor: 'Der Standard / Bloomberg', tipo: 'Prensa', fecha: '2026-02', url: 'https://www.derstandard.at/story/3000000307417/silver-is-so-pricey-that-the-worlds-largest-jeweler-is-switching-to-platinum' },
  { id: 3, titulo: 'Pandora shares rise as jeweller plans shift to platinum amid silver challenges', editor: 'Yahoo Finance / Reuters', tipo: 'Prensa', fecha: '2026-02', url: 'https://finance.yahoo.com/news/pandora-misses-growth-target-shares-082805337.html' },
  { id: 4, titulo: 'Jewellery maker Pandora hit by weak US holiday shopping', editor: 'Reuters / Global Banking & Finance Review', tipo: 'Prensa', fecha: '2026-01-09', url: 'https://www.globalbankingandfinance.com/jewellery-maker-pandora-weak-consumer-sentiment-hits-growth/' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Analistas (Yahoo)', fecha: '2026-10', n_comentarios: 19, tono: 'Neutro', resumen: 'Trece de diecinueve recomiendan mantener; el objetivo medio (857 DKK) coincide con el precio; el BPA de 2027 sube un 18 % en 90 días [1].' },
      { plataforma: 'Prensa económica internacional (Bloomberg, Reuters)', fecha: '2026-02', n_comentarios: 6, tono: 'Dividido', resumen: 'Dudan de que el cliente acepte el platino chapado como joya de valor; otros lo ven como una protección del margen que llega tarde [2, 3].' },
      { plataforma: 'Prensa económica (avance de 2025)', fecha: '2026-01', n_comentarios: 4, tono: 'Negativo', resumen: 'Tráfico débil en EE. UU. y guía incumplida: la acción toca mínimos desde 2023 [4].' },
    ],
    temas: [
      { tema: 'Plata y paso al platino', postura: 'Dividida', peso: 'Alto', contraste: 'La plata ha bajado de 93 a 57 USD/oz y 2027 está cubierto a ≈ 65; el riesgo de marca del platino no se medirá hasta 2027.' },
      { tema: 'Tráfico débil en EE. UU. y Europa', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: LFL −1 % en Norteamérica y −2 % en EMEA en el 2T26; mejora en el 3T según la empresa.' },
      { tema: 'Vuelta de las recompras', postura: 'Alcista', peso: 'Medio', contraste: 'Sin fecha: dependen del avance del platino; el apalancamiento está en 1,5 veces.' },
    ],
    lectura: 'Sin foros accesibles, el pulso viene de analistas y prensa: el sentimiento ha pasado de la capitulación de marzo (acción en 430 DKK) a una neutralidad prudente tras subir un 97 %. No hay euforia: la mayoría de analistas recomienda mantener y su objetivo medio está en el precio. No aporta riesgos nuevos frente a los del informe; confirma que la tesis depende del margen de 2027-2028.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Foros de inversores (Euroinvestor, Shareville, Reddit, Stocktwits, Seeking Alpha)', tipo: 'Complemento', intentos: '1) Stocktwits (PANDY, PNDZY y PNDZF sin mensajes) y Seeking Alpha (RSS 404); 2) Euroinvestor y Shareville (contenido en JavaScript, sin acceso); 3) Reddit y Simply Wall St (403)', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('A-E escritas;', empresas.length, 'comparables');
console.table(empresas.map((e) => ({ n: e.nombre, cap: e.capitalizacion, evv: e.ev_ventas, eve: e.ev_ebitda_ltm, per: e.per_ntm, g: e.crecimiento_pct, m: e.margen_ebitda_pct, dn: e.dn_ebitda, fcf: e.fcf_yield_pct })));
