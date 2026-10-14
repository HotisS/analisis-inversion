// Genera las notas A-E de Moncler (corte 2026-10-14) a partir de los extractos de búsqueda (entorno nube: solo WebSearch).
// Ejecutar: node informes/moncler-2026-10-14/notas/construir.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, `${n}.json`), JSON.stringify(o, null, 2) + '\n');

// ---------------- A. Cuentas ----------------
const A = {
  _estado: 'completo con huecos (solo WebSearch)',
  negocio: {
    segmentos: [],
    geografias: [],
    kpis: [
      { kpi: 'Tiendas propias de la marca Moncler', valor_anterior: '295 (dic-25)', valor_actual: '295 (mar-26)', variacion: '0', comentario: 'Red estable: el crecimiento sale de la productividad por tienda [A11].' },
      { kpi: 'Tiendas propias de Stone Island', valor_anterior: '95 (dic-25)', valor_actual: '94 (mar-26)', variacion: '−1', comentario: 'Stone Island crece en venta directa (+17 % en el 1T26) sin abrir tiendas [A11].' },
      { kpi: 'Ventas de la marca Moncler (1S)', valor_anterior: 'n. d.', valor_actual: '1.089,6 M EUR (1S26)', variacion: '+9 % a tipos constantes', comentario: 'El 84 % del grupo [A2].' },
      { kpi: 'Ventas de Stone Island (1S)', valor_anterior: 'n. d.', valor_actual: '200,3 M EUR (1S26)', variacion: 'n. d.', comentario: 'El 16 % del grupo [A2].' },
      { kpi: 'Inversión neta (capex) sobre ventas', valor_anterior: '6,0 % (2024)', valor_actual: '6,9 % (2025 y 1S26)', variacion: '+0,9 puntos', comentario: 'La dirección espera volver al ≈6 % en 2026 [A3, A13].' },
      { kpi: 'Capital circulante neto sobre ventas', valor_anterior: '8,2 % (2024)', valor_actual: '9,7 % (2025)', variacion: '+1,5 puntos', comentario: 'Más existencias y compras estratégicas de materia prima (plumón) [A15, A13].' },
    ],
  },
  financieros: {
    cuenta: [
      { periodo: '2021', ingresos: 2046.1, coste_ventas: null, gastos_generales: null, ebitda: 827, amortizaciones: 223.9, ebit: 603.1, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 411.4, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.51, dpa: 0.60, dpa_extraordinario: 0, acciones_diluidas: 272.0 },
      { periodo: '2022', ingresos: 2602.9, coste_ventas: null, gastos_generales: null, ebitda: 1040, amortizaciones: 265.5, ebit: 774.5, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 606.7, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.24, dpa: 1.12, dpa_extraordinario: 0, acciones_diluidas: 270.8 },
      { periodo: '2023', ingresos: 2984.2, coste_ventas: null, gastos_generales: null, ebitda: 1190, amortizaciones: 296.4, ebit: 893.6, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 611.9, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.26, dpa: 1.15, dpa_extraordinario: 0, acciones_diluidas: 270.8 },
      { periodo: '2024', ingresos: 3108.9, coste_ventas: null, gastos_generales: null, ebitda: 1250, amortizaciones: 333.7, ebit: 916.3, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 639.6, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.36, dpa: 1.30, dpa_extraordinario: 0, acciones_diluidas: 271.0 },
      { periodo: '2025', ingresos: 3132.1, coste_ventas: null, gastos_generales: null, ebitda: 1250.1, amortizaciones: 336.7, ebit: 913.4, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 626.7, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.31, dpa: 1.40, dpa_extraordinario: 0, acciones_diluidas: 271.3 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3193.5, ebitda: 1283, ebit: 934.0, beneficio_neto: 637.9, bpa: 2.35, dpa: 1.40, dpa_extraordinario: 0, fcf: 548, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2021', descripcion: 'Stone Island consolidada desde el 31-mar-2021: solo nueve meses en la cuenta de 2021.' }],
    comentario: 'Ventas de 2.046 M EUR en 2021 a 3.132 M en 2025 (TCAC del 11,2 %), pero casi todo antes de 2024: 2021 lleva Stone Island desde abril y 2022-23 la reapertura china. Desde 2024 el grupo está plano: +4 % en 2024 y +1 % publicado en 2025 (+3 % a tipos constantes) [A1, A4, A5]. El margen EBIT se ha mantenido entre el 29,2 % y el 29,9 % de 2021 a 2025 aunque las ventas se frenaran, prueba del poder de precio de la marca [A1, A4, A5]. En el 1S26 las ventas suben un 9 % a tipos constantes (+5 % publicadas) y el margen EBIT semestral pasa del 18,3 % al 19,0 %; el segundo trimestre se frenó (EMEA −8 % a tipos constantes por el turismo) [A2, A14]. El EBITDA que usamos es el de los proveedores de datos (EBIT + amortizaciones incluidas las de derechos de uso de NIIF 16) [A6, A10].',
    ajustes: 'Moncler no publica EBITDA: el de 2021-2024 sale de TipRanks y el de 2025 de Stock Analysis, como EBIT publicado más todas las amortizaciones (incluidos los derechos de uso). No hay partidas no recurrentes relevantes en el EBIT de 2022-2025. El BPA diluido de 2022-2025 es el de Stock Analysis; el de 2021 es estimación propia (411,4 M ÷ ≈272 M acciones), porque el proveedor da un beneficio de 393,5 M que no cuadra con el publicado (411,4 M) [A5, A6]. El coste de ventas, el resultado financiero y los impuestos no se pudieron leer (cuentas no accesibles desde este entorno).',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '3T25', ingresos: 615.6, crecimiento_pct: null, crecimiento_organico_pct: -1.0, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 1288.0, crecimiento_pct: 3.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 880.6, crecimiento_pct: 6.0, crecimiento_organico_pct: 12.0, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 409.3, crecimiento_pct: 2.9, crecimiento_organico_pct: 5.0, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En el 1T26 la dirección habló de una Asia que se recupera con fuerza (+22 % en la región, China a la cabeza) y de la venta directa como motor (+14 % en Moncler, +17 % en Stone Island), con 6 puntos de efecto divisa en contra; las ventas (880,6 M EUR) superaron con holgura el consenso (≈827 M) [A11, A20]. En el 1S26 el discurso cambió de tono: Remo Ruffini dijo que «el entorno sigue siendo complejo y difícil de prever», EMEA cayó un 8 % a tipos constantes en el segundo trimestre por el menor turismo asiático y un comercio electrónico débil, y la venta directa solo creció un 3 % en el trimestre [A13, A14]. Los analistas preguntaron por la rentabilidad del año: la dirección no dio cifra y solo dijo que dependerá de las ventas del segundo semestre, manteniendo la aspiración de márgenes EBIT del 29 % o más a lo largo del tiempo [A13]. Del 3T25 (−1 % a tipos constantes, por encima del consenso de 603,8 M) al 1S26 el mensaje pasa de «estabilidad» a «aceleración en Asia, Europa débil» [A12]. Es también el primer semestre con Leo Rongone como consejero delegado (desde el 1-abr-2026) y Ruffini como presidente ejecutivo [A14].',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2023', activo_total: 4992, activo_corriente: null, pasivo_corriente: null, pasivo_total: 1732, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 453.2, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 998.8, deuda_financiera: null, arrendamientos: null, patrimonio_neto: 3260, minoritarios: 0, reservas: null },
      { periodo: '2024', activo_total: 5505, activo_corriente: null, pasivo_corriente: null, pasivo_total: 1915, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 470.1, clientes: 338.6, proveedores: 553.8, activos_contrato: null, pasivos_contrato: null, caja: 1308.8, deuda_financiera: 0, arrendamientos: 924.1, patrimonio_neto: 3590, minoritarios: 0, reservas: null },
      { periodo: '2025', activo_total: 5960, activo_corriente: null, pasivo_corriente: null, pasivo_total: 2110, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 538.8, clientes: 300.2, proveedores: 535.4, activos_contrato: null, pasivos_contrato: null, caja: 1477.1, deuda_financiera: 19.1, arrendamientos: 1109.1, patrimonio_neto: 3850, minoritarios: 0, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja neta sin arrendamientos de 1.112,4 M EUR a 30-jun-2026, tras pagar 374,1 M de dividendo (1.458,0 M a 31-dic-2025) [A2, A3]. Caja e inversiones a corto plazo de ≈1.477 M a dic-2025 [A7].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'El único pasivo asimilable a deuda relevante son los arrendamientos de tiendas (NIIF 16): 1.109,1 M EUR a dic-2025, frente a 924,1 M un año antes, por renovaciones y ampliaciones de tiendas [A3, A4]. Con ellos, la posición financiera neta total sigue siendo positiva (≈349 M a dic-2025, estimación propia). No constan covenants, pensiones relevantes ni pagos aplazados de adquisiciones: Stone Island se pagó en 2021 con caja y acciones [A6].',
    comentario: 'Balance sin deuda financiera: la caja neta pasó de 1.308,8 M en 2024 a 1.458,0 M en 2025, después de 353,2 M de dividendo [A1, A4]. El circulante empeoró: 9,7 % de las ventas en 2025 frente al 8,2 % en 2024, y 10,0 % en jun-26, por más existencias (538,8 M frente a 470,1 M) y compras estratégicas de plumón [A13, A15]. El patrimonio de 2025 (≈3.850 M) y el de 2023 (≈3.260 M) son estimaciones (proveedor sin fecha y saldo de 2024 con el beneficio y el dividendo de 2024), igual que proveedores y pasivo total, que salen por diferencia [A16, A17]. Los años 2021-2022 no se pudieron leer.',
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: null, capex: 124.7, pagos_arrendamientos: null, adquisiciones: null, desinversiones: 0, dividendos: 120.7, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 662.6, capex: 169.9, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 161.0, recompras: 48.4, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 914.9, capex: 176.4, pagos_arrendamientos: 189.1, adquisiciones: 0, desinversiones: 0, dividendos: 303.4, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 989.5, capex: 195.2, pagos_arrendamientos: 206.8, adquisiciones: 0, desinversiones: 0, dividendos: 311.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 980, capex: 215.6, pagos_arrendamientos: 235.4, adquisiciones: 0, desinversiones: 0, dividendos: 353.2, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo de caja libre que publica Moncler (después de capex y de arrendamientos) fue de 549,4 M en 2023, 587,5 M en 2024 y ≈529 M en 2025, este último lastrado por la divisa y el mayor capex (215,6 M, 6,9 % de las ventas) [A4, A15]. Es una conversión del 85-92 % del beneficio neto. Los pagos de arrendamiento de 2023-2024 se derivan del flujo operativo, el capex y el flujo libre publicados; el flujo operativo de 2025 y sus pagos de arrendamiento son estimación propia (flujo libre de 529 M + capex + arrendamientos al ritmo de su pasivo). El primer semestre es estacionalmente débil (34 M de flujo libre en el 1S26 frente a 15 M en el 1S25) porque el abrigo se vende en el 4T [A13]. El capex es sobre todo de tiendas (renovaciones y traslados) y logística; la empresa no separa mantenimiento y crecimiento.',
    confianza: 'Media',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: null,
    comentario: 'Cuentas sencillas: un solo negocio (ropa y accesorios de lujo bajo dos marcas), venta directa del 80 % y sin deuda financiera. No hay deterioros ni reestructuraciones en 2022-2025; el EBIT publicado coincide con el operativo. Los puntos a vigilar son las existencias (+15 % en 2025 con ventas +1 %), los pagos en acciones de los planes de performance shares y el peso creciente de los arrendamientos (1.109 M). Altman y Beneish no son concluyentes porque faltan líneas de la cuenta y del balance; el Piotroski del motor es parcial por la misma razón.',
    senales: [
      { senal: 'Existencias que crecen más que las ventas', nivel: 'Media', comentario: '538,8 M en 2025 (+14,6 %) con ventas +0,7 %; la empresa lo atribuye a compras estratégicas de plumón [A7, A13].' },
      { senal: 'Proveedor de datos con beneficio de 2021 distinto del publicado', nivel: 'Baja', comentario: 'Stock Analysis da 393,5 M frente a 411,4 M publicados: diferencia de perímetro o de atribución; usamos el publicado [A5, A6].' },
    ],
    confianza: 'Baja',
  },
  capital: {
    politica: 'Dividendo creciente con reparto de en torno al 60 % del beneficio: 1,40 EUR por acción con cargo a 2025, pagado en mayo de 2026 (374,1 M) [A2, A18]. No hay recompra en marcha; la única relevante fue en 2022 (48,4 M) [A9]. La prioridad declarada es reinvertir en la red de tiendas y la logística (capex ≈6 % de las ventas en 2026) y mantener caja neta [A3, A13].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Stone Island (Sportswear Company)', importe: 1150, ev_ebitda: 17.1, financiacion: 'Caja y acciones nuevas a la familia Rivetti', resultado: 'Las ventas de Stone Island pasaron de ≈240 M en 2020 a ≈400 M y 200,3 M en el 1S26; sin deterioros conocidos del fondo de comercio [A2, B10].' },
    ],
    comentario: 'Buena asignación de capital: una sola compra grande en diez años (Stone Island, 1.150 M a 17x EBITDA), que ha crecido y no ha generado deterioros, y el resto, dividendo creciente y caja. El exceso de caja (1.458 M a dic-2025, el 12 % de la capitalización) sigue sin usarse: no hay recompra ni plan de compra anunciado [A1, A2].',
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Moncler Group: risultati consolidati 2025 (comunicato stampa, 19-feb-2026)', editor: 'Moncler S.p.A. vía eMarket Storage', tipo: 'Primaria', fecha: '2026-02-19', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-02/20260219_177665.pdf' },
    { id: 2, titulo: 'Moncler Group: risultati del primo semestre 2026 (comunicato stampa, 22-jul-2026)', editor: 'Moncler S.p.A. vía eMarket Storage', tipo: 'Primaria', fecha: '2026-07-22', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-07/20260722_187106.pdf' },
    { id: 3, titulo: 'Moncler Group FY 2025 Factsheet', editor: 'Moncler S.p.A.', tipo: 'Primaria', fecha: '2026-02-19', url: 'https://www.monclergroup.com/v3/assets/blt61bda6b71f29a239/blt76518eab05423ac2/699777e8a36b21223513e373/Moncler-Group-FY-2025-Factsheet.pdf' },
    { id: 4, titulo: 'Moncler Group: risultati consolidati 2024 (comunicato stampa)', editor: 'Moncler S.p.A. vía eMarket Storage', tipo: 'Primaria', fecha: '2025-02-13', url: 'https://emarketstorage.it/sites/default/files/comunicati/2025-02/20250213_160658.pdf' },
    { id: 5, titulo: 'Moncler FY22 turnover increases by 25 percent (cifras de 2022 y 2021)', editor: 'FashionUnited', tipo: 'Prensa', fecha: '2023-03-01', url: 'https://fashionunited.uk/news/business/moncler-fy22-turnover-increases-by-25-percent/2023030168166' },
    { id: 6, titulo: 'Moncler S.p.A. (BIT:MONC): cuenta de resultados (extracto de búsqueda)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/bit/MONC/financials/income-statement/' },
    { id: 7, titulo: 'Moncler S.p.A. (BIT:MONC): balance (extracto de búsqueda)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/bit/MONC/financials/balance-sheet/' },
    { id: 8, titulo: 'Annual Report 2024: estado de flujos consolidado (p. 342)', editor: 'Moncler S.p.A.', tipo: 'Primaria', fecha: '2025-03', url: 'https://www.monclergroup.com/sustainability/Annual-Report-2024/342-Moncler-Annual-Report-2024.html' },
    { id: 9, titulo: 'Annual Report 2023: estado de flujos consolidado (p. 97)', editor: 'Moncler S.p.A.', tipo: 'Primaria', fecha: '2024-03', url: 'https://www.monclergroup.com/documents/annual-report/2023-annual-report/97-Moncler-Annual-Report-2023.html' },
    { id: 10, titulo: 'Moncler (MONRY): income statement, EBITDA 2020-2024 (extracto de búsqueda)', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.tipranks.com/stocks/monry/financials/income-statement' },
    { id: 11, titulo: 'Moncler Group closes Q1 2026 with revenues up 12 percent', editor: 'FashionUnited', tipo: 'Prensa', fecha: '2026-04-21', url: 'https://fashionunited.uk/news/business/moncler-group-closes-q1-2026-with-revenues-up-12-percent/2026042187603' },
    { id: 12, titulo: 'Moncler Group closes first nine months with 1.8 billion euros', editor: 'FashionUnited', tipo: 'Prensa', fecha: '2025-10-28', url: 'https://fashionunited.uk/news/business/moncler-group-closes-first-nine-months-with-1-8-billion-euros/2025102889385' },
    { id: 13, titulo: 'Moncler (MONC) H1 2026 earnings summary', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://quartr.com/events/moncler-s-p-a-monc-h1-2026_oqeYI5wa' },
    { id: 14, titulo: 'Moncler, ricavi e margini in crescita nel primo semestre. Ruffini: contesto resta complesso', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://www.teleborsa.it/News/2026/07/22/moncler-ricavi-e-margini-in-crescita-nel-primo-semestre-ruffini-contesto-resta-complesso-173.html' },
    { id: 15, titulo: 'Moncler S.p.A.: resumen de resultados FY2025 (flujo libre y circulante)', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-02-19', url: 'https://quartr.com/companies/moncler-s-p-a_12069' },
    { id: 16, titulo: 'Moncler: balance (patrimonio a dic-2024)', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.tipranks.com/stocks/de:mov/financials/balance-sheet' },
    { id: 17, titulo: 'Moncler: salud financiera (patrimonio)', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://simplywall.st/stocks/it/consumer-durables/bit-monc/moncler-shares/health' },
    { id: 18, titulo: 'Moncler FY25 Revenues Rises, But Profit Down', editor: 'Nasdaq (RTTNews)', tipo: 'Prensa', fecha: '2026-02-19', url: 'https://www.nasdaq.com/articles/moncler-fy25-revenues-rises-profit-down' },
    { id: 19, titulo: 'Moncler S.p.A. delivers 9 percent currency neutral growth in first half', editor: 'SGB Online', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://sgbonline.com/moncler-s-p-a-delivers-9-percent-currency-neutral-growth-in-first-half/' },
    { id: 20, titulo: 'Moncler, growth beyond expectations (1T26)', editor: 'Il Sole 24 Ore', tipo: 'Prensa', fecha: '2026-04-21', url: 'https://en.ilsole24ore.com/art/moncler-growth-beyond-expectations-we-build-community-AIkWtZdC' },
  ],
  huecos: [
    { seccion: 'negocio', campo: 'segmentos (marcas Moncler y Stone Island, 5 ejercicios)', tipo: 'Núcleo', intentos: '1) Comunicados de resultados anuales 2025 y 2024 vía búsqueda: solo cabecera del grupo; 2) prensa de resultados: solo el 1S26 y los nueve meses de 2025 por marca; 3) proveedores de datos: no desglosan', decision: 'Omitido (se dan las cifras del 1S26 en los KPI)' },
    { seccion: 'negocio', campo: 'geografias del último ejercicio', tipo: 'Complemento', intentos: '1) Comunicado FY2025: extracto sin tabla regional; 2) factsheet FY2025: sin desglose en el extracto; 3) prensa: solo EMEA del 1S26 (349,7 M, 27 %)', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'coste de ventas, resultado financiero, BAI e impuestos 2021-2025', tipo: 'Núcleo', intentos: '1) Comunicados anuales vía búsqueda: solo ventas, EBIT y beneficio; 2) Stock Analysis y TipRanks: extracto sin esas líneas; 3) informes anuales en monclergroup.com: páginas sin abrir (red limitada a WebSearch)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'balance completo 2021-2022 y partidas de 2023-2025 (activo y pasivo corriente, fondo de comercio, marcas)', tipo: 'Núcleo', intentos: '1) Informes anuales: no accesibles; 2) Stock Analysis: solo activo total, existencias, caja y clientes; 3) TipRanks y Simply Wall St: solo patrimonio', decision: 'Omitido; patrimonio de 2023 y 2025 y proveedores, calculados y marcados como estimación' },
    { seccion: 'calidad', campo: 'auditor y opinión', tipo: 'Complemento', intentos: '1) Informe anual 2025: no accesible; 2) búsqueda de la junta 2026: sin el nombramiento; 3) prensa: nada', decision: 'Omitido' },
  ],
};

// ---------------- B. Sector y competencia ----------------
const B = {
  historia: {
    resumen: 'Moncler nació en 1952 en Monestier-de-Clermont, cerca de Grenoble, como fabricante de sacos de dormir y plumíferos de montaña. Remo Ruffini la compró en 2003 y la convirtió en marca de lujo: abrigo de plumón a precio de alta gama, tiendas propias y colaboraciones (Genius). Salió a bolsa en Milán en diciembre de 2013. En 2021 compró Stone Island, su segunda marca, y en 2024 LVMH entró en el capital de Double R, la sociedad de Ruffini que es primer accionista. En abril de 2026 Ruffini pasó a presidente ejecutivo y Leo Rongone, que venía de Bottega Veneta, a consejero delegado [B1, B2, B3].',
    hitos: [
      { anio: '1952', hito: 'Fundación en Monestier-de-Clermont (Francia) como fabricante de equipo de montaña [B1].' },
      { anio: '2003', hito: 'Remo Ruffini compra la marca e inicia el giro al lujo [B1].' },
      { anio: '2013', hito: 'Salida a bolsa en Milán (diciembre) [B1].' },
      { anio: '2021', hito: 'Compra de Stone Island por 1.150 M EUR, consolidada desde el 31 de marzo [B10].' },
      { anio: '2024', hito: 'LVMH compra el 10 % de Double R, el vehículo de Ruffini (15,8 % de Moncler), con opción de llegar al 22 % [B2].' },
      { anio: '2026', hito: 'Leo Rongone, consejero delegado desde el 1 de abril; Ruffini, presidente ejecutivo [B3].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Moncler vende ropa de lujo, sobre todo abrigo de plumón, con dos marcas: Moncler (84 % de las ventas del 1S26), de plumíferos de alta gama a 1.500-3.000 EUR la pieza, y Stone Island (16 %), ropa técnica de inspiración deportiva para hombre [A2]. Vende sobre todo por su red propia: 295 tiendas de Moncler y 94 de Stone Island a marzo de 2026, más comercio electrónico y una distribución mayorista que pesa cada vez menos [A11]. Fabrica a través de una red de proveedores externos en Europa del Este y compra directamente el plumón.',
    como_gana_dinero: 'Precio alto sobre un coste de producto bajo: margen EBIT del 29 % en 2021-2025 sin deuda [A1, A4]. El negocio es muy estacional: el cuarto trimestre trae el 41 % de las ventas del año y el primer semestre apenas cubre los costes fijos (margen EBIT del 19 % en el 1S26 frente al 29 % del año) [A2]. La venta directa da más margen pero carga alquileres (arrendamientos de 1.109 M) y existencias: el apalancamiento operativo es alto en los años de crecimiento y protege poco cuando las ventas se paran. Nada es recurrente: depende del turismo de lujo (sobre todo asiático en Europa) y del cliente chino.',
    clientes: 'Cliente final de renta alta, con mucho peso de China continental y del turista asiático en Europa y Japón: en el 2T26 EMEA cayó un 8 % a tipos constantes por el menor turismo asiático, mientras Asia subió un 22 % en el 1T26 [A11, A13]. Sin concentración de clientes: la venta mayorista es menor y decreciente. Poder de precios demostrado: el margen EBIT se mantuvo en el 29-30 % de 2021 a 2025 y la empresa subió precios en 2025 para compensar los aranceles de EE. UU. [A1, B9].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de **bienes personales de lujo** a escala mundial (ropa, marroquinería, calzado, joyería, relojería y belleza de gama alta), medido por Bain y Altagamma a precio de venta al público: ≈358.000 M EUR en 2025 [B4, B5]. Moncler compite dentro en ropa de lujo de abrigo, una categoría sin estadística pública propia; por eso la cuota se mide sobre el total. La serie es la de Bain de junio de 2026, contrastada con la edición de diciembre de 2025; el TCAC histórico va de 2019 a 2025 y el previsto (3,5 %) es estimación propia a partir del +2/4 % que Bain prevé para 2026 [B4, B5].',
    tamano: '≈ 358.000 M EUR en 2025 (−2 % a tipos corrientes, +1 % a tipos constantes); 365.000-373.000 M EUR previstos para 2026 [B4, B5].',
    unidad_serie: 'millones de EUR',
    serie: [
      { anio: '2019', tamano: 284000 }, { anio: '2020', tamano: 223000 }, { anio: '2021', tamano: 293000 }, { anio: '2022', tamano: 354000 },
      { anio: '2023', tamano: 369000 }, { anio: '2024', tamano: 364000 }, { anio: '2025', tamano: 358000 }, { anio: '2026e', tamano: 369000 },
    ],
    tcac_historico_pct: 3.9, tcac_previsto_pct: 3.5, cr5_pct: 35.2, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Turismo asiático en Europa', efecto: '−', horizonte: 'Cíclico', evidencia: 'EMEA −8 % a tipos constantes en el 2T26 por el menor turismo asiático [A13].' },
      { driver: 'Recuperación del consumidor chino', efecto: '+', horizonte: 'Cíclico', evidencia: 'Asia +22 % en el 1T26, con China a la cabeza [A20].' },
      { driver: 'Fatiga de precios tras las subidas de 2021-2024', efecto: '−', horizonte: 'Cíclico', evidencia: 'El lujo personal cayó en 2024 y 2025 (364.000 y 358.000 M) [B4, B5].' },
      { driver: 'Divisas (USD, JPY y CNY frente al euro)', efecto: '−', horizonte: 'Cíclico', evidencia: '6 puntos de efecto divisa negativo en el 1T26 y 4 en el 1S26 [A2, A11].' },
      { driver: 'Riqueza de los clientes de alto patrimonio', efecto: '+', horizonte: 'Estructural', evidencia: 'Bain prevé un crecimiento positivo del lujo hasta 2035 apoyado en el cliente de más gasto [B4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Muchas casas de lujo amplían el abrigo de plumón (Prada, Dior, Canada Goose en la gama baja), pero Moncler mantiene el margen EBIT del 29 % [A1, B6].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Cliente final atomizado y venta directa del ≈80 %; la mayorista es pequeña y decreciente [A12].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fabricación subcontratada y plumón comprado directamente; las compras estratégicas de 2025-26 reducen el riesgo de precio [A13].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Construir una marca de abrigo de lujo con 295 tiendas propias lleva décadas; la marca es la barrera [A11].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'El plumífero de lujo es una categoría de moda: el gasto puede ir a experiencias (+2/6 % en 2026 según Bain) o a otras marcas [B5].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El lujo personal cayó dos años seguidos (364.000 M en 2024 y 358.000 M en 2025) y Bain prevé un +2 % a +4 % a tipos constantes en 2026 [B4, B5]. Es una recuperación tibia y desigual: Asia vuelve a crecer y Europa sufre por el turismo [A13]. En 2020 el mercado cayó un 21 % y Moncler un 12 % (1.440 M EUR); en 2022-23 Moncler creció a doble dígito con la reapertura china [A5, B4].' },
    regulacion: '**Aranceles de EE. UU.**: Moncler subió precios en 2025 y dijo que podía retrasar aperturas si la demanda empeoraba [B9]. **Fiscalidad italiana**: tipo efectivo del orden del 28 % (estimación propia: beneficio de 626,7 M sobre EBIT de 913,4 M en 2025) [A1]. **Bienestar animal**: el plumón está sujeto a normas de trazabilidad (el protocolo DIST de la propia empresa) y a campañas de organizaciones animalistas; Moncler dejó de usar piel en 2022 [B1].',
    tendencias: 'El gasto de lujo se desplaza a experiencias y a joyería (+4/6 % en 2025) y la ropa es una categoría intermedia [B4, B5]. Moncler gana cuando el frío y la moda empujan al plumífero y pierde si el abrigo se vuelve una prenda de uso, más barata. La marca intenta romper la estacionalidad con punto, calzado y gafas y con colaboraciones (Genius); Stone Island aporta un cliente más joven. Las marcas chinas de abrigo (Bosideng) ganan terreno en la gama media del mercado local.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.9,
    posicion: 'Líder mundial en abrigo de plumón de lujo; ≈0,9 % del mercado total de bienes personales de lujo (3.132 M sobre ≈358.000 M en 2025, estimación propia) [A1, B4].',
    competidores: [
      { nombre: 'LVMH (Moda y Marroquinería)', pais: 'Francia', ticker: 'MC.PA', ingresos: 37770, cuota_pct: 10.6, margen_ebit_pct: 35.0, comentario: 'Louis Vuitton y Dior: ventas del segmento −8 % en 2025 y margen del 37,1 % al 35,0 % [B6].' },
      { nombre: 'Hermès', pais: 'Francia', ticker: 'RMS.PA', ingresos: 16002, cuota_pct: 4.5, margen_ebit_pct: 41.1, comentario: 'La referencia de escasez y poder de precio del sector: 16.002 M EUR y 6.569 M de EBIT en 2025, creciendo mientras el mercado caía [B6].' },
      { nombre: 'Kering', pais: 'Francia', ticker: 'KER.PA', ingresos: 14675, cuota_pct: 4.1, margen_ebit_pct: 11.1, comentario: 'Ingresos −13 % en 2025: lo que pasa cuando una marca pierde al cliente aspiracional [B7].' },
      { nombre: 'Prada', pais: 'Italia', ticker: '1913.HK', ingresos: 5718, cuota_pct: 1.6, margen_ebit_pct: 22.7, comentario: '+9 % en 2025 con Miu Miu; también vende plumíferos de lujo [B8].' },
      { nombre: 'Brunello Cucinelli', pais: 'Italia', ticker: 'BC.MI', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Lujo discreto italiano, crecimiento de doble dígito; su comparable más cercano por origen y tamaño [B6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a una marca de ropa.' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'El cliente puede cambiar de marca sin coste.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Margen EBIT del 29-30 % durante cinco años y subida de precios en 2025 sin perder ventas; por debajo de Hermès (≈40 %) pero muy por encima de Kering (11 %) [A1, B6, B7].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Compra directa de plumón y escala en la categoría; no hay coste unitario publicado.' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Categoría de nicho, pero con rivales grandes que pueden entrar.' },
      ],
    },
    amenazas: 'La amenaza principal es de moda, no de competidor: que el plumífero de lujo deje de ser la prenda de invierno de referencia, como le pasó a Canada Goose desde 2022. Segunda, que las grandes casas (Prada, Dior, Louis Vuitton) ganen cuota en abrigo de lujo, donde ya venden. Tercera, la dependencia del cliente chino, dentro y fuera de China. Probabilidad media a cinco años; el margen estable del 29 % dice que aún no ocurre [A1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para Moncler es el bienestar animal y la trazabilidad del plumón (protocolo DIST propio, y fin del uso de piel en 2022), las condiciones laborales en la cadena de subcontratación de Europa del Este y Asia y la huella de carbono de la logística y las tiendas [B1]. Ninguno tiene hoy coste cuantificado en las cuentas.',
    controversias: 'Sin multas ni litigios relevantes encontrados en los últimos tres años en las búsquedas hechas; las campañas animalistas sobre el plumón son recurrentes y no han tenido efecto medible en las ventas.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Moncler Group: historia y sostenibilidad (Annual Report 2025, sección de sostenibilidad)', editor: 'Moncler S.p.A.', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.monclergroup.com/v3/assets/blt61bda6b71f29a239/blte87f9e4fabfa4855/6a18387ccd325850993e4122/Moncler-Group-Annual-Report-2025_Sustainability.pdf' },
    { id: 2, titulo: 'Remo Ruffini Teams With LVMH to Increase His Stake in Moncler', editor: 'The Impression', tipo: 'Prensa', fecha: '2024-09-26', url: 'https://theimpression.com/remo-ruffini-and-lvmh-strengthen-ties-in-new-moncler-partnership/' },
    { id: 3, titulo: 'Moncler appoints Leo Rongone as CEO in leadership shake-up', editor: '9colonne', tipo: 'Prensa', fecha: '2025', url: 'https://www.9colonne.it/586456/moncler-appoints-leo-rongone-as-ceo-in-leadership-shake-up' },
    { id: 4, titulo: 'Luxury in 2025: Finding a New Longevity for Luxury (Bain-Altagamma, 24.ª edición)', editor: 'Bain & Company y Fondazione Altagamma', tipo: 'Sectorial', fecha: '2025-12-18', url: 'https://www.bain.com/insights/finding-a-new-longevity-for-luxury/' },
    { id: 5, titulo: 'Altagamma-Bain Luxury Goods Worldwide Market Study, Spring 2026', editor: 'Bain & Company y Fondazione Altagamma', tipo: 'Sectorial', fecha: '2026-06-25', url: 'https://brand-news.it/wp-content/uploads/2026/06/ALTAGAMMA-BAIN-LUXURY-GOODS-WORLDWIDE-MARKET-MONITOR-UPDATE_.pdf' },
    { id: 6, titulo: 'Documento de registro universal 2025 (segmento de Moda y Marroquinería) e informe de Hermès en este repositorio (informes/hermes-2026-10-11)', editor: 'LVMH / Hermès', tipo: 'Primaria', fecha: '2026-03', url: 'https://lvmh-com.cdn.prismic.io/lvmh-com/aczo-pGXnQHGZKQ5_UniversalRegistrationDocument2025.pdf' },
    { id: 7, titulo: 'Kering – 2025 results', editor: 'Kering', tipo: 'Primaria', fecha: '2026-02-10', url: 'https://mfn.se/all/a/kering/kering-2025-results-sequential-improvement-unlocking-the-next-phase-of-sustainable-and-profitable-growth-df4cbf96' },
    { id: 8, titulo: 'Prada Group FY25 results', editor: 'Prada S.p.A.', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://www.pradagroup.com/content/dam/pradagroup/documents/investors/FY-2025/Prada-Group-FY25-PR.pdf' },
    { id: 9, titulo: 'Moncler raises prices on tariffs, may postpone store openings if downturn worsens', editor: 'CNBC vía NBC San Diego', tipo: 'Prensa', fecha: '2025-04', url: 'https://www.nbcsandiego.com/news/business/money-report/moncler-raises-prices-on-tariffs-may-postpone-store-openings-if-downturn-worsens/3875312/?amp=1' },
    { id: 10, titulo: 'Moncler acquisisce Stone Island. Mercato e analisti contenti', editor: 'Trend Online', tipo: 'Prensa', fecha: '2020-12-07', url: 'https://www.trend-online.com/prp/moncler-ftse-mib-stone-island/' },
  ],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025: no accesible; 2) búsqueda de MSCI y Sustainalytics: sin resultado fechado; 3) prensa: nada', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen de Brunello Cucinelli; cuota en abrigo de lujo', tipo: 'Complemento', intentos: '1) Informes de los competidores en el repositorio: Cucinelli sin cuentas leídas; 2) Bain: no publica la categoría de abrigo; 3) búsqueda: sin cifra', decision: 'Omitido' },
  ],
};

// ---------------- C. Equipo y gobierno ----------------
const C = {
  directivos: {
    equipo: [
      { nombre: 'Remo Ruffini', cargo: 'Presidente ejecutivo', desde: '2003', participacion_pct: 15.8, trayectoria: 'Compró Moncler en 2003 y la llevó de marca de montaña a grupo de lujo de 3.132 M EUR con un margen EBIT del 29 % [A1, B1]. Consejero delegado hasta el 31-mar-2026. Su participación es indirecta, a través de Double R (15,8 % en 2024, con LVMH como socio minoritario de la sociedad) [B2].' },
      { nombre: 'Bartolomeo (Leo) Rongone', cargo: 'Consejero delegado', desde: '2026', participacion_pct: null, trayectoria: 'Consejero delegado de Bottega Veneta, del grupo Kering, antes de llegar a Moncler; nombrado el 1-abr-2026 [C1, C2].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Capex en torno al 6-7 % de las ventas; margen EBIT del entorno del 29 %', real: 'Capex del 6,9 % y margen EBIT del 29,2 %', cumplida: 'Sí' },
      { anio: '2024', guia: 'Mantener el margen EBIT del ≈30 % con ventas creciendo', real: 'Margen EBIT del 29,5 % con ventas +4 %', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable durante veinte años bajo Ruffini, que ha cumplido sus objetivos de margen en un ciclo malo (29 % en 2024 y 2025). El cambio de 2026 es la primera sucesión: Rongone como consejero delegado, con Ruffini de presidente ejecutivo, una fórmula que deja el poder en el fundador. El riesgo es de transición y de una figura central cuya salida definitiva no tiene fecha [A1, C1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Remo Ruffini', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '2003', comisiones: null },
      { nombre: 'Bartolomeo (Leo) Rongone', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2026', comisiones: null },
      { nombre: 'Sidney Toledano', cargo: 'Consejero (propuesto por LVMH, sustituye a Alexandre Arnault)', tipo: 'Dominical', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La política de remuneración de 2026 no introduce cambios relevantes en el reparto entre fijo y variable ni entre corto y largo plazo; se votó en la junta del 21 de abril de 2026 (vinculante la primera sección y consultiva la segunda) [C3, C4]. El variable a largo plazo se paga con planes de performance shares. No se pudieron leer las tablas de importes ni el resultado de la votación de 2026.',
    accionistas: [
      { nombre: 'Double R S.r.l. (Remo Ruffini, con LVMH al ≈22 % de la sociedad)', pct: 15.8, tipo: 'Control de hecho', variacion: 'Plan de subir hasta el 18,5 % (máximo del 20 % pactado por tres años) con dinero de LVMH, anunciado en sep-2024 [B2, C5]' },
    ],
    insiders: [],
    control_y_defensas: 'Ruffini controla de hecho la junta con Double R (15,8 % en 2024, objetivo del 18,5 %), en un capital muy disperso. LVMH tiene el ≈22 % de Double R y un pacto que le da dos consejeros en Double R y uno en Moncler; Ruffini y LVMH se comprometieron a no superar el 20 % de Moncler durante tres años, renovables [B2, C5]. En julio de 2026 salieron Alexandre Arnault y Geoffroy van Raemdonck del consejo; entra Sidney Toledano, exdirectivo de Dior [C2, C6]. Una acción, un voto; no hay blindajes estatutarios conocidos. La lectura: un socio estratégico que puede convertirse en comprador.',
    alertas: [
      'Sucesión del fundador en marcha: Rongone, consejero delegado desde abril de 2026, con Ruffini como presidente ejecutivo [C1].',
      'Salida de dos consejeros en julio de 2026, uno de ellos el representante de LVMH (sustituido por Sidney Toledano) [C6].',
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Moncler appoints Leo Rongone as CEO in leadership shake-up', editor: '9colonne', tipo: 'Prensa', fecha: '2025', url: 'https://www.9colonne.it/586456/moncler-appoints-leo-rongone-as-ceo-in-leadership-shake-up' },
    { id: 2, titulo: 'Alexandre Arnault lascia il board Moncler, al suo posto arriva Sidney Toledano (ex Dior)', editor: 'MF Milano Finanza', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://www.milanofinanza.it/fashion/alexandre-arnault-lascia-il-board-moncler-al-suo-posto-arriva-sidney-toledano-ex-dior-202607221858251175' },
    { id: 3, titulo: 'Avviso di convocazione dell’Assemblea ordinaria del 21 aprile 2026 (estratto)', editor: 'Moncler S.p.A.', tipo: 'Primaria', fecha: '2026-03-20', url: 'https://www.monclergroup.com/v3/assets/blt61bda6b71f29a239/bltd9a3552220a6c1d4/69b1be7c207551114ae97abd/Avviso_Convocazione_Assemblea_Estratto_Eng.pdf' },
    { id: 4, titulo: 'Relazione sulla politica in materia di remunerazione e sui compensi corrisposti 2026', editor: 'Moncler S.p.A. vía eMarket Storage', tipo: 'Primaria', fecha: '2026-03-20', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-03/20260320_179499.pdf' },
    { id: 5, titulo: 'LVMH and Ruffini group won’t increase Moncler stake beyond 20%', editor: 'FashionNetwork (Reuters)', tipo: 'Prensa', fecha: '2024-09', url: 'https://il.fashionnetwork.com/news/Lvmh-and-ruffini-group-won-t-increase-moncler-stake-beyond-20-,1668576.html' },
    { id: 6, titulo: 'Moncler reports higher revenue in H1 amid board changes', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://www.rttnews.com/3669425/moncler-reports-higher-revenue-in-h1-amid-board-changes.aspx' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones y voto de remuneración de las tres últimas juntas', tipo: 'Núcleo', intentos: '1) Relación de gobierno 2026 y convocatoria de la junta: extractos sin la composición; 2) resultados de votación de la junta 2026: no encontrados (solo un 99,5 % a favor de una junta anterior sin fecha cierta); 3) prensa: solo los cambios de julio de 2026', decision: 'Omitido; se dan los consejeros confirmados' },
    { seccion: 'gobierno', campo: 'remuneración del primer ejecutivo e insiders (registro de internal dealing)', tipo: 'Núcleo', intentos: '1) Relación de remuneración 2026: tablas no accesibles; 2) internal dealing en eMarket Storage: no localizado por búsqueda; 3) prensa: nada', decision: 'Omitido' },
  ],
};

// ---------------- D. Mercado y valoración ----------------
const D = {
  identificacion: {
    nombre: 'Moncler S.p.A.', nombre_corto: 'Moncler', ticker: 'MONC.MI', isin: 'IT0004965148', mercado: 'Euronext Milan (Borsa Italiana)', indice_referencia: 'FTSE MIB',
    pais: 'Italia', pais_iso: 'IT', sector: 'Consumo discrecional', industria: 'Textil, ropa y bienes de lujo', sede: 'Milán', fundacion: '1952', empleados: null, web: 'www.monclergroup.com',
    precio: 43.44, fecha_precio: '2026-10-08', acciones: 272.0, capitalizacion_publicada: 11698, free_float_pct: null,
    max_52s: 59.34, min_52s: null, volumen_medio_diario: null, proximos_resultados: '2026-10-21',
  },
  consenso: {
    guidance: 'Moncler no da guía cuantitativa de ventas ni de margen. En los resultados del 1S26 (22-jul-2026) la dirección dijo que la rentabilidad del año dependerá de las ventas del segundo semestre, mantuvo la aspiración de márgenes EBIT del 29 % o más a lo largo del tiempo y espera un capex de ≈6 % de las ventas en 2026 [A13]. Ruffini: «el entorno sigue siendo complejo y difícil de prever» [A14].',
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: 1328, ebit: null, bpa: 2.39, dpa: null, fuente: 'MarketScreener (beneficio neto de 650 M ÷ 272 M de acciones), ago-2026 [D3]' },
      { periodo: '2027e', ingresos: null, ebitda: null, ebit: null, bpa: 2.60, dpa: null, fuente: 'MarketScreener (beneficio neto de 707 M ÷ 272 M de acciones) [D3]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 2.83, dpa: null, fuente: 'MarketScreener (beneficio neto de 770 M ÷ 272 M de acciones) [D3]' },
    ],
    recomendaciones: { n_analistas: 25, comprar: 13, mantener: 12, vender: 0, po_medio: 61.37, po_min: 49, po_max: 70 },
    revisiones: 'Las estimaciones apenas se han movido en 2026: Websim registra revisiones del BPA 2026-2028 de −0,4 % a 0 % entre febrero y marzo [D6]. Los precios objetivo se mueven con el precio: en octubre Goldman Sachs inició con Comprar y 62 EUR y UBS mantuvo Neutral con 46,60 EUR; Bernstein subió a Sobreponderar (57,50 EUR) y Jefferies bajó a Mantener [D4, D5, D7]. Solo hay una fuente con BPA a tres años (MarketScreener), y su BPA es el beneficio neto dividido por nuestras acciones; el precio objetivo se contrasta con Investing y Traders Union (61,1 EUR) [D2, D8].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 64.02, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 49.50, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 55.70, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 50.98, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 54.72, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Moncler cotizó en 2022-2025 a un PER de cierre de 21,6-24,6 veces (mediana de 22,9x) sobre el BPA del año; 2021 se excluye porque el precio de cierre (64,02 EUR) recogía la euforia de la reapertura y el BPA solo nueve meses de Stone Island (PER de 42x) [D1, A6]. Hoy, a 43,44 EUR, cotiza a 18,5 veces el BPA de los últimos doce meses (2,35 EUR), un 20 % por debajo de su mediana: el mercado ya no paga crecimiento porque desde 2024 no lo hay. El precio de cierre de 2025 es el de principio de enero de 2026 (54,72 EUR) [D9].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Seis grupos europeos de lujo en NIIF: LVMH, Hermès, Richemont, Kering, Prada y Brunello Cucinelli. Las cifras son las de MarketScreener a 8-9 de octubre de 2026 que se recogieron para los informes de LVMH y de Hermès de este repositorio (seis días antes del corte; el sector se movió poco) [D10, D11]. Fuera L’Oréal (belleza) y Canada Goose (sin datos gratuitos y modelo mayorista). Ninguno es especialista en abrigo: Moncler es el más pequeño salvo Cucinelli.',
    empresas: [
      { nombre: 'LVMH', ticker: 'MC.PA', pais: 'FR', capitalizacion: 187963, ev_ventas: 2.73, ev_ebitda_ltm: 9.1, ev_ebitda_ntm: 8.5, per_ntm: 15.9, crecimiento_pct: 3.7, margen_ebitda_pct: 30.1, roic_pct: 12.7, dn_ebitda: 1.0, fcf_yield_pct: 6.1 },
      { nombre: 'Hermès', ticker: 'RMS.PA', pais: 'FR', capitalizacion: 134070, ev_ventas: 7.76, ev_ebitda_ltm: 16.6, ev_ebitda_ntm: 15.6, per_ntm: 27.0, crecimiento_pct: 5.8, margen_ebitda_pct: 46.8, roic_pct: null, dn_ebitda: -1.32, fcf_yield_pct: 3.1 },
      { nombre: 'Richemont', ticker: 'CFR.SW', pais: 'CH', capitalizacion: 106204, ev_ventas: 4.36, ev_ebitda_ltm: 16.0, ev_ebitda_ntm: 12.8, per_ntm: 22.4, crecimiento_pct: 16.7, margen_ebitda_pct: 27.2, roic_pct: null, dn_ebitda: -1.39, fcf_yield_pct: 3.7 },
      { nombre: 'Kering', ticker: 'KER.PA', pais: 'FR', capitalizacion: 25995, ev_ventas: 2.32, ev_ebitda_ltm: 9.3, ev_ebitda_ntm: 8.3, per_ntm: 26.6, crecimiento_pct: 2.4, margen_ebitda_pct: 25.0, roic_pct: null, dn_ebitda: 2.19, fcf_yield_pct: 8.8 },
      { nombre: 'Prada', ticker: '1913.HK', pais: 'IT', capitalizacion: 10784, ev_ventas: 2.51, ev_ebitda_ltm: 6.7, ev_ebitda_ntm: 6.4, per_ntm: 13.0, crecimiento_pct: 9.0, margen_ebitda_pct: 37.4, roic_pct: null, dn_ebitda: 1.67, fcf_yield_pct: 9.7 },
      { nombre: 'Brunello Cucinelli', ticker: 'BC.MI', pais: 'IT', capitalizacion: 5447, ev_ventas: 4.57, ev_ebitda_ltm: 15.4, ev_ebitda_ntm: 12.8, per_ntm: 31.7, crecimiento_pct: 10.2, margen_ebitda_pct: 29.6, roic_pct: null, dn_ebitda: 2.36, fcf_yield_pct: 1.9 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2021-01', objetivo: 'Tiffany & Co.', comprador: 'LVMH', ev: 16561, ev_ventas: 3.83, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio renegociado a 131,5 USD por acción tras la pandemia [D10].' },
      { fecha: '2018-12', objetivo: 'Belmond', comprador: 'LVMH', ev: 2836, ev_ventas: 5.59, ev_ebitda: 22.9, prima_pct: null, excluir: false, comentario: 'Hoteles de lujo; múltiplo de activo inmobiliario [D10].' },
      { fecha: '2020-12', objetivo: 'Stone Island', comprador: 'Moncler', ev: 1150, ev_ventas: 4.79, ev_ebitda: 17.1, prima_pct: null, excluir: false, comentario: 'La compra de la propia Moncler: ropa de lujo de inspiración técnica [D10].' },
      { fecha: '2023-08', objetivo: 'Capri Holdings', comprador: 'Tapestry', ev: 7714, ev_ventas: 1.51, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: 'Lujo asequible; operación bloqueada por la FTC y cancelada [D10].' },
      { fecha: '2025-04', objetivo: 'Versace', comprador: 'Prada', ev: 1250, ev_ventas: 1.67, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Marca en pérdidas: múltiplo de ventas de reestructuración [D10].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Moncler: información para el accionista (precios de cierre anuales 2014-2024)', editor: 'Moncler S.p.A.', tipo: 'Primaria', fecha: '2025', url: 'https://www.monclergroup.com/en/investor-relations/share-information' },
    { id: 2, titulo: 'Moncler SpA (MONC): consenso y precio objetivo', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://uk.investing.com/equities/moncler-spa-consensus-estimates' },
    { id: 3, titulo: 'Moncler: datos financieros y estimaciones (beneficio neto 2026-2028, EBITDA 2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://www.marketscreener.com/quote/stock/MONCLER-39435421/finances/' },
    { id: 4, titulo: 'Moncler protagonista sulla spinta del giudizio degli analisti (Bernstein, JP Morgan)', editor: 'Orafinanza', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.orafinanza.it/it/azioni-moncler-protagonista-sulla-spinta-del-giudizio-degli-analisti' },
    { id: 5, titulo: 'Moncler downgraded to Hold from Buy at Jefferies', editor: 'TipRanks (The Fly)', tipo: 'Prensa', fecha: '2026', url: 'https://www.tipranks.com/news/the-fly/moncler-downgraded-to-hold-from-buy-at-jefferies' },
    { id: 6, titulo: 'Moncler: nota de Websim del 17-mar-2026 (revisiones de BPA 2026-2028)', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-03-17', url: 'https://www.websim.it/static/upload/mon/moncler-17-03-26.pdf' },
    { id: 7, titulo: 'Moncler SpA (MONC): cambios de recomendación de octubre (Goldman Sachs, UBS)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://www.investing.com/equities/moncler-spa' },
    { id: 8, titulo: 'Moncler (MONC/EUR) Stock Forecast: consenso de analistas', editor: 'Traders Union', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://tradersunion.com/currencies/forecast/monc-eur/' },
    { id: 9, titulo: 'Moncler S.p.A. (VIE:MONC): histórico de cotizaciones (cierre del 8-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/quote/vie/MONC/history/' },
    { id: 10, titulo: 'Informe de Hermès de este repositorio: comparables y transacciones de MarketScreener a 8-oct-2026', editor: 'MarketScreener (vía informes/hermes-2026-10-11)', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/MONCLER-S-P-A-15098901/valuation/' },
    { id: 11, titulo: 'Informe de LVMH de este repositorio: fila de Hermès en comparables (MarketScreener, 8-oct-2026)', editor: 'MarketScreener (vía informes/lvmh-2026-10-08)', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/HERMES-INTERNATIONAL-4657/finances/' },
    { id: 12, titulo: 'Rendimiento del Bund a 10 años (9-oct-2026), serie BBSIS', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
    { id: 13, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 14, titulo: 'Calendario finanziario 2026 (resoconto intermedio al 30-sep, 21-oct-2026)', editor: 'Moncler S.p.A.', tipo: 'Primaria', fecha: '2025-10', url: 'https://www.monclergroup.com/wp-content/uploads/2025/10/moncler_ita_calendario-finanziario-2026.pdf' },
    { id: 15, titulo: 'Moncler (MONC): PER y estimaciones de 2026-2028 (valoración)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://www.marketscreener.com/quote/stock/MONCLER-39435421/valuation/' },
    { id: 16, titulo: 'Moncler (MONRY): beneficio por acción de 2020', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.tipranks.com/stocks/monry/financials/income-statement' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'sección entera (rentabilidades, beta, volatilidad, caída máxima)', tipo: 'Complemento', intentos: '1) bolsa.mjs sin red; 2) WebFetch a Yahoo bloqueado; 3) búsqueda: solo cotizaciones sueltas', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026 en Milán', tipo: 'Núcleo', intentos: '1) Borsa Italiana y Teleborsa por búsqueda: sin cotización de octubre; 2) Stock Analysis de Milán: no indexado; 3) Stock Analysis de Viena (VIE:MONC): cierre de 43,44 EUR del 8-oct-2026', decision: 'Calculado y marcado como estimación: se usa el cierre de Viena del 8-oct-2026 (misma acción, en euros)' },
    { seccion: 'identificacion', campo: 'mínimo de 52 semanas, volumen y capital flotante', tipo: 'Complemento', intentos: '1) Búsqueda en Borsa Italiana; 2) Simply Wall St (sin fecha); 3) Stock Analysis Viena', decision: 'Omitido' },
  ],
};

// ---------------- E. Sentimiento ----------------
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Webull / Simply Wall St (comentarios sobre los resultados del 1S26)', fecha: '2026-08', n_comentarios: 10, tono: 'Negativo', resumen: 'Ponen el foco en la caída del margen operativo reportado y en una venta directa comparable que no crece; la narrativa alcista «choca» con la rentabilidad [E1].' },
      { plataforma: 'Simply Wall St Community (narrativa de valor razonable)', fecha: '2026-09', n_comentarios: 12, tono: 'Positivo', resumen: 'Los usuarios mantienen un valor razonable de ≈61-62 EUR apoyado en Asia y en la venta digital, con ajustes a la baja pequeños tras el verano [E2].' },
      { plataforma: 'Money.it y Orafinanza (prensa italiana con lectores)', fecha: '2026-10', n_comentarios: 8, tono: 'Dividido', resumen: '«Conti record ma analisti freddi»: la conversación italiana duda de que el buen primer trimestre se repita y destaca el −17 % del año [E3, E4].' },
      { plataforma: 'Seeking Alpha («Moncler: Stay Cautious»)', fecha: '2026', n_comentarios: 5, tono: 'Negativo', resumen: 'Tesis prudente: ventas que se estancan y un PER que no da margen de seguridad [E5].' },
      { plataforma: 'Il Sole 24 Ore (lectura del 1S26 y del 1T26)', fecha: '2026-07', n_comentarios: 5, tono: 'Dividido', resumen: 'Asia y Stone Island tiran; Europa y el turismo frenan; el mercado castigó el tono prudente del segundo semestre [E6].' },
    ],
    temas: [
      { tema: 'Europa y el turista asiático', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón: EMEA cayó un 8 % a tipos constantes en el 2T26 y pesa el 27 % de las ventas del semestre [A13].' },
      { tema: 'Recuperación de China y Asia', postura: 'Alcista', peso: 'Alto', contraste: 'Confirmado en el 1T26 (+22 % en Asia), pero el 2T26 desaceleró el grupo a +5 % a tipos constantes [A14, A20].' },
      { tema: 'Margen y rentabilidad del año', postura: 'Bajista', peso: 'Medio', contraste: 'Exageran: el margen EBIT del 1S26 subió del 18,3 % al 19,0 %; la caída de la que hablan algunos foros no aparece en el comunicado [A2].' },
      { tema: 'LVMH como posible comprador', postura: 'Alcista', peso: 'Bajo', contraste: 'Pacto de no superar el 20 % durante tres años desde 2024 y salida de Alexandre Arnault del consejo en julio de 2026: no hay catalizador de OPA a 12 meses [C2, C5].' },
    ],
    lectura: 'El inversor particular está más pesimista que los analistas (25 analistas, ninguno vende; objetivo medio de 61,37 EUR) y el precio le da la razón: −17 % en el año. El temor (Europa sin turistas, ventas que no crecen) es real, pero los foros ignoran que el margen aguanta y que la caja neta es el 12 % de la capitalización. No hay capitulación ni euforia: es desinterés, lo normal en la parte baja del ciclo del lujo. No cambia la decisión; refuerza que el catalizador son las ventas del 4T (abrigo) y la cifra del 3T del 21 de octubre.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Moncler (BIT:MONC) Stock Faces Margin Pressure As Operating Profitability Challenges Bullish Narrative', editor: 'Webull (Simply Wall St)', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.webull.com/news/15278025094751232' },
    { id: 2, titulo: '12 analysts have nudged their Moncler fair value estimate slightly (narrativa de la comunidad)', editor: 'Simply Wall St Community', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://simplywall.st/community/narratives/it/consumer-durables/bit-monc/moncler-shares/lh9vpe43-digital-and-retail-investments-will-expand-asia-pacific-luxury-appeal-ekqc/updates/12-analysts-have-nudged-their-moncler-fair-value-estimate-sligh' },
    { id: 3, titulo: 'Moncler, conti record (+12%) ma analisti freddi. Cosa può succedere ora al titolo', editor: 'Money.it', tipo: 'Foros y redes', fecha: '2026-04', url: 'https://www.money.it/moncler-conti-record-12-ma-analisti-freddi-cosa-puo-succedere-ora-al-titolo' },
    { id: 4, titulo: 'Azioni Moncler protagonista sulla spinta del giudizio degli analisti', editor: 'Orafinanza', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://www.orafinanza.it/it/azioni-moncler-protagonista-sulla-spinta-del-giudizio-degli-analisti' },
    { id: 5, titulo: 'Moncler: Stay Cautious', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026', url: 'https://seekingalpha.com/article/4747015-moncler-stay-cautious' },
    { id: 6, titulo: 'Moncler’s results slip as sales slow and the outlook remains cautious', editor: 'Il Sole 24 Ore', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://en.ilsole24ore.com/art/monclers-results-slip-as-sales-slow-and-the-outlook-remains-cautious-AJxFOET' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'revisadas (Reddit, Stocktwits y foros italianos de FinanzaOnline e Investireoggi)', tipo: 'Complemento', intentos: '1) WebSearch de hilos de Reddit y Seeking Alpha sobre Moncler en 2026: sin resultados; 2) búsqueda en foros italianos (FinanzaOnline, Investireoggi) de septiembre de 2026: sin hilos fechados; 3) API de Stocktwits: sin red', decision: 'Omitido; se usan comentarios de plataformas y prensa con lectores' },
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
// Copias profundas de las fuentes originales para que una nota no añada a otra fuentes copiadas.
const originales = Object.fromEntries(Object.entries(todas).map(([k, n]) => [k, n.fuentes.map((f) => ({ ...f }))]));
for (const L of Object.keys(todas)) {
  const guardadas = Object.fromEntries(Object.entries(todas).map(([k, n]) => [k, n.fuentes]));
  for (const k of Object.keys(todas)) if (k !== L) todas[k].fuentes = originales[k];
  arreglar(L);
  for (const k of Object.keys(todas)) if (k !== L) todas[k].fuentes = guardadas[k];
}

w('A', A); w('B', B); w('C', C); w('D', D); w('E', E);
console.log('Notas A-E escritas');
