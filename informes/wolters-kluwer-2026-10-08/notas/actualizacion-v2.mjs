// actualizacion-v2.mjs — Wolters Kluwer v2: sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` (puente de ingresos
// 2026e-2029e, mercado final y veredicto). El reparto volumen/precio es estimación propia: la empresa no publica
// su subida media de precios (hueco registrado); se apoya en el orgánico del 5-6 %, la «subida anual de precio»
// como primera vía de cobro de la IA [19] y el paso a productos de más precio (Libra, UpToDate Pro Plus) [19, 20].
// `mercado_final` = null: la cuota del 14,4 % es de tres divisiones (T&A, FCC y L&R) sobre el mercado de 31.000 M
// USD de Thomson Reuters [26], y el motor dividiría los ingresos de todo el grupo (con Health y CP&ESG) por ese
// mercado; la prueba de cuota se hace a mano en la justificación. Sin cambios de supuestos ni de cifras.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/wolters-kluwer-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2, precio_pct: 3, otros_pct: -2.5,
      comentario: 'Orgánico del 5 % en el 1S26 (6 % sin impresos) y guía reiterada el 5-ago-2026; «otros» es la divisa (−4,8 % en el semestre, menos en el 2S) y la venta de FRR (−0,8 %) [8]. El reparto del orgánico entre volumen y precio es estimación propia: la empresa no publica su subida media de precios.' },
    { periodo: '2027e', volumen_pct: 1.5, precio_pct: 3, otros_pct: 0,
      comentario: 'Precio: la subida anual de tarifa y el paso a paquetes con IA, que se cobran más caros (Libra a unas dos veces el contenido jurídico; un tercio de los médicos que renuevan sube a UpToDate Pro Plus) [19, 20]. Volumen: la nube (+14 %) menos impresos y no recurrentes [8].' },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 3, otros_pct: 0,
      comentario: 'Igual que 2027e; un punto por debajo del orgánico de 2021-2025 (6 % anual) y del consenso (+5,5 %) [1, 51].' },
    { periodo: '2029e', volumen_pct: 1, precio_pct: 3, otros_pct: 0,
      comentario: 'El volumen se modera con la competencia de asistentes de IA en la información de consulta (UpToDate y jurídico europeo) [24, 25].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: proyectamos un 4,0-4,5 % anual, menos que el orgánico del 5-6 % que la empresa ha sostenido cada año de 2021 al 1S26, con 2022 y 2025 de ciclo transaccional débil incluidos [1, 8]. Es un negocio de activos ligeros que no necesita capital para crecer: el circulante es negativo por los cobros anticipados. El foso son los costes de cambio (renovaciones por encima del 90 % en UpToDate y del 95 % en CCH Axcess) y el precio se sostiene: la IA se cobra con subidas y paquetes superiores [18, 19, 20]. La cuota no se mide con el motor (el 14,4 % es de tres divisiones): esas divisiones crecerían a la mitad que el mercado previsto (8-11 %) y perderían cuota [26]. El riesgo, la IA gratuita, es el bajista.',
};

// 2. Textos que cambian: la frase obligatoria del veredicto en «El negocio» y el umbral de Mantener, que el motor
// actual calcula en 110,62 EUR (v1: 119,82) con la regla combinada.
const T = {
  'resumen.sintesis': d.resumen.sintesis.replace(
    'Pasaríamos a Mantener por encima de 119,82 EUR', 'Pasaríamos a Mantener por encima de 110,62 EUR').replace(
    'y el ROIC del 25,4 % más que triplica el WACC del 6,84 %.',
    'y el ROIC del 25,4 % más que triplica el WACC del 6,84 %. La calidad sostiene el crecimiento que proyectamos (3,9 % anual de media; 4,0-4,5 % desde 2027): es menos que el orgánico demostrado, se apoya en precio y costes de cambio y no pide capital nuevo, porque el circulante negativo financia el crecimiento.'),
  // El motor recalcula el umbral de Comprar con la regla combinada: 110,62 EUR (antes 119,82).
  'resumen.cambiaria_recomendacion.3': 'Por encima de 110,62 EUR pasaríamos a Mantener, y por encima de 153,32 EUR, a Vender.',
};
if (T['resumen.sintesis'] === d.resumen.sintesis) throw new Error('No se encontró la frase del ROIC en la síntesis');
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos).`);
