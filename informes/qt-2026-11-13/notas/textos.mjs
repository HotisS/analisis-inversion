// Textos del analista (Qt Group, corte 2026-11-13). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de EUR, ejercicio natural. Último informe: 3T26 (interim statement a 30-sep-2026, publicado el 29-oct, sin auditar ni NIIC 34) [A11]. Precio: cierre del 12-nov-2026 (31,62 EUR, último cruce 16:29:41 UTC), tomado del gráfico diario de Yahoo porque su historia aún no traía esa barra; la sesión del 13-nov no había cerrado [D1]. Rentabilidades, betas y movimiento, con datos hasta el 11-nov. La compra de IAR (17-oct-2025) rompe la comparación: 2025 lleva dos meses y medio de IAR y el LTM a septiembre de 2026 casi doce; no hay cifras pro forma ni crecimiento orgánico publicado [A1, A11]. El BPA de la regla a 12 meses es el PUBLICADO (NIIF, con la amortización de PPA), igual que su historia. MarketScreener sirve una página con la cotización del 14-ago: sus estimaciones se usan solo para EBITDA y EBIT, con esa reserva [D3]. El ROIC del motor (17,7 %) usa el capital medio de 2025; con el capital completo de IAR sería menor (estimación propia en rentabilidad y riesgos).',
  controles_explicados: [],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Qt nació en 1994-1995 en Oslo como producto de Trolltech, un marco para escribir una sola vez interfaces gráficas que funcionan en varios sistemas (la base del escritorio KDE en Linux). Nokia compró Trolltech en 2008 para sus móviles y, al abandonar ese camino, vendió el negocio de Qt a la finlandesa Digia en 2011-2012. En 2016 Digia separó Qt en una sociedad cotizada propia, Qt Group, con Juha Varelius al frente [A1]. Desde entonces se especializó en aparatos con pantalla (coches, medicina, industria, electrónica), pasó de licencias perpetuas a suscripciones y regalías por dispositivo, y compró herramientas de prueba (froglogic en 2021, Axivion en 2022) y de compilación para microcontroladores (IAR en 2025) [A10, A1]. Tras una década de crecimiento del 20 % anual, en 2025 el crecimiento orgánico cayó al 2,6 % y la empresa avisó de beneficios [A7].',
      hitos: [
        { anio: '1995', hito: 'Primera versión pública de Qt, de la noruega Trolltech.' },
        { anio: '2008', hito: 'Nokia compra Trolltech.' },
        { anio: '2012', hito: 'Digia compra a Nokia el negocio de Qt.' },
        { anio: '2016', hito: 'Escisión de Digia: Qt Group cotiza en Nasdaq Helsinki [A1].' },
        { anio: '2021', hito: 'Compra de froglogic (Squish); la acción toca máximos (133,6 EUR al cierre del año) [A10, D1].' },
        { anio: '2022', hito: 'Compra de Axivion (análisis estático de código) [A1].' },
        { anio: '2025', hito: 'Aviso de beneficios (17-oct) y compra de I.A.R. Systems por ≈ 205 M EUR, la mayor de su historia [A7, A9].' },
        { anio: '2026', hito: 'Reorganización (hasta 200 puestos, ≈ 20 M de ahorro), nueva directora financiera, ventas +27 % en el 3T y ARR de 164 M [A8, A11].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Hasta 2024 Qt era un negocio excepcional: ROIC del 35-45 % con un capital invertido de ≈ 110 M EUR, porque vende software sin apenas inversión y cobra por adelantado [A1]. La compra de IAR lo cambió. El ROIC del motor para 2025 es del 17,7 % (NOPAT de 38 M sobre un capital medio de 215 M), 7,4 puntos sobre el WACC del 10,26 %, y pasa el umbral de calidad (+5). Pero el capital medio solo recoge medio año de IAR. Con todo el capital a 30-sep-2026 (fondos propios de 212,8 M más deuda neta de 76,5 M: 289 M) y el EBIT de 12 meses sin costes de una vez (34,3 + 13,8 M), el ROIC es de ≈ 13 % (estimación propia), unos 3 puntos sobre el WACC; con el EBITDA del 29,5 % de 2027e del base, ≈ 16 % [A11]. El ROIC sin fondo de comercio sigue en el 35 %: el negocio crea valor, la compra de IAR todavía no. El ROIC incremental histórico (12,1 %) refleja precisamente esa compra.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Qt es el talento (personal = la mitad de las ventas; rotación y reorganización de hasta 200 puestos en 2026), la seguridad y calidad del software que va en coches y equipos médicos (certificaciones de seguridad funcional y ciberseguridad), los controles de exportación a algunos países y la licencia abierta (relación con la comunidad de código abierto) [A1, A8]. El impacto ambiental propio es pequeño (oficinas y viajes) [A1].',
      controversias: 'Sin controversias relevantes. La remuneración de 2022 (15,4 M EUR en acciones y 26,8 M por la venta de opciones del consejero delegado) fue polémica en Finlandia; hoy cobra 0,45 M sin variable [C1]. Calificaciones de MSCI o Sustainalytics no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+12,6 %, fijo): nueve meses publicados con 165,7 M EUR de ventas (+19,1 %; +21,7 % a tipo constante) y un cuarto trimestre de ≈ 77,8 M, casi igual al del 4T25 (77,1 M), que ya llevaba dos meses y medio de IAR, con licencias nuevas al alza y la suscripción de IAR restando [A11]. Inderes espera 243,0 M y Yahoo 243,75 M [D16, D2]. La guía (+10 % o más a tipo constante) queda holgada. Después, +8,0 % en 2027e y 2028e (IAR vuelve a crecer en suscripción, crecimiento orgánico en todas las líneas según la empresa, ARR de 164 M [D16, A11]; Inderes +7,3 % y Yahoo +8,9 % en 2027e) y baja hasta el 4 % en 2033e, por debajo del mercado de software embebido (10,8 % anual [B2]).',
    margenes: 'Margen EBITDA del 23,7 % en 2026e con 9,7 M de reorganización (27,7 % sin ella): 24,2 M en nueve meses y ≈ 33,5 M en el 4T, el trimestre fuerte (28,7 M en el 4T25 con 4,1 M de costes de la compra de IAR) [A11, A5]. Sube al 29,5 % en 2027e con el ahorro de ≈ 20 M al año de la reorganización y sin costes de una vez, y al 32,5 % desde 2031e [A11, A8]. Es menos que el 35,7 % de 2024 y que el margen EBITA del 30,8 % que espera Inderes para 2027 [A1, D16]: suponemos que Qt recupera la mayor parte, no todo, del margen perdido.',
    inversion: 'Capex del 1,8-2,0 % de las ventas = inversión (0,5 % en 2025 y 0,7 % en nueve meses de 2026) más pagos de arrendamientos (1,2 % en 2025 y 2,1 % en nueve meses) [A1, A11]; depreciación del 2 %. Circulante del 15 % de las ventas (clientes y activos de contrato menos proveedores y cobros por adelantado). No se proyectan compras nuevas.',
    wacc: 'Tasa libre del 3,33 % (Bund a 10 años, 12-nov-2026 [D4]); beta de 1,35, entre la ajustada semanal a cinco años (1,38) y la semanal a dos años (1,10) frente al Stoxx Europe 600 (la mensual a cinco años, 1,99, recoge la burbuja de 2021) [D1]; prima del 5,5 % más 0,5 puntos por tamaño y liquidez (≈ 2 M EUR al día); coste de la deuda del 3,8 % (préstamo bancario de la compra de IAR) y peso de la deuda del 12 % (≈ 119 M de préstamos frente a 803 M de capitalización). WACC del 10,26 %. La prueba de deterioro de 2025 usa una tasa antes de impuestos del 9,8 % [P1].',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: el software embebido crece más que la economía, pero la IA y la competencia gratuita frenan el precio. El múltiplo de salida implícito es de 9,6 veces el EBITDA, muy por debajo de los 15-40 a los que cotizan los comparables [D2]: el terminal es prudente. Pesa un 62 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Perímetro de IAR (≈ 9,5 meses más que en 2025, unos 10-11 puntos con su caída por la suscripción) en «otros»; volumen orgánico del 2 %: licencias nuevas de desarrollador al alza en EMEA, distribución −9,4 % en nueve meses [A11].',
    '2027e': 'Volumen del 5,5 % (proyectos en defensa, seguridad, medicina e industria y Ley de Ciberresiliencia), precio del 1,5 % y 1 punto por la vuelta de IAR al crecimiento en suscripción [A11, D16].',
    '2028e': 'Volumen del 6 % y precio del 2 %, en línea con MarketScreener (+8,2 % [D3]).',
    '2029e': 'Volumen del 5,5 % y precio del 2 %: por debajo del mercado de software embebido (10,8 % [B2]).',
    '2030e': 'Volumen del 5 % y precio del 2 %: la cuota en el mercado amplio baja del 1,3 % al ≈ 1 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (6,5 % anual en 2027e-2033e) está muy por debajo del histórico (22 % anual en 2020-2025, con compras) y del mercado (10,8 % según Grand View Research [B2]), y no necesita capital: la inversión es del 2 % de las ventas y los clientes pagan por adelantado. La cuota implícita en el mercado amplio baja del 1,3 % al ≈ 1,0 % (mercado de 38.507 M EUR en 2033e). El motor no hace la prueba de reinversión (activos ligeros: 3 % del NOPAT); a mano, el crecimiento sale de volumen (5-6 %) y precio (1,5-2 %), con poder de precios demostrado hasta 2024 y costes de cambio altos [B1]. Pasa las tres pruebas: «Sí».',
  dcf_lectura: 'El DCF da 34,33 EUR por acción, un 8,6 % sobre el precio de 31,62, con un WACC del 10,26 % y un terminal que pesa el 62 %. El DCF inverso dice que el precio descuenta un 4,9 % de crecimiento anual en 2027e-2033e con nuestro margen, frente al 6,5 % de nuestro base (o un margen final del 30,4 % frente a nuestro 32,5 %): el mercado espera menos que nosotros y la rentabilidad implícita (10,9 %) supera ligeramente al WACC. No es un margen de seguridad grande: medio punto más de WACC o de crecimiento mueve el valor entre 30,74 y 38,97 EUR. La tasa decide mucho: con la prima de riesgo que pide hoy el mercado (4,41 %, WACC del 8,97 %) el DCF vale 41,98 EUR. Frente al 21-oct (33,09 EUR) el DCF sube por el Bund más bajo (3,33 % frente a 3,44 %), un 2026 algo mayor y un margen de 2027 medio punto más alto tras el 3T26.',
  narrativas: {
    Bajista: 'La IA hace que los clientes escriban interfaces con Flutter, tecnologías web o código generado, y necesitan menos puestos de Qt; los fabricantes de coches chinos usan herramientas locales; las regalías siguen a la baja con la crisis de la automoción europea; IAR no recupera el crecimiento tras el paso a suscripción. Crecimiento 3 puntos menor y margen 4 puntos menor que el base (EBITDA final del 28,5 %).',
    Base: 'Crecimiento del 8 % en 2027e-2028e que se modera al 4 % en 2033e; la reorganización y el fin de los costes de una vez devuelven el margen EBITDA al 29,5 % en 2027e y al 32,5 % desde 2031e, por debajo del máximo de 2024 (35,7 %).',
    Alcista: 'Qt se convierte en la plataforma certificada para el software generado con IA (pruebas, análisis de código, compiladores certificados, Ley de Ciberresiliencia) y cobra por capacidad; defensa, medicina y electrónica de consumo compensan la automoción: 2 puntos más de crecimiento y de margen (EBITDA final del 34,5 %).',
  },
  escenarios_comentario: 'En valor intrínseco la asimetría es simétrica: el alcista vale 40,95 EUR (+29,5 %) y el bajista 22,36 (−29,3 %); ponderados, 32,99 (+4,3 %). El margen es la palanca: 4 puntos menos de margen son un 13 % menos de EBITDA, y el terminal pesa el 62 %. Con la prima del mercado la asimetría mejora mucho (alcista 50,12, bajista 26,73): Qt sigue siendo una acción de tasa.',
  casos_12m: {
    Bajista: 'Crecimiento del 5 % en 2027e y 2028e y margen EBITDA del 26,5 % (4 puntos menos) por la IA, la automoción y IAR: BPA publicado de 1,60 EUR en 2028e (−23 % frente al base). La regla lleva el PER a 16,9 veces (base × 0,8), por debajo del mínimo de cinco años (28,4).',
    Base: 'Ventas +12,6 % en 2026e (243,5 M), +8 % en 2027e y +8 % en 2028e (284 M); margen EBITDA del 30,5 % en 2028e, depreciación del 2 %, PPA de 11,5 M, resultado financiero de −2,4 M, impuesto del 21 % y 25,6 M de acciones: BPA publicado de 2,07 EUR (1,01 en 2026e y 1,75 en 2027e). El PER pasa de 19,2 a 21,1 veces (tope ×1,1 hacia la mediana de cinco años, 32,6).',
    Alcista: 'Dos puntos más de crecimiento y de margen (EBITDA del 32,5 % en 2028e, el nivel de 2023): BPA publicado de 2,34 EUR. El PER llega al techo de la regla (base × 1,35 = 28,5 veces), por debajo de la media larga de 42,2.',
  },
  diferencia_consenso: 'Nuestro BPA publicado de 2026e (1,01 EUR: 0,15 reales en nueve meses más 0,86 en el 4T) coincide con Inderes (1,00) y queda bajo Yahoo (1,155) y MarketScreener (1,11) [D16, D2, D3]; el de 2027e (1,75) queda un 9 % bajo Yahoo (1,92) y el de 2028e (2,07) un 9 % bajo MarketScreener (2,28), que da un EBITDA de 2028e de 90,4 M (32,3 %) frente a nuestros 86,6 M (30,5 %). La diferencia es de margen, no de ventas. Nuestro precio base (43,68 EUR) supera en un 14,6 % al objetivo medio de los analistas (38,13; 36,50-41): ellos aplican un múltiplo menor al BPA de 2027, nosotros la regla común sobre 2028e.',
  objetivo_comentario: 'El objetivo a 12 meses (45,27 EUR ponderado) da un +43,2 % y el base (43,68 EUR) un +38,1 %, sin dividendo, y el valor intrínseco (35,09 EUR) queda un 11,0 % sobre el precio: la regla dice Comprar. La distancia entre el objetivo y el valor intrínseco (29 %) es grande: la regla supone que el BPA se duplica de 1,01 a 2,07 EUR en dos años (reorganización, fin de los costes de una vez, IAR en suscripción) y que el mercado paga 21 veces; el DCF, con un WACC del 10,3 %, pide más. Lo que cerraría la distancia es la guía de 2027 (18-feb-2027) con un margen EBITA cercano al 30 %. Sin ella, la tesis es a más de un año.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF es el método principal para un negocio con poca inversión y flujos previsibles; los escenarios recogen la asimetría (bajista −29 %, alcista +30 %). Los comparables pesan poco porque son empresas mucho mayores, que crecen más (Synopsys, Cadence) y publican BPA ajustado: a su mediana de PER (23,6 veces) Qt valdría 42,95 EUR (+35,8 %). Transacciones fuera (prima de control y pocas operaciones con múltiplo). El abanico va de 22,36 (bajista) a 42,95 (comparables); el valor intrínseco ponderado es de 35,09 EUR (+11,0 %), 41,41 con la prima del mercado.',
  catalizadores: {
    items: [
      { fecha: '2027-02-18', evento: 'Resultados de 2026 y guía de 2027', efecto: 'El 4T es el trimestre fuerte; si la guía de margen EBITA de 2027 se acerca al 30 %, confirma la recuperación que la regla da por hecha', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04-23', evento: 'Resultados del 1T27', efecto: 'Primer trimestre sin costes de reorganización y con el ahorro completo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Venta de los productos de seguridad de IAR a Data I/O', efecto: 'Ahorro de ≈ 3 M al año y foco', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'IAR vuelve a crecer tras el paso a suscripción', efecto: 'Ventas de IAR de nuevo al alza (≈ 5-10 M menos en 2026) y ARR más alto', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027-2028', evento: 'Cambio de precio por puesto a cobro por capacidad o uso', efecto: 'Defiende el ingreso si la IA reduce programadores; Qt lo plantea gradual y neutral en ventas; riesgo de transición', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Dic-2027', evento: 'Ley de Ciberresiliencia de la UE (obligaciones principales)', efecto: 'Más demanda de herramientas certificadas y de pruebas; Qt 6.12 ya tiene la declaración de conformidad', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Opa de un grupo industrial o de software de ingeniería', efecto: 'Las herramientas se compran a 5-15 veces ventas; Qt cotiza a ≈ 3,6', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Inteligencia artificial: genera interfaces con herramientas gratuitas y reduce los puestos de programador, la base de la venta de licencias de desarrollador (≈ 2/3 de las ventas)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−29 % (bajista)', mitigante: 'Plataforma certificada para coches y medicina; pruebas y análisis de código (más código = más que probar); paso gradual a cobro por capacidad [A11, B8]', senal: 'Renovaciones a la baja o ARR orgánico < 5 %' },
      { riesgo: 'Margen: la reorganización no devuelve el EBITDA al 29-30 % en 2027 (los costes de una vez se repiten o el ahorro se va en sueldos)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % del objetivo a 12 meses', mitigante: 'Ahorro de ≈ 20 M «según lo previsto» y 9,7 M dados como el coste total; Inderes espera un EBITA del 30,8 % [A11, D16]', senal: 'Guía de 2027 por debajo de un margen EBITA del 25 % o nuevos costes de reorganización' },
      { riesgo: 'Rentabilidad del capital tras IAR: con todo el capital de la compra (≈ 289 M a sep-26) el ROIC normalizado de 12 meses es de ≈ 13 %, apenas 3 puntos sobre el WACC; el motor da 17,7 % porque usa el capital medio de 2025', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Con el margen de 2027e del base el ROIC sube a ≈ 16 % (≈ 6 puntos sobre el WACC) [A11]', senal: 'ROIC de 2026 con el balance anual por debajo del 14,8 % (WACC + 4,5)' },
      { riesgo: 'Dependencia de la automoción y de la electrónica de consumo (regalías por dispositivo y proyectos nuevos)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 a −15 %', mitigante: 'Diversificación hacia defensa, medicina, industria y edificios (SAUTER, Nuvoton) [A11, B6, B9]', senal: 'Licencias de distribución por debajo de 45 M al año' },
      { riesgo: 'Competencia de Flutter, de las alternativas abiertas (Slint, LVGL) y de Unity y Unreal en las pantallas de coche', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Costes de cambio de plataformas certificadas para 5-10 años [B1]', senal: 'Pérdida de una plataforma de un fabricante de coches grande' },
      { riesgo: 'Compra de IAR: precio alto (prima del 66 %, ≈ 13 veces el EBITDA) y ventas a la baja en 2026 por el paso a suscripción', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'IAR tenía un margen EBITDA del 36 %; la suscripción ya es la mayoría de sus reservas [A9, A11]', senal: 'Deterioro del fondo de comercio (167 M) o ventas de IAR sin crecer en 2027' },
      { riesgo: 'Credibilidad de la dirección: tres años sin cumplir la guía de ventas y cambio de director financiero', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'La guía de 2026 va camino de cumplirse con holgura; compras del presidente [A11, C4]', senal: 'Nueva rebaja de guía' },
      { riesgo: 'Múltiplo y volatilidad: beta de 1,1-2,0 y caídas del 50-88 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '±30 % en un año', mitigante: 'PER de 19,2 sobre nuestro BPA de 12 meses, bajo para su historia (28-65 veces)', senal: 'Caídas del software europeo por la IA, como el 29-ene-2026' },
    ],
    premortem: 'Noviembre de 2029: la acción ha perdido un 40 %. Los asistentes de IA generaron en 2027 interfaces completas en Flutter y tecnologías web a partir de un dibujo, y los fabricantes de electrónica e industria dejaron de renovar puestos de Qt; el paso al cobro por uso se hizo con rebajas de precio para no perder clientes. Los coches chinos usaron herramientas locales y los europeos recortaron proyectos; las regalías siguieron a la baja. IAR no volvió a crecer tras la suscripción y en 2028 se deterioró parte de su fondo de comercio. La dirección había gastado el ahorro de la reorganización en volver a contratar para vender a defensa, y el margen EBITA se quedó en el 22-24 %. El BPA de 2028 fue de 1,50 EUR y el mercado le dio 15 veces. Las señales estaban en 2027: ARR orgánico de un dígito bajo, renovaciones de puestos a la baja y una guía de margen por debajo del 25 %.',
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−29 % a +30 % a 3-5 años (es la diferencia entre el bajista y el alcista)',
      comentario: 'Es el riesgo central. En contra: Qt cobra por puesto de programador y la IA reduce los programadores necesarios y abarata escribir interfaces con herramientas gratuitas; la propia empresa espera pasar de la venta por puesto al cobro por capacidad o uso, de forma gradual y neutral en ventas según Inderes [A11, D16]. A favor: en coches, equipos médicos, defensa e industria el código tiene que probarse, mantenerse y certificarse (Ley de Ciberresiliencia, ISO 26262), y eso lo venden Squish, Axivion e IAR; Qt argumenta que su código abierto está en los datos de entrenamiento de los modelos y que la IA trabaja mejor con Qt, y lanzó Clate, una herramienta de diseño con IA [A11, B8]. Señal: renovaciones y número de puestos; si el ARR orgánico baja del 5 %, el bajista gana peso.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Margen 2027', pregunta: '¿Qué margen EBITA alcanza la empresa en 2027 con el ahorro completo de la reorganización, y habrá más costes de una vez?', por_que: 'El objetivo a 12 meses depende de un EBITDA del 29,5-30,5 % en 2027-2028.' },
      { tema: 'IA y puestos', pregunta: '¿Cómo han evolucionado el número de puestos y el precio por puesto en las renovaciones de 2026, y qué parte del ARR está ya en cobro por capacidad o uso?', por_que: 'Es el riesgo central: la diferencia entre el bajista (−29 %) y el alcista.' },
      { tema: 'Crecimiento orgánico', pregunta: '¿Cuál fue el crecimiento orgánico de las ventas y del ARR sin IAR en el 3T26 y en nueve meses?', por_que: 'El +27 % del 3T lleva IAR; la empresa no publica el orgánico y el base supone un 8 % desde 2027.' },
      { tema: 'Contratos más cortos', pregunta: '¿Cuánto pesan los contratos más cortos que piden algunos clientes y cómo afectan al ARR y al reconocimiento de ventas del 4T?', por_que: 'Licencias de plazo reconocidas al entregar: contratos más cortos bajan las ventas del 4T.' },
      { tema: 'IAR', pregunta: '¿Cuánto bajan las ventas de IAR en 2026 y cuándo vuelven a crecer con la suscripción?', por_que: '205 M EUR pagados con una prima del 66 % y 122,5 M de fondo de comercio; el ROIC con todo el capital depende de ello.' },
      { tema: 'Regalías', pregunta: '¿Qué parte de las licencias de distribución viene de automoción y de electrónica de consumo, y por qué crecieron un 18 % en el 3T tras caer en el semestre?', por_que: 'Son ≈ un 24 % de las ventas y las más cíclicas.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Comprar', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Comprar, con convicción baja. La regla a 12 meses da un objetivo de 45,27 EUR (nuestro BPA publicado de 2028e × el PER de la regla común), +43,2 % ponderado y +38,1 % en el base, frente a 31,62 EUR (cierre del 12-nov-2026); el valor intrínseco es de 35,09 EUR, un 11,0 % sobre el precio, y el objetivo medio de los analistas, 38,13. Las tres condiciones se cumplen. La convicción es baja porque el DCF por sí solo da Mantener (+8,6 %): la tesis a 12 meses depende de que el BPA se duplique de 1,01 EUR en 2026 a 2,07 en 2028 con la vuelta del margen; la subiría una guía de 2027 con margen EBITA cercano al 30 % (18-feb-2027) y la bajaría un margen por debajo del 25 %. Frente al 21-oct (Mantener a 34,28 con valor intrínseco de 33,50) cambian dos cosas: el precio ha caído un 8 % y el 3T26 sube algo nuestro 2026 y el margen de 2027.

**El negocio.** Qt vende las herramientas con las que los fabricantes programan los aparatos con pantalla o chip: el marco Qt de interfaces, herramientas de prueba y los compiladores de IAR [B1, A1]. Cobra por puesto de programador y una regalía por aparato, con un margen bruto casi total; los clientes se quedan una década porque cambiar de plataforma certificada es caro [A1, B1]. El ROIC del motor (17,7 %) supera en 7,4 puntos al WACC del 10,26 %, pero con todo el capital de IAR el ROIC normalizado de 12 meses es de ≈ 13 % (estimación propia) y solo con el margen de 2027e vuelve a ≈ 16 %. La calidad sostiene el crecimiento proyectado («Sí»): un 6,5 % anual sin capital nuevo, por debajo del mercado (10,8 %) y con la cuota bajando del 1,3 % al 1,0 %.

**Finanzas.** El 3T26 creció un 27 % (51,7 M) con IAR y licencias nuevas en EMEA; el EBITA fue de 5,7 M con 5,3 M de reorganización (21,3 % sin ella) [A11, D16]. En nueve meses, +21,7 % a tipo constante y EBITA del 12,1 % frente a una guía de «al menos 10 % y 15 %». Deuda neta de 76,5 M (≈ 1,4 veces el EBITDA de 12 meses) y flujo libre de ≈ 32 M [A11].

**Equipo y gobierno.** La dirección lleva tres años sin cumplir la guía de ventas, pero la de 2026 va holgada. El presidente (Ingman, 21,6 %) compró 52.000 acciones a ≈ 26 EUR en mayo; ninguna venta de directivos [C4, C10].

**Valoración.** DCF 34,33 EUR (+8,6 %); el precio descuenta un 4,9 % de crecimiento anual en 2027e-2033e frente a nuestro 6,5 %. Con la prima del mercado (4,41 %) el DCF vale 41,98. Cotiza a 19,2 veces nuestro BPA de 12 meses, frente a 28-65 veces en su historia y 23,6 de mediana de los comparables. Discrepamos del consenso en el margen: nuestro BPA de 2028e (2,07) queda un 9 % bajo MarketScreener.

**Riesgos y catalizadores.** El riesgo central es la IA en la venta por puesto (bajista −29 %); después, que el margen de 2027 no vuelva y la rentabilidad del capital pagado por IAR. La caída del 14 % desde el día de resultados no tiene causa propia: EBITA del 3T algo bajo el consenso y la caída del software europeo del 5-6 de noviembre [D10, D16]. Catalizador: resultados de 2026 el 18-feb-2027.

**Qué cambiaría la decisión.** Comprar a mercado si cotiza a 35,09 EUR o menos (nivel A; con BPA −10 % la compra aguanta). Para quien la tiene, vender por encima de 41,15 (filtro de mantener; la banda Vender de la regla está en 50,30). Una guía de 2027 con margen EBITA bajo el 25 % o un ROIC con el balance de 2026 por debajo del 14,8 % (WACC + 4,5) retirarían la compra.`,
    tesis: 'Qt es un buen negocio saliendo de un mal momento: herramientas de software casi sin coste variable, clientes que se quedan una década porque cambiar de plataforma certificada es caro y un ROIC sin fondo de comercio del 35 % [A1]. En 2025 se juntaron el frenazo del crecimiento (orgánico del 2,6 %), una compra cara (IAR, ≈ 205 M) y el miedo a que la IA haga innecesaria parte de lo que vende; la acción cayó a 18 EUR. En 2026 las ventas crecen un 22 % a tipo constante con IAR y la reorganización recorta ≈ 20 M de costes [A11].\n\nEl precio (31,62 EUR) descuenta un crecimiento del 4,9 % anual en 2027e-2033e con nuestro margen, por debajo del 6,5 % de nuestro base, y cotiza a 19,2 veces nuestro BPA de 12 meses, la parte baja de su historia (28-65 veces) y bajo la mediana de los comparables (23,6) [D2].\n\nPara invertir hay que creer que el margen EBITDA vuelve al 29-30 % en 2027 sin nuevos costes de una vez y que la IA cambia el modelo de precios, no la necesidad de herramientas certificadas. Si eso ocurre, el BPA se duplica en dos años y la regla da +38 % en el base; si no, el bajista da −14,5 % a 12 meses y −29,3 % en valor intrínseco.',
    vision_diferencial: {
      mercado_descuenta: 'Que el crecimiento se modera y que la IA erosiona la venta por puesto: 4,9 % anual frente a nuestro 6,5 %. Los analistas, con objetivo medio de 38,13 EUR (subiendo desde 34,25 en tres semanas), ven recorrido pero con múltiplo bajo.',
      nuestra_vision: 'Coincidimos en la recuperación del margen, algo menos que el consenso (30,5 % frente a 32,3 % de EBITDA en 2028e), y vemos la IA como un riesgo real para la venta por puesto que la empresa reconoce al prever el cobro por capacidad.',
      por_que: 'El 3T26 mostró licencias nuevas creciendo y renovaciones estables pese a la IA [A11]; el ahorro de 20 M es concreto y el coste de la reorganización ya está casi todo en la cuenta.',
    },
    a_favor: [
      '**Recuperación del beneficio**: ahorro de ≈ 20 M al año y fin de 9,7 M de costes de una vez; el BPA podría duplicarse de 1,01 a 2,07 EUR de 2026 a 2028.',
      '**Crecimiento de vuelta**: +27 % en el 3T26 (con IAR) y licencias nuevas al alza en EMEA; ARR de 164 M.',
      '**Barata para su historia**: 19,2 veces nuestro BPA de 12 meses frente a 28-65 veces; ≈ 3,6 veces ventas frente a 4,7 pagadas por IAR.',
      '**Compras del presidente**: Ingman (21,6 %) compró 52.000 acciones en mayo de 2026; ninguna venta de directivos.',
      '**Más pruebas con más código**: Squish, Axivion e IAR ganan con la Ley de Ciberresiliencia y con el código generado por IA.',
    ],
    en_contra: [
      '**Riesgo de IA en la venta por puesto**: la empresa prevé pasar a cobrar por capacidad o uso.',
      '**Orgánico sin publicar**: el +27 % lleva IAR; distribución −9,4 % en nueve meses.',
      '**IAR cara**: prima del 66 %; el ROIC con todo el capital es de ≈ 13 %, 3 puntos sobre el WACC.',
      '**Margen aún bajo**: EBITA del 12,1 % en nueve meses; la tesis exige casi el 30 % en 2027.',
      '**DCF justo**: 34,33 EUR (+8,6 %); el bajista vale 22,36 (−29 %).',
    ],
    que_vigilar: 'La tesis depende de que la reorganización devuelva el margen EBITDA al 29-30 % en 2027 sin nuevos costes de una vez y de que la IA no reduzca las renovaciones de puestos. Las señales en contra serían una guía de 2027 con margen EBITA por debajo del 25 %, un ARR orgánico creciendo menos del 5 % o licencias de distribución por debajo de 45 M al año.',
    cambiaria_recomendacion: [
      'Precio por encima de 35,09 EUR: dejaría de ser compra (el valor intrínseco quedaría bajo el precio); quien la tenga, mantener hasta 41,15 (filtro de mantener).',
      'Precio por encima de 41,15 EUR: vender si se tiene (filtro de mantener; la banda Vender de la regla está en 50,30).',
      'Guía de 2027 con margen EBITA < 25 % o nuevos costes de reorganización relevantes: pasar al bajista y retirar la compra.',
      'ROIC de 2026 con el balance anual (capital completo de IAR) por debajo del 14,8 % (WACC + 4,5): no comprar por calidad.',
      'Renovaciones o precio por puesto a la baja por la IA: pasar al bajista.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen EBITA', nivel_actual: '12,1 % (9M26); 17,9 % sin reorganización; guía 2026 ≥ 15 %', umbral_alerta: '< 25 % en la guía de 2027', por_que: 'Base del BPA de 2028e.' },
      { kpi: 'ARR (orgánico y total)', nivel_actual: '164,1 M (+32,1 % con IAR; +1,8 % en el 3T)', umbral_alerta: 'Orgánico < 5 %', por_que: 'Mide si la IA está quitando puestos.' },
      { kpi: 'ROIC con el capital completo de IAR', nivel_actual: '≈ 13 % normalizado (12 meses a sep-26, estimación propia)', umbral_alerta: '< 14,8 % con el balance de 2026', por_que: 'Filtro de calidad (ROIC − WACC ≥ 4,5).' },
      { kpi: 'Licencias de distribución', nivel_actual: '39,5 M en 9M26 (−9,4 %)', umbral_alerta: '< 45 M al año', por_que: 'Exposición a automoción y electrónica.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '≈ 1,4 veces (sep-26)', umbral_alerta: '> 2,5 veces', por_que: 'Covenants del préstamo de IAR.' },
    ],
  },
};
