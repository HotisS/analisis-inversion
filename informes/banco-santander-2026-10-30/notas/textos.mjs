// Textos del analista (Banco Santander, corte 2026-10-30; iteración 2, tras el 3T26 del 28-oct). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'ES UN BANCO y el motor no tiene modelo de bancos: EBITDA, ROIC, valor empresa, deuda neta, circulante, Altman Z y Piotroski no significan nada aquí. Adaptaciones, las mismas que en Itaú, BTG y Santander Brasil del 27-oct: (1) la calidad se mide con RoTE ordinario − Ke (y con RoE, que incluye el fondo de comercio) en lugar de ROIC − WACC, con la misma regla de nunca menos de 4,5 puntos; (2) el valor intrínseco sale de un modelo de exceso de rentabilidad sobre el valor contable tangible por acción (residual income) con P/VTC justificado de contraste (valoracion-banco.md [P1]), que entra al 100 % como «suma de partes» con valor directo; (3) el DCF del motor es un flujo para el accionista (beneficio − retención para crecer con el CET1, deuda 0) y solo es comprobación (peso 0). Bases contables: la serie histórica del informe es NIIF del ESEF 2021-2025 [A2] (2023 y 2024 reexpresados sin Polonia); el BPA, el RoTE, la regla a 12 meses y el modelo bancario usan la cuenta ordinaria («underlying») del Informe Financiero del 3T26 (28-oct-2026) [A1]. Millones de EUR. Línea de compra: SAN en Madrid, 10,512 € al cierre del 29-oct-2026, ya sin el dividendo a cuenta de 0,127 € (ex el 29-oct) [D1]; la sesión del 30-oct sigue abierta (≈ 10,2 €). ADS SAN en la NYSE (1 ADS = 1 acción). Último trimestre publicado: 3T26 (el primero con Webster). El VTC de partida es el publicado a 30-sep-2026 (5,92 €), ya con Webster: la iteración anterior lo estimaba en 6,08 € [P1].',
  controles_explicados: [
    { control: 'BAI − impuestos − minoritarios = beneficio neto', explicacion: 'En 2023-2025 la diferencia es el resultado de actividades interrumpidas (Polonia, vendida a Erste en enero de 2026): 1.542 M en 2025 [A2]. El ESEF de 2025 reexpresa 2023 y 2024 con Polonia fuera del BAI.' },
    { control: 'BPA = beneficio neto / acciones', explicacion: 'El BPA publicado descuenta los cupones de los AT1 (≈ 600-750 M al año) y usa acciones medias, no las de cierre: 0,77 € publicado en 2024 frente a 0,83 con las acciones de cierre [A2].' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    rentabilidad: {
      comentario: 'En un banco el ROIC del motor (patrimonio NIIF con deuda y caja 0) no es la cifra de calidad; la del informe es el RoTE ORDINARIO − Ke. RoTE ordinario del 15,2 % en 2025 (reexpresado sin Polonia) y del 16,0 % en 9M26 (16,8 % en el 3T26) [A1], frente a un Ke en euros del 11,83 % (Bund 3,42 % [D3] + beta 1,20 × 5,5 % + prima país ponderada por el beneficio de 9M26 de 1,81 [D5]): exceso de 3,37 puntos (2025) y 4,17 (9M26), frente a 3,54 en el 1S26 del informe anterior. Mejora, pero NO PASA el suelo del método (4,5) y no es comprable en ningún nivel (A, B1, B2 o C) [P1]. El 3T26 aislado daría 4,97: un trimestre no basta, y si el 4T26 lo repite el año cerraría en ≈ 16,2 % (≈ 4,4 puntos). Pasaría con un RoTE ordinario anual de ≈ 16,3 %. Sin la prima país pasaría (5,98, con un Ke del 10,02 %): la conclusión depende de cobrar o no el riesgo de América Latina, y la cobramos porque es ≈ 34 % del beneficio. Con la beta anterior (1,24) el exceso sería 3,95. Con el RoE ordinario (13,7 % en 9M26, con el fondo de comercio de TSB, Webster y compras anteriores) el exceso es de solo 1,87. Indicadores bancarios del 3T26 [A1, A3]: CET1 del 12,7 % tras −147 p.b. de Webster (requisito estimado del 9,9 %; distancia al MDA de 254 p.b.; 12,8-13 % esperado a fin de año), morosidad del 2,90 % con cobertura del 64 %, coste del riesgo del 1,16 % (Brasil 4,25 %, Argentina 10,80 %, México 2,73 %, España 0,43 %), eficiencia del 42,6 %, margen de intereses de 11.903 M en el trimestre (+1,8 %). Sensibilidad a tipos: ≈ 95 % de los ingresos viene de clientes; el BCE volvió a subir en septiembre [B4]; en Brasil, −100 p.b. de Selic suben el margen ≈ 70 M € [D11].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Reparte ≈ 50 % del beneficio ordinario, mitad en efectivo y mitad en recompras, en 2026; desde 2027, ≈ 35 % en efectivo y ≈ 15 % en recompras, y el capital sobrante al final de 2028 [A10]. Dividendo de 0,24 € con cargo a 2025 (+14 %) y a cuenta de 2026 de 0,127 € (pago el 2-nov; último día con derecho el 28-oct) [A4, A10]. Recompras: 5.030 M terminadas en agosto (462,7 M de acciones, 3,08 % del capital, ya amortizadas) y 1.825 M con cargo al 1S26 terminadas el 28-oct (150,6 M de acciones, ≈ 1,03 %, a amortizar) [A6, A8, A9]. Remuneración con cargo al 1S26 de ≈ 3.660 M (+8 %); ≈ 9.000 M de recompras hechas del objetivo de al menos 10.000 M con cargo a 2025-2026 y al capital sobrante [A4].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Webster Financial (EE. UU.)', importe: 10724, ev_ebitda: null, financiacion: '48,75 USD en efectivo + 2,0548 ADS por acción (329,8 M de acciones nuevas)', resultado: 'Cerrada el 20-ago-2026: 12.509 M USD (10.724 M €; 65 % en efectivo); −147 p.b. de CET1; TNAV por acción de 6,32 a 5,92 € [A1, A5, D10].' },
        { anio: '2026', objetivo: 'TSB (Reino Unido)', importe: null, ev_ebitda: null, financiacion: 'Efectivo', resultado: 'Cerrada el 30-abr-2026; −55 p.b. de CET1; ≥ 400 M £ de sinergias [A1, A4].' },
        { anio: '2026', objetivo: '≈ 10 % de Santander Brasil (oferta de canje)', importe: 1908, ev_ebitda: null, financiacion: 'Acciones nuevas de SAN (hasta el 1,1 % del capital)', resultado: 'Registrada el 21-sep-2026; cierre esperado en el 1S27 [D6, D7].' },
      ],
      comentario: 'Asignación activa en 2026: vende Polonia con plusvalía y la mitad del capital liberado a recompras, y compra escala en el Reino Unido y EE. UU., mercados donde su RoTE es bajo (12,8 % y 12,6 % en 9M26; el banco apunta a ≈ 18 % en EE. UU. en 2028 con Webster) [A3]. Las recompras a 1,8-1,9 veces el valor tangible crean valor si el RoTE se mantiene por encima del Ke; Webster se pagó a ≈ 1,95 veces su valor tangible con un ROATCE del 16,7 % [A11, D10]: con un Ke de EE. UU. de ≈ 10,5 %, crea valor si llegan las sinergias. Las acciones en circulación han bajado un 17 % desde 2021 pese a Webster [A6, A7].',
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Los «ingresos» crecen como el patrimonio tangible y el balance: 7 % en 2026e-2027e (TSB y Webster entran en el perímetro; crédito +9 % en euros constantes, +5 % sin TSB [A4]), 6-6,5 % en 2028e-2029e y bajan al 3 % en 2035e, el terminal nominal en euros. Es la misma senda del modelo de exceso de rentabilidad [P1].',
    margenes: '«Margen EBITDA» = beneficio antes de impuestos sobre ingresos, calibrado para que el beneficio después de impuestos sea el RoTE del caso base por el patrimonio tangible: RoTE del 16,5 % en el primer año (16,0 % en 9M26 y 16,8 % en el 3T26) que sube al 17,5-18 % con las sinergias de TSB y Webster y la eficiencia (42,6 % → ≈ 36 % de objetivo [A3]), sin llegar al > 20 % del plan de 2028, y vuelve al 16,5 % a largo plazo.',
    inversion: '«Capex» = retención: lo que el banco guarda para que el capital crezca con los activos ponderados por riesgo y el CET1 se quede en el 12,8-13 %: g × 1,98 ÷ (1 + g) de los ingresos. Amortización y circulante 0. El flujo que queda es lo que puede repartir (dividendo + recompras).',
    wacc: 'WACC = Ke en euros: Bund a 10 años del 3,42 % (Bundesbank, 29-oct-2026 [D3]) + beta 1,20 (medida: mensual a 5 años frente al STOXX 600 [D1]; 1,24 el 27-oct) × 5,5 % + prima por riesgo país de 1,81 puntos, ponderada por el peso de cada país en el beneficio ordinario de 9M26 con las primas por país de Damodaran (España 1,55, Reino Unido 0,78, EE. UU. 0,23, México 2,46, Brasil 3,24, Chile 1,10, Argentina 9,71 [D5]) = 11,83 % (12,06 % el 27-oct). Peso de la deuda 0. Sensibilidad: sin prima país, 10,02 %; con la prima de mercado de Damodaran (4,2 % [D4]), 10,27 %; con beta 1,0, 10,73 %; con la prima de Brasil subida como su bono el 26-oct, 12,16 % [P1].',
    terminal: 'Gordon al 3,0 % nominal en euros: inflación objetivo del BCE (2 %) + 1 real. Pesa el 50 % del valor en el DCF adaptado; el RoTE terminal (16,5 %) sigue por encima del Ke, así que el terminal suma valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +6 % (crédito +9 % en euros constantes con TSB; +5 % sin TSB [A4]); precio +1 % (margen de intereses +7 % con volúmenes y gestión del balance).',
    '2027e': 'Volumen +6 %: Webster (≈ 50.000 M € de crédito y ≈ 62.000 M € de depósitos [A1]) un año entero; precio +1 %.',
    '2028e': 'Volumen +5,5 %: crecimiento orgánico de un dígito medio, como pide el plan [A3].',
    '2029e': 'Volumen +5 %.',
    '2030e': 'Volumen +4,5 %: converge al crecimiento nominal de sus economías en euros.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El crecimiento del 5-7 % es financiable: con un RoTE del 16-18 % el banco retiene la mitad y reparte la otra mitad, como hace hoy [A10]. El motor da «En parte» porque mide con el ROIC NIIF de su cuenta adaptada frente al WACC. La conclusión que importa: con el Ke de hoy (11,83 %), crecer crea poco valor (RoTE − Ke ≈ 4,2 puntos en 9M26), menos del que pide el método para comprar.',
  dcf_lectura: 'El DCF adaptado (flujo para el accionista) da 10,58 € por acción en el base, un 0,6 % por encima del precio, algo por encima del modelo de exceso de rentabilidad (9,97; ponderado 9,82). El DCF inverso dice que el precio descuenta una rentabilidad anual del 11,9 %, casi igual al Ke (11,83 %), o un crecimiento del 5,1 % anual frente al 5,2 % del base. El modelo bancario pide un Ke del 11,4 % para igualar el precio: el mercado cobra ya casi toda la prima por América Latina; tras la caída de octubre (−20 % desde agosto) el precio está cerca del valor [P1]. EV/EBITDA, deuda neta/EBITDA, ROIC, Altman Z y Piotroski no significan nada en un banco y no se usan.',
  narrativas: {
    Bajista: 'El coste del riesgo sube en Brasil y México tras el 26-oct y en el consumo en EE. UU., Argentina no baja del 10 %, el BCE y el Banco de Inglaterra bajan tipos y la integración de TSB y Webster se retrasa: RoTE del 13-15 % y balance 1,5 puntos más lento.',
    Base: 'RoTE ordinario del 16,5 % en el primer año (16,8 % en el 3T26) que sube al 17,5-18 % con las sinergias y la eficiencia, sin llegar al > 20 % del plan; capital tangible por acción +6-7 % que baja al 3 %; CET1 en el 12,8-13 % y reparto del 50 %.',
    Alcista: 'Se cumple el plan de 2028 (RoTE > 20 %, beneficio > 20.000 M, eficiencia ≈ 36 %) y el RoTE se queda en el 18-20 %.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF adaptado (bajista 6,59, base 10,58 y alcista 13,63 €) cuadran con los del modelo de exceso de rentabilidad (7,46, 9,97 y 11,89) [P1]. Solo el alcista (el plan de 2028 cumplido) supera con claridad el precio. La clave es el Ke: sin la prima país, el base vale 12,79 € y el ponderado 12,60, por encima del precio.',
  suma_partes_comentario: 'No es una suma de partes: es el vehículo para que el valor del modelo de exceso de rentabilidad sea el valor intrínseco del motor. Una sola «parte», el banco entero, con valor directo = 9,82 € ponderados × 14.406 M de acciones = 141.467 M (patrimonio, no valor empresa; el puente es 0). Detalle y tablas en valoracion-banco.md [P1].',
  casos_12m: {
    Bajista: 'Coste del riesgo arriba y tipos abajo: BPA ordinario de 1,05 € en 2028e × 4,3 veces (el mínimo adelantado de 5 años, el de 2022, con tipos del BCE a cero) = 4,51 €. Es un múltiplo de otro régimen y lleva el bajista al −60 %.',
    Base: 'Beneficio ordinario de ≈ 15.100 M en 2026e (9M26 real 11.176 M), ≈ 17.000 M en 2027e y ≈ 18.600 M en 2028e con recompras: BPA de 1,28 € × 8,2 veces (el PER actual de 9,0 a mitad de camino hacia la mediana adelantada de 5,3, con el tope ÷ 1,1) = 10,50 €.',
    Alcista: 'Se cumple el plan (≈ 20.500 M de beneficio en 2028): BPA de 1,43 € × 9,1 veces (la mediana de los comparables europeos) = 13,01 €.',
  },
  diferencia_consenso: 'Nuestro BPA ordinario de 2026e (1,01 €) queda un 3 % por debajo del consenso (1,04) y el de 2027e un 6 % (1,17 frente a 1,25); el consenso apenas se ha movido en 90 días ni tras el 3T26 [D2]. El objetivo medio de los analistas (13,77 €, de 11,30 a 15,30, 16 de 21 en comprar) queda un 31 % por encima de nuestro base a 12 meses (10,50): los analistas aplican el PER de los comparables (≈ 9-10 veces) a un BPA mayor; la regla del método tira del PER hacia su historia de 4-5 veces.',
  objetivo_comentario: 'La regla a 12 meses (v3) da 9,63 € ponderado, un −6,1 % con el dividendo (+2,2 % en el base): ni Comprar (≥ 15 %) ni el filtro de mantener (ponderada ≥ 10 % y base ≥ 5 %; para quien la tiene, se cumple solo por debajo de 8,97 €); la banda Vender de la regla (ponderada ≤ −10 %) empieza por encima de 10,97 €. El valor intrínseco (9,82 €) está un 6,6 % por debajo del precio. **La cifra no es fiable para dar una señal**: la historia de PER adelantado (4,3-5,4 veces en 2020-2024) es la de la banca europea con tipos negativos o cero; el sector se ha revalorizado al doble (mediana de los comparables 9,0 veces) y la regla, sin selector para este caso, lleva el bajista a 4,3 veces (−60 %). Con el bajista en base × 0,80 (sin doble castigo), la ponderada sería −0,4 %: tampoco llegaría al filtro de mantener ni a Comprar. La conclusión que sí es firme no viene de la regla sino de la calidad: con la prima país, el RoTE − Ke (4,2 en 9M26) no llega a 4,5 [P1].',
  valoracion_comentario: 'Pesos: modelo de exceso de rentabilidad 100 % (vía suma de partes); DCF adaptado, comparables y transacciones 0. El DCF adaptado solo comprueba el modelo (10,58 frente a 9,97 €). Los comparables por P/VC (bancos europeos de 0,8 a 2,2 veces según ROE; Santander a 1,45 el contable y 1,78 el tangible de septiembre) y por PER (9,1 veces de mediana [D2]) entran en la regla a 12 meses, no en el valor intrínseco. El valor intrínseco depende de la prima país: con ella, 9,82 € ponderados; sin ella, 12,60; con la prima de Brasil subida tras el 26-oct, 9,58 (base). El precio pide un Ke del 11,4 % [P1].',
  catalizadores: {
    items: [
      { fecha: '2026-11/12', evento: 'Marco fiscal del nuevo Gobierno de Brasil y Copom de diciembre', efecto: 'Mueve el real y la Selic (13 % del beneficio)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 (4T26) y propuesta de remuneración con cargo al 2S26 (nueva recompra)', efecto: 'RoTE ordinario del año frente al ≈ 16,3 % que haría pasar la calidad; primer trimestre entero con Webster', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-1S', evento: 'Junta para la ampliación y cierre de la oferta de canje por Santander Brasil', efecto: 'Hasta ≈ 151 M de acciones nuevas (1,05 %); BPA +0,6 %', probabilidad: 'Alta', sentido: '0' },
      { fecha: '2027-01', evento: 'Nuevos requisitos SREP: P2R del 1,65 % (1,74 % en 2026)', efecto: 'Algo más de colchón sobre el MDA (254 p.b. hoy)', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2028', evento: 'Plan de 2028 (RoTE > 20 %, beneficio > 20.000 M)', efecto: 'Si se cumple, la calidad pasa con holgura', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'América Latina: Brasil tras la reelección de Lula (Selic alta, real débil, coste del riesgo del 4,25 %; Santander Brasil por debajo del consenso en el 3T26) y Argentina (coste del riesgo del 10,8 %)', tipo: 'Macro', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−4 % del valor por cada 0,3 puntos de Ke; un punto más de coste del riesgo en Brasil ≈ −4 % del beneficio', mitigante: 'Diversificación: ningún país supera un tercio del beneficio [A1].' },
      { riesgo: 'Integración simultánea de TSB y Webster (sinergias, costes de integración: −666 M en 9M26, fondo de comercio)', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % si el RoTE del Reino Unido y EE. UU. no sube', mitigante: 'Mercados donde ya opera; ≥ 400 M £ de sinergias de costes de TSB comprometidas; objetivo de RoTE ≈ 18 % en EE. UU. en 2028 [A3, A4].' },
      { riesgo: 'Capital: CET1 del 12,7 % tras Webster, por debajo del objetivo de fin de año (12,8-13 %)', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Menos recompras si no llega', mitigante: '+19 p.b. de generación orgánica neta por trimestre; distancia al MDA de 254 p.b. [A1].' },
      { riesgo: 'Bajada de tipos en Europa o impuestos a la banca más altos en España', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % del beneficio', mitigante: 'Comisiones (+9 %) y volúmenes; el BCE subió en septiembre [B4].' },
      { riesgo: 'Financiación de automóviles en el Reino Unido (remediación de la FCA)', tipo: 'Legal', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−1 a −2 %', mitigante: '245 M brutos ya provisionados en 9M26 [A3].' },
      { riesgo: 'Riesgo de IA (los bancos digitales y las tecnológicas automatizan crédito, pagos y atención)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±3 % a 3-5 años', mitigante: 'Plataforma común (Gravity) y 194 M de valor de negocio por IA en 9M26 [A4].' },
    ],
    premortem: 'Octubre de 2027: Brasil entró en recesión con la Selic por encima del 14 %, el coste del riesgo de la filial pasó del 5 % y el real cayó otro 15 %; Argentina siguió con un coste del riesgo de dos dígitos; el BCE bajó tipos y la integración de Webster costó más de lo previsto. El RoTE se quedó en el 14 %, el mercado volvió a pagar 1,3 veces el valor tangible y la acción bajó a ≈ 8 €.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '±3 % a 3-5 años',
      comentario: 'La IA abarata la atención, el análisis de crédito y los procesos (194 M de valor de negocio en 9M26 según el banco), y Santander la aplica a escala con una plataforma común; también baja la barrera de entrada de bancos digitales y tecnológicas en consumo y pagos. Efecto neto pequeño a 3-5 años.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Webster', pregunta: '¿Cuánto fondo de comercio e intangibles dejó Webster en el balance (asignación del precio de compra)?', por_que: 'Explica la bajada del TNAV de 6,32 a 5,92 € y el RoE.' },
      { tema: 'Brasil', pregunta: '¿Qué sensibilidad del beneficio del grupo al real y a la Selic da la dirección tras el 26-oct?', por_que: 'Brasil es el 13 % del beneficio y sube la prima de riesgo.' },
      { tema: 'Plan de 2028', pregunta: '¿Cuánto del RoTE > 20 % viene de costes, de sinergias y de recompras?', por_que: 'Separa el base del alcista.' },
      { tema: 'Capital', pregunta: '¿Qué capital sobrante prevé repartir al final de 2028 con el CET1 en el 12,8-13 %?', por_que: 'Es parte de la rentabilidad del accionista.' },
      { tema: 'Argentina', pregunta: '¿Cuándo baja el coste del riesgo del 10,8 %?', por_que: 'Explica casi toda la subida de dotaciones.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** No comprar; para quien la tenga, «no mantener» según el filtro del método (solo se cumpliría por debajo de 8,97 €), con convicción baja porque **la regla a 12 meses no da una señal fiable** en este caso. Es la misma conclusión que el 27-oct, antes del 3T26. La regla (v3, BPA ordinario) da un objetivo de 9,63 €, un −6,1 % ponderado y un +2,2 % en el base con el dividendo, frente a un precio de 10,512 € (cierre del 29-oct-2026, ya sin el dividendo a cuenta): queda en Mantener (la banda Vender empieza en 10,97 €) pero no pasa el filtro de mantener (ponderada ≥ 10 %, base ≥ 5 %). Su bajista usa un PER de 4,3 veces de la época de tipos negativos, que el sector ya no paga. Lo firme es la calidad: con la prima por riesgo país, el RoTE ordinario de 9M26 supera al Ke por 4,2 puntos (3,5 en el 1S26), aún por debajo del suelo de 4,5. El valor intrínseco es de 9,82 €, un 6,6 % por debajo del precio. Convicción baja, por debajo de la «Media» que sugieren los criterios del motor (las dos reglas dicen Mantener y lejos de los umbrales): la regla a 12 meses tira de una historia de PER de los años de tipos negativos (la v3 y la v2 se separan 18 puntos) y la calidad queda a solo 0,3 puntos del suelo, así que la señal puede cambiar con un trimestre. La subiría un RoTE ordinario de 2026 por encima del 16,3 % (la calidad pasaría y habría que rehacer la regla); la bajaría un coste del riesgo de Brasil por encima del 4,5 % o un CET1 por debajo del 12,5 %.

**Qué ha cambiado con el 3T26.** Buen trimestre: beneficio ordinario récord de 3.848 M (+19 %), RoTE ordinario del 16,8 % en el trimestre y del 16,0 % en 9M26, BPA ordinario de 0,26 € (≈ 2 céntimos sobre el consenso) y todos los objetivos de 2026 reiterados [A1, A4]. Pero el CET1 quedó en el 12,7 % tras Webster (−147 p.b.), por debajo del objetivo de fin de año, y el TNAV por acción en 5,92 € (6,08 estimado el 27-oct), y el coste del riesgo de Argentina siguió en el 10,8 %. La acción cayó un 5,6 % el día de los resultados por esa calidad (ingresos ≈ 370 M y margen de intereses por debajo de lo esperado, Brasil −15 % en euros, provisiones +22 % y el CET1), no por el sector, que solo cedía un 0,6 % [D17, D18, D19]; el 29-oct descontó el dividendo y el 30-oct sigue bajando (≈ 10,2 € a mediodía, con la rebaja de Erste [D20]). La calidad mejora 0,6 puntos (más RoTE y Ke algo menor: Bund 3,42 %, beta 1,20), pero no llega: haría falta un RoTE ordinario anual de ≈ 16,3 %.

**El negocio.** Banco muy diversificado (España 31 % del beneficio ordinario de 9M26, Brasil 13 %, EE. UU. 13 %, México 12 %, Reino Unido 11 %), en su mejor momento: beneficio ordinario de 11.176 M en 9M26 (+16 %), eficiencia del 42,6 %, coste del riesgo del 1,16 % y morosidad del 2,90 % [A1]. La calidad, medida como RoTE − Ke, depende del riesgo país: con un Ke en euros del 11,83 % (Bund 3,42 % + 1,20 × 5,5 % + 1,81 de prima país ponderada) el exceso es de 3,4-4,2 puntos; sin la prima país (10,02 %) sería de 5,2-6,0 y pasaría. No es comprable en ningún nivel con el Ke completo. Sostenibilidad: «En parte».

**Valoración.** El modelo de exceso de rentabilidad sobre el valor tangible (5,92 € por acción en septiembre) da 9,97 € en el base (7,46 bajista, 11,89 alcista; 9,82 ponderado) y el P/VTC justificado 1,59 veces (9,39 €), frente a 1,78 veces en bolsa. El DCF adaptado cuadra (10,58). El precio pide un Ke del 11,4 %, casi el nuestro: tras la caída del 20 % desde agosto ya no descuenta mucho más que el valor.

**Brasil y Santander Brasil.** Brasil pesa el 13 % del beneficio; con la prima de Brasil subida como su bono tras la reelección de Lula, el Ke sube al 12,16 % y el valor base baja a 9,58 €. La oferta de canje por el ≈ 10 % de Santander Brasil emitirá hasta ≈ 151 M de acciones (1,05 %), suma ≈ 250 M € de beneficio al año (BPA +0,6 %) y es neutra en el CET1 según la matriz; Santander Brasil quedó por debajo del consenso en el 3T26.

**Riesgos y catalizadores.** El mayor riesgo es América Latina (Brasil y Argentina) y la integración simultánea de TSB y Webster. Catalizadores: el marco fiscal de Brasil, los resultados de 2026 (febrero; el RoTE del año decide si pasa la calidad) y la nueva recompra con cargo al 2S26. Directivos: las sociedades de Ana Botín compraron 300.000 acciones el 29-oct (3,1 M €, tras otras 300.000 en marzo), mientras otros altos directivos vendieron ≈ 17,8 M € en 12 meses (la mayor, 7,7 M € el 16-sep) [C9].

**Qué cambiaría la decisión.** Para quien la tiene, el precio de venta según el filtro de mantener es cualquier precio por encima de 8,97 € (la banda Vender de la regla, ponderada ≤ −10 %, empieza en 10,97 €). Comprar solo por debajo de 8,58 € y siempre que RoTE − Ke llegue a 4,5: un RoTE ordinario anual de ≈ 16,3 % con el Ke de hoy (el 3T26 dio 16,8 %; 2026 entero cerraría en ≈ 16,2 % si el 4T lo repite) o una prima por América Latina menor. Con un RoTE del 20 % (plan de 2028) la calidad pasaría con holgura.`,
    tesis: 'Banco Santander gana hoy un RoTE ordinario del 16,0 % (16,8 % en el 3T26) con un Ke en euros del 11,83 % si se cobra el riesgo de los países donde gana el dinero: crea valor, pero 4,2 puntos por encima de su coste, todavía menos de lo que pide el método [A1, P1].\n\nEl precio (10,512 €, 1,78 veces el valor tangible de septiembre) descuenta un Ke del 11,4 %: tras la caída de octubre está cerca de su valor (9,82 €), pero sin margen de seguridad [P1].\n\nLa regla a 12 meses no da señal fiable por la historia de múltiplos de los años de tipos negativos; la calidad, que sí es firme, queda a 0,3 puntos del suelo.',
    vision_diferencial: {
      mercado_descuenta: 'Que el plan de 2028 se cumple en buena parte: 16 de 21 analistas en comprar, con un objetivo medio de 13,77 € (+31 %) [D2].',
      nuestra_vision: 'Con la prima por riesgo país ponderada, el banco vale ≈ 9,8-10 €: el precio no deja colchón para Brasil o Argentina, aunque la caída de octubre ha cerrado buena parte de la distancia.',
      por_que: 'Un tercio del beneficio viene de América Latina; con su prima (Brasil 3,2, México 2,5, Argentina 9,7) el Ke del grupo sube 1,8 puntos y el exceso de rentabilidad baja de 6,0 a 4,2.',
    },
    a_favor: [
      '**Beneficio ordinario récord** (3.848 M en el 3T26, +19 %; 11.176 M en 9M26) y RoTE del 16,8 % en el trimestre.',
      '**Remuneración del 50 %** del beneficio: ≈ 3.660 M con cargo al 1S26 (+8 %) y ≈ 9.000 M de recompras hechas.',
      '**Diversificación**: ningún país pasa de un tercio del beneficio.',
      '**Precio más bajo**: −20 % desde agosto; 1,78 veces el valor tangible frente a 2,08 a fin de septiembre.',
    ],
    en_contra: [
      '**RoTE − Ke de 4,2 puntos** (9M26) con la prima país: aún por debajo del suelo de 4,5.',
      '**Valor intrínseco de 9,82 €**, un 6,6 % por debajo del precio.',
      '**Brasil y Argentina**: coste del riesgo del 4,25 % y del 10,8 %; Lula reelegido.',
      '**CET1 del 12,7 %** tras Webster y TNAV por acción de 5,92 € (fondo de comercio al alza; RoE del 13,7 %).',
      '**No pasa el filtro de mantener** a este precio (solo por debajo de 8,97 €).',
    ],
    que_vigilar: 'Los resultados de 2026 (febrero de 2027): RoTE ordinario del año (≥ 16,3 % haría pasar la calidad con el Ke de hoy), CET1 frente al 12,8-13 % y coste del riesgo de Brasil y Argentina.',
    cambiaria_recomendacion: [
      'Para quien la tiene: no pasa el filtro de mantener por encima de 8,97 € (precio de venta del método); la banda Vender de la regla (ponderada ≤ −10 %) empieza en 10,97 €.',
      'RoTE ordinario anual sostenido ≥ 16,3 % (o prima por América Latina menor): la calidad pasaría; habría que rehacer la regla a 12 meses.',
      'Precio por debajo de 8,58 € con la calidad aprobada: Comprar.',
      'Coste del riesgo del grupo por encima del 1,3 % en el 4T26: revisar el BPA a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'RoTE ordinario', nivel_actual: '16,0 % (9M26); 16,8 % (3T26)', umbral_alerta: '< 15 % o > 16,3 % en el año', por_que: 'Decide la calidad frente al Ke del 11,83 %.' },
      { kpi: 'Coste del riesgo (12 meses)', nivel_actual: '1,16 % (sep-2026)', umbral_alerta: '> 1,3 %', por_que: 'Separa el base del bajista.' },
      { kpi: 'CET1', nivel_actual: '12,7 % (sep-2026)', umbral_alerta: '< 12,5 %', por_que: 'Sostiene las recompras.' },
      { kpi: 'TNAV por acción', nivel_actual: '5,92 € (sep-2026)', umbral_alerta: '< 5,8 €', por_que: 'Base del modelo bancario.' },
      { kpi: 'Bono de Brasil a 10 años (BRL)', nivel_actual: '15,44 % (26-oct-2026)', umbral_alerta: '> 16 %', por_que: 'Mide la prima de Brasil (13 % del beneficio).' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Valoración bancaria de Banco Santander tras el 3T26: exceso de rentabilidad sobre el valor tangible, P/VTC justificado, Ke en euros con prima por país ponderada, oferta por Santander Brasil y sensibilidades (valoracion-banco.md, generado por notas/valoracion-banco.mjs)', editor: 'Elaboración propia', tipo: 'Primaria', fecha: '2026-10-30', url: null },
  ],
};
