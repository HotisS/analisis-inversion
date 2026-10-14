// Textos del analista (Meta Platforms, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de inversores, Yahoo Finance y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los 8-K, del 10-K, del 10-Q, de agregadores (Stock Analysis, edgar.tools, Finboard, Macrotrends) y de la prensa financiera, cruzadas con identidades contables (beneficio antes de impuestos menos impuestos igual al beneficio neto; BPA por acciones igual al beneficio) cuando fue posible. La confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. El consejo solo lista a los dos consejeros comprobados; el motor calcula por eso un 50 % de independientes, cuando según la junta de 2026 son 11 de 12 [C2]. Precio: último cierre localizado, 718,67 USD del 9-oct-2026 [D1]; no se encontró el cierre del 13-oct. Acciones diluidas: 2.564 M, implícitas en el 2T26 (beneficio neto de 15.848 M entre BPA diluido de 6,18 USD) [A4]. Cuentas en USD y US GAAP; ejercicio natural. Los arrendamientos operativos no van al puente (US GAAP); los financieros no se pudieron leer y quedan en cero. Los comparables vienen de los informes de Amazon (precios del 9-oct) y de Alphabet (7-oct) del repositorio: los de Amazon miden el EBITDA con la remuneración en acciones como gasto y los de Alphabet sin restarla, así que sus EV/EBITDA no son homogéneos; el PER sí lo es. El BPA del objetivo a 12 meses y el PER histórico están en base normalizada (2025 sin el cargo fiscal de la ley OBBBA, con el tipo del 13 % que da la propia empresa).',

  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'El 11,8 % de 2024 es el publicado: créditos de I+D y la deducción por ingresos de intangibles en el extranjero (FDII). En 2025 el tipo subió al 30 % por el cargo único de la ley OBBBA (sin él, 13 %) [A2]. El DCF usa un 15 % normalizado.' },
    { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 29,6 % de 2025 incluye el cargo único por la provisión de activos fiscales diferidos de la ley OBBBA del 3T25; sin él, el tipo habría sido del 13 % [A2].' },
  ],

  huecos_resueltos: [],

  secciones: {
    negocio: { geografias_criterio: null },
    financieros: {
      comentario: 'Los ingresos pasaron de 117.929 M en 2021 a 200.966 M en 2025 (TCAC del 14 %), todo orgánico: Meta no ha hecho compras relevantes desde 2014. El año malo fue 2022 (−1 %), por el cambio de privacidad de Apple y el frenazo publicitario; el margen EBIT cayó del 39,6 % al 24,8 %. El «año de la eficiencia» lo devolvió al 34,7 % en 2023 y al 42,2 % en 2024. En 2025 bajó al 41,4 % y en el 2T26 al 31 % [A4]: la amortización de la inversión en IA (de 15.498 M en 2024 a 18.616 M en 2025, y muy por encima en 2026) y la contratación de investigadores de IA crecen más deprisa que los ingresos. El 2T26 incluye además 2.400 M de cargos legales y 1.180 M de indemnizaciones por los despidos de mayo; sin ellos el beneficio operativo habría crecido un 9 % [A4]. El beneficio neto de 2025 (60.458 M) cayó un 3 % por un cargo fiscal único.',
      ajustes: 'Cifras reportadas en US GAAP. Partidas no recurrentes: en 2025, el cargo fiscal de la ley OBBBA (sin él, el tipo efectivo habría sido del 13 % y no del 30 %, unos 14.300 M de impuesto adicional, cálculo propio) [A2]; en el 1T26, un beneficio fiscal de 8.030 M por una guía del Tesoro (3,13 USD por acción) [A3]; en el 2T26, 2.400 M de cargos legales y 1.180 M de indemnizaciones, que se registran como no recurrentes en el EBITDA de los últimos 12 meses [A4]. Los cargos legales se repiten casi cada año (multas de la FTC en 2019, veredictos de 2026): no son del todo extraordinarios. El BPA normalizado de 2025 es de 29,04 USD (estimación propia con el tipo del 13 %).',
    },
    trimestres: {
      ultima_presentacion: 'En la conferencia del 2T26 (29-jul) la dirección subió la guía de gastos de 2026 a 165.000-169.000 M y estrechó la de capex a 130.000-145.000 M, y mantuvo que el beneficio operativo de 2026 superará al de 2025 [A4, A11]. La directora financiera insistió en que la capacidad de cómputo está limitada por la demanda y en exprimir su uso en 2026 y 2027. Las preguntas se centraron en por qué sube el capex otra vez (respuesta: «más visibilidad tres meses después») y en el equilibrio entre inversión y caja libre, que la dirección no cuantificó [A11]. Frente a la conferencia del 1T26, el discurso pasó de la eficiencia al «compute»: en abril ya se negó a dar una cifra de capex de 2027 y admitió que la empresa subestima de forma sistemática sus necesidades [A15]. Lo que evitó: una cifra de inversión y de gastos para 2027 y el plazo de monetización de Meta AI. El BPA (6,18 USD) quedó por debajo de los 7,2 USD esperados por los cargos legales y de despidos.',
    },
    balance: {
      otros_pasivos: 'Fuera de balance, el centro de datos Hyperion (Luisiana) se financió con unos 27.000 M de deuda privada a través de una sociedad con un socio financiero; Meta lo alquila y, según la prensa, garantiza su valor residual: es un pasivo económico que no está en el puente (estimación de la prensa, no comprobada en el 10-Q) [A5]. Los arrendamientos operativos de oficinas y centros de datos no se suman (US GAAP: su coste ya está en el EBITDA). Hay miles de demandas por daños a menores agrupadas en EE. UU.; los cargos legales del 2T26 (2.400 M) apuntan a provisiones crecientes [A4]. No consta deuda con covenants financieros.',
      comentario: 'Meta pasó de no tener deuda en 2021 a 83.660 M de bonos a 30-jun-2026, tras emitir 30.000 M en octubre de 2025 y 25.000 M en mayo de 2026 con demanda menguante (96.000 M de órdenes frente a 125.000 M) [A5, A12]. La caja e inversiones (90.260 M) apenas cubre ya la deuda: la caja neta cayó de 22.850 M a finales de 2025 a unos 6.600 M en junio [A2, A4]. Con caja libre negativa prevista en 2026-2028, la deuda neta subirá. El circulante es pequeño y estable: clientes de 19.769 M frente a proveedores de 8.894 M en 2025.',
    },
    flujos: {
      comentario: 'Meta convierte bien el beneficio en caja de explotación (115.800 M en 2025, 1,9 veces el beneficio neto, por la amortización y los 20.427 M de remuneración en acciones) [A14, A13], pero la inversión se la come: el capex con arrendamientos financieros pasó de 39.225 M en 2024 a 72.220 M en 2025 y a 31.080 M solo en el 2T26, y la caja libre del trimestre fue de 784 M frente a 8.549 M un año antes [A4, A10]. No hay recompras desde el 3T25. Casi todo el capex es de crecimiento (centros de datos y servidores de IA); estimamos el de mantenimiento en torno a la amortización, del 9-12 % de las ventas (estimación propia). La remuneración en acciones (≈10 % de las ventas) es un coste real que el flujo operativo no recoge.',
    },
    calidad: {
      comentario: 'Auditoría de Ernst & Young con opinión favorable. Los indicadores del motor no muestran alarma: Altman Z de 9,55 (muy lejos de la zona de riesgo), Beneish M de −3,12 (sin señales de manipulación) y Piotroski F de 5, intermedio, penalizado por la caída del margen y del flujo libre y por la deuda nueva, no por la contabilidad. Lo que hay que vigilar son tres juicios: (1) la vida útil de los servidores, que Meta alargó a 5,5 años en 2025 y que reduce la amortización frente a una vida más corta; (2) la remuneración en acciones (20.427 M en 2025, ≈10 % de las ventas) [A13], excluida en el EBITDA de los proveedores; (3) la financiación fuera de balance de Hyperion. Los beneficios fiscales y cargos únicos de 2025-2026 distorsionan el beneficio neto, no la caja.',
      senales: [
        { senal: 'Vida útil de servidores alargada a 5,5 años', nivel: 'Media', comentario: 'Reduce la amortización en plena ola de inversión; con chips que quedan obsoletos antes, el beneficio puede estar sobrestimado.' },
        { senal: 'Financiación de Hyperion fuera de balance (≈27.000 M)', nivel: 'Media', comentario: 'La deuda la soporta una sociedad aparte; Meta alquila y garantiza el valor residual según la prensa.' },
        { senal: 'Remuneración en acciones del 10 % de las ventas', nivel: 'Baja', comentario: 'Gasto real que el EBITDA ajustado de los analistas no resta.' },
      ],
    },
    capital: {
      politica: 'Dividendo trimestral de 0,525 USD (2,10 USD al año, 0,3 % de rentabilidad) desde 2025 y recompras oportunistas, sin recompras desde el 3T25 [A14]. La prioridad declarada es la inversión en infraestructura de IA (130.000-145.000 M en 2026) y en talento; la deuda (30.000 M en 2025 y 25.000 M en 2026) cubre la diferencia [A12]. No hay objetivo de apalancamiento publicado.',
      adquisiciones: [
        { anio: '2025', objetivo: 'Scale AI (participación del 49 %, sin control)', importe: 14300, ev_ebitda: null, financiacion: 'Caja', resultado: 'Inversión financiera para traer al equipo de datos de IA; sin consolidación.' },
      ],
      comentario: 'Meta ha devuelto mucho dinero: 148.276 M de recompras y 10.392 M de dividendos en 2021-2025 (calc del motor sobre los flujos), con lo que las acciones diluidas bajaron de 2.859 M a 2.574 M. El ROIC (35,7 % en 2025) y el ROIC incremental histórico (22,6 %) confirman que la inversión pasada creó valor. El historial de grandes apuestas es mixto: Instagram y WhatsApp fueron compras excelentes; Reality Labs ha perdido más de 17.000 M al año sin retorno visible. La duda actual es de escala: la reinversión ha pasado del 30-40 % al 100 % del flujo operativo, y el retorno de ese capital no se verá hasta 2028.',
      confianza: 'Media',
    },
    multiplos_historicos: {
      comentario: 'Meta ha cotizado de forma estable a 23-25 veces su beneficio de los últimos 12 meses (2021, 2023, 2024) y a 22,7 veces el normalizado de 2025, salvo el desplome de 2022 (13,9 veces). Hoy, a 718,67 USD, cotiza a unas 27 veces el beneficio de los últimos 12 meses (26,54 USD con el beneficio fiscal del 1T26) y a 26 veces nuestro BPA de 2027e: por encima de su mediana de cinco años. Ha cambiado el perfil: la empresa pasa de devolver caja a invertirla toda, y el tipo a 10 años ha subido al 5,2 %; las dos cosas deberían pedir un múltiplo menor, no mayor.',
    },
    comparables: {
      comentario: 'Meta cotiza a 21,4 veces el PER de los próximos 12 meses del consenso, en la parte baja del grupo (mediana de 22,6 veces entre 18,6 de Netflix y 35,2 de Apple) pese a crecer más que todos salvo Oracle y Alphabet. La regresión del motor la sitúa cerca de la línea múltiplo-crecimiento. El descuento se explica por la caja libre: Meta tiene un rendimiento por FCF del 2,4 % que va a caer a cero en 2026-2027, y sus compañeros con un ciclo de inversión parecido (Oracle, Amazon) cotizan con descuento por lo mismo. Usamos el PER de los próximos 12 meses como múltiplo principal; los EV/EBITDA no son homogéneos (ver limitaciones) y tienen menos peso.',
    },
  },

  dcf_justificacion: {
    crecimiento: 'El 2026e (+24,5 %) es casi un dato: 117.110 M en el primer semestre (+30 %) y guía de 61.000-64.000 M en el 3T26 [A3, A4]; coincide con el consenso de 250.360 M [D4]. Después bajamos al 17 % en 2027 (consenso: +18,5 %) y en línea recta hasta el 5 % en 2035. La historia lo permite: TCAC del 14 % en 2021-2025 con un año negativo. eMarketer prevé que el mercado crezca en torno al 9-10 % y Meta más que él [B1]. No incluimos ingresos de Muse hasta 2028.',
    margenes: 'El margen EBITDA de 2026 (45,8 %) sale de la guía de gastos (165.000-169.000 M) con una amortización estimada del 12,5 % de las ventas; el de 2025 fue del 50,7 %. Sube hasta el 52 % en 2031 porque los gastos de personal y de infraestructura de IA crecen menos que los ingresos cuando la inversión madura; queda por debajo del 51-58 % de 2021-2024 sin Reality Labs. El margen EBIT terminal (35 %) es inferior al 41,4 % de 2025: la amortización estructural es mucho mayor.',
    inversion: 'Capex del 55 % de las ventas en 2026 (guía de 130.000-145.000 M) y del 60 % en 2027 (la dirección anticipa más inversión; analistas en 175.000-197.000 M) [D2], 50 % en 2028 y normalización al 18 % en 2035, el doble que antes de la IA (13-27 % en 2021-2024). La amortización sube del 9,3 % al 19 % de las ventas y termina en el 17 %. Circulante del 5 % de las ventas, como el histórico.',
    wacc: 'Tasa libre del 5,21 % (bono a 10 años del 13-oct-2026) [D19]. Beta de 1,23: la de Fintel (1,34-1,37, sin fecha) ajustada a la Blume [D20]. Prima de mercado del 5 %, como en los informes de Alphabet y Microsoft. Coste de la deuda del 5,25 % (cupón de los bonos a 2036) con un tipo del 15 %; peso de la deuda del 4,3 % a valor de mercado. WACC del 11,06 %. Con la prima implícita del mercado (4,2 %) baja al 10,1 %.',
    terminal: 'Gordon con un 3 % de crecimiento: inflación esperada en USD de en torno al 2,3 % más algo de crecimiento real, por debajo de la tasa libre menos medio punto (4,7 %). El múltiplo de salida de referencia (15 veces el EBITDA) está en la parte baja de los comparables (15-29 veces el de los últimos 12 meses).',
  },

  puente_comentarios: {
    '2026e': 'Impresiones +19 % y precio por anuncio +12 % en el 1T26 [A3]; en el segundo semestre la base de comparación es más exigente.',
    '2027e': 'Volumen por más tiempo de uso (Reels, Threads, WhatsApp) y precio por mejor conversión con IA; consenso +18,5 % [D4].',
    '2028e': 'Primeros ingresos de Muse y de la publicidad en WhatsApp; el mercado crece en torno al 9 % [B1].',
    '2029e': 'Convergencia hacia el crecimiento del mercado con algo de ganancia de cuota.',
    '2030e': 'Crecimiento algo por encima del mercado; cuota del 29,3 % en 2035 frente al 26,8 % actual.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La calidad de Meta sostiene el crecimiento que proyectamos, que es menor que el que paga el precio. Las tres pruebas pasan: la reinversión (46 % del NOPAT de toda la proyección) financia un 16,3 % de crecimiento al ROIC de 2025 (35,7 %) frente al 11,3 % proyectado; el capital nuevo debe rendir un 20,8 %, por debajo del ROIC incremental histórico (22,6 %); y la cuota del mercado mundial de publicidad digital pasaría del 26,8 % al 29,3 % [B1]. El foso (efectos de red con 3.560 M de usuarios diarios [A3]) y el poder de precios demostrado (+12 % de precio por anuncio en el 1T26) lo respaldan. La duda no es si puede crecer, sino si el capital nuevo rendirá lo que rendía el antiguo: suponemos que rinde menos.',
  dcf_lectura: 'El DCF da 434,41 USD por acción, un 39,6 % por debajo del precio, con un WACC del 11,06 % y el valor terminal como el 72 % del total; con la prima implícita del mercado (WACC del 10,1 %) sube a 512,38 USD, aún un 29 % por debajo. Los años 2026-2028 restan valor: la caja libre operativa es negativa (−37.151 M en 2026e y −56.064 M en 2027e) porque el capex supera al EBITDA. El DCF inverso es la clave: para justificar 718,67 USD hace falta que los ingresos crezcan un 16,5 % anual en 2027-2035 (frente al 9,8 % de nuestro base) o un margen EBITDA del 68,6 % (frente al 52 %), y la rentabilidad implícita en el precio es del 8,5 %, por debajo del 11,1 % de nuestro WACC y del 10,1 % que pide el mercado. Es exigente: Meta creció un 14 % anual en 2021-2025, antes de multiplicar por cuatro su inversión. El precio descuenta que la inversión en IA rendirá como la de la década pasada.',

  narrativas: {
    Bajista: 'La publicidad se frena como en 2022 (aranceles a los exportadores chinos, recesión) y la IA no monetiza: crecimiento de 4 puntos menos al año y margen EBITDA 4 puntos más bajo, con la amortización de la inversión ya comprometida. Ya pasó en 2022: ingresos −1 % y margen EBIT del 24,8 %.',
    Base: 'Los ingresos crecen un 24,5 % en 2026 y se desaceleran hasta el 5 % en 2035; el capex llega a su pico en 2027 y se normaliza desde 2028, y el margen EBITDA vuelve al 52 %.',
    Alcista: 'Muse se convierte en una superficie publicitaria y de suscripción desde 2027 y la IA sigue elevando el precio por anuncio: 3 puntos más de crecimiento y 2 de margen al año.',
  },
  escenarios_comentario: 'La asimetría del DCF es mala: el alcista (586,56 USD) también queda un 18,4 % por debajo del precio y el bajista (252,45 USD) un 64,9 %. A 12 meses, con nuestro BPA y la regla de múltiplos, el cuadro es menos extremo: bajista 328,46 USD (−54 %), base 751,29 USD (+4,8 %) y alcista 851,78 USD (+18,8 %), con una asimetría de 0,34 veces. El bajista es verosímil: en 2022 los ingresos cayeron un 1 % y la acción un 64 %. No compensa el riesgo.',
  suma_partes_comentario: 'No aplica: Reality Labs (2.146 M de ingresos y −17.729 M de resultado en 2024) no tiene comparables cotizados con múltiplo útil y su valor de mercado separado sería, en el mejor caso, pequeño frente a la familia de apps; sus pérdidas ya restan en el DCF del grupo.',
  valoracion_comentario: 'Pesos: DCF 40 %, comparables 30 % y escenarios 30 %; sin transacciones (no hay compras comparables para una empresa de 1,8 billones) ni suma de partes. El DCF pesa más porque la cuestión de Meta es de caja: el beneficio contable de 2026-2028 es muy superior a la caja libre, y los múltiplos de beneficio lo ignoran. La dispersión es enorme: los comparables por PER dan 759,21 USD (+5,6 %) y el DCF 434,41 USD (−39,6 %). La diferencia no es Meta, sino el método: el sector entero cotiza a múltiplos que solo se justifican con un WACC del 8,5 % o con crecimientos del 16 % durante una década. El valor objetivo de la síntesis es de 529,62 USD (−26,3 %).',

  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 23.63, multiplo: null, precio: null, justificacion: 'Ventas de 311.002 M (4 puntos menos de crecimiento en 2027-28) y margen EBITDA del 44 %; la amortización (60.070 M) no baja porque es de inversión ya hecha: EBIT de 76.771 M, 5.500 M de gasto financiero neto por la deuda nueva, impuesto del 15 % y 2.564 M de acciones.' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 31.70, multiplo: null, precio: null, justificacion: 'Ventas de 333.720 M (+17 % en 2027 y +14 % en 2028) y margen EBITDA del 48 % con una amortización del 18 % de las ventas: EBIT de 100.116 M, 4.500 M de gasto financiero neto (la deuda neta sube con la caja libre negativa de 2026-2028), impuesto del 15 % y 2.564 M de acciones sin recompras no anunciadas.' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 35.94, multiplo: null, precio: null, justificacion: 'Ventas de 351.285 M (+3 puntos al año) y margen EBITDA del 50 % con Muse monetizando desde 2027: EBIT de 112.412 M, 4.000 M de gasto financiero neto, impuesto del 15 %.' },
    ],
    per_historico: { actual: 26.0, mediana_5a: 23.69, minimo_5a: 13.94, media_larga: 21.91, excluidos: '2019 (31,8x): BPA hundido por la multa de 5.000 M de la FTC. PER de cierre con el BPA diluido de cada año y precios de Macrotrends: 2018 17,24x; 2020 26,95x; 2021 24,31x; 2022 13,94x; 2023 23,69x; 2024 24,52x; 2025 22,73x con el BPA normalizado (29,04 USD, sin el cargo fiscal de la ley OBBBA: tipo del 13 % según la empresa) [D11, D12, A2]. Actual = 718,67 ÷ 27,63 (nuestro BPA de 2027e).' },
    comparables_per: { mediana: 22.6 },
    consenso: { bpa_ano1: 29.79, bpa_ano2: 34.56, objetivo_medio: 826.6, objetivo_min: 595, objetivo_max: 1000, analistas: 63, tendencia_3m: 'subidas', fuente: 'Tickflow, MarketBeat y 24/7 Wall St. [D4, D6, D10]' },
    diferencia_consenso: 'Nuestro BPA de 2028e (31,70 USD) queda un 21 % por debajo del 40,03 de Eulerpool (dato probablemente anterior al 2T26) y el de 2027e (27,63) un 20 % por debajo del consenso de 34,56 [D4, D5]. La diferencia no está en las ventas (292.737 M en 2027e frente a 296.670 M) sino en los gastos: suponemos 206.400 M de gastos en 2027, entre los 202.000 M del consenso y los 210.000-215.000 M de Wells Fargo [D3], porque la amortización de un capex de 130.000-176.000 M al año sube al 16,5-18 % de las ventas, y añadimos el coste de la deuda nueva. El objetivo medio de los analistas (826,60 USD) queda un 9,1 % por encima de nuestro objetivo base y por debajo de nuestro alcista (851,78 USD).',
    media: null,
    comentario: 'El objetivo a 12 meses (670,71 USD ponderado; 751,29 USD el base) queda muy por encima del valor intrínseco (529,62 USD): el mercado pagará en un año por el beneficio contable de 2028, que la amortización todavía no castiga del todo, mientras el DCF descuenta la caja que se va en centros de datos. Cerrar esa distancia exige que la inversión de 2027 se contenga y que Muse empiece a facturar; la primera prueba es la guía del 28 de octubre. La distancia entre el objetivo base y el valor intrínseco pasa del 25 %: la tesis de valor es a más de un año.',
  },

  catalizadores: {
    items: [
      { fecha: '28-oct-2026', evento: 'Resultados del 3T26 y primera indicación de capex y gastos de 2027', efecto: 'Una guía de capex de 2027 por encima de 175.000 M confirmaría nuestro bajo BPA; una contención lo subiría', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Ene-2027', evento: 'Resultados del 4T26 y guía formal de 2027', efecto: 'Fija el BPA de 2027, base del múltiplo a 12 meses', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Versión de pago o publicidad dentro de Muse', efecto: 'Primer ingreso de la IA conversacional; Jefferies estima 10.800 M anuales con 1.000 M de usuarios y un 3 % de pago [D2]', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Recursos de los veredictos por daños a menores y nuevos juicios', efecto: 'Más cargos legales (2.400 M en el 2T26)', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027', evento: 'Nuevas emisiones de bonos para financiar la inversión', efecto: 'Deuda neta al alza y más gasto financiero', probabilidad: 'Alta', sentido: '−' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'La inversión en IA no rinde: capacidad sobredimensionada', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 % (escenario bajista)', mitigante: 'La IA ya mejora la conversión de los anuncios (+12 % de precio)', senal: 'Capex de 2027 por encima de 190.000 M sin aceleración de ingresos' },
      { riesgo: 'Ciclo publicitario: recesión o aranceles a anunciantes chinos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % a −50 % (precedente de 2022)', mitigante: 'Millones de anunciantes y subasta flexible', senal: 'Crecimiento de ingresos por debajo del 15 % en un trimestre' },
      { riesgo: 'Regulación y litigios por menores', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Recursos en curso; importes aún pequeños frente al beneficio', senal: 'Cargos legales trimestrales por encima de 3.000 M o restricciones de edad en EE. UU.' },
      { riesgo: 'Competencia de los asistentes de IA por el tiempo de uso', tipo: 'Competitivo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 %', mitigante: 'Muse y la escala de usuarios', senal: 'Caída del tiempo de uso o de las personas activas diarias' },
      { riesgo: 'Amortización y vida útil de servidores', tipo: 'Contable', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'La caja no cambia', senal: 'Acortamiento de la vida útil o deterioros de centros de datos' },
      { riesgo: 'Control del fundador (60,8 % del voto)', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Descuento de múltiplo', mitigante: 'Consejo mayoritariamente independiente', senal: 'Nuevas apuestas a fondo perdido como Reality Labs' },
      { riesgo: 'Deuda y financiación fuera de balance', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Calificación crediticia alta y beneficio de 60.000 M', senal: 'Deuda neta por encima de 1 vez el EBITDA' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Meta gastó más de 500.000 M en centros de datos en 2026-2028 convencida de que la demanda de cómputo no tenía techo. Muse tuvo cientos de millones de usuarios, pero gratis: los anuncios dentro de las conversaciones no cuajaron y la suscripción se quedó en un nicho, como los cascos de Reality Labs. En 2027 los aranceles y una recesión suave frenaron a los anunciantes chinos y el crecimiento bajó al 8 %, mientras la amortización subía al 20 % de las ventas: el BPA de 2028 se quedó en 22 USD y el mercado, que pagaba 26 veces, volvió a las 14-15 veces de 2022. La deuda neta superó los 100.000 M y las recompras desaparecieron. Las señales estaban a la vista en octubre de 2026: la guía de capex subía en cada trimestre, la caja libre del 2T26 era de 784 M y la propia directora financiera admitía que la empresa subestimaba sus necesidades de cómputo. El indicador que lo habría anticipado: el capex de 2027 por encima de 190.000 M sin una aceleración visible de los ingresos.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Capex 2027', pregunta: '¿Cuál es el rango de inversión de 2027 y qué retorno mínimo exige el consejo a cada centro de datos?', por_que: 'Es la variable que más mueve nuestro BPA de 2028e.' },
      { tema: 'Monetización de Muse', pregunta: '¿Cuándo habrá publicidad o suscripción de pago en Muse y con qué métrica se medirá?', por_que: 'Separa nuestro caso base del alcista.' },
      { tema: 'Amortización', pregunta: '¿Qué vida útil se aplica a los servidores de IA y qué impacto tendría reducirla a 4 años?', por_que: 'Una vida más corta bajaría el BPA de forma material.' },
      { tema: 'Hyperion', pregunta: '¿Cuál es la obligación máxima de Meta por la garantía de valor residual de Hyperion y otros vehículos?', por_que: 'Es deuda económica fuera del puente.' },
      { tema: 'Recompras', pregunta: '¿Cuándo volverán las recompras y qué apalancamiento máximo acepta la empresa?', por_que: 'Las acciones dejaron de bajar; afecta al BPA por acción.' },
      { tema: 'Litigios', pregunta: '¿Qué provisión total hay para las demandas por menores y cuántos juicios hay fijados en 2027?', por_que: 'Los cargos legales ya suman 2.400 M en un trimestre.' },
    ],
    confianza: 'Media',
  },

  rentabilidad_comentario: 'Meta crea mucho valor: ROIC del 35,7 % en 2025 frente a un WACC del 11,06 %, 24,6 puntos por encima, y entre el 27 % y el 51 % desde 2021. El ROIC lo mueve el margen (beneficio neto del 30 % de las ventas) más que la rotación (0,63 veces el capital), que baja año tras año porque el inmovilizado crece más deprisa que las ventas: de 57.809 M en 2021 a 196.804 M en 2025. El ROIC incremental histórico (22,6 %) es bueno pero inferior al medio: el capital nuevo rinde menos que el antiguo. Con un capex de 130.000-145.000 M en 2026 el capital invertido se duplicará en dos años, y el ROIC caerá hacia el 20-25 % hasta que los ingresos de la IA lleguen. Alphabet tiene un ROIC parecido (30 %) y Amazon y Oracle en torno al 12 % [D16].',

  fuentes: [],
  huecos: [
    { seccion: 'valoracion', campo: 'arrendamientos financieros y vehículos fuera de balance (Hyperion)', tipo: 'Complemento', intentos: '1) 10-Q del 2T26, nota de arrendamientos (no abre); 2) búsqueda de la estructura de Hyperion con Blue Owl (sin cifras de garantía); 3) prensa sobre la deuda privada de 27.000 M (no confirma la obligación de Meta)', decision: 'Omitido' },
  ],
};
