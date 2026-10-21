// Resumen ejecutivo (Moody's, corte 2026-10-21, tras el 3T26). Se escribe el último; cifras del motor tal cual.
export default {
  recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. A 12 meses, con nuestra regla de múltiplos, el objetivo es de 553,01 USD: +17,2 % ponderado y +22,4 % en el caso base, con dividendo, sobre el cierre de 475,35 USD del 20-oct. Pero el valor intrínseco (síntesis del DCF, los escenarios y los comparables) es de 339,13 USD, un 28,7 % por debajo: la regla pide las dos cosas para comprar. La convicción es baja porque las dos lecturas chocan y porque, con el BPA un 10 % más bajo, la rentabilidad a 12 meses cae al 5,5 %.

**Qué ha cambiado con el 3T26 (21-oct).** Trimestre flojo: ingresos de 2.023 M (+1 %, +3 % orgánico) frente a 2.080 M esperados y BPA ajustado de 4,14 USD (+6 %) frente a 4,25 [A1, D14]. MIS cae un 1 %: el alto rendimiento −40 % y los préstamos apalancados −27 %, compensados por el grado de inversión (+18 %, financiación de la IA). MA va bien: +8 % orgánico, ARR de 3.688 M y margen ajustado del 35,3 % [A1, B1]. La guía de 2026 se mantiene (BPA ajustado de 16,50-17,00 USD), pero con supuestos más duros: impago especulativo del 3,8 % y otra subida de tipos [A1]. En la preapertura cotizaba a 462 USD (−2,8 %) [D13]. Este análisis se rehace entero con fuentes primarias (el del 14-oct salió de extractos de búsqueda).

**El negocio.** Duopolio de calificación con S&P (31,4 % de los ingresos del sector; las tres grandes, el 92,4 %) y un negocio de datos y software (MA) con ingresos recurrentes [B5]. ROIC del 30,0 % frente a un WACC del 10,9 %; la calidad sostiene el crecimiento (veredicto: Sí).

**Finanzas.** Deuda neta de 5.290 M (1,3 veces el EBITDA) a 30-sep; recompra más de lo que genera (2.553 M en nueve meses) y el patrimonio contable baja [A1]. Altman Z de 7,18 y Piotroski de 9.

**Valoración.** El DCF da 311,97 USD (−34,4 %) y el DCF inverso dice que el precio descuenta un crecimiento del 11,4 % anual frente al 5,5 % de nuestro base. Con la prima de riesgo que hoy pide el mercado vale 361,44 USD: ni así llega al precio. Cotiza a 25,4 veces nuestro BPA ajustado de 2027e, por debajo de su mediana adelantada (30,6x) y por encima de los comparables (22,2x).

**Riesgos y catalizadores.** El primero, un año de emisión como 2022 (BPA −30 %); el segundo, que la IA abarate los datos de MA; el tercero, el múltiplo. Catalizador: la guía de 2027 en febrero.

**Qué cambiaría la decisión.** Compraríamos por debajo de 339,13 USD (valor real) y venderíamos por encima de 618,94 USD. La convicción subiría si MIS vuelve a crecer en el 4T con la guía cumplida.`,
  tesis: 'Moody\'s es media del duopolio mundial de la calificación de deuda y tiene un negocio de datos (MA) que crece un 8 % con ingresos recurrentes. Crea valor con un ROIC del 30 % y sube precios cada año [B5, A1].\n\nEl 3T26 enseña su punto débil: la emisión de alto rendimiento cae un 40 % y los ingresos solo crecen un 1 %. El precio (475,35 USD) descuenta un crecimiento del 11,4 % anual, el doble de nuestro base.\n\nA 12 meses la regla da +17,2 %, pero el valor intrínseco está un 28,7 % por debajo del precio: no compramos.',
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento del 11,4 % anual y un PER de 25-30 veces por la calidad del duopolio; objetivo medio de 551,38 USD (24 analistas) [D16, D17].',
    nuestra_vision: 'Coincidimos con el consenso en beneficio (BPA ajustado de 2027e de 18,68 frente a 18,76), pero no en el coste de capital: con un Tesoro al 5,1 %, exigimos más de lo que el precio rinde (7,4 %).',
    por_que: 'La diferencia es la tasa, no las cifras: la regla a 12 meses ve recorrido y el valor intrínseco no.',
  },
  a_favor: [
    '**Duopolio con poder de precios**: 31,4 % de los ingresos de calificación y las tres grandes con el 92,4 % [B5].',
    '**MA recurrente**: ARR de 3.688 M (+8 %) y margen ajustado del 35,3 % [A1].',
    '**ROIC del 30 %** frente a un WACC del 10,9 %.',
    '**Rentabilidad a 12 meses del 17,2 %** con la regla común.',
  ],
  en_contra: [
    '**3T26 por debajo de lo esperado**: ingresos +1 % y BPA ajustado 2,6 % bajo el consenso [A1, D14].',
    '**Valor intrínseco un 28,7 % por debajo del precio**.',
    '**Recompras por encima del flujo libre** y patrimonio contable a la baja [A1].',
    '**Directivos solo vendedores**: 13,8 M USD en 12 meses, ninguna compra.',
  ],
  que_vigilar: 'La tesis depende de que la emisión se recupere en 2027 con la refinanciación y de que MA siga creciendo al 8 %. La señal de que no se cumple: ingresos transaccionales de MIS cayendo dos trimestres seguidos o un ARR por debajo del +6 %.',
  cambiaria_recomendacion: [
    'Precio por debajo de 339,13 USD: pasaríamos a Comprar.',
    'Precio por encima de 618,94 USD: Vender o reducir.',
    'Guía de 2027 con BPA ajustado por encima de 19,50 USD: revisaríamos al alza.',
    'Dos trimestres de caída de los ingresos de MIS: revisaríamos a la baja.',
  ],
  kpis_seguimiento: [
    { kpi: 'Ingresos transaccionales de MIS', nivel_actual: '−5 % (3T26)', umbral_alerta: '< −10 %', por_que: 'Es la parte cíclica.' },
    { kpi: 'ARR de MA', nivel_actual: '3.688 M, +8 %', umbral_alerta: '< +6 %', por_que: 'Mide el riesgo de la IA en datos.' },
    { kpi: 'BPA ajustado (guía 2026)', nivel_actual: '16,50-17,00 USD', umbral_alerta: '< 16,50 USD', por_que: 'Base del objetivo.' },
  ],
  confianza: 'Media',
};
