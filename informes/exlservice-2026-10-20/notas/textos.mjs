// Textos del analista (ExlService, corte 2026-10-20). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
// Las cifras de valoración salen de calc (segundo cálculo del 20-oct-2026) tal cual.
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio natural (31-dic). Último trimestre publicado: 2T26 (30-jun-2026); el LTM es jul-25 a jun-26. Los resultados del 3T26 se publican el 27-oct-2026, una semana después del corte. Precio: cierre del 19-oct-2026 (39,76 USD); la decisión se vuelve a comprobar con el precio de la sesión del 20-oct en las pruebas de robustez. El BPA de la regla a 12 meses y su historia están en una base propia, el «BPA con pagos en acciones» (el publicado más la amortización de intangibles comprados y los costes de compras, netos de impuestos: 1,61 USD en 2025 frente a 1,95 del ajustado de la empresa y 1,54 del publicado), porque los pagos en acciones (79,5 M USD, 3,8 % de las ventas) son un coste recurrente [A1, A5]. El DCF los trata igual (margen EBITDA GAAP). Cifras de 2016-2020 corregidas por el desdoblamiento 5×1 de 2023. iMerit (3-ago-2026) entra en el puente como deuda pagada después del balance de junio, con una estimación propia de los pagos aplazados [P1]. Precio de una acción en EUR: ≈ 34 EUR, un 0,1 % de una cartera de 30.000 EUR.',
  controles_explicados: [],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'EXL nace en 1999 en Nueva York como proveedor de procesos externalizados desde la India, con Rohit Kapoor como cofundador; se constituye en Delaware en 2002 y cotiza en el Nasdaq desde 2006 [A1, C1]. Durante quince años fue sobre todo una empresa de externalización de procesos (BPO) para aseguradoras y bancos, con la analítica como segunda pata. Kapoor, consejero delegado desde 2008, la fue girando hacia los datos: SCIO Health Analytics (2018, integridad de pagos sanitarios), Clairvoyant (2021, ingeniería de datos) e ITI Data (2024) [A1]. En 2023 desdobló la acción 5×1 y en 2024 reorganizó la empresa por clientes (seguros, salud, banca e internacional). Desde 2025 se presenta como una empresa «de datos e IA»: el 55 % de las ventas de 2025 y el 61 % en el 2T26 [A1, A13]. En 2026 compró iMerit (datos para entrenar modelos de IA) y firmó un crédito de 1.000 M USD [A10, A11].',
      hitos: [
        { anio: '1999', hito: 'Fundación en Nueva York; centros de operaciones en Noida (India).' },
        { anio: '2006', hito: 'Salida a bolsa en el Nasdaq.' },
        { anio: '2008', hito: 'Rohit Kapoor, cofundador, consejero delegado (presidente del consejo desde 2024) [C1].' },
        { anio: '2018', hito: 'Compra de SCIO Health Analytics (232 M USD): base del negocio de integridad de pagos sanitarios [A1].' },
        { anio: '2021', hito: 'Compra de Clairvoyant (77 M): ingeniería y gestión de datos [A1].' },
        { anio: '2023', hito: 'Desdoblamiento 5×1 de la acción.' },
        { anio: '2025', hito: 'Datos e IA superan el 55 % de las ventas; recompras de 329 M USD [A1].' },
        { anio: '2026', hito: 'Caída del sector por la IA en febrero; día del inversor (13-may); compra de iMerit (hasta 310 M); salida de Vivek Jetley [A11, C4].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'EXL rinde mucho sobre su capital: un ROIC del 28,4 % en 2025 con el beneficio operativo GAAP después de impuestos (con los pagos en acciones como coste) sobre 883 M USD de capital invertido, frente a un WACC del 10,5 %: ≈ +18 puntos. Sin el fondo de comercio llega al 54 %. La tendencia es al alza: del 9-15 % de 2016-2020 (con la compra de SCIO y el margen operativo del 8-11 %) al 21-28 % desde 2021, porque el margen operativo GAAP pasó del 11,5 % al 15,0 % mientras el capital crecía poco: es un negocio de personas con un inmovilizado del 5 % de las ventas [A1]. Lo que más capital consume es el circulante: clientes y activos de contrato de ≈ 16-17 % de las ventas (73 días en el semestre) [A2]. El ROIC incremental histórico (≈ 39 %) es aún más alto. Riesgo: las compras con IA (iMerit, 4,4 veces las ventas con todo el pago [P1]) bajan el rendimiento si no crecen lo prometido. Calidad: pasa con holgura.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para EXL es lo social y el gobierno: más de 65.000 empleados, la mayoría en la India y Filipinas, con rotación alta, códigos laborales nuevos en la India (que obligaron a reconocer coste de antigüedad) y la seguridad de los datos de asegurados, pacientes y clientes de banca que procesa (HIPAA, GLBA, reglamento europeo) [A1]. Las emisiones propias son pequeñas (oficinas y centros de datos de terceros).',
      controversias: 'Sin controversias graves conocidas. En gobierno: consejero delegado y presidente a la vez (con consejero coordinador independiente), recompra de 63,4 M USD de acciones a Orogen, sociedad ligada al consejero coordinador (Vikram Pandit), fuera del programa en diciembre de 2025, y ventas de directivos por 3,13 M USD en 12 meses sin compras [A12, C3]. Remuneración del consejero delegado de 16,2 M USD en 2025 (2.459 veces el empleado mediano, en la India), aprobada con el 95,2 % [C1, C2]. Calificaciones de MSCI o Sustainalytics no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
    multiplos_historicos: {
      comentario: 'Con el beneficio publicado, EXL cotiza a 25,2 veces el de los últimos 12 meses, por debajo de todos sus cierres de 2016-2025 (27,6-43,2 veces, media 34,3) y a 16,1 veces el EBITDA, también en el 10 % más bajo de su historia. En la base de la regla (BPA con pagos en acciones, adelantado) el PER es de 20,1 veces frente a una mediana de cinco años de 27,7 y un mínimo de 23,6. El descuento tiene causa: desde febrero de 2026 el mercado duda de que el negocio de procesos por horas sobreviva a la IA generativa, y paga lo mismo por EXL que por un BPO clásico. Lo estructural es el tipo libre (5,15 % frente al 1-2 % de 2020-2021), que explica parte de los múltiplos de 30-40 veces de entonces.',
    },
    comparables: {
      comentario: 'EXL cotiza con prima clara frente a sus comparables: 15,7 veces el BPA ajustado de los próximos 12 meses y 16,1 veces el EBITDA, frente a una mediana de 8,9 y ≈ 7,7 veces (Genpact 8,5 y 8,2; Cognizant 10,7 y 7,7). La prima se justifica en parte: crece el 13-15 % frente al 1-9 % del resto, su ROIC del 28 % y su caja neta son mejores, y el 61 % de sus ventas ya es de datos e IA. Pero los comparables son la referencia más dura: todo el sector de servicios y procesos cotiza a múltiplos de un dígito o poco más porque el mercado descuenta que la IA comprime los ingresos por horas, y EXL no es inmune. Como múltiplo usaría el de Accenture (16 veces), no la mediana; el método pesa un 15 %. Ojo: estos PER son sobre BPA ajustado, sin pagos en acciones; en la base de la regla serían ≈ 20 % más altos.',
    },
    transacciones: {
      comentario: 'Pocas operaciones comparables con múltiplos verificados. La más cercana es la compra de WNS por Capgemini (≈ 3.300 M USD, prima del 28 % sobre la media de 90 días [D7]): un comprador europeo pagó por un BPO indio de seguros y analítica para convertirlo en «operaciones inteligentes con IA», lo que pone un suelo de interés estratégico al sector. iMerit, comprada por EXL, cuesta ≈ 4,4 veces sus ventas con todo el pago [P1]. No pesan en la valoración.',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+15,0 %, fijo) es la guía de julio (2.390-2.415 M USD, +13-14 % orgánico con 28-32 M de iMerit) [A3]. Después, +10,5 % en 2027e (el consenso da +11,7 % [D2]; restamos por el freno de las operaciones digitales, que caen un 1,5 %), +9 % en 2028e y bajada hasta el 4 % en 2033e: por debajo del 13,2 % anual de 2020-2025 y del objetivo de «dos cifras» de la dirección para 2027 [D12], porque la IA convierte trabajo por horas en contratos por resultado con menos ingresos por cliente.',
    margenes: 'Margen EBITDA GAAP (con los pagos en acciones como coste): 17,5 % en 2026e (17,6 % en el LTM, con más inversión comercial y 4,1 % de pagos en acciones en el semestre [A3]) hasta el 18,0 % desde 2029e. La subida es pequeña: la mezcla hacia datos e IA (más margen bruto) y la palanca operativa suben el margen, pero la presión de precios de la IA (los clientes piden compartir el ahorro) y la rupia lo frenan. El ajustado de la empresa (21,7 % en 2025) suma los pagos en acciones.',
    inversion: 'Inversión del 2,5-2,6 % de las ventas (guía de 58-62 M en 2026 [A3]) y amortización del 2,5-2,7 % (sube en 2027e por los intangibles de iMerit). Circulante del 17 % de las ventas, el nivel de 2025 (clientes y activos de contrato menos pasivos corrientes de explotación): crecer consume caja. No se proyectan compras nuevas.',
    wacc: 'Tasa libre del 5,15 % (bono del Tesoro a 10 años, 19-oct-2026 [D3]); beta de 1,0 (0,87 diaria a un año, 0,97 semanal a cinco [D1]); prima del 5,5 % más 0,5 puntos por el riesgo de sustitución por la IA, que la beta histórica no recoge; coste de la deuda del 5,5 % antes de impuestos (SOFR más diferencial del crédito de 2026 [A10]); peso de la deuda del 10 %. WACC del 10,46 %. Con la prima implícita del mercado (4,2 % [D4]) el WACC baja al 9,3 % y el DCF sube a 32,60 USD.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: los servicios de datos crecen con la economía, pero la IA puede abaratar el trabajo que vende. El múltiplo de salida de referencia es 11 veces el EBITDA, por encima de Genpact y Cognizant (7,7-8,2 hoy) y por debajo de los 16 de EXL. El valor terminal pesa un 61 %.',
  },
  puente_comentarios: {
    '2026e': 'Guía [A3]: volumen del 12,5 % (datos e IA +25-30 %, operaciones digitales planas o a la baja), precio del 1 % y 1,5 puntos de iMerit (28-32 M desde agosto).',
    '2027e': 'Volumen del 7,5 % (datos e IA frenan hacia el 15 %; operaciones digitales −3 a −5 %), precio del 1 % y 2 puntos de iMerit (año completo, ≈ 70 M [P1]).',
    '2028e': 'Volumen del 8 % y precio del 1 %: datos e IA ya son ≈ 70 % de las ventas y el trabajo por horas pesa menos.',
    '2029e': 'Volumen del 7 % y precio del 1 %.',
    '2030e': 'Volumen del 6 % y precio del 1 %: converge hacia el crecimiento del gasto en servicios de TI (≈ 6 %).',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (8,1 % medio en 2026e-2033e) es menor que el histórico (13,2 % anual en 2020-2025) y que el del mercado (Gartner: +9,0 % en servicios de TI en 2026 [B2]), y no necesita capital: el ROIC es del 28 % y la reinversión es solo el 11 % del beneficio operativo después de impuestos. La cuota implícita no sube (0,12 % hoy, 0,10 % en 2033e). El motor también da «Sí». El riesgo no es de financiación sino de demanda: si la IA abarata el trabajo por horas más deprisa de lo que EXL vende datos e IA, el crecimiento cae; lo recoge el bajista (−4 puntos al año).',
  dcf_lectura: 'El DCF da 27,36 USD por acción, un 31,2 % bajo el precio (39,76), con un WACC del 10,46 % y un valor terminal del 61 %. El DCF inverso dice que el precio descuenta un crecimiento del 16,0 % anual de 2027e a 2033e con nuestro margen (frente al 7,1 % de nuestro base), o un margen EBITDA del 24 % con nuestro crecimiento (frente al 18 %): el mercado valora la empresa con el margen ajustado (sin pagos en acciones) y un crecimiento de dos cifras sostenido, lo que la dirección promete y nosotros no damos por hecho. La rentabilidad implícita en el precio es del 8,2 %, por debajo de nuestro WACC (10,5 %) y del que pide el mercado (9,3 %). Con la prima del mercado el DCF sube a 32,60 USD, aún un 18 % bajo el precio.',
  narrativas: {
    Bajista: 'La IA generativa sustituye trabajo de procesos más deprisa: las operaciones digitales (45 % de las ventas en 2025) caen un 10-15 % al año, los clientes de seguros internalizan con agentes de IA y los precios de los contratos de datos se comprimen. El crecimiento se queda en el 3 % medio y el margen baja 1,5 puntos; la rupia fuerte o una salida de un cliente grande (los tres primeros son el 17,8 % de las ventas) lo agrava.',
    Base: 'Crecimiento del 15 % en 2026e (guía) que baja al 10,5 % en 2027e y al 4 % en 2033e, con datos e IA creciendo y operaciones digitales cayendo; margen EBITDA GAAP del 17,5-18 %, con los pagos en acciones como coste.',
    Alcista: 'EXL gana la transición: los agentes de IA en siniestros, integridad de pagos y suscripción venden por resultado con más margen, iMerit crece con el entrenamiento de modelos y la cuota sube. Dos puntos más de crecimiento al año y 0,8 puntos más de margen.',
  },
  escenarios_comentario: 'La asimetría es muy desfavorable al precio actual: incluso el alcista (31,64 USD) queda un 20,4 % bajo el precio, y el bajista (17,81) un 55,2 %. El valor ponderado de los escenarios (26,04 USD) está un 34 % por debajo. La razón no es un mal negocio sino que el DCF trata los pagos en acciones como coste y descuenta al 10,5 %: con esos dos supuestos, ni el alcista justifica 40 USD.',
  casos_12m: {
    Bajista: 'Crecimiento del 6,5 % en 2027e y del 5 % en 2028e (operaciones digitales cayendo un 10 % al año) y margen EBITDA del 16,3 %: BPA con pagos en acciones de 1,83 USD en 2028e (−17 % frente al base); el PER baja a 17,7 veces (base × 0,8), por debajo del mínimo de cinco años (23,6).',
    Base: 'Ventas de 2.400 M en 2026e (guía), +10,5 % en 2027e y +9 % en 2028e; margen EBITDA del 17,8 %, depreciación del 2,3 %, 18 M de gastos financieros netos, impuesto del 22 % y 152 M de acciones sin recompras nuevas: BPA con pagos en acciones de 2,21 USD (+11 % anual desde 1,61 en 2025).',
    Alcista: 'Crecimiento del 12,5 % en 2027e y del 11 % en 2028e y margen del 18,6 %: BPA de 2,42 USD; PER de 27,7 veces, la mediana de cinco años.',
  },
  diferencia_consenso: 'El consenso mide otro BPA: el ajustado de la empresa, que suma los pagos en acciones (2,29 USD en 2026 y 2,60 en 2027 [D2]). Nuestro 2026e con pagos en acciones (1,80) equivale a ≈ 2,27 ajustado (+0,47 de pagos en acciones netos de impuestos), en la guía (2,25-2,29); nuestras ventas de 2027e (2.653 M) quedan un 1,5 % bajo el consenso (2.693). El objetivo medio de los analistas (45,13 USD, 8 analistas, entre 43 y 48) queda un 8 % bajo nuestro base a 12 meses (48,84): ellos aplican ≈ 17 veces al BPA ajustado de 2027, y la regla común aplica 22,1 veces a nuestro BPA con pagos en acciones de 2028e. La diferencia está en el ejercicio (un año más tarde) y en el múltiplo (la regla sube el PER hacia la mediana histórica con el tope de ×1,1).',
  objetivo_comentario: 'El objetivo a 12 meses (49,28 USD, ponderado) queda un 23,9 % sobre el precio y el base (48,84) un 22,8 %: la regla común da Comprar por rentabilidad. Pero el valor intrínseco (26,16 USD) queda un 34,2 % por debajo, y la regla exige que el valor intrínseco cubra el precio: la señal es Mantener. Las dos cifras miden cosas distintas: el objetivo a 12 meses supone que el mercado vuelve a pagar por EXL algo más de lo que paga hoy (22,1 veces frente a 20,1, a mitad de camino hacia su mediana de 27,7), y el DCF dice que, con los pagos en acciones como coste y un WACC del 10,5 %, ni hoy vale lo que cuesta. Crecimiento del BPA base: +11 % anual sobre el BPA con pagos en acciones. Para comprar haría falta un precio de 26,16 USD (−34 %); vender, por encima de 54,75.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 35 % y comparables 15 %. El DCF es el método central para un negocio con caja positiva y poca deuda; los escenarios recogen el riesgo de la IA (bajista −55 %); los comparables pesan poco porque todo el sector está deprimido por la misma duda. Las transacciones no pesan (sin múltiplos verificados). El valor objetivo de la síntesis es 26,16 USD (−34,2 %). El rango del DCF con ± 0,5 puntos (24,58-30,93) y el DCF con la prima del mercado (32,60) quedan todos bajo el precio: el resultado no depende de un supuesto fino. El puente resta 383 M de deuda, suma 290 M de caja e inversiones y resta 240 M de iMerit (pagada en agosto, con una estimación de los pagos aplazados [P1]).',
  contexto: {
    movimiento: { fecha: '2026-10-19', var_1m_pct: 13.1, var_3m_pct: 45.4, var_6m_pct: 25.0, var_12m_pct: 0.2, dist_max_52s_pct: -8.3, dist_min_52s_pct: 57.7, dist_max_historico_pct: -23.2, tendencia: 'alcista', volatilidad_60d_pct: 46, avisos: ['P1 Subida fuerte: +45 % en tres meses'] },
    movimientos_fuertes: [
      { periodo: 'oct-2025', var_pct: -7.1, causa: 'Resultados del 3T25 (28-oct) con guía mantenida y temor a la competencia de servicios con IA: −7,1 % el 29-oct [D13, D9].', veredicto: 'no cambia', condicion: null },
      { periodo: 'feb-2026', var_pct: -18.7, causa: 'Venta del sector de servicios de información y procesos el 3-feb-2026 tras una nota de Gartner y el lanzamiento de una herramienta de agentes de Anthropic: −18,7 % en un día, sin noticia de la empresa; TransUnion cayó a la vez [D10, D11].', veredicto: 'no cambia', condicion: null },
      { periodo: 'may-jun-2026', var_pct: -13.8, causa: 'Tras el día del inversor (13-may, −8,6 %: sin objetivos numéricos a medio plazo) y con el sector castigado por la IA, mínimo de 52 semanas de 24,85 USD el 30-jun; caída máxima del −51,3 % desde febrero de 2025 [D1, D12].', veredicto: 'no cambia', condicion: null },
      { periodo: 'jul-oct-2026', var_pct: 45.4, causa: 'Resultados del 2T26 (28-jul): ingresos +15,6 %, datos e IA +30 % y guía subida a 2.390-2.415 M y 2,25-2,29 USD de BPA ajustado: +17,9 % el 29-jul y +40,8 % en el mes; subidas de objetivos (TD Cowen 45, Baird a sobreponderar) [A3, D6, D9].', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-10-27', tipo: 'resultados', hecho: 'Resultados del 3T26 el 27-oct-2026: la primera lectura tras la subida de guía; el consenso espera 0,56 USD de BPA ajustado y 615 M de ingresos (+16 %) [D2].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-02', tipo: 'directivos', hecho: 'Vivek Jetley, presidente de seguros, salud y ciencias de la vida (≈ 60 % de las ventas), se va el 26-oct-2026 para ser consejero delegado de Hexaware; sin sustituto anunciado [C4].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-02', tipo: 'directivos', hecho: 'Ventas de directivos por 3,13 M USD en 12 meses (2,34 M con planes 10b5-1; Vikas Bhalla 2,31 M) y ninguna compra [C3].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-18', tipo: 'ampliación o convertible', hecho: 'Nuevo crédito sindicado de 1.000 M USD hasta 2031 (préstamo de 400 M y revolving), que sustituye al anterior; deuda bruta de 381 M a 30-jun [A10].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-03', tipo: 'fusión u oferta', hecho: 'Cierre de la compra de iMerit (170 M al cierre y hasta 140 M en incentivos y pagos aplazados) [A11].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-26', tipo: 'recomendación', hecho: 'TD Cowen sube el objetivo a 45 USD; 9 analistas con compra y ninguno con venta; objetivo medio 45,13 USD [D2, D6].', veredicto: 'no cambia', condicion: null },
      { fecha: '2025-12-15', tipo: 'accionista de referencia', hecho: 'Recompra de 1,55 M de acciones a Orogen (ligada al consejero coordinador Vikram Pandit) por 63,4 M USD a 40,83 USD, fuera del programa [A12].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2026-10-27',
    veredicto: 'no cambia',
    condicion: null,
    comentario: 'La acción ha subido un 45 % en tres meses (aviso P1) tras caer un 51 % de febrero de 2025 a junio de 2026. La subida tiene causa en hechos de la empresa: el 2T26 batió, los datos e IA aceleraron al 30 % y la guía subió por segunda vez [A3]; es en buena parte la recuperación de la caída de febrero, que fue sectorial y sin noticia propia. No hay colocaciones, ampliaciones ni litigios con fecha que puedan mover el precio más de un 5 % en contra. Los resultados del 27-oct son un riesgo normal y no retrasan la decisión; la salida de Jetley se vigila. El veredicto no cambia: la señal la deciden la valoración y el riesgo de la IA, no el contexto.',
  },
  catalizadores: {
    items: [
      { fecha: '2026-10-27', evento: 'Resultados del 3T26', efecto: 'Crecimiento de datos e IA frente al 30 % del 2T26 y caída de las operaciones digitales; posible subida de la guía de 2026', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-10-26', evento: 'Salida de Vivek Jetley (seguros, salud y ciencias de la vida)', efecto: 'Riesgo de ejecución y de clientes en el 60 % de las ventas; sucesión sin anunciar', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Si la guía confirma un crecimiento de dos cifras, el mercado aceptará la tesis de la IA como motor', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Integración de iMerit', efecto: '≈ 70 M de ventas al año en datos para modelos de IA; resta 0,01 USD de BPA ajustado en 2026', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Continuo', evento: 'Nuevos lanzamientos de agentes de IA (Anthropic, OpenAI, aseguradoras con equipos propios)', efecto: 'Caídas sectoriales como la del 3-feb-2026 (−18,7 % en un día)', probabilidad: 'Alta', sentido: '−' },
      { fecha: 'Continuo', evento: 'Recompras (350 M disponibles del programa de 500 M)', efecto: '+1-2 % de BPA al año; más lentas desde el 2S26', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Sustitución por la IA generativa del trabajo de procesos por horas (operaciones digitales, 45 % de las ventas de 2025, ya −1,5 % en el 2T26)', tipo: 'Tecnología', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−35 a −55 % (bajista)', mitigante: 'Datos e IA (61 % de las ventas) crecen un 30 %; EXL incorpora agentes propios y vende por resultado; conoce los procesos y los datos de sus clientes [A13]', senal: 'Operaciones digitales cayendo más de un 5 % o datos e IA frenando por debajo del 15 %' },
      { riesgo: 'Concentración en seguros: el 39,8 % de las ventas viene de aseguradoras y el 25,6 % de salud; diez primeros clientes 34 %, tres primeros 17,8 % [A1]', tipo: 'Clientes', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −15 % si se pierde un cliente grande', mitigante: 'Contratos plurianuales y procesos críticos (siniestros, administración de pólizas) difíciles de cambiar; 590 clientes de más de 50.000 USD', senal: 'Caída de ingresos del segmento de seguros o salida de un cliente de los diez primeros; la salida de Jetley' },
      { riesgo: 'Rupia: el 31,1 % de los gastos son en rupias; un 10 % de apreciación sube los gastos 55,2 M USD y los ingresos 8,0 M [A1]', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −8 %', mitigante: 'Coberturas por 1.134,8 M USD a 42 meses; la guía supone 95 rupias por dólar y la rupia se ha depreciado (87,5 y 93 en guías anteriores) [A1, A3]', senal: 'Rupia por debajo de 88 por dólar' },
      { riesgo: 'Pagos en acciones altos (3,8-4,1 % de las ventas) que el BPA ajustado excluye', tipo: 'Calidad contable', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'El múltiplo «oficial» es un 20-25 % más bajo que el real', mitigante: 'Las recompras compensan la dilución; las acciones bajaron de 175 M a 162,5 M desde 2017', senal: 'Pagos en acciones por encima del 4,5 % de las ventas' },
      { riesgo: 'Precio: el valor intrínseco (26,16 USD) queda un 34 % bajo el precio tras subir un 45 % en tres meses', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % si el mercado deja de pagar el crecimiento', mitigante: 'PER de 20 veces frente a una mediana de 27,7; crecimiento del 13-15 %', senal: 'Resultados del 3T26 por debajo del consenso' },
      { riesgo: 'Compras y asignación del capital (iMerit 4,4 veces ventas; más compras anunciadas en el día del inversor)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Historial de compras sin deterioros (SCIO, Clairvoyant, ITI)', senal: 'Compra grande pagada con deuda o deterioro de iMerit' },
      { riesgo: 'Fiscal en la India (44,4 M USD reclamados sin provisión) y códigos laborales nuevos', tipo: 'Fiscal y regulatorio', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 a −2 %', mitigante: 'La empresa recurre y considera improbable perder [A1]', senal: 'Resolución adversa o provisión' },
      { riesgo: 'Gobierno: presidente y consejero delegado a la vez, recompra a Orogen y salida de Jetley', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Señal, no valor', mitigante: 'Consejo independiente salvo el consejero delegado; 95 % de apoyo a la remuneración [C2]', senal: 'Más operaciones con partes vinculadas' },
    ],
    premortem: 'Octubre de 2028: la acción ha perdido un 50 %. Los agentes de IA de los grandes laboratorios y de las propias aseguradoras automatizaron siniestros sencillos, atención y administración de pólizas; las operaciones digitales cayeron un 15 % al año en vez del 1-5 %. Los clientes de datos e IA, que habían contratado proyectos para probar la IA, pidieron precios por resultado y repartieron el ahorro: el crecimiento de esa parte bajó del 30 % al 8 %. La salida de Jetley costó un cliente grande de seguros. Con la rupia apreciándose y los pagos en acciones subiendo para retener talento de IA, el margen GAAP bajó al 15 %. El mercado volvió a valorar EXL como un BPO, a 12 veces el beneficio. La señal temprana: datos e IA frenando por debajo del 20 % en el 3T26 o el 4T26.',
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−35 a +15 % a 3-5 años',
      comentario: 'Es el riesgo central. EXL vende trabajo de procesos (siniestros, suscripción, atención, cobros, integridad de pagos) hecho por más de 65.000 personas, casi todas en la India y Filipinas; los agentes de IA generativa hacen ese trabajo más barato, y los clientes pueden comprarlos directamente (Anthropic, OpenAI, Microsoft) o a competidores. Las operaciones digitales (932 M USD, 45 % de las ventas de 2025) ya caen un 1,5 % en el 2T26 [A13]. A favor: EXL tiene los datos y los procesos de sus clientes, y vende la IA dentro de ellos; datos e IA (61 % de las ventas) crecen un 30 % y compró iMerit para entrenar modelos. Es probable que gane parte del trabajo de implantar la IA, pero con menos ingresos por cliente si cobra por resultado. El mercado lo duda: el 3-feb-2026 cayó un 18,7 % en un día por una herramienta de Anthropic [D10, D11]. Nuestro base ya incluye el freno (crecimiento del 4-10,5 % desde 2027e); el bajista lo agrava (−4 puntos al año y −1,5 de margen). Señales: operaciones digitales cayendo más de un 5 % o datos e IA por debajo del 15 %.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'IA', pregunta: '¿Qué parte de los ingresos de datos e IA son contratos por resultado y con qué margen frente a los contratos por persona y hora que sustituyen?', por_que: 'Decide si la IA es motor o canibalización: el escenario bajista vale −55 %.' },
      { tema: 'Operaciones digitales', pregunta: '¿Qué parte de la caída de las operaciones digitales es reclasificación hacia datos e IA y cuánto es pérdida real de volumen?', por_que: 'La dirección la llama «por diseño»; sin desglose, el crecimiento de datos e IA puede estar inflado.' },
      { tema: 'Seguros', pregunta: '¿Quién sustituye a Vivek Jetley y qué clientes grandes de seguros y salud dependían de él?', por_que: 'Seguros y salud son el 60 % de las ventas; los tres primeros clientes, el 17,8 %.' },
      { tema: 'Pagos en acciones', pregunta: '¿Por qué suben al 4,1 % de las ventas y cuál es el objetivo a medio plazo?', por_que: 'Son la diferencia entre el BPA ajustado (2,29) y el que paga el accionista (≈ 1,80).' },
      { tema: 'Rupia', pregunta: '¿Qué cobertura hay para 2027 y a qué tipo, y cómo cambia el margen con una rupia a 88?', por_que: 'El 31 % de los gastos son en rupias.' },
      { tema: 'Capital', pregunta: '¿Qué reparto entre compras y recompras se prevé para 2027 con el crédito de 1.000 M?', por_que: 'Más compras con IA a múltiplos altos bajan el ROIC.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. La regla a 12 meses da un objetivo de 49,28 USD (nuestro BPA con pagos en acciones de 2028e × el PER de la regla común), un +23,9 % ponderado y un +22,8 % en el caso base frente a un precio de 39,76 USD (cierre del 19-oct-2026). Pero el valor intrínseco (26,16 USD) queda un 34,2 % bajo el precio, y la regla exige que lo cubra: no es Comprar. El objetivo medio de los analistas (45,13) queda entre los dos. La razón: EXL es un negocio de calidad (ROIC del 28 %) que vuelve a crecer al 15 %, pero el precio ya descuenta un crecimiento del 16 % anual hasta 2033 o el margen sin pagos en acciones, y la IA generativa amenaza el 45 % de sus ventas. La convicción es media: las dos reglas del valor intrínseco (con nuestro WACC y con la prima del mercado) coinciden y el precio está lejos de los dos umbrales, pero la regla a 12 meses sí daría Comprar por rentabilidad. Subiría la convicción en el Mantener una guía de 2027 de dos cifras con margen GAAP al alza; la bajaría ver datos e IA por debajo del 15 %. Compraríamos por debajo de 26,16 USD.

**El negocio.** EXL hace para aseguradoras, sanidad y bancos de EE. UU. y Reino Unido trabajo de datos, analítica e IA (61 % de las ventas en el 2T26) y procesos externalizados (siniestros, pólizas, cobros, integridad de pagos), con más de 65.000 empleados, sobre todo en la India [A1, A13]. Seguros es el 39,8 % de las ventas y salud el 25,6 %; los diez primeros clientes, el 34 %. El ROIC es del 28,4 %, ≈ 18 puntos sobre el WACC: calidad «Sí». La sostenibilidad del crecimiento es «Sí»: proyectamos un 8,1 % anual, menos que el histórico (13,2 %), sin capital.

**Finanzas.** Ingresos de 2.088 M USD en 2025 (+13,6 %) y 1.165 M en el primer semestre de 2026 (+14,7 %); margen EBITDA GAAP del 17,9 % (21,7 % ajustado, sin los 79,5 M de pagos en acciones) [A1, A3]. Guía de 2026: 2.390-2.415 M y 2,25-2,29 USD de BPA ajustado. Deuda neta casi nula (381 M de deuda y 290 M de caja e inversiones en junio, más 170 M de iMerit en agosto) y flujo libre de 298 M en 2025, casi todo a recompras (329 M) [A2].

**Equipo y gobierno.** Rohit Kapoor, cofundador y consejero delegado desde 2008, ha batido la guía cuatro años seguidos [C9]. Debilidades: presidente y consejero delegado a la vez, la recompra a Orogen (ligada al consejero coordinador) y la salida de Vivek Jetley, responsable del 60 % de las ventas, el 26-oct [C4, A12].

**Valoración.** El DCF da 27,36 USD (−31 %) con un WACC del 10,46 %; el DCF inverso descuenta un crecimiento del 16 % anual o un margen del 24 %. Con la prima del mercado (4,2 %) vale 32,60 USD, aún un 18 % bajo el precio. La regla a 12 meses sube el PER de 20,1 a 22,1 veces (mediana de cinco años 27,7; tope de ×1,1); el bajista (17,7 veces sobre un BPA un 17 % menor) vale 32,39 USD.

**Riesgos y catalizadores.** El riesgo central es la IA (exposición alta): sustituye el trabajo por horas que EXL vende; las operaciones digitales ya caen un 1,5 %. Después, la concentración en seguros, la rupia (31 % de los gastos), los pagos en acciones y el precio tras subir un 45 % en tres meses. Catalizador: resultados del 3T26 el 27-oct-2026.

**Qué cambiaría la decisión.** Comprar por debajo de 26,16 USD; Mantener entre 26,16 y 54,75; vender por encima de 54,75. Una guía de 2027 de dos cifras con margen GAAP subiendo y operaciones digitales estables mejoraría el valor intrínseco; datos e IA frenando por debajo del 15 % lo empeoraría.`,
    tesis: 'EXL es la empresa de procesos externalizados que mejor ha girado hacia los datos y la IA: el 61 % de sus ventas ya viene de ahí y crece al 30 %, con un ROIC del 28 % y caja casi neta. Vende a aseguradoras y sanidad de EE. UU. trabajo crítico (siniestros, integridad de pagos) en el que conoce los datos y los procesos de sus clientes [A1, A13].\n\nEl precio descuenta mucho: un crecimiento del 16 % anual hasta 2033, o el margen sin pagos en acciones, según el DCF inverso; el valor intrínseco, con los pagos en acciones como coste y un WACC del 10,5 %, es de 26,16 USD. A la vez, el PER (20,1 veces) está por debajo de su historia (27,7) porque el mercado duda de que la IA deje en pie el trabajo por horas.\n\nPara invertir hay que creer que EXL gana la transición a la IA y crece a dos cifras durante años. Es posible, pero no es el caso base, y el precio no deja margen si falla.',
    vision_diferencial: {
      mercado_descuenta: 'Que EXL es ganadora de la IA y crece a dos cifras con margen ajustado del 21-22 %; los analistas esperan 45 USD (+13,5 %), todos con compra.',
      nuestra_vision: 'Compartimos el crecimiento de 2026 y casi el de 2027, pero no que dure: la IA abarata el trabajo que vende y lo pasa a contratos por resultado. Y contamos los pagos en acciones como coste: el BPA real es un 20 % menor que el ajustado.',
      por_que: 'Las operaciones digitales ya caen; el 30 % de crecimiento de datos e IA incluye reclasificaciones, y la caída del 3-feb-2026 mostró lo rápido que el mercado cambia de opinión.',
    },
    a_favor: [
      '**ROIC del 28 %**: ≈ 18 puntos sobre el WACC, con caja casi neta.',
      '**Datos e IA**: el 61 % de las ventas, creciendo un 30 % en el 2T26.',
      '**Guía cumplida**: cuatro años batiendo y subiendo la guía; 2026 subida dos veces.',
      '**PER bajo para su historia**: 20,1 veces frente a una mediana de 27,7.',
      '**Recompras**: 329 M USD en 2025 y 350 M disponibles.',
    ],
    en_contra: [
      '**Riesgo de IA**: el 45 % de las ventas es trabajo por horas que la IA puede sustituir.',
      '**Valor intrínseco bajo el precio**: 26,16 USD, −34 %.',
      '**Pagos en acciones**: 3,8-4,1 % de las ventas, fuera del BPA ajustado.',
      '**Concentración**: seguros 40 % y salud 26 %; tres clientes, el 17,8 %.',
      '**Rupia y salida de Jetley**: 31 % de los gastos en rupias; responsable del 60 % de las ventas se va.',
    ],
    que_vigilar: 'La tesis depende de que datos e IA sigan creciendo más del 15 % mientras las operaciones digitales caen despacio, y de que el margen GAAP suba. La señal en contra sería datos e IA por debajo del 15 % o una salida de cliente grande tras la marcha de Jetley.',
    cambiaria_recomendacion: [
      'Precio por debajo de 26,16 USD: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio entre 26,16 y 54,75 USD: Mantener.',
      'Guía de 2027 (febrero) por encima del 12 % con margen GAAP al alza: revisar el valor intrínseco al alza.',
      'Datos e IA por debajo del 15 % o pérdida de un cliente de los diez primeros: rebajar.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento de datos e IA', nivel_actual: '+30 % (2T26)', umbral_alerta: '< 15 %', por_que: 'El motor de la tesis.' },
      { kpi: 'Operaciones digitales', nivel_actual: '−1,5 % (2T26)', umbral_alerta: '< −5 %', por_que: 'Mide la sustitución por la IA.' },
      { kpi: 'Margen EBITDA GAAP', nivel_actual: '17,6 % (LTM)', umbral_alerta: '< 16,5 %', por_que: 'Con los pagos en acciones como coste.' },
      { kpi: 'Pagos en acciones / ventas', nivel_actual: '4,1 % (1S26)', umbral_alerta: '> 4,5 %', por_que: 'Diferencia entre el BPA ajustado y el real.' },
      { kpi: 'Rupias por dólar', nivel_actual: '≈ 95 (guía)', umbral_alerta: '< 88', por_que: '31 % de los gastos en rupias.' },
    ],
  },
};
