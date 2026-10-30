// Textos del analista (A. O. Smith, corte 2026-10-30). Cifras de calc tras el último cálculo.
export const limitaciones = `Se valora la acción de A. O. Smith en la Bolsa de Nueva York (AOS), en dólares, al cierre del 29-oct-2026 (63,49 USD): la sesión del 30 no había cerrado al corte [D]. Acciones: 135,06 M diluidas, las dos clases juntas (10-Q del 3T26) [D]. La empresa vende el 81 % de su negocio en China (acuerdo del 27-oct, cierre previsto en el 1S27) [A]. El DCF y los escenarios valoran solo la empresa que queda, sin China; China entra en el puente como asociada por 444 M USD (unos 3,3 USD por acción: el 81 % a precio de la operación con un 10 % de impuestos supuestos, el 19 % que conserva y las regalías de marca), una estimación propia porque la empresa no publica el impuesto ni la base fiscal [D]. La cuenta histórica es con China (aún no reexpresada); la caída de ventas del 14,4 % en 2026e es el cambio de perímetro [A, D]. El BPA de los escenarios es el ajustado de la empresa sin China; la historia del PER usa el ajustado publicado de cada año, con China: el PER de hoy, sin el valor de China que lleva el precio, sería de unas 15,6 veces en lugar de 16,4 [D]. El margen sin China que da la empresa (21 % de EBIT en 2025) resta al EBIT el beneficio neto de China y puede estar algo inflado [A, B]. El consenso del corte aún incluye China [D].`;

export const controles_explicados = [];

export const parches = [];

export const contexto_comentario = 'La acción sube un 12,6 % en un mes con el mercado plano: el dividendo +6 % (12-oct), la venta de China (−1,9 % el día del anuncio) y los resultados del 3T26 (+4,3 % el 29-oct); el +4,7 % del 22-oct no tiene causa identificada. Ningún hecho pendiente ajeno al análisis puede mover el precio más de un 5 %: el veredicto es no cambia [D].';

export const rentabilidad = {
  comentario: `A. O. Smith crea valor con holgura: el ROIC fue del 32,0 % en 2024 y del 30,7 % en 2025 frente a un WACC del 10,2 %, y del 51,8 % sin el fondo de comercio de las compras. Lo sostienen el margen de Norteamérica (23,6 % en el 3T26) y un negocio de reposición con poco capital [A]. La bajada desde el 44 % de 2022 viene de las compras (Pureit en 2024 y Leonard Valve en enero de 2026, por 469,5 M) y de China, que ganaba menos [A]. Sin China el ROIC sube, porque el margen de la empresa que queda es mayor (EBIT del 21 % frente al 19 %) [A, B].`,
  confianza: 'Media',
};

export const dcf_lectura = `El DCF da 56,07 USD por acción, un 11,7 % por debajo del cierre del 29-oct (63,49), con un WACC del 10,19 % (bono de EE. UU. al 4,98 %) y un 65 % del valor en el terminal; incluye unos 3,3 USD por acción de China por el valor de la operación. Con la prima de riesgo que hoy pide el mercado (4,20 %) sale 67,56 USD (+6,4 %). El DCF inverso dice que a 63,49 USD el mercado descuenta un crecimiento del 7,0 % anual en 2027e-2032e, casi el doble del 3,8 % de nuestro caso base (o un margen del 25,7 % frente al 23,0 %): con nuestro WACC el precio no es barato.`;

export const narrativas = {
  Bajista: 'La vivienda en EE. UU. cae en 2027, el acero y los fletes se comen las subidas de precio y el margen vuelve al de 2019-2020: crecimiento 3 puntos menor y margen 1,5 puntos menor que en el caso base, con un terminal del 2,5 %.',
  Base: 'Sin China, ventas de 3.279 M en 2026e y +4 % al año después (precio y calderas), con el margen EBITDA del 22,4 % al 23,0 %; el dinero de la venta va a recompras.',
  Alcista: 'Las subidas de precio se quedan, el volumen residencial vuelve y las calderas y el tratamiento de agua crecen más: crecimiento 2 puntos mayor y un punto más de margen.',
};

export const escenarios_comentario = `En el DCF el bajista (44,10 USD, −30,5 %) pesa mucho más que el alcista (63,78 USD, +0,5 %): con un WACC del 10,2 % el precio ya está por encima del caso alcista. En el objetivo a 12 meses es al revés (bajista −20,7 %, alcista +52,5 %), porque ahí el múltiplo de partida es el PER de hoy.`;

export const valoracion_comentario = `Pesos: DCF 50 %, comparables 30 % y escenarios 20 %. Valor intrínseco de 58,07 USD (−8,5 %). La rentabilidad a 12 meses (regla v3) es buena, +17,9 % ponderado y +19,8 % en el caso base, y la v2 da +17,3 %; pero el valor intrínseco queda por debajo del precio, así que la regla da Mantener. Con un BPA un 10 % peor la rentabilidad baja al +6,3 %. La calidad es completa: ROIC del 30,7 % frente a un WACC del 10,2 % (20,5 puntos) y sostenibilidad «Sí».`;

export const objetivo12m_comentario = `El objetivo ponderado (73,40 USD; base 74,65) usa en el caso base un PER de 17,2 veces (el actual de 16,4 con la regla, hacia la mediana adelantada de 18,0) sobre un BPA de 2028e sin China de 4,34 USD, un 25 % por encima de la guía de 2026 (3,42-3,52): crecimiento del 4 % en ventas, algo más de margen, la renta del 19 % y las regalías de China, y unos 5,7 M de acciones menos con el dinero de la venta. Con la historia al cierre (v2), +17,3 % ponderado y +14,4 % en el base. El objetivo de los analistas (66,20 USD) aún es con China.`;

export const catalizadores = {
  items: [
    { fecha: 'Finales de ene-2027 (estimada)', evento: 'Resultados de 2026, guía de 2027 sin China y segmentos nuevos', efecto: 'Primera guía completa de la empresa que queda; reexpresión de los años anteriores', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '1S27', evento: 'Cierre de la venta del 81 % de China (aprobaciones)', efecto: 'Unos 350 M USD netos para recompras (≈4 % del capital)', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Dic-2026', evento: 'Subida de precios de hasta el 9,5 % en calentadores', efecto: 'Defiende el margen frente al acero y los fletes; la competencia anuncia lo mismo', probabilidad: 'Media', sentido: '+' },
    { fecha: '2026-2027', evento: 'Revisión del consenso al perímetro sin China', efecto: 'BPA de 2026e de 3,72 con China frente a una guía de 3,42-3,52 sin ella: los recortes son de perímetro', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Vivienda y reposición en EE. UU.: mercado residencial con caída de un dígito bajo en 2026', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−20 % (bajista del objetivo a 12 meses: 48,91 USD)', mitigante: 'El 85 % de los calentadores es reposición', senal: 'Envíos de la AHRI a la baja otro año' },
    { riesgo: 'Acero y fletes (+10 % cada uno) y aranceles', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Subidas de precio en diciembre en todo el sector', senal: 'Margen de Norteamérica por debajo del 22 %' },
    { riesgo: 'Venta de China: aprobaciones, impuesto y costes que se quedan sin cuantificar', tipo: 'Negocio', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 a −3 % (≈3,3 USD por acción en el puente)', mitigante: 'Comprador con financiación y acuerdo firmado', senal: 'Retraso del cierre más allá del 1S27' },
    { riesgo: 'Compras que rinden menos de lo previsto (Leonard Valve: 55 M de ventas frente a 70 M esperados)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Deuda baja (0,6 veces el EBITDA)', senal: 'Deterioro del fondo de comercio' },
    { riesgo: 'Gobierno: la familia controla el consejo con la clase A (6 de 10 consejeros)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Descuento de múltiplo', mitigante: 'Historial de dividendo y recompras', senal: 'Votos en contra altos a consejeros (52 % a uno en 2026)' },
  ],
  premortem: 'Octubre de 2027: la acción vale 48 USD. La vivienda en EE. UU. siguió cayendo, el acero se comió la subida de precios y el BPA de 2027 sin China se quedó en 3,40 USD; el mercado pagó 14 veces. La señal: el margen de Norteamérica del 4T26 y del 1T27 por debajo del 22 %.',
  ia: { exposicion: 'Baja', sentido: 'Neutral', efecto_valor: 'Ninguno apreciable', comentario: 'Calentadores, calderas y tratamiento de agua no dependen de la inteligencia artificial; el efecto posible es indirecto (consumo eléctrico y obra de centros de datos) y pequeño para la empresa [B].' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'China', pregunta: '¿Qué impuesto y qué costes deja la venta y cuánto llega neto a recompras?', por_que: 'China vale unos 3,3 USD por acción en el puente [D].' },
    { tema: 'Margen', pregunta: '¿Cuál es el EBIT real sin China, restando su EBIT y no su beneficio neto?', por_que: 'El margen del 21 % puede estar inflado [A].' },
    { tema: 'Precios', pregunta: '¿Cuánto de la subida del 9,5 % de diciembre se queda tras los descuentos?', por_que: 'Decide el margen de 2027 [B].' },
    { tema: 'Compras', pregunta: '¿Por qué Leonard Valve vende 55 M y no 70 M?', por_que: 'Rentabilidad de la mayor compra reciente [A].' },
  ],
  confianza: 'Media',
};

export const diferencia_consenso = `El consenso (Yahoo y MarketBeat, 29-oct) sigue con China: 3,72 USD de BPA en 2026e y 4,03 en 2027e, frente a la guía sin China de 3,42-3,52 para 2026. Nuestro BPA de 2027e sin China (3,86) no es comparable con el suyo hasta que lo revisen [D].`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Mantener, con convicción baja (con nuestro WACC la regla del valor intrínseco da Vender y con la prima del mercado, Mantener). El objetivo a 12 meses da un +17,9 % ponderado y un +19,8 % en el caso base sobre el cierre del 29-oct (63,49 USD), y la v2 un +17,3 %; pero el valor intrínseco (58,07 USD) queda un 8,5 % por debajo del precio, así que no es compra. La calidad es completa (ROIC del 30,7 % frente a un WACC del 10,2 %; crecimiento sostenible). Las pruebas de robustez dan una señal sólida: la venta de China no cambia la decisión, pero sí la empresa. La convicción es baja porque la diferencia está en la tasa de descuento: con nuestro WACC (10,2 %) la regla del valor intrínseco da Vender y con la prima que pide hoy el mercado, Mantener; la subiría una guía de 2027 sin China cerca de 3,90 USD y la bajaría un margen de Norteamérica por debajo del 22 %.

**Qué ha pasado.** El 27-oct anunció la venta del 81 % de su negocio en China a CPE, valorado en unos 400 M USD sin caja ni deuda más unos 100 M de regalías de marca; se queda el 19 %, repatria unos 80 M de caja y dedicará el dinero, unos 350 M netos, a recompras. El cierre se espera en el 1S27 [A, C]. China caía (ventas −17 % en moneda local en el 3T26) [A]. El 29-oct publicó el 3T26: ventas de 940,5 M (planas) y BPA de 0,93 USD, por encima de lo esperado; Norteamérica creció un 3 % con un margen del 23,6 % [A]. La guía de 2026, ya sin China, es de 3.270-3.290 M de ventas (+4 %) y 3,42-3,52 USD de BPA ajustado [A, C]. La acción sube un 12,6 % en un mes [D].

**El negocio.** Sin China, el 94 % de las ventas es Norteamérica: calentadores de agua residenciales y comerciales (sobre todo reposición), calderas y tratamiento de agua, con un margen EBIT del 21 % [A, B]. La familia controla el consejo con la clase A [C].

**Valoración.** DCF de 56,07 USD (WACC del 10,19 %), con China a precio de la operación; escenarios de 44,10 a 63,78 USD. Cotiza a 16,4 veces el BPA de 2027e sin China, por debajo de su mediana adelantada de 5 años (18,0) y por encima de los comparables (16,0) [D].

**Qué cambiaría la decisión.** Por debajo de 58,07 USD el valor intrínseco supera al precio y sería compra robusta (aguanta la v2 y un BPA un 10 % peor). Para quien la tiene, venta por encima de 68,05 USD (filtro de mantener); la banda Vender de la regla empieza en 83,16. La señal de alarma: el margen de Norteamérica por debajo del 22 %.`,
  tesis: 'Sin China, A. O. Smith es un negocio norteamericano de reposición de calentadores y calderas, muy rentable y con poca deuda, que dedicará lo que cobre a recomprar acciones. Al precio de hoy el mercado ya paga un crecimiento por encima del que vemos: buena empresa, sin margen de seguridad.',
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento del 7,0 % anual hasta 2032 con nuestro WACC (DCF inverso), casi el doble del 3,8 % de nuestro caso base [D].',
    nuestra_vision: 'BPA de 2028e sin China de 4,34 USD, con un 4 % de crecimiento de ventas y recompras.',
    por_que: 'La salida de China sube el margen y el crecimiento de la empresa que queda, pero no cambia el ciclo de la vivienda en EE. UU., que es lo que mueve el beneficio [A, B].',
  },
  a_favor: [
    '**ROIC del 30,7 %** y deuda de 0,6 veces el EBITDA [A].',
    '**Salida de China** con dinero para recompras (≈4 % del capital) [A].',
    '**Margen de Norteamérica del 23,6 %** y subidas de precio en diciembre [A, B].',
    '**Calidad ampliada**: pasa las 10 pruebas informativas.',
  ],
  en_contra: [
    '**Valor intrínseco por debajo del precio** (58,07 frente a 63,49).',
    '**Vivienda en EE. UU. a la baja** y acero y fletes al alza [B].',
    '**Guía de 2026 recortada tres veces** antes de quitar China [C].',
    '**Control familiar** con la clase A [C].',
  ],
  que_vigilar: 'El margen de Norteamérica, los envíos de la AHRI, el cierre de la venta de China y la guía de 2027 sin China (finales de enero de 2027).',
  cambiaria_recomendacion: [
    'Por debajo de 58,07 USD sería compra robusta (nivel A): el valor intrínseco supera al precio y la rentabilidad aguanta la v2 y un BPA un 10 % peor.',
    'Para quien la tiene, venta por encima de 68,05 USD (filtro de mantener); la banda Vender de la regla (ponderada ≤ −10 %) empieza en 83,16.',
    'Un margen de Norteamérica por debajo del 22 % dos trimestres llevaría el caso base hacia el bajista.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen del segmento Norteamérica', nivel_actual: '23,6 % (3T26)', umbral_alerta: '< 22 %', por_que: 'Base del BPA sin China.' },
    { kpi: 'Crecimiento orgánico de Norteamérica', nivel_actual: '+1 % (3T26)', umbral_alerta: '< −3 %', por_que: 'Mide el ciclo de reposición.' },
    { kpi: 'Guía de BPA ajustado sin China', nivel_actual: '3,42-3,52 USD (2026)', umbral_alerta: '< 3,70 USD para 2027', por_que: 'Camino hacia los 4,34 de 2028e.' },
  ],
  confianza: 'Media',
};
