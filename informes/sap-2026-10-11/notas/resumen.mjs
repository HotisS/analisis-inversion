// Resumen ejecutivo (SAP, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo es de 191,35 EUR, prácticamente el precio de 191,46 EUR, y con el dividendo la rentabilidad total esperada a 12 meses es del 1,2 %. El alcista gana un 28,9 % y el bajista pierde un 34,7 %: asimetría de 0,83 veces. La razón en una frase: el precio descuenta casi exactamente nuestro caso base, que ya es el de la guía y el del consenso. Las reglas discrepan: con nuestro coste de capital (WACC del 9,30 %) sale Mantener; con la prima de riesgo que hoy pide el mercado (4,20 %) el objetivo sube a 230,58 EUR (+20,4 %) y sale Comprar. Es decir, SAP rinde más que el mercado pero no cubre su propio coste de capital histórico: si el mercado entero corrige, también cae. La convicción es baja, la que sugieren los criterios, por esa discrepancia; subiría si el precio bajara de 184,46 EUR o si el 3T26 (21 de octubre) mantiene el backlog de nube por encima del +25 % a divisa constante.

**El negocio.** SAP es el ERP de las grandes empresas: 36.800 M de ingresos en 2025, un 86 % recurrentes, con un ROIC del 15,5 %, 6,2 puntos por encima del WACC [A1]. La nube crece al +24 % a divisa constante y el current cloud backlog suma 22.929 M (+26 %) [A4]. Su calidad sí sostiene el crecimiento del caso base (8,2 % anual): no necesita capital, el circulante es negativo por los cobros anticipados y el foso es de costes de cambio. El riesgo no es de calidad sino de modelo: que los agentes de IA desplacen el cobro por usuario.

**Finanzas.** El margen EBITDA NIIF subió al 30,8 % en 2025 (sin el litigio de Teradata) desde el 23 % de 2023, y el flujo libre fue de 7.544 M, un 105 % del beneficio [A1]. Caja neta de 2.856 M a junio y rating A+/A1 [A5]. La calidad contable es buena (Altman 7,25, Piotroski 8), aunque los pagos en acciones (1.695 M en 2025) son el 24 % del beneficio.

**Equipo y gobierno.** Suma poco y resta poco: sin accionista de control, presidente no ejecutivo y la dirección compró acciones en los mínimos de julio [C17]. Cumple 10 de 13 criterios; falla en independencia (44 %, por la cogestión) y en la comisión de auditoría. La guía se ha cumplido o casi en seis años, pero la ambición 2025 se rehízo dos veces.

**Valoración.** El DCF da 192,86 EUR y el DCF inverso dice que el precio pide un crecimiento del 8,1 % anual hasta 2035, frente al 8,2 % de nuestro caso base: no discrepamos del mercado. Los comparables (161,12 EUR) dicen que SAP es cara frente a Salesforce, Adobe o Intuit (15,1 veces el EBITDA de los próximos 12 meses frente a 11,8), y su propia historia (18,2 veces frente a 19,9 de media) que no lo es.

**Riesgos y catalizadores.** El primero es la IA: en el bajista (124,96 EUR) el backlog frena al 10-12 % y el margen se queda en el 33 %. El segundo, la divisa: el 39 % de los ingresos viene de América. Los catalizadores son el 3T26 del 21-oct, la guía de 2027 a finales de enero y el fin del mantenimiento de ECC en diciembre de 2027; la recompra (7.400 M pendientes) retiraría un 3,3 % del capital. Los foros de particulares están más animados que los analistas, que rebajaron en septiembre; no hay euforia que cambie la decisión.

**Qué cambiaría la decisión.** Compraríamos por debajo de 184,46 EUR y venderíamos por encima de 259,09 EUR. Un backlog de nube por debajo del +20 % a divisa constante nos llevaría hacia el bajista; una guía de 2027 con ingresos acelerando por encima del +12 % y el margen subiendo, hacia el alcista.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `SAP es el sistema de gestión (ERP) de la mayoría de las grandes empresas del mundo y está a mitad de su paso a la nube: los ingresos de nube fueron 21.023 M en 2025 (+23 %), el 57 % del total, y la Cloud ERP Suite creció un 28 % [A1]. El 86 % de los ingresos es recurrente y el current cloud backlog (22.929 M, +26 % a divisa constante) cubre buena parte del año próximo [A4]. El margen EBIT ha pasado del 18,6 % de 2023 al 27,2 % de 2025 y la guía pide más [A1, A4].

El precio descuenta justo eso. El DCF inverso dice que los 191,46 EUR de hoy suponen un crecimiento de los ingresos del 8,1 % anual hasta 2035 con un margen EBITDA del 35,8 %, casi idéntico a nuestro caso base (8,2 % y 36 %) y al consenso de 28 analistas [D7]. SAP cotiza a 15,1 veces el EBITDA de los próximos 12 meses, por encima de la mediana de los grandes del software (11,8 veces) y por debajo de su media histórica de los últimos 12 meses (19,9 veces).

El mercado acierta, a nuestro juicio. Para invertir hay que creer en algo más que la guía: que la IA amplía el negocio del ERP en vez de abaratarlo, que la migración de ECC acelera los ingresos en 2027-2028 por encima del 12 % y que el margen converge al de Oracle. Con nuestro coste de capital no hay margen de seguridad; con el que hoy pide el mercado, sí.`,
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento de los ingresos del 8,1 % anual hasta 2035 y un margen EBITDA del 35,8 %: la guía de 2026, la aceleración de 2027 y una convergencia gradual del margen. Es el consenso de los analistas, que dan un precio objetivo medio de 210,39 EUR [D7, D8].',
    nuestra_vision: 'Lo mismo: crecimiento del 8,2 % y margen del 36 %. No tenemos una visión distinta del mercado. Somos algo más prudentes que los analistas con el riesgo de la IA (el bajista pesa un 25 % y pierde un 34,7 %) y con el coste de capital (un WACC del 9,30 % frente al 7,92 % que implica la prima del mercado).',
    por_que: 'La diferencia con los analistas está en la tasa de descuento, no en las cifras: nuestras proyecciones de ingresos y EBITDA quedan a menos de un 1 % del consenso de 2026-2028. Sin una visión distinta, la decisión depende del precio de entrada.',
  },
  a_favor: [
    '**Visibilidad**: el 86 % de los ingresos es recurrente y el backlog de nube crece un 26 % a divisa constante [A1, A4].',
    '**Margen en expansión**: el margen EBIT pasó del 18,6 % (2023) al 27,2 % (2025) [A1].',
    '**Balance**: caja neta de 2.856 M y rating A+/A1 [A5].',
    '**Recompras**: 7.400 M pendientes hasta 2027, un 3,3 % del capital.',
    '**Migración forzada**: el mantenimiento estándar de ECC termina en diciembre de 2027 [B13].',
  ],
  en_contra: [
    '**Precio justo**: el DCF inverso pide un 8,1 % anual, nuestro caso base.',
    '**Riesgo de la IA**: el bajista vale 124,96 EUR (−34,7 %), y la acción ya tocó 127,50 en julio [D3].',
    '**Cara frente a sus pares**: 15,1 veces el EBITDA próximo frente a 11,8 de mediana.',
    '**Divisa**: el 39 % de los ingresos viene de América [A1].',
    '**Margen de nube a la baja**: −0,5 puntos en el 2T26 por los costes de la IA [A4, A13].',
  ],
  que_vigilar: `La tesis depende de que el backlog de nube siga creciendo por encima del 20 % a divisa constante después de la ola de migraciones de ECC y de que los gastos crezcan al 80-90 % de los ingresos en 2027. La señal de que no ocurre sería un backlog por debajo del +20 % o un margen bruto de nube por debajo del 73 %.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 184,46 EUR, pasaríamos a Comprar.',
    'Si el precio supera 259,09 EUR, pasaríamos a Vender.',
    'Si el current cloud backlog del 3T26 crece menos de un 22 % a divisa constante, revisaríamos el caso base hacia el bajista.',
    'Si la guía de 2027 da ingresos por encima del +12 % a divisa constante y gastos al 80 % del crecimiento, subiríamos el caso base.',
  ],
  kpis_seguimiento: [
    { kpi: 'Current cloud backlog (divisa constante)', nivel_actual: '22.929 M, +26 % (jun-26)', umbral_alerta: '< +20 %', por_que: 'Anticipa la nube de los próximos 12 meses.' },
    { kpi: 'Ingresos de la Cloud ERP Suite', nivel_actual: '+27 % a divisa constante (2T26)', umbral_alerta: '< +20 %', por_que: 'Mide la migración de ECC.' },
    { kpi: 'Margen bruto de nube (NIIF)', nivel_actual: '74,3 % (2T26)', umbral_alerta: '< 73 %', por_que: 'Mide el coste de la IA.' },
    { kpi: 'Beneficio operativo no NIIF', nivel_actual: 'Guía 2026: 11.800-12.200 M', umbral_alerta: 'Nueva rebaja', por_que: 'Sostiene la expansión del margen.' },
    { kpi: 'Ingresos de soporte', nivel_actual: '−7 % a divisa constante (2T26)', umbral_alerta: 'Caída de más del 10 % sin nube que la compense', por_que: 'La conversión a la nube debe sumar, no restar.' },
  ],
  confianza: 'Media',
};
