// Textos del analista (Reply, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de EUR, ejercicio a 31 de diciembre. Último ejercicio auditado: 2025 (ESEF, aprobado el 12-mar-2026); último dato publicado: el semestral a 30-jun-2026 (30-jul). El 3T26 sale el 12-nov-2026. Ingresos NIIF (sin las subvenciones que la empresa suma a sus «ingresos de gestión» desde el 3T25). El EBITDA es el de la empresa; el ajuste de valor razonable de los earn-out va al resultado financiero. Precio: cierre del 20-oct-2026 (128,30 EUR); la sesión del 21-oct estaba abierta (129,20 EUR a las 10:34 UTC [D2]) y la decisión se comprueba con el precio del día en las pruebas de robustez. El BPA de la regla a 12 meses es el publicado (no hay ajustado) y el PER actual usa el BPA de los próximos 12 meses (2,3 meses de 2026e y 9,7 de 2027e). Acciones: 36,33 M a 30-jul-2026, sin más recompras; la recompra pagada entre julio y octubre y el precio de FedTec (julio) no se conocen: cada 1 M EUR son ≈ 0,03 EUR por acción. Sin consenso de 2028 ni de EBITDA. Sentimiento de foros: sin datos (Reddit, Stocktwits y Seeking Alpha no dan debate de Reply).',
  controles_explicados: [],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Mario Rizzante fundó Reply en Turín en 1996 con un grupo de ingenieros, entre ellos Tatiana Rizzante, con un modelo de red de sociedades pequeñas y especializadas que comparten clientes y marca [A3, C5]. Creció con la banca y las telecos italianas y después con compras en Alemania y Reino Unido; cotiza en el segmento STAR de Euronext Milan [C1]. De 2020 a 2025 duplicó las ventas (de 1.250 a 2.450 M EUR) con la nube y los datos, siempre con caja neta y sin ampliar capital [A1]. Desde 2025 el mercado teme que la IA abarate su trabajo: la acción cayó un 57 % del máximo de 2021 al mínimo de marzo de 2026, y la empresa respondió con su primera recompra grande y con ofertas propias de IA [D1, D15].',
      hitos: [
        { anio: '1996', hito: 'Mario Rizzante funda Reply en Turín.' },
        { anio: '2017', hito: 'Desdoblamiento de las acciones (BPA de años anteriores reexpresado).' },
        { anio: '2020-2022', hito: 'Ventas de 1.250 a 1.891 M EUR; compras en Reino Unido y Alemania (190 M en 2022) [A1].' },
        { anio: '2021', hito: 'Máximo histórico en bolsa (≈ 185 EUR, PER adelantado de 35 veces) [D1].' },
        { anio: '2024', hito: 'Compra de Solirius (Reino Unido, sector público) por 117,7 M EUR [A3].' },
        { anio: '2025', hito: 'Voto aumentado (tres votos por acción) para la familia desde septiembre; Red Scientific y Root16 [C1, A1].' },
        { anio: '2026', hito: 'Mínimo de 76,65 EUR en marzo; recompra de hasta 550 M EUR; compra de FedTec en EE. UU. [D1, D15, D18].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Reply crea valor con holgura: el ROIC del motor es del 22,8 % en 2025 (24,6 % en 2024, 20,7 % en 2023) frente a un WACC del 8,64 %, unos 14 puntos de diferencia [P1]. Sin el fondo de comercio el ROIC sube al 65 %: el negocio propio apenas necesita capital (inversión del 1,9 % de las ventas) y lo que consume capital es el circulante (28 % de las ventas: clientes y obra pendiente de facturar) y las compras (el fondo de comercio es el 68 % del capital invertido) [A1]. El ROIC incremental de 2020-2025 es del 21,1 %. La tendencia es plana o algo a la baja: el margen subyacente bajó del 19,0 % al 17,9 % en 2025 y el capital crece con las compras, pero incluso con el margen del caso bajista (16,8 %) el ROIC seguiría por encima del 18 % [A1, P1]. El ROE (18 %) es menor que el ROIC por la caja que la empresa acumulaba hasta la recompra.',
      confianza: 'Alta',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material en una consultora es el talento (17.297 empleados; personal = 56 % de las ventas; rotación y formación en IA), la seguridad de los datos de clientes (banca, sector público, defensa) y el uso responsable de la IA que construye para terceros (Reglamento de IA de la UE): Reply tiene un comité de ética de la IA en el consejo [C1, A1]. Las emisiones son bajas (oficinas, viajes y centros de datos de terceros). En gobierno, lo material es el control de la familia con voto aumentado y la remuneración [C1, C3].',
      controversias: 'Investigación de la Fiscalía de Milán por fraude informático (servicios de valor añadido de TIM, 2017-2019) con secuestro preventivo a Reply S.p.A.; provisión de 2,9 M EUR y sin responsabilidad administrativa (231/2001) imputada [A1, C7]. Demanda de responsabilidad profesional cerrada en 2025 con un acuerdo de 15 M cubierto por el seguro [A1]. Rechazo de la política de remuneración por ≈ 91 % del capital libre presente en la junta de 2026 [C3]. Calificaciones de MSCI, Sustainalytics o CDP no comprobadas en fuente primaria: no se dan.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+8,3 % NIIF, fijo): el primer semestre creció un 7,1 % en ingresos NIIF (+7,4 % en los de gestión) y el segundo suma FedTec, Cyberis y Movar; el consenso espera +10,6 % en ingresos de gestión [A2, D2]. Después, +7,5 % en 2027e (consenso +8,0 % [D2]) y descenso hasta el 3 % en 2033e. Es la mitad del 14,4 % anual de 2020-2025 y está por encima del mercado italiano previsto (+3,6 % anual el digital en 2026-2029 [B2]): supone que Reply sigue ganando cuota con la IA y compras pequeñas, como en 2025-2026, pero que la presión en tarifas (≈ −1 punto al año en 2026-2027) le quita crecimiento [P2].',
    margenes: 'Margen EBITDA del 18,3 % sobre ventas NIIF todos los años, sin expansión: el subyacente fue del 19,0 % en 2024, del 17,9 % en 2025 y del 18,0 % en el 1S26 (17,8 % sobre ingresos de gestión), y la dirección dice que usa la productividad de la IA para ganar cuota y no para subir el margen [A1, A2, A9]. El 18,3 % incluye la estacionalidad (el segundo semestre tiene más margen) y es menos de lo que la empresa hizo en 2024.',
    inversion: '«Capex» del 4,3 % de las ventas los primeros años, que baja al 3,3 %: inversión fija (1,9 % en 2025), derechos de uso de oficinas (≈ 1,4 %, porque el EBITDA no lleva los alquileres por la NIIF 16) y ≈ 1 punto de compras pequeñas que forman parte del crecimiento (2,8 % de las ventas de media en 2020-2025) [A1]. Amortización del 2,75 % (2,74 % en el 1S26). Circulante del 28 % de las ventas (28,4 % en 2025): crecer consume caja.',
    wacc: 'Tasa libre del 3,44 % (Bund a 10 años, 21-oct-2026 [D8]); beta de 0,90, entre la local ajustada (0,74-0,83 frente al FTSE MIB [D1]) y la del sector de servicios de TI europeo (≈ 1); prima de mercado del 5,5 % y prima adicional del 0,5 % por el peso de Italia (49 % de las ventas) y la volatilidad del 39 %. Coste de los fondos propios del 8,89 %; deuda al 4 % antes de impuestos con un peso del 4 % (deuda bancaria y arrendamientos frente a la capitalización). WACC del 8,64 %. Con la prima implícita del mercado (4,2 % [D9]) el WACC baja al 7,52 % y el DCF sube a 157,39 EUR.',
    terminal: 'Crecimiento a perpetuidad del 2,0 %: inflación europea, sin crecimiento real, porque la IA puede reducir el gasto en servicios por horas a largo plazo. Múltiplo de salida implícito de 7,8 veces el EBITDA, por debajo de las 9,5 veces de hoy y de la media del sector (8-10). El valor terminal pesa un 68 %.',
  },
  puente_comentarios: {
    '2026e': 'Volumen del 7 % (primer semestre: orgánico +6,6-7,3 % [A2]), precio −1 % por la presión en tarifas que la dirección anunció para 2026-2027 [P2] y 2,3 puntos de compras (Red Scientific y Root16 todo el año, Cyberis, Movar y FedTec).',
    '2027e': 'Volumen del 7 % (más proyectos de IA y migración, defensa y sector público), precio −1 % y 1,5 puntos de compras pequeñas.',
    '2028e': 'Volumen del 6,5 %, precio −0,5 % (la presión se suaviza al pasar a precio fijo) y 1 punto de compras.',
    '2029e': 'Volumen del 6 %, precio neutro y medio punto de compras.',
    '2030e': 'Volumen del 5,5 %, precio neutro y medio punto de compras: converge hacia el mercado.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí, con matices. (1) Puente de ingresos: el crecimiento de 2026-2030 (8,3 % a 6 %) sale de volumen (5,5-7 %), con precio negativo (−1 a 0 %) y compras pequeñas (0,5-2,3 puntos); el volumen está en línea con el orgánico del 1S26 (6,6-7,3 %) [A2]. (2) Mercado final: no se da porque el único tamaño fiable es Italia (18.800 M EUR de servicios ICT [B2]) y la proyección es del grupo; a mano, si las ventas en Italia crecen como el grupo, la cuota pasaría del ≈ 6,4 % al ≈ 7,9 % en 2030 con el mercado al 3,6 % anual: ×1,23, menos del 1,5 que el motor tolera. (3) Reinversión: el capital nuevo rinde un 25,8 % en la proyección frente a un 22,8 % de ROIC y un 21,1 % incremental (≤ 1,25 veces) y la inversión incluye compras [P1]. El motor también da «Sí». El matiz es la IA: si los clientes exigen proyectos más baratos y el precio cae más de un punto al año, el volumen no compensa (es el bajista).',
  dcf_lectura: 'El DCF da 130,97 EUR por acción, un 2,1 % sobre el precio de cierre (128,30), con un WACC del 8,64 % y un valor terminal del 68 %. El DCF inverso dice que el precio descuenta un crecimiento del 4,8 % anual con nuestro margen, frente al 5,6 % de media de nuestro caso base: el precio es justo, con poco margen de seguridad. Con la prima de riesgo que pide hoy el mercado (4,2 %) vale 157,39 EUR (+23 %): la diferencia la pone la tasa. El bajista de la IA (crecimiento −4 puntos y margen −1,5 puntos) vale 95,10 EUR (−26 %).',
  narrativas: {
    Bajista: 'La IA abarata el trabajo por horas más rápido de lo que Reply vende proyectos nuevos: los clientes piden precios cerrados más bajos y menos horas en mantenimiento, pruebas y desarrollo; Alemania y la industria no se recuperan. Crecimiento 4 puntos menor (3,5 % en 2027e y 3 % en 2028e, ≈ 1 % hacia 2030) y margen EBITDA 1,5 puntos menor (16,8 %, lo que dio en 2023).',
    Base: 'Crecimiento del 7-8 % con IA, nube, datos, defensa y compras pequeñas, con tarifas a la baja que la productividad compensa sin subir el margen (18,3 %).',
    Alcista: 'Reply es de las que ganan con la IA: crece 1,5 puntos más con proyectos de agentes y migraciones a precio fijo y retiene parte del ahorro (+0,5 puntos de margen, el 18,8 %, como en 2024).',
  },
  escenarios_comentario: 'La asimetría del valor intrínseco es desfavorable: el alcista vale 141,33 EUR (+10 %) y el bajista 95,10 (−26 %). En el DCF el bajista pesa más porque baja crecimiento y margen a la vez y sube la tasa; el alcista solo añade 1,5 puntos de crecimiento y 0,5 de margen. El valor ponderado de los escenarios queda ≈ 3 % bajo el precio. A 12 meses la asimetría es la contraria (bajista −20 %, alcista +60 %), porque el múltiplo de hoy (15,8 veces) está muy por debajo de la historia de Reply (mediana de 21,4).',
  casos_12m: {
    Bajista: 'La IA y Alemania frenan las ventas (3,5 % en 2027e y 3 % en 2028e) y el margen EBITDA baja 1,5 puntos (16,8 %): BPA de 7,40 EUR en 2028e, por debajo de los 7,50 de 2026e. El PER cae a 13,9 veces (el base × 0,8, por debajo del mínimo de cinco años de 15,3).',
    Base: 'Ventas NIIF +8,3 % en 2026e, +7,5 % en 2027e y +7,0 % en 2028e, margen EBITDA del 18,3 %, amortización del 2,75 %, financiero de −1 M (intereses de la caja menos deterioros de empresas emergentes), impuestos del 31,5 % y 36,33 M de acciones sin más recompras: BPA de 8,85 EUR en 2028e (+9,6 % anual desde los 6,73 de 2025).',
    Alcista: 'Crecimiento 1,5 puntos mayor y margen del 18,8 % por proyectos de IA a precio fijo: BPA de 9,40 EUR; PER de 21,8 veces, la media adelantada de ocho años, que Reply tuvo en 2019-2024.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (7,50 EUR) queda un 2,6 % por debajo del consenso de Yahoo (7,70) y en línea con el de Simply Wall St (7,53) y el de Berenberg (7,40) [D2, D3, D7]; el de 2027e (8,25) coincide con el consenso (8,32). La diferencia de 2026 está en el ajuste de los earn-out del primer semestre (−8,1 M) y en que no contamos más recompras. El objetivo medio de los analistas (153,36 EUR, 11 analistas) coincide con nuestro objetivo a 12 meses (153,94): los dos suponen que el PER vuelve hacia 17-18 veces.',
  objetivo_comentario: 'El objetivo a 12 meses es de 153,94 EUR (ponderado), un 21,0 % de rentabilidad con el dividendo; el base da 153,99 EUR (+21,1 %). Los números de la regla bastan para comprar (≥ 15 % y ≥ 12 %), pero el valor intrínseco (124,09 EUR) queda un 3,3 % por debajo del precio, así que la regla dice Mantener. El base supone que el BPA crece un 9,6 % anual de 2025 a 2028e y que el PER sube de 15,8 a 17,4 veces (el tope de ×1,1 hacia la mediana de cinco años, 21,4). Comprar por debajo de 124,09 EUR (el valor intrínseco); vender por encima de 172,54.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %. El DCF es el método más fiable para un negocio con caja neta y poca inversión; los escenarios recogen el riesgo de la IA, que es asimétrico (−26 % / +10 %). Los comparables pesan poco: todo el sector cotiza deprimido por el mismo temor (PER mediano de 10,7) y Reply tiene el doble de margen que la media; usarlos más sería contar dos veces el miedo a la IA. Las transacciones no pesan (compras pequeñas sin múltiplos publicados). El valor objetivo de la síntesis es de 124,09 EUR (−3,3 %); con la prima implícita del mercado sería de 147,03 (+14,6 %). El precio está en la zona de valor justo con nuestro WACC.',
  catalizadores: {
    items: [
      { fecha: '2026-10-23', evento: 'Fin del programa de recompra (13-abr a 23-oct)', efecto: 'Sale un comprador; la nueva autorización (hasta 2027) puede usarse o no', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11-12', evento: 'Resultados del 3T26', efecto: 'Crecimiento orgánico y margen tras la presión en tarifas; primera lectura de FedTec', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-03', evento: 'Cuentas de 2026 y perspectivas de 2027', efecto: 'Margen subyacente y peso del tiempo y materiales', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Junta: renovación del consejo y nueva política de remuneración', efecto: 'Sucesión del fundador; voto de los inversores sobre la remuneración', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Continuo', evento: 'Nuevas herramientas de agentes de IA (Anthropic, OpenAI, GitHub)', efecto: 'Mueven a todo el sector: −8,9 % el 3-feb-2026', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2026-2027', evento: 'Nueva recompra con la autorización hasta el 23-oct-2027 (hasta 550 M EUR)', efecto: '+1-3 % de BPA si se usa', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Investigación penal (servicios de valor añadido de TIM)', efecto: 'Posible multa o costes; provisión de 2,9 M', probabilidad: 'Baja', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'IA que abarata la consultoría y la integración por horas: menos horas por proyecto, tarifas a la baja, fin del tiempo y materiales (≈ 31 % de las ventas)', tipo: 'Tecnología', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−26 % (escenario bajista)', mitigante: 'El 82 % de Region 1 (sobre todo Italia) es a precio fijo; ofertas propias de agentes; los contratistas absorben el primer golpe', senal: 'Crecimiento orgánico por debajo del 5 % o margen EBITDA subyacente por debajo del 17 %' },
      { riesgo: 'Dependencia de Italia (49 % de las ventas) y de la banca (≈ 30 %)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Alemania, Reino Unido y EE. UU. crecen por compras; banca italiana con beneficios altos', senal: 'Caída de ingresos en Region 1 o recorte de presupuestos de TI de la banca' },
      { riesgo: 'Desaceleración del gasto tecnológico en Europa (industria alemana, automoción)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Defensa y sector público al alza; Region 2 es el 18 % de las ventas', senal: 'Region 2 en negativo dos trimestres' },
      { riesgo: 'Concentración de clientes: los 20 primeros son ≈ 40 % de las ventas', tipo: 'Clientes', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −5 % por un gran cliente', mitigante: 'Ninguno supera el 10 %; relaciones de décadas', senal: 'Pérdida de un cliente grande en un concurso' },
      { riesgo: 'Compras pequeñas que no rinden (Region 3: deterioro de Francia de 19 M; earn-out que cambian)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Importes pequeños con pagos ligados a resultados', senal: 'Nuevos deterioros o ajustes de earn-out negativos' },
      { riesgo: 'Gobierno: control familiar con voto aumentado, sucesión del fundador y remuneración rechazada por el capital libre', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Descuento de múltiplo', mitigante: 'Familia alineada (37 % del capital); cuatro independientes', senal: 'Cambio de consejero delegado sin plan o operaciones con la familia' },
      { riesgo: 'Investigación penal por los servicios de valor añadido de TIM', tipo: 'Litigios', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 %', mitigante: 'Provisión de 2,9 M; sin 231/2001 imputada', senal: 'Imputación de la sociedad o ampliación del secuestro' },
      { riesgo: 'Múltiplo: el sector cotiza a 9-11 veces y Reply a 15,8', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−20 % si cotiza como el sector', mitigante: 'Margen doble y caja neta', senal: 'Margen de Reply convergiendo hacia el 12-14 % del sector' },
    ],
    premortem: 'Octubre de 2028: la acción ha perdido un 35 %. Los agentes de programación de 2027 hicieron en semanas lo que antes eran equipos de diez consultores durante meses; los bancos italianos, el 30 % de las ventas, renegociaron todos los contratos de mantenimiento a precio cerrado con descuentos del 20-30 %. Reply vendió muchos proyectos de IA, pero cada uno con menos horas: las ventas crecieron un 2 % y el margen bajó al 16 %. Alemania siguió en recesión industrial. El fundador dejó el cargo en 2027 sin un plan claro y el mercado pagó por Reply lo mismo que por Capgemini o Sopra Steria: 10 veces el beneficio.',
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−26 % en el bajista; +10 % en el alcista (DCF)',
      comentario: 'Es el riesgo central. Lo que RESTA: Reply vende horas de ingenieros (personal y subcontratas = 82 % de las ventas) y la IA reduce las horas por proyecto; el consejero delegado lo dijo en marzo de 2026: «el mercado está deteriorando nuestras tarifas… la presión seguirá en 2026 y 2027» y «con la IA se hace más con menos gente, pero el volumen de cada proyecto es menor» [P2]. El tiempo y materiales (≈ 31 % de las ventas; 55 % en Alemania y 52 % en Reino Unido) «casi desaparecerá» [A1, P2]. Ya se ve en las cifras: margen EBITDA subyacente del 19,0 % al 17,9 % en 2025 y del 18,3 % al 17,8 % en el 1S26, e ingresos por empleado planos en ≈ 153.000 EUR: la productividad se devuelve al cliente [A1, A2, A9]. Aparece un coste nuevo, los «tokens» de los modelos [A9]. Lo que SUMA: la IA es hoy el mayor motor de crecimiento según la dirección (mercado de IA en Italia +47,6 % en 2025 [B2]); Reply tiene ofertas propias (Silicon Shoring con agentes de Claude y GitHub, Model Factory) y alianzas con OpenAI, Anthropic y AWS [A9]; el 82 % de Region 1 (sobre todo Italia) es a precio fijo, así que puede quedarse parte del ahorro; y la IA sustituye primero a los subcontratistas (del 19,2 % al 17 % de las ventas), no a la plantilla [A9]. Balance: hasta ahora la IA suma volumen (+7 % orgánico en el 1S26) y resta precio y margen. Lo modelamos como precio −1 punto al año en 2026-2027 y margen plano en el base, y como −4 puntos de crecimiento y −1,5 de margen en el bajista. Señal de que gana la resta: crecimiento orgánico por debajo del 5 % o margen subyacente por debajo del 17 %.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'IA y precios', pregunta: '¿Cuánto bajó la tarifa media por hora en 2025 y en el 1S26, y qué parte de los ingresos de proyectos de IA sustituye a contratos antiguos de mantenimiento y desarrollo?', por_que: 'Separa el crecimiento nuevo del que canibaliza: es el escenario bajista (−26 %).' },
      { tema: 'Tiempo y materiales', pregunta: '¿Cómo se pasan a precio fijo los contratos de Alemania y Reino Unido (55 % y 52 % en T&M) y con qué margen?', por_que: 'Decide si la productividad de la IA se queda en Reply o en el cliente.' },
      { tema: 'Margen subyacente', pregunta: '¿Por qué bajó el margen EBITDA subyacente del 19,0 % al 17,9 % en 2025 y qué parte es estructural?', por_que: 'Un punto de margen son ≈ 0,5 EUR de BPA.' },
      { tema: 'Recompra', pregunta: '¿Se usará la autorización hasta octubre de 2027 y con qué criterio de precio?', por_que: 'Con 550 M de autorización y caja neta, puede subir el BPA un 5-10 %.' },
      { tema: 'Sucesión', pregunta: '¿Cuál es el plan de sucesión del fundador como presidente y consejero delegado, y quién encabeza la lista para el consejo de 2027?', por_que: 'La empresa depende de la familia; el capital libre rechaza la remuneración.' },
      { tema: 'Region 3', pregunta: '¿Qué rentabilidad tienen las compras de Reino Unido y Francia tras el deterioro de 19 M y el ajuste de Solirius?', por_que: 'Es donde va el capital de las compras.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 153,94 EUR (nuestro BPA de 2028e × el PER de la regla común), un +21,0 % de rentabilidad ponderada con el dividendo y un +21,1 % en el caso base, frente a un precio de 128,30 EUR (cierre del 20-oct-2026; 129,20 en la sesión del 21-oct a las 10:34 UTC). Los números de la regla bastan, pero el valor intrínseco (124,09 EUR) queda un 3,3 % por debajo del precio: el precio ya es justo con nuestro WACC del 8,64 %, y por eso no es Comprar. El objetivo medio de los analistas (153,36) coincide con el nuestro. Compraríamos por debajo de 124,09 EUR. La convicción es baja porque las reglas discrepan (con nuestro WACC el precio es justo; con la prima del mercado el valor sube a 147,03 EUR, +14,6 %) y porque la IA hace muy ancho el rango (−26 % / +10 %); subiría la convicción un 3T26 con orgánico ≥ 7 % y margen estable, y la bajaría un margen subyacente por debajo del 17 %.

**El negocio.** Consultora tecnológica italiana (nube, datos, IA, ciberseguridad) con 2.450 M EUR de ventas, 17.297 empleados y el 49 % de las ventas en Italia [A1]. Margen EBITDA del 18 %, el doble que la media europea, ROIC del 22,8 % frente a un WACC del 8,64 % (+14 puntos) y caja neta: calidad «Sí». La sostenibilidad del crecimiento también es «Sí»: proyectamos un 7-8 % los primeros años, la mitad del histórico, con precio negativo.

**Finanzas.** Ventas al 14,4 % anual en 2020-2025 y BPA de 3,30 a 6,73 EUR [A1]. Pero 2025 fue peor de lo que parece: el EBITDA subyacente creció un 0,6 % y su margen bajó del 19,0 % al 17,9 %; en el 1S26 ingresos +7,4 % y EBITDA +4,3 % [A1, A2]. Caja neta de 402 M a junio (≈ 275 M tras earn-out y TFR) y recompra de hasta 550 M en marcha [A2, A11].

**Equipo y gobierno.** La familia Rizzante, fundadora, controla el 37 % del capital y ≈ 63 % de los votos con el voto aumentado [C1]. Treinta años de crecimiento con caja neta. Debilidades: presidente y consejero delegado son el fundador, sin sucesión anunciada, y ≈ 91 % del capital libre presente votó contra la política de remuneración en 2026 [C3].

**Valoración.** El DCF da 130,97 EUR (+2,1 %) y el DCF inverso descuenta un 4,8 % de crecimiento anual frente al 5,6 % de nuestro base. Con la prima del mercado (4,2 %) el DCF sube a 157,39. Cotiza a 15,8 veces el BPA de los próximos 12 meses, frente a una mediana adelantada de cinco años de 21,4 y una mediana del sector de 10,7: la regla lleva el PER a 17,4 veces (tope de ×1,1).

**Riesgos y catalizadores.** El mayor riesgo es la IA (exposición alta, efecto mixto): abarata las horas que Reply factura (tarifas a la baja en 2026-2027, tiempo y materiales que desaparece) mientras le da proyectos nuevos; el bajista vale −26 %. Después, Italia (49 %) y la banca (30 %), la industria alemana y el control familiar. Catalizadores: fin de la recompra (23-oct) y resultados del 3T26 (12-nov). Precio y noticias (regla 13): no cambia.

**Qué cambiaría la decisión.** Por debajo de 124,09 EUR, Comprar; entre 124,09 y 172,54, Mantener; por encima, Vender. Un 3T26 con crecimiento orgánico ≥ 7 % y margen ≥ 18 % sostendría el valor; un orgánico por debajo del 5 % o un margen subyacente por debajo del 17 % lo bajaría hacia el bajista.`,
    tesis: 'Reply es una de las consultoras tecnológicas de más calidad de Europa: margen EBITDA del 18 %, ROIC del 23 %, caja neta y treinta años creciendo sin ampliar capital [A1]. El mercado la ha castigado con todo el sector por el temor a que la IA abarate las horas de consultoría: cayó un 57 % del máximo de 2021 al mínimo de marzo de 2026 y hoy, tras rebotar un 67 %, cotiza a 15,8 veces el BPA de los próximos 12 meses frente a 21 de mediana en cinco años [D1].\n\nEl temor tiene base: la propia dirección reconoce tarifas a la baja, proyectos con menos horas y un tiempo y materiales que desaparece, y el margen subyacente ya bajó un punto en 2025 [P2, A1]. A la vez, la IA es hoy su mayor fuente de crecimiento y el 82 % de Region 1 (sobre todo Italia) es a precio fijo.\n\nA 128 EUR el precio descuenta un 4,8 % de crecimiento anual, algo menos que nuestro base (5,6 %): es un precio justo, no una ganga. La regla a 12 meses da +21 % si el PER se recupera hacia 17 veces, pero sin margen de seguridad sobre el valor intrínseco. Para comprar con margen, por debajo de 124 EUR.',
    vision_diferencial: {
      mercado_descuenta: 'Que Reply crece un 5 % al año con su margen actual: entre el miedo del sector (PER de 9-11) y su historia (21). Los analistas esperan 153 EUR, un 20 % más, con un BPA de 7,70 y 8,32 EUR en 2026 y 2027.',
      nuestra_vision: 'Coincidimos en el BPA (8,25 frente a 8,32 en 2027) y en el objetivo a 12 meses, pero no en el valor: con un WACC del 8,6 % y sin expansión de margen, el negocio vale lo que cuesta. La subida desde marzo ya recoge la recompra y dos buenos trimestres.',
      por_que: 'El margen subyacente bajó en 2025 y en el 1S26 y la dirección anuncia presión en tarifas hasta 2027: no damos por hecho que la productividad de la IA se quede en Reply.',
    },
    a_favor: [
      '**Calidad**: margen EBITDA del 18 % (doble que el sector) y ROIC del 22,8 %, 14 puntos sobre el WACC.',
      '**Balance**: caja neta de 402 M EUR a junio y sin bonos; recompra de hasta 550 M.',
      '**Crecimiento que aguanta**: +7,4 % en el 1S26 con orgánico del 6,6-7,3 % pese a la IA.',
      '**Precio fijo**: el 82 % de Region 1 (sobre todo Italia) a precio cerrado deja quedarse parte del ahorro de la IA.',
      '**Barato frente a su historia**: 15,8 veces el BPA adelantado frente a una mediana de 21,4.',
    ],
    en_contra: [
      '**IA**: tarifas a la baja en 2026-2027 y tiempo y materiales (≈ 31 %) que desaparece; bajista −26 %.',
      '**Margen subyacente a la baja**: del 19,0 % al 17,9 % en 2025 y del 18,3 % al 17,8 % en el 1S26.',
      '**Italia y banca**: 49 % de las ventas en Italia y ≈ 30 % en servicios financieros.',
      '**Gobierno**: control familiar con voto aumentado y rechazo del 91 % del capital libre a la remuneración.',
      '**Sin margen de seguridad**: el valor intrínseco (124 EUR) queda bajo el precio tras subir un 67 % desde marzo.',
    ],
    que_vigilar: 'La tesis depende de que la IA siga sumando volumen más rápido de lo que resta precio. Las señales en contra serían un crecimiento orgánico por debajo del 5 %, un margen EBITDA subyacente por debajo del 17 % o una caída de Region 1 (Italia); a favor, ingresos por empleado al alza con el margen estable.',
    cambiaria_recomendacion: [
      'Precio por debajo de 124,09 EUR: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio por encima de 172,54 EUR: Vender.',
      '3T26 (12-nov) con orgánico ≥ 7 % y margen ≥ 18 %: revisar el valor al alza.',
      'Orgánico por debajo del 5 % o margen subyacente por debajo del 17 % dos trimestres: revisar hacia el bajista.',
      'Nueva recompra grande con la autorización hasta 2027: revisar el BPA al alza.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico trimestral', nivel_actual: '+7,3 % (2T26)', umbral_alerta: '< 5 %', por_que: 'Mide si la IA suma más volumen del que resta.' },
      { kpi: 'Margen EBITDA (ingresos de gestión)', nivel_actual: '17,8 % (1S26)', umbral_alerta: '< 17 %', por_que: 'Mide la presión en tarifas.' },
      { kpi: 'Ingresos por empleado', nivel_actual: '≈ 153.000 EUR', umbral_alerta: 'Caída > 3 %', por_que: 'Si baja, la productividad se va al cliente.' },
      { kpi: 'Peso del tiempo y materiales', nivel_actual: '≈ 31 % (2025)', umbral_alerta: 'Caída sin subida del precio fijo', por_que: 'Paso a precio cerrado.' },
      { kpi: 'Region 2 (Alemania)', nivel_actual: '+0,8 % (2025)', umbral_alerta: 'Negativa dos trimestres', por_que: 'Gasto industrial europeo.' },
    ],
  },
};
