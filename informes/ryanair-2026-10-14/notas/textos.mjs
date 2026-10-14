// Textos del analista principal (Ryanair, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de inversores, la SEC, Euronext y los proveedores de datos no se pudieron abrir, así que las cifras salen de extractos de búsqueda de los comunicados de resultados (FY23-FY26 y 1T FY27), del 20-F de FY26 y de la prensa financiera, cruzadas cuando fue posible. La confianza de los datos de núcleo es baja: el precio (24,16 €) es una cotización sin fecha de roic.ai que cuadra con el ADR del 9-oct (54,04 USD ÷ 2 acciones ÷ 1,1188 = 24,15 €) [D15, D17, D9]; el balance de FY22-FY24 solo tiene totales (activo, patrimonio, caja y caja neta) y FY22 no tiene cuenta completa. Ejercicio cerrado el 31 de marzo, con la etiqueta de la empresa («FY2026» = abril de 2025 a marzo de 2026). Cuenta por naturaleza: coste_ventas = combustible. La deuda de FY23-FY25 es la deuda bruta de los comunicados (caja menos caja neta), con los arrendamientos dentro. Cotiza en Euronext Dublín; el ADR de Nasdaq (RYAAY) representa dos acciones.',

  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (FY2024)', explicacion: 'Irlanda grava al 12,5 % y parte del beneficio se genera en filiales de Malta y Polonia; el tipo efectivo del grupo es del 9,7-10,3 % desde FY24 [A2, A4]. El DCF usa un 12,5 % (y un 15 % no cambiaría la recomendación: el impuesto mínimo global ya aplica).' },
    { control: 'Tipo impositivo efectivo razonable (FY2025)', explicacion: 'Igual que FY2024: tipo efectivo del 9,7 % por la mezcla Irlanda-Malta; el DCF proyecta un 12,5 %.' },
    { control: 'Tipo impositivo efectivo razonable (FY2026)', explicacion: 'Igual que FY2024: 10,3 %; el DCF proyecta un 12,5 %.' },
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (24,80 €) queda un 17,8 % por debajo del objetivo medio de seis analistas (30,17 €): ver diferencia_consenso. El BPA de FY29e (2,05 €) no está lejos del de los analistas; la diferencia es el múltiplo.' },
    { control: 'Fuentes sin citar', explicacion: 'Las fuentes sin citar son documentos de contexto (resultados de FY23, informe anual de 2024, multiplos.vc) leídos en extracto.' },
  ],

  parches: [],

  secciones: {
    comparables: {
      criterio: 'Aerolíneas cotizadas europeas: tres grupos de red con filial de bajo coste (IAG con Vueling, Lufthansa con Eurowings, Air France-KLM con Transavia) y tres de bajo coste u ocio (easyJet, Jet2, Wizz Air). Ninguna tiene la caja neta, la flota en propiedad ni el coste de Ryanair: son la referencia de lo que el mercado paga por una aerolínea europea, no un precio justo para Ryanair. Wizz Air está en pérdidas (sin PER) y su EV/EBITDA es de abril. Cifras de proveedores y fechas distintas (Stock Analysis, Goodbody, Stockopedia; julio-septiembre de 2026) [D21-D25].',
      comentario: 'Las aerolíneas europeas cotizan a 3,5-7,9 veces el EBITDA de los últimos 12 meses y a 2,4-10,6 veces el beneficio esperado (mediana del PER de 7,3x) [D21, D22, D24]. Ryanair cotiza a 5,9 veces el EBITDA y a 14,0 veces nuestro BPA de los próximos 12 meses: casi el doble de PER que el sector. La prima se justifica por tres cosas que los comparables no tienen: caja neta (≈2.700 M frente a deuda neta en todas las demás), flota en propiedad y un ROIC por encima del 20 %. Por eso el método pesa solo un 10 %: aplicar la mediana del sector a Ryanair da 12,56 € por acción, un valor de liquidación del ciclo y no de un negocio con ventaja en costes.',
    },
    multiplos_historicos: {
      comentario: 'Solo hay precios de cierre fiables de FY2024 (precio medio de la recompra del 21-may-2024, tras los resultados), FY2025 y FY2026 (precios de la recompra al cierre de marzo) [D18-D20]. Con ellos, el PER adelantado (cierre ÷ BPA del ejercicio siguiente) fue de 12,3x en FY2024 y 9,3x en FY2025, con el BPA de FY26 antes de excepcionales. FY2022-FY2023 se excluyen (pérdidas y recuperación tras la pandemia). Hoy la acción cotiza a 13,5x nuestro BPA de FY28e: por encima de esa historia corta, porque el mercado mira a través de un FY27-FY28 deprimido por el combustible.',
    },
    financieros: {
      comentario: 'Los ingresos pasaron de 4.801 M en FY22 a 15.544 M en FY26, todo orgánico: 208,4 M de pasajeros (+4 %) y una tarifa media +10 % en FY26 [A1, A15]. El beneficio fue de 1.314 M en FY23, 1.917 M en FY24, 1.612 M en FY25 (tarifas −7 %) y 2.174 M en FY26 (2.260 M antes de excepcionales) [A1, A4, A6]. El margen EBITDA osciló entre el 19,9 % (FY25) y el 24,1 % (FY26): lo mueven la tarifa y el combustible, no el volumen. El 1T FY27 (abril-junio de 2026) devolvió el margen a la baja: beneficio −34 %, a 538 M, con la tarifa −6 % y el combustible no cubierto a ≈150 USD/barril [A8].',
      ajustes: 'Cifras publicadas. FY26 incluye un excepcional de 85 M (un tercio de la multa de la AGCM de 256 M, recurrida) dentro de los costes de explotación: va en no_recurrentes_en_ebitda y el BPA de la historia adelantada usa el de antes de excepcionales (2,12 €) [A1, A13]. FY23 tiene 117 M de diferencia entre el beneficio publicado (1.314 M) y el «antes de excepcionales» (1.430 M) [A6]. FY22 (pérdida de 241 M) está incompleto. El «resultado financiero y otros» de FY25 (+226 M) incluye partidas distintas de los intereses de la caja.',
    },
    negocio: {
      geografias_criterio: null,
    },
  },

  rentabilidad_comentario: 'El ROIC del motor es del 32 % en FY26 (23,5 % en FY25 y 32,8 % en FY24), muy por encima del WACC del 9,28 %. Está inflado por el circulante negativo: los billetes cobrados por anticipado (más de 6.000 M de pasivos devengados) financian parte de la flota [A4]. Medido sobre el inmovilizado material (11.373 M), el rendimiento después de impuestos es de ≈19 % (estimación propia: NOPAT de 2.206 M), unos 10 puntos sobre el WACC. Lo mueve el margen, no la rotación (0,8 veces): los años de tarifa alta (FY24, FY26) dan 32-33 % y los de tarifa baja, 23 %. El ROIC incremental histórico (23,7 %) muestra que los aviones nuevos rinden: se compran en la parte baja del ciclo y se pagan con caja. Ninguna aerolínea europea cotizada se acerca: todas con deuda neta y márgenes de un dígito [D22].',

  dcf_justificacion: {
    crecimiento: 'FY27e +2,5 %: tráfico de 214 M (+2,7 %, guía recortada en septiembre) y tarifa algo más baja que en FY26 (−6 % en el 1T, «ligeramente a la baja» en el 2T) [A8, A16]. FY28e-FY31e +5-6 %: llegan los B737-MAX 10 (150 en firme) y el objetivo es 300 M de pasajeros en FY34, un 4,6 % anual desde 208 M [B3]; suponemos un 4-4,5 % de tráfico y un 1-1,5 % de tarifa. Después baja hasta el 2,5 % de FY36e. El crecimiento medio (4,2 %) queda por debajo del de FY23-FY26 y del que la flota permite.',
    margenes: 'Margen EBITDA del 21,5 % en FY27e-FY28e: el 1T FY27 cayó un 37 % en beneficio de explotación, el consenso de BPA de FY27 es de 1,72 € y FY28 solo tiene un 15 % del combustible cubierto a 85 USD [A8, D4]. Sube al 22,5-23 % desde FY29e con el MAX 10 (un 21 % más de asientos y menos consumo) y vuelve al 22,5 % al final, la media de FY24-FY26 (23,2 %, 19,9 % y 24,1 %) con un descuento por la competencia.',
    inversion: 'Amortización del 9 % de las ventas (8,8 % en FY26). Capex del 13-14 % en FY27e-FY30e por las entregas del MAX 10 (12,2 % en FY26 y 17,8 % en FY24, con entregas retrasadas), que baja al 10 % al final, por encima de la amortización. Circulante a cero: el motor no ve los billetes cobrados por anticipado; tratarlos aparte sumaría caja.',
    wacc: 'Tasa libre: Bund a 10 años del 3,53 % (12-oct-2026) [D26]. Beta de 1,1 (estimación propia: aerolínea con caja neta; no se pudo calcular con bolsa.mjs). Prima de mercado del 5,5 % y sin prima adicional: vende en la zona euro y Reino Unido. Coste de la deuda del 4 % con un peso del 5 % (prácticamente sin deuda). WACC del 9,28 %. Con la prima implícita del mercado (4,2 %) baja al 7,92 % y el valor sube a 33,75 €.',
    terminal: 'Gordon con un 2 % de crecimiento: la inflación objetivo del BCE con crecimiento real nulo, coherente con un Bund del 3,53 %. En el bajista, 1,5 %. El valor terminal pesa un 59 % del valor.',
  },
  puente_comentarios: {
    'FY2027e': 'Tráfico de 214 M (+2,7 %) según la guía de septiembre; tarifa media −0,2 % (−6 % en el 1T, recuperación parcial en el invierno) [A16, A8].',
    'FY2028e': 'Primeros MAX 10 y fin de los retrasos de Boeing: +4 % de pasajeros; +1 % de tarifa.',
    'FY2029e': 'Flota creciendo hacia 300 M de pasajeros en FY34 [B3]: +4,5 % de tráfico; tarifa +1,5 % si el combustible caro reduce la oferta de los rivales.',
    'FY2030e': '+4,5 % de tráfico y +1 % de tarifa.',
    'FY2031e': '+4 % de tráfico y +1 % de tarifa.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La reinversión de la proyección (25 % del NOPAT) financia un 7,9 % anual al ROIC actual, por encima del 4,2 % proyectado, y el capital nuevo rinde un 9,4 %, menos de la mitad del ROIC incremental histórico (23,7 %). La prueba de cuota se hace a mano (mercado_final en null: no hay mercado en euros): de 206 M a ≈300 M de pasajeros en FY36e frente a un mercado de la UE de 1.094 M que crezca un 3 % anual (≈1.470 M en 2035), la cuota pasaría del 19 % al ≈20 %, 1,1 veces la actual [B7]. El crecimiento depende de que Boeing entregue el MAX 10, no de ganar clientes.',
  dcf_lectura: 'El DCF da 27,47 € por acción (+13,7 %), con un WACC del 9,28 % y un valor terminal del 59 %. El DCF inverso dice que el precio de 24,16 € descuenta un crecimiento del 2,4 % anual y un margen EBITDA del 21,0 %, frente al 4,2 % y el 22,5 % de nuestro caso base: el mercado no paga el plan de 300 M de pasajeros y supone márgenes como los de FY25, el año de tarifas bajas. La rentabilidad implícita es del 10,3 %, por encima de nuestro WACC. Es una expectativa conservadora para un negocio que creció un 12 % anual en ingresos desde FY23, pero no absurda en una aerolínea: en FY27-FY28 el combustible caro aprieta y la entrega del MAX 10 todavía no está certificada.',

  narrativas: {
    Bajista: 'El petróleo sigue caro en 2027 sin coberturas (FY28 solo cubierto al 15 %) y las tarifas no lo trasladan: margen EBITDA del 18,5-20 % (por debajo del 19,9 % de FY25) y tráfico frenado por retrasos del MAX 10. Ya pasó en FY25 (tarifas −7 %) y en el 1T FY27.',
    Base: 'FY27-FY28 deprimidos por el combustible y la tarifa; desde FY29 el MAX 10 reduce el coste unitario y el tráfico crece un 4-4,5 % anual hacia 300 M de pasajeros en FY34.',
    Alcista: 'El combustible vuelve a 70-80 USD, los rivales débiles (Wizz) recortan capacidad y Ryanair repite los márgenes de FY26 (24 %) con un 1 punto más de crecimiento.',
  },
  escenarios_comentario: 'Asimetría del valor intrínseco favorable: el alcista vale 33,15 € (+37,2 %) y el bajista 17,40 € (−28,0 %), una asimetría de 1,33 veces. A 12 meses no: con la regla v3 el bajista (9,3x × 1,51 €) da 14,04 € (−40 %) y el alcista (12,1x × 2,33 €) 28,19 € (+18 %), porque la historia de múltiplos de Ryanair es corta y el alcista no puede pagar más que el base. Compensa a varios años, no a uno.',

  oj: {
    Bajista: 'Ventas de 16.734 M en FY29e (2 puntos menos de crecimiento) con un margen EBITDA del 19,5 %: EBIT de 1.757 M, 50 M de intereses de la caja, impuesto del 12,5 % y 1.044,7 M de acciones (sin recompras no anunciadas): 1,51 €. Combustible caro y tarifas bajas dos años seguidos.',
    Base: 'Ventas de 17.733 M en FY29e (+2,5 %, +5 % y +6 %) con un margen EBITDA del 22,5 %: EBIT de 2.394 M, +50 M de intereses de la caja, impuesto del 12,5 % y 1.044,7 M de acciones: 2,05 €. La fórmula cuadra con FY26 (2,12 € antes de excepcionales, con un impuesto real del 10 %).',
    Alcista: 'Ventas de 18.247 M en FY29e (+1 punto de crecimiento) con un margen del 24 %, el de FY26: EBIT de 2.737 M y beneficio de 2.439 M: 2,33 €.',
  },
  per_excluidos: 'Historia adelantada (precio de cierre ÷ BPA real del ejercicio siguiente, antes de excepcionales): FY2024 12,3x (17,89 € del 21-may-2024 ÷ 1,4549 € de FY25); FY2025 9,3x (19,66 € del 28-mar-2025 ÷ 2,12 € de FY26) [D19, D20, A1]. Excluidos FY2021-FY2023 (pérdidas y recuperación de la pandemia) y FY2026 (el BPA de FY27 aún no es real). Solo dos años: mediana y media larga de 10,8x, mínimo de 9,3x. Actual = 24,16 € ÷ 1,79 € (nuestro BPA de FY28e) = 13,5x. Comparables: mediana del PER de los próximos 12 meses de 7,3x.',
  diferencia_consenso: 'Nuestro BPA de FY27e (1,71 €) coincide con el consenso (1,72 €) y el de FY28e (1,79 €) queda un 10 % por debajo del de Erste (≈1,98 €), porque suponemos que el combustible poco cubierto mantiene el margen en el 21,5 % [D4, D6]. La diferencia grande está en el múltiplo: nuestro base (24,80 €) queda un 17,8 % por debajo del objetivo medio de seis analistas (30,17 €; de 26,10 a 33,52 €), que implica ≈14,7 veces nuestro BPA de FY29e. La regla v3 lleva el PER actual (13,5x) hacia la mediana de su historia adelantada (10,8x), que solo tiene dos años; los analistas pagan la calidad. Los objetivos han ido a la baja (RBC de 31 a 29 €) [D7].',
  objetivo12m_comentario: 'El objetivo a 12 meses (22,25 €, −6,3 % con dividendo; base de 24,80 €, +4,3 %) queda un 12 % por debajo del valor intrínseco (25,23 €). Cerrar la distancia exige que FY28 no sea peor que FY27: que el combustible baje o que se cubra a un precio mejor que 85 USD, y que la tarifa del invierno deje de caer. Los resultados del 1S FY27 (2-nov-2026) y la guía de FY27 en enero son las fechas. La tesis es a más de un año.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %. El DCF (27,47 €) es el método natural para una empresa con caja neta y un plan de flota conocido; los escenarios (25,59 € ponderado) recogen el riesgo del combustible; los comparables (12,56 €) pesan poco porque las demás aerolíneas tienen deuda, flotas arrendadas y márgenes de un dígito. Sin transacciones (no hay operaciones comparables con múltiplos publicados) ni suma de partes. Valor objetivo de 25,23 € (+4,4 %). La dispersión es grande: de 12,56 € (comparables) a 33,75 € (DCF con la prima del mercado). Con la prima implícita del mercado (4,2 %) la regla relativa daría Comprar (30,66 €, +26,9 %); la absoluta, Mantener: las reglas discrepan por la tasa, no por las cifras.',

  catalizadores: {
    items: [
      { fecha: '2026-11-02', evento: 'Resultados del 1S FY27', efecto: 'Tarifas del verano, coste del combustible no cubierto y primera pista del beneficio de FY27.', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Ene-2027', evento: 'Resultados del 3T FY27 y guía de beneficio de FY27', efecto: 'La dirección suele dar la horquilla del año con el 3T.', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Certificación y primeras entregas del B737-MAX 10', efecto: 'Condición del crecimiento a 300 M de pasajeros y del menor coste unitario.', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Coberturas de combustible de FY28 (hoy 15 % a 85 USD)', efecto: 'Cubrir a menor precio despejaría el riesgo principal de FY28 [A8].', probabilidad: 'Media', sentido: '+' },
      { fecha: 'May-2027', evento: 'Resultados de FY27 y nuevo programa de recompra', efecto: 'Con caja neta de ≈2.700 M, más recompras.', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'Recurso contra la multa de la AGCM (256 M)', efecto: 'Ryanair espera anularla; 85 M ya provisionados [A13].', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Combustible caro sin coberturas en FY28 (15 % cubierto a 85 USD)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−28 % (escenario bajista)', mitigante: 'Coberturas a 12-18 meses; rivales peor cubiertos recortan capacidad.', senal: 'Brent por encima de 90 USD al cierre de 2026 y coberturas de FY28 por debajo del 50 %.' },
      { riesgo: 'Guerra de tarifas o demanda débil', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % por cada 3 puntos de margen', mitigante: 'Coste unitario más bajo de Europa.', senal: 'Tarifa media del 1S FY27 por debajo de −5 %.' },
      { riesgo: 'Retrasos o problemas de certificación del MAX 10', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % (2 puntos menos de crecimiento)', mitigante: 'Más asientos en la flota actual; tarifas más altas por falta de oferta en todo el sector.', senal: 'Calendario de certificación de la FAA y recortes de la guía de tráfico.' },
      { riesgo: 'Regulación y fiscalidad (tasas al pasajero, comercio de emisiones, AGCM)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Traslada capacidad a países sin tasas.', senal: 'Nuevas tasas en Alemania, Italia o Reino Unido.' },
      { riesgo: "Dependencia de Michael O'Leary y gobierno (remuneración, voto limitado de no comunitarios)", tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Contrato hasta 2032 [C3].', senal: 'Votos en contra por encima del 40 % en la junta.' },
      { riesgo: 'Datos de núcleo de baja confianza en este informe', tipo: 'Análisis', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'n.d.', mitigante: 'Cifras cruzadas entre comunicados y prensa.', senal: 'Confirmar precio, balance y BPA con el 20-F.' },
    ],
    premortem: 'Octubre de 2029: la acción vale 14 €. La guerra con Irán se alargó y el petróleo se quedó por encima de 100 USD durante 2027; Ryanair había cubierto solo el 15 % de FY28 a 85 USD y el resto lo pagó caro. Para llenar los aviones bajó tarifas: el margen EBITDA cayó al 18 %, como en el 1T FY27 pero todo el año. Boeing retrasó el MAX 10 un año más y el tráfico se quedó en 215-220 M. El BPA de FY29 fue de 1,4 €, y el mercado, que había pagado 13,5 veces un beneficio que esperaba recuperar, pasó a pagar 9-10 veces, como en marzo de 2025. La caja neta evitó lo peor, pero se gastó en aviones y no en recompras. La señal estaba en las coberturas de FY28 y en la tarifa del 1S FY27: si a noviembre de 2026 la tarifa seguía cayendo y el combustible no se cubría por debajo de 85 USD, el ciclo malo ya había empezado.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Combustible', pregunta: '¿Qué porcentaje de FY28 tiene cubierto hoy y a qué precio?', por_que: 'Es el riesgo principal del BPA de FY28 (15 % a 85 USD en julio) [A8].' },
      { tema: 'Tarifas', pregunta: '¿Cómo vienen las tarifas del invierno frente al año pasado?', por_que: 'La tarifa del 1T cayó un 6 % y mueve el margen más que el volumen.' },
      { tema: 'Flota', pregunta: '¿Cuándo espera la certificación y las primeras entregas del MAX 10?', por_que: 'El plan de 300 M de pasajeros depende de ello.' },
      { tema: 'Capital', pregunta: '¿Qué hará con la caja neta de ≈2.700 M: recompras, dividendo extraordinario o pago de aviones?', por_que: 'Más del 10 % de la capitalización.' },
      { tema: 'Regulación', pregunta: '¿Qué base tiene el recurso contra la multa de la AGCM y por qué provisionó solo un tercio?', por_que: 'Excepcional de 85 M en FY26 [A13].' },
      { tema: 'Remuneración', pregunta: '¿Por qué el umbral de 42 € por acción y no uno relativo al sector?', por_que: 'Voto en contra del 39 % [C1].' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [
    { seccion: 'dcf', campo: 'beta de la acción', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) proveedores de datos (no abren); 3) estimación propia de aerolínea con caja neta (1,1)', decision: 'Calculado y marcado como estimación' },
  ],
};
