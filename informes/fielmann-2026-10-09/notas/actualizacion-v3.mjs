// actualizacion-v3.mjs — Fielmann v3: caso base al crecimiento financiable (lectura prudente de la sostenibilidad,
// decisión del usuario del 13-oct-2026). Sin investigación nueva: parte de datos-v2.json, borra calc y rebaja solo el
// crecimiento de ingresos de los años no fijos (2027e-2033e). La v2 dejó el base en un 4,5 % medio, con una
// reinversión que al ROIC actual (13,9 %) financia un 2,8 % y un capital nuevo que tendría que rendir un 21,5 %
// (incremental histórico 6,5 %; tope del control 1,25 × 13,9 = 17,4 %). Regla aplicada: crecimiento medio ≤ financiable
// + la parte de precio del puente, que no pide capital (1,1-1,6 puntos al año), y capital nuevo ≤ 17,4 %.
//   2027e-2033e: 5 / 5,5 / 5,5 / 5 / 4,5 / 4 / 3,5 %  →  4 / 4,5 / 4 / 3,5 / 3 / 2,75 / 2,5 %
// Medio 4,5 % → 3,4 % (financiable 2,7 % + 0,7 puntos de precio, por debajo de los 1,4-1,5 del puente); capital nuevo
// 17,1 %. Margen, capex (11-12 % de las ventas con derechos de uso), circulante, impuestos, WACC, terminal y escenarios
// (desplazamientos sobre el base) sin cambios: se mantiene la inversión aunque el crecimiento sea menor, lo prudente.
// Mismo precio (37,15 EUR, cierre del 8-oct) y fecha de corte.
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/fielmann-2026-10-09/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// 1. Crecimiento del caso base (solo años no fijos).
const crec = { '2027e': 4, '2028e': 4.5, '2029e': 4, '2030e': 3.5, '2031e': 3, '2032e': 2.75, '2033e': 2.5 };
for (const a of d.dcf.anios) {
  if (a.periodo in crec) {
    if (a.fijo) throw new Error(`${a.periodo} es fijo`);
    a.crecimiento_pct = crec[a.periodo];
  }
}

// 2. Puente de ingresos: el recorte sale del volumen (lo que pide capital); el precio baja una décima y otros apenas.
const puente = Object.fromEntries(d.dcf.sostenibilidad.puente_ingresos.map((p) => [p.periodo, p]));
Object.assign(puente['2027e'], {
  volumen_pct: 2.0, precio_pct: 1.4, otros_pct: 0.6,
  comentario: 'Volumen: maduran las 70 aperturas de 2026 y crecen EE. UU. y España, limitado a lo que financia la reinversión al ROIC actual (2,7 % con otros; estimación propia) [1, 15]. Precio: el mercado alemán crece en valor con menos unidades (5.378 a 5.733 M EUR en gafas entre 2022 y 2025) [16]. Otros: audiología, que crece al doble que el grupo (+10,9 % de audífonos en 2025) [1]. El consenso da +5,6 % [52]; nosotros, 1,6 puntos menos.',
});
Object.assign(puente['2028e'], {
  volumen_pct: 2.3, precio_pct: 1.5, otros_pct: 0.7,
  comentario: 'Más de 700 estudios de audiología en Europa en 2030 (475 en jun-26) y el plan de EE. UU. [1, 7, 15]. Volumen por debajo de los 3,2 puntos de la v2: en 2025 las gafas vendidas crecieron un 1,9 % con una compra dentro [1]. El consenso da +6,0 % [52].',
});
Object.assign(puente['2029e'], {
  volumen_pct: 1.9, precio_pct: 1.5, otros_pct: 0.6,
  comentario: 'Empieza la convergencia: el volumen baja hacia lo que financia la reinversión y el precio se mantiene; sin guía ni consenso para ese año (estimación propia).',
});

d.dcf.sostenibilidad.justificacion = 'En parte. El foso alemán es real (57 % de las gafas, ventaja de costes por la integración vertical, ROIC del 13,9 %) y da poder de precios: el margen bruto subió con ventas planas y la cuota en unidades ganó un punto con el mercado cayendo [1, 7]. Eso sostiene un 2-3 % anual, no el 5-5,5 % que pedía la v2: el resto exige volumen fuera de Alemania, donde España rinde un 4 % y EE. UU. casi nada [1], con un ROIC incremental del 6,5 %. Por eso el base se rebaja al 3,4 % medio: lo que financia la reinversión más el precio. La cuota no se puede probar (la proyección es del grupo) [16].';

// 3. El control del capital nuevo pasa (17,1 % frente al tope de 17,4 %): se quita su explicación.
d.meta.controles_explicados = d.meta.controles_explicados.filter((c) => !c.control.startsWith('Rendimiento del capital nuevo'));

// 4. Escenarios: mismos desplazamientos sobre el base; solo cambian las cifras de las narrativas.
const caso = (n) => d.escenarios.casos.find((c) => c.escenario === n);
caso('Bajista').narrativa = 'Alemania sigue estancada, las aperturas maduran despacio y EE. UU. no pasa del 12-13 % de margen: el crecimiento se queda en el 1,5-2 % de 2027-2029, como el del 1S26, y el margen reportado vuelve al 21 % de 2022-2024, como ya ocurrió con la inflación salarial. La guía se rebaja otra vez y el crecimiento a largo plazo baja al 1,75 %.';
caso('Base').narrativa = 'Las 70 aperturas al año, España y EE. UU. llevan el crecimiento al 4-4,5 % en 2027-2029, lo que financia la reinversión al ROIC actual más el precio y 1,5 puntos menos que el consenso, y el margen reportado sube despacio al 23,3 %, sin llegar al 25 % del plan. La inversión se mantiene alta (11-12 % de las ventas con los derechos de uso).';
caso('Alcista').narrativa = 'La refracción automatizada y la red nueva devuelven a Alemania al 3-4 % y EE. UU. avanza hacia el margen europeo: el grupo crece un 6-6,5 % en 2027-2029, por encima del consenso y más cerca de la Vision 2035 sin compras, y el margen reportado llega al 24,3 %.';

// 5. Textos con cifras que cambian (las cifras salen de calc de datos-v3.json).
const sintesis = d.resumen.sintesis.split('\n\n');
if (sintesis.length !== 7) throw new Error('La síntesis ha cambiado de estructura');
sintesis[0] = '**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 44,79 EUR frente a 37,15 EUR (cierre del 8-oct): un potencial del 20,6 % y una rentabilidad total esperada del 24,3 % con el dividendo del 3,8 %. El alcista gana un 54,9 % y el bajista pierde un 33,2 %: asimetría de 1,65 veces. La razón: el precio descuenta un crecimiento del 2,5 % anual, el ritmo orgánico de los últimos semestres, y nuestro base, ya recortado a lo que la empresa puede financiar, pide un 3,5 % en 2027-2033. La convicción es media porque el bajista pierde un 33 % y la asimetría no llega a 2; la subiría un orgánico de 2027 por encima del 4 % y la bajaría uno por debajo del 3 %.';
sintesis[1] = '**El negocio.** Fielmann es el primer óptico de Alemania, con el 57 % de las gafas y el 25 % del valor, y factura unos 2,3 M EUR por tienda frente a 0,9 M de Apollo [1, 16]. Un margen EBITDA del 23,0 % y un ROIC del 13,9 % frente a un WACC del 7,74 % muestran un foso real; España rinde un 4 % y EE. UU. casi nada, con 410 M EUR pagados [1]. **La calidad sostiene el crecimiento solo en parte**: el foso alemán da un 2-3 % anual por precio y cuota, y el volumen fuera de Alemania pide capital. Por eso rebajamos el base del 4,5 % al 3,4 % medio: la reinversión prevista (19 % del NOPAT) financia un 2,7 % al ROIC actual y el resto es precio, que casi no pide capital; el capital nuevo rinde un 17,1 %, dentro del tope de 1,25 veces el ROIC. Con el base anterior el objetivo era de 49,13 EUR.';
sintesis[4] = '**Valoración.** El DCF da 41,96 EUR y pesa la mitad; los escenarios, 41,57 EUR. A 6,8 veces el EBITDA de los últimos 12 meses y 13,7 veces el beneficio esperado, la acción cotiza en mínimos de su historia (media de 11,0 y 31,4 veces) y como National Vision, con el doble de margen. El precio rinde un 8,3 % anual frente a un WACC del 7,74 %. Con la prima implícita del mercado el objetivo sube a 54,31 EUR: las dos reglas dan Comprar. Discrepamos del mercado en que extrapola el peor tramo; no en el plan de la empresa, que no usamos.';
sintesis[5] = '**Riesgos y catalizadores.** Alemania estancada (cada punto de margen resta unos 4 EUR por acción), la rentabilidad de EE. UU. y una inversión del 11-12 % de las ventas que no acelere el crecimiento. Catalizadores: el 3T el 5-nov-2026, que debe mostrar la aceleración del segundo semestre, y la guía de 2027 en febrero.';
sintesis[6] = '**Qué cambiaría la decisión.** Comprar por debajo de 43,98 EUR y vender por encima de 58,72 EUR. Pasaríamos a Mantener si el crecimiento orgánico de 2027 queda por debajo del 3 %, si el margen ajustado baja del 22 % o si el de EE. UU. no supera el 12 %.';

const T = {
  'resumen.sintesis': sintesis.join('\n\n'),
  'resumen.tesis': 'Fielmann vende más de la mitad de las gafas de Alemania con un modelo de precio bajo, fabricación propia y garantías que fidelizan (satisfacción de clientes del 90 %), y gana un margen EBITDA reportado del 23 % y un ROIC del 13,9 % [1]. Su problema es el crecimiento: el mercado alemán pierde unidades y la empresa ha comprado fuera (España, EE. UU.) a rentabilidades que aún no cubren el coste de capital.\n\nEl precio, 37,15 EUR, cotiza a 6,8 veces el EBITDA y 13,7 veces el beneficio esperado, mínimos históricos. El DCF inverso dice que descuenta un crecimiento del 2,5 % anual o un margen del 22,2 %: el ritmo orgánico de los últimos semestres o un margen por debajo del de 2025.\n\nPara invertir hay que creer que las aperturas y el crecimiento fuera de Alemania llevan las ventas al 4-4,5 % anual en 2027-2029, lo que la empresa puede financiar más el precio, y que el margen se queda en el 23 %: menos que el consenso y mucho menos que el plan de la empresa. Con eso, el valor es de 41,96 EUR por DCF y 44,79 EUR ponderado. El mercado acierta en desconfiar del plan y de un gobierno que no protege al minoritario; se equivoca al pagar como si el negocio no creciera.',
  'resumen.vision_diferencial.mercado_descuenta': 'Un Fielmann que no vuelve a acelerar: crecimiento del 2,5 % anual o margen del 22,2 %, tras la rebaja de la guía de agosto y cinco años de caída de la acción (−5,3 % anual con dividendos) [51]. El múltiplo de 6,8 veces el EBITDA es el de una cadena estadounidense de margen bajo.',
  'resumen.vision_diferencial.nuestra_vision': 'Un crecimiento del 4-4,5 % en 2027-2029, lo que financia la reinversión al ROIC actual más el precio, y un margen reportado del 23,3 %: 1,5 puntos por debajo del consenso y lejos de la Vision 2035. No creemos en los 4.000 M EUR de ventas de 2030, pero tampoco en el estancamiento: la red crece un 5 % al año y fuera de Alemania las ventas crecieron un 6 % en el 2T26, con España al +9 % [7, 8].',
  'resumen.en_contra.4': '**Inversión creciente:** capex con derechos de uso del 11-12 % de las ventas en la proyección; al ROIC actual financia solo un 2,7 % de crecimiento anual.',
  'resumen.que_vigilar': 'La tesis depende de que el crecimiento orgánico vuelva al 4 % en 2027 gracias a las aperturas. La señal de que no se cumple sería un tercer trimestre por debajo del +3 % (la guía exige un segundo semestre en torno al 4 %) o una guía de 2027 con ventas por debajo de 2.600 M EUR. El margen de EE. UU. es la segunda condición: por debajo del 12 %, la expansión resta valor.',
  'resumen.cambiaria_recomendacion.0': 'Precio por encima de 43,98 EUR: pasaríamos a Mantener.',
  'resumen.cambiaria_recomendacion.2': 'Guía de 2027 con margen EBITDA ajustado por debajo del 22 %: el valor caería a la zona de 35 EUR, por debajo del precio.',
  'dcf.justificacion.crecimiento': '2026e se fija con la guía rebajada en agosto (2.500-2.550 M EUR) y el 1S26 (+1,8 %): un +3,2 %, 2.513 M EUR, en la mitad baja de la horquilla y algo por debajo del consenso (2.517) [7, 52]. Para 2027-2029 se supone un 4-4,5 %, unos 1,5 puntos por debajo del consenso (5,6 % y 6,0 %) [52]: lo que financia la reinversión prevista al ROIC actual (2,7 %) más la parte de precio del puente, que casi no pide capital. Las 70 aperturas de 2026 (5 % de la red) y EE. UU. y España aceleran, pero el crecimiento orgánico fue del 3,6 % en 2025 y del 1,7 % en el 1S26 [1, 7]. Queda muy por debajo del 10 % anual de la Vision 2035, que no se usa porque incluye compras y la primera guía de su recorrido ya se ha rebajado [1, 50]. El crecimiento baja al 2,5 % en 2033.',
  'dcf.lectura': 'El DCF da 41,96 EUR por acción (+12,9 % sobre 37,15 EUR) con un WACC del 7,74 %; el valor terminal pesa un 55 %. Sin la etapa de transición, 41,14 EUR. El caso base ya está recortado a lo que la empresa puede financiar (3,4 % medio frente al 4,5 % de la v2).\n\n**El precio descuenta que Fielmann no acelere.** El DCF inverso da un crecimiento implícito del 2,5 % anual en 2027-2033 con nuestros márgenes, frente al 3,5 % del caso base; o, con nuestro crecimiento, un margen EBITDA del 22,2 % frente al 23,3 %. Un 2,5 % es el crecimiento orgánico que la empresa ha tenido en 2025-2026 (3,6 % y 1,7 %) y un 22,2 % queda por debajo del 23,0 % de 2025: el mercado extrapola el peor tramo reciente, no el plan. Visto de otro modo, el precio rinde un 8,3 % anual frente a un WACC del 7,74 %.\n\nNo es una exigencia alta: nuestro caso base está por debajo del consenso en ventas y en margen. Pero el margen de seguridad es ahora menor: un punto menos de margen en todos los años baja el valor a 37,70 EUR y medio punto más de WACC, a 37,62 EUR, casi el precio. Por debajo de unos 35 EUR solo se llega con márgenes de 2022-2024 y crecimiento del 2-3 % a la vez.',
  'escenarios.comentario': 'La asimetría es favorable, aunque menos que con el base anterior: el alcista vale 57,53 EUR (+54,9 %) y el bajista 24,82 EUR (−33,2 %), una relación de 1,65 veces. El bajista no es cosmético: reproduce el margen de 2022-2024 y un crecimiento como el del 1S26, y deja la acción un 33 % más abajo. Con un 25 % de probabilidad en cada extremo, el valor ponderado de los escenarios es 41,57 EUR. Compensa porque el precio ya está cerca del bajista en múltiplos: 6,8 veces el EBITDA de los últimos 12 meses, el mínimo de la serie histórica de la acción.',
  'valoracion.comentario': 'El valor objetivo de 44,79 EUR pondera el DCF (50 %), los escenarios (40 %) y los comparables (10 %). El DCF es el método más fiable: el negocio es estable, la caja es visible (flujo operativo del 89 % del EBITDA en 2025) y el valor depende de dos supuestos que se pueden vigilar, crecimiento y margen [14]. Los comparables pesan poco porque la muestra es frágil y está sesgada al alza: los fabricantes con marca (Sonova, Demant, EssilorLuxottica) cotizan a 10-15 veces el EBITDA de los próximos 12 meses y dan 81,72 EUR por acción, mientras los minoristas más parecidos (National Vision, 6,5 veces; Amplifon, 7,7 veces los últimos 12 meses) cotizan como Fielmann [62, 64]. Las transacciones no se usan: solo una tiene múltiplo de EBITDA (GN Hearing, fabricante) y las compras de Fielmann se pagaron a 1,0-1,6 veces las ventas sin EBITDA publicado [2, 71]. La dispersión es grande (de 24,82 a 81,72 EUR), pero el valor central de todos los métodos salvo el escenario bajista queda por encima del precio. Con la prima implícita del mercado (4,2 %), el DCF sube a 52,54 EUR.',
  'riesgos.items.2.efecto_valor': 'Escenario bajista: 24,82 EUR (−33,2 %)',
  'preguntas.items.0.por_que': 'La empresa no publica ventas comparables; el DCF supone una aceleración del 1,8 % del 1S26 al 4 % en 2027 que depende de ello.',
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
