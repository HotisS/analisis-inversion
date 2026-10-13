// actualizacion-v2.mjs — LVMH v2: prueba de sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct).
// Sin investigación nueva: parte de datos.json, borra calc y añade el puente de ingresos (volumen, precio, otros) de
// 2026e-2030e, el mercado final y el veredicto. No cambia supuestos del DCF: la actualización es de método.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/lvmh-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad.
// Puente: el crecimiento orgánico de 2026e (+2 % en el 1S, +3-4 % en el 2S) se reparte entre volumen y precio por
// estimación propia (LVMH no publica el desglose: es la primera pregunta para la dirección). «Otros» = divisa y perímetro
// (salida de DFS en Gran China, Los Ángeles, San Francisco y Okinawa). Desde 2028e, sin divisa ni perímetro.
// Mercado final: `competencia.cuota_pct` (15,8 %) mide solo Moda y Marroquinería, Relojería y Joyería y Perfumes y
// Cosmética (56.430 M de 80.807 M) sobre el lujo personal de Bain; el motor divide las ventas totales del grupo, así que
// no hay perímetro comparable y va a null (lección de Grifols/Puig). La prueba de cuota se hace a mano en la justificación:
// esos tres grupos suman 81.666 M en 2035e (supuestos.mjs) frente a un mercado de ≈ 572.000 M si crece al 5 % anual
// desde los 369.000 M de 2026e (`sector.tcac_previsto_pct`): 14,3 %, por debajo del 15,8 % de hoy; con un 4 %, 15,5 %.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0, precio_pct: 2.5, otros_pct: -5.4,
      comentario: 'Orgánico ≈ +2,5 % (+2 % en el 1S26 y +3 % en el 2T) [5, 8], casi todo precio y mezcla: Bain ve la marroquinería aún sin volumen tras subir los bolsos icónicos un 50-70 % desde 2019 [12]. Otros: divisa (≈ −4 puntos; −5 en el 1S) y perímetro (≈ −1,5 por la salida de DFS) [5]. Reparto entre volumen y precio: estimación propia.' },
    { periodo: '2027e', volumen_pct: 1.5, precio_pct: 2.2, otros_pct: -0.5,
      comentario: 'Moda recupera algo de volumen con la renovación creativa y subidas de precio moderadas; Distribución Selectiva aún cae un 1 % por DFS (−0,5 puntos de grupo). Sin divisa (estimación propia).' },
    { periodo: '2028e', volumen_pct: 3, precio_pct: 2.5, otros_pct: 0,
      comentario: 'En la banda del 4-6 % anual que Bain prevé para el lujo hasta 2035 [14]: precio en torno a la inflación más mezcla, y volumen por la vuelta del cliente aspiracional y de China [12, 14].' },
    { periodo: '2029e', volumen_pct: 3, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Igual que 2028e: crecimiento del mercado (4-6 %) [14] sin ganar cuota.' },
    { periodo: '2030e', volumen_pct: 2.6, precio_pct: 2.5, otros_pct: 0,
      comentario: 'El volumen se modera hacia la convergencia de 2035e (+2,9 %).' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: el caso base pide menos de lo que LVMH ha demostrado. Crece un 3,5 % anual de media (4,2 % en 2027e-2035e), por debajo del 4-6 % que Bain prevé para el lujo [14] y del 5,9 % de 2021-2025, con precios en torno a la inflación. No gana cuota: Moda, Relojería y Perfumes pasarían del 15,8 % al ≈ 14,3 % del lujo personal en 2035e con el mercado al 5 % (estimación propia: la cuota publicada solo cubre esos grupos) [12]. Reinvierte el 12 % del NOPAT. El foso (marcas, 6.283 tiendas propias, 9.214 M de publicidad) aguanta [2]; el poder de precios tiene límite: las subidas de 2019-2025 costaron volumen [12].',
};

// 2. Textos reescritos (solo los que cambian).
const T = {};
const sintesis = d.resumen.sintesis;
const cambios = [
  ['de lo que el mercado creía en 2023.',
   'de lo que el mercado creía en 2023. La calidad sí sostiene el crecimiento que proyectamos (veredicto de sostenibilidad: Sí): un 3,5 % anual de media, por debajo del 4-6 % que Bain prevé para el lujo [14], con precios en torno a la inflación, sin ganar cuota (del 15,8 % al ≈ 14,3 % del lujo personal en 2035e, estimación propia) y reinvirtiendo solo el 12 % del beneficio operativo después de impuestos.'],
  ['LVMH es compra por debajo de 422,71 EUR, Mantener entre ese nivel y 530,95 EUR, y venta por encima.',
   'LVMH es compra por debajo de 402,62 EUR, Mantener entre ese nivel y 530,95 EUR, y venta por encima (el nivel de compra baja de 422,71 EUR porque, cuando solo la regla relativa da Comprar, ahora se exige además una rentabilidad total del 5 % con nuestro WACC).'],
];
let sint = sintesis;
for (const [a, b] of cambios) { if (!sint.includes(a)) throw new Error(`No encuentro: ${a}`); sint = sint.replace(a, b); }
T['resumen.sintesis'] = sint;
T['resumen.cambiaria_recomendacion.0'] = 'Si la cotización supera 402,62 EUR sin mejora de las estimaciones, pasaríamos a Mantener.';
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos).`);
