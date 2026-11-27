// Textos de juicio del analista (SAP, corte 2026-11-27). Citas con la letra de la nota: [A4] = fuente 4 de A.json; [P1] = propia.

export const limitaciones = `Se valora la acción ordinaria de Xetra (SAP), en euros; precio de cierre del 26-nov-2026 (194,14 EUR): la sesión del 27-nov no había cerrado a la hora del corte (192,70-192,90 EUR a media mañana) [D46]. El ADR de la NYSE no se usa. Acciones: 1.149,6 M, las 1.152,3 M estimadas a 30-sep menos 2,66 M recompradas del 1-oct al 20-nov; lo pagado (522 M) se resta de la caja del puente [D42]. Puente a 30-sep: caja 9.364 M (solo efectivo) y deuda estimada de 8.630 M; arrendamientos, minoritarios, pensiones y participadas de fechas anteriores [D30]. No hay trimestre nuevo desde el informe del 21-oct: las cuentas, el LTM y el balance son los mismos; lo nuevo es la transcripción del 3T26, el consenso posterior, la recompra de octubre-noviembre, los comparables rehechos y los hechos de noviembre (salida de Saueressig, ciberataque, recorte de plantilla publicado por Bloomberg) [A17, D43-D54]. Cuentas en NIIF: desde 2021 las cifras son de actividades continuadas (Qualtrics, vendida en 2023, va como interrumpida), y 2017-2020 la incluyen, así que el crecimiento de 2017-2020 no es comparable [A1, A3]. Los segmentos (ATS y Core Services) solo están publicados para 2023-2025.`;

export const controles_explicados = [
  { control: 'Veredicto de sostenibilidad del analista coherente con las pruebas del motor', explicacion: 'El histórico (5,8 % anual) arrastra la salida de Qualtrics y la caída del soporte; la nube crece un 25 % en nueve meses y el backlog (+26 % a divisa constante) cubre el año próximo, así que el 8,3 % del base se sostiene sin capital. Razonado en la justificación de la sostenibilidad.' },
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con Oracle (crecimiento del 54,8 % por los contratos de infraestructura para IA) y ServiceNow (45 veces el beneficio) en la muestra, el crecimiento no explica los múltiplos; no se usa la regresión.' },
];

const rentabilidad = {
  comentario: `**SAP crea valor, pero menos de lo que sugiere su marca.** El ROIC después de impuestos fue del 15,5 % en 2025, 6,4 puntos por encima del WACC del 9,10 %; en 2022-2023 cayó al 8,4-8,5 %, por debajo de su coste de capital, por los costes de la transición a la nube y la carga de Qualtrics [A1]. El ROIC lo frena la rotación (0,51 veces): el fondo de comercio de 29.014 M es la mayor parte del capital invertido, fruto de compras como SuccessFactors, Ariba, Concur y Qualtrics [A1]; sin él, el ROIC sería del 45 %. El margen mueve el resto: el EBIT pasó del 18,6 % de 2023 al 27,2 % de 2025 (sin la reestructuración y el litigio). El ROIC incremental de la década, del 17,6 %, dice que el crecimiento reciente es de calidad. Oracle y Microsoft siguen siendo más rentables [B6, B7].`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `SAP cotiza a 17,7 veces el EBITDA de los últimos 12 meses y 28,1 veces el beneficio, un 11 % y un 18 % por debajo de su media de nueve años (19,9 y 34,2 veces), por encima del mínimo de 15,1 veces el EBITDA [D46]. Sobre el beneficio esperado, el PER de hoy (23,7 veces nuestro BPA de 2027e) queda lejos de la mediana adelantada de los cinco últimos años válidos (31,3 veces). El descuento llega tras la caída de 2025-2026 por el miedo a que los agentes de IA abaraten el software de aplicaciones y la nueva venta del sector en noviembre. No es un múltiplo de crisis, pero sí el más bajo desde 2022.`,
};

const comparables = {
  comentario: `SAP cotiza a 14,8 veces el EBITDA de los próximos 12 meses y 24,0 veces el beneficio, por encima de la mediana de los ocho grandes del software (13,6 y 17,9 veces), con un crecimiento parecido (11,9 % frente al 12,8 % de mediana) y el mismo margen (31,4 % frente al 31,1 %) [D45]. La prima ha crecido porque desde el 21-oct el software estadounidense cayó mucho más que SAP (Salesforce −18 %, Oracle −20 %, Intuit −19 %) [D53]. Se explica por la visibilidad (el 86 % de los ingresos es recurrente) y porque Adobe (10,9 veces), Intuit y Salesforce (en torno a 18) cotizan castigados por el miedo a la IA. La media de los dos múltiplos da 161,48 EUR, un 16,8 % por debajo del precio. La muestra es dispersa (de 10,9 veces Adobe a 45 ServiceNow) y su EBITDA de los próximos 12 meses es una estimación propia: pesa un 15 %.`,
};

const transacciones = {
  comentario: `Cinco compras de software empresarial de 2022-2025 a 4,9-15,4 veces las ventas del último ejercicio (estimación propia con los ingresos de sus 10-K) y primas del 29-77 % [D22-D26, P1]. Splunk, Informatica y Qualtrics se miden con el valor de las acciones, porque las notas no dan el valor empresa. Darían 298,61 EUR por acción, pero llevan prima de control y SAP, con 223.183 M de capitalización, no es objeto realista de una opa. Pesan un 5 %.`,
};

const bolsa = {
  comentario: `SAP pierde un 5,2 % en el año con dividendos, frente al +0,2 % del DAX y el +6,7 % del sector tecnológico europeo [D46]. Tras el 3T26 subió un 3,2 % y marcó máximo de 52 semanas el 5-nov (219,65 EUR intradía), pero del 17 al 20-nov cayó un 13,9 % en una venta general de la tecnología por el temor al gasto en IA financiado con deuda, en la que Salesforce, Oracle y Dassault cayeron más [D52, D53]. El primer día coincidió con la salida anunciada del director de clientes [D49]. El banco de la recompra aprovechó la caída: 1,93 M acciones en cuatro sesiones [D42]. A cinco años rinde un 12,8 % anual, por encima del DAX (9,5 %). La beta es de 1,16 y la volatilidad del 42 %, alta para su historia.`,
};

const sentimiento = {
  lectura: `El sentimiento sigue dividido y sin extremos. Tras el 3T26 mejoró entre analistas y prensa (subidas de objetivo, JPMorgan a sobreponderar, Oppenheimer la cuenta entre los ganadores de la IA) [E13, D44], mientras los particulares mantienen la duda de fondo del informe: si los clientes pagarán la IA encima de una migración cara, o si la IA abarata el ERP [E12]. La venta del 17-20-nov reavivó el «sasspocalipsis» en los foros, aunque SAP cayó menos que sus rivales estadounidenses. El ciberataque apenas se ha comentado todavía. No hay euforia ni capitulación: el sentimiento no cambia la decisión.`,
};

export const secciones = { rentabilidad, multiplos_historicos, comparables, transacciones, bolsa, sentimiento };

export const suma_partes_comentario = 'No aplica: SAP publica dos segmentos (ATS, el 89 % de los ingresos, y Core Services) solo para 2023-2025, sin comparables puros para los servicios, y los costes centrales no asignados son grandes; la suma de partes repetiría el DCF [A1].';

export const dcf_justificacion = {
  crecimiento: `2026e +10,0 %: los nueve meses crecen un 9,6 % en euros y el 3T26 un 13 % (+12 % a divisa constante); SAP lleva la nube y «nube y software» a la parte alta de sus guías (25.800-26.200 M y 36.300-36.800 M) [A14]. Parte del +26 % de la nube del 3T es una recuperación puntual (≈ 1 punto) [A17]. 2027e-2028e +11,5 %: SAP mantiene que el crecimiento acelerará en 2027, aunque en la conferencia avisó de que el 4T (la mitad de la contratación del año) puede sufrir por la macro y de que los servicios seguirán cayendo [A17]; el consenso da +12,0 % y +12,3 % [D43]. No subimos el crecimiento pese a la mejora del consenso. Después baja hasta el 4 % de 2035e. La media del caso base (8,3 %) coincide con el 8,1 % anual de 2021-2025.`,
  margenes: `Margen EBITDA NIIF del 31,5 % en 2026e: la guía de beneficio operativo no NIIF (11.800-12.200 M a divisa constante, menos 2 puntos de divisa) y unos 450 M de ajustes dan un beneficio NIIF de unos 11.400 M [A4, A14]. Sube al 36 % en 2031e porque SAP prevé que los gastos crezcan al 80-90 % de los ingresos y habla de hasta 3.000 M de eficiencias por IA en dos años [A4, A17]. El consenso da un 32,2 % en 2026e y un 33,7 % en 2028e [D43]. Si se confirma el recorte de 10.000 empleos que publica Bloomberg, su coste (la reestructuración de 2024 costó ≈ 3.000 M) caería en 2027 como no recurrente y el ahorro apoyaría el margen del base; no se incluye mientras no se anuncie [D51].`,
  inversion: `Capex del 2,8 % de las ventas: las compras de inmovilizado e intangibles (2,0 % en 2025) más los pagos de arrendamientos (0,8 %), porque la deuda incluye los arrendamientos (NIIF 16) [A1]. La nube corre en gran parte en hiperescaladores y su coste ya está en el EBITDA. Amortización del 3,3 % que converge al capex. Circulante del −4 % de las ventas, el de 2025, por los cobros anticipados de nube. Tipo impositivo del 28,5 % (28,7 % NIIF en 2025; guía no NIIF del 29 %) [A1, A4].`,
  wacc: `Tasa libre del 3,32 %, el Bund a 10 años del 26-nov-2026 (3,47 % el 21-oct) [D41]. Beta de 1,10, la mensual a 5 años frente al DAX ajustada (1,16 sin ajustar; la semanal a 2 años da 1,04) [D46]. Prima de mercado del 5,5 %. Coste de la deuda del 3,5 % (los eurobonos de 2026) y un 4 % de deuda a valor de mercado. WACC del 9,10 %; con la prima implícita del mercado de noviembre (4,41 %), el 7,94 % [D47].`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro del 2 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (2,82 %). El múltiplo de salida implícito es de 10,3 veces el EBITDA, muy por debajo de las 17,7 de hoy y del mínimo de la década (15,1): el terminal es prudente.`,
};

export const etapa2_justificacion = 'No se usa. El ROIC (15,5 %) supera al WACC en algo más de 6 puntos, pero la migración de ECC termina hacia 2030 y alargar el crecimiento sería apostar contra el riesgo que hoy teme el mercado.';

export const dcf_lectura = `El DCF da 202,04 EUR por acción, un 4,1 % por encima del precio de 194,14 EUR, con un 60 % del valor en el terminal. **Tras la caída de noviembre el precio pide algo menos que nuestro caso base.** El DCF inverso dice que los 194,14 EUR suponen un crecimiento de los ingresos del 7,8 % anual de 2026e a 2035e, frente al 8,3 % de nuestro base; o, con nuestro crecimiento, un margen EBITDA del 34,7 % en vez del 36 %. Comprar a este precio rinde un 9,4 % anual si se cumple el caso base, algo más que el WACC del 9,10 %. Con la prima de riesgo que hoy pide el mercado (4,41 %), el DCF sube a 245,79 EUR. No es una ganga: el margen de seguridad frente al DCF es de 4 % y depende de que la aceleración de 2027 se cumpla.`;

export const narrativas = {
  Bajista: `Los agentes de IA desplazan el cobro por usuario y parte de la lógica de negocio hacia capas de datos y agentes de terceros: el backlog de nube frena al 10-12 % y las migraciones de ECC se alargan, como le pasó a Oracle en 2013-2017, con los ingresos casi planos durante la transición. Crecimiento medio del 4,2 %, margen EBITDA del 33 % y crecimiento a perpetuidad del 2 %.`,
  Base: `Se cumple la guía de 2026 y los ingresos aceleran al 11,5 % en 2027-2028 con la migración de ECC antes del fin del mantenimiento, para bajar después al 4 %: crecimiento medio del 8,2 % y margen EBITDA del 36 % desde 2031.`,
  Alcista: `La migración de ECC se concentra antes de 2030 y SAP cobra la IA sobre los datos de sus clientes (Business Data Cloud, Joule): crecimiento medio del 10,7 % y margen del 38 %, más cerca del de Oracle.`,
};

export const escenarios_comentario = `La asimetría es casi neutra con nuestro coste de capital: el alcista vale 259,46 EUR (+33,6 %) y el bajista 129,66 (−33,2 %). El bajista no es cosmético: la acción tocó 127,50 EUR en julio, casi el valor de este escenario, cuando el mercado descontó el miedo a la IA [D46]. Con la prima de riesgo que hoy pide el mercado (4,41 %), el bajista sube a 153,86 EUR y el alcista a 317,62. El valor ponderado por probabilidad es de 195,43 EUR, casi el precio.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 %, comparables 15 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque el 86 % de los ingresos es recurrente y el backlog de nube (24.144 M, +26 % a divisa constante) da visibilidad a 12 meses [A1, A14]. Los escenarios pesan un 25 % porque el riesgo de la IA es asimétrico. Los comparables (161,48 EUR) pesan un 15 % por la dispersión de la muestra y porque el software de EE. UU. cotiza hoy castigado, y las transacciones (298,61 EUR) un 5 % porque llevan prima de control y sus múltiplos son estimaciones. El valor intrínseco es de 199,13 EUR, un 2,6 % por encima del precio.`;

export const catalizadores = {
  items: [
    { fecha: 'Diciembre de 2026 (sin fecha)', evento: 'Conclusiones de la investigación del ciberataque («Project Granite»)', efecto: 'Si el código alterado no llegó a productos de clientes, se cierra el hecho pendiente; si llegó, daño reputacional y costes [D50, D54]', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '28-ene-2027 (probable)', evento: 'Resultados de 2026, contratación del 4T y guía de 2027', efecto: 'Confirmará o no la aceleración de los ingresos y los gastos al 80-90 % del crecimiento; el 4T concentra la mitad de la contratación anual [A17]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Enero de 2027 (con los resultados)', evento: 'Posible plan de reestructuración (≥ 10.000 empleos según Bloomberg)', efecto: 'Cargo no recurrente en 2027 y ahorro desde 2028 [D51]', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Hasta el 27-ene-2027 y el 31-dic-2027', evento: 'Recompra: ≈ 548 M pendientes del tramo 2 y ≈ 5.300 M del programa de 10.000 M', efecto: 'Retiraría un 2,4 % del capital al precio de hoy [D42]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '31-mar-2027', evento: 'Salida de Thomas Saueressig; sucesor definitivo del área de clientes', efecto: 'Continuidad comercial en el año de la aceleración [D49]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '31-dic-2027', evento: 'Fin del mantenimiento estándar de SAP ECC', efecto: 'Fuerza la migración de la base instalada a S/4HANA y RISE', probabilidad: 'Alta', sentido: '+' },
    { fecha: '13-sep-2027', evento: 'Juicio de Celonis contra SAP en EE. UU.', efecto: 'Litigio sobre el acceso a los datos del ERP', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Los agentes de IA abaratan el software de aplicaciones o desplazan el cobro por usuario', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 129,66 EUR, −36 % sobre el DCF base', mitigante: 'El ERP es el sistema de registro de los procesos y los datos; costes de cambio altos', senal: 'Crecimiento del current cloud backlog por debajo del 20 % a divisa constante' },
    { riesgo: 'Desaceleración de la nube cuando termine la ola de migraciones de ECC', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Cada punto menos de crecimiento anual quita 15,00 EUR (−7 %)', mitigante: 'Soporte ampliado hasta 2030 y venta de IA y datos sobre la base instalada', senal: 'Ingresos de la Cloud ERP Suite por debajo del +20 %' },
    { riesgo: 'Divisa: el 39 % de los ingresos viene de América', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'La guía de 2026 preveía 3 puntos menos de crecimiento de la nube por la divisa', mitigante: 'Costes también en dólares', senal: 'Euro por encima de 1,20 USD' },
    { riesgo: 'Costes de la IA y de la nube presionan el margen bruto', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Un punto menos de margen EBITDA quita 5,97 EUR (−3 %)', mitigante: 'Congelación de plantilla, eficiencias por IA (hasta 3.000 M en dos años) y cambio a modelos abiertos más baratos', senal: 'Margen bruto de nube por debajo del 73 %' },
    { riesgo: 'Ciberataque con código fuente alterado («Project Granite», nov-2026)', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Si el código llegó a clientes, daño de confianza y costes difíciles de medir; hoy sin indicios de acceso a datos de clientes', mitigante: 'Claves de firma cambiadas, acceso a GitHub restringido, investigación en curso [D50, D54]', senal: 'Avisos de seguridad de SAP o de agencias (BSI, CISA) sobre productos afectados' },
    { riesgo: 'Rotación en el Executive Board', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Sin efecto directo en las cifras', mitigante: 'CEO y CFO estables; interino nombrado para clientes [D49]', senal: 'Nuevas salidas antes de la aceleración de 2027' },
    { riesgo: 'Oracle gana cuota en ERP', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Ya es primero en ERP según Apps Run The World', mitigante: 'Base instalada de SAP en las grandes empresas europeas', senal: 'Pérdida de grandes contratos de migración' },
    { riesgo: 'Regulación: compromisos con la Comisión Europea sobre el soporte del ERP', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'SAP no espera impacto material', mitigante: 'Sin multa; diez años de compromisos', senal: 'Caída del soporte más rápida que la guía' },
    { riesgo: 'Compras de IA y datos que diluyen el margen', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Dremio y Prior Labs restan más de 100 M al beneficio de 2026', mitigante: 'Compras pequeñas frente a la caja', senal: 'Nueva compra de más de 5.000 M' },
  ],
  ia: {
    exposicion: 'Alta',
    sentido: 'Mixto',
    efecto_valor: 'Entre −33 % (bajista: 129,66 EUR) y +28 % (alcista: 259,46 EUR) sobre el DCF base a 3-5 años',
    comentario: `La IA toca casi todo el negocio. Como amenaza: los agentes pueden reducir los usuarios que pagan licencia (el 86 % de los ingresos es recurrente y gran parte se cobra por usuario) y desplazar la lógica de negocio a capas de datos y agentes de terceros; es lo que el mercado vendió en junio y otra vez del 17 al 20-nov [D46, D53]. Como oportunidad: SAP tiene los datos y procesos de las grandes empresas; 9 de cada 10 de sus 50 mayores contratos del 3T26 incluyeron Business AI y Business Data Cloud, y dentro de casa habla de hasta 3.000 M de eficiencias en dos años y de un 70 % más de código por desarrollador [A17]. En costes, la IA baja el margen bruto de nube (−0,7 puntos en el 3T26) y SAP responde cambiando a modelos más baratos [A14, A17]. No publica ingresos de IA. Señal: backlog de nube por debajo del 20 % a divisa constante o ingresos por cliente a la baja en las renovaciones.`,
  },
  premortem: `Noviembre de 2029: la acción ha caído un 40 %, a unos 115 EUR. La historia más probable empieza en 2027: los grandes clientes terminan las migraciones a S/4HANA, pero los nuevos contratos de nube se firman con menos usuarios porque los agentes de IA hacen el trabajo de los empleados que antes pagaban licencia. El backlog de nube frena del 25 % al 12 % en dos años y SAP no consigue cobrar los agentes por uso al mismo ritmo. Los costes de cómputo de la IA bajan el margen bruto de la nube y la expansión del margen operativo se queda en un punto. El mercado deja de ver a SAP como un compuesto de crecimiento y lo valora como a Oracle en 2015, a 10-11 veces el EBITDA. El indicador que lo habría anticipado: el crecimiento del current cloud backlog a divisa constante por debajo del 20 % y la caída del margen bruto de la nube, que ya bajó 0,7 puntos en el 3T26, al 74,3 % [A14].`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'IA y precios', pregunta: '¿Qué parte de los nuevos contratos de nube se cobra por uso y no por usuario, y qué pasa con el ingreso por cliente cuando los agentes sustituyen empleados?', por_que: 'Es el riesgo que el precio teme y que el bajista recoge.' },
    { tema: 'Backlog', pregunta: '¿Cuánto del current cloud backlog viene de migraciones de ECC y cuánto de clientes nuevos?', por_que: 'Decide si el crecimiento sobrevive al fin de la ola de migraciones.' },
    { tema: 'Ciberataque', pregunta: '¿Llegó a algún producto entregado a clientes el código alterado en GitHub, y qué repositorios (propios o de código abierto) se vieron afectados?', por_que: 'Decide si el incidente es un problema de imagen o un ataque a la cadena de suministro; es el hecho que retrasa la compra.' },
    { tema: 'Margen', pregunta: '¿Qué margen bruto de nube espera cuando los costes de los modelos de IA crezcan con el uso?', por_que: 'El margen bruto de nube bajó 0,7 puntos en el 3T26.' },
    { tema: 'Compras', pregunta: '¿Qué rentabilidad esperan de Reltio, Dremio y Prior Labs, y hay más compras de datos e IA en camino?', por_que: 'Restan más de 100 M al beneficio de 2026.' },
    { tema: 'Comisión Europea', pregunta: '¿Qué ingresos de soporte quedan expuestos a terceros por los compromisos de julio de 2026?', por_que: 'El soporte aún es el 25 % de los ingresos del 1S26.' },
    { tema: 'Recompras', pregunta: '¿Habrá un tramo nuevo tras el 27-ene-2027 (≈ 5.300 M pendientes del programa) y se acelerará si la acción vuelve a la zona de 130-160 EUR?', por_que: 'A esos precios la rentabilidad para el accionista sube mucho.' },
  ],
  confianza: 'Media',
};
