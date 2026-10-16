// Escribe las notas A-E de Asia Vital Components (AVC, 3017.TW, corte 2026-10-16) a partir de:
// estados financieros consolidados NIIF de MOPS (API pública, notas/docs/mops; extraídos con notas/extraer-mops.py
// a notas/cuentas-mops.json), ventas mensuales, resúmenes de las conferencias, bolsa.mjs, Yahoo Finance (consenso y
// comparables), votaciones N-PX de la SEC, prensa taiwanesa y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/avc-2026-10-16/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const CM = lee('cuentas-mops.json');
const BOLSA = lee('bolsa.json');
const Y = { ...lee('docs/yahoo-comps.json'), ...lee('docs/yahoo-comps2.json') };
const r = (x, n = 1) => (x == null ? null : Math.round(x * 10 ** n) / 10 ** n);
const sinGuion = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')));
const MOPS = 'https://mops.twse.com.tw/mops/#/web/t164sb04';
const MOPS_API = 'https://mops.twse.com.tw/mops/api/t164sb04?'; // API JSON de MOPS (POST con estos parámetros; t164sb03 balance y t164sb05 flujos, iguales)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Estados financieros consolidados NIIF 2025 y 2024 (cuenta de resultados, balance y flujos de efectivo), 奇鋐科技 (3017)', editor: 'MOPS, Bolsa de Taiwán (TWSE)', tipo: 'Primaria', fecha: '2026-03-12', url: MOPS_API + 'companyId=3017&year=114&season=4' },
  { id: 2, titulo: 'Estados financieros consolidados NIIF 2023 y 2022 (reexpresados en el informe de 2023)', editor: 'MOPS, TWSE', tipo: 'Primaria', fecha: '2024-03-13', url: MOPS_API + 'companyId=3017&year=112&season=4' },
  { id: 3, titulo: 'Estados financieros consolidados NIIF 2021 y 2020 (2020 reexpresado en el informe de 2021)', editor: 'MOPS, TWSE', tipo: 'Primaria', fecha: '2022-03-15', url: MOPS_API + 'companyId=3017&year=110&season=4' },
  { id: 4, titulo: 'Estados financieros consolidados NIIF del 2T26 (a 30-jun-2026; balance, cuenta trimestral y del semestre, flujos del semestre)', editor: 'MOPS, TWSE', tipo: 'Primaria', fecha: '2026-08-12', url: MOPS_API + 'companyId=3017&year=115&season=2' },
  { id: 5, titulo: 'Estados financieros consolidados NIIF trimestrales 1T24-1T26 (acumulados de 3, 6 y 9 meses)', editor: 'MOPS, TWSE', tipo: 'Primaria', fecha: '2026-05-14', url: MOPS_API + 'companyId=3017&year=115&season=1' },
  { id: 6, titulo: 'AVC (3017) publica las ventas de septiembre de 2026: 21.018 M TWD; 157.248 M en enero-septiembre (+71,2 %)', editor: 'TechNews', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://finance.technews.tw/2026/10/07/avc-3017-202609-financial-report/' },
  { id: 7, titulo: 'Resumen de la conferencia de resultados del 2T26 (12-ago-2026): mezcla de producto, días de inventario, capex, guía', editor: 'Fugle Research', tipo: 'Analistas', fecha: '2026-08-12', url: 'https://blog.fugle.tw/post/earnings-call-3017-2026-08-12' },
  { id: 8, titulo: 'AVC: el beneficio del primer semestre se duplica (BPA 44,54 TWD); capacidad de placas frías y colectores; capex 2026 y 2027', editor: 'Uanalyze (con Cnyes)', tipo: 'Prensa', fecha: '2026-08-12', url: 'https://uanalyze.com.tw/articles/5815653290' },
  { id: 9, titulo: 'Histórico de dividendos de 奇鋐 (3017) por ejercicio', editor: 'HiStock', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://histock.tw/stock/3017/%E9%99%A4%E6%AC%8A%E9%99%A4%E6%81%AF' },
  { id: 10, titulo: 'Conferencia del 1T26 (14-may-2026): ventas 49.038 M TWD, margen bruto 29,77 %, BPA 20,17 TWD', editor: 'SinoPac Securities (Richclub)', tipo: 'Prensa', fecha: '2026-05-15', url: 'https://www.sinotrade.com.tw/richclub/hotstock/%E5%A5%87%E9%8B%90-3017-%E5%81%9A%E4%BB%80%E9%BA%BC-%E6%B3%95%E8%AA%AA%E6%9C%89%E4%BD%95%E9%87%8D%E9%BB%9E-%E9%A6%96%E5%AD%A3EPS%E5%89%B5%E6%AD%B7%E5%8F%B2%E6%96%B0%E9%AB%98%E9%81%9420-17%E5%85%83-6a059014998cb6188cb1bdb7' },
  { id: 11, titulo: 'AVC y Fositek, registradas por el Buró de Investigación (MJIB) por la salida a bolsa de Fositek en 2023', editor: 'Liberty Times (LTN)', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://ec.ltn.com.tw/article/breakingnews/5598978' },
  { id: 12, titulo: 'Ficha de AVC en Yahoo股市: acciones emitidas (392,67 M), auditor (EY Taiwán), dividendo 2025, BPA trimestrales', editor: 'Yahoo股市 (datos de TWSE y SysJust)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tw.stock.yahoo.com/quote/3017.TW/profile' },
];

const cuenta = CM.cuenta.map(sinGuion);
const balance = CM.balance.map(sinGuion);
const flujos = CM.flujos.map(sinGuion);
const T = Object.fromEntries(CM.trimestres.map((t) => [t.periodo, t]));
const trimItem = (p, pAnt) => {
  const t = T[p], a = T[pAnt];
  const ebitda = t.ebit + t.da;
  return { periodo: p, ingresos: t.ingresos, crecimiento_pct: r((t.ingresos / a.ingresos - 1) * 100), crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r((ebitda / t.ingresos) * 100), bpa: t.bpa, vs_consenso: null };
};

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 184871, ebitda: 47500, ebit: 43597, beneficio_neto: 29458, bpa: 73.89, dpa: 20.88, dpa_extraordinario: 0, fcf: 36737, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 39.666 M TWD en 2020 a 139.639 M en 2025 (×3,5) y el resultado operativo de 3.280 M a 27.556 M (×8,4) [1, 3]. Hasta 2023 AVC era un fabricante de ventiladores, disipadores y cámaras de vapor para portátiles, PC y servidores, con margen operativo del 8-13 % [2, 3]. La IA lo cambió: en 2024 las ventas crecieron un 21 % y en 2025 un 95 %, con el margen operativo del 12,5 % de 2023 al 19,7 % de 2025 por mezcla (placas frías, colectores y chasis para servidores de IA) y apalancamiento operativo: los gastos comerciales, generales y de I+D crecieron un 35 % con las ventas un 95 % [1]. El crecimiento es orgánico: no hay compras relevantes en el periodo [1-3]. El 1S26 dio ventas de 98.159 M (+85,5 %) y margen operativo del 26,0 %; el 2T26, 49.121 M (+0,2 % sobre el 1T por la transición de GB300 a Vera Rubin) con margen bruto del 32,6 % y operativo del 27,4 %, máximos históricos [4, 7]. Las ventas de julio-septiembre suman 59.089 M (+20 % sobre el 2T) [6].',
    ajustes: 'Cifras publicadas NIIF (Taiwán), sin ajustes. El BPA es el diluido, que en Taiwán incluye las acciones que se entregarían por la retribución variable de los empleados: en 2025 el básico fue 49,17 TWD y el diluido 48,24 [1]. No hay deterioros ni reestructuraciones relevantes dentro del resultado operativo: los deterioros de activos no financieros fueron de 109 M en 2025 y 135 M en 2024, y las pérdidas por bajas de inmovilizado de 384 M y 257 M [1]. El resultado financiero neto (+1.231 M en 2025) lleva intereses de la caja, otros ingresos y diferencias de cambio; se repite cada año, aunque las diferencias de cambio con el dólar lo hacen volátil [1]. Los minoritarios (1.764 M en 2025, 8,4 % del beneficio total) son sobre todo los socios externos de Fositek (6805.TW), filial cotizada consolidada de la que AVC tiene una participación pequeña [1, 12].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [trimItem('3T24', '3T23'), trimItem('4T24', '4T23'), trimItem('1T25', '1T24'), trimItem('2T25', '2T24'), trimItem('3T25', '3T24'), trimItem('4T25', '4T24'), trimItem('1T26', '1T25'), trimItem('2T26', '2T25')],
    ultima_presentacion: 'En la conferencia del 14-may (1T26: ventas 49.038 M TWD, margen bruto 29,77 %, BPA 20,17 TWD) la dirección repitió que 2026 crecería trimestre a trimestre y que el segundo semestre sería mejor que el primero, con más proyectos de chips propios de los clientes (ASIC) pasando a refrigeración líquida [10]. Llegó tras dos días de caída por el rumor de un problema con el material de interfaz térmica de Vera Rubin, que la empresa desmintió como estimación de terceros [10]. En la del 12-ago (2T26) el discurso cambió de «crecimiento» a «rentabilidad»: margen bruto del 32,57 % y operativo del 27,44 %, prioridad de la rentabilidad sobre las ventas, automatización para defender el margen y ningún plan de ampliar capital [7, 8]. Dio más detalle de capacidad: un millón de placas frías al mes y unos 7.000 colectores de rack al mes (para 3.000-4.000 racks), con un 50 % más de capacidad líquida en 2027 y un capex de unos 15.000 M TWD en 2026, mayor en 2027, sobre todo en Vietnam [7, 8]. Los analistas preguntaron por la cuota en Vera Rubin y por el BPA de 2027 (alguno citó 150 TWD): la dirección no dio cuotas, márgenes por producto ni cifras de beneficio [7]. Dijo que el 2026 es el «año uno» de los ASIC y que en 2027 sus ventas superarán a las de GPU [7].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja y equivalentes de 77.715 M TWD y depósitos a plazo de 687 M a 30-jun-2026, frente a una deuda financiera de 25.362 M (17.628 M de préstamos a corto y 7.735 M a largo) y arrendamientos de 2.374 M: caja neta de unos 50.700 M antes del dividendo de 8.199 M pagado el 23-sep [4, 12].',
    rating: 'Sin rating público',
    coste_deuda_pct: 3.0,
    vida_media_anios: null,
    otros_pasivos: 'El pasivo corriente (118.878 M TWD a 30-jun-2026) es sobre todo comercial: proveedores y efectos a pagar 53.027 M, otras cuentas a pagar 26.282 M (incluye el dividendo de 2025 acordado en la junta del 2-jun y pagado en septiembre, y la retribución variable de empleados y consejeros), impuestos 7.303 M y otros pasivos corrientes 14.209 M, cuya variación figura en el flujo de explotación [4]. Sin pensiones relevantes (plan de aportación definida en Taiwán). El bono convertible de 2.400 M se amortizó en 2025 [1]. Sin litigios materiales publicados; el 7-oct-2026 el Buró de Investigación registró las oficinas de Xinzhuang por la salida a bolsa de Fositek en 2023, sin efecto en las cuentas según la empresa [11].',
    comentario: 'El circulante comercial (existencias + clientes − proveedores) bajó del 17,1 % de las ventas en 2024 al 9,7 % en 2025 y al 7,8 % de las ventas de los últimos doce meses en junio de 2026: las existencias se dispararon (de 17.235 M en 2023 a 57.874 M en junio de 2026, materiales para los programas de IA) pero los proveedores crecieron igual [1, 4]. Los días de inventario bajaron de 174 a 145 en un año [7]. La deuda bruta subió de 12.934 M a 25.362 M para financiar existencias y capex, pero la caja creció más: AVC tiene caja neta de unos 50.700 M (42.500 M después del dividendo de septiembre) [4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo de explotación fue de 39.415 M TWD en 2025 frente a 9.632 M en 2024: en 2024 las existencias absorbieron 17.917 M; en 2025 volvieron a subir 19.662 M, pero proveedores (+19.226 M), otras cuentas a pagar y otros pasivos (+12.210 M) lo compensaron [1]. En el 1S26 dio 26.291 M y el flujo libre que publica la empresa, 19.179 M [4, 7]. El capex de esta nota suma inmovilizado material, intangibles, derechos de uso y el aumento de «otros activos no corrientes» (anticipos de maquinaria y terrenos: 4.754 M en 2025 y 4.163 M en el 1S26), porque es inversión ya comprometida: 12.397 M en 2025 (8,9 % de las ventas) y 11.360 M en el 1S26; la guía de la empresa es de unos 15.000 M de inversión en 2026, más en 2027, sobre todo en Vietnam [1, 4, 7]. Estimación propia: el mantenimiento es del orden de la amortización (2,3 % de las ventas en 2025) y el resto es crecimiento.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY Taiwán (安永聯合會計師事務所)',
    anios_auditor: null,
    opinion: 'Favorable (sin salvedades publicadas)',
    comentario: 'Las cuentas son NIIF de Taiwán, auditadas por EY [12]. No hay capitalización de I+D relevante: los intangibles son 243 M TWD y el gasto de I+D (5.392 M en 2025, 3,9 % de las ventas) va a resultados [1, 4]. La remuneración en acciones es pequeña (161 M en 2025) [1]. El reconocimiento de ingresos es de venta de producto a la entrega; sin pasivos por contratos relevantes (61 M). Dos puntos que vigilar: (1) las existencias se han triplicado en dos años (57.874 M en junio de 2026, 145 días) y un cambio de plataforma (GB300 a Vera Rubin) puede dejar material obsoleto; (2) el registro del Buró de Investigación del 7-oct-2026, que la empresa limita a la salida a bolsa de Fositek en 2023 y a empleados concretos [4, 7, 11]. La conversión de beneficio en caja es buena en 2025 (flujo de explotación 39.415 M frente a beneficio total 20.951 M) y débil en 2024 (9.632 M frente a 9.193 M) por las existencias [1].',
    senales: [
      { senal: 'Existencias triplicadas en dos años (17.235 M en 2023 → 57.874 M en jun-26)', nivel: 'Media', comentario: 'Acompañan a las ventas (días de 174 a 145) y a proveedores, pero un cambio de diseño de Nvidia puede dejar material obsoleto [4, 7].' },
      { senal: 'Registro del Buró de Investigación (MJIB) el 7-oct-2026 por la salida a bolsa de Fositek en 2023', nivel: 'Media', comentario: 'La empresa dice que afecta a empleados concretos y no a su operativa; sin imputaciones públicas a la fecha de corte [11].' },
      { senal: 'Minoritarios grandes a valor de mercado (Fositek)', nivel: 'Baja', comentario: 'AVC consolida el 100 % de Fositek con una participación directa de en torno al 17 %: el beneficio y el EBITDA del grupo incluyen una parte que es de otros accionistas [1, 12].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'AVC reparte en efectivo, una vez al año, en torno al 40-50 % del beneficio: 20,88 TWD por acción con cargo a 2025 (43 % del BPA diluido), pagados el 23-sep-2026, frente a 9,93 con cargo a 2024 y 6,96 con cargo a 2023 [9, 12]. No hay recompras. Amplió capital en febrero de 2023 (30 M de acciones, 2.850 M TWD) para financiar la expansión y no prevé más financiación [1, 7]. La prioridad declarada para la caja es la capacidad líquida en Vietnam y Taiwán (capex de unos 15.000 M en 2026, más en 2027) [7].',
    adquisiciones: [],
    comentario: 'Asignación de capital sencilla y bien ejecutada: crecimiento orgánico, capex al ritmo de los pedidos y dividendo creciente, con caja neta. El capital invertido operativo es pequeño frente al resultado (ROIC muy alto) porque los proveedores financian casi todo el circulante [1, 4]. La única dilución reciente fue la ampliación de 2023 (8,5 % del capital) y las opciones de empleados; la salida a bolsa de Fositek en 2023 dejó la filial con mayoría de socios externos, que hoy valen en bolsa más de 120.000 M TWD [1, 12].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Servidores y redes sobre las ventas', valor_anterior: '48,41 % (1S25)', valor_actual: '66,14 % (1S26)', variacion: '+17,7 pp', comentario: 'Ventas de servidores y redes de 64.919 M en el 1S26 (+153 %) [7].' },
      { kpi: 'Productos térmicos sobre las ventas', valor_anterior: 'n.d.', valor_actual: '62,98 % (1S26)', variacion: '+96 % interanual', comentario: 'Chasis 20,44 % (+134 %); térmico + chasis = 83,4 % [7].' },
      { kpi: 'Refrigeración líquida sobre las ventas', valor_anterior: '≈15 % (2025)', valor_actual: '30-40 % (previsión 2026)', variacion: '≈×2', comentario: 'Estimación de la empresa recogida por la prensa [8].' },
      { kpi: 'Capacidad de placas frías', valor_anterior: 'n.d.', valor_actual: '≈1 M/mes (ago-26)', variacion: '+50 % en 2027', comentario: 'Colectores de rack: ≈7.000/mes, para 3.000-4.000 racks [8].' },
      { kpi: 'Días de inventario', valor_anterior: '174 (jun-25)', valor_actual: '145 (jun-26)', variacion: '−29 días', comentario: 'Mejora por rotación pese a la tensión de materiales [7].' },
      { kpi: 'Margen bruto trimestral', valor_anterior: '24,41 % (2T25)', valor_actual: '32,57 % (2T26)', variacion: '+8,2 pp', comentario: 'Máximo histórico [4, 7].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos', tipo: 'Complemento', intentos: '1) Informe anual 2025 en inglés en el servidor de documentos de la TWSE (doc.twse.com.tw): bloqueado por seguridad desde la nube; 2) notas de segmentos en la API de MOPS y en la web de AVC (avc.co, protegida por Incapsula); 3) prensa y resúmenes de conferencias: solo la mezcla del 1S26 (térmico 62,98 %, chasis 20,44 %, servidores 66,14 %), sin cinco años', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) Nota de información geográfica del informe anual (doc.twse.com.tw bloqueado); 2) MOPS y avc.co (bloqueados); 3) prensa: sin cifras por país', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de préstamos del informe anual (bloqueado); 2) MOPS (solo balance resumido: 17.628 M a corto y 7.735 M a largo); 3) prensa: sin calendario', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'AI build-out to propel data center physical infrastructure market to $63.1 billion by 2029 (gestión térmica +19 % anual; refrigeración líquida directa de 1.100 M USD en 2024 a 5.800 M en 2029)', editor: "Dell'Oro Group", tipo: 'Sectorial', fecha: '2025-08-14', url: 'https://www.delloro.com/news/ai-build-out-to-propel-data-center-physical-infrastructure-market-to-63-1-billion-by-2029/' },
  { id: 2, titulo: 'Data center liquid cooling market to approach $7 billion by 2029 as AI deployments accelerate', editor: "Dell'Oro Group", tipo: 'Sectorial', fecha: '2026-01', url: 'https://www.delloro.com/news/data-center-liquid-cooling-market-to-approach-7-billion-by-2029-as-ai-deployments-accelerate/' },
  { id: 3, titulo: 'Data centre liquid cooling to hit $21.14bn by 2032 (MarketsandMarkets: 2.840 M USD en 2025, +33,2 % anual)', editor: 'OGN News (MarketsandMarkets)', tipo: 'Sectorial', fecha: '2025', url: 'https://ognnews.com/Article/47944/Data_centre_liquid_cooling_to_hit_$2114bn' },
  { id: 4, titulo: 'Thermal sector: AI server demand fuels liquid cooling adoption (contenido líquido por rack GB300, VR, AWS Trainium; microcanales)', editor: 'KGI Securities', tipo: 'Analistas', fecha: '2025-10-27', url: 'https://www.kgi.com.hk/en/-/media/files/kgishk/research-reports/tw-reports/thermal-sector_27102025.pdf' },
  { id: 5, titulo: 'Cadena de suministro de refrigeración de IA: proveedores de placas frías, CDU y cámaras de vapor; penetración líquida 2026-2027 (TrendForce)', editor: 'Penchan', tipo: 'Sectorial', fecha: '2026', url: 'https://penchan.co/en/market/ai/supply-chain/cooling/' },
  { id: 6, titulo: 'Fichas de Yahoo Finance de Auras, Delta, Vertiv, Jentech, Kaori, nVent, Envicool, Sunonwealth, Modine (ingresos y margen operativo de los últimos doce meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/3324.TWO/' },
  { id: 7, titulo: 'Resumen de la conferencia de resultados del 2T26 de AVC (clientes, ASIC frente a GPU, CDU, bifásica, CPO)', editor: 'Fugle Research', tipo: 'Analistas', fecha: '2026-08-12', url: 'https://blog.fugle.tw/post/earnings-call-3017-2026-08-12' },
  { id: 8, titulo: 'Rumor de problema de interfaz térmica en Vera Rubin: AVC cae a límite a la baja antes de la conferencia', editor: 'China Times (Wantrich)', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://wantrich.chinatimes.com/news/20260506900299-420101' },
  { id: 9, titulo: 'Citi sube objetivos de AVC y Auras: ventas de AVC 2027 +50 % y margen bruto del 34,9 %', editor: 'Economic Daily News (UDN)', tipo: 'Prensa', fecha: '2026-09-19', url: 'https://money.udn.com/money/story/5607/9764013' },
  { id: 10, titulo: 'AVC: capacidad llena, ampliación de la planta de Vietnam, pedidos con visibilidad hasta 2028 (3T25)', editor: 'Yahoo股市 (財訊快報)', tipo: 'Prensa', fecha: '2025-11-13', url: 'https://tw.stock.yahoo.com/news/%E5%A5%87%E9%8B%90%E7%94%A2%E8%83%BD%E7%88%86%E6%BB%BF-%E8%B6%8A%E5%8D%97%E5%BB%A0%E6%93%B4%E5%BB%BA-q4%E6%A5%AD%E7%B8%BE%E4%BC%B0%E5%AD%A3%E5%A2%9E2%E6%88%90-%E6%98%8E%E5%B9%B4%E7%87%9F%E6%94%B6%E6%AF%9B%E5%88%A9%E7%8E%87%E7%BA%8C%E6%94%BB%E9%AB%98-044046327.html' },
  { id: 11, titulo: 'Ficha de AVC en Yahoo Finance (descripción del negocio, fundación 1991, sede en Kaohsiung)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/3017.TW/profile' },
  { id: 12, titulo: 'Ficha de AVC en Yahoo股市 (fundación 17-dic-1991, cotiza desde 27-sep-2002, sede en Kaohsiung)', editor: 'Yahoo股市', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tw.stock.yahoo.com/quote/3017.TW/profile' },
  { id: 13, titulo: 'Eaton signs agreement to acquire Boyd Thermal (9.500 M USD; ventas 2026e de 1.700 M USD)', editor: 'Eaton (Business Wire)', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/Eaton-Signs-Agreement-to-Acquire-Boyd-Thermal-Expanding-Solutions-for-Data-Center-Customers-to-Include-Critical-Liquid-Cooling-Technology' },
];
const comp = (s) => Y[s]?.financialData ?? {};
const ing = (s, fx = 1) => r(((comp(s).totalRevenue?.raw ?? 0) * fx) / 1e6, 0);
const mOp = (s) => r((comp(s).operatingMargins?.raw ?? 0) * 100);
const USD = 32.38, CNY = 4.8473;
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Asia Vital Components (奇鋐科技) se fundó en Kaohsiung en diciembre de 1991 y cotiza en la Bolsa de Taiwán desde septiembre de 2002 [12]. Creció como fabricante de ventiladores, disipadores, tubos de calor y cámaras de vapor para PC, portátiles y equipos de comunicaciones, con fábricas en China y Taiwán y, después, en Vietnam [11]. Su accionista industrial de referencia es Furukawa Electric, socio tecnológico en disipación térmica desde hace dos décadas. Entre 2023 y 2026 se convirtió en uno de los principales proveedores de refrigeración de servidores de IA (placas frías, colectores de rack, chasis y módulos de aire de alto rendimiento) para las plataformas de Nvidia y los chips propios de los grandes de la nube [7, 10]. En 2023 sacó a bolsa su filial de bisagras Fositek [12].',
    hitos: [
      { anio: '1991', hito: 'Fundación en Kaohsiung (Taiwán) [12].' },
      { anio: '2002', hito: 'Salida a la Bolsa de Taiwán [12].' },
      { anio: '2023', hito: 'Ampliación de capital de 2.850 M TWD y salida a bolsa de la filial Fositek (bisagras) [12].' },
      { anio: '2024', hito: 'Primeros envíos de placas frías y colectores para racks de IA refrigerados por líquido (GB200) [10].' },
      { anio: '2025', hito: 'Ventas +95 % hasta 139.639 M TWD; planta de Vietnam en ampliación; pedidos con visibilidad hasta 2028 [10].' },
      { anio: '2026', hito: 'Margen bruto récord (32,57 % en el 2T); producción de Vera Rubin desde el 3T y de proyectos ASIC líquidos en el 4T [7].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'AVC diseña y fabrica soluciones térmicas y mecánicas: módulos de refrigeración por aire (ventiladores, disipadores con tubos de calor y cámaras de vapor 3D), refrigeración líquida en el servidor y el rack (placas frías, colectores de rack, conectores rápidos, componentes de CDU) y chasis y estructuras para servidores [7, 11]. En el 1S26 el 62,98 % de las ventas fue térmico, el 20,44 % chasis y el resto otros productos (PC, consumo, bisagras de Fositek); el 66,14 % fue para servidores y redes [7]. Sus clientes son los fabricantes de servidores de IA (ODM taiwaneses como Foxconn, Quanta y Wistron, y Supermicro) y, a través de ellos, Nvidia y los grandes de la nube con chips propios (Google TPU, AWS Trainium) [7]. Fabrica en Taiwán, China y Vietnam, donde concentra la nueva capacidad [7].',
    como_gana_dinero: 'Vende componentes y módulos por proyecto: cada generación de GPU o de ASIC se cualifica con el cliente, y el proveedor elegido suministra durante la vida de la plataforma (12-24 meses) [4, 7]. El margen depende de la mezcla: la refrigeración líquida y las cámaras de vapor de alta potencia dejan más que los ventiladores y los chasis, y el contenido térmico por rack sube con cada generación (más placas frías y conectores en GB300 que en GB200; Trainium 3 aún más) [4]. El apalancamiento operativo es fuerte: los gastos de explotación bajaron del 8,4 % de las ventas en 2024 al 5,2 % en el 1S26 [7]. Ingresos poco recurrentes: cada plataforma se gana de nuevo, sin contratos plurianuales, y el precio se negocia con ODM muy concentrados.',
    clientes: 'La empresa no publica la concentración de clientes; por la estructura del sector, los diez primeros (ODM de servidores y grandes de la nube) suponen la mayoría de las ventas de servidores [7]. Se declara proveedor principal en sus clientes clave de ASIC y de GPU, sin cuotas [7]. El poder de precios se ve en el margen bruto (del 20,9 % en 2023 al 32,6 % en el 2T26) con inflación de materiales [7]; parte de esa subida es mezcla y escasez de capacidad líquida, que puede revertir cuando la capacidad del sector se ponga al día.',
  },
  sector: {
    definicion: 'El mercado relevante es la refrigeración de servidores de centros de datos en el propio equipo y en el rack: módulos de aire de alta potencia y refrigeración líquida directa (placas frías, colectores, conectores, CDU). Las fuentes publicadas miden perímetros distintos y más estrechos que las ventas de AVC: Dell\'Oro mide la infraestructura física y la refrigeración líquida directa del lado de la instalación (1.100 M USD en 2024, «cerca de 3.000 M» en 2025 y unos 7.000 M en 2029) [1, 2]; MarketsandMarkets, 2.840 M USD en 2025 y 21.140 M en 2032 [3]. Ninguna recoge los módulos de aire, los chasis ni el contenido líquido dentro del servidor que venden los ODM, por eso AVC (unos 7.000 M USD de ventas en 2026) supera esas cifras. Usamos su crecimiento como indicador del ritmo, no como tamaño.',
    tamano: 'Refrigeración líquida de centros de datos (perímetro de instalación): ≈3.000 M USD en 2025 y ≈7.000 M en 2029, según Dell\'Oro [2]; 2.840 M USD en 2025 según MarketsandMarkets [3].',
    unidad_serie: 'millones de USD (refrigeración líquida directa, Dell\'Oro)',
    serie: [{ anio: '2024', tamano: 1100 }, { anio: '2025', tamano: 3000 }, { anio: '2029e', tamano: 7000 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 23.6,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Gasto de capital en centros de datos de IA de los grandes de la nube', efecto: '+', horizonte: 'Cíclico', evidencia: 'La infraestructura física crecerá un 15 % anual hasta 63.100 M USD en 2029 y la gestión térmica un 19 % [1].' },
      { driver: 'Potencia por chip (TDP) y por rack', efecto: '+', horizonte: 'Estructural', evidencia: 'Rubin llega a 2,3 kW por GPU y Rubin Ultra superará 3 kW; el contenido líquido de GB300 es un 10-20 % mayor que el de GB200 [4].' },
      { driver: 'Penetración de la refrigeración líquida en chips de IA', efecto: '+', horizonte: 'Estructural', evidencia: 'TrendForce: 53 % en 2026 y cerca del 60 % en 2027 [5]; AVC espera más del 50 % en 2027 [7].' },
      { driver: 'Chips propios (ASIC) que pasan del aire al líquido', efecto: '+', horizonte: 'Estructural', evidencia: 'Trainium 3 lleva 99 módulos de placa fría y 456 conectores por rack, más que GB300 [4]; AVC espera que sus ventas ASIC superen a las de GPU en 2027 [7].' },
      { driver: 'Refrigeración en el chip (tapas con microcanales)', efecto: '−', horizonte: 'Estructural', evidencia: 'Nvidia desarrolla tapas y placas con microcanales para más de 3 kW; KGI ve a Jentech como primer proveedor desde 2H26-2027 [4].' },
      { driver: 'Cambios de diseño de plataforma', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los rumores sobre la interfaz térmica de Vera Rubin hundieron un 19 % la acción en mayo de 2026 [8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Varios proveedores cualificados por plataforma (Nvidia tenía cinco en líquido para Blackwell) y competidores con escala (Delta, Auras, Cooler Master, Boyd-Eaton, Vertiv) [7].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pocos ODM y pocos diseñadores de chips deciden cada plataforma; sin contratos plurianuales [7].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Cobre, aluminio y componentes estándar; la tensión de materiales de 2026 alargó plazos pero el margen bruto subió [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La cualificación y la capacidad de fabricar placas frías sin fugas a escala es una barrera, pero los grandes industriales están entrando por compras (Eaton-Boyd por 9.500 M USD) [13].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Refrigeración en el chip con microcanales, bifásica e inmersión: hoy minoritarias, los clientes prefieren monofásica para la próxima generación [4, 7].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Indicadores: ventas mensuales de AVC (+44,9 % interanual en septiembre de 2026), penetración líquida creciente y gasto de capital de los grandes de la nube al alza [5, 7]. El sector de componentes de servidores es cíclico: en 2022-2023 los inventarios de PC y servidores cayeron y AVC creció solo un 5,7 % en 2023 [Cuentas]. En 2008-2009 y 2020 el negocio era de PC y portátiles. El riesgo de ciclo hoy es un parón del gasto en centros de datos de IA, que dejaría capacidad recién instalada sin uso.' },
    regulacion: 'Aranceles de EE. UU. a productos fabricados en China y la presión para fabricar fuera de China explican la expansión en Vietnam [7]. Controles de exportación de EE. UU. sobre chips de IA a China limitan una parte de la demanda. Sin regulación sectorial específica sobre la refrigeración.',
    tendencias: 'Tres tendencias: (1) más contenido líquido por rack con cada generación (GB300, Vera Rubin, Trainium 3) [4]; (2) refrigeración en el chip con microcanales para más de 3 kW, donde el valor puede ir a fabricantes de tapas (Jentech) más que a los de placas frías [4]; (3) integración vertical de los ODM (Foxconn) y entrada de grandes industriales por compras (Eaton-Boyd, Vertiv-CoolTera) [13]. AVC gana con la primera y está expuesta a las otras dos.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Uno de los dos o tres principales proveedores de placas frías y colectores de rack para servidores de IA de Nvidia y de los ASIC de los grandes de la nube, junto con Auras y Cooler Master; líder taiwanés por ventas térmicas [5, 7].',
    competidores: [
      { nombre: 'Auras Technology', pais: 'Taiwán', ticker: '3324.TWO', ingresos: ing('3324.TWO'), cuota_pct: null, margen_ebit_pct: mOp('3324.TWO'), comentario: 'Competidor directo en placas frías y módulos de aire; más pequeño y con menos margen [6].' },
      { nombre: 'Delta Electronics', pais: 'Taiwán', ticker: '2308.TW', ingresos: ing('2308.TW'), cuota_pct: null, margen_ebit_pct: mOp('2308.TW'), comentario: 'Grupo de energía; fuerte en CDU y ventiladores; la refrigeración es una parte pequeña de sus ventas [6].' },
      { nombre: 'Vertiv', pais: 'EE. UU.', ticker: 'VRT', ingresos: ing('VRT', USD), cuota_pct: null, margen_ebit_pct: mOp('VRT'), comentario: 'Infraestructura de instalación (CDU, refrigeración de sala, energía); compró CoolTera y PurgeRite [6].' },
      { nombre: 'Jentech Precision', pais: 'Taiwán', ticker: '3653.TW', ingresos: ing('3653.TW'), cuota_pct: null, margen_ebit_pct: mOp('3653.TW'), comentario: 'Tapas y disipadores integrados; primer proveedor previsto de tapas con microcanales [4, 6].' },
      { nombre: 'Kaori Heat Treatment', pais: 'Taiwán', ticker: '8996.TW', ingresos: ing('8996.TW'), cuota_pct: null, margen_ebit_pct: mOp('8996.TW'), comentario: 'Intercambiadores y CDU [6].' },
      { nombre: 'Cooler Master', pais: 'Taiwán', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; uno de los grandes proveedores de placas frías de Nvidia.' },
      { nombre: 'Boyd Thermal (Eaton)', pais: 'EE. UU.', ticker: null, ingresos: r(1700 * USD, 0), cuota_pct: null, margen_ebit_pct: null, comentario: 'Ventas 2026e de 1.700 M USD; comprada por Eaton por 9.500 M USD [13].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta de componentes por proyecto.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Cada plataforma exige cualificación de meses y pruebas de fugas; durante su vida el proveedor es difícil de cambiar, pero la siguiente se licita de nuevo [4, 7].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Experiencia en cámaras de vapor y soldadura de placas frías; I+D del 3,9 % de las ventas; sin patentes que bloqueen a competidores [Cuentas].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo del 27,4 % en el 2T26 frente al 16,0 % de Auras y el 12,9 % de Kaori [6, Cuentas].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Un millón de placas frías al mes y fábricas en Vietnam y Taiwán: capacidad que los clientes necesitan rápido [7].' },
      ],
    },
    amenazas: 'Tres: (1) la siguiente plataforma de Nvidia (Rubin Ultra, rack Kyber) puede pasar valor a la refrigeración en el chip, donde Jentech parte con ventaja [4]; (2) la entrada de grandes industriales con compras (Eaton-Boyd, Vertiv) y la integración de los ODM pueden presionar el precio de las placas frías [13]; (3) la cualificación de más proveedores por plataforma reduce la cuota de cada uno [7]. Probabilidad media en 2-3 años.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: '1) Conferencias del 1T26 y 2T26: la empresa no da cuotas; 2) informes de KGI y TrendForce (vía Penchan): proveedores sin cuotas; 3) prensa: estimaciones dispares sin fuente', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Dell\'Oro y MarketsandMarkets: sin cuotas públicas; 2) KGI: lista de proveedores sin cuota; 3) prensa: sin dato', decision: 'Omitido' },
  ],
};
// La cita [Cuentas] no existe: se sustituye por la nota A al integrar (la cuenta de AVC). Se deja como texto sin cita.
const limpia = (o) => JSON.parse(JSON.stringify(o).replaceAll(' [Cuentas]', '').replaceAll(', Cuentas]', ']'));
guarda('B', limpia(B));

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form N-PX de The Taiwan Fund, Inc. (votaciones 2024-2025): junta de AVC del 6-jun-2025, elección del consejo completo', editor: 'SEC (EDGAR)', tipo: 'Primaria', fecha: '2025-08-26', url: 'https://www.sec.gov/Archives/edgar/data/804123/000139834425016624/proxytable.xml' },
  { id: 2, titulo: 'Form N-PX de The Taiwan Fund, Inc. (votaciones 2023-2024): junta de AVC del 14-jun-2024', editor: 'SEC (EDGAR)', tipo: 'Primaria', fecha: '2024-08-27', url: 'https://www.sec.gov/Archives/edgar/data/804123/000139834424015667/ProxyVotingTable.xml' },
  { id: 3, titulo: 'Participaciones de consejeros y directivos de 奇鋐 (3017), datos de agosto de 2023', editor: 'Cnyes (鉅亨網)', tipo: 'Datos de mercado', fecha: '2023-08', url: 'https://www.cnyes.com/twstock/directorholder.aspx?code=3017' },
  { id: 4, titulo: 'Ficha de AVC en Yahoo股市: presidente y director general, portavoz, auditor, participación del consejo (13,72 %)', editor: 'Yahoo股市', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tw.stock.yahoo.com/quote/3017.TW/profile' },
  { id: 5, titulo: 'Declaraciones de transmisión de acciones de consejeros, directivos y accionistas de referencia de AVC (registro de la TWSE)', editor: 'Yahoo股市', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tw.stock.yahoo.com/quote/3017.TW/insider-transactions' },
  { id: 6, titulo: 'AVC: no le pesa la declaración de venta del accionista de referencia (Furukawa, 4.800 lotes en enero de 2024)', editor: 'Liberty Times (LTN)', tipo: 'Prensa', fecha: '2024-01-13', url: 'https://ec.ltn.com.tw/article/breakingnews/4553626' },
  { id: 7, titulo: 'Furukawa Electric: aviso de beneficio extraordinario por venta de valores cotizados (reducción de participaciones cruzadas), febrero de 2025', editor: 'Furukawa Electric (TDnet, JPX)', tipo: 'Primaria', fecha: '2025-02-12', url: 'https://www2.jpx.co.jp/disc/58010/140120250210569016.pdf' },
  { id: 8, titulo: 'Furukawa Electric: aviso de beneficio extraordinario por venta de valores cotizados extranjeros, enero de 2024', editor: 'Furukawa Electric (TDnet, JPX)', tipo: 'Primaria', fecha: '2024-01-24', url: 'https://www2.jpx.co.jp/disc/58010/140120240124518312.pdf' },
  { id: 9, titulo: 'Participación de consejeros y de extranjeros en AVC, serie semanal (董監持股, 外資籌碼)', editor: 'Yahoo股市', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tw.stock.yahoo.com/quote/3017.TW/major-holders' },
  { id: 10, titulo: 'Ficha de AVC en Yahoo Finance (directivos, años de nacimiento, cargos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/3017.TW/profile' },
  { id: 11, titulo: 'AVC y Fositek, registradas por el Buró de Investigación por la salida a bolsa de Fositek en 2023', editor: 'Liberty Times (LTN)', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://ec.ltn.com.tw/article/breakingnews/5598978' },
  { id: 12, titulo: 'Resumen de la conferencia del 2T26 (guía cualitativa y capex)', editor: 'Fugle Research', tipo: 'Analistas', fecha: '2026-08-12', url: 'https://blog.fugle.tw/post/earnings-call-3017-2026-08-12' },
  { id: 13, titulo: 'AVC 1T26: la dirección reitera crecimiento trimestral en 2026', editor: 'China Times (Wantrich)', tipo: 'Prensa', fecha: '2026-05-15', url: 'https://wantrich.chinatimes.com/news/20260515900245-420101' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Shen Ching-Hang (沈慶行)', cargo: 'Presidente del consejo y director general', desde: null, participacion_pct: 2.0, trayectoria: 'Nacido en 1963 [10]. Dirige AVC desde antes de su transformación: bajo su mando las ventas pasaron de 39.666 M TWD (2020) a 139.639 M (2025) y el margen operativo del 8 % al 20 %. Participación estimada de unos 7,9 M de acciones, directas y a través de Zing He Investment (星合投資), con datos de 2023 [1, 3].' },
      { nombre: 'Chen Yi-Cheng (陳易成)', cargo: 'Vicepresidente, director financiero, consejero y portavoz', desde: null, participacion_pct: 0.3, trayectoria: 'Nacido en 1963; consejero en representación de Cheng Li Investment [1, 10]. Tenía 1,3 M de acciones en 2023; donó 1,0 M entre 2024 y 2026 [3, 5].' },
      { nombre: 'Huang Chiu-Mo (黃祖模)', cargo: 'Vicepresidente y consejero', desde: null, participacion_pct: null, trayectoria: 'Consejero en representación de Xianyan Investment [1]. Transmitió 509.358 acciones a un tercero en septiembre de 2025 [5].' },
      { nombre: 'Lin Shu-Hua (林淑華)', cargo: 'Directora de contabilidad', desde: null, participacion_pct: 0.01, trayectoria: 'Responsable contable; 40.000 acciones en 2023 [3].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento fuerte por servidores de IA y refrigeración líquida; capacidad llena y ampliación en Vietnam (cualitativa)', real: 'Ventas +94,6 %, BPA de 20,62 a 48,24 TWD', cumplida: 'Sí' },
      { anio: '2026 (1S)', guia: 'Crecimiento trimestre a trimestre en 2026 (conferencia del 14-may)', real: 'Ventas del 2T +0,2 % sobre el 1T; beneficio +20,9 %', cumplida: 'Parcial' },
      { anio: '2026 (3T)', guia: '3T mejor que 2T (conferencia del 12-ago)', real: 'Ventas de julio-septiembre 59.089 M TWD, +20 % sobre el 2T', cumplida: 'Sí' },
      { anio: '2026', guia: 'Capex de unos 15.000 M TWD', real: 'En curso: 11.360 M en el 1S26 (con anticipos)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y fundador al mando: el presidente es también director general desde hace años y el director financiero lleva la relación con el mercado [4]. La dirección no publica previsiones cuantitativas, solo cualitativas, y las ha cumplido en lo grande (2025) con un tropiezo de calendario en el 2T26 por la transición de plataformas [12, 13]. No hay plan de sucesión público; con un presidente-director general de 63 años y sin consejero coordinador, la dependencia de una persona es alta.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Shen Ching-Hang (en representación de Zing He Investment)', cargo: 'Presidente y director general', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Ono Ryoji (en representación de Furukawa Electric)', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Kawabata Kenya (en representación de Furukawa Electric)', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: null },
      { nombre: 'Katoh Shin (en representación de Furukawa Electric)', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: null },
      { nombre: 'Kitanoya Atsushi', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Chen Yi-Cheng (en representación de Cheng Li Investment)', cargo: 'Consejero, director financiero', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Huang Chiu-Mo (en representación de Xianyan Investment)', cargo: 'Consejero, vicepresidente', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Joseph Ueng Chehchung (翁傑中)', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (por ley, todos los independientes)' },
      { nombre: 'Lin Tzu-Yun (林子筠)', cargo: 'Consejera independiente', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Cheng Chun-Jen (鄭淳仁)', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Chen Ren-Her (陳仁和)', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'Los estatutos taiwaneses reparten una parte del beneficio antes de impuestos como retribución a empleados y consejeros (en efectivo o acciones), lo que liga el variable al beneficio del año y no a la rentabilidad del capital ni al flujo de caja [4]. No pudimos leer el informe anual con la remuneración individual del presidente ni el detalle del plan de opciones (servidor de documentos de la TWSE bloqueado). La junta de 2025 aprobó liberar a los consejeros nuevos de la prohibición de competencia, y The Taiwan Fund votó en contra [1].',
    accionistas: [
      { nombre: 'Furukawa Electric', pct: 12.3, tipo: 'Industrial de referencia (3 consejeros)', variacion: 'Vendió 9,3 M de acciones en 2021 y 4,8 M en enero de 2024; sin declaraciones de venta desde entonces. Reduce participaciones cruzadas por política [5, 6, 7].' },
      { nombre: 'Consejo en conjunto (incluye Furukawa)', pct: 13.72, tipo: 'Consejeros', variacion: 'Del 14,31 % (oct-25) al 13,72 % (oct-26) [9].' },
      { nombre: 'Inversores extranjeros (total)', pct: 53.44, tipo: 'Institucionales', variacion: 'Del 50,3 % (oct-25) al 53,4 % [9].' },
    ],
    insiders: [
      { fecha: '2025-09-01', persona: 'Huang Chiu-Mo (vicepresidente)', operacion: 'Venta', acciones: 509358, importe: null },
      { fecha: '2025-09-04', persona: 'Zing He Investment (sociedad del presidente), donación', operacion: 'Venta', acciones: 200000, importe: null },
      { fecha: '2026-04-08', persona: 'Chen Yi-Cheng (director financiero), donación', operacion: 'Venta', acciones: 200000, importe: null },
    ],
    control_y_defensas: 'No hay accionista de control: Furukawa Electric, con alrededor del 12 % (48,1 M de acciones tras su venta de enero de 2024) y tres de once consejeros, es el socio industrial de referencia; el presidente controla en torno al 2 % [1, 3, 5, 6]. Una acción, un voto, sin blindajes. Cuatro de once consejeros son independientes y forman la comisión de auditoría, como exige la ley taiwanesa [1]. Riesgo para el minoritario: Furukawa viene reduciendo participaciones cruzadas por política (ventas de valores cotizados en 2024 y 2025) y ya vendió acciones de AVC en 2021 y 2024; una nueva venta en bloque presionaría el precio [5-8].',
    alertas: [
      'Registro del Buró de Investigación (MJIB) en las oficinas de AVC y Fositek el 7-oct-2026 por la salida a bolsa de Fositek en 2023; según la empresa, afecta a empleados concretos y no a su operativa [11].',
      'Presidente y director general en la misma persona, sin consejero coordinador [4].',
      'Furukawa Electric reduce participaciones cruzadas: posible venta de su 12 % [6, 7].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) Informe anual 2025 (doc.twse.com.tw, bloqueado desde la nube); 2) MOPS, remuneración de consejeros (API bloqueada); 3) prensa y proveedores: sin cifra individual', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Actas de la junta en MOPS (bloqueado); 2) N-PX de fondos de EE. UU.: solo el sentido de su voto; 3) prensa: sin resultados de la junta', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (3017.TW, ^TWII, 0050.TW), hasta 2026-10-16 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/3017.TW/history' },
  { id: 2, titulo: 'Yahoo Finance, quoteSummary de 3017.TW: consenso de BPA y ventas 2026-2027 (16-17 analistas), recomendaciones y objetivos', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/3017.TW/analysis' },
  { id: 3, titulo: 'Citi sube el objetivo de AVC de 3.800 a 4.350 TWD; Macquarie, el más alto con 4.600', editor: 'Economic Daily News (UDN)', tipo: 'Prensa', fecha: '2026-09-19', url: 'https://money.udn.com/money/story/5607/9764013' },
  { id: 4, titulo: 'Taiwan 10Y bond yield: 2,03 % el 16-oct-2026', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tradingeconomics.com/taiwan/government-bond-yield' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026 (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Yahoo Finance, quoteSummary de comparables (Auras, Delta, Vertiv, Jentech, Kaori, nVent, Envicool, Sunonwealth, Modine) y tipos de cambio USD/TWD y CNY/TWD', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/VRT/key-statistics' },
  { id: 7, titulo: 'Eaton signs agreement to acquire Boyd Thermal (9.500 M USD, ≈22,5 veces el EBITDA ajustado 2026e; ventas 2026e de 1.700 M USD)', editor: 'Eaton (Business Wire)', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/Eaton-Signs-Agreement-to-Acquire-Boyd-Thermal-Expanding-Solutions-for-Data-Center-Customers-to-Include-Critical-Liquid-Cooling-Technology' },
  { id: 8, titulo: 'Vertiv announces intent to acquire PurgeRite (≈1.000 M USD, ≈10,0 veces el EBITDA 2026e con sinergias)', editor: 'Vertiv', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.vertiv.com/en-us/about/news-and-events/corporate-news/vertiv-announces-intent-to-acquire-purgerite-a-leading-provider-of-specialized-fluid-management-services-to-expand-liquid-cooling-services-portfolio/' },
  { id: 9, titulo: 'Schneider Electric toma el 75 % de Motivair por 850 M USD (múltiplo de un dígito medio sobre las ventas 2025e)', editor: 'Intelligent Data Centres', tipo: 'Prensa', fecha: '2024-10-17', url: 'https://intelligentdatacentres.com/?p=38314' },
  { id: 10, titulo: 'Samsung acquires FläktGroup for €1.5bn (2,05 veces las ventas 2024 de 730 M EUR)', editor: 'Memoori', tipo: 'Prensa', fecha: '2025-05-14', url: 'https://memoori.com/samsung-acquires-flaktgroup-for-1-5bn-hvac-deal/' },
  { id: 11, titulo: 'Morgan Stanley sube el objetivo de AVC a 3.333 TWD (BPA 2026e 96,5; 2027e 145,03; 2028e 191,8)', editor: 'Economic Daily News (UDN)', tipo: 'Prensa', fecha: '2026-05', url: 'https://money.udn.com/money/story/5607/9505700' },
  { id: 12, titulo: 'AVC (3017): dividendo de 20,881 TWD con cargo a 2025; ex-dividendo el 19-ago-2026', editor: 'Win投資', tipo: 'Prensa', fecha: '2026-08-17', url: 'https://winvest.tw/News/Detail/92826' },
  { id: 13, titulo: 'Ficha de AVC en Yahoo股市 (acciones emitidas 392.670.107; cierre del 16-oct 3.315 TWD)', editor: 'Yahoo股市', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tw.stock.yahoo.com/quote/3017.TW/profile' },
  { id: 14, titulo: 'Fositek (6805.TW), ficha de Yahoo Finance: capitalización 154.246 M TWD, PER de los últimos doce meses 48,2', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/6805.TW/' },
];
const g = (o) => (o && typeof o === 'object' ? o.raw : o) ?? null;
const W0 = 2.5 / 12, W1 = 9.5 / 12; // meses del ejercicio 2026 que quedan en los próximos 12
const compD = (nombre, s, pais, fx = 1, w0 = W0, w1 = W1) => {
  const q = Y[s], f = q.financialData, k = q.defaultKeyStatistics, p = q.price;
  const tr = Object.fromEntries((q.earningsTrend?.trend ?? []).map((t) => [t.period, t]));
  const e0 = g(tr['0y']?.earningsEstimate?.avg), e1 = g(tr['+1y']?.earningsEstimate?.avg);
  const r0 = g(tr['0y']?.revenueEstimate?.avg), r1 = g(tr['+1y']?.revenueEstimate?.avg);
  const px = g(p.regularMarketPrice), mcap = g(p.marketCap), ev = g(k.enterpriseValue), ebitda = g(f.ebitda), rev = g(f.totalRevenue);
  const epsNtm = e0 * w0 + e1 * w1, revNtm = r0 * w0 + r1 * w1;
  return {
    nombre, ticker: s, pais, capitalizacion: r((mcap * fx) / 1e6, 0), ev_ventas: r(ev / rev, 2), ev_ebitda_ltm: r(ev / ebitda), ev_ebitda_ntm: null,
    per_ntm: r(px / epsNtm), crecimiento_pct: r((revNtm / rev - 1) * 100), margen_ebitda_pct: r(g(f.ebitdaMargins) * 100), roic_pct: null,
    dn_ebitda: r((g(f.totalDebt) - g(f.totalCash)) / ebitda, 2), fcf_yield_pct: r((g(f.freeCashflow) / mcap) * 100),
  };
};
const empresas = [
  compD('Auras Technology', '3324.TWO', 'TW'),
  compD('Delta Electronics', '2308.TW', 'TW'),
  compD('Vertiv', 'VRT', 'US', USD),
  compD('Jentech Precision', '3653.TW', 'TW'),
  compD('Kaori Heat Treatment', '8996.TW', 'TW'),
  compD('nVent Electric', 'NVT', 'US', USD),
  compD('Shenzhen Envicool', '002837.SZ', 'CN', CNY),
  compD('Sunonwealth Electric', '2421.TW', 'TW'),
  compD('Modine Manufacturing', 'MOD', 'US', USD, 5.5 / 12, 6.5 / 12),
];
const pers = empresas.map((e) => e.per_ntm).sort((a, b) => a - b);
const medianaPer = pers[Math.floor(pers.length / 2)];
const AV = Y['3017.TW'];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Asia Vital Components Co., Ltd. (奇鋐科技股份有限公司)', nombre_corto: 'AVC', ticker: '3017', isin: 'TW0003017000', mercado: 'Bolsa de Taiwán (TWSE)', indice_referencia: 'TAIEX (^TWII)',
    pais: 'Taiwán', pais_iso: 'TW', sector: 'Tecnologías de la información', industria: 'Componentes electrónicos (soluciones térmicas)', sede: 'Kaohsiung (Taiwán)', fundacion: '1991', empleados: null, web: 'https://www.avc.co',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 399.8, capitalizacion_publicada: r(g(AV.price.marketCap) / 1e6, 0), free_float_pct: r((g(AV.defaultKeyStatistics.floatShares) / g(AV.defaultKeyStatistics.sharesOutstanding)) * 100),
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(BOLSA.volumen_3m.importe_dia_millones / 100) / 10} mil M TWD/día (3 meses)`, proximos_resultados: '2026-11-12',
  },
  consenso: {
    guidance: 'AVC no publica previsiones numéricas. En la conferencia del 12-ago-2026 dijo que el 3T26 sería mejor que el 2T26 y el segundo semestre mejor que el primero, con Vera Rubin aportando desde el 3T y los proyectos ASIC líquidos en gran volumen en el 4T; capex de unos 15.000 M TWD en 2026 y mayor en 2027, y un 50 % más de capacidad líquida en 2027 [3]. Las ventas de julio-septiembre (59.089 M TWD, +20 % sobre el 2T) confirman la parte del 3T.',
    estimaciones: [
      { periodo: '2026e', ingresos: r(g(AV.earningsTrend.trend.find((t) => t.period === '0y').revenueEstimate.avg) / 1e6, 0), ebitda: null, ebit: null, bpa: r(g(AV.earningsTrend.trend.find((t) => t.period === '0y').earningsEstimate.avg), 2), dpa: null, fuente: 'Yahoo Finance, 16 analistas [2]' },
      { periodo: '2027e', ingresos: r(g(AV.earningsTrend.trend.find((t) => t.period === '+1y').revenueEstimate.avg) / 1e6, 0), ebitda: null, ebit: null, bpa: r(g(AV.earningsTrend.trend.find((t) => t.period === '+1y').earningsEstimate.avg), 2), dpa: null, fuente: 'Yahoo Finance, 17 analistas [2]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 191.8, dpa: null, fuente: 'Morgan Stanley (una casa) [11]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 17, mantener: 0, vender: 0, po_medio: r(g(AV.financialData.targetMeanPrice), 2), po_min: g(AV.financialData.targetLowPrice), po_max: g(AV.financialData.targetHighPrice) },
    revisiones: 'Al alza: el BPA de consenso de 2026 pasó de 94,53 a 103,52 TWD en 90 días (+9,5 %) y el de 2027 de 136,17 a 161,73 (+18,8 %) [2]. Citi subió en septiembre su beneficio de 2026-2028 un 3 %, 13 % y 16 % y el objetivo a 4.350 TWD (ventas de 2027 +50 %, margen bruto 34,9 %) [3]. Las recomendaciones son 6 de compra fuerte y 11 de compra, sin ninguna de mantener o vender [2]. Una sola fuente da las estimaciones completas (Yahoo); el objetivo y las recomendaciones se contrastan con las casas citadas por la prensa (Citi 4.350, Macquarie 4.600, JPMorgan 3.500, Morgan Stanley 3.333) [3, 11].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción ha subido un 177,4 % en un año y un 115,1 % anual en cinco, frente al 70,4 % y el 22,9 % del TAIEX (rentabilidades de precio) [1]. Lo explica el beneficio: el BPA pasó de 13,71 TWD en 2023 a 73,89 en los últimos doce meses. Es muy volátil (64,2 % anual; caída máxima del 57,5 % entre mayo de 2024 y abril de 2025, con la corrección de las tecnológicas y los aranceles de abril de 2025) [1]. En 2026 alternó subidas y caídas de dos dígitos con cada noticia de plataformas de Nvidia: rumor de la interfaz térmica de Vera Rubin en mayo, informe flojo del 2T y recortes de casas locales en julio, margen récord y pedidos de Rubin en agosto [1].',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ['2020', '2021', '2022', '2023', '2024', '2025'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
  },
  comparables: {
    criterio: `Nueve cotizadas de refrigeración y gestión térmica de centros de datos y electrónica: los rivales taiwaneses directos (Auras, Jentech, Kaori, Sunonwealth), Delta (CDU y ventiladores dentro de un grupo de energía), los de infraestructura de instalación de EE. UU. (Vertiv, nVent, Modine) y el chino Envicool. Fuera Fositek, que es filial de AVC, y Nidec (pérdidas e investigación contable). Múltiplos de Yahoo Finance del 16-oct-2026; PER de los próximos 12 meses = precio ÷ (2,5/12 del BPA 2026e + 9,5/12 del 2027e; Modine, con ejercicio a marzo, 5,5/12 y 6,5/12) [6]. Sin EV/EBITDA de los próximos 12 meses: Yahoo no da EBITDA estimado. Mediana del PER: ${medianaPer}.`,
    empresas,
    comentario: null,
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (placas frías, CDU y refrigeración líquida)', comprador: 'Eaton', ev: r(9500 * USD, 0), ev_ventas: 5.59, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: 'EV/ventas sobre las ventas 2026e de 1.700 M USD; EBITDA 2026e ajustado [7].' },
      { fecha: '2025-11', objetivo: 'PurgeRite (servicios de fluidos para refrigeración líquida)', comprador: 'Vertiv', ev: r(1000 * USD, 0), ev_ventas: null, ev_ebitda: 10.0, prima_pct: null, excluir: false, comentario: '≈10,0 veces el EBITDA 2026e con sinergias; hasta 250 M USD más por objetivos [8].' },
      { fecha: '2024-10', objetivo: 'Motivair (CDU y refrigeración líquida)', comprador: 'Schneider Electric', ev: r((850 / 0.75) * USD, 0), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '75 % por 850 M USD (100 % implícito ≈1.133 M); múltiplo de un dígito medio sobre las ventas 2025e [9].' },
      { fecha: '2025-05', objetivo: 'FläktGroup (climatización y refrigeración de centros de datos)', comprador: 'Samsung Electronics', ev: r(1500 * 36.461, 0), ev_ventas: 2.05, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.500 M EUR por el 100 % del capital; 2,05 veces las ventas 2024 de 730 M EUR [10].' },
    ],
    comentario: null,
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) TWSE (datos de préstamo de valores, bloqueado desde la nube); 2) Yahoo Finance: sin dato para Taiwán; 3) Yahoo股市 y CMoney: solo saldos de crédito', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones (EBITDA y DPA)', tipo: 'Complemento', intentos: '1) MarketScreener (403 desde la nube); 2) Yahoo Finance: solo ventas y BPA; 3) prensa: BPA de casas sueltas', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const PTT = (id) => `https://www.ptt.cc/bbs/Stock/${id}.html`;
const fE = [
  { id: 1, titulo: 'PTT Stock: «[情報] 3017 奇鋐 調查局至本公司進行搜索及調查» (85 comentarios)', editor: 'PTT', tipo: 'Foros y redes', fecha: '2026-10-07', url: PTT('M.1791373810.A.E60') },
  { id: 2, titulo: 'PTT Stock: «[新聞] 奇鋐與富世達遭搜索» (35 comentarios)', editor: 'PTT', tipo: 'Foros y redes', fecha: '2026-10-07', url: PTT('M.1791377173.A.B19') },
  { id: 3, titulo: 'PTT Stock: «[情報] 3017奇鋐 115年第二季合併財務報告» (39 comentarios)', editor: 'PTT', tipo: 'Foros y redes', fecha: '2026-08-12', url: PTT('M.1786523580.A.AEC') },
  { id: 4, titulo: 'PTT Stock: «[新聞] 奇鋐訂單塞爆 董座：下半年大爆發» (64 comentarios)', editor: 'PTT', tipo: 'Foros y redes', fecha: '2026-06-03', url: PTT('M.1780444181.A.70B') },
  { id: 5, titulo: 'PTT Stock: «[情報] 3017 奇鋐 Q1 EPS 20.17» (135 comentarios)', editor: 'PTT', tipo: 'Foros y redes', fecha: '2026-05-14', url: PTT('M.1778740329.A.F95') },
  { id: 6, titulo: 'CMoney 股市爆料同學會, foro de 奇鋐 (3017): indicador «同學風向» 75, «極度樂觀»', editor: 'CMoney', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://www.cmoney.tw/forum/stock/3017' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'PTT Stock (hilo del registro del Buró de Investigación)', fecha: '2026-10', n_comentarios: 85, tono: 'Positivo', resumen: 'La mayoría lo trata como «examen ya resuelto» (欣興 subió tras un registro similar) y ve la caída como ocasión de compra; pocos piden prudencia [1].' },
      { plataforma: 'PTT Stock (noticia del registro)', fecha: '2026-10', n_comentarios: 35, tono: 'Dividido', resumen: 'Mezcla de bromas de «señal de compra» con quienes recuerdan «historias de fantasmas» sobre la empresa y esperan un 20 % de caída para entrar [2].' },
      { plataforma: 'PTT Stock (resultados del 2T26)', fecha: '2026-08', n_comentarios: 39, tono: 'Positivo', resumen: 'Entusiasmo por el margen bruto del 32 % y el BPA de tres cifras en 2026; algún escéptico calcula 20 veces 100 = 2.000 TWD y recuerda la caída de cuando «la IA no necesitaba refrigeración» [3].' },
      { plataforma: 'PTT Stock (pedidos y declaraciones del presidente)', fecha: '2026-06', n_comentarios: 64, tono: 'Dividido', resumen: 'Escepticismo: «ya descontado», «2022 prometía 2026 y 2026 promete 2029», dudas por la parte de producción en China y por la entrada de Foxconn [4].' },
      { plataforma: 'PTT Stock (resultados del 1T26)', fecha: '2026-05', n_comentarios: 135, tono: 'Positivo', resumen: 'Comparan su PER adelantado bajo con el de Jentech y lo ven como la opción «más estable» de la refrigeración [5].' },
      { plataforma: 'CMoney 股市爆料同學會', fecha: '2026-10', n_comentarios: null, tono: 'Positivo', resumen: 'El indicador de sentimiento del foro marca 75, «optimismo extremo», el 16-oct [6].' },
    ],
    temas: [
      { tema: 'El registro del Buró de Investigación es una oportunidad de compra', postura: 'Alcista', peso: 'Alto', contraste: 'La empresa limita el caso a la salida a bolsa de Fositek y a empleados concretos; sin imputaciones a la fecha, el riesgo está acotado pero no cerrado [1, 2].' },
      { tema: 'BPA de tres cifras y PER adelantado razonable', postura: 'Alcista', peso: 'Alto', contraste: 'El consenso da 103,5 TWD en 2026 y 161,7 en 2027; nuestro BPA es menor en 2027-2028 porque suponemos que el margen se normaliza [3, 5].' },
      { tema: '«Ya está descontado» y dependencia de Nvidia', postura: 'Bajista', peso: 'Medio', contraste: 'Coincide con el DCF inverso: el precio pide crecimiento alto durante años; las caídas de mayo y julio salieron de noticias de plataformas [4].' },
      { tema: 'Competencia de Foxconn y de Jentech (microcanales)', postura: 'Dividida', peso: 'Bajo', contraste: 'Riesgo real recogido en competencia y riesgos (KGI ve a Jentech como primer proveedor de tapas con microcanales) [4].' },
    ],
    lectura: 'El inversor particular taiwanés está claramente a favor: el foro de CMoney marca optimismo extremo y PTT trata cada caída (rumor de Vera Rubin, registro del Buró de Investigación) como ocasión de compra [1, 5, 6]. Va en la misma dirección que los 17 analistas, todos con recomendación de compra. Eso no aporta información nueva sobre el negocio, pero sí dice que no hay capitulación ni escepticismo que explotar: con un consenso unánime y particulares eufóricos, el riesgo está en las decepciones de plataforma, que en 2026 ya provocaron caídas del 15-20 % en días. Los escépticos señalan dos riesgos que el informe recoge: la producción en China y la competencia de los ODM integrados [4].',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', medianaPer, empresas.map((e) => `${e.nombre} ${e.per_ntm}`).join(' · '));
