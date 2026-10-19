// Textos del analista para Harbour Energy (corte 2026-10-19). Citas: [A3] = fuente 3 de A.json; [P1] = fuente propia.
export default {
  limitaciones: 'Cifras en millones de USD (la moneda de las cuentas); la acción cotiza en peniques (GBp) y se pasa a USD con GBPUSD 1,3307 (19-oct-2026, 15:47 UTC). Precio: cierre oficial del 19-oct-2026 (296,4 peniques tras la subasta de cierre; Yahoo, 15:35 UTC). Cuentas 2021-2025 del ESEF [A8] comprobadas con los comunicados anuales [A2, A4, A5, A6, A7] y el semestre a 30-jun-2026 [A3]; 2024 reexpresado por la asignación del precio de Wintershall. Segmentos solo para 2024-2025 (antes, Reino Unido casi en exclusiva). Acciones económicas: con voto + sin voto de LetterOne × 1,13 (prima de dividendo del 13 %); la capitalización publicada (Yahoo) solo cuenta las con voto. BPA: el ajustado de la empresa menos el cupón de los híbridos; 2022 y 2023 reconstruidos (la empresa no publicaba ajustado). El ROIC del motor limita el impuesto al 40 %: el real de Harbour (75-80 %) se calcula a mano en «Rentabilidad». Avance de mayo de 2026 [A12].',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: '92,7 %: el impuesto británico (40 % + EPL del 35-38 %) y el noruego (78 %) sobre un beneficio pequeño, con deterioros y bajas sin desgravación en el EPL. No se proyecta: el DCF usa el 74-62 % sobre el EBIT, por país y por fecha de fin del EPL [A5].' },
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: '107,6 %: deterioros (393 M) y costes de compra sin desgravación, y el 78 % noruego de Wintershall desde septiembre [A4].' },
    { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: '106,5 %: 311 M de impuesto diferido por alargar el EPL a 2030, 485 M de diferencias de cambio no realizadas sobre los impuestos y deterioros sin desgravar; ajustado, 82 % [A2].' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El flujo de 2023-2025 (545 M de media) es el de una empresa la mitad de grande y con precios de 70-80 USD; 2026-2028 llevan Wintershall entero, LLOG y la guerra de Irán (Brent de 95 USD en 2027 por la curva). La empresa guía ≈ 1.800 M de flujo libre en 2026 después de intereses, desmantelamiento e impuestos atrasados [A3]; el flujo del DCF es antes de intereses y con los impuestos devengados, y baja a ≈ 2.100 M en 2030.' },
    { control: 'Proyección propia frente a consenso (2027e)', explicacion: 'Nuestro EBITDA de 2027 (11.150 M) usa la curva de futuros del 19-oct (Brent 95 USD, TTF ≈ 71 EUR/MWh) [P2]; el consenso de MarketScreener (8.134 M) refleja mazos de precios de verano (≈ 70-75 USD y gas más bajo). Con Brent de 70 USD y gas de 12 USD/mscf (nuestro bajista) salen ≈ 7.000 M. La diferencia es de precio, no de volumen ni de costes.' },
    { control: 'Proyección propia frente a consenso (2028e)', explicacion: 'Mismo motivo: nuestro base de 2028 lleva Brent de 78 USD y TTF de ≈ 45 EUR/MWh (la curva); el consenso, ≈ 65-70 USD. Nuestro BPA de 2028 (0,51) está cerca del del consenso (0,45) porque la amortización y los impuestos absorben la mayor parte de la diferencia.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El motor toma 2023 (0,06) porque 2024 y 2025 tienen BPA NIIF negativo por partidas fiscales y deterioros; en BPA ajustado, el real de 2025 es 0,31 y el 2028e de 0,51 supone un 18 % anual, todo precio (crisis de Irán) y LLOG.' },
    { control: 'Capitalización calculada ≈ publicada', explicacion: 'La publicada (Yahoo, 5.862 M USD) solo cuenta 1.494 M de acciones con voto; la nuestra suma las 251,5 M sin voto de LetterOne (× 1,13 por su prima de dividendo) y las con voto a 13-oct (1.505,2 M): 1.789,4 M de acciones económicas.' },
    { control: 'Circulante del primer año', explicacion: 'Circulante del 9 % de las ventas, el real de 2025; el impuesto a pagar va aparte, en el puente.' },
  ],
  huecos: [],
  parches: [
    { ruta: 'consenso.base_ebitda', valor: 'ajustado' },
    { ruta: 'consenso.ajuste_ebitda_pct_ventas', valor: 1.0 },
  ],
  huecos_resueltos: [],
  secciones: {
    historia: {
      resumen: 'Harbour nace del capital privado: en 2014 EIG crea Harbour Energy (el fondo) para comprar activos del mar del Norte; su vehículo Chrysaor compra a Shell en 2017 y a ConocoPhillips en 2019 sus campos británicos, y en 2021 se fusiona con Premier Oil (fundada en 1934) para cotizar en Londres. Desde entonces ha cambiado de tamaño dos veces con compras: Wintershall Dea (2024) la saca del Reino Unido y LLOG (2026) la lleva al golfo de EE. UU. La lección de su historia es que el valor lo deciden el precio, el fisco y el precio de compra, no el crecimiento propio: el EPL de 2022 se llevó casi todo el beneficio del pico del gas [A7, A6, A4].',
      hitos: [
        { anio: '2017', hito: 'Chrysaor (EIG) compra a Shell activos británicos del mar del Norte por hasta 3.800 M USD.' },
        { anio: '2019', hito: 'Chrysaor compra el negocio británico de ConocoPhillips (≈ 2.700 M USD).' },
        { anio: '2021', hito: 'Fusión inversa con Premier Oil: nace Harbour Energy, cotizada en Londres [A7].' },
        { anio: '2022', hito: 'El Reino Unido crea el EPL (25 %, luego 35 %): cargo único de 1.469 M de impuesto diferido; beneficio de 8 M con 2.462 M antes de impuestos [A6].' },
        { anio: '2023', hito: 'Anuncia la compra de los activos de producción de Wintershall Dea a BASF y LetterOne (21-dic) [A5].' },
        { anio: '2024', hito: 'Cierra Wintershall Dea (3-sep): la producción pasa de ≈ 190 a ≈ 500 kbep/d; BASF y LetterOne entran en el capital [A4].' },
        { anio: '2025', hito: 'El EPL se alarga a marzo de 2030; anuncia LLOG (golfo de EE. UU., 3.200 M USD) y Waldorf [A2, A9].' },
        { anio: '2026', hito: 'Guerra de Irán: Brent a 119 USD; política de reparto ligada al flujo libre; BASF baja del 47 % al 16,4 % y EIG sale [A3, D9].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC del motor (18,9 % en 2025, 15-51 % en 2021-2025) NO sirve: limita el impuesto al 40 % y Harbour paga el 75-80 % en el Reino Unido y Noruega. ROIC real de 2025: EBIT ajustado de 4.055 M (3.490 + 365 de deterioros + 200 de bajas) × (1 − 75-82 % de impuesto ajustado) = 730-1.010 M sobre ≈ 11.100 M de capital invertido (patrimonio con híbridos 6.206 + deuda 5.151 + arrendamientos 634 − caja 846): **6,6-9,1 %, frente a un WACC del 8,25 %; ROIC − WACC de −1,7 a +0,9 puntos: no pasa el requisito de calidad (≥ 5)**. Ni siquiera con los precios de la guerra: el EBIT de 2026e (6.317 M) × 26 % ≈ 1.640 M sobre ≈ 14.000 M de capital con LLOG da ≈ 11,7 % (+3,5 puntos). El ROE es negativo en 2024-2025. Es lo normal en un productor maduro con fisco del 78 %: el Estado se queda con la renta del recurso [A1, A2].',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Harbour es la seguridad de las operaciones en el mar, las emisiones de sus plataformas (y el metano), el desmantelamiento (7.423 M de provisión) y la licencia social y fiscal para producir en el Reino Unido, donde el gobierno no concede licencias nuevas de exploración. El almacenamiento de CO2 (Viking en el Reino Unido, Greensand en Dinamarca) es su respuesta, aún sin ingresos [A1, A3].',
      controversias: 'Sin controversias graves registradas en los documentos leídos. La política de remuneración de 2025 tuvo más de un 20 % de votos en contra por el premio único de la consejera delegada [C1]. Los activos rusos de Wintershall Dea quedaron fuera de la compra [A4].',
      confianza: 'Baja',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Los ingresos salen de producción × precio (modelo propio [P1]): 495 kbep/d en 2026-2027 (guía de 490-500 y 475-500 en 2027-2030 [A3, A11]), bajando a 400 en 2035 con la inversión guiada (≈ 2 % anual de declive neto, la reposición de reservas sin compras es la gran incógnita). Precios de la curva del 19-oct [P2]: Brent de 94,5 USD en 2026 (1S real 92), 95 en 2027, 78 en 2028, 72 en 2029 y 70 en 2030; gas europeo de 18,4, 23,5, 15, 11,5 y 10,5 USD/mscf; coberturas de −1.250, −1.415 y −200 M en 2026-2028 [A3]. De ahí +32 % en 2026, +14 % en 2027, −22 % en 2028, −14 % en 2029 y −1-2 % al año desde 2031.',
    margenes: 'Margen EBITDA (EBITDAX menos exploración) del 70-72 % en 2026-2027 y del 58-66 % desde 2028, frente al 63-73 % de 2021-2025 [A2]: coste operativo de 14,5 USD/bep en 2026-2027 y 15 en 2028 (guía [A3]) con un 2 % de inflación, 6,5 % de las ventas en regalías y otros costes (cuadra el 1S26: 0,29 frente a 0,28 USD de BPA real), gastos generales de 450 M y 150 M de exploración. El modelo da 0,31 USD de BPA en 2025 frente a 0,31 real [P1].',
    inversion: 'Amortización de las reservas de 16,5 USD/bep en 2026-2028 (16,4 en el 1S26 [A3]) que baja a 14 en 2035 con LLOG, más ≈ 150 M de otros: 23 % de las ventas en 2026 y 24 % en 2035. Capex sin desmantelamiento de 1.900 M en 2026 y 1.800 M en 2027-2030 (guía total de 2,0-2,3 bn con ≈ 0,4 bn de desmantelamiento [A3, A11]), que baja con la producción. El capex del último año (1.672 M) queda por debajo de la amortización (2.194 M): es una empresa que se agota, no un negocio en estado estacionario, y por eso el crecimiento terminal es negativo. El desmantelamiento va en el puente (neto de impuestos).',
    wacc: 'WACC del 8,25 %: tasa libre del 5,09 % (bono del Tesoro de EE. UU. a 10 años del 16-oct-2026 [P3]; cuentas y deuda en USD), beta de 0,90 (semanal de 5 años ajustada frente al FTSE 100 [D1]), prima de mercado del 5,5 % (la implícita de Damodaran es del 4,2 % [P4]) y 1 punto más por el régimen fiscal británico cambiante, las reservas cortas y el papel pendiente de BASF: coste del capital del 11,0 %. Deuda al 5,6 % antes de impuestos (4,8 % de coste medio y bonos nuevos a 4-6 % [A3]) con escudo del 45 % y peso del 35 %. Impuesto sobre el EBIT del 74-72 % hasta 2029, 66 % en 2030 (fin del EPL en marzo) y 62 % desde 2031 (con LLOG y Argentina), como en Equinor [P5].',
    terminal: 'Crecimiento a perpetuidad del −2 %: con ≈ 1.400 Mbep de reservas 2P (7-8 años) y 1.839 Mbep de recursos 2C, la producción no se sostiene sin comprar; el −2 % equivale a reponer ≈ 70 % de lo producido para siempre. El valor terminal es el 34 % del valor de empresa. Con un múltiplo de salida de 3 veces el EBITDA (el de Harbour y los independientes del mar del Norte hoy) el valor terminal sería parecido (15.588 frente a 16.014 M).',
  },
  puente_comentarios: {
    '2026e': 'Volumen +4,4 % (495 frente a 474 kbep/d, con LLOG desde febrero y Waldorf desde julio, menos Indonesia [A3]); precio +38 % (Brent de 69 a 94,5 USD y gas europeo de 11 a 18 USD/mscf por la guerra de Irán); otros −11 % (pérdidas de coberturas de ≈ 1.250 M).',
    '2027e': 'Volumen plano (guía de 475-500 [A11]); precio +15 % (Brent de 95 y TTF de ≈ 71 EUR/MWh en la curva [P2]); coberturas algo peores (−1.415 M).',
    '2028e': 'Volumen −1 %; precio −29 % (la curva baja a 78 USD y 45 EUR/MWh); las coberturas casi desaparecen (+8 %).',
    '2029e': 'Volumen −1 %; precio −14 % (Brent 72, gas 11,5 USD/mscf).',
    '2030e': 'Volumen −2 %; precio −5 % (Brent 70, gas 10,5).',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'La proyección no pide crecer: los ingresos de 2035 quedan un 12 % por debajo de los de 2025 y la producción baja de 495 a 400 kbep/d. Lo que pide es mantener el declive en ≈ 2 % anual con 1.800 M de inversión al año, es decir, reponer reservas sin comprar, algo que Harbour no ha demostrado: su reposición del 250 % en 2022-2025 vino casi toda de compras [A2]. Con un ROIC real por debajo del WACC (6,6-9,1 % frente al 8,25 %), cada dólar reinvertido crea poco valor; por eso «En parte» y no «Sí», aunque el motor dé «Sí» (su ROIC usa un impuesto del 40 %). LLOG (22 años de vida, crecimiento a 2028) y los 2C de Argentina y México son el apoyo; el Reino Unido, el lastre.',
  dcf_lectura: 'El DCF da 5,03 USD por acción (378 peniques), un 28 % sobre el precio, con el valor terminal en el 34 % del valor de empresa: casi todo el valor está en los diez años explícitos, y de ellos ≈ 6.000 M en 2026-2028, los años de la guerra. El puente resta 11.900 M (deuda neta de 6.200 M, híbridos de 2.044 M, desmantelamiento neto de 4.530 M, impuestos atrasados y otros): el accionista es la cola de una empresa con mucho pasivo, y por eso el valor es tan sensible al precio (bajista 1,01 USD, alcista 8,57). El DCF inverso dice que el precio descuenta ingresos que caen un 5,7 % al año en 2027-2035 (nuestro base: −4,0 %) o un margen del 52,6 % (base 57,8 %), y una rentabilidad del 9,4 % frente al WACC del 8,25 %: el mercado ya pone un Brent algo por debajo de la curva y una prima de riesgo mayor. No es exigente; es la valoración de un activo que se agota en un pico de precios.',
  narrativas: {
    Bajista: 'Paz duradera en Oriente Medio, Ormuz abierto y la OPEP+ recuperando cuota: el Brent vuelve a los 60-70 USD de antes de la guerra en 2027 (70) y se queda en 60 desde 2028; el gas europeo baja a 9-12 USD/mscf con el gas licuado nuevo. Las coberturas ya no pierden. Ingresos de 10.400 M en 2027 y 8.800 M en 2028, BPA de 0,30 y 0,11 USD. Con 11.900 M de pasivos delante del accionista, el valor del DCF baja a 1,01 USD (−74 %).',
    Base: 'La curva de futuros del 19-oct se cumple: Brent de 95 USD en 2027, 78 en 2028 y 70 en 2030; TTF de ≈ 71 y 45 EUR/MWh en 2027 y 2028. Producción de 495 kbep/d que baja a 400 en 2035, impuesto del 74 % hasta el fin del EPL. BPA de 0,63 en 2026, 0,91 en 2027 y 0,51 en 2028. DCF de 5,03 USD (+28 %).',
    Alcista: 'La crisis de suministro dura hasta 2028 (Brent de 105 USD en 2027 y 90 en 2028, TTF ≈ 90 y 63 EUR/MWh) y los precios se normalizan más arriba (78-80 USD). Las coberturas restan más en 2027 (−2.100 M), pero el BPA llega a 1,22 USD en 2027 y 0,88 en 2028. DCF de 8,57 USD (+118 %).',
  },
  escenarios_comentario: 'Escenarios por mazo de precios, no por un solo precio (lección de energía): cada uno es el modelo de producción × precio con su Brent, su gas y sus coberturas [P1], pasado al motor como perfil año a año de crecimiento y margen (el margen se ajusta para que el EBIT del motor sea el del modelo). Probabilidades 25/50/25. La asimetría del DCF es favorable (+118 % frente a −74 %; ponderado 4,91 USD) porque la deuda apalanca el resultado en los dos sentidos. Pero la regla a 12 meses mira el beneficio de 2028, cuando la curva ya ha bajado, y ahí la asimetría desaparece: el BPA va de 0,11 a 0,88 USD.',
  casos_12m: {
    Bajista: 'Brent de 60 USD y gas de 9,5 USD/mscf en 2028 (antes de la guerra): ingresos de 8.824 M, EBITDA de ≈ 4.200 M, amortización de 3.100 M, intereses de 600 M e impuesto del 76 %: ≈ 300 M de beneficio, menos 100 M de cupón de híbridos, ÷ 1.754 M de acciones = 0,11 USD [P1].',
    Base: 'Curva de futuros del 19-oct en 2028 (Brent 78 USD, TTF ≈ 45 EUR/MWh = 15 USD/mscf) [P2]: ingresos de 11.951 M, EBITDA de 7.874 M (65,9 %), amortización de 3.101 M, intereses de 600 M, impuesto del 76 %: 1.000 M − 100 M de híbridos ÷ 1.754 M = 0,51 USD (consenso: 0,45).',
    Alcista: 'Brent de 90 USD y gas de 21 USD/mscf en 2028: ingresos de 14.791 M, coberturas de −470 M, impuesto del 76 %: ≈ 1.640 M ÷ 1.754 M = 0,88 USD.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026 (0,63 USD) está entre el de MarketScreener (0,70) y por debajo del de Yahoo (0,86, cuatro analistas); el de 2027 (0,91) está por encima de los dos (0,65 y 0,82) porque usamos la curva del 19-oct con Brent de 95 USD; el de 2028 (0,51) está cerca del de MarketScreener (0,45). La diferencia no está en el beneficio sino en el múltiplo: el objetivo medio de los analistas (349 peniques, 4,64 USD) supone ≈ 9 veces el beneficio de 2028; la regla común aplica a 2028 el PER de hoy, calculado sobre el beneficio del pico.',
  objetivo_comentario: 'La regla a 12 meses da Vender: objetivo ponderado de 2,61 USD (196 peniques), −28,6 % con el dividendo (base −34,8 %). El selector manda a la v2 porque Harbour está «desrateada»: su mediana adelantada (10,3x, de 2023-2025) es 2,2 veces el PER de hoy (4,6x); con la v3 sin selector saldría −20,7 %, también Vender. La causa es de ciclo: el PER de hoy (4,6x) se calcula sobre el beneficio de la guerra (0,85 USD en los próximos 12 meses) y se aplica al de 2028 (0,51), cuando la curva ya ha bajado; el mercado no paga más múltiplo por un beneficio que sabe que es de pico. Dicho de otro modo: para ganar un 15 % en 12 meses, la acción tendría que cotizar a ≈ 8,8 veces el beneficio de 2028, cuando hoy cotiza a 7,6 veces y su historia normal es de 10. El crecimiento del BPA que el control marca (54 % anual desde 2023) es un artefacto: el BPA NIIF de 2024-2025 es negativo; en BPA ajustado es un 18 % anual desde 0,31, todo precio.',
  valoracion_comentario: 'Pesos: DCF 40 %, escenarios 40 % y comparables 20 %, como en Equinor [P5]: el DCF por producción × precio es el método que recoge la curva y la deuda; los comparables pesan menos porque el PER y el EV/EBITDA de los productores están deformados por el pico (el PER de los próximos 12 meses del motor usa el consenso, 6,0x frente a una mediana de 10,4x). Síntesis: 5,35 USD (402 peniques), un 36 % sobre el precio, el valor intrínseco a largo plazo. La distancia con el objetivo a 12 meses (2,61 USD) es el centro del caso: el valor existe si los precios se quedan cerca de la curva y Harbour repone reservas, pero en 12 meses el mercado mirará el beneficio de 2028 y no le pondrá más múltiplo. Con la prima implícita del mercado (4,2 %), el DCF sube a 5,85 USD.',
  catalizadores: {
    items: [
      { fecha: '2026-11', evento: 'Avance de producción y negocio del tercer trimestre', efecto: 'Producción del 3T (guía 490-500 kbep/d), deuda neta tras la recompra y posible primera guía de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11', evento: 'Presupuesto de otoño del Reino Unido', efecto: 'Cambios en el EPL o en el mecanismo de precios que lo sustituye (OGPM) desde 2030', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Fin del bloqueo de las acciones de los vendedores de LLOG (70 % de 174,9 M)', efecto: 'Posible colocación con descuento de hasta ≈ 122 M de acciones (8 % del capital con voto)', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027-03', evento: 'Resultados de 2026 y reservas a fin de año', efecto: 'Reposición de reservas 2P (la empresa espera ≥ 150 % en 2026), dividendo final y guía de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha', evento: 'Venta del 16,4 % restante de BASF', efecto: 'Exceso de papel; la empresa puede comprar a la vez fuera de mercado (lo hizo en septiembre a 2,66 GBP)', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'Sin fecha', evento: 'Acuerdo de paz en Oriente Medio o nuevo cierre de Ormuz', efecto: 'Mueve el Brent ±20-30 USD y la acción en el mismo sentido', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-12', evento: 'Arranque de SESA (gas natural licuado, Harbour 15 %) y crecimiento de LLOG', efecto: 'Más producción fuera del Reino Unido con impuesto más bajo', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Vuelta de los precios a antes de la guerra (Brent 60 USD, TTF 25-30 EUR/MWh)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−74 % en el DCF (bajista: 1,01 USD)', mitigante: 'Coberturas de 2027 (16,9 Mbbl a 60-83 USD; gas a 8,9-15,8 USD/mscf) y deuda en grado de inversión', senal: 'Brent por debajo de 75 USD en el contrato de dic-27' },
      { riesgo: 'Cambio fiscal en el Reino Unido (EPL más alto o más largo, OGPM peor de lo previsto)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5-10 % por cada 5 puntos de impuesto sobre el Reino Unido', mitigante: 'El Reino Unido baja al ≈ 30 % de la producción; la cartera se ha ido a EE. UU., Noruega y Argentina', senal: 'Presupuesto de otoño y consulta del OGPM' },
      { riesgo: 'Reservas cortas: 7-8 años de 2P sin reposición orgánica demostrada', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % si el declive es del 5 % anual en vez del 2 %', mitigante: 'LLOG (22 años de vida), 2C de 1.839 Mbep (Argentina, México, Noruega)', senal: 'Reposición 2P por debajo del 100 % en marzo de 2027' },
      { riesgo: 'Exceso de papel: BASF (16,4 %) y vendedores de LLOG (11,6 %)', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5-10 % en cada colocación (julio a 205 peniques, septiembre a 266)', mitigante: 'Recompra de 250 M y compras fuera de mercado autorizadas por la junta', senal: 'Anuncio de colocación acelerada' },
      { riesgo: 'Deuda y pasivos delante del accionista (deuda neta 5.170 M, híbridos 2.044 M, desmantelamiento 7.423 M)', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Apalanca el bajista: cada 1.000 M de valor de empresa son ≈ 0,56 USD por acción', mitigante: 'Grado de inversión (BBB−/Baa2), liquidez de 4.100 M, vencimientos escalonados hasta 2035', senal: 'Moody\'s baja a Baa3 (perspectiva negativa hoy)' },
      { riesgo: 'Retraso de los impuestos: ≈ 2.400 M a pagar en el 2S26 y ≈ 1.000 M más en el 1S27 por los precios de 2026', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Flujo libre de 2027 menor que el beneficio; reparto hacia la parte baja del 45-75 %', mitigante: 'Ya está en el puente (875 M por encima de lo normal)', senal: 'Deuda neta por encima de 1 vez el EBITDAX' },
      { riesgo: 'Ejecución en México y Argentina (Zama, Kan, Vaca Muerta)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3-5 %', mitigante: 'Socios grandes (Pemex, Carso, TotalEnergies, YPF)', senal: 'Deterioros en México (77 M en 2025) o retraso de la decisión de inversión de Zama' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. No fue un accidente sino la suma de lo previsible. En la primavera de 2027 un acuerdo con Irán reabrió el golfo del todo y la OPEP+ recuperó cuota: el Brent bajó a 65 USD y el TTF a 30 EUR/MWh. Harbour pagó en 2027 los impuestos de los precios de 2026 (≈ 1.000 M en el primer semestre) con un flujo ya mucho menor, la deuda neta volvió a 1,3 veces el EBITDAX y el reparto bajó al mínimo (16,10 céntimos). BASF y los vendedores de LLOG colocaron su papel con descuento en 2027. La reposición de reservas de 2027 y 2028 se quedó en el 60-70 % sin compras: el mercado empezó a valorar a Harbour por años de vida y no por flujo, y Moody\'s la bajó a Baa3. Para crecer, la dirección hizo otra compra grande pagada con acciones. Las señales que lo anticipaban: la curva de futuros (78 USD en 2028 ya en 2026), la reposición orgánica nunca demostrada y un balance con 11.900 M de pasivos delante del accionista.',
    ia: { exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±1-2 % a 3-5 años', comentario: 'Riesgo menor: la IA no sustituye lo que vende Harbour (petróleo y gas). Le ayuda algo en el subsuelo (interpretación sísmica, perforación) y en costes de operación y mantenimiento predictivo, donde ya trabajan las grandes; el efecto en el valor es pequeño frente al precio del crudo. Del lado de la demanda, los centros de datos suben el consumo de gas para generar electricidad en EE. UU. y Europa, un apoyo menor al gas. Ningún escenario cambia por la IA.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Reservas', pregunta: '¿Cuánta reposición de reservas 2P esperan sin compras en 2026-2028 y cuánto cuesta por barril?', por_que: 'Con 7-8 años de vida, es lo que decide si el terminal debe ser −2 % o −5 %.' },
      { tema: 'Impuestos', pregunta: '¿Cuánto impuesto de 2026 queda por pagar en 2027 y cómo afecta al reparto?', por_que: 'El flujo libre de 2027 será menor que el beneficio por el retraso fiscal (≈ 60/40).' },
      { tema: 'BASF', pregunta: '¿Hay acuerdo para comprar el resto de la participación de BASF fuera de mercado, y a qué descuento?', por_que: 'El 16,4 % es el mayor freno al precio.' },
      { tema: 'Reino Unido', pregunta: '¿Qué parte de la cartera británica sigue invirtiendo con el EPL hasta 2030 y qué haría el OGPM con los proyectos?', por_que: 'Decide el declive británico (≈ 30 % de la producción).' },
      { tema: 'Coberturas', pregunta: '¿Mantendrán coberturas del 40-50 % para 2027-2028 con la curva tan invertida?', por_que: 'Las de 2026-2027 cuestan ≈ 2.700 M frente al mercado.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Vender',
    conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Vender, con convicción baja. La regla común a 12 meses da un objetivo ponderado de 2,61 USD (196 peniques), un −28,6 % con el dividendo (base −34,8 %), porque aplica al beneficio de 2028 (0,51 USD, con la curva de futuros) el múltiplo de hoy, calculado sobre el beneficio de la guerra (4,6 veces). Con la v3 sin selector, −20,7 %: las dos reglas dicen Vender. La convicción es baja, y no media como sugiere el motor, porque el valor intrínseco apunta al otro lado (5,35 USD, +36 %) y la regla de múltiplos encaja mal con una petrolera en un pico de precios.

**El negocio.** Harbour produce ≈ 500.000 barriles equivalentes al día en Noruega, el Reino Unido, Argentina, el golfo de EE. UU., Alemania, México y el norte de África. Vende a precio de mercado y el Estado se queda con el 75-80 % del beneficio en el Reino Unido y Noruega. No tiene foso: tiene escala, costes medios y compras bien hechas (Wintershall Dea en 2024, LLOG en 2026) [A1, A9].

**Calidad: no pasa.** El ROIC real de 2025 es del 6,6-9,1 % frente a un WACC del 8,25 % (el del motor, 18,9 %, limita el impuesto al 40 %). Ni con los precios de la guerra llega a +5 puntos. Las reservas 2P dan para 7-8 años y la reposición de 2022-2025 vino de compras: sostenibilidad «En parte» [A2].

**Las cifras.** Con Brent de 94,5 USD en 2026 y 95 en 2027 (la curva), el BPA ajustado pasa de 0,31 en 2025 a 0,63 en 2026 y 0,91 en 2027, y vuelve a 0,51 en 2028 con Brent de 78. La deuda neta es de 5.170 M (0,7 veces el EBITDAX) más 2.044 M de híbridos y 7.423 M de desmantelamiento [A3, P1].

**Valoración.** El DCF da 5,03 USD (+28 %); los escenarios por mazo de precios, 1,01 (Brent 60), 5,03 y 8,57 USD (crisis hasta 2028). El DCF inverso dice que el precio descuenta un Brent algo por debajo de la curva y una rentabilidad del 9,4 %. El mercado no se equivoca en el beneficio: el consenso de 2028 (0,45) está cerca del nuestro (0,51). La distancia está en el múltiplo: los analistas ponen ≈ 9 veces el beneficio de 2028 (objetivo de 349 peniques); la regla, 4,6.

**Bolsa y regla 13.** La acción sube un 49,5 % en 12 meses y está un 7,5 % bajo su máximo. No hay ampliación ni decisión con fecha que mueva el precio más de un 5 % en contra antes de resultados; las ventas de EIG y BASF tienen motivo declarado. Veredicto: no cambia [D9].

**Riesgos.** Una paz duradera con Ormuz abierto (Brent a 60-65 USD) hunde el valor (−74 %); el EPL hasta 2030 y su sucesor; el papel de BASF (16,4 %) y de los vendedores de LLOG (libres en febrero de 2027); y las reservas cortas.

**Qué cambiaría la recomendación.** Bajo 2,30 USD (≈ 173 peniques) la regla daría Comprar, pero no pasaría calidad: no se compraría. Un Brent de 85 USD o más en la curva de 2028 subiría el BPA de 2028 a ≈ 0,75 y dejaría la acción en Mantener. Una reposición orgánica de reservas ≥ 100 % en marzo de 2027 subiría el valor intrínseco, no el objetivo a 12 meses.`,
    tesis: 'Harbour es un buen productor en el peor momento para comprarlo con la regla común: el beneficio de 2026-2027 está inflado por la guerra de Irán, la curva de futuros ya descuenta la vuelta a 78 USD en 2028, el fisco británico se lleva el 78 % hasta 2030 y las reservas dan para 7-8 años. El valor intrínseco (5,35 USD) supera al precio si los precios se quedan cerca de la curva, pero el mercado no pagará más múltiplo por un beneficio de pico, y en 12 meses la acción tiene más que perder que ganar.',
    vision_diferencial: {
      mercado_descuenta: 'Que 2026-2027 son años excepcionales y que el beneficio vuelve a ≈ 0,45 USD en 2028; por eso paga 4,6 veces el beneficio de los próximos 12 meses y 7,6 el de 2028.',
      nuestra_vision: 'Coincidimos en el beneficio (0,51 en 2028) y discrepamos de los analistas en el múltiplo: con fisco del 78 %, reservas cortas y papel pendiente, Harbour no ha cotizado a 9-10 veces más que con beneficios deprimidos, y ROIC bajo el WACC.',
      por_que: 'La historia adelantada de 2023-2024 (10-12 veces) es de años con el beneficio hundido por el EPL; cuando el beneficio es alto (2022, 2026), el múltiplo cae a 3-4 veces. La regla común lo recoge al aplicar el múltiplo de hoy.',
    },
    a_favor: [
      '**Flujo libre fuerte en 2026**: ≈ 1.800 M USD guiados (≈ 25 % de la capitalización) con Brent a 80 en el segundo semestre [A3].',
      '**Compras bien hechas**: LLOG a ≈ 11,5 USD por barril 2P, con 22 años de vida y crecimiento hasta 2028 [A9].',
      '**Diversificación fuera del Reino Unido**: Noruega, EE. UU. y Argentina pesan ya más que el EPL británico.',
      '**Reparto ligado al flujo**: 45-75 % del flujo libre, con un dividendo mínimo del 5,4 % y recompra de 250 M [A2].',
      '**DCF por encima del precio**: 5,03 USD (+28 %) con la curva de futuros.',
    ],
    en_contra: [
      '**Beneficio de pico**: el BPA de 2027 (0,91) cae a 0,51 en 2028 con la curva; la regla común da −28 %.',
      '**Calidad baja**: ROIC real del 6,6-9,1 % frente a un WACC del 8,25 %; el Estado se queda con el 78 %.',
      '**Reservas para 7-8 años** sin reposición orgánica demostrada.',
      '**Pasivos delante del accionista**: ≈ 11.900 M (deuda, híbridos, desmantelamiento).',
      '**Exceso de papel**: BASF (16,4 %) quiere salir y los vendedores de LLOG quedan libres en febrero.',
    ],
    que_vigilar: 'La curva del Brent y del TTF para 2028 (hoy 78 USD y ≈ 45 EUR/MWh): es la que decide el BPA del objetivo. Después, la reposición de reservas de 2026 (marzo de 2027), el presupuesto británico y las colocaciones de BASF y de los vendedores de LLOG.',
    cambiaria_recomendacion: [
      'Precio por debajo de 2,30 USD (≈ 173 peniques): la regla daría Comprar, pero no pasa calidad (ROIC − WACC < 5): no se compraría.',
      'Precio entre 2,30 y 3,13 USD (173-235 peniques): Mantener.',
      'Brent de dic-28 por encima de 88 USD en la curva: el BPA de 2028 subiría a ≈ 0,75 y la regla daría Mantener al precio de hoy.',
      'Reposición orgánica de reservas 2P ≥ 100 % en los resultados de 2026 (marzo de 2027): subiríamos el terminal y el valor intrínseco.',
      'Un EPL más duro o más largo en el presupuesto de otoño: confirmaría el Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'Brent dic-28 (futuros)', nivel_actual: '78,3 USD', umbral_alerta: '< 70 USD', por_que: 'Base del BPA de 2028.' },
      { kpi: 'TTF cal-28', nivel_actual: '≈ 45 EUR/MWh', umbral_alerta: '< 35 EUR/MWh', por_que: '≈ 35 % de la producción es gas europeo.' },
      { kpi: 'Producción', nivel_actual: '509 kbep/d (1S26)', umbral_alerta: '< 475 kbep/d', por_que: 'Suelo de la guía de 2027-2030.' },
      { kpi: 'Deuda neta / EBITDAX', nivel_actual: '0,7x', umbral_alerta: '> 1,0x', por_que: 'Por encima, el reparto va al mínimo.' },
      { kpi: 'Reposición de reservas 2P', nivel_actual: '≥ 150 % esperado en 2026', umbral_alerta: '< 100 %', por_que: 'Vida de reservas de 7-8 años.' },
      { kpi: 'Participación de BASF', nivel_actual: '16,4 %', umbral_alerta: 'Colocación anunciada', por_que: 'Exceso de papel.' },
    ],
  },
};
