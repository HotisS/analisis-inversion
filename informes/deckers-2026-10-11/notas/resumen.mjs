// Resumen ejecutivo (Deckers, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción alta. El valor objetivo es de 108,87 USD, un 31,3 % por encima del precio de 82,89 USD; sin dividendo, esa es la rentabilidad total esperada a 12 meses. La asimetría es de 2,86 veces (+53,0 % en el alcista frente a −18,5 % en el bajista) y las dos reglas dan Comprar; con la prima de riesgo que hoy pide el mercado, el objetivo sube a 124,61 USD (+50,3 %). La razón: el precio descuenta ventas planas para siempre, y la guía de este año da un 7-8 %. La convicción es la que sugieren los criterios: el bajista pierde menos de un 25 % y el precio pide 5,6 puntos menos de crecimiento que nuestro caso base. Bajaría a media si HOKA crece menos de un 5 % en el 2T27 (resultados hacia el 22 de octubre).

**El negocio.** Dos marcas premium con un 97 % de las ventas: UGG (2.739 M, margen de segmento del 38,2 %) y HOKA (2.587 M, 35,2 %) [A1]. El margen bruto (57,7 %) supera en 15 puntos al de Nike, el operativo es del 23,1 % y el ROIC del 160,3 %, porque Deckers no fabrica ni tiene deuda [A1, B6]. Su calidad sí sostiene el crecimiento que proyectamos: el 5,5 % anual no pide capital y es menos de la mitad del 13,2 % de FY2017-FY2026, logrado sin compras y con precios al alza. El riesgo es la moda: HOKA ha pasado del +15,9 % al +7,7 % en el 1T27, con On y Asics al 20-30 % [D2, B8, B13].

**Finanzas.** Caja neta de 1.570 M (11,5 USD por acción), flujo libre de 1.097 M en FY2026 (9,9 % de la capitalización) y recompras de 1.080 M ese año; las acciones han bajado un 15,3 % desde FY2020 [A1]. Cuentas limpias (Beneish M de −2,64). Unos 120 M de aranceles IEEPA pagados, cuya devolución se reclama, no están en la guía ni en nuestro valor [A2].

**Equipo y gobierno.** No resta: 9 consejeros independientes de 10, una acción un voto, sin accionista de control y la guía anual batida en FY2022-FY2026 [C1, C16-C22]. La sombra: recompras de FY2025-FY2026 a 149 y 102 USD, por encima del precio actual [A1].

**Valoración.** El DCF da 109,57 USD (+32,2 %). El DCF inverso dice que el precio supone unas ventas planas (−0,1 % anual) hasta FY2034e, frente al 5,5 % de nuestro caso base y al 5,2 % previsto para el mercado, o un margen EBITDA del 17,4 % en vez del 23,0 %: comprar hoy rinde un 14,2 % anual con nuestro caso base, frente a un WACC del 11,1 %. Cotiza a 6,9 veces el EBITDA de los próximos 12 meses y 10,4 veces el beneficio (medianas de los comparables: 8,6 y 16,1), en mínimos de diez años. Nuestras cifras coinciden con el consenso (+0 % en ventas de FY2027e, −1 % en FY2029e) y con su precio objetivo medio (120,41 USD) [D5]: no discrepamos de los analistas, sino del precio.

**Riesgos y catalizadores.** El mayor riesgo es que HOKA pierda el favor del corredor y UGG gire su ciclo a la vez: bajista de 67,53 USD. Cada punto de margen que quiten los aranceles resta unos 5 USD por acción. Los foros, divididos, comparten el miedo a HOKA [E1, E4]. Catalizadores: resultados del 2T27 hacia el 22 de octubre, la Navidad de UGG (finales de enero) y la guía de FY2028 en mayo de 2027.

**Qué cambiaría la decisión.** Comprar por debajo de 103,64 USD y vender por encima de 126,72. Pasaríamos a Mantener si HOKA crece menos de un 5 % dos trimestres seguidos o si la guía de FY2028 baja de un dígito alto, y si el margen operativo de FY2027 cae por debajo del 20 %.`;

const tesis = `Deckers es dueña de dos marcas de calzado premium, UGG y HOKA, que venden 5.472 M USD con un margen bruto del 57,7 % y uno operativo del 23,1 %, muy por encima de Nike y adidas (8,3 %) [A1, B6, B11]. No fabrica, no tiene deuda y convierte en caja más del 100 % del beneficio: en diez años ha generado 5.173 M de flujo libre y ha recomprado el 15 % de sus acciones sin hacer una sola compra [A1, A13]. HOKA pasó de 223 M a 2.587 M de ventas en siete años [A1].

El precio, 82,89 USD, descuenta que todo eso se acabó. A 6,9 veces el EBITDA de los próximos 12 meses y 10,4 veces el beneficio, en mínimos de diez años, el DCF inverso pide unas ventas planas hasta FY2034e o un margen EBITDA del 17,4 %, el de antes de HOKA. La caída del 49 % en 2025 y del 20 % en 2026 responde al frenazo de HOKA (+7,7 % en el 1T27), a los aranceles y a un EE. UU. que no crece [D10, D2].

El mercado acierta en que HOKA ya no crecerá al 20-30 %, y se equivoca al suponer que no crecerá nada: la guía da un 7-8 % este año, el exterior crece al 27 % y la empresa ha batido su guía cinco años seguidos [A1, C16-C22]. Para invertir hay que creer que las dos marcas mantienen su precio y crecen como su mercado, en torno al 5 %. Con eso, la acción rinde un 14,2 % anual y la caja neta (11,5 USD por acción) limita la pérdida.`;

export const resumen = {
  recomendacion: 'Comprar', conviccion: 'Alta', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis, tesis,
  vision_diferencial: {
    mercado_descuenta: `Unas ventas planas desde FY2027e hasta FY2034e con nuestro margen, o un margen EBITDA del 17,4 % con nuestro crecimiento: Deckers como una marca de moda en declive, valorada a 6,9 veces el EBITDA de los próximos 12 meses, al nivel de Crocs y por debajo de su mínimo de diez años (8,6 veces).`,
    nuestra_vision: `Un crecimiento del 5,5 % anual que baja del 7,5 % de FY2027e (la guía) al 3,5 % de FY2034e, con un margen EBITDA del 23 %, en línea con el consenso y por debajo del marco de la empresa. Es una Deckers más lenta que la de FY2021-FY2025, pero no una que deje de crecer.`,
    por_que: `HOKA se ha frenado, pero sigue creciendo un 7,7 % con la venta directa al 13 % y el exterior al 27 % [D2, A1]. El poder de precios está probado: el margen bruto solo cedió 20 puntos básicos con los aranceles [A1]. Y la empresa ha batido su guía anual en FY2022-FY2026 [C16-C22]. El precio confunde una desaceleración con un final.`,
  },
  a_favor: [
    '**El precio descuenta ventas planas**: el DCF inverso pide un −0,1 % anual hasta FY2034e, frente al 7-8 % de la guía de FY2027.',
    '**Márgenes de marca premium**: margen bruto del 57,7 % y operativo del 23,1 %, frente al 8,3 % de Nike y adidas [A1, B6, B11].',
    '**Caja neta y recompras**: 1.570 M de caja neta (11,5 USD por acción) y un 9,9 % de flujo libre sobre la capitalización, con 4.711 M de autorización de recompra [A1, A2].',
    '**Mínimos de valoración**: 6,9 veces el EBITDA NTM y 10,4 veces el beneficio, frente a 8,6 y 16,1 veces de los comparables.',
    '**Dirección fiable**: ha batido su guía anual en FY2022-FY2026 y subió el BPA de FY2027 en julio [C16-C23].',
    '**Opción gratis**: unos 120 M de aranceles IEEPA por cobrar que no están en la guía ni en el valor [A2].',
  ],
  en_contra: [
    '**HOKA se frena**: del +15,9 % en FY2026 al +7,7 % en el 1T27, mientras On crece un 30 % y Asics un 19,5 % [A1, D2, B8, B13].',
    '**EE. UU. no crece**: +0,2 % en FY2026, con el 58,3 % de las ventas [A1].',
    '**Riesgo de moda en UGG**: en FY2017 el margen EBITDA del grupo sin deterioros fue del 9,4 % [A12, A13].',
    '**Aranceles**: la guía de FY2027 supone un 12,5 % y un margen operativo del 21,5 %, 1,6 puntos menos que en FY2026 [D2].',
    '**Recompras caras**: 1.075 M a 102,43 USD en FY2026, un 24 % por encima del precio actual [A1].',
    '**Posición corta del 8,7 % del flotante** antes de los resultados del 2T27 [D9].',
  ],
  que_vigilar: `La tesis depende de que HOKA siga creciendo a un dígito alto, sobre todo fuera de EE. UU., y de que el margen operativo se mantenga por encima del 21 % con los aranceles. La señal de que no se cumple: dos trimestres seguidos con HOKA por debajo del +5 %, o un aumento de las promociones que lleve el margen bruto por debajo del 55 %. Los resultados del 2T27 (hacia el 22 de octubre) y la Navidad de UGG son las dos pruebas de los próximos cuatro meses.`,
  cambiaria_recomendacion: [
    'Si HOKA crece menos de un 5 % en dos trimestres seguidos, pasaríamos a Mantener.',
    'Si el margen operativo de FY2027 queda por debajo del 20 % (guía: algo más del 21,5 %), revisaríamos el margen del DCF y pasaríamos a Mantener.',
    'Si la guía de FY2028 (mayo de 2027) baja de un crecimiento de un dígito alto, reduciríamos el caso base.',
    'Si la acción supera los 126,72 USD sin cambio en las previsiones, pasaríamos a Vender o reducir.',
    'Si la empresa usa deuda para recomprar por encima del valor objetivo, bajaríamos la convicción.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento de HOKA', nivel_actual: '+7,7 % (1T27); +15,9 % (FY2026)', umbral_alerta: '< +5 % dos trimestres', por_que: 'Es el motor del crecimiento y el centro de la tesis [D2, A1].' },
    { kpi: 'Margen operativo del ejercicio', nivel_actual: '23,1 % (FY2026); guía FY2027 algo más del 21,5 %', umbral_alerta: '< 20 %', por_que: 'Un punto de margen EBITDA vale unos 5 USD por acción.' },
    { kpi: 'Ventas de UGG en el 3T (Navidad)', nivel_actual: 'UGG +8,2 % en FY2026', umbral_alerta: 'Caída interanual', por_que: 'Primer síntoma de un ciclo de moda [A1].' },
    { kpi: 'Ventas internacionales', nivel_actual: '+26,8 % (FY2026), 41,7 % de las ventas', umbral_alerta: '< +10 %', por_que: 'Compensan un EE. UU. plano [A1].' },
    { kpi: 'Margen bruto', nivel_actual: '57,7 % (FY2026)', umbral_alerta: '< 55 %', por_que: 'Mide el poder de precios frente a los aranceles y las promociones [A1].' },
  ],
  confianza: 'Media',
};
