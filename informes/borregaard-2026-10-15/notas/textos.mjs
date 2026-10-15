// Textos del analista (Borregaard, corte 2026-10-15). Las cifras del motor se copian de calc tras el último cálculo.
export default {
  limitaciones: 'Línea cotizada: Oslo Børs (BRG), en NOK, que es también la divisa de las cuentas. El precio es el cierre del 14-oct-2026 (147,40 NOK): la sesión del 15-oct no había cerrado al hacer el análisis. Las cuentas de 2021-2024 salen del XBRL ESEF y las de 2025 y del 1S26 del informe anual y del informe trimestral; los informes anuales de 2019-2021 ya no están en la web (enlaces caídos), así que la historia del PER empieza en 2020 y la serie tiene cinco ejercicios. En 2021-2022 la deuda financiera incluye los arrendamientos (no se desglosan); los proveedores solo constan en 2024-2025. El consenso es de MarketScreener (5 analistas) y su BPA de 2026 incluye el deterioro de Alginor. Comparables de MarketScreener, tres de ellos de la ficha de ingredientes del 14-oct; todo pasado a NOK con el BCE del 14-oct (10,6035 NOK/EUR). Una acción vale 13,90 EUR al cambio del BCE del 14-oct: un 0,05 % de una cartera de 30.000 EUR, muy por debajo del 7 %.',
  controles_explicados: [
    { control: 'DCF inverso calculable', explicacion: 'Con capex y circulante proporcionales a las ventas (circulante del 32 %) y un ROIC cercano al WACC, crecer más apenas sube el valor: no hay crecimiento que justifique el precio. El inverso por margen sí sale (28,7 % frente al 24,5 % del caso base) y es el que usamos en el texto.' },
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'Cinco comparables de negocios distintos; no se usa la regresión.' },
    { control: 'Comparables estables al quitar una empresa', explicacion: 'La muestra mezcla químicas de la madera baratas (Kemira, Ingevity) con ingredientes caros (Symrise, Kerry, Croda); por eso los comparables pesan solo un 20 % y la regla a 12 meses usa la mediana del PER solo en el alcista.' },
    { control: 'Transacciones', explicacion: 'Solo dos operaciones aplicables con múltiplo publicado; peso cero en la síntesis.' },
  ],
  huecos: [],
  secciones: {
    trimestres: {
      ultima_presentacion: 'En el 2T26 (15-jul) la dirección defendió que el EBITDA de 515 M NOK, casi igual que el del 2T25 (522 M), se logró pese a −40 M de energía, logística y químicos por el conflicto de Oriente Medio, con la madera un 15 % más barata y una producción récord de celulosa [A2, A6]. En el 1T26 (29-abr) el mensaje era de volúmenes sólidos con márgenes bajo presión por la mezcla en BioSolutions y la corona [A7]. Entre una y otra cambió el tono sobre los costes: en julio presentó un plan de ahorro de 150 M al año con efecto completo en 2028 y deterioró por completo Alginor (337 M) [A2]. En el día del inversor (17-sep) añadió que la corona fuerte y la energía presionarán el margen tres años, suavizado por coberturas y el plan de ahorro, y fijó la ambición de crecer un 5 % anual sin divisa y un margen del 25 % a lo largo del ciclo [A5]. Las preguntas giraron en torno al antidumping de EE. UU. (la empresa cree que con un margen final cercano al 6,54 % sus clientes volverán a comprar), la mezcla de BioSolutions y la divisa de 2027; la dirección no dio cifra de margen para 2027 ni explicó por qué Alginor valía 250 M a final de 2025 y cero seis meses después [A2, A5].',
    },
    directivos: {
      comentario: 'El equipo es estable y de casa: el nuevo consejero delegado (desde agosto de 2025) venía de dirigir celulosa especial y química fina, y sustituyó a Per A. Sørlie tras una sucesión anunciada [C1]. La credibilidad es alta en el negocio principal: el ROCE superó el objetivo del 15 % cada año hasta 2025 y el dividendo sigue la política [C1]. Es baja en las apuestas fuera de él: Alginor (551 M invertidos) se valoró con escenarios optimistas y quedó a cero en seis meses [C2]. El día del inversor de 2026 fue prudente (presión en el margen tres años) [C3], lo que suma credibilidad. Participación de la dirección en el capital pequeña.',
    },
    calidad: {
      comentario: 'Las cuentas son limpias: auditor EY con opinión favorable, sin cambios de criterio relevantes, I+D capitalizada pequeña (intangibles de 79 M NOK) y pagos en acciones modestos (16 M en 2025) [A1]. Los indicadores del motor lo confirman: Altman Z de 4,19 (zona segura), Piotroski F de 8 sobre 9 y Beneish M de −2,81, lejos de la zona de manipulación. Los puntos que hay que mirar están fuera del negocio principal: Alginor se valoró en 250 M a final de 2025 con escenarios de éxito y quedó a cero en junio de 2026 (562 M de deterioros en total), y las coberturas de divisa mueven el EBITDA cientos de millones entre años (−365 M en 2024, +90 M en el 1S26) [A1, A3]. El tipo efectivo de 2025 (31 %) está inflado porque el deterioro no deduce; sin él fue del 24 % [A1]. La conversión en caja es buena en el acumulado (FCF de 2.738 M en 2021-2025, el 70 % del beneficio), con años malos por el circulante.',
    },
    rentabilidad: {
      comentario: 'Borregaard crea valor, pero con poco margen sobre su coste de capital en NOK. El ROIC del motor fue del 15,1-15,2 % en 2022-2023, del 14,4 % en 2024 y del 11,7 % en 2025; el de 2025 está deprimido por un tipo impositivo del 31 % que incluye el deterioro de Alginor (con el 24 % normal sería en torno al 12,8 %). Frente a un WACC del 9,08 % (bono noruego al 4,585 % [D4]), la diferencia es de 2,6 puntos con la cifra publicada y de unos 4 con la normalizada, por debajo de los 5 que pide el filtro de compra. El ROIC lo mueve el margen (EBIT del 17-18 %) más que la rotación (0,8 veces), porque la biorrefinería pide mucho inmovilizado (5.255 M) y circulante (33 % de las ventas). El ROIC incremental histórico es del 9,0 %: el capital añadido desde 2021 (de 5.726 M a 7.649 M) rinde poco más que su coste. No hay fondo de comercio, así que no hay ROIC «sin fondo de comercio» que dar. El ROCE antes de impuestos de la empresa, 15,7 % en 2025 y 14,4 % en los doce meses a junio de 2026, ya está por debajo de su objetivo del 15 % [A1, A2].',
      confianza: 'Alta',
    },
    capital: {
      politica: 'Dividendo regular y creciente del 40-60 % del beneficio (4,75 NOK por 2025, el 55 % del beneficio sin deterioros), recompras oportunistas pequeñas (300.000 acciones en el 2T26 a 145,98 NOK) y prioridad a la inversión de expansión con TIR superior al 15 % antes de impuestos [A1, A2, A5]. Apalancamiento objetivo de 1,0-2,25 veces el EBITDA [A5]. La inversión prevista es de 900-1.000 M al año en 2026-2029 [A5].',
      adquisiciones: [
        { anio: '2021-2026', objetivo: 'Alginor (biorrefinería de algas, 41 % totalmente diluido)', importe: 551, ev_ebitda: null, financiacion: 'Caja y préstamo convertible', resultado: 'Fracaso: retrasos, sobrecostes y falta de materia prima; deterioros de 225 M en 2025 y 337 M en el 2T26; valor contable cero y bajada al 10 % tras la reestructuración [A1, A2].' },
        { anio: '2017', objetivo: 'LignoTech Florida (55 %, planta nueva de lignina)', importe: null, ev_ebitda: null, financiacion: 'Préstamo de 60 M USD garantizado por el Estado noruego', resultado: 'Operativa; quedan 40,8 M USD de préstamo; los costes de las plantas de EE. UU. subieron en 2025 [A1].' },
      ],
      comentario: 'La dirección asigna bien el capital del negocio principal y mal el de las apuestas. En 2021-2025 el FCF sumó 2.738 M NOK y se repartieron 1.870 M en dividendos y 406 M en recompras, mientras se invertían 598 M en participadas y empresas emergentes que hoy valen casi nada [A1]. Las inversiones en Sarpsborg (calderas eléctricas, desembotellamiento, más capacidad de celulosa especial) tienen retornos razonables según la empresa (TIR > 15 %, ahorro de energía de ≈45 M al año) [A5], pero el ROIC incremental del 9,0 % dice que el capital añadido en conjunto aún no rinde lo prometido. No hay dilución: 99,7 M de acciones diluidas en 2025 como en 2021.',
      confianza: 'Media',
    },
    bolsa: {
      comentario: 'La acción ha ido muy por detrás de su mercado: −24,0 % en el año frente al +24,1 % del OSEBX y −21,1 % en doce meses frente al +27,4 % [D1]. La caída empezó tras el máximo de 200,50 NOK del 30-dic-2025, con los recortes del BPA de 2026 por energía, mezcla y corona fuerte [D1, D12]; los peores días fueron el 29-abr-2026 (−9,4 %, 1T26) y el 4-5 de febrero (4T25) [D1]. Desde junio (mínimo de 137,60) se mueve de lado. A cinco años rinde −5,6 % anual y a diez años +10,3 % frente al +12,6 % del índice. Beta mensual a cinco años de 0,70 (0,45 semanal a dos años): una defensiva frente a un índice cargado de petróleo [D1].',
    },
    multiplos_historicos: {
      comentario: 'Con el beneficio deprimido de 2025 y 2026 el PER de los últimos doce meses (87,2x) no dice nada. El EV/EBITDA de los últimos doce meses (9,4x) cotiza un 14 % por debajo de su media de cinco años (10,9x) y por debajo del mínimo de esos cierres (10,4x). Medido sobre el beneficio del año siguiente, el PER de hoy es de 17,8x sobre nuestro BPA de 2027, frente a una mediana de 21,0x en 2021-2025 y un mínimo de 17,4x. El descuento tiene causas: tipos noruegos al 4,6 % (frente al 1,5-2 % de 2020-2021) y un crecimiento del beneficio que se ha parado desde 2022 (BPA sin deterioros de 8,95 en 2022 y 8,67 en 2025) [A1, D4].',
    },
    comparables: {
      comentario: 'Borregaard (EV/EBITDA NTM de 8,1x, PER NTM de 15,1x con el BPA del consenso) cotiza en medio de la muestra: por encima de Kemira (6,1x y 12,9x) e Ingevity (9,0x y 12,6x), las químicas de la madera y nórdicas, y muy por debajo de los ingredientes (Symrise 13,3x y 22,8x, Kerry 12,5x y 18,3x, Croda 11,6x y 23,1x) [D7, D8, D9]. Su margen EBITDA (23,1 %) es de los ingredientes, pero su crecimiento y su ROIC sin compras (11,7 %) están más cerca de las químicas. El valor implícito por EV/EBITDA NTM (mediana 218,94 NOK) exagera porque el EBITDA NTM sale del consenso (2.066 M), que creemos alto con la corona de hoy; por PER NTM la mediana da 178,58. Usaríamos el PER de las químicas de especialidad nórdicas, 13-18x.',
    },
    transacciones: {
      comentario: 'No hay operaciones recientes de lignina o celulosa especial con múltiplo publicado. Las dos de referencia, MBCC por Sika (11,5x EBITDA, química de construcción) y la nutrición animal de dsm-firmenich por CVC (7x, cíclica), acotan el valor de control entre 7 y 12 veces el EBITDA [D10, D11]: a 9,4x de EBITDA LTM, Borregaard está en medio. Una opa es poco probable: no hay accionista de control y el primero es el fondo de pensiones del Estado (12,6 %), pero la biorrefinería es un activo único que podría interesar a un químico grande.',
    },
    catalizadores: {
      items: [
        { fecha: '2026-10-28', evento: 'Resultados del 3T26 [C4]', efecto: 'Volúmenes guiados (85.000 t y 40.000 t); se medirá el precio de BioSolutions y la divisa', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Oct-dic 2026', evento: 'Decisión final del Departamento de Comercio de EE. UU. y de la ITC sobre el antidumping a la celulosa de alta pureza [B6]', efecto: 'Un margen cercano al 6,54 % devolvería clientes en EE. UU.; uno alto los cerraría', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2028', evento: 'Plan de ahorro de 150 M NOK al año [A2]', efecto: '+8 % de EBITDA con efecto completo en 2028', probabilidad: 'Media', sentido: '+' },
        { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de coberturas y divisa para 2027', efecto: 'Primera lectura del golpe de la corona sin coberturas', probabilidad: 'Alta', sentido: '−' },
        { fecha: '2026-2027', evento: 'Cierre de la reestructuración de Alginor [A2]', efecto: 'Fin de las pérdidas de participadas en el resultado financiero', probabilidad: 'Alta', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Corona noruega fuerte frente a USD y EUR cuando vencen las coberturas', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−10 a −15 % (≈40-45 M de EBITDA por cada 1 %)', mitigante: 'Coberturas a nueve meses; precios en divisa', senal: 'NOK/EUR por debajo de 10,5 y NOK/USD por debajo de 9,3 a finales de 2026' },
        { riesgo: 'Energía y químicos caros (conflictos, electricidad del sur de Noruega)', tipo: 'Costes', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −8 %', mitigante: 'Calderas eléctricas y biocombustible; flexibilidad', senal: 'Impacto neto de costes peor que −40 M por trimestre' },
        { riesgo: 'Construcción débil y sustitución por dispersantes sintéticos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Giro hacia agricultura y especialidades', senal: 'Volumen de construcción por debajo de 90.000 t' },
        { riesgo: 'Antidumping definitivo alto en EE. UU.', tipo: 'Regulación', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Venta a Europa y Asia; margen provisional del 6,54 %', senal: 'Margen final por encima del 15 %' },
        { riesgo: 'Precios de la celulosa especial a la baja si los grandes de la celulosa disolvente bajan hacia los grados especiales', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: '87 % de grados muy especializados', senal: 'Precio medio de BioMaterials por debajo de 15.500 NOK/t' },
        { riesgo: 'Nuevas apuestas de capital fuera del negocio (otro Alginor)', tipo: 'Asignación de capital', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Nueva dirección con «disciplina de capital» [A5]', senal: 'Inversiones en participadas por encima de 150 M al año' },
        { riesgo: 'Concentración en una sola planta (Sarpsborg) y riesgo de terreno', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 % en un año de parada', mitigante: 'Medidas de estabilización; seguros', senal: 'Paradas no programadas; nuevas provisiones geotécnicas' },
      ],
      premortem: 'Octubre de 2029: la acción cotiza a 90 NOK. La corona siguió apreciándose con el petróleo caro y los tipos noruegos altos: el EUR bajó a 10 NOK y el USD a 8,8. Cuando vencieron las coberturas en 2027, el EBITDA cayó a 1.600 M aunque los volúmenes crecían, porque los precios en divisa no se pudieron subir con la construcción europea y china débil y la vainillina china barata. El plan de ahorro de 150 M solo compensó la mitad. El margen se quedó en el 21-22 % y el BPA en 6-7 NOK durante tres años; con un ROIC del 9-10 %, igual al WACC, el mercado le quitó la prima de calidad y la pagó a 13-14 veces. La empresa siguió invirtiendo 900 M al año en Sarpsborg, lo que redujo el FCF a 300-400 M y frenó el dividendo. La señal que lo anticipaba: el margen EBITDA del 2S26 y del 1S27 por debajo del 23 % con volúmenes récord, y el NOK/EUR por debajo de 10,5.',
      ia: {
        exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '±2 %',
        comentario: 'La IA no sustituye lo que vende Borregaard: biopolímeros de lignina, celulosa especial y vainillina son productos físicos que el cliente homologa en su fórmula y que solo salen de una biorrefinería de madera; ningún modelo los hace más baratos ni los copia. Toca dos cosas menores: el diseño de aplicaciones y moléculas (puede acortar la I+D propia y la de rivales, que hoy cuesta 222 M NOK, el 3 % de las ventas) y la operación de la planta, donde ya usa sensores y mantenimiento predictivo con ≈70 M de efecto acumulado desde 2023 [A5]. El riesgo indirecto es la demanda de electricidad de centros de datos en Noruega, que puede encarecer la energía (472 M de coste en 2025). Señal: precio de la electricidad del sur de Noruega y anuncios de centros de datos en la zona NO1.',
      },
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Divisa', pregunta: '¿Qué parte de la exposición de 2027 está cubierta y a qué tipos?', por_que: 'Cada 1 % de NOK mueve ≈40-45 M de EBITDA; es la mayor diferencia entre nuestro BPA y el del consenso.' },
        { tema: 'Precio', pregunta: '¿Por qué bajó el precio en divisa de BioMaterials un 4 % en el 1S26 y qué grados lo explican?', por_que: 'El poder de precios es la base del foso.' },
        { tema: 'Plan de ahorro', pregunta: '¿Qué partidas cubren los 150 M y cuánto llega en 2027?', por_que: 'Es la palanca que compensa la corona.' },
        { tema: 'Antidumping', pregunta: '¿Qué ventas a EE. UU. hay en riesgo con cada margen final posible?', por_que: 'La decisión es de octubre-diciembre de 2026.' },
        { tema: 'Capex', pregunta: '¿Cuánto del capex de 900-1.000 M es mantenimiento real y qué ROIC esperan del resto?', por_que: 'El ROIC incremental histórico es del 9,0 %.' },
        { tema: 'Alginor', pregunta: '¿Qué cambió entre el valor de 250 M de diciembre y cero en junio, y qué regla de inversión en empresas emergentes aplicarán?', por_que: 'Credibilidad de la asignación de capital.' },
      ],
      confianza: 'Media',
    },
    sentimiento: {
      lectura: 'El poco debate que hay es de particulares noruegos y es alcista: ven la caída como una oportunidad y esperan los resultados del 28-oct [E1]. No es euforia ni capitulación, y coincide con los analistas (cuatro de seis con «comprar»). Lo que el foro no recoge es la divisa: nadie discute que la corona fuerte puede bajar el beneficio de 2027, que es nuestro principal desacuerdo con el consenso. No aporta un riesgo nuevo ni cambia la decisión.',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Ingresos de 7.900 M NOK en 2026 (+2,4 %, año fijo con dos trimestres publicados: 4.119 M en el 1S26 y la guía de volúmenes del 3T [A2]), +1,0 % en 2027 por la corona (−4 puntos de divisa sobre +5 de volumen y precio) y +5,0 % en 2028-2029, la ambición de la empresa sin divisa [A5], bajando al 3,5 % en 2032. La historia: +7,4 % anual en 2021-2025 en NOK, pero ≈5,0 % sin divisa [A5]. El consenso espera +5,6 % en 2027 [D2]: no descuenta la apreciación de la corona desde julio.',
    margenes: 'Margen EBITDA del 22,9 % en 2026 (943 M en el 1S26), 23,5 % en 2027 y 24,0-24,5 % desde 2028 con el plan de ahorro de 150 M [A2]; por debajo del 25 % que la empresa ambiciona a lo largo del ciclo y de la media de 2021-2025 (24,3 %), porque la propia empresa avisa de tres años de presión por divisa y energía [A5]. El consenso da un 25,2 % en 2027 [D2].',
    inversion: 'Capex del 10,8 % de las ventas en 2026 y del 12,0 % en 2027, bajando al 9,5 % en 2032: la guía de 900-1.000 M al año en 2026-2029 (reposición de 550-600 M más expansión) más ≈50 M de altas de derechos de uso [A5]. Amortización del 7,6 % al 8,7 % de las ventas (7,7 % en 2025). Circulante del 32 % de las ventas, el de 2025 (32,9 %); el objetivo de la empresa del 20 % usa otra definición [A5].',
    wacc: 'Tasa libre: bono noruego a 10 años del 4,585 % [D4], porque los flujos están en NOK. Beta de 0,85, entre la ajustada mensual a cinco años (0,80) y una beta sectorial de química de especialidad; la semanal a dos años es de 0,45 [D1]. Prima de mercado del 5,5 % y prima adicional de 0,5 puntos por tamaño (capitalización de 14.688 M NOK) y una sola planta. Coste de la deuda del 5,8 % (deuda a tipo variable en NOK) con un peso del 13 % a valor de mercado. WACC del 9,08 %; con la prima implícita del mercado (4,2 %), 8,12 %.',
    terminal: 'Gordon con un 2,5 %: inflación objetivo de Noruega (2 %) más medio punto real, coherente con un bono al 4,585 %. Equivale a ≈8,5 veces el EBITDA de 2032, por debajo del EV/EBITDA medio de la acción en 2021-2025 (10,9x), que se hizo con tipos mucho más bajos.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +4 % (BioSolutions 335.000 t y BioMaterials > 160.000 t según la guía [A2]); precio +0,5 %; −2,1 puntos de divisa y mezcla.',
    '2027e': 'Volumen +3 % y precio +2 % (ambición de la empresa [A5]); −4 puntos por la corona al vencer las coberturas.',
    '2028e': 'Volumen +3 % (desembotellamiento de Sarpsborg) y precio +2 %, sin divisa [A5].',
    '2029e': 'Igual que 2028.',
    '2030e': 'Volumen +2,5 % y precio +2 %.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte. Con el capex guiado, el motor ve el crecimiento financiable (3,4 % al ROIC actual frente al 3,6 % proyectado) y el capital nuevo rendiría un 13,4 %, dentro de 1,25 veces el ROIC de hoy; en un primer cálculo, con un margen del 25 % y menos capex, la proyección pedía al capital nuevo un 18,8 % y se rebajó el caso base (margen del 24,5 % y capex de la guía). No llega a «Sí» porque el ROIC (11,7 %) apenas supera el WACC (9,08 %), el incremental histórico es del 9,0 % y el poder de precios se ha debilitado en 2026 (precio de la celulosa −4 % en divisa) [A2]. El foso es real, pero estrecho, y el crecimiento depende de una corona que no controla.',
  dcf_lectura: 'El DCF da 105,46 NOK por acción, un 28,5 % por debajo del precio, con un 72 % del valor en el terminal. Con la prima implícita del mercado (WACC del 8,12 %) sube a 128,14, aún un 13 % por debajo. El precio descuenta una rentabilidad anual del 7,5 %, por debajo del 9,08 % de nuestro WACC y del 8,12 % que pide el mercado; o bien un margen EBITDA del 28,7 % desde 2027, cuatro puntos por encima de nuestro caso base y del máximo histórico (25,0 % en 2023). El crecimiento no sirve para cerrar la distancia: con un circulante del 32 % y un capex del 10-12 % de las ventas, crecer más casi no añade valor, y el DCF inverso no encuentra solución por crecimiento. Es exigente frente a la historia: la acción se pagó a 10-17 veces el EBITDA cuando el bono noruego rendía el 1-3 %; con el bono al 4,6 % y el ROIC a 2,6 puntos del WACC, el múltiplo de entonces no vuelve solo. La sensibilidad es grande: con medio punto menos de WACC y medio más de crecimiento terminal, el valor sube a 126,00 NOK, aún por debajo del precio.',
  narrativas: {
    Bajista: 'La corona sigue subiendo (EUR a 10 NOK), la construcción europea y china no se recupera y la vainillina china presiona: crecimiento 2 puntos menor y margen 2 puntos menor, cerca del 22 % de 2026 y del 21,3 % del 1T26.',
    Base: 'Volúmenes según la guía, golpe de divisa en 2027 compensado en parte por el plan de ahorro; margen del 24-24,5 % desde 2028 y crecimiento del 5 % sin divisa.',
    Alcista: 'La corona se debilita, el antidumping queda en el 6,54 % y vuelven los clientes de EE. UU., y la agricultura y las especialidades mejoran la mezcla: margen del 25,5 % y crecimiento 1,5 puntos mayor.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio: 74,74 NOK el bajista (−49,3 %), 105,46 el base (−28,5 %) y 119,98 el alcista (−18,6 %); la asimetría es negativa. Es la lectura a largo plazo con un WACC del 9,08 % en NOK. A 12 meses la asimetría es la contraria (alcista +50,8 % frente a bajista −18,9 %), porque la regla de múltiplos supone que el PER vuelve hacia su mediana de 21x: las dos lecturas difieren en el tipo de descuento, no en el negocio.',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 7.41, multiplo: null, precio: null, justificacion: 'Corona más fuerte y construcción débil: ventas de 8.056 M en 2028 (−1 % en 2027 y +3 % en 2028) y margen EBITDA del 22,0 % (1.772 M); EBIT de ≈1.136 M, resultado financiero de −165 M y tipo del 24 %. BPA de 7,41 NOK, por debajo del 8,67 sin deterioros de 2025.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 9.07, multiplo: null, precio: null, justificacion: 'Ventas de 8.378 M en 2028 (+1 % en 2027 y +5 % en 2028), margen del 24,0 % (2.011 M de EBITDA) y amortización del 7,9 %: EBIT de ≈1.349 M, financiero de −160 M, impuesto del 24 % y 99,6 M de acciones. BPA de 9,07 NOK sin Alginor. Cuadre con 2025: (1.287 − 178) × 0,76 ÷ 99,7 = 8,45 NOK frente a 8,67 publicado sin deterioros.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 10.07, multiplo: null, precio: null, justificacion: 'Corona más débil y mejor mezcla: ventas de 8.624 M (+2,5 % y +6,5 %) y margen del 25,0 % (2.156 M); EBIT de ≈1.475 M y financiero de −155 M. BPA de 10,07 NOK, por debajo del 11,38 del consenso.' },
  ],
  per_excluidos: 'Ninguno. Historia adelantada 2020-2025: cierre de cada año ÷ BPA real del año siguiente (2021: 6,94; 2022: 8,92; 2023: 8,73 sin deterioros; 2024: 8,25; 2025: 8,67 sin deterioros; para el cierre de 2025, nuestro BPA de 2026 normalizado de 7,93): 20,4x, 24,9x, 17,4x, 20,8x, 21,0x y 25,1x. Mediana de cinco años 21,0x, mínimo 17,4x, media de seis años 21,6x. El PER actual (17,8x) es el precio ÷ nuestro BPA de 2027 (8,30).',
  diferencia_consenso: 'Nuestro BPA de 2028 (9,07 NOK) está un 20 % por debajo del consenso (11,38) y el de 2027 (8,30) un 22 % por debajo (10,61) [D2]. La diferencia es de margen y divisa: el consenso supone un margen EBITDA del 25,2 % en 2027 y ventas de 8.387 M, con tipos de cambio anteriores a la última apreciación de la corona (EUR a 10,60 NOK frente a 11,10 en julio [D5, A2]); nosotros ponemos un 23,5 % y 7.979 M. Aun así, nuestro objetivo ponderado (170,62) queda casi en el objetivo medio de los analistas (173,75; un 1,8 % por debajo), porque aplicamos un PER más alto a un BPA más bajo.',
  objetivo_comentario: 'El objetivo a 12 meses (170,62 NOK, +19,0 % con dividendo) y el valor intrínseco (122,50, −16,9 %) están separados por un 39 %. La diferencia es el tipo de descuento: la regla de múltiplos supone que el mercado vuelve a pagar 19,3 veces el beneficio de 2028, a mitad de camino de su mediana de 21x, mientras el DCF con el bono noruego al 4,6 % dice que ese múltiplo no se justifica con un ROIC de 12 % y un crecimiento del 3-5 %. Para cerrar la distancia hacia arriba haría falta que el margen volviera al 25 % con la corona de hoy o que bajaran los tipos noruegos; hacia abajo, que el mercado se quede en 16-18 veces. La tesis a 12 meses depende del múltiplo, no del valor.',
  valoracion_comentario: 'Pesos: DCF 40 %, escenarios 40 % y comparables 20 %. El DCF es el método más fiable para un negocio estable de una sola planta con flujos predecibles, aunque muy sensible al WACC en NOK; los comparables son frágiles (químicas baratas frente a ingredientes caros) y las transacciones no pesan. La dispersión es enorme: de 74,74 NOK (bajista del DCF) a 218,94 (EV/EBITDA NTM con el EBITDA del consenso). Todos los métodos de flujo de caja quedan por debajo del precio, y todos los de múltiplos por encima: el mercado valora a Borregaard por múltiplos de calidad de otra época de tipos. El valor intrínseco ponderado es de 122,50 NOK.',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. La regla a 12 meses da una rentabilidad ponderada del 19,0 % y del 22,0 % en el caso base (objetivo de 170,62 NOK frente a 147,40, con un dividendo del 3,2 %), pero el valor intrínseco (122,50 NOK) está un 16,9 % por debajo del precio, así que no se cumple el requisito de valor real y no es un Comprar. El objetivo medio de los analistas (173,75) queda dentro de nuestro rango. La convicción es media porque las dos reglas del valor intrínseco coinciden (absoluta y relativa) y la rentabilidad a 12 meses está lejos de sus umbrales; bajaría si el margen del 3T26 (28-oct) sale por debajo del 22 %, y subiría si el precio bajara de 122,50.

**El negocio.** Borregaard es una biorrefinería única que saca de la madera biopolímeros de lignina, celulosa especial y vainillina, con márgenes EBITDA del 24 % y pocos competidores en cada nicho [B1, B2]. Pero el ROIC (11,7 % en 2025; 14-15 % en 2022-2024) supera al WACC en NOK (9,08 %) solo en 2,6 puntos y el capital añadido desde 2021 rinde un 9,0 %. Veredicto de calidad: en parte. La sostenibilidad del crecimiento es «En parte»: el capex guiado financia el 3,6 % anual que proyectamos, pero solo tras rebajar el margen al 24,5 %, y el poder de precios flojea en 2026.

**Sector y ciclo.** La corona manda: cada 1 % de apreciación quita ≈40-45 M de EBITDA y desde julio el euro ha bajado de 11,10 a 10,60 NOK [A2, D5]. La empresa avisa de tres años de presión en el margen [A5].

**Finanzas.** Balance sano (deuda neta de 2.141 M, 1,2 veces el EBITDA), cuentas limpias (Piotroski 8, Beneish −2,81) y FCF de 2.738 M en 2021-2025. El BPA de 2025 (6,22) y del 1S26 (0,55) incluye 562 M de deterioros de Alginor, que ya vale cero [A1, A2].

**Equipo y gobierno.** Consejo independiente y sin accionista de control; nuevo consejero delegado desde agosto de 2025. Resta la pérdida de 551 M en Alginor y un variable que premia la cotización y no el ROIC.

**Valoración.** El precio descuenta una rentabilidad del 7,5 % anual o un margen del 28,7 %, por encima de cualquier año de su historia. Por múltiplos parece barata (17,8 veces nuestro BPA de 2027 frente a una mediana adelantada de 21x), pero esa mediana se formó con tipos noruegos del 1-3 %. Nuestro BPA de 2028 (9,07) está un 20 % por debajo del consenso por la divisa.

**Riesgos y catalizadores.** La corona (−10 a −15 % de valor), la energía y la construcción débil; el antidumping definitivo de EE. UU. (octubre-diciembre) y el plan de ahorro de 150 M. El riesgo de que la IA se coma el negocio es bajo: vende moléculas físicas homologadas que solo salen de su planta. Los foros, poco activos, son alcistas y no discuten la divisa.

**Qué cambiaría la decisión.** Compraríamos por debajo de 122,50 NOK y venderíamos por encima de 194,85. También cambiaría con un margen EBITDA de vuelta al 25 % con el euro por debajo de 11 NOK, o con un ROIC normalizado que supere en cinco puntos al WACC.`,
    tesis: 'Borregaard convierte el abeto noruego en productos químicos de nicho que nadie más fabrica igual: es el mayor productor mundial de biopolímeros de lignina, el único de vainillina de madera y uno de los pocos de celulosa de alta pureza, con 800 productos para 3.100 clientes y un margen EBITDA del 24 % [B1, B2]. Desde la salida a bolsa ha subido el BPA de 2,76 a 8,67 NOK con especialización [A5].\n\nEl precio (147,40 NOK) descuenta una rentabilidad anual del 7,5 % o un margen del 28,7 %, cuando el WACC en NOK es del 9,08 %. Por múltiplos parece barata (17,8 veces el BPA de 2027, frente a 21x de mediana adelantada), pero por flujos no: el DCF da 105,46 NOK.\n\nEl mercado acierta en descontar un múltiplo menor que el histórico, porque los tipos noruegos están en el 4,6 % y el ROIC solo supera al WACC en 2,6 puntos; se equivoca, a nuestro juicio, en el beneficio de 2027, que el consenso estima con una corona más débil que la de hoy. Para invertir hay que creer que el margen vuelve al 25 % pese a la divisa, o que los tipos noruegos bajan.',
    vision_diferencial: {
      mercado_descuenta: 'Que Borregaard vuelve en 2027 a crecer el beneficio un 60 % (BPA de 10,61 NOK frente a 6,57 en 2026 con deterioros) y a un margen del 25 %, y que la acción está barata frente a su historia de múltiplos.',
      nuestra_vision: 'El beneficio de 2027 será menor (8,30 NOK) porque las coberturas vencen con una corona más fuerte; el margen vuelve al 24-24,5 % solo en 2028 con el plan de ahorro. Y el múltiplo histórico no es la referencia con el bono noruego al 4,6 %.',
      por_que: 'La sensibilidad a la divisa la publica la propia empresa (≈40-45 M de EBITDA por 1 %) y avisa de tres años de presión en el margen; el euro ha bajado de 11,10 a 10,60 NOK desde la última guía [A2, A5, D5].',
    },
    a_favor: [
      '**Activo único**: la biorrefinería de Sarpsborg no se puede replicar y abastece nichos de 1,4 Mt de demanda mundial en celulosa especial [B2].',
      '**Rentabilidad a 12 meses del 19,0 %** con la regla de múltiplos (base +22,0 %), con el objetivo cerca del de los analistas (173,75).',
      '**Balance sano**: deuda neta de 1,2 veces el EBITDA, Piotroski 8 y rating A- [A5].',
      '**Plan de ahorro de 150 M NOK** al año con efecto completo en 2028 [A2].',
      '**Alginor ya está a cero**: el BPA normalizado de 2026 (7,93 NOK) no arrastra más pérdidas de participadas.',
    ],
    en_contra: [
      '**Valor intrínseco de 122,50 NOK**, un 16,9 % por debajo del precio.',
      '**ROIC del 11,7 % frente a un WACC del 9,08 %**: 2,6 puntos de margen y un incremental del 9,0 %.',
      '**Corona fuerte**: cada 1 % quita ≈40-45 M de EBITDA y el euro ha caído a 10,60 NOK [D5].',
      '**Nuestro BPA de 2027 está un 22 % por debajo del consenso** (8,30 frente a 10,61).',
      '**Capex de 900-1.000 M al año** con un ROIC incremental histórico del 9,0 % [A5].',
    ],
    que_vigilar: 'La tesis depende del margen EBITDA con la corona de hoy. Si en el 3T26 y el 4T26 el margen se mantiene por encima del 24 % con el euro a 10,6 NOK, el consenso tendría razón y nuestro BPA de 2027 se quedaría corto. Si baja del 22 % cuando vencen las coberturas, el objetivo a 12 meses cae hacia el bajista (114,86 NOK).',
    cambiaria_recomendacion: [
      'Precio por debajo de 122,50 NOK (valor intrínseco): pasaríamos a Comprar si se mantiene la rentabilidad a 12 meses.',
      'Precio por encima de 194,85 NOK: Vender.',
      'Margen EBITDA del 3T26 o del 4T26 por debajo del 22 %: rebajaríamos el BPA de 2027-2028 y el objetivo.',
      'Euro por debajo de 10,2 NOK de forma sostenida: revisaríamos el caso base a la baja.',
      'Antidumping definitivo de EE. UU. por encima del 15 %: rebaja del BPA de BioMaterials.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen EBITDA trimestral', nivel_actual: '24,4 % (2T26)', umbral_alerta: '< 22 %', por_que: 'Mide la presión de divisa y energía.' },
      { kpi: 'NOK por EUR', nivel_actual: '10,60', umbral_alerta: '< 10,2', por_que: '≈40-45 M de EBITDA por cada 1 %.' },
      { kpi: 'Precio medio de BioMaterials (NOK/t)', nivel_actual: '15.682 (2T26)', umbral_alerta: '< 15.000', por_que: 'Poder de precios de la celulosa especial.' },
      { kpi: 'Volumen de BioSolutions', nivel_actual: '172.000 t en el 1S26', umbral_alerta: '< 330.000 t en 2026', por_que: 'Demanda de construcción y agricultura.' },
      { kpi: 'ROCE antes de impuestos (12 meses)', nivel_actual: '14,4 %', umbral_alerta: '< 13 %', por_que: 'Objetivo de la empresa > 15 %.' },
    ],
  },
};
