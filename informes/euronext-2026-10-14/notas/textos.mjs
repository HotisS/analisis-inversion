// Textos del analista (Euronext, corte 2026-10-14). Las cifras del motor se copian de calc tras el último cálculo.
export default {
  limitaciones: 'Línea cotizada: Euronext París (ENX), la principal; la acción también cotiza en Ámsterdam, Bruselas, Lisboa, Milán y Oslo. Cuentas 2020-2025 del XBRL ESEF del regulador, comprobadas contra las notas de resultados; 2020 no incluye Borsa Italiana (comprada en abril de 2021) y el BPA de 2020 está reexpresado por la ampliación con derechos de 2021, igual que los precios históricos de Yahoo. Los ingresos son los «ingresos y otros ingresos» publicados, que incluyen el resultado de tesorería de la cámara. El balance analítico excluye los activos y pasivos de compensación de Euronext Clearing y de Nord Pool (405.562 M y 405.585 M a 30-jun-2026), que se compensan entre sí; fondo de comercio e intangibles van juntos porque la empresa los presenta en una sola línea. Faltan los pagos a proveedores de 2022 y 2023 (el circulante de esos años sale positivo y no es comparable). Segmentos solo para 2024-2025 (segmentación nueva). Consenso de una sola fuente con estimaciones completas (MarketScreener). Sin informe de remuneraciones ni registro de operaciones de directivos de la AFM.',
  controles_explicados: [
    { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con seis comparables de modelos distintos (bolsas, datos, renta fija electrónica) el crecimiento no explica el múltiplo (R² 0,08); no usamos la regresión.' },
  ],
  huecos: [],
  parches: [
    { ruta: 'sentimiento.temas[0].contraste', valor: 'El consejero delegado dijo al FT que unir los negocios de bolsa «tendría sentido», pero no hay conversaciones y Bruselas ya vetó la operación en 2012 y 2017 [B4]. No entra en nuestros escenarios.' },
    { ruta: 'sentimiento.temas[1].contraste', valor: 'Los datos dan la razón al foro sobre la ejecución (planes cumplidos, sinergias de Borsa Italiana por encima de lo previsto [C10]), pero la sucesión de mayo de 2027 sin candidato es un riesgo que el foro casi no comenta [C6].' },
    { ruta: 'sentimiento.temas[2].contraste', valor: 'La acción está en máximos de 52 semanas (168,30 EUR el 13-oct) tras subir un 30,3 % en el año [D1]; el análisis técnico no entra en la valoración.' },
    { ruta: 'sentimiento.temas[3].contraste', valor: 'Es verdad solo en parte: el 58 % de los ingresos no depende del volumen [A2]; la parte cíclica (contado y derivados) es la que más ha crecido en 2026 y la que más puede caer.' },
  ],
  secciones: {
    rentabilidad: {
      comentario: 'Euronext crea valor, pero menos de lo que sugiere su margen: el ROIC es del 10,9 % en 2025 frente a un WACC del 7,36 %, porque el capital invertido incluye 6.777 M de fondo de comercio e intangibles de las compras, sobre todo Borsa Italiana [A1]. El ROIC cayó del 18 % de 2020 al 7,5 % de 2022 con esa compra y se ha recuperado año a año (8,0 %, 10,0 % y 10,9 %) a medida que llegaban las sinergias; el ROIC incremental histórico es del 8,1 %. Lo que lo mueve es el margen (EBITDA del 61,8 % publicado), no la rotación: los activos tangibles son mínimos. Frente a Deutsche Börse (ROIC del 14 %) y la mediana de comparables (10,3 %), Euronext queda en la media [D12]. Sin el fondo de comercio, el rendimiento del capital tangible es de varias veces el WACC: el foso es real, pero la dirección lo ha pagado caro.',
      confianza: 'Alta',
    },
    calidad: {
      comentario: 'Cuentas limpias con dos matices. Primero, la empresa enseña cifras «ajustadas» que excluyen la amortización de intangibles de las compras (86,9 M en 2025) y costes de integración que aparecen todos los años desde 2021: el BPA ajustado (7,27 EUR) supera en un 15 % al publicado (6,34) [A1]; usamos el publicado. Segundo, el balance lleva 405.000 M de posiciones de cámara que inflan el activo sin riesgo de balance propio salvo el de impago de miembros; lo excluimos. El Altman Z de 3,05 queda en zona segura, el Piotroski F de 7 sobre 8 calculables es alto y el Beneish M de −2,52 no apunta a manipulación. La remuneración en acciones es pequeña (20,9 M en 2025, el 3 % del beneficio) [A1]. El auditor es KPMG [A4]. Las cifras trimestrales no están auditadas ni revisadas [A2].',
      senales: [
        { senal: 'Cifras «ajustadas» con costes recurrentes de integración fuera', nivel: 'Media', comentario: 'Costes no subyacentes todos los años desde 2021; el BPA ajustado supera al publicado en un 15 %.' },
        { senal: 'Balance de cámara de 405.000 M', nivel: 'Baja', comentario: 'Posiciones compensadas de los miembros; riesgo de impago cubierto por garantías y fondos de la cámara.' },
        { senal: 'Flujo de explotación volátil por las garantías de la cámara', nivel: 'Baja', comentario: '499,8 M en el 1T26 y 185,5 M en el 2T26; la empresa da la conversión sin ese efecto (75,2 % en 2025).' },
      ],
    },
    capital: {
      comentario: 'La dirección asigna bien el capital, con una salvedad de precio. Entre 2021 y 2025 el flujo de explotación acumulado (3.507 M) pagó dividendos, recompras (737 M en 2023-2025) y compras pequeñas; Borsa Italiana se financió con una ampliación de 2.375 M y deuda, y Athex con acciones [A4]. Borsa Italiana dio más sinergias de las previstas (121 M) y no ha tenido deterioros, pero su precio hundió el ROIC del 18 % al 7,5 % y tardó cuatro años en volver por encima del 10 % [A10]. El ROIC incremental histórico (8,1 %) apenas supera el WACC. Las recompras recientes se hicieron a 127 EUR, un 24 % por debajo del precio actual [A1]. El número de acciones diluidas baja de 106,8 M en 2022 a 103,1 M en 2025.',
    },
    directivos: {
      comentario: 'Equipo creíble: ha cumplido los dos últimos planes (objetivos de 2024 un trimestre antes, guía de costes de 2025 rebajada y cumplida) y ha integrado cuatro compras sin sustos [C9, C10]. El riesgo es la sucesión: Stéphane Boujnah, consejero delegado desde 2015 y artífice de la estrategia de compras, deja el cargo en mayo de 2027 y no hay sucesor elegido; el director financiero es el candidato interno que cita la prensa [C6]. Los accionistas de referencia tienen derecho a ser consultados en la elección [C3], lo que añade un componente político (Francia, Italia, Bélgica) al proceso.',
    },
    bolsa: {
      comentario: 'La acción sube un 30,3 % en 2026 frente al −3,4 % del CAC 40 y un 34,7 % anual en tres años, con una beta mensual de 0,72 [D1]. Lo explican nueve trimestres seguidos de crecimiento de dos dígitos, la entrada en el CAC 40 en septiembre de 2025 y el entusiasmo por la integración europea de los mercados [A2, B5]. El índice sectorial europeo (EXH1, financieras) sube más (+43,8 %) por los bancos. La caída máxima de cinco años (−38,2 %, oct-21 a oct-22) coincide con la integración de Borsa Italiana y el ciclo de volúmenes bajos. La acción marca máximos de 52 semanas (168,30 EUR el 13-oct) [D1].',
    },
    multiplos_historicos: {
      comentario: 'Euronext cotiza con prima frente a su propia historia: un PER de los últimos doce meses de 24,2 veces frente a una media de 19,5 al cierre de cada año desde 2020, y un EV/EBITDA de 15,7 frente a 13,4. En base adelantada (precio de cierre entre el BPA del año siguiente), la mediana de cinco años es de 17,2 veces y el mínimo de 14,0 (2023); hoy paga 22,1 veces nuestro BPA de 2027. Parte de la prima es estructural: el perfil es más diversificado (58 % de ingresos no ligados al volumen), la empresa está en el CAC 40 y el sector entero se ha revalorizado. Parte es ciclo: volúmenes récord.',
    },
    comparables: {
      criterio: 'Grandes operadores de infraestructura de mercado cotizados con datos homogéneos de un mismo proveedor: Deutsche Börse (el comparable más directo, europeo y con cámara y depositario), LSEG, ICE, CME, Nasdaq y Tradeweb. Excluimos S&P Global y MSCI (datos e índices puros, sin negocio de mercado) y no hay cifras homogéneas de SIX (no cotiza) ni de Cboe. Cifras de la ficha sectorial del repo, llevadas al cierre del 13/14-oct y pasadas a euros a 1,1126 USD/EUR [D12].',
      comentario: 'Euronext cotiza a 20,8 veces el beneficio de los próximos doce meses y 14,1 veces el EBITDA, por debajo de la mediana de sus comparables (23,4 y 15,1 veces), con un margen EBITDA superior (62,6 % frente a 58,4 %) y un ROIC en línea (10,9 % frente a 10,3 %). Frente a Deutsche Börse, cuesta 1,9 puntos menos de PER (20,8 frente a 22,7 veces) [D12] creciendo más (+11,8 % de ingresos en 2025 frente al +3,4 % de los ingresos netos de DB, castigados por la caída del resultado de tesorería) [B7]. El descuento se justifica en parte por el tamaño (16.900 M frente a 54.600 M EUR de capitalización), la menor exposición a derivados y la mayor dependencia del contado europeo. La regresión no explica nada (R² 0,08): usamos la mediana.',
    },
    transacciones: {
      comentario: 'Las operaciones del sector se pagan caras (EV/EBITDA de 13 a 31 veces) porque son de datos y software con prima de control; no las ponderamos. Euronext es más comprador que objetivo: el pacto de accionistas de referencia (24 %), los acuerdos con el colegio de reguladores y la supervisión del presidente por el Ministerio de Finanzas neerlandés hacen inviable una OPA hostil [C3, C8]. La única operación transformadora con sentido es la fusión con Deutsche Börse que reabrió el consejero delegado en septiembre, sin conversaciones y con dos vetos previos de Bruselas [B4].',
    },
    sentimiento: {
      lectura: 'El debate es escaso y mayoritariamente favorable: los particulares franceses aplauden la gestión y especulan con la fusión con Deutsche Börse, y los autores de Seeking Alpha la ven barata frente a sus pares [E1, E4, E5]. No hay euforia visible ni capitulación. El foro apenas recoge dos riesgos del informe: la sucesión del consejero delegado y la dependencia de un ciclo de volúmenes récord. Tampoco contradice al consenso de analistas (sobreponderar, objetivo medio un 1 % por encima del precio). No aporta información para la decisión más allá de confirmar que la tesis de la consolidación europea ya está en el precio.',
    },
  },
  dcf_justificacion: {
    crecimiento: 'El 2026 queda casi cerrado con el primer semestre (+15,8 % de ingresos publicados sobre el 1S25): proyectamos +13,3 % (2.061 M), por debajo del consenso (2.082 M), porque el segundo semestre de 2025 ya llevaba Admincontrol [A1, A2, D2]. Después, 6 % en 2027-2028, en línea con el consenso (+5,9 % y +6,1 %) y por encima del objetivo del plan (>5 %), y bajada gradual al 3,5 % en 2032. El orgánico histórico es del 9,5 % en 2025 con volatilidad alta; suponemos que los volúmenes de contado se normalizan [A1, D11].',
    margenes: 'Margen EBITDA publicado del 62,6 % en 2026 (64,8 % en el primer semestre y 60,2 % implícito en el segundo, con la guía de costes de 770 M), 63,0 % en 2027 y 63,5 % estable desde 2029. El ajustado del 2T26 fue del 66,1 % y el de 2025 del 62,7 %: suponemos que parte del apalancamiento operativo se gasta en los proyectos del plan y en la integración de Athex [A2, D11].',
    inversion: 'Amortización del 6,0 % de los ingresos, sin la de intangibles de compras (≈ 95 M al año, que no es caja ni genera ahorro fiscal real), y capex del 6,5 % (software y equipos del 4-6 % según el plan más las altas de derechos de uso), del 6,3 % en el estado estacionario [A10]. Circulante del −16 % de los ingresos, como en 2025: cobros por adelantado y pagos pendientes superan a los clientes.',
    wacc: 'Tasa libre del 3,53 %, el Bund a 10 años del 12-oct-2026 (Bundesbank) [D6]. Beta de 0,85: la mensual a 5 años frente al CAC 40 es 0,72 y la ajustada 0,81; la subimos hacia la de las bolsas cotizadas (≈ 0,9) porque el CAC 40 infravalora la sensibilidad de los volúmenes al mercado [D1]. Prima de mercado del 5,5 %, sin prima adicional. Coste de la deuda del 3,5 % (bonos del 1,5 % al 4 %) y 15 % de deuda. WACC del 7,36 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: inflación del euro del 2 % más medio punto de crecimiento real, por debajo de la tasa libre menos medio punto (3,03 %). El valor terminal pesa el 75 % del DCF. El múltiplo de salida de referencia (15 veces el EBITDA) está en la mediana de los comparables.',
  },
  puente_comentarios: {
    '2026e': 'Volumen de contado y renta fija (+22,7 % y +9,7 % de volumen medio en el 2T26) y precios estables; Admincontrol y Athex aportan unos 7 puntos de perímetro [A2].',
    '2027e': 'Normalización de volúmenes; custodia y liquidación de París, Ámsterdam y Bruselas en Euronext Securities desde septiembre de 2026, repos y futuros de electricidad [A2].',
    '2028e': 'Crecimiento orgánico del plan: datos, índices, ETF y software; precios ligados a la inflación.',
    '2029e': 'Volumen al ritmo del mercado de capitales europeo y precios con la inflación.',
    '2030e': 'Convergencia hacia el crecimiento nominal de la economía europea.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El negocio crece sin capital: la reinversión acumulada de la proyección es negativa (−72 M) porque el circulante es negativo y el capex apenas supera la amortización, así que el motor no puede hacer la prueba de reinversión y la hacemos a mano con el poder de precios y la cuota. El crecimiento medio proyectado (6,2 %) queda por debajo del orgánico de 2025 (9,5 %) y del de los dos primeros trimestres de 2026 (7,6 % y 9,9 %) [A1, A2, A3]; la captura por operación de contado se mantiene en 0,50-0,51 pb y la cuota en sus mercados en el 66 % [A2]. El 58 % de los ingresos no depende del volumen y crece a doble dígito. La cuota europea del 29 % no tiene que subir para cumplir la proyección.',
  dcf_lectura: 'El DCF da 185,12 EUR por acción, un 11,0 % por encima del precio, con el valor terminal en el 75 % del total. El DCF inverso dice que el precio de 166,80 EUR descuenta un crecimiento del 3,3 % anual en 2027-2032 frente al 5,0 % de nuestro caso base, o un margen EBITDA del 58,4 % frente al 63,5 %, o una rentabilidad del 7,8 % frente a nuestro WACC del 7,36 %. Es una expectativa moderada para una empresa que crece de forma orgánica entre el 7 % y el 10 % y que ha mejorado su margen cada año desde 2023; no es exigente. Con la prima implícita del mercado (4,2 %), el DCF sube a 235,12 EUR: la diferencia entre las dos cifras es casi toda tasa de descuento, no flujos. La sensibilidad es alta: medio punto de WACC o de crecimiento terminal mueve el valor entre 153,24 y 233,40 EUR.',
  narrativas: {
    Bajista: 'Los volúmenes de contado vuelven a los niveles de 2022-2023 (en 2022 los ingresos apenas crecieron), la cinta consolidada europea abarata los datos y la integración de la liquidación cuesta más de lo previsto: crecimiento 2,5 puntos menor y margen 2 puntos más bajo, con un WACC medio punto mayor.',
    Base: 'Volúmenes normalizados, crecimiento del 6 % en 2027-2028 y margen EBITDA estable en el 63-63,5 %, en línea con el consenso y con el plan a 2027.',
    Alcista: 'La integración europea de la post-contratación y los nuevos productos (repos, electricidad, ETF) sostienen un crecimiento 1,5 puntos mayor y el apalancamiento operativo sube el margen un punto, hacia el 66 % ajustado del 2T26.',
  },
  escenarios_comentario: 'La asimetría del DCF es favorable pero corta: el alcista gana un 23,9 % y el bajista pierde un 18,5 % (1,29 veces). Pondera un valor de 182,06 EUR con los pesos de la síntesis. La asimetría a 12 meses es peor (0,50): en el bajista el mercado volvería a pagar el mínimo de cinco años (14,0 veces), como en 2023, y la acción caería a 103,18 EUR. Ese es el riesgo de comprar en máximos: no el negocio, sino el múltiplo.',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 7.37, multiplo: null, precio: null, justificacion: 'Ingresos de 2.208 M en 2028 (2,5 puntos menos de crecimiento en 2027-2028) y margen EBITDA del 61,3 %: EBITDA de 1.353 M, menos 133 M de amortización propia y 95 M de intangibles de compras, más 10 M de resultado financiero neto (dividendos de Euroclear menos intereses), 26,5 % de impuestos y 70 M de minoritarios, entre 103,8 M de acciones diluidas.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 8.08, multiplo: null, precio: null, justificacion: 'Ingresos de 2.315 M y margen del 63,3 % (EBITDA de 1.466 M), menos 139 M de amortización y 95 M de intangibles de compras, más 10 M financieros, 26,5 % de impuestos y 74 M de minoritarios: 839 M entre 103,8 M de acciones diluidas (incluye el convertible), sin recompras no anunciadas. La fórmula da 6,29 EUR en 2025, igual que el publicado.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 8.50, multiplo: null, precio: null, justificacion: 'Ingresos de 2.381 M (1,5 puntos más de crecimiento) y margen del 64,3 % (EBITDA de 1.531 M); mismos costes financieros, impuestos y acciones y 76 M de minoritarios.' },
  ],
  per_actual: 22.1,
  per_excluidos: 'Ninguno. Historia adelantada: cierre de cada año entre el BPA diluido publicado del año siguiente (2020: 82,30/4,29 = 19,2; 2021: 91,25/4,10 = 22,3; 2022: 69,16/4,83 = 14,3; 2023: 78,65/5,63 = 14,0; 2024: 108,30/6,29 = 17,2; 2025: 128,00 entre nuestro BPA de 2026 de 7,04 = 18,2). Mediana de cinco años (2021-2025) 17,2 veces, mínimo 14,0, media de seis años 17,5. Precios de Yahoo ajustados por la ampliación con derechos de 2021, como el BPA de 2020.',
  diferencia_consenso: 'Nuestro BPA de 2028 (8,08 EUR) queda un 8,8 % por debajo del consenso (8,86) y el de 2027 (7,54) un 7,9 % por debajo (8,19) [D2]. La diferencia no está en las ventas (2.315 M frente a 2.340 M en 2028) ni en el EBITDA (1.466 M frente a 1.503 M ajustado), sino debajo: restamos la amortización de intangibles de compras (≈ 95 M) y 74 M de minoritarios, no suponemos recompras sin anunciar y usamos las acciones diluidas con el convertible. El consenso prevé que la deuda neta baje a 243 M en 2028, lo que deja margen para recompras que subirían el BPA un 3-5 %. Nuestro precio base (157,56 EUR) queda un 6,4 % por debajo del objetivo medio de los analistas (168,41).',
  media_12m: 153.21,
  objetivo_comentario: 'El valor intrínseco (182,06 EUR) queda un 18 % por encima del objetivo a 12 meses (154,30 EUR). La distancia la explica el múltiplo: el DCF descuenta flujos al 7,36 % y la regla a 12 meses supone que el PER adelantado, hoy de 22,1 veces, recorre la mitad del camino hacia su mediana de cinco años (17,2). Para cerrar la distancia haría falta que el mercado aceptara de forma permanente un múltiplo superior al histórico: la diversificación del negocio lo justifica en parte, pero la historia de la acción no. La tesis de valor es a varios años; a 12 meses, el precio ya recoge el buen momento.',
  valoracion_comentario: 'Pesamos el DCF (40 %) y los escenarios (40 %) porque el negocio es estable y bien documentado, y los comparables (20 %) porque Euronext cotiza con descuento frente a ellos. Las transacciones no cuentan: son de datos y software con prima de control. Los métodos dan un rango coherente: PER de los comparables de 179,77 a 194,42 EUR, EV/EBITDA de 163,39 a 200,47, DCF de 153,24 a 233,40 según WACC y crecimiento. La síntesis da 182,06 EUR, un 9,1 % sobre el precio. En el puente, los minoritarios (MTS, Nord Pool, Athex) van a un valor estimado de mercado de 900 M (unos 65 M de beneficio anual por 14 veces) y no a su valor contable de 189 M; las participaciones en Euroclear y Sicovam, a su valor razonable (454 M); y la caja en tránsito de Nord Pool (228 M) se resta porque no es libre [A2].',
  catalizadores: {
    items: [
      { fecha: '2026-11-05', evento: 'Resultados del 3T26', efecto: 'Primer trimestre con la liquidación de París, Ámsterdam y Bruselas en Euronext Securities y comparativa exigente en volúmenes', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026, guía de costes de 2027 y dividendo', efecto: 'Dividendo del 50 % del beneficio y posible recompra si la deuda neta sigue en 1,3 veces', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Mayo de 2027', evento: 'Relevo del consejero delegado (junta de 2027)', efecto: 'Nombre del sucesor y señal sobre la estrategia de compras y la fusión con Deutsche Börse', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Junio de 2027', evento: 'Migración de Euronext Athens a Optiq', efecto: 'Paso clave para las sinergias de 12 M de Athex', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Octubre de 2027', evento: 'Liquidación en T+1 en la UE', efecto: 'Inversión y riesgo operativo en los depositarios', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2026-2027', evento: 'Paquete de integración y supervisión de mercados de la Comisión Europea', efecto: 'Puede favorecer la consolidación o imponer más competencia en post-contratación', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Vuelta de los volúmenes de contado y derivados a niveles normales', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−18,5 % (escenario bajista); −38 % a 12 meses si el PER vuelve al mínimo de cinco años', mitigante: 'El 58 % de los ingresos no depende del volumen y cubre el 170 % de los costes', senal: 'Volumen medio diario de contado por debajo de 12.000 M EUR' },
      { riesgo: 'Compresión del múltiplo desde máximos', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % si el PER adelantado baja de 22,1 a 17,2 veces (mediana)', mitigante: 'Descuento frente a los comparables (20,8 frente a 23,4 veces)', senal: 'Rotación del mercado fuera de financieras' },
      { riesgo: 'Sucesión del consejero delegado en mayo de 2027', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Equipo con experiencia y director financiero como candidato interno', senal: 'Retraso en el anuncio del sucesor o un candidato impuesto por los Estados accionistas' },
      { riesgo: 'Regulación europea: cinta consolidada y presión sobre tarifas de datos y post-contratación', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −8 % (datos son el 14 % de los ingresos)', mitigante: 'La integración europea también abre mercado a Euronext Securities', senal: 'Texto final de MiFIR sobre precios de datos' },
      { riesgo: 'Fallo operativo de la cámara o de un depositario (nuevas migraciones, T+1)', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Historial de migraciones sin incidentes (Optiq, Euronext Clearing)', senal: 'Incidentes en la liquidación de París tras septiembre de 2026' },
      { riesgo: 'Compra cara o fusión con Deutsche Börse que destruya valor', tipo: 'Asignación de capital', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 a −15 %', mitigante: 'Política de mantener al menos BBB y historial de integración', senal: 'Anuncio de una compra por encima de 20 veces el EBITDA' },
      { riesgo: 'La IA se come parte del negocio', tipo: 'Tecnológico', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−3 a −5 %', mitigante: 'Cotización, compensación y custodia son infraestructura regulada con licencia; la IA y la negociación algorítmica tienden a aumentar los volúmenes', senal: 'Caída de los ingresos de datos avanzados (72,3 M en el 2T26, +11 %) o de los usuarios minoristas de datos' },
      { riesgo: 'Bajada de tipos que reduzca el resultado de tesorería', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Solo el 4 % de los ingresos, frente al 14 % de Deutsche Börse', senal: 'Resultado de tesorería por debajo de 15 M al trimestre' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Lo más probable es que no haya fallado el negocio sino el precio pagado. En 2027 la volatilidad se apagó, el volumen de contado volvió a los niveles de 2023 y los ingresos ligados al volumen cayeron un 15 %; el crecimiento total bajó al 2-3 % y el margen al 60 %. El mercado, que en 2026 pagaba 22 veces el beneficio adelantado, volvió a pagar las 14-15 veces de 2022-2023. A la vez, el relevo del consejero delegado trajo un año de dudas: los Estados accionistas condicionaron la elección, el nuevo equipo frenó las compras o se lanzó a una fusión con Deutsche Börse que Bruselas tardó dos años en revisar. La revisión de MiFIR recortó los precios de los datos. Lo habrían anticipado el volumen medio diario de contado por debajo de 12.000 M, un margen ajustado trimestral por debajo del 60 % y la falta de un sucesor nombrado antes de la junta de 2027.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Volúmenes', pregunta: '¿Qué parte del crecimiento orgánico de 2026 (7,6 % y 9,9 % en el 1T y el 2T) es volatilidad y cuál es estructural (ETF, minoristas, nuevos productos)?', por_que: 'Decide si el 6 % de 2027-2028 es prudente o exigente.' },
      { tema: 'Sucesión', pregunta: '¿Cuándo y cómo se elegirá al sucesor del consejero delegado y qué papel tienen los accionistas de referencia?', por_que: 'Riesgo de gobierno con fecha (mayo de 2027).' },
      { tema: 'Fusión', pregunta: '¿Qué condiciones haría falta para una fusión con Deutsche Börse y qué remedios aceptaría Bruselas?', por_que: 'Catalizador o destrucción de valor según el precio y los remedios.' },
      { tema: 'Post-contratación', pregunta: '¿Cuántos ingresos adicionales espera la empresa de la liquidación de París, Ámsterdam y Bruselas en Euronext Securities y con qué calendario?', por_que: 'Es la principal palanca de crecimiento no ligada al volumen del plan.' },
      { tema: 'Capital', pregunta: '¿Habrá recompra en 2027 con la deuda neta en 1,3 veces el EBITDA?', por_que: 'Explica casi toda la diferencia entre nuestro BPA y el del consenso.' },
      { tema: 'Datos', pregunta: '¿Cuánto de los ingresos de datos está expuesto a la cinta consolidada de MiFIR?', por_que: 'Riesgo regulatorio sobre un negocio de margen alto.' },
      { tema: 'Remuneración', pregunta: '¿Qué cambió en la política de remuneración tras el rechazo del informe de 2024 (60 % en contra)?', por_que: 'Indicador del alineamiento con el minoritario.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 154,30 EUR, un 5,6 % por debajo del precio de 166,80 EUR con el dividendo (ponderada); en el caso base, −3,6 %. El valor intrínseco es de 182,06 EUR (+9,1 %) y el objetivo medio de los analistas, de 168,41. La razón: Euronext es un negocio excelente que cotiza en máximos, a 22,1 veces nuestro beneficio de 2027 frente a una mediana histórica de 17,2 veces, y la regla a 12 meses supone que el múltiplo devuelve parte de esa prima. La convicción es baja porque las reglas discrepan (Mantener con nuestro WACC, Comprar con la prima del mercado); subiría con una caída del precio por debajo de 136,94 EUR o con un 3T26 (5-nov) que confirme crecimiento orgánico de doble dígito sin volatilidad extraordinaria.

**El negocio.** Euronext controla el 29 % de la negociación europea de acciones, ocho bolsas, una cámara y cinco depositarios [B1]. El 58 % de los ingresos no depende del volumen y cubre el 170 % de los costes; el margen EBITDA publicado es del 62,6 % y el ROIC del 10,9 % frente a un WACC del 7,36 % (+3,5 puntos), lastrado por el fondo de comercio de Borsa Italiana. Veredicto de calidad: **Sí**, con foso amplio. La sostenibilidad del crecimiento también es **Sí**: el 6,2 % medio proyectado está por debajo del orgánico reciente y no necesita capital.

**Finanzas.** Los ingresos crecen un 11,8 % en 2025 y un 15,8 % en el primer semestre de 2026, con 9,9 % orgánico en el 2T26 [A1, A2]. La deuda neta ajustada es de 1.971 M (1,6 veces el EBITDA). Las cifras «ajustadas» de la empresa excluyen costes que se repiten; usamos las publicadas.

**Comparación con Deutsche Börse.** Euronext cotiza a 20,8 veces el beneficio de los próximos doce meses frente a 22,7 de Deutsche Börse, con más margen (62,6 % frente a 58,3 %) y más crecimiento (11,8 % frente a 3,4 % en 2025), pero menos ROIC (10,9 % frente a 14 %) [B7, D12]. Deutsche Börse depende más de los tipos (resultado de tesorería, 14 % de sus ingresos frente al 4 %) y Euronext más del volumen de contado. Las dos salen en Mantener a 12 meses; Euronext ofrece más calidad de crecimiento, Deutsche Börse más diversificación.

**Equipo y gobierno.** Equipo que cumple sus planes, pero el consejero delegado sale en mayo de 2027 sin sucesor elegido [C6] y la junta de 2025 rechazó el informe de remuneraciones (60,14 % en contra) [C5]. Los Estados francés, italiano y belga suman el 24 % en un pacto: no hay control, pero sí influencia en la sucesión [C3].

**Valoración.** El DCF da 185,12 EUR; el precio descuenta un crecimiento del 3,3 % anual frente al 5,0 % de nuestro base. Con la prima del mercado (4,2 %) el DCF sube a 235,12: la discrepancia es de tasa, no de flujos. Nuestro BPA de 2028 (8,08 EUR) queda un 8,8 % por debajo del consenso porque restamos la amortización de compras y no suponemos recompras.

**Riesgos y catalizadores.** El mayor riesgo es el múltiplo: en el bajista a 12 meses el PER vuelve a 14,0 veces y la acción cae a 103,18 EUR. Después, la normalización de volúmenes y la sucesión. El riesgo de que la IA se coma el negocio es bajo: la infraestructura regulada no se sustituye, y la negociación algorítmica suma volumen. Catalizadores: 3T26 el 5-nov-2026, resultados anuales en febrero y relevo en mayo de 2027. El foro, escaso y favorable, especula con la fusión con Deutsche Börse.

**Qué cambiaría la decisión.** Compraríamos por debajo de 136,94 EUR y venderíamos por encima de 174,98. Pasaríamos a Vender si el volumen medio diario de contado cae por debajo de 12.000 M EUR dos trimestres seguidos o si el margen EBITDA ajustado baja del 60 %.`,
    tesis: 'Euronext es la mayor infraestructura de mercados de Europa: 29 % de la negociación de acciones, 1.800 emisores, 8,1 billones de EUR en custodia y una cámara propia desde 2024 [B1]. Gana dinero con un margen EBITDA del 62,6 % y un 58 % de ingresos recurrentes que cubren de sobra los costes, de modo que el volumen extra cae casi entero al beneficio.\n\nEl precio de 166,80 EUR descuenta un crecimiento del 3,3 % anual en 2027-2032, por debajo de nuestro 5,0 % y del orgánico reciente; a 20,8 veces el beneficio de los próximos doce meses cotiza con descuento frente a sus comparables (23,4 veces) pero con prima frente a su historia (24,2 veces de PER de los últimos doce meses frente a una media de 19,5).\n\nPara invertir hay que creer que el múltiplo de 2026 es el nuevo normal, que los volúmenes récord no se dan la vuelta y que el relevo de 2027 no cambia la estrategia. El valor a largo plazo existe (182,06 EUR), pero a 12 meses el mercado ya paga el buen momento.',
    vision_diferencial: {
      mercado_descuenta: 'Que el ciclo de volúmenes altos y la integración europea sostienen crecimientos de doble dígito, con el PER adelantado en 22 veces y un objetivo medio de los analistas (168,41 EUR) igual al precio.',
      nuestra_vision: 'Compartimos la calidad del negocio y vemos un valor intrínseco algo superior (182,06 EUR), pero esperamos que el múltiplo devuelva parte de la prima histórica y que el beneficio de 2028 sea un 8,8 % menor que el del consenso.',
      por_que: 'Los últimos tres años de revalorización (34,7 % anual) vienen tanto del múltiplo como del beneficio; en 2022-2023 la misma empresa cotizó a 14 veces. No tenemos una visión distinta del negocio; sí del precio a pagar.',
    },
    a_favor: [
      '**Ingresos recurrentes**: el 58 % no depende del volumen y cubre el 170 % de los costes.',
      '**Margen y apalancamiento operativo**: EBITDA ajustado del 66,1 % en el 2T26 con costes al +9,5 %.',
      '**Crecimiento orgánico**: 9,5 % en 2025 y 9,9 % en el 2T26.',
      '**Descuento frente a los comparables**: 20,8 veces el beneficio frente a 23,4 de mediana y 22,7 de Deutsche Börse.',
      '**Palancas europeas**: liquidación de tres mercados en Euronext Securities desde septiembre de 2026.',
    ],
    en_contra: [
      '**Precio en máximos**: PER adelantado de 22,1 veces frente a una mediana de 17,2.',
      '**Asimetría a 12 meses desfavorable**: bajista −36,2 % frente a alcista +21,2 % (0,50 veces).',
      '**Dependencia del ciclo**: contado y derivados son el 23 % de los ingresos y crecen al 25 %.',
      '**Sucesión sin resolver**: el consejero delegado sale en mayo de 2027.',
      '**ROIC moderado**: 10,9 % por el fondo de comercio de las compras.',
    ],
    que_vigilar: 'La tesis depende de que el crecimiento orgánico se mantenga por encima del 6 % cuando la volatilidad se normalice. La señal de que no se cumple sería un volumen medio diario de contado por debajo de 12.000 M EUR junto con un crecimiento de los ingresos no ligados al volumen por debajo del 6 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 136,94 EUR: pasaríamos a Comprar.',
      'Precio por encima de 174,98 EUR: pasaríamos a Vender o reducir.',
      'Si el margen EBITDA ajustado de un trimestre baja del 60 %, revisaríamos el caso base a la baja.',
      'Si el sucesor del consejero delegado no está nombrado en la junta de mayo de 2027, bajaríamos la convicción.',
    ],
    kpis_seguimiento: [
      { kpi: 'Volumen medio diario de contado', nivel_actual: '16.698 M EUR (2T26)', umbral_alerta: '< 12.000 M EUR', por_que: 'Motor del 20 % de los ingresos' },
      { kpi: 'Crecimiento orgánico trimestral', nivel_actual: '+9,9 % (2T26)', umbral_alerta: '< 5 %', por_que: 'Base del 6 % proyectado' },
      { kpi: 'Margen EBITDA ajustado', nivel_actual: '66,1 % (2T26)', umbral_alerta: '< 60 %', por_que: 'Apalancamiento operativo' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '1,3 veces', umbral_alerta: '> 2,0 veces', por_que: 'Límite del plan y del rating' },
      { kpi: 'Cobertura de costes con ingresos no ligados al volumen', nivel_actual: '170 %', umbral_alerta: '< 150 %', por_que: 'Resistencia en un año de volúmenes bajos' },
    ],
  },
};
