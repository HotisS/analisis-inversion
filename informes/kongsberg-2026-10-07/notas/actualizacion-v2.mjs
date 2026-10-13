// actualizacion-v2.mjs — Kongsberg v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad`.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/kongsberg-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// Recorte del caso base (lectura prudente, decisión del usuario del 13-oct): la prueba de cuota, hecha a mano
// porque competencia.cuota_pct es null, daba una cuota final de 2,0 veces la de 2025. Se mantienen 2026e (fijo)
// y 2027e (dos tercios en cartera) y se baja 2028e-2035e hasta que la cuota final quede en ≤ 1,5 veces.
for (const [p, g] of Object.entries({ '2028e': 25, '2029e': 9, '2030e': 5, '2031e': 4.5, '2032e': 4, '2033e': 3.5, '2034e': 3.5, '2035e': 3.5 })) {
  const a = d.dcf.anios.find((x) => x.periodo === p);
  if (!a) throw new Error(`Falta ${p}`);
  a.crecimiento_pct = g;
}
// El alcista era «cumplir el plan del día del inversor»: con el base más bajo, +3 puntos ya no lo alcanzan.
d.escenarios.casos.find((c) => c.escenario === 'Alcista').ajuste_crecimiento_pp = 7;

d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 33.2, precio_pct: 1.5, otros_pct: 0, comentario: 'Entregas de la cartera: 19.328 M para el 2S26 y +28 % en el 1S26 [1, 2]. Los contratos son largos y de precio fijo (el 75 % se reconoce por grado de avance) [3]: el precio solo entra con los contratos nuevos (1,5 puntos, estimación propia).' },
    { periodo: '2027e', volumen_pct: 44.5, precio_pct: 1.5, otros_pct: 0, comentario: 'La cartera ya cubre 41.944 M de 2027 [1]; el resto exige nuevos pedidos y capacidad de misiles y NASAMS, el cuello de botella [1, 3].' },
    { periodo: '2028e', volumen_pct: 23.5, precio_pct: 1.5, otros_pct: 0, comentario: '91.484 M de cartera para 2028 y después, sobre todo misiles (50.177 M) [1, 2]; plantas nuevas en Noruega, EE. UU. y Australia hasta 2028 [1].' },
    { periodo: '2029e', volumen_pct: 7.5, precio_pct: 1.5, otros_pct: 0, comentario: 'Ambición de 100.000 M en 2029 (con JV y compras) [44]; el gasto de OTAN Europa y Canadá crece un 7,5 % anual previsto (estimación propia sobre [15]).' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. La calidad está: costes de cambio de décadas (NSM y JSM en 15 países, NASAMS en 14), cualificación OTAN, una cartera de 4,3 veces las ventas y anticipos que financian el circulante [1, 2, 3]. Pero el crecimiento es volumen (contratos de precio fijo) y la prueba es la cuota: el base anterior multiplicaba las ventas por 4,6 en diez años frente a 2,3 veces el gasto de OTAN Europa y Canadá, una cuota final de 2,0 veces la de 2025 [15]. Lo rebajamos hasta 1,5 veces: 2026e-2027e siguen a la cartera y desde 2028e el crecimiento converge al del mercado. El capital nuevo rinde más que el ROIC solo por la subida de margen que la guía avala.',
};

// Control que salta tras el recorte (la reinversión pasa del 12 % al 16 % del NOPAT y el motor ya no la trata como ligera).
d.meta.controles_explicados.push({
  control: 'Rendimiento del capital nuevo de la proyección',
  explicacion: 'El 54,9 % frente al tope de 50,5 % (1,25 × 40,4 %) sale de la subida del margen EBIT del 14,9 % de 2025 al 16,0 % de 2035e, que es el objetivo de «al menos el 16 %» de la empresa y ya se ve en el 1S26 (EBITDA del 20,1 %) [1, 44]. A margen de 2025, el capital nuevo rendiría un 49,7 %, dentro del tope. El ROIC del 40,4 % está inflado por los anticipos (circulante del −35,2 % de las ventas); por eso el crecimiento financiable (6,5 %) queda por debajo del 13,9 % medio, pero los años sin cartera (2028e-2035e) crecen un 7,3 %, lo financiable más 1,5 puntos de precio.',
});



// Textos reescritos con las cifras de calc (v2).
const T = {
  'resumen.recomendacion': 'Vender',
  'resumen.conviccion': 'Media',

  'resumen.sintesis': [
    '**La recomendación y por qué.** Vender, con convicción media. El valor objetivo es de 175,75 NOK, un 41,2 % por debajo del cierre de 299,00 NOK del 6-oct-2026, y la rentabilidad total esperada a 12 meses es del −40,5 %. El alcista (el plan de la dirección para 2029 y 2033 entero) vale 303,98 NOK, el precio; el bajista, 97,18 NOK: el precio paga el mejor caso razonable. Subimos la convicción de baja a media porque el Vender no depende de la tasa ni del recorte: con la prima del mercado el objetivo queda un 31,9 % abajo, y con el base anterior la rentabilidad era del −30,8 %. No es alta porque el recorte se apoya en una prueba de cuota frente al gasto total en defensa y el consenso (397,27 NOK) está muy por encima [58].',
    '**El negocio.** Tras la escisión de Maritime (23-abr-2026), Kongsberg es un fabricante de misiles (NSM, JSM), defensa aérea (NASAMS) y tecnología submarina, con una cartera de 152.756 M NOK, 4,3 veces las ventas de los últimos 12 meses [1, 2]. Crece un 28 % con un margen EBITDA del 18,6 % (2025) y un ROIC del 40,4 %, inflado por los anticipos. Foso estrecho que se amplía: costes de cambio y cualificación OTAN, con dependencia de Raytheon en NASAMS [3]. **La calidad sostiene el crecimiento solo en parte**: la cartera y los anticipos sostienen 2026-2027, pero el base anterior duplicaba la cuota sobre el gasto de OTAN Europa y Canadá en diez años; lo rebajamos a 1,5 veces la cuota actual (107.000 M de ventas en 2035, no 144.000 M) [15].',
    '**Finanzas.** El flujo de caja de 2024-2025 está inflado por los anticipos: los pasivos por contrato llegaron a 31.124 M a dic-25 y el 1S26 ya consumió unos 4.800 M [1, 3]. La caja neta bajó de 14.830 M a 1.704 M en seis meses (dividendo, Zone 5 y la caja de Maritime) [1]. La rentabilidad por flujo de caja libre es del 1,4 %.',
    '**Equipo y gobierno.** El Estado noruego tiene el 50,004 % [3]. Cumple 10 de 13 criterios de gobierno, pero la remuneración resta: más de la mitad del capital libre votó en contra en 2025, y el variable a largo plazo se cobra con un ROACE del 20 % frente al 95,5 % real [29, 31]. El CEO, Eirik Lie, es nuevo desde abril de 2026 [45].',
    '**Valoración.** El DCF da 168,63 NOK (WACC del 10,10 %, crecimiento terminal del 3,0 %). Con nuestras cifras, el precio rinde un 6,9 % anual, por debajo del WACC y también del 8,8 % que pide el mercado con su prima implícita del 4,20 % [56]. Con esa prima, el DCF subiría a 203,28 NOK y el valor objetivo a 203,50 NOK (−31,9 %, rentabilidad total del −31,2 % y asimetría de 0,44x): las dos reglas dan Vender. Para justificar 299 NOK con nuestro WACC hay que crecer un 20,4 % anual en 2027-2035, frente al 11,6 % de nuestro base. Los comparables dan 185,20 NOK. Patria y KSAT, valoradas por beneficio, suman 14.268 M (unos 16 NOK por acción).',
    '**Riesgos y catalizadores.** El riesgo de valoración pesa más que el operativo: ±0,5 puntos de WACC mueven el DCF de 158,34 a 180,50 NOK. Le siguen el margen (2T26 con EBIT del 16,1 %, por debajo de lo esperado [10]) y el fin del ciclo de rearme. Catalizadores: resultados del 3T26 el 29-oct-2026 y la firma del NASAMS de Kuwait [1].',
    '**Qué cambiaría la decisión.** Compraríamos por debajo de 169,42 NOK y mantendríamos entre 169,42 y 228,65 NOK. Revisaríamos al alza si los pedidos apuntan a más de 100.000 M de ventas en 2029, si el equipamiento crece de forma duradera por encima del gasto total en defensa o si el margen EBIT pasa del 18 % de forma sostenida.',
  ].join('\n\n'),

  'resumen.tesis': [
    'Kongsberg es hoy un contratista de defensa puro, con una cartera de 152.756 M NOK y un crecimiento de las ventas del 28 % en 2025 y del 28 % en el 1S26 [1, 2]. Sus productos estrella (NSM, JSM y NASAMS) tienen pocos rivales occidentales, y la OTAN se ha comprometido a gastar un 3,5 % del PIB en defensa en 2035 [14]. El ROIC (40,4 % en 2025) supera con creces el WACC del 10,1 %.',
    'El precio descuenta más que eso. A 299 NOK, Kongsberg cotiza a 20,7 veces el EBITDA de los próximos 12 meses y a 29,2 veces el beneficio, frente a 11,5 y 19,3 veces de mediana de sus pares [60]. El DCF inverso exige un crecimiento del 20,4 % anual en 2027-2035 con nuestro WACC, o aceptar una rentabilidad del 6,9 %. Nuestro alcista, que cumple el plan de 100.000 M en 2029 y 150.000 M en 2033 [44], vale 303,98 NOK: el precio. Ese plan supone que Kongsberg más que duplica su peso en el gasto de defensa de sus clientes en diez años.',
    'El mercado acierta en la calidad del negocio, pero no deja margen de error. Para invertir hay que creer que Kongsberg cumplirá su propio plan entero, o aceptar una rentabilidad por debajo de su coste de capital. Con un margen que ya falló en el 2T26 y anticipos que se están consumiendo, preferimos esperar a un precio por debajo de 169,42 NOK.',
  ].join('\n\n'),

  'resumen.vision_diferencial.nuestra_vision': 'Las cifras del consenso para 2026-2027 son razonables (nuestro base queda un 0,8 % y un 3,9 % por debajo), pero a partir de 2028 nos separamos: 77.588 M en 2028 frente a 86.427 M (−10,2 %), porque más allá de la cartera el crecimiento no puede seguir duplicando la cuota sobre el gasto en defensa. El precio paga el plan entero. Con un bono noruego al 4,68 % y una prima normal, el negocio vale 168,63 NOK.',
  'resumen.en_contra.1': '**El alcista ya está en el precio**: cumplir el plan de 2029-2033 vale 303,98 NOK.',
  'resumen.cambiaria_recomendacion.0': 'Si el precio baja de 169,42 NOK, pasaríamos a Comprar.',
  'resumen.cambiaria_recomendacion.1': 'Si la cartera con entrega en 2027 supera los 55.000 M NOK antes de dic-26 y los pedidos de 2028 en adelante siguen creciendo, subiríamos el base de 2028-2030 hacia el consenso.',

  'dcf.justificacion.crecimiento': '2026e (+34,7 %, fijo) queda en línea con el consenso (42.514 M frente a 42.858 M) con dos trimestres publicados (+28 % en el 1S26) y 19.328 M de cartera para el 2S26 [1, 58]. 2027e (+46 %) queda un 3,9 % por debajo del consenso: la cartera ya cubre 41.944 M de 2027 [1, 2]. Desde 2028e el base sale de la prueba de cuota: +25 % en 2028e (77.588 M, un 10,2 % por debajo del consenso), 9 % en 2029e y del 5 % al 3,5 % después, hasta 107.000 M en 2035. Así las ventas se multiplican por 3,4 en 2025-2035 frente a 2,3 veces el gasto de OTAN Europa y Canadá (+7,5 % anual previsto desde 2026e) [15]: la cuota acaba en 1,5 veces la actual. El plan de la empresa (100.000 M en 2029, 150.000 M en 2033, con JV y compras) queda en el alcista [44].',
  'dcf.justificacion.terminal': 'Gordon con crecimiento del 3,0 %: inflación objetivo del 2 % en Noruega más un 1 % real, coherente con la tasa libre del 4,68 % [54]. El valor terminal implica 8,8 veces el EBITDA de 2035, frente a 11,5 veces de mediana de los comparables a 12 meses: múltiplos de un sector en pleno ciclo de rearme, que no suponemos perpetuos [60]. El valor terminal pesa un 57 % del valor empresa. No se usa la etapa de transición: la proyección explícita ya llega a 2035, el horizonte del objetivo de gasto de la OTAN.',

  'dcf.lectura': 'El DCF da **168,63 NOK por acción, un 43,6 % por debajo del precio**, con el valor terminal en el 57 % del valor empresa y un rango de 153,23 a 188,92 NOK con WACC y crecimiento ±0,5 puntos. El DCF inverso dice que, con nuestro WACC del 10,10 %, el precio exige un **crecimiento anual de las ventas del 20,4 % en 2027-2035** (frente al 11,6 % de nuestro caso base, que ya está en el límite de lo que la cuota permite) o un margen EBITDA del 32,4 % (frente al 19,5 %). Dicho de otra forma: con nuestras cifras, el precio rinde un **6,9 % anual**, por debajo de nuestro coste de capital (10,1 %) y también del 8,8 % que pide hoy el mercado con su prima implícita. Para justificar 299 NOK hay que creer que Kongsberg cumple su plan de 2029 y 2033 entero, lo que supone más que duplicar su peso en el gasto de defensa de sus clientes, o aceptar una rentabilidad inferior incluso a la que pide hoy el mercado. Lo primero es nuestro alcista, que vale 303,98 NOK: el precio descuenta el plan de la dirección entero.',

  'escenarios.casos.0.narrativa': 'Un alto el fuego en Ucrania y la presión fiscal frenan los pedidos europeos; los programas se retrasan y la capacidad nueva se llena más despacio: 2027 crece un 34 % y 2028 un 15 % en vez de 46 % y 25 %, y después 3 puntos menos cada año. El margen EBITDA vuelve al 17-18 % de 2022-2024 por la mezcla, las donaciones y la dilución de Zone 5, como ya se vio en el 2T26 (EBIT del 16,1 % frente a ≈ 17 % esperado) [1, 10].',
  'escenarios.casos.1.narrativa': 'La cartera de 152.756 M se entrega a ritmo creciente: 62.100 M en 2027 y 77.600 M en 2028, por debajo del consenso, con margen EBITDA del 20-20,5 % y un periodo de inversión elevada hasta 2028 [1, 58]. Después el crecimiento converge al del gasto en defensa: 84.600 M en 2029 y unos 99.900 M en 2033, lejos de la ambición de la empresa (100.000 y 150.000 M), con una cuota final de 1,5 veces la actual.',
  'escenarios.casos.2.narrativa': 'Kongsberg cumple el plan del día del inversor: unos 99.600 M de ingresos en 2029 y 152.600 M en 2033, con nuevos clientes de JSM y NASAMS (Kuwait, Canadá, Alemania), SAFE financiando compras europeas y Discovery creciendo en protección submarina [1, 18, 44]. Supone más que triplicar la cuota sobre el gasto de OTAN Europa y Canadá. El margen EBITDA sube un punto por escala y el WACC baja medio punto.',
  'escenarios.comentario': 'La asimetría es desfavorable con nuestro WACC: el alcista, que supone cumplir el plan de 2029 y 2033 entero, vale 303,98 NOK (+1,7 %), y el bajista 97,18 NOK (−67,5 %). Es decir, el precio ya paga el mejor caso razonable. Con la prima implícita del mercado (WACC del 8,82 %), el alcista daría 381,58 NOK y el bajista 112,42 NOK, una asimetría de 0,44x: incluso con la tasa que acepta hoy el mercado, se pierde más en el bajista de lo que se gana en el alcista. El bajista no es cosmético: es crecer al 34 % y al 15 % en 2027-2028 con el margen de 2024, algo que la empresa ya ha vivido. El alcista pasa de +3 a +7 puntos anuales sobre el base para seguir siendo el plan de la dirección tras el recorte del base.',

  'valoracion.comentario': 'Pesos: DCF 45 %, escenarios 30 %, comparables 20 % y transacciones 5 %. El DCF manda porque Kongsberg está en una fase de crecimiento (cartera de 4,3 veces las ventas de los últimos 12 meses) que ningún múltiplo a 12 meses recoge: con la mediana de los comparables (11,5 veces el EBITDA a 12 meses) valdría 172,99 NOK, pero esos pares crecen un 9,1 % y Kongsberg en torno al 40 % [60]. Los comparables pesan un 20 % como recordatorio de lo que paga el mercado por el sector; las transacciones, un 5 %, porque son de 2021-2023, con primas de control y de negocios más lentos. **Patria y KSAT se valoran por múltiplo de beneficio** (18 veces la parte de Kongsberg: 607 M de Patria en los últimos 12 meses y 179 M de KSAT en 2025), 14.268 M frente a 4.983 M de valor contable [1, 3]: su resultado supera el 10 % del EBIT, y el valor contable rinde un 16 %. Suma unos 10,6 NOK por acción. Los anticipos de clientes se compensan con entregas: van al circulante del DCF, no al puente. Todos los métodos quedan por debajo del precio, también el DCF con la prima implícita del mercado (203,28 NOK).',

  'riesgos.items.0.efecto_valor': '−44 % hasta el DCF base; el alcista (plan cumplido) vale 303,98 NOK',
  'riesgos.items.1.efecto_valor': 'Bajista con −2,5 puntos de margen: 97,18 NOK (−68 %)',
  'riesgos.items.2.efecto_valor': 'Bajista: −68 %',
  'riesgos.items.3.efecto_valor': '±0,5 puntos de WACC: 158,34 a 180,50 NOK',
  'preguntas.items.0.por_que': 'Nuestro base (84.600 M NIIF en 2029) y el consenso cambian el valor en decenas de NOK según la respuesta.',
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito.');
