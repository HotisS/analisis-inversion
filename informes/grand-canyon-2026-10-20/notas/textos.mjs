// Textos del analista (Grand Canyon Education, corte 2026-10-20). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio a 31 de diciembre. Último trimestre publicado: 2T26 (30-jun-2026); el LTM es jul-25 a jun-26 y el 3T26 se publica el 4-nov-2026. Precio: cierre del 19-oct-2026 (162,11 USD); la decisión se comprueba con el precio del día en las pruebas de robustez. El BPA de la regla a 12 meses y su historia están en la base AJUSTADA de la empresa (sin la amortización de los intangibles de Orbis ni acuerdos judiciales o deterioros; con los pagos en acciones como coste), la misma que el consenso; el DCF no suma de vuelta ni los pagos en acciones ni las aportaciones a fundaciones escolares de Arizona. Los ingresos dependen de datos de matrícula de GCU, que el auditor no audita directamente (asunto clave de auditoría) [A1]. No hay ficha sectorial de educación en el repositorio: el perímetro del sector (alumnos a distancia, NCES) no tiene tamaño en dólares, por eso no hay mercado final en la prueba de sostenibilidad. Calificaciones ESG no comprobadas en fuente primaria. Una acción ≈ 139 EUR (≈ 1,16 USD por EUR), un 0,5 % de una cartera de 30.000 EUR.',
  controles_explicados: [],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Grand Canyon College nace en 1949 como universidad cristiana en Arizona; en 2004 la compran inversores privados (Significant Education), que la convierten en universidad con ánimo de lucro con fuerte negocio en línea, y en noviembre de 2008 sale a bolsa como Grand Canyon Education (LOPE), con Brian Mueller de consejero delegado [A1]. El 1-jul-2018 vende la universidad a una entidad sin ánimo de lucro (Gazelle University, hoy GCU) y pasa a ser su proveedor de servicios (captación, tecnología, apoyo académico y administrativo) a cambio del 60 % de la matrícula, con un contrato maestro (MSA) a largo plazo [A1]. En 2019 compra Orbis Education (361 M USD), servicios de enfermería acelerada para otras universidades [A1]. GCU devolvió en 2021 el préstamo con que pagó la compra y GCE recompró ≈ 1.400 M USD de acciones en 2021-2022 [A1]. Desde 2021 vive en litigio con el Gobierno: el Departamento de Educación (ED) negó a GCU el estatus sin ánimo de lucro y la multó con 37,7 M en 2023; la FTC la demandó por publicidad engañosa. Todo se ha ido cerrando: la multa se anuló en mayo de 2025, la FTC archivó en agosto de 2025, el qui tam se pactó en 35 M y el ED reconoció a GCU como sin ánimo de lucro el 15-dic-2025 [A7, A10]. En julio de 2026 GCU y GCE firman un MSA nuevo hasta 2041 [A4].',
      hitos: [
        { anio: '1949', hito: 'Fundación de Grand Canyon College en Arizona.' },
        { anio: '2004', hito: 'Compra por inversores privados (Significant Education); paso a universidad con ánimo de lucro.' },
        { anio: '2008', hito: 'Salida a bolsa en el Nasdaq (LOPE); Brian Mueller consejero delegado.' },
        { anio: '2018', hito: 'Venta de la universidad a GCU (sin ánimo de lucro); GCE pasa a ser su proveedor de servicios con el 60 % de la matrícula [A1].' },
        { anio: '2019', hito: 'Compra de Orbis Education (enfermería acelerada para otras universidades) por 361 M USD [A1].' },
        { anio: '2021-2022', hito: 'GCU devuelve el préstamo de la compra; recompras de ≈ 1.400 M USD [A1].' },
        { anio: '2023', hito: 'Multa de 37,7 M USD del ED y demanda de la FTC [A7].' },
        { anio: '2025', hito: 'Multa anulada, FTC archivada, qui tam pactado en 35 M y GCU reconocida sin ánimo de lucro por el ED [A7, A10].' },
        { anio: '2026', hito: 'MSA modificado hasta 2041 sin rescisión por conveniencia; director financiero de baja; línea de crédito para recompras [A4, A8].' },
      ],
      confianza: 'Alta',
    },
    rentabilidad: {
      comentario: 'El ROIC es muy alto y sube: 51,9 % en 2025 (NOPAT de 235 M sobre 453 M de capital invertido sin caja) y 80,5 % sin el fondo de comercio de Orbis, frente a un WACC del 10,39 %: ≈ +41 puntos. En 2019-2020 era del 15 % porque el capital incluía el préstamo a GCU (≈ 1.000 M); al cobrarlo y recomprar acciones, el capital bajó a menos de la mitad mientras el resultado operativo se mantenía [A1]. Lo mueve el modelo de negocio: GCE no necesita aulas ni licencias propias (son de GCU), cobra un porcentaje de la matrícula y reinvierte poco (capex del 3-4 % de las ventas, circulante pequeño). La contrapartida es que el capital no es la barrera: la barrera es el contrato con GCU y su capacidad de captar alumnos con ayudas federales. Calidad: «Sí» (ROIC − WACC muy por encima de 5 puntos), con el matiz de que el rendimiento depende de un solo cliente.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material es la protección del alumno: publicidad y captación (la FTC y el ED la acusaron de engañar sobre el coste de los doctorados), resultados de empleo y deuda de los egresados (reglas de ganancias profesionales de la OBBBA desde julio de 2027), y el gobierno corporativo de una empresa cuyo consejero delegado es también presidente de su cliente principal [A1, B1, C1]. Ambiental, poco relevante: oficinas y centros de datos en Phoenix.',
      controversias: 'Litigios con el Gobierno por la conversión de GCU en entidad sin ánimo de lucro (2021-2025, ya cerrados a favor de GCU), demanda de la FTC archivada en 2025, qui tam pactado en 35 M USD y demandas colectivas abiertas sin provisión (Smith y Wang, Ogdon, Valerio) [A4, A7]. Doble papel de Brian Mueller (presidente de GCU y consejero delegado y presidente del consejo de GCE). Director financiero de baja desde agosto de 2026 por una investigación del Gobierno sobre operaciones de un tercero [C3]. Calificaciones de MSCI o Sustainalytics no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+5,7 %, fijo) es el centro de la guía (1.165,3-1.172,3 M [A3]), ya con medio año del MSA nuevo (≈ −20 M de ingresos al año sin efecto en el resultado operativo [A4]). Después +5,5 % en 2027e-2028e (consenso de 2027: +6,1 % [D2]) y descenso hasta el 3,0 % en 2033e: por debajo del 6,0 % anual de 2019-2025 porque las nuevas matrículas en línea crecen ya a un dígito bajo [A9], el MSA resta un punto en 2027 y los topes de préstamos de posgrado (OBBBA) frenan los programas caros. Lo empujan las sedes híbridas de enfermería (47 al 60 % de capacidad, objetivo 80 %, 3-5 nuevas en 2027) y la facultad de Derecho en 2027 [A9].',
    margenes: 'Margen EBITDA (con pagos en acciones como coste y sin acuerdos judiciales) del 31,7 % en 2026e, calibrado con la guía de margen operativo GAAP (28,0-28,2 %) [A3], hasta el 33,0 % en 2030e. La subida (1,3 puntos) es menor que la diferencia con 2019 (37 % de EBITDA) y viene del MSA (menos ingresos sin menos resultado), de la maduración de las sedes híbridas y del apalancamiento de costes fijos; la eficiencia del marketing empeora por la IA y la limita [A9].',
    inversion: 'Inversión del 3,3-3,6 % de las ventas (34,8 M en 2025 = 3,1 % [A1]): sedes híbridas y tecnología; amortización del 3,6 % (39,6 M en 2025, con 8,4 M de Orbis). Circulante del 5,4 % de las ventas (clientes − proveedores; con los demás pasivos corrientes sería ≈ −1 %): prudente. No hay compras previstas.',
    wacc: 'Tasa libre del 5,15 % (Tesoro a 10 años, 19-oct-2026 [D3]); beta de 0,77 (mensual ajustada a 5 años [D1]); prima del 5,5 % y 1 punto de prima adicional por el riesgo que la beta no ve: un cliente da el 89 % de los ingresos y todo depende de las ayudas federales al estudio. Sin deuda. WACC del 10,39 %. Con la prima implícita del mercado (4,2 % [D4]) y la misma prima adicional, el WACC baja al 9,38 % y el DCF sube a 178,82 USD.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %, por debajo de la inflación más el crecimiento de la población adulta que estudia: es un negocio maduro en una regulación que puede cambiar. El múltiplo implícito (8,8 veces el EBITDA) queda por debajo de las 11,1 veces a las que cotiza hoy. El valor terminal pesa el 59 %.',
  },
  puente_comentarios: {
    '2026e': 'Matrículas de los socios +6-7 % (GCU en línea, Orbis), precio casi plano (GCU no sube la matrícula del campus desde 2008) y −1,3 puntos del MSA nuevo desde julio (comisiones solo sobre matrícula y tasas académicas, sin reembolso académico) [A3, A4].',
    '2027e': 'Volumen +5,5 % (sedes híbridas, Derecho, en línea a un dígito bajo); el MSA resta otro medio punto al cumplir el año completo.',
    '2028e': 'Volumen +5 % y precio +0,5 %; primer año completo de las reglas de ganancias profesionales («Do No Harm»).',
    '2029e': 'Volumen +4,5 %: madurez de las sedes abiertas en 2025-2027.',
    '2030e': 'Volumen +4 %, convergiendo con el crecimiento de los adultos que estudian a distancia.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (4,6 % medio en 2026e-2033e) está por debajo del histórico (6,0 % en 2019-2025) y casi no necesita capital: el ROIC (51,9 %) permite financiar un 8,7 % anual con la reinversión actual, y el motor da también «Sí». No hay tamaño en dólares del mercado (los datos del NCES están en alumnos: ≈ 5,7 millones solo a distancia en 2021 [B2]); con ≈ 2 % de cuota estimada, crecer al 4-5 % no exige ganar cuota de forma visible. El riesgo para el crecimiento no es de capital sino de regulación y de captación: un cambio en las ayudas federales o en las reglas de ganancias, o un coste de captación que sube con la IA, lo recoge el bajista.',
  dcf_lectura: 'El DCF da 157,60 USD por acción, un 2,8 % por debajo del precio, con un WACC del 10,39 % y un valor terminal del 59 %. El DCF inverso dice que el precio descuenta un crecimiento del 5,0 % anual con nuestros márgenes, frente al 4,4 % de nuestro caso base: el mercado espera algo más de lo que proyectamos. Con la prima de riesgo que pide hoy el mercado (4,2 %) vale 178,82 USD (+10,3 %); la diferencia la hace la prima adicional de un punto por el riesgo de cliente único y regulación, que mantenemos en los dos cálculos. El bajista (crecimiento −3 puntos y margen −2 puntos: menos alumnos por regulación o IA) vale 117,61 USD (−27,5 %).',
  narrativas: {
    Bajista: 'Los topes de préstamos de posgrado y las reglas de ganancias profesionales recortan programas caros de GCU (doctorados, máster de educación); la IA abarata la educación en línea y encarece la captación de alumnos; una demanda colectiva o un nuevo frente regulatorio pesa sobre la marca. Crecimiento 3 puntos menor y margen 2 puntos menor; WACC +0,5.',
    Base: 'Crecimiento del 5-5,5 % con sedes híbridas, enfermería y Derecho, margen EBITDA que sube del 31,7 % al 33 % y el MSA hasta 2041 sin cambios.',
    Alcista: 'Las sedes híbridas llegan al 80 % de capacidad, GCU sin ánimo de lucro capta más alumnos y Orbis suma socios: 1,5 puntos más de crecimiento y 0,8 más de margen.',
  },
  escenarios_comentario: 'La asimetría del DCF es desfavorable: el alcista vale 173,77 USD (+7,2 %) y el bajista 117,61 (−27,5 %). El margen ya es alto y la prima adicional del WACC ya recoge el riesgo, pero el bajista de regulación tiene más recorrido que el alcista de ejecución. Ponderado: 151,65 USD, un 6,5 % por debajo del precio.',
  casos_12m: {
    Bajista: 'Crecimiento 3 puntos menor en 2027e y 2028e y margen 2 puntos menor por regulación, captación más cara o un tropiezo legal: BPA ajustado de 10,47 USD en 2028e (−12 % frente al base) y PER de 12,3 veces (base × 0,8), por debajo del mínimo de cinco años (14,4).',
    Base: 'Ventas +5,7 % en 2026e y +5,5 % en 2027e y 2028e, margen EBITDA del 32,4 % en 2028e, intereses cobrados de 10 M, tipo del 23,5 % y 25,4 M de acciones (las de la guía del 4T26, sin recompras no anunciadas): BPA ajustado de 11,84 USD (+9,3 % anual desde los 9,08 de 2025).',
    Alcista: 'Un punto y medio más de crecimiento y 0,8 puntos más de margen: BPA de 12,49 USD y PER de 16,3 veces (media de ocho años).',
  },
  diferencia_consenso: 'Nuestro BPA ajustado de 2026e (10,20 USD) coincide con el consenso (10,21) y con la guía (10,18-10,32) [A3, D2]; el de 2027e (11,10) queda un 1,9 % por debajo del consenso (11,31) porque no incluimos recompras no anunciadas (quedan 124 M de autorización hasta el 1-mar-2027 y una línea de 100 M para recomprar [A4, A8]; cada 100 M recomprados a este precio suman ≈ 2,4 % al BPA). La distancia con el objetivo medio de los tres analistas (194 USD, todos con compra) está en el múltiplo y en las recompras: a 16-17 veces el BPA de 2027 con recompras se llega a 190-195.',
  objetivo_comentario: 'El objetivo a 12 meses (174,26 USD, ponderado) da un +7,5 % y el base (182,34) un +12,5 % (sin dividendo). El base lleva el PER de 14,6 a 15,4 veces (a mitad de camino de la mediana adelantada de 16,3) sobre un BPA que crece un 9,3 % anual; el bajista (128,78, −20,6 %) es lo que baja la ponderada. Crecimiento del BPA base del 9,3 % anual desde el ajustado de 2025 (el motor lo mide desde el GAAP de 7,71, que incluye el acuerdo de 35 M). Para comprar haría falta un precio de 151,53 USD (−6,5 %): ahí la ponderada pasa del 15 % y el valor intrínseco (155,71) queda por encima del precio. Para vender (ponderada ≤ −10 %), un precio por encima de 193,62 USD.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %. El DCF es el método más fiable para un negocio sin deuda con flujo estable, pero depende de la prima por cliente único. Los comparables pesan poco porque ninguno tiene el mismo modelo (universidades propias con ánimo de lucro, colegios en línea, escuelas técnicas) y la mediana de su PER (14,7 veces) es muy parecida a la de LOPE (14,6). Las transacciones no pesan: la única es la propia compra de Orbis (2019). El valor objetivo de la síntesis es de 155,71 USD (−3,9 %); el rango del DCF con ± 0,5 puntos de WACC y de crecimiento (144-175) contiene el precio.',
  catalizadores: {
    items: [
      { fecha: '2026-11-04', evento: 'Resultados del 3T26', efecto: 'Matrículas de otoño de GCU en línea y en el campus; guía del 4T (3,75-3,85 USD ajustado)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11-01', evento: 'Fecha límite de la regla final de ganancias profesionales («Do No Harm») para aplicarse el 1-jul-2027', efecto: 'Qué programas de GCU quedan expuestos', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con el MSA nuevo todo el año; frente a 11,31 USD de consenso', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-03-01', evento: 'Vencimiento de la autorización de recompra (124 M a 30-jul)', efecto: 'Nueva autorización probable; línea de 100 M disponible', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Vuelta o sustitución definitiva del director financiero', efecto: 'Cierra la incertidumbre de la investigación', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-09', evento: 'Apertura de la facultad de Derecho y 3-5 sedes híbridas nuevas', efecto: 'Crecimiento de matrículas', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Demandas colectivas (Smith y Wang, Ogdon, Valerio)', efecto: 'Posibles cargos sin provisión', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Dependencia de GCU: 89 % de los ingresos y del flujo; un problema de GCU (acreditación, ayudas federales, reputación) es un problema de GCE', tipo: 'Clientes', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−50 % o más si el contrato se rompe', mitigante: 'MSA hasta 2041 sin rescisión por conveniencia, con 18 meses de servicio si no se renueva; GCU ya reconocida sin ánimo de lucro [A4, A10]', senal: 'Caída de matrículas de GCU, cambio de dirección en GCU o disputa sobre el MSA' },
      { riesgo: 'Ayudas federales y reglas de ganancias profesionales: topes a los préstamos de posgrado desde jul-2026 y prueba «Do No Harm» desde jul-2027', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −25 %', mitigante: 'La dirección dice que los topes no han afectado a ningún programa; precios bajos de GCU frente a otras privadas [A9]', senal: 'Programas de GCU en la lista de bajo rendimiento o menos matrículas de posgrado' },
      { riesgo: 'Inteligencia artificial: abarata o sustituye títulos en línea y encarece la captación (los buscadores con IA responden sin llevar tráfico)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −15 % a 3-5 años', mitigante: 'La parte presencial e híbrida (campus de Phoenix, enfermería con prácticas clínicas) no se sustituye y los títulos acreditados con ayudas federales no los sustituye un chatbot', senal: 'Coste de captación por alumno al alza y matrículas nuevas en línea planas o negativas' },
      { riesgo: 'Litigios y Gobierno: demandas colectivas sin provisión; nuevo frente del ED o la FTC', tipo: 'Litigios', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −8 %', mitigante: 'Los grandes frentes (multa del ED, FTC, qui tam) están cerrados [A7]', senal: 'Certificación de una demanda colectiva o nueva investigación' },
      { riesgo: 'Gobierno corporativo: el consejero delegado preside también GCU; director financiero de baja por una investigación', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Señal, −2 a −5 %', mitigante: 'Consejo mayoritariamente independiente; la investigación es sobre operaciones de un tercero [C3]', senal: 'Que la investigación alcance a la empresa o retrasos en la presentación de cuentas' },
      { riesgo: 'Captación de alumnos más cara (marketing digital, competencia de universidades públicas en línea)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Marca GCU y precios congelados en el campus', senal: 'Margen operativo de 2027 por debajo de 2026' },
    ],
    premortem: 'Octubre de 2028: la acción ha perdido un 35 %. La regla «Do No Harm» dejó fuera de las ayudas federales a varios programas de posgrado de GCU (doctorados de educación y psicología) en su primera lista de 2028, y los topes de préstamos de posgrado cortaron la matrícula en los másteres caros. A la vez, la IA hizo que el coste de captar un alumno en línea subiera un 30 %: los buscadores respondían sin llevar tráfico y los alumnos de adultos probaban certificados baratos. GCU creció un 1 % en línea y GCE, que cobra un 60 % de la matrícula, vio cómo su margen bajaba 3 puntos. Una demanda colectiva certificada y la salida definitiva del director financiero remataron la confianza; el mercado pagó 11-12 veces. La señal temprana: matrículas nuevas en línea negativas en el 3T26 o el 4T26 y una lista de programas de bajo rendimiento con nombres de GCU.',
    ia: {
      exposicion: 'Media', sentido: 'Negativo', efecto_valor: '−5 a −15 % a 3-5 años',
      comentario: 'La IA toca dos piezas del negocio. La captación: GCE gana dinero llevando alumnos a GCU, y la propia dirección reconoce que el paso a búsquedas con IA baja la eficiencia del marketing [A9]; si cada alumno cuesta más, el 60 % de la matrícula deja menos margen. El producto: la parte de la formación en línea que es contenido y tutoría (cursos generales, programas de grado y máster genéricos) es la que la IA abarata más; casos como Chegg (ayuda al estudio hundida por los chatbots) y la presión sobre Coursera muestran que el contenido en línea sin credencial ni práctica se vuelve barato. Lo que protege es lo que la IA no da: títulos acreditados financiables con ayudas federales, prácticas clínicas de enfermería (Orbis, sedes híbridas), campus presencial en Phoenix y el componente religioso de GCU. Del lado positivo, la IA puede bajar el coste de tutoría y servicios al alumno que presta GCE. Neto: negativo moderado. Señal: matrículas nuevas en línea por debajo de cero y gasto en captación por alumno al alza [D7, E2].',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Reglas de ganancias', pregunta: '¿Qué programas de GCU (y cuántos alumnos e ingresos) quedarían por debajo de la prueba «Do No Harm» con los datos de egresados disponibles hoy?', por_que: 'Es el principal escenario bajista y no está cuantificado en ninguna fuente pública.' },
      { tema: 'IA y captación', pregunta: '¿Cuánto ha subido el coste de captación por alumno nuevo en línea en 2025-2026 y qué parte del tráfico llega ya desde buscadores con IA?', por_que: 'Mide el riesgo de IA en el margen antes que en las matrículas.' },
      { tema: 'MSA', pregunta: '¿Qué pasa con los 18 meses de servicio y el pago de salida si GCU no renueva en 2041, y qué cláusulas permiten a GCU rescindir por incumplimiento?', por_que: 'GCU es el 89 % de los ingresos; la línea de crédito declara impago si el MSA cambia con efecto adverso material.' },
      { tema: 'Director financiero', pregunta: '¿Qué alcance tiene la investigación del Gobierno sobre las operaciones de un tercero y cuándo se resolverá la baja de Dan Bachus?', por_que: 'Un problema en la función financiera retrasa cuentas y recompras.' },
      { tema: 'Recompras', pregunta: '¿Cuánto piensa recomprar en 2027 y con qué uso de la línea de 100 M?', por_que: 'La diferencia con el consenso de BPA de 2027 son las recompras.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 174,26 USD (nuestro BPA ajustado de 2028e × el PER de la regla común), un +7,5 % de rentabilidad ponderada y un +12,5 % en el caso base, frente a un precio de 162,11 USD (cierre del 19-oct-2026). El valor intrínseco (155,71 USD) queda un 3,9 % por debajo del precio y el objetivo medio de los analistas (194) un 20 % por encima. La razón principal: es un negocio excelente (ROIC del 52 %, sin deuda, guía cumplida cada año) que cotiza barato frente a su historia (14,6 veces el BPA de 2027e frente a una mediana de 16,3), pero el bajista de regulación e IA (−21 % a 12 meses) baja la ponderada por debajo del 15 % y el DCF, con un punto de prima por cliente único, no deja margen. La convicción es baja porque las reglas discrepan (con nuestro WACC el valor intrínseco queda por debajo del precio; con la prima del mercado, un 10 % por encima) y porque el bajista depende de una regla de ganancias que aún no se conoce; subiría la convicción una regla final que no toque a GCU o un precio más bajo. Compraríamos por debajo de 151,53 USD.

**El negocio.** GCE presta a universidades los servicios que no son dar clase: captación de alumnos, tecnología, plataforma en línea, apoyo académico y administrativo. Cobra el 60 % de la matrícula y tasas académicas de Grand Canyon University (GCU, 89 % de sus ingresos) y un porcentaje de los programas de enfermería acelerada de otros 19 socios (Orbis) [A1, A4]. Ingresos de 1.106 M USD en 2025 y margen operativo ajustado del 28,3 %. ROIC del 51,9 % frente a un WACC del 10,39 %: calidad «Sí». Sostenibilidad del crecimiento «Sí»: proyectamos un 4,6 % anual, por debajo del 6,0 % histórico, casi sin capital.

**Finanzas.** El BPA ajustado creció un 8,7 % anual de 2019 a 2025 (de 5,48 a 9,08 USD) con ventas al 6,0 % y recompras que bajaron las acciones diluidas de 48,3 M a 28,0 M [A1, A5]. Guía de 2026: 10,18-10,32 USD ajustado [A3]. Sin deuda y 274,5 M de caja e inversiones a 30-jun-2026; flujo operativo de 273,5 M en 2025, casi todo a recompras (264,8 M) [A1].

**Equipo y gobierno.** Brian Mueller dirige la empresa desde 2008 y preside a la vez GCU: alinea a los dos lados del contrato, pero es el principal conflicto de interés. La guía inicial se ha cumplido cada año de 2022 a 2025 [C6]. Debilidad: el director financiero está de baja desde agosto de 2026 por una investigación del Gobierno sobre operaciones de un tercero [C3]; ningún directivo ha comprado acciones en 12 meses [C5].

**Valoración.** El DCF da 157,60 USD (−2,8 %) y el DCF inverso descuenta un 5,0 % de crecimiento anual frente al 4,4 % de nuestro base. Con la prima del mercado (4,2 %) el DCF sube a 178,82 USD. La regla a 12 meses lleva el PER de 14,6 a 15,4 veces y el bajista a 12,3; con la regla v2 de control (historia al cierre, mediana de 18,3 y PER de 14,3 / 14,6 / 17,7) la ponderada sube al 10,5 % y el base baja al 6,6 %: también Mantener. Con el BPA un 10 % menor, la ponderada v3 cae al −3,3 %: la compra robusta (v3 y v2 con el BPA −10 %) exige 136,43 USD.

**Riesgos y catalizadores.** El mayor riesgo es la dependencia de GCU y de las ayudas federales: los topes de préstamos de posgrado (desde julio de 2026) y la prueba de ganancias profesionales (desde julio de 2027) son el bajista. La IA es un riesgo medio: encarece la captación (ya lo dice la dirección) y abarata la formación en línea genérica, aunque no los títulos acreditados ni las prácticas de enfermería. Los grandes litigios con el Gobierno están cerrados; quedan demandas colectivas sin provisión. Catalizador: resultados del 3T26 el 4-nov-2026 (matrículas de otoño). Sentimiento dividido.

**Qué cambiaría la decisión.** Comprar por debajo de 151,53 USD; Mantener entre 151,53 y 193,62; vender por encima de 193,62. Unas matrículas nuevas en línea positivas en el 3T26 y una regla de ganancias que no afecte a GCU mejorarían el bajista; programas de GCU en la lista de bajo rendimiento, a peor.`,
    tesis: 'GCE es la empresa de servicios que hay detrás de Grand Canyon University: capta a los alumnos, lleva la tecnología y la plataforma en línea y gestiona la administración, a cambio del 60 % de la matrícula. Desde que vendió la universidad en 2018 gana mucho sobre muy poco capital (ROIC del 52 %), sin deuda, y devuelve casi todo el flujo con recompras: las acciones han bajado de 48 a 26 millones en seis años [A1].\n\nEl precio (14,6 veces el BPA ajustado de 2027e) está por debajo de su historia (mediana de 16,3) porque el mercado descuenta dos riesgos reales: la regulación de las ayudas federales (topes de préstamos de posgrado y la prueba de ganancias profesionales) y la IA, que encarece la captación y abarata la formación en línea. La dependencia de GCU es total, aunque el MSA nuevo la blinda hasta 2041.\n\nCon la regla común el base gana un 12,5 % y el ponderado un 7,5 %: no llega al 15 %. Para comprar hay que creer que la regulación no toca a GCU o pagar menos (151,53 USD).',
    vision_diferencial: {
      mercado_descuenta: 'Que el BPA crece un 10-11 % al año con recompras y que la regulación y la IA no rompen la captación; los tres analistas esperan ≈ 194 USD, un 20 % más.',
      nuestra_vision: 'Coincidimos en el BPA de 2026 y quedamos un 2 % por debajo en 2027 por no contar recompras no anunciadas. Discrepamos en el riesgo: el bajista de regulación e IA es más probable de lo que reflejan los objetivos de los analistas.',
      por_que: 'Un cliente da el 89 % de los ingresos y depende de ayudas federales cuya regla de ganancias aún no se conoce; la propia empresa reconoce que la IA ya baja la eficiencia del marketing.',
    },
    a_favor: [
      '**ROIC del 52 %** sin deuda: ≈ 41 puntos sobre el WACC.',
      '**MSA hasta 2041** sin rescisión por conveniencia y GCU reconocida sin ánimo de lucro.',
      '**Guía cumplida** cada año de 2022 a 2025; 2026: 10,18-10,32 USD.',
      '**Recompras** constantes: −46 % de acciones desde 2019.',
      '**Barata frente a su historia**: 14,6 veces frente a una mediana de 16,3.',
    ],
    en_contra: [
      '**Un solo cliente**: GCU es el 89 % de los ingresos.',
      '**Regulación**: topes de préstamos de posgrado y prueba «Do No Harm» desde julio de 2027.',
      '**IA**: captación más cara y formación en línea más barata.',
      '**Gobierno**: el consejero delegado preside GCU; director financiero de baja por una investigación.',
      '**Litigios**: demandas colectivas abiertas sin provisión.',
    ],
    que_vigilar: 'La tesis depende de que GCU siga creciendo en matrículas (en línea al menos plano, híbrido y campus al alza) y de que la prueba de ganancias no deje fuera programas relevantes. Señales en contra: matrículas nuevas en línea negativas, margen operativo de 2027 por debajo del de 2026 o programas de GCU en la lista de bajo rendimiento.',
    cambiaria_recomendacion: [
      'Precio por debajo de 151,53 USD: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio entre 151,53 y 193,62 USD: Mantener.',
      'Regla final de ganancias sin programas relevantes de GCU afectados: revisar al alza el bajista.',
      'Matrículas nuevas en línea negativas dos trimestres seguidos: revisar a la baja.',
      'Conflicto sobre el MSA o problemas de acreditación de GCU: Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'Matrículas de los socios', nivel_actual: '136.239 en 2025 (+7,1 %)', umbral_alerta: '< +3 %', por_que: 'Motor de los ingresos.' },
      { kpi: 'Matrículas nuevas en línea de GCU', nivel_actual: 'Crecimiento de un dígito bajo (2T26)', umbral_alerta: 'Negativas', por_que: 'Mide el efecto de la IA y la regulación.' },
      { kpi: 'Margen operativo GAAP', nivel_actual: '28,0-28,2 % (guía 2026)', umbral_alerta: '< 27 %', por_que: 'Captación más cara.' },
      { kpi: 'BPA ajustado', nivel_actual: '10,18-10,32 USD (guía 2026)', umbral_alerta: '< 10,18 USD', por_que: 'Base del objetivo.' },
      { kpi: 'Acciones diluidas', nivel_actual: '25,4 M (guía 4T26)', umbral_alerta: '> 26 M', por_que: 'Las recompras explican la mitad del crecimiento del BPA.' },
    ],
  },
};
