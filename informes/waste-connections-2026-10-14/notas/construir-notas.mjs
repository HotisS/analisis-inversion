// Escribe las notas A-E de Waste Connections (corte 2026-10-14) a partir del XBRL de la SEC (cuentas-xbrl.json),
// de bolsa.json (Yahoo) y de los documentos descargados en notas/docs (10-K 2025, 10-Q 2T26, notas de resultados, proxy 2026).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BO = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/1318220/';
const EURUSD = 1.1195; // BCE, 14-oct-2026

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas consolidadas, notas de segmentos, deuda, cierre de vertederos y contingencias)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: EDGAR + '000110465926013700/wcn-20251231x10k.htm' },
  { id: 2, titulo: 'XBRL companyfacts de la SEC (cuenta, balance y flujos 2016-2025)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001318220.json' },
  { id: 3, titulo: 'Nota de resultados del 2T26 (Exhibit 99.1): cuenta, balance a 30-jun-26, flujos, conciliaciones y guía 2026 elevada', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-22', url: EDGAR + '000110465926085802/wcn-20260722xex99d1.htm' },
  { id: 4, titulo: 'Nota de resultados del 4T25 y del ejercicio 2025 (conciliaciones de EBITDA y BPA ajustados; guía 2026)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: EDGAR + '000110465926013370/wcn-20260211xex99d1.htm' },
  { id: 5, titulo: 'Nota de resultados del 1T26', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-22', url: EDGAR + '000110465926046820/wcn-20260422xex99d1.htm' },
  { id: 6, titulo: 'Nota de resultados del 3T25', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-21', url: EDGAR + '000110465925101248/wcn-20251021xex99d1.htm' },
  { id: 7, titulo: 'Form 10-Q del 2T26 (deuda, cierre de vertederos, contingencias de Chiquita Canyon, recompras y hechos posteriores)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: EDGAR + '000110465926086006/wcn-20260630x10q.htm' },
  { id: 8, titulo: 'Notas de resultados del 4T de 2017 a 2023 (BPA y EBITDA ajustados, deterioros y amortización de intangibles por año)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-13', url: EDGAR + '000155837024001061/wcn-20240213xex99d1.htm' },
  { id: 9, titulo: 'Transcripción de la conferencia del 2T26 (S&P Global Market Intelligence)', editor: 'Waste Connections, Inc. (web de inversores)', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://s21.q4cdn.com/540990023/files/doc_earnings/2026/q2/transcript/Q2-2026-Transcript.pdf' },
  { id: 10, titulo: 'Transcripción de la conferencia del 1T26', editor: 'Waste Connections, Inc. (web de inversores)', tipo: 'Primaria', fecha: '2026-04-23', url: 'https://s21.q4cdn.com/540990023/files/doc_earnings/2026/q1/transcript/Q1-2026-Transcript.pdf' },
];

const NR = { 2017: 156.5, 2018: 20.1, 2019: 61.9, 2020: 466.7, 2021: 32.3, 2022: 18.2, 2023: 238.8, 2024: 613.0, 2025: 109.7 };
const cuenta = X.financieros.cuenta.filter((c) => c.periodo >= '2017').map((c) => {
  const { fin, ...r } = c;
  return { ...r, no_recurrentes_en_ebitda: NR[c.periodo] ?? null, dpa_extraordinario: 0, participadas_en_ebitda: null };
});
const historico = X.balance.historico.filter((c) => c.periodo >= '2017').map((c) => {
  const { fin, ...r } = c;
  // US GAAP: los arrendamientos operativos no son deuda (el alquiler ya está en el EBITDA); deuda_financiera incluye los financieros.
  return { ...r, arrendamientos: 0, existencias: 0, activos_contrato: null };
});
const flujos = X.flujos.historico.filter((c) => c.periodo >= '2017').map((c) => {
  const { fin, ...r } = c;
  return { ...r, recompras: r.recompras ?? 0, pagos_arrendamientos: r.pagos_arrendamientos ?? 0 };
});

const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBITDA', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'Completo. Cuentas del XBRL de la SEC comprobadas con el 10-K 2025, las notas de resultados de cada 4T (2017-2025) y el 10-Q del 2T26.',
  negocio: {
    descripcion: 'Waste Connections recoge, transfiere y elimina residuos sólidos no peligrosos de unos nueve millones de clientes residenciales, comerciales e industriales en 46 estados de EE. UU. y seis provincias de Canadá, sobre todo en mercados «exclusivos» (franquicias o contratos municipales de varios años) y en mercados secundarios y rurales donde compite con pocos rivales [3, 1]. Es una empresa integrada: en 2025 tenía 102 vertederos propios en operación, cinco con contrato de toda la vida útil y siete operados, más estaciones de transferencia, y llevó a vertederos propios el 59 % de los residuos que recogió en el 2T26 («internalización») [1, 3]. Completa el negocio con tratamiento de residuos de petróleo y gas (E&P, R360), reciclaje, gas de vertedero y gas natural renovable, y transporte intermodal en el noroeste del Pacífico [1].',
    como_gana_dinero: 'Cobra tarifas recurrentes por recogida (el 71 % de los ingresos brutos de 2025) y tarifas por tonelada en vertederos y estaciones de transferencia [1]. Casi todo es recurrente: contratos de varios años con subidas anuales indexadas en los mercados exclusivos y precios libres que se suben cada año en los competitivos. El margen depende del diferencial entre precio y coste: en 2025 el precio «core» subió un 6,5 % con volúmenes del −2,8 % y el margen de EBITDA ajustado pasó del 32,5 % al 33,0 % [4]. La internalización en vertedero propio y la densidad de rutas dan el apalancamiento operativo; el gasóleo (recuperado con recargos) y los precios del reciclaje y de los RIN de gas renovable son los factores volátiles [3, 9]. Estacionalidad: el 1T es el trimestre débil [3, 5].',
    segmentos: [
      seg('Southern', 'Sur de EE. UU.', [['2023', 1642.3, 518.0], ['2024', 1757.2, 556.4], ['2025', 1907.8, 632.4]]),
      seg('Western', 'Costa oeste, mercados sobre todo exclusivos (incluye Chiquita Canyon, California)', [['2023', 1669.3, 483.2], ['2024', 1798.7, 520.8], ['2025', 1849.4, 513.2]]),
      seg('Eastern', 'Noreste y este de EE. UU.', [['2023', 1380.2, 353.1], ['2024', 1564.2, 417.2], ['2025', 1702.2, 451.8]]),
      seg('Central', 'Centro de EE. UU.', [['2023', 1440.2, 512.3], ['2024', 1514.9, 542.8], ['2025', 1589.9, 574.9]]),
      seg('Canada', 'Seis provincias canadienses, con R360 Canada (residuos de petróleo y gas)', [['2023', 995.8, 390.7], ['2024', 1261.0, 551.5], ['2025', 1324.9, 598.2]]),
      seg('MidSouth', 'Centro-sur de EE. UU.', [['2023', 894.2, 246.1], ['2024', 1023.6, 283.4], ['2025', 1092.7, 306.1]]),
      seg('Corporate', 'Costes centrales no asignados', [['2023', 0, -25.0], ['2024', 0, -27.7], ['2025', 0, -24.6]]),
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 86.0 }, { nombre: 'Canadá', peso_pct: 14.0 }], geografias_criterio: 'origen',
    clientes: 'Ningún cliente ni contrato llega al 10 % de los ingresos [1]. Los contratos de vertedero y transferencia duran de uno a diez años con subidas anuales indexadas; las franquicias residenciales de los mercados exclusivos son de varios años y se renuevan en su mayoría [1]. El poder de precios es la tesis del negocio: precio core del 6,4-6,6 % en 2024-2025 y del 5,8 % en el 1S26 con una inflación de costes menor, de modo que el margen ajustado subió del 31,2 % de 2020 al 33,0 % de 2025 [8, 4, 3]. El coste es el volumen: −2,7/−2,8 % en 2024-2025 y −1,7 % en el 1S26, en parte bajas voluntarias por precio y en parte construcción floja [4, 3].',
    kpis: [
      { kpi: 'Precio core (residuos sólidos)', valor_anterior: '6,5 % (2025)', valor_actual: '5,8 % (1S26)', variacion: '−0,7 pp', comentario: 'Guía de ≥5,5 % para 2026 [3, 9].' },
      { kpi: 'Volumen de residuos sólidos', valor_anterior: '−2,8 % (2025)', valor_actual: '−1,7 % (1S26)', variacion: '+1,1 pp', comentario: 'Construcción y residuos especiales flojos; las toneladas de C&D crecieron en el 2T26 por primera vez en diez trimestres [9].' },
      { kpi: 'Margen de EBITDA ajustado', valor_anterior: '33,0 % (2025)', valor_actual: '32,6 % (1S26); guía 2026 33,2-33,3 %', variacion: '+0,2-0,3 pp en el año', comentario: '70 pb de mejora subyacente en el 2T26 contra 40 pb de gasóleo [9].' },
      { kpi: 'Internalización (residuos a vertedero propio)', valor_anterior: 'n. d.', valor_actual: '59 % (2T26)', variacion: null, comentario: 'Mide la integración vertical [3].' },
      { kpi: 'Caja libre ajustada', valor_anterior: '1.259 M (2025)', valor_actual: 'guía 1.400-1.450 M (2026)', variacion: '+13 %', comentario: 'Incluye 100-150 M de salidas por el cierre de Chiquita Canyon [9].' },
      { kpi: 'Compras (ingresos anualizados)', valor_anterior: '19 compras, 967 M de valor (2025)', valor_actual: '≈100 M de ingresos comprados en el 1S26', variacion: null, comentario: 'Otros 30 M en el 3T26 [1, 9].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 9763.9, ebitda: 2937.1, ebit: 1662.0, beneficio_neto: 1060.5, bpa: 4.14, dpa: 1.365, dpa_extraordinario: 0, fcf: 1263.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 237.3 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: '24 compras por 2.228 M de valor razonable, entre ellas 30 plantas de residuos de petróleo y gas de Secure Energy en Canadá (cerrada el 1-feb-2024) [1].' },
    ],
    comentario: 'Los ingresos pasaron de 4.631 M USD en 2017 a 9.467 M en 2025, un 9,4 % anual, la mitad por precio y el resto por unas 15-25 compras al año [2, 1]. En 2025 crecieron un 6,1 %: precio core del 6,5 %, volumen del −2,8 %, compras netas y residuos de petróleo y gas (E&P, de 522 a 689 M) [1, 4]. El margen de EBITDA ajustado subió del 31,0 % de 2019 al 33,0 % de 2025 por precio por encima del coste, retención de empleados y menos siniestralidad [8, 4]. El EBITDA contable (EBIT más amortizaciones) es más bajo y salta por los deterioros y ajustes de cierre de vertederos que la empresa deja en el resultado de explotación: 467 M en 2020 (residuos de petróleo y gas), 239 M en 2023 y 613 M en 2024 (vertedero de Chiquita Canyon), 110 M en 2025 y 138 M en el 1S26 [8, 4, 3]. En el 1S26 los ingresos crecieron un 6,4 % y el EBITDA ajustado un 7,4 % [3].',
    ajustes: 'Usamos las cifras publicadas en US GAAP. El EBITDA de la cuenta es EBIT más amortizaciones (depreciación más amortización de intangibles comprados: 1.031 M y 202 M en 2025) [1]. La partida «Impairments and other operating items» va en no_recurrentes_en_ebitda para comparar con el EBITDA ajustado, que la excluye; pero se repite todos los años (191 M de media en 2017-2025), así que en el DCF restamos 0,8 puntos de margen por ese concepto. El EBITDA ajustado de la empresa suma además la actualización financiera de las provisiones de cierre (≈41 M) y los costes de compras (10-25 M) [3, 4]. El BPA ajustado de la empresa excluye la amortización de intangibles y los deterioros: 5,15 USD en 2025 frente a 4,17 USD contable [4]; es la base de BPA que usamos en la rentabilidad a 12 meses, porque es la del consenso y la del sector. 2017 lleva un ingreso fiscal por la reforma de EE. UU. (impuesto negativo) [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 2338.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 787.4, margen_ebitda_pct: 33.7, bpa: 1.35, vs_consenso: null },
      { periodo: '4T24', ingresos: 2260.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 731.9, margen_ebitda_pct: 32.4, bpa: 1.16, vs_consenso: null },
      { periodo: '1T25', ingresos: 2228.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 712.2, margen_ebitda_pct: 32.0, bpa: 1.13, vs_consenso: null },
      { periodo: '2T25', ingresos: 2407.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 786.4, margen_ebitda_pct: 32.7, bpa: 1.29, vs_consenso: null },
      { periodo: '3T25', ingresos: 2458.4, crecimiento_pct: 5.1, crecimiento_organico_pct: 2.0, ebitda: 830.3, margen_ebitda_pct: 33.8, bpa: 1.44, vs_consenso: null },
      { periodo: '4T25', ingresos: 2373.3, crecimiento_pct: 5.0, crecimiento_organico_pct: 2.0, ebitda: 795.6, margen_ebitda_pct: 33.5, bpa: 1.29, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 2370.6, crecimiento_pct: 6.4, crecimiento_organico_pct: 3.1, ebitda: 769.5, margen_ebitda_pct: 32.5, bpa: 1.23, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 2561.6, crecimiento_pct: 6.4, crecimiento_organico_pct: 3.6, ebitda: 840.1, margen_ebitda_pct: 32.8, bpa: 1.50, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'EBITDA y BPA ajustados (los que sigue el mercado); el crecimiento orgánico es el de residuos sólidos que publica la empresa. En la conferencia del 2T26 (23-jul) la dirección subió la guía de 2026 a 10.020-10.050 M de ingresos y 3.330-3.340 M de EBITDA ajustado, y mantuvo la caja libre ajustada en 1.400-1.450 M, con 100-150 M de salidas por Chiquita Canyon [3, 9]. Mensajes: 70 pb de mejora subyacente del margen pese al gasóleo (que pasó de 60 a más de 120 USD por barril en cuatro a seis semanas), precio core del 5,6 % con un rendimiento del 4,6 % gracias a una herramienta de precios con IA desplegada a finales de 2025, y volumen del −1,9 % [9]. Frente al 1T26 (23-abr), el discurso pasó de «incertidumbre macro» a «julio mejor»: residuos especiales y C&D al alza en julio, aunque sin meterlo en la guía [10, 9]. Los analistas preguntaron sobre todo por la pérdida de clientes ante los recargos de combustible (la dirección la cifra en 10-15 pb de volumen), la contabilidad de Chiquita Canyon (58 M de deterioro en el 2T26) y las compras arrastradas a 2027 (≈30 M de ingresos) [9]. La dirección no dio cifras de 2027 más allá de «crecimiento de dos dígitos de la caja libre por acción» y no cuantificó las posibles sanciones de Chiquita [9, 7].',
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [
      { anio: '2026', importe: 8 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 500 }, { anio: '2029', importe: 852 },
      { anio: '2030', importe: 2875 }, { anio: '2031', importe: 0 }, { anio: '2032+', importe: 5129 },
    ],
    liquidez: 'Caja de 98 M a 30-jun-2026 y unos 580 M disponibles en la línea de crédito a 31-dic-2025 (vence en febrero de 2030), ampliada en la práctica por la colocación de 700 M CAD de bonos en julio de 2026 que amortizó parte de lo dispuesto [3, 1, 7].',
    rating: 'Grado de inversión (BBB+ de S&P y Baa1 de Moody\'s según los folletos de emisión; el 10-K solo dice «investment grade»)',
    coste_deuda_pct: 3.9, vida_media_anios: 9.0,
    otros_pasivos: 'Provisiones de sellado, cierre y post-cierre de vertederos de 709 M a 30-jun-2026 (652 M en diciembre), con 173,5 M de ajustes en el semestre por Chiquita Canyon y 137 M de pagos; los pagos futuros sin descontar suman 2.453 M, la mayoría después de 2030 [7]. Contraprestaciones contingentes de compras: 81 M [3]. Covenant de deuda total entre EBITDA ≤3,75 veces (4,25 en periodos de compras); la empresa estaba en 2,76 veces en junio de 2026 [1, 9]. Litigios abiertos sin estimación de pérdida: unos 12.730 demandantes por las emisiones del vertedero de Chiquita Canyon (California), una demanda del condado de Los Angeles, sanciones pendientes de la agencia del aire SCAQMD (476 avisos de infracción) y la demanda por olores del vertedero de Jefferson Parish (Luisiana) [7]. La propia empresa reclama más de 825 M al condado por el cierre [7].',
    comentario: 'La deuda financiera bruta pasó de 3.911 M en 2017 a 8.820 M en 2025 y 9.364 M en junio de 2026, porque las compras (2.207 M en 2022, 2.121 M en 2024) y desde 2025 las recompras (506 M en 2025 y 615 M en el 1S26) superan a la caja libre después de dividendos [2, 3]. Aun así el apalancamiento se mantiene en 2,7-2,8 veces el EBITDA ajustado, el rango que la dirección declara [9]. El circulante es negativo si se cuentan los ingresos anticipados (416 M): clientes a 38 días, 23 días netos de anticipos [3]. Dos tercios de la deuda son bonos a tipo fijo del 2,2-5,25 % con vencimientos escalonados hasta 2052; el resto es la línea de crédito a tipo variable (SOFR o CORRA + 0,875 %) [1, 7].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de EBITDA en caja es alta y estable: flujo operativo de 2.414 M en 2025 (el 25,5 % de los ingresos) y caja libre ajustada de 1.259 M (13,3 %) [2, 4]. El capex fue de 1.179 M en 2025, el 12,5 % de los ingresos, por encima de la depreciación (1.031 M) por las plantas de gas renovable (casi terminadas a finales de 2026) y la renovación de flota; la empresa no separa mantenimiento y crecimiento, y estimamos el de mantenimiento en torno a la depreciación, el 10,5-11 % de las ventas (estimación propia) [1, 9]. Las compras se comieron 6.731 M en 2021-2025, más que toda la caja libre del periodo; las recompras volvieron en 2025 (506 M) y 2026 (615 M en el semestre) [2, 3]. Años anómalos: 2024 por el pago de Secure (≈1.000 M) y 2020 por el bajo capex del covid [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Grant Thornton LLP', anios_auditor: 9, opinion: 'Favorable (también sobre control interno)',
    comentario: 'Las cuentas son limpias pero tienen dos zonas de juicio. La primera son los vertederos: la amortización por tonelada depende de la capacidad «probable» de ampliación (seis vertederos con ampliaciones que la empresa da por probables) y las provisiones de cierre de supuestos de coste y plazo; Chiquita Canyon obligó a reconocer 613 M en 2024 y otros 138 M en el 1S26 [1, 3]. La segunda son las cifras ajustadas: el BPA ajustado excluye la amortización de intangibles comprados (≈200 M al año) y los deterioros, que se repiten todos los años; entre 2017 y 2025 los deterioros sumaron 1.717 M, el 18 % del beneficio contable acumulado [8, 4]. Los pagos en acciones son modestos (79 M, el 7 % del beneficio). Sin cambios de criterio ni reexpresiones. El fondo de comercio (8.392 M) y los intangibles (2.006 M) son el 49 % del activo: un deterioro grande es posible si una región se tuerce (ya pasó en E&P en 2020) [1].',
    senales: [
      { senal: 'Deterioros recurrentes fuera del EBITDA ajustado', nivel: 'Media', comentario: '1.717 M en 2017-2025; 191 M de media anual. Los restamos del margen del DCF (0,8 puntos).' },
      { senal: 'Provisiones de cierre de Chiquita Canyon aún crecientes', nivel: 'Media', comentario: '+173,5 M de ajustes en el 1S26 sobre 652 M; salidas de caja de 100-150 M en 2026 [7, 9].' },
      { senal: 'Litigios sin estimación de pérdida', nivel: 'Media', comentario: '≈12.730 demandantes en Chiquita Canyon y sanciones de SCAQMD sin provisión [7].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: compras de residuos sólidos (lo primero), dividendo creciente (sube cada octubre desde 2010; 0,35 USD trimestrales desde octubre de 2025, 1,40 USD anualizados) y recompras oportunistas dentro de la autorización anual (NCIB) del 5 % del capital; la renovada el 7-ago-2026 permite comprar hasta 12,58 M de acciones hasta agosto de 2027 [1, 3, 7]. Apalancamiento objetivo en torno a 2,5-3,0 veces deuda/EBITDA [9]. La empresa promete «crecimiento de dos dígitos de la caja libre por acción» en 2026 y 2027 [9].',
    adquisiciones: [
      { anio: '2016', objetivo: 'Progressive Waste Solutions (fusión inversa; sede a Canadá)', importe: null, ev_ebitda: null, financiacion: 'Acciones', resultado: 'Duplicó el tamaño y dio la plataforma canadiense, la de mayor margen (45 % de EBITDA en 2025) [1].' },
      { anio: '2024', objetivo: '30 plantas de residuos de petróleo y gas de Secure Energy (Canadá)', importe: 785, ev_ebitda: null, financiacion: 'Deuda (1.075 M CAD)', resultado: 'E&P pasó de 232 M de ingresos en 2023 a 689 M en 2025 [1].' },
      { anio: '2024', objetivo: '24 compras (incluida Secure)', importe: 2228, ev_ebitda: null, financiacion: 'Deuda y caja', resultado: 'Ingresos +11,2 % en 2024; sin deterioros de fondo de comercio desde 2017 [1].' },
      { anio: '2025', objetivo: '19 compras de residuos sólidos y E&P', importe: 967, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Contribución de 242 M de ingresos en el 1S25 de las compras del periodo anterior [1, 3].' },
      { anio: '2020', objetivo: 'Negocio de residuos de petróleo y gas (comprado en 2012, R360)', importe: null, ev_ebitda: null, financiacion: null, resultado: 'Deterioro de 467 M en 2020 por la caída del crudo: la única compra grande que salió mal [8].' },
    ],
    comentario: 'La dirección es una asignadora de capital disciplinada en el negocio principal: compra pequeños operadores de residuos sólidos (15-25 al año) a múltiplos por debajo del suyo y los integra en sus vertederos; el resultado se ve en un margen ajustado que sube y en un ROIC estable del 7-8 %. El ROIC no sube porque el fondo de comercio de cada compra entra al precio pagado. El punto débil fue E&P (deterioro de 467 M en 2020), al que volvió en 2024 con Secure. Desde 2025 recompra de forma agresiva (1.120 M en 18 meses) con la acción en mínimos de dos años; el CEO compró 50.000 acciones (7,6 M USD) en mayo de 2026 a 152,24 USD, cerca del precio actual (Form 4; ver gobierno).',
    confianza: 'Alta',
  },
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: competencia, regulación (RCRA Subtitle D, NSPS, RFS) y vertederos', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: EDGAR + '000110465926013700/wcn-20251231x10k.htm' },
  { id: 2, titulo: 'Ficha sectorial «Gestión de residuos sólidos» (14-oct-2026)', editor: 'Repositorio propio (sectores/residuos-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/residuos-2026-10-14.md' },
  { id: 3, titulo: 'Waste Management: key statistics (ingresos, EBITDA, márgenes, ROIC)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/wm/statistics/' },
  { id: 4, titulo: 'Republic Services: key statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rsg/statistics/' },
  { id: 5, titulo: 'GFL Environmental: key statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/gfl/statistics/' },
  { id: 6, titulo: 'Casella Waste Systems: key statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/cwst/statistics/' },
  { id: 7, titulo: 'Clean Harbors: key statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/clh/statistics/' },
  { id: 8, titulo: 'Transcripción de la conferencia del 2T26', editor: 'Waste Connections, Inc.', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://s21.q4cdn.com/540990023/files/doc_earnings/2026/q2/transcript/Q2-2026-Transcript.pdf' },
  { id: 9, titulo: 'Form 10-Q del 2T26 (Chiquita Canyon: litigios y sanciones)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: EDGAR + '000110465926086006/wcn-20260630x10q.htm' },
  { id: 10, titulo: 'Proxy 2026 (ESG: objetivos de emisiones, seguridad y retención)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-02', url: EDGAR + '000110465926039146/tm2529435-2_def14a.htm' },
];
const B = {
  _estado: 'Completo. Tamaño de mercado de la ficha sectorial del repositorio (agregado de las cotizadas y estimación del mercado de EE. UU. y Canadá).',
  historia: {
    resumen: 'Ronald Mittelstaedt fundó Waste Connections en 1997 en California para comprar recogidas en mercados secundarios y rurales con poca competencia; salió a bolsa en 1998 [1]. Durante dos décadas creció con cientos de compras pequeñas y franquicias exclusivas en el oeste. En 2012 entró en residuos de petróleo y gas (R360). En junio de 2016 se fusionó con la canadiense Progressive Waste Solutions, que duplicó su tamaño y trasladó la sede legal a Ontario (cotiza en Nueva York y Toronto) [1]. Mittelstaedt dejó el cargo de consejero delegado en 2019 para ser presidente ejecutivo; su sucesor salió en 2023 y él volvió como consejero delegado [10]. En 2024 compró las plantas de Secure Energy en Canadá y cerró el vertedero de Chiquita Canyon (California), su mayor problema ambiental [1, 9].',
    hitos: [
      { anio: '1997', hito: 'Fundación en California por Ronald Mittelstaedt.' },
      { anio: '1998', hito: 'Salida a bolsa (NYSE).' },
      { anio: '2012', hito: 'Compra de R360 Environmental Solutions: entrada en residuos de petróleo y gas.' },
      { anio: '2016', hito: 'Fusión con Progressive Waste Solutions; sede legal en Canadá, triple de tamaño en ingresos.' },
      { anio: '2020', hito: 'Deterioro de 467 M en E&P por el desplome del crudo.' },
      { anio: '2023', hito: 'Mittelstaedt vuelve a ser consejero delegado; empieza la reacción térmica del vertedero de Chiquita Canyon.' },
      { anio: '2024', hito: 'Compra de 30 plantas de Secure Energy (1.075 M CAD); Chiquita Canyon deja de admitir residuos y se reconocen 613 M de cargos.' },
      { anio: '2026', hito: 'Récord de recompras (692 M hasta julio) y guía de EBITDA ajustado de 3.330-3.340 M.' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es la recogida, transferencia y eliminación de residuos sólidos no peligrosos (municipales, comerciales, industriales y de construcción) en EE. UU. y Canadá, más el tratamiento de residuos de petróleo y gas, que es el 7 % de los ingresos de la empresa. Quedan fuera los residuos peligrosos y los servicios industriales (Clean Harbors) y el agua y la energía (Veolia). Usamos el tamaño de la ficha sectorial del repositorio [2], construido con la suma de ingresos de las cotizadas y su cuota estimada.',
    tamano: '≈ 115.000 M USD en 2025 (EE. UU. y Canadá, residuos sólidos no peligrosos; estimación de la ficha sectorial) [2]',
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2021', tamano: 92000 }, { anio: '2022', tamano: 100000 }, { anio: '2023', tamano: 106000 }, { anio: '2024', tamano: 111000 }, { anio: '2025', tamano: 115000 },
      { anio: '2026e', tamano: 120000 }, { anio: '2028e', tamano: 130000 }, { anio: '2030e', tamano: 141000 },
    ],
    tcac_historico_pct: 5.7, tcac_previsto_pct: 4.2, cr5_pct: 55, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Precio por encima de la inflación', efecto: '+', horizonte: 'Estructural', evidencia: 'Precio core de WCN del 6,5 % en 2025 y ≥5,5 % en 2026 con IPC del 3 % [8].' },
      { driver: 'Población y formación de hogares', efecto: '+', horizonte: 'Estructural', evidencia: 'Volumen residencial estable; el sur y el centro crecen más [1].' },
      { driver: 'Construcción y actividad industrial', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Volumen de residuos sólidos de WCN −2,8 % en 2025; C&D al alza en el 2T26 por primera vez en diez trimestres [8].' },
      { driver: 'Escasez de capacidad de vertedero', efecto: '+', horizonte: 'Estructural', evidencia: 'Permisos de nuevos vertederos casi imposibles; quien tiene vertedero fija el precio de eliminación [1].' },
      { driver: 'Gasóleo, reciclaje y créditos de gas renovable (RIN)', efecto: '+/−', horizonte: 'Cíclico', evidencia: '40 pb de margen perdido por el gasóleo y 20 pb por el reciclaje en el 2T26 [8].' },
      { driver: 'Precio del crudo y perforación (E&P)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'E&P +18 % interanual en el 2T26; en 2020 obligó a un deterioro de 467 M [8, 1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Tres grandes (WM, Republic, WCN) y GFL; en mercados exclusivos no hay rivalidad durante el contrato. Márgenes EBITDA del 30-33 % en los grandes [3, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes atomizados; los municipios negocian franquicias cada varios años, pero el coste de la basura es pequeño para cada hogar [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Mano de obra (conductores) y gasóleo; los camiones y contenedores tienen pocos fabricantes. Los recargos trasladan el gasóleo con retraso [8].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Sin vertedero no se compite en eliminación; los permisos tardan una década (Chiquita Canyon pidió su ampliación en 2004 y la obtuvo en 2017) [9].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'Reciclaje y valorización energética desvían una parte pequeña; la normativa de responsabilidad ampliada del productor en Canadá cambia quién paga, no quién recoge [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Los volúmenes llevan tres años en negativo (−2,7/−2,8 % en 2024-2025) por la construcción y los residuos especiales, mientras el precio sigue alto [8]. El sector es defensivo: en 2009 los ingresos de los grandes cayeron un 10-15 % por volumen, pero los márgenes aguantaron; en 2020 WCN redujo ingresos solo un 1 % (5.389 a 5.446 M con compras) y en 2022 subió precios por encima de la inflación. Indicadores: toneladas de C&D y residuos especiales, permisos de construcción y precio del gasóleo [2, 8].' },
    regulacion: 'La EPA regula los vertederos (RCRA Subtitle D) y sus emisiones de metano (NSPS Subpart XXX y directrices para vertederos existentes, más estrictas desde 2016); California y SCAQMD son los reguladores más duros, como muestra Chiquita Canyon (476 avisos de infracción) [1, 9]. El estándar de combustibles renovables (RFS) fija el valor de los RIN del gas renovable que vende la empresa. En Canadá, la responsabilidad ampliada del productor traslada el coste del reciclaje residencial a los fabricantes, lo que puede quitar contratos de reciclaje municipal [1]. Algunos estados regulan las tarifas de los vertederos [1].',
    tendencias: 'Tres tendencias: (1) consolidación, con compras de operadores privados a 8-12 veces EBITDA que los grandes integran en su red; (2) automatización y precios con datos: WCN atribuye el aumento de su rendimiento de precio a una herramienta de IA desplegada a finales de 2025 y prevé más proyectos con IA en operaciones [8]; (3) gas renovable de vertedero, con todas sus plantas en marcha a principios de 2027 [8]. La IA no sustituye la recogida ni el vertedero; la amenaza tecnológica real son los camiones eléctricos o autónomos (coste, no demanda) y la reducción de residuos en origen, ambas lentas.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 8.2,
    posicion: '3.º de EE. UU. y Canadá en residuos sólidos (≈8 % del mercado), por detrás de WM (≈20 %) y Republic (≈14 %); n.º 1 o 2 en casi todos sus mercados locales.',
    competidores: [
      { nombre: 'Waste Management', pais: 'EE. UU.', ticker: 'WM', ingresos: 25670, cuota_pct: 20.0, margen_ebit_pct: 18.6, comentario: 'Líder con la mayor red de vertederos; compró Stericycle (residuos sanitarios) en 2024. Margen EBITDA 30,3 % [3].' },
      { nombre: 'Republic Services', pais: 'EE. UU.', ticker: 'RSG', ingresos: 16890, cuota_pct: 14.0, margen_ebit_pct: 20.4, comentario: 'Mercados urbanos del sur y oeste; margen EBITDA 31,1 % [4].' },
      { nombre: 'GFL Environmental', pais: 'Canadá', ticker: 'GFL', ingresos: 4910, cuota_pct: 4.0, margen_ebit_pct: 8.0, comentario: 'Comprador apalancado (5,7 veces); vendió su división de servicios ambientales en 2025 [5].' },
      { nombre: 'Casella Waste Systems', pais: 'EE. UU.', ticker: 'CWST', ingresos: 1960, cuota_pct: 1.7, margen_ebit_pct: 5.5, comentario: 'Noreste de EE. UU., integrada con vertederos; margen EBITDA 21,4 % [6].' },
      { nombre: 'Clean Harbors', pais: 'EE. UU.', ticker: 'CLH', ingresos: 6240, cuota_pct: null, margen_ebit_pct: 11.5, comentario: 'Residuos peligrosos y servicios industriales: competidor en E&P y residuos especiales, no en recogida [7].' },
      { nombre: 'Operadores privados y municipios', pais: 'EE. UU. y Canadá', ticker: null, ingresos: null, cuota_pct: 45.0, comentario: 'Miles de operadores locales: el vivero de compras del sector [1].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Densidad de rutas local, no efectos de red en sentido estricto.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Franquicias exclusivas de varios años con subidas indexadas; las bajas suben con los recargos, pero apenas 10-15 pb de volumen [8].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Permisos de vertedero: 102 vertederos propios con 19-38 años de vida media; obtener uno nuevo tarda más de una década [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Internalización del 59 % y margen EBITDA ajustado del 33 %, el más alto de los grandes (WM 30 %, Republic 31 %) [3, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Mercados secundarios y rurales que solo sostienen un operador integrado [1].' },
      ],
    },
    amenazas: 'El foso es local y regulatorio: lo erosionaría (1) que un regulador limite las tarifas de vertedero o fuerce el cierre de otro vertedero, como en Chiquita Canyon (probabilidad baja por emplazamiento, pero ya ocurrió); (2) una competencia más agresiva de operadores privados que no repercuten el gasóleo (efecto de 10-15 pb de volumen en 2026) [8]; (3) que los municipios saquen a concurso franquicias exclusivas con más frecuencia. La IA no amenaza el negocio: es física y local; la usa la propia empresa para fijar precios y rutas.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Tres asuntos mueven las cifras. (1) Metano de vertedero y gas renovable: la empresa captura gas para producir gas natural renovable y vende créditos RIN; la regulación de metano (EPA, CARB) eleva el capex y las sanciones [1, 9]. (2) Gestión de vertederos: la reacción térmica de Chiquita Canyon costó 613 M en 2024, 138 M en el 1S26 y 100-150 M de caja en 2026, además de litigios con unos 12.730 demandantes [9]. (3) Seguridad laboral y retención de conductores: la siniestralidad récord de 2025 explica la mitad de la mejora de margen subyacente del 2T26 por menores costes de seguros [8, 10].',
    controversias: 'Chiquita Canyon (California): emisiones y lixiviados desde mayo de 2023, 476 avisos de infracción de SCAQMD, demanda del condado de Los Angeles (2024), demanda de SCAQMD por sanciones (mayo de 2026) y acciones de miles de vecinos; cierre del vertedero en 2025 [9]. Jefferson Parish (Luisiana): demandas por olores, con un caso individual (Crossman) que va a juicio [9].',
    confianza: 'Media',
  },
  fuentes: fB,
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Management Information Circular and Proxy Statement 2026 (DEF 14A)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-02', url: EDGAR + '000110465926039146/tm2529435-2_def14a.htm' },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (Item 5.07)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-15', url: EDGAR + '000110465926062507/tm2614785d1_8k.htm' },
  { id: 3, titulo: 'Form 4 presentados entre el 14-oct-2025 y el 14-oct-2026 (herramienta form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001318220&type=4' },
  { id: 4, titulo: 'Form 8-K: nombramiento de Daniel L. Florness como consejero', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-18', url: EDGAR + '000110465926031042/tm269110d1_ex99-1.htm' },
  { id: 5, titulo: 'Notas de resultados del 4T 2020-2025 (guía anual y real)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: EDGAR + '000110465926013370/wcn-20260211xex99d1.htm' },
];
const C = {
  _estado: 'Completo. Proxy 2026, resultados de la junta de mayo de 2026 y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Ronald J. Mittelstaedt', cargo: 'Fundador, presidente (President) y consejero delegado', desde: '1997', participacion_pct: 0.10, trayectoria: 'Fundó la empresa en 1997 y la dirigió hasta 2019; presidente ejecutivo en 2019-2023 y de nuevo consejero delegado desde 2023. Con él los ingresos pasaron de cero a 9.467 M y el margen ajustado al 33 % [1].' },
      { nombre: 'Mary Anne Whitney', cargo: 'Vicepresidenta ejecutiva y directora financiera', desde: '2018', participacion_pct: 0.02, trayectoria: 'En la empresa desde 2006; directora financiera desde julio de 2018. Antes, Wheelabrator Technologies [1].' },
      { nombre: 'Jason Craft', cargo: 'Vicepresidente ejecutivo y director de operaciones', desde: '2025', participacion_pct: null, trayectoria: 'Director de operaciones según sus Form 4 de 2026 [3].' },
      { nombre: 'Patrick J. Shea', cargo: 'Vicepresidente ejecutivo, secretario general y del consejo', desde: '2008', participacion_pct: 0.01, trayectoria: 'En la empresa desde 2004; lleva los litigios de Chiquita Canyon [1].' },
      { nombre: 'James M. Little', cargo: 'Vicepresidente ejecutivo de ingeniería y eliminación', desde: '1999', participacion_pct: 0.01, trayectoria: 'Responsable de los vertederos; antes en Waste Management (1990-1999) [1].' },
      { nombre: 'Michael W. Harlan', cargo: 'Presidente no ejecutivo del consejo', desde: '1998', participacion_pct: 0.00, trayectoria: 'Consejero desde 1998 y presidente independiente; consejero delegado de Principal Environmental [1].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'EBITDA ajustado ≈1.800 M (feb-21)', real: '1.919 M', cumplida: 'Sí' },
      { anio: '2022', guia: 'EBITDA ajustado ≈2.145 M (feb-22)', real: '2.221 M', cumplida: 'Sí' },
      { anio: '2023', guia: 'EBITDA ajustado ≈2.500 M (feb-23)', real: '2.523 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'EBITDA ajustado ≈2.860 M (feb-24)', real: '2.902 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'EBITDA ajustado 3.050-3.100 M (aprox., feb-25); caja libre ajustada ≈1.300 M', real: '3.125 M; caja libre 1.259 M', cumplida: 'Parcial' },
      { anio: '2026', guia: 'EBITDA ajustado 3.300-3.325 M (feb-26), elevada a 3.330-3.340 M (jul-26)', real: '1.610 M en el 1S26', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de casa: la directora financiera, el secretario general y el responsable de vertederos llevan 20-27 años en la empresa [1]. La credibilidad es alta: la empresa ha batido su guía de EBITDA ajustado cada año de 2021 a 2025 [5]; la caja libre de 2025 quedó algo corta por los pagos de Chiquita Canyon y el capex de gas renovable. El riesgo está en la sucesión: el fundador tiene 62 años y volvió en 2023 tras la salida de su sucesor (cuyo coste de separación aún aparece en la caja libre ajustada), y el proxy no nombra a un sucesor [1]. El consejero delegado compró 50.000 acciones (7,6 M USD) en mayo de 2026, la mayor compra de un directivo en años [3].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Michael W. Harlan', cargo: 'Presidente no ejecutivo', tipo: 'Independiente', desde: '1998', comisiones: 'Auditoría; Ejecutiva (presidente); Nombramientos y gobierno' },
      { nombre: 'Ronald J. Mittelstaedt', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '1997', comisiones: 'Ejecutiva' },
      { nombre: 'Elise L. Jordan', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría (presidenta); Nombramientos y gobierno' },
      { nombre: 'Susan "Sue" Lee', cargo: 'Consejera', tipo: 'Independiente', desde: '2014', comisiones: 'Remuneraciones (presidenta); Nombramientos y gobierno' },
      { nombre: 'Edward E. "Ned" Guillet', cargo: 'Consejero', tipo: 'Independiente', desde: '2007', comisiones: 'Remuneraciones; Nombramientos y gobierno (presidente)' },
      { nombre: 'Cherylyn Harley LeBon', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Remuneraciones' },
      { nombre: 'Carl D. Sparks', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría; Ejecutiva' },
      { nombre: 'Daniel L. Florness', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 95.3, voto_remuneracion_contra_pct: 4.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 9.76, fijo: 1.17, variable_corto: 3.10, variable_largo: 5.30, ratio_salario_medio: 130 },
    remuneracion: 'El variable anual del consejero delegado (objetivo del 160 % del salario, máximo del doble) se paga sobre EBITDA (20 %), EBIT (20 %), margen EBIT (30 %) y flujo operativo sobre ventas (30 %), contra el presupuesto ajustado; en 2025 se logró el 103 % y se pagó el 160 % del objetivo (3,10 M USD) [1]. El variable a largo plazo (5,30 M) son acciones restringidas y PSU a tres años ligadas a la caja libre ajustada por acción y a la mejora del ROIC (50 % cada una), con un modificador por rentabilidad frente al S&P 500 y un suplemento ESG; los PSU 2023-2025 pagaron el 139,5 % [1]. Las métricas premian rentabilidad y caja, no tamaño. Hay cláusula de recuperación. El voto consultivo sobre remuneración logró un 95,3 % a favor en 2026 y más del 95 % en 2025 [2, 1]. La retribución total objetivo está entre los percentiles 25 y 50 de su grupo de comparación [1].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.39, tipo: 'Institucional (Schedule 13G)', variacion: '13G de 31-oct-2025' },
      { nombre: 'Consejeros y directivos (35 personas)', pct: 0.27, tipo: 'Insiders', variacion: '690.838 acciones a marzo de 2026; +50.000 del consejero delegado en mayo' },
      { nombre: 'Autocartera', pct: 0.02, tipo: 'Autocartera', variacion: '46.348 acciones; las recompras se amortizan' },
    ],
    insiders: [
      { fecha: '2026-05-12', persona: 'Ronald J. Mittelstaedt (consejero delegado)', operacion: 'Compra', acciones: 50000, importe: 7.61 },
      { fecha: '2026-06-05', persona: 'Patrick J. Shea (secretario general)', operacion: 'Venta', acciones: 7500, importe: 1.17 },
      { fecha: '2025-10-28', persona: 'Edward E. Guillet (consejero)', operacion: 'Venta', acciones: 9000, importe: 1.57 },
      { fecha: '2026-04-30', persona: 'Eric Hansen (director de sistemas)', operacion: 'Venta', acciones: 6000, importe: 0.99 },
      { fecha: '2026-07-28', persona: 'Robert M. Cloninger (vicesecretario general)', operacion: 'Venta', acciones: 2811, importe: 0.48 },
      { fecha: '2026-08-18', persona: 'Philip Rivard (desarrollo de negocio)', operacion: 'Venta', acciones: 2500, importe: 0.42 },
      { fecha: '2026-04-27', persona: 'James M. Little (ingeniería y eliminación)', operacion: 'Venta', acciones: 2605, importe: 0.43 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor es Vanguard con el 12,4 %, como inversor pasivo [1]. Una sola clase de acciones, una acción un voto; la sociedad es de Ontario (Canadá), con derecho de sociedades canadiense y cotización en NYSE y TSX. El presidente del consejo es independiente desde 2019 y no hay consejero coordinador porque no hace falta. Sin operaciones vinculadas relevantes. Los consejeros deben tener acciones por cinco veces su retribución en efectivo [1]. El punto débil es la permanencia: el presidente lleva 28 años en el consejo y otro consejero 19, y la presidenta de la comisión de remuneraciones obtuvo solo un 66 % de votos a favor en 2026 (33,6 % de abstenciones) tras faltar a las reuniones de julio de 2025 [2, 1].',
    alertas: ['La presidenta de la comisión de remuneraciones (Susan Lee) recibió un 33,6 % de votos en contra o abstenciones en la junta de mayo de 2026 [2].', 'Sin sucesor designado para el fundador y consejero delegado, que volvió al cargo en 2023 [1].', 'Litigios ambientales de Chiquita Canyon sin estimación de pérdida (≈12.730 demandantes; sanciones de SCAQMD pendientes).'],
    confianza: 'Alta',
  },
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de WCN, ^GSPC y XLI (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/WCN/history' },
  { id: 2, titulo: 'WCN: estimaciones de ingresos y BPA, objetivo de precio y recomendaciones (S&P Global)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/wcn/forecast/' },
  { id: 3, titulo: 'WCN: key statistics (capitalización, acciones, posición corta)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/wcn/statistics/' },
  { id: 4, titulo: 'WCN EPS estimates 2027-2028 (16 y 5 analistas)', editor: 'TickFlow', tipo: 'Datos de mercado', fecha: '2026-08-01', url: 'https://www.tickflow.io/stock/WCN/forecast' },
  { id: 5, titulo: 'Waste Management: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/wm/forecast/' },
  { id: 6, titulo: 'Republic Services: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rsg/forecast/' },
  { id: 7, titulo: 'GFL Environmental: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/gfl/forecast/' },
  { id: 8, titulo: 'Casella Waste Systems: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/cwst/forecast/' },
  { id: 9, titulo: 'Clean Harbors: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/clh/forecast/' },
  { id: 10, titulo: 'Veolia Environnement (EPA:VIE): key statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/epa/VIE/statistics/' },
  { id: 11, titulo: 'Republic Services to acquire US Ecology (8-K, Exhibit 99.1: 2.200 M de valor; EBITDA ajustado LTM 156 M)', editor: 'Republic Services (SEC)', tipo: 'Primaria', fecha: '2022-02-09', url: 'https://www.sec.gov/Archives/edgar/data/1060391/000119312522031959/d290172dex991.htm' },
  { id: 12, titulo: 'WM to acquire Stericycle for 7.2 billion (8-K)', editor: 'Waste Management (SEC)', tipo: 'Primaria', fecha: '2024-06-03', url: 'https://www.sec.gov/Archives/edgar/data/823768/000110465924068410/tm2416276d1_ex99-1.htm' },
  { id: 13, titulo: 'GFL announces agreement to sell Environmental Services business valued at 8.0 billion', editor: 'GFL Environmental (SEC 6-K)', tipo: 'Primaria', fecha: '2025-01-07', url: 'https://www.sec.gov/Archives/edgar/data/1780232/000110465925001513/tm252025d1_ex99-1.htm' },
  { id: 14, titulo: 'Blackstone and EQT to acquire Spanish waste business Urbaser for 5.6bn (≈11 veces EBITDA 2025)', editor: 'PE Hub', tipo: 'Prensa', fecha: '2025', url: 'https://www.pehub.com/blackstone-and-eqt-to-acquire-spanish-waste-business-urbaser-in-e5-6bn-deal/' },
  { id: 15, titulo: 'SECURE announces 1.075 billion asset sale to Waste Connections', editor: 'Secure Energy', tipo: 'Primaria', fecha: '2023-12-11', url: 'https://secure-energy.mediaroom.com/2023-12-11-SECURE-Announces-1-075-Billion-Asset-Sale-to-Waste-Connections' },
  { id: 16, titulo: 'Rentabilidad del bono del Tesoro de EE. UU. a 10 años (DGS10)', editor: 'FRED, Banco de la Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 17, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 18, titulo: 'Tipos de cambio de referencia del euro (14-oct-2026: 1,1195 USD; 1,5918 CAD)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 19, titulo: 'Waste Connections: anuncio de la fecha de resultados del 3T26 (21-oct-2026)', editor: 'Waste Connections, Inc.', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://s21.q4cdn.com/540990023/files/doc_news/2026/Sep/30/WCN-Q3-2026-Earnings-Call-Announcement.pdf' },
  { id: 20, titulo: 'Form 8-K: renovación de la NCIB (251.569.244 acciones a 31-jul-2026)', editor: 'Waste Connections, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-07', url: EDGAR + '000110465926092680/tm2622609d1_ex99-1.htm' },
];
const c = (nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct) =>
  ({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct });
const comps = [
  c('Waste Management', 'WM', 'US', 85820, 4.19, 13.8, 24.9, 4.8, 30.3, 11.6, 2.9, 4.2),
  c('Republic Services', 'RSG', 'US', 68510, 4.83, 15.5, 28.8, 4.6, 31.1, 11.1, 2.7, 3.9),
  c('GFL Environmental', 'GFL', 'CA', 15390, 4.60, 19.1, 60.8, null, 24.0, 2.4, 5.9, 1.0),
  c('Casella Waste Systems', 'CWST', 'US', 5190, 3.50, 16.3, 69.5, 10.9, 21.4, 2.1, 3.4, 2.0),
  c('Clean Harbors', 'CLH', 'US', 16920, 3.12, 16.3, 31.2, 7.0, 19.2, 9.9, 2.3, 2.8),
  c('Veolia Environnement', 'VIE', 'FR', Math.round(23500 * EURUSD), 1.13, 7.8, 12.6, null, 13.0, 4.9, 4.2, 9.4),
];
const cierres = Object.fromEntries(BO.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const D = {
  _estado: 'Completo salvo EBITDA de consenso de 2027 y EV/EBITDA de los próximos 12 meses de los comparables (sin fuente gratuita fiable).',
  identificacion: {
    nombre: 'Waste Connections, Inc.', nombre_corto: 'Waste Connections', ticker: 'WCN', isin: 'CA94106B1013', mercado: 'NYSE (también TSX)', indice_referencia: 'S&P 500',
    pais: 'Canadá (sede legal; el 86 % del negocio está en EE. UU.)', pais_iso: 'CA', sector: 'Industria', industria: 'Servicios medioambientales y de instalaciones', sede: 'Woodbridge (Ontario, Canadá) y The Woodlands (Texas, EE. UU.)', fundacion: '1997', empleados: 25000, web: 'https://www.wasteconnections.com',
    precio: BO.identificacion.precio, fecha_precio: BO.identificacion.fecha_precio, acciones: 252.0, capitalizacion_publicada: 39180, free_float_pct: 99.7,
    max_52s: BO.identificacion.max_52s, min_52s: BO.identificacion.min_52s, volumen_medio_diario: '≈ 207 M USD/día en NYSE (1,28 M de acciones; 3 meses)', proximos_resultados: '2026-10-21',
  },
  consenso: {
    guidance: 'Guía de 2026 (22-jul-2026, elevada desde febrero): ingresos de 10.020-10.050 M, EBITDA ajustado de 3.330-3.340 M (margen del 33,2-33,3 %), beneficio neto de 1.169-1.173 M, capex de ≈1.250 M y caja libre ajustada de 1.400-1.450 M; excluye compras futuras (nota de resultados del 2T26). Para 2027 la dirección solo anticipa «crecimiento de dos dígitos de la caja libre por acción», con menos salidas por Chiquita Canyon y la aportación de las plantas de gas renovable. Resultados del 3T26 el 21-oct-2026 tras el cierre [19].',
    estimaciones: [
      { periodo: '2026e', ingresos: 10050, ebitda: 3335, ebit: null, bpa: 5.65, dpa: 1.40, fuente: 'Stock Analysis (S&P Global, 26 analistas); EBITDA = punto medio de la guía [2]' },
      { periodo: '2027e', ingresos: 10620, ebitda: null, ebit: null, bpa: 6.21, dpa: null, fuente: 'Stock Analysis (S&P Global) [2]; TickFlow 6,19 (16 analistas, 1-ago) [4]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 6.83, dpa: null, fuente: 'TickFlow (5 analistas, 1-ago-2026) [4]' },
    ],
    recomendaciones: { n_analistas: 28, comprar: 25, mantener: 3, vender: 0, po_medio: 197.4, po_min: 162, po_max: 220 },
    revisiones: 'BPA ajustado de consenso: 5,45 USD para 2026 a finales de marzo y 5,65 USD hoy, tras dos trimestres por encima de lo esperado (1T26 1,23 USD frente a 1,18; 2T26 1,50 frente a 1,35) [2]. El de 2027 está en 6,19-6,21 USD. Una sola fuente da estimaciones completas (S&P Global vía Stock Analysis); TickFlow las confirma a 1-ago. El objetivo medio de 197,4 USD está un 28 % por encima del precio y no ha seguido la caída de la acción desde agosto.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.7,
    confianza: 'Media',
  },
  bolsa: {
    ...BO.bolsa, posicion_corta_pct: 1.56,
    comentario: 'La acción ha ido muy por detrás del mercado: −10,9 % en un año frente al +17,5 % del S&P 500 y +3,3 % anual en cinco años frente al +12,0 % [1]. Tres causas: la subida del bono a 10 años al 5,2 %, que castiga a los valores defensivos de PER alto; volúmenes negativos tres años seguidos; y Chiquita Canyon (8,2 % de caída el 12-feb-2026 con la guía de 2026, que llevaba más gasto de cierre) [1]. La caída máxima de cinco años, −24,9 %, va de abril de 2025 a mayo de 2026. Tras un rebote a 170 USD en agosto, ha vuelto a 154 USD. Beta mensual de cinco años de 0,46 (0,64 ajustada) [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((anio) => ({ anio, precio_cierre: cierres[anio], ev_ebitda_ntm: null, per_ntm: null, excluir: anio === '2020' })),
    comentario: 'El motor calcula el PER y el EV/EBITDA sobre cifras contables, que en 2020 (deterioro de 467 M) y 2024 (613 M) salen distorsionados; 2020 queda excluido. En la base que usa el mercado (BPA ajustado), WCN cotizó entre 31 y 36 veces el BPA del año siguiente en 2019-2025 (mediana de cinco años de 31,6 veces) y hoy cotiza a 25,8 veces nuestro BPA de 2027: un descuento del 18 %. La causa es estructural en parte: el bono a 10 años está en el 5,2 % frente al 1,5-4,0 % de 2019-2024, y los volúmenes caen; pero el crecimiento del BPA ajustado (9-10 % anual) no ha cambiado [1, 2].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Las cuatro cotizadas de residuos sólidos de Norteamérica (WM, Republic, GFL y Casella), más Clean Harbors (residuos industriales y peligrosos, competidor en E&P) y Veolia (residuos y agua en Europa, el único grande no norteamericano). Todos con Stock Analysis a 14-oct-2026 [5-10]; PER de los próximos 12 meses = «forward PE» de Stock Analysis (BPA ajustado de consenso); crecimiento = ingresos del año siguiente de consenso. GFL y Casella tienen PER de 60-70 veces por su beneficio deprimido por amortizaciones de compras; Veolia cotiza a múltiplos de utility europea. No hay EV/EBITDA de los próximos 12 meses gratuito con la misma definición, así que queda vacío.',
    empresas: comps,
    comentario: 'WCN cotiza a 15,5 veces el EBITDA de los últimos 12 meses (Stock Analysis), en línea con Republic (15,5) y por encima de WM (13,8), con el margen EBITDA más alto (33 % ajustado) y menos crecimiento por volumen que Casella. En PER de los próximos 12 meses (26,7 veces en Stock Analysis) está entre WM (24,9) y Republic (28,8), pero su BPA ajustado excluye la amortización de intangibles comprados y el de WM y Republic no: en la misma base estaría unas 2,5 veces más caro. La mediana de PER de los seis comparables es de 30,0 veces, inflada por GFL y Casella; la de WM, Republic y Clean Harbors es de 28,8.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-02', objetivo: 'US Ecology', comprador: 'Republic Services', ev: 2200, ev_ventas: 2.27, ev_ebitda: 14.1, prima_pct: 70, excluir: false, comentario: '2.200 M con 700 M de deuda; EBITDA ajustado LTM a sep-21 de 156 M e ingresos de 968 M [11]. Residuos industriales y peligrosos.' },
      { fecha: '2025-01', objetivo: 'Urbaser (España)', comprador: 'Blackstone y EQT', ev: Math.round(5600 * EURUSD), ev_ventas: null, ev_ebitda: 11.0, prima_pct: null, excluir: false, comentario: '5.600 M EUR, ≈11 veces el EBITDA de 2025 según la prensa [14]. Residuos municipales en Europa.' },
      { fecha: '2025-01', objetivo: 'Environmental Services de GFL', comprador: 'Apollo y BC Partners', ev: 8000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '8.000 M CAD de valor empresa; el comprador habla de más de 500 M CAD de EBITDA ajustado, lo que da como mucho 16 veces (cálculo propio) [13].' },
      { fecha: '2024-06', objetivo: 'Stericycle', comprador: 'Waste Management', ev: 7200, ev_ventas: null, ev_ebitda: null, prima_pct: 24, excluir: false, comentario: '62 USD por acción, 7.200 M con 1.400 M de deuda; prima del 24 % sobre la media de 60 días; sin múltiplo publicado [12].' },
      { fecha: '2023-12', objetivo: '30 plantas de residuos de petróleo y gas de Secure Energy', comprador: 'Waste Connections', ev: Math.round(1075 / 1.36), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.075 M CAD, desinversión ordenada por el Tribunal de la Competencia; sin múltiplo publicado [15].' },
    ],
    comentario: 'Las operaciones grandes del sector se pagan a 11-16 veces el EBITDA (US Ecology 14,1; Urbaser ≈11; GFL Environmental Services ≤16), cerca del múltiplo al que cotiza WCN (15,5 veces). Las compras pequeñas que hace la propia WCN se pagan menos (8-12 veces según la dirección, no auditado). WCN no es objetivo verosímil de una opa: con 48.000 M de valor empresa solo WM o Republic podrían comprarla, y la competencia lo impediría. Solo dos operaciones tienen múltiplo publicado, por debajo del mínimo de tres: no las ponderamos.',
    confianza: 'Baja',
  },
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: canal RSS de WCN (análisis y noticias, julio-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://seekingalpha.com/api/sa/combined/WCN.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $WCN (julio-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://api.stocktwits.com/api/2/streams/symbol/WCN.json' },
  { id: 3, titulo: 'Seeking Alpha: «Waste Connections: A Little Expensive To Own Trash Right Now»', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://seekingalpha.com/article/4953586-waste-connections-a-little-expensive-to-own-trash-right-now' },
  { id: 4, titulo: 'Seeking Alpha: «Better Margins, But Volume Trend Is Still Weak» y «The Market Is Overpricing Temporary Headwinds»', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-26', url: 'https://seekingalpha.com/article/4925662-waste-connections-stock-better-margins-but-volume-trend-weak' },
];
const E = {
  _estado: 'Hecho con lo que abre: RSS de Seeking Alpha y API de Stocktwits; Reddit y Stockhouse dan 403 y el texto de los artículos de Seeking Alpha está tras muro.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-10', n_comentarios: 6, tono: 'Dividido', resumen: 'Seis análisis en tres meses: dos alcistas tras el 2T26 («el mercado sobrevalora vientos en contra temporales», «crecimiento moderado convertido en rentabilidad excepcional») y dos prudentes («mejores márgenes pero volumen débil», «algo cara para ser basura», 12-oct) [1, 3, 4].' },
      { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-07', n_comentarios: 8, tono: 'Positivo', resumen: 'Titulares de batir previsiones y subir la guía en el 2T26 y elogios de analistas tras resultados [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Neutro', resumen: 'Poco debate: señales técnicas, opciones y avisos del acuerdo de 1,4 M USD por recargos de combustible a clientes comerciales; algún mensaje de compra en la zona de 148-150 USD [2].' },
    ],
    temas: [
      { tema: 'Valoración: ¿barata o aún cara?', postura: 'Dividida', peso: 'Alto', contraste: 'A 25,8 veces nuestro BPA de 2027 cotiza un 18 % por debajo de su mediana de cinco años, pero a un PER más alto que WM con el bono al 5,2 %. Los dos lados tienen parte de razón.' },
      { tema: 'Volumen negativo frente a precio', postura: 'Bajista', peso: 'Alto', contraste: 'Volumen −1,7 % en el 1S26 con precio core del 5,8 %: el diferencial sigue a favor, pero la empresa crece menos que en 2021-2024 [A3].' },
      { tema: 'Recargos de combustible y demandas de clientes', postura: 'Bajista', peso: 'Bajo', contraste: 'El acuerdo es de 1,4 M USD, inmaterial; el riesgo real es la pérdida de clientes ante los recargos (10-15 pb de volumen según la dirección) [A9].' },
      { tema: 'Recompras y compra del consejero delegado', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 692 M recomprados hasta julio y 7,6 M USD comprados por el consejero delegado a 152 USD [A3, C3].' },
    ],
    lectura: 'El sentimiento no es extremo: ni capitulación ni euforia. Los particulares están más fríos que los analistas (25 de 28 recomiendan comprar con un objetivo medio de 197 USD), y la discusión gira sobre si el múltiplo puede volver a 30 veces con el bono al 5,2 %. Ningún foro señala un riesgo que el informe no recoja; casi nadie habla de Chiquita Canyon, que es el riesgo binario.',
    confianza: 'Baja',
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas.');
