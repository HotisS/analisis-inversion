// Resumen ejecutivo (Intuit, corte 2026-10-10). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 430,22 USD, un 42,1 % por encima del precio de 302,75 USD, y con el dividendo la rentabilidad total esperada a 12 meses es del 43,7 %. El alcista gana un 71,6 % y el bajista pierde un 30,1 %: asimetría de 2,38 veces. Las dos reglas dan Comprar; con la prima de riesgo que hoy pide el mercado, el objetivo sube a 497,73 USD (+64,4 %). La razón en una frase: el precio descuenta que Intuit deja de crecer cuando su guía da un +9-10 % para FY2027. La convicción es media, la que sugieren los criterios, porque el bajista pierde más de un 25 %: el riesgo de la IA sobre TurboTax es real. Subiría si la campaña fiscal de 2027 recupera declaraciones y bajaría si TurboTax vuelve a perder cuota.

**El negocio.** Intuit es TurboTax (impuestos de particulares en EE. UU.), QuickBooks (contabilidad de pymes) y Credit Karma: 21.448 M de ingresos en FY2026 con un margen EBIT del 28,8 % y un ROIC del 23,1 % [A1]. Su calidad sostiene en parte el crecimiento del caso base (7,1 % anual, sin capital): las pymes y Credit Karma crecen a doble dígito, pero TurboTax ha agotado su poder de precios [A6, A7].

**Finanzas.** Los ingresos crecieron al 17,1 % anual en la década, con compras; el orgánico fue del 13-16 % en FY2023-FY2026. Genera un flujo libre del 10,6 % de su capitalización, aunque el de FY2026 está inflado por unos impuestos pagados excepcionalmente bajos [A1]. La deuda neta es casi nula. Credit Karma y Mailchimp (19.200 M) bajaron el ROIC del 100 % al 13 % en FY2023; Mailchimp no crece.

**Equipo y gobierno.** Neutro. 11 de 13 consejeros son independientes y la remuneración se aprueba con más del 91 % [C1, C2-C4]. Pero desde enero Goodarzi es a la vez presidente y consejero delegado, los directivos vendieron 357,7 M en 12 meses y la guía de FY2023 se incumplió en ingresos [C2, C12, C17].

**Valoración.** El DCF da 440,34 USD (+45,4 %). El DCF inverso dice que el precio supone un crecimiento de los ingresos del 1,2 % anual hasta FY2034e, frente al 7,1 % de nuestro caso base, o un margen EBITDA del 27,3 % en vez del 38,5 %: comprar hoy rinde un 13,2 % anual con nuestro caso base. Cotiza a 11,7 veces el EBITDA y 18,4 veces el beneficio, los mínimos de su década (medias de 35,7 y 52,3 veces), y por debajo del software comparable; comparables (400,82 USD) y transacciones (563,40) quedan por encima del precio. Discrepamos del mercado en la velocidad del daño de la IA.

**Riesgos y catalizadores.** El mayor riesgo es que los agentes de IA hagan gratis la declaración y la contabilidad básica, como les pasó a Chegg (bajista: 211,61 USD). La dirección admite que el precio ya es el primer motivo de baja en TurboTax [A7]. Catalizadores: resultados del 1T FY2027 a finales de noviembre (fecha estimada), la campaña fiscal de enero-abril de 2027 y recompras con 7.900 M pendientes.

**Qué cambiaría la decisión.** Seguiría siendo Comprar por debajo de 414,30 USD y pasaría a Vender por encima de 502,93 USD. Bajaríamos a Mantener si las declaraciones federales de TurboTax caen más de un 3 % en 2027 o si QuickBooks Online deja de ganar clientes.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Intuit es el software financiero del contribuyente y de la pyme estadounidense: TurboTax prepara 39 millones de declaraciones federales y, con QuickBooks y Credit Karma, el grupo suma unos 100 millones de clientes entre consumidores, pymes y asesores [B4, A6]. Facturó 21.448 M en FY2026 (+14 %) con un margen EBIT del 28,8 % [A1].

El precio de 302,75 USD, un 56 % por debajo del máximo de 52 semanas, descuenta que los ingresos casi dejan de crecer (1,2 % anual hasta FY2034) cuando la guía de FY2027 da un +9-10 %. Cotiza a 11,7 veces el EBITDA, el mínimo de su década [D6].

El mercado acierta en que TurboTax ha perdido poder de precios: cayeron las declaraciones federales en 2026 y la dirección lo admite [B4, A7]. Se equivoca al extenderlo a todo el grupo: GBS, sin Mailchimp, crecerá un 13-14 % y Credit Karma un 11-13 % según la guía [A6]. Para invertir hay que creer que la pyme seguirá pagando por QuickBooks aunque la declaración de impuestos se abarate.`,
  vision_diferencial: {
    mercado_descuenta: `Que la IA convierte la declaración de impuestos y la contabilidad básica en algo gratuito, que TurboTax entra en declive y que QuickBooks le sigue: un Intuit sin crecimiento, valorado como H&R Block.`,
    nuestra_vision: `TurboTax crecerá poco (2-3 % en FY2027) y con menos precio, pero dos tercios del crecimiento vienen ya de pymes y Credit Karma, que crecen a doble dígito; un 7,1 % anual de media es prudente frente a la guía.`,
    por_que: `Porque la guía de FY2027 se dio en agosto, después de la peor campaña de TurboTax, y sigue dando un +9-10 % con el beneficio operativo GAAP al +26-27 % [A6]. Si la IA rompiera también QuickBooks, se vería primero en los clientes de QuickBooks Online, que siguen creciendo.`,
  },
  a_favor: [
    '**Precio de crisis**: 11,7 veces el EBITDA y 18,4 veces el beneficio, mínimos de la década.',
    '**Guía de FY2027**: ingresos +9-10 % y beneficio operativo GAAP +26-27 % [A6].',
    '**Pymes y Credit Karma**: GBS sin Mailchimp +13-14 % y Credit Karma +11-13 % previstos [A6].',
    '**Caja**: flujo libre del 10,6 % de la capitalización y deuda neta casi nula.',
    '**Recompras**: 7.900 M de autorización, un 10 % del capital al precio de hoy.',
  ],
  en_contra: [
    '**TurboTax pierde clientes**: −2 % de declaraciones federales en 2026; el precio es el primer motivo de baja [B4, A7].',
    '**Riesgo de la IA**: Intuit ya cuenta a los asistentes de IA entre sus competidores [B1].',
    '**Compras caras**: Credit Karma y Mailchimp (19.200 M) bajaron el ROIC del 100 % al 13 % [A1].',
    '**Gobierno**: presidente y consejero delegado en la misma persona; ventas de directivos de 357,7 M [C2, C12].',
    '**Flujo de 2026 inflado** por impuestos pagados bajos [A1].',
  ],
  que_vigilar: `La tesis depende de que QuickBooks y Credit Karma sigan creciendo a doble dígito mientras TurboTax se estabiliza. La señal de que no ocurre sería una campaña fiscal de 2027 con las declaraciones de TurboTax cayendo más de un 3 % o un 1T FY2027 por debajo de la guía de +11 %.`,
  cambiaria_recomendacion: [
    'Si el precio supera 502,93 USD, pasaríamos a Vender.',
    'Si las declaraciones federales de TurboTax caen más de un 3 % en 2027, pasaríamos a Mantener.',
    'Si QuickBooks Online deja de ganar clientes, revisaríamos el caso base hacia el bajista.',
    'Si el 1T FY2027 incumple la guía de +11 % de ingresos, bajaríamos la convicción.',
    'Si TurboTax recupera cuota en la campaña de 2027, subiríamos la convicción.',
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
