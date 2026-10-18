// Notas A-D de Grupo Aeroméxico (AERO), corte 2026-10-18. USD (moneda funcional y de presentación), ejercicio natural, NIIF (IASB).
// Hechas por el analista sin subagentes. Cada nota cita con [n] de su propia lista de fuentes.
// Unidad por acción: el ADS de la NYSE (1 ADS = 10 acciones comunes). Acciones = 145,9 M de ADS equivalentes (1.459,0 M de acciones).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const SEC = 'https://www.sec.gov/Archives/edgar/data/1561861/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 20-F 2025 (cuentas consolidadas 2023-2025 auditadas por KPMG, notas de deuda, arrendamientos, flota, plantilla y contratos colectivos)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: SEC + '000119312526197494/d101275d20f.htm' },
  { id: 2, titulo: 'Folleto definitivo de la salida a bolsa (424B1): cuentas 2022-2024 y 1S25, datos operativos', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2025-11-07', url: SEC + '000119312525270444/d11281d424b1.htm' },
  { id: 3, titulo: 'Form F-1 (mayo de 2024): cuentas 2019-2023, flujos 2021-2023 y desglose de la deuda y arrendamientos de 2021-2022', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2024-05-13', url: SEC + '000119312524137345/d493840df1.htm' },
  { id: 4, titulo: 'Aeroméxico Reports Unaudited Second Quarter 2026 Results (6-K, anexo 99.1) y tráfico de abril-junio (99.2-99.4)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-07-13', url: SEC + '000119312526302103/d112634dex991.htm' },
  { id: 5, titulo: 'Aeroméxico Reports First Quarter 2026 Results (6-K, anexo 99.1)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-04-21', url: SEC + '000119312526171463/d332308dex991.htm' },
  { id: 6, titulo: 'Aeroméxico Reports Fourth Quarter and Full Year 2025 Results (6-K, anexo 99.1)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-02-17', url: SEC + '000119312526052732/d89476dex991.htm' },
  { id: 7, titulo: 'Aeroméxico Reports Third Quarter 2025 Results (6-K, anexo 99.2)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2025-11-12', url: SEC + '000119312525276200/d39921dex992.htm' },
  { id: 8, titulo: 'Grupo Aeroméxico (AERO) Q2 2026 earnings summary', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://quartr.com/events/grupo-aeromexico-s-a-b-de-c-v-aero-q2-2026_F4fq2lnF' },
  { id: 9, titulo: 'Grupo Aeroméxico Non-GAAP EPS of -$0.40 misses by $0.19 (titular del 2T26 en el canal RSS)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://seekingalpha.com/api/sa/combined/AERO.xml' },
  { id: 10, titulo: 'Aeroméxico carries 1.85 million passengers in September as demand outpaces capacity', editor: 'Aviation24.be', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.aviation24.be/airlines/aeromexico/aeromexico-carries-1-85-million-passengers-in-september-as-demand-outpaces-capacity/amp/' },
];

// Cuenta por naturaleza (combustible como aprovisionamiento). EBITDA = EBIT + amortización (incluida la de derechos de uso).
const cuenta = [
  { periodo: '2021', ingresos: 2237.7, coste_ventas: 634.5, gastos_generales: null, ebitda: -165.1, amortizaciones: 469.9, ebit: -635.0, resultado_financiero: -497.8, bai: -1132.8, impuestos: -113.3, minoritarios: 0, beneficio_neto: -1019.4, gastos_financieros: 519.2, participadas_en_ebitda: 17.9, no_recurrentes_en_ebitda: 368.5, bpa: null, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2022', ingresos: 3812.0, coste_ventas: 1414.8, gastos_generales: null, ebitda: 964.3, amortizaciones: 453.5, ebit: 510.8, resultado_financiero: -450.6, bai: 60.3, impuestos: 124.5, minoritarios: 0, beneficio_neto: -64.2, gastos_financieros: 465.9, participadas_en_ebitda: 329.6, no_recurrentes_en_ebitda: -115.3, bpa: -0.47, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 136.4 },
  { periodo: '2023', ingresos: 4916.1, coste_ventas: 1310.2, gastos_generales: null, ebitda: 1295.6, amortizaciones: 579.8, ebit: 715.8, resultado_financiero: -428.1, bai: 287.7, impuestos: 14.3, minoritarios: 0.1, beneficio_neto: 273.3, gastos_financieros: 499.0, participadas_en_ebitda: -3.1, no_recurrentes_en_ebitda: 3.4, bpa: 2.0, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 136.4 },
  { periodo: '2024', ingresos: 5619.9, coste_ventas: 1236.6, gastos_generales: null, ebitda: 1721.8, amortizaciones: 655.1, ebit: 1066.7, resultado_financiero: -369.5, bai: 697.2, impuestos: 79.7, minoritarios: 0.1, beneficio_neto: 617.4, gastos_financieros: 447.4, participadas_en_ebitda: 5.9, no_recurrentes_en_ebitda: -160.3, bpa: 4.53, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 136.4 },
  { periodo: '2025', ingresos: 5360.6, coste_ventas: 1137.6, gastos_generales: null, ebitda: 1658.4, amortizaciones: 730.3, ebit: 928.1, resultado_financiero: -514.1, bai: 414.0, impuestos: 62.1, minoritarios: 0, beneficio_neto: 351.9, gastos_financieros: 545.7, participadas_en_ebitda: 77.2, no_recurrentes_en_ebitda: 0.6, bpa: 2.41, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 145.9 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5683.9, ebitda: 1525.4, ebit: 765.8, beneficio_neto: 214.9, bpa: 1.47, dpa: 0, dpa_extraordinario: 0, fcf: 140, participadas_en_ebitda: 74.4, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Toma de control de PLM (Aeroméxico Rewards, antes Club Premier) en julio de 2022: entra en consolidación con 1.000 M USD de intangibles y fondo de comercio y una plusvalía de 307,7 M por revaluar el 51,14 % previo.' },
      { periodo: '2025', descripcion: 'Venta del 50 % de TechOps MX (mantenimiento, conjunta con Delta) en noviembre de 2025: plusvalía de 71,1 M en el resultado de participadas.' },
    ],
    comentario: 'Los ingresos pasaron de 2.237,7 M USD en 2021 (pandemia y Chapter 11) a 5.619,9 M en 2024 y bajaron a 5.360,6 M en 2025 (−4,6 %), con la capacidad plana y la tarifa a la baja por la competencia doméstica y la depreciación del peso de 2024 [1]. Sin compras relevantes salvo la consolidación de PLM en 2022 [2]. El margen EBIT normalizado (sin participadas ni partidas no recurrentes) fue del 14,7 % en 2023, 15,9 % en 2024 y 15,9 % en 2025; el combustible bajó del 26,7 % de los ingresos en 2023 al 21,2 % en 2025 [1]. En 2026 el conflicto de Oriente Medio subió el queroseno a 4,20 USD por galón en el 2T26 (+79,6 %): el margen operativo del 1S26 cayó al 7,4 % desde el 14,9 % y el 2T26 dio una pérdida neta de 57,7 M [4]. La empresa no cubre el combustible desde 2020 [1]. No comparables: 2021 (Chapter 11: 419 M de gastos de reestructuración), 2022 (plusvalía de PLM de 307,7 M e ingresos de reestructuración de 114,1 M) [3, 2].',
    ajustes: 'Cifras reportadas NIIF. En el EBITDA se separan: participadas (2022: 329,6 M, de ellos 307,7 M de revaluación de PLM; 2025: 77,2 M, de ellos 71,1 M de la venta de TechOps MX) y no recurrentes (2021: reestructuración 419,2 M menos reversión de deterioros 50,7 M; 2022: ingresos de reestructuración 114,1 M y reversión 1,2 M; 2024: 160,3 M favorables por la compensación de Boeing por el 737 MAX y caducidad de billetes; 2025: 4,3 M de costes de la salida a bolsa y 3,7 M de reversión) [1, 2, 3, 6]. El EBITDAR ajustado de la empresa suma el alquiler de corto plazo de aviones (17,7 M en 2025) y no es el EBITDA del informe. El BPA es por ADS (10 acciones); 2021 sin BPA comparable (las acciones antiguas se anularon en el Chapter 11) y 2022 calculado con las acciones de después del desdoblamiento de 2025 (estimación).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1490, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 497, margen_ebitda_pct: 33.4, bpa: 1.55, vs_consenso: null },
      { periodo: '4T24', ingresos: 1435, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 441, margen_ebitda_pct: 30.7, bpa: 0.55, vs_consenso: null },
      { periodo: '1T25', ingresos: 1184, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 315, margen_ebitda_pct: 26.6, bpa: 0.16, vs_consenso: null },
      { periodo: '2T25', ingresos: 1314, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 407, margen_ebitda_pct: 31.0, bpa: 0.50, vs_consenso: null },
      { periodo: '3T25', ingresos: 1425, crecimiento_pct: -4.4, crecimiento_organico_pct: null, ebitda: 437, margen_ebitda_pct: 30.7, bpa: 0.71, vs_consenso: null },
      { periodo: '4T25', ingresos: 1438, crecimiento_pct: 0.2, crecimiento_organico_pct: null, ebitda: 497, margen_ebitda_pct: 34.6, bpa: 1.15, vs_consenso: null },
      { periodo: '1T26', ingresos: 1341, crecimiento_pct: 13.3, crecimiento_organico_pct: null, ebitda: 332, margen_ebitda_pct: 24.8, bpa: 0.08, vs_consenso: null },
      { periodo: '2T26', ingresos: 1479, crecimiento_pct: 12.6, crecimiento_organico_pct: null, ebitda: 260, margen_ebitda_pct: 17.6, bpa: -0.40, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En la conferencia del 4T25 (17-feb-2026) la dirección guio 2026 con ingresos de 5.770-5.880 M USD, margen EBITDAR del 28,5-30,5 % y margen operativo del 15-17 % [6]. La guerra de Oriente Medio cambió el discurso: en el 1T26 el margen operativo (10,6 %) quedó en el extremo bajo de la guía y en el 2T26 el combustible costó unos 30 M más de lo previsto, con un margen EBITDAR del 17,9 % y operativo del 4,6 % [5, 4]. La guía de julio sube los ingresos a 6.050-6.120 M (+13-14 %) por la tarifa y el peso fuerte, pero baja el margen EBITDAR al 24-26 % y el operativo al 11-13 %, con un queroseno supuesto de 3,2 USD por galón en el 3T y 3,0 en el 4T y un tipo de 17,5-17,6 pesos por dólar [4]. La dirección insiste en que recuperó un 75 % del combustible extra con precio, en el récord de ingresos premium (43 % de los de pasaje) y en que no ha pedido deuda nueva [4, 8]. El BPA del 2T26 (−0,40 USD por ADS) quedó 0,19 por debajo del consenso [9]. Lo que no se cuantificó: el coste de la revisión del contrato de pilotos (vencido el 30-sep-2026), el efecto de los motores LEAP en tierra en 2026 y cuánto del segundo semestre depende de que el queroseno baje [1, 4].',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 4264.2, activo_corriente: 1288.7, pasivo_corriente: 4862.7, pasivo_total: 6909.5, fondo_comercio: null, intangibles: 69.5, inmovilizado_material: 2426.6, existencias: 77.6, clientes: 196.2, proveedores: 822.4, activos_contrato: null, pasivos_contrato: null, caja: 979.1, deuda_financiera: 1688.7, arrendamientos: 2023.7, patrimonio_neto: -2647.3, minoritarios: 2.0, reservas: -3147.6 },
      { periodo: '2022', activo_total: 5546.2, activo_corriente: 1377.4, pasivo_corriente: 2603.0, pasivo_total: 6277.0, fondo_comercio: null, intangibles: 1063.8, inmovilizado_material: 2643.4, existencias: 97.0, clientes: 391.3, proveedores: 1032.2, activos_contrato: null, pasivos_contrato: null, caja: 842.2, deuda_financiera: 1130.6, arrendamientos: 2320.4, patrimonio_neto: -732.8, minoritarios: 2.0, reservas: -3212.2 },
      { periodo: '2023', activo_total: 6091.8, activo_corriente: 1714.6, pasivo_corriente: 3269.4, pasivo_total: 6824.7, fondo_comercio: null, intangibles: 1071.8, inmovilizado_material: 2787.6, existencias: 108.5, clientes: 618.2, proveedores: 1533.5, activos_contrato: null, pasivos_contrato: null, caja: 937.7, deuda_financiera: 866.7, arrendamientos: 2367.6, patrimonio_neto: -734.9, minoritarios: 2.0, reservas: -2939.9 },
      { periodo: '2024', activo_total: 6383.6, activo_corriente: 1646.6, pasivo_corriente: 3193.2, pasivo_total: 7283.5, fondo_comercio: null, intangibles: 1080.4, inmovilizado_material: 3206.6, existencias: 139.7, clientes: 591.5, proveedores: 1652.2, activos_contrato: null, pasivos_contrato: null, caja: 842.0, deuda_financiera: 1149.0, arrendamientos: 2551.9, patrimonio_neto: -902.0, minoritarios: 2.1, reservas: -2310.1 },
      { periodo: '2025', activo_total: 7193.1, activo_corriente: 1979.6, pasivo_corriente: 3095.9, pasivo_total: 7785.3, fondo_comercio: null, intangibles: 1098.2, inmovilizado_material: 3674.0, existencias: 174.4, clientes: 699.9, proveedores: 1710.9, activos_contrato: null, pasivos_contrato: null, caja: 1024.2, deuda_financiera: 1098.9, arrendamientos: 2956.1, patrimonio_neto: -594.3, minoritarios: 2.1, reservas: -1968.6 },
    ],
    vencimientos: [
      { anio: '2026', importe: null },
    ],
    liquidez: 'Caja 1.037 M USD a 30-jun-2026 más una línea de crédito revolvente de 200 M sin disponer: liquidez de 1.237 M, el 21,8 % de los ingresos de 12 meses [4].',
    rating: 'Los bonos garantizados de 2029 y 2031 tienen rating; la nota y la perspectiva no se han comprobado en fuente primaria (n.d.).',
    coste_deuda_pct: 8.4,
    vida_media_anios: null,
    otros_pasivos: 'Pasivo por billetes vendidos y no volados 505,9 M y programa de fidelización 632,8 M (288,7 corriente y 344,1 no corriente) a dic-2025: son cobros anticipados que financian el circulante, no deuda [1]. Provisiones no corrientes 331,6 M (sobre todo condiciones de devolución de aviones arrendados: se tratan como deuda en el puente) y beneficios a empleados 274,1 M [1]. Bonos garantizados: 500 M al 8,25 % con vencimiento en 2029 y 610 M al 8,625 % en 2031, con prenda sobre casi todos los activos y covenants de incurrencia (deuda, ventas de activos, dividendos y pagos restringidos); amortizables desde nov-2026 al 104,125 % y nov-2027 al 104,313 % [1]. Pasivos por arrendamiento NIIF 16 de 2.879,1 M más 77,0 M de arrendamientos financieros con garantía del EXIM [1]. La empresa dice cumplir todos los covenants [1].',
    comentario: 'La deuda financiera bruta (bonos y préstamos) bajó de 1.688,7 M USD en 2021 a 1.098,9 M en 2025, pero los arrendamientos subieron de 2.023,7 M a 2.956,1 M por la llegada de 737 MAX y 787 (flota de 144 a 165 aviones) [3, 1]. La deuda ajustada de la empresa (préstamos y arrendamientos menos caja) fue de 3.032 M a 30-jun-2026, menos de 2 veces el EBITDAR [4]. El circulante comercial es negativo (−836,6 M en 2025) porque los proveedores y los billetes cobrados por adelantado superan a los clientes: crecer libera caja [1]. El patrimonio neto atribuido es negativo (−594,3 M en 2025; −2.647,3 M en 2021) por las pérdidas acumuladas de la pandemia y del Chapter 11 y por 1.299 M devueltos a los accionistas en reducciones de capital en 2023-2025 [1, 3]: es contable, no falta de solvencia corriente, pero deja sin sentido el ROE y cualquier ROIC que use el patrimonio.',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 47.1, capex: 198.1, pagos_arrendamientos: 37.8, adquisiciones: 0, desinversiones: 52.4, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: -230.3, capex: 264.3, pagos_arrendamientos: 112.7, adquisiciones: 262.9, desinversiones: 3.1, dividendos: 0, recompras: 42.4, emision_acciones: 720.0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 1345.1, capex: 420.3, pagos_arrendamientos: 302.9, adquisiciones: 0, desinversiones: 0.2, dividendos: 0, recompras: 275.2, emision_acciones: 4.1, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 1367.5, capex: 493.8, pagos_arrendamientos: 346.5, adquisiciones: 0, desinversiones: 2.8, dividendos: 0, recompras: 818.5, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 913.1, capex: 386.1, pagos_arrendamientos: 365.6, adquisiciones: 0, desinversiones: 115.7, dividendos: 0, recompras: 204.6, emision_acciones: 165.6, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo ya va después de intereses (328,1 M pagados en 2025) e impuestos [1]. El capex incluye inmovilizado y mantenimiento mayor, intangibles y depósitos para mantenimiento y compra de equipo; los pagos de principal de arrendamientos se restan aparte. 2021-2022 son anómalos: en 2022 se pagaron 464 M de créditos ordinarios del Chapter 11 y se compró el control de PLM por 262,9 M [3]. En 2023-2024 el FCF después de arrendamientos fue de 622 y 527 M; en 2025 bajó a 161 M por el menor beneficio y la salida de 111 M de billetes cobrados por adelantado [1]. Lo que se ha llevado la caja: 1.298,3 M a los accionistas en reducciones de capital en 2023-2025, antes de la salida a bolsa [1]. No hay cifra de la empresa para el capex de mantenimiento; estimación propia: el de mantenimiento ronda la amortización (13-14 % de los ingresos sumando el principal de los arrendamientos), y las altas de derechos de uso de 2025 (854,4 M) son sobre todo crecimiento de flota [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG Cárdenas Dosal, S.C.', anios_auditor: 19, opinion: 'Favorable (sin salvedades); asunto clave: los tipos incrementales de los arrendamientos de flota',
    comentario: 'KPMG audita desde 2007 y su opinión de 2025 es favorable; el asunto clave de auditoría son los tipos de interés incrementales con los que se miden 854,4 M de derechos de uso y 806,3 M de pasivos por arrendamiento añadidos en 2025, un juicio que mueve el pasivo y la amortización [1]. Las cuentas mezclan muchos no recurrentes: compensación de Boeing y caducidad de billetes (165,8 M en 2024), plusvalías por PLM (307,7 M en 2022) y TechOps (71,1 M en 2025), reestructuración (419 M en 2021) [1, 2, 3]. El tipo efectivo es irregular (15 % en 2025, 11 % en 2024, 206 % en 2022) por las pérdidas fiscales y los activos diferidos (280 M en 2025) [1]. La remuneración en acciones es pequeña (0,7 M en 2025; 17,7 M en 2024) [1]. Lectura de los indicadores: el Altman Z sale muy bajo por el patrimonio negativo y las reservas negativas, que no miden la solvencia actual (liquidez de 1.237 M); el Piotroski y el Beneish se leen con los años 2021-2022 fuera de muestra por el Chapter 11.',
    senales: [
      { senal: 'Patrimonio neto negativo y reservas negativas', nivel: 'Media', comentario: 'Herencia de la pandemia y del Chapter 11 y de 1.298 M de reducciones de capital en 2023-2025 [1]. Distorsiona ROE, ROIC por pasivo y Altman Z.' },
      { senal: 'Beneficio con partidas no recurrentes repetidas', nivel: 'Media', comentario: '165,8 M en 2024 y 77,2 M de participadas en 2025 (TechOps) [1]. Se separan en el EBITDA.' },
      { senal: 'Tipos incrementales de los arrendamientos (asunto clave de auditoría)', nivel: 'Baja', comentario: 'Juicio sobre 806 M de pasivos nuevos en 2025 [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Sin dividendos desde la salida del Chapter 11; los bonos limitan los pagos restringidos [1]. El programa de recompra estaba suspendido en abril de 2026 [P1-A]. El 24-ago-2026 la empresa anunció que llevará a la junta un programa de recompra de hasta 100 M USD al año, con la junta convocada el 26-oct-2026 [P2-A]. Prioridades declaradas: flota (737 MAX y 787), producto premium y desapalancamiento; en el 2T26 amortizó 17,1 M de deuda y no pidió deuda nueva [4].',
    adquisiciones: [
      { anio: '2022', objetivo: 'Control de PLM (Aeroméxico Rewards, antes Club Premier), compra de la participación de Aimia', importe: 262.9, ev_ebitda: null, financiacion: 'Caja de la financiación de salida del Chapter 11', resultado: 'Plusvalía de 307,7 M por revaluar el 51,14 % previo; el programa pasó a acumular por gasto y apoya el 43 % de ingresos premium [2, 1].' },
      { anio: '2025', objetivo: 'Venta del 50 % de TechOps MX (mantenimiento) a Delta', importe: 59.0, ev_ebitda: null, financiacion: 'Cobro en caja', resultado: 'Plusvalía de 71,1 M; el mantenimiento sigue en Querétaro con contratos a terceros [1].' },
    ],
    comentario: 'La asignación de capital desde 2023 se ha hecho para los dueños del Chapter 11: 1.298,3 M devueltos en reducciones de capital (275,2 M en 2023, 818,5 M en 2024 y 204,6 M en 2025), financiados en parte con los bonos de 2024, mientras la flota se renovaba con arrendamientos [1]. La salida a bolsa de nov-2025 levantó solo 165,6 M netos para la empresa: la mayoría de las acciones las vendieron accionistas [1, 2]. La dilución ha sido moderada (de 136,4 a 145,9 M de ADS equivalentes, +7 %) [1]. La propuesta de recompra de 100 M al año (4,3 % de la capitalización) es la primera vía de retorno para los nuevos accionistas [P2-A].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Pasaje', descripcion: 'Billetes y servicios complementarios de Aeroméxico y Aeroméxico Connect', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 1960.6, resultado: null }, { periodo: '2022', ingresos: 3402.4, resultado: null }, { periodo: '2023', ingresos: 4504.2, resultado: null }, { periodo: '2024', ingresos: 5150.9, resultado: null }, { periodo: '2025', ingresos: 4860.5, resultado: null }] },
      { nombre: 'Carga', descripcion: 'Aeroméxico Cargo (bodega de los aviones de pasaje)', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 242.9, resultado: null }, { periodo: '2022', ingresos: 291.3, resultado: null }, { periodo: '2023', ingresos: 269.9, resultado: null }, { periodo: '2024', ingresos: 296.1, resultado: null }, { periodo: '2025', ingresos: 312.4, resultado: null }] },
      { nombre: 'Otros', descripcion: 'Fidelización (venta de puntos a bancos y socios), formación y otros servicios', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 34.2, resultado: null }, { periodo: '2022', ingresos: 118.3, resultado: null }, { periodo: '2023', ingresos: 142.0, resultado: null }, { periodo: '2024', ingresos: 172.9, resultado: null }, { periodo: '2025', ingresos: 187.7, resultado: null }] },
    ],
    geografias: [ { nombre: 'Internacional (pasaje)', peso_pct: 63.3 }, { nombre: 'Doméstico México (pasaje)', peso_pct: 36.7 } ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Pasajeros (miles)', valor_anterior: '25.337 (2024)', valor_actual: '≈ 24.400 (2025, estimación: 17.966 en ene-sep-26, −2,5 %)', variacion: 'n.d.', comentario: 'Menos domésticos; más internacionales [2, 10].' },
      { kpi: 'Cuota doméstica (pasajeros, AFAC)', valor_anterior: '28 % (2024)', valor_actual: '25 % (2025)', variacion: '−3 pp', comentario: 'Retirada de capacidad doméstica hacia rutas internacionales [1].' },
      { kpi: 'Cuota internacional desde y hacia México (AFAC)', valor_anterior: '14 % (2024)', valor_actual: '14 % (2025)', variacion: '0 pp', comentario: '21 % con Delta [1].' },
      { kpi: 'Ingresos premium sobre los de pasaje', valor_anterior: '42 % (2T25)', valor_actual: '43 % (2T26)', variacion: '+1 pp', comentario: 'Récord [4].' },
      { kpi: 'CASM sin combustible (centavos de USD)', valor_anterior: '8,9 (2T25)', valor_actual: '10,0 (2T26)', variacion: '+12,3 %', comentario: 'Peso fuerte (+11,3 %), salarios y flota [4].' },
      { kpi: 'Flota operativa (aviones)', valor_anterior: '158 (2T25)', valor_actual: '169 (2T26)', variacion: '+11', comentario: 'Edad media 8,9 años [4].' },
      { kpi: 'Puntualidad a 15 minutos', valor_anterior: '92,0 % (2025)', valor_actual: '89,8 % (2T26)', variacion: '−2,4 pp vs 2T25', comentario: 'La más puntual del mundo entre las globales en 2024 y 2025 según Diio [1, 4].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota 21 del 20-F 2025 (tabla de vencimientos contractuales no extraída del HTML); 2) 6-K del 2T26 (sin calendario); 3) folleto 424B1 (calendario a 2024, desfasado)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) 20-F 2025 (no da la nota); 2) folleto de la salida a bolsa; 3) sin búsqueda web por presupuesto', decision: 'Omitido' },
  ],
};
// Fuentes propias de A sobre capital (6-K de la junta de abril y de la recompra)
fA.push(
  { id: 11, titulo: 'Grupo Aeroméxico Reports Resolutions Approved at the Annual Ordinary Shareholders\' Meeting Held on April 30, 2026 (6-K)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: SEC + '000119312526201483/d132443dex991.htm' },
  { id: 12, titulo: 'Aeroméxico Announces Intention to Submit Share Repurchase Program for Shareholder Approval (6-K) y convocatoria de la junta del 26-oct-2026', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-08-24', url: SEC + '000119312526363569/d102434dex991.htm' },
);
A.capital.politica = A.capital.politica.replace('[P1-A]', '[11]').replace('[P2-A]', '[12]');
A.capital.comentario = A.capital.comentario.replace('[P2-A]', '[12]');
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 20-F 2025 (negocio, competencia, cuotas AFAC, regulación, flota, Delta)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: SEC + '000119312526197494/d101275d20f.htm' },
  { id: 2, titulo: 'Folleto de la salida a bolsa (424B1): datos operativos 2022-2024', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2025-11-07', url: SEC + '000119312525270444/d11281d424b1.htm' },
  { id: 3, titulo: 'Volaris (VLRS): estadísticas (ingresos y EBITDA de 12 meses)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/vlrs/statistics/' },
  { id: 4, titulo: 'Copa Holdings (CPA): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/cpa/statistics/' },
  { id: 5, titulo: 'Delta Air Lines (DAL): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/dal/statistics/' },
  { id: 6, titulo: 'United Airlines (UAL): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/ual/statistics/' },
  { id: 7, titulo: 'Aeroméxico carries 1.85 million passengers in September (tráfico y tendencia de capacidad)', editor: 'Aviation24.be', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.aviation24.be/airlines/aeromexico/aeromexico-carries-1-85-million-passengers-in-september-as-demand-outpaces-capacity/amp/' },
  { id: 8, titulo: 'Cara y cruz: Volaris dispara su pasaje mientras Aeroméxico pierde (ene-sep-2026)', editor: 'News in America', tipo: 'Prensa', fecha: '2026-10', url: 'https://newsinamerica.com/pdcc/boletin/2026/cara-y-cruz-volaris-dispara-su-pasaje-mientras-aeromexico-pierde/' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Aeroméxico nace en 1934 y fue de propiedad estatal hasta su privatización; en 2012 volvió a la Bolsa Mexicana con Grupo Aeroméxico como cabecera [1]. Delta, socia desde la fundación de SkyTeam en 2000, compró el 49 % en 2017 y firmó con ella una empresa conjunta con inmunidad antimonopolio para las rutas EE. UU.-México desde 2016 [1]. La pandemia llevó al grupo al Chapter 11 en junio de 2020; salió en marzo de 2022 con Apollo como nuevo accionista de referencia, deuda y arrendamientos renegociados y la bolsa mexicana abandonada [1]. Tomó el control de PLM (fidelización) en 2022, devolvió 1.298 M a sus accionistas en 2023-2025 y volvió a cotizar en la NYSE y la BMV el 6-nov-2025 a 19 USD por ADS [1, 2].',
    hitos: [
      { anio: '1934', hito: 'Fundación (Aeronaves de México) [1].' },
      { anio: '2000', hito: 'Cofunda SkyTeam con Delta, Air France y Korean Air [1].' },
      { anio: '2016', hito: 'Empresa conjunta con Delta en las rutas transfronterizas, con inmunidad antimonopolio del DOT [1].' },
      { anio: '2017', hito: 'Delta sube al 49 % del capital [1].' },
      { anio: '2020', hito: 'Chapter 11 en Nueva York por la pandemia [1].' },
      { anio: '2022', hito: 'Sale del Chapter 11 (marzo) con Apollo como mayor accionista; control de PLM (julio) [1, 2].' },
      { anio: '2024', hito: 'Bonos garantizados de 1.110 M y reducción de capital de 818,5 M [1].' },
      { anio: '2025', hito: 'El DOT ordena terminar la inmunidad de la empresa conjunta con Delta (septiembre); salida a bolsa en NYSE y BMV (6 de noviembre) [1].' },
      { anio: '2026', hito: 'El Tribunal de Apelación del 11.º Circuito anula la orden del DOT (20 de agosto); propuesta de recompra de 100 M al año [1].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Grupo Aeroméxico es la única aerolínea de red (full service) con base en México y la única que vuela largo radio desde el país: 169 aviones a jun-2026 (135 Boeing 737 y 787 de Aeroméxico y 34 Embraer 190 de Aeroméxico Connect), 48 destinos nacionales y 51 internacionales, con el centro de operaciones en la Terminal 2 del aeropuerto de Ciudad de México (MEX), saturado y con franjas limitadas [1]. En 2025 el pasaje dio el 90,7 % de los ingresos, la carga el 5,8 % y el resto la fidelización (Aeroméxico Rewards) y otros servicios [1]. El 63,3 % del pasaje es internacional, sobre todo EE. UU., donde opera con Delta en una empresa conjunta que reparte ingresos y coordina horarios [1]. Clientes: viajero de negocios y de ocio menos sensible al precio, con tres clases de cabina [1].',
    como_gana_dinero: 'Vende asientos-milla a una tarifa (14,7 centavos de USD por pasajero-milla en el 2T26) y el margen depende de llenar el avión (factor de ocupación del 84,9 % en el 2T26) y de controlar el coste por asiento-milla, del que el combustible es la partida mayor (21,2 % de los ingresos en 2025, 33 % en el 2T26) [1, 4-A]. Casi la mitad de los costes no combustibles (salarios, aeropuertos, servicios) están en pesos y los ingresos domésticos también: un peso fuerte sube el CASM (+12,3 % en el 2T26) [1]. El apalancamiento operativo es alto: con la flota arrendada y la plantilla fija, un punto de ocupación o de tarifa va casi entero al EBIT. Estacionalidad: julio-agosto, Semana Santa y diciembre altos; febrero, septiembre y octubre bajos [1]. La fidelización y el premium (43 % del pasaje) dan la parte más estable [1].',
    clientes: 'Clientela atomizada: ningún cliente relevante; la venta indirecta (agencias) cuesta 97 M en comisiones en 2025 [1]. Poder de precios demostrado: en el 2T26 la tarifa por pasajero-milla subió un 11,4 % y recuperó un 75 % del encarecimiento del combustible, en un mercado con dos ULCC (Volaris y Viva) que llevan años sin aviones por las inspecciones de los motores Pratt & Whitney GTF [1]. En 2025, en cambio, los ingresos por pasaje bajaron un 5,6 % con la capacidad plana: el poder de precios depende del ciclo y de la capacidad de la competencia [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Transporte aéreo de pasajeros con origen o destino en México (doméstico e internacional), el mercado donde Aeroméxico tiene su cuota. No hay un tamaño publicado en dólares con dos fuentes; se usa el número de pasajeros de la AFAC, deducido de las cuotas que publica la empresa (estimación propia: domésticos = pasajeros domésticos de Aeroméxico ÷ su cuota) [1]. La Organización de Aviación Civil (vía Banco Mundial) da un crecimiento del 6,0 % anual de los pasajeros de México en 2014-2024, cuatro veces el PIB real (1,3 %) [1].',
    tamano: '≈ 64 M de pasajeros domésticos en 2025 (estimación propia: 15,9 M de Aeroméxico ÷ 25 % de cuota AFAC) y ≈ 90 M internacionales (12,6 M con Delta ÷ 14 %) [1].',
    unidad_serie: 'millones de pasajeros domésticos (estimación propia desde cuotas AFAC)',
    serie: [ { anio: '2023', tamano: 62.5 }, { anio: '2024', tamano: 60.7 }, { anio: '2025', tamano: 63.6 } ],
    tcac_historico_pct: 6.0, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Penetración baja del avión en México', efecto: '+', horizonte: 'Estructural', evidencia: '0,5 viajes domésticos por habitante (AFAC) y pasajeros creciendo al 6,0 % anual en 2014-2024 [1].' },
      { driver: 'Precio del queroseno', efecto: '−', horizonte: 'Cíclico', evidencia: 'Del 26,7 % de los ingresos en 2023 al 21,2 % en 2025; +79,6 % por galón en el 2T26 por la guerra de Oriente Medio [1].' },
      { driver: 'Tipo de cambio peso-dólar', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El peso fuerte sube ingresos domésticos en dólares y costes locales: CASM sin combustible +12,3 % con el peso +11,3 % en el 2T26 [1].' },
      { driver: 'Capacidad de la competencia (motores GTF de Volaris y Viva)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Aeroméxico vuela CFM LEAP y GE: no le afectan las retiradas de los Pratt & Whitney GTF de sus rivales A320neo [1].' },
      { driver: 'Relación EE. UU.-México en aviación (franjas en MEX, inmunidad de la empresa conjunta)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El DOT ordenó terminar la inmunidad en sep-2025; el tribunal la anuló en ago-2026 [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Dos ULCC con el 70 % del doméstico y grandes de EE. UU. en el transfronterizo; Aeroméxico perdió 3 pp de cuota doméstica en 2025 [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientela atomizada y sensible al precio en ocio; el viajero de negocios paga por red y puntualidad [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Boeing, Embraer, CFM y GE exclusivos; combustible de ASA y World Fuel a precio de mercado; sindicatos con el 70 % de la plantilla [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Franjas de MEX saturadas y concesión de la SICT; entrada de Mexicana (estatal) sin cuota relevante [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Autobús en distancias cortas; el pasaje se pasa del autobús al avión [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La demanda internacional y la tarifa siguen altas (TRASM +10,5 % en el 2T26) pero el combustible ha comprimido los márgenes y el doméstico se enfría (pasajeros −2,5 % en ene-sep-2026) [1, 7]. En 2008-09 la aviación mexicana cayó con la gripe A y la recesión; en 2020 Aeroméxico perdió 1.997 M y entró en Chapter 11; en 2022 el combustible caro dejó el beneficio neto en pérdidas (−64 M) [1, 3-A].' },
    regulacion: 'Concesión de la SICT para el transporte doméstico; límite legal del 49 % de voto extranjero en aerolíneas mexicanas (la mayoría del consejo la nombran inversores mexicanos) [1]. MEX tiene franjas limitadas por decreto y la carga se trasladó a AIFA en 2023, lo que motivó la orden del DOT de jul-2025 contra la inmunidad de la empresa conjunta con Delta, anulada por el 11.º Circuito el 20-ago-2026 [1]. Tasas aeroportuarias (TUA) al alza con los planes maestros de los grupos aeroportuarios [1].',
    tendencias: 'Más tráfico internacional y premium: Aeroméxico pasó del 60,1 % al 63,3 % de pasaje internacional en 2025 y del 42 % al 43 % de premium [1]. Los ULCC crecen en el doméstico (Volaris +8,7 % de pasajeros en ene-sep-2026 frente a −2,5 % de Aeroméxico) [8]. Gana con el premium, la fidelización y las rutas largas; pierde cuota doméstica de precio bajo.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 25.0, posicion: '2.º-3.º del doméstico mexicano por pasajeros (25 %, AFAC 2025) y única de red; 14 % del tráfico internacional de México (21 % con Delta) [1].',
    competidores: [
      { nombre: 'Volaris', pais: 'México', ticker: 'VLRS', ingresos: 3300, cuota_pct: null, margen_ebit_pct: null, comentario: 'ULCC A320neo con motores GTF; EBITDA de 12 meses del 6,3 % de los ingresos [3].' },
      { nombre: 'Viva Aerobus', pais: 'México', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'ULCC privada (Grupo IAMSA); no publica cuentas.' },
      { nombre: 'Copa Holdings', pais: 'Panamá', ticker: 'CPA', ingresos: 3990, cuota_pct: null, margen_ebit_pct: null, comentario: 'Red con centro en Panamá; margen EBITDA del 27,7 % [4].' },
      { nombre: 'Delta Air Lines', pais: 'EE. UU.', ticker: 'DAL', ingresos: 71800, cuota_pct: null, margen_ebit_pct: null, comentario: 'Socia y accionista (18,7 %) [5, 1].' },
      { nombre: 'United Airlines', pais: 'EE. UU.', ticker: 'UAL', ingresos: 62900, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor rival en el transfronterizo desde Houston, Newark y Chicago [6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Única red de largo radio de México, SkyTeam y Delta: 21 % del tráfico internacional con la socia [1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Aeroméxico Rewards y la tarjeta de crédito; el viajero de ocio cambia por precio [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Franjas en MEX saturado, concesión y marca; premium del 43 % de los ingresos de pasaje [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'CASM sin combustible de 10,0 centavos en el 2T26, por encima de los ULCC; más bajo que las de red de EE. UU. según la empresa [1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Largo radio desde México sin rival local; el doméstico admite tres operadores [1].' },
      ],
    },
    amenazas: 'Que el DOT vuelva a atacar la inmunidad de la empresa conjunta con Delta tras perder en el 11.º Circuito (probabilidad media), que los ULCC recuperen los aviones parados por los GTF y bajen la tarifa doméstica (alta en 2027-2028), y que las franjas de MEX se redistribuyan o el gobierno empuje operaciones a AIFA (media) [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Combustible y emisiones: el queroseno es el 21-33 % de los ingresos y la flota se renueva (consumo por asiento-milla −1,7 % en el 2T26 con 737 MAX y 787) [1]. Seguridad y fiabilidad operativa: la más puntual entre las globales en 2024-2025 según Diio, con un 99,7 % de vuelos completados [1]. Relaciones laborales: el 70,3 % de la plantilla en México está sindicada; el contrato de pilotos (ASPA) venció el 30-sep-2026 y el de sobrecargos (ASSA) el 31-may-2026 [1].',
    controversias: 'Orden del DOT de sep-2025 contra la inmunidad de la empresa conjunta con Delta (anulada en ago-2026) [1]. La empresa sustituyó a CIBanco como fiduciario tras las sanciones del Tesoro de EE. UU. a ese banco en 2025, sin estar ella misma afectada [1]. No se han encontrado sanciones a la empresa en los últimos tres años.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamano en USD y previsión', tipo: 'Núcleo', intentos: '1) 20-F 2025 (solo crecimiento de pasajeros, sin tamaño en dinero); 2) búsqueda de las estadísticas anuales de la AFAC 2025 (solo datos parciales de prensa); 3) derivado de las cuotas de la empresa', decision: 'Calculado y marcado como estimación' },
    { seccion: 'competencia', campo: 'margen_ebit_pct de los competidores', tipo: 'Complemento', intentos: '1) Stock Analysis (da EBITDA, no EBIT); 2) Viva Aerobus no cotiza; 3) sin informes anuales leídos por presupuesto', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 20-F (no las da); 2) MSCI y Sustainalytics sin acceso; 3) sin búsqueda por presupuesto', decision: 'Omitido' },
  ],
};
// La cita [4-A] y [3-A] del texto de negocio y ciclo: pasar a fuentes propias de B
fB.push({ id: 9, titulo: 'Aeroméxico Reports Unaudited Second Quarter 2026 Results (6-K)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-07-13', url: SEC + '000119312526302103/d112634dex991.htm' });
fB.push({ id: 10, titulo: 'Form F-1 (mayo de 2024): cuentas 2019-2023', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2024-05-13', url: SEC + '000119312524137345/d493840df1.htm' });
B.negocio.como_gana_dinero = B.negocio.como_gana_dinero.replace('[1, 4-A]', '[1, 9]');
B.sector.ciclo.comentario = B.sector.ciclo.comentario.replace('[1, 3-A]', '[1, 10]').replace('[1, 7]', '[9, 7]');
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025 (Item 6 consejo y directivos, remuneración agregada, Item 7 accionistas, Item 16G)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: SEC + '000119312526197494/d101275d20f.htm' },
  { id: 2, titulo: 'Resoluciones de la junta ordinaria del 7-ene-2026 (6-K)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-01-08', url: SEC + '000119312526009173/d668217dex991.htm' },
  { id: 3, titulo: 'Resoluciones de la junta anual del 30-abr-2026 (6-K)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: SEC + '000119312526201483/d132443dex991.htm' },
  { id: 4, titulo: 'Schedule 13G/A de Apollo (18,9 % a 30-jun-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-10', url: SEC + '000110465926093617/xslSCHEDULE_13G_X02/primary_doc.xml' },
  { id: 5, titulo: 'Form 4 de Grupo Aeroméxico (oct-2025 a oct-2026), resumidos con form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1561861&type=4' },
  { id: 6, titulo: 'Aeroméxico Announces Purchases of Shares by Certain Directors and Members of Executive Management (6-K)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-03-17', url: SEC + '000119312526109337/d49285dex991.htm' },
  { id: 7, titulo: 'Huelga en Aeroméxico: ¿cuándo sería el paro y qué pasará con los vuelos? (prórroga de 45 días desde el 1-oct)', editor: 'El Imparcial', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://www.elimparcial.com/mexico/2026/09/30/huelga-en-aeromexico-cuando-seria-el-paro-y-que-pasara-con-los-vuelos/' },
  { id: 8, titulo: 'Guías de 2025 y 2026 (6-K de resultados del 3T25, 4T25, 1T26 y 2T26)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-07-13', url: SEC + '000119312526302103/d112634dex991.htm' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Andrés Conesa Labastida', cargo: 'Director general y consejero', desde: '2005', participacion_pct: null, trayectoria: 'Doctor en Economía por el MIT y exfuncionario de Hacienda (deuda pública y política económica); dirige la aerolínea desde 2005, presidió IATA en 2015 y SkyTeam desde 2023 [1]. Llevó a la empresa por el Chapter 11 de 2020-2022 y a la salida a bolsa de 2025 [1].' },
      { nombre: 'Ricardo Javier Sánchez Baker', cargo: 'Director financiero', desde: '2006', participacion_pct: null, trayectoria: 'Doctor en Economía por UCLA, exsubdirector de deuda pública en Hacienda; director financiero desde 2006 y presidente de PLM en 2019-2023 [1].' },
      { nombre: 'Aaron James Murray', cargo: 'Director comercial', desde: '2021', participacion_pct: null, trayectoria: 'Más de 24 años en Northwest y Delta antes de llegar en 2021 [1]. Vendió acciones por 2,0 M USD en 2026 según sus Form 4 [5].' },
      { nombre: 'Francisco Javier de Arrigunaga Gómez del Campo', cargo: 'Presidente del consejo (independiente)', desde: '2016', participacion_pct: null, trayectoria: 'Presidente no ejecutivo; consejero independiente según la junta de enero de 2026 [2, 1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Nov-2025: ingresos −5,5 % a −4,5 %, margen EBITDAR 29-30 %, margen operativo 15-16 % [8]', real: 'Ingresos −4,6 %, EBITDAR 31 % (30 % normalizado), margen operativo 17,3 % (16,1 % normalizado) [8]', cumplida: 'Sí' },
      { anio: '2026 (1T)', guia: 'Feb-2026: ingresos 1.300-1.330 M, margen operativo 11-13 % [8]', real: '1.341 M y 10,6 %, extremo bajo con el combustible disparado desde marzo [8]', cumplida: 'Parcial' },
      { anio: '2026 (2T)', guia: 'Abr-2026: ingresos 1.470-1.520 M, EBITDAR 17-20 %, margen operativo 4-7 % [8]', real: '1.479 M, 17,9 % y 4,6 % [8]', cumplida: 'Sí' },
      { anio: '2026 (año)', guia: 'Feb-2026: margen EBITDAR 28,5-30,5 % y operativo 15-17 %; jul-2026: 24-26 % y 11-13 % [8]', real: 'Pendiente (recortada por el combustible)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo muy estable: el director general (desde 2005) y el financiero (desde 2006) llevan dos décadas y han pasado una reestructuración completa sin perder la red ni la marca [1]. Cumplen la guía cuando el combustible no se mueve (2025, 2T26) y la recortan con transparencia cuando se mueve (jul-2026) [8]. En marzo de 2026 consejeros y directivos compraron 103.212 ADS en mercado [6]; Eduardo Tricio compró por 1,32 M y el director comercial vendió por 2,01 M [5]. No hay plan de sucesión público para el director general.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Francisco Javier de Arrigunaga Gómez del Campo', cargo: 'Presidente', tipo: 'Independiente', desde: null, comisiones: 'n.d.' },
      { nombre: 'Andrés Conesa Labastida', cargo: 'Consejero y director general', tipo: 'Ejecutivo', desde: '2004', comisiones: 'Ejecutiva, Seguridad' },
      { nombre: 'Luis Fernando Gerardo de la Calle Pardo', cargo: 'Consejero', tipo: 'Independiente', desde: '2008', comisiones: 'Auditoría y Prácticas Societarias' },
      { nombre: 'Donald Lee Moak', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'n.d.' },
      { nombre: 'Jorge Andrés Vilches Martínez', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'n.d.' },
      { nombre: 'Michael J. Wartell', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'n.d.' },
      { nombre: 'Peter W. Carter', cargo: 'Consejero (designado por Delta)', tipo: 'Dominical', desde: '2026', comisiones: 'n.d.' },
      { nombre: 'Antoine George Munfakh', cargo: 'Consejero (Apollo)', tipo: 'Dominical', desde: null, comisiones: 'n.d.' },
      { nombre: 'Bogdan Ignashchenko', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: 'n.d.' },
      { nombre: 'Eduardo Tricio Haro', cargo: 'Consejero (inversores mexicanos)', tipo: 'Dominical', desde: null, comisiones: 'n.d.' },
      { nombre: 'Antonio Cosío Pando', cargo: 'Consejero (inversores mexicanos)', tipo: 'Dominical', desde: null, comisiones: 'n.d.' },
      { nombre: 'Valentín Diez Morodo', cargo: 'Consejero (inversores mexicanos)', tipo: 'Dominical', desde: null, comisiones: 'n.d.' },
      { nombre: 'Jorge Esteve Recolons', cargo: 'Consejero (inversores mexicanos)', tipo: 'Dominical', desde: null, comisiones: 'n.d.' },
      { nombre: 'Andrés Borrego y Marrón', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: 'n.d.' },
      { nombre: 'Myriam Guadalupe de la Vega Arizpe', cargo: 'Consejera (propuesta de los inversores mexicanos)', tipo: 'Dominical', desde: '2026', comisiones: 'n.d.' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'El 20-F no individualiza la remuneración: consejeros y altos ejecutivos cobraron 49,8 M USD en conjunto en 2025, con fijo, bonos anuales y acciones restringidas [1]. Los bonos los aprueba la comisión de nombramientos y compensación con factores de desempeño que no se publican; el plan de acciones nació en 2022 con un incentivo único por la salida del Chapter 11 (MIP) y un plan a largo plazo con entrega anual (LTIP): 49,9 M de acciones asignadas y 40,0 M ya consolidadas a dic-2025 [1]. Sin indemnizaciones pactadas; no hay cláusula de recuperación pública más allá de la norma de la NYSE [1]. Como emisor extranjero no somete la remuneración a voto consultivo; la junta aprueba la de los consejeros [3].',
    accionistas: [
      { nombre: 'Apollo (AP Aguila Holdings)', pct: 18.9, tipo: 'Fondo de capital privado (dueño desde el Chapter 11)', variacion: 'Sin cambios a 30-jun-2026 [4]' },
      { nombre: 'Delta Air Lines', pct: 18.7, tipo: 'Socio estratégico (derecho estatutario a nombrar consejero)', variacion: 'Bajó del 49 % de 2017 tras el Chapter 11 [1]' },
      { nombre: 'Fondos de Silver Point Capital', pct: 9.0, tipo: 'Fondo de crédito (acreedor convertido)', variacion: 'n.d.' },
      { nombre: 'SVP Funds', pct: 6.5, tipo: 'Fondo de crédito (acreedor convertido)', variacion: 'n.d.' },
      { nombre: 'Banco Actinver F/5292 (fideicomiso)', pct: 5.2, tipo: 'Fideicomiso mexicano', variacion: 'n.d.' },
      { nombre: 'Eduardo Tricio Haro', pct: 1.1, tipo: 'Consejero (inversor mexicano)', variacion: 'Compró por 1,32 M USD en 2026 [5]' },
    ],
    insiders: [
      { fecha: '2026-03-17', persona: 'Consejeros y directivos (agregado)', operacion: 'Compra', acciones: 1032120, importe: null },
      { fecha: '2026', persona: 'Eduardo Tricio Haro (consejero)', operacion: 'Compra', acciones: null, importe: 1.32 },
      { fecha: '2026', persona: 'Aaron James Murray (director comercial)', operacion: 'Venta', acciones: null, importe: 2.01 },
    ],
    control_y_defensas: 'No hay accionista de control: Apollo (18,9 %) y Delta (18,7 %) son los mayores, seguidos de dos fondos de crédito que se quedaron acciones en el Chapter 11 (Silver Point 9,0 %, SVP 6,5 %) [1]. La ley mexicana limita el voto extranjero en aerolíneas al 49 % y los estatutos exigen que la mayoría del consejo la nombren inversores mexicanos; las acciones de extranjeros por encima del límite votan restringidas [1, 2]. Delta tiene derecho estatutario a nombrar un consejero como «socio estratégico» [2]. Operaciones vinculadas relevantes con Delta: la empresa conjunta que reparte ingresos transfronterizos, la compra de combustible conjunta y la venta de TechOps MX en 2025 [1]. Los fondos de capital privado y de crédito llevan cuatro años dentro: son vendedores naturales (riesgo de colocación).',
    alertas: [
      'Apollo, Silver Point y SVP (34,4 % entre los tres) son dueños financieros desde 2022: colocaciones probables tras el fin del bloqueo de la salida a bolsa [1, 4].',
      'Contrato colectivo de los pilotos (ASPA) vencido el 30-sep-2026; emplazamiento a huelga prorrogado 45 días [7].',
      'Remuneración de la cúpula sin individualizar ni métricas públicas [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo y votos de remuneración', tipo: 'Complemento', intentos: '1) 20-F 2025 Item 6 (solo agregado de 49,8 M); 2) resoluciones de las juntas de ene y abr-2026 (sin porcentajes de voto); 3) informe anual a la BMV no consultado', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración (hechos)
const fD = [
  { id: 1, titulo: 'Históricos diarios de AERO, SPY y JETS (bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/AERO/history' },
  { id: 2, titulo: 'Grupo Aeroméxico: estimaciones y consenso (finances)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://www.marketscreener.com/quote/stock/GRUPO-AEROMEXICO-S-A-B-DE-197853411/finances/' },
  { id: 3, titulo: 'Grupo Aeroméxico (AERO) price target and analyst ratings', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-18', url: 'https://www.marketbeat.com/stocks/NYSE/AERO/forecast/' },
  { id: 4, titulo: 'AERO forecast (consenso de ingresos y BPA 2026, objetivos)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/aero/forecast/' },
  { id: 5, titulo: 'AERO statistics (flotante, posición corta, ROIC)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/aero/statistics/' },
  { id: 6, titulo: 'Copa Holdings (CPA) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/cpa/statistics/' },
  { id: 7, titulo: 'Volaris (VLRS) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/vlrs/statistics/' },
  { id: 8, titulo: 'Delta Air Lines (DAL) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/dal/statistics/' },
  { id: 9, titulo: 'United Airlines (UAL) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/ual/statistics/' },
  { id: 10, titulo: 'LATAM Airlines (LTM) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/ltm/statistics/' },
  { id: 11, titulo: 'American Airlines (AAL) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/aal/statistics/' },
  { id: 12, titulo: 'Alaska Air Group (ALK) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/alk/statistics/' },
  { id: 13, titulo: 'Bono del Tesoro de EE. UU. a 10 años (DGS10): 5,10 % el 15-oct-2026', editor: 'FRED, Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 14, titulo: 'Tipo de cambio peso-dólar (DEXMXUS): 18,40 el 9-oct-2026', editor: 'FRED, Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://fred.stlouisfed.org/series/DEXMXUS' },
  { id: 15, titulo: 'Country Default Spreads and Risk Premiums (México: prima país 2,46 %)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Sectorial', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 16, titulo: 'Betas by Sector (US), Air Transport: beta desapalancada corregida por caja 0,76', editor: 'A. Damodaran (NYU Stern)', tipo: 'Sectorial', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
  { id: 17, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Sectorial', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 18, titulo: 'Aeromexico Announces Webcast of Third Quarter 2026 Financial Results (resultados el 19-oct tras el cierre)', editor: 'Finviz (comunicado de la empresa)', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://finviz.com/news/397396/aeromexico-announces-webcast-of-third-quarter-2026-financial-results' },
  { id: 19, titulo: 'Aeroméxico Announces Court Decision on Aeromexico-Delta ATI (6-K)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-08-21', url: SEC + '000119312526359690/d180062dex991.htm' },
  { id: 20, titulo: 'Unusual Movements in the Trading Price of the Shares (6-K, 18-sep-2026)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-09-22', url: SEC + '000156186126000072/a2026-09x18unusualmovement.htm' },
  { id: 21, titulo: 'Folleto de la salida a bolsa (424B1): precio de 19,00 USD por ADS, accionistas vendedores', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2025-11-07', url: SEC + '000119312525270444/d11281d424b1.htm' },
  { id: 22, titulo: 'Form 20-F 2025 (acciones en circulación a 15-abr-2026: 1.459.034.090; accionistas)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: SEC + '000119312526197494/d101275d20f.htm' },
  { id: 23, titulo: 'Aeroméxico 2T26 (6-K): balance a 30-jun-2026, deuda ajustada, guía', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-07-13', url: SEC + '000119312526302103/d112634dex991.htm' },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Grupo Aeroméxico, S.A.B. de C.V.', nombre_corto: 'Aeroméxico', ticker: 'AERO', isin: null, mercado: 'NYSE (ADS; también BMV en pesos)', indice_referencia: 'S&P 500 (SPY)',
    pais: 'México', pais_iso: 'MX', sector: 'Industria', industria: 'Aerolíneas', sede: 'Ciudad de México', fundacion: '1934', empleados: 17068, web: 'https://www.aeromexico.com',
    precio: 15.98, fecha_precio: '2026-10-16', acciones: 145.9, capitalizacion_publicada: 2330, free_float_pct: 21.0,
    max_52s: 23.05, min_52s: 12.26, volumen_medio_diario: '≈ 5,1 M USD/día en la NYSE (3 meses)', proximos_resultados: '2026-10-19',
  },
  consenso: {
    guidance: 'Guía de 2026 del 13-jul-2026 (última confirmación): ingresos de 6.050-6.120 M USD (+13-14 %), capacidad +2-3 %, margen EBITDAR ajustado del 24-26 % y margen operativo del 11-13 %; 3T26: ingresos 1.590-1.620 M, EBITDAR 26,5-29,5 %, operativo 14-17 %; 4T26: 1.640-1.680 M, EBITDAR 28-31 %, operativo 15,5-18,5 %; con queroseno a 3,2 y 3,0 USD por galón y 17,5-17,6 pesos por dólar [23]. Sustituye a la de feb-2026 (ingresos 5.770-5.880 M, EBITDAR 28,5-30,5 %, operativo 15-17 %) [23]. No hay plan a medio plazo publicado.',
    estimaciones: [
      { periodo: '2026e', ingresos: 6251, ebitda: 1481, ebit: 662, bpa: 1.62, dpa: 0, fuente: 'MarketScreener, 9 analistas (cifras en MXN pasadas a USD a 17,175, el cociente de su 2025) [2]' },
      { periodo: '2027e', ingresos: 6572, ebitda: 1723, ebit: 875, bpa: 2.34, dpa: 0.14, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 6970, ebitda: 1903, ebit: 1035, bpa: 3.73, dpa: 0.97, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 8, mantener: 2, vender: 1, po_medio: 28.06, po_min: 20.0, po_max: 36.0 },
    revisiones: 'MarketScreener da un objetivo medio de 26,60 USD con 9 analistas y MarketBeat 28,06 USD con 11 (máximo 36, Evercore; mínimo 20, Jefferies) [2, 3]. Los objetivos van a la baja desde el combustible: Barclays de 32 a 25 USD (24-mar), JPMorgan de 28 a 26,5 (12-jun) y Jefferies inicia en Mantener con 20 (18-jun); Zacks baja a Mantener el 27-ago [3]. El BPA de 2026 de MarketScreener (1,62 USD por ADS) no cuadra con su propio beneficio neto (1.516 M MXN ≈ 88 M USD, 0,60 por ADS): mezcla analistas con fechas distintas; Stock Analysis da para 2026 un BPA por acción entre −0,06 y 0,06 USD (−0,6 y 0,6 por ADS) [2, 4]. Solo una fuente completa, contrastada en objetivos con otras dos.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [ { periodo: 'En el año', accion_pct: -27.2, indice_pct: 12.8, sector_pct: -7.9 } ],
    anual: [],
    beta: null, volatilidad_pct: 53.5, max_drawdown_pct: -46.0, posicion_corta_pct: 1.03,
    comentario: 'Cotiza desde el 6-nov-2025 a 19,00 USD por ADS [21]; marcó un máximo de 23,05 USD el 26-dic-2025 y cayó un 46 % hasta 12,26 USD el 20-mar-2026 con la guerra de Oriente Medio y el queroseno [1]. En el año pierde un 27,2 % frente al +12,8 % del S&P 500 y el −7,9 % del ETF de aerolíneas JETS: peor que el sector porque no cubre combustible y porque el peso fuerte encarece sus costes [1, 23]. Sin beta de 5 años (menos de un año cotizando). Posición corta del 1,03 % de las acciones [5].',
    contexto: {
      movimiento: { fecha: '2026-10-16', var_1m_pct: 8.0, var_3m_pct: 3.1, var_6m_pct: -1.9, var_12m_pct: null, dist_max_52s_pct: -30.2, dist_min_52s_pct: 29.3, dist_max_historico_pct: -30.2, tendencia: 'bajista', volatilidad_60d_pct: 46.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'feb-mar 2026', var_pct: -46.0, causa: 'Del máximo del 26-dic-2025 al mínimo del 20-mar-2026: guerra de Oriente Medio y cierre de Ormuz (queroseno +49 % en marzo), sin coberturas; −10,5 % el 23-feb por el cierre de aeropuertos de Jalisco y Nayarit y −14,9 % el 12-mar [1, 22].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-2026', var_pct: 28.6, causa: 'Rebote de un mes hasta el 21-abr con el alivio del petróleo y los resultados del 1T26 (ingresos +13,3 %) [1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: -16.7, causa: 'Resultados del 2T26 (13-jul, −8,5 % ese día): pérdida de 57,7 M y guía de margen recortada [23, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: '20-ago-2026', var_pct: -7.3, causa: 'Caída el día en que el 11.º Circuito anuló la orden del DOT contra la empresa conjunta con Delta (noticia favorable): sin causa propia publicada [19, 1].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-19', tipo: 'resultados', hecho: 'Resultados del 3T26 el 19-oct tras el cierre y conferencia el 20-oct [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-15', tipo: 'demanda o regulador', hecho: 'Emplazamiento a huelga de los pilotos (ASPA) prorrogado 45 días desde el 1-oct: la empresa ofreció un 3,2 % y los pilotos lo rechazaron; vence hacia mediados de noviembre [P1].', veredicto: 'retrasa', condicion: 'hasta que se firme el contrato de los pilotos o se aleje la huelga' },
        { fecha: '2026-10-26', tipo: 'accionista de referencia', hecho: 'Junta del 26-oct para aprobar recompras de hasta 100 M USD al año [P2]. Apollo (18,9 %), Silver Point (9,0 %) y SVP (6,5 %) siguen dentro; ninguna colocación anunciada, pero el bloqueo de la salida a bolsa venció en mayo y son vendedores naturales [22].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-20', tipo: 'demanda o regulador', hecho: 'El 11.º Circuito anula la orden del DOT que terminaba la inmunidad de la empresa conjunta con Delta; el DOT puede recurrir o reabrir el caso [19].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-18', tipo: 'rumor', hecho: 'La CNBV pidió explicar movimientos inusuales del 18-sep; la empresa no conoce causa salvo la convocatoria de la junta [20].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-18', tipo: 'recomendación', hecho: 'Jefferies inicia en Mantener (20 USD); recortes de Barclays (a 25) y JPMorgan (a 26,5) [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-17', tipo: 'directivos', hecho: 'Consejeros y directivos compran 103.212 ADS en mercado; el director comercial vende por 2,0 M en 2026 [P3].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-19',
      veredicto: 'retrasa',
      condicion: 'hasta que se firme el contrato de los pilotos (prórroga hasta mediados de noviembre de 2026)',
      comentario: 'La acción está un 30 % por debajo de su máximo y un 16 % por debajo del precio de salida, en tendencia bajista por la media de 200 sesiones (−3,4 %) aunque sube un 8 % en el último mes con el petróleo más bajo [1]. El hecho pendiente ajeno al análisis que puede mover el precio más de un 5 % es el emplazamiento a huelga de los pilotos, prorrogado hasta mediados de noviembre: retrasa. Los resultados del 3T26 (19-oct) no aplazan por sí solos (regla 11). El riesgo de colocación de Apollo y los fondos de crédito no tiene fecha y no retrasa, pero pesa en el precio. Buscado en los 6-K, 13G/A y Form 4 de EDGAR, MarketBeat, Seeking Alpha y prensa mexicana.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [ { anio: '2025', precio_cierre: 21.96, ev_ebitda_ntm: null, per_ntm: null, excluir: false } ],
    comentario: 'Solo hay un cierre de ejercicio (2025: 21,96 USD) [1]: la acción vieja se anuló en el Chapter 11 y la nueva cotiza desde nov-2025. No hay historia de múltiplos útil; la valoración relativa se apoya en los comparables.',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Aerolíneas cotizadas de América con datos del mismo proveedor y la misma fecha (Stock Analysis, cierre del 16-oct-2026): dos de red latinoamericanas (Copa, LATAM), la ULCC mexicana rival (Volaris) y cuatro de red de EE. UU., entre ellas Delta, socia y accionista. Fuera las europeas (otro ciclo de combustible y coberturas) y Viva Aerobus (no cotiza). El EBITDA de Stock Analysis no siempre usa la definición de las cuentas: se compara sobre todo el PER adelantado.',
    empresas: [
      { nombre: 'Copa Holdings', ticker: 'CPA', pais: 'PA', capitalizacion: 5440, ev_ventas: 1.69, ev_ebitda_ltm: 6.1, ev_ebitda_ntm: null, per_ntm: 8.69, crecimiento_pct: null, margen_ebitda_pct: 27.7, roic_pct: 16.6, dn_ebitda: null, fcf_yield_pct: 4.3 },
      { nombre: 'LATAM Airlines', ticker: 'LTM', pais: 'CL', capitalizacion: 13650, ev_ventas: 1.24, ev_ebitda_ltm: 5.3, ev_ebitda_ntm: null, per_ntm: 7.6, crecimiento_pct: null, margen_ebitda_pct: 23.3, roic_pct: 27.1, dn_ebitda: null, fcf_yield_pct: 16.3 },
      { nombre: 'Volaris', ticker: 'VLRS', pais: 'MX', capitalizacion: 685, ev_ventas: 1.08, ev_ebitda_ltm: 17.2, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 6.3, roic_pct: 0.4, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Delta Air Lines', ticker: 'DAL', pais: 'US', capitalizacion: 49320, ev_ventas: 0.91, ev_ebitda_ltm: 8.7, ev_ebitda_ntm: null, per_ntm: 11.43, crecimiento_pct: null, margen_ebitda_pct: 10.5, roic_pct: 10.2, dn_ebitda: null, fcf_yield_pct: 6.1 },
      { nombre: 'United Airlines', ticker: 'UAL', pais: 'US', capitalizacion: 31190, ev_ventas: 0.77, ev_ebitda_ltm: 6.8, ev_ebitda_ntm: null, per_ntm: 10.9, crecimiento_pct: null, margen_ebitda_pct: 11.3, roic_pct: 10.3, dn_ebitda: null, fcf_yield_pct: 8.2 },
      { nombre: 'American Airlines', ticker: 'AAL', pais: 'US', capitalizacion: 7860, ev_ventas: 0.6, ev_ebitda_ltm: 10.5, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 5.8, roic_pct: 3.1, dn_ebitda: null, fcf_yield_pct: 3.6 },
      { nombre: 'Alaska Air Group', ticker: 'ALK', pais: 'US', capitalizacion: 3920, ev_ventas: 0.6, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 4.8, roic_pct: -0.4, dn_ebitda: null, fcf_yield_pct: null },
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Folletos y 20-F (solo la compra de PLM y la venta de TechOps, sin múltiplo); 2) búsqueda de múltiplos de Alaska-Hawaiian, JetBlue-Spirit, Lufthansa-ITA y Air France-KLM-SAS (sin cifras primarias); 3) bases de datos de pago no accesibles', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'beta, rentabilidades a 1-10 años y anual', tipo: 'Complemento', intentos: '1) bolsa.mjs (menos de 12 meses cotizando); 2) Stock Analysis (beta n.d.); 3) beta sectorial de Damodaran usada en el WACC', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'isin', tipo: 'Complemento', intentos: '1) 20-F (portada sin ISIN); 2) folleto 424B1 (CUSIP del ADS, no ISIN de la acción); 3) sin búsqueda', decision: 'Omitido' },
  ],
};
// Fuentes propias de D para la regla 13
fD.push(
  { id: 24, titulo: 'Huelga en Aeroméxico: prórroga de 45 días del emplazamiento de ASPA desde el 1-oct-2026', editor: 'El Imparcial', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://www.elimparcial.com/mexico/2026/09/30/huelga-en-aeromexico-cuando-seria-el-paro-y-que-pasara-con-los-vuelos/' },
  { id: 25, titulo: 'Aeroméxico Announces Intention to Submit Share Repurchase Program (6-K) y convocatoria de la junta del 26-oct-2026 (6-K del 14-sep)', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-09-14', url: SEC + '000156186126000069/a2026-09x10gamcallsharehol.htm' },
  { id: 26, titulo: 'Compras de consejeros y directivos (6-K) y Form 4 de 2026', editor: 'Grupo Aeroméxico (SEC)', tipo: 'Primaria', fecha: '2026-03-17', url: SEC + '000119312526109337/d49285dex991.htm' },
);
const ctx = D.bolsa.contexto;
ctx.noticias = ctx.noticias.map((x) => ({ ...x, hecho: x.hecho.replace('[P1]', '[24]').replace('[P2]', '[25]').replace('[P3]', '[26]') }));
guarda('D', D);
console.log('Notas A-D escritas');
