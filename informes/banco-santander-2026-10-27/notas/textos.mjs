// Textos del analista (Banco Santander, corte 2026-10-27). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'ES UN BANCO y el motor no tiene modelo de bancos: EBITDA, ROIC, valor empresa, deuda neta, circulante, Altman Z y Piotroski no significan nada aquí. Adaptaciones, las mismas que en Itaú, BTG y Santander Brasil del 27-oct: (1) la calidad se mide con RoTE ordinario − Ke (y con RoE, que incluye el fondo de comercio) en lugar de ROIC − WACC, con la misma regla de nunca menos de 4,5 puntos; (2) el valor intrínseco sale de un modelo de exceso de rentabilidad sobre el valor contable tangible por acción (residual income) con P/VTC justificado de contraste (valoracion-banco.md [P1]), que entra al 100 % como «suma de partes» con valor directo; (3) el DCF del motor es un flujo para el accionista (beneficio − retención para crecer con el CET1, deuda 0) y solo es comprobación (peso 0). Bases contables: la serie histórica del informe es NIIF del ESEF 2021-2025 [A2] (2023 y 2024 reexpresados sin Polonia); el BPA, el RoTE, la regla a 12 meses y el modelo bancario usan la cuenta ordinaria («underlying») del Informe Financiero del 2T26 [A1]. Millones de EUR. Línea de compra: SAN en Madrid, 11,154 € al cierre del 26-oct-2026 [D1]; ADS SAN en la NYSE (1 ADS = 1 acción). Último trimestre publicado: 2T26; el 3T26 sale mañana, 28-oct, antes de la apertura [D8]. El VTC de partida incluye una estimación propia del fondo de comercio de Webster (≈ 5.000 M) [P1].',
  controles_explicados: [
    { control: 'BAI − impuestos − minoritarios = beneficio neto', explicacion: 'En 2023-2025 la diferencia es el resultado de actividades interrumpidas (Polonia, vendida a Erste en enero de 2026): 1.542 M en 2025 [A2]. El ESEF de 2025 reexpresa 2023 y 2024 con Polonia fuera del BAI.' },
    { control: 'BPA = beneficio neto / acciones', explicacion: 'El BPA publicado descuenta los cupones de los AT1 (≈ 600-750 M al año) y usa acciones medias, no las de cierre: 0,77 € publicado en 2024 frente a 0,83 con las acciones de cierre [A2].' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    rentabilidad: {
      comentario: 'En un banco el ROIC del motor (patrimonio NIIF con deuda y caja 0) no es la cifra de calidad; la del informe es el RoTE ORDINARIO − Ke. RoTE ordinario del 15,2 % en 2025 (reexpresado sin Polonia) y del 15,6 % en el 1S26 (16,0 % en el 2T26) [A1], frente a un Ke en euros del 12,06 % (Bund 3,43 % [D3] + beta 1,24 × 5,5 % + prima país ponderada por beneficio de 1,81 [D5]): exceso de 3,14 puntos (2025) y 3,54 (1S26). NO PASA el suelo del método (4,5) y no es comprable en ningún nivel (A, B1, B2 o C) [P1]. Sin la prima país pasaría (4,95 y 5,35, con un Ke del 10,25 %): la conclusión depende de cobrar o no el riesgo de América Latina, y la cobramos porque es el 40 % del beneficio. Con el RoE ordinario (13,6 % en el 1S26, con el fondo de comercio de TSB, Webster y compras anteriores) el exceso es de solo 1,54. Indicadores bancarios del 2T26 [A1, A3]: CET1 del 14,0 % (requisito del 9,83 %; 12,8-13 % esperado a fin de año con Webster), morosidad del 2,93 % con cobertura del 64 %, coste del riesgo del 1,15 % (Brasil 4,14 %, Argentina 11,1 %, España 0,41 %), eficiencia del 42,8 %, margen de intereses de 11.692 M en el trimestre (+6,1 %; margen del 2,71 % sobre activos rentables). Sensibilidad a tipos: más del 95 % de los ingresos viene de clientes; el BCE volvió a subir en septiembre [B4]; en Brasil, −100 p.b. de Selic suben el margen ≈ 70 M € [D11].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Reparte ≈ 50 % del beneficio ordinario, mitad en efectivo y mitad en recompras, en 2026; desde 2027, ≈ 35 % en efectivo y ≈ 15 % en recompras, y el capital sobrante al final de 2028 [A10]. Dividendo de 0,24 € con cargo a 2025 (+14 %) y a cuenta de 2026 de 0,127 € (pago el 2-nov; último día con derecho el 28-oct) [A4, A10]. Recompras: 5.030 M terminadas en agosto (462,7 M de acciones, 3,08 % del capital, ya amortizadas) y 1.825 M con cargo al 1S26 en curso (1.474 M al 21-oct) [A6, A8, A9]. Objetivo de al menos 10.000 M de recompras con cargo a 2025-2026 [A4].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Webster Financial (EE. UU.)', importe: 10650, ev_ebitda: null, financiacion: '48,75 USD en efectivo + 2,0548 ADS por acción (329,8 M de acciones nuevas)', resultado: 'Cerrada el 20-ago-2026; ≈ −150 p.b. de CET1 [A5, D10].' },
        { anio: '2026', objetivo: 'TSB (Reino Unido)', importe: null, ev_ebitda: null, financiacion: 'Efectivo', resultado: 'Cerrada el 30-abr-2026; −55 p.b. de CET1; ≥ 400 M £ de sinergias [A1, A4].' },
        { anio: '2026', objetivo: '≈ 10 % de Santander Brasil (oferta de canje)', importe: 1908, ev_ebitda: null, financiacion: 'Acciones nuevas de SAN (hasta el 1,1 % del capital)', resultado: 'Registrada el 21-sep-2026; cierre esperado en el 1S27 [D6, D7].' },
      ],
      comentario: 'Asignación activa en 2026: vende Polonia con plusvalía y la mitad del capital liberado a recompras, y compra escala en el Reino Unido y EE. UU., mercados donde su RoTE era bajo (10,7 % y 13,2 %) [A3]. Las recompras a 1,8-1,9 veces el valor tangible crean valor si el RoTE se mantiene por encima del Ke; Webster se pagó a ≈ 1,95 veces su valor tangible con un ROATCE del 16,7 % [A11, D10]: con un Ke de EE. UU. de ≈ 10,5 %, crea valor si llegan las sinergias. Las acciones en circulación han bajado un 17 % desde 2021 pese a Webster [A6, A7].',
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Los «ingresos» crecen como el patrimonio tangible y el balance: 7 % en 2026e-2027e (TSB y Webster entran en el perímetro; crédito +9 % en euros constantes, +5 % sin TSB [A4]), 6-6,5 % en 2028e-2029e y bajan al 3 % en 2035e, el terminal nominal en euros. Es la misma senda del modelo de exceso de rentabilidad [P1].',
    margenes: '«Margen EBITDA» = beneficio antes de impuestos sobre ingresos, calibrado para que el beneficio después de impuestos sea el RoTE del caso base por el patrimonio tangible: RoTE del 16 % en el primer año que sube al 17,5-18 % con las sinergias de TSB y Webster y la eficiencia (42,8 % → ≈ 36 % de objetivo [A3]), sin llegar al > 20 % del plan de 2028, y vuelve al 16,5 % a largo plazo.',
    inversion: '«Capex» = retención: lo que el banco guarda para que el capital crezca con los activos ponderados por riesgo y el CET1 se quede en el 12,8-13 %: g × 1,98 ÷ (1 + g) de los ingresos. Amortización y circulante 0. El flujo que queda es lo que puede repartir (dividendo + recompras).',
    wacc: 'WACC = Ke en euros: Bund a 10 años del 3,43 % (Bundesbank, 26-oct-2026 [D3]) + beta 1,24 (medida: mensual a 5 años frente al STOXX 600 [D1]) × 5,5 % + prima por riesgo país de 1,81 puntos, ponderada por el peso de cada país en el beneficio ordinario del 1S26 con las primas por país de Damodaran (España 1,55, Reino Unido 0,78, EE. UU. 0,23, México 2,46, Brasil 3,24, Chile 1,10, Argentina 9,71 [D5]) = 12,06 %. Peso de la deuda 0. Sensibilidad: sin prima país, 10,25 %; con la prima de mercado de Damodaran (4,2 % [D4]), 10,45 %; con beta 1,0, 10,74 %; con la prima de Brasil subida como su bono el 26-oct, 12,40 % [P1].',
    terminal: 'Gordon al 3,0 % nominal en euros: inflación objetivo del BCE (2 %) + 1 real. Pesa el 50 % del valor en el DCF adaptado; el RoTE terminal (16,5 %) sigue por encima del Ke, así que el terminal suma valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +6 % (crédito +9 % en euros constantes con TSB; +5 % sin TSB [A4]); precio +1 % (margen de intereses +7 % con volúmenes y gestión del balance).',
    '2027e': 'Volumen +6 %: Webster (≈ 86.000 M $ de activos [A11]) un año entero; precio +1 %.',
    '2028e': 'Volumen +5,5 %: crecimiento orgánico de un dígito medio, como pide el plan [A3].',
    '2029e': 'Volumen +5 %.',
    '2030e': 'Volumen +4,5 %: converge al crecimiento nominal de sus economías en euros.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El crecimiento del 5-7 % es financiable: con un RoTE del 16-18 % el banco retiene la mitad y reparte la otra mitad, como hace hoy [A10]. El motor da «En parte» porque mide con el ROIC NIIF de su cuenta adaptada frente al WACC. La conclusión que importa: con el Ke de hoy (12,06 %), crecer crea poco valor (RoTE − Ke ≈ 3,5 puntos), menos del que pide el método para comprar.',
  dcf_lectura: 'El DCF adaptado (flujo para el accionista) da 10,25 € por acción en el base, un 8,1 % por debajo del precio, en línea con el modelo de exceso de rentabilidad (10,20; ponderado 10,05). El DCF inverso dice que el precio descuenta una rentabilidad anual del 11,4 %, por debajo del Ke (12,06 %) y por encima del Ke sin prima país (10,25 %), o un crecimiento del 6,3 % anual frente al 5,2 % del base. El modelo bancario da el mismo mensaje: el precio pide un Ke del 11,3 %, es decir, cobra solo la mitad de la prima por América Latina o da por hecho buena parte del plan de 2028 [P1]. EV/EBITDA, deuda neta/EBITDA, ROIC, Altman Z y Piotroski no significan nada en un banco y no se usan.',
  narrativas: {
    Bajista: 'El coste del riesgo sube en Brasil y México tras el 26-oct y en el consumo en EE. UU., el BCE y el Banco de Inglaterra bajan tipos y la integración de TSB y Webster se retrasa: RoTE del 13-15 % y balance 1,5 puntos más lento.',
    Base: 'RoTE ordinario del 16 % en el primer año que sube al 17,5-18 % con las sinergias y la eficiencia, sin llegar al > 20 % del plan; capital tangible por acción +6-7 % que baja al 3 %; CET1 en el 12,8-13 % y reparto del 50 %.',
    Alcista: 'Se cumple el plan de 2028 (RoTE > 20 %, beneficio > 20.000 M, eficiencia ≈ 36 %) y el RoTE se queda en el 18-20 %.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF adaptado (bajista 6,38, base 10,25 y alcista 13,21 €) cuadran con los del modelo de exceso de rentabilidad (7,64, 10,20 y 12,16) [P1]. Solo el alcista (el plan de 2028 cumplido) supera el precio. La clave es el Ke: sin la prima país, el base vale 12,96 € y el ponderado 12,76, por encima del precio.',
  suma_partes_comentario: 'No es una suma de partes: es el vehículo para que el valor del modelo de exceso de rentabilidad sea el valor intrínseco del motor. Una sola «parte», el banco entero, con valor directo = 10,05 € ponderados × 14.450 M de acciones = 145.223 M (patrimonio, no valor empresa; el puente es 0). Detalle y tablas en valoracion-banco.md [P1].',
  casos_12m: {
    Bajista: 'Coste del riesgo arriba y tipos abajo: BPA ordinario de 1,05 € en 2028e × 4,3 veces (el mínimo adelantado de 5 años, el de 2022, con tipos del BCE a cero) = 4,51 €. Es un múltiplo de otro régimen y lleva el bajista al −60 %.',
    Base: 'Beneficio ordinario de ≈ 15.200 M en 2026e (1S26 real 7.328 M), ≈ 16.900 M en 2027e y ≈ 18.600 M en 2028e con recompras: BPA de 1,28 € × 8,7 veces (el PER actual de 9,6 a mitad de camino hacia la mediana adelantada de 5,3, con el tope ÷ 1,1) = 11,14 €.',
    Alcista: 'Se cumple el plan (≈ 20.500 M de beneficio en 2028): BPA de 1,43 € × 9,0 veces (la mediana de los comparables europeos) = 12,87 €.',
  },
  diferencia_consenso: 'Nuestro BPA ordinario de 2026e (1,00 €) queda un 3 % por debajo del consenso (1,04) y el de 2027e un 7 % (1,16 frente a 1,25); el consenso apenas se ha movido en 90 días [D2]. El objetivo medio de los analistas (13,85 €, de 11,30 a 15,30, 16 de 21 en comprar) queda un 24 % por encima de nuestro base a 12 meses (11,14): los analistas aplican el PER de los comparables (≈ 9-10 veces) a un BPA mayor; la regla del método tira del PER hacia su historia de 4-5 veces.',
  objetivo_comentario: 'La regla a 12 meses (v3) da 9,91 € ponderado, un −9,0 % con el dividendo (+2,0 % en el base): ni Comprar (≥ 15 %) ni el filtro de mantener (ponderada ≥ 10 % y base ≥ 5 %); queda a un punto del Vender (≤ −10 %, por encima de 11,28 €). El valor intrínseco (10,05 €) está un 9,9 % por debajo del precio. **La cifra no es fiable para dar una señal**: la historia de PER adelantado (4,3-5,4 veces en 2020-2024) es la de la banca europea con tipos negativos o cero; el sector se ha revalorizado al doble (mediana de los comparables 9,0 veces) y la regla, sin selector para este caso, lleva el bajista a 4,3 veces (−60 %). Con el bajista en base × 0,80 (7,0 veces), la ponderada sería ≈ −2,5 %: tampoco llegaría a Mantener ni a Comprar. La conclusión que sí es firme no viene de la regla sino de la calidad: con la prima país, el RoTE − Ke (3,5) no llega a 4,5 [P1].',
  valoracion_comentario: 'Pesos: modelo de exceso de rentabilidad 100 % (vía suma de partes); DCF adaptado, comparables y transacciones 0. El DCF adaptado solo comprueba el modelo (10,25 frente a 10,20 €). Los comparables por P/VC (bancos europeos de 0,8 a 2,2 veces según ROE; Santander a 1,46 el contable y 1,83 el tangible pro forma) y por PER (9,0 veces de mediana [D2]) entran en la regla a 12 meses, no en el valor intrínseco. El valor intrínseco depende de la prima país: con ella, 10,05 € ponderados; sin ella, 12,76; con la prima de Brasil subida tras el 26-oct, 9,80 (base). El precio pide un Ke del 11,3 % [P1].',
  catalizadores: {
    items: [
      { fecha: '2026-10-28', evento: 'Resultados del 3T26 (antes de la apertura; conferencia a las 10:00) y último día con derecho al dividendo a cuenta de 0,127 €', efecto: 'Primer trimestre con Webster; TNAV por acción real tras la compra; coste del riesgo de Brasil y Argentina', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11/12', evento: 'Marco fiscal del nuevo Gobierno de Brasil y Copom de diciembre', efecto: 'Mueve el real y la Selic (14 % del beneficio)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-01', evento: 'Fin de la recompra de 1.825 M y nuevo programa con cargo al 2S26', efecto: 'Reduce acciones ≈ 1-1,5 % por programa', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-1S', evento: 'Cierre de la oferta de canje por Santander Brasil', efecto: 'Hasta ≈ 151 M de acciones nuevas (1,05 %); BPA +0,6 %', probabilidad: 'Alta', sentido: '0' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y propuesta de remuneración', efecto: 'Avance hacia el RoTE > 20 % de 2028', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'América Latina: Brasil tras la reelección de Lula (Selic alta, real débil, coste del riesgo del 4,1 %) y Argentina (coste del riesgo del 11,1 %)', tipo: 'Macro', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−4 % del valor por cada 0,3 puntos de Ke; un punto más de coste del riesgo en Brasil ≈ −4 % del beneficio', mitigante: 'Diversificación: ningún país supera un tercio del beneficio [A1].' },
      { riesgo: 'Integración simultánea de TSB y Webster (sinergias, costes de reestructuración, fondo de comercio)', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % si el RoTE del Reino Unido y EE. UU. no sube', mitigante: 'Mercados donde ya opera; ≥ 400 M £ de sinergias de costes de TSB comprometidas [A4].' },
      { riesgo: 'Bajada de tipos en Europa o impuestos a la banca más altos en España', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % del beneficio', mitigante: 'Comisiones y volúmenes; el BCE subió en septiembre [B4].' },
      { riesgo: 'Financiación de automóviles en el Reino Unido (remediación de la FCA)', tipo: 'Legal', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−1 a −2 %', mitigante: '245 M brutos ya provisionados en el 1S26 [A3].' },
      { riesgo: 'Riesgo de IA (los bancos digitales y las tecnológicas automatizan crédito, pagos y atención)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±3 % a 3-5 años', mitigante: 'Plataforma común (Gravity) y 84 M de valor de negocio por IA en el 1S26 [A4].' },
    ],
    premortem: 'Octubre de 2027: Brasil entró en recesión con la Selic por encima del 14 %, el coste del riesgo de la filial pasó del 5 % y el real cayó otro 15 %; Argentina siguió con un coste del riesgo de dos dígitos; el BCE bajó tipos y la integración de Webster costó más de lo previsto. El RoTE se quedó en el 14 %, el mercado volvió a pagar 1,3 veces el valor tangible y la acción bajó a ≈ 8 €.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '±3 % a 3-5 años',
      comentario: 'La IA abarata la atención, el análisis de crédito y los procesos (ya 84 M de valor de negocio en el 1S26), y Santander la aplica a escala con una plataforma común; también baja la barrera de entrada de bancos digitales y tecnológicas en consumo y pagos. Efecto neto pequeño a 3-5 años.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Webster', pregunta: '¿Cuánto fondo de comercio e intangibles deja Webster y cuál es el TNAV por acción a 30-sep?', por_que: 'Es la base del modelo bancario (6,08 € estimado).' },
      { tema: 'Brasil', pregunta: '¿Qué sensibilidad del beneficio del grupo al real y a la Selic da la dirección tras el 26-oct?', por_que: 'Brasil es el 14 % del beneficio y sube la prima de riesgo.' },
      { tema: 'Plan de 2028', pregunta: '¿Cuánto del RoTE > 20 % viene de costes, de sinergias y de recompras?', por_que: 'Separa el base del alcista.' },
      { tema: 'Capital', pregunta: '¿Qué capital sobrante prevé repartir al final de 2028 con el CET1 en el 12,8-13 %?', por_que: 'Es parte de la rentabilidad del accionista.' },
      { tema: 'Argentina', pregunta: '¿Cuándo baja el coste del riesgo del 11 %?', por_que: 'Explica casi toda la subida de dotaciones.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** No comprar; para quien la tenga, «no mantener» según el filtro del método, con convicción baja porque **la regla a 12 meses no da una señal fiable** en este caso. La regla (v3, BPA ordinario) da un objetivo de 9,91 €, un −9,0 % ponderado y un +2,0 % en el base con el dividendo, frente a un precio de 11,154 € (cierre del 26-oct-2026): queda en Mantener por la mínima (el Vender empieza en 11,28 €) pero no pasa el filtro de mantener (ponderada ≥ 10 %, base ≥ 5 %). Su bajista usa un PER de 4,3 veces de la época de tipos negativos, que el sector ya no paga. Lo firme es la calidad: con la prima por riesgo país, el RoTE ordinario supera al Ke por 3,5 puntos, por debajo del suelo de 4,5. El valor intrínseco es de 10,05 €, un 9,9 % por debajo del precio. Convicción baja (la que sugieren los criterios del motor, porque la regla absoluta da Vender y la relativa Mantener): la subiría un 3T26 con el RoTE por encima del 16,6 % o una prima por América Latina menor; la bajaría un coste del riesgo de Brasil por encima del 4,5 %.

**El negocio.** Banco muy diversificado (España 32 % del beneficio ordinario, Brasil 14 %, EE. UU. 13 %, México 11 %, Reino Unido 9 %), en su mejor momento: beneficio ordinario récord de 7.328 M en el 1S26 (+15 %), RoTE del 15,6 %, eficiencia del 42,8 %, coste del riesgo del 1,15 % y CET1 del 14,0 % [A1]. La calidad, medida como RoTE − Ke, depende del riesgo país: con un Ke en euros del 12,06 % (Bund 3,43 % + 1,24 × 5,5 % + 1,81 de prima país ponderada) el exceso es de 3,1-3,5 puntos; sin la prima país (10,25 %) sería de 5,0-5,4 y pasaría. No es comprable en ningún nivel con el Ke completo. Sostenibilidad: «En parte».

**Valoración.** El modelo de exceso de rentabilidad sobre el valor tangible (6,08 € por acción pro forma con Webster) da 10,20 € en el base (7,64 bajista, 12,16 alcista) y el P/VTC justificado 1,55 veces (9,40 €), frente a 1,83 veces en bolsa. El DCF adaptado cuadra (10,25). El precio pide un Ke del 11,3 %: cobra la mitad de la prima por América Latina o da por hecho buena parte del plan de 2028 (RoTE > 20 %).

**El efecto Lula y Santander Brasil.** La reelección del 25-oct restó un 3,1 % a SAN el 26-oct: Brasil pesa el 14 % del beneficio, el real cayó ≈ 7-9 % frente al euro y la Selic se quedará alta más tiempo [D14]. Con la prima de Brasil subida como su bono, el Ke sube a 12,40 % y el valor base baja a 9,80 €. La oferta de canje por el ≈ 10 % de Santander Brasil emitirá hasta ≈ 151 M de acciones (1,05 %), suma ≈ 256 M € de beneficio al año (BPA +0,6 %) y es neutra en el CET1 según la matriz; sube la exposición a Brasil del 89,5 % al ≈ 100 %.

**Riesgos y catalizadores.** El mayor riesgo es América Latina (Brasil y Argentina) y la integración simultánea de TSB y Webster. Catalizadores: el 3T26 mañana (28-oct, primer trimestre con Webster), el marco fiscal de Brasil y las recompras (1.825 M en curso).

**Qué cambiaría la decisión.** La regla daría Vender por encima de 11,28 € (ponderada ≤ −10 %) y Comprar por debajo de 8,83 €, pero en ningún caso hay compra mientras RoTE − Ke no llegue a 4,5: haría falta un RoTE ordinario del 16,6 % sostenido con el Ke de hoy (el 3T26 puede acercarlo) o que la prima por América Latina baje. Con un RoTE del 20 % (plan de 2028) la calidad pasaría con holgura.`,
    tesis: 'Banco Santander gana hoy un RoTE ordinario del 15,6 % con un Ke en euros del 12,06 % si se cobra el riesgo de los países donde gana el dinero: crea valor, pero 3,5 puntos por encima de su coste, menos de lo que pide el método [A1, P1].\n\nEl precio (11,154 €, 1,83 veces el valor tangible pro forma) ya descuenta un Ke del 11,3 % o buena parte del plan de 2028 (RoTE > 20 %) [P1].\n\nNo hay margen de seguridad: el valor intrínseco (10,05 €) queda un 10 % por debajo del precio y la regla a 12 meses no da señal fiable por la historia de múltiplos de los años de tipos negativos.',
    vision_diferencial: {
      mercado_descuenta: 'Que el plan de 2028 se cumple en buena parte: 16 de 21 analistas en comprar, con un objetivo medio de 13,85 € (+24 %) [D2].',
      nuestra_vision: 'Con la prima por riesgo país ponderada, el banco vale ≈ 10 €: el precio paga ya parte del plan y no deja colchón para Brasil o Argentina.',
      por_que: 'El 40 % del beneficio viene de América Latina; con su prima (Brasil 3,2, México 2,5, Argentina 9,7) el Ke del grupo sube 1,8 puntos y el exceso de rentabilidad baja de 5,4 a 3,5.',
    },
    a_favor: [
      '**Beneficio ordinario récord** (7.328 M en el 1S26, +15 %) y RoTE del 15,6 % al alza.',
      '**Remuneración del 50 %** del beneficio y ≈ 6.900 M de recompras en 2026.',
      '**Diversificación**: ningún país pasa de un tercio del beneficio.',
      '**CET1 del 14,0 %** antes de Webster, holgado frente al 9,83 % exigido.',
    ],
    en_contra: [
      '**RoTE − Ke de 3,1-3,5 puntos** con la prima país: por debajo del suelo de 4,5.',
      '**Valor intrínseco de 10,05 €**, un 9,9 % por debajo del precio.',
      '**Brasil y Argentina**: coste del riesgo del 4,1 % y del 11,1 %; Lula reelegido.',
      '**Fondo de comercio al alza** (Webster a ≈ 1,95 veces su valor tangible): RoE del 13,6 %.',
      '**Regla a 12 meses en el límite del Vender** (11,28 €).',
    ],
    que_vigilar: 'El 3T26 (28-oct): RoTE ordinario (≥ 16,6 % sostenido haría pasar la calidad con el Ke de hoy), TNAV por acción tras Webster y coste del riesgo de Brasil y Argentina.',
    cambiaria_recomendacion: [
      'Precio por encima de 11,28 €: Vender según la regla (ponderada ≤ −10 %).',
      'RoTE ordinario sostenido ≥ 16,6 % (o prima por América Latina menor): la calidad pasaría; habría que rehacer la regla a 12 meses.',
      'Precio por debajo de 8,83 € con la calidad aprobada: Comprar.',
      'Coste del riesgo del grupo por encima del 1,3 % en el 3T26 o el 4T26: revisar el BPA a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'RoTE ordinario', nivel_actual: '15,6 % (1S26)', umbral_alerta: '< 15 % o > 16,6 %', por_que: 'Decide la calidad frente al Ke del 12,06 %.' },
      { kpi: 'Coste del riesgo (12 meses)', nivel_actual: '1,15 % (jun-2026)', umbral_alerta: '> 1,3 %', por_que: 'Separa el base del bajista.' },
      { kpi: 'CET1', nivel_actual: '14,0 % (jun-2026)', umbral_alerta: '< 12,5 % tras Webster', por_que: 'Sostiene las recompras.' },
      { kpi: 'TNAV por acción', nivel_actual: '6,32 € (jun-2026; ≈ 6,08 pro forma)', umbral_alerta: '< 6,0 €', por_que: 'Base del modelo bancario.' },
      { kpi: 'Bono de Brasil a 10 años (BRL)', nivel_actual: '15,44 % (26-oct-2026)', umbral_alerta: '> 16 %', por_que: 'Mide la prima de Brasil (14 % del beneficio).' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Valoración bancaria de Banco Santander: exceso de rentabilidad sobre el valor tangible, P/VTC justificado, Ke en euros con prima por país ponderada, oferta por Santander Brasil y sensibilidades (valoracion-banco.md, generado por notas/valoracion-banco.mjs)', editor: 'Elaboración propia', tipo: 'Primaria', fecha: '2026-10-27', url: null },
  ],
};
