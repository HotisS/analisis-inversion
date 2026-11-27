// Resumen ejecutivo (SAP, corte 2026-10-21, tras el 3T26). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción media. A 12 meses, con nuestra regla de múltiplos, el objetivo es de 256,54 EUR: +24,2 % ponderado y +28,6 % en el caso base, con dividendo, sobre el cierre de 208,65 EUR del 21-oct (antes de los resultados). Pero el valor intrínseco (síntesis del DCF, los escenarios y los comparables) es de 196,43 EUR, un 5,9 % por debajo del precio: la regla pide las dos cosas para comprar, y para mantener basta con la primera. La convicción es media: la robustez sale sólida (con el BPA un 10 % más bajo la rentabilidad sigue en el 11,9 %), pero la acción ha subido un 56 % en tres meses.

**Qué ha cambiado con el 3T26 (21-oct, tras el cierre).** Buen trimestre: ingresos de 10.270 M (+13 %; +12 % a divisa constante), nube de 6.668 M (+26 %) y current cloud backlog de 24.144 M (+26 % a divisa constante), que no frena como temía el mercado [A14]. Beneficio operativo no NIIF de 3.030 M (+18 %, margen del 29,5 %) y flujo libre de 7.968 M en nueve meses. SAP lleva la nube y «nube y software» a la parte alta de su guía y mantiene el resto; para 2027 repite que los ingresos acelerarán. Dos matices: parte de la nube es una recuperación puntual de ingresos atrasados sin cuantificar, y el 3T25 comparaba con ≈200 M de cargos extraordinarios [A14]. El ADR subía un 4 % fuera de hora [D32]. Subimos 2026e del +9 % al +10 %.

**El negocio.** SAP es el ERP de las grandes empresas: 36.800 M de ingresos en 2025, un 86 % recurrentes, con un ROIC del 15,5 %, 6 puntos por encima del WACC [A1]. Su calidad sostiene el crecimiento del caso base (8,3 % anual): no necesita capital y el foso es de costes de cambio. El riesgo es de modelo: que los agentes de IA desplacen el cobro por usuario.

**Finanzas.** Caja de 9.364 M y deuda de unos 8.630 M a septiembre, tras recomprar ≈4.200 M de su programa de 10.000 M a 164,79 EUR de media [A14, D30]. Altman 7,69 y Piotroski 8.

**Valoración.** El DCF da 196,64 EUR y el DCF inverso dice que el precio pide un crecimiento del 9,1 % anual hasta 2035, frente al 8,3 % de nuestro base. Cotiza a 25,5 veces nuestro BPA de 2027e, por debajo de su mediana adelantada (31,3 veces) y por encima de los comparables (23,3). Nuestro BPA coincide con el consenso; con la prima de riesgo del mercado el DCF sube a 248,17 EUR.

**Riesgos y catalizadores.** El primero es la IA: en el bajista (126,87 EUR) el backlog frena y el margen se queda bajo. El segundo, el margen bruto de la nube, que baja por tercer trimestre. Catalizadores: la sesión del 22-oct, la guía de 2027 a finales de enero y el fin del mantenimiento de ECC en diciembre de 2027.

**Qué cambiaría la decisión.** Compraríamos por debajo de 196,43 EUR y venderíamos por encima de 287,82 EUR; seguir en cartera exige un precio por debajo de 231,09 EUR (filtro de mantener). Un backlog por debajo del +20 % a divisa constante nos llevaría hacia el bajista.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `SAP es el sistema de gestión (ERP) de la mayoría de las grandes empresas del mundo y está a mitad de su paso a la nube: la nube crece un 25 % en nueve meses y el current cloud backlog (24.144 M, +26 % a divisa constante) cubre el año próximo [A14]. El 86 % de los ingresos es recurrente y el margen sube.

Tras el rebote del 56 % desde julio, el precio (208,65 EUR) descuenta un crecimiento del 9,1 % anual hasta 2035, algo más que nuestro base (8,3 %). A 12 meses la regla da +24,2 % porque el PER (25,5 veces) está por debajo de su historia, pero el valor intrínseco queda un 5,9 % por debajo.

Para comprar más hay que creer que la IA amplía el ERP en vez de abaratarlo; para mantener basta con que el backlog siga por encima del 20 %.`,
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento de los ingresos del 9,1 % anual hasta 2035 o un margen EBITDA del 38,1 %; el objetivo medio de los analistas (215,76 EUR, antes de los resultados) queda solo un 3 % por encima del precio [D36].',
    nuestra_vision: 'Crecimiento del 8,3 % y margen del 36 %, con el BPA del consenso. Somos más prudentes con el riesgo de la IA (el bajista pierde un 39,2 %) y con el coste de capital (WACC del 9,24 % frente al 7,87 % que implica la prima del mercado).',
    por_que: 'La diferencia está en la tasa de descuento, no en las cifras: nuestro BPA queda a menos de un 1,5 % del consenso de 2026-2028 [D35].',
  },
  a_favor: [
    '**Backlog que no frena**: 24.144 M, +26 % a divisa constante en el 3T26 [A14].',
    '**Guía al alza**: nube y «nube y software» a la parte alta del rango [A14].',
    '**Recompras**: ≈5.800 M pendientes hasta 2027 [A14].',
    '**Migración forzada**: el mantenimiento estándar de ECC termina en diciembre de 2027 [B13].',
  ],
  en_contra: [
    '**Valor intrínseco un 5,9 % bajo el precio**: el DCF inverso pide un 9,1 % anual.',
    '**Rebote del 56 % en tres meses** [D32].',
    '**Calidad del trimestre**: parte de la nube es una recuperación puntual y el margen bruto de nube baja [A14].',
    '**Riesgo de la IA**: el bajista vale 126,87 EUR (−39,2 %).',
  ],
  que_vigilar: `La tesis depende de que el backlog de nube siga creciendo por encima del 20 % a divisa constante después de la ola de migraciones de ECC y de que los gastos crezcan al 80-90 % de los ingresos en 2027. La señal de que no ocurre sería un backlog por debajo del +20 % o un margen bruto de nube por debajo del 73 %.`,
  cambiaria_recomendacion: [
    'Si el precio baja de 196,43 EUR, pasaríamos a Comprar.',
    'Si el precio supera 287,82 EUR, pasaríamos a Vender.',
    'Si el current cloud backlog crece menos de un 20 % a divisa constante, revisaríamos el caso base hacia el bajista.',
    'Si la guía de 2027 da ingresos por encima del +12 % a divisa constante y gastos al 80 % del crecimiento, subiríamos el caso base.',
  ],
  kpis_seguimiento: [
    { kpi: 'Current cloud backlog (divisa constante)', nivel_actual: '24.144 M, +26 % (sep-26)', umbral_alerta: '< +20 %', por_que: 'Anticipa la nube de los próximos 12 meses.' },
    { kpi: 'Ingresos de la Cloud ERP Suite', nivel_actual: '+29 % (3T26)', umbral_alerta: '< +20 %', por_que: 'Mide la migración de ECC.' },
    { kpi: 'Margen bruto de nube (NIIF)', nivel_actual: '73,9 % (3T26)', umbral_alerta: '< 73 %', por_que: 'Mide el coste de la IA.' },
    { kpi: 'Beneficio operativo no NIIF', nivel_actual: 'Guía 2026: 11.800-12.200 M (mantenida el 21-oct)', umbral_alerta: 'Nueva rebaja', por_que: 'Sostiene la expansión del margen.' },
    { kpi: 'Ingresos de soporte', nivel_actual: '−5 % (3T26)', umbral_alerta: 'Caída de más del 10 % sin nube que la compense', por_que: 'La conversión a la nube debe sumar, no restar.' },
  ],
  confianza: 'Media',
};
