// Textos del analista principal (Heineken, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de la empresa, Euronext, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, de Stock Analysis, Fintel y MarketScreener (este último, tomado del análisis de Diageo del repositorio, 12-oct-2026), cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Precio: 71,12 EUR, último cierre citado por Simply Wall St y coherente con la capitalización de MarketScreener del 12-oct (40.202 M EUR) [D14, D11]; no es un cierre oficial del 13-oct. Acciones: 546 M, estimación propia a partir del beneficio y el BPA beia del 1S26 (1.256 M ÷ 2,29 = 548,5 M de media) menos la recompra en curso [A1, A13]. Cuentas en NIIF-UE; ingresos = ingresos netos (después de impuestos especiales). El EBITDA de 2025 se lleva a base beia sumando 579 M de excepcionales (estimación propia: el EBITDA beia que implica la deuda neta de 14.506 M a 2,2 veces es de ≈6.594 M, frente a 6.015 M publicado) [A2, A4]. La deuda neta a 30-jun-2026 (17.500 M, con arrendamientos) es una estimación propia: 2,6 veces el EBITDA beia de los últimos 12 meses [A1]. Los minoritarios (4.000 M) son una estimación propia a ≈12 veces su parte del beneficio (≈300-350 M al año) [A3]. El resultado de las asociadas va dentro del resultado operativo beia de Heineken, así que no se suman al puente.',

  controles_explicados: [
    { control: 'Capitalización calculada', explicacion: 'MarketScreener usa ≈565 M de acciones (emitidas menos parte de la autocartera); nosotros usamos 546 M, netas de la autocartera acumulada por la recompra de 1.500 M. La diferencia (3,4 %) es de acciones, no de precio.' },
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con seis comparables de bebidas el crecimiento no explica los múltiplos (R² bajo): no usamos la regresión.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {},

  rentabilidad_comentario: 'Con el balance incompleto (sin circulante ni fondo de comercio separados), el ROIC del motor sale del 8,3 % en el último ejercicio, frente a un WACC del 7,13 %: Heineken crea poco valor sobre su capital, unos 1,2 puntos. El ROIC bajó del 10,1 % de 2021 al 6,5-7 % de 2023-2024 por los deterioros y por las compras pagadas caras (Distell, United Breweries), y se recupera en 2025. Es un ROIC de compañía de bienes de consumo con mucho fondo de comercio: 20.011 M de intangibles sobre 53.753 M de activo [A4]. AB InBev, con un margen EBITDA del 35,8 % frente al 22,5 %, tiene un rendimiento operativo muy superior [D11]. Como el balance está incompleto, la cifra hay que leerla como orden de magnitud.',

  dcf_justificacion: {
    crecimiento: 'Un 5 % en 2026 (fijo): un 2,5-3 % orgánico, como el 2,7 % del 1S26, más once meses de FIFCO, menos la divisa [A1, A9]. Después, un 2 % anual en euros: el grupo crece en torno al 3-4 % orgánico (precio y mezcla), pero la divisa de los emergentes le resta 1-2 puntos al año; en euros no creció entre 2022 y 2025 (28.719 frente a 28.753 M) [A3]. El consenso espera más: 31.350 M en 2026 y 33.800 M en 2028 [D3, D4].',
    margenes: 'Margen EBITDA beia del 22,9 % en 2025 (estimación propia), 23,0 % en 2026 y hasta el 23,5 % desde 2029 por el plan de productividad (5.000-6.000 bajas) [A11]. El consenso da un 22,6 % en 2026 y un 23,1 % en 2028 [D3]: estamos 0,3-0,4 puntos por encima porque damos más peso a los ahorros, pero muy lejos del 35 % de AB InBev.',
    inversion: 'Capex del 8,0 % de las ventas (7,4 % en 2025 y 8,0 % en 2023, más las altas de derechos de uso) y amortización del 7,7 % (la beia de 2025) [A8]. Circulante a cero: Heineken financia con proveedores, pero no hemos podido leer el balance con detalle.',
    wacc: 'Tasa libre del 3,53 % (Bund a 10 años) [P1], beta de 0,8 (estimación propia para una cervecera; no hemos podido calcular la propia), prima de mercado del 5,5 % y 1 punto de prima adicional porque más de la mitad del beneficio sale de mercados emergentes con historial de devaluaciones (Nigeria, Brasil, México, Vietnam). Coste de la deuda antes de impuestos del 4 % (grado de inversión BBB+, según un artículo de Seeking Alpha) [E3] y 30 % de deuda. WACC del 7,13 %.',
    terminal: 'Gordon con un 2 % de crecimiento, la inflación esperada del euro y por debajo del Bund menos medio punto. El valor terminal pesa el 63 % del valor. A un múltiplo de salida de 9 veces el EBITDA el valor sería parecido.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +0,5 % y precio-mezcla +2,5 % (1S26: volumen +1,6 %, ingreso neto +2,7 %) [A1]; otros +2 %: FIFCO menos la divisa.',
    '2027e': 'Precio-mezcla del 3 %, por debajo del +3,8 % por hectolitro de 2025 [A2]; la divisa resta 1,5 puntos.',
    '2028e': 'Igual que 2027: el volumen de los emergentes compensa la caída de Europa.',
    '2029e': 'Igual.',
    '2030e': 'Igual.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'La reinversión de la proyección es mínima (3 % del NOPAT), así que el motor no hace la prueba y la hacemos a mano. El crecimiento orgánico sí está demostrado: el precio y la mezcla subieron un 3,8 % por hectolitro en 2025 con el volumen a la baja [A2]. Pero en euros el grupo no creció en tres años (28.719 M en 2022, 28.753 M en 2025) porque la divisa se come el precio [A3]. Una primera versión con un 3 % anual en euros fallaba esa prueba y la hemos rebajado al 2 % desde 2027 (veredicto «En parte»): cada medio punto menos de crecimiento resta unos 4-5 EUR por acción.',
  dcf_lectura: 'El DCF da 85,75 EUR por acción, un 20,6 % por encima del precio, con el valor terminal en el 63 %. El DCF inverso dice que el precio descuenta un crecimiento del 0,3 % anual en 2027-2035 con nuestro margen, o un margen EBITDA del 21,7 % con nuestro crecimiento: es decir, que Heineken no crezca en euros, que es justo lo que ha pasado en 2022-2025. No es una exigencia alta, pero tampoco absurda: el mercado extrapola la historia reciente en euros. La rentabilidad implícita (7,8 %) supera en solo 0,7 puntos nuestro WACC. La diferencia entre valor y precio depende sobre todo de que la divisa deje de restar: con un crecimiento del 1 % el valor bajaría hacia los 75 EUR.',

  narrativas: {
    Bajista: 'Europa sigue perdiendo un 2-3 % de volumen al año, la naira y el real vuelven a devaluarse y los ahorros del plan de bajas se van en inflación de costes: ingresos planos en euros desde 2027 y margen del 21,9 %, como antes de la subida de precios de 2023.',
    Base: 'Crecimiento orgánico del 3-4 % por precio y mezcla que la divisa recorta al 2 % en euros, y margen que sube al 23,5 % con el plan de productividad.',
    Alcista: 'La divisa deja de restar, el volumen de África y Asia crece y el nuevo primer ejecutivo acelera los ahorros: un 3 % anual en euros y un margen del 24,2 %.',
  },
  escenarios_comentario: 'El bajista pierde un 25,5 % sobre el precio y el alcista gana un 42,3 %; el base, un 20,6 %. La asimetría del DCF es favorable, pero la del objetivo a 12 meses no: el múltiplo bajo de los dos últimos años limita lo que se puede ganar en un año.',
  suma_partes_comentario: 'No aplica: un solo negocio (cerveza) con regiones de perfiles parecidos.',
  valoracion_comentario: 'Pesamos el DCF al 50 %, los comparables al 30 % y los escenarios al 20 %. El DCF es el método más fiable para una empresa de flujos estables, pero sus cifras salen de extractos de búsqueda. Los comparables (licores y AB InBev) cotizan con márgenes muy superiores, y su EV/EBITDA da valores altos; el PER de los próximos 12 meses da 63-83 EUR, en línea con el precio. Las transacciones no pesan: Heineken N.V. no es comprable por la estructura de control de la familia de Carvalho.',

  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.62, multiplo: null, precio: null, justificacion: 'Ventas de 30.191 M (sin crecimiento en euros en 2027-28) con un margen EBITDA del 21,9 %: EBIT de 4.287 M, 450 M de resultado financiero neto (intereses con FIFCO menos asociadas), impuesto del 26,5 %, 300 M de minoritarios y 546 M de acciones.' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 5.43, multiplo: null, precio: null, justificacion: 'Ventas de 31.410 M (+2 % anual en euros) y margen del 23,4 %: EBIT de 4.931 M, 450 M de resultado financiero, impuesto del 26,5 %, 330 M de minoritarios y 546 M de acciones, sin recompras más allá de la actual.' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 5.82, multiplo: null, precio: null, justificacion: 'Ventas de 32.029 M (+3 % anual) y margen del 24,1 % por los ahorros del plan de bajas: EBIT de 5.253 M, 450 M de resultado financiero, impuesto del 26,5 % y 350 M de minoritarios.' },
    ],
    per_historico: { actual: 13.6, mediana_5a: 16.2, minimo_5a: 13.9, media_larga: 16.5, excluidos: 'PER de cierre con el BPA diluido beia (la base de los casos): 2022 17,9x (88,17 ÷ 4,92), 2023 19,5x (91,22 ÷ 4,67), 2024 13,9x (67,99 ÷ 4,89), 2025 14,5x (69,46 ÷ 4,78) [D9, A2, A5, A6]. 2020 se excluye (pandemia) y 2021 y 2018-2019 no tienen precio de cierre localizado: la «mediana de 5 años» y la «media larga» son de cuatro años. Actual = 71,12 ÷ 5,23 (nuestro BPA de 2027e).' },
    comparables_per: { mediana: 14.7 },
    consenso: { bpa_ano1: 5.30, bpa_ano2: 5.86, objetivo_medio: 88.6, objetivo_min: null, objetivo_max: null, analistas: 31, tendencia_3m: 'estables', fuente: 'aktien.guide (BPA 2026e; 2027e = 3.200 M de beneficio neto ÷ 546 M de acciones) y ValueInvesting.io (objetivo) [D3, D15]' },
    diferencia_consenso: 'Nuestro BPA de 2028e (5,43 EUR) queda un 13 % por debajo del que implica el consenso (3.400 M de beneficio neto, ≈6,2 EUR por acción) [D3]. La diferencia sale de las ventas (31.410 M frente a 33.800 M: restamos 1,5 puntos de divisa al año) y no del margen, que tenemos algo por encima. Nuestro precio base (≈74 EUR) queda un 17 % por debajo del objetivo medio de los analistas (88,6 EUR), que además aplica un múltiplo de 15-16x, el de 2022-2023, frente al 13,6x actual.',
    media: null,
    comentario: 'El valor intrínseco (85,75 EUR por el DCF) queda muy por encima del objetivo a 12 meses: el mercado lleva dos años pagando 14x el beneficio beia porque el beneficio no crece en euros. Para cerrar la distancia haría falta un catalizador que hoy no tiene fecha: que la divisa deje de restar o que el nuevo primer ejecutivo presente un plan con objetivos de margen creíbles (lo esperable con los resultados anuales de febrero de 2027). La tesis de valor es a más de un año.',
  },

  catalizadores: {
    items: [
      { fecha: '2026-10-28', evento: 'Actualización del 3T26', efecto: 'Volumen y precio del trimestre; confirmación de la guía del 2-6 %', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02-10', evento: 'Resultados de 2026 y primera guía del nuevo primer ejecutivo', efecto: 'Objetivos de margen y de crecimiento para 2027; posible nueva recompra', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-1T27', evento: 'Compra de ≈300 bares de Stonegate (≈300 M GBP)', efecto: 'Pequeña frente al grupo; más capital en Reino Unido', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Ahorros del plan de 5.000-6.000 bajas', efecto: 'Margen beia +0,5 puntos si se materializan', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'Fin del segundo tramo de la recompra (750 M)', efecto: 'Sin nueva recompra anunciada, el BPA deja de tener ese apoyo', probabilidad: 'Alta', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Divisa de los mercados emergentes (naira, real, peso)', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−15 % (cada punto menos de crecimiento anual en euros, ≈−9 EUR)', mitigante: 'Precios en moneda local que siguen a la inflación', senal: 'Diferencia entre crecimiento orgánico y publicado por encima de 3 puntos' },
      { riesgo: 'Caída estructural del volumen en Europa', tipo: 'Negocio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Premiumización y cerveza sin alcohol', senal: 'Volumen europeo por debajo del −3 % anual' },
      { riesgo: 'Ejecución del nuevo primer ejecutivo y del plan de bajas', tipo: 'Gestión', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % (margen 0,5 puntos más bajo)', mitigante: 'Experiencia de Oliveira en JDE Peet\'s', senal: 'Margen beia de 2026 por debajo del 15 %' },
      { riesgo: 'Apalancamiento tras FIFCO con recompra en marcha', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Grado de inversión y flujo libre de ≈2.600 M al año', senal: 'Deuda neta por encima de 3 veces el EBITDA beia' },
      { riesgo: 'Aranceles en EE. UU. sobre cerveza importada de México y Europa', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'EE. UU. pesa poco en el beneficio', senal: 'Nuevos aranceles sobre bebidas' },
      { riesgo: 'Cambios de hábito (jóvenes, salud, fármacos para adelgazar)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (bajista)', mitigante: 'Heineken 0.0 y marcas sin alcohol', senal: 'Volumen mundial de cerveza en negativo dos años seguidos' },
    ],
    premortem: 'Octubre de 2029: la acción vale 43 EUR. En 2027 la naira y el real vuelven a devaluarse y el crecimiento publicado en euros es negativo por cuarto año de cinco, aunque el orgánico siga en el 3 %. Europa pierde otro 3 % de volumen al año y las cadenas de supermercados frenan las subidas de precio. El nuevo primer ejecutivo presenta en febrero de 2027 un plan con objetivos de margen modestos y sin nueva recompra; el mercado, que ya pagaba 14 veces el beneficio, baja el múltiplo a 11-12 veces, el de una cervecera sin crecimiento. El beneficio por acción no pasa de 5 EUR. La señal estaba a la vista: la distancia entre crecimiento orgánico y en euros, que superó los 3 puntos en 2024-2025, y un consenso que siempre esperó más ventas de las que llegaron.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Divisa', pregunta: '¿Cuánto restará la divisa a ingresos y resultado en 2026 y qué coberturas hay en Nigeria, Brasil y México?', por_que: 'Es la diferencia entre nuestro 2 % en euros y el 3-4 % orgánico.' },
      { tema: 'Plan de productividad', pregunta: '¿Cuánto ahorro neto (después de reinversión en marcas) aportarán las 5.000-6.000 bajas y en qué años?', por_que: 'Decide si el margen llega al 23,5 % o se queda en el 23 %.' },
      { tema: 'Nuevo primer ejecutivo', pregunta: '¿Mantendrá Oliveira los objetivos de EverGreen 2030 o los revisará en febrero de 2027?', por_que: 'Un cambio de objetivos movería el consenso y el múltiplo.' },
      { tema: 'FIFCO', pregunta: '¿Qué EBITDA aporta FIFCO y a qué múltiplo se pagó?', por_que: 'Sin el múltiplo no podemos juzgar si la compra crea valor.' },
      { tema: 'Capital', pregunta: '¿Habrá recompra tras el segundo tramo de 750 M, con la deuda en 2,6 veces?', por_que: 'La recompra sostiene el BPA y la Holding vende en proporción.' },
    ],
    confianza: 'Media',
  },

  huecos: [
    { seccion: 'dcf', campo: 'beta propia y rating de la deuda', tipo: 'Complemento', intentos: '1) bolsa.mjs (Yahoo): sin red; 2) búsquedas de beta en proveedores: sin dato fiable; 3) rating en el informe anual: no accesible (BBB+ solo citado en un artículo de Seeking Alpha)', decision: 'Calculado y marcado como estimación' },
  ],
  fuentes: [],
};
