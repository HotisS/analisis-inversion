// Genera las notas A-E de Ferrari (corte 2026-10-14) a partir de los extractos de búsqueda (entorno nube: solo WebSearch).
// Ejecutar: node informes/ferrari-2026-10-14/notas/construir.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, `${n}.json`), JSON.stringify(o, null, 2) + '\n');

const fila = (periodo, ingresos, ebitda, ebit, beneficio_neto, bpa, dpa, acciones_diluidas) => ({
  periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda, amortizaciones: Math.round((ebitda - ebit) * 10) / 10, ebit,
  resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto, gastos_financieros: null,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas,
});

// ---------------- A. Cuentas ----------------
const A = {
  _estado: 'completo con huecos (solo WebSearch)',
  negocio: {
    segmentos: [],
    geografias: [],
    kpis: [
      { kpi: 'Coches entregados (envíos)', valor_anterior: '13.752 (2024)', valor_actual: '13.640 (2025)', variacion: '−0,8 %', comentario: 'Volumen plano a propósito: la empresa prima el valor sobre el volumen [A15].' },
      { kpi: 'Envíos del primer semestre', valor_anterior: '7.087 (1S25)', valor_actual: '6.802 (1S26)', variacion: '−4,0 %', comentario: 'Bajada deliberada por el cambio de gama; los ingresos crecen igual por mezcla y personalización [A12].' },
      { kpi: 'Margen EBITDA', valor_anterior: '38,3 % (2024)', valor_actual: '38,8 % (2025)', variacion: '+0,5 puntos', comentario: '39,0 % en el 2T26 y guía de al menos el 39 % en 2026 [A1, A2].' },
      { kpi: 'Flujo de caja libre industrial', valor_anterior: '1.025 M (2024, estimación por la subida publicada del 50 %)', valor_actual: '1.538 M (2025)', variacion: '+50 %', comentario: 'Guía 2026 de al menos 1.550 M [A1, A12].' },
      { kpi: 'Cartera de pedidos', valor_anterior: 'Cubre 2026 (feb-26)', valor_actual: 'Llega casi a finales de 2027 (may-26)', variacion: 'Se alarga', comentario: 'Visibilidad de casi dos años de producción [A17].' },
      { kpi: 'I+D sobre ventas', valor_anterior: '13,4 % (2024)', valor_actual: '12,9 % (2025)', variacion: '−0,5 puntos', comentario: '919 M EUR en 2025 [A9].' },
    ],
  },
  financieros: {
    cuenta: [
      fila('2021', 4271, 1531, 1075, 833, 4.50, 1.362, 185.1),
      fila('2022', 5095, 1773, 1227, 939, 5.09, 1.810, 184.5),
      fila('2023', 5970, 2279, 1617, 1257, 6.90, 2.443, 182.2),
      fila('2024', 6677, 2555, 1888, 1526, 8.46, 2.986, 180.4),
      fila('2025', 7146, 2772, 2110, 1600, 8.96, 3.615, 178.6),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 7353, ebitda: 2847, ebit: 2167, beneficio_neto: 1650, bpa: 9.23, dpa: 3.615, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Ventas de 4.271 M EUR en 2021 a 7.146 M en 2025 (TCAC del 13,7 %), todo orgánico: Ferrari no compra empresas [A6, A1]. El crecimiento sale del precio, la mezcla y la personalización, no del volumen: los envíos de 2025 (13.640) fueron menores que los de 2024 (13.752) [A15]. El margen EBITDA pasó del 35,8 % en 2021 al 38,8 % en 2025 y el EBIT del 25,2 % al 29,5 %, con la gama renovada (Purosangue, 12Cilindri, F80) y la Fórmula 1 con más patrocinio [A1, A4]. En el 1S26 las ventas suben un 5,8 % (8 % en el 2T26, 11 % a tipos constantes) con envíos un 4 % menores, y el margen EBITDA se mantiene en el 39 % [A2, A3]. El LTM de junio de 2026 es estimación propia: 2025 más el 1S26 menos el 1S25.',
    ajustes: 'Ferrari publica cifras ajustadas (EBITDA, EBIT, BPA diluido ajustado) que en 2021-2025 coinciden con las publicadas: no hubo partidas no recurrentes relevantes [A1, A4]. Usamos el beneficio y el BPA diluido publicados. El beneficio neto de 2024 (1.526 M) es el del comunicado; el BPA diluido (8,46 EUR), el de Stock Analysis [A1, A6]. Las amortizaciones son EBITDA − EBIT. El coste de ventas, el resultado financiero y los impuestos por año no se pudieron leer: el tipo efectivo normalizado (≈22 %, con el patent box italiano) es estimación propia a partir del 20-F [A9]. El DPA de 2021-2024 es el pagado con cargo a cada ejercicio (dividendos pagados ÷ acciones) [A8]; el de 2025, 3,615 EUR aprobado en la junta de 2026 [A11].',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 1791, crecimiento_pct: 13.0, crecimiento_organico_pct: null, ebitda: 693, margen_ebitda_pct: 38.7, bpa: 2.30, vs_consenso: 'Superior' },
      { periodo: '2T25', ingresos: 1788, crecimiento_pct: 4.4, crecimiento_organico_pct: null, ebitda: 709, margen_ebitda_pct: 39.7, bpa: 2.38, vs_consenso: 'Inferior' },
      { periodo: '3T25', ingresos: 1766, crecimiento_pct: 7.4, crecimiento_organico_pct: null, ebitda: 670, margen_ebitda_pct: 37.9, bpa: 2.14, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 1801, crecimiento_pct: 3.7, crecimiento_organico_pct: null, ebitda: 700, margen_ebitda_pct: 38.9, bpa: 2.14, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 1848, crecimiento_pct: 3.2, crecimiento_organico_pct: 6.0, ebitda: 722, margen_ebitda_pct: 39.1, bpa: 2.33, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 1938, crecimiento_pct: 8.4, crecimiento_organico_pct: 11.0, ebitda: 755, margen_ebitda_pct: 39.0, bpa: 2.62, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En el 1T26 (5 de mayo) la dirección bajó a propósito los envíos (3.436) para facilitar el cambio de modelos, confirmó la guía de 2026 y dijo que la cartera de pedidos se alarga hasta casi finales de 2027; el BPA (2,33 EUR) superó el consenso de ≈2,27 [A13, A17]. En el 2T26 (30 de julio) el tono subió: ventas de 1.938 M (+8 %, +11 % a tipos constantes) frente a un consenso de ≈1.870 M, BPA de 2,62 EUR frente a 2,47 y subida de la guía del año (ventas de ≈7.600 M, EBITDA ajustado de al menos 2.970 M, BPA ajustado de al menos 9,68 EUR) [A2, A12]. El mensaje se apoya en la personalización y la mezcla, con envíos del semestre un 4 % menores (6.802). Los analistas preguntaron por la demanda del Luce, el primer eléctrico (presentado el 25 de mayo), y por los aranceles de EE. UU.; la dirección avisó de más gastos de estructura, I+D y amortización en el segundo semestre (amortización de más de 700 M en el año) y no dio cifras de pedidos del Luce [A12]. Del 4T25 al 2T26 el discurso pasa de «defender el margen con menos coches» a «subir la guía con menos coches».',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2024', activo_total: 9497, activo_corriente: null, pasivo_corriente: null, pasivo_total: 5954, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 1742, deuda_financiera: 3352, arrendamientos: null, patrimonio_neto: 3543, minoritarios: null, reservas: null },
      { periodo: '2025', activo_total: 9628, activo_corriente: null, pasivo_corriente: null, pasivo_total: 5713, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 1417, deuda_financiera: 2834, arrendamientos: null, patrimonio_neto: 3915, minoritarios: null, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Deuda industrial neta de solo 131 M EUR a 30-jun-2026 (caja neta de 388 M a marzo, antes de pagar más de 800 M a los accionistas en el trimestre) [A2]. A 31-dic-2025: deuda neta total de 1.417 M, de la que 1.385 M es de servicios financieros (titulizaciones de préstamos a clientes de EE. UU.) y 32 M industrial [A1].',
    rating: null,
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'La mayor parte de la deuda bruta (2.834 M a dic-25, con los arrendamientos dentro) financia la cartera de préstamos a clientes de Ferrari Financial Services en EE. UU. mediante titulizaciones: su deuda neta (1.385 M) está respaldada por esos préstamos, así que la tratamos como un negocio aparte y no la llevamos al puente [A1, A14]. Ferrari incluye los arrendamientos (NIIF 16) dentro de la deuda. No hay pensiones relevantes. Los anticipos de clientes por pedidos (que financian parte del circulante) no se pudieron cuantificar. Los detalles de covenants, vencimientos y rating no se pudieron leer desde este entorno.',
    comentario: 'Ferrari financia su crecimiento, sus inversiones (≈950 M al año) y el reparto a los accionistas con su propia caja: la deuda industrial neta bajó de 180 M a 32 M en 2025 después de repartir más de 1.300 M entre dividendos y recompras [A1]. Subió a 131 M en junio de 2026 por el dividendo de mayo (≈638 M) y las recompras [A2, A11]. El balance agregado mezcla dos negocios: el industrial, casi sin deuda, y el de financiación a clientes, con deuda titulizada respaldada por préstamos. Solo damos el balance de 2024 y 2025: de 2021-2023 no se pudo leer la deuda bruta ni el patrimonio de 2022, y con medio balance el ROIC sale sin sentido. El pasivo total es activo menos patrimonio; el desglose del circulante no se pudo leer.',
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 1283, capex: null, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 160.1, recompras: 230.9, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 1403, capex: 805, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 249.5, recompras: 396.5, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 1717, capex: 867, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 328.6, recompras: 460.6, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 1927, capex: 940, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 439.9, recompras: 581.1, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 2349, capex: 947, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 529.7, recompras: 785.3, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo pasó de 1.283 M en 2021 a 2.349 M en 2025 [A8, A9]. La inversión total (material más intangible, casi todo desarrollo de modelos) ronda los 950 M al año desde 2024, un 13 % de las ventas: 485 M de material y 462 M de intangible en 2025 [A8]. En 2022-2023 usamos la salida de caja de inversión del 20-F (805 y 867 M), que es casi toda capex; en 2021 no tenemos el intangible y el capex queda vacío [A9]. El flujo libre industrial que publica la empresa (1.538 M en 2025, +50 %) excluye la variación de la cartera de préstamos a clientes [A1]. El plan 2026-2030 prevé ≈4.700 M de capex (≈940 M al año, el 80 % en producto) y ≈8.000 M de flujo libre industrial acumulado [B3, B1]. No hay compras: todo el capex es crecimiento orgánico y renovación de gama.',
    confianza: 'Media',
  },
  calidad: {
    auditor: null,
    anios_auditor: null,
    opinion: null,
    comentario: 'Las cuentas son sencillas: un solo negocio de coches con Fórmula 1, patrocinio y marca, sin compras ni deterioros, y cifras ajustadas iguales a las publicadas en 2021-2025 [A1, A4]. El punto que más mueve el beneficio es la capitalización del desarrollo de modelos: de 919 M de I+D en 2025, una parte se capitaliza como intangible (462 M de inversión en intangible en 2025) y se amortiza en la vida del modelo [A8, A9]. La amortización sube (más de 700 M en 2026) a medida que entran los modelos nuevos. El otro punto es el negocio de financiación a clientes de EE. UU., que infla el balance y la deuda bruta. El auditor, su antigüedad y la opinión no se pudieron leer desde este entorno.',
    senales: [
      { senal: 'Capitalización del desarrollo', nivel: 'Baja', comentario: 'Capitaliza ≈460 M al año de desarrollo; es práctica del sector y la amortización ya crece al mismo ritmo [A8].' },
      { senal: 'Financiación a clientes', nivel: 'Baja', comentario: 'Deuda titulizada de 1.385 M respaldada por préstamos de clientes de EE. UU.; riesgo de crédito acotado a una clientela muy solvente [A1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Reparto del 40 % del beneficio neto ajustado en dividendo (antes, 35 %) y recompras de ≈3.500 M en 2026-2030, aprobadas con el plan del día del inversor de octubre de 2025 [A15, B1]. Con cargo a 2025 se pagaron 3,615 EUR por acción (≈638-640 M) el 5 de mayo de 2026 [A11]. El primer programa de ≈2.000 M terminó un año antes de lo previsto; del nuevo se llevaban comprados 627,7 M desde el 5-ene-2026 hasta el 9-oct-2026 [C6]. La junta de abril de 2026 aprobó amortizar la autocartera acumulada [C6].',
    adquisiciones: [],
    comentario: 'Ferrari es un asignador de capital disciplinado y simple: no compra empresas, reinvierte ≈950 M al año en producto y devuelve casi todo lo demás. De 2021 a 2025 repartió 1.708 M en dividendos y 2.454 M en recompras frente a 8.679 M de flujo operativo [A8]. Las acciones diluidas bajaron de 185,1 M a 178,6 M (−3,5 %) y hoy hay ≈175,9 M en circulación tras la amortización de abril de 2026 [A6, C6]. El riesgo es haber recomprado caro: el precio medio de 2026 ronda los 309 EUR por acción (627,7 M ÷ 2,03 M de acciones), por debajo del precio actual.',
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Ferrari FY 2025 Results Press Release (10-feb-2026) y 6-K de resultados de 2025', editor: 'Ferrari N.V.', tipo: 'Primaria', fecha: '2026-02-10', url: 'https://www.sec.gov/Archives/edgar/data/1648416/000164841626000018/fnvfy2025results.htm' },
    { id: 2, titulo: 'Ferrari N.V. 6-K: resultados del 2T26 (30-jul-2026)', editor: 'Ferrari N.V. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.sec.gov/Archives/edgar/data/0001648416/000164841626000106/fnvq22026results.htm' },
    { id: 3, titulo: 'Ferrari Q1 2026 Results Press Release (5-may-2026)', editor: 'Ferrari N.V.', tipo: 'Primaria', fecha: '2026-05-05', url: 'https://cdn.ferrari.com/cms/network/media/pdf/2026_05_05%20-%20%20Ferrari%20Q1%202026%20Results%20Press%20Release.pdf' },
    { id: 4, titulo: '2023 full year and fourth quarter financial results (con comparativas de 2022)', editor: 'Ferrari N.V.', tipo: 'Primaria', fecha: '2024-02-01', url: 'https://ferrari.com/en-KR/corporate/articles/2023-full-year-and-fourth-quarter-financial-results?amp=true' },
    { id: 5, titulo: 'Consistent execution: strong Q3 2025 results', editor: 'Ferrari N.V. (GlobeNewswire)', tipo: 'Primaria', fecha: '2025-11-04', url: 'https://www.globenewswire.com/news-release/2025/11/04/3180074/0/en/CONSISTENT-EXECUTION-STRONG-Q3-2025-RESULTS.html' },
    { id: 6, titulo: 'Ferrari N.V. (BIT:RACE): cuenta de resultados 2021-2025', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/bit/RACE/financials/income-statement/' },
    { id: 7, titulo: 'Ferrari N.V. (BIT:RACE): balance 2021-2025', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/bit/RACE/financials/balance-sheet/' },
    { id: 8, titulo: 'Ferrari N.V. (BIT:RACE): estado de flujos 2021-2025', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/bit/RACE/financials/cash-flow-statement/' },
    { id: 9, titulo: 'Ferrari N.V. Form 20-F 2025', editor: 'Ferrari N.V. (SEC)', tipo: 'Primaria', fecha: '2026-02', url: 'https://www.sec.gov/Archives/edgar/data/1648416/000164841626000024/race-20251231.htm' },
    { id: 10, titulo: 'Ferrari N.V.: balance trimestral (patrimonio neto)', editor: 'Fintel', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://fintel.io/bs/de/2fe' },
    { id: 11, titulo: 'Ferrari N.V. 6-K: informe intermedio a 30-jun-2026 (dividendo pagado)', editor: 'Ferrari N.V. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.sec.gov/Archives/edgar/data/0001648416/000164841626000107/ferrarinvinterimreport-063.htm' },
    { id: 12, titulo: 'Ferrari Raises Full-Year Guidance And Reported €1.94 Billion In Q2 2026 Revenue', editor: 'Pulse 2.0', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://pulse2.com/ferrari-raises-full-year-guidance-and-reported-e1-94-billion-in-q2-2026-revenue/' },
    { id: 13, titulo: 'Ferrari Q1 2026 earnings beat, reaffirms full-year guidance', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-05-05', url: 'https://finance.yahoo.com/markets/stocks/articles/ferrari-q1-2026-earnings-beat-132427256.html' },
    { id: 14, titulo: 'Ferrari N.V. 6-K: resultados del 2T25 (tabla de deuda neta industrial a 31-dic-2024)', editor: 'Ferrari N.V. (SEC)', tipo: 'Primaria', fecha: '2025-07-31', url: 'https://www.sec.gov/Archives/edgar/data/1648416/000164841625000064/fnvq22025results.htm' },
    { id: 15, titulo: 'Ferrari 2025 Financial Results: Record Revenues, Strong Margins, and a Bold Electric Future', editor: 'Dukascopy Bank', tipo: 'Prensa', fecha: '2026-02', url: 'https://www.dukascopy.com/swiss/spanish/marketwatch/market-news/Stock-Analysis/154287/' },
    { id: 16, titulo: 'Ferrari heads higher on better-than-expected earnings (4T25)', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-02-10', url: 'https://finance.yahoo.com/news/ferrari-drives-higher-better-expected-163100169.html' },
    { id: 17, titulo: 'Ferrari revenues up 3% to 1.8 billion, Q1 profit 413 million', editor: 'ANSA', tipo: 'Prensa', fecha: '2026-05-05', url: 'https://www.ansa.it/english/news/2026/05/05/ferrari-revenues-up-3-to-1.8-billion-q1-profit-413-million_f4da7cd3-3787-4f8f-9ab0-6f8d6307a02c.html' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'coste de ventas, resultado financiero, BAI e impuestos por año', tipo: 'Complemento', intentos: '1) 20-F 2025 en EDGAR: sin red (solo búsqueda); 2) Stock Analysis y Fintel por búsqueda: solo líneas sueltas; 3) ChartRow: cifras en USD', decision: 'Omitido' },
    { seccion: 'balance', campo: 'balance de 2021-2023 (deuda bruta, patrimonio de 2022), desglose del circulante y vencimientos', tipo: 'Complemento', intentos: '1) 20-F 2025 por búsqueda; 2) 6-K trimestrales; 3) Stock Analysis (solo deuda a largo plazo)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos (coches y repuestos, patrocinio y marca, otros) y geografías', tipo: 'Complemento', intentos: '1) Comunicado de 2025 por búsqueda; 2) 20-F; 3) prensa', decision: 'Omitido' },
  ],
};

// ---------------- B. Sector y competencia ----------------
const B = {
  historia: {
    resumen: 'Fundada por Enzo Ferrari en Maranello en 1947 a partir de la Scuderia de carreras (1929), Ferrari vende coches para financiar la Fórmula 1, donde compite desde 1950. Fiat entró en el capital en 1969 y tuvo el 90 % desde 1988; Piero Ferrari conservó el 10 %. En octubre de 2015 FCA la sacó a bolsa en Nueva York y en enero de 2016 la escindió a sus accionistas, con cotización también en Milán y Exor como primer accionista. Desde entonces ha pasado de ≈8.000 a ≈13.600 coches al año, de 2.900 a 7.146 M EUR de ventas, con un margen EBIT del 29,5 %. Benedetto Vigna, de la industria de semiconductores, es consejero delegado desde 2021 [A1, B1].',
    hitos: [
      { anio: '1947', hito: 'Primer coche con el nombre Ferrari (125 S) en Maranello.' },
      { anio: '1969', hito: 'Fiat compra el 50 % (90 % desde 1988).' },
      { anio: '2015', hito: 'Salida a bolsa en Nueva York (octubre).' },
      { anio: '2016', hito: 'Escisión de FCA y cotización en Milán (enero); Exor, primer accionista.' },
      { anio: '2021', hito: 'Benedetto Vigna, consejero delegado.' },
      { anio: '2022', hito: 'Purosangue, primer cuatro puertas, con cupo limitado al 20 % de las ventas.' },
      { anio: '2025', hito: 'Día del inversor (9-oct): objetivos de 2030 y el 20 % de la gama eléctrica en vez del 40 %; la acción cae ≈15 % en el mes [B1, B6].' },
      { anio: '2026', hito: 'Presentación del Luce, primer Ferrari eléctrico (25-may), a ≈550.000 EUR [B6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Ferrari diseña, fabrica y vende deportivos de lujo en Maranello: gama de serie (Roma/Amalfi, 296, 12Cilindri, Purosangue), series especiales (296 Speciale, 849 Testarossa) y modelos limitados (F80, Icona) a precios de 250.000 a más de 3 millones de euros. Vende ≈13.600 coches al año por una red de concesionarios independientes, con los coches asignados por cliente y cartera de pedidos hasta casi finales de 2027 [A15, A17]. Ingresa además por patrocinio, derechos comerciales y marca (la Scuderia de Fórmula 1, ropa, museos, Ferrari World), por la venta de motores a otro equipo de F1 y por repuestos. Financia a clientes en EE. UU. a través de Ferrari Financial Services. En 2026 llega el Luce, primer eléctrico [B6].',
    como_gana_dinero: 'La economía unitaria es la de un fabricante de muy pocas unidades con precio de lujo: crece por precio, mezcla (más modelos caros y limitados) y personalización (≈20 % de los ingresos de coches según la empresa), no por volumen. En 2025 ingresó ≈524.000 EUR por coche (7.146 M ÷ 13.640) y en el 1S26 ≈557.000 EUR (3.786 M ÷ 6.802) [A1, A2, A12]. El margen EBITDA del 39 % depende de la mezcla y del ciclo de producto (los limitados como el F80 tienen el margen más alto) y la inversión en producto es ≈13 % de las ventas. La cartera de pedidos de casi dos años y la escasez deliberada dan visibilidad y poder de precio; la Fórmula 1 aporta patrocinio y marca. Hay poca estacionalidad.',
    clientes: 'Ningún cliente pesa: son ≈13.600 compradores particulares, muchos repetidores, por una red de concesionarios independientes [A15]. La empresa limita las unidades y asigna los modelos especiales a los mejores clientes, lo que fideliza. El poder de precio está demostrado: los ingresos por coche subieron de ≈380.000 EUR en 2021 (4.271 M ÷ ≈11.155 coches) a ≈524.000 EUR en 2025 con márgenes al alza, en años de inflación de costes y aranceles en EE. UU. [A1, A6]. La cartera llega hasta casi finales de 2027 [A17].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante son los deportivos y gran turismo de lujo de más de ≈200.000 EUR, un nicho mundial de unas 40.000-50.000 unidades al año en el que compiten Ferrari, Lamborghini (Volkswagen), McLaren, Aston Martin, Bentley, Rolls-Royce y la gama alta de Porsche. No hay estadística oficial de su tamaño: lo aproximamos sumando las ventas de los fabricantes que publican cuentas. Por eso `mercado_final` va en null y la prueba de cuota se hace a mano.',
    tamano: 'Sin dato oficial; suma de los principales: Ferrari 7.146 M, Lamborghini ≈3.200 M y Aston Martin ≈1.440 M EUR en 2025 [A1, B4, B5]',
    unidad_serie: null,
    serie: [],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Riqueza de las grandes fortunas', efecto: '+', horizonte: 'Estructural', evidencia: 'La cartera de Ferrari llega a finales de 2027 pese a la desaceleración del lujo personal [A17].' },
      { driver: 'Aranceles de EE. UU. a coches europeos', efecto: '−', horizonte: 'Cíclico', evidencia: 'Lamborghini atribuyó a los aranceles y a la divisa la caída de su margen del 27 % al 24 % en 2025 [B4].' },
      { driver: 'Electrificación y normas de emisiones', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Ferrari bajó del 40 % al 20 % el peso de los eléctricos en su gama de 2030 y el mercado castigó la presentación del Luce (−6 a −7 % el día) [B1, B6].' },
      { driver: 'Divisa (dólar y yen frente al euro)', efecto: '−', horizonte: 'Cíclico', evidencia: 'En el 2T26 la divisa restó ≈3 puntos al crecimiento de Ferrari (8 % frente a 11 %) [A2].' },
      { driver: 'Demanda china', efecto: '−', horizonte: 'Cíclico', evidencia: 'Porsche vendió un 9,5 % menos en 2025 con China débil [B7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Pocos fabricantes y marcas muy diferenciadas; Ferrari tiene el margen más alto (29,5 % de EBIT frente al 24 % de Lamborghini y pérdidas en Aston Martin) [B4, B5].' },
      { fuerza: 'Poder de los clientes', intensidad: 1, justificacion: 'Clientes atomizados y con lista de espera; la empresa elige a quién vende los limitados [A17].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Proveedores especializados (frenos, baterías, electrónica), pero Ferrari hace motores y carrocerías en Maranello.' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'La marca, la historia en F1 y la red de clientes no se replican; los nuevos eléctricos de lujo (Rimac) son marginales.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Otros bienes de lujo y experiencias compiten por la misma riqueza; el eléctrico puede reducir la diferencia del motor térmico.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El lujo personal lleva dos años plano (Moncler, Kering) y Porsche cae, pero el segmento más alto aguanta: Lamborghini creció un 3,3 % en 2025 y Ferrari un 7 % [B4, A1]. En 2008-09 Ferrari redujo envíos (de 6.587 en 2008 a 6.250 en 2009) mucho menos que el mercado del automóvil; en 2020 los ingresos bajaron un 8 % y en 2022 subieron un 19 %. La cartera de casi dos años amortigua el ciclo.' },
    regulacion: 'La UE prohíbe vender coches nuevos con emisiones de CO2 desde 2035, con excepciones para fabricantes de pequeño volumen (menos de 10.000 coches al año en la UE) que Ferrari puede usar; la norma se revisa en 2026. EE. UU. aplica aranceles a los coches europeos desde 2025: Ferrari subió precios hasta un 10 % en algunos modelos para compensarlo. En F1, el nuevo reglamento técnico de 2026 cambia los motores y puede mover la competitividad de la Scuderia.',
    tendencias: 'Electrificación con dudas de demanda en el lujo (Ferrari y Lamborghini retrasan o recortan eléctricos), personalización como fuente de margen, modelos limitados que se revalorizan en el mercado de segunda mano y clientes más jóvenes y de Asia y Oriente Medio. Ferrari gana con la personalización y los limitados; el riesgo está en el eléctrico, donde el motor térmico deja de ser diferencial [B1, B6].',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.º mundial en deportivos de lujo por ingresos (7.146 M EUR en 2025, más del doble que Lamborghini) y por margen [A1, B4].',
    competidores: [
      { nombre: 'Automobili Lamborghini (Volkswagen/Audi)', pais: 'Italia', ticker: null, ingresos: 3200, cuota_pct: null, margen_ebit_pct: 24.0, comentario: 'El rival directo: superdeportivos y el Urus; margen del 24 % en 2025 (27 % en 2024) [B4].' },
      { nombre: 'Aston Martin Lagonda', pais: 'Reino Unido', ticker: 'AML.L', ingresos: 1440, cuota_pct: null, margen_ebit_pct: -20.6, comentario: 'Gran turismo; pérdida operativa de ≈297 M en 2025 [B5].' },
      { nombre: 'McLaren Automotive (Forseven)', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Superdeportivos; en pérdidas y vendida a un fondo de Abu Dabi en 2025.' },
      { nombre: 'Porsche AG', pais: 'Alemania', ticker: 'P911.DE', ingresos: 36000, cuota_pct: null, margen_ebit_pct: null, comentario: 'Solo su gama alta (911 GT, Turbo) compite con Ferrari; ventas −9,5 % en 2025 [B7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Comunidad de coleccionistas y acceso a modelos limitados reservado a clientes fieles.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Cambiar de marca hace perder el acceso a los limitados (F80, Icona).' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Margen EBIT del 29,5 % frente al 24 % de Lamborghini y pérdidas en Aston Martin; precio por coche +38 % de 2021 a 2025 [A1, B4, B5].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fabricación propia en Maranello, pero sin escala frente a los generalistas.' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nicho pequeño en el que Ferrari tiene más del doble de ingresos que su rival más cercano [B4].' },
      ],
    },
    amenazas: 'La amenaza principal es la electrificación: si el cliente de lujo acepta el eléctrico, el motor y el sonido dejan de diferenciar y entran rivales tecnológicos; la acogida fría del Luce (−6 a −7 % en bolsa el día de la presentación) muestra que el mercado lo teme [B6]. La segunda es la sobreexpansión: más coches, el Purosangue o el eléctrico pueden diluir la escasez que sostiene los precios. Probabilidad baja en cinco años, media en diez.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la transición a la electrificación y las emisiones de CO2 de la gama: Ferrari prevé que en 2030 el 20 % de su gama sea eléctrica, el 40 % híbrida y el 40 % térmica (antes 40/40/20), y aprovecha la exención de pequeños fabricantes de la UE [B1]. El coste de la transición está en el capex (≈4.700 M en 2026-2030) y en el I+D (≈13 % de las ventas) [B3, A9]. La seguridad laboral y las relaciones con los empleados (prima de resultados anual) son el otro asunto.',
    controversias: 'No se encontraron sanciones ni litigios relevantes en los últimos tres años en las búsquedas hechas. Ha habido llamadas a revisión por frenos en EE. UU. (2022-2023) sin efecto material en las cuentas.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Ferrari Capital Markets Day: targeting new heights (9-oct-2025)', editor: 'Ferrari N.V.', tipo: 'Primaria', fecha: '2025-10-09', url: 'https://www.ferrari.com/en-BQ/corporate/articles/ferrari-capital-markets-day-targeting-new-heights' },
    { id: 2, titulo: 'Ferrari N.V. 6-K: Capital Markets Day 2025, parte financiera', editor: 'Ferrari N.V. (SEC)', tipo: 'Primaria', fecha: '2025-10-09', url: 'https://www.sec.gov/Archives/edgar/data/1648416/000164841625000096/fnv_cmd2025xfinancialpart.htm' },
    { id: 3, titulo: 'Ferrari targets $16b revenue by 2030 as electric era begins', editor: 'Mandurah Mail (AAP)', tipo: 'Prensa', fecha: '2025-10-09', url: 'https://www.mandurahmail.com.au/story/9085380/ferrari-targets-16b-revenue-by-2030-as-electric-era-begins' },
    { id: 4, titulo: 'Lamborghini posts 3.3% revenue rise in 2025 but operating profit falls', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-03', url: 'https://finance.yahoo.com/markets/stocks/articles/lamborghini-posts-3-3-revenue-093604954.html' },
    { id: 5, titulo: 'Ferrari, Lamborghini, Aston Martin: chi è in vantaggio?', editor: 'Motor1 Italia', tipo: 'Prensa', fecha: '2026-03', url: 'https://it.motor1.com/news/791500/ferrari-lamborghini-aston-martin-vendite-2025/' },
    { id: 6, titulo: 'Ferrari plummets over 6%: the market says no to the electric Luce', editor: 'XTB', tipo: 'Prensa', fecha: '2026-05-26', url: 'https://www.xtb.com/sca-en/market-analysis/news-and-research/ferrari-plummets-over-6-the-market-says-no-to-the-electric-luce' },
    { id: 7, titulo: 'Automobile de luxe : une année 2025 à deux vitesses', editor: 'Journal du Luxe', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.journalduluxe.fr/fr/lifestyle/automobile-luxe-annee-2025-deux-vitesses/amp' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de deportivos de lujo en dos fuentes, serie y CR5', tipo: 'Núcleo', intentos: '1) Búsqueda de estudios de mercado de superdeportivos; 2) asociaciones (ACEA) sin dato del nicho; 3) suma de fabricantes que publican cuentas', decision: 'Calculado y marcado como estimación (suma parcial); serie y CR5 omitidos' },
    { seccion: 'competencia', campo: 'cuota de mercado de Ferrari', tipo: 'Núcleo', intentos: '1) Informe anual; 2) prensa sectorial; 3) derivarla: sin tamaño de mercado fiable', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad: sin red; 2) búsqueda; 3) proveedores: sin acceso', decision: 'Omitido' },
  ],
};

// ---------------- C. Equipo y gobierno ----------------
const C = {
  directivos: {
    equipo: [
      { nombre: 'Benedetto Vigna', cargo: 'Consejero delegado', desde: '2021', participacion_pct: null, trayectoria: 'Venía de STMicroelectronics, donde dirigía la división de sensores y analógicos. Con él las ventas pasaron de 4.271 M EUR (2021) a 7.146 M (2025) y el margen EBIT del 25,2 % al 29,5 %; cumplió o superó la guía cada año [A1, A6].' },
      { nombre: 'John Elkann', cargo: 'Presidente ejecutivo', desde: '2018', participacion_pct: null, trayectoria: 'Consejero delegado de Exor, primer accionista de Ferrari (≈21 % del capital y ≈32 % de los votos) [C1].' },
      { nombre: 'Piero Ferrari', cargo: 'Vicepresidente', desde: '2016', participacion_pct: 10.61, trayectoria: 'Hijo del fundador; conserva el ≈10,6 % del capital y el ≈16 % de los votos a través de un trust del que tiene el usufructo [C1, C2].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ventas de ≈7.000 M y EBITDA ajustado ≥ 2.680 M; BPA ajustado ≥ 8,60 EUR (guía elevada en el año)', real: 'Ventas de 7.146 M, EBITDA de 2.772 M y BPA de 8,96 EUR', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas > 6.400 M y EBITDA ajustado ≥ 2.450 M (guía elevada en el año)', real: 'Ventas de 6.677 M y EBITDA de 2.555 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas de ≈7.600 M, EBITDA ajustado ≥ 2.970 M y BPA ajustado ≥ 9,68 EUR (elevada el 30-jul-2026)', real: 'En curso: 1S26 con ventas de 3.786 M y EBITDA de 1.477 M', cumplida: 'Parcial' },
      { anio: '2022-2026 (plan de 2022)', guia: 'Ventas de 6.700-7.100 M y EBITDA de 2.500-2.700 M en 2026', real: 'Superado en 2025: 7.146 M de ventas y 2.772 M de EBITDA', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y creíble: Vigna ha cumplido o superado la guía de los cuatro últimos años y alcanzó el plan de 2026 un año antes [A1, A2]. La guía de 2026 se elevó en julio con los envíos cayendo un 4 %, lo que confirma que el crecimiento viene del precio y la mezcla. La duda de credibilidad no está en las cifras sino en la estrategia eléctrica: el objetivo de gama eléctrica en 2030 se recortó del 40 % al 20 % en el día del inversor de 2025 [B1]. Sucesión: Vigna no tiene sustituto público; Elkann da continuidad desde la presidencia.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'John Elkann', cargo: 'Presidente ejecutivo', tipo: 'Dominical', desde: '2016', comisiones: null },
      { nombre: 'Benedetto Vigna', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: null },
      { nombre: 'Piero Ferrari', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2016', comisiones: null },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: true,
    consejero_coordinador: null,
    una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: null,
    auditoria_independiente: null,
    insiders_sin_operaciones: null,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La política de remuneración se votó en la junta del 15 de abril de 2026, que aprobó todas las propuestas [C5]. No se pudieron leer los importes de 2025, las métricas del variable ni el porcentaje de votos en contra desde este entorno: la sección de remuneración queda incompleta.',
    accionistas: [
      { nombre: 'Exor N.V. (familia Agnelli)', pct: 21.2, tipo: 'Control (pacto con Piero Ferrari)', variacion: 'Sube de forma pasiva con las amortizaciones de autocartera; 32,2 % de los votos (mar-25) [C1]' },
      { nombre: 'Piero Ferrari (trust)', pct: 10.61, tipo: 'Pacto con Exor', variacion: '16,1 % de los votos; el nuevo pacto le permite vender un 5 % [C1, C4]' },
      { nombre: 'Autocartera', pct: 1.08, tipo: 'Autocartera', variacion: '1,92 M de acciones a 9-oct-2026, tras amortizar la acumulada en abril de 2026 [C6]' },
    ],
    insiders: [],
    control_y_defensas: 'Exor y Piero Ferrari controlan la junta con un pacto renovado hasta 2029 que reúne ≈32 % del capital y ≈48 % de los votos [C3]. El control se apoya en acciones especiales de voto por lealtad (63,3 M emitidas): cada acción común con tres años de registro da un voto especial adicional; Exor tiene 37,8 M y el trust de Piero Ferrari 18,9 M [C2]. Es un blindaje: sin el pacto nadie puede lanzar una OPA con éxito. El pacto se disuelve si los votos pasan del usufructo de Piero Ferrari al trust, para evitar una OPA conjunta obligatoria [C3, C4]. Es una sociedad neerlandesa con sede fiscal en Italia.',
    alertas: ['Voto por lealtad que da a Exor y a Piero Ferrari ≈48 % de los votos con ≈32 % del capital [C2, C3].', 'Presidente ejecutivo que es el consejero delegado del accionista de control (Exor) [C1].'],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Ferrari: shareholders structure (3-mar-2025)', editor: 'Ferrari N.V.', tipo: 'Primaria', fecha: '2025-03-03', url: 'https://www.ferrari.com/en-EN/corporate/shareholders-structure' },
    { id: 2, titulo: 'Ferrari N.V. Schedule 13D/A (Exor y Piero Ferrari, dic-2025)', editor: 'SEC', tipo: 'Primaria', fecha: '2025-12', url: 'https://www.sec.gov/Archives/edgar/data/0001648416/000119312526004642/primary_doc.xml' },
    { id: 3, titulo: 'Ferrari: new agreement strengthens Piero Ferrari and limits Exor', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-01', url: 'https://www.marketscreener.com/news/ferrari-new-agreement-strengthens-piero-ferrari-and-limits-exor-ce7e58dedd8bf426' },
    { id: 4, titulo: 'Ferrari, the new deal: Drake heirs can sell 5 per cent', editor: 'Il Sole 24 Ore', tipo: 'Prensa', fecha: '2026-01', url: 'https://en.ilsole24ore.com/art/ferrari-the-new-deal-drake-heirs-can-sell-5-per-cent-AIVe0Ut' },
    { id: 5, titulo: 'Ferrari announces voting results from its Annual General Meeting (15-abr-2026)', editor: 'Ferrari N.V. (Finviz)', tipo: 'Primaria', fecha: '2026-04-15', url: 'https://finviz.com/news/344640/ferrari-announces-voting-results-from-its-annual-general-meeting' },
    { id: 6, titulo: 'Ferrari N.V. 6-K: informe periódico de recompra (12-oct-2026)', editor: 'Ferrari N.V. (SEC)', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://www.sec.gov/Archives/edgar/data/0001648416/000164841626000129/fnvbb121026prex.htm' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones, remuneración del consejero delegado y votos de la junta', tipo: 'Núcleo', intentos: '1) Informe anual 2025 (remuneration report): sin red; 2) 20-F Item 6 por búsqueda: sin cifras; 3) prensa italiana: sin importes de 2025', decision: 'Omitido; se dejan los tres consejeros comprobados' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (insiders)', tipo: 'Complemento', intentos: '1) AFM (registro neerlandés): sin red; 2) Form 144 en EDGAR: sin red; 3) prensa: nada', decision: 'Omitido' },
  ],
};

// ---------------- D. Mercado y valoración ----------------
const D = {
  identificacion: {
    nombre: 'Ferrari N.V.', nombre_corto: 'Ferrari', ticker: 'RACE.MI', isin: 'NL0011585146', mercado: 'Euronext Milan (también NYSE: RACE)', indice_referencia: 'FTSE MIB',
    pais: 'Italia (sociedad neerlandesa)', pais_iso: 'IT', sector: 'Consumo discrecional', industria: 'Automóviles', sede: 'Maranello (Italia); domicilio social en Ámsterdam', fundacion: '1947', empleados: null, web: 'www.ferrari.com',
    precio: 345.25, fecha_precio: '2026-10-07', acciones: 175.9, capitalizacion_publicada: null, free_float_pct: 67.0,
    max_52s: null, min_52s: null, volumen_medio_diario: null, proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'Guía de 2026 elevada el 30-jul-2026: ventas de ≈7.600 M EUR (antes ≈7.500 M), EBITDA ajustado de al menos 2.970 M (margen ≥ 39 %), EBIT ajustado de al menos 2.260 M (≥ 29,5 %), BPA diluido ajustado de al menos 9,68 EUR (antes 9,45) y flujo libre industrial de al menos 1.550 M [A2, A12]. Plan a 2030 (día del inversor del 9-oct-2025): ventas de ≈9.000 M, EBITDA ajustado ≥ 3.600 M (≥ 40 %), EBIT ajustado ≥ 2.750 M (≥ 30 %), BPA ajustado ≥ 11,50 EUR, flujo libre industrial acumulado de ≈8.000 M en 2026-2030 y capex de ≈4.700 M [B1, B2, B3].',
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: 2962, ebit: 2244, bpa: 9.73, dpa: null, fuente: 'MarketScreener (beneficio neto de 1.712 M ÷ 175,9 M de acciones) [D2]' },
      { periodo: '2027e', ingresos: null, ebitda: 3214, ebit: 2439, bpa: 10.56, dpa: null, fuente: 'MarketScreener (1.857 M ÷ 175,9 M) [D2]' },
      { periodo: '2028e', ingresos: null, ebitda: 3428, ebit: 2620, bpa: 11.25, dpa: null, fuente: 'MarketScreener (1.979 M ÷ 175,9 M) [D2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 12, mantener: 6, vender: 0, po_medio: 423, po_min: null, po_max: null },
    revisiones: 'El consenso de beneficio subió algo tras el 2T26: a finales de 2025 Equita citaba un BPA de consenso de 9,74 / 10,62 / 11,28 EUR para 2026-2028 y hoy MarketScreener da un beneficio neto equivalente a 9,73 / 10,56 / 11,25 EUR con nuestras acciones: estable [D3, D2]. Los precios objetivo se movieron poco: Bank of America subió a 400 EUR en julio y Goldman Sachs de 407 a 421 EUR, mientras Jefferies recortó estimaciones y objetivo [D4, D12]. El objetivo medio ronda los 423 EUR con 12 de 18 analistas en comprar [D1]. Solo una fuente con estimaciones completas (MarketScreener); el reparto de mantener y vender es estimación (18 − 12, sin ventas citadas).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 198.1, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 304.3, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 408.9, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 319.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Los cierres de 2022-2024 son estimación propia: el cierre anual de la acción en Nueva York (Macrotrends, ajustado por dividendos) convertido a euros con el tipo del BCE de fin de año [D5]; el de 2025 se deriva de una subida del ≈1 % en el año con la acción a ≈322 EUR el 12-ene-2026 [D6]. Con ellos, el PER de cierre fue de 38,9x en 2022, 44,1x en 2023, 48,3x en 2024 y 35,6x en 2025 (mediana 41,5x). Hoy, a 345,25 EUR, Ferrari cotiza a ≈37x el BPA de los últimos 12 meses y a ≈33x nuestro BPA de 2027e: el mercado ha recortado el múltiplo tras el día del inversor de octubre de 2025 (crecimiento a 2030 del ≈5 % anual) y la acogida fría del Luce [B1, B6].',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'No hay comparables puros cotizados: Lamborghini es de Volkswagen, McLaren no cotiza y Aston Martin pierde dinero. Usamos los grupos europeos de lujo, que es como valora el mercado a Ferrari: LVMH, Hermès, Richemont, Kering, Prada, Brunello Cucinelli y Moncler, con las cifras de MarketScreener a 8-9 de octubre de 2026 recogidas para los informes de LVMH, Hermès y Moncler de este repositorio [D8]. Fuera Porsche AG y Aston Martin (fabricantes de coches en caída o en pérdidas, sin cifras comparables gratuitas).',
    empresas: [
      { nombre: 'LVMH', ticker: 'MC.PA', pais: 'FR', capitalizacion: 187963, ev_ventas: 2.73, ev_ebitda_ltm: 9.1, ev_ebitda_ntm: 8.5, per_ntm: 15.9, crecimiento_pct: 3.7, margen_ebitda_pct: 30.1, roic_pct: 12.7, dn_ebitda: 1.0, fcf_yield_pct: 6.1 },
      { nombre: 'Hermès', ticker: 'RMS.PA', pais: 'FR', capitalizacion: 134070, ev_ventas: 7.76, ev_ebitda_ltm: 16.6, ev_ebitda_ntm: 15.6, per_ntm: 27.0, crecimiento_pct: 5.8, margen_ebitda_pct: 46.8, roic_pct: null, dn_ebitda: -1.32, fcf_yield_pct: 3.1 },
      { nombre: 'Richemont', ticker: 'CFR.SW', pais: 'CH', capitalizacion: 106204, ev_ventas: 4.36, ev_ebitda_ltm: 16.0, ev_ebitda_ntm: 12.8, per_ntm: 22.4, crecimiento_pct: 16.7, margen_ebitda_pct: 27.2, roic_pct: null, dn_ebitda: -1.39, fcf_yield_pct: 3.7 },
      { nombre: 'Kering', ticker: 'KER.PA', pais: 'FR', capitalizacion: 25995, ev_ventas: 2.32, ev_ebitda_ltm: 9.3, ev_ebitda_ntm: 8.3, per_ntm: 26.6, crecimiento_pct: 2.4, margen_ebitda_pct: 25.0, roic_pct: null, dn_ebitda: 2.19, fcf_yield_pct: 8.8 },
      { nombre: 'Prada', ticker: '1913.HK', pais: 'IT', capitalizacion: 10784, ev_ventas: 2.51, ev_ebitda_ltm: 6.7, ev_ebitda_ntm: 6.4, per_ntm: 13.0, crecimiento_pct: 9.0, margen_ebitda_pct: 37.4, roic_pct: null, dn_ebitda: 1.67, fcf_yield_pct: 9.7 },
      { nombre: 'Brunello Cucinelli', ticker: 'BC.MI', pais: 'IT', capitalizacion: 5447, ev_ventas: 4.57, ev_ebitda_ltm: 15.4, ev_ebitda_ntm: 12.8, per_ntm: 31.7, crecimiento_pct: 10.2, margen_ebitda_pct: 29.6, roic_pct: null, dn_ebitda: 2.36, fcf_yield_pct: 1.9 },
      { nombre: 'Moncler', ticker: 'MONC.MI', pais: 'IT', capitalizacion: 11816, ev_ventas: 3.7, ev_ebitda_ltm: 9.2, ev_ebitda_ntm: 8.9, per_ntm: 17.0, crecimiento_pct: 4.6, margen_ebitda_pct: 40.2, roic_pct: 20.4, dn_ebitda: 0.0, fcf_yield_pct: 4.6 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2021-01', objetivo: 'Tiffany & Co.', comprador: 'LVMH', ev: 16561, ev_ventas: 3.83, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Lujo, no automóvil: precio renegociado tras la pandemia [D8].' },
      { fecha: '2018-12', objetivo: 'Belmond', comprador: 'LVMH', ev: 2836, ev_ventas: 5.59, ev_ebitda: 22.9, prima_pct: null, excluir: false, comentario: 'Hoteles de lujo [D8].' },
      { fecha: '2020-12', objetivo: 'Stone Island', comprador: 'Moncler', ev: 1150, ev_ventas: 4.79, ev_ebitda: 17.1, prima_pct: null, excluir: false, comentario: 'Ropa de lujo [D8].' },
      { fecha: '2023-08', objetivo: 'Capri Holdings', comprador: 'Tapestry', ev: 7714, ev_ventas: 1.51, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: 'Lujo asequible; operación bloqueada y cancelada [D8].' },
      { fecha: '2025-04', objetivo: 'Versace', comprador: 'Prada', ev: 1250, ev_ventas: 1.67, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Marca en pérdidas [D8].' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Ferrari ha perso il 19% in un anno, ma 12 analisti su 18 dicono di comprare (cierre del 7-oct-2026)', editor: 'Economia Italia', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://finanza.economia-italia.com/azioni-ferrari-7-ottobre-2026' },
    { id: 2, titulo: 'Ferrari N.V.: calendario y estimaciones anuales (beneficio neto, EBITDA y EBIT 2026-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.marketscreener.com/quote/stock/FERRARI-N-V-25531423/calendar/' },
    { id: 3, titulo: 'Ferrari, atteso rispetto della guidance 2025 da Equita (consenso de BPA 2026-2028)', editor: 'Orafinanza', tipo: 'Analistas', fecha: '2025-12', url: 'https://www.orafinanza.it/it/ferrari-atteso-rispetto-della-guidance-2025-da-equita' },
    { id: 4, titulo: 'Ferrari, BofA alza target price: la 12Cilindri manuale allevia le preoccupazioni su Luce', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-07-06', url: 'https://www.teleborsa.it/News/2026/07/06/ferrari-bofa-alza-target-price-la-12-cilindri-manuale-allevia-le-preoccupazioni-su-luce-87.html' },
    { id: 5, titulo: 'Ferrari: 10 Year Stock Price History (RACE, NYSE)', editor: 'Macrotrends', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.macrotrends.net/stocks/charts/RACE/ferrari/stock-price-history' },
    { id: 6, titulo: 'Titolo Ferrari in Borsa: non meglio della pista (evolución desde inicio de 2026)', editor: 'Investire Oggi', tipo: 'Prensa', fecha: '2026', url: 'https://www.investireoggi.it/titolo-ferrari-borsa-non-meglio-pista-crollo-inizio-anno/' },
    { id: 7, titulo: 'Ferrari (RACE): ROIC, EV/EBITDA y PER adelantado', editor: 'GuruFocus', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.gurufocus.com/stock/RACE/summary' },
    { id: 8, titulo: 'Informes de LVMH, Hermès y Moncler de este repositorio: comparables y transacciones de MarketScreener a 8-oct-2026', editor: 'MarketScreener (vía informes/hermes-2026-10-11 y moncler-2026-10-14)', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/MONCLER-S-P-A-15098901/valuation/' },
    { id: 9, titulo: 'Rendimiento del Bund a 10 años (9-oct-2026), serie BBSIS', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
    { id: 10, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 11, titulo: 'Ferrari rafforza il piano di buyback con acquisti per oltre 25,6 milioni di euro (5-oct-2026)', editor: 'Teleborsa (Borsa Italiana)', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://www.borsaitaliana.it/borsa/notizie/teleborsa/finanza/ferrari-rafforza-il-piano-di-buyback-con-acquisti-per-oltre-256-milioni-di-euro-153_2026-10-05_TLB.html?lang=it' },
    { id: 12, titulo: 'Ferrari at a slow pace, Jefferies cuts next three years estimates and target price', editor: 'Il Sole 24 Ore', tipo: 'Prensa', fecha: '2026', url: 'https://en.ilsole24ore.com/art/ferrari-slow-pace-jefferies-cuts-next-three-year-estimates-and-target-price-AI6Vq2K' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'sección entera (rentabilidades, beta, volatilidad, caída máxima)', tipo: 'Complemento', intentos: '1) bolsa.mjs sin red; 2) WebFetch a Yahoo bloqueado; 3) búsqueda: solo cotizaciones sueltas', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026 en Milán', tipo: 'Núcleo', intentos: '1) Borsa Italiana y Teleborsa por búsqueda: último dato del 5-oct (341,05 EUR); 2) Euronext: sin cotización indexada; 3) prensa: cierre del 7-oct-2026 a 345,25 EUR', decision: 'Calculado y marcado como estimación: se usa el cierre del 7-oct-2026' },
    { seccion: 'multiplos_historicos', campo: 'precio de cierre en Milán de cada ejercicio', tipo: 'Complemento', intentos: '1) bolsa.mjs sin red; 2) búsqueda de cierres anuales en euros: sin dato; 3) cierres de NYSE de Macrotrends convertidos a euros', decision: 'Calculado y marcado como estimación (2021 sin dato)' },
    { seccion: 'identificacion', campo: 'máximo y mínimo de 52 semanas en euros y volumen', tipo: 'Complemento', intentos: '1) Borsa Italiana; 2) TradingView (solo en USD); 3) Eulerpool', decision: 'Omitido' },
  ],
};

// ---------------- E. Sentimiento ----------------
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'The Motley Fool / Nasdaq («Ferrari beat estimates, so why is the stock down?»)', fecha: '2026-05', n_comentarios: 6, tono: 'Dividido', resumen: 'Resultados buenos que no mueven la acción: el debate es si el múltiplo ya descuenta la calidad [E1].' },
      { plataforma: 'XTB y TIKR (reacción al Luce)', fecha: '2026-05', n_comentarios: 10, tono: 'Negativo', resumen: 'Rechazo al diseño, a las cinco plazas y al precio de ≈550.000 EUR del primer eléctrico; temor a diluir la marca [E2, E5].' },
      { plataforma: 'Simply Wall St (vía Webull): «¿ya está en precio el Luce?»', fecha: '2026-08', n_comentarios: 6, tono: 'Positivo', resumen: 'Tras el 2T26 la comunidad ve un valor razonable por encima del precio y destaca la guía elevada [E3].' },
      { plataforma: 'TradingView (ideas sobre MIL:RACE)', fecha: '2026-09', n_comentarios: 8, tono: 'Negativo', resumen: '«Semáforo rojo»: la acción sigue cara por fundamentales pese a la caída; otros ven soporte en mínimos de 2023 [E4].' },
      { plataforma: 'Money.it y Economia Italia (prensa italiana con lectores)', fecha: '2026-10', n_comentarios: 6, tono: 'Dividido', resumen: '«Trimestrale solida ma il titolo scivola»: cuentas buenas, valoración exigente; 12 de 18 analistas siguen en comprar [E6, E7].' },
    ],
    temas: [
      { tema: 'El Luce y la estrategia eléctrica', postura: 'Bajista', peso: 'Alto', contraste: 'Riesgo real pero acotado: el eléctrico será ≈20 % de la gama en 2030 y la guía de 2026 se elevó tras el Luce [B1, A12].' },
      { tema: 'Valoración (PER de 30-35x)', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón en que nuestro DCF queda muy por debajo del precio; a 12 meses el PER actual es el más bajo de los últimos cinco años.' },
      { tema: 'Crecimiento con menos coches (precio y personalización)', postura: 'Alcista', peso: 'Medio', contraste: 'Confirmado: ventas del 2T26 +8 % con envíos del semestre −4 % [A2].' },
      { tema: 'Recompras como soporte', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 627,7 M recomprados en 2026 (≈1 % del capital) [C6].' },
    ],
    lectura: 'El inversor particular está más dividido que los analistas (12 de 18 en comprar, objetivo medio de ≈423 EUR) y el precio le da la razón: −19 % en doce meses. Los foros temen dos cosas que el informe recoge: que el eléctrico diluya la marca y que el múltiplo siga bajando. No hay euforia ni capitulación: es una revisión del múltiplo de un valor de calidad. No cambia la decisión, pero confirma que el catalizador es el 3T26 del 3 de noviembre y la acogida comercial del Luce.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Ferrari beat estimates. So why is the stock down?', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-05-09', url: 'https://fool.com/investing/2026/05/09/ferrari-beat-estimates-so-why-is-the-stock-down/' },
    { id: 2, titulo: 'Ferrari plummets over 6%: the market says no to the electric Luce', editor: 'XTB', tipo: 'Foros y redes', fecha: '2026-05-26', url: 'https://www.xtb.com/sca-en/market-analysis/news-and-research/ferrari-plummets-over-6-the-market-says-no-to-the-electric-luce' },
    { id: 3, titulo: 'Ferrari (BIT:RACE) hits Luce target early, is the upside already priced in?', editor: 'Webull (Simply Wall St)', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.webull.com/news/15317401774138368' },
    { id: 4, titulo: 'FERRARI: ancora semaforo rosso (ideas sobre MIL:RACE)', editor: 'TradingView', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://it.tradingview.com/symbols/MIL-RACE/ideas' },
    { id: 5, titulo: 'Ferrari stock falls 5% following launch of first fully electric vehicle Luce in Rome', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-05', url: 'https://www.tikr.com/blog/ferrari-nyse-stock-falls-5-following-launch-of-first-fully-electric-vehicle-luce-in-rome' },
    { id: 6, titulo: 'Azioni Ferrari, trimestrale solida ma il titolo scivola. Conviene comprare ora?', editor: 'Money.it', tipo: 'Foros y redes', fecha: '2026-05', url: 'https://www.money.it/azioni-ferrari-trimestrale-solida-ma-il-titolo-scivola-conviene-comprare-ora' },
    { id: 7, titulo: 'Ferrari ha perso il 19% in un anno, ma 12 analisti su 18 dicono di comprare', editor: 'Economia Italia', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://finanza.economia-italia.com/azioni-ferrari-7-ottobre-2026' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit, Stocktwits y foros italianos (FinanzaOnline) de los últimos tres meses', tipo: 'Complemento', intentos: '1) Búsqueda de hilos de Reddit y Stocktwits sobre RACE en sep-oct 2026: sin resultados; 2) FinanzaOnline: sin hilos fechados; 3) API de Stocktwits: sin red', decision: 'Omitido; se usan comentarios de plataformas y prensa con lectores' },
  ],
};

// Las notas citan con su propia numeración [n]. Al redactar se usaron citas con letra ([A13]); aquí se traducen:
// la letra propia pasa a [n] y las de otra nota copian esa fuente al final de la lista propia.
const todas = { A, B, C, D, E };
function arreglar(letra) {
  const nota = todas[letra];
  const extra = new Map();
  const mapa = (L, n) => {
    if (L === letra) return n;
    const k = `${L}${n}`;
    if (!extra.has(k)) {
      const f = todas[L].fuentes.find((x) => x.id === Number(n));
      if (!f) throw new Error(`Fuente ${k} no existe`);
      const id = nota.fuentes.length + 1;
      nota.fuentes.push({ ...f, id });
      extra.set(k, id);
    }
    return extra.get(k);
  };
  const recorrer = (v) => {
    if (typeof v === 'string') {
      return v.replace(/\[([A-E]\d+(?:,\s*[A-E]\d+)*)\]/g, (_, g) => '[' + g.split(/,\s*/).map((t) => mapa(t[0], t.slice(1))).join(', ') + ']');
    }
    if (Array.isArray(v)) return v.map(recorrer);
    if (v && typeof v === 'object') { for (const k of Object.keys(v)) if (!(v === nota && k === 'fuentes')) v[k] = recorrer(v[k]); return v; }
    return v;
  };
  recorrer(nota);
}
const originales = Object.fromEntries(Object.entries(todas).map(([k, n]) => [k, n.fuentes.map((f) => ({ ...f }))]));
for (const L of Object.keys(todas)) {
  const guardadas = Object.fromEntries(Object.entries(todas).map(([k, n]) => [k, n.fuentes]));
  for (const k of Object.keys(todas)) if (k !== L) todas[k].fuentes = originales[k];
  arreglar(L);
  for (const k of Object.keys(todas)) if (k !== L) todas[k].fuentes = guardadas[k];
}

w('A', A); w('B', B); w('C', C); w('D', D); w('E', E);
console.log('Notas A-E escritas');
