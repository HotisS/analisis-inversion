// Actualización v4 de CAF (13 oct 2026): caso base al crecimiento financiable (lectura prudente de la sostenibilidad,
// decisión del usuario del 13-oct). Sin investigación nueva: parte de datos-v3.json, borra calc y cambia un solo
// supuesto del DCF: el margen EBITDA de 2027e-2035e se queda en el 8,4 % de 2026e (antes 8,5 % en 2027e y 8,6 % desde
// 2028e). Mismo precio (78,30 EUR) y fecha de corte (6-oct-2026). Escribe datos-v4.json; después:
//   node motor/calcular-empresa.mjs --datos informes/caf-2026-10-06/datos-v4.json
//
// Por qué el margen y no el crecimiento: en la v3 el crecimiento sí era financiable (4,1 % al ROIC del 13,6 % más
// 1,5 puntos de precio por indexación, que no piden capital, frente al 4,4 % de 2027-2035), pero el capital nuevo
// rendía un 18,1 % (tope: 1,25 × 13,6 % = 17,0 %) y el exceso era la subida del margen EBITDA del 7,8 % de 2025 al
// 8,6 % (a margen constante, 12,8 %). Pruebas con el motor: 8,5 % estable → 17,3 % (no pasa); 8,45 % → 17,1 % (no
// pasa); 8,4 % → 16,7 % (pasa). El 8,4 % es lo que ya está a la vista: el consenso de 2026 y el 8,2 % del 1S26 [8, 47].
// Escenarios: se mantienen los desplazamientos (−1,5 / +0,8 puntos de margen); el bajista queda en el 6,9 % y el
// alcista en el 9,2 %, y se corrigen sus narrativas.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v3.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};

// ── Supuesto: margen EBITDA estable en el 8,4 % desde 2027e ──
for (const a of d.dcf.anios) if (!a.fijo) a.margen_ebitda_pct = 8.4;

// ── Control del capital nuevo: ya pasa (16,7 % frente al tope de 17,0 %); fuera su explicación ──
d.meta.controles_explicados = d.meta.controles_explicados.filter((c) => c.control !== 'Rendimiento del capital nuevo de la proyección');

// ── DCF: justificación del margen, lectura y sostenibilidad ──
d.dcf.justificacion.margenes = 'Margen EBITDA del 8,4 % en 2026e (consenso 8,4 %; 8,2 % en el 1S26) y estable en el 8,4 % desde 2027e [8, 47]. Hasta la v3 subía al 8,5 % en 2027e y al 8,6 % desde 2028e; lo dejamos en el de 2026e por la prueba de sostenibilidad: con esa subida, el capital nuevo tendría que rendir un 18,1 %, frente a un ROIC del 13,6 % (12,8 % a margen constante), y la mejora no está demostrada. Con el 8,4 %, rinde un 16,7 %, dentro de 1,25 veces el ROIC. Queda medio punto por debajo del consenso de 2028 (8,9 %) [47]: CAF no ha superado el 8,7 % desde 2018 y la media de 2019-2025 es del 7,7 % [1, 2, 3, 4, 5]. Las razones para que mejore son reales (Solaris en el 7,3 % de margen EBIT, más servicios —4.615 M de cartera—, contratos nuevos con cláusulas de indexación desde 2022 [15]), pero el Ferroviario sigue en el 5,2 % de EBIT y la propia empresa reconoce contratos «aún impactados por la inflación» [1, 8]. Un 8,4 % de EBITDA es un margen EBIT de ≈ 6,0 %, por debajo del ≥ 6,3 % que prometía el Plan 2026 para este año [15]: si el plan 2027-2030 lo demuestra, es potencial que el base no recoge (≈ 21 EUR por acción por punto).';

d.dcf.lectura = 'El DCF da 81,56 EUR por acción, un 4,2 % por encima del precio de 78,30 EUR, con un rango de 69,80-97,83 EUR al mover el WACC y el crecimiento terminal medio punto. El valor terminal pesa un 63 %. La pregunta central es qué descuenta el precio, y el DCF inverso responde que casi lo mismo que nosotros. Con nuestro WACC del 8,11 %, el precio supone un crecimiento de las ventas del 3,6 % anual en 2027-2035 (nosotros, 4,4 %) o un margen EBITDA estable del 8,2 % (nosotros, 8,4 %; el 1S26 dio un 8,2 %). Dicho de otra forma, a 78,30 EUR la acción ofrece una rentabilidad anual del 8,3 %, dos décimas por encima del WACC y 1,1 puntos por encima del 7,20 % que resulta de la prima implícita del mercado (4,20 %) [73], con la que el DCF sube a 99,37 EUR. No es exigente: el mercado descuenta que la cartera récord se ejecuta y que el margen se queda donde está hoy, que es justo nuestro caso base desde que lo dejamos en el margen que la empresa puede financiar. Pero tampoco es barata: el potencial depende de un margen que CAF nunca ha demostrado, y cada punto de margen EBITDA vale ≈ 21 EUR por acción (60,41 EUR con un 7,4 %; 102,71 EUR con un 9,4 %); la historia de 2019-2025 está más cerca de la fila de abajo que de la de arriba.';

d.dcf.sostenibilidad.justificacion = 'En parte, y el caso base ya queda dentro de lo financiable. El volumen, sí: los 17.743 M de cartera de jun-26 (3,7 años de ventas) cubren el 93-97 % de las ventas previstas para 2026-2027, y la reinversión (31 % del NOPAT, con el circulante subiendo del 9 % al 12 % de las ventas) financia un 4,2 % anual al ROIC del 13,6 %; el resto hasta el 4,4 % de 2027-2035 es precio (1,5 puntos de indexación en el puente), que no pide capital [1, 8, 15]. El margen no está demostrado: foso estrecho, concursos a precio cerrado y una inflación que en 2022 restó ≈ 1,5 puntos [15]. Por eso el base no lo sube: se queda en el 8,4 % de 2026e y el capital nuevo rinde un 16,7 %, dentro de 1,25 veces el ROIC (con el 8,6 % de la v3 eran un 18,1 %). Cuota, a mano (la publicada es solo ferroviaria): del 1,5 % a ≈ 1,7 % de un mercado de ≈ 312.000 M en 2035 [24].';

// ── Escenarios ──
const [baj, base, alc] = d.escenarios.casos;
cambiar(baj, 'narrativa', 'el margen EBITDA cae al 7,1 %, algo por debajo del 7,3 % de 2020 y 2022 [1, 26]', 'el margen EBITDA cae al 6,9 %, por debajo del 7,3 % de 2020 y 2022 [1, 26]');
cambiar(base, 'narrativa', 'y el margen EBITDA sube del 7,8 % de 2025 al 8,6 % por Solaris, los servicios y los contratos firmados después de la inflación [1, 8].', 'y el margen EBITDA sube del 7,8 % de 2025 al 8,4 % de 2026e por Solaris, los servicios y los contratos firmados después de la inflación, y se queda ahí: no suponemos más mejora que la que ya se ve (8,2 % en el 1S26), porque la reinversión prevista no la financia [1, 8].');
cambiar(alc, 'narrativa', 'confirma un margen EBIT por encima del 6,5 % (EBITDA del 9,4 %, cerca del 9,8 % de 2018)', 'confirma un margen EBIT por encima del 6,5 % (EBITDA del 9,2 %, por debajo del 9,8 % de 2018)');
d.escenarios.comentario = 'Con nuestro WACC la asimetría ya no es favorable: el alcista (116,74 EUR) gana un 49,1 % y el bajista (39,18 EUR) pierde un 50,0 %, una relación de 0,98x. El valor ponderado por probabilidades es de 79,76 EUR, un 1,9 % por encima del precio. El bajista es verosímil, no cosmético: es un margen inferior al de 2020 y 2022 (7,3 %), con una cartera firmada a precio cerrado, y la sensibilidad del motor lo confirma (cada punto de margen EBITDA vale ≈ 21 EUR por acción). Con la prima del mercado (WACC del 7,20 %) la asimetría sube a 2,14x: por eso el Comprar es solo relativo. Para que compense comprar con nuestro coste de capital habría que creer en el alcista con más de un 25 % de probabilidad, y eso exige un margen que CAF no ha visto desde 2018.';

// ── Valoración y riesgos ──
cambiar(d.valoracion, 'comentario', 'quedan entre un 7 % y un 16 % por encima del precio', 'quedan entre un 2 % y un 16 % por encima del precio');
cambiar(d.valoracion, 'comentario', 'el valor objetivo sube a 97,98 EUR (+25,1 %)', 'el valor objetivo sube a 94,34 EUR (+20,5 %)');
d.riesgos.items[0].efecto_valor = '−26 % por cada punto de margen EBITDA permanente (81,56 → 60,41 EUR)';

// ── Resumen ──
const r = d.resumen;
r.recomendacion = 'Comprar';
r.conviccion = 'Baja';

r.sintesis = [
  '**La recomendación y por qué.** Comprar, con convicción baja, horizonte de 12 meses y en el límite. Con nuestro WACC (8,11 %), el valor objetivo es de 80,97 EUR frente a 78,30 EUR: una rentabilidad total esperada del 5,4 % con el dividendo y una asimetría de 0,98x; la regla absoluta da Mantener. Con la prima que hoy descuenta el mercado (4,20 %) [73], el WACC baja al 7,20 %, el objetivo sube a 94,34 EUR y la rentabilidad total al 22,4 % (asimetría de 2,14x): Comprar, y manda esta regla relativa. Un Comprar solo relativo exige al menos un 5 % con nuestro WACC, y el 5,4 % apenas lo pasa. Frente a la v3 (84,06 EUR), el objetivo baja porque el base ya no sube el margen.',
  '**El negocio.** CAF es un integrador de trenes de segundo nivel (≈ 1,5 % del mercado ferroviario mundial) con un fabricante de autobuses dentro, Solaris [1, 24]. Su ventaja es la cartera: 17.743 M a jun-26, 3,7 años de ventas [8]. El ROIC subió al 13,6 % en 2025 (5,9-9,7 % en 2018-2023) por la rotación más que por el margen: el EBIT ferroviario sigue en el 5,2 % [1]. ¿Sostiene su calidad el crecimiento que proyectamos? En parte. Las ventas (4,4 % anual en 2027-2035) salen de la cartera, y la reinversión financia un 4,2 % al ROIC actual, más 1,5 puntos de precio que no piden capital [8, 15]. El margen no está demostrado: lo dejamos en el 8,4 % de 2026e en vez de subirlo al 8,6 %, y el capital nuevo rinde un 16,7 %, no un 18,1 %.',
  '**Finanzas.** El beneficio crece (BPA de 5,03 EUR en los últimos 12 meses), pero no se cobra: el FCF después de intereses y arrendamientos fue de −52,5, 16,9 y 4,6 M en 2023-2025, porque el circulante absorbe unos 21 céntimos por euro de ventas nuevas [1, 2, 3]. Deuda neta ajustada (arrendamientos, factoring, multa del CADE y dividendo de julio): 531 M [6].',
  '**Equipo y gobierno.** Ni suma ni resta mucho: un bloque vasco y de empleados del 39,35 % hace improbable una OPA [6]; puntos flojos, un 30 % de independientes, un presidente reelegido con un 17,59 % en contra y un incentivo ligado al EBIT, no a la caja [1, 37].',
  '**Valoración.** El DCF da 81,56 EUR; los escenarios ponderados, 79,76; los comparables, 90,84; la suma de partes, 67,18. CAF cotiza a 7,0x el EBITDA de los próximos 12 meses (mediana del sector, 7,3x) [59]. El precio ofrece una rentabilidad implícita del 8,3 %, apenas por encima de nuestro WACC y más que la que pide el mercado (7,20 %); en crecimiento descuenta un 3,6 % anual frente a nuestro 4,4 %. El consenso pone más margen (8,9 % en 2028) y, aun así, su precio objetivo (69,22-73,95 EUR) queda bajo la cotización [46, 48]. Las reglas discrepan solo por la tasa de descuento: convicción baja.',
  '**Riesgos y catalizadores.** El riesgo dominante es el margen: cada punto de EBITDA vale ≈ 21 EUR por acción, y la cartera incluye grandes contratos a precio cerrado (SNCB, más de 1.700 M) [8]. Con una prima implícita del mercado por encima del 5 %, la regla relativa vuelve a Mantener. Catalizadores: resultados de 9M26 (12-nov-2026) y el Plan 2027-2030 del 4T26 [8]; un margen demostrado por encima del 8,4 % sería potencial que el base no recoge.',
  '**Qué cambiaría la decisión.** Con las dos reglas, por debajo de 78,54 EUR es Comprar y por encima de 106,56 EUR, Vender: estamos en el borde. Subiríamos la convicción con un plan 2027-2030 de margen EBIT por encima del 6,5 % y un objetivo de caja creíble, y un cash flow positivo en el 2S26. Volveríamos a Mantener si el margen EBIT ferroviario baja del 5 % o si el plan incluye una compra de más de 500 M con deuda.',
].join('\n\n');

r.tesis = r.tesis.split('\n\n').map((p, i) => {
  if (i === 1) return 'A 78,30 EUR, CAF cotiza a 7,0x el EBITDA de los próximos 12 meses y 12,4x el beneficio, en la mediana de sus comparables y un 21 % por encima de su media histórica en EV/EBITDA. El DCF inverso dice que el precio supone un margen EBITDA estable del 8,2 %, el del 1S26, o un crecimiento del 3,6 % anual, por debajo de lo que respalda la cartera. No es un precio exigente.';
  if (i === 2) return 'Con nuestro coste de capital no es una oportunidad: el DCF (81,56 EUR) solo supera el precio en un 4,2 %, y eso con un margen del 8,4 %, el de 2026e, que dejamos estable porque es lo que la reinversión prevista puede financiar, y con un circulante que debería dejar de crecer más que las ventas. Con la prima de riesgo que hoy pide el mercado (4,20 %) [73], el objetivo es de 94,34 EUR: CAF es barata frente al mercado, no en términos absolutos. Para invertir hay que creer que el plan 2027-2030 convertirá la cartera en caja —la historia de 2022-2025 (FCF casi nulo) dice que hay que verlo [1]— y que el mercado no vuelve a pedir una prima de riesgo más alta.';
  return p;
}).join('\n\n');
if (!r.tesis.includes('81,56') || !r.tesis.includes('3,6 %')) throw new Error('Tesis: párrafos no sustituidos');

cambiar(r.vision_diferencial, 'mercado_descuenta', 'eso deja una rentabilidad implícita del 8,6 %, muy cerca de nuestro coste del capital (8,11 %)', 'eso deja una rentabilidad implícita del 8,3 %, casi igual a nuestro coste del capital (8,11 %)');
r.vision_diferencial.nuestra_vision = 'Coincidimos en las ventas, que respalda la cartera, y somos más prudentes en el margen (8,4 % estable, el de 2026e, frente al 8,9 % del consenso en 2028: la reinversión prevista no financia más) y bastante más en la caja: suponemos que el circulante seguirá subiendo hasta el 12 % de las ventas, como en 2022-2025, porque los activos por contrato crecen más que los anticipos (posición neta deudora de 362 M a jun-26, frente a 130 M en dic-25) [6]. Con eso, y con nuestra prima de mercado del 5,5 %, CAF vale 80-82 EUR, un 2-4 % más que hoy; con la prima que hoy pide el mercado, 94,34 EUR.';
r.a_favor[4] = '**Precio poco exigente**: el DCF inverso supone un 3,6 % anual, frente al 4,4 % del caso base, o un margen EBITDA del 8,2 %, el del 1S26.';
r.kpis_seguimiento[0].por_que = 'La guía promete mejora; el DCF supone ≈ 6,0 % estable (EBITDA del 8,4 %).';
r.cambiaria_recomendacion[0] = 'Precio: con las dos reglas combinadas, por debajo de 78,54 EUR seguimos en Comprar; entre 78,54 y 106,56 EUR, Mantener; por encima de 106,56 EUR, Vender (motor).';

writeFileSync(new URL('datos-v4.json', dir), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v4.json escrito. Síntesis: ${palabras} palabras.`);
