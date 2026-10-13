// Actualización v3 de CAF (13 oct 2026): sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct).
// Sin investigación nueva: parte de datos-v2.json, borra calc y añade el puente de ingresos (apoyado en la cartera de
// pedidos), el mercado final y el veredicto. No cambia supuestos del DCF, precio ni fecha de corte. Escribe datos-v3.json.
//   node informes/caf-2026-10-06/notas/actualizacion-v3.mjs
//   node motor/calcular-empresa.mjs --datos informes/caf-2026-10-06/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v2.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};

// ── Sostenibilidad del crecimiento ──
// Reparto volumen/precio/otros: estimación propia. Volumen = ejecución de la cartera (CAF prevé ejecutar el 26 % de
// los 17.743 M de jun-26 en 2026 y el 29 % en 2027 [8]); precio = indexación de los contratos firmados desde 2022 [15];
// otros = mezcla (autobuses de cero emisiones, más caros, y servicios).
// mercado_final: null. competencia.cuota_pct (1,5 %) es solo Ferroviario (3.305 M / 220.600 M del WRMS [24]) y la
// proyección es del grupo (Autobuses, 26 % de las ventas, no tiene un mercado en EUR: solo unidades [28]). La prueba
// de cuota se hace a mano en la justificación.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.5, precio_pct: 1.5, otros_pct: 2, comentario: 'Cartera: CAF prevé ejecutar en 2026 el 26 % de los 17.743 M de jun-26 (≈ 4.600 M de los 4.935 M previstos) [8]. Autobuses entregó un 41 % más de unidades en el 1S26 y Ferroviario creció un 3 % [8]; el precio medio sube por la mezcla de cero emisiones (90 % de las entregas) y la indexación (reparto, estimación propia) [8, 15].' },
    { periodo: '2027e', volumen_pct: 5.5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'El 29 % de la cartera de jun-26 se ejecuta en 2027 (≈ 5.150 M de los 5.305 M previstos) [8]; precio por las cláusulas de indexación de los contratos firmados desde 2022 [15]; otros, más servicios (4.615 M de cartera) [8].' },
    { periodo: '2028e', volumen_pct: 5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Book-to-bill de 1,3x en 2025 y 1,6x en el 1S26, con más de 10.000 M en opciones de clientes [1, 8]; el consenso da +7,5 % [47].' },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Vuelta hacia el mercado ferroviario mundial (+3,2 % anual previsto por UNIFE) [24] y menos empuje de Solaris, con el 60 % del autobús urbano de la UE ya de cero emisiones [26].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: 'En parte. El volumen, sí: los 17.743 M de cartera de jun-26 (3,7 años de ventas) cubren el 93-97 % de las ventas previstas para 2026-2027, y la reinversión (30 % del NOPAT, con el circulante subiendo del 9 % al 12 % de las ventas) financia un 4,1 % anual al ROIC del 13,6 %, cerca del 4,4 % de 2027-2035 [1, 8]. El margen no está demostrado: foso estrecho, concursos a precio cerrado y una inflación que en 2022 restó ≈ 1,5 puntos [15]; el capital nuevo rendiría un 18,1 % por la subida del EBITDA al 8,6 % (12,8 % sin ella). Cuota, a mano (la publicada es solo ferroviaria): del 1,5 % a ≈ 1,7 % de un mercado de ≈ 312.000 M en 2035 [24].',
};

// ── Control del motor: rendimiento del capital nuevo (18,1 % frente a un ROIC del 13,6 %) ──
// ΔNOPAT 2025-2035 = 325 − 173 M sobre 842 M de reinversión. A margen NOPAT de 2025 (3,86 %), el NOPAT de 2035 sería
// 281 M y el rendimiento, (281 − 173) / 842 = 12,8 %: el exceso es la subida del margen, no el crecimiento.
d.meta.controles_explicados.push({ control: 'Rendimiento del capital nuevo de la proyección', explicacion: 'El 18,1 % sale de la subida del margen EBITDA del 7,8 % de 2025 al 8,6 %, no de crecer: a margen de 2025, el capital nuevo rendiría un 12,8 %, por debajo del ROIC del 13,6 % [1]. Es el supuesto más agresivo del DCF; por eso el veredicto de sostenibilidad es «En parte», y la síntesis dice por qué no bajamos el base (8,6 %, por debajo del 8,9 % del consenso para 2028 [47]; ≈ 21 EUR por acción por punto de margen).' });

// ── Textos ──
// El veredicto en «El negocio» y los niveles de la decisión: el motor del 10-oct exige que un Comprar solo relativo
// tenga al menos un 5 % de rentabilidad total con nuestro WACC, y el nivel de compra pasa de 86,50 a 81,45 EUR
// (mismos datos; recalculado con datos-v2.json da lo mismo).
const r = d.resumen;
const S = r.sintesis.split('\n\n');
const iN = S.findIndex((t) => t.startsWith('**El negocio.**'));
const iQ = S.findIndex((t) => t.startsWith('**Qué cambiaría la decisión.**'));
if (iN < 0 || iQ < 0) throw new Error('Párrafos de la síntesis no encontrados');
S[iN] += ' ¿Sostiene su calidad el crecimiento que proyectamos? En parte: las ventas (+5,0 % anual; 4,4 % sin el 2026 ya casi cerrado) salen de ejecutar la cartera, que cubre el 93-97 % de 2026-2027, y la reinversión prevista las financia (4,1 % al ROIC actual) [8]; el margen no, porque la proyección supone que el capital nuevo rinde un 18,1 % (12,8 % sin subir el margen) con un poder de precios limitado. No bajamos el base: el 8,6 % de EBITDA ya queda por debajo del consenso (8,9 % en 2028) [47], y ese es el riesgo que dejamos medido, ≈ 21 EUR por acción por punto de margen.';
S[iQ] = S[iQ].replace('por debajo de 86,50 EUR es Comprar', 'por debajo de 81,45 EUR es Comprar (con nuestro WACC, la rentabilidad total tiene que llegar al 5 %)');
if (!S[iQ].includes('81,45')) throw new Error('No encuentro 86,50 en «Qué cambiaría la decisión»');
r.sintesis = S.join('\n\n');
r.cambiaria_recomendacion[0] = 'Precio: con las dos reglas combinadas, por debajo de 81,45 EUR seguimos en Comprar; entre 81,45 y 110,62 EUR, Mantener; por encima de 110,62 EUR, Vender (motor).';

writeFileSync(new URL('datos-v3.json', dir), JSON.stringify(d, null, 2));
console.log('datos-v3.json escrito.');
