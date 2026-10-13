// actualizacion-v5.mjs — On Holding v5: caso base al crecimiento financiable (lectura prudente de la sostenibilidad,
// decisión del usuario del 13-oct-2026). Sin investigación nueva: parte de datos-v4.json, borra calc, baja el
// crecimiento de 2027e-2035e (márgenes, inversión, WACC, terminal y escenarios sin cambios), ajusta el puente de
// ingresos y reescribe los textos con cifras que cambian. Escribe datos-v5.json; después:
//   node motor/calcular-empresa.mjs --datos informes/on-2026-10-06/datos-v5.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v4.json'), 'utf8'));
delete d.calc;

// 1. Crecimiento del caso base. La v4 fallaba dos de las tres pruebas: el crecimiento medio proyectado (11,3 %) casi
// doblaba el financiable al ROIC actual (6,0 %) y la cuota de 2035e (4,0 % del calzado deportivo mundial) pasaba de
// 1,5 veces la actual (2,1 % → tope 3,15 %). Recorte mínimo, sobre todo al final:
//   - 2027e-2029e: 17/16/15 → 16/14/12. Solo baja el volumen (mayoristas); el precio del puente se mantiene.
//   - 2030e-2035e: 13/11/9/7/5/3,5 → 8/5/4/3/2,5/2. Converge al terminal (2,0 %) en 2035e.
// Resultado: crecimiento medio del 8,3 %, por debajo del financiable (≈ 4,7 % = ROIC 38,4 % × reinversión del 12 % del
// NOPAT) más la parte de precio del puente, que no pide capital (3,6 puntos de media en 2026e-2029e); cuota de 2035e
// del 3,0 % (≤ 3,15 %), y capital nuevo al ≈ 55 % frente al 48,6 % histórico (1,13 veces, < 1,25).
const crec = { '2027e': 16, '2028e': 14, '2029e': 12, '2030e': 8, '2031e': 5, '2032e': 4, '2033e': 3, '2034e': 2.5, '2035e': 2 };
for (const a of d.dcf.anios) if (a.periodo in crec) { if (a.fijo) throw new Error(`${a.periodo} es fijo`); a.crecimiento_pct = crec[a.periodo]; }

const s = d.dcf.sostenibilidad;
const pu = Object.fromEntries(s.puente_ingresos.map((p) => [p.periodo, p]));
Object.assign(pu['2027e'], { volumen_pct: 13, precio_pct: 3.5, otros_pct: -0.5,
  comentario: 'Plan a 2029: crecimiento «high-teens» a divisa constante [21]; lo dejamos 2-3 puntos por debajo en volumen porque el recorte de los mayoristas del 2T26 aún no ha tocado fondo [6]. Volumen: tiendas propias (67 a finales de 2025), Asia-Pacífico (20,5 % de las ventas en el 1S26) y ropa (8,1 %) [1, 6]; precio: el margen bruto subió del 56,0 % al 64,8 % en 2022-1S26 con subidas selectivas [1, 6, 40]. Otros: un franco algo más fuerte (estimación propia).' });
Object.assign(pu['2028e'], { volumen_pct: 11, precio_pct: 3.5, otros_pct: -0.5,
  comentario: 'Por debajo del plan a 2029 [21] y del consenso (+18,4 % en 2028e en CHF [69]): el volumen se frena a medida que el caso base se acerca al límite de cuota de la prueba de sostenibilidad (1,5 veces la actual en 2035e). El precio sigue con las subidas selectivas [40].' });
Object.assign(pu['2029e'], { volumen_pct: 9, precio_pct: 3.5, otros_pct: -0.5,
  comentario: 'Último año del plan: ventas de 5.205 M CHF, un 7 % por debajo del objetivo de 5.600 M CHF [21] (2 % por la divisa y 5 % de volumen que la prueba de sostenibilidad no da por seguro).' });
s.veredicto = 'Sí';
s.justificacion = 'Sí, después del recorte de esta versión (v5). On ha demostrado poder de precios: el margen bruto subió del 56,0 % al 64,8 % en 2022-1S26 pese al arancel sobre Vietnam, sin rebajas [1, 6]; pero el foso es solo la marca y su crecimiento no ha pasado por un ciclo [6]. Con el caso base de la v4 (11,3 % anual) fallaban dos pruebas: financiable del 6,0 % y cuota del 2,1 % al 4,0 %. Ahora el caso base queda en el límite: 8,3 % anual frente a un financiable del 4,7 % (ROIC del 38,4 % por una reinversión del 12 % del NOPAT; cálculo propio, porque el motor no lo imprime por debajo del 15 %) más 3,6 puntos de precio del puente; capital nuevo al ≈ 55 % (1,13 veces el 48,6 % histórico) y cuota del 3,0 % en 2035 (≈ 2,8 % solo en calzado) [41].';

// 2. Escenarios: mismos desplazamientos; solo cambian las cifras de las narrativas.
const esc = Object.fromEntries(d.escenarios.casos.map((c) => [c.escenario, c]));
esc.Bajista.narrativa = 'On pierde el sitio de «la zapatilla que hay que tener», como le pasó a Under Armour y le está pasando a Lululemon: los mayoristas de EE. UU. siguen recortando pedidos, Nike recupera el running, el crecimiento cae a un dígito desde 2028 y las ventas dejan de crecer en 2031. Para defender volumen, On hace rebajas y el margen EBITDA se queda tres puntos por debajo del plan (17 % NIIF).';
esc.Base.narrativa = 'On cumple el plan de 2029 solo en parte: el franco fuerte y unos mayoristas más lentos dejan las ventas de 2029 un 7 % por debajo del objetivo de 5.600 M CHF, y después crece cada vez menos, hasta el 2 % de 2035, con un 3,0 % del calzado deportivo mundial. La venta directa y Asia compensan a los mayoristas y el margen EBITDA NIIF llega al 20 % (≈ 22 % ajustado).';
d.escenarios.comentario = 'Con nuestro WACC la asimetría es desfavorable: el alcista vale 33,14 CHF (+25,2 %) y el bajista 15,61 CHF (−41,0 %), una relación de 0,61 veces; el valor ponderado es de 24,82 CHF (−6,3 %). Con la prima del mercado, la relación es de 2,94 veces. El bajista no es cosmético: es lo que han vivido Lululemon (margen operativo del 23,7 % al 19,9 % en un año) y Nike (ventas planas dos años) [39]; sobre el caso base recortado supone ventas que caen desde 2032. A doce meses no compensa con nuestro coste de capital: el precio depende de que el 3T y la guía de 2027 demuestren que On crece por encima de lo que hoy damos por financiable.';

// 3. Textos con cifras que cambian (escritos después de un primer cálculo; las cifras salen de calc).
const r = '[76]'; // prima implícita de Damodaran (fuente añadida en la v3)
const sint = d.resumen.sintesis.split('\n\n');
if (sint.length !== 8) throw new Error('La síntesis no tiene 8 párrafos');
sint[0] = `**La recomendación y por qué.** Mantener, con convicción baja: el recorte del caso base de esta versión baja el objetivo, no la señal. Con nuestro WACC del 10,01 %, el valor objetivo es de 23,88 CHF (28,75 USD), un 9,8 % bajo el precio de 26,48 CHF (31,88 USD), sin dividendo: la regla absoluta da Mantener, a 0,2 puntos de Vender. Con la prima del mercado (4,20 % ${r}; WACC del 7,91 %), el objetivo es de 30,88 CHF (37,18 USD), +16,6 % con una asimetría de 2,94 veces: la relativa da Comprar, pero un Comprar solo relativo exige un 5 % con nuestro coste de capital, y la combinada da Mantener. La convicción es baja porque las reglas discrepan y las dos están en su umbral; la subiría una guía de 2027 «high-teens» a divisa constante con un margen bruto ≥ 65 %.`;
sint[1] = `**El negocio.** On vende a precio completo: margen bruto del 64,8 % en el 1S26, frente al 42,9 % de Nike [6, 39]. El foso es solo la marca [1]. El ROIC (38,4 %) casi cuadruplica el WACC, pero la proyección solo reinvierte el 12 % del NOPAT, que al ROIC actual financia un 4,7 % anual; con los 3,6 puntos de precio del puente, el techo es un 8,3 %. Tras el recorte, su calidad sí sostiene el crecimiento proyectado (8,3 % medio, 11,3 % en la v4): cuota del 3,0 % del calzado deportivo en 2035, menos de 1,5 veces el 2,1 % actual [41], y capital nuevo al 55 %, 1,13 veces el histórico.`;
sint[5] = `**Valoración.** El DCF (50 %) da 25,27 CHF; los escenarios (30 %), 24,82 CHF, y los comparables (20 %), 18,98 CHF. El caso base está en el límite de la prueba de sostenibilidad: crece un 16, 14 y 12 % en 2027-2029 (17, 16 y 15 % en la v4) y converge después al 2 % del terminal; las ventas de 2035 son 6.610 M CHF, no 8.720. El DCF inverso descuenta un 8,4 % anual en 2027-2035, frente al 7,4 % del caso base: el precio pide más crecimiento del que On puede financiar. Nuestras ventas quedan un 2,5-6,1 % bajo el consenso en 2027-2028 [69]. Con un terminal del 1,0 %, el objetivo relativo sería de 28,41 CHF (+7,3 %): seguiría en Mantener.`;
sint[6] = `**Riesgos y catalizadores.** La marca: el bajista, una pérdida de atractivo como la de Lululemon, vale 15,61 CHF (−41,0 %) [39], frente a los 33,14 CHF (+25,2 %) del alcista. Con una prima implícita por encima del 4,26 % (WACC del 8,0 %), también la regla relativa daría Mantener. Catalizadores: el 3T26 a mediados de noviembre, la guía de 2027 en marzo y la recompra de hasta 1.000 M USD [21].`;
sint[7] = `**Qué cambiaría la decisión.** Compraríamos por debajo de 22,73 CHF (27,37 USD), un 14,2 % bajo el precio, y venderíamos por encima de 34,32 CHF (41,32 USD). Devolveríamos al caso base parte del recorte de 2027-2029 si la guía de 2027 es «high-teens» a divisa constante con margen bruto ≥ 65 %: probaría que la marca gana cuota más deprisa de lo que su reinversión financia.`;

const tesis = d.resumen.tesis.split('\n\n');
if (tesis.length !== 3) throw new Error('La tesis no tiene 3 párrafos');
tesis[1] = tesis[1].replace('el DCF inverso descuenta un crecimiento medio del 8,1 % anual en 2027-2035, frente al 10,7 % de nuestro caso base, o un margen EBITDA final del 18,2 % en lugar del 20,0 %; dicho de otro modo, una rentabilidad del 11,1 % anual.',
  'el DCF inverso descuenta un crecimiento medio del 8,4 % anual en 2027-2035, frente al 7,4 % de nuestro caso base, o un margen EBITDA final del 20,7 % en lugar del 20,0 %; dicho de otro modo, una rentabilidad del 9,6 % anual, algo menos que nuestro WACC.');
if (!tesis[1].includes('8,4 %')) throw new Error('No se ha cambiado la tesis (2)');
tesis[2] = `El mercado acierta en la dirección, y con la lectura prudente de la sostenibilidad ya no exagera la cuantía: el precio descuenta algo más de crecimiento del que On puede financiar. Con nuestro WACC del 10,01 %, el valor objetivo es de 23,88 CHF (−9,8 %) y la regla absoluta da Mantener; con la prima implícita del mercado (4,20 % ${r}), de 30,88 CHF (+16,6 %), y la relativa da Comprar. Como un Comprar solo relativo exige al menos un 5 % con nuestro coste de capital, la recomendación es Mantener. Para comprar hay que creer que la marca gana cuota más deprisa de lo que su reinversión financia (más del 3,0 % del calzado deportivo en 2035, desde el 2,1 %) o esperar a un precio por debajo de 22,73 CHF. En dólares (0,8305 CHF por USD [45]): objetivo de 28,75 USD (37,18 USD con la prima del mercado), compra por debajo de 27,37 USD y venta por encima de 41,32 USD.`;

const aFavor = [...d.resumen.a_favor];
aFavor[4] = '**Valoración por debajo de su historia**: 14,2x EBITDA de los últimos 12 meses frente a 23,4-49,7x en los cierres de 2022-2025.';
const enContra = [...d.resumen.en_contra,
  '**El precio pide más de lo financiable**: el DCF inverso descuenta un 8,4 % anual en 2027-2035, frente al 7,4 % del caso base, que la prueba de sostenibilidad deja en el límite de lo que On puede financiar.'];
if (enContra.length > 6) throw new Error('Más de 6 puntos en contra');

const just = d.dcf.justificacion;
const margenesV4 = 'El EBITDA del modelo queda un 5 % por encima del consenso en 2026, por los aranceles, y en línea (+1 % y −2 %) en 2027-2028.';
if (!just.margenes.includes(margenesV4)) throw new Error('No se encuentra la frase del consenso en márgenes');
const terminalV4 = 'Mantenemos el 2,0 % con su sensibilidad: con un 1,0 %, el DCF baja a 28,12 CHF y el objetivo con la prima del mercado a 33,43 CHF (+26,2 %), sin cambiar la recomendación. El Gordon implica 7,6x el EBITDA de 2035';
if (!just.terminal.includes(terminalV4)) throw new Error('No se encuentra la frase de sensibilidad del terminal');
if (!d.resumen.que_vigilar.includes('(18,18 CHF)')) throw new Error('que_vigilar');
if (!d.valoracion.comentario.includes('La dispersión es grande')) throw new Error('valoracion.comentario');

const T = {
  'resumen.recomendacion': 'Mantener',
  'resumen.conviccion': 'Baja',
  'resumen.sintesis': sint.join('\n\n'),
  'resumen.tesis': tesis.join('\n\n'),
  'resumen.a_favor': aFavor,
  'resumen.en_contra': enContra,
  'resumen.vision_diferencial.nuestra_vision': 'El negocio está mejor de lo que dice la cotización a corto plazo: el margen bruto sube (64,8 %), la venta directa crece al 34 % a divisa constante y Asia ya es el 20 % de las ventas [6]. A largo plazo, en cambio, el precio pide más de lo que On puede financiar: con el caso base en el límite de la prueba de sostenibilidad (8,3 % anual medio y un 3,0 % del calzado deportivo en 2035), el DCF da 25,27 CHF con nuestro WACC del 10,01 %, un 4,6 % bajo el precio, y 34,11 CHF con el 7,91 % que resulta de la prima del mercado. La diferencia con el precio es de tasa y, desde esta versión, también de cifras.',
  'resumen.vision_diferencial.por_que': 'La diferencia entre el crecimiento a divisa constante (+21,6 %) y en CHF (+13,5 %) del 2T26 es de 8 puntos, y el mercado la trata como pérdida de demanda [6]: ahí el mercado exagera. Donde somos más prudentes que él es después de 2029: el DCF inverso (8,4 % anual en 2027-2035) supone que On sigue ganando cuota a un ritmo que su reinversión no financia. No tengo una visión muy distinta del mercado a doce meses; a tres o cinco años soy algo más prudente que él y que el consenso.',
  'resumen.que_vigilar': d.resumen.que_vigilar.replace('(18,18 CHF)', '(15,61 CHF)'),
  'resumen.cambiaria_recomendacion': [
    'Si el precio baja de 22,73 CHF (27,37 USD) sin que empeoren las previsiones, pasaríamos a Comprar; por encima de 34,32 CHF (41,32 USD), a Vender.',
    `Si la prima implícita del mercado de Damodaran sube por encima del 4,26 % (WACC relativo del 8,0 %), también la regla relativa daría Mantener ${r}: se perdería el único argumento a favor de comprar.`,
    'Si la venta directa del 3T26 crece menos del 20 % a divisa constante, llevaríamos el caso base hacia el bajista (15,61 CHF) y pasaríamos a Vender.',
    'Si la guía de 2027 apunta a un crecimiento «high-teens» a divisa constante con margen bruto ≥ 65 %, devolveríamos al caso base parte del recorte de 2027-2029 y subiríamos la convicción a media; para Comprar haría falta además que la rentabilidad con nuestro WACC pasara del 5 %.',
    d.resumen.cambiaria_recomendacion[4],
  ],
  'dcf.justificacion.crecimiento': 'Diez años, porque On sigue lejos de su madurez. 2026 queda fijo en el +16,6 % del consenso (3.514 M CHF, dentro de la guía de 3.470-3.560 M CHF), con dos trimestres publicados [6, 69]. Después, el 16 % en 2027, el 14 % en 2028 y el 12 % en 2029, por debajo del «high-teens» a divisa constante del plan [21]: unos dos puntos por el franco y el resto por la prueba de sostenibilidad (v5), porque al ROIC actual la reinversión solo financia un 4,7 % anual y el precio aporta unos 3,6 puntos. Las ventas de 2029 (5.205 M CHF) quedan un 7 % bajo el objetivo de 5.600 M CHF. Desde 2030 el crecimiento baja del 8 % al 2 % de 2035, el del terminal, para que la cuota de 2035 no pase de 1,5 veces la actual (3,0 % frente al 2,1 %) [41]. Frente al consenso, ventas un 2,5 % menores en 2027 y un 6,1 % en 2028 [69].',
  'dcf.justificacion.margenes': just.margenes.replace(margenesV4, 'El EBITDA del modelo queda un 5 % por encima del consenso en 2026, por los aranceles, en línea en 2027 (+0,2 %) y un 4,5 % por debajo en 2028, por las ventas.'),
  'dcf.justificacion.terminal': just.terminal.replace(terminalV4, 'Mantenemos el 2,0 %, al que ya converge el crecimiento de 2035, con su sensibilidad: con un 1,0 %, el DCF baja a 23,76 CHF y el objetivo con la prima del mercado a 28,41 CHF (+7,3 %); la regla relativa pasaría a Mantener y la combinada seguiría en Mantener. El Gordon implica 7,7x el EBITDA de 2035'),
  'dcf.etapa2.justificacion': 'No se usa. El ROIC (38,4 %) supera de sobra al WACC (10,01 %), pero el recorrido después de 2035 no se demuestra con los datos del informe. Los diez años explícitos ya llevan las ventas de 3.014 a 6.610 M CHF, del 2,1 % al 3,0 % del calzado deportivo mundial (estimación propia sobre Grand View [41]), el máximo que admite la prueba de sostenibilidad, y en 2035 crecen ya al 2 % del terminal. El foso es solo la marca [1]: alargar el crecimiento diez años más sería un supuesto, no un dato. Con ella, el DCF subiría de 25,27 a 25,60 CHF (+1,3 %).',
  'dcf.lectura': `El DCF da 25,27 CHF por acción (30,43 USD), un 4,6 % por debajo del precio de 26,48 CHF. El rango con el WACC y el crecimiento terminal ± 0,5 puntos va de 23,14 a 27,99 CHF, y el valor terminal pesa el 54 %. Con la prima implícita del mercado (4,20 % ${r}), el WACC baja al 7,91 % y el DCF sube a 34,11 CHF (31,48-37,24 CHF): la beta de 1,72 convierte 1,3 puntos menos de prima en 2,2 puntos menos de coste de capital. El DCF inverso es lo importante. Al precio actual el mercado descuenta un crecimiento medio de las ventas del 8,4 % anual en 2027-2035, frente al 7,4 % de nuestro caso base, que está en el límite de lo que la empresa puede financiar, o, con nuestro crecimiento, un margen EBITDA final del 20,7 % en lugar del 20,0 %. La rentabilidad implícita es del 9,6 % anual en CHF, algo por debajo de nuestro WACC (10,01 %) y por encima del 7,9 % que hoy pide el mercado a una acción de esta beta. Es algo exigente: el precio ya no descuenta solo el plan de 2029, sino que On siga ganando cuota después.`,
  'valoracion.comentario': d.valoracion.comentario.replace(/La dispersión es grande:.*?un 38,3 %\./,
    `La dispersión es grande: comparables 18,98 CHF (−28,3 %) y DCF 25,27 CHF (−4,6 %). El valor objetivo es de 23,88 CHF (28,75 USD), un 9,8 % bajo el precio; con la prima implícita del mercado (4,20 % ${r}), 30,88 CHF (37,18 USD), un 16,6 % por encima.`),
};
if (T['valoracion.comentario'] === d.valoracion.comentario) throw new Error('valoracion.comentario sin cambiar');
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

// 4. Efecto en valor de los riesgos (sensibilidades del DCF v5, 25,27 CHF).
const efecto = { 0: '−41 % (escenario bajista)', 3: '−6 % (−1 pp de margen EBITDA)', 4: 'Prima de riesgo de 0,5 pp en el WACC (≈ −5 %)', 5: '−6 % (−1 pp de margen)' };
for (const [i, v] of Object.entries(efecto)) d.riesgos.items[i].efecto_valor = v;
// Los de −2 pp de crecimiento siguen en −9 % (22,98 CHF frente a 25,27 CHF).

writeFileSync(join(dir, 'datos-v5.json'), JSON.stringify(d, null, 2));
console.log(`datos-v5.json escrito (${Object.keys(T).length} textos).`);
