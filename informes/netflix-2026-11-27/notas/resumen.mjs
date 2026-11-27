// Resumen ejecutivo (Netflix, corte 2026-11-27, un mes después del 3T26 y del informe del 28-oct). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. Al cierre del 25-nov (59,41 USD) el precio está un 9,1 % por debajo del valor real (64,79 USD) y el objetivo a 12 meses es de 70,63 USD: +18,9 % ponderado y +16,3 % el base, lejos del objetivo medio de los analistas (84,55). Netflix no paga dividendo. La razón: cotiza a 16,1 veces nuestro BPA de 2027e, el PER más bajo de su historia, y el precio descuenta menos crecimiento que nuestro base. La asimetría es de 1,32 veces con nuestro coste de capital y de 3,06 con la prima del mercado. La convicción es baja porque las dos reglas del valor intrínseco discrepan (absoluta Mantener, relativa Comprar) y porque la compra no aguanta un BPA un 10 % peor (ponderada 7,0 %): no es compra robusta. La subiría una guía de 2027 de +11 % o más en enero; la bajaría una por debajo del +10 %.

**Por qué cae y qué ha cambiado desde el 28-oct.** La caída de ≈ 21 % desde la compra es casi toda anterior al informe del 28-oct y tiene causa conocida: la guía del 3T26 (publicidad de 2026 rebajada a ≈ 2.700 M y un 4T al +11,5 %), el visionado que crece un 2 %, la competencia de YouTube y rebajas de Wells Fargo, HSBC, Needham y Wolfe [D31, D64]. Desde el 27-oct la acción cede otro 5,0 %, menos que el S&P 500 (−6,9 %) en una corrección general, sin noticia propia: ni guía nueva, ni rebajas (la última, el 22-oct), y el BPA de consenso de 2027e sigue en 3,765 [D57, D58]. Lo publicado es menor: ventas del neto de acciones entregadas a directivos, Pershing Square que sube su posición, la compra de Radford (ya en la guía), la puja por el Mundial de 2030 y un rumor sobre NBCUniversal sin oferta [D61, D66-D69]. La tesis no cambia. Sí cambia la regla: con el PER en 16,1 veces la mediana histórica pasa a 1,88 veces el actual y el selector decide la v2, que no supone vuelta del múltiplo (con la v3 serían +31,0 % y +27,8 %).

**El negocio.** Netflix es el único streaming mundial que gana dinero de verdad: margen operativo del 29,5 % y ROIC del 38,0 % frente a un WACC del 11,04 % [A1, B9]. Su foso es la escala (más de 325 M de suscripciones) y su calidad sostiene el crecimiento que proyectamos (veredicto «Sí»): es la mitad del histórico y apenas pide capital. El riesgo es de techo: visionado, YouTube y publicidad [A10, A14].

**Valoración.** El DCF da 64,30 USD (+8,2 %). El DCF inverso dice que el precio supone un crecimiento del 6,9 % anual en 2027e-2033e, un punto menos que nuestro base (7,9 %), y rinde un 11,7 % anual, por encima de nuestro coste de capital y del 9,81 % que pide el mercado. Cotiza a 15,9 veces el EBITDA de 12 meses (media de la década, 49,2) y a 15,9 veces el beneficio de los próximos 12, frente a 23,4 de mediana de los comparables; Disney, que crece la mitad, cotiza a 16,2 [D62].

**Riesgos y catalizadores.** El mayor riesgo es que YouTube y Paramount-Warner frenen altas y precios, como en 2022: el bajista vale 37,99 USD (−36,1 %). Una compra grande con deuda (NBCUniversal) sería el segundo. Catalizadores: la guía de 2027 (≈ 19-ene-2027) y las recompras (22.300 M pendientes). En los foros, enfado de los particulares por la gestión y un mensaje en redes; no anticipa un riesgo que no esté en las cifras.

**Qué cambiaría la decisión.** Para quien la tiene, se mantiene hasta 64,21 USD (filtro de mantener) y el colchón de BPA para mantener es del 8 %. No se amplía al precio de hoy: el nivel A exige ≤ 55,29 USD y el B ≤ 57,80 USD. La banda Vender de la regla empieza en 78,47 USD (ponderada ≤ −10 %). Rehacemos si la guía de 2027 queda por debajo del +10 %, si UCAN crece menos de un 8 % dos trimestres o si anuncia una compra de más de 20.000 M con deuda.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses (el objetivo sale del crecimiento del BPA, sin vuelta del múltiplo)',
  sintesis,
  tesis: `Netflix es el ganador del streaming: 45.183 M de ingresos en 2025 (+16 %), un margen operativo del 29,5 % y un ROIC del 38,0 %, con un coste de contenidos que reparte entre más de 325 M de suscripciones mientras sus rivales apenas ganan dinero [A1, B9]. La publicidad (≈ 2.700 M en 2026, menos de lo previsto), el directo y las subidas de precio sostienen un crecimiento de dos dígitos a corto plazo [A14].

El precio, 59,41 USD tras caer un 44,5 % en un año, ya no descuenta una tecnológica: 15,9 veces el EBITDA de los últimos 12 meses y 16,1 veces nuestro BPA de 2027e, mínimos de su década. El DCF inverso dice que pide un 6,9 % de crecimiento anual en 2027e-2033e, un punto menos que nuestro caso base, con un rendimiento implícito del 11,7 % anual frente a un WACC del 11,04 % [D58].

El mercado acierta al frenar el múltiplo: el crecimiento baja de +17,6 % (4T25) a +11,8 % (3T26) y +11,5 % guiado para el 4T26, y el visionado crece un 2 % [A10, A14]. Pero a este precio no hay que creer en una vuelta a crecer por encima del 11 %: basta con que el freno no se acelere y el BPA crezca al ritmo del consenso.`,
  vision_diferencial: {
    mercado_descuenta: `Que Netflix crecerá un 6,9 % anual en 2027e-2033e con nuestros márgenes, o que su margen EBITDA llegará al 36,9 % con nuestro crecimiento: menos que nuestro caso base. Los analistas son más optimistas: objetivo medio de 84,55 USD y 33 recomendaciones de compra de 51 [D57].`,
    nuestra_vision: `Un crecimiento del 10,5 % en 2027 y del 10 % en 2028 (algo menos que el consenso por la publicidad), que baja un punto al año hasta el 5 % de 2033 y un margen EBITDA del 39,5 %. Con eso, el DCF vale 64,30 USD con nuestro coste de capital y 76,95 con el que pide hoy el mercado.`,
    por_que: `No discrepamos del mercado en las cifras: coincidimos casi con el consenso (BPA de 2028e un 4,4 % por debajo). Lo que creemos es que un PER de 16,1 veces para un negocio con un ROIC del 38 % y crecimiento del 10 % ya paga el riesgo de freno; el precio ha caído un 13,5 % desde los resultados sin que cambie ninguna cifra. Podríamos equivocarnos si la guía de 2027 confirma un crecimiento de un dígito.`,
  },
  a_favor: [
    '**Rentabilidad sin rival en el sector**: ROIC del 38,0 % y margen operativo del 29,5 % frente al 5,4 % de Disney DTC [A1, B9].',
    '**Balance sano**: deuda neta de 6.909 M, 0,4 veces el EBITDA, y 22.300 M de recompras autorizadas [D48].',
    '**El precio pide menos que el caso base**: el DCF inverso descuenta un 6,9 % de crecimiento anual frente al 7,9 % de nuestro base.',
    '**Múltiplo en mínimos de la década**: 15,9 veces el EBITDA LTM frente a una media de 49,2; 16,1 veces el BPA de 2027e.',
    '**Sin noticia mala nueva desde el 28-oct**: consenso de BPA de 2027e igual (3,765) y Pershing Square sube su posición [D57, D68].',
  ],
  en_contra: [
    '**El crecimiento se frena**: de +17,6 % en el 4T25 a +11,8 % en el 3T26 y +11,5 % guiado para el 4T26 [A14].',
    '**La publicidad falla**: ≈ 2.700 M en 2026 frente a ≈ 3.000 M previstos; Peters admite ir «por detrás» [A17].',
    '**YouTube le gana el tiempo de televisión**: 15,8 % frente al 7,7 % de Netflix en EE. UU. en agosto [D64].',
    '**Compra frágil**: con un BPA un 10 % peor la ponderada a 12 meses baja al 7,0 %; colchón de BPA del 4 % para comprar.',
    '**Bajista profundo**: 37,99 USD (−36,1 %); en 2022 la acción cayó un 51 %.',
    '**Tendencia bajista**: −44,5 % en 12 meses, un 25 % bajo la media de 200 sesiones [D58].',
  ],
  que_vigilar: `La tesis depende de que el crecimiento se estabilice en torno al 10-11 % en 2027 gracias a la publicidad y a los mercados fuera de EE. UU. La señal de que no se cumple sería una guía de 2027 por debajo del +10 % o un UCAN por debajo del +8 %; la de que el mercado se queda corto, una guía de +12 % o más con margen al alza. Fuera de las cifras, una oferta por NBCUniversal u otro estudio grande.`,
  cambiaria_recomendacion: [
    'Para quien la tiene: se mantiene hasta 64,21 USD (filtro de mantener); por encima, pasa a «no pasa mantener». La banda Vender de la regla a 12 meses empieza en 78,47 USD (ponderada ≤ −10 %).',
    'No se amplía salvo por debajo de 55,29 USD (nivel A) o de 57,80 USD (nivel B, con calidad completa).',
    'Si la guía de 2027 (enero) da un crecimiento de los ingresos por debajo del 10 % o un margen operativo por debajo del 33 %, rehacemos el BPA y probablemente pasaríamos a Mantener.',
    'Si UCAN crece menos de un 8 % en dos trimestres seguidos, pasaríamos a Vender.',
    'Si anuncia una compra grande financiada con deuda (más de 20.000 M, por ejemplo NBCUniversal), rehacemos el informe y probablemente pasaríamos a Vender.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento de los ingresos', nivel_actual: '+11,8 % (3T26); guía +11,5 % (4T26)', umbral_alerta: 'Por debajo del +10 %', por_que: 'El precio descuenta un 6,9 % anual en 2027e-2033e.' },
    { kpi: 'Crecimiento de UCAN', nivel_actual: '+11 % (3T26)', umbral_alerta: 'Por debajo del +8 % dos trimestres', por_que: 'Mide la saturación de precios en su mayor mercado.' },
    { kpi: 'Margen operativo anual', nivel_actual: '29,5 % (2025); guía 31,5 % (2026)', umbral_alerta: 'Por debajo del 31 % en 2026', por_que: 'El caso base sube el margen cada año.' },
    { kpi: 'Ratio de pagos de contenidos sobre amortización', nivel_actual: '1,08 (2025); 1,16 (1S26)', umbral_alerta: 'Por encima de 1,2', por_que: 'Es el capex real del negocio (deporte y Mundial incluidos).' },
    { kpi: 'Cuota del tiempo de televisión en EE. UU. (Nielsen)', nivel_actual: '7,7 % (agosto de 2026)', umbral_alerta: 'Por debajo del 7,0 %', por_que: 'Mide la competencia de YouTube.' },
    { kpi: 'Ingresos publicitarios', nivel_actual: '≈ 2.700 M (guía 2026, rebajada desde ≈ 3.000 M)', umbral_alerta: 'Menos de 2.500 M en 2026', por_que: 'Es la palanca de crecimiento de 2027-2028.' },
  ],
  confianza: 'Media',
};
