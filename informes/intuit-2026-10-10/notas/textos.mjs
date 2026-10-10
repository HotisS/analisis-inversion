// Textos del analista (Intuit, corte 2026-10-10). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria del NASDAQ (INTU), en dólares; precio de cierre del viernes 9-oct-2026 (302,75 USD; el corte cae en sábado) [D6]. Ejercicio a 31 de julio, nombrado por el año en que termina (FY2026 = ago-25 a jul-26). Acciones: 269,4 M diluidas, las del 31-jul-2026 más los derechos potenciales, para casar con la caja del mismo balance [D1]. EBITDA en US GAAP, con los pagos en acciones como gasto (9,6 % de las ventas en FY2026); el consenso de MarketScreener los sigue excluyendo y el motor resta un 8,6 % de las ventas (la previsión de la empresa para FY2027) [D3, A6]. Desde el 1-ago-2026 el no GAAP de Intuit sí los incluye: la guía de FY2027 no es comparable con las anteriores [A6]. Caja = efectivo e inversiones a corto plazo, sin los fondos de clientes; la deuda incluye 970 M de líneas sin recurso que financian préstamos a pymes de QuickBooks Capital [A1]. Segmentos: solo los dos actuales (GBS y Consumer) con resultado reexpresado para FY2024-FY2026; los ingresos de FY2018-FY2023 se reconstruyen con las líneas de ingresos de cada 10-K. FY2017 está reexpresado por la ASC 606 en la cuenta, no en el balance. El flujo de caja de FY2026 está inflado por unos impuestos pagados excepcionalmente bajos (281 M frente a 1.408 M en FY2025): el DCF usa un tipo normalizado [A1].`;

export const controles_explicados = [
  { control: 'Cambio de perímetro declarado (FY2020)', explicacion: 'El activo creció por la caja de la emisión de deuda y la financiación preparada para Credit Karma (cerrada en dic-2020, en FY2021), no por una compra en FY2020 [A4].' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'Con Shopify (63,9 veces) y Freshworks en la muestra, la mediana es frágil: por eso los comparables pesan solo un 15 %.' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'BILL y Block salen de márgenes muy bajos y el EBITDA previsto de Block parece cambiar de definición; pesan poco en la mediana [D14, D15].' },
];

const rentabilidad = {
  comentario: `**Intuit crea valor, pero mucho menos que antes de sus dos grandes compras.** El ROIC después de impuestos fue del 94-126 % de FY2017 a FY2020, con un negocio de software sin apenas capital. Credit Karma (7.200 M, dic-2020) y Mailchimp (12.000 M, nov-2021) lo hundieron al 12,6 % en FY2023 al multiplicar el capital invertido; desde entonces se ha recuperado al 23,1 % en FY2026, más del doble del WACC del 10,0 % [A1, A4]. Lo explica el margen EBIT, que ha vuelto del 21,3 % de FY2022 al 28,8 %. Mailchimp no ha rendido (ingresos de 1.267-1.287 M en FY2024-FY2026, sin crecer) y será segmento propio en FY2027 [A1].`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `Intuit cotiza a 11,7 veces el EBITDA de los últimos 12 meses y 18,4 veces el beneficio, los mínimos de su década: la media fue de 35,7 y 52,3 veces, y el mínimo anterior de 12,5 veces el EBITDA [D6]. La acción ha caído un 54,3 % en 2026 mientras el BPA GAAP subía un 20 %: es una caída de múltiplo, no de beneficio [D6, A1]. El mercado ha dejado de pagar a Intuit como un monopolio fiscal y contable y la valora como un negocio que la IA puede convertir en gratuito.`,
};

const comparables = {
  comentario: `Intuit cotiza a 9,5 veces el EBITDA de los próximos 12 meses y 14,5 veces el beneficio, por debajo de la mediana del software de pagos, nóminas y pymes (12,2 y 19,6 veces) pese a tener más margen (32,7 % frente al 16,6 %) y un crecimiento parecido (9,2 % frente al 12,9 %) [D10-D19]. Solo H&R Block (5,2 veces) y Adobe (8,4 veces), con el mismo miedo a la IA, cotizan más bajo. La mediana daría 400,82 USD. La muestra es frágil (Shopify a 63,9 veces): pesa un 15 %.`,
};

const transacciones = {
  comentario: `Cinco compras de software con múltiplo de ventas, de 6,6 a 10,6 veces (Credit Karma, Avalara, Coupa, Paycor y Dayforce), con primas del 27-77 % [D20-D30]. Darían 563,40 USD por acción, casi el doble del precio, pero llevan prima de control y son de empresas sin el riesgo de la IA de hoy; con 81.000 M de capitalización una opa no es realista. Pesan un 5 %.`,
};

const sentimiento = {
  lectura: `Hay muy poco debate abierto que leer: dos opiniones de gestores en julio-agosto, una de venta (frenazo, despidos, amenaza a TurboTax) y una de compra (dominio en pymes y finanzas personales) [1]. Los analistas han pasado de 28 compras y ninguna venta en mayo a 20 compras y 2 ventas en octubre [D4]. El pesimismo está en el precio (−54 % en el año), no en un sentimiento extremo de los comentarios. Los foros de particulares no se pudieron leer.`,
};

export const secciones = { rentabilidad, multiplos_historicos, comparables, transacciones, sentimiento };

export const dcf_justificacion = {
  crecimiento: `FY2027e +9,5 %: la guía del 25-ago-2026 da 23.279-23.512 M (+9-10 %), con GBS sin Mailchimp +13-14 %, Credit Karma +11-13 %, TurboTax +2-3 % y Mailchimp plano [A6]. El consenso da 23.408 M [D3]. Luego baja medio punto al año hasta el 4 % de FY2034e. La media del caso base (7,1 %) queda muy por debajo del 17,1 % anual de la década, que incluye las compras, y del 13-16 % orgánico de FY2023-FY2026 [A1].`,
  margenes: `Margen EBITDA GAAP del 35,5 % en FY2027e: la guía da un beneficio operativo GAAP de 7.408-7.490 M (+26-27 %), con ≈850 M de amortizaciones [A6]. Sube al 38,5 % en FY2030e por apalancamiento operativo y el recorte del 17 % de la plantilla [C9], frente al 32,7 % de FY2026 (sin la reestructuración) y al 31-32 % de FY2017-FY2020. El consenso, con los pagos en acciones restados, da un 36,3 % en FY2027e [D3].`,
  inversion: `Capex del 1,5 % de las ventas en FY2027e que sube al 2,5 %; el de FY2026 fue del 1,0 % [A1]. La amortización (3,9 %) incluye 659 M de intangibles de Credit Karma y Mailchimp y converge al capex. Circulante negativo (−1,2 % de las ventas), el de FY2026. Tipo impositivo normalizado del 22 %, por encima del de caja de FY2026, que se benefició de la nueva ley fiscal [A1].`,
  wacc: `Tasa libre del 5,22 %, el Tesoro de EE. UU. a 10 años del 8-oct-2026 [D7]. Beta de 0,97, la mensual a 5 años frente al S&P 500; la semanal a 2 años da 0,48, demasiado baja para un negocio con este riesgo [D6]. Prima de mercado del 5,5 %, coste de la deuda del 5,6 % (bono de 2036) y un 8,6 % de deuda a valor de mercado. WACC del 10,02 %; con la prima implícita del mercado (4,20 %), el 8,87 % [D8].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación en dólares de unos 2,5 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (4,72 %). El múltiplo de salida implícito es de 10,7 veces el EBITDA, por debajo de los 11,7 de hoy.`,
};

export const etapa2_justificacion = `No se usa. El ROIC (23,1 %) supera al WACC en más de 13 puntos, pero el riesgo de la IA sobre TurboTax hace que alargar el crecimiento sea la apuesta contraria a la que hoy hace el mercado.`;

export const dcf_lectura = `El DCF da 440,34 USD por acción, un 45,4 % por encima del precio, con un 61 % del valor en el terminal. **El precio descuenta que Intuit deja de crecer.** El DCF inverso dice que, con nuestros márgenes, los 302,75 USD de hoy suponen un crecimiento de los ingresos del 1,2 % anual de FY2027e a FY2034e, frente al 7,1 % de nuestro caso base y a una guía de +9-10 % para FY2027; o, con nuestro crecimiento, un margen EBITDA del 27,3 % en vez del 38,5 %. Comprar a este precio rinde un 13,2 % anual si se cumple el caso base, tres puntos por encima de su coste de capital. Lo que el precio teme es que los agentes de IA conviertan la declaración de impuestos y la contabilidad de la pyme en algo gratuito: la propia dirección admite que el precio ya es el primer motivo por el que se van los clientes de TurboTax [A7].`;

export const narrativas = {
  Bajista: `Los agentes de IA hacen la declaración de impuestos y la contabilidad básica casi gratis: TurboTax pierde clientes por precio y QuickBooks frena, como le pasó a Chegg con los asistentes de IA. Ingresos casi planos durante ocho años, margen EBITDA del 32,5 % y crecimiento a perpetuidad del 1,5 %.`,
  Base: `Se cumple la guía de FY2027 (+9-10 %) y el crecimiento baja medio punto al año, con QuickBooks Online y Credit Karma tirando y TurboTax plano: crecimiento medio del 7,1 % y margen EBITDA del 38,5 % desde FY2030.`,
  Alcista: `TurboTax Live y los servicios con expertos asistidos por IA siguen creciendo un 30 % y QuickBooks gana el mercado medio de empresas: crecimiento medio del 9,1 % y margen del 40 %.`,
};

export const escenarios_comentario = `La asimetría es buena: el alcista vale 519,38 USD (+71,6 %) y el bajista 211,61 (−30,1 %), 2,38 veces. El bajista no es cosmético: deja los ingresos casi planos ocho años y quita seis puntos de margen, lo que le pasó a Chegg cuando llegaron los asistentes de IA. Aun así, el precio está más cerca del bajista que del base, porque el DCF inverso ya pide un 1,2 % anual. Con la prima de riesgo que hoy pide el mercado (4,20 %), el bajista sube a 242,69 USD. El valor ponderado por probabilidad es de 398,97 USD.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 %, comparables 15 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque la caja de Intuit es predecible (conversión del 164 % del beneficio en la década, inflada por la amortización de intangibles) y porque recoge el riesgo con un WACC del 10 %; los escenarios pesan un 25 % porque el riesgo de la IA es asimétrico. Los comparables (400,82 USD) pesan un 15 % por la fragilidad de la muestra, y las transacciones (563,40 USD) un 5 % porque llevan prima de control. Todos los métodos quedan por encima del precio de 302,75 USD. El valor objetivo es de 430,22 USD.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 6.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Guía: GBS sin Mailchimp +13-14 % (clientes de QuickBooks Online +3 % y precio y mezcla), Credit Karma +11-13 %, TurboTax +2-3 % y Mailchimp plano; reparto entre volumen y precio, estimación propia [A6, A8].' },
    { periodo: 'FY2028e', volumen_pct: 5.5, precio_pct: 3.5, otros_pct: 0.0, comentario: 'El ingreso medio por cliente del ecosistema en línea subió un 15 % en FY2026, pero TurboTax aceptará menos precio para recuperar cuota [B4, A7].' },
    { periodo: 'FY2029e', volumen_pct: 5.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Consenso de ingresos de +8,4 % en FY2029e [D3].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: `En parte. El 7,1 % anual del caso base no necesita capital (capex del 1,5-2,5 %) y tiene precedente: los ingresos orgánicos crecieron un 13-16 % en FY2023-FY2026 y QuickBooks Online sigue ganando clientes [A1, B4]. Pero el poder de precios de TurboTax se ha agotado: perdió un 2 % de declaraciones federales en 2026 y la dirección admite que el precio es el primer motivo de baja [B4, A7]. El crecimiento tendrá que venir de pymes y Credit Karma, no del negocio fiscal. Por eso el caso base baja del 9,5 % al 4 % y el bajista deja los ingresos planos.`,
};

export const catalizadores = {
  items: [
    { fecha: '19-nov-2026 (estimada)', evento: 'Resultados del 1T FY2027', efecto: 'Primera prueba de la guía (+11 % de ingresos en el 1T) y de QuickBooks Online', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Enero de 2027', evento: 'Junta y proxy de 2027', efecto: 'Primer año completo de Goodarzi como presidente y consejero delegado', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Enero-abril de 2027', evento: 'Campaña fiscal de 2027 (datos semanales del IRS)', efecto: 'Dirá si TurboTax recupera cuota bajando precio', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mayo de 2027', evento: 'Resultados del 3T FY2027 (cierre de la campaña)', efecto: 'El trimestre que hundió la acción un 20 % en 2026', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Continuo', evento: 'Recompras (7.900 M de autorización pendiente)', efecto: 'Retirarían un 10 % del capital al precio de hoy', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Sin fecha', evento: 'Agentes fiscales de OpenAI, Google o Apple', efecto: 'La prueba del riesgo que el precio ya descuenta', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Los agentes de IA abaratan la declaración de impuestos y la contabilidad básica', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 211,61 USD, −52 % sobre el valor base', mitigante: 'Datos fiscales propios, TurboTax Live con expertos y QuickBooks como sistema de registro de la pyme', senal: 'Declaraciones federales de TurboTax por debajo de −3 % en 2027' },
    { riesgo: 'Pérdida del poder de precios de TurboTax', tipo: 'Comercial', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Cada punto menos de crecimiento anual quita ≈27 USD (−6 %)', mitigante: 'Más volumen con menos precio, según la dirección', senal: 'Ingresos de TurboTax por debajo del +2 % en FY2027' },
    { riesgo: 'Mailchimp estancado y posible deterioro', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Costó 12.000 M; ingresos planos en 1.270-1.290 M', mitigante: 'Ningún deterioro hasta FY2026', senal: 'Mailchimp con ingresos a la baja como segmento propio' },
    { riesgo: 'Regulación: Direct File del IRS, publicidad de «gratis» (FTC) y demandas de accionistas', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Direct File está suspendido para 2026', mitigante: 'Acuerdo Free File hasta 2029', senal: 'Vuelta de Direct File' },
    { riesgo: 'Coste de capital: Tesoro al 5,22 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC del 11 %: el DCF baja a 384,84 USD, aún +27 %', mitigante: 'Deuda neta casi nula y flujo libre del 10,6 % de la capitalización', senal: 'Tesoro por encima del 5,75 %' },
    { riesgo: 'Cúpula: presidente y consejero delegado en la misma persona desde enero de 2026 y ventas de directivos de 357,7 M en 12 meses', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'No cambia el valor', mitigante: '11 de 13 consejeros independientes', senal: 'Más ventas fuera de planes 10b5-1' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 180 USD. La historia más probable empieza en la campaña fiscal de 2027: OpenAI y Apple integran la preparación de la declaración en sus asistentes, gratis para la mayoría de los contribuyentes, y TurboTax pierde un 8 % de declaraciones aunque baje precios. En 2028 los asistentes empiezan a llevar también la contabilidad básica de autónomos y micropymes, y QuickBooks Online frena al 5 %. El margen aguanta un tiempo con los recortes de plantilla, pero el mercado deja de ver crecimiento y valora a Intuit como a H&R Block, a 6 veces el EBITDA. El indicador que lo habría anticipado: las declaraciones federales a la baja en 2026 y la admisión de que el precio era el primer motivo de baja.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'TurboTax', pregunta: '¿Cuánto ingreso medio por cliente está dispuesta a ceder TurboTax para recuperar cuota, y qué efecto tendrá en el margen?', por_que: 'El precio descuenta que el negocio fiscal se encoge.' },
    { tema: 'IA', pregunta: '¿Qué parte de los clientes perdidos se fue a soluciones con IA y qué parte a Free File o a gestores?', por_que: 'Decide si el riesgo es estructural o de precio.' },
    { tema: 'QuickBooks', pregunta: '¿Cuántos clientes de QuickBooks Online ganó y perdió en FY2026, y con qué ingreso medio?', por_que: 'Es el motor del caso base.' },
    { tema: 'Mailchimp', pregunta: '¿Qué plan hay para Mailchimp como segmento propio y se ha valorado su venta?', por_que: 'Costó 12.000 M y no crece.' },
    { tema: 'Impuestos', pregunta: '¿Qué tipo impositivo de caja espera después de FY2026?', por_que: 'El flujo de caja de FY2026 está inflado por impuestos bajos.' },
    { tema: 'Recompras', pregunta: '¿Acelerará las recompras al precio actual, con 7.900 M de autorización pendiente?', por_que: 'A este precio retirarían un 10 % del capital.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];
