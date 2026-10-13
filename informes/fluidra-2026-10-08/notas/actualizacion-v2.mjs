// actualizacion-v2.mjs — Fluidra v2: prueba de sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade el puente de ingresos (volumen, precio y otros) de
// 2026e-2030e, el mercado final de 2033e y el veredicto. Las cifras del DCF no cambian: la proyección crece por debajo
// del mercado (4,2 % frente a 4-6 %) con la cuota a la baja, así que la prueba no pide recortar nada.
// El mercado final sigue la serie de la sección 3 (17.400 M EUR en 2025, mismo perímetro que la cuota del 13 % [1]) al
// 5 % anual, el punto medio del 4-6 % que espera Fluidra [3]: 17.400 × 1,05^8 ≈ 25.700 M en 2033e. Con el 4,7 % de los
// estudios independientes [31, 32] serían ≈ 25.100 M y la cuota implícita pasaría del 11,7 % al 12,0 %: igual conclusión.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/fluidra-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 3, otros_pct: -2,
      comentario: 'Lo publicado en el semestre: volumen +2 % y precio +3 % en el 1S26, y precio +2 % y volumen +3 % en el 2T26; la guía es del +3 % al +7 % a tipo constante y la divisa resta unos dos puntos (4,9 % a tipo constante frente a 2,6 % publicado) [2, 3, 7].' },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Volumen de reposición y mantenimiento (65 % de las ventas) sobre una base instalada que crece; la obra nueva solo deja de caer. Precio del 2 %, por debajo del 3 % del 1S26, por la fatiga de precios tras las subidas de la pospandemia [1, 3, 7]. Reparto propio.' },
    { periodo: '2028e', volumen_pct: 3, precio_pct: 2, otros_pct: 0,
      comentario: 'Algo de recuperación de la obra nueva desde mínimos (169.000 piscinas en los cinco primeros países, un 21 % por debajo de su media) y subidas de precio ordinarias; el consenso da +5,0 % [3, 42]. Reparto propio.' },
    { periodo: '2029e', volumen_pct: 3, precio_pct: 2, otros_pct: 0,
      comentario: 'Igual que 2028e: en línea con el mercado (+4-6 % según Fluidra y +4,6-4,7 % según dos estudios) [3, 31, 32]. Reparto propio.' },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Empieza la convergencia hacia el 3 % de 2033e: menos volumen, precio en línea con la inflación y el cambio a equipos de más valor (bombas de velocidad variable, automatización) [1]. Reparto propio.' },
  ],
  mercado_final: { periodo: '2033e', tamano: 25700 },
  veredicto: 'Sí',
  justificacion: 'Sí: la proyección (4,1 % anual en 2026e-2033e) pide menos que el mercado (4-6 % según Fluidra y 4,6-4,7 % según dos estudios [3, 31, 32]) y menos que el objetivo de la empresa (6-8 % [3]); la cuota baja del 12,6 % al 11,7 % en 2033e. El foso es estrecho pero estable: reposición con la marca que el instalador conoce y Zodiac ganando peso en Pool Corporation [1, 12]. El poder de precios está demostrado (+5 % en Norteamérica en 2025, +3 % en el 1S26 [3, 6]) y suponemos solo un 2 %. La reinversión neta sale nula porque la amortización incluye 57 M de intangibles de Zodiac, que no hay que reponer; el capex bruto (5,5 % con arrendamientos) mantiene el de 2021-2025. El ciclo (−14 % en 2023) va en el bajista.',
};

// 2. Textos que cambian: la frase obligatoria del veredicto en «El negocio»; el nivel de compra, que el motor
// recalcula con la regla combinada (un Comprar solo relativo exige ≥ 5 % con nuestro coste de capital): 23,89 → 21,78 EUR;
// y la convicción, que ahora el motor contrasta con la sugerida («Alta»): se queda en Media y se dice por qué.
const T = {};
let sint = d.resumen.sintesis;
const cambios = [
  ['crecer añade poco valor.',
    'crecer añade poco valor. La calidad sí sostiene el crecimiento que proyectamos: un 4,1 % anual, por debajo del mercado (4-6 %), con subidas de precio del 2 % frente al 3 % del 1S26 y la cuota bajando del 12,6 % al 11,7 % en 2033e [3, 31, 32].'],
  ['discrepamos en el riesgo que se paga, no en la previsión, y eso limita la convicción.',
    'discrepamos en el riesgo que se paga, no en la previsión, y eso limita la convicción: la dejamos en media aunque los criterios del motor sugieran alta, porque el precio puede seguir descontando el valle mientras la obra nueva no repunte. La subiríamos si la obra nueva de EE. UU. vuelve a crecer.'],
  ['Compraríamos por debajo de 23,89 EUR, mantendríamos entre 23,89 y 30,42',
    'Compraríamos por debajo de 21,78 EUR, mantendríamos entre 21,78 y 30,42'],
];
for (const [a, b] of cambios) {
  if (!sint.includes(a)) throw new Error(`No encuentro en la síntesis: ${a}`);
  sint = sint.replace(a, b);
}
T['resumen.sintesis'] = sint;
T['resumen.cambiaria_recomendacion.3'] = 'Si el precio supera los 21,78 EUR sin cambios en las cifras, pasaríamos a Mantener; por encima de 30,42 EUR, a Vender.';

for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (sostenibilidad: ${d.dcf.sostenibilidad.veredicto}; ${Object.keys(T).length} textos).`);
