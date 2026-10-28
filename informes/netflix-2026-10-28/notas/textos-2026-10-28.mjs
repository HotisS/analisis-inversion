// Pone al día los textos de juicio de textos.mjs (copiados del 21-oct) con las cifras del motor del 28-oct. Se ejecuta una vez.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const f = join(dirname(fileURLToPath(import.meta.url)), 'textos.mjs');
let t = readFileSync(f, 'utf8');
const lineas = t.split('\n');
const cambia = (prefijo, nuevo) => {
  const i = lineas.findIndex((l) => l.startsWith(prefijo));
  if (i < 0) throw new Error('No encuentro: ' + prefijo);
  lineas[i] = nuevo;
};
const reemplaza = (viejo, nuevo) => {
  const i = lineas.findIndex((l) => l.includes(viejo));
  if (i < 0) throw new Error('No encuentro: ' + viejo);
  lineas[i] = lineas[i].replace(viejo, nuevo);
};

cambia('export const limitaciones', 'export const limitaciones = `Se valora la acción ordinaria del Nasdaq (NFLX), en dólares, con el cierre del 27-oct-2026 (62,52 USD), el último a la fecha de corte (28-oct, antes de la apertura de Nueva York) [D55]. Todas las cifras por acción están ajustadas al desdoblamiento de 10 por 1 de noviembre de 2025. Acciones: 4.167 M = 4.106,3 M en circulación a 30-sep-2026 (10-Q) más 60,7 M de efecto dilutivo de opciones (media del 3T), del mismo balance que la caja del puente [D48]. Criterio del EBITDA: beneficio operativo más la depreciación de inmovilizado; la amortización de contenidos (16.422 M en 2025) es gasto, como en Disney o Warner. Por eso el «capex» del DCF suma a las compras de inmovilizado el exceso de los pagos de caja por contenidos sobre su amortización [A1]. El consenso de MarketScreener (28-oct, ya con el 3T26) excluye los pagos en acciones: el motor resta un 0,8 % de las ventas [D50]. Los comparables se llevan del cierre del 20 al del 27-oct con la variación de su precio, sin revisar sus estimaciones (Spotify publicó el 21-oct) [D55]. US GAAP: los arrendamientos operativos (2.330 M) no van a la deuda [A3]. El beneficio LTM incluye la comisión de ruptura de Warner Bros. (2.800 M antes de impuestos), que infla el PER LTM [A9].`;');

reemplaza('más de tres veces el WACC del 11,36 %', 'más de tres veces el WACC del 11,20 %');
reemplaza('El 3T26 se publica el 20-oct: la guía es +12 % y un margen del 33,2 % [A10, D2].', 'El 3T26 (20-oct) cumplió en ingresos y superó en margen, pero rebajó la publicidad de 2026 a ≈ 2.700 M y guió un 4T al +11,5 %; la dirección evitó dar una cifra de publicidad para 2027 y remitió a la guía de enero [A14, A17].');
reemplaza('19,9 veces el beneficio de los últimos 12 meses (cierre del 20-oct)', '18,1 veces el beneficio de los últimos 12 meses (cierre del 27-oct)');
reemplaza('Netflix cotiza a 18,4 veces el EBITDA', 'Netflix cotiza a 16,8 veces el EBITDA');
reemplaza('un 63 % y un 70 % por debajo de sus medias de diez años', 'un 66 % y un 73 % por debajo de sus medias de diez años');
reemplaza('y el Tesoro al 5,12 % pesa', 'y el Tesoro en torno al 5 % pesa');
reemplaza('(consenso: +11,5 % y +10,2 %, aún sin revisar del todo) [D4]', '(consenso del 28-oct, ya revisado: +10,8 % y +9,9 %) [D50]');
cambia('  wacc: `Tasa libre', '  wacc: `Tasa libre del 4,99 %, el Tesoro a 10 años del 27-oct-2026 (5,13 % el 21-oct) [D54]. Beta de 1,20, entre las betas ajustadas (semanal a 5 años 1,27, mensual a 5 años 1,40) y la semanal a 2 años (0,92): la mensual sin ajustar (1,60) recoge la caída de 2022 y la semanal a 2 años, un periodo de calma [D55]. Prima de mercado del 5,5 %, coste de la deuda del 5,25 % (bono de 2036) y un 5,5 % de deuda a mercado (deuda de 30-sep sobre la capitalización del 27-oct). Coste de los fondos propios del 11,59 % y WACC del 11,20 %; con la prima implícita del mercado (4,20 %), 9,72 % [D28].`,');
cambia('export const dcf_lectura', 'export const dcf_lectura = `El DCF da 62,65 USD por acción, un 0,2 % por encima del precio del informe, con un 37 % del valor en el terminal (58,82 USD sin la etapa de transición). **Por primera vez en este seguimiento, el precio descuenta exactamente nuestro caso base.** El DCF inverso dice que los 62,52 USD suponen un crecimiento de los ingresos del 7,9 % anual en 2027e-2033e, el mismo 7,9 % de nuestro caso base, o un margen EBITDA final del 39,4 % frente a nuestro 39,5 %. Comprar hoy rinde un 11,2 % anual si se cumple el caso base: igual que nuestro coste de capital (11,20 %) y por encima del que pide hoy el mercado (9,72 %). No es exigente frente a la historia (19,9 % anual en la década) ni frente al presente (+11,8 % en el 3T26 y +11,5 % guiado para el 4T26) [A14]: el precio supone que el crecimiento sigue bajando un punto al año. Con la prima de riesgo del mercado el DCF da 77,65 USD. El precio ha bajado un 9 % desde los resultados sin que cambien nuestras cifras; lo que separa el precio del valor ya no son las cifras sino el riesgo de que el freno sea más rápido.`;');
cambia('export const valoracion_comentario', 'export const valoracion_comentario = `Pesos: DCF 60 %, escenarios 30 %, comparables 10 %, transacciones y suma de partes 0 %. El DCF manda porque la caja de Netflix es predecible (ingresos por suscripción cobrados por adelantado y un coste de contenidos que controla la dirección) y porque tratamos los contenidos como inversión. Los escenarios pesan un 30 % porque el bajista (−40,5 %) es mayor que el alcista (+36,5 %). Los comparables pesan poco porque la muestra es frágil y el EBITDA de Netflix no se puede comparar con el de grupos que suman la amortización (54,76 USD por EV/EBITDA y 92,94 por PER). Las transacciones no aplican a una compradora. El valor objetivo es de 63,22 USD (+1,1 %); con la prima del mercado, 76,54 USD (+22,4 %).`;');
reemplaza("'Recortes de publicidad, del BPA del 4T26 y de los precios objetivo (91,39 USD de media aún sin revisar)'", "'Ya en curso: BPA de 2027e −1,1 % y objetivo medio de 91,39 a 84,76 USD; quedan los de los brokers que aún no han publicado'");
reemplaza("evento: 'Revisiones del consenso tras la guía del 3T26'", "evento: 'Final de las revisiones del consenso tras la guía del 3T26'");
reemplaza('// 21-oct: las secciones', '// 21-oct (puestas al día el 28-oct en C, D y E): las secciones');

writeFileSync(f, lineas.join('\n'));
const restos = ['68,69', '61,92', '61,23', '11,36', '5,12', '74,74', '91,39 USD de media'].filter((x) => lineas.join('\n').includes(x));
console.log('textos.mjs actualizado; cifras viejas que quedan:', restos.join(', ') || 'ninguna');
