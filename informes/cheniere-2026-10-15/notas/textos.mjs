// Textos del analista (Cheniere, corte 2026-10-15). Las cifras del motor se copian de calc tras el último cálculo.
// Citas: [A3] = fuente 3 de A.json, [B2] de B.json, [P1] fuente propia.
export default {
  fuentes: [
    { id: 1, titulo: 'Tipos de cambio de referencia del euro (USD 1,1195 el 14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
    { id: 2, titulo: 'Movimiento del precio de LNG a 15-oct-2026 (herramientas/movimiento.mjs: 1, 3, 6 y 12 meses, máximos y mínimos, media de 200 sesiones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/LNG/history' },
    { id: 3, titulo: 'Global energy stocks plunge as US-Iran ceasefire hits oil (Cheniere −6 % a −7 % en el día)', editor: 'GMA News (Reuters)', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.gmanetwork.com/news/money/economy/983156/global-energy-stocks-plunge-as-us-iran-ceasefire-hits-oil/story/' },
  ],
  limitaciones: 'Acciones ordinarias en el NYSE (LNG), única clase. Precio: cierre del 14-oct-2026 (279,69 USD), porque la sesión del 15-oct no había cerrado a la hora del análisis [D1]. Cuentas 2018-2025 del XBRL de la SEC comprobadas con el 10-K 2025 y las notas de resultados [A1, A2]. **El beneficio contable no sirve tal cual**: los contratos de compra de gas a largo plazo (IPM) se valoraban como derivados hasta 2026 y sus cambios de valor, sin caja, movían el beneficio miles de millones al año (+3.615 M USD en 2025, −2.509 M en el 1S26) [A3, A6]. Los tratamos como no recurrentes en el EBITDA y el BPA de la regla a 12 meses es el ajustado sin ellos (el que publica la empresa desde 2026; para 2018-2025 lo estimamos nosotros quitando el efecto después de impuestos y minoritarios, con un factor de 0,71 que cuadra con el ajustado del 1S25: 1.327 M frente a 1.292 M). El DCF es consolidado (100 % de Sabine Pass y Corpus Christi) y resta a precio de mercado el 51,4 % de Cheniere Partners en manos de terceros (15.490 M USD, a 62,26 USD por participación) [D7]. Deuda del puente: 24.257 M más 1.413 M de arrendamientos financieros de buques; los operativos quedan dentro del EBITDA (US GAAP) [D9]. El BPA anual de consenso de los proveedores gratuitos no está en la base ajustada y no se usa [D2]. Una acción cuesta 249,83 EUR al cambio del BCE del 14-oct [P1].',
  controles_explicados: [
    { control: 'EBITDA del consenso en la base de las cuentas', explicacion: 'No hay EBITDA de consenso: solo ingresos y la guía de la empresa (7.900-8.400 M de EBITDA ajustado en 2026, que suma los pagos en acciones). Los múltiplos de los próximos 12 meses quedan en n.d.' },
  ],
  huecos: [
    { seccion: 'objetivo_12m', campo: 'BPA ajustado histórico 2018-2025', tipo: 'Núcleo', intentos: '1) Notas de resultados (el ajustado solo existe desde 2026); 2) XBRL (solo GAAP, con los derivados); 3) cálculo propio: GAAP menos la variación de derivados × 0,71 (impuestos y minoritarios), comprobado con el 1S25', decision: 'Estimado y marcado como estimación' },
  ],
  per_historico: {
    base: 'adelantado', actual: 19.8, mediana_5a: 12.5, minimo_5a: 7.9, media_larga: 14.9,
    excluidos: 'Historia adelantada con BPA ajustado sin derivados (cierre de cada año ÷ BPA ajustado del año siguiente; estimación propia hasta 2025): 2017 26,4x; 2020 7,9x; 2022 8,5x; 2023 16,9x; 2024 17,1x; 2025 12,5x (con nuestro BPA de 2026e, 15,6). Fuera: 2018 (BPA de 2019 inflado por la reversión de la provisión de impuestos diferidos, −517 M de impuestos), 2019 (235x sobre un BPA de 2020 de 0,26) y 2021 (4,2x sobre el BPA extraordinario de 2022, con la crisis de Ucrania: atípico de beneficio). Actual: 279,69 ÷ 14,1 (nuestro BPA de 2027e) = 19,8x.',
    v2: { mediana_5a: 13.4, minimo_5a: 6.3, media_larga: 15.8, excluidos: 'Historia al cierre (precio ÷ BPA ajustado del mismo año): 2021 13,4x; 2022 6,3x; 2023 9,7x; 2024 21,2x; 2025 15,5x; fuera 2019-2020 (impuestos y BPA casi nulo). Media larga 2018-2025 sin esos dos años.' },
  },
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 11.4, multiplo: null, precio: null, justificacion: 'Ormuz y Ras Laffan se normalizan en 2027 y llega la ola de oferta (Golden Pass, Plaquemines, ampliación catarí): el margen de los volúmenes no contratados vuelve a casi cero. EBITDA ajustado de ≈6.700 M USD en 2028e (el nivel de 2025 con más volumen), amortización de 1.650 M, intereses de 1.050 M, minoritarios de 1.150 M, impuesto del 20 % y 189 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 14.4, multiplo: null, precio: null, justificacion: 'Volumen de 55-57 Mt con los trenes 8-9 entrando en el 2S28; el margen al contado se normaliza poco a poco (Catar tarda en reparar dos trenes): EBITDA ajustado de ≈7.500 M USD (frente a 8.150 M en 2026e y 6.943 M en 2025), minoritarios de 1.250 M, impuesto del 20 % y 189 M de acciones por la recompra de ≈3.000 M al año.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 18.2, multiplo: null, precio: null, justificacion: 'La crisis de oferta se alarga (Catar sin dos trenes hasta 2029) y la demanda eléctrica de los centros de datos y de Asia absorbe la nueva oferta: EBITDA ajustado de ≈8.600 M USD en 2028e, cerca del de 2026, con la misma recompra.' },
  ],
  media_12m: 251.1,
  diferencia_consenso: 'No hay un BPA anual de consenso fiable en la base de la empresa: Stock Analysis da 23,16 para 2026e y 20,80 para 2027e, cifras que no cuadran con el ajustado publicado (7,79 en el 1S26) ni con la guía, y el consenso trimestral del 3T26 es de 4,21-4,49 [D2, D8]. Nuestro BPA de 2026e (15,6) suma el 1S26 real y un 2S como el primero, en línea con la guía de flujo distribuible. El objetivo medio de 22 analistas (311,33 USD) queda un 33 % sobre nuestro objetivo ponderado (234,02) y un 20 % sobre el base (259,2): los analistas valoran por flujo distribuible por acción (≈30 USD en 2030, según la empresa, a 10-11 veces) y suponen las ampliaciones aprobadas; nosotros aplicamos al BPA el múltiplo de la regla común, que pesa la historia de la propia acción.',
  objetivo_comentario: 'El valor intrínseco (222,90 USD) queda un 5 % por debajo del objetivo ponderado a 12 meses (234,02) y los dos, por debajo del precio (279,69). Las dos lecturas coinciden: el precio descuenta que el margen extraordinario de 2026 (la guía de EBITDA ha subido un 16 % en el año por el cierre de Ormuz) dura, o que las ampliaciones de 40 Mtpa se aprueban y rinden como las anteriores. El bajista es muy duro (90,06 USD) porque el mínimo histórico del PER adelantado es de 7,9 veces; aunque lo suavizáramos al base × 0,8, la ponderada seguiría siendo negativa.',
  veredicto: 'Sí',
  secciones: {
    historia: {
      resumen: 'Cheniere nació en 1996 en Houston para importar gas natural licuado y construyó Sabine Pass como terminal de regasificación [B1]. El gas de esquisto dio la vuelta al negocio: en 2012 decidió convertir Sabine Pass en planta de licuefacción y en 2016 exportó el primer cargamento de EE. UU. desde los 48 estados continentales [B1]. Jack Fusco, consejero delegado desde 2016, pasó del modelo de promotor endeudado a uno de flujo de caja: Corpus Christi, contratos a 20 años, grado de inversión y, desde 2022, recompras. Las crisis de 2022 (Ucrania) y 2026 (Ormuz) han convertido el GNL estadounidense en la reserva de seguridad de Europa y Asia [B2, B4].',
      hitos: null,
    },
    negocio: {
      descripcion: 'Cheniere compra gas natural en EE. UU., lo enfría a −162 ºC para convertirlo en líquido (GNL) en sus dos plantas de la costa del golfo de México (Sabine Pass, en Luisiana, con más de 30 Mtpa, y Corpus Christi, en Texas, con más de 24 Mtpa) y lo vende a compañías eléctricas, gasistas y comercializadoras de Europa y Asia, que lo transportan en barco y lo vuelven a convertir en gas [A1, A3]. Es el mayor exportador de GNL de EE. UU. y uno de los tres mayores del mundo, con ≈55 Mtpa en operación, más de 6 Mtpa en construcción y más de 40 Mtpa en tramitación [A3].',
      como_gana_dinero: 'Cobra sobre todo una tarifa fija por licuar: los contratos a largo plazo (SPA) pagan el 115 % del precio del gas en Henry Hub más una cuota fija de 2,25-3,50 USD por MMBtu, se pague o no se cargue el barco [A1]. Así, ≈90 % de la producción está vendida hasta mediados de la década de 2030, con una vida media restante de 15 años [A1]. El resto (≈5-10 %) lo vende Cheniere Marketing al precio internacional: en 2026, con Ras Laffan parado, ese margen ha hecho subir la guía de EBITDA un 16 % [A3, B2]. Los ingresos siguen al precio del gas (pasa el coste), por eso el indicador es el EBITDA ajustado: 6.943 M USD en 2025 [A6].',
      clientes: 'Unos 30-40 compradores a largo plazo con buen crédito (eléctricas y gasistas europeas y asiáticas, petroleras integradas y comercializadoras); ninguno pesa el 10 % de los ingresos [A1]. Por sede del comprador: EE. UU. el 18,8 % (comercializadoras que revenden), Singapur el 10,8 %, Reino Unido el 8,4 % y el resto del mundo el 62 % [A1]. Contratos nuevos de 2025-2026: CPC (Taiwán, 1,2 Mtpa hasta 2050) y acuerdos IPM con productores como Canadian Natural [A1, A6].',
    },
    sector: {
      definicion: 'Mercado mundial de GNL: licuefacción y exportación por mar. Lo medimos en volumen con la previsión de WoodMac que cita el 10-K: demanda de ≈410 Mtpa en 2024 y 671 Mtpa en 2040 (+3,1 % anual), con una necesidad de ≈104 Mtpa de capacidad nueva más allá de lo que ya está en construcción [B1]. En valor, al precio medio de Cheniere (≈430 USD por tonelada), son ≈180.000 M USD hoy y ≈240.000 M en 2033.',
      drivers: [
        { driver: 'Seguridad energética de Europa (sin gas ruso) y crisis de Ormuz', efecto: '+', horizonte: 'Estructural', evidencia: 'Europa ha añadido más de 50 Mtpa de regasificación desde 2022; en la crisis de 2026 el GNL de EE. UU. llegó a ser el 64 % del que importa Europa [B1, B4].' },
        { driver: 'Demanda de Asia (China, India, sudeste asiático) y cambio de carbón a gas', efecto: '+', horizonte: 'Estructural', evidencia: 'India tiene 9.000 km de gasoductos en construcción; China invierte en toda la cadena del gas [B1].' },
        { driver: 'Demanda eléctrica de la IA y los centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Más consumo de gas para generar electricidad en EE. UU. y Asia; es un apoyo indirecto: sube algo el Henry Hub (que Cheniere repercute) y sostiene la demanda de contratos a 20 años.' },
        { driver: 'Ola de oferta nueva 2026-2029 (EE. UU. y Catar)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Golden Pass, Plaquemines, Corpus Christi Etapa 3 y la ampliación de North Field de Catar presionarán el margen al contado cuando se normalice Ormuz [B1, B3].' },
        { driver: 'Política energética y permisos en EE. UU. (FERC, DOE)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Las ampliaciones de Sabine Pass y Corpus Christi esperan permiso de la FERC y del DOE para exportar a países sin tratado de libre comercio [B7].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Una docena de proyectos estadounidenses, Catar y Australia compiten por contratos a largo plazo, sobre todo por precio por MMBtu [B1].' },
        { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Compradores grandes, pero firmados a 20 años con pago aunque no carguen [A1].' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El gas se compra a muchos productores y se repercute (115 % de Henry Hub); Bechtel construye casi todas las plantas [B7].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Plantas de 5.000-10.000 M USD, permisos federales y contratos previos: pocos llegan a la decisión de inversión [B1].' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Gasoductos (Rusia, Noruega), renovables con baterías y nuclear a largo plazo; a 10 años el gas sigue siendo el respaldo de la red [B1].' },
      ],
      ciclo: { posicion: 'Pico', comentario: 'El ciclo del margen al contado está en un pico por la crisis de Ormuz (fuerza mayor de Catar hasta noviembre y dos trenes con hasta tres años de reparación) [B3]. Después llega una ola de oferta: el consenso del sector espera un mercado holgado en 2027-2029. Cheniere tiene el 90 % vendido a tarifa fija, así que el ciclo le mueve el 10-15 % del EBITDA, no la base.' },
      regulacion: 'Exportar exige permiso del DOE (para países sin tratado de libre comercio) y de la FERC para construir; la pausa de permisos de 2024 se levantó en 2025 [B1]. En junio de 2026 la FERC autorizó +5 Mtpa en Corpus Christi; la ampliación de Sabine Pass (hasta 20 Mtpa) y la de Corpus Christi (hasta 24 Mtpa) esperan permisos [B7]. En Europa, el reglamento de metano exigirá medir las emisiones del GNL importado.',
      tendencias: 'Tres tendencias: (1) la seguridad energética como prioridad política en Europa y Asia, que favorece contratos largos con EE. UU.; (2) la electricidad de los centros de datos de IA, que sostiene el consumo de gas a 10-15 años; (3) la transición energética, que acorta el horizonte de los contratos más allá de 2040 y es el riesgo del valor terminal [B1, B4].',
    },
    competencia: {
      posicion: 'Mayor exportador de GNL de EE. UU. y uno de los tres mayores del mundo (≈11 % de la oferta mundial con ≈55 Mtpa), por detrás de QatarEnergy (≈77 Mtpa) y junto a las carteras de Shell [B1, B2].',
      foso: {
        veredicto: 'Estrecho', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No aplica: los compradores eligen por precio y fiabilidad [B1].' },
          { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Contratos de 20 años con pago aunque no se cargue: el cliente no puede irse [A1].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Permisos de FERC y DOE ya concedidos y emplazamientos con espacio para ampliar: la ampliación cuesta menos que una planta nueva [B7].' },
          { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Ampliaciones junto a plantas existentes y diez años de operación; 4.940 cargamentos sin fallos relevantes [A3].' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mercado de pocas plantas grandes con contratos previos; la escala de Cheniere le da el mejor crédito del sector (BBB+) [A1].' },
        ],
      },
      amenazas: 'Por probabilidad: (1) la ola de oferta de 2027-2029 rebaja la tarifa de los contratos nuevos (la dirección habla de 2,50-3,00 USD por MMBtu) y el margen al contado; (2) Venture Global y los proyectos de la segunda ola compiten por los mismos compradores; (3) a largo plazo, la transición energética acorta la renovación de contratos después de 2040 [B1, B5].',
    },
    financieros: {
      comentario: 'Los ingresos han crecido un 14 % anual en 2018-2025, pero siguen al precio del gas: 33.428 M USD en 2022 y 15.703 M en 2024 [A2]. Lo que mide el negocio es el EBITDA sin derivados: 6.826 M USD en 2025 (con los pagos en acciones como gasto), frente a 6.035 M en 2024 y ≈11.600 M en el pico de 2022 [A6]. En el 1S26 el EBITDA ajustado subió un 26 %, a 4.137 M, por más volumen (Etapa 3) y más margen al contado [A3]. El beneficio GAAP es ruido: −2.343 M en 2021 y +9.881 M en 2023 por los derivados [A2].',
      ajustes: 'Quitamos del EBITDA la variación de valor de los derivados antes de la entrega (sobre todo los contratos IPM): +3.615 M USD en 2025, +1.313 M en 2024, +7.890 M en 2023, −6.531 M en 2022 y −5.989 M en 2021 [A2, A6]. Desde 2026 la empresa designa esos contratos como compras y ventas normales (NPNS), y el ruido se reducirá [A3]. A diferencia del EBITDA ajustado de la empresa, el nuestro resta los pagos en acciones (113 M en 2025).',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (6-ago) Cheniere subió por segunda vez la guía de 2026: EBITDA ajustado de 7.900-8.400 M USD y flujo distribuible de 5.300-5.800 M [A3]. Exportó 184 cargamentos (+19 %), terminó el tren mediano 6 de la Etapa 3 y espera el 7 en otoño; firmó con Bechtel el contrato llave en mano de la primera fase de la ampliación de Sabine Pass (>6 Mtpa) a la espera de los permisos [A3]. El BPA ajustado del trimestre (3,02) quedó algo por debajo del consenso (3,11) [D8].',
    },
    balance: {
      otros_pasivos: 'Deuda de 24.257 M USD a 30-jun-2026, casi toda de las filiales de proyecto (SPL, CQP, CCH) y 4.750 M de la matriz [A4]. Arrendamientos financieros de buques de 1.413 M (en el puente) y operativos de 2.513 M (dentro del EBITDA); compromisos de fletes que empiezan después por ≈6.000 M [A4]. Pasivos por impuestos diferidos de 3.629 M [A4].',
      comentario: 'El balance ha pasado de promotor a grado de inversión: la deuda bajó de 31.487 M USD en 2020 a 22.995 M en 2025 y la deuda neta es de 3,2 veces el EBITDA (24.571 M) [A2]. S&P subió a BBB+ a Cheniere y a CQP en noviembre de 2025 [A1]. Liquidez de 7.475 M [A3]. El patrimonio contable, negativo hasta 2022 por las pérdidas de los derivados, es hoy de 6.191 M más 5.299 M de minoritarios [A3].',
    },
    flujos: {
      comentario: 'El flujo operativo de 2025 fue de 5.539 M USD y el capex de 3.078 M (la Etapa 3 y los trenes 8-9), así que el flujo libre fue de ≈2.461 M [A2]. El capex de mantenimiento es pequeño (≈200 M al año, según la guía) frente a una amortización de 1.329 M: por eso la empresa mide el «flujo distribuible», 5.290 M en 2025 [A6]. En los últimos 12 meses el flujo libre fue de 2.791 M, después de 3.347 M de capex [A4].',
    },
    calidad: {
      comentario: 'Cuentas auditadas por KPMG con opinión favorable sobre las cuentas y el control interno de 2025 [A1]. El riesgo contable está en la valoración de los contratos IPM como derivados (de nivel 3: precios internacionales a 15-20 años) que movía el beneficio en miles de millones; desde 2026 pasan a NPNS con un saldo diferido de 2.195 M de activo y 1.906 M de pasivo [A3]. El Beneish (−1,59) queda por encima del umbral por los saltos de ingresos que vienen del precio del gas, no de la contabilidad.',
      senales: [
        { senal: 'Derivados IPM valorados con datos de nivel 3', nivel: 'Media', comentario: 'Mueven el beneficio GAAP miles de millones; los excluimos [A3].' },
        { senal: 'Minoritarios grandes (51,4 % de CQP)', nivel: 'Baja', comentario: 'El beneficio neto ya los resta; en el valor los restamos a mercado [D7].' },
        { senal: 'Ventas de directivos en el máximo de marzo de 2026', nivel: 'Media', comentario: '28,4 M USD en una semana a 290-300 USD [C3].' },
      ],
    },
    rentabilidad: {
      comentario: 'El ROIC de 2025 es del 13,6 % (NOPAT de 4.509 M sobre un capital invertido de 33.141 M), frente a un WACC del 8,65 %: la diferencia, 4,96 puntos, queda justo por debajo de los 5 que pedimos para comprar. Fue del 6-8 % en 2018-2020, cuando las plantas se estaban llenando, y del 36 % en el pico de 2022. Es un negocio de infraestructura: rinde bien sobre el coste de capital pero no extraordinario, y depende de que las ampliaciones se contraten a 2,50-3,00 USD por MMBtu [A3].',
    },
    capital: {
      politica: 'Plan de capital «todo a la vez»: dividendo creciente (0,555 USD al trimestre, 2,22 al año), recompras (más de 10.000 M USD autorizados para 2026-2030; 1.100 M en el 1S26 a ≈225 USD de media), reducción de deuda y ampliaciones con rentabilidad sin apalancar superior al coste del capital [A3, A6]. La empresa apunta a ≈30 USD de flujo distribuible por acción con unos 175 M de acciones al acabar la recompra [A6].',
      adquisiciones: [],
      comentario: 'Asignación de capital disciplinada: el plan «20/20 Vision» (2022-2025) desplegó más de 20.000 M USD y las acciones diluidas bajaron de 253 M en 2022 a 220 M en 2025 (−13 %) [A6, A2]. Las ampliaciones se aprueban solo con ≈90 % contratado. La duda: recomprar a ≈280 USD, 10 veces el flujo distribuible de un año excepcional, rinde menos que hacerlo a 200 [A3].',
    },
    directivos: {
      comentario: 'Equipo estable y probado: Fusco lleva diez años y ha llevado a Cheniere de un cargamento a ≈55 Mtpa sin retrasos graves, con proyectos terminados antes de plazo (Etapa 3) [A3, C1]. Cumple su guía: 2025 en la parte alta (6.943 M frente a 6.600-7.000) y 2026 subida dos veces [C4, C5, C7]. Señal negativa: los tres directivos principales y el presidente saliente vendieron 30,4 M USD en la semana del máximo de marzo de 2026 [C3].',
    },
    gobierno: {
      remuneracion: 'El consejero delegado cobró 25,6 M USD en 2025 (sueldo de 1,79 M, bonus objetivo del 160 % del sueldo y el resto en acciones a largo plazo ligadas al flujo distribuible por acción y a la rentabilidad para el accionista) [C1]. Ratio salarial de 110:1. La junta de 2026 la aprobó con un 90,1 % a favor [C2].',
      control_y_defensas: 'Sin accionista de control: Vanguard (≈10 %) y BlackRock (7,6 %) son los mayores; la dirección tiene menos del 1 % [C1]. Una acción, un voto, y consejeros elegidos cada año. Desde mayo de 2026 Fusco es presidente y consejero delegado, con Patricia Collawn como consejera coordinadora [C1]. Cheniere controla Cheniere Partners (CQP, cotizada) con el socio general y el 48,6 %: hay conflicto potencial con sus partícipes [C1].',
    },
    consenso: {
      guidance: 'Guía de 2026 (6-ago-2026): EBITDA ajustado de 7.900-8.400 M USD y flujo distribuible de 5.300-5.800 M, con 53-54 Mt de producción [A3]. En febrero era de 6.750-7.250 M y 4.350-4.850 M; en mayo, 7.250-7.750 M [A6, C7]. La empresa prevé ≈30 USD de flujo distribuible por acción a largo plazo [A6].',
      revisiones: 'Revisiones al alza durante todo 2026, empujadas por el cierre de Ormuz: la guía de EBITDA ha subido un 16 % en el punto medio [A3]. El objetivo medio de 22 analistas es de 311,33 USD (262-340), con 20 recomendaciones de compra y 2 de mantener [D2]. El consenso trimestral del 3T26 está en 4,21-4,49 USD de BPA [D8].',
    },
    bolsa: {
      comentario: 'La acción ha subido un 44,9 % en 2026 con dividendos (el sector de la energía, un 54,3 %) y un 24,9 % en un año, frente al 17,5 % del S&P 500 [D1]. En diez años, un 21,9 % anual. La beta mensual de cinco años es casi nula (0,04) y la semanal de cinco años de 0,38: la acción se mueve con el gas y la geopolítica, no con la bolsa. Volatilidad del 28,6 % y caída máxima del 24,9 % (ene-dic de 2025) [D1].',
      contexto: {
        movimiento: { fecha: '2026-10-15', var_1m_pct: 4.2, var_3m_pct: 6.3, var_6m_pct: 6.2, var_12m_pct: 23.3, dist_max_52s_pct: -6.0, dist_min_52s_pct: 47.8, dist_max_historico_pct: -6.0, tendencia: 'alcista', volatilidad_60d_pct: 30, avisos: [] },
        movimientos_fuertes: [
          { periodo: 'dic-2025 a mar-2026', var_pct: 55, causa: 'Del mínimo de 186,20 USD (16-dic) al máximo de 300,89 (30-mar): el ataque iraní a Ras Laffan (2-mar) y el cierre de Ormuz dispararon el precio internacional del gas [B2, P2].', veredicto: 'no cambia', condicion: null },
          { periodo: 'abr-2026', var_pct: -7, causa: 'El alto el fuego entre EE. UU. e Irán hundió las energéticas (Cheniere −6 % a −7 % en un día) [P3].', veredicto: 'no cambia', condicion: null },
          { periodo: 'may-2026', var_pct: -17.4, causa: 'Mayor caída de un mes del año (hasta el 29-may): negociaciones de paz, gas más barato y almacenamiento alto en EE. UU.; Venture Global cayó un 42 % desde marzo [B4, P2].', veredicto: 'no cambia', condicion: null },
          { periodo: 'jul-2026', var_pct: 16.8, causa: 'Mayor subida de un mes (hasta el 24-jul): nuevo cierre de Ormuz y ataque a un petrolero, Catar suspende la vuelta de Ras Laffan [B8, P2].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de la apertura; consenso de BPA de 4,21-4,49 USD [D5, D8].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-28', tipo: 'demanda o regulador', hecho: 'Catar amplía la fuerza mayor del GNL hasta noviembre; dos trenes dañados pueden tardar tres años [B3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-06', tipo: 'resultados', hecho: 'Segunda subida de la guía de 2026 (EBITDA de 7.900-8.400 M USD) [A3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-05', tipo: 'fusión u oferta', hecho: 'Contrato con Bechtel y obras previas de la fase 1 de la ampliación de Sabine Pass; decisión de inversión pendiente de FERC y DOE [B7].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-03-30', tipo: 'directivos', hecho: 'El director financiero, el comercial, el jurídico y el presidente saliente venden 30,4 M USD a 290-300 USD en la semana del máximo [C3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-02-26', tipo: 'ampliación o convertible', hecho: 'Nueva autorización de recompra de más de 10.000 M USD hasta 2030 (reduce acciones, no las amplía) [A6].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-04-02', tipo: 'recomendación', hecho: 'Citi sube el objetivo a 330 USD desde 280 (Comprar); objetivo medio actual 311,33 [B4, D2].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-10-29',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La acción vive de la geopolítica: subió un 55 % de diciembre a marzo con el ataque a Ras Laffan y el cierre de Ormuz, cayó un 17 % en mayo con las negociaciones y recuperó en julio con el nuevo cierre; hoy está a un 6 % de máximos, con tendencia alcista [P2]. No hay colocaciones, ampliaciones ni litigios pendientes; los directivos vendieron en marzo, en el máximo, sin repetirlo después [C3]. El hecho pendiente que más mueve el precio es el fin de la crisis de Ormuz, que bajaría el margen al contado; ya está en el bajista. Como la señal no es de compra, el veredicto de precio y noticias no la cambia.',
      },
    },
    multiplos_historicos: {
      comentario: 'Con el EBITDA sin derivados, Cheniere cotiza a 12,7 veces el de los últimos 12 meses, por encima de su media de cinco años (10,4) y en el percentil 80; con el beneficio publicado, a 20,3 veces frente a 15,1 [D1]. En la base adelantada de la regla (BPA ajustado del año siguiente) paga 19,8 veces frente a una mediana de 12,5: el mercado ha subido el múltiplo porque el negocio es ahora de flujo contratado con grado de inversión y recompras, y porque supone que las ampliaciones crearán valor. Parte de la prima es estructural (menos riesgo que en 2018-2020), parte es del ciclo de 2026.',
    },
    comparables: {
      criterio: 'Seis cotizadas de infraestructura energética: el otro gran exportador de GNL de EE. UU. (Venture Global), un productor con GNL (Woodside) y cuatro de gasoductos y tratamiento con contratos de pago fijo (Williams, Kinder Morgan, Energy Transfer, Targa). Cifras de Stock Analysis al 14-15-oct [D6]. Fuera QatarEnergy y Shell (no cotizan o son integradas) y NextDecade (sin beneficios).',
      comentario: 'Cheniere cotiza a 12,7 veces el EBITDA de los últimos 12 meses, por encima de Venture Global (9,5), Energy Transfer (8,1) y Woodside (7,4) y por debajo de Williams (16,4), Targa (14,5) y Kinder Morgan (13,8) [D6]. La mediana del PER adelantado es de 17,3 veces, pero mezcla bases y negocios: Venture Global (7,7) refleja su riesgo de venta al contado y litigios; las de gasoductos, flujos regulados más largos. Pesan 0 en el valor y solo entran en el alcista de la regla.',
    },
    transacciones: {
      comentario: 'No hay operaciones comparables con múltiplos públicos fiables: las ventas de participaciones en proyectos de GNL no publican EV/EBITDA y Cheniere no ha comprado ni vendido negocios relevantes. Peso 0.',
    },
    catalizadores: {
      items: [
        { fecha: '2026-10-29', evento: 'Resultados del 3T26', efecto: 'Confirma la guía subida; el mercado mirará la guía de 2027 y el margen al contado', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Decisión de inversión de la fase 1 de la ampliación de Sabine Pass (>6 Mtpa)', efecto: 'Añade ≈0,8-1,0 bn de EBITDA desde 2030; espera FERC y DOE', probabilidad: 'Media', sentido: '+' },
        { fecha: 'Sin fecha', evento: 'Fin de la crisis de Ormuz y vuelta de Ras Laffan', efecto: 'Baja el margen al contado y el precio internacional del gas; la acción cayó un 17 % en mayo con las negociaciones', probabilidad: 'Media', sentido: '−' },
        { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Decide si el EBITDA vuelve al nivel de 2025 (≈7.000 M) o se queda en 8.000 M', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2H', evento: 'Tren 7 de la Etapa 3 de Corpus Christi', efecto: 'Cierra la Etapa 3 (>10 Mtpa)', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2026-2030', evento: 'Recompra de más de 10.000 M USD', efecto: '≈5 % menos de acciones al año al precio actual', probabilidad: 'Alta', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Normalización del mercado: fin de la crisis de Ormuz y ola de oferta 2027-2029 (Golden Pass, Plaquemines, Catar)', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−53 % (escenario bajista: 104,53 USD frente a 223,96)', mitigante: '≈90 % de la producción con tarifa fija hasta mediados de la década de 2030', senal: 'Guía de EBITDA de 2027 por debajo de 7.000 M USD' },
        { riesgo: 'Valoración: el precio descuenta márgenes de crisis o ampliaciones no aprobadas', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−16 % (objetivo ponderado a 12 meses, 234,02 USD)', mitigante: 'Recompra continua y dividendo', senal: 'PER adelantado por encima de 20 veces sin subir la guía' },
        { riesgo: 'Permisos y política: retrasos de FERC o DOE en las ampliaciones, cambios de política de exportación', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % (la fase 1 de Sabine Pass está en el base)', mitigante: 'Emplazamientos ya autorizados y apoyo político actual a la exportación', senal: 'Plazo de la FERC para Sabine Pass' },
        { riesgo: 'Transición energética: contratos que no se renuevan después de 2040', tipo: 'Estructural', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % (terminal con crecimiento cero)', mitigante: 'Demanda de gas para respaldar redes y centros de datos; contratos hasta 2050', senal: 'Contratos nuevos más cortos de 15 años' },
        { riesgo: 'Operativo: huracanes en el golfo de México o un accidente (Freeport 2022)', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Dos emplazamientos y seguros', senal: 'Paradas no programadas' },
        { riesgo: 'Coste del gas en EE. UU.: Henry Hub más caro por la demanda eléctrica de la IA', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'El 115 % de Henry Hub se repercute en el contrato', senal: 'Henry Hub por encima de 5 USD/MMBtu' },
      ],
      premortem: 'Octubre de 2028: la acción vale 170 USD, un 39 % menos. Lo que pasó: en la primavera de 2027 se firmó la paz con Irán, Catar reabrió Ras Laffan antes de lo previsto y llegó a la vez la ola de oferta estadounidense; el precio internacional del gas cayó a 7-8 USD por MMBtu y el margen de Cheniere Marketing desapareció. La guía de 2027 volvió a 6.800 M de EBITDA y el mercado dejó de pagar 20 veces el beneficio: volvió a las 12-13 de su mediana. La ampliación de Sabine Pass se aprobó, pero con tarifas de 2,50 USD. Nada fue un desastre; simplemente se pagó el pico.',
      ia: {
        exposicion: 'Baja', sentido: 'Positivo', efecto_valor: '0 % a +5 % a 3-5 años',
        comentario: 'Riesgo de IA bajo: Cheniere licúa y transporta gas, un negocio físico de plantas y barcos que la IA no puede sustituir ni abaratar para un competidor. El efecto es indirecto y favorable: los centros de datos aumentan el consumo de gas para electricidad en EE. UU. y Asia, lo que sostiene la demanda de contratos a 20 años; el Henry Hub más caro se repercute al cliente (115 %). La IA ayuda en la operación (mantenimiento predictivo, programación de buques), pero no cambia el valor.',
      },
    },
    esg: {
      materialidad: 'Lo material son las emisiones de metano y CO2 de la cadena del gas (pozo, gasoducto, licuefacción, barco), la seguridad de las plantas en una costa de huracanes y la relación con las comunidades del golfo [B1]. Cheniere publica intensidades de emisiones por cargamento para sus clientes y su sexto informe de responsabilidad corporativa salió en agosto de 2025 [B1].',
      controversias: 'Sin sanciones relevantes en los tres últimos años según el 10-K; litigios ambientales locales y oposición de grupos ecologistas a los permisos de las ampliaciones [B1].',
      confianza: 'Baja',
    },
    preguntas: {
      items: [
        { tema: 'Margen al contado', pregunta: '¿Qué parte del EBITDA de 2026 viene de volúmenes no contratados vendidos por encima de la tarifa, y qué espera para 2027 si Ras Laffan vuelve?', por_que: 'Decide si 8.000 M de EBITDA es recurrente o un pico.' },
        { tema: 'Ampliaciones', pregunta: '¿Qué tarifa y qué porcentaje contratado tiene la fase 1 de Sabine Pass, y cuál es el coste por tonelada con Bechtel?', por_que: 'El precio actual supone que las ampliaciones crean valor.' },
        { tema: 'Recompras', pregunta: '¿Por qué recomprar a 10 veces el flujo distribuible de un año excepcional y no reducir más deuda?', por_que: 'La recompra a 280 USD rinde menos que a 200.' },
        { tema: 'Directivos', pregunta: '¿Por qué vendieron el director financiero, el comercial y el jurídico en la semana del máximo de marzo?', por_que: '30,4 M USD sin plan 10b5-1 declarado.' },
        { tema: 'CQP', pregunta: '¿Hay planes de comprar el 51,4 % de Cheniere Partners en manos de terceros?', por_que: 'Simplificaría la estructura y cambiaría el valor por acción.' },
        { tema: 'Demanda eléctrica', pregunta: '¿Cuántos contratos nuevos vienen de compradores ligados a la generación eléctrica para centros de datos?', por_que: 'Es la tesis de demanda a 15-20 años.' },
      ],
      confianza: 'Media',
    },
    sentimiento: {
      temas: [
        { tema: 'Cheniere como forma segura de jugar la crisis de Ormuz', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto para la base contratada, pero el 16 % de subida de la guía es margen al contado que se irá [E1, A3].' },
        { tema: 'Sobrecompra tras la subida de marzo', postura: 'Dividida', peso: 'Medio', contraste: 'La acción cayó un 23 % hasta junio y volvió a máximos [E2, E3].' },
      ],
      lectura: 'El tono es positivo y apoyado en la geopolítica: Cheniere como «refugio» energético con contratos [E1-E4]. Coincide con 20 recomendaciones de compra de 22 [D2]. Falta en la conversación el día después de Ormuz, que es nuestro riesgo principal.',
      confianza: 'Baja',
    },
    valoracion: {},
  },
  dcf_justificacion: {
    crecimiento: 'Ingresos de 2026e: +15 % (1S26 real de 11.600 M USD y un 2S parecido) [A3]. Después: +2 % en 2027 y +1 % en 2028 (más volumen con el tren 7 y los trenes 8-9, pero precio internacional más bajo), +7 % en 2029 (trenes 8-9 todo el año), +6 % y +5 % en 2030-2031 (fase 1 de la ampliación de Sabine Pass, >6 Mtpa) y 2-2,5 % al final. No incluimos el resto de las ampliaciones (≈34 Mtpa) porque no tienen permisos ni contratos.',
    margenes: 'Margen EBITDA sin derivados y después de pagos en acciones del 34,8 % en 2026e (8.000 M sobre 23.000 M), el 32 % en 2027e y el 31 % en 2028e por la normalización del margen al contado, y un 32,5 % al final (el 34,2 % de 2025 incluía Henry Hub bajo) [A6]. El EBITDA vuelve a ≈7.300-7.500 M y sube con los trenes nuevos.',
    inversion: 'Capex del 15 % de las ventas en 2026 (Etapa 3, trenes 8-9 y obras previas de Sabine Pass: 2.100 M en el 1S26), 10-12 % en 2027-2028 por la ampliación, 9 % en 2029 y 3,5-4 % después (mantenimiento ≈1 %, desembotellamientos y reposición) [A3]. Amortización del 6,8 % y circulante del 7 % de las ventas. Impuesto del 16 % sobre el EBIT consolidado (CQP no tributa por la parte de terceros).',
    wacc: 'Tasa libre del 5,21 % (bono de EE. UU. a 10 años del 13-oct-2026) [D3], prima de mercado del 5,5 % y beta de 0,9: la regresión de la acción no sirve (0,04 mensual, 0,38 semanal) porque se mueve con el gas, no con la bolsa; usamos la de infraestructura energética apalancada. Coste de la deuda del 5,5 % (CQP emitió al 5,35 % a 2036 en junio) [A3]. Peso de la deuda del 26 % a mercado (deuda frente a capitalización y minoritarios). WACC del 8,65 %.',
    terminal: 'Gordon con un 1,5 % de crecimiento: las plantas duran 30-40 años y los contratos tienen 15 años de vida media, pero después de 2040 la renovación es incierta por la transición energética. El valor terminal es el 66 % del total.',
  },
  puente_comentarios: {
    '2026e': 'Producción de 53-54 Mt (+9 % frente a 49 Mt) y precio internacional alto por Ormuz [A3].',
    '2027e': 'Tren 7 y Etapa 3 completa todo el año (+5 % de volumen); precio a la baja con la vuelta parcial de Catar.',
    '2028e': 'Trenes 8-9 en el 2S28; precio todavía a la baja por la ola de oferta.',
    '2029e': 'Trenes 8-9 todo el año (≈5 Mtpa).',
    '2030e': 'Primera fase de la ampliación de Sabine Pass (>6 Mtpa) en marcha parcial.',
  },
  sostenibilidad_justificacion: 'Sí: el crecimiento proyectado (5,1 % de media) está por debajo del histórico (14 %) y sale de volumen ya construido o en construcción (tren 7, trenes 8-9) y de la fase 1 de Sabine Pass, que financiamos con capex propio (10-12 % de las ventas en 2027-2028). La cuota pasa del 11,0 % al 12,3 % del mercado en 2033, coherente con un mercado que crece un 3 % y con 90 % de la capacidad contratada. El motor llega al mismo veredicto. La reinversión neta parece baja (3 % del NOPAT) porque la amortización (6,8 % de las ventas) supera al capex de mantenimiento de unas plantas de vida larga; las ampliaciones sí están pagadas en 2026-2029.',
  dcf_lectura: 'El DCF da 223,96 USD por acción, un 19,9 % por debajo del precio, con el 66 % del valor en el terminal. Para justificar 279,69 USD, Cheniere tendría que crecer un 5,9 % anual en 2027-2033 (frente al 3,6 % de nuestros años no fijos) con nuestros márgenes: en la práctica, aprobar y llenar una segunda fase de ampliación. La rentabilidad implícita en el precio es del 7,8 % anual, por debajo del WACC (8,65 %). No es una exigencia absurda para una empresa con 40 Mtpa en tramitación, pero es pagar hoy por ampliaciones sin permisos ni contratos, y con el margen de 2026 en la cuenta.',
  narrativas: {
    Bajista: 'Paz con Irán, vuelta de Ras Laffan y ola de oferta: margen al contado nulo, tarifas nuevas de 2,50 USD y crecimiento del 3 % de media con un margen tres puntos menor.',
    Base: 'La crisis se normaliza poco a poco; los trenes 8-9 y la fase 1 de Sabine Pass añaden volumen; margen EBITDA del 31-32,5 %.',
    Alcista: 'La crisis de oferta dura hasta 2029, la demanda eléctrica y asiática absorbe la nueva oferta y Cheniere aprueba más fases: crecimiento del 7 % de media y margen dos puntos mayor.',
  },
  escenarios_comentario: 'La asimetría a largo plazo es desfavorable: el bajista (104,53 USD) pierde un 63 % y el alcista (332,73) gana un 19 %. A 12 meses también: objetivo ponderado de 234,02 USD (−15,6 %), con un bajista de 90,06 (−67,8 %) por el mínimo histórico del PER adelantado (7,9 veces) y un alcista de 327,60 (+17,1 %). El valor ponderado de los escenarios es de 222,90 USD.',
  valoracion_comentario: 'El valor intrínseco (222,90 USD) sale del DCF (60 %) y de los escenarios (40 %). Los comparables pesan 0 porque mezclan negocios (gasoductos regulados) y bases de beneficio; su EV/EBITDA daría 120-339 USD según el múltiplo. Las transacciones no pesan (sin operaciones con múltiplo). Con la prima implícita del mercado (4,20 %) el WACC bajaría al 7,78 % y el DCF subiría a 284,97 USD, el precio de hoy: la acción está valorada con la prima de riesgo del mercado actual, sin margen de seguridad.',
  resumen: {
    recomendacion: 'Vender', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    tesis: 'Cheniere es el mayor exportador de gas natural licuado de EE. UU.: cobra una tarifa fija por licuar gas para eléctricas y gasistas de Europa y Asia, con ≈90 % de la producción vendida a 15 años de media, rating BBB+ y una recompra de más de 10.000 M USD [A1, A6]. La seguridad energética de Europa (sin gas ruso) y de Asia, y la demanda eléctrica de los centros de datos de IA, sostienen la demanda de sus contratos.\n\nEl precio, 279,69 USD tras subir un 45 % en 2026, descuenta mucho: 19,8 veces nuestro BPA ajustado de 2027e frente a una mediana histórica de 12,5, con un EBITDA de 2026 inflado ≈1.000 M por el cierre de Ormuz y el ataque a Ras Laffan [A3, B2].\n\nEl mercado cree que la crisis dura y que las ampliaciones (40 Mtpa en tramitación) se aprobarán y rendirán. Nosotros incluimos la primera fase y un margen que vuelve poco a poco: el valor es de 222,90 USD.',
    vision_diferencial: {
      mercado_descuenta: 'Que el EBITDA se queda en ≈8.000 M USD y que las ampliaciones de Sabine Pass y Corpus Christi suman volumen contratado a buena tarifa: un 5,9 % de crecimiento anual en el DCF inverso.',
      nuestra_vision: 'Un negocio de infraestructura excelente con un año excepcional: EBITDA de vuelta a ≈7.500 M en 2027-2028, solo la primera fase de la ampliación y un múltiplo que no se queda en 20 veces.',
      por_que: 'El 90 % contratado protege la base, no el pico: el margen de 2026 es al contado y la ola de oferta de 2027-2029 y la vuelta de Catar lo reducirán.',
    },
    a_favor: [
      '**Contratos a 20 años con tarifa fija** sobre ≈90 % de la producción hasta mediados de la década de 2030 [A1].',
      '**Seguridad energética**: el GNL de EE. UU. es ≈60 % del que importa Europa y la crisis de 2026 refuerza los contratos largos [B4].',
      '**Crecimiento visible**: tren 7, trenes 8-9 (5 Mtpa) y la fase 1 de Sabine Pass con Bechtel ya contratado [A3].',
      '**Recompra de más de 10.000 M USD** hasta 2030 y dividendo creciente [A6].',
      '**Riesgo de IA bajo y demanda eléctrica de los centros de datos** a favor.',
    ],
    en_contra: [
      '**Rentabilidad a 12 meses del −15,6 %** (ponderada) y −6,6 % en el base.',
      '**Valor intrínseco de 222,90 USD, un 20,3 % por debajo del precio**.',
      '**EBITDA de 2026 en un pico** por Ormuz: la guía ha subido un 16 % en el año [A3].',
      '**ROIC − WACC de 4,96 puntos**, justo por debajo del umbral de 5 para comprar.',
      '**Directivos vendiendo** 30,4 M USD en el máximo de marzo [C3].',
    ],
    que_vigilar: 'La tesis del mercado depende de que el margen de 2026 no se vaya. La señal está en la guía de 2027 (febrero) y en Ras Laffan: si la guía de EBITDA de 2027 sale por encima de 8.000 M USD con Catar todavía parado, el pico es más largo; si sale cerca de 7.000 M o Catar reabre antes de 2027, el múltiplo de 20 veces no se sostiene. La decisión de inversión de Sabine Pass, con su tarifa, es la segunda señal.',
    cambiaria_recomendacion: [
      'Si el precio baja de 205,37 USD, con el resto igual, pasaríamos a Comprar (si además el ROIC − WACC llega a 5 puntos).',
      'Entre 205,37 y 262,42 USD, Mantener.',
      'Si la guía de 2027 supera 8.000 M de EBITDA y se aprueba la fase 1 de Sabine Pass con ≥2,75 USD por MMBtu, subiríamos el BPA de 2028e un 10 % y revisaríamos.',
      'Si Catar reabre Ras Laffan entero antes del verano de 2027, iríamos al bajista.',
    ],
    kpis_seguimiento: [
      { kpi: 'Guía de EBITDA ajustado', nivel_actual: '7.900-8.400 M USD (2026)', umbral_alerta: '< 7.000 M en la guía de 2027', por_que: 'Separa la base contratada del pico de 2026.' },
      { kpi: 'Estado de Ras Laffan y del estrecho de Ormuz', nivel_actual: 'Fuerza mayor hasta noviembre de 2026', umbral_alerta: 'Reapertura completa', por_que: 'Mueve el margen al contado.' },
      { kpi: 'Decisión de inversión de la ampliación de Sabine Pass', nivel_actual: 'Pendiente de FERC y DOE', umbral_alerta: 'Retraso más allá de 2027', por_que: 'Está en el DCF base.' },
      { kpi: 'Acciones en circulación', nivel_actual: '206,5 M (31-jul-2026)', umbral_alerta: 'Más de 200 M a final de 2027', por_que: 'La recompra sostiene el BPA.' },
      { kpi: 'ROIC − WACC', nivel_actual: '4,96 puntos (2025)', umbral_alerta: '< 4,5', por_que: 'Requisito de calidad para comprar.' },
    ],
    sintesis: '**La recomendación y por qué.** Vender (para quien la tenga; no comprar para quien no), con convicción baja. El objetivo a 12 meses es de 234,02 USD: rentabilidad ponderada del −15,6 % y del −6,6 % en el base, frente a un objetivo medio de 22 analistas de 311,33. El valor intrínseco es de 222,90 USD, un 20,3 % por debajo del precio de 279,69. Fallan los tres requisitos de compra: la rentabilidad, el valor real y, por poco, la calidad (ROIC − WACC de 4,96 puntos). La convicción es baja porque con la prima de riesgo que paga hoy el mercado (4,20 %) el DCF daría 284,97 USD, el precio: la regla absoluta dice Vender y la relativa, Mantener. Subiría si la guía de 2027 vuelve a ≈7.000 M de EBITDA sin que caiga la acción; bajaría si Catar sigue parado en 2027.\n\n**El negocio.** Cheniere licúa gas estadounidense y lo vende a Europa y Asia con contratos de 20 años que pagan una tarifa fija más el 115 % del Henry Hub: ≈90 % de la producción está vendida hasta mediados de la década de 2030 [A1]. Encaja de lleno en la seguridad energética: sin gas ruso y con Ormuz cerrado, el GNL de EE. UU. ha llegado a ser el 64 % del que importa Europa [B4]; la electricidad de los centros de datos de IA sostiene la demanda de gas a largo plazo. Es infraestructura de calidad (BBB+, ROIC del 13,6 % frente a un WACC del 8,65 %), pero no extraordinaria. Sostenibilidad Sí: el 5,1 % de crecimiento medio sale de trenes ya en obra y de la primera fase de Sabine Pass.\n\n**Finanzas y equipo.** EBITDA ajustado de 6.943 M USD en 2025 y guía de 2026 subida dos veces, a 7.900-8.400 M, por el margen de los volúmenes no contratados durante la crisis [A3, A6]. El beneficio GAAP no sirve (derivados de miles de millones): usamos el ajustado. La dirección cumple la guía, pero sus tres principales directivos vendieron 30,4 M USD en la semana del máximo de marzo [C3].\n\n**Valoración.** El DCF da 223,96 USD; para justificar el precio, Cheniere tendría que crecer un 5,9 % anual en 2027-2033 frente al 3,6 % de nuestro base, es decir, aprobar y llenar más ampliaciones de las que ya están en obra. Cotiza a 19,8 veces nuestro BPA ajustado de 2027e frente a una mediana histórica de 12,5: la regla común solo deja bajar el múltiplo un 10 % (base 18 veces), y aun así el BPA de 2028e (14,4) queda por debajo del de 2026e (15,6) porque se va el margen de la crisis.\n\n**Riesgos y catalizadores.** El riesgo principal es el día después de Ormuz: paz, vuelta de Ras Laffan y la ola de oferta de 2027-2029 (bajista de 104,53 USD en el DCF y de 90,06 a 12 meses). Riesgo de IA bajo: negocio físico, y la IA empuja la demanda de gas. Catalizadores: 3T26 el 29-oct, guía de 2027 en febrero y la decisión de inversión de Sabine Pass.\n\n**Qué cambiaría la decisión.** Compraríamos por debajo de 205,37 USD (límite robusto, con la v2 y el BPA −10 %, 169,90) si además el ROIC − WACC llega a 5 puntos; mantendríamos entre 205,37 y 262,42. Revisaríamos al alza con una guía de 2027 por encima de 8.000 M y Sabine Pass aprobada a ≥2,75 USD por MMBtu.',
  },
};
