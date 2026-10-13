// actualizacion-v3.mjs — Fanuc v3 (13-oct-2026): metodología del 10-oct, sostenibilidad del crecimiento (`dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos-v2.json, borra calc y añade el puente de ingresos, el mercado final y el veredicto.
// La prueba falla con los supuestos de v2: el capex (4-5 % de las ventas) no llega a la amortización (4,8-5,2 %) mientras las
// ventas crecen un 51 % en diez años, así que la reinversión neta es solo el circulante (9 % del NOPAT) y el capital nuevo
// «rendiría» un 49 % frente a un ROIC del 12,1 % y un incremental histórico del 3,9 %. Con la decisión del usuario del 13-oct
// (lectura prudente: rebajar el base hasta que pase), se sube el capex de FY2027e-FY2035e al 9,0 % de las ventas, la media de
// FY2016-FY2025 (9,4 %): es la palanca fiel a este negocio, porque recortar el crecimiento no cambia la relación entre el NOPAT
// nuevo y el capital nuevo. FY2026e (4,0 %) no se toca: el 1T llevó 7.400 M de capex. Mismo precio y fecha de corte.
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/fanuc-2026-10-07/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// 1. Recorte del base: capex al 9,0 % de las ventas desde FY2027e (v2: 4,5 % y 5,0 %).
for (const a of d.dcf.anios) if (a.periodo !== 'FY2026e') a.capex_pct_ventas = 9;

// 2. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 9.5, precio_pct: 1, otros_pct: 1.5,
      comentario: 'Volumen: pedidos de FY2025 +11,0 % y book-to-bill de 1,22 en el 1T FY26 [18, 19, 20]. Precio: traslado parcial y con retraso de la subida de componentes [21]. Otros: divisa, el yen a 158 por dólar frente a los 150 de la guía (+10,5 %) [11, 78]. Reparto entre volumen y precio, estimación propia: Fanuc no publica unidades ni precios.' },
    { periodo: 'FY2027e', volumen_pct: 6, precio_pct: 1, otros_pct: 0,
      comentario: 'Volumen por debajo del consenso (+6,8 %) porque parte de los pedidos del 1T son adelantados [21, 72]; precio, el mismo traslado de costes (estimación propia).' },
    { periodo: 'FY2028e', volumen_pct: 3, precio_pct: 1, otros_pct: 0,
      comentario: 'Final de la subida del ciclo, por debajo del consenso (+5,5 %) [72]; la IFR espera un 5,1 % anual de instalaciones de robots hasta 2028 [34].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El foso es real: base instalada atada por el servicio de por vida y el mayor margen operativo del sector (21,4 % frente al 8,7-14,9 % de Yaskawa, ABB Robotics y Siemens) [1, 39, 41, 42]. El poder de precios es limitado (traslada la subida de componentes con retraso y pierde clientes en China por los plazos [21]) y crecer exige capital: el invertido casi se duplicó en diez años con un ROIC incremental del 3,9 %. Con un capex por debajo de la amortización, el capital nuevo habría rendido un 49 %; con el 9 % histórico, la reinversión financia un 3,8 % anual y el precio y la divisa de FY2026e-FY2028e completan el 4,3 % proyectado.',
};

// 3. Control explicado nuevo: el DCF inverso no encuentra crecimiento.
d.meta.controles_explicados.push({
  control: 'DCF inverso calculable',
  explicacion: 'Con el capex en la media histórica (9 % de las ventas) y 47 JPY de circulante por cada 100 de ventas nuevas, el capital nuevo rinde un 14,3 %, poco más que el WACC (9,58 %): crecer más apenas añade valor y ningún crecimiento razonable llega al precio. No es un supuesto extremo, es la intensidad de capital de Fanuc (ROIC incremental del 3,9 % en diez años). El informe usa la rentabilidad implícita (4,7 %) y el margen implícito (57,9 %).',
});

// 4. Textos reescritos con las cifras de calc.
const sint = d.resumen.sintesis.split('\n\n');
const pi = (t) => { const i = sint.findIndex((x) => x.startsWith(t)); if (i < 0) throw new Error(`Falta el párrafo ${t}`); return i; };
sint[pi('**La recomendación')] = '**La recomendación y por qué.** Vender, con convicción baja. Valor objetivo de 4.124,66 JPY frente a un precio de 6.220 JPY: rentabilidad total esperada del −32,0 % con el dividendo del 1,7 % (−28,9 % con la prima implícita del mercado, 4,20 % [107]). Asimetría negativa (−0,64x): el alcista también queda por debajo del precio. El precio descuenta una rentabilidad anual del 4,7 %, 1,6 puntos sobre el bono japonés a 10 años (3,103 %) [79]. Convicción baja (el motor sugiere media): ventas y márgenes coinciden con el consenso; la diferencia está en la tasa y en la inversión.';
sint[pi('**El negocio')] = '**El negocio.** Líder en controles CNC y gran fabricante de robots, con servicio de por vida sobre su base instalada [23], Fanuc gana más que nadie en su sector: margen operativo del 21,4 % en FY2025, frente al 8,7-14,9 % de Yaskawa, ABB Robotics o Siemens Digital Industries [39, 41, 42]. Pero el ROIC (12,1 %) apenas supera el WACC (9,58 %) y el incremental de la década es del 3,9 % [1, 9]. **La calidad sostiene el crecimiento solo en parte**: el foso protege el margen, no la inversión. Con un capex por debajo de la amortización, el capital nuevo habría rendido un 49 %; con el 9 % de las ventas, su media de diez años, la reinversión financia un 3,8 % anual, y el precio y la divisa ponen el resto del 4,3 % proyectado.';
sint[pi('**Valoración')] = '**Valoración.** El DCF da 2.938,60 JPY (WACC del 9,58 %; 3.544,66 antes de subir el capex); las medianas de los comparables, 5.747,02 JPY por EV/EBITDA y 5.352,17 JPY por PER NTM. Cotiza a 27,1x PER NTM, con prima del 10-16 % sobre el sector y en el percentil 80 de su EV/EBITDA histórico. Con la inversión histórica, crecer apenas crea valor: el DCF inverso no encuentra un crecimiento que justifique el precio y pide un margen EBITDA del 57,9 %.';
sint[pi('**Riesgos')] = '**Riesgos y catalizadores.** El riesgo para la tesis es que la IA física alargue el ciclo sin caída; aun así, el alcista vale 3.781,21 JPY. La apoyan los pedidos adelantados (bajista de 2.392,20 JPY, −61,5 %) y un PER que converja a la mediana del sector (5.352,17 JPY). Catalizadores: resultados del 2T el 23-oct-2026 [75], JIMTOF del 26 al 31 de octubre [105] y la decisión de EE. UU. sobre la Sección 232 [51].';
sint[pi('**Qué cambiaría')] = '**Qué cambiaría la decisión.** Compraríamos por debajo de 3.481,21 JPY; por encima de 4.421,64 JPY la regla dice vender o reducir. Pasaríamos a Mantener si el consenso de BPA de FY2027e supera 280 JPY sin que caiga el book-to-bill, si el bono a 10 años baja del 2 % o si Fanuc crece un ciclo entero con un capex del 4-5 %.';

const T = {
  'resumen.sintesis': sint.join('\n\n'),
  'resumen.tesis': d.resumen.tesis.replace('el DCF inverso dice que el precio equivale a una rentabilidad anual del 5,6 %, o a crecer un 21,6 % al año durante diez años.', 'el DCF inverso dice que el precio equivale a una rentabilidad anual del 4,7 % o a un margen EBITDA del 57,9 %; con la inversión que exige crecer, ningún crecimiento razonable lo justifica.'),
  'resumen.vision_diferencial.nuestra_vision': 'Las previsiones del consenso son razonables y las compartimos casi al céntimo. Lo que no compartimos es la tasa ni la inversión: una rentabilidad implícita del 4,7 % no paga el riesgo de una cíclica con beta de 1,26 y con caídas de ventas del 12-20 % cada tres o cuatro años, y crecer le exige un capex como el de su historia (9 % de las ventas). Con un WACC del 9,58 % y una caída cíclica moderada en FY2029e, el valor está en 2.938,60 JPY por DCF y en 5.352-5.747 JPY por comparables.',
  'resumen.en_contra.0': '**Precio exigente**: rentabilidad implícita del 4,7 %, frente a un WACC del 9,58 % y un bono del 3,103 % [79].',
  'resumen.en_contra.2': '**Pedidos adelantados**: la dirección admite que los plazos largos adelantan pedidos; el bajista vale 2.392,20 JPY [21].',
  'resumen.en_contra.3': '**Creación de valor escasa**: ROIC del 12,1 % y ROIC incremental del 3,9 % en una década; crecer exige un capex del 9 % de las ventas.',
  'resumen.que_vigilar': d.resumen.que_vigilar.replace('un 5,6 %', 'un 4,7 %'),
  'resumen.cambiaria_recomendacion': [
    'Si el precio baja de 3.481,21 JPY, pasaríamos a Comprar; entre 3.481,21 y 4.421,64 JPY, a Mantener.',
    'Si el consenso de BPA de FY2027e sube por encima de 280 JPY (hoy 237,9 JPY) con un book-to-bill ≥ 1,1, revisaríamos el base al alza [72].',
    'Si el bono japonés a 10 años baja del 2,0 % (hoy 3,103 %), el WACC caería en torno a un punto y revisaríamos el valor [79].',
    'Si Fanuc publica márgenes por división que muestren un margen de ROBOT por encima del 25 %, revisaríamos el margen a largo plazo.',
    'Si Fanuc atraviesa la subida del ciclo con un capex del 4-5 % de las ventas sin alargar los plazos de entrega, volveríamos al capex de la versión anterior (DCF de 3.544,66 JPY).',
  ],
  'dcf.justificacion.inversion': 'Capex del 4,0 % de las ventas en FY2026e (7.400 M en el 1T) [18] y del 9,0 % desde FY2027e, la media de FY2016-FY2025 (9,4 %, entre el 2,5 % y el 19,7 %) [1, 4, 7, 9]. La versión anterior lo dejaba en el 4,5-5,0 %, por debajo de la amortización (4,8-5,2 %), mientras las ventas crecían un 51 %: el capital nuevo habría rendido un 49 %, frente a un ROIC incremental del 3,9 % en una década en la que el capital invertido casi se duplicó. La dirección anuncia inversión en capacidad de FA [21]. El circulante comercial se queda en el 46-48 % de las ventas (48,6 % en FY2025): cada 100 JPY de ventas nuevas inmovilizan unos 47 JPY. Tipo impositivo del 28 %: el 25,5 % contable está rebajado por las participadas.',
  'dcf.justificacion.terminal': 'Crecimiento a perpetuidad del 2,0 % en yenes: crecimiento real cercano al 0,5 % más una inflación esperada del 1,5 %, coherente con un bono al 3,1 %. El último año lleva el capex del 9 %, prudente para crecer un 2 %. El múltiplo de salida de 15x (contraste) está en la mediana NTM de los comparables (14,8x); el Gordon implica 5,5x, y el múltiplo de 15x implicaría un crecimiento perpetuo del 6,65 %, imposible en yenes. Usamos Gordon.',
  'dcf.lectura': 'El DCF da 2.938,60 JPY por acción, un 52,8 % por debajo del precio, con el valor terminal en el 52 % del valor empresa y un rango de 2.774,89 a 3.150,19 JPY al mover WACC y crecimiento terminal medio punto. Baja desde 3.544,66 JPY porque el capex sube al 9 % de las ventas, su media de diez años: la prueba de sostenibilidad mostró que, con un capex por debajo de la amortización, el capital nuevo habría rendido un 49 %, frente a un ROIC incremental histórico del 3,9 %. El DCF inverso es la clave: el precio de 6.220 JPY equivale a una rentabilidad anual del 4,7 %, frente al 9,58 % que exigimos, o a un margen EBITDA del 57,9 %. Ningún crecimiento razonable lo justifica, porque el capital nuevo rinde un 14,3 %, poco más que el WACC. Ni con un WACC del 8,6 % y un crecimiento terminal del 3,0 % (3.435,31 JPY) el DCF llega al precio. Para pagar 6.220 JPY hay que creer que el ciclo no tendrá caída, que los márgenes volverán a los de FY2016-FY2018 y que crecer no pedirá fábricas.',
  'escenarios.casos.1.narrativa': d.escenarios.casos[1].narrativa + ' El capex sube al 9 % de las ventas desde FY2027e, su media de diez años, porque crecer exige capacidad.',
  'escenarios.comentario': 'La asimetría es negativa (−0,64x): incluso el alcista (3.781,21 JPY) queda un 39,2 % por debajo del precio, y el bajista (2.392,20 JPY) pierde un 61,5 %. El bajista no es cosmético: es FY2019 repetido, con una caída de ventas del 20 % y el margen operativo en el 17,4 %, y llegó justo después del máximo de FY2017 [7, 8, 9]. El valor ponderado es de 3.012,65 JPY. Lo que el precio necesita está fuera del alcista: un margen EBITDA cercano al 58 %, el doble del histórico, o una tasa de descuento casi cinco puntos menor.',
  'valoracion.comentario': d.valoracion.comentario.replace('de 3.544,66 JPY por DCF', 'de 2.938,60 JPY por DCF'),
  'riesgos.items.0.efecto_valor': '−19 % sobre el DCF base (bajista: 2.392,20 JPY)',
  'preguntas.items.0.por_que': 'Distingue un ciclo real de un adelanto: el bajista vale un 61,5 % menos que el precio',
};
for (const k of ['resumen.tesis', 'resumen.que_vigilar', 'valoracion.comentario']) {
  const viejo = k.split('.').reduce((o, p) => o[p], d);
  if (T[k] === viejo) throw new Error(`No se reemplazó nada en ${k}`);
}
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
console.log(`datos-v3.json escrito (${Object.keys(T).length} textos).`);
