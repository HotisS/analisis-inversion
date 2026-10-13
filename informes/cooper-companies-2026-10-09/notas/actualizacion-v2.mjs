// actualizacion-v2.mjs — Cooper Companies v2: sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya había en
// el informe y en las notas. El veredicto se decidió antes de calcular: «Sí». La proyección pide un 3,8 % anual, por
// debajo del 5,3 % previsto para el mercado de lentes; en un oligopolio de cuatro fabricantes que suben precios cada
// año, eso es un 2 % de precio y un volumen que crece menos que el mercado (CooperVision perdería unos tres puntos de
// cuota). La proyección casi no reinvierte (capex por debajo de la amortización, que incluye intangibles comprados):
// la prueba es el poder de precios y la cuota, no el ROIC. `mercado_final` queda en null: la cuota del informe (26,3 %)
// es solo la de CooperVision en lentes y los ingresos del DCF son del grupo (con CooperSurgical, un 33 %); la prueba
// de cuota se hace a mano en la justificación. No cambia ningún supuesto del DCF: misma fecha de corte y precio.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/cooper-companies-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 0.5, precio_pct: 2, otros_pct: 1.1,
      comentario: 'Guía del 9 de septiembre: orgánico del 2-3 % (CooperVision 1-2 %, con el desestocaje del canal de EE. UU.; CooperSurgical 4-5 %); el resto es divisa [3]. El reparto entre precio y volumen es estimación propia: los cuatro fabricantes suben precios cada año [19, 21].' },
    { periodo: 'FY2027e', volumen_pct: 1.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Termina el desestocaje, pero Asia-Pacífico cae un 5 % orgánico y CooperVision crece por debajo de su mercado [3, 17]; el consenso espera un 4,0 % [57].' },
    { periodo: 'FY2028e', volumen_pct: 2, precio_pct: 2, otros_pct: 0,
      comentario: 'Volumen por debajo del mercado de lentes (5,3 % previsto [24]); fertilidad al 5 % orgánico [3] y Paragard con Miudella como rival [26].' },
    { periodo: 'FY2029e', volumen_pct: 2.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Diarias de silicona hidrogel y MiSight; CooperVision creció un 9 % y un 5 % orgánico en FY2024 y FY2025 [8, 14].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí para el caso base, porque pide menos que el mercado. El foso es estrecho pero real: cuatro fabricantes con más del 75 % de las lentes, barreras regulatorias y de fabricación, y subidas de precio anuales que Alcon y J&J confirman [1, 19, 21]. CooperVision creció un 9 % y un 5 % orgánico en FY2024-FY2025 [8, 14]. La proyección (3,8 % anual) casi no reinvierte, así que la prueba es la cuota: con las ventas de CooperVision al ritmo del grupo y el mercado al 5,3 % [24], su cuota bajaría del 26,6 % al 23 % en FY2035e (estimación propia). Si la pérdida de cuota del 3T26 es estructural [3], eso es el bajista.',
};

// 2. Textos: solo la frase del veredicto en «El negocio».
const sint = d.resumen.sintesis;
const ancla = 'que ganó 43,4 M de resultado de segmento en FY2025 [1].';
if (!sint.includes(ancla)) throw new Error('No encuentro el final de «El negocio» en la síntesis');
d.resumen.sintesis = sint.replace(ancla, `${ancla} La calidad sí sostiene el crecimiento del caso base, un 3,8 % anual con un 2 % de precio, porque pide menos que el 5,3 % previsto para el mercado: supone que CooperVision baja del 26,6 % al 23 % de cuota en diez años, en un oligopolio que sube precios cada año [19, 21, 24].`);

// 3. Niveles de la decisión recalculados con el motor actual. La regla del 9-oct-2026 (un Comprar que solo da la regla
// relativa exige al menos un 5 % de rentabilidad con nuestro WACC) baja el nivel de compra de 57,56 a 54,36 USD, a un
// 0,1 % del precio: la recomendación no cambia, pero queda en el borde, y la síntesis lo dice.
const sint2 = d.resumen.sintesis;
const anclaRec = 'que es la que manda.';
if (!sint2.includes(anclaRec)) throw new Error('No encuentro «que es la que manda.» en la síntesis');
d.resumen.sintesis = sint2.replace(anclaRec, `${anclaRec} Está en el borde: un Comprar que solo da la regla relativa exige al menos un 5 % con nuestro WACC, y tenemos un 5,2 %; por encima de 54,36 USD, un 0,1 % sobre el precio, pasaría a Mantener.`);
const ancla3 = 'Por encima de 57,56 USD pasaríamos a Mantener';
if (!d.resumen.sintesis.includes(ancla3)) throw new Error('No encuentro el nivel de 57,56 en la síntesis');
d.resumen.sintesis = d.resumen.sintesis.replace(ancla3, 'Por encima de 54,36 USD pasaríamos a Mantener');
const cr = d.resumen.cambiaria_recomendacion;
if (!cr[1].includes('57,56')) throw new Error('cambiaria_recomendacion[1] sin 57,56');
cr[1] = cr[1].replace('57,56', '54,36');

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito (dcf.sostenibilidad y frase del veredicto en «El negocio»).');
