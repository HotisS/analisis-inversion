// Resumen ejecutivo (Netflix, corte 2026-10-28, una semana después del 3T26). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. Al cierre del 27-oct (62,52 USD) el precio ya está por debajo del valor real (63,22 USD, síntesis del DCF, los escenarios y los comparables), aunque solo un 1,1 %, y el objetivo a 12 meses con nuestra regla de múltiplos es de 81,72 USD: +30,7 % ponderado y +27,6 % el base, por debajo del objetivo medio de los analistas (84,76). Netflix no paga dividendo. La razón principal: cotiza a 16,9 veces nuestro BPA de 2027e, el PER más bajo de su historia, cuando el precio solo descuenta nuestro caso base. La asimetría es de 0,90 veces con nuestro coste de capital y de 2,47 con la prima del mercado. La convicción es baja porque las dos reglas del valor intrínseco discrepan (absoluta Mantener, relativa Comprar: con la prima del mercado vale 76,54 USD) y el margen sobre el valor real es mínimo; la subiría una guía de 2027 de +11 % o más en enero y la bajaría una por debajo del +10 %.

**Qué ha cambiado desde el 21-oct.** Nuestras cifras, nada: el BPA base de 2028e sigue en 4,29 USD. Ha cambiado el precio, un 9,0 % más bajo que el 20-oct (68,69) tras caer un 5,3 % el día de los resultados y seguir bajando sin noticia propia [D53, D55]. El Tesoro baja del 5,13 % al 4,99 % y el WACC del 11,36 % al 11,20 %, y el 10-Q confirma 4.106,3 M de acciones a 30-sep [D48, D54]. Por eso el valor real pasa de 61,92 a 63,22 USD y la señal de Mantener a Comprar. El consenso ya recoge la guía: BPA de 2027e −1,1 % y objetivo medio de 91,39 a 84,76 USD, sin rebajas de recomendación [D49, D52].

**El negocio.** Netflix es el único streaming mundial que gana dinero de verdad: margen operativo del 29,5 % y ROIC del 38,0 % frente a un WACC del 11,20 %, cuando Disney DTC gana un 5,4 % [A1, B9]. Su foso es la escala (más de 325 M de suscripciones) y su calidad sostiene el crecimiento que proyectamos (veredicto «Sí»): es la mitad del histórico y apenas pide capital. El riesgo es de techo: el visionado crece un 2 % y la publicidad va por detrás [A10, A14].

**Valoración.** El DCF da 62,65 USD (+0,2 %). El DCF inverso dice que el precio supone un crecimiento del 7,9 % anual en 2027e-2033e, exactamente nuestro caso base, y rinde un 11,2 % anual, igual a nuestro coste de capital y por encima del 9,72 % que pide el mercado. Cotiza a 16,8 veces el EBITDA de los últimos 12 meses (media de la década, 49,2) y a 16,7 veces el beneficio de los próximos 12, frente a 24,9 de mediana de los comparables. La mediana de su PER adelantado de cinco años (30,3 veces) está a 1,79 veces el actual, al borde del umbral de 1,8 que manda a la regla v2: con la v2 la rentabilidad sería del 18,7 % (16,0 % el base), también Comprar.

**Riesgos y catalizadores.** El mayor riesgo es que YouTube y el nuevo Paramount-Warner frenen altas y precios, como en 2022: el bajista vale 37,21 USD (−40,5 %) [B13, B19]. Catalizadores: la guía de 2027 en enero y las recompras (22.300 M pendientes, un 8,6 % del capital) [D48]. Los foros, divididos, no aportan un riesgo nuevo.

**Qué cambiaría la decisión.** Compramos solo por debajo de 63,22 USD (valor real, que es el límite robusto de nivel A); para quien la tiene, el filtro de mantener aguanta hasta 74,29 USD. La banda de venta de la regla a 12 meses empieza en 90,80 USD (ponderada ≤ −10 %). Pasaríamos a Vender si UCAN crece menos de un 8 % en dos trimestres seguidos o si anuncia otra compra grande financiada con deuda.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses (el objetivo depende de que el múltiplo se recupere; el valor real ya está en el precio)',
  sintesis,
  tesis: `Netflix es el ganador del streaming: 45.183 M de ingresos en 2025 (+16 %), un margen operativo del 29,5 % y un ROIC del 38,0 %, con un coste de contenidos que reparte entre más de 325 M de suscripciones mientras sus rivales apenas ganan dinero [A1, B9]. La publicidad (≈ 2.700 M en 2026, menos de lo previsto), el directo y las subidas de precio sostienen un crecimiento de dos dígitos a corto plazo [A14].

El precio, 62,52 USD tras caer un 42,9 % en un año, ya no descuenta una tecnológica: 16,8 veces el EBITDA de los últimos 12 meses y 16,9 veces nuestro BPA de 2027e, mínimos de su década. El DCF inverso dice que pide un 7,9 % de crecimiento anual en 2027e-2033e, justo nuestro caso base, con un margen EBITDA final del 39,4 %: rinde un 11,2 % anual, lo mismo que nuestro WACC (11,20 %) [D55].

El mercado acierta al frenar el múltiplo: el crecimiento baja de +17,6 % (4T25) a +11,8 % (3T26) y +11,5 % guiado para el 4T26, UCAN crece un 11 % y el visionado un 2 % [A10, A14]. Pero a este precio ya no hay que creer en una vuelta a crecer por encima del 11 %: basta con que el freno siga el ritmo de un punto al año y que el múltiplo deje de bajar.`,
  vision_diferencial: {
    mercado_descuenta: `Que Netflix crecerá un 7,9 % anual en 2027e-2033e con nuestros márgenes, o que su margen EBITDA llegará al 39,4 % con nuestro crecimiento: casi exactamente nuestro caso base. Los analistas son más optimistas: objetivo medio de 84,76 USD (recortado desde 91,39 tras el 3T26) y 33 recomendaciones de compra de 51 [D49].`,
    nuestra_vision: `Un crecimiento del 10,5 % en 2027 y del 10 % en 2028 (algo menos que el consenso por la publicidad), que baja un punto al año hasta el 5 % de 2033 y un margen EBITDA del 39,5 %. Con eso, el DCF vale 62,65 USD con nuestro coste de capital y 77,65 con el que pide hoy el mercado: el precio está en el extremo bajo.`,
    por_que: `No discrepamos del mercado en las cifras: coincidimos casi con el consenso (BPA de 2028e un 4,4 % por debajo). Lo que creemos es que un PER de 16,9 veces para un negocio con un ROIC del 38 % y crecimiento del 10 % ya paga el riesgo de freno; el precio ha caído un 9 % en una semana sin que cambie ninguna cifra. Podríamos equivocarnos si la guía de 2027 confirma un crecimiento de un dígito.`,
  },
  a_favor: [
    '**Rentabilidad sin rival en el sector**: ROIC del 38,0 % y margen operativo del 29,5 % frente al 5,4 % de Disney DTC [A1, B9].',
    '**Balance sano**: deuda neta de 6.909 M, 0,4 veces el EBITDA, y 22.300 M de recompras autorizadas, un 8,6 % del capital [D48].',
    '**El precio solo pide el caso base**: el DCF inverso descuenta un 7,9 % de crecimiento anual, el mismo que nuestro base.',
    '**Múltiplo en mínimos de la década**: 16,8 veces el EBITDA LTM frente a una media de 49,2; 16,9 veces el BPA de 2027e.',
    '**Dirección que cumple en margen**: guía de margen cumplida cuatro de cinco años y disciplina al no subir la oferta por Warner [C5, A9].',
  ],
  en_contra: [
    '**El crecimiento se frena**: de +17,6 % en el 4T25 a +11,8 % en el 3T26 y +11,5 % guiado para el 4T26 [A14].',
    '**La publicidad falla**: ≈ 2.700 M en 2026 frente a ≈ 3.000 M previstos; Peters admite ir «por detrás» [A17].',
    '**YouTube le gana el tiempo de televisión**: 14,2 % frente al ≈ 8-9 % de Netflix en EE. UU. [B13].',
    '**Margen mínimo sobre el valor real**: 63,22 USD de valor real frente a 62,52 de precio, un 1,1 %.',
    '**Bajista profundo**: 37,21 USD (−40,5 %); en 2022 la acción cayó un 51 %.',
    '**Tendencia bajista**: −42,9 % en 12 meses y en mínimos de 52 semanas, un 24 % bajo la media de 200 sesiones [D55].',
  ],
  que_vigilar: `La tesis depende de que el crecimiento se estabilice en torno al 10-11 % en 2027 gracias a la publicidad y a los mercados fuera de EE. UU. La señal de que no se cumple sería una guía de 2027 por debajo del +10 % o un UCAN por debajo del +8 %; la de que el mercado se queda corto, una guía de +12 % o más con margen al alza.`,
  cambiaria_recomendacion: [
    'Si el precio supera 63,22 USD (valor real) sin cambios en la guía, la compra se para y pasa a Mantener; quien la tiene la mantiene hasta 74,29 USD (filtro de mantener).',
    'Si la guía de 2027 (enero) da un crecimiento de los ingresos por debajo del 10 % o un margen operativo por debajo del 33 %, rehacemos el BPA y probablemente pasaríamos a Mantener.',
    'Si UCAN crece menos de un 8 % en dos trimestres seguidos, pasaríamos a Vender.',
    'Si anuncia otra compra grande financiada con deuda (más de 20.000 M), pasaríamos a Vender.',
    'Por encima de 90,80 USD la regla a 12 meses daría Vender (ponderada ≤ −10 %).',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento de los ingresos', nivel_actual: '+11,8 % (3T26); guía +11,5 % (4T26)', umbral_alerta: 'Por debajo del +10 %', por_que: 'El precio descuenta un 7,9 % anual en 2027e-2033e.' },
    { kpi: 'Crecimiento de UCAN', nivel_actual: '+11 % (3T26)', umbral_alerta: 'Por debajo del +8 % dos trimestres', por_que: 'Mide la saturación de precios en su mayor mercado.' },
    { kpi: 'Margen operativo anual', nivel_actual: '29,5 % (2025); guía 31,5 % (2026)', umbral_alerta: 'Por debajo del 31 % en 2026', por_que: 'El caso base sube el margen cada año.' },
    { kpi: 'Ratio de pagos de contenidos sobre amortización', nivel_actual: '1,08 (2025); 1,16 (1S26)', umbral_alerta: 'Por encima de 1,2', por_que: 'Es el capex real del negocio.' },
    { kpi: 'Cuota del tiempo de televisión en EE. UU. (Nielsen)', nivel_actual: '≈ 8-9 %', umbral_alerta: 'Por debajo del 7,5 %', por_que: 'Mide la competencia de YouTube.' },
    { kpi: 'Ingresos publicitarios', nivel_actual: '≈ 2.700 M (guía 2026, rebajada desde ≈ 3.000 M)', umbral_alerta: 'Menos de 2.500 M en 2026', por_que: 'Es la palanca de crecimiento de 2027-2028.' },
  ],
  confianza: 'Media',
};
