// actualizacion-v2.mjs — Krones v2: sostenibilidad del crecimiento (metodología del 10-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con las cifras y fuentes
// que ya estaban en el informe. No cambia supuestos del DCF: la proyección (3,1 % anual de media) va por debajo del
// mercado previsto (3 % la maquinaria, 2,6-4,8 % el consumo de bebidas y PET) y la reinversión la financia de sobra.
// `mercado_final` queda en null: la cuota del 25 % [14] es solo del segmento de llenado y envasado (4.774 M de
// 5.664 M en 2025) y el motor la compararía con las ventas del grupo. La prueba de cuota se hace a mano en la
// justificación: el segmento al ritmo del grupo (≈ 6.460 M en 2035e) frente a un mercado de ≈ 19.000 M que crece un
// 3 % anual (≈ 25.500 M) da un 25,3 %, la cuota de hoy.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/krones-2026-10-09/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.0, precio_pct: 1.3, otros_pct: -1.5,
      comentario: 'Guía del 3-5 % sin divisas y +1,8 % sin divisas en el semestre, con 60 M de efecto divisa (−2,2 puntos en el semestre); pedidos del semestre +4,5 % y relación pedidos/ventas de 1,05. Reparto entre volumen y precio, estimación propia: la empresa habla de disciplina de precios con precios de máquinas estables [1, 2, 12].' },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Pedidos planos en unos 5.500 M tres años y Bernstein espera un 2027 plano; el precio sigue a la inflación de costes, como en 2024-2025, cuando el margen subió con el coste de material a la baja [1, 52].' },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Consumo de bebidas envasadas +2,6 % anual y envases PET +4,8 % hasta 2028; plantas nuevas en India, Taicang y EE. UU. El consenso da +5,8 % [1, 49].' },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0,
      comentario: 'Mismo ritmo que el mercado; sin compras y sin el objetivo de unos 7.000 M en 2028, que pediría un 7,3 % anual [1, 14].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: proyectamos un 3,1 % anual, en línea con su mercado (maquinaria +3 %, bebidas envasadas +2,6 %, PET +4,8 %) [1]. Foso estrecho pero real: escala, base instalada y servicio, con un 25 % del llenado [14]. Poder de precios: el margen subió al 10,6 % en 2025 con precios estables [1]. La reinversión prevista financia un 3,7 % al ROIC del 17,6 % y pide al capital nuevo un 10,8 %, frente a un 31,7 % histórico. La cuota no sube: el segmento de llenado al ritmo del grupo, en un mercado de unos 19.000 M al +3 %, seguiría en el 25 % en 2035e (cálculo a mano: la cuota es solo de ese segmento). El riesgo es el ciclo, y lo recoge el bajista.',
};

// 2. Textos que cambian: la frase obligatoria del veredicto en «El negocio».
// El motor de hoy da dos cambios que no son de opinión: el umbral de compra baja de 138,91 a 127,74 EUR (un Comprar
// solo relativo exige ahora ≥ 5 % con nuestro coste de capital) y el control nuevo de convicción sugiere «Alta». Mantenemos
// «Media» y lo explicamos: es cíclica, los pedidos llevan tres años planos y el valor depende de cuánto dure el margen.
const reemplazos = [
  ['Foso estrecho: escala, base instalada y costes de cambio.',
    'Foso estrecho: escala, base instalada y costes de cambio. Esa calidad sostiene el crecimiento que proyectamos (un 3,1 % anual, en línea con su mercado y con la cuota estable en el 25 %): la reinversión prevista (21 % del beneficio operativo después de impuestos) financia un 3,7 % al ROIC actual y el margen subió en 2025 con precios estables [1].'],
  ['El precio descuenta los márgenes del ciclo anterior, que ya recoge nuestro bajista.',
    'El precio descuenta los márgenes del ciclo anterior, que ya recoge nuestro bajista. La convicción es media, no alta como sugieren los criterios: Krones es cíclica (−16,1 % de ventas en 2020), los pedidos llevan tres años planos y el valor depende de cuánto dure el margen del 10,5-11 %, no de los dos próximos años. Subiríamos la convicción con pedidos del segundo semestre por encima de un +5 % y una guía de 2027 del +4-6 %; la bajaríamos con una relación pedidos/ventas por debajo de 0,95.'],
  ['Compraríamos por debajo de 138,91 EUR', 'Compraríamos por debajo de 127,74 EUR'],
];
let sintesis = d.resumen.sintesis;
for (const [a, b] of reemplazos) {
  if (!sintesis.includes(a)) throw new Error(`No se encontró en la síntesis: ${a}`);
  sintesis = sintesis.replace(a, b);
}
const cambiaria = [...d.resumen.cambiaria_recomendacion];
if (!cambiaria[0].includes('138,91')) throw new Error('cambiaria_recomendacion[0] no tiene 138,91');
cambiaria[0] = cambiaria[0].replace('138,91', '127,74');
const T = {
  'resumen.sintesis': sintesis,
  'resumen.cambiaria_recomendacion': cambiaria,
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
