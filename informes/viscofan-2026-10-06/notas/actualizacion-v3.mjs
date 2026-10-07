// Actualización v3 de Viscofan (7 oct 2026): regla relativa (prima implícita del mercado) y DCF en tres etapas.
// No rehace la investigación: parte de datos-v2.json, añade la referencia de mercado y etapa2, y reescribe
// los textos que citan la recomendación, el valor objetivo o los niveles. Escribe datos-v3.json.
//   node informes/viscofan-2026-10-06/notas/actualizacion-v3.mjs
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
if (idD !== 54) throw new Error(`Id esperado 54, sale ${idD}`);
d.fuentes.push({ id: idD, titulo: 'Implied Equity Risk Premiums by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' });
d.valoracion.referencia_mercado = { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: `Damodaran, prima implícita mensual, octubre de 2026 [${idD}]` };

// ── DCF en tres etapas: no procede ──
// ROIC 16,4 % frente a WACC 7,99 %: cumple la condición de rentabilidad, pero no hay recorrido demostrable más allá
// de 2032: el mercado de envolturas crece un 3,4-4 % [26][41], Viscofan ya tiene el 31 % de las celulósicas y
// la proyección explícita no da crédito a todo Beat'30 y ya converge a ese ritmo en 2032.
d.dcf.etapa2 = { usar: false, anios: 10, margen_final_pct: null, justificacion: 'No procede. El ROIC (16,4 %) supera al WACC en más de 5 puntos, pero el mercado de envolturas es maduro: crece un 3,4-4 % anual en valor y volumen [26][41] y Viscofan ya tiene el 31 % de las envolturas de celulosa, fibrosa y plástico [4]. La proyección explícita llega en 2032 a un crecimiento del 3 %, el del mercado; alargar el crecimiento supondría dar por hecho Beat\'30 entero, que no damos.' };

// ── Recomendación ──
const r = d.resumen;
r.recomendacion = 'Comprar';
r.conviccion = 'Baja';
r.justificacion_recomendacion = null;

r.sintesis = [
  `**La recomendación y por qué.** Comprar, con convicción baja y horizonte de 12 meses. Las dos reglas discrepan. Con nuestro WACC (7,99 %), el valor objetivo es de 55,98 € frente a 52,90 €; con el dividendo del 6,2 %, la rentabilidad total esperada es del 12,0 % y la asimetría de 0,94 veces: Mantener. Con la prima que hoy descuenta el mercado (4,20 %) [${idD}], el WACC baja al 7,24 %, el objetivo sube a 62,50 € y la rentabilidad total al 24,4 % (asimetría de 3,24): Comprar, y manda esta regla relativa. Es un Comprar solo relativo: gana al mercado, pero con nuestra prima histórica (5,5 %) no llega al 15 %; si el mercado entero se abarata, también caerá.`,
  `**El negocio.** Viscofan es el primer fabricante mundial de envolturas, con el 31 % de las de contacto alimentario y el 17 % de las proteicas [4]. Su ROIC del 16,4 % dobla el WACC y la mediana de los comparables (7,5 %). Su vulnerabilidad es el margen: los consumos son el 33 % de las ventas [3] y repercute pieles y gas con dos o tres trimestres de retraso. En 2022 el margen EBITDA bajó del 25,5 % al 22,2 % y tardó dos años en recuperarse [3][16].`,
  `**Finanzas.** Los ingresos crecieron un 6,5 % anual en 2020-2025, pero el EBITDA solo un 4,3 %, y el margen de los últimos 12 meses está en el 22,1 % [5]. El circulante (48,1 % de las ventas) retiene caja: solo el 65 % del beneficio llegó a flujo libre. La deuda neta ajustada es baja (328 M, 1,2 veces el EBITDA).`,
  `**Equipo y gobierno.** Restan algo. La dirección falla en margen: incumplió el EBITDA en 2023 y 2025 [16][2] y para 2026 avisa del rango bajo [5]. Fallan también el presidente y la vicepresidenta «otros externos», con 17 y 28 años en el consejo, y el 73,5 % de apoyo a las remuneraciones [19][20].`,
  `**Valoración.** El DCF (40 %) da 57,91 €; los escenarios (30 %), 55,20 €; los comparables (20 %), 50,32 €; y las transacciones (10 %), 61,90 €, un valor de control. El precio ofrece una rentabilidad implícita del 8,5 % anual, más que nuestro WACC y que el que pide el mercado; en crecimiento descuenta un 1,7 % anual, frente a nuestro 4,9 %. Nuestras cifras coinciden con el consenso (EBITDA a menos de un 1,1 %) y, con la prima del mercado, nuestro DCF (67,51 €) se acerca a su objetivo medio (69,29 €) [30]. La discrepancia es solo de tasa de descuento: por eso la convicción es baja, y los resultados de enero-septiembre prueban el margen, no cierran esa diferencia. Sin DCF en tres etapas: el mercado crece un 3,4-4 % [26][41] y la proyección ya converge a ese ritmo.`,
  `**Riesgos y catalizadores.** El mayor riesgo es no repercutir la inflación de pieles, gas y transporte: dos puntos menos de margen dejan el valor en 49,06 € (−15 %). Le siguen la competencia en precio en EE. UU. si Viskase cambia de dueño (−20 %) [22] y Danville (−5/−10 %) [45][1]. El riesgo propio del Comprar relativo es el mercado: con una prima implícita por encima del 5 %, la regla vuelve a Mantener. Catalizadores: los resultados de enero-septiembre (finales de octubre) y de 2026 (febrero de 2027), frente al rango bajo de la guía (305 M de EBITDA) [5].`,
  `**Qué cambiaría la decisión.** Con las dos reglas, por debajo de 57,16 € es Comprar y por encima de 65,83 €, Vender. Volveríamos a Mantener si el margen bruto queda por debajo del 66 % dos trimestres seguidos (66,9 % en el 2T26) [5], porque el bajista pasaría a ser el caso central. Subiríamos la convicción si el margen EBITDA trimestral vuelve al 23 % en el 4T26-1T27 y se sostiene el consenso de 328,1 M de EBITDA para 2027 [28].`,
].join('\n\n');

cambiar(r, 'tesis', `Aun así, nuestro valor objetivo es de 55,98 € (+5,8 %) y los escenarios son simétricos (+22,8 % / −24,3 %) (motor). El mercado acierta en desconfiar del margen: la dirección falló el EBITDA en 2023 y 2025 y ahora avisa del rango bajo para 2026 [5][16][2]. Para invertir hay que creer que las subidas de precio del 2S26 devuelven el margen al 23-24 % en 2027 y que Danville no deja factura. Preferimos esperar a ver el margen del 9M26 o un precio cercano a 48 €, donde el alcista dobla al bajista.`,
  `Con nuestro WACC del 7,99 %, el valor objetivo es de 55,98 € (+5,8 %) y los escenarios son simétricos (+22,8 % / −24,3 %) (motor). Con la prima de riesgo que hoy pide el mercado (4,20 %) [${idD}] es de 62,50 €, y la rentabilidad total esperada, del 24,4 %: comprar es una apuesta relativa, no absoluta. El mercado acierta en desconfiar del margen: la dirección falló el EBITDA en 2023 y 2025 y ahora avisa del rango bajo para 2026 [5][16][2]. Para invertir hay que creer que las subidas de precio del 2S26 devuelven el margen al 23-24 % en 2027, que Danville no deja factura y que el mercado no vuelve a pedir una prima de riesgo más alta.`);

r.vision_diferencial.nuestra_vision = `Coincidimos con el consenso en las cifras de 2026-2028 (nuestro EBITDA difiere menos de un 1,1 %) (motor). Discrepamos en el múltiplo: con un ROIC del 16,4 % y un competidor en retirada, Viscofan merece cotizar a 9-10x EV/EBITDA, no a 8,5x. Con el bono al 4,08 % [35] y nuestra prima del 5,5 %, el potencial no llega al 15 %; con la prima que hoy pide el mercado (4,20 %) [${idD}], sí.`;
cambiar(r.vision_diferencial, 'por_que', 'Sin una visión distinta en las cifras, nuestra recomendación es Mantener.', 'Sin una visión distinta en las cifras, el Comprar es relativo y de convicción baja: depende de que el mercado siga pidiendo la prima de hoy.');

r.cambiaria_recomendacion = [
  'Precio: con las dos reglas combinadas, por debajo de 57,16 € seguimos en Comprar; entre 57,16 € y 65,83 €, Mantener; por encima de 65,83 €, Vender (motor).',
  `Si la prima implícita del mercado sube por encima del 5 % (4,20 % en octubre de 2026) [${idD}], la regla relativa da Mantener al precio de hoy y pasaríamos a Mantener (motor).`,
  'Si el margen bruto trimestral queda por debajo del 66 % dos trimestres seguidos (66,9 % en el 2T26), el bajista pasaría a ser el caso central y pasaríamos a Mantener [5].',
  'Si Viskase se vende o se recapitaliza y cae el precio medio en Norteamérica, la competencia en precio volvería al mercado más rentable de Viscofan (−20 % en el valor) y pasaríamos a Mantener [22].',
  'Si el margen EBITDA trimestral vuelve al 23 % o más en el 4T26-1T27 y se sostiene el consenso de EBITDA de 2027 (328,1 M), subiríamos la convicción [28].',
];

d.dcf.lectura = `El DCF base da 57,91 € por acción, un 9,5 % sobre el precio, con un WACC del 7,99 % y un 73 % del valor en el valor terminal (motor). El rango con WACC y g ± 0,5 pp va de 49,46 € a 69,72 €. Con la prima implícita del mercado (4,20 %) [${idD}], el WACC baja al 7,24 % y el DCF sube a 67,51 €. Lo importante es el DCF inverso: al precio de 52,90 € el mercado descuenta un margen EBITDA terminal del 22,9 % en lugar del 24 %, o una rentabilidad exigida del 8,5 %, por encima de los dos WACC (motor). En crecimiento, equivale a un 1,7 % anual en 2026-2032 frente al 4,9 % de nuestro caso base. Es una hipótesis conservadora frente a la historia: Viscofan creció un 6,5 % anual en 2020-2025 y ningún ejercicio cerró con un margen inferior al 21,9 % (aunque el 1T26 se quedó en el 20,8 %). Nuestra proyección coincide con el consenso (EBITDA 2026-2028 entre un 0,2 % y un 1,1 % por debajo, motor): la diferencia con el precio es de tasa de descuento.`;

cambiar(d.valoracion, 'comentario', 'con un WACC del 7,0 % el DCF daría 71,44 € (motor).', `con un WACC del 7,0 % el DCF daría 71,44 € (motor). Con la prima implícita del mercado (4,20 %) [${idD}], el WACC es del 7,24 % y el valor objetivo, de 62,50 € (+18,1 %).`);

writeFileSync(new URL('datos-v3.json', dir), JSON.stringify(d, null, 2));
const palabras = r.sintesis.split(/\s+/).filter(Boolean).length;
console.log(`datos-v3.json escrito. Fuente nueva [${idD}]. Síntesis: ${palabras} palabras.`);
