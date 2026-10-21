// Resumen ejecutivo (Moncler, corte 2026-10-21, tras las ventas de los nueve meses). Se escribe el último; cifras del motor tal cual.
export default {
  recomendacion: 'Comprar', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Comprar, con convicción baja y a la espera del cierre del 22-oct. A 12 meses, con nuestra regla de múltiplos, el objetivo es de 51,63 EUR: +23,5 % ponderado y +21,6 % en el caso base, con dividendo, sobre el cierre de 42,94 EUR del 21-oct. El valor intrínseco (síntesis del DCF, los escenarios y los comparables) es de 45,66 EUR, un 6,3 % por encima: se cumplen las dos condiciones. La convicción es baja porque la compra es frágil: con el PER al cierre la rentabilidad baja al 14,7 % y con el BPA un 10 % más bajo al 11,5 %; el DCF solo (40,30 EUR) queda por debajo del precio.

**Qué ha cambiado con el 3T26 (21-oct, tras el cierre).** Trimestre flojo: ventas de 605,5 M, planas a tipos constantes y −1,6 % a tipos corrientes; la marca Moncler cae un 1 % (venta directa −2 %, EMEA −8 % por segundo trimestre, Asia frena al +5 %) y Stone Island sube un 5 % [A22]. En nueve meses, 1.895,4 M (+6 % a tipos constantes). No da márgenes ni previsión. Bajamos 2026e al +1,5 % y dejamos nuestro BPA un 6-7 % por debajo del consenso, que aún no lo recoge [D7]. Este análisis se rehace entero con fuentes primarias (el del 14-oct salió de extractos de búsqueda).

**El negocio.** Moncler vende abrigos de plumón de lujo: la marca Moncler es el 87 % de las ventas y Stone Island el resto, el 83 % en tiendas propias, con un margen bruto del 78 % y un margen EBIT del 29 % [A24, B1]. ROIC del 19,3 % frente a un WACC del 9,14 %; la calidad sostiene el crecimiento proyectado (veredicto: Sí).

**Finanzas.** Caja neta de 1.112,4 M a jun-26 sin arrendamientos; con ellos, deuda neta de 86 M [A23]. Altman Z de 5,35 y Piotroski de 7.

**Valoración.** Cotiza a 17,9 veces nuestro BPA de 2027e, frente a una mediana adelantada de 23,6 veces desde 2021 y a 24,9 de los comparables: el PER más bajo desde 2020. El DCF inverso pide un crecimiento del 5,4 % anual frente al 4,4 % de nuestro base; con la prima de riesgo del mercado el DCF sube a 50,93 EUR.

**Riesgos y catalizadores.** El primero, que el frenazo de la marca se alargue (bajista a 12 meses: 33,65 EUR, −18,4 %); el segundo, una sola categoría y una estación; el tercero, los cortos (3,65 % del capital) [D14]. Catalizadores: el cierre del 22-oct, el invierno y el plan de la nueva dirección el 18-feb-2027.

**Qué cambiaría la decisión.** Compraríamos por debajo de 45,66 EUR (robusta por debajo de 41,65) y venderíamos por encima de 58,92 EUR. La convicción subiría si la venta directa de Moncler vuelve a crecer en el 4T.`,
  tesis: 'Moncler es la marca de abrigo de plumón de lujo, con un margen EBIT del 29 %, un ROIC del 19 % y caja neta [A24, A23].\n\nEl 3T26 enseña el frenazo: la marca cae un 1 % y Europa un 8 %. El precio (42,94 EUR, en mínimos de 52 semanas) ya descuenta un PER de 17,9 veces, el más bajo desde 2020.\n\nPara invertir hay que creer que el frenazo es de ciclo (turismo y China) y no de marca. A 12 meses la regla da +23,5 %, pero la compra es frágil y espera a la reacción del 22-oct.',
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento del 5,4 % anual con nuestro coste de capital y un PER que no vuelve a su media; los analistas, más optimistas, apuntan a 58,74 EUR [D8].',
    nuestra_vision: 'Más prudentes que el consenso en el beneficio (BPA de 2028e un 7 % más bajo) pero con un PER que recupera solo un 10 %: aun así la rentabilidad supera el 15 %.',
    por_que: 'El precio ha caído un 22 % en seis meses y el múltiplo está en mínimos; basta con que el beneficio no baje [D6].',
  },
  a_favor: [
    '**PER en mínimos**: 17,9 veces frente a una mediana adelantada de 23,6 desde 2021.',
    '**Caja neta** de 1.112 M y sin deuda financiera [A23].',
    '**Margen bruto del 78 %** y EBIT del 29 % estable en el frenazo [A24].',
    '**Rentabilidad a 12 meses del 23,5 %** con la regla común.',
  ],
  en_contra: [
    '**3T26 flojo**: marca Moncler −1 %, EMEA −8 % [A22].',
    '**Compra frágil**: 14,7 % con el PER al cierre y 11,5 % con el BPA −10 %.',
    '**Cortos del 3,65 %** del capital [D14].',
    '**Existencias +14,6 %** en 2025 con ventas planas [A24].',
  ],
  que_vigilar: 'La tesis depende de que la marca Moncler vuelva a crecer en 2027 sin rebajas. La señal de que no se cumple: venta directa de Moncler negativa en el 4T26 o existencias por encima del 18 % de las ventas.',
  cambiaria_recomendacion: [
    'Cierre del 22-oct por encima de 45,66 EUR: Mantener.',
    'Precio por encima de 58,92 EUR: Vender o reducir.',
    'Venta directa de Moncler negativa en el 4T26: revisaríamos a la baja.',
    'Recompra con la caja neta: revisaríamos al alza.',
  ],
  kpis_seguimiento: [
    { kpi: 'Venta directa de la marca Moncler', nivel_actual: '−2 % (3T26)', umbral_alerta: '< −3 %', por_que: 'Mide la demanda de la marca.' },
    { kpi: 'Ventas de EMEA (marca Moncler)', nivel_actual: '−8 % (3T26)', umbral_alerta: '< −10 %', por_que: 'Turismo y Europa.' },
    { kpi: 'Existencias sobre ventas', nivel_actual: '17 % (2025)', umbral_alerta: '> 18 %', por_que: 'Primera señal de rebajas.' },
  ],
  confianza: 'Media',
};
