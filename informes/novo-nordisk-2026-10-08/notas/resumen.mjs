// Resumen ejecutivo (se escribe el último). Cifras del motor tal cual.
const sintesis = [
  '**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 315,19 DKK frente a un precio de 249,90 DKK: un 26,1 % de potencial y una rentabilidad total esperada del 30,8 % con el dividendo del 4,7 %. El alcista gana un 60,1 % y el bajista pierde un 27,4 % (asimetría de 2,19 veces). Las dos reglas dan Comprar; con la prima implícita del mercado el valor objetivo sube a 350,05 DKK. La razón: el precio descuenta que las ventas caigan cada año hasta 2035, y nuestro caso base, por debajo del consenso, solo prevé que se estabilicen.',
  '**El negocio.** Novo sigue siendo una de las farmacéuticas más rentables: margen operativo ajustado del 41 % en 2025, frente al 36 % de media de sus pares [P3], y un ROIC del 39,6 % frente a un WACC del 6,85 %. Lo que se ha roto es la posición: su cuota en valor del mercado de GLP-1 e incretinas bajó del 66,2 % en 2023 al 47,5 % en 2025 [B2, B4], y Eli Lilly se lleva unas seis de cada diez recetas de incretinas en EE. UU. [B18].',
  '**Sector y precio.** El volumen crece con fuerza, pero el precio cae: desde el 1-ene-2027 la lista de Wegovy y Ozempic baja a 675 USD al mes (−50 % y −35 %) [P6] y entra el precio negociado de Medicare (274 USD) [B19]. Fuera de EE. UU. ya hay genéricos de semaglutida en India, Canadá y Brasil [B21, B24]; en EE. UU. la patente de la molécula vence en 2032 [B3].',
  '**Finanzas.** Las ventas de 2025 fueron de 309.064 M DKK con un margen EBITDA del 49,4 %, pero el flujo libre cayó a 56.931 M porque el capex llegó al 19,6 % de las ventas. La guía de 2026 baja el capex a unos 55.000 M y prevé un flujo libre de 45.000-55.000 M [P6]. La deuda neta ajustada es de 0,8 veces el EBITDA. La reversión de 26.760 M de la provisión del 340B infla las ventas publicadas de 2026 [P6].',
  '**Equipo y gobierno.** Resta. La Novo Nordisk Foundation tiene el 77,28 % de los votos [C3], forzó en 2025 la salida del presidente y de cinco independientes y puso al suyo al frente [C4, C5]. La guía de 2025 se incumplió (beneficio operativo +6,0 % frente al +19-27 % inicial) [C2, C22]. El 27,22 % del capital libre votó contra el informe de remuneración de 2025 [C16].',
  '**Valoración.** El DCF da 309,70 DKK, los comparables 367,77 y los escenarios 289,28. Novo cotiza a 8,4 veces el EBITDA de los próximos doce meses y a 11,5 veces el beneficio, frente a medianas de 11,5 y 17,7 veces. El DCF inverso dice que el precio exige una caída de ventas del 3,1 % anual en 2027-2035 o un margen EBITDA del 36,8 %, frente al 43 % de nuestro caso base tras la pérdida de exclusividad. Nuestro EBITDA de 2027 está un 4,7 % por debajo del consenso: no somos más optimistas que los analistas.',
  '**Riesgos y catalizadores.** Un precio neto en EE. UU. peor de lo previsto (−12 % de valor con un punto menos de crecimiento y dos de margen) y más cuota para Lilly (−12 %) son los dos riesgos más probables; una pérdida de exclusividad sin relevo nos lleva al bajista (−41 % sobre el DCF). Los catalizadores: resultados del 4-nov-2026, la decisión de la FDA sobre CagriSema en el cuarto trimestre [P4] y la guía de 2027 del 3-feb-2027.',
  '**Qué cambiaría la decisión.** Compraríamos por debajo de 314,56 DKK y venderíamos por encima de 377,91. Pasaríamos a Mantener si la guía de 2027 anticipa una caída de ventas ajustadas de más del 5 % a tipo constante, si las recetas semanales de la Wegovy oral bajan de 200.000 o si la FDA rechaza CagriSema.',
].join('\n\n');

export const resumen = {
  recomendacion: 'Comprar', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis,
  tesis: [
    'Novo Nordisk es la mayor empresa de diabetes y obesidad del mundo: 309.064 M DKK de ventas en 2025, el 94 % en ese segmento, con un margen operativo ajustado del 41 % y un ROIC del 39,6 % [A1, P3]. Inventó la categoría de GLP-1 para la obesidad y tiene la escala de fabricación de péptidos más grande del sector, tras invertir 134.848 M DKK en capex en 2023-2025 [A1].',
    'El precio de 249,90 DKK descuenta un declive: a 8,4 veces el EBITDA de los próximos doce meses y 11,5 veces el beneficio, el DCF inverso exige que las ventas caigan un 3,1 % al año hasta 2035. Es lo que pasaría si Eli Lilly, que ya tiene unas seis de cada diez recetas de incretinas en EE. UU. [B18], se quedara también el mercado oral, y si la rebaja de precios de 2027 en EE. UU. [P6] no se compensara con volumen.',
    'El mercado acierta en la dirección y exagera la magnitud. La guía de 2026 se ha subido dos veces [C26, C27], la Wegovy oral supera las 265.000 recetas semanales [P6] y la cartera tiene un lanzamiento al año hasta 2030, empezando por CagriSema en 2027 [P2, P4]. Para invertir hay que creer que las ventas se estabilizan en 2027 y vuelven a crecer en torno al 4 %, algo por debajo de lo que espera el consenso, y que el margen EBITDA aguanta en el 47 % hasta la pérdida de exclusividad. No hace falta creer en la ambición del CMD de crecer como la industria [P2].',
  ].join('\n\n'),
  vision_diferencial: {
    mercado_descuenta: 'Que Novo es un negocio en declive estructural: pierde cuota frente a Lilly en inyectables y orales, el precio neto en EE. UU. se hunde con la lista a 675 USD, Medicare y los acuerdos de nación más favorecida, y la pérdida de exclusividad de 2031-2033 llega sin relevo. Por eso cotiza a 11,5 veces el beneficio, el PER de una farmacéutica sin crecimiento como Sanofi o GSK, y el DCF inverso pide una caída de ventas del 3,1 % anual.',
    nuestra_vision: 'Que las ventas tocan fondo en 2026-2027 y vuelven a crecer en torno al 4 % entre 2028 y 2030, con más volumen en Medicare, en el autopago y en Internacional, y que el margen EBITDA se mantiene cerca del 47 %. Con el capex a la baja desde el máximo de 2025, el flujo libre se recupera. Incluso con una caída del 13 % de las ventas en 2032-2033, el valor es de 309,70 DKK.',
    por_que: 'Porque el volumen ya compensa el precio: las ventas ajustadas crecieron un 7 % a tipo constante en el 2T26, con la obesidad de Internacional un 37 % más [P6], y la empresa ha subido la guía dos veces en 2026 [C26, C27]. Y porque nuestras cifras quedan por debajo del consenso: no apostamos por un giro, solo por que el declive no sea perpetuo.',
  },
  a_favor: [
    '**Barata frente a sus pares y a su historia**: 8,4 veces el EBITDA de los próximos doce meses frente a una mediana de 11,5 veces.',
    '**Rentabilidad muy alta**: ROIC del 39,6 % y margen operativo ajustado del 41 %, cinco puntos por encima de la media de sus pares [P3].',
    '**El volumen vuelve a tirar**: ventas ajustadas +7 % a tipo constante en el 2T26 y guía de 2026 subida dos veces [P6, C27].',
    '**Más caja por delante**: el capex baja desde los 60.668 M DKK de 2025 a unos 55.000 M en 2026 y sigue bajando [A1, P6].',
    '**Dividendo del 4,7 %** y balance con rating AA y Aa3 [P3].',
  ],
  en_contra: [
    '**Pierde cuota frente a Lilly**: del 66,2 % del valor del mercado de GLP-1 e incretinas en 2023 al 47,5 % en 2025 [B2, B4].',
    '**Precio a la baja en EE. UU.**: lista a 675 USD desde 2027 (−50 % en Wegovy) y precio de Medicare de 274 USD [P6, B19].',
    '**Precipicio de patentes**: la semaglutida pierde la exclusividad en EE. UU. en 2032 y ya tiene genéricos en India, Canadá y Brasil [B3, B21, B24].',
    '**Gobierno controlado**: la Fundación tiene el 77,28 % de los votos y cambió presidente, consejo y consejero delegado en 2025 [C3, C4].',
    '**Capital invertido triplicado**: el ROIC cayó del 86,8 % en 2023 al 39,6 % en 2025.',
  ],
  que_vigilar: 'La tesis depende de que el volumen compense la rebaja de precios de 2027 en EE. UU. La señal está en la guía del 3-feb-2027: si anticipa otra caída de ventas ajustadas de más del 5 % a tipo constante, el declive no toca fondo y el precio actual sería justo. La segunda señal es la cuota de nuevos pacientes de la Wegovy oral frente a la orforglipron de Lilly en las recetas semanales de IQVIA.',
  cambiaria_recomendacion: [
    'Si la guía de 2027 (3-feb-2027) prevé una caída de ventas ajustadas de más del 5 % a tipo constante, pasaríamos a Mantener.',
    'Si las recetas semanales de la Wegovy oral en EE. UU. bajan de 200.000 (hoy, más de 265.000), pasaríamos a Mantener.',
    'Si la FDA no aprueba CagriSema en el cuarto trimestre de 2026, revisaríamos el caso base a la baja.',
    'Si la acción supera los 377,91 DKK sin cambios en las cifras, pasaríamos a Vender.',
  ],
  kpis_seguimiento: [
    { kpi: 'Ventas ajustadas a tipo constante', nivel_actual: '+2 % en el 1S26 y guía de 0 % a −6 % para 2026', umbral_alerta: 'Guía de 2027 por debajo de −5 %', por_que: 'Mide si el volumen compensa el precio' },
    { kpi: 'Recetas semanales de la Wegovy oral en EE. UU.', nivel_actual: '>265.000 (17-jul-2026)', umbral_alerta: '<200.000', por_que: 'Es la defensa frente a la orforglipron de Lilly' },
    { kpi: 'Margen operativo ajustado', nivel_actual: '44,6 % en el 1S26', umbral_alerta: '<38 %', por_que: 'La empresa quiere mantenerlo estable hasta 2030' },
    { kpi: 'Capex anual', nivel_actual: 'Guía de unos 55.000 M DKK en 2026', umbral_alerta: '>55.000 M DKK en 2027', por_que: 'La recuperación del flujo libre depende de que baje' },
    { kpi: 'Cuota de Lilly en recetas de incretinas en EE. UU.', nivel_actual: '~60 % (2T26)', umbral_alerta: '>70 %', por_que: 'Señal de pérdida de foso' },
  ],
  confianza: 'Media',
};
