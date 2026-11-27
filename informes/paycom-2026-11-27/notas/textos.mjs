// Textos del analista (Paycom, corte 2026-11-27). Cifras del motor tal cual; hechos con cita de la nota.
// Fuentes nuevas de esta iteración: A12 nota del 3T26, A13 10-Q del 3T26, A14 transcripción; C14 10-Q (plan 10b5-1 del fundador), C15 Form 4/144,
// C16 13G/A de Harris; D2 MarketScreener 9-nov, D3 Yahoo 25-nov, D4 Tesoro, D5 Damodaran nov-2026, D9 comparables; E4 cambio de índice.

export const bpa2028 = { Bajista: 12.96, Base: 14.76, Alcista: 15.96 };
export const per_actual = 18.59;

export const limitaciones = "Cotiza solo en la Bolsa de Nueva York (PAYC), en USD, la misma divisa de las cuentas (US GAAP, millones de USD, ejercicio natural); el 3T26 (julio-septiembre de 2026) es el último trimestre publicado [A12, A13]. Precio de cierre del 25-nov-2026: el 26 fue festivo en EE. UU. (Acción de Gracias) y la sesión del 27 no había cerrado al preparar los datos [D1]. Los fondos de clientes (3.891,3 M USD a 30-sep-2026) y sus obligaciones quedan fuera de la caja y de la deuda del puente porque se anulan entre sí; sus intereses (113,0 M USD en 2025, ~107 M en la guía de 2026) son ingresos y se separan de los recurrentes [A1, A12]. Las cifras de 2024 llevan la reversión de 117,5 M USD de pagos en acciones del paquete de 2020 del fundador, que se trata como no recurrente; 2025 y el 1T26 llevan plusvalías de 35,5 M y 9,0 M USD por el contrato de nombre del pabellón de Oklahoma City, fuera del resultado de explotación [A1, A12]. El BPA del PER histórico y de los escenarios está normalizado sin esas partidas, con los pagos en acciones como coste; el PER de 2025 usa nuestro BPA de 2026e, con nueve meses ya publicados. Los comparables se rehacen con el consenso de Yahoo (BPA ajustado, sin pagos en acciones) y su EBITDA de los próximos 12 meses es estimación propia. La fecha de los resultados del 4T26 (10-feb-2027) es la de Yahoo, no anunciada por la empresa [D3]. El patrimonio de 2016 se corrige para que cuadre el balance (ver controles).";

export const controles_explicados = [
  { control: "Activo = pasivo + patrimonio (2016)", explicacion: "El patrimonio de 2016 de la serie XBRL (205,7 M USD) es la cifra reexpresada por la norma de ingresos ASC 606 en el 10-K de 2018, mientras el activo y el pasivo son los publicados en 2016. Se corrige a 116,5 M USD (activo menos pasivo del mismo balance); no afecta a ninguna cifra de la valoración." },
  { control: "Cambio de perímetro declarado (2019)", explicacion: "Paycom no ha comprado ninguna empresa (el fondo de comercio es de 51,9 M USD desde 2016) [A1]. El activo salta por los fondos de clientes, que dependen del día de la semana en que cae el cierre del año y de las nóminas pendientes de pago: no es perímetro." },
  { control: "Cambio de perímetro declarado (2024)", explicacion: "Mismo motivo que en 2019: el activo total crece por los fondos de clientes al 31 de diciembre, no por compras; el fondo de comercio sigue en 51,9 M USD [A1]." },
  { control: "Caja proyectada coherente con la histórica", explicacion: "El salto ya está en las cuentas: el flujo libre de los nueve meses de 2026 es de 536,5 M USD (285,4 M un año antes) porque el capex bajó del 13,4 % de las ventas de 2025 (centros de datos) al 4,7 % y el margen EBIT GAAP subió del 27,2 % al 34,9 % [A12]. La media real de 2023-2025 (343 M) recoge esos años de inversión; los 701 M medios de 2026e-2028e están en línea con el ritmo de 2026 y con un capex del 5,5 % de las ventas, por debajo de la guía de un 6 % [A14]." },
  { control: "Regresión múltiplo-crecimiento explicativa (R² ≥ 0,3)", explicacion: "Con seis comparables de modelos distintos (nóminas con fondos de clientes, PEO de margen bajo, HCM para grandes empresas e Intuit) el crecimiento no explica el múltiplo (R² de 0,28). No se usa el valor de la regresión." },
  { control: "Comparables estables al quitar una empresa", explicacion: "La mediana del EV/EBITDA de los próximos 12 meses va de 14,1x a 18,4x según se quite un comparable: la muestra es pequeña y heterogénea (Workday e Intuit en los extremos). Por eso los comparables pesan solo un 20 % y se promedian EV/EBITDA y PER." },
  { control: "Comparables: EV/EBITDA y PER coherentes", explicacion: "Los dos están sesgados en sentidos opuestos y por eso se promedian: el EV/EBITDA de los comparables es el contable de Yahoo, que en Workday (margen del 16,4 %) y Paylocity (24,1 %) queda deprimido por pagos en acciones mucho mayores que los de Paycom y les da múltiplos de 19,7-23,1x (el valor de 383,21 USD exagera); el PER de los comparables es sobre BPA ajustado, sin pagos en acciones, y se aplica a nuestro BPA GAAP (el valor de 215,93 USD se queda corto en ~1,2 USD de BPA, un 9 %) [D9, D3]." },
  { control: "Compra robusta (v3 y v2 dan Comprar)", explicacion: "La v2 da Mantener (15,8 % ponderada, 11,5 % base, a 0,5 puntos del 12 %): no es compra de nivel A. La v3 elegida por el selector da Comprar y la v2 aguanta Mantener, que es lo que exige el nivel B (regla 16)." },
];

export const parches = [
  { ruta: "balance.historico[0].patrimonio_neto", valor: 116.5 },
];

export const rentabilidad = {
  comentario: "Paycom crea mucho valor: el ROIC fue del 32,8 % en 2025 frente a un WACC del 9,44 %, 23 puntos por encima, y del 29,9-56,3 % desde 2016. No hay fondo de comercio que lo distorsione: sin él el ROIC es del 34,1 %, porque la empresa nunca ha comprado nada [A1]. El ROIC incremental del periodo dice que el capital nuevo (centros de datos, software capitalizado y la sede de Oklahoma City) rinde lo mismo que el viejo. Lo mueve el margen, no la rotación: un margen EBITDA GAAP del 36,2 % en 2025 y del 42,6 % en los últimos 12 meses, con los pagos en acciones como coste [A1, A12]. En 2026 el ROIC sube con el margen (EBIT GAAP del 34,9 % en nueve meses) y con un capital que no crece (capex de 77,4 M frente a 151,9 M de amortización) [A12]. El ROE, inflado tras recomprar el 20 % de las acciones con deuda, no es un buen indicador. Paychex tiene un ROIC del 26,8 % y ADP del 43,4 % [D15].",
  confianza: "Alta",
};

export const comparables_comentario = "Paycom cotiza a 10,7x el EBITDA de los próximos 12 meses y a 18,7x su BPA GAAP (unas 16,4x sobre el BPA ajustado de 2027 del consenso, 15,13 USD), frente a medianas de los comparables de 16,3x y 16,4x (PER ajustado) [D3, D9]: con un descuento claro por EBITDA y en línea por PER, con el margen más alto de la muestra junto a Paychex y un crecimiento (7 %) por encima de ADP y Paychex. La rebaja del software desde octubre se nota en la muestra: Intuit cotiza a 11,4x y Workday a 14,1x su BPA ajustado [D9]. La mediana es frágil (EV/EBITDA de 14,1x a 18,4x según se quite un comparable) y la regresión no explica los múltiplos. Los comparables dan 383,21 USD por EV/EBITDA y 215,93 USD por PER; el primero exagera por los pagos en acciones de Workday y Paylocity y el segundo se queda corto porque compara BPA ajustado con nuestro GAAP: la media, 299,57 USD, pesa un 20 %.";

export const dcf_justificacion = {
  crecimiento: "Ingresos +8,0 % en 2026e (el punto medio de la guía de 2.213-2.218 M USD), +7,5 % en 2027e, +7,0 % en 2028e y bajando al 4,5 % en 2033e: un 6,3 % medio [A12]. Los nueve meses crecieron un 9,2 % y la guía implica un +4,5 % en el 4T, que la dirección atribuye al calendario y a una comparación difícil [A14]. Proyectamos muy por debajo del 22,5 % anual de 2016-2025 porque la empresa ya no gana cuota como antes: Beti canibalizó servicios en 2023-2024, el crecimiento bajó del 23 % de 2023 al 11 % de 2024 y al 9 % de 2025, y los intereses de los fondos (4,8 % de las ventas en 2026) bajarán si lo hacen los tipos [A1, A12]. El consenso espera un 7,6 % en 2027 y un 7,5 % en 2028 [D2].",
  margenes: "Margen EBITDA GAAP del 45,5 % en 2026e (la guía de EBITDA ajustado del 48,5 % menos unos pagos en acciones del 3 % de las ventas), 45,5 % en 2027e y 46,0 % desde 2028e [A12, A14]. En los nueve meses de 2026 fue del 44,1 % y en el 3T26 del 45,3 % [A12]. No proyectamos más en 2027 porque la dirección anuncia un esfuerzo comercial y de marketing «significativo» con productos que necesitan otra red de ventas [A14]; el margen de 2028e en adelante es el del 3T26, que la empresa llama sostenible. El consenso espera un EBITDA ajustado de 1.176 M en 2027 (49,3 %) y de 1.280 M en 2028 (49,9 %): restando los pagos en acciones, unos 46-47 % GAAP, ligeramente por encima de lo nuestro [D2].",
  inversion: "Capex del 5,5 % de las ventas (inmovilizado más software capitalizado), frente al 13,4 % de 2025, año de construcción de centros de datos, al 4,7 % de los nueve meses de 2026 y a la guía de un 6 % [A1, A12, A14]; sube al 5,8 % en 2033e. La amortización baja del 9,2 % de las ventas en 2026e al 5,8 % en 2033e, cuando se agota la de la inversión de 2023-2025. Circulante del 2 % de las ventas: el negocio cobra por adelantado y los fondos de clientes no se cuentan. La reinversión neta acumulada es negativa (−306 M USD): el crecimiento sale de precio y volumen sin capital nuevo.",
  wacc: "Tasa libre del 4,85 % (bono de EE. UU. a 10 años, 25-nov-2026) [D4]; beta de 0,90, entre la mensual de cinco años (0,73) y la semanal de cinco años (1,20), cerca de la semanal de dos años (0,96), porque la acción es mucho más volátil de lo que dice la beta mensual (46 % anual) [D1]; prima de mercado del 5,5 %. Coste de la deuda del 5,8 % (línea renovable a tipo variable, SOFR más diferencial) y un peso del 6,3 % (750 M USD frente a una capitalización de 11.137 M) [A13]. WACC del 9,44 % (9,71 % en octubre, por el bono).",
  terminal: "Crecimiento perpetuo del 3,0 %: un 1 % real más un 2 % de inflación en USD, por debajo del 4,85 % de la tasa libre. El último año explícito crece un 4,5 % con un margen del 46 %; la reinversión terminal cubre el crecimiento con un ROIC muy por encima del WACC. El múltiplo de salida implícito (unas 10 veces el EBITDA) queda por debajo del EV/EBITDA de ADP y Paychex hoy (18,4x y 14,1x) [D9].",
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: "2026e", volumen_pct: 4.8, precio_pct: 3.5, otros_pct: -0.3, comentario: "Volumen: clientes nuevos y empleados por cliente, con la retención récord del 91 % de 2025 [A1]. Precio: subidas anuales de tarifa y módulos de pago como Asset Management (más de 300 clientes) [A14]. Otros: los intereses de los fondos bajan de 113,0 a unos 107 M USD con la guía [A12]." },
    { periodo: "2027e", volumen_pct: 4.0, precio_pct: 3.5, otros_pct: 0.0, comentario: "La venta de módulos nuevos (Asset Management, GONE, IWant y los productos «en pruebas» de 2027) a la base y la entrada en empresas de más de 1.000 empleados; el empleo privado de EE. UU. aporta poco [A14, B12]." },
    { periodo: "2028e", volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0.0, comentario: "El precio se mantiene en la línea de la historia; el volumen depende de seguir ganando clientes a Paylocity, Paycor y ADP con menos del 5 % del mercado direccionable [B3]." },
    { periodo: "2029e", volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0.0, comentario: "Desaceleración gradual del volumen por la competencia de Rippling y los agentes de IA en la empresa mediana [B13]." },
  ],
  mercado_final: { periodo: "2033e", tamano: 60600 },
  veredicto: "Sí",
  justificacion: "La calidad de Paycom sostiene el 6,3 % anual que proyectamos: es menos de un tercio del 22,5 % de 2016-2025 y menos que el 9,2 % de los nueve meses de 2026, con los recurrentes al +11,3 % en el 3T26 [A12]. Apenas necesita capital (reinversión neta negativa) y el ROIC del 32,8 % triplica el WACC. El crecimiento sale de volumen y precio con una cuota del 5 % de un mercado que crece un 5 % al año, que solo sube al 5,5 % en 2033e. El foso es estrecho (costes de cambio y producto de una sola base de datos), pero la retención del 91 % y dos subidas de la guía de 2026 demuestran poder de precios después de Beti [A1, A12].",
};

export const dcf_lectura = "El DCF da 261,32 USD por acción, un 5,6 % por encima del precio de 247,49 USD, con un valor terminal del 65 % del total (en octubre daba 224,65 USD: el margen del 3T26 sube el base unos 2 puntos y el bono baja 36 pb). Nuestra proyección queda cerca del consenso: ingresos un 0,1 % por encima en 2027e y un 0,7 % por debajo en 2028e, con un EBITDA GAAP algo menor [D2]. El precio descuenta una rentabilidad del 9,8 % anual frente a un WACC del 9,44 %. Con nuestro WACC, el precio pide un crecimiento del 5,1 % anual en 2027e-2033e frente al 6,0 % de nuestro caso base en ese tramo, o un margen EBITDA del 44 % frente al 46 %: menos de lo que la empresa hace hoy. Con la prima de riesgo que pide el mercado (4,41 %, WACC del 8,52 %), el DCF sube a 306,68 USD. El valor depende sobre todo de la tasa de descuento: medio punto más de WACC lo deja en 241,71 USD, por debajo del precio.";

export const narrativas = {
  Bajista: "La IA reduce las plantillas administrativas de los clientes y Paycom, que cobra por empleado, pierde volumen; Rippling y los agentes de IA aprietan el precio en la empresa mediana y el crecimiento cae al 4-5 %, el ritmo que la guía ya implica para el 4T26 [A12]. El gasto comercial de 2027 se come parte del margen y la Reserva Federal baja los tipos. Margen 2,5 puntos menor y WACC medio punto mayor.",
  Base: "El crecimiento se estabiliza en el 7-7,5 % con precio y módulos nuevos y luego converge al 4,5 %; el margen EBITDA GAAP se queda en el 45,5-46 % del 3T26, con el ahorro de la IA en la propia plantilla y más gasto comercial; en línea con la guía y el consenso [A12, D2].",
  Alcista: "Los productos de 2027 y el cobro de la automatización suben el ingreso por cliente, Paycom gana cuota en la empresa de más de 1.000 empleados y fuera de EE. UU. y el crecimiento vuelve al 9 %; margen del 47,5 % y un WACC un cuarto de punto menor [A14].",
};

export const escenarios_comentario = "La asimetría es aceptable con nuestro WACC: el alcista gana un 32,2 % (327,17 USD) y el bajista pierde un 26,7 % (181,37 USD), una relación de 1,21x (0,51x en octubre). El bajista es verosímil, porque combina algo que ya pasó (la caída del crecimiento por Beti en 2024-2025) con el riesgo nuevo de que la IA reduzca las plantillas de los clientes, y deja la acción en el nivel de mayo de 2026 [D1]. Con la prima del mercado (4,41 %) el cuadro mejora: alcista de 390,07 USD, bajista de 207,73 USD y asimetría de 3,59x. La conclusión sigue dependiendo mucho del coste de capital.";

export const suma_partes_comentario = "No aplica: Paycom tiene un solo segmento operativo y no publica resultado por línea de ingresos [A1, A13]. Los intereses de los fondos de clientes (113,0 M USD en 2025, ~107 M en 2026) son un subproducto del proceso de nóminas, no un negocio separable; su sensibilidad a los tipos se trata en los riesgos.";

export const valoracion_comentario = "El DCF pesa un 45 % porque el negocio es recurrente, casi no necesita capital y la proyección coincide con el consenso; los escenarios un 30 % para recoger la asimetría; los comparables un 20 %, por su fragilidad (mediana de 14,1x a 18,4x) y su heterogeneidad; y las transacciones un 5 %, porque llevan prima de control (Dayforce pagó un 32 % y Paycor un 19 %) y el fundador, con un 13 %, no tiene intención declarada de vender la empresa [D10, D11, C1]. La dispersión es amplia: de los 257,80 USD de los escenarios a los 299,57 USD de los comparables. El valor objetivo de 269,62 USD queda un 8,9 % por encima del precio; con la prima del mercado, en 303,53 USD (+22,6 %). Los fondos de clientes no suman: se anulan con sus obligaciones.";

export const obj_just = {
  Bajista: "Crecimiento del 4,5 % en 2027e y del 4 % en 2028e por menos empleados en los clientes y presión de precio; margen EBITDA GAAP del 43,5 %. Ingresos de 2.408 M USD, EBIT de 857 M, 38 M de intereses netos, 28,5 % de impuestos y 45,2 M de acciones: BPA de 12,96 USD, sin recompras nuevas.",
  Base: "Ingresos de 2.548 M USD en 2028e (+7,5 % en 2027e y +7 % en 2028e) y margen EBITDA GAAP del 46 %; amortización del 7,9 %, EBIT de 971 M, intereses netos de 38 M por la línea de 750 M y un 28,5 % de impuestos; 45,2 M de acciones diluidas (45,03 M a 27-oct-2026 más la dilución de los pagos en acciones) [A13]. BPA de 14,76 USD, con los pagos en acciones como coste.",
  Alcista: "Crecimiento del 9,5 % y del 9 % con los productos de 2027 y cuota en empresas grandes; margen del 47,5 %. Ingresos de 2.644 M USD y BPA de 15,96 USD.",
};

export const per_excluidos = "2019, 2020 y 2021 (107,6x, 134,2x y 85,8x sobre el BPA del año siguiente: burbuja de múltiplos del software). Se usan 2022-2025 (52,8x, 29,2x, 26,9x y 13,6x) y 2018 (39,6x) para la media larga: cinco años útiles. BPA normalizado: sin la reversión de 117,5 M USD de 2024 ni las plusvalías del contrato del pabellón; para el cierre de 2025 (159,36 USD), nuestro BPA de 2026e (11,76 USD: 8,26 de los nueve meses sin la plusvalía y 3,50 estimados para el 4T con la guía), porque 2026 aún no ha cerrado; quitarlo subiría la mediana y el mínimo, así que mantenerlo es lo prudente.";

export const diferencia_consenso = "Nuestro BPA de 2028e (14,76 USD) es un 3,6 % menor que el del consenso de MarketScreener (15,31 USD, GAAP) y el de 2027e (13,31 USD) coincide con el suyo (13,35 USD) [D2]. En la base ajustada de Yahoo (15,13 USD en 2027) el consenso subió un 8 % tras el 3T26; nosotros subimos el BPA de 2028e un 9 % frente al informe de octubre (13,52 USD) [D3]. Nuestro precio base (301,10 USD) supera en un 11,1 % el objetivo medio de los analistas (271 USD, 16 analistas): la diferencia es el múltiplo (20,4x frente a las ~18x implícitas en su objetivo sobre el BPA de 2027), no las cifras.";

export const obj_media = 304.74;

export const obj_comentario = "El objetivo a 12 meses (304,74 USD ponderado) supera en un 13 % al valor intrínseco (269,62 USD). La distancia sale del múltiplo: la regla lleva el PER de 18,6x a 20,4x, un 10 % más, porque la mediana de cinco años (28,1x) está muy por encima, mientras el DCF con un WACC del 9,44 % equivale a unas 17,7x el BPA de 2028e. Para que el precio llegue al objetivo hace falta que la guía de 2027 (10-feb-2027) confirme un crecimiento del 7 % y que el margen del 3T26 aguante el gasto comercial anunciado. Si el WACC del mercado (8,52 %) es el correcto, el valor intrínseco es de 303,53 USD y casi coincide con el objetivo.";

export const catalizadores = {
  items: [
    { fecha: "Desde el 1-dic-2026 hasta el 1-jun-2027", evento: "Ventas del plan 10b5-1 del fundador (hasta 1,09 M de acciones)", efecto: "Unas 8.700 acciones al día de media si vende todo, ~1,2 % del volumen diario; más peso como señal que como flujo [C14, D1].", probabilidad: "Alta", sentido: "−" },
    { fecha: "2-dic-2026", evento: "Paso del S&P SmallCap 600 al S&P MidCap 400", efecto: "Compras de los fondos del MidCap 400 frente a ventas de los del SmallCap 600; neutro o algo positivo [E4].", probabilidad: "Alta", sentido: "+" },
    { fecha: "Diciembre de 2026", evento: "Reunión de la Reserva Federal", efecto: "100 pb de tipos mueven 25,7 M USD de intereses de los fondos (0,41 USD por acción después de impuestos) [A1].", probabilidad: "Media", sentido: "+/−" },
    { fecha: "10-feb-2027 (Yahoo; no anunciada)", evento: "Resultados de 2026 y guía de 2027", efecto: "Una guía de ingresos de +7 % o más con margen ajustado de ~49 % sostendría la tesis; por debajo del +5 % la rompería [D3].", probabilidad: "Alta", sentido: "+/−" },
    { fecha: "2027", evento: "Lanzamientos de productos «en pruebas» y uso del programa de recompra (1.652,7 M USD disponibles)", efecto: "La dirección llama a 2027 «transformacional»; 1.000 M USD de recompras reducirían las acciones un 9 % a este precio [A13, A14].", probabilidad: "Media", sentido: "+" },
    { fecha: "Mayo de 2027", evento: "Junta de accionistas", efecto: "El voto de remuneración tuvo un 39,1 % en contra en 2026 [C2].", probabilidad: "Media", sentido: "+/−" },
  ],
  confianza: "Media",
};

export const riesgos = {
  items: [
    { riesgo: "La IA reduce las plantillas administrativas de los clientes (Paycom cobra por empleado) y abarata el software de nóminas y RR. HH.", tipo: "Tecnología y competencia", probabilidad: "Media", impacto: "Alto", efecto_valor: "−10 % a −30 % (escenario bajista: −26,7 %)", mitigante: "La propia Paycom usa la IA para recortar costes (la I+D en gasto bajó a un 7,1 % de las ventas en el 3T26) y la integra en el producto sin cobrar «tokens» al cliente (uso de IWant +65 %) [A12, A14].", senal: "Empleados por cliente a la baja o retención por debajo del 90 %." },
    { riesgo: "Desaceleración: la guía implica un +4,5 % de ingresos en el 4T26 tras un +10,2 % en el 3T", tipo: "Operativo", probabilidad: "Media", impacto: "Medio", efecto_valor: "−10 % por cada punto menos de crecimiento sostenido (estimación propia con el DCF)", mitigante: "Recurrentes +11,3 % en el 3T26 y dos subidas de la guía en 2026; la dirección lo atribuye al calendario [A12, A14].", senal: "Guía de ingresos de 2027 por debajo del +5 %." },
    { riesgo: "Ventas del fundador: plan 10b5-1 para vender hasta 1,09 M de acciones (~18 % de su participación) entre diciembre de 2026 y junio de 2027", tipo: "Gobierno", probabilidad: "Alta", impacto: "Bajo", efecto_valor: "−2 % a −5 % (presión de oferta y señal; estimación propia)", mitigante: "Plan adoptado el 1-sep, antes de un 3T mejor de lo previsto; devuelve su peso al ~10,7 % que tenía antes de las recompras y equivale a ~1,2 % del volumen diario [C14].", senal: "Ampliación del plan, ventas fuera de él o ventas grandes de otros directivos." },
    { riesgo: "Reversión del margen: el EBIT GAAP del 3T26 (36,0 %) sale de una I+D en gasto del 7,1 % de las ventas y una comercial del 19,9 %, y la dirección anuncia más gasto comercial en 2027", tipo: "Operativo", probabilidad: "Media", impacto: "Medio", efecto_valor: "−8 % por cada 2 puntos de margen (escenario bajista)", mitigante: "La empresa llama sostenible al margen y la automatización interna sigue [A14].", senal: "Guía de EBITDA ajustado de 2027 por debajo del 47 %." },
    { riesgo: "Competencia en la empresa mediana: Rippling, Paylocity, Paychex con Paycor, ADP y Dayforce en manos de Thoma Bravo", tipo: "Competencia", probabilidad: "Media", impacto: "Medio", efecto_valor: "−5 % a −15 % (estimación propia)", mitigante: "Margen EBITDA ajustado del 48,5 % en 2026, que deja espacio para competir en precio [A12].", senal: "Retención por debajo del 90 % o rebajas de precio en la renovación." },
    { riesgo: "Bajada de tipos: los intereses de los fondos de clientes (~107 M USD en 2026) tienen margen casi completo", tipo: "Mercado", probabilidad: "Media", impacto: "Bajo", efecto_valor: "−3 % por cada 100 pb (25,7 M USD; 0,41 USD por acción) [A1]", mitigante: "El saldo medio de fondos crece un 7 % [A14].", senal: "Intereses de fondos por debajo de 95 M USD al año." },
    { riesgo: "Coste de capital: medio punto más de WACC deja el DCF por debajo del precio", tipo: "Mercado", probabilidad: "Media", impacto: "Medio", efecto_valor: "−7,5 % por cada medio punto más de WACC (sensibilidad del DCF: 241,71 USD)", mitigante: "Más tipos suben también los intereses de los fondos [A1].", senal: "Bono a 10 años por encima del 5,3 %." },
    { riesgo: "Seguridad de datos de millones de trabajadores y personas clave", tipo: "Operativo y reputacional", probabilidad: "Baja", impacto: "Alto", efecto_valor: "−5 % a −15 % según el alcance (estimación propia)", mitigante: "Certificaciones ISO 27001 y 42001 y centros de datos propios de nivel IV [A1, A14].", senal: "Incidente comunicado en un 8-K." },
  ],
  premortem: "Noviembre de 2028: la acción ha perdido un 35 % y cotiza por debajo de 160 USD. Empezó en la guía de 2027, de un +5 %: el +4,5 % del 4T26 no era calendario, sino que los clientes, empresas de 50 a 5.000 empleados, recortaron personal de administración y back office con agentes de IA y el ingreso por empleado dejó de crecer. El gasto comercial de 2027 bajó el margen ajustado del 49 % al 45 % sin acelerar las ventas. El fundador vendió su millón de acciones del plan y amplió otro en 2027. La Reserva Federal bajó los tipos 150 pb y los intereses de los fondos cayeron unos 40 M USD. El mercado dejó de ver a Paycom como un compuesto del 7-8 % y la valoró como el software maduro, a 13-14x beneficios. El indicador que lo habría anticipado: los empleados por cliente y la retención anual del 10-K, y la guía del 4T26.",
  ia: {
    exposicion: "Media",
    sentido: "Mixto",
    efecto_valor: "−10 % a 3-5 años (entre el caso base y el bajista); hasta −30 % si se combina con la presión de precio",
    comentario: "La IA toca a Paycom por tres lados. Por los ingresos: cobra por empleado procesado, y si la IA reduce las plantillas administrativas de sus clientes (empresas de 50 a 10.000 empleados), el volumen se resiente aunque no pierda ni un cliente [A1]. Por la competencia: agentes que hacen la nómina o los RR. HH. abaratan la entrada a rivales como Rippling y comprimen el precio [B13]. A favor, los costes y el producto: la I+D total bajó del 20,5 % al 9,5 % de las ventas ajustadas en un año sin frenar los lanzamientos, y la IA propia (IWant, decisiones automáticas) corre en centros de datos propios sin coste por consulta para el cliente [A12, A14]. La nómina es regulada (impuestos, cumplimiento, responsabilidad) y el dato propio de una sola base de datos es una defensa; no vemos que la IA se coma el negocio a 3-5 años, pero sí que limite el crecimiento. Señal: empleados por cliente y retención anual por debajo del 90 %.",
  },
  confianza: "Media",
};

export const preguntas = {
  items: [
    { tema: "4T26 y 2027", pregunta: "¿Qué parte del +4,5 % implícito en el 4T26 es calendario (días de nómina) y qué parte es menor volumen o precio?", por_que: "Es la base de la guía de 2027 y del caso base (+7,5 %) [A14]." },
    { tema: "IA y volumen", pregunta: "¿Cómo han evolucionado los empleados por cliente en 2025-2026 y qué parte del crecimiento es precio, módulos y altas netas de clientes?", por_que: "Paycom cobra por empleado; es la variable que la IA puede romper y la empresa no la publica." },
    { tema: "Plan del fundador", pregunta: "¿Por qué vende ahora hasta 1,09 M de acciones y tiene acciones pignoradas?", por_que: "Es su primera venta desde 2021, con la acción un 135 % por encima del mínimo [C14]." },
    { tema: "Margen", pregunta: "¿Cuánto del margen ajustado del 49,3 % del 3T26 se reinvertirá en la red comercial nueva de 2027?", por_que: "El BPA de 2028e depende de que el margen GAAP se quede en el 46 % [A14]." },
    { tema: "Recompras", pregunta: "¿Por qué casi no recompró en el 3T26 (3 M USD) y a qué precio volvería a hacerlo?", por_que: "Quedan 1.652,7 M disponibles; recomprar por encima del valor intrínseco destruiría valor [A13]." },
    { tema: "Fondos de clientes", pregunta: "¿Qué duración tiene la cartera de fondos y cuánto cambiaría el ingreso con una bajada de 200 pb?", por_que: "Son ~107 M USD de ingresos con margen casi completo [A12]." },
    { tema: "Remuneración", pregunta: "¿Qué cambiará el comité de retribuciones tras el 39,1 % de votos en contra?", por_que: "El paquete de 18,4 M USD en acciones del fundador pesa en el gobierno [C1, C2]." },
  ],
  confianza: "Media",
};

export const fuentes = [
  { id: 1, titulo: "Tipos de cambio de referencia del euro (USD, 26-nov-2026)", editor: "Banco Central Europeo", tipo: "Datos de mercado", fecha: "2026-11-26", url: "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml" },
];

export const huecos = [];

// Regla 13: precio y noticias (movimiento.mjs del 27-nov con cierre del 25-nov).
export const secciones = {
  bolsa: {
    contexto: {
      movimiento: { fecha: "2026-11-25", var_1m_pct: -5.5, var_3m_pct: 4.4, var_6m_pct: 80.9, var_12m_pct: 55.4, dist_max_52s_pct: -9.9, dist_min_52s_pct: 117.9, dist_max_historico_pct: -45.3, tendencia: "alcista", volatilidad_60d_pct: 35.7, avisos: [] },
      movimientos_fuertes: [
        { periodo: "ago-2026", var_pct: 65.2, causa: "Resultados del 2T26 mejores de lo previsto y primera subida de la guía (+31 % en la semana del 3-ago), tras recomprar el 20 % del capital [A3, D1].", veredicto: "no cambia", condicion: null },
        { periodo: "oct-2026", var_pct: 8.6, causa: "Subidas de objetivos antes de resultados (Jefferies 160 → 300, Cantor 195 → 285, Guggenheim 225 → 300) hasta el máximo de 275,22 USD del 23-oct [D3].", veredicto: "no cambia", condicion: null },
        { periodo: "5 y 6-nov-2026", var_pct: -11.5, causa: "Tras el 3T26: −6,8 % y −5,1 % (268,16 → 237,32 USD) por la guía implícita del 4T (+4,5 %), la rebaja de BTIG a neutral y el 10-Q del 5-nov con el plan de venta del fundador [A12, A13, D3]. Es reacción a hechos que el informe recoge, no un deterioro: la guía sube y el BPA del consenso sube un 8 %.", veredicto: "no cambia", condicion: null },
        { periodo: "may-jun-2026", var_pct: -11.6, causa: "Recogida de beneficios tras el rebote de abril y la recompra; sin noticia propia [D1].", veredicto: "no cambia", condicion: null },
      ],
      noticias: [
        { fecha: "2026-11-05", tipo: "accionista de referencia", hecho: "Plan 10b5-1 de una sociedad del fundador (13 %), adoptado el 1-sep-2026, para vender hasta 1,09 M de acciones (~2,4 % del capital, ~270 M USD) entre el 1-dic-2026 y el 1-jun-2027; motivo no declarado [C14].", veredicto: "no cambia", condicion: "Pasa a «descarta» si el plan se amplía, si vende fuera de él o si otros directivos venden más allá de las ventas por impuestos de la consolidación." },
        { fecha: "2026-11-25", tipo: "directivos", hecho: "Ventas pequeñas del presidente, el director financiero, el director de operaciones y un consejero (0,35-1,13 M USD cada una, 2,8 M en total), tras la consolidación de acciones [C15].", veredicto: "no cambia", condicion: null },
        { fecha: "2026-11-05", tipo: "recomendación", hecho: "BTIG baja de comprar a neutral; KeyBanc (297 USD), JP Morgan (265) y Citi (264) mantienen; objetivo medio de 271 USD [D3].", veredicto: "no cambia", condicion: null },
        { fecha: "2026-11-23", tipo: "fusión u oferta", hecho: "S&P Dow Jones Indices pasa Paycom del SmallCap 600 al MidCap 400 el 2-dic-2026 [E4].", veredicto: "no cambia", condicion: null },
        { fecha: "2026-11-16", tipo: "accionista de referencia", hecho: "Harris Associates baja del 6,7 % al 5,7 % (13G/A) [C16].", veredicto: "no cambia", condicion: null },
        { fecha: "2026-07-01", tipo: "demanda o regulador", hecho: "Demanda de la EEOC por discriminación por discapacidad (despido de una empleada con alergia alimentaria grave); la empresa sostiene que fue legal. Sin importe relevante; la demanda colectiva de valores de 2023 sigue sin cambios [A13].", veredicto: "no cambia", condicion: null },
        { fecha: "2027-02-10", tipo: "resultados", hecho: "Resultados del 4T26 y guía de 2027 (fecha de Yahoo, no anunciada) [D3].", veredicto: "no cambia", condicion: null },
      ],
      proximos_resultados: "2027-02-10",
      veredicto: "no cambia",
      condicion: null,
      comentario: "La acción duplicó en seis meses por la recompra y dos subidas de la guía, y cayó un 11,5 % tras el 3T26 por la guía implícita del 4T y el plan de venta del fundador. El único hecho pendiente que juega en contra es ese plan: hasta 1,09 M de acciones en seis meses, ~1,2 % del volumen diario, que no puede mover el precio un 5 % por flujo. Lo leemos como diversificación y no como señal: se adoptó el 1-sep, antes de un trimestre que batió y subió la guía, es su primera venta desde 2021 y deja su peso en el ~10,7 % que tenía antes de que las recompras lo subieran al 13 %. El cambio de índice del 2-dic es neutro o favorable. Veredicto: no cambia, con la condición de vigilar el plan.",
    },
  },
};

export const resumen = {
  recomendacion: "Comprar",
  conviccion: "Baja",
  justificacion_recomendacion: null,
  horizonte: "12 meses",
  sintesis: `**La recomendación y por qué.** Comprar con convicción baja, solo en el nivel B (límite de 250,80 USD; el de nivel A, 239,89 USD, queda por debajo del precio). El objetivo a 12 meses es de 304,74 USD (23,7 % de rentabilidad ponderada y 22,3 % en el caso base, con dividendo) y el valor intrínseco, 269,62 USD, queda un 8,9 % por encima del precio de 247,49 USD; el objetivo medio de los analistas es de 271 USD. La v2 de control da Mantener (15,8 % ponderada, 11,5 % base): no es una compra de nivel A. Convicción baja, la que sugiere el motor: medio punto más de WACC deja el DCF por debajo del precio. Frente a octubre (Mantener a 239,00 USD), cambia el valor: el 3T26 subió el margen y la guía y el DCF pasa de 224,65 a 261,32 USD.

**El negocio.** Paycom vende nóminas y RR. HH. en una sola base de datos a empresas medianas de EE. UU. [A1]. El ROIC es del 32,8 % frente a un WACC del 9,44 % y el margen EBITDA ajustado de 2026 (48,5 %) es el más alto del sector [A12]. Calidad: **Sí**. La calidad de la empresa sostiene el crecimiento que proyectamos (veredicto «Sí», el mismo que el del motor): un 6,3 % anual sin capital nuevo y con una cuota que solo sube del 5,0 % al 5,5 %.

**Finanzas.** El 3T26 batió: ingresos +10,2 % (recurrentes +11,3 %), BPA GAAP de 2,99 USD (+53 %) y margen ajustado récord del 49,3 % [A12]. La guía de 2026 sube por segunda vez (ingresos de 2.213-2.218 M USD, EBITDA ajustado de 1.069-1.079 M), pero implica un 4T de solo +4,5 % [A12, A14]. Nuestro BPA de 2028e sube de 13,52 a 14,76 USD (×1,09); el del consenso, un 8 % [D2, D3]. Deuda neta de 556 M, 0,5 veces el EBITDA ajustado [A12].

**Equipo y gobierno.** Resta. El fundador es consejero delegado y presidente, cobró 22,8 M USD en 2025 y el voto de remuneración tuvo un 39,1 % en contra [C1, C2]. Novedad: un plan para vender hasta 1,09 M de sus acciones (~18 % de su participación) entre diciembre y junio [C14].

**Valoración.** El DCF da 261,32 USD; los comparables 299,57 USD; los escenarios 257,80 USD. El precio descuenta un 5,1 % de crecimiento anual en 2027e-2033e frente a nuestro 6,0 %. Con la prima del mercado (4,41 %) el valor sube a 303,53 USD (+22,6 %).

**Riesgos y catalizadores.** El mayor es la IA. Exposición media y efecto mixto: puede reducir las plantillas de los clientes (cobra por empleado), pero ya le baja los costes; no se come el negocio a 3-5 años, pero limita el crecimiento: −10 % de valor, −30 % con presión de precio. Le siguen el 4T flojo, el gasto comercial de 2027 y las ventas del fundador. Precio y noticias (regla 13): no cambia; el plan del fundador es la condición que vigilar. Catalizador: la guía de 2027, hacia el 10-feb-2027 [D3].

**Qué cambiaría la decisión.** La regla de 12 meses deja de dar Comprar por encima de 266,30 USD y pasa a Vender por encima de 340,27 USD; para quien la tiene, el precio de venta es el límite de mantener de las pruebas de robustez, 278,39 USD. Las pruebas dan una señal frágil: con un BPA un 10 % menor la ponderada baja al 11,4 % (colchón de BPA del 8 % para comprar y del 12 % para mantener). Una guía de 2027 por debajo del +5 % o un margen ajustado bajo el 47 % nos haría revisar. Una acción cuesta unos 225,50 EUR (1,0975 USD/EUR del BCE) [P1].`,
  tesis: "Paycom vende nóminas, tiempo, talento y RR. HH. en una sola base de datos a unas 39.200 empresas medianas de EE. UU., con una retención del 91 %, un margen EBITDA ajustado del 48,5 % en 2026 y un ROIC del 32,8 % sin haber comprado nunca nada [A1, A12]. Cobra por empleado y custodia los fondos de las nóminas, cuyos intereses (~107 M USD) suman un 4,8 % de las ventas [A12].\n\nEl precio, 247,49 USD, ha subido un 135 % desde el mínimo de 104,90 USD, pero cayó un 11,5 % tras el 3T26 y descuenta un crecimiento del 5,1 % anual con nuestro WACC, menos que el 6,0 % de nuestro caso base y la mitad del 10,2 % del 3T [D1, A12]. Cotiza a 18,7x el BPA de los próximos 12 meses, en línea con los comparables y muy por debajo de su mediana histórica.\n\nEl mercado duda de que el margen del 3T26 aguante el gasto comercial de 2027 y de que el +4,5 % del 4T sea calendario. Para invertir hay que creer que el crecimiento se sostiene en el 7 % a pesar de que la IA puede reducir las plantillas de sus clientes. A este precio el valor intrínseco deja un margen del 8,9 % y el múltiplo a 12 meses, un 22 %.",
  vision_diferencial: {
    mercado_descuenta: "Un crecimiento del 5,1 % anual con nuestro WACC, o una rentabilidad del 9,8 % anual con nuestras cifras; cotiza por debajo del objetivo medio de 16 analistas (271 USD; 14 en mantener) [D3].",
    nuestra_vision: "Coincidimos con el consenso en las cifras (BPA de 2027e igual, 2028e un 3,6 % menor). Discrepamos en el múltiplo: tras la caída del 11,5 % el PER (18,6x) vuelve a quedar lejos de su historia, y el plan de venta del fundador nos parece diversificación, no una señal.",
    por_que: "La caída del 74 % desde 2021 llevó el PER adelantado a 13,6x en 2025, su mínimo; la recuperación lo ha llevado a 18,6x, todavía lejos de la mediana de 28,1x, con un BPA que sube un 9 % en el trimestre. Con el bono al 4,85 % el valor intrínseco ya deja margen, aunque pequeño.",
  },
  a_favor: [
    "**ROIC del 32,8 %**, 23 puntos por encima del WACC y sin fondo de comercio.",
    "**Margen EBITDA ajustado del 49,3 %** en el 3T26 y guía de 2026 subida dos veces [A12].",
    "**Valor intrínseco de 269,62 USD**, un 8,9 % sobre el precio.",
    "**PER adelantado de 18,6x** frente a una mediana de cinco años de 28,1x.",
    "**La IA ya le baja los costes**: la I+D total pasó del 20,5 % al 9,5 % de las ventas ajustadas en un año [A12].",
  ],
  en_contra: [
    "**Guía del 4T26 de +4,5 %** tras un +10,2 % en el 3T [A12].",
    "**El fundador vende**: plan de hasta 1,09 M de acciones entre diciembre y junio [C14].",
    "**Cobra por empleado**: la IA puede reducir las plantillas de sus clientes.",
    "**La v2 de control da Mantener** (11,5 % en el base): no es compra de nivel A.",
    "**Gobierno débil**: 39,1 % de votos en contra de la remuneración en 2026 [C2].",
  ],
  que_vigilar: "La tesis depende de que el crecimiento se mantenga en el 7 % con precio y módulos y de que el margen GAAP se quede en el 46 % pese al gasto comercial de 2027. La señal de que no se cumple sería una guía de ingresos de 2027 inferior al +5 %, un margen ajustado guiado por debajo del 47 % o una retención por debajo del 90 % en el 10-K de febrero de 2027; y, en gobierno, una ampliación del plan de ventas del fundador.",
  cambiaria_recomendacion: [
    "Precio por encima de 266,30 USD: la regla de 12 meses dejaría de dar Comprar.",
    "Precio por encima de 278,39 USD: para quien la tiene, deja de pasar el filtro de mantener (venta); la banda Vender de la regla de 12 meses, 340,27 USD (ponderada ≤ −10 %), es solo la referencia de la regla.",
    "Precio por encima de 250,80 USD: deja de ser compra de nivel B; por debajo de 239,89 USD sería compra robusta de nivel A.",
    "Guía de ingresos de 2027 por debajo del +5 % o margen ajustado por debajo del 47 %: revisaríamos a la baja.",
    "Ampliación del plan de ventas del fundador o ventas fuera de él: el veredicto de la regla 13 pasaría a «descarta».",
    "Bono a 10 años de EE. UU. por encima del 5,3 %: el WACC subiría medio punto y el DCF bajaría a unos 242 USD, por debajo del precio.",
  ],
  kpis_seguimiento: [
    { kpi: "Crecimiento de ingresos recurrentes", nivel_actual: "+11,3 % (3T26); guía «casi» +9 % en 2026", umbral_alerta: "< +6 % en un trimestre", por_que: "Es la variable del caso base [A12]." },
    { kpi: "Retención anual de ingresos", nivel_actual: "91 % (2025)", umbral_alerta: "< 90 %", por_que: "Mide el foso frente a la IA y a los rivales [A1]." },
    { kpi: "Margen EBITDA ajustado", nivel_actual: "49,3 % (3T26); 48,5 % guía 2026", umbral_alerta: "< 47 % en la guía de 2027", por_que: "El BPA de 2028e depende de él [A12]." },
    { kpi: "Intereses de los fondos de clientes", nivel_actual: "≈107 M USD (guía 2026)", umbral_alerta: "< 95 M USD", por_que: "Margen casi completo; sensibles a los tipos [A12]." },
    { kpi: "Ventas del fundador", nivel_actual: "Plan de hasta 1,09 M de acciones (dic-2026 a jun-2027)", umbral_alerta: "Ampliación o ventas fuera del plan", por_que: "Regla 13 [C14]." },
  ],
  confianza: "Media",
};
