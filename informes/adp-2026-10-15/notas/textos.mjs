// Textos del analista (ADP, corte 2026-10-15). Cifras del motor tal cual; hechos con cita de la nota.

export const limitaciones = "ADP cotiza solo en el Nasdaq (ADP), en USD, la misma divisa de sus cuentas (US GAAP, millones de USD). El ejercicio cierra el 30 de junio y se nombra por el año en que termina: FY2026 = julio de 2025 a junio de 2026; el último publicado es el 10-K de FY2026 y el siguiente resultado (1T27, julio-septiembre de 2026) sale el 28-oct-2026 [A1, D11]. Precio de cierre del 14-oct-2026 (280,32 USD; 250,40 EUR al cambio del BCE de 1,1195 USD por euro): al preparar los datos la sesión del 15 no había cerrado [D1, P1]. Acciones: 397,3 millones a 31-jul-2026 más 0,9 de dilución por opciones y acciones restringidas; no se descuentan las recompras posteriores [D7]. Los fondos de clientes (43.957,8 M) y sus obligaciones (44.415,5 M) quedan fuera de la caja y de la deuda; la financiación a corto de la estrategia de fondos (papel comercial y repos) también, porque se casa con inversiones corporativas del mismo importe [A1]. El EBIT de este informe deja en el resultado financiero los intereses corporativos y la financiación de la estrategia de fondos; el EBIT ajustado de ADP los deja dentro (40 M de diferencia en FY2026) [A3]. Las cifras de FY2017-FY2019 pueden mezclar datos reexpresados por la norma de ingresos ASC 606 (ver controles). La serie de ingresos trimestrales de FY2025 no tiene el crecimiento interanual publicado en los documentos leídos.";

export const controles_explicados = [
  { control: "Activo = pasivo + patrimonio (FY2017)", explicacion: "La serie XBRL de FY2017 mezcla el patrimonio reexpresado por la norma de ingresos ASC 606 (adoptada con reexpresión completa en FY2019) con el pasivo original. Se corrige el pasivo total a activo menos patrimonio (34.909,9 M USD); no afecta a la valoración." },
  { control: "Regresión múltiplo-crecimiento explicativa (R² ≥ 0,3)", explicacion: "Con seis comparables de modelos distintos (PEO de margen bajo, HCM para grandes empresas, nóminas con fondos de clientes e Intuit) el crecimiento no explica el múltiplo. No se usa el valor de la regresión." },
];

export const parches = [
  { ruta: "balance.historico[0].pasivo_total", valor: 34909.9 },
];

export const fuentes = [
  { id: 1, titulo: "Euro foreign exchange reference rates (eurofxref-daily), 14-oct-2026", editor: "Banco Central Europeo", tipo: "Datos de mercado", fecha: "2026-10-14", url: "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml" },
];

export const rentabilidad = {
  comentario: "ADP crea mucho valor. El ROIC del motor es del 67,1 % en FY2026 (129,7 % sin fondo de comercio) frente a un WACC del 9,62 %, y lleva por encima del 40 % todo el decenio; el ROIC incremental es del 77,2 %. Esas cifras las inflan las recompras, que dejan el patrimonio en 6.031,2 M USD, así que lo calculamos también a mano sobre el capital operativo (estimación propia, balance de 30-jun-2026 [A1]): activos operativos de 15.005,4 M (clientes, otros corrientes, inmovilizado, derechos de uso, costes de contrato activados, otros activos, fondo de comercio e intangibles) menos pasivos operativos de 6.971,3 M (proveedores, gastos y nóminas devengados, ingresos diferidos, arrendamientos, otros pasivos e impuestos) dan 8.034,1 M. Con un NOPAT de 4.554 M (EBIT sin partidas únicas de 5.914,8 M al 23 %), el ROIC es del 56,7 %, 47 puntos por encima del WACC; sin los intereses de los fondos de clientes (1.354,8 M), del 43,7 %; sin fondo de comercio, del 95,9 %. Lo mueve el margen (EBIT del 27 % con el flotante) y una rotación alta del capital operativo, no el apalancamiento. Paychex tiene un 26,8 % y Paycom un 32,8 % [D9].",
  confianza: "Alta",
};

export const comparables_comentario = "ADP cotiza a 15,7 veces el EBITDA de los próximos 12 meses y a 22,3 veces su BPA, frente a medianas de 12,1 y 20,4 veces de los seis comparables [D9, D10]: con prima en los dos. La prima en PER (un 9 %) se justifica por la calidad: retención del 92,1 %, ROIC muy superior y el flotante de 40.400 M; la de EV/EBITDA es mayor porque varios comparables usan un EBITDA ajustado sin pagos en acciones y el de ADP es GAAP. Los comparables dan 215,18 USD por EV/EBITDA y 255,96 USD por PER; usamos sobre todo el PER, que recoge igual los pagos en acciones. La regresión no explica los múltiplos (R² de 0,29). Paychex, el rival más parecido, cotiza a 19,0 veces con más margen y menos crecimiento; Workday (31,4 veces) e Intuit (14,9 veces) marcan los extremos [D10].";

export const dcf_justificacion = {
  crecimiento: "Ingresos +5,5 % en FY2027e, el punto medio de la guía (+5-6 %), +5,5 % en FY2028e y FY2029e y bajando al 3,5 % en FY2034e: un 4,8 % medio [D8]. Es menos que el 6,6 % anual de FY2017-FY2026, que llevó el viento de cola de los tipos (los intereses de los fondos pasaron de unos 500 M a 1.354,8 M) y del PEO, cuyas primas repercutidas crecen sin margen [A1, A3]. El consenso espera un 5,8 % en FY2027 y un 5,7 % en FY2028 [D2]. El crecimiento sale de nuevas ventas netas de bajas (unos 3 puntos), precio (algo más de 1,3 puntos) y empleados por cliente (0-1 %) [A7].",
  margenes: "Margen EBITDA del 30,2 % en FY2027e (la guía de +70-90 pb de margen EBIT ajustado sobre el 26,8 %, más una amortización del 2,7 % de las ventas), subiendo hasta el 32,3 % en FY2033e [D8]. ADP ha ganado entre 60 y 80 pb al año en FY2024-FY2026 por eficiencia del servicio (IA en atención y ventas) y por el flotante [A3, A7]. Dejamos de subir el margen a partir de FY2033e porque el PEO (13,1 % de margen) crece con primas repercutidas y porque el precio frente a Rippling y Gusto no permite más en pymes. No suponemos ahorros extra por IA.",
  inversion: "Capex del 3,5 % de las ventas hasta FY2032e y del 3,3 % al final, frente al 3,5 % de FY2026 (196,6 M de inmovilizado, 468,5 M de software e intangibles y 107,4 M de aumento neto de comisiones e implantación activadas) [A3]. Amortización del 2,7 % de las ventas, como en FY2026. Circulante comercial (clientes menos proveedores) del 15,0 % de las ventas, cerca del 15,3 % de FY2026; es conservador, porque los gastos y nóminas devengados (unos 4.258 M) crecen con las ventas y compensan buena parte: el circulante amplio de ADP es negativo [A1].",
  wacc: "WACC del 9,62 %: tasa libre del 5,21 % (bono de EE. UU. a 10 años del 13-oct-2026) [D5], beta de 0,85 (la ajustada de cinco años mensual es 0,87 y la semanal 0,83; la semanal de dos años, 0,52) [D1], prima de mercado del 5,5 % y coste de la deuda del 4,75 % antes de impuestos (el bono de 2036 se emitió al 5,00 %) con un peso del 4,3 % a valor de mercado [A9]. Con la prima implícita del mercado (4,2 %), el WACC baja al 8,56 % [D6]. Con la beta semanal de dos años el valor subiría un 20-25 %: la recomendación depende de la tasa de descuento más que de las cifras.",
  terminal: "Gordon con un crecimiento del 3,0 %, por debajo de la tasa libre menos medio punto y en línea con el PIB nominal de EE. UU. a largo plazo, porque ADP cobra por empleado y por salario (crecen con el empleo y la inflación). El valor terminal pesa un 63 % del DCF. El múltiplo de salida implícito (unas 15 veces el EBITDA) queda por debajo de las 17,3 veces de hoy y de la media de diez años, de 19,4 veces.",
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: "FY2027e", volumen_pct: 3.5, precio_pct: 1.3, otros_pct: 0.7, comentario: "Volumen: nuevas ventas de Employer Services +4-7 % con retención −10 a −30 pb, empleados por cliente 0-1 % y empleados del PEO +2 %; precio: algo más de 1,3 puntos, como en FY2026; otros: intereses de fondos +14-15 % (1.540-1.560 M) menos divisa [A3, A7]." },
    { periodo: "FY2028e", volumen_pct: 3.5, precio_pct: 1.3, otros_pct: 0.7, comentario: "Mismo patrón; los intereses de los fondos suben menos (la cartera ya rinde ≈3,7 %), y las primas repercutidas del PEO siguen sumando ingresos sin margen [A3]." },
    { periodo: "FY2029e", volumen_pct: 3.5, precio_pct: 1.3, otros_pct: 0.7, comentario: "Lyric y la nómina global en grandes empresas compensan la presión de precios en pymes [A7]." },
    { periodo: "FY2030e", volumen_pct: 3.2, precio_pct: 1.2, otros_pct: 0.6, comentario: "Menos ayuda de los tipos; precio en línea con la inflación salarial." },
    { periodo: "FY2031e", volumen_pct: 3.2, precio_pct: 1.2, otros_pct: 0.6, comentario: "Crecimiento de un negocio maduro, con cuota estable." },
  ],
  mercado_final: null,
  veredicto: "Sí",
  justificacion: "La calidad de ADP sostiene con holgura un crecimiento medio del 4,8 %. Es un negocio de activos ligeros: la proyección reinvierte el 6 % del NOPAT y, con la reinversión bruta, el ROIC actual financiaría un 12,3 % [calc]. La prueba que importa es el poder de precios y la cuota: el precio aporta más de 1,3 puntos al año con la retención estable en el 92,1 % y las nuevas ventas creciendo un 6 % [A3, A7]. Proyectamos menos que el 6,6 % histórico y menos que el consenso. La cuota no se puede medir con una fuente (mercado_final nulo), pero un crecimiento del 4,8 % es parecido al del mercado de servicios de nóminas (4,7 % anual en 2017-2022 según el Census) [B6]: no exige ganar cuota.",
};

export const dcf_lectura = "El DCF da 210,32 USD por acción, un 25,0 % por debajo del precio, con un valor terminal del 63 %. Con la prima implícita del mercado (WACC del 8,56 %) sube a 250,93 USD, aún un 10,5 % por debajo. El DCF inverso es la clave: a 280,32 USD el mercado descuenta un crecimiento medio del 9,8 % anual en FY2027e-FY2034e, frente al 4,8 % de nuestro caso base y al 6,6 % de la década pasada, o un margen EBITDA final del 41,4 % en lugar del 32,3 %; dicho de otro modo, el precio implica una rentabilidad anual del 8,0 %, por debajo de nuestro WACC (9,62 %) y del que pide hoy el mercado para su beta (8,56 %). Eso es exigente frente a la historia: ADP nunca ha crecido al 9-10 % sin tipos al alza ni compras. La lectura honesta es que el mercado paga por ADP lo que vale un bono de calidad con crecimiento: acepta una rentabilidad menor a cambio de la estabilidad (retención del 92 %, más de 50 años de dividendo creciente). Si la tasa libre bajara al 4,5 %, el DCF se acercaría al precio.";

export const narrativas = {
  Bajista: "La IA y una economía floja reducen la plantilla de oficina de los clientes: los empleados por cliente caen un 1-2 % al año durante dos años, la retención baja al 90-91 % por la presión de Rippling y Gusto en pymes, y la Fed recorta 150 pb, con lo que los intereses de los fondos dejan de crecer. Crecimiento medio del 2,3 % y margen final del 30,8 %. Ya pasó en FY2010 (ingresos a la baja) y en 2020 (empleo −6 %).",
  Base: "Lo que guía la empresa: ingresos +5,5 %, margen +60-80 pb al año, empleados por cliente 0-1 %, precio de algo más de 1,3 puntos y tipos estables o algo al alza. La IA abarata el servicio de ADP y no reduce el empleo de los clientes de forma medible en tres años.",
  Alcista: "Lyric y la nómina global ganan cuota en multinacionales, la IA se cobra como módulo (agentes de ADP Assist) y los tipos se quedan altos: crecimiento medio del 6,3 % y margen final del 33,3 %, como en FY2023-FY2024.",
};

export const escenarios_comentario = "La asimetría es mala con nuestro WACC: el alcista vale 254,40 USD (−9,2 %) y el bajista 153,54 USD (−45,2 %); incluso el caso optimista queda por debajo del precio, porque la tasa de descuento del 9,62 % pesa más que el crecimiento. Con la prima del mercado, el rango va de 178,10 a 308,98 USD y la asimetría es de 0,28 veces. A 12 meses, con la regla de múltiplos, la asimetría es mejor (+27,9 % en el alcista frente a −19,8 % en el bajista), porque el PER histórico de ADP (24 veces) sostiene el precio aunque el DCF no lo haga. El escenario bajista es verosímil: combina la caída de empleo que ya vivió en 2009-2010 y 2020 con la bajada de tipos.";

export const suma_partes_comentario = "No aplica: Employer Services y el PEO comparten clientes, red comercial, tecnología y fondos de clientes, y el PEO (13,1 % de margen) no tiene comparables cotizados de calidad (TriNet e Insperity, con márgenes del 1-7 %). Separarlos no añade información al DCF.";

export const obj_just = {
  Bajista: "Ventas de FY2028e de 23.284 M (+3,0 % al año) y margen EBITDA del 29,3 %: los empleados por cliente caen y los tipos bajan. BPA de 11,79 USD, un 10 % menos que el base. PER del mínimo de cinco años (18,5 veces, el de junio de 2026 en pleno miedo a la IA).",
  Base: "Ventas de 24.428 M (+5,5 % al año) y margen EBITDA del 30,8 % en FY2028e, según la guía de FY2027 y su prolongación; resultado financiero de −95 M y tipo del 23 %. BPA de 13,09 USD sobre 398,2 millones de acciones, sin recompras futuras.",
  Alcista: "Ventas de 25.128 M (+7,0 % al año) y margen del 31,8 %: Lyric, nómina global y módulos de IA, con tipos altos. BPA de 13,96 USD.",
};

export const per_excluidos = "Historia adelantada (precio de cierre de cada ejercicio, a 30 de junio, ÷ BPA del ejercicio siguiente): FY2019 29,0x; FY2020 24,5x; FY2021 28,4x; FY2022 25,6x; FY2023 24,2x; FY2024 23,9x; FY2025 27,7x (sobre el BPA normalizado de FY2026, 11,12 USD); FY2026 18,4x (sobre nuestro FY2027e, 12,14 USD). Ningún año excluido: no hay pérdidas ni burbujas. BPA GAAP de FY2020-FY2025, que en ADP apenas difiere del ajustado (menos de un 3 %). Mediana y mínimo de los cinco últimos cierres (FY2022-FY2026) y media de ocho.";

export const diferencia_consenso = "Nuestro BPA de FY2027e (12,14 USD) queda un 0,8 % por debajo del consenso (12,24 USD) y el de FY2028e (13,09 USD) un 2,2 % por debajo (13,39 USD) [D2]. La diferencia es casi toda de recompras: el consenso supone que ADP sigue recomprando un 2 % de las acciones al año, como guía la empresa, y nosotros usamos las acciones de hoy. Ventas y margen coinciden con el consenso. Nuestro objetivo base (308,92 USD) supera en un 7,9 % al objetivo medio de los analistas (286,40 USD), porque aplicamos el PER de su historia (24 veces) y la mayoría de analistas descuenta un múltiplo menor por el riesgo de la IA.";

export const obj_media = 292.94;

export const obj_comentario = "El objetivo a 12 meses (296,94 USD) queda un 34 % por encima del valor intrínseco (221,23 USD). La distancia no se cierra con un catalizador: refleja que el mercado descuenta a ADP con una rentabilidad del 8,0 % y nosotros con un WACC del 9,62 %. La regla de múltiplos supone que ADP seguirá cotizando a su PER de los últimos cinco años (24 veces), lo que es probable mientras los tipos y la percepción de la IA no cambien; el DCF dice que a ese múltiplo la rentabilidad a largo plazo es la de un bono. Por eso la tesis no es de compra: la rentabilidad a 12 meses (8,3 % ponderada) sale del crecimiento del BPA y del dividendo, no de una revalorización.";

export const valoracion_comentario = "Pesos: DCF 45 %, escenarios 30 %, comparables 20 % y transacciones 5 %. El DCF es el método más fiable para un negocio tan estable y de activos ligeros; los escenarios recogen el riesgo de empleo, tipos e IA. Los comparables pesan poco porque mezclan PEO de margen bajo, HCM de grandes empresas e Intuit, y las transacciones casi nada: ADP es demasiado grande para una opa y su EV/ventas lo distorsionan los 4.607,3 M de primas repercutidas sin margen del PEO [A3]. La dispersión es grande: de 210,32 USD (DCF) a 346,49 USD (transacciones), con los comparables por PER en 255,96 USD. Todos los métodos de valor quedan por debajo del precio salvo las transacciones; solo el PER histórico (24 veces) lo justifica. El valor objetivo ponderado es de 221,23 USD (−21,1 %) y 251,53 USD con la prima implícita del mercado.";

export const catalizadores = {
  items: [
    { fecha: "2026-10-28", evento: "Resultados del 1T27 (julio-septiembre de 2026)", efecto: "Primer dato de empleados por cliente, retención y nuevas ventas del año; confirmación de la guía", probabilidad: "Alta", sentido: "+/−" },
    { fecha: "2026-11-11", evento: "Junta de accionistas y subida anual del dividendo", efecto: "Subida del dividendo (≈7-10 %, estimación propia) y renovación del consejo", probabilidad: "Alta", sentido: "+" },
    { fecha: "2026-11 a 2027-06", evento: "Decisiones de tipos de la Fed", efecto: "El mercado descuenta subidas de 25-50 pb: cada 25 pb en toda la curva suman unos 21 M de beneficio antes de impuestos a 12 meses", probabilidad: "Media", sentido: "+/−" },
    { fecha: "Mensual", evento: "Informe nacional de empleo de ADP y empleo oficial", efecto: "Indicador adelantado de los empleados por cliente", probabilidad: "Alta", sentido: "+/−" },
    { fecha: "2027-01", evento: "Resultados del 2T27", efecto: "Revisión de la guía de FY2027 (ADP la eleva casi siempre a mitad de año)", probabilidad: "Media", sentido: "+" },
    { fecha: "2027", evento: "Monetización de los agentes de IA (ADP Assist) y avance de Lyric", efecto: "Si ADP empieza a cobrar la IA como módulo, sube la tesis alcista", probabilidad: "Baja", sentido: "+" },
  ],
  confianza: "Media",
};

export const riesgos = {
  items: [
    { riesgo: "La IA reduce la plantilla de oficina de los clientes (ADP cobra por empleado)", tipo: "Tecnológico / mercado", probabilidad: "Media", impacto: "Alto", efecto_valor: "−15 % a −27 % (de base a bajista del DCF)", mitigante: "La mitad de los ingresos no depende del número de empleados de oficina (PEO, jubilación, seguros, servicios de cumplimiento); precio y nuevas ventas compensan 1-2 puntos", senal: "Empleados por cliente en EE. UU. negativos dos trimestres seguidos" },
    { riesgo: "Agentes de IA y competidores nativos de IA abaratan el software de nóminas", tipo: "Competencia", probabilidad: "Media", impacto: "Medio", efecto_valor: "−10 %", mitigante: "Cumplimiento fiscal en 140 países, custodia de fondos y responsabilidad legal de la nómina: un agente genérico no los asume", senal: "Retención de Employer Services por debajo del 91,5 % o caída del precio aportado" },
    { riesgo: "Bajada de tipos de interés", tipo: "Financiero", probabilidad: "Media", impacto: "Medio", efecto_valor: "−5 % a −8 %", mitigante: "Cartera escalonada a varios años: 25 pb en toda la curva solo restan unos 21 M antes de impuestos en 12 meses", senal: "Guía de intereses de fondos por debajo de 1.500 M" },
    { riesgo: "Recesión y caída del empleo en EE. UU.", tipo: "Cíclico", probabilidad: "Media", impacto: "Medio", efecto_valor: "−10 %", mitigante: "Ingresos recurrentes y precio; en 2020 los ingresos aún crecieron un 3,4 %", senal: "Empleo privado negativo tres meses seguidos" },
    { riesgo: "Coste sanitario en el PEO", tipo: "Operativo", probabilidad: "Alta", impacto: "Bajo", efecto_valor: "−3 %", mitigante: "Repercusión de primas sin margen; el PEO es el 15 % del beneficio de los segmentos", senal: "Margen del PEO por debajo del 12 %" },
    { riesgo: "Ciberataque o fallo de nómina masivo", tipo: "Operativo / reputacional", probabilidad: "Baja", impacto: "Alto", efecto_valor: "−10 %", mitigante: "Seguridad por capas, seguros y redundancia de centros de datos", senal: "Incidente publicado o sanción de un regulador de privacidad" },
    { riesgo: "Valoración: el precio descuenta un crecimiento del 9,8 %", tipo: "Valoración", probabilidad: "Media", impacto: "Medio", efecto_valor: "−21 % hasta el valor intrínseco", mitigante: "Historia de PER estable (24 veces) y recompras", senal: "PER por encima de 25 veces el BPA del año siguiente sin mejora de la guía" },
  ],
  premortem: "Octubre de 2029: ADP ha perdido un 40 % y cotiza a unos 170 USD. La historia empezó bien: el 1T27 cumplió la guía y la acción tocó 300 USD. Pero en 2027 las grandes empresas de servicios, finanzas y seguros de EE. UU. empezaron a congelar contrataciones de oficina con agentes de IA, y el indicador de empleados por cliente de ADP pasó del +1 % al −1 % en el 3T27 y al −2 % en FY2028. Al mismo tiempo, la Fed recortó 150 pb ante el enfriamiento del empleo, y los intereses de los fondos, que eran el 6 % de las ventas y casi un cuarto del EBIT, dejaron de crecer. Rippling y Gusto, con producto nativo de IA y precios un 20-30 % menores, subieron las bajas en pymes y la retención cayó al 90,5 %. El crecimiento bajó al 2-3 % y el BPA se estancó en 12-12,5 USD. El mercado dejó de pagar 24 veces por un negocio que ya no crecía y lo llevó a 14-15 veces, como al software maduro. El indicador que lo habría anticipado: los empleados por cliente de EE. UU. negativos dos trimestres seguidos, junto con una guía de retención a la baja.",
  ia: {
    exposicion: "Media",
    sentido: "Mixto",
    efecto_valor: "−10 % a 3-5 años en el caso central de riesgo (hasta −27 % si se cumple el escenario bajista del DCF: empleados por cliente −1-2 % al año); +5 % si la IA se cobra como módulo",
    comentario: "La IA toca a ADP por tres vías. (1) **Volumen**: cobra por empleado procesado; si los clientes reducen plantilla de oficina, cae la base. Hoy no se ve: empleados por cliente +1 % en FY2026 y guía de 0-1 % [A3]. (2) **Producto**: agentes de IA podrían hacer tareas de RR. HH. y nómina que hoy vende ADP como servicio, y abaratar la entrada de rivales; lo frena la responsabilidad legal de pagar bien a millones de personas y cumplir con el fisco de 140 países [A1]. (3) **Coste**: ADP usa IA en atención, ventas y desarrollo y la vende en ADP Assist a casi todos sus clientes; eso sostiene el margen (+80 pb en FY2026) [A7]. El 10-K no incluye la sustitución por IA entre sus factores de riesgo, solo el cumplimiento normativo [A1]. Señal: empleados por cliente negativos o retención por debajo del 91,5 %.",
  },
  confianza: "Media",
};

export const preguntas = {
  items: [
    { tema: "IA y empleo", pregunta: "¿Qué parte de los ingresos de Employer Services depende directamente del número de empleados procesados y cuál es fija por cliente o módulo?", por_que: "Determina cuánto dañaría a ADP una reducción de plantillas de oficina por la IA." },
    { tema: "Empleados por cliente", pregunta: "¿Cómo evolucionan los empleados por cliente en los sectores de oficina (finanzas, seguros, servicios profesionales) frente al total?", por_que: "Sería la primera señal de que la IA reduce empleo en la base de ADP." },
    { tema: "Monetización de la IA", pregunta: "¿Cuánto cobra ADP por los agentes de ADP Assist y qué ingresos espera de ellos en FY2028?", por_que: "La dirección no da cifras; sin ellas la IA es solo coste y defensa." },
    { tema: "Fondos de clientes", pregunta: "¿Qué rentabilidad media tendría la cartera de fondos en FY2028 con los tipos a plazo de hoy y con 150 pb menos?", por_que: "Los intereses de fondos son casi un cuarto del EBIT." },
    { tema: "Competencia en pymes", pregunta: "¿Cuál es la retención en pequeñas empresas frente a medianas y grandes, y cuántos clientes se pierden con Rippling y Gusto?", por_que: "La presión de precio de los nuevos competidores empieza por las pymes." },
    { tema: "Recompras", pregunta: "¿Hasta qué deuda neta está dispuesta a llegar ADP para recomprar sin poner en riesgo su rating y el papel comercial de los fondos?", por_que: "Las recompras explican la mitad del crecimiento del BPA." },
    { tema: "PEO", pregunta: "¿Qué margen espera ADP en el PEO a medio plazo con la inflación sanitaria actual?", por_que: "El margen cayó 110 pb en FY2026 y la guía prevé más caída." },
  ],
  confianza: "Media",
};

const sintesis = `**La recomendación y por qué.** Mantener, con convicción media. ADP es un negocio excelente a un precio que ya lo recoge: a 280,32 USD, nuestro objetivo a 12 meses es de 296,94 USD (rentabilidad ponderada del 8,3 % con dividendo y del 12,6 % en el caso base), por debajo del umbral del 15 % para comprar, y el valor intrínseco es de 221,23 USD, un 21,1 % por debajo del precio. El objetivo medio de los analistas (286,40 USD) queda dentro de nuestro rango y por debajo de nuestro base. A 12 meses la asimetría es aceptable (+27,9 % alcista frente a −19,8 % bajista); a largo plazo, con nuestro WACC, no lo es. La convicción es media porque las dos reglas de valor coinciden y la rentabilidad está lejos de los umbrales; bajaría si los empleados por cliente se volvieran negativos y subiría con una caída del precio por debajo de 221 USD.

**El negocio.** Más de 1,1 millones de clientes, retención del 92,1 %, más de 1,3 puntos de crecimiento anual por precio y un flotante de 40.400 M que rinde 1.354,8 M casi sin coste [A3, A7]. El ROIC sobre capital operativo, calculado a mano, es del 56,7 % (43,7 % sin el flotante) frente a un WACC del 9,62 %: unos 47 puntos de creación de valor. Veredicto de calidad: **Sí**. La sostenibilidad del crecimiento es «Sí»: el 4,8 % medio que proyectamos sale de precio y nuevas ventas, no de capital, y queda por debajo del 6,6 % histórico.

**Finanzas.** Ingresos de 21.947,4 M (+7 %), BPA de 10,94 USD (11,12 ajustado, +11 %), flujo libre de 4.776,1 M y deuda neta de 0,1 veces el EBITDA [A3]. ADP devolvió 4.700 M en FY2026, más de lo que generó, con 1.000 M de bonos nuevos para recomprar.

**Valoración.** El DCF da 210,32 USD y, con la prima implícita del mercado, 250,93 USD. El precio descuenta un crecimiento anual del 9,8 % durante ocho años, o una rentabilidad del 8,0 %, menor que nuestro WACC: el mercado paga a ADP como a un bono de calidad. Solo su PER histórico (mediana adelantada de 24,2 veces; hoy 23,1 veces) justifica el precio, y por eso la regla a 12 meses da Mantener y no Vender. Los comparables por PER valen 255,96 USD.

**Riesgos y catalizadores.** El mayor riesgo es la IA: ADP cobra por empleado procesado y la IA puede reducir plantillas de oficina; hoy no se ve (empleados por cliente +1 %), pero el escenario bajista (−45,2 % en el DCF) es exactamente ese, con tipos a la baja. Exposición media, efecto mixto: también abarata el servicio y sostiene el margen. Segundo riesgo: una bajada de tipos, que restaría unos 21 M de beneficio antes de impuestos por cada 25 pb en 12 meses. Catalizadores: resultados del 1T27 el 28-oct-2026 y subida del dividendo en noviembre. En los foros el tono es dividido y mejora; no hay euforia.

**Qué cambiaría la decisión.** Compraríamos por debajo de 221,23 USD (valor intrínseco, donde además pasan la v3 y la v2) y venderíamos por encima de 337,31 USD. Pasaríamos a Vender si los empleados por cliente de EE. UU. son negativos dos trimestres seguidos o si la retención de Employer Services baja del 91,5 %.`;

export const resumen = {
  recomendacion: "Mantener",
  conviccion: "Media",
  justificacion_recomendacion: null,
  horizonte: "12 meses",
  sintesis,
  tesis: "ADP es la mayor empresa de nóminas y gestión de personal del mundo: 21.947,4 M USD de ingresos, más de 1,1 millones de clientes, retención del 92,1 % y un flotante de 40.400 M que le dio 1.354,8 M de intereses en FY2026 [A3]. Gana un ROIC sobre capital operativo cercano al 57 %, sube precios más de 1,3 puntos al año y devuelve todo el flujo libre al accionista [A3, A7].\n\nA 280,32 USD el mercado descuenta un crecimiento anual del 9,8 % durante ocho años, el doble del 4,8 % que proyectamos con la guía de la empresa, o lo que es lo mismo, una rentabilidad del 8,0 % anual, por debajo de nuestro WACC del 9,62 %. Cotiza a 23,1 veces el BPA de FY2027e, cerca de su mediana de cinco años (24,2 veces), tras rebotar casi un 50 % desde el mínimo de abril [D1].\n\nEl mercado acierta en la calidad y quizá se pasa en el precio: para invertir hoy hay que creer que la IA no reducirá los empleados por cliente y que ADP podrá seguir cotizando a 24 veces su beneficio con tipos al 5 %. Es una tenencia razonable para quien ya la tiene, no una compra.",
  vision_diferencial: {
    mercado_descuenta: "Que ADP mantiene su crecimiento del 5-6 % con margen al alza durante años y que el riesgo de la IA ya pasó, tras el rebote desde 188 USD; lo paga a 23 veces su beneficio, como en la última década.",
    nuestra_vision: "Coincidimos en el negocio (BPA casi igual al del consenso), pero no en el precio: con tipos al 5,2 %, un negocio que crece al 5 % vale unas 18-21 veces su beneficio en el DCF, no 23-24.",
    por_que: "La diferencia es la tasa de descuento, no las cifras: por eso no recomendamos vender. Si el precio cae por debajo de 221 USD sin que cambien los empleados por cliente, la tesis pasa a compra.",
  },
  a_favor: [
    "**Retención en máximos**: 92,1 % en Employer Services y relación media de 13 años [A1, A3].",
    "**Poder de precios**: más de 1,3 puntos de crecimiento por precio en FY2026, por encima del plan [A7].",
    "**Flotante**: 40.400 M de saldo medio que rinde 1.354,8 M casi sin coste, con subidas de tipos descontadas [A3].",
    "**ROIC operativo del 56,7 %**, 47 puntos por encima del WACC (estimación propia sobre el balance).",
    "**Devolución al accionista**: 4.700 M en FY2026 y más de 50 años de dividendo creciente [A3].",
  ],
  en_contra: [
    "**Precio exigente**: el valor intrínseco (221,23 USD) queda un 21,1 % por debajo del precio.",
    "**IA y empleo**: cobra por empleado procesado; empleados por cliente ya solo crecen un 1 % [A3].",
    "**Crecimiento maduro**: guía de +5-6 % en ingresos y nuevas ventas de +4-7 % [A3].",
    "**Tipos**: los intereses de fondos son casi un cuarto del EBIT y bajarían con recortes de la Fed [A1].",
    "**PEO**: margen del 13,1 %, 110 pb menos por el coste sanitario [A3].",
  ],
  que_vigilar: "La tesis depende de que los empleados por cliente de EE. UU. no se vuelvan negativos por la IA y de que la retención siga por encima del 91,5 %. La señal de que falla sería un indicador de empleados por cliente negativo dos trimestres seguidos o una guía de nuevas ventas por debajo del +4 %. También, una guía de intereses de fondos por debajo de 1.500 M.",
  cambiaria_recomendacion: [
    "Si el precio baja de 221,23 USD (valor intrínseco) sin cambios en la tesis, pasaríamos a Comprar.",
    "Si el precio supera 337,31 USD, pasaríamos a Vender.",
    "Si los empleados por cliente de EE. UU. son negativos dos trimestres seguidos, pasaríamos a Vender.",
    "Si la retención de Employer Services baja del 91,5 % en FY2027, revisaríamos el escenario bajista al alza de probabilidad.",
  ],
  kpis_seguimiento: [
    { kpi: "Empleados por cliente (EE. UU.)", nivel_actual: "+1 % (FY2026)", umbral_alerta: "Negativo dos trimestres", por_que: "Mide el efecto de la IA y del ciclo en la base de cobro." },
    { kpi: "Retención de Employer Services", nivel_actual: "92,1 %", umbral_alerta: "< 91,5 %", por_que: "Mide la presión competitiva y el foso." },
    { kpi: "Nuevas ventas de Employer Services", nivel_actual: "+6 % (2.200 M)", umbral_alerta: "< +3 %", por_que: "Motor del crecimiento futuro." },
    { kpi: "Intereses de fondos de clientes", nivel_actual: "1.354,8 M; guía 1.540-1.560 M", umbral_alerta: "Guía < 1.500 M", por_que: "Casi un cuarto del EBIT." },
    { kpi: "Margen EBIT ajustado", nivel_actual: "26,8 %", umbral_alerta: "Ampliación < 50 pb", por_que: "Prueba de que la IA ahorra costes." },
  ],
  confianza: "Media",
};

export const huecos = [];
