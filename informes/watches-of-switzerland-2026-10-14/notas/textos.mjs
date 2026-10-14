// Textos del analista (Watches of Switzerland, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de la empresa, Investegate, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados (FY23, FY25, FY26), de la actualización de la junta y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Cuentas en GBP; el precio (673,5 p del 13-oct-2026, web de la empresa) se pasa a GBP. Ejercicio a finales de abril o principios de mayo, etiqueta «fin»; FY2026 tuvo 53 semanas (hasta el 3-may-2026). **Base de las cifras: ajustada y antes de NIIF 16**, la de la guía y la deuda neta de la empresa: el alquiler va dentro del EBITDA (202,2 M en FY26) y los 427,6 M de pasivos por arrendamiento no entran en el puente; sumarlos sin sacar el alquiler del EBITDA los contaría dos veces (lección de Dunelm). El beneficio neto ajustado es estimación propia (BPA ajustado × acciones medias). Balance solo de FY25-FY26: el ROIC del motor (29 %) se apoya en un capital incompleto; usamos como referencia el ROCE publicado (18 %). La serie de PER histórico es aproximada (precios de cierre de ejercicio tomados de noticias). Comparables: solo el PER de cuatro empresas, de fechas distintas.',

  controles_explicados: [
    { control: 'Al menos 5 comparables', explicacion: 'Solo cuatro comparables con PER fiable en este entorno (Swatch y Pandora sin dato); peso de comparables limitado al 30 %.' },
    { control: 'Sección de núcleo con datos: competencia', explicacion: 'Bucherer no publica cuentas y las de los demás no se pudieron abrir; la sección da posición y foso sin cifras de competidores.' },
    { control: 'Sección de núcleo con datos: sector', explicacion: 'No hay estadística pública accesible del mercado minorista de relojes de lujo en el Reino Unido y EE. UU.' },
    { control: 'ROIC', explicacion: 'Con el balance solo de FY25-FY26 (patrimonio de FY25 sin dato) el ROIC y el ROIC incremental del motor no son fiables; se usa el ROCE publicado del 18 %.' },
    { control: 'Sostenibilidad', explicacion: 'El ROIC incremental histórico (3,8 %) es un artefacto del balance incompleto (capital de FY25 sin patrimonio); la prueba de capital nuevo se hace a mano con el ROCE del 18 %: la proyección pide un 32 % sobre la reinversión, por encima, de ahí el veredicto «En parte».' },
  ],


  dcf_justificacion: {
    crecimiento: 'Las ventas crecen un 7 % en FY27e y FY28e, en el centro de la guía de 5-10 % a tipo constante [A1, A12], y bajan al 3 % en FY34e. La historia es irregular: +25 % en FY23, plano en FY24, +7 % en FY25 y +11 % en FY26 (53 semanas) [A5, A6, A4, A1]. El consenso de ventas de FY27e (≈1.996 M) supone un 9 %, algo más que nosotros [D7].',
    margenes: 'Margen EBITDA antes de NIIF 16 del 11,6 % en FY27e y del 11,9-12,0 % después: el EBIT recupera la guía (+40 a +80 pb sobre el 8,5 % de FY26) hasta un ≈9,3 %, por debajo del 10,7 % de FY23 [A1, A5]. Rolex fija el margen del distribuidor: no proyectamos más.',
    inversion: 'Capex del 3,5 % de las ventas hasta FY29e (60-70 M al año, la guía) y del 3,0 % después, por encima de la amortización (2,7 %) [A3]. Circulante del 12,5 % de las ventas: existencias de 458 M menos proveedores de 251 M en FY26 [A1].',
    wacc: 'Tasa libre del 5,1 % (gilt a 10 años, agosto de 2026) [D11], beta de 1,2 (minorista de lujo discrecional y volátil: la acción cayó de 1.440 p a 332 p y volvió a 800 p en cuatro años; estimación propia, sin beta descargada), prima de mercado del 5,5 % y 1 punto adicional por la dependencia de un solo proveedor (Rolex). WACC del 12,07 %. Con la prima implícita del mercado (4,2 %) baja al 10,64 %.',
    terminal: 'Gordon con un 2,5 % nominal en GBP, entre la inflación esperada y la tasa libre menos medio punto. El múltiplo de salida de referencia (8x EBITDA) queda en línea con el EV/EBITDA actual (8,1x).',
  },
  puente: [
    'Volumen +3 % (aperturas en EE. UU., más asignación de Rolex y joyería) y precio +4 % (subidas de catálogo de las marcas, en parte por los aranceles) [A1, B4].',
    'Volumen +3,5 % por la maduración de las aperturas de FY26-FY27 y precio +3,5 % [A1].',
    'Volumen +3 % y precio +3 %: vuelta a subidas de precio normales.',
  ],
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'La reinversión de la proyección (17 % del NOPAT) financia al ROIC actual el 5,0 % anual que proyectamos, así que el crecimiento es financiable. Pero el capital nuevo tendría que rendir un 32 %, frente a un ROCE publicado del 18 % [A7]; la diferencia se explica porque el crecimiento sale sobre todo de precio (subidas de las marcas), que no exige capital. Lo que no controla la empresa es el volumen: la asignación de Rolex. Por eso «En parte»: el crecimiento es alcanzable con poca inversión, pero depende de un proveedor que también es competidor. No rebajamos el caso base porque el fallo de la prueba de capital nuevo procede de un ROIC incremental histórico sin sentido (balance incompleto).',
  dcf_lectura: 'El DCF da 5,76 GBP por acción, un 14,5 % por debajo del precio (6,735 GBP), con un WACC del 12,07 % y un valor terminal del 53 % del total. El DCF inverso dice que el precio descuenta un crecimiento anual del 8,6 % en los años no fijos, frente al 5,0 % de nuestro caso base, o una rentabilidad anual implícita del 10,8 %, por debajo de nuestro WACC (12,1 %) y algo por encima de lo que pide el mercado con su prima implícita (10,6 %). Es exigente: el 8,6 % durante ocho años supera la guía de FY27 y la historia de los últimos cinco años, salvo el auge de FY23. Con la prima del mercado el valor sube a 6,85 GBP (+1,7 %). El precio ya recoge la recuperación de EE. UU. y parte de la opción de una oferta de compra (Reuters habló de una petición «bastante superior a 7,50 GBP») [D10].',
  narrativas: {
    Bajista: 'Rolex amplía su red propia (Bucherer, Tourneau) y recorta la asignación, o EE. UU. entra en recesión: las ventas crecen un 3 % y el margen EBITDA vuelve al 10,4 %, como en FY24, cuando el EBIT cayó un 18 % con ventas planas [A6].',
    Base: 'Se cumple la guía de FY27 (7 % de crecimiento, +60 pb de margen EBIT) y FY28 sigue igual; no hay oferta de compra.',
    Alcista: 'EE. UU. sigue a +15-20 %, el Reino Unido se recupera y el margen se acerca al máximo de FY23 (10,7 % de EBIT).',
  },
  escenarios_comentario: 'La asimetría es mala: el bajista pierde un 43 % y el alcista se queda en −0,5 % sobre el DCF con nuestro WACC. A 12 meses, con PER × BPA, la horquilla es de 3,58 a 9,00 GBP alrededor de un base de 6,64 GBP: pierde más en el bajista (−47 %) de lo que gana en el alcista (+34 %). La única fuente de subida rápida que no recogen los escenarios es una oferta de compra.',
  diferencia_consenso: 'Nuestro BPA de FY28e (57,7 p) queda un 5 % por encima del consenso (≈55 p de MarketScreener) [D7]: suponemos el centro de la guía de margen. La diferencia está en el múltiplo: nuestro base (11,5x, la mediana aproximada de cinco años) da 6,64 GBP, un 5 % por debajo del objetivo medio de los analistas (≈7,00 GBP) [D5], cuyos objetivos van de 740 a 850 p en las casas que más han subido [D4, D5]; esos objetivos suponen 13-15x, el PER de hoy, y probablemente algo de prima por la posible oferta.',
  objetivo12m_comentario: 'El objetivo a 12 meses (6,47 GBP ponderado; 6,64 GBP el base) queda por encima del valor intrínseco (6,20 GBP), y los dos por debajo del precio. Para que la acción suba hace falta un catalizador que la valoración no recoge: una oferta formal de compra. Sin ella, el precio ya descuenta un año más de crecimiento por encima de la guía. La tesis de compra solo vuelve por debajo de ≈5,6 GBP.',
  valoracion_comentario: 'Pesamos el DCF un 50 % (negocio estable con caja libre de 162 M en FY26 [A1]), los comparables un 30 % (solo cuatro y de perfil distinto: marcas con PER de 16-22x y joyeros de 10-12x) y los escenarios un 20 %. Sin transacciones con múltiplo publicado: Rolex no dio el precio de Bucherer. La dispersión es alta: el PER de los comparables da 6,09-9,18 GBP y el DCF 5,76 GBP; la síntesis queda en 6,20 GBP (−7,9 %).',
  rentabilidad_comentario: 'La empresa publica un ROCE del 18 % en FY26 [A7], por encima del WACC del 12,1 % por unos 6 puntos; el ROIC del motor (29 %) sale de un capital invertido incompleto (sin balance anterior a FY25) y no se usa para decidir. El ROIC lo mueve la rotación: el margen EBIT es bajo (8,5 %) pero el capital es sobre todo existencias que rotan. La caída del margen de FY23 (10,7 %) a FY26 (8,5 %) recortó el ROCE desde el récord de FY23 [A5].',
  catalizadores: { items: [
    { fecha: '10-nov-2026', evento: 'Actualización de ventas del 1S FY27', efecto: 'Confirma o no el 5-10 % de crecimiento', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '10-dic-2026', evento: 'Resultados del 1S FY27', efecto: 'Primer dato de margen tras los aranceles', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Posible oferta de exclusión de bolsa (Reuters, jul-2026)', efecto: 'Prima sobre 7,50 GBP si llega; caída si se descarta', probabilidad: 'Baja', sentido: '+' },
    { fecha: 'Mayo de 2027', evento: 'Actualización de ventas de FY27', efecto: 'Cierre del año', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Negociación arancelaria EE. UU.-Suiza', efecto: 'Rebaja del 39 % devolvería margen', probabilidad: 'Media', sentido: '+' },
  ], confianza: 'Media' },
  riesgos: { items: [
    { riesgo: 'Rolex reduce la asignación o abre más tiendas propias (Bucherer)', tipo: 'Proveedor', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−43 % (escenario bajista)', mitigante: 'Relación de décadas; red de boutiques monomarca con la marca', senal: 'Cierre o traspaso de boutiques Rolex; caída de ventas de relojes con listas de espera' },
    { riesgo: 'Desaceleración del consumo de lujo en EE. UU.', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −30 %', mitigante: 'Listas de espera', senal: 'Crecimiento de EE. UU. por debajo del 10 % en el 1S FY27' },
    { riesgo: 'Aranceles de EE. UU. a Suiza más altos o duraderos', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Las marcas suben precios', senal: 'Margen EBIT del 1S por debajo del 8 %' },
    { riesgo: 'La posible oferta de compra no llega', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 a −15 % (prima que descuenta el precio)', mitigante: 'Ninguno', senal: 'Comunicado de fin de conversaciones o silencio prolongado' },
    { riesgo: 'Debilidad del Reino Unido (fiscalidad, sin compras libres de impuestos para turistas)', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'El Reino Unido ya es menos de la mitad', senal: 'Ventas en el Reino Unido negativas' },
    { riesgo: 'Nuevos deterioros por aperturas que no rinden', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 %', mitigante: 'Capex controlado (60-70 M)', senal: 'Excepcionales en el 1S' },
  ], premortem: 'Octubre de 2029: la acción ha perdido un 40 %. En 2027 Rolex, con Bucherer ya integrada, decidió reforzar sus propias tiendas en Nueva York, Miami y Londres y recortó la asignación a los distribuidores multimarca. Las listas de espera se acortaron también porque el mercado de segunda mano bajó precios, y el consumidor de EE. UU. se frenó con el paro al alza. Las ventas crecieron un 2-3 % y el margen EBIT volvió al 7,5 % de los años malos; el BPA cayó a 35 p. La oferta de compra de 2026 nunca llegó y el mercado devolvió el PER a 8-9x, como en 2024-2025. La señal que lo habría anticipado: la evolución de las ventas de relojes por showroom en EE. UU. y cualquier cambio en el número de boutiques monomarca de Rolex.', confianza: 'Baja' },
  preguntas: { items: [
    { tema: 'Rolex', pregunta: '¿Qué peso tiene Rolex en ventas y en beneficio bruto, y cómo ha cambiado la asignación desde la compra de Bucherer?', por_que: 'Es el primer riesgo y la empresa no lo publica.' },
    { tema: 'Oferta', pregunta: '¿Siguen abiertas las conversaciones con posibles compradores y a qué precio se ha dicho no?', por_que: 'El precio puede descontar parte de una prima.' },
    { tema: 'Aranceles', pregunta: '¿Cuánto del margen perdido en FY26 se recupera en FY27 con las subidas de precio de las marcas?', por_que: 'La guía de +40 a +80 pb lo supone.' },
    { tema: 'Capital', pregunta: '¿Habrá nuevas recompras o dividendo con una deuda neta de solo 57 M?', por_que: 'El BPA base no incluye recompras.' },
    { tema: 'Reino Unido', pregunta: '¿Qué rentabilidad tienen las aperturas del Reino Unido que se deterioraron en FY24-FY25?', por_que: 'Los deterioros apuntan a capex que no rindió.' },
    { tema: 'Plan a largo plazo', pregunta: '¿Qué objetivo sustituye al de duplicar ventas y beneficio para 2028?', por_que: 'Bloomberg dice que se abandona [D6].' },
  ], confianza: 'Media' },

  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. Con nuestro BPA y la regla común de múltiplos, el objetivo a 12 meses es de 6,47 GBP frente a 6,735 GBP de cierre del 13 de octubre: −4,0 % ponderado y −1,4 % en el caso base (no paga dividendo). El valor intrínseco es de 6,20 GBP (−7,9 %) y el objetivo medio de los analistas, de unos 7,00 GBP, queda dentro de nuestro rango (3,58-9,00 GBP) pero por encima del base. La asimetría es mala: el bajista pierde un 47 % a 12 meses y el alcista gana un 34 %. La razón principal: la acción ha doblado en un año, ya cotiza a 13,1x nuestro BPA de FY27e, por encima de su mediana de cinco años (≈11,5x), y descuenta un crecimiento del 8,6 % anual, más que la guía. La convicción es baja porque las reglas discrepan (Vender con nuestro WACC del 12,1 %, Mantener con la prima del mercado) y las cifras salen de extractos de búsqueda; subiría si el precio bajara de 5,6 GBP o si hubiera una oferta formal.

**El negocio.** Mayor distribuidor de Rolex del Reino Unido y uno de los mayores de EE. UU., con 1.827,9 M GBP de ventas en FY26 (EE. UU. 51 %) y un 82 % en relojes de lujo [A1, B1]. Su ventaja son las autorizaciones de las marcas de asignación limitada, que no se compran, pero el margen y el volumen los decide Rolex, que desde 2023 es también competidor con Bucherer. El ROCE publicado (18 %) supera al WACC por unos 6 puntos [A7]. Sostenibilidad del crecimiento: «En parte»: el 5 % anual proyectado es financiable porque sale sobre todo de precio, pero el volumen depende de la asignación de Rolex.

**Finanzas.** El EBIT ajustado subió de 150 a 155 M (+3 %), con el margen del 9,1 % al 8,5 % por los aranceles y la mezcla; el BPA ajustado, de 41,6 a 45,2 p [A1, A4]. La caja libre fue de 161,7 M (80 % de conversión) y la deuda neta antes de NIIF 16 cayó a 57 M (con NIIF 16, 483 M) [A1]. Los ajustes fueron grandes en FY24-FY25 (deterioros en el Reino Unido).

**Equipo y gobierno.** Mismo consejero delegado desde 2014; cumplió la guía de FY26 tras fallar la de FY25 y abandonar el objetivo de duplicar el negocio para 2028 [C4]. Un consejero independiente compró acciones en septiembre [C3]. Reuters publicó en julio conversaciones con fondos y compradores estratégicos, con una petición «bastante superior a 7,50 GBP» [C4]; no hay oferta.

**Valoración.** El DCF da 5,76 GBP (−14,5 %) y los comparables, 6,09-9,18 GBP según el PER; la síntesis, 6,20 GBP. El precio pide un crecimiento del 8,6 % anual frente al 5,0 % de nuestro base. Discrepamos del mercado en el múltiplo, no en el beneficio: nuestro BPA de FY28e (57,7 p) está un 5 % por encima del consenso, pero no damos el PER de hoy por normal en un minorista que cotizó a 8x en 2024-2025.

**Riesgos y catalizadores.** Un recorte de asignación de Rolex (−43 % en el bajista), una desaceleración en EE. UU. y que la posible oferta no llegue. Catalizadores: ventas del 1S el 10 de noviembre y resultados el 10 de diciembre. Los foros son positivos y en parte descuentan la oferta: riesgo si no llega.

**Qué cambiaría la decisión.** Compraríamos por debajo de 5,62 GBP (ahí se cumplen la ponderada ≥ 15 %, el base ≥ 12 % y el valor intrínseco ≥ precio) o con una oferta formal; venderíamos por encima de 7,18 GBP o si el crecimiento de EE. UU. del 1S baja del 10 %.`,
    tesis: 'Watches of Switzerland es el mayor distribuidor de Rolex del Reino Unido y ha hecho de EE. UU. su primer mercado (51 % de 1.827,9 M GBP de ventas en FY26), con una caja libre de 161,7 M y una deuda neta antes de NIIF 16 de solo 57 M [A1].\n\nA 6,735 GBP cotiza a 13,1x nuestro BPA de FY27e y a 8,1x EV/EBITDA; el DCF inverso dice que descuenta un crecimiento del 8,6 % anual durante ocho años, por encima de la guía (5-10 % en FY27) y de la historia reciente.\n\nEl mercado acierta en que el negocio va mejor y en que la opción de una oferta existe, pero paga ya un año más de crecimiento y un múltiplo por encima de su mediana. Para invertir hay que creer que Rolex mantendrá su apoyo y que llegará una oferta: lo primero es probable, lo segundo, no.',
    vision_diferencial: {
      mercado_descuenta: 'Crecimiento sostenido en EE. UU., recuperación del margen y una posible oferta de compra por encima de 7,50 GBP.',
      nuestra_vision: 'El beneficio crecerá como dice la guía (BPA de 57,7 p en FY28e, un 5 % más que el consenso), pero el múltiplo de un distribuidor que depende de Rolex no debe estar por encima de su mediana (≈11,5x).',
      por_que: 'En 2024-2025 el mercado pagó 8x por el mismo negocio cuando el margen bajó; nada en el modelo ha cambiado, salvo el peso de EE. UU.',
    },
    a_favor: [
      '**EE. UU. crece con fuerza**: +24 % a tipo constante en FY26 y ya es el 51 % de las ventas [A11].',
      '**Caja libre alta**: 161,7 M en FY26, 10,3 % sobre la capitalización.',
      '**Balance limpio**: deuda neta antes de NIIF 16 de 57 M [A1].',
      '**Opción de compra**: conversaciones con posibles compradores a más de 7,50 GBP [C4].',
    ],
    en_contra: [
      '**Dependencia de Rolex**, que es también competidor desde 2023.',
      '**Precio exigente**: descuenta un 8,6 % anual frente al 5,0 % de nuestro base.',
      '**Asimetría negativa**: −47 % en el bajista frente a +34 % en el alcista a 12 meses.',
      '**Margen a la baja**: EBIT del 10,7 % en FY23 al 8,5 % en FY26 [A5, A1].',
    ],
    que_vigilar: 'La tesis depende de que Rolex mantenga la asignación y de que EE. UU. siga creciendo a doble dígito. La señal de alarma sería un crecimiento de EE. UU. por debajo del 10 % en el 1S FY27 (10 de noviembre) o el cierre de boutiques Rolex.',
    cambiaria_recomendacion: [
      'Precio por debajo de 5,62 GBP: pasaríamos a Comprar.',
      'Oferta formal de compra por encima de 7,50 GBP: revisaríamos.',
      'Crecimiento de EE. UU. del 1S FY27 por debajo del 10 %: rebajaríamos el base.',
      'Margen EBIT del 1S por debajo del 8 %: rebajaríamos el base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento en EE. UU. a tipo constante', nivel_actual: '+24 % (FY26)', umbral_alerta: '< 10 %', por_que: 'Motor del crecimiento' },
      { kpi: 'Margen EBIT ajustado', nivel_actual: '8,5 % (FY26)', umbral_alerta: '< 8 %', por_que: 'Aranceles y mezcla' },
      { kpi: 'Conversión en caja libre', nivel_actual: '80 % (FY26)', umbral_alerta: '< 60 %', por_que: 'Guía de ≈70 %' },
      { kpi: 'Boutiques monomarca Rolex', nivel_actual: 'n.d.', umbral_alerta: 'Cualquier cierre', por_que: 'Señal de la relación con Rolex' },
    ],
    confianza: 'Baja',
  },
};
