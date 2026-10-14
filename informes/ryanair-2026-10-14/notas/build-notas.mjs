// Genera las notas A-E de Ryanair (corte 2026-10-14) a partir de extractos de búsqueda web (entorno nube: solo WebSearch).
// Cada nota cita solo su propia lista de fuentes. node informes/ryanair-2026-10-14/notas/build-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, n), JSON.stringify(o, null, 2), 'utf8');
const P = 'Primaria', M = 'Datos de mercado', PR = 'Prensa', AN = 'Analistas', S = 'Sectorial', F = 'Foros y redes';

// ───────────────────────────── A. Cuentas ─────────────────────────────
const A = {
  _estado: 'completa (cuentas de extractos de búsqueda; FY22 incompleto)',
  negocio: {
    segmentos: [
      { nombre: 'Ingresos de billetes (scheduled)', descripcion: 'Tarifa media por pasajero × pasajeros.', tipo_resultado: null, historico: [
        { periodo: 'FY2026', ingresos: 10560, resultado: null },
      ] },
      { nombre: 'Ingresos complementarios (ancillary)', descripcion: 'Equipaje, asiento reservado, embarque prioritario, seguros, coches y hoteles.', tipo_resultado: null, historico: [
        { periodo: 'FY2026', ingresos: 4984.3, resultado: null },
      ] },
    ],
    geografias: null,
    kpis: [
      { kpi: 'Pasajeros (millones)', valor_anterior: '200,2 (FY25)', valor_actual: '208,4 (FY26)', variacion: '+4 %', comentario: 'Crecimiento frenado por los retrasos de Boeing (29 B-8200 pendientes) [1].' },
      { kpi: 'Tarifa media', valor_anterior: '≈ 45 € (FY25, −7 %)', valor_actual: '≈ 50 € (FY26, +10 %)', variacion: '+10 %', comentario: 'El ingreso de billetes subió un 14 % a 10.560 M [1, 15].' },
      { kpi: 'Ingreso complementario por pasajero', valor_anterior: 'n.d.', valor_actual: '≈ 24 € (FY26)', variacion: null, comentario: '[15]' },
      { kpi: 'Coste unitario sin excepcionales', valor_anterior: 'FY25', valor_actual: 'FY26: +1 %', variacion: '+1 %', comentario: 'Combustible cubierto con coberturas; FY27 80 % a 67 USD/barril [1].' },
      { kpi: 'Ocupación (load factor)', valor_anterior: '94 %', valor_actual: '94 % (1T FY27)', variacion: '0', comentario: '[8]' },
      { kpi: 'Pasajeros 1T FY27 (abr-jun 2026)', valor_anterior: '57,8 M', valor_actual: '61,3 M', variacion: '+6 %', comentario: 'Tarifa media del trimestre −6 %, a 48 € [8].' },
    ],
  },
  financieros: {
    cuenta: [
      { periodo: 'FY2022', ingresos: 4800.9, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: null, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: -240.8, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: -0.21, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: null },
      { periodo: 'FY2023', ingresos: 10775.2, coste_ventas: null, gastos_generales: null, ebitda: 2496.3, amortizaciones: 923.2, ebit: 1573.1, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 1313.8, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.16, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 1132.6 },
      { periodo: 'FY2024', ingresos: 13443.8, coste_ventas: 5142.6, gastos_generales: null, ebitda: 3120.2, amortizaciones: 1059.5, ebit: 2060.7, resultado_financiero: 67.4, bai: 2128.1, impuestos: 211.0, minoritarios: 0, beneficio_neto: 1917.1, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.6743, dpa: 0.353, dpa_extraordinario: 0, acciones_diluidas: 1145.0 },
      { periodo: 'FY2025', ingresos: 13948.5, coste_ventas: 5220.2, gastos_generales: null, ebitda: 2772.4, amortizaciones: 1214.4, ebit: 1558.0, resultado_financiero: 226.4, bai: 1784.4, impuestos: 172.8, minoritarios: 0, beneficio_neto: 1611.6, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.4549, dpa: 0.45, dpa_extraordinario: 0, acciones_diluidas: 1107.7 },
      { periodo: 'FY2026', ingresos: 15544.3, coste_ventas: null, gastos_generales: null, ebitda: 3747.6, amortizaciones: 1373.4, ebit: 2374.2, resultado_financiero: 49.1, bai: 2423.3, impuestos: 249.6, minoritarios: 0, beneficio_neto: 2173.7, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 85, bpa: 2.0422, dpa: 0.388, dpa_extraordinario: 0, acciones_diluidas: 1064.4 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 15584, ebitda: null, ebit: 2036, beneficio_neto: 1891.4, bpa: null, dpa: 0.388, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 85 },
    cambios_perimetro: [],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1T FY26', ingresos: 4340, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.77, vs_consenso: null },
      { periodo: '1T FY27', ingresos: 4380, crecimiento_pct: 1.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.52, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En el 1T FY27 (20-jul-2026) el beneficio cayó un 34 %, a 538 M, con ingresos +1 % (4.380 M), pasajeros +6 % (61,3 M) y tarifa media −6 % (48 €); los costes subieron un 11 %, a 3.810 M, y el combustible un 16 %, a 1.690 M, porque el 20 % no cubierto se pagó a ≈150 USD/barril [8, 15]. La dirección no dio guía de beneficio para FY27 («visibilidad nula del segundo semestre»): mantiene 80 % del combustible de FY27 cubierto a 67 USD y solo un 15 % de FY28 a 85 USD [8]. En mayo, con los resultados de FY26, el discurso era de récord (beneficio antes de excepcionales de 2.260 M, +40 %, tarifas +10 %) y de recompra de deuda: el último bono de 1.200 M se devolvió en mayo y el grupo queda sin deuda financiera [1, 13]. En agosto recortó el tráfico de FY27 de 216 a 214 M para reducir la exposición al combustible no cubierto del invierno [16]. Lo que no contestó: el nivel de tarifas del segundo semestre y el coste del combustible de FY28.',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: 'FY2022', activo_total: null, activo_corriente: null, pasivo_corriente: null, pasivo_total: null, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: null, deuda_financiera: null, arrendamientos: null, patrimonio_neto: null, minoritarios: 0, reservas: null },
      { periodo: 'FY2023', activo_total: 16406, activo_corriente: null, pasivo_corriente: null, pasivo_total: 10763, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 4675, deuda_financiera: 4116, arrendamientos: 0, patrimonio_neto: 5643, minoritarios: 0, reservas: null },
      { periodo: 'FY2024', activo_total: 17176, activo_corriente: null, pasivo_corriente: null, pasivo_total: 9562, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 4120, deuda_financiera: 2747, arrendamientos: 0, patrimonio_neto: 7614, minoritarios: 0, reservas: null },
      { periodo: 'FY2025', activo_total: 17507.0, activo_corriente: 6009.7, pasivo_corriente: 8152.8, pasivo_total: 10470, fondo_comercio: null, intangibles: null, inmovilizado_material: 10923.7, existencias: null, clientes: null, proveedores: 702.0, activos_contrato: null, pasivos_contrato: null, caja: 4000, deuda_financiera: 2700, arrendamientos: 0, patrimonio_neto: 7037, minoritarios: 0, reservas: null },
      { periodo: 'FY2026', activo_total: 19747.7, activo_corriente: null, pasivo_corriente: null, pasivo_total: 9646.3, fondo_comercio: null, intangibles: 146.4, inmovilizado_material: 11373.1, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 3600, deuda_financiera: 1346.6, arrendamientos: 144.9, patrimonio_neto: 10101.4, minoritarios: 0, reservas: null },
    ],
    vencimientos: [{ anio: '2026', importe: 1200 }],
    liquidez: 'Caja bruta de ≈2.800 M y caja neta de ≈2.700 M a 30-jun-2026, tras devolver en mayo el último bono de 1.200 M con caja propia [14, 8].',
    rating: 'BBB+ (S&P y Fitch)',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'El mayor pasivo de explotación son los cobros anticipados de billetes y los gastos devengados (6.179 M de «accrued expenses and other liabilities» a marzo de 2025, dentro de un pasivo corriente de 8.153 M) [4]: financian el circulante y hacen que la caja de junio sea estacionalmente alta. Hay una multa de la autoridad italiana de la competencia (AGCM) de 256 M, provisionada en un tercio (85 M, excepcional en FY26) y recurrida [1, 13]. Los derivados de combustible y divisa llevan a patrimonio la reserva de coberturas: con el petróleo caro a marzo de 2026 el patrimonio salta a 10.101 M y los derivados de activo suman ≈2.134 M [3]. Arrendamientos de solo 145 M: la flota es casi toda en propiedad.',
    comentario: 'El balance pasó de una deuda bruta de 4.116 M y caja neta de 559 M en FY23 a 1.373 M de caja neta en FY24, ≈1.300 M en FY25 y 2.100 M en FY26, con la devolución progresiva de los bonos de la pandemia [5, 12, 1]. En mayo de 2026 devolvió el último bono (1.200 M) y la deuda financiera queda prácticamente en cero; la caja bruta baja a ≈2.800 M en junio [8, 14]. Con 145 M de arrendamientos y una flota en propiedad, el grupo financia con caja propia el pedido de B737-MAX 10 [1].',
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: 'FY2022', flujo_operativo: null, capex: null, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2023', flujo_operativo: 3891.0, capex: null, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2024', flujo_operativo: 3157.9, capex: 2391.9, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 199, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2025', flujo_operativo: 3415.7, capex: 1552.5, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 437.7, recompras: 1477.8, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2026', flujo_operativo: 3694.9, capex: 1892.4, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 443.3, recompras: 536.5, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo fue de 3.891 M en FY23 (inflado por los cobros anticipados de la recuperación), 3.158 M en FY24, 3.416 M en FY25 y 3.695 M en FY26; el capex, de 2.392 M en FY24, 1.553 M en FY25 (retrasos de Boeing) y 1.892 M en FY26 [3, 9]. El FCF de FY26 queda en ≈1.800 M (estimación propia: flujo operativo menos capex), 0,83 veces el beneficio. La caja se reparte entre dividendo (443 M en FY26), recompras (1.478 M en FY25 y 537 M en FY26) y devolución de bonos [9]. El dividendo de FY24 (199 M) es estimación propia: 0,175 € de dividendo a cuenta por ≈1.140 M de acciones [5]. El capex de mantenimiento no se publica; con amortizaciones de 1.373 M, el exceso del capex (≈500 M) es crecimiento de flota.',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'KPMG',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: 'Cuentas NIIF-UE con ejercicio cerrado en marzo; los resultados anuales se publican como estados no auditados y el 20-F lleva los auditados [2, 3]. Partidas a vigilar: (1) la contabilidad de coberturas de combustible y divisa, que mueve el patrimonio (reserva de coberturas) y, cuando hay ineficacia, la cuenta (FY20); (2) los excepcionales: 85 M de provisión por la multa de la AGCM en FY26 y diferencias de 117 M entre el beneficio publicado y el «antes de excepcionales» en FY23 [6, 13]; (3) el «resultado financiero y otros» de FY25 (+226 M) mezcla intereses de la caja con otros conceptos, y cae a +49 M en FY26 [4, 2]. Los indicadores del motor (Altman, Piotroski, Beneish) salen incompletos porque el balance de FY22-FY24 no tiene desglose de circulante: no se interpretan.',
    senales: [
      { senal: 'Multa de la AGCM (abuso de posición con las agencias de viaje online)', nivel: 'Media', comentario: '256 M, provisionado un tercio (85 M) como excepcional en FY26; Ryanair recurre [1, 13].' },
      { senal: 'Patrimonio movido por la reserva de coberturas', nivel: 'Baja', comentario: 'Con el petróleo caro a marzo de 2026 los derivados de activo suben a ≈2.134 M y el patrimonio a 10.101 M; el ROE y el ROIC sobre patrimonio contable bajan sin cambio de negocio [3].' },
    ],
    confianza: 'Media',
  },
  rentabilidad: { comentario: null, confianza: 'Media' },
  capital: {
    politica: 'Dividendo ordinario semestral desde FY24 (0,175 € a cuenta y 0,178 € complementario de FY24; 0,223 € y 0,227 € de FY25; 0,193 € y 0,195 € de FY26) y recompras amortizadas: 1.478 M en FY25 (77,5 M de acciones, ≈7 % del capital) y 537 M en FY26, con un programa iniciado el 20-may-2025 que sigue en curso [5, 9, 10, 11, 17]. La prioridad declarada es pagar la flota (pedido de B737-MAX 10) con caja propia y mantener el grado de inversión (BBB+) [1, 13].',
    adquisiciones: [
      { anio: '2018', objetivo: 'Laudamotion (Austria), hasta el 100 % en 2019', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pérdidas iniciales; integrada como Lauda Europe.' },
      { anio: '2019', objetivo: 'Malta Air (creación de AOC)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Filial operativa del grupo.' },
    ],
    comentario: 'Asignador de capital disciplinado: compra aviones en los momentos bajos del ciclo (pedidos de 2014 y de 2023), los paga con caja y devuelve el sobrante. Desde 2008 ha amortizado casi un 36 % del capital emitido [10]. Las recompras de FY25 (1.478 M a ≈19 €) se hicieron por debajo del precio actual; el dividendo se paga con un 20-25 % del beneficio.',
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Ryanair 2025-26 PAT rises 40 % to €2.26bn (pre-except.): resultados de FY26', editor: 'Ryanair Holdings', tipo: P, fecha: '2026-05-18', url: 'https://investor.ryanair.com/wp-content/uploads/2026/05/FY26-Ryanair-Results.pdf' },
    { id: 2, titulo: 'Form 6-K: resultados preliminares de FY26 (estados no auditados)', editor: 'Ryanair Holdings / SEC', tipo: P, fecha: '2026-05-18', url: 'https://www.sec.gov/Archives/edgar/data/1038683/000165495426005028/a6030e.htm' },
    { id: 3, titulo: 'Form 20-F, ejercicio cerrado el 31-mar-2026', editor: 'Ryanair Holdings / SEC', tipo: P, fecha: '2026-07', url: 'https://www.sec.gov/Archives/edgar/data/1038683/000110465926076131/tmb-20260331x20f.htm' },
    { id: 4, titulo: 'Full Year FY25 Ryanair Holdings plc Earnings (RNS)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2025-05-19', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/full-year-fy25-ryanair-holdings-plc-earnings-/8883712' },
    { id: 5, titulo: 'Resultados de FY24', editor: 'Ryanair Holdings', tipo: P, fecha: '2024-05-20', url: 'https://investor.ryanair.com/wp-content/uploads/2024/05/FY24-Ryanair-Results.pdf' },
    { id: 6, titulo: 'Resultados de FY23', editor: 'Ryanair Holdings', tipo: P, fecha: '2023-05-15', url: 'https://investor.ryanair.com/wp-content/uploads/2023/05/FY23-Ryanair-Results.pdf' },
    { id: 7, titulo: 'Annual Report 2024 (balance a marzo de 2024 y 2023)', editor: 'Ryanair Holdings', tipo: P, fecha: '2024-06', url: 'https://investor.ryanair.com/wp-content/uploads/2024/06/Ryanair-2024-Annual-Report.pdf' },
    { id: 8, titulo: 'Ryanair Q1 profit falls, revenues rise; on track for FY27 traffic growth view', editor: 'RTTNews', tipo: PR, fecha: '2026-07-20', url: 'https://www.rttnews.com/3668236/ryanair-q1-profit-falls-revenues-rise-says-on-track-for-fy27-traffic-growth-view.aspx' },
    { id: 9, titulo: 'Full Year FY26 Ryanair Holdings plc Earnings (reproducción del RNS con el estado de flujos)', editor: 'Sharecast', tipo: P, fecha: '2026-05-18', url: 'https://www.sharecast.com/news/Company-Announcement-General/Full-Year-FY26-Ryanair-Holdings-plc-Earnings--dl35937756.html' },
    { id: 10, titulo: 'Annual Report 2025', editor: 'Ryanair Holdings', tipo: P, fecha: '2025-06', url: 'https://investor.ryanair.com/wp-content/uploads/2025/05/Ryanair-2025-Annual-Report.pdf' },
    { id: 11, titulo: 'Ryanair Holdings plc: final dividend for FY26 (RNS)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2026-07', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/ryanair-holdings-plc-final-dividend-for-fy26/9683975' },
    { id: 12, titulo: 'Ryanair reports PAT of €1.61bn despite 7 % lower fares (resultados de FY25)', editor: 'Ryanair Holdings', tipo: P, fecha: '2025-05-19', url: 'https://investor.ryanair.com/wp-content/uploads/2025/05/FY25-Ryanair-Results.pdf' },
    { id: 13, titulo: 'Ryanair records EUR2.3bn profit after tax for FY2026, comments on debt position and AGCM fine', editor: 'CAPA Centre for Aviation', tipo: PR, fecha: '2026-05-18', url: 'https://centreforaviation.com/news/ryanair-records-eur23bn-profit-after-tax-for-fy2026-comments-on-debt-position-and-agcm-fine-1359638' },
    { id: 14, titulo: 'Form 6-K: resultados del 1T FY27 (resumen)', editor: 'Stock Titan', tipo: PR, fecha: '2026-07-20', url: 'https://www.stocktitan.net/sec-filings/RYAAY/6-k-ryanair-holdings-plc-current-report-foreign-issuer-c4a875c9ad4c.html' },
    { id: 15, titulo: 'Ryanair full year results shows average fare €50 & ancillary revenue €24 per passenger', editor: 'Travel Extra', tipo: PR, fecha: '2026-05-18', url: 'https://www.travelextra.ie/ryanair-reprots-profit-rise-of-40pc/' },
    { id: 16, titulo: "Ryanair's Aug traffic grows 6 % to 22.2m; FY27 traffic cut from 216m to 214m", editor: 'Ryanair Holdings', tipo: P, fecha: '2026-09-02', url: 'https://corporate.ryanair.com/news/ryanairs-aug-traffic-grows-6-to-22-2m-fy27-traffic-cut-from-216m-to-214m-to-reduce-exposure-to-unhedged-winter-oil/' },
    { id: 17, titulo: 'Transaction in own shares (7-11 sep 2026)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2026-09-14', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/transaction-in-own-shares/9770240' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'cuenta FY2022 (EBIT, amortización, impuestos)', tipo: 'Núcleo', intentos: '1) Resultados de FY23 con el comparativo (búsqueda: solo ingresos, beneficio y BPA); 2) 20-F FY22 y agregadores (TipRanks, Yahoo: cifras discrepantes); 3) derivar del FY23: no hay base', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'coste de combustible de FY26 y gastos financieros brutos', tipo: 'Complemento', intentos: '1) Resultados de FY26 (extractos sin la línea); 2) 20-F FY26 (no abre); 3) prensa (solo el total de costes, 13.090 M)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'circulante desglosado FY22-FY24 y FY26', tipo: 'Núcleo', intentos: '1) Informes anuales 2024-2026 (extractos solo con totales); 2) agregadores de balance (Stock Analysis, Simply Wall St: no abren); 3) derivar: no hay datos', decision: 'Omitido; caja y deuda de los comunicados (caja bruta y caja neta)' },
  ],
};

// ───────────────────────────── B. Sector y competencia ─────────────────────────────
const B = {
  historia: {
    resumen: 'Fundada en 1984 por la familia Ryan como aerolínea regional irlandesa, se reconvirtió en 1991-92 en la primera aerolínea de bajo coste europea copiando a Southwest, con Michael O\'Leary al frente desde 1994. Cotiza desde 1997 (Dublín y Nasdaq). Creció con la liberalización del cielo europeo, una flota única de Boeing 737 y aeropuertos secundarios. En 2018-19 pasó a grupo de cuatro aerolíneas (Ryanair DAC, Buzz, Lauda Europe y Malta Air) [1, 3]. Tras la pandemia volvió a beneficios en FY23 y en 2025 fue la primera aerolínea europea en transportar 200 M de pasajeros en un año [2, 3].',
    hitos: [
      { anio: '1984', hito: 'Fundación por la familia Ryan.' },
      { anio: '1992', hito: 'Reconversión al modelo de bajo coste.' },
      { anio: '1997', hito: 'Salida a bolsa en Dublín y Nasdaq.' },
      { anio: '2014', hito: 'Pedido de 100 B737-MAX 8200 (más opciones), comprado en la parte baja del ciclo.' },
      { anio: '2019', hito: 'Estructura de grupo con Buzz, Lauda Europe y Malta Air.' },
      { anio: '2021', hito: 'Pérdida de 1.015 M en FY21 por la pandemia.' },
      { anio: '2023', hito: 'Pedido de hasta 300 B737-MAX 10 (150 en firme) para crecer hasta 300 M de pasajeros en FY34 [3].' },
      { anio: '2025', hito: 'Primera aerolínea europea con 200 M de pasajeros en un año [2].' },
      { anio: '2026', hito: 'Devuelve el último bono (1.200 M) y queda sin deuda financiera; guerra con Irán y petróleo caro [4].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Grupo de aerolíneas de bajo coste de corto radio con ≈600 aviones Boeing 737 en propiedad, que vuela entre más de 200 aeropuertos de Europa y el norte de África. Vende sobre todo directo (web y aplicación), sin conexiones ni clase business. Cuatro certificados de operador: Ryanair DAC, Buzz (Polonia), Lauda Europe (Malta/Austria) y Malta Air [1, 3]. En FY26 transportó 208,4 M de pasajeros, con una ocupación del 94 % [5].',
    como_gana_dinero: 'Ingresos de 15.544 M en FY26: un 68 % de billetes (10.560 M, tarifa media de ≈50 €) y un 32 % de servicios complementarios (≈24 € por pasajero) [5]. El margen depende del coste unitario más bajo de Europa (avión en propiedad comprado barato, alta densidad de asientos, aeropuertos con incentivos) y de la tarifa, que se mueve con la oferta del mercado. El combustible pesa ≈38-40 % de los costes (5.220 M en FY25) y se cubre 12-18 meses por delante. Muy estacional: casi todo el beneficio se gana en abril-septiembre y el cuarto trimestre (ene-mar) da pérdidas [1, 6].',
    clientes: 'Cliente particular, sin concentración. Poder de precios limitado y cíclico: la tarifa media cayó un 7 % en FY25 y subió un 10 % en FY26; en el 1T FY27 bajó un 6 % con la guerra con Irán [5, 6]. La ventaja no está en el precio sino en el coste: con la tarifa más baja del mercado llena el 94 % de los asientos.',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Transporte aéreo de pasajeros dentro de Europa (UE más Reino Unido y vecinos), en el segmento de corto radio donde opera Ryanair. Se usa el número de pasajeros de Eurostat (1.093,6 M en la UE en 2025, +3,9 %) como medida de volumen; no hay una cifra pública fiable del mercado en euros [7].',
    tamano: '≈ 1.094 M de pasajeros en la UE en 2025 (Eurostat vía prensa) [7]',
    unidad_serie: null,
    serie: [],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Oferta de aviones (retrasos de Boeing y Airbus)', efecto: '+', horizonte: 'Estructural', evidencia: 'Los retrasos limitan la capacidad europea y sostienen las tarifas; a Ryanair le faltaron 29 B-8200 en FY26 [5].' },
      { driver: 'Precio del combustible', efecto: '−', horizonte: 'Cíclico', evidencia: 'El 20 % no cubierto se pagó a ≈150 USD/barril en el 1T FY27; IATA recortó el beneficio europeo de 2026 a 9.600 M USD (margen neto 3,1 %) [4, 8].' },
      { driver: 'Demanda de ocio y precio del billete', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Tarifa −7 % en FY25, +10 % en FY26 y −6 % en el 1T FY27 [5].' },
      { driver: 'Debilidad de competidores (Wizz con pérdidas, consolidación)', efecto: '+', horizonte: 'Estructural', evidencia: 'Wizz Air con BPA negativo en 2026-27 según Goodbody [9].' },
      { driver: 'Tasas e impuestos al transporte aéreo (Reino Unido, Alemania, Italia)', efecto: '−', horizonte: 'Estructural', evidencia: 'Ryanair recorta capacidad donde suben las tasas [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Guerra de tarifas cíclica; la tarifa media de Ryanair cayó un 7 % en FY25 [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Cliente particular que compara precio en segundos; coste de cambio nulo.' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Duopolio Boeing-Airbus con retrasos; aeropuertos regulados; combustible.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Falta de aviones y de franjas horarias; entrantes recientes con pérdidas.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Tren de alta velocidad en rutas cortas concretas; poco en el resto.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Después de dos años de tarifas altas por falta de aviones, la guerra con Irán (desde finales de febrero de 2026) disparó el combustible y frenó las tarifas: las acciones del sector europeo cayeron un 16 % y las de Ryanair un 13 % [10]. En 2008-09 Ryanair tuvo su única pérdida anual antes de la pandemia; en 2020-22 perdió 1.015 M y 241 M; en 2022 el combustible caro se compensó con la demanda reprimida.' },
    regulacion: 'La AGCM italiana multó a Ryanair con 256 M por su relación con las agencias de viaje online (recurrida) [11]. Impuestos al pasajero al alza en Reino Unido, Alemania e Italia; el sistema europeo de comercio de emisiones encarece cada año los derechos gratuitos que desaparecen en 2026.',
    tendencias: 'Las aerolíneas de bajo coste siguen ganando cuota a las tradicionales en Europa [12]. Ryanair amplió su ventaja: 206,4 M de pasajeros en 2025 frente a 135,0 M de Lufthansa Group, y un 117 % más que easyJet [2, 12]. La renovación de flota con el MAX 10 (un 21 % más de asientos y menos consumo) baja el coste unitario a partir de 2027.',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: 19,
    posicion: '1.º grupo aéreo de Europa por pasajeros (206,4 M en 2025) [2]; ≈19 % de los pasajeros de la UE (estimación propia: 206,5 M sobre 1.093,6 M de Eurostat, con perímetros no idénticos) [7].',
    competidores: [
      { nombre: 'Lufthansa Group', pais: 'Alemania', ticker: 'LHA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: '135,0 M de pasajeros en 2025; red y largo radio [2].' },
      { nombre: 'IAG (Vueling, BA, Iberia, Aer Lingus)', pais: 'Reino Unido/España', ticker: 'IAG', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bajo coste con Vueling; beneficio sostenido por el Atlántico Norte.' },
      { nombre: 'Air France-KLM (Transavia)', pais: 'Francia/Países Bajos', ticker: 'AF', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bajo coste con Transavia.' },
      { nombre: 'easyJet', pais: 'Reino Unido', ticker: 'EZJ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo bajo coste; aeropuertos principales y paquetes turísticos [12].' },
      { nombre: 'Wizz Air', pais: 'Hungría', ticker: 'WIZZ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Pérdidas en 2026-27 (motores Pratt & Whitney, Oriente Medio) [9].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red punto a punto sin conexiones; la densidad de rutas da poder de negociación con aeropuertos, no efectos de red sobre el cliente.' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'Nulos para el pasajero.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Marca asociada a precio bajo; franjas horarias en algunos aeropuertos.' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Coste unitario más bajo de Europa: flota única en propiedad comprada con descuento, 94 % de ocupación; gana dinero con una tarifa media de ≈50 € [5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Primer grupo europeo por pasajeros (206 M) con un 117 % más que easyJet; poder de compra ante Boeing y aeropuertos [2, 12].' },
      ],
    },
    amenazas: 'Un periodo largo de combustible caro sin coberturas (FY28 solo cubierto al 15 % a 85 USD) [4]; retrasos de Boeing con el MAX 10 (certificación pendiente) que frenen el plan de 300 M de pasajeros; impuestos al transporte aéreo y costes del comercio de emisiones; y la regulación de la competencia (AGCM) sobre su relación con las agencias online.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El asunto material es el CO₂: el combustible es ≈40 % del coste y el comercio de emisiones europeo encarece cada año la tonelada, con la retirada de los derechos gratuitos en 2026. La renovación de flota (MAX 8200 y MAX 10, con un 16-20 % menos de consumo por asiento) es la palanca principal. El segundo, las relaciones laborales (huelgas de tripulantes de 2018-19).',
    controversias: 'Multa de la AGCM de 256 M (2025-26), recurrida [11]. Revuelta de accionistas por la remuneración de O\'Leary en la junta de 2026 (39 % en contra de la política) [13].',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Form 20-F, ejercicio cerrado el 31-mar-2026', editor: 'Ryanair Holdings / SEC', tipo: P, fecha: '2026-07', url: 'https://www.sec.gov/Archives/edgar/data/1038683/000110465926076131/tmb-20260331x20f.htm' },
    { id: 2, titulo: "Europe's top 20 airline groups by passengers 2025: Ryanair extends its lead over Lufthansa Group", editor: 'CAPA Centre for Aviation', tipo: S, fecha: '2026-01', url: 'https://centreforaviation.com/analysis/reports/europes-top-20-airline-groups-by-passengers-2025-ryanair-extends-its-lead-over-lufthansa-group-740504' },
    { id: 3, titulo: 'Ryanair: objetivo de 300 M de pasajeros en 2034 tras superar los 200 M', editor: 'Economedia', tipo: PR, fecha: '2025-06', url: 'https://economedia.ro/ryanair-a-devenit-prima-companie-aeriana-europeana-care-a-transportat-200-de-milioane-de-pasageri-intr-un-an-avem-drept-obiectiv-sa-ajungem-la-300-de-milioane-de-pasageri-pana-in-2034.html' },
    { id: 4, titulo: 'Ryanair Q1 FY27: fuel spike drags profits', editor: 'Edison Group', tipo: AN, fecha: '2026-07-20', url: 'https://www.edisongroup.com/spark/ryanair-lserya-fuel-spike-drags-profits/' },
    { id: 5, titulo: 'Ryanair full year results shows average fare €50 & ancillary revenue €24 per passenger', editor: 'Travel Extra', tipo: PR, fecha: '2026-05-18', url: 'https://www.travelextra.ie/ryanair-reprots-profit-rise-of-40pc/' },
    { id: 6, titulo: 'Full Year FY25 Ryanair Holdings plc Earnings (RNS)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2025-05-19', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/full-year-fy25-ryanair-holdings-plc-earnings-/8883712' },
    { id: 7, titulo: 'EU commercial air traffic recovers to near pre-pandemic levels in 2025 (datos de Eurostat)', editor: 'Cyprus Mail', tipo: PR, fecha: '2026-09-06', url: 'https://cyprus-mail.com/2026/09/06/eu-commercial-air-traffic-recovers-to-near-pre-pandemic-levels-in-2025' },
    { id: 8, titulo: 'European airline stocks retreat after IATA slashes 2026 industry profit outlook', editor: 'Yahoo Finance UK', tipo: PR, fecha: '2026-06', url: 'https://uk.finance.yahoo.com/news/european-airline-stocks-retreat-iata-103734722.html' },
    { id: 9, titulo: 'GBS Estimates (16-abr-2026)', editor: 'Goodbody', tipo: AN, fecha: '2026-04-16', url: 'https://www.goodbody.ie/documents/GBS-Estimates-170426.pdf' },
    { id: 10, titulo: "Are Ryanair's shares a 'bargain' as some analysts suggest?", editor: 'The Irish Times', tipo: PR, fecha: '2026-05-23', url: 'https://www.irishtimes.com/your-money/2026/05/23/bullish-michael-oleary-tells-ryanair-investors-heres-the-dip/' },
    { id: 11, titulo: 'Ryanair records EUR2.3bn profit after tax for FY2026, comments on debt position and AGCM fine', editor: 'CAPA Centre for Aviation', tipo: PR, fecha: '2026-05-18', url: 'https://centreforaviation.com/news/ryanair-records-eur23bn-profit-after-tax-for-fy2026-comments-on-debt-position-and-agcm-fine-1359638' },
    { id: 12, titulo: 'European airlines: top 12 LCCs further grew their passenger lead versus non-LCCs in 2025', editor: 'CAPA Centre for Aviation', tipo: S, fecha: '2026-01', url: 'https://centreforaviation.com/analysis/reports/european-airlines-top-12-lccs-further-grew-their-passenger-lead-versus-non-lccs-in-2025-740921' },
    { id: 13, titulo: 'AGM Statement (resultados de las votaciones de la junta de 2026)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2026-09-10', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/agm-statement-/9766116' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'serie y tamaño del mercado en euros', tipo: 'Núcleo', intentos: '1) Eurostat (solo pasajeros, vía prensa); 2) IATA y CAPA (beneficio del sector, no ingresos de corto radio europeo); 3) derivar de pasajeros × tarifa: sin tarifa media del mercado', decision: 'Omitido; se usa el volumen de pasajeros' },
    { seccion: 'competencia', campo: 'ingresos y margen EBIT de los competidores', tipo: 'Núcleo', intentos: '1) Informes anuales de easyJet, IAG, Lufthansa (no abren); 2) agregadores (Stockopedia, TipRanks: múltiplos, no márgenes); 3) prensa sectorial: sin cifras homogéneas', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) MSCI y Sustainalytics (no abren); 2) informe de sostenibilidad (no abre); 3) prensa: nada', decision: 'Omitido' },
  ],
};

// ───────────────────────────── C. Equipo y gobierno ─────────────────────────────
const C = {
  directivos: {
    equipo: [
      { nombre: "Michael O'Leary", cargo: 'Consejero delegado del grupo', desde: '1994', participacion_pct: 4.05, trayectoria: 'Director financiero desde 1988, consejero delegado de Ryanair desde 1994 y del grupo desde 2019. Llevó la aerolínea de ≈1 M a 208 M de pasajeros. Contrato ampliado hasta abril de 2032 [3, 4].' },
      { nombre: 'Stan McCarthy', cargo: 'Presidente no ejecutivo', desde: '2020', participacion_pct: null, trayectoria: 'Ex consejero delegado de Kerry Group. Negoció con los grandes accionistas la ampliación del contrato de O\'Leary [3].' },
    ],
    historial_guidance: [
      { anio: 'FY2025', guia: 'Tráfico de ≈200 M de pasajeros', real: '200,2 M', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Tráfico de 210 M (tras recortar desde 215 M por Boeing)', real: '208,4 M', cumplida: 'Parcial' },
      { anio: 'FY2027', guia: 'Tráfico de 216 M (mayo), recortado a 214 M (septiembre); sin guía de beneficio', real: 'En curso', cumplida: 'Parcial' },
    ],
    comentario: "O'Leary lleva 32 años al frente y ha firmado hasta 2032: la sucesión no es un riesgo a corto plazo, pero sí la dependencia de una persona. La guía se limita al tráfico y a veces a una horquilla de beneficio muy amplia; se recorta cuando Boeing se retrasa (215 → 210 M en FY26, 216 → 214 M en FY27) [5, 6].",
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Stan McCarthy', cargo: 'Presidente', tipo: 'Independiente', desde: '2017', comisiones: 'Nombramientos' },
      { nombre: "Michael O'Leary", cargo: 'Consejero delegado del grupo', tipo: 'Ejecutivo', desde: '1988', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 61, voto_remuneracion_contra_pct: 39, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: "La junta del 10-sep-2026 aprobó la nueva política con solo un 61 % a favor (un 39 % en contra, con ISS y PIRC en contra) y el informe de remuneración con un 86 % [1, 2]. El centro es una opción sobre 10 M de acciones (≈1 % del capital) que solo se ejerce si O'Leary sigue hasta abril de 2032 y el grupo gana más de 4.000 M o la acción supera los 42 € durante 28 días seguidos; la prensa la valora en más de 150 M [2, 7]. El umbral de precio premia también un ciclo alcista del sector, la crítica de los asesores de voto.",
    accionistas: [
      { nombre: "Michael O'Leary", pct: 4.05, tipo: 'Consejero', variacion: 'Vendió ≈21 M € de acciones en 2025 [8]' },
    ],
    insiders: [],
    control_y_defensas: "Sin accionista de control: O'Leary tiene ≈4 % [8]. Como aerolínea de la UE, los estatutos permiten limitar los derechos de los accionistas no comunitarios para conservar la licencia: tras el Brexit los accionistas del Reino Unido y los tenedores de ADR no votan, por eso no rige «una acción, un voto». Recompra continua de acciones que se amortizan [9].",
    alertas: [
      "Voto en contra del 39 % de la política de remuneración en la junta de 2026 [1].",
      'Multa de la AGCM italiana de 256 M, recurrida [10].',
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'AGM Statement (resultados de las votaciones de la junta de 2026)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2026-09-10', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/agm-statement-/9766116' },
    { id: 2, titulo: "Ryanair shareholders approve O'Leary's €150 million package despite major revolt", editor: 'Aviation A2Z', tipo: PR, fecha: '2026-09-12', url: 'https://aviationa2z.com/index.php/2026/09/12/ryanair-shareholders-approve-olearys-e150-million-package-despite-major-revolt/' },
    { id: 3, titulo: "Michael O'Leary to head Ryanair for another six years under new contract", editor: 'Kildare Nationalist (PA)', tipo: PR, fecha: '2026-06', url: 'https://www.kildare-nationalist.ie/news/michael-oleary-to-head-ryanair-for-another-six-years-under-new-contract_arid-102293.html' },
    { id: 4, titulo: 'Ryanair hands O\'Leary six-year extension', editor: 'City A.M.', tipo: PR, fecha: '2026-06', url: 'https://www.cityam.com/ryanair-hands-oleary-six-year-extension/' },
    { id: 5, titulo: 'Ryanair carried 206.5m passengers in 2025, annual growth 4.5pc lowest since 2013', editor: 'Travel Extra', tipo: PR, fecha: '2026-01', url: 'https://www.travelextra.ie/?p=102944' },
    { id: 6, titulo: "Ryanair's Aug traffic grows 6 % to 22.2m; FY27 traffic cut from 216m to 214m", editor: 'Ryanair Holdings', tipo: P, fecha: '2026-09-02', url: 'https://corporate.ryanair.com/news/ryanairs-aug-traffic-grows-6-to-22-2m-fy27-traffic-cut-from-216m-to-214m-to-reduce-exposure-to-unhedged-winter-oil/' },
    { id: 7, titulo: "Michael O'Leary dismisses investor concerns over his pay", editor: 'The Irish Times', tipo: PR, fecha: '2026-09-24', url: 'https://www.irishtimes.com/business/2026/09/24/michael-oleary-dismisses-investor-concerns-over-his-pay/' },
    { id: 8, titulo: "Michael O'Leary: participación en Ryanair (42,2 M de acciones, 4,05 %, a 31-mar-2026)", editor: 'MarketScreener', tipo: M, fecha: '2026-03-31', url: 'https://sa.marketscreener.com/insider/MICHAEL-OLEARY-A1P3C8/' },
    { id: 9, titulo: 'Transaction in own shares (7-11 sep 2026)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2026-09-14', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/transaction-in-own-shares/9770240' },
    { id: 10, titulo: 'Ryanair records EUR2.3bn profit after tax for FY2026, comments on debt position and AGCM fine', editor: 'CAPA Centre for Aviation', tipo: PR, fecha: '2026-05-18', url: 'https://centreforaviation.com/news/ryanair-records-eur23bn-profit-after-tax-for-fy2026-comments-on-debt-position-and-agcm-fine-1359638' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones y remuneración devengada del primer ejecutivo', tipo: 'Núcleo', intentos: '1) Informe anual 2026 (no abre); 2) 20-F FY26, Item 6 (no abre); 3) prensa (solo presidente, consejero delegado y votos de la junta)', decision: 'Omitido; consejo con los dos cargos comprobados' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de 12 meses y accionistas significativos', tipo: 'Complemento', intentos: '1) RNS de «PDMR dealings» (no aparecen en búsqueda); 2) MarketScreener (solo O\'Leary); 3) prensa: venta de 2025', decision: 'Omitido' },
  ],
};

// ───────────────────────────── D. Mercado y valoración ─────────────────────────────
const D = {
  identificacion: {
    nombre: 'Ryanair Holdings plc', nombre_corto: 'Ryanair', ticker: 'RYA', isin: 'IE00BYTBXV33', mercado: 'Euronext Dublín (también Nasdaq: ADR RYAAY = 2 acciones)', indice_referencia: 'ISEQ 20 / Euro Stoxx',
    pais: 'Irlanda', pais_iso: 'IE', sector: 'Industria', industria: 'Aerolíneas', sede: 'Swords (Dublín)', fundacion: '1984', empleados: null, web: 'investor.ryanair.com',
    precio: 24.16, fecha_precio: '2026-10-09', acciones: 1044.7, capitalizacion_publicada: 25200, free_float_pct: null,
    max_52s: null, min_52s: null, volumen_medio_diario: null, proximos_resultados: '2026-11-02',
  },
  consenso: {
    guidance: 'Sin guía de beneficio para FY27: la dirección alega visibilidad nula del segundo semestre y la volatilidad del combustible [1]. Tráfico de 214 M de pasajeros (+3 %), recortado desde 216 M en septiembre [2]. Combustible de FY27 cubierto al 80 % a 67 USD/barril y de FY28 al 15 % a 85 USD [1]. Objetivo a medio plazo: 300 M de pasajeros en FY34 con el pedido de B737-MAX 10 [3].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: null, ebitda: null, ebit: null, bpa: 1.72, dpa: null, fuente: 'Stock Analysis (S&P Global, 19 analistas: media 1,70 €, 1,50-1,85) y Simply Wall St (1,75 €) [4, 5]' },
      { periodo: 'FY2028e', ingresos: null, ebitda: null, ebit: null, bpa: null, fuente: 'Sin consenso en euros; Erste: 4,42 USD por ADR (≈1,98 € por acción) [6]' },
    ],
    recomendaciones: { n_analistas: 6, comprar: null, mantener: null, vender: null, po_medio: 30.17, po_min: 26.10, po_max: 33.52 },
    revisiones: 'Recortes desde mayo: RBC bajó el EBIT de FY27-FY29 un 16 % y el objetivo de 31 a 29 € tras los resultados de FY26 [7]; Erste recortó el BPA de FY27 de 4,51 a 3,96 USD por ADR y el de FY28 de 4,64 a 4,42 USD tras el 1T [6, 8]; el BPA de FY27 del consenso bajó de 1,93 a 1,75 € [5]. Motivo: combustible no cubierto y tarifas más bajas por la guerra con Irán. Los objetivos de los analistas se dan en USD por ADR (media de 67,52 USD, de 58,40 a 75,00, seis analistas) y se convierten a euros por acción con el BCE (1,1188) y la relación de 2 acciones por ADR [4, 9].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [{ periodo: 'En el año', accion_pct: -19.9, indice_pct: null, sector_pct: null }],
    anual: [],
    beta: null, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null,
    comentario: 'La acción cae un 19,9 % en el año (cierre de 23,79 € tras el tráfico de septiembre) [10]: desde el ataque de EE. UU. e Israel a Irán a finales de febrero cayó hasta un 12,9 %, menos que el sector europeo (−16,3 %) [11]; perdió un 7 % el día del 1T FY27 (24,11 €) y tocó ≈22,4-22,9 € a principios de septiembre (precios medios de la recompra) [12, 13]. Repuntó un 2,3 % el 25-sep, a 23,24 €, con el alivio del petróleo [14].',
    confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2022', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2023', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2024', precio_cierre: 17.89, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 19.66, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 23.99, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'IAG', ticker: 'IAG', pais: 'ES', capitalizacion: 23060, ev_ventas: null, ev_ebitda_ltm: 3.5, ev_ebitda_ntm: null, per_ntm: 7.2, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Lufthansa', ticker: 'LHA', pais: 'DE', capitalizacion: 9220, ev_ventas: null, ev_ebitda_ltm: 7.9, ev_ebitda_ntm: 7.5, per_ntm: 7.4, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Air France-KLM', ticker: 'AF', pais: 'FR', capitalizacion: 3020, ev_ventas: null, ev_ebitda_ltm: 3.5, ev_ebitda_ntm: 3.4, per_ntm: 2.4, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Jet2', ticker: 'JET2', pais: 'GB', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 10.6, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'easyJet', ticker: 'EZJ', pais: 'GB', capitalizacion: 6030, ev_ventas: null, ev_ebitda_ltm: 3.5, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Wizz Air', ticker: 'WIZZ', pais: 'GB', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: 9.2, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'Ryanair Q1 profit falls, revenues rise; on track for FY27 traffic growth view', editor: 'RTTNews', tipo: PR, fecha: '2026-07-20', url: 'https://www.rttnews.com/3668236/ryanair-q1-profit-falls-revenues-rise-says-on-track-for-fy27-traffic-growth-view.aspx' },
    { id: 2, titulo: "Ryanair's Aug traffic grows 6 % to 22.2m; FY27 traffic cut from 216m to 214m", editor: 'Ryanair Holdings', tipo: P, fecha: '2026-09-02', url: 'https://corporate.ryanair.com/news/ryanairs-aug-traffic-grows-6-to-22-2m-fy27-traffic-cut-from-216m-to-214m-to-reduce-exposure-to-unhedged-winter-oil/' },
    { id: 3, titulo: 'Ryanair: objetivo de 300 M de pasajeros en 2034', editor: 'Economedia', tipo: PR, fecha: '2025-06', url: 'https://economedia.ro/ryanair-a-devenit-prima-companie-aeriana-europeana-care-a-transportat-200-de-milioane-de-pasageri-intr-un-an-avem-drept-obiectiv-sa-ajungem-la-300-de-milioane-de-pasageri-pana-in-2034.html' },
    { id: 4, titulo: 'Ryanair Holdings (RYAAY): previsiones y objetivos de los analistas', editor: 'Stock Analysis', tipo: M, fecha: '2026-10-09', url: 'https://stockanalysis.com/stocks/ryaa.y/forecast/' },
    { id: 5, titulo: 'Ryanair: previsión de BPA estatutario de FY27 (1,75 €, antes 1,93 €)', editor: 'Simply Wall St vía Webull', tipo: AN, fecha: '2026-07', url: 'https://www.webull.com/news/15274863595643904' },
    { id: 6, titulo: 'Ryanair FY2028 EPS forecast decreased by Erste Group Bank', editor: 'MarketBeat', tipo: AN, fecha: '2026-07-29', url: 'https://www.marketbeat.com/instant-alerts/ryanair-fy2028-eps-forecast-decreased-by-erste-group-bank-2026-07-29/' },
    { id: 7, titulo: 'Ryanair price target declines as RBC lowers estimates post FY26 results', editor: 'Placera (Midnight Trader)', tipo: AN, fecha: '2026-05-19', url: 'https://www.placera.se/telegram/ryanair-price-target-declines-as-rbc-lowers-estimates-post-fy26-results-20260519' },
    { id: 8, titulo: 'FY2027 EPS estimates for Ryanair cut by Erste Group Bank', editor: 'MarketBeat', tipo: AN, fecha: '2026-07-30', url: 'https://www.marketbeat.com/instant-alerts/fy2027-eps-estimates-for-ryanair-cut-by-erste-group-bank-2026-07-30/' },
    { id: 9, titulo: 'Tipos de cambio de referencia del euro (EUR/USD 1,1188; EUR/GBP 0,8446; 13-oct-2026)', editor: 'Banco Central Europeo', tipo: M, fecha: '2026-10-13', url: 'https://www.ecb.europa.eu/stats/shared/pdf/eurofxref.pdf' },
    { id: 10, titulo: 'Ryanair Holdings (ISE:RYA) could be 17 % below fair value after September traffic update', editor: 'Simply Wall St vía Webull', tipo: M, fecha: '2026-10-02', url: 'https://www.webull.com/news/15692749962953728' },
    { id: 11, titulo: "Are Ryanair's shares a 'bargain' as some analysts suggest?", editor: 'The Irish Times', tipo: PR, fecha: '2026-05-23', url: 'https://www.irishtimes.com/your-money/2026/05/23/bullish-michael-oleary-tells-ryanair-investors-heres-the-dip/' },
    { id: 12, titulo: 'Ryanair stock drops on weak Q1 profit, sees traffic growth ahead', editor: 'RTTNews', tipo: PR, fecha: '2026-07-20', url: 'https://www.rttnews.com/amp/3668319/ryanair-stock-drops-on-weak-q1-profit-sees-traffic-growth-ahead.aspx' },
    { id: 13, titulo: 'Transaction in own shares (7-11 sep 2026: precio medio 22,44-22,94 €)', editor: 'Ryanair Holdings / Investegate', tipo: P, fecha: '2026-09-14', url: 'https://www.investegate.co.uk/announcement/rns/ryanair-holdings-cdi---0rya/transaction-in-own-shares/9770240' },
    { id: 14, titulo: 'Ryanair stock rises 2.29 percent on oil relief', editor: 'AD HOC NEWS', tipo: PR, fecha: '2026-09-25', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/ryanair-stock-rises-2-29-percent-on-oil-relief/70191729' },
    { id: 15, titulo: 'Ryanair Holdings plc (RYA.IR): cotización en Euronext Dublín (24,16 €; capitalización ≈25.200 M)', editor: 'roic.ai', tipo: M, fecha: '2026-10', url: 'https://www.roic.ai/quote/RYA.IR' },
    { id: 16, titulo: 'Total voting rights: 1.035.847.831 acciones a 30-sep-2026, sin autocartera', editor: 'Ryanair Holdings / LSE RNS', tipo: P, fecha: '2026-10-01', url: 'https://www.lse.co.uk/rns/0RYA/total-voting-rights-usfiycnmm5pk5tf.html' },
    { id: 17, titulo: 'Ryanair Holdings plc (RYAAY): precio del ADR de 54,04 USD (9-oct-2026) y objetivo medio', editor: 'Bullstory', tipo: M, fecha: '2026-10-09', url: 'https://bullstory.io/en/stocks/ryaay/forecast/upside' },
    { id: 18, titulo: 'Transaction in own shares (marzo de 2026: 23,99 € el 31-mar)', editor: 'Ryanair Holdings / Stockopedia (RNS)', tipo: P, fecha: '2026-04-06', url: 'https://www-proxy.stockopedia.com/share-prices/ryanair-holdings-ISE:RYA/news/reg-ryanair-holdings-plc-ryanair-holdings-rya-transaction-in-own-shares-urn:newsml:reuters.com:20260323:nRSW6978Xa' },
    { id: 19, titulo: 'Transaction in own shares (24-28 mar 2025: 19,66 € el 28-mar)', editor: 'Ryanair Holdings / Shares Magazine (RNS)', tipo: P, fecha: '2025-03-31', url: 'https://sharesmagazine.co.uk/news/market/LSE20250331091302_5596476/transaction-in-own-shares' },
    { id: 20, titulo: 'Transaction in own shares (21-may-2024: 17,89 €)', editor: 'Ryanair Holdings / MFN (RNS)', tipo: P, fecha: '2024-05-22', url: 'https://mfn.se/rns/a/ryanair-holdings/transaction-in-own-shares-a5f6e39b' },
    { id: 21, titulo: 'International Consolidated Airlines Group (FRA:INR): PER previsto 7,15 y capitalización 23.060 M €', editor: 'Stock Analysis', tipo: M, fecha: '2026-07-17', url: 'https://stockanalysis.com/quote/fra/INR/' },
    { id: 22, titulo: 'GBS Estimates (4-sep-2026): Lufthansa, Air France-KLM y Jet2', editor: 'Goodbody', tipo: AN, fecha: '2026-09-04', url: 'https://www.goodbody.ie/documents/GBS-Estimates-040926.pdf' },
    { id: 23, titulo: 'GBS Estimates (16-abr-2026): Wizz Air', editor: 'Goodbody', tipo: AN, fecha: '2026-04-16', url: 'https://www.goodbody.ie/documents/GBS-Estimates-170426.pdf' },
    { id: 24, titulo: 'easyJet (LON:EZJ): capitalización de 5.090 M GBP y EV/EBITDA de 3,54', editor: 'Stockopedia', tipo: M, fecha: '2026-07', url: 'https://www.stockopedia.com/share-prices/easy-jet-LON:EZJ/' },
    { id: 25, titulo: 'Airlines valuation multiples (EV/EBITDA de los últimos 12 meses)', editor: 'Multiples.vc', tipo: M, fecha: '2026-09', url: 'https://multiples.vc/airlines-valuation-multiples' },
    { id: 26, titulo: 'Rendimiento del Bund alemán a 10 años (3,53 %, 12-oct-2026)', editor: 'Deutsche Bundesbank', tipo: M, fecha: '2026-10-12', url: 'https://www.bundesbank.de/en/statistics/money-and-capital-markets/interest-rates-and-yields' },
    { id: 27, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran, NYU Stern', tipo: M, fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: [
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026', tipo: 'Núcleo', intentos: '1) Euronext Dublín y Yahoo (no abren); 2) RNS de recompra de octubre (no indexados); 3) cotización sin fecha de roic.ai (24,16 €) contrastada con el ADR del 9-oct (54,04 USD ÷ 2 ÷ 1,1188 = 24,15 €)', decision: 'Calculado y marcado como estimación: 24,16 € a 9-oct-2026' },
    { seccion: 'transacciones', campo: 'sección completa', tipo: 'Complemento', intentos: '1) Operaciones de aerolíneas europeas (ITA, SAS, TAP, Air Europa): sin múltiplos publicados en búsqueda; 2) prensa sectorial: importes de participaciones minoritarias; 3) derivar: sin EBITDA de los objetivos', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad y caída máxima', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) Yahoo y Investing (no abren); 3) prensa: solo la rentabilidad del año', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'precios de cierre FY2019-FY2024', tipo: 'Complemento', intentos: '1) Históricos de Yahoo/Investing (no abren); 2) RNS de recompras de marzo de cada año (solo 2025 y 2026; en 2024 el programa empezó en mayo); 3) informes anuales: sin cotización de cierre en los extractos', decision: 'FY2024 con el precio medio de la recompra del 21-may-2024 (tras resultados); FY2019-FY2023 omitidos' },
  ],
};

// ───────────────────────────── E. Sentimiento ─────────────────────────────
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'The Irish Times (Your Money, con debate de lectores)', fecha: '2026-05', n_comentarios: 20, tono: 'Dividido', resumen: "O'Leary pidió comprar «en la caída»; Morningstar ve a Ryanair ganando cuota a rivales peor cubiertos, BofA llama «injustificada» la valoración y otros ven exagerada la etiqueta de ganga [1]." },
      { plataforma: 'AJ Bell (comentario para inversores particulares)', fecha: '2026-07', n_comentarios: 10, tono: 'Negativo', resumen: 'Tras el 1T FY27 el foco es la falta de guía de beneficio y la presión de la guerra con Irán sobre tarifas y costes [2].' },
      { plataforma: 'TIKR (blog para inversores)', fecha: '2026-07', n_comentarios: 5, tono: 'Dividido', resumen: '«Falló en todas las líneas, pero el balance no se inmutó»: la caja neta compensa un trimestre malo [3].' },
      { plataforma: 'Simply Wall St (narrativas de usuarios y artículo)', fecha: '2026-10', n_comentarios: 10, tono: 'Positivo', resumen: 'La narrativa más seguida ve la acción un 17 % por debajo de su valor tras el tráfico de septiembre; el valor razonable de la comunidad baja de 30,02 a 29,34 € por las tarifas [4, 5].' },
      { plataforma: 'Irish Times y prensa británica (comentarios sobre la remuneración)', fecha: '2026-09', n_comentarios: 15, tono: 'Negativo', resumen: "La opción de 10 M de acciones de O'Leary domina la conversación de septiembre; él descarta las críticas [6, 7]." },
    ],
    temas: [
      { tema: 'Combustible no cubierto y guerra con Irán', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto para FY28 (solo 15 % cubierto a 85 USD); FY27 está cubierto al 80 % a 67 USD, por debajo del coste de FY26 [2].' },
      { tema: 'Ryanair gana cuota a rivales débiles (Wizz, easyJet)', postura: 'Alcista', peso: 'Medio', contraste: 'Coherente con los datos: 206 M de pasajeros frente a 135 M de Lufthansa y Wizz en pérdidas; pero el tráfico de FY27 se recortó a 214 M [1].' },
      { tema: "Remuneración de O'Leary", postura: 'Bajista', peso: 'Medio', contraste: 'Dilución de ≈1 % y condicionada a beneficio > 4.000 M o precio > 42 €: coste menor para el accionista que el ruido que genera [6].' },
      { tema: 'Caja neta y recompras', postura: 'Alcista', peso: 'Bajo', contraste: 'Caja neta de ≈2.700 M a junio, sin deuda financiera; recompra en curso [3].' },
    ],
    lectura: 'El inversor particular está dividido y más pesimista que en mayo: los analistas siguen con «compra fuerte» (seis de seis), pero foros y prensa de inversión se centran en el combustible, la falta de guía y la remuneración. No hay euforia ni capitulación: la acción cae un 20 % en el año y nadie habla de vender por la calidad del negocio, sino por el ciclo. El riesgo que señalan y que el informe recoge es FY28 (combustible poco cubierto), no FY27. Contradice al consenso de analistas en el tono, no en el fondo.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: "Are Ryanair's shares a 'bargain' as some analysts suggest?", editor: 'The Irish Times', tipo: F, fecha: '2026-05-23', url: 'https://www.irishtimes.com/your-money/2026/05/23/bullish-michael-oleary-tells-ryanair-investors-heres-the-dip/' },
    { id: 2, titulo: 'Ryanair warns of profit uncertainty as Iran war weighs on fares', editor: 'AJ Bell', tipo: F, fecha: '2026-07-20', url: 'https://www.ajbell.co.uk/news/articles/ryanair-warns-profit-uncertainty-iran-war-weighs-fares' },
    { id: 3, titulo: "Ryanair's Q1 earnings missed on every line; the balance sheet didn't blink", editor: 'TIKR', tipo: F, fecha: '2026-07', url: 'https://www.tikr.com/es/blog/ryanairs-q1-earnings-missed-on-every-line-the-balance-sheet-didnt-blink' },
    { id: 4, titulo: 'Ryanair Holdings (ISE:RYA) could be 17 % below fair value after September traffic update', editor: 'Simply Wall St vía Webull', tipo: F, fecha: '2026-10-02', url: 'https://www.webull.com/news/15692749962953728' },
    { id: 5, titulo: 'Update for Ryanair Holdings (narrativa de la comunidad)', editor: 'Simply Wall St', tipo: F, fecha: '2026-09', url: 'https://www.simplywall.st/narratives/af3s4tzl-update-for-ryanair-holdings' },
    { id: 6, titulo: "Ryanair investors revolt over CEO O'Leary's EUR150 million pay deal", editor: 'AJ Bell', tipo: F, fecha: '2026-09-10', url: 'https://www.ajbell.co.uk/news/articles/ryanair-investors-revolt-over-ceo-olearys-eur150-million-pay-deal' },
    { id: 7, titulo: "Michael O'Leary dismisses investor concerns over his pay", editor: 'The Irish Times', tipo: F, fecha: '2026-09-24', url: 'https://www.irishtimes.com/business/2026/09/24/michael-oleary-dismisses-investor-concerns-over-his-pay/' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit, Stocktwits y Seeking Alpha', tipo: 'Complemento', intentos: '1) Búsqueda de hilos de Reddit (r/eupersonalfinance, r/irishpersonalfinance): sin resultados; 2) Seeking Alpha: solo un artículo de 2025; 3) Stocktwits y Rankia: sin resultados en la búsqueda', decision: 'Omitido; sentimiento con prensa de inversión y comunidades (Simply Wall St, AJ Bell, TIKR)' },
  ],
};

for (const [n, o] of Object.entries({ A, B, C, D, E })) w(`${n}.json`, o);
console.log('notas escritas');
