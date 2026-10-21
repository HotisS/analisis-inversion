// Textos de juicio del analista (SAP, corte 2026-10-11). Citas con la letra de la nota: [A4] = fuente 4 de A.json; [P1] = propia.

export const limitaciones = `Se valora la acción ordinaria de Xetra (SAP), en euros; precio de cierre del 21-oct-2026 (208,65 EUR), anterior a los resultados del 3T26, publicados ese día tras el cierre; el ADR subía un 4 % fuera de hora (≈215,6 EUR) [D30, D32]. El ADR de la NYSE no se usa. Acciones: 1.152,3 M, las de 30-jun menos las 8,93 M recompradas en el 3T26 más ≈7 M de dilución de los planes de acciones [D30]. Puente a 30-sep: caja 9.364 M (solo efectivo; los depósitos a corto no se publican en el trimestral) y deuda estimada de 8.630 M; arrendamientos, minoritarios, pensiones y participadas de fechas anteriores [D30]. Cuentas en NIIF: desde 2021 las cifras son de actividades continuadas (Qualtrics, vendida en 2023, va como actividad interrumpida), y 2017-2020 la incluyen (consolidada desde enero de 2019), así que el crecimiento de 2017-2020 no es comparable [A1, A3]. La amortización de 2021-2023 sale del estado de flujos y aún incluye la de Qualtrics. Segmentos: SAP solo publica los dos actuales (ATS y Core Services) para 2023-2025. El EBITDA es NIIF, con los pagos en acciones como gasto (4,6 % de las ventas en 2025); el no NIIF de SAP también los incluye desde 2024, así que el consenso de MarketScreener se toma como NIIF [D7, A1]. El circulante incluye los pasivos de contrato (cobros anticipados de nube y soporte). Las inversiones de capital riesgo (Sapphire Ventures, 6.574 M a valor razonable a dic-25) se suman en el puente como asociadas [D10].`;

export const controles_explicados = [
  { control: 'Veredicto de sostenibilidad del analista coherente con las pruebas del motor', explicacion: 'El histórico (5,8 % anual) arrastra la salida de Qualtrics y la caída del soporte; la nube crece un 25 % en nueve meses y el backlog (+26 % a divisa constante) cubre el año próximo, así que el 8,3 % del base se sostiene sin capital. Razonado en la justificación de la sostenibilidad.' },
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con Oracle (crecimiento del 38,8 % por los contratos de infraestructura para IA) y ServiceNow (33 veces) en la muestra, el crecimiento no explica los múltiplos; no se usa la regresión.' },
];

const rentabilidad = {
  comentario: `**SAP crea valor, pero menos de lo que sugiere su marca.** El ROIC después de impuestos fue del 15,5 % en 2025, 6,2 puntos por encima del WACC del 9,30 %; en 2022-2023 cayó al 8,4-8,5 %, por debajo de su coste de capital, por los costes de la transición a la nube y la carga de Qualtrics [A1]. El ROIC lo frena la rotación (0,51 veces): el fondo de comercio de 29.014 M es el 63 % del capital invertido, fruto de compras como SuccessFactors, Ariba, Concur y Qualtrics [A1]. El margen mueve el resto: el EBIT pasó del 18,6 % de 2023 al 27,2 % de 2025 (sin la reestructuración y el litigio). El ROIC incremental de la década, del 17,6 %, dice que el crecimiento reciente es de calidad. Oracle (30,6 % de margen EBIT) y Microsoft (46,8 %) siguen siendo más rentables [B6, B7].`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `SAP cotiza a 18,2 veces el EBITDA de los últimos 12 meses y 28,7 veces el beneficio, un 9 % y un 16 % por debajo de su media de nueve años (19,9 y 34,2 veces), aunque por encima del mínimo de 15,1 veces [D3]. El descuento llega después de una caída del 47,8 % desde el máximo de octubre de 2025 hasta julio de 2026: el mercado dejó de pagar la prima de 2024 (30,9 veces) por miedo a que los agentes de IA abaraten el software de aplicaciones, y la recuperación posterior (+50 % desde julio) ha devuelto el múltiplo a la zona media. No es un múltiplo de crisis.`,
};

const comparables = {
  comentario: `SAP cotiza a 15,1 veces el EBITDA de los próximos 12 meses y 24,2 veces el beneficio, por encima de la mediana de los ocho grandes del software (11,8 y 21,8 veces) con un crecimiento parecido (10,6 % de mediana; el consenso da a SAP un +11,7 % en 2027) y menos margen (31,1 % frente al 34 %) [D13-D20]. La prima se explica por la visibilidad (el 86 % de los ingresos es recurrente) y porque Adobe, Intuit y Salesforce cotizan castigados por el mismo miedo a la IA. La mediana daría 161,12 EUR, un 15,8 % por debajo del precio. La muestra es dispersa (de 8,3 veces Adobe a 33 veces ServiceNow): pesa un 15 %.`,
};

const transacciones = {
  comentario: `Cinco compras de software empresarial de 2022-2025 a 4,9-15,4 veces las ventas del último ejercicio (estimación propia con los ingresos de sus 10-K) y primas del 29-77 % [D22-D26, P1]. Splunk, Informatica y Qualtrics se miden con el valor de las acciones, porque las notas no dan el valor empresa. Darían 288,79 EUR por acción, pero llevan prima de control y SAP, con 221.940 M de capitalización, no es objeto realista de una opa. Pesan un 5 %.`,
};

const bolsa = {
  comentario: `SAP ha rentado un −15,5 % en un año, frente al +3,0 % del DAX y el +28,0 % del sector tecnológico europeo, que tira de los semiconductores [D3]. Dos sesiones lo explican: el −16,1 % del 29-ene-2026, cuando la guía anticipó que el backlog de nube frenaría, y el mínimo de 127,50 EUR del 23-jul-2026, en plena venta de software de aplicaciones por la IA [D3, A7]. Desde julio ha subido un 50 %, con compras de la dirección a 133,56-179,15 EUR [C17, C19]. A cinco años rinde un 12,2 % anual, por encima del DAX (9,9 %). La beta es de 1,15 y la volatilidad del 41,6 %, alta para su historia.`,
};

const sentimiento = {
  lectura: `El inversor particular alemán está más animado que los analistas: compró en los mínimos de julio y habla de objetivos por encima de 200 EUR, mientras UBS y Santander bajaban la recomendación en septiembre porque el precio ya recogía la recuperación y los agentes de IA se monetizan despacio [E1, E2, E6, E7]. El debate de fondo es el mismo que el del informe: si la IA convierte el ERP en una pieza más barata. Los foros no recogen el riesgo de que el backlog de nube frene, que es lo que hundió la acción en enero. No hay euforia ni capitulación: el sentimiento no cambia la decisión.`,
};

export const secciones = { rentabilidad, multiplos_historicos, comparables, transacciones, bolsa, sentimiento };

export const suma_partes_comentario = 'No aplica: SAP publica dos segmentos (ATS, el 89 % de los ingresos, y Core Services) solo para 2023-2025, sin comparables puros para los servicios, y los costes centrales no asignados son grandes; la suma de partes repetiría el DCF [A1].';

export const dcf_justificacion = {
  crecimiento: `2026e +10,0 %: los nueve meses crecen un 9,6 % en euros y el 3T26 un 13 % (+12 % a divisa constante); el 21-oct SAP lleva la nube y «nube y software» a la parte alta de sus guías (25.800-26.200 M y 36.300-36.800 M) [A14]. Parte del +26 % de la nube del 3T es una recuperación puntual de ingresos atrasados, sin cuantificar [A14]. 2027e-2028e +11,5 %: SAP espera que el crecimiento acelere en 2027 y el consenso da +11,7 % y +12,0 % [A4, D7]. Después baja hasta el 4 % de 2035e. La media del caso base (8,2 %) coincide con el 8,1 % anual de 2021-2025.`,
  margenes: `Margen EBITDA NIIF del 31,5 % en 2026e: la guía de beneficio operativo no NIIF (11.800-12.200 M a divisa constante, menos 2 puntos de divisa) y unos 450 M de ajustes dan un beneficio NIIF de unos 11.200 M [A4]. Sube al 36 % en 2031e porque SAP prevé que los gastos operativos crezcan al 80-90 % de los ingresos en 2027 [A4]. El consenso da un 31,7 % en 2026e y un 33,4 % en 2028e [D7]. El 36 % queda por debajo del margen EBIT de Oracle y Microsoft (30,6 % y 46,8 %) [B6, B7].`,
  inversion: `Capex del 2,8 % de las ventas: las compras de inmovilizado e intangibles (2,0 % en 2025) más los pagos de arrendamientos (0,8 %), porque la deuda incluye los arrendamientos (NIIF 16) [A1]. La nube corre en gran parte en hiperescaladores y su coste ya está en el EBITDA. Amortización del 3,3 % que converge al capex. Circulante del −4 % de las ventas, el de 2025, por los cobros anticipados de nube. Tipo impositivo del 28,5 % (28,7 % NIIF en 2025; guía no NIIF del 29 %) [A1, A4].`,
  wacc: `Tasa libre del 3,47 %, el Bund a 10 años del 21-oct-2026 [D33]. Beta de 1,10, la mensual a 5 años frente al DAX ajustada (1,15 sin ajustar; la semanal a 5 años da 0,99) [D3]. Prima de mercado del 5,5 %. Coste de la deuda del 3,5 % (los eurobonos de 2026) y un 4 % de deuda a valor de mercado. WACC del 9,24 %; con la prima implícita del mercado (4,20 %), el 7,87 % [D5].`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro del 2 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (3,03 %). El múltiplo de salida implícito es de 10 veces el EBITDA, muy por debajo de las 18,2 de hoy y del mínimo de la década (15,1): el terminal es prudente.`,
};

export const etapa2_justificacion = 'No se usa. El ROIC (15,5 %) supera al WACC en algo más de 6 puntos, pero la migración de ECC termina hacia 2030 y alargar el crecimiento sería apostar contra el riesgo que hoy teme el mercado.';

export const dcf_lectura = `El DCF da 196,64 EUR por acción, un 5,8 % por debajo del precio de 208,65 EUR, con un 59 % del valor en el terminal. **Tras subir un 56 % en tres meses, el precio pide algo más que nuestro caso base.** El DCF inverso dice que los 208,65 EUR suponen un crecimiento de los ingresos del 9,1 % anual de 2026e a 2035e, frente al 8,3 % de nuestro base; o, con nuestro crecimiento, un margen EBITDA del 38,1 % en vez del 36 %. Comprar a este precio rinde un 8,9 % anual si se cumple el caso base, algo menos que el WACC del 9,24 %. Con la prima de riesgo que hoy pide el mercado (4,20 %), el DCF sube a 248,17 EUR.`;

export const narrativas = {
  Bajista: `Los agentes de IA desplazan el cobro por usuario y parte de la lógica de negocio hacia capas de datos y agentes de terceros: el backlog de nube frena al 10-12 % y las migraciones de ECC se alargan, como le pasó a Oracle en 2013-2017, con los ingresos casi planos durante la transición. Crecimiento medio del 4,2 %, margen EBITDA del 33 % y crecimiento a perpetuidad del 2 %.`,
  Base: `Se cumple la guía de 2026 y los ingresos aceleran al 11,5 % en 2027-2028 con la migración de ECC antes del fin del mantenimiento, para bajar después al 4 %: crecimiento medio del 8,2 % y margen EBITDA del 36 % desde 2031.`,
  Alcista: `La migración de ECC se concentra antes de 2030 y SAP cobra la IA sobre los datos de sus clientes (Business Data Cloud, Joule): crecimiento medio del 10,7 % y margen del 38 %, más cerca del de Oracle.`,
};

export const escenarios_comentario = `La asimetría es desfavorable con nuestro coste de capital: el alcista vale 252,06 EUR (+20,8 %) y el bajista 126,87 (−39,2 %). El bajista no es cosmético: la acción tocó 127,50 EUR en julio, casi el valor de este escenario, cuando el mercado descontó el miedo a la IA [D32]. Con la prima de riesgo que hoy pide el mercado (4,20 %), el bajista sube a 155,41 EUR y el alcista a 320,55. El valor ponderado por probabilidad es de 190,28 EUR.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 %, comparables 15 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque el 86 % de los ingresos es recurrente y el backlog de nube (24.144 M, +26 % a divisa constante) da visibilidad a 12 meses [A1, A14]. Los escenarios pesan un 25 % porque el riesgo de la IA es asimétrico. Los comparables (unos 172 EUR) pesan un 15 % por la dispersión de la muestra, y las transacciones (298,37 EUR) un 5 % porque llevan prima de control y sus múltiplos son estimaciones. El valor intrínseco es de 196,43 EUR, un 5,9 % por debajo del precio.`;

export const catalizadores = {
  items: [
    { fecha: '22-oct-2026', evento: 'Primera sesión de Xetra tras el 3T26', efecto: 'El ADR subía un 4 % fuera de hora; el backlog (+26 % a divisa constante) no frena [A14, D32]', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Finales de enero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Confirmará o no la aceleración de los ingresos y los gastos al 80-90 % del crecimiento', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Hasta el 31-dic-2027', evento: 'Recompra de hasta 10.000 M (≈5.800 M pendientes a septiembre)', efecto: 'Retiraría un 2,4 % del capital al precio de hoy [A14]', probabilidad: 'Alta', sentido: '+' },
    { fecha: '31-dic-2027', evento: 'Fin del mantenimiento estándar de SAP ECC', efecto: 'Fuerza la migración de la base instalada a S/4HANA y RISE', probabilidad: 'Alta', sentido: '+' },
    { fecha: '1-ene-2027', evento: 'Entrada en vigor de la NIIF 18', efecto: 'Cambia la definición del beneficio operativo; puede mover los múltiplos publicados', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '13-sep-2027', evento: 'Juicio de Celonis contra SAP en EE. UU.', efecto: 'Litigio sobre el acceso a los datos del ERP', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Los agentes de IA abaratan el software de aplicaciones o desplazan el cobro por usuario', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 124,96 EUR, −35 % sobre el valor base', mitigante: 'El ERP es el sistema de registro de los procesos y los datos; costes de cambio altos', senal: 'Crecimiento del current cloud backlog por debajo del 20 % a divisa constante' },
    { riesgo: 'Desaceleración de la nube cuando termine la ola de migraciones de ECC', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Cada punto menos de crecimiento anual quita 14,08 EUR (−7 %)', mitigante: 'Soporte ampliado hasta 2030 y venta de IA y datos sobre la base instalada', senal: 'Ingresos de la Cloud ERP Suite por debajo del +20 %' },
    { riesgo: 'Divisa: el 39 % de los ingresos viene de América', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'La guía de 2026 preveía 3 puntos menos de crecimiento de la nube por la divisa', mitigante: 'Costes también en dólares', senal: 'Euro por encima de 1,20 USD' },
    { riesgo: 'Costes de la IA y de la nube presionan el margen bruto', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Un punto menos de margen EBITDA quita 5,66 EUR (−3 %)', mitigante: 'Congelación de plantilla durante 12 meses', senal: 'Margen bruto de nube por debajo del 73 %' },
    { riesgo: 'Oracle gana cuota en ERP', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Ya es primero en ERP según Apps Run The World', mitigante: 'Base instalada de SAP en las grandes empresas europeas', senal: 'Pérdida de grandes contratos de migración' },
    { riesgo: 'Regulación: compromisos con la Comisión Europea sobre el soporte del ERP', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'SAP no espera impacto material', mitigante: 'Sin multa; diez años de compromisos', senal: 'Caída del soporte más rápida que la guía' },
    { riesgo: 'Compras de IA y datos que diluyen el margen', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Dremio y Prior Labs restan más de 100 M al beneficio de 2026', mitigante: 'Compras pequeñas frente a la caja', senal: 'Nueva compra de más de 5.000 M' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 115 EUR. La historia más probable empieza en 2027: los grandes clientes terminan las migraciones a S/4HANA, pero los nuevos contratos de nube se firman con menos usuarios porque los agentes de IA hacen el trabajo de los empleados que antes pagaban licencia. El backlog de nube frena del 25 % al 12 % en dos años y SAP no consigue cobrar los agentes por uso al mismo ritmo. Los costes de cómputo de la IA bajan el margen bruto de la nube y la expansión del margen operativo se queda en un punto. El mercado deja de ver a SAP como un compuesto de crecimiento y lo valora como a Oracle en 2015, a 10-11 veces el EBITDA. El indicador que lo habría anticipado: el crecimiento del current cloud backlog a divisa constante por debajo del 20 % y la caída del margen bruto de la nube, que ya bajó 0,5 puntos en el 2T26, al 74,3 % [A4].`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'IA y precios', pregunta: '¿Qué parte de los nuevos contratos de nube se cobra por uso y no por usuario, y qué pasa con el ingreso por cliente cuando los agentes sustituyen empleados?', por_que: 'Es el riesgo que el precio teme y que el bajista recoge.' },
    { tema: 'Backlog', pregunta: '¿Cuánto del current cloud backlog viene de migraciones de ECC y cuánto de clientes nuevos?', por_que: 'Decide si el crecimiento sobrevive al fin de la ola de migraciones.' },
    { tema: 'Margen', pregunta: '¿Qué margen bruto de nube espera cuando los costes de los modelos de IA crezcan con el uso?', por_que: 'El margen bruto de nube bajó 0,5 puntos en el 2T26.' },
    { tema: 'Compras', pregunta: '¿Qué rentabilidad esperan de Reltio, Dremio y Prior Labs, y hay más compras de datos e IA en camino?', por_que: 'Restan más de 100 M al beneficio de 2026.' },
    { tema: 'Comisión Europea', pregunta: '¿Qué ingresos de soporte quedan expuestos a terceros por los compromisos de julio de 2026?', por_que: 'El soporte aún es el 25 % de los ingresos del 1S26.' },
    { tema: 'Recompras', pregunta: '¿Acelerará la recompra (7.400 M pendientes) si la acción vuelve a la zona de 130-160 EUR?', por_que: 'A esos precios la rentabilidad para el accionista sube mucho.' },
  ],
  confianza: 'Media',
};
