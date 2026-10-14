// Textos del analista principal (Unilever, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de la empresa, la SEC y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, del 20-F y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Cuentas en EUR (NIIF); la acción cotiza en peniques (GBp) en Londres: precio de 4.718 p del cierre del 13-oct-2026 [D15] (la sesión del 14 no había cerrado), convertido con el tipo del BCE del 12-oct (0,84478 GBP por EUR: 0,0118374 EUR por penique) [D8]. Acciones con voto a 30-sep-2026 (2.154,3 M, sin autocartera) [D16]. 2021-2023 incluyen los helados y vienen de proveedores de datos; 2024-2025 son las operaciones continuadas reexpresadas [A1]. Las acciones se agruparon 8 por 9 el 9-dic-2025 [A17]. La proyección es la del perímetro actual, con la alimentación: la operación con McCormick (cierre previsto a mediados de 2027) se trata como neutral en valor, porque el accionista recibe el 55,1 % de la nueva McCormick y Unilever cobra 15.700 M USD y retiene el 9,9 % [A4]. Minoritarios del puente a valor estimado (beneficio de minoritarios × 20), no contable.',

  controles_explicados: [
    { control: 'Circulante del primer año', explicacion: 'Sin el desglose de existencias, clientes y proveedores (hueco), el circulante se proyecta en 0 % de las ventas para no generar caja ficticia; el real es negativo y crecer liberaría algo de caja: el DCF es prudente en eso.' },
    { control: 'Sección de núcleo con datos: bolsa', explicacion: 'Sin acceso a los históricos de cotización desde la nube; registrado en huecos.' },
  ],

  dcf_justificacion: {
    crecimiento: 'El ejercicio 2026e queda fijo en +1,0 %: dos trimestres publicados con +0,5 % de facturación (crecimiento subyacente del 4,8 % y ≈4 puntos de divisa en contra) [A5, A11]. Para 2027e-2029e proyectamos un 4,0-4,5 %, en la parte media-baja del rango plurianual del 4-6 % de la empresa [D1] y por encima del 3,5 % de 2025 [A1], porque las Power Brands (78 % de las ventas) crecen un 6 % [A5]. Bajamos al 3,0 % en 2032e, cerca del terminal.',
    margenes: 'Margen EBITDA del 22,3 % en 2026e subiendo al 23,0 % en 2029e. Es un margen entre el publicado (20,8 % en 2025: 10.487 M) y el subyacente (≈22,9 %): restamos ≈1 punto de ventas por la reestructuración, que en Unilever se repite cada año [A1, A8]. La subida de 70 pb en tres años es similar a la de 2025 (+60 pb de margen subyacente) [A1] y a la guía de «mejora modesta» [D3].',
    inversion: 'Amortización del 3,0 % de las ventas (≈1.450 M en 2025, estimación propia) e inversión del 3,2 %, algo más que la amortización por las altas de derechos de uso (arrendamientos ≈1.490 M) [A1, A16]. El circulante comercial de Unilever es negativo; lo dejamos en 0 % de las ventas para no generar caja que no podemos comprobar.',
    wacc: 'Tasa libre: Bund a 10 años del 3,53 % [P2], porque los flujos van en euros. Beta 0,75, entre la de Nestlé (0,65) y la de L\'Oréal (0,85) de los informes del mismo día [D11, D12]; prima de mercado del 5,5 % y 0,5 puntos adicionales por la exposición a emergentes (≈60 % de las ventas). Coste de la deuda antes de impuestos del 3,5 % (el medio contable ronda el 2 %, pero la nueva deuda cuesta más) y 18 % de deuda a valor de mercado. WACC del 7,16 %.',
    terminal: 'Gordon con un 2,5 % de crecimiento: 2 % de inflación del euro y medio punto real por los emergentes, por debajo de la tasa libre menos medio punto (3,03 %). El valor terminal pesa un 76 % del valor, normal para un negocio maduro.',
  },
  puente_comentarios: {
    '2026e': 'Guía de ≈3 % de volumen y 4-5 % de crecimiento subyacente en el 2S26; la divisa resta ≈3,5 puntos (1S26: +0,5 % de facturación con +4,8 % subyacente) [A5].',
    '2027e': 'Volumen en línea con 2026 y precio moderado, como en el 1S26 (0,6 puntos) que la empresa espera subir en el 2S26 [A5].',
    '2028e': 'Precio del 2 %, igual que en 2025 [A1].',
    '2029e': 'Igual que 2028e.',
    '2030e': 'Volumen del 2 %, el de 2025 (1,5 %) más la mezcla hacia belleza y bienestar.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (3,5 % de media) no necesita capital: la reinversión es de ≈1 % del beneficio operativo después de impuestos (inversión apenas por encima de la amortización y circulante negativo), así que el motor no hace la prueba de financiación; la hacemos a mano. El crecimiento sale de volumen y precio de marcas ya establecidas, con el gasto publicitario dentro del margen. Unilever creció un 3,5 % en 2025 y un 4,8 % en el 1S26 con un ROIC subyacente del 16,2 % [A7], y su precio aportó 2,0 puntos en 2025 [A1]: la proyección está dentro de lo que ya hace. La cuota no se puede medir (hueco), pero un 4 % anual es el crecimiento del mercado de belleza y cuidado personal (≈4,3 % previsto) [B6].',
  dcf_lectura: 'El DCF da 65,96 EUR por acción, un 18,1 % sobre el precio (55,85 EUR, 4.718 p), con un WACC del 7,16 % y un valor terminal que pesa el 76 %. El DCF inverso dice que el precio descuenta un crecimiento del 1,4 % anual en 2027e-2032e (frente al 3,9 % de nuestro base) o un margen EBITDA del 20,6 % (frente al 23,0 %), y una rentabilidad implícita del 7,8 %. Es una exigencia baja: Unilever creció un 3,5 % subyacente en 2025 y un 4,8 % en el 1S26 [A1, A5], y su margen subyacente ya está en el 20,0-20,3 %. El mercado no paga por la mejora de volumen: castiga la incertidumbre de la reorganización (helados en 2025, alimentación en 2027) y la divisa de los emergentes, que se come el crecimiento en euros. Con una beta de 0,75, la diferencia entre la rentabilidad implícita (7,8 %) y el WACC (7,16 %) es pequeña: el valor depende sobre todo de que el crecimiento en euros vuelva al 4 %.',

  narrativas: {
    Bajista: 'El volumen se frena al bajar los precios de las materias primas y la marca blanca gana en Europa; la divisa sigue restando 3-4 puntos y el crecimiento en euros se queda en el 2-3 % con el margen un punto por debajo, como en 2023-24 tras las subidas de precio.',
    Base: 'Crecimiento subyacente del 4-5 % con ≈3 % de volumen, divisa neutral desde 2027 y mejora del margen de 70 pb hasta 2029; la operación con McCormick cierra a mediados de 2027 sin cambiar el valor.',
    Alcista: 'Las Power Brands sostienen un 6 % y belleza y bienestar gana peso: crecimiento en la parte alta del 4-6 % y margen subyacente hacia el 21-22 %, como prometerá el día del inversor de noviembre.',
  },
  escenarios_comentario: 'El bajista vale 50,44 EUR (−9,7 %) y el alcista 73,36 EUR (+31,4 %), con el base en 65,96 EUR (+18,1 %): la asimetría sobre el valor intrínseco es favorable. Pero a 12 meses la asimetría es menor (1,62), porque el múltiplo del base ya es el actual (16,5 veces) y el bajista lo baja a 14,0 veces.',
  suma_partes_comentario: 'No aplica: los cuatro grupos de negocio tienen márgenes parecidos y no publicamos su resultado (hueco). La alimentación sale en 2027 a un precio de mercado.',

  o12_just: {
    Bajista: 'Crecimiento 1,5 puntos menor en 2027-28 y margen un punto por debajo: ventas de 53.852 M y BPA subyacente de 3,32 EUR en 2028e.',
    Base: 'Ventas de 55.435 M en 2028e, margen operativo subyacente del 20,9 % (+90 pb sobre 2025), resultado financiero de −400 M, tipo del 25,7 % y minoritarios de ≈560 M sobre 2.154 M de acciones: BPA subyacente de 3,60 EUR (+5,3 % anual desde 3,08).',
    Alcista: 'Crecimiento un punto mayor y margen 0,7 puntos más: ventas de 56.505 M y BPA de 3,80 EUR.',
  },
  o12_dif: 'El consenso de BPA de 2026 era ≈3,04 EUR antes del 1S26 [D6]; no tenemos el de 2028e. Nuestro BPA de 2028e (3,60 EUR) supone un 5,3 % anual desde los 3,08 EUR de 2025, la mitad que el +9,5 % a tipo constante de 2025, por la divisa. El objetivo medio de los analistas (61,90 EUR, 5.229 p) está un 4 % por encima de nuestro objetivo ponderado (59,09 EUR) y dentro de nuestro rango (46,48-71,06 EUR): la diferencia es de múltiplo, no de beneficio.',
  o12_comentario: 'Nuestro valor intrínseco (62,72 EUR de la síntesis) queda un 6 % por encima del objetivo a 12 meses (59,09 EUR). La distancia es pequeña: para cerrarla basta que el mercado pague por Unilever su PER mediano de cinco años (17,9 veces) en lugar del actual (16,5), algo que puede pasar si el día del inversor del 4-nov-2026 fija objetivos creíbles para la empresa sin alimentación y el 3T26 (28-oct) confirma el volumen.',
  valoracion_comentario: 'El DCF pesa el 50 % porque Unilever es un negocio estable con flujos previsibles; los comparables, el 25 %, con poco peso por estar incompletos (siete empresas, solo PER) y mezclar alimentación y belleza; los escenarios, el 25 %. Las transacciones no pesan: la única de referencia es la propia venta de la alimentación, sin múltiplo de EBITDA publicado. La síntesis da 62,72 EUR (+12,3 %). Los comparables por PER dan entre 44,08 y 58,98 EUR, por debajo del DCF: el mercado valora hoy el consumo básico con PER de 17-19 veces, y Unilever cotiza a 18,4 veces el BPA publicado de los próximos 12 meses.',

  secciones: {
    comparables: {
      comentario: 'Unilever cotiza a 18,4 veces el BPA publicado de los próximos 12 meses (≈16,5 veces nuestro BPA subyacente de 2027e), en línea con la mediana de los comparables (18,1 veces) [D11, D12]. L\'Oréal (26,2 veces) tiene prima por crecimiento y belleza pura; Kraft Heinz y General Mills (11,6-11,8 veces), descuento por alimentación sin crecimiento. Si Unilever se queda en belleza, cuidado personal y hogar, su múltiplo natural está entre Beiersdorf (19,6) y L\'Oréal, no en la alimentación: es el argumento alcista de la separación. Usaríamos 18 veces para el conjunto.',
    },
    catalizadores: {
      items: [
        { fecha: '28-oct-2026', evento: 'Ventas del 3T26', efecto: 'Confirmación del volumen (≈3 %) y del precio en el 2S26 (guía del 4-5 %)', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '4-nov-2026', evento: 'Día del inversor (Capital Markets Day)', efecto: 'Objetivos de la empresa sin alimentación: crecimiento, margen y recompras', probabilidad: 'Alta', sentido: '+' },
        { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Margen subyacente frente al 20,0 % de 2025 y deuda neta frente a ≈2 veces', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '1S27', evento: 'Junta de McCormick y aprobaciones de competencia', efecto: 'Riesgo de retraso o cambio de condiciones de la operación', probabilidad: 'Media', sentido: '+/−' },
        { fecha: 'Mediados de 2027', evento: 'Cierre de la operación con McCormick', efecto: 'Cobro de 15.700 M USD, reparto del 55,1 % de la nueva McCormick y recompras', probabilidad: 'Media', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Divisas emergentes (India, Indonesia, Brasil, Turquía, Argentina) frente al euro', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % (escenario bajista: −9,7 %)', mitigante: 'Precio local para compensar la inflación', senal: 'Diferencia entre crecimiento subyacente y facturación mayor de 4 puntos [A1]' },
        { riesgo: 'Ejecución y distracción por la separación de la alimentación', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Equipo dedicado y McCormick asume la integración', senal: 'Retraso del cierre más allá de mediados de 2027 o volumen por debajo del 2 %' },
        { riesgo: 'Vuelta del volumen a niveles de 2025 (1,5 %) al subir precios en el 2S26', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Power Brands con inversión publicitaria al alza', senal: 'Volumen del 3T26 por debajo del 2 %' },
        { riesgo: 'Marca blanca y marcas digitales en Europa y EE. UU.', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 %', mitigante: 'Peso de emergentes y de belleza de prestigio', senal: 'Europa con volumen negativo dos trimestres seguidos' },
        { riesgo: 'Deuda al alza por recompras (2,3 veces el EBITDA en junio)', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Efectivo de McCormick; la empresa apunta a ≈2 veces', senal: 'Deuda neta sobre EBITDA subyacente por encima de 2,5 veces [A5]' },
        { riesgo: 'Gobierno: decisiones de cartera impulsadas por un activista sin voto de la junta', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Apoyo del 93-99 % a los consejeros en la junta de 2026 [C5]', senal: 'Nueva venta o fusión sin votación' },
      ],
      premortem: 'Octubre de 2029: la acción ha perdido un 40 %. La operación con McCormick se retrasó hasta 2028 por las autoridades de competencia y el mercado castigó la «Unilever restante» con un múltiplo de 14 veces mientras la nueva McCormick cotizaba con descuento por su deuda. Entretanto, el volumen volvió al 1-2 % en cuanto la empresa subió precios en el 2S26 para compensar la divisa, y el margen dejó de subir porque hubo que reinvertir en publicidad para defender cuota frente a la marca blanca en Europa. La rupia, la lira y el peso siguieron restando 4 puntos al año, de modo que el BPA en euros se quedó plano en ≈3,1 EUR durante tres años. Las señales que lo habrían anticipado: un volumen del 3T26 por debajo del 2 %, una guía de 2027 sin mejora de margen y la diferencia entre crecimiento subyacente y facturación por encima de 4 puntos.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Perímetro', pregunta: '¿Qué ventas y margen tendrá la Unilever sin alimentación y qué objetivos dará el día del inversor del 4-nov?', por_que: 'Decide el múltiplo de la empresa que queda' },
        { tema: 'Volumen y precio', pregunta: '¿Cuánto volumen se pierde al subir precios en el 2S26?', por_que: 'La tesis base supone ≈2,5 % de volumen con 1,5-2 % de precio' },
        { tema: 'McCormick', pregunta: '¿Qué EBITDA tiene el negocio de alimentación que se traspasa y a qué múltiplo se vendió?', por_que: 'La operación se trata como neutral en valor por falta de ese dato' },
        { tema: 'Divisa', pregunta: '¿Qué parte del efecto divisa se recupera con precio en los países de inflación alta?', por_que: 'La divisa restó ≈4 puntos en 2025 y en el 1S26' },
        { tema: 'Reestructuración', pregunta: '¿Cuándo dejan de existir los ≈1.000 M anuales de costes fuera del resultado subyacente?', por_que: 'Separa el margen publicado del subyacente' },
        { tema: 'Recompras', pregunta: '¿Se mantienen los 6.000 M de recompras si se retrasa el cobro de McCormick?', por_que: 'La deuda ya está en 2,3 veces el EBITDA' },
      ],
      confianza: 'Media',
    },
  },

  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: '**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 59,09 EUR (4.992 p), una rentabilidad ponderada del 9,1 % con el dividendo y del 9,7 % en el caso base, lejos del 15 % y del 12 % que pide una compra; el valor intrínseco es de 62,72 EUR (+12,3 %) y el objetivo medio de los analistas, 61,90 EUR, dentro de nuestro rango (46,48-71,06 EUR). La razón: Unilever ha recuperado el volumen, pero el precio ya paga un PER de 16,5 veces nuestro BPA de 2027e y la divisa se come la mitad del crecimiento en euros. La convicción es media porque las dos reglas coinciden y la rentabilidad queda lejos de los umbrales; subiría si el 3T26 (28-oct) confirma un volumen de al menos un 3 % y el precio baja de 53,00 EUR.\n\n**El negocio.** Treinta marcas que son el 78 % de las ventas y crecen un 6 % [A5], un margen operativo subyacente del 20,0 % [A1] y un ROIC del 16,2 % [A7], unos 9 puntos sobre el WACC del 7,16 %. La calidad sostiene el crecimiento que proyectamos (veredicto «Sí»): un 3,5 % medio sin apenas inversión, con volumen y precio de marcas ya establecidas, lo mismo que hizo en 2025 y el 1S26.\n\n**Finanzas.** Ventas de 50.503 M EUR en 2025 (−3,8 % por la divisa, +3,5 % subyacente), caja libre de 5.921 M y deuda neta de 26.000 M en junio (2,3 veces el EBITDA subyacente) tras recomprar 1.500 M [A1, A5]. La reestructuración se repite cada año (≈1.000 M entre subyacente y publicado) y el DCF la descuenta.\n\n**Equipo y gobierno.** Equipo nuevo (Fernandez y Phatak, 2025) que ha cumplido y subido la guía [C4]. Resta algo la agenda activista: la operación de 44.800 M USD con McCormick no se votó y Terry Smith vendió su participación [C9, C6]; el voto en contra de la remuneración (27,7 % en 2025) volvió a niveles normales en 2026 [C8, C5].\n\n**Valoración.** El DCF da 65,96 EUR (+18,1 %) y el inverso dice que el precio solo descuenta un 1,4 % de crecimiento anual frente a nuestro 3,9 %: el mercado no paga la mejora. Pero a 12 meses manda el múltiplo: con la regla común, el base usa el PER actual (16,5 veces, por debajo de su mediana de cinco años de 17,9) sobre un BPA subyacente de 3,60 EUR en 2028e, y da 59,40 EUR. Tratamos la venta de la alimentación como neutral en valor: el accionista recibe el 55,1 % de la nueva McCormick y Unilever cobra 15.700 M USD [A4].\n\n**Riesgos y catalizadores.** La divisa de los emergentes (−10 % en el bajista) y la ejecución de la separación son los riesgos que más pesan. Catalizadores: 3T26 el 28-oct, día del inversor el 4-nov y cierre de la operación a mediados de 2027. Los foros se agriaron en primavera por la operación y mejoran desde el 1S26; no señalan un riesgo que el informe no recoja.\n\n**Qué cambiaría la decisión.** Compraríamos por debajo de 53,00 EUR (4.477 p) y venderíamos por encima de 67,73 EUR (5.722 p). Pasaríamos a Vender si el volumen del 3T26 baja del 1,5 % y la guía de 2027 no mejora el margen; a Comprar si el día del inversor fija un crecimiento del 5 % o más y un margen creciente para la empresa sin alimentación.',
    tesis: 'Unilever es el segundo grupo mundial de consumo envasado no alimentario, con 50.503 M EUR de ventas, un margen subyacente del 20,0 % y un ROIC del 16,2 % [A1, A7]. Tras escindir los helados y acordar la salida de la alimentación, queda un grupo de belleza, cuidado personal y hogar cuyas marcas líderes crecen un 6 % con volumen [A5].\n\nEl precio (55,85 EUR, 4.718 p) descuenta solo un 1,4 % de crecimiento anual, un PER de 16,5 veces nuestro BPA de 2027e, por debajo de su mediana de cinco años (17,9) y de la de los comparables (18,1) [E6].\n\nPara invertir hay que creer que el volumen aguanta cuando vuelvan las subidas de precio y que el mercado pagará por la Unilever sin alimentación un múltiplo de belleza y cuidado personal. El valor intrínseco está un 12,3 % por encima del precio, pero a 12 meses el múltiplo actual solo deja un 9,1 %: falta un catalizador, que puede ser el día del inversor de noviembre.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento del 1,4 % anual y un PER de 16,5 veces, castigando la incertidumbre de la reorganización y la divisa de los emergentes.',
      nuestra_vision: 'Un crecimiento en euros del 4 % desde 2027 y una mejora del margen de 70 pb: el valor intrínseco es de 62,72 EUR, pero a 12 meses el múltiplo no tiene por qué subir.',
      por_que: 'El volumen ha vuelto (4,2 % en el 1S26) y las Power Brands crecen un 6 % [A5]; la divisa resta, pero no para siempre. Coincidimos con el consenso en el objetivo (61,90 EUR): nuestra diferencia es de plazo, no de cifras.',
    },
    a_favor: [
      '**El volumen ha vuelto**: +4,2 % en el 1S26 frente a +1,5 % en 2025 [A5, A1].',
      '**Calidad**: ROIC del 16,2 %, unos 9 puntos sobre el WACC [A7].',
      '**Precio exigente solo en apariencia**: el DCF inverso descuenta un 1,4 % de crecimiento.',
      '**Retorno al accionista**: dividendo del ≈3,3 % y 6.000 M de recompras en 2026-2029 [A4].',
    ],
    en_contra: [
      '**La divisa**: la facturación cayó un 3,8 % en 2025 con un 3,5 % de crecimiento subyacente [A1].',
      '**Rentabilidad a 12 meses del 9,1 %**, por debajo del 15 % que pide una compra.',
      '**Incertidumbre de perímetro** hasta mediados de 2027 por la operación con McCormick [A4].',
      '**Reestructuración permanente**: ≈1.000 M al año fuera del resultado subyacente [A1, A8].',
    ],
    que_vigilar: 'La tesis depende de que el volumen se mantenga en el 2,5-3 % cuando la empresa vuelva a subir precios en el 2S26. La señal de que no se cumple: un volumen del 3T26 por debajo del 2 % o una guía de 2027 sin mejora de margen.',
    cambiaria_recomendacion: [
      'Precio por debajo de 53,00 EUR (4.477 p): pasaría los tres requisitos de compra',
      'Precio por encima de 67,73 EUR (5.722 p): Vender',
      'Volumen del 3T26 por debajo del 1,5 %: revisar a la baja el base',
      'Objetivos del día del inversor de crecimiento ≥5 % y margen creciente sin alimentación: revisar a Comprar',
    ],
    kpis_seguimiento: [
      { kpi: 'Volumen subyacente', nivel_actual: '4,2 % (1S26)', umbral_alerta: '< 2 %', por_que: 'Motor del crecimiento' },
      { kpi: 'Margen operativo subyacente', nivel_actual: '20,3 % (1S26)', umbral_alerta: '< 20,0 %', por_que: 'Base de la mejora de beneficio' },
      { kpi: 'Diferencia entre crecimiento subyacente y facturación', nivel_actual: '≈4,3 puntos (1S26)', umbral_alerta: '> 5 puntos', por_que: 'Efecto divisa' },
      { kpi: 'Deuda neta / EBITDA subyacente', nivel_actual: '2,3 veces (jun-26)', umbral_alerta: '> 2,5 veces', por_que: 'Holgura para las recompras' },
    ],
    confianza: 'Baja',
  },
};
