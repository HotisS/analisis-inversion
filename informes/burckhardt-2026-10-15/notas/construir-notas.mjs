// Escribe las notas A-E de Burckhardt Compression (corte 2026-10-15) a partir de los documentos de notas/docs
// (informes anuales FY2020-FY2025, semestrales, presentaciones, acta de la junta 2026, notas de prensa) y de fuentes web.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
// En cada nota las citas van con [n] de su propia lista: se quita la letra propia ([A3] → [3]) y se avisa de cualquier cita a otra nota.
const guarda = (letra, obj) => {
  let txt = JSON.stringify(obj, null, 2);
  txt = txt.replace(/\[([A-E]\d+(?:[,–-]\s*[A-E]?\d+)*)\]/g, (m, dentro) => {
    const otras = (dentro.match(/[A-E]/g) || []).filter((l) => l !== letra);
    if (otras.length) console.warn(`${letra}: cita a otra nota ${m}`);
    return '[' + dentro.replace(new RegExp(letra, 'g'), '') + ']';
  });
  fs.writeFileSync(path.join(dir, `${letra}.json`), txt + '\n', 'utf8');
};
const BC = 'https://www.burckhardtcompression.com/fileadmin/uploads/burckhardt/documents/reports/archive/';
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (ejercicio abr-25 a mar-26): cuenta, balance, flujos y notas (segmentos, impuestos, fondo de comercio teórico, ventas por destino)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-report-2025-burckhardt-compression-260624-en.pdf' },
  { id: 2, titulo: 'Annual Report 2024 (abr-24 a mar-25; FY2023 reexpresado por el método del grado de avance)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2025-06-05', url: BC + 'annual-report-2024-burckhardt-compression-en.pdf' },
  { id: 3, titulo: 'Annual Report 2023 (abr-23 a mar-24; columna FY2022)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2024-06', url: BC + 'annual-report-2023-burckhardt-compression-en.pdf' },
  { id: 4, titulo: 'Annual Report 2022 (abr-22 a mar-23; segmentos FY2022 y FY2021)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2023-06', url: BC + 'annual-report-2022-burckhardt-compression-en.pdf' },
  { id: 5, titulo: 'Annual Report 2021 (abr-21 a mar-22; columnas FY2021 y FY2020)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2022-06', url: BC + 'annual-report-2021-burckhardt-compression-en.pdf' },
  { id: 6, titulo: 'Full-Year Results Fiscal Year 2025, presentación (4-jun-2026): pedidos, guía FY2026, plan a medio plazo aplazado, RONOA', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-results-2025-presentation-burckhardt-compression-en.pdf' },
  { id: 7, titulo: 'First-Half Results for Fiscal Year 2025 (abr-sep 2025; 1S FY2024 reexpresado)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2025-11-04', url: BC + 'half-year-results-2025-burckhardt-compression-en.pdf' },
  { id: 8, titulo: 'Ad hoc: medidas de reestructuración (hasta 220 puestos, ahorro ~20 M CHF/año, coste ~3 M en el 1S FY2026) y guía FY2026 confirmada', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-08-19', url: 'https://www.burckhardtcompression.com/about/news-stories-and-whitepapers/article/burckhardt-compression-announces-restructuring-measures-to-adapt-to-the-current-market-conditions-guidance-for-fiscal-year-2026-confirmed/' },
  { id: 9, titulo: 'Burckhardt Compression completes the acquisition of Fornovo Gas (14-jul-2026)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-07-14', url: 'https://www.burckhardtcompression.com/about/news-stories-and-whitepapers/article/burckhardt-compression-completes-the-acquisition-of-fornovo-gas/' },
  { id: 10, titulo: 'Capital Markets Day 2022, presentación (plan a medio plazo, mercado de servicio, cuotas)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2022-11-01', url: BC + 'capital-market-day-2022-presentation-burckhardt-compression-en.pdf' },
];
// Cuenta por función, en millones de CHF (miles en las cuentas). FY = abril-marzo, etiqueta de inicio de la empresa.
const cuenta = [
  { periodo: 'FY2020', ingresos: 658.6, coste_ventas: 492.4, gastos_generales: 93.1, ebitda: 81.9, amortizaciones: 21.1, ebit: 60.8, resultado_financiero: -1.6, bai: 59.2, impuestos: 12.0, minoritarios: 3.2, beneficio_neto: 44.0, gastos_financieros: 3.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 13.00, dpa: 6.50, dpa_extraordinario: 0, acciones_diluidas: 3.387 },
  { periodo: 'FY2021', ingresos: 650.7, coste_ventas: 459.9, gastos_generales: 106.9, ebitda: 90.3, amortizaciones: 20.0, ebit: 70.3, resultado_financiero: -4.7, bai: 65.6, impuestos: 15.2, minoritarios: 0.2, beneficio_neto: 50.2, gastos_financieros: 3.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 14.82, dpa: 7.50, dpa_extraordinario: 0, acciones_diluidas: 3.390 },
  { periodo: 'FY2022', ingresos: 829.7, coste_ventas: 585.2, gastos_generales: 117.0, ebitda: 116.7, amortizaciones: 21.8, ebit: 95.0, resultado_financiero: -3.8, bai: 91.2, impuestos: 21.2, minoritarios: 0.1, beneficio_neto: 69.9, gastos_financieros: 3.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 20.64, dpa: 12.00, dpa_extraordinario: 0, acciones_diluidas: 3.389 },
  { periodo: 'FY2023', ingresos: 972.8, coste_ventas: 717.8, gastos_generales: 119.4, ebitda: 133.2, amortizaciones: 18.9, ebit: 114.3, resultado_financiero: -3.4, bai: 110.9, impuestos: 26.4, minoritarios: 0.1, beneficio_neto: 84.4, gastos_financieros: 4.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 24.98, dpa: 15.50, dpa_extraordinario: 0, acciones_diluidas: 3.379 },
  { periodo: 'FY2024', ingresos: 1095.6, coste_ventas: 789.3, gastos_generales: 129.9, ebitda: 163.4, amortizaciones: 22.6, ebit: 140.8, resultado_financiero: -3.3, bai: 137.5, impuestos: 31.8, minoritarios: 0.0, beneficio_neto: 105.6, gastos_financieros: 3.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 31.20, dpa: 18.00, dpa_extraordinario: 0, acciones_diluidas: 3.384 },
  { periodo: 'FY2025', ingresos: 1057.1, coste_ventas: 752.2, gastos_generales: 128.3, ebitda: 162.8, amortizaciones: 21.8, ebit: 141.0, resultado_financiero: -2.9, bai: 138.2, impuestos: 28.0, minoritarios: 0.0, beneficio_neto: 110.1, gastos_financieros: 2.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 32.60, dpa: 18.00, dpa_extraordinario: 0, acciones_diluidas: 3.378 },
];
const balance = [
  { periodo: 'FY2020', activo_total: 758.1, activo_corriente: 547.1, pasivo_corriente: 375.9, pasivo_total: 538.5, fondo_comercio: 0, intangibles: 12.4, inmovilizado_material: 180.1, existencias: 151.0, clientes: 260.4, proveedores: 92.5, activos_contrato: null, pasivos_contrato: 92.3, caja: 75.4, deuda_financiera: 157.8, arrendamientos: 0, patrimonio_neto: 219.1, minoritarios: 0.5, reservas: 212.3 },
  { periodo: 'FY2021', activo_total: 837.8, activo_corriente: 620.8, pasivo_corriente: 438.3, pasivo_total: 594.9, fondo_comercio: 0, intangibles: 13.5, inmovilizado_material: 183.2, existencias: 192.4, clientes: 259.0, proveedores: 97.3, activos_contrato: null, pasivos_contrato: 162.7, caja: 101.0, deuda_financiera: 157.8, arrendamientos: 0, patrimonio_neto: 242.3, minoritarios: 0.6, reservas: 235.5 },
  { periodo: 'FY2022', activo_total: 940.6, activo_corriente: 735.2, pasivo_corriente: 517.8, pasivo_total: 679.0, fondo_comercio: 0, intangibles: 11.7, inmovilizado_material: 172.0, existencias: 286.2, clientes: 245.5, proveedores: 109.1, activos_contrato: null, pasivos_contrato: 222.8, caja: 129.1, deuda_financiera: 136.2, arrendamientos: 0, patrimonio_neto: 261.2, minoritarios: 0.4, reservas: 267.9 },
  { periodo: 'FY2023', activo_total: 1063.1, activo_corriente: 855.6, pasivo_corriente: 670.0, pasivo_total: 766.7, fondo_comercio: 0, intangibles: 12.1, inmovilizado_material: 173.1, existencias: 314.9, clientes: 360.0, proveedores: 143.2, activos_contrato: null, pasivos_contrato: 209.8, caja: 107.2, deuda_financiera: 169.5, arrendamientos: 0, patrimonio_neto: 296.0, minoritarios: 0.4, reservas: 292.7 },
  { periodo: 'FY2024', activo_total: 1167.3, activo_corriente: 961.7, pasivo_corriente: 639.1, pasivo_total: 827.2, fondo_comercio: 0, intangibles: 11.3, inmovilizado_material: 172.8, existencias: 301.6, clientes: 356.1, proveedores: 148.5, activos_contrato: null, pasivos_contrato: 252.8, caja: 222.9, deuda_financiera: 153.3, arrendamientos: 0, patrimonio_neto: 339.8, minoritarios: 0.4, reservas: 341.1 },
  { periodo: 'FY2025', activo_total: 1176.6, activo_corriente: 969.9, pasivo_corriente: 626.3, pasivo_total: 815.1, fondo_comercio: 0, intangibles: 9.3, inmovilizado_material: 172.6, existencias: 385.1, clientes: 253.7, proveedores: 170.3, activos_contrato: null, pasivos_contrato: 284.9, caja: 263.0, deuda_financiera: 152.2, arrendamientos: 0, patrimonio_neto: 361.2, minoritarios: 0.4, reservas: 366.3 },
];
const flujos = [
  { periodo: 'FY2020', flujo_operativo: 132.2, capex: 20.4, pagos_arrendamientos: 0, adquisiciones: 71.6, desinversiones: 1.2, dividendos: 30.0, recompras: 3.2, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2021', flujo_operativo: 134.8, capex: 22.8, pagos_arrendamientos: 0, adquisiciones: 63.3, desinversiones: 0.5, dividendos: 22.2, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2022', flujo_operativo: 110.6, capex: 20.5, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 7.4, dividendos: 25.6, recompras: 13.7, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2023', flujo_operativo: 17.8, capex: 22.5, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0.1, dividendos: 40.4, recompras: 0.5, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2024', flujo_operativo: 212.8, capex: 25.4, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 8.3, dividendos: 52.5, recompras: 4.8, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2025', flujo_operativo: 149.4, capex: 22.9, pagos_arrendamientos: 0, adquisiciones: 8.1, desinversiones: 1.7, dividendos: 60.9, recompras: 3.9, emision_acciones: 0, intereses_en_financiacion: 0 },
];
const segmentos = [
  { nombre: 'Systems (compresores nuevos)', descripcion: 'Compresores de pistón a medida (Laby, Laby-GI, API 618, hipercompresores de LDPE, diafragma, alta velocidad) para petroquímica, transporte y almacenamiento de gas (GNL/GLP en buques y terminales), hidrógeno, gases industriales, refino y tratamiento de gas.', tipo_resultado: 'EBIT', historico: [
    { periodo: 'FY2020', ingresos: 409.8, resultado: 16.2 }, { periodo: 'FY2021', ingresos: 372.7, resultado: 21.1 }, { periodo: 'FY2022', ingresos: 489.7, resultado: 30.3 },
    { periodo: 'FY2023', ingresos: 633.6, resultado: 40.5 }, { periodo: 'FY2024', ingresos: 748.8, resultado: 67.9 }, { periodo: 'FY2025', ingresos: 738.6, resultado: 79.2 } ] },
  { nombre: 'Services (recambios y servicio)', descripcion: 'Recambios (válvulas, aros, empaquetaduras), reparaciones, revisiones y mejoras para compresores propios y de otras marcas, vigilancia digital (UP! Solutions) y contratos de servicio.', tipo_resultado: 'EBIT', historico: [
    { periodo: 'FY2020', ingresos: 248.8, resultado: 51.2 }, { periodo: 'FY2021', ingresos: 278.0, resultado: 58.4 }, { periodo: 'FY2022', ingresos: 340.0, resultado: 75.0 },
    { periodo: 'FY2023', ingresos: 339.2, resultado: 83.5 }, { periodo: 'FY2024', ingresos: 346.8, resultado: 85.7 }, { periodo: 'FY2025', ingresos: 318.5, resultado: 77.7 } ] },
];
const geo = [['China', 431.8], ['Otros Asia y Australia', 219.5], ['Europa', 194.4], ['Oriente Medio', 106.8], ['Norteamérica', 85.7], ['África', 10.6], ['Sudamérica', 8.3]];
const A = {
  _estado: 'completa',
  financieros: {
    cuenta, ltm: { periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: 1057.1, ebitda: 162.8, ebit: 141.0, beneficio_neto: 110.1, bpa: 32.60, dpa: 18.00, dpa_extraordinario: 0, fcf: 126.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2023', descripcion: 'Cambio de criterio de ingresos: desde FY2024 los proyectos de más de 7 M CHF y más de un año se reconocen por grado de avance (PoC) en vez de a la entrega; FY2023 reexpresado [A2, A7]. FY2020-FY2022 siguen a la entrega y no son del todo comparables.' },
    ],
    comentario: 'Las ventas pasaron de 658,6 M CHF en FY2020 a 1.095,6 M en FY2024 (máximo) y bajaron a 1.057,1 M en FY2025 (−3,5 %; +1,3 % sin divisa) [A1, A6]. El crecimiento fue casi todo orgánico: cinco años seguidos con pedidos por encima de las ventas (GNL y GLP en buques, petroquímica en China, hidrógeno) [A1]. El margen EBIT subió de 9,2 % a 13,3 % por la mezcla (más Systems con mejor precio), el aprovechamiento de las fábricas y el control de los gastos generales (12,1 % de las ventas en FY2025) [A6]. Systems alcanzó por primera vez un margen EBIT de dos dígitos (10,7 %) mientras Services bajó al 24,4 % por menos volumen [A1]. FY2025 tiene un tipo impositivo bajo (20,3 % frente a 23,2 %) que aporta ~1 CHF al BPA [A1]. El año en curso será de caída: guía de 900-1.000 M de ventas y margen EBIT de ~12 % por la caída de pedidos del 31,9 % [A6, A8].',
    ajustes: 'Se usan las cifras publicadas (Swiss GAAP FER). El fondo de comercio se compensa con el patrimonio al comprar, así que no hay amortización de fondo de comercio en la cuenta; la amortización teórica fue de 2,9 M en FY2025 y 9,2 M en FY2024, y el fondo de comercio teórico neto, 9,3 M [A1]. FY2023 está reexpresado por el grado de avance (ventas 972,8 M frente a 982,0 M publicados; BPA 24,98 frente a 26,63) [A2]. No hay partidas no recurrentes relevantes en FY2020-FY2025; en FY2026 habrá unos 3 M de reestructuración en el primer semestre [A8], que dejamos dentro del margen.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S FY24', ingresos: 502.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 14.50, vs_consenso: null },
      { periodo: '2S FY24', ingresos: 593.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 16.70, vs_consenso: null },
      { periodo: '1S FY25', ingresos: 516.2, crecimiento_pct: 2.8, crecimiento_organico_pct: 7.4, ebitda: null, margen_ebitda_pct: null, bpa: 14.40, vs_consenso: null },
      { periodo: '2S FY25', ingresos: 540.9, crecimiento_pct: -8.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 18.20, vs_consenso: null },
    ],
    ultima_presentacion: 'En los resultados del 1S FY2025 (4-nov-2025) la dirección confirmó la guía de ~1.100 M de ventas y el plan a medio plazo y habló de una «clara» mejora de pedidos en el segundo semestre tras la pausa por los aranceles de EE. UU. [A7]. Siete meses después (4-jun-2026) el discurso cambió: los pedidos del año cayeron un 31,9 % (Systems −42,3 %), el conflicto de Oriente Medio volvió a frenar decisiones en el último mes y la empresa aplazó sin fecha los objetivos de 2027 (1.200 M de ventas y 12-15 % de margen EBIT) [A6]. La guía FY2026 (900-1.000 M, margen ~12 %, segundo semestre más fuerte) supone que Oriente Medio se normaliza en la segunda mitad y que el franco no sube más [A6]. En agosto la empresa anunció hasta 220 despidos (150 en Winterthur) para ahorrar ~20 M al año y confirmó la guía [A8]. Lo que la dirección no cuantificó: la cartera de pedidos en francos (habla de «normalización» tras cinco años con más pedidos que ventas) y el peso de China (41 % de las ventas por destino del cliente) en la caída [A1, A6].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2028', importe: 150 }, { anio: '2029+', importe: 2.2 }],
    liquidez: 'Caja de 263,0 M CHF a 31-mar-2026 y posición financiera neta positiva de 110,8 M; deuda de 152,2 M, casi toda un bono de 150 M que vence en septiembre de 2028 [A1, A6].',
    rating: 'Sin rating',
    coste_deuda_pct: 1.8,
    vida_media_anios: 2.4,
    otros_pasivos: 'Sin NIIF 16: los alquileres van en gastos y no hay pasivos por arrendamiento en balance (Swiss GAAP FER) [A1]. Provisiones de 44,3 M (garantías, contratos onerosos, personal) [A1]. Los anticipos de clientes (284,9 M) son la partida que más pesa: se compensan con entregas del propio contrato, así que van al circulante y no a la deuda; con menos pedidos bajarán y consumirán caja [A1, A6]. El 36,4 % de las cuentas a cobrar llevaba más de 90 días vencido (24,2 % un año antes), sobre todo proyectos de China y EE. UU. [A1, A6]. Planes de pensiones suizos sin déficit material en balance (Swiss GAAP FER 26) [A1].',
    comentario: 'El circulante comercial neto de anticipos bajó de 321,9 M (33 % de las ventas) en FY2023 a 183,6 M (17 %) en FY2025, por el cobro de ~100 M de clientes y más anticipos [A1, A6]. Las existencias subieron un 27,7 % (más obra en curso y anticipos a proveedores), señal de que la cartera se está ejecutando [A1]. La posición financiera neta pasó de −62,3 M en FY2023 a +110,8 M [A2, A6]. El riesgo es que, con pedidos un 32 % más bajos, los anticipos caigan y el circulante vuelva al 21-25 % de las ventas: unos 40-60 M de caja que salen sin que cambie el negocio.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo acumulado de FY2020-FY2025 fue de 757,6 M CHF, frente a 469,9 M de beneficio: la conversión es alta, pero muy irregular por los anticipos [A1, A2, A3, A5]. FY2023 (17,8 M) fue el año malo: clientes +122 M y existencias +77 M con la cartera en máximos; FY2024 (212,8 M) lo devolvió con 68 M más de anticipos [A2]. El capex es bajo y estable, 20-25 M al año (~2,2 % de las ventas), casi igual a la amortización: la empresa lo describe como mantenimiento más digitalización, y FY2026 lleva la nueva fábrica de recambios de Vadodara (India) [A6]. Las adquisiciones de FY2020-FY2021 son sobre todo la compra de minoritarios de Shenyang (101,9 M en dos años) [A5].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young AG', anios_auditor: 3, opinion: 'Favorable',
    comentario: 'Burckhardt presenta en Swiss GAAP FER, no en NIIF: el fondo de comercio se compensa con el patrimonio (sale del ROIC y del balance) y no hay NIIF 16 [A1]. El cambio a grado de avance en FY2024 (con FY2023 reexpresado) adelanta ingresos de proyectos grandes: en FY2025, 251,7 M de las ventas (24 %) vinieron de contratos por grado de avance, frente a 407,9 M en FY2024 [A1]. Eso hace más estable la cifra de ventas pero añade juicio sobre costes por incurrir. Señal a vigilar: las cuentas vencidas a más de 90 días suben al 36,4 % de los clientes [A6]. Auditor nuevo desde FY2024 (EY sustituye a PwC tras un concurso) [A1].',
    senales: [
      { senal: 'Cambio de criterio de ingresos (a grado de avance) en FY2024', nivel: 'Media', comentario: 'Reexpresa FY2023 (−9,2 M de ventas, −7,1 M de EBIT) y rompe la comparación con FY2020-FY2022 [A2].' },
      { senal: 'Cuentas a cobrar vencidas > 90 días: 36,4 % (24,2 % un año antes)', nivel: 'Media', comentario: 'Importe estable en términos absolutos, concentrado en proyectos de China y EE. UU. [A1, A6].' },
      { senal: 'Fondo de comercio compensado con patrimonio (Swiss GAAP FER)', nivel: 'Baja', comentario: 'Neto teórico de 9,3 M: el efecto en el ROIC es pequeño [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparto del 50-70 % del BPA como dividendo durante el plan 2023-2027 (18,00 CHF por FY2025, 55 %; igual que el año anterior) [A6]. Recompras solo para planes de acciones (3,9 M en FY2025) [A1]. Prioridades: crecimiento orgánico con capex de mantenimiento similar a la amortización, compras pequeñas con EBIT/precio > WACC y ratio de patrimonio > 30 % [A6].',
    adquisiciones: [
      { anio: '2020', objetivo: 'Minoritarios de Burckhardt Compression (Shenyang) (40 % en dos tramos)', importe: 101.9, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Integrada; la fábrica de Shenyang es base para China (41 % de las ventas en FY2025) [A5].' },
      { anio: '2025', objetivo: 'ACT (Advanced Compressor Technology, EE. UU.; recambios y servicio en Illinois y Texas)', importe: 8.1, ev_ebitda: null, financiacion: 'Caja', resultado: 'Comprada en sep-2025; refuerza la fabricación local de recambios frente a los aranceles [A1, A7].' },
      { anio: '2026', objetivo: 'Fornovo Gas (Italia; compresores para biogás y GNC, ~40 M CHF de ventas, 120 empleados)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada el 14-jul-2026; precio no publicado [A6, A9].' },
    ],
    comentario: 'La dirección ha asignado el capital con disciplina: el capex no ha pasado del 2,6 % de las ventas en seis años, las compras han sido pequeñas o de minoritarios y el dividendo ha subido de 6,50 a 18,00 CHF con el BPA [A1, A6]. El RONOA (EBIT sobre activos operativos netos) pasó del 10,2 % en FY2018 al 40,4 % en FY2025, sobre todo por la rotación del capital (anticipos) [A6]. La dilución es nula (acciones estables en ~3,38 M). Lo que falta por ver es una compra mayor: el plan a medio plazo abre la puerta a compras «selectivas» y Fornovo es la primera en una línea de producto nueva (compresores configurables).',
    confianza: 'Alta',
  },
  negocio: { segmentos, geografias: geo.map(([nombre, v]) => ({ nombre, peso_pct: r1(v / 1057.1 * 100) })), geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos del grupo (M CHF)', valor_anterior: '1.151,2', valor_actual: '784,3', variacion: '−31,9 %', comentario: 'Systems −42,3 %; Services −5,4 % [A6].' },
      { kpi: 'Relación pedidos/ventas', valor_anterior: '1,05', valor_actual: '0,74', variacion: '−0,31', comentario: 'Primera vez por debajo de 1 en seis años [A1].' },
      { kpi: 'Margen EBIT Systems', valor_anterior: '9,1 %', valor_actual: '10,7 %', variacion: '+1,6 pp', comentario: 'Mezcla favorable y fábricas llenas [A6].' },
      { kpi: 'Margen EBIT Services', valor_anterior: '24,7 %', valor_actual: '24,4 %', variacion: '−0,3 pp', comentario: 'Menor utilización [A6].' },
      { kpi: 'RONOA', valor_anterior: '32,6 %', valor_actual: '40,4 %', variacion: '+7,8 pp', comentario: 'EBIT sobre activos operativos netos medios [A6].' },
      { kpi: 'Ventas por grado de avance (M CHF)', valor_anterior: '407,9', valor_actual: '251,7', variacion: '−38 %', comentario: 'Proyectos grandes en ejecución [A1].' },
    ] },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'cartera de pedidos en CHF', tipo: 'Complemento', intentos: '1) Informe anual FY2025 y carta a los accionistas (solo «normalización»); 2) presentación de resultados (gráfico sin cifra); 3) derivarla de pedidos menos ventas no es fiable por divisa y cancelaciones', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Capital Markets Day 2022: mercado direccionable de compresores de pistón (4-5 mil M CHF; BCG) y mercado de servicio accesible (~1.400 M CHF, +2,6 % anual; cuota 60-70 % en máquinas propias)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2022-11-01', url: BC + 'capital-market-day-2022-presentation-burckhardt-compression-en.pdf' },
  { id: 2, titulo: 'Reciprocating Compressors Market: 4,68 mil M USD en 2025, 4,88 en 2026, 5,89 en 2031 (+3,84 % anual); los cinco primeros, 35-40 %', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/reciprocating-compressors-market' },
  { id: 3, titulo: 'Annual Report 2025: mercados, segmentos (petroquímica, GNL/GLP en buques, hidrógeno, refino), Systems y Services', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-report-2025-burckhardt-compression-260624-en.pdf' },
  { id: 4, titulo: 'Full-Year Results FY2025, presentación: tendencias por segmento y región, pedido de Hanwha Ocean (14 compresores para siete metaneros)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-results-2025-presentation-burckhardt-compression-en.pdf' },
  { id: 5, titulo: 'Yahoo Finance: datos de cuentas y mercado de Atlas Copco, Ingersoll Rand, Dover, Sulzer, Wärtsilä, Alfa Laval, Baker Hughes, Siemens Energy, Kirloskar Pneumatic y Enerflex (15-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 6, titulo: 'Annual Report 2021 (historia, compras de Shenyang, Arbos, CSM y otras)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2022-06', url: BC + 'annual-report-2021-burckhardt-compression-en.pdf' },
  { id: 7, titulo: 'Sustainability Report / informe anual 2025: objetivos de sostenibilidad e intensidad de CO2', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06', url: 'https://www.burckhardtcompression.com/fileadmin/uploads/burckhardt/documents/sustainability/sustainability-report-2025-burckhardt-compression-en.pdf' },
  { id: 8, titulo: 'Burckhardt Compression (historia: Sulzer, salida a bolsa de 2006)', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026', url: 'https://en.wikipedia.org/wiki/Burckhardt_Compression' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Fundada en Basilea en 1844 por Franz Burckhardt, la empresa empezó a fabricar compresores de pistón a finales del siglo XIX y pasó al grupo Sulzer en 1969 [B8]. En 2002 Sulzer la vendió a su dirección y a inversores (MBO) y en 2006 salió a bolsa en la SIX [B8]. Desde entonces ha crecido con dos divisiones: Systems (compresores nuevos, sobre todo Laby para GNL y GLP en buques e hipercompresores para polietileno) y Services, que desde 2016 atiende también máquinas de otras marcas [B3]. Compró el 100 % de su filial de Shenyang en 2020-2021 para producir en China [B6] y en 2022 lanzó el plan a medio plazo con objetivo de 1.100 M CHF de ventas, elevado después a 1.200 M y aplazado en 2026 [B4].',
    hitos: [
      { anio: '1844', hito: 'Fundación en Basilea (Franz Burckhardt).' },
      { anio: '1969', hito: 'Integrada en el grupo Sulzer.' },
      { anio: '2002', hito: 'Compra por la dirección e inversores (MBO) a Sulzer.' },
      { anio: '2006', hito: 'Salida a bolsa en la SIX Swiss Exchange.' },
      { anio: '2016', hito: 'Organización en dos divisiones: Systems y Services.' },
      { anio: '2020-2021', hito: 'Compra del 40 % restante de Shenyang (101,9 M CHF).' },
      { anio: '2022', hito: 'Plan a medio plazo: 1.100 M de ventas y 12-15 % de margen EBIT en FY2027.' },
      { anio: '2025', hito: 'Mayor pedido marino de su historia (Hanwha Ocean, 14 compresores) y compra de ACT en EE. UU.' },
      { anio: '2026', hito: 'Pedidos −32 %, objetivos de 2027 aplazados, reestructuración (220 puestos) y compra de Fornovo Gas.' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Burckhardt Compression diseña, fabrica y mantiene compresores de pistón (alternativos) para gases difíciles y altas presiones. Systems (70 % de las ventas en FY2025) vende máquinas a medida: compresores Laby y Laby-GI para el gas de evaporación y el combustible de metaneros y gaseros (GNL y GLP), hipercompresores de hasta 3.500 bar para polietileno de baja densidad y EVA (paneles solares), compresores API 618 para refino y química, de diafragma para hidrógeno y de alta velocidad para tratamiento de gas [B3, B4]. Services (30 %) vende recambios, reparaciones, revisiones y mejoras para su propia base instalada y para máquinas de otras marcas, con 45+ centros en el mundo [B3]. Fábricas en Winterthur (Suiza), Shenyang (China) e India; clientes: astilleros (Corea y China), petroquímicas, refinerías, empresas de gas industrial y de hidrógeno [B3].',
    como_gana_dinero: 'El margen está en el servicio: Services gana un 24,4 % de EBIT sobre ventas y Systems un 10,7 %; con el 30 % de las ventas, Services da la mitad del beneficio operativo (77,7 de 156,9 M antes de corporativo) [B3]. Cada compresor vendido genera décadas de recambios (válvulas, aros, empaquetaduras), así que la base instalada es la fuente de ingresos recurrentes. Systems funciona por proyectos con anticipos de clientes (284,9 M a mar-26), que financian el circulante: de ahí un RONOA del 40 % [B4]. El margen de Systems depende de la ocupación de las fábricas y de la mezcla (los compresores marinos estandarizados y los hipercompresores dejan más); el de Services, del volumen de recambios. Apalancamiento operativo alto: con −3,5 % de ventas el EBIT de Services cayó un 9,3 % [B3].',
    clientes: 'Concentración media: en marino los clientes son unos pocos astilleros coreanos y chinos (Hanwha Ocean, HD Hyundai, Samsung y astilleros chinos), que compran por buque, y el armador elige el sistema de propulsión (ME-GI de Everllence, X-DF de WinGD), que fija el compresor [B4]. China pesa el 40,8 % de las ventas por destino y Otros Asia el 20,8 % [B3]. No publica el peso del primer cliente. Poder de precios demostrado en Systems: el margen bruto subió de 19,1 % a 21,1 % con ventas casi iguales, y en Services la empresa repercute los aranceles de EE. UU. [B3, B4]. En servicio la cuota es del 60-70 % en sus propias máquinas y del 8-12 % en las de otras marcas (CMD 2022) [B1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Mercado mundial de compresores de pistón para procesos (no de aire comprimido): máquinas nuevas para petroquímica, refino, gases industriales, transporte y almacenamiento de gas (incluidos los buques de GNL y GLP), hidrógeno y tratamiento de gas, más el servicio y los recambios de la base instalada. Se usan dos fuentes: la propia empresa (con BCG, CMD 2022) estima un mercado direccionable de 4.000-5.000 M CHF al año en máquinas y ~1.400 M CHF en servicio accesible [B1]; Mordor Intelligence da 4.680 M USD en 2025 para el mercado de compresores de pistón (definición algo más amplia en máquinas pequeñas y algo más estrecha en servicio) [B2]. Usamos la de la empresa porque tiene su mismo perímetro.',
    tamano: '≈ 5.500-6.500 M CHF en 2025 (máquinas 4.000-5.000 M + servicio ~1.500 M) [B1]; 4.680 M USD según Mordor [B2]',
    unidad_serie: 'millones de USD (Mordor Intelligence)', serie: [{ anio: '2025', tamano: 4680 }, { anio: '2026e', tamano: 4880 }, { anio: '2031e', tamano: 5890 }],
    tcac_historico_pct: null, tcac_previsto_pct: 3.8, cr5_pct: 37.5, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Flota de metaneros y gaseros (GNL, GLP, amoniaco) con propulsión de gas', efecto: '+', horizonte: 'Estructural', evidencia: 'Mayor pedido marino de su historia: 14 compresores para siete metaneros de 174.000 m³ de Hanwha Ocean [B4].' },
      { driver: 'Capacidad petroquímica en China (LDPE, EVA para paneles solares)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Sobrecapacidad y aranceles: decisiones de nuevas plantas aplazadas en China y Oriente Medio en FY2025 [B4].' },
      { driver: 'Seguridad energética: terminales de importación de GNL, almacenamiento', efecto: '+', horizonte: 'Estructural', evidencia: 'Actividad continua en terminales de importación de GNL (Alemania, Finlandia) [B4].' },
      { driver: 'Hidrógeno (movilidad, almacenamiento, licuación)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Caída en EE. UU. tras retirar ayudas; Europa lenta [B4].' },
      { driver: 'Base instalada y servicio (recambios para máquinas propias y de otras marcas)', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de servicio accesible de ~1.400 M CHF que crece ~2,6 % anual [B1].' },
      { driver: 'Franco suizo fuerte', efecto: '−', horizonte: 'Cíclico', evidencia: 'En FY2025 el franco subió un 9,4 % frente al USD y un 17,4 % frente a la rupia [B4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos competidores globales en pistón de alta presión (Baker Hughes/Nuovo Pignone, Siemens Energy/Dresser-Rand, Ariel, Hanwha Power Systems, fabricantes chinos); en marino Burckhardt tiene posición fuerte en GLP y competencia en GNL de baja presión [B3, B4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Astilleros y contratistas grandes negocian por proyecto; pero el compresor es crítico y una parte pequeña del coste de la planta o del buque [B3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fundición y mecanizado propios en Suiza, China e India; auxiliares (motores, enfriadores) estándar [B4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Referencias, homologación (API 618) y base instalada protegen; los fabricantes chinos entran en gama media [B3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Compresores de tornillo y centrífugos en volúmenes altos y presiones bajas; motores eléctricos de buques a largo plazo [B3].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Los pedidos de máquinas nuevas cayeron un 42 % en FY2025 tras cinco años con más pedidos que ventas; el servicio solo un 5 % [B3, B4]. El sector se comporta como un bien de equipo de energía: en 2015-2017 (petróleo barato y fin del ciclo de buques) las ventas de Burckhardt cayeron y el margen EBIT bajó al 7,4 % en FY2018; en 2020 resistió por la cartera (ventas −1 %); en 2022-2024 vivió el ciclo de GNL y petroquímica china [B4]. Indicadores: pedidos de metaneros, decisiones de inversión en petroquímica y pedidos/ventas de Systems.' },
    regulacion: 'La OMI exige reducir las emisiones del transporte marítimo (−20 % en 2030 frente a 2008 y emisiones netas cero hacia 2050), lo que empuja la propulsión de gas, amoniaco y metanol en buques nuevos y los compresores de combustible [B3]. La normativa API 618 fija los requisitos de los compresores de pistón en refino y petroquímica. En EE. UU., los aranceles desde abril de 2025 encarecen importaciones (Burckhardt fabrica recambios localmente con ACT) y la retirada de ayudas al hidrógeno frenó ese segmento [B4]. En Europa, las reglas de hidrógeno verde y biometano (RED III) favorecen a Fornovo Gas [B4].',
    tendencias: 'Tres cambios: (1) la propulsión de gas en buques grandes, que convierte a los astilleros en clientes recurrentes de compresores de alta presión (ME-GI a 330 bar) y deja base instalada para servicio; (2) la digitalización del servicio con IA (UP! Solutions, BC Activate, detección de hasta el 90 % de fallos mecánicos en pruebas), que puede aumentar los ingresos por máquina [B4]; (3) la competencia china en compresores de gama media, que presiona precios en petroquímica china. Burckhardt gana con (1) y (2) y pierde cuota con (3) si no localiza producción, que es lo que hace en Shenyang e India.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 17.6,
    posicion: 'Líder mundial en compresores de pistón para gas de evaporación y combustible en buques de GLP y uno de los líderes en hipercompresores de LDPE; cuota estimada ~17-19 % del mercado direccionable de máquinas y servicio (estimación propia: 1.057 M de ventas sobre 5.500-6.500 M) [B1, B3]; 60-70 % del servicio de sus propias máquinas [B1].',
    competidores: [
      { nombre: 'Atlas Copco (Gas and Process)', pais: 'Suecia', ticker: 'ATCO A', ingresos: 14209, cuota_pct: null, margen_ebit_pct: 20.6, comentario: 'Grupo mucho mayor; compite en compresores centrífugos y de tornillo de proceso, no en pistón de alta presión. Ingresos de 12 meses en CHF al cambio del BCE del 14-oct [B5].' },
      { nombre: 'Baker Hughes (Nuovo Pignone)', pais: 'EE. UU.', ticker: 'BKR', ingresos: 23106, cuota_pct: null, margen_ebit_pct: 13.6, comentario: 'Compresores de pistón y centrífugos para GNL, refino y petroquímica; compró Chart en 2026 [B5].' },
      { nombre: 'Siemens Energy (Dresser-Rand)', pais: 'Alemania', ticker: 'ENR', ingresos: 39040, cuota_pct: null, margen_ebit_pct: 10.0, comentario: 'Compresores de pistón Dresser-Rand y centrífugos; foco en energía [B5].' },
      { nombre: 'Ingersoll Rand', pais: 'EE. UU.', ticker: 'IR', ingresos: 6619, cuota_pct: null, margen_ebit_pct: 18.5, comentario: 'Compresores industriales y de proceso; poca presencia en pistón de alta presión [B5].' },
      { nombre: 'Ariel Corporation', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en compresores de pistón de alta velocidad para gas natural en EE. UU.; no cotiza.' },
      { nombre: 'Kirloskar Pneumatic', pais: 'India', ticker: 'KIRLPNU', ingresos: 158, cuota_pct: null, margen_ebit_pct: 19.4, comentario: 'Compresores de proceso y refrigeración en India; competidor local [B5].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de equipos.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'La base instalada se atiende 30-40 años con recambios de Burckhardt: cuota de servicio del 60-70 % en sus máquinas y margen EBIT de Services del 24-25 % durante cinco años [B1, B3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Tecnología Laby (sin aros de pistón) y referencias en GNL, GLP e hipercompresores; homologación de astilleros y motoristas (Everllence) [B4].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Producción en China e India, pero base de costes suiza; el franco fuerte resta [B4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nichos pequeños (compresores marinos de GLP, hipercompresores de LDPE) con dos o tres proveedores [B3].' },
      ],
    },
    amenazas: 'La mayor amenaza es la competencia china en compresores de proceso de gama media y en buques construidos en China (probabilidad media: ya aparece en petroquímica china, con márgenes débiles) [B3]. A largo plazo, un cambio de propulsión marina (amoniaco, metanol o eléctrica) podría reducir la necesidad de compresores de gas a alta presión, aunque Burckhardt ya tiene primeras referencias en amoniaco [B3]. En servicio, terceros independientes que copian recambios presionan precios en máquinas antiguas.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El asunto más material es la exposición a combustibles fósiles: la mayoría de las máquinas se venden para gas natural, GLP, petroquímica y refino; la empresa estima que el 37 % de los pedidos de FY2025 apoya la transición energética (objetivo 40 % en FY2027) [B7]. Reducción del 55 % en la intensidad de CO2 (alcances 1 y 2) frente a 2021, por encima del objetivo del 50 %, y 80 % de electricidad renovable [B7]. Seguridad laboral: tasa de accidentes con baja de 0,3 (objetivo < 0,7) [B7].',
    controversias: 'No se han encontrado sanciones, litigios relevantes ni incidentes en los últimos tres años en los informes anuales ni en la prensa revisada. La reestructuración de 2026 (hasta 220 puestos, 150 en Winterthur) pasó por consulta con los representantes de los trabajadores [B3].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (no cita ratings); 2) web de inversores; 3) búsqueda de MSCI/Sustainalytics (de pago)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'TCAC histórico del mercado', tipo: 'Complemento', intentos: '1) CMD 2022 (solo previsión); 2) Mordor (solo 2025-2031); 3) otros informes de mercado con perímetros distintos', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: gobierno corporativo (consejo, accionistas significativos, límite de voto del 5 %) e informe de remuneraciones', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-report-2025-burckhardt-compression-260624-en.pdf' },
  { id: 2, titulo: 'Protokoll der Generalversammlung 2026 (votaciones del 3-jul-2026)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-07-03', url: 'https://www.burckhardtcompression.com/fileadmin/uploads/burckhardt/documents/agm/generalversammlung-2026-protokoll-geschaeftsjahr-2025-de.pdf' },
  { id: 3, titulo: 'Burckhardt Compression announces leadership transition in Systems Division (13-oct-2026)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.burckhardtcompression.com/about/news-stories-and-whitepapers/article/burckhardt-compression-announces-leadership-transition-in-systems-division/' },
  { id: 4, titulo: 'Annual General Meeting 2026 approves all proposals (comisiones del consejo)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-07-03', url: 'https://www.burckhardtcompression.com/about/news-stories-and-whitepapers/article/annual-general-meeting-2026-of-burckhardt-compression-holding-ag-approves-all-proposals-of-the-board-of-directors/' },
  { id: 5, titulo: 'Capital Markets Day 2022 (objetivos del plan a medio plazo)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2022-11-01', url: BC + 'capital-market-day-2022-presentation-burckhardt-compression-en.pdf' },
  { id: 6, titulo: 'Full-Year Results FY2025, presentación (guía FY2026 y aplazamiento del plan)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-results-2025-presentation-burckhardt-compression-en.pdf' },
  { id: 7, titulo: 'First-Half Results FY2025 (guía FY2025 confirmada: ~1.100 M y margen similar)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2025-11-04', url: BC + 'half-year-results-2025-burckhardt-compression-en.pdf' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Fabrice Billard', cargo: 'Consejero delegado (CEO)', desde: '2022', participacion_pct: null, trayectoria: 'Presidente de Systems en 2016-2022, antes en Sulzer (estrategia, Chemtech) y BCG. Como CEO llevó el margen EBIT del 11,4 % (FY2022) al 13,3 % (FY2025) y el RONOA del 25,7 % al 40,4 % [C1, C6].' },
      { nombre: 'Rolf Brändli', cargo: 'Director financiero (CFO)', desde: '2008', participacion_pct: null, trayectoria: 'CFO desde 2008; antes en Sulzer (Brasil, Asia). Dieciocho años en el cargo: continuidad en balance y dividendo [C1].' },
      { nombre: 'Dr. Jacques Sanche', cargo: 'Presidente del consejo (no ejecutivo)', desde: '2025', participacion_pct: null, trayectoria: 'Presidente desde el 15-dic-2025, en sustitución de Ton Büchner; independiente [C1].' },
      { nombre: 'Andreas Brautsch / Daniel Meier', cargo: 'Presidente de Systems', desde: '2022', participacion_pct: null, trayectoria: 'Brautsch (ex Hitachi Energy) deja la empresa el 1-nov-2026 por motivos personales; le sustituye Daniel Meier, 19 años en la casa y hoy vicepresidente de Systems para EMEA [C3].' },
      { nombre: 'Martin Zingg', cargo: 'Presidente de Services', desde: '2026', participacion_pct: null, trayectoria: 'Desde el 1-abr-2026; ex CEO del grupo Leister y responsable de servicio en Moventas, GE Power y Alstom [C1].' },
    ],
    historial_guidance: [
      { anio: 'FY2022', guia: 'Plan CMD 2022: 1.100 M de ventas y 12-15 % de margen EBIT en FY2027', real: 'Ventas de 1.095,6 M ya en FY2024; objetivo subido a 1.200 M', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Ventas ~1.100 M y margen EBIT similar o mejor', real: '1.095,6 M y 12,9 %', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ventas ~1.100 M, margen EBIT similar a FY2024 (confirmada en nov-2025)', real: '1.057,1 M (−3,9 % frente a la guía) y 13,3 %', cumplida: 'Parcial' },
      { anio: 'FY2027 (plan)', guia: '1.200 M de ventas y 12-15 % de margen EBIT', real: 'Aplazado sin fecha en jun-2026', cumplida: 'No' },
    ],
    comentario: 'Equipo con trayectoria: el CEO viene de dirigir Systems y el CFO lleva 18 años, y cumplieron el plan de 2022 dos años antes de tiempo [C1, C5]. Pero en 2025-2026 hay mucha rotación: cambio de presidente del consejo (dic-2025), de presidente de Services (abr-2026) y de presidente de Systems (nov-2026), justo cuando caen los pedidos [C1, C3]. La sucesión en Systems es interna (Meier), lo que da continuidad. La guía de FY2025 se quedó corta en ventas (−3,9 %) pero no en margen; el aplazamiento del plan 2027 resta credibilidad a los objetivos a medio plazo.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Dr. Jacques Sanche', cargo: 'Presidente', tipo: 'Independiente', desde: '2025', comisiones: 'Estrategia y sostenibilidad (presidente)' },
      { nombre: 'Kaspar W. Kelterborn', cargo: 'Vicepresidente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría; estrategia y sostenibilidad' },
      { nombre: 'Dr. Stephan Bross', cargo: 'Consejero', tipo: 'Independiente', desde: '2014', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'David Dean', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Tatiana Gillitzer', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Maria Teresa Vacalli', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y retribuciones (presidenta); auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false, accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 96.71, voto_remuneracion_contra_pct: 2.30, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 1.205, fijo: 0.597, variable_corto: 0.308, variable_largo: 0.300, ratio_salario_medio: 13 },
    remuneracion: 'El CEO cobró 1,21 M CHF en FY2025: 0,60 M fijos, 0,31 M de variable anual y 0,30 M en acciones a largo plazo (con cargas) [C1]. El variable anual es una fórmula sin discrecionalidad: un porcentaje del beneficio neto (0,28 % para el CEO) si el beneficio supera el 4 % de las ventas [C1]. El plan a largo plazo (PSU a tres años) mide el BPA acumulado (50 %), las ventas acumuladas (25 %) y la intensidad de CO2 (25 %): no hay métrica de ROIC, flujo de caja ni rentabilidad para el accionista [C1]. El ciclo FY2023-FY2025 consolidó al 117 % [C1]. Remuneración moderada (ratio de unas 13 veces el coste medio por empleado, estimación propia: 302,6 M de gastos de personal entre 3.305 empleados). El informe de remuneraciones se aprobó con el 96,71 % y la retribución variable con el 97,35 % [C2].',
    accionistas: [
      { nombre: 'UBS Fund Management (Switzerland)', pct: 9.58, tipo: 'Fondos (voto limitado al 5 %)', variacion: 'n.d.' },
      { nombre: 'Grupo de accionistas del MBO (Valentin Vogt y otros)', pct: 8.70, tipo: 'Fundadores del MBO de 2002', variacion: 'n.d.' },
      { nombre: 'Swisscanto Fondsleitung', pct: 4.99, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'The Goldman Sachs Group', pct: 4.92, tipo: 'Banco', variacion: 'n.d.' },
      { nombre: 'BlackRock', pct: 3.04, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 0.82, tipo: 'Autocartera', variacion: '27.939 acciones a mar-26' },
    ],
    insiders: [],
    control_y_defensas: 'No hay accionista de control: el mayor es UBS Fund Management (9,6 %) y el grupo del MBO de 2002 suma el 8,7 % [C1]. Los estatutos limitan el registro con voto al 5 % del capital por accionista (el consejo puede hacer excepciones): UBS vota solo con el 5 % [C1]. Una sola clase de acciones (3,4 M de 2,50 CHF). Mayoría de dos tercios para cambiar estatutos; obligación de OPA al 33⅓ % sin exclusión ni elevación [C1]. No hay operaciones vinculadas relevantes. La directora de recursos humanos (Vanessa Valentin) pertenece a la familia del grupo del MBO (dato del informe anual no comprobado más allá del apellido).',
    alertas: ['Límite estatutario de voto del 5 % por accionista (blindaje frente a una toma de control).', 'Rotación de la cúpula: presidente (dic-2025), presidente de Services (abr-2026) y presidente de Systems (nov-2026).', 'El 7,34 % votó en contra del informe de sostenibilidad en la junta de 2026 [C2].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de directivos de 12 meses', tipo: 'Complemento', intentos: '1) Registro de operaciones de directivos de la SIX (anónimo: solo cargo e importe); 2) informe anual (participaciones del consejo, sin fechas); 3) prensa suiza', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'participación en el capital del CEO y del CFO', tipo: 'Complemento', intentos: '1) Informe de remuneraciones FY2025 (tabla de acciones no leída con detalle); 2) informe de gobierno; 3) SIX', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance: históricos diarios de BCHN.SW, ^SSMI y CHSPI.SW hasta el 13-oct-2026 (rango, volumen, rentabilidades, beta, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/BCHN.SW/history/' },
  { id: 2, titulo: 'Burckhardt Compression Holding AG: estimaciones anuales FY2026-FY2028 (ejercicios a marzo de 2027-2029) y consenso de 7 analistas («Outperform», objetivo medio 604,33 CHF, mínimo 485, máximo 700; último cierre 486,00 CHF)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/BURCKHARDT-COMPRESSION-HO-183854/finances/' },
  { id: 3, titulo: 'Burckhardt Compression: consenso de analistas', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/BURCKHARDT-COMPRESSION-HO-183854/consensus/' },
  { id: 4, titulo: 'Yahoo Finance: cuentas y mercado de los comparables, pasados a CHF con el cambio del día (15-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 5, titulo: 'Chart Industries, Inc. to Acquire Howden (8-K, Ex. 99.1): 4.400 M USD, 12,9 veces el EBITDA ajustado de 12 meses a ago-2022', editor: 'Chart Industries (SEC)', tipo: 'Primaria', fecha: '2022-11-09', url: 'https://www.sec.gov/Archives/edgar/data/892553/000119312522280686/d411515dex991.htm' },
  { id: 6, titulo: 'Colfax to sell Air & Gas Handling (Howden) to KPS for 1.800 M USD; EBITDA ajustado de 12 meses ~200 M USD (8-K, Ex. 99.1)', editor: 'Colfax Corporation (SEC)', tipo: 'Primaria', fecha: '2019-05-16', url: 'https://www.sec.gov/Archives/edgar/data/1420800/000119312519150551/d746282dex991.htm' },
  { id: 7, titulo: 'Baker Hughes to Acquire Chart Industries: 210 USD por acción, valor empresa 13.600 M USD, ~9 veces el EBITDA 2025e con sinergias (8-K, Ex. 99.2)', editor: 'Baker Hughes (SEC)', tipo: 'Primaria', fecha: '2025-07-29', url: 'https://www.sec.gov/Archives/edgar/data/1701605/000119312525167118/d912206dex992.htm' },
  { id: 8, titulo: 'Enerflex Ltd. and Exterran Corporation to Combine: 735 M USD, 3,6 veces el EBITDA 2022e con sinergias', editor: 'Enerflex', tipo: 'Primaria', fecha: '2022-01-24', url: 'https://investors.enerflex.com/news-releases/news-release-details/enerflex-ltd-and-exterran-corporation-combine-creating-premier' },
  { id: 9, titulo: 'Swiss Bond Yield: bono de la Confederación a 10 años al 0,54 % (8-oct-2026)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://tradingeconomics.com/switzerland/government-bond-yield/news/590510' },
  { id: 10, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 11, titulo: 'Tipos de cambio de referencia del BCE, 14-oct-2026 (0,9330 CHF por EUR; 1,1195 USD por EUR)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 12, titulo: 'Annual Report 2025: acciones emitidas (3,4 M), autocartera (27.939) y capitalización a 31-mar-2026', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-report-2025-burckhardt-compression-260624-en.pdf' },
  { id: 14, titulo: 'Full-Year Results Fiscal Year 2025, presentación (guía FY2026, plan a medio plazo aplazado)', editor: 'Burckhardt Compression Holding AG', tipo: 'Primaria', fecha: '2026-06-04', url: BC + 'annual-results-2025-presentation-burckhardt-compression-en.pdf' },
  { id: 13, titulo: 'Yahoo Finance: cotizaciones de 30 minutos de BCHN.SW del 14 y 15-oct-2026 (último tramo del 14-oct a 487,5; 15-oct a 473-474,5 en la apertura)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://query1.finance.yahoo.com/v8/finance/chart/BCHN.SW?range=5d&interval=30m' },
];
// Comparables a 15-oct-2026, en millones de CHF (Yahoo Finance; USD por CHF 1,2045). EV/EBITDA NTM no disponible gratis.
const comps = [
  ['Atlas Copco', 'ATCO A', 'SE', 80357, 5.75, 21.7, 26.2, 9.1, 26.5, 19.9, 0.27, 2.6],
  ['Ingersoll Rand', 'IR', 'US', 25106, 4.25, 16.9, 19.9, 8.5, 25.2, 7.6, 1.77, 4.0],
  ['Dover', 'DOV', 'US', 21617, 3.29, 14.4, 16.6, 6.9, 22.8, 11.4, 0.86, 4.5],
  ['Sulzer', 'SUN', 'CH', 5681, 1.68, 10.6, 15.6, -4.1, 15.8, 13.7, 0.28, 3.2],
  ['Wärtsilä', 'WRT1V', 'FI', 15501, 2.12, 13.5, 21.7, -2.2, 15.7, 22.1, -1.86, 8.0],
  ['Alfa Laval', 'ALFA', 'SE', 19574, 3.48, 16.8, 22.5, 7.7, 20.7, 14.4, 0.69, 2.7],
  ['Baker Hughes', 'BKR', 'US', 45632, 2.07, 11.3, 18.7, -2.4, 18.3, 13.8, 0.47, 5.7],
  ['Siemens Energy', 'ENR', 'DE', 99529, 2.43, 17.9, 20.1, 17.5, 13.6, 26.1, -0.91, 7.3],
  ['Kirloskar Pneumatic', 'KIRLPNU', 'IN', 723, 4.54, 21.3, 24.9, 7.6, 21.3, 21.0, -0.29, 0.3],
  ['Enerflex', 'EFX', 'CA', 2615, 1.42, 9.8, 12.5, -5.4, 14.4, 11.0, 1.35, 7.6],
].map(([nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct]) => ({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct }));
const USDCHF = 1 / 1.2045; // CHF por USD
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Burckhardt Compression Holding AG', nombre_corto: 'Burckhardt', ticker: 'BCHN', isin: 'CH0025536027', mercado: 'SIX Swiss Exchange', indice_referencia: 'SMI / SPI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Industria', industria: 'Maquinaria', sede: 'Winterthur (Suiza)', fundacion: '1844', empleados: 3305, web: 'https://www.burckhardtcompression.com',
    precio: 486.0, fecha_precio: '2026-10-14', acciones: 3.372, capitalizacion_publicada: 1639, free_float_pct: 91.3,
    max_52s: 595.0, min_52s: 434.5, volumen_medio_diario: '≈ 3,5 M CHF/día (3 meses; 7.165 acciones)', proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'Guía FY2026 (abr-26 a mar-27), dada el 4-jun-2026 y confirmada el 19-ago-2026: ventas de 900-1.000 M CHF y margen EBIT de ~12 %, con un segundo semestre más fuerte; supone que Oriente Medio se normaliza en la segunda mitad, el franco estable y la aportación de Fornovo Gas y ACT [D14]. El plan a medio plazo (1.200 M de ventas y margen EBIT del 12-15 %, antes para FY2027) queda aplazado: la nueva fecha se dará «cuando mejore la visibilidad» [D14].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 966.1, ebitda: 139.2, ebit: 117.4, bpa: 26.66, dpa: 17.0, fuente: 'MarketScreener, 7 analistas (ejercicio a mar-27) [D2]' },
      { periodo: 'FY2027e', ingresos: 970.5, ebitda: 151.3, ebit: 128.4, bpa: 28.80, dpa: 18.0, fuente: 'MarketScreener [D2]' },
      { periodo: 'FY2028e', ingresos: 1004.0, ebitda: 157.9, ebit: 135.3, bpa: 30.87, dpa: 18.8, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 7, comprar: null, mantener: null, vender: null, po_medio: 604.33, po_min: 485.0, po_max: 700.0 },
    revisiones: 'Solo hay un proveedor gratuito con estimaciones completas (MarketScreener) [D2]. Tras los resultados de junio los analistas bajaron previsiones: el consenso de FY2026 pasó a 26,66 CHF de BPA (−18 % frente al 32,60 de FY2025), en línea con la guía; Berenberg recortó objetivo manteniendo Comprar en septiembre [D3]. El consenso no espera volver al BPA de FY2025 hasta FY2029 (30,87 en FY2028). El objetivo medio (604 CHF) está un 24 % por encima del precio; el mínimo (485) coincide con él [D3].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2020', precio_cierre: 315.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2021', precio_cierre: 489.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2022', precio_cierre: 568.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: 565.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: 593.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 472.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Diez fabricantes cotizados de compresores y equipos de proceso para energía y gas: los grandes de compresores (Atlas Copco, Ingersoll Rand, Baker Hughes, Siemens Energy con Dresser-Rand), los de bombas y equipos de proceso con negocio marino (Sulzer, Wärtsilä, Alfa Laval), Dover (Cook Compression, recambios de pistón) y dos de compresión de gas más pequeños (Kirloskar Pneumatic, Enerflex). No hay un comparable puro que cotice: Ariel y Hanwha Power Systems no cotizan aparte. Cifras de Yahoo Finance del 15-oct-2026 en CHF [D4]; ingresos de los competidores de la sección 4 pasados con el BCE del 14-oct [D11]; los estadounidenses publican BPA ajustado (su PER está 1-3 puntos por debajo en base contable).',
    empresas: comps,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-11', objetivo: 'Howden (compresores y ventiladores de proceso)', comprador: 'Chart Industries', ev: Math.round(4400 * USDCHF), ev_ventas: null, ev_ebitda: 12.9, prima_pct: null, excluir: false, comentario: 'EBITDA ajustado de 12 meses a ago-2022; 8,5 veces con 175 M USD de sinergias [D5].' },
      { fecha: '2019-05', objetivo: 'Howden (Air & Gas Handling de Colfax)', comprador: 'KPS Capital Partners', ev: Math.round(1800 * USDCHF), ev_ventas: null, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: 'Estimación propia: 1.800 M USD entre ~200 M de EBITDA ajustado de 12 meses publicado por Colfax [D6].' },
      { fecha: '2025-07', objetivo: 'Chart Industries (equipos criogénicos, compresores Howden)', comprador: 'Baker Hughes', ev: Math.round(13600 * USDCHF), ev_ventas: null, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: '~9 veces el EBITDA 2025e de consenso con 325 M USD de sinergias de costes; sin sinergias sería más alto (no publicado) [D7].' },
      { fecha: '2022-01', objetivo: 'Exterran (compresión de gas en alquiler y equipos)', comprador: 'Enerflex', ev: Math.round(735 * USDCHF), ev_ventas: null, ev_ebitda: 3.6, prima_pct: 18, excluir: true, comentario: 'Excluida: empresa en dificultades, modelo de alquiler y múltiplo con sinergias [D8].' },
    ],
    confianza: 'Media',
  },
  bolsa: null, // se toma de notas/bolsa.json en propio
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'reparto de recomendaciones (comprar/mantener/vender)', tipo: 'Complemento', intentos: '1) MarketScreener (solo indicador gráfico); 2) Yahoo Finance; 3) agregadores alemanes (cifras de otra fecha)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses', tipo: 'Complemento', intentos: '1) Yahoo (no da EBITDA estimado); 2) MarketScreener (de pago por comparable); 3) informes de la ficha sectorial (sin dato)', decision: 'Omitido' },
  ],
};
delete D.bolsa;
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Auftragseinbruch und Mittelfristziele: Geopolitik belastet Burckhardt-Aktie stark (artículo y comentarios de lectores)', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-06-04', url: 'https://www.cash.ch/news/top-news/burckhardt-compression-enttauscht-mit-auftragsflaute-borse-reagiert-mit-kurssturz-942669' },
  { id: 2, titulo: 'Geopolitik zwingt Burckhardt Compression in ein Übergangsjahr', editor: 'The Market (NZZ)', tipo: 'Foros y redes', fecha: '2026-06-04', url: 'https://themarket.ch/unternehmen/zoelle-und-irankrieg-setzen-burckhardt-compression-zu-ld.16932' },
  { id: 3, titulo: 'Burckhardt Compression Aktie: Konsultation endet', editor: 'Börse Global', tipo: 'Foros y redes', fecha: '2026-09-09', url: 'https://www.boerse-global.de/burckhardt-compression-aktie-konsultation-endet/826047' },
  { id: 4, titulo: 'Foro de la acción Burckhardt Compression (CH0025536027)', editor: 'onvista', tipo: 'Foros y redes', fecha: '2026-04', url: 'https://www.onvista.de/aktien/BURCKHARDT-COMPRESSION-HOLDING-AG-Aktie-CH0025536027' },
  { id: 5, titulo: 'Burckhardt Compression shares fall 10% on delayed targets', editor: 'Investing.com', tipo: 'Foros y redes', fecha: '2026-06-04', url: 'https://uk.investing.com/news/stock-market-news/burckhardt-compression-shares-fall-10-on-delayed-targets-93CH-4713357' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'cash.ch (artículo y comentarios)', fecha: '2026-06', n_comentarios: 0, tono: 'Negativo', resumen: 'Reacción a la caída del 10-12 % por los pedidos y el aplazamiento del plan; la ZKB espera un ejercicio «más contenido» y Vontobel ve apoyo a medio plazo por la seguridad energética [E1].' },
      { plataforma: 'The Market (NZZ)', fecha: '2026-06', n_comentarios: 0, tono: 'Dividido', resumen: 'Presenta FY2026 como «año de transición» en pedidos; Reichmuth ve la caída como del mercado y no estructural; el medio ve la bajada como oportunidad a largo plazo [E2].' },
      { plataforma: 'Börse Global', fecha: '2026-09', n_comentarios: 0, tono: 'Neutro', resumen: 'Fin de la consulta de los 220 despidos; acción a 511 CHF el 8-sep, por encima de su media de 50 días [E3].' },
      { plataforma: 'Investing.com', fecha: '2026-06', n_comentarios: 0, tono: 'Negativo', resumen: 'La caída se atribuye a pedidos −32 % y objetivos aplazados [E5].' },
    ],
    temas: [
      { tema: 'Caída de pedidos y objetivos 2027 aplazados', postura: 'Bajista', peso: 'Alto', contraste: 'Correcto: pedidos de Systems −42 %, pedidos/ventas de 0,74 y guía FY2026 de 900-1.000 M [E1, E5].' },
      { tema: 'Seguridad energética y GNL sostendrán la demanda a medio plazo', postura: 'Alcista', peso: 'Medio', contraste: 'Plausible: mayor pedido marino de su historia y terminales de GNL activos; pero el ritmo depende de Oriente Medio y de China [E2].' },
      { tema: 'Reestructuración y despidos en Winterthur', postura: 'Dividida', peso: 'Medio', contraste: 'Ahorro de ~20 M al año (≈2 puntos de margen) desde FY2027 [E3].' },
    ],
    lectura: 'Hay poco debate de particulares: el foro de onvista no tiene mensajes recientes y cash.ch no muestra comentarios; lo que hay son artículos de prensa suiza con citas de analistas [E1, E2, E4]. El tono es de decepción por los pedidos pero sin capitulación: la prensa y los analistas describen FY2026 como un año de transición y la acción se recuperó de 445 a 511 CHF en verano antes de volver a 486 [E2, E3]. No aporta un riesgo que el informe no recoja; confirma que la tesis depende de que los pedidos toquen fondo en el 1S FY2026 (3-nov-2026).',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
