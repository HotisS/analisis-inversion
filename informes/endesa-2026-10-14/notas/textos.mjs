// Textos del analista (Endesa, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: endesa.com, la CNMV, los proveedores de datos y Yahoo no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de las notas de prensa de la empresa, de Stock Analysis, TipRanks y MarketScreener y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Precio: 43,03 € a media sesión del 14-oct-2026 (Rankia; el cierre del 12-oct fue de 42,70 €) [D1, D2]. Acciones: ≈1.006 M, estimación propia: 1.041,7 M de capital tras la amortización de marzo [A21], menos ≈29 M de los tramos tercero y cuarto de la recompra (1.000 M a un precio medio estimado de ≈34 €, cuya amortización se acordó el 29-sep) [A20] y ≈6 M del quinto tramo; eToro da 41.590 M de capitalización a 40,42 € (≈1.029 M) [D20]. La deuda neta de la empresa incluye los arrendamientos. El balance histórico solo tiene las líneas que publican los agregadores (sin circulante comercial), así que ROIC, circulante y Altman/Beneish se leen con cautela. Las provisiones de plantilla, pensiones y desmantelamiento no están en el puente (hueco).',

  controles_explicados: [
    { control: 'Fuentes sin citar', explicacion: 'Algunas fuentes de contexto (TipRanks, Simply Wall St) se usan solo para cruzar cifras de otras.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    comparables: {
      comentario: 'La mediana del PER de los próximos 12 meses de las ocho eléctricas es de 14,9x (13,8x-16,5x entre cuartiles), y Endesa cotiza a 18,3x el BPA de consenso de 2026: con una prima del ≈23 % frente a las integradas europeas y por encima incluso de Redeia (15,9x), que es una red pura [D13]. Solo Iberdrola, con un PER previsto de ≈19,6x según MarketScreener, cotiza más cara [D15]; Enel, su matriz, a ≈13,4x [D16], Engie a 13,9x [D14] y SSE a 13,5x [D17]. El valor implícito por la mediana es de 35,02 € (−18,6 %). La prima solo se justificaría si Endesa creciera más o tuviera más peso regulado, y no es así: su BPA crece un 2-4 % al año en el plan y la mitad del EBITDA sigue siendo generación y comercialización [A1]. Los PER de seis de los ocho comparables vienen de agregadores con fechas distintas (mayo-septiembre de 2026), por eso el peso de este método es del 20 %.',
    },
    multiplos_historicos: {
      comentario: 'Solo hay dos cierres de ejercicio fiables, estimados desde rentabilidades publicadas: ≈21,1 € en 2024 (29 € en octubre de 2025 con +37,5 % en el año) [D19] y ≈31,1 € en 2025 (38,83 € en julio de 2026 con casi +25 % en el año) [D18]; el cierre del 12-oct-2026 fue de 42,70 € [D2]. Con el BPA ordinario, el PER de cierre fue de ≈11,2x en 2024 y ≈13,8x en 2025; hoy, 43,03 € sobre el BPA de 2026 del consenso (2,35 €) son 18,3x. La media de diez años del ADR que publica Wisesheets (18,6x) está distorsionada por 2019 y 2023, años de beneficio hundido. El salto de múltiplo es el centro de la tesis: el mercado paga hoy por Endesa como por una red regulada, y la mitad del EBITDA sigue siendo liberalizado.',
    },
  },

  rentabilidad_comentario: 'El ROIC del último ejercicio es del 13,4 % frente a un WACC del 6,18 %: crea valor con holgura, unos 7 puntos. Hay que leerlo con cautela: el capital invertido sale del patrimonio y la deuda neta que publican los agregadores [A4, A6, A26], sin el circulante comercial ni las provisiones, y el balance encogió de 50.067 M en 2022 a 37.482 M en 2025 al deshacerse las garantías de la crisis de precios [A4]. El ROE del 23,6 % lo infla además la recompra financiada con deuda. El ROIC incremental histórico (23,4 %) mide sobre todo la recuperación del beneficio tras 2023, no la rentabilidad de la inversión nueva: la red cobra el 6,58 % sobre su base de activos [B1], así que el capital nuevo en distribución rinde cerca de ese nivel antes de impuestos, por debajo del ROIC medio. Por eso crecer en redes mantiene el valor, pero no lo multiplica.',

  dcf_justificacion: {
    crecimiento: 'Ingresos casi planos: +2,2 % en 2026e (fijo: 1S26 publicado, ventas de 10.995 M, +1,1 %) [A1], −0,8 % en 2027e y +1,0 % en 2028e, en línea con el consenso (21.903 / 21.722 / 21.909 M) [D5]; después, +1,5-2 % con la demanda (+2,8 % en 2025, plana en 2026) [B5, B6] y la inflación. Las ventas de una eléctrica siguen al precio de la energía, que es una transferencia: lo que mueve el valor es el margen y la base regulada.',
    margenes: 'Margen EBITDA del 27,6 % en 2026e (≈6.045 M, frente a 6.002 M del consenso y 6.296 M de los doce meses a junio) [D5, A1], 28,0 % en 2027e y 28,6 % en 2028e (6.274 M, en la parte baja de la guía de 6.200-6.500 M) [A2]. Después baja al 27,5 % por el cierre de Almaraz en junio de 2030 [B3], la canibalización solar de los precios y una revisión regulatoria en 2032. El margen de 2025 fue del 26,9 % y el de 2022-2023 está distorsionado por la crisis del gas.',
    inversion: 'Inversión del 16 % de las ventas en 2026-2028 (≈3.500 M al año, el plan de 10.600 M) [A2, B7], que baja al 12,5 % desde 2032, por encima de la amortización (12 %) en el terminal. No se usa la inversión del estado de flujos de los agregadores (1.844 M en 2025) porque no recoge intangibles ni la captación de clientes [A5]. Circulante en cero por falta de datos.',
    wacc: 'Bund a 10 años del 3,53 % (12-oct-2026) [D10]; beta de 0,65, en el rango de 0,52-0,66 de Yahoo según la línea cotizada [D12]; prima de mercado del 5,5 %; coste de la deuda antes de impuestos del 3,3 % (el medio de Endesa es del 3,2 %) [A13]; peso de la deuda del 20 %, a valor de mercado. WACC resultante del 6,18 %. Sin prima país: vende en España, pero el Bund ya es la referencia y el rating es BBB con perspectiva positiva [A19].',
    terminal: 'Crecimiento a perpetuidad del 2,0 %, la inflación esperada en euros, por debajo de la tasa libre menos medio punto. El valor terminal pesa el 71 % del DCF. El múltiplo de salida de referencia (8,5x EBITDA) queda cerca del EV/EBITDA actual de 8,7x.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: demanda y clientes estables; precio: tarifas de redes con la nueva tasa del 6,58 % [B1]. Coincide con el consenso [D5].',
    '2027e': 'Precio mayorista más bajo (normalización tras 2026) que compensa la subida de la red; el consenso también da ventas a la baja [D5].',
    '2028e': 'Base regulada mayor por la inversión del plan [A2].',
    '2029e': 'Electrificación y red; inflación.',
    '2030e': 'Almaraz cierra en junio de 2030: menos energía propia, compensada en ventas por la compra en el mercado [B3].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado es bajo (1,5 % de ingresos al año) y la reinversión lo financia de sobra: el 17 % del NOPAT reinvertido al ROIC actual da un 2,2 %, y la proyección supone que el capital nuevo rinde un 7,5 %, muy por debajo del incremental histórico (23,4 %) y cerca del 6,58 % regulado de la red [B1]. No se usa la prueba de cuota (mercado final en null): la cuota disponible es de 2019 y de un solo negocio [B9]. La calidad sostiene la proyección porque la proyección no pide casi nada: la duda no es el crecimiento sino el múltiplo.',
  dcf_lectura: 'El DCF da 43,36 € por acción, un 0,8 % sobre el precio, con un WACC del 6,18 % y un valor terminal que pesa el 71 %. El DCF inverso dice que el precio descuenta un crecimiento del 1,4 % anual en 2027-2035 con un margen del 27,4 %, prácticamente nuestro caso base (1,5 % y 27,5 %), y una rentabilidad implícita del 6,2 %, igual a nuestro WACC. Es decir, el precio ya incorpora el plan 2026-2028 completo, con la red creciendo y Almaraz hasta 2030: no queda margen de seguridad. La sensibilidad es alta: medio punto más de WACC baja el valor a 37,41 €, y medio punto menos lo sube a 50,95 €. Con la prima implícita del mercado (4,2 %) el valor sube a 54,13 €: Endesa solo parece barata si se acepta que una eléctrica con la mitad del negocio liberalizado merece la prima de riesgo de hoy del S&P 500, que está en mínimos.',
  narrativas: {
    Bajista: 'Los precios mayoristas caen con la solar y la retribución de redes no compensa: el margen EBITDA vuelve al 25-26 % de 2023-2025 y el real decreto de inversión no llega, como en 2023 el laudo del gas recortó el EBITDA un 32 % [A7].',
    Base: 'Se cumple el plan con algo de holgura a la baja: EBITDA de ≈6.270 M en 2028, beneficio ordinario de ≈2.420 M, dividendo con pay-out del 70 % y la recompra de 2.000 M terminada.',
    Alcista: 'Llega el real decreto, la red crece por encima del plan y los márgenes de generación aguantan con la nuclear prorrogada: EBITDA en la parte alta de la guía (≈6.560 M en 2028).',
  },
  escenarios_comentario: 'La asimetría es desfavorable: el alcista gana un 14,9 % y el bajista pierde un 33,0 %, con una ratio de 0,45x. El bajista es verosímil: en 2023 el EBITDA cayó a 3.777 M [A7]. El alcista está limitado porque el precio ya descuenta el caso base completo. Con la prima implícita del mercado la asimetría pasa a 2,54x, pero eso depende del coste de capital, no del negocio.',
  suma_partes_comentario: 'No se hace: falta el desglose de EBITDA por negocio con histórico (hueco de la sección de negocio). Solo se conoce el de redes del 1S26 (1.200 M, 36 % del total) [A1].',
  o12: {
    Bajista: 'Ventas de 21.501 M en 2028e (−1 punto de crecimiento en 2027-2028) y margen EBITDA del 26,6 %: EBITDA de 5.719 M, EBIT de 3.225 M, −480 M financieros, impuesto del 25 %, 40 M de minoritarios y 990 M de acciones: BPA de 2,04 €.',
    Base: 'Ventas de 21.937 M y margen del 28,6 %: EBITDA de 6.274 M (parte baja de la guía de 6.200-6.500 M), EBIT de 3.729 M, −450 M financieros, impuesto del 25 % y 990 M de acciones tras la recompra anunciada: beneficio de 2.420 M y BPA de 2,44 €.',
    Alcista: 'Ventas de 22.157 M y margen del 29,6 %: EBITDA de 6.558 M, EBIT de 3.988 M y beneficio de 2.629 M, por encima del techo de la guía (2.600 M): BPA de 2,66 €.',
  },
  diferencia_consenso: 'Nuestro BPA base de 2028e (2,44 €) está un 2 % por encima del implícito en el consenso (2,39 €) [D5] y un 4 % por debajo de la guía de la empresa (2.500-2.600 M de beneficio, 2,53-2,63 € con 990 M de acciones) [A2]: no hay discrepancia de beneficio. La diferencia está en el múltiplo: nuestro base usa 12,5x (la mediana de los cierres de 2024-2025) frente a los ≈15x implícitos en el objetivo medio de 35,71 € [D3]. Nuestro base (30,50 €) queda un 14,6 % por debajo de ese objetivo medio, y el objetivo medio, a su vez, un 17 % por debajo del precio.',
  objetivo12m_comentario: 'El objetivo a 12 meses (30,87 €) queda un 25 % por debajo del valor intrínseco (41,06 €) y del precio. Para cerrar esa distancia haría falta que el mercado mantuviera el PER de 18x de hoy, el más alto de su historia reciente, sin un catalizador que lo sostenga: los resultados del 3T (28-oct), el real decreto de redes y la recompra son ya conocidos. La regla común de múltiplos es exigente con Endesa porque solo hay dos cierres fiables (11,2x y 13,8x) y los dos son de antes del cambio de perfil; si el mercado consolida el múltiplo de las redes reguladas (15-16x), el base subiría a 37-39 €, todavía por debajo del precio.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF es el método más fiable para una eléctrica con flujos regulados y un plan de inversión explícito, pero es muy sensible al WACC (±0,5 puntos mueven el valor entre 34 € y 58 €). Los comparables pesan poco porque seis de los ocho PER son de agregadores con fechas distintas. No hay transacciones con múltiplo (hueco) ni RAB publicada para el EV/RAB. La dispersión es amplia: comparables 32-39 €, DCF 34-58 €, escenarios 29-49 €; el valor ponderado (41,06 €) queda un 4,6 % por debajo del precio. Solo el DCF con la prima implícita del mercado (54,13 €) justifica comprar.',

  catalizadores: {
    items: [
      { fecha: '28-oct-2026', evento: 'Resultados del 3T26', efecto: 'Confirmación de la guía de > 2.400 M de beneficio ordinario; el mercado mirará la parte no recurrente del 1S', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-1S27', evento: 'Real decreto que eleve el límite de inversión en distribución', efecto: 'Desbloquea los 5.500 M del plan en redes [A2]', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Enero de 2027', evento: 'Dividendo a cuenta de 2026 (≈0,5 €)', efecto: 'Rentabilidad por dividendo del ≈3,7 %', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y actualización del plan', efecto: 'Nueva guía 2027-2029; posible nueva recompra', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Sentencias sobre los recursos contra las circulares de la CNMC', efecto: 'Tasa de retribución de redes (6,58 %) [B2]', probabilidad: 'Baja', sentido: '+' },
      { fecha: '2026-2027', evento: 'Fin de la recompra de 2.000 M', efecto: 'Desaparece un comprador recurrente del valor (1.100 M ejecutados a junio) [A13, D23]', probabilidad: 'Alta', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Contracción del múltiplo hacia su historia', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−25 % (objetivo a 12 meses base, PER de 12,5x)', mitigante: 'Más peso regulado y dividendo creciente', senal: 'PER del sector por debajo de 15x o Bund por encima del 4 %' },
      { riesgo: 'Caída del precio mayorista por la solar', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−33 % (escenario bajista)', mitigante: 'Venta a precio fijo de nuclear e hidráulica', senal: 'Margen EBITDA semestral por debajo del 25 %' },
      { riesgo: 'Real decreto de inversión en redes que no llega', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈ −5 %', mitigante: 'Tasa del 6,58 % ya fijada [B1]', senal: 'Plan de inversión en redes recortado en febrero de 2027' },
      { riesgo: 'Fiscalidad y calendario nuclear', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −6 %', mitigante: 'Almaraz prorrogada hasta 2030 [B3]', senal: 'Subida de la tasa de Enresa o nuevos impuestos autonómicos' },
      { riesgo: 'Conflicto de interés con Enel (operaciones vinculadas, exclusión futura)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'n.c.', mitigante: 'Comisión de auditoría y CNMV', senal: 'Cambios en la financiación intragrupo o en el pay-out' },
      { riesgo: 'Balance más estirado por la recompra', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'DN/EBITDA de 1,6x y BBB con perspectiva positiva [A13, A19]', senal: 'DN/EBITDA por encima de 2,5x' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Lo que pasó: en 2027 los precios mayoristas siguieron bajando con la solar y las baterías, y el margen de generación y comercialización volvió a los niveles de 2023-2025; el EBITDA de 2028 se quedó en 5.700 M, por debajo de la guía. A la vez, el Bund subió por encima del 4 % y las utilities perdieron su atractivo como bonos: el PER volvió a 12x, su nivel de 2024. La recompra terminó y Enel, con el 72 % tras las amortizaciones, dejó de tener incentivos para sostener la cotización. El real decreto de redes salió tarde y recortado. La señal que lo habría anticipado: un margen EBITDA semestral por debajo del 25 % en 2027 y una guía de 2027 sin crecimiento del beneficio ordinario.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Beneficio recurrente', pregunta: '¿Qué parte del EBITDA del 1S26 (3.240 M, +20 %) es no recurrente y qué esperan para el 2S?', por_que: 'La guía de > 2.400 M implica un 2S más flojo que el 1S [A1].' },
      { tema: 'Redes', pregunta: '¿Qué inversión en redes harán si el real decreto no llega en 2027?', por_que: '5.500 M del plan dependen de él [A2].' },
      { tema: 'Recompra', pregunta: '¿Habrá más recompras tras los 2.000 M, o el exceso de caja irá a inversión?', por_que: 'La recompra ha sostenido la cotización (1.100 M a junio) [A13].' },
      { tema: 'Enel', pregunta: '¿Cuál es el objetivo de participación de Enel y descartan una exclusión de bolsa?', por_que: 'La recompra sube su participación sin coste [C5].' },
      { tema: 'Provisiones', pregunta: '¿Cuánto suman las provisiones de plantilla, pensiones y desmantelamiento a junio de 2026?', por_que: 'No están en el puente; podrían restar 1-3 € por acción.' },
      { tema: 'Nuclear', pregunta: '¿Pedirán la prórroga de Ascó y Vandellós? ¿Con qué condiciones fiscales?', por_que: 'Almaraz ya está prorrogada hasta 2030 [B3].' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [
    { seccion: 'valoracion', campo: 'provisiones de plantilla, pensiones y desmantelamiento en el puente', tipo: 'Núcleo', intentos: '1) Informe semestral de junio de 2026 en la CNMV: no accesible; 2) informe anual 2025: no accesible; 3) prensa y agregadores: sin cifra', decision: 'Omitido' },
  ],
};
