// Textos finales del analista (Sieyuan Electric, corte 2026-10-26): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.75, multiplo: null, precio: null, justificacion: 'Las reglas de EE. UU. cierran ese mercado, Europa endurece el acceso y las licitaciones chinas bajan de precio: ventas de 2027e +14 % y 2028e +9 % (33.857 M) con margen EBITDA del 15,0 %: EBIT ≈ 4.500 M, resultado financiero +130 M, impuestos del 14 % y minoritarios del 6 %: beneficio ≈ 3.745 M sobre 787,9 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 6.23, multiplo: null, precio: null, justificacion: 'Ventas de 37.601 M (+20 % en 2027e y +15 % en 2028e) y margen EBITDA del 17,5 %: EBIT de 5.941 M, resultado financiero de +130 M (caja neta de ≈ 7.400 M), impuestos del 14 % y minoritarios del 6 % (Toshiba tiene el 30 % de Sieyuan Toshiba desde julio): beneficio ≈ 4.908 M. Cuadra con 2025: EBIT de 3.632 M + 87 M financieros − 459 M de impuestos − 110 M de minoritarios = 3.150 M. 2026e: 4,41 CNY (9M26 3,04 + un 4T de 1,37, +11 %).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 7.39, multiplo: null, precio: null, justificacion: 'La exportación (América y Europa) y los centros de datos tiran más: ventas de 40.870 M (+25 % y +20 %) con margen EBITDA del 19,0 %: beneficio ≈ 5.820 M, todavía un 11 % por debajo del consenso posterior al 3T26 para 2028e (8,26 CNY).' },
  ],
  per_historico: {
    base: 'adelantado', actual: 19.38, mediana_5a: 19.32, minimo_5a: 18.13, media_larga: 22.95,
    excluidos: 'Historia adelantada (precio de cierre de cada año ÷ BPA diluido contable del año siguiente, la misma base que los casos): 2021 49,21 ÷ 1,59 = 30,9 (fuera: burbuja de las nuevas energías, como en la nota D); 2022 38,22 ÷ 2,02 = 18,9; 2023 52,04 ÷ 2,64 = 19,7; 2024 72,70 ÷ 4,01 = 18,1; 2025 154,59 ÷ 4,41 (nuestro BPA de 2026e) = 35,1. Mediana 19,3, mínimo 18,1 y media 23,0 (2022-2025). PER actual: 106,81 ÷ 5,51 (nuestro BPA de 2027e) = 19,4.',
  },
  comparables_per: { mediana: 19.0 },
  consenso: { bpa_ano1: 4.61, bpa_ano2: 6.31, objetivo_medio: 209.54, objetivo_min: 142.0, objetivo_max: 266.0, analistas: 12, tendencia_3m: 'recortes', fuente: 'BPA: media de Soochow, Guosen y Sinolink tras el 3T26; objetivos: MarketScreener (12 analistas, sin actualizar tras el 3T26; Yahoo da 205,32 con 9) [D22, D23, D24, D2, D1]' },
  diferencia_consenso: 'Nuestro BPA de 2027e (5,51) queda un 13 % por debajo del consenso posterior al 3T26 (6,31) y el de 2028e (6,23), un 25 % por debajo (8,26) [D22, D23, D24]. La diferencia es de ventas: las tres casas esperan 35.283 M en 2027e y 44.090 M en 2028e (+27 % y +25 %); nosotros 32.696 M y 37.601 M. Frenamos más porque las ventas ya crecen menos que los pedidos (proyectos más largos), la red china crece a un dígito y el caso base sigue dando EE. UU. por perdido aunque la empresa diga lo contrario [A22, B2, B3]. El margen EBITDA (17,5-17,6 %) es parecido al suyo (≈ 18-19 %). El precio base queda muy por debajo del objetivo medio de los analistas (209,54), que es anterior a los resultados y lleva meses bajando [D2, D3].',
  media: null,
  comentario: 'El objetivo a 12 meses queda por encima del precio porque el PER actual (19,4 veces nuestro BPA de 2027e) ya está en la mediana adelantada de 2022-2025 (19,3) y todo el recorrido sale del crecimiento del beneficio de 2027e a 2028e (+13 %). El valor intrínseco queda por debajo del precio: el DCF con un WACC del 8 % y un terminal del 1 % no paga los múltiplos a los que cotiza el sector en China, con el bono al 1,64 %. La distancia se cerraría si el beneficio vuelve a crecer al ritmo de las ventas (cambio y mezcla) o si el precio baja.',
};


const riesgos = {
  items: [
    { riesgo: 'Exclusión de los equipos chinos de alta tensión en EE. UU. y contagio a la UE', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % a −30 % (escenario bajista: 64,99 CNY en el DCF)', mitigante: 'La empresa dice que sus equipos (bobinados y estructura, sin hardware programable) deberían quedar fuera y que las entregas siguen; Europa-Oriente Medio y África pesan más que América [A22].', senal: 'Reglas del DOE (antes del 24-dic-2026) o una propuesta de la UE sobre equipos de red de países de alto riesgo' },
    { riesgo: 'Mezcla y margen: el almacenamiento de bajo margen crece más que el resto', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % por cada 2 puntos de margen EBITDA', mitigante: 'El margen del almacenamiento mejoró en el 3T26 (exterior y litio más barato) y la empresa promete un margen bruto parecido al de 2025 (30,7 %) [A22].', senal: 'Margen bruto del grupo por debajo del 29 % en un trimestre (30,9 % en el 3T26)' },
    { riesgo: 'Ventas que no siguen a los pedidos: existencias en tránsito y aceptación lenta', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Anticipos de clientes de 4.409 M (+52 %); 4T, trimestre de entregas [A17, A22].', senal: 'Existencias por encima de 7.000 M en diciembre o ventas de 2026 por debajo de 27.000 M' },
    { riesgo: 'Frenazo de la inversión de la red china y guerra de precios en las licitaciones', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'GIS de 1.000 kV homologado por State Grid y capacidad de 500-750 kV ampliada [A22, B11].', senal: 'Inversión de la red de 2027 por debajo de la de 2026 o caída del margen de aparamenta' },
    { riesgo: 'Yuan fuerte y pérdidas de cambio por las cuentas a cobrar en divisa', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−2 % a −4 %', mitigante: 'Coberturas a plazo (con un coste por el descuento a plazo) y caja neta de ≈ 7.400 M [A22, A17].', senal: 'Gastos financieros por encima de 250 M en el año (144 M en 9M26)' },
    { riesgo: 'Venta continuada del inversor de Stock Connect y nueva salida a Hong Kong', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 % a −10 % en el precio, sin efecto en el valor', mitigante: 'La empresa no necesita la caja; la solicitud de Hong Kong caducó [C13, C9, C10].', senal: 'Participación de HKSCC por debajo del 15 % o nueva solicitud en HKEX' },
    { riesgo: 'Sucesión y concentración del poder', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Fundadores en el cargo desde 1993, equipo directivo estable [C1, C2].', senal: 'Salida del presidente o venta de los fundadores (aviso de venta en CNINFO) [C11]' },
  ],
  premortem: 'Octubre de 2029: Sieyuan vale un 40 % menos. Lo que pasó: el DOE publicó en diciembre de 2026 reglas que excluían también los transformadores y la aparamenta chinos, y en 2027 la UE aprobó un régimen parecido para los equipos de red «de alto riesgo». Los pedidos de América, que en 2026 eran los que más crecían, se cayeron, y los de Europa se frenaron. En China, la inversión de la red se quedó plana y las licitaciones bajaron de precio; la capacidad nueva de transformadores en Corea, Europa y EE. UU. acabó con la escasez. Mientras tanto, el almacenamiento siguió ganando peso con márgenes del 12 %. El margen EBITDA volvió al 14 % de 2022 y el mercado pasó a pagar 15 veces el beneficio, como a XJ Electric. Lo que habríamos visto antes: el margen bruto trimestral bajando del 29 %, existencias creciendo más que las ventas dos trimestres seguidos y pedidos de exportación por debajo de las ventas.',
  ia: {
    exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: '+0 % a +5 %',
    comentario: 'Sieyuan vende equipos físicos de alta tensión fabricados bajo pedido: la IA no sustituye el producto, el cliente (eléctricas por licitación) ni la fabricación. Le favorece por la demanda: los centros de datos de IA tiran de la inversión en redes, y la empresa vende supercondensadores (armarios que amortiguan los picos de carga, con la capacidad llena según Soochow) y transformadores a ese segmento [A18, B12]. Le perjudica poco: la IA puede abaratar el diseño de protección y automatización (12 % de las ventas), donde compite con software. La oportunidad tiene un límite en EE. UU., el mayor mercado de centros de datos, por la orden 14420 [B3]. Señal: pedidos de supercondensadores con cifra o una ampliación de capacidad anunciada.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: 'antes del 24-dic-2026', evento: 'Reglas del DOE de la orden 14420', efecto: 'Dicen si los transformadores y la aparamenta sin control propio quedan fuera de la exclusión en EE. UU. [D18, A22]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'mediados de ene-2027', evento: 'Avance de resultados de 2026 (业绩快报)', efecto: 'Confirma si se cumple el objetivo de ventas (+25 %) y cuánto beneficio deja el 4T [D14, A22]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'nov-2026 a mar-2027', evento: 'Licitaciones centralizadas de State Grid y presupuesto de inversión de la red de 2027', efecto: 'Precio y volumen de la aparamenta y los transformadores en China; posible primera adjudicación de GIS de 1.000 kV [B11, A22]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'abr-2027', evento: 'Resultados de 2026, dividendo y objetivos de pedidos de 2027', efecto: 'El objetivo de pedidos marca el crecimiento de 2027-2028 (2026: 37.500 M, +30 %) [D16]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'jul-ago-2027', evento: 'Prueba de producción de la fábrica de transformadores de ultra alta tensión de Changzhou', efecto: 'Capacidad para los proyectos largos que ya acepta [A22]', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027 (sin fecha)', evento: 'Nueva solicitud de salida a bolsa en Hong Kong', efecto: 'Dilución y posible descuento de la acción H [C8, C9]', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'EE. UU.', pregunta: '¿Qué parte de las ventas y de los pedidos de 2026 va a EE. UU., y por qué la empresa cree que sus transformadores y su aparamenta quedarán fuera de la orden 14420?', por_que: 'En agosto el negocio en EE. UU. era «muy pequeño» y en octubre Norteamérica es lo que más crece; es la diferencia entre el base y el bajista.' },
    { tema: 'Pedidos y ventas', pregunta: '¿Cuánto suman los pedidos de 9M26 y qué parte del aumento de existencias (2.363 M desde diciembre) son envíos al exterior sin aceptar?', por_que: 'El crecimiento de 2027e (+20 %) depende de que las ventas alcancen a los pedidos.' },
    { tema: 'Margen', pregunta: '¿Qué margen bruto tienen hoy el almacenamiento y el EPC, y qué peso tendrán en 2027?', por_que: 'La mezcla explica la caída del margen del 3T26 (−2,4 puntos).' },
    { tema: 'Cambio', pregunta: '¿Qué parte de las cuentas a cobrar está en divisa y cuánto cuesta cubrirla con el descuento a plazo?', por_que: 'Los gastos financieros pasaron de −35 M a 144 M en 9M26.' },
    { tema: 'Sieyuan Toshiba', pregunta: '¿Cuánto beneficio aportaba Sieyuan Toshiba y por qué no se renegoció la opción de Toshiba (20 % por 100 CNY)?', por_que: 'Los minoritarios se doblaron en 9M26 (162 M frente a 80 M).' },
    { tema: 'Hong Kong y reparto', pregunta: '¿Se volverá a pedir la salida a bolsa en Hong Kong, con 7.400 M de caja neta, y por qué el dividendo se queda en el 17 % del beneficio?', por_que: 'Dilución sin necesidad de caja y caja que rinde menos del 2 %.' },
    { tema: 'Capacidad exterior', pregunta: '¿Habrá fábricas fuera de China (Europa, Oriente Medio, México) para sortear restricciones de origen?', por_que: 'Es la defensa frente al proteccionismo; en agosto la empresa lo estudiaba «con prudencia» [A23].' },
  ],
  confianza: 'Media',
};

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 121,02 CNY (ponderado) y 120,24 CNY en el caso base, frente a un precio de 106,81 CNY: la rentabilidad a 12 meses, con el dividendo, es del 14,0 % ponderada y del 13,2 % en el base, a un punto del 15 % que pide comprar. Lo que impide comprar es el valor intrínseco (98,09 CNY), un 8,2 % por debajo del precio. Los analistas (objetivo medio de 209,54 CNY, anterior a los resultados) esperan un 25 % más de BPA en 2028e. La convicción es baja porque la rentabilidad ponderada está a menos de 3 puntos del umbral y las reglas del valor intrínseco discrepan (absoluta Vender, relativa Mantener); subiría con un precio por debajo de 98,09 CNY o si las reglas del DOE dejan fuera los transformadores.

**Qué ha cambiado desde el 19-oct.** El precio bajó un 14,6 % (de 125,10 a 106,81 CNY): un límite a la baja el 20-oct por miedo al 3T26 y un 3T26 flojo en beneficio (+4,5 %) aunque fuerte en ventas (+30,7 %) [D25, A17]. Subimos las ventas de 2026e (+26,5 %) y bajamos su margen EBITDA (17,6 %) por la mezcla; el BPA de 2028e baja de 6,44 a 6,23. Con el precio más bajo, la rentabilidad a 12 meses pasa del 3,3 % al 14,0 % y la del base del 6,1 % al 13,2 %; el valor intrínseco baja de 101,38 a 98,09 CNY.

**El negocio.** Fabricante privado de equipos de alta tensión para redes chinas y de más de 100 países [B1]. ROIC del 44,2 % en 2025 frente a un WACC del 8,08 % y margen EBITDA del 18,3 % frente a una mediana del 14,2 % de los comparables [A1]. La sostenibilidad del crecimiento es «Sí»: los años que se mueven (2027e-2031e, +11,4 % anual) caben en lo que financia su ROIC (11,2 %), aunque la cuota mundial pasaría del 0,8 % al 1,3 %, el punto más exigente.

**Finanzas.** En 9M26 las ventas crecen un 28,5 % y el beneficio atribuido un 9,7 %: el margen EBIT baja del 18,4 % al 17,6 % por el almacenamiento, y debajo pesan el cambio (144 M de gastos financieros), 60 M de valor razonable y el 20 % de Sieyuan Toshiba que pasó a Toshiba [A17, A22]. Caja neta de 7.367 M [A17].

**Valoración.** El DCF da 94,66 CNY (WACC del 8,08 %, terminal del 1 %). El precio descuenta un crecimiento del 16,6 % anual en 2027-2031e frente a nuestro 11,4 %, y una rentabilidad implícita del 7,2 %, por debajo del WACC (8,08 %) pero por encima de lo que pide el mercado (6,8 %): con la prima implícita del mercado el valor sería de 113,93 CNY. El PER actual (19,4 veces nuestro BPA de 2027e) está en su mediana adelantada (19,3) y en la de los comparables (19,0): el recorrido a 12 meses sale del beneficio, no del múltiplo.

**Riesgos y catalizadores.** El riesgo dominante sigue siendo EE. UU. y su contagio a Europa: el bajista (64,99 CNY en el DCF, −39,2 %) lo recoge con un margen 2,5 puntos más bajo. La empresa dice ahora que Norteamérica es la región que más crece y que sus equipos quedarían fuera [A22]: las reglas del DOE antes del 24-dic deciden. Le siguen la mezcla y las ventas que no alcanzan a los pedidos. Los foros chinos están en capitulación y no añaden un riesgo nuevo [E1].

**Qué cambiaría la decisión.** Compraríamos por debajo de 98,09 CNY y venderíamos por encima de 135,24 CNY. Subiríamos el caso base si el DOE deja fuera los transformadores y la aparamenta o si las ventas de 2026 superan los 28.000 M; lo bajaríamos con un margen bruto trimestral bajo el 29 % o si la UE propone excluir equipos de red chinos.`;

const resumen = {
  recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis,
  tesis: 'Sieyuan es el tercer fabricante privado de equipos de transmisión y distribución de China (3,5 % del mercado en 2024) y uno de los pocos que exporta alta tensión con marca propia a más de 100 países [B5, B1]. Ha multiplicado las ventas por 2,5 y el beneficio por 2,6 en cuatro años sin deuda y sin compras, con un ROIC que sube del 20,8 % de 2022 al 44,2 % de 2025 y una caja neta de 7.367 M [A1, A17].\n\nEl precio (106,81 CNY) ha caído un 55 % desde el máximo de marzo y descuenta un crecimiento del 16,6 % anual en 2027-2031e, por encima de nuestro 11,4 % pero por debajo de lo que esperan los analistas (+27 % y +25 % en 2027e-2028e). Cotiza a 19,4 veces nuestro BPA de 2027e, en su mediana histórica adelantada y en la de los comparables [D22, D7].\n\nPara invertir hay que creer que las ventas alcanzarán a los pedidos (+30 % en 9M26) sin que el almacenamiento diluya más el margen, y que EE. UU. no cerrará la puerta a los transformadores. Nosotros creemos que la empresa seguirá creciendo, pero menos que los pedidos: la acción ya no está cara a 12 meses (+14,0 %), pero el valor intrínseco (98,09 CNY) sigue por debajo del precio.',
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento del 16,6 % anual hasta 2031e y una rentabilidad del 7,2 %. Los analistas van más allá (ventas +27 % y +25 % en 2027e-2028e) aunque recortaron el BPA un 11-16 % tras el 3T26; su objetivo medio (209,54 CNY) es anterior a los resultados.',
    nuestra_vision: 'La empresa es buena y seguirá ganando cuota, pero el beneficio crecerá menos que los pedidos: proyectos más largos, mezcla con más almacenamiento y un yuan fuerte. Base de 120,24 CNY a 12 meses y valor intrínseco de 98,09 CNY.',
    por_que: 'El 3T26 lo enseña: ventas +30,7 % y beneficio +4,5 %, con el margen bruto 2,4 puntos más bajo y las existencias +58 % [A17]. Donde podríamos quedarnos cortos es en EE. UU.: la empresa dice que Norteamérica es lo que más crece y que sus equipos quedarían fuera de la orden [A22].',
  },
  a_favor: [
    '**ROIC del 44,2 %** en 2025 frente a un WACC del 8,08 %, y subiendo desde el 20,8 % de 2022 [A1].',
    '**Caja neta de 7.367 M**, el 9 % de la capitalización, sin deuda relevante [A17].',
    '**Pedidos de 9M26 por encima del +30 %** y anticipos de clientes de 4.409 M (+52 %) [A22, A17].',
    '**Precio −55 % desde el máximo** de 52 semanas, a 19,4 veces nuestro BPA de 2027e, en su mediana histórica [D1].',
    '**Rentabilidad a 12 meses del 14,0 %** ponderada, a un punto del umbral de compra.',
  ],
  en_contra: [
    '**Beneficio del 3T26 +4,5 %** con ventas +30,7 %: margen bruto −2,4 puntos por la mezcla [A17].',
    '**Valor intrínseco de 98,09 CNY**, un 8,2 % por debajo del precio.',
    '**Orden 14420 de EE. UU.**: reglas de exclusión de equipos chinos de 69 kV o más antes del 24-dic-2026 [D18].',
    '**Existencias +58 %** desde diciembre (6.442 M), con envíos al exterior sin aceptar [A17, A22].',
    '**Venta extranjera**: HKSCC baja del 19,86 % al 17,91 % en el 3T26 [C13].',
  ],
  que_vigilar: 'La tesis depende de que las ventas alcancen a los pedidos sin perder más margen y de que EE. UU. no cierre la puerta a los transformadores. Las señales: el avance de 2026 a mediados de enero (ventas por encima de 27.000 M y un 4T con margen), las existencias de diciembre y las reglas del DOE antes del 24-dic. Si el margen bruto trimestral baja del 29 % o la UE propone excluir equipos chinos, el bajista pasa a ser el central.',
  cambiaria_recomendacion: [
    'Precio por debajo de 98,09 CNY: pasaría a Comprar (valor intrínseco por encima del precio y rentabilidad a 12 meses ≥ 15 %).',
    'Precio por encima de 135,24 CNY: pasaría a Vender.',
    'Reglas del DOE que dejen fuera los transformadores y la aparamenta: subiríamos el crecimiento de 2027e-2028e.',
    'Margen bruto del grupo por debajo del 29 % en un trimestre: bajaríamos el margen de toda la proyección.',
    'Propuesta de la UE para excluir equipos de red chinos: el bajista pasaría a ser el caso central.',
  ],
  kpis_seguimiento: [
    { kpi: 'Ventas de 2026 (objetivo +25 %)', nivel_actual: '17.762 M en 9M26 (+28,5 %)', umbral_alerta: '< 27.000 M en el avance de enero', por_que: 'Mide si las ventas alcanzan a los pedidos.' },
    { kpi: 'Margen bruto del grupo', nivel_actual: '30,9 % (3T26); 30,6 % (9M26)', umbral_alerta: '< 29 % en un trimestre', por_que: 'Mezcla de almacenamiento y precios de licitación.' },
    { kpi: 'Existencias', nivel_actual: '6.442 M (sep-26, +58 % desde dic)', umbral_alerta: '> 7.000 M en diciembre', por_que: 'Envíos al exterior sin aceptar.' },
    { kpi: 'Anticipos de clientes', nivel_actual: '4.409 M (sep-26, +52 %)', umbral_alerta: 'Caída interanual', por_que: 'Indicador adelantado de los pedidos.' },
    { kpi: 'Participación de HKSCC (Stock Connect)', nivel_actual: '17,91 % (sep-26)', umbral_alerta: '< 15 %', por_que: 'Presión vendedora del inversor extranjero.' },
  ],
  confianza: 'Media',
};

export default {
  objetivo_12m, riesgos, catalizadores, preguntas, resumen,
  dcf_lectura: 'El DCF da 94,66 CNY por acción, un 11,4 % menos que el precio, con un WACC del 8,08 % y un crecimiento terminal del 1 %; el valor terminal pesa el 75 %. El DCF inverso dice que el precio de 106,81 CNY descuenta un crecimiento del 16,6 % anual en 2027-2031e frente a nuestro 11,4 %, o un margen EBITDA terminal del 18,9 % frente a nuestro 17,0 %, y una rentabilidad implícita del 7,2 %, por debajo del WACC y por encima de lo que pide el mercado (6,8 %). Es menos exigente que hace una semana (22,1 % a 125,10 CNY) y queda por debajo de lo que esperan los analistas. Frente a la historia, nuestro base no es pesimista: Sieyuan creció un 25,4 % anual en 2021-2025, pero con la red china en expansión y EE. UU. abierto; ninguna de las dos cosas sigue igual, y el 3T26 muestra que el beneficio ya no sigue a las ventas.',
  escenarios_comentario: 'La asimetría sigue siendo desfavorable en el DCF: el alcista (118,41 CNY, +10,9 %) gana menos de lo que pierde el bajista (64,99 CNY, −39,2 %), con probabilidades de 25/50/25. El bajista no es extremo: crecimiento 6 puntos menor y margen 2,5 puntos más bajo, cerca de 2022 [A1]. El valor ponderado de los escenarios (93,18 CNY) queda un 12,8 % por debajo del precio. A 12 meses la asimetría es mejor (bajista 73,63 y alcista 169,97 CNY) porque el PER del bajista ya parte del mínimo histórico adelantado.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF y los escenarios recogen el crecimiento, los márgenes y la caja; los comparables pesan menos porque mezclan estatales chinas con márgenes de la mitad (XJ, Pinggao, TBEA) y coreanas con acceso a EE. UU. (HD Hyundai, Hyosung, LS) [D7]. Sin transacciones con múltiplo publicado y sin suma de partes. El PER de los próximos doce meses de los comparables da 114,05 CNY (con el BPA del consenso posterior al 3T26) y el EV/EBITDA de los últimos doce meses 108,24 CNY, por encima del DCF (94,66): el mercado chino paga a todo el sector más de lo que da un DCF con un WACC del 8 %. El puente parte del balance de septiembre de 2026: caja e inversiones líquidas de 8.327 M, deuda de 907 M, arrendamientos de 53 M, minoritarios de 445 M y participaciones de 129 M [A17].',
};
