// Textos del analista (Gamma Communications, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de GBP; BPA, DPA y precios en GBP (la acción cotiza en peniques: 1.088 GBp = 10,88 GBP). Ejercicio a 31 de diciembre; último semestre publicado, el 1S 2026 (sin auditar). Precio: cierre del 21-oct-2026 (1.088 GBp; último dato de Yahoo a las 15:38 UTC, la sesión de Londres ya había cerrado) [D2]. LA ACCIÓN ESTÁ BAJO UNA OFERTA EN EFECTIVO DE 1.120 p, RECOMENDADA Y FINAL (Epiris), con juntas el 2-nov-2026 y cierre previsto en el 1T 2027 [D3, D4]: la cotización no refleja el valor del negocio sino la probabilidad de que la oferta se cierre. La regla a 12 meses (BPA × PER) da Comprar de forma mecánica, pero no puede cumplirse con un precio tope de 1.120 p: la recomendación se aparta de ella (ver justificación). El BPA de la regla y su historia van en la base ajustada de la empresa (sin amortización de intangibles de compras ni extraordinarios), la misma del consenso; el DCF resta 0,4 puntos de margen por extraordinarios que se repiten. Tamaño del mercado: estimación propia a partir de la cuota en puestos. Sin dividendos mientras la oferta esté pendiente (el motor suma un 2 % de dividendo que no se cobrará). Precio de una acción en EUR: ≈ 12,97 EUR (1,1922 EUR por GBP [D19]).',
  controles_explicados: [
    { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'La v3 da Comprar (ponderada del 23,0 %, base del 19,6 %) y la v2 Mantener (12,7 %). No es una compra en ningún caso: la oferta en efectivo de 1.120 p, final y recomendada, pone un techo del +2,9 % al precio mientras esté viva, y si fracasa el precio volvería hacia el de antes de la oferta (732 p el 7-abr-2026). La recomendación es Mantener, apartada de la regla con justificación [D3, D4].' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Gamma nació como mayorista de telefonía para el canal de distribuidores del Reino Unido: vendía líneas, minutos y troncales SIP a pequeños instaladores que atendían a pymes, sobre una red de voz propia [A1]. Cotizó en el AIM de Londres y creció con el paso de las centralitas a la nube (Horizon), la voz para Microsoft Teams y la venta directa a grandes empresas (Enterprise) [A1]. Desde 2017 salió al continente (Países Bajos, España, con resultados flojos y deterioros en 2022-2023) y, con Andrew Belshaw como consejero delegado desde 2022, se volcó en Alemania: Placetel (2024, comprada a Cisco) y Starface (2025, 196 M EUR) [A4, A7]. En mayo de 2025 pasó al mercado principal y entró en el FTSE 250 [A2]. Tras dos caídas fuertes de la acción (2022 y 2025), el consejo abrió en abril de 2026 un proceso con varios interesados que acabó en la oferta de Epiris a 1.120 p [D3].',
      hitos: [
        { anio: '2019', hito: 'Mejor año en bolsa: +82 %; BPA ajustado de 40,8 p (+35 %) con el paso a la nube [A4].' },
        { anio: '2021', hito: 'Compras de Mission Labs (contact center), Satisnet, Allnet y Desatel; máximo histórico de cotización (≈ 1.850 p) [A4].' },
        { anio: '2022', hito: 'Andrew Belshaw, consejero delegado; deterioro del fondo de comercio de España; la acción cae un 34 % [A4].' },
        { anio: '2024', hito: 'Compra de Placetel a Cisco (Alemania), Coolwave y BrightCloud; primeras recompras [A4].' },
        { anio: '2025', hito: 'Compra de Starface (196 M EUR); paso al mercado principal y al FTSE 250; la acción cae un 40 % por la debilidad del Reino Unido [A1, A7].' },
        { anio: '2026', hito: 'Periodo de oferta desde el 7-abr; oferta recomendada de Epiris a 1.120 p el 1-sep, declarada final el 19-oct; juntas el 2-nov [D3, D4].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Gamma crea valor con holgura: ROIC del 23,6 % en 2025 según el motor (30,0 % en 2024 y 25-28 % en 2021-2023), frente a un WACC del 10,5 %: +13 puntos [A1]. Sin fondo de comercio el ROIC es del 48,7 %: el negocio británico necesita muy poco capital (inversión del ≈ 4-5 % de las ventas, circulante pequeño) [A1]. La bajada de 2025 es Starface: el capital invertido pasó de 223 a 319 M por el fondo de comercio y los intangibles comprados, que ya son la mitad del capital, mientras el beneficio comprado (9,4 M de BAI en 2025) aún no compensa [A1]. El ROIC incremental de 2021-2025 es del 19,6 %. La empresa da un ROCE del 27,8 % en 2025 y del 30 % en los 12 meses a junio de 2026 [A1, A9]. Riesgo: si Alemania no crece lo previsto, el ROIC bajará hacia el 20 % y habrá deterioros como los de España.',
      confianza: 'Alta',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Gamma es la continuidad del servicio (las comunicaciones son críticas: llamadas de emergencia, clientes vulnerables en el apagado del cobre), la ciberseguridad y la protección de datos de las llamadas, y la gestión del canal de distribuidores [A1]. Sus emisiones son pequeñas (oficinas y centros de datos); el informe anual dice tener objetivos validados por la Science Based Targets initiative [A1]. Lo social pesa en el empleo: 2.243 personas, reestructuración en el Reino Unido en 2025 y compromiso de Epiris de no reducir plantilla de forma material en 12 meses salvo funciones de empresa cotizada [D3].',
      controversias: 'Sin controversias relevantes encontradas. En gobierno: el presidente fue reelegido con solo un 79,35 % en mayo de 2026 y el consejo vende la empresa por debajo de los precios de 2019-2024 [C2, C6]. Calificaciones de MSCI, Sustainalytics o CDP no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+2,6 %, fijo) es el consenso de ventas (662,6 M) y encaja con el 1S (+4,2 %) y con un 2S más flojo en el Reino Unido pyme [D2, A3]. Después, +3,0 % en 2027e (consenso +2,8 %), con el último año del freno del apagado del cobre, y +4,0-4,5 % en 2028e-2029e cuando ese freno desaparece y Alemania pesa más; bajada hasta el 2,5 % en 2033e. Muy por debajo del 9,6 % anual de 2021-2025, que fue comprado: el orgánico de 2025 fue del 1 % [A2]. El mercado de usuarios de nube crece al 7 % en el Reino Unido y al 16 % en Alemania según Cavell [B1], pero el Reino Unido pyme pierde puestos y precio [B2].',
    margenes: 'Margen EBITDA del DCF = EBITDA ajustado menos 0,4 puntos por extraordinarios que se repiten: 20,9 % en 2026e (ajustado del 21,3 %, centro de la guía de 138-145 M [A2]) y subida hasta el 22,0 % en 2030e. La subida (1,1 puntos) es la mezcla: Alemania tiene un 71 % de margen bruto frente al 54 % del grupo y crece más [A2], el ahorro de 7 M de la reestructuración de 2025 y el fin del freno del cobre (≈ 4 M de margen bruto al año). El margen ajustado ya fue del 21,7-21,9 % en 2024-2025: no se proyecta nada que no se haya visto.',
    inversion: 'Inversión (capex y arrendamientos) del 5,0 % de las ventas en 2026e (guía de capex de 27-28 M más ≈ 5 M de arrendamientos [A8]) que baja al 4,5 %, frente al 4,6 % de 2025. Amortización de activos propios del 3,6-4,0 % (3,3 % en 2025, subiendo por el desarrollo capitalizado); la de intangibles de compras se deja fuera porque no es caja ni desgrava. Circulante del 5,8 % de las ventas incluidos los activos y pasivos de contrato, como en 2025. Sin compras nuevas.',
    wacc: 'Tasa libre del 5,30 % (gilt a 10 años del Bank of England, 16-oct-2026 [D5]); beta de 0,90, entre la ajustada semanal a cinco años (0,83) y la mensual (0,99) frente al FTSE 250 [D1]; prima de mercado del 5,5 % y 0,5 puntos de prima adicional por tamaño (≈ 1.000 M GBP) y por la dependencia de las pymes británicas. Coste de la deuda del 6,0 % (SONIA + 1,5-2,25 % [A1]) y peso de la deuda del 4 % (préstamos, arrendamientos y pasivos de compras). WACC del 10,5 %. Con la prima implícita del mercado (4,2 % [D6]) sería del 9,4 %.',
    terminal: 'Crecimiento a perpetuidad del 2,0 %, el objetivo de inflación del Reino Unido, coherente con un gilt del 5,3 %: el negocio británico es maduro y Alemania se habrá normalizado en 2033. El múltiplo de salida implícito queda cerca de 7-8 veces el EBITDA, el de la oferta de Epiris (7,5 veces) [D3]. El valor terminal pesa un 57 %.',
  },
  puente_comentarios: {
    '2026e': 'Volumen del 1,5 % (puestos de nube en Alemania +11 % y Webex for Gamma, menos troncales SIP y puestos del Reino Unido pyme), precio neutro (≈ −2 puntos en el Reino Unido pyme compensados con subidas en otros negocios [A8]) y 1,1 puntos de perímetro y divisa (Starface en enero-febrero, que en 2025 no estaba, y el euro) [A3].',
    '2027e': 'Volumen del 2,5 % con Alemania y Service Provider; precio del 0,5 %; último año del freno del cobre [B2].',
    '2028e': 'Volumen del 3 % y precio del 1 %: sin el freno del cobre y con Alemania ≈ 20 % de las ventas [A1].',
    '2029e': 'Volumen del 3,5 % y precio del 1 %.',
    '2030e': 'Volumen del 3 % y precio del 1 %: converge hacia un crecimiento maduro.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (3,4 % medio) está muy por debajo del histórico (9,6 % con compras) y del mercado de usuarios de nube (7 % en el Reino Unido y 16 % en Alemania según Cavell [B1]), y apenas pide capital: la reinversión acumulada es el 7 % del beneficio operativo y el ROIC actual (23,6 %) financiaría un 8,6 % anual. La cuota final (12,4 % en 2033e frente al 14 % de hoy) incluso baja: el caso base ya supone que el Reino Unido pyme pierde terreno frente a Teams, Zoom y RingCentral. El motor da también «Sí». El riesgo no es de capital sino de precio y de puestos en el Reino Unido; lo recoge el bajista.',
  dcf_lectura: 'El DCF da 11,68 GBP por acción (1.168 p), un 7,4 % sobre el precio y un 4,3 % sobre la oferta de 1.120 p, con un WACC del 10,5 % y un valor terminal del 57 %. El DCF inverso dice que el precio descuenta un crecimiento del 2,1 % anual con nuestros márgenes, frente al 3,5 % del caso base y al 9,6 % histórico: el precio de hoy no es exigente, y sin la oferta (732 p) descontaba un negocio en declive. Con la prima de riesgo que pide hoy el mercado (4,2 %) el DCF sube a ≈ 13,5 GBP. Lectura: la oferta de Epiris paga aproximadamente el valor de Gamma en solitario con nuestra tasa (algo menos), no un precio de control generoso; el bajista (crecimiento 2 puntos menor y margen 1,5 puntos menor: el Reino Unido pyme sigue cayendo y Alemania se frena) vale 8,73 GBP.',
  narrativas: {
    Bajista: 'Microsoft vende directamente la voz de Teams, los distribuidores británicos se consolidan y renegocian, el Reino Unido pyme pierde un 3-5 % de margen bruto al año durante varios años y Alemania se frena por NFON y los operadores: crecimiento 2 puntos menor y margen 1,5 puntos menor. Es lo que ya pasó en 2025 (orgánico +1 %) prolongado.',
    Base: 'El Reino Unido pyme se estabiliza tras el apagado del cobre (2027), Alemania crece al 10-15 % y Enterprise y Service Provider crecen poco: ventas +3-4,5 % y margen EBITDA ajustado del 22,4 % en 2030e.',
    Alcista: 'Alemania mantiene el 15 % de crecimiento, Webex for Gamma y la voz para Teams y Zoom ganan escala y la IA (agentes de voz por su red) suma tráfico: un punto más de crecimiento y medio punto más de margen.',
  },
  escenarios_comentario: 'La asimetría del negocio en solitario es desfavorable: el alcista vale 12,68 GBP (+16,5 %) y el bajista 8,73 (−19,8 %). Pero lo que decide hoy no es esto sino la oferta: con 1.120 p sobre la mesa, el inversor que compra a 1.088 p gana un 2,9 % si se cierra y pierde un 20-33 % si fracasa (hacia el bajista o hacia el precio de antes de la oferta, 732 p). Con una probabilidad de cierre del 90 %, el valor esperado es de ≈ 10,9-11,0 GBP: no compensa.',
  casos_12m: {
    Bajista: 'Crecimiento del 1,0 % en 2027e y del 2,0 % en 2028e y margen 1,5 puntos menor: BPA ajustado de 0,915 GBP en 2028e; el PER vuelve a su mínimo de cinco años (9,8 veces, el de finales de 2025). Sin oferta, sería además el escenario si la operación fracasa.',
    Base: 'Ventas +2,6 %, +3,0 % y +4,0 % en 2026e-2028e, margen EBITDA ajustado del 21,9 %, 2 M de intereses, impuesto del 25,5 % y 90,6 M de acciones sin recompras: BPA ajustado de 1,040 GBP en 2028e (+3,3 % anual desde los 0,945 de 2025).',
    Alcista: 'Un punto más de crecimiento y medio punto más de margen por Alemania, Webex y la voz de la IA: BPA ajustado de 1,090 GBP; la regla da 16,6 veces (techo del base × 1,35), cerca de la mediana de los comparables (15,2).',
  },
  diferencia_consenso: 'Nuestro BPA ajustado de 2026e (0,944 GBP) está un 1,6 % por encima del consenso (0,929) y dentro del rango de la empresa (0,900-0,966) [D2, A2]; el de 2027e (0,977) queda un 2,6 % por debajo (1,003) porque no incluye recompras (suspendidas por la oferta). La gran diferencia no está en el BPA sino en el precio: la regla común lleva el PER de 11,2 a 12,3 veces, pero el precio no puede pasar de 1.120 p mientras la oferta esté viva. Los objetivos de los analistas (1.393 p de media) son anteriores a la oferta.',
  objetivo_comentario: 'El objetivo a 12 meses de la regla (13,16 GBP ponderado; base 12,79) daría un 23,0 % de rentabilidad ponderada y un 19,6 % en el base (con un dividendo que no se pagará), y el valor intrínseco (12,03 GBP) está un 10,6 % sobre el precio: mecánicamente, Comprar. Pero es un objetivo inalcanzable: la oferta de 1.120 p es final, la empresa dejará de cotizar en el 1T 2027 si se aprueba el 2-nov, y el accionista recibirá 11,20 GBP, un 2,9 % más que hoy [D4]. Si la oferta fracasa, el precio de partida no sería el actual sino uno cercano al de antes de la oferta (7,32 GBP, 7,8 veces el BPA de 2026e). Por eso la recomendación es Mantener y no Comprar.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 30 %, transacciones 15 % y comparables 10 %. El DCF es el método más fiable para un negocio de ingresos recurrentes y poca inversión. Las transacciones pesan más de lo normal porque la referencia principal es la propia oferta de Epiris (7,5 veces el EBITDA ajustado), salida de una subasta de seis meses con al menos cinco interesados [D3, D8]. Los comparables pesan poco: los estadounidenses (RingCentral, Zoom, Five9) cotizan a 15-20 veces el EBITDA con crecimientos y políticas de remuneración en acciones distintos, y dan valores muy altos que no se pagarían por Gamma. El valor objetivo de la síntesis es de 12,03 GBP (+10,6 %), un 7 % sobre la oferta: Epiris compra a un precio razonable, sin regalo para el accionista.',
  suma_partes: 'No aplica como método: los negocios comparten red, plataforma y canal. Como referencia, el consejo recibió propuestas por partes del grupo durante la subasta [D3], y Alemania (110,2 M de ventas y 22,5 M de EBITDA ajustado en 2025) valdría a los 13 veces que se pagó por Starface ≈ 290 M GBP, más de un cuarto del valor empresa de la oferta con el 16 % del EBITDA [A1, D15].',
  catalizadores: {
    items: [
      { fecha: '2026-11-02', evento: 'Junta del tribunal y junta general sobre el esquema de Epiris', efecto: 'Aprobación: la acción va hacia 1.120 p hasta el cierre; rechazo: caída hacia 730-900 p', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-01-31', evento: 'Apagado de la red de cobre británica (PSTN)', efecto: 'Fin del freno de margen bruto (≈ 4 M al año) a lo largo de 2027', probabilidad: 'Alta', sentido: '+' },
      { fecha: '1T 2027', evento: 'Sanción del tribunal y cierre de la oferta; exclusión de cotización', efecto: 'Pago de 1.120 p en efectivo', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Oferta rival', efecto: 'Precio por encima de 1.120 p; improbable: Providence, Oakley y Waterland ya se retiraron', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'La oferta fracasa (votación del 2-nov, tribunal o condición incumplida)', tipo: 'Corporativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−20 a −33 % (hacia 730-870 p)', mitigante: 'Oferta recomendada y final, ≈ 50 % del capital en fondos de arbitraje que votarán a favor, autorización alemana ya obtenida [D4]', senal: 'Participación baja en la junta del 2-nov o un accionista grande que anuncie su voto en contra' },
      { riesgo: 'Microsoft Teams, Zoom y RingCentral venden la voz directamente al cliente final', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −25 %', mitigante: 'Gamma vende hoy la voz dentro de Teams (555.000 puestos, +19 %), Webex (≈ 90.000) y Zoom: es socio de las tres plataformas, no solo rival [A2, B5]', senal: 'Bajada de los puestos de Teams con voz de Gamma o de los márgenes de Operator Connect' },
      { riesgo: 'Reino Unido pyme: pérdida de puestos y precio tras el apagado del cobre', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'El freno del cobre termina a finales de 2027; FibreXchange y PhoneLine+ captan migraciones [A1]', senal: 'Margen bruto del Reino Unido pyme cayendo más de un 5 % en 2027' },
      { riesgo: 'Alemania no crece lo esperado (NFON, operadores, adopción lenta de la nube)', tipo: 'Estrategia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % y deterioro de Starface', mitigante: 'Cuota del ≈ 15 %, margen bruto del 71 % y crecimiento orgánico del 11 % en el 1S 2026 [A3]', senal: 'Crecimiento orgánico alemán por debajo del 8 %' },
      { riesgo: 'Riesgo de IA: agentes de voz y contact center que reducen puestos humanos', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a +5 % a 3-5 años', mitigante: 'La IA necesita números, llamadas y red: Gamma vende esa capa (Service Provider, Coolwave) y lanza sus propios productos (Placetel AI, AI concierge) [A3]', senal: 'Bajada de puestos de contact center (48.000) o de las altas de puestos de pymes' },
      { riesgo: 'Deterioros de compras (Países Bajos, Alemania)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −4 %', mitigante: 'Holgura amplia en Alemania; los Países Bajos son pequeños', senal: 'Holgura de la prueba de deterioro de 2026' },
    ],
    premortem: 'Octubre de 2027: quien compró a 1.088 p perdió un 30 %. La junta del 2-nov-2026 no llegó al 75 % del valor votado: algunos accionistas históricos votaron en contra por considerar 1.120 p un precio de mínimos y los arbitrajistas, que no estaban todos registrados a tiempo, no compensaron. La oferta caducó, los fondos de arbitraje vendieron en masa y la acción volvió a 750-800 p. En 2027 el Reino Unido pyme siguió perdiendo puestos frente a Teams Phone vendido directamente por Microsoft, el margen bruto británico cayó otro 6 % y Alemania creció al 7 %. La señal temprana fue la baja participación de octubre y que el consejo tuviera que aplazar las juntas.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−5 % a +5 % a 3-5 años',
      comentario: 'Amenaza y oportunidad a la vez, con un pequeño saldo en contra a medio plazo. Amenaza: Gamma cobra por puesto, y los agentes de voz con IA reducirán los puestos humanos de contact center (CCaaS, 48.000 puestos, todavía pequeño) y, más despacio, los de atención en pymes; además las plataformas grandes (Microsoft, Zoom, Google) meten la IA en su suite y pueden saltarse al operador [A2]. La dirección dice que «no va a entrar en la carrera armamentística de la IA» y limita la inversión a 27-28 M al año [A8]. Oportunidad: un agente de voz sigue necesitando números, interconexión y llamadas, que es la capa que Gamma vende (Service Provider, Coolwave para hiperescaladores en Asia-Pacífico), y Gamma ya vende Placetel AI y un «AI concierge» a pymes [A3]. Epiris dice que una mayor adopción de la IA es parte de su plan [D3]. Señal: puestos de CCaaS y altas de puestos en pymes.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Oferta', pregunta: '¿Qué porcentaje del capital ha votado ya a favor antes del 2-nov y qué accionistas grandes no han votado?', por_que: 'Decide si se cobra 1.120 p o si el precio vuelve a 730-900 p.' },
      { tema: 'Reino Unido pyme', pregunta: '¿Cuántos puestos y cuánto margen bruto se pierden en 2026-2027 por el apagado del cobre y cuándo se estabiliza el negocio?', por_que: 'Es el 42 % del margen bruto y baja un 7 %.' },
      { tema: 'Microsoft Teams', pregunta: '¿Qué margen deja un puesto de Teams con voz de Gamma frente a uno de Horizon, y qué pasa si Microsoft vende sus planes de llamadas en el Reino Unido y Alemania?', por_que: 'Teams es el canal que más crece (+19 %) y a la vez la mayor amenaza.' },
      { tema: 'Alemania', pregunta: '¿Qué crecimiento orgánico tienen Placetel y Starface por separado y cuánta base instalada local de Starface pasará a la nube?', por_que: 'Es la apuesta de crecimiento y el 52 % del capital invertido son compras.' },
      { tema: 'IA', pregunta: '¿Cuántos minutos de agentes de IA pasan ya por la red de Gamma y qué precio tienen frente a un puesto humano?', por_que: 'Separa la IA como oportunidad de tráfico de la IA como amenaza a los puestos.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Alta',
    justificacion_recomendacion: 'La regla a 12 meses da Comprar de forma mecánica (ponderada del 23,0 %, base del 19,6 %, valor intrínseco de 12,03 GBP sobre el precio) porque aplica un PER de 12,3 veces al BPA de 2028e, pero ese objetivo no puede cumplirse: Gamma está bajo una oferta en efectivo de 1.120 p, recomendada y declarada final, con juntas el 2-nov-2026 y cierre esperado en el 1T 2027 [D3, D4]. Comprar hoy a 1.088 p da como mucho un 2,9 % en 3-5 meses (≈ 8-9 % anualizado) y expone a una caída del 20-33 % si la oferta fracasa. Es un arbitraje de fusiones, no una inversión value. Para quien ya tiene acciones: Mantener y cobrar 1.120 p (o vender en bolsa si necesita la liquidez antes). La regla 13 descarta la compra por el mismo motivo.',
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción alta en que no es una compra. Gamma está vendida: Epiris (Bradbury Bidco) ofrece 1.120 p en efectivo por acción, oferta recomendada por el consejo y declarada final el 19-oct-2026; las juntas son el 2-nov y el cierre se espera en el 1T 2027 [D3, D4]. Al cierre del 21-oct (1.088 p, 15:38 UTC) el diferencial es del 2,9 %. La regla a 12 meses da Comprar de forma mecánica (objetivo de 13,16 GBP, ponderada del 23,0 %, base del 19,6 %; valor intrínseco de 12,03 GBP, +10,6 %), pero no puede cumplirse con el precio topado por la oferta; si la oferta fracasa, el precio volvería hacia el de antes del proceso (732 p). Nos apartamos de la regla y la regla 13 descarta la compra. Los criterios del motor sugieren una convicción baja porque las reglas absoluta y relativa discrepan; nuestra convicción es alta porque la decisión no depende de la tasa de descuento sino de un precio fijo en efectivo: la bajaría una oferta rival creíble, y la cambiaría por completo que la oferta fracasara el 2-nov.

**El negocio.** Mayorista de comunicaciones de empresa: telefonía en la nube, voz para Teams, Webex y Zoom, contact center y fibra, vendidos sobre todo por distribuidores a pymes del Reino Unido (72 % de las ventas) y en Alemania (19 %) [A1]. El 89-90 % de los ingresos es recurrente [A2]. ROIC del 23,6 %, ≈ 13 puntos sobre el WACC (10,5 %): calidad «Sí». Sostenibilidad del crecimiento: «Sí» (proyectamos un 3,4 % anual, con cuota a la baja y casi sin capital).

**Finanzas.** Ventas de 645,8 M GBP en 2025 (+11,5 %, pero +1 % orgánico) y EBITDA ajustado de 141,7 M (21,9 %) [A2]. En el 1S 2026, +4,2 % y +2,3 %, con el Reino Unido pyme perdiendo un 7 % de margen bruto y Alemania ganando un 30 % [A3]. Deuda neta de 3,8 M a junio de 2026 tras pagar Starface (≈ 165 M) con caja; conversión de caja del 93-97 % [A3].

**Equipo y gobierno.** Consejero delegado (Andrew Belshaw, en Gamma desde 2007) que cumple la guía, pero con un crecimiento orgánico parado en el Reino Unido. El presidente fue reelegido con solo un 79 % en mayo de 2026 y el consejo ha vendido la empresa a un precio inferior al de cualquier cierre de año entre 2019 y 2024 [C2, D3].

**Valoración.** DCF de 11,68 GBP (+7,4 %), y el DCF inverso descuenta un 2,1 % de crecimiento frente al 3,5 % del base: el negocio vale algo más que la oferta, pero no mucho. La oferta paga 7,5 veces el EBITDA ajustado y ≈ 11,7 veces el BPA de 2026e, tras una subasta de seis meses en la que nadie pagó más [D3].

**Riesgos y catalizadores.** El riesgo inmediato es binario: la junta del 2-nov. A largo plazo, Microsoft Teams, Zoom y RingCentral vendiendo la voz directamente; el fin del apagado del cobre, que ha sostenido la demanda y termina en enero de 2027; Alemania como única palanca de crecimiento; y la IA, que es a la vez tráfico nuevo para la red y una amenaza para el cobro por puesto (saldo ligeramente negativo).

**Qué cambiaría la decisión.** Si la oferta fracasa y la acción cae por debajo de ≈ 11,62 GBP sin oferta, la regla y la tesis (negocio de calidad a ≈ 8-10 veces el beneficio) se reabrirían: habría que rehacer el análisis con el precio nuevo. Una oferta rival por encima de 1.120 p cambiaría el cálculo del arbitraje, no la tesis.`,
    tesis: 'Gamma es un negocio de calidad (ROIC del 23,6 %, 90 % de ingresos recurrentes, caja neta casi nula) con un problema de crecimiento: el Reino Unido pyme, que da casi la mitad del margen bruto, ha dejado de crecer y el apagado del cobre, que empujó las migraciones, se acaba en enero de 2027. Alemania (Placetel y Starface) crece, pero se compró caro.\n\nEl mercado lo castigó hasta 7,8 veces el beneficio en abril de 2026, y el consejo aprovechó el interés del capital privado para vender a 1.120 p, 11,7 veces el BPA de 2026e. Ese precio está cerca de nuestro valor en solitario (11,68-12,03 GBP).\n\nLa tesis de inversión ya no existe: con la oferta final sobre la mesa, el accionista cobra 11,20 GBP en el 1T 2027 o, si fracasa, vuelve a un precio sin prima. Comprar hoy es arbitraje (≈ 3 %), no value.',
    vision_diferencial: {
      mercado_descuenta: 'Que la oferta de 1.120 p se cierra (diferencial del 2,9 %, ≈ 8-9 % anualizado hasta el 1T 2027); los fondos de arbitraje tienen ≈ la mitad del capital.',
      nuestra_vision: 'Coincidimos: la probabilidad de cierre es alta. Discrepamos de los antiguos objetivos de los analistas (1.393 p): el crecimiento orgánico británico parado y la competencia de las plataformas no justifican los 15-25 veces de 2019-2024; la oferta paga lo que vale, no menos.',
      por_que: 'Nuestro DCF (11,68 GBP) y el ponderado (12,03) quedan un 4-7 % sobre la oferta; el bajista (8,73) está por encima del precio sin oferta (7,32): la oferta no es un regalo pero tampoco un robo.',
    },
    a_favor: [
      '**Oferta en efectivo**: 1.120 p, recomendada y final; cierre esperado en el 1T 2027.',
      '**Calidad**: ROIC del 23,6 % y 89-90 % de ingresos recurrentes.',
      '**Balance limpio**: deuda neta de 3,8 M y conversión de caja del 93-97 %.',
      '**Alemania**: margen bruto +30 % en el 1S 2026 y ≈ 15 % de cuota en puestos de nube.',
      '**Socio de las plataformas**: voz de 555.000 puestos de Teams y ≈ 90.000 de Webex.',
    ],
    en_contra: [
      '**Precio topado**: como mucho un 2,9 % hasta 1.120 p.',
      '**Riesgo binario**: si la oferta fracasa, vuelta hacia 730-900 p.',
      '**Reino Unido pyme a la baja**: margen bruto −7 % en el 1S 2026.',
      '**Fin del apagado del cobre**: el motor de migraciones se acaba en enero de 2027.',
      '**Plataformas e IA**: Teams, Zoom y RingCentral pueden saltarse al operador; la IA amenaza el cobro por puesto.',
    ],
    que_vigilar: 'La tesis (cobrar 1.120 p) depende solo de la junta del 2-nov-2026 y de la sanción del tribunal. La señal en contra sería una participación baja o el voto en contra anunciado de un accionista grande; si la oferta fracasa, habría que rehacer el análisis con el precio nuevo y con el Reino Unido pyme y Alemania como claves.',
    cambiaria_recomendacion: [
      'Oferta aprobada el 2-nov: Mantener hasta el cobro de 1.120 p en el 1T 2027.',
      'Oferta fracasada y precio sin prima por debajo de ≈ 11,62 GBP: rehacer el análisis; la regla podría dar Comprar sobre un negocio de calidad a ≈ 8-10 veces el beneficio.',
      'Oferta rival por encima de 1.120 p: Mantener y cobrar la mejor oferta.',
      'Crecimiento orgánico del Reino Unido pyme negativo dos años seguidos tras 2027: rebajar el valor intrínseco.',
    ],
    kpis_seguimiento: [
      { kpi: 'Votación de la junta del tribunal', nivel_actual: 'Aplazada al 2-nov-2026', umbral_alerta: '< 75 % del valor votado a favor', por_que: 'Decide el cobro de 1.120 p.' },
      { kpi: 'Diferencial con la oferta', nivel_actual: '2,9 % (1.088 p)', umbral_alerta: '> 10 %', por_que: 'El mercado duda del cierre.' },
      { kpi: 'Margen bruto del Reino Unido pyme', nivel_actual: '−7 % (1S 2026)', umbral_alerta: '< −5 % en 2027', por_que: 'Mide la competencia y el fin del cobre.' },
      { kpi: 'Crecimiento orgánico de Alemania', nivel_actual: '+11 % (1S 2026)', umbral_alerta: '< 8 %', por_que: 'La apuesta de crecimiento.' },
      { kpi: 'Puestos de Teams con voz de Gamma', nivel_actual: '555.000 (+19 %)', umbral_alerta: 'Caída', por_que: 'Canal y amenaza a la vez.' },
    ],
  },
};
