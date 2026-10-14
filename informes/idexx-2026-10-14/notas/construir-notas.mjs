// Escribe las notas A-E de IDEXX Laboratories (corte 2026-10-14) a partir del XBRL de la SEC (cuentas-xbrl.json),
// de los documentos descargados en notas/docs (10-K 2025, 10-Q 2T26, notas de prensa 4T25-2T26, proxy 2026, 8-K, Investor Day 2026)
// y de bolsa.json. Cada nota cita con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const ANIOS = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'IDEXX Laboratories, Form 10-K del ejercicio 2025 (cuentas, notas de deuda, segmentos, arrendamientos, litigios)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-20', url: 'https://www.sec.gov/Archives/edgar/data/874716/000087471626000038/idxx-20251231.htm' },
  { id: 2, titulo: 'IDEXX Laboratories Announces Second Quarter Results (8-K, anexo 99.1)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/874716/000110465926090033/tm2622041d1_ex99-1.htm' },
  { id: 3, titulo: 'IDEXX Laboratories Announces First Quarter Results (8-K, anexo 99.1)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-05', url: 'https://www.sec.gov/Archives/edgar/data/874716/000110465926055203/tm2613510d1_ex99-1.htm' },
  { id: 4, titulo: 'IDEXX Laboratories Announces Fourth Quarter and Full Year 2025 Results (8-K, anexo 99.1)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-02', url: 'https://www.sec.gov/Archives/edgar/data/874716/000110465926008904/tm264623d1_ex99-1.htm' },
  { id: 5, titulo: 'IDEXX Laboratories: datos XBRL de los 10-K 2016-2025 y 10-Q (companyfacts)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000874716.json' },
  { id: 6, titulo: 'IDEXX Laboratories, Form 10-Q del 2T26 (amortizaciones, acciones en circulación)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/874716/000087471626000123/idxx-20260630.htm' },
  { id: 7, titulo: 'IDEXX 2026 Investor Day (presentación, 13-ago-2026)', editor: 'IDEXX Laboratories', tipo: 'Primaria', fecha: '2026-08-13', url: 'https://d1io3yog0oux5.cloudfront.net/_4feecb8c3cc72308dfec28f53409c771/idexx/db/3715/35333/pdf/2026+Investor+Day.pdf' },
  { id: 8, titulo: 'IDEXX (IDXX) Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-08-04', url: 'https://www.fool.com/earnings/call-transcripts/2026/08/11/idexx-idxx-q2-2026-earnings-call-transcript/' },
];

// Deuda financiera = notas sénior (LongTermDebt) + línea de crédito (LinesOfCreditCurrent), que cuentas.mjs no recogía [1, 5]
const lineaCredito = { 2019: 288.8, 2020: 0, 2021: 73.5, 2022: 250, 2023: 250, 2024: 250, 2025: 398 };
const emision = { 2019: 36.1, 2020: 51.3, 2021: 46.6, 2022: 35.7, 2023: 47.0, 2024: 44.5, 2025: 93.4 };
const instrumentos = { 2023: 14.6, 2024: 14.2, 2025: 9.9 }; // instrumentos cedidos en arrendamiento operativo, de existencias a inmovilizado [1]
const noRec = { 2024: 61.5, 2025: -9.0 }; // litigio de regalías: gasto de 61,5 M en 2024 y reversión de ~9 M en el 1T25 [1]

const cuenta = X.financieros.cuenta.filter((c) => ANIOS.includes(c.periodo)).map((c) => {
  const o = { ...c }; delete o.fin;
  o.dpa = 0; o.dpa_extraordinario = 0; o.minoritarios = 0;
  o.no_recurrentes_en_ebitda = noRec[c.periodo] ?? null;
  return o;
});
const balance = X.balance.historico.filter((c) => ANIOS.includes(c.periodo)).map((c) => {
  const o = { ...c }; delete o.fin;
  o.deuda_financiera = r1((c.deuda_financiera ?? 0) + lineaCredito[c.periodo]);
  o.arrendamientos = 0; // US GAAP: arrendamientos operativos, el alquiler ya está en el EBITDA
  o.minoritarios = 0;
  return o;
});
const flujos = X.flujos.historico.filter((c) => ANIOS.includes(c.periodo)).map((c) => {
  const o = { ...c }; delete o.fin;
  o.capex = r1(c.capex + (instrumentos[c.periodo] ?? 0));
  o.pagos_arrendamientos = 0; o.desinversiones = 0; o.dividendos = 0;
  o.emision_acciones = emision[c.periodo]; o.intereses_en_financiacion = 0;
  return o;
});

const A = {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Companion Animal Group (CAG)', descripcion: 'Diagnóstico de mascotas: consumibles VetLab, laboratorios de referencia, test rápidos SNAP, instrumentos, software de clínica e imagen.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2023', ingresos: 3352.4, resultado: null }, { periodo: '2024', ingresos: 3574.0, resultado: 1034.5 }, { periodo: '2025', ingresos: 3953.3, resultado: 1261.0 }] },
      { nombre: 'Water', descripcion: 'Test de microbiología del agua (Colilert) para laboratorios públicos y privados.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2023', ingresos: 168.1, resultado: null }, { periodo: '2024', ingresos: 185.1, resultado: 84.2 }, { periodo: '2025', ingresos: 201.1, resultado: 93.0 }] },
      { nombre: 'Livestock, Poultry and Dairy (LPD)', descripcion: 'Diagnóstico de ganado, aves y leche.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2023', ingresos: 121.7, resultado: null }, { periodo: '2024', ingresos: 122.1, resultado: 6.3 }, { periodo: '2025', ingresos: 131.8, resultado: 2.9 }] },
      { nombre: 'Otros', descripcion: 'Diagnóstico humano (OPTI Medical) y resultado de divisas no asignado.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2023', ingresos: 18.8, resultado: null }, { periodo: '2024', ingresos: 16.3, resultado: 3.3 }, { periodo: '2025', ingresos: 17.5, resultado: 3.1 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 64.0 }, { nombre: 'Internacional', peso_pct: 36.0 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico de los ingresos recurrentes de diagnóstico CAG', valor_anterior: '+8,1 % (2025)', valor_actual: '+10,7 % (1S26)', variacion: '+2,6 pp', comentario: 'Guía 2026: +9,5 % a +10,7 % orgánico [2, 4].' },
      { kpi: 'Visitas clínicas en EE. UU. (mismas clínicas)', valor_anterior: '−2 % (2025)', valor_actual: '−1,3 % (2T26)', variacion: 'menos caída', comentario: 'Las de bienestar (wellness) caen un 3,4 % en el 2T26 [1, 8].' },
      { kpi: 'Ingresos de diagnóstico por clínica en EE. UU. (mismas clínicas)', valor_anterior: 'n. d.', valor_actual: '+6 % (2025)', variacion: null, comentario: 'Frente a un +2 % de los ingresos totales de las clínicas [1].' },
      { kpi: 'Parque instalado de IDEXX inVue Dx', valor_anterior: 'lanzamiento (2025)', valor_actual: '> 9.000 (jun-26)', variacion: null, comentario: '1.600 colocaciones en el 2T26; objetivo de 5.500 en 2026 [2, 8].' },
      { kpi: 'Mejora neta de precio global', valor_anterior: 'n. d.', valor_actual: '≈ 4 % (2T26)', variacion: null, comentario: 'En línea con lo esperado para el año [8].' },
      { kpi: 'Margen operativo', valor_anterior: '31,6 % (2025)', valor_actual: '32,3-32,5 % (guía 2026)', variacion: '+70-90 pb', comentario: 'Objetivo plurianual: +50 a +100 pb al año [2, 7].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 4553.2, ebitda: 1612.7, ebit: 1458.6, beneficio_neto: 1139.7, bpa: 14.23, dpa: 0, dpa_extraordinario: 0, fcf: 1240.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'IDEXX ha crecido de 2.407 M USD en 2019 a 4.304 M en 2025, casi todo orgánico: las compras de 2021-2025 suman menos de 270 M USD [1, 5]. En 2025 los ingresos subieron un 10,4 % (9,6 % orgánico), con el recurrente de diagnóstico de mascotas +8,1 % orgánico y los instrumentos +49 % por el lanzamiento de inVue Dx [1]. El margen operativo pasó del 23,0 % de 2019 al 31,6 % de 2025: margen bruto al 61,8 % por precio (≈4-5 % al año) y por la mezcla de consumibles, y gastos que crecen menos que los ingresos [1, 5]. 2022 es el año flojo (EBIT −3,5 %) por la caída de visitas tras la pandemia y el dólar fuerte. En el 1S26 los ingresos suben un 11,8 % y el EBIT un 14,3 % [2].',
    ajustes: 'Usamos cifras publicadas (US GAAP). IDEXX no publica EBITDA ni BPA ajustado en la cuenta; su BPA «comparable» solo quita divisa y el beneficio fiscal de los pagos en acciones, que en 2025 fue de unos 28 M USD (0,35 USD por acción) [1, 4]. No recurrentes: un litigio de regalías de una licencia caducada costó 61,5 M USD en gastos generales de 2024 y se revirtieron unos 9 M en el 1T25; los ponemos en no_recurrentes_en_ebitda (61,5 en 2024 y −9 en 2025) [1]. La sentencia se pagó en abril de 2025 (80 M USD) [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 975.5, crecimiento_pct: 6.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.80, vs_consenso: null },
      { periodo: '4T24', ingresos: 954.3, crecimiento_pct: 5.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.62, vs_consenso: null },
      { periodo: '1T25', ingresos: 998.4, crecimiento_pct: 3.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.96, vs_consenso: null },
      { periodo: '2T25', ingresos: 1109.5, crecimiento_pct: 10.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.63, vs_consenso: null },
      { periodo: '3T25', ingresos: 1105.2, crecimiento_pct: 13.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.40, vs_consenso: null },
      { periodo: '4T25', ingresos: 1090.6, crecimiento_pct: 14.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.08, vs_consenso: null },
      { periodo: '1T26', ingresos: 1140.8, crecimiento_pct: 14.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.47, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 1216.6, crecimiento_pct: 9.7, crecimiento_organico_pct: 9.0, ebitda: null, margen_ebitda_pct: null, bpa: 4.27, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En el 2T26 (4-ago) la dirección, ya con Mike Erickson como consejero delegado, repitió el mensaje del 1T: el crecimiento sale de más pruebas por visita y no de más visitas. Las visitas de las mismas clínicas en EE. UU. cayeron un 1,3 % y las de bienestar un 3,4 %, pero el recurrente de diagnóstico de EE. UU. creció un 9,7 %, unos 11 puntos por encima de las visitas [2, 8]. Los consumibles VetLab subieron un 14 % orgánico por inVue Dx (más de 9.000 instalados) y el test de páncreas en Catalyst; los test rápidos solo un 1 %, porque parte de esa prueba se ha ido a Catalyst [2]. La guía subió en el punto medio: ingresos de 4.700-4.745 M USD, margen del 32,3-32,5 % y BPA de 14,69-14,94 USD [2]. Los analistas preguntaron por las visitas (qué haría volver a crecer las de bienestar, clínicas de grupos frente a independientes, la opinión de un antiguo directivo de que la presión seguirá), por el ritmo de colocaciones de inVue, por la capacidad de lanzar otra plataforma (Multi-Q) y por el reparto entre recompras y compras de empresas [8]. La dirección no dio el reparto de colocaciones por trimestre ni la mezcla EE. UU./internacional del segundo semestre, contestó de forma indirecta a la pregunta sobre la presión de visitas y no habló de 2027, que remitió al día del inversor del 13-ago [8]. Allí fijó metas plurianuales de crecimiento orgánico del 10 % o más, +50-100 pb de margen al año y BPA comparable +15 % o más [7].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 75 }, { anio: '2027', importe: 75 }, { anio: '2028', importe: 250 }, { anio: '2029', importe: 100 }, { anio: '2030', importe: 348 }, { anio: '2031+', importe: 0 }],
    liquidez: 'Caja de 197 M USD y unos 480 M disponibles en la línea de crédito de 1.000 M (dispuestos 519 M, de ellos 250 M del préstamo a plazo, en jun-26) [2, 1].',
    rating: 'Sin rating público (deuda colocada en privado)',
    coste_deuda_pct: 4.4,
    vida_media_anios: 2.5,
    otros_pasivos: 'Sin pensiones relevantes. Arrendamientos operativos de 128 M USD (US GAAP: no van a la deuda) [1]. Único covenant: deuda/EBITDA ajustado ≤ 3,5 veces, con mucha holgura (≈ 0,6 veces) [1]. Litigio de regalías cerrado en abril de 2025 con un pago de 80 M USD [1]. Compromisos de compra de 207 M en 2026 y 137 M después [1]. La línea de crédito se presenta como pasivo corriente porque cada disposición vence en menos de un año y tiene cláusula de cambio adverso, aunque la línea vence en noviembre de 2030 [1]. Activos por costes de captación de clientes (incentivos iniciales capitalizados) dentro de otros activos a largo plazo: pasivo fiscal diferido de 62,6 M USD por este concepto [1].',
    comentario: 'La deuda bruta apenas se mueve (848 M USD en 2025, 969 M en jun-26) porque IDEXX usa la línea de crédito para recomprar acciones: 1.217 M en 2025 y 698 M en el 1S26 [1, 2]. La deuda neta es de unas 0,5 veces el EBITDA. El patrimonio es pequeño (1.605 M) porque las recompras acumuladas suman 6.561 M de autocartera [1]. El circulante sube con los clientes (días de cobro de 44,7 a 46,2 entre jun-25 y jun-26) y con los activos de contrato de inVue [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta y estable: flujo operativo de 1.182 M USD en 2025, el 112 % del beneficio, y caja libre de unos 1.040 M tras inversiones de 138 M más 10 M de instrumentos cedidos a clientes [1]. 2022 fue el año débil (flujo operativo de 543 M) por existencias e impuestos [5]. El capex de mantenimiento no se publica; estimación propia: unos 2,5-3 % de las ventas (la amortización es el 3,4 %), y el resto amplía laboratorios de referencia y fábricas. La guía de 2026 prevé capex de unos 180 M y caja libre del 90-100 % del beneficio [2]. En el 1S26 la caja libre fue de 557 M frente a 360 M un año antes [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades)',
    comentario: 'Cuentas limpias: auditor desde 2002 con opinión favorable; la cuestión clave de auditoría es el reconocimiento de ingresos de productos y servicios [1]. Tres puntos a vigilar. (1) Incentivos a clientes: IDEXX paga por adelantado a las clínicas (descuentos y bonos por compromisos de compra) y lo capitaliza como coste de captación de clientes; el pasivo fiscal diferido asociado sube de 46,9 a 62,6 M USD en 2025 [1]. (2) Instrumentos en arrendamiento operativo y en programas de alquiler con reactivos: pasan de existencias a inmovilizado (9,9 M en 2025) y no están en el capex del estado de flujos; los sumamos [1]. (3) Pagos en acciones de 60 M USD (1,4 % de los ingresos) y beneficio fiscal de las opciones de 28 M en 2025, que baja el tipo efectivo [1, 5]. El BPA publicado no tiene ajustes: la empresa no presenta BPA ajustado.',
    senales: [
      { senal: 'Costes de captación de clientes capitalizados', nivel: 'Media', comentario: 'Crecen con los acuerdos de inVue; adelantan descuentos que se amortizan contra ingresos [1].' },
      { senal: 'Beneficio fiscal de las opciones', nivel: 'Baja', comentario: 'Unos 0,24-0,35 USD por acción al año; depende del precio de la acción [1, 2].' },
      { senal: 'Línea de crédito en pasivo corriente', nivel: 'Baja', comentario: 'Presentación prudente; la línea vence en 2030 [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'IDEXX no paga dividendo. Toda la caja libre que no se invierte se dedica a recomprar acciones, con un objetivo de reducir las acciones diluidas un 1,5-2 % en 2026 [2]. En 2025 recompró por 1.217 M USD (más que su caja libre, con deuda de la línea de crédito) y en el 1S26 por 693 M a 592 USD de media [1, 2]. Las compras de empresas son pequeñas y de software o tecnología (ezyVet, Vello, CoVetAI en sep-26) [1].',
    adquisiciones: [
      { anio: '2021', objetivo: 'ezyVet y otras (software de gestión en la nube)', importe: 173, ev_ebitda: null, financiacion: 'Caja', resultado: 'El software y los servicios crecen un 11-12 % en 2026; sin deterioros del fondo de comercio [1, 2].' },
      { anio: '2024', objetivo: 'Compras pequeñas (software y diagnóstico)', importe: 76.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de 414 M USD en total, sin deterioros [1].' },
    ],
    comentario: 'Asignación de capital disciplinada y sencilla: casi todo el crecimiento es orgánico y la caja va a recompras. Las acciones diluidas bajaron de 87,5 M en 2019 a 81,0 M en 2025 (−1,1 % al año) [5]. El punto débil es el precio de las recompras: en 2025 compró a una media de unos 500 USD y en el 1S26 a 592 USD, por encima del precio actual (520 USD) [1, 2].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y consenso previo de 2024-2025', tipo: 'Complemento', intentos: '1) Notas de prensa trimestrales (no publican EBITDA); 2) XBRL de los 10-Q (amortización solo acumulada); 3) MarketScreener (sin histórico de sorpresas gratis)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'resultado por segmento de 2023 y segmentos de 2019-2022', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo 2024-2025 de resultado por segmento); 2) XBRL companyfacts (sin dimensiones); 3) 10-K anteriores no descargados por tiempo', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'IDEXX 2026 Investor Day (gasto del sector en diagnóstico de mascotas, visitas, penetración del análisis de sangre)', editor: 'IDEXX Laboratories', tipo: 'Primaria', fecha: '2026-08-13', url: 'https://d1io3yog0oux5.cloudfront.net/_4feecb8c3cc72308dfec28f53409c771/idexx/db/3715/35333/pdf/2026+Investor+Day.pdf' },
  { id: 2, titulo: 'IDEXX Laboratories, Form 10-K del ejercicio 2025 (competencia, tendencias de CAG, riesgos)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-20', url: 'https://www.sec.gov/Archives/edgar/data/874716/000087471626000038/idxx-20251231.htm' },
  { id: 3, titulo: 'Economic Value of the Animal Health Sector', editor: 'HealthforAnimals (con datos de S&P Global)', tipo: 'Sectorial', fecha: '2025', url: 'https://healthforanimals.org/reports/economic-value-of-the-animal-health-sector/' },
  { id: 4, titulo: 'Animal Health Market Size, Share, Trends and Forecast 2026-2034', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://www.imarcgroup.com/animal-health-market' },
  { id: 5, titulo: 'Análisis de Zoetis (repositorio, 7-oct-2026): ingresos y márgenes de competidores de sus cuentas (Zoetis diagnóstico 434 M USD, Elanco, Virbac, Vetoquinol)', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-07', url: 'informes/zoetis-2026-10-07/datos-v4.json' },
  { id: 6, titulo: 'IDEXX Laboratories Acquires CoVetAI to Advance Veterinary Workflow Intelligence', editor: 'Business Wire', tipo: 'Primaria', fecha: '2026-09-16', url: 'https://secure.businesswire.com/news/home/20260916581543/en/IDEXX-Laboratories-Acquires-CoVetAI-to-Advance-Veterinary-Workflow-Intelligence' },
  { id: 7, titulo: 'Mars to Acquire Heska (8-K de Heska, anexo 99.2)', editor: 'Heska Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2023-04-03', url: 'https://www.sec.gov/Archives/edgar/data/1038133/000114036123015841/brhc10050787_ex99-2.htm' },
  { id: 8, titulo: 'Análisis de Thermo Fisher y Danaher (repositorio, 14-oct-2026): ingresos y márgenes de 2025', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/thermo-fisher-2026-10-14/datos-v2.json' },
  { id: 9, titulo: 'IDEXX (IDXX) Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-08-04', url: 'https://www.fool.com/earnings/call-transcripts/2026/08/11/idexx-idxx-q2-2026-earnings-call-transcript/' },
  { id: 10, titulo: 'Ficha sectorial: salud animal, diagnóstico y fármacos veterinarios (14-oct-2026)', editor: 'Análisis propio', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/salud-animal-2026-10-14.md' },
];
const Bn = {
  _estado: 'completo',
  historia: {
    resumen: 'IDEXX nació en 1983 en Westbrook (Maine) con test de diagnóstico para animales y salió a bolsa en el Nasdaq en 1991 [2]. Su primer gran producto fue el test rápido SNAP en la clínica; después construyó una red mundial de laboratorios de referencia y los analizadores de clínica (Catalyst, ProCyte), que generan ingresos recurrentes de consumibles. Con Jon Ayers (2002-2019) pasó del 10 % al 30 % de margen operativo y a vender software de gestión de clínicas; con Jay Mazelsky (2019-2026) lanzó inVue Dx (citología sin portaobjetos con IA) y Cancer Dx. Desde mayo de 2026 la dirige Mike Erickson, que venía de la división de pruebas en clínica [2].',
    hitos: [
      { anio: '1983', hito: 'Fundación en Maine.' }, { anio: '1991', hito: 'Salida a bolsa en el Nasdaq.' },
      { anio: '1990s', hito: 'Test rápidos SNAP para la clínica; entrada en agua (Colilert).' },
      { anio: '2006-2012', hito: 'Analizadores Catalyst y ProCyte: modelo de consumibles recurrentes.' },
      { anio: '2015', hito: 'Abandona los distribuidores en EE. UU. y vende directamente a las clínicas.' },
      { anio: '2021', hito: 'Compra de ezyVet: software de gestión en la nube.' },
      { anio: '2025', hito: 'Lanzamiento de IDEXX inVue Dx (6.400 colocados en el año).' },
      { anio: '2026', hito: 'Mike Erickson, consejero delegado; día del inversor con meta de crecimiento orgánico ≥ 10 %; compra de CoVetAI (escribano con IA) [1, 6].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el gasto mundial en diagnóstico de mascotas a precio de fabricante: laboratorios de referencia, analizadores y consumibles de clínica, test rápidos y telemedicina, sin software ni ecografía. IDEXX lo cifra en 6.500 M USD en 2025, frente a 4.100 M en 2019 (≈ 8 % anual) [1]. Contraste: el mercado de salud animal completo (fármacos, vacunas y diagnóstico de mascotas y ganado) es de unos 40.100 M USD según IMARC y 38.600 M según HealthforAnimals [3, 4]; el diagnóstico de mascotas es un 16 % de esa cifra. Usamos la cifra de IDEXX porque es la única con el perímetro de la cuota y avisamos de que es de parte interesada.',
    tamano: '≈ 6.500 M USD en 2025 (gasto mundial en diagnóstico de mascotas a precio de fabricante) [1]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2019', tamano: 4100 }, { anio: '2025', tamano: 6500 }, { anio: '2030e', tamano: 9800 }],
    tcac_historico_pct: 8.0, tcac_previsto_pct: 8.5,
    cr5_pct: 85, estructura: 'Concentrada',
    drivers: [
      { driver: 'Más pruebas por visita (penetración del análisis de sangre)', efecto: '+', horizonte: 'Estructural', evidencia: 'Solo el 19 % de las visitas clínicas en EE. UU. y el 13 % de las de bienestar incluyen análisis de sangre; IDEXX modeliza un 34 % en 2050 [1].' },
      { driver: 'Visitas clínicas a la clínica veterinaria', efecto: '−', horizonte: 'Cíclico', evidencia: 'Las visitas en las mismas clínicas de EE. UU. cayeron un 2 % en 2025 y un 1,3 % en el 2T26 (las de bienestar, −3,4 %) [2, 9].' },
      { driver: 'Población y envejecimiento de las mascotas', efecto: '+', horizonte: 'Estructural', evidencia: '22 M mascotas más en EE. UU. desde 2019 (≈ 2,5 % anual) y más visitas y pruebas en mayores de cinco años [1].' },
      { driver: 'Precio', efecto: '+', horizonte: 'Estructural', evidencia: 'Mejora neta de precio de IDEXX ≈ 4 % en 2026 [9].' },
      { driver: 'Internacional por penetrar', efecto: '+', horizonte: 'Estructural', evidencia: 'Solo el 8 % de las visitas internacionales lleva análisis de sangre; el sector crecería ≥ 10 % fuera de EE. UU. [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Tres actores reales (IDEXX, Antech-Heska de Mars y Zoetis con 434 M USD de diagnóstico); IDEXX gana cuota con márgenes del 31,6 % [2, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las cadenas de clínicas (Mars, consolidadores) negocian; pero las independientes siguen siendo mayoría y el coste del diagnóstico es pequeño en la factura [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Componentes y reactivos sin proveedor dominante [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta red de laboratorios, parque instalado e integración con el software de la clínica; los nuevos (Zomedica, SignalPET) son pequeños [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La IA lee imágenes y escribe historias clínicas, pero no sustituye a la química, la hematología ni la citología física [1, 6].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Las visitas en EE. UU. caen desde 2023 por falta de capacidad de las clínicas y precio; aun así el diagnóstico crece por utilización y precio [2]. En 2008-09 IDEXX bajó ventas un 2 %; en 2020 el sector se aceleró con el aumento de mascotas y en 2022 se frenó (crecimiento de IDEXX del 4,7 %) [2].' },
    regulacion: 'Poca regulación directa: los test veterinarios en EE. UU. dependen del USDA (biológicos) y no de la FDA; el agua y la leche, de la EPA y de los programas de control. Riesgos: aranceles sobre componentes y cambios fiscales internacionales (Pilar 2) [2].',
    tendencias: 'Tres tendencias: consolidación de clínicas en grupos (Mars, NVA, IVC Evidensia), que negocian precio y pueden integrar su propio laboratorio (Mars con Antech y Heska); la IA aplicada a imagen, citología y documentación, que IDEXX incorpora (inVue Dx, CoVetAI) [1, 6]; y el software de gestión en la nube, donde IDEXX compite con ezyVet y Neo [2]. La empresa gana con las dos últimas y la consolidación es el riesgo.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 52, posicion: '1.º mundial en diagnóstico de mascotas: 3.407 M USD de ingresos recurrentes de diagnóstico CAG en 2025 sobre un gasto del sector de unos 6.500 M (estimación propia) [1, 2]',
    competidores: [
      { nombre: 'Antech Diagnostics (Mars Petcare, con Heska)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; Mars compró Heska por 120 USD por acción en 2023 y la integró con Antech; ventaja de clientes cautivos en sus clínicas (Banfield, VCA) [7].' },
      { nombre: 'Zoetis (diagnóstico)', pais: 'EE. UU.', ticker: 'ZTS', ingresos: 434, cuota_pct: 6.7, margen_ebit_pct: null, comentario: 'Vetscan (antigua Abaxis); 434 M USD en 2025, pequeño dentro de sus 9.467 M [5].' },
      { nombre: 'Elanco Animal Health', pais: 'EE. UU.', ticker: 'ELAN', ingresos: 4715, cuota_pct: null, margen_ebit_pct: 0.3, comentario: 'Fármacos, no diagnóstico: comparable de cliente (la clínica) [5].' },
      { nombre: 'Thermo Fisher', pais: 'EE. UU.', ticker: 'TMO', ingresos: 44556, cuota_pct: null, margen_ebit_pct: 17.4, comentario: 'Diagnóstico y herramientas de laboratorio humano; comparable de modelo de reactivos [8].' },
      { nombre: 'Danaher', pais: 'EE. UU.', ticker: 'DHR', ingresos: 24568, cuota_pct: null, margen_ebit_pct: 19.1, comentario: 'Diagnóstico humano (Beckman, Cepheid, Radiometer); comparable de modelo de reactivos [8].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Datos de miles de clínicas (Practice Intelligence) que alimentan productos y la IA [1].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Parque instalado de analizadores con contratos de compra de consumibles, integrados con el software de la clínica; recurrente de diagnóstico = 79 % de los ingresos [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'SDMA, Fecal Dx, inVue Dx, Cancer Dx: menú propio que los rivales no tienen [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen bruto del 63,7 % en el 1S26 por escala de laboratorios y consumibles [2].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Red mundial de laboratorios y venta directa: margen operativo 31,6 % frente a 17-19 % de Thermo y Danaher [2, 8].' },
      ],
    },
    amenazas: 'Tres amenazas. La más probable es la consolidación de clínicas: si Mars, NVA o un fondo deciden llevar el laboratorio a casa, IDEXX pierde volumen y precio (probabilidad media). La segunda, una caída prolongada de las visitas por precio y falta de veterinarios, que ya dura tres años [2]. La tercera, la IA: algoritmos de lectura de radiografías y de citología y software de clínica nativo en IA pueden quitar margen al software y a la telemedicina (≈ 9 % de los ingresos), pero no a los análisis de sangre (probabilidad baja de daño grave) [1, 6].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la seguridad de los productos de diagnóstico (fiabilidad de resultados), la ciberseguridad del software y de los datos de las clínicas, y el bienestar animal. IDEXX no tiene emisiones relevantes para su coste [2].',
    controversias: 'Sin sanciones relevantes en tres años. Litigio civil de regalías perdido y pagado en 2025 (80 M USD) [2].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Proxy e informe de sostenibilidad (no las publican); 2) MSCI y Sustainalytics (de pago); 3) búsqueda en prensa (sin fecha fiable)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y cuota de Antech-Heska (Mars)', tipo: 'Complemento', intentos: '1) Mars no publica cuentas; 2) último 10-K de Heska (2022, 257 M USD); 3) estimaciones de prensa sin fuente primaria', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'IDEXX Laboratories, Proxy Statement 2026 (DEF 14A)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-27', url: 'https://www.sec.gov/Archives/edgar/data/874716/000087471626000064/idxx-20260327.htm' },
  { id: 2, titulo: '8-K: transición de consejero delegado (Mazelsky a presidente ejecutivo; Erickson consejero delegado)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-13', url: 'https://www.sec.gov/Archives/edgar/data/874716/000110465926003103/tm262817d1_8k.htm' },
  { id: 3, titulo: '8-K: resultados de la junta de 2026 (votaciones)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-15', url: 'https://www.sec.gov/Archives/edgar/data/874716/000087471626000110/idxx-20260512.htm' },
  { id: 4, titulo: '8-K: salida de Nimrata Hunt (vicepresidenta ejecutiva de estrategia y comercial)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-26', url: 'https://www.sec.gov/Archives/edgar/data/874716/000110465926034906/tm269826d1_8k.htm' },
  { id: 5, titulo: 'Form 4 de IDEXX, 14-oct-2025 a 14-oct-2026 (herramienta form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000874716&type=4' },
  { id: 6, titulo: 'Notas de prensa de resultados 4T25 y 2T26 (guías anuales)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/874716/000110465926090033/tm2622041d1_ex99-1.htm' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Michael G. Erickson, PhD', cargo: 'Presidente y consejero delegado', desde: '2026', participacion_pct: 0.02, trayectoria: 'En IDEXX desde 2013; dirigía la división de diagnóstico en clínica (Point-of-Care), donde lanzó inVue Dx [1, 2].' },
      { nombre: 'Jonathan J. (Jay) Mazelsky', cargo: 'Presidente ejecutivo del consejo (hasta mayo de 2027)', desde: '2019', participacion_pct: 0.1, trayectoria: 'Consejero delegado 2019-2026: ingresos de 2.407 a 4.304 M USD y margen operativo del 23 % al 31,6 % [1].' },
      { nombre: 'Andrew Emerson', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Director financiero desde 2025, tras la salida de Brian McKeon [1].' },
      { nombre: 'Lawrence D. Kingsley', cargo: 'Consejero coordinador independiente (antes presidente no ejecutivo)', desde: '2016', participacion_pct: null, trayectoria: 'Ex presidente y consejero delegado de Pall Corporation [1].' },
      { nombre: 'George Fennell', cargo: 'Vicepresidente ejecutivo', desde: null, participacion_pct: null, trayectoria: 'Directivo con ventas de acciones por 7,3 M USD en 12 meses [5].' },
    ],
    historial_guidance: [
      { anio: '2026 (feb)', guia: 'Guía inicial: ingresos 4.632-4.720 M USD (orgánico +7 % a +9 %) y BPA 14,29-14,80 USD [6]', real: 'Subida en mayo a 14,45-14,90 y en agosto a 14,69-14,94; 7,74 USD en el 1S26 (+17 %) [6]', cumplida: 'Sí' },
      { anio: '2026 (may)', guia: 'Ingresos orgánicos +7,7 % a +9,7 % [6]', real: 'Subida en agosto a +8,5 % a +9,7 % [6]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Guía anual 2025 (no leída en fuente primaria)', real: 'Ingresos 4.304 M USD (+10 %); BPA 13,08 USD (+23 %, +14 % comparable) [6]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y sucesión ordenada: el relevo de Mazelsky por Erickson se anunció en enero con cuatro meses de transición y un año de presidente ejecutivo [2]. En 2026 la guía de BPA ha subido dos veces (de 14,29-14,80 USD en febrero a 14,69-14,94 en agosto) [6]; no hemos leído las guías de 2022-2025 en fuente primaria. Señal a vigilar: la salida de la responsable de estrategia y comercial en abril de 2026 [4] y las ventas de acciones de la cúpula (37,7 M USD en 12 meses, ninguna compra) [5].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jonathan J. Mazelsky', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '2019', comisiones: 'Ninguna' },
      { nombre: 'Michael G. Erickson', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2026', comisiones: 'Ninguna' },
      { nombre: 'Lawrence D. Kingsley', cargo: 'Consejero coordinador', tipo: 'Independiente', desde: '2016', comisiones: 'Retribuciones, Gobierno' },
      { nombre: 'Irene Chang Britt', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Retribuciones (presidenta)' },
      { nombre: 'Bruce L. Claflin', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría, Retribuciones' },
      { nombre: 'Stuart M. Essig', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Gobierno, Finanzas (presidente)' },
      { nombre: 'Joseph L. Hooley', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, Gobierno' },
      { nombre: 'Daniel M. Junius', cargo: 'Consejero', tipo: 'Independiente', desde: '2014', comisiones: 'Auditoría (presidente), Finanzas' },
      { nombre: 'Karen Peacock', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Retribuciones, Finanzas' },
      { nombre: 'Sam Samad', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría, Retribuciones' },
      { nombre: 'Sophie V. Vandebroek', cargo: 'Consejera', tipo: 'Independiente', desde: '2013', comisiones: 'Gobierno, Finanzas' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 94.1, voto_remuneracion_contra_pct: 5.8, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 14.58, fijo: 1.15, variable_corto: 2.59, variable_largo: 10.80, ratio_salario_medio: 218 },
    remuneracion: 'El consejero delegado cobró 14,58 M USD en 2025: 1,15 M de fijo, 2,59 M de bonus anual y 10,8 M en opciones y acciones a largo plazo, 218 veces el empleado mediano [1]. El bonus depende de ingresos, BPA y objetivos no financieros; el largo plazo, de opciones y acciones restringidas por tiempo y de acciones por desempeño, sin una métrica de ROIC o TSR como eje (no marcamos variable ligado a rentabilidad) [1]. El voto a favor de la remuneración fue del 94 % en 2025 y del 94,1 % en 2026 [1, 3].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.2, tipo: 'Institucional', variacion: '13G/A de nov-24' },
      { nombre: 'BlackRock', pct: 9.56, tipo: 'Institucional', variacion: '13G/A de abr-25' },
      { nombre: 'Consejeros y directivos', pct: 0.3, tipo: 'Insiders', variacion: 'Ventas netas en 12 meses' },
      { nombre: 'Autocartera', pct: 26.4, tipo: 'Autocartera', variacion: '28,7 M de acciones sobre 108,4 M emitidas (dic-25)' },
    ],
    insiders: [
      { fecha: '2026-09-09', persona: 'Lawrence D. Kingsley (consejero)', operacion: 'Venta', acciones: null, importe: 1.17 },
      { fecha: '2026-08', persona: 'Michael G. Erickson (consejero delegado)', operacion: 'Venta', acciones: null, importe: 3.37 },
      { fecha: '2026-02/05', persona: 'Jonathan J. Mazelsky (presidente ejecutivo)', operacion: 'Venta', acciones: null, importe: 15.34 },
      { fecha: '2026', persona: 'Nimrata Hunt (ex vicepresidenta ejecutiva)', operacion: 'Venta', acciones: null, importe: 9.53 },
      { fecha: '2026', persona: 'George Fennell (vicepresidente ejecutivo)', operacion: 'Venta', acciones: null, importe: 7.34 },
    ],
    control_y_defensas: 'Sin accionista de control: Vanguard (12,2 %) y BlackRock (9,6 %) son pasivos [1]. Una acción, un voto. En la junta de 2026 se aprobó desclasificar el consejo (99,9 %) y dar a los accionistas con el 25 % el derecho a convocar junta; la propuesta de un accionista de bajarlo fue rechazada (41 % a favor) [3]. Sin operaciones vinculadas relevantes [1].',
    alertas: ['Ventas de acciones de directivos por 37,7 M USD en 12 meses, sin compras; un consejero vendió en el mínimo de 52 semanas (sep-26) [5].', 'Salida de la vicepresidenta ejecutiva de estrategia y comercial en abril de 2026 [4].'],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [{ seccion: 'directivos', campo: 'historial de guías 2021-2025', tipo: 'Complemento', intentos: '1) Notas de prensa de febrero de cada año (no descargadas por tiempo); 2) 10-K (no recogen la guía); 3) prensa (cifras sin documento original)', decision: 'Omitido' }],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (IDXX, SPY, XLV) hasta el 13-oct-2026 (herramienta bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/IDXX/history' },
  { id: 2, titulo: 'IDEXX Laboratories: estimaciones financieras anuales 2024-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/IDEXX-LABORATORIES-INC-9641/finances/' },
  { id: 3, titulo: 'IDEXX Laboratories (IDXX) Stock Forecast & Price Target', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/idxx/forecast/' },
  { id: 4, titulo: '10-Year Treasury Constant Maturity Rate (DGS10)', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Análisis de Zoetis (repositorio, 7-oct-2026): tabla de comparables de salud animal (MarketScreener) y transacciones', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-07', url: 'informes/zoetis-2026-10-07/datos-v4.json' },
  { id: 7, titulo: 'Análisis de Thermo Fisher y Danaher (repositorio, 14-oct-2026): múltiplos', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/danaher-2026-10-14/datos-v2.json' },
  { id: 8, titulo: 'Yahoo Finance, cierres del 6 y 13-oct-2026 de ZTS, ELAN, PAHC, NEOG, VIRP.PA, VETO.PA, TMO y DHR (API de gráficos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://query1.finance.yahoo.com/v8/finance/chart/ZTS' },
  { id: 9, titulo: 'Mars to Acquire Heska (8-K de Heska, anexo 99.2)', editor: 'Heska Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2023-04-03', url: 'https://www.sec.gov/Archives/edgar/data/1038133/000114036123015841/brhc10050787_ex99-2.htm' },
  { id: 10, titulo: 'Zoetis and Abaxis announce definitive merger agreement (8-K, anexo 99.1)', editor: 'Zoetis Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2018-05-16', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528018000179/ex99-12018mergerpressrelea.htm' },
  { id: 11, titulo: 'Recommended Cash Offer for Dechra Pharmaceuticals PLC (Regla 2.7)', editor: 'EQT / Dechra (vía Investegate)', tipo: 'Primaria', fecha: '2023-06-02', url: 'https://www.investegate.co.uk/announcement/7556360' },
  { id: 12, titulo: 'Virbac to take a leading position in Japan through the acquisition of Sasaeah', editor: 'Virbac (vía Investegate)', tipo: 'Primaria', fecha: '2024-03-06', url: 'https://www.investegate.co.uk/announcement/gnw/virbac-sa--0nm7/virbac-to-take-a-leading-position-in-japan-th-/8073275' },
  { id: 13, titulo: 'Phibro to acquire Zoetis medicated feed additive portfolio (8-K, anexo 99.1)', editor: 'Phibro Animal Health / SEC EDGAR', tipo: 'Primaria', fecha: '2024-04-29', url: 'https://www.sec.gov/Archives/edgar/data/1069899/000110465924053265/tm2412927d1_ex99-1.htm' },
  { id: 14, titulo: 'Covetrus to Be Acquired by Clayton, Dubilier & Rice and TPG (8-K, anexo 99.1)', editor: 'Covetrus / SEC EDGAR', tipo: 'Primaria', fecha: '2022-05-25', url: 'https://www.sec.gov/Archives/edgar/data/1752836/000119312522159139/d290661dex991.htm' },
  { id: 15, titulo: 'IDEXX Laboratories, Form 10-Q del 2T26 (acciones en circulación a finales de julio)', editor: 'IDEXX Laboratories / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/874716/000087471626000123/idxx-20260630.htm' },
];
const sc = (v, f) => (v == null ? null : Math.round(v * f * 10) / 10);
const comp = (n, t, p, cap, evv, ltm, ntm, per, g, m, roic, dn, fcf, f) => ({ nombre: n, ticker: t, pais: p, capitalizacion: Math.round(cap * f), ev_ventas: sc(evv, f), ev_ebitda_ltm: sc(ltm, f), ev_ebitda_ntm: sc(ntm, f), per_ntm: sc(per, f), crecimiento_pct: g, margen_ebitda_pct: m, roic_pct: roic, dn_ebitda: dn, fcf_yield_pct: sc(fcf, 1 / f) });
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'IDEXX Laboratories, Inc.', nombre_corto: 'IDEXX', ticker: 'IDXX', isin: 'US45168D1046', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Equipos y suministros sanitarios (diagnóstico veterinario)', sede: 'Westbrook (Maine, EE. UU.)', fundacion: '1983', empleados: 11000, web: 'https://www.idexx.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 79.1, capitalizacion_publicada: null, free_float_pct: 99.7,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 298 M USD/día (3 meses)', proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'Guía de 2026 (4-ago-2026): ingresos de 4.700-4.745 M USD (+9,1 % a +10,3 %; orgánico +8,5 % a +9,7 %), recurrente de diagnóstico CAG +9,5 % a +10,7 % orgánico, margen operativo del 32,3-32,5 % y BPA de 14,69-14,94 USD; capex de unos 180 M y caja libre del 90-100 % del beneficio. La guía prevé que las visitas en EE. UU. caigan como en 2025 (≈ −2 %). Metas plurianuales del día del inversor (13-ago): crecimiento orgánico ≥ 10 %, +50-100 pb de margen al año y BPA comparable +15 % o más.',
    estimaciones: [
      { periodo: '2026e', ingresos: 4722, ebitda: 1686, ebit: 1526, bpa: 14.77, dpa: 0, fuente: 'MarketScreener [2]; Stock Analysis da 14,83 USD con 12 analistas [3]' },
      { periodo: '2027e', ingresos: 5139, ebitda: 1858, ebit: 1692, bpa: 16.69, dpa: 0, fuente: 'MarketScreener [2]; Stock Analysis 16,74 USD [3]' },
      { periodo: '2028e', ingresos: 5606, ebitda: 2061, ebit: 1888, bpa: 18.91, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: 8, mantener: 5, vender: 1, po_medio: 701.33, po_min: 470, po_max: 805 },
    revisiones: 'El BPA de 2026 del consenso (14,77-14,83 USD) está en la guía subida en agosto [2, 3]. Los objetivos se han mantenido o recortado poco: UBS 670 (Mantener, 16-sep), BofA 660 → 665 y Stifel 675 tras el 2T (14-ago); KeyBanc empieza con Mantener el 12-oct. El número de «compra fuerte» baja de 5 a 4 entre mayo y octubre [3]. Solo hay una fuente con estimaciones completas a tres años (MarketScreener); contrastamos BPA y objetivos con Stock Analysis.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, beta: B.betas.mensual_5a, posicion_corta_pct: null, comentario: 'IDEXX ha perdido un 23,1 % en 2026 frente a un +15 % del S&P 500, y en cinco años un −3,7 % anual: el múltiplo bajó de unas 80 veces el BPA en 2021 a unas 35 veces hoy, mientras el BPA pasaba de 8,60 a 14,23 USD [1, 2]. Las caídas de 2026 coinciden con la guía de febrero (visitas −2 %) y con la presión general sobre salud animal (Zoetis −25 % en el año) [1]. Máximo de 769,98 USD el 26-nov-2025 y mínimo de 500,61 el 11-sep-2026 [1].', confianza: 'Alta' },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2020' || c.anio === '2021' })),
    comentario: null, confianza: 'Alta',
  },
  comparables: {
    criterio: 'Salud animal cotizada (Zoetis, Elanco, Phibro, Neogen, Virbac, Vetoquinol), con cifras del análisis de Zoetis del 7-oct (MarketScreener) llevadas al cierre del 13-oct con la variación de precio [6, 8], y dos diagnósticos humanos de modelo de reactivos (Thermo Fisher y Danaher) del 14-oct [7]. Antech-Heska (Mars) no cotiza. Elanco va sin PER porque su BPA contable lleva 540 M USD de amortización de intangibles (PER de 77 veces); Neogen no tiene PER por pérdidas. Ninguno tiene el crecimiento ni el ROIC de IDEXX: la mediana es un suelo, no una referencia.',
    empresas: [
      comp('Zoetis', 'ZTS', 'US', 29552, 3.92, 9.4, 9.8, 12.1, -0.9, 41.7, 29, 1.9, 7.8, 74.3 / 71.33),
      comp('Elanco Animal Health', 'ELAN', 'US', 11231, 3.04, 15.6, 13.6, null, 6.6, 19.1, 3.3, 3.9, 3.4, 22.41 / 22.48),
      comp('Phibro Animal Health', 'PAHC', 'US', 1486, 1.45, 8.6, 8.3, 11.5, 3.8, 16.8, 13, 2.8, 0.6, 36.81 / 36.61),
      comp('Neogen', 'NEOG', 'US', 2608, 3.67, 18.0, 17.5, null, 0.4, 20.4, -0.3, 3.4, 2.0, 11.73 / 11.96),
      comp('Virbac', 'VIRP', 'FR', 2946, 1.86, 9.2, 8.2, 13.9, 6.0, 19.8, 11.7, 0.6, 4.8, 325 / 312),
      comp('Vetoquinol', 'VETO', 'FR', 995, 1.26, 5.9, 5.7, 14.3, 2.5, 21.7, 15.7, -2.0, 9.4, 76.5 / 76.0),
      comp('Thermo Fisher', 'TMO', 'US', 249966, 6.21, 26.1, null, 24.6, 3.2, 23.8, 7.3, 3.5, 2.5, 1),
      comp('Danaher', 'DHR', 'US', 151545, 6.92, 24.5, null, 25.3, -0.2, 28.2, 5.5, 3.1, 3.5, 222.84 / 215.61),
    ],
    comentario: null, confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2023-04', objetivo: 'Heska (diagnóstico veterinario)', comprador: 'Mars', ev: 1310, ev_ventas: 5.09, ev_ebitda: null, prima_pct: 23, excluir: false, comentario: '120 USD por acción; valor estimado sobre 10,9 M de acciones y ventas de 257 M USD en 2022 (estimación del análisis de Zoetis) [9, 6].' },
      { fecha: '2018-05', objetivo: 'Abaxis (diagnóstico veterinario)', comprador: 'Zoetis', ev: 1814, ev_ventas: 7.41, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '83 USD por acción, menos la caja, sobre 244,7 M de ventas [10, 6].' },
      { fecha: '2023-06', objetivo: 'Dechra Pharmaceuticals', comprador: 'EQT y ADIA', ev: 6115, ev_ventas: null, ev_ebitda: 25.9, prima_pct: 44, excluir: false, comentario: '25,9 veces el EBITDA de 2022; fármacos veterinarios [11].' },
      { fecha: '2024-03', objetivo: 'Sasaeah (Japón)', comprador: 'Virbac', ev: 304, ev_ventas: 3.73, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Vacunas y fármacos de ganado [12].' },
      { fecha: '2024-04', objetivo: 'Aditivos medicados de Zoetis', comprador: 'Phibro', ev: 350, ev_ventas: 0.88, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Negocio maduro de ganado; fuera de la media [13].' },
      { fecha: '2022-05', objetivo: 'Covetrus', comprador: 'CD&R y TPG', ev: 4000, ev_ventas: 0.87, ev_ebitda: null, prima_pct: 39, excluir: true, comentario: 'Distribución veterinaria de margen bajo; fuera de la media [14].' },
    ],
    comentario: 'Los dos negocios de diagnóstico veterinario comprados (Abaxis y Heska) se pagaron a 5-7 veces las ventas [9, 10], muy por debajo de las 9,2 veces las ventas a las que cotiza IDEXX, porque eran segundos o terceros del mercado con márgenes de un dígito o bajos. Con 42.000 M USD de valor empresa y accionariado disperso, una opa sobre IDEXX es improbable: solo Mars o una gran farmacéutica podrían, y Mars ya tiene Antech. No damos peso a este método.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Nasdaq short interest (no abre sin navegador); 2) Stock Analysis (no recogido); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares y artículos de IDXX (RSS), jul-sep 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-18', url: 'https://seekingalpha.com/api/sa/combined/IDXX.xml' },
  { id: 2, titulo: 'Stocktwits: corriente de mensajes de $IDXX (ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://api.stocktwits.com/api/2/streams/symbol/IDXX.json' },
  { id: 3, titulo: 'IDEXX is down 28% from its peak: the business hasn\'t noticed', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-08-17', url: 'https://www.tikr.com/blog/idexx-is-down-28-from-its-peak-the-business-hasnt-noticed' },
  { id: 4, titulo: 'Why IDEXX stock is tanking today (24-sep-2026)', editor: 'Wealth Awesome', tipo: 'Foros y redes', fecha: '2026-09-24', url: 'https://wealthawesome.com/why-idexx-stock-is-tanking-today-09242026' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'Los artículos de agosto se reparten entre «vale la prima» y «la valoración pesa sobre la ejecución»; uno de julio defiende que IDEXX no necesita más visitas sino más pruebas por visita [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Negativo', resumen: 'Poco debate; destacan los nuevos mínimos de 52 semanas, la venta de un consejero en mínimos y que IDEXX y Zoetis no ven recuperación del mercado veterinario en agosto [2].' },
      { plataforma: 'TIKR (blog con lectores)', fecha: '2026-08', n_comentarios: 5, tono: 'Positivo', resumen: 'La caída es por visitas, no por el negocio: el recurrente crece un 10 % y el riesgo es solo el múltiplo de 35 veces [3].' },
      { plataforma: 'Wealth Awesome (prensa de mercado)', fecha: '2026-09', n_comentarios: 3, tono: 'Negativo', resumen: 'Atribuye la debilidad a la caída de las visitas de bienestar en EE. UU. y a la divisa [4].' },
    ],
    temas: [
      { tema: 'Caída de visitas a la clínica en EE. UU.', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'Valoración: ¿35 veces el BPA es barato para IDEXX?', postura: 'Dividida', peso: 'Alto', contraste: null },
      { tema: 'inVue Dx y más pruebas por visita', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'Ventas de directivos y cambio de consejero delegado', postura: 'Bajista', peso: 'Bajo', contraste: null },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit', tipo: 'Complemento', intentos: '1) Reddit devuelve 403; 2) búsqueda de hilos recientes (sin resultados con fecha); 3) Stocktwits y Seeking Alpha en su lugar', decision: 'Omitido' }],
};
guarda('E', E);
console.log('Notas A-E escritas');
