// Textos del analista (Iberdrola, corte 2026-10-26). Cifras del motor tal cual (calc); hechos con cita de la nota.
export default {
  limitaciones: 'Precio: cierre del 23-oct-2026 (21,90 €); la sesión del 26 seguía abierta. Cuentas 2020-2025 del XBRL (ESEF) y 9M26 del informe de resultados; el XBRL no trae amortizaciones ni segmentos: la amortización es el EBITDA de la empresa menos el EBIT, y los segmentos solo se tienen para 9M25-9M26 con la segmentación nueva (Redes / Generación y Clientes). Las acciones en circulación (6.563 M) son una estimación: emitidas (6.673 M) menos ≈110 M de autocartera deducida de las compras de 4.149 M de 9M26. El BPA del consenso (MarketScreener, Yahoo) no resta los cupones de los híbridos; el nuestro y el de la historia, sí. No se leyeron transcripciones de las conferencias (de pago). La base de activos regulada (56.000 M) es solo de Redes.',
  controles_explicados: [
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2024)', explicacion: 'La diferencia (1.479 M) es el resultado de actividades interrumpidas (México: venta de 13 centrales en 2024 y su negocio ordinario) que el XBRL presenta fuera del BAI; el beneficio atribuido publicado es 5.612 M [A1].' },
    { control: 'BAI − impuestos − minoritarios = beneficio neto (2025)', explicacion: 'Los 364 M de diferencia son el resultado de México como actividad interrumpida; nuestro BPA parte del beneficio de operaciones continuadas [A1, A2].' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El flujo libre real de 2023-2025 (−740, −1.500 y −3.081 M) es negativo porque la inversión (10.634-12.540 M) superó el flujo de explotación, que además convirtió solo el 73 % del EBITDA en caja en 2025 (11.635 de 15.956 M) por provisiones, déficits tarifarios y circulante [A1]. Nuestro DCF proyecta un flujo libre de 667 M de media en 2026-2028 porque el EBITDA sube a ≈19.000 M (+19 %) con una inversión del 29-30 % de las ventas y la conversión plena del EBITDA menos impuestos y circulante. Es un supuesto favorable a la empresa: si la conversión siguiera en el 73 %, el valor del DCF sería menor.' },
  ],
  secciones: {
    capital: { comentario: 'La dirección asigna capital con disciplina de financiación y rentabilidades ajustadas. En 2023-2025 invirtió 34.707 M (10.634, 11.533 y 12.540 M) frente a un flujo de explotación de 35.690 M, y además pagó 3.390 M en dividendos en efectivo y compró 7.880 M de acciones propias [A1]: el hueco se cubrió con rotación de activos (México, 6.129 M en 2024), una ampliación de 4.979 M en 2025 y más deuda (de 48.278 M a 54.090 M de deuda financiera) [A1]. En 9M26 invirtió 10.087 M más y compró 4.149 M de autocartera [A2]. Las compras (ENW, minoritarios de Avangrid y Neoenergia, Caruna) son de redes reguladas en países con buen rating. El ROIC del motor (6,7 % en 2025) apenas supera el WACC (6,52 %): el capital nuevo crea poco valor por encima de su coste, aunque de forma muy previsible.' },
  },
  dcf_justificacion: {
    crecimiento: 'Ventas +5 % en 2026 (9M26 +6,2 % [A2]; consenso +3,5 % [D1]), +5 % en 2027-2028 (base de activos de redes +14 % [A4]; Caruna aporta ≈1 punto desde 2027 [A6]) y bajada gradual al 2 % en 2034-2035. Las ventas de una eléctrica siguen también al precio mayorista: medimos la actividad con el EBITDA, que crece un 5,6 % anual en 2025-2028.',
    margenes: 'Margen EBITDA (el de la empresa) del 36,2 % en 2025 con partidas no recurrentes y del 34,6 % en 9M26 sin ellas [A1, A2]. Sube al 35,0 % en 2026 (11.891 M en 9M y ≈4.300 M en el 4T), al 37,3 % en 2028 por la mezcla (Redes, el 54 % del EBITDA ajustado, crece un 15 %; Generación y Clientes cae un 1,5 % [A3]) y se queda en el 38 %. EBITDA de 19.032 M en 2028, un 1,2 % por debajo del consenso [D1].',
    inversion: 'Inversión del 30 % de las ventas en 2026 (≈13.900 M; 10.087 M en 9M26, +13 % [A4]) y del 29,5 % y el 29 % en 2027-2028, y bajada gradual al 19,5 % en 2035: 5,5 puntos sobre la amortización (14 %), lo que exige el 2 % de crecimiento terminal con un ROIC del ≈6,6 %. Circulante al 14 % de las ventas, su nivel real de 2025 (clientes 10.284 + existencias 2.364 − proveedores 6.463 M [A1]): consume caja al crecer.',
    wacc: 'Bund a 10 años del 3,39 % (23-oct) [D13]. Beta 0,66: la observada frente al sector europeo (0,63 mensual a cinco años [D8]) desapalancada con la deuda media del periodo da ≈0,48; tomamos 0,50 y la reapalancamos con la deuda propia de hoy (56.983 M de deuda neta frente a 143.730 M de capitalización: D/E 0,40). Prima de mercado del 5,5 % y 0,5 puntos por Brasil (17 % del EBITDA). Coste de la deuda del 4,93 % [A2]; peso de la deuda del 28 %. WACC 6,52 %.',
    terminal: 'Gordon con un crecimiento del 2 % (inflación del euro), por debajo del Bund. El múltiplo implícito es de 8,0 veces el EBITDA terminal, cerca de la mediana de los comparables (7,3x) y lejos de las 13,4x a las que cotiza hoy Iberdrola. El valor terminal pesa el 78 % del valor empresa.',
  },
  puente_comentarios: {
    '2026e': 'Volumen 3,5 %: base de activos de redes y producción +3 % [A3]; precio 1,5 %: tarifas reguladas en EE. UU. y Brasil y ventas cerradas a precios más altos [A2].',
    '2027e': 'Volumen 3 %: inversión en redes (RIIO-T3, NECEC) [A3]; precio 1 %; otros 1 %: Caruna (cierre previsto en el 1T27) [A6].',
    '2028e': 'Volumen 4 %: plan de inversión en redes; precio 1 %.',
    '2029e': 'Volumen 3 %: RAB hacia > 90.000 M en 2030 [A4]; precio 1 %.',
    '2030e': 'Volumen 2,5 %; precio 1 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La proyección reinvierte el 59 % del NOPAT; con el ROIC de 2025 (6,7 %) eso financia un 4,0 % anual de crecimiento, por encima del 3,5 % de ingresos proyectado, y el capital nuevo rinde un 6,6 %, por debajo del ROIC incremental histórico (10,7 %). El crecimiento es sostenible, pero crea poco valor: el ROIC queda 0,2 puntos por encima del WACC. El foso es regulatorio: las redes crecen con la inversión reconocida por el regulador, no con poder de precios. No se rebaja el caso base.',
  dcf_lectura: 'El DCF da 9,93 € por acción con un WACC del 6,52 % y un valor terminal del 78 % del valor empresa; con la prima implícita del mercado (4,2 %) sube a 13,63 € y la síntesis, a 13,33 €. A 21,90 € el precio descuenta un crecimiento de las ventas del 10,0 % anual en 2027-2035 frente al 3,3 % de nuestro base, o un margen EBITDA del 46,5 % frente al 38 %: dicho de otro modo, la acción rinde un 5,0 % anual, menos que nuestro WACC (6,52 %) y que lo que pide hoy el mercado (5,9 %). La razón de fondo es que Iberdrola reinvierte casi toda su caja a un ROIC (6,7 %) que apenas supera el coste del capital: el DCF la valora cerca de su capital invertido, y el mercado le paga 1,8 veces ese capital por la previsibilidad de las redes y la escasez de activos regulados en países con rating A.',
  narrativas: {
    Bajista: 'Revisiones regulatorias más duras (RIIO-ED3 desde 2028, casos tarifarios en EE. UU.), precios mayoristas bajos en España y retrasos de inversión: ventas 1,5 puntos por debajo y margen 1,5 puntos menor. Crecimiento terminal del 1,5 %.',
    Base: 'Plan de inversión récord ejecutado, redes que crecen con la base de activos (+12-14 % anual), Caruna integrada en 2027 y beneficio ajustado de la empresa cerca de la guía de ≈+10 % anual.',
    Alcista: 'La demanda de centros de datos y la electrificación aceleran la inversión en redes en EE. UU. y Reino Unido: un punto más de crecimiento y un punto más de margen.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan muy por debajo del precio: 4,65 € el bajista, 9,93 € el base y 12,92 € el alcista. Incluso con la prima implícita del mercado el alcista se queda en 17,16 €. El resultado depende de la tasa de descuento y del ROIC del capital nuevo: con un ROIC que apenas supera el WACC, crecer más no sube mucho el valor.',
  suma_partes_comentario: 'No se aplica: Iberdrola no publica activos ni ingresos históricos por negocio con la segmentación nueva, y la base de activos regulada solo cubre Redes [A3].',
  o12: {
    Bajista: 'BPA 2028e de 0,96 €: ventas 1,5 puntos por debajo y margen 1,5 puntos menor (presión regulatoria y precios bajos en España), resultado financiero de −3.000 M. PER del mínimo adelantado de cinco años (14,6x).',
    Base: 'BPA 2028e de 1,11 €: beneficio atribuido de ≈7.520 M de operaciones continuadas (≈7.900 M con los «capital allowances» que suma la empresa), cerca de la guía de ≈+10 % anual. PER de 19,4x, el actual (21,3x) acotado a ÷1,1.',
    Alcista: 'BPA 2028e de 1,20 €: los centros de datos aceleran la inversión en redes y el beneficio supera la guía; el PER se queda en el base (19,4x), porque la media larga (16,8x) y los comparables (14,8x) quedan por debajo.',
  },
  diferencia_consenso: 'Nuestro BPA de 2027e (1,028 €) queda un 7,7 % por debajo del de Yahoo (1,114 €) y un 5,8 % del de MarketScreener (1,091 €) [D3, D1]. Casi toda la diferencia es de base: los proveedores no restan los cupones de los híbridos (≈0,037 € por acción) y siguen el beneficio ajustado de la empresa, que suma los «capital allowances» británicos (≈0,055 €); en EBITDA nos separamos solo un 2,2 %. Nuestro precio base (21,53 €) queda un 0,7 % por encima del objetivo medio de 23 analistas (21,38 €) [D3]: coincidimos en que no hay recorrido.',
  objetivo12m_comentario: 'El objetivo a 12 meses (20,09 €) dobla el valor intrínseco (9,70 €): el mercado paga a Iberdrola un múltiplo de red de crecimiento (21,3 veces nuestro BPA de 2027e) que el DCF no justifica con un ROIC del 6,7 %. Para cerrar la distancia haría falta que el múltiplo bajara hacia su mediana adelantada (15,3x), algo que no tiene fecha: la regla v3 solo lo acerca un 10 % en un año. La tesis de valor es a más de un año; a 12 meses el precio depende de mantener el múltiplo y de cumplir la guía.',
  valoracion_comentario: 'El DCF pesa el 60 % y los escenarios el 40 %: es el método que recoge la inversión que exige el crecimiento. Los comparables no entran en la síntesis (las integradas europeas cotizan a 7,3x EBITDA y 14,8x beneficio con menos crecimiento) y las transacciones no tienen múltiplos publicados. La dispersión es grande: DCF 9,93 €, DCF con la prima del mercado 13,63 €, comparables por PER 16,00 €, objetivo medio de los analistas 21,38 € y precio 21,90 €. Cada medio punto de WACC mueve el valor ≈3-5 € por acción. El puente resta 12.628 M de minoritarios e híbridos y suma 1.981 M de asociadas [A2, A5].',
  rentabilidad_comentario: 'El ROIC del motor fue del 6,7 % en 2025 (5,2-6,7 % en 2020-2025) frente a un WACC del 6,52 %: Iberdrola gana más o menos su coste de capital, como corresponde a un negocio regulado cuya tasa fija el regulador. El ROIC incremental histórico (10,7 %) es mejor que el medio porque las redes nuevas en EE. UU. y Reino Unido se retribuyen mejor que la generación vieja. El ROE (12,9 % en 2025) depende del apalancamiento (3,6 veces deuda neta/EBITDA) y de los híbridos, que figuran como patrimonio. Comparado con Endesa (13,4 %) o Naturgy (11,8 %) [D3], el ROIC de Iberdrola es medio, no superior.',
  catalizadores: {
    items: [
      { fecha: '2027-01', evento: 'Dividendo a cuenta de 0,275 € (+8,7 %) con Retribución Flexible', efecto: 'Rentabilidad por dividendo del ≈3,1 % anual [A4]', probabilidad: 'Alta', sentido: '+' },
      { fecha: '1T27', evento: 'Cierre de la compra del 80 % de Caruna', efecto: '≈2.500 M más de base de activos regulada y ≈2.000 M de pago [A6]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026', efecto: 'Confirmación de la guía de ≥ +10 % de beneficio ajustado [A4]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-03', evento: 'Día del inversor y plan nuevo', efecto: 'Objetivos a 2030-2031 (RAB > 90.000 M, ≈+10 % anual de beneficio) [A4]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Propuestas de Ofgem para RIIO-ED3 (distribución británica desde 2028)', efecto: 'Fijan la tasa de una parte central del beneficio de Reino Unido', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Compresión del múltiplo hacia su historia', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−22 % (PER adelantado de 15,3x sobre el BPA de 2028e)', mitigante: 'Beneficio que crece ≈10 % anual', senal: 'PER previsto por debajo de 19x o Bund por encima del 4 %' },
      { riesgo: 'Revisiones regulatorias más duras (RIIO-ED3, casos de EE. UU., CNMC)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−36 % (bajista a 12 meses, 13,99 €)', mitigante: 'Inversión concentrada en países con rating A [A3]', senal: 'Tasa financiera que proponga Ofgem para 2028-2033' },
      { riesgo: 'Subida de tipos de interés', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 € por cada medio punto de WACC', mitigante: 'Coste de la deuda del 4,93 % y vida media de 6 años [A2]', senal: 'Bund a 10 años' },
      { riesgo: 'Deuda creciente con el plan, las recompras y Caruna', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Rotación de activos y dividendo flexible', senal: 'FFO/deuda por debajo del 20 % (22,4 % en 9M26 [A3])' },
      { riesgo: 'Precios mayoristas bajos y costes de servicios de ajuste en España', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−4 %', mitigante: 'Redes son el 54 % del EBITDA ajustado [A3]', senal: 'EBITDA de Generación y Clientes en España (−4,6 % en 9M26)' },
      { riesgo: 'Política de EE. UU. contra la eólica marina', tipo: 'Político', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'EE. UU. es el 19 % del EBITDA y casi todo redes [A3]', senal: 'Revisión judicial de permisos de eólica marina (21-oct) [E6]' },
      { riesgo: 'Inteligencia artificial: menos demanda de redes de lo previsto si los centros de datos se retrasan o se autoabastecen', tipo: 'Tecnológico', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 % (menos crecimiento en el alcista)', mitigante: 'La retribución depende de la inversión reconocida, no del volumen', senal: 'Solicitudes de conexión de centros de datos en EE. UU., Reino Unido y España' },
      { riesgo: 'Sucesión del presidente ejecutivo', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'n. c.', mitigante: 'Consejero delegado nombrado en 2025 [C1]', senal: 'Anuncio de relevo en la presidencia' },
    ],
    premortem: 'Octubre de 2028: la acción ha perdido un 35 % y cotiza a 14 €. Qué pasó: en 2027 el Bund subió al 4,3 % y los inversores rotaron de las eléctricas a la renta fija; Ofgem fijó para RIIO-ED3 una tasa financiera inferior a la de RIIO-ED2 y Nueva York recortó la de NYSEG. Iberdrola mantuvo la inversión récord y las recompras, el FFO/deuda bajó del 20 % y una agencia amenazó el rating; el día del inversor de marzo de 2027 rebajó el crecimiento al 6-7 % y el PER volvió a 15x, su mediana adelantada. La señal temprana habría sido el FFO/deuda por debajo del 21 % y la propuesta de Ofgem.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Rentabilidad del capital nuevo', pregunta: '¿Qué rentabilidad sobre la base de activos esperan de la inversión en redes del próximo plan, por país, frente a su coste de capital?', por_que: 'El ROIC de 6,7 % apenas supera el WACC; decide si crecer crea valor.' },
      { tema: 'Conversión en caja', pregunta: '¿Por qué el flujo de explotación fue solo el 73 % del EBITDA en 2025 y cuánto es temporal (déficits tarifarios, circulante)?', por_que: 'El DCF supone una conversión mayor.' },
      { tema: 'Recompras', pregunta: '¿Cuántas acciones propias tienen hoy y cuántas amortizarán?', por_que: 'Las acciones en circulación son una estimación (6.563 M).' },
      { tema: 'RIIO-ED3', pregunta: '¿Qué tasa financiera y qué inversión piden a Ofgem para 2028-2033?', por_que: 'Reino Unido es el 22 % del EBITDA y el principal destino de la inversión.' },
      { tema: 'Caruna', pregunta: '¿A qué múltiplo de la base de activos compran Caruna y con qué ROE?', por_que: 'Marca la disciplina de precio en las compras.' },
      { tema: 'Sucesión', pregunta: '¿Cuándo dejará Ignacio Galán las funciones ejecutivas?', por_que: 'Concentración de poder durante 25 años.' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, «ERP (T12m with sustainable payout)» 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: [],
};
