// Textos del analista (Airtel Africa, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD (la moneda de las cuentas), ejercicio a 31 de marzo etiquetado por el año en que termina (FY2026 = abr-25 a mar-26). Cuentas oficiales del ESEF (informe anual de FY2026, publicado el 7-may-2026) [A13, A1] y nota del 1T FY2027 (30-jun-2026) [A3]; los resultados del 1S FY2027 (a 30-sep) aún no han salido (previstos hacia el 28-oct-2026). La acción cotiza en peniques (GBp): precio del informe 280,6 peniques, cierre del 20-oct-2026, = 3,7451 USD con 1,33467 USD por libra (BCE) [D1, D7]; la sesión del 21-oct estaba abierta (281,2 peniques a las 14:28 UTC [D2]) y la decisión se comprueba con el precio del día en las pruebas de robustez. El BPA de la regla a 12 meses y su historia están en la base SIN DIVISAS que publica la empresa (sin ganancias ni pérdidas de cambio ni partidas excepcionales). NIIF 16: los arrendamientos de torres (4.369 M) van en la deuda y sus altas en el capex. Calificaciones de S&P, Moody\'s y Fitch sin comprobar. No hay ficha sectorial de telecomunicaciones en el repositorio y este encargo no permite escribir fuera de la carpeta del informe: los comparables salen de Yahoo [D2] y del informe de Orange [P1]. Una acción cuesta ≈ 3,3 EUR.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (FY2025)', explicacion: 'El 50,4 % de FY2025 se explica por las pérdidas de divisa no deducibles en Nigeria y por las retenciones sobre dividendos y comisiones que las filiales pagan a la matriz, que no se recuperan [A6]. No se proyecta: el DCF usa un 40 % en FY2027, 39 % en FY2028 y 38 % después, en línea con la tasa efectiva antes de divisas y partidas excepcionales que da la empresa (≈ 40 %) [A2, A11].' },
    { control: 'Tipo impositivo efectivo razonable (FY2026)', explicacion: 'El 42,7 % de FY2026 es estructural en parte: el impuesto de sociedades nominal es del 30 % en Nigeria, Kenia, Uganda, Tanzania y la RD del Congo, y se suman las retenciones en origen sobre dividendos y comisiones de gestión y algunos gastos no deducibles [A1, A11]. El DCF baja al 38 % a partir de FY2029 por la mezcla (más dinero móvil en países con menor carga) y por la reforma fiscal de Nigeria; la diferencia vale ≈ 0,15 USD por acción.' },
  ],
  huecos: [],
  secciones: {
    rentabilidad: {
      comentario: 'Con el fondo de comercio de la compra de Zain en 2010 (≈ 3.900 M), el ROIC de FY2026 es del 14,5 %, apenas 0,8 puntos sobre nuestro WACC del 13,7 %; sin él, del 22,6 % [A1, A13]. El negocio orgánico crea valor con holgura, pero el accionista paga por un activo comprado caro y por un riesgo país alto. El ROIC se mueve con la divisa más que con la gestión: cayó al 12,3 % en FY2025 por las devaluaciones de la naira y del franco CFA y subió en FY2026 con la recuperación de la naira y la subida de tarifas del 50 % en Nigeria (feb-2025) [A2, A6]. El ROIC incremental del 38 % mide sobre todo esa recuperación, no la calidad de la inversión nueva. Frente a los competidores, el margen EBITDA (49,3 %) es de los más altos de África, por encima de MTN y Vodacom, con un capex bajo por subcontratar las torres [D2, B2].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Prioridades: invertir en la red y en Airtel Money (capex de caja ≈ 1.100 M en FY2027 [A3]), reducir la deuda en dólares de la matriz (la deuda en moneda fuerte se ha bajado de forma continua y casi toda la deuda bruta está ya en las filiales y en monedas locales [A4]), dividendo progresivo (7,1 centavos en FY2026, +9,2 % [A2]) y recompras: un primer programa de hasta 100 M USD en FY2025-FY2026 y otro de hasta el 1 % del capital aprobado en mayo de 2026, con su primer tramo terminado (24,5 M de acciones a 331,29 peniques) [C10]. La salida a bolsa de Airtel Money no trajo caja a la matriz: se vendieron acciones de minoritarios [D9].',
      adquisiciones: [
        { anio: '2010', objetivo: 'Zain Africa (15 países): origen del grupo, comprada por Bharti', importe: 10700, ev_ebitda: null, financiacion: 'Deuda de Bharti', resultado: 'Deterioros y ventas de países (Burkina Faso, Sierra Leona, Chad, Madagascar y otros, 2016-2021); el fondo de comercio que queda pesa en el ROIC [A1].' },
        { anio: '2021', objetivo: 'Venta de torres en Madagascar, Malaui, Chad, Gabón, RD del Congo y Níger (y antes en Tanzania)', importe: null, ev_ebitda: null, financiacion: 'Cobro en caja', resultado: 'Reducción de deuda en dólares; a cambio, más arrendamientos [A9].' },
        { anio: '2021', objetivo: 'Entrada de minoritarios en Airtel Money (TPG, Mastercard, Qatar, ADIA)', importe: 500, ev_ebitda: null, financiacion: 'Venta de minoritarios', resultado: 'Valoró Airtel Money en 2.650 M USD; hoy cotiza a ≈ 6.600 M [A9, D8].' },
      ],
      comentario: 'Asignadora de capital prudente desde la salida a bolsa de 2019: entre FY2021 y FY2026 el flujo de caja libre acumulado (4.491 M) pagó 1.220 M de dividendos y 212 M de recompras sin compras ni ampliaciones, y redujo la deuda en dólares de la matriz, que era el riesgo que hundió la acción en 2023-2024 [A2, A4]. Vendió torres y minoritarios de Airtel Money a buen precio (2.650 M de valoración en 2021 frente a ≈ 6.600 M hoy). En contra: la recompra de 2026 se hizo a 331 peniques, un 18 % por encima del precio de hoy, y la salida a bolsa de Airtel Money la decidió el accionista de control con un tamaño recortado. La dilución es nula (3.624 M de acciones frente a 3.758 M en 2019) [C9].',
      confianza: 'Media',
    },
  },
  suma_partes_comentario: 'Aplica porque Airtel Money cotiza por separado desde el 9-oct-2026 y tiene un perfil distinto (crecimiento del 25-30 %, sin capex de red) [D8, D9]. La telefonía se valora con el EV/EBITDA de los operadores africanos y turco (5,5 veces) y Airtel Money a su capitalización de mercado (6.580 M USD al 100 %); el 22,15 % de terceros se resta en el puente. Sale ≈ 4,19 USD por acción, un 12 % sobre el precio: la acción cotiza con un descuento pequeño frente a la suma de sus partes cotizadas, normal en una matriz con control de un tercero y deuda en la telefonía.',
  dcf_justificacion: {
    crecimiento: 'Crecimiento en DÓLARES. FY2027e +22 %: el 1T creció un 31 % en dólares y un 21,1 % en moneda constante, con la naira y el chelín más fuertes que hace un año [A3]; el resto del año compara con trimestres ya revalorizados. Después, 14 % y 12 %: datos (+25-30 % de tráfico al año), dinero móvil (+25-30 % en moneda constante) y subida de tarifas por inflación, menos ≈ 2-4 puntos al año de devaluación media de las monedas frente al dólar, que es la norma histórica (de FY2021 a FY2026 los ingresos crecieron un 10,4 % al año en dólares frente a ≈ 20 % en moneda constante) [A2, A13]. Converge al 5 % en FY2034e.',
    margenes: 'Margen EBITDA del 49,0 % en FY2027e (49,3 % en FY2026 y 50,1 % en el 1T, pero el gasóleo resta 2,5-3 puntos en ritmo anual en el 1S [A3, A12]) y 50 % desde FY2029e por escala y por el peso creciente de Airtel Money (≈ 50 % de margen). No se sube más: la competencia de MTN en Nigeria y Uganda y los impuestos especiales sobre el sector (Kenia, Uganda, RD del Congo) limitan los precios [B2].',
    inversion: 'Capex = capex de caja (≈ 14 % de las ventas; guía de ≈ 1.100 M en FY2027 [A3]) + altas de derechos de uso de torres (≈ 9 %), porque los arrendamientos van en la deuda: 23,0 % en FY2027e bajando al 18,0 %, siempre por encima de la amortización (16,3-16,5 %) para que el terminal reinvierta. Circulante negativo del 6 % de las ventas (prepago, saldos de dinero móvil fuera de él) [A1].',
    wacc: 'WACC del 13,7 %: bono de EE. UU. a 10 años (5,12 % el 20-oct [D4]), beta 1,0 (semanal de 2 años; la mensual de 5 años, 1,6, recoge la crisis de la naira [D1]), prima de mercado del 5,5 % y 6 puntos de riesgo país ponderado por EBITDA (Damodaran: 8,4 % por calificación en Nigeria, Kenia, Uganda y RD del Congo; 5,7 % por CDS en Nigeria; 11,7 % en Zambia y Gabón [D6]). Coste de la deuda del 11 % (bonos en dólares al 7-9 % y deuda local al 15-25 %), 30 % de deuda.',
    terminal: 'Crecimiento terminal del 3,0 % en dólares (Gordon): inflación del dólar más un poco de penetración, porque el crecimiento local (≈ 8-10 %) se lo come la devaluación. Con el múltiplo de salida de 5,5 veces el EBITDA el terminal sería algo menor. El terminal pesa el 53 % del valor, poco para un WACC del 13,7 %.',
  },
  puente_comentarios: {
    'FY2027e': 'Volumen: clientes +11,6 % (189 M) y clientes de datos +15,5 % [A3]; precio: subidas de tarifas por inflación; otros: monedas algo más fuertes que en FY2026 (+3 puntos) [A3].',
    'FY2028e': 'Las monedas vuelven a restar (≈ 2 puntos) tras un año de apreciación.',
    'FY2029e': 'Dinero móvil y datos siguen creciendo un 20 % en moneda local; voz estancada.',
    'FY2030e': 'Penetración de teléfonos inteligentes (≈ 50 %) aún lejos del techo [B1].',
    'FY2031e': 'Crecimiento en dólares hacia el del mercado.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (10,8 % al año en dólares) está por debajo del histórico en moneda constante (≈ 20 %) y es parecido al histórico en dólares (10,4 %), con la cuota de mercado subiendo de forma razonable del 10,6 % al 13,4 % en FY2034e [B1]. Lo sostienen la red ya construida, el dinero móvil (56,5 M de clientes, +23,3 % [A3]) y el capex del 20 % de las ventas, que financia el crecimiento con un ROIC sin fondo de comercio del 22,6 %. El riesgo no es de calidad sino de moneda: una devaluación como la de la naira de 2023-2024 se come dos años de crecimiento en dólares; eso va en el bajista [A2, A3].',
  dcf_lectura: 'El DCF da 3,34 USD por acción (250 peniques), un 10,8 % por debajo del precio. El precio descuenta un crecimiento del 11,9 % al año en dólares hasta FY2034e, algo más que nuestro 10,8 % y bastante más que lo que se espera para el mercado (8,3 %) [B1]; dicho de otra forma, ofrece una rentabilidad implícita del 13,0 %, por debajo de nuestro WACC del 13,7 %. Con la prima implícita del mercado (4,2 %) el valor sube a 3,68 USD, casi el precio: la acción está bien pagada para el riesgo, no barata.',
  narrativas: {
    Bajista: 'Devaluación fuerte de la naira y de otras monedas (como en 2023-2024): en FY2028e los ingresos en dólares se estancan (−12 puntos) y el margen cae 3 puntos por el gasóleo y la inflación; después, 3 puntos menos de crecimiento al año, 1,5 puntos menos de margen y un WACC del 14,7 %. Con la deuda en monedas locales y los arrendamientos en dólares, el valor del accionista se hunde: 1,40 USD.',
    Base: 'Monedas estables en FY2027 y devaluación media de 2-4 puntos al año después; datos y dinero móvil sostienen un crecimiento local del 15-20 %, margen del 50 %.',
    Alcista: 'Monedas estables más tiempo (Nigeria sigue con la reforma cambiaria y las reservas suben), 2 puntos más de crecimiento y 1 punto más de margen; Airtel Money sigue ganando valor en bolsa.',
  },
  escenarios_comentario: 'La asimetría es mala (0,22 veces): el alcista gana un 13,5 % y el bajista pierde un 62,6 %. La razón es el apalancamiento: deuda neta con arrendamientos de 5.956 M y minoritarios de 1.797 M sobre un valor de empresa de 21.320 M, de modo que un 20 % menos de valor de empresa es un 30 % menos para el accionista, y la divisa mueve a la vez el crecimiento y el margen.',
  casos_12m: {
    Bajista: 'Devaluación de la naira o de varias monedas en 2027 (año electoral en Nigeria): el BPA de FY2029e baja a 24,3 centavos y el mercado vuelve a pagar el mínimo de 5 años (7,2 veces, el de 2023). La acción volvería a la zona de 130 peniques.',
    Base: 'Monedas estables o con devaluación moderada; el BPA sin divisas sube a 33,2 centavos en FY2029e (+19 % al año) y el PER baja de 14,7 a 13,9 veces, hacia su mediana de 5 años (13,2). Airtel Money sostiene la valoración de la parte de pagos.',
    Alcista: 'Monedas fuertes más tiempo y margen del 50-51 %: BPA de 37,2 centavos en FY2029e; el mercado mantiene el PER base (la regla no deja subirlo porque la media y los comparables están por debajo).',
  },
  diferencia_consenso: 'Nuestro BPA de FY2028e (27,8 centavos) queda un 19 % por debajo del consenso de Yahoo (34,4, 5 analistas) [D2] y algo por debajo del de la empresa a 31-mar (31,3, 10 analistas) [D3]; en FY2027e estamos cerca (22,6 frente a 24,9 y 23,5). La diferencia está en las monedas: el consenso de octubre sube ingresos con las monedas de hoy (9.040 M en FY2028 frente a nuestros 8.922 M) y supone un coste financiero estable; nosotros metemos 2 puntos de devaluación y un coste financiero creciente por las torres. Nuestro objetivo base a 12 meses (4,61 USD, ≈ 345 peniques) queda por debajo del objetivo medio de los analistas (399 peniques), dentro de su rango (320-518).',
  objetivo_comentario: 'El objetivo a 12 meses (4,04 USD, ≈ 303 peniques) está un 20 % por encima del valor intrínseco (3,36 USD): el mercado paga por el crecimiento en dólares de los dos próximos años y por Airtel Money a precio de mercado, y nuestro DCF descuenta ese crecimiento al 13,7 %. Para que el precio suba hacia el base (≈ 345 peniques) hace falta que los resultados del 1S FY2027 (hacia el 28-oct) confirmen el margen pese al gasóleo y que las monedas aguanten; el bajista pesa mucho porque la devaluación es un riesgo con antecedentes recientes, no remoto. Sin catalizador claro y con la tesis expuesta a la naira, no hay compra.',
  valoracion_comentario: 'Los métodos no se ponen de acuerdo, y eso dice algo: el DCF (3,34 USD, 40 %) y los escenarios (3,08 ponderados, 20 %) dejan la acción cara para su riesgo; la suma de partes (4,19, 20 %) la deja algo barata porque toma Airtel Money al precio de bolsa; y los comparables (20 %) dan 2,9-3,2 USD porque MTN, Vodacom y Turkcell cotizan a 5-7 veces el EBITDA frente a 6,3 de Airtel Africa. El valor ponderado es de 3,36 USD (≈ 252 peniques), un 10 % bajo el precio. Frente a su historia, el EV/EBITDA (6,3 veces) está en el percentil 80 de 5 años; el PER adelantado (14,7) en la mediana (13,2) tras años de 7-9 veces en 2021-2023. El objetivo medio de los analistas (399 peniques) está por encima de nuestro alcista a 12 meses.',
  catalizadores: {
    items: [
      { fecha: '26-oct-2026', evento: 'Primeros resultados de Airtel Money como cotizada (1S)', efecto: 'Fija cuánto vale la parte de pagos (22 % del valor de la suma de partes)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '≈ 28-oct-2026', evento: 'Resultados del 1S FY2027', efecto: 'Margen tras el gasóleo (guía: −2,5-3 puntos en el 1S) y recompras', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'ene-feb 2027', evento: 'Elecciones generales en Nigeria (primer trimestre de 2027)', efecto: 'Riesgo de presión sobre la naira y de cambios regulatorios', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'abr-2027', evento: 'Fin del bloqueo de 180 días de los vendedores de Airtel Money', efecto: 'Posible venta de minoritarios (TPG, Mastercard, QIA); presión sobre su precio', probabilidad: 'Media', sentido: '−' },
      { fecha: 'may-2027', evento: 'Resultados de FY2027 y dividendo', efecto: 'Primera guía con Airtel Money cotizada; nuevo programa de recompras', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Bharti Airtel (79,22 %) decide qué hace con la participación', efecto: 'Una oferta por el 20,8 % restante sería una prima; la compra de mayo se hizo con un descuento del 11,6 % [D12, D16]', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Devaluación de la naira y de otras monedas', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 1,40 USD (−63 %)', mitigante: 'Deuda de la matriz en dólares muy reducida; la deuda está en monedas locales; tarifas indexadas de hecho a la inflación', senal: 'Naira por encima de 1.700 por dólar (media del 1T FY2027: 1.367 [A3]); caída de reservas del banco central' },
      { riesgo: 'Riesgo político y regulatorio en Nigeria (≈ 1/3 del EBITDA) y otros países', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−0,4 a −0,8 USD si se congelan tarifas o hay multas', mitigante: 'La subida del 50 % de 2025 se aprobó por el regulador (NCC); relación larga con los gobiernos', senal: 'Multas, impuestos especiales nuevos (Kenia, Uganda), suspensión de licencias de dinero móvil' },
      { riesgo: 'Coste del gasóleo y de la energía', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−0,15 USD por punto de margen permanente', mitigante: 'Eficiencias de red, energía solar en sitios, compartición de torres', senal: 'Margen EBITDA del 1S por debajo del 47 %' },
      { riesgo: 'Accionista de control (Bharti, 79,22 %)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Descuento de control; operaciones vinculadas', mitigante: 'Acuerdo de relación con Bharti; mayoría de consejeros independientes (60 %) [C1]', senal: 'Operaciones con Bharti a precios no de mercado; exclusión de cotización a un precio bajo' },
      { riesgo: 'Airtel Money pierde valor en bolsa', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−0,36 USD por cada 20 % de caída de Airtel Money', mitigante: 'Crecimiento del 25-30 % y margen del 50 %', senal: 'Airtel Money por debajo de 150 peniques; ventas de minoritarios tras el bloqueo' },
      { riesgo: 'Competencia de satélites y de MTN', tipo: 'Competencia', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Menos crecimiento rural', mitigante: 'Acuerdo de Airtel Africa con Starlink para conectividad directa al móvil y backhaul [A12]', senal: 'Servicios directos al móvil de pago en los mercados de Airtel' },
      { riesgo: 'Repatriación de caja y control de cambios', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Caja atrapada; menos dividendo', mitigante: 'Mercado de divisas de Nigeria más líquido desde 2024', senal: 'Saldos de caja en filiales que no se pueden sacar' },
    ],
    premortem: 'Si dentro de 12 meses la acción ha perdido un 40 %, lo más probable es que haya sido la naira: las elecciones de principios de 2027 en Nigeria o una caída del petróleo vacían las reservas y el banco central deja caer la moneda, como en 2023-2024, cuando el BPA publicado pasó de 17 centavos a pérdidas. A la vez, Airtel Money cae por debajo de 150 peniques cuando acaba el bloqueo de los vendedores y el mercado deja de pagar la parte de pagos. Con 5.956 M de deuda neta y arrendamientos, un 20 % menos de valor de empresa es un 30 % menos para el accionista, y el control de Bharti impide que otro comprador ponga suelo al precio.',
    ia: { exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: 'Bajo; algo positivo', comentario: 'El riesgo de la inteligencia artificial para Airtel Africa es bajo. Vende conectividad móvil y pagos en 14 países africanos, con redes físicas, licencias y espectro que la IA no sustituye; el aumento de tráfico de datos que traen las aplicaciones de IA en el móvil favorece al operador. La IA es más bien una oportunidad de eficiencia: planificación de red, consumo de energía, atención al cliente y detección de fraude en Airtel Money, donde la empresa ya usa herramientas de optimización de red con IA y atención al cliente apoyada en IA [A11, A1]. El riesgo indirecto, que los grandes operadores digitales capturen los servicios sobre la red, ya existe con WhatsApp y no cambia con la IA.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Divisa', pregunta: '¿Qué parte del EBITDA de Nigeria se puede convertir a dólares y subir a la matriz cada año, y a qué tipo?', por_que: 'Decide si el crecimiento en naira llega al accionista en dólares.' },
      { tema: 'Margen', pregunta: '¿Cuánto del efecto del gasóleo es permanente y cuánto se recupera con eficiencias en el 2S?', por_que: 'Cada punto de margen vale ≈ 0,15 USD por acción.' },
      { tema: 'Airtel Money', pregunta: '¿Mantendrá Airtel Africa el 77,85 % o venderá parte cuando acabe el bloqueo?', por_que: 'Una venta daría caja para recompras o deuda, pero también diría a qué precio cree Bharti que vale.' },
      { tema: 'Control', pregunta: '¿Qué planes tiene Bharti con el 20,8 % que no controla?', por_que: 'Compró en mayo con descuento; una oferta futura podría salir a un precio bajo.' },
      { tema: 'Deuda', pregunta: '¿Qué parte de los 4.369 M de arrendamientos está en dólares?', por_que: 'Una devaluación los encarece en moneda local.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 4,04 USD (≈ 303 peniques), un 9,6 % de rentabilidad ponderada con dividendo, y el del caso base de 4,61 USD (+25,0 %); el valor intrínseco es de 3,36 USD, un 10 % por debajo del precio (3,7451 USD, 280,6 peniques). No llega a comprar por dos razones: la ponderada no alcanza el 15 % y el valor intrínseco queda por debajo del precio. El objetivo medio de los analistas (399 peniques) está por encima de nuestro rango. La convicción es baja porque las reglas discrepan (Vender con nuestro WACC, Mantener con la prima del mercado); subiría con unos resultados del 1S que mantengan el margen por encima del 48 % y la naira estable.

**El negocio.** Segundo operador móvil de África por clientes (189 M a 30-jun-2026) y dueño del 77,85 % de Airtel Money, que cotiza en Londres desde el 9-oct-2026 por ≈ 6.600 M USD [D8]. Margen EBITDA del 49,3 % en FY2026 [A2]. El ROIC con el fondo de comercio de Zain es del 14,5 %, solo 0,8 puntos sobre el WACC del 13,7 %: la calidad no pasa el umbral de 5 puntos. La prueba de sostenibilidad da «Sí»: el 10,8 % anual proyectado en dólares está por debajo del histórico en moneda constante y la cuota implícita sube de forma razonable del 10,6 % al 13,4 %.

**Finanzas.** Los ingresos crecieron un 29,5 % en dólares en FY2026 y un 31 % en el 1T FY2027 [A2, A3], ayudados por la naira y por la subida de tarifas de Nigeria. La deuda neta con arrendamientos es de 5.739 M (1,7 veces el EBITDA). La matriz casi no tiene ya deuda en dólares, que fue lo que hundió la acción en 2023-2024 [A4].

**Equipo y gobierno.** Bharti Airtel controla el 79,22 % desde junio, tras comprar el 16,31 % de la familia Mittal con un descuento del 11,6 % y sin oferta a los minoritarios [D12, C4]. El flotante es del 20,6 %. El gobierno es aceptable (60 % de consejeros independientes, 11 de 13 criterios), pero el control resta: decide el tamaño de la salida a bolsa de la filial y el destino de la caja.

**Valoración.** El DCF da 3,34 USD; el precio descuenta un 11,9 % de crecimiento anual en dólares y una rentabilidad del 13,0 %, por debajo de nuestro WACC. La suma de partes cotizadas da 4,19 USD; los comparables africanos, 2,9-3,2. El PER adelantado (14,7) está en su mediana, tras años de 7-9 veces.

**Riesgos y catalizadores.** El mayor es la divisa: una devaluación como la de 2023-2024 lleva el valor a 1,40 USD (−63 %), y la asimetría es de 0,22 veces. Le siguen el riesgo regulatorio en Nigeria, con elecciones a principios de 2027, y el valor en bolsa de Airtel Money. El riesgo de IA es bajo. Hay catalizadores con fecha: Airtel Money publica el 26-oct y Airtel Africa hacia el 28-oct. La regla 13 dice «retrasa» hasta esos resultados, porque la tendencia es bajista (−18 % frente a la media de 200 sesiones).

**Qué cambiaría la decisión.** Comprar por debajo de 3,36 USD (≈ 252 peniques) si la calidad mejorase; vender por encima de 4,56 USD (≈ 342 peniques). Pasaríamos a Vender si la naira cae más de un 20 % o el margen baja del 46 %.`,
    tesis: 'Airtel Africa es el segundo operador móvil de África, con 14 países, ≈ 189 M de clientes y un margen EBITDA del 49,3 %, y controla Airtel Money, la segunda red de dinero móvil del continente, que cotiza aparte desde octubre de 2026 por ≈ 7.000 M USD [A2, D8]. Crece un 20 % al año en moneda local con datos y pagos.\n\nEl precio (280,6 peniques) descuenta un crecimiento del 11,9 % anual en dólares hasta FY2034e y una rentabilidad implícita del 13,0 %, por debajo de nuestro WACC del 13,7 %. Cotiza a 6,3 veces el EBITDA de los últimos 12 meses, en el percentil 80 de su historia y por encima de MTN (4,9) y Vodacom (7,1 con menos riesgo) [D2].\n\nEl mercado acierta en lo esencial: el negocio es bueno en moneda local, pero el accionista cobra en dólares y la historia de 2023-2024 enseña que una devaluación se come dos años de crecimiento. Para invertir hay que creer que las monedas africanas, y sobre todo la naira, se mantendrán estables y que Airtel Money conserva su valor en bolsa. A este precio no se paga bien ese riesgo.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento en dólares cercano al 12 % anual durante ocho años, con las monedas de hoy y Airtel Money a precio de mercado; el consenso sube los BPA de FY2028 (34,4 centavos).',
      nuestra_vision: 'El crecimiento en moneda local es real, pero en dólares será menor (10,8 %) porque las monedas africanas se devalúan de media 2-4 puntos al año; nuestro BPA de FY2028e (27,8 centavos) queda un 19 % por debajo del consenso.',
      por_que: 'Los analistas extrapolan las monedas de hoy. Entre FY2021 y FY2026 los ingresos crecieron ≈ 20 % al año en moneda constante y solo un 10,4 % en dólares [A13].',
    },
    a_favor: [
      '**Crecimiento local fuerte**: ingresos +21,1 % en moneda constante en el 1T FY2027 [A3].',
      '**Margen alto**: EBITDA del 49,3 % en FY2026, por encima de MTN y Vodacom [A2, D2].',
      '**Airtel Money cotiza**: su 77,85 % vale ≈ 5.100 M USD, el 38 % de la capitalización [D8].',
      '**Deuda en dólares de la matriz reducida**: la deuda bruta ya está en las monedas locales [A4].',
      '**Riesgo de IA bajo**: negocio de redes físicas y licencias.',
    ],
    en_contra: [
      '**Divisa**: el bajista (devaluación) deja el valor en 1,40 USD (−63 %).',
      '**Calidad justa**: ROIC del 14,5 % frente a un WACC del 13,7 % (+0,8 puntos).',
      '**Caro frente a su historia**: EV/EBITDA de 6,3 veces, percentil 80 de 5 años.',
      '**Control de Bharti (79,22 %)**: compró con un descuento del 11,6 % y sin oferta a los minoritarios [D12].',
      '**Gasóleo**: −2,5-3 puntos de margen en ritmo anual en el 1S FY2027 [A3].',
    ],
    que_vigilar: 'La tesis depende de que las monedas, sobre todo la naira, se mantengan estables durante las elecciones nigerianas de 2027 y de que el margen aguante el gasóleo. La señal de que no se cumple: una naira por encima de 1.700 por dólar (1.367 de media en el 1T FY2027), un crecimiento en dólares por debajo del 10 % en un trimestre o Airtel Money por debajo de 150 peniques.',
    cambiaria_recomendacion: [
      'Si la acción baja de 252 peniques (3,36 USD) con monedas estables, el valor intrínseco quedaría por encima del precio (pero la calidad seguiría por debajo del umbral).',
      'Si el margen EBITDA del 1S FY2027 baja del 46 %, pasaríamos a Vender.',
      'Si la naira se deprecia más de un 20 % en seis meses, pasaríamos a Vender.',
      'Si Bharti anuncia una oferta por el 20,8 % restante, revisaríamos según el precio.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento de ingresos en moneda constante', nivel_actual: '21,1 % (1T FY2027)', umbral_alerta: '< 15 %', por_que: 'Motor del crecimiento antes de las monedas.' },
      { kpi: 'Margen EBITDA', nivel_actual: '50,1 % (1T FY2027)', umbral_alerta: '< 46 %', por_que: 'Gasóleo y presión de precios.' },
      { kpi: 'Naira por dólar', nivel_actual: '1.367 (media del 1T FY2027) [A3]', umbral_alerta: '> 1.700', por_que: '≈ 1/3 del EBITDA está en Nigeria.' },
      { kpi: 'Precio de Airtel Money', nivel_actual: '182,6 peniques', umbral_alerta: '< 150 peniques', por_que: 'Un 38 % de la capitalización.' },
      { kpi: 'Deuda en moneda fuerte de la matriz', nivel_actual: 'Mínima', umbral_alerta: 'Nuevas emisiones en dólares', por_que: 'Fue el riesgo de 2023-2024.' },
    ],
    confianza: 'Media',
  },
};
