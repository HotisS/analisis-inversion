// actualizacion-v2.mjs — Dassault Systèmes v2: metodología del 10-oct (dcf.sostenibilidad).
// Sin investigación nueva: parte de datos.json, borra calc y añade la prueba de sostenibilidad del crecimiento
// con lo que ya estaba en el informe (guía 2026, ARR, KPIs, CIMdata). No cambia supuestos del DCF.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/dassault-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
// Mercado final: mismo perímetro que competencia.cuota_pct (8,3 % del PLM amplio de CIMdata, 88.300 M USD en 2025).
// CIMdata solo prevé hasta 2029e (126.700 M USD) [27]; para 2035e usamos esa cifra sin crecer más, pasada a EUR
// al mismo tipo que la cuota (1,175 USD/EUR [26]): 107.830 M EUR. Es una cota baja del mercado, así que la cuota
// implícita que sale es una cota alta.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: -1.9,
      comentario: 'Guía de +3-5 % a tipo constante y +1-3 % publicado: unos dos puntos de divisa en contra (otros) [2, 39]. La empresa no publica precios ni renovaciones; el reparto entre usuarios (3DEXPERIENCE, nube) y precio es estimación propia, con Ciencias de la vida restando volumen (−3 % en el 1S26) [2].' },
    { periodo: '2027e', volumen_pct: 3, precio_pct: 1.5, otros_pct: 0.5,
      comentario: 'ARR +6 % y suscripción +8 % en el 2T26 [2]; el paso de licencias a suscripción frena hoy la cifra y se diluye (mezcla en otros). Precio: margen non-IFRS estable en el 32 % con inflación salarial, única evidencia indirecta [2]. Reparto, estimación propia.' },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.5,
      comentario: 'Más penetración de 3DEXPERIENCE (43 % del software elegible en el 2T26) y nube (28 %) [2]; el consenso da +6,2 % [45]. Reparto, estimación propia.' },
  ],
  mercado_final: { periodo: '2035e', tamano: 107830 },
  veredicto: 'Sí',
  justificacion: 'Sí: el base pide poco. Un 4,1 % anual en 2026e-2035e, cerca del 4 % a tipo constante de 2025 y por debajo del ARR (+6 %), y menos de la mitad del 9,6 % previsto para su mercado [1, 2, 27]. La cuota implícita en 2035e (8,6 % frente al 8,3 %) congela el mercado en 2029e: es una cota alta. Casi no necesita capital (capex del 4 % frente a una amortización del 3,4 %), así que la prueba es la cuota y el precio: costes de cambio altos (82 % recurrente, décadas de datos en CATIA) [1, 4]. Lo no demostrado es el poder de precios, que no se publica, y crece por debajo de su mercado desde 2024 [10, 36].',
};

// 2. Textos que cambian. Las cifras del DCF no se mueven; el motor nuevo sí cambia el nivel de compra
// (comprar por debajo de 24,13 EUR, antes 25,73) y pide que la síntesis explique la convicción.
const cambios = [
  ['resumen.sintesis',
    'Comprar, con convicción media. El valor objetivo',
    'Comprar, con convicción media. La convicción es media, la que dan los criterios: la rentabilidad total esperada (17,9 %) no llega al 25 % y el precio descuenta 2,4 puntos de crecimiento menos que nuestro base, no tres; la subiría una guía de 2027 por encima del 5 % a tipo constante y la bajaría otro recorte de guía. El valor objetivo'],
  ['resumen.sintesis',
    'por el paso de licencias a suscripción [2].',
    'por el paso de licencias a suscripción [2]. La calidad sí sostiene el crecimiento que proyectamos (veredicto: sí): un 4,1 % anual, menos de la mitad del mercado, casi sin capital nuevo y con una cuota en 2035e del 8,6 % frente al 8,3 % de hoy; lo que no está demostrado es el poder de precios, que la empresa no publica.'],
  ['resumen.sintesis',
    'Seguimos en Comprar por debajo de 25,73 EUR',
    'Seguimos en Comprar por debajo de 24,13 EUR'],
  ['resumen.cambiaria_recomendacion.3',
    'por debajo de 25,73 EUR',
    'por debajo de 24,13 EUR'],
];
for (const [ruta, antes, despues] of cambios) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  const k = partes.at(-1);
  if (typeof o?.[k] !== 'string' || !o[k].includes(antes)) throw new Error(`No encuentro «${antes}» en ${ruta}`);
  o[k] = o[k].replace(antes, despues);
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log('datos-v2.json escrito.');
