// actualizacion-v2.mjs — Fielmann v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con el puente de ingresos
// de 2026e-2029e (reparto volumen / precio / otros: estimación propia sobre los KPI, el semestral y el ZVA), el
// mercado final en null (la cuota publicada, 25,1 %, es solo de la óptica minorista alemana en valor con IVA, y la
// proyección es del grupo entero: no hay perímetro comparable) y el veredicto. No cambia supuestos del DCF ni el
// precio (37,15 EUR, cierre del 8-oct) ni la fecha de corte.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/fielmann-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    {
      periodo: '2026e', volumen_pct: 1.6, precio_pct: 1.1, otros_pct: 0.5,
      comentario: 'Guía rebajada (2.500-2.550 M EUR) y 1S26 (+1,8 %: 1,7 % orgánico, 0,6 % compras y −0,5 de divisa) [7, 8]. Volumen: 37 tiendas netas en el 1S26 y 70 en el año (5 % de la red), con Alemania casi plana (+0,8 %) [7]. Precio: cristales y tratamientos de más valor, con el margen bruto del 79,5 % al 80,1 % [7]. Otros: compras pequeñas y audiología, menos divisa. Reparto: estimación propia.',
    },
    {
      periodo: '2027e', volumen_pct: 2.9, precio_pct: 1.5, otros_pct: 0.6,
      comentario: 'Volumen: maduran las 70 aperturas de 2026 y aceleran EE. UU. y España (estimación propia) [1, 15]. Precio: el mercado alemán crece en valor con menos unidades (5.378 a 5.733 M EUR en gafas entre 2022 y 2025) [16]. Otros: audiología, que crece al doble que el grupo (+10,9 % de audífonos en 2025) [1]. El consenso da +5,6 % [52].',
    },
    {
      periodo: '2028e', volumen_pct: 3.2, precio_pct: 1.6, otros_pct: 0.7,
      comentario: 'Mismo reparto: más de 700 estudios de audiología en Europa en 2030 (475 en jun-26) y el plan de EE. UU. [1, 7, 15]. Es el año que más pide al volumen: en 2025 las gafas vendidas crecieron un 1,9 % con una compra dentro [1]. El consenso da +6,0 % [52].',
    },
    {
      periodo: '2029e', volumen_pct: 3.2, precio_pct: 1.6, otros_pct: 0.7,
      comentario: 'Igual que 2028e; sin guía ni consenso para ese año (estimación propia).',
    },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El foso alemán es real (57 % de las gafas, ventaja de costes por la integración vertical, ROIC del 13,9 %) y da poder de precios: el margen bruto subió con ventas planas y la cuota en unidades ganó un punto con el mercado cayendo [1, 7]. Eso sostiene un 2-3 % anual, no el 5-5,5 % de 2027-2029e: el resto pide volumen fuera de Alemania, donde España rinde un 4 % y EE. UU. casi nada [1], y el ROIC incremental histórico es del 6,5 %, por debajo del WACC. La cuota no se puede probar con el mercado alemán (la proyección es del grupo), y el mercado alemán pierde unidades cuatro años seguidos [16].',
};

// 2. Control nuevo explicado: la prueba de reinversión dice que la proyección pide más de lo que financia. No se
// recorta el base (se explica en la síntesis); recalculado aparte con el crecimiento limitado al 2,9 % medio
// (2027e-2033e: 3 / 3,5 / 3,5 / 3 / 2,5 / 2,25 / 2,25 %): DCF 39,79, objetivo 42,89 EUR, RTE 19,2 % y Comprar.
d.meta.controles_explicados.push({
  control: 'Rendimiento del capital nuevo de la proyección',
  explicacion: 'La prueba trata todo el crecimiento como comprado con capital. En el puente, unos dos puntos al año de 2027e-2029e son precio, mezcla y audiología, que casi no lo necesitan, y el margen sube un punto; el ROIC incremental histórico (6,5 %) lo hunden las compras de EE. UU. (410 M EUR con un rendimiento casi nulo) y la caída de margen de 2022-2024, que la proyección no repite. Aun con el crecimiento limitado al 2,9 % medio, lo que financia la reinversión, el objetivo sería de 42,89 EUR y la recomendación, Comprar. El veredicto es «En parte» y la síntesis lo dice.',
});

// 3. Textos que cambian (las cifras salen de calc; el nivel de compra pasa de 51,14 a 48,10 EUR por el cambio del
// motor del 10-oct, no por los supuestos: recalculado datos.json con el motor actual da lo mismo).
const sintesis = d.resumen.sintesis.split('\n\n');
if (sintesis.length !== 7) throw new Error('La síntesis ha cambiado de estructura');
sintesis[0] = '**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 49,13 EUR frente a 37,15 EUR (cierre del 8-oct): un potencial del 32,2 % y una rentabilidad total esperada del 36,0 % con el dividendo del 3,8 %. El alcista gana un 71,5 % y el bajista pierde un 30,0 %: asimetría de 2,38 veces. La razón: el precio descuenta un crecimiento del 2,6 % anual, el ritmo orgánico de los últimos semestres. La convicción es media porque el bajista pierde un 30 % y el base pide un crecimiento que Fielmann aún no ha demostrado fuera de Alemania; la subiría un orgánico de 2027 por encima del 4 % y la bajaría uno por debajo del 3 %.';
sintesis[1] = '**El negocio.** Fielmann es el primer óptico de Alemania, con el 57 % de las gafas y el 25 % del valor, y factura unos 2,3 M EUR por tienda frente a 0,9 M de Apollo [1, 16]. Un margen EBITDA del 23,0 % y un ROIC del 13,9 % frente a un WACC del 7,74 % muestran un foso real; España rinde un 4 % y EE. UU. casi nada, con 410 M EUR pagados [1]. **La calidad sostiene el crecimiento solo en parte**: el foso alemán da un 2-3 % anual por precio y cuota, pero el 4,5 % medio proyectado pide volumen fuera, y la reinversión prevista (20 % del NOPAT) financia un 2,8 % al ROIC actual. No recortamos el base porque unos dos puntos al año son precio, mezcla y audiología, que casi no piden capital; aun limitándolo al 2,9 %, el objetivo sería de 42,89 EUR y seguiría en Comprar.';
sintesis[4] = '**Valoración.** El DCF da 47,10 EUR y pesa la mitad; los escenarios, 45,99 EUR. A 6,8 veces el EBITDA de los últimos 12 meses y 13,7 veces el beneficio esperado, la acción cotiza en mínimos de su historia (media de 11,0 y 31,4 veces) y como National Vision, con el doble de margen. El precio rinde un 8,9 % anual frente a un WACC del 7,74 %. Con la prima implícita del mercado el objetivo sube a 59,79 EUR: las dos reglas dan Comprar. Discrepamos del mercado en que extrapola el peor tramo; no en el plan de la empresa, que no usamos.';
sintesis[6] = '**Qué cambiaría la decisión.** Comprar por debajo de 48,10 EUR y vender por encima de 64,46 EUR. Pasaríamos a Mantener si el crecimiento orgánico de 2027 queda por debajo del 3 %, si el margen ajustado baja del 22 % o si el de EE. UU. no supera el 12 %.';

const T = {
  'resumen.sintesis': sintesis.join('\n\n'),
  'resumen.cambiaria_recomendacion.0': 'Precio por encima de 48,10 EUR: pasaríamos a Mantener.',
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos).`);
