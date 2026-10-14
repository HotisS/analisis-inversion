// Textos del analista (Amadeus, corte 2026-10-14). Citas con la letra de la nota. Cifras del motor tal cual.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: amadeus.com, la CNMV, los proveedores de datos y Yahoo no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de las notas de prensa de Amadeus, de agregadores (Kalkine, Simply Wall St, Chartmill, Tracenable, TipRanks, Alpha Spread, Stock Analysis) y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Precio: 52,68 € a media sesión del 14-oct-2026 (Bolsamanía; el cierre del 13-oct fue de 52,62 €) [D1]. Acciones: 431,6 M, el capital tras amortizar 18,9 M de acciones propias el 30-jun-2026 [A31]; no se descuenta la autocartera comprada después (hueco). Puente: deuda financiera neta de junio (2.577,5 M, que no incluye arrendamientos, no localizados) más el dividendo complementario pagado el 3-jul (436,2 M) [A1, A18]. La compra de IDEMIA Public Security (1.200 M más hasta 150 M; cierre a mediados de 2027) no entra ni en la proyección ni en el puente: se supone que se paga a su valor [A23]. El balance histórico solo tiene activo total, patrimonio, fondo de comercio, caja y deuda neta; el resultado financiero y los impuestos de 2024-2025 son estimación propia. Los cierres de 2024 y 2025 se deducen de rentabilidades publicadas. Los comparables se toman de informes del repositorio de la misma semana. Beta estimada (1,05), sin serie de cotizaciones.',

  controles_explicados: [
    { control: 'Fuentes sin citar', explicacion: 'Algunas fuentes de contexto (agregadores de balance, foros) se usan solo para cruzar cifras de otras.' },
    { control: 'Circulante', explicacion: 'Sin datos de clientes y proveedores el circulante se proyecta en 0 % de las ventas: neutro para el DCF. Amadeus trabaja con circulante negativo, así que el supuesto es conservador.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {},

  rentabilidad_comentario: 'El ROIC de 2025 es del 19,7 % frente a un WACC del 8,52 %: crea valor con unos 11 puntos de margen, y lo hace desde 2023, cuando el beneficio superó al de 2019 [A6]. Lo mueve el margen (beneficio neto del 20,5 % de las ventas), no la rotación (0,56 veces), porque el capital invertido incluye ≈4.000 M de fondo de comercio de compras (Navitaire, TravelClick, Vision-Box) [A13]: sin él, el ROIC operativo sería más del doble. El ROIC incremental histórico es del 24,2 %: el crecimiento de 2023-2025 ha rendido por encima del capital existente, sobre todo porque la recuperación del tráfico apenas pidió capital nuevo. Frente a Sabre, que pierde dinero [B3], la diferencia es de escala y de mezcla (Air IT y hoteles). Hay que leerlo con cautela: el capital invertido sale de patrimonio y deuda neta de agregadores, sin circulante.',

  dcf_justificacion: {
    crecimiento: '2026e se fija en +3,5 % en euros: el 1S creció un 2,3 % (5,1 % a tipo constante) y la guía rebajada habla de un dígito medio-alto a tipo constante, con el dólar restando ≈2,5-3 puntos [A1, A27]. En 2027e-2028e, +7 %: por debajo del +8,5 % a tipo constante de 2025 y del +12,9 % de 2024 [A2, A5], con la distribución recuperando volumen tras Oriente Medio y Air IT y hoteles creciendo al 8-9 % como en el 1S26 [A1]. Después converge al 3,5 % en 2035e. El consenso de BPA (3,46 € en 2026 y 3,88 € en 2027) [D3] supone algo más de crecimiento que nosotros en 2027.',
    margenes: 'Margen EBITDA del 38,8 % en 2026e (40,0 % en el 1S26 con el segundo semestre estacionalmente más bajo; 38,5 % en 2025) [A1, A4], que sube al 39,7 % en 2030e: un punto en cuatro años, frente a tres puntos ganados en 2022-2025 por apalancamiento operativo. La empresa mantiene la guía de margen EBIT ajustado del 29,8 % para 2026 [A27]. No suponemos más expansión porque la IA exige inversión en producto y las aerolíneas presionan la tarifa de distribución.',
    inversion: 'Capex del 11,5-12 % de las ventas (12,5 % en 2025 y 9,8 % en el 1S26) [A12, A22], con la amortización entre el 11,0 % y el 11,5 % (11,5 % en 2025) [A4]; en el último año el capex (11,5 %) supera a la amortización (11,0 %). Es inversión en software: Amadeus gasta más de 1.400 M al año en I+D [A2]. Circulante neutro (0 %): sin datos de clientes y proveedores no se proyecta liberación de caja.',
    wacc: 'Tasa libre: Bund a 10 años al 3,53 % (12-oct) [D12]. Beta 1,05 (estimación: no se pudo calcular la de la acción; software y servicios de viaje europeos se mueven entre 0,9 y 1,2). Prima de mercado del 5,5 %, sin prima adicional: Amadeus vende en todo el mundo. Coste de la deuda del 3,5 % antes de impuestos y peso de la deuda del 12 % a valor de mercado. Resultado: WACC del 8,52 %. Con la prima implícita del mercado (4,2 %) [D11] el WACC baja al 7,32 % y el valor sube a 85,31 €.',
    terminal: 'Gordon con un crecimiento del 2,5 %: inflación del euro (≈2 %) más un crecimiento real moderado, por debajo de la tasa libre menos medio punto (3,03 %). El valor terminal pesa el 61 % del valor. El múltiplo de salida de referencia (13x el EBITDA) queda cerca de la mediana de los comparables en EV/EBITDA de los últimos 12 meses (11,9x) y por debajo del de SAP o RELX [D16-D19].',
  },

  puente_comentarios: {
    '2026e': 'Volumen +1 %: reservas −3,7 % y pasajeros +1,1 % en el 1S26, con hoteles y pagos creciendo; precio +4,5 %: ingreso por pasajero embarcado +7,5 % y tarifa media de distribución al alza; otros −2 %: divisa (el dólar restó ≈2,8 puntos en el 1S26) [A1].',
    '2027e': 'Volumen +3 %: recuperación parcial de las reservas en Oriente Medio y tráfico aéreo en línea con su tendencia; precio +3,5 %: nuevas funciones (NDC, merchandising, cobro por exceso de búsquedas de agentes de IA) [B7]; otros +0,5 %: mezcla hacia hoteles y pagos.',
    '2028e': 'Igual que 2027e: volumen +3 % (tráfico y nuevos clientes de Air IT), precio +3,5 % y mezcla +0,5 %; sin la compra de IDEMIA Public Security.',
    '2029e': 'Volumen +3 %, precio +3 % (la subida por pasajero se modera al madurar las migraciones) y mezcla +0,5 %.',
  },

  veredicto: 'En parte',
  sostenibilidad_justificacion: 'La proyección apenas necesita capital: la reinversión neta acumulada es de 426 M, el 2 % del NOPAT, porque el capex de software casi iguala a la amortización. Así que la prueba no es la reinversión sino el poder de precios y la cuota. El precio aguanta: el ingreso por pasajero embarcado sube un 7,5 % con el volumen al 1,1 % y el ROIC incremental histórico es del 24,2 % [A1]. El volumen que proyectamos (+3 % al año) no exige ganar cuota: es el crecimiento tendencial del tráfico aéreo. La parte que no se puede asegurar es la distribución (casi la mitad de los ingresos): si los agentes de IA o la venta directa le quitan volumen, el +7 % de 2027-2028 no se cumple. Ninguna prueba numérica falla, así que el base no se rebaja; el riesgo está en el escenario bajista. Cuota de mercado final: no aplica (la cuota publicada es la del GDS y no la del grupo).',

  dcf_lectura: 'El DCF da 66,65 € por acción, un 26,5 % por encima de los 52,68 € de hoy, con un WACC del 8,52 % y un valor terminal que pesa el 61 %. El DCF inverso dice que el precio descuenta un crecimiento del 2,4 % anual en 2027-2035 frente al 5,4 % de nuestro base, o un margen EBITDA del 34,3 % frente al 39,7 %: una empresa que deja de crecer por encima de la inflación o que pierde cinco puntos de margen. La rentabilidad implícita en el precio es del 9,9 %, por encima de nuestro WACC (8,5 %) y de lo que hoy pide el mercado (7,3 %). Es un precio conservador frente a la historia (ingresos +8,5 % a tipo constante en 2025 y márgenes al alza durante tres años) [A2]: el mercado valora a Amadeus como si la IA ya hubiera empezado a erosionar la distribución. Pero ese valor no es un objetivo a 12 meses: sin un catalizador que cambie el múltiplo, la cotización seguirá al beneficio (ver el objetivo a 12 meses).',

  narrativas: {
    Bajista: 'Los agentes de IA y la venta directa por NDC desvían reservas de agencias: la distribución pierde volumen tres años seguidos y las aerolíneas negocian tarifas más bajas al renovar. Es lo que ya le pasó a Sabre y Travelport en cuota; el crecimiento cae ≈3 puntos al año y el margen 2,5 puntos.',
    Base: 'El tráfico se recupera de Oriente Medio en 2027, la distribución vuelve a crecer al 3-4 % y Air IT y hoteles siguen al 8-9 %. Crecimiento del 7 % en 2027-2028 y margen EBITDA del 39-40 %.',
    Alcista: 'Amadeus se convierte en la infraestructura que usan los agentes de IA (Google, Microsoft) y cobra por las búsquedas; IDEMIA y los pagos añaden crecimiento. 1,5 puntos más de crecimiento y un punto más de margen.',
  },
  escenarios_comentario: 'El alcista vale 77,62 € (+47,3 %) y el bajista 44,99 € (−14,6 %): la asimetría es de 3,24 veces en valor intrínseco, porque el precio ya descuenta casi el bajista (crecimiento implícito del 2,4 %). A 12 meses, con la regla común de múltiplos, la asimetría se reduce a 2,43 veces (78,99 € frente a 41,87 €), porque el bajista combina menos beneficio con un PER un 15 % menor. El bajista es verosímil: la desintermediación de la distribución es el riesgo que hoy debate el mercado y el que ha castigado la cotización.',

  suma_partes_comentario: 'No aplica: los tres segmentos comparten plataforma, clientes y costes de desarrollo, y la empresa no publica el resultado por segmento desde el cambio de presentación; los comparables de cada parte (GDS con Sabre en pérdidas; software hotelero sin cotizadas puras) no darían una referencia mejor que la del grupo.',

  o12: {
    Bajista: 'BPA ajustado de 3,46 € en 2028e: la distribución pierde volumen por la IA y la venta directa, el crecimiento baja 3 puntos al año y el margen 2,5 puntos (36,7-37,0 %). El PER cae a 12,1x (85 % del actual), un nivel de agencia en línea.',
    Base: 'BPA ajustado de 4,01 € en 2028e (ventas de 7.722 M, margen EBITDA del 39,5 %): recuperación del tráfico en 2027 y crecimiento del 7 %. PER de 14,2x, el actual sobre nuestro BPA de 2027e (menor que la mediana de 20,9x de 2024-2025).',
    Alcista: 'BPA ajustado de 4,27 € en 2028e con 1,5 puntos más de crecimiento y un punto más de margen. El PER sube a 18,5x (techo de 1,3 veces el base), aún por debajo de la mediana histórica (20,9x).',
  },
  diferencia_consenso: 'Nuestro BPA ajustado de 2027e (3,71 €) queda un 4 % por debajo del consenso (3,88 €) [D3] y el de 2028e (4,01 €) coincide con el implícito en las previsiones de beneficio de Simply Wall St (≈4,01 €) [D5]: la diferencia de beneficio es pequeña y sale de suponer menos recuperación de la distribución en 2027. La distancia está en el múltiplo: nuestro base (56,94 €) queda un 15,3 % por debajo del objetivo medio de los analistas (67,20 €) [D4], porque la regla común toma el PER actual (14,2x) y los analistas suponen, de media, ≈17x. No acercamos la cifra: el mercado lleva dos años bajando el múltiplo y no hay un hecho con fecha que lo vaya a subir.',
  objetivo12m_comentario: 'El objetivo a 12 meses (58,69 €, +14,3 % con dividendo; base +11,0 %) queda un 8 % por debajo del valor intrínseco (63,75 €). La distancia es pequeña porque el precio ya descuenta poco crecimiento: el objetivo sube con el beneficio (+8 % de 2027 a 2028) y no supone ninguna revalorización del múltiplo. Para cerrar la distancia hasta el valor intrínseco haría falta que el mercado dejara de descontar la desintermediación por IA: la señal sería que las reservas de distribución vuelvan a crecer (resultados del 3T, 6-nov-2026, y del 4T, febrero de 2027) y que el ingreso por reserva siga subiendo.',

  valoracion_comentario: 'Pesos: DCF 50 %, comparables 30 % y escenarios 20 %; sin transacciones (no hay operaciones con múltiplo publicado) ni suma de partes. El DCF pesa más porque Amadeus es un negocio maduro, con caja libre estable (1.302 M en 2025) [A2] y una inversión que apenas varía. Los comparables (mediana de PER de 15,5x, 58,75 €) están en un rango muy amplio (de 9x a 29x) porque mezclan agencias en línea y software europeo. Los métodos dan entre 58,75 € (PER) y 66,65 € (DCF), con el bajista en 44,99 €: todos por encima del precio, y la síntesis ponderada es de 63,75 € (+21,0 %). Con la prima implícita del mercado el objetivo sería de 76,61 €. La dispersión pequeña entre métodos da algo de confianza; la que no la da es la calidad de los datos de balance.',

  catalizadores: {
    items: [
      { fecha: '6-nov-2026', evento: 'Resultados del 3T26', efecto: 'Primera lectura de las reservas tras Oriente Medio y confirmación de la guía rebajada', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Si la guía de 2027 vuelve a un crecimiento de ingresos de un dígito alto, el múltiplo podría recuperarse', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Ejecución de la recompra de hasta 500 M', efecto: '≈2 % del capital; sostiene el BPA', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Mediados de 2027', evento: 'Cierre de la compra de IDEMIA Public Security', efecto: 'Diversifica hacia biometría; sube la deuda neta ≈1.200-1.350 M', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '12-18 meses', evento: 'Acuerdos con plataformas de IA (Google, Microsoft, OpenAI) para reservar a través de Amadeus', efecto: 'Prueba de que la IA usa el GDS en vez de saltárselo', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Junio de 2027', evento: 'Junta: sucesión del consejero delegado (reelegido por un año)', efecto: 'Riesgo de transición sin director financiero titular', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Desintermediación por agentes de IA y venta directa (NDC)', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−32 % (escenario bajista, 44,99 €)', mitigante: 'Amadeus integra NDC y cobra por las búsquedas de agentes; socio de Google y Microsoft [B6, B7]', senal: 'Reservas de distribución por debajo del tráfico aéreo dos trimestres seguidos' },
      { riesgo: 'Caída del tráfico aéreo (geopolítica, recesión)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a −15 %', mitigante: 'Air IT cobra por pasajero con contratos largos; hoteles y pagos menos cíclicos', senal: 'Revisiones de IATA del tráfico por debajo del 2 %' },
      { riesgo: 'Presión de tarifas de las grandes aerolíneas al renovar', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Costes de cambio altos y funciones nuevas', senal: 'Ingreso por reserva estable o a la baja' },
      { riesgo: 'Integración y precio de IDEMIA Public Security', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −5 %', mitigante: 'Experiencia previa con Vision-Box; pago variable ligado a resultados [A23]', senal: 'Deterioros o margen del segmento a la baja tras el cierre' },
      { riesgo: 'Sucesión del consejero delegado y director financiero interino', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Equipo directivo estable con veteranos de la casa', senal: 'Salida anunciada sin sucesor o cambio de estrategia' },
      { riesgo: 'Divisa (dólar)', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−2 % a −3 % por cada 10 % de caída del dólar', mitigante: 'Parte de los costes en dólares', senal: 'Euro/dólar por encima de 1,20' },
      { riesgo: 'Ciberataque o caída de la plataforma en la nube', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−5 % a −10 %', mitigante: 'Nube pública con redundancia', senal: 'Incidentes de servicio en aerolíneas clientes' },
    ],
    premortem: 'Octubre de 2029: la acción cotiza a 32 €. Lo que pasó: en 2027 Google y OpenAI lanzaron la reserva de vuelos dentro de sus asistentes conectándose directamente a las aerolíneas por NDC, y las grandes agencias en línea siguieron el camino. Las reservas de distribución de Amadeus, que ya cayeron un 3,7 % en el 1S26 por Oriente Medio, no se recuperaron: bajaron un 4-5 % al año, y las aerolíneas aprovecharon las renovaciones para recortar la tarifa por reserva. Air IT y hoteles siguieron creciendo, pero no compensaron la mitad del negocio que se encogía con margen alto, y el margen EBITDA cayó del 39 % al 35 %. La compra de IDEMIA, pagada en 2027, añadió deuda y un negocio de contratos públicos de menor margen, y el nuevo consejero delegado (Maroto se retiró en 2027) cambió las prioridades. El mercado, que en 2026 ya pagaba 14x, bajó el múltiplo a 11x, como el de una agencia en línea. Las señales que lo habrían anticipado: reservas por debajo del tráfico aéreo dos trimestres seguidos en 2027, un ingreso por reserva estancado y anuncios de reserva directa en los asistentes de IA sin Amadeus como socio.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'IA', pregunta: '¿Qué parte de las búsquedas y de las reservas de 2026 vino de agentes de IA, y cuánto ingreso dio el cobro por exceso de búsquedas?', por_que: 'Es el riesgo que explica la caída del múltiplo y no hay cifras públicas.' },
      { tema: 'Distribución', pregunta: '¿Cuánto del −3,7 % de reservas del 1S26 se explica por Oriente Medio y cuánto por pérdida de cuota o venta directa?', por_que: 'Separa un efecto cíclico de uno estructural.' },
      { tema: 'IDEMIA', pregunta: '¿Qué EBITDA y qué crecimiento tiene IDEMIA Public Security y qué múltiplo se pagó?', por_que: 'Sin ello no se puede saber si la compra crea valor.' },
      { tema: 'Gobierno', pregunta: '¿Cuándo se nombrará un director financiero titular y cuál es el plan de sucesión del consejero delegado?', por_que: 'El director financiero es interino desde septiembre de 2024 y la reelección es por un año.' },
      { tema: 'Precio', pregunta: '¿Cuántos contratos de grandes aerolíneas se renuevan en 2027-2028 y con qué tarifa?', por_que: 'La presión de tarifas es el segundo riesgo del caso base.' },
      { tema: 'Capital', pregunta: '¿Qué apalancamiento objetivo tras IDEMIA y qué recompras quedan en 2027?', por_que: 'Determina el BPA de 2028 y la parte de la caja que vuelve al accionista.' },
    ],
    confianza: 'Media',
  },

  fuentes: [],
  huecos: [
    { seccion: 'valoracion', campo: 'pasivos por arrendamiento (NIIF 16) y autocartera posterior a junio de 2026', tipo: 'Núcleo', intentos: '1) Cuentas semestrales del 1S26: no accesibles; 2) agregadores de balance: sin la línea; 3) MarketScreener (recompras): solo el inicio del programa', decision: 'Omitido' },
    { seccion: 'dcf', campo: 'beta de la acción', tipo: 'Complemento', intentos: '1) bolsa.mjs: sin red; 2) Yahoo e Investing: no accesibles; 3) agregadores vía búsqueda: sin dato fiable', decision: 'Calculado y marcado como estimación' },
  ],
};
