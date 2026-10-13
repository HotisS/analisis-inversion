// actualizacion-v2.mjs — Lululemon v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya había
// en el informe (guía del 2T26, comparables, tiendas, rebajas, divisa, mercado de Euromonitor vía McKinsey).
// El reparto volumen/precio es estimación propia: la empresa no lo publica; da el tráfico, la conversión y el
// ticket solo en cualitativo [1, 7, 16]. Mercado final con el mismo perímetro que `competencia.cuota_pct`
// (2,6 %: ingresos de lululemon sobre el mercado mundial de ropa y calzado deportivo, 433.000 M USD en 2025e [26]).
// Ni supuestos del DCF ni precio ni fecha de corte cambian: la actualización es de método, no de opinión.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/lululemon-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
// Mercado mundial en FY2035e: 433.000 M USD en 2025e al 6,1 % previsto hasta 2029 y al 5,0 % histórico
// (2019-2024) después [26]: 433.000 × 1,061^4 × 1,05^6 ≈ 735.300 M USD (extrapolación propia).
d.dcf.sostenibilidad = {
  puente_ingresos: [
    {
      periodo: 'FY2026e', volumen_pct: -6, precio_pct: -1, otros_pct: 1,
      comentario: 'Guía de −5 % a −7 % [7]. Américas cae por menos tráfico, menor conversión y menor ticket (comparables del −12 % en el 2T26) y la empresa prevé 40 pb más de rebajas [7, 16]; las ≈ 35 aperturas netas compensan en parte. La divisa suma ≈ 1 punto (comparables del 2T26: −9 %, −10 % a tipo constante) [7]. Reparto entre volumen y precio, estimación propia.',
    },
    {
      periodo: 'FY2027e', volumen_pct: -2, precio_pct: 1, otros_pct: 0,
      comentario: 'Consenso de −1,2 % [71]. Américas sigue en negativo en volumen y las aperturas fuera de Norteamérica (25 de las 35 de 2026 [16]) no lo compensan del todo; el precio se recupera algo con menos rebajas y el plan de vender más a precio completo [7]. Estimación propia.',
    },
    {
      periodo: 'FY2028e', volumen_pct: 1.5, precio_pct: 1, otros_pct: 0,
      comentario: 'Suelo en Américas y crecimiento internacional con tiendas nuevas; precio en línea con la inflación, sin recuperar el poder de precios de FY2018-FY2024 [1]. Estimación propia, por debajo del 6,1 % previsto para el mercado [26].',
    },
    {
      periodo: 'FY2029e', volumen_pct: 2, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Mismas palancas: aperturas fuera de Norteamérica y comercio electrónico (44,3 % de las ventas, +8 % en FY2025 [1]); precio algo por debajo de la inflación de EE. UU. Estimación propia.',
    },
  ],
  mercado_final: { periodo: 'FY2035e', tamano: 735300 },
  veredicto: 'En parte',
  justificacion: 'En parte. La calidad financiera sobra: ROIC del 56,8 %, margen bruto del 56,6 % frente al 42,9 % de Nike y poca inversión neta [1, 19]. Lo que no está demostrado es el poder de precios: en FY2025 subió precios y no cubrió los aranceles, y en 2026 vende con más rebajas y menos tráfico en Américas (−12 % en el 2T26) [1, 7]. Por eso el caso base no le pide recuperar cuota: crece un 2,5-4 % desde FY2028e, por debajo del mercado (5-6 % [26]), su cuota mundial baja del 2,6 % al ≈ 1,9 % y el precio solo sigue a la inflación. La duda es cuándo para la caída, no si puede financiar el crecimiento.',
};

// 2. Textos que cambian: la frase del veredicto en «El negocio».
const T = {};
const sint = d.resumen.sintesis.split('\n\n');
const iNeg = sint.findIndex((p) => p.startsWith('**El negocio.**'));
if (iNeg < 0) throw new Error('Falta el párrafo «El negocio» en la síntesis');
sint[iNeg] += ' ¿Sostiene su calidad el crecimiento que proyectamos? En parte: el ROIC y el margen bruto lo financian de sobra, pero el poder de precios no está demostrado (más rebajas y aranceles sin repercutir [1, 7]); por eso el caso base crece por debajo del mercado, deja caer la cuota mundial del 2,6 % al ≈ 1,9 % en FY2035e y no pide subidas de precio por encima de la inflación.';
// Umbral de compra: el motor actual lo da en 126,34 USD (v1 decía 127,14 con la versión anterior del motor;
// no cambia ningún supuesto). La convicción se queda en Media aunque los criterios den Alta: se añade el veredicto.
let txt = sint.join('\n\n');
for (const [a, b] of [
  ['Seguiríamos comprando por debajo de 127,14 USD', 'Seguiríamos comprando por debajo de 126,34 USD'],
  ['La convicción es media porque a tres años nuestras cifras son las del consenso', 'La convicción es media, aunque los criterios den alta, porque a tres años nuestras cifras son las del consenso y la calidad sostiene el crecimiento solo en parte'],
]) {
  if (!txt.includes(a)) throw new Error(`No encuentro: ${a}`);
  txt = txt.replace(a, b);
}
T['resumen.sintesis'] = txt;

for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (dcf.sostenibilidad: ${d.dcf.sostenibilidad.veredicto}; ${Object.keys(T).length} textos).`);
