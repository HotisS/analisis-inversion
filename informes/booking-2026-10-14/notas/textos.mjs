// Textos del analista principal (Booking Holdings, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de la empresa y los proveedores de datos no se pudieron abrir, así que las cifras salen de extractos de búsqueda de los comunicados de resultados (8-K), de los 10-K y 10-Q citados y de agregadores (Stock Analysis, Yahoo Finance), cruzados cuando fue posible; lo que no cuadró está en null y en los huecos. Cuentas en USD con US GAAP; ejercicio natural. **Todas las cifras por acción están ajustadas al desdoblamiento 25 por 1 del 2-abr-2026** (el BPA ajustado de 2025, 228,06 USD, es 9,12 USD). Precio: cierre del 12-oct-2026 (158,43 USD); no se encontró el del 13-oct. Acciones: unas 758 M en circulación a 30-jun-2026 (1.618 M emitidas menos 860 M en autocartera) más unas 7 M de dilución por planes de acciones, 765 M en total (estimación propia). Arrendamientos operativos fuera del puente (US GAAP: el alquiler ya está en el EBITDA). El EBITDA de las cuentas se devuelve al ajustado de la empresa con los no recurrentes (estimados como diferencia entre el margen ajustado publicado y el EBITDA contable). Los flujos operativos de 2021-2023 y la compra de Getaroom (≈1.200 M) son aproximados.',

  controles_explicados: [
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (174,42 USD) queda un 25 % por debajo del objetivo medio (233,83): no contamos recompras no anunciadas (el consenso sí, unas 6 % menos acciones al año) y el PER base es el actual (14,1x), no la media histórica de 20-26x que usan los analistas. Ver diferencia_consenso.' },
    { control: 'ROIC', explicacion: 'El capital invertido contable es negativo desde 2023 (patrimonio negativo por recompras y circulante negativo del modelo merchant): el ROIC del motor no tiene sentido. Con capital apreciable (2021-2022) fue del 64-201 %; sobre fondo de comercio e intangibles (≈4.200 M) el NOPAT de 2025 (7.363 M) rinde más del 150 %.' },
  ],

  parches: [
    { ruta: 'consenso.base_ebitda', valor: 'NIIF' },
  ],

  secciones: {
    comparables: {
      criterio: 'Agencias y plataformas de viaje en línea cotizadas: Expedia (el rival más directo), Airbnb (alquiler vacacional), Trip.com (Asia) y MakeMyTrip (India), más Amadeus (tecnología de distribución) como referencia lejana. Cifras de proveedores y fechas distintas (mayo-octubre de 2026) y solo el PER futuro es comparable para todas; MakeMyTrip (72x) es un caso aparte por crecimiento y tamaño.',
      comentario: 'Booking cotiza a 13,2x el BPA de los próximos 12 meses, por debajo de la mediana de los comparables (16,0x) y cerca de Expedia (10,8x) y Trip.com (9,0x), pese a tener el mayor margen (36,9 % de EBITDA ajustado) y la mayor escala del grupo [D16, D19, A1]. Airbnb (29,2x) muestra cuánto paga el mercado por crecimiento con marca propia [D17]. El valor implícito con la mediana (191,49 USD) coincide con el DCF; el rango es amplio (129-349 USD) porque el grupo es heterogéneo, por eso pesa poco (15 %). Con la mediana sin MakeMyTrip (13,4x), el valor implícito bajaría a unos 160 USD.',
      confianza: 'Baja',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA contable de los últimos 12 meses, Booking cotiza a 17,5x frente a 26-32x al cierre de 2022-2025, y a 11,9x el EBITDA frente a 14-21x: el descuento frente a su historia es de casi el 40 %. El PER contable exagera la historia porque el BPA de 2022-2025 estaba deprimido por pérdidas de cambio y de participadas; con el BPA ajustado (el que usamos en el objetivo a 12 meses) la mediana es de 23,4x y el mínimo de 20,1x (2022), todavía muy por encima de los 14x actuales [D10, A1]. 2021 queda fuera (pandemia). El cambio estructural que explica el descuento es el miedo a la IA y la ralentización de las noches, no un empeoramiento de las cifras.',
    },
    rentabilidad: {
      comentario: 'Booking crea valor con mucho margen, pero el ROIC contable no lo mide: el capital invertido es negativo desde 2023 porque las recompras (más de 30.000 M en 2022-2025) dejaron el patrimonio en −5.578 M y el modelo merchant financia el circulante con dinero de los viajeros [A17, A22]. Cuando el capital era positivo, el ROIC fue del 64 % (2021) y del 201 % (2022). Sobre el fondo de comercio y los intangibles (unos 4.200 M) el NOPAT de 2025 (7.363 M) rinde más del 150 %, frente a un WACC del 10,2 %: ROIC − WACC muy por encima de los 5 puntos en cualquier medida razonable. Lo mueve el margen (EBIT del 32,8 %) más que la rotación. Expedia, con márgenes menores, no se acerca [B14]. El ROIC incremental no se puede calcular con capital negativo.',
      confianza: 'Media',
    },
  },

  dcf_justificacion: {
    crecimiento: '2026e +8,5 % (fijo: dos trimestres publicados, +11 % en el 1S26, y guía de un dígito alto con el 3T26 a +4-6 %) [A9, D2]. 2027-2028 +8 %, el objetivo a medio plazo de la empresa y por debajo del +13 % de 2025 y del consenso de 2027 (+9,3 %) [D6]. Después bajamos hasta el 4 % en 2035: el mercado madura y la IA y la regulación limitan la comisión. El crecimiento medio (6,1 % en 2027-2035) está muy por debajo del histórico (+11-13 % en 2024-2025).',
    margenes: 'Margen EBITDA ajustado del 36,9 % en 2025 (35,0 % en 2024) [A1]. Lo subimos al 37 % en 2026 y al 38 % en 2028 con el ahorro del programa de transformación (unos 650 M USD anuales a final de 2027, ≈2 puntos de margen sobre los ingresos de 2027) y lo dejamos ahí: no suponemos más apalancamiento operativo. Los costes de transformación y las sanciones van dentro del margen (no los excluimos).',
    inversion: 'Capex del 1,5 % de los ingresos hasta 2030 y del 2,0 % después (1,2 % en 2025; 2,2-2,8 % en 2021-2022), igual a la amortización en los últimos años (2,0 %) [A22]. Circulante comercial del −2 % de las ventas: el modelo merchant cobra antes de pagar, de modo que el crecimiento aporta caja; no contamos las reservas diferidas como fuente adicional. Tipo impositivo del 21 % (20,9 % efectivo en 2025) [A5].',
    wacc: 'Tasa libre del 5,22 % (bono del Tesoro a 10 años, 13-oct-2026) [D25]. Beta de 1,10, entre la mensual de 5 años de Yahoo (1,07) y capturas anteriores (1,19-1,23) [D14]. Prima de mercado del 5,5 % y sin prima adicional (empresa global y diversificada). Coste de la deuda del 4,5 % antes de impuestos (bonos en dólares y euros) y peso de la deuda del 14 % a valor de mercado (20.300 M frente a 121.199 M de capitalización). WACC: 10,19 %. Con la prima implícita del mercado (4,2 %) el WACC baja al 8,96 %.',
    terminal: 'Gordon con crecimiento del 3,0 %: inflación esperada en dólares más algo de crecimiento real, por debajo de la tasa libre menos medio punto (4,7 %). El valor terminal es el 55 % del valor. Implica unas 14x el NOPAT del último año, en línea con el PER actual y muy por debajo del histórico (20-26x).',
  },

  puente_comentarios: {
    '2026e': 'Volumen: noches +6 % en el 1T26 y +5 % en el 2T26, guía de +3-5 % en el 3T26 [A9, D2]. Precio: tarifa media estable. Otros (+2,5): divisa (el euro sumó unos 6 puntos en el 1T26) y más pagos merchant [A26].',
    '2027e': 'Volumen: noches +5-6 % al normalizarse Oriente Medio. Precio: subida de la comisión implícita por pagos y viaje conectado (14,2 % en 2023 → 14,5 % en 2025) [A1]. Otros: alquiler vacacional y vuelos.',
    '2028e': 'Como 2027: el objetivo a medio plazo de la empresa es +8 % de ingresos [D1].',
    '2029e': 'Volumen +5 % y comisión +1,5 %: madurez del alojamiento en Europa compensada por Asia y EE. UU.',
    '2030e': 'Volumen +4,5 %, en línea con el crecimiento del gasto mundial en viajes más algo de paso al canal en línea.',
  },

  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La proyección (6,3 % anual de media) apenas necesita capital: la reinversión neta es negativa porque el circulante del modelo merchant aporta caja, así que la prueba no es el ROIC (el capital invertido es negativo) sino el poder de precios y la cuota. Las dos aguantan: la comisión implícita sube del 14,2 % al 14,5 % de las reservas en 2023-2025 y las noches crecen más que las de Expedia, con un margen EBITDA ajustado del 36,9 % que ningún competidor iguala [A1, B14]. Proyectamos menos crecimiento que el histórico (+11-13 % en 2024-2025) y que el objetivo de la empresa más allá de 2028. La prueba de cuota de mercado no se puede hacer con cifras (no hay tamaño de mercado fiable desde la nube): la hacemos a mano con las noches, que crecen al 5-6 % frente a un mercado que crece algo menos. El riesgo que la pondría en duda es la IA, recogido en el bajista.',

  dcf_lectura: 'El DCF da 194,48 USD por acción, un 22,8 % por encima del precio, con un WACC del 10,19 % y el valor terminal como el 55 % del valor. El DCF inverso dice que el precio de 158,43 USD descuenta un crecimiento de los ingresos del 3,0 % anual en 2027-2035 con nuestro margen del 38 %, o un margen del 31,3 % con nuestro crecimiento (6,1 %), y una rentabilidad implícita del 11,8 % frente a un WACC del 10,2 % y el 9,0 % que pide hoy el mercado. Es una expectativa conservadora: Booking ha crecido al 11-13 % en 2024-2025 y su propio objetivo es el 8 %; para que el precio esté bien, el crecimiento tendría que caer a la mitad de lo que hoy guían la empresa y el consenso, o el margen tendría que perder casi 6 puntos frente al de 2025. Eso solo pasa si la IA desintermedia de verdad. Con la prima implícita del mercado (4,2 %), el DCF sube a 235,51 USD.',

  narrativas: {
    Bajista: 'Los asistentes de IA y Google capturan parte de la intención de viaje y Booking paga más por el tráfico; la UE y la FTC limitan comisiones y prácticas. Crecimiento 2,5 puntos menor cada año y margen 2 puntos más bajo (36 %, el de 2025), terminal del 2,5 %. Es lo que le pasó a Expedia con Google en 2015-2019 (márgenes a la baja).',
    Base: 'Noches +5-6 % y comisión al alza por pagos y viaje conectado, ingresos +8 % hasta 2028 y luego una desaceleración gradual; el margen sube al 38 % con el programa de transformación y se queda ahí.',
    Alcista: 'La IA se convierte en un canal más barato que la búsqueda de pago, el alquiler vacacional gana cuota a Airbnb fuera de EE. UU. y los pagos suben la comisión: crecimiento 1,5 puntos mayor y margen 0,5 puntos más alto.',
  },
  escenarios_comentario: 'El valor intrínseco va de 149,39 USD en el bajista (−5,7 %) a 218,23 USD en el alcista (+37,7 %), con el base en 194,48 USD (+22,8 %): asimetría de 6,6x a favor. El bajista pierde poco porque el precio ya descuenta un crecimiento del 3 %, por debajo incluso de nuestro bajista. En el horizonte de 12 meses la lectura es menos favorable: con nuestro BPA de 2028e y la regla común de múltiplos, el bajista pierde un 16 % y el alcista gana un 49 % (asimetría de 3x).',

  diferencia_consenso: 'Nuestro BPA de 2028e (12,37 USD) apenas se aleja del que implica el consenso de 2027e (12,38 USD) un año antes: la diferencia es de acciones, no de negocio. El consenso descuenta recompras de unos 6.000 M al año (un 5-6 % menos de acciones al año) y nosotros mantenemos 765 M de acciones, como pide el método; con 690 M de acciones nuestro BPA de 2028e sería de 13,7 USD. Nuestro precio base (174,42 USD) queda un 25 % por debajo del objetivo medio (233,83 USD) por eso y porque usamos el PER actual (14,1x) y no la media histórica de 20-26x que suelen aplicar los analistas. El objetivo medio está dentro de nuestro rango (133-236 USD), cerca del alcista.',
  objetivo12m_comentario: 'El objetivo a 12 meses (179,63 USD, +14,4 % con el dividendo) queda un 6,5 % por debajo del valor intrínseco (192,17 USD): la distancia es pequeña. La regla común deja el PER base en el actual (14,1x), así que la rentabilidad del base sale casi entera del crecimiento del BPA (+10 % de 2027e a 2028e) más el dividendo; lo que la acercaría al 12 % es una recompra (no la contamos) o una revalorización del múltiplo, cuyo catalizador es el 3T26 del 27-oct y la guía de 2027. Ojo: la compra «por debajo de 157,18 USD» supone el PER actual fijo; si el precio baja, el PER actual baja con él y la rentabilidad del base no cambia.',
  valoracion_comentario: 'El DCF pesa la mitad (50 %) porque es un negocio predecible, con caja libre de 9.100 M y sin necesidad de inversión. Los escenarios (35 %) recogen el riesgo de la IA y la regulación; los comparables pesan solo un 15 % porque el grupo es heterogéneo (de 9x a 72x) y sus cifras son de fechas y proveedores distintos. No hay transacciones con múltiplo publicadas (la compra de Etraveli se prohibió) ni suma de partes. Los métodos coinciden: DCF 194,48, escenarios 189,15 y comparables 191,49 USD; el valor objetivo ponderado es de 192,17 USD (+21,3 %). La dispersión es baja. Con la prima del mercado (4,2 %) el valor sube a 226,44 USD: la conclusión depende sobre todo de la tasa de descuento, que con una tasa libre del 5,2 % es exigente.',

  catalizadores: {
    items: [
      { fecha: '27-oct-2026 (por confirmar; algunas fuentes dicen 3-4 de noviembre)', evento: 'Resultados del 3T26 y guía del 4T26', efecto: 'Si las noches superan el +5 % y el margen sube, se disipa la tesis de «trampa de valor»; la guía del 4T26 marcará 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-1S27', evento: 'Posible acción de la FTC por anuncios de un afiliado (Reuters)', efecto: 'Multa de más de 500 M USD según la prensa (menos del 1 % del valor) y cambios de prácticas', probabilidad: 'Media', sentido: '−' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía de 2027; posible nuevo plan de recompras', efecto: 'Ahorro de transformación (≈650 M) y recompras de unos 6.000 M al año', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-2027', evento: 'Investigación de la autoridad italiana de la competencia y aplicación de la DMA', efecto: 'Riesgo sobre comisiones y paridad en Europa', probabilidad: 'Media', sentido: '−' },
      { fecha: 'Verano de 2027', evento: 'Normalización del tráfico de largo radio en Oriente Medio', efecto: 'Recuperar los ≈2 puntos de noches perdidos en 2026', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Desintermediación por asistentes de IA (Google, OpenAI) que capturan la búsqueda de viajes', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−16 % (bajista a 12 meses) y −5,7 % (valor intrínseco del bajista)', mitigante: 'Inventario de 4,4 millones de proveedores, pagos y servicio; integración como proveedor de los asistentes', senal: 'Marketing por encima del 31 % de los ingresos o comisión implícita a la baja' },
      { riesgo: 'Regulación en la UE (DMA, competencia en Italia y España) y en EE. UU. (FTC)', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Ya cumple la DMA desde 2024; multas pequeñas frente a la caja libre', senal: 'Límite a comisiones o a la paridad de precios en algún país grande' },
      { riesgo: 'Ciclo de viajes y geopolítica (Oriente Medio, recesión en EE. UU. o Europa)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a −15 %', mitigante: 'Diversificación geográfica y modelo variable de costes de marketing', senal: 'Noches por debajo del +3 % dos trimestres seguidos' },
      { riesgo: 'Venta directa de las cadenas hoteleras y presión sobre la comisión', tipo: 'Competitivo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 %', mitigante: 'Peso de hoteles independientes y apartamentos', senal: 'Ingresos sobre reservas por debajo del 14 %' },
      { riesgo: 'Divisa: ingresos sobre todo en euros, deuda en euros y cuentas en dólares', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 % a −5 %', mitigante: 'Coberturas naturales parciales', senal: 'Euro por debajo de 1,05 USD' },
      { riesgo: 'Alquiler vacacional: restricciones municipales en Europa y competencia de Airbnb', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Diversificación de inventario', senal: 'Caída de anuncios de apartamentos' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Lo que pasó: en 2027 Google integró la reserva de hoteles en su modo de IA con pago propio y OpenAI firmó acuerdos directos con las grandes cadenas. El tráfico gratuito de Booking empezó a caer y la empresa subió el marketing de pago para defender las noches; el margen EBITDA bajó del 37 % al 33 % en dos años. A la vez, la Comisión Europea, a raíz de la investigación italiana, prohibió las cláusulas que ligaban comisiones a la visibilidad, y la comisión implícita cayó del 14,5 % al 13,5 %. Las recompras siguieron, financiadas con deuda, y el mercado pasó a tratar a Booking como Expedia: 10x beneficios. El BPA dejó de crecer en 2028. Lo habrían anticipado tres indicadores: el marketing como porcentaje de los ingresos (subió por encima del 31 %), la comisión implícita (por debajo del 14,2 %) y la proporción de reservas directas que la empresa dejó de publicar.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'IA', pregunta: '¿Qué porcentaje de las reservas llega ya desde asistentes de IA y qué comisión neta deja frente a la búsqueda de pago?', por_que: 'Es el riesgo que explica la caída del múltiplo y la dirección no lo ha cuantificado.' },
      { tema: 'Margen', pregunta: '¿Cuánto del ahorro de 650 M se reinvertirá en marketing o IA y cuánto llegará al margen en 2027?', por_que: 'Nuestro base supone un margen del 38 %; cada punto vale unos 5 USD por acción.' },
      { tema: 'Regulación', pregunta: '¿Qué alcance tiene la posible acción de la FTC y la investigación italiana sobre comisiones y paridad?', por_que: 'Una limitación de comisiones en Europa movería el valor más que cualquier multa.' },
      { tema: 'Capital', pregunta: '¿Cuál es el importe que queda de la autorización de recompra de 20.000 M y qué apalancamiento máximo aceptan?', por_que: 'Las recompras explican un tercio del crecimiento del BPA y el consenso las da por hechas.' },
      { tema: 'Divisa', pregunta: '¿Qué parte de la caja es dinero de viajeros pendiente de pagar a proveedores (modelo merchant)?', por_que: 'Si una parte relevante no es libre, la deuda neta efectiva es mayor que la del puente.' },
      { tema: 'Noches', pregunta: '¿Cuánto de la ralentización a +3-5 % es Oriente Medio y cuánto es madurez del alojamiento en Europa?', por_que: 'Separa el riesgo cíclico del estructural en nuestro crecimiento del 8 %.' },
    ],
    confianza: 'Media',
  },

  fuentes: [],
  huecos: [],
};
