// Resumen ejecutivo (Equifax, corte 2026-10-28). Se escribe el último; cifras del motor tal cual.
export const resumen = {
  recomendacion: 'Vender',
  conviccion: 'Baja',
  justificacion_recomendacion: `La regla a 12 meses da Mantener: la rentabilidad ponderada es del 31,0 % (base 25,3 %), pero el valor intrínseco (160,03 USD) queda por debajo del precio (175,71). Nos apartamos hacia Vender por dos razones que la regla no recoge. Primera, la calidad: el ROIC del grupo (9,3 %) está por debajo del WACC (10,21 %), −0,9 puntos, y el método exige al menos 4,5 puntos para mantener una posición; no es una diferencia de redondeo, el ROIC lleva cuatro años por debajo del 10 % y Círculo de Crédito se paga a 12,1 veces el EBITDA. Segunda, el valor: el DCF (148,48) queda un 15,5 % por debajo del precio y, con nuestro coste de capital, los escenarios pierden más de lo que ganan (asimetría de 0,14). La rentabilidad a 12 meses sale alta porque la regla v3 decide por muy poco (la mediana histórica está a 1,79 veces el PER actual, con el umbral en 1,8) y sube el múltiplo; con la v2 de control es del 18,7 %.`,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Vender, con convicción baja. La regla a 12 meses da Mantener: objetivo ponderado de 227,92 USD (+31,0 % con el dividendo; base +25,3 %) frente a 175,71 USD, pero el valor intrínseco es de 160,03 USD (−8,9 %), y el objetivo medio de los analistas, 200,35 USD [D8]. Vendemos porque Equifax no pasa la calidad que el método pide para mantener: ROIC del 9,3 % frente a un WACC del 10,21 %, −0,9 puntos frente a un mínimo de 4,5. La convicción es baja porque las reglas discrepan (con la prima del mercado el valor sube a 188,65 USD) y la rentabilidad a 12 meses es alta; subiría con una orden de la FHFA con precio regulado y bajaría si el ROIC menos el WACC se acercara a 4,5 puntos.

**El negocio.** El valor está en Workforce Solutions: The Work Number tiene 223 millones de registros activos (+12 %) y un margen EBITDA ajustado del 51,4 % en el 3T26 [A29, A28]. La debilidad es el capital: el ROIC cae del 14,3 % de 2020 al 9,3 % de 2025 por compras caras; sin fondo de comercio sería del 29,5 %. **Sostenibilidad del crecimiento: en parte**: es un negocio de activos ligeros cuyo crecimiento depende en buena parte del precio, y el precio está bajo el regulador hipotecario, una demanda antimonopolio y la verificación con permiso del consumidor [B4, B45, B24].

**Sector y ciclo.** La hipoteca sigue en contracción: originaciones del −6,5 % al −7,5 % en 2026 y, según el director financiero, «un dígito alto» menos en 2027 [A35]. La FHFA prepara el informe doble (unos 80 M de ingresos y 38 M de margen según la empresa) y su director promete más medidas esta semana [B37, A29, P7].

**Finanzas.** El 3T26 fue bueno: ingresos +10 % y BPA ajustado de 2,26 USD frente a 2,20 de consenso [A28]. La guía de BPA ajustado de 2026 se mantiene en 8,45-8,55 USD gracias a los costes, pero el 4T26 queda plano y no hay guía de 2027 hasta febrero [A29, A35].

**Equipo y gobierno.** Resta poco: presidente independiente y un 90 % de consejeros independientes, pero el consejero delegado vendió 27,56 M USD en 12 meses, 6,91 M el 23-oct tras la subida, y su sucesión no está resuelta [C23, C38, C14].

**Valoración.** El DCF da 148,48 USD; los comparables, 193,05; la suma de partes, 184,01; los escenarios, 145,43. El DCF inverso dice que el precio descuenta un crecimiento del 7,6 % anual y un margen del 38,5 %, frente al 5,5 % y el 34,7 % de nuestro base: tras subir un 28 % desde el mínimo de septiembre, el precio paga una recuperación que la empresa no espera en 2027. El objetivo a 12 meses supera al valor intrínseco en un 42 % porque la regla sube el PER de 18,6 a 20,5 veces; con la v2 de control la ponderada es del 18,7 %.

**Riesgos y catalizadores.** El informe doble (−3 % del valor, estimación propia), la presión de precios sobre la verificación (hacia el bajista, −44,0 %) y medio punto más de WACC (−8,5 %). Fechas: medida de la FHFA anunciada para esta semana [P7], cierre de Círculo de Crédito en el 4T26, Medicaid desde el 1-ene-2027 [B18] y resultados anuales a primeros de febrero.

**Qué cambiaría la decisión.** La venta sale de la calidad, no del precio: la señal de cartera es Vender a cualquier precio mientras el ROIC menos el WACC siga por debajo de 4,5 puntos. Sin la calidad, el filtro numérico de mantener aguanta hasta 188,27 USD; la banda de venta de la regla a 12 meses (ponderada ≤ −10 %) empieza en 255,66 USD. Los números darían Comprar por debajo de 160,03 USD, con la calidad aún en contra.`,
  tesis: `Equifax es dos negocios. Workforce Solutions verifica empleo e ingresos con 223 millones de registros activos que aportan los propios empleadores; gana un 51,4 % de margen EBITDA ajustado y crece con la verificación pública y Talent Solutions [A28, A29]. El resto, la agencia de crédito de EE. UU. y la internacional, vive del ciclo hipotecario y del crédito al consumo, con la reventa de FICO sin margen inflando el crecimiento [A29].

A 175,71 USD el precio descuenta un crecimiento del 7,6 % anual y un margen del 38,5 % en 2027-2035, por encima de nuestro caso base sin recuperación hipotecaria. Cotiza a 11,3 veces el EBITDA de los próximos 12 meses y a 18,6 veces nuestro BPA ajustado de 2027e, por encima de TransUnion y FICO y lejos de su PER de 2021-2025 [D3, D45].

El mercado tiene razón en que el modelo de tres agencias en hipotecas se acaba y en que el capital de Equifax rinde por debajo de su coste: el ROIC del 9,3 % no cubre el WACC del 10,21 % [B37, A1]. Para invertir hay que creer que Workforce Solutions mantiene precio y margen frente a los agregadores y a los reguladores, y que el múltiplo vuelve a subir. Con la calidad del método, esa apuesta no se sostiene en cartera.`,
  vision_diferencial: {
    mercado_descuenta: 'Un Equifax que crece un 7,6 % anual con un margen que sube al 38,5 %: el marco orgánico de la dirección o una recuperación hipotecaria, sin castigo por el informe doble. La acción sube un 20,5 % en un mes, su mejor mes registrado, tras el peor.',
    nuestra_vision: 'Sin recuperación hipotecaria, el negocio sin FICO crece un 6-7 % y el margen sube medio punto al año: el DCF da 148,48 USD. El BPA ajustado sí crece (10,63 USD en 2028e), pero el capital invertido no rinde su coste.',
    por_que: 'La dirección espera menos originaciones en 2027 y no da guía [A35]; el consenso de BPA de 2027 baja mientras el precio sube [D8]; el ROIC lleva cuatro años por debajo del 10 %; y la decisión de la FHFA está pendiente [B37, P7].',
  },
  a_favor: [
    '**Foso en verificación**: 223 millones de registros activos y margen EBITDA del 51,4 % en Workforce Solutions [A29, A28].',
    '**Buen trimestre**: ingresos +10 % y BPA ajustado de 2,26 USD frente a 2,20 de consenso [A28].',
    '**Costes**: el margen sin FICO sube 100 pb en 2026 con la IA, y la guía de BPA se mantiene pese a la hipoteca [A29].',
    '**Contratos públicos**: más de 550 M de valor anual firmados, con efecto sobre todo en 2027 [A35].',
    '**Regla a 12 meses**: ponderada del 31,0 % y base del 25,3 % con la v3 (18,7 % con la v2).',
  ],
  en_contra: [
    '**Calidad**: ROIC del 9,3 % frente a un WACC del 10,21 % (−0,9 puntos; el método pide 4,5 para mantener).',
    '**Valor intrínseco por debajo del precio**: 160,03 USD (−8,9 %); el DCF, 148,48 (−15,5 %).',
    '**El precio pide más que nuestro base**: 7,6 % de crecimiento anual frente al 5,5 %.',
    '**Hipoteca en contracción**: originaciones «un dígito alto» más bajas en 2027 y sin guía hasta febrero [A35].',
    '**Regulador**: la FHFA prepara el informe doble y promete más medidas esta semana [B37, P7].',
  ],
  que_vigilar: 'La tesis depende de que el precio y el margen de Workforce Solutions aguanten y de que el ROIC deje de caer. Un margen EBITDA ajustado de la división por debajo del 50 % (51,4 % en el 3T26) en dos trimestres, contratos públicos perdidos frente a agregadores o una orden de la FHFA con precio regulado dirían que el foso se estrecha.',
  cambiaria_recomendacion: [
    'Si el ROIC menos el WACC vuelve a 4,5 puntos o más (hoy −0,9), pasaríamos a Mantener; el filtro numérico de mantener aguanta hasta 188,27 USD.',
    'Si Hotis mantiene su decisión de conservarla, la regla a 12 meses da Mantener; la banda de venta de la regla (ponderada ≤ −10 %) empieza en 255,66 USD.',
    'Por debajo de 160,03 USD (valor intrínseco) los números darían Comprar; seguiría fallando la calidad.',
    'Si la FHFA descarta el informe doble y las consultas hipotecarias vuelven a crecer, revisaríamos el caso base al alza.',
  ],
  kpis_seguimiento: [
    { kpi: 'ROIC menos WACC', nivel_actual: '−0,9 puntos (2025)', umbral_alerta: '≥ 4,5 para volver a mantener', por_que: 'Requisito de calidad del método.' },
    { kpi: 'Margen EBITDA ajustado de Workforce Solutions', nivel_actual: '51,4 % (3T26) [A28]', umbral_alerta: '< 50 %', por_que: 'Es el negocio que sostiene el valor.' },
    { kpi: 'Margen EBITDA ajustado sin FICO', nivel_actual: '33,8-34,1 % (guía 2026) [A29]', umbral_alerta: '< 34 % en la guía de 2027', por_que: 'El caso base sube medio punto al año.' },
    { kpi: 'Medida de la FHFA sobre informes y puntuaciones', nivel_actual: 'Pendiente; anunciada para la semana del 26-oct [P7]', umbral_alerta: 'Informe doble o único con fecha', por_que: 'Es el bajista.' },
    { kpi: 'Deuda neta ajustada / EBITDA', nivel_actual: '2,5 veces', umbral_alerta: '> 3,0 veces tras Círculo', por_que: 'Rating BBB y recompras [D13].' },
  ],
  confianza: 'Media',
};
