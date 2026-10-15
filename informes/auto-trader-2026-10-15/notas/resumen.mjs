// Resumen ejecutivo (Auto Trader, corte 2026-10-15). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 5,60 GBP: rentabilidad ponderada del 11,5 % con el dividendo y del 11,9 % en el caso base, por debajo del 15 % y el 12 % que pide la compra. El valor intrínseco es de 6,80 GBP (+32,7 % sobre 5,124 GBP) y el objetivo medio de los analistas (5,59 GBP) cae dentro de nuestro rango. El negocio vale más de lo que cotiza, pero el método no supone que el múltiplo perdido vuelva en un año, y sin eso el BPA (+9,6 %) y el dividendo (2,3 %) no llegan al 15 %. La convicción es media porque la ponderada está a 3,5 puntos del umbral; subiría si el 1S FY2027 (5-nov-2026) muestra forecourts estables y la guía confirmada, y bajaría si los forecourts caen más de un 2 %.

**El negocio.** Auto Trader tiene más del 75 % de los minutos en portales de coches del Reino Unido, 11 veces su competidor más cercano [B1]. Ha subido el ARPR de 1.546 a 2.995 GBP al mes en nueve años [A2, A11]. Margen EBITDA del 66 % y ROIC del 50,9 %, 41,8 puntos sobre el WACC del 9,1 %: **calidad, Sí**. La sostenibilidad del crecimiento es **Sí**: el 4,1 % anual del caso base sale del precio y del producto sin capital nuevo, como cada año desde FY2023 (+78-117 GBP de precio al año), aunque los forecourts ya no suman [A2-A4].

**Por qué el método no la compra.** La mediana de su PER adelantado de cinco años es de 22,0 veces y hoy cotiza a 12,0 veces nuestro BPA de FY2028e: 1,8 veces menos, el umbral exacto del selector de método, que trata la caída como de régimen y aplica la v2 (base = PER de hoy). Con la v3 sin selector (que supone que vuelve un 10 % del múltiplo) daría 22,5 % y Comprar. El desrate es de todo el sector (Rightmove 15,5 veces) por el miedo a la IA, más el frenazo propio por Deal Builder: sin datos para llamarlo temporal, la v2 decide con razón.

**Finanzas.** Convierte en caja el 103 % del beneficio; la deuda neta ajustada (con recompras y dividendo pagados desde el balance) es de 550 M, 1,3 veces el EBITDA. Nuestro beneficio neto de FY2029e (339,5 M) supera al del consenso (325,7 M); nuestro BPA es menor (0,4685 frente a 0,4919) solo porque no contamos recompras no anunciadas [D10].

**Valoración.** El DCF da 6,81 GBP; el DCF inverso dice que el precio supone ingresos casi planos (+0,2 % anual hasta FY2034e) o un margen del 52,3 %, frente al +4,1 % y el 67 % de nuestro caso base, en línea con el consenso [D10]. Cotiza a 10,7 veces el EBITDA, percentil 11 de su década.

**Riesgos y catalizadores.** El mayor es la IA: si asistentes o agentes de compra (o Amazon Autos) se quedan con la búsqueda, el bajista vale 3,63 GBP (−29,2 %); hoy menos del 1 % del tráfico llega de la IA [B1]. El segundo, la salida lenta de concesionarios por Deal Builder. Los cortos bajan del 10,1 % al 6,55 % [D7]; los comentaristas la ven sobrevendida. Catalizadores: el 1S27 el 5-nov-2026 y las recompras (quedan ≈200 M de los ≈500 M de FY2027) [D5, D28].

**Qué cambiaría la decisión.** Compra robusta por debajo de 4,97 GBP (con el objetivo fijo, v3 y v2 pasan); venta por encima de 6,35 GBP. El límite sube desde 4,62 GBP (10-oct) sobre todo porque el base de la v2 es el PER del día y el precio subió un 4,8 %. Revisaríamos al alza si la empresa anuncia recompras de ≈400 M para FY2028 (el BPA de FY2029e subiría un 6 % neto de intereses y la v2 pasaría el umbral, 15,3 %) y a la baja si los forecourts del 1S27 caen más de un 2 % o se rebaja la guía.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses; el valor intrínseco es una tesis a 2-3 años',
  sintesis,
  tesis: `Auto Trader es el mercado de coches de segunda mano del Reino Unido: más del 75 % de los minutos en portales de coches y 11 veces la audiencia del segundo [B1]. Ese dominio le da poder de precios: el ARPR casi se ha duplicado en nueve años, hasta 2.995 GBP al mes, con un margen EBITDA del 66 %, un ROIC del 50,9 % y una conversión de beneficio en caja del 103 % [A2, A11].

El precio de 5,124 GBP, un 38 % por debajo del máximo de 52 semanas, descuenta casi el fin del crecimiento: con nuestros márgenes, ingresos que crecen un 0,2 % al año hasta FY2034e; con nuestro crecimiento, un margen del 52,3 %. Cotiza a 10,7 veces el EBITDA, en el percentil 11 de su década y por debajo de clasificados con menos margen [D10-D19]. La posición corta del 6,55 % es una apuesta explícita contra el foso [D7].

El mercado acierta en que el crecimiento se ha frenado (+3,9 % en FY2026), en que Deal Builder dañó la relación con los concesionarios (−1,7 % de forecourts en el 2S26) y en que la IA es un riesgo de régimen que todavía no se puede medir [A2]. Probablemente exagera la caída: la guía de FY2027 sigue en pie, los consejeros compran y la recompra retira un 12 % del capital al año. Pero para que la acción rinda un 15 % en un año hace falta que el múltiplo vuelva, y eso pide datos (audiencia y ARPR de los próximos semestres) que aún no hay.`,
  vision_diferencial: {
    mercado_descuenta: `Que la IA (asistentes de compra, agentes) y Amazon Autos van a quitarle a Auto Trader parte de la búsqueda del coche, y que el rechazo a Deal Builder demuestra que ha agotado su poder de precios: ingresos casi planos y un múltiplo de portal en declive.`,
    nuestra_vision: `El crecimiento será menor que en la década pasada (+4 % frente al 8 %), pero el foso sigue intacto: la audiencia es 11 veces la del segundo y menos del 1 % del tráfico llega de la IA [A2, B1]. El conflicto de Deal Builder costó un 1,7 % de forecourts, no una huida. A un año, sin embargo, no vemos razón con fecha para que el múltiplo vuelva.`,
    por_que: `Porque los datos que el mercado teme todavía no aparecen: visitas de 83,3 millones al mes en el 1S26, el ARPR sigue subiendo (+5 % en FY2026) y la guía de FY2027 se mantiene [A2, A12]. Si la IA desintermediara el portal, se vería primero en las visitas y en los minutos, que publica cada semestre: es una tesis que se puede comprobar cada seis meses, y la primera prueba es el 5-nov-2026.`,
  },
  a_favor: [
    '**Dominio del mercado**: más del 75 % de los minutos en portales de coches, 11 veces el segundo [B1].',
    '**Poder de precios**: ARPR de 1.546 a 2.995 GBP al mes en nueve años [A2, A11].',
    '**Caja y rentabilidad**: margen EBITDA del 66 %, ROIC del 50,9 % y conversión en caja del 103 %.',
    '**Precio de crisis**: 10,7 veces el EBITDA, percentil 11 de su década; el DCF inverso pide +0,2 % de crecimiento anual.',
    '**Recompras y compras de consejeros**: c. 500 M de recompras en FY2027 (≈300 M hechos) y los ocho consejeros compraron en mayo-junio [A2, C8-C11, D28].',
  ],
  en_contra: [
    '**Objetivo a 12 meses corto**: +11,5 % ponderado con la regla vigente; sin vuelta del múltiplo no llega al 15 %.',
    '**Guía incumplida**: ingresos de concesionarios +4 % en FY2026 frente al 5-7 % prometido, y abril de 2026 plano [A2].',
    '**Concesionarios molestos**: −236 forecourts (−1,7 %) en el 2S26 por el lanzamiento de Deal Builder [A2, B11].',
    '**Riesgo de la IA y de Amazon Autos**: el propio informe anual lo reconoce como riesgo principal; bajista de −29,2 % [B1].',
    '**Posición corta del 6,55 %**, de las más altas del FTSE 100 [D7].',
  ],
  que_vigilar: `La tesis depende de que los forecourts se estabilicen y el ARPR siga subiendo por encima de la inflación. La señal de que no ocurre sería un 1S27 (5-nov-2026) con forecourts por debajo de −2 % interanual, o una caída de las visitas mensuales desde los 83,3 millones del 1S26. La señal de que el múltiplo puede volver: forecourts de nuevo al alza y visitas estables dos semestres seguidos.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 4,97 GBP, pasaría a Comprar (con el objetivo fijo, compra robusta).',
    'Si el precio supera 6,35 GBP, pasaríamos a Vender.',
    'Si la empresa anuncia recompras para FY2028 de al menos ≈400 M, el BPA de FY2029e subiría un ≈6 % neto de intereses y la v2 pasaría el umbral (15,3 %): revisaríamos a Comprar.',
    'Si los forecourts del 1S27 caen más de un 2 % interanual o se rebaja la guía de beneficio operativo de FY2027 (395-415 M), bajaríamos el caso base.',
    'Si las visitas mensuales caen dos semestres seguidos, revisaríamos el caso base hacia el bajista.',
  ],
  kpis_seguimiento: [
    { kpi: 'Forecourts medios', nivel_actual: '13.942 (FY2026); −1,7 % en el 2S26', umbral_alerta: '< −2 % interanual en el 1S27', por_que: 'Mide si el rechazo a Deal Builder se convierte en salida de clientes.' },
    { kpi: 'ARPR', nivel_actual: '2.995 GBP/mes (FY2026, +5 %)', umbral_alerta: 'Crecimiento < 3 % en el 1S27', por_que: 'Es el poder de precios que el precio da por perdido.' },
    { kpi: 'Visitas mensuales', nivel_actual: '83,3 millones (1S26)', umbral_alerta: 'Dos semestres seguidos a la baja', por_que: 'Primera señal de desintermediación por la IA.' },
    { kpi: 'Beneficio operativo del grupo', nivel_actual: 'Guía FY2027: 395-415 M', umbral_alerta: 'Rebaja de la guía', por_que: 'La guía de FY2026 se incumplió.' },
    { kpi: 'Posición corta agregada', nivel_actual: '6,55 % (13-oct-2026)', umbral_alerta: '> 8 %', por_que: 'Mide la apuesta del mercado contra el foso.' },
  ],
  confianza: 'Media',
};
