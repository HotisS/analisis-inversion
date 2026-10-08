import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const salida = path.join(dir, 'A.json');
const prev = JSON.parse(fs.readFileSync(salida, 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/1555280/';
const Q = 'https://s203.q4cdn.com/620628704/files/doc_financials/';

const fuentes = [
  [1, 'Zoetis Inc., informe anual 10-K del ejercicio 2025', 'Zoetis Inc. (SEC EDGAR)', '2026-02-12', E + '000155528026000011/zts-20251231.htm'],
  [2, 'Zoetis Inc., informe trimestral 10-Q del 2T26 (30-jun-2026)', 'Zoetis Inc. (SEC EDGAR)', '2026-08-06', E + '000155528026000040/zts-20260630.htm'],
  [3, 'Zoetis Inc., informe trimestral 10-Q del 1T26 (31-mar-2026)', 'Zoetis Inc. (SEC EDGAR)', '2026-05-07', E + '000155528026000024/zts-20260331.htm'],
  [4, 'Zoetis Inc., informe anual 10-K del ejercicio 2024', 'Zoetis Inc. (SEC EDGAR)', '2025-02-13', E + '000155528025000102/zts-20241231.htm'],
  [5, 'Zoetis Inc., informe anual 10-K del ejercicio 2023', 'Zoetis Inc. (SEC EDGAR)', '2024-02-13', E + '000155528024000143/zts-20231231.htm'],
  [6, 'Zoetis Inc., informe anual 10-K del ejercicio 2022', 'Zoetis Inc. (SEC EDGAR)', '2023-02-14', E + '000155528023000074/zts-20221231.htm'],
  [7, 'Zoetis Inc., informe anual 10-K del ejercicio 2019', 'Zoetis Inc. (SEC EDGAR)', '2020-02-13', E + '000155528020000054/zoetis-20191231x10kye.htm'],
  [8, 'SEC, datos XBRL de Zoetis Inc. (companyfacts, CIK 0001555280): series anuales 2016-2022', 'U.S. Securities and Exchange Commission', '2026-10-07', 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001555280.json'],
  [9, 'Zoetis, nota de prensa de resultados del 2T26 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2026-08-06', E + '000155528026000038/exhibit99q22026.htm'],
  [10, 'Zoetis, nota de prensa de resultados del 1T26 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2026-05-07', E + '000155528026000021/exhibit99q12026.htm'],
  [11, 'Zoetis, nota de prensa de resultados del 4T25 y del ejercicio 2025 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2026-02-12', E + '000155528026000008/exhibit9912-31x25q4.htm'],
  [12, 'Zoetis, nota de prensa de resultados del 3T25 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2025-11-04', E + '000155528025000272/exhibit99q32025.htm'],
  [13, 'Zoetis, nota de prensa de resultados del 2T25 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2025-08-05', E + '000155528025000259/exhibit99q22025.htm'],
  [14, 'Zoetis, nota de prensa de resultados del 1T25 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2025-05-06', E + '000155528025000201/exhibit99q12025.htm'],
  [15, 'Zoetis, nota de prensa de resultados del 4T24 y del ejercicio 2024 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2025-02-13', E + '000155528025000100/exhibit9912-31x24q4.htm'],
  [16, 'Zoetis, nota de prensa de resultados del 3T24 (anexo 99 del 8-K)', 'Zoetis Inc. (SEC EDGAR)', '2024-11-04', E + '000155528024000330/exhibit99q32024.htm'],
  [17, 'Zoetis, transcripción de la conferencia de resultados del 4T25', 'Zoetis Inc.', '2026-02-12', Q + '2025/q4/ZTS-Q4FY25-Earnings-Transcript.pdf'],
  [18, 'Zoetis, transcripción de la conferencia de resultados del 1T26', 'Zoetis Inc.', '2026-05-07', Q + '2026/q1/Q1-2026-Zoetis-Earnings-Call.pdf'],
  [19, 'Zoetis, transcripción de la conferencia de resultados del 2T26', 'Zoetis Inc.', '2026-08-06', Q + '2026/q2/Q2-2026-Zoetis-Earnings-Call.pdf'],
  [20, 'Zoetis, 8-K de la emisión de bonos convertibles al 0,25 % con vencimiento en 2029', 'Zoetis Inc. (SEC EDGAR)', '2025-12-15', E + '000119312525324853/d35588d8k.htm'],
].map(([id, titulo, editor, fecha, url]) => ({ id, titulo, editor, tipo: 'Primaria', fecha, url }));

// Segmentos (ingresos y resultado de segmento antes de impuestos, sin costes centrales)
const seg = {
  us: [[2017,2620,1637],[2018,2877,1815],[2019,3203,2005],[2020,3557,2239],[2021,4042,2569],[2022,4313,2763],[2023,4555,2863],[2024,5074,3336],[2025,5097,3438]],
  intl: [[2017,2643,1240],[2018,2890,1399],[2019,2972,1487],[2020,3035,1547],[2021,3652,1948],[2022,3681,1990],[2023,3911,2037],[2024,4102,2118],[2025,4254,2264]],
};
const totales = { 2017: 5307, 2018: 5825, 2019: 6260, 2020: 6675, 2021: 7776, 2022: 8080, 2023: 8544, 2024: 9256, 2025: 9467 };
const otros = Object.keys(totales).map((a, i) => ({ periodo: a, ingresos: totales[a] - seg.us[i][1] - seg.intl[i][1], resultado: null }));
console.log('otros', otros.map(o => o.ingresos).join(','));
const segmentos = [
  { nombre: 'Estados Unidos', descripcion: 'Animales de compañía (antiparasitarios, dermatología, dolor por artrosis, diagnóstico) y ganadería en EE. UU. Resultado de segmento: ingresos menos coste de ventas y gastos comerciales directos; excluye I+D central, estructura corporativa y amortización de compras [1].', tipo_resultado: 'EBIT', historico: seg.us.map(([a, i, r]) => ({ periodo: String(a), ingresos: i, resultado: r })) },
  { nombre: 'Internacional', descripcion: 'Resto del mundo (más de 100 países; Brasil, Australia, Reino Unido y Canadá son los mayores). Mismo criterio de resultado que EE. UU.; hasta 2025 consolidaba con un mes de desfase (cierre a 30 de noviembre) [1, 2].', tipo_resultado: 'EBIT', historico: seg.intl.map(([a, i, r]) => ({ periodo: String(a), ingresos: i, resultado: r })) },
  { nombre: 'Fabricación para terceros y salud humana', descripcion: 'Contratos de fabricación (Client Supply Services) y salud humana. La empresa no le asigna resultado propio: lo incluye en «otras actividades», junto con la I+D central (−562 M en 2025) [1].', tipo_resultado: null, historico: otros },
];

const geo = [['Estados Unidos', 5097], ['Brasil', 393], ['Australia', 329], ['Reino Unido', 325], ['Canadá', 290], ['Alemania', 236], ['China', 227]];
const sum = geo.reduce((a, g) => a + g[1], 0);
const geografias = geo.map(([n, v]) => ({ nombre: n, peso_pct: Math.round(v / 9467 * 1000) / 10 }));
geografias.push({ nombre: 'Otros (incluye fabricación para terceros)', peso_pct: Math.round((100 - geografias.reduce((a, g) => a + g.peso_pct, 0)) * 10) / 10 });

const negocio = {
  descripcion: null, como_gana_dinero: null,
  segmentos, geografias, geografias_criterio: 'destino', clientes: null,
  kpis: [
    { kpi: 'Ventas de animales de compañía (M USD)', valor_anterior: '6.278 (2024)', valor_actual: '6.587 (2025)', variacion: '+4,9 %', comentario: '69,6 % de las ventas de 2025; en el 1S26 cae un 3 % (EE. UU. −11 %) [1, 9].' },
    { kpi: 'Ventas de ganadería (M USD)', valor_anterior: '2.898 (2024)', valor_actual: '2.764 (2025)', variacion: '−4,6 %', comentario: 'Cae por la venta del MFA; en el 1S26 sube un 14 % (vacuna aviar y vacuno en EE. UU.) [1, 9].' },
    { kpi: 'Dermatología clave (Apoquel y Cytopoint), trimestral', valor_anterior: '1T26: 347 M (−11 %)', valor_actual: '2T26: 395 M (−16 %)', variacion: 'EE. UU. 2T26: 251 M (−18 %)', comentario: 'En 2025 sumó 1.700 M (+6 % operativo; EE. UU. 1.100 M, +4 %). Nuevo competidor en EE. UU. desde el 2T26 [17, 18, 19].' },
    { kpi: 'Franquicia Simparica (Simparica y Simparica Trio), trimestral', valor_anterior: '1T26: 385 M (−1 %)', valor_actual: '2T26: 442 M (plano)', variacion: 'EE. UU. 2T26: 308 M (−6 %); internacional 134 M (+19 %)', comentario: 'En 2025 sumó 1.500 M (+12 % operativo); Simparica Trio superó 1.000 M en EE. UU. [17, 18, 19].' },
    { kpi: 'Anticuerpos para el dolor por artrosis (Librela, Solensia, Lenivia, Portela), trimestral', valor_anterior: '1T26: 140 M (−8 %)', valor_actual: '2T26: 147 M (−3 %)', variacion: 'EE. UU. 2T26: 51 M (−18 %)', comentario: 'En 2025: 568 M (−3 % operativo); Librela EE. UU. 169 M (−16 %) e internacional 254 M (+2 %) [17, 18, 19].' },
    { kpi: 'Diagnóstico de animales de compañía, trimestral', valor_anterior: '1T26: 113 M (+10 %)', valor_actual: '2T26: 118 M (+12 %)', variacion: '+12 %', comentario: 'Diagnóstico total de 2025: 434 M (386 M en 2024) [1, 18, 19].' },
    { kpi: 'Ventas por categoría: antiparasitarios / dermatología / dolor y sedación (M USD)', valor_anterior: '2.153 / 1.655 / 851 (2024)', valor_actual: '2.341 / 1.754 / 840 (2025)', variacion: '+8,7 % / +6,0 % / −1,3 %', comentario: 'Las cinco mayores líneas (Simparica, Apoquel, Cytopoint, Librela y ceftiofur) son el 42 % de las ventas; las diez mayores, el 57 % [1].' },
  ],
  confianza: 'Alta',
};

const trimestres = {
  items: [
    { periodo: '3T24', ingresos: 2388, crecimiento_pct: 11.0, crecimiento_organico_pct: 14, ebitda: null, margen_ebitda_pct: null, bpa: 1.50, vs_consenso: null },
    { periodo: '4T24', ingresos: 2317, crecimiento_pct: 4.7, crecimiento_organico_pct: 9, ebitda: null, margen_ebitda_pct: null, bpa: 1.29, vs_consenso: null },
    { periodo: '1T25', ingresos: 2220, crecimiento_pct: 1.4, crecimiento_organico_pct: 9, ebitda: null, margen_ebitda_pct: null, bpa: 1.41, vs_consenso: null },
    { periodo: '2T25', ingresos: 2460, crecimiento_pct: 4.2, crecimiento_organico_pct: 8, ebitda: null, margen_ebitda_pct: null, bpa: 1.61, vs_consenso: null },
    { periodo: '3T25', ingresos: 2400, crecimiento_pct: 0.5, crecimiento_organico_pct: 4, ebitda: null, margen_ebitda_pct: null, bpa: 1.63, vs_consenso: null },
    { periodo: '4T25', ingresos: 2387, crecimiento_pct: 3.0, crecimiento_organico_pct: 4, ebitda: null, margen_ebitda_pct: null, bpa: 1.37, vs_consenso: null },
    { periodo: '1T26', ingresos: 2262, crecimiento_pct: 2.9, crecimiento_organico_pct: 0, ebitda: null, margen_ebitda_pct: null, bpa: 1.42, vs_consenso: null },
    { periodo: '2T26', ingresos: 2468, crecimiento_pct: -0.2, crecimiento_organico_pct: -1, ebitda: null, margen_ebitda_pct: null, bpa: 1.65, vs_consenso: null },
  ],
  ultima_presentacion: 'En mayo la dirección presentó el 1T26 como un trimestre peor de lo previsto: dueños de mascotas más sensibles al precio, menos visitas al veterinario (agravadas por las tormentas de invierno) y más competidores que compiten sobre todo en precio; la dermatología clave cayó un 11 % y la guía bajó a un orgánico del 2-5 % [10, 18]. En agosto el tono fue más duro: las visitas periódicas de perros en EE. UU. siguieron más de un 2 % por debajo, un nuevo competidor entró en dermatología en EE. UU. en el 2T26, la dermatología clave cayó un 16 % (EE. UU. −18 %) y la guía pasó a −3 % / −1 % orgánico [9, 19]. El cambio de discurso es el precio: la empresa descarta bajar el precio de lista, pero acelera inversiones temporales «del bruto al neto» (descuentos, rebajas en el punto de venta, paquetes de productos) para defender volumen y cuota. Los analistas (Morgan Stanley, William Blair, BofA, JPMorgan, Stifel, Citi, Piper Sandler) preguntaron sobre todo por el efecto de esos descuentos en el precio neto y los márgenes, la pérdida de cuota implícita en la guía, los recortes de costes (gastos comerciales y de administración −4 % en el 2T26) y si 2027 volverá a crecer. La dirección no cuantificó la pérdida de cuota ni el coste de los descuentos y se negó a hablar de 2027: no sabe si la presión competitiva durará «seis, 12 o 18 meses» [19].',
  confianza: 'Alta',
};

const calidad = {
  auditor: 'KPMG LLP', anios_auditor: 15, opinion: 'Favorable (sin salvedades; control interno eficaz)',
  comentario: 'KPMG audita a Zoetis desde 2011 y su informe de 2025 destaca dos asuntos clave: las posiciones fiscales inciertas y la estimación de los descuentos por volumen (rebates) en EE. UU., que crecen ahora que la empresa usa los descuentos para defender cuota [1, 19]. La I+D se gasta entera (698 M en 2025, 7,4 % de las ventas); sí se capitalizan los costes de implantación del nuevo ERP en la nube: 176 M netos en 2025 frente a 67 M en 2024 [1]. La remuneración en acciones es baja (83 M en 2025, 3,1 % del beneficio) [1]. Los deterioros son recurrentes pero pequeños: entre 31 y 53 M al año desde 2020, sobre todo en sanidad animal de precisión, diagnóstico y acuicultura [1, 5]. Dos asuntos afectan a la comparabilidad: el cambio de cierre de las filiales internacionales (aplicado de forma retroactiva en 2026) y el adelanto de ventas al 4T25 internacional, que la empresa cifra en un 2,5-3,5 % de las ventas del trimestre en ese segmento [1, 2]. La empresa usó en 2022 y 2024 un prepago intragrupo desde Bélgica para rebajar impuestos en EE. UU., con beneficio diferido hasta 2026 [1]. Indicadores del motor: se leen en calc.calidad.',
  senales: [
    { senal: 'Adelanto de ventas al 4T25 por el cambio de cierre internacional', nivel: 'Media', comentario: 'Un 2,5-3,5 % de las ventas internacionales del 4T25 se adelantaron y no se repetirán; además se retrasaron pedidos de diciembre de 2025 a 2026 y se movieron las subidas de precio [1].' },
    { senal: 'Cambio de criterio contable: eliminación del mes de desfase de las filiales internacionales', nivel: 'Baja', comentario: 'Aplicado de forma retroactiva desde el 1-ene-26; el 1S25 reexpresado tiene 8 M menos de ventas y 21 M menos de beneficio; el patrimonio a 31-dic-25 sube 84 M [2].' },
    { senal: 'Demanda colectiva de accionistas por información engañosa (mayo de 2026)', nivel: 'Media', comentario: 'Cubre a compradores entre el 14-ene-25 y el 6-may-26; hay además demandas derivadas en Nueva York y Nueva Jersey; sin provisión [2].' },
    { senal: 'Descuentos y rebates crecientes en EE. UU.', nivel: 'Media', comentario: 'Asunto clave de auditoría; la empresa anuncia más inversiones «del bruto al neto» en el 2S26, que dependen de estimaciones de la propia empresa [1, 19].' },
    { senal: 'Capitalización de costes de software en la nube', nivel: 'Baja', comentario: '176 M netos a cierre de 2025 (67 M en 2024), amortizados linealmente; 6 M de amortización en 2025 [1].' },
  ],
  confianza: 'Alta',
};

const capital = {
  politica: 'Zoetis prioriza la inversión interna (I+D y capacidad), las compras pequeñas y medianas, un dividendo creciente y las recompras [1]. El dividendo trimestral subió a 0,53 USD en 2026 (0,50 en 2025) y el repartido en 2025 fue de 2,03 USD por acción, un tercio del beneficio [2, 1]. En agosto de 2024 el consejo aprobó un programa de recompras de 6.000 M sin fecha de caducidad; a 30-jun-26 quedaban 1.300 M [2]. Desde 2025 la empresa recompra con deuda: los convertibles de 2.000 M de diciembre de 2025 financiaron 248 M de recompras simultáneas, 187 M de la opción con techo y 1.535 M de recompras que se completaron en marzo de 2026 (12,3 M de acciones) [2, 20]. Las acciones en circulación bajaron de 448,5 M a cierre de 2024 a 414,2 M en junio de 2026 [1, 2].',
  adquisiciones: [
    { anio: '2018', objetivo: 'Abaxis (diagnóstico en clínica, EE. UU.), 83 USD por acción', importe: 1962, ev_ebitda: null, financiacion: 'Caja y bonos emitidos en agosto de 2018 (1.485 M netos)', resultado: 'Fondo de comercio de 977 M sin deterioro; base del negocio de diagnóstico, que vendió 434 M en 2025 y crece un 12 % en el 2T26 [1, 7, 19].' },
    { anio: '2019', objetivo: 'Platinum Performance (nutrición) y laboratorios de referencia Phoenix Lab y ZNLabs', importe: 195, ev_ebitda: null, financiacion: 'Caja', resultado: 'Importe conjunto de las compras del año. Platinum hizo ventas con posibles vínculos con Irán; la OFAC cerró el caso sin sanción en julio de 2023 [5, 7].' },
    { anio: '2020', objetivo: 'Fish Vet Group, Virtual Recall, Performance Livestock Analytics y Ethos Diagnostic Science', importe: 113, ev_ebitda: null, financiacion: 'Caja', resultado: 'Importe conjunto, sin publicar por separado. Las áreas de sanidad animal de precisión y acuicultura, a las que pertenecen dos de ellas, registraron deterioros en 2023 y 2024 [1, 5, 6].' },
    { anio: '2022', objetivo: 'Jurox (medicamentos veterinarios, Australia)', importe: 240, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada sin deterioros publicados; aporta capacidad fabril en Australia [5].' },
    { anio: '2023', objetivo: 'PetMedix (anticuerpos para animales de compañía, Reino Unido)', importe: 111, ev_ebitda: null, financiacion: 'Caja; hasta 100 M adicionales por hitos', resultado: 'Compra de I+D en fase de desarrollo, sin ventas; alimenta la cartera de anticuerpos [5].' },
    { anio: '2024', objetivo: 'Venta a Phibro de los aditivos medicados y activos asociados', importe: 299, ev_ebitda: null, financiacion: 'Desinversión (cobro neto de 292 M en 2024)', resultado: 'Pérdida de 25 M en 2024 y 3 M más en 2025; restó unos 3 puntos al crecimiento de 2025 y mejoró el margen bruto [1].' },
    { anio: '2025', objetivo: 'Veterinary Pathology Group (laboratorios, Reino Unido e Irlanda)', importe: 24, ev_ebitda: null, financiacion: 'Caja', resultado: 'Importe total pagado por compras en 2025; operación no material [1].' },
    { anio: '2026', objetivo: 'VitalRADS (telerradiología) y negocio de genómica animal de Neogen (pendiente)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'VitalRADS cerró en julio de 2026; Neogen se espera en el 2S26. Importes no publicados [2, 9].' },
  ],
  comentario: null,
  confianza: 'Media',
};

const huecos = [
  { seccion: 'trimestres', campo: 'vs_consenso de los ocho trimestres', tipo: 'Complemento', intentos: '1) notas de prensa y transcripciones de la empresa: no citan el consenso; 2) búsqueda web de resúmenes de resultados (Stock Taper, Betafinch, Barchart): sin cifra literal de consenso previo o páginas vacías; 3) no se puede derivar sin un proveedor de estimaciones históricas', decision: 'Omitido' },
  { seccion: 'trimestres', campo: 'EBITDA trimestral', tipo: 'Complemento', intentos: '1) 10-Q del 2T26: la amortización solo figura acumulada en el estado de flujos; 2) notas de prensa trimestrales: no publican amortizaciones; 3) derivarlo exigía restar acumulados de seis 10-Q más, fuera del presupuesto', decision: 'Omitido' },
  { seccion: 'negocio', campo: 'Ventas de Revolution, ProHeart y Cytopoint por separado', tipo: 'Complemento', intentos: '1) 10-K 2025: solo categorías de producto y porcentaje de las dos mayores líneas; 2) transcripciones del 4T25, 1T26 y 2T26: dan dermatología clave en conjunto y solo el crecimiento de ProHeart; 3) notas de prensa: sin desglose por marca', decision: 'Omitido' },
  { seccion: 'capital', campo: 'Múltiplo pagado en las compras', tipo: 'Complemento', intentos: '1) notas de combinaciones de negocios de los 10-K 2019, 2023 y 2025: no publican EBITDA de las adquiridas; 2) nota de prensa del 2T26 (VitalRADS) y 10-Q (Neogen): sin importe; 3) no derivable', decision: 'Omitido' },
];

const out = { ...prev, negocio, trimestres, calidad, capital, fuentes, huecos };
fs.writeFileSync(salida, JSON.stringify(out, null, 2));
console.log('guardado', Object.keys(out).filter(k => out[k]).join(','), 'geo', JSON.stringify(geografias));
