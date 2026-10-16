// Textos del analista para Fortune Electric (1519.TW, corte 2026-10-16). Cifras del motor tal cual; hechos con cita de la nota ([A1], [D2]…) o propia ([P1]).
const fuentes = [
  { id: 1, titulo: 'Yahoo Finance: movimiento de 1519.TW (1, 3, 6 y 12 meses; medias de 50 y 200 sesiones; volatilidad de 60 sesiones; mayor subida y caída de un mes; caídas diarias de 5 % o más), 16-oct-2026', editor: 'Yahoo Finance (herramientas/movimiento.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://query1.finance.yahoo.com/v8/finance/chart/1519.TW' },
  { id: 2, titulo: 'Yahoo奇摩股市: cotizaciones de 1519 del 12 al 16-oct-2026 (724, 663, 649 y 656 TWD) y del índice', editor: 'Yahoo奇摩股市', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tw.stock.yahoo.com/quote/1519.TW' },
];

export default {
  fuentes,
  veredicto: 'Sí',
  limitaciones: 'Cuentas en millones de TWD (NIIF adoptadas en Taiwán) sacadas de los estados auditados en inglés de 2021-2025 y del semestral de junio de 2026 en chino, porque Taiwán no publica XBRL utilizable desde aquí y MOPS y la web de la empresa bloquean la descarga automática [A2-A5]. El BPA y el DPA de todos los años están reexpresados sobre 347,47 M de acciones (ampliación gratuita del 5-ago-2026) para compararlos con el precio de hoy, 656 TWD al cierre del 16-oct-2026 [D1]. Los cierres de ejercicio de Yahoo están ajustados por las ampliaciones gratuitas. El consenso de FactSet lo da la prensa (Anue) y suponemos que su BPA está en la base anterior a la ampliación de agosto [D2]. Los trimestres de 2024-2025 vienen de Stock Analysis [A9].',
  controles_explicados: [
    { control: 'DCF inverso calculable', explicacion: 'No hay crecimiento razonable ni margen EBITDA por debajo del 48 % que justifique 656 TWD con un WACC del 8,94 % y un crecimiento terminal del 1,5 % en TWD: el precio solo rinde un 3,6 % anual. El supuesto que más pesa es la normalización del margen al 18 % desde 2030, propia de un fabricante de transformadores fuera del pico de ciclo (el margen fue del 5-7 % en 2021-2022) [A2, A4]. No es un error del modelo: el mercado paga un múltiplo de crecimiento que el DCF no reconoce.' },
    { control: 'Cambio de perímetro declarado (2022)', explicacion: 'Pérdida de control de Fortune Electric Value en 2022 (plusvalía no operativa de 468,3 M) y nueva consolidación en 2025; la filial factura poco y no altera la comparación de ventas [A4, A2].' },
  ],
  huecos: [
    { seccion: 'riesgos', campo: 'margen de Fortune en el ciclo bajo anterior (2009-2018)', tipo: 'Complemento', intentos: '1) Estados de 2021-2025 (empiezan en 2020); 2) MOPS (bloqueado por exceso de consultas); 3) Stock Analysis (cuentas anuales desde 2016 sin desglose fiable de márgenes)', decision: 'Omitido' },
  ],
  secciones: {
    rentabilidad: {
      comentario: 'Fortune crea mucho valor hoy: el ROIC de 2025 es del 51,6 % frente a un WACC del 8,94 %, tras el 64,6 % de 2024 y el 41,1 % de 2023. Pero ese ROIC exagera por dos razones. Primera, el capital invertido (7.884 M TWD) es pequeño porque los anticipos de clientes (7.533 M de pasivos de contrato) financian casi todo el circulante: sin ellos el capital sería de ~15.400 M y el ROIC de ~26 %, todavía muy por encima del WACC [A2]. Segunda, es un ROIC de pico de ciclo: en 2021-2022, con márgenes de explotación del 4-6 %, fue del 5,0 % y del 5,9 %, por debajo del WACC [A4]. El ROE (45,9 % en 2025) cuenta lo mismo. Lo que decide el valor es cuánto del ROIC actual sobrevive a la normalización de precios cuando entre la capacidad nueva del sector.',
      confianza: 'Media',
    },
    multiplos_historicos: {
      comentario: 'La historia útil es corta: hasta 2022 Fortune era otro negocio (margen de explotación del 4-6 %) y sus PER no sirven para el de hoy; 2022 además lleva la plusvalía de 468 M [A4]. Con el BPA real del año siguiente, el PER adelantado al cierre fue de 19,9 veces en 2023, 36,6 en 2024 y 51,4 en 2025 (con nuestro BPA de 2026e): el mercado ha ido pagando cada vez más por el mismo ciclo [D1]. Hoy cotiza a 39,2 veces nuestro BPA de 2027e y a 41,2 veces el EBITDA de los últimos 12 meses: por encima de la mediana corta (36,6) y muy lejos del 19,9 de 2023.',
    },
    comparables: {
      comentario: 'Fortune cotiza con una prima grande sobre sus comparables: 41,2 veces el EBITDA de los últimos 12 meses frente a una mediana de ~20 veces, y un PER adelantado de ~33 veces (Stock Analysis, con el consenso) frente a 22,8 [D4]. La prima tiene parte de base: margen EBITDA del 22,9 % (solo HD Hyundai, con 27,5 %, y Chung-Hsin, con 25,5 %, están por encima) y ROIC muy alto [D4]. Pero HD Hyundai Electric, el comparable más parecido (exportador asiático de transformadores de potencia a EE. UU., con más margen y fábrica en Alabama), cotiza a 14 veces el EBITDA y 16 veces el beneficio. Los rivales taiwaneses (Shihlin, Chung-Hsin, Allis) cotizan a 17-24 veces. Los comparables dan 358-536 TWD por PER y 285-377 por EV/EBITDA.',
    },
    transacciones: {
      comentario: 'Las compras recientes del sector se hicieron a 14-16 veces el EBITDA: Prolec GE (GE Vernova, oct-2025) a ~14,1 veces con margen del ~25 %, y NSI Industries (Hubbell, may-2026) a 15,5 veces [D8, D9]. Son compras de control de negocios de transformadores en pleno ciclo y quedan muy por debajo de las 41 veces a las que cotiza Fortune. Con la familia Hsu en ~45-50 % del capital no hay prima de control que esperar [C1]. Hitachi-ABB Power Grids (2018) se excluye: es de otro ciclo [D11].',
    },
  },
  bolsa_comentario: 'Fortune fue una de las acciones de más éxito de Taiwán: +92,6 % anual en cinco años frente al +29,9 % del índice (0050), con el salto de 2023 (de 36 a 246 TWD ajustados) cuando el mercado descubrió la exportación de transformadores a EE. UU. [D1]. Marcó máximo de 1.013,64 TWD ajustados el 26-feb-2026 y desde entonces ha caído un 33 %, mientras el índice de Taiwán sube un 69,5 % en el año: la acción va −4 % en 2026 [D1]. La caída coincide con la pausa de ventas (nueve meses −0,7 %), los recortes del consenso y la rotación hacia semiconductores [A7, D2]. Beta de 1,1 (0,95 mensual a cinco años y 1,19 semanal a dos años), volatilidad del 52 % y caída máxima histórica del 65 % [D1].',
  bolsa_contexto: {
    movimiento: { fecha: '2026-10-16', var_1m_pct: -5.9, var_3m_pct: 4.4, var_6m_pct: -17.7, var_12m_pct: 24.2, dist_max_52s_pct: -33.2, dist_min_52s_pct: 31.0, dist_max_historico_pct: -33.2, tendencia: 'bajista', volatilidad_60d_pct: 44.9, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'mar-2026', var_pct: -20.0, causa: 'Días de −7,8 % (4-mar), −5,9 % (9-mar) y −5,6 % (31-mar) tras el máximo de febrero; ventas de marzo solo +3,4 % y primeras dudas sobre el ritmo de 2026 [P1, A8].', veredicto: 'no cambia', condicion: null },
      { periodo: 'may-jul 2026', var_pct: -17.3, causa: 'Ventas de mayo −9,3 % y de junio −25,8 % por retrasos de entregas a EE. UU.; resultados del 1T26 con BPA a la baja; mayor caída de un mes hasta el 3-jul [P1, A6, A8].', veredicto: 'no cambia', condicion: null },
      { periodo: 'ago-2026', var_pct: 26.8, causa: 'Rebote tras los resultados del 1S26 (margen bruto del 43,55 %) y las ventas de julio y agosto (+12,5 % en agosto); mayor subida de un mes hasta el 27-ago [P1, A6].', veredicto: 'no cambia', condicion: null },
      { periodo: '13 y 15-oct-2026', var_pct: -14.3, causa: '−8,4 % el 13-oct (índice −1,95 %) y −5,9 % el 15-oct (índice −3,41 %): venta generalizada de valores de IA y beta alta; no hemos encontrado noticia de la empresa esos días [P2].', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-08-05', tipo: 'otro', hecho: 'Ex-dividendo de 11 TWD en efectivo y ampliación gratuita de 1 acción por cada 10 [D13].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-10', tipo: 'resultados', hecho: 'Resultados del 1S26: ventas −1,4 %, margen bruto del 43,55 %, retrasos de entregas a EE. UU., 2S mejor que el 1S [A6].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-23', tipo: 'recomendación', hecho: 'FactSet: la mediana de BPA 2026 baja a 16,71 TWD (base antigua) desde 21,38 en mayo; objetivo medio de 863,64 desde 1.035; todos los analistas siguen en compra [D2, D3].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-02-04', tipo: 'venta de directivos', hecho: 'El presidente traspasa 7,69 M de acciones a sus sociedades patrimoniales (sin venta al mercado) [C1].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-09', tipo: 'resultados', hecho: 'Ventas de septiembre +7,2 % y del 3T26 +2,8 %; nueve meses −0,7 % [A7].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-13', tipo: 'resultados', hecho: 'Próximos resultados (3T26): estimación de Stock Analysis para el 13-nov; plazo legal el 14-nov [D3].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2026-11-13',
    veredicto: 'no cambia',
    condicion: null,
    comentario: 'La acción está en tendencia bajista: un 13 % por debajo de su media de 200 sesiones y un 33 % por debajo del máximo de febrero, con dos caídas fuertes esta semana que acompañan al mercado (beta alta) sin noticia propia [P1, P2]. Las noticias de los últimos 12 meses son de resultados (pausa de ventas en 2026), del consenso (recortes) y traspasos familiares sin venta al mercado; no hay colocaciones, ampliaciones de pago ni litigios. Nada de eso cambia la conclusión: con Mantener no hay orden que retrasar. Los resultados del 3T26 (≈13-nov) son el próximo dato.',
  },
  dcf_justificacion: {
    crecimiento: 'Ventas +3,2 % en 2026e (fijo): nueve meses −0,7 % y un 4T de ~9.000 M (+11 %) con las entregas a EE. UU. retrasadas en el 1S [A7, A8]. Después, +24 % en 2027e y +18 % en 2028e, por debajo del consenso (+26 % y +21 %) [D2]: la capacidad sube un 30 % en 2026 (Guanyin 3B) y la fábrica de Taichung entra en el 2T27, con una cartera de más de 30.000 M y visibilidad hasta 2029 [A1, A11]. Luego +10 %, +6 %, +4 % y +3 %: la escasez de transformadores en EE. UU. se cierra hacia 2028-2029 cuando entren las ampliaciones de los rivales [B2, B10].',
    margenes: 'Margen EBITDA del 24 % en 2026e (24,1 % en el 1S26) y del 24,5 % en 2027e-2028e, frente al 22,9 % de 2025 [A2, A5]. Desde 2029 baja al 18 % en 2032e: es un fabricante de transformadores en el pico de ciclo, con un margen bruto del 43,55 % que hace cuatro años era del 16 %, y suponemos que conserva parte de la mejora (exportación, escala) pero no toda [A4, A6]. El 18 % queda entre Hyosung (14 %) y HD Hyundai (27,5 %) [D4].',
    inversion: 'Capex del 8 % de las ventas en 2026e (896 M en el 1S26 más el resto de Guanyin 3B y Taichung), 6 % en 2027e, 4,5 % en 2028e y 3 % al final, por encima de la amortización (del 2 % al 2,5 %, que sube con los derechos de uso de Taichung) [A2, A5]. El capex incluye las altas de derechos de uso (NIIF 16): en 2025 entraron ~1.580 M de suelo arrendado sin pasar por caja. Circulante del 15 % de las ventas (el de 2025) hasta 2028e y subida al 18 % en 2031e porque los anticipos de clientes (38 % de las ventas hoy) se reducirán cuando los plazos de entrega se acorten [A2].',
    wacc: 'Todo en TWD. Tasa libre: bono de Taiwán a 10 años al 2,03 % (16-oct-2026) [D5]. Beta de 1,1, entre la mensual a cinco años (0,95) y la semanal a dos años (1,19) [D1]. Prima de mercado del 5,5 % y prima adicional de 1 punto por riesgo país (el estrecho de Taiwán) y por la concentración de clientes. Coste de la deuda del 2,5 % antes de impuestos y peso de la deuda del 2 % (caja neta). WACC del 8,94 %; con la prima implícita del mercado (4,20 %), 7,54 % [D6].',
    terminal: 'Gordon con crecimiento del 1,5 % en TWD, medio punto por debajo de la tasa libre (2,03 %), coherente con la inflación de Taiwán y un mercado de transformadores que crece por encima del PIB [B5]. El valor terminal pesa el 65 %. El múltiplo de salida implícito es de 8,4 veces el EBITDA, bajo frente a las 14-16 veces de las compras del sector [D8, D9]; con 12 veces de salida el terminal sería un 43 % mayor y el DCF seguiría muy por debajo del precio.',
  },
  puente_comentarios: {
    '2026e': 'Volumen −2 % por los retrasos de entregas a EE. UU.; precio y mezcla +5,2 % (más transformadores de potencia de exportación, margen bruto +5 puntos) [A6].',
    '2027e': 'Volumen +20 % con Guanyin 3B a pleno (+30 % de capacidad) y las entregas retrasadas; precio +4 % por pedidos firmados en 2024-2025 [A11, A1].',
    '2028e': 'Volumen +16 % con la fábrica de Taichung (muy alta tensión) desde el 2T27; precio +2 % [A11].',
    '2029e': 'Volumen +10 % al llenar Taichung; precio plano al entrar la capacidad nueva de los rivales en EE. UU. [B2].',
    '2030e': 'Volumen +8 % y precio −2 %: primera bajada de precios del ciclo [B4].',
  },
  sostenibilidad_justificacion: 'Sí. La proyección reinvierte el 23 % del NOPAT: al ROIC de 2025 (51,6 %) financia un 11,7 % de crecimiento anual, por encima del 9,7 % proyectado, y supone que el capital nuevo rinde solo un 16,7 %, muy por debajo del incremental histórico. La cuota pasa del 1,2 % al 1,5 % del mercado mundial en 2030, dentro del límite. El poder de precios está demostrado en este ciclo (margen bruto +25 puntos en cuatro años) y el crecimiento se apoya en capacidad física financiada y en una cartera firmada hasta 2029 [A1, A2]. El riesgo no es de financiación sino de precio: por eso el margen baja desde 2029.',
  dcf_lectura: 'El DCF da 183,70 TWD por acción, un 72,0 % por debajo del precio de 656 TWD, con el valor terminal en el 65 %. Con la prima implícita del mercado (WACC del 7,54 %) sale 225,69. El DCF inverso no encuentra solución: ni un margen EBITDA del 48 % (el nuestro final es del 18 %) ni un crecimiento razonable justifican el precio, que solo rinde un 3,6 % anual frente a un WACC del 8,94 %. Dicho de otra forma: el precio de hoy descuenta que el margen de pico de ciclo dura para siempre y que el crecimiento de dos dígitos sigue muchos años, algo que ningún fabricante de transformadores ha conseguido; en 2021-2022 Fortune ganaba un margen del 4-6 % [A4]. El DCF es muy conservador para un negocio en auge, pero la distancia es demasiado grande para atribuirla a los supuestos.',
  narrativas: {
    Bajista: 'Las ampliaciones de los rivales y el fin de la escasez en EE. UU. llegan antes: en 2028 las ventas caen un 5 % y el margen EBITDA baja al 18,5 %, como en el ciclo anterior cuando los precios se hundieron tras el auge de 2005-2008. Después el margen queda 3 puntos por debajo del base por aranceles y competencia coreana con fábricas en EE. UU.',
    Base: 'Se cumplen las ampliaciones: ventas de 36.879 M TWD en 2028 con margen EBITDA del 24,5 %, y después normalización hacia el 18 % con crecimiento del 3-10 %.',
    Alcista: 'Los centros de datos de IA y la red de EE. UU. mantienen la escasez hasta 2030: ventas 3 puntos por encima del base cada año y margen 1,5 puntos mayor.',
  },
  escenarios_comentario: 'La asimetría es muy negativa en valor intrínseco: el alcista vale 222,90 TWD (−66,0 %) y el bajista 107,16 (−83,7 %); hasta el caso bueno queda muy por debajo de la cotización, porque el precio pide más que nuestro alcista. El bajista es verosímil: los transformadores ya han tenido ciclos largos de precios a la baja y Fortune ganaba un margen del 4-6 % hace cuatro años [A4]. Lo que no podemos medir es cuánto aguanta la escasez en EE. UU.: si dura hasta 2030 el alcista se queda corto, pero ni así se acerca al precio.',
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 11.3, multiplo: null, precio: null, justificacion: 'Ventas de 2028e de 28.973 M TWD (+21 % en 2027e y −5 % en 2028e) con margen EBITDA del 18,5 %: EBIT de 4.665 M, +300 M no operativos, impuesto del 22 % y +60 M de pérdidas de minoritarios; 3.933 M entre 347,47 M de acciones. Fin de la escasez y bajada de precios.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 19.4, multiplo: null, precio: null, justificacion: 'Ventas de 36.879 M TWD con margen EBITDA del 24,5 % y amortización del 2,4 %: EBIT de 8.150 M, +400 M no operativos (intereses de la caja y otros), impuesto del 22 % y +60 M de minoritarios: 6.729 M entre 347,47 M de acciones. Cuadre con 2025: (5.227,2 + 381,9) × (1 − 22,1 %) + 52,3 = 4.421 M ≈ 4.419,4 publicado [A2].' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 21.7, multiplo: null, precio: null, justificacion: 'Ventas de 38.733 M TWD (+27 % y +21 %) con margen EBITDA del 26 %: EBIT de 9.141 M y 7.541 M de beneficio atribuido. Escasez que dura y precios firmes.' },
  ],
  per_excluidos: 'Historia adelantada (cierre ajustado de cada año ÷ BPA real del año siguiente, base de 347,47 M de acciones): dic-2023 19,9x (245,68 ÷ 12,33); dic-2024 36,6x (465,29 ÷ 12,72); dic-2025 51,4x (695,45 ÷ 13,52, nuestro BPA de 2026e). Fuera dic-2020 (45x), dic-2021 (11,6x, con el BPA de 2022 inflado por la plusvalía) y dic-2022 (4,9x): son de antes del cambio de negocio (margen de explotación del 4-6 %). Historia de 3 años: el selector toma la más baja de v3 y v2. Actual: 656 ÷ 16,72 (nuestro BPA de 2027e) = 39,2x.',
  per_excluidos_v2: 'Historia al cierre (precio ÷ BPA del mismo año): 2023 33,1x (245,68 ÷ 7,42); 2024 37,7x (465,29 ÷ 12,33); 2025 54,7x (695,45 ÷ 12,72). Fuera 2020-2022 por el cambio de negocio y la plusvalía de 2022.',
  diferencia_consenso: 'Nuestro BPA de 2028e (19,40 TWD) queda un 23 % por debajo del consenso de FactSet pasado a la base nueva (25,22): ventas un 11 % más bajas (36.879 frente a 41.490 M) por un 2026 casi plano y un margen neto del 18,2 % frente al ~21 % que implica el consenso [D2]. La diferencia es de margen: el consenso extrapola el margen bruto del 1S26; nosotros lo mantenemos y empezamos a bajarlo en 2029. Nuestro base a 12 meses (735,26 TWD) queda un 14,9 % por debajo del objetivo medio (863,64) [D2].',
  objetivo_comentario: 'El objetivo a 12 meses (599,58 TWD) queda muy por encima del valor intrínseco (231,40): la distancia es la prima que el mercado paga por el crecimiento y que el DCF no reconoce. El base (37,9 veces × 19,40 = 735,26, +13,6 % con dividendo) supone que el mercado sigue pagando cerca de su mediana corta; el bajista (19,9 veces, el PER adelantado de 2023, × 11,30 = 224,87) es lo que pasa si el ciclo gira, y pesa un 30 %. La ponderada es del −7,1 %: Mantener, y a solo un 3 % de la zona de venta (677,31).',
  valoracion_comentario: 'Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; sin transacciones (compras de control a 14-16 veces el EBITDA que no aplican a una empresa controlada por la familia) ni suma de partes. Todos los métodos de valor quedan por debajo del precio: DCF 183,70 TWD, escenarios ponderados en torno a 160, comparables por PER 358-536 y por EV/EBITDA 285-377, transacciones 165-309. La síntesis da un valor intrínseco de 231,40 TWD (−64,7 %); con la prima implícita del mercado, 263,33. La recomendación la decide la regla a 12 meses (ponderada −7,1 %, base +13,6 %): Mantener.',
  catalizadores: {
    items: [
      { fecha: '≈13-nov-2026', evento: 'Resultados del 3T26', efecto: 'Margen bruto tras el 43,55 % del 1S y cartera de pedidos', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'nov-2026 a ene-2027', evento: 'Ventas mensuales de octubre a diciembre', efecto: 'Confirmarían o no un 4T de ~9.000 M y el 2S mejor que el 1S', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Guanyin 3B a pleno y fábrica de Taichung (2T27)', efecto: 'Capacidad +30 % y después el doble en 2027-2028', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'Aranceles de EE. UU. sobre equipos de Taiwán', efecto: 'Más coste compartido o exención para equipos de red', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-2028', evento: 'Entrada de capacidad nueva de Hitachi, Siemens, Prolec y coreanos en Norteamérica', efecto: 'Precios y plazos de entrega a la baja', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'jun-2027', evento: 'Junta: dividendo de 2026 y renovación del consejo', efecto: 'Rentabilidad por dividendo del ~1,5-2 %', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Fin de la escasez de transformadores y normalización de precios y márgenes', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−42 % (escenario bajista: 107,16 frente a 183,70 TWD); −66 % a 12 meses en el bajista', mitigante: 'Cartera firmada hasta 2029 con anticipos y cláusulas de arancel [A1, A6].', senal: 'Plazos de entrega en EE. UU. por debajo de 2 años o pedidos nuevos por debajo de las ventas.' },
      { riesgo: 'Valoración: 39 veces el BPA de 2027e y DCF inverso sin solución', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−65 % hasta el valor intrínseco; −9 % hasta el objetivo a 12 meses', mitigante: 'Ninguno operativo.', senal: 'Nuevos recortes del consenso tras el 3T26.' },
      { riesgo: 'Concentración de clientes (tres clientes, 49 % de las ventas) y clientes nuevos', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % si un cliente de exportación cancela o aplaza', mitigante: 'Taipower como primer cliente y homologaciones en varias eléctricas de EE. UU. [A2].', senal: 'Caída del peso de los clientes B o C o más retrasos de entregas.' },
      { riesgo: 'Aranceles de EE. UU. sobre productos de Taiwán', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % por 2 puntos de margen menos de forma permanente', mitigante: 'Cláusulas de arancel en contratos nuevos; en los enviados comparte el 30-40 % [A10].', senal: 'Subida de gastos comerciales por encima del 15 % de las ventas.' },
      { riesgo: 'Riesgo país: tensión en el estrecho de Taiwán', tipo: 'Geopolítico', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Pérdida grave: todas las fábricas están en Taiwán', mitigante: 'Ninguno: no tiene fábricas fuera [A1].', senal: 'Bloqueos o sanciones que afecten al transporte marítimo.' },
      { riesgo: 'Gobierno familiar y proyectos ajenos al negocio', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 % (capital en centro comercial, recarga e hidrógeno)', mitigante: 'Son pequeños frente al grupo; 4 independientes en la comisión de auditoría [C1].', senal: 'Más capital a Fortune Nev o nuevas filiales fuera de la red eléctrica.' },
      { riesgo: 'Ejecución de la ampliación (Guanyin 3B y Taichung)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % si el crecimiento de 2027e se queda en el 12 %', mitigante: 'Financiada con caja propia y anticipos [A2].', senal: 'Retrasos en la puesta en marcha de Taichung más allá del 2T27.' },
    ],
    premortem: 'Octubre de 2028: la acción vale la mitad. En 2027 las ventas crecieron con Guanyin 3B, pero a finales de año los rivales coreanos y los grandes europeos abrieron fábricas en EE. UU., los plazos de entrega bajaron de tres años a uno y las eléctricas dejaron de pagar anticipos. Los pedidos nuevos de Fortune se firmaron a precios un 15 % más bajos, el margen bruto volvió al 30 % y el consenso, que esperaba 25 TWD de BPA para 2028, bajó a 15. El mercado dejó de pagar 40 veces y pasó a pagar 20, como en 2023. La señal estaba en 2026: ventas planas pese a la cartera y recortes del consenso del 22 %.',
    ia: {
      exposicion: 'Alta', sentido: 'Positivo', efecto_valor: '+10 % / −25 % a 3-5 años',
      comentario: 'La IA toca a Fortune por la demanda, no por la sustitución: unos 22.000 M TWD de su cartera están ligados a centros de datos de IA en EE. UU. (incluido Stargate) y son la parte más rentable y la que sostiene la prima del precio [A6, A11]. No hay riesgo de que la IA sustituya un transformador. El riesgo es el contrario: que el ciclo de inversión en centros de datos frene o se retrase por falta de energía, y que el mercado deje de ver a Fortune como un valor de IA. Con la acción cotizando como tal, un frenazo del capex de IA costaría bastante más que su peso en las ventas.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Cartera', pregunta: '¿Cuál es hoy la cartera de pedidos total, a qué margen bruto se firmó la de 2026 y qué parte tiene precio revisable?', por_que: 'Decide si el margen de 2027-2028 puede mantenerse en el 24,5 %.' },
      { tema: 'Retrasos', pregunta: '¿Los retrasos de entregas a EE. UU. del 1S26 se recuperan en el 4T26 o pasan a 2027?', por_que: 'Explica la diferencia entre nuestro 2026e y el consenso.' },
      { tema: 'Aranceles', pregunta: '¿Qué parte de las ventas de 2026 lleva cláusula de arancel y cuánto costó el arancel compartido en 2025?', por_que: 'Los gastos comerciales casi se duplicaron en 2025.' },
      { tema: 'Capacidad', pregunta: '¿Qué capacidad en MVA añaden Guanyin 3B y Taichung y con qué ocupación arranca Taichung?', por_que: 'Es el motor del +24 % y +18 % de 2027-2028.' },
      { tema: 'Clientes', pregunta: '¿Quiénes son los clientes B y C y qué duración tienen sus contratos?', por_que: 'Tres clientes son casi la mitad de las ventas.' },
      { tema: 'Asignación de capital', pregunta: '¿Cuánto capital más irá al centro comercial (Fortune Nev), la recarga y el hidrógeno?', por_que: 'Es capital fuera del negocio que crea el valor.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: '**La recomendación y por qué.** Mantener, con convicción media: las dos reglas coinciden y la ponderada está lejos del umbral de compra, pero el precio está a solo un 3 % de la zona de venta y el BPA de 2028e depende de cuánto dure la escasez; subiría la convicción un 3T26 con margen bruto por encima del 43 % y la bajaría un nuevo recorte del consenso. El objetivo a 12 meses es de 599,58 TWD, con una rentabilidad ponderada del −7,1 % y del +13,6 % en el caso base (con dividendo), frente a un precio de 656 TWD; el valor intrínseco es de 231,40 TWD, un 64,7 % por debajo, y el objetivo medio de los analistas, 863,64. No es Comprar porque la ponderada no llega al 15 % y el valor intrínseco queda muy por debajo del precio; no es Vender porque la ponderada está por encima del −10 %. **El negocio.** Fortune Electric es el primer fabricante de transformadores de Taiwán y el que más exporta a EE. UU., donde faltan transformadores: ventas de 9.020 M TWD en 2021 a 24.423 M en 2025 y margen de explotación del 4 % al 21 % [A2]. El ROIC de 2025 es del 51,6 % frente a un WACC del 8,94 %, inflado por los anticipos de clientes y por el pico de ciclo. **La duda.** 2026 trae ventas planas (nueve meses −0,7 %) y el consenso recorta un 22 % [A7, D2]; el precio, a 39 veces nuestro BPA de 2027e, descuenta que el margen de pico dura. Sostenibilidad del crecimiento: «Sí» (financiable con capital propio y cartera firmada), pero el riesgo es de precio, no de volumen. **Qué cambiaría la recomendación.** Por debajo de 231,40 TWD sería compra en valor; por encima de 677,31 TWD la regla daría Vender.',
    tesis: 'Fortune Electric aprovecha la mayor escasez de transformadores en décadas: en EE. UU. falta un 30 % de la oferta de transformadores de potencia y los plazos de entrega son de 2-3 años [B2]. Es el primer fabricante de Taiwán, con el 60 % del mercado local de potencia, y ha convertido la exportación en el 55 % de sus ventas, con margen bruto del 40-44 % y una cartera hasta 2029 [A1, A6]. El negocio es excelente hoy, pero cíclico: hace cuatro años ganaba un 4-6 % de margen. A 656 TWD el mercado paga 39 veces nuestro beneficio de 2027e, más del doble que sus comparables coreanos, y el DCF no encuentra supuestos razonables que lo justifiquen.',
    vision_diferencial: {
      mercado_descuenta: 'Un valor de IA con crecimiento de dos dígitos durante años: el consenso espera un BPA de 25,22 TWD en 2028 (base nueva) y un objetivo medio de 863,64, con todos los analistas en compra [D2, D3].',
      nuestra_vision: 'Un fabricante de transformadores en el pico de un ciclo largo: crecerá con la capacidad nueva en 2027-2028, pero con un BPA de 2028e de 19,40 TWD (−23 % frente al consenso) y un margen que empezará a bajar cuando entre la capacidad de los rivales.',
      por_que: 'Las ventas de 2026 ya se han frenado pese a la cartera y el consenso lleva cinco meses recortando; si el 3T26 (≈13-nov) no confirma el 4T fuerte, los recortes siguen.',
    },
    a_favor: [
      '**Escasez estructural en EE. UU.**: déficit del 30 % en transformadores de potencia y plazos de 2-3 años [B2].',
      '**Rentabilidad muy alta**: ROIC del 51,6 % frente a un WACC del 8,94 % (≈26 % sin anticipos de clientes).',
      '**Cartera firmada hasta 2029**, con 22.000 M ligados a centros de datos de IA [A6, A11].',
      '**Balance con caja neta** y anticipos de clientes que financian el crecimiento [A5].',
      '**Capacidad +30 % en 2026 y el doble en 2027-2028**, financiada con caja propia [A1, A11].',
    ],
    en_contra: [
      '**Precio exigente**: 39 veces nuestro BPA de 2027e; valor intrínseco de 231,40 TWD (−64,7 %) y DCF inverso sin solución.',
      '**Pico de ciclo**: margen bruto del 43,55 % frente al 16 % de 2021; los rivales amplían capacidad [A4, B10].',
      '**2026 plano**: ventas de nueve meses −0,7 % y consenso recortando un 22 % desde mayo [A7, D2].',
      '**Clientes concentrados y aranceles**: tres clientes el 49 % de las ventas; aranceles de EE. UU. compartidos [A2, A10].',
      '**Gobierno familiar** con proyectos ajenos al negocio (centro comercial, recarga, hidrógeno) [C1].',
    ],
    que_vigilar: 'La tesis de Mantener depende de que 2027 recupere el crecimiento con la capacidad nueva sin que el margen bruto baje del 40 %. Nos equivocaríamos por arriba si el 4T26 supera los 10.000 M de ventas y la cartera sigue creciendo con margen; por abajo, si los plazos de entrega en EE. UU. bajan de dos años o el margen bruto trimestral cae por debajo del 38 %.',
    cambiaria_recomendacion: [
      'Si el precio baja de 231,40 TWD, el valor intrínseco justificaría comprar (y la regla a 12 meses también).',
      'Si el precio sube por encima de 677,31 TWD, la regla a 12 meses daría Vender.',
      'Si el margen bruto del 3T26 o del 4T26 baja del 38 %, revisaríamos el BPA a la baja y probablemente pasaríamos a Vender.',
      'Si las ventas del 4T26 superan los 10.000 M TWD con margen bruto por encima del 43 %, subiríamos el caso base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas mensuales (interanual)', nivel_actual: '+7,2 % (sep-2026); nueve meses −0,7 %', umbral_alerta: '4T26 por debajo de 8.100 M (plano)', por_que: 'Confirma si los retrasos se recuperan.' },
      { kpi: 'Margen bruto trimestral', nivel_actual: '43,55 % (1S26)', umbral_alerta: '< 38 %', por_que: 'Primera señal de normalización de precios.' },
      { kpi: 'Pasivos de contrato (anticipos)', nivel_actual: '9.314 M (jun-2026)', umbral_alerta: 'Caída de dos trimestres', por_que: 'Mide la escasez y financia el circulante.' },
      { kpi: 'Consenso de BPA 2027e (FactSet)', nivel_actual: '23,21 base antigua (21,10 nueva)', umbral_alerta: 'Nuevos recortes > 10 %', por_que: 'Mueve el múltiplo.' },
      { kpi: 'Plazos de entrega de transformadores de potencia en EE. UU.', nivel_actual: '2-3 años', umbral_alerta: '< 18 meses', por_que: 'Fin de la escasez.' },
    ],
  },
};
