// actualizacion-v2.mjs — Zoetis v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya
// estaba en el informe (guía de 2026, consenso, KPIs de franquicias, tamaño del mercado de IMARC y la cuota
// del 23,6 % calculada sobre ese mismo perímetro). Mismo precio (71,33 USD, cierre del 6-oct) y misma fecha
// de corte (7-oct). Solo se reescribe la frase del veredicto en «El negocio» de la síntesis.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/zoetis-2026-10-07/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Mercado final en 2035e, mismo perímetro que la cuota (23,6 % = 9.467 M sobre los 40.100 M de IMARC
//    en 2025 [1, 35]). La serie del sector llega a 2030e (45.881 M) con el +2,7 % de IMARC; se prolonga
//    cinco años más al mismo ritmo. IMARC probablemente infravalora las mascotas, así que la cuota implícita
//    final es un techo, no un punto medio.
const s2030 = d.sector.serie.find((x) => x.anio === '2030e');
if (!s2030) throw new Error('Falta 2030e en sector.serie');
const tamano2035 = Math.round(s2030.tamano * (1 + d.sector.tcac_previsto_pct / 100) ** 5);

// 2. dcf.sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.5, precio_pct: -0.5, otros_pct: -0.6,
      comentario: 'Guía de agosto: orgánico de −3 % a −1 % (punto medio −2 %) y 9.221 M en el punto medio [9]. Zoetis no baja el precio de lista pero amplía los descuentos «del bruto al neto» para defender cuota [19]; el volumen cae en mascotas de EE. UU. (−11 % en el 1S26) y sube en ganadería (+14 %) [9]. Otros: divisa y cambio de cierre de las filiales. Reparto entre volumen y precio, estimación propia.' },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0.5,
      comentario: 'En línea con el consenso (9.477 M) [58]. Volumen casi plano: la pérdida de cuota en dermatología, Simparica y anticuerpos de EE. UU. [19, 23] la compensan internacional y ganadería (+6-11 % orgánico en 2026) [9]. Precio por debajo de la historia, por la competencia. Mezcla: diagnóstico (+12 % en el 2T26) y Lenivia y Portela [9].' },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2, otros_pct: 0.5,
      comentario: 'Consenso de 9.877 M (+4,2 %) [58]. Precio: Zoetis subió por encima de la inflación hasta 2025 [1]; suponemos la mitad de esa capacidad mientras dura la competencia en dermatología y antiparasitarios.' },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2, otros_pct: 0.5,
      comentario: 'Mercado al +2,7 % (IMARC) [35] y mascotas de Elanco y Merck al +8 % en 2026 [23, 26]: volumen al ritmo del mercado, sin recuperar cuota.' },
    { periodo: '2030e', volumen_pct: 2, precio_pct: 1, otros_pct: 0.5,
      comentario: 'Vence la patente principal de Apoquel en EE. UU. (abril de 2030) [36]: el precio aporta menos; tras Draxxin, la caída fue del 66 % en EE. UU. [1], aunque Apoquel ya tiene rivales de marca.' },
  ],
  mercado_final: { periodo: '2035e', tamano: tamano2035 },
  veredicto: 'Sí',
  justificacion: 'Sí, porque la proyección pide poco: un 2,8 % anual de media en 2026e-2035e, menos de la mitad del 7,6 % de 2016-2025 y cerca del mercado (2,7 % según IMARC, que infravalora las mascotas) [35]. Apenas exige reinversión neta (el 4 % del NOPAT, con un ROIC del 29 %), y la cuota implícita pasa del 23,6 % al 23,7 %: no hay que ganar a nadie. El foso es estrecho y se estrecha [1]: el poder de precios demostrado hasta 2025 se agrieta en 2026, con descuentos para defender cuota [19], y por eso el precio aporta solo un 1-2 % anual. Volver al 7-8 % no lo sostiene la calidad actual: queda para el alcista.',
};

// 3. Textos que cambian.
// La síntesis estaba en 644 palabras: para no pasar de 650 con la frase del veredicto se acortan detalles
// que ya están en el cuerpo del informe (nombres de los rivales, fecha del cierre).
const cambiosSintesis = [
  ['Es cuota, no ciclo: el foso es estrecho y se estrecha [1].',
    'Es cuota, no ciclo, y el foso se estrecha [1]; aun así, la calidad sostiene el crecimiento proyectado (sostenibilidad: Sí) porque es modesto: 2,8 % anual, cuota plana y 1-2 % de precio.'],
  [' frente a un precio de 71,33 (cierre del 6-oct-2026):', ' frente a un precio de 71,33:'],
  ['(−18 % en EE. UU. en el 2T26 frente a Zenrelia, Befrena y Numelvi)', '(−18 % en EE. UU. en el 2T26)'],
  ['(Simparica −6 % frente a Credelio Quattro)', '(Simparica −6 %)'],
  ['tras la carta de seguridad de la FDA sobre Librela', 'tras la alerta de la FDA sobre Librela'],
  // El motor del 10-oct recalcula el nivel de compra con la regla combinada: 90,12 → 89,38 (calc tal cual).
  ['Compraríamos por debajo de 90,12 USD', 'Compraríamos por debajo de 89,38 USD'],
];
let sintesis = d.resumen.sintesis;
for (const [de, a] of cambiosSintesis) {
  if (!sintesis.includes(de)) throw new Error(`No se encontró en la síntesis: ${de}`);
  sintesis = sintesis.replace(de, a);
}
const T = { 'resumen.sintesis': sintesis };
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (mercado 2035e: ${tamano2035} M USD, ${Object.keys(T).length} textos).`);
