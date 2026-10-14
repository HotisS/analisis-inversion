// Textos del analista principal (KONE, corte 2026-10-14). Citas con la letra de la nota; [Pn] = fuentes propias de abajo.
const P = (id, titulo, editor, tipo, fecha, url) => ({ id, titulo, editor, tipo, fecha, url });

export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de KONE, Nasdaq Helsinki, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados de KONE (Cision y kone.com), de Stock Analysis, Fidelity, Snowball y Fintel, y de Inderes, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Línea cotizada: acciones B en Nasdaq Helsinki (KNEBV); las acciones A (76,2 M) no cotizan y se valoran al precio de la B; acciones en circulación 518,3 M (529,4 M emitidas menos 11,1 M de autocartera) [C6, A9]. Precio: 51,40 EUR, último cierre fechado localizado (8-oct-2026, Halo Technologies), coherente con los 51,26 EUR y 26.570 M de capitalización de eToro en octubre [P13, P14]; no hemos podido confirmar el cierre del 13-oct. Próximos resultados: 28-oct-2026 (3T26), según el calendario oficial [P27]. Valoramos KONE sola: la combinación con TKE no cierra antes del 2T27 y depende de las autoridades de competencia; se trata como riesgo y opción en el texto. Balance incompleto: el ROIC del motor usa el patrimonio y la caja neta, sin el desglose de anticipos y arrendamientos. Precios de cierre de 2020-2024 derivados del PER de cierre de Wisesheets por el BPA publicado (estimación propia) y el de 2025, del 16-dic-2025 [P11, P12].',

  controles_explicados: [],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    financieros: {
      comentario: 'Las ventas pasaron de 9.938,5 M en 2020 a 11.245,2 M en 2025 (+2,5 % anual), casi todo orgánico: el equipo nuevo en China, que fue el motor de la década anterior, cayó y lo compensaron el mantenimiento y la modernización (63 % de las ventas en 2025, frente al 60 % de 2024) [A3, A4]. El margen EBIT ajustado tocó fondo en 2022 (9,9 %) por la inflación del acero y los componentes y la caída de China, y desde entonces sube cada año: 11,4 % en 2023, 11,7 % en 2024 y 12,2 % en 2025, con las ventas casi planas; es poder de precios y mezcla, no apalancamiento operativo [B4, A3]. El BPA siguió el mismo camino: 1,96 EUR en 2021, 1,50 en 2022 y 1,89 en 2025 [A7, A3]. En los últimos doce meses a junio de 2026 el BPA baja a 1,82 EUR por los costes de la operación con TKE (25,8 M en el 1S26) y por las divisas, aunque el EBIT ajustado del 1S26 sube un 5,9 % [A1, P21]. Las líneas de impuestos, BAI y beneficio atribuido salen de Stock Analysis, Fidelity y Snowball, y cuadran con el beneficio neto publicado (961,0 M en 2024 y 991,9 M en 2025, minoritarios incluidos) [P24, P25, P26].',
      ajustes: 'KONE publica un EBIT ajustado que excluye las «partidas que afectan a la comparabilidad»: 14,5 M en 2021, 45,4 M en 2022 [P28], 48,3 M en 2023, 54,0 M en 2024 y 33,1 M en 2025, sobre todo reestructuraciones, y 58,3 M en el 1S26 (25,8 M por TKE, el resto reestructuración y pensiones) [A7, A3, A1]. Se repiten todos los años, por lo que no son del todo extraordinarias. El motor las devuelve al EBITDA; el BPA del objetivo a 12 meses y el PER histórico están en base publicada (con esas partidas), y nuestro BPA de 2028e supone 10 M de resultado financiero negativo y 12 M de minoritarios, como en 2025.',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (22-jul) los pedidos crecieron un 10,6 % hasta 2.562,3 M, con la modernización a doble dígito en todas las regiones, y las ventas un 3,1 % hasta 2.937,6 M; el EBIT ajustado subió al 12,6 % de las ventas (12,2 %), pero el BPA (0,46 EUR) quedó por debajo de lo esperado (0,55) por los costes de TKE y las divisas [A1, A2, P21]. La dirección mantuvo la guía (ventas +3-6 % a tipos constantes, margen ajustado 12,3-13,0 %) y avisó de que el equipo nuevo en China sigue siendo un lastre [A1, A2]. Frente al 1T26, en el que la conferencia giró sobre la combinación con TKE anunciada el mismo día, el discurso pasó de la operación a la ejecución: los analistas preguntaron por China, por la satisfacción de clientes en el servicio y por los plazos de competencia, y según Inderes la dirección no dio información nueva relevante sobre TKE [P18, P22]. Inderes subió a Acumular con objetivo de 52 EUR [D6].',
    },
    balance: {
      otros_pasivos: 'KONE no tiene deuda financiera neta: la deuda neta con intereses, que incluye arrendamientos y prestaciones a empleados, era de −245,5 M a junio de 2026 [A1]. Incluye 79,7 M de pasivos por derivados y 31,1 M de activos diferidos ligados a la operación con TKE [A1]. El pasivo relevante que no es deuda son los anticipos de clientes del equipo nuevo, que financian el circulante; no hemos podido obtener su importe (hueco). La operación con TKE cambiaría el balance: 5.000 M en efectivo y la refinanciación de ≈9.200 M de deuda neta de TKE, con la promesa de un rating de grado de inversión sólido [A6].',
      comentario: 'La caja neta ha bajado de forma natural porque KONE reparte casi todo su beneficio: el apalancamiento (gearing) pasó del −24,8 % a cierre de 2025 al −10,5 % en junio de 2026 tras pagar el dividendo de 1,80 EUR en marzo [A1]. El patrimonio se mueve en torno a 2.800-2.900 M (2.827 M en 2025) [A5]. No hay vencimientos relevantes que vigilar en KONE sola; el riesgo de balance llega con TKE.',
    },
    flujos: {
      comentario: 'El flujo operativo tras intereses e impuestos (Stock Analysis) fue de 1.316 M en 2025 y 1.249 M en 2024, con un capex de solo 154-168 M (1,4-1,5 % de las ventas): el negocio casi no necesita inversión [P23]. 2022 fue anómalo (531,5 M) por el circulante de China y la inflación [P23]. Los dividendos (931,9 M en 2025) se llevan el 70 % del flujo operativo. Falta el pago de arrendamientos (hueco): Inderes da un flujo libre tras arrendamientos de 824 M en 2024 frente a los 1.081 M de flujo operativo menos capex, lo que apunta a ≈250 M de arrendamientos y otros pagos al año; el FCF que calcula el motor está por eso sobrestimado en ≈2 puntos de ventas, y el DCF lo corrige poniendo las altas de derechos de uso en el capex (2,7 % de las ventas) [P17].',
    },
    calidad: {
      comentario: 'No hemos podido revisar las notas del informe anual (auditor, criterios de reconocimiento de ingresos de los contratos de equipo nuevo, pensiones), y el motor no puede calcular Altman ni Beneish por falta de balance completo; el Piotroski sale 4, sin significado con tantos datos ausentes. Lo que sí vemos: las partidas que afectan a la comparabilidad se repiten todos los años (33-58 M), la conversión del EBIT en flujo operativo es alta salvo en 2022 y no hay capitalización relevante de gastos (capex del 1,4 % de las ventas). La operación con TKE traerá asignación del precio de compra, amortización de intangibles y costes de integración que harán menos comparables las cifras desde 2027.',
    },
    capital: {
      comentario: 'Hasta 2025 la dirección fue una asignadora de capital prudente: dividendos que absorben el 95 % del beneficio, recompras nulas y casi ninguna compra relevante, con un ROIC calculado del 43,5 % en 2025 que, con el balance incompleto, sobrestima el real pero confirma que el negocio necesita muy poco capital. La combinación con TKE rompe ese patrón: paga ≈22 veces el EBIT ajustado implícito de TKE (29.400 M de valor empresa) con hasta 270 M de acciones nuevas (52 % de las actuales) y 5.000 M de caja [A6]. La empresa promete 700 M de sinergias de costes y un BPA ajustado mayor desde el primer año completo; el mercado lo duda (la acción cayó de ≈60 EUR antes del anuncio a 46-51 EUR) y la junta lo aprobó con el voto de la familia [P13, A10].',
    },
    directivos: {
      comentario: 'La dirección cumplió en 2021 y se quedó corta en 2024 por China; en 2026 va en la parte baja de su guía de margen en el 1S26 (11,8 % frente a 12,3-13,0 % anual), apoyada en un segundo semestre estacionalmente mejor [A1]. El consejero delegado y un consejero independiente compraron acciones el día siguiente a los resultados del 2T26, a 47,7-48,0 EUR [C1, C4]. El riesgo de equipo es la integración de TKE, un grupo de tamaño parecido, durante varios años, con el consejo dominado por la familia Herlin.',
    },
    gobierno: {
      remuneracion: null,
    },
    consenso: {
      revisiones: 'Tras el 2T26 el consenso de BPA publicado para 2026 bajó a 2,06 EUR (22 analistas) por los costes de TKE y las divisas [D4]. Los precios objetivo también bajan: Inderes de 56 a 52 EUR en julio y el objetivo medio, en ≈60 EUR (mediana 59,14; extremos 45 y 87,12) [D6, P2]. Solo hemos podido contrastar una fuente para 2027e (Inderes, BPA implícito de 2,34 EUR), así que el consenso es frágil. Las estimaciones son de KONE sola: casi ningún analista incluye todavía TKE.',
    },
    bolsa: {
      comentario: 'La acción cotiza en 51,40 EUR, un 20 % por debajo del máximo de 52 semanas (64,42) y cerca del mínimo (46,22) [P13]. Subió un 5 % en septiembre de 2025 con la noticia de que KONE estudiaba comprar TKE [P29] y cayó tras el anuncio de abril de 2026 y los resultados del 2T26, hasta 46,7 EUR en julio; desde entonces ha recuperado un 10 % [P18, D6]. No hemos podido calcular beta, volatilidad ni rentabilidades (sin acceso a series de precios).',
    },
    multiplos_historicos: {
      comentario: 'Con BPA publicado, KONE cerró los ejercicios a un PER de 25-37 veces entre 2019 y 2025 (mediana de 2021-2025 sin 2022: 28,6 veces) [P11]. Hoy cotiza a 23,8 veces nuestro BPA de 2027e y a 22,5 veces el consenso de los próximos 12 meses: el descuento frente a su historia (≈20 %) no es solo de KONE, porque Otis y Schindler también han caído por debajo de sus múltiplos históricos tras la operación [P18]. La compresión tiene dos causas estructurales: el crecimiento de la década pasada venía de China y ya no está, y el mercado descuenta la dilución y el riesgo de ejecución de TKE.',
    },
    comparables: {
      criterio: 'Los dos fabricantes de ascensores cotizados comparables en tamaño y modelo (Otis y Schindler) y tres industriales nórdicos con mucho servicio recurrente y calidad parecida (ASSA ABLOY, Atlas Copco, Konecranes). TKE y Fujitec no cotizan; Mitsubishi Electric e Hitachi son conglomerados donde el ascensor pesa poco.',
      comentario: 'Los datos de los comparables son de proveedores y fechas distintas (junio a septiembre de 2026) y solo tenemos el PER de los próximos 12 meses de todos: Otis 15,2 veces, Schindler 24 veces, ASSA ABLOY 19,5, Atlas Copco 24,8 y Konecranes 13,6; mediana 19,5 [P3, P5, P6, P7, P8, P9]. KONE, a 22,5 veces, cotiza con prima sobre la mediana y en línea con Schindler, el más parecido por modelo y por control familiar. Otis, el de mayor margen y peso en servicio, cotiza muy por debajo tras recortar dos veces su guía de 2026 [B14]. El peso de los comparables en la síntesis es bajo (25 %) por lo incompleto de los datos.',
    },
    transacciones: {
      comentario: 'La única referencia útil es la propia operación KONE-TKE: 29.400 M de valor empresa, ≈3,2 veces las ventas implícitas de TKE y ≈22 veces su EBIT ajustado [D3]. Muestra lo que vale la base instalada para un comprador con sinergias, pero no es un precio de control sobre KONE: la familia Herlin controla el 63 % de los votos y no hay opción de compra sobre KONE. Por eso las transacciones pesan 0.',
    },
    competencia: {
      amenazas: 'La mayor amenaza al foso son los mantenedores independientes y los fabricantes chinos con equipo nuevo barato fuera de China; ninguna ha erosionado de momento el margen de servicio (el EBIT ajustado del grupo sube cada año desde 2022) [A3]. La segunda es regulatoria: la combinación con TKE puede salir con desinversiones en Europa que reduzcan las sinergias de densidad que la justifican; Schindler ya ha dicho que se opondrá [B11].',
    },
    sentimiento: {
      lectura: 'El sentimiento de los particulares es dividido y algo peor que hace seis meses: la discusión se ha movido de China a la operación con TKE, que una parte ve cara y dilutiva y otra ve como el catalizador que faltaba a un valor «en espera» [E1, E2]. Las críticas coinciden con las cifras: precio de ≈22 veces el EBIT de TKE y hasta un 52 % más de acciones [E5]. No hay euforia ni capitulación; el sentimiento coincide con el de los analistas (objetivo medio ≈60 EUR, Inderes en Acumular) y no añade un riesgo que el informe no recoja. Si algo aporta, es que el mercado no pagará la prima histórica de KONE hasta ver el visto bueno de competencia.',
    },
  },

  dcf_justificacion: {
    crecimiento: '2026e se fija en el +2,0 % publicado: la guía es del 3-6 % a tipos constantes y el 1S26 creció un 2,2 % publicado, con unos 2 puntos de efecto divisa [A1]. Después, 4,0-4,5 % hasta 2029e: la modernización (pedidos a doble dígito), el servicio (≈4-5 % con precios indexados a la inflación) y un equipo nuevo que deja de caer en China en 2027, como espera Roland Berger [A1, B9]. Entre 2031e y 2035e baja al 2,5 %. La media de toda la proyección es del 3,4 %, por encima del 2,5 % anual de 2020-2025, porque China ya pesa solo el 19 % de las ventas [A4].',
    margenes: 'El margen EBITDA pasa del 14,7 % publicado de 2025 al 15,0 % en 2026e (con los costes de TKE) y al 16,5 % en 2030e; equivale a un EBIT ajustado del 13,7 %, frente al 12,2 % de 2025 y al 12,3-13,0 % de la guía de 2026 [A3, A1]. El argumento es la mezcla (servicio y modernización ganan peso) y la productividad; el precedente es la subida de 2,3 puntos entre 2022 y 2025. Schindler ya gana un 13,2 % de EBIT publicado [B15].',
    inversion: 'Capex del 2,7 % de las ventas, que suma el del estado de flujos (1,4 %) y una estimación de las altas de derechos de uso (≈1,3 %) para que el DCF pague los alquileres que el EBITDA NIIF 16 no recoge; al final, 2,9 %, por encima de la amortización (2,85 %). Circulante neto de anticipos en el 0 % de las ventas: los anticipos del equipo nuevo financian existencias y clientes [P23].',
    wacc: 'Tasa libre del 2,95 % (Bund a 10 años: 2,97 % en junio y por encima del 3 % en primavera de 2026) [P15, P16]. Beta de 0,85 (estimación propia: negocio defensivo con un 63 % de ventas recurrentes; no hemos podido calcularla con datos de mercado), prima de mercado del 5,5 % y 0,5 puntos de prima adicional por el 19 % de ventas en China. Coste de la deuda del 3,5 % y un peso del 5 %: KONE tiene caja neta. WACC del 7,85 %.',
    terminal: 'Gordon con un crecimiento del 2,3 %: inflación esperada del euro (≈2 %) más un pequeño crecimiento real, por debajo de la tasa libre menos medio punto (2,45 %). El valor terminal es el 61 % del valor empresa. El múltiplo de salida de referencia (14 veces el EBITDA) queda en línea con lo que cotizan hoy Otis y Schindler (13-14 veces el EBITDA pasado) [P4, P6].',
  },

  puente_comentarios: {
    '2026e': 'Volumen: pedidos +7,4 % a tipos constantes en el 1S26 con el equipo nuevo en China cayendo; precio: indexación de contratos de mantenimiento; otros: −2 puntos de divisas (crecimiento publicado del 1S26: +2,2 %) [A1].',
    '2027e': 'Base de mantenimiento creciente y modernización; el equipo nuevo en China se estabiliza según Roland Berger [B9].',
    '2028e': 'La modernización crece ≈7 % anual en el mercado; KONE gana algo de volumen con pedidos a doble dígito [B9, A1].',
    '2029e': 'Mismo patrón; sin compras (TKE fuera del modelo).',
    '2030e': 'El crecimiento converge hacia el del mercado (≈3,9 % anual 2025-2030 en dólares, Roland Berger) [B9].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La proyección (3,4 % anual) casi no necesita capital: la reinversión neta acumulada es negativa y el motor no puede hacer la prueba de financiación, así que la hacemos con el poder de precios y la cuota. El poder de precios está demostrado: el margen EBIT ajustado subió del 9,9 % al 12,2 % entre 2022 y 2025 con las ventas casi planas [B4, A3]. El crecimiento proyectado (≈1,5-2 puntos de volumen y 2,5 de precio) es menor que el del mercado de servicio y modernización (≈7 % anual la modernización según Roland Berger) y similar al del mercado total (≈3,9 %), así que no exige ganar cuota [B9]. El riesgo para la prueba no es la calidad sino China, que ya pesa el 19 %. No hace falta rebajar el caso base.',

  dcf_lectura: 'El DCF de KONE sola da 46,37 EUR por acción, un 9,8 % por debajo del precio, con el 61 % del valor en el terminal. El DCF inverso dice que el precio de 51,40 EUR descuenta un crecimiento del 5,0 % anual entre 2027e y 2035e (nuestro base: 3,5 %) o un margen EBITDA del 18 % (base: 16,5 %), o lo que es lo mismo, una rentabilidad anual del 7,3 % frente a nuestro WACC del 7,85 %. Es exigente frente a la historia: KONE creció un 2,5 % anual en 2020-2025 y nunca ha tenido un margen EBITDA del 18 %. Con la prima de riesgo que hoy pide el mercado (4,2 %, WACC del 6,8 %), el valor sube a 57,02 EUR: la diferencia es de tasa, no de cifras. El precio solo se justifica con una tasa de descuento baja propia de un negocio de servicio muy defensivo, o con algo de valor por las sinergias de TKE (700 M antes de impuestos al tercer año) que nuestro modelo no incluye [A6].',

  narrativas: {
    Bajista: 'China no se recupera y el equipo nuevo cae también en Europa y EE. UU.; la guerra de precios lleva el margen ajustado de vuelta al 11-12 %, como en 2023. Además, la operación con TKE se complica (desinversiones en Europa, costes de integración) y el mercado castiga la acción. Ya le pasó en 2022 (margen ajustado del 9,9 %).',
    Base: 'Crecimiento del 4-4,5 % con la modernización y el servicio, China estabilizada en 2027 y margen EBIT ajustado que sube hasta el 13,7 % en 2030e. Sin TKE en las cifras.',
    Alcista: 'La modernización mantiene el ritmo de pedidos del 2T26 (+10,6 %) y el equipo nuevo vuelve a crecer en 2027; el margen ajustado supera el 14 %, el nivel previo a la crisis de China, y las sinergias de TKE empiezan a verse.',
  },
  escenarios_comentario: 'Con nuestro WACC la asimetría del valor intrínseco es mala: el alcista (51,53 EUR) apenas iguala el precio y el bajista (37,51) pierde un 27 %. Con la prima del mercado, la asimetría pasa a 2,02 veces. A 12 meses, con la regla de múltiplos, el reparto es mejor (alcista +50,5 %, bajista −14,4 %, asimetría 2,63) porque el PER actual ya está en mínimos de su historia: lo que se pierde viene más del múltiplo que del beneficio.',
  suma_partes_comentario: 'No aplica: KONE no publica resultados por línea de negocio (servicio, modernización y equipo nuevo comparten red y costes).',

  valoracion_comentario: 'El DCF pesa el 50 % porque es un negocio previsible con poca inversión, los escenarios el 25 % y los comparables el 25 % por lo incompleto de sus datos; las transacciones, 0 (la familia Herlin controla los votos). El valor intrínseco ponderado es de 45,49 EUR (−11,5 %). La dispersión es grande: los múltiplos de comparables dan 34,66-54,72 EUR por PER y 37,71-45,89 por EV/EBITDA porque los ascensores cotizan hoy a múltiplos bajos, y el DCF con la prima del mercado da 57,02. El método más fiable es el DCF, y su resultado depende sobre todo de la tasa de descuento.',

  oj: {
    Bajista: 'Ventas de 12.110 M en 2028e (−1,5 puntos de crecimiento en 2027-28) y margen EBITDA del 15,0 % (−1 punto): EBIT de 1.471 M, 10 M de resultado financiero, impuesto del 25 %, 12 M de minoritarios y 518,3 M de acciones.',
    Base: 'Ventas de 12.466 M en 2028e (+4,0 % y +4,5 %) con margen EBITDA del 16,0 % (EBIT ajustado ≈13,2 %): EBIT de 1.639 M, 10 M de resultado financiero, impuesto del 25 %, 12 M de minoritarios y 518,3 M de acciones, sin TKE ni recompras.',
    Alcista: 'Ventas de 12.706 M (+1 punto de crecimiento) y margen EBITDA del 16,5 % (+0,5): la modernización mantiene el ritmo del 2T26 y el equipo nuevo se recupera.',
  },
  excluidos: '2022: BPA atípico (1,50 EUR, margen ajustado del 9,9 % por la inflación de materiales y China), que infla el PER. Serie con BPA publicado y precios de cierre derivados del PER de Wisesheets (estimación propia) y, en 2025, del cierre del 16-dic: 2019 32,3x; 2020 36,6x; 2021 32,2x; 2023 25,1x; 2024 25,5x; 2025 31,6x [P11, P12]. Mediana de 5 años (2021, 2023-2025): 28,6x; media larga (2019-2025 sin 2022): 30,6x. Actual = 51,40 ÷ 2,163 (nuestro BPA de 2027e) = 23,8x.',
  diferencia_consenso: 'Nuestro BPA de 2026e (≈1,92 EUR con los costes de TKE) queda por debajo del consenso publicado (2,06) y el de 2027e (2,16) un 8 % por debajo del de Inderes (2,34): somos más prudentes en el margen (EBIT ajustado del 13,2 % en 2028e) y no contamos sinergias de TKE [D4, D6]. Nuestro precio base (55,57 EUR) queda un 7,6 % por debajo del objetivo medio (60,11); la diferencia es sobre todo de múltiplo: usamos el PER actual (23,8 veces) y no la vuelta a la media histórica (28-30 veces) [P2].',
  objetivo12m_comentario: 'El objetivo a 12 meses (55,57 EUR) queda un 22 % por encima del valor intrínseco (45,49 EUR): el mercado paga por KONE un PER que nuestro WACC no justifica, y suponemos que lo seguirá pagando un año más. Para que el precio converja al valor intrínseco haría falta que el mercado exigiera a KONE la misma rentabilidad que nuestro WACC (7,85 %); con la prima implícita del mercado (4,2 %), el valor intrínseco sube a 53,33 EUR y la distancia casi desaparece. El catalizador con fecha son los resultados del 3T26 (28-oct-2026) y la decisión de competencia sobre TKE (2027).',

  rentabilidad_comentario: 'KONE crea valor con holgura: el ROIC calculado del 43,5 % en 2025 (42,7 % en 2024) supera en ≈36 puntos al WACC del 7,85 %, aunque está sobrestimado porque no tenemos los anticipos de clientes ni los arrendamientos para medir bien el capital invertido; con cualquier definición razonable el ROIC queda por encima del 25 %. Lo mueve la rotación (2,4 veces el capital) más que el margen (EBIT del 11,9 %): el negocio de servicio necesita poco capital y el equipo nuevo se cobra por adelantado. El ROIC incremental histórico (0,4 %) no significa nada con un capital tan pequeño y un beneficio que apenas ha crecido. Schindler, con un margen EBIT del 13,2 %, está en la misma liga; la gran duda es qué ROIC tendrá el grupo tras pagar 29.400 M por TKE, que con un EBIT ajustado de ≈1.300 M rendiría ≈4,5 % después de impuestos antes de sinergias [B15, A6].',

  catalizadores: {
    items: [
      { fecha: '28-oct-2026', evento: 'Resultados del 3T26', efecto: 'Pedidos de modernización y margen ajustado frente a la guía (12,3-13,0 %); el 1S26 fue del 11,8 %', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con China estabilizada; dividendo (Inderes estima 1,95 EUR)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-1T27', evento: 'Notificación formal a la Comisión Europea y decisión de la CMA británica sobre TKE', efecto: 'Una fase 2 o desinversiones en Europa reducirían las sinergias de 700 M', probabilidad: 'Media', sentido: '−' },
      { fecha: '2T27 (como pronto)', evento: 'Cierre de la combinación con TKE', efecto: 'Emisión de hasta 270 M de acciones B, 5.000 M de caja y refinanciación de ≈9.200 M de deuda neta', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027', evento: 'Recuperación del equipo nuevo en China (Roland Berger)', efecto: 'Volumen y margen del equipo nuevo', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Ejecución y precio de la combinación con TKE', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % (bajista del objetivo a 12 meses: −14,4 %)', mitigante: 'Sinergias de 700 M y BPA ajustado mayor desde el primer año, según la empresa', senal: 'Condiciones de competencia en la UE; costes de integración por encima de lo anunciado' },
      { riesgo: 'Bloqueo o remedios de competencia sobre TKE', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a +5 % (depende de si el mercado prefiere KONE sola)', mitigante: 'KONE dice confiar en la aprobación', senal: 'Apertura de fase 2 en Bruselas; postura de la CMA' },
      { riesgo: 'China: el equipo nuevo sigue cayendo', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (bajista del DCF −27 % con −1,5 puntos de crecimiento y −1 de margen)', mitigante: 'China pesa ya solo el 19 % de las ventas', senal: 'Pedidos y ventas en Gran China en el 3T26' },
      { riesgo: 'Compresión del múltiplo hacia los comparables', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−18 % de precio (PER de 23,8 a 19,5 veces, la mediana de los comparables)', mitigante: 'Ya cotiza en el mínimo de su PER histórico', senal: 'Otis y Schindler bajando de 15 y 24 veces' },
      { riesgo: 'Presión de precios en el mantenimiento por independientes', tipo: 'Competitivo', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−8 % por cada punto de margen EBITDA', mitigante: 'Costes de cambio por equipos propietarios', senal: 'Crecimiento del servicio por debajo del 4 %' },
      { riesgo: 'Divisas (dólar, yuan)', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−2 % del BPA por año', mitigante: 'Costes en las mismas divisas', senal: 'Diferencia entre crecimiento publicado y a tipos constantes (≈2 puntos en 2025-26)' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. La Comisión Europea abrió una fase 2 sobre TKE en 2027 y autorizó la operación a cambio de vender buena parte del negocio europeo de TKE, el de mayor densidad de rutas, así que las sinergias quedaron en la mitad de los 700 M. KONE ya había emitido 270 M de acciones y pagado 5.000 M en efectivo; con 14.000 M de deuda bruta, el dividendo de 1,80 EUR dejó de ser intocable. A la vez, China no se recuperó y la guerra de precios de los fabricantes chinos llegó a Oriente Medio e India, y el margen ajustado volvió al 11 %. El mercado, que pagaba 24 veces el beneficio por un negocio sin deuda y con dividendo seguro, pasó a pagar 16 veces, como a Otis. Las señales estaban a la vista: la oposición de Schindler y de la CMA en 2026, la dilución del 52 % y un EBIT ajustado del 1S26 por debajo de la guía anual.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'TKE', pregunta: '¿Qué remedios de competencia aceptaría KONE en Europa y cuánto de los 700 M de sinergias dependen de la densidad de servicio en los países con solape?', por_que: 'Decide si la operación crea o destruye valor.' },
      { tema: 'TKE', pregunta: '¿Qué BPA publicado (con la amortización de intangibles) espera KONE en el primer año completo y qué política de dividendo mantendrá con 14.000 M de deuda bruta?', por_que: 'La promesa de mejora del BPA es en base ajustada; el dividendo es el soporte del valor.' },
      { tema: 'Márgenes', pregunta: '¿Qué margen ajustado espera el 2S26 para cumplir la guía del 12,3-13,0 % con un 11,8 % en el 1S26?', por_que: 'Un incumplimiento en octubre movería el BPA de 2027e.' },
      { tema: 'China', pregunta: '¿Cuánto cayeron los pedidos de equipo nuevo en Gran China en 2026 y cuál es el margen del servicio allí?', por_que: 'China pesa el 19 % y es el origen del bajista.' },
      { tema: 'Balance', pregunta: '¿Cuál es el importe de los anticipos de clientes y de los pasivos por arrendamiento?', por_que: 'Cambian el ROIC y el puente de valor.' },
      { tema: 'Servicio', pregunta: '¿Cuál es la tasa de pérdida de contratos de mantenimiento y la subida media de precios en 2026?', por_que: 'Es la prueba del poder de precios que sostiene el caso base.' },
    ],
    confianza: 'Media',
  },

  huecos: [],

  fuentes: [
    P(2, 'KONE Oyj (0II2) – price targets', 'Fintel', 'Datos de mercado', '2026-07', 'https://fintel.io/s/gb/0ii2'),
    P(3, 'OTIS – dividend tracker y múltiplos (PER adelantado 15,2x)', 'DripCalc', 'Datos de mercado', '2026-08', 'https://www.dripcalc.com/stocks/OTIS/'),
    P(4, 'OTIS key statistics (EV/EBITDA 13,3x a 30-jun-2026)', 'Yahoo Finance', 'Datos de mercado', '2026-06-30', 'https://finance.yahoo.com/quote/OTIS/key-statistics'),
    P(5, 'Schindler Holding AG – valuation (PER 2026e 25x, EV/ventas 2,08x)', 'MarketScreener', 'Datos de mercado', '2026-09', 'https://uk.marketscreener.com/quote/stock/SCHINDLER-HOLDING-AG-41754375/valuation/'),
    P(6, 'Schindler PS – kurs og nøgletal (PER adelantado 22,7x, EV/EBITDA 13,9x)', 'Nordnet (npinvestor)', 'Datos de mercado', '2026-09', 'https://npinvestor.dk/aktier/schindler-ps/'),
    P(7, 'ASSA ABLOY (ASAZY) – PER adelantado 19,5x (22-sep-2026)', 'Yahoo Finance', 'Datos de mercado', '2026-09-22', 'https://ca.finance.yahoo.com/quote/ASAZY/'),
    P(8, 'Atlas Copco (ATLFF) – PER adelantado 24,8x (22-sep-2026)', 'Yahoo Finance', 'Datos de mercado', '2026-09-22', 'https://uk.finance.yahoo.com/quote/ATLFF/'),
    P(9, 'Konecranes (KCR.HE) – PER adelantado 13,6x', 'Snowball Analytics', 'Datos de mercado', '2026', 'https://snowball-analytics.com/public/asset/KCR.HE'),
    P(11, 'PE ratio KNEBV.HE (histórico anual 2019-2024)', 'Wisesheets', 'Datos de mercado', '2025', 'https://wisesheets.io/pe-ratio/KNEBV.HE'),
    P(12, 'KONE OYJ B factsheet (cierre de 59,66 EUR el 16-dic-2025)', 'BAWAG markets', 'Datos de mercado', '2025-12-16', 'https://markets.bawag.at/wertpapiere/aktie/tts-20880532/KONE-OYJ-B-O-N/factsheet'),
    P(13, 'KNEBV quote (51,40 EUR, 8-oct-2026; rango de 52 semanas 46,22-64,42)', 'Halo Technologies', 'Datos de mercado', '2026-10-08', 'https://www.halo-technologies.com/markets/shares/hel/knebv/'),
    P(14, 'KNEBV.HE (51,26 EUR; capitalización 26.570 M)', 'eToro', 'Datos de mercado', '2026-10', 'https://www.etoro.com/markets/knebv.he'),
    P(15, 'Germany 10-year government bond yield (2,97 % en junio de 2026)', 'Macroradar (OCDE/FRED)', 'Datos de mercado', '2026-06', 'https://www.macroradar.io/germany-10-year-yield'),
    P(16, 'German Bund yields stabilize as market eyes record debt supply', 'Trading Economics', 'Datos de mercado', '2026-04', 'https://tradingeconomics.com/germany/government-bond-yield/news/514000'),
    P(17, 'KONE Q4’25: Smooth ride, elevated price tag', 'Inderes', 'Analistas', '2026-02-06', 'https://www.inderes.se/en/research/kone-q425-smooth-ride-elevated-price-tag'),
    P(18, 'KONE company report 23-jul-2026 (PDF)', 'Inderes', 'Analistas', '2026-07-23', 'https://www.inderes.fi/files/88bb9ad0-573f-47f9-bc78-01c827760315'),
    P(21, 'KONE EPS: 2T26 0,46 EUR frente a 0,55 esperado', 'Trading Economics', 'Datos de mercado', '2026-07', 'https://tradingeconomics.com/knebv:fh:eps'),
    P(22, 'KONE Q2 2026 Earnings Call: Complete Transcript', 'Webull', 'Prensa', '2026-07-22', 'https://www.webull.com/news/15270129235878912'),
    P(23, 'KONE Oyj (HEL:KNEBV) Cash flow statement', 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/hel/KNEBV/financials/cash-flow-statement/'),
    P(24, 'KONE Oyj (HEL:KNEBV) Income statement', 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/hel/KNEBV/financials/income-statement/'),
    P(25, 'KONE Oyj – financials (BAI e impuestos 2023-2024)', 'Fidelity International', 'Datos de mercado', '2025', 'https://fidelity.co.uk/factsheet-data/factsheet/FI0009013403-kone-oyj/financials'),
    P(26, 'KNEBV.HE financials (impuestos 2021-2025)', 'Snowball Analytics', 'Datos de mercado', '2026', 'https://snowball-analytics.com/public/asset/KNEBV.HE.EUR/financials'),
    P(27, 'Financial reporting schedule of KONE Corporation in 2026', 'KONE', 'Primaria', '2025-10-23', 'https://www.kone.com/en/news-and-insights/releases/financial-reporting-schedule-of-kone-corporation-in-2026-2025-10-23.aspx'),
    P(28, 'Financial Statement Bulletin of KONE Corporation for January–December 2022', 'KONE', 'Primaria', '2023-01-26', 'https://www.kone.com/global/en/newsroom/releases/2023/financial-statement-bulletin-of-kone-corporation-for-januarydecember-2022-2023-01-26.html'),
    P(29, 'Kone shares climb on report of potential bid for rival TK Elevator', 'Seeking Alpha', 'Prensa', '2025-09', 'https://seekingalpha.com/news/4495932-kone-shares-climb-on-report-of-potential-bid-for-rival-tk-elevator'),
  ],
};
