// actualizacion-v2.mjs — PepsiCo v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con el puente de
// ingresos de 2026e-2028e (volumen, precio y otros), el mercado final y el veredicto. Mismo precio y fecha de corte.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/pepsico-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    {
      periodo: '2026e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 2.8,
      comentario: 'Guía de un 6 % publicado: un 3 % orgánico, 1,5 puntos de divisa y 1,5 de las compras de 2025 [21]. En los tres primeros trimestres el volumen orgánico del grupo sumó 0, +1 y +0,5 puntos y el precio neto +2, +2 y +3, con PFNA bajando precio (−1 a −2 puntos) [21, 23]. Otros: divisa y compras, dos décimas por debajo de la guía.',
    },
    {
      periodo: '2027e', volumen_pct: 1.0, precio_pct: 1.8, otros_pct: 0,
      comentario: 'Solo orgánico, algo por encima del consenso (+2,3 %) [84]. Volumen: internacional (41 % de las ventas, +8 % orgánico en el 3T26) compensa una Norteamérica plana [23]. Precio por debajo del +4 % de 2024-2025, porque PFNA ya cambia precio por volumen [1, 21].',
    },
    {
      periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0,
      comentario: 'El consenso de 2028 da +3,5 % [84]. Supone que el volumen de Norteamérica deja de restar, algo que no ocurre desde 2022 (volumen orgánico del grupo −3 % en 2023 y −2 % en 2024 y 2025) [1, 2, 3], y un precio en línea con la inflación.',
    },
  ],
  // La única cuota con perímetro publicado es la de patatas fritas de bolsa en EE. UU. (56 % de 11.600 M USD) [50],
  // un segmento de ≈ 7 % de las ventas del grupo; no hay tamaño ni previsión del mercado mundial (huecos de sector).
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El foso es real (marcas, reparto directo, ROIC del 21,3 %) y las ventas crecieron todos los años de 2017-2025 [1, 2, 3]. Pero el poder de precios se agotó: tras el +13 % de 2023, el volumen del grupo cae y en 2026 PFNA baja precio para recuperarlo [1, 3, 21]. Nuestro orgánico del 2,8 al 3,5 % en 2027-2029 pide volumen en Norteamérica sin recortar precios, e internacional al 6-8 % [21, 23]. La prueba de cuota no se puede hacer con el grupo (solo hay cuota de patatas fritas de EE. UU. [50]); la reinversión (capex del 4,6-4,8 % frente a un 3,7 % de amortización) sí cubre ese crecimiento.',
};

// 2. Textos que cambian: solo la frase del veredicto en «El negocio». Las cifras no cambian: el motor trata a
// PepsiCo como negocio de activos ligeros (reinversión neta del 9 % del NOPAT) y no avisa de crecimiento sin
// financiar ni de cuota inverosímil, así que no se tocan los supuestos del DCF. Como el veredicto es «En parte»,
// la síntesis explica por qué el caso base queda por encima del orgánico de 2024-2025: con un 2 % anual desde
// 2027 (cálculo aparte con el mismo motor) el DCF daría 148,39 USD y el objetivo 141,29 USD (RTE 14,6 %): Comprar.
const NEGOCIO_V1 = '**El negocio.** El ROIC es del 21,3 %, casi tres veces el WACC del 7,54 %.';
const NEGOCIO_V2 = '**El negocio.** El ROIC es del 21,3 %, casi tres veces el WACC del 7,54 %. **¿Sostiene la calidad el crecimiento que proyectamos? En parte**: las marcas y el reparto directo pagan la inversión (el capex supera a la amortización en un punto de ventas) y las ventas crecieron todos los años de 2017-2025, pero el poder de precios se agotó y nuestro orgánico del 2,8 al 3,5 % en 2027-2029 pide volumen en Norteamérica sin bajar precios: en bebidas cae desde 2023 y en snacks solo ha vuelto en 2026 a cambio de precio [1, 21]. No lo bajamos porque el precio descuenta un 0,2 %: con un 2 % anual desde 2027, como el orgánico de 2024-2025, el valor objetivo sería de 141,29 USD y seguiría siendo Comprar (estimación propia) [13, 14].';
if (!d.resumen.sintesis.includes(NEGOCIO_V1)) throw new Error('No encuentro el párrafo «El negocio»');
const T = {
  'resumen.sintesis': d.resumen.sintesis.replace(NEGOCIO_V1, NEGOCIO_V2),
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
