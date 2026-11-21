// Resumen ejecutivo (Intuit, corte 2026-11-20). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 301,08 USD (nuestro BPA GAAP de FY2028e por el PER de la regla común), un 13,1 % de rentabilidad ponderada con el dividendo y un 15,2 % en el caso base, frente a un precio de 270,44 USD (cierre del 20-nov). No llega a Comprar (15 % ponderada): el límite de compra de la regla es 266,04 USD, un 1,6 % por debajo. El valor intrínseco es de 426,00 USD (+57,5 %) y el objetivo medio de los analistas, 407,89, de antes de las cinco rebajas del 20-nov. La convicción es baja porque la ponderada está a menos de 2 puntos del umbral de compra y el precio a menos de un 3 % del filtro de mantener.

**Qué ha pasado.** El 1T FY2027 fue bueno: ingresos de 4.354 M (+12 %) y BPA GAAP de 2,59 USD, por encima del techo de la guía [A10]. Pero la guía de ingresos del año baja a +8-9 % porque Credit Karma frena (+3-7 %, antes +11-13 %) por los tipos y porque los consumidores buscan ya préstamos y tarjetas en los asistentes de IA, y el 2T se guía en +6-7 % porque TurboTax baja precios [A10, A14]. El beneficio operativo y el BPA del año no cambian. Además vende Mailchimp a Bending Spoons por 3.680 M, menos de un tercio de lo que pagó; el efectivo irá a recompras [A12]. La acción cayó un 12,8 % el 20-nov, un día de venta general del software [D7].

**El negocio.** TurboTax, QuickBooks y Credit Karma facturaron 21.448 M en FY2026 con un margen EBIT del 28,8 % y un ROIC del 23,1 %, 13,2 puntos por encima del WACC del 9,9 % [A1]. La calidad sostiene **en parte** el crecimiento del caso base (6,4 % anual, sin capital): QuickBooks Online crece un 19 %, pero TurboTax ha perdido poder de precios y Credit Karma se enfrenta a la IA [A10, A14].

**Finanzas.** Flujo libre del 12,5 % de la capitalización y deuda neta ajustada de 1.623 M a 31-oct [D1]. En el 1T recompró 1.472 M y quedan 6.400 M autorizados [A11]. Nuestro BPA GAAP de FY2027e (20,21 USD) cae dentro de la guía reiterada (20,12-20,36).

**Equipo y gobierno.** Neutro: 11 de 13 consejeros independientes, pero presidente y consejero delegado en la misma persona; tres directivos tienen planes de venta nuevos desde diciembre y hay dos demandas derivadas de accionistas [C1, C24].

**Valoración.** El DCF da 429,20 USD (+58,7 %). El precio descuenta que los ingresos bajan un 0,8 % al año hasta FY2034e, frente al 6,4 % de nuestro caso base: comprar hoy rinde un 13,9 % anual, 4,0 puntos por encima del WACC. Cotiza a 12,7 veces el beneficio de los próximos 12 meses, frente a 20,4 de la mediana de comparables. Su historia (mediana adelantada de 49,1 veces) es de otro régimen: el selector elige la regla v2 y el objetivo a 12 meses solo cuenta con el crecimiento del BPA. De ahí el 41,5 % entre valor intrínseco y objetivo: la tesis de valor es a varios años. La venta de Mailchimp es casi neutra para el valor y el BPA.

**Riesgos y catalizadores.** El mayor riesgo es que los agentes de IA hagan gratis la declaración y la contabilidad básica y se queden con la búsqueda de productos financieros (bajista: 202,61 USD, −25,1 %). Catalizadores: cierre de Mailchimp y recompras a principios de 2027, campaña fiscal de enero-abril y 2T FY2027 hacia finales de febrero. Frente al 28-oct: precio 328,45 → 270,44 (−17,7 %); rentabilidad ponderada 14,6 → 13,1 %; valor intrínseco 448,17 → 426,00; filtro de mantener 342,27 → 278,13.

**Qué cambiaría la decisión.** Si la tienes, se mantiene mientras cotice por debajo de 278,13 USD (filtro de mantener de las pruebas de robustez: ponderada ≥ 10 % y base ≥ 5 %); por encima, se vendería. La banda Vender de la regla (ponderada ≤ −10 %) empieza en 339,94 USD. Para comprar, por debajo de 266,04 USD con la regla, pero la compra robusta (BPA −10 %) exige 239,96 USD, y con la sostenibilidad «En parte» no tiene nivel A ni B. Pasaríamos a Vender si las declaraciones federales de TurboTax caen más de un 3 % en 2027 o si Credit Karma pasa a negativo.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Intuit es el software financiero del contribuyente y de la pyme estadounidense: TurboTax, QuickBooks y Credit Karma facturaron 21.448 M en FY2026 (+14 %) con un margen EBIT del 28,8 % y un ROIC del 23,1 % [A1].

El precio de 270,44 USD, un 60 % por debajo del máximo de 52 semanas, descuenta que los ingresos bajan un 0,8 % al año hasta FY2034, cuando la guía de FY2027 da un +8-9 % tras un 1T al +12 % [A10, D7]. Cotiza a 10,0 veces el EBITDA, por debajo del mínimo de su década.

El mercado acierta en que la IA ya muerde: TurboTax baja precios y Credit Karma frena porque los consumidores buscan productos financieros en los asistentes [A14]. Se equivoca al extenderlo a todo el grupo: GBS sin Mailchimp crecerá un 13-14 % y QuickBooks Online crece un 19 % [A10]. Para invertir hay que creer que la pyme seguirá pagando por QuickBooks aunque la declaración se abarate; a 12 meses, sin que vuelva el múltiplo, la rentabilidad esperada se queda en el 13,1 %.`,
  vision_diferencial: {
    mercado_descuenta: `Que la IA convierte la declaración de impuestos, la contabilidad básica y la búsqueda de productos financieros en algo gratuito: un Intuit con ingresos a la baja, valorado casi como H&R Block.`,
    nuestra_vision: `TurboTax crecerá poco y con menos precio y Credit Karma frena, pero el grueso del crecimiento viene ya de las pymes, que crecen a doble dígito; un 6,4 % anual de media es prudente frente a la guía.`,
    por_que: `Porque la guía de FY2027 mantiene el beneficio operativo GAAP de 7.408-7.490 M (+26-27 %) aun con Credit Karma rebajado, y el 1T superó la guía en todo [A10]. Si la IA rompiera también QuickBooks, se vería primero en los clientes de QuickBooks Online, que siguen creciendo.`,
  },
  a_favor: [
    '**Precio de crisis**: 10,0 veces el EBITDA y 15,5 veces el beneficio, por debajo del mínimo de la década [D7].',
    '**Beneficio del año sin cambios**: BPA GAAP de 20,12-20,36 USD reiterado [A10].',
    '**Pymes**: QuickBooks Online +19 % y GBS sin Mailchimp +15 % en el 1T [A10].',
    '**Caja**: flujo libre del 12,5 % de la capitalización y deuda neta casi nula [D1].',
    '**Recompras**: 6.400 M de autorización y 3.310 M en efectivo de Mailchimp [A11, A12].',
  ],
  en_contra: [
    '**Credit Karma frena por la IA**: guía de +3-7 % frente a +11-13 % [A10, A14].',
    '**TurboTax baja precios**: Consumer cae a un dígito medio en el 2T [A14].',
    '**Compras caras**: Mailchimp se vende por un 31 % de lo pagado [A12, D27].',
    '**Gobierno**: presidente y consejero delegado en la misma persona; planes de venta nuevos de la cúpula [C24].',
    '**Consenso por revisar**: el de ventas sigue por encima de la nueva guía [D11].',
  ],
  que_vigilar: `La tesis depende de que QuickBooks siga creciendo a doble dígito mientras TurboTax y Credit Karma se estabilizan. La señal de que no ocurre sería un 2T FY2027 por debajo de la guía de +6-7 % (finales de febrero) o una campaña fiscal de 2027 con las declaraciones de TurboTax cayendo más de un 3 %.`,
  cambiaria_recomendacion: [
    'Si la tienes: por encima de 278,13 USD (filtro de mantener) se vendería; la banda Vender de la regla (ponderada ≤ −10 %) empieza en 339,94 USD.',
    'Por debajo de 266,04 USD la regla daría Comprar; la compra robusta (BPA −10 %) exige 239,96 USD, y sin nivel A ni B por la sostenibilidad «En parte».',
    'Si las declaraciones federales de TurboTax caen más de un 3 % en 2027, pasaríamos a Vender.',
    'Si Credit Karma pasa a negativo en el 2T, revisaríamos el caso base hacia el bajista.',
    'Si TurboTax recupera cuota en la campaña de 2027 sin perder mucho precio medio, subiríamos la convicción.',
  ],
  kpis_seguimiento: [
    { kpi: 'Declaraciones federales de TurboTax', nivel_actual: 'Caída de cuota en 2026', umbral_alerta: '< −3 % en 2027', por_que: 'Mide la erosión por la IA y el precio.' },
    { kpi: 'Crecimiento de GBS sin Mailchimp', nivel_actual: '+15 % en el 1T; guía FY2027: +13-14 %', umbral_alerta: '< 10 %', por_que: 'Es el motor del caso base.' },
    { kpi: 'QuickBooks Online', nivel_actual: '+19 % en el 1T', umbral_alerta: '< 12 %', por_que: 'La IA se vería primero aquí.' },
    { kpi: 'Credit Karma', nivel_actual: '+9 % en el 1T; guía FY2027: +3-7 %', umbral_alerta: 'Negativo', por_que: 'El nuevo frente de la IA.' },
    { kpi: 'Margen operativo GAAP', nivel_actual: '19,9 % en el 1T; guía FY2027 ≈ 32 %', umbral_alerta: '< 30 % en FY2027', por_que: 'Sostiene el BPA de la guía.' },
  ],
  confianza: 'Media',
};
