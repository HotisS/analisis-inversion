// Textos del analista (Uranium Energy Corp, corte 2026-10-24, precio de cierre del 23-oct-2026). Citas: [A1] = fuente 1 de A.json.
export const limitaciones = `Se valora la acción de Uranium Energy Corp en la NYSE American (UEC), en dólares, al cierre del viernes 23-oct-2026 (7,35 USD); el análisis se hace el sábado 24-oct con la bolsa cerrada [D2]. Acciones: 502,0 M diluidas (495,6 M en circulación a 25-sep-2026 más opciones, RSU y PRSU) [D1]. Las cuentas son las del 10-K del ejercicio cerrado el 31-jul-2026 [A1]. UEC es, según la SEC, un emisor «en fase de exploración»: no tiene reservas probadas y lleva a gasto el desarrollo de sus minas (102,4 M USD en FY2026), así que su EBITDA y su ROIC no son comparables con los de un productor que capitaliza [A1]. Todas sus ventas hasta hoy son reventa de uranio comprado, no producción propia [A1]. Con pérdidas en todos los ejercicios recientes, el objetivo a 12 meses no puede usar el PER: se usa el precio sobre valor contable (P/VC) con la misma regla común aplicada a mano. No hay guía de producción de la empresa [A11].`;

export const controles_explicados = [
  { control: 'DCF inverso calculable', explicacion: 'Con pérdidas hasta FY2029e el valor apenas responde al crecimiento dentro del rango del motor: ningún crecimiento razonable de 2027e-2036e iguala el precio. La rentabilidad implícita (5,9 % anual con nuestros flujos) es la lectura útil.' },
  { control: 'Rendimiento del capital nuevo de la proyección ≤ 1,25 × el histórico', explicacion: 'El ROIC histórico es negativo (−11,6 % en FY2026) porque la empresa está en arranque y lleva el desarrollo a gasto; cualquier proyección con beneficios supone un capital nuevo que rinde mucho más que el pasado. Por eso el veredicto de sostenibilidad es «No» y no se puede «rebajar hasta que pase»: el caso base ya es más prudente que el consenso en ventas de FY2028e (150 frente a 177,2 M USD) [D3].' },
  { control: 'Peso del valor terminal ≤ 80 % del valor empresa', explicacion: 'Una minera en arranque quema caja los primeros tres años (−162, −116 y −47 M USD de flujo libre) y todo el valor está después; el 89 % es inevitable y es una razón más para la confianza baja del DCF.' },
  { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El BPA es negativo en el último real (−0,28 USD) y en 2028e (−0,13); el objetivo a 12 meses se hace con P/VC, no con PER.' },
  { control: 'Circulante del primer año de proyección ≈ último real', explicacion: 'El circulante de FY2026 (129 % de las ventas) lo inflan 1,256 M lb de uranio comprado y unas ventas de solo 37 M USD; converge al 20 % cuando las ventas son de producción propia.' },
];

export const parches = [
  { ruta: 'identificacion.proximos_resultados', valor: '≈ 9-dic-2026 (1T FY2027, estimada; sin confirmar)' },
  { ruta: 'bolsa.contexto.proximos_resultados', valor: '2026-12-09' },
];

export const negocio_descripcion = `Uranium Energy Corp extrae uranio en Estados Unidos por recuperación in situ (ISR): inyecta agua con oxígeno en el yacimiento, disuelve el uranio y lo bombea a una planta donde se precipita y se seca como U3O8 [B1]. Tiene dos plataformas: Wyoming (Irigaray y Christensen Ranch, Ludeman, Sweetwater, comprada a Rio Tinto en 2024 por 179,6 M USD) y el sur de Texas (Hobson, Palangana parada y Burke Hollow, en marcha desde abril de 2026), con 12,1 M lb al año de capacidad licenciada y 230,1 M lb de recursos medidos e indicados más 100,0 M lb inferidos, sin reservas [A1, D1]. En Canadá tiene Roughrider (Athabasca), en estudio de prefactibilidad, y es accionista de Uranium Royalty (7,6 %) y Anfield [A1, C7, C9]. En FY2026 produjo 229.294 lb (el 4T, 82.744 lb) y no vendió ninguna [A1].`;

export const negocio_como_gana = `Hoy gana dinero comprando y revendiendo uranio («programa de uranio físico»): en FY2026 vendió 400.000 lb compradas a 93,13 USD/lb, con 16,9 M USD de beneficio bruto, y un solo cliente pesó el 54 % de las ventas [A1, B1]. No tiene contratos a largo plazo ni coberturas: la estrategia es vender al contado cuando el precio le guste y reservar producción de origen estadounidense para el Gobierno (petición de información de la NNSA por ≈ 4 M lb al año desde 2030) [A8, B8]. El negocio futuro es vender su propia producción: coste en efectivo publicado de 34,24 USD/lb y 39,94 con amortización, sin contar el desarrollo de pozos, que va a gasto [A1]. Lo financia con ampliaciones de capital: 530 M USD en FY2026 [A1].`;

export const rentabilidad_comentario = `UEC no ha creado valor nunca: el ROIC es negativo en nueve de los diez últimos ejercicios (−11,6 % en FY2026, con un WACC del 13,4 %) y solo fue positivo en FY2023 (1,5 %), gracias a la reventa de uranio comprado [A1]. La rotación es de 0,03 veces: 857 M USD de capital invertido para 37 M de ventas. El ROIC incremental histórico (−11,1 %) dice que el capital levantado desde 2021 (unos 1.300 M USD en acciones) se ha ido a comprar proyectos y a desarrollar minas que todavía no producen beneficio. Parte de la pérdida es contable (el desarrollo va a gasto por no tener reservas), pero ni sumándolo de vuelta el negocio cubre su coste de capital. Los productores con beneficio del sector, Cameco y Paladin, ganan márgenes EBITDA del 23-25 % [D3].`;

export const dcf_justificacion = {
  crecimiento: 'Ventas de 64 M USD en FY2027e (consenso 63,6) y 150 M en FY2028e (consenso 177,2): pasar de 0,23 a ≈ 1,4 M lb producidas en dos años, cuando el 4T26 anualiza 0,33 M lb [A1, D3]. Después, Ludeman y Sweetwater llevan las ventas a ≈ 590 M USD en FY2036e, unos 6 M lb a 100 USD/lb: la mitad de la capacidad licenciada (12,1 M lb). Sin guía de la empresa, es la parte más incierta [A11].',
  margenes: 'Margen EBITDA de −185 % en FY2027e (el desarrollo de pozos, 102 M USD en FY2026, y los gastos generales, 34,5 M, siguen a gasto con pocas ventas), −45 % en FY2028e, positivo desde FY2030e y 42 % en estado estacionario. Cameco y Paladin ganan un 23-25 % [D3]; un ISR a 100 USD/lb con coste en efectivo de 34 USD/lb y 20-25 USD/lb de pozos puede llegar al 40-45 %, sin precedente propio.',
  inversion: 'Capex del 45 % de las ventas en FY2027e (8,8 M USD en FY2026 sobre 37 M de ventas) bajando al 6 % en estado estacionario, por encima de la amortización (5 %). El grueso de la inversión en pozos va en el EBITDA, no en el capex, por cómo contabiliza UEC [A1]. Circulante del 100 % al 20 % de las ventas al pasar de inventario comprado a producción propia.',
  wacc: 'Tasa libre del 5,00 % (bono del Tesoro a 10 años del 23-oct-2026) [D7], beta de 1,35 (mensual de 5 años frente al SPY; la ajustada es 1,23 y la semanal de 2 años 1,60) [D2], prima de mercado del 5,5 % y prima adicional de 1 punto por ser un solo producto sin reservas probadas. Sin deuda. Coste de capital: 13,4 %. Con la prima implícita del mercado (4,2 %) baja al 11,7 %.',
  terminal: 'Gordon con un 2,5 % de crecimiento (inflación en dólares más algo de volumen), por debajo de la tasa libre menos medio punto. Con recursos de 330 M lb y ≈ 6 M lb al año, la vida de la mina pasa de 50 años: el terminal no es optimista en vida, sí en precio (supone 100 USD/lb siempre).',
};

export const sostenibilidad_justificacion = `«No»: la calidad de UEC no sostiene por sí sola el crecimiento que proyectamos (37 % anual). El ROIC es negativo (−11,6 %) y el crecimiento financiable con él es del −3,8 %: cada libra nueva la paga el accionista con ampliaciones (530 M USD en FY2026). No hay foso: el uranio es una materia prima, el coste publicado (34 USD/lb) no incluye los pozos y los permisos son la única ventaja [B1]. La cuota final (2,7 % de un mercado de ≈ 21.500 M USD) es posible por recursos, pero no demostrada. La prueba no puede pasarse rebajando el base, porque el histórico es negativo: el veredicto pesa en la calidad (no se compra) y no en el precio.`;

export const dcf_lectura = `El DCF da 2,21 USD por acción, un 70 % por debajo del cierre de 7,35 USD, con un WACC del 13,4 % y el 89 % del valor en el terminal. Con la prima implícita del mercado (WACC 11,7 %) sale 2,61. Los escenarios van de 1,23 a 3,57 USD: ni el alcista (crecimiento 8 puntos mayor cada año y 5 puntos más de margen) se acerca al precio. El DCF inverso no tiene solución en un rango razonable, porque el valor apenas responde al crecimiento con tres años de quema de caja; la lectura útil es la rentabilidad implícita: comprando a 7,35 USD y con nuestros flujos, el accionista ganaría un 5,9 % anual, menos que el coste de capital (13,4 %) y que lo que pide el mercado (11,7 %). Dicho de otro modo, el precio descuenta un uranio más caro, más volumen o una compra estratégica. Contraste por recursos: el mercado paga 13,0 USD por libra medida e indicada en el suelo, frente a 1,0-2,6 USD/lb en las compras de Sweetwater y Roughrider [D16, D17].`;

export const narrativas = {
  Bajista: 'La rampa se atasca como en el 3T26 (32.195 lb en un trimestre) y el uranio vuelve a 65-70 USD/lb, como en marzo de 2025: crecimiento 12 puntos menor cada año y margen 8 puntos menor, con más ampliaciones.',
  Base: 'Christensen Ranch y Burke Hollow llegan a ≈ 1,4 M lb en FY2028e, Ludeman y Sweetwater entran en 2029-2031 y el uranio se queda en torno a 100 USD/lb; la empresa alcanza el beneficio operativo en FY2030e.',
  Alcista: 'El Gobierno de EE. UU. paga prima por el uranio nacional (NNSA, reserva estratégica) y Sweetwater se adelanta: crecimiento 8 puntos mayor y 5 puntos más de margen.',
};

export const escenarios_comentario = `Los tres escenarios quedan muy por debajo del precio: bajista 1,23 USD (−83,3 %), base 2,21 (−69,9 %) y alcista 3,57 (−51,4 %). La asimetría es negativa (−0,62): no hay escenario razonable en el que el DCF gane dinero a 7,35 USD. El precio solo se justifica con supuestos fuera de nuestro rango: un uranio por encima de 120 USD/lb sostenido, la capacidad licenciada entera (12,1 M lb) en producción o una compra por un tercero que pague el recurso en el suelo.`;

export const valoracion_comentario = `Pesos: DCF 50 % y escenarios 50 %. Los comparables por múltiplos de beneficio no sirven: UEC no tiene EBITDA ni beneficio, y los productores con beneficio (Cameco, Paladin, Boss) son negocios distintos [D3]. Las transacciones son por libra de recurso y llevan prima de control; las usamos de contraste: el mercado paga a UEC 13,0 USD por libra medida e indicada, frente a 1,0 USD/lb de Sweetwater (2024) y 2,6 USD/lb de Roughrider (2022) [D16, D17]. El valor intrínseco es de 2,26 USD (−69,3 %). La dispersión es enorme y la confianza baja, pero todos los métodos apuntan al mismo lado: el precio está por encima de lo que vale el negocio con un uranio a 100 USD/lb.`;

export const oj = {
  Bajista: 'P/VC de 2,16 veces (mínimo de cinco años, FY2023) sobre un valor contable de ≈ 2,53 USD por acción a jul-2027e: la rampa decepciona y el sector sigue castigado. BPA de FY2028e de −0,13 USD.',
  Base: 'P/VC de 2,91 veces: el actual (2,65) a mitad de camino hacia la mediana de cinco años (3,46), con el tope de ×1,1. Valor contable de ≈ 2,53 USD a jul-2027e tras otra pérdida de ≈ 0,21 USD. BPA de FY2028e de −0,13 USD.',
  Alcista: 'P/VC de 3,5 veces (mediana de los comparables, por encima de la media histórica de 3,31): vuelve el apetito por el uranio. BPA de FY2028e de −0,12 USD: más ventas apenas cambian la pérdida mientras se desarrollan minas.',
};

export const diferencia_consenso = `Nuestro BPA de FY2028e (−0,13 USD) es peor que el del consenso (−0,07) porque vendemos menos (150 frente a 177,2 M USD) y mantenemos el desarrollo de pozos a gasto [D3]. La gran distancia es el precio: nuestro base (7,36 USD) es un 54 % inferior al objetivo medio de los analistas (16,03; rango 10-26,75), que valoran por NAV con descuento del 8 % y un uranio más caro. Los objetivos se están recortando (National Bank de 16 a 15, Goldman de 18 a 16) y las dos últimas coberturas empiezan en Mantener (RBC 10, Jefferies 11,50) [D4, D10].`;

export const objetivo12m_comentario = `El objetivo a 12 meses es de 7,26 USD (base 7,36; −1,2 % ponderado y +0,1 % en el base) con P/VC, porque el PER no existe con pérdidas. La regla se aplica a mano: base = P/VC actual (2,65) a mitad de camino hacia su mediana de cinco años (3,46) con tope ×1,1; bajista = mínimo de cinco años (2,16); alcista = mediana de comparables (3,5). El valor contable apenas cambia entre escenarios (las pérdidas son parecidas); una ampliación a precios por encima del contable lo subiría. La distancia con el valor intrínseco (2,26 USD, −69 %) dice que, a 12 meses, el mercado puede seguir pagando el recurso por encima de lo que vale el negocio; a largo plazo, el precio necesita más uranio o más volumen del que proyectamos. La tesis no es de 12 meses.`;

export const catalizadores = {
  items: [
    { fecha: '≈ 9-dic-2026', evento: 'Resultados del 1T FY2027 (10-Q)', efecto: 'Primeras ventas de producción propia y ritmo de Christensen Ranch y Burke Hollow; dos trimestres seguidos con pérdidas muy peores de lo esperado', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mar-2027', evento: 'Evaluación ambiental de Sweetwater (FAST-41) y plan de operaciones en may-2027', efecto: 'Abre la tercera plataforma; sin ella no hay crecimiento más allá de 2029', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027-2030', evento: 'Compras del Gobierno de EE. UU. (NNSA: ≈ 4 M lb al año de uranio nacional desde 2030)', efecto: 'Precio con prima para el uranio estadounidense; hoy es solo una petición de información', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Mediados de 2027', evento: 'Estimación de coste de la planta de conversión (UR&C con Fluor)', efecto: 'Más inversión y probable ampliación de capital', probabilidad: 'Alta', sentido: '−' },
    { fecha: 'Continuo', evento: 'Ventas por el programa ATM (≈ 409 M USD disponibles)', efecto: 'Dilución del 6-9 % al año como en FY2025-FY2026', probabilidad: 'Alta', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Dilución continua para pagar la rampa, la conversión y Roughrider', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−6 a −9 % por acción al año', mitigante: '495 M USD de caja y sin deuda', senal: 'Uso del ATM por debajo de 8 USD o nueva ampliación' },
    { riesgo: 'Rampa de producción más lenta o cara de lo previsto (ISR en arranque)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista del DCF: 1,23 USD', mitigante: '4T26 de 82.744 lb (+157 %) y coste en efectivo de 30 USD/lb', senal: 'Producción trimestral por debajo de 100.000 lb en 2027' },
    { riesgo: 'Caída del precio del uranio (vuelta a 65 USD/lb, como en mar-2025)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 a −50 % en la acción (beta al uranio)', mitigante: 'Contratación a largo plazo en máximos de 18 años (96,5-97 USD/lb)', senal: 'Largo plazo por debajo de 85 USD/lb' },
    { riesgo: 'Gobierno: retribución alta (9,28 M USD al primer ejecutivo, +46 %) y operaciones con Uranium Royalty no declaradas como vinculadas', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % (descuento de gobierno)', mitigante: '5 de 6 consejeros independientes', senal: 'Nuevas compras a sociedades del grupo Adnani' },
    { riesgo: 'Riesgo político: menos apoyo a lo nuclear o fin de la prohibición del uranio ruso', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 a −20 %', mitigante: 'Apoyo bipartidista y órdenes ejecutivas de 2025', senal: 'Exenciones de la prohibición rusa más allá de 2027' },
  ],
  premortem: 'Es octubre de 2029 y UEC vale un 40 % menos. La historia más probable empieza en 2027: los nuevos campos de pozos de Christensen Ranch y Burke Hollow rinden menos de lo previsto (como el 3T26, con 32.195 lb en un trimestre) y la producción se queda en 0,5-0,7 M lb al año en vez de 1,4 M. A la vez, las eléctricas siguen retrasando contratos, Kazatomprom recupera volumen y el uranio a largo plazo baja de 97 a 75-80 USD/lb. Sin contratos ni coberturas, UEC vende al contado con poco margen. La planta de conversión necesita más de 1.000 M USD y Sweetwater se retrasa un año en los permisos. Con la caja por debajo de 300 M USD, la empresa usa el ATM a 4-5 USD por acción y el número de acciones pasa de 600 M. Los indicadores que lo habrían avisado: producción trimestral por debajo de 100.000 lb, coste en efectivo por encima de 45 USD/lb, el largo plazo del uranio por debajo de 85 USD/lb y ventas de acciones del ATM por debajo de 8 USD.',
  ia: { exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: '+0 a +5 %', comentario: 'La IA no puede sustituir el uranio ni la extracción ISR. Su efecto es indirecto y va a favor: los centros de datos disparan la demanda de electricidad estable, y las grandes tecnológicas firman contratos con centrales nucleares y apoyan la ampliación de su vida y los reactores modulares (SMR), lo que sostiene la demanda de uranio a largo plazo [B7]. El riesgo es que ese viento de cola ya esté en el precio de la acción y en el del uranio, y que la demanda tarde más de lo esperado (los SMR no llegan antes de 2030). En la operación, la IA puede abaratar algo la exploración y el control de los campos de pozos, sin cambiar el negocio. Señal a vigilar: contratos de suministro nuevos de las eléctricas de EE. UU. ligados a centros de datos.' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    '¿A qué ritmo producirán Christensen Ranch y Burke Hollow en 2027 y cuánto cuesta de verdad cada libra con los pozos incluidos?',
    '¿Cuándo venderá UEC su primera libra producida y a qué precio, sin contratos a largo plazo?',
    '¿Cuánto costará la planta de conversión y cómo se pagará: deuda, Gobierno o más acciones?',
    '¿Por qué el 10-K no declara como vinculada la compra de recibos de Uranium Royalty por 40 M USD?',
  ],
  confianza: 'Media',
};

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: 'Más de 12 meses',
  sintesis: `**La recomendación y por qué.** Mantener según la regla a 12 meses, que para quien no la tiene significa no comprar. El objetivo a 12 meses es de 7,26 USD (P/VC; base 7,36), un −1,2 % ponderado y un +0,1 % en el base desde el cierre de 7,35 USD del 23-oct-2026. El valor intrínseco es de 2,26 USD, un 69 % por debajo del precio, y el objetivo medio de los analistas, 16,03 USD, queda fuera de nuestro rango. Los tres escenarios del DCF pierden dinero (asimetría −0,62). La razón principal: el precio paga un negocio que todavía no existe. La convicción es media porque las dos reglas (WACC propio y prima del mercado) coinciden y la rentabilidad queda lejos de los umbrales; esa convicción subiría con dos trimestres de producción por encima de 150.000 lb vendidas con beneficio, y bajaría si el uranio a largo plazo cae de 85 USD/lb.

**El negocio.** UEC es una minera de uranio por recuperación in situ en Wyoming y Texas, en arranque: produjo 229.294 lb en FY2026 y no ha vendido ninguna; sus 37,3 M USD de ventas son reventa de uranio comprado [A1]. El ROIC es del −11,6 % frente a un WACC del 13,4 %: no hay calidad (ROIC − WACC muy por debajo de 4,5 puntos), así que ningún nivel de compra value es posible. La calidad de la empresa no sostiene el crecimiento que proyectamos (sostenibilidad «No»): cada libra nueva la paga el accionista.

**Sector y ciclo.** El uranio a largo plazo está en 96,5-97 USD/lb, máximo desde 2007, y EE. UU. prohíbe el ruso y busca uranio nacional (NNSA, ≈ 4 M lb al año desde 2030) [B3, B8]. Aun así, las acciones del sector caen: el ETF URA −31 % en un año y el fondo físico de Sprott con un 12-13 % de descuento [D2, D14]. El viento de cola es real, pero ya lo pagaba el precio.

**Finanzas.** Caja de 495 M USD y sin deuda, más 1,256 M lb de uranio (≈ 109 M USD a mercado) [A1]. Quema ≈ 107 M USD al año (flujo operativo −98,6 M y capex 8,8 M) y amplía capital sin parar: 530 M USD en FY2026 y +71 % de acciones desde jul-2022 [A1].

**Equipo y gobierno.** Resta: el primer ejecutivo cobró 9,28 M USD (+46 %) con objetivos poco exigentes y en abril pagó 40 M USD por recibos de Uranium Royalty, que él preside, sin declararlo como operación vinculada [C2].

**Valoración.** DCF 2,21 USD y escenarios 1,23-3,57. Con nuestros flujos, el precio rinde un 5,9 % anual, menos que el coste de capital. El mercado paga 13,0 USD por libra medida e indicada, frente a 1,0-2,6 USD/lb en las compras recientes de UEC [D16, D17].

**Riesgos y catalizadores.** Dilución (6-9 % al año), rampa lenta y caída del uranio. Catalizadores: resultados del 1T FY2027 (≈ 9-dic), Sweetwater (mar-2027) y compras del Gobierno. Los foros pasan del entusiasmo a una capitulación incipiente, que no es señal de compra sin valoración que la respalde [E1].

**Qué cambiaría la decisión.** Vender por encima de 8,07 USD (para quien la tenga); comprar no es posible por calidad aunque bajara: haría falta ROIC − WACC ≥ 5 puntos, es decir, beneficio operativo recurrente con producción propia.`,
  tesis: `UEC tiene la mayor plataforma ISR de Estados Unidos por capacidad licenciada (12,1 M lb al año) y recursos (230 M lb medidos e indicados), sin deuda y con 495 M USD de caja [A1, D1]. En un mercado que quiere uranio nacional, eso tiene valor estratégico.

El precio (3.690 M USD de capitalización, ≈ 3.090 M de valor empresa) descuenta mucho más que eso: 13 USD por libra en el suelo y una rentabilidad implícita del 5,9 % anual con nuestros flujos. El DCF da 2,21 USD por acción.

Para comprar habría que creer en un uranio por encima de 120 USD/lb sostenido o en una rampa hasta la capacidad entera; ninguna de las dos tiene apoyo en los datos de hoy. El mercado ya lo está corrigiendo (−47 % en 12 meses), pero desde un punto de partida muy caro.`,
  vision_diferencial: {
    mercado_descuenta: 'Los analistas (objetivo medio 16,03 USD) valoran por NAV con un descuento del 8 % y uranio a 90-100 USD/lb; el mercado, con 7,35 USD, ya les da poca credibilidad.',
    nuestra_vision: 'Con un coste de capital del 13,4 % y la quema de caja de los próximos tres años, el negocio vale 2-3,5 USD por acción; el resto es opción sobre el precio del uranio y sobre la política de EE. UU.',
    por_que: 'Los NAV de los analistas no restan la dilución futura ni el desarrollo de pozos que va a gasto, y suponen la capacidad licenciada en marcha.',
  },
  a_favor: [
    '**Balance limpio**: 495 M USD de caja y sin deuda [A1].',
    '**Uranio caro**: largo plazo en 96,5-97 USD/lb, máximo en 18 años [B3, B22].',
    '**Rampa en marcha**: 82.744 lb en el 4T26, +157 % sobre el 3T [A1].',
    '**Política a favor**: prohibición del uranio ruso y demanda de la NNSA de ≈ 4 M lb al año [B8].',
  ],
  en_contra: [
    '**Sin calidad**: ROIC −11,6 % frente a WACC 13,4 %.',
    '**Dilución**: +71 % de acciones desde jul-2022 y ≈ 409 M USD de ATM disponibles [A1, C2].',
    '**Caro frente al negocio**: valor intrínseco 2,26 USD, −69 %.',
    '**Ninguna libra propia vendida** y sin guía de producción [A1, A11].',
    '**Gobierno**: retribución de 9,28 M USD y operaciones con Uranium Royalty [C2].',
  ],
  que_vigilar: 'La tesis depende de que la producción propia llegue a ≈ 1,4 M lb al año en FY2028 y se venda por encima de 90 USD/lb. La señal de que no se cumple: dos trimestres de 2027 por debajo de 100.000 lb producidas o nuevas ampliaciones de capital por debajo de 8 USD.',
  cambiaria_recomendacion: [
    'Si el largo plazo del uranio baja de 85 USD/lb, el bajista pasa a ser el base: Vender para quien la tenga.',
    'Si UEC vende producción propia con margen bruto > 50 % dos trimestres seguidos, rehacer el DCF con más volumen.',
    'Si anuncia una ampliación de capital por debajo de 7 USD, bajar el objetivo.',
    'Si la NNSA firma contratos con prima de precio para uranio nacional, revisar el alcista.',
  ],
  kpis_seguimiento: [
    { kpi: 'Producción trimestral (lb)', nivel_actual: '82.744 (4T26)', umbral_alerta: '< 100.000 en 2027', por_que: 'Sin volumen no hay negocio propio' },
    { kpi: 'Precio a largo plazo del uranio (USD/lb)', nivel_actual: '96,5-97', umbral_alerta: '< 85', por_que: 'Decide margen y apetito del mercado' },
    { kpi: 'Acciones en circulación (M)', nivel_actual: '495,6', umbral_alerta: '> 530 a jul-2027', por_que: 'Dilución' },
    { kpi: 'Caja (M USD)', nivel_actual: '495', umbral_alerta: '< 300', por_que: 'Obligaría a ampliar capital' },
  ],
  confianza: 'Baja',
};

export const fuentes = [
  { id: 1, titulo: 'Damodaran, A., «Implied ERP by month» (ERPbymonth.xlsx): 4,20 % en octubre de 2026 (T12m con pago sostenible), cifra recogida en verticales/empresa/prompt.md', editor: 'NYU Stern', tipo: 'Secundaria', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/' },
];
