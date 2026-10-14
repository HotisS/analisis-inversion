// actualizacion-v4.mjs — LVMH v4 (14-oct-2026): ventas del 3T26 (publicadas el 12-oct, después del corte del informe).
// Parte de datos-v3.json y solo toca el objetivo a 12 meses y los textos de vigilancia; el DCF no cambia porque 2026e
// cuadra con lo publicado (ver abajo). Escribe datos-v4.json; después: node herramientas/apuntar-12m.mjs lvmh-2026-10-08
//
// Lo publicado [LVMH, «Continued growth in the third quarter of 2026», 12-oct-2026], 9M26 publicado / orgánico / 3T orgánico:
//   Grupo −2 % / +2 % / +1 %; Moda y Marroquinería −4 % / −2 % / −5 %; Vinos +3 / +5 / +6; Perfumes −2 / 0 / +1;
//   Relojería y Joyería +4 / +8 / +6; Distribución Selectiva −1 / +6 / +8. Divisa −3 (9M), perímetro −1 (9M), −2 (3T).
// Frente a 2026e del informe (supuestos.mjs: grupo −2,9 %, Moda −4, Vinos −2, Perfumes −3, Relojería +2, Distribución −4),
// los nueve meses van en línea o mejor en todos los grupos: 2026e no se toca.
// Lo que sí cambia es la tendencia de Moda: −5 % orgánico en el 3T, la mitad de la señal de alarma del informe
// («orgánico de Moda negativo en el 3T26 y el 4T26»). El informe espera que Moda vuelva a +4,5 % en 2027e con margen
// 34,6 %. Prueba de estrés: la vuelta de Moda se retrasa un año (2027e plano con margen 34,0 %; 2028e +4,5 % y 34,6 %).
// Resultado operativo de 2028e −1.028 M (notas/supuestos.mjs, construir), BPA −1,49 EUR (impuestos 26 %, minoritarios
// 3,1 %, 493,5 M de acciones) = −5,6 %. Se aplica a los tres escenarios (también al bajista, que ya castiga 2027e:
// es la opción prudente).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v3.json'), 'utf8'));
const f = 1 - 1.49 / 26.66;
const nota = 'Estrés del 3T26 (14-oct): BPA de la revisión del 13-oct × 0,944, por retrasar un año la vuelta de Moda y Marroquinería (−5 % orgánico en el 3T26). Detalle en notas/actualizacion-v4.mjs.';
for (const c of d.valoracion.objetivo_12m.casos) {
  c.beneficio_por_accion = Math.round(c.beneficio_por_accion * f * 100) / 100;
  c.justificacion = nota;
}
const r = d.resumen;
r.que_vigilar = 'El 3T26 (12-oct) cumplió la mitad de la señal de alarma: Moda y Marroquinería −5 % orgánico, con China floja; el grupo +1 % y los nueve meses en línea con 2026e. El objetivo a 12 meses ya descuenta un año de retraso en la vuelta de Moda. Si el 4T26 (finales de enero) vuelve a dar Moda negativa, la señal se cumple entera: Mantener y no se compra. También el margen operativo recurrente semestral por debajo del 21 % y el euro por encima de 1,25 dólares.';
writeFileSync(join(dir, 'datos-v4.json'), JSON.stringify(d, null, 2) + '\n');
console.log('BPA', d.valoracion.objetivo_12m.casos.map((c) => c.beneficio_por_accion).join(' / '));
