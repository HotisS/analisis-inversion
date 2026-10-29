// Textos del analista (Lennox, corte 2026-10-29). Cifras de calc tras el último cálculo.
export const limitaciones = `Se valora la acción de Lennox en la Bolsa de Nueva York (LII), en dólares, al cierre del 28-oct-2026 (332,64 USD, mínimo de 52 semanas): la sesión del 29 no había abierto al corte [D]. Acciones: 34,31 M diluidas (10-Q del 3T26) [D]. El puente es el balance de 30-sep-2026, con la compra de Heat Controller ya dentro [A, D]. El BPA de los escenarios y el de la historia del PER es el ajustado que publica la empresa (sin reestructuración, litigios especiales, costes de compras ni plusvalías; con la amortización de intangibles) [A, D]. El BPA ajustado de 2026 incluye una devolución de aranceles de 30 M USD en el 2T26 que la empresa no ajusta (≈0,65 USD por acción, cálculo propio) [A]. El cambio de LIFO a FIFO del 4T25 reexpresa 2023-2025; 2016-2022 siguen en LIFO (≈140 M menos de existencias) y el BPA ajustado de 2023 de la historia del PER es el publicado con LIFO [A, D]. La transcripción de la conferencia del 3T26 no estaba publicada: lo que dijo la dirección sale de la nota de prensa y del 10-Q [A]. El consenso del corte (Yahoo, 29-oct a primera hora) aún no recoge la guía nueva [D]. El análisis del 15-oct se hizo sin investigación por partes y con resúmenes de terceros; este lo sustituye con cuentas de EDGAR.`;

export const controles_explicados = [
  { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'La v2 (historia del PER al cierre) da +13,1 %, Mantener: no es compra robusta (nivel A). Con calidad completa y la v2 y el BPA −10 % en Mantener, es compra de nivel B1 hasta 340,08 USD; la robusta pide un precio por debajo de 323,62 USD.' },
];

export const parches = [
  { ruta: 'bolsa.contexto.veredicto', valor: 'no cambia' },
  { ruta: 'bolsa.contexto.condicion', valor: null },
  { ruta: 'bolsa.contexto.movimientos_fuertes[0].veredicto', valor: 'no cambia' },
  { ruta: 'bolsa.contexto.movimientos_fuertes[0].condicion', valor: null },
  { ruta: 'bolsa.contexto.noticias[0].veredicto', valor: 'no cambia' },
  { ruta: 'bolsa.contexto.noticias[0].condicion', valor: null },
];

export const contexto_comentario = `Veredicto global: no cambia. La caída del 28-oct (−10,6 %) es la reacción a los resultados y a la guía nueva, que este informe ya incorpora: nuestro BPA de 2026e está en la guía y el de 2027e, un 11 % por debajo del consenso sin revisar [D]. Esperar a que el consenso se revise o a la guía de 2027 sería esperar a resultados, que el método descarta para las compras (regla del 15-oct); la tendencia bajista se da como dato, no como motivo para esperar.`;

export const rentabilidad = {
  comentario: `Lennox crea mucho valor: el ROIC fue del 50,4 % en 2024 y del 40,4 % en 2025 frente a un WACC del 10,1 %, y del 48,7 % sin el fondo de comercio de las compras; el ROIC incremental histórico es del 43,4 %. Lo mueve el margen (EBITDA del 21-22 %, el más alto del sector) y una rotación del capital alta, porque las fábricas están amortizadas. La caída de 2025 viene del capital: inventario del cambio de refrigerante y ≈770 M de fondo de comercio e intangibles de Duro Dyne y Supco [A]. Frente a sus rivales, el ROIC es muy superior al de Trane (23,9 %) y Carrier [D]. El ROE no sirve: el patrimonio está reducido por las recompras.`,
  confianza: 'Alta',
};

export const dcf_lectura = `El DCF da 310,06 USD por acción, un 6,8 % por debajo del cierre del 28-oct (332,64), con un WACC del 10,12 % (bono de EE. UU. al 5,05 %) y un 62 % del valor en el terminal. Con la prima de riesgo que hoy pide el mercado (4,20 %) sale 382,84 USD (+15,1 %). El DCF inverso dice que a 332,64 USD el mercado descuenta un crecimiento del 5,5 % anual en 2027e-2033e, por encima del 4,0 % de nuestro caso base (o un margen del 23,0 % frente al 21,8 %): con nuestro WACC el precio no es barato; la diferencia la pone la tasa de descuento, no las cifras.`;

export const narrativas = {
  Bajista: 'La guerra de precios en residencial sigue y la reposición aplazada no vuelve: crecimiento 3 puntos menor y margen 2 puntos menor que en el caso base, con un terminal del 2,5 %.',
  Base: 'Ventas +6 % en 2026 (5 puntos de compras), +5 % en 2027-2028 y convergencia al 3 %, con el margen EBITDA recuperando parte de lo perdido (del 20,5 % al 21,8 %), sin volver al récord del 22,2 % de 2025.',
  Alcista: 'La reposición vuelve con tipos más bajos, la competencia en la gama de entrada se calma y el comercial sigue al 15 % orgánico: crecimiento 1,5 puntos mayor y un punto más de margen.',
};

export const escenarios_comentario = `El bajista (224,52 USD, −32,5 %) pesa mucho más que el alcista (353,45 USD, +6,3 %) en el DCF: con un WACC del 10,1 % el precio de hoy ya está por encima del caso base. La lectura del objetivo a 12 meses es la contraria (bajista −18,7 %, alcista +75,9 %), porque ahí el múltiplo de partida es el PER de hoy, el más bajo en diez años salvo 2022.`;

export const valoracion_comentario = `Pesos: DCF 50 %, escenarios 35 % y comparables 15 % (los rivales cotizan con prima por los centros de datos). Valor intrínseco de 345,33 USD (+3,8 %). La recomendación la decide el objetivo a 12 meses por PER (regla v3): +24,7 % ponderado y +20,8 % en el caso base, con el valor intrínseco por encima del precio: Comprar. No es compra robusta: con la historia del PER al cierre (v2) da +13,1 % y con un BPA un 10 % peor, +12,4 %; las dos se quedan en Mantener. La calidad sí es completa: ROIC del 40,4 % frente a un WACC del 10,1 % (30,3 puntos) y sostenibilidad «Sí».`;

export const objetivo12m_comentario = `El objetivo ponderado (409,56 USD; base 396,64) usa en el caso base un PER de 16,0 veces (el actual de 14,5 con el tope ×1,1; la mediana adelantada de 5 años es 22,9) sobre un BPA de 2028e de 24,79 USD, un 7 % por encima del de 2025 y por debajo de lo que el consenso esperaba antes del recorte. Con la historia al cierre (v2) la rentabilidad es del +13,1 % ponderado y +9,7 % en el base. El objetivo de los analistas (438,07 USD) es anterior a los resultados y bajará.`;

export const catalizadores = {
  items: [
    { fecha: 'Nov-2026', evento: 'Revisión del consenso y de los objetivos tras el recorte de guía', efecto: 'El consenso de BPA 2026e (23,38) tiene que bajar a la guía (21,00-21,50): presión en el corto plazo', probabilidad: 'Alta', sentido: '−' },
    { fecha: '27-ene-2027 (estimada)', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía tras tres recortes; prueba de si el margen residencial se estabiliza', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Fin de la reducción de inventarios del R-454B en la distribución y vuelta de la reposición', efecto: 'Volumen residencial', probabilidad: 'Media', sentido: '+' },
    { fecha: '2026-2027', evento: 'Demanda antimonopolio por pactar precios (E.D. Michigan)', efecto: 'La empresa no estima la pérdida posible', probabilidad: 'Baja', sentido: '−' },
    { fecha: 'Desde 19-nov-2026', evento: 'Ventas programadas de un consejero (hasta 35.000 acciones)', efecto: '≈0,1 % del capital; ruido', probabilidad: 'Alta', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Guerra de precios en residencial: la empresa baja precios para recuperar cuota (margen del segmento −4,9 puntos en el 3T26)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % (bajista del objetivo a 12 meses: 265 USD)', mitigante: 'Coste por unidad y red de distribución propia; el comercial crece al 24 %', senal: 'Margen residencial por debajo del 18 % otro trimestre' },
    { riesgo: 'Ciclo de reposición residencial aplazado (tipos, vivienda, inventarios en la distribución)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Los equipos tienen 15-20 años de vida: la reposición se aplaza, no se pierde', senal: 'Envíos de la AHRI a la baja en 2027' },
    { riesgo: 'Credibilidad de la guía: tres recortes en 2026 tras años de batirla', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % de múltiplo', mitigante: 'Plan a 2026 de diciembre de 2022 cumplido antes de plazo', senal: 'Guía 2027 recortada en el 1T27' },
    { riesgo: 'Demanda colectiva antimonopolio contra siete fabricantes por pactar precios desde 2020', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'No estimable; la empresa reconoce que podría ser material', mitigante: 'Lo niega; fase inicial', senal: 'Rechazo de la moción de desestimación' },
    { riesgo: 'Aranceles e inflación de costes (45 M USD en el 3T26)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Fabricación sobre todo en Norteamérica; subidas de precio en comercial', senal: 'Nuevos aranceles sobre el acero o el cobre' },
  ],
  premortem: 'Octubre de 2027: la acción vale 260 USD. Carrier, Trane y Daikin respondieron a las bajadas de precio de Lennox, el margen residencial se quedó en el 17-18 % y la reposición no volvió; el BPA de 2027 quedó en 20 USD y el mercado siguió pagando 13 veces. La señal: el margen residencial del 4T26 y del 1T27 sin mejorar.',
  ia: { exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: 'Pequeño: el negocio de centros de datos (refrigeración) es una parte menor del comercial', comentario: 'La inteligencia artificial no amenaza la venta de equipos de climatización; la oportunidad está en la refrigeración de centros de datos, donde Lennox llega tarde frente a Vertiv, Trane y Modine [B].' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Precios', pregunta: '¿Cuánta cuota ha recuperado con las bajadas de precio en residencial y cuándo dejarán de restar margen?', por_que: 'Es la diferencia entre nuestro caso base y el bajista [A].' },
    { tema: 'Inventarios', pregunta: '¿Cuántas semanas de inventario de R-454B quedan en la distribución?', por_que: 'Decide cuándo vuelve el volumen [B].' },
    { tema: 'Guía', pregunta: '¿Qué margen residencial supone la guía del 4T26 (BPA de 3,11-3,61 USD)?', por_que: 'Punto de partida de 2027 [A].' },
    { tema: 'Litigio', pregunta: '¿Qué provisiones o costes legales prevé por la demanda antimonopolio?', por_que: 'La empresa no estima la pérdida posible [C].' },
  ],
  confianza: 'Media',
};

export const diferencia_consenso = `Nuestro BPA de 2026e (21,20 USD) está en la guía nueva (21,00-21,50) y un 9 % por debajo del consenso, que aún no la recoge (23,38). En 2027e vamos un 11 % por debajo (22,88 frente a 25,73): la diferencia es de margen y de punto de partida, no de ventas [D].`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Comprar, con convicción baja. El objetivo a 12 meses da un +24,7 % ponderado y un +20,8 % en el caso base sobre el cierre del 28-oct (332,64 USD), con el valor intrínseco (345,33 USD) algo por encima del precio. No es una compra robusta: con la historia del PER al cierre (v2) la rentabilidad baja al +13,1 % y con un BPA un 10 % peor al +12,4 %, las dos en Mantener. La calidad es completa (ROIC del 40,4 % frente a un WACC del 10,1 %; crecimiento sostenible). La convicción es baja porque las dos reglas del valor intrínseco discrepan: con nuestro WACC sale Mantener y con la prima del mercado, Comprar.

**Qué ha pasado.** El 28-oct publicó el 3T26: ventas de 1.572 M USD (+10 %, +4 % orgánico) y BPA ajustado de 6,84 USD frente a 7,33 esperado. El residencial creció un 3 % (volumen orgánico −3 %, con los envíos del sector al alza: pierde cuota) y su margen cayó 4,9 puntos, al 18,7 %, por bajadas de precio para recuperarla, inflación y aranceles [B]; el comercial creció un 24 % con un margen del 26,2 % [A]. Recortó por tercera vez la guía de BPA ajustado de 2026, a 21,00-21,50 USD (23,50-25,00 en enero), y la de flujo libre, a 700-750 M [A, C]. La acción cayó un 10,6 % ese día y un 43 % desde el máximo de julio [D].

**El negocio.** Climatización y refrigeración en Norteamérica, con ventas de 5.448 M USD en los últimos 12 meses, margen EBITDA del 21 % y ROIC del 40 % [A]. Vende con red propia de tiendas al instalador y reparte la caja en recompras y dividendo, con deuda neta de 1,4 veces el EBITDA [A].

**Valoración.** DCF de 310,06 USD (WACC del 10,12 %); escenarios de 224,52 a 353,45 USD. Cotiza a 14,5 veces el BPA de 2027e, el PER más bajo desde 2022 y muy por debajo de su mediana adelantada de 5 años (22,9) y de los comparables (22,5) [D]. Nuestro BPA de 2027e es un 11 % menor que el consenso, que aún no recoge la guía nueva.

**Qué cambiaría la decisión.** La compra robusta (las dos versiones y un BPA un 10 % peor) pide un precio por debajo de 323,62 USD. Para quien la tiene, venta por encima de 377,17 USD (filtro de mantener); la banda Vender de la regla empieza en 460,98. La señal de alarma: el margen residencial sin mejorar en el 4T26 y una guía de 2027 por debajo de 22 USD.`,
  tesis: 'Lennox es la climatizadora más rentable de Norteamérica, en mínimos de valoración tras recortar tres veces la guía de 2026 por una guerra de precios en residencial que ella misma ha empezado para recuperar cuota. Si el margen se estabiliza, el precio de hoy paga 14,5 veces un beneficio que ya está en la parte baja del ciclo.',
  vision_diferencial: {
    mercado_descuenta: 'Un PER de 14,5 veces, como si el margen perdido en 2026 no volviera; con nuestro WACC, el DCF inverso pide un crecimiento del 5,5 % anual [D].',
    nuestra_vision: 'BPA de 2028e de 24,79 USD, un 7 % por encima del de 2025, con recuperación parcial del margen residencial y el comercial creciendo.',
    por_que: 'El problema es de cuota y de precio, no de mercado: los envíos de la AHRI suben un 6,2 % en el año y el residencial de Watsco un 7 %, mientras el volumen orgánico residencial de Lennox cae un 3 % [B]. Si las bajadas de precio recuperan la cuota en 2027, el margen se estabiliza sobre una base de volumen mayor; si no, gana el bajista.',
  },
  a_favor: [
    '**ROIC del 40 %**, el más alto del sector [A].',
    '**PER de 14,5 veces**, muy por debajo de su historia (22,9) y de los rivales (22,5) [D].',
    '**Comercial creciendo al 24 %** con un margen del 26,2 % [A].',
    '**Deuda baja**: 1,4 veces el EBITDA [A].',
  ],
  en_contra: [
    '**Tres recortes de guía en 2026**: la credibilidad baja [C].',
    '**Margen residencial −4,9 puntos** por precio: puede no volver [A].',
    '**Demanda antimonopolio** sin estimación de pérdida [C].',
    '**Pierde cuota en residencial** con el mercado al alza (AHRI +6,2 % en el año; volumen orgánico de Lennox −3 %) [B].',
    '**Tendencia bajista** y consenso aún por revisar a la baja [D].',
  ],
  que_vigilar: 'El margen residencial (18,7 % en el 3T26), los envíos de la AHRI, la revisión del consenso y la guía de 2027 (finales de enero de 2027).',
  cambiaria_recomendacion: [
    'Por debajo de 323,62 USD sería compra robusta (aguanta la v2 y un BPA un 10 % peor); hasta 340,08 USD es compra de nivel B1 (calidad completa, números aflojados).',
    'Por encima de 345,33 USD el valor intrínseco queda por debajo del precio y pasa a Mantener; para quien la tiene, venta por encima de 377,17 USD (filtro de mantener). La banda Vender de la regla (ponderada ≤ −10 %) empieza en 460,98.',
    'Un margen residencial sin mejorar en el 4T26 y una guía de 2027 por debajo de 22 USD llevarían el caso base hacia el bajista.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen del segmento residencial (HCS)', nivel_actual: '18,7 % (3T26)', umbral_alerta: '< 18 %', por_que: 'Mide la guerra de precios.' },
    { kpi: 'Crecimiento orgánico del comercial (BCS)', nivel_actual: '+15 % (3T26)', umbral_alerta: '< 5 %', por_que: 'Compensa el residencial.' },
    { kpi: 'Guía de BPA ajustado', nivel_actual: '21,00-21,50 USD (2026)', umbral_alerta: '< 22 USD para 2027', por_que: 'Base del objetivo a 12 meses.' },
  ],
  confianza: 'Media',
};
