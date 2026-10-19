// Escribe las notas A-E de Giant Biogene Holding Co., Ltd (2367.HK; corte 2026-10-19; Hong Kong sin sesión el 19-oct por el día
// siguiente a Chung Yeung: último cierre, 16-oct-2026).
// Fuentes primarias: HKEXnews (informes anuales 2022-2025, resultados anuales 2025, resultados e informe semestral 2026, resultados
// semestrales 2024 y 2025, anuncios voluntarios, junta de 2026, cambio de auditor, colocación de 2025, declaración mensual de acciones
// de sep-2026). Bolsa y comparables: Yahoo Finance; consenso: MarketScreener y Yahoo; bono: ChinaBond. Foro: Guba (Eastmoney).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/giant-biogene-2026-10-19/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de RMB salvo que se diga otra cosa; la acción cotiza en HKD.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const H = 'https://www1.hkexnews.hk/listedco/listconews/sehk';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const yd = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-datos.json'), 'utf8')).datos;
// Tipos de cambio (Yahoo Finance, cierre del 15-oct-2026, último con dato antes del 16-oct): RMB por unidad.
const FX = { CNY: 1, HKD: 0.8528, JPY: 0.04231, EUR: 7.5035, USD: 6.6909 };
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025: estados consolidados NIIF de 2025 y 2024 auditados por Ernst & Young, notas, resumen de cinco años, remuneración de consejeros y participaciones', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-04-29', url: `${H}/2026/0429/2026042904378.pdf` },
  { id: 2, titulo: 'Announcement of annual results for the year ended 31 December 2025 (ventas por marca, canal y categoría; dividendos)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-03-19', url: `${H}/2026/0319/2026031901060.pdf` },
  { id: 3, titulo: 'Announcement of interim results for the six months ended 30 June 2026 (revisado por KPMG)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-08-18', url: `${H}/2026/0818/2026081801176.pdf` },
  { id: 4, titulo: 'Interim Report 2026: estado de flujos del 1S26, participaciones y planes de acciones', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-09-24', url: `${H}/2026/0924/2026092401138.pdf` },
  { id: 5, titulo: 'Annual Report 2024: estados de 2024 y 2023 (flujos)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2025-04-28', url: `${H}/2025/0428/2025042804059.pdf` },
  { id: 6, titulo: 'Annual Report 2023: estados de 2023 y 2022, ventas por marca y resumen de cinco años', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2024-04-29', url: `${H}/2024/0429/2024042905245.pdf` },
  { id: 7, titulo: 'Annual Report 2022: estados de 2022 y 2021 (reorganización previa a la salida a bolsa)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2023-04-26', url: `${H}/2023/0426/2023042601787.pdf` },
  { id: 8, titulo: 'Announcement of interim results for the six months ended 30 June 2025', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2025-08-27', url: `${H}/2025/0827/2025082701277.pdf` },
  { id: 9, titulo: 'Announcement of interim results for the six months ended 30 June 2024', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2024-08-19', url: `${H}/2024/0819/2024081901270.pdf` },
  { id: 10, titulo: 'Monthly Return of Equity Issuer, septiembre de 2026 (1.061.704.000 acciones emitidas, sin autocartera)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-10-06', url: `${H}/2026/1006/2026100600528.pdf` },
  { id: 11, titulo: 'Voluntary announcement: proposed share repurchase under the share repurchase mandate', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2025-12-02', url: `${H}/2025/1202/2025120200483.pdf` },
  { id: 12, titulo: 'Placing of existing shares and top-up subscription of new shares (35 M de acciones a 66,65 HKD)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2025-04-17', url: `${H}/2025/0417/2025041700013.pdf` },
];

// Cuenta (RMB M). EBIT = beneficio antes de impuestos − intereses bancarios − resultado de productos financieros a valor razonable
// − diferencias de cambio − participadas + gastos financieros (los intereses van en «otros ingresos» en las cuentas) [A1, A5, A6, A7].
const cuenta = [
  { periodo: '2021', ingresos: 1552.5, coste_ventas: 198.1, gastos_generales: 418.5, ebitda: 951.6, amortizaciones: 24.2, ebit: 927.4, resultado_financiero: 45.5, bai: 972.9, impuestos: 144.8, minoritarios: 0, beneficio_neto: 828.1, gastos_financieros: 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.83, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 997.7 },
  { periodo: '2022', ingresos: 2364.4, coste_ventas: 369.2, gastos_generales: 817.4, ebitda: 1215.0, amortizaciones: 27.6, ebit: 1187.3, resultado_financiero: -9.6, bai: 1177.7, impuestos: 176.2, minoritarios: -0.4, beneficio_neto: 1002.0, gastos_financieros: 0.02, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.98, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 1021.2 },
  { periodo: '2023', ingresos: 3524.1, coste_ventas: 577.0, gastos_generales: 1261.2, ebitda: 1701.5, amortizaciones: 34.2, ebit: 1667.3, resultado_financiero: 77.8, bai: 1745.1, impuestos: 296.9, minoritarios: -3.6, beneficio_neto: 1451.8, gastos_financieros: 0.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.48, dpa: 0.89, dpa_extraordinario: 0.45, acciones_diluidas: 982.7 },
  { periodo: '2024', ingresos: 5538.8, coste_ventas: 991.9, gastos_generales: 2158.8, ebitda: 2359.4, amortizaciones: 49.5, ebit: 2309.9, resultado_financiero: 147.9, bai: 2457.8, impuestos: 396.0, minoritarios: -0.6, beneficio_neto: 2062.3, gastos_financieros: 0.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.06, dpa: 1.1942, dpa_extraordinario: 0.5921, acciones_diluidas: 1001.7 },
  { periodo: '2025', ingresos: 5518.5, coste_ventas: 1085.2, gastos_generales: 2224.4, ebitda: 2220.7, amortizaciones: 82.2, ebit: 2138.5, resultado_financiero: 211.8, bai: 2350.3, impuestos: 435.6, minoritarios: -0.2, beneficio_neto: 1914.8, gastos_financieros: 0.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.81, dpa: 1.2104, dpa_extraordinario: 0.6714, acciones_diluidas: 1059.4 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5323.5, ebitda: 1812.8, ebit: 1722.0, beneficio_neto: 1672.5, bpa: 1.57, dpa: 1.2104, dpa_extraordinario: 0.6714, fcf: 1601, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Reorganización previa a la salida a bolsa: 7.094 M de caja de la serie A y 6.360 M de recompra de acciones ordinarias de los fundadores pendiente en «otras cuentas a pagar» (pagada en 2022); balance no comparable [A7].' },
    ],
    comentario: 'Las ventas pasaron de 1.552 M en 2021 a 5.539 M en 2024 (+52,8 % anual), todo orgánico, empujadas por KOMFYMED (可复美), que pasó de 898 M a 4.542 M con el «胶原棒» (sérum monodosis de colágeno recombinante) y las ventas en directo de Douyin y Tmall [A1, A6, A7]. Después se frenaron en seco: 2025 quedó plano (5.519 M, −0,4 %) con un 2S25 de 2.406 M (−19,8 % frente a 2.998 M del 2S24) y el 1S26 cayó un 6,3 % (2.918 M) [A2, A3]. El margen EBITDA, del 42-43 % en 2024, bajó al 40,2 % en 2025 y al 34,1 % en el 1S26: el margen bruto cedió del 82,1 % (2024) al 79,5 % (1S26) por la mezcla, y el gasto comercial subió del 36,3 % de las ventas en 2024 al 43,4 % en el 1S26 (1.267 M, +19,7 %) por marca, lanzamientos y tiendas propias mientras caía la venta por influencers [A1, A3]. El resultado financiero (intereses de ≈ 7.600 M de caja y productos financieros) suma 212 M en 2025 y 138 M en el 1S26: el 9-13 % del beneficio antes de impuestos.',
    ajustes: 'Cifras publicadas NIIF. La empresa da un «beneficio neto ajustado» que suma los pagos en acciones (45 M en 2025, 90 M en 2024, 6 M en el 1S26): 1.960 M en 2025 frente a 1.915 M publicados [A2, A3]; usamos el publicado. El tipo impositivo de 2025 (18,5 %) lleva 92 M de retención sobre los dividendos de las filiales chinas (23 M en 2024): es recurrente mientras la empresa reparta. 2022 lleva 8 M de pérdidas en productos financieros y 14 M de diferencias de cambio; 2021, 22 M de ganancias de cambio. No hay deterioros ni reestructuraciones.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 2540.4, crecimiento_pct: 58.2, crecimiento_organico_pct: 58.2, ebitda: 1119.3, margen_ebitda_pct: 44.1, bpa: 0.97, vs_consenso: null },
      { periodo: '2S24', ingresos: 2998.4, crecimiento_pct: 56.3, crecimiento_organico_pct: 56.3, ebitda: 1240.1, margen_ebitda_pct: 41.4, bpa: 1.09, vs_consenso: null },
      { periodo: '1S25', ingresos: 3112.7, crecimiento_pct: 22.5, crecimiento_organico_pct: 22.5, ebitda: 1401.7, margen_ebitda_pct: 45.0, bpa: 1.13, vs_consenso: null },
      { periodo: '2S25', ingresos: 2405.8, crecimiento_pct: -19.8, crecimiento_organico_pct: -19.8, ebitda: 819.0, margen_ebitda_pct: 34.0, bpa: 0.68, vs_consenso: null },
      { periodo: '1S26', ingresos: 2917.7, crecimiento_pct: -6.3, crecimiento_organico_pct: -6.3, ebitda: 993.8, margen_ebitda_pct: 34.1, bpa: 0.89, vs_consenso: null },
    ],
    ultima_presentacion: 'La empresa publica semestres. En los resultados de 2025 (19-mar-2026) la dirección habló de un año «extraordinario» por la competencia y los «golpes externos» (la polémica del colágeno de mayo-junio de 2025), reconoció que «los dividendos tradicionales de tráfico ya no están» y que la incertidumbre del tráfico externo es grande, y fijó para 2026 el objetivo de «volver a crecer» con lanzamientos y más venta propia [A2]. En el 1S26 (18-ago-2026) atribuyó la caída del 6,3 % a una «reestructuración por fases» de las ventas de cuidado profesional de la piel (menos venta por influencers, distribuidores más prudentes y JD.com reponiendo menos), mantuvo el objetivo de volver a crecer en el año y destacó el «超透棒» (más de 30 M de GMV en su primera semana en canal propio), el +25 % de GMV de KOMFYMED en el 618 y el lanzamiento del inyectable 753 (clase III) [A3]. Entre un mensaje y otro cambia el énfasis: de la competencia de precios a la reorganización de canales y a la estética médica. No dio cifras de ventas ni margen para el 2S ni explicó cuánto del gasto comercial (43,4 % de las ventas) es inversión puntual. No hay transcripción pública de la conferencia en las fuentes leídas.',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 7878.2, activo_corriente: 7441.3, pasivo_corriente: 6843.0, pasivo_total: 6861.4, fondo_comercio: 0, intangibles: 7.6, inmovilizado_material: 298.5, existencias: 89.4, clientes: 65.6, proveedores: 23.6, activos_contrato: null, pasivos_contrato: null, caja: 7258.6, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 1016.8, minoritarios: 0, reservas: 118.5 },
      { periodo: '2022', activo_total: 3138.2, activo_corriente: 2537.7, pasivo_corriente: 280.9, pasivo_total: 301.2, fondo_comercio: 0, intangibles: 6.8, inmovilizado_material: 491.4, existencias: 183.9, clientes: 69.4, proveedores: 54.7, activos_contrato: null, pasivos_contrato: null, caja: 2196.9, deuda_financiera: 0, arrendamientos: 2.6, patrimonio_neto: 2833.5, minoritarios: 3.6, reservas: 1078.7 },
      { periodo: '2023', activo_total: 4973.1, activo_corriente: 4135.1, pasivo_corriente: 530.6, pasivo_total: 602.0, fondo_comercio: 0, intangibles: 7.4, inmovilizado_material: 663.5, existencias: 200.4, clientes: 102.0, proveedores: 133.1, activos_contrato: null, pasivos_contrato: null, caja: 3778.8, deuda_financiera: 0, arrendamientos: 2.7, patrimonio_neto: 4362.1, minoritarios: 8.9, reservas: 2483.0 },
      { periodo: '2024', activo_total: 8038.0, activo_corriente: 6402.0, pasivo_corriente: 836.0, pasivo_total: 918.1, fondo_comercio: 0, intangibles: 5.8, inmovilizado_material: 1041.8, existencias: 310.8, clientes: 141.3, proveedores: 286.7, activos_contrato: null, pasivos_contrato: null, caja: 6299.3, deuda_financiera: 0, arrendamientos: 6.7, patrimonio_neto: 7108.2, minoritarios: 11.6, reservas: 4056.9 },
      { periodo: '2025', activo_total: 10841.4, activo_corriente: 9018.5, pasivo_corriente: 800.0, pasivo_total: 916.6, fondo_comercio: 0, intangibles: 5.0, inmovilizado_material: 1203.5, existencias: 391.1, clientes: 201.9, proveedores: 198.6, activos_contrato: null, pasivos_contrato: null, caja: 8469.2, deuda_financiera: 0, arrendamientos: 9.7, patrimonio_neto: 9911.5, minoritarios: 13.3, reservas: 4652.4 },
    ],
    vencimientos: [],
    liquidez: 'Caja y equivalentes de 4.852,5 M, productos financieros de bancos a valor razonable de 2.543,3 M y ≈ 199 M de depósitos a más de un año a 30-jun-2026 (≈ 7.594 M); sin deuda bancaria ni avales [A3, A4]. El 51 % de la caja está en USD (2.499 M) [A3].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'No hay deuda financiera ni pasivos por pensiones (planes de aportación definida). Arrendamientos de 12,3 M (NIIF 16). Compromisos de inversión contratados de 330,6 M (fábricas y líneas) a 30-jun-2026 [A3]. No hay pasivos contingentes materiales según la empresa [A3]. Pasivos por contrato (anticipos de clientes) de 52 M. No hay factoring ni confirming declarados. La caja de las filiales chinas paga una retención al subir como dividendo a la matriz de las Caimán (92 M de impuesto en 2025) [A1].',
    comentario: 'El balance es casi todo caja: 7.594 M de liquidez sobre un activo de 10.244 M a jun-2026. Creció con el beneficio y con dos colocaciones (1.499 M en mayo de 2024 y 2.164 M en abril de 2025, esta a 66,65 HKD) [A1, A12], a pesar de repartir 908 M en 2024, 1.279 M en 2025 y 1.285 M en el 1S26. El circulante comercial es pequeño (394 M a dic-2025, el 7,1 % de las ventas) pero empeoró en 2025: existencias +26 % (391 M, la mayoría producto acabado) y clientes +43 % con ventas planas, y proveedores −31 % [A2]. En el 1S26 los clientes casi se doblan (389 M) por la venta a plataformas y distribuidores, un punto a vigilar [A3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 692.4, capex: 111.2, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 16.5, dividendos: 2550.0, recompras: 0, emision_acciones: 7094.2, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 931.6, capex: 153.2, pagos_arrendamientos: 0.2, adquisiciones: 0, desinversiones: 0, dividendos: 367.5, recompras: 6235.8, emision_acciones: 809.7, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 1647.4, capex: 228.4, pagos_arrendamientos: 1.0, adquisiciones: 0, desinversiones: 33.1, dividendos: 0, recompras: 0, emision_acciones: 52.9, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 2041.2, capex: 246.8, pagos_arrendamientos: 4.2, adquisiciones: 16.0, desinversiones: 0, dividendos: 908.4, recompras: 0, emision_acciones: 1495.6, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 1780.6, capex: 428.8, pagos_arrendamientos: 7.3, adquisiciones: 220.7, desinversiones: 7.2, dividendos: 1278.9, recompras: 166.1, emision_acciones: 2373.3, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo sale de impuestos y no incluye los intereses cobrados, que la empresa pone en inversión (168 M en 2025) [A1]. La conversión del beneficio en flujo operativo es del 93 % en 2025 y del 99 % en 2024; en el 1S26 sube a 790 M (+10 %) porque pagó menos impuestos (148 M frente a 288 M) [A4]. El capex se disparó en 2025 (429 M, el 7,8 % de las ventas) por las fábricas nuevas de Xi\'an; en el 1S26 bajó a 95 M con 27 M de derechos de uso de suelo, y quedan 331 M comprometidos [A3, A4]. Estimación propia: el capex de mantenimiento es ≈ la amortización (1,5-2 % de las ventas); el resto es capacidad para productos nuevos (inyectables de clase III, materias primas). 2021-2022 llevan la reorganización previa a la bolsa: 7.094 M de la serie A, 6.236 M de recompra a los fundadores y 2.917 M de dividendos a los fundadores [A7]. Las «adquisiciones» de 2025 son 205 M en asociadas no materiales, 14 M en una cotizada (Hanbon) y 2 M en una filial [A1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young (Hong Kong) hasta las cuentas de 2025; KPMG desde la junta del 28-may-2026',
    anios_auditor: 7,
    opinion: 'Favorable (2025, Ernst & Young)',
    comentario: 'Cuentas NIIF auditadas por EY durante siete ejercicios (2019-2025), con opinión favorable en 2025 y la venta online directa (61,6 % de las ventas) y a distribuidores (25,1 %) como cuestiones clave de auditoría [A1]. EY dimitió el 30-abr-2026 a petición de la empresa, que dice haber cambiado por «buen gobierno» tras siete años; no se declaran desacuerdos [C5, C6]. Cambiar de auditor justo después de un año malo no es una señal de fraude, pero sí un punto a vigilar. Las ventas se reconocen al entregar; los cobros son por adelantado salvo plataformas y distribuidores (7-180 días). Los pagos en acciones bajaron de 90 M (2024) a 45 M (2025) y 6 M en el 1S26 (1,6 %, 2,3 % y 0,6 % del beneficio). El I+D se lleva a gastos (89 M en 2025, 1,6 % de las ventas): no hay capitalización. Señales del circulante en 2025: existencias +26 % y clientes +43 % con ventas planas; en el 1S26 clientes +92 % frente a diciembre. El beneficio se apoya cada vez más en el resultado financiero (9 % del beneficio antes de impuestos en 2025, 13 % en el 1S26).',
    senales: [
      { senal: 'Cambio de auditor tras un año malo (EY → KPMG, abril-mayo de 2026)', nivel: 'Media', comentario: 'Lo inicia la empresa; EY dimite el 30-abr; sin desacuerdos declarados [C5, C6]. Primer cierre anual de KPMG: marzo de 2027.' },
      { senal: 'Existencias y cuentas a cobrar crecen más que las ventas', nivel: 'Media', comentario: 'Existencias +26 % y clientes +43 % en 2025 con ventas −0,4 %; clientes 389 M en jun-2026 (202 M en dic-2025) [A2, A3]. Puede ser estacionalidad del 618 y del canal JD.' },
      { senal: 'Beneficio más dependiente de intereses', nivel: 'Baja', comentario: 'Resultado financiero de 212 M en 2025 y 138 M en el 1S26; bajará con los tipos del dólar y con los dividendos.' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparto alto y con extraordinarios: dividendo ordinario + extraordinario de 0,89 RMB por 2023, 1,1942 RMB por 2024 y 1,2104 RMB por 2025 (≈ 1.290 M, el 67 % del beneficio de 2025) [A1, A2]. No hay dividendo a cuenta (ni en 2025 ni en 2026) [A3]. Recompras: 5,2 M de acciones en 2025 (166 M RMB) y 4 M en enero de 2026 (140 M HKD, a 33,7-36,3 HKD), todas amortizadas el 20-abr-2026 [A3, A11]; el mandato de la junta permite el 10 %. Ampliaciones con descuento en 2024 y 2025 (1.499 M y 2.164 M) para «reservas» y expansión [A12]. Prioridad declarada: inyectables de clase III, materias primas nuevas, marcas nuevas y salida al exterior [A2].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Participaciones en asociadas no materiales (sin nombre en las cuentas) y 1,7 % aprox. en Hanbon Science and Technology (cotizada, a valor razonable)', importe: 220.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Asociadas con 9,5 M de beneficio en 2025 y 9,8 M en el 1S26; Hanbon vendida en el 1S26 por 22 M [A1, A4].' },
    ],
    comentario: 'La dirección invierte poco (no lo necesita: ROIC operativo muy alto) y reparte casi todo el flujo libre, pero ha emitido acciones dos veces con la acción alta (2024 y 2025, ≈ 3.660 M en total) cuando ya tenía miles de millones de caja: la caja ociosa (≈ 7.600 M, el 37 % de la capitalización) rinde un 3-4 % y diluye el ROE (18 % en los últimos doce meses). La recompra de 2025-2026 se hizo entre 33 y 36 HKD, un 50 % por encima del precio de hoy. Las acciones en circulación pasaron de 982,7 M (2023, diluidas) a 1.059,4 M (2025): +7,8 % por colocaciones y opciones.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'KOMFYMED (可复美)', descripcion: 'Marca principal: apósitos de colágeno recombinante (producto sanitario), sérums monodosis («胶原棒»), cremas y mascarillas de reparación', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 897.7, resultado: null }, { periodo: '2022', ingresos: 1613.0, resultado: null }, { periodo: '2023', ingresos: 2788.3, resultado: null }, { periodo: '2024', ingresos: 4541.8, resultado: null }, { periodo: '2025', ingresos: 4470.0, resultado: null }] },
      { nombre: 'COLLGENE (可丽金)', descripcion: 'Segunda marca: antiedad con colágeno recombinante; desde jun-2026 incluye el inyectable 753', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 525.9, resultado: null }, { periodo: '2022', ingresos: 618.4, resultado: null }, { periodo: '2023', ingresos: 616.6, resultado: null }, { periodo: '2024', ingresos: 840.5, resultado: null }, { periodo: '2025', ingresos: 917.9, resultado: null }] },
      { nombre: 'Otras marcas', descripcion: 'Ke Yu (可预), Juzi Pharmaceutical, Leeyen, 1\'me y otras', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 79.5, resultado: null }, { periodo: '2022', ingresos: 90.3, resultado: null }, { periodo: '2023', ingresos: 103.2, resultado: null }, { periodo: '2024', ingresos: 138.1, resultado: null }, { periodo: '2025', ingresos: 108.9, resultado: null }] },
      { nombre: 'Alimentos funcionales y otros', descripcion: 'Alimentos funcionales con ginsenósidos y otros', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 49.4, resultado: null }, { periodo: '2022', ingresos: 42.7, resultado: null }, { periodo: '2023', ingresos: 16.0, resultado: null }, { periodo: '2024', ingresos: 18.4, resultado: null }, { periodo: '2025', ingresos: 21.7, resultado: null }] },
    ],
    geografias: [{ nombre: 'China continental', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas online en tiendas propias (DTC: Tmall, Douyin…)', valor_anterior: '3.587,2 M (2024)', valor_actual: '3.402,1 M (2025); 1.777,1 M en el 1S26 (−2,2 %)', variacion: '−5,2 %', comentario: 'Cae la venta por influencers; sube la venta en directo propia [A2, A3]' },
      { kpi: 'Ventas a plataformas (JD.com, Vipshop)', valor_anterior: '377,1 M (2024)', valor_actual: '508,5 M (2025); 334,5 M en el 1S26 (−14,5 %)', variacion: '+34,8 %', comentario: 'JD repuso menos en el 1S26 [A3]' },
      { kpi: 'Ventas a distribuidores', valor_anterior: '1.404,6 M (2024)', valor_actual: '1.383,2 M (2025); 683,3 M en el 1S26 (−13,2 %)', variacion: '−1,5 %', comentario: 'Farmacias y clínicas más prudentes [A3]' },
      { kpi: 'Margen bruto', valor_anterior: '82,1 % (2024)', valor_actual: '80,3 % (2025); 79,5 % en el 1S26', variacion: '−1,8 pp', comentario: 'Mezcla de productos nuevos [A3]' },
      { kpi: 'Gasto comercial sobre ventas', valor_anterior: '36,3 % (2024)', valor_actual: '37,3 % (2025); 43,4 % en el 1S26', variacion: '+1,0 pp', comentario: 'Marca, lanzamientos y tiendas propias [A3]' },
      { kpi: 'Puntos de venta físicos', valor_anterior: '≈ 3.000 clínicas privadas (2025)', valor_actual: '≈ 1.700 hospitales públicos, ≈ 3.500 clínicas, >130.000 farmacias y 42 tiendas propias (jun-2026)', variacion: null, comentario: '[A3]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [],
};
guarda('A', A);

// ================================================================ B. Sector, competencia, historia, ESG, negocio descriptivo
const fB = [
  { id: 1, titulo: 'Ventas minoristas de bienes de consumo, diciembre de 2025: cosmética (化妆品类) 4.653 億 RMB en 2025, +5,1 % (empresas por encima del umbral)', editor: 'Oficina Nacional de Estadística de China', tipo: 'Sectorial', fecha: '2026-01-19', url: 'https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202601/t20260119_1962323.html' },
  { id: 2, titulo: '2025年统计公报单列“化妆品类” (estadística oficial y datos de la asociación sectorial: 1,1 billones de RMB en todos los canales, +2,83 %)', editor: 'Xinhua / Diario del Consumo', tipo: 'Sectorial', fecha: '2026-03-18', url: 'https://www.news.cn/fashion/20260318/1f5f317360924b328fd9c3a74cbf7fb6/c.html' },
  { id: 3, titulo: 'Ficha sectorial corta: higiene personal y cosmética de gran consumo (mercado mundial de belleza ≈ 300.000 M EUR en 2025, L\'Oréal)', editor: 'Repositorio (sectores/higiene-cosmetica-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/higiene-cosmetica-2026-10-14.md' },
  { id: 4, titulo: 'Chinese skincare company refutes false advertising claims', editor: 'Caixin Global', tipo: 'Prensa', fecha: '2025-06-06', url: 'https://www.caixinglobal.com/2025-06-06/chinese-skincare-company-refutes-false-advertising-claims-102327916.html' },
  { id: 5, titulo: 'Polémica del 胶原棒 de 可复美: 0,0177 % según el bloguero frente a ≥ 0,1 %; la empresa con métodos de la Farmacopea y YY/T 1947-2025', editor: 'Yicai (第一财经)', tipo: 'Prensa', fecha: '2025-06-02', url: 'https://www.yicai.com/news/102644396.html' },
  { id: 6, titulo: 'Crónica de la polémica, el 618 de 2025 y la caída de la acción', editor: 'Lanjinger (蓝鲸财经)', tipo: 'Prensa', fecha: '2025-06-24', url: 'https://www.lanjinger.com/d/1750679835578910876' },
  { id: 7, titulo: 'Datos de cotizadas (quoteSummary): ventas, EBITDA, márgenes, caja y estimaciones de los comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/2367.HK/' },
  { id: 8, titulo: 'Annual Report 2025: revisión del negocio, marcas, canales, patentes, plantilla', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-04-29', url: `${H}/2026/0429/2026042904378.pdf` },
  { id: 9, titulo: 'Voluntary announcement: registro NMPA de la fibra liofilizada de colágeno recombinante tipo I α1 (primer inyectable de colágeno recombinante tipo I de secuencia nativa en China)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2025-10-23', url: `${H}/2025/1023/2025102300175.pdf` },
  { id: 10, titulo: 'Voluntary announcement: registro NMPA de la solución compuesta de colágeno recombinante y hialuronato sódico', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-01-15', url: `${H}/2026/0115/2026011500458.pdf` },
  { id: 11, titulo: 'Voluntary announcement: registro NMPA del implante reticulado de colágeno recombinante tipo III (arrugas del cuello)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-06-17', url: `${H}/2026/0617/2026061700544.pdf` },
  { id: 12, titulo: '三个月内回吐前期全部涨幅，“双十一”能否打响巨子生物股价翻身仗？', editor: 'Zhitong Finance (vía Investing.com China)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://cn.investing.com/news/stock-market-news/article-3607451' },
  { id: 13, titulo: 'Announcement of interim results for the six months ended 30 June 2026 (negocio, canales, marcas)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-08-18', url: `${H}/2026/0818/2026081801176.pdf` },
  { id: 14, titulo: '2025 Environmental, Social and Governance (ESG) Report', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-04-29', url: `${H}/2026/0429/2026042904452.pdf` },
  { id: 15, titulo: 'Annual Report 2022: historia, salida a bolsa del 4-nov-2022', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2023-04-26', url: `${H}/2023/0426/2023042601787.pdf` },
];
const comp = (t, f) => { const d = yd[t]; return d; };
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Giant Biogene (巨子生物, Xi\'an) fabrica y vende en China cosmética y productos sanitarios basados en colágeno recombinante y ginsenósidos que produce por fermentación (biología sintética): el 99,7 % de las ventas es «cuidado profesional de la piel» [B8, B13]. KOMFYMED (可复美) es el 80 % de las ventas: apósitos de colágeno para después de tratamientos estéticos (producto sanitario de clase II, su origen), sérums monodosis («胶原棒»), cremas («Focus Cream») y el nuevo «超透棒». COLLGENE (可丽金) es el 17 %: antiedad y, desde junio de 2026, el inyectable de colágeno 753 (clase III). Vende online en tiendas propias de Tmall, Douyin y JD (61 % de las ventas), a plataformas (11 %), en directo a cadenas y tiendas propias (4 %) y a distribuidores que llegan a ≈ 1.700 hospitales públicos, ≈ 3.500 clínicas y más de 130.000 farmacias (23 %) [B13]. Fábricas propias en Xi\'an; 2.319 empleados [B13].',
    como_gana_dinero: 'Margen bruto del 80 % (79,5 % en el 1S26): el colágeno lo produce ella y el producto es barato de fabricar [B13]. El dinero se va en marketing: el gasto comercial fue del 37 % de las ventas en 2025 y del 43 % en el 1S26 (promoción en plataformas, influencers, comisiones de Tmall y Douyin y tiendas propias). El margen EBITDA pasó del 42-45 % (2023-1S25) al 34 % (2S25 y 1S26). Nada es recurrente por contrato: depende de la repetición de compra y de los grandes festivales online (618 en junio y 11.11 en noviembre), que hacen el 2S más fuerte en ventas y en gasto. El apalancamiento operativo es alto en las dos direcciones: con ventas cayendo y el marketing subiendo, cada punto de ventas pesa más en el beneficio [B13].',
    clientes: 'Clientes finales: millones de consumidores (sobre todo mujeres jóvenes urbanas), pacientes de clínicas de estética y dermatología y compradores de farmacia. Ningún cliente pesa un 10 % de las ventas [B8]. No hay contratos: la retención depende de la marca y la recomendación médica. Poder de precios: el margen bruto se mantuvo en 80-82 % de 2023 a 2025, pero en 2025 la empresa «reforzó el control de precios» del canal (lo que le costó ventas de apósitos) y compite con descuentos en los festivales [B8]; tras la polémica de mayo de 2025, KOMFYMED salió de los diez primeros del 618 de Tmall en belleza (había estado entre los tres primeros de marcas chinas emergentes en 2024) [B6]. En el 618 de 2026 dice haber recuperado: +25 % de GMV online (KOMFYMED) y +30 % (COLLGENE) [B13].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Mercado de cosmética de China continental (cuidado de la piel, maquillaje y otros), que es donde vende el 100 % de la empresa; dentro, su nicho es la «cosmética funcional» o dermocosmética de reparación y los productos sanitarios para la piel (apósitos) y, desde 2026, los inyectables de estética. Usamos la estadística oficial de ventas minoristas de cosmética de la Oficina Nacional de Estadística (empresas por encima del umbral: 4.653 億 RMB en 2025) [B1], y como contraste la cifra de la asociación sectorial para todos los canales (≈ 1,1 billones de RMB, +2,83 %) [B2], que incluye online pequeño y precios de venta al público. No hay una cifra pública fiable del nicho del colágeno recombinante: no la usamos.',
    tamano: '≈ 465.300 M RMB en 2025 (ventas minoristas de cosmética de empresas por encima del umbral, +5,1 %) [B1]; ≈ 1,1 billones de RMB en todos los canales (+2,83 %) según la asociación sectorial [B2]',
    unidad_serie: 'millones de RMB (ventas minoristas de cosmética, empresas por encima del umbral)',
    serie: [{ anio: '2025', tamano: 465300 }, { anio: '2026e', tamano: 483900 }, { anio: '2027e', tamano: 503300 }, { anio: '2028e', tamano: 523400 }, { anio: '2029e', tamano: 544300 }, { anio: '2030e', tamano: 566100 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 4.0,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Cosmética «funcional» y de ingrediente activo (colágeno, ácido hialurónico, péptidos)', efecto: '+', horizonte: 'Estructural', evidencia: '171 materias primas nuevas registradas en 2025 (+87,9 %) [B2]; KOMFYMED pasó de 898 M a 4.542 M de ventas en 2021-2024 [B8]' },
      { driver: 'Marcas chinas frente a extranjeras', efecto: '+', horizonte: 'Estructural', evidencia: 'Proya, Mao Geping y Chicmax crecen; Estée Lauder y Shiseido pierden en China (ventas de Shiseido y EL de los últimos doce meses con márgenes del 7-11 %) [B7]' },
      { driver: 'Tráfico de pago en Douyin y Tmall (coste de captar clientes)', efecto: '−', horizonte: 'Estructural', evidencia: 'Gasto comercial de Giant del 36,3 % (2024) al 43,4 % de las ventas (1S26) [B13]; la dirección: «los dividendos de tráfico ya no están» [B8]' },
      { driver: 'Consumo chino débil y presión de precios', efecto: '−', horizonte: 'Cíclico', evidencia: 'Ventas minoristas totales +3,7 % en 2025 y +0,9 % en diciembre [B1]' },
      { driver: 'Estética médica no quirúrgica (inyectables de colágeno)', efecto: '+', horizonte: 'Estructural', evidencia: 'Tres registros de clase III de Giant entre oct-2025 y jun-2026 [B9, B10, B11]' },
      { driver: 'Regulación de declaraciones de eficacia y de etiquetado', efecto: '+/−', horizonte: 'Estructural', evidencia: 'La polémica de 2025 giró sobre si el 胶原棒 tenía ≥ 0,1 % de colágeno; no hay norma nacional de método de medida para cosmética [B5]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 5, justificacion: 'Guerra de precios y de tráfico en Douyin y Tmall; Bloomage, Botanee, Proya y marcas nuevas compiten en reparación y colágeno; en 2025 la rivalidad llegó a ataques públicos (Bloomage reconoció su participación en un fondo ligado al bloguero que acusó a Giant) [B4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Consumidor final atomizado, pero las plataformas (Tmall, Douyin, JD) y los grandes vendedores en directo fijan comisiones, visibilidad y descuentos [B13].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Giant produce su propio colágeno; los envases y materias auxiliares son genéricos (coste de ventas del 20 % de las ventas) [B13].' },
      { fuerza: 'Amenaza de entrada', intensidad: 4, justificacion: 'Barrera baja en cosmética (fabricación por encargo y marketing en redes); alta en productos sanitarios de clase III (años de ensayos y registro NMPA) [B9-B11].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Otros activos (hialurónico, péptidos, exosomas), colágeno animal y tratamientos estéticos sustituyen a la reparación tópica.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La cosmética china creció un 5,1 % en 2025 según la estadística oficial, por encima del consumo total (+3,7 %) [B1, B2], pero el mercado de todos los canales solo un 2,83 % [B2]: madurez con consumo débil y precios a la baja. En 2020 el sector cayó (cierres) y en 2022 retrocedió con los confinamientos; Giant creció en ambos años (+30 % en 2021 y +52 % en 2022) [B15] por su nicho. El ciclo pesa menos que la competencia de marcas y la factura del tráfico.' },
    regulacion: 'Cosmética: Reglamento de Supervisión de Cosméticos de 2021 (registro de ingredientes nuevos, pruebas de eficacia de las declaraciones, etiquetado de ingredientes por orden de peso, «no traza» por encima del 0,1 %) [B5]. Productos sanitarios: los apósitos son de clase II y los inyectables de clase III con registro de la NMPA; Giant tiene tres registros de clase III (oct-2025, ene-2026, jun-2026) y la licencia de fabricación de clase III (1S26) [B9-B11, B13]. Norma sectorial YY/T 1947-2025 de apósitos de colágeno recombinante [B5]. La NMPA endureció en 2025 la venta online de productos sanitarios y las declaraciones de eficacia [B6]. No hay norma nacional de medida del colágeno recombinante en cosmética: es el centro de la polémica de 2025 [B5].',
    tendencias: 'Ganan las marcas chinas con «ciencia» propia y las que controlan su canal online (venta en directo propia frente a grandes influencers). Pierden las que dependen de un producto estrella y del tráfico de pago. La estética médica se desplaza a inyectables «regenerativos» (colágeno, PLLA), con competidores que ya tenían registros (Jinbo Bio con colágeno tipo III, Sihuan) [B12]. Giant gana con su tecnología y sus registros de clase III, y pierde con la erosión de KOMFYMED y la competencia en reparación.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.2,
    posicion: 'Primera en colágeno recombinante (Euromonitor, tres años seguidos, según la empresa) y entre las diez mayores de cosmética china por ventas; ≈ 1,2 % de las ventas minoristas oficiales de cosmética (estimación propia: 5.519 M de ventas a precio de fábrica sobre 465.300 M a precio de venta) [B1, B13]',
    competidores: [
      { nombre: 'Proya Cosmetics', pais: 'China', ticker: '603605.SS', ingresos: 10610, cuota_pct: null, margen_ebit_pct: 11.1, comentario: 'Mayor marca china de cuidado de la piel; antiedad y reparación; margen operativo de los últimos doce meses del 11,1 % [B7]' },
      { nombre: 'Mao Geping Cosmetics', pais: 'China', ticker: '1318.HK', ingresos: 5730, cuota_pct: null, margen_ebit_pct: 31.5, comentario: 'Maquillaje y cuidado de alta gama en grandes almacenes; crece un 26 % [B7]' },
      { nombre: 'Yunnan Botanee (Winona)', pais: 'China', ticker: '300957.SZ', ingresos: 5578, cuota_pct: null, margen_ebit_pct: 15.0, comentario: 'Rival directo en reparación de piel sensible; margen del 15 % [B7]' },
      { nombre: 'Bloomage Biotech', pais: 'China', ticker: '688363.SS', ingresos: 3695, cuota_pct: null, margen_ebit_pct: 3.0, comentario: 'Ácido hialurónico y cosmética; ventas −21,6 %; enfrentada a Giant en la polémica de 2025 [B4, B7]' },
      { nombre: 'Imeik Technology', pais: 'China', ticker: '300896.SZ', ingresos: 2369, cuota_pct: null, margen_ebit_pct: 49.3, comentario: 'Inyectables de estética (hialurónico, PLLA): el competidor del negocio nuevo de Giant [B7]' },
      { nombre: 'Shanghai Chicmax', pais: 'China', ticker: '2145.HK', ingresos: 8826, cuota_pct: null, margen_ebit_pct: 1.6, comentario: 'Marcas de masas (KANS, One Leaf) muy dependientes de Douyin [B7]' },
      { nombre: 'Shanghai Jahwa', pais: 'China', ticker: '600315.SS', ingresos: 6630, cuota_pct: null, margen_ebit_pct: 4.8, comentario: 'Grupo tradicional con marcas de masas [B7]' },
      { nombre: 'L\'Oréal (China)', pais: 'Francia', ticker: 'OR.PA', ingresos: 340338, cuota_pct: null, margen_ebit_pct: 21.3, comentario: 'Líder mundial; en China con La Roche-Posay y SkinCeuticals en dermocosmética (grupo entero) [B3, B7]' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta de producto de consumo.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Bajos: el consumidor cambia de sérum sin coste; algo más altos en clínicas que recomiendan el apósito tras un tratamiento [B13].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '233 patentes concedidas y solicitadas, más de 50 tipos de colágeno recombinante, tres registros de clase III únicos en China y la licencia de fabricación de clase III [B8, B9-B11, B13]; marca KOMFYMED con más de diez años en apósitos (primera de Tmall en apósitos en el 618 de 2026) [B13]. La polémica de 2025 dañó la confianza en el producto estrella [B6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Produce su colágeno a gran escala: margen bruto del 80 % frente al 70-75 % de los rivales chinos [B7, B13].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado grande y fragmentado: no hay escala que excluya.' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable: (1) la erosión de KOMFYMED por la guerra de precios y de tráfico en Douyin y Tmall (venta por influencers en caída, gasto comercial del 43 %) [B13]; (2) el descrédito del colágeno recombinante como ingrediente si se repite la polémica de 2025 o si un competidor (Sihuan, Jinbo) gana el relato técnico sobre la «triple hélice» [B5, B12]; (3) en inyectables, Imeik y otros tienen años de ventaja comercial con médicos y clínicas. Probabilidad media-alta de que el margen no vuelva al 40 %.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Fundada en Xi\'an en 2000 por Yan Jianya (empresario) y Fan Daidi (científica de la Universidad del Noroeste que desarrolló la producción de colágeno recombinante «humanizado» por fermentación). Empezó vendiendo apósitos de colágeno a hospitales para después de tratamientos dermatológicos y láser, y lanzó COLLGENE (2009) y KOMFYMED (2011). En 2021 se reorganizó en las Islas Caimán, entraron fondos (CPE, Hillhouse, serie A de 7.094 M) y la empresa recompró 6.360 M de acciones a los fundadores; salió a bolsa en Hong Kong el 4-nov-2022 [B15]. Entre 2021 y 2024 multiplicó por 3,6 las ventas con KOMFYMED en Douyin; en 2025 la polémica sobre el contenido de colágeno, la competencia y el cambio de canal frenaron el crecimiento [B4, B8]. Desde 2025 entra en inyectables de clase III [B9-B11].',
    hitos: [
      { anio: '2000', hito: 'Fundación en Xi\'an por Yan Jianya y Fan Daidi [B8]' },
      { anio: '2009-2011', hito: 'Lanzamiento de COLLGENE y de KOMFYMED [B15]' },
      { anio: '2021', hito: 'Reorganización y entrada de inversores (serie A de 7.094 M) [B15]' },
      { anio: '2022', hito: 'Salida a bolsa en Hong Kong (4-nov) [B15]' },
      { anio: '2024', hito: 'Ventas de 5.539 M (+57 %); colocación de 1.499 M [B8]' },
      { anio: '2025', hito: 'Polémica del 胶原棒 (mayo-junio), ventas planas; colocación de 2.164 M en abril; primer registro de clase III (octubre) [B4, B9]' },
      { anio: '2026', hito: 'Ventas −6,3 % en el 1S; registros de clase III de enero y junio; lanzamiento del inyectable 753; marca nueva 1\'me (octubre) [B10, B11, B13]' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la seguridad y la veracidad del producto: un producto sanitario o un inyectable con un problema de calidad, o una declaración de contenido que no se sostiene, destruye la marca (la polémica de 2025 costó un año de crecimiento) [B4, B6]. La empresa publicó en 2026 un vídeo de su cadena de suministro («Transparent Factory») y se comprometió en 2025 a publicar parámetros técnicos y de control de calidad [B13]. En medio ambiente, la fermentación consume energía y agua, pero el peso en costes es pequeño; obtuvo la calificación de «fábrica verde nacional» en el 1S26 [B13, B14].',
    controversias: 'Mayo-junio de 2025: un bloguero (Hao Yu, «大嘴博士») publicó el 24-may-2025 un análisis según el cual el sérum 胶原棒 de KOMFYMED tenía un 0,0177 % de colágeno recombinante, por debajo del 0,1 % que implica su etiqueta [B5]. El laboratorio que hizo el análisis retiró el informe y pidió disculpas el 30-may; Giant publicó análisis de varios laboratorios con más del 0,1 % [B4, B5]. Bloomage, rival, reconoció el 1-jun su participación en un fondo ligado al bloguero [B4]. No hemos encontrado sanción ni actuación de la NMPA [B5, B6]. La empresa admitió en junio que los métodos y normas de medida «tienen limitaciones» [B5].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tcac_historico_pct y cr5_pct', tipo: 'Complemento', intentos: '1) Estadística oficial (NBS): solo encontramos el dato de 2025 con su crecimiento [B1]; 2) asociación sectorial vía Xinhua: total de 2025 sin serie ni cuotas [B2]; 3) informes anuales de la empresa: no publican tamaño de mercado ni cuotas', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: consejo, biografías, participaciones, remuneración de consejeros, informe de gobierno', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-04-29', url: `${H}/2026/0429/2026042904378.pdf` },
  { id: 2, titulo: 'Interim Report 2026: participaciones a 30-jun-2026 y planes de acciones', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-09-24', url: `${H}/2026/0924/2026092401138.pdf` },
  { id: 3, titulo: 'Poll results of the annual general meeting held on 28 May 2026', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-05-28', url: `${H}/2026/0528/2026052802039.pdf` },
  { id: 4, titulo: 'Circular de la junta de 2026 (reelecciones, cambio de auditor, mandatos)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-05-06', url: `${H}/2026/0506/2026050602622.pdf` },
  { id: 5, titulo: 'Proposed change of auditors', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-04-30', url: `${H}/2026/0430/2026043003344.pdf` },
  { id: 6, titulo: 'Supplemental announcement in relation to the proposed change of auditors', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-05-28', url: `${H}/2026/0528/2026052802051.pdf` },
  { id: 7, titulo: 'Voluntary announcement: proposed increase in shareholding by controlling shareholder (≥ 200 M HKD)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2025-06-09', url: `${H}/2025/0609/2025060900217.pdf` },
  { id: 8, titulo: 'Voluntary announcement: increase in shareholding by controlling shareholder (4.226.600 acciones, 200,2 M HKD; 54,66 %)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2025-10-27', url: `${H}/2025/1027/2025102700994.pdf` },
  { id: 9, titulo: 'Announcement of interim results for the six months ended 30 June 2026 (recompras, gobierno)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-08-18', url: `${H}/2026/0818/2026081801176.pdf` },
  { id: 10, titulo: 'Annual results 2025 y Annual Report 2024: perspectivas publicadas', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-03-19', url: `${H}/2026/0319/2026031901060.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Yan Jianya (严建亚)', cargo: 'Presidente y consejero delegado; cofundador', desde: '2000', participacion_pct: 0.69, trayectoria: 'Fundó el grupo en 2000; preside también Xi\'an Triangle Defense (cotizada en Shenzhen) desde 2015. Marido de la accionista de control. Llevó las ventas de 957 M (2019) a 5.539 M (2024); desde 2025 caen. RSU de 7,35 M de acciones [C1].' },
      { nombre: 'Fan Daidi (范代娣)', cargo: 'Directora científica y accionista de control (no consejera)', desde: '2000', participacion_pct: 55.13, trayectoria: 'Científica de la Universidad del Noroeste; desarrolló la producción de colágeno recombinante; controla el 55,13 % por el fideicomiso familiar (Juzi Holding) [C1, C2].' },
      { nombre: 'Zhang Huijuan', cargo: 'Directora financiera y consejera ejecutiva', desde: '2023', participacion_pct: 0.12, trayectoria: 'Auditora en Deloitte (2008-2010) y PwC (2011-2018), directora financiera de Easy Click (2019-2022) [C1].' },
      { nombre: 'Yan Yubo', cargo: 'Consejera ejecutiva, directora de producto y secretaria del consejo', desde: '2023', participacion_pct: 0, trayectoria: 'Hija de los fundadores, 30 años; en el grupo desde 2018 (relación con inversores, financiación) [C1].' },
      { nombre: 'Ye Juan', cargo: 'Consejera ejecutiva y vicepresidenta sénior', desde: '2016', participacion_pct: 0.10, trayectoria: 'Banca (CCB) y secretaria de consejo en empresas de Xi\'an antes de entrar en 2016 [C1].' },
      { nombre: 'Fang Juan', cargo: 'Consejera ejecutiva y vicepresidenta sénior', desde: '2000', participacion_pct: 0.11, trayectoria: 'En el grupo desde diciembre de 2000; directora de la filial operativa desde 2020 [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: '«Construir marcas, ampliar canales y reforzar registros»: obtener registros de productos sanitarios de clase III (sin cifra de ventas) [C10]', real: 'Dos registros de clase III (oct-2025 y ene-2026); ventas −0,4 %, beneficio −7,1 %', cumplida: 'Parcial' },
      { anio: '2026', guia: '«Volver a crecer» en el año (sin cifra) [C10]', real: '1S26: ventas −6,3 %, beneficio −20,5 %; el objetivo se mantiene para el año [C9]', cumplida: 'Parcial' },
    ],
    comentario: 'Empresa familiar de fundadores: el matrimonio Yan-Fan controla el 55 % y su hija es consejera ejecutiva y directora de producto. El equipo es estable (sin cambios de presidente o consejero delegado en 24 meses) y técnico en lo científico; la directora financiera viene de las grandes auditoras. La credibilidad está tocada: la empresa no da guía numérica, dijo en 2025 que el colágeno era el doble de lo que medía el bloguero sin publicar un método validado, y el «volver a crecer» de 2026 va por detrás tras el 1S. A favor: el accionista de control compró 4,2 M de acciones (200 M HKD) entre junio y octubre de 2025 a 39-48 HKD [C8]. No hay plan de sucesión publicado más allá de la entrada de la hija en el consejo.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Yan Jianya', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: 'Nombramientos (presidente), Gobierno corporativo (presidente), Remuneraciones' },
      { nombre: 'Ye Juan', cargo: 'Consejera ejecutiva', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Fang Juan', cargo: 'Consejera ejecutiva', tipo: 'Ejecutivo', desde: '2021', comisiones: 'Gobierno corporativo' },
      { nombre: 'Zhang Huijuan', cargo: 'Consejera ejecutiva y directora financiera', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Yan Yubo', cargo: 'Consejera ejecutiva', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Huang Jin', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Shan Wenhua', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, Remuneraciones' },
      { nombre: 'Wong Sze Wing', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría (presidenta), Remuneraciones' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.99, voto_remuneracion_contra_pct: 0.01, voto_remuneracion_contra_libre_pct: 0.04, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 10.13, fijo: 0.76, variable_corto: 0, variable_largo: 9.37, ratio_salario_medio: null },
    remuneracion: 'La remuneración del consejo es pequeña en efectivo: 4,1 M RMB de sueldos y aportaciones de los cinco ejecutivos en 2025, más 14,0 M de gasto contable por RSU y opciones concedidas antes de la salida a bolsa y en 2023 [C1]. El presidente cobró 0,76 M en efectivo y 9,37 M de gasto por RSU (10,13 M en total; 11,01 M en 2024). Las RSU de 2021 y las opciones de 2023 tienen condiciones de servicio y de desempeño individual, no de ROIC ni de rentabilidad para el accionista [C1]. Hong Kong no vota la política de remuneración; la junta solo autoriza al consejo a fijar los honorarios (99,99 % a favor, 0,04 % en contra sobre el capital libre presente) [C3]. Sin cláusulas de recuperación publicadas.',
    accionistas: [
      { nombre: 'Juzi Holding (fideicomiso familiar de Fan Daidi) + Healing Holding', pct: 55.21, tipo: 'Control (fundadores)', variacion: '+4,23 M de acciones compradas entre jun y oct-2025 (200,2 M HKD) [C8]; 55,13 % a jun-2026 tras amortizar 9,2 M de acciones [C2]' },
      { nombre: 'Yan Jianya (RSU en fideicomiso)', pct: 0.69, tipo: 'Consejero', variacion: 'Sin cambios [C1]' },
      { nombre: 'Capital libre (flotante)', pct: 44.1, tipo: 'Flotante', variacion: 'Colocación de 35 M de acciones en abril de 2025 [C1]' },
    ],
    insiders: [
      { fecha: '2025-10-27', persona: 'Juzi Holding (accionista de control)', operacion: 'Compra', acciones: 560000, importe: 18.6 },
    ],
    control_y_defensas: 'Fan Daidi controla el 55,13 % por un fideicomiso familiar (Juzi Holding) y su marido preside el consejo y es consejero delegado; la hija es consejera ejecutiva: cinco de ocho consejeros son ejecutivos y tres independientes (el mínimo de Hong Kong) [C1, C2]. Una acción, un voto; sin clases. El presidente y consejero delegado es la misma persona (desviación declarada del código C.2.1) [C9]. No hay operaciones vinculadas relevantes declaradas salvo 10 M de anticipo a una parte vinculada en el 1S26 [C2]. Con el 55 %, ninguna oferta prospera sin la familia; el control también protege de una venta oportunista. La junta de 2026 aprobó el mandato de emitir hasta el 20 % del capital con un 8,4 % de votos en contra (≈ 59 % del capital libre presente en contra) [C3].',
    alertas: [
      'Cambio de auditor (EY → KPMG) iniciado por la empresa en abril de 2026, tras el primer año malo; EY dimitió el 30-abr; sin desacuerdos declarados [C5, C6].',
      'El 59 % del capital libre presente votó contra el mandato de emisión del 20 % en la junta de 2026; la empresa ya colocó acciones con descuento en 2024 y 2025 [C3].',
      'Concentración familiar: presidente y consejero delegado unidos, accionista de control, hija en el consejo [C1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo.ratio_salario_medio', tipo: 'Complemento', intentos: '1) Informe anual 2025: da la plantilla y los gastos de personal pero no el coste medio por empleado comparable [C1]; 2) informe ESG 2025; 3) cálculo propio: no es comparable porque la mayor parte de la remuneración del presidente es gasto contable de RSU', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 2367.HK, 2800.HK y 2828.HK (herramientas/bolsa.mjs): precio, rango, betas, rentabilidades y cierres de ejercicio; sin sesión el 19-oct-2026 (festivo)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/2367.HK/history/' },
  { id: 2, titulo: 'Giant Biogene: estimaciones y valoración (ventas, EBITDA, EBIT, beneficio, BPA y DPA en HKD 2026e-2028e; 16 analistas; objetivo medio 36,82 HKD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/GIANT-BIOGENE-HOLDING-CO--145968491/finances/' },
  { id: 3, titulo: 'quoteSummary de 2367.HK y comparables: recomendaciones, objetivos, tendencia de estimaciones, múltiplos', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/2367.HK/analysis/' },
  { id: 4, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 10 años a 16-oct-2026: 1,648 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://yield.chinabond.com.cn/' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 % (T12m with sustainable payout)', editor: 'Damodaran Online', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio HKD/CNY, JPY/CNY, EUR/CNY y USD/CNY (15-oct-2026 y cierres de 2022-2025)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/HKDCNY=X/' },
  { id: 7, titulo: 'Monthly Return de septiembre de 2026 (1.061.704.000 acciones)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-10-06', url: `${H}/2026/1006/2026100600528.pdf` },
  { id: 8, titulo: 'Interim results 2026: BPA diluido y acciones diluidas medias (1.055,5 M)', editor: 'Giant Biogene / HKEXnews', tipo: 'Primaria', fecha: '2026-08-18', url: `${H}/2026/0818/2026081801176.pdf` },
  { id: 9, titulo: 'rhode adquirida por e.l.f. Beauty: 800 M USD al cierre + 200 M de pago variable; ventas de 212 M USD (12 meses a mar-2025)', editor: 'FundComb (de la nota de e.l.f. Beauty)', tipo: 'Datos de mercado', fecha: '2025-05-28', url: 'https://fundcomb.com/comps/transactions/rhode-e-l-f-beauty-2025-05-28' },
  { id: 10, titulo: 'RoC Skincare comprada por Bridgepoint (≈ 462 M EUR, EBITDA ≈ 23 M estimado)', editor: 'FundComb', tipo: 'Datos de mercado', fecha: '2024-01-23', url: 'https://fundcomb.com/comps/transactions/roc-skincare-bridgepoint-2024-01-23' },
  { id: 11, titulo: 'Galderma compra ZO Skin Health por 1.500 M USD', editor: 'blue News (Keystone-SDA)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.bluewin.ch/en/news/galderma-acquires-u.s.-skincare-brand-for-1.5-billion-li.3634987' },
  { id: 12, titulo: 'Puig compra el 50 % restante de ISDIN por 1.200 M EUR', editor: 'Personal Care Insights', tipo: 'Prensa', fecha: '2026-09-15', url: 'https://www.personalcareinsights.com/news/puig-isdin-dermocosmetics-deal.html' },
  { id: 13, titulo: '巨子生物：经济通 (ETNet) — caída de casi el 11 % el 24-sep-2025, tercera sesión de bajadas', editor: 'cnyes (經濟通)', tipo: 'Prensa', fecha: '2025-09-24', url: 'https://news.cnyes.com/news/id/6166309' },
  { id: 14, titulo: '三个月内回吐前期全部涨幅 (movimiento de julio-octubre de 2026, objetivo de Huachuang de 38,01 HKD)', editor: 'Zhitong Finance (vía Investing.com China)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://cn.investing.com/news/stock-market-news/article-3607451' },
];
// Comparables: Yahoo (15/16-oct-2026), en millones de RMB. NTM = 2,5/12 de 2026e + 9,5/12 de 2027e.
const sel = [
  ['Proya Cosmetics', '603605.SS', 'CN'], ['Yunnan Botanee', '300957.SZ', 'CN'], ['Bloomage Biotech', '688363.SS', 'CN'], ['Imeik Technology', '300896.SZ', 'CN'],
  ['Shanghai Jahwa', '600315.SS', 'CN'], ['Mao Geping', '1318.HK', 'CN'], ['Shanghai Chicmax', '2145.HK', 'CN'], ['Shiseido', '4911.T', 'JP'], ['L\'Oréal', 'OR.PA', 'FR'], ['Estée Lauder', 'EL', 'US'],
];
const comparables = sel.map(([nombre, t, pais]) => {
  const d = yd[t];
  const fxp = FX[d.divisa]; const fxc = FX[d.divisa_cuentas];
  const cap = d.cap * fxp / 1e6;
  const caja = (d.caja ?? 0) * fxc / 1e6, deuda = (d.deuda ?? 0) * fxc / 1e6;
  const ev = cap + deuda - caja;
  const ventas = d.ventas * fxc / 1e6, ebitda = d.ebitda * fxc / 1e6;
  const y0 = d.trend.find((x) => x.periodo === '0y'), y1 = d.trend.find((x) => x.periodo === '+1y');
  const ntmV = (y0?.ventas && y1?.ventas) ? (y0.ventas * 2.5 / 12 + y1.ventas * 9.5 / 12) * fxc / 1e6 : null;
  const g = ntmV ? ntmV / ventas - 1 : null;
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(cap),
    ev_ventas: r2(ev / ventas), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: g != null ? r1(ev / (ebitda * (1 + g))) : null,
    per_ntm: r1(d.per_adelantado), crecimiento_pct: g != null ? r1(g * 100) : null, margen_ebitda_pct: r1(d.margen_ebitda * 100),
    roic_pct: null, dn_ebitda: r1((deuda - caja) / ebitda), fcf_yield_pct: d.fcf != null ? r1(d.fcf * fxc / 1e6 / cap * 100) : null,
  };
});
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Giant Biogene Holding Co., Ltd', nombre_corto: 'Giant Biogene', ticker: '2367.HK', isin: 'KYG3887G1091', mercado: 'Bolsa de Hong Kong (Main Board)', indice_referencia: 'Hang Seng (Tracker Fund 2800.HK)',
    pais: 'China', pais_iso: 'CN', sector: 'Productos de consumo básico', industria: 'Productos de cuidado personal', sede: 'Xi\'an (Shaanxi); sociedad de las Islas Caimán', fundacion: '2000', empleados: 2319, web: 'https://www.giantbiogene.com',
    precio: 19.27, fecha_precio: '2026-10-16', acciones: 1055.5, capitalizacion_publicada: 20462, free_float_pct: 44.1,
    max_52s: 37.45, min_52s: 19.10, volumen_medio_diario: '≈ 94,7 M HKD/día (3 meses)', proximos_resultados: '2027-03-20',
  },
  consenso: {
    guidance: 'Sin guía numérica. Objetivo de 2026: «volver a crecer» en el año (resultados de 2025, 19-mar-2026; repetido con el 1S26, 18-ago-2026). A medio plazo: inyectables de clase III, materias primas nuevas, marcas nuevas y exterior. El 1S26 cayó un 6,3 %: para crecer en el año, el 2S26 tiene que superar 2.601 M (+8,1 % frente al 2S25).',
    estimaciones: [
      { periodo: '2026e', ingresos: 6062, ebitda: 2229, ebit: 2111, bpa: 1.80, dpa: 1.15, fuente: 'MarketScreener, 16-oct-2026 (BPA y DPA en HKD convertidos a 0,8528) [D2]' },
      { periodo: '2027e', ingresos: 6829, ebitda: 2517, ebit: 2314, bpa: 1.97, dpa: 1.17, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 7638, ebitda: 2686, ebit: 2487, bpa: 2.14, dpa: 1.09, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 16, comprar: 12, mantener: 3, vender: 1, po_medio: 31.40, po_min: 21.32, po_max: 39.23 },
    revisiones: 'En Yahoo, el BPA de 2026e apenas se ha movido en 90 días (2,09 → 2,10 HKD) y el de 2027e tampoco (2,29 → 2,28 HKD), con 4-6 analistas [D3]: el consenso no ha recortado tras el 1S26 (−6,3 % de ventas, −20,5 % de beneficio) y sigue esperando 6.062 M de ventas en 2026e (+9,8 %), que exigirían un 2S26 de +31 %. Lo leemos como consenso desfasado. Las recomendaciones pasan de 14 «comprar» (hace 2-3 meses) a 12, y aparece un «vender» [D3]. Huachuang mantiene un objetivo de 38,01 HKD (15x 2026e de cosmética más ≈ 6.000 M por estética) [D14]. Solo MarketScreener da estimaciones completas; contrastamos objetivos y recomendaciones con Yahoo.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual,
    beta: bolsa.bolsa.beta, volatilidad_pct: bolsa.bolsa.volatilidad_pct, max_drawdown_pct: bolsa.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'Rentabilidad total en HKD: −41,3 % en un año frente al −1,3 % del Tracker Fund (2800.HK) y −28,5 % en 2026 [D1]. La acción subió de 33,6 HKD (fin de 2022) a 87,1 HKD (máximo de abril de 2025) con el crecimiento del 50 % anual, y desde el 16-may-2025 ha caído un 71,4 % hasta 22,60 HKD [D1]: la polémica del colágeno (−19,8 % en siete sesiones desde el 21-may-2025), el frenazo del 2S25 (−34 % en octubre de 2025, con el primer día del 11.11 flojo), los resultados de 2025 (marzo) y del 1S26 (agosto). Beta de 1,02 frente al Tracker Fund (mensual, 47 meses) y volatilidad del 40 % [D1]. No hay dato oficial de posición corta en las fuentes leídas.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 29.97, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 32.16, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 47.19, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 29.80, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precios de cierre de cada año en HKD (33,60; 35,60; 50,20; 33,14) [D1] convertidos a RMB con el tipo de cierre del año (0,8919; 0,9035; 0,9400; 0,8991) [D6]. 2021 no cotizaba (salida a bolsa el 4-nov-2022). El PER de los últimos doce meses fue de 30x (2022), 22x (2023), 23x (2024) y 16x (2025); hoy, 12x. La caída del múltiplo refleja que el mercado ha dejado de pagar por un crecimiento del 50 % que se ha vuelto negativo, y la mayor parte de la caída del precio desde 2024 viene del múltiplo, no del beneficio (−19 % desde 2024).',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Cosmética china cotizada (Proya, Botanee, Bloomage, Jahwa, Mao Geping, Chicmax), estética inyectable china (Imeik, competidor del negocio nuevo) y tres grandes extranjeras con negocio en China (Shiseido, L\'Oréal, Estée Lauder). Fuera Florasis y Winona privadas, Jinbo Bio (sin datos en Yahoo) y Gushengtang (clínicas). Datos de Yahoo del 15-16-oct-2026, convertidos a RMB; PER NTM = PER adelantado de Yahoo (BPA del próximo ejercicio) [D3, D6].',
    empresas: comparables,
    comentario: 'Giant cotiza a ≈ 12x el BPA de los próximos doce meses del consenso y a ≈ 5x el EBITDA de los últimos doce meses neto de caja, por debajo de la mediana de los comparables chinos (PER de 20x) pese a tener el margen EBITDA más alto del grupo después de Imeik (34 % frente al 11-15 % de Proya, Botanee y Bloomage). El descuento tiene dos causas: las ventas caen (−6,3 % en el 1S26 frente a +2-26 % de Proya, Botanee y Mao Geping) y el mercado duda de que el margen se sostenga. Mao Geping (10x) y Chicmax (8x) muestran que el mercado de Hong Kong paga poco por la cosmética china aunque crezca. Usaríamos el PER, no el EV/EBITDA, porque la caja (37 % de la capitalización) y su rendimiento son parte del beneficio.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-05', objetivo: 'rhode (cuidado de la piel, EE. UU.)', comprador: 'e.l.f. Beauty', ev: 5353, ev_ventas: 3.77, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '800 M USD al cierre (más 200 M variables) sobre 212 M de ventas [D9]' },
      { fecha: '2024-01', objetivo: 'RoC Skincare (dermocosmética, EE. UU.)', comprador: 'Bridgepoint', ev: 3467, ev_ventas: null, ev_ebitda: 20.1, prima_pct: null, excluir: false, comentario: '≈ 462 M EUR y ≈ 23 M de EBITDA, estimaciones de FundComb [D10]' },
      { fecha: '2026-10', objetivo: 'ZO Skin Health (dermocosmética médica, EE. UU.)', comprador: 'Galderma', ev: 10036, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.500 M USD en efectivo; ventas y EBITDA no publicados en la fuente [D11]' },
      { fecha: '2026-09', objetivo: 'ISDIN (dermocosmética, España), 50 %', comprador: 'Puig', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.200 M EUR por el 50 % (900 al cierre y 300 en 2029) [D12]' },
    ],
    comentario: 'Las compras de marcas de cuidado de la piel con ciencia se pagan a 3,5-4,5 veces las ventas y ≈ 20 veces el EBITDA [D9, D10]; Giant cotiza a ≈ 2,4 veces las ventas con la caja dentro y ≈ 2,4x sin ella… (ver cálculo del motor). Con el 55 % en manos de la familia fundadora, una oferta solo llegaría con su acuerdo: no ponderamos las transacciones.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Datos de ventas en corto de HKEX: solo diarios, no posición; 2) Yahoo: sin dato de posición corta para Hong Kong [D3]; 3) SFC (posiciones cortas agregadas semanales): no consultado con éxito desde este entorno', decision: 'Omitido' },
  ],
};
// Corrige el comentario de transacciones sin cifras sueltas (las da el motor).
D.transacciones.comentario = 'Las compras de marcas de cuidado de la piel con ciencia propia se pagan a 3,5-4,5 veces las ventas y ≈ 20 veces el EBITDA [D9, D10]. Giant cotiza muy por debajo con la caja descontada (valor empresa de ≈ 13.000 M RMB, ≈ 2,4 veces las ventas de los últimos doce meses). Con el 55 % en manos de la familia fundadora, una oferta solo llegaría con su acuerdo: no ponderamos las transacciones, que sirven de suelo de referencia.';
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro 巨子生物 (hk02367), páginas de octubre de 2026', editor: 'Guba (Eastmoney)', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,hk02367.html' },
  { id: 2, titulo: 'Foro 巨子生物 (hk02367), páginas de mediados de septiembre de 2026', editor: 'Guba (Eastmoney)', tipo: 'Foros y redes', fecha: '2026-09-16', url: 'https://guba.eastmoney.com/list,hk02367_6.html' },
  { id: 3, titulo: 'Foro 巨子生物 (hk02367), páginas de mediados de agosto de 2026', editor: 'Guba (Eastmoney)', tipo: 'Foros y redes', fecha: '2026-08-17', url: 'https://guba.eastmoney.com/list,hk02367_15.html' },
  { id: 4, titulo: 'Comentario de mercado: «¿puede el 11.11 dar la vuelta a la acción?»', editor: 'Zhitong Finance (vía Investing.com China)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://cn.investing.com/news/stock-market-news/article-3607451' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Guba (Eastmoney), foro de 2367', fecha: '2026-10', n_comentarios: 60, tono: 'Negativo', resumen: 'Capitulación tras el mínimo del 16-oct («ya he perdido todos mis ahorros», «los bajistas ganan»), con algunos que compran en 22 HKD y debate sobre la preventa del 11.11 de Tmall y el directo de Li Jiaqi, que algunos ven mejor que en 2025 [E1].' },
      { plataforma: 'Guba (Eastmoney), foro de 2367', fecha: '2026-09', n_comentarios: 40, tono: 'Negativo', resumen: '«De 80 a 24», «la recompra a 35 fue un engaño», ventas para «limpiar la cartera»; algunos citan informes de analistas que siguen viendo valor en la estética médica [E2].' },
      { plataforma: 'Guba (Eastmoney), foro de 2367', fecha: '2026-08', n_comentarios: 40, tono: 'Dividido', resumen: 'Antes de los resultados del 1S26: miedo a unas cuentas flojas y a los bajistas; otros piden mirar la temporada alta y la estética médica [E3].' },
      { plataforma: 'Zhitong Finance (prensa con lectores)', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'El 11.11 y el «超透棒» como prueba de que hay producto más allá del 胶原棒; la acción devolvió en tres meses la subida de julio [E4].' },
    ],
    temas: [
      { tema: 'Bajistas y ventas en corto', postura: 'Bajista', peso: 'Alto', contraste: 'No hay dato oficial de posición corta en las fuentes leídas; la acción está en mínimos de 52 semanas y un 23 % bajo su media de 200 sesiones (nota D).' },
      { tema: 'El 11.11 de 2026 como prueba', postura: 'Dividida', peso: 'Alto', contraste: 'Las cifras de preventa que circulan en el foro no son verificables; la empresa publicará el año en marzo de 2027. El 618 de 2026 dio +25 % de GMV online según la empresa (nota A), pero las ventas del 1S26 cayeron un 6,3 %.' },
      { tema: 'Recompras y confianza en la dirección', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: la empresa recompró a 33,7-36,3 HKD en enero de 2026 y la familia compró a 39-48 HKD en 2025 (notas A y C); no ha recomprado desde enero.' },
      { tema: 'Estética médica (inyectables de colágeno)', postura: 'Alcista', peso: 'Medio', contraste: 'Tres registros de clase III y el 753 lanzado en junio de 2026 (nota B); todavía sin ventas separadas publicadas.' },
      { tema: 'La guerra con Bloomage y la polémica de 2025', postura: 'Dividida', peso: 'Bajo', contraste: 'Sin sanción del regulador encontrada (nota B); Bloomage también cae (ventas −21,6 %).' },
    ],
    lectura: 'El inversor particular chino está en capitulación: el foro pasa del «espera a la temporada alta» de agosto al «lo he perdido todo» de octubre. Es lo contrario de los analistas, que siguen con 12 de 16 recomendaciones de compra y un objetivo medio de 36,8 HKD (+63 %), pero con estimaciones sin recortar. No aporta un riesgo nuevo: el foro discute bajistas y el 11.11, no el negocio. La capitulación es una señal de que lo malo se ha vendido; no dice que el negocio haya tocado fondo.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables:', comparables.map((c) => `${c.nombre} PER ${c.per_ntm} cap ${c.capitalizacion} g ${c.crecimiento_pct}`).join('; '));
