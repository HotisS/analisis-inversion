// Textos del analista (Monster Beverage, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
// Cifras de valoración: salida de motor/calcular-empresa.mjs del 21-oct-2026 (DCF, escenarios, regla a 12 meses).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio a 31 de diciembre. Último ejercicio real: 2025; último trimestre: 2T26 (6-ago-2026); el 3T26 sale hacia el 5-nov-2026. BPA y acciones en acciones de hoy, después del split 2:1 del 11-ago-2026 [A8] (y del de marzo de 2023 para 2016-2020). Precio: cierre del 20-oct-2026 (47,04 USD); la sesión del 21-oct estaba abierta (46,75 USD a las 16:38 UTC). Caja = efectivo + inversiones financieras a corto y largo. Sin ficha sectorial de bebidas energéticas (el encargo no permite escribir fuera de la carpeta): el perímetro del mercado sale de Ken Research y de los datos de Nielsen que publica Monster [B4, B2].',
  controles_explicados: [],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Monster nace de Hansen\'s, un negocio de zumos de Los Ángeles de los años treinta. Rodney Sacks y Hilton Schlosberg tomaron el control en 1990-1992 a través de Hansen Natural Corporation y llevaron la empresa de los refrescos naturales a la bebida energética [A1]. Monster Energy (2002) convirtió una marca pequeña en el número dos del mundo. En 2012 cambió el nombre a Monster Beverage y en 2015 cerró el acuerdo con Coca-Cola: le cambió sus marcas no energéticas por las energéticas de Coca-Cola, que entró en el capital y puso su red de embotelladores a distribuir Monster en todo el mundo [A1]. Después vinieron AFF (sabores, 2016), CANarchy (alcohol, 2022) y Bang (2023) [A1, A6].',
      hitos: [
        { anio: '1930s', hito: 'Hubert Hansen y sus hijos venden zumos frescos en Los Ángeles [A1].' },
        { anio: '1990-1992', hito: 'Sacks y Schlosberg entran en la empresa (1990) y Hansen Natural compra el negocio de refrescos y zumos Hansen\'s (1992) [A1, C1].' },
        { anio: '2002', hito: 'Lanzamiento de la bebida energética Monster Energy.' },
        { anio: '2012', hito: 'Hansen Natural pasa a llamarse Monster Beverage Corporation [A1].' },
        { anio: '2015', hito: 'Acuerdo con Coca-Cola: Monster compra sus marcas energéticas (NOS, Full Throttle, Burn, Mother…), le cede las no energéticas y Coca-Cola entra en el capital y en la distribución [A1].' },
        { anio: '2022', hito: 'Compra de CANarchy (329,5 M USD): entrada en el alcohol, que pierde dinero desde entonces [A6].' },
        { anio: '2023', hito: 'Compra de Bang Energy en concurso (363,4 M USD) y split 2:1 [A6].' },
        { anio: '2024', hito: 'Recompras de 3.806 M USD, financiadas en parte con un préstamo de 750 M devuelto en 2025 [A1].' },
        { anio: '2025-2026', hito: 'Schlosberg, consejero delegado único (jun-2025); ventas +23 % en el 1S26; split 2:1 en agosto de 2026 [C1, A3, A8].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Rentabilidad muy alta y estable: ROIC del 38,7 % en 2025 según el motor (NOPAT de 1.896 M USD sobre un capital invertido medio de 4.900 M, que es el patrimonio menos la caja y las inversiones), frente a un WACC del 9,0 %: ≈ +30 puntos [A1, A7]. Sin el fondo de comercio de las compras de 2015-2023, el 53,1 %. En 2021-2025 el ROIC osciló entre el 31 % (2022, aluminio caro) y el 40 % (2021). Un negocio de marca con fabricación y distribución externas: invierte ≈ 2 % de las ventas y cada dólar de capital nuevo rinde ≈ 35 % (ROIC incremental del motor: 34,5 %). El ROE (26,8 %) es menor que el ROIC porque la caja sin usar (≈ 4.200 M a junio de 2026) rinde ≈ 3 % [A2]. La reinversión es pequeña (≈ 10 % del NOPAT en la proyección): el crecimiento sale del precio y del volumen sin capital nuevo, no de reinvertir.',
      confianza: 'Alta',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Monster es la salud del consumidor (cafeína, azúcar, venta a menores, marketing dirigido a jóvenes), el envase (latas de aluminio: reciclaje y energía), el agua de los embotelladores y la relación con deportistas y eventos de riesgo [A1].',
      controversias: 'Demandas por muertes y lesiones atribuidas a la cafeína en el pasado (cerradas o sin efecto material), regulación creciente de la venta a menores (Reino Unido 2026, directrices de EE. UU.) y litigios con competidores (Bang, ganado por Monster antes de comprar la marca en concurso) [A1, B1]. El 10-K no recoge litigios abiertos materiales [A1].',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+17,5 %, fijo): el 1S26 creció un 23,3 % y julio un 14,3 % sin alcohol; el consenso espera +17,3 % [A3, A9, D2]. 2027e +10 % (consenso +9,6 % [D2]): se enfrentan bases altas y las subidas de precio de 2025-2026 dejan de sumar del todo. Después, del 9 % al 5 % en 2028e-2033e: la categoría crece al 7,5 % en el mundo (Ken Research [B4]) y Monster gana cuota fuera de EE. UU. (+34,6 % en el 2T26 [A9]) mientras en EE. UU. crece con la categoría (≈ 6-7 %) [B2].',
    margenes: 'Margen EBITDA del 30,6 % en 2026e (31,3 % en el 1S26; el 2S26 lleva más coste de aluminio por la prima Midwest y los aranceles [A9]) y del 31,0-31,5 % después, igual que 2025 sin deterioros (31,2 %) [A1]. No se supone mejora: el internacional tiene menos margen, las promociones suben (16 % de la facturación bruta) y el aluminio no baja; el alcohol sigue restando ≈ 1 punto. Incluye los pagos en acciones.',
    inversion: 'Inversión del 2,3 % de las ventas desde 2027e (1,6 % en 2025 y 2,9-3,5 % en 2023-2024 con la fábrica de Phoenix; guía de menos de 250 M hasta junio de 2027 [A2]) y amortización del 1,25 % (1,19 % en el 1S26). Circulante del 20 % de las ventas (21,8 % en 2025 según el motor). Sin compras nuevas.',
    wacc: 'Tasa libre del 5,12 % (bono del Tesoro a 10 años, 20-oct-2026 [D4]); beta de 0,70, la ajustada mensual a cinco años (0,69; la bruta es 0,53) [D1]; prima del 5,5 %; sin deuda. WACC del 8,97 %. Con la prima implícita del mercado (4,2 % [D5]) el coste de capital baja al 8,06 % y el DCF sube a 32,94 USD.',
    terminal: 'Crecimiento a perpetuidad del 3,0 % tras la etapa de transición: una marca global con mercados emergentes aún poco penetrados. El valor terminal pesa un 41 % con la etapa de transición.',
  },
  etapa2_justificacion: 'Diez años de transición (2034-2043) en que el crecimiento baja del 5 % al 3 % con el margen del 31,5 %: la bebida energética tiene recorrido de penetración fuera de EE. UU. (China, India, Brasil, África crecen al 20-80 % [A9]), la marca Monster gana cuota en EE. UU. con subidas de precio [B2] y el ROIC (38,7 %) es 30 puntos superior al WACC [P1]. Sin la etapa, el DCF baja de 28,05 a ≈ 25,9 USD.',
  puente_comentarios: {
    '2026e': 'Volumen del 13 % (cajas +13,3 % en 2025 y aceleración internacional en el 1S26), precio del 2,5 % (subidas del 4T25 y del 4T26 en EE. UU.) y 2 puntos de divisa favorable (+20,2 % frente al +17,9 % sin divisa en el 2T26) [A1, A3, A9].',
    '2027e': 'Volumen del 7 % (categoría +7 % en EE. UU. y doble dígito fuera), precio del 2,5 % y medio punto de divisa [B2].',
    '2028e': 'Volumen del 6,5 % y precio del 2,5 %, en línea con la previsión del 7,5 % del mercado más la cuota fuera de EE. UU. [B4].',
    '2029e': 'Volumen del 6 % y precio del 2,5 %.',
    '2030e': 'Volumen del 5,5 % y precio del 2,5 %: la cuota mundial sube del 15,0 % al 18,1 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (8,9 % anual en 2026e-2033e) está por debajo del histórico (10,6 % anual en 2021-2025) y, quitando 2026e, en la línea del mercado (7,5 % previsto [B4]) más la ganancia de cuota internacional que ya se ve (+34,6 % fuera de EE. UU. en el 2T26 [A9]). La cuota implícita pasa del 15,0 % al 18,1 % en 2030e (×1,2): exige seguir ganando fuera, no en EE. UU. No necesita capital: la reinversión es ≈ 10 % del NOPAT y el negocio es de activos ligeros (embotellan y distribuyen otros). El motor da también «Sí». Lo que podría romperlo es la competencia en EE. UU. (Alani Nu con PepsiCo) y la regulación, no la financiación.',
  dcf_lectura: 'El DCF da 28,05 USD por acción, un 40 % bajo el precio, con un WACC del 8,97 % y el valor terminal en el 41 %. El DCF inverso dice que el precio descuenta un crecimiento del 14,3 % anual en 2027e-2033e con nuestro margen, frente al 8,9 % de nuestro caso base y al 7,5 % del mercado: el precio pide crecer el doble que el mercado durante siete años más, cuando en 2021-2025 Monster creció un 10,6 % anual. La rentabilidad implícita en el precio es del 6,5 % anual, por debajo del coste de capital (9,0 %) y del que pide el mercado (8,1 %). Con la prima implícita del mercado (4,2 %) el DCF sube a 32,94 USD, todavía un 30 % bajo el precio.',
  narrativas: {
    Bajista: 'Alani Nu y Celsius, con la red de PepsiCo, y Ghost con Keurig, siguen quitando cuota a Monster en EE. UU.; la regulación (menores, SNAP, cafeína) frena la categoría; el aluminio y los aranceles comen 1,5 puntos de margen. Crecimiento 4 puntos menor y margen 1,5 puntos menor; WACC medio punto mayor.',
    Base: 'Ventas +17,5 % en 2026e y del 10 % al 5 % después, con el internacional como motor; margen EBITDA estable del 31-31,5 %; sin compras ni recompras nuevas.',
    Alcista: 'El internacional (China, India, Brasil) y la innovación (Ultra, Juice) mantienen el crecimiento de dos dígitos y el alcohol deja de perder: 2 puntos más de crecimiento y 0,8 más de margen.',
  },
  escenarios_comentario: 'La asimetría es desfavorable en el DCF: incluso el alcista (33,60 USD) queda un 29 % bajo el precio y el bajista (17,50) un 63 %. El precio solo encaja con un crecimiento del 14 % anual durante siete años o con un coste de capital mucho menor que el nuestro. A 12 meses, con la regla de múltiplos, el bajista vale 34,61 USD (−26 %) y el alcista 53,00 (+13 %).',
  casos_12m: {
    Bajista: 'Ventas +6 % en 2027e y +5 % en 2028e y margen EBITDA del 29,7 % (competencia en EE. UU., aluminio, regulación): BPA de 1,28 USD en 2028e (−11 % frente al base) y el PER vuelve a su mínimo de cinco años (27,1 veces, el de final de 2024, tras el frenazo de la categoría).',
    Base: 'Ventas +10 % en 2027e y +9 % en 2028e, margen EBITDA del 31,0-31,2 %, resultado financiero de 245 M por la caja acumulada, tipo del 23,5 % y 1.995 M de acciones sin recompras nuevas: BPA de 1,44 USD en 2028e (+11,6 % anual desde los 1,15 de 2026e).',
    Alcista: 'Dos puntos más de crecimiento y 0,8 más de margen por el internacional y el alcohol sin pérdidas: BPA de 1,52 USD; la regla no da más PER que el base porque la historia adelantada (mediana de 33,3 veces, media de 32,4) y los comparables (15,8) están por debajo del PER de hoy.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (1,15 USD) coincide con el consenso (1,15) y el de 2027e (1,30) queda un 0,8 % por debajo (1,31) [D2]: no discrepamos del negocio. El objetivo base (49,97 USD) está en el objetivo medio de los analistas (49,85) [D2].',
  objetivo_comentario: 'El objetivo a 12 meses (46,89 USD, ponderado) queda un 0,3 % bajo el precio y el valor intrínseco (26,77) un 43 %. El base (49,97 USD, +6,2 %) supone que el BPA crece un 11,6 % anual hasta 1,44 USD en 2028e y que el múltiplo baja de 36,3 a 34,8 veces (a mitad de camino hacia la mediana adelantada de cinco años, 33,3); el bajista (34,61) es el PER de final de 2024 (27,1 veces) con un BPA un 11 % menor; el alcista (53,00) no tiene más PER que el base. Con la regla v2 (historia al cierre, mediana de 37,4) la ponderada sería del +8,7 % y el base del +10,8 %: tampoco llega a Comprar (15 % y 12 %). Con el precio del 21-oct (46,75 USD) cambia menos de un punto.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %. El DCF es el método adecuado para un negocio estable, sin deuda y con flujo libre previsible, pero aquí choca con el mercado: Monster lleva veinte años cotizando por encima de cualquier DCF razonable porque ha crecido más de lo que nadie proyectaba. Los comparables pesan poco: las grandes de bebidas (15-26 veces) crecen la mitad. La regla a 12 meses, que manda en la recomendación, da Mantener: la ponderada es del −0,3 % y el base del +6,2 %, lejos del 15 % y 12 % que pide Comprar, y el valor intrínseco está muy por debajo del precio [P1].',
  catalizadores: {
    items: [
      { fecha: '2026-11-05', evento: 'Resultados del 3T26', efecto: 'Primer trimestre con el aluminio más caro; consenso de BPA de 0,30 USD y ventas de 2.492 M (+13 %)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11-30', evento: 'Salida de Rob Gehring (América) a Coca-Cola', efecto: 'Sucesión en el mercado principal', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2026-12-01', evento: 'Reunión con inversores en Nueva York', efecto: 'Posibles objetivos a medio plazo, internacional y uso de la caja', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-12-31', evento: 'Rodney Sacks deja de ser empleado (sigue de presidente)', efecto: 'Fin de la etapa de los fundadores en la gestión diaria', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Subidas de precio en EE. UU. (4T26) y EMEA', efecto: 'Defienden el margen frente al aluminio', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Uso de la caja (4.201 M): recompras grandes o compra', efecto: 'Una recompra de 3.000 M subiría el BPA ≈ 2-3 %', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Cierre o venta del negocio de alcohol', efecto: '+0,03-0,04 USD de BPA', probabilidad: 'Baja', sentido: '+' },
      { fecha: 'Continuo', evento: 'Regulación sanitaria (menores, SNAP, cafeína, impuestos al azúcar)', efecto: 'Frena la categoría en algunos mercados', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Múltiplo: 36,3 veces el BPA de 2027e frente a una mediana adelantada de cinco años de 33,3 y un mínimo de 27,1', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−25 % si el PER vuelve a 27', mitigante: 'BPA creciendo ≈ 12 % al año y caja neta del 5 % de la capitalización', senal: 'Crecimiento de ventas por debajo del 10 % en dos trimestres' },
      { riesgo: 'Competencia en EE. UU.: Alani Nu y Celsius en la red de PepsiCo, Ghost con Keurig, marcas blancas', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −15 %', mitigante: 'La marca Monster gana cuota (+1,1 puntos) y quien pierde es Red Bull [B2]', senal: 'Cuota de Monster Energy Company en conveniencia por debajo del 34 % (Nielsen)' },
      { riesgo: 'Aluminio y aranceles (prima Midwest)', tipo: 'Costes', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Subidas de precio en EE. UU. y EMEA; coberturas parciales [A9]', senal: 'Margen bruto por debajo del 54 %' },
      { riesgo: 'Regulación sanitaria (venta a menores, SNAP, cafeína, impuestos al azúcar, directrices alimentarias)', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Diversificación geográfica; versiones sin azúcar', senal: 'Prohibición de venta a menores en EE. UU. o en un gran mercado de la UE' },
      { riesgo: 'Dependencia de Coca-Cola (distribución, 20,9 % del capital, 25 % de las ventas a dos embotelladores)', tipo: 'Clientes', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−15 % si la red prioriza una marca propia', mitigante: 'Acuerdo de coordinación renovado en 2025 por cinco años; Coca-Cola gana con Monster [A1]', senal: 'Coca-Cola lanza o compra una energética que compita en su red' },
      { riesgo: 'Sucesión y equipo (fundador de 76 años sale de plantilla; el responsable de América se va a Coca-Cola)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Schlosberg (73 años) sigue de consejero delegado; banquillo con EMEA y estrategia', senal: 'Salidas adicionales de la cúpula' },
      { riesgo: 'Capital mal usado (alcohol, caja ociosa, una compra grande)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −4 %', mitigante: 'Las compras han sido pequeñas (< 400 M)', senal: 'Compra por encima de 2.000 M fuera de la bebida energética' },
      { riesgo: 'Riesgo de IA: bajo y poco directo (la IA no sustituye una lata de bebida; puede abaratar marketing y cadena de suministro a rivales pequeños)', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±1-2 % a 3-5 años', mitigante: 'La ventaja está en la marca y en la red de distribución física', senal: 'Marcas nuevas que ganen cuota solo con marketing digital barato' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 30 %. Los resultados no fueron malos (ventas +8 %), pero dejaron de ser excelentes: Alani Nu siguió ganando dos puntos al año en EE. UU. con la red de PepsiCo, el aluminio y las promociones restaron un punto y medio de margen, y una directriz federal pidió prohibir la venta a menores. El mercado dejó de pagar 36 veces por un crecimiento del 8 % y volvió al múltiplo de final de 2024 (27 veces). La caja siguió acumulándose sin uso.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±1-2 % a 3-5 años',
      comentario: 'El riesgo de IA para Monster es bajo y poco directo: vende un producto físico de consumo diario que ninguna IA sustituye, con una marca y una red de distribución en frío de Coca-Cola que no se replican con software. Los efectos posibles son de segundo orden: la IA abarata el marketing digital y el diseño de productos, lo que ayuda a marcas pequeñas a entrar (Alani Nu creció en redes sociales), y puede mejorar la previsión de demanda y la cadena de suministro de Monster (SAP S/4HANA desde 2028 [A9]). No cambia la tesis.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Caja', pregunta: '¿Qué piensan hacer con 4.200 M USD de caja que rinden ≈ 3 % (recompras, dividendo, compras), y por qué no se recompró nada en el 2T26?', por_que: 'Es ≈ 5 % de la capitalización; una recompra grande subiría el BPA y la ponderada.' },
      { tema: 'EE. UU.', pregunta: '¿Cómo responderá Monster a Alani Nu y a Celsius en la red de PepsiCo, y qué cuota espera en conveniencia?', por_que: 'Es el escenario bajista: EE. UU. es el 61 % de las ventas.' },
      { tema: 'Aluminio', pregunta: '¿Cuánto coste de aluminio y prima Midwest falta por entrar en el 2S26 y en 2027, y qué parte cubren las subidas de precio?', por_que: 'Cada punto de margen bruto son ≈ 0,03 USD de BPA.' },
      { tema: 'Alcohol', pregunta: '¿Hay un plazo para que el alcohol deje de perder dinero, o una fecha para venderlo o cerrarlo?', por_que: 'Ha restado ≈ 440 M de resultado en 2023-2025 entre pérdidas y deterioros.' },
      { tema: 'Coca-Cola', pregunta: '¿Qué pasa con la distribución si Coca-Cola lanza una energética propia o compra otra marca, y qué derechos tiene sobre Monster con el 20,9 %?', por_que: 'La red de Coca-Cola es la ventaja de distribución; Gehring se va a presidir Coca-Cola Norteamérica.' },
      { tema: 'Sucesión', pregunta: '¿Quién sustituye a Gehring en América y cuál es el plan de sucesión de Schlosberg?', por_que: 'Los fundadores han dirigido la empresa 36 años.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 46,89 USD (nuestro BPA de 2028e × el PER de la regla común), un −0,3 % de rentabilidad ponderada y un +6,2 % en el caso base, frente a un precio de 47,04 USD (cierre del 20-oct-2026; 46,75 en la sesión del 21-oct a las 16:38 UTC). El valor intrínseco (26,77 USD) queda un 43 % bajo el precio. Ninguna de las tres condiciones de Comprar se cumple [P1]. La convicción es media porque las dos reglas (frente a su coste de capital y frente a lo que pide el mercado) coinciden y el precio está lejos de los umbrales de Comprar y de Vender; cambiaría la convicción un crecimiento sostenido por encima del 15 % o una recompra grande con la caja (acercarían el objetivo a Comprar) o un trimestre con ventas por debajo del +10 % (acercaría la vuelta al PER de 27 veces y el precio a Vender).

**El negocio.** El número dos mundial de la bebida energética (≈ 15 % del mercado, detrás de Red Bull [B4]): diseña y vende latas de Monster, Reign, Bang y las marcas compradas a Coca-Cola, que la red de embotelladores de Coca-Cola produce y reparte en ≈ 158 países [A1]. Margen operativo del 29 %, inversión del 2 % de las ventas y ROIC del 38,7 %, ≈ 30 puntos sobre el WACC [P1].

**Finanzas.** Ventas de 8.294 M USD en 2025 (+10,7 %) y +23 % en el 1S26; BPA de 0,97 USD en 2025 y 0,58 en el 1S26 (acciones de hoy) [A1, A3]. Sin deuda y con 4.201 M de caja e inversiones a junio de 2026 [A2]. Sin dividendo; recompras irregulares (3.806 M en 2024, 104 M en 2025). El alcohol pierde dinero (−127 M en 2025) y ha costado ≈ 230 M de deterioros [A1].

**Equipo y gobierno.** Los fundadores (Sacks, presidente, y Schlosberg, consejero delegado) dirigen desde 1990 y tienen ≈ 15 %; Coca-Cola tiene el 20,9 % [C1]. 7 de 9 consejeros independientes. Debilidades: ventas de directivos por 36,2 M USD en 12 meses sin ninguna compra [C6], sucesión (Sacks sale de plantilla a final de 2026; el responsable de América se va a Coca-Cola [C5]) y un variable ligado al BPA, no a la rentabilidad.

**Valoración.** El DCF da 28,05 USD (−40 %) y el DCF inverso dice que el precio descuenta un 14,3 % de crecimiento anual en 2027e-2033e frente al 8,9 % de nuestro base y al 7,5 % del mercado. Con la prima del mercado (4,2 %) el DCF sube a 32,94. La regla a 12 meses lleva el PER de 36,3 a 34,8 veces y el bajista a 27,1 (final de 2024); con la v2 (historia al cierre) la ponderada sería del +8,7 %: tampoco Comprar. Cotiza al doble del PER de los comparables (15,8) [D2].

**Riesgos y catalizadores.** El mayor riesgo es el múltiplo: volver a 27 veces costaría un 25 %. Después, la competencia en EE. UU. (Alani Nu con PepsiCo), el aluminio y los aranceles, la regulación sanitaria (menores, SNAP, cafeína) y la dependencia de Coca-Cola. El riesgo de IA es bajo y poco directo (±1-2 %): no sustituye una lata. Catalizadores: resultados del 3T26 (≈ 5-nov), reunión con inversores el 1-dic-2026 y el uso de la caja.

**Qué cambiaría la decisión.** Comprar exige a la vez una ponderada ≥ 15 %, un base ≥ 12 % y el precio por debajo del valor intrínseco: hoy eso pide un precio por debajo de 26,77 USD. Vender por encima de 52,10. Un crecimiento sostenido por encima del 15 % en 2027 o una recompra grande con la caja mejorarían el objetivo; una pérdida de cuota en EE. UU. o un margen bruto por debajo del 54 % lo empeorarían.`,
    tesis: 'Monster es uno de los mejores negocios de consumo cotizados: una marca global que crece al doble que su mercado sin invertir casi nada, porque Coca-Cola embotella y reparte por ella, con un ROIC del 38,7 % y caja neta. El crecimiento se ha acelerado en 2026 (+23 % en el 1S26) gracias al internacional y a las subidas de precio. El problema es el precio: a 36 veces el beneficio de 2027, el mercado ya paga ese crecimiento durante muchos años, y la regla a 12 meses no deja margen.',
    vision_diferencial: {
      mercado_descuenta: 'Que el BPA crece ≈ 12-14 % al año durante años y que el múltiplo de 35-37 veces se mantiene; los analistas esperan ≈ 50 USD, un 6 % sobre el precio.',
      nuestra_vision: 'Coincidimos en el BPA (1,15 y 1,30 USD en 2026e-2027e, igual que el consenso) y en el negocio; discrepamos en el precio: con el múltiplo cayendo hacia su mediana, la rentabilidad a 12 meses es nula, y el DCF dice que el precio pide un 14 % de crecimiento anual durante siete años.',
      por_que: 'La historia adelantada muestra que Monster cotizó a 27 veces a final de 2024, en cuanto el crecimiento bajó un año. Hoy la competencia en EE. UU. (Alani Nu con PepsiCo), el aluminio y la regulación hacen probable otro año así antes o después.',
    },
    a_favor: [
      '**Marca global y número dos del mundo**: ≈ 15 % del mercado, ganando cuota fuera de EE. UU. (+34,6 % en el 2T26).',
      '**ROIC del 38,7 %**: ≈ 30 puntos sobre el WACC, con inversión del 2 % de las ventas.',
      '**Crecimiento acelerando**: ventas +23 % en el 1S26 y BPA +23 %.',
      '**Sin deuda y con 4.201 M de caja**: margen para recompras o resistir un mal año.',
      '**Red de Coca-Cola**: distribución en frío mundial asegurada hasta 2030.',
    ],
    en_contra: [
      '**Caro**: 36,3 veces el BPA de 2027e frente a una mediana adelantada de 33,3 y un mínimo de 27,1; el DCF queda un 40 % abajo.',
      '**Competencia en EE. UU.**: Alani Nu (+2 puntos en un año) y Celsius en la red de PepsiCo; Reign y Bang caen.',
      '**Aluminio y aranceles**: más coste de lata hasta final de 2026.',
      '**Regulación sanitaria**: menores, SNAP, cafeína, impuestos al azúcar.',
      '**Directivos vendedores y sucesión**: 36,2 M USD vendidos en 12 meses sin compras; fundador de 76 años y salida del responsable de América.',
    ],
    que_vigilar: 'La tesis depende de que el internacional siga creciendo al 20-30 % y EE. UU. al ritmo de la categoría mientras las subidas de precio compensan el aluminio. La señal en contra sería un trimestre con ventas por debajo del +10 %, una cuota de Monster Energy Company por debajo del 34 % en conveniencia o un margen bruto por debajo del 54 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 26,77 USD: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio entre 26,77 y 52,10 USD: Mantener.',
      'Precio por encima de 52,10 USD: Vender (ponderada ≤ −10 %).',
      'Crecimiento de ventas por encima del 15 % en 2027 con margen estable: revisar el caso base al alza.',
      'Pérdida de cuota en EE. UU. por debajo del 34 % o margen bruto por debajo del 54 %: revisar a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento de ventas (sin divisa)', nivel_actual: '+17,9 % (2T26)', umbral_alerta: '< +10 %', por_que: 'Sostiene el múltiplo.' },
      { kpi: 'Margen bruto', nivel_actual: '55,9 % (2T26)', umbral_alerta: '< 54 %', por_que: 'Mide aluminio y precio.' },
      { kpi: 'Cuota de MEC en conveniencia de EE. UU. (Nielsen)', nivel_actual: '35,4 %', umbral_alerta: '< 34 %', por_que: 'Competencia de Alani Nu y Celsius.' },
      { kpi: 'Ventas fuera de EE. UU.', nivel_actual: '+34,6 % (2T26)', umbral_alerta: '< +15 %', por_que: 'Motor del crecimiento.' },
      { kpi: 'Uso de la caja', nivel_actual: '4.201 M USD (jun-2026)', umbral_alerta: 'Compra > 2.000 M fuera de energéticas', por_que: 'Asignación de capital.' },
    ],
  },
};
