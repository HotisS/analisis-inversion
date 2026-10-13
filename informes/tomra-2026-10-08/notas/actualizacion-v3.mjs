// actualizacion-v3.mjs — Tomra v3: caso base al crecimiento financiable (lectura prudente de la sostenibilidad, 13-oct-2026).
// Sin investigación nueva: parte de datos-v2.json, borra calc y rebaja SOLO el margen EBITDA del caso base desde 2027e,
// de forma que el ROIC de 2035e no pase del máximo histórico (15,0 % en 2021). La v2 dejó la prueba de reinversión
// fallando (capital nuevo al 39,3 %, ROIC del 18,2 % en 2035e) y lo explicó en la síntesis; el usuario decidió que
// explicarlo no basta. El exceso venía del margen (EBIT del 11,0 % al 15,8 %), no del crecimiento: el crecimiento no se toca.
// El alcista se deja igual que en la v2 (son las ambiciones de la dirección) con un perfil por año; el bajista sigue dos
// puntos por debajo del base. Mismo precio (92,95 NOK, 8,68 EUR) y fecha de corte (8-oct-2026).
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/tomra-2026-10-08/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// 1. Margen EBITDA del caso base. 2027e recupera lo que se puede identificar (los 13 M de reestructuración de Recycling
//    de 2026 no se repiten y los 16 M de ahorros tienen efecto pleno [4]: ≈ +1,9 puntos sobre el 17,6 % de 2026e) y
//    después sube despacio hasta el 20,3 %, entre el 19,7 % de 2025 y el 22,1 % de 2021. Con eso el ROIC de 2035e
//    queda en el 15 % (máximo de la serie 2021-2025).
const margenNuevo = { '2027e': 19.5, '2028e': 19.8, '2029e': 20.0, '2030e': 20.1, '2031e': 20.15, '2032e': 20.2, '2033e': 20.25, '2034e': 20.3, '2035e': 20.3 };
const recorte = {};
for (const a of d.dcf.anios) {
  if (!(a.periodo in margenNuevo)) continue;
  if (a.fijo) throw new Error(`Año fijo ${a.periodo}`);
  recorte[a.periodo] = +(a.margen_ebitda_pct - margenNuevo[a.periodo]).toFixed(2);
  a.margen_ebitda_pct = margenNuevo[a.periodo];
}

// 2. Escenarios. Alcista: el mismo camino que en la v2 (crecimiento +1,5 puntos y margen EBITDA final del 24,5 %), con
//    un perfil por año que compensa el recorte del base. Bajista: sin cambios (desplazamiento de −2 puntos sobre el base).
const alc = d.escenarios.casos.find((c) => c.escenario === 'Alcista');
alc.perfil = Object.entries(recorte).map(([periodo, r]) => ({ periodo, crecimiento_pp: alc.ajuste_crecimiento_pp, margen_pp: +(alc.ajuste_margen_pp + r).toFixed(2) }));

// 3. Textos que cambian. Las cifras salen de calc de datos-v3.json tal cual.
const r = d.resumen;
r.recomendacion = 'Mantener';
r.conviccion = 'Baja';
r.justificacion_recomendacion = null;

// Síntesis reescrita entera: la v2 tenía 812 palabras y el límite es 650.
const sint = [
  '**La recomendación y por qué.** Mantener, con convicción baja; antes, Comprar. El valor objetivo es de 8,10 EUR (86,77 NOK) frente a un cierre de 8,68 EUR (92,95 NOK): −4,3 % de rentabilidad total con el dividendo. Cambia porque limitamos el margen del caso base al que da un ROIC del 15 % en 2035e, el máximo de 2021-2025, y no el 18,2 %. Con nuestro WACC del 8,26 % sale Mantener: el bajista (−55,1 %) pesa casi el doble que el alcista (+29,9 %). Con la prima que pide el mercado (4,20 %), también: 9,74 EUR (104,34 NOK) y un 14,6 %, a 0,4 puntos del umbral de compra. Convicción baja porque la señal depende de esas décimas y del margen; la subirían un margen bruto de Collection del 40 % en el 2S26 y objetivos de ROCE, y la bajaría un ROIC de 2026 por debajo del WACC.',
  '**El negocio.** Collection, las máquinas de devolución de envases, es el 56 % de las ventas y el grueso del beneficio: EBITA del 17,0 % en 2025 y un 61 % de ingresos de servicio, throughput y material [13]. Tiene 91.900 máquinas frente a 13.000 de Envipco, que pierde dinero [14]. Recycling y Food son cíclicos [1]. El ROIC cayó del 15,0 % en 2021 al 9,8 %, apenas por encima del WACC. ¿Sostiene la calidad el crecimiento que proyectamos? En parte, y por eso el base se queda en lo financiable: el foso asegura el volumen que traen las leyes, no un ROIC por encima del 15 %. Bajamos el margen EBITDA de 2035e del 23,0 % al 20,3 %, sin tocar el crecimiento: al ROIC del 15 %, la reinversión financia un 3,6 % anual, que con 2 puntos de precio cubre el 5,4 % de 2027e-2035e.',
  '**Sector y ciclo.** El crecimiento depende de la regulación: Polonia (2025), el Reino Unido (1-oct-2027, ~3.900 máquinas adjudicadas) y el PPWR en la UE desde 2029 [4, 11, 13]. Pero cada pico es temporal: tras el de 2024, Collection cayó un 4 % en 2025 [13].',
  '**Finanzas.** La guía de 2026 deja unos ingresos de 1.477 M (+12,1 %), en línea con el consenso, con un margen EBITDA del 17,6 % por la mezcla y 13 M de reestructuración en Recycling [4]. La deuda neta ajustada es de 680 M, 2,5 veces el EBITDA, y Scope rebajó el rating a BBB+ [4, 8].',
  '**Equipo y gobierno.** Resta. Latour (21,08 %) preside el consejo; la remuneración sacó un 36-42 % de votos en contra en tres juntas seguidas y el incentivo a largo plazo solo mide el BPA [1, 25, 26]. Los objetivos de 2030 fijados en 2024 (+15 % anual y EBITA del 18 %) están lejos [34].',
  '**Valoración.** El DCF da 6,49 EUR, los escenarios 7,04 y la suma de partes 8,86; los comparables (13,72) pesan poco. El DCF inverso dice que el precio descuenta más que nuestro caso base: un margen EBITDA del 22,9 % en vez del 20,3 %, o una rentabilidad del 7,2 %, por debajo de nuestro WACC. Nuestro EBITDA de 2027 queda un 18,3 % por debajo del consenso. Con la prima del mercado, el DCF sube a 8,78 EUR, casi el precio.',
  '**Riesgos y catalizadores.** El hueco tras el pico británico (el bajista, con una caída en 2029, vale 3,90 EUR); el margen de producto en los mercados nuevos (cada punto de margen EBITDA resta un 12,9 %), y Food, cuya vuelta al 5 % costaría hasta un 26 %. Catalizadores: resultados del 3T26 el 23-oct y Capital Markets Day el 24-nov [67].',
  '**Qué cambiaría la decisión.** Compraríamos por debajo de 7,90 EUR (84,60 NOK) y venderíamos por encima de 11,05 EUR (118,35 NOK). Volveríamos a Comprar si el Capital Markets Day fija objetivos de ROCE y el margen bruto de Collection vuelve al 40 %: probarían que el capital de 2024-2025 rinde.',
];
const viejos = r.sintesis.split('\n\n').map((x) => x.match(/^\*\*[^*]+\*\*/)?.[0]);
if (JSON.stringify(viejos) !== JSON.stringify(sint.map((x) => x.match(/^\*\*[^*]+\*\*/)[0]))) throw new Error(`Apartados distintos: ${viejos}`);
r.sintesis = sint.join('\n\n');

{
  const t = r.tesis.split('\n\n');
  if (t.length !== 3) throw new Error('Tesis con otra estructura');
  const viejo2 = 'El precio, 8,68 EUR, descuenta exactamente nuestro caso base. Según el DCF inverso, supone un crecimiento del 5,3 % anual hasta 2035 y un margen EBITDA del 22,9 %, con una rentabilidad implícita del 8,3 %, igual a nuestro WACC.';
  if (!t[1].startsWith(viejo2)) throw new Error('Tesis, párrafo 2');
  t[1] = t[1].replace(viejo2, 'El precio, 8,68 EUR, descuenta más que nuestro caso base. Según el DCF inverso, supone un margen EBITDA del 22,9 % en 2035e, frente al 20,3 % que damos, o una rentabilidad implícita del 7,2 %, por debajo de nuestro WACC del 8,26 %.');
  const viejo3 = 'La rentabilidad esperada solo supera el umbral si se acepta la prima de riesgo que hoy pide el mercado.';
  if (!t[2].endsWith(viejo3)) throw new Error('Tesis, párrafo 3');
  t[2] = t[2].replace(viejo3, 'Con el margen que ese capital ha demostrado, ni con la prima de riesgo que hoy pide el mercado se llega al umbral de compra (14,6 % frente al 15 %).');
  r.tesis = t.join('\n\n');
}

r.vision_diferencial.mercado_descuenta = 'Un margen EBITDA del 22,9 % en 2035e con nuestro crecimiento, o una rentabilidad del 7,2 %, por debajo de nuestro WACC. Ese margen llevaría el ROIC de 2035e cerca del 18 %, por encima de cualquier año desde 2021. Nuestro caso base ya queda un 18,3 % por debajo del EBITDA del consenso para 2027. Aun así, el mercado no se cree ni la ambición de 2030 de la dirección (EBITA del 18 %) ni el consenso de los seis analistas, todos con recomendación de compra y un precio objetivo medio de 11,81 EUR [49].';
r.vision_diferencial.nuestra_vision = 'Somos más escépticos que el mercado con el margen: el EBITA llega al 13,8 % en 2035e (13,2 % en 2025), no al 18 % de la dirección, porque el ROIC no ha pasado del 15,0 % de 2021 mientras el capital invertido crecía un 48 %. Pero el negocio de Collection, con un 61 % de ingresos recurrentes y siete veces la base instalada de su rival, merece una tasa más cercana a la del mercado que a la de un fabricante cíclico.';
{
  const viejo = 'Lo que no podemos defender es un valor muy por encima del precio con nuestra propia tasa: la diferencia es de rentabilidad exigida, no de beneficios.';
  if (!r.vision_diferencial.por_que.endsWith(viejo)) throw new Error('por_que');
  r.vision_diferencial.por_que = r.vision_diferencial.por_que.replace(viejo, 'Lo que no podemos defender es un valor por encima del precio: el precio ya paga una recuperación del margen que el capital de 2024-2025 aún no ha demostrado.');
}
r.cambiaria_recomendacion[0] = 'Si el precio supera 11,05 EUR (118,35 NOK), pasaríamos a Vender o reducir; por debajo de 7,90 EUR (84,60 NOK), a Comprar.';
r.cambiaria_recomendacion[1] = 'Si el margen bruto de Collection del 2S26 vuelve al 40 % o más (38,6 % en el 2T26) y el ROIC de 2026 sube, devolveríamos al caso base parte del margen recortado y podríamos volver a Comprar.';
r.cambiaria_recomendacion[2] = 'Si la deuda neta supera 2,8 veces el EBITDA o el patrimonio baja del 32 % del activo, subiríamos la prima de riesgo (cada 0,5 puntos de WACC restan un 11,6 %) y podríamos pasar a Vender.';

const j = d.dcf.justificacion;
j.margenes = 'El margen se construye por división con el EBITA, que es la cifra que publica Tomra, y después se limita con la prueba de sostenibilidad. 2026e sale de la guía: Collection en el 16,6 % (mezcla de máquinas en Polonia), Recycling en el 8,7 % (el consenso de Tomra espera 18 M) [51] y Food en el 10,5 % por la mezcla [1, 4]; margen EBITDA del 17,6 %. En 2027e sube al 19,5 %: no se repiten los 13 M de reestructuración de Recycling y los 16 M de ahorros tienen efecto pleno [4]. Después sube despacio hasta el 20,3 % en 2035e (EBITA del 13,8 % con una depreciación del 6,5 % de las ventas), entre el 19,7 % de 2025 y el 22,1 % de 2021. El reparto por división que proyectábamos antes (Collection al 19 %, Recycling al 18,5 %, Food al 14 %: EBITA del grupo del 16,5 % y EBITDA del 23,0 %) llevaba el ROIC de 2035e al 18,2 %, por encima del máximo de la serie (15,0 % en 2021), con un capital nuevo que rendiría un 39,3 % cuando el incremental de 2021-2025 fue negativo. El margen que dejamos es el que da un ROIC del 15 % en 2035e, lejos del 18 % de EBITA de 2030 que prometió el Capital Markets Day de 2024 [34]. El EBITDA queda a −3,8 %, −18,3 % y −16,3 % del consenso en 2026-2028 [49].';
for (const [k, viejo, nuevo] of [
  ['wacc', 'con la beta de 1,20 rondaría el 8,8 % y el DCF bajaría a 7,76 EUR.', 'con la beta de 1,20 rondaría el 8,8 % y el DCF bajaría a 5,74 EUR.'],
  ['terminal', 'equivale a 8,1 veces el EBITDA de 2035e', 'equivale a 7,4 veces el EBITDA de 2035e'],
]) { if (!j[k].includes(viejo)) throw new Error(`justificacion.${k}`); j[k] = j[k].replace(viejo, nuevo); }

d.dcf.lectura = 'El DCF da **6,49 EUR por acción (69,5 NOK)**, un 25,2 % por debajo del cierre de 8,68 EUR, con un valor terminal que pesa el 65 % (7,4 veces el EBITDA de 2035e). El DCF inverso es la clave: **al precio actual, el mercado descuenta un margen EBITDA del 22,9 % en 2035e** con nuestro crecimiento, frente al 20,3 % del caso base, **o una rentabilidad anual del 7,2 %**, por debajo de nuestro WACC del 8,26 %. Por crecimiento haría falta un 11,5 % anual: el precio no se explica por volumen sino por margen. Y ese margen es exigente frente a la historia: el máximo de 2021-2025 fue del 22,1 % (2021), con un capital invertido un 33 % menor, y llevaría el ROIC de 2035e cerca del 18 %, por encima de cualquier año de la serie. Nuestro caso base ya queda un 18,3 % por debajo del consenso en el EBITDA de 2027. Con la prima implícita del mercado (4,20 %) el WACC baja al 7,14 % y el DCF sube a 8,78 EUR, casi el precio. Con la beta europea (1,20), el valor caería hacia los 5,74 EUR (WACC del 8,8 %).';

d.dcf.sostenibilidad.justificacion = 'En parte, y el caso base se queda en lo financiable. Collection tiene un foso amplio (siete veces la base instalada de Envipco) [13, 14], pero los mercados nuevos se ganan en concurso con menos margen (bruto de Collection del 38,6 % en el 2T26) [1, 4]. Las ventas crecieron un 5,3 % anual en 2021-2025 con el ROIC bajando del 15,0 % al 9,8 %. El margen se limita al que da un ROIC del 15 % en 2035e, el máximo de la serie: a ese ROIC, la reinversión (24 % del NOPAT) financia un 3,6 % anual, que con 2 puntos de precio cubre el 5,4 % de 2027e-2035e. Sin cuota comparable, no hay prueba de cuota.';

const base = d.escenarios.casos.find((c) => c.escenario === 'Base');
base.narrativa = 'Se cumple la guía de 2026, el Reino Unido llega en 2027 con la cuota ya adjudicada y algo más, y Recycling recupera parte de su margen con los ahorros. El margen EBITDA sube al 20,3 % (EBITA del 13,8 %): el que da un ROIC del 15 % en 2035e, el máximo de 2021-2025.';
d.escenarios.comentario = 'El reparto no compensa con nuestro coste de capital: el alcista vale 11,27 EUR (+29,9 %) y el bajista 3,90 EUR (−55,1 %), una asimetría de 0,54 veces; el valor ponderado (25/50/25) es de 7,04 EUR. El bajista no es cosmético: suma tres cosas que Tomra ya ha vivido por separado, el hueco tras un pico de instalación (Collection −4 % en 2025), un Recycling hundido (margen del 22,7 % al 10,2 % entre 2024 y 2025) y un Food en el 5 % (2024) [1, 13]. El alcista solo exige las ambiciones que la propia dirección publica [4], y no cambia con el recorte del caso base: llega al mismo margen EBITDA del 24,5 % con un perfil por año. Con la prima que hoy pide el mercado el cuadro mejora: el bajista queda en 5,36 EUR (−38,2 %) y el alcista en 15,00 EUR (+72,9 %), una asimetría de 1,91 veces.';

{
  const v = d.valoracion;
  for (const [viejo, nuevo] of [
    ['El valor objetivo es de **9,45 EUR** (101,23 NOK; +8,9 %)', 'El valor objetivo es de **8,10 EUR** (86,77 NOK; −6,6 %)'],
    ['La suma de partes (8,86 EUR) sirve de control porque las tres divisiones tienen perfiles muy distintos.', 'La suma de partes (8,86 EUR) sirve de control porque las tres divisiones tienen perfiles muy distintos; usa el EBITA por división de 2027e anterior al recorte de margen del caso base (244 M frente a 214 M) y, con el mismo recorte, bajaría hacia 7,5 EUR.'],
    ['La dispersión es baja salvo por los comparables: DCF, escenarios y suma de partes quedan entre 8,60 y 8,86 EUR.', 'La dispersión es mayor tras el recorte del margen: el DCF da 6,49 EUR, los escenarios 7,04 y la suma de partes 8,86.'],
    ['el objetivo sube a 11,42 EUR (122,33 NOK)', 'el objetivo sube a 9,74 EUR (104,34 NOK)'],
  ]) { if (!v.comentario.includes(viejo)) throw new Error(`valoracion: ${viejo.slice(0, 40)}`); v.comentario = v.comentario.replace(viejo, nuevo); }
}

const ri = d.riesgos.items;
ri[0].efecto_valor = '−5,1 % por cada punto menos de crecimiento anual; el bajista suma una caída de un año en 2029 (−55,1 %)';
ri[1].efecto_valor = '−12,9 % por cada punto de margen EBITDA';
ri[2].efecto_valor = '≈ −26 %, como máximo, si el margen EBITA de Food vuelve al 5 % de 2024 (hasta −2 puntos del grupo)';
ri[3].efecto_valor = '≈ −17 %, como máximo, si su margen se queda en el 10 % (hasta −1,3 puntos del grupo)';
ri[4].efecto_valor = '−11,6 % por cada 0,5 puntos más de WACC';
ri[5].efecto_valor = 'Sin efecto directo en el DCF; una prima adicional de 0,5 puntos restaría un 11,6 %';

for (const [ruta, viejo, nuevo] of [
  [['preguntas', 'items', 0], 'por_que', ['(EBITDA 11,2 % menor)', '(EBITDA 18,3 % menor, también por el recorte de margen)']],
  [['comparables'], 'comentario', ['que en nuestro caso base es un 11,2 % menor', 'que en nuestro caso base es un 18,3 % menor']],
].map(([r1, k, [a, b]]) => [[...r1, k], a, b])) {
  const k = ruta.at(-1); const o = ruta.slice(0, -1).reduce((x, p) => x[p], d);
  if (!o[k].includes(viejo)) throw new Error(`${ruta.join('.')}`); o[k] = o[k].replace(viejo, nuevo);
}

const ce = d.meta.controles_explicados;
const iCap = ce.findIndex((c) => c.control === 'Rendimiento del capital nuevo de la proyección');
ce[iCap].explicacion = 'Tras el recorte de margen de la v3, el ROIC de 2035e queda en el 15,1 %, el máximo de la serie 2021-2025 (15,0 % en 2021). El 28,4 % de la prueba atribuye al capital nuevo toda la subida del NOPAT (de 110 M a 236 M), también la del capital ya invertido: si los 1.121 M de 2025 vuelven al 15 % de 2021 dan 58 M más, y los 443 M de reinversión al mismo rendimiento, unos 67 M. No es optimismo del caso base, sino la vuelta del capital de 2024-2025 (Feedstock, flota de throughput, existencias y cobros de Polonia) al rendimiento que ya tuvo [1, 4, 30]. Al ROIC del 15 %, la reinversión financia un 3,6 % anual, que con unos 2 puntos de precio cubre el 5,4 % de 2027e-2035e.';
ce.push({
  control: 'Proyección propia frente a consenso',
  explicacion: 'El EBITDA propio queda un 18,3 % por debajo del consenso en 2027e y un 16,3 % en 2028e [49]: un 6,3 % y un 5,5 % menos de ingresos (Reino Unido y Recycling más prudentes) y un margen del 19,5 % y el 19,8 % frente al 22,4 % del consenso, porque el caso base limita el margen al que da un ROIC del 15 % en 2035e (prueba de sostenibilidad). El consenso de la propia Tomra ya bajó el EBITA de 2027 un 9 % entre abril y julio [51, 52].',
});


writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v3.json escrito (recorte de margen: ${JSON.stringify(recorte)}; síntesis de ${palabras} palabras).`);
