// Textos del analista (Paycom, corte 2026-10-15). Cifras del motor tal cual; hechos con cita de la nota.

export const bpa2028 = { Bajista: 11.79, Base: 13.52, Alcista: 14.69 };
export const per_actual = 19.53;

export const limitaciones = "Cotiza solo en la Bolsa de Nueva York (PAYC), en USD, la misma divisa de las cuentas (US GAAP, millones de USD, ejercicio natural); el 2T26 (abril-junio de 2026) es el último trimestre publicado [A2, A3]. Precio de cierre del 14-oct-2026: al preparar los datos, la sesión del 15 no había cerrado [D1]. Los fondos de clientes (unos 2.900 M USD de saldo medio en el 2T26) y sus obligaciones quedan fuera de la caja y de la deuda del puente porque se anulan entre sí; sus intereses (113,0 M USD en 2025) son ingresos y se separan de los recurrentes [A1, A8]. Las cifras de 2024 llevan la reversión de 117,5 M USD de pagos en acciones del paquete de 2020 del fundador, que se trata como no recurrente; 2025 lleva una plusvalía de 35,5 M USD por la venta de los derechos de nombre del pabellón de Oklahoma City, fuera del resultado de explotación [A1]. El BPA que usamos para el PER histórico está normalizado sin esas partidas, con los pagos en acciones como coste. La fecha de los resultados del 3T26 no está anunciada: el 4-nov-2026 es una estimación [D4]. El patrimonio de 2016 se corrige para que cuadre el balance (ver controles).";

export const controles_explicados = [
  { control: "Activo = pasivo + patrimonio (2016)", explicacion: "El patrimonio de 2016 de la serie XBRL (205,7 M USD) es la cifra reexpresada por la norma de ingresos ASC 606 en el 10-K de 2018, mientras el activo y el pasivo son los publicados en 2016. Se corrige a 116,5 M USD (activo menos pasivo del mismo balance); no afecta a ninguna cifra de la valoración." },
  { control: "Cambio de perímetro declarado (2019)", explicacion: "Paycom no ha comprado ninguna empresa (el fondo de comercio es de 51,9 M USD desde 2016) [A1]. El activo salta por los fondos de clientes, que dependen del día de la semana en que cae el cierre del año y de las nóminas pendientes de pago: no es perímetro." },
  { control: "Cambio de perímetro declarado (2024)", explicacion: "Mismo motivo que en 2019: el activo total crece por los fondos de clientes al 31 de diciembre, no por compras; el fondo de comercio sigue en 51,9 M USD [A1]." },
  { control: "Regresión múltiplo-crecimiento explicativa (R² ≥ 0,3)", explicacion: "Con seis comparables de modelos distintos (nóminas con fondos de clientes, PEO de margen bajo, HCM para grandes empresas e Intuit) el crecimiento no explica el múltiplo (R² de 0,29). No se usa el valor de la regresión." },
  { control: "Comparables estables al quitar una empresa", explicacion: "La mediana del EV/EBITDA de los próximos 12 meses va de 12,8x a 15,1x según se quite Workday o Intuit: la muestra es pequeña y heterogénea. Por eso los comparables pesan solo un 20 % y se promedian EV/EBITDA y PER." },
];

export const parches = [
  { ruta: "balance.historico[0].patrimonio_neto", valor: 116.5 },
];

export const rentabilidad = {
  comentario: "Paycom crea mucho valor: el ROIC fue del 32,8 % en 2025 frente a un WACC del 9,71 %, 23 puntos por encima, y del 29,9-56,3 % desde 2016. No hay fondo de comercio que lo distorsione: sin él el ROIC es del 34,1 %, porque la empresa nunca ha comprado nada [A1]. El ROIC incremental del periodo, del 31,5 %, dice que el capital nuevo (centros de datos, software capitalizado y la sede de Oklahoma City) rinde lo mismo que el viejo. Lo mueve el margen, no la rotación: un margen EBITDA GAAP del 36,2 % en 2025 y del 39,4 % en los últimos 12 meses, con unos pagos en acciones del 5,8 % de las ventas que contamos como coste [A1]. El ROE, inflado tras recomprar el 20 % de las acciones con 900 M USD de deuda en el primer semestre de 2026, no es un buen indicador [A2]. Paychex tiene un ROIC del 26,8 % y ADP del 43,4 % [D9].",
  confianza: "Alta",
};

export const comparables_comentario = "Paycom cotiza a 11,3x el EBITDA de los próximos 12 meses y a 20,1x su BPA, frente a medianas de unos 15x y 20,9x: con descuento por EBITDA y en línea por PER, con el margen EBITDA más alto de la muestra después de Paychex y un crecimiento parecido al de Paylocity [D9, D10]. El descuento en EV/EBITDA lo explican los pagos en acciones (el EBITDA que se compara es ajustado) y la deuda nueva; por PER la diferencia desaparece. La mediana es frágil (de 12,8x a 15,1x según se quite un comparable) y la regresión no explica los múltiplos. Los comparables dan 299,07 USD por EV/EBITDA y 256,09 USD por PER; el segundo es el más fiable porque incluye los pagos en acciones y el coste de la deuda. Paylocity, el rival más parecido, cotiza a 25,6x con un margen 11 puntos menor [D12].";

export const dcf_justificacion = {
  crecimiento: "Ingresos +7,4 % en 2026e (el punto medio de la guía de 2.197-2.212 M USD), +7,0 % en 2027e y 2028e y bajando al 4,5 % en 2033e: un 6,1 % medio [A3]. El primer semestre creció un 8,8 % y la guía implica un 6,5 % en el segundo [A3]. Proyectamos muy por debajo del 22,5 % anual de 2016-2025 porque la empresa ya no gana cuota como antes: Beti canibalizó servicios en 2023-2024, el crecimiento bajó del 23 % de 2023 al 11 % de 2024 y al 9 % de 2025, y los intereses de los fondos (5,5 % de las ventas) bajarán si lo hacen los tipos [A1, C1]. El consenso espera un 7,5 % en 2027 y un 7,9 % en 2028 [D2].",
  margenes: "Margen EBITDA GAAP del 43,0 % en 2026e (la guía de EBITDA ajustado del 46 % menos unos pagos en acciones del 3 % de las ventas), 43,5 % en 2027e y 44,0 % desde 2028e [A3, A9]. Es el margen ajustado del consenso (46,6 % en 2027) menos esos pagos [D2]. La mejora sobre el 36,2 % GAAP de 2025 viene de la plantilla (unos 500 despidos en octubre de 2025) y del ahorro de unos 100 M USD en I+D por los centros de datos propios para IA [A8, B10]. No proyectamos más porque el 44 % ya es el más alto del sector salvo Paychex y una parte del margen son intereses de fondos con margen casi completo.",
  inversion: "Capex del 6,5 % de las ventas (inmovilizado más software capitalizado), frente al 13,4 % de 2025, año de construcción de centros de datos, y a la guía de un 6 % en 2026 [A1, A9]. La amortización baja del 9,3 % de las ventas en 2026e al 6,6 % en 2033e, cuando se agota la de la inversión de 2023-2025; el último año el capex (6,8 %) la supera. Circulante del 2 % de las ventas: el negocio cobra por adelantado y los fondos de clientes no se cuentan. La reinversión neta acumulada es negativa (−210 M USD): el crecimiento sale de precio y volumen sin capital nuevo.",
  wacc: "Tasa libre del 5,21 % (bono de EE. UU. a 10 años, 13-oct-2026) [D5]; beta de 0,90, la media entre la de cinco años mensual (0,79) y la de dos años semanal (1,00), porque la acción es mucho más volátil de lo que dice la beta mensual (46,5 % anual) [D1]; prima de mercado del 5,5 %, la misma que en el informe de Paychex. Coste de la deuda del 6,0 % (la línea renovable a tipo variable, SOFR más diferencial) y un peso del 7,7 % (900 M USD frente a una capitalización de 10.779 M) [A10]. WACC del 9,71 %.",
  terminal: "Crecimiento perpetuo del 3,0 %: un 1 % real más un 2 % de inflación en USD, por debajo del 5,21 % de la tasa libre menos medio punto. El último año explícito crece un 4,5 % con un margen del 44 %; la reinversión terminal cubre el crecimiento con un ROIC muy por encima del WACC. El múltiplo de salida implícito es coherente con el EV/EBITDA de los comparables de crecimiento parecido (ADP, Paychex) [D9].",
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: "2026e", volumen_pct: 4.5, precio_pct: 3.0, otros_pct: -0.1, comentario: "Volumen: clientes nuevos y empleados por cliente, con la retención récord del 91 % [A1]. Precio: subidas anuales de tarifa y módulos como IWant (IA) incluidos en el precio por empleado [A8]. Otros: los intereses de los fondos bajan de 113,0 a unos 105 M USD con la guía [A3]." },
    { periodo: "2027e", volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0.0, comentario: "Mismo patrón: la venta de módulos nuevos (Asset Management, GONE, IWant) a la base y la entrada en empresas de más de 1.000 empleados; el empleo privado de EE. UU. aporta poco [A8, B12]." },
    { periodo: "2028e", volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0.0, comentario: "El precio se mantiene en la línea de la historia; el volumen depende de seguir ganando clientes a Paylocity, Paycor y ADP con menos del 5 % del mercado direccionable [B3]." },
    { periodo: "2029e", volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0.0, comentario: "Desaceleración gradual del volumen por la competencia de Rippling y los agentes de IA en la empresa mediana [B13]." },
  ],
  mercado_final: { periodo: "2033e", tamano: 60600 },
  veredicto: "Sí",
  justificacion: "La calidad de Paycom sostiene el 6,1 % anual que proyectamos: es un tercio del 22,5 % de 2016-2025 y menos que el 8,8 % del primer semestre de 2026 [A3]. Apenas necesita capital (reinversión neta negativa) y el ROIC del 32,8 % triplica el WACC. El crecimiento sale de volumen y precio con una cuota del 5 % de un mercado que crece un 5 % al año, que solo sube al 5,4 % en 2033e. El foso es estrecho (costes de cambio y producto de una sola base de datos), pero la retención del 91 % y la subida de la guía de 2026 en agosto demuestran poder de precios después de Beti [A1, A3].",
};

export const dcf_lectura = "El DCF da 224,65 USD por acción, un 6,0 % por debajo del precio de 239,00 USD, con un valor terminal del 64 % del total. Nuestra proyección coincide con el consenso: 0,2 % menos de ingresos en 2026e y 1,5 % menos en 2028e, con un EBITDA un 3,0 % menor ese año [D2]. La diferencia está en la tasa: el precio descuenta una rentabilidad del 9,3 % anual frente a un WACC del 9,71 %. Con nuestro WACC, el precio pide un crecimiento del 7,0 % anual en 2027e-2033e frente al 5,9 % de nuestro caso base, o un margen EBITDA del 46,2 % frente al 44 %: ni una cosa ni otra es exigente para una empresa que crece un 8,8 % este año. Con la prima de riesgo que hoy pide el mercado (4,20 %, WACC del 8,63 %), el DCF sube a 270,58 USD. La lectura es que el precio está cerca del valor: ni exige mucho ni deja margen de seguridad con el bono de EE. UU. al 5,21 %. El valor depende sobre todo de la tasa de descuento y del crecimiento de 2029e en adelante.";

export const narrativas = {
  Bajista: "La IA reduce las plantillas administrativas de los clientes y Paycom, que cobra por empleado, pierde volumen; Rippling y los agentes de IA aprietan el precio en la empresa mediana y el crecimiento cae al 3-4 %, como en el 2T25 cuando la canibalización de Beti lo bajó al 6 % [A1]. La Reserva Federal baja los tipos y los intereses de los fondos se reducen. Margen 2,5 puntos menor y WACC medio punto mayor.",
  Base: "El crecimiento se estabiliza en el 7 % con precio y módulos nuevos y luego converge al 4,5 %; el margen EBITDA GAAP sube al 44 % con el ahorro de la IA en la propia plantilla; en línea con la guía y el consenso [A3, D2].",
  Alcista: "IWant y los agentes de IA suben el ingreso por cliente y la retención, Paycom gana cuota en la empresa de más de 1.000 empleados tras la venta de Dayforce y el crecimiento vuelve al 9 %; margen del 45,5 % y un WACC un cuarto de punto menor.",
};

export const escenarios_comentario = "La asimetría es mala con nuestro WACC: el alcista gana un 17,9 % (281,87 USD) y el bajista pierde un 35,2 % (154,97 USD), una relación de 0,51x. El bajista es verosímil, porque combina algo que ya pasó (la caída del crecimiento por Beti en 2024-2025) con el riesgo nuevo de que la IA reduzca las plantillas de los clientes, y aun así deja la acción por encima del mínimo de 104,90 USD de las últimas 52 semanas [D1]. Con la prima del mercado (4,20 %) el cuadro cambia: alcista de 345,38 USD, bajista de 181,76 USD y asimetría de 1,86x. Como en Paychex, la conclusión depende más del coste de capital que de las cifras.";

export const suma_partes_comentario = "No aplica: Paycom tiene un solo segmento operativo y no publica resultado por línea de ingresos [A1]. Los intereses de los fondos de clientes (113,0 M USD en 2025, el 5,5 % de las ventas) son un subproducto del proceso de nóminas, no un negocio separable; su sensibilidad a los tipos se trata en los riesgos.";

export const valoracion_comentario = "El DCF pesa un 45 % porque el negocio es recurrente, casi no necesita capital y la proyección coincide con el consenso; los escenarios un 30 % para recoger la asimetría; los comparables un 20 %, por su fragilidad (mediana de 12,8x a 15,1x) y su heterogeneidad; y las transacciones un 5 %, porque llevan prima de control (Dayforce pagó un 32 % y Paycor un 19 %) y el fundador, con un 13 %, no tiene intención declarada de vender [D16, D17, C1]. La dispersión es amplia: del 221,54 USD de los escenarios al 284,42 USD de las transacciones. El valor objetivo de 237,29 USD queda un 0,7 % por debajo del precio; con la prima del mercado, en 271,62 USD (+13,6 %). Los fondos de clientes no suman: se anulan con sus obligaciones.";

export const obj_just = {
  Bajista: "Crecimiento del 4 % en 2027e-2028e por menos empleados en los clientes y presión de precio de Rippling y de los agentes de IA; margen EBITDA GAAP del 41,5 %. BPA de 11,79 USD con 45,5 M de acciones y sin recompras nuevas.",
  Base: "Ingresos de 2.523 M USD en 2028e (+7 % anual) y margen EBITDA GAAP del 44 %; amortización del 8,3 %, intereses de 46 M USD por la línea de 900 M y un 28 % de impuestos. BPA de 13,52 USD, con los pagos en acciones como coste.",
  Alcista: "Crecimiento del 9 % con IWant y cuota en empresas grandes; margen del 45,5 %. BPA de 14,69 USD.",
};

export const per_excluidos = "2019, 2020 y 2021 (107,6x, 134,2x y 85,8x sobre el BPA del año siguiente: burbuja de múltiplos del software). Se usan 2022-2025 (52,8x, 29,2x, 26,9x y 14,7x) y 2018 (39,6x) para la media larga. BPA normalizado: sin la reversión de 117,5 M USD de 2024 ni la plusvalía de 2025; para el cierre de 2025, nuestro BPA de 2026e.";

export const diferencia_consenso = "Nuestro BPA de 2028e (13,52 USD) es un 2,9 % menor que el del consenso (13,92 USD), y el de 2027e (12,24 USD) coincide con él. Pero el del consenso es ajustado, sin pagos en acciones (unos 70 M USD al año, 1,1 USD por acción): con la misma base, el nuestro estaría un 5 % por encima por las recompras de 2026 [D2]. Nuestro precio base (290,68 USD) supera en un 30,6 % el objetivo medio de los analistas (222,59 USD), que está por debajo del precio: los analistas no han subido los objetivos al ritmo de la acción (+50 % desde agosto) [D3].";

export const obj_media = 296.67;

export const obj_comentario = "El objetivo a 12 meses (295,17 USD ponderado) supera en un 24 % al valor intrínseco (237,29 USD). La distancia sale del múltiplo: la regla lleva el PER de 19,5x a 21,5x, un 10 % más, porque la mediana de cinco años (28,1x) está muy por encima, mientras el DCF con un WACC del 9,71 % equivale a unas 18x. Para que el precio llegue al objetivo hace falta que el mercado siga pagando la recuperación (resultados del 3T26 el 4-nov-2026 y guía de 2027 en febrero) y que no suban los tipos a largo. Si el WACC del mercado (8,63 %) es el correcto, el valor intrínseco es de 271,62 USD y la distancia se reduce a la mitad.";

export const catalizadores = {
  items: [
    { fecha: "Hacia el 4-nov-2026 (fecha no anunciada)", evento: "Resultados del 3T26", efecto: "La guía implica un +6,5 % en el segundo semestre; por encima del +7 % confirmaría que la desaceleración de Beti terminó [A3].", probabilidad: "Alta", sentido: "+/−" },
    { fecha: "Diciembre de 2026", evento: "Reunión de la Reserva Federal", efecto: "100 pb de tipos mueven 25,7 M USD de intereses de los fondos (0,41 USD por acción después de impuestos) [A1].", probabilidad: "Media", sentido: "+/−" },
    { fecha: "Febrero de 2027", evento: "Resultados de 2026 y guía de 2027", efecto: "Una guía de ingresos por encima del +7 % sostendría la tesis; por debajo del +5 % la rompería.", probabilidad: "Alta", sentido: "+/−" },
    { fecha: "Primer semestre de 2027", evento: "Uso del resto del programa de recompra (2.000 M USD aprobados; 1.389,7 M usados en el primer semestre de 2026)", efecto: "Unos 610 M USD más reducirían las acciones un 5 % a este precio [A2, A11].", probabilidad: "Media", sentido: "+" },
    { fecha: "Mayo de 2027", evento: "Junta de accionistas", efecto: "El voto de remuneración tuvo un 39,1 % en contra en 2026; otro voto en contra mayoritario obligaría a cambiar el paquete del fundador [C2].", probabilidad: "Media", sentido: "+/−" },
    { fecha: "Mayo de 2027", evento: "Resultados del 1T27 (el trimestre de más margen)", efecto: "Primera lectura de la retención y de los empleados por cliente tras la temporada de altas de enero.", probabilidad: "Alta", sentido: "+/−" },
  ],
  confianza: "Media",
};

export const riesgos = {
  items: [
    { riesgo: "La IA reduce las plantillas administrativas de los clientes (Paycom cobra por empleado) y abarata el software de nóminas y RR. HH.", tipo: "Tecnología y competencia", probabilidad: "Media", impacto: "Alto", efecto_valor: "−10 % a −35 % (escenario bajista: −35,2 %)", mitigante: "La propia Paycom usa la IA para recortar costes (unos 500 despidos y 100 M USD menos de I+D) y la integra en el producto (IWant); la nómina es regulada y el cliente necesita un responsable [A8, B10].", senal: "Empleados por cliente a la baja o retención por debajo del 90 %." },
    { riesgo: "Desaceleración del crecimiento: de +23 % en 2023 a +9 % en 2025 y +6,5 % implícito en el segundo semestre de 2026", tipo: "Operativo", probabilidad: "Media", impacto: "Medio", efecto_valor: "−10 % por cada punto menos de crecimiento sostenido (estimación propia con el DCF)", mitigante: "Retención récord del 91 % y guía subida en agosto [A1, A3].", senal: "Guía de ingresos de 2027 por debajo del +5 %." },
    { riesgo: "Competencia en la empresa mediana: Rippling, Paylocity, Paychex con Paycor, ADP y Dayforce en manos de Thoma Bravo", tipo: "Competencia", probabilidad: "Media", impacto: "Medio", efecto_valor: "−5 % a −15 % (estimación propia)", mitigante: "Margen EBITDA ajustado del 46 %, que deja espacio para competir en precio [A3].", senal: "Retención por debajo del 90 % o rebajas de precio en la renovación." },
    { riesgo: "Bajada de tipos: los intereses de los fondos de clientes (113,0 M USD en 2025) tienen margen casi completo", tipo: "Mercado", probabilidad: "Media", impacto: "Bajo", efecto_valor: "−3 % por cada 100 pb (25,7 M USD; 0,41 USD por acción) [A1]", mitigante: "El saldo medio de fondos crece un 9 % [A8].", senal: "Rentabilidad media de la cartera de fondos por debajo del 3,5 %." },
    { riesgo: "Gobierno: fundador consejero delegado y presidente, remuneración de 22,8 M USD y un 39,1 % de votos en contra en 2026", tipo: "Gobierno", probabilidad: "Media", impacto: "Medio", efecto_valor: "−5 % a −10 % (descuento de múltiplo; estimación propia)", mitigante: "El fundador tiene un 13 %, no vende y renunció al paquete de 2020 [C1].", senal: "Nuevo paquete especial o ventas del fundador." },
    { riesgo: "Deuda nueva de 900 M USD a tipo variable para recomprar acciones a 127 USD de media", tipo: "Financiero", probabilidad: "Baja", impacto: "Medio", efecto_valor: "−3 % a −5 % (estimación propia)", mitigante: "Deuda neta de 0,8 veces el EBITDA y vencimiento en 2031 [A10].", senal: "Más deuda para recompras con la acción por encima del valor intrínseco." },
    { riesgo: "Coste de capital: bono de EE. UU. al 5,21 %", tipo: "Mercado", probabilidad: "Media", impacto: "Medio", efecto_valor: "−7 % por cada medio punto más de WACC (sensibilidad del DCF: 208,08 USD)", mitigante: "Más tipos suben también los intereses de los fondos [A1].", senal: "Bono a 10 años por encima del 5,5 %." },
    { riesgo: "Seguridad de datos de millones de trabajadores y personas clave", tipo: "Operativo y reputacional", probabilidad: "Baja", impacto: "Alto", efecto_valor: "−5 % a −15 % según el alcance (estimación propia)", mitigante: "Certificaciones ISO 27001 y 42001 y centros de datos propios [A1].", senal: "Incidente comunicado en un 8-K." },
  ],
  premortem: "Octubre de 2029: la acción ha perdido un 40 % y cotiza por debajo de 145 USD. Empezó en la guía de 2027, de un +5 %: los clientes de Paycom, empresas de 50 a 5.000 empleados, recortaron personal de administración, atención y back office con agentes de IA y el ingreso por empleado dejó de crecer. A la vez, Rippling y Dayforce, ya privada, regalaron meses de servicio para quitarle clientes en la renovación, y la retención bajó del 91 % al 88 %. La Reserva Federal bajó los tipos 200 pb y los intereses de los fondos cayeron unos 50 M USD. El margen aguantó por la IA interna, pero el mercado dejó de ver a Paycom como un compuesto del 7-8 % y la valoró como Paychex, a 15x beneficios. La deuda de 900 M USD, tomada para recomprar en 2026, se refinanció más cara. El indicador que lo habría anticipado: los empleados por cliente y la retención anual del 10-K, dos años antes de que se notara en los ingresos.",
  ia: {
    exposicion: "Media",
    sentido: "Mixto",
    efecto_valor: "−10 % a 3-5 años (entre el caso base y el bajista); hasta −35 % si se combina con la presión de precio",
    comentario: "La IA toca a Paycom por tres lados. Por los ingresos: cobra por empleado procesado, y si la IA reduce las plantillas administrativas de sus clientes (empresas de 50 a 10.000 empleados), el volumen se resiente aunque no pierda ni un cliente [A1]. Por la competencia: agentes que hacen la nómina o los RR. HH. abaratan la entrada a rivales como Rippling y comprimen el precio [B13]. A favor, los costes: unos 500 despidos en octubre de 2025 y 100 M USD menos de I+D con centros de datos propios [A8, B10]. La nómina es regulada (impuestos, cumplimiento, responsabilidad) y el dato propio de una sola base de datos es una defensa; no vemos que la IA se coma el negocio a 3-5 años, pero sí que limite el crecimiento. Señal: empleados por cliente y retención anual por debajo del 90 %.",
  },
  confianza: "Media",
};

export const preguntas = {
  items: [
    { tema: "IA y volumen", pregunta: "¿Cómo han evolucionado los empleados por cliente en 2025-2026 y qué parte del crecimiento es precio, módulos y altas netas de clientes?", por_que: "Paycom cobra por empleado; es la variable que la IA puede romper y la empresa no la publica." },
    { tema: "Desaceleración", pregunta: "¿Por qué la guía implica un +6,5 % en el segundo semestre tras un +8,8 % en el primero?", por_que: "Cada punto de crecimiento sostenido mueve el valor en torno a un 10 %." },
    { tema: "Recompras con deuda", pregunta: "¿Se usará el resto del programa (unos 610 M USD) con más deuda y a qué precio dejaría de recomprar?", por_que: "Se recompró el 20 % del capital a 127 USD; recomprar por encima del valor intrínseco destruiría valor [A2]." },
    { tema: "Remuneración", pregunta: "¿Qué cambiará el comité de retribuciones tras el 39,1 % de votos en contra y por qué no hay métricas de rentabilidad ni de flujo de caja?", por_que: "El paquete de 18,4 M USD en acciones del fundador pesa en el gobierno [C1, C2]." },
    { tema: "Fondos de clientes", pregunta: "¿Qué duración tiene la cartera de fondos y cuánto cambiaría el ingreso con una bajada de 200 pb?", por_que: "Son 105-113 M USD de ingresos con margen casi completo [A1]." },
    { tema: "Capex y amortización", pregunta: "¿Qué parte del capex de 2025 (275,4 M USD) fue de centros de datos para IA y cuándo baja la amortización?", por_que: "La amortización (9 % de las ventas) supera al capex previsto y marca el margen GAAP [A1]." },
    { tema: "Retención", pregunta: "¿Qué parte de la retención récord del 91 % se debe a clientes que vuelven a la nómina con servicio tras Beti?", por_que: "Mide si la canibalización terminó o solo se frenó [A1]." },
  ],
  confianza: "Media",
};

export const fuentes = [
  { id: 1, titulo: "Tipos de cambio de referencia del euro (USD, 14-oct-2026)", editor: "Banco Central Europeo", tipo: "Datos de mercado", fecha: "2026-10-14", url: "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml" },
];

export const huecos = [];

export const resumen = {
  recomendacion: "Mantener",
  conviccion: "Baja",
  justificacion_recomendacion: null,
  horizonte: "12 meses",
  sintesis: `**La recomendación y por qué.** Mantener con convicción baja. El objetivo a 12 meses es de 295,17 USD (24,1 % de rentabilidad ponderada y 22,3 % en el caso base, con dividendo), pero el valor intrínseco, 237,29 USD, queda un 0,7 % por debajo del precio de 239,00 USD, y la regla exige que no lo esté para comprar; el objetivo medio de los analistas es de 222,59 USD. La asimetría de los escenarios es mala con nuestro WACC (alcista +17,9 %, bajista −35,2 %, 0,51x). La convicción es baja, no la media que sugiere el motor, porque la decisión depende de un 0,7 % entre valor y precio: la subiría un precio por debajo de 237,29 USD o una guía de 2027 por encima del +7 %; la bajaría una retención por debajo del 90 %.

**El negocio.** Paycom vende nóminas y RR. HH. en una sola base de datos a empresas medianas de EE. UU. [A1]. El ROIC es del 32,8 % frente a un WACC del 9,71 % (23 puntos más; 34,1 % sin fondo de comercio) y el margen EBITDA ajustado del 46 % previsto para 2026 es el segundo del sector tras Paychex [A3]. Calidad: **Sí**. La calidad de la empresa sostiene el crecimiento que proyectamos (veredicto «Sí», el mismo que el del motor): un 6,1 % anual, un tercio de su historia, sin capital nuevo y con una cuota que solo sube del 5,0 % al 5,4 %.

**Finanzas.** Los ingresos crecieron un 8,8 % en el primer semestre y la guía implica un 6,5 % en el segundo [A3]. Separamos los intereses de los fondos de clientes (113,0 M USD en 2025, el 5,5 % de las ventas): 100 pb de tipos mueven 0,41 USD por acción [A1]. El BPA se normaliza sin partidas únicas y con los pagos en acciones como coste. La empresa recompró el 20 % de sus acciones a 127 USD con 900 M USD de deuda: deuda neta de 0,8 veces el EBITDA [A2].

**Equipo y gobierno.** Resta. El fundador es consejero delegado y presidente, tiene un 13 % y no vende, pero cobró 22,8 M USD en 2025 y el voto de remuneración tuvo un 39,1 % en contra (47,1 % del capital libre) [C1, C2].

**Valoración.** El DCF da 224,65 USD; los comparables 277,58 USD; los escenarios 221,54 USD. El precio descuenta un 7,0 % de crecimiento anual frente a nuestro 5,9 %, o una rentabilidad del 9,3 % frente al 9,71 % del WACC. Con la prima del mercado (4,20 %) el valor sube a 271,62 USD (+13,6 %). Coincidimos con el consenso en las cifras; discrepamos en la tasa.

**Riesgos y catalizadores.** El mayor es la IA. Su exposición es media y su efecto mixto: puede reducir las plantillas de los clientes (Paycom cobra por empleado) y abaratar la entrada de rivales, pero ya le baja los costes. No vemos que la IA se coma el negocio a 3-5 años, pero sí que limite el crecimiento: −10 % de valor, −35,2 % si se suma presión de precio. Le siguen la desaceleración y los tipos. Los resultados del 3T26 (hacia el 4-nov-2026) y la guía de 2027 en febrero son los catalizadores. Los foros son positivos tras una subida de más del 100 % desde el mínimo, por delante de los analistas [E1, E2].

**Qué cambiaría la decisión.** Compraríamos por debajo de 237,29 USD y venderíamos por encima de 329,63 USD. Una guía de 2027 por encima del +7 % con retención estable subiría el caso base; una retención por debajo del 90 % o una guía por debajo del +5 % nos llevaría a revisar a la baja. Una acción cuesta unos 213 EUR (1,1195 USD/EUR del BCE), el 0,7 % de una cartera de 30.000 EUR, por debajo del 7 % [P1].`,
  tesis: "Paycom vende nóminas, tiempo, talento y RR. HH. en una sola base de datos a unas 39.200 empresas medianas de EE. UU., con una retención del 91 %, un margen EBITDA ajustado del 46 % y un ROIC del 32,8 % sin haber comprado nunca nada [A1, A3]. Cobra por empleado y custodia los fondos de las nóminas, cuyos intereses (113,0 M USD) suman un 5,5 % de las ventas [A1].\n\nEl precio, 239,00 USD, ha subido más de un 100 % desde el mínimo de 104,90 USD y descuenta un crecimiento del 7,0 % anual con nuestro WACC: poco más que el 5,9 % de nuestro caso base y menos que el 8,8 % del primer semestre [D1, A3]. Cotiza a 20,1x el BPA de los próximos 12 meses, en línea con los comparables y muy por debajo de su mediana histórica.\n\nEl mercado acierta en que la desaceleración de 2023-2025 por Beti terminó y en que la IA ya le baja los costes. Para invertir hay que creer que el crecimiento se sostiene en el 7 % a pesar de que la IA puede reducir las plantillas de sus clientes. A este precio, el valor intrínseco no deja margen: el atractivo está en el múltiplo a 12 meses, no en el DCF.",
  vision_diferencial: {
    mercado_descuenta: "Un crecimiento del 7,0 % anual con nuestro WACC, o una rentabilidad del 9,3 % anual con nuestras cifras: el mercado ya ha pagado la recuperación tras Beti y las recompras, y cotiza por encima del objetivo medio de 21 analistas (222,59 USD; 13 en mantener) [D3].",
    nuestra_vision: "Coincidimos con el consenso en las cifras (diferencia de 0,2-1,5 % en ingresos). Discrepamos en dos cosas: el PER puede subir algo más hacia su historia (la regla da 21,5x frente a 19,5x) y el riesgo de la IA sobre el volumen de empleados está mal medido en los dos sentidos.",
    por_que: "La caída del 79 % desde 2021 llevó el PER adelantado a 14,7x en 2025, su mínimo; la recuperación lo ha llevado a 19,5x, todavía lejos de la mediana de 28,1x. Pero con el bono al 5,21 % el valor intrínseco no deja margen: el rendimiento a 12 meses depende del múltiplo, no de un error en las cifras.",
  },
  a_favor: [
    "**ROIC del 32,8 %**, 23 puntos por encima del WACC y sin fondo de comercio.",
    "**Margen EBITDA ajustado del 46 %** en la guía de 2026, el segundo del sector [A3].",
    "**Retención récord del 91 %** tras la canibalización de Beti [A1].",
    "**PER adelantado de 19,5x** frente a una mediana de cinco años de 28,1x.",
    "**La IA ya le baja los costes**: unos 100 M USD menos de I+D y 500 puestos menos [A8, B10].",
  ],
  en_contra: [
    "**Valor intrínseco de 237,29 USD**, un 0,7 % por debajo del precio.",
    "**Asimetría mala**: alcista del +17,9 % frente a bajista del −35,2 %.",
    "**Cobra por empleado**: la IA puede reducir las plantillas de sus clientes.",
    "**Gobierno débil**: 39,1 % de votos en contra de la remuneración en 2026 [C2].",
    "**900 M USD de deuda** para recomprar acciones a 127 USD [A2].",
  ],
  que_vigilar: "La tesis depende de que el crecimiento se mantenga en el 7 % con precio y módulos mientras la IA no reduce el número de empleados por cliente. La señal de que no se cumple sería un 3T26 por debajo del +6 %, una guía de ingresos de 2027 inferior al +5 % o una retención por debajo del 90 % en el 10-K de febrero de 2027.",
  cambiaria_recomendacion: [
    "Precio por debajo de 237,29 USD: pasaríamos a Comprar.",
    "Precio por encima de 329,63 USD: pasaríamos a Vender.",
    "Guía de ingresos de 2027 por encima del +7 % con retención estable: subiríamos el caso base hacia Comprar.",
    "Retención por debajo del 90 % o guía de 2027 por debajo del +5 %: revisaríamos a la baja.",
    "Bono a 10 años de EE. UU. por debajo del 4,5 %: el WACC bajaría unos 0,65 puntos, el DCF subiría a unos 238 USD y el valor intrínseco superaría al precio.",
  ],
  kpis_seguimiento: [
    { kpi: "Crecimiento de ingresos recurrentes", nivel_actual: "+8,8 % (1S26); guía +7,2-7,9 % en 2026", umbral_alerta: "< +6 % en un trimestre", por_que: "Es la variable del caso base [A3]." },
    { kpi: "Retención anual de ingresos", nivel_actual: "91 % (2025)", umbral_alerta: "< 90 %", por_que: "Mide el foso frente a la IA y a los rivales [A1]." },
    { kpi: "Margen EBITDA ajustado", nivel_actual: "46 % (guía 2026)", umbral_alerta: "< 44 %", por_que: "El BPA de 2028e depende de él [A3]." },
    { kpi: "Intereses de los fondos de clientes", nivel_actual: "≈105 M USD (guía 2026)", umbral_alerta: "< 90 M USD", por_que: "Margen casi completo; sensibles a los tipos [A1]." },
    { kpi: "Deuda y recompras", nivel_actual: "900 M USD; 1.389,7 M recomprados en el 1S26", umbral_alerta: "Más deuda para recomprar por encima de 237 USD", por_que: "Asignación de capital [A2]." },
  ],
  confianza: "Media",
};
