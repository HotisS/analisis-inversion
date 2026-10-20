// Actualiza la nota A de Equifax con el 3T26 (20-oct-2026). Se ejecuta una vez sobre la nota copiada del 8-oct.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const ruta = join(dir, 'A.json');
const A = JSON.parse(readFileSync(ruta, 'utf8'));
if (A.financieros.ltm.periodo === 'LTM sep-26') { console.log('Ya actualizada'); process.exit(0); }

// ---------- fuentes nuevas (28-34) ----------
A.fuentes.push(
  { id: 28, titulo: 'Comunicado de resultados del 3T26 (8-K, anexo 99.1)', editor: 'Equifax Inc.', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/Archives/edgar/data/33185/000003318526000037/exhibit99120260930.htm' },
  { id: 29, titulo: 'Presentación de resultados del 3T26 (3Q26 Earnings Review)', editor: 'Equifax Inc.', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://d1io3yog0oux5.cloudfront.net/_f0de1d3c593f7f8b8ec2aa873a7df5b5/equifax/db/2012/19790/file/3Q26+Earnings+Presentation+v2.pdf' },
  { id: 30, titulo: 'Folleto de emisión (424B2): bonos al 5,000 % 2029 y al 5,650 % 2033', editor: 'Equifax Inc.', tipo: 'Primaria', fecha: '2026-07-24', url: 'https://www.sec.gov/Archives/edgar/data/33185/000119312526314770/d119080d424b2.htm' },
  { id: 31, titulo: 'Equifax (EFX): historial de resultados frente al consenso', editor: 'MarketBeat', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NYSE/EFX/earnings/' },
  { id: 32, titulo: 'EFX: consenso del trimestre a septiembre de 2026', editor: 'Earnings Whispers', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://beta.earningswhispers.com/go/w/EFX' },
  { id: 33, titulo: 'Equifax reports Q3 adjusted EPS $1.85, consensus $1.83', editor: 'The Fly (TipRanks)', tipo: 'Prensa', fecha: '2024-10-16', url: 'https://www.tipranks.com/news/the-fly/equifax-reports-q3-adjusted-eps-1-85-consensus-1-83' },
  { id: 34, titulo: 'Transcripción de la conferencia de resultados del 2T26 de Equifax', editor: 'Earnings Whispers', tipo: 'Datos de mercado', fecha: '2026-07-21', url: 'https://earningswhispers.com/transcript/EFX/Q22026' },
);

// ---------- financieros ----------
const F = A.financieros;
F.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: 6592.1, ebitda: 1992.9, ebit: 1241.4, beneficio_neto: 742.9,
  bpa: 6.19, dpa: 2.18, dpa_extraordinario: 0, fcf: 1104.0,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: 104.7,
};
F.comentario = F.comentario.replace(
  /En 2026 la reventa sin margen[\s\S]*$/,
  'En 2026 la reventa sin margen de las puntuaciones hipotecarias de FICO (unos 100 M solo en el 3T26) infla el crecimiento y resta margen: la guía de octubre da un crecimiento del 9,4-9,9 % contable y del 6,3-6,8 % sin FICO, y un margen EBITDA ajustado del 31,7-32,0 % contable frente al 33,8-34,1 % sin FICO [29].\n\nEn los doce meses a septiembre de 2026 los ingresos suman 6.592 M (+8,5 % sobre 2025), el EBITDA contable 1.993 M (30,2 %) y el EBIT 1.241 M (18,8 %), con 104,7 M de no recurrentes dentro del resultado operativo [4, 13, 12, 28].'
);
F.ajustes = F.ajustes + '\n\nLTM sep-26 (4T25 + 1T26 + 2T26 + 3T26, suma de los cuatro comunicados trimestrales; el 10-Q del 3T26 aún no está presentado): ingresos 1.550,6 + 1.648,9 + 1.700,1 + 1.692,5; EBIT 284,2 + 287,7 + 314,2 + 355,3; amortizaciones de la cuenta 184,3 + 183,1 + 189,7 + 194,4; beneficio atribuido 175,8 + 171,5 + 183,9 + 211,7; BPA diluido 1,44 + 1,42 + 1,54 + 1,79 [4, 13, 12, 28]. Los 104,7 M de no recurrentes son los que la empresa excluye de su EBITDA ajustado y están en el resultado operativo: 4T25, 40,0 M (acuerdo de demandas 30,0, integración 8,5, antimonopolio 1,2, ciberataque 0,3); 1T26, 6,8 M; 2T26, 48,0 M, de ellos 40,0 M por un acuerdo judicial sobre un error de codificación ya comunicado (provisión de 100,0 M menos 60,0 M que espera cobrar del seguro); 3T26, 9,9 M (integración 8,9, antimonopolio 0,8, ciberataque 0,2) [4, 13, 12, 28]. Con ellos, el EBITDA LTM sale en 2.097,6 M, prácticamente el ajustado de la empresa (2.097,9 M). FCF LTM: 1.134,3 M de 2025 + 763,2 M de 9M26 − 793,5 M de 9M25 = 1.104,0 M [4, 28, 23]. El BPA ajustado del 3T26 (2,26 USD) excluye además 59,9 M de amortización de intangibles adquiridos [28].\n\nLa columna amortizaciones de la cuenta es la de la cuenta de resultados (719,5 M en 2025), que ya incluye la amortización de intangibles adquiridos; el XBRL toma la del estado de flujos (726,9 M en 2025, unos 7-11 M más cada año), por eso su EBITDA es algo mayor [4, 3].';

// ---------- trimestres ----------
const T = A.trimestres;
T.items = T.items.filter(x => x.periodo !== '3T24');
const vc = { '4T24': 'En línea', '1T25': 'Superior', '2T25': 'Superior', '3T25': 'Superior', '4T25': 'Superior', '1T26': 'Superior', '2T26': 'Superior' };
for (const x of T.items) x.vs_consenso = vc[x.periodo] ?? x.vs_consenso;
T.items.push({ periodo: '3T26', ingresos: 1692.5, crecimiento_pct: 10, crecimiento_organico_pct: 9, ebitda: 560.2, margen_ebitda_pct: 33.1, bpa: 2.26, vs_consenso: 'Superior' });
T.ultima_presentacion = 'EBITDA y BPA de la tabla son los ajustados de la empresa; el crecimiento orgánico es el de moneda local sin compras. En BPA ajustado, Equifax batió el consenso previo en siete de los ocho trimestres (4T24 en línea): en el 3T26 dio 2,26 USD frente a 2,20 de consenso (2,19 según otra fuente) y a una guía de 2,15-2,25; el BPA diluido contable fue de 1,79 USD (+39 %) [28, 31, 32, 33, 12].\n\nEn el 2T26 la dirección mantuvo la guía contable, anunció Círculo de Crédito (750 M) y dobló a 150 M el ahorro por inteligencia artificial [18, 12]. Los analistas preguntaron sobre todo por los contratos de gobierno (100 M de negocio nuevo, efecto en 2027), la adopción de Vantage a 1 USD, la sostenibilidad de Talent Solutions y el escenario hipotecario; la dirección no dio cifras de crecimiento de gobierno ni de 2027 [34].\n\nEn el 3T26 el tono cambia: el mercado hipotecario se debilitó en la segunda mitad del trimestre y la guía de ingresos de 2026 baja unos 80 M, a 6.646-6.676 M, con originaciones del -6,5 % al -7,5 %; el BPA ajustado queda en 8,45-8,55 USD (8,39-8,69 antes) y el margen sin FICO sube 100 pb en vez de 75 gracias a los costes [28, 29]. Mensajes nuevos: unos 2.000 prestamistas ya usan Vantage, 550 M de contratos de gobierno firmados en el año, y una estimación de 80 M de ingresos y 38 M de margen en riesgo si las hipotecas de las agencias pasan a dos burós [29]. La guía del 4T26 (2,07-2,17 USD) deja el BPA plano frente al 4T25 (2,09) [29, 4].';
T.confianza = 'Media';

// ---------- balance ----------
const B = A.balance;
B.vencimientos = [
  { anio: '2026', importe: 157.7 }, { anio: '2027', importe: 750 }, { anio: '2028', importe: 825 },
  { anio: '2029', importe: 1150 }, { anio: '2030', importe: 600 }, { anio: '2031+', importe: 1750 },
];
B.vida_media_anios = 3.6;
B.liquidez = 'A 30-sep-26: caja de 192,9 M y deuda a corto de 157,7 M, casi todo papel comercial, respaldado por la línea revolving de 2.000 M (1.900 M vencen en agosto de 2029 y 100 M en agosto de 2028) [28, 21]. Estimación propia, a falta del 10-Q: unos 1.840 M disponibles en la línea y una liquidez total de unos 2.000 M, de la que saldrá el pago de Círculo de Crédito (750 M de valor empresa) en el 4T26. En julio de 2026 la empresa emitió 1.000 M en bonos para amortizar papel comercial: a 30-jun-26 el papel comercial era de 1.397 M y la línea disponible, de 602 M [30, 21].';
B.comentario = 'La deuda bruta pasa de 2.672 M en 2016 a 5.787 M en 2022, empujada por Kount, Appriss Insights y el capex de la nube, y se estabiliza en torno a 5.100 M en 2024-2025 [3]. A 30-sep-26 es de 5.206,7 M (157,7 M a corto y 5.049,0 M a largo) con 192,9 M de caja: deuda neta de 5.013,8 M, frente a 4.912,5 M a dic-25 [28]. En el año la empresa devolvió el bono de 275 M que vencía en junio de 2026 (276,4 M de pagos de deuda a largo) y en julio emitió 500 M al 5,000 % con vencimiento en agosto de 2029 y 500 M al 5,650 % en agosto de 2033, con los que bajó el papel comercial de 1.397 M a 30-jun a unos 158 M a 30-sep; las recompras de 652 M de 9M26 se financiaron con deuda [28, 30]. Falta por pagar Círculo de Crédito (750 M de valor empresa, cierre previsto en el 4T26), que llevaría la deuda neta a unos 5.760 M (estimación propia) [28, 29]. El coste medio de la deuda es del 4,2 % (212,3 M de intereses sobre 5.076 M de deuda media en 2025); los bonos nuevos pagan más y el gasto por intereses del 3T26 sube a 62,3 M desde 52,2 M [1, 28]. La vida media, estimación propia por los vencimientos nominales a 30-sep-26, es de unos 3,6 años; el próximo bono vence en diciembre de 2027 (750 M al 5,10 %) [30]. Fondo de comercio e intangibles suman 8.070 M a 30-sep-26, 1,8 veces el patrimonio: el patrimonio tangible es negativo [28].';
B.otros_pasivos = B.otros_pasivos.replace('a 30-jun-26 la ratio de covenant era de 2,56 veces [1, 21].', 'a 30-jun-26 la ratio de covenant era de 2,56 veces; la de 30-sep-26 saldrá en el 10-Q, aún no presentado [1, 21].')
  + ' En el 2T26 la empresa provisionó 100,0 M por un acuerdo judicial sobre un error de codificación ya comunicado, con 60,0 M que espera recuperar del seguro (cargo neto de 40,0 M) [12]. Minoritarios con opción de venta a 30-sep-26: 120,8 M [28].';

// ---------- flujos ----------
A.flujos.comentario = A.flujos.comentario.replace(
  'en los doce meses a junio de 2026, 507 M [3, 2].',
  'en los doce meses a septiembre de 2026, 508,9 M (378,9 M en 9M26 frente a 351,4 M en 9M25) [3, 28]. El flujo operativo de 9M26 es de 1.142,1 M, casi igual que el de 9M25 (1.144,9 M) pese al mayor beneficio, por más circulante (cuentas a cobrar −91,7 M y otros activos −95,7 M); el flujo libre de los doce meses a septiembre es de 1.104 M [28].'
).replace('Guía de 2026: flujo libre de más de 1.000 M y conversión de al menos el 100 % del beneficio ajustado [19, 21].', 'Guía de 2026, reiterada en octubre: flujo libre de más de 1.000 M y conversión de al menos el 100 % del beneficio ajustado [29].');

// ---------- capital ----------
const C = A.capital;
C.politica = 'El dividendo estuvo congelado en 1,56 USD por acción de 2017 a 2024; en 2025 subió a 0,50 USD trimestrales (1,89 USD en el año) y en 2026 a 0,56 USD, un 12 % más [1, 2, 19, 28]. En abril de 2025 el consejo aprobó un programa de recompras de hasta 3.000 M sin fecha de vencimiento: se ejecutaron 927,5 M en 2025 (4,0 M de acciones) y 652,0 M en 9M26 (260 M en el 1T, 300 M en el 2T y 92 M en el 3T, este último por 0,5 M de acciones); quedarían unos 1.420 M autorizados (estimación propia, a falta del 10-Q) [1, 13, 12, 28]. Las acciones en circulación bajan de 120,4 M a dic-25 a 117,1 M a sep-26 [28]. La dirección prioriza compras complementarias que aumenten el beneficio por acción (Círculo de Crédito), recompras y mantener el grado de inversión con un apalancamiento por debajo de tres veces el EBITDA ajustado [18, 28].';
const circ = C.adquisiciones.find(x => x.anio === '2026');
if (circ) circ.resultado = 'Cierre previsto en el 4T26, confirmado el 20-oct-26. Según la empresa, Círculo creció un 24 % en ingresos en los doce meses a septiembre de 2026 con un margen EBITDA ajustado del 47 % (30 % y 44 % en 2025; cifras de Círculo convertidas a 17,37 pesos por dólar) y aumentará el BPA ajustado el primer año. Múltiplo sobre el EBITDA ajustado esperado de 2026 con sinergias [12, 29].';
C.comentario = 'De 2016 a 2025 Equifax generó 9.720 M de flujo operativo y destinó 4.222 M a capex, 6.131 M a adquisiciones, 1.910 M a dividendos y 1.075 M a recompras; la diferencia se financió con deuda, que pasó de 2.672 a 5.093 M [3]. Las compras grandes (Veda, Kount, Appriss Insights, Boa Vista) llevaron el fondo de comercio de 3.974 a 6.746 M sin deterioros [3, 1]. Hasta 2024 la caja se fue a la nube y a compras; desde 2025, con el capex en descenso, la retribución sube: 1.160 M devueltos en 2025 y 851 M en 9M26 (652 M en recompras y 199 M en dividendos), por encima del flujo libre del periodo (763 M), así que la deuda neta sube [21, 28]. El ritmo de recompras se frena en el 3T26 (92 M) ante el pago de Círculo de Crédito [28]. Las acciones diluidas apenas cambian entre 2016 y 2024 (121 a 125 M) y bajan a 118,1 M en el 3T26 [3, 28].';

// ---------- negocio.kpis ----------
const K = A.negocio.kpis;
const kp = n => K.find(x => x.kpi.startsWith(n));
Object.assign(kp('Registros activos'), { valor_anterior: '209 M (dic-25)', valor_actual: '223 M (sep-26)', variacion: '+12 % interanual', comentario: 'Registros totales, activos e históricos: 813 M a dic-25 y 863 M a sep-26; los registros vigentes son 125 M sobre 110 M de números de la seguridad social, frente a unos 250 M de estadounidenses con ingresos [1, 29].' });
Object.assign(kp('Consultas hipotecarias'), { valor_anterior: '+1 % interanual (2T26)', valor_actual: '-9 % interanual (3T26)', variacion: 'guía de originaciones de 2026: -6,5 % a -7,5 %', comentario: 'El mercado se debilitó en la segunda mitad del 3T26 al subir los tipos hipotecarios; en julio la guía era de una caída de un dígito bajo. La empresa calcula más de 1.000 M de ingresos y unos 700 M de margen adicionales si el mercado se recupera [29, 34].' });
Object.assign(kp('Ingresos hipotecarios'), { valor_anterior: '+25 % (2T26); USIS +40 %', valor_actual: '+15 % (3T26); USIS +28 % (un dígito bajo sin FICO), Workforce Solutions plano', variacion: 'guía 2026: dos dígitos altos, un dígito bajo sin FICO', comentario: 'Casi todo el crecimiento es precio, producto y FICO: en el 3T26 las consultas duras caen un 9 % y la hipoteca de USIS sube un 28 %, pero solo un dígito bajo sin la reventa de FICO (unos 100 M en el trimestre). La hipoteca de Workforce Solutions queda plana y supera al mercado en un dígito alto [28, 29].' });
Object.assign(kp('Gobierno'), { valor_anterior: 'unos 300 M de contratos firmados (1S26)', valor_actual: 'unos 550 M firmados en 9M26 (150 M nuevos y 400 M renovaciones); ingresos +un dígito medio en el 3T26', variacion: 'vuelve a crecer en el 3T26', comentario: 'Gobierno fue el 31 % de los ingresos de Workforce Solutions en 2025 (unos 800 M, estimación propia). El negocio nuevo cuenta sobre todo en 2027; la dirección habla de un mercado potencial de 5.000 M [22, 29, 34].' });
Object.assign(kp('Índice de vitalidad'), { valor_anterior: '17 % (4T25)', valor_actual: 'más del 17 % (3T26), récord', variacion: 'guía 2026: 15 % o más; objetivo a largo plazo: 10 %', comentario: 'Porcentaje de los ingresos del año que vienen de productos lanzados en los tres años anteriores y el año en curso [4, 28, 29].' });
Object.assign(kp('Verification Services'), { valor_anterior: '553,6 M (3T25)', valor_actual: '603,2 M (3T26)', variacion: '+9 %; sin hipoteca, +13 %', comentario: 'En 2025 sumó 2.179,8 M (+8 %). Employer Services cae un 5 %, a 90,7 M, en el 3T26 [4, 28, 29].' });
Object.assign(kp('Margen EBITDA ajustado sin FICO'), { valor_anterior: '33,5-34,0 % (guía de julio, +75 pb)', valor_actual: '33,8-34,1 % (guía de octubre, +100 pb); 35,2 % en el 3T26', variacion: '+130 pb en el 3T26', comentario: 'Contable: 31,7-32,0 % en la guía de octubre (31,3-31,8 % en julio) y 33,1 % en el 3T26. La mejora viene de costes e inteligencia artificial (objetivo de 150 M de ahorro); la conversión total a Vantage aportaría unos 35 M de margen [29, 21].' });

// ---------- calidad ----------
A.calidad.senales.push({ senal: 'Acuerdo judicial por un error de codificación (2T26)', nivel: 'Baja', comentario: 'Provisión de 100,0 M, con 60,0 M que espera cobrar del seguro; cargo neto de 40,0 M excluido del ajustado [12].' });

// ---------- huecos ----------
A.huecos = A.huecos.filter(h => !h.campo.startsWith('Comparación con el consenso') && !h.campo.startsWith('Preguntas de los analistas'));
A.huecos.push(
  { seccion: 'Resultados recientes', campo: 'Preguntas de los analistas en la conferencia del 3T26', tipo: 'Complemento', intentos: '1) web de inversores: a 20-oct solo están la presentación y el comunicado, sin resumen de la conferencia; 2) Earnings Whispers: la transcripción del 3T26 aún no está publicada (sí la del 2T26, usada); 3) búsqueda de prensa del 20-oct sin crónicas de la conferencia', decision: 'Omitido' },
  { seccion: 'Balance', campo: 'Línea disponible, ratio de covenant y autorización de recompra a 30-sep-26', tipo: 'Complemento', intentos: '1) 10-Q del 3T26: no presentado a 20-oct (lista de presentaciones de EDGAR); 2) comunicado y presentación del 3T26, sin el dato; 3) calculado con la línea de 2.000 M menos la deuda a corto, y el programa de 3.000 M menos las recompras de 2025 y 9M26', decision: 'Calculado y marcado como estimación' },
);
A.notas_integrador = A.notas_integrador + ' Iteración 20-oct: trimestres, LTM, puente y capital actualizados con el 3T26; el 10-Q del 3T26 no estaba presentado. Puente a 30-sep-26: deuda 5.206,7 M (157,7 corto + 5.049,0 largo), caja 192,9 M; Círculo (750 M) sin pagar. Guía 2026 de octubre: ingresos 6.646-6.676 M, BPA ajustado 8,45-8,55 USD, EBITDA ajustado 2.116-2.133 M (31,7-32,0 %); 4T26: 1.605-1.635 M y 2,07-2,17 USD [29].';

writeFileSync(ruta, JSON.stringify(A, null, 2) + '\n', 'utf8');
console.log('A.json actualizado');
