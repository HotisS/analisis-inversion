// Textos del analista (Viper Energy, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio natural. Último ejercicio real: 2025; LTM a 30-jun-2026 (el 3T26 se publica el 2-nov-2026 [D11]). ESTRUCTURA: Viper es una «Up-C»: el público tiene acciones A de Viper Energy, Inc.; Diamondback y los antiguos socios de Sitio tienen OpCo Units emparejadas con acciones B (sin derecho económico), canjeables 1 a 1 por acciones A [A4, D7]. Todo el informe valora la UNIDAD ECONÓMICA: 369,7 M de unidades (A + B + la opción de TWR IV), flujos de OpCo con impuesto completo y minoritarios del puente = 0; el BPA de la cuenta histórica y los ratios por acción del motor usan solo las acciones A (142,5 M de media en 2025) y no son comparables con los nuestros. Cuentas de 2023-2025 del XBRL de la sociedad nueva (CIK 2074176, tras la compra de Sitio) y de 2020-2024 de la anterior (CIK 1602065) [A8]. Precio: cierre del 20-oct-2026 (45,85 USD); la sesión del 21-oct estaba abierta (46,06 USD a media sesión [D1]). El petróleo de 2026-2027 está en precios de guerra (WTI ≈ 98 USD el 21-oct, cierre de Ormuz desde febrero [B9, D14]): el BPA de 2028e usa la curva de futuros [D4]. No hay ficha sectorial de petróleo y regalías en el repositorio: el encargo limitaba la escritura a la carpeta del informe; el sector está en la nota B.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'En 2023 el tipo del 8,4 % se debe a que la parte de OpCo de Diamondback no tributa en Viper (minoritarios no gravados: −63 M) y a la liberación parcial de la provisión de activos fiscales (−7 M) [A3]. El DCF usa el 28 % sobre todos los flujos de OpCo (unidad económica), no este tipo.' },
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'En 2024 hubo un ingreso fiscal de 99,7 M por la liberación del resto de la provisión sobre activos fiscales diferidos (155,9 M) en el 4T24 [A3]: no recurrente. El DCF usa el 28 %.' },
    { control: 'Circulante del primer año de proyección ≈ último real', explicacion: 'El 25,1 % de 2025 está inflado porque los cobros pendientes de diciembre ya incluyen Sitio entera (350 M) mientras los ingresos de 2025 solo la recogen desde agosto. A 30-jun-2026 los cobros pendientes eran 488 M (461 + 27 de Diamondback) [A4], un 19,3 % de los ingresos de 2026e: usamos el 19,5 %.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El salto es real y se explica por volumen y precio: la producción pasa de 95 kboe/d en 2025 a 134 kboe/d en 2026 (1979 Royalties desde mayo de 2025, Sitio desde agosto de 2025, Riverbend desde julio de 2026) y el WTI de 65 a ≈ 88 USD [A5, B2]. El flujo libre de los 12 meses a junio de 2026 ya fue de 1.495 M [A5]. Además, la media histórica resta las compras como inversión y el DCF no las proyecta hasta 2030 (son decisiones de crecimiento, pagadas sobre todo con acciones).' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  rentabilidad: {
    comentario: 'Viper tiene márgenes de regalía (EBITDA ≈ 91 % de los ingresos) pero no un ROIC alto, porque su capital es el precio que pagó por los derechos. El ROIC bajó del 12-23 % de 2021-2024 al 5,4 % de 2025: el capital invertido pasó de 4.439 M a 8.750 M con 1979 Royalties y Sitio, compradas a valor de mercado y pagadas con acciones, y el petróleo bajó a 63 USD [A1]. Con el petróleo de guerra de 2026 (≈ 88 USD) el resultado operativo después de impuestos sería ≈ 1.100 M sobre ≈ 12.000 M de capital: ≈ 9 %, todavía por debajo del WACC del 9,77 %. ROIC − WACC ≈ −4 puntos con lo publicado y ≈ −1 con el petróleo de 2026: no crea valor sobre el capital invertido. El ROIC incremental histórico es del 1,9 %: las compras rinden a sus vendedores, no al comprador. Lo que crea valor en una regalía es que el operador pague la perforación; eso ya está en el precio de compra.',
    confianza: 'Media',
  },
  secciones: {
    historia: {
      resumen: 'Diamondback Energy creó Viper en 2014 para separar sus derechos mineros en la cuenca de Midland y la sacó a bolsa en junio de 2014 como sociedad comanditaria (Viper Energy Partners LP) [A2]. En 2018 pasó a tributar como sociedad y adoptó la estructura «Up-C», y en noviembre de 2023 se convirtió en Viper Energy, Inc. [A3]. Desde 2023 creció comprando: GRP Energy Capital (905 M), TWR IV (2024), 1979 Royalties a Diamondback-Endeavor (4.450 M, mayo de 2025) y Sitio Royalties (4.000 M en acciones, agosto de 2025), que la llevó a una sociedad matriz nueva [A1]. En 2026 vendió los activos fuera del Pérmico (617 M), Diamondback, EnCap y Oaktree colocaron 17,4 M de acciones a 45,90 USD, compró Riverbend (505 M) y recibió de Diamondback 933 acres netos a cambio de OpCo Units [A1, A4, C4, A10].',
      hitos: [
        { anio: '2014', hito: 'Diamondback crea Viper y la saca a bolsa como sociedad comanditaria (Nasdaq: VNOM).' },
        { anio: '2018', hito: 'Pasa a tributar como sociedad con estructura «Up-C» (acciones A y B, OpCo Units).' },
        { anio: '2023', hito: 'Compra GRP Energy Capital (905 M USD) y se convierte en Viper Energy, Inc. [A3].' },
        { anio: '2025', hito: 'Compra 1979 Royalties a Diamondback-Endeavor (4.450 M) y Sitio Royalties (4.000 M en acciones); deterioro de techo de 768 M [A1].' },
        { anio: '2026', hito: 'Venta de lo no pérmico (617 M), colocación de Diamondback a 45,90 USD, compra de Riverbend (505 M) y dividendo base de 2,00 USD [A1, A5, C4].' },
      ],
      confianza: 'Alta',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Viper no opera pozos: los riesgos físicos (emisiones de metano y quema de gas, agua producida e inyección, sismicidad inducida en el Pérmico, permisos en tierras federales de Nuevo México) son de sus operadores, sobre todo Diamondback, y le llegan como menor producción o mayores costes de los operadores [A1]. Lo material para Viper es el gobierno: una empresa controlada por su mayor operador, sin empleados propios y gestionada por directivos de Diamondback [C2]. A largo plazo, la transición energética es el riesgo de fondo: una regalía de petróleo vale lo que valga el petróleo de las próximas dos décadas.',
      controversias: 'Sin controversias propias relevantes en 12 meses. El voto consultivo de remuneración de 2025 fue del 79,4 %, bajo para una empresa en la que Diamondback vota ≈ 39 % [C1]. Las operaciones con Diamondback (compras de derechos pagadas con OpCo Units, contrato de servicios) son operaciones vinculadas aprobadas por un comité de consejeros independientes [C2, A10]. Calificaciones de MSCI o Sustainalytics no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Los ingresos son volumen × precio. 2026e (+80,9 %, fijo): 1T 511 M + 2T 677 M reales [A5, A6] + 3T ≈ 637 M (68 kbo/d × 87,30 USD, el precio realizado del 3T26 de Diamondback [B5]) + 4T ≈ 698 M (69 kbo/d con la curva de futuros). Volumen: guía de 66.000-67.250 bo/d para 2026 [D13]; después ≈ +2 % en 2027 (compra de septiembre a Diamondback, 1.798 pozos brutos en desarrollo y 1.589 «a la vista» [P2]) y plano a ligeramente negativo desde 2030. Precio: la CURVA DE FUTUROS del WTI del 21-oct-2026 [D4] (realizado ≈ 88 USD en 2026 y 2027, 77 en 2028, 71 en 2029, 69 en 2030, +2 % al año después), no un solo precio: el bajista y el alcista llevan sus propias curvas. La EIA da 88 USD en 2026 y 80 en 2027 [B2]. Gas casi sin valor (Waha a 0,05 USD/Mcf en el 2T26 [P2]).',
    margenes: 'Margen EBITDA del 92 % en 2026e (91-93 % real con impuestos de producción del ≈ 7 % y gastos generales de 0,70-0,90 USD/boe [D13]), bajando al 90,5 % cuando el petróleo vuelve a 69-71 USD porque los gastos fijos pesan más. No hay costes de perforación: los paga el operador.',
    inversion: 'Una regalía no invierte en pozos. El «capex» del DCF son compras de derechos para sostener el volumen: cero hasta 2029 (el inventario de los operadores lo sostiene: 106 equipos en sus tierras, 12 de Diamondback [P2]) y del 3 % al 16 % de los ingresos de 2030 a 2035, para que el volumen caiga solo ≈ 1 % al año en el terminal. Las reservas probadas son de 406 MMboe (78 % desarrolladas en producción), ≈ 8 años de la producción de 2026 [P1]; el inventario sin probar es mayor, pero se agota. Amortización por agotamiento de ≈ 16 USD/boe (guía 14,75-17,25 [D13]), alta porque las compras se contabilizan a valor razonable, convergiendo al 16 % de los ingresos. Circulante del 19,5 % (cobros de dos a tres meses).',
    wacc: 'Tasa libre del 5,12 % (Tesoro a 10 años, 20-oct-2026 [D5]); beta de 0,85 (la medida es de 0,52-0,68 [D1], baja porque la acción ha seguido al petróleo y no al índice; usamos la de las petroleras de exploración y producción); prima del 5,5 % y 0,5 puntos más por la dependencia de Diamondback y del precio de una materia prima; deuda al 5,6 % (BBB−, bonos de 2030 al 4,9 % y de 2035 al 5,7 % [A4]) con un peso del 9 %. WACC del 9,77 %. Con la prima implícita del mercado (4,2 % [D6]) baja al 8,76 % y el DCF sube a 40,64 USD.',
    terminal: 'Crecimiento a perpetuidad del 1,0 %: +2 % de precio y −1 % de volumen; una regalía en una cuenca madura no crece a la par que la economía. El valor terminal pesa un 37 %: lo que vale Viper son los próximos diez años de petróleo, no la perpetuidad.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +41 % (134 kboe/d frente a 95: 1979 Royalties y Sitio todo el año, Riverbend desde julio, menos lo vendido fuera del Pérmico) y precio +28 % por boe (WTI de 65 a ≈ 88 USD), que sobre el volumen nuevo suman 39,9 puntos [A5, B2].',
    '2027e': 'Volumen +2 % (compra a Diamondback de septiembre y pozos en desarrollo) y precio realizado plano (≈ 88 USD: la curva arranca en 96 y acaba el año en 82) [D4].',
    '2028e': 'Precio −13 % (77 USD con la curva: la EIA supone que la producción del Golfo vuelve a la normalidad a mediados de 2027 [B3]) y volumen +1,5 %.',
    '2029e': 'Precio −8 % (71 USD) y volumen +0,5 %: el inventario de los operadores se va agotando.',
    '2030e': 'Precio −2 % (69 USD) y volumen −0,5 %; desde 2030 Viper tiene que comprar derechos para no perder producción.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La proyección no pide crecimiento: los ingresos de 2030e (≈ 2.060 M) quedan un 18 % por debajo de los de 2026e porque el petróleo vuelve de 88 a 69 USD con la curva, y la cuota del fondo de regalías del Pérmico pasa del 5,5 % al 5,8 % (estimación propia del mercado [B1]). El volumen se sostiene sin capital propio porque perforan los operadores (106 equipos en sus tierras [P2]) y, desde 2030, con compras de derechos que el DCF sí paga (hasta el 16 % de los ingresos). El motor también da «Sí». El riesgo de la prueba no es el volumen sino el precio, y lo recogen los escenarios.',
  dcf_lectura: 'El DCF da 36,27 USD por acción, un 20,9 % bajo el precio, con un WACC del 9,77 % y la curva de futuros: el petróleo de guerra de 2026-2027 pesa poco porque la curva lo devuelve a 69-71 USD en 2029-2030. El DCF inverso dice que el precio de 45,85 USD descuenta una rentabilidad del 7,8 % anual (frente al 9,77 % que pedimos) o un crecimiento de los ingresos 3,7 puntos mayor que nuestro base cada año: en la práctica, un WTI de ≈ 80-85 USD sostenido, no la curva. Con la prima del mercado (4,2 %) el DCF sube a 40,64 USD (−11 %). El precio paga el petróleo de hoy durante años.',
  narrativas: {
    Bajista: 'Alto el fuego con Irán y reapertura de Ormuz en el 1S27; la OPEP+ devuelve los 4,5 Mb/d cortados y añade su producción parada desde 2025: el WTI cae a 68 USD en 2027 y a 60 en 2028-2029 (lo que pasó en 2015-2016 y en 2020). Diamondback y los demás operadores recortan equipos y la guía de volumen se queda plana.',
    Base: 'La curva de futuros del 21-oct-2026: WTI realizado de ≈ 88 USD en 2026 y 2027, 77 en 2028, 71 en 2029 y 69 en 2030; volumen plano a ligeramente creciente con el inventario de los operadores y compras desde 2030.',
    Alcista: 'Ormuz sigue cortado buena parte de 2027 y la reposición de inventarios mundiales mantiene el WTI en 95 USD en 2027, 90 en 2028 y 85 en 2029 (la EIA supone 105 USD de Brent en el 4T26 [B3]); el gas de Waha se recupera con los nuevos gasoductos.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio: bajista 28,16 USD (−38,6 %), base 36,27 (−20,9 %) y alcista 39,54 (−13,8 %). La asimetría es desfavorable (−0,36x) y la razón es la misma en los tres: el precio actual equivale a un petróleo de ≈ 80-85 USD durante una década, por encima incluso de nuestro alcista a partir de 2030. El valor depende del petróleo de 2027-2032, no del de hoy.',
  casos_12m: {
    Bajista: 'WTI de 68 USD en 2027 y 60 en 2028, margen un punto menor: BPA por unidad de 1,38 USD en 2028e (−41 % frente al base) con el PER mínimo de cinco años (9,1x, el de diciembre de 2020). Es un doble castigo: con el PER del base × 0,8 (12,2x) el bajista valdría ≈ 16,9 USD.',
    Base: 'Ingresos de 2.298 M en 2028e (WTI de 77 USD con la curva y volumen +1,5 %), margen EBITDA del 91 %, agotamiento de 790 M (≈ 16 USD/boe), intereses de 90 M, impuesto del 29 % y 369,7 M de unidades sin recompras nuevas: BPA de 2,32 USD.',
    Alcista: 'WTI de 90 USD en 2028 (Ormuz cortado buena parte de 2027): ingresos de ≈ 2.950 M y BPA de 3,02 USD; PER de 19,3x, la mediana de los comparables de regalías.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (2,72 USD) y de 2027e (2,85) quedan un 1 % y un 8 % sobre el consenso (2,68 y 2,64 [D2]): usamos la curva de futuros de hoy (≈ 88 USD en 2027) y el consenso, una media de precios de planificación más baja. La diferencia está en 2028: con la curva (77 USD) el BPA cae a 2,32, y el consenso no publica 2028. El objetivo medio de los analistas (55,48 USD, 21 recomendaciones de compra y ninguna de venta [D2]) supone, implícitamente, que el mercado sigue pagando 19-20 veces un BPA de 2,6-2,9, es decir, petróleo de 80-90 USD sostenido.',
  objetivo_comentario: 'El objetivo a 12 meses (35,46 USD, ponderado) queda un 22,7 % bajo el precio (−18,3 % con el dividendo ordinario de 2,00 USD) y el base (35,50) da −18,2 %. La regla lleva el PER de 16,2x (sobre el BPA de los próximos 12 meses, con petróleo de guerra) a 15,3x, y lo aplica al BPA de 2028e con la curva (2,32): el problema no es el múltiplo, es que el BPA cae un 19 % cuando el petróleo vuelve a 77 USD. Sobre el BPA de 2028e la acción cotiza a 19,8x. El bajista (9,1x × 1,38 = 12,56 USD) es un doble castigo; sin él (12,2x) la ponderada sería −15,9 %. Para comprar haría falta un precio de 32,59 USD (−29 %).',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 45 % y comparables 10 %. El DCF es el método natural para una regalía con reservas que se agotan y precio de materia prima: los múltiplos de un año de petróleo de guerra engañan. Los comparables pesan poco porque Texas Pacific Land (34,7x) y PrairieSky (32,3x) cotizan con primas por tierras y agua que Viper no tiene, y los que más se parecen (Black Stone 13,0x, Kimbell 15,9x) cotizan más baratos que Viper [D3]. Las transacciones no pesan (solo Sitio tiene múltiplo: 7,1 veces el EBITDA). El valor objetivo de la síntesis es de 37,28 USD (−18,7 %). El puente resta 1.618 M de deuda neta a junio y 113 M de ajustes netos (Riverbend pagada en julio menos la caja generada hasta la fecha de corte).',
  contexto: {
    movimiento: { fecha: '2026-10-21', var_1m_pct: 13.1, var_3m_pct: 2.1, var_6m_pct: -3.3, var_12m_pct: 25.5, dist_max_52s_pct: -9.5, dist_min_52s_pct: 28.6, dist_max_historico_pct: -18.5, tendencia: 'lateral', volatilidad_60d_pct: 29, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'mar-2026', var_pct: -5.9, causa: 'El 3-mar Diamondback, EnCap y Oaktree anuncian la colocación de 17,4 M de acciones A a 45,90 USD (≈ 800 M USD); Diamondback vende 12,9 M (589 M) [C4, C3].', veredicto: 'no cambia', condicion: null },
      { periodo: 'jun-jul 2026', var_pct: -13.7, causa: 'Mayor caída de un mes en seis: del 5-jun al 6-jul el WTI pasa de 90,5 a 68,6 USD con las conversaciones sobre Ormuz; Viper cae de 45,46 a 40,48 USD [D1, D4].', veredicto: 'no cambia', condicion: null },
      { periodo: 'sep-2026', var_pct: -6.0, causa: 'El 16-sep Diamondback cae un 8 % (rebaja de Morgan Stanley, venta de un directivo y rotación sectorial) y el WTI un 3 %; Viper le sigue (de 45,96 a 43,19 USD). Ese día Viper solo publicó el nombramiento de un consejero [P3, C5].', veredicto: 'no cambia', condicion: null },
      { periodo: 'sep-oct 2026', var_pct: 13.1, causa: 'Subida de un mes con el petróleo: ataques a petroleros y al oleoducto saudí Este-Oeste a mediados de octubre; WTI de ≈ 98-102 USD [D14, B9].', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-11-02', tipo: 'resultados', hecho: 'Resultados del 3T26 (fecha del calendario [D11]): primer trimestre con el dividendo base de 0,50 USD y guía de volumen de 2027 de Diamondback y de Viper.', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-16', tipo: 'recomendación', hecho: 'Rebaja en Seeking Alpha («mejores rentabilidades por regalías en otros sitios»); los 21 analistas de Yahoo siguen en compra, objetivo medio de 55,48 USD [D9, D2].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-08', tipo: 'accionista de referencia', hecho: 'Viper compra a Diamondback 933 acres netos de regalía pagando con 3,8 M de OpCo Units: Diamondback sube al 39,2 % y vuelve a tener papel que vender (vendió en marzo) [A10, C1]. Overhang posible, sin colocación anunciada.', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-03', tipo: 'resultados', hecho: '2T26: BPA ajustado de 0,76 USD, producción de 134.363 boe/d (+69,5 %), dividendo base subido un 32 % a 2,00 USD anuales y fin del dividendo variable comprometido [A5].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-07-01', tipo: 'fusión u oferta', hecho: 'Cierre de la compra de Riverbend Oil & Gas IX (≈ 505 M USD en caja y acciones) [A4].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-06-15', tipo: 'ampliación o convertible', hecho: 'Crédito revolving ampliado a 2.000 M USD con vencimiento en 2031 [A11].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2026-11-02',
    veredicto: 'no cambia',
    condicion: null,
    comentario: 'La acción se mueve con el petróleo (+13 % en un mes con los ataques a petroleros y al oleoducto saudí) y con Diamondback (−6 % el 16-sep, −5,9 % con la colocación de marzo). No hay un hecho de la empresa que cambie la tesis: los resultados del 2-nov están a 12 días pero la tendencia es lateral, y la posible venta de Diamondback (39,2 %) no está anunciada. La recomendación es Vender por valoración; si algún día fuera Comprar, una colocación de Diamondback a precio de mercado sería el punto de entrada, no un motivo para esperar.',
  },
  catalizadores: {
    items: [
      { fecha: '2026-11-02', evento: 'Resultados del 3T26', efecto: 'Precio realizado del 3T (≈ 87 USD) y primera guía de volumen para 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Plan de 2027 de Diamondback (equipos y pozos en tierras de Viper)', efecto: 'El ritmo de perforación del operador que más pesa en la regalía (7,0 % de regalía media en sus pozos frente al 1,8 % de terceros [P2])', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha', evento: 'Alto el fuego con Irán y reapertura de Ormuz', efecto: 'Caída del petróleo hacia la curva (o por debajo): el bajista', probabilidad: 'Media', sentido: '−' },
      { fecha: 'Continuo', evento: 'Nuevas compras a Diamondback pagadas con OpCo Units', efecto: 'Más volumen, más dilución y más papel en manos de Diamondback', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha', evento: 'Colocación de Diamondback (39,2 % de las unidades)', efecto: 'Presión sobre el precio de 5-8 % en el día, como en marzo', probabilidad: 'Media', sentido: '−' },
      { fecha: '2026-2027', evento: 'Gasoductos nuevos desde el Pérmico (Blackcomb y otros)', efecto: 'El gas de Waha deja de valer cero: +2-3 % de ingresos', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Precio del petróleo: la guerra con Irán lo ha llevado a ≈ 98 USD; la curva lo da en 70-75 en 2028-2029', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−20 a −40 %', mitigante: 'Margen del 91 % sin costes de perforación; deuda baja (0,9 veces el EBITDA)', senal: 'Alto el fuego, reapertura de Ormuz o subida de cuotas de la OPEP+' },
      { riesgo: 'Conflicto de interés con Diamondback: decide dónde perfora, a qué precio vende sus derechos a Viper y cuándo coloca sus acciones', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Comité de independientes para operaciones vinculadas; la regalía de Diamondback en sus propios pozos alinea el ritmo de perforación [C2, P2]', senal: 'Compras a Diamondback a múltiplos altos pagadas con unidades, o menos equipos de Diamondback en tierras de Viper' },
      { riesgo: 'Agotamiento de reservas e inventario: 406 MMboe probados, ≈ 8 años de producción; el inventario de primera calidad del Pérmico se acorta', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Inventario sin probar amplio (1.798 pozos en desarrollo, 1.589 a la vista) y compras [P1, P2]', senal: 'Pozos puestos en producción por debajo de 600 brutos por trimestre' },
      { riesgo: 'Compras caras y dilución: 9.000 M en compras desde 2023 con ROIC incremental del 1,9 %', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Disciplina declarada; venta de lo no pérmico [A1]', senal: 'Nueva compra grande pagada con acciones con el petróleo alto' },
      { riesgo: 'Overhang de Diamondback (39,2 %)', tipo: 'Accionarial', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 a −8 % puntual', mitigante: 'Diamondback necesita a Viper como vehículo de financiación; colocaciones esporádicas', senal: 'Registro de venta (S-3) o anuncio de colocación' },
      { riesgo: 'Gas de Waha sin valor y regulación (metano, tierras federales de Nuevo México)', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'El gas pesa ≈ 2 % de los ingresos', senal: 'Restricciones de permisos federales' },
      { riesgo: 'Riesgo de IA: bajo. La IA no sustituye un derecho de propiedad sobre el subsuelo', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±1 %', mitigante: 'Viper no tiene empleados ni procesos que automatizar; la IA de los operadores (perforación, terminación) sube la productividad del pozo', senal: 'Ninguna relevante' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 40 %. En la primavera se firmó un alto el fuego con Irán, Ormuz se reabrió y la OPEP+, con producción parada desde 2025, la devolvió rápido: el WTI pasó de 98 a 62 USD en seis meses, como en 2015 y en 2020. Diamondback recortó equipos y la guía de volumen de 2027 se quedó plana; el dividendo base de 2,00 USD se mantuvo, pero sin variable ni recompras. Diamondback colocó otro paquete a 34 USD para financiar su propio plan. El mercado dejó de pagar 16 veces el beneficio de guerra y pagó 12 veces el de paz. La señal temprana fue la curva: en octubre de 2026 ya daba 74 USD para diciembre de 2028.',
    ia: {
      exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '±1 % a 3-5 años',
      comentario: 'El riesgo de IA es bajo. Viper cobra un porcentaje de lo que se produce en sus tierras: no vende servicios, software ni trabajo que la IA pueda sustituir, y no tiene empleados propios (la gestionan directivos de Diamondback). La IA llega por dos caminos indirectos y pequeños: los operadores la usan para perforar y terminar pozos más rápido y barato (más producción para la regalía, sin coste para Viper) y los centros de datos suben la demanda de gas y electricidad en Texas, que algún día podría dar valor al gas de Waha. Ninguno de los dos cambia la valoración: lo que manda es el precio del petróleo.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Petróleo', pregunta: '¿Qué volumen y qué dividendo sostiene Viper con el WTI a 60 USD, y qué haría con las recompras?', por_que: 'Es el bajista: el precio de hoy paga 80-85 USD sostenidos.' },
      { tema: 'Diamondback', pregunta: '¿Cuántos equipos y pozos de Diamondback en tierras de Viper hay en el plan de 2027, y cuál es la regalía media de esos pozos?', por_que: 'Diamondback opera pozos con un 7,0 % de regalía media frente al 1,8 % de terceros: su ritmo pesa el triple.' },
      { tema: 'Operaciones vinculadas', pregunta: '¿A qué múltiplo de flujo se valoraron los 933 acres comprados a Diamondback en septiembre y quién hizo la valoración independiente?', por_que: 'Es el conflicto de interés central: Diamondback vende y cobra en unidades.' },
      { tema: 'Reservas', pregunta: '¿Cuántos años de inventario de primera calidad hay en las tierras de Viper al ritmo de 2026?', por_que: 'Decide cuándo hay que empezar a comprar para sostener el volumen (nuestro DCF: desde 2030).' },
      { tema: 'Diamondback como accionista', pregunta: '¿Tiene Diamondback un objetivo de participación mínima en Viper o planes de nuevas colocaciones?', por_que: 'Overhang del 39,2 %.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Vender', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Vender, con convicción media. El objetivo a 12 meses es de 35,46 USD (nuestro BPA por unidad de 2028e con la curva de futuros del petróleo × el PER de la regla común), un −18,3 % de rentabilidad ponderada con el dividendo y un −18,2 % en el caso base, frente a 45,85 USD (cierre del 20-oct-2026; 46,06 en la sesión del 21-oct). El valor intrínseco (37,28 USD) queda un 18,7 % bajo el precio. La razón: el precio paga el petróleo de la guerra con Irán (WTI ≈ 98 USD) como si durara, y la curva de futuros lo devuelve a 74,5 USD en diciembre de 2028 y a 70 en 2029 [D4]. Con la curva, el BPA cae de 2,85 USD en 2027 a 2,32 en 2028. La convicción es media y no alta porque todo depende de un precio que nadie controla: si Ormuz sigue cerrado en 2027 el alcista da 58,29 USD; la subiría que la curva de 2028 bajara hacia 65 USD o una nueva colocación de Diamondback, y la bajaría que la curva de 2028 subiera por encima de 85 USD.

**El negocio.** Viper es dueña de derechos mineros y regalías sobre ≈ 90.000 acres netos del Pérmico: cobra una parte de cada barril que sacan otros (Diamondback y decenas de operadores) sin pagar la perforación [P2]. Margen EBITDA del 91 %, 134 kboe/d en el 2T26. La controla Diamondback (39,2 % de las unidades) con una estructura de acciones A y B [C1]. Calidad «No»: el ROIC (5,4 % en 2025; ≈ 9 % con el petróleo de 2026) no llega al WACC del 9,77 % porque los derechos se compran a precio de mercado. Sostenibilidad «Sí»: no proyectamos crecimiento.

**Finanzas.** Ingresos de 2.041 M y flujo libre de 1.495 M en los 12 meses a junio de 2026 [A5]. Deuda neta de ≈ 1.730 M tras Riverbend, 0,9 veces el EBITDA; BBB− [A4]. Dividendo base de 2,00 USD (4,4 %), más recompras.

**Valoración.** DCF de 36,27 USD con la curva y un WACC del 9,77 %; con la prima del mercado, 40,64. El precio descuenta un WTI de ≈ 80-85 USD sostenido. Escenarios: 28,16 / 36,27 / 39,54. Con la regla v2 de control la ponderada es −10,3 %: también lejos de comprar.

**Riesgos y catalizadores.** El riesgo es el petróleo (un alto el fuego), Diamondback (decide dónde perfora, qué vende a Viper y cuándo coloca) y el agotamiento de reservas (≈ 8 años de reservas probadas). El riesgo de IA es bajo. Resultados el 2-nov-2026.

**Qué cambiaría la decisión.** Comprar por debajo de 32,59 USD; mantener solo con el valor intrínseco por encima del precio. Una curva de futuros de 2028 por encima de 85 USD subiría el BPA de 2028e a ≈ 2,9 USD y cambiaría la conclusión.`,
    tesis: 'Viper es una buena forma de tener petróleo del Pérmico sin pagar pozos: cobra una parte de cada barril que sacan otros, con un 91 % de margen EBITDA y deuda baja. Pero a 45,85 USD paga el petróleo de la guerra con Irán como si durara: el DCF con la curva de futuros vale 36,27 USD y el BPA de 2028e cae un 19 % frente al de 2027.\n\nEl mercado y los analistas (21 compras, objetivo de 55,48 USD) valoran a Viper sobre el beneficio de 2026-2027. Nosotros lo hacemos sobre el de 2028 con la curva, porque una regalía vale el petróleo de los próximos diez años, no el de este trimestre.\n\nLa calidad no ayuda: el ROIC no supera el WACC porque los derechos se compran a precio de mercado, y el mayor accionista es también el mayor operador y vendedor de derechos.',
    vision_diferencial: {
      mercado_descuenta: 'Que el petróleo se queda en 80-90 USD durante años y que Viper sigue comprando derechos (a Diamondback y a terceros) que suben el dividendo por acción.',
      nuestra_vision: 'La curva de futuros dice 74,5 USD en 2028 y 70 en 2029; con ella, el BPA de 2028e es de 2,32 USD y el valor intrínseco de 37,28. El dividendo base está bien cubierto, pero el precio no.',
      por_que: 'Los precios de guerra se han revertido siempre en uno o dos años (1990-1991, 2008, 2022). Las compras pagadas con acciones caras no crean valor por acción (ROIC incremental del 1,9 %).',
    },
    a_favor: [
      '**Regalía pura**: margen EBITDA del 91 %, sin costes de perforación ni de operación.',
      '**Operador principal fuerte**: Diamondback perfora en sus tierras con una regalía media del 7 %.',
      '**Deuda baja y BBB−**: 0,9 veces el EBITDA, vencimientos en 2030 y 2035.',
      '**Dividendo base de 2,00 USD (4,4 %)** más recompras.',
      '**Petróleo alto mientras dure Ormuz**: cada mes de guerra suma caja.',
    ],
    en_contra: [
      '**Paga petróleo de guerra**: la curva baja a 74,5 USD en 2028; BPA de 2028e −19 % frente a 2027.',
      '**ROIC bajo el WACC**: 5,4 % en 2025; las compras rinden al vendedor.',
      '**Conflicto con Diamondback**: controla, opera, vende derechos y coloca acciones.',
      '**Reservas que se agotan**: ≈ 8 años de reservas probadas.',
      '**Overhang**: Diamondback tiene el 39,2 % y vendió en marzo.',
    ],
    que_vigilar: 'La tesis de venta depende de que el petróleo vuelva hacia la curva de futuros. La señal en contra sería que la curva de 2028 subiera por encima de 85 USD (Ormuz cerrado de forma duradera) o que Viper anunciara un crecimiento de volumen orgánico de dos dígitos sin dilución.',
    cambiaria_recomendacion: [
      'Precio por debajo de 32,59 USD: Comprar si la calidad lo permitiera (hoy no pasa el filtro de ROIC − WACC).',
      'Futuro del WTI de dic-2028 por encima de 85 USD: revisar al alza el BPA de 2028e.',
      'Alto el fuego con Irán y WTI por debajo de 70 USD: reforzar Vender.',
      'Nueva compra a Diamondback pagada con unidades a más de 8 veces el EBITDA: reforzar Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'Futuro del WTI de dic-2028', nivel_actual: '74,53 USD', umbral_alerta: '< 65 o > 85 USD', por_que: 'Base del BPA de 2028e.' },
      { kpi: 'Producción de petróleo', nivel_actual: '65.077 bo/d (2T26)', umbral_alerta: '< 64.000 bo/d', por_que: 'Volumen del caso base.' },
      { kpi: 'Pozos brutos puestos en producción por trimestre', nivel_actual: '691 (146 de Diamondback)', umbral_alerta: '< 600', por_que: 'Ritmo de perforación de los operadores.' },
      { kpi: 'Equipos en tierras de Viper', nivel_actual: '106 (12 de Diamondback)', umbral_alerta: '< 90', por_que: 'Producción de los próximos 6-12 meses.' },
      { kpi: 'Agotamiento por boe', nivel_actual: '15,95 USD (2T26)', umbral_alerta: '> 17,25 USD', por_que: 'Coste contable de las compras.' },
    ],
  },
};
