// Textos del analista (Wallenius Wilhelmsen, corte 2026-10-21). Se escriben después de calcular; las cifras del motor (calc)
// van tal cual. Citas con la letra de la nota ([A1] = fuente 1 de A.json; [P1] = fuente propia).
export default {
  limitaciones: 'Cifras en millones de USD, la divisa en la que publica Wallenius Wilhelmsen; la acción cotiza en NOK en Oslo y el precio (174,80 NOK, cierre del 21-oct-2026) se pasa a USD con el tipo de Norges Bank de ese día (9,3573 NOK por USD: 0,106868 USD por NOK) [D6]. Los cierres de cada año, con el tipo de Norges Bank del último día hábil. 2020-2024 salen del ESEF de filings.xbrl.org [A7], contrastado con los informes anuales; 2025 y el primer semestre de 2026, del informe anual 2025 y de los trimestrales (el ESEF de 2025 aún no estaba en filings.xbrl.org) [A1, A2]. La cuenta es por naturaleza (sin coste de ventas ni gastos generales). La opción de venta de Hyundai Motor Group sobre el 20 % de EUKOR se trata como minoritarios (balance y puente). El consenso es de MarketScreener (5 analistas) y de Yahoo; los objetivos de las casas noruegas, de la prensa financiera. El sentimiento de particulares es escaso. El informe de remuneración de 2025 no se encontró: se usa el de 2024.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable', explicacion: 'Tipo efectivo del 3,7-6,5 % porque casi todo el transporte marítimo tributa por el régimen de tonelaje noruego (y regímenes parecidos en otros países): paga por tonelaje de la flota, no por beneficio [A1]. No es un crédito fiscal ni una regularización: es estructural mientras la flota siga bajo ese régimen, y por eso el DCF usa un 5 %. El riesgo de que cambie (pilar 2 de la OCDE excluye el transporte marítimo internacional) es bajo.' },
    { control: 'ROIC del motor', explicacion: 'El ROIC del motor (18,9 % en 2025) es de pico de ciclo: fue del −0,8 % en 2020 y del 4,1 % en 2021. La media de 2020-2025 es del 12,8 %, unos 3 puntos sobre el WACC (9,85 %); con la opción de EUKOR fuera del capital invertido (va como minoritarios), el ROIC está algo inflado.' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    historia: {
      resumen: 'Wallenius Wilhelmsen nace en abril de 2017 de la fusión de las sociedades que tenían a medias desde 1999 la sueca Wallenius Lines (familia Wallenius-Soya, armadores desde 1934) y la noruega Wilh. Wilhelmsen (fundada en 1861): Wallenius Wilhelmsen Logistics, EUKOR y ARC [A10]. EUKOR, el transportista de Hyundai y Kia, nació en 2002 de la compra de la flota de coches de Hyundai Merchant Marine, con Hyundai Motor Group como socio del 20 % [A10, A9]. La empresa pasó de pérdidas en 2019-2020 (covid, deuda de 7,5 veces el EBITDA) al mejor ciclo del ro-ro en 2022-2025, con el que bajó deuda y repartió 2.089 M USD de dividendos en tres años [A1]. En 2023-2024 encargó 14 barcos Shaper (los primeros nuevos en años) y en octubre de 2026 amplió capital para encargar cuatro más grandes [A2, A8]. Lección: el beneficio de esta empresa lo decide el ciclo de oferta de barcos; en 2018-2020 la acción perdió un 60 % con márgenes del 16-21 %.',
      hitos: [
        { anio: '1861', hito: 'Morten Wilhelm Wilhelmsen funda la naviera Wilh. Wilhelmsen en Tønsberg (Noruega).' },
        { anio: '1934', hito: 'Olof Wallenius funda Wallenius Lines en Suecia.' },
        { anio: '1999', hito: 'Wallenius y Wilhelmsen juntan sus negocios de transporte de coches en Wallenius Wilhelmsen Lines (50/50).' },
        { anio: '2002', hito: 'Compran la flota de coches de Hyundai Merchant Marine y crean EUKOR, con Hyundai Motor Group como socio [A10].' },
        { anio: '2017', hito: 'Fusión en Wallenius Wilhelmsen ASA, que cotiza en Oslo; cada familia queda con ≈ 38 % [A10].' },
        { anio: '2020', hito: 'Covid: pérdida de 286 M USD, barcos amarrados y deuda neta de 7,5 veces el EBITDA [A1].' },
        { anio: '2022-2025', hito: 'Pico del ciclo ro-ro: margen EBITDA del 30-35 %, deuda neta a 1,2 veces y dividendos de 2.089 M en 2023-2025 [A1].' },
        { anio: '2023-2024', hito: 'Encargo de 14 Shaper de 9.350 CEU (metanol), con entregas de 2026 a 2028 [A2].' },
        { anio: '2025', hito: 'Venta de MIRRAT a Qube (135 M de plusvalía) y tasas portuarias USTR a barcos de construcción china [A1, A11].' },
        { anio: '2026', hito: 'Acuerdo con HMG sobre la opción de EUKOR (abril), guía rebajada (mayo) y colocación de 300 M para 4 barcos LNG grandes (octubre) [A9, A3, A8].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC del motor sube del −0,8 % en 2020 y el 4,1 % en 2021 al 15,0-20,8 % en 2022-2025, con el margen EBITDA del 35 %; la media de seis años es del 12,8 %, unos 3 puntos sobre el WACC del 9,85 % [A1]. El ROCE ajustado de la empresa baja del 19,9 % al 15,6 % en doce meses a junio de 2026 (objetivo > 12 % a lo largo del ciclo) [A2]. Lectura: la empresa gana claramente más que su coste de capital en el pico y lo justo a lo largo del ciclo; no es un negocio de calidad compuesta, sino un activo cíclico con buen balance. El ROE de 2023-2025 (29-31 %) está inflado porque la opción de EUKOR (897 M a finales de 2025) restaba patrimonio.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material es la descarbonización de la flota (EU ETS desde 2024, FuelEU Maritime desde 2025, marco de la OMI): los Shaper (metanol) y los nuevos LNG reducen emisiones, pero exigen inversión; y la seguridad de las tripulaciones (incendios de coches eléctricos, Ormuz) [A1, D12].',
      controversias: 'Un barco declarado pérdida total tras un incendio en 2025 [A1]; tasas portuarias USTR a barcos de construcción china [A11]. Sin litigios relevantes.',
      confianza: 'Baja',
    },
  },
  dcf_justificacion: {
    crecimiento: '2026e (+1,1 %, fijo) sale de la guía de ≈ 1.600 M de EBITDA ajustado y del consenso de ventas (5.332 M) [A3, D2]. 2027e (+3 %) recoge las renovaciones de contratos del segundo semestre de 2026 a tarifas más altas [A2]. 2028e-2029e (−1 % y −3 %) bajan las tarifas con la flota mundial creciendo un 8 % en 2026 y un 6 % en 2027 y la mitad de los barcos nuevos en manos chinas [B2]; el consenso también baja en 2028e (−2,9 %) [D2]. Desde 2030e, 0-2,5 % nominal.',
    margenes: 'Margen EBITDA del 30 % en 2026e (guía) y 30,5 % en 2027e, que baja al 25 % de mitad de ciclo en 2030e: entre el 16-22 % de 2019-2021 y el 30-35 % de 2022-2025, y por debajo de la media de 2019-2025 (≈ 28 %) porque la oferta crece ≈ 30 % en 2025-2027 [A1, B2]. Más alto que el de antes de 2021 por la flota más eficiente y los contratos más largos de logística.',
    inversion: 'Inversión = inmovilizado propio más altas de derechos de uso (fletamentos nuevos: 505 M en 2025): 14,3 % de las ventas en 2025 [A1]. 19-21 % en 2026e-2027e por los 14 Shaper (1.400 M pendientes) y los pagos de los 4 LNG grandes; 18 % en 2028e y reposición de flota del 13,5 % desde 2032e, algo por encima de la amortización (13 %) [A2, A8]. Circulante del 10,5 % de las ventas (10,7 % en 2025) [A1].',
    wacc: 'Tasa libre del 5,12 % (bono del Tesoro de EE. UU. a 10 años del 20-oct-2026: la empresa vive en USD) [D4]; beta de 1,2 (mensual a 5 años frente al OSEBX; 1,54 semanal a 2 años) [D1]; prima de mercado del 4,2 % (implícita de Damodaran, octubre de 2026) [D5] más 1 punto por la ciclicidad que la beta frente a un índice de petróleo y navieras no recoge, el flotante del 27 % y el control de dos familias. Coste de la deuda del 6,0 % (bancaria garantizada con barcos y arrendamientos), impuesto del 5 % (tonelaje) y deuda del 24 % del capital (deuda y arrendamientos frente a capitalización). WACC del 9,85 %.',
    terminal: 'Gordon con crecimiento del 2 % (inflación en USD, sin crecimiento real: el transporte de coches terminados crece menos que la producción porque los fabricantes producen cerca del mercado) sobre un margen de mitad de ciclo del 25 % e inversión de reposición algo por encima de la amortización. Contraste con múltiplo: 5,5 veces el EBITDA, el nivel de compra de navieras en mitad de ciclo.',
  },
  puente_comentarios: {
    '2026e': 'Volumen plano (13,6-13,7 M de m³ por trimestre, flota llena) y tarifa media algo más alta con recargos de combustible; guía de ≈ 1.600 M [A2, A3].',
    '2027e': 'Volumen +1 % (entregas de Shaper) y precio +2 %: el 40 % del volumen de 2027 se renegocia en el segundo semestre de 2026 con el contado ≈ 80 % por encima del año anterior en Asia-Europa [A2, B5].',
    '2028e': 'Más volumen con los Shaper (+1,5 %) pero tarifas −2,5 % con la flota mundial un 15 % mayor que en 2025 [B2].',
    '2029e': 'Tarifas −4,5 % (contratos de 2025-2026 renovados a la baja); volumen +1,5 % [B2].',
    '2030e': 'Mitad de ciclo: volumen +1,5 %, precio −1,5 %.',
  },
  veredicto: 'No',
  sostenibilidad_justificacion: 'No: la calidad de la empresa no sostiene los márgenes ni el ROIC de hoy. El foso es estrecho (contratos de 1-5 años que se licitan a precio de mercado, sin poder de precio fuera del ciclo) y el ROIC a lo largo del ciclo ronda el WACC (−0,8 % y 4,1 % en 2020-2021, 15-21 % en 2022-2025; media del 12,8 % frente al 9,85 %) [A1]. Las pruebas del motor pasan (crecimiento proyectado del 0,9 % frente al 4,1 % financiable; cuota del 15 al 17 %) solo porque la proyección ya baja el margen del 34,6 % de 2025 al 25 % y el crecimiento a cero. Con 30 % más de flota mundial en 2025-2027, el pico no se repite.',
  dcf_lectura: 'El DCF da 9,79 USD por acción (91,6 NOK), un 47,6 % bajo el precio, con un WACC del 9,85 % y un valor terminal que pesa el 59 %. El DCF inverso dice que para justificar 18,68 USD hay que creer en un crecimiento de las ventas del 10,9 % anual en 2027e-2033e (el base: 0,9 %) o en un margen EBITDA del 31,4 % para siempre (el base: 25 % desde 2030e), es decir, que el pico de 2022-2025 es el nuevo normal; la rentabilidad implícita en el precio con nuestro caso base es del 6,9 %, por debajo del WACC. Es muy exigente: el margen del 31 % solo se dio en los cuatro años de mayor escasez de barcos de la historia, y la flota mundial crece ≈ 30 % entre 2025 y 2027 [B2]. El DCF es sensible al margen terminal: cada punto vale ≈ 1,2 USD por acción.',
  narrativas: {
    Bajista: 'La flota nueva llega (8 % en 2026, 6 % en 2027) cuando las exportaciones chinas se frenan por aranceles en la UE y EE. UU. y las navieras chinas llevan sus propios coches: el fletamento vuelve a 20-30.000 USD/día, los contratos se renuevan un 20-30 % más baratos y el margen cae al 20 % de 2019-2021, con las tasas USTR de vuelta en noviembre de 2026. La empresa sigue pagando 1.400 M por los Shaper y 4 LNG: deuda arriba y dividendo recortado.',
    Base: 'Las tarifas aguantan en 2027 por las renovaciones y la ineficiencia de rutas (Mar Rojo, Ormuz), y bajan en 2028-2029 a medida que entran los barcos nuevos: el margen EBITDA pasa del 30 % al 25 % de mitad de ciclo en 2030, las ventas quedan planas y la inversión en flota (19-21 % de las ventas en 2026-2027) absorbe buena parte de la caja.',
    Alcista: 'Las exportaciones chinas siguen creciendo a doble dígito, Ormuz y el Mar Rojo siguen cerrados y el desguace de barcos viejos compensa la flota nueva: margen del 29-34 % durante años, como 2022-2025, y crecimiento del 3-5 % con los Shaper.',
  },
  escenarios_comentario: 'La asimetría es muy desfavorable: el alcista (18,59 USD) apenas iguala el precio y el bajista (1,04 USD) deja la acción casi sin valor, porque con márgenes del 20 % y la inversión en flota comprometida el flujo libre no cubre la deuda y los arrendamientos [P1]. El valor ponderado es de 10,44 USD, un 44,1 % bajo el precio. El bajista no es un caso extremo: es el margen de 2019 y 2021.',
  casos_12m: {
    Bajista: 'Ventas −5 % en 2028e y margen EBITDA del 23 % (5 puntos menos que el base) por tarifas a la baja y tasas USTR: BPA de 0,69 USD, con el PER mínimo adelantado de cinco años (3,6 veces) que el mercado pagó en el pico de 2021-2024.',
    Base: 'Ventas +3 % en 2027e y −1 % en 2028e, margen EBITDA del 28 % en 2028e, amortización del 13,8 % (Shaper), resultado financiero de −125 M, impuesto del 5 % y 8 % de minoritarios (HMG en EUKOR): BPA de 1,28 USD (consenso 1,43), con el PER actual rebajado al tope de la regla (÷1,1).',
    Alcista: 'Ventas +2 % en 2028e y margen del 32 %: BPA de 1,77 USD, con el mismo PER que el base (la media larga y la mediana de comparables quedan por debajo).',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (1,60 USD) coincide con el consenso (1,63) y la guía [D2]. En 2027e quedamos un 6 % por debajo (1,64 frente a 1,75) y en 2028e un 10 % por debajo (1,28 frente a 1,43): el consenso ya espera que el beneficio baje en 2028, pero menos que nosotros, porque supone menos amortización (13,5 %) y no recoge del todo la flota nueva. La diferencia grande no está en el BPA, está en el múltiplo: los analistas que suben objetivos (Nordea 200 NOK, Pareto 204) pagan 11-12 veces un beneficio de ciclo [D9].',
  objetivo_comentario: 'El objetivo a 12 meses es de 11,08 USD (≈ 104 NOK, ponderado 30/50/20), un 35,8 % de pérdida con dividendo; el base (13,31 USD) da −23,9 %. Los dos están lejos del umbral de venta (−10 %) y la decisión no depende de la regla de múltiplos: con el PER actual sin rebaja (11,4 veces) y nuestro BPA de 2028e, el precio quedaría en 14,6 USD (−17 % con dividendo). El objetivo medio de los analistas (17,46 USD) está un 7 % bajo el precio [D2]. El bajista (3,6 veces × 0,69) es duro porque aplica el PER mínimo de un pico a un BPA de valle; aun con el PER del base, el bajista daría −57 %.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %; transacciones 0 (no hay compras de navieras ro-ro con múltiplo). El DCF es el método que mejor recoge el ciclo, porque normaliza el margen y cobra la inversión en flota; los comparables (PER NTM 9,5 veces de mediana y EV/EBITDA de 3,6-8,7 veces) valoran beneficios de pico y por eso dan más (16-19 USD). La conclusión no depende de los pesos: con el 100 % en comparables el valor quedaría cerca del precio, no por encima.',
  catalizadores: {
    items: [
      { fecha: '2026-11-04', evento: 'Resultados del 3T26', efecto: 'EBITDA ajustado guiado de 420-450 M; primeras tarifas de las renovaciones de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11-09', evento: 'Fin de la suspensión de las tasas portuarias USTR', efecto: '≈ 20-25 M de coste por trimestre antes de repercutirlo si vuelven el 10-nov', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027-02', evento: 'Resultados del 4T26, dividendo del segundo semestre y guía de 2027', efecto: 'Dice si 2027 supera a 2026 y cuánto reparte tras la colocación', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Aranceles de la UE y EE. UU. a coches chinos', efecto: 'Menos exportaciones chinas por mar: menos demanda', probabilidad: 'Media', sentido: '−' },
      { fecha: '2026-2028', evento: 'Entregas de los 14 Shaper', efecto: '+12 % de capacidad propia con barcos más eficientes', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-04', evento: 'Fin del bloqueo de seis meses de la colocación', efecto: 'Posibles ventas de los colocados', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Ciclo de oferta: la flota mundial crece ≈ 30 % en 2025-2027 y las tarifas vuelven a niveles de antes de 2021', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−8 USD por acción (bajista)', mitigante: 'Cartera de contratos de 6.500 M (2,9 años) y logística con 8 años', senal: 'Fletamento a un año por debajo de 50.000 USD/día o flete neto por debajo de 55 USD/m³' },
      { riesgo: 'Múltiplo: la acción cotiza a 11,4 veces nuestro BPA de 2027e frente a una mediana adelantada de 3,9 veces', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−30 % si el PER vuelve a 8 veces', mitigante: 'Dividendo del 5-7 %', senal: 'Revisiones a la baja del BPA de 2027-2028' },
      { riesgo: 'Tasas portuarias USTR y aranceles de EE. UU. a coches', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−0,5-1 USD por acción', mitigante: 'Repercusión parcial a clientes; cambio de barcos en rutas a EE. UU.', senal: 'No prórroga de la suspensión el 9-nov-2026' },
      { riesgo: 'Exportaciones de coches chinos: menos crecimiento (aranceles, fábricas fuera de China) o transportadas por navieras chinas', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−3 USD por acción', mitigante: 'Contratos con fabricantes chinos (130 M en enero de 2026)', senal: 'Exportaciones chinas por debajo de 0,8 M al mes' },
      { riesgo: 'Inversión en flota en el pico: 1.400 M de Shaper más 4-12 LNG encargados con la cartera de pedidos mundial al 20 %', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1-2 USD por acción', mitigante: 'Deuda neta de 1,2 veces el EBITDA', senal: 'Ejercicio de las 8 opciones con tarifas a la baja' },
      { riesgo: 'Combustible y Oriente Medio (Ormuz, Mar Rojo)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '±1 USD por acción', mitigante: 'Cláusulas BAF con retraso', senal: 'Margen EBITDA trimestral por debajo del 26 %' },
      { riesgo: 'Gobierno: dos familias con el 73 % y una de ellas reduce exposición', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Descuento de liquidez', mitigante: 'Consejo con presidente independiente', senal: 'Ventas de Wallenius Lines tras el bloqueo' },
    ],
    premortem: 'Octubre de 2027: la acción vale 9 USD (85 NOK). La flota nueva llegó a la vez que la UE subió aranceles a los coches chinos y EE. UU. volvió a cobrar las tasas USTR; los contratos de 2027 se renovaron por encima de 2026, pero los de 2028 ya se negocian un 20 % más baratos, y el mercado, que pagaba 11 veces un beneficio de pico, vuelve a pagar 5-6 veces un beneficio que baja. La empresa recorta el dividendo para pagar los Shaper y los LNG. No fue un mal año de gestión: fue el ciclo, que ya estaba en el precio de los barcos encargados.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±2 % a 3-5 años',
      comentario: 'La IA no sustituye lo que hace WAWI: mover coches y maquinaria en barcos y procesarlos en puertos con trabajo físico [A1]. Puede ayudar algo en la planificación de flota y rutas, el consumo de combustible y la logística (la empresa tiene un programa de transformación digital con 9 M de coste en el 2T26) [A2], y reducir costes de oficina. Efecto indirecto: si la IA cambia la demanda de coches (conducción autónoma, flotas compartidas) a largo plazo, cambia el volumen de coches transportados, pero eso está a más de 5 años y es incierto. Riesgo de IA poco directo.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Renovaciones de 2027', pregunta: '¿A qué tarifa media se han renovado los contratos del 40 % del volumen de 2027 frente a la tarifa media de la cartera (≈ 54 USD/m³)?', por_que: 'Decide si 2027 supera a 2026 (nuestro base: +3 % de ventas y 30,5 % de margen).' },
      { tema: 'Tasas USTR', pregunta: '¿Qué parte de la flota es de construcción china y cuánto costarían las tasas al año si vuelven el 10-nov-2026, después de repercutirlas?', por_que: 'Es un riesgo con fecha.' },
      { tema: 'Flota y opciones', pregunta: '¿Con qué tarifa de fletamento a largo plazo se justifican los 4 LNG y las 8 opciones, y qué barcos fletados se devuelven a cambio?', por_que: 'Es la inversión de los próximos cinco años en un mercado con cartera de pedidos del 20 %.' },
      { tema: 'EUKOR', pregunta: '¿Qué pasa con el contrato de HMG (vence el 31-dic-2029) y con la opción de venta si HMG baja su volumen comprometido del 50 %?', por_que: 'HMG es el mayor cliente y la opción vale 386-897 M según cómo se mida.' },
      { tema: 'Dividendos y colocación', pregunta: '¿Por qué pagar 258 M de dividendo en septiembre y pedir 300 M al mercado en octubre?', por_que: 'Asignación de capital y trato al flotante.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Vender',
    conviccion: 'Alta',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Vender, con convicción alta. El objetivo a 12 meses es de 11,08 USD (≈ 104 NOK), un 35,8 % de pérdida con dividendo; el caso base (13,31 USD) da −23,9 %, y el valor intrínseco (10,44 USD) queda un 44,1 % bajo el precio de 18,68 USD (174,80 NOK). El objetivo medio de los analistas, 17,46 USD, también está por debajo del precio [D2]. La asimetría es muy desfavorable: el alcista apenas iguala el precio y el bajista lo deja en 1,04 USD. La razón principal: el mercado paga 11,4 veces un beneficio de pico de ciclo que va a bajar. La convicción es alta porque las dos reglas dan Vender con mucho margen; bajaría si el 3T26 (4-nov) mostrara renovaciones de 2027 por encima de 70 USD/m³.

**El negocio.** Wallenius Wilhelmsen transporta coches y maquinaria en ≈ 129 barcos ro-ro y los procesa en tierra en EE. UU. [A1]. Su foso es estrecho: contratos de 1-5 años que se renuevan a precio de mercado. El ROIC fue del −0,8 % en 2020 y del 18,9 % en 2025: a lo largo del ciclo (12,8 % de media) apenas supera el WACC del 9,85 %. La calidad de la empresa no sostiene los márgenes de hoy: el veredicto de sostenibilidad es «No», y el caso base ya baja el margen EBITDA del 34,6 % de 2025 al 25 %.

**Sector y ciclo.** El ro-ro está en un pico que gira. Las exportaciones de coches chinos (+58 % en el 2T26) llenan los barcos desde Asia, pero la flota mundial crece ≈ 30 % entre 2025 y 2027 y la mitad de los barcos nuevos son de navieras y fabricantes chinos [B2, B3]. El fletamento a un año está en 73.000 USD/día, lejos de los 115.000 de 2023-2024 [B5]. Los aranceles de EE. UU. a los coches y las tasas portuarias USTR a barcos chinos restan volumen y margen.

**Finanzas.** El margen EBITDA ya baja del 35 % al 27,6 % en el 2T26 y la guía de 2026 se rebajó a ≈ 1.600 M [A2, A3]. El balance es sano (deuda neta con arrendamientos de 1,2 veces el EBITDA), pero la inversión sube: 1.400 M por los Shaper y 4 LNG grandes encargados con una ampliación de 300 M en octubre, pocas semanas después de pagar 258 M de dividendo [A2, A8].

**Equipo y gobierno.** Dos familias controlan el 73 %; Wallenius Lines no acudió a la ampliación y el flotante votó en contra de las directrices de remuneración (61 % del capital libre presente) [C7, C2]. Resta.

**Valoración.** El DCF da 9,79 USD con un valor terminal del 59 %; para justificar el precio hace falta un margen del 31,4 % para siempre o un crecimiento del 10,9 % anual. La historia adelantada (mediana de 3,9 veces en 2021-2025) dice que el mercado nunca pagó más de 5 veces un beneficio de pico; hoy paga 11,4. Los comparables (9,5 veces de mediana, Höegh incluida) también cotizan por debajo.

**Riesgos y catalizadores.** El riesgo para esta recomendación es que las tarifas aguanten (Ormuz y Mar Rojo cerrados, exportaciones chinas a doble dígito): el alcista vale 18,59 USD, el precio de hoy. Catalizadores: resultados del 3T26 el 4-nov y el fin de la suspensión de las tasas USTR el 9-nov [D14]. La regla 13 retrasa cualquier compra hasta esas dos fechas; no cambia la venta.

**Qué cambiaría la decisión.** Compraríamos por debajo de ≈ 10,4 USD (≈ 98 NOK). Revisaríamos al alza si el margen EBITDA de 2027 se guiara por encima del 32 % con la flota llena, o si el fletamento a un año volviera a superar 100.000 USD/día.`,
    tesis: 'Wallenius Wilhelmsen es uno de los dos mayores transportistas de coches y maquinaria por mar del mundo, con ≈ 129 barcos, el 80 % de EUKOR (Hyundai y Kia) y logística en tierra en EE. UU. [A1]. En 2022-2025 vivió el mejor ciclo de su historia: margen EBITDA del 35 %, ROIC del 19-21 %, deuda neta de 7,5 a 1,2 veces el EBITDA y 2.089 M USD de dividendos en tres años [A1].\n\nEl precio (18,68 USD; 11,4 veces nuestro BPA de 2027e) descuenta que ese pico es el nuevo normal: el DCF inverso pide un margen EBITDA del 31,4 % para siempre o un crecimiento del 10,9 % anual. En 2021-2024 el mercado pagaba 3,6-4,9 veces el beneficio del año siguiente, precisamente porque sabía que no duraría.\n\nCreemos que el mercado se equivoca en el múltiplo, no en el beneficio a corto: 2026-2027 serán buenos años (flota llena desde Asia, renovaciones al alza), pero la flota mundial crece ≈ 30 % en 2025-2027, las navieras chinas llevan sus propios coches y la empresa invierte en el pico. Para invertir hay que creer que las exportaciones chinas absorben toda esa flota durante años; nosotros no lo creemos.',
    vision_diferencial: {
      mercado_descuenta: 'Que la escasez de barcos de 2022-2025 se alarga gracias a las exportaciones chinas, al cierre del Mar Rojo y Ormuz y a la renovación de contratos a tarifas más altas en 2027; que los barcos nuevos de WAWI (26 con opciones) aumentan sus beneficios, y que el dividendo del 5-7 % sigue.',
      nuestra_vision: 'Coincidimos en 2026-2027 (BPA de 1,60 y 1,64 USD frente a 1,63 y 1,75 del consenso), pero no en lo que viene después: el margen vuelve hacia el 25 % de mitad de ciclo en 2030 y el BPA de 2028e (1,28) queda un 10 % bajo el consenso. Y el múltiplo de un beneficio cíclico que empieza a bajar debe ser bajo, no 11 veces.',
      por_que: 'Lo dice la historia de la propia empresa (márgenes del 16-22 % en 2019-2021) y del sector (cada pico del transporte marítimo acaba con exceso de barcos), y la oferta ya está pedida: cartera del 20,6 % de la flota mundial [B2].',
    },
    a_favor: [
      '**Flota llena desde Asia**: exportaciones chinas de coches +58 % en el 2T26 y más de 1 M al mes [B3].',
      '**Balance sano**: deuda neta con arrendamientos de 1,2 veces el EBITDA, frente a 7,5 en 2020 [A2].',
      '**Renovaciones al alza en 2027**: el 40 % del volumen se renegocia con el contado ≈ 80 % por encima del año anterior en Asia-Europa [B5].',
      '**Dividendo alto**: 1,62 USD por acción en doce meses (≈ 8,7 %) [A2].',
      '**Flota más eficiente**: 14 Shaper de metanol y 4 LNG grandes con ventaja en emisiones [A2, A8].',
    ],
    en_contra: [
      '**Múltiplo de pico**: 11,4 veces el BPA de 2027e frente a una mediana adelantada de 3,9 veces.',
      '**Oferta**: la flota mundial crece ≈ 30 % entre 2025 y 2027 [B2].',
      '**Márgenes que ya bajan**: margen EBITDA del 27,6 % en el 2T26 frente al 35,0 % un año antes [A2].',
      '**Tasas USTR y aranceles**: la suspensión de las tasas vence el 9-nov-2026 [D14].',
      '**Ampliación en el pico**: 300 M al 4 % del capital para más barcos; Wallenius Lines no acude [D7].',
    ],
    que_vigilar: 'La tesis depende de que las tarifas bajen a medida que entra la flota nueva. La señal de que no se cumple: renovaciones de contratos de 2027-2028 por encima de la tarifa media de la cartera (≈ 54 USD/m³), fletamento a un año por encima de 90.000 USD/día en 2027 o un margen EBITDA trimestral que vuelva al 33 % con la flota creciendo. Si eso pasa con la flota mundial un 15 % mayor, el ciclo es más largo de lo que creemos.',
    cambiaria_recomendacion: [
      'Precio por debajo de ≈ 10,4 USD (≈ 98 NOK): pasaríamos a Mantener o Comprar.',
      'Guía de EBITDA ajustado de 2027 por encima de 1.800 M (margen > 32 %): revisaríamos el caso base al alza.',
      'Fletamento a un año de un PCTC por encima de 100.000 USD/día durante dos trimestres.',
      'Prórroga indefinida de la suspensión de las tasas USTR y acuerdo arancelario con la UE sobre coches chinos.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen EBITDA ajustado trimestral', nivel_actual: '27,6 % (2T26)', umbral_alerta: '> 32 % o < 24 %', por_que: 'Base del caso: 28-30 %.' },
      { kpi: 'Flete neto (USD/m³)', nivel_actual: '61,4 (2T26)', umbral_alerta: '< 55 o > 70', por_que: 'Mide las renovaciones.' },
      { kpi: 'Fletamento a un año de un PCTC (USD/día)', nivel_actual: '73.300 (3T26)', umbral_alerta: '< 50.000 o > 100.000', por_que: 'Termómetro del ciclo.' },
      { kpi: 'Exportaciones chinas de vehículos (M al mes)', nivel_actual: '> 1,0', umbral_alerta: '< 0,8', por_que: 'Motor de la demanda.' },
      { kpi: 'Cartera de contratos de transporte (miles de M USD)', nivel_actual: '6,5', umbral_alerta: '< 5,5', por_que: 'Visibilidad de ingresos.' },
    ],
  },
};
