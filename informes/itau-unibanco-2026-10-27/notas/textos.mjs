// Textos del analista (Itaú Unibanco, corte 2026-10-27). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'ES UN BANCO y el motor no tiene modelo de bancos: EBITDA, ROIC, valor empresa, deuda neta y circulante no significan nada aquí. Adaptaciones: (1) la calidad se mide con ROE recurrente − Ke (coste del capital propio en reales) en lugar de ROIC − WACC, con la misma regla de nunca menos de 4,5 puntos; (2) el valor intrínseco sale de un modelo de exceso de rentabilidad (residual income) con P/VC justificado de contraste (valoracion-banco.md [P1]), que entra al 100 % como «suma de partes» con valor directo; (3) el DCF del motor es un flujo para el accionista (beneficio − retención para crecer con el CET1 objetivo, deuda 0) y solo es comprobación (peso 0). Bases contables: la serie histórica del informe es NIIF del 20-F (cuentas.mjs --sec solo devolvía US GAAP de 2007-2010; se leyeron las instancias XBRL del 20-F 2025, 2023 y 2022 [A4, A5]); el BPA, el ROE, la regla a 12 meses y el modelo bancario usan el resultado recurrente gerencial BR GAAP, el de referencia del mercado [A1, A7-A10]. Millones de BRL. Línea de compra: ADR ITUB en NYSE (7,70 USD al cierre del 26-oct-2026, 1 ADR = 1 preferente ITUB4), convertido a 5,4064 BRL/USD (Yahoo al cierre; PTAX 5,5007 [D7]) = 41,63 BRL; ITUB4 cerró a 41,70 BRL en B3 [D2]. Se usa el ADR porque es el práctico (IBKR no tiene la suscripción de datos de B3). Yahoo no tenía aún la barra diaria del 26-oct de ITUB4. Último trimestre publicado: 2T26; el 3T26 sale el 3-nov tras el cierre [D10].',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: '11,4 % NIIF en 2024: los intereses sobre el capital propio (JCP) son deducibles y la cobertura de las inversiones en el exterior se contabiliza en impuestos [A4]. Normal en la banca brasileña. El DCF adaptado usa un 9 %, el de 2025, porque está calibrado para que el beneficio sea ROE × patrimonio; no cambia el valor que manda (residual income sobre beneficio recurrente después de impuestos).' },
    { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: '8,8 % NIIF en 2025 por la misma causa (JCP deducible y cobertura cambiaria) [A4]. La guía gerencial de 2026 (29,5-32,5 %) es antes de esos efectos [A1]. El riesgo es legal: limitar el JCP subiría el tipo; está en riesgos.' },
    { control: 'Crecimiento a perpetuidad ≤ 3 %', explicacion: 'El 5,0 % es NOMINAL EN REALES: IPCA de largo plazo del Focus (3,5 % [D13]) + 1,5 de crecimiento real. Equivale a un 1,5 % real, dentro de la regla. La tasa libre (15,44 %) y el Ke (21,49 %) están en la misma moneda. En el modelo de exceso de rentabilidad el terminal casi no pesa porque el ROE del año 10 (21,5 %) iguala al Ke.' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    rentabilidad: {
      comentario: 'En un banco el ROIC del motor (20,4 % en 2025, NIIF, con deuda y caja 0) es solo el ROE con otro nombre; la cifra de calidad del informe es el ROE RECURRENTE − Ke. ROE recurrente gerencial del 23,4 % en 2025 y del 24,5 % en el 1S26 (24,3 % en el 2T26; Brasil 25,7 %, América Latina 12,3 %) [A1, A10], frente a un Ke en reales del 21,49 % (bono a 10 años 15,44 % + 1,10 × 5,5 % [D3]): exceso de 1,9 puntos (2025) y 3,0 (1S26). NO PASA el suelo del método (4,5) y no es comprable en ningún nivel (A, B1, B2 o C). Con el bono de antes de las elecciones (12,98 %, Ke 19,03 %) quedaba en 4,4-5,5, al filo [P1]. Indicadores bancarios del 2T26 [A1]: CET1 12,3 % (objetivo de gestión 11,5 %; Tier 1 13,8 %, Basilea 15,4 %); morosidad a más de 90 días 1,9 % estable (15-90 días 1,8 %); coste del crédito 10.139 M en el trimestre, el 2,7 % de la cartera; margen con clientes del 9,1 % (10,0 % en Brasil; 6,2 % ajustado por riesgo); eficiencia del 37,4 % (35,5 % en Brasil), la mejor de los grandes bancos; provisiones de 56.900 M, ≈ 197 % de la cartera a más de 90 días (estimación propia; 320 % en 2020 [A9]) y cobertura de la fase 3 del 53,8 %; liquidez LCR 202 %. Sensibilidad a la Selic: +1 punto da ≈ +0,9 mil M después de impuestos en el margen del capital propio (137.357 M al 12 %, antes de coberturas: ≈ +1,8 % del beneficio), pero sube el Ke y quita ≈ 6 % del valor intrínseco por punto [P1].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Itaú gestiona el capital con un CET1 objetivo del 11,5 % y reparte el exceso: payout del 72 % en 2025 con dividendos y JCP mensuales, extraordinarios y recompras [A3]. Dividendos y JCP pagados de 21.314 M en 2024 y 48.299 M en 2025 (incluye extraordinarios), recompras de 1.775 M y 3.085 M [A4]. Programa de recompra de hasta 200 M de preferentes (≈ 1,8 % de las acciones) hasta el 4-ago-2027 [C2]. Bonificaciones en acciones del 10 % (mar-2025) y del 3 % (dic-2025) [A6].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Avenue (corredora de inversión en EE. UU., toma de control)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Consolidada desde el 1T26; pequeña frente al banco [A1].' },
        { anio: '2026', objetivo: 'NeoSpace (modelos de IA entrenados con datos de Itaú)', importe: 2925, ev_ebitda: null, financiacion: 'Caja, parte aplazada a cinco años', resultado: 'Firmada el 26-oct-2026; pendiente de CADE y del Banco Central; ≈ 0,27 BRL por acción y el 1,4 % del patrimonio [A12].' },
      ],
      comentario: 'Buena asignadora: el ROE recurrente subió del 19,3 % de 2021 al 23,4 % de 2025 sin compras grandes, y el capital que sobra vuelve al accionista (payout del 72 %) en vez de acumularse [A3, A10]. Salió de mercados de baja rentabilidad (venta de la banca minorista en Argentina, Colombia reducida) y cerró oficinas [A3]. El riesgo de la política es que el CET1 ya baja (13,1 % → 12,3 % en un año) y un ciclo de crédito peor reduciría los extraordinarios. NeoSpace es cara para su tamaño, pero no mueve el valor (1,4 % del patrimonio).',
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Los «ingresos» crecen como el patrimonio y la cartera: 8 % en 2026e-2027e (guía de cartera +5,5-9,5 % [A11], inflación del 4,3-5,2 % [D13]), y bajan al 5 % en 2035e, el terminal nominal. Es la misma senda del modelo de exceso de rentabilidad [P1].',
    margenes: '«Margen EBITDA» = beneficio antes de impuestos sobre ingresos, calibrado para que el beneficio después de impuestos sea el ROE del caso base por el patrimonio inicial: 36,7 % en 2026e (ROE 24,5 %) a 33,1 % en 2035e (ROE 21,5 %). El ROE baja medio punto al año porque la competencia digital, Pix y el open finance aprietan las comisiones (guía rebajada a +2-5 % [A11]) y porque un ROE del 24 % con un CET1 del 12 % es alto para siempre.',
    inversion: '«Capex» = retención: lo que el banco debe guardar para que el patrimonio crezca con los activos ponderados por riesgo y el CET1 se quede en el 11,5 %: g × 1,47 ÷ (1 + g) de los ingresos (10,9 % en 2026e, 7,0 % en 2035e). Amortización y circulante 0. El flujo que queda es lo que puede repartir: un flujo para el accionista.',
    wacc: 'WACC = Ke en reales: bono del Tesoro brasileño a 10 años del 15,44 % (26-oct-2026, +2,46 puntos el día de la caída [D3]) + beta 1,10 (medida 1,11-1,19 [D1]) × 5,5 % = 21,49 %. Sin prima adicional: el riesgo país ya está en la tasa libre en reales; los +3 puntos del escáner lo contaban dos veces. Peso de la deuda 0: en un banco la deuda es materia prima. Antes de las elecciones (12,98 %) el Ke era del 19,03 %.',
    terminal: 'Gordon al 5,0 % nominal en reales: IPCA de largo plazo del Focus (3,5 % [D13]) + 1,5 de crecimiento real. Pesa solo el 26 % del valor porque, con un Ke del 21,5 %, lo lejano casi no vale.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +7,5 % (cartera +9,6 % interanual en jun-2026 y guía de +5,5-9,5 % [A1, A11]); precio +0,5 % (mezcla hacia particulares y pymes, margen con clientes estable en el 9,1 %).',
    '2027e': 'Volumen +7,5 %: el crédito del sistema crece ≈ 10 % anual desde 2019 [B1]; Itaú algo menos por prudencia en riesgo.',
    '2028e': 'Volumen +7 % con la Selic bajando hacia el 10 % del Focus [D13]; precio +0,5 %.',
    '2029e': 'Volumen +6,5 %.',
    '2030e': 'Volumen +6 %: converge al crecimiento nominal de la economía.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El banco genera más capital del que necesita para crecer: con un ROE del 24 % y un crecimiento del patrimonio del 8 % retiene un tercio y reparte dos tercios, como hace hoy (payout del 72 % [A3]). El motor da «En parte» porque mide con el ROIC NIIF (20,4 %) y lo compara con un WACC del 21,5 %: crecer con un ROE apenas por encima del Ke casi no crea valor. Esa es la conclusión que importa: el crecimiento es financiable, pero con el Ke de hoy aporta poco valor.',
  dcf_lectura: 'El DCF adaptado (flujo para el accionista) da 22,55 BRL por acción en el base, un 45,8 % por debajo del precio, y cuadra con el modelo de exceso de rentabilidad (21,74): los dos descuentan lo que el banco puede repartir al mismo Ke del 21,49 %. El DCF inverso dice que el precio descuenta un crecimiento del 16,7 % anual (frente al 6,5 % del base) o, lo que es más razonable, una rentabilidad anual del 13,8 %, por debajo de la tasa libre de hoy (15,44 %). Las cifras de EV/EBITDA, deuda neta/EBITDA y ROIC del motor no significan nada en un banco y no se usan.',
  narrativas: {
    Bajista: 'Giro fiscal sin ancla: la Selic sigue alta más tiempo, la morosidad de particulares y pymes sube y el coste del crédito pasa del 2,7 % al ≈ 3,4 % de la cartera; ROE ≈ 21 % y cartera +5 %.',
    Base: 'ROE recurrente del 24,5 % que baja medio punto al año hasta el 21,5 % por la competencia digital y las comisiones; patrimonio y cartera +8 % a +5 %; CET1 en el 11,5-12 % y payout del 65-70 %.',
    Alcista: 'La eficiencia (IA, cierre de oficinas) sostiene el ROE cerca del 25 % y la cartera crece 1 punto más con la Selic bajando.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF adaptado quedan muy por debajo del precio (bajista 16,79, base 22,55 y alcista 25,86 BRL), como los del modelo de exceso de rentabilidad (18,01, 21,74 y 23,86). La razón es la misma en todos: con un Ke del 21,5 %, un ROE del 22-25 % apenas crea valor, y el banco vale poco más que su valor contable (18,92 BRL). Con el Ke de antes de las elecciones, el base sube a 25,55 BRL; para justificar el precio haría falta un Ke del 13,6 % [P1].',
  suma_partes_comentario: 'No es una suma de partes: es el vehículo para que el valor del modelo de exceso de rentabilidad (residual income) sea el valor intrínseco del motor. Una sola «parte», el banco entero, con valor directo = 21,34 BRL ponderados × 11.022 M de acciones = 235.210 M (patrimonio, no valor empresa; el puente es 0). Detalle y tablas en valoracion-banco.md [P1].',
  casos_12m: {
    Bajista: 'Coste del riesgo un 25-30 % mayor tras el giro fiscal (ROE ≈ 21 %) y cartera +5 %: BPA recurrente de 4,45 BRL en 2028e × 6,2 veces (el base × 0,8, por debajo del mínimo adelantado de 6,4) = 27,59 BRL.',
    Base: 'Resultado recurrente de ≈ 50.300 M en 2026e (1S26 real 24.689 M), +7,7 % en 2027e y +6,9 % en 2028e con un ROE del 23,5 % y el patrimonio al +7,5 %: BPA de 5,25 BRL × 7,7 veces (el PER actual de 8,5 ÷ 1,1, el tope; la mediana adelantada de 6,8 queda más lejos) = 40,43 BRL.',
    Alcista: 'ROE ≈ 25 % con eficiencia e IA y cartera +9 %: BPA de 5,55 BRL × 9,8 veces (la mediana del PER adelantado de los comparables) = 54,39 BRL.',
  },
  diferencia_consenso: 'Nuestro BPA recurrente de 2026e (4,56 BRL) coincide con el consenso (4,60); en 2027e quedamos un 2,5 % por debajo (4,91 frente a 5,04), que ya bajó desde 5,13 hace 90 días [D2]. La diferencia no está en el beneficio sino en el múltiplo: el objetivo medio de los analistas (49,69 BRL, anterior a la caída del 26-oct) supone ≈ 10 veces el BPA de 2027e; la regla del método, con la historia adelantada de Itaú (mediana de 6,8), da 7,7.',
  objetivo_comentario: 'El objetivo a 12 meses (40,71 BRL, 7,53 USD, ponderado) queda un 2 % por debajo del precio: con el dividendo (6,9 %) da un +4,7 % ponderado y un +4,0 % en el base, lejos del 15 % de compra. El valor intrínseco (21,34 BRL, 3,95 USD) está un 48,7 % por debajo: la distancia es de método, no de beneficio. Se cerraría solo si los tipos en reales bajaran de forma duradera (cada punto de tasa libre suma ≈ 6 % al valor) o si el ROE subiera por encima del 27 %. Con el Ke de hoy, la tesis no se cierra ni a varios años.',
  valoracion_comentario: 'Pesos: modelo de exceso de rentabilidad 100 % (vía suma de partes); DCF adaptado, comparables y transacciones 0. El DCF adaptado solo sirve para comprobar el modelo (22,55 frente a 21,74 BRL). Los comparables por P/VC (bancos brasileños a 0,8-1,6 veces; Itaú a 2,2) y el PER (9,8 veces de mediana) entran en la regla a 12 meses, no en el valor intrínseco. El valor intrínseco depende sobre todo de la tasa libre en reales: a 15,44 % vale 21,7 BRL; a 13,5 %, 24,6; a 12,98 % (antes de las elecciones), 25,6; el precio pide un Ke del 13,6 % [P1]. Por eso la magnitud del valor intrínseco no es fiable; la dirección sí: con cualquier tasa libre de los últimos dos años, el precio queda por encima.',
  catalizadores: {
    items: [
      { fecha: '2026-11-03', evento: 'Resultados del 3T26 (tras el cierre de B3; conferencia el 4-nov)', efecto: 'ROE, coste del crédito y guía de 2027; primer dato tras el giro electoral', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11/12', evento: 'Nombramiento del ministro de Hacienda y marco fiscal del nuevo mandato', efecto: 'Mueve el bono a 10 años y con él el Ke (≈ 6 % del valor por punto)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-12', evento: 'Reunión del Copom y Focus', efecto: 'Selic de 2027 (11,75 % en el Focus del 23-oct)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados del 4T26, guía de 2027 y dividendo extraordinario', efecto: 'Payout y CET1 objetivo', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Reforma de los impuestos a la banca o al JCP', efecto: 'Subir el tipo efectivo restaría beneficio', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Tipos en reales altos más tiempo tras la reelección de Lula (bono a 10 años del 15,4 %)', tipo: 'Macro', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−6 % del valor intrínseco por punto de tasa libre', mitigante: 'Itaú gana algo con la Selic alta (margen del capital propio); el beneficio apenas se mueve [A1].' },
      { riesgo: 'Ciclo de crédito: morosidad de particulares y pymes y coste del crédito por encima de la guía (38,5-43,5 mil M)', tipo: 'Crédito', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −20 % (bajista)', mitigante: 'Provisiones de 56.900 M (≈ 2 veces la cartera a más de 90 días) y cartera más garantizada [A1].' },
      { riesgo: 'Impuestos a la banca o límites al JCP para cerrar el déficit', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'El tipo NIIF del 8,8 % depende del JCP; ya ha habido intentos sin éxito [A4].' },
      { riesgo: 'Competencia digital (Nubank, Mercado Pago) y Pix en comisiones', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Eficiencia del 35,5 % en Brasil y cartera de alta renta [A1].' },
      { riesgo: 'Real débil: el ADR en USD cae más que la acción en B3', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % el 26-oct (ADR −20,4 % frente a ITUB4 −13,2 %)', mitigante: 'Ninguno para el inversor en USD.' },
      { riesgo: 'Riesgo de IA (los rivales digitales y las grandes tecnológicas automatizan crédito y atención)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±3 % a 3-5 años', mitigante: 'Itaú invierte (NeoSpace, asistente «ia.i») [A12].' },
    ],
    premortem: 'Octubre de 2028: el ADR ha perdido un 35 %. El nuevo Gobierno amplió el gasto, el bono a 10 años pasó del 16 % y la Selic no bajó; la morosidad de particulares y pymes subió y el coste del crédito llegó al 3,5 % de la cartera. El Congreso limitó el JCP y el tipo efectivo subió 5 puntos. El ROE bajó al 20 %, los extraordinarios se acabaron y el mercado pasó a pagar 1,4 veces el valor contable, como a Bradesco. El real perdió otro 15 %.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '±3 % a 3-5 años',
      comentario: 'La IA abarata la atención, el análisis de crédito y el cobro: Itaú ya tiene la mejor eficiencia de los grandes bancos (37,4 %) y compra NeoSpace para entrenar modelos con sus datos [A1, A12]. Pero también baja la barrera de los bancos digitales y de las tecnológicas en crédito al consumo. Efecto neto pequeño en 3-5 años.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Coste del crédito', pregunta: '¿Mantiene la guía de coste del crédito de 2026 y qué espera para 2027 con la Selic alta más tiempo?', por_que: 'Es la diferencia entre el base y el bajista.' },
      { tema: 'Capital', pregunta: '¿Sigue el CET1 objetivo del 11,5 % y el payout con extraordinarios tras el giro fiscal?', por_que: 'El 6,9 % de dividendo es parte de la rentabilidad a 12 meses.' },
      { tema: 'JCP e impuestos', pregunta: '¿Qué efecto tendría eliminar el JCP en el tipo efectivo y en el ROE?', por_que: 'El tipo NIIF del 8,8 % depende de él.' },
      { tema: 'Comisiones', pregunta: '¿Por qué se rebajó la guía de comisiones a +2-5 % y es temporal?', por_que: 'Explica la caída del ROE del base.' },
      { tema: 'NeoSpace', pregunta: '¿Qué ahorro de costes o de pérdidas espera de NeoSpace y en qué plazo?', por_que: '2.925 M por una empresa de IA necesita un retorno medible.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener con convicción baja según la regla a 12 meses, pero la acción robusta es «No mantener» (prueba de robustez sólida): no comprar, y quien la tuviera no pasaría el filtro de mantener (valor intrínseco muy por debajo del precio). La regla a 12 meses (v3, BPA recurrente) da un objetivo de 40,71 BRL (7,53 USD), un +4,7 % ponderado y un +4,0 % en el base con el dividendo: lejos del 15 % de compra y del −10 % de venta. El valor intrínseco del modelo de exceso de rentabilidad es de 21,34 BRL (3,95 USD), un 48,7 % por debajo del precio de 7,70 USD (41,63 BRL, cierre del 26-oct-2026), y el objetivo medio de los analistas (49,69 BRL) queda un 19 % por encima de nuestro base. La convicción es baja (el motor sugiere media) porque el método no da una señal fiable para un banco brasileño: el valor intrínseco lo decide la tasa libre en reales. La subiría un marco fiscal creíble que devuelva el bono a 10 años por debajo del 13 %.

**El negocio.** Itaú es el banco más rentable de los grandes de Brasil: ROE recurrente del 24,3 % en el 2T26, eficiencia del 37,4 %, morosidad a más de 90 días estable en el 1,9 %, coste del crédito del 2,7 % de la cartera y CET1 del 12,3 % [A1]. Pero la regla de calidad del método, aplicada como ROE − Ke, falla: con un Ke en reales del 21,49 % (bono a 10 años 15,44 % + 1,10 × 5,5 %), el exceso es de 1,9 puntos en 2025 y de 3,0 en el 1S26, por debajo del suelo de 4,5. No es comprable en ningún nivel. Sostenibilidad: «En parte»; el crecimiento se financia con holgura (reparte el 72 % del beneficio [A3]), pero con este Ke crecer apenas crea valor.

**Valoración.** El modelo de exceso de rentabilidad da 21,74 BRL en el base (18,01 bajista, 23,86 alcista) y el P/VC justificado 1,15 veces (21,80 BRL), frente a 2,20 veces en bolsa. El DCF adaptado a flujo para el accionista cuadra (22,55 BRL). El precio pide un Ke del 13,6 %, por debajo de la tasa libre de hoy: el mercado descuenta tipos en reales mucho más bajos o paga a Itaú como un banco de país estable. Con el bono de antes de las elecciones (12,98 %), el valor sube a 25,55 BRL y el exceso del ROE a 4,4-5,5: la dirección («no comprar») aguanta; la magnitud, no.

**El efecto Lula.** La reelección del 25-oct hundió el ADR un 20,4 % el 26-oct (ITUB4 −13,2 % en reales, el resto es el real) y subió el bono a 10 años 2,46 puntos [D3, D5, D6]. Esa subida del Ke quita un 15 % al valor intrínseco, casi lo mismo que cayó la acción en reales: la caída no abre una oportunidad. El contexto de bolsa «retrasa» hasta conocer el marco fiscal.

**Riesgos y catalizadores.** Los de mayor impacto: tipos altos más tiempo (−6 % del valor por punto), un ciclo de crédito tras el giro fiscal (bajista −27 % a 12 meses) y límites al JCP (el tipo efectivo NIIF es del 8,8 %). Catalizadores: resultados del 3T26 el 3-nov, nombramiento del ministro de Hacienda y Copom de diciembre.

**Qué cambiaría la decisión.** El filtro de mantener solo se pasaría por debajo de 4,64 USD; la regla daría Vender por encima de 8,96 USD (48,42 BRL, ponderada ≤ −10 %). Comprar exigiría a la vez un precio por debajo de 3,95 USD (21,34 BRL), donde coinciden la regla a 12 meses y el valor intrínseco, y un ROE − Ke de al menos 4,5 puntos: un bono a 10 años por debajo del 13 % con el ROE de hoy, o un ROE recurrente por encima del 26 % con el Ke de hoy.`,
    tesis: 'Itaú Unibanco es el mejor banco grande de Brasil: ROE recurrente del 24 %, eficiencia del 37 %, morosidad estable del 1,9 % y un CET1 del 12,3 % que le deja repartir el 72 % del beneficio [A1, A3]. Gana 46.800 M BRL al año y cotiza a 2,2 veces su valor contable y 8,5 veces el beneficio de 2027e.\n\nEl precio descuenta un coste del capital propio del 13,6 %: menos que el bono brasileño a 10 años de hoy (15,44 %) e incluso que el de antes de las elecciones (12,98 %). Es decir, descuenta que los tipos en reales bajarán mucho y por mucho tiempo, o que Itaú es tan seguro como un banco de un país sin riesgo fiscal [P1, D3].\n\nCon el método del repositorio (Ke en reales con la tasa libre de hoy, sin prima país adicional), Itaú gana solo 1,9-3,0 puntos por encima de su Ke y vale 21,3 BRL, la mitad del precio. Para invertir hay que creer que la tasa libre en reales volverá por debajo del 12-13 % de forma duradera, justo después de un resultado electoral que la ha subido. Es una apuesta macro, no una tesis value.',
    vision_diferencial: {
      mercado_descuenta: 'Que Itaú sigue ganando un 23-25 % sobre su patrimonio y que el coste del capital en reales bajará: el precio implica un Ke del 13,6 % y los analistas ponen un objetivo medio de 49,69 BRL, con 10 de 13 en comprar (antes de la caída del 26-oct) [D2].',
      nuestra_vision: 'Coincidimos en el beneficio (BPA de 2026e de 4,56 frente a 4,60 del consenso); discrepamos en el coste del capital. Con la tasa libre en reales de hoy, un ROE del 24 % apenas supera al Ke, y un banco así vale 1,1-1,4 veces su valor contable, no 2,2.',
      por_que: 'El bono a 10 años en reales lleva dos años entre el 12 % y el 15,5 %, y la reelección lo ha llevado al máximo de una década [D3]. El mercado paga la calidad de Itaú con un Ke de país estable; el método no lo hace. Pero el método puede equivocarse: usa una tasa libre plana durante diez años, cuando el Focus ve la Selic en el 10 % desde 2028 [D13].',
    },
    a_favor: [
      '**ROE recurrente del 24,3 %** en el 2T26, el mayor de los grandes bancos brasileños.',
      '**Eficiencia del 37,4 %** (35,5 % en Brasil).',
      '**Riesgo controlado**: morosidad a más de 90 días del 1,9 % y coste del crédito del 2,7 %.',
      '**Reparte mucho**: payout del 72 % en 2025 y dividendo del 6,9 %.',
      '**PER de 8,5 veces** el BPA de 2027e.',
    ],
    en_contra: [
      '**ROE − Ke de solo 1,9-3,0 puntos** con el Ke en reales del 21,49 %: no pasa el suelo de 4,5.',
      '**Valor intrínseco de 21,34 BRL** (3,95 USD), un 48,7 % por debajo del precio.',
      '**2,2 veces el valor contable**, el doble que el P/VC justificado (1,15).',
      '**Tipos en reales en máximos de una década** tras la reelección de Lula (15,44 %).',
      '**Riesgo de divisa** para el inversor en USD: el ADR cayó un 20,4 % el 26-oct, frente al −13,2 % en reales.',
    ],
    que_vigilar: 'La tesis del mercado depende de que la tasa libre en reales baje. La señal clave es el bono a 10 años: por debajo del 13 % con el ROE de hoy, Itaú volvería a pasar el suelo de calidad (4,5 puntos); por encima del 16 %, el valor intrínseco baja a ≈ 20 BRL. En el banco, el coste del crédito: por encima del 3 % de la cartera, el ROE baja al bajista.',
    cambiaria_recomendacion: [
      'Precio por encima de 8,96 USD (48,42 BRL): Vender (ponderada a 12 meses ≤ −10 %).',
      'Bono brasileño a 10 años por debajo del 13 % de forma sostenida con un ROE recurrente ≥ 24 %: rehacer el análisis; pasaría la calidad.',
      'Precio por debajo de 3,95 USD (21,34 BRL) y ROE − Ke ≥ 4,5 a la vez: Comprar.',
      'Coste del crédito por encima del 3,2 % de la cartera en el 3T26 o el 4T26, o fin del JCP: revisar el BPA a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Bono del Tesoro brasileño a 10 años (BRL)', nivel_actual: '15,44 % (26-oct-2026)', umbral_alerta: '< 13 % o > 16 %', por_que: 'Decide el Ke y la calidad del método.' },
      { kpi: 'ROE recurrente', nivel_actual: '24,3 % (2T26)', umbral_alerta: '< 22 %', por_que: 'Lo que el banco gana sobre su coste.' },
      { kpi: 'Coste del crédito sobre cartera', nivel_actual: '2,7 % (2T26)', umbral_alerta: '> 3,2 %', por_que: 'Separa el base del bajista.' },
      { kpi: 'Morosidad a más de 90 días', nivel_actual: '1,9 % (jun-2026)', umbral_alerta: '> 2,4 %', por_que: 'Primer aviso del ciclo de crédito.' },
      { kpi: 'CET1', nivel_actual: '12,3 % (jun-2026)', umbral_alerta: '< 11,5 %', por_que: 'Limita los dividendos extraordinarios.' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Valoración bancaria de Itaú Unibanco: exceso de rentabilidad, P/VC justificado, Ke en reales y sensibilidades (valoracion-banco.md, generado por notas/valoracion-banco.mjs)', editor: 'Elaboración propia', tipo: 'Primaria', fecha: '2026-10-27', url: null },
  ],
};
