// Textos del analista (Logista, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Logista, la CNMV y los proveedores de datos no se pudieron abrir, así que las cifras salen de extractos de búsqueda de las notas de resultados, de la prensa económica (Europa Press, Alimarket, Merca2) y de agregadores (Stock Analysis, MarketScreener, roic.ai, TipRanks, Fintel), cruzadas cuando fue posible; lo que no cuadró está en null y en los huecos. Confianza de los datos de núcleo: baja. Precio: 35,86 EUR del 13-oct-2026 (XTB, por la mañana), no un cierre oficial de la Bolsa de Madrid. Ejercicio de octubre a septiembre, con la etiqueta del año en que termina (FY2025 = oct-24 a sep-25). Ingresos brutos con impuestos especiales y producto repercutidos: los márgenes sobre ingresos son bajos por construcción; la medida de gestión son las ventas económicas. EBITDA = EBIT publicado + amortización (estimación propia). El balance de los agregadores no separa el crédito a Imperial (la caja flotante, ≈2.000-2.700 M) ni el circulante. La caja del puente es la tesorería en bancos más el valor de la renta de intereses de la caja flotante (estimación propia, 730 M), no su importe nominal. Comparables tomados de los informes de DSV y Rentokil del repositorio (7-oct).',

  controles_explicados: [
    { control: 'Deuda neta del puente = la del último balance anual', explicacion: 'El puente suma a la tesorería en bancos (175 M) el valor de la caja flotante prestada a Imperial, valorada como renta perpetua de sus intereses después de impuestos (≈730 M, estimación propia), porque es flotante de impuestos que no se puede repartir. El balance de los agregadores solo recoge la tesorería en bancos.' },
    { control: 'ROIC', explicacion: 'El ROIC del motor (49,6 %) se calcula sobre patrimonio + deuda − tesorería en bancos (≈490 M). El capital invertido operativo real es negativo: el circulante (impuestos cobrados y no pagados) financia ≈2.500 M de caja prestada a Imperial. El ROIC no tiene sentido como cifra; lo que dice es que el negocio no consume capital.' },
  ],

  secciones: {
    comparables: {
      comentario: 'Logista cotiza a 16,5x nuestro BPA del FY2027e, cerca de la mediana de los comparables (17,4x) y muy por encima de Imperial Brands (9,5x), pero los comparables no lo son de verdad: los operadores logísticos crecen al 3-12 % y Logista distribuye un producto cuyo volumen cae. Por eso pesan 0 en la síntesis. El dato relevante es su propia historia: entre 8,9x y 13,6x de PER adelantado en los seis últimos cierres, y hoy 16,5x, el máximo de la serie.',
    },
  },

  dcf_justificacion: {
    crecimiento: 'Ingresos +2,5 % en FY2026e (nueve meses: +2,3 % [A5]) y +2,5 % hasta FY2029e, bajando al 1,5 % en FY2033-35e. El volumen de cigarrillos cae (Francia: ventas económicas −2 % a nueve meses [A5]) y el precio sube por impuestos; Italia y los productos de nueva generación compensan [A4]. Entre FY2021 y FY2025 los ingresos crecieron un 5,8 % anual [A9], con subidas de impuestos excepcionales que no proyectamos.',
    margenes: 'Margen EBITDA constante del 3,6 % (FY2025: 488 M sobre 13.535 M, estimación propia [A9, A1]). La guía es de EBIT ajustado creciendo a un dígito medio; lo dejamos en el ritmo de los ingresos porque el transporte y Francia restan y el resultado por inventarios (35-45 M) no es recurrente [A1, A7].',
    inversion: 'Capex del 1,0 % de los ingresos, que incluye los pagos de arrendamientos (54 + 76 M en el FY2025 [A14]); amortización del 1,25 % (170 M en el FY2025 [A9]). Circulante constante: el circulante negativo ya genera la caja flotante, que se valora aparte en el puente.',
    wacc: 'Tasa libre: Bund a 10 años del 3,53 % [D13]. Beta 0,6 (sin beta calculable en este entorno; negocio de distribución regulada poco cíclico), prima de mercado del 5,5 % y 0,5 puntos adicionales por la dependencia de Imperial y el declive del tabaco. Sin deuda: WACC = coste del capital = 7,33 %.',
    terminal: 'Gordon al 1,0 %: precio del tabaco al alza por impuestos y volumen a la baja; por debajo de la inflación porque la base de cigarrillos encoge.',
  },
  puente_comentarios: {
    'FY2026e': 'Volumen de cigarrillos −1,5 %; precio +4 % por subidas de impuestos en España, Italia y Francia [A4, A5].',
    'FY2027e': 'Igual tendencia; otros: farma y productos de nueva generación.',
    'FY2028e': 'Igual que FY2027e.',
    'FY2029e': 'Igual que FY2027e.',
    'FY2030e': 'Menos subidas de precio; el volumen sigue cayendo.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (2,1 % de media) es inferior al de los últimos cinco años (5,8 %) y no necesita capital: la reinversión es negativa o casi nula (capex de 54 M frente a 170 M de amortización) y el circulante negativo financia la caja. El motor no aplica la prueba de reinversión y la hacemos a mano: el crecimiento sale del precio (impuestos repercutidos), que Logista no paga, y de volúmenes que caen un 1,5 % al año. Con ventas económicas de nueve meses +1,1 % y EBIT ajustado +3 % [A5], el 2,5 % de ingresos es alcanzable. El riesgo no es de financiación sino de margen (renegociación de tarifas con los fabricantes) y de tipos (ingresos financieros), que quedan fuera del DCF operativo. No hace falta rebajar el base.',
  dcf_lectura: 'El DCF da 43,45 EUR por acción, un 21,2 % por encima del precio, con el valor terminal en el 58 % del valor. El DCF inverso dice que, con nuestro WACC del 7,33 %, el precio de 35,86 EUR se sostiene con ingresos cayendo un 1,3 % al año en FY2027-FY2035e (frente al +2,0 % del base) o con un margen EBITDA del 3,0 % (frente al 3,6 %); la rentabilidad implícita para el comprador es del 9,0 %. El precio no es exigente sobre flujos: lo caro es el múltiplo frente a su propia historia. La conclusión depende de la caja flotante: si se contara al nominal (≈2.500 M) el DCF subiría a ≈57 EUR; si no se contara nada, bajaría a ≈38 EUR.',
  narrativas: {
    Bajista: 'Francia y España aceleran la caída del volumen, un fabricante renegocia tarifas y el BCE baja tipos: el EBIT se estanca y los ingresos financieros caen a ≈55 M. El mercado vuelve a pagar el PER de 2022 (8,9x).',
    Base: 'Ingresos +2,5 % con precio por impuestos, EBIT ajustado +3-4 % y ingresos financieros estables en ≈70 M: BPA de 2,24 EUR en FY2028e y dividendo de 2,09-2,15 EUR.',
    Alcista: 'Compras en farma que suman EBIT, productos de nueva generación que compensan el cigarrillo y tipos estables: BPA de 2,40 EUR, cerca del consenso.',
  },
  escenarios_comentario: 'El DCF de los tres escenarios queda en 30,92, 43,45 y 52,91 EUR: dos de los tres por encima del precio. La asimetría a 12 meses, en cambio, es mala (0,33x: +22,3 % en el alcista frente a −43,2 % en el bajista) porque la acción cotiza al PER más alto de su historia y el bajista aplica el mínimo de cinco años (8,9x). Las dos lecturas no se contradicen: el negocio vale más que el precio a largo plazo, pero el múltiplo ya ha corrido.',
  suma_partes_comentario: 'No se aplica: los segmentos por región no publican EBIT en las fuentes accesibles, y la parte separable relevante (la caja flotante) ya va en el puente.',

  casos12m: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 2.05, multiplo: null, precio: null, justificacion: 'Beneficio de ≈272 M en FY2028e: EBIT ajustado plano en ≈380 M (Francia y transporte restan), ingresos financieros de ≈55 M (BCE 50 pb más bajo), sin resultado por inventarios extraordinario, tipo del 25 %. 132,5 M de acciones, sin recompras.' },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 2.24, multiplo: null, precio: null, justificacion: 'FY2026e ≈280 M (210 M a nueve meses + ≈70 M en el 4T, como el 4T del FY2025) = 2,11 EUR; FY2027e ≈288 M = 2,17 EUR; FY2028e ≈297 M: EBIT ajustado +3-4 % al año (≈420 M), amortización de intangibles de compra ≈55 M, ingresos financieros ≈70 M (caja de ≈2.500 M a Euribor + 75 pb) y tipo del 25 %. 132,5 M de acciones.' },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 2.4, multiplo: null, precio: null, justificacion: 'Beneficio de ≈318 M: EBIT ajustado +6 % al año con compras en farma, tipos estables e inventarios positivos. En línea con el consenso (2,42 EUR).' },
  ],
  diferencia_consenso: 'Nuestro BPA del FY2028e (2,24 EUR) queda un 7 % por debajo del de MarketScreener (2,42) [D4]: no damos compras ni subida de los ingresos financieros. El de FY2026e-FY2027e coincide (2,11-2,17 frente a 2,12-2,17). Nuestro precio base (31,58 EUR) está un 3 % por debajo del objetivo medio (32,54 EUR, julio) [D8], y los dos quedan por debajo de la cotización: el mercado ha subido más rápido que los objetivos (JB Capital acaba de subir a 35,50 EUR, aún por debajo del precio [D1]).',
  objetivo12m_comentario: 'El objetivo a 12 meses (30,79 EUR ponderado; 31,58 EUR en el base) queda un 29 % por debajo del valor intrínseco (43,22 EUR). La distancia la explica el múltiplo: el DCF capitaliza un flujo estable de ≈300 M al 7,33 % menos un 1 % de crecimiento (≈16x el beneficio), mientras que la regla lleva el PER de hoy (16,5x) a mitad de camino hacia la mediana de cinco años (12,1x), años en los que Logista cotizó barata con tipos altos. Si el mercado ha recalificado de forma permanente a Logista como un «bono» con dividendo asegurado y tipos a la baja, el DCF tiene razón y la regla se queda corta; si vuelve a su historia, la acción pierde un 10-15 % aunque el negocio cumpla.',
  valoracion_comentario: 'Pesamos el DCF al 70 % y los escenarios al 30 %; comparables y transacciones a 0 porque no hay cotizadas equivalentes y las compras de Logista no publican múltiplo. La partida que más mueve el valor es la caja flotante: entre 0 y 2.500 M según cómo se trate (±19 EUR por acción). La contamos por el valor de sus intereses (730 M), que es lo que el accionista cobra de ella. El valor intrínseco, 43,22 EUR, queda un 20,5 % por encima del precio.',
  rentabilidad_comentario: 'El ROIC del motor (49,6 %) no mide nada útil: el capital invertido operativo es negativo porque Logista cobra los impuestos del tabaco antes de pagarlos y ese circulante financia ≈2.500 M de caja. La lectura correcta es que el negocio no consume capital: el beneficio neto (281 M) es el 44 % del patrimonio (643 M) y el capex (54 M) un tercio de la amortización. Frente al WACC (7,33 %), cualquier medida de retorno sobre capital queda muy por encima; el límite de Logista no es la rentabilidad del capital sino que no tiene dónde reinvertirlo, y por eso reparte el 99 % del beneficio.',

  catalizadores: {
    items: [
      { fecha: '2026-11-05', evento: 'Resultados del FY2026 y guía del FY2027 (fecha estimada por el calendario de 2025)', efecto: 'Cumplimiento de la guía de EBIT ajustado y nuevo suelo de dividendo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Junta y dividendo complementario del FY2026', efecto: 'Dividendo de al menos 2,09 EUR (≈1,51 EUR complementario)', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-06', evento: 'Renovación de la línea de tesorería con Imperial (vence en 2027)', efecto: 'Condiciones de la remuneración de la caja flotante', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Compras en farma o productos de nueva generación', efecto: 'Crecimiento inorgánico anunciado por el consejero delegado', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Revisión de la directiva europea de impuestos al tabaco', efecto: 'Subidas de precio (inventarios +) y volumen −', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Vuelta del PER a su historia (12x)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % a −25 % (bajista a 12 meses: −43,2 %)', mitigante: 'Dividendo del 5,8 %', senal: 'Subida de los tipos a largo o de la rentabilidad de los bonos' },
      { riesgo: 'Bajada de tipos del BCE (ingresos financieros de la caja flotante)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % del BPA por cada 50 pb', mitigante: 'Cobertura de ≈50 % con Imperial', senal: 'Euribor a 6 meses por debajo del 1,75 %' },
      { riesgo: 'Renovación de la línea con Imperial en peores condiciones', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Imperial necesita a Logista como distribuidor', senal: 'Diferencial por debajo de Euribor + 75 pb' },
      { riesgo: 'Caída del volumen de cigarrillos (Francia, España)', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Precio por impuestos y productos de nueva generación', senal: 'Ventas económicas de Francia por debajo de −5 %' },
      { riesgo: 'Renegociación de tarifas con un gran fabricante', tipo: 'Comercial', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 % a −15 %', mitigante: 'Costes de cambio y escala', senal: 'Pérdida o cambio de contrato de distribución' },
      { riesgo: 'Compras caras en farma o transporte', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Importes pequeños frente a la caja', senal: 'Compra a más de 12x EBITDA' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 25 % y está en 27 EUR. Nada fue mal en el negocio: el EBIT ajustado creció un 3 % y el dividendo se mantuvo en 2,09 EUR. Pero los tipos a largo subieron, el dividendo del 5,8 % dejó de ser escaso y el mercado volvió a pagar el PER de 12-13x de 2021-2025; a la vez, Imperial renovó la línea de tesorería con un diferencial menor y los ingresos financieros bajaron. La señal que lo anticipaba: el PER adelantado de 16,5x, el máximo de su historia, sin un cambio en el crecimiento que lo justificara.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Caja flotante', pregunta: '¿Cuál fue la caja media prestada a Imperial en el FY2026 y qué tipo efectivo cobró, incluida la cobertura?', por_que: 'Mueve ±19 EUR por acción el valor según cómo se trate y ≈25 % del beneficio.' },
      { tema: 'Línea con Imperial', pregunta: '¿Qué condiciones se negocian para la renovación de 2027 y quién aprueba la operación vinculada?', por_que: 'Es la operación con el accionista de control más relevante.' },
      { tema: 'Dividendo', pregunta: '¿Habrá un suelo de dividendo para el FY2027 por encima de 2,09 EUR, con payout del 99 %?', por_que: 'Es lo que el mercado está pagando.' },
      { tema: 'Francia', pregunta: '¿Qué caída de volumen espera en Francia y qué parte compensan los productos de nueva generación?', por_que: 'Es el mercado que resta.' },
      { tema: 'Adquisiciones', pregunta: '¿Qué múltiplo está dispuesta a pagar por compras en farma y cuánto EBIT aportarían?', por_que: 'El alcista depende de ellas.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [
    { seccion: 'valoracion', campo: 'puente (caja flotante prestada a Imperial al 30-sep-25)', tipo: 'Núcleo', intentos: '1) Anuncio de resultados FY25 en búsqueda; 2) balance de Fintel y Simply Wall St (solo tesorería en bancos); 3) Merca2 y Bankinter: caja media de 2.200-2.700 M estimada por analistas', decision: 'Calculado y marcado como estimación' },
  ],
};
