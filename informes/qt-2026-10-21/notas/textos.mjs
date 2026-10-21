// Textos del analista (Qt Group, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de EUR, ejercicio natural. Último informe: semestral a 30-jun-2026; el 3T26 se publica el 29-oct-2026. Precio: cierre del 21-oct-2026 (34,28 EUR, último cruce a las 15:29:52 UTC [D1]). La compra de IAR (17-oct-2025) rompe la comparación: 2025 lleva dos meses y medio de IAR y el LTM a junio de 2026 nueve; no hay cifras pro forma [A1]. El BPA de la regla a 12 meses y su historia son los PUBLICADOS (NIIF, con la amortización de los intangibles comprados, ≈ 13,5 M al año); Inderes y parte del consenso de Yahoo usan un BPA ajustado sin esa amortización, más alto [D3, E2]. El DCF trata los arrendamientos como inversión (sus pagos van en el capex) y no los resta en el puente, y no da ahorro fiscal a la amortización de PPA. No hay estudio público del mercado concreto de Qt: la cuota y la prueba de mercado usan el software embebido amplio [B2]. Transcripción de la conferencia del 2T26 no disponible. Una acción cuesta 34,28 EUR: un 0,1 % de una cartera de 30.000 EUR; el mínimo de 1.000 EUR por posición son ≈ 30 acciones.',
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
        { anio: '2026', hito: 'Reorganización (hasta 200 puestos, ≥ 20 M de ahorro), nueva directora financiera y ARR de 160 M [A8, A3].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Hasta 2024 Qt era un negocio excepcional: ROIC del 35-45 % con un capital invertido de ≈ 110 M EUR, porque vende software sin apenas inversión y cobra por adelantado [A1]. La compra de IAR lo cambió. El ROIC del motor para 2025 es del 17,7 % (NOPAT de 38 M sobre un capital medio de 215 M), ≈ 7,3 puntos sobre el WACC del 10,4 %, y pasa el umbral de calidad (+5). Pero el capital medio solo lleva dos meses y medio de IAR: con el capital de final de 2025 (≈ 316 M, con 167 M de fondo de comercio y 126 M de intangibles) el ROIC de 2025 sería ≈ 12 %, y con el resultado de los 12 meses a junio de 2026 (EBIT de 34 M más 10 M de no recurrentes, después de impuestos ≈ 35 M) ≈ 11 %: casi igual al WACC [A1, A3]. Sin fondo de comercio, el ROIC sigue siendo del 35 %: el negocio es bueno, lo caro fue comprarlo. Para volver a crear valor con margen, la reorganización y el crecimiento tienen que llevar el EBITA hacia el 30 %: con el margen de nuestro 2028e (EBITA ≈ 28 %, 80 M), el ROIC volvería al ≈ 19 %.',
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
    crecimiento: '2026e (+11,0 %, fijo): la guía es de +10 % o más a tipo constante; IAR todo el año suma ≈ 12,5 puntos, las licencias de distribución bajan (−17 % en el primer semestre) y el tipo de cambio resta ≈ 2,5 puntos; el consenso espera +11,2 % [A3, D3]. Después, +8,5 % en 2027e (IAR vuelve a crecer tras el paso a suscripción, ARR de 160 M con +32 % y ≈ +11 % orgánico) y bajada hasta el 4 % en 2033e: por debajo del 10,8 % previsto para el software embebido [B2] y del 22 % anual de 2020-2025, porque la IA, Flutter y las alternativas abiertas presionan el precio por puesto y el orgánico de 2025 fue del 2,6 % [A1, B5].',
    margenes: 'Margen EBITDA del 24 % en 2026e (con 4,3 M de reorganización; consenso 24,1 % [D3]) que sube al 29 % en 2027e con el ahorro completo de ≥ 20 M y 3 M de los productos de seguridad de IAR [A8, A3] y al 32,5 % desde 2031e. Es menos que el 35,7 % de 2024 y que el 35,8 % de IAR en 2024 [A1, A9], y más que el 28,5 % de 2025 sin no recurrentes: suponemos que Qt recupera la mayor parte, no todo, de su rentabilidad, porque la presión de precio por la IA y la competencia gratuita no desaparece.',
    inversion: 'Capex del 1,8-2,0 % de las ventas = inversión (0,5 % en 2025) más pagos de arrendamientos (1,2 %) [A1]; depreciación del 2 %. Circulante del 15 % de las ventas (clientes y activos de contrato menos proveedores y cobros por adelantado: ≈ 16 % en 2025). No se proyectan compras nuevas.',
    wacc: 'Tasa libre del 3,44 % (Bund a 10 años, 21-oct-2026 [D4]); beta de 1,35, entre la ajustada semanal a cinco años (1,40) y la semanal a dos años (1,21) frente al Stoxx Europe 600 (la mensual a cinco años, 2,0, recoge la burbuja de 2021) [D1]; prima del 5,5 % más 0,5 puntos por tamaño y liquidez (2,5 M EUR al día); coste de la deuda del 3,8 % (préstamo bancario de la compra de IAR) y peso de la deuda del 12 %. WACC del 10,36 %. La prueba de deterioro de la empresa usa un 9,8 % antes de impuestos [P1]. Con la prima implícita del mercado (4,2 % [D5]) el WACC baja al 8,8 % y el DCF sube a 42,21 EUR.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: el software embebido crece más que la economía, pero la IA y la competencia gratuita frenan el precio. El múltiplo de salida implícito es de 9,4 veces el EBITDA, muy por debajo de los 17-45 a los que cotizan los comparables [D2]: el terminal es prudente. Pesa un 61 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Perímetro de IAR todo el año (≈ +12,5 puntos) menos tipo de cambio (≈ −2,5) en «otros»; volumen orgánico del 1 %: licencias de desarrollador estables, distribución a la baja tras un 2025 excepcional [A3].',
    '2027e': 'Volumen del 6 % (nuevos proyectos en defensa, medicina, electrónica de consumo e industria; IAR vuelve a crecer en suscripción), precio del 1,5 % y 1 punto por la recuperación de IAR [A3].',
    '2028e': 'Volumen del 6 % y precio del 2 %, en línea con el consenso (+8,7 % [D3]).',
    '2029e': 'Volumen del 5,5 % y precio del 2 %: por debajo del mercado de software embebido (10,8 % [B2]).',
    '2030e': 'Volumen del 5 % y precio del 2 %: la cuota en el mercado amplio baja del 1,25 % al ≈ 1 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (6,6 % anual en 2027e-2033e) está muy por debajo del histórico (22 % anual en 2020-2025, con compras) y del mercado (10,8 % según Grand View Research [B2]), y no necesita capital: la inversión es del 2 % de las ventas y los clientes pagan por adelantado. La cuota implícita en el mercado amplio baja del 1,25 % al ≈ 1 % (mercado de 2033e en EUR a 1,1228 USD por EUR [B2, P2]). El motor da también «Sí». El riesgo no es de capacidad sino de demanda: que la IA y las herramientas gratuitas reduzcan los puestos de programador y el precio. Lo recoge el bajista (−3 puntos de crecimiento y −4 de margen).',
  dcf_lectura: 'El DCF da 33,09 EUR por acción, un 3,5 % bajo el precio, con un WACC del 10,36 % y un terminal que pesa el 61 %. El DCF inverso dice que el precio descuenta un 7,2 % de crecimiento anual en 2027e-2033e con nuestro margen, frente al 6,6 % de nuestro base: el mercado espera algo más que nosotros, sin margen de seguridad. La tasa decide: con la prima de riesgo que pide hoy el mercado (4,2 %, WACC del 8,8 %) el DCF vale 42,21 EUR (+23 %). La sensibilidad es alta: ± 0,5 puntos de WACC y de crecimiento terminal dan 29,63-37,54 EUR.',
  narrativas: {
    Bajista: 'La IA hace que los clientes escriban interfaces con Flutter, tecnologías web o código generado, y necesitan menos puestos de Qt; los fabricantes de coches chinos usan herramientas locales; las regalías siguen a la baja con la crisis de la automoción europea; IAR no recupera el crecimiento tras el paso a suscripción. Crecimiento 3 puntos menor y margen 4 puntos menor que el base (EBITDA final del 28,5 %).',
    Base: 'Crecimiento del 8-8,5 % en 2027e-2028e que se modera al 4 % en 2033e; la reorganización y el ahorro de IAR devuelven el margen EBITDA al 29 % en 2027e y al 32,5 % desde 2031e, por debajo del máximo de 2024 (35,7 %).',
    Alcista: 'Qt se convierte en la plataforma certificada para el software generado con IA (pruebas, análisis de código, compiladores certificados) y cobra por capacidad; defensa, medicina y electrónica de consumo compensan la automoción: 2 puntos más de crecimiento y de margen (EBITDA final del 34,5 %).',
  },
  escenarios_comentario: 'La asimetría del valor intrínseco es desfavorable: el alcista vale 39,50 EUR (+15,2 %) y el bajista 21,49 (−37,3 %); ponderados, 31,79 (−7,3 %). El margen es la palanca: 4 puntos menos de margen son un 13 % menos de EBITDA, y el terminal pesa el 61 %. Con la prima del mercado la asimetría se da la vuelta (alcista 50,44, bajista 26,71): Qt es una acción de tasa.',
  casos_12m: {
    Bajista: 'Crecimiento de 5,5 % en 2027e y 5 % en 2028e y margen EBITDA del 26,5 % (4 puntos menos) por la IA, la automoción y IAR: BPA publicado de 1,57 EUR en 2028e (−23 % frente al base). La regla lleva el PER a 19,2 veces (base × 0,8), por debajo del mínimo de cinco años (28,4).',
    Base: 'Ventas +11 % en 2026e, +8,5 % en 2027e y +8 % en 2028e (281 M); margen EBITDA del 30,5 %, depreciación del 2 %, PPA de 12 M, resultado financiero de −2,3 M, impuesto del 21 % y 25,6 M de acciones: BPA publicado de 2,03 EUR (1,11 en 2026e y 1,68 en 2027e). El PER pasa de 21,8 a 24,0 veces (tope ×1,1 hacia la mediana de cinco años, 32,0).',
    Alcista: 'Dos puntos más de crecimiento y de margen (EBITDA del 32,5 % en 2028e, el nivel de 2023): BPA publicado de 2,31 EUR. El PER llega al techo de la regla (base × 1,35 = 32,4 veces), por debajo de la media larga de 41,8.',
  },
  diferencia_consenso: 'Nuestro BPA publicado de 2026e (1,11 EUR) está entre MarketScreener (1,00) y Yahoo (1,13); el de 2027e (1,68) y el de 2028e (2,03) quedan un 5 % y un 10 % por debajo de MarketScreener (1,76 y 2,25), que da un EBITDA de 2028e de 93,1 M (32,7 %) frente a nuestros 85,8 M (30,5 %) [D3]. Inderes, en BPA ajustado sin PPA, da 2,84 EUR en 2028e [E2]. La distancia con el objetivo medio de los analistas (34,25 EUR, en mantener) está en el múltiplo y en el horizonte: ellos valoran hoy con 2026-2027 y prudencia por la IA; la regla común aplica a nuestro BPA de 2028e un PER de 24 veces, por encima del actual (21,8) porque la historia de Qt es de 28-65 veces.',
  objetivo_comentario: 'El objetivo a 12 meses (50,61 EUR ponderado) da un +47,6 % y el base (48,72 EUR) un +42,1 %, sin dividendo, pero el valor intrínseco (33,50 EUR) queda un 2,3 % bajo el precio: la regla dice Mantener. Las dos cifras no se contradicen sino que miden cosas distintas: la regla a 12 meses supone que el BPA casi se duplica de 1,11 a 2,03 EUR en dos años (reorganización, IAR, crecimiento del 8 %) y que el mercado paga por él un PER de 24, todavía bajo para la historia de Qt; el DCF, con un WACC del 10,4 % y márgenes que no vuelven al máximo, dice que el precio de hoy ya paga ese negocio. Para comprar haría falta un precio por debajo de 33,50 EUR (−2,3 %), con el que se cumplirían también la ponderada y el base. Vender (ponderada ≤ −10 %) solo por encima de 56,23 EUR. Crecimiento del BPA base: +35 % anual de 2026e a 2028e, desde un 2026 deprimido por la reorganización y la PPA; de 2024 (2,26 EUR) a 2028e el BPA no crece.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF es el método principal para un negocio con poca inversión y flujos previsibles; los escenarios recogen la asimetría (bajista −37 %, alcista +15 %). Los comparables pesan poco porque son empresas mucho mayores, que crecen más (Synopsys, Cadence) y publican BPA ajustado: a su mediana Qt valdría 39,26 EUR (+14,5 %). Las transacciones (IAR, Altair, Axivion: 4,7-15 veces las ventas) no pesan, pero recuerdan que estas herramientas se compran caras: a 4,1 veces las ventas, Qt cotiza por debajo de lo que pagó por IAR. Valor objetivo de 33,50 EUR (−2,3 %): el precio está en el centro del rango del DCF (29,63-37,54).',
  catalizadores: {
    items: [
      { fecha: '2026-10-29', evento: 'Resultados del 3T26', efecto: 'Primer trimestre con ahorro de la reorganización; consenso de BPA de 0,03 EUR; el 3T es estacionalmente el más flojo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02-18', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Si la guía de margen EBITA de 2027 se acerca al 30 %, confirma la recuperación que la regla da por hecha', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Venta de los productos de seguridad de IAR a Data I/O', efecto: 'Ahorro de ≈ 3 M al año y foco', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'IAR vuelve a crecer tras el paso a suscripción', efecto: 'Ventas de IAR de nuevo al alza y ARR más alto', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027-2028', evento: 'Cambio de precio por puesto a cobro por capacidad o uso', efecto: 'Defiende el ingreso si la IA reduce programadores; riesgo de transición', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Continuo', evento: 'Producción de coches y electrónica (regalías)', efecto: 'Las licencias de distribución (26 % de las ventas) siguen la producción de los clientes', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha', evento: 'Opa de un grupo industrial o de software de ingeniería', efecto: 'Las herramientas se compran a 5-15 veces ventas; Qt cotiza a 4,1', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Inteligencia artificial: genera interfaces con herramientas gratuitas y reduce los puestos de programador, la base de la venta de licencias de desarrollador (66 % de las ventas)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 a −40 % (bajista)', mitigante: 'Plataforma certificada para coches y medicina; pruebas y análisis de código (más código, más pruebas); paso a cobro por capacidad o uso [A3]', senal: 'Caída de las renovaciones o del ARR orgánico; bajada de precio por puesto' },
      { riesgo: 'Dependencia de la automoción y de la electrónica de consumo (regalías por dispositivo y proyectos nuevos)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 a −15 %', mitigante: 'Diversificación hacia medicina, industria, defensa y edificios (SAUTER) [A3, B6]', senal: 'Licencias de distribución por debajo de 45 M al año' },
      { riesgo: 'Competencia de Flutter, de las alternativas abiertas (Slint, LVGL) y de Unity y Unreal en las pantallas de coche', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Costes de cambio de plataformas certificadas para 5-10 años [B1]', senal: 'Pérdida de una plataforma de un fabricante de coches grande' },
      { riesgo: 'Margen: la reorganización no devuelve el EBITDA al 29-30 % en 2027', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % del objetivo a 12 meses', mitigante: 'Ahorro de ≥ 20 M anunciado y 3 M de IAR; consenso aún más optimista [A8, D3]', senal: 'Guía de 2027 por debajo de un margen EBITA del 25 %' },
      { riesgo: 'Compra de IAR: precio alto (prima del 66 %, ≈ 13 veces el EBITDA) y ventas a la baja en 2026 por el paso a suscripción', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'IAR tenía un margen EBITDA del 36 %; suscripción mayoritaria en las reservas [A9, A3]', senal: 'Deterioro del fondo de comercio (167 M) o ventas de IAR que no vuelven a crecer en 2027' },
      { riesgo: 'Credibilidad de la dirección: tres años sin cumplir la guía de ventas y cambio de director financiero', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Guía de 2026 prudente y reiterada; compras del presidente [C7, C4]', senal: 'Nueva rebaja de guía' },
      { riesgo: 'Deuda tras IAR: 84 M de deuda neta y covenants', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Flujo libre de ≈ 26 M al año; vencimientos de 33 M al año [A1]', senal: 'Deuda neta por encima de 2,5 veces el EBITDA' },
      { riesgo: 'Múltiplo y volatilidad: beta de 1,2-2,0 y caídas del 50-89 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '±30 % en un año', mitigante: 'PER de 21,8 sobre el BPA de 12 meses, bajo para su historia', senal: 'Caídas del software europeo por la IA, como el 29-ene-2026' },
    ],
    premortem: 'Octubre de 2028: la acción ha perdido un 40 %. Los asistentes de IA generaron en 2027 interfaces completas en Flutter y tecnologías web a partir de un dibujo, y los fabricantes de electrónica e industria dejaron de renovar puestos de Qt; los coches chinos usaron herramientas locales y los europeos recortaron proyectos. Las regalías siguieron a la baja con la producción, IAR no volvió a crecer y el margen se quedó en el 25 %. El BPA de 2028 fue de 1,50 EUR en vez de 2,03 y el mercado pagó 18 veces. La señal temprana: un ARR orgánico creciendo menos del 5 % y una guía de 2027 con margen EBITA por debajo del 25 %.',
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−35 % a +15 % a 3-5 años (es la diferencia entre el bajista y el alcista)',
      comentario: 'Es el riesgo central. En contra: Qt cobra por puesto de programador y la IA reduce los programadores necesarios y abarata escribir interfaces con herramientas gratuitas (Flutter, web, LVGL) que los modelos dominan porque hay más código público; la propia empresa espera pasar de la venta por puesto al cobro por capacidad o uso [A3]. A favor: en coches, equipos médicos e industria el software tiene que estar certificado, probado y mantenido diez años, y más código generado exige más pruebas, análisis estático y compiladores certificados, donde están Squish, Axivion e IAR; Qt integra asistentes de IA en Qt Creator y Axivion con NVIDIA Halos [A3, A1]. Hoy las cifras no muestran el daño (renovaciones estables, ARR orgánico ≈ +11 %), pero el crecimiento orgánico de 2025 (2,6 %) y la caída de la acción con SAP el 29-ene-2026 dicen que el mercado lo teme [A1, D1]. Señales: renovaciones y precio por puesto, ARR orgánico y las ventas de las herramientas de calidad.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'IA y puestos', pregunta: '¿Cómo han evolucionado el número de puestos de programador y el precio por puesto en las renovaciones de 2026, y qué parte del ARR está ya en cobro por capacidad o uso?', por_que: 'Es el riesgo central: la diferencia entre el bajista (−37 %) y el alcista.' },
      { tema: 'Crecimiento orgánico', pregunta: '¿Cuál es el crecimiento orgánico del ARR y de las ventas sin IAR en 2026, y por qué fue del 2,6 % en 2025?', por_que: 'El base supone un 8 % desde 2027.' },
      { tema: 'Regalías', pregunta: '¿Qué parte de las licencias de distribución viene de automoción y de electrónica de consumo, y qué volumen de 2025 fue excepcional?', por_que: 'Bajaron un 17 % en el semestre; son el 26 % de las ventas.' },
      { tema: 'Margen 2027', pregunta: '¿Qué margen EBITA alcanza la empresa en 2027 con el ahorro completo de la reorganización y de IAR?', por_que: 'El objetivo a 12 meses depende de un EBITDA del 29-30,5 % en 2027-2028.' },
      { tema: 'IAR', pregunta: '¿Cuándo vuelven a crecer las ventas de IAR y cuánto ARR aporta la suscripción?', por_que: '205 M EUR pagados con una prima del 66 % y 122,5 M de fondo de comercio.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. La regla a 12 meses da mucho: un objetivo de 50,61 EUR (nuestro BPA publicado de 2028e × el PER de la regla común), +47,6 % ponderado y +42,1 % en el base, frente a 34,28 EUR (cierre del 21-oct-2026). Pero el valor intrínseco es de 33,50 EUR, un 2,3 % bajo el precio, y la regla de compra exige las tres cosas. La razón de fondo: el objetivo a 12 meses supone que el BPA pasa de 1,11 EUR en 2026e a 2,03 en 2028e (reorganización, IAR y crecimiento del 8 %) y que el mercado vuelve a pagar 24 veces; el DCF, con un WACC del 10,4 % y un margen que no vuelve al máximo de 2024 por la IA y la competencia gratuita, dice que el precio ya paga ese negocio. Compraríamos por debajo de 33,50 EUR. La convicción es baja porque las reglas discrepan (la regla a 12 meses y la prima del mercado dicen Comprar; el DCF con nuestro WACC, Mantener) y porque el precio está a solo un 2,3 % del valor intrínseco; la subiría un margen de 2027 confirmado cerca del 30 % sin pérdida de puestos por la IA, y la bajaría una caída del ARR orgánico.

**El negocio.** Qt vende las herramientas con las que los fabricantes programan los aparatos con pantalla o chip: el marco Qt de interfaces gráficas, herramientas de prueba y, desde octubre de 2025, los compiladores de IAR [B1, A1]. Cobra por puesto de programador (66 % de las ventas) y una regalía por cada aparato fabricado con Qt (26 %), con un margen bruto casi total [A1]. Depende de la automoción y de la electrónica: las regalías subieron un 26 % en 2025 y bajaron un 17 % en el primer semestre de 2026 [A3]. Calidad: ROIC del 17,7 % en 2025 según el motor (+7,3 puntos sobre el WACC: pasa), aunque con todo el capital de IAR es del 11-12 %, casi el WACC. Sostenibilidad del crecimiento: «Sí» (6,6 % anual frente al 10,8 % del mercado).

**Finanzas.** Las ventas crecieron un 22 % anual de 2020 a 2025, pero el orgánico cayó al 2,6 % en 2025 y el beneficio por acción pasó de 2,26 EUR en 2024 a 1,25 en 2025 y 0,90 en los 12 meses a junio de 2026, con 10 M de costes no recurrentes y la amortización de IAR [A1, A3]. Deuda neta de 84 M (1,6 veces el EBITDA de 12 meses) tras pagar ≈ 205 M por IAR; flujo libre de ≈ 26 M al año [A3]. Guía de 2026: ventas +10 % o más y margen EBITA de al menos el 15 %.

**Equipo y gobierno.** Juha Varelius dirige desde 2016 y creció muy bien hasta 2024, pero lleva tres años sin cumplir la guía de ventas y en 2025 avisó de beneficios [C7]. El presidente (Robert Ingman, 21,6 %) compró 52.000 acciones a ≈ 26 EUR en mayo [C4]. Incentivos ligados a las ventas, no al rendimiento del capital.

**Valoración.** DCF 33,09 EUR (−3,5 %); el precio descuenta un 7,2 % de crecimiento anual frente a nuestro 6,6 %. Con la prima del mercado (4,2 %) el DCF vale 42,21 EUR. Bajista 21,49 y alcista 39,50: asimetría desfavorable en valor intrínseco. Cotiza a 21,8 veces el BPA de los próximos 12 meses, frente a 28-65 veces en su historia y 24,4 de mediana de los comparables.

**Riesgos y catalizadores.** El riesgo central es la IA: puede reducir los puestos de programador y abaratar las interfaces con herramientas gratuitas, o hacer más necesarias las pruebas y herramientas certificadas de Qt. Después, la automoción y la electrónica, Flutter y Unity/Unreal, el margen de 2027 y el precio pagado por IAR. Catalizador: resultados del 3T26 el 29-oct. La acción ha subido un 47 % en tres meses (aviso P1), con causa en el semestral y las compras del presidente.

**Qué cambiaría la decisión.** Comprar por debajo de 33,50 EUR; vender por encima de 56,23. Una guía de 2027 con margen EBITA cercano al 30 % y un ARR orgánico de dos dígitos subirían el valor intrínseco por encima del precio; renovaciones a la baja por la IA o un margen de 2027 por debajo del 25 % llevarían al bajista.`,
    tesis: 'Qt es un buen negocio pasando un mal momento: herramientas de software casi sin coste variable, clientes que se quedan una década porque cambiar de plataforma certificada es caro y un ROIC sin fondo de comercio del 35 %. En 2025 se juntaron el frenazo del crecimiento (orgánico del 2,6 %), una compra cara (IAR, ≈ 205 M) y el miedo a que la IA haga innecesaria parte de lo que vende; el BPA cayó a la mitad y la acción llegó a caer un 89 % desde el máximo de 2021 [A1, D1].\n\nEl precio de hoy (34,28 EUR) ya descuenta la recuperación: la reorganización y el ahorro de IAR devolverían el margen EBITDA al 29-30 % en 2027-2028 y el BPA a ≈ 2 EUR. Si eso pasa y el mercado paga 24 veces, la acción sube un 40 %; pero el DCF dice que con un 10,4 % de coste de capital ese negocio vale lo que cuesta. La IA decide entre las dos lecturas.',
    vision_diferencial: {
      mercado_descuenta: 'Que el margen vuelve al ≈ 30 % en 2027 (consenso: EBITDA de 79,7 M) y que el crecimiento orgánico se recupera; los analistas, en mantener de media con objetivo de 34,25 EUR, no ven más recorrido.',
      nuestra_vision: 'Coincidimos en la recuperación del margen, algo menos que el consenso (30,5 % frente a 32,7 % en 2028e), y vemos la IA como un riesgo real para la venta por puesto, que la empresa misma reconoce al prever el cobro por capacidad.',
      por_que: 'El orgánico de 2025 (2,6 %) llegó antes que la IA generativa en las herramientas embebidas; las renovaciones estables protegen la base pero no los proyectos nuevos, que son el crecimiento [A1, A3].',
    },
    a_favor: [
      '**Recuperación del beneficio**: ahorro de ≥ 20 M al año y 3 M de IAR; el BPA podría casi duplicarse de 2026 a 2028.',
      '**Clientes cautivos**: plataformas certificadas para 5-10 años; renovaciones estables y ARR de 160 M.',
      '**Barata para su historia**: 21,8 veces el BPA de 12 meses frente a 28-65 veces; 4,1 veces ventas frente a 4,7 pagadas por IAR.',
      '**Compras del presidente**: Ingman (21,6 %) compró 52.000 acciones en mayo de 2026.',
      '**Más pruebas con más código**: Squish, Axivion e IAR ganan si la IA genera más software que hay que certificar.',
    ],
    en_contra: [
      '**Riesgo de IA en la venta por puesto**: la empresa prevé pasar a cobrar por capacidad o uso.',
      '**Crecimiento orgánico débil**: 2,6 % en 2025; regalías −17 % en el primer semestre de 2026.',
      '**IAR cara**: prima del 66 %; el ROIC con todo el capital cae al 11-12 %, casi el WACC.',
      '**Dirección sin crédito**: tres años sin cumplir la guía de ventas.',
      '**Valor intrínseco bajo el precio**: DCF de 33,09 EUR; bajista −37 %.',
    ],
    que_vigilar: 'La tesis depende de que la reorganización devuelva el margen EBITDA al 29-30 % en 2027 y de que la IA no reduzca las renovaciones de puestos. La señal en contra sería un ARR orgánico creciendo menos del 5 %, una guía de 2027 con margen EBITA por debajo del 25 % o licencias de distribución por debajo de 45 M al año.',
    cambiaria_recomendacion: [
      'Precio por debajo de 33,50 EUR: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio por encima de 56,23 EUR: Vender.',
      'Guía de 2027 con margen EBITA ≥ 28 % y ARR orgánico ≥ 10 %: subir márgenes y revisar al alza el valor intrínseco.',
      'Renovaciones o precio por puesto a la baja por la IA: pasar al bajista.',
      'Deterioro del fondo de comercio de IAR: revisar calidad.',
    ],
    kpis_seguimiento: [
      { kpi: 'ARR (orgánico y total)', nivel_actual: '160,4 M (+32,1 % con IAR; ≈ +11 % orgánico)', umbral_alerta: 'Orgánico < 5 %', por_que: 'Mide si la IA está quitando puestos.' },
      { kpi: 'Margen EBITA', nivel_actual: '12,6 % (1S26); guía 2026 ≥ 15 %', umbral_alerta: '< 25 % en 2027', por_que: 'Base del BPA de 2028e.' },
      { kpi: 'Licencias de distribución', nivel_actual: '56,8 M (2025); −17 % en 1S26', umbral_alerta: '< 45 M al año', por_que: 'Exposición a automoción y electrónica.' },
      { kpi: 'Ventas de IAR', nivel_actual: 'A la baja en 2026 (suscripción)', umbral_alerta: 'Sin crecimiento en 2027', por_que: 'Justifica los 205 M pagados.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '1,6 veces (jun-26)', umbral_alerta: '> 2,5 veces', por_que: 'Covenants del préstamo de IAR.' },
    ],
  },
};
