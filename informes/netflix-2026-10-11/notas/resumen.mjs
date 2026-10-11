// Resumen ejecutivo (Netflix, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo es de 61,10 USD, un 13,1 % por debajo del precio de 70,30 USD; Netflix no paga dividendo, así que la rentabilidad total esperada a 12 meses es del −13,1 %. El alcista gana un 16,5 % y el bajista pierde un 48,4 % (asimetría de 0,34 veces). Las reglas discrepan: con nuestro WACC (11,47 %) sale Vender; con la prima que hoy pide el mercado (WACC del 9,99 %) el objetivo sube a 73,49 USD (+4,5 %) y sale Mantener, que manda. La razón: el precio ya paga algo más de crecimiento del que esperamos nosotros y el consenso, en pleno frenazo. La convicción es baja, la sugerida, porque lo que separa las dos reglas es la tasa de descuento, no las cifras. Subiría si la guía de 2027 (enero) supera el +11 % o si la acción baja de 58 USD.

**El negocio.** Netflix es el único servicio de streaming de escala mundial que gana dinero de verdad: 45.183 M de ingresos en 2025, margen operativo del 29,5 % y ROIC del 38,0 %, frente al 5,4 % de margen de Disney DTC y las pérdidas de Paramount DTC [A1, B9, B10]. Su foso es la escala: reparte el coste de los contenidos entre más de 325 M de suscripciones. Su calidad sí sostiene el crecimiento que proyectamos (8,7 % anual, la mitad del histórico, con la cuota bajando del 30,2 % al 17,7 % en 2030e): poco capital y poder de precios demostrado. El riesgo es de techo: el visionado solo crece un 2 % [A10].

**Finanzas.** Ingresos +19,9 % anual en la década y margen operativo del 4,3 % al 29,5 %. El «capex» real son los contenidos: en 2025 pagó 17.708 M frente a 16.422 M de amortización, y el DCF trata ese exceso como inversión [A1]. Flujo libre de 9.461 M y deuda neta de 5.181 M (0,4 veces el EBITDA). El beneficio LTM está inflado por los 2.800 M de la comisión de Warner Bros. [A9].

**Equipo y gobierno.** Suma: guía de margen cumplida cuatro de cinco años, presidencia independiente desde junio y sin accionista de control [C4, C5]. Resta: los directivos vendieron 402,5 M en 12 meses sin comprar y estuvieron dispuestos a pagar 30,6 veces el EBITDA por Warner Bros. [C6, D24].

**Valoración.** El DCF da 60,38 USD (−14,1 %). El DCF inverso dice que el precio supone un crecimiento del 10,0 % anual en 2027e-2033e, frente al 8,0 % de nuestro caso base, alineado con el consenso; comprar hoy rinde un 10,4 % anual, por debajo de nuestro coste de capital y algo por encima del que pide el mercado. Cotiza a 19,8 veces el EBITDA de los últimos 12 meses, el mínimo de su década (media de 49,2), y a 18,7 veces el beneficio de los próximos 12 meses, menos que Spotify, Roku o TKO. Barata frente a su historia, no frente a su crecimiento actual; el objetivo medio de los analistas (92,55 USD) exige que vuelva el crecimiento de dos dígitos.

**Riesgos y catalizadores.** El mayor riesgo es que YouTube (14,2 % del tiempo de televisión en EE. UU., frente al ≈ 8-9 % de Netflix) y el nuevo Paramount-Warner frenen altas y precios, como en 2022: el bajista vale 36,28 USD [B13]. El segundo, otra compra grande a múltiplo alto. Catalizadores: el 3T26 (20-oct-2026), la guía de 2027 en enero y las recompras (27.100 M pendientes) [D2, A10]. Los foros, divididos, no muestran capitulación.

**Qué cambiaría la decisión.** Compraríamos por debajo de 58,17 USD y venderíamos por encima de 81,69 USD. Pasaríamos a Comprar si la guía de 2027 da un +12 % o más con margen al alza; a Vender, si UCAN crece menos de un 8 % en dos trimestres seguidos o si anuncia otra compra financiada con deuda.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Netflix es el ganador del streaming: 45.183 M de ingresos en 2025 (+16 %), un margen operativo del 29,5 % y un ROIC del 38,0 %, con un coste de contenidos que reparte entre más de 325 M de suscripciones mientras sus rivales apenas ganan dinero [A1, B9]. La publicidad (≈ 3.000 M en 2026), el directo y las subidas de precio sostienen un crecimiento de dos dígitos a corto plazo [A10].

El precio, 70,30 USD tras caer un 42,4 % en un año, ya no descuenta una tecnológica: 19,8 veces el EBITDA de los últimos 12 meses, el mínimo de su década. Pero el DCF inverso dice que aún pide un 10,0 % de crecimiento anual en 2027e-2033e, frente al 8,0 % de nuestro caso base y del consenso, y rinde un 10,4 % anual con nuestras cifras, menos que nuestro WACC (11,47 %) [D8].

El mercado acierta al frenar el múltiplo: el crecimiento baja de +17,6 % (4T25) a +12 % (3T26 guiado), UCAN solo crece un 10 % y el visionado un 2 % [A10]. Para invertir hay que creer que la publicidad y el resto del mundo devuelven a Netflix a crecer por encima del 11 % varios años; a 58 USD no haría falta creerlo.`,
  vision_diferencial: {
    mercado_descuenta: `Que Netflix crecerá un 10,0 % anual en 2027e-2033e con nuestros márgenes, o que su margen EBITDA llegará al 45,2 % con nuestro crecimiento. Los analistas son más optimistas aún: precio objetivo medio de 92,55 USD y 35 recomendaciones de compra de 51 [D6].`,
    nuestra_vision: `Un crecimiento del 11 % en 2027 y del 10 % en 2028 (el consenso), que baja un punto al año hasta el 5 % de 2033 y un margen EBITDA del 39,5 %. Con eso, Netflix vale 60,38 USD con nuestro coste de capital y 74,34 con el que pide hoy el mercado: el precio está en medio.`,
    por_que: `No discrepamos del mercado en las cifras sino en el precio del riesgo. Con el Tesoro al 5,22 % y una beta de 1,20, exigimos un 11,8 % a las acciones; el mercado se conforma con ≈ 10 %. Coincidimos con el consenso en ingresos y márgenes; donde sí discrepamos de los analistas es en el recorrido: su objetivo medio supone un múltiplo que solo se justifica si vuelve el crecimiento de dos dígitos.`,
  },
  a_favor: [
    '**Rentabilidad sin rival en el sector**: ROIC del 38,0 % y margen operativo del 29,5 % frente al 5,4 % de Disney DTC [A1, B9].',
    '**Balance sano**: deuda neta de 5.181 M, 0,4 veces el EBITDA, y 27.100 M de recompras autorizadas [A10].',
    '**Más palancas que volumen**: la publicidad se dobla a ≈ 3.000 M en 2026 y el directo dispara las altas [A10].',
    '**Múltiplo en mínimos de la década**: 19,8 veces el EBITDA LTM frente a una media de 49,2.',
    '**Dirección que cumple**: guía de margen cumplida cuatro de cinco años y disciplina al no subir la oferta por Warner [C5, A9].',
  ],
  en_contra: [
    '**El crecimiento se frena**: de +17,6 % en el 4T25 a +12 % guiado para el 3T26; UCAN solo +10 % [A10].',
    '**El precio aún pide más que el consenso**: 10,0 % anual en 2027e-2033e frente a nuestro 8,0 %.',
    '**YouTube le gana el tiempo de televisión**: 14,2 % frente al ≈ 8-9 % de Netflix en EE. UU. [B13].',
    '**Menos transparencia**: ya no publica suscriptores y el visionado será anual desde 2027 [A10].',
    '**Bajista profundo**: 36,28 USD (−48,4 %); en 2022 la acción cayó un 51 %.',
    '**Directivos vendedores**: 402,5 M de ventas en 12 meses y ninguna compra [C6].',
  ],
  que_vigilar: `La tesis depende de que el crecimiento se estabilice en torno al 11 % en 2027 gracias a la publicidad y a los mercados fuera de EE. UU. La señal de que no se cumple sería una guía de 2027 por debajo del +10 % o un UCAN por debajo del +8 %; la de que el mercado se queda corto, una guía de +12 % o más con margen al alza.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 58,17 USD sin cambios en la guía, pasaríamos a Comprar.',
    'Si la guía de 2027 (enero) da un crecimiento de los ingresos del 12 % o más y un margen operativo por encima del 33 %, pasaríamos a Comprar.',
    'Si UCAN crece menos de un 8 % en dos trimestres seguidos, pasaríamos a Vender.',
    'Si anuncia otra compra grande financiada con deuda (más de 20.000 M), pasaríamos a Vender.',
    'Si el precio supera 81,69 USD sin mejoras en la guía, pasaríamos a Vender.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento de los ingresos', nivel_actual: '+13,4 % (2T26); guía +12 % (3T26)', umbral_alerta: 'Por debajo del +10 %', por_que: 'El precio descuenta un 10 % anual.' },
    { kpi: 'Crecimiento de UCAN', nivel_actual: '+10 % (2T26)', umbral_alerta: 'Por debajo del +8 % dos trimestres', por_que: 'Mide la saturación de precios en su mayor mercado.' },
    { kpi: 'Margen operativo anual', nivel_actual: '29,5 % (2025); guía 31,5 % (2026)', umbral_alerta: 'Por debajo del 31 % en 2026', por_que: 'El caso base sube el margen cada año.' },
    { kpi: 'Ratio de pagos de contenidos sobre amortización', nivel_actual: '1,08 (2025); 1,16 (1S26)', umbral_alerta: 'Por encima de 1,2', por_que: 'Es el capex real del negocio.' },
    { kpi: 'Cuota del tiempo de televisión en EE. UU. (Nielsen)', nivel_actual: '≈ 8-9 %', umbral_alerta: 'Por debajo del 7,5 %', por_que: 'Mide la competencia de YouTube.' },
    { kpi: 'Ingresos publicitarios', nivel_actual: '≈ 3.000 M (guía 2026)', umbral_alerta: 'Menos de 2.700 M en 2026', por_que: 'Es la palanca de crecimiento de 2027-2028.' },
  ],
  confianza: 'Media',
};
