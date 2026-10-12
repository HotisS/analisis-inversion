// Resumen ejecutivo (Salesforce, corte 2026-10-12). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo es de 208,20 USD frente a un precio de 229,13 USD (cierre del 9-oct-2026): un potencial del −9,1 % y una rentabilidad total esperada del −8,4 % con el dividendo del 0,7 %. La asimetría es desfavorable (alcista +20,1 %, bajista −43,7 %: 0,46 veces). El precio ya paga la reaceleración prometida, sin margen para que los agentes de IA encojan el cobro por asiento. La convicción es baja porque las dos reglas discrepan: con nuestro WACC del 10,94 % saldría Vender; con la prima implícita del mercado, el valor objetivo sería de 250,17 USD y la rentabilidad total del 9,9 %, un Mantener. La diferencia es de tasa, no de cifras: nuestra proyección está a menos de un 2 % del consenso de FY2028e-FY2029e [D7]. La subiría un cRPO que crezca por encima del 15 % en el 3T27 (2-dic-2026) con bajas estables.

**El negocio.** Salesforce es el n.º 1 mundial en CRM con el 20,0 % del mercado según IDC [B5], con una tasa de bajas estable en ≈8 % [A2] y un margen EBITDA GAAP que ha pasado del 12,4 % de FY2023 al 27,0 % de FY2026. Pero el ROIC (10,8 %) apenas iguala al WACC, porque el capital es casi todo fondo de comercio de Slack, Tableau, MuleSoft e Informatica. La calidad de la empresa sostiene el crecimiento proyectado solo en parte: los costes de cambio y el circulante negativo lo financian, pero el orgánico ha caído al ≈7 % y su vuelta al 8-9 % depende de Agentforce, cuyo ARR (más de 1.500 M) cambió de definición en el 2T27 [A7].

**Finanzas.** Medimos todo en base GAAP: la remuneración en acciones (8,5 % de las ventas) es un coste, y con ella el EBITDA de los próximos 12 meses cotiza a 14,6x, no a las ≈10x que sugiere el EBITDA ajustado del consenso. La recompra acelerada de 25.000 M, financiada con bonos en marzo de 2026, llevó la deuda neta ajustada a 35.518 M (3,0 veces el EBITDA) [A2]. El beneficio GAAP del 1S27 lleva 3.171 M de plusvalías de inversiones, sobre todo Anthropic, que no repetirán [A2].

**Equipo y gobierno.** Resta algo: Benioff es presidente y primer ejecutivo (con consejero coordinador), los accionistas rechazaron la remuneración en 2024 (53,9 % en contra) y el auditor lleva 24 años [C1, C4]. Suma que la dirección ha batido su guía de margen y de BPA cada año desde FY2022 [C15-C20].

**Valoración.** El DCF da 206,30 USD (valor terminal del 51 %); los comparables, 232,82 USD en la mediana de EV/EBITDA y PER; los escenarios ponderados, 200,37 USD. El precio descuenta un crecimiento del 7,4 % anual en FY2028e-FY2036e frente al 6,2 % de nuestro caso base, o una rentabilidad del 10,2 % frente a nuestro WACC del 10,94 %. Discrepamos del mercado en la tasa y en la probabilidad del bajista (30 %), no en el año próximo.

**Riesgos y catalizadores.** El riesgo mayor es la compresión de asientos por los agentes (bajista: 129,09 USD, −37 % frente al caso base); después, los modelos de lenguaje en la capa de aplicación (−17 % con dos puntos menos de crecimiento). Los foros están divididos: tras el 2T27 dominan los alcistas, pero las encuestas a socios dicen que Agentforce aún no mueve sus ingresos [E7]. Catalizadores: la liquidación de la recompra en octubre, el 3T27 el 2-dic-2026 y la guía de FY2028 a finales de febrero de 2027.

**Qué cambiaría la decisión.** Compraríamos por debajo de 199,87 USD y venderíamos por encima de 280,03 USD. Pasaríamos a Vender si el cRPO crece menos del 10 % o las bajas superan el 9 %, y a Comprar si la guía de FY2028 da un orgánico de al menos el 9 % con margen operativo GAAP por encima del 22 %.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Salesforce es el mayor proveedor mundial de software de gestión de clientes, con el 20,0 % del mercado [B5], 41.525 M USD de ingresos en FY2026 y un margen EBITDA GAAP del 27,0 % que ha doblado en tres años. Cobra por adelantado, por asiento y con contratos plurianuales: la tasa de bajas es de ≈8 % y el circulante negativo (−41,9 % de las ventas) financia el crecimiento [A1, A2].

A 229,13 USD, el precio descuenta un crecimiento anual del 7,4 % en FY2028e-FY2036e y una rentabilidad del 10,2 %, por debajo de nuestro WACC del 10,94 %. Los múltiplos están en línea con los comparables en base GAAP (14,6x el EBITDA de los próximos 12 meses frente a 15,3x) y un 60 % por debajo de su historia, porque el crecimiento cayó del 24 % al ≈7 % orgánico.

Para invertir hay que creer que Agentforce y Data 360 (ARR de ≈3.900 M) [A7] convierten la amenaza de los agentes en consumo nuevo antes de que los clientes recorten asientos, y que la dirección no vuelve a comprar caro: el ROIC (10,8 %) ya iguala al WACC. El mercado acierta al no pagar más; nuestro valor (208,20 USD) queda un 9,1 % por debajo, sobre todo por la tasa.`,
  vision_diferencial: {
    mercado_descuenta: 'Que el orgánico vuelve al 8-9 % y el margen sigue subiendo: el precio pide un 7,4 % de crecimiento anual hasta FY2036e y un margen final del 34 %, y el consenso espera un 9,7 % en FY2028e-FY2029e [D7]. El rebote de junio a septiembre (de 146,32 a 229,13 USD) refleja que el temor a la IA se ha moderado tras el 2T27 [D1, E4].',
    nuestra_vision: 'Coincidimos en el año próximo, pero damos un 30 % a que los agentes encojan los asientos más deprisa de lo que crece el consumo, y medimos la remuneración en acciones como gasto. Con un WACC del 10,94 % el valor es de 206,30 USD en el DCF.',
    por_que: 'La única métrica que la empresa no da es la que decide: el número de asientos en las renovaciones. Lo que sí da apunta en las dos direcciones: cRPO +14 % y bajas estables, pero un ARR de Agentforce redefinido y socios que no ven ingresos [A7, E7]. Sin visión distinta del año próximo, la nuestra es de tasa y de riesgo.',
  },
  a_favor: [
    '**Liderazgo y retención**: n.º 1 en CRM con el 20,0 % del mercado y bajas estables en ≈8 % [B5, A2].',
    '**Margen en ascenso**: EBITDA GAAP del 12,4 % en FY2023 al 27,0 % en FY2026, con guía de margen operativo GAAP del 20,1 % en FY2027 [A7].',
    '**Cartera contratada**: cRPO de 33.500 M, +14 % interanual en el 2T27 [A7].',
    '**Retorno al accionista**: recompra acelerada de 25.000 M a un precio medio esperado de 182 USD, por debajo del precio actual [D12].',
    '**Opcionalidad en Anthropic**: inversiones estratégicas de 11.324 M a valor contable, el 45 % en Anthropic [D2].',
  ],
  en_contra: [
    '**Asientos en riesgo**: el bajista (los agentes reducen las plantillas de los clientes) vale 129,09 USD, −43,7 % [B13].',
    '**ROIC igual al WACC**: 10,8 % frente a 10,94 %, por 57.941 M de fondo de comercio [A1].',
    '**Orgánico lento**: ≈7 % en FY2027e; el resto del +11,4 % son compras y divisa [A7].',
    '**Más deuda**: deuda neta ajustada de 35.518 M (3,0 veces el EBITDA) tras la recompra [A2].',
    '**Remuneración en acciones**: 3.509 M en FY2026 (8,5 % de las ventas), fuera del margen ajustado que guía la empresa [A1].',
    '**Gobierno**: presidente ejecutivo y voto de remuneración rechazado en 2024 (53,9 % en contra) [C4].',
  ],
  que_vigilar: 'La tesis depende de que el crecimiento del consumo de agentes compense la caída de asientos. La señal temprana es el cRPO: si su crecimiento a tipo constante baja del 10 % dos trimestres seguidos mientras la empresa destaca el ARR de Agentforce y las unidades de trabajo agéntico, el bajista gana peso. La segunda es la tasa de bajas: por encima del 9 % indicaría que los clientes empiezan a sustituir aplicaciones.',
  cambiaria_recomendacion: [
    'Si el cRPO del 3T27 o del 4T27 crece menos del 10 % a tipo constante, pasaríamos a Vender.',
    'Si la tasa de bajas supera el 9 %, pasaríamos a Vender.',
    'Si la guía de FY2028 da un crecimiento orgánico de al menos el 9 % con margen operativo GAAP por encima del 22 %, pasaríamos a Comprar.',
    'Si la acción baja de 199,87 USD sin cambio en las cifras, pasaríamos a Comprar; por encima de 280,03 USD, a Vender.',
    'Si se anuncia una compra de más de 10.000 M, revisaríamos a la baja el valor (≈12,7 USD por acción por cada 10.000 M sin rendimiento).',
  ],
  kpis_seguimiento: [
    { kpi: 'cRPO (crecimiento interanual a tipo constante)', nivel_actual: '+14 % (2T27)', umbral_alerta: '< 10 %', por_que: 'Adelanta los ingresos de 12 meses [A7].' },
    { kpi: 'Tasa de bajas (attrition)', nivel_actual: '≈8 %', umbral_alerta: '> 9 %', por_que: 'Mide el coste de cambio y la sustitución por agentes [A2].' },
    { kpi: 'Crecimiento orgánico de ingresos', nivel_actual: '≈7 % (FY2027e)', umbral_alerta: '< 6 % en la guía de FY2028', por_que: 'El caso base pide 9,5 % en FY2028e.' },
    { kpi: 'Margen operativo GAAP', nivel_actual: '20,5 % (2T27); guía FY2027 20,1 %', umbral_alerta: '< 19 %', por_que: 'Sostiene la subida del margen EBITDA al 31 % [A7].' },
    { kpi: 'Remuneración en acciones sobre ventas', nivel_actual: '9,0 % (guía FY2027)', umbral_alerta: '> 10 %', por_que: 'Coste real que el margen ajustado excluye [A7].' },
  ],
  confianza: 'Media',
};
