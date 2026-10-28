// Textos del analista (Intuit, corte 2026-10-28). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria del NASDAQ (INTU), en dólares; precio de cierre del martes 27-oct-2026 (328,45 USD): la sesión del 28-oct, fecha de corte, no había abierto al hacer el análisis [D6]. Ejercicio a 31 de julio, nombrado por el año en que termina (FY2026 = ago-25 a jul-26). Acciones: 269,4 M diluidas, las del 31-jul-2026 más los derechos potenciales, para casar con la caja del mismo balance [D1]. EBITDA en US GAAP, con los pagos en acciones como gasto (9,6 % de las ventas en FY2026); el consenso de MarketScreener los sigue excluyendo y el motor resta un 8,6 % de las ventas (la previsión de la empresa para FY2027) [D3, A6]. Desde el 1-ago-2026 el no GAAP de Intuit sí los incluye: la guía de FY2027 no es comparable con las anteriores [A6]. Caja = efectivo e inversiones a corto plazo, sin los fondos de clientes; la deuda incluye 970 M de líneas sin recurso que financian préstamos a pymes de QuickBooks Capital [A1]. Segmentos: solo los dos actuales (GBS y Consumer) con resultado reexpresado para FY2024-FY2026; los ingresos de FY2018-FY2023 se reconstruyen con las líneas de ingresos de cada 10-K. FY2017 está reexpresado por la ASC 606 en la cuenta, no en el balance. El flujo de caja de FY2026 está inflado por unos impuestos pagados excepcionalmente bajos (281 M frente a 1.408 M en FY2025): el DCF usa un tipo normalizado [A1]. Los comparables se llevan del cierre del 9-oct al del 27-oct con la variación de su precio; su consenso de beneficio es el del 10-oct [D10-D19]. El análisis parte del informe del 10-oct-2026 (mismo 10-K): se han vuelto a comprobar las cuentas con el XBRL de la SEC, el precio, el consenso, la bolsa, las noticias y los directivos.`;

export const controles_explicados = [
  { control: 'Cambio de perímetro declarado (FY2020)', explicacion: 'El activo creció por la caja de la emisión de deuda y la financiación preparada para Credit Karma (cerrada en dic-2020, en FY2021), no por una compra en FY2020 [A4].' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'Con Shopify (62,0 veces) y Freshworks (41,8 veces) en la muestra, la mediana es frágil: por eso los comparables pesan solo un 15 %.' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'BILL y Block salen de márgenes muy bajos y el EBITDA previsto de Block parece cambiar de definición; pesan poco en la mediana [D14, D15].' },
];

const rentabilidad = {
  comentario: `**Intuit crea valor, pero mucho menos que antes de sus dos grandes compras.** El ROIC después de impuestos fue del 94-126 % de FY2017 a FY2020, con un negocio de software sin apenas capital. Credit Karma (7.200 M, dic-2020) y Mailchimp (12.000 M, nov-2021) lo hundieron al 12,6 % en FY2023 al multiplicar el capital invertido; desde entonces se ha recuperado al 23,1 % en FY2026, más del doble del WACC del 9,8 % [A1, A4]. Lo explica el margen EBIT, que ha vuelto del 21,3 % de FY2022 al 28,8 %. Mailchimp no ha rendido (ingresos de 1.267-1.287 M en FY2024-FY2026, sin crecer) y será segmento propio en FY2027 [A1].`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `Intuit cotiza a 12,7 veces el EBITDA de los últimos 12 meses y 20 veces el beneficio, en el percentil 10 de su década: la media fue de 35,7 y 52,3 veces, y el mínimo de 12,5 y 19,2 veces [D6]. La acción ha caído un 50,4 % en 2026 mientras el BPA GAAP subía un 20 %: es una caída de múltiplo, no de beneficio [D6, A1]. El rebote de octubre (+21,9 % en un mes) apenas la ha sacado de los mínimos. El mercado ha dejado de pagar a Intuit como un monopolio fiscal y contable y la valora como un negocio que la IA puede volver gratuito: la historia del PER es de otro régimen, y por eso la regla a 12 meses no supone que vuelva.`,
};

const comparables = {
  comentario: `Intuit cotiza a 10,2 veces el EBITDA de los próximos 12 meses y 15,5 veces el beneficio, por debajo de la mediana del software de pagos, nóminas y pymes (12,8 y 22,1 veces) pese a tener más margen (32,7 % frente al 16,6 %) y un crecimiento parecido (9,2 % frente al 12,9 %) [D10-D19]. Solo H&R Block y Adobe, con el mismo miedo a la IA, cotizan más bajo en PER (8,0 y 11,9 veces). Las medianas darían 412,65 USD (EV/EBITDA) y 467,17 USD (PER); la media de las dos, 439,91. La muestra es frágil (Shopify a 85,2 veces el beneficio): pesa un 15 %.`,
};

const transacciones = {
  comentario: `Cinco compras de software con múltiplo de ventas, de 6,6 a 10,6 veces (Credit Karma, Avalara, Coupa, Paycor y Dayforce), con primas del 27-77 % [D20-D30]. Darían 563,40 USD por acción, un 71,5 % por encima del precio, pero llevan prima de control y son de empresas sin el riesgo de la IA de hoy; con 88.000 M de capitalización una opa no es realista. Pesan un 5 %.`,
};

const sentimiento = {
  lectura: `El sentimiento ha mejorado con el rebote, pero sigue dividido. En Stocktwits dominan los operadores a corto plazo y el debate es si el rebote es rotación desde los valores de IA hacia el software castigado; en Seeking Alpha la mayoría de los autores es comprador desde septiembre, aunque el último (27-oct) rebaja a mantener por precio [E1, E2]. Entre los analistas no hay giro: 20 compras, 12 mantener y 2 ventas, igual que hace dos semanas [D5]. No hay euforia ni capitulación que contradiga las cifras; el riesgo que repiten los foros, la IA sobre TurboTax, ya está en el bajista.`,
};

export const secciones = { rentabilidad, multiplos_historicos, comparables, transacciones, sentimiento };

export const dcf_justificacion = {
  crecimiento: `FY2027e +9,5 %: la guía del 25-ago-2026 da 23.279-23.512 M (+9-10 %), con GBS sin Mailchimp +13-14 %, Credit Karma +11-13 %, TurboTax +2-3 % y Mailchimp plano, reafirmada el 17-sep; el marco a tres años del día del inversor da +10-15 % en empresas y +4-8 % en consumo [A6, D36]. El consenso da 23.411 M [D3]. Luego baja medio punto al año hasta el 4 % de FY2034e. La media del caso base (7,1 %) queda muy por debajo del 17,1 % anual de la década, que incluye las compras, y del 13-16 % orgánico de FY2023-FY2026 [A1].`,
  margenes: `Margen EBITDA GAAP del 35,5 % en FY2027e: la guía da un beneficio operativo GAAP de 7.408-7.490 M (+26-27 %), con ≈850 M de amortizaciones [A6]. Sube al 38,5 % en FY2030e por apalancamiento operativo y el recorte del 17 % de la plantilla [C9], frente al 32,7 % de FY2026 (sin la reestructuración) y al 31-32 % de FY2017-FY2020. El consenso, con los pagos en acciones restados, da un 36,3 % en FY2027e [D3]. En el día del inversor la empresa prometió 440 puntos básicos más de margen operativo GAAP en FY2027 y bajar los pagos en acciones al 8 % de las ventas en 2030 [D36].`,
  inversion: `Capex del 1,5 % de las ventas en FY2027e que sube al 2,5 %; el de FY2026 fue del 1,0 % [A1]. La amortización (3,9 %) incluye 659 M de intangibles de Credit Karma y Mailchimp y converge al capex. Circulante negativo (−1,2 % de las ventas), el de FY2026. Tipo impositivo normalizado del 22 %, por encima del de caja de FY2026, que se benefició de la nueva ley fiscal [A1].`,
  wacc: `Tasa libre del 4,99 %, el Tesoro de EE. UU. a 10 años del 27-oct-2026 (era el 5,22 % el 8-oct) [D7]. Beta de 0,96, la mensual a 5 años frente al S&P 500; la semanal a 2 años da 0,43, demasiado baja para un negocio con este riesgo [D6]. Prima de mercado del 5,5 %, coste de la deuda del 5,6 % (bono de 2036) y un 8,0 % de deuda a valor de mercado. WACC del 9,80 %; con la prima implícita del mercado (4,20 %), el 8,65 % [D8].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación en dólares de unos 2,5 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (4,49 %). El múltiplo de salida implícito es de 11,1 veces el EBITDA, por debajo de los 12,7 de hoy.`,
};

export const etapa2_justificacion = `No se usa. El ROIC (23,1 %) supera al WACC en más de 13 puntos, pero el riesgo de la IA sobre TurboTax hace que alargar el crecimiento sea la apuesta contraria a la que hoy hace el mercado.`;

export const dcf_lectura = `El DCF da 456,04 USD por acción, un 38,8 % por encima del precio, con un 62 % del valor en el terminal. **El precio sigue descontando que Intuit casi deja de crecer.** El DCF inverso dice que, con nuestros márgenes, los 328,45 USD de hoy suponen un crecimiento de los ingresos del 1,9 % anual de FY2027e a FY2034e, frente al 7,1 % de nuestro caso base y a una guía de +9-10 % para FY2027 reafirmada en septiembre; o, con nuestro crecimiento, un margen EBITDA del 28,4 % en vez del 38,5 %. Comprar a este precio rinde un 12,4 % anual si se cumple el caso base, 2,6 puntos por encima de su coste de capital (9,8 %). El rebote de octubre ha subido el crecimiento implícito del 1,2 % al 1,9 %: sigue siendo poco. Lo que el precio teme es que los agentes de IA conviertan la declaración y la contabilidad de la pyme en algo gratuito; la dirección admite que TurboTax perdió un punto de cuota del IRS y que el precio es el primer motivo de baja [D36, A7].`;

export const narrativas = {
  Bajista: `Los agentes de IA hacen la declaración de impuestos y la contabilidad básica casi gratis: TurboTax pierde clientes por precio y QuickBooks frena, como le pasó a Chegg con los asistentes de IA. Ingresos casi planos durante ocho años, margen EBITDA del 32,5 % y crecimiento a perpetuidad del 1,5 %.`,
  Base: `Se cumple la guía de FY2027 (+9-10 %) y el crecimiento baja medio punto al año, con QuickBooks Online y Credit Karma tirando y TurboTax plano: crecimiento medio del 7,1 % y margen EBITDA del 38,5 % desde FY2030.`,
  Alcista: `TurboTax Live y los servicios con expertos asistidos por IA siguen creciendo un 30 % y QuickBooks gana el mercado medio de empresas: crecimiento medio del 9,1 % y margen del 40 %.`,
};

export const escenarios_comentario = `La asimetría es aceptable pero no holgada: el alcista vale 538,41 USD (+63,9 %) y el bajista 217,11 (−33,9 %), 1,88 veces. El bajista no es cosmético: deja los ingresos casi planos ocho años y quita seis puntos de margen, lo que le pasó a Chegg cuando llegaron los asistentes de IA. El precio está más cerca del bajista que del base, porque el DCF inverso pide solo un 1,9 % anual. Con la prima de riesgo que hoy pide el mercado (4,20 %), el bajista sube a 249,91 USD. El valor ponderado por probabilidad es de 412,78 USD.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 %, comparables 15 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque la caja de Intuit es predecible (conversión del 164 % del beneficio en la década, inflada por la amortización de intangibles) y porque recoge el riesgo con un WACC del 9,8 %; los escenarios pesan un 25 % porque el riesgo de la IA es asimétrico. Los comparables (439,91 USD) pesan un 15 % por la fragilidad de la muestra, y las transacciones (563,40 USD) un 5 % porque llevan prima de control. Todos los métodos quedan por encima del precio de 328,45 USD; el valor objetivo es de 448,17 USD (+36,4 %). Ese es el valor intrínseco, no el precio a 12 meses: la regla común a 12 meses da 371,57 USD, porque no supone que el múltiplo vuelva a su historia.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 6.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Guía: GBS sin Mailchimp +13-14 % (clientes de QuickBooks Online +3 % y precio y mezcla), Credit Karma +11-13 %, TurboTax +2-3 % y Mailchimp plano; reparto entre volumen y precio, estimación propia [A6, A8].' },
    { periodo: 'FY2028e', volumen_pct: 5.5, precio_pct: 3.5, otros_pct: 0.0, comentario: 'El ingreso medio por cliente del ecosistema en línea subió un 15 % en FY2026, pero TurboTax aceptará menos precio para recuperar cuota [B4, A7].' },
    { periodo: 'FY2029e', volumen_pct: 5.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Consenso de ingresos de +8,7 % en FY2029e (27.749 M sobre 25.535 M) y marco del día del inversor (empresas +10-15 %, consumo +4-8 %) [D3, D36].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: `En parte. El 7,1 % anual del caso base no necesita capital (capex del 1,5-2,5 %) y tiene precedente: los ingresos orgánicos crecieron un 13-16 % en FY2023-FY2026 y QuickBooks Online sigue ganando clientes [A1, B4]. Pero el poder de precios de TurboTax se ha agotado: perdió un 2 % de declaraciones federales en 2026 y la dirección admite que el precio es el primer motivo de baja [B4, A7]. El crecimiento tendrá que venir de pymes y Credit Karma, no del negocio fiscal. Por eso el caso base baja del 9,5 % al 4 % y el bajista deja los ingresos planos.`,
};

export const catalizadores = {
  items: [
    { fecha: '19-nov-2026 (estimada)', evento: 'Resultados del 1T FY2027', efecto: 'Primera prueba de la guía (+11 % de ingresos y BPA GAAP de 1,71-1,75 USD en el 1T) y de QuickBooks Online', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Enero de 2027', evento: 'Junta y proxy de 2027', efecto: 'Primer año completo de Goodarzi como presidente y consejero delegado', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Enero-abril de 2027', evento: 'Campaña fiscal de 2027 (datos semanales del IRS) y estreno de Credit Karma Tax gratis', efecto: 'Dirá si TurboTax recupera cuota bajando precio y si el producto gratuito canibaliza', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mayo de 2027', evento: 'Resultados del 3T FY2027 (cierre de la campaña)', efecto: 'El trimestre que hundió la acción un 20 % en 2026', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Continuo', evento: 'Recompras (7.900 M de autorización pendiente)', efecto: 'Retirarían un 9 % del capital al precio de hoy', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Sin fecha', evento: 'Agentes fiscales de OpenAI, Google o Apple', efecto: 'La prueba del riesgo que el precio ya descuenta', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Los agentes de IA abaratan la declaración de impuestos y la contabilidad básica', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 217,11 USD, −52 % sobre el valor base y −33,9 % sobre el precio', mitigante: 'Datos fiscales propios, TurboTax Live con expertos y QuickBooks como sistema de registro de la pyme', senal: 'Declaraciones federales de TurboTax por debajo de −3 % en 2027' },
    { riesgo: 'Pérdida del poder de precios de TurboTax', tipo: 'Comercial', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'El DCF inverso ya solo pide un 1,9 % anual; el bajista lo recoge', mitigante: 'Más volumen con menos precio, según la dirección', senal: 'Ingresos de TurboTax por debajo del +2 % en FY2027' },
    { riesgo: 'Mailchimp estancado y posible deterioro', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Costó 12.000 M; ingresos planos en 1.270-1.290 M', mitigante: 'Ningún deterioro hasta FY2026', senal: 'Mailchimp con ingresos a la baja como segmento propio' },
    { riesgo: 'Regulación: Direct File del IRS, publicidad de «gratis» (FTC) y demandas de accionistas', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Direct File está suspendido para 2026', mitigante: 'Acuerdo Free File hasta 2029', senal: 'Vuelta de Direct File' },
    { riesgo: 'Coste de capital: Tesoro al 4,99 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC del 10,8 %: el DCF baja a 396,92 USD, aún +20,8 %', mitigante: 'Deuda neta casi nula y flujo libre del 9,7 % de la capitalización', senal: 'Tesoro por encima del 5,75 %' },
    { riesgo: 'Cúpula: presidente y consejero delegado en la misma persona desde enero de 2026 y ventas de directivos de 357,7 M en 12 meses', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'No cambia el valor', mitigante: '11 de 13 consejeros independientes', senal: 'Más ventas fuera de planes 10b5-1' },
  ],
  ia: { exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−34 % en el bajista (217,11 USD); +18 % en el alcista sobre el base (538,41 USD)', comentario: 'La IA toca casi todo el negocio. Amenaza a TurboTax (5.296 M de ingresos en FY2026, un 25 % del grupo [B4]), cuyo producto de hágalo usted mismo pueden replicar gratis los asistentes generales: la empresa ya perdió un punto de cuota del IRS por precio y responde regalando la declaración federal con Credit Karma Tax [D36, D35]. Es a la vez la palanca de QuickBooks y de los servicios con experto: más del 75 % de los clientes de Intuit Enterprise Suite usan sus agentes cada mes y TurboTax Live ya da más de la mitad de los ingresos de TurboTax [D36, D35]. Y abarata su propio coste: el 70 % del código nuevo lo entrega la IA. Señal que avisaría: declaraciones federales de TurboTax cayendo más de un 3 % en la campaña de 2027 o clientes de QuickBooks Online a la baja.' },
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 197 USD. La historia más probable empieza en la campaña fiscal de 2027: OpenAI y Apple integran la preparación de la declaración en sus asistentes, gratis para la mayoría de los contribuyentes, y TurboTax pierde un 8 % de declaraciones aunque baje precios. En 2028 los asistentes empiezan a llevar también la contabilidad básica de autónomos y micropymes, y QuickBooks Online frena al 5 %. El margen aguanta un tiempo con los recortes de plantilla, pero el mercado deja de ver crecimiento y valora a Intuit como a H&R Block, a 6 veces el EBITDA. El indicador que lo habría anticipado: las declaraciones federales a la baja en 2026 y la admisión de que el precio era el primer motivo de baja.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'TurboTax', pregunta: '¿Cuánto ingreso medio por cliente está dispuesta a ceder TurboTax para recuperar cuota, y qué efecto tendrá en el margen?', por_que: 'El precio descuenta que el negocio fiscal se encoge.' },
    { tema: 'IA', pregunta: '¿Qué parte de los clientes perdidos se fue a soluciones con IA y qué parte a Free File o a gestores?', por_que: 'Decide si el riesgo es estructural o de precio.' },
    { tema: 'Credit Karma Tax', pregunta: '¿Cuántos clientes de pago de TurboTax pueden pasarse a Credit Karma Tax gratis, y cuánto ingreso por cliente se pierde con ello?', por_que: 'La declaración federal gratis puede recuperar cuota a costa del precio medio.' },
    { tema: 'QuickBooks', pregunta: '¿Cuántos clientes de QuickBooks Online ganó y perdió en FY2026, y con qué ingreso medio?', por_que: 'Es el motor del caso base.' },
    { tema: 'Mailchimp', pregunta: '¿Qué plan hay para Mailchimp como segmento propio y se ha valorado su venta?', por_que: 'Costó 12.000 M y no crece.' },
    { tema: 'Impuestos', pregunta: '¿Qué tipo impositivo de caja espera después de FY2026?', por_que: 'El flujo de caja de FY2026 está inflado por impuestos bajos.' },
    { tema: 'Recompras', pregunta: '¿Acelerará las recompras al precio actual, con 7.900 M de autorización pendiente?', por_que: 'A este precio retirarían un 9 % del capital.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

// ---- Añadido en el análisis del 28-oct-2026 ----
export const objetivo_12m = {
  ejercicio: 'FY2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 16.27, multiplo: null, precio: null, justificacion: 'BPA GAAP propio de FY2028e con el bajista del DCF: ingresos +2,5 % y +2,0 % (22.424 M), margen EBITDA del 31 %, amortización de 896 M, resultado financiero de −50 M, impuestos del 27 % y 269,4 M de acciones: 16,27 USD, casi el BPA de FY2026 (16,46).' },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 23.1, multiplo: null, precio: null, justificacion: 'BPA GAAP propio: ingresos +9,5 % y +9,0 % (25.599 M, guía de FY2027 y marco del día del inversor), margen EBITDA del 37 %, amortización del 3,5 %, −50 M financieros, impuestos del 27 % (guía GAAP) y 269,4 M de acciones sin recompras: 23,10 USD.' },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 25.04, multiplo: null, precio: null, justificacion: 'BPA GAAP propio con el alcista: ingresos +11,5 % y +11,0 % (26.545 M), margen EBITDA del 38,5 %, mismas partidas por debajo del EBIT: 25,04 USD. Exige que TurboTax Live y QuickBooks Online sigan a doble dígito.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 16.4, mediana_5a: 49.1, minimo_5a: 47.4, media_larga: 48.3, anios: 5,
    excluidos: 'Historia ADELANTADA en BPA GAAP publicado (precio de cierre a 31 de julio ÷ BPA GAAP real del ejercicio siguiente): FY2017 27,0x; FY2018 34,7x; FY2019 40,1x; FY2020 40,5x; FY2021 72,8x; FY2022 54,2x; FY2023 49,1x; FY2024 47,4x; FY2025 47,7x. El cierre de FY2026 (316,07 ÷ nuestro BPA de FY2027e de 20,04 = 15,8x) queda fuera por atípico: es menos de un tercio de la mediana del resto (48,4x), la regla común. Ventana de cinco años FY2021-FY2025; media larga de ocho (FY2018-FY2025). Actual: 328,45 ÷ 20,04 = 16,4x.',
    v2: { actual: 16.4, mediana_5a: 60.8, minimo_5a: 19.2, media_larga: 50.5, base: 'cierre', base_bpa: 'publicado' },
  },
  comparables_per: { mediana: 22.1 },
  consenso: { bpa_ano1: 20.34, bpa_ano2: 23.61, objetivo_medio: 406.92, objetivo_min: 290, objetivo_max: 732, analistas: 34, tendencia_3m: 'estables', fuente: 'MarketScreener (27-oct-2026) y Stock Analysis (S&P Global) [D3, D5]' },
  diferencia_consenso: 'Nuestro BPA GAAP de FY2028e (23,10) queda un 2,2 % por debajo del consenso (23,61) y el de FY2027e (20,04) un 1,5 % por debajo (20,34): las ventas casi coinciden (25.599 M frente a 25.535 M) y la diferencia es de margen e impuestos (27 %). La distancia con el objetivo medio de los analistas (406,92) es de múltiplo: la calle paga unas 17 veces el BPA de FY2028e y la regla común, que con la historia de otro régimen elige la v2, se queda en el PER de hoy.',
  media: null,
  comentario: 'El valor intrínseco (448,17 USD, +36,4 %) queda un 20,6 % por encima del objetivo a 12 meses ponderado (371,57 USD; +14,6 % con el dividendo, base +16,8 %). La distancia es de múltiplo: el valor intrínseco supone que el negocio sigue creciendo al 7 % y lo descuenta al 9,8 %, mientras que la regla a 12 meses, con la historia del PER de otro régimen, solo cuenta con que el BPA crezca al PER de hoy (16,4 veces). Para cerrarla haría falta que el mercado vuelva a pagar más de 20 veces el beneficio, y eso exige una campaña fiscal de 2027 que demuestre que TurboTax deja de perder cuota.',
};

export const contexto = {
  movimiento: { fecha: '2026-10-27', var_1m_pct: 21.9, var_3m_pct: -1.4, var_6m_pct: -18.0, var_12m_pct: -51.9, dist_max_52s_pct: -51.9, dist_min_52s_pct: 28.8, dist_max_historico_pct: -59.3, tendencia: 'bajista', volatilidad_60d_pct: 43.6, avisos: [] },
  movimientos_fuertes: [
    { periodo: 'may-jun-2026', var_pct: -33.3, causa: 'Resultados del 3T FY2026 (21-may, −20,0 % en un día): recorte de la guía de TurboTax y anuncio del recorte del 17 % de la plantilla; el 2-jun cayó otro 8,9 % con el sector [A7, C9, D6].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-ago-2026', var_pct: 30.4, causa: 'Rebote desde el mínimo de 252,84 USD (22-jun) hasta 367 USD el 21-ago, con la vuelta del software y antes de la guía del FY2027 [D6].', veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-2026', var_pct: -25.4, causa: 'De 359,30 USD (31-ago) a 268,03 USD (29-sep): la guía del FY2027 (+9-10 %, TurboTax +2-3 %), las rebajas de Bank of America y Wolfe y el reconocimiento en el día del inversor (17-sep) de que TurboTax perdió un punto de cuota por precio; fue de los peores valores del S&P 500 en septiembre [D33, D36, D32].', veredicto: 'no cambia', condicion: null },
    { periodo: 'oct-2026', var_pct: 22.5, causa: 'Rebote desde el mínimo del 29-sep: compra de Sequence (15-oct, +6,4 %) y +5,7 % el 22-oct, día en que H&R Block subió un 4,7 % y el S&P 500 cayó un 1,2 %, sin noticia propia localizada; sin cambios en las estimaciones de BPA [D33, D38, D3].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-08-26', tipo: 'recomendación', hecho: 'Bank of America rebaja a neutral (objetivo 360 USD) y Wolfe a peer perform tras la guía del FY2027 [D33].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-17', tipo: 'resultados', hecho: 'Día del inversor: reafirma la guía del 1T y del FY2027, marco a tres años (empresas +10-15 %, consumo +4-8 %, BPA no GAAP en la parte alta de la decena) y admite la pérdida de un punto de cuota del IRS en TurboTax, con el precio como primer motivo de baja [D36].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-15', tipo: 'fusión u oferta', hecho: 'Acuerdo para comprar Sequence, plataforma de facturación e ingresos con IA (serie A), para QuickBooks Online Advanced e Intuit Enterprise Suite; importe no publicado, inmaterial frente a 88.000 M de capitalización [D34].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-20', tipo: 'resultados', hecho: 'Lanza Credit Karma Tax: declaración federal gratis y estatal por 15 USD, para contribuyentes jóvenes de menos de 50.000 USD; más de la mitad de los ingresos de TurboTax ya viene de los servicios con experto [D35].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-12', tipo: 'recomendación', hecho: 'Reiteraciones sin cambio de tono: Morgan Stanley mantener (315 USD), Citi compra (416), RBC compra (385); Goldman venta (304, 24-sep) [D5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-27', tipo: 'directivos', hecho: 'Ventas de consejeros y directivos de 357,7 M USD en 12 meses (327,5 M del fundador Scott Cook en diciembre de 2025), casi todas con planes 10b5-1; compras de 0,54 M; ninguna venta relevante desde agosto [D37].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-19', tipo: 'resultados', hecho: 'Resultados del 1T FY2027 (fecha estimada; la empresa aún no la ha anunciado): guía de ingresos de 4.294-4.313 M (+11 %) y BPA GAAP de 1,71-1,75 USD [D32, A6].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2026-11-19',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción sube un 21,9 % en un mes y un 22,5 % desde el mínimo del 29-sep, pero sigue un 51,9 % por debajo del máximo de 52 semanas y bajo la media de 200 sesiones (tendencia bajista) [D6]. El rebote no viene de las cifras: el consenso de BPA no se ha movido (20,34 USD en FY2027e) y las noticias del mes son una compra pequeña (Sequence) y un producto gratuito (Credit Karma Tax) [D3, D34, D35]. No hay colocaciones, ampliaciones ni litigios pendientes que puedan mover el precio más de un 5 %; los resultados del 19-nov no retrasan nada (regla 11). Veredicto: no cambia.',
};
