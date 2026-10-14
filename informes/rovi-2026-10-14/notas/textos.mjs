// Textos del analista (Rovi, corte 2026-10-14). Citas con la letra de la nota; [P n] = fuentes propias.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: rovi.es, la CNMV y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de las notas de resultados de Rovi, de TipRanks, Yahoo y MarketScreener y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Precio: 58,94 EUR, el de la capitalización de Stock Analysis del 7-oct-2026 (3.020 M ÷ 51,24 M de acciones), porque no se encontró el cierre del 13-oct. EBIT 2021-2023, resultado financiero, impuestos, flujo operativo (FCF + capex de MarketScreener) y existencias y clientes (días × ventas) son estimaciones propias. El puente usa la caja neta publicada (22,5 M a 30-jun-26) sin separar deuda bruta y arrendamientos. 2026 incluye una diferencia negativa de consolidación (badwill) de 62,4 M por la planta de Phoenix: va como no recurrente en el LTM y no entra en la proyección.',

  controles_explicados: [
    { control: 'Rendimiento del capital nuevo', explicacion: 'El ROIC incremental histórico (−5,2 %) es negativo porque las ventas de la vacuna de Moderna cayeron en 2023-2025 mientras se invertía en capacidad; no mide la rentabilidad de la inversión nueva. La prueba se hace con el ROIC de 2025 (21 %).' },
  ],

  parches: [],

  secciones: {
    financieros: {
      comentario: 'Los ingresos operativos pasaron de 648,7 M en 2021 a 829,5 M en 2023 con la fabricación de la vacuna de Moderna y bajaron a 743,5 M en 2025 (−3 %), porque la CDMO cayó a 269,6 M mientras las especialidades crecían un 11 % hasta 473,9 M [A1, A4, P3]. El EBITDA tocó máximo en 2022 (281,5 M, 34,4 % de margen) y suelo en 2024 (207,4 M); en 2025 subió un 4 % hasta 216,2 M (29,1 %) por la mezcla: el margen bruto ganó 3,9 puntos hasta el 66,5 % [A1, A10]. En el 1S26 los ingresos operativos crecen un 9,4 % (344,2 M) con la CDMO +38 %, pero el EBITDA sin badwill cae un 10 % (58,8 M) por más gasto en I+D y comercial y por heparinas más baratas [A2, A15, A18]. El BPA bajó de 3,73 EUR en 2022 a 2,74 en 2025, con un 4 % menos de acciones por las recompras [A6, A12].',
      ajustes: 'Cifras reportadas. 2026 lleva un ingreso no recurrente de 62,4 M (badwill de la compra de la planta de Phoenix a BMS, contabilizado en el 2T26 dentro del EBITDA): el LTM lo excluye como no recurrente y el BPA del objetivo a 12 meses no lo incluye [A2, A13]. Sin él, el beneficio neto del 1S26 sería de unos 22 M frente a 39,7 M del 1S25 (estimación propia: 84,4 − 62,4; el badwill no tributa). No hay otros ajustes declarados en 2021-2025 en los extractos consultados.',
    },
    trimestres: {
      ultima_presentacion: 'En la conferencia del 1T26 (6 de mayo) la dirección rebajó la guía de ingresos de un crecimiento de un dígito alto o doble dígito bajo a un 0-10 %, por dos causas: el contrato de llenado de jeringas con una farmacéutica global arranca más tarde de lo previsto (pendiente de autorización regulatoria) y con demanda más incierta, y las heparinas sufren presión de precios y menos pedidos de socios con inventario alto [A3, A16, A17, P1, P4]. La acción cayó más de un 15 % ese día [A16]. En la del 1S26 (23 de julio) mantuvo la guía, puso el foco en la CDMO (+38 %) y en la planta de Phoenix, y precisó que las heparinas caerán un dígito medio en 2026 [A2, A14, P2]. Las preguntas se centraron en el calendario del contrato de jeringas y en el peso del badwill; la dirección no dio cifras de margen para 2026 ni de ingresos de Phoenix más allá del mínimo de 50 M USD anuales [A14, A20]. Próximos resultados (9M26): 5 de noviembre según MarketScreener y TipRanks [D12].',
    },
    balance: {
      otros_pasivos: 'Sin rating ni bonos. Los extractos no dan pensiones, provisiones ni litigios relevantes. La deuda bruta (121,7 M a cierre de 2025) es sobre todo préstamos bancarios y de organismos públicos para capacidad industrial, según el patrón de años anteriores (dato de TipRanks sin desglose) [A5]. El contrato de BMS en Phoenix lleva un mínimo de compra a favor de Rovi, no una obligación [A20].',
      comentario: 'La caja neta pasó de 51 M en 2022 a una deuda neta de 87 M en 2024 tras la tercera recompra (130 M) y el capex de capacidad; en 2025 volvió casi a cero (deuda neta de 21,9 M) y a 30-jun-26 es caja neta de 22,5 M [A2, A5, A12]. El circulante es alto: unos 321 días de inventario y 54 de cobro en 2025 (MarketScreener), propios de un fabricante de heparinas con materia prima de origen porcino [A8]. Balance holgado para financiar capex del 8-10 % de las ventas.',
    },
    flujos: {
      comentario: 'Con el flujo operativo estimado como FCF + capex de MarketScreener, la conversión del beneficio en caja es irregular: 186 M de FCF en 2022 con la vacuna, 60 M en 2023 por el circulante y 119-120 M en 2025 [A1, A7]. El capex sube cada año (40,9 M en 2021, 67,8 M en 2025, el 9 % de las ventas) por las líneas de jeringas, viales y cartuchos; la amortización es de unos 30 M, así que más de la mitad del capex es de crecimiento (estimación propia: capex − amortización) [A1, A7]. En el 1S26 el FCF fue de 64,7 M (7,5 M en el 1S25) [A2]. Dividendos del 35 % del beneficio y 300 M de recompras en 2021-2024 [A12].',
    },
    calidad: {
      comentario: 'Sin acceso al informe de auditoría. Lo que más pesa en la calidad del beneficio es el badwill de 62,4 M de 2026: una ganancia contable por comprar la planta de Phoenix por debajo del valor razonable de sus activos, que no es caja ni se repite [A2, A15]. Lo tratamos como no recurrente. La capitalización de I+D no aparece en los extractos. Los indicadores del motor no dan alarmas: Altman Z de 7,64 (zona segura por la caja neta y el patrimonio), Piotroski F de 6 y Beneish M de −2,91 (por debajo del umbral de manipulación de −1,78), aunque el Beneish se calcula con existencias y clientes estimados.',
      senales: [
        { senal: 'Badwill de 62,4 M en el 2T26', nivel: 'Media', comentario: 'Infla el beneficio publicado de 2026; consenso y prensa mezclan cifras con y sin él [A2, E2].' },
        { senal: 'Inventario de unos 321 días', nivel: 'Baja', comentario: 'Alto pero propio de las heparinas; vigilar si crece con la caída de pedidos de socios [A8].' },
      ],
    },
    capital: {
      comentario: 'La dirección ha asignado bien el capital de la vacuna: entre 2021 y 2024 devolvió 300 M en recompras (−8 % de acciones) y pagó el 35 % en dividendos sin endeudarse, e invirtió en capacidad aséptica antes de tener los contratos [A12]. El ROIC sigue en el 21 % en 2025, pero ha caído desde el 44 % de 2022 porque el capital invertido subió de 456 a 674 M con ventas menores: el ROIC incremental de 2022-2025 es negativo. La compra de Phoenix con badwill y contrato mínimo es una compra barata; queda por ver si la capacidad nueva se llena.',
    },
    directivos: {
      comentario: 'Equipo familiar estable: los tres hermanos López-Belmonte Encina dirigen la empresa y su sociedad Norbel controla el 58,2 % [C1, C2]. La credibilidad de la guía se resintió en 2026, con una rebaja a los cuatro meses de darla [A17]. No hay plan de sucesión público ni consejero delegado externo; el riesgo es de concentración de poder, no de rotación.',
    },
    gobierno: {
      remuneracion: 'Sin acceso al IARC 2025: no se puede evaluar la remuneración del primer ejecutivo ni las métricas del variable. Hueco registrado.',
      control_y_defensas: 'Norbel Inversiones (familia López-Belmonte) tiene el 58,19 % y nombra al presidente, que es también primer ejecutivo; Indumenta Pueri (Mayoral) es el segundo accionista con el 11,25 % y subió en 2025 [C1, C2, C4]. El capital libre es de un 30 %. Una acción, un voto; no constan blindajes en los extractos. Con control familiar, una opa hostil no es posible y cualquier operación corporativa pasa por la familia.',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA de cada año, Rovi cotizó a 18,3x en 2023 y a 23-24x en 2024-2025; 2021-2022 se excluyen por el BPA de pico de la vacuna (PER de 9,7x en 2022, con el mercado descontando el fin del contrato) [D7, A6]. Hoy el PER de los últimos 12 meses es de 16,3x, pero incluye el badwill: sin él (BPA LTM de unos 2,40 EUR, estimación propia) sería de unos 24,5x, en línea con la historia reciente. El descuento aparente es contable.',
    },
    sentimiento: {
      lectura: 'El sentimiento de los particulares está dividido y mejora desde los mínimos de julio (53,10 EUR): los alcistas ven barata la acción tras caer un 30 % desde abril y confían en la CDMO, y los bajistas señalan que el beneficio de 2026 está inflado por el badwill [E1, E2, E3]. No es extremo ni contradice al consenso de analistas, que no tiene recomendaciones de venta [D4]. Aporta un aviso que el informe recoge: hay que mirar el EBITDA sin extraordinarios en los resultados del 5 de noviembre.',
    },
    comparables: {
      criterio: 'Farmacéuticas europeas medianas y de especialidades: Galderma, UCB, Ipsen y Recordati, y las españolas Faes Farma y Almirall (mismo mercado de precios y misma liquidez), con cifras de Stock Analysis y MarketScreener a 7-oct-2026 tomadas del informe de Almirall de este repositorio [D11]. No hay CDMO puras cotizadas en Europa de tamaño parecido (Lonza y Siegfried son de otro perfil y no se pudieron consultar).',
      comentario: 'Rovi cotiza a 12,3x el EBITDA de los próximos 12 meses y 18,3x el PER, por encima de la mediana de los comparables (11,1x y 17,0x) con un crecimiento esperado parecido (mediana del 9,7 %) y un ROIC mayor (21 % frente a 12,7 %) y sin deuda. La prima del 10 % se justifica por el balance y el ROIC, pero no da margen de seguridad. Galderma (36,8x) distorsiona la media y no la mediana. Los múltiplos de los comparables dan 53-55 EUR por acción, algo por debajo del precio.',
    },
  },

  rentabilidad_comentario: 'Rovi crea valor: el ROIC de 2025 es del 21 % frente a un WACC del 8,31 %, unos 12,7 puntos por encima, y ha estado por encima del 20 % desde 2021 (44 % en el pico de 2022). Lo mueve el margen (EBITDA del 29 % y margen bruto del 66,5 %), no la rotación, que bajó de 1,01 a 0,83 veces porque el capital invertido creció de 456 a 674 M con capacidad todavía ociosa [A1]. El ROIC incremental de 2022-2025 es negativo (−5,2 %): la caída de la vacuna se llevó beneficio mientras se invertía en plantas. Frente a los comparables (mediana del 12,7 %), Rovi rinde más con menos deuda [D11]. La tesis depende de que esa capacidad se llene y el ROIC vuelva hacia el 25 %.',

  dcf_justificacion: {
    crecimiento: '2026e fijo en +3 %: la guía es de 0-10 % (de un dígito bajo a medio) y el 1S26 creció un 9,4 % con Phoenix desde abril [A2, A14]. 2027e +11 %: Phoenix todo el año (mínimo de 50 M USD de BMS) y arranque del contrato de jeringas, por debajo del +16 % del consenso (890 M) porque el contrato ya se retrasó una vez [D2, A17, A20]. Después 8 %, 5,5 %, 4,5 % y bajando hasta el 3 % en 2033e. La prueba de sostenibilidad obligó a rebajar los años 2028-2033 en 0,5-1 punto frente a nuestro primer supuesto.',
    margenes: 'Margen EBITDA del 26 % en 2026e (consenso: 25,7 %; 1S26 sin badwill del 17 % con el 2S estacionalmente fuerte), 28,5 % en 2027e y 29,5-30 % después, el de 2025 (29,1 %) más la ocupación de las plantas [A1, D3]. Por debajo del 34,4 % de 2022, que dependía de la vacuna.',
    inversion: 'Capex del 10 % de las ventas en 2026e (Phoenix y nuevas líneas), 8-8,5 % en 2027-2028e y 6,5 % a largo plazo, por encima de la amortización (4,3-4,6 %) porque la CDMO necesita líneas nuevas para crecer; la prueba de sostenibilidad pidió subirlo frente al 5 % inicial. Circulante del 42 % de las ventas (existencias y clientes estimados de 2025, sin proveedores) [A7, A8].',
    wacc: 'Bund a 10 años del 3,53 % (9-oct-2026) [D9], beta de 0,9 (farmacéutica con negocio de CDMO más cíclico que una de especialidades pura; no se pudo calcular la beta propia en este entorno), prima de mercado del 5,5 % y sin prima adicional: Rovi vende sobre todo en Europa y EE. UU. Coste de la deuda del 3,5 % y peso del 3 %. WACC del 8,31 %.',
    terminal: 'Gordon con un crecimiento del 2,5 %, entre la inflación esperada del euro (2 %) y la tasa libre menos medio punto (3 %): la demanda de inyectables crece por encima del PIB. El valor terminal es el 70 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen de CDMO y Okedi (+1,5 puntos), heparinas con precios a la baja (−1) y Phoenix desde abril (+2,5, compra) [A2, A14].',
    '2027e': 'Arranque del contrato de jeringas y Okedi (+7) y Phoenix el año completo (+4) [A19, A20].',
    '2028e': 'Ocupación de las líneas nuevas de jeringas y cartuchos (+7,5) y algo de precio en Okedi (+0,5) [A19].',
    '2029e': 'Volumen de CDMO y especialidades (+5) y precio (+0,5).',
    '2030e': 'Volumen (+4) y precio (+0,5).',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte. El ROIC de 2025 (21 %) y la caja neta permiten financiar un crecimiento del 5,2 % reinvirtiendo el 25 % del NOPAT, justo lo que proyectamos (5,3 %) tras rebajar 0,5-1 punto los años 2028-2033 y subir el capex al 6,5-8 % de las ventas: con el primer supuesto la prueba fallaba (financiable del 4,1 % frente al 6,2 %). Lo que no está demostrado es el poder de precios: las heparinas pierden precio y la CDMO depende de pocos clientes (el contrato de jeringas ya se retrasó). El ROIC incremental histórico es negativo por la vacuna y no sirve de referencia. Sin cuota de mercado comparable: Rovi vende en tres mercados distintos, así que el mercado final queda sin dato.',
  dcf_lectura: 'El DCF da 51,14 EUR por acción, un 13,2 % por debajo de los 58,94 EUR, con el 70 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento de los ingresos del 10 % anual en 2027-2033 (frente al 5,6 % de nuestro base) o un margen EBITDA del 33,2 % (frente al 30 %), y una rentabilidad implícita del 7,6 %, por debajo de nuestro WACC del 8,31 %. Es exigente: pide volver a márgenes de la época de la vacuna o crecer al doble de lo que la prueba de sostenibilidad permite financiar. El mercado paga por la capacidad de llenado que Rovi tiene vacía; nuestro base supone que se llena en parte. Cada medio punto de WACC mueve el valor unos 4-5 EUR (rango de sensibilidad de 44,50 a 60,52 EUR).',
  narrativas: {
    Bajista: 'El contrato de jeringas se retrasa otra vez o arranca con poco volumen, Phoenix se queda en el mínimo de BMS y las heparinas siguen perdiendo precio frente a los biosimilares chinos: crecimiento 4 puntos menor y margen EBITDA del 26-27 %, como en 2024 sin la vacuna.',
    Base: 'Phoenix y el contrato de jeringas llevan los ingresos a unos 918 M en 2028e y el margen al 29,5-30 % por la ocupación de las plantas; Okedi sigue creciendo y las heparinas se estabilizan.',
    Alcista: 'La CDMO llena la capacidad de 2027 (hasta 880 M de jeringas) con nuevos clientes de GLP-1 o biológicos y Okedi supera los 100 M: crecimiento 2 puntos mayor y margen del 31-31,5 %.',
  },
  escenarios_comentario: 'Con el DCF, la asimetría es mala: el alcista queda en el precio (58,72 EUR) y el bajista pierde un 38 % (36,63 EUR). A 12 meses, con nuestro BPA y la regla de múltiplos, la asimetría mejora (2,8 veces: +39,7 % frente a −12,1 %) porque el PER bajista (18,3x, mínimo de 2023-2025) está cerca del actual. La diferencia dice que el precio ya descuenta una parte del alcista a largo plazo.',
  suma_partes_comentario: 'No aplica: sin margen por segmento publicado en los extractos no se puede valorar la CDMO por separado de las especialidades.',
  valoracion_comentario: 'Pesamos el DCF al 45 %, los comparables al 30 % y los escenarios al 25 %; sin transacciones. Los métodos se agrupan entre 51 y 55 EUR (DCF 51,14; PER de comparables 54,59; EV/EBITDA 53,18), todos por debajo del precio, y el valor objetivo de la síntesis queda en unos 51,5 EUR. El precio solo se justifica con el alcista o con los objetivos de los analistas (75,48 EUR de media), que suponen que la CDMO se llena antes. La dispersión es pequeña: no es un caso de método, sino de cuánto se cree en los contratos.',
  diferencia_consenso: 'Nuestro BPA de 2028e (3,41 EUR) queda un 18 % por debajo del consenso (4,15 EUR, 212,6 M de beneficio): proyectamos 918 M de ventas frente a 975,5 M (el contrato de jeringas ya se retrasó) y un margen algo menor. Nuestro precio base (65,47 EUR) queda un 13 % por debajo del objetivo medio (75,48 EUR), sobre todo por el BPA; el múltiplo (19,2x) es parecido al implícito en el consenso. Hemos revisado los supuestos y mantenemos la diferencia.',
  objetivo12m_comentario: 'El objetivo a 12 meses (65,80 EUR) queda por encima del valor intrínseco (51,53 EUR; DCF de 51,14): el mercado paga hoy unas 19 veces el beneficio de 2027e y nada indica que ese múltiplo vaya a bajar en un año si el contrato de jeringas arranca. Pero el valor intrínseco por debajo del precio impide comprar con la regla. Cerrar la distancia hacia arriba exigiría que la CDMO crezca más deprisa de lo que su ROIC puede financiar; hacia abajo, que el contrato vuelva a retrasarse (resultados del 5 de noviembre).',
  catalizadores: {
    items: [
      { fecha: '5-nov-2026', evento: 'Resultados de 9M26', efecto: 'Comprobar el EBITDA sin badwill y si la guía de 0-10 % se mantiene', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Autorización regulatoria e inicio de la fabricación rutinaria del contrato de jeringas con la farmacéutica global', efecto: 'Base del +11 % de 2027e', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con Phoenix el año completo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Nuevos contratos de CDMO para la capacidad de 2027 (690-880 M de jeringas)', efecto: 'Lleva al caso alcista', probabilidad: 'Baja', sentido: '+' },
      { fecha: 'Jun-2027', evento: 'Junta y dividendo del 35 % del beneficio de 2026 (con badwill)', efecto: 'Dividendo mayor puntual', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Nuevo retraso o recorte del contrato de jeringas con la farmacéutica global', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−29 % (escenario bajista del DCF)', mitigante: 'Phoenix con mínimo garantizado de BMS', senal: 'Guía de 2027 sin el contrato o sin autorización a cierre de 2026' },
      { riesgo: 'Caída de precios de las heparinas (biosimilares chinos, licitaciones)', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−8 % por cada 2 puntos de margen', mitigante: 'Integración y marca en España', senal: 'Heparinas por debajo de −5 % en el 2S26' },
      { riesgo: 'Concentración de clientes en CDMO (Moderna, farmacéutica global, BMS)', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 %', mitigante: 'Contratos plurianuales con mínimos', senal: 'Pérdida o no renovación de un cliente' },
      { riesgo: 'Problema de calidad o inspección de FDA/EMA en una planta estéril', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−20 %', mitigante: 'Historial sin cartas de advertencia conocidas', senal: 'Form 483 o carta de advertencia' },
      { riesgo: 'Okedi no alcanza el potencial de 100-200 M', tipo: 'Producto', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 %', mitigante: '+27 % en el 1S26', senal: 'Okedi creciendo menos del 15 %' },
      { riesgo: 'Capex que no se llena (capacidad ociosa)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Balance con caja neta', senal: 'ROIC por debajo del 18 % en 2027' },
    ],
    premortem: 'Octubre de 2029: la acción vale 35 EUR. El contrato de jeringas arrancó a mediados de 2027 con la mitad del volumen previsto porque el cliente diversificó proveedores, y Phoenix no consiguió clientes más allá del mínimo de BMS, que no se renovó en 2031. Mientras, los biosimilares chinos de enoxaparina ganaron licitaciones en Europa y las heparinas cayeron un 5 % al año. Rovi había invertido unos 250 M en capacidad en 2026-2028 y el ROIC bajó del 21 % al 14 %; el mercado dejó de pagar 19 veces un beneficio que no crecía y pasó a 14 veces. Las señales estaban ahí: la rebaja de la guía de mayo de 2026, el EBITDA sin badwill del 1S26 un 10 % más bajo y el retraso regulatorio sin fecha.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Contrato de jeringas', pregunta: '¿Qué autorización falta, con qué fecha prevista y qué volumen mínimo garantiza el contrato?', por_que: 'Explica la mitad del crecimiento de 2027e.' },
      { tema: 'Phoenix', pregunta: '¿Qué ingresos y margen aporta Phoenix por encima del mínimo de 50 M USD y qué capex necesita?', por_que: 'Decide si la compra crea valor más allá del badwill.' },
      { tema: 'Heparinas', pregunta: '¿Cuánto bajó el precio medio de la enoxaparina en 2026 y cuándo normalizan inventario los socios de bemiparina?', por_que: 'Es el 56 % de las especialidades.' },
      { tema: 'Ocupación', pregunta: '¿Qué ocupación tienen hoy las líneas de jeringas, cartuchos y viales frente a la capacidad de 2027?', por_que: 'El margen proyectado depende de ella.' },
      { tema: 'Okedi', pregunta: '¿Qué ventas espera de Okedi en EE. UU. y qué cuota tiene en los países lanzados?', por_que: 'Es la palanca de margen propia.' },
      { tema: 'Capital', pregunta: '¿Habrá recompras con la caja neta o se prioriza capex?', por_que: 'Cambia el BPA de 2028e.' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Presentación de resultados del primer trimestre de 2026', editor: 'Rovi', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://www.rovi.es/sites/default/files/1t_2026_rovi_presentacion_def_1.pdf' },
    { id: 2, titulo: 'Resultados del primer semestre de 2026, nota para medios', editor: 'Rovi', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://www.rovi.es/sites/default/files/1s_2026_resultados_nota_medios_def_0.pdf' },
    { id: 3, titulo: '2025 results press release', editor: 'Rovi', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://rovi.es/en/node/4246' },
    { id: 4, titulo: 'First three months of 2026 results press release', editor: 'Rovi', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://rovi.es/en/node/4264' },
  ],
  huecos: [],
};
