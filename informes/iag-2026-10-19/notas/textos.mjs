// Textos del analista para IAG (corte 2026-10-19). Se escriben DESPUÉS de calcular (motor/calcular-empresa.mjs).
// Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de propio.
export default {
  limitaciones: 'Cifras en millones de EUR, ejercicio a 31 de diciembre. Cuentas 2021-2025 del ESEF (informe anual 2025) y semestre a 30-jun-2026 del informe semestral; el tercer trimestre de 2026 sale el 6-nov-2026, después del corte. La acción cotiza en peniques en Londres: precio de 412,2 peniques (cierre del 19-oct-2026) a 0,01186 EUR por penique (GBPEUR 1,186, 16:40 UTC). 2021 y 2022 no son comparables (COVID). El BPA de los casos es antes de extraordinarios (base del BPA ajustado de la empresa y de la historia del PER); el de la cuenta es el publicado.',
  controles_explicados: [
    { control: 'BPA = beneficio neto / acciones (2022)', explicacion: 'El BPA diluido publicado de 2022 (6,1 céntimos; 0,06 en el ESEF) resta del numerador las ganancias de valor razonable del bono convertible y suma sus acciones; el motor divide el beneficio (431 M) entre 5.344 M de acciones diluidas sin ajustar el numerador (0,08). El BPA básico fue de 8,7 céntimos [A5]. No afecta a la valoración: la historia del PER usa el BPA ajustado de la empresa (5,6 céntimos en 2022) [A5].' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'IAG nace en enero de 2011 de la fusión de British Airways (privatizada en 1987) e Iberia (privatizada en 2001), con sede social en Madrid y cotización en Londres y Madrid. Compró bmi (2012) para crecer en Heathrow, Vueling (2013) y Aer Lingus (2015), y creó LEVEL (2017) e IAG Loyalty (Avios). Qatar Airways entró en 2015 y tiene ≈ 25 %. La COVID la obligó a una ampliación de capital de 2.740 M en 2020 y a pérdidas de 6.935 M y 2.933 M en 2020-2021. Desde 2023 recupera márgenes récord, y en 2024 abandonó la compra de Air Europa por las exigencias de Bruselas. Desde 2025 devuelve la caja sobrante con dividendos y recompras [A1, A5].',
      hitos: [
        { anio: '2011', hito: 'Fusión de British Airways e Iberia: nace IAG.' },
        { anio: '2012-2013', hito: 'Compra de bmi (slots de Heathrow) y de Vueling.' },
        { anio: '2015', hito: 'Compra de Aer Lingus (1.360 M); entra Qatar Airways.' },
        { anio: '2020', hito: 'COVID: ampliación de 2.740 M; Luis Gallego consejero delegado.' },
        { anio: '2024', hito: 'Abandona la compra de Air Europa; margen operativo del 13,8 %.' },
        { anio: '2025', hito: 'Récord: EBIT de 5.024 M (15,1 %) y 1.700 M devueltos a los accionistas [A2].' },
        { anio: '2026', hito: 'Guerra de Irán: combustible de 8.300-8.600 M; capacidad plana por los motores; tres recompras de 500 M [A3, A7].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC del motor (NOPAT sobre patrimonio más deuda neta con arrendamientos) es del 27,4 % en 2025, 26,0 % en 2024 y 24,4 % en 2023, frente a un WACC del 8,3 %: ≈ 19 puntos de diferencia. La empresa da un ROIC más prudente, del 18,5 % en 2025 (17,3 % en 2024), con los aviones arrendados capitalizados, y se fija un objetivo del 13-16 % [A2]. Son rentabilidades de pico de ciclo: en 2020-2021 el ROIC fue muy negativo (−17,8 % en 2021) y en 2022 del 10 %. A lo largo de un ciclo completo con una crisis, el ROIC medio de IAG queda más cerca del 10-13 %, aún por encima del WACC, pero con poco margen. El ROE (48,6 % en 2025) está inflado por un patrimonio todavía pequeño tras las pérdidas de la COVID [A1].',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para IAG es el clima (≈ 30 millones de toneladas de CO2 al año; objetivo de cero emisiones netas en 2050, 10 % de combustible sostenible en 2030; derechos de emisión europeos y británicos cada vez más caros), la seguridad aérea, las relaciones laborales (sindicatos de pilotos y tripulantes en el Reino Unido, España e Irlanda; reestructuraciones de Iberia y BA en 2026) y la protección del consumidor (reembolsos, equipaje de mano) [A1, A3].',
      controversias: 'Multa del Ministerio de Consumo de España por cobrar el equipaje de mano (Vueling, recurrida y no provisionada); sanciones y reclamaciones por retrasos y cancelaciones; ciberataque de British Airways de 2018 (multa del ICO). Sin controversias graves abiertas de corrupción o seguridad [A1, A3].',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e +2,4 % (fijo): capacidad plana y precio +2-3 %, entre el +1,0 % del 1S26 y el +3 % del consenso [A3, D2]. 2027e +4,5 %: vuelven aviones con los motores revisados y entregas (capacidad +3 %), más precio. Después, 3-3,5 % al año (objetivo de capacidad del 2-4 % [A2]) y 2-2,5 % al final. Crecimiento medio del 3,2 %, por debajo del 6,2 % de 2023-2025.',
    margenes: 'Margen EBITDA (con extraordinarios) del 20,6 % en 2026e (23,0 % en 2025): queroseno de guerra y capacidad plana. 21,4 % en 2027-2028e con la curva del Brent a la baja (87 USD en dic-27, 78 en dic-28 [P3]) y coberturas. Después baja al 19 % en 2033e: el margen de un ciclo medio (EBIT ≈ 9,5 %), por debajo del objetivo del 12-15 % y de 2024-2025 (13,8-15,1 %), porque nuestro horizonte incluye una recesión o una crisis.',
    inversion: 'Capex con las altas de derechos de uso (≈ 500 M al año de aviones arrendados): 11,5 % de las ventas en 2026e (3.400 + 500), 15 % en 2027-2031e (4.900-5.600 M de capex guiado por el pedido de 71 aviones de largo radio [A2]) y 10,5 % al final. Amortización del 8,1 % al 9,5 %. Circulante del −11 % de las ventas (clientes y existencias menos proveedores); los ingresos diferidos de billetes no se suman, por prudencia.',
    wacc: 'Tasa libre del 3,49 % (Bund a 10 años del 19-oct-2026 [D4]); beta de 1,45 (semanal ajustada de 5 años 1,39, semanal 1,58; mensual 2,18 [D1]); prima del 5,5 %; coste de la deuda del 4,5 % antes de impuestos (bonos de 2031 al 3,875 % y de 2034 al 4,5 % [A3]); tipo del 25,5 %; peso de la deuda del 39 % (13.867 M de deuda bruta con arrendamientos frente a 21.277 M de capitalización). WACC del 8,30 %. Con la prima implícita del mercado (4,2 % [D5]), 7,15 %.',
    terminal: 'Crecimiento a perpetuidad del 2 % (inflación de la zona euro), con un margen EBITDA del 19 %. El múltiplo de salida implícito es de 5,4 veces el EBITDA, por encima de lo que cotiza hoy IAG (3,7) y en la media de los comparables europeos con NIIF 16 (3,8-6,2) [D2]. El valor terminal pesa un 67 %.',
  },
  puente_comentarios: {
    '2026e': 'Capacidad plana (guía [A3]); el precio por asiento-kilómetro sube ≈ 2,4 % por la repercusión del queroseno.',
    '2027e': 'Capacidad +3 % con aviones que vuelven del taller de motores y entregas; precio +1 %; Loyalty +0,5 puntos.',
    '2028e': 'Capacidad +3 % (objetivo del 2-4 % [A2]); precio +0,5 % con más oferta en el Atlántico Norte; Loyalty +0,5.',
    '2029e': 'Capacidad +3 % con el pedido de largo radio; precio plano.',
    '2030e': 'Capacidad +3 %; precio plano.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (3,2 % al año) está dentro del objetivo de capacidad de la empresa (2-4 %) y por debajo del histórico de 2023-2025 (6,2 %). La reinversión de la proyección (45 % del NOPAT) financiaría un 12,2 % al ROIC actual, y el capital nuevo apenas rinde (−3,7 %) porque la proyección baja el margen al de un ciclo medio: no se pide más rentabilidad a la inversión que la histórica. La cuota no cambia (≈ 3,5 % de la capacidad mundial). Las tres pruebas pasan. La reserva es el ciclo, no el crecimiento: el ROIC de 2025 (27 %) es de pico y lo recogemos bajando el margen, no el crecimiento.',
  dcf_lectura: 'El DCF da 5,99 EUR por acción (505 peniques), un 22,5 % sobre el precio, con un WACC del 8,30 % y un valor terminal que pesa el 67 %. El DCF inverso dice que el precio descuenta un crecimiento del 1,5 % anual en 2027-2035 (frente al 3,2 % de nuestro base) o un margen EBITDA final del 17,9 % (frente al 19 %), y una rentabilidad implícita del 9,3 % anual, un punto sobre el WACC. Es decir: el mercado ya pone a IAG un margen de ciclo bajo y poco crecimiento; no exige nada heroico. Lo que pesa es la volatilidad: una crisis de un año con margen −5 puntos y un margen permanente 1,5 puntos menor (bajista) deja el valor en 2,91 EUR (−40 %). Con la prima de riesgo que pide hoy el mercado (4,2 %), el DCF sube a 7,89 EUR. El DCF mira a largo plazo; la decisión a 12 meses depende del PER que el mercado da a IAG, que es bajo por norma.',
  narrativas: {
    Bajista: 'Crisis en 2027: recesión, el queroseno sigue por encima de 100 USD y la capacidad transatlántica de EE. UU. se recupera; ingresos −3,5 % y margen EBITDA 5 puntos menor (EBIT ≈ 8 %); recuperación lenta en 2028-2029 y margen 1,5 puntos menor para siempre; WACC +0,5 y crecimiento terminal del 1,5 %.',
    Base: 'El queroseno baja con la curva (87 USD en 2027, 78 en 2028), vuelven los aviones parados por los motores y la capacidad crece un 3 % al año; el margen EBIT se mantiene en el 13-14 % hasta 2028 y converge a un ciclo medio (≈ 9,5 %) en 2033.',
    Alcista: 'Paz en Oriente Medio, crudo a 70-75 USD, oferta del sector limitada por la falta de aviones y demanda premium sólida: 0,5 puntos más de crecimiento y un punto más de margen todos los años.',
  },
  escenarios_comentario: 'La asimetría a largo plazo es favorable pero amplia: el alcista vale 7,42 EUR (+52 %) y el bajista 2,91 (−40 %), con el base en 5,99 (+22,5 %). Es la marca de una aerolínea: un año malo borra el beneficio de dos buenos, y el valor terminal (67 %) depende del margen de ciclo medio que se suponga. A 12 meses la asimetría es la contraria, porque el mercado nunca ha pagado más de 6-7 veces el beneficio siguiente.',
  casos_12m: {
    Bajista: 'Ingresos de 35.500 M en 2028e (sin crecimiento desde 2027) y margen EBIT del 11 % (bajo el objetivo del 12-15 %: queroseno caro, sobrecapacidad transatlántica y recesión suave): BPA de 0,595 EUR (−25 % frente al base) [P1]; la regla lleva el PER a 2,8 veces, el mínimo de cinco años (diciembre de 2022, con la deuda de la COVID).',
    Base: 'Ventas de 34.010 M en 2026e, +4,5 % en 2027e y +4 % en 2028e; margen EBIT antes de extraordinarios del 13,2 %, 13,5 % y 13,7 %; cargos no operativos de ≈ 470 M; impuesto del 26 % y 4.263 M de acciones diluidas sin recompras nuevas: BPA de 0,797 EUR en 2028e (+7 % anual desde los 0,695 de 2025) [P1].',
    Alcista: 'Ingresos de 37.500 M y margen EBIT del 15 % (el techo del objetivo y el récord de 2025) en 2028e: BPA de 0,898 EUR; la regla da 8,2 veces (techo de base × 1,35), por debajo de la mediana de los comparables (9,75).',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (0,65 EUR) está en la parte alta del consenso (0,609 en Londres, 0,650 en Madrid) [D2] porque el segundo trimestre batió lo esperado y el combustible guiado bajó de 9.000 a 8.300-8.600 M [A3]; el de 2027e (0,748) coincide con el consenso (0,724-0,763). Las revisiones del consenso van a la baja (−7,5 % en el BPA de 2027 en 90 días). Nuestro BPA de 2028e (0,797) no lleva recompras nuevas: si IAG devuelve 1.000 M al año como en 2025-2026, sumaría ≈ 5 % por año.',
  objetivo_comentario: 'El objetivo a 12 meses (4,69 EUR, 395 peniques, ponderado 25/50/25) queda un 4,1 % bajo el precio: −2,1 % con el dividendo, y +1,4 % en el caso base. El base (6,1 veces × 0,797 = 4,86 EUR) no da más porque la regla acerca el PER actual (6,7 veces el BPA de los próximos 12 meses) a la mediana adelantada de cinco años (4,2 veces), con el tope de ÷1,1. El bajista pesa mucho (2,8 × 0,595 = 1,67 EUR, −66 %): una aerolínea en crisis cotiza a múltiplos de crisis sobre beneficios de crisis. El valor intrínseco (5,99 EUR) está un 22,5 % por encima del precio: barata a largo plazo, sin recorrido a 12 meses según su propia historia. Para Comprar haría falta un precio de 4,16 EUR (≈ 351 peniques) o menos.',
  valoracion_comentario: 'Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones 0 (compras escasas, minoritarias o de crisis: Lufthansa-ITA a 2,3 veces el EBITDA, TAP sin cerrar). Los comparables europeos con NIIF 16 (Lufthansa 4,9 veces el EBITDA, Air France-KLM 3,8, Ryanair 6,2, easyJet 5,7) son el contraste útil; las de EE. UU. no aplican NIIF 16 y su EV/EBITDA sale más alto. IAG cotiza a 3,7 veces el EBITDA de 12 meses y a 6,7 veces el BPA de los próximos 12 meses. Suma de partes: no aplica (ver abajo), pero IAG Loyalty (548 M de EBIT, poco capital) valdría ≈ 5.000-6.000 M a 10 veces, un cuarto de la capitalización [A2].',
  suma_partes: 'No aplica como método: las aerolíneas comparten red, flota, compras y marca, y su resultado es uno. IAG Loyalty (Avios: 548 M de EBIT en 2025, objetivo de 1.000 M a medio plazo) tendría valor propio como negocio de fidelización con poco capital; a 10-12 veces el EBIT sería ≈ 5.500-6.500 M, el 25-30 % de la capitalización, pero depende de los vuelos de BA e Iberia y la empresa no planea separarlo [A2, A3].',
  catalizadores: {
    items: [
      { fecha: '2026-11-06', evento: 'Resultados del tercer trimestre de 2026', efecto: 'Guía de combustible y margen del año; dividendo a cuenta de 2026', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-10 → 2027-02', evento: 'Tercer programa de recompra (500 M) y posible cuarto en febrero', efecto: '+2-5 % de BPA al año', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-4T', evento: 'Vista del IVA de IAG Loyalty en el First-tier Tribunal (decisión en 2027)', efecto: '512 M activados: devolución o cargo', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027 (capacidad, combustible, devolución de caja)', efecto: 'Primera guía con la curva del crudo a la baja', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha', evento: 'Paz o escalada en Irán y Ormuz', efecto: '±10 USD de Brent ≈ ±600-800 M de combustible al año sin coberturas', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-2028', evento: 'Vuelta de aviones parados por los motores (GTF y Trent)', efecto: 'Más capacidad y menos coste unitario; también más oferta en el sector', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Privatización de TAP', efecto: 'Una compra cara restaría caja a las recompras; una minoritaria barata reforzaría Lisboa-Brasil', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Ciclo: los márgenes de 2024-2025 son de pico y las crisis llegan sin aviso (2009, 2020)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 % (escenario bajista); −66 % a 12 meses con PER de crisis', mitigante: 'Balance con grado de inversión, 11.873 M de liquidez y deuda neta de 0,6 veces el EBITDA [A3]', senal: 'Ingreso unitario de pasaje negativo dos trimestres seguidos' },
      { riesgo: 'Queroseno con la guerra de Irán y Ormuz (Brent de 110 USD)', tipo: 'Materias primas', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−10 a −15 %', mitigante: 'Coberturas del ≈ 70 % del 2S26 y política a tres años (hasta 75 % a corto); recupera ≈ 60 % con precio [A3]', senal: 'Brent de dic-27 por encima de 95 USD' },
      { riesgo: 'Capacidad transatlántica de las aerolíneas de EE. UU. (Irlanda, sur de Europa)', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Empresa conjunta con American (≈ 49 % del Atlántico Norte con socios) y slots de Heathrow [A2]', senal: 'Pérdidas de Aer Lingus en el año o PRASK del Atlántico Norte negativo' },
      { riesgo: 'Motores de Pratt & Whitney (GTF) y Rolls-Royce (Trent 1000 y XWB): aviones en tierra y coste de mantenimiento', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Compensaciones de los fabricantes, arrendamiento de aviones usados (Vueling: 9 A320ceo) y flota mixta (CFM en parte) [A1]', senal: 'Guía de capacidad de 2027 por debajo del +2 %' },
      { riesgo: 'Laboral y reestructuraciones (Iberia, BA, Aer Lingus)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−2 a −4 %', mitigante: 'Acuerdos plurianuales; reestructuraciones ya anunciadas', senal: 'Huelgas en verano o cargos de reestructuración por encima de 300 M en el año' },
      { riesgo: 'Fiscal y regulatorio (IVA de Loyalty 512 M, liquidación española de 108 M, derechos de emisión, combustible sostenible)', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−1 a −3 %', mitigante: 'Provisiones y activos contingentes [A3]', senal: 'Sentencia adversa del First-tier Tribunal en 2027' },
      { riesgo: 'Riesgo de IA: agentes de compra que comparan precios por el cliente, ciberataques más baratos y transformación de la distribución', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±2 % a 3-5 años', mitigante: 'Volar no se sustituye; la IA baja costes de mantenimiento, precios y atención', senal: 'Caída del ingreso por billete en canales directos o un ciberataque grave' },
    ],
    premortem: 'Octubre de 2027: la acción ha caído un 45 %. El queroseno no bajó como decía la curva: Ormuz siguió cerrado a ratos y el Brent se quedó en 100-110 USD; a la vez, la recesión en Europa y en EE. UU. golpeó la clase turista, y las aerolíneas de EE. UU. llenaron de asientos el Atlántico Norte con aviones que por fin salían de los talleres de motores. IAG cumplió sus coberturas en 2026, pero en 2027 tuvo que comprar combustible caro con menos ingreso por asiento: el margen EBIT cayó al 8 %, el BPA a 0,45 EUR, y el mercado volvió a pagar 3 veces el beneficio, como en 2022. Las recompras siguieron, pero a menor ritmo. La señal estaba en el 3T26: guía de 2027 con capacidad baja y el ingreso unitario del Atlántico Norte en negativo.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±2 % a 3-5 años',
      comentario: 'La IA no sustituye un avión: el 95 % del resultado de IAG es transportar personas y carga. La exposición está en la distribución: agentes de compra que buscan el billete más barato por el cliente pueden debilitar la marca, la venta directa y los ingresos complementarios (asientos, equipaje), y aumentan el poder de los intermediarios. También abaratan los ciberataques (IAG lo cita entre sus riesgos principales, con la IA agéntica [A3]). A favor: precios dinámicos, mantenimiento predictivo (motores), planificación de tripulaciones y atención al cliente con menos coste. Neto: riesgo menor, pero presente.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Combustible 2027', pregunta: '¿Qué porcentaje de 2027 está cubierto y a qué precio medio, y cuánto del sobrecoste de 2026 se podrá repercutir si el Brent sigue en 100-110 USD?', por_que: 'Es la diferencia entre el caso base y el bajista.' },
      { tema: 'Motores', pregunta: '¿Cuántos aviones siguen en tierra por los motores GTF y Trent, cuándo vuelven y qué compensación pagan Pratt & Whitney y Rolls-Royce?', por_que: 'Explica la capacidad plana de 2026 y el crecimiento de 2027.' },
      { tema: 'Atlántico Norte', pregunta: '¿Cómo evoluciona el ingreso unitario del Atlántico Norte por clase, y qué hace Aer Lingus para volver a beneficios?', por_que: '30,6 % de la capacidad y la mayor parte del resultado de BA.' },
      { tema: 'Devolución de caja', pregunta: '¿Cuánto devolverá en 2027 con el capex subiendo a 4.900 M y la deuda neta en 0,6 veces?', por_que: 'Las recompras son el motor del BPA que no está en nuestro base.' },
      { tema: 'Loyalty', pregunta: '¿Cuándo espera llegar a 1.000 M de EBIT en IAG Loyalty y qué pasa si pierde el litigio del IVA?', por_que: 'Es el negocio de más valor por euro invertido.' },
      { tema: 'TAP', pregunta: '¿Qué precio máximo pagaría por TAP y cómo lo financiaría?', por_que: 'Una compra cara sustituiría recompras.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 4,69 EUR (395 peniques): nuestro BPA de 2028e × el PER de la regla común, ponderado 25/50/25. Eso es un −2,1 % de rentabilidad ponderada con el dividendo y un +1,4 % en el caso base, frente a un precio de 4,89 EUR (412,2 peniques, cierre de Londres del 19-oct-2026). El valor intrínseco (5,99 EUR) está un 22,5 % por encima del precio. IAG es barata a largo plazo, pero su historia dice que el mercado no le paga más de 6-7 veces el beneficio siguiente, y el bajista de una aerolínea es muy profundo [A3, D1]. La convicción es media porque las dos reglas de valoración coinciden en Mantener y el precio está lejos de los umbrales (4,16 y 5,32 EUR), pero el resultado depende del queroseno y de la guerra de Irán, que nadie puede prever; la subiría una guía de 2027 con capacidad y margen dentro del objetivo, y la bajaría un ingreso unitario negativo o un Brent de 2027 por encima de 100 USD.

**El negocio.** Grupo de British Airways, Iberia, Vueling, Aer Lingus y LEVEL, más los Avios: 33.213 M de ingresos y un margen operativo del 15,1 % en 2025, el mejor de las grandes europeas [A2]. Sus ventajas son los slots de Heathrow y Madrid, la empresa conjunta transatlántica con American y Loyalty. El ROIC del motor (27,4 %) supera al WACC (8,3 %) en 19 puntos. La calidad sostiene el crecimiento que proyectamos (3,2 % al año; veredicto «Sí»), pero el ROIC es de pico de ciclo: en 2021 fue del −18 %.

**Finanzas.** El BPA ajustado pasó de 5,6 céntimos en 2022 a 69,5 en 2025. En 2026 baja (0,65 EUR estimado) por el queroseno: combustible de 8.300-8.600 M frente a 7.083 M en 2025 [A3]. La deuda neta es de 4.692 M (0,6 veces el EBITDA), la liquidez de 11.873 M y el rating BBB/Baa2. El flujo libre se reparte con dividendos (0,098 EUR por 2025) y recompras (≈ 1.500-2.000 M en 2026) [A6, A7].

**Equipo y gobierno.** Luis Gallego, consejero delegado desde 2020, sacó a IAG de la COVID y la llevó a márgenes récord; director financiero nuevo desde junio de 2026. Presidente independiente (Javier Ferrán) y Qatar Airways con el 25 % y dos consejeros [C1]. Debilidad: ventas de directivos en 2026 sin compras [C4].

**Valoración.** El DCF da 5,99 EUR (+22,5 %) con un WACC del 8,3 % y margen de ciclo medio; el DCF inverso descuenta solo un 1,5 % de crecimiento. La regla a 12 meses lleva el PER de 6,7 a 6,1 veces (tope de ÷1,1 hacia la mediana adelantada de 4,2) y el bajista a 2,8 veces sobre un BPA de 0,595 [P1]. Los analistas esperan 535 peniques (+30 %), con el BPA de 2027 recortado un 7,5 % en tres meses [D2].

**Riesgos y catalizadores.** Los mayores son el ciclo (márgenes de pico) y el queroseno con la guerra de Irán (Brent de 110 USD); después, la capacidad transatlántica de EE. UU. (Aer Lingus en pérdidas) y los motores de Pratt & Whitney y Rolls-Royce. El riesgo de la IA es bajo (±2 %): afecta a la distribución y a la ciberseguridad, no al vuelo. Catalizadores: el tercer trimestre (6-nov-2026), las recompras y la curva del crudo [A3, P3].

**Qué cambiaría la decisión.** Comprar por debajo de 4,16 EUR (≈ 351 peniques); Mantener entre 4,16 y 5,32 EUR; Vender por encima de 5,32 (≈ 449 peniques). Una guía de 2027 con capacidad del +3 % y combustible a la baja, o un precio por debajo de 351 peniques, mejorarían la recomendación. Un ingreso unitario negativo dos trimestres seguidos o un Brent estable por encima de 100 USD en 2027 la empeorarían.`,
    tesis: 'IAG es la aerolínea europea mejor gestionada: margen del 15 % en 2025 frente al 5-8 % de Lufthansa y Air France-KLM, slots de Heathrow y Madrid, el Atlántico Norte con American y un negocio de puntos (Avios) de poco capital. Ha pasado de la quiebra técnica de 2020 a 0,6 veces de deuda neta y devuelve ≈ 8-9 % de su capitalización al año. Pero es una aerolínea: el queroseno de la guerra de Irán, la capacidad de EE. UU. y los motores ya restan margen en 2026, y el mercado nunca le ha pagado múltiplo de empresa estable.',
    vision_diferencial: {
      mercado_descuenta: 'Que el queroseno caro es temporal, que el BPA vuelve a crecer en 2027 (0,72-0,76 EUR) y que la acción vale 535 peniques (+30 %) con 13 de 15 analistas en comprar.',
      nuestra_vision: 'Coincidimos en el BPA de 2027, pero no en el múltiplo: a 6,7 veces el beneficio siguiente IAG ya cotiza en la parte alta de su historia adelantada (2,8-7,3 veces). El valor está a largo plazo, no en el próximo año.',
      por_que: 'El beneficio de una aerolínea en pico se descuenta con un múltiplo bajo porque el mercado sabe que no dura: en 2022-2023 IAG cotizaba a 3 veces el beneficio siguiente. Con el bajista tan profundo, la regla común no da compra salvo con un precio claramente menor.',
    },
    a_favor: [
      '**La mejor de Europa**: margen operativo del 15,1 % en 2025, el doble que Lufthansa y Air France-KLM.',
      '**Balance sano**: deuda neta de 0,6 veces el EBITDA, 11.873 M de liquidez, grado de inversión.',
      '**Devuelve caja**: ≈ 1.500-2.000 M al año entre dividendos y recompras (8-9 % de la capitalización).',
      '**Activos escasos**: slots de Heathrow y Madrid, empresa conjunta transatlántica, Avios.',
      '**Valor intrínseco** de 5,99 EUR, un 22,5 % por encima del precio.',
    ],
    en_contra: [
      '**Márgenes de pico**: el ROIC de 27 % de 2025 fue de −18 % en 2021; el bajista vale −40 % (−66 % a 12 meses).',
      '**Queroseno de guerra**: Brent de 110 USD; combustible +1.300 M en 2026.',
      '**Atlántico Norte**: las de EE. UU. crecen en Irlanda y el sur de Europa; Aer Lingus pierde dinero.',
      '**Motores**: Pratt & Whitney y Rolls-Royce dejan aviones en tierra; capacidad plana en 2026.',
      '**Consenso a la baja**: BPA de 2027 −7,5 % en 90 días.',
    ],
    que_vigilar: 'La tesis depende de que el margen EBIT se mantenga en el 12-15 % mientras el queroseno baja y vuelven los aviones parados, y de que IAG siga devolviendo la caja sobrante. La señal en contra sería un ingreso unitario de pasaje negativo dos trimestres seguidos, una guía de 2027 con margen por debajo del 12 % o un Brent de 2027 por encima de 95-100 USD.',
    cambiaria_recomendacion: [
      'Precio por debajo de 4,16 EUR (≈ 351 peniques): Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio entre 4,16 y 5,32 EUR: Mantener.',
      'Precio por encima de 5,32 EUR (≈ 449 peniques): Vender.',
      'Guía de 2027 (febrero) con capacidad +3 % y margen del 13-15 %: revisar al alza el BPA.',
      'Ingreso unitario negativo dos trimestres o Brent de 2027 por encima de 100 USD: rebajar el BPA y acercarse al bajista.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen EBIT antes de extraordinarios', nivel_actual: '10,9 % (1S26); 15,1 % (2025)', umbral_alerta: '< 12 % en el año', por_que: 'Objetivo de la empresa y base del BPA.' },
      { kpi: 'Ingreso unitario de pasaje (PRASK)', nivel_actual: '+2,4 % (1S26)', umbral_alerta: 'Negativo dos trimestres', por_que: 'Primera señal del ciclo.' },
      { kpi: 'Gasto en combustible (guía)', nivel_actual: '8.300-8.600 M (2026)', umbral_alerta: '> 9.000 M', por_que: 'La guerra de Irán y Ormuz.' },
      { kpi: 'Capacidad (guía)', nivel_actual: 'Plana (2026)', umbral_alerta: '< +2 % en 2027', por_que: 'Motores y entregas.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '0,6 veces', umbral_alerta: '> 1,5 veces', por_que: 'Límite para devolver caja.' },
    ],
  },
};
