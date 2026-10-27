// Textos del analista (Santander Brasil, corte 2026-10-27). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'ES UN BANCO y el motor no tiene modelo de bancos: EBITDA, ROIC, valor empresa, deuda neta, circulante, Altman Z y Piotroski no significan nada aquí. Adaptaciones, las mismas que en Itaú y BTG del 27-oct: (1) la calidad se mide con ROE recurrente − Ke (coste del capital propio en reales) en lugar de ROIC − WACC, con la misma regla de nunca menos de 4,5 puntos; (2) el valor intrínseco sale de un modelo de exceso de rentabilidad (residual income) con P/VC justificado de contraste (valoracion-banco.md [P1]), que entra al 100 % como «suma de partes» con valor directo; (3) el DCF del motor es un flujo para el accionista (beneficio − retención para crecer con el CET1, deuda 0) y solo es comprobación (peso 0). Bases contables: la serie histórica del informe es NIIF de la CVM (DFP e ITR, datos abiertos [A3]) y del 20-F 2025 [A4]; el BPA, el ROE, la regla a 12 meses y el modelo bancario usan el resultado gerencial recurrente BR GAAP, el de referencia del mercado [A1, A5-A10]. El ITR NIIF del 1S26 de la CVM muestra un impuesto 0, dato raro: no se usa. Millones de BRL. Línea de compra: unit SANB11 en B3 (1 ON + 1 PN), 26,30 BRL al cierre del 26-oct-2026 [D1]. El ADR BSBR (1 ADR = 1 unit) SIGUE cotizando en la NYSE (4,82 USD el 26-oct) y el banco sigue registrado en la SEC: no se ha deslistado. Desde el 30-jul-2026 el precio lo fija la oferta de canje de la matriz (0,4056 acciones de Banco Santander por unit) y no el beneficio: el método a 12 meses no da una señal fiable mientras la oferta siga viva. Último trimestre publicado: 2T26; el 3T26 sale el 28-oct antes de la apertura [D9].',
  controles_explicados: [
    { control: 'Crecimiento a perpetuidad ≤ 3 %', explicacion: 'El 5,0 % es NOMINAL EN REALES: IPCA de largo plazo del Focus (3,5 % [D13]) + 1,5 de crecimiento real. Equivale a un 1,5 % real, dentro de la regla. La tasa libre (15,435 %) y el Ke (20,94 %) están en la misma moneda. Es el mismo supuesto que Itaú y BTG.' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    rentabilidad: {
      comentario: 'En un banco el ROIC del motor (10,2 %, NIIF, con deuda y caja 0 y el fondo de comercio de Banco Real en el patrimonio) no es la cifra de calidad; la del informe es el ROE RECURRENTE − Ke. ROE recurrente gerencial (sin fondo de comercio) del 17,3 % de media en 2025 y del 14,3 % en el 1S26 (16,0 % en el 1T26 y 12,5 % en el 2T26) [A1, A5], frente a un Ke en reales del 20,94 % (bono a 10 años 15,435 % + 1,0 × 5,5 % [D3]): exceso de −3,6 puntos (2025), −6,6 (1S26) y −8,4 (2T26). NO PASA el suelo del método (4,5) ni con el Ke de antes de las elecciones (18,48 %: −1,2 a −4,2) [P1]. No es comprable en ningún nivel (A, B1, B2 o C). Indicadores bancarios del 2T26 [A1]: CET1 11,2 % (Basilea 15,3 %); morosidad a más de 90 días 3,3 % (2,6 % un año antes) y de 15-90 días 3,3 %; coste del crédito a 12 meses del 3,81 % de la cartera y provisiones (PDD) de 7.654 M en el trimestre (+20,6 %); spread de la cartera del 10,03 %; eficiencia del 39,3 %; cobertura de la fase 3 del 65 %. Sensibilidad a la Selic: el banco es pasivo-sensible (margen con el mercado de −718 M en el 2T26 y −1.486 M en el 4T25 por la financiación de la cartera a tipo fijo); una Selic alta más tiempo le resta margen, sube el coste del riesgo y además sube el Ke: cada punto de tasa libre quita ≈ 7 % del valor intrínseco [P1].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Reparte la mayor parte del beneficio en JCP y dividendos: 6.200 M declarados en 2023, 6.000 M en 2024 y 7.620 M en 2025 [A4]; en 2026, JCP de 2.000 M en enero y abril y de 1.500 M el 9-oct (0,401 BRL por unit, registro 20-oct, pago 9-nov) [A11]. Sin recompras relevantes. El 89,53 % de esos pagos va a la matriz (Sterrebeeck 47,25 % y Grupo Empresarial Santander 42,25 %) [C1]. CET1 del 11,2 % en jun-2026, poco margen para extraordinarios [A1].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Oferta de canje de Banco Santander, S.A. por el ≈ 10 % de minoritarios (no es una compra del banco, sino de la matriz)', importe: null, ev_ebitda: null, financiacion: 'Acciones nuevas de Banco Santander (0,4056 por unit)', resultado: 'Registrada en la CVM, B3 y SEC (F-4) el 21-sep-2026; cierre esperado en el 1S27 [C2-C4, C8].' },
      ],
      comentario: 'Asignación floja en el ciclo: el ROE recurrente cayó del 21,2 % de 2021 al 12,5 % del 2T26 por el crédito a particulares y pymes y por un balance pasivo-sensible que sufrió con la subida de la Selic [A1, A9]. El capital vuelve al accionista, pero casi todo a la matriz. El cambio de consejero delegado (Gilson Finkelsztain, ex-B3, desde el 2S26, en lugar de Mario Leão) y del director financiero (abr-2026) llega con el ROE en mínimos [B6, C5].',
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Los «ingresos» crecen como el patrimonio y la cartera: 6-6,5 % en 2026e-2029e (cartera ampliada +5,8 % interanual en jun-2026 [A1]; crédito del sistema ≈ +10 % anual [B1]; Santander Brasil por debajo por prudencia en riesgo), y bajan al 5 % en 2034e-2035e, el terminal nominal. Es la misma senda del modelo de exceso de rentabilidad [P1].',
    margenes: '«Margen EBITDA» = beneficio antes de impuestos sobre ingresos, calibrado para que el beneficio después de impuestos sea el ROE del caso base por el patrimonio: ROE del 13,5 % en 2026e que vuelve al 16-17 % en tres-cinco años (su nivel de 2024-2025), sin llegar al 21 % de 2021, porque el coste del crédito tarda en bajar con la Selic alta y la competencia digital aprieta.',
    inversion: '«Capex» = retención: lo que el banco guarda para que el patrimonio crezca con los activos ponderados por riesgo y el CET1 no baje del 11 %: g × 2,47 ÷ (1 + g) de los ingresos. Amortización y circulante 0. El flujo que queda es lo que puede repartir.',
    wacc: 'WACC = Ke en reales: bono del Tesoro brasileño a 10 años del 15,435 % (26-oct-2026; 12,98 % el 23-oct [D3]) + beta 1,0 (medida 0,97-0,99 mensual a 5 años y 0,84 semanal [D1]) × 5,5 % = 20,94 %. Sin prima país: ya está dentro de la tasa libre en reales (sumarla sería contarla dos veces). Peso de la deuda 0. Antes de las elecciones, Ke del 18,48 %; con la prima de Damodaran (4,2 % [D4]), 19,64 %; con una tasa libre del 13,5 %, 19,0 %.',
    terminal: 'Gordon al 5,0 % nominal en reales: IPCA de largo plazo del Focus (3,5 % [D13]) + 1,5 real. Pesa el 30 % del valor; como el ROE del año 10 (17 %) queda por debajo del Ke, el terminal resta valor en el modelo de exceso de rentabilidad.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +5,5 % (cartera ampliada +5,8 % interanual en jun-2026 [A1]); precio +0,5 % (spread estable en el 10 %).',
    '2027e': 'Volumen +6 %: el crédito del sistema crece ≈ 10 % anual desde 2019 [B1]; Santander Brasil menos por prudencia en particulares y pymes.',
    '2028e': 'Volumen +6 % con la Selic bajando hacia el 10-11 % del Focus [B5]; precio +0,5 %.',
    '2029e': 'Volumen +6 %.',
    '2030e': 'Volumen +5,5 %: converge al crecimiento nominal de la economía.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El crecimiento del 6 % es financiable: con un ROE del 13,5-17 % el banco retiene un tercio o algo más y reparte el resto, como hace hoy [A4]. El motor da «En parte» porque mide con el ROIC NIIF (10,2 %, con el fondo de comercio en el patrimonio) frente a un WACC del 20,9 %. La conclusión que importa: con el Ke de hoy, crecer DESTRUYE valor, porque cada real retenido gana menos que su coste.',
  dcf_lectura: 'El DCF adaptado (flujo para el accionista) da 20,36 BRL por unit en el base, un 22,6 % por debajo del precio, en línea con el modelo de exceso de rentabilidad (18,05; la diferencia es que el DCF parte del patrimonio de fin de año y no descuenta el JCP de octubre). El DCF inverso dice que el precio descuenta una rentabilidad anual del 17,5 %, por debajo del Ke (20,9 %), o un crecimiento del 9,8 % anual frente al 5,9 % del base. Pero el precio no lo fija el negocio sino la oferta de canje (26,9-27,4 BRL el 26-oct [P1]). Las cifras de EV/EBITDA, deuda neta/EBITDA, ROIC, Altman Z y Piotroski no significan nada en un banco y no se usan.',
  narrativas: {
    Bajista: 'La Selic sigue alta más tiempo tras las elecciones y el coste del crédito se queda en el 4,2-4,5 % de la cartera; el margen con el mercado sigue negativo. ROE del 10,5-14 % y cartera 1,5 puntos más lenta.',
    Base: 'ROE recurrente del 13,5 % en el primer año (2S26-1S27) que vuelve al 16-17 % en tres-cinco años; patrimonio y cartera +6-6,5 % que bajan al 5 %; CET1 en el 11 % y payout alto.',
    Alcista: 'La Selic baja desde 2027, el coste del crédito vuelve al 3,5 % y el ROE recupera el 17,5-19 %; el nuevo consejero delegado mejora la eficiencia.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF adaptado quedan por debajo del precio (bajista 13,65, base 20,36 y alcista 25,59 BRL), como los del modelo de exceso de rentabilidad (13,48, 18,05 y 21,47). La causa es la misma: con un Ke del 20,9 %, un ROE del 13-17 % destruye valor y el banco vale menos que su valor contable (25,77 BRL). Ni con el Ke de antes de las elecciones llega al precio (21,76 BRL) [P1].',
  suma_partes_comentario: 'No es una suma de partes: es el vehículo para que el valor del modelo de exceso de rentabilidad (residual income) sea el valor intrínseco del motor. Una sola «parte», el banco entero, con valor directo = 17,76 BRL ponderados × 3.744 M de units = 66.493 M (patrimonio, no valor empresa; el puente es 0). Detalle y tablas en valoracion-banco.md [P1].',
  casos_12m: {
    Bajista: 'Coste del crédito en el 4,3-4,5 % de la cartera y ROE ≈ 12 %: BPA recurrente de 3,31 BRL en 2028e × 5,7 veces (el mínimo adelantado de 5 años, el de 2024) = 18,87 BRL.',
    Base: 'Resultado recurrente de ≈ 13.400 M en 2026e (1S26 real 6.802 M), ROE del 14,5 % en 2027e y del 15,5 % en 2028e con el patrimonio al +6 %: BPA de 4,35 BRL × 7,4 veces (el PER actual de 6,7 × 1,1, el tope; la mediana adelantada de 8,7 queda más lejos) = 32,19 BRL.',
    Alcista: 'ROE ≈ 17,5 % (el de 2025) con la Selic bajando: BPA de 4,95 BRL × 9,0 veces (la media adelantada de 2020-2025) = 44,55 BRL.',
  },
  diferencia_consenso: 'Nuestro BPA recurrente de 2026e (3,58 BRL) queda un 3 % por debajo del consenso (3,70) y el de 2027e un 10 % (3,91 frente a 4,33); el consenso aún baja: hace 90 días era 4,29 y 4,94 [D2]. El objetivo medio de los analistas (31,18 BRL, de 27 a 44) queda cerca de nuestro base a 12 meses (32,19), pero varios ya valoran la unit por la oferta de canje y no por el beneficio (UBS BB pasó a neutral [D11]).',
  objetivo_comentario: 'La regla a 12 meses (v3) da 31,95 BRL ponderado, un +29,2 % con el dividendo (+30,2 % en el base), por encima del 15 % de compra; pero la tercera condición falla: el valor intrínseco (17,76 BRL) está un 32,5 % por debajo del precio. Y la cifra no es fiable: supone que la unit vuelve a cotizar por su PER, cuando desde el 30-jul la ancla la oferta de canje (0,40 acciones de Banco Santander por unit, 26,9-27,4 BRL el 26-oct). Si la oferta se cierra, quien no acuda se queda con una acción con poca liquidez y quizá sin ADR en la NYSE; si fracasa, el precio volvería al negocio, con un valor intrínseco de 17,76 y un P/VC justificado de 0,69 veces [P1, C3].',
  valoracion_comentario: 'Pesos: modelo de exceso de rentabilidad 100 % (vía suma de partes); DCF adaptado, comparables y transacciones 0. El DCF adaptado solo comprueba el modelo (20,36 frente a 18,05 BRL). Los comparables por P/VC (bancos brasileños de 0,55 a 4,6 veces según ROE; Santander Brasil a 1,02) y por PER (7,0 veces de mediana [B4]) entran en la regla a 12 meses, no en el valor intrínseco. El valor intrínseco depende de la tasa libre en reales: con 15,435 % vale 18,05 BRL (base); con 13,5 %, 20,86; con 12,98 % (antes de las elecciones), 21,76. El precio pide un Ke del 16,4 %, igual a la tasa libre sin prima de riesgo [P1]. La dirección aguanta con cualquier tasa libre de los últimos dos años: el negocio vale menos que el precio, que sostiene la oferta.',
  catalizadores: {
    items: [
      { fecha: '2026-10-28', evento: 'Resultados del 3T26 (antes de la apertura de B3; conferencia el 29-oct)', efecto: 'ROE, coste del crédito y morosidad tras el 2T26 flojo (ROE 12,5 %); primer dato del nuevo consejero delegado', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11-09', evento: 'Pago del JCP de 0,401 BRL por unit', efecto: 'Ajusta a la baja el ratio de canje', probabilidad: 'Alta', sentido: '0' },
      { fecha: '2026-11/12', evento: 'Ministro de Hacienda y marco fiscal del nuevo mandato; Copom de diciembre', efecto: 'Mueve el bono a 10 años (Ke) y el real frente al euro (valor de canje en BRL)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-1S', evento: 'Registro de la oferta en la CVM y la SEC, subasta y cierre', efecto: 'Fija la salida para el minoritario; tras ella, menos liquidez para quien no acuda', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'Recuperación del ROE hacia el 15-16 %', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'La oferta de canje se cierra y el minoritario que no acude queda con una acción poco líquida y quizá sin ADR', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: 'Descuento de liquidez de difícil medida; el precio iría hacia el valor del negocio (17,76 BRL)', mitigante: 'Acudir a la oferta: 0,40 acciones de Banco Santander por unit [C3].' },
      { riesgo: 'La oferta se retira o fracasa (regulador, mercado)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−20 a −30 % (vuelta a un P/VC de 0,7-0,8 veces)', mitigante: 'Registrada en CVM, B3 y SEC con laudo de UBS BB [C4].' },
      { riesgo: 'Ciclo de crédito: morosidad del 3,3 % que sigue subiendo y coste del crédito por encima del 4 % con la Selic alta tras las elecciones', tipo: 'Crédito', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−25 % en el bajista', mitigante: 'Cobertura de la fase 3 del 65 % [A1].' },
      { riesgo: 'Balance pasivo-sensible: Selic alta más tiempo resta margen con el mercado', tipo: 'Macro', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−7 % del valor intrínseco por punto de tasa libre', mitigante: 'Coberturas y reprecio de la cartera.' },
      { riesgo: 'Real débil frente al euro: sube el valor de canje en BRL pero baja el valor en euros de todo', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Cada 1 % de EUR/BRL ≈ 1 % del valor de canje', mitigante: 'Ninguno para el inversor en euros.' },
      { riesgo: 'Riesgo de IA (los bancos digitales y las tecnológicas automatizan crédito y atención)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±3 % a 3-5 años', mitigante: 'Plataforma tecnológica compartida con el grupo.' },
    ],
    premortem: 'Octubre de 2027: la oferta se ha cerrado con el 70 % de los minoritarios; la unit se ha quedado con poca liquidez y el ADR ha salido de la NYSE. El 3T26 y el 4T26 trajeron más provisiones por pymes y agro, el ROE se quedó en el 12 % y el Ke en reales siguió por encima del 20 %. Sin el ancla del canje, la unit cayó a 0,75 veces su valor contable, ≈ 20 BRL, y quien no acudió perdió un 25 % frente a quien canjeó.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '±3 % a 3-5 años',
      comentario: 'La IA abarata la atención, el análisis de crédito y el cobro, y Santander Brasil comparte plataforma tecnológica con el grupo; pero también baja la barrera de Nubank, Mercado Pago y las tecnológicas en crédito al consumo, donde está su problema de morosidad. Efecto neto pequeño en 3-5 años.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Oferta', pregunta: '¿Qué pasará con la cotización de la unit, el Nivel 2 y el ADR si la oferta se cierra con poca aceptación?', por_que: 'Decide si conviene acudir.' },
      { tema: 'Coste del crédito', pregunta: '¿Cuándo toca techo el coste del crédito (3,81 %) y la morosidad a más de 90 días (3,3 %)?', por_que: 'Es la diferencia entre el base y el bajista.' },
      { tema: 'Margen con el mercado', pregunta: '¿Qué Selic hace falta para que el margen con el mercado vuelva a positivo?', por_que: 'El banco es pasivo-sensible.' },
      { tema: 'Rentabilidad', pregunta: '¿Qué ROE objetivo tiene el nuevo consejero delegado y en qué plazo?', por_que: 'Sin un ROE por encima del 20 % no cubre su Ke.' },
      { tema: 'Laudo', pregunta: '¿Qué rango de valor da el laudo de UBS BB y cómo se compara con el ratio ofrecido?', por_que: 'Es la referencia de precio justo para el minoritario.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener con convicción baja según la regla a 12 meses, pero el método no da una señal fiable: desde el 30-jul el precio lo fija la oferta de canje de Banco Santander (0,40 acciones de la matriz por unit, 26,9-27,4 BRL el 26-oct), no el beneficio. La regla (v3, BPA recurrente) da un objetivo de 31,95 BRL, un +29,2 % ponderado y un +30,2 % en el base con el dividendo, pero falla la tercera condición: el valor intrínseco del modelo de exceso de rentabilidad es de 17,76 BRL, un 32,5 % por debajo del precio de 26,30 BRL (cierre del 26-oct-2026). Y la calidad tampoco pasa. El motor sugiere convicción media; la bajamos por la oferta.

**El negocio.** Tercer banco privado de Brasil, en mal momento: ROE recurrente del 12,5 % en el 2T26 (17,3 % en 2025), coste del crédito del 3,81 % de la cartera, morosidad a más de 90 días del 3,3 % (2,6 % un año antes), eficiencia del 39,3 % y CET1 del 11,2 % [A1]. La calidad, medida como ROE − Ke, falla de lleno: con un Ke en reales del 20,94 % (bono a 10 años 15,435 % + 1,0 × 5,5 %), el exceso es de −3,6 puntos en 2025 y de −6,6 en el 1S26; ni con el bono de antes de las elecciones llega a cero. No es comprable en ningún nivel. Sostenibilidad: «En parte»; el crecimiento se financia, pero con este Ke crecer destruye valor.

**Valoración.** El modelo de exceso de rentabilidad da 18,05 BRL en el base (13,48 bajista, 21,47 alcista) y el P/VC justificado 0,69 veces (17,78 BRL), frente a 1,02 veces en bolsa. El DCF adaptado cuadra (20,36). El precio pide un Ke del 16,4 %, igual a la tasa libre sin prima de riesgo: lo sostiene la oferta, no el negocio.

**El efecto Lula.** La reelección del 25-oct hundió la banca brasileña el 26-oct (Itaú −13 %, Bradesco ≈ −21 %) y subió el bono a 10 años 2,46 puntos [D3, D5], pero SANB11 cayó solo un 4,5 %: el real se depreció frente al euro y eso subió el valor en reales de la contraprestación, que compensó la caída de Banco Santander en Madrid (−3,1 %). La subida del Ke quita un 17 % al valor intrínseco (21,76 → 18,05 BRL en el base).

**Riesgos y catalizadores.** El mayor riesgo para el minoritario es quedarse fuera de la oferta con una acción poco líquida y quizá sin ADR [C3]. Después, el ciclo de crédito (bajista −20 % a 12 meses) y la Selic alta en un balance pasivo-sensible. Catalizadores: el 3T26 el 28-oct, el marco fiscal del nuevo Gobierno y el cierre de la oferta en el 1S27.

**Qué cambiaría la decisión.** La regla daría Vender por encima de 37,77 BRL (ponderada ≤ −10 %), lejos del valor de canje. Comprar exigiría un precio por debajo de 17,76 BRL y un ROE − Ke de al menos 4,5 puntos (un ROE recurrente por encima del 25 % con el Ke de hoy): no ocurrirá a 12 meses. Para quien tenga la unit, la decisión práctica no es de este método sino de la oferta: acudir equivale a cambiarla por acciones de Banco Santander, una tesis distinta que este informe no analiza.`,
    tesis: 'Santander Brasil es un banco grande que hoy no cubre su coste del capital en reales: ROE recurrente del 12,5 % en el 2T26 frente a un Ke del 20,9 % [A1, P1]. La morosidad y el coste del crédito suben y el balance sufre con la Selic alta.\n\nEl precio (26,30 BRL, 1,02 veces su valor contable) no lo fija el negocio sino la oferta de canje de la matriz, que tiene el 89,53 % y ofrece 0,40 acciones de Banco Santander por unit (26,9-27,4 BRL el 26-oct) [C2, P1]. Sin la oferta, el valor del negocio estaría en ≈ 18 BRL.\n\nEn esta situación no hay tesis value: la unit es, hasta el cierre de la oferta (1S27), un derivado de la acción de Banco Santander por el tipo de cambio euro/real.',
    vision_diferencial: {
      mercado_descuenta: 'Que la oferta se cierra: la unit cotiza un 2-4 % por debajo del valor de canje, el descuento normal por plazo y riesgo; los analistas, casi todos en mantener, ponen un objetivo medio de 31,18 BRL [D2].',
      nuestra_vision: 'El negocio vale menos que la oferta (17,76 BRL de valor intrínseco frente a 26,9-27,4 de canje): la oferta es generosa para el minoritario con el Ke de hoy, y quedarse fuera tiene más riesgo que acudir.',
      por_que: 'Con un ROE del 12,5-17 % y un Ke del 21 %, el banco destruye valor; el mercado lo pagaría por debajo de su valor contable, como a Bradesco o Banco do Brasil (0,55-0,86 veces) [B4].',
    },
    a_favor: [
      '**Oferta de canje de la matriz** que sostiene el precio: 0,40 acciones de Banco Santander por unit.',
      '**Dividendo alto**: 7,8 % con el reparto de 2025.',
      '**PER de 6,7 veces** el BPA de 2027e.',
      '**Nuevo equipo directivo** (consejero delegado desde el 2S26).',
    ],
    en_contra: [
      '**ROE − Ke de −3,6 a −6,6 puntos** con el Ke en reales del 20,94 %: muy lejos del suelo de 4,5.',
      '**Valor intrínseco de 17,76 BRL**, un 32,5 % por debajo del precio.',
      '**Morosidad del 3,3 %** y coste del crédito del 3,81 %, subiendo.',
      '**Balance pasivo-sensible**: la Selic alta tras las elecciones le resta margen.',
      '**Minoritario en desventaja**: tras la oferta, menos liquidez y posible salida del ADR.',
    ],
    que_vigilar: 'La oferta: el valor de canje (ratio × Banco Santander × EUR/BRL) y el calendario de la subasta. En el banco, el coste del crédito del 3T26 (28-oct): por encima del 4 % de la cartera, el ROE se queda en el bajista.',
    cambiaria_recomendacion: [
      'Precio por encima de 37,77 BRL: Vender (ponderada a 12 meses ≤ −10 %).',
      'Retirada o fracaso de la oferta: rehacer el análisis; el precio iría hacia el valor del negocio.',
      'Precio por debajo de 17,76 BRL y ROE − Ke ≥ 4,5 a la vez: Comprar (no ocurrirá a 12 meses).',
      'Coste del crédito por encima del 4,2 % en el 3T26 o el 4T26: revisar el BPA a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Valor de canje por unit (ratio × SAN × EUR/BRL)', nivel_actual: '26,92 BRL (26-oct-2026)', umbral_alerta: 'Descuento de la unit > 6 %', por_que: 'Mide el riesgo que el mercado ve en la oferta.' },
      { kpi: 'ROE recurrente', nivel_actual: '12,5 % (2T26)', umbral_alerta: '< 12 %', por_que: 'Lo que el banco gana sobre su coste.' },
      { kpi: 'Coste del crédito sobre cartera (12 meses)', nivel_actual: '3,81 % (2T26)', umbral_alerta: '> 4,2 %', por_que: 'Separa el base del bajista.' },
      { kpi: 'Morosidad a más de 90 días', nivel_actual: '3,3 % (jun-2026)', umbral_alerta: '> 3,6 %', por_que: 'Ciclo de crédito.' },
      { kpi: 'Bono del Tesoro brasileño a 10 años (BRL)', nivel_actual: '15,435 % (26-oct-2026)', umbral_alerta: '< 13 % o > 16 %', por_que: 'Decide el Ke.' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Valoración bancaria de Santander Brasil: exceso de rentabilidad, P/VC justificado, Ke en reales, oferta de canje y sensibilidades (valoracion-banco.md, generado por notas/valoracion-banco.mjs)', editor: 'Elaboración propia', tipo: 'Primaria', fecha: '2026-10-27', url: null },
  ],
};
