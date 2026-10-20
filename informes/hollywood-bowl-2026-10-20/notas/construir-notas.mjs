// Escribe las notas A-E de Hollywood Bowl Group (corte 2026-10-20) a partir de los documentos de notas/docs (web de la
// empresa y RNS de Investegate), del ESEF de filings.xbrl.org (cuentas-xbrl.json), de bolsa.json y de yahoo-datos.json
// (Yahoo quoteSummary del 20-oct-2026, 08:29 UTC). Cada nota cita solo con [n] de su propia lista de fuentes.
// Cifras en millones de GBP salvo indicación; precios por acción en GBP (la acción cotiza en peniques, GBp).
// Ejecutar: node informes/hollywood-bowl-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const WEB = 'https://www.hollywoodbowlgroup.com/application/files';
const INV = 'https://www.investegate.co.uk/announcement/rns/hollywood-bowl-group--bowl';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report and Accounts 2025 (ejercicio a 30-sep-2025): cuentas consolidadas NIIF, notas de arrendamientos, deterioros, segmentos, remuneración y gobierno', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-12-16', url: `${WEB}/5417/6769/7101/HollywoodBowl_AR25_Full_report.pdf` },
  { id: 2, titulo: 'Final results for the year ended 30 September 2025 (RNS): cuenta, balance, flujos, conciliación de medidas ajustadas y pre-NIIF 16', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-12-16', url: `${WEB}/7617/6587/6921/FINAL_RNS_FOR_LOADING_12.45pm_15.12.pdf` },
  { id: 3, titulo: 'Interim results for the six months ended 31 March 2026 (RNS con estados financieros)', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2026-05-27', url: `${WEB}/5717/7986/4494/Combined_with_FIN_statements_FINAL.pdf` },
  { id: 4, titulo: 'Trading Statement – Year Ended 30 September 2026 (avance de ventas, centros y caja neta de FY2026)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-10-07', url: `${INV}/trading-statement-year-ended-30-september-2026/9809896` },
  { id: 5, titulo: 'Final results FY2024, FY2023, FY2022 y FY2021 (RNS): cuentas y segmentos de cada ejercicio', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2024-12-17', url: `${WEB}/7117/3443/2643/Hollywood_Bowl_Group_plc_RNS_FY2024_v3.pdf` },
  { id: 6, titulo: 'Interim results for the six months ended 31 March 2025 (RNS)', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-05-28', url: `${WEB}/4317/4851/0577/Hollywood_Bowl_-_Final_Full_RNS_m.pdf` },
  { id: 7, titulo: 'Informe financiero anual ESEF (iXBRL) FY2021-FY2025, LEI 213800XB8YZNGJYDEZ97', editor: 'filings.xbrl.org (FCA National Storage Mechanism)', tipo: 'Primaria', fecha: '2025-12-16', url: 'https://filings.xbrl.org/' },
  { id: 8, titulo: 'Capital Markets Day: objetivos de centros (130 en 2033), rentabilidad de aperturas y reformas', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-11-03', url: `${WEB}/4717/6277/3702/Preso_v22_-_FINAL_PRINT_OUT_AND_PLC_WEBSITE_VERSION_v2.pdf` },
  { id: 9, titulo: 'Share Buyback Programme (RNS) y Total Voting Rights a 30-sep-2026 (166.611.812 acciones)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-09-30', url: `${INV}/total-voting-rights/9800142` },
  { id: 10, titulo: 'Final results FY2019 (RNS): cuentas antes de la NIIF 16 y antes del covid', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2019-12-13', url: `${WEB}/5816/4303/0800/RNS12-12-19.pdf` },
];

// Cuenta: ESEF [7] completada con los RNS [2, 5]. coste_ventas = coste de los productos vendidos + personal de los centros
// (la empresa los presenta juntos desde FY2022; en FY2021 el personal estaba en gastos de administración). gastos_generales =
// gastos de administración, que incluyen la amortización (también la de derechos de uso) y los deterioros.
// amortizaciones = depreciación de inmovilizado y derechos de uso + amortización de intangibles + deterioros + pérdidas en
// bajas, de forma que ebitda − amortizaciones = EBIT publicado. no_recurrentes_en_ebitda = partidas ajustadas que quedan
// dentro del EBITDA (en positivo si son gasto): FY2022 −3,688 (devolución de IVA de ejercicios anteriores, ingreso);
// FY2023 2,203 y FY2024 1,823 (costes de compras, contraprestación de Teaquinn, acuerdos con propietarios); FY2025 −1,160
// (indemnización de seguros 1,613 menos costes). EBITDA ajustado de la empresa = ebitda + no_recurrentes.
const C = {
  FY2021: { ingresos: 71.878, coste_ventas: 10.257, gastos_generales: 54.855, ebitda: 30.558, amortizaciones: 20.978, ebit: 9.580, resultado_financiero: -9.118, bai: 0.462, impuestos: -1.266, beneficio_neto: 1.728, gastos_financieros: 9.118, nr: 0, bpa: 0.0104, dpa: 0, dpaX: 0, acc: 165.467 },
  FY2022: { ingresos: 193.741, coste_ventas: 63.1, gastos_generales: 75.2, ebitda: 81.143, amortizaciones: 25.694, ebit: 55.449, resultado_financiero: -8.784, bai: 46.665, impuestos: 9.2, beneficio_neto: 37.5, gastos_financieros: 8.796, nr: -3.688, bpa: 0.2178, dpa: 0.1453, dpaX: 0.03, acc: 171.913 },
  FY2023: { ingresos: 215.082, coste_ventas: 78.2, gastos_generales: 82.8, ebitda: 80.528, amortizaciones: 26.443, ebit: 54.085, resultado_financiero: -9.005, bai: 45.080, impuestos: 10.9, beneficio_neto: 34.2, gastos_financieros: 10.445, nr: 2.203, bpa: 0.1982, dpa: 0.1454, dpaX: 0.0273, acc: 172.302 },
  FY2024: { ingresos: 230.399, coste_ventas: 84.901, gastos_generales: 92.599, ebitda: 85.764, amortizaciones: 32.258, ebit: 53.506, resultado_financiero: -10.748, bai: 42.758, impuestos: 12.848, beneficio_neto: 29.910, gastos_financieros: 12.470, nr: 1.823, bpa: 0.1731, dpa: 0.1206, dpaX: 0, acc: 172.802 },
  FY2025: { ingresos: 250.662, coste_ventas: 93.694, gastos_generales: 100.357, ebitda: 92.395, amortizaciones: 34.171, ebit: 58.224, resultado_financiero: -13.940, bai: 44.284, impuestos: 9.675, beneficio_neto: 34.609, gastos_financieros: 14.767, nr: -1.160, bpa: 0.2014, dpa: 0.1328, dpaX: 0, acc: 171.845 },
};
const cuenta = Object.entries(C).map(([p, c]) => ({
  periodo: p, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda,
  amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos,
  minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: c.nr, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: c.dpaX, acciones_diluidas: c.acc,
}));

// Balance: ESEF [7] con fondo de comercio, intangibles e inmovilizado (material + derechos de uso) y patrimonio de los RNS.
const BAL = {
  FY2021: { fc: 75.034, int: 2.914, inm: 181.4, pat: 104.687 },
  FY2022: { fc: 75.194, int: 6.600, inm: 216.1, pat: 138.420 },
  FY2023: { fc: 82.048, int: 7.328, inm: 229.1, pat: 147.940 },
  FY2024: { fc: 92.713, int: 7.610, inm: 274.7, pat: 152.205 },
  FY2025: { fc: 92.708, int: 6.628, inm: 308.5, pat: 151.288 },
};
const balance = X.balance.historico.map((b) => {
  const o = { ...b, fondo_comercio: BAL[b.periodo].fc, intangibles: BAL[b.periodo].int, inmovilizado_material: BAL[b.periodo].inm, patrimonio_neto: BAL[b.periodo].pat, deuda_financiera: 0, minoritarios: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const REC = { FY2021: 0, FY2022: 0, FY2023: 0, FY2024: 0.379, FY2025: 15.151 };
const flujos = X.flujos.historico.map((f) => {
  const o = { ...f, desinversiones: f.periodo === 'FY2025' ? 0.08 : 0, recompras: REC[f.periodo], emision_acciones: f.emision_acciones ?? 0, adquisiciones: f.periodo === 'FY2024' ? 13.679 : f.adquisiciones };
  delete o.fin; return o;
});

guarda('A', {
  _estado: 'Completa. Cuentas del ESEF (filings.xbrl.org) comprobadas con los RNS de resultados anuales y semestrales. El ESEF solo trae el coste de los productos vendidos, los gastos de administración sin la amortización de derechos de uso y una amortización parcial: coste de ventas, amortizaciones, EBITDA, fondo de comercio, inmovilizado (material + derechos de uso), patrimonio, recompras y no recurrentes salen de los RNS [2, 5]. FY2026 (cerrado el 30-sep-2026) sin publicar: solo el avance del 7-oct-2026 (ventas, centros y caja neta) [4]. NIIF 16: arrendamientos de los centros en balance (235,1 M a 31-mar-2026).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: 262.952, ebitda: 96.271, ebit: 58.036, beneficio_neto: 33.522, bpa: 0.1985, dpa: 0.137, dpa_extraordinario: 0, fcf: 33.99, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -0.379 },
    cambios_perimetro: [
      { periodo: 'FY2022', descripcion: 'Compra de Teaquinn (Splitsville, 9 centros en Canadá) en mayo de 2022 por 17 M CAD iniciales más un pago variable sobre el EBITDA de FY2026 [5].' },
      { periodo: 'FY2023-FY2024', descripcion: 'Compras de centros independientes en Canadá (7,7 M en FY2023 y 13,7 M en FY2024: Lucky 9, Stoked, Woodlawn y Lincoln) [5].' },
    ],
    comentario: 'Las ventas pasaron de 193,7 M en FY2022 (primer año completo tras el covid) a 250,7 M en FY2025 (+9,0 % anual) y a 261,6 M en FY2026 según el avance (+4,3 %; −1,0 % en centros comparables por el verano más caluroso registrado en el Reino Unido) [4, 2]. El EBITDA NIIF 16 ajustado subió de 77,5 a 91,2 M, pero su margen bajó del 40,0 % al 36,4 % por los salarios (salario mínimo y cotizaciones del empleador) y la energía [2]. El EBIT apenas se mueve (55,4 → 58,2 M) porque la amortización crece con las aperturas y los derechos de uso. No recurrentes (dentro del EBITDA): devolución de IVA en FY2022 (ingreso de 3,7 M), costes de compras y del pago variable de Teaquinn en FY2023-FY2024 y una indemnización de seguros en FY2025 (ingreso de 1,6 M). Los deterioros de centros (0,9-5,3 M al año, 2,8 M en el 1S26) están en amortizaciones: se repiten cada año y no los quitamos del BPA. BPA diluido de 20,14 p en FY2025 (FY2022: 21,78 p con la devolución de IVA). Cuentas del ESEF [7]; antes de FY2021 no se usan (antes de la NIIF 16: FY2019 [10]).',
    ajustes: 'El BPA «ajustado» de la empresa cambió de base en FY2026: ahora es antes de la NIIF 16 (renta en lugar de amortización e intereses de los derechos de uso) y sin partidas ajustadas ni deterioros (BAI ajustado pre-NIIF 16: 49,4 M en FY2025; 32,1 M en el 1S26; consenso de FY2026 51,0 M) [3, 4]. Nuestro BPA es NIIF 16 con los deterioros dentro, unos 2-3 peniques por debajo del ajustado de la empresa.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 119.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 48.3, margen_ebitda_pct: 40.5, bpa: 0.1269, vs_consenso: null },
      { periodo: '2S24', ingresos: 111.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 39.3, margen_ebitda_pct: 35.3, bpa: null, vs_consenso: null },
      { periodo: '1S25', ingresos: 129.2, crecimiento_pct: 8.4, crecimiento_organico_pct: null, ebitda: 49.7, margen_ebitda_pct: 38.5, bpa: 0.1193, vs_consenso: null },
      { periodo: '2S25', ingresos: 121.5, crecimiento_pct: 9.3, crecimiento_organico_pct: null, ebitda: 41.5, margen_ebitda_pct: 34.2, bpa: null, vs_consenso: null },
      { periodo: '1S26', ingresos: 141.5, crecimiento_pct: 9.5, crecimiento_organico_pct: 2.3, ebitda: 54.36, margen_ebitda_pct: 38.4, bpa: 0.1164, vs_consenso: 'En línea' },
      { periodo: '2S26', ingresos: 120.1, crecimiento_pct: -1.1, crecimiento_organico_pct: -4.5, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'Avance anual del 7-oct-2026: ventas de FY2026 de 261,6 M (+4,3 %), comparables −1,0 % (1S +2,3 %, 2S −4,5 %; Reino Unido 2S −5,6 % por el calor), Canadá +9,0 %, 95 centros, caja neta de 13,5 M y BAI ajustado «en línea» con el consenso de 51,0 M (48,0-53,2) [4]. La empresa publica por semestres (1S25 en [6]); los resultados anuales, en diciembre (fecha por confirmar).',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Sin deuda bancaria desde FY2021. Caja de 26,0 M a 31-mar-2026 y caja neta de 13,5 M a 30-sep-2026 tras dividendos, recompras (2,9 M en el 2S) e inversión [3, 4]. Crédito revolving de 25 M con Barclays sin disponer, hasta mayo de 2028 [1].',
    rating: 'Sin calificación crediticia.',
    coste_deuda_pct: 6.0,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos NIIF 16 de los centros: 235,8 M a 30-sep-2025 y 235,1 M a 31-mar-2026 (intereses de 13,7 M en FY2025, ≈ 5,8 %) [2, 3]. Contraprestación contingente de Teaquinn: 4,96 M a 31-mar-2026, calculada sobre el EBITDA de FY2026 con tope de 17 M CAD [3].',
    comentario: 'Balance sin deuda financiera: el único apalancamiento son los alquileres de los centros (≈ 2,5 veces el EBITDA NIIF 16). El patrimonio apenas crece (104,7 → 151,3 M) porque se reparte casi todo el beneficio en dividendos y recompras. El fondo de comercio (92,7 M) viene de la compra de 2014 y de Canadá. Acciones en circulación: 166,6 M a 30-sep-2026 [9].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo (73,5 M en FY2025, ya después de pagar 13,7 M de intereses de arrendamientos) cubre la inversión en centros (36,5 M) y el principal de los alquileres (14,6 M): flujo libre de ≈ 22 M en FY2025 y 34 M en los 12 meses a marzo de 2026 [2, 3]. Con él se pagaron 20,8 M de dividendos y 15,2 M de recompras en FY2025. La inversión total incluye las altas de derechos de uso de los centros nuevos (33,7 M en FY2025), que no pasan por caja pero sí comprometen alquiler [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP hasta FY2025; Ernst & Young LLP desde FY2026 (tras concurso)',
    anios_auditor: 10,
    opinion: 'Limpia (sin salvedades) en FY2025 [1].',
    comentario: 'Cuentas sencillas: ventas al contado en los centros, sin deuda, sin coberturas complejas. Lo que hay que mirar: la empresa ajusta el BPA (deterioros recurrentes, y desde FY2026 una base pre-NIIF 16), y los deterioros de centros se repiten cada año. El cambio de auditor fue por concurso y la declaración de KPMG (s519) no señala nada [1].',
    senales: [
      { senal: 'BPA ajustado frente al publicado', nivel: 'Media', comentario: 'Desde FY2026 el ajustado es pre-NIIF 16 y sin deterioros: 14,51 p en el 1S26 frente a 11,64 p diluido publicado [3].' },
      { senal: 'Deterioros recurrentes', nivel: 'Media', comentario: 'Deterioros de centros todos los años (0,9-5,3 M; 2,8 M en el 1S26): no son extraordinarios [2, 3].' },
      { senal: 'Cambio de auditor', nivel: 'Baja', comentario: 'De KPMG a EY desde FY2026 tras concurso obligatorio; declaración s519 sin asuntos [1].' },
      { senal: 'Margen EBITDA a la baja', nivel: 'Media', comentario: 'Del 40,0 % en FY2022 al 36,4 % en FY2025 por salarios y energía [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades: inversión en centros nuevos y reformas con un retorno objetivo sobre EBITDA del 17-20 % al tercer año, dividendo ordinario de ≈ 50-60 % del beneficio ajustado y devolución del exceso de caja (dividendos especiales en FY2022-FY2023, recompras desde FY2025) [8, 2].',
    adquisiciones: [
      { anio: 'FY2022', objetivo: 'Teaquinn Holdings (Splitsville, 9 boleras en Canadá)', importe: 9.5, ev_ebitda: 9.2, financiacion: 'Caja', resultado: 'Base de Canadá: 15 centros en FY2025, ventas de 38,3 M; pago variable a 9,2 veces el EBITDA pre-NIIF 16 de FY2026 [5, 3].' },
      { anio: 'FY2023', objetivo: 'Boleras independientes en Canadá', importe: 7.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en Splitsville [5].' },
      { anio: 'FY2024', objetivo: 'Lucky 9, Stoked, Woodlawn y Lincoln (Canadá)', importe: 13.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas y reformadas [5].' },
    ],
    comentario: 'Asignación disciplinada: sin deuda, aperturas con objetivos de retorno publicados y reparto del exceso de caja. Las aperturas de los últimos años (Reading, Liverpool, Kanata, Creekside, Edmonton) van «por encima de lo previsto» según la empresa [3]. La caja neta bajó de 56,1 M (FY2022) a 13,5 M (FY2026): el ritmo de aperturas (8 en FY2027) y el dividendo ya consumen casi todo el flujo.',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Reino Unido', descripcion: 'Boleras Hollywood Bowl, AMF y Bowlplex y minigolf Puttstars: 77 centros a 30-sep-2025 (bolos, comida y bebida, máquinas recreativas de vídeo y de premios).', tipo_resultado: 'EBITDA', historico: [{ periodo: 'FY2023', ingresos: 192.609, resultado: 76.828 }, { periodo: 'FY2024', ingresos: 199.696, resultado: 79.715 }, { periodo: 'FY2025', ingresos: 212.410, resultado: 81.336 }] },
      { nombre: 'Canadá', descripcion: 'Splitsville y Striker (fabricación e instalación de equipos de bolera): 15 centros a 30-sep-2025.', tipo_resultado: 'EBITDA', historico: [{ periodo: 'FY2023', ingresos: 22.473, resultado: 5.903 }, { periodo: 'FY2024', ingresos: 30.703, resultado: 7.872 }, { periodo: 'FY2025', ingresos: 38.252, resultado: 9.899 }] },
    ],
    geografias: [{ nombre: 'Reino Unido', peso_pct: 84.1 }, { nombre: 'Canadá', peso_pct: 15.9 }],
    geografias_criterio: 'Ventas de FY2026 según el avance (219,9 y 41,7 M) [4].',
    kpis: [
      { kpi: 'Centros', valor_anterior: '92 (FY2025)', valor_actual: '95 (FY2026)', variacion: '+3 netos', comentario: '8 aperturas en FY2027 hasta 103; objetivo de 130 en 2033 [4].' },
      { kpi: 'Ventas comparables del grupo', valor_anterior: '+1,3 % (FY2025)', valor_actual: '−1,0 % (FY2026)', variacion: '−2,3 puntos', comentario: 'Reino Unido −1,4 % (2S −5,6 % por el calor); Canadá +1,5 % [4].' },
      { kpi: 'Gasto por partida en el Reino Unido', valor_anterior: '11,87 GBP (1S25)', valor_actual: '12,77 GBP (1S26)', variacion: '+7,6 %', comentario: 'Precios, mejor precio en hora punta, pistas VIP y máquinas recreativas; las partidas bajaron algo [3].' },
      { kpi: 'Margen EBITDA ajustado NIIF 16', valor_anterior: '38,0 % (FY2024)', valor_actual: '36,4 % (FY2025)', variacion: '−1,6 puntos', comentario: 'Salarios y energía; 1S26: 38,4 % [2, 3].' },
      { kpi: 'Personal de los centros sobre ventas', valor_anterior: null, valor_actual: '20,8 % (1S26)', variacion: null, comentario: 'Salario mínimo y cotizaciones sumaron ≈ 1 M cada uno en el 1S26 [3].' },
      { kpi: 'Electricidad cubierta', valor_anterior: null, valor_actual: '76 % hasta FY2029', variacion: null, comentario: 'Con un 12 % de placas solares propias [3].' },
    ],
    clientes: 'Clientes particulares (familias, grupos de jóvenes, empresas para eventos): sin concentración. Ventas del 1S26: bolos 44,6 %, comida y bebida 25,9 %, máquinas recreativas 26,7 % (vídeo y premios, no juego de azar), instalación de equipos 1,6 % [3].',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Competitive socialising: el mercado británico de ocio competitivo (más de 800 locales, +58 % desde 2018)', editor: 'Savills Research', tipo: 'Sectorial', fecha: '2026-02-06', url: 'https://www.savills.co.uk/research_articles/229130/388823-0' },
  { id: 2, titulo: 'Annual Report and Accounts 2025: mercado, estrategia, riesgos principales y ESG', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-12-16', url: `${WEB}/5417/6769/7101/HollywoodBowl_AR25_Full_report.pdf` },
  { id: 3, titulo: 'Capital Markets Day: mercado de Canadá (más de 180 boleras, mayoría independientes) y del Reino Unido', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-11-03', url: `${WEB}/4717/6277/3702/Preso_v22_-_FINAL_PRINT_OUT_AND_PLC_WEBSITE_VERSION_v2.pdf` },
  { id: 4, titulo: 'Recommended cash acquisition of Ten Entertainment Group plc by Trive Capital (Tenpin)', editor: 'Ten Entertainment Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2023-12-06', url: 'https://www.investegate.co.uk/announcement/rns/ten-entertainment-group--teg/recommended-cash-acquisition/7924102' },
  { id: 5, titulo: 'Interim results H1 FY2026: comparables, gasto por partida, costes, energía, Canadá', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2026-05-27', url: `${WEB}/5717/7986/4494/Combined_with_FIN_statements_FINAL.pdf` },
  { id: 6, titulo: 'Dave & Buster\'s to acquire Main Event (8-K, presentación)', editor: 'Dave & Buster\'s Entertainment (SEC)', tipo: 'Primaria', fecha: '2022-04-06', url: 'https://www.sec.gov/Archives/edgar/data/1525769/000110465922042998/tm2210601d1_ex99-1.htm' },
  { id: 7, titulo: 'Yahoo Finance quoteSummary de comparables (Lucky Strike, Dave & Buster\'s, Cineplex, The Gym Group)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/BOWL.L/' },
  { id: 8, titulo: 'Trading Statement – Year Ended 30 September 2026', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-10-07', url: `${INV}/trading-statement-year-ended-30-september-2026/9809896` },
];
guarda('B', {
  _estado: 'Completa con huecos de tamaño de mercado: no hay estadística oficial del mercado de boleras del Reino Unido ni de Canadá; se usan el recuento de locales de Savills y los datos de la empresa. Competidores casi todos privados (Tenpin desde 2024).',
  sector: {
    definicion: 'Ocio de proximidad bajo techo de precio asequible: boleras con comida, bebida y máquinas recreativas, minigolf y otras actividades («competitive socialising»), en el Reino Unido y Canadá. Excluye cines, gimnasios y pubs, que compiten por el mismo gasto de ocio.',
    tamano: 'Sin cifra oficial. Savills cuenta más de 800 locales de ocio competitivo en el Reino Unido (+58 % desde 2018) y prevé ≈ 1.100 a final de la década; las cadenas con marca tienen más de 500 [1]. Hollywood Bowl estima ser el mayor operador de boleras en ambos países; en Canadá hay más de 180 boleras, la mayoría independientes [3].',
    unidad_serie: null,
    serie: [],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Reino Unido: dos cadenas grandes de boleras (Hollywood Bowl, 77-79 centros; Tenpin, ≈ 50-60, privada desde 2024) y muchas marcas pequeñas de ocio competitivo (Lane7, Puttshack, Flight Club, Boom, Superbowl). Canadá: fragmentado, con Splitsville (Hollywood Bowl) como mayor cadena con marca y Rec Room (Cineplex) en ocio mixto [1, 3, 4].',
    drivers: [
      { driver: 'Gasto de ocio de las familias británicas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los comparables del Reino Unido pasaron de +2,6 % en el 1S26 a −5,6 % en el 2S por el calor; el gasto por partida subió un 7,6 % con menos partidas [5, 8].' },
      { driver: 'Ocio asequible frente a alternativas caras', efecto: '+', horizonte: 'Estructural', evidencia: 'Una partida familiar cuesta menos que cine con comida o parques; la empresa mantuvo la demanda en 2022-2024 con inflación alta [2].' },
      { driver: 'Salario mínimo y cotizaciones del empleador', efecto: '−', horizonte: 'Estructural', evidencia: 'Sumaron ≈ 1 M cada uno en el 1S26 y restaron 1 punto de margen bruto; el personal de los centros es el 20,8 % de las ventas [5].' },
      { driver: 'Energía', efecto: '−', horizonte: 'Cíclico', evidencia: '76 % de la electricidad cubierta hasta FY2029, un 12 % con placas solares propias [5].' },
      { driver: 'Expansión en Canadá y nuevas aperturas', efecto: '+', horizonte: 'Estructural', evidencia: 'Canadá +9,0 % en FY2026; objetivo de 35 centros en 2032 (15 en FY2025) y 130 en el grupo en 2033 [8, 5].' },
      { driver: 'Tiempo y clima', efecto: '−', horizonte: 'Cíclico', evidencia: 'Verano de 2026 el más caluroso registrado en el Reino Unido: comparables del 2S −5,6 % [8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Una cadena rival grande (Tenpin) y muchos formatos nuevos de ocio competitivo que abren en los mismos parques comerciales [1, 4].' },
      { fuerza: 'Amenaza de nuevos entrantes', intensidad: 3, justificacion: 'Una bolera cuesta ≈ 3-5 M de inversión y necesita un local grande; los formatos nuevos (minigolf, dardos, karts) entran con menos capital [1, 3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Los propietarios de los locales (alquileres a 15-25 años) y los fabricantes de equipos (Striker es de Hollywood Bowl; QubicaAMF y Brunswick); la energía está cubierta [2, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes particulares, sin poder individual, pero sensibles al precio: el ocio es gasto discrecional [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Compite por el mismo gasto con cines, restaurantes, pubs, ocio en casa (consolas, plataformas) y actividades al aire libre cuando hace buen tiempo [8].' },
    ],
    ciclo: { posicion: 'Desaceleración', comentario: 'El consumo británico está débil (subida de impuestos, empleo flojo) y el gasto de ocio aguanta en precio pero no en volumen: el gasto por partida sube y las partidas bajan [5]. En 2008-2009 las boleras con precio asequible resistieron mejor que el ocio caro, según la empresa [2]. Canadá crece por aperturas y sus comparables mejoran (+2,7 % en el 2S26) [8].' },
    regulacion: 'Licencias de bebidas alcohólicas y de máquinas recreativas (en el Reino Unido, máquinas de premio de categoría D y vídeo, no juego de azar). Salario mínimo (National Living Wage, subida por encima de la inflación en abril de 2026) y cotizaciones del empleador (subidas en abril de 2025). Tarifas municipales («business rates»): reforma de 2026 con tipos menores para ocio y hostelería [2, 5].',
    tendencias: 'Auge de las «salidas con actividad» frente a las salidas solo a comer o beber; reservas por internet con precios dinámicos; más peso de máquinas recreativas y comida en el gasto; cierre de grandes almacenes que deja locales grandes y baratos para boleras (Reading en un antiguo John Lewis) [1, 5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Mayor operador de boleras del Reino Unido y de Canadá por número de centros (77 + 15 en FY2025; 95 en FY2026) [2, 8].',
    competidores: [
      { nombre: 'Tenpin (Ten Entertainment Group)', pais: 'Reino Unido', ticker: null, ingresos: 126.7, cuota_pct: null, margen_ebit_pct: null, comentario: '≈ 50-60 centros; comprada por Trive Capital en 2023-2024 por 287 M (7,3 veces el EBITDA tras renta) [4].' },
      { nombre: 'Lucky Strike Entertainment (antes Bowlero)', pais: 'EE. UU.', ticker: 'LUCK', ingresos: 932.6, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor operador de boleras del mundo (≈ 360 centros en Norteamérica, algunos en Canadá); ventas de 1.245 M USD; muy endeudado [7].' },
      { nombre: 'Dave & Buster\'s y Main Event', pais: 'EE. UU.', ticker: 'PLAY', ingresos: 1558.9, cuota_pct: null, margen_ebit_pct: null, comentario: 'Restaurante con máquinas recreativas y bolera (Main Event); ventas de 2.081 M USD; compró Main Event en 2022 a ≈ 9 veces el EBITDA [6, 7].' },
      { nombre: 'Rec Room (Cineplex)', pais: 'Canadá', ticker: 'CGX.TO', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ocio mixto (juegos, comida, espectáculos) dentro de Cineplex (ventas totales de 1.358 M CAD) [7].' },
      { nombre: 'Formatos de ocio competitivo (Lane7, Puttshack, Flight Club, Boom)', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privados; más caros y de centro urbano; compiten por los mismos locales y el mismo gasto de grupo [1].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Escala y marca', puntuacion: 3, evidencia: 'Mayor cadena en dos países; compras, marketing digital y precios dinámicos a escala; margen EBITDA del 36 % (NIIF 16) [2, 5].' },
        { fuente: 'Ubicaciones', puntuacion: 3, evidencia: 'Locales grandes en parques de ocio con alquileres largos; pocos locales adecuados por ciudad [2].' },
        { fuente: 'Costes', puntuacion: 2, evidencia: 'Striker propio abarata las aperturas y reformas; energía cubierta hasta FY2029 [5].' },
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay red: cada centro compite en su zona [2].' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'El cliente cambia de ocio sin coste [2].' },
      ],
    },
    amenazas: 'Las aperturas de ocio competitivo (más de 800 locales en el Reino Unido) y la competencia por el gasto de las familias; en Canadá, Lucky Strike si decide crecer allí. El clima: un verano caluroso resta visitas a todo el ocio bajo techo [1, 8].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Hollywood Bowl Group explota 95 centros de ocio (boleras con comida, bebida y máquinas recreativas, y minigolf) en el Reino Unido (marcas Hollywood Bowl, AMF, Bowlplex, Puttstars) y en Canadá (Splitsville), y en Canadá fabrica e instala equipos de bolera (Striker) [2, 8].',
    como_gana_dinero: 'Cobra por partida (44,6 % de las ventas), por comida y bebida (25,9 %) y por máquinas recreativas (26,7 %), con precios dinámicos por hora y día. El 70 % de las ventas no tiene coste de mercancía, así que el margen bruto es del 63 %; los costes fijos son el alquiler (en la NIIF 16, amortización e intereses), el personal (≈ 21 % de las ventas) y la energía. Crece abriendo 4-8 centros al año y reformando los antiguos [5, 2].',
  },
  huecos: [],
  fuentes: fB,
});

// ---------------------------------------------------------------- C. Directivos y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025: consejo, comisiones, informe de remuneración, accionistas significativos', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-12-16', url: `${WEB}/5417/6769/7101/HollywoodBowl_AR25_Full_report.pdf` },
  { id: 2, titulo: 'Result of AGM (29-ene-2026): votos de cada resolución', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-01-29', url: `${INV}/result-of-agm/9393668` },
  { id: 3, titulo: 'Director/PDMR Shareholding (RNS de enero a septiembre de 2026)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-09-29', url: `${INV}/director-pdmr-shareholding/9796953` },
  { id: 4, titulo: 'Holding(s) in Company (RNS de enero a octubre de 2026)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/holding-s-in-company/9816818` },
  { id: 5, titulo: 'Directorate Change: nombramiento de Simon Dodd y consejero delegado de Canadá', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-09-25', url: `${INV}/directorate-change/9790285` },
  { id: 6, titulo: 'Change of Auditor (EY sustituye a KPMG desde FY2026)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-03-16', url: `${INV}/change-of-auditor/9476132` },
  { id: 7, titulo: 'Avances anuales FY2025 y FY2026 y resultados FY2023-FY2025 (cumplimiento de previsiones)', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2026-10-07', url: `${INV}/trading-statement-year-ended-30-september-2026/9809896` },
  { id: 8, titulo: 'Interim results H1 FY2026: cambio de director financiero (Antony Smith desde el 2-feb-2026)', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2026-05-27', url: `${WEB}/5717/7986/4494/Combined_with_FIN_statements_FINAL.pdf` },
];
guarda('C', {
  _estado: 'Completa. Consejo y remuneración del informe anual FY2025; operaciones de directivos y participaciones de los RNS de 2026. La empresa no da guía numérica: dice si el año va «en línea con las expectativas» del consenso que ella misma recopila.',
  directivos: {
    equipo: [
      { nombre: 'Stephen Burns', cargo: 'Consejero delegado', desde: '2014', participacion_pct: 1.94, trayectoria: 'Director de operaciones desde 2014 y consejero delegado desde 2016 (antes en Mitchells & Butlers y Whitbread). Con él el grupo pasó de 54 a 95 centros, entró en Canadá y salió del covid sin deuda [1].' },
      { nombre: 'Antony Smith', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'Director financiero desde el 2-feb-2026; Laurence Keen, director financiero desde 2014, pasó a consejero delegado de Canadá con un mandato de seis meses [8].' },
      { nombre: 'Darryl Lewis', cargo: 'Consejero delegado de Canadá', desde: '2026', participacion_pct: null, trayectoria: 'Desde el 1-nov-2026, tras el periodo de Keen [5].' },
      { nombre: 'Mat Hart', cargo: 'Director de desarrollo de negocio', desde: null, participacion_pct: null, trayectoria: 'Lleva las aperturas y los locales; vendió 40.000 acciones en julio de 2026 [3].' },
      { nombre: 'Melanie Dickinson', cargo: 'Directora de personas', desde: null, participacion_pct: null, trayectoria: 'Recursos humanos; premios de mejor empresa para trabajar [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2023', guia: 'En línea con las expectativas del mercado', real: 'Ventas récord de 215,1 M; BAI ajustado de 47,8 M', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'En línea con las expectativas del mercado', real: 'Ventas de 230,4 M; BAI ajustado de 45,0 M (−5,2 %)', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: 'EBITDA en línea con el consenso (ventas de 248,0 M)', real: 'Ventas de 250,7 M; EBITDA ajustado de 91,2 M', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'BAI ajustado en línea con el consenso de 51,0 M (48,0-53,2)', real: 'Ventas de 261,6 M; BAI pendiente (diciembre)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y con experiencia en ocio: el consejero delegado lleva 12 años y tiene ≈ 3,2 M de acciones (≈ 8,9 M GBP). El cambio de director financiero en 2026 se hizo ordenado (Keen pasó a Canadá). La empresa no da cifras de guía: dice si va en línea con el consenso; en FY2024 el beneficio cayó pese a ventas récord [7].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Darren Shapland', cargo: 'Presidente', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos' },
      { nombre: 'Stephen Burns', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2016', comisiones: null },
      { nombre: 'Antony Smith', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2026', comisiones: null },
      { nombre: 'Melanie Dickinson', cargo: 'Directora de personas', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Rachel Addison', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Ivan Schofield', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Remuneración' },
      { nombre: 'Julia Porter', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración' },
      { nombre: 'Asheeka Hyde', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Simon Dodd', cargo: 'Consejero (desde el 1-nov-2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: true,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: true,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: false,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 1,
    voto_remuneracion_pct: 92.63,
    voto_remuneracion_contra_pct: 7.36,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 1.719, fijo: 0.533, variable_corto: 0.451, variable_largo: 0.735, ratio_salario_medio: 74 },
    remuneracion: 'Consejero delegado: 1,72 M GBP en FY2025 (fijo 0,53; variable anual 0,45; plan a largo plazo 0,74). El plan a largo plazo de FY2026 mide el BPA ajustado (70 %), la rentabilidad para el accionista (10 %), el retorno del capital de los centros (10 %) y el carbono (10 %) [1]. El informe de remuneración tuvo un 92,6 % a favor en la junta del 29-ene-2026 [2].',
    accionistas: [
      { nombre: 'FMR (Fidelity)', pct: 5.66, tipo: 'Institucional', variacion: 'Informe anual FY2025' },
      { nombre: 'Schroders', pct: 5.44, tipo: 'Institucional', variacion: 'Informe anual FY2025' },
      { nombre: 'JPMorgan Asset Management', pct: 5.23, tipo: 'Institucional', variacion: 'Informe anual FY2025' },
      { nombre: 'BlackRock', pct: 5.17, tipo: 'Institucional', variacion: 'Superó el 5 % en octubre de 2026' },
      { nombre: 'Columbia Threadneedle', pct: 5.12, tipo: 'Institucional', variacion: 'Informe anual FY2025' },
      { nombre: 'Aberforth Partners', pct: 5.095, tipo: 'Institucional', variacion: 'Superó el 5 % en enero de 2026' },
      { nombre: 'Aberdeen', pct: null, tipo: 'Institucional', variacion: 'Del 10 % (dic-2025) a menos del 5 % (feb-2026): vendedor' },
    ],
    insiders: [
      { fecha: '2026-07-27', persona: 'Mat Hart (director de desarrollo)', operacion: 'Venta', acciones: 40000, importe: 0.115 },
      { fecha: '2026-05-29', persona: 'Ivan Schofield (consejero)', operacion: 'Venta', acciones: 89991, importe: 0.277 },
      { fecha: '2026-02-06', persona: 'Directivos (plan a largo plazo, ventas para pagar impuestos)', operacion: 'Venta', acciones: 303326, importe: 0.787 },
      { fecha: '2026-01', persona: 'Asheeka Hyde (consejera)', operacion: 'Compra', acciones: 1000, importe: 0.003 },
    ],
    control_y_defensas: 'Sin accionista de control: capital repartido entre fondos británicos y estadounidenses (ocho por encima del 5 % a finales de 2025). Una acción, un voto. Sin blindajes; sujeta al código de adquisiciones británico [1, 4].',
    alertas: [
      'Ventas de directivos en 2026 (≈ 1,2 M GBP) y ninguna compra relevante.',
      'Aberdeen pasó del 10 % a menos del 5 % entre diciembre de 2025 y febrero de 2026.',
      'Cambio de director financiero y de auditor en el mismo ejercicio (FY2026).',
    ],
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fC,
});

// ---------------------------------------------------------------- D. Mercado, consenso y comparables
const fD = [
  { id: 1, titulo: 'Yahoo Finance: históricos diarios de BOWL.L, FTSE 250 (^FTMC) y Vanguard FTSE 250 (VMID.L), hasta el 16-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/BOWL.L/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de BOWL.L y comparables (precio, capitalización, VE, EBITDA, consenso, recomendaciones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/BOWL.L/analysis/' },
  { id: 3, titulo: 'Trading Statement – Year Ended 30 September 2026 (consenso recopilado por la empresa: BAI ajustado de 51,0 M)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-10-07', url: `${INV}/trading-statement-year-ended-30-september-2026/9809896` },
  { id: 4, titulo: 'Bank of England: rendimiento del gilt a 10 años (serie IUDMNPY), hasta el 15-oct-2026', editor: 'Bank of England', tipo: 'Estadística oficial', fecha: '2026-10-15', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Académica', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/' },
  { id: 6, titulo: 'Recommended cash acquisition of Ten Entertainment Group plc by Trive Capital', editor: 'Ten Entertainment Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2023-12-06', url: 'https://www.investegate.co.uk/announcement/rns/ten-entertainment-group--teg/recommended-cash-acquisition/7924102' },
  { id: 7, titulo: 'Dave & Buster\'s to acquire Main Event (8-K)', editor: 'Dave & Buster\'s Entertainment (SEC)', tipo: 'Primaria', fecha: '2022-04-06', url: 'https://www.sec.gov/Archives/edgar/data/1525769/000110465922042998/tm2210601d1_ex99-1.htm' },
  { id: 8, titulo: 'Interim results H1 FY2026 (resultados del 27-may-2026; dividendo a cuenta)', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2026-05-27', url: `${WEB}/5717/7986/4494/Combined_with_FIN_statements_FINAL.pdf` },
  { id: 9, titulo: 'Result of AGM y dividendo final de FY2025 (9,18 p, ex-dividendo el 29-ene-2026)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-01-29', url: `${INV}/result-of-agm/9393668` },
  { id: 10, titulo: 'Hollywood Bowl confident after «resilient» 2026, on track for growth', editor: 'AJ Bell (Alliance News)', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.ajbell.co.uk/news/articles/hollywood-bowl-confident-after-resilient-2026-track-growth' },
  { id: 11, titulo: 'Director/PDMR Shareholding y Holding(s) in Company (RNS de 2026)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/holding-s-in-company/9816818` },
  { id: 12, titulo: 'Final results FY2025 (16-dic-2025) y Capital Markets Day (3-nov-2025)', editor: 'Hollywood Bowl Group plc', tipo: 'Primaria', fecha: '2025-12-16', url: `${WEB}/7617/6587/6921/FINAL_RNS_FOR_LOADING_12.45pm_15.12.pdf` },
  { id: 13, titulo: 'Share Buyback Programme (2,9 M GBP en el 2S26)', editor: 'Hollywood Bowl Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-06-01', url: `${INV}/share-buyback-programme-/9645699` },
];
const b = Y['BOWL.L'];
const fx = { GBp: 0.01, GBP: 1, USD: 1 / Y['GBPUSD=X'].precio, CAD: 1 / Y['GBPCAD=X'].precio, EUR: 1 / Y['GBPEUR=X'].precio };
const comp = (t, nombre, pais) => {
  const q = Y[t]; const k = q.divisa === 'GBp' ? 1 : fx[q.divisa];
  const tr = (q.trend || []).find((x) => x.periodo === '+1y') || {};
  return {
    nombre, ticker: t, pais, capitalizacion: r1(q.cap / 1e6 * k), ev_ventas: r2(q.ev / q.ventas), ev_ebitda_ltm: r1(q.ev / q.ebitda), ev_ebitda_ntm: null,
    per_ntm: q.per_adelantado > 0 ? r1(q.per_adelantado) : null, crecimiento_pct: tr.crec_ventas != null ? r1(tr.crec_ventas * 100) : null,
    margen_ebitda_pct: r1(q.ebitda / q.ventas * 100), roic_pct: null, dn_ebitda: r1((q.ev - q.cap) / q.ebitda), fcf_yield_pct: null,
  };
};
const empresas = [
  comp('YNGA.L', 'Young & Co.\'s Brewery', 'GB'), comp('FSTA.L', 'Fuller, Smith & Turner', 'GB'), comp('JDW.L', 'J D Wetherspoon', 'GB'),
  comp('MAB.L', 'Mitchells & Butlers', 'GB'), comp('GYM.L', 'The Gym Group', 'GB'), comp('CGX.TO', 'Cineplex (Rec Room)', 'CA'),
  comp('BFIT.AS', 'Basic-Fit', 'NL'), comp('XPF.L', 'XP Factory (Boom, Escape Hunt)', 'GB'),
];
const perComp = empresas.filter((e) => !['GYM.L', 'XPF.L'].includes(e.ticker)).map((e) => e.per_ntm).sort((x, y) => x - y);
const medPer = r1((perComp[2] + perComp[3]) / 2);
const cierres = B.cierres_ejercicio.filter((c) => +c.anio.slice(2) >= 2021);
const PERADEL = { FY2021: 11.9, FY2022: 8.8, FY2023: 13.2, FY2024: 15.2, FY2025: 12.9 };
guarda('D', {
  _estado: 'Completa. Precio del informe: 2,755 GBP (275,5 GBp), cierre del 19-oct-2026 (cierre previo de Yahoo a las 07:56 UTC del 20-oct; la serie diaria aún no traía el del 19-oct) [2]. Consenso de Yahoo en la base ajustada pre-NIIF 16 de la empresa.',
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'Hollywood Bowl Group plc', nombre_corto: 'Hollywood Bowl', ticker: 'BOWL', isin: 'GB00BD0NVK62',
    mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 250', pais: 'Reino Unido', pais_iso: 'GB',
    sector: 'Consumo discrecional', industria: 'Ocio: boleras y minigolf', sede: 'Hemel Hempstead (Reino Unido)', fundacion: '2014 (holding actual; boleras desde 1988)',
    empleados: null, web: 'https://www.hollywoodbowlgroup.com', precio: 2.755, fecha_precio: '2026-10-19', acciones: 166.6,
    capitalizacion_publicada: r1(b.cap / 1e6), free_float_pct: 95.8, max_52s: 3.125, min_52s: 2.275,
    volumen_medio_diario: '≈ 1,6 M GBP/día (618.720 acciones, 3 meses)', proximos_resultados: '2026-12',
  },
  consenso: {
    guidance: 'Sin guía numérica. En el avance del 7-oct-2026 la empresa espera un BAI ajustado de FY2026 en línea con el consenso que recopila (51,0 M de media de 8 analistas, 48,0-53,2), en su nueva base pre-NIIF 16 (renta en lugar de amortización e intereses de los derechos de uso, sin partidas ajustadas ni deterioros); FY2025 en esa base: 49,4 M [3, 12]. Para FY2027: 8 aperturas (95 → 103 centros) [3].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: r1(b.trend[2].ventas / 1e6), ebitda: null, ebit: null, bpa: b.trend[2].bpa, dpa: null, fuente: 'Yahoo Finance, 8 analistas (BPA ajustado pre-NIIF 16) [2]' },
      { periodo: 'FY2027e', ingresos: r1(b.trend[3].ventas / 1e6), ebitda: null, ebit: null, bpa: b.trend[3].bpa, dpa: null, fuente: 'Yahoo Finance, 8 analistas (BPA ajustado pre-NIIF 16) [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: 8, mantener: 0, vender: 0, po_medio: 3.89, po_min: 3.40, po_max: 4.50 },
    revisiones: `Revisiones a la baja leves: el BPA de FY2026 pasó de 22,99 p hace 90 días a 22,47 p y el de FY2027 de 24,59 p a 24,42 p, por el calor del verano [2]. Los 8 analistas recomiendan comprar (1 compra fuerte), con un objetivo medio de 389 p (340-450), un 41 % sobre el precio [2]. El consenso de ventas de FY2027 (290,6 M, +11 %) supone aperturas rápidas y comparables positivos.`,
    base_ebitda: 'NIIF',
    ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción apenas se ha movido en cinco años (+3,6 % anual de precio, más un dividendo de ≈ 5 %), por debajo del FTSE 250 en uno y tres años. Subió un 15 % el día de los resultados del 1S26 (27-may) hasta 312,5 p y cayó un 27 % hasta 246,5 p (6-oct) con el calor del verano, que hundió los comparables del Reino Unido en el 2S; el avance anual (7-oct) la devolvió a ≈ 264 p y hoy cotiza a 275,5 p [1, 10]. Beta baja (0,52 mensual; 0,85 ajustada semanal): se mueve por el consumo británico y el clima más que por el mercado.',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 12.4, var_3m_pct: -5.0, var_6m_pct: 3.2, var_12m_pct: -0.2, dist_max_52s_pct: -10.4, dist_min_52s_pct: 17.5, dist_max_historico_pct: -21.4, tendencia: 'lateral', volatilidad_60d_pct: 28, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'may-jun 2026', var_pct: 21.1, causa: 'Resultados del 1S26 (27-may): ventas +9,5 %, BAI ajustado +8,1 %, BPA ajustado +11,3 % y confianza en el año; +15,4 % ese día [8].', veredicto: 'no cambia', condicion: null },
        { periodo: '2026-01-29', var_pct: -5.3, causa: 'Ex-dividendo final de 9,18 p el día de la junta: caída mecánica [9].', veredicto: 'no cambia', condicion: null },
        { periodo: '2026-09-07/08', var_pct: -11.4, causa: 'Dos días seguidos de −6,0 % y −5,7 % sin nota de la empresa; causa concreta no encontrada en tres búsquedas (RNS de septiembre, AJ Bell, AskTraders): la explicación probable es el miedo al cierre del ejercicio por el calor, que el avance del 7-oct confirmó (comparables del 2S −5,6 %) [3, 10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 12.4, causa: 'El avance anual (7-oct) confirma el BAI en línea con el consenso pese al calor: +7,1 % en la apertura (264 p) y +3,9 % al cierre; BlackRock supera el 5 % (13-oct) [3, 10, 11].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-07', tipo: 'resultados', hecho: 'Avance de FY2026: ventas de 261,6 M (+4,3 %), comparables −1,0 % (2S Reino Unido −5,6 % por el calor), BAI ajustado en línea con el consenso de 51,0 M, caja neta de 13,5 M y 8 aperturas en FY2027 [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-13', tipo: 'accionista de referencia', hecho: 'BlackRock supera el 5 % del capital (5,17 %) [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-25', tipo: 'directivos', hecho: 'Simon Dodd entra en el consejo el 1-nov-2026; Darryl Lewis, consejero delegado de Canadá desde el 1-nov [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-27', tipo: 'directivos', hecho: 'Mat Hart (director de desarrollo) vende 40.000 acciones a 288,6 p; en mayo el consejero Ivan Schofield vendió 89.991 a 308,1 p [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-01', tipo: 'resultados', hecho: 'Programa de recompra de 2,9 M GBP en el 2S26, completado [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-27', tipo: 'resultados', hecho: 'Resultados del 1S26: ventas +9,5 %, comparables +2,3 %, BAI ajustado +8,1 %, salario mínimo y cotizaciones ≈ 1 M cada uno, 76 % de la electricidad cubierta hasta FY2029 [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-16', tipo: 'demanda o regulador', hecho: 'Cambio de auditor: EY sustituye a KPMG desde FY2026 tras concurso [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-04', tipo: 'accionista de referencia', hecho: 'Aberdeen baja del 10 % (dic-2025) a menos del 5 % (feb-2026); Aberforth sube por encima del 5 % [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-12-16', tipo: 'resultados', hecho: 'Resultados de FY2025: ventas de 250,7 M (+8,8 %), BAI ajustado pre-NIIF 16 de 49,4 M (−7,5 %) por salarios y energía [12].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-12-15',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'El precio está en la mitad de su rango de 52 semanas (−10 % del máximo, +18 % del mínimo), con tendencia lateral. Las caídas fuertes tienen causa (dividendo) o se explican por el calor del verano, ya confirmado y descontado en el avance del 7-oct; no hay colocaciones, ampliaciones, litigios ni ofertas. Los resultados anuales llegan en diciembre (fecha por confirmar; estimamos mediados de mes, como en 2024 y 2025): el riesgo es que la guía de FY2027 incluya los nuevos costes salariales de abril de 2027. Nada de esto cambia la recomendación.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: cierres.map((c) => ({ anio: c.anio, precio_cierre: r2(c.precio_cierre / 100), ev_ebitda_ntm: null, per_ntm: PERADEL[c.anio] ?? null, excluir: false })),
    comentario: 'PER adelantado en nuestra base (NIIF 16 con deterioros): precio de cierre a 30 de septiembre ÷ BPA real del ejercicio siguiente (FY2025 ÷ nuestro FY2026e de ≈ 19,5 p). Mediana de cinco años 12,9 veces, mínimo 8,8 (septiembre de 2022, crisis de energía y consumo), media 12,4. Antes de FY2021 no sirve: antes de la NIIF 16 (hasta FY2019) y el covid (FY2020-FY2021) [1, 12].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Ocio y hostelería británicos cotizados con locales en alquiler (pubs de Young\'s, Fuller\'s, Wetherspoon y Mitchells & Butlers; gimnasios de The Gym Group), ocio bajo techo (XP Factory, Cineplex con Rec Room) y gimnasios europeos (Basic-Fit). No hay otra bolera cotizada en Europa; Lucky Strike y Dave & Buster\'s (EE. UU., US GAAP, en pérdidas o con mucha deuda) quedan fuera del múltiplo. Datos de Yahoo del 20-oct-2026 [2]; el VE de Yahoo incluye los arrendamientos en la mayoría de los británicos.',
    empresas,
    comentario: `Mediana del PER adelantado de ${medPer} veces sin The Gym Group (31,9, beneficio en recuperación) ni XP Factory (23,6, microcapitalización) [2]. Hollywood Bowl cotiza a 11,3 veces el BPA ajustado del consenso de FY2027 y a 9,2 veces el EBITDA de los últimos 12 meses (VE de 669 M con arrendamientos), por debajo de la mediana pese a tener el mayor margen (36 % NIIF 16) y caja neta: el mercado descuenta el consumo británico.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2023-12', objetivo: 'Ten Entertainment Group (Tenpin, ≈ 50 boleras en el Reino Unido)', comprador: 'Trive Capital', ev: 282, ev_ventas: null, ev_ebitda: 7.9, prima_pct: null, excluir: false, comentario: '412,5 p por acción (287 M de capital, caja neta de 5,1 M): 7,3 veces el EBITDA tras renta; ≈ 7,9 veces en base NIIF 16 de Hollywood Bowl [6].' },
      { fecha: '2022-04', objetivo: 'Main Event (boleras y ocio, EE. UU.)', comprador: 'Dave & Buster\'s', ev: 640, ev_ventas: null, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: 'VE de 835 M USD, ≈ 9 veces el EBITDA ajustado (US GAAP, sin alquileres en la deuda) [7].' },
      { fecha: '2022-05', objetivo: 'Teaquinn (Splitsville, Canadá)', comprador: 'Hollywood Bowl', ev: 9.5, ev_ventas: null, ev_ebitda: 9.2, prima_pct: null, excluir: true, comentario: '17 M CAD iniciales; pago variable a 9,2 veces el EBITDA pre-NIIF 16 de FY2026: compra pequeña y en reforma [12].' },
    ],
    comentario: 'Pocas operaciones comparables: Tenpin, el rival directo, se vendió a 7,3 veces el EBITDA tras renta (≈ 7,9 en base NIIF 16) a finales de 2023, en un mercado de consumo débil. Main Event, en EE. UU., a ≈ 9 veces. Referencia de 8-9 veces el EBITDA NIIF 16 para un control.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'causa de la caída del 7-8 de septiembre de 2026', tipo: 'Complemento', intentos: '1) RNS de la empresa de septiembre (solo derechos de voto y cambio de consejo); 2) AJ Bell/Alliance News; 3) AskTraders y titulares de Investegate', decision: 'Se explica como miedo al calor del verano, confirmado el 7-oct, sin causa concreta' },
    { seccion: 'consenso', campo: 'EBITDA y BPA de FY2028e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo FY2026 y FY2027); 2) MarketScreener (no abre la página del valor); 3) AJ Bell (solo noticias)', decision: 'Omitido' },
  ],
  fuentes: fD,
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Hollywood Bowl Record Revenue Masks Weaker Second Half as Heat Bites', editor: 'AskTraders', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.asktraders.com/analysis/hollywood-bowl-record-revenue-masks-weaker-second-half-as-heat-bites/' },
  { id: 2, titulo: 'Hollywood Bowl confident after «resilient» 2026, on track for growth', editor: 'AJ Bell (Alliance News)', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.ajbell.co.uk/news/articles/hollywood-bowl-confident-after-resilient-2026-track-growth' },
  { id: 3, titulo: 'Yahoo Finance: recomendaciones y objetivos de 8 analistas', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/BOWL.L/analysis/' },
];
guarda('E', {
  _estado: 'Parcial: poca conversación pública. Stocktwits no tiene el símbolo, Reddit no abre desde aquí y los foros británicos (ADVFN, LSE) piden sesión. Se usan prensa financiera y analistas.',
  sentimiento: {
    tono: 'Neutro',
    tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'AskTraders', fecha: '2026-10', n_comentarios: 1, tono: 'Neutro', resumen: 'Ventas récord pero segundo semestre en caída por el calor; las ventas quedan un 2,7 % por debajo del consenso de 268,9 M y la atención está en si se mantiene la guía de beneficio [1].' },
      { plataforma: 'AJ Bell / Alliance News', fecha: '2026-10', n_comentarios: 1, tono: 'Positivo', resumen: '«Resiliente»: la acción sube un 7,1 % en la apertura con el beneficio en línea y 8 aperturas en FY2027 [2].' },
      { plataforma: 'Analistas (Yahoo)', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: '8 de 8 recomiendan comprar, objetivo medio de 389 p; BPA de FY2026 y FY2027 recortado ≈ 1-2 % en 90 días [3].' },
    ],
    temas: [
      { tema: 'El calor del verano como algo puntual', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto en parte: el clima no es estructural, pero el 1S26 ya tenía partidas a la baja y el precio sostenía las ventas [1].' },
      { tema: 'Crecimiento por aperturas (130 centros en 2033, Canadá 35 en 2032)', postura: 'Alcista', peso: 'Medio', contraste: 'El plan es creíble (ritmo de 4-8 al año, sin deuda) pero consume casi todo el flujo libre [2].' },
      { tema: 'Consumo británico débil y costes salariales', postura: 'Bajista', peso: 'Medio', contraste: 'El margen bajó 3,6 puntos en tres años; el salario mínimo sube otra vez en abril de 2027 [1].' },
    ],
    lectura: 'Poca conversación y tono neutro a positivo: los analistas son unánimemente compradores y la prensa trató el avance como un alivio. No hay euforia ni pánico; la acción está a mitad de su rango.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: fE,
});
console.log('Notas A-E escritas. Mediana PER comparables:', medPer);
