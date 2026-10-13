// actualizacion-v2.mjs — Novo Nordisk v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad`. No cambia ningún
// supuesto del DCF: la actualización es de método, no de opinión.
//
// Puente volumen/precio (estimación propia: la empresa no cuantifica el reparto [4, 5]). En GLP-1 el precio baja:
// 2T26 con volumen al alza y precio realizado a la baja; Wegovy inyectable en EE. UU. −22 % en el 2T26 por precio [4];
// lista a 675 USD desde ene-2027 (−50 % y −35 %) [4] y precio de Medicare de 274 USD [26]; genéricos de semaglutida
// en India, Canadá, Brasil y Sudáfrica [28, 31]. El volumen del mercado crece con fuerza (obesidad de marca +81 % en
// el MAT a mayo-2026 [4, 12]) y la Wegovy oral suma ~265.000 recetas semanales [4, 5].
//
// mercado_final = null: la cuota de `competencia.cuota_pct` (47,5 %) es solo de GLP-1 e incretinas (Novo + Lilly),
// mientras que el motor divide las ventas totales de Novo (con insulinas y enfermedades raras, ≈ una cuarta parte)
// entre el mercado; tampoco hay tamaño de mercado para 2035e (J.P. Morgan llega a 2030e: 200.000 M USD ≈ 1.271.300 M
// DKK [23]). Prueba a mano: en 2030e todas las ventas de Novo (333.749 M DKK) serían el 26 % de ese mercado; las de
// GLP-1, ≈ 20 %, frente al 47,5 % de 2025. La proyección supone perder más de la mitad de la cuota: no pide cuota.
//
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/novo-nordisk-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8, precio_pct: -11, otros_pct: -1,
      comentario: 'Guía de ventas ajustadas entre 0 % y −6 % a tipo constante (tomamos −3 %) y un punto menos por divisa [4]. El 2T26 creció por volumen de GLP-1 con precio realizado a la baja; Wegovy inyectable en EE. UU. cayó un 22 % por precio [4, 5]. Reparto entre volumen y precio: estimación propia.' },
    { periodo: '2027e', volumen_pct: 10, precio_pct: -10, otros_pct: 0,
      comentario: 'Lista de Wegovy y Ozempic a 675 USD desde el 1-ene-2027 (−50 % y −35 %) [4] y precio negociado de Medicare de 274 USD [26], más genéricos fuera de EE. UU. [28, 31]; frente a más volumen por Medicare Bridge, la Wegovy oral y CagriSema [4, 19].' },
    { periodo: '2028e', volumen_pct: 9, precio_pct: -5, otros_pct: 0,
      comentario: 'El volumen crece menos que el mercado (obesidad de marca +81 % en el MAT a mayo-2026 [12]): Novo sigue perdiendo cuota frente a Lilly [25]. La caída de precio se modera tras el escalón de 2027. El consenso da +5,9 % [66].' },
    { periodo: '2029e', volumen_pct: 8, precio_pct: -4, otros_pct: 0,
      comentario: 'Formas orales, CagriSema y autopago con más pacientes y menos precio por paciente [4, 19]; algo menos que la ambición del CMD de crecer como sus pares [18].' },
    { periodo: '2030e', volumen_pct: 7, precio_pct: -3, otros_pct: 0,
      comentario: 'Último año antes de la pérdida de exclusividad de la semaglutida en EE. UU. y Europa (2031-2033) [6]; los genéricos de China, desde abr-2027, ya pesan en el precio internacional [29].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. La calidad sostiene el volumen, no el precio. El foso es estrecho y se estrecha: el poder de precios se ha invertido (Wegovy inyectable −22 % en EE. UU. en el 2T26 por precio [4]) y la cuota en valor cayó del 66,2 % al 47,5 % en dos años [12, 15]. Lo que aguanta es la escala: primer fabricante en volumen (54,6 %) [12] y la Wegovy oral [4, 5]. Por eso el caso base no pide ni precio ni cuota: supone que el precio cae entre un 3 % y un 11 % al año y que la cuota en 2030e baja a menos de la mitad (≈ 20 % de un mercado de 200.000 M USD [23]), con una reinversión que la empresa ya financia. El crecimiento medio proyectado es del −0,3 % anual en 2026e-2035e.',
};

// 2. Textos: solo la frase obligatoria del veredicto en «El negocio» (y un recorte para seguir en 500-650 palabras).
const T = {};
const parrafos = d.resumen.sintesis.split('\n\n');
const iNeg = parrafos.findIndex((p) => p.startsWith('**El negocio.**'));
if (iNeg < 0) throw new Error('Falta el párrafo «El negocio»');
parrafos[iNeg] = '**El negocio.** Novo sigue siendo muy rentable: margen operativo ajustado del 41 % en 2025, frente al 36 % de sus pares [14], y un ROIC del 39,6 % frente a un WACC del 6,85 %. Lo roto es la posición: su cuota en valor bajó del 66,2 % en 2023 al 47,5 % en 2025 [12, 15]. La calidad sostiene nuestra proyección solo en parte (la escala sostiene el volumen, no el precio), y basta: el caso base supone que el precio cae un 3-11 % al año y que la cuota de 2030e queda en menos de la mitad.';
// Frase obligatoria sobre la convicción (control nuevo del motor) y nivel de compra recalculado por el motor.
const quitar = (i, a, b = '') => { if (!parrafos[i].includes(a)) throw new Error(`No encuentro: ${a}`); parrafos[i] = parrafos[i].replace(a, b); };
const iRec = parrafos.findIndex((p) => p.startsWith('**La recomendación y por qué.**'));
quitar(iRec, ' Las dos reglas dan Comprar; con la prima implícita del mercado el valor objetivo sube a 350,05 DKK.', ' Las dos reglas dan Comprar (350,05 DKK con la prima implícita del mercado). La convicción es media, no alta, porque el bajista pierde más del 25 %; la subiría una guía de 2027 (3-feb-2027) con ventas estables a tipo constante, y la bajaría que la Wegovy oral bajara de 200.000 recetas semanales.');
const iFin = parrafos.findIndex((p) => p.startsWith('**Finanzas.**'));
quitar(iFin, ' La reversión de 26.760 M de la provisión del 340B infla las ventas publicadas de 2026 [4].');
const iVal = parrafos.findIndex((p) => p.startsWith('**Valoración.**'));
quitar(iVal, ' Nuestro EBITDA de 2027 está un 4,7 % por debajo del consenso: no somos más optimistas que los analistas.');
const iEq = parrafos.findIndex((p) => p.startsWith('**Equipo y gobierno.**'));
quitar(iEq, ' y puso al suyo al frente');
const iQue = parrafos.findIndex((p) => p.startsWith('**Qué cambiaría la decisión.**'));
quitar(iQue, 'Compraríamos por debajo de 314,56 DKK', 'Compraríamos por debajo de 311,09 DKK');
T['resumen.sintesis'] = parrafos.join('\n\n');

for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  o[partes.at(-1)] = valor;
}

const palabras = d.resumen.sintesis.split(/\s+/).length;
writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos; síntesis de ${palabras} palabras).`);
