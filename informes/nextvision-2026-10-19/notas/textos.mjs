// Textos del analista (NextVision, corte 2026-10-19). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD (moneda funcional y de presentación de la empresa); la acción cotiza en la bolsa de Tel Aviv en agorot (ILA, centésimas de shekel). Precio: cierre del 19-oct-2026 (18.790 agorot = 187,90 ILS), pasado a USD con el tipo representativo del Banco de Israel de ese día (3,110 ILS/USD: 60,42 USD) [D3]; los precios en ILA que da el informe usan ese mismo tipo. Las cuentas oficiales se tomaron de los informes publicados en la web de inversores de la empresa (MAYA, el sistema de la Autoridad de Valores, devuelve 403): anuales auditados de 2021-2025 e intermedios del 1T26 y 1S26 [A1, A2, A3, A4, A5]. La serie de precios de Yahoo cambia de unidad el 18-may-2026 (ILS antes, agorot después) y se corrigió a mano; empieza en mayo de 2023, así que la historia del PER solo tiene tres años [D1]. Sin consenso trimestral ni de EBITDA (4 analistas). La acción se puede comprar desde Interactive Brokers en la propia bolsa de Tel Aviv (permiso de negociación «Israel», para no residentes) [D17]; también cotiza fuera de mercado en EE. UU. como NXSNF, con poca liquidez.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 9,6 % de 2025 es real y repetible en parte: NextVision es «empresa tecnológica preferente» (tipo del 12 % sobre el beneficio industrial, 7,5 % en zona de desarrollo) y en 2025 parte del ingreso financiero tributó con ventajas [A1]. En el 1S26 el tipo fue del 9,5 % [A4]. El DCF y el BPA usan un 13 %, por encima, por prudencia: el beneficio tecnológico preferente tiene límites de tamaño y la ley puede cambiar.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El flujo libre real de 2023-2025 (≈ 49 M USD de media) es de una empresa cuatro veces más pequeña: ventas de 52 a 168 M. En los 12 meses a junio de 2026 el flujo libre ya fue de ≈ 118 M USD con 250,7 M de ventas [A4], y el objetivo de 2026 es de 355 M. El salto viene del tamaño, no de supuestos de margen o de circulante más favorables: el DCF proyecta un margen EBITDA que baja del 58 % al 40 % y un circulante del 30-33 % de las ventas, como el real.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El BPA de 2025 (1,11 USD) ya se ha superado en los 12 meses a junio de 2026 (1,55) y el 1S26 dio 0,968 por sí solo [A4]. Medido desde el BPA de los últimos 12 meses (1,55 a junio de 2026), el base de 2028e (2,73) crece un 33 % anual durante 2,5 años, por debajo del crecimiento de ventas que la empresa ya tiene asegurado en 2026 (objetivo de 355 M frente a 168 M, +111 %) y del consenso (3,18 USD en 2027e) [D2]. El BPA de 2028e solo crece un 6 % sobre el de 2027e.' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'NextVision la fundaron en 2009 Chen Golan, Boris Kipnis y Yosef Sandler en Israel para hacer cámaras estabilizadas mucho más ligeras que las de la industria militar, pensadas para drones pequeños [A1]. Durante una década fue una empresa pequeña de ingeniería (4,5 M USD de ventas en 2019) que vendía a fabricantes de drones de todo el mundo [A11]. Salió a la bolsa de Tel Aviv en 2021 con 15 M de ventas [A3]. La guerra de Ucrania (2022) convirtió los drones pequeños en arma principal y las ventas se multiplicaron: 26 M en 2022, 52 M en 2023, 115 M en 2024 y 168 M en 2025, con márgenes operativos del 60 % [A1, A2]. En septiembre de 2025 colocó 9,5 M de acciones nuevas entre inversores globales (≈ 414 M USD) y en noviembre entró en el TA-35 [A10, D12]. 2026 trajo un objetivo de 355 M USD de ventas, un máximo en bolsa en marzo y, desde entonces, ventas de los fundadores y de Fidelity [C2, D7].',
      hitos: [
        { anio: '2009', hito: 'Fundación en Israel por Chen Golan, Boris Kipnis y Yosef Sandler.' },
        { anio: '2021', hito: 'Salida a la bolsa de Tel Aviv; ventas de 15 M USD [A3].' },
        { anio: '2022', hito: 'Guerra de Ucrania: los drones pequeños pasan a ser arma principal; ventas de 26 M USD (+73 %) [A3].' },
        { anio: '2024', hito: 'Ventas de 114,9 M USD (+121 %), por encima del objetivo de 110 M [A2, C4].' },
        { anio: '2025', hito: 'Ventas de 168,4 M USD; oferta global de ≈ 414 M USD a 146 ILS; entrada en el TA-35 [A1, A10, D12].' },
        { anio: '2026', hito: 'Objetivo de 355 M USD; máximo en bolsa (394 ILS) en marzo; ventas de los fundadores (enero y junio) y de Fidelity (octubre) [A9, C2, D7].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'La rentabilidad sobre el capital operativo es extraordinaria: el ROIC fue del 255 % en 2025 (470 % en 2024) frente a un WACC del 13,4 %, porque el negocio casi no necesita capital fijo (0,9 M USD de inmovilizado y 4,9 M de desarrollo capitalizado) y el capital invertido es sobre todo circulante [A1]. El ROE (27,5 % en 2025) es mucho menor porque el patrimonio es casi todo caja de la ampliación de 2025 (562 M) que rinde un 4 % [A1]. La pregunta no es si gana mucho sobre el capital, sino cuánto dura: el margen bruto ya bajó del 72 % al 65 % y el ROIC depende de un margen operativo del 60 % que la competencia puede recortar [A4, B8]. Aun con un margen EBITDA del 40 % en 2033e el ROIC seguiría muy por encima del WACC.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material es el uso final de sus productos: cámaras para drones militares y municiones merodeadoras, que muchos fondos con criterios ESG excluyen o limitan (armamento) [A1]. También el control de exportaciones (licencias del Ministerio de Defensa de Israel y de doble uso), la cadena de suministro de sensores térmicos y placas (un proveedor es el 58 % de las compras) y la seguridad de las instalaciones en Israel en tiempo de guerra [A1].',
      controversias: 'Sin controversias propias conocidas (litigios, sanciones o incidentes) [A1]. El riesgo reputacional es sectorial: venta de material militar desde Israel a terceros países, con boicots de algunos gobiernos y fondos europeos al comercio de defensa con Israel. Calificaciones de MSCI o Sustainalytics no comprobadas: no se dan.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+110,9 %, fijo): objetivo del consejo de 355 M USD con 155,5 M ya facturados en el 1S26 y una cartera de 265,2 M en agosto [A4, A7, A9]; el consenso espera 368 M [D2]. Después, +38 % en 2027e (490 M: por debajo del consenso de 561 M [D2], porque la cartera bajó en el 2T26 y solo 35,5 M estaban asignados a 2027 en marzo [A8]), +15 % en 2028e y bajada hasta el 4 % en 2033e. El mercado de cámaras para drones crecerá un 17,6 % anual según Fortune Business Insights y un 29 % según Straits [B2, B3]; el de drones pequeños, un 25 % [B4]. El ciclo de defensa está en máximos y NextVision está al final de la cadena: suponemos que no repite el crecimiento del mercado.',
    margenes: 'Margen EBITDA del 58 % en 2026e (58,7 % en el 1S26 [A4]), bajando al 54 % en 2027e, 50 % en 2028e y 40 % en 2033e. El margen bruto pasó del 72 % de 2024 al ≈ 65 % del 2T26 por descuentos a los grandes clientes y mezcla [A4, B8]; con más competidores y clientes más grandes (tres son dos tercios de las ventas), el precio por cámara bajará. Un 40 % sigue muy por encima de los comparables (10-25 % [D2]): es una empresa de diseño con fabricación subcontratada y estructura pequeña.',
    inversion: 'Capex del 2,0 % de las ventas (1,7 % de inmovilizado y desarrollo en 2025, más ≈ 0,3 % de altas de derechos de uso por la nave nueva y la planta europea, NIIF 16) y amortización del 1,2 % [A1]. Circulante comercial del 33 % de las ventas en 2026e (33,9 % en 2025 y 35,9 % en junio de 2026) que baja al 30 % cuando se normalice la compra anticipada de componentes [A4]: crecer consume caja, ≈ 30 céntimos por cada dólar de ventas nuevas.',
    wacc: 'Tasa libre del 5,09 % (bono del Tesoro de EE. UU. a 10 años, 16-oct-2026 [D4]): los flujos están en USD. Beta de 1,15, la ajustada mensual frente al TA-125 con 41 meses (1,23 sin ajustar; 1,45 semanal de 2 años) [D1]. Prima de mercado del 5,5 % y prima adicional de 2 puntos: ≈ 1 por riesgo país (fabrica y diseña en Israel, en guerra desde 2023, con una calificación rebajada) y ≈ 1 por concentración en un producto y en tres clientes. Sin deuda. WACC del 13,4 %; con la prima implícita del mercado (4,2 % [D5]) baja al 11,9 %.',
    terminal: 'Crecimiento a perpetuidad del 3,0 %, entre la inflación esperada en USD (≈ 2,5 %) y la tasa libre menos dos puntos: el gasto en drones seguirá creciendo, pero la empresa vende un componente que se abarata. El valor terminal pesa el 49 % del valor, poco para una empresa de crecimiento, porque los primeros años generan mucha caja.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: capacidad de 2.000-2.400 cámaras al mes que pasa a más de 4.000 a final de año; precio −4 % por descuentos de volumen (margen bruto del 65 % en el 2T26) [A4, A7].',
    '2027e': 'Volumen +41 % con la capacidad nueva y la cartera (24 M de un pedido para enero-junio de 2027) [D10]; precio −3 % por competencia.',
    '2028e': 'Volumen +18 % con el rearme europeo y los programas de drones de EE. UU.; precio −3 % [B1].',
    '2029e': 'Volumen +12 %, por debajo del mercado (+17,6 % [B2]); precio −2 %.',
    '2030e': 'Volumen +9 %; precio −2 %: la cámara se convierte en componente con más competidores.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (24,5 % anual de media en 2026e-2033e, casi todo en 2026-2027) está por debajo del histórico (83 % anual de 2021 a 2025) y del mercado de cámaras para drones (17,6 % anual después de 2027) [B2], y no necesita capital fijo: la reinversión es circulante y el ROIC del 255 % lo financia de sobra. La cuota pasa del 1,3 % al 1,7 % del mercado amplio (×1,3), dentro del límite. 2026e está cubierto por el 1S26 real y la cartera [A4]. El riesgo no está en la capacidad de la empresa para crecer sino en la demanda: un alto el fuego en Ucrania o una caída del ciclo de defensa frenarían los pedidos; eso está en el bajista.',
  dcf_lectura: 'El DCF da 27,98 USD por acción, un 54 % por debajo del precio (60,42 USD), con un WACC del 13,4 % y un valor terminal que pesa el 49 %. El DCF inverso dice que el precio descuenta un crecimiento del 35,9 % anual en 2027e-2033e con nuestro margen final del 40 % (nuestro base: 12,1 %), y ningún margen hasta el 70 % justifica el precio con nuestro crecimiento: el mercado espera que NextVision siga creciendo como una empresa de drones en plena expansión durante siete años más y conserve márgenes de monopolio. La rentabilidad implícita en el precio, con nuestros flujos, es del 7,1 % anual frente al 13,4 % que pedimos. Con la prima de riesgo que hoy pide el mercado (4,2 %) el DCF sube a 38,36 USD, aún un 37 % bajo el precio. El precio solo cuadra con el consenso de 2027 (561 M USD de ventas) y márgenes que no bajen.',
  narrativas: {
    Bajista: 'Alto el fuego en Ucrania o saturación de inventarios en los fabricantes de drones europeos en 2027, pérdida de uno de los tres grandes clientes (son dos tercios de las ventas) o un veto a la exportación: las ventas solo suben un 8 % en 2027e y un 3 % en 2028e, el margen EBITDA cae 8 puntos por precio y el WACC sube un punto.',
    Base: 'Se cumple el objetivo de 355 M USD en 2026, las ventas crecen un 38 % en 2027 con la capacidad nueva y luego se frenan hacia el 4 %; el margen EBITDA baja del 58 % al 40 % con más competencia.',
    Alcista: 'El consenso acierta: 2027 con ≈ 540 M USD de ventas (+53 %) por el rearme de la OTAN y los programas de drones de EE. UU., y un margen 4 puntos mejor por escala y planta europea.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio: el alcista vale 35,07 USD (−42 %) y el bajista 17,06 (−72 %). Con un WACC del 13,4 %, ni el consenso justifica 60 USD a largo plazo. Por la regla a 12 meses el cuadro es más equilibrado (bajista 17,20, base 60,61 y alcista 90,99 USD), porque esa regla usa el múltiplo del mercado y no el descuento de flujos.',
  casos_12m: {
    Bajista: 'Ventas de 395 M USD en 2028e (pedidos frenados en 2027) y margen EBITDA del 42 %: BPA de 1,67 USD, y el PER vuelve al mínimo de la historia (10,3 veces, el de finales de 2023, cuando la empresa era pequeña y desconocida).',
    Base: 'Ventas de 563 M USD en 2028e y margen EBITDA del 50 %, ingreso financiero de 28 M, impuesto del 13 % y 96,5 M de acciones: BPA de 2,73 USD (2,58 en 2027e).',
    Alcista: 'Ventas de 652 M USD en 2028e y margen del 54 %: BPA de 3,37 USD; la regla no da más de 27 veces (la mediana de los comparables).',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (2,06 USD) está un 5 % por debajo del consenso (2,18) porque usamos el objetivo de la empresa (355 M) y no los 368 M de los analistas [D2]. La diferencia grande está en 2027e: 2,58 USD frente a 3,18 (−19 %), con ventas de 490 M frente a 561 M y un margen EBITDA del 54 % frente al ≈ 58 % implícito. Nuestro 2027e queda casi en el mínimo de los tres analistas (2,55) [D2]. Motivos: la cartera bajó en el 2T26 (de 288 a 265 M), solo 35,5 M estaban asignados a 2027 en marzo y el margen bruto ya cae [A4, A8]. El objetivo medio de los 4 analistas (124,37 USD) dobla el precio; nuestro base a 12 meses (60,61) es la mitad.',
  objetivo_comentario: 'El objetivo a 12 meses es de 57,35 USD (17.836 agorot), ponderado 25/50/25: rentabilidad del −4,1 % con dividendo, y del +1,2 % en el caso base (60,61 USD = 22,2 veces nuestro BPA de 2028e de 2,73). La regla v3 lleva el PER del 24,4 actual (sobre el BPA de los próximos 12 meses) hacia la mediana adelantada de tres años (15,0) con el tope de ×1,1; el bajista usa el mínimo de la historia (10,3) y el alcista la mediana de los comparables (27,0). Crecimiento del BPA base: +33 % anual desde el BPA de los últimos 12 meses (1,55) y +35 % desde el de 2025 (1,11): está ya en el 1S26 real (0,968) y en el objetivo de 2026 [A4]. Para comprar haría falta un precio de 35,47 USD o menos (≈ 110 ILS): es el valor intrínseco, que es el requisito que más aprieta. Para vender (ponderada ≤ −10 %), uno por encima de ≈ 64 USD (≈ 200 ILS).',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF manda porque es el único método que ve que los márgenes del 60 % y el crecimiento del 100 % no duran; los comparables (EV/EBITDA de 38-64 USD y PER de 69-105 USD por acción) dan mucho más porque aplican múltiplos de empresas con un 10-25 % de margen a un beneficio de máximo de ciclo [D2]. El valor objetivo es de 35,47 USD (−41 %). Sin transacciones útiles. El puente suma 591 M USD de caja neta de arrendamientos (6,3 USD por acción) [A4].',
  catalizadores: {
    items: [
      { fecha: '2026-11-10', evento: 'Resultados del 3T26 (fecha estimada)', efecto: 'Ritmo hacia el objetivo de 355 M USD (hacen falta ≈ 200 M en el 2S), margen bruto y cartera', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-12', evento: 'Aprobación regulatoria del pedido de 24 M USD para 2027', efecto: 'Primer bloque grande de ventas de 2027', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-01', evento: 'Objetivo de ingresos de 2027 del consejo', efecto: 'El consenso espera 561 M USD; un objetivo por debajo de 450 M lo rebajaría', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-03', evento: 'Resultados de 2026 y dividendo (≈ 50 % del beneficio)', efecto: 'Dividendo de ≈ 1 USD por acción', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Negociaciones de alto el fuego en Ucrania', efecto: 'Frenaría los pedidos de los fabricantes de drones europeos (58 % de las ventas)', probabilidad: 'Media', sentido: '−' },
      { fecha: 'Sin fecha', evento: 'Nuevas ventas de fundadores (bloqueo vencido) o del resto de Fidelity (≈ 4 %)', efecto: 'Presión vendedora', probabilidad: 'Media', sentido: '−' },
      { fecha: 'Sin fecha', evento: 'Uso de la caja (591 M USD): compra de empresas o recompra', efecto: 'Una recompra sería la primera señal de confianza de la dirección', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Ciclo de defensa: la demanda depende de la guerra de Ucrania y del rearme europeo (58 % de las ventas en Europa)', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 a −70 %', mitigante: 'Programas de drones de EE. UU. y rearme de la OTAN a varios años [B1]', senal: 'Cartera de pedidos bajando dos trimestres seguidos; alto el fuego' },
      { riesgo: 'Concentración de clientes: tres clientes son el 66 % de las ventas del 1S26, sin contratos largos', tipo: 'Clientes', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −30 % por cliente perdido', mitigante: 'La cámara va integrada en el dron (coste de cambio); 150 clientes activos [A1, A4]', senal: 'Peso del primer cliente por encima del 30 % o caída de ventas de uno de ellos' },
      { riesgo: 'Permisos de exportación israelíes (DECA y doble uso) y vetos europeos a proveedores israelíes', tipo: 'Regulación', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−20 % si se bloquea un país grande', mitigante: 'Nunca le han denegado una licencia; planta europea en marcha [A1, A7]', senal: 'Retraso en la aprobación del pedido de 24 M o restricciones de algún país de la UE' },
      { riesgo: 'Competencia y precio: más fabricantes y clientes que integran su propia cámara', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−15 a −25 %', mitigante: 'Ventaja de peso y tamaño, integración «plug and play» [B1]', senal: 'Margen bruto por debajo del 65 %' },
      { riesgo: 'Ventas de los fundadores y de institucionales (overhang)', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 a −20 % de presión', mitigante: 'Ninguno: no hay recompras ni compras de directivos', senal: 'Nuevas colocaciones o ventas fuera de bolsa' },
      { riesgo: 'Guerra en Israel: la producción y el diseño están en Israel', tipo: 'País', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Planta europea y proveedores fuera de Israel [A7]', senal: 'Interrupción de la producción o llamada a filas de empleados' },
      { riesgo: 'Proveedores: un proveedor de placas es el 58 % de las compras; sensores térmicos con licencia de origen', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Existencias de seguridad (72 M USD) [A4]', senal: 'Retrasos de entrega o subida de existencias sin ventas' },
      { riesgo: 'Riesgo de IA (visión por computador que abarata la cámara, fabricantes que integran sensores baratos con software)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '±10 % a 3-5 años', mitigante: 'NextVision ya integra IA a bordo (ordenador TRIP, seguimiento y navegación sin GPS) [A1]', senal: 'Competidores con cámaras más baratas y software equivalente' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido otro 50 %. En la primavera se firmó un alto el fuego en Ucrania y los fabricantes de drones europeos, con almacenes llenos, dejaron de pedir cámaras durante dos trimestres; el cliente A (27 % de las ventas) empezó a montar una cámara propia más barata. El objetivo de 2027 se dio en 420 M USD, la cartera bajó por tercer trimestre y el margen bruto cayó al 58 %. Los fundadores habían vendido otra vez tras el bloqueo y la caja de 600 M se usó en una compra cara en EE. UU. El mercado pasó de pagar 25 veces un beneficio de ciclo a pagar 10.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '±10 % a 3-5 años',
      comentario: 'La IA es a la vez el producto y la amenaza. A favor: los drones autónomos necesitan una cámara estabilizada y un ordenador que procese el vídeo a bordo (seguimiento de objetivos, navegación sin GPS, guerra electrónica), y NextVision vende ambos (TRIP) [A1]. En contra: la IA de visión hace que sensores más baratos y sin estabilizar mecánica den imágenes aceptables, y que los fabricantes de drones con buen software puedan integrar su propia cámara; eso presiona el precio por unidad, que ya se ve en el margen bruto [A4]. No sustituye el negocio a 3-5 años, pero puede recortar el margen del 60 % hacia el de la electrónica de defensa normal.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Cartera', pregunta: '¿Por qué bajó la cartera de 288 a 265 M USD en el 2T26 y qué parte de los 265 M es para 2027?', por_que: 'Es el dato que separa el caso base del consenso (490 frente a 561 M de ventas en 2027).' },
      { tema: 'Margen', pregunta: '¿Cuánto del paso del 72 % al 65 % de margen bruto es mezcla y cuánto precio a los grandes clientes?', por_que: 'Si es precio, el margen seguirá bajando con la concentración.' },
      { tema: 'Clientes', pregunta: '¿Quiénes son los clientes A, B y C, qué plataformas montan y tienen alternativa de cámara?', por_que: 'Son el 66 % de las ventas del 1S26.' },
      { tema: 'Caja', pregunta: '¿Qué hará la empresa con los 591 M USD de caja y por qué no recompra con la acción un 52 % bajo el máximo?', por_que: 'Es el 10 % de la capitalización y hoy rinde un 4 %.' },
      { tema: 'Fundadores', pregunta: '¿Van a seguir vendiendo los fundadores tras el bloqueo y con qué plan?', por_que: 'Han vendido ≈ 326 M USD en 2026; es la causa del veredicto «descarta».' },
      { tema: 'Exportación', pregunta: '¿Qué ventas dependen de países que han restringido el comercio de defensa con Israel?', por_que: 'Riesgo de permisos y de vetos europeos.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: 'La regla a 12 meses da Mantener (ponderada −4,1 %, base +1,2 %). Además, el valor intrínseco (35,47 USD) está un 41 % por debajo del precio y la regla 13 da «descarta» por las ventas en serie de los fundadores: no se compra; quien ya la tenga no está obligado a vender por la regla.', horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media: no es una compra. La convicción es media porque la regla a 12 meses y la del valor intrínseco no piden comprar y la ponderada (−4,1 %) queda lejos de los umbrales de compra (+15 %) y de venta (−10 %); la subiría un 3T26 con cartera al alza y margen bruto del 70 %, y la bajaría que el precio se acerque a 64 USD o que la cartera siga bajando. El objetivo a 12 meses es de 57,35 USD (17.836 agorot; nuestro BPA de 2028e de 2,73 USD × el PER de la regla común), un −4,1 % de rentabilidad ponderada con dividendo y un +1,2 % en el caso base, frente a un precio de 60,42 USD (187,90 ILS, cierre del 19-oct-2026 en Tel Aviv). El valor intrínseco es de 35,47 USD (−41 %). Para comprar haría falta 35,47 USD o menos (≈ 110 ILS); para vender, más de ≈ 64 USD (≈ 200 ILS). La regla 13 da «descarta»: los fundadores han vendido en serie en 2026 [C2, C3].

**El negocio.** NextVision diseña en Israel cámaras de día y noche muy ligeras y estabilizadas para drones pequeños y municiones merodeadoras, y las vende a los fabricantes de drones [A1]. Ventas de 168 M USD en 2025 y 251 M en los 12 meses a junio de 2026, con un margen operativo del 60 % y casi sin capital: ROIC del 255 % frente a un WACC del 13,4 % [A1, A4]. El crecimiento sale de la guerra de Ucrania y del rearme europeo (58 % de las ventas en Europa); tres clientes son dos tercios de las ventas [A4].

**Finanzas.** Ventas ×11 de 2021 a 2025 y objetivo de 355 M USD en 2026 (155,5 M en el 1S26) [A4, A9]. Caja neta de 591 M USD (10 % de la capitalización), sin deuda; reparte la mitad del beneficio [A4]. Puntos débiles: el circulante (36 % de las ventas) crece más que las ventas, el margen bruto bajó del 72 % al 65 % y la cartera bajó en el 2T26 [A4].

**Equipo y gobierno.** Han cumplido sus objetivos tres años seguidos [C4]. Pero cobran un bonus del 2,5 % del beneficio antes de impuestos cada uno y, en 2026, los fundadores (presidente, consejero delegado, director técnico y dos consejeros) vendieron ≈ 326 M USD en dos tandas sin otro motivo que monetizar, y Fidelity salió del 5,5 % en octubre [C1, C2, C7].

**Valoración.** El DCF da 27,98 USD y el DCF inverso dice que el precio descuenta un 36 % de crecimiento anual hasta 2033 con nuestro margen: el mercado sigue pagando un beneficio de máximo de ciclo como si fuera permanente. La regla a 12 meses es más benévola (base +1,2 %) porque parte del PER del mercado. El consenso (3,18 USD de BPA en 2027) está un 19 % por encima de nuestro 2,58 [D2].

**Riesgos y catalizadores.** El mayor riesgo es el ciclo: un alto el fuego en Ucrania o la saturación de los fabricantes de drones europeos. Después, la concentración de clientes, los permisos de exportación israelíes, la competencia en precio, las ventas de fundadores y el riesgo de IA (±10 %: es parte del producto y abarata la competencia). Catalizador cercano: resultados del 3T26 (≈ 10-nov).

**Qué cambiaría la decisión.** Un precio por debajo de 35,47 USD con los fundadores sin vender seis meses, o un objetivo de 2027 por encima de 550 M USD con margen bruto del 70 % (subiría el valor intrínseco). Una cartera que siga bajando o un margen bruto por debajo del 63 % llevarían a Vender.`,
    tesis: 'NextVision es un negocio excelente en un momento excelente: un líder de nicho que gana un 60 % de margen operativo vendiendo cámaras para drones en plena guerra de drones. El problema es el precio y quién vende: el mercado paga ≈ 24 veces un beneficio de máximo de ciclo, con tres clientes que son dos tercios de las ventas, márgenes que ya bajan y fundadores que venden en serie.',
    vision_diferencial: {
      mercado_descuenta: 'Que las ventas crecen un 50 % en 2027 (561 M USD), que el margen se mantiene y que el ciclo de drones dura; los 4 analistas esperan ≈ 124 USD, el doble del precio.',
      nuestra_vision: 'El crecimiento de 2026 está asegurado, pero 2027 es más incierto (cartera a la baja, solo 35,5 M asignados en marzo) y el margen bajará con la competencia y la concentración. Con un descuento del 13,4 % el negocio vale ≈ 28-35 USD.',
      por_que: 'Los productos de defensa con márgenes del 60 % atraen competencia, y NextVision está al final de la cadena: cuando los fabricantes de drones se frenan, los pedidos de cámaras se frenan antes. Quienes mejor conocen la empresa están vendiendo.',
    },
    a_favor: [
      '**Margen y ROIC excepcionales**: margen operativo del 60 % y ROIC del 255 %.',
      '**Crecimiento asegurado en 2026**: 155,5 M en el 1S26 y objetivo de 355 M (+111 %).',
      '**Caja neta de 591 M USD**: 10 % de la capitalización, sin deuda.',
      '**Equipo que cumple**: objetivos superados en 2024 y 2025.',
      '**Ya ha caído un 52 %** desde el máximo de marzo de 2026.',
    ],
    en_contra: [
      '**Valor intrínseco de 35,47 USD**: un 41 % por debajo del precio con un WACC del 13,4 %.',
      '**Ciclo de defensa**: 58 % de las ventas en Europa ligadas a Ucrania y al rearme.',
      '**Concentración**: tres clientes son el 66 % de las ventas; un proveedor el 58 % de las compras.',
      '**Fundadores vendedores**: ≈ 326 M USD vendidos en 2026, sin compras ni recompras.',
      '**Margen bruto y cartera a la baja** en el 2T26.',
    ],
    que_vigilar: 'La tesis del mercado depende de que 2027 crezca un 50 % con margen estable. Las señales en contra serían una cartera que siga bajando en el 3T26, un margen bruto por debajo del 65 %, un objetivo de 2027 por debajo de 450 M USD o nuevas ventas de los fundadores.',
    cambiaria_recomendacion: [
      'Precio por debajo de 35,47 USD (≈ 110 ILS) y seis meses sin ventas de fundadores: Comprar.',
      'Precio por encima de ≈ 64 USD (≈ 200 ILS): Vender.',
      'Objetivo de 2027 por encima de 550 M USD con margen bruto ≥ 70 %: revisar al alza.',
      'Cartera por debajo de 230 M USD o margen bruto por debajo del 63 %: Vender.',
      'Recompra de acciones o compra de directivos: quita el «descarta» de la regla 13.',
    ],
    kpis_seguimiento: [
      { kpi: 'Cartera de pedidos', nivel_actual: '265,2 M USD (9-ago-2026)', umbral_alerta: '< 230 M', por_que: 'Adelanta las ventas de 2027.' },
      { kpi: 'Margen bruto', nivel_actual: '≈ 65 % (2T26)', umbral_alerta: '< 63 %', por_que: 'Mide el precio frente a la competencia.' },
      { kpi: 'Peso del primer cliente', nivel_actual: '26,7 % (1S26)', umbral_alerta: '> 30 %', por_que: 'Concentración.' },
      { kpi: 'Ventas trimestrales', nivel_actual: '88,2 M USD (2T26)', umbral_alerta: '< 90 M en el 3T26', por_que: 'El objetivo de 355 M exige ≈ 100 M por trimestre en el 2S.' },
      { kpi: 'Ventas de fundadores y directivos', nivel_actual: '≈ 326 M USD en 2026', umbral_alerta: 'Cualquier venta nueva', por_que: 'Regla 13.' },
    ],
  },
};
