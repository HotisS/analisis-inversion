// Textos del analista (Betsson AB, corte 2026-10-12). Citas: [A1] = fuente 1 de A.json; [P1] = fuente propia.

export const limitaciones = `Betsson publica en EUR y cotiza en SEK (Nasdaq Stockholm, solo la clase B, ISIN SE0022726485); todas las cifras van en millones de EUR. El precio es el cierre del viernes 9-oct-2026 (95,65 SEK): a la hora de corte del lunes 12-oct la sesión de Estocolmo no había cerrado. Conversión con el tipo del BCE del 9-oct-2026 (11,1675 SEK por EUR; el del 12-oct no estaba publicado) [D2]. Las acciones A (10 votos, no cotizan) se valoran al precio de la B; las C están todas en autocartera: 135,305 M de acciones en circulación. Hasta 2021 Betsson publicaba en SEK: la serie en EUR empieza en 2021 (cinco ejercicios). El LTM a jun-26 es la suma de los cuatro últimos trimestres. El consenso de MarketScreener viene en SEK y se pasa a EUR con el tipo implícito del proveedor (10,6216), que reproduce las cifras en EUR de Stock Analysis. La beta se calcula con la acción convertida a EUR frente al STOXX Europe 600 (la de la acción en SEK frente al OMXSPI, 0,17, no es utilizable). Rentabilidades de bolsa de precio, sin dividendos.`;

export const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El 11,2 % de 2023 es anterior al impuesto mínimo global (Pilar 2), que desde 2024 lleva el tipo al 21-23 %; el DCF usa el 23 %.' },
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'R² de 0,01: en el juego online el múltiplo lo explica el riesgo regulatorio y la deuda, no el crecimiento; no se usa el valor de la regresión.' },
  { control: 'Múltiplos LTM y NTM de cada comparable', explicacion: 'Playtech pasa de 5,6x a 4,2x por la venta de Snaitech y el cambio de perímetro; su peso en la mediana es pequeño y quitarla no la mueve.' },
];

export const parches = [
  { ruta: 'identificacion.fundacion', valor: '1963' },
];

export const huecos_resueltos = [];

export const fuentes = [
  { id: 1, titulo: "Brazil's president bans online betting less than two years after launch and nine days before election", editor: 'CDC Gaming Reports', tipo: 'Prensa', fecha: '2026-09-26', url: 'https://cdcgaming.com/brazils-president-bans-online-betting-less-than-two-years-after-launch-and-nine-days-before-election/' },
  { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
];

export const huecos = [];

export const sostenibilidad_comentarios = {
  '2026e': 'B2C +15 % en el 1S26 (clientes activos +32 % en el 2T26 con el Mundial) aporta unos 11 puntos, de los que 2 son precio y mezcla; las licencias B2B caen de 313 M a unos 198 M (−9,6 puntos) y Rhino suma unos 2,6 desde el 3-ago [A1, D10].',
  '2027e': 'Rhino el año completo (+2 puntos), B2B estable en unos 50 M por trimestre y B2C al 4-5 %: por debajo del 6,4 % del consenso [A1, D6].',
  '2028e': 'Finlandia abre su mercado con licencias el 1-jul-2027 (Betsson ya la pidió) y Latinoamérica sigue creciendo; el precio sube poco porque los impuestos al juego se lo comen [B2].',
  '2029e': 'Crecimiento por volumen en mercados regulados, en línea con el 6,9 % anual previsto para el online europeo y por debajo de él [B8].',
  '2030e': 'Convergencia al crecimiento del mercado maduro; sin compras nuevas.',
};

export const sostenibilidad_justificacion = `**En parte.** El volumen está demostrado: los clientes activos subieron un 32 % en el 2T26 y Latinoamérica es ya la primera región, con licencias locales en 23 países [A1, B1]. Lo que no está demostrado es el poder de precios: cada mercado que se regula sube los impuestos al juego (del 12,8 % al 15,5 % de los ingresos en 2025 y al 19,6 % en el 2T26) y el margen EBITDA ha caído de 28,5 % a 18,2 % en el 1S26 [A4, A1]. La proyección necesita poca inversión (reinversión del 9 % del beneficio operativo, con un ROIC del 26,2 %), pierde algo de cuota (del 1,6 % al 1,5 % en 2030e) y no exige que el B2B recupere al cliente perdido. Por eso el caso base crece un 4,5 % anual, por debajo del 6,4 % del consenso para 2027e y del 6,9 % del mercado europeo, y el margen solo se recupera hasta el 21 % (por debajo del 26 % de 2025).`;

export const dcf_justificacion = {
  crecimiento: `2026e (+4,0 %, año fijo) sale del 1S26 real (595,5 M, plano) y de un 2S26 con el B2C al ritmo del 1S26 (+15 %), el B2B en el nivel del 1S26 (unos 49-51 M por trimestre) y Rhino desde el 3-ago [A1, D10]: 1.245 M, un 3,1 % por debajo del consenso (1.284 M) [D6]. 2027e-2030e crecen un 6,0-4,5 % (Rhino el año completo, Finlandia desde jul-2027, Latinoamérica), frente al 6,4 % y 5,6 % del consenso para 2027e y 2028e y al 6,9 % del online europeo [B8]. 2031e-2032e convergen al 2,5 %. Betsson creció un 16,1 % anual en 2021-2025, pero con el B2B y con mercados sin impuesto local: esa base ya no está.`,
  margenes: `El margen EBITDA cae del 26,2 % (2025) al 19,0 % en 2026e por tres causas: el B2B de alto margen pierde unos 115 M de ingresos, los impuestos al juego suben al 19,6 % de los ingresos en el 2T26 y los mercados B2C aún sin beneficio restan 10-15 M de EBIT por trimestre [A1, A2, A4]. La recuperación hasta el 21,0 % en 2030e supone que esos mercados llegan al equilibrio (3-5 puntos de margen) y que Rhino aporta 13,7 M de EBITDA [A2]. Queda 5 puntos por debajo del margen de 2024-2025 y en línea con el consenso (19,4 % en 2027e y 19,7 % en 2028e) [D6], por debajo de Entain (22,1 %) y FDJ United (24,5 %) [D16, D20].`,
  inversion: `El capex del 5,8 % de las ventas incluye el desarrollo capitalizado (41,6 M en 2025, el 3,5 % de las ventas) y el resto de inmovilizado, y le suma los pagos de arrendamiento (8,3 M, 0,7 %) para que el DCF pague las oficinas (NIIF 16) [A4]. Baja al 5,4 % en 2032e, por encima de la amortización (5,2 %). El circulante comercial se fija en el 16 % de las ventas, el de 2025 (22 % en 2024): incluye los cobros pendientes de proveedores de pago. Los saldos de clientes (54,4 M) no van en el circulante sino en el puente, como deuda [A1]. La compra de Rhino (64,5 M) se resta en el puente y su EBITDA se suma desde 2026e [D10].`,
  wacc: `Tasa libre: Bund a 10 años del 3,53 % (9-oct-2026) [D4], porque los flujos van en EUR. Beta de 0,87: la ajustada semanal a 5 años con la acción convertida a EUR frente al STOXX Europe 600 [D1]; la de la acción en SEK frente al OMXSPI (0,17) sale artificialmente baja, como pasó con CSL. Prima de mercado del 5,5 % y prima adicional del 2,0 % por el riesgo regulatorio y de país: un 24 % de los ingresos viene de mercados sin licencia local y el 27 % de Latinoamérica, donde Brasil prohibió las apuestas online el 25-sep-2026 [A1, P1]. Coste de la deuda del 5,5 % (EURIBOR más 2,75-3,25 % de los bonos) y peso del 13 % a valor de mercado. WACC resultante: 9,52 %.`,
  terminal: `Media de dos métodos: Gordon con un crecimiento del 2,0 % (inflación de la zona euro, por debajo del Bund menos medio punto) y un múltiplo de salida de 6,5x el EBITDA, la mediana de los comparables a 12 meses (6,4x) [D6-D27]. Gordon implica 7,5x, por encima de los 4,9-5,7x a los que ha cotizado Betsson en cinco años; promediar con el múltiplo modera esa exigencia. El valor terminal pesa un 65 % del valor.`,
};

export const dcf_lectura = `El DCF da **14,93 EUR por acción** (166,7 SEK), un 74,3 % sobre el precio de 8,565 EUR (95,65 SEK), con un WACC del 9,52 % y un valor terminal que pesa el 65 %. Es el resultado de un negocio que genera 125-190 M de flujo libre al año sin apenas inversión y que cotiza a 4,7 veces el EBITDA de los últimos 12 meses.

**Lo que descuenta el precio es una contracción**: el DCF inverso pide que los ingresos caigan un 9,1 % anual en 2027e-2032e (frente al +4,5 % de nuestro caso base) o que el margen EBITDA baje al 14,3 % (frente al 21,0 %); dicho de otro modo, al precio actual la acción rinde un 17,6 % anual si se cumplen nuestras cifras, frente a un WACC del 9,52 %. Nuestra proyección está un 3 % por debajo del consenso en ventas y EBITDA [D6]: la distancia no viene de ser más optimistas que los analistas, sino de que el mercado pone a Betsson una tasa de descuento de casi el doble.

¿Es razonable? En parte. Betsson ha cotizado a 4,9-5,7 veces el EBITDA en los cinco últimos cierres de ejercicio, así que el mercado lleva años aplicándole este descuento por el riesgo de los mercados no regulados, y nada garantiza que lo retire. Pero ese descuento se fijó cuando el 36-46 % de los ingresos venía de mercados con licencia local; hoy es el 76 % [B5]. El riesgo que justificaba el múltiplo ha bajado, aunque a costa del margen.`;

export const narrativas = {
  Bajista: 'Se repite lo del cliente B2B en el negocio que queda sin licencia local: un país de CEECA o de Latinoamérica bloquea o prohíbe (como Brasil el 25-sep-2026) y los ingresos caen un 22 % en 2027e, con un margen 6 puntos más bajo; después la empresa crece 1,5 puntos menos y con 4 puntos menos de margen, y el mercado le exige un punto más de WACC.',
  Base: 'El B2B se queda en unos 50 M por trimestre, el B2C sigue creciendo en mercados regulados (Latinoamérica, Finlandia desde 2027, Canadá con Rhino) y los mercados aún sin beneficio llegan al equilibrio: ingresos +4,5 % anual y margen EBITDA del 19 % al 21 %.',
  Alcista: 'El B2C mantiene un crecimiento de dos cifras con Latinoamérica y Canadá, el B2B vuelve a crecer con clientes nuevos y los mercados recién regulados maduran antes: 1,5 puntos más de crecimiento y 2 puntos más de margen (21-23 %, aún por debajo del 26 % de 2025).',
};

export const escenarios_comentario = `La asimetría es favorable: el alcista vale 17,91 EUR (+109,1 %) y el bajista 7,07 EUR (−17,5 %), una relación de 6,23 veces. El bajista no es cosmético: supone perder en un año un 22 % de los ingresos, más o menos lo que todavía viene de mercados sin licencia local (24 %), y aun así pierde menos del 20 % porque el precio ya descuenta una contracción. La pérdida es acotada porque Betsson tiene caja neta (deuda neta ajustada de 6 M) y reparte un 7,7 % de dividendo. Lo que no recoge ningún escenario es una pérdida de licencias en varios mercados a la vez con multas o litigios de jugadores, que dejaría el valor por debajo del bajista.`;

export const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %. El DCF es el método más fiable porque Betsson apenas necesita inversión y su flujo libre es estable (conversión del 103 % en 2021-2025); los escenarios recogen el riesgo regulatorio, que es el que explica el descuento. Los comparables pesan menos: la mediana de 6,4x el EBITDA a 12 meses viene de empresas con deuda neta de 2-4 veces el EBITDA y otros riesgos (Entain, Evoke, Flutter), y la regresión con el crecimiento no explica nada (R² de 0,01). Las transacciones no pesan: la mediana de 9,0x incluye prima de control y Betsson está controlada por las familias de las acciones A, que no han mostrado intención de vender. Todos los métodos quedan por encima del precio: el más bajo, el bajista (7,07 EUR), está un 17,5 % por debajo; los comparables dan 12,32 EUR y el DCF con la prima implícita del mercado (4,20 % [P2]) más que el nuestro.`;

export const secciones = {
  rentabilidad: {
    comentario: `Betsson crea valor con holgura: el ROIC pasó del 18,5 % en 2021 al 28,7 % en 2023 y se queda en el 26,2 % en 2025, siempre muy por encima del WACC del 9,52 %. Lo mueve el margen, no la rotación (0,73-0,89 veces): el capital invertido es sobre todo fondo de comercio y marcas (659,6 M) de compras antiguas [A4]. El ROIC incremental de 2021-2025 es del 55,1 %, porque el crecimiento llegó sin apenas capital nuevo. Esa cifra ya no es la de hoy: con el EBIT de los últimos 12 meses (196,3 M) el ROIC baja a cerca del 20 % (estimación propia: 196,3 × 0,77 / 760). Sigue duplicando el de los competidores: Entain 11,0 %, Lottomatica 13,2 %, Kambi 9,5 % y FDJ United 4,0 % [D17, D19, D21, D27].`,
    confianza: 'Media',
  },
  multiplos_historicos: {
    comentario: `Betsson cotiza a 4,7 veces el EBITDA de los últimos 12 meses, por debajo del mínimo de los cinco últimos cierres (4,9x) y de su media (5,1x), y a 8,8 veces el beneficio, igual que su media. El PER no se abarata porque el beneficio ha caído con el precio (LTM 0,97 EUR por acción frente a 1,27 en 2025). El descuento estructural frente al sector (6,4x) es antiguo: se mantuvo cuando Betsson crecía un 17-22 % anual y tenía menos de la mitad de los ingresos en mercados regulados. Lo nuevo es que ahora el 76 % de los ingresos tiene licencia local [B5]: si el mercado premiara esa transición, el múltiplo histórico dejaría de ser la referencia.`,
  },
  comparables: {
    comentario: `Betsson es el comparable más barato de la tabla: 4,7x el EBITDA a 12 meses frente a una mediana de 6,4x y 8,3x el beneficio frente a 12,4x, con caja neta (−0,4 veces el EBITDA) mientras la mediana tiene deuda de 2,0 veces, y con el ROIC más alto después de Evolution (26,2 %). Ni el crecimiento ni el margen explican el descuento: crece más que la mediana y su margen EBITDA (21,8 %) está en la zona de Entain y Evoke. Lo explica el riesgo de sus mercados: un 24 % de los ingresos sin licencia local y la dependencia de un cliente B2B. A la mediana de EV/EBITDA a 12 meses valdría 11,81 EUR y a la del PER 12,82 EUR. Usamos la mediana, no la regresión, y le damos un peso del 20 % porque los comparables cargan con deudas y riesgos distintos.`,
  },
  transacciones: {
    comentario: `Las cuatro operaciones leídas pagaron 8,7-10,9 veces el EBITDA (mediana 9,0x): FDJ por Kindred (10,9x y prima del 24,4 %), Flutter por Snaitech (9,0x) y Lottomatica por SKS365 (8,7x) [D28, D31, D32]; MGM pagó una prima del 44,1 % por LeoVegas [D30]. Aplicadas a Betsson darían 16,84 EUR, el doble del precio. No las ponderamos: las acciones A (56 % de los votos con el 11 % del capital) están en manos de las familias fundadoras, y una opa necesita su acuerdo [C1]. Sí indican que el sector paga por plataformas con licencias en Europa y Latinoamérica bastante más que lo que la bolsa da hoy a Betsson.`,
  },
  catalizadores: {
    items: [
      { fecha: '22-oct-2026', evento: 'Resultados del 3T26', efecto: 'Primer trimestre con Rhino y tras el Mundial; prueba del margen (2S26 de nuestro caso: 20,4 %) y del B2B (≈49 M)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '25-oct-2026', evento: 'Revocación de las autorizaciones de juego online en Brasil', efecto: 'Fin de la operación brasileña, recién lanzada (13 empleados en 2025); el Congreso tiene 120 días para ratificar la medida [P1, A4]', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'Nov-2026', evento: 'Segundo pago del dividendo (0,33 EUR por acción)', efecto: 'Rentabilidad por dividendo del 7,7 %; posible nuevo programa de recompras, que pide el foro [A1]', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Feb-2027', evento: 'Resultados del 4T26 y propuesta de dividendo', efecto: 'Primer año completo con el B2B estabilizado; el dividendo sigue la política de hasta el 50 % del beneficio [C1]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '1-jul-2027', evento: 'Apertura del mercado finlandés con licencias', efecto: 'Betsson ya pidió licencia; mercado nuevo en una región tradicional [B2]', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Sep-2027', evento: 'Vencimiento del bono 2024/2027 (99,4 M)', efecto: 'Refinanciación o pago con caja (310 M a jun-26) y la nueva línea de 75 M [A1]', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Cierre o bloqueo de mercados sin licencia local (24 % de los ingresos)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−53 % sobre el valor base (escenario bajista: 7,07 EUR)', mitigante: 'La empresa lleva tres años migrando a licencias locales (del 36 % al 76 % de los ingresos) [B5]', senal: 'Caída de ingresos en CEECA (de 122 a 96 M entre el 1T25 y el 1T26) o salida anunciada de un país [C10]' },
      { riesgo: 'Nueva caída del gran cliente B2B (Realm Entertainment)', tipo: 'Concentración de clientes', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % por cada punto de margen perdido (sensibilidad del DCF: 13,97 EUR con −1 punto)', mitigante: 'La dirección dice que el cliente se estabilizó desde diciembre de 2025 [A2]', senal: 'Licencias B2B por debajo de 45 M en un trimestre' },
      { riesgo: 'Subidas de impuestos al juego (Colombia, Brasil, Perú, Reino Unido)', tipo: 'Fiscal', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−6 % por punto de margen EBITDA', mitigante: 'Repercusión parcial en bonos y promociones', senal: 'Impuestos al juego por encima del 20 % de los ingresos' },
      { riesgo: 'Prohibiciones en Latinoamérica (Brasil, 25-sep-2026)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Brasil es pequeño; un caso similar en Argentina, Perú o Colombia restaría ≈10-15 % del valor (estimación propia por peso de la región, 27 %)', mitigante: 'Licencias por provincia en Argentina y licencia en Perú y Colombia [B2]', senal: 'Proyectos de ley de prohibición o impuestos sobre depósitos' },
      { riesgo: 'Mercados B2C sin beneficio que no maduran', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % (un punto menos de margen en toda la proyección)', mitigante: 'La empresa cuantifica la pérdida (10-15 M de EBIT por trimestre) y puede salir de mercados [A2]', senal: 'Margen EBIT trimestral por debajo del 13 %' },
      { riesgo: 'Asignación de capital decidida por las acciones A', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Hasta −10 % si se pagan compras caras con la caja', mitigante: 'Compras recientes baratas (Rhino a 4,7x el EBITDA) y dividendo del 50 % del beneficio [A4, C1]', senal: 'Una compra a más de 10 veces el EBITDA' },
      { riesgo: 'Litigios de jugadores en Austria y Alemania por juego previo a la regulación', tipo: 'Legal', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'No cuantificable: sin provisión específica [A4]', mitigante: 'Los tribunales malteses se niegan a ejecutar las sentencias', senal: 'Decisión europea contra Malta en el expediente de 2025' },
    ],
    premortem: `Es octubre de 2029 y la acción ha perdido un 40 %. La historia más probable empieza en 2027: tras Brasil, otro país latinoamericano y uno de Asia central que Betsson atendía con licencia de Malta endurecen la persecución del juego sin licencia local. Betsson pierde en dos años la mayor parte del 24 % de ingresos que aún no tenía licencia local, justo el más rentable, porque no paga impuestos de juego del país. A la vez, el gran cliente B2B vuelve a recortar, porque atiende el mismo tipo de mercado. El margen EBITDA cae por debajo del 15 % y el beneficio por acción a 0,6 EUR; el dividendo se reduce a la mitad y el mercado, que valoraba a Betsson por su rentabilidad por dividendo, castiga el recorte. Las familias de las acciones A no venden y la caja se gasta en compras de mercados regulados de bajo margen. Las señales que lo habrían anticipado: los ingresos de CEECA, que ya cayeron de 122 a 96 M entre el 1T25 y el 1T26 [C10]; las licencias B2B por debajo de 45 M; y los impuestos al juego por encima del 20 % de los ingresos.`,
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Mercados sin licencia local', pregunta: '¿Qué ingresos y qué margen EBITDA tiene el 24 % de los ingresos que viene de mercados sin licencia local, y en qué países está?', por_que: 'Es el riesgo que explica el descuento: el escenario bajista depende de su tamaño y de su margen.' },
      { tema: 'Cliente B2B', pregunta: '¿Qué peso tiene Realm Entertainment en las licencias B2B, en qué mercados opera y qué cláusulas de duración tiene el contrato?', por_que: 'Las licencias B2B cayeron de 90,2 M a 49,1 M por trimestre sin explicación del cliente [A1].' },
      { tema: 'Mercados B2C con pérdidas', pregunta: '¿Qué mercados restan los 10-15 M de EBIT por trimestre y en qué plazo esperan el equilibrio?', por_que: 'La recuperación del margen hasta el 21 % de nuestro caso base depende de ello [A2].' },
      { tema: 'Brasil y Latinoamérica', pregunta: '¿Qué ingresos tenía Brasil en el 3T26 y qué riesgo ven de medidas similares en Perú, Colombia o Argentina?', por_que: 'Latinoamérica es ya la primera región (27 % de los ingresos de 2025) [A4, P1].' },
      { tema: 'Rhino', pregunta: '¿Qué ingresos y margen aporta Rhino y cuánto falta por pagar?', por_que: 'La compra se cerró el 3-ago-2026 y su EBITDA pro forma (13,7 M) está en nuestro 2026e y 2027e [D10, A2].' },
      { tema: 'Caja y fondos de clientes', pregunta: '¿Qué parte de los 310 M de caja está inmovilizada por exigencias de las licencias, además de los 54,4 M de saldos de clientes?', por_que: 'Decide cuánta caja hay para recompras y para el bono de 2027 [A1].' },
      { tema: 'Remuneración al accionista', pregunta: '¿Habrá un nuevo programa de recompras con la acción a 4,7x el EBITDA?', por_que: 'Una recompra a estos precios crea más valor que una compra de un operador regulado.' },
    ],
    confianza: 'Media',
  },
};

export const resumen_textos = {
  sintesis: `**La recomendación y por qué.** Comprar, con convicción media. Valor objetivo de 13,76 EUR (153,7 SEK) frente a un precio de 8,565 EUR (95,65 SEK, cierre del 9-oct): un 60,7 % de potencial y una rentabilidad total esperada del 68,4 % a 12 meses con el dividendo (7,7 %). El alcista gana un 109,1 % y el bajista pierde un 17,5 %: asimetría de 6,23 veces. La razón: al precio actual el mercado descuenta que los ingresos caigan un 9,1 % al año, cuando nuestra proyección los hace crecer un 4,5 %. El motor sugiere convicción alta; la bajamos a media porque Betsson ha cotizado a 4,9-5,7 veces el EBITDA durante cinco años, porque nuestras cifras son las del consenso (la diferencia está en la tasa de descuento: 17,6 % implícita frente a un WACC del 9,52 %) y porque el riesgo regulatorio es binario, como acaba de demostrar Brasil [P1]. Subiría a alta si el 3T26 (22-oct) confirma un margen EBITDA del 20 % o más con el B2B estable; bajaría si las licencias B2B caen de 45 M.

**El negocio.** ROIC del 26,2 % frente a un WACC del 9,52 %, con caja neta. Está a mitad de una transición cara: el 76 % de los ingresos tiene ya licencia local (36 % en 2T23), lo que reduce el riesgo pero sube los impuestos al juego hasta el 19,6 % de los ingresos, y el gran cliente B2B ha llevado sus licencias de 90,2 M a 49,1 M por trimestre [B5, A1]. El margen EBITDA ha bajado del 26,2 % de 2025 al 18,2 % del 1S26. La calidad del crecimiento sostiene la proyección **solo en parte**: el volumen está demostrado (clientes activos +32 % en el 2T26), el poder de precios no, y por eso proyectamos un 4,5 % anual y un margen del 21 % en 2030e, por debajo del consenso y del mercado.

**Finanzas.** Flujo libre de 142,7 M en 2025 y una conversión del 103 % del beneficio en 2021-2025. La caja de 310 M incluye 54,4 M de saldos de clientes, que tratamos como deuda; con ellos y la compra de Rhino (64,5 M, cerrada el 3-ago), la deuda neta ajustada es de 6 M [A1, D10]. Altman, Piotroski y Beneish no dan alarma.

**Equipo y gobierno.** Las familias fundadoras controlan el 56 % de los votos con el 11 % del capital mediante las acciones A y designan la comisión de nombramientos [C1]. Resta en una opa; los directivos solo compraron en 12 meses (≈1,9 M EUR, el CEO 85.000 acciones a 99 SEK en marzo) [C8] y el voto en contra de la remuneración es mínimo.

**Valoración.** DCF 14,93 EUR, comparables 12,32 EUR (mediana de 6,4x el EBITDA a 12 meses frente a 4,7x de Betsson), escenarios 13,32 EUR; las transacciones (16,84 EUR) no pesan porque el control impide una opa sin acuerdo de las familias. Los tres analistas dicen «mantener» con objetivo de 95 SEK [D7].

**Riesgos y catalizadores.** El mayor riesgo es perder en poco tiempo el 24 % de ingresos sin licencia local, el de más margen: es nuestro bajista (−17,5 %). Después, una nueva caída del cliente B2B y las subidas de impuestos: cada punto de margen resta un 6 % del valor. Catalizadores: el 3T26 el 22-oct, el segundo pago del dividendo en noviembre y la apertura de Finlandia en julio de 2027. El foro sueco es alcista mientras las posiciones cortas suben al 3,33 % [D13].

**Qué cambiaría la decisión.** La compra se mantiene mientras el precio siga por debajo de 13,55 EUR; por encima de 15,77 EUR venderíamos. Pasaríamos a Mantener si las licencias B2B bajan de 45 M en un trimestre, si el margen EBITDA del 2S26 queda por debajo del 17 % o si Betsson anuncia la salida de un mercado de CEECA de más del 5 % de los ingresos.`,
  tesis: `Betsson es un operador de casino y apuestas online con 1.197 M EUR de ingresos en 2025, licencias locales en 23 países y un ROIC del 26,2 % [A4, B1]. Convierte el beneficio en caja (103 % en 2021-2025), tiene caja neta y reparte la mitad del beneficio. En tres años ha pasado de facturar en su mayoría en mercados sin licencia local a tener el 76 % de los ingresos con licencia [B5].

El precio de 8,565 EUR descuenta lo contrario de lo que esperan los analistas: el DCF inverso pide que los ingresos caigan un 9,1 % al año o que el margen EBITDA baje al 14,3 %. Cotiza a 4,7 veces el EBITDA y 8,3 veces el beneficio a 12 meses, frente a medianas de 6,4x y 12,4x en el sector, con un 11,1 % de rentabilidad por flujo libre.

El mercado acierta en que el margen de 2023-2025 no vuelve: los impuestos de los mercados regulados y la pérdida del cliente B2B lo han bajado del 26 % al 18-19 %. Se equivoca, a nuestro juicio, en tratar el negocio como si se fuera a reducir: el B2C crece un 15 % y los ingresos sin licencia local han bajado del 64 % al 24 % del total. Para invertir hay que creer que el B2B no vuelve a caer y que el 24 % sin licencia no desaparece de golpe.`,
  vision_diferencial: {
    mercado_descuenta: 'Una contracción: ingresos −9,1 % al año en 2027e-2032e o un margen EBITDA del 14,3 %, y el mismo múltiplo de 4,7-5,7 veces el EBITDA que ha tenido Betsson en cinco años. Los tres analistas que la siguen recomiendan mantener con un objetivo de 95 SEK, igual al precio [D7].',
    nuestra_vision: 'Ingresos +4,5 % anual y margen del 19 % al 21 % en 2030e, un 3 % por debajo del consenso: no somos más optimistas que los analistas. La diferencia es que valoramos los flujos a un 9,52 % y el precio implica un 17,6 %.',
    por_que: 'El descuento se formó cuando la mitad o más de los ingresos venía de mercados sin licencia local; hoy es el 24 %. Si el 3T26 muestra el B2B estable y el margen recuperándose, el mercado tendrá que reconocer que el riesgo ha bajado, como lo hace ya con operadores regulados a 6-7 veces el EBITDA.',
  },
  a_favor: [
    '**Precio de contracción**: el DCF inverso pide una caída de ingresos del 9,1 % anual, frente a un B2C que crece un 15 %.',
    '**Caja y dividendo**: rentabilidad por flujo libre del 11,1 % y por dividendo del 7,7 %, con deuda neta ajustada de 6 M.',
    '**Riesgo regulatorio menor**: el 76 % de los ingresos ya tiene licencia local, frente al 36 % del 2T23 [B5].',
    '**ROIC del 26,2 %**, el doble que Entain o Lottomatica, sin apenas inversión.',
    '**Directivos compradores**: solo compras en 12 meses (≈1,9 M EUR), el CEO a 99 SEK [C8].',
  ],
  en_contra: [
    '**Margen en caída**: del 26,2 % en 2025 al 18,2 % en el 1S26, por impuestos al juego del 19,6 % de los ingresos [A1].',
    '**Cliente B2B**: las licencias B2B han caído de 90,2 M a 49,1 M por trimestre [A1].',
    '**24 % sin licencia local**, el negocio de más margen y el más expuesto a cierres; Brasil prohibió el juego online el 25-sep-2026 [P1].',
    '**Múltiplo históricamente bajo**: 4,9-5,7 veces el EBITDA en cinco años, sin señales de revalorización.',
    '**Control familiar**: las acciones A tienen el 56 % de los votos con el 11 % del capital [C1].',
  ],
  que_vigilar: 'La tesis depende de que el B2B se quede en unos 50 M por trimestre y de que el margen EBITDA vuelva al 20 % en el 2S26 con Rhino y el Mundial. La señal de que no se cumple: licencias B2B por debajo de 45 M o ingresos de CEECA cayendo otra vez a doble dígito, que indicarían que el negocio sin licencia local se está cerrando antes de lo previsto.',
  cambiaria_recomendacion: [
    'Licencias B2B por debajo de 45 M en un trimestre: pasaríamos a Mantener.',
    'Margen EBITDA del 2S26 por debajo del 17 %: revisaríamos el caso base a la baja y pasaríamos a Mantener.',
    'Salida o bloqueo de un mercado de más del 5 % de los ingresos: bajaríamos el caso base al bajista.',
    'Una compra a más de 10 veces el EBITDA pagada con la caja: bajaríamos la convicción.',
    'Precio por encima de 15,77 EUR (≈176 SEK): venderíamos.',
  ],
  kpis_seguimiento: [
    { kpi: 'Licencias B2B trimestrales', nivel_actual: '49,1 M (2T26)', umbral_alerta: '< 45 M', por_que: 'Mide la dependencia del gran cliente [A1].' },
    { kpi: 'Margen EBITDA trimestral', nivel_actual: '18,9 % (2T26)', umbral_alerta: '< 17 %', por_que: 'Nuestro caso pide 20,4 % en el 2S26.' },
    { kpi: 'Ingresos con licencia local', nivel_actual: '76 % (2T26)', umbral_alerta: 'Salto de más de 5 puntos sin crecimiento del total', por_que: 'Indicaría cierre de mercados no regulados [B5].' },
    { kpi: 'Impuestos al juego sobre ingresos', nivel_actual: '19,6 % (2T26)', umbral_alerta: '> 21 %', por_que: 'Cada punto resta casi un punto de margen [A1].' },
    { kpi: 'Posiciones cortas', nivel_actual: '3,33 % (7-oct-2026)', umbral_alerta: '> 5 %', por_que: 'Señal de que el mercado espera un mal trimestre [D13].' },
  ],
};
