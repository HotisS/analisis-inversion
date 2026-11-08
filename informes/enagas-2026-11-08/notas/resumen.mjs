// Resumen ejecutivo de Enagás (corte 2026-11-08), escrito el último, con las cifras de calc tal cual.
export const resumen = {
  recomendacion: 'Vender',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: [
    '**La recomendación y por qué.** Vender, con convicción baja: para quien no la tiene, no comprar. Tras subir un 9,6 % en un mes, a 17,80 EUR, nuestro objetivo a 12 meses es de 14,64 EUR (base 16,05): una rentabilidad ponderada del −12,1 % con el dividendo y del −4,2 % en el caso base. El valor intrínseco es de 14,24 EUR (−20,0 %) y el objetivo medio de los analistas, de 17,17 EUR [D31], por encima de nuestro rango. La asimetría es muy desfavorable (alcista +5,3 %, bajista −48,4 %). La razón: el precio paga 15,6 veces nuestro beneficio de 2027e por una red que no crece, frente a una mediana histórica de 11,9x. La convicción es baja porque la rentabilidad que decide (−11,2 % con la prima del mercado) está a 1,2 puntos del umbral de venta; bajaría a Mantener con el precio por debajo de 17,38 EUR.',
    '**Qué cambia frente al 7-oct.** Entonces era Mantener (−7,7 %) a 16,22 EUR. Los 9M26 cumplieron la guía sin sorpresas [A17] y nuestro beneficio de 2028e casi no se mueve (1,13 frente a 1,14 EUR): el cambio de señal lo explica el precio.',
    '**El negocio.** Enagás es un monopolio legal: el 85,5 % de la retribución del transporte de gas en España y el 53,9 % de la regasificación [B6, B7]. Esa posición no se traduce en rentabilidad: el ROIC sin participadas fue del 4,1 % en 2025, frente a un WACC del 5,36 %. ¿Sostiene su calidad el crecimiento proyectado? Sí, porque es casi nulo, sale de la tarifa ya fijada por la CNMC y no pide capital.',
    '**Regulación.** El marco de 2027-2032 está en el BOE: la tasa de retribución financiera sube del 5,44 % al 6,46 % desde el 1-oct-2026 [P1] y la retribución del sector pasa de 883 M a 961 M en 2027, para bajar a 940 M en 2032 [B7]. El consenso ya lo incorpora: espera un EBITDA de 723,5 M en 2027e (+16 %) [D30], y nuestro EBITDA sin participadas queda solo un 1,9 % por debajo.',
    '**Finanzas.** En 9M26 el EBITDA sin participadas cae de 388,2 a 345,7 M, mientras las participadas suben a 145,8 M con TAP y Teréga [A17]. La deuda neta llega a 2.979 M (2.475 M en dic-25) y el FFO / deuda neta baja al 20,5 % [A17]. Rating BBB+ estable [A6].',
    '**Gobierno.** La ley limita a cualquier accionista al 5 % del capital y al 3 % del voto: no hay prima de control posible [C1].',
    '**Valoración.** El DCF da 13,30 EUR (WACC del 5,36 %) y 14,05 con la prima del mercado (4,41 %) [D34]; los comparables, 16,01-17,39 EUR (PER de 15,9x frente a una mediana de 14,3x). El precio descuenta una rentabilidad del 4,2 % anual, por debajo del WACC que reconoce la CNMC (4,85 %) [P1]; con nuestro WACC exigiría crecer un 2,7 % anual frente al −0,6 % de nuestro caso. La diferencia con el mercado es la tasa de descuento y el múltiplo, no las cifras.',
    '**Riesgos y catalizadores.** El riesgo para esta tesis es que los tipos sigan bajando: −0,5 pp de WACC suman 1,57 EUR por acción. A la baja, el dividendo más allá de 2026 sin compromiso y el plan de hidrógeno del 1S27. Catalizadores: cierre de Saggas (4T26), resultados de 2026 (≈ 16-feb-2027) y laudo de GSP (1S27).',
    '**Qué cambiaría la decisión.** Compraríamos por debajo de 13,60 EUR solo si mejorara la calidad: hoy el ROIC está 1,3 puntos por debajo del WACC y no pasa el filtro de compra en ningún nivel. Por debajo de 17,38 EUR sería Mantener. Para quien la tiene, el filtro de mantener solo aguanta hasta 14,22 EUR. Revisaríamos al alza si el Bund baja del 2,8 % o si Enagás compromete un dividendo de 1,00 EUR para 2027-2030 cubierto por el FFO.',
  ].join('\n\n'),
  tesis: [
    'Enagás es el transportista de gas de España, con ≈ 73,5 % de la retribución del transporte y la regasificación del sector [B6, B7] y participadas que aportaron 145,8 M en 9M26 [A17]. Su negocio está regulado hasta 2032 con una tasa de retribución del 6,46 % [P1] y un EBITDA sin participadas de ≈ 500 M al año.',
    'El precio de 17,80 EUR descuenta una rentabilidad del 4,2 % anual, por debajo del WACC que reconoce la propia CNMC (4,85 %) [P1]. Por múltiplos, cotiza a 15,6 veces nuestro beneficio de 2027e, frente a 11,9x de mediana en 2020-2025 y 14,3x de redes europeas que hacen crecer su RAB un 5-8 % al año, mientras la suya se reduce hasta 2030 [A9].',
    'El mercado acierta en que el marco 2027-2032 da visibilidad y en que el dividendo de 1,00 EUR es seguro en 2026 [A18]. Se equivoca, a nuestro juicio, al pagar por ese dividendo como si fuera un bono sin riesgo: desde 2027 depende del 40 % del FFO y del hidrógeno [A9], y la deuda ya sube con Teréga. Para invertir a este precio hay que creer que los tipos seguirán bajando o que el hidrógeno tendrá una retribución por encima del coste de capital.',
  ].join('\n\n'),
  vision_diferencial: {
    mercado_descuenta: 'Una rentabilidad del 4,2 % anual: que Enagás es un sustituto de la deuda pública con un 5,6 % de cupón, y que el marco 2027-2032 sube el beneficio (EBITDA del consenso +16 % en 2027e) [D30].',
    nuestra_vision: 'La mejora regulatoria ya está en el consenso y en nuestras cifras (EBITDA 2027e un 1,9 % por debajo del consenso). Una red de gas cuya RAB baja necesita al menos el 5,4 % de rentabilidad, y eso da 13,30 EUR por DCF y un objetivo a 12 meses de 14,64 EUR.',
    por_que: 'La acción sube un 40,1 % en 2026 con dividendos [D29] y su PER ya supera el máximo de la serie: el precio ha recogido la mejora regulatoria y la bajada de los tipos alemanes [D32]. El dividendo de 2027 en adelante no está comprometido.',
  },
  a_favor: [
    '**Marco regulatorio cerrado hasta 2032**: TRF del 6,46 %, frente al 5,44 % anterior, ya en el BOE [P1].',
    '**Participadas que crecen**: 145,8 M en 9M26 (+23,9 %) con TAP y Teréga [A17].',
    '**Deuda barata**: coste del 2,1 % y más del 80 % a tipo fijo; BBB+ estable [A17, A6].',
    '**Guía de 2026 en camino**: EBITDA de 491,5 M y beneficio recurrente de 195,8 M en 9M26 [A17].',
    '**Opciones no valoradas**: laudo de GSP (303 M USD), cobro de Castor (129 M) y el hidrógeno [A6].',
  ],
  en_contra: [
    '**El precio descuenta un 4,2 % de rentabilidad**, por debajo del WACC regulatorio del 4,85 % [P1].',
    '**PER de 15,6x el beneficio de 2027e**, frente a una mediana histórica de 11,9x.',
    '**ROIC del 4,1 % frente a un WACC del 5,36 %**: no cubre el coste de capital.',
    '**Más deuda**: 2.979 M a sep-26 y FFO / deuda neta del 20,5 % (27,4 % un año antes) [A17].',
    '**Dividendo sin compromiso desde 2027**: el 40 % del FFO daría ≈ 0,77 EUR por acción (estimación propia) [A9].',
    '**Hidrógeno con 3.125 M de inversión prevista** y sin marco retributivo [B14].',
  ],
  que_vigilar: 'La tesis depende de que el coste de oportunidad no siga bajando: el Bund a 10 años en torno al 3,2 % o por encima. La señal de que nos equivocamos sería un Bund por debajo del 2,8 % o un dividendo de 1,00 EUR comprometido para 2027-2030 en los resultados de febrero de 2027.',
  cambiaria_recomendacion: [
    'Precio: por debajo de 17,38 EUR, Mantener (la rentabilidad ponderada a 12 meses sube por encima del −10 %); por debajo de 13,60 EUR los números darían Comprar, pero la calidad (ROIC − WACC de −1,3 puntos) lo impide.',
    'Para quien la tiene, el filtro de mantener aguanta hasta 14,22 EUR (precio de venta de la regla de cartera); la calidad tampoco pasa el filtro de mantener.',
    'Si el Bund a 10 años baja del 2,8 % (3,22 % hoy) [D32], revisaríamos el WACC y la recomendación.',
    'Si Enagás compromete un dividendo de 1,00 EUR para 2027-2030 cubierto por el FFO en los resultados de febrero de 2027, subiríamos la convicción del caso base.',
    'Si el hidrógeno recibe un marco retributivo con una tasa por encima del 7 % antes de la decisión de inversión de finales de 2027, revisaríamos el alcista.',
  ],
  kpis_seguimiento: [
    { kpi: 'Bund a 10 años', nivel_actual: '3,22 % (6-nov-2026)', umbral_alerta: '< 2,8 %', por_que: 'Es la variable que separa nuestro valor del precio.' },
    { kpi: 'EBITDA de la empresa (con participadas)', nivel_actual: '491,5 M en 9M26; guía ≈ 620 M', umbral_alerta: '< 610 M en 2026', por_que: 'Cierre del último año del marco 2021-2026.' },
    { kpi: 'FFO / deuda neta', nivel_actual: '20,5 % (sep-26)', umbral_alerta: '< 18 %', por_que: 'Margen sobre el umbral del BBB+ (15 %) antes del hidrógeno.' },
    { kpi: 'Dividendo por acción de 2027', nivel_actual: '1,00 EUR (2024-2026)', umbral_alerta: '< 0,90 EUR', por_que: 'El precio se apoya en el 5,6 % de rentabilidad por dividendo.' },
    { kpi: 'PER sobre el beneficio del año siguiente', nivel_actual: '15,6x', umbral_alerta: '< 13,5x', por_que: 'Por debajo, la rentabilidad a 12 meses vuelve a la banda de Mantener.' },
  ],
  confianza: 'Media',
};

export const objetivo12m_textos = {
  diferencia_consenso: 'Nuestro BPA de 2028e (1,13 EUR) es un 0,9 % mayor que el del consenso (1,12) [D30]: la explotación coincide. La diferencia está en el precio: nuestro base a 12 meses es de 16,05 EUR, un 6,5 % por debajo del objetivo medio de los analistas (17,17 EUR) [D31], y el ponderado (14,64 EUR) incluye un bajista al PER mínimo de cinco años (9,3x). La regla común baja el PER de hoy (15,6x) hacia la mediana histórica (11,9x) con el tope de ÷1,1; los analistas mantienen el múltiplo actual.',
  comentario: 'El valor intrínseco (14,24 EUR) y el objetivo a 12 meses ponderado (14,64 EUR) están cerca y los dos por debajo del precio (17,80 EUR): no hay distancia que cerrar con un catalizador, la tesis es que el precio ha ido por delante de las cifras. El objetivo se mueve con el precio (elasticidad de 0,8): parte del −12,1 % es el tope de la regla, no un deterioro del beneficio.',
};
