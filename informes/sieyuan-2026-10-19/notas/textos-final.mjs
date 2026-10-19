// Textos finales del analista (Sieyuan Electric, corte 2026-10-19): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.93, multiplo: null, precio: null, justificacion: 'Las reglas de EE. UU. cierran ese mercado y la demanda china se frena: ventas de 2027e +14 % y 2028e +9 % (33.190 M) con margen EBITDA del 15,7 %: EBIT ≈ 4.650 M, resultado financiero +130 M, impuestos del 14 % y minoritarios del 5,5 %: beneficio ≈ 3.880 M sobre 786,6 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 6.44, multiplo: null, precio: null, justificacion: 'Ventas de 36.860 M (+20 % en 2027e y +15 % en 2028e) y margen EBITDA del 18,2 %: EBITDA de 6.710 M, amortización de 630 M, resultado financiero de +150 M (caja neta de ≈ 7.300 M), impuestos del 14 % y minoritarios del 5,5 % (Toshiba pasa al 30 % de Sieyuan Toshiba): beneficio ≈ 5.060 M. Cuadra con 2025: EBIT de 3.632 M + 87 M financieros − 459 M de impuestos − 110 M de minoritarios = 3.150 M.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 7.64, multiplo: null, precio: null, justificacion: 'Exportaciones y centros de datos tiran más: ventas de 40.060 M (+25 % y +20 %) con margen EBITDA del 19,7 %: beneficio ≈ 6.010 M, todavía un 15 % por debajo del consenso de 2028e (9,01 CNY).' },
  ],
  per_historico: {
    base: 'adelantado', actual: 21.72, mediana_5a: 19.3, minimo_5a: 18.13, media_larga: 22.13,
    excluidos: 'Historia adelantada (precio de cierre de cada año ÷ BPA diluido real del año siguiente): 2021 49,21 ÷ 1,59 = 30,9 (fuera: burbuja de las nuevas energías, como en la nota D); 2022 38,22 ÷ 2,02 = 18,9; 2023 52,04 ÷ 2,64 = 19,7; 2024 72,70 ÷ 4,01 = 18,1; 2025 154,59 ÷ 4,86 (nuestro BPA de 2026e) = 31,8. Mediana 19,3, mínimo 18,1 y media 22,1 (2022-2025). PER actual: 125,10 ÷ 5,76 (nuestro BPA de 2027e) = 21,7.',
    v2: { mediana_5a: 26.65, minimo_5a: 24.04, media_larga: 28.98, excluidos: 'Al cierre (precio ÷ BPA del mismo año): 2021 31,3 (fuera, burbuja); 2022 24,0; 2023 25,8; 2024 27,5; 2025 38,6.' },
  },
  comparables_per: { mediana: 18.6 },
  consenso: { bpa_ano1: 5.18, bpa_ano2: 7.03, objetivo_medio: 209.54, objetivo_min: 142.0, objetivo_max: 266.0, analistas: 12, tendencia_3m: 'recortes', fuente: 'MarketScreener (estimaciones y objetivos, 19-oct-2026), Soochow y UBS [D2, D3, D4, D10]' },
  diferencia_consenso: 'Nuestro BPA de 2027e (5,76) queda un 18 % por debajo del consenso (7,03) y el de 2028e (6,44), un 29 % por debajo (9,01) [D2]. La diferencia es de ventas, no de margen: el consenso espera 36.420 M en 2027e y 46.216 M en 2028e (+29 % anual), con un margen EBITDA del 18,8-18,9 %; nosotros 32.050 M y 36.858 M con un margen del 18,5 % y el 18,2 %. Frenamos más porque la red china crece al 1-5 %, EE. UU. se cierra y la propia empresa solo espera +25 % de ventas en 2026 [B8, B3, D16]. El precio base (132,02 CNY) queda un 37 % por debajo del objetivo medio de los analistas (209,54), que llevan seis meses recortando [D3].',
  media: null,
  comentario: 'El objetivo a 12 meses (ponderado 128,43 CNY; base 132,02) apenas supera el precio: rentabilidad del 3,2 % ponderada y del 6,1 % en el base, con el dividendo. El PER actual (21,7 veces nuestro BPA de 2027e) ya está por encima de la mediana adelantada de 2022-2025 (19,3), así que el base no gana por múltiplo: todo sale del crecimiento del beneficio (+12 % de 2027e a 2028e). El valor intrínseco (101,38 CNY) queda por debajo del precio, lo que impide comprar aunque el objetivo a 12 meses fuera mejor. El control v2 (PER al cierre, mediana de 26,7 veces) daría un base más alto, pero esa historia mide años de beneficio creciente al 30 % y el selector no la elige.',
};


const riesgos = {
  items: [
    { riesgo: 'Exclusión de los equipos chinos de alta tensión en EE. UU. y contagio a la UE', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−20 % a −30 % (escenario bajista: 65,96 CNY en el DCF)', mitigante: 'La exportación (29,5 % de las ventas del 1S26) va sobre todo a Europa, Oriente Medio, África y Latinoamérica; fábricas fuera de China en estudio [A6, B10].', senal: 'Reglas del DOE (antes del 24-dic-2026) o una propuesta de la UE sobre equipos de red de países de alto riesgo' },
    { riesgo: 'Frenazo de la inversión de State Grid y guerra de precios en las licitaciones', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % por cada 2 puntos de margen EBITDA', mitigante: 'Ultra alta tensión y red de Southern Grid, donde Sieyuan gana cuota; pedidos de 2025 de 28.891 M [A1, B8].', senal: 'Margen bruto del grupo por debajo del 28 % en un trimestre (30,2 % en 2025)' },
    { riesgo: 'Fin de la escasez mundial de transformadores', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'La aparamenta (GIS) pesa más que los transformadores (8.935 M frente a 4.633 M en 2025) [A1].', senal: 'Caída del margen bruto de transformadores por debajo del 32 % (36,4 % en 2025)' },
    { riesgo: 'Yuan fuerte y pérdidas de cambio por las cuentas a cobrar en dólares', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 % a −4 %', mitigante: 'Coberturas parciales y caja neta de ≈ 7.300 M [A6].', senal: 'Pérdidas de cambio por encima de 200 M en un semestre' },
    { riesgo: 'Circulante y cobro de la exportación y el EPC', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Anticipos de clientes de 3.829 M y clientes muy repartidos (el mayor, 2,4 % de las ventas) [A6, A1].', senal: 'Deterioro de créditos por encima de 300 M al año (209 M en 2025)' },
    { riesgo: 'Venta continuada del inversor de Stock Connect y nueva salida a Hong Kong', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 % a −10 % en el precio, sin efecto en el valor', mitigante: 'La empresa no necesita la caja; la solicitud de Hong Kong caducó [C6, C9, C10].', senal: 'Participación de HKSCC por debajo del 17 % o nueva solicitud en HKEX' },
    { riesgo: 'Sucesión y concentración del poder', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Fundadores en el cargo desde 1993, equipo directivo estable [C1, C2].', senal: 'Salida del presidente o venta de los fundadores (aviso de venta en CNINFO) [C11]' },
  ],
  premortem: 'Octubre de 2029: Sieyuan vale un 40 % menos. Lo que pasó: el DOE publicó en diciembre de 2026 reglas que excluían los equipos chinos de 69 kV o más, y en 2027 la UE aprobó un régimen parecido para los equipos de red «de alto riesgo». Los pedidos de exportación, que eran la mitad del crecimiento, se quedaron en Oriente Medio, África y Latinoamérica, donde compiten el resto de fabricantes chinos. En China, State Grid mantuvo la inversión plana y las licitaciones bajaron de precio; a la vez, la capacidad nueva de transformadores en Corea, Europa y EE. UU. acabó con la escasez. El margen EBITDA volvió al 14 % de 2022 y el mercado pasó a pagar 15 veces el beneficio, como a XJ Electric. Lo que habríamos visto antes: el margen bruto trimestral bajando del 28 % y los pedidos de exportación creciendo menos que las ventas.',
  ia: {
    exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: '+0 % a +5 %',
    comentario: 'Sieyuan vende equipos físicos de alta tensión fabricados bajo pedido: la IA no sustituye el producto, el cliente (eléctricas por licitación) ni la fabricación. Le favorece por la demanda: los centros de datos de IA tiran de la inversión en redes en EE. UU., Europa y China, y la empresa ya vende supercondensadores y transformadores a ese segmento, que Soochow cita como segundo motor de crecimiento [A14, B1]. Le perjudica poco: la IA puede abaratar el diseño de protección y automatización (12 % de las ventas), donde la empresa compite con software. La oportunidad está limitada porque EE. UU., el mayor mercado de centros de datos, le cierra la puerta [B3]. Señal: pedidos de centros de datos con cifra en los informes semestrales.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '24-oct-2026', evento: 'Informe del 3T26', efecto: 'Ventas, margen y anticipos del trimestre; el 2T26 creció un 8 % en beneficio y los analistas esperan el 2S de entregas de exportación [D9, A15]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'antes del 24-dic-2026', evento: 'Reglas del DOE de la orden 14420', efecto: 'Concretan la exclusión de los equipos chinos de 69 kV o más en EE. UU. [D18]', probabilidad: 'Alta', sentido: '−' },
    { fecha: 'nov-2026 a mar-2027', evento: 'Licitaciones centralizadas de State Grid y presupuesto de inversión de la red de 2027', efecto: 'Precio y volumen de la aparamenta y los transformadores en China [B8]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'abr-2027', evento: 'Resultados de 2026, dividendo y objetivos de pedidos de 2027', efecto: 'El objetivo de pedidos marca el crecimiento de 2027-2028 (2026: 37.500 M, +30 %) [D16]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027 (sin fecha)', evento: 'Nueva solicitud de salida a bolsa en Hong Kong', efecto: 'Dilución y posible descuento de la acción H [C8, C9]', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'EE. UU.', pregunta: '¿Qué parte de las ventas y de los pedidos de 2025-2026 va a EE. UU. o a clientes que reexportan allí, y qué plan hay si el DOE excluye los equipos chinos de 69 kV o más?', por_que: 'La empresa no desglosa EE. UU.; es la diferencia entre el base y el bajista.' },
    { tema: 'Pedidos de 2026', pregunta: '¿Cómo van los pedidos frente al objetivo de 37.500 M y qué parte es exportación?', por_que: 'El crecimiento de 2027e (+20 %) depende de ellos.' },
    { tema: 'Precios de licitación', pregunta: '¿Cómo han evolucionado los precios de GIS y transformadores en las licitaciones de State Grid de 2026 frente a 2025?', por_que: 'El margen de 2025 puede ser un pico.' },
    { tema: 'Sieyuan Toshiba', pregunta: '¿Cuánto beneficio aportaba Sieyuan Toshiba y por qué no se renegoció la opción de Toshiba (20 % por 100 CNY)?', por_que: 'Explica parte de la desaceleración del beneficio atribuido en 2026.' },
    { tema: 'Hong Kong', pregunta: '¿Se volverá a pedir la salida a bolsa en Hong Kong y para qué, con 7.300 M de caja neta?', por_que: 'Dilución sin necesidad de caja.' },
    { tema: 'Reparto', pregunta: '¿Por qué el dividendo se queda en el 17 % del beneficio y la recompra de 2025 no se ejecutó?', por_que: 'La caja neta crece y rinde menos del 2 %.' },
    { tema: 'Capacidad exterior', pregunta: '¿Habrá fábricas fuera de China (Europa, Oriente Medio, México) para sortear restricciones de origen?', por_que: 'Es la defensa frente al proteccionismo.' },
  ],
  confianza: 'Media',
};

const sintesis = `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 128,43 CNY (ponderado) y 132,02 CNY en el caso base, frente a un precio de 125,10 CNY: la rentabilidad a 12 meses, con el dividendo, es del 3,2 % ponderada y del 6,1 % en el base, lejos del 15 % que pide comprar y del −10 % que haría vender. El valor intrínseco (101,38 CNY) queda un 19,0 % por debajo del precio. Los analistas (objetivo medio de 209,54 CNY) esperan un 29 % más de beneficio en 2028e que nosotros. La convicción es media porque las dos reglas coinciden y la rentabilidad está lejos de los umbrales; bajaría si la UE sigue a EE. UU. y subiría si el precio cae por debajo de 101 CNY.

**El negocio.** Sieyuan es un fabricante privado de equipos de alta tensión (aparamenta GIS, transformadores, protección, compensación) que vende por licitación a las redes chinas y a eléctricas de más de 100 países [B1]. Gana dinero de verdad: ROIC del 44,2 % en 2025 frente a un WACC del 8,09 %, margen EBITDA del 18,3 % frente a una mediana del 14,2 % de los comparables, y crecimiento de las ventas del 25,4 % anual en 2021-2025 sin compras relevantes [A1]. La sostenibilidad del crecimiento es «Sí»: proyectar un 13,5 % anual exige que el capital nuevo rinda un 38,6 %, por debajo del actual, aunque la cuota mundial pasaría del 0,8 % al 1,3 %, el punto más exigente.

**Sector y ciclo.** La inversión de la red china se frena (+5,1 % en 2025 y ≈ +1 % la de State Grid en 7M26) y la exportación, que llevaba el crecimiento, choca con la orden 14420 de EE. UU. (26-ago-2026), cuyas reglas llegan antes del 24-dic [B2, B8, B3].

**Finanzas.** Caja neta ajustada de 6.787 M tras el dividendo de julio. El flujo operativo convierte solo el 71 % del beneficio en 2025 porque las cuentas a cobrar de la exportación y el EPC crecen más que las ventas [A1, A6]. El beneficio del 1S26 creció un 13,2 % con ventas +27 %: pérdidas de cambio y la salida del 20 % de Sieyuan Toshiba [A9, A10].

**Valoración.** El DCF da 96,30 CNY (WACC del 8,09 %, terminal del 1 %, 74 % del valor en el terminal). El precio descuenta un crecimiento del 22,1 % anual en 2027-2031e frente a nuestro 11,4 %, y una rentabilidad implícita del 6,4 %, por debajo del WACC. Con la prima implícita del mercado (4,2 %) el valor sería de 117,51 CNY, todavía por debajo del precio. El PER de los próximos doce meses con el consenso (18,8) está en la mediana de los comparables (18,6), pero con nuestro BPA de 2027e es de 21,7, por encima de su mediana adelantada (19,3). Discrepamos del consenso en ventas, no en márgenes.

**Riesgos y catalizadores.** El riesgo dominante es la exclusión en EE. UU. y su contagio a Europa: el bajista (65,96 CNY en el DCF, −47,3 %) lo recoge con un margen 2,5 puntos más bajo. Le siguen los precios de las licitaciones de State Grid y el fin de la escasez de transformadores. Catalizadores: el 3T26 el 24-oct y las reglas del DOE en diciembre. Los foros chinos están en capitulación y culpan al inversor de Stock Connect; no añaden un riesgo nuevo [E1].

**Qué cambiaría la decisión.** Compraríamos por debajo de 101,38 CNY y venderíamos por encima de 143,48 CNY. Subiríamos el caso base si el objetivo de pedidos de 2027 supera los 45.000 M con la exportación creciendo más del 30 %, y lo bajaríamos si el margen bruto trimestral cae por debajo del 28 % o si la UE propone excluir los equipos de red chinos.`;

const resumen = {
  recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis,
  tesis: 'Sieyuan es el tercer fabricante privado de equipos de transmisión y distribución de China (3,5 % del mercado en 2024) y uno de los pocos que exporta alta tensión con marca propia a más de 100 países [B5, B1]. Ha multiplicado las ventas por 2,5 y el beneficio por 2,6 en cuatro años sin deuda y sin compras, con un ROIC que sube del 20,8 % de 2022 al 44,2 % de 2025 y una caja neta de unos 6.800 M [A1, A6].\n\nEl precio (125,10 CNY) ha caído un 46 % desde el máximo de marzo, pero todavía descuenta un crecimiento del 22,1 % anual en 2027-2031e, cerca de lo que esperan los analistas, y cotiza a 21,7 veces nuestro BPA de 2027e. La caída corrige un exceso: a 239 CNY el mercado pagaba unas 40 veces el BPA de 2026e que esperaban entonces los analistas (5,89 CNY de Soochow en abril) [D3].\n\nPara invertir hay que creer que la exportación compensará a la vez el cierre de EE. UU. y una red china que crece poco, y que el margen de 2025 no es un pico. Nosotros creemos que la empresa seguirá creciendo, pero a la mitad del ritmo que descuenta el precio; con eso, la acción está algo cara y la rentabilidad a 12 meses (3,2 %) no compensa el riesgo regulatorio.',
  vision_diferencial: {
    mercado_descuenta: 'Que Sieyuan mantendrá un crecimiento cercano al 22 % anual hasta 2031e: el DCF inverso pide un 22,1 % frente a nuestro 11,4 %. Los analistas van más allá (+29 % anual de ventas hasta 2028e y objetivo medio de 209,54 CNY), aunque llevan seis meses recortando y UBS ya rebajó a neutral con 142 CNY.',
    nuestra_vision: 'La empresa es buena y seguirá ganando cuota, pero el crecimiento se frena a la mitad: la red china crece al 1-5 %, EE. UU. se cierra a los equipos chinos y el margen de 2025, con escasez de transformadores, no sube más. Base de 132,02 CNY a 12 meses y valor intrínseco de 101,38 CNY.',
    por_que: 'Los objetivos de la propia empresa para 2026 (ventas +25 %) ya están por debajo del consenso de 2027-2028, y la caída del 2T26 (+8 % de beneficio) muestra que el crecimiento no es lineal. Lo que más nos separa del mercado es la exportación: la damos por buena en Europa y emergentes, pero no en EE. UU.',
  },
  a_favor: [
    '**ROIC del 44,2 %** en 2025 frente a un WACC del 8,09 %, y subiendo desde el 20,8 % de 2022 [A1].',
    '**Caja neta ajustada de 6.787 M**, el 7 % de la capitalización, sin deuda relevante [A6].',
    '**Exportación del 29,5 %** de las ventas del 1S26, con entradas en Alemania, Portugal, Suecia, Finlandia e Irlanda [A1, A6].',
    '**Pedidos objetivo de 37.500 M en 2026** (+30 %) y anticipos de clientes de 3.829 M en junio [D16, A6].',
    '**Precio −46 % desde el máximo** de 52 semanas, con la caída explicada por hechos conocidos [D1].',
  ],
  en_contra: [
    '**Orden 14420 de EE. UU.**: reglas de exclusión de equipos chinos de 69 kV o más antes del 24-dic-2026 [D18].',
    '**Red china casi plana**: inversión de State Grid ≈ +1 % en 7M26 [B8].',
    '**El precio pide un 22,1 % de crecimiento anual**, el doble de nuestro caso base.',
    '**Beneficio del 2T26 +8 %**, con pérdidas de cambio y la salida del 20 % de Sieyuan Toshiba [A9, A10].',
    '**Reparto bajo**: dividendo del 17 % del beneficio y recompra de 2025 sin ejecutar [A11, A16].',
  ],
  que_vigilar: 'La tesis depende de que la exportación siga creciendo fuera de EE. UU. mientras la red china se frena. La señal está en los pedidos y en el margen: si el objetivo de pedidos de 2027 crece menos del 15 % o el margen bruto trimestral baja del 28 %, el caso base sobra; si la UE propone excluir equipos chinos de red, el bajista pasa a ser el central.',
  cambiaria_recomendacion: [
    'Precio por debajo de 101,38 CNY: pasaría a Comprar (valor intrínseco por encima del precio y rentabilidad a 12 meses ≥ 15 %).',
    'Precio por encima de 143,48 CNY: pasaría a Vender.',
    'Objetivo de pedidos de 2027 por encima de 45.000 M con exportación +30 %: subiríamos el caso base.',
    'Margen bruto del grupo por debajo del 28 % en un trimestre: bajaríamos el margen de toda la proyección.',
    'Propuesta de la UE para excluir equipos de red chinos: el bajista pasaría a ser el caso central.',
  ],
  kpis_seguimiento: [
    { kpi: 'Pedidos del año (objetivo y real)', nivel_actual: '28.891 M en 2025; objetivo de 37.500 M en 2026', umbral_alerta: 'Pedidos de 2027 < +15 %', por_que: 'Visibilidad de las ventas de un año.' },
    { kpi: 'Margen bruto del grupo', nivel_actual: '30,2 % (2025)', umbral_alerta: '< 28 % en un trimestre', por_que: 'Precios de licitación y escasez de transformadores.' },
    { kpi: 'Peso de la exportación', nivel_actual: '29,5 % (1S26)', umbral_alerta: 'Crecimiento de la exportación < 15 %', por_que: 'Motor del crecimiento.' },
    { kpi: 'Anticipos de clientes', nivel_actual: '3.829 M (jun-26)', umbral_alerta: 'Caída interanual', por_que: 'Indicador adelantado de los pedidos.' },
    { kpi: 'Participación de HKSCC (Stock Connect)', nivel_actual: '19,86 % (jun-26)', umbral_alerta: '< 17 %', por_que: 'Presión vendedora del inversor extranjero.' },
  ],
  confianza: 'Media',
};

export default {
  objetivo_12m, riesgos, catalizadores, preguntas, resumen,
  dcf_lectura: 'El DCF da 96,30 CNY por acción, un 23,0 % menos que el precio, con un WACC del 8,09 % y un crecimiento terminal del 1 %; el valor terminal pesa el 74 %. El DCF inverso dice que el precio de 125,10 CNY descuenta un crecimiento del 22,1 % anual en 2027-2031e frente a nuestro 11,4 %, o un margen EBITDA terminal del 22 % frente a nuestro 17,5 %, y una rentabilidad implícita del 6,4 %, por debajo del WACC. Frente a la historia, nuestro base no es pesimista: Sieyuan creció un 25,4 % anual en 2021-2025, pero con la red china en expansión y EE. UU. abierto; ninguna de las dos cosas sigue igual.',
  escenarios_comentario: 'La asimetría es desfavorable: el alcista (120,74 CNY, −3,5 %) no llega al precio y el bajista (65,96 CNY, −47,3 %) pierde casi la mitad, con probabilidades de 25/50/25. El bajista no es extremo: crecimiento 6 puntos menor y margen 2,5 puntos más bajo, como en 2022 [A1]. El alcista supone un crecimiento cercano al del consenso. El valor ponderado de los escenarios (94,83 CNY) queda un 24,2 % por debajo del precio.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF y los escenarios recogen el crecimiento, los márgenes y la caja; los comparables pesan menos porque mezclan estatales chinas con márgenes de la mitad (XJ, Pinggao, TBEA) y coreanas con acceso a EE. UU. (HD Hyundai, Hyosung, LS) [D7]. Sin transacciones con múltiplo publicado y sin suma de partes. El PER de los próximos doce meses de los comparables da 123,88 CNY (con el BPA del consenso) y el EV/EBITDA de los últimos doce meses 102,09 CNY, por encima del DCF (96,30): el mercado paga a todo el sector por un crecimiento que nuestro DCF no da. El puente parte de la caja de junio de 2026 (8.190 M) y resta el dividendo pagado en julio (548 M) como otro ajuste [A6, A11].',
};
