// actualizacion-v2.mjs — A. O. Smith v2 (13-oct-2026): metodología nueva, prueba de sostenibilidad del crecimiento.
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con las fuentes ya citadas.
// La prueba pasa (veredicto «Sí»): el crecimiento medio del 3,4 % (2026e-2032e) sale sobre todo del precio (+2,5-3 %
// al año, demostrado en 2025 y con la subida del 4-7 % de 2026) sobre un volumen casi plano, por debajo del 4,0 % de
// 2016-2025 (que incluyó compras). La reinversión neta es pequeña (73 M, el 2 % del NOPAT: capex ≈ amortización, que
// incluye intangibles de compras), así que el motor no da crecimiento financiable y la prueba es el poder de precios.
// `mercado_final` va en null: la empresa no publica cuota y el mercado está en unidades (AHRI), sin perímetro en USD
// comparable (lo de Arizton es incompatible con las ventas de AOS). No se cambia ninguna cifra del DCF.
// Textos: frase del veredicto en «El negocio», explicación de la convicción (control nuevo del motor) y el nivel de
// compra, que el motor actual mueve de 55,41 a 53,91 USD (regla del 9/10-oct) sin cambiar datos.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/ao-smith-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -2.5, precio_pct: 2.5, otros_pct: 1.8,
      comentario: 'Volumen: envíos residenciales de EE. UU. −4,0 % hasta julio [23] y China con una caída de dos cifras bajas prevista para el año [6]. Precio: subidas del primer semestre de 2025 y del 4-7 % desde el final del 2T26 [6, 28]. Otros: Leonard Valve, unos 70 M en 2026 [6]. Reparto entre volumen y precio, estimación propia.' },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 0.5,
      comentario: 'Volumen casi plano, como el mercado (9,24 M de calentadores en 2020 y 9,28 M en 2025) [22, 24], con China ya en una base baja e India creciendo a doble dígito [13, 14]. Precio en línea con el de 2025, cuando las ventas de Norteamérica subieron por precio con menos unidades [1]. Otros: mezcla hacia calderas de condensación (+8 % en 2025) [1].' },
    { periodo: '2028e', volumen_pct: 1, precio_pct: 2.5, otros_pct: 0.3,
      comentario: 'Recuperación parcial de la obra nueva tras la contracción de 2025-2026 [1, 23]; precio por debajo de las subidas recientes [6]. El consenso da +4,0 % [65].' },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 3, otros_pct: 0.5,
      comentario: 'La norma del DOE obliga a bomba de calor en los eléctricos de más de 35 galones desde mayo de 2029 y sube el precio medio [25]; es un salto de una vez, no un precio que se repita.' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí. El base crece un 3,4 % al año, menos que el 4,0 % de 2016-2025, que incluyó compras [1], y casi todo es precio sobre un volumen plano. El poder de precios está demostrado: en 2025 las ventas de calentadores de Norteamérica subieron por precio con menos unidades y el margen del segmento pasó del 24,0 % al 24,4 % [1], y en 2026 sube otro 4-7 % con el acero [6]. El mercado es de reposición (80-85 %) [28] y el volumen proyectado (−2,5 % a +1 %) no pide ganar cuota. La reinversión neta es solo del 2 % del NOPAT (73 M) porque el capex iguala a una amortización que incluye intangibles de compras: no es un negocio sin inversión, pero el crecimiento no pide capital nuevo y el ROIC es del 30,7 %. No hay cuota publicada para la prueba de cuota.',
};

// Textos que cambian.
const sint = d.resumen.sintesis;
const cambios = [
  ['Mantener, con convicción media. El valor objetivo',
    'Mantener, con convicción media: las dos reglas dan Mantener lejos de sus umbrales; subiría la convicción ver crecer otra vez los envíos de AHRI y la bajaría una caída del margen de Norteamérica por debajo del 22 %. El valor objetivo'],
  ['todo el crecimiento es precio [22, 24].',
    'todo el crecimiento es precio [22, 24]. La calidad sí sostiene el crecimiento que proyectamos (veredicto de sostenibilidad: Sí): el 3,4 % anual sale del precio, ya demostrado en 2025 [1], no pide cuota y apenas pide capital nuevo.'],
  ['Compraríamos por debajo de 55,41 USD', 'Compraríamos por debajo de 53,91 USD'],
  // Recorte para mantener la síntesis cerca de las 650 palabras.
  [' Nuestras cifras están un 2-3 % por debajo del EBITDA del consenso [65].', ''],
  [' China pesa poco en el valor (unos 2,15 USD por acción).', ''],
  [' La guía se cumplió en tres de los últimos seis años [10, 14, 56, 57, 58, 59, 60].', ''],
];
let s = sint;
for (const [a, b] of cambios) {
  if (!s.includes(a)) throw new Error(`No encuentro en la síntesis: ${a}`);
  s = s.replace(a, b);
}
d.resumen.sintesis = s;

const c0 = d.resumen.cambiaria_recomendacion[0];
if (!c0.includes('55,41')) throw new Error('cambiaria_recomendacion[0] sin 55,41');
d.resumen.cambiaria_recomendacion[0] = c0.replace('55,41', '53,91');

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (síntesis de ${s.split(/\s+/).length} palabras).`);
