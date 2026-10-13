// actualizacion-v3.mjs — Intuitive Surgical v3 (13 oct 2026): metodología del 10-oct (prueba de sostenibilidad del
// crecimiento, `dcf.sostenibilidad`) y, como la prueba falla, caso base rebajado al crecimiento financiable (lectura
// prudente, decisión del usuario del 13-oct), todo en la misma versión.
// Sin investigación nueva: parte de datos-v2.json (v2 = referencia de mercado con la prima implícita de Damodaran),
// borra calc y añade el puente de ingresos, el mercado final y el veredicto. Mismo precio (404,76 USD) y corte (6-oct).
//
// Por qué falla la v2: la proyección reinvertía el 20 % del NOPAT (capex de 12 % de las ventas bajando al 8 % en 2035,
// con una amortización que sube al 7,5 %), lo que al ROIC del 30,2 % financia un 5,9 % anual frente al 10,8 %
// proyectado, y suponía que el capital nuevo rendía un 45,8 % frente a un incremental histórico del 24,6 % (control
// del motor: 1,25 × 30,2 % = 37,8 %). El exceso no viene del margen: el NOPAT sobre ventas de 2035 (25,5 %) es el de 2025
// (25,4 %). Viene de que el capital por unidad de ventas caía de 0,84 a 0,66: la proyección crecía casi sin invertir.
// Cambios mínimos:
//  1) Capex (incluidos los sistemas cedidos en arrendamiento) en el 12 % de las ventas hasta 2033 y 11,5 % en 2034-2035,
//     en vez de bajar al 8 %: es el nivel de 2025 (12,3 %), con más de la mitad de las colocaciones en arrendamiento
//     (51 % en 2025, 54 % en el 2T26) y en aumento. Al final, la inversión neta (4 puntos de las ventas más circulante)
//     es la que pide crecer al 5 % con la intensidad de capital de hoy.
//  2) Crecimiento de 2029e-2034e un punto (dos en 2031e-2032e) más bajo: 11/10/9/8/7/6 % en vez de 12/11,5/11/10/9/7 %;
//     2026e (fijo), 2027e-2028e (consenso) y 2035e (5 %) sin cambios.
// Resultado: crecimiento medio del 9,8 % frente a un financiable del 8,1 % más ≈ 1,7 puntos de precio y mezcla que no
// piden capital (puente); capital nuevo al 30,7 % (≤ 1,25 × el histórico).
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/intuitive-2026-10-06/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// 1. Caso base al crecimiento financiable.
const CAMBIOS = {
  '2028e': { capex_pct_ventas: 12 },
  '2029e': { crecimiento_pct: 11, capex_pct_ventas: 12 },
  '2030e': { crecimiento_pct: 10, capex_pct_ventas: 12 },
  '2031e': { crecimiento_pct: 9, capex_pct_ventas: 12 },
  '2032e': { crecimiento_pct: 8, capex_pct_ventas: 12 },
  '2033e': { crecimiento_pct: 7, capex_pct_ventas: 12 },
  '2034e': { crecimiento_pct: 6, capex_pct_ventas: 11.5 },
  '2035e': { capex_pct_ventas: 11.5 },
};
for (const [p, c] of Object.entries(CAMBIOS)) {
  const a = d.dcf.anios.find((x) => x.periodo === p);
  if (!a) throw new Error(`Falta ${p}`);
  Object.assign(a, c);
}

// 2. Prueba de sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 13, precio_pct: 2, otros_pct: 1.8,
      comentario: 'Volumen: procedimientos da Vinci e Ion, con guía del 13,5-15,5 % (+16 % y +15 % en el 1T y el 2T) y colocaciones de sistemas al +18 % en el 1S26 [20, 21]. Precio y mezcla: el I&A por procedimiento sube a ≈ 1.880 y ≈ 1.830 USD (+2-6 %) por el da Vinci 5 y el SP, y el ASP del da Vinci pasó de 1,50 a 1,59 M USD [7, 25, 26]. Otros: los distribuidores de Italia, España y Portugal, consolidados desde marzo, y la divisa [7]. Reparto, estimación propia.' },
    { periodo: '2027e', volumen_pct: 11, precio_pct: 2, otros_pct: 0,
      comentario: 'Volumen: procedimientos hacia el 11-12 %, con EE. UU. (68 % de las ventas) al +12 % en el 2T26 y fuera de EE. UU. más rápido [1, 26]. Precio y mezcla: más da Vinci 5 en la base (algo más de 1.700 sistemas en el 2T26) [26]. El consenso da +12,8 % [83].' },
    { periodo: '2028e', volumen_pct: 10.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Igual que 2027e, con la cirugía cardiaca del da Vinci 5 (≈ 160.000 procedimientos al año a su alcance) [33]. El consenso da +12,7 % [83].' },
    { periodo: '2029e', volumen_pct: 9.5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Menos precio: Ottava y Hugo en los concursos de EE. UU. y la compra centralizada en China, donde 11 de los 13 robots aprobados son locales [34, 38, 41]. Estimación propia.' },
  ],
  // La cuota publicada (≈ 83 %) es de unidades multipuerto vendidas en 2024, no de ingresos, y los ingresos de Intuitive
  // incluyen Ion, que la serie de Frost & Sullivan deja fuera; además la serie acaba en 2028e. Sin perímetro comparable:
  // la prueba de cuota se hace a mano en la justificación.
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte; el caso base ya está dentro de lo financiable. Foso amplio (≈ 83 % de las unidades, cirujanos formados en da Vinci) y poder de precios pequeño: I&A por procedimiento +2-6 % por mezcla [26, 34]. Crecer exige capital: la mitad de las colocaciones va en arrendamiento [1]. La versión anterior suponía que el capital nuevo rendía un 45,8 % (incremental histórico: 24,6 %); ahora el capex se queda en el 12 % y el crecimiento medio (9,8 %) es el financiable (8,1 %) más ≈ 1,7 puntos de precio. Cuota: 14.944 M USD en 2028e sobre un mercado de 18.422 M, el 81 % de 2025, y luego menos crecimiento que el mercado [34].',
};

// 3. Textos reescritos con las cifras de calc. La convicción se queda en Baja aunque los criterios del motor sugieran
// Alta: la discrepancia sigue siendo de tasa de descuento y no hay catalizador con fecha que la cierre (síntesis).
const T = {
  'resumen.recomendacion': 'Vender',
  'resumen.conviccion': 'Baja',

  'resumen.sintesis': [
    '**La recomendación y por qué.** Vender, con convicción baja. El valor objetivo es de 199,71 USD frente a una cotización de 404,76 USD: una rentabilidad total esperada del −50,7 %, sin dividendo. Ni el escenario alcista (−35,1 %) llega al precio, y el bajista pierde un 63,7 % (asimetría de −0,55x). Con nuestras cifras, el precio rinde un 5,3 % anual, lo mismo que el Tesoro. Los criterios sugieren convicción alta; la dejamos en baja porque la discrepancia es de tasa de descuento, el mercado ha pagado 49x el EBITDA de media una década y ningún catalizador con fecha la cierra. La subiríamos con una guía de procedimientos de 2027 por debajo del 12 %.',
    '**El negocio.** Tiene ≈ 83 % de los robots de cirugía endoscópica vendidos en el mundo y 11.710 sistemas instalados [7, 34]. El 84 % de los ingresos es recurrente (instrumentos con chip, servicio y arrendamientos) [1]. Su ROIC es del 30,2 %, frente a un WACC del 10,1 %, con caja neta de 8.455 M USD. El foso es amplio, pero se estrecha: la FDA autorizó Hugo (Medtronic) en diciembre de 2025 y Ottava (J&J) en julio de 2026, y en China 11 de los 13 robots aprobados son locales [34, 38, 41]. Su calidad sostiene el crecimiento que proyectamos solo en parte: crecer exige capital (la mitad de los sistemas va en arrendamiento) y la versión anterior crecía casi sin invertir. Hemos rebajado el caso base a lo financiable: capex del 12 % de las ventas y crecimiento medio del 9,8 % (8,1 % financiable al ROIC actual más ≈ 2 puntos de precio).',
    '**Finanzas.** Ingresos al 15,7 % anual en 2016-2025 y margen EBITDA GAAP del 37,9 % en los últimos 12 meses. Tres ajustes que el mercado no hace: la remuneración en acciones (788 M USD) no está en el EBITDA del consenso; el tipo fiscal está rebajado por el ejercicio de acciones; y el capex no incluye los sistemas cedidos en arrendamiento (808,9 M USD en 2025), que el DCF sí cuenta [1]. Calidad contable alta: Beneish M de −2,43 y Piotroski F de 8.',
    '**Equipo y gobierno.** Suman, con matices. Superó la guía de procedimientos cinco años seguidos y la sucesión de Guthart por Rosa fue ordenada [19, 29]. Restan las ventas de la dirección (93,4 M USD en 12 meses, sin compras), un variable sin métricas de rentabilidad y una reforma de estatutos sin pasar por la junta [60, 63].',
    '**Valoración.** Todos los métodos coinciden: DCF 200,29 USD, comparables 192,69 USD y escenarios 202,52 USD. Según el DCF inverso, para pagar el precio los ingresos tendrían que crecer un 21,4 % anual en 2027-2035, frente a nuestro 9,1 % y a la guía de procedimientos del 13,5-15,5 %; con nuestro crecimiento, ningún margen lo justifica. A 28,6x el EBITDA de los próximos 12 meses, vale el doble que sus pares (13,7x) y el mínimo de su década (media de 49x, con el Tesoro entre el 0,52 % y el 4,98 %; hoy, 5,27 %) [149]. Discrepamos del mercado sobre todo en el coste del capital: nuestros ingresos de 2026-2028 coinciden con el consenso.',
    '**Riesgos y catalizadores.** El mayor riesgo para la recomendación es una bajada de tipos: con un WACC del 9,1 % y un terminal del 4 %, el valor sube a 232,27 USD (+16 %), aún un 43 % bajo el precio. Para el negocio, el precio en EE. UU. tras Ottava y Hugo (bajista, 146,91 USD). Catalizadores: resultados del 3T26 el 20-oct-2026 y la guía de procedimientos de 2027 en enero [86].',
    '**Qué cambiaría la decisión.** Compraríamos por debajo de 173,55 USD y mantendríamos entre 173,55 y 222,08 USD. Revisaríamos al alza con una guía de procedimientos de 2027 del 15 % o más o el Tesoro por debajo del 4,25 %, y a la baja si el ingreso por procedimiento cae de 1.800 USD.',
  ].join('\n\n'),

  'resumen.tesis': [
    'Intuitive es el estándar de la cirugía robótica de tejidos blandos: ≈ 83 % de las unidades vendidas, 11.710 da Vinci instalados y 3,15 millones de procedimientos en 2025 (+18 %), cada uno con ≈ 1.830 USD de instrumentos que solo vende ella [1, 7, 26, 34]. El modelo de cuchilla y cartuchos da un 84 % de ingresos recurrentes, un margen EBITDA GAAP del 37,9 %, un ROIC del 30,2 % y 8.625,5 M USD de caja sin deuda [1, 7].',
    'El precio de 404,76 USD descuenta mucho más que eso. Equivale a 28,6x el EBITDA de los próximos 12 meses y 39,2x el beneficio, el doble que sus pares. Según el DCF inverso, o los ingresos crecen al 21,4 % anual hasta 2035 (más del doble de nuestro caso base y más que su propia historia), o el inversor se conforma con un 5,3 % anual con el Tesoro al 5,27 % [92]; con nuestro crecimiento, ningún margen lo justifica.',
    'El mercado acierta en la calidad y se equivoca en el precio. Las estimaciones han subido un 13,1 % en 12 meses mientras la acción caía un 28,5 % en el año: el múltiplo se está ajustando a tipos más altos y a un crecimiento de procedimientos que ha pasado del 18 % al 13,5-15,5 % [21, 79, 85]. Para invertir hay que creer que los tipos volverán a bajar con fuerza o que Intuitive crecerá al 15 % otra década pese a Ottava, Hugo y China, y sin invertir más en sistemas cedidos. Ninguna de las dos es nuestro caso base.',
  ].join('\n\n'),

  'resumen.vision_diferencial.nuestra_vision': 'Compartimos las cifras a tres años: nuestros ingresos 2026-2028 difieren del consenso un 0,2 % como mucho. Después crecemos algo menos (del 11 % en 2029 al 5 % en 2035), lo que la empresa puede financiar con un capex del 12 % de las ventas. Y no compartimos el precio que se paga por ellas. Con el Tesoro al 5,27 %, la prima de mercado de Damodaran al 4,20 % y una beta de 1,15, el coste del capital es el 10,1 %. A ese coste, el negocio vale 200,29 USD por acción. El precio solo se sostiene con un 5,3 % de rentabilidad, o con un crecimiento del 21,4 % anual durante nueve años.',
  'resumen.vision_diferencial.por_que': 'La media histórica de 49x se formó con el Tesoro entre el 0,52 % y el 4,98 %, y desde enero ha subido 108 puntos básicos, hasta el 5,27 % [149]. Además, la guía de 2026 es la primera en años que se estrecha en vez de subir [21]. Dos cambios estructurales, no cíclicos. Podríamos equivocarnos si los tipos bajan: con un WACC del 9,1 % y un crecimiento terminal del 4 %, el valor sería de 232,27 USD, todavía un 43 % por debajo del precio.',
  'resumen.en_contra.0': '**El precio descuenta un 5,3 % de rentabilidad**, lo mismo que el Tesoro a 10 años (5,27 %) [92].',
  'resumen.en_contra.1': '**El DCF inverso exige un 21,4 % de crecimiento anual** de 2027 a 2035, frente a una guía de procedimientos del 13,5-15,5 % [21].',
  'resumen.cambiaria_recomendacion.0': 'Precio por debajo de 222,08 USD: pasaríamos a Mantener; por debajo de 173,55 USD, a Comprar.',

  'dcf.justificacion.crecimiento': '2026e se fija en el 16,8 %, igual que el consenso (11.755 M USD), con dos trimestres publicados (+23 % y +18,5 %) y los distribuidores de Italia, España y Portugal dentro desde marzo [20, 21, 83]. Para 2027-2028 se usa el 13,0 % y el 12,5 %, en línea con el consenso (12,8 % y 12,7 %) y con la guía de procedimientos del 13,5-15,5 % menos la presión de precio en China y el menor peso de los sistemas [21, 83]. Después, 11 % en 2029 y un punto menos cada año hasta el 5 % en 2035 (media del 9,8 % en 2026-2035). Es lo que la empresa puede financiar: la prueba de sostenibilidad mostró que la senda anterior (12 % en 2029, 9 % en 2033) suponía que el capital nuevo rendía un 45,8 %, frente a un ROIC incremental del 24,6 %. Es menos que el 15,7 % de TCAC de 2016-2025, porque EE. UU. (68 % de las ventas) crece ya al 12 % en procedimientos y la base es diez veces mayor que en 2016 [1, 26]. El sector crecería al 16,1 % en 2024-2029 según Frost & Sullivan, pero Intuitive es el 83 % de ese mercado y la entrada de rivales recorta su parte del crecimiento [34].',
  'dcf.justificacion.inversion': 'La inversión total suma el capex de caja y los sistemas cedidos en arrendamiento operativo, que se fabrican en existencias y pasan al inmovilizado sin salir por la línea de capex: 808,9 M USD en 2025 (8,0 % de las ventas) frente a 539,8 M de capex [1]. Juntas fueron el 12,3 % de las ventas en 2025 (netas de 106 M de devoluciones) y el 21 % en 2023-2024, con las obras. Se proyecta el 12 % en 2026-2033 y el 11,5 % en 2034-2035, por encima de la amortización (del 6,5 % al 7,5 %, que ya incluye la de los sistemas arrendados) [1]. La versión anterior bajaba al 8 %: el capital por unidad de ventas caía de 0,84 a 0,66 y el crecimiento salía casi gratis. Con más de la mitad de las colocaciones en arrendamiento (51 % en 2025, 54 % en el 2T26), la inversión crece con los sistemas colocados [1, 26]. Circulante comercial del 31 % de las ventas (30,9 % en 2025), bajando al 29 %. Tipo fiscal del 19 %, entre el GAAP de 2025 (13,1 %) y el no GAAP guiado (22-23 %) [1, 26].',
  'dcf.justificacion.terminal': 'Valor terminal como media de dos métodos. Gordon con un crecimiento del 3,0 % (1-1,5 % real más ≈ 2 % de inflación en USD, por debajo del 5 % del último año proyectado) da un valor que equivale a solo 7,5x el EBITDA de 2035. Es menos que el múltiplo actual de cualquier comparable maduro (Medtronic 11,7x, Boston Scientific 10,9x, Zimmer 8,4x en los próximos 12 meses) [99, 103, 131]. Por eso se promedia con un múltiplo de salida de 13x, la zona de Stryker y Abbott hoy (14,2x y 14,0x) [95, 107]: en 2035 Intuitive crecería al 5 %, como ellos. La media sube el valor un 19 % frente a Gordon puro (168,58 USD), y el valor terminal pesa el 67 % del valor empresa, por debajo del límite del 80 %.',
  'dcf.lectura': 'El DCF da 200,29 USD por acción, un 50,5 % por debajo de los 404,76 USD de cotización, con un rango de 188,95-214,25 USD al mover WACC y crecimiento terminal medio punto. El valor terminal pesa el 67 %. Qué hace falta creer para pagar el precio: el DCF inverso responde de tres formas. Con nuestro WACC, los ingresos tendrían que crecer un 21,4 % anual de media en 2027-2035, más del doble que nuestro 9,1 % y por encima del 15,7 % histórico, con una base diez veces mayor; Intuitive facturaría en 2035 más de 60.000 M USD. Con nuestro crecimiento, ningún margen EBITDA lo justifica, ni el 69 %, frente al 39 % y a un máximo histórico del 38,5 %. Y con nuestras cifras, el precio implica una rentabilidad anual del 5,3 %, lo mismo que el Tesoro a 10 años (5,27 %). Ninguna es razonable: el mercado paga la calidad de Intuitive como si los tipos siguieran en el 2 %. Nuestros ingresos de 2026-2028 coinciden con el consenso (±0,2 %); después crecen lo que la inversión puede pagar. La discrepancia principal está en el precio que se paga por ellos.',

  'escenarios.casos.1.narrativa': 'Procedimientos al 13-15 % en 2026-2027 y desaceleración gradual (11 % en 2029, un punto menos cada año) hasta el 5 % en 2035, con el da Vinci 5 y la expansión fuera de EE. UU. compensando la madurez de urología y ginecología en EE. UU.; margen EBITDA GAAP estable en torno al 39 % y una inversión del 12 % de las ventas, con los sistemas en arrendamiento dentro.',
  'escenarios.comentario': 'La asimetría es desfavorable en los tres escenarios: el alcista (262,60 USD) queda un 35,1 % por debajo del precio, el base un 50,5 % y el bajista (146,91 USD) un 63,7 %. Incluso con dos puntos y medio más de crecimiento cada año, dos puntos más de margen y medio punto menos de WACC, el DCF no llega a la cotización. El valor ponderado (202,52 USD) apenas se mueve frente al base, porque el bajista y el alcista son casi simétricos en valor. Lo que haría falta para justificar 405 USD no es un escenario operativo sino de tipos: con nuestras cifras, el precio implica una rentabilidad anual del 5,3 %. El bajista es verosímil: es lo que ya ocurre en China y lo que le pasó a la laparoscopia al madurar.',
  'valoracion.comentario': 'El DCF pesa un 60 % porque es el único método que recoge lo que distingue a Intuitive: crecimiento de dos dígitos durante años, ROIC del 30 % y caja neta. Los escenarios ponderados pesan un 25 % para incorporar la dispersión de resultados. Los comparables, un 15 %: los pares crecen menos o tienen peor ROIC, y la regresión no explica los múltiplos. Las transacciones, cero: nadie puede comprar una empresa de ≈ 143.000 M USD. Lo llamativo es que todos los métodos coinciden: DCF 200,29 USD, comparables 192,69 USD y escenarios 202,52 USD, con un valor objetivo de 199,71 USD. Solo dos referencias están por encima del precio: el precio objetivo medio de los analistas (477,21 USD) y el rango de cotización de las últimas 52 semanas (328,57-603,88 USD). El puente es limpio: sin deuda, 8.625,5 M de caja e inversiones, 129,3 M de minoritarios de la empresa conjunta con Fosun y 170,9 M de arrendamientos (estos, contados dos veces porque el alquiler ya está en el EBITDA, pero son el 0,1 % del valor) [7].',

  'riesgos.items.0.efecto_valor': '+16 % (WACC del 9,1 % y g del 4 %: 232,27 USD en la tabla de sensibilidad)',
  'riesgos.items.1.efecto_valor': '−27 % (escenario bajista: 146,91 frente a 200,29 USD)',
  'riesgos.items.2.efecto_valor': '−5 % por cada punto menos de crecimiento anual (189,60 frente a 200,29 USD en la tabla de crecimiento y margen)',
  'riesgos.items.5.efecto_valor': '−3 % por cada punto de margen EBITDA (194,14 frente a 200,29 USD)',
  'preguntas.items.0.por_que': 'El DCF inverso exige un 21,4 % anual de crecimiento de ingresos; cada punto de crecimiento mueve el valor ≈ 5 %.',
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
console.log(`datos-v3.json escrito (${Object.keys(T).length} textos).`);
