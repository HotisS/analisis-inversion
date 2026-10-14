// Escribe las notas A-E de Belimo (corte 2026-10-14). Hechos con su fuente; cada nota numera sus fuentes desde 1.
// Fuentes primarias: informes anuales 2022, 2023 y 2025 y semestrales 2025 y 2026 (PDF de report.belimo.com, en notas/docs).
// Ejecutar: node informes/belimo-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
// Las citas de cada nota van a su propia lista: [A3] dentro de A.json pasa a [3]; las de otra letra se quitan.
const citas = (letra, txt) => txt.replace(/\[([A-E]\d+(?:\s*[,-]\s*[A-E]?\d+)*)\]/g, (m, dentro) => {
  const toks = dentro.split(/\s*,\s*/).map((t) => t.trim()).filter((t) => t.startsWith(letra) || /^\d/.test(t)).map((t) => t.replace(new RegExp('^' + letra), '').replace(new RegExp('-' + letra), '-'));
  return toks.length ? `[${toks.join(', ')}]` : '';
}).replace(/ +([.,;])/g, '$1');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), citas(letra, JSON.stringify(obj, null, 2)) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const ACC = 12.3; // millones de acciones emitidas; autocartera ~0 (0,0003 % a dic-25)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuentas consolidadas NIIF 2025 y 2024, notas 1.1 segmentos, 3.3 pasivos financieros, 3.5 dividendo; resumen de cinco años 2021-2025)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-02-23', url: 'https://report.belimo.com/HY26/app/uploads/Annual-Report-2025.pdf' },
  { id: 2, titulo: 'Annual Report 2023 (cuentas 2023 y 2022; efecto fiscal único de 17,1 M en 2023; resumen de cinco años 2019-2023)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2024-02', url: 'https://report.belimo.com/HY24/app/uploads/Annual-Report-2023.pdf' },
  { id: 3, titulo: 'Annual Report 2022 (cuentas 2022 y 2021)', editor: 'BELIMO Holding AG (copia en UN Global Compact)', tipo: 'Primaria', fecha: '2023-03-06', url: 'https://cop.unglobalcompact.org/2023/files/6457_Annual-Report-2022_en.pdf' },
  { id: 4, titulo: 'Semiannual Report 2026 (cuentas del 1S26, balance a 30-jun-26, préstamos 94,5 M y arrendamientos 34,7 M, perspectivas)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-07-20', url: 'https://report.belimo.com/HY26/app/uploads/Semiannual-Report-2026.pdf' },
  { id: 5, titulo: 'Semiannual Report 2025 (cuentas del 1S25 y resumen semestral de cinco años 1S21-1S25)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2025-07', url: 'https://report.belimo.com/HY26/app/uploads/Semiannual-Report-2025.pdf' },
  { id: 6, titulo: 'Half-Year Report 2026 online: «Belimo Accelerated Sales Growth in The First Half of 2026» (ventas por región y línea de negocio)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-07-20', url: 'https://report.belimo.com/HY26/en?p=430' },
];
const c = (periodo, ingresos, aprov, ebitda, amort, ebit, rf, bai, imp, min, bn, gfin, bpa, dpa) => ({
  periodo, ingresos, coste_ventas: aprov, gastos_generales: null, ebitda, amortizaciones: amort, ebit, resultado_financiero: rf, bai, impuestos: imp,
  minoritarios: min, beneficio_neto: bn, gastos_financieros: gfin, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: +(bn / bpa).toFixed(2),
});
const A = {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Actuadores de compuerta (Damper Actuators)', descripcion: 'Actuadores para compuertas de aire de climatización, incluidas las de fuego y humo.', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 405.1, resultado: null }, { periodo: '2022', ingresos: 423.8, resultado: null }, { periodo: '2023', ingresos: 404.8, resultado: null }, { periodo: '2024', ingresos: 431.7, resultado: null }, { periodo: '2025', ingresos: 476.3, resultado: null }] },
      { nombre: 'Válvulas de control (Control Valves)', descripcion: 'Válvulas de bola y de mariposa con actuador, válvulas independientes de presión y Energy Valve; incluye la refrigeración de centros de datos.', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 338.5, resultado: null }, { periodo: '2022', ingresos: 393.5, resultado: null }, { periodo: '2023', ingresos: 417.5, resultado: null }, { periodo: '2024', ingresos: 468.0, resultado: null }, { periodo: '2025', ingresos: 591.4, resultado: null }] },
      { nombre: 'Sensores y contadores (Sensors and Meters)', descripcion: 'Sensores de temperatura, humedad, presión, calidad del aire y contadores de energía térmica.', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 21.7, resultado: null }, { periodo: '2022', ingresos: 29.6, resultado: null }, { periodo: '2023', ingresos: 36.5, resultado: null }, { periodo: '2024', ingresos: 44.2, resultado: null }, { periodo: '2025', ingresos: 53.1, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 39 }, { nombre: 'Canadá y resto de América', peso_pct: 10 }, { nombre: 'Alemania', peso_pct: 7 }, { nombre: 'Europa central y del este', peso_pct: 7 },
      { nombre: 'Resto de EMEA', peso_pct: 24 }, { nombre: 'China', peso_pct: 5 }, { nombre: 'Resto de Asia-Pacífico', peso_pct: 8 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento de ventas en divisa local', valor_anterior: '13,1 % (2024)', valor_actual: '23,3 % (2025); 29,6 % (1S26)', variacion: '+10,2 pp', comentario: 'Aceleración por centros de datos y renovación (RetroFIT+) [A1, A4].' },
      { kpi: 'Margen EBIT', valor_anterior: '19,2 % (2024)', valor_actual: '20,8 % (2025); 22,5 % (1S26)', variacion: '+1,6 pp', comentario: 'Apalancamiento operativo y mezcla, menos divisa y aranceles [A1].' },
      { kpi: 'ROIC publicado por la empresa', valor_anterior: '25,7 % (2024)', valor_actual: '27,8 % (2025)', variacion: '+2,1 pp', comentario: 'Medida alternativa de la empresa; ROCE 36,3 % [A1].' },
      { kpi: 'Peso de las válvulas de control en ventas', valor_anterior: '50 % (2024)', valor_actual: '53 % (2025); 58 % (1S26)', variacion: '+8 pp en 18 meses', comentario: 'Las válvulas son el producto de la refrigeración líquida de centros de datos [A4, A6].' },
      { kpi: 'Días de inventario (DIO)', valor_anterior: '170 (2024)', valor_actual: '154 (2025)', variacion: '−16 días', comentario: 'Bajan desde el máximo de 188 días de 2023 [A1].' },
      { kpi: 'Empleados (equivalentes a tiempo completo)', valor_anterior: '2.704 (dic-25)', valor_actual: '2.881 (jun-26)', variacion: '+6,5 %', comentario: 'Contratación para la ampliación de capacidad en Suiza y EE. UU. [A1, A4].' },
    ],
  },
  financieros: {
    cuenta: [
      c('2021', 765.3, 306.8, 178.4, 33.0, 145.4, -2.0, 143.4, 27.9, -0.2, 115.7, 1.6, 9.41, 8.5),
      c('2022', 846.9, 339.7, 189.0, 36.7, 152.4, -4.9, 147.5, 24.8, -0.1, 122.8, 1.3, 9.99, 8.5),
      c('2023', 858.8, 338.8, 188.3, 35.8, 152.5, -10.1, 142.4, 5.6, -0.1, 137.0, 2.3, 11.14, 8.5),
      c('2024', 943.9, 363.6, 217.6, 36.5, 181.1, -5.0, 176.2, 29.4, -0.1, 146.8, 6.6, 11.94, 9.5),
      c('2025', 1120.8, 443.8, 271.2, 38.4, 232.9, -9.7, 223.2, 41.6, 0, 181.6, 2.1, 14.77, 10.0),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1235.7, ebitda: 298.7, ebit: 257.3, beneficio_neto: 205.2, bpa: 16.69, dpa: 10.0, dpa_extraordinario: 0, fcf: 84.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Belimo no hace compras relevantes: todo el crecimiento es orgánico. Las ventas pasan de 765,3 M CHF en 2021 a 1.120,8 M en 2025 y el crecimiento en divisa local se acelera de 7,2 % (2023) a 13,1 % (2024) y 23,3 % (2025) [A1, A2]; en francos el efecto divisa resta entre 2 y 6 puntos al año porque solo el 5 % de las ventas está en CHF (46 % en USD) [A1]. El margen EBIT oscila entre 17,8 % (2023) y 20,8 % (2025): sube por apalancamiento operativo y mezcla (válvulas), y lo frenan la divisa, la I+D (8,9 % de ventas en 2023) y en 2025 los aranceles de EE. UU., compensados con subidas de precio en el segundo semestre [A1, A2]. En el 1S26 las ventas crecen un 29,6 % en divisa local y el margen EBIT es del 22,5 % (22,8 % en el 1S25) [A4].',
    ajustes: 'Cifras reportadas (NIIF). La cuenta se presenta por naturaleza: en «coste_ventas» van los aprovisionamientos (consumos menos variación de existencias) [A1]. La partida no recurrente relevante es fiscal: en 2023 el impuesto incluye un efecto único favorable de 17,1 M CHF (tipo efectivo del 3,9 %), por lo que el BPA de 2023 (11,14) está inflado; normalizado con un tipo del 16-17 % sería ≈ 9,74 CHF [A2]. Las diferencias de cambio van en el resultado financiero (−10,4 M en 2025, −8,6 M en 2023) y no se ajustan porque se repiten con el franco fuerte [A1, A2]. No hay deterioros ni costes de reestructuración.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '2S22', ingresos: 430.5, crecimiento_pct: 13.1, crecimiento_organico_pct: null, ebitda: 93.4, margen_ebitda_pct: 21.7, bpa: 5.00, vs_consenso: null },
      { periodo: '1S23', ingresos: 448.4, crecimiento_pct: 7.7, crecimiento_organico_pct: null, ebitda: 102.2, margen_ebitda_pct: 22.8, bpa: 5.29, vs_consenso: null },
      { periodo: '2S23', ingresos: 410.4, crecimiento_pct: -4.7, crecimiento_organico_pct: null, ebitda: 86.1, margen_ebitda_pct: 21.0, bpa: 5.85, vs_consenso: null },
      { periodo: '1S24', ingresos: 473.5, crecimiento_pct: 5.6, crecimiento_organico_pct: null, ebitda: 110.7, margen_ebitda_pct: 23.4, bpa: 6.28, vs_consenso: null },
      { periodo: '2S24', ingresos: 470.3, crecimiento_pct: 14.6, crecimiento_organico_pct: null, ebitda: 106.9, margen_ebitda_pct: 22.7, bpa: 5.66, vs_consenso: null },
      { periodo: '1S25', ingresos: 561.5, crecimiento_pct: 18.6, crecimiento_organico_pct: 20.6, ebitda: 147.1, margen_ebitda_pct: 26.2, bpa: 8.23, vs_consenso: null },
      { periodo: '2S25', ingresos: 559.3, crecimiento_pct: 18.9, crecimiento_organico_pct: null, ebitda: 124.1, margen_ebitda_pct: 22.2, bpa: 6.54, vs_consenso: null },
      { periodo: '1S26', ingresos: 676.4, crecimiento_pct: 20.5, crecimiento_organico_pct: 29.6, ebitda: 174.6, margen_ebitda_pct: 25.8, bpa: 10.15, vs_consenso: null },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 642.7, activo_corriente: 408.3, pasivo_corriente: 114.5, pasivo_total: 131.3, fondo_comercio: 0, intangibles: 18.5, inmovilizado_material: 200.7, existencias: 126.4, clientes: 98.2, proveedores: 25.6, activos_contrato: null, pasivos_contrato: null, caja: 169.4, deuda_financiera: 1.0, arrendamientos: 9.8, patrimonio_neto: 511.3, minoritarios: 0.0, reservas: 503.2 },
      { periodo: '2022', activo_total: 672.0, activo_corriente: 414.0, pasivo_corriente: 133.6, pasivo_total: 150.2, fondo_comercio: 0, intangibles: 22.3, inmovilizado_material: 217.0, existencias: 176.1, clientes: 110.4, proveedores: 26.4, activos_contrato: null, pasivos_contrato: null, caja: 113.1, deuda_financiera: 1.1, arrendamientos: 9.7, patrimonio_neto: 521.8, minoritarios: -0.1, reservas: 519.6 },
      { periodo: '2023', activo_total: 662.0, activo_corriente: 389.8, pasivo_corriente: 113.3, pasivo_total: 131.5, fondo_comercio: 0, intangibles: 23.4, inmovilizado_material: 223.3, existencias: 152.5, clientes: 111.0, proveedores: 21.6, activos_contrato: null, pasivos_contrato: null, caja: 112.8, deuda_financiera: 4.0, arrendamientos: 10.6, patrimonio_neto: 530.6, minoritarios: -0.1, reservas: 546.6 },
      { periodo: '2024', activo_total: 763.7, activo_corriente: 444.9, pasivo_corriente: 155.3, pasivo_total: 182.9, fondo_comercio: 0, intangibles: 21.9, inmovilizado_material: 266.6, existencias: 163.0, clientes: 126.9, proveedores: 39.3, activos_contrato: null, pasivos_contrato: null, caja: 137.2, deuda_financiera: 10.1, arrendamientos: 12.0, patrimonio_neto: 580.7, minoritarios: 0, reservas: 584.2 },
      { periodo: '2025', activo_total: 878.8, activo_corriente: 499.2, pasivo_corriente: 203.5, pasivo_total: 257.0, fondo_comercio: 0, intangibles: 23.0, inmovilizado_material: 326.0, existencias: 207.0, clientes: 155.3, proveedores: 60.6, activos_contrato: null, pasivos_contrato: null, caja: 115.6, deuda_financiera: 14.9, arrendamientos: 30.9, patrimonio_neto: 621.8, minoritarios: 0, reservas: 648.1 },
    ],
    vencimientos: [{ anio: '2026', importe: 81.1 }, { anio: '2027-2030', importe: 13.4 }, { anio: '2031+', importe: 0 }],
    liquidez: 'Caja 103,1 M CHF a 30-jun-26 más líneas de crédito comprometidas de hasta 115 M (dispuestos 79 M en el 1S26, de los que se devolvieron 45 M en el periodo según la nota 6) [A4].',
    rating: 'Sin rating',
    coste_deuda_pct: 2.5,
    vida_media_anios: 1.0,
    otros_pasivos: 'Pasivos por prestaciones a empleados de 6,5 M (plan suizo) [A4]. Provisiones de 9,6 M (garantías). Rappels a clientes acumulados de 26,9 M y otras cuentas a pagar de 29,1 M [A4]. Una filial incumplía a dic-25 un covenant de su préstamo bancario local, sin efecto relevante [A1]. Sin garantías ni pagos aplazados de compras.',
    comentario: 'Balance casi sin deuda: hasta 2023 la caja neta superaba los 95 M CHF. A 30-jun-26 hay deuda neta de 27,7 M porque el dividendo de 123 M se pagó en abril con líneas de crédito a corto (préstamos de 94,5 M) y el circulante subió 78,7 M en el semestre [A4]. El circulante comercial pasa del 21 % de las ventas en 2021 al 27 % en 2025: inventario alto desde la crisis de suministros (DIO de 188 días en 2023, 154 en 2025) [A1]. Los arrendamientos se triplican en 2025 (de 12,0 a 30,9 M) por nuevas naves en EE. UU. [A1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 153.0, capex: 46.7, pagos_arrendamientos: 4.2, adquisiciones: 0, desinversiones: 0, dividendos: 92.2, recompras: 5.2, emision_acciones: 0, intereses_en_financiacion: 0.9 },
      { periodo: '2022', flujo_operativo: 112.9, capex: 54.7, pagos_arrendamientos: 3.8, adquisiciones: 0, desinversiones: 0.3, dividendos: 104.5, recompras: 4.1, emision_acciones: 0.7, intereses_en_financiacion: 0.5 },
      { periodo: '2023', flujo_operativo: 157.0, capex: 47.0, pagos_arrendamientos: 3.8, adquisiciones: 0, desinversiones: 0.4, dividendos: 104.5, recompras: 3.6, emision_acciones: 0.5, intereses_en_financiacion: 1.3 },
      { periodo: '2024', flujo_operativo: 194.8, capex: 63.1, pagos_arrendamientos: 4.0, adquisiciones: 0.4, desinversiones: 0.5, dividendos: 104.5, recompras: 4.0, emision_acciones: 0.7, intereses_en_financiacion: 1.5 },
      { periodo: '2025', flujo_operativo: 184.9, capex: 86.8, pagos_arrendamientos: 4.3, adquisiciones: 0, desinversiones: 0.2, dividendos: 116.8, recompras: 0.4, emision_acciones: 0, intereses_en_financiacion: 0.9 },
    ],
    comentario: 'El flujo operativo crece de 153 M CHF (2021) a 185 M (2025), pero la conversión es irregular por el circulante: −68 M en 2022 (inventario de seguridad) y −67 M en 2025 (crecimiento) [A1, A3]. El capex sube de 47 M (6,1 % de ventas) a 86,8 M (7,7 %) en 2025 y 45,4 M en el 1S26 por la ampliación de capacidad en Hinwil (Suiza), Danbury y Sparks (EE. UU.), que la empresa califica de «temporalmente elevado» [A1, A4]. Estimación propia: el capex de mantenimiento ronda la amortización (≈ 3,4 % de ventas) y el resto, unos 4 puntos de ventas, es crecimiento. Las recompras son solo para planes de empleados; casi todo el FCF va a dividendos (pagados 116,8 M en 2025 frente a un FCF sin depósitos de 98,5 M) [A1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young AG (EY), Zúrich', anios_auditor: 3, opinion: 'Favorable',
    comentario: 'EY audita desde 2023 (antes KPMG); socio responsable desde 2023 [A1]. Cuentas NIIF sin ajustes «subyacentes»: Belimo publica el EBIT reportado y no capitaliza I+D de forma relevante (intangibles de 23 M frente a una I+D de ≈ 8 % de ventas) [A1]. La remuneración en acciones es mínima (2,2 M en 2025). La partida a vigilar es el efecto fiscal único de 17,1 M en 2023, que infla el BPA de ese año [A2]. No hay fondo de comercio ni deterioros. El inventario es alto (154 días) pero baja desde 2023 [A1].',
    senales: [
      { senal: 'Efecto fiscal único en 2023 (tipo efectivo 3,9 %)', nivel: 'Baja', comentario: '17,1 M CHF; normalizado en la historia del PER [A2].' },
      { senal: 'Circulante al alza en 2025 y 1S26', nivel: 'Baja', comentario: 'Clientes +76 M e inventario +24 M en el 1S26 con ventas +20,5 %; explicable por crecimiento, a vigilar [A4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo con reparto de entre el 50 % y el 70 % del beneficio, según la práctica de los últimos años (10,00 CHF por acción en 2025, 68 % del beneficio, pagados 123,0 M en abril de 2026) [A1, A4]. No hay programa de recompra: la empresa solo compra acciones para los planes de empleados (6,6 M en el 1S26) [A4]. Prioridad declarada de la caja: crecimiento orgánico (capacidad en Suiza y EE. UU.), I+D y dividendo [A1].',
    adquisiciones: [
      { anio: '2024', objetivo: 'Minoritarios de BELIMO Automation Italy (antes BEREVA)', importe: 0.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Compra residual; sin efecto en cifras [A1].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: informe de gestión (centros de datos como iniciativa estratégica, perspectivas 2026, mercados por región)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-02-23', url: 'https://report.belimo.com/HY26/app/uploads/Annual-Report-2025.pdf' },
  { id: 2, titulo: 'Semiannual Report 2026: centros de datos «algo más de la mitad» del crecimiento absoluto; refrigeración líquida directa al chip', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-07-20', url: 'https://report.belimo.com/HY26/app/uploads/Semiannual-Report-2026.pdf' },
  { id: 3, titulo: 'Belimo Company Presentation 2025: mercado accesible de 4.900 M CHF en 2023 (25 % actuadores, 45 % válvulas, 30 % sensores; cuota de Belimo < 20 %, «own analysis»)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2025', url: 'https://www.belimo.com/mam/corporate-communications/company-presentation/belimo-company-presentation_2025_en-gb.pdf' },
  { id: 4, titulo: 'Data Center Liquid Cooling Market to Surge to USD 17.77 Billion by 2030 with a 21.60% CAGR', editor: 'ResearchAndMarkets (Business Wire)', tipo: 'Sectorial', fecha: '2025-07-07', url: 'https://secure.businesswire.com/news/home/20250707847166/en/' },
  { id: 5, titulo: 'Data Center Liquid Cooling Business Research Report 2025: Market to Reach $9.5 Billion by 2030', editor: 'ResearchAndMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2025-11-25', url: 'https://www.globenewswire.com/news-release/2025/11/25/3194498/28124/en/' },
  { id: 6, titulo: 'Yahoo Finance: ventas y EBIT de los últimos 12 meses de Trane, Johnson Controls, Carrier, Siemens, Schneider, Daikin, Vertiv, Halma y Spirax (pasados a CHF)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com' },
  { id: 7, titulo: 'Annual Report 2023: perspectivas 2024 (EPBD y Ley de Energía de Edificios alemana)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2024-02', url: 'https://report.belimo.com/HY24/app/uploads/Annual-Report-2023.pdf' },
  { id: 8, titulo: 'Annual Report 2022: historia y resumen de cinco años 2018-2022', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2023-03-06', url: 'https://cop.unglobalcompact.org/2023/files/6457_Annual-Report-2022_en.pdf' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Belimo nace en 1975 en Suiza para fabricar actuadores de compuertas de aire; cotiza en la bolsa suiza desde 1995 [B1]. Creció con un solo foco, los dispositivos de campo de climatización (actuadores, válvulas y sensores), sin compras relevantes, con filiales comerciales propias en más de 80 países y centros de producción y logística en Suiza, EE. UU., China, Alemania y otros [B1]. La familia Linsi, fundadora, conserva el 19,6 % [B1]. Las válvulas de control (Energy Valve, válvulas independientes de presión) pasaron a ser la mayor línea en 2023 y desde 2025 los centros de datos son una iniciativa estratégica propia [B1, B2].',
    hitos: [
      { anio: '1975', hito: 'Fundación en Suiza; primer actuador de compuerta [B1].' },
      { anio: '1995', hito: 'Salida a bolsa en la SIX Swiss Exchange [B1].' },
      { anio: '2000s', hito: 'Primeros clientes de centros de datos (inicio de los años 2000) [B2].' },
      { anio: '2012', hito: 'Lanzamiento de la Energy Valve, válvula que mide y regula la energía [B1].' },
      { anio: '2021', hito: 'Iniciativa RetroFIT+ para la renovación de edificios existentes [B2].' },
      { anio: '2023', hito: 'Las válvulas de control superan a los actuadores de compuerta en ventas (49 % frente a 47 %) [B7].' },
      { anio: '2025', hito: 'Centros de datos como pilar estratégico; ventas +23,3 % en divisa local; Data Center Experience Center en Singapur [B1].' },
      { anio: '2026', hito: 'Centro de aplicaciones de refrigeración de centros de datos en Danbury (EE. UU.); ampliación de capacidad en Suiza y EE. UU. [B2].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Mercado relevante: dispositivos de campo para climatización de edificios (actuadores de compuertas, válvulas de control y sensores y contadores), que Belimo estima en 4.900 M CHF en 2023 (25 % actuadores, 45 % válvulas, 30 % sensores; EMEA 1.200 M, América 2.100 M, Asia-Pacífico 1.600 M) [B3]. Es un nicho del mercado de control y automatización de edificios y de los equipos de climatización. Dentro está la refrigeración de centros de datos: el mercado de refrigeración líquida se estima entre 9.500 y 17.770 M USD en 2030, con crecimientos del 20-22 % anual, según el informe [B4, B5]. Usamos el tamaño de Belimo porque es el único con el mismo perímetro que su cuota; las cifras de refrigeración líquida son de consultoras con definiciones distintas.',
    tamano: '≈ 4.900 M CHF en 2023 (estimación de la empresa) [B3]',
    unidad_serie: 'millones de CHF',
    serie: [{ anio: '2023', tamano: 4900 }, { anio: '2025e', tamano: 5500 }, { anio: '2030e', tamano: 7000 }],
    tcac_historico_pct: 5.0, tcac_previsto_pct: 5.0, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Centros de datos (IA) y refrigeración líquida directa al chip', efecto: '+', horizonte: 'Estructural', evidencia: 'Algo más de la mitad del crecimiento absoluto de Belimo en el 1S26; mercado de refrigeración líquida +20-22 % anual hasta 2030 [B2, B4, B5].' },
      { driver: 'Renovación por eficiencia energética (EPBD, Ley de Energía de Edificios alemana)', efecto: '+', horizonte: 'Estructural', evidencia: 'RetroFIT+ con cartera creciente; la EPBD obliga a renovar el parque europeo [B1, B7].' },
      { driver: 'Construcción no residencial nueva', efecto: '−', horizonte: 'Cíclico', evidencia: 'Gasto «moderado» en 2025-26; sin recuperación en Alemania prevista para 2026 [B1, B2].' },
      { driver: 'Calidad del aire interior y digitalización (sensores, Ethernet, BelOS)', efecto: '+', horizonte: 'Estructural', evidencia: 'Sensores y contadores +25,1 % en divisa local en 2025 [B1].' },
      { driver: 'Franco fuerte y aranceles de EE. UU.', efecto: '−', horizonte: 'Cíclico', evidencia: 'Solo el 5 % de las ventas en CHF; aranceles compensados con precio en el 2S25 [B1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Competidores grandes (Siemens, Honeywell, Johnson Controls, Schneider, Danfoss) que venden el dispositivo dentro de su sistema; Belimo gana con plazo y calidad [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes fragmentados (fabricantes de equipos, integradores, mayoristas); el dispositivo es una parte pequeña del coste del sistema [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Componentes electrónicos y metales; aranceles repercutidos en precio en 2025 [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologaciones, especificación por ingenierías y red global de distribución; entrantes chinos en gama baja [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La refrigeración por inmersión podría reducir válvulas por rack frente a la de placa fría directa al chip (riesgo de tecnología) [B2].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La construcción no residencial está floja (EMEA solo crece «modestamente», Alemania sin rebote), pero la demanda de centros de datos y la renovación tiran: Belimo creció un 29,6 % en divisa local en el 1S26 [B2]. En 2009 sus ventas cayeron; en 2020 bajaron un 4,5 % en francos (+1,4 % en divisa local aprox.) [B8]; en 2023 el desabastecimiento de 2022 se convirtió en reducción de inventario de los clientes y el 2S23 cayó un 4,7 % [B7].' },
    regulacion: 'La Directiva europea de eficiencia energética de edificios (EPBD, refundida en 2024) obliga a renovar el parque menos eficiente y a instalar automatización en edificios no residenciales grandes; su trasposición alemana (Ley de Energía de Edificios) favorece la renovación [B7]. En EE. UU., los aranceles de 2025 afectaron a costes y se repercutieron en precio [B1]. Las normas ASHRAE de eficiencia y de centros de datos fijan los requisitos de válvulas y sensores.',
    tendencias: 'El cambio de la refrigeración por aire a la líquida directa al chip en los centros de datos de IA multiplica las válvulas de control por megavatio; Belimo dice ser «la solución preferida» de los grandes fabricantes de chips e hiperescaladores [B2]. La digitalización (válvulas con Ethernet y software propio, BelOS) sube el valor por dispositivo. Riesgo: los grandes integradores (Vertiv, Schneider-Motivair, Eaton-Boyd) integran verticalmente la distribución de refrigerante (CDU) y podrían elegir otro proveedor de válvulas [B2].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 20, posicion: '1.º mundial en actuadores de compuerta y uno de los primeros en válvulas de control para climatización; cuota < 20 % del mercado accesible de dispositivos de campo (estimación de la empresa) [B3]',
    competidores: [
      { nombre: 'Siemens (Smart Infrastructure)', pais: 'DE', ticker: 'SIE', ingresos: 75569, cuota_pct: null, margen_ebit_pct: 16.4, comentario: 'Ventas y margen del grupo; compite con dispositivos dentro de su sistema Desigo [B6].' },
      { nombre: 'Johnson Controls', pais: 'IE', ticker: 'JCI', ingresos: 20902, cuota_pct: null, margen_ebit_pct: 11.7, comentario: 'Controles Metasys y dispositivos propios; vende equipos y servicio [B6].' },
      { nombre: 'Schneider Electric', pais: 'FR', ticker: 'SU', ingresos: 39168, cuota_pct: null, margen_ebit_pct: 16.9, comentario: 'Automatización de edificios (EcoStruxure) y, con Motivair, refrigeración líquida [B6].' },
      { nombre: 'Honeywell (Building Automation)', pais: 'US', ticker: 'HON', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidor directo en actuadores y válvulas; cifras del segmento no recogidas.' },
      { nombre: 'Danfoss', pais: 'DK', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Válvulas de climatización; no cotiza.' },
      { nombre: 'Trane Technologies', pais: 'IE', ticker: 'TT', ingresos: 18573, cuota_pct: null, margen_ebit_pct: 17.8, comentario: 'Fabricante de equipos y cliente de dispositivos; referencia de margen del sector [B6].' },
    ],
    foso: { veredicto: 'Amplio', tendencia: 'Se amplía', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Especificación por ingenierías y formación de instaladores; efecto débil.' },
      { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'El dispositivo se especifica en el proyecto y se reemplaza con el mismo modelo; en centros de datos se homologa con el chip [B2].' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Energy Valve y válvulas independientes de presión; ROIC del 25-28 % durante cinco años [B1].' },
      { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala de 10 millones de dispositivos al año y plazo de entrega corto [B1].' },
      { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nicho de 4.900 M CHF donde Belimo es el único especialista global [B3].' },
    ] },
    amenazas: 'Las amenazas son tres. (1) Que los integradores de refrigeración líquida (Vertiv, Schneider-Motivair, Eaton-Boyd) estandaricen válvulas propias o de un competidor en sus unidades de distribución de refrigerante: probabilidad media a 3-5 años. (2) Competidores chinos en gama baja de actuadores, sobre todo en Asia: probabilidad media, efecto limitado al precio de la gama básica. (3) Un cambio de tecnología (inmersión) que reduzca válvulas por megavatio: probabilidad baja a cinco años [B2].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'SBTi', calificacion: 'Objetivos climáticos validados', fecha: '2025-08' }],
    materialidad: 'Lo material es la eficiencia energética de los edificios que controla: los dispositivos de Belimo reducen el consumo de climatización y la empresa publica su contribución [B1]. Sus emisiones propias son pequeñas (1.956 t CO2e de alcances 1 y 2 en 2025, 1,75 kg por cada 1.000 CHF de ventas) [B1]. Riesgo de cadena de suministro (trabajo infantil y metales) vigilado desde 2021 [B1].',
    controversias: 'No hemos encontrado sanciones, litigios ni incidentes relevantes en los últimos tres años en el informe anual ni en la prensa revisada.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'competidores (Honeywell, Danfoss: cifras de segmento)', tipo: 'Complemento', intentos: '1) Informe anual de Belimo (no nombra competidores); 2) Yahoo Finance (solo grupo); 3) Danfoss no cotiza', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Presentación de Belimo (solo su cuota < 20 %); 2) informes de consultoras (no publican cuota por dispositivo); 3) prensa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: gobierno corporativo (consejo, comités, accionistas significativos, límite de inscripción del 5 %, auditor) e informe de remuneraciones', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-02-23', url: 'https://report.belimo.com/HY26/app/uploads/Annual-Report-2025.pdf' },
  { id: 2, titulo: 'Semiannual Report 2025: perspectiva 2025 (crecimiento del 15-20 % en divisa local, margen EBIT > 20 %)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2025-07', url: 'https://report.belimo.com/HY26/app/uploads/Semiannual-Report-2025.pdf' },
  { id: 3, titulo: 'Annual Report 2023: perspectiva 2024 («extremo bajo del corredor de crecimiento»)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2024-02', url: 'https://report.belimo.com/HY24/app/uploads/Annual-Report-2023.pdf' },
  { id: 4, titulo: 'Annual Report 2022: perspectiva 2023 (crecimiento «en torno a su media de cinco años»)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2023-03-06', url: 'https://cop.unglobalcompact.org/2023/files/6457_Annual-Report-2022_en.pdf' },
  { id: 5, titulo: 'Semiannual Report 2026: perspectiva y nota de patrimonio (compra de acciones propias 6,6 M)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-07-20', url: 'https://report.belimo.com/HY26/app/uploads/Semiannual-Report-2026.pdf' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Lars van der Haegen', cargo: 'Consejero delegado', desde: '2015', participacion_pct: 0.03, trayectoria: 'En Belimo desde 2000 (producto en Europa y EE. UU., Italia, jefe de América 2011-2015). Con él las ventas pasaron de unos 580 M CHF a 1.121 M en 2025 y el margen EBIT se mantuvo entre el 16 % y el 21 % [C1].' },
      { nombre: 'Patrick Burkhalter', cargo: 'Presidente del consejo (no ejecutivo)', desde: '2014', participacion_pct: null, trayectoria: 'Consejero desde 2014 y presidente; carrera previa en Ergon Informatik (consejero delegado hasta 2018) [C1].' },
      { nombre: 'Dr. Markus Schürch', cargo: 'Director financiero', desde: '2017', participacion_pct: null, trayectoria: 'Doctor en ingeniería química; director financiero del grupo [C1].' },
      { nombre: 'Sarah Bencic', cargo: 'Jefa de la división América', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a James Furlong (marzo de 2026), que dirigía la región que más crece [C1].' },
      { nombre: 'Gary Economides', cargo: 'Miembro del comité ejecutivo', desde: null, participacion_pct: null, trayectoria: 'Miembro del comité de dirección [C1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Crecimiento en divisa local en torno a la media de cinco años [C4]', real: '+7,2 % en divisa local [C3]', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Crecimiento en el extremo bajo del corredor guiado [C3]', real: '+13,1 % en divisa local [C1]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Crecimiento del 15-20 % en divisa local y margen EBIT > 20 % [C2]', real: '+23,3 % y 20,8 % [C1]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Crecimiento «mid-teens» en divisa local y margen EBIT > 20 % [C1, C5]', real: '1S26: +29,6 % y 22,5 % [C5]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de casa: el consejero delegado lleva 26 años en la empresa y 11 en el cargo. La guía se ha cumplido o superado desde 2024 [C1, C2]. Cambio relevante en 2026: nueva jefa de América (la región del 49 % de las ventas y de los centros de datos) y salida de dos consejeros veteranos [C1]. Sucesión del consejero delegado no anunciada.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Patrick Burkhalter', cargo: 'Presidente', tipo: 'Independiente', desde: '2014', comisiones: 'Estrategia' },
      { nombre: 'Dr. Martin Zwyssig', cargo: 'Vicepresidente (sale en la junta de 2026)', tipo: 'Independiente', desde: '2011', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Prof. Adrian Altenburger', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Estrategia (presidente)' },
      { nombre: 'Sandra Emme', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Remuneración y nombramientos (presidenta)' },
      { nombre: 'Tom Hallam', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Urban Linsi', cargo: 'Consejero', tipo: 'Dominical', desde: '2019', comisiones: 'Remuneración y nombramientos' },
      { nombre: 'Ines Pöschel', cargo: 'Consejera (vicepresidenta propuesta)', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría; Remuneración y nombramientos' },
      { nombre: 'Stefan Ranstrand', cargo: 'Consejero (sale en la junta de 2026)', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría; Estrategia' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.749, fijo: 0.722, variable_corto: 1.027, variable_largo: 0, ratio_salario_medio: 19.75 },
    remuneracion: 'El consejero delegado cobró 1,75 M CHF en 2025 (fijo 0,72 M y variable anual 1,03 M), una cifra baja para su tamaño [C1]. El variable es solo anual: un 70 % depende de objetivos financieros (margen EBIT del grupo, ROCE, crecimiento regional de ventas y costes) y un 30 % de un cuadro de mando; tope del 176 % del fijo; parte se paga en acciones bloqueadas tres años [C1]. No hay plan a largo plazo ligado a la rentabilidad del accionista. Hay cláusula de recuperación (*clawback*) por conducta grave y por reformulación de cuentas [C1]. Ratio de la remuneración más alta frente a la mediana de la plantilla: 19,75 [C1]. Votos de la junta sobre remuneración: no recogidos.',
    accionistas: [
      { nombre: 'Grupo Linsi (familia fundadora)', pct: 19.55, tipo: 'Familia fundadora (ancla)', variacion: 'Estable; límite de inscripción ampliado al 19,51 % [C1]' },
      { nombre: 'UBS Fund Management (Switzerland)', pct: 5.56, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'BlackRock', pct: 5.18, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 0.0003, tipo: 'Autocartera', variacion: 'Compras de 6,6 M en el 1S26 para planes de empleados [C5]' },
    ],
    insiders: [],
    control_y_defensas: 'No hay accionista de control: la familia Linsi tiene el 19,55 % y un consejero dominical [C1]. Los estatutos limitan la inscripción con derecho de voto al 5 % del capital por accionista (excepción para el grupo Linsi, hasta el 19,51 %), lo que actúa como defensa frente a una toma de control y rompe el principio de una acción, un voto [C1]. Una sola clase de acciones. Operaciones vinculadas menores: compras a Google y a BKW (empleadores de dos consejeras/consejeros) en condiciones de mercado [C1].',
    alertas: ['Límite estatutario de inscripción con voto del 5 % (defensa anti-OPA) [C1].', 'Salida en 2026 del presidente de la comisión de auditoría (15 años) y de otro consejero; relevo previsto [C1].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'insiders y votos de remuneración', tipo: 'Complemento', intentos: '1) SIX (operaciones de directivos anónimas: solo cargo e importe); 2) informe anual 2025 (participaciones del comité ejecutivo, sin operaciones); 3) actas de la junta 2026 no localizadas', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo.json'), 'utf8'));
const fD = [
  { id: 1, titulo: 'Históricos diarios de BEAN.SW, ^SSMI y CHSPI.SW (precio, rango, volumen, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/BEAN.SW/history' },
  { id: 2, titulo: 'BELIMO Holding AG: previsiones anuales 2026-2028 (ventas, EBITDA, EBIT, BPA, dividendo, deuda neta)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/BELIMO-HOLDING-AG-73773/finances/' },
  { id: 3, titulo: 'BELIMO Holding AG: consenso (10 analistas, «Outperform», objetivo medio 1.010,40 CHF, máximo 1.150, mínimo 790)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/BELIMO-HOLDING-AG-73773/consensus/' },
  { id: 4, titulo: 'Comparables: capitalización, ventas, EBITDA, EBIT, deuda neta, capital invertido, FCF y PER adelantado de Yahoo (fundamentals-timeseries y quoteSummary), pasados a CHF con el cambio de Yahoo del 14-oct-2026 (0,8362 CHF/USD)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Nach der gestrigen Kursschlappe … (Van Lanschot Kempen rebaja a Vender, objetivo 668 CHF; 33x EV/EBITDA esperado; consenso de 11 analistas con objetivo medio de 951,30)', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-07-09', url: 'https://www.cash.ch/news/top-news/nach-der-gestrigen-kursschlappe-findet-die-aktie-dieses-schweizer-ki-profiteurs-zu-alter-starke-zuruck-951700' },
  { id: 6, titulo: 'Bieten die Aktien von Belimo nach der Korrektur eine Kaufgelegenheit? (PER adelantado > 40x, récord de casi 60x en 2021, media larga de algo más de 23x; Research Partners objetivo 931)', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-07-10', url: 'https://www.cash.ch/news/top-news/bieten-die-aktien-von-belimo-nach-der-korrektur-eine-kaufgelegenheit-952118' },
  { id: 7, titulo: 'Eaton Signs Agreement to Acquire Boyd Thermal (9.500 M USD, 22,5 veces el EBITDA ajustado estimado de 2026; ventas de 1.700 M USD en 2026)', editor: 'Eaton (Business Wire)', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/' },
  { id: 8, titulo: 'Carrier announces portfolio transformation … to acquire Viessmann Climate Solutions (12.000 M EUR, ≈ 13 veces el EBITDA 2023 con sinergias)', editor: 'Carrier (TipRanks, nota de prensa)', tipo: 'Primaria', fecha: '2023-04-25', url: 'https://www.tipranks.com/news/press-releases/carrier-announces-portfolio-transformation-to-create-global-leader-in-intelligent-climate-and-energy-solutions' },
  { id: 9, titulo: 'Is Carrier Corporation making a huge mistake? (EBITDA 2023 de Viessmann de 770 M USD: ≈ 17 veces sin sinergias)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2023-05-01', url: 'https://www.fool.com/investing/2023/05/01/is-carrier-corporation-making-a-huge-mistake' },
  { id: 10, titulo: 'Schneider Electric to acquire controlling interest in Motivair (75 % por 850 M USD; múltiplo de un dígito medio de las ventas de 2025)', editor: 'Schneider Electric (vía rfp.wiki / prensa)', tipo: 'Prensa', fecha: '2024-10-17', url: 'https://www.rfp.wiki/cloud-computing/data-center-outsourcing-services/data-center-cooling/eaton/motivair' },
  { id: 11, titulo: 'Bono de la Confederación a 10 años (0,54 % el 8-oct-2026), tomado del informe de Roche del 14-oct-2026 de este repositorio', editor: 'Repositorio analisis-inversion (SNB)', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'informes/roche-2026-10-14/datos.json' },
  { id: 12, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026 (4,20 %)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 13, titulo: 'Half-Year Report 2026: calendario financiero (ventas 2026 el 18-ene-2027; informe anual el 1-mar-2027)', editor: 'BELIMO Holding AG', tipo: 'Primaria', fecha: '2026-07-20', url: 'https://report.belimo.com/HY26/en/financial-agenda' },
];
const ce = bolsa.cierres_ejercicio.filter((x) => +x.anio >= 2021);
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'BELIMO Holding AG', nombre_corto: 'Belimo', ticker: 'BEAN', isin: 'CH1101098163', mercado: 'SIX Swiss Exchange', indice_referencia: 'SMI (^SSMI); sector: SPI (CHSPI)',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Industria', industria: 'Productos de construcción (climatización)', sede: 'Hinwil (Suiza)', fundacion: '1975', empleados: 2881, web: 'www.belimo.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: ACC, capitalizacion_publicada: 9840, free_float_pct: 80.4,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toString().replace('.', ',')} M CHF/día (3 meses)`, proximos_resultados: '2027-01-18',
  },
  consenso: {
    guidance: 'Para 2026 la empresa espera un crecimiento de ventas en divisa local «mid-teens», por encima de su historia, y un margen EBIT superior al 20 % (informe anual de febrero de 2026); en julio, con el 1S26 (+29,6 %), reiteró el margen > 20 % y avisó de que el crecimiento del 2S se moderará por la base y por anualizar las subidas de precio, sin cifra nueva [D13]. No publica objetivos a medio plazo numéricos.',
    estimaciones: [
      { periodo: '2026e', ingresos: 1345, ebitda: 340.6, ebit: 297.1, bpa: 19.58, dpa: 12.57, fuente: 'MarketScreener [D2]' },
      { periodo: '2027e', ingresos: 1546, ebitda: 402.7, ebit: 353.8, bpa: 23.25, dpa: 15.95, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 1733, ebitda: 459.4, ebit: 405.3, bpa: 26.58, dpa: 18.58, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 6, mantener: 3, vender: 2, po_medio: 1010.4, po_min: 790, po_max: 1150 },
    revisiones: 'Solo hay una fuente gratuita con estimaciones completas (MarketScreener, 10 analistas) [D2]. La prensa suiza de julio de 2026 daba un objetivo medio de 951,30 CHF con seis compras, tres mantener y dos ventas [D5]; hoy MarketScreener da 1.010,40 CHF: los objetivos suben tras el 1S26. El reparto de recomendaciones de la tabla es el de julio [D5]. Van Lanschot Kempen rebajó a Vender (668 CHF) por valoración y Jefferies a Mantener; Research Partners subió su objetivo a 931 [D5, D6].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'Belimo ha multiplicado su precio por 2,0 en tres años (+25,7 % anual frente a +9,0 % del SMI) al pasar de valor de climatización a «beneficiario de la IA» por los centros de datos [D1, D6]. En 2026 el recorrido es plano (+2,4 % en el año): máximo de 969,5 CHF el 17-jun y caídas del 7,4 % el 8-jul (rebaja de Van Lanschot Kempen por valoración) y del 9,2 % el 14-sep [D1, D5]. La volatilidad del 39,8 % y la caída máxima del 44 % en 2022 muestran que el múltiplo se mueve con el sentimiento sobre la IA [D1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ce.map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Nueve cotizadas de climatización y control de edificios y de refrigeración de centros de datos: Trane, Johnson Controls, Carrier, Lennox y Daikin (equipos de climatización, clientes y competidores de Belimo), Siemens y Schneider (automatización de edificios), Vertiv (refrigeración de centros de datos) y Halma y Spirax (especialistas de nicho de alta calidad). Todas con datos de Yahoo del 14-oct-2026 pasados a CHF [D4]. Ninguna es un especialista puro de dispositivos de campo: Belimo no tiene comparable directo cotizado.',
    empresas: comps.empresas,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida)', comprador: 'Eaton', ev: 7944, ev_ventas: 5.59, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: '9.500 M USD; múltiplo sobre el EBITDA estimado de 2026 [D7].' },
      { fecha: '2023-04', objetivo: 'Viessmann Climate Solutions (bombas de calor, calderas)', comprador: 'Carrier', ev: 11760, ev_ventas: null, ev_ebitda: 17.1, prima_pct: null, excluir: false, comentario: '12.000 M EUR; 13x con sinergias según Carrier, ≈ 17x sin ellas [D8, D9].' },
      { fecha: '2024-10', objetivo: 'Motivair (refrigeración líquida, 75 %)', comprador: 'Schneider Electric', ev: 948, ev_ventas: 5.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '850 M USD por el 75 %; «múltiplo de un dígito medio de las ventas de 2025» (5x: punto medio, estimación) [D10].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo (Bosch-JCI residencial, Vertiv-CoolTera, otras)', tipo: 'Complemento', intentos: '1) Notas de prensa de las empresas; 2) búsqueda web de múltiplos publicados; 3) prensa sectorial', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) SIX (no hay registro público de posiciones cortas en Suiza); 2) prensa; 3) proveedores gratuitos', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'cash.ch: «Nach der gestrigen Kursschlappe…» y sección de comentarios de lectores', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-07-09', url: 'https://www.cash.ch/news/top-news/nach-der-gestrigen-kursschlappe-findet-die-aktie-dieses-schweizer-ki-profiteurs-zu-alter-starke-zuruck-951700' },
  { id: 2, titulo: 'cash.ch: «Bieten die Aktien von Belimo nach der Korrektur eine Kaufgelegenheit?»', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-07-10', url: 'https://www.cash.ch/news/top-news/bieten-die-aktien-von-belimo-nach-der-korrektur-eine-kaufgelegenheit-952118' },
  { id: 3, titulo: 'Seeking Alpha: flujo de noticias y análisis de BLHWF (resultados 1S26, «Vertiv, Eaton seen as top AI data center cooling winners»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://seekingalpha.com/api/sa/combined/BLHWF.xml' },
  { id: 4, titulo: 'Börse Express: «Belimo Aktie: Rechenzentren als Hoffnungsträger?» y «Mehr Gewinn, weniger Cash»', editor: 'Börse Express', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.boerse-express.com/news/articles/belimo-holding-aktie-mehr-gewinn-weniger-cash-930161' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'cash.ch (artículo y comentarios)', fecha: '2026-07', n_comentarios: 5, tono: 'Dividido', resumen: 'Debate entre «beneficiario de la IA» y «la más cara del sector de centros de datos» tras la rebaja de Van Lanschot Kempen [E1].' },
      { plataforma: 'cash.ch (¿oportunidad tras la corrección?)', fecha: '2026-07', n_comentarios: 3, tono: 'Dividido', resumen: 'Se plantea si la caída del 17 % desde máximos es una ocasión; el argumento en contra es el PER de más de 40 veces frente a una media de 23 [E2].' },
      { plataforma: 'Seeking Alpha (flujo BLHWF)', fecha: '2026-07', n_comentarios: 6, tono: 'Positivo', resumen: 'Titulares centrados en el crecimiento del 1S26 y en Belimo como ganadora de la refrigeración de IA junto a Vertiv y Eaton [E3].' },
      { plataforma: 'Börse Express (comentario de mercado)', fecha: '2026-07', n_comentarios: 2, tono: 'Neutro', resumen: 'Destaca «más beneficio, menos caja»: el FCF del semestre cae un 27 % por el capex y el circulante [E4].' },
    ],
    temas: [
      { tema: 'Valoración frente a crecimiento de centros de datos', postura: 'Dividida', peso: 'Alto', contraste: 'Con razón: el PER de 2027 es de 34 veces y la historia adelantada de 41 veces, pero la acción vale menos que lo que pide el precio en nuestro DCF.' },
      { tema: 'Moderación del crecimiento en el 2S26', postura: 'Bajista', peso: 'Medio', contraste: 'La empresa lo avisó (efecto base y anualización de precios) y no subió la guía tras un 1S de +29,6 %.' },
      { tema: 'Caja y capex', postura: 'Bajista', peso: 'Bajo', contraste: 'Correcto pero temporal: el capex del 6,7 % de ventas en el 1S26 es de ampliación.' },
    ],
    lectura: 'Poco debate de particulares (empresa suiza mediana; Reddit y Stocktwits no tienen hilos útiles). El tono es dividido y ha empeorado desde junio: tras el máximo de 969,5 CHF la conversación pasó de la tesis de la IA a la valoración. No contradice a los analistas (mayoría de compra) pero coincide con nuestra lectura: el negocio es excelente y el precio exigente. No anticipa ningún riesgo que el informe no recoja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
