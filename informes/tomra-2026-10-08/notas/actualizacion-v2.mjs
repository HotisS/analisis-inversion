// actualizacion-v2.mjs — Tomra v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// Sin investigación nueva: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con el puente de
// ingresos de 2026e-2030e (volumen, precio y otros), el mercado final (null: no hay perímetro comparable,
// `competencia.cuota_pct` es null y la serie del sector es solo venta de RVM en USD) y el veredicto.
// Mismo precio (92,95 NOK, 8,68 EUR) y fecha de corte (8-oct-2026) que el informe anterior.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/tomra-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad. El reparto entre volumen y precio es estimación propia: Tomra no lo publica.
//    Precio: ~2 puntos al año, la indexación de los contratos de servicio y throughput (61 % de Collection)
//    y la reposición; los concursos de mercados nuevos se ganan con menos margen de producto (Polonia).
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 11, precio_pct: 2, otros_pct: -1,
      comentario: 'Guía por división del 2T26: Polonia y los mercados nuevos (Portugal, Singapur) llevan Collection a 874 M, y Recycling y Food quedan en el centro de sus rangos [4]. Divisa: en el 1T26 Collection creció un 12 %, un 15 % a tipo constante [4]. Reparto entre volumen y precio, estimación propia.' },
    { periodo: '2027e', volumen_pct: 9.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Volumen: el Reino Unido arranca el 1-oct-2027 con ~3.900 máquinas adjudicadas y la segunda fase de Polonia; los pedidos de Recycling suben un 40 % en el 2T26 [4, 11].' },
    { periodo: '2028e', volumen_pct: 4, precio_pct: 2, otros_pct: 0,
      comentario: 'Final de la instalación británica; servicio y throughput crecen con la base instalada (el servicio, +11 % en 2025) [4].' },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Hueco tras el pico, como el −4 % de Collection en 2025 tras las entregas de 2024 [13].' },
    { periodo: '2030e', volumen_pct: 4, precio_pct: 2, otros_pct: 0,
      comentario: 'Mercados de la UE que el PPWR obliga a implantar el depósito desde 2029 [13].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. Collection tiene un foso amplio: 91.900 máquinas frente a 13.000 de Envipco y un 61 % de ingresos de servicio, throughput y material [4, 13, 14]. Pero se estrecha: los mercados nuevos se ganan en concurso con menos margen de producto (margen bruto de Collection del 38,6 % en el 2T26) [1, 4], y Recycling y Food son cíclicos. Las ventas crecieron un 5,3 % anual en 2021-2025 mientras el ROIC bajaba del 15,0 % al 9,8 %. La proyección reinvierte el 20 % del NOPAT, que al ROIC actual financia un 2,0 % de crecimiento frente al 6,1 % proyectado: supone un ROIC del 18 % en 2035e, por encima de cualquier año de la serie. Sin una cuota publicada con perímetro comparable, no hay prueba de cuota.',
};

// 2. Textos que cambian.
const sint = d.resumen.sintesis.split('\n\n');
const iRec = sint.findIndex((p) => p.startsWith('**La recomendación y por qué.**'));
const iNeg = sint.findIndex((p) => p.startsWith('**El negocio.**'));
if (iRec < 0 || iNeg < 0) throw new Error('Síntesis sin los párrafos esperados');
sint[iRec] += ' La convicción es baja porque las dos reglas discrepan y porque el caso base pide al capital un rendimiento que Tomra no ha demostrado; la subirían un margen bruto de Collection del 40 % o más en el 2S26 y unos objetivos de ROCE en el Capital Markets Day, y la bajaría un ROIC de 2026 por debajo del WACC.';
sint[iNeg] += ' ¿Sostiene la calidad el crecimiento que proyectamos? En parte: el foso de Collection asegura el volumen que traen las leyes, pero la proyección supone que el capital nuevo rinde un 39,3 % (un ROIC del 18 % en 2035e, frente a un máximo del 15,0 %), cuando el incremental de 2021-2025 fue negativo. No la recortamos porque la mejora es de margen sobre el capital ya invertido en 2024-2025 (Feedstock, flota de throughput, existencias y cobros de Polonia) y queda por debajo de la ambición de 2030 y del consenso [34, 49]; con el ROIC en el 15 %, el DCF bajaría a 6,48 EUR, cerca del bajista.';

// Niveles: el motor del 10-oct exige que un Comprar solo relativo dé ≥ 5 % con nuestro coste de capital, y el
// nivel de compra baja de 9,65 a 9,19 EUR (98,39 NOK). Las cifras salen de calc.recomendacion.niveles.
const niveles = (t) => t.replaceAll('9,65 EUR (103,35 NOK)', '9,19 EUR (98,39 NOK)');
const T = {
  'resumen.sintesis': niveles(sint.join('\n\n')),
  'resumen.cambiaria_recomendacion': d.resumen.cambiaria_recomendacion.map(niveles),
};
d.meta.controles_explicados.push({
  control: 'Rendimiento del capital nuevo de la proyección',
  explicacion: 'La subida del NOPAT (de 110 M a 284 M en 2035e) sale sobre todo del margen (EBIT del 11,0 % al 15,8 %) sobre el capital ya invertido en 2024-2025, no del capital nuevo: Feedstock (congelado en el 4T25), la flota de throughput, las existencias para mercados nuevos y los cobros de Polonia aún no rinden [1, 4, 30]. Aun así, el ROIC de 2035e (18 %) supera el máximo histórico (15,0 %); con el ROIC en el 15 % el DCF sería de 6,48 EUR. Veredicto de sostenibilidad «En parte», explicado en la síntesis.',
});

const set = (ruta, valor) => {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
};
for (const [ruta, valor] of Object.entries(T)) set(ruta, valor);

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos).`);
