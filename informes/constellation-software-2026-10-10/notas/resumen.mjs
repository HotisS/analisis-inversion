// Resumen ejecutivo (Constellation Software, corte 2026-10-10). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. El valor objetivo es de 2.320,86 USD (3.312,20 CAD), un 10,3 % por encima del precio de 2.104,75 USD (3.003,78 CAD), y la rentabilidad total esperada a 12 meses es del 10,5 %. El alcista gana un 48,8 % y el bajista pierde un 42,0 %: asimetría de 1,16 veces. Las dos reglas discrepan: con nuestro coste de capital da Mantener (10,5 %, por debajo del 15 %) y con la prima de riesgo que hoy pide el mercado da Comprar (29,0 %). Manda la relativa, y el Comprar se sostiene porque también rinde más de un 5 % con nuestro WACC; pero significa que gana al mercado, no que cubra con holgura su coste de capital histórico. La convicción es baja por esa discrepancia; subiría si el orgánico sin divisa vuelve al 3 % o más en el 3T26 o 4T26, y la recomendación bajaría a Mantener si pasa a negativo.

**El negocio.** Constellation compra y conserva negocios de software vertical: miles de programas críticos para nichos (municipios, hospitales, concesionarios, clubes), con el 74,9 % de los ingresos recurrentes y ningún cliente por encima del 5 % [B2]. Su ROIC del 21,7 % supera al WACC del 9,1 % en más de doce puntos, aunque era del 54-68 % en 2016-2018: las compras son cada vez mayores y más caras [A1].

**Finanzas.** Los ingresos crecieron al 20,8 % anual de 2016 a 2025, hasta 11.623 M, casi todo por compras; el orgánico es del 2-4 % y bajó al 1 % sin divisa en el 2T26 [A1, B2]. De 2016 a 2025 generó 11.087 M de flujo libre y dedicó 9.245 M a compras. La deuda neta ajustada (con el IRGA y los pagos aplazados) es de 4.443 M, 1,3 veces el EBITDA. El beneficio contable infravalora la caja: ≈1.200 M de amortización de intangibles y la revaluación del IRGA [A1].

**Equipo y gobierno.** Neutro. Consejo con 7 de 9 independientes y una remuneración sin planes a largo plazo, en la que los directivos invierten el 75 % del bonus en acciones bloqueadas [C1]. Pero Mark Leonard, fundador y cerebro de la asignación de capital, dimitió por salud en septiembre de 2025 y dejó el consejo en mayo; Mark Miller dirige el grupo [C4, C5]. Los directivos han vendido unos 9,3 M USD en 12 meses [C8].

**Valoración.** El DCF, que trata las compras como inversión (≈1,3 veces las ventas que compra), da 2.484,20 USD (+18,0 %). El DCF inverso dice que el precio supone un crecimiento del 7,4 % anual hasta 2035e frente al 9,1 % de nuestro caso base y al 20,8 % de la década pasada: no es exigente para su historial. Cotiza a 15,3 veces el EBITDA de los últimos 12 meses, el mínimo de su década, y a 12,5 veces el de los próximos, por debajo de la mediana del software vertical (13,3 veces); comparables y transacciones dan 2.027,51 y 2.137,21 USD. Discrepamos poco del mercado: creemos que las compras seguirán rindiendo, pero con menos margen sobre el coste de capital que antes.

**Riesgos y catalizadores.** El mayor riesgo es que la IA generativa erosione el software vertical y el orgánico pase a negativo (el bajista: 1.220,49 USD, −42,0 %); el segundo, que la rentabilidad de las compras siga bajando: cada punto menos de crecimiento quita unos 223 USD. Catalizadores: resultados del 3T26 a principios de noviembre y la primera carta anual de Miller en 2027.

**Qué cambiaría la decisión.** Seguiría siendo Comprar por debajo de 2.214,10 USD (3.159,84 CAD), pasaría a Mantener por encima y a Vender por encima de 3.017,12 USD (4.305,86 CAD). Bajaríamos a Mantener con un orgánico sin divisa negativo en el 3T26 o el 4T26, o si el capital desplegado cae por debajo del flujo libre dos trimestres seguidos sin recompras.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Constellation Software es la mayor compradora del mundo de negocios de software vertical: más de 11.600 M de ingresos en miles de nichos, el 74,9 % recurrentes, y una máquina de reinvertir el flujo libre en compras con un ROIC del 21,7 % [A1, B2]. Desde 2016 ha multiplicado sus ingresos por 5,5.

El precio de 2.104,75 USD, un 26 % por debajo del máximo de 52 semanas, descuenta una Constellation que sigue comprando pero crece al 7,4 % anual hasta 2035, frente al 20,8 % de la década pasada. Cotiza a 15,3 veces el EBITDA de los últimos 12 meses, el mínimo de su década, y por debajo de la mediana del software vertical en los próximos 12 meses [D1, D8].

El mercado acierta en que el modelo se ha hecho más difícil: el ROIC ha bajado a un tercio del de 2016-2018, el orgánico está en el 1 % sin divisa y el fundador ya no dirige [A1, B2, C4]. Exagera al tratar la IA como el fin del software vertical: no hay aún ningún dato de pérdida de clientes, y la estructura descentralizada sobrevive a Leonard. Para invertir hay que creer que el orgánico se quedará en el 2-3 % y que el grupo podrá seguir reinvirtiendo unos 2.000 M al año por encima del 9 % de coste de capital.`,
  vision_diferencial: {
    mercado_descuenta: `Que la IA generativa rebaja las barreras de entrada del software vertical y que, sin Mark Leonard, Constellation no podrá reinvertir su flujo libre con la rentabilidad de antes: crecimiento a la mitad que en la década pasada y un múltiplo de compounder maduro.`,
    nuestra_vision: `Coincidimos en que el crecimiento será menor (9,1 % anual en nuestro caso base) y en que las compras rinden menos que antes; pero el software crítico de nicho, con clientes pequeños y datos propios, es de lo último que reemplazará la IA, y el flujo libre sigue siendo de unos 2.400 M al año [A1].`,
    por_que: `Porque el dato que mostraría la erosión, el orgánico, todavía es positivo (2-4 % en 2024-2025, 1 % sin divisa en el 2T26) y la caída del 2T26 se concentra en Altera [A10, B2]. Nuestra diferencia con el mercado es pequeña: apostamos más por el modelo que por una reactivación.`,
  },
  a_favor: [
    '**Ingresos recurrentes y dispersos**: el 74,9 % recurrentes y ningún cliente por encima del 5 % [B2].',
    '**Crea valor**: ROIC del 21,7 % frente a un WACC del 9,1 %.',
    '**Flujo libre creciente**: 2.402 M en los últimos 12 meses y 11.087 M en la década [A1].',
    '**Precio en mínimos de la década**: 15,3 veces el EBITDA frente a una media de 21,3 veces.',
    '**Alineación de la dirección**: el 75 % del bonus neto se invierte en acciones bloqueadas [C1].',
  ],
  en_contra: [
    '**Orgánico a la baja**: 1 % sin divisa en el 2T26 y −19 % en el mantenimiento de Altera [A10].',
    '**ROIC a un tercio**: del 54-68 % de 2016-2018 al 21,7 % de 2025 [A1].',
    '**Sin Mark Leonard**: dimitió en septiembre de 2025 y dejó el consejo en mayo de 2026 [C4, C5].',
    '**Riesgo de la IA**: la propia empresa lo añadió como factor de riesgo en 2025 [A11].',
    '**Asimetría justa**: el bajista pierde un 42,0 % frente a un alcista del 48,8 %.',
  ],
  que_vigilar: `La tesis depende del crecimiento orgánico sin divisa: hoy en el 1 %, tiene que quedarse en el 2-3 % para que el modelo de compras siga creando valor. La señal de que no ocurre sería un orgánico negativo en el 3T26 o el 4T26 fuera de Altera, o un capital desplegado que cae por debajo del flujo libre sin que la empresa recompre acciones.`,
  cambiaria_recomendacion: [
    'Si el precio supera 2.214,10 USD (3.159,84 CAD), pasaríamos a Mantener.',
    'Si el precio supera 3.017,12 USD (4.305,86 CAD), pasaríamos a Vender.',
    'Si el orgánico sin divisa es negativo en el 3T26 o el 4T26, pasaríamos a Mantener.',
    'Si el orgánico vuelve al 3 % o más con el capital desplegado por encima de 2.000 M al año, subiríamos la convicción.',
    'Si el Tesoro a 10 años supera el 5,75 %, el valor del DCF bajaría por debajo del precio.',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento orgánico sin divisa', nivel_actual: '1 % (2T26)', umbral_alerta: 'Negativo en el 3T26 o el 4T26', por_que: 'Es la prueba de si la IA erosiona el software vertical.' },
    { kpi: 'Capital desplegado en compras', nivel_actual: '1.700 M en el 1S26 y 818 M comprometidos después', umbral_alerta: '< 1.500 M al año', por_que: 'El caso base supone que sigue reinvirtiendo el flujo libre.' },
    { kpi: 'FCFA2S', nivel_actual: '2.031 M (12 meses a jun-26)', umbral_alerta: 'Caída interanual', por_que: 'Es la caja que se reinvierte.' },
    { kpi: 'Mantenimiento de Altera', nivel_actual: '−19 % orgánico (2T26)', umbral_alerta: 'Peor que −10 % en 2027', por_que: 'La mayor compra reciente arrastra el orgánico del grupo.' },
    { kpi: 'ROIC', nivel_actual: '21,7 % (2025)', umbral_alerta: '< 18 %', por_que: 'Mide si las compras siguen rindiendo por encima del coste de capital.' },
  ],
  confianza: 'Media',
};
