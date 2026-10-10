// Resumen ejecutivo (Auto Trader, corte 2026-10-10). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 6,83 GBP, un 39,8 % por encima del precio de 4,887 GBP, y la rentabilidad total esperada a 12 meses es del 42,1 % con el dividendo. El alcista gana un 65,3 % y el bajista pierde un 24,5 %: asimetría de 2,67 veces. La razón en una frase: el precio descuenta que el portal dominante del Reino Unido deja de crecer, y nada en sus cifras lo muestra todavía. Los criterios del motor sugieren convicción alta; la bajamos a media porque la guía de FY2026 se incumplió, los ingresos de abril fueron planos y la caída de forecourts por Deal Builder aún no ha tocado fondo [A2, C27]. Subiría a alta si el 1S27 (5-nov-2026) muestra forecourts estables y la guía de 395-415 M confirmada; bajaría si los forecourts caen más de un 2 %.

**El negocio.** Auto Trader tiene más del 75 % de los minutos en portales de coches del Reino Unido, 11 veces su competidor más cercano [B1]. Cobra una suscripción mensual a 13.942 forecourts y ha subido el ARPR de 1.546 a 2.995 GBP al mes en nueve años [A2, A11]. El margen EBITDA es del 66 % y el ROIC del 50,9 %, más de cinco veces el WACC del 9,0 %.

**Finanzas.** Convierte en caja el 103 % del beneficio y casi no invierte: de FY2017 a FY2026 generó 2.238 M de flujo libre y devolvió 2.013 M en recompras y dividendos; las acciones diluidas bajaron un 13 % [A2]. La deuda neta ajustada (con las recompras desde el balance) es de 529 M, 1,3 veces el EBITDA. El crecimiento se ha frenado: +3,9 % en FY2026 frente al +14 % de FY2024 [A2].

**Equipo y gobierno.** Suman, con matices. Consejo independiente que cumple el Código británico, remuneración aprobada con el 98,8 % y los ocho consejeros compraron acciones en mayo y junio a 4,43-4,90 GBP [C1, C2, C8-C11]. Pero la dirección gestionó mal el lanzamiento de Deal Builder, incumplió la guía de FY2026 y no ha cubierto la salida de la directora de operaciones [C5, C27].

**Valoración.** El DCF da 6,92 GBP (+41,6 %). El DCF inverso dice que el precio supone ingresos a la baja (−0,7 % anual hasta FY2034e) o un margen EBITDA del 49,5 %, frente al +4,1 % y el 67 % de nuestro caso base, que coincide con el consenso [D10]. Cotiza a 10,3 veces el EBITDA, en el percentil 11 de su década (media de 17,1 veces), y con descuento sobre clasificados con menos margen: los comparables dan 5,80 GBP. Con la prima de riesgo que hoy pide el mercado (4,20 %), el valor objetivo sube a 7,69 GBP (+57,4 %). Discrepamos del mercado en la probabilidad de que la IA rompa el foso: hoy menos del 1 % del tráfico llega de asistentes de IA [B1].

**Riesgos y catalizadores.** El mayor riesgo es la desintermediación por la IA o por Amazon Autos (el bajista: 3,69 GBP, −24,5 %), y el segundo, una salida lenta de concesionarios por Deal Builder: cada punto menos de crecimiento anual quita unos 0,47 GBP. La posición corta del 6,77 % dice que una parte del mercado apuesta por eso [D7]; los foros, en cambio, la ven sobrevendida. Catalizadores: resultados del 1S27 el 5-nov-2026, el evento de precios de abril de 2027 y recompras de c. 500 M en FY2027 (≈13 % del capital a este precio) [D5, A2].

**Qué cambiaría la decisión.** Seguiría siendo Comprar por debajo de 6,61 GBP y pasaría a Vender por encima de 7,81 GBP. Bajaríamos a Mantener si los forecourts del 1S27 caen más de un 2 % interanual, si la dirección rebaja la guía de FY2027 o si las visitas mensuales caen dos semestres seguidos.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Auto Trader es el mercado de coches de segunda mano del Reino Unido: más del 75 % de los minutos en portales de coches y 11 veces la audiencia del segundo [B1]. Ese dominio le da poder de precios: el ARPR casi se ha duplicado en nueve años, hasta 2.995 GBP al mes, con un margen EBITDA del 66 %, un ROIC del 50,9 % y una conversión de beneficio en caja del 103 % [A2, A11].

El precio de 4,887 GBP, un 41 % por debajo del máximo de 52 semanas, descuenta que eso se acaba: con nuestros márgenes, que los ingresos caigan un 0,7 % al año hasta FY2034e; con nuestro crecimiento, que el margen baje al 49,5 %. Cotiza a 10,3 veces el EBITDA, en el percentil 11 de su década y por debajo de clasificados con menos margen [D10-D19]. La posición corta del 6,77 % es una apuesta explícita contra el foso [D7].

El mercado acierta en que el crecimiento se ha frenado (+3,9 % en FY2026) y en que el lanzamiento de Deal Builder dañó la relación con los concesionarios (−1,7 % de forecourts en el 2S26) [A2]. Se equivoca al tratar ese frenazo como el principio del fin: la guía de FY2027 sigue dando un beneficio operativo de 395-415 M, la dirección compra acciones y la recompra retira un 13 % del capital al año a este precio. Para invertir hay que creer que el portal seguirá siendo el sitio donde se busca un coche usado en el Reino Unido durante los próximos cinco años.`,
  vision_diferencial: {
    mercado_descuenta: `Que la IA (asistentes de compra, agentes) y Amazon Autos van a quitarle a Auto Trader la búsqueda del coche, y que el rechazo a Deal Builder demuestra que ha agotado su poder de precios: ingresos a la baja y un múltiplo de portal en declive, como Cars.com o Hemnet.`,
    nuestra_vision: `El crecimiento será menor que en la década pasada (+4 % frente al 8 %), pero el foso sigue intacto: la audiencia es 11 veces la del segundo, el 67 % de sus usuarios no visita otros portales y menos del 1 % del tráfico llega de la IA [A2, B1]. El conflicto de Deal Builder costó un 1,7 % de forecourts, no una huida.`,
    por_que: `Porque los datos que el mercado teme todavía no aparecen: visitas de 83,3 millones al mes en el 1S26, el ARPR sigue subiendo (+5 % en FY2026) y la guía de FY2027 se mantiene [A2, A12]. Si la IA desintermediara el portal, se vería primero en las visitas y en los minutos, que publica cada semestre: es una tesis que se puede comprobar cada seis meses.`,
  },
  a_favor: [
    '**Dominio del mercado**: más del 75 % de los minutos en portales de coches, 11 veces el segundo [B1].',
    '**Poder de precios**: ARPR de 1.546 a 2.995 GBP al mes en nueve años [A2, A11].',
    '**Caja y rentabilidad**: margen EBITDA del 66 %, ROIC del 50,9 % y conversión en caja del 103 %.',
    '**Precio de crisis**: 10,3 veces el EBITDA, en el percentil 11 de su década; el DCF inverso pide −0,7 % de crecimiento anual.',
    '**Recompras y compras de consejeros**: c. 500 M de recompras en FY2027 y los ocho consejeros compraron en mayo-junio [A2, C8-C11].',
  ],
  en_contra: [
    '**Guía incumplida**: ingresos de concesionarios +4 % en FY2026 frente al 5-7 % prometido, y abril de 2026 plano [A2].',
    '**Concesionarios molestos**: −236 forecourts (−1,7 %) en el 2S26 por el lanzamiento de Deal Builder [A2, B11].',
    '**Riesgo de la IA y de Amazon Autos**: el propio informe anual lo reconoce como riesgo principal [B1].',
    '**Posición corta del 6,77 %**, de las más altas del FTSE 100 [D7].',
    '**Crecimiento maduro**: el mercado de usados creció un 0,9 % anual en 2021-2025 [B3].',
  ],
  que_vigilar: `La tesis depende de que los forecourts se estabilicen y el ARPR siga subiendo por encima de la inflación. La señal de que no ocurre sería un 1S27 (5-nov-2026) con forecourts por debajo de −2 % interanual, o una caída de las visitas mensuales desde los 83,3 millones del 1S26: sería el primer dato que confirma lo que el precio ya descuenta.`,
  cambiaria_recomendacion: [
    'Si el precio supera 7,81 GBP, pasaríamos a Vender.',
    'Si los forecourts del 1S27 caen más de un 2 % interanual, bajaríamos a Mantener.',
    'Si la dirección rebaja la guía de beneficio operativo de FY2027 (395-415 M), bajaríamos a Mantener.',
    'Si las visitas mensuales caen dos semestres seguidos, revisaríamos el caso base hacia el bajista.',
    'Si el 1S27 confirma la guía con forecourts estables, subiríamos la convicción a alta.',
  ],
  kpis_seguimiento: [
    { kpi: 'Forecourts medios', nivel_actual: '13.942 (FY2026); −1,7 % en el 2S26', umbral_alerta: '< −2 % interanual en el 1S27', por_que: 'Mide si el rechazo a Deal Builder se convierte en salida de clientes.' },
    { kpi: 'ARPR', nivel_actual: '2.995 GBP/mes (FY2026, +5 %)', umbral_alerta: 'Crecimiento < 3 % en el 1S27', por_que: 'Es el poder de precios que el precio da por perdido.' },
    { kpi: 'Visitas mensuales', nivel_actual: '83,3 millones (1S26)', umbral_alerta: 'Dos semestres seguidos a la baja', por_que: 'Primera señal de desintermediación por la IA.' },
    { kpi: 'Beneficio operativo del grupo', nivel_actual: 'Guía FY2027: 395-415 M', umbral_alerta: 'Rebaja de la guía', por_que: 'La guía de FY2026 se incumplió.' },
    { kpi: 'Posición corta agregada', nivel_actual: '6,77 % (7-oct-2026)', umbral_alerta: '> 8 %', por_que: 'Mide la apuesta del mercado contra el foso.' },
  ],
  confianza: 'Media',
};
