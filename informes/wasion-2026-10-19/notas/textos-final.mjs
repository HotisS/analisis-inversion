// Textos finales del analista (Wasion Holdings, corte 2026-10-19): valoración, objetivo a 12 meses, riesgos, catalizadores,
// preguntas y resumen. Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
let R = {};
try { R = (await import(`./resumen.mjs?t=${Date.now()}`)).default; } catch (e) { R = {}; }

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 0.98, multiplo: null, precio: null, justificacion: 'Ventas de 2027e un 5 % por encima de 2026e (12.904 M) y +8 % en 2028e (13.936 M), con un margen EBITDA del 16,5 %: EBIT ≈ 1.770 M, resultado financiero −35 M, impuestos del 15,5 % y minoritarios del 31 %: beneficio ≈ 1.010 M sobre 1.033,5 M de acciones. Es el 1S26 (margen −3,9 puntos) prolongado dos años.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.37, multiplo: null, precio: null, justificacion: 'Ventas de 16.248 M (+22 %, +17 % y +13 %) con un margen EBITDA del 19 % y amortización del 3,8 %: EBIT de 2.470 M, −35 M financieros, impuestos del 15,5 % y minoritarios del 31 %: beneficio de ≈ 1.420 M. Cuadra con 2025: EBIT de 1.778 M − 33 M − 264 M de impuestos − 423 M de minoritarios = 1.058 M [A1].' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.62, multiplo: null, precio: null, justificacion: 'Centros de datos y exterior tiran más: ventas de 17.398 M (+21 % y +17 % en 2027-2028e) con un margen EBITDA del 20,5 %: beneficio de ≈ 1.675 M, un 17 % por encima del consenso de 2027e (1,38 CNY) un año después [D3].' },
  ],
  per_historico: {
    base: 'adelantado', actual: 8.57, mediana_5a: 6.34, minimo_5a: 4.36, media_larga: 9.03,
    excluidos: 'Historia adelantada (cierre de cada año en CNY ÷ BPA real del año siguiente): 2018 3,34 ÷ 0,284 = 11,8; 2019 3,41 ÷ 0,235 = 14,5; 2020 1,93 ÷ 0,272 = 7,1; 2021 2,79 ÷ 0,329 = 8,5; 2022 2,30 ÷ 0,527 = 4,4; 2023 3,57 ÷ 0,712 = 5,0; 2024 6,76 ÷ 1,066 = 6,3; 2025 15,41 ÷ 1,047 (nuestro BPA de 2026e) = 14,7. Ningún año excluido (sin pérdidas; 2025 es el de la euforia de la IA pero no se quita). Mediana de 2021-2025: 6,34; mínimo 4,36 (2022); media de ocho años 9,03. PER actual: 10,46 ÷ 1,221 (nuestro BPA de 2027e) = 8,57. Cierres en HKD al cambio de fin de año [A5, D1].',
    v2: { mediana_5a: 9.49, minimo_5a: 6.77, media_larga: 10.07, excluidos: 'Al cierre (precio ÷ BPA del mismo año): 2018 12,4; 2019 12,0; 2020 8,2; 2021 10,3; 2022 7,0; 2023 6,8; 2024 9,5; 2025 14,5.' },
  },
  comparables_per: { mediana: 13.8 },
  consenso: { bpa_ano1: 1.14, bpa_ano2: 1.38, objetivo_medio: 20.30, objetivo_min: 17.93, objetivo_max: 23.11, analistas: 7, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (earningsTrend, S&P Global) y Stock Analysis, 19-oct-2026; objetivos de 23,82 / 21,04 / 27,12 HKD al cambio del BCE [D2, D3]' },
  diferencia_consenso: 'Nuestro BPA de 2026e (1,05) queda un 8 % por debajo del consenso (1,14) y el de 2027e (1,22), un 12 % por debajo (1,38) [D3]. La diferencia es de ventas y margen: el consenso espera 15.827 M en 2027e y nosotros 14.379 M con un margen EBITDA del 19 %, porque el 1S26 mostró que lo que crece (centros de datos, exterior) deja menos margen y más minoritarios. El precio base (10,69 CNY) queda un 47 % por debajo del objetivo medio de los analistas (20,30 CNY), que está fuera de nuestro rango: los analistas pagan 15-17 veces el beneficio y la regla común, 7,8 veces, porque Wasion nunca ha cotizado a más de 9 veces de forma sostenida.',
  media: null,
  comentario: 'El objetivo a 12 meses (ponderado 10,68 CNY; base 10,69) queda un 41 % por debajo del valor intrínseco (18,09). La distancia es de múltiplo: el DCF paga el ROIC del 20 % y el mercado nunca ha pagado más de 9 veces el beneficio a Wasion, salvo en la euforia de 2025. Para cerrarla haría falta que el beneficio de 2026-2027 vuelva a crecer con caja (cobros de los clientes de 181-365 días), que Wayon salga a bolsa con valor visible o que Willfar recupere el beneficio. Ninguno tiene fecha en 12 meses: la tesis es a 2-3 años.',
};

const suma_partes = {
  aplica: true, descuento_holding_pct: 0,
  partes: [
    { segmento: 'Eficiencia energética con IA (Willfar, 59,55 %)', metrica: 'Valor empresa en bolsa', valor_metrica: null, multiplo: null, ev_directo: 10627, justificacion: 'Capitalización de Willfar (688100.SS) el 16-oct, 11.579 M CNY, menos su caja neta (952 M): 10.627 M al 100 %; el 40,45 % de terceros se resta en el puente a valor de mercado [D9].' },
    { segmento: 'Servicios de energía digital (Wayon Energy, ≈ 60 %)', metrica: 'Valor de la ronda de Boyu', valor_metrica: null, multiplo: null, ev_directo: 4750, justificacion: 'Boyu pagó 380 M CNY por el 8 % (dic-2025): 4.750 M después de la ampliación, ≈ 9 veces el resultado del segmento de 2025 (521 M). Se toma como valor empresa (sin deuda neta publicada de Wayon) [A16].' },
    { segmento: 'Soluciones de red inteligente (contadores)', metrica: 'Resultado del segmento 2025', valor_metrica: 598.7, multiplo: 8, ev_directo: null, justificacion: '8 veces el resultado operativo del segmento (598,7 M en 2025), el EV/EBIT de los fabricantes chinos de contadores (Sanxing, Linyang, Hexing: EV/EBITDA de 8,6-17 veces con márgenes menores) [A1, B4].' },
  ],
  comentario: 'Las tres partes suman ≈ 20.170 M de valor empresa frente a los 15.654 M del grupo en bolsa. La pieza clave es Willfar, que cotiza en Shanghái a 14,4 veces su beneficio: la participación del 59,55 % vale ≈ 6.900 M, el 64 % de la capitalización de Wasion, y deja los contadores y Wayon a un precio implícito muy bajo [D9]. Los resultados de los segmentos suman el EBIT del grupo (1.778,7 M frente a 1.778,3 M), así que no hay costes centrales que restar [A1]. Riesgos: el precio de Willfar puede bajar (−52 % en un año) y la ronda de Wayon es de antes de la caducidad de su solicitud.',
  confianza: 'Media',
};

const riesgos = {
  items: [
    { riesgo: 'Clientes que no pagan: cuentas a cobrar de 8.893 M brutos (el 43 % del activo), con el tramo de 181-365 días doblado en el 1S26', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −20 % (deterioro de 1.000-2.000 M)', mitigante: 'La mayoría son redes estatales chinas que pagan tarde pero pagan; el deterioro histórico es del 0,5-1 % de las ventas [A1, A11].', senal: 'Clientes de más de 180 días por encima de 3.000 M o deterioro anual por encima de 150 M' },
    { riesgo: 'Margen a la baja por la mezcla (centros de datos, exterior) y la competencia', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−12 % por cada 2 puntos de margen EBITDA', mitigante: 'Coste bajo y fábricas locales; el contador nuevo mejora costes en el 2S26 según la dirección [A11].', senal: 'Margen bruto del grupo por debajo del 30 % en un semestre' },
    { riesgo: 'Willfar sigue cayendo (beneficio del 1S26 −33,7 %)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (la participación es el 64 % de la capitalización)', mitigante: 'Cartera de 3.823 M y contratos nuevos de 1.306 M en el 1S26 [A11].', senal: 'Ventas de Willfar de 9M26 por debajo del año anterior' },
    { riesgo: 'Wayon no sale a bolsa y los inversores ejercen las opciones de venta', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 % (caja de 1.437 M que sale; ya restada en el puente)', mitigante: 'Caja neta de ≈ 1.650 M y flujo operativo positivo en el año [A11, A12].', senal: 'Anuncio de renuncia a la salida a bolsa o de ejercicio de las opciones' },
    { riesgo: 'Otra colocación o dilución por el accionista de control', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'El presidente ha comprado en bolsa y la empresa recompra [A17, C7].', senal: 'Uso del mandato general de emisión (hasta el 20 %)' },
    { riesgo: 'Licitaciones de la red china: volumen y precio', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 %', mitigante: 'Primer puesto en las licitaciones de la red estatal del 1S26; XV Plan con +40 % de inversión [A11, B5].', senal: 'Contratación con la red en 2026 por debajo de +30 %' },
    { riesgo: 'Aranceles y riesgo de país en el exterior (México, Brasil, África, Oriente Medio)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Fábricas en México, Brasil, Hungría, Indonesia y Malasia [A1].', senal: 'Aranceles de EE. UU. a contadores fabricados en México con componentes chinos' },
    { riesgo: 'Control familiar y minoritarios crecientes en las filiales', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Dividendo del 40 % del beneficio y recompras [A1].', senal: 'Nuevas ventas de participaciones de filiales por debajo de su valor' },
  ],
  premortem: 'Octubre de 2029: Wasion vale un 40 % menos. Lo que pasó: el 1S26 era el principio. Los clientes de centros de datos del exterior y algunas redes de África y Oriente Medio alargaron los pagos y en 2027 la empresa tuvo que deteriorar 1.200 M de cuentas a cobrar; el flujo operativo fue negativo dos años y la caja neta pasó a deuda. Willfar siguió perdiendo ventas porque la red china cambió el estándar de comunicaciones y entró la competencia. Wayon nunca salió a bolsa: los inversores ejercieron las opciones de venta y la familia volvió a colocar acciones con descuento. El margen EBITDA bajó al 15 % por la guerra de precios en distribución. El mercado, que solo pagaba 8 veces, bajó a 6. Las señales que lo habrían anticipado: los clientes de más de 180 días por encima de 3.000 M en el balance de 2026, el margen bruto por debajo del 30 % y un segundo uso del mandato de emisión.',
  ia: {
    exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '+10 % a −15 %',
    comentario: 'La IA es la razón de la subida y de buena parte de la caída. A favor: los centros de datos multiplican la demanda de distribución eléctrica, cabinas prefabricadas, HVDC y refrigeración líquida; los pedidos de centros de datos de Wayon crecieron un 153 % en el 1S26 (1.892 M) y el consumo eléctrico de los servicios de datos en China, un 45 % [A11]. En contra: es demanda de un ciclo de inversión (si los hiperescaladores frenan el capex, los pedidos caen de golpe), deja menos margen que los contadores y cobra más tarde; y el segmento que se presenta como «eficiencia energética con IA» (Willfar) es el que cae (−22 % en ventas). La IA no amenaza el producto (contadores y equipos de red). Señal: pedidos de centros de datos de Wayon en el 2S26 y anuncios de recorte de capex de los grandes clientes de la nube.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: 'hasta 31-oct-2026', evento: 'Informe del 3T26 de Willfar (Shanghái)', efecto: 'Dirá si el freno del 1S26 (ventas −22 %, beneficio −33,7 %) continúa [A14]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'nov-dic 2026', evento: 'Licitaciones centralizadas de contadores de la red estatal china', efecto: 'Volumen y precio de 2027; la empresa espera +30 % de contratación en 2026 [A11, B5]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027 (sin fecha)', evento: 'Nueva solicitud de salida a bolsa de Wayon Energy o ejercicio de las opciones de venta', efecto: 'Valor visible de Wayon o salida de 1.437 M de caja [A12, B8]', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '26-mar-2027 (estimada)', evento: 'Resultados de 2026 y dividendo final', efecto: 'Margen del 2S26, cobro de clientes y flujo operativo; dividendo de ≈ 0,42 CNY [A6]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'hasta la junta de mayo de 2027', evento: 'Recompras (hasta 200 M HKD, casi agotado)', efecto: '13,2 M de acciones recompradas; una ampliación del programa sería una señal [A17, C8]', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027-2028', evento: 'Entregas de los pedidos exteriores (Oriente Medio 1.250 M; Wayon > 4.000 M)', efecto: 'Ventas del exterior; margen y plazos de cobro por confirmar [B6, B7]', probabilidad: 'Alta', sentido: '+' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Cobros', pregunta: '¿Quiénes son los clientes del tramo de 181-365 días (2.593 M) y qué parte es de redes estatales chinas y qué parte del exterior y de centros de datos?', por_que: 'Es el mayor riesgo de valor: un deterioro de 1.000-2.000 M.' },
    { tema: 'Margen', pregunta: '¿Qué margen bruto tienen los pedidos de centros de datos y del exterior y cuándo llega la mejora de coste del contador nuevo?', por_que: 'El margen bruto cayó 3,9 puntos en el 1S26.' },
    { tema: 'Wayon', pregunta: '¿Se volverá a presentar la solicitud de salida a bolsa de Wayon? ¿Qué pasa con las opciones de venta de 1.437 M si no sale?', por_que: 'Caducó a los seis meses sin anuncio; la suma de partes depende de su valor.' },
    { tema: 'Willfar', pregunta: '¿Por qué caen un 22 % las ventas de Willfar en el 1S26 y cuándo se recuperan?', por_que: 'La participación es el 64 % de la capitalización de Wasion.' },
    { tema: 'Colocación', pregunta: '¿Para qué hacía falta colocar 1.474 M HKD en abril con caja neta, y por qué recomprar después a la mitad de precio?', por_que: 'Asignación de capital y alineación con el minoritario.' },
    { tema: 'Minoritarios', pregunta: '¿Qué parte del beneficio irá a minoritarios en 2027 con Wayon al 60 % y Willfar al 59,55 %?', por_que: 'Ya es el 31,5 % en el 1S26.' },
  ],
  confianza: 'Media',
};

export default {
  objetivo_12m, suma_partes, riesgos, catalizadores, preguntas,
  ...(R.resumen ? { resumen: R.resumen } : {}),
  dcf_lectura: 'El DCF da 19,72 CNY por acción (23,15 HKD), un 88,5 % más que el precio, con un WACC del 7,78 % y un crecimiento terminal del 1 %; el valor terminal pesa el 81 %. El precio de 10,46 CNY implica una rentabilidad anual del 11,3 %, 3,5 puntos por encima del WACC: el mercado pide mucho más que nuestro coste de capital, por el riesgo de cobro, el descuento de Hong Kong y los minoritarios. El DCF inverso no tiene solución porque el circulante (33-38 % de las ventas) hace que crecer más apenas añada valor. El valor es sensible al circulante y al margen: cada 5 puntos de circulante sobre ventas restan ≈ 1.000 M, y cada punto de margen EBITDA en toda la proyección mueve el valor un 6 %. Con la prima implícita del mercado (4,2 %) el valor sube a 25,41 CNY.',
  escenarios_comentario: 'El bajista del DCF (11,90 CNY) queda un 13,8 % por encima del precio: el mercado descuenta algo peor que nuestro bajista, un margen que no se recupera y cobros que no llegan. El alcista (24,04 CNY, +129,8 %) supone el crecimiento del consenso. Con probabilidades de 25/50/25 el valor ponderado de los escenarios es de 18,85 CNY. La asimetría del DCF es muy favorable, pero el objetivo a 12 meses por PER no lo es (bajista −54,7 % con el dividendo), porque el mercado nunca ha pagado por Wasion el múltiplo que da el DCF.',
  valoracion_comentario: 'Pesos: DCF 35 %, suma de partes 25 %, escenarios 25 % y comparables 15 %. La suma de partes pesa porque una parte cotiza (Willfar) y otra tiene precio reciente (la ronda de Wayon): es la medida más ligada al mercado. El DCF pesa más que los comparables porque el descuento de Hong Kong y el de los minoritarios deforman el PER relativo. Sin transacciones con múltiplo publicado. La dispersión es amplia pero todos los métodos quedan por encima del precio: comparables 18,46, suma de partes 14,83, DCF 19,72. El puente parte del balance de junio de 2026: minoritarios de Willfar a mercado (4.684 M) y el resto a valor contable sin los 570 M cubiertos por las opciones de venta de Wayon, que van como deuda (1.437 M) junto con ≈ 153 M de recompras pagadas desde junio [A12, A17].',
};
