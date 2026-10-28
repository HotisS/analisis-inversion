// Segunda pasada de textos.mjs (28-oct): escenarios, comparables, riesgos y sostenibilidad con las cifras del motor. Se ejecuta una vez.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const f = join(dirname(fileURLToPath(import.meta.url)), 'textos.mjs');
let t = readFileSync(f, 'utf8');
const r = (a, b) => { if (!t.includes(a)) throw new Error('No encuentro: ' + a.slice(0, 60)); t = t.replace(a, b); };

r('Netflix cotiza a 15,5 veces el EBITDA y 18,3 veces el beneficio de los próximos 12 meses. Frente a la mediana de la muestra (12,9 y 24,1 veces)',
  'Netflix cotiza a 14,2 veces el EBITDA y 16,7 veces el beneficio de los próximos 12 meses. Frente a la mediana de la muestra (12,5 y 24,9 veces)');
r('cotiza a un PER más bajo que Spotify (31,8 veces), Roku (44,0) o TKO (37,1)', 'cotiza a un PER más bajo que Spotify (33,6 veces), Roku (43,7) o TKO (35,6)');
r('La mediana del PER daría 90,26 USD y la del EV/EBITDA, 56,63', 'La mediana del PER daría 92,94 USD y la del EV/EBITDA, 54,76');
r(/export const escenarios_comentario = `[^`]*`;/.exec(t)[0],
  'export const escenarios_comentario = `La asimetría sigue siendo desfavorable con nuestro coste de capital, aunque menos que el 21-oct: el alcista vale 85,33 USD (+36,5 %) y el bajista 37,21 USD (−40,5 %), 0,90 veces. Con la prima del mercado mejora a 2,47 veces (106,75 frente a 44,62 USD). El bajista no es cosmético: 2022 ya mostró que con un crecimiento de un dígito y el margen a la baja la acción puede caer más de un 50 %. El 3T26 no lo acerca (las suscripciones van mejor de lo esperado), pero la publicidad, la palanca del alcista, va por detrás [A14]. El valor ponderado por probabilidad es de 60,83 USD.`;');
r("efecto_valor: 'Bajista: 36,50 USD (−40 % sobre el valor base)'", "efecto_valor: 'Bajista: 37,21 USD (−40,6 % sobre el valor base)'");
r("efecto_valor: 'Con la prima del mercado (WACC ≈ 9,9 %) el DCF sube a 75,67 USD; con WACC y crecimiento terminal 0,5 puntos peores baja a 56,03 USD'",
  "efecto_valor: 'Con la prima del mercado (WACC 9,72 %) el DCF sube a 77,65 USD; con WACC y crecimiento terminal 0,5 puntos peores baja a 57,22 USD'");
r('la reinversión neta es un 10 % del beneficio operativo después de impuestos', 'la reinversión neta es un 11 % del beneficio operativo después de impuestos');
r('la cuota implícita en 2030e cae al 17,7 % (hoy, 30,2 %)', 'la cuota implícita en 2030e cae al 17,5 % (hoy, 30,2 %)');
writeFileSync(f, t);
console.log('textos.mjs: segunda pasada aplicada');
