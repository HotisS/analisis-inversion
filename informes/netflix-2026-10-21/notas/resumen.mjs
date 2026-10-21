// Resumen ejecutivo (Netflix, corte 2026-10-21, tras el 3T26). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. Tras el 3T26, el valor real (síntesis del DCF, los escenarios y los comparables) es de 61,92 USD, un 9,9 % por debajo del cierre de 68,69 USD del 20-oct; Netflix no paga dividendo. El objetivo a 12 meses con nuestra regla de múltiplos es de 89,94 USD (+30,9 % ponderado, +28,0 % el base): el PER de 18,6 veces el BPA de 2027e es el más bajo de su historia. Las dos lecturas chocan: a 12 meses hay recorrido, pero el precio sigue por encima de lo que vale el negocio con nuestro coste de capital, y la regla exige las dos cosas para comprar. Con la prima de riesgo que hoy pide el mercado (WACC del 9,9 %), el valor sube a 74,74 USD (+8,8 %). La convicción es baja porque lo que separa la compra de la venta es la tasa de descuento, no las cifras.

**Qué ha cambiado con el 3T26 (20-oct).** Buen trimestre y peor guía. Ingresos de 12.874 M (+11,8 %), margen del 34,6 % (33,2 % guiado) y BPA de 0,87 USD frente a 0,82 esperado [A14]. Pero la publicidad de 2026 baja a ≈ 2.700 M desde ≈ 3.000 M, la guía anual a 51.100 M, el 4T26 crece un 11,5 % con un margen del 26 % (BPA de 0,67 frente a 0,73 esperado) y el flujo libre baja a ≈ 12.000 M [A14, A17]. Despide al ≈ 6 % de la plantilla y cambia de jefa de contenidos [C19, C20]. Recompró 4.800 M en el trimestre, un récord. La acción cayó un 5,8 % fuera de horas, hasta 64,72 USD [D37]. Bajamos el crecimiento de 2027e del 11 % al 10,5 %; el BPA base de 2028e queda en 4,29 USD (antes 4,27) porque hay menos acciones.

**El negocio.** Netflix es el único servicio de streaming de escala mundial que gana dinero de verdad: 45.183 M de ingresos en 2025, margen operativo del 29,5 % y ROIC del 38,0 %, frente al 5,4 % de margen de Disney DTC [A1, B9]. Su foso es la escala: reparte el coste de los contenidos entre más de 325 M de suscripciones. Su calidad sostiene el crecimiento que proyectamos (la mitad del histórico): poco capital y poder de precios demostrado. El riesgo es de techo: el visionado solo crece un 2 % y la publicidad va por detrás [A10, A14].

**Finanzas.** Ingresos +19,9 % anual en la década y margen operativo del 4,3 % al 29,5 %. El «capex» real son los contenidos: en 2025 pagó 17.708 M frente a 16.422 M de amortización, y el DCF trata ese exceso como inversión [A1]. Deuda neta de 6.909 M a 30-sep (0,4 veces el EBITDA), tras la recompra del trimestre [D31]. El beneficio LTM está inflado por los 2.800 M de la comisión de Warner Bros. [A9].

**Equipo y gobierno.** Suma: guía de margen cumplida cuatro de cinco años, presidencia independiente desde junio y sin accionista de control [C4, C5]. Resta: los directivos vendieron 402,5 M en 12 meses sin comprar, estuvieron dispuestos a pagar 30,6 veces el EBITDA por Warner Bros. y fallan en la publicidad [C6, D24, A17].

**Valoración.** El DCF da 61,23 USD (−10,9 %). El DCF inverso dice que el precio supone un crecimiento del 9,4 % anual en 2027e-2033e, frente al 7,9 % de nuestro caso base; comprar hoy rinde un 10,5 % anual, por debajo de nuestro coste de capital (11,36 %) y algo por encima del que pide el mercado. Cotiza a 18,4 veces el EBITDA de los últimos 12 meses, el mínimo de su década (media de 49,2), y a 18,3 veces el beneficio de los próximos 12 meses, menos que Spotify, Roku o TKO. Barata frente a su historia, no frente a su crecimiento actual.

**Riesgos y catalizadores.** El mayor riesgo es que YouTube y el nuevo Skydance (Paramount con Warner, cerrada el 6-oct) frenen altas y precios, como en 2022: el bajista vale 36,50 USD [B13, B19]. El segundo, otra compra grande a múltiplo alto. Catalizadores: los recortes del consenso tras la guía, la guía de 2027 en enero y las recompras (22.300 M pendientes) [A14].

**Qué cambiaría la decisión.** Compraríamos por debajo de 61,92 USD (valor real), con el objetivo a 12 meses ya por encima del umbral; venderíamos por encima de 99,93 USD. Pasaríamos a Vender si UCAN crece menos de un 8 % en dos trimestres seguidos o si anuncia otra compra financiada con deuda.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Netflix es el ganador del streaming: 45.183 M de ingresos en 2025 (+16 %), un margen operativo del 29,5 % y un ROIC del 38,0 %, con un coste de contenidos que reparte entre más de 325 M de suscripciones mientras sus rivales apenas ganan dinero [A1, B9]. La publicidad (≈ 2.700 M en 2026, menos de lo previsto), el directo y las subidas de precio sostienen un crecimiento de dos dígitos a corto plazo [A14].

El precio, 68,69 USD tras caer un 42,7 % en un año (64,72 fuera de horas tras el 3T26), ya no descuenta una tecnológica: 18,4 veces el EBITDA de los últimos 12 meses, el mínimo de su década. Pero el DCF inverso dice que aún pide un 9,4 % de crecimiento anual en 2027e-2033e, frente al 7,9 % de nuestro caso base, y rinde un 10,5 % anual con nuestras cifras, menos que nuestro WACC (11,36 %) [D8, D37].

El mercado acierta al frenar el múltiplo: el crecimiento baja de +17,6 % (4T25) a +11,8 % (3T26) y +11,5 % guiado para el 4T26, UCAN crece un 11 % y el visionado un 2 % [A10, A14]. Para invertir hay que creer que la publicidad y el resto del mundo devuelven a Netflix a crecer por encima del 11 % varios años; por debajo de 62 USD no haría falta creerlo.`,
  vision_diferencial: {
    mercado_descuenta: `Que Netflix crecerá un 9,4 % anual en 2027e-2033e con nuestros márgenes, o que su margen EBITDA llegará al 43,7 % con nuestro crecimiento. Los analistas son más optimistas aún: precio objetivo medio de 91,39 USD (aún sin recoger la guía del 3T26) y 35 recomendaciones de compra de 52 [D].`,
    nuestra_vision: `Un crecimiento del 10,5 % en 2027 y del 10 % en 2028 (algo menos que el consenso por la publicidad), que baja un punto al año hasta el 5 % de 2033 y un margen EBITDA del 39,5 %. Con eso, el DCF vale 61,23 USD con nuestro coste de capital y 75,67 con el que pide hoy el mercado: el precio está en medio.`,
    por_que: `No discrepamos del mercado en las cifras sino en el precio del riesgo. Con el Tesoro al 5,12 % y una beta de 1,20, exigimos un 11,7 % a las acciones; el mercado se conforma con ≈ 10,2 %. Coincidimos casi con el consenso en ingresos y márgenes; donde sí discrepamos de los analistas es en el recorrido: su objetivo medio supone un múltiplo que solo se justifica si vuelve el crecimiento de dos dígitos.`,
  },
  a_favor: [
    '**Rentabilidad sin rival en el sector**: ROIC del 38,0 % y margen operativo del 29,5 % frente al 5,4 % de Disney DTC [A1, B9].',
    '**Balance sano**: deuda neta de 6.909 M, 0,4 veces el EBITDA, y 22.300 M de recompras autorizadas tras 4.800 M en el 3T26 [D31].',
    '**Más palancas que volumen**: la publicidad crece ≈ 80 % hasta ≈ 2.700 M en 2026 y las suscripciones van mejor de lo esperado [A14, A17].',
    '**Múltiplo en mínimos de la década**: 18,4 veces el EBITDA LTM frente a una media de 49,2; 18,6 veces el BPA de 2027e.',
    '**Dirección que cumple**: guía de margen cumplida cuatro de cinco años y disciplina al no subir la oferta por Warner [C5, A9].',
  ],
  en_contra: [
    '**El crecimiento se frena**: de +17,6 % en el 4T25 a +11,8 % en el 3T26 y +11,5 % guiado para el 4T26 [A14].',
    '**La publicidad falla**: ≈ 2.700 M en 2026 frente a ≈ 3.000 M previstos; Peters admite ir «por detrás» [A17].',
    '**YouTube le gana el tiempo de televisión**: 14,2 % frente al ≈ 8-9 % de Netflix en EE. UU. [B13].',
    '**Menos transparencia**: ya no publica suscriptores y el visionado será anual desde 2027 [A10].',
    '**Bajista profundo**: 36,50 USD (−46,9 %); en 2022 la acción cayó un 51 %.',
    '**Directivos vendedores**: 402,5 M de ventas en 12 meses y ninguna compra [C6].',
  ],
  que_vigilar: `La tesis depende de que el crecimiento se estabilice en torno al 11 % en 2027 gracias a la publicidad y a los mercados fuera de EE. UU. La señal de que no se cumple sería una guía de 2027 por debajo del +10 % o un UCAN por debajo del +8 %; la de que el mercado se queda corto, una guía de +12 % o más con margen al alza.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 61,92 USD (valor real) sin cambios en la guía, pasaríamos a Comprar.',
    'Si la guía de 2027 (enero) da un crecimiento de los ingresos del 12 % o más y un margen operativo por encima del 33 %, pasaríamos a Comprar.',
    'Si UCAN crece menos de un 8 % en dos trimestres seguidos, pasaríamos a Vender.',
    'Si anuncia otra compra grande financiada con deuda (más de 20.000 M), pasaríamos a Vender.',
    'Si el precio supera 99,93 USD sin mejoras en la guía, pasaríamos a Vender.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento de los ingresos', nivel_actual: '+11,8 % (3T26); guía +11,5 % (4T26)', umbral_alerta: 'Por debajo del +10 %', por_que: 'El precio descuenta un 10 % anual.' },
    { kpi: 'Crecimiento de UCAN', nivel_actual: '+11 % (3T26)', umbral_alerta: 'Por debajo del +8 % dos trimestres', por_que: 'Mide la saturación de precios en su mayor mercado.' },
    { kpi: 'Margen operativo anual', nivel_actual: '29,5 % (2025); guía 31,5 % (2026)', umbral_alerta: 'Por debajo del 31 % en 2026', por_que: 'El caso base sube el margen cada año.' },
    { kpi: 'Ratio de pagos de contenidos sobre amortización', nivel_actual: '1,08 (2025); 1,16 (1S26)', umbral_alerta: 'Por encima de 1,2', por_que: 'Es el capex real del negocio.' },
    { kpi: 'Cuota del tiempo de televisión en EE. UU. (Nielsen)', nivel_actual: '≈ 8-9 %', umbral_alerta: 'Por debajo del 7,5 %', por_que: 'Mide la competencia de YouTube.' },
    { kpi: 'Ingresos publicitarios', nivel_actual: '≈ 2.700 M (guía 2026, rebajada desde ≈ 3.000 M)', umbral_alerta: 'Menos de 2.500 M en 2026', por_que: 'Es la palanca de crecimiento de 2027-2028.' },
  ],
  confianza: 'Media',
};
