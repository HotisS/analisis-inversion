// Actualización v3 de Indra (7 oct 2026): regla relativa (prima implícita del mercado) y DCF en tres etapas.
// No rehace la investigación: parte de datos-v2.json, añade la referencia de mercado y etapa2 (no procede),
// y reescribe los textos que citan la recomendación, el valor objetivo o los niveles. Escribe datos-v3.json.
//   node informes/indra-2026-10-06/notas/actualizacion-v3.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v2.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};

// ── Fuente y referencia de mercado ──
const idD = Math.max(...d.fuentes.map((f) => +f.id)) + 1;
if (idD !== 44) throw new Error(`Id esperado 44, sale ${idD}`);
d.fuentes.push({ id: idD, titulo: 'Implied Equity Risk Premiums by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' });
d.valoracion.referencia_mercado = { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: `Damodaran, prima implícita mensual, octubre de 2026 [${idD}]` };

// ── DCF en tres etapas: no procede (decidido por el negocio, antes de mirar el resultado) ──
d.dcf.etapa2 = { usar: false, anios: 10, margen_final_pct: null, justificacion: 'No procede, aunque el ROIC (18,5 %) supera al WACC (9,11 %) en más de 5 puntos. El objetivo de la OTAN llega a 2035, pero España se ha comprometido a las capacidades con menos gasto [1]; la cartera de Defensa (6,5 veces sus ventas) se ejecuta en cinco o seis años, y Minsait, el negocio de TI, sufre presión de precios y sustitución por IA [7]. La proyección explícita ya converge al 3 % en 2032: alargar el crecimiento supondría un segundo ciclo de pedidos que hoy no está en la cartera.' };

// ── Recomendación (sin cambio: las dos reglas dan Mantener) ──
const r = d.resumen;
r.recomendacion = 'Mantener';
r.conviccion = 'Media';
r.justificacion_recomendacion = null;

r.sintesis = [
  `**La recomendación y por qué.** Mantener, con convicción media. Las dos reglas coinciden. Con nuestro WACC (9,11 %), el valor objetivo es de 58,59 €, un 1,9 % por debajo del precio de 59,72 €: rentabilidad total esperada del −1,4 % y asimetría de 0,57 veces. Con la prima que hoy descuenta el mercado (4,20 %) [${idD}], el WACC baja al 7,98 %, el objetivo sube a 66,22 € y la rentabilidad total al 11,4 % (asimetría de 1,70): Indra gana algo al mercado, pero no el 15 % que pedimos. El precio ya paga el rearme y una caja que no es suya.`,
  `**El negocio.** Indra es el contratista tecnológico de referencia de la defensa española: cartera de 20.533 M, 3,3 veces las ventas [8], con Defensa y Espacio en el 59 % del EBIT del 1S26 [7]. Defensa gana un 20,9 % de margen EBITDA y Espacio un 40,5 %, frente al 8,1 % de Minsait [14]: por eso el margen del grupo pasó del 10,8 % al 14,4 % en un año [8]. El ROIC (18,5 %) dobla el WACC. Su foso es institucional: el Estado es cliente, financiador y primer accionista (SEPI, 28 %) [1].`,
  `**Sector y ciclo.** Es un ciclo de rearme, no económico: el gasto español en defensa pasó del 1,43 % al 2,0 % del PIB en dos años [35], con objetivos hasta 2035 [1]. No lo alargamos con un DCF en tres etapas: España se comprometió a menos gasto que la OTAN [1], la cartera se ejecuta en cinco o seis años y Minsait no tiene ese recorrido [7].`,
  `**Finanzas.** Un tercio del crecimiento de 2026 (+29 %) es inorgánico y TESS diluye el margen (14,4 % frente al 15,3 % sin ella) [8]. Lo decisivo es la caja: el FCF del 1S26 fue de 1.487 M reportados y de solo 15 M sin anticipos PEM [6]. Por eso la caja neta contable de 846 M es en realidad una deuda neta ajustada de 695 M, sobre todo por 1.472 M de anticipos PEM a devolver [5].`,
  `**Equipo y gobierno.** Restan. La dirección anterior superó las guías de 2023-2025 [3, 10], pero en dieciocho meses ha habido tres presidentes y dos consejeros delegados [5, 16]. Fallan también las operaciones vinculadas (856 M facturados al Estado y el conflicto con EM&E) [1, 39] y el voto de remuneraciones (59,9 %) [16].`,
  `**Valoración.** El DCF (35 %) da 56,99 € y los escenarios (25 %), 55,64 €; los comparables (25 %), 66,39 €; la suma de partes (15 %), 54,23 €. El precio ofrece una rentabilidad implícita del 8,8 % anual: menos que nuestro WACC y algo más que el que pide el mercado (7,98 %), con el que el DCF sube a 69,95 €. Descuenta un crecimiento del 11,1 % anual hasta 2032 (10,1 % el nuestro). Con la prima del mercado, nuestro objetivo (66,22 €) coincide casi con el medio del consenso (67,12 €) [43]: discrepamos poco, en un margen de 2028 del 14,7 % frente al 15,2 % [23].`,
  `**Riesgos y catalizadores.** El mayor riesgo son el presupuesto y los PEM: si se retrasan o se reparten (Santa Bárbara los ha recurrido ante el Supremo [1]), el bajista vale 34,64 € (−42,0 %). Le siguen la ejecución industrial y el gobierno. Catalizadores: los resultados de 9M26 a finales de octubre, que exigen unos 360 M de FCF sin PEM en el segundo semestre [8], y el plan estratégico (4T26-1T27), con la decisión sobre Minsait.`,
  `**Qué cambiaría la decisión.** Con las dos reglas, compraríamos por debajo de 57,83 € y venderíamos por encima de 73,94 €. Un FCF sin PEM de 2026 inferior a 250 M nos llevaría a rebajar el valor; una venta de Minsait por encima de 8 veces el EBITDA lo subiría; y una prima implícita del mercado del 3,8 % o menos daría Comprar.`,
].join('\n\n');

cambiar(r, 'tesis', 'Nuestro valor objetivo es de 58,59 € (−1,9 %), con métodos entre 54 € (suma de partes) y 66 € (comparables).', `Nuestro valor objetivo es de 58,59 € (−1,9 %), con métodos entre 54 € (suma de partes) y 66 € (comparables); con la prima de riesgo que hoy pide el mercado (4,20 %) [${idD}], sería de 66,22 € (+10,9 %).`);
cambiar(r, 'tesis', 'La asimetría (+23,8 % frente a −42,0 %) no compensa.', 'Con nuestro WACC la asimetría (+23,8 % frente a −42,0 %) no compensa; con el del mercado, sí (1,70 veces), pero la rentabilidad total esperada del 11,4 % no llega al 15 %.');

r.cambiaria_recomendacion = [
  'Precio: con las dos reglas combinadas, por debajo de 57,83 € pasaríamos a Comprar (rentabilidad total esperada ≥ 15 % con la prima del mercado); por encima de 73,94 €, a Vender (motor).',
  `Si la prima implícita del mercado baja al 3,8 % o menos (4,20 % en octubre de 2026) [${idD}], la regla relativa daría Comprar al precio de hoy (motor).`,
  'Si el FCF sin PEM de 2026 queda por debajo de 250 M, rebajaríamos el valor objetivo y la recomendación.',
  'Si el margen EBITDA del 9M26 baja del 13 %, revisaríamos márgenes a la baja.',
  'Si el plan estratégico anuncia la venta de Minsait por encima de 8x EBITDA, subiríamos el valor objetivo.',
];

cambiar(d.dcf, 'lectura', 'el mercado acepta una rentabilidad del 8,8 %, por debajo de nuestro WACC del 9,11 %.', `el mercado acepta una rentabilidad del 8,8 %, por debajo de nuestro WACC del 9,11 % y por encima del 7,98 % que resulta de la prima implícita del mercado (4,20 %) [${idD}], con la que el DCF sube a 69,95 €.`);
cambiar(d.dcf, 'lectura', 'No vemos margen de seguridad.', 'Con nuestro WACC no vemos margen de seguridad; con el del mercado, uno pequeño.');
cambiar(d.valoracion, 'comentario', 'el valor objetivo de 58,59 € está un 1,9 % por debajo.', `el valor objetivo de 58,59 € está un 1,9 % por debajo. Con la prima implícita del mercado (4,20 %) [${idD}], el DCF y los escenarios se recalculan con un WACC del 7,98 % y el objetivo sube a 66,22 € (+10,9 %), casi el del consenso.`);

writeFileSync(new URL('datos-v3.json', dir), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v3.json escrito. Fuente nueva [${idD}]. Síntesis: ${palabras} palabras.`);
