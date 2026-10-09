// Resumen ejecutivo (ICON plc, corte 2026-10-09). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo es de 163,26 USD, un 0,8 % por debajo del precio (164,50 USD), sin dividendo: rentabilidad total esperada del −0,8 %. Con nuestro WACC (10,1 %) la asimetría es mala, +18,0 % en el alcista frente a −37,2 % en el bajista (0,48 veces), y la regla absoluta da Vender; con la prima de riesgo que hoy pide el mercado (4,2 %), el objetivo sube a 194,24 USD (+18,1 %) y la relativa da Comprar. Se contradicen: Mantener. **La convicción es baja porque la decisión depende de la tasa de descuento, no de los flujos**; subiría si el 20-F de 2026 (hasta abril de 2027) llega sin debilidades materiales y el margen ajustado supera el 17 %, y bajaría si el 3T26 (27 de octubre) lo deja por debajo del 15 %.

**El negocio.** ICON es una de las tres mayores CRO del mundo, con cerca del 11 % del desarrollo clínico externalizado [B1, B9]. El foso se estrecha: de 2023 a 2025 creció un 2,4 % y Medpace un 34 % [B1, B15], con un margen EBITDA 4-6 puntos inferior al de IQVIA, Medpace y Charles River [D16]. PRA (12.042 M en 2021) hundió el ROIC del 25,7 % al 6,8 % de 2025, por debajo del WACC [A9].

**Finanzas y calidad contable.** Es lo que más pesa. La investigación halló ajustes manuales que adelantaron ingresos entre el 3T23 y el 4T24: las ventas de 2023 y 2024 se reexpresaron a la baja en 65,3 M y 92,7 M, y el beneficio, un 9,5 % y un 6,6 % [A1]. El auditor da opinión adversa sobre el control interno por dos debilidades materiales, una el tono de la dirección [A1]; el Beneish M (−2,61) no lo detecta. La caja es real: 862 M de flujo libre en 2025, sin cambios por la reexpresión [A1], y una deuda neta de 2,0 veces el EBITDA sin vencimientos hasta 2029 [A11]. El problema es operativo: ventas planas (+0,8 % en 2025) y un margen ajustado del 20,4 % en 2024 al 15,7 % en el primer semestre de 2026 [A3, A7].

**Equipo y gobierno.** Restan. Cúpula nueva (2024 y 2025), una guía cumplida limpiamente solo en 2023 de 2022 a 2025 [C1, C2, C31] y el mismo presidente que durante los ajustes. Nueve consejeros y directivos vendieron 4,0 M USD en agosto y septiembre, sin compras [C11].

**Valoración.** DCF 154,88 USD (−5,8 %), escenarios 151,77 y comparables 219,05, con pesos del 45, 40 y 15 %. **El precio descuenta la recuperación completa**: un crecimiento del 4,9 % anual en 2027-2035 (4,1 % en nuestro base) y un margen EBITDA final del 17,2 %, cerca del 20 % ajustado de 2024. Con nuestros flujos rinde un 9,8 %: menos que el WACC y más que el 8,9 % que pide el mercado. Cotiza a 12,8 veces el EBITDA de los próximos 12 meses, frente a 14,6 de los comparables. Nuestro EBITDA de 2026-2028 está solo un 1,7-3,1 % por encima del consenso: la distancia con su precio objetivo (184,41 USD) [D11] está en la tasa de descuento.

**Riesgos y catalizadores.** Otro tropiezo contable o una sanción de la SEC (el 12-feb-2026 la acción perdió un 39,9 % en un día [D1]) y el margen: cada punto menos resta un 8,6 % al DCF. Catalizadores: resultados del 3T26 el 27-oct-2026 [D6], guía de 2027 en febrero, el 20-F de 2026 y 750 M de recompras autorizadas [A1].

**Qué cambiaría la decisión.** Compraríamos por debajo de 155,42 USD y venderíamos por encima de 202,28. Pasaríamos a Comprar si EY levanta las debilidades y la contratación sobre honorarios directos se mantiene en 1,2 veces o más con un margen ajustado del 17 %; a Vender, si el margen queda por debajo del 15 % dos trimestres seguidos o se retrasa otro informe.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `ICON es una de las tres mayores CRO del mundo: 8.294 M USD de ingresos en los últimos 12 meses, una cartera de 23.400 M y una contratación de 1,51 veces la facturación en el segundo trimestre de 2026 [A7]. Convierte bien el beneficio en caja (862 M de flujo libre en 2025) y su deuda, 2,0 veces el EBITDA, ya no vence hasta 2029 [A1, A11]. Pero desde la compra de PRA no crece y su ROIC (6,8 %) no cubre el coste de capital.

El precio, 164,50 USD, está por debajo de todos los cierres anuales desde 2019 y equivale a 12,8 veces el EBITDA de los próximos 12 meses, frente a 14,6 veces de los comparables. Aun así, el DCF inverso dice que descuenta una recuperación completa: un crecimiento del 4,9 % anual hasta 2035 y un margen EBITDA del 17,2 %, cerca del 20 % ajustado de 2024, antes de la reexpresión.

El mercado acierta en descontar a ICON frente a IQVIA o Medpace: la reexpresión de 2023-2024, dos debilidades materiales sin remediar, una demanda colectiva y una autodenuncia ante la SEC [A1, C38]. Para invertir hay que creer que la contratación de 2026 se convierte en ingresos con margen y que el control interno se limpia en el 20-F de 2026. Con nuestro coste de capital el precio ya paga esa recuperación; solo con la prima que hoy pide el mercado queda un 18,1 % de recorrido.`,
  vision_diferencial: {
    mercado_descuenta: `El precio descuenta que ICON vuelve a crecer al 4,9 % anual en 2027-2035 y recupera un margen EBITDA del 17,2 % en nuestra base (cerca del 20 % ajustado de 2024), con una rentabilidad exigida del 9,8 %. El consenso espera ingresos de 8.894 M en 2028 y un precio objetivo medio de 184,41 USD [D11].`,
    nuestra_vision: `Coincidimos con el consenso en los flujos: nuestro EBITDA de 2026-2028 está un 1,7-3,1 % por encima del suyo y los ingresos, a menos de un 1 %. Discrepamos en el riesgo: con un WACC del 10,1 % la acción vale 154,88 USD por DCF y el bajista (−37,2 %) pesa el doble que el alcista (+18,0 %).`,
    por_que: `El margen ajustado cayó del 20,5 % del 2T25 al 15,5 % del 4T25 y no se ha recuperado (15,9 % en el 2T26) y la contratación del 2T26 se apoyó en reembolsables sin margen: sobre honorarios directos fue de 1,2 veces [A7]. Mientras el auditor mantenga la opinión adversa sobre el control interno, no vemos motivo para descontar los flujos de ICON a una tasa inferior a la de su historia.`,
  },
  a_favor: [
    '**Precio en mínimos**: 12,4 veces el EBITDA de los últimos 12 meses, por debajo del mínimo de sus cierres de 2019-2025 (13,2 veces).',
    '**Caja real**: 862 M de flujo libre en 2025 y una rentabilidad por FCF del 6,9 %; la reexpresión no cambió la caja de ningún año [A1].',
    '**Contratación al alza**: 1,51 veces la facturación en el 2T26 y cartera de 23.400 M, un 7,3 % más que en diciembre [A7].',
    '**Balance despejado**: deuda neta de 2,0 veces el EBITDA y sin vencimientos hasta 2029 tras la refinanciación de 2.150 M [A11].',
    '**Recompras posibles**: 750 M autorizados, un 5,9 % de la capitalización [A1].',
  ],
  en_contra: [
    '**Cuentas reexpresadas**: ventas de 2023-2024 rebajadas en 65,3 M y 92,7 M y dos debilidades materiales sin remediar [A1].',
    '**Sin crecimiento**: ingresos de 8.251 M en 2025, un 0,8 % más que en 2024 y solo un 6,6 % más que en 2022 [A1].',
    '**Margen a la baja**: el ajustado cayó del 20,4 % en 2024 al 15,7 % en el primer semestre de 2026 [A3, A7].',
    '**ROIC por debajo del coste de capital**: 6,8 % frente a un WACC del 10,1 %, por los 12.042 M pagados por PRA.',
    '**Guía poco fiable**: de 2022 a 2025 solo se cumplió limpiamente la de 2023, y sus ingresos se reexpresaron [C1, C31].',
    '**Directivos vendedores**: nueve vendieron 4,0 M USD en agosto y septiembre de 2026, sin compras [C11].',
  ],
  que_vigilar: `La tesis depende de que el margen EBITDA ajustado se recupere desde el 15,9 % del 2T26 hacia el 17-18 % en 2027 sin otro tropiezo contable. La señal de que no se cumple sería un tercer trimestre (27-oct-2026) con el margen por debajo del 15 % o una contratación sobre honorarios directos por debajo de 1,1 veces; la de que sí, un 20-F de 2026 sin debilidades materiales.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 155,42 USD sin noticias nuevas, pasaríamos a Comprar.',
    'Si el 20-F de 2026 llega sin debilidades materiales y el margen ajustado del 4T26 supera el 17 %, pasaríamos a Comprar.',
    'Si el margen EBITDA ajustado queda por debajo del 15 % dos trimestres seguidos, pasaríamos a Vender.',
    'Si se retrasa otro informe o la SEC abre una actuación formal, pasaríamos a Vender.',
    'Si el precio supera 202,28 USD, pasaríamos a Vender.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen EBITDA ajustado trimestral', nivel_actual: '15,9 % (2T26)', umbral_alerta: '< 15 %', por_que: 'El precio descuenta volver a cerca del 20 %.' },
    { kpi: 'Contratación sobre honorarios directos', nivel_actual: '1,2 veces (2T26)', umbral_alerta: '< 1,1 veces', por_que: 'Separa la contratación con margen de los reembolsables.' },
    { kpi: 'Crecimiento interanual de ingresos', nivel_actual: '+1,2 % (2T26)', umbral_alerta: 'Negativo dos trimestres', por_que: 'El base exige +3,5 % en 2027.' },
    { kpi: 'Cancelaciones trimestrales', nivel_actual: '562 M (2T26)', umbral_alerta: '> 600 M', por_que: 'Indican la calidad de la cartera de 23.400 M.' },
    { kpi: 'Debilidades materiales de control', nivel_actual: 'Dos (20-F 2025)', umbral_alerta: 'Alguna en el 20-F 2026', por_que: 'Es la principal causa del descuento.' },
  ],
  confianza: 'Media',
};
