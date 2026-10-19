// Textos finales del analista (Anker Innovations, corte 2026-10-19): limitaciones, controles, DCF, escenarios, objetivo a 12 meses,
// riesgos, catalizadores, preguntas y resumen. Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.

const limitaciones = 'Dos líneas cotizadas: acciones A en el ChiNext de Shenzhen (300866, CNY), que es la que se analiza, y acciones H en Hong Kong (00668, HKD) desde el 2-jul-2026; las H cotizaban el 16-oct a 105,90 HKD (≈ 90,1 CNY), un 18 % por debajo de la A [D2, D13]. La A está en la lista de HKEX de valores de Shenzhen que se pueden comprar y vender por Stock Connect (n.º 1750, 16-oct-2026), pero las acciones del ChiNext solo las pueden negociar por el Northbound los inversores profesionales institucionales: un particular no puede comprar la A desde IBKR por Stock Connect; sí puede comprar la H en Hong Kong [D9, D10]. Cuentas en normas chinas (CAS) de los informes de CNINFO, transcritas de la base F10 de Eastmoney y comprobadas contra los informes [A13]; las NIIF de Hong Kong solo existen desde 2026. Precio: cierre del 19-oct-2026 en Shenzhen (110,40 CNY, dato de Sina de las 15:35 de Pekín); los históricos de Yahoo llegan al 16-oct (108,91) [D2, D1]. Acciones: 539,36 M A y 50,08 M H a 30-sep-2026, más 10,4 M del convertible en el dinero = 599,9 M [D17, D18]. La devolución de aranceles IEEPA del 1S26 no tiene cifra oficial; se usa la estimación de los analistas (≈ 700 M) [A14, A15].';

const huecos = [
  { seccion: 'negocio', campo: 'ventas en EE. UU. separadas de Norteamérica', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo Norteamérica, 46,3 %); 2) folleto de Hong Kong (aranceles pagados en EE. UU., no ventas); 3) notas de analistas (sin cifra de EE. UU.)', decision: 'Omitido: se usa Norteamérica como aproximación de la exposición a los aranceles de EE. UU.' },
];

const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El tipo bajo sale de la conciliación de los informes anuales: la sociedad tributa al 15 % (alta tecnología) y la deducción adicional de la I+D resta 7-9 puntos cada año (267 M en 2025 y 235 M en 2024) [A1, A3]. No se proyecta: desde 2026 el Pilar Dos (impuesto mínimo del 15 %) subió el tipo al 15,9 % en el 1S26, y el DCF usa el 16 % [A6, A14].' },
  { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: '5,8 % en 2024: impuesto teórico de 352 M al 15 %, menos 235 M de la deducción adicional de la I+D y 41 M de ajustes de años anteriores [A1]. El DCF usa el 16 % por el Pilar Dos [A6].' },
  { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: '10,4 % en 2025: impuesto teórico de 438 M al 15 %, más 96 M por filiales con tipos distintos y la provisión del Pilar Dos, menos 267 M de la deducción adicional de la I+D [A1]. El DCF usa el 16 %, el tipo del 1S26 [A6].' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'La fila de Anker mezcla nuestro EBITDA LTM (3.039 M: sin valor razonable, tesorería, cambio ni la devolución de aranceles de ≈ 700 M) con el EBITDA NTM del consenso (≈ 5.500 M), que lleva la devolución en 2026e, en algunas casas los ingresos de inversiones, y un margen EBITDA del 12-13 % en 2027e frente al 9,0 % de 2025 [A14, D4, D5]. No es un cambio de perímetro: es la diferencia de margen que se explica en el control siguiente.' },
  { control: 'Proyección propia frente a consenso (2026e)', explicacion: 'Diferencia deliberada. En 2026e el consenso (4.765 M de EBITDA) incluye la devolución de aranceles IEEPA (≈ 700 M, el 1,8 % de las ventas) que nosotros tratamos como no recurrente [A14, A15]; sin ella, la diferencia baja al 15 %. El resto es margen: el semestre sin la devolución dio un margen EBIT del 7,4 % frente al 7,8 % del 1S25, con la I+D al 11,3 % de las ventas, un deterioro de existencias de 444 M y aranceles de EE. UU. todavía en vigor [A6, A7].' },
  { control: 'Proyección propia frente a consenso (2027e)', explicacion: 'Las ventas coinciden casi (46.504 M frente a 48.326 M); la diferencia es de margen: el consenso espera un EBITDA del 11,8 % de las ventas (Soochow 13,1 %, Kaiyuan 10,8 %) y nosotros el 9,5 % [D4, D5]. Anker nunca ha pasado del 10,1 % con nuestra definición (2023) y entre 2023 y 2025 la mejora del margen bruto (+1,6 puntos) se fue en I+D y venta [A1]. Si el margen bruto de ≈ 47 % sin la devolución se sostiene y la I+D deja de crecer más que las ventas, el alcista (11 %) recoge esa posibilidad.' },
  { control: 'Proyección propia frente a consenso (2028e)', explicacion: 'Misma razón: margen EBITDA del 10,0 % frente al 11,8 % del consenso (6.778 M sobre 57.322 M) y ventas un 7 % más bajas (53.480 M) porque el crecimiento de 2025-2026 se apoyó en el acopio del canal ante los aranceles y en el almacenamiento, que tiene más competencia [D4, D5, B1]. Nuestro BPA de 2028e (7,13) queda un 20 % por debajo del consenso (8,90).' },
];

const secciones = {
  rentabilidad: {
    comentario: 'Crea valor con holgura. El ROIC del motor subió del 19 % de 2021-2022 al 34 % de 2024-2025, frente a un WACC del 8,0 %: el margen EBIT pasó del 6,6 % al 8,4-9,4 % y el capital invertido es pequeño porque Anker no fabrica (inmovilizado de 1.789 M, casi todo el edificio de oficinas) y los proveedores financian parte de las existencias [A1, A4]. El ROE (26 % en 2025) es menor porque el patrimonio lleva unos 7.000 M de caja e inversiones que rinden poco. El riesgo es el circulante: las existencias pasaron del 13 % al 20 % de las ventas LTM en año y medio, y si no se venden a precio lleno el ROIC baja por las dos vías (margen y capital) [A6]. Sin fondo de comercio, el ROIC sin compras es el mismo.',
    confianza: 'Media',
  },
};

const objetivo_comentario = 'El objetivo a 12 meses (ponderado 132,89 CNY; base 134,76) da una rentabilidad del 22,6 % ponderada y del 24,3 % en el base, con el dividendo. No sale de un múltiplo más alto: el PER base (18,9 veces) apenas se mueve desde el actual (18,7 veces nuestro BPA de 2027e) hacia la mediana adelantada (19,1). Sale del crecimiento del beneficio de 2027e a 2028e (+21 %: ventas +15 % y medio punto más de margen) y del dividendo (2,3 %). El valor intrínseco (114,72 CNY) queda solo un 3,9 % por encima del precio: cumple el requisito, sin margen de seguridad. El control v2 (PER al cierre, mediana de 24,2 veces) daría un objetivo más alto; el selector se queda con la v3.';

const diferencia_consenso = 'Nuestro BPA de 2027e (5,91) queda un 20 % por debajo del consenso (7,43) y el de 2028e (7,13), un 20 % por debajo (8,90) [D3]. La diferencia es de margen, no de ventas: el consenso espera un margen EBITDA del 11,8 % en 2027e-2028e y nosotros el 9,5-10 %, porque el salto del 1S26 se apoyó en la devolución de aranceles (≈ 700 M) y sin ella el margen del semestre no mejoró [A6, A14, A15]. Nuestro base (134,76) queda un 11 % por debajo del objetivo medio de los analistas (150,79) [D8].';

const riesgos = {
  items: [
    { riesgo: 'Aranceles de EE. UU. sobre la electrónica china (vencen las exclusiones de la sección 301 y la tregua el 10-nov-2026)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −30 % (escenario bajista: 77,56 CNY en el DCF)', mitigante: 'El IEEPA fue anulado y se devuelve; Anker produce parte fuera de China y subió precios en 2025 sin perder volumen; Norteamérica es el 46 % de las ventas [A10, A1].', senal: 'Un arancel nuevo de más del 10 % sobre los cargadores, baterías y audio chinos, o el margen bruto trimestral (sin devoluciones) por debajo del 43 %' },
    { riesgo: 'Dependencia de Amazon (52 % de las ventas en 2025)', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 % por cada 2 puntos de comisión o publicidad adicional; la rescisión sería −40 % o más', mitigante: 'El peso baja (57 % en 2023, 46 % en el 1S26) con la web propia (+39 %), otras plataformas (+96 %) y la venta física (30 %); Anker es la marca de carga más vendida de Amazon [A6, A10].', senal: 'Cambios en las tarifas de logística o publicidad de Amazon, o bloqueo de fichas de producto' },
    { riesgo: 'Seguridad de las baterías: nuevas retiradas o demandas', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −8 % (una retirada como la de 2025, ≤ 1 % de las ventas, más el daño de marca)', mitigante: 'Ruptura con el proveedor de celdas fallido, más control de celdas y primera marca en certificar la norma china de 2026 [A10, B5].', senal: 'Avisos de la CPSC o de la UE sobre productos Anker; provisión de garantías por encima de 300 M' },
    { riesgo: 'Existencias y descuentos (6.734 M a jun-2026)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Producto de rotación en canales propios; el deterioro ya va por la cuenta (444 M en el 1S26) [A6].', senal: 'Existencias por encima del 22 % de las ventas LTM o deterioro anual de más de 800 M' },
    { riesgo: 'Competencia china en almacenamiento y carga (EcoFlow, Jackery, Ugreen, Baseus)', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Marca, I+D del 9-11 % de las ventas y cuota de líder en carga móvil y balcón [B1].', senal: 'Margen bruto de carga y almacenamiento por debajo del 40 % (41,3 % en 2025)' },
    { riesgo: 'Yuan fuerte y pérdidas de cambio', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 % a −5 %', mitigante: 'Vende en dólares, euros y yenes y compra parte en dólares; coberturas a plazo [A9].', senal: 'Pérdidas de cambio de más de 200 M en un semestre' },
    { riesgo: 'Dilución y gobierno: control del fundador, emisiones sin necesidad de caja', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Reparto del 50 % del beneficio; minoritarios votan en junta (dividendo a cuenta aprobado con el 99,999 % en septiembre) [C7, A12].', senal: 'Nueva emisión de acciones o de convertible' },
  ],
  premortem: 'Octubre de 2029: Anker vale un 40 % menos. Lo que pasó: en noviembre de 2026 vencieron las exclusiones de la sección 301 y EE. UU. impuso un arancel nuevo a la electrónica china con otra base legal; Anker pagó un 6-8 % de sus ventas en aranceles y solo trasladó la mitad al precio. A la vez, Amazon subió las tarifas de logística y publicidad, y EcoFlow y las marcas de Shenzhen hundieron los precios del almacenamiento de balcón en Europa. Las existencias acumuladas en 2025-2026 se liquidaron con descuento y el margen EBITDA volvió al 7 % de 2021-2022. El mercado pasó a pagar 13-15 veces un beneficio que no crecía, como en 2022.',
  ia: {
    exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '−5 % a +5 %',
    comentario: 'Anker vende objetos físicos (cargadores, baterías, cámaras, auriculares) y la IA no los sustituye. Le favorece en producto: auriculares con chip propio de IA, grabadoras con transcripción y cámaras y robots que reconocen objetos, que suben el precio medio, y los centros de datos no le afectan [A6, A14]. Le perjudica por tres vías menores: los asistentes de compra con IA (en Amazon y en buscadores) pueden quitar valor a la marca y al posicionamiento que Anker compra con publicidad; la IA abarata el diseño y el marketing de los rivales chinos, que copian más rápido; y los grandes de los teléfonos (Apple, Samsung, Xiaomi) integran funciones de IA que quitan sentido a algunos accesorios. Señal: el peso de la publicidad en los gastos de venta (22 % de las ventas en 2025) y el precio medio de los productos de audio [A1].',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '29-oct-2026', evento: 'Resultados del 3T26 (consejo del 29-oct)', efecto: 'Margen bruto sin la devolución de aranceles, existencias y posible pérdida de valor razonable que anticipa Soochow [D11, D4]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '10-nov-2026', evento: 'Vencen las exclusiones de la sección 301 y la tregua comercial EE. UU.-China', efecto: 'Define los aranceles de 2027 sobre el 46 % de las ventas [D19]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'nov-dic-2026', evento: 'Black Friday y Navidad', efecto: 'El 4T trae ≈ 30 % de las ventas; medida de la rotación de las existencias [A1]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027 (sin fecha)', evento: 'Más devoluciones de aranceles IEEPA', efecto: 'Cobro pendiente posible de lo pagado en 2025 (143 M USD en total de aranceles) no contabilizado [A10]', probabilidad: 'Media', sentido: '+' },
    { fecha: 'abr-2027', evento: 'Resultados de 2026 y dividendo final', efecto: 'Primer año completo con NIIF y acciones H; reparto del 50 % del beneficio [A1]', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Aranceles', pregunta: '¿Cuánto fue exactamente la devolución de aranceles IEEPA del 1S26 y cuánto queda por cobrar de lo pagado en 2025?', por_que: 'Separa el margen recurrente del puntual; el consenso lo mezcla.' },
    { tema: 'Margen', pregunta: '¿Cuál fue el margen bruto del 2T26 sin la devolución y cuánto del aumento es mezcla de producto y cuánto precio?', por_que: 'Es la diferencia entre nuestro base (10 %) y el consenso (12 %).' },
    { tema: 'Existencias', pregunta: '¿Qué parte de los 6.734 M de existencias es acopio ante aranceles, cuánto es almacenamiento y qué antigüedad tienen?', por_que: 'Riesgo de descuentos y deterioros en 2027.' },
    { tema: 'Amazon', pregunta: '¿Cómo evolucionan las comisiones y la publicidad en Amazon como porcentaje de las ventas de ese canal?', por_que: 'La mitad del negocio depende de un contrato que se rescinde con 30 días.' },
    { tema: 'Baterías', pregunta: '¿Cuál fue el coste total de las retiradas de 2025 y qué controles hay sobre los nuevos proveedores de celdas?', por_que: 'El folleto solo da un tope (≤ 1 % de las ventas).' },
    { tema: 'Hong Kong', pregunta: '¿Para qué se usarán los ≈ 4.100 M de la salida a Hong Kong si la empresa ya tenía caja neta?', por_que: 'Dilución del 9 % sin necesidad aparente de caja.' },
  ],
  confianza: 'Media',
};

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. El objetivo a 12 meses es de 132,89 CNY (ponderado) y 134,76 CNY en el caso base, frente a un precio de 110,40 CNY (cierre del 19-oct-2026): la rentabilidad a 12 meses, con el dividendo, es del 22,6 % ponderada y del 24,3 % en el base, por encima del 15 % y el 12 % que pide la regla, y el valor intrínseco (114,72 CNY) supera al precio por poco (3,9 %). La convicción es baja porque el margen de seguridad sobre el valor intrínseco es casi nulo, porque la regla absoluta del DCF da Mantener y solo la relativa da Comprar, y porque la mitad del negocio depende de dos cosas que Anker no controla: Amazon y los aranceles de EE. UU. Para un particular, la vía es la acción H de Hong Kong (≈ 18 % más barata): la A del ChiNext no se puede comprar por Stock Connect desde IBKR [D10, D2].

**El negocio.** Anker diseña y vende cargadores, baterías, almacenamiento doméstico, cámaras, robots y auriculares con marca propia, sin fábricas, sobre todo en Norteamérica y Europa y la mitad por Amazon [B2, A10]. Gana dinero de verdad: ROIC del 34 % en 2025 frente a un WACC del 8,0 %, crecimiento de las ventas del 24,8 % anual en 2021-2025 sin compras y caja neta [A1]. La sostenibilidad del crecimiento es «Sí»: proyectar un 14,5 % anual exige que el capital nuevo rinda un 44,5 %, por debajo de su rendimiento incremental histórico (58 %), y la cuota pasaría solo del 2,2 % al 2,5 % de sus mercados.

**Sector y ciclo.** Los nueve mercados de Anker crecen un 12,6 % anual hasta 2030 según Frost & Sullivan, con el almacenamiento de consumo al 19,6 % [B1]. El riesgo no es de demanda sino de acceso: aranceles en EE. UU. (las exclusiones de la sección 301 vencen el 10-nov-2026) y comisiones de Amazon [B4].

**Finanzas.** Caja neta ajustada de unos 10.000 M con la salida a Hong Kong y las inversiones [A6, A16]. El problema son las existencias (6.734 M, +108 % en año y medio) y una conversión de caja del 19 % en 2025 [A1, A6]. El beneficio del 1S26 (+45,9 %) lleva ≈ 700 M de devolución de aranceles que no se repite; sin ella, el margen no mejoró [A14, A15].

**Valoración.** El DCF da 113,46 CNY (WACC del 7,97 %, terminal del 1 %, 76 % del valor en el terminal). El precio descuenta un crecimiento del 10,5 % anual en 2027-2031e frente a nuestro 12,0 %, y una rentabilidad implícita del 8,2 %, en línea con el WACC. Con la prima implícita del mercado (4,2 %) el valor sería de 132,64 CNY. Cotiza a 18,7 veces nuestro BPA de 2027e, cerca de su mediana adelantada (19,1), y a 15,4 veces el consenso, por debajo de la mediana de los comparables (17,2). Discrepamos del consenso en el margen: nuestro BPA de 2028e (7,13) es un 20 % inferior.

**Riesgos y catalizadores.** El riesgo dominante son los aranceles de EE. UU.: el bajista (77,56 CNY en el DCF, −29,7 %) recoge un margen 2 puntos más bajo y menos crecimiento. Le siguen Amazon (52 % de las ventas), las existencias y la seguridad de las baterías (retiradas de 2,9 millones de unidades en 2025) [B5]. Catalizadores: el 3T26 (29-oct) y la decisión arancelaria del 10-nov. Los foros chinos están decepcionados por el margen inflado del 2T; no añaden un riesgo nuevo [E1].

**Qué cambiaría la decisión.** Seguiría siendo compra por debajo de 114,72 CNY y pasaría a vender por encima de 150,43 CNY. Bajaríamos el caso base si llega un arancel nuevo de más del 10 % sobre la electrónica china o si el margen bruto trimestral sin devoluciones cae por debajo del 43 %; lo subiríamos si el 3T26 confirma un margen bruto del 47 % sin ayudas.`;

const resumen = {
  recomendacion: 'Comprar', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis,
  tesis: 'Anker es la primera marca mundial de carga móvil (4,8 % del mercado) y una de las pocas marcas chinas de electrónica que vende con precio de marca en Occidente: margen bruto del 45 % y ROIC del 34 % sin fábricas propias [B1, A1]. Ha triplicado las ventas desde 2020 sin compras y reparte la mitad del beneficio.\n\nA 110,40 CNY la acción ha caído un 21 % desde el máximo de septiembre por dos motivos: la venta general de hardware tras el festivo de octubre y la sospecha de que el margen del 2T26 estaba inflado por la devolución de aranceles. Lo segundo es cierto, y nuestro caso base ya lo quita: con un margen EBITDA del 9,5-10 %, como el de 2023-2025, el beneficio por acción de 2028e (7,13 CNY) queda un 20 % por debajo del consenso y aun así la regla a 12 meses da un 22,6 % de rentabilidad ponderada.\n\nLa tesis es de crecimiento a precio normal, no de múltiplo: el PER no tiene que subir. El riesgo está en lo que Anker no controla (aranceles, Amazon) y por eso la convicción es baja y el valor intrínseco (114,72) apenas supera el precio.',
  vision_diferencial: {
    mercado_descuenta: 'Que el margen del 1S26 es el nuevo normal: los analistas esperan un margen EBITDA del 12-13 % en 2027e y un BPA de 8,90 CNY en 2028e, con un objetivo medio de 150,79 CNY. El precio, en cambio, solo descuenta un crecimiento del 10,5 % anual en 2027-2031e.',
    nuestra_vision: 'El margen recurrente es el de 2023-2025 (9-10 % de EBITDA) y el crecimiento sigue fuerte (+20 % y +15 % en 2027e-2028e): basta para una rentabilidad del 24 % en el base sin que suba el múltiplo, pero el valor intrínseco (114,72) da poco margen.',
    por_que: 'El salto del 2T26 se explica por la devolución de ≈ 700 M de aranceles; sin ella, el margen EBIT del 1S26 fue del 7,4 % frente al 7,8 % del 1S25. Somos más prudentes que el consenso en margen y aun así la cuenta sale.',
  },
  a_favor: [
    '**ROIC del 34 %** en 2025 frente a un WACC del 8,0 %, sin fábricas ni compras [A1].',
    '**Ventas +24,8 % anual** en 2021-2025 y +29,1 % en el 1S26 [A1, A6].',
    '**Líder mundial en carga móvil** (4,8 %) y en almacenamiento de balcón (14,6 %) [B1].',
    '**Caja neta de unos 10.000 M** con la salida a Hong Kong y reparto del 50 % del beneficio [A6, A16].',
    '**Amazon pesa menos cada año**: 57 % en 2023, 46 % en el 1S26 [A10, A6].',
  ],
  en_contra: [
    '**Aranceles de EE. UU.**: 3,4 % de las ventas en 2025 y decisiones pendientes el 10-nov-2026 [A10, D19].',
    '**Amazon**: la mitad de las ventas con un contrato que se rescinde con 30 días [A10].',
    '**Existencias de 6.734 M** (+108 % en año y medio) y conversión de caja del 19 % en 2025 [A6, A1].',
    '**Margen del 1S26 inflado** por ≈ 700 M de devolución de aranceles [A14, A15].',
    '**Retiradas de 2,9 millones de baterías** en 2025 y pleitos por privacidad y patentes en EE. UU. [B5].',
  ],
  que_vigilar: 'La tesis depende de que el margen EBITDA se quede en el 9,5-10 % sin ayudas mientras las ventas crecen un 15-20 %. La señal está en el margen bruto trimestral sin devoluciones (≥ 45 %), en las existencias (que no pasen del 22 % de las ventas LTM) y en la decisión arancelaria del 10-nov-2026: si llega un arancel nuevo de más del 10 %, el bajista pasa a ser el central.',
  cambiaria_recomendacion: [
    'Precio por encima de 114,72 CNY: pasaría a Mantener (el valor intrínseco quedaría por debajo del precio).',
    'Precio por encima de 150,43 CNY: pasaría a Vender.',
    'Arancel nuevo de EE. UU. de más del 10 % sobre la electrónica china: bajaríamos el margen de toda la proyección.',
    'Margen bruto trimestral sin devoluciones por debajo del 43 %: el margen EBITDA del 10 % sobraría.',
    'Margen bruto del 47 % sin ayudas en el 3T26 y el 4T26: subiríamos el caso base hacia el consenso.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen bruto trimestral (sin devoluciones de aranceles)', nivel_actual: '≈ 47 % en el 2T26 (55,1 % publicado)', umbral_alerta: '< 43 %', por_que: 'Poder de precios frente a aranceles y competencia.' },
    { kpi: 'Peso de Amazon en las ventas', nivel_actual: '46,4 % (1S26)', umbral_alerta: '> 55 % o cambio de tarifas', por_que: 'Dependencia de un canal.' },
    { kpi: 'Existencias sobre ventas LTM', nivel_actual: '19,7 % (jun-26)', umbral_alerta: '> 22 %', por_que: 'Riesgo de descuentos y deterioros.' },
    { kpi: 'Aranceles pagados en EE. UU. sobre ventas', nivel_actual: '3,4 % (2025)', umbral_alerta: '> 5 %', por_que: 'Coste directo sobre el 46 % de las ventas.' },
    { kpi: 'Crecimiento de las ventas', nivel_actual: '+29,1 % (1S26)', umbral_alerta: '< 12 % en un semestre', por_que: 'La tesis pide +15-20 % en 2027e-2028e.' },
  ],
  confianza: 'Media',
};

export default {
  limitaciones, huecos, controles_explicados, secciones, objetivo_comentario, diferencia_consenso,
  riesgos, catalizadores, preguntas, resumen,
  suma_partes_comentario: 'No aplica: las tres líneas comparten marca, canales (Amazon, web, tiendas), I+D y cadena de suministro, y la empresa solo publica ventas y margen bruto por línea, sin resultado operativo [A1]. No hay una parte con valor de mercado separable.',
  dcf_justificacion: {
    crecimiento: '2026e queda medio cerrado (+27 %): ventas del 1S26 de 16.605 M (+29,1 %) y un segundo semestre algo más lento por la comparación con el acopio de 2025 [A6]. Después +20 % en 2027e y +15 % en 2028e, por debajo del consenso (+22 % y +19 %), y del 11 % al 6 % hasta 2031e, cerca del mercado de Frost & Sullivan (+12,6 % anual en 2025-2030) [B1, D4, D5].',
    margenes: 'Margen EBITDA con nuestra definición (sin tesorería, valor razonable ni cambio): 7,2 % en 2021, 7,4 % en 2022, 10,1 % en 2023 y 9,0 % en 2024 y 2025; 8,9 % en el LTM de junio sin la devolución de aranceles [A1, A6]. Lo dejo en el 9,0 % en 2026e (sin la devolución, que ya está en la caja de junio), 9,5 % en 2027e y 10 % desde 2028e: la mezcla (almacenamiento, audio con IA) y la I+D que deja de crecer más que las ventas compensan aranceles y competencia [A6, A14].',
    inversion: 'Capex del 1,2 % de las ventas (365 M en 2025), sin fábricas, que baja al 1,0 % en 2030e, por encima de la amortización (0,8 %) [A1]. El circulante comercial se queda en el 15 % de las ventas, como en 2025 (14,9 %), y no vuelve al 9-11 % de 2023-2024: las existencias altas siguen [A1, A6].',
    wacc: 'Tasa libre del 1,6497 % (bono chino a 10 años, ChinaBond, 19-oct-2026) en CNY, la divisa de las cuentas [D6]. Beta de 1,0: la mensual de cinco años frente al CSI 300 es de 0,99 y la semanal de dos años de 1,0 [D1]. Prima de mercado del 5,5 % y prima adicional del 1,0 %: medio punto por China (sede, divisa, controles de capital) aunque vende el 97 % fuera, y medio punto por riesgo específico (Amazon, aranceles de EE. UU.). Coste de la deuda del 2,5 % y peso del 3 % (1.958 M de deuda y arrendamientos frente a 66.229 M de capital); el convertible se trata como acciones.',
    terminal: 'Crecimiento a perpetuidad del 1,0 % en CNY: con el bono a 10 años al 1,65 %, el techo de la regla (tasa libre menos medio punto) es el 1,15 % [D6]. Gordon con un WACC del 7,97 %; el valor terminal pesa el 76 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: ventas del 1S26 +29,1 % con carga y almacenamiento +31 %, eufy +29 % y audio +24 %; precio medio al alza por la mezcla (almacenamiento, audio con IA) [A6, A14].',
    '2027e': 'Más volumen en almacenamiento doméstico y de balcón (Europa, Australia) y en canales fuera de Amazon; algo de precio por productos con IA [A14, B7].',
    '2028e': 'Crecimiento por encima del mercado (+12,6 %) con ganancia de cuota pequeña; precio estable [B1].',
    '2029e': 'Convergencia hacia el crecimiento de sus mercados [B1].',
    '2030e': 'Por debajo del mercado: madurez de la carga móvil (+9,7 % anual previsto) [B1].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (14,5 % anual) reinvierte el 27 % del NOPAT; con el ROIC de 2025 (34,2 %) eso financia un 9,1 % anual, y el resto exige que el capital nuevo rinda un 44,5 %: por debajo del rendimiento incremental histórico (58,2 %), porque Anker crece sin fábricas y con poco capital, aunque por encima del ROIC medio. La cuota implícita pasa del 2,2 % al 2,5 % de sus nueve mercados en 2031e, 1,1 veces la actual: el crecimiento sale del mercado, no de quitar cuota. Lo más exigente es el circulante: si las existencias siguen subiendo, la reinversión será mayor.',
  narrativas: {
    Bajista: 'EE. UU. impone un arancel nuevo a la electrónica china tras el 10-nov-2026 y Amazon sube tarifas; la competencia china baja los precios del almacenamiento: el crecimiento queda 6 puntos por debajo del base cada año (+14 % en 2027e) y el margen EBITDA 2 puntos más bajo, como en 2021-2022 [A1, B4].',
    Base: 'El almacenamiento y los canales fuera de Amazon mantienen el crecimiento: ventas +20 % en 2027e y +15 % en 2028e, margen EBITDA del 10 % desde 2028e, con aranceles como los de hoy.',
    Alcista: 'El margen bruto del 47 % sin ayudas se sostiene, la I+D se apalanca y los aranceles bajan: crecimiento 5 puntos mayor cada año y margen 1 punto más alto, cerca de lo que espera el consenso [D4, D5].',
  },
  dcf_lectura: 'El DCF da 113,46 CNY por acción, un 2,8 % más que el precio, con un WACC del 7,97 % y un crecimiento terminal del 1 %; el valor terminal pesa el 76 %. El DCF inverso dice que el precio de 110,40 CNY descuenta un crecimiento del 10,5 % anual en 2027-2031e frente a nuestro 12,0 %, y una rentabilidad implícita del 8,2 %, casi igual al WACC: el mercado paga lo justo por nuestro caso base, sin descuento. Frente a la historia, nuestro base no es optimista: Anker creció un 24,8 % anual en 2021-2025 y proyectamos un 14,5 %, con el margen de 2023-2025.',
  escenarios_comentario: 'La asimetría es desfavorable con nuestro WACC: el alcista (138,82 CNY, +25,7 %) gana algo menos de lo que pierde el bajista (77,56 CNY, −29,7 %), con probabilidades de 25/50/25. El bajista no es extremo: crecimiento 6 puntos menor y margen 2 puntos más bajo, como en 2021-2022 [A1]. El alcista supone un margen cercano al del consenso. El valor ponderado de los escenarios (≈ 110,8 CNY) queda en el precio; con la prima implícita del mercado la asimetría pasa a 2,9 veces.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF y los escenarios recogen el crecimiento, el margen y la caja; los comparables pesan menos porque mezclan marcas chinas con márgenes de la mitad y guerra de precios (Ecovacs, Roborock) y marcas occidentales con márgenes del 17-28 % (Garmin, SharkNinja) [D8]. Sin transacciones con múltiplo publicado y sin suma de partes. El PER de los próximos doce meses de los comparables da 123,71 CNY con el BPA del consenso y el EV/EBITDA de los últimos doce meses 87,70 CNY con nuestro EBITDA sin la devolución. El puente parte del balance de junio de 2026: caja de 6.473 M (tesorería, renta fija y certificados), participaciones de 2.048 M (asociadas, cotizadas y no cotizadas), menos 1.678 M de deuda bancaria, 280 M de arrendamientos y 161 M de minoritarios; suma 4.137 M netos de la salida a Hong Kong (julio) y resta el dividendo de septiembre (470 M) [D16, A16, A17, A11]. El convertible (1.104,6 M, conversión a 105,96 CNY) va como 10,4 M de acciones más, no como deuda [D18].',
};
