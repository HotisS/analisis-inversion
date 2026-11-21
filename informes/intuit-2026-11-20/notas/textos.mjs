// Textos del analista (Intuit, corte 2026-11-20). Citas: [A10] = fuente 10 de A.json; [D13] = fuente 13 de D.json.
// Iteración nueva tras los resultados del 1T FY2027 (19-nov-2026) y el acuerdo de venta de Mailchimp. Punto de partida: informes/intuit-2026-10-28/.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria del NASDAQ (INTU), en dólares, al cierre del viernes 20-nov-2026 (270,44 USD, −12,8 % en el día tras los resultados del 1T FY2027) [D7]. Ejercicio a 31 de julio, nombrado por el año en que termina (FY2027 = ago-26 a jul-27). Acciones: 265,6 M diluidas, las del 31-oct-2026 más un millón de derechos potenciales, para casar con la caja del mismo balance [D1]. EBITDA en US GAAP, con los pagos en acciones como gasto. Caja = efectivo e inversiones a corto plazo, sin los fondos de clientes; la deuda incluye 970 M de líneas sin recurso que financian préstamos a pymes [D1]. **Mailchimp**: la venta a Bending Spoons (3.680 M) se firmó el 19-nov y no cerrará hasta principios de 2027; la guía y nuestro DCF siguen con Mailchimp dentro y el puente no la recoge (ver la valoración) [A12, D3]. **El consenso de BPA de después de los resultados no estaba publicado** en ninguna fuente gratuita al cierre del 20-nov: se usa el del 27-oct como contraste [D11, D12]. **Comparables**: precios llevados al cierre del 20-nov con la variación de cada acción; su consenso de beneficio y su deuda neta son del 10-oct, y siete de los nueve han publicado resultados desde entonces: la mediana es de baja confianza y pesa un 15 % [D15-D25]. Segmentos: tres desde el 19-nov (GBS sin Mailchimp, Consumer y Mailchimp), reexpresados para FY2024-FY2026 [A13]. FY2017 está reexpresado por la ASC 606 en la cuenta, no en el balance. El flujo de caja de FY2026 está inflado por impuestos pagados excepcionalmente bajos: el DCF usa un tipo normalizado [A1]. El análisis parte del informe del 28-oct-2026; se han vuelto a comprobar con el 10-Q, la nota de resultados y los 8-K del 19-nov las cuentas, la guía, el balance, el precio, la bolsa, los analistas, los directivos y las noticias.`;

export const controles_explicados = [
  { control: 'Cambio de perímetro declarado (FY2020)', explicacion: 'El activo creció por la caja de la emisión de deuda y la financiación preparada para Credit Karma (cerrada en dic-2020, en FY2021), no por una compra en FY2020 [A4].' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'Con Shopify (63,6 veces el beneficio) y Freshworks (53,1) en la muestra, la mediana es frágil y su consenso es del 10-oct: por eso los comparables pesan solo un 15 % [D15-D25].' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'BILL y Block salen de márgenes muy bajos y el EBITDA previsto de Block parece cambiar de definición; pesan poco en la mediana [D20, D21].' },
];

const rentabilidad = {
  comentario: `**Intuit crea valor, pero mucho menos que antes de sus dos grandes compras.** El ROIC después de impuestos fue del 94-126 % de FY2017 a FY2020, con un negocio de software sin apenas capital. Credit Karma (7.200 M, dic-2020) y Mailchimp (12.000 M, nov-2021) lo hundieron al 12,6 % en FY2023; desde entonces ha vuelto al 23,1 % en FY2026, 13,2 puntos por encima del WACC del 9,9 % [A1, A4]. Mailchimp fue la peor de las dos: ingresos planos en unos 1.270 M desde FY2024 y ahora se vende por 3.680 M, menos de un tercio de lo pagado [A12, A13]. Aun así habrá plusvalía contable, porque al crear su segmento solo se le asignaron 641 M del fondo de comercio [A11].`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `Intuit cotiza a 10,0 veces el EBITDA de los últimos 12 meses y 15,5 veces el beneficio, por debajo del mínimo de su década (12,5 y 19,2 veces); la media fue de 35,7 y 52,3 veces [D7]. La acción ha caído un 59 % en 2026 mientras el BPA GAAP subía: es una caída de múltiplo, no de beneficio, y el 1T FY2027 la ha agravado (BPA GAAP de 2,59 USD frente a 1,59 un año antes) [A10, D7]. El mercado ya no paga a Intuit como un monopolio fiscal y contable: la valora como un negocio que la IA puede volver gratuito. La historia del PER es de otro régimen, y por eso la regla a 12 meses no supone que vuelva.`,
};

const comparables = {
  comentario: `Intuit cotiza a 8,4 veces el EBITDA de los próximos 12 meses y 12,7 veces el beneficio, frente a la mediana de 13,2 y 20,4 veces del software de pagos, nóminas y pymes, pese a tener el doble de margen (33,6 % frente al 16,6 %) y un crecimiento algo menor (9,3 % frente al 12,9 %) [D15-D25]. Solo H&R Block (7,7 veces) y Adobe (10,4), con el mismo miedo a la IA, cotizan más bajo en PER. Las medianas darían 430,22 USD (EV/EBITDA) y 435,44 USD (PER). La muestra es frágil (Shopify a 63,6 veces) y su consenso es del 10-oct, de antes de que siete de los nueve publicaran: pesa un 15 %.`,
};

const transacciones = {
  comentario: `Ocho compras de software con múltiplo de ventas, de 2,9 a 10,6 veces. La más baja es justo la venta de Mailchimp: 3.680 M por 1.268 M de ventas de los últimos 12 meses, 2,9 veces, un 31 % de lo que pagó Intuit en 2021 [D2, D3, D27]. La mediana (6,85 veces) daría 559,14 USD por acción, pero lleva prima de control y viene de empresas sin el riesgo de la IA de hoy; Mailchimp muestra que hoy el mercado de compras paga mucho menos por el software de pymes que no crece. Pesan un 5 %.`,
};

const sentimiento = {
  lectura: `El sentimiento ha empeorado: en octubre estaba dividido y mejorando; tras el 1T es negativo [E1, E3]. Stocktwits está partido entre bajistas y alcistas; en Seeking Alpha el tono pasa de compra a mantener y a «barata, pero con trampa» [E1, E2]. El mercado castiga la guía, no el trimestre, y el tema dominante sigue siendo la IA sobre TurboTax, QuickBooks y ahora Credit Karma [E3, E4]. La venta de Mailchimp divide: error de capital, pero buena salida [E7, E8]. Cinco bancos bajaron su objetivo el 20-nov sin cambiar la recomendación [D13]. Hay pesimismo sin capitulación y ningún riesgo nuevo fuera de los escenarios.`,
};

export const secciones = { rentabilidad, multiplos_historicos, comparables, transacciones, sentimiento };

export const dcf_justificacion = {
  crecimiento: `FY2027e +8,3 %: la guía del 19-nov da 23.081-23.365 M (+8-9 %), rebajada desde +9-10 % solo por Credit Karma (+3-7 %, antes +11-13 %); GBS sin Mailchimp sigue en +13-14 % y Mailchimp en −1-0 % [A10, D2]. El 1T creció un 12 %, pero el 2T se guía en +6-7 % porque TurboTax baja precios [A10, A14]. Luego el crecimiento baja medio punto al año hasta el 4 % de FY2034e. La media del caso base (6,4 %) queda muy por debajo del 17,1 % anual de la década, que incluye las compras, y del 13-16 % orgánico de FY2023-FY2026 [A1]. Respecto al 28-oct, quitamos 1,2 puntos en FY2027e y entre 0,5 y 1 en los siguientes por Credit Karma.`,
  margenes: `Margen EBITDA GAAP del 35,7 % en FY2027e: la guía mantiene un beneficio operativo GAAP de 7.408-7.490 M, con unos 850 M de amortizaciones, sobre menos ingresos [A10]. Sube al 38,5 % en FY2030e por apalancamiento operativo y el recorte de plantilla de 2026, ya «sustancialmente terminado» [A11, C9]. El 1T ya dio un margen operativo GAAP del 19,9 %, frente al 13,7 % de un año antes [A10].`,
  inversion: `Capex del 1,5 % de las ventas en FY2027e que sube al 2,5 %; el de FY2026 fue del 1,0 % [A1]. La amortización (3,7 %) incluye los intangibles de Credit Karma y Mailchimp y converge al capex. Circulante negativo (−1,2 % de las ventas), el de FY2026. Tipo impositivo normalizado del 22 %; el del 1T fue del 28 %, del 24 % sin las partidas de pagos en acciones [A10].`,
  wacc: `Tasa libre del 4,92 %, el Tesoro de EE. UU. a 10 años del 20-nov-2026 (4,99 % el 27-oct) [D8]. Beta de 1,01, la mensual a 5 años frente al S&P 500; la semanal a 2 años da 0,66 [D7]. Prima de mercado del 5,5 %, coste de la deuda del 5,6 % (bono de 2036) y un 8,8 % de deuda a valor de mercado [D1, D7]. WACC del 9,94 %; con la prima implícita del mercado (4,20 %), el 8,74 % [D9].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación en dólares de unos 2,5 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (4,42 %). El múltiplo de salida implícito es de 10,8 veces el EBITDA, por encima de los 10,0 de hoy y por debajo de los 12,5 del mínimo de la década.`,
};

export const etapa2_justificacion = `No se usa. El ROIC (23,1 %) supera al WACC en más de 13 puntos, pero el riesgo de la IA sobre TurboTax y Credit Karma hace que alargar el crecimiento sea la apuesta contraria a la que hoy hace el mercado.`;

export const dcf_lectura = `El DCF da 429,20 USD por acción, un 58,7 % por encima del precio, con un 61 % del valor en el terminal. **El precio descuenta ya que Intuit deja de crecer.** El DCF inverso dice que, con nuestros márgenes, los 270,44 USD de hoy suponen que los ingresos bajan un 0,8 % al año de FY2027e a FY2034e, frente al 6,4 % de nuestro caso base y a una guía de +8-9 % para FY2027 con un 1T al +12 %; o, con nuestro crecimiento, un margen EBITDA del 25,3 % en vez del 38,5 %. Comprar a este precio rinde un 13,9 % anual si se cumple el caso base, 4,0 puntos por encima de su coste de capital. El 28-oct el precio pedía un +1,9 % anual: la caída de esta semana ha bajado el listón más de lo que los resultados justifican, porque el beneficio del año no cambia [A10]. Lo que el precio teme es que la IA vacíe TurboTax y, desde este trimestre, también Credit Karma: la dirección admite que los consumidores buscan ya productos financieros en asistentes de IA [A14].`;

export const narrativas = {
  Bajista: `Los agentes de IA hacen la declaración de impuestos y la contabilidad básica casi gratis y se quedan con la búsqueda de productos financieros: TurboTax pierde clientes por precio, Credit Karma se estanca y QuickBooks frena, como le pasó a Chegg con los asistentes de IA. Ingresos casi planos durante ocho años, margen EBITDA del 32,5 % y crecimiento a perpetuidad del 1,5 %.`,
  Base: `Se cumple la guía de FY2027 (+8-9 %) y el crecimiento baja medio punto al año, con QuickBooks Online tirando (+19 % en el 1T), Credit Karma a un dígito y TurboTax plano: crecimiento medio del 6,4 % y margen EBITDA del 38,5 % desde FY2030.`,
  Alcista: `TurboTax recupera cuota con precios más bajos y servicios con experto asistidos por IA, Credit Karma vuelve a doble dígito y QuickBooks gana el mercado medio de empresas: crecimiento medio del 8,4 % y margen del 40 %.`,
};

export const escenarios_comentario = `La asimetría es amplia: el alcista vale 507,66 USD (+87,7 %) y el bajista 202,61 (−25,1 %), 3,5 veces. Ha mejorado frente al 28-oct porque el precio ha caído un 18 % y el beneficio del año no ha cambiado. El bajista no es cosmético: deja los ingresos casi planos ocho años y quita seis puntos de margen, lo que le pasó a Chegg cuando llegaron los asistentes de IA. Aun así, el precio de hoy está más cerca del bajista que del base: el DCF inverso pide que los ingresos bajen. El valor ponderado por probabilidad es de 388,24 USD (+43,6 %).`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 %, comparables 15 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque la caja de Intuit es predecible (conversión del 164 % del beneficio en la década) y porque recoge el riesgo con un WACC del 9,9 %; los escenarios pesan un 25 % porque el riesgo de la IA es asimétrico. Los comparables (430-435 USD) pesan un 15 % por la fragilidad de la muestra y un consenso de antes de sus resultados; las transacciones (559,14 USD) un 5 % porque llevan prima de control. **Mailchimp**: no se ajusta el puente. Con ingresos planos (1.272 M en FY2026) y un margen EBITDA del 35 % después de pagos en acciones y costes comunes, vale unos 3.400 M descontada al WACC sin crecer (estimación propia); se vende por 3.680 M, en parte en acciones de Bending Spoons, y Intuit no ha dicho cuánto pagará de impuestos [A12, A13]. Cambiar sus flujos por el precio deja el valor casi igual (+1 USD por acción). Para el BPA también es casi neutra: se pierde un 5-6 % del beneficio y las recompras con los 3.310 M en efectivo retirarían un 4-5 % de las acciones al precio de hoy (cálculo propio). El valor objetivo es de 426,00 USD (+57,5 %). Ese es el valor intrínseco, no el precio a 12 meses: la regla común da 301,08 USD, porque no supone que el múltiplo vuelva a su historia.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 5.0, precio_pct: 3.3, otros_pct: 0.0, comentario: 'Guía del 19-nov: GBS sin Mailchimp +13-14 % (QuickBooks Online +19 % en el 1T), Credit Karma +3-7 %, Consumer +2-4 % con TurboTax bajando precios y Mailchimp plano; reparto entre volumen y precio, estimación propia [A10, A14].' },
    { periodo: 'FY2028e', volumen_pct: 5.0, precio_pct: 3.0, otros_pct: 0.0, comentario: 'TurboTax acepta menos precio para recuperar cuota; QuickBooks sube precio y mezcla con el mercado medio [A14, B28].' },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 0.0, comentario: 'Crecimiento que se modera medio punto al año; el ecosistema en línea de GBS creció un 20 % en el 1T [A10].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: `En parte. El 6,4 % anual del caso base no necesita capital (capex del 1,5-2,5 %) y tiene precedente: los ingresos orgánicos crecieron un 13-16 % en FY2023-FY2026 y QuickBooks Online creció un 19 % en el 1T FY2027 [A1, A10]. Pero el poder de precios de TurboTax se ha agotado: la empresa baja precios en el 2T y regala la declaración federal con Credit Karma Tax [A14, B28]. Y Credit Karma ha frenado (de +11-13 % a +3-7 % en la guía) porque los consumidores empiezan a buscar préstamos y tarjetas dentro de los asistentes de IA [A10, A14]. El crecimiento tendrá que venir de las pymes. Por eso el caso base baja del 8,3 % al 4 % y el bajista deja los ingresos planos.`,
};

export const catalizadores = {
  items: [
    { fecha: 'Enero de 2027', evento: 'Junta y proxy de 2027', efecto: 'Primer año completo de Goodarzi como presidente y consejero delegado; voto de remuneración tras la caída', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Principios de 2027', evento: 'Cierre de la venta de Mailchimp (3.310 M en efectivo y 368 M en acciones de Bending Spoons)', efecto: 'Recompras adicionales en FY2027 y guía actualizada sin Mailchimp', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Enero-abril de 2027', evento: 'Campaña fiscal de 2027 (datos semanales del IRS) con TurboTax más barato y Credit Karma Tax gratis', efecto: 'Dirá si TurboTax recupera cuota bajando precio y cuánto ingreso medio cede', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Finales de febrero de 2027 (estimada)', evento: 'Resultados del 2T FY2027', efecto: 'Prueba de la guía de +6-7 % y de Credit Karma', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mayo de 2027', evento: 'Resultados del 3T FY2027 (cierre de la campaña)', efecto: 'El trimestre que hundió la acción un 20 % en 2026', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Continuo', evento: 'Recompras (6.400 M de autorización pendiente más el efectivo de Mailchimp)', efecto: 'Retirarían un 9 % del capital al precio de hoy sin contar Mailchimp', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Sin fecha', evento: 'Agentes fiscales y financieros de OpenAI, Google o Apple', efecto: 'La prueba del riesgo que el precio ya descuenta', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Los agentes de IA abaratan la declaración de impuestos y la contabilidad básica', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 202,61 USD, −53 % sobre el valor base y −25,1 % sobre el precio', mitigante: 'Datos fiscales propios, TurboTax con expertos y QuickBooks como sistema de registro de la pyme', senal: 'Declaraciones federales de TurboTax por debajo de −3 % en 2027' },
    { riesgo: 'Credit Karma pierde tráfico frente a los asistentes de IA', tipo: 'Tecnológico', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Ya rebajó la guía de FY2027 de +11-13 % a +3-7 %; recogido en el base', mitigante: 'Casi no dependía de los buscadores (menos del 1 % del tráfico) [B28]', senal: 'Credit Karma en negativo en el 2T' },
    { riesgo: 'Pérdida del poder de precios de TurboTax', tipo: 'Comercial', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'El DCF inverso ya pide ingresos a la baja; el bajista lo recoge', mitigante: 'Más volumen con menos precio, según la dirección', senal: 'Ingresos de Consumer por debajo de la guía de +2-4 % en FY2027' },
    { riesgo: 'Regulación y litigios: Direct File del IRS, dos demandas colectivas y dos derivadas de accionistas', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Direct File sigue suspendido; la FTC archivó su último caso el 15-sep-2026', mitigante: 'Acuerdo Free File hasta 2029', senal: 'Vuelta de Direct File o acuerdo caro en las demandas' },
    { riesgo: 'Coste de capital: Tesoro al 4,92 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC del 10,9 %: el DCF baja a 374,33 USD, aún +38 %', mitigante: 'Deuda neta casi nula y flujo libre del 12,5 % de la capitalización', senal: 'Tesoro por encima del 5,75 %' },
    { riesgo: 'Cúpula: presidente y consejero delegado en la misma persona y planes de venta nuevos de tres directivos desde diciembre', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'No cambia el valor', mitigante: '11 de 13 consejeros independientes; planes 10b5-1', senal: 'Ventas fuera de planes 10b5-1' },
  ],
  ia: { exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−25 % en el bajista (202,61 USD); +18 % en el alcista sobre el base (507,66 USD)', comentario: 'La IA toca casi todo el negocio. Amenaza a TurboTax, cuyo producto de hágalo usted mismo pueden replicar gratis los asistentes generales; la empresa baja precios y regala la declaración federal con Credit Karma Tax [A14, B28]. Desde este trimestre amenaza también a Credit Karma: la dirección dice que los consumidores se pasan «más rápido de lo previsto» a los asistentes de IA para buscar productos financieros [A14]. Y es a la vez la palanca de QuickBooks, que crece al 19 % [A10]. Señal que avisaría: declaraciones federales de TurboTax cayendo más de un 3 % en la campaña de 2027 o Credit Karma en negativo.' },
  premortem: `Noviembre de 2029: la acción ha caído un 40 %, a unos 162 USD. La historia más probable empieza en la campaña fiscal de 2027: OpenAI y Apple integran la declaración en sus asistentes, gratis para la mayoría, y TurboTax pierde un 8 % de declaraciones aunque baje precios. Credit Karma, que ya frenaba, deja de crecer porque las ofertas de tarjetas y préstamos se buscan dentro del asistente. En 2028 los asistentes llevan también la contabilidad de autónomos y QuickBooks Online frena al 5 %. El mercado valora a Intuit como a H&R Block, a 6 veces el EBITDA. El indicador que lo habría anticipado: la rebaja de Credit Karma de noviembre de 2026 por la IA.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Credit Karma', pregunta: '¿Qué parte del frenazo de Credit Karma es por tipos de interés y qué parte por los asistentes de IA, y qué hará para estar dentro de ellos?', por_que: 'Decide si el frenazo es cíclico o estructural.' },
    { tema: 'TurboTax', pregunta: '¿Cuánto ingreso medio por cliente cede TurboTax con los precios más bajos y Credit Karma Tax, y cuántos clientes nuevos espera?', por_que: 'El precio descuenta que el negocio fiscal se encoge.' },
    { tema: 'Mailchimp', pregunta: '¿Cuánto impuesto pagará por la venta y cuándo recomprará con el efectivo?', por_que: 'Decide si la venta es neutra para el BPA.' },
    { tema: 'QuickBooks', pregunta: '¿Cuántos clientes de QuickBooks Online ganó en el 1T y con qué ingreso medio?', por_que: 'Es el motor del caso base.' },
    { tema: 'Calidad del BPA', pregunta: '¿Se repetirán las plusvalías de inversiones (118 M en el 1T)?', por_que: 'Explican 0,44 USD del BPA GAAP del trimestre.' },
    { tema: 'Recompras', pregunta: '¿Acelerará las recompras al precio actual, con 6.400 M de autorización pendiente?', por_que: 'A este precio retirarían un 9 % del capital.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

export const objetivo_12m = {
  ejercicio: 'FY2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 16.07, multiplo: null, precio: null, justificacion: 'BPA GAAP propio de FY2028e con el bajista del DCF: ingresos +1,3 % y +1,0 % (21.944 M), margen EBITDA del 31 %, amortización de 878 M (la del base), resultado financiero de −80 M, impuestos del 27 % y 265,6 M de acciones: 16,07 USD, casi el BPA de FY2026 (16,46).' },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 22.88, multiplo: null, precio: null, justificacion: 'BPA GAAP propio: ingresos +8,3 % y +8,0 % (25.086 M, guía de FY2027 del 19-nov), margen EBITDA del 37 %, amortización de 878 M, −80 M financieros (intereses de 290 M al año menos los de la caja), impuestos del 27 % y 265,6 M de acciones sin recompras: 22,88 USD. Con el mismo cálculo, FY2027e da 20,21 USD, dentro de la guía (20,12-20,36). Mailchimp sigue dentro: su venta es casi neutra para el BPA si el efectivo va a recompras.' },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 24.9, multiplo: null, precio: null, justificacion: 'BPA GAAP propio con el alcista: ingresos +10,3 % y +10,0 % (26.023 M), margen EBITDA del 38,5 %, mismas partidas por debajo del EBIT: 24,90 USD. Exige que TurboTax recupere cuota y Credit Karma vuelva a doble dígito.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 13.4, mediana_5a: 49.1, minimo_5a: 47.4, media_larga: 48.3, anios: 5,
    excluidos: 'Historia ADELANTADA en BPA GAAP publicado (precio de cierre a 31 de julio ÷ BPA GAAP real del ejercicio siguiente): FY2017 27,0x; FY2018 34,7x; FY2019 40,1x; FY2020 40,5x; FY2021 72,8x; FY2022 54,2x; FY2023 49,1x; FY2024 47,4x; FY2025 47,7x. El cierre de FY2026 (316,07 ÷ nuestro BPA de FY2027e de 20,21 = 15,6x) queda fuera por atípico: es menos de un tercio de la mediana del resto (48,4x), la regla común. Ventana de cinco años FY2021-FY2025; media larga de ocho (FY2018-FY2025). Actual: 270,44 ÷ 20,21 = 13,4x.',
    v2: { actual: 13.4, mediana_5a: 60.8, minimo_5a: 19.2, media_larga: 50.5, base: 'cierre', base_bpa: 'publicado' },
  },
  comparables_per: { mediana: 20.4 },
  consenso: { bpa_ano1: 20.34, bpa_ano2: 23.61, objetivo_medio: 407.89, objetivo_min: 290, objetivo_max: 732, analistas: 34, tendencia_3m: 'a la baja', fuente: 'MarketScreener (BPA GAAP, 27-oct-2026; aún sin revisar tras los resultados) y Stock Analysis (objetivos, 11-nov-2026); cinco rebajas de objetivo el 20-nov [D12, D10, D13]' },
  diferencia_consenso: 'Nuestro BPA GAAP de FY2028e (22,88) queda un 3,1 % por debajo del consenso de antes de los resultados (23,61) y el de FY2027e (20,21) un 0,6 % por debajo (20,34), dentro de la guía reiterada (20,12-20,36). La diferencia es de ventas: el consenso aún no recoge la rebaja de Credit Karma (23.410 M de FY2027e, por encima del techo de la nueva guía) [D11]. La distancia con el objetivo medio de los analistas (407,89, de antes de las rebajas del 20-nov) es de múltiplo: la calle paga unas 17-18 veces el BPA de FY2028e y la regla común, que con la historia de otro régimen elige la v2, se queda en el PER de hoy (13,4 veces). Las cinco rebajas del 20-nov (310-445 USD) siguen por encima de nuestro base [D13].',
  media: null,
  comentario: 'El valor intrínseco (426,00 USD, +57,5 %) queda un 41,5 % por encima del objetivo a 12 meses ponderado (301,08 USD; +13,1 % con el dividendo, base +15,2 %). La distancia es de múltiplo: el valor intrínseco supone que el negocio sigue creciendo un 6 % al año y lo descuenta al 9,9 %, mientras que la regla a 12 meses, con la historia del PER de otro régimen, solo cuenta con que el BPA crezca al PER de hoy (13,4 veces). Para cerrarla haría falta que el mercado vuelva a pagar más de 18 veces el beneficio, y eso exige una campaña fiscal de 2027 que demuestre que TurboTax deja de perder cuota y que Credit Karma no se vacía.',
};

export const contexto = {
  movimiento: { fecha: '2026-11-20', var_1m_pct: -23.8, var_3m_pct: -26.9, var_6m_pct: -15.5, var_12m_pct: -58.4, dist_max_52s_pct: -60.0, dist_min_52s_pct: 6.0, dist_max_historico_pct: -66.5, tendencia: 'bajista', volatilidad_60d_pct: 50.3, avisos: ['P3 Caída fuerte: −24 % en un mes: hay que saber por qué (explicada: resultados del 19-nov y venta del software).', 'P5 Un 22 % por debajo de la media de 200 sesiones (tendencia bajista).'] },
  movimientos_fuertes: [
    { periodo: 'may-jun-2026', var_pct: -33.3, causa: 'Resultados del 3T FY2026 (20-may, −20 % en un día): recorte de la guía de TurboTax y anuncio del recorte del 17 % de la plantilla [B23, C9, D7].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-ago-2026', var_pct: 30.4, causa: 'Rebote desde el mínimo de 252,84 USD (22-jun) hasta unos 367 USD el 21-ago, con la vuelta del software y antes de la guía del FY2027 [D7].', veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-2026', var_pct: -25.4, causa: 'De 359,30 USD (31-ago) a 268,03 USD (29-sep): guía del FY2027 de +9-10 % con TurboTax al +2-3 % y reconocimiento de la pérdida de cuota de TurboTax [A6, A7, D7].', veredicto: 'no cambia', condicion: null },
    { periodo: 'oct-2026', var_pct: 22.5, causa: 'Rebote desde el mínimo del 29-sep, sin cambio en las estimaciones de BPA [D7, E6].', veredicto: 'no cambia', condicion: null },
    { periodo: '17-nov-2026', var_pct: -7.2, causa: 'Sin noticia propia: el ETF de software IGV cayó un 3,3 % ese día [D7, E5].', veredicto: 'no cambia', condicion: null },
    { periodo: '20-nov-2026', var_pct: -12.8, causa: 'Resultados del 1T FY2027: el trimestre superó la guía, pero la guía de ingresos del año baja a +8-9 % por Credit Karma y la del 2T queda en +6-7 %, frente a un consenso de 5.110 M; venta de Mailchimp. El S&P 500 cayó un 3,7 % y el IGV un 4,6 % ese día [A10, A17, D7, D13].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-11-19', tipo: 'resultados', hecho: '1T FY2027: ingresos de 4.354 M (+12 %) y BPA GAAP de 2,59 USD, por encima de la guía (1,71-1,75; incluye 0,44 USD de plusvalías de inversiones). Guía de ingresos del FY2027 rebajada a 23.081-23.365 M por Credit Karma; beneficio operativo y BPA del año sin cambios; 2T de +6-7 % [A10, A11].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-19', tipo: 'fusión u oferta', hecho: 'Acuerdo para vender Mailchimp a Bending Spoons por 3.680 M (3.310 M en efectivo y 368 M en acciones bloqueadas seis meses); cierre a principios de 2027, fecha límite 19-ago-2027; el efectivo irá a recompras. Casi neutra para el valor y el BPA (estimación propia) [A12, A10].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-20', tipo: 'recomendación', hecho: 'Cinco bancos bajan el objetivo sin cambiar la recomendación: Morgan Stanley 310, Barclays 385, Jefferies 445, UBS 315 y Bank of America 310 USD [D13].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-19', tipo: 'directivos', hecho: 'El 10-Q revela planes 10b5-1 nuevos de Goodarzi (hasta 94.477 acciones desde el 11-dic-2026), Aujla y Hanebrink (desde el 16-dic), adoptados en septiembre; ninguna compra ni venta en mercado desde el 28-oct [C24, C26].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-19', tipo: 'litigio', hecho: 'Dos demandas derivadas de accionistas (18 y 28-sep-2026) contra consejeros y directivos, que se suman a las dos colectivas de julio y agosto; sin cuantía [C24].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-15', tipo: 'fusión u oferta', hecho: 'Compra de Sequence (facturación con IA para QuickBooks), cerrada en el 1T por 126 M netos de caja: inmaterial [A11].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2027-02-25',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción cae un 23,8 % en un mes y un 12,8 % el 20-nov, y está a un 6 % del mínimo de 52 semanas, bajo la media de 200 sesiones (tendencia bajista) [D7]. La caída tiene causa conocida y ya está en las cifras de este informe: la guía de ingresos rebajada por Credit Karma y la del 2T, con el beneficio del año sin cambios [A10]. El día fue además de venta general del software (IGV −4,6 %) [D7]. La venta de Mailchimp está firmada y es casi neutra; no quedan colocaciones, ampliaciones ni litigios pendientes que puedan mover el precio más de un 5 %. Los próximos resultados (2T FY2027, finales de febrero, fecha estimada) quedan a más de tres meses. Veredicto: no cambia.',
};
