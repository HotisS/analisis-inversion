// Textos del analista (United Therapeutics, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio natural, US GAAP. Último trimestre publicado: 2T26 (30-jun-2026); el 3T26 se publica hacia el 28-oct-2026 (fecha estimada por el calendario de 2025, sin confirmar). Precio: cierre del 20-oct-2026 (553,88 USD); la sesión del 21-oct no había abierto al hacer el análisis y la decisión se comprueba con el precio del día en las pruebas de robustez. El BPA de la regla a 12 meses es el GAAP diluido (la empresa no publica ajustado y el consenso de Yahoo es GAAP) y no incluye el cobro del acuerdo con Liquidia (330,4 M USD en tres plazos, no recurrente), que va al puente después de impuestos. Las acciones son las de después de las recompras de septiembre (45,2 M diluidas) y la caja del puente resta lo pagado desde el 30-jun. Sin calificación de crédito (no tiene deuda). Precio de una acción en EUR: ≈ 475 EUR, un 1,6 % de una cartera de 30.000 EUR.',
  controles_explicados: [
    { control: 'Capitalización calculada ≈ publicada', explicacion: 'La capitalización publicada (23.756 M USD) usa las 42,9 M de acciones en circulación (básicas); la calculada (25.035 M) usa 45,2 M diluidas: 41,96 M básicas después de la ASR de septiembre más ≈ 3,2 M de opciones dentro del dinero (45,8 M diluidas frente a 42,6 M básicas en el 2T26) [D5, D6]. Es la misma base que el BPA, y la diferencia (5 %) es la dilución de las opciones de la fundadora y los directivos.' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    rentabilidad: {
      comentario: 'United Therapeutics crea mucho valor: el ROIC fue del 53,6 % en 2025 frente a un WACC del 10,5 %, y ha estado por encima del 37 % desde 2021. Lo mueve el margen, no la rotación: un 46,9 % de margen operativo con un capital invertido de ≈ 2.200 M USD que es, sobre todo, fábricas y las granjas de órganos; la caja (4.697 M en 2025) no cuenta como capital [A1]. El ROIC incremental (71,8 % en 2021-2025) dice que el crecimiento de Tyvaso DPI se hizo casi sin capital, porque la fabricación del polvo la hace en parte MannKind. El ROE (19,7 %) es mucho menor que el ROIC por la caja acumulada. La tendencia es a la baja: el capex se disparó a 526 M en 2025 por las granjas de xenotrasplante, que aún no venden nada, y el ROIC bajará si el programa de órganos no llega a ventas antes de 2030. Frente a los comparables (Vertex, Regeneron, Neurocrine), es de los más rentables del grupo [D2].',
      confianza: 'Media',
    },
    capital: {
      politica: 'No paga dividendo. La prioridad declarada es reinvertir en la cartera (FPI, ralinepag, órganos) y devolver el exceso con recompras: ASR de 1.000 M USD en 2024 y otra de 1.000 M en agosto de 2025; en marzo de 2026, un programa de 2.000 M con una ASR de 1.500 M (2,76 M de acciones de entrega inicial) y, el 8-sep-2026, una ASR de 477,6 M que agota la autorización (más 22,4 M en mercado) [A9, A10, A11]. Tras eso no hay recompra autorizada pendiente. La caja (3.803 M a 30-jun-2026, sin deuda) y una línea de crédito no dispuesta de 2.500 M hasta 2031 permiten otra ronda si el consejo la aprueba [A2].',
      adquisiciones: [
        { anio: '2023', objetivo: 'Miromatrix Medical (riñón y hígado fabricados con matrices de cerdo)', importe: 89, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin ventas: ensayo de fase 1 del hígado extracorpóreo terminado en enero de 2026; es una opción de I+D, no un negocio [A1].' },
        { anio: '2019', objetivo: 'Licencia de ralinepag (Arena Pharmaceuticals)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Llevada a gasto de I+D (pérdida de 2,39 USD por acción en 2019); el ensayo ADVANCE OUTCOMES redujo un 55 % el riesgo de empeoramiento y la NDA se presentó en el 3T26: si se aprueba, debe pagar 250 M a Arena por la versión inhalada y 150 M por la primera aprobación en Europa o Japón de la oral [A1, B11].' },
      ],
      comentario: 'Buena asignadora de capital con un matiz. De 2021 a 2025 generó 4.005 M USD de flujo libre (85 % del beneficio) y devolvió 2.000 M con recompras, a precios de 280-480 USD, por debajo del de hoy; en 2026 ha recomprado otros 2.000 M a ≈ 500-545 USD [A9, A10]. Las acciones diluidas han bajado de 48,5 M en 2024 a ≈ 45,2 M. Las compras han sido pequeñas y de I+D (ralinepag, Miromatrix), y ralinepag ha salido bien. El matiz es el programa de órganos: ≈ 1.000 M de capex desde 2023 en tres granjas de cerdos y laboratorios, más la I+D, para un mercado que no existe todavía [A1, B13]. La fundadora lo defiende como misión (la empresa es corporación de beneficio público); para el accionista es una opción cara con un retorno a más de cinco años. La dilución de las opciones (≈ 3,2 M de acciones, 7 %) es alta para una empresa de este tamaño [D5].',
      confianza: 'Media',
    },
    bolsa: {
      contexto: {
        movimiento: { fecha: '2026-10-20', var_1m_pct: 12.3, var_3m_pct: 5.1, var_6m_pct: -3.4, var_12m_pct: 27.8, dist_max_52s_pct: -7.2, dist_min_52s_pct: 33.4, dist_max_historico_pct: -7.2, tendencia: 'lateral', volatilidad_60d_pct: 37.0, avisos: [] },
        movimientos_fuertes: [
          { periodo: '2-sep-2025', var_pct: 32.8, causa: 'TETON-2: Tyvaso nebulizado mejora la capacidad pulmonar en la FPI (+95,6 mL de FVC frente a placebo) [B14, D1].', veredicto: 'no cambia', condicion: null },
          { periodo: '26-feb-2026', var_pct: -5.9, causa: 'Recogida de beneficios tras el +13 % del 25-feb por los resultados de 2025 (ventas +11 %); sin noticia nueva de la empresa en el 8-K [A5, D1].', veredicto: 'no cambia', condicion: null },
          { periodo: '30-mar-2026', var_pct: 12.5, causa: 'TETON-1 confirma el resultado en FPI (+130,1 mL de FVC; conjunto +111,8 mL) [B10, D1].', veredicto: 'no cambia', condicion: null },
          { periodo: '30-sep-2026', var_pct: 12.5, causa: 'El tribunal de Delaware dicta que Yutrepia infringe las reivindicaciones 1 y 14 de la patente 327 (PH-ILD); Liquidia cae un 57 % [B8, D1].', veredicto: 'no cambia', condicion: null },
          { periodo: '2-oct-2026', var_pct: -5.2, causa: 'Recogida de beneficios tras subir un 18 % en dos sesiones (30-sep y 1-oct); sin noticia de la empresa [D1, D11].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-20', tipo: 'resultados', hecho: 'Abre su tercera granja de cerdos para xenotrasplante (Texas); el capex de órganos sigue alto [B13].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-14', tipo: 'demanda o regulador', hecho: 'Acuerdo con Liquidia: Yutrepia retira la PH-ILD de su etiqueta y sigue en HAP; Liquidia paga 185 M USD en 30 días hábiles y 145,4 M en dos plazos (enero y abril de 2027); United Therapeutics paga 10 M [A12].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-24', tipo: 'recomendación', hecho: 'Goldman Sachs empieza a cubrirla con Vender; la acción cae un 3,5 % [D11].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-08', tipo: 'ampliación o convertible', hecho: 'ASR de 477,6 M USD que agota la autorización de recompra de 2.000 M; liquidación final en el 4T26 [A10].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-02', tipo: 'demanda o regulador', hecho: 'La FDA acepta el sNDA de Tyvaso en FPI con revisión estándar (decisión a finales de abril de 2027), no prioritaria; −4 % ese día [B12].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-21', tipo: 'directivos', hecho: 'Ventas de directivos de 1.442 M USD en 12 meses (905 M de la fundadora), el 99 % con planes 10b5-1 y casi todas tras ejercer opciones que vencían; compras de 0,86 M [C3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26 (fecha estimada): consenso de BPA de 6,06 USD y ventas de 783 M [D2].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-10-28',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La acción sube un 12,3 % en un mes por la sentencia del 30-sep y el acuerdo con Liquidia del 14-oct, y está un 7,2 % por debajo de su máximo de mayo; en seis meses se ha movido de lado (−3,4 %) y la media de 200 sesiones es lateral [D1]. Cada movimiento fuerte tiene causa en un hecho de la empresa (ensayos, sentencia, recompras); no hay colocaciones ni ampliaciones, y las ventas de la fundadora son ejercicios de opciones con planes 10b5-1 que vienen de años atrás [C3]. Los resultados del 3T (≈ 28-oct) llegan en menos de 15 días, pero la tendencia no es bajista, así que no retrasan (regla 13). Veredicto: no cambia.',
      },
    },
  },
  dcf_justificacion: {
    crecimiento: '2026e (−0,4 %, fijo): el 1S26 cayó un 2 % (781,5 y 783,3 M) por Yutrepia y Winrevair en Tyvaso nebulizado y Remodulin, con Tyvaso DPI +4 % [A3, A4]; consenso 3.196 M [D2]. 2027e (+11,4 %): Tyvaso recupera la PH-ILD (acuerdo con Liquidia), la FPI se aprueba a finales de abril y ralinepag a fin de año, menos los genéricos de Orenitram (junio y diciembre) y el fin de Adcirca [A12, B9, B12]; el consenso pide +13,9 %. 2028e (+14,2 %): primer año entero de FPI, un mercado de 4.046 M en 2025 [B4]. Luego baja al 2 %: patentes de Tyvaso DPI hasta 2030-2035 [A1]. TCAC histórica de 2021-2025: 17,2 %.',
    margenes: 'Margen EBITDA del 45,5 % en 2026e (45,0 % en el 1S26 por la I+D de órganos y la preparación del lanzamiento en FPI; 49,6 % en 2025) [A1, A3]. Sube al 49,5 % en 2030e con la escala de la FPI y ralinepag, sin pasar del de 2025, y baja al 48,5 % al final cuando la competencia de genéricos y Yutrepia en HAP pese más. El margen incluye la remuneración en acciones y la regalía del 10 % a MannKind por Tyvaso DPI [A1]. Es de los más altos del grupo de comparables [D2].',
    inversion: 'Capex del 13 % de las ventas en 2026e (208,8 M en el 1S26 más 104,1 M sin pagar [A2]) y del 10 % en 2027e: las granjas de Minnesota y Texas y la fábrica de Tyvaso DPI. Baja al 4,5 % en 2031e, el nivel de 2021-2022 (6-7 %) menos las granjas terminadas, siempre por encima de la amortización (4 %). Circulante comercial del 16 % de las ventas, el de 2024-2025 (clientes de 2 meses y existencias) [A1]. Las recompras no entran en la proyección.',
    wacc: 'Tasa libre del 5,12 % (Tesoro a 10 años, 20-oct-2026 [D3]); beta de 0,80, por encima de la medida (0,50 mensual a 5 años; 0,67 ajustada [D1]) porque la acción se mueve por hechos binarios (ensayos, juicios) que la beta no recoge; prima del 5,5 % y prima adicional de 1 punto por la concentración en una molécula con genéricos a la vista. Sin deuda: WACC del 10,52 %. Con la prima implícita del mercado (4,20 % [D4]) el WACC baja al 9,48 % y el DCF sube a 569,42 USD.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %, por debajo de la tasa libre menos dos puntos y medio: en 2033e el treprostinil tendrá genéricos en todas sus formas salvo la PH-ILD (patente de 2042) y la FPI, y lo que crezca dependerá de ralinepag y de los órganos, que no proyectamos [A1]. El múltiplo de salida implícito es de 9 veces el EBITDA, por debajo de las 14 veces a las que cotiza hoy: es prudente para un negocio que pierde patentes. El valor terminal pesa un 61 %.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +1,5 % (Tyvaso DPI y PH-ILD) y precio +1 %, menos 2,9 puntos de pacientes que pasan a Yutrepia y Winrevair en Tyvaso nebulizado y Remodulin [A3, A4].',
    '2027e': 'Volumen +9,4 %: PH-ILD sin Yutrepia, FPI desde mayo y ralinepag a final de año, menos Orenitram genérico y Adcirca; precio +2 % [A12, B9, B12].',
    '2028e': 'Volumen +12,2 %: primer año completo de FPI (≈ 4.000-5.500 M de mercado [B4]) y ralinepag; precio +2 %.',
    '2029e': 'Volumen +10,9 % con la FPI aún en crecimiento; genérico de Tyvaso nebulizado en el caso base.',
    '2030e': 'Volumen +6,1 %: la FPI madura y Tyvaso DPI empieza a perder patentes.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (7,9 % anual en 2026e-2033e) queda por debajo del histórico (17,2 % en 2021-2025) y casi no pide capital: la reinversión acumulada es el 10 % del NOPAT, con un ROIC del 53,6 %. La cuota implícita en 2030e (31,3 % del mercado de HAP más FPI, frente al 25,6 % de hoy [B2, B4]) está dentro del margen de la prueba (1,22 veces) y se apoya en una indicación nueva ya estudiada en dos ensayos positivos (TETON-1 y TETON-2 [B10, B14]) y en la PH-ILD protegida hasta 2042. Las tres pruebas pasan. El riesgo no es la calidad sino la aprobación: si la FDA no aprueba la FPI en abril de 2027, el crecimiento de 2027-2029 desaparece (bajista).',
  dcf_lectura: 'El DCF da 505,50 USD por acción, un 8,7 % por debajo del precio, con un WACC del 10,52 % y un valor terminal que pesa el 61 %. El DCF inverso dice que el precio descuenta un crecimiento del 10,1 % anual en 2027e-2033e con nuestro margen, frente al 7,9 % de nuestro base, o un margen del 53,5 % con nuestro crecimiento: el mercado ya paga una FPI con éxito y algo más (ralinepag, órganos o una erosión de los genéricos más lenta). Es exigente frente a la historia de la empresa, que cotizó a 7-15 veces el beneficio del año siguiente porque siempre tuvo genéricos a la vista. Con la prima de riesgo que hoy pide el mercado (4,2 %), el DCF sube a 569,42 USD (+2,8 %): la diferencia entre caro y justo está en la tasa. El rango con ± 0,5 puntos de WACC y crecimiento terminal (466,54-555,32 USD) deja el precio en el borde alto.',
  narrativas: {
    Bajista: 'La FDA retrasa o limita la FPI, Yutrepia gana cuota en HAP (Liquidia espera más de 1.000 M en 2027) y Winrevair desplaza a las prostaciclinas a líneas posteriores; los genéricos de Orenitram y Tyvaso nebulizado llegan en 2027 y se llevan la mitad de esas ventas en un año. Crecimiento 4 puntos menor y margen 3 puntos menor.',
    Base: 'FPI aprobada en abril de 2027 y ralinepag a final de año; Tyvaso recupera la PH-ILD sin Yutrepia; Orenitram y Tyvaso nebulizado pierden ventas con los genéricos; margen del 46-49 %.',
    Alcista: 'La FPI se lanza con fuerza (un 20-25 % de los pacientes tratados con antifibróticos en 2029) y ralinepag gana cuota a Uptravi; los genéricos tardan: 3 puntos más de crecimiento y 1,5 puntos más de margen.',
  },
  escenarios_comentario: 'La asimetría es desfavorable: el alcista vale 588,62 USD (+6,3 %) y el bajista 369,70 (−33,3 %), asimetría de 0,19 veces. El alcista no sube más porque el WACC (10,5 %) y la pérdida de patentes después de 2030 limitan el valor terminal; el bajista cae mucho porque la FPI es casi todo el crecimiento de 2027-2030. El valor ponderado de los escenarios queda un 12 % por debajo del precio.',
  suma_partes_comentario: 'No aplica: todas las ventas son del treprostinil (85 %) y de Unituxin (7 %), con los mismos clientes y la misma fábrica [A1]. El programa de órganos (xenotrasplante de riñón y corazón, órganos fabricados) no tiene ventas y no se puede valorar por múltiplos: es una opción. Si se le diera un valor (por ejemplo, lo invertido, ≈ 1.000-1.500 M USD), sumaría 22-33 USD por acción; no lo sumamos porque su primera venta comercial no llegará antes de 2029-2030 y depende de la FDA.',
  casos_12m: {
    Bajista: 'Ventas un 4 % menos al año en 2027e-2028e y margen 3 puntos menor: FPI retrasada, Yutrepia y Winrevair ganan cuota en HAP y los genéricos de Orenitram y Tyvaso nebulizado llegan pronto. BPA de 30,69 USD en 2028e (−12 % frente al base) y el PER vuelve al mínimo adelantado de cinco años (8,9 veces, el del cierre de 2023, con el miedo a Yutrepia).',
    Base: 'Ventas de 3.531 M en 2027e y 4.033 M en 2028e (FPI y ralinepag aprobadas), margen EBITDA del 48 %, amortización del 3,4 %, intereses de la caja de 195 M, tipo del 21 % y 45,2 M de acciones sin recompras nuevas: BPA de 34,84 USD (+14,5 % anual desde los 26,6 de 2026e).',
    Alcista: 'Lanzamiento fuerte de la FPI y genéricos que tardan: ventas un 3 % más al año y margen 1,5 puntos mayor, BPA de 37,65 USD. La regla no da más PER que el base porque la historia (mediana de 14,0 veces) y los comparables (13,2) están por debajo.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (26,60 USD) coincide con el consenso; el de 2027e (29,77) queda un 6 % por debajo del consenso (31,72) por el margen: suponemos un 47 % de EBITDA con los costes de lanzamiento de la FPI y la I+D de órganos, frente a ≈ 49 % implícito en el consenso, y unas ventas de 3.531 M frente a 3.640 M porque restamos antes los genéricos de Orenitram [D2]. El precio base (588,80 USD) queda un 11 % por debajo del objetivo medio de los analistas (662,07): ellos mantienen ≈ 19-21 veces y la regla común baja el PER a 16,9 veces (tope de ÷1,1) camino de la mediana de cinco años (14,0).',
  objetivo_comentario: 'El objetivo a 12 meses (521,76 USD, ponderado) queda un 5,8 % por debajo del precio y el valor intrínseco (485,24) un 12,4 %. El base (588,80 USD, +6,3 %) supone que el BPA crece un 14,5 % anual hasta 2028e y que el PER baja de 18,6 a 16,9 veces; el bajista (273,14) es el PER de finales de 2023 (8,9 veces) sobre un BPA un 12 % menor, y es lo que hunde la ponderada. El catalizador que cerraría la distancia es la aprobación de la FPI a finales de abril de 2027: con ella, el bajista pierde peso. Para comprar haría falta un precio de 453,70 USD (−18 %); para vender, uno por encima de 579,73.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF es el método más fiable para un negocio con patentes que vencen en fechas conocidas: recoge que el beneficio de hoy no es perpetuo. Los escenarios recogen la asimetría (bajista −33 %, alcista +6 %). Los comparables pesan poco porque los demás tienen patentes más largas o menos caja, y su PER (mediana de 13,2 veces) da 359-462 USD. Las transacciones no pesan: son compras de un producto en crecimiento a 12-21 veces las ventas, con prima de control, y una oferta es improbable con una corporación de beneficio público y la fundadora al mando. El valor objetivo de la síntesis es de 485,24 USD (−12,4 %); con la prima del mercado, 538,10 (−2,8 %). La caja (3.803 M menos 247 M de ajustes) supone ≈ 79 USD por acción.',
  catalizadores: {
    items: [
      { fecha: '2026-10-28 (estimada)', evento: 'Resultados del 3T26', efecto: 'Primera lectura de Tyvaso tras la sentencia; consenso de BPA de 6,06 USD y ventas de 783 M', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11 y 2027-01/04', evento: 'Cobro del acuerdo con Liquidia (185 M en 30 días hábiles; 145,4 M en enero y abril de 2027)', efecto: '≈ 5,6 USD por acción después de impuestos', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-04 (finales)', evento: 'Decisión de la FDA sobre Tyvaso nebulizado en FPI', efecto: 'El crecimiento de 2027-2030; sin aprobación, el bajista', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-06', evento: 'Genérico de Orenitram de Actavis (ANI en diciembre)', efecto: 'Pérdida de buena parte de 497 M de ventas en 12-18 meses', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2027 (2S)', evento: 'Decisión de la FDA sobre ralinepag (NDA presentada en el 3T26)', efecto: 'Sustituto oral de Orenitram, frente a Uptravi', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'Lanzamiento posible del genérico de Tyvaso nebulizado (Watson, autorizado desde enero de 2026 pero sin aprobación)', efecto: 'Pérdida de parte de 586 M de ventas', probabilidad: 'Media', sentido: '−' },
      { fecha: '2026-12-31', evento: 'Fin de la licencia de Adcirca', efecto: '≈ 30 M de ventas menos', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2027-2028', evento: 'Resultados de EXPAND (UKidney) y primeros pacientes de EXPRESS (UHeart)', efecto: 'Valor de la opción de órganos', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'La FDA no aprueba o retrasa Tyvaso en FPI (decisión a finales de abril de 2027)', tipo: 'Regulación', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−25 a −35 % (bajista)', mitigante: 'Dos ensayos de fase 3 positivos (TETON-1 y TETON-2); el producto ya está aprobado en HAP y PH-ILD', senal: 'Comité asesor convocado o carta de respuesta completa' },
      { riesgo: 'Genéricos de Orenitram (junio y diciembre de 2027) y de Tyvaso nebulizado', tipo: 'Patentes', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−8 a −12 %', mitigante: 'Paso de pacientes a Tyvaso DPI y a ralinepag; patentes de DPI hasta 2030-2035', senal: 'Ventas de Orenitram por debajo de 100 M en un trimestre de 2027' },
      { riesgo: 'Yutrepia en HAP y Winrevair desplazan a las prostaciclinas', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −20 %', mitigante: 'PH-ILD protegida (patente de 2042 y acuerdo con Liquidia); Winrevair se combina con prostaciclinas', senal: 'Yutrepia por encima de 250 M en un trimestre o Tyvaso DPI cayendo' },
      { riesgo: 'Múltiplo: 18,6 veces el BPA de 2027e frente a una mediana adelantada de 14,0', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−15 a −25 % si vuelve a 14-15 veces', mitigante: 'Crecimiento del BPA del 14 % anual con la FPI', senal: 'Guía o resultados que no muestren crecimiento en 2027' },
      { riesgo: 'Programa de órganos: capex y I+D sin ventas', tipo: 'Asignación de capital', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 a −6 %', mitigante: 'La caja lo paga sin deuda; es una opción de valor si la FDA aprueba el xenotrasplante', senal: 'Capex por encima del 12 % de las ventas en 2027' },
      { riesgo: 'Precio de los medicamentos en EE. UU. (Medicare negociado, nación más favorecida, 340B)', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Enfermedades raras y huérfanas; el treprostinil tiene genéricos y es poco atractivo para la negociación', senal: 'Inclusión de Tyvaso en la lista de negociación de Medicare' },
      { riesgo: 'Gobierno: corporación de beneficio público y fundadora con poder (vende con planes 10b5-1)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Descuento de opción de compra', mitigante: 'Consejo mayoritariamente independiente; el 97 % de los votos aprueba la remuneración', senal: 'Decisiones de capital por misión que bajen el ROIC' },
      { riesgo: 'Riesgo de IA (descubrimiento de fármacos más rápido de los rivales; automatización de ventas y ensayos)', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±2 % a 3-5 años', mitigante: 'El negocio son patentes, fabricación de un fármaco inhalado y relación con neumólogos', senal: 'Rivales que acortan a menos de 5 años el desarrollo de una prostaciclina nueva' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. No falló la ciencia sino el calendario y la competencia. La FDA aprobó Tyvaso en FPI en 2027, pero con una etiqueta que exigía pruebas de función pulmonar y el lanzamiento fue lento: los neumólogos ya tenían Ofev y Esbriet genérico, y los pacientes con FPI toleraban mal el nebulizador. Mientras tanto, Yutrepia ganó la HAP con una inhalación más cómoda y Winrevair se convirtió en el tratamiento de segunda línea, empujando a las prostaciclinas a la tercera. Los genéricos de Orenitram y de Tyvaso nebulizado se llevaron 700 M de ventas en 18 meses. El BPA de 2028 quedó en 29 USD en lugar de 35, y el mercado volvió a pagar 12-14 veces, su media de siempre para una empresa con genéricos a la vista. La caja se gastó en granjas de cerdos que en 2029 aún no tenían una aprobación. La señal temprana habría sido una curva de recetas de FPI por debajo de 5.000 pacientes en el primer año y Yutrepia por encima de 300 M por trimestre en 2027.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±2 % a 3-5 años',
      comentario: 'La IA no sustituye lo que vende United Therapeutics: fármacos con patente para enfermedades raras, fabricados por ella y recetados por neumólogos. Le toca en tres sitios. En costes, puede abaratar la I+D (diseño de moléculas, selección de pacientes de ensayos) y la fabricación; la empresa no ha anunciado un programa propio relevante. En competencia, la IA acelera el desarrollo de fármacos de los rivales: una prostaciclina nueva o un tratamiento distinto para la HAP o la FPI podría llegar antes de lo que hoy se espera, acortando la vida de las ventas del treprostinil. En el programa de órganos, la edición genética y la selección de animales se benefician del análisis de datos. El efecto neto sobre el valor a 3-5 años es pequeño (±2 %). Señal: ensayos de fase 2 de rivales diseñados con IA en HAP o FPI, o costes de I+D que no bajan mientras los de la industria sí.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'FPI', pregunta: '¿Cuántos pacientes con FPI espera tratar en 2028 y a qué precio neto, frente a los de PH-ILD?', por_que: 'Es el 60 % del crecimiento de 2027-2030 de nuestro base.' },
      { tema: 'Genéricos', pregunta: '¿Qué parte de Orenitram y de Tyvaso nebulizado espera retener tras los genéricos de 2027, y cuántos pacientes pasarán a ralinepag o a Tyvaso DPI?', por_que: '≈ 1.080 M de ventas expuestas en 2027-2028.' },
      { tema: 'Liquidia', pregunta: '¿Qué impide que Yutrepia vuelva a la PH-ILD si gana la apelación o expira la patente 327, y qué cuota tiene hoy en HAP?', por_que: 'Liquidia espera más de 1.000 M en 2027; el bajista depende de ello.' },
      { tema: 'Órganos', pregunta: '¿Cuánto capex y gasto quedan para el programa de órganos hasta la primera venta, y qué hitos de la FDA lo justifican?', por_que: '≈ 1.000 M de capex desde 2023 sin ventas; baja el ROIC.' },
      { tema: 'Recompras', pregunta: '¿Habrá otra autorización de recompra tras agotar los 2.000 M de 2026, y a qué precio deja de tener sentido?', por_que: 'El BPA de 2028 sube ≈ 2 % por cada 1.000 M recomprados; no los incluimos.' },
      { tema: 'Margen', pregunta: '¿Cuánto gasto de lanzamiento de la FPI se añade en 2027 y cuándo vuelve el margen operativo al 47 % de 2025?', por_que: 'Explica la diferencia del 6 % con el BPA de 2027 del consenso.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 521,76 USD (nuestro BPA de 2028e × el PER de la regla común), un −5,8 % de rentabilidad ponderada y un +6,3 % en el caso base, frente a un precio de 553,88 USD (cierre del 20-oct-2026). El valor intrínseco (485,24 USD) queda un 12,4 % por debajo y el objetivo medio de los analistas (662,07) un 20 % por encima. La razón principal: tras la sentencia contra Yutrepia y el acuerdo con Liquidia, el precio ya paga una FPI aprobada y bien lanzada (18,6 veces nuestro BPA de 2027e frente a una mediana adelantada de 14,0), mientras los genéricos de Orenitram y Tyvaso nebulizado llegan en 2027. La convicción es baja porque las reglas discrepan (Vender con nuestro WACC, Mantener con la prima del mercado); la subiría a favor la aprobación de la FPI en abril de 2027 o un precio por debajo de 453,70 USD.

**El negocio.** Vende cuatro formas del treprostinil para la hipertensión pulmonar y un anticuerpo oncológico infantil, el 95 % en EE. UU., con un margen operativo del 46,9 % y un ROIC del 53,6 % frente a un WACC del 10,5 % [A1]: calidad «Sí» (+43 puntos). La sostenibilidad del crecimiento es «Sí»: proyectamos un 7,9 % anual, la mitad del histórico, sin apenas capital, y la cuota implícita (31 % de HAP más FPI en 2030e) se apoya en dos ensayos positivos en FPI [B10, B14]. Lo vulnerable son las patentes: Orenitram y Tyvaso nebulizado tienen genéricos en 2027-2028, y Tyvaso DPI pierde las suyas en 2030-2035 [A1].

**Finanzas.** Ventas planas en 2026 (−2 % en el 1S), tras crecer un 17 % anual en 2021-2025, por Yutrepia y Winrevair [A3, A4]. Sin deuda y con 3.803 M USD de caja e inversiones a 30-jun-2026, después de recomprar 4.000 M desde 2024 [A2, A9, A10]. El flujo libre fue el 85 % del beneficio en 2021-2025; el capex de las granjas de órganos lo frena (526 M en 2025).

**Equipo y gobierno.** La fundadora, Martine Rothblatt, preside y dirige desde 1996. Es corporación de beneficio público desde 2021: el consejo debe equilibrar a los pacientes con el accionista, lo que hace improbable una oferta y explica el gasto en órganos [A1, C6]. Los directivos vendieron 1.442 M USD en 12 meses (905 M la fundadora), casi todo ejercicio de opciones con planes 10b5-1 [C3]: restan, pero no son una señal nueva.

**Valoración.** El DCF da 505,50 USD (−8,7 %) y el DCF inverso descuenta un 10,1 % de crecimiento anual frente al 7,9 % de nuestro base. Con la prima del mercado (4,2 %), el DCF sube a 569,42 USD. La regla a 12 meses baja el PER de 18,6 a 16,9 veces y el bajista a 8,9; con la regla v2 de control (historia al cierre, mediana de 17,5), la ponderada sería +0,2 % y el base +10,1 %: tampoco llega a Comprar. Nuestro BPA de 2027e queda un 6 % por debajo del consenso por el margen [D2].

**Riesgos y catalizadores.** El riesgo de mayor impacto es la FDA en FPI (finales de abril de 2027: el bajista, −33 %); después, Yutrepia y Winrevair en HAP y los genéricos de 2027 (−8 a −12 %). El riesgo de la IA es bajo (±2 %). Catalizadores: resultados del 3T26 (≈ 28-oct), cobro de Liquidia (330 M en tres plazos) y la decisión de la FPI; el sentimiento de los foros es positivo, como el de los analistas.

**Qué cambiaría la decisión.** Comprar por debajo de 453,70 USD; Mantener entre 453,70 y 579,73; Vender por encima de 579,73. La aprobación de la FPI con etiqueta amplia, o una recompra nueva de más de 1.500 M, mejorarían el objetivo; un retraso de la FDA o Yutrepia por encima de 250 M por trimestre lo empeorarían.`,
    tesis: 'United Therapeutics ha construido sobre una sola molécula, el treprostinil, un negocio de 3.183 M USD de ventas, con un 46,9 % de margen operativo, un ROIC del 53,6 % y sin deuda [A1]. Lo hace valioso que cada nueva forma (inyectable, oral, nebulizada, en polvo) ha alargado la vida del producto y ha abierto indicaciones: tras la PH-ILD, ahora la FPI, con dos ensayos positivos y decisión de la FDA a finales de abril de 2027 [B10, B12, B14].\n\nEl precio (553,88 USD) descuenta mucho de eso: 18,6 veces nuestro BPA de 2027e, frente a una mediana de 14,0 veces en cinco años, y un crecimiento del 10,1 % anual hasta 2033 según el DCF inverso, frente al 7,9 % de nuestro base. La subida de un 12 % en el último mes recoge la sentencia contra Yutrepia y el acuerdo con Liquidia [A12, B8].\n\nEl mercado acierta en que la FPI es un mercado grande (4.046 M USD en los siete grandes [B4]) y en que la PH-ILD queda protegida hasta 2042. Se equivoca, creemos, en el precio que pone a la transición de 2027-2028: los genéricos de Orenitram y Tyvaso nebulizado se llevarán ventas al mismo tiempo que se lanza la FPI, y Yutrepia sigue en HAP. Para invertir a este precio hay que creer en un lanzamiento en FPI rápido y en que el PER se quede en 18-20 veces.',
    vision_diferencial: {
      mercado_descuenta: 'Que la FPI se aprueba en abril de 2027 y que el BPA pasa de 26,6 USD en 2026 a ≈ 32 en 2027 (consenso) y sigue subiendo, con el PER en 18-20 veces; el objetivo medio de los analistas (662 USD) está un 20 % por encima del precio.',
      nuestra_vision: 'Coincidimos en 2026 y en que la FPI se aprobará; discrepamos en 2027 (29,77 frente a 31,72) por los costes de lanzamiento y los genéricos, y en el múltiplo: la empresa siempre ha cotizado a 9-15 veces el beneficio siguiente porque siempre ha tenido genéricos a la vista, y eso no cambia.',
      por_que: 'Los genéricos de Orenitram tienen fecha (junio y diciembre de 2027) y el de Tyvaso nebulizado está autorizado [B9]. Yutrepia vende 170 M por trimestre en HAP [B6]. La historia adelantada (8,9-18,3 veces) muestra que el mercado ya ha pagado menos por esta misma incertidumbre.',
    },
    a_favor: [
      '**Calidad excepcional**: ROIC del 53,6 % y margen operativo del 46,9 %, sin deuda.',
      '**FPI**: dos ensayos de fase 3 positivos (+111,8 mL de FVC conjunto) y decisión de la FDA en abril de 2027.',
      '**PH-ILD protegida**: Yutrepia retira la PH-ILD y Liquidia paga 330,4 M USD.',
      '**Recompras**: 4.000 M USD desde 2024; las acciones diluidas bajan de 48,5 a 45,2 M.',
      '**Ralinepag**: −55 % de riesgo de empeoramiento en HAP; NDA presentada.',
    ],
    en_contra: [
      '**Caro frente a su historia**: 18,6 veces el BPA de 2027e frente a una mediana adelantada de 14,0.',
      '**Genéricos en 2027-2028**: Orenitram (497 M) y Tyvaso nebulizado (586 M) expuestos.',
      '**Competencia en HAP**: Yutrepia vende 170 M por trimestre y Winrevair 588 M (+75 %).',
      '**Ventas paradas**: −2 % en el 1S26.',
      '**Órganos**: ≈ 1.000 M de capex desde 2023 sin ventas.',
    ],
    que_vigilar: 'La tesis depende de que la FPI se apruebe en abril de 2027 y se lance deprisa mientras los genéricos de Orenitram y Tyvaso nebulizado restan ventas. La señal en contra sería una carta de respuesta completa de la FDA, Yutrepia por encima de 250 M por trimestre o unas ventas de 2027 por debajo de 3.400 M.',
    cambiaria_recomendacion: [
      'Precio por debajo de 453,70 USD: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio por encima de 579,73 USD: Vender (ponderada ≤ −10 %).',
      'Aprobación de la FPI con etiqueta amplia en abril de 2027: revisar al alza el BPA de 2028e.',
      'Carta de respuesta completa de la FDA en FPI: Vender.',
      'Nueva recompra de más de 1.500 M USD: revisar al alza (≈ +3 % de BPA).',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas de Tyvaso DPI', nivel_actual: '≈ 330 M por trimestre (+4 % en el 2T26)', umbral_alerta: 'Caída interanual', por_que: 'El producto más grande y con patentes más largas.' },
      { kpi: 'Ventas de Yutrepia', nivel_actual: '170,4 M (2T26)', umbral_alerta: '> 250 M por trimestre', por_que: 'Mide la pérdida en HAP.' },
      { kpi: 'Decisión de la FDA en FPI', nivel_actual: 'Finales de abril de 2027', umbral_alerta: 'Retraso o rechazo', por_que: 'Es el crecimiento de 2027-2030.' },
      { kpi: 'Ventas de Orenitram tras el genérico', nivel_actual: '≈ 125 M por trimestre', umbral_alerta: '< 60 M en el 4T27', por_que: 'Velocidad de la erosión.' },
      { kpi: 'Margen operativo', nivel_actual: '42,0 % (1S26)', umbral_alerta: '< 40 %', por_que: 'Costes de lanzamiento y de órganos.' },
    ],
  },
  fuentes: [],
};
