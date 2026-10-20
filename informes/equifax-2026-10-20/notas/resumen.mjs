// Resumen ejecutivo (Equifax, corte 2026-10-20). Se escribe el último; cifras del motor tal cual.
export const resumen = {
  recomendacion: 'Vender',
  conviccion: 'Media',
  justificacion_recomendacion: `La regla a 12 meses da Comprar por poco (v2 elegida por el selector: ponderada 18,8 %, base 14,0 %, valor intrínseco 160,42 frente a 158,57 USD), pero nos apartamos por tres razones que la regla no recoge. Primera, la calidad: el ROIC del grupo (9,3 %) está por debajo del WACC (10,25 %), −0,9 puntos, y el método exige al menos 4,5 puntos para mantener una posición; no es una diferencia de redondeo, y el ROIC lleva cuatro años por debajo del 10 %. Segunda, el colchón: con un BPA un 10 % peor la rentabilidad ponderada cae al 7,1 %, por debajo del 10 % que pide mantener, y la guía de ingresos de 2026 acaba de bajar 80 M. Tercera, el valor: el DCF (147,31) queda por debajo del precio y, con nuestro coste de capital, los escenarios pierden más de lo que ganan (asimetría de 0,43). Solo con la prima que hoy pide el mercado sale un Comprar.`,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Vender, con convicción media. La regla a 12 meses da un Comprar justo: objetivo ponderado de 186,25 USD (+18,8 % con el dividendo; base +14,0 %) frente a 158,57 USD, con el valor intrínseco en 160,42 USD (+1,2 %) y el objetivo medio de los analistas en 194,00 USD, a la baja [D6]. Nos apartamos porque Equifax no pasa la calidad que el método pide para mantener (ROIC 9,3 % frente a un WACC del 10,25 %: −0,9 puntos, con un mínimo de 4,5) y porque el Comprar no aguanta un BPA un 10 % peor (7,1 %). La convicción es media (el motor sugiere baja porque sus dos reglas discrepan): la calidad no es una cifra al límite, pero con la prima que hoy pide el mercado el valor sube a 187,98 USD.

**El negocio.** El valor está en Workforce Solutions: The Work Number tiene 223 millones de registros activos (+12 %) y un margen EBITDA ajustado del 51,4 % en el 3T26 [A29, A28]. A 15 veces su EBITDA vale casi todo el valor empresa del grupo. La debilidad es el capital: el ROIC cae del 14,3 % de 2020 al 9,3 % de 2025 por compras caras; sin fondo de comercio sería del 29,5 %, y Círculo de Crédito se paga a 12,1 veces el EBITDA [D14]. **Sostenibilidad del crecimiento: en parte**: es un negocio de activos ligeros cuyo crecimiento depende en buena parte del precio, y el precio está bajo el regulador hipotecario, una demanda antimonopolio y la verificación con permiso del consumidor [B4, B45, B24].

**Sector y ciclo.** La hipoteca vuelve a contraerse: el tipo a 30 años pasó del 6,43 % en julio al 7,40 % en octubre [B35], las consultas duras cayeron un 9 % en el 3T26 y la empresa recorta la guía de ingresos de 2026 a 6.646-6.676 M [A29, A28]. La FHFA prepara el informe doble; la empresa lo cifra en unos 80 M de ingresos y 38 M de margen [B37, A29].

**Finanzas.** El 3T26 fue bueno: ingresos +10 % y BPA ajustado de 2,26 USD frente a 2,20 de consenso [A28]. La guía de BPA ajustado de 2026 se mantiene en 8,45-8,55 USD gracias a los costes, pero el 4T26 queda plano frente al 4T25 [A29]. El flujo operativo de nueve meses está plano y los pagos al accionista superan el flujo libre: la deuda neta ajustada es de 5.163 M y subirá con Círculo [A28].

**Equipo y gobierno.** Resta poco: presidente independiente y un 90 % de consejeros independientes, pero el consejero delegado vendió 32,06 M USD en acciones en 12 meses y su sucesión no está resuelta [C38, C14].

**Valoración.** El DCF da 147,31 USD; los comparables, 199,05; la suma de partes, 184,01; los escenarios, 144,29. El DCF inverso dice que el precio descuenta un crecimiento del 6,4 % anual y un margen del 36,3 %, más que el 5,5 % y el 34,7 % de nuestro base: tras la subida desde el mínimo de 137,01 USD, el precio ya no es de valle. El objetivo a 12 meses supera al valor intrínseco porque mantiene el PER de hoy (16,8 veces) sobre un BPA ajustado que crece un 11,6 % anual.

**Riesgos y catalizadores.** El informe doble (−3 % del valor, estimación propia), la presión de precios sobre la verificación (hacia el bajista, −38,4 %) y medio punto más de WACC (−8,5 %). Fechas: orden de la FHFA en las próximas semanas [B37], cierre de Círculo de Crédito en el 4T26, Medicaid desde el 1-ene-2027 [B18] y resultados anuales en febrero.

**Qué cambiaría la decisión.** Mantendríamos si el ROIC menos el WACC volviera a 4,5 puntos (hoy −0,9) o si Hotis decide una excepción de calidad como las de Fluidra y DSV. Pasaríamos a Comprar solo por debajo de 145,55 USD (límite robusto) y con la calidad resuelta.`,
  tesis: `Equifax es dos negocios. Workforce Solutions verifica empleo e ingresos con 223 millones de registros activos que aportan los propios empleadores; gana un 51,4 % de margen EBITDA ajustado y crece con la verificación pública y Talent Solutions [A28, A29]. El resto, la agencia de crédito de EE. UU. y la internacional, vive del ciclo hipotecario y del crédito al consumo, con la reventa de FICO sin margen inflando el crecimiento [A29].

A 158,57 USD el precio descuenta un crecimiento del 6,4 % anual y un margen del 36,3 % en 2027-2035, algo más que nuestro caso base sin recuperación hipotecaria. Cotiza a 10,4 veces el EBITDA de los próximos 12 meses y a 16,8 veces nuestro BPA ajustado de 2027e, la mitad de su PER de 2021-2025 [D3].

El mercado tiene razón en que el modelo de tres agencias en hipotecas se acaba y en que el capital de Equifax rinde por debajo de su coste: el ROIC del 9,3 % no cubre el WACC del 10,25 % [B37, A1]. Para invertir hay que creer que Workforce Solutions mantiene precio y margen frente a los agregadores y a los reguladores, y que el múltiplo deja de caer. Con la calidad del método, esa apuesta no se sostiene en cartera.`,
  vision_diferencial: {
    mercado_descuenta: 'Un Equifax que crece un 6,4 % anual con un margen que sube al 36,3 %: la recuperación del margen que promete la dirección, sin castigo adicional por el informe doble. Tras caer un 30,2 % en 12 meses, la acción rebota un 15,5 % desde el mínimo de septiembre.',
    nuestra_vision: 'Sin recuperación hipotecaria, el negocio sin FICO crece un 6-7 % y el margen sube medio punto al año: el DCF da 147,31 USD. El BPA ajustado sí crece (10,63 USD en 2028e), pero el capital invertido no rinde su coste.',
    por_que: 'La guía de ingresos de 2026 baja por la hipoteca [A28]; el ROIC lleva cuatro años por debajo del 10 %; y la decisión de la FHFA está pendiente [B37]. No vemos un catalizador que cierre la distancia entre ROIC y WACC en 12 meses.',
  },
  a_favor: [
    '**Foso en verificación**: 223 millones de registros activos y margen EBITDA del 51,4 % en Workforce Solutions [A29, A28].',
    '**Buen trimestre**: ingresos +10 % y BPA ajustado de 2,26 USD frente a 2,20 de consenso [A28].',
    '**Costes**: el margen sin FICO sube 100 pb en 2026 con la IA, y la guía de BPA se mantiene pese a la hipoteca [A29].',
    '**Múltiplo bajo**: 10,4 veces el EBITDA de los próximos 12 meses, cerca del mínimo de diez años.',
    '**Regla a 12 meses**: ponderada del 18,8 % y base del 14,0 % con la regla v2.',
  ],
  en_contra: [
    '**Calidad**: ROIC del 9,3 % frente a un WACC del 10,25 % (−0,9 puntos; el método pide 4,5 para mantener).',
    '**Colchón corto**: con un BPA un 10 % peor, la rentabilidad ponderada cae al 7,1 %.',
    '**Hipoteca en contracción**: tipo a 30 años del 7,40 % y guía de ingresos de 2026 recortada en 80 M [B35, A28].',
    '**Informe doble pendiente**: la FHFA prepara la orden; la empresa lo cifra en 80 M de ingresos [B37, A29].',
    '**DCF por debajo del precio**: 147,31 USD, con una asimetría de 0,43 con nuestro coste de capital.',
  ],
  que_vigilar: 'La tesis depende de que el precio y el margen de Workforce Solutions aguanten y de que el ROIC deje de caer. Un margen EBITDA ajustado de la división por debajo del 50 % (51,4 % en el 3T26) en dos trimestres, o contratos públicos perdidos frente a agregadores, dirían que el foso se estrecha.',
  cambiaria_recomendacion: [
    'Si el ROIC menos el WACC vuelve a 4,5 puntos o más (hoy −0,9), pasaríamos a Mantener.',
    'Si Hotis da a Equifax una excepción de calidad (como a Fluidra y DSV), se mantendría con la regla a 12 meses.',
    'Por debajo de 145,55 USD (límite robusto) los números darían Comprar; seguiría fallando la calidad.',
    'Si la FHFA descarta el informe doble y las consultas hipotecarias vuelven a crecer, revisaríamos el caso base al alza.',
  ],
  kpis_seguimiento: [
    { kpi: 'ROIC menos WACC', nivel_actual: '−0,9 puntos (2025)', umbral_alerta: '≥ 4,5 para volver a mantener', por_que: 'Requisito de calidad del método.' },
    { kpi: 'Margen EBITDA ajustado de Workforce Solutions', nivel_actual: '51,4 % (3T26) [A28]', umbral_alerta: '< 50 %', por_que: 'Es el negocio que sostiene el valor.' },
    { kpi: 'Margen EBITDA ajustado sin FICO', nivel_actual: '33,8-34,1 % (guía 2026) [A29]', umbral_alerta: '< 34 % en la guía de 2027', por_que: 'El caso base sube medio punto al año.' },
    { kpi: 'Consultas hipotecarias', nivel_actual: '−9 % interanual (3T26) [A29]', umbral_alerta: 'Negativas dos trimestres más', por_que: 'Sin volumen hipotecario no hay alcista.' },
    { kpi: 'Deuda neta ajustada / EBITDA', nivel_actual: '2,5 veces', umbral_alerta: '> 3,0 veces tras Círculo', por_que: 'Rating BBB y recompras [D13].' },
  ],
  confianza: 'Media',
};
