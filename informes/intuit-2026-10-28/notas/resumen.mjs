// Resumen ejecutivo (Intuit, corte 2026-10-28). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 371,57 USD (nuestro BPA GAAP de FY2028e por el PER de la regla común), un 14,6 % de rentabilidad ponderada con el dividendo y un 16,8 % en el caso base, frente a un precio de 328,45 USD. Le falta muy poco para Comprar (15 % ponderada): el límite de compra es 327,28 USD, un 0,4 % por debajo del cierre. El valor intrínseco es de 448,17 USD (+36,4 %) y el objetivo medio de los analistas, 406,92. La convicción es baja porque la rentabilidad que decide está a 0,4 puntos de su umbral (el motor sugiere media); subiría con un 1T FY2027 en la guía y una campaña fiscal de 2027 sin pérdida de cuota, y bajaría si las declaraciones de TurboTax caen más de un 3 %.

**El negocio.** TurboTax, QuickBooks y Credit Karma facturaron 21.448 M en FY2026 con un margen EBIT del 28,8 % y un ROIC del 23,1 %, 13,3 puntos por encima del WACC del 9,8 % [A1]. La calidad sostiene **en parte** el crecimiento del caso base (7,1 % anual, sin capital): pymes y Credit Karma crecen a doble dígito, pero TurboTax ha agotado su poder de precios: perdió un punto de cuota del IRS y la dirección admite que el precio es el primer motivo de baja [D36, A7].

**Finanzas.** Flujo libre del 9,7 % de la capitalización (inflado por impuestos bajos en FY2026) y deuda neta ajustada de 500 M [A1]. La guía de FY2027, reafirmada el 17-sep, da BPA GAAP de 20,12-20,36 USD; nuestro 20,04 queda justo por debajo [A6, D36].

**Equipo y gobierno.** Neutro: 11 de 13 consejeros independientes, pero presidente y consejero delegado en la misma persona desde enero y ventas de directivos de 357,7 M en 12 meses, casi todas del fundador en diciembre de 2025 con planes 10b5-1 [C1, D37].

**Valoración.** El DCF da 456,04 USD (+38,8 %). El precio descuenta un crecimiento de los ingresos del 1,9 % anual hasta FY2034e, frente al 7,1 % de nuestro caso base: comprar hoy rinde un 12,4 % anual, 2,6 puntos por encima del WACC. Cotiza a 15,5 veces el beneficio de los próximos 12 meses, frente a 22,1 de la mediana de comparables. Su historia (mediana adelantada de 49,1 veces) es de otro régimen: el selector elige la regla v2 y el objetivo a 12 meses solo cuenta con el crecimiento del BPA. De ahí el 20,6 % entre valor intrínseco y objetivo: la tesis de valor es a varios años.

**Riesgos y catalizadores.** El mayor riesgo es que los agentes de IA hagan gratis la declaración y la contabilidad básica (bajista: 217,11 USD, −33,9 %). La propia Intuit ya ofrece la declaración federal gratis con Credit Karma Tax desde el 20-oct, lo que puede recuperar cuota a costa del precio medio [D35]. Catalizadores: 1T FY2027 hacia el 19-nov y la campaña de enero-abril. Desde el informe del 10-oct la acción sube un 8,5 % sin cambio en las estimaciones; la rentabilidad a 12 meses sigue en el 14,6 % porque el base de la regla es el PER de hoy.

**Qué cambiaría la decisión.** Si la tienes, se mantiene mientras cotice por debajo de 342,27 USD (filtro de mantener de las pruebas de robustez: ponderada ≥ 10 % y base ≥ 5 %); por encima, se vendería. La banda Vender de la regla (ponderada ≤ −10 %) empieza en 418,19 USD. Para comprar, por debajo de 327,28 USD con la regla, pero la compra robusta (BPA −10 %) exige 295,21 USD y la sostenibilidad «En parte» la limita al nivel B2. Pasaríamos a Vender si las declaraciones federales de TurboTax caen más de un 3 % en 2027 o si el 1T incumple la guía de +11 %.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Intuit es el software financiero del contribuyente y de la pyme estadounidense: TurboTax prepara 39 millones de declaraciones federales y, con QuickBooks y Credit Karma, el grupo suma unos 100 millones de clientes entre consumidores, pymes y asesores [B4, A6]. Facturó 21.448 M en FY2026 (+14 %) con un margen EBIT del 28,8 % y un ROIC del 23,1 % [A1].

El precio de 328,45 USD, un 51,9 % por debajo del máximo de 52 semanas, descuenta que los ingresos crecen un 1,9 % anual hasta FY2034, cuando la guía de FY2027 da un +9-10 % y el marco del día del inversor un BPA creciendo en la parte alta de la decena [D36]. Cotiza a 12,7 veces el EBITDA, en el percentil 10 de su década [D6].

El mercado acierta en que TurboTax ha perdido poder de precios: perdió un punto de cuota del IRS y ahora regala la declaración federal con Credit Karma Tax [D36, D35]. Se equivoca al extenderlo a todo el grupo: GBS, sin Mailchimp, crecerá un 13-14 % y Credit Karma un 11-13 % según la guía [A6]. Para invertir hay que creer que la pyme seguirá pagando por QuickBooks aunque la declaración se abarate; a 12 meses, sin que vuelva el múltiplo, la rentabilidad esperada se queda en el 14,6 %.`,
  vision_diferencial: {
    mercado_descuenta: `Que la IA convierte la declaración de impuestos y la contabilidad básica en algo gratuito, que TurboTax entra en declive y que QuickBooks le sigue: un Intuit con un crecimiento del 1,9 % anual, valorado casi como H&R Block.`,
    nuestra_vision: `TurboTax crecerá poco (2-3 % en FY2027) y con menos precio, pero dos tercios del crecimiento vienen ya de pymes y Credit Karma, que crecen a doble dígito; un 7,1 % anual de media es prudente frente a la guía y al marco a tres años.`,
    por_que: `Porque la guía de FY2027 se dio en agosto, después de la peor campaña de TurboTax, y se reafirmó en septiembre con el beneficio operativo GAAP al +26-27 % [A6, D36]. Si la IA rompiera también QuickBooks, se vería primero en los clientes de QuickBooks Online, que siguen creciendo.`,
  },
  a_favor: [
    '**Precio de crisis**: 12,7 veces el EBITDA y 20 veces el beneficio, percentil 10 de la década [D6].',
    '**Guía de FY2027 reafirmada**: ingresos +9-10 % y beneficio operativo GAAP +26-27 % [A6, D36].',
    '**Pymes y Credit Karma**: GBS sin Mailchimp +13-14 % y Credit Karma +11-13 % previstos [A6].',
    '**Caja**: flujo libre del 9,7 % de la capitalización y deuda neta casi nula.',
    '**Recompras**: 7.900 M de autorización, un 9 % del capital al precio de hoy [A1].',
  ],
  en_contra: [
    '**TurboTax pierde cuota**: un punto del IRS en 2026; el precio es el primer motivo de baja [D36, A7].',
    '**Producto gratuito propio**: Credit Karma Tax regala la declaración federal desde el 20-oct [D35].',
    '**Compras caras**: Credit Karma y Mailchimp (19.200 M) bajaron el ROIC del 100 % al 13 % [A1].',
    '**Gobierno**: presidente y consejero delegado en la misma persona; ventas de directivos de 357,7 M [C2, D37].',
    '**Rebote sin cifras**: +22,5 % desde el 29-sep sin cambio en el consenso de BPA [D6, D3].',
  ],
  que_vigilar: `La tesis depende de que QuickBooks y Credit Karma sigan creciendo a doble dígito mientras TurboTax se estabiliza. La señal de que no ocurre sería un 1T FY2027 por debajo de la guía de +11 % (hacia el 19-nov) o una campaña fiscal de 2027 con las declaraciones de TurboTax cayendo más de un 3 %.`,
  cambiaria_recomendacion: [
    'Si la tienes: por encima de 342,27 USD (filtro de mantener) se vendería; la banda Vender de la regla (ponderada ≤ −10 %) empieza en 418,19 USD.',
    'Por debajo de 327,28 USD la regla daría Comprar; la compra robusta (BPA −10 %) exige 295,21 USD.',
    'Si las declaraciones federales de TurboTax caen más de un 3 % en 2027, pasaríamos a Vender.',
    'Si el 1T FY2027 incumple la guía de +11 % de ingresos o de 1,71-1,75 USD de BPA GAAP, revisaríamos el caso base hacia el bajista.',
    'Si TurboTax recupera cuota en la campaña de 2027 sin perder precio medio, subiríamos la convicción.',
  ],
  kpis_seguimiento: [
    { kpi: 'Declaraciones federales de TurboTax', nivel_actual: '39,0 millones (−2 %, 2026)', umbral_alerta: '< −3 % en 2027', por_que: 'Mide la erosión por la IA y el precio.' },
    { kpi: 'Crecimiento de GBS sin Mailchimp', nivel_actual: 'Guía FY2027: +13-14 %', umbral_alerta: '< 10 %', por_que: 'Es el motor del caso base.' },
    { kpi: 'Clientes de pago en línea', nivel_actual: '8,9 millones (+3 %)', umbral_alerta: 'Caída', por_que: 'La IA se vería primero aquí.' },
    { kpi: 'Credit Karma', nivel_actual: 'Guía FY2027: +11-13 %', umbral_alerta: '< 5 %', por_que: 'Segundo motor de crecimiento.' },
    { kpi: 'Margen operativo GAAP', nivel_actual: '27,4 % (FY2026); guía ≈ 32 %', umbral_alerta: '< 30 % en FY2027', por_que: 'Sostiene el salto de beneficio de la guía.' },
  ],
  confianza: 'Media',
};
