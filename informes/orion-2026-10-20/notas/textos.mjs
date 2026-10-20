// Textos del analista (Orion, corte 2026-10-20). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de EUR, ejercicio natural, NIIF-UE. Cuentas 2019-2025 del XBRL ESEF [A12] comprobadas con los informes anuales [A1, A2, A6-A11]; el último informe es el semestral a junio de 2026 [A3] y el 3T26 sale el 28-oct-2026, una semana después del corte [D7]. Precio de la acción B (ORNBV), la línea líquida; la A cotiza al mismo precio y tiene los mismos derechos económicos, así que el BPA usa el total de acciones (141,13 M emitidas, 140,37 M sin autocartera). Las divisiones actuales solo están reexpresadas desde 2023 (2022 en parte): la serie de segmentos empieza en 2023. Los pagos por hitos van dentro de ventas y EBITDA publicados; la historia del PER y el BPA de los casos van SIN hitos. Comparables en divisa local convertidos con los tipos del BCE del 20-oct-2026 [D6]; en Hikma el valor empresa de Yahoo mezcla divisas y se deja sin múltiplo de EBITDA. Transcripciones de las presentaciones y datos de IQVIA por producto: de pago, no accesibles.',
  controles_explicados: [
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El flujo libre medio de 2023-2025 (137 M EUR) está deprimido por el circulante: el hito de 180 M de Bayer se registró en 2025 y se cobró en el 2T26, y existencias y clientes crecieron con Nubeqa. En los doce meses a junio de 2026 el flujo operativo fue de 472 M y el libre de ≈ 373 M [A3]; la proyección (≈ 550 M en 2027-2028) sale de un EBITDA de 895-970 M con inversión de 115 M e impuestos del 20,5 %, en línea con la guía de resultado de explotación de 650-750 M para 2026 [A3].' },
  ],
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (informe de sostenibilidad sin calificaciones de terceros); 2) web de Orion, sección de sostenibilidad; 3) páginas públicas de MSCI y Sustainalytics (requieren registro)', decision: 'Omitido' },
  ],
  secciones: {
    historia: {
      resumen: 'Orion nace en 1917 en Helsinki y es durante un siglo el laboratorio de referencia de Finlandia. En 2006 se separa en dos sociedades cotizadas, Orion (laboratorio) y Oriola (distribución) [A1]. En los años 2000 vive de sus fármacos para el párkinson (Stalevo, Comtess, entacapona), del levosimendán (Simdax) y de la dexmedetomidina (Dexdor, Precedex), que fueron perdiendo patentes. La gran apuesta fue la darolutamida (ODM-201), desarrollada con Bayer desde 2014 [B3] y aprobada como Nubeqa en 2019: desde 2023 es su mayor producto y en 2025 aportó 610 M EUR [A2]. En 2022 licenció a MSD el ODM-208 (hoy opevesostat) y con Liisa Hurme al frente invierte las regalías en I+D, biológicos y biosimilares.',
      hitos: [
        { anio: '1917', hito: 'Fundación de Orion en Helsinki.' },
        { anio: '2006', hito: 'Separación del grupo en Orion (laboratorio) y Oriola (distribución) [A1].' },
        { anio: '2014', hito: 'Acuerdo con Bayer para la darolutamida (ODM-201); arranca el ensayo ARAMIS [B3, A1].' },
        { anio: '2019', hito: 'Aprobación de Nubeqa en EE. UU. (cáncer de próstata no metastásico resistente a la castración).' },
        { anio: '2022', hito: 'Licencia de ODM-208 (opevesostat) a MSD (208 M EUR netos de pago inicial); compra de Inovet; Liisa Hurme consejera delegada [A8, C1].' },
        { anio: '2024', hito: 'Abandono de ODM-111 y deterioros de 41 M EUR [A15].' },
        { anio: '2025', hito: 'Nubeqa aprobada por la FDA en cáncer hormonosensible metastásico; ventas de Nubeqa de 610 M EUR e hito de 180 M de Bayer [B3, A2].' },
        { anio: '2026', hito: 'Orion estima que Nubeqa puede superar 1.000 M EUR al año hacia el final de la década; primer paciente con ODM-216, su primer biológico [B6, B7, B10].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'Rentabilidad muy alta y en subida: el ROIC pasó del 22 % en 2023 al 39,4 % en 2025 y el ROE al 43,7 %, con un ROIC incremental del 49,9 % en los últimos años, todo por las regalías de Nubeqa, que no necesitan capital (Bayer paga la comercialización y Orion solo fabrica las pastillas). El hito de 180 M infla 2025: sin él el ROIC sería de ≈ 28 %, aún más de 20 puntos por encima del WACC (7,8 %). El reto es que esta rentabilidad tiene fecha de caducidad: el negocio sin Nubeqa gana poco (≈ 5 % de margen EBITDA tras todo el I+D, estimación propia [P1]).',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Orion es la calidad y seguridad de los medicamentos (fabricación propia en Finlandia para Nubeqa y Easyhaler), el acceso y el precio de los fármacos (IRA, subastas nórdicas), la ética de los ensayos clínicos y los residuos farmacéuticos en el agua [A1].',
      controversias: 'Sin controversias materiales. Salida de Rusia completada en 2026 (−3,3 M EUR en el 2T26) [A3]. Daño por agua en la planta de Fermion en Hanko en julio de 2026, sin efecto relevante esperado [A3].',
      confianza: 'Baja',
    },
    bolsa: {
      contexto: {
        comentario: 'La acción está en máximos históricos (88,30 EUR) tras subir un 30 % en 12 meses y un 20 % sobre su media de 200 sesiones. El movimiento lo explican hechos de la empresa, no rumores: la estimación de Nubeqa de más de 1.000 M (enero), las dos subidas de la guía (abril y julio) y el +69 % de Nubeqa en el 2T26 [D9, D8]. No hay noticias adversas pendientes: el fallo de LEVEL (agosto) es de un socio y no toca la guía [D12]. El 3T26 sale el 28-oct (no el 21 ni el 22) [D7] y los resultados cercanos no aplazan una decisión. Veredicto: no cambia.',
      },
    },
    multiplos_historicos: {
      comentario: 'Con el beneficio publicado, Orion cotiza a 21,1 veces el BPA de los últimos 12 meses, por debajo de su media de siete años (24,1), pero a 20,2 veces el EBITDA, el máximo de la serie (media 15,1). La diferencia la explican los hitos: el BPA de los últimos 12 meses lleva el de 180 M de Bayer. En BPA sin hitos y adelantado, el PER bajó de 27-31 veces (2018-2021, cuando Orion era un laboratorio de crecimiento lento con la esperanza de Nubeqa) a 16-17 veces en 2024-2025, y hoy es de 19,4. Lo que ha cambiado es estructural: el beneficio depende de un producto con patente hasta 2033-2035.',
    },
    comparables: {
      comentario: 'Orion cotiza a 19,2 veces el BPA de consenso de los próximos 12 meses frente a una mediana de 13 veces de los laboratorios europeos medianos, y a 20,2 veces el EBITDA de los últimos 12 meses sin el hito (mediana 10,3). Solo Almirall (20,5 veces, en plena recuperación de beneficio) cotiza más caro. La prima tiene parte de razón (más crecimiento a corto plazo, sin deuda, margen del 37 %), pero Lundbeck e Ipsen, que también se acercan a vencimientos de patentes, cotizan a 8-11 veces: el mercado no está tratando a Nubeqa como un activo con fecha de caducidad.',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'La proyección suma dos piezas [P1]. Nubeqa registrada por Orion: 960 M EUR en 2026 (el 1S26 fue de 381,8, +64,9 %, y el tramo alto de regalías ya se alcanzó en el 2T26 [A3]), 1.100 en 2027 y 1.180 en 2028, por encima de los «más de 1.000 M hacia el final de la década» que estima Orion [B6, B7]; se frena desde 2029 por el precio negociado de Medicare y cae al vencer la patente del compuesto: EE. UU. 2033, Europa y Japón 2035 [B3] (900 M en 2033, 380 en 2035 y 90 en 2037). El resto del negocio (1.097 M en 2025) crece un 3,5 % al año, como en el 1S26 (+3,3 %). Sin hitos en el base. Resultado: +10,9 % en 2026 (dentro de la guía de 2.000-2.100 M), +8,6 % en 2027, plano en 2029-2032 y caída del 5-10 % anual en 2033-2036.',
    margenes: 'Margen EBITDA = 75 % de las ventas de Nubeqa (regalías casi sin coste; pastillas con margen de fabricación; menos la regalía a Endo) + el margen del resto tras todo el I+D: 5,5 % en 2026, calibrado con la guía de resultado de explotación (650-750 M) y el BPA de consenso (4,06 EUR) [A3, D2], subiendo un punto al año hasta el 18 % en 2037 porque el I+D (210 M en 2025) no puede seguir al mismo nivel cuando caigan las regalías. El margen del grupo sube del 37,3 % en 2026 al 40,5 % en 2028 y baja al 20,9 % en 2037, por debajo del 28-31 % que tenía antes de Nubeqa con fármacos propios hoy genéricos [A9-A11].',
    inversion: 'Inversión de 115 M EUR al año hasta 2028 y ≈ 100 M después (97,6 M en 2025 entre inmovilizado e intangibles [A2]); amortización de 62 M en 2026 subiendo hasta 100 M. Circulante del 35 % de las ventas (36 % en 2025 y a junio de 2026 [A1, A3]); al caer las ventas de Nubeqa se libera circulante. Impuesto del 20,5 % (tipo efectivo de 2025: 20,4 % [A2]).',
    wacc: 'Tasa libre del 3,45 % (Bund a 10 años, 20-oct-2026 [D4]); beta de 0,80, entre la ajustada semanal a 5 años (0,71) y la semanal a 2 años (0,86) [D1], que recoge que el beneficio depende de un producto; prima del 5,5 %; deuda casi nula (peso del 1 %, coste del 3,5 %). WACC del 7,80 %. Con la prima implícita del mercado de Damodaran (4,2 % [D5]) el WACC sería del 6,8 %.',
    terminal: 'Crecimiento a perpetuidad del 2,0 % desde 2037, cuando Nubeqa ya es residual (90 M): el valor terminal es el del laboratorio sin Nubeqa (≈ 1.750 M de ventas y 21 % de margen EBITDA), que pesa solo el 28 % del valor. Múltiplo de salida implícito de ≈ 10,5 veces el EBITDA, en línea con las compras de genéricos europeos de 2025 (10-11 veces [D14]).',
  },
  puente_comentarios: {
    '2026e': 'Nubeqa +350 M (de 610 a 960) y resto +3,5 %; los hitos de 2025 (183 M) desaparecen: −9,7 puntos. Dentro de la guía de 2.000-2.100 M [A3].',
    '2027e': 'Nubeqa +140 M (1.100) con más volumen y la regalía media subiendo de tramo; resto +3,5 %.',
    '2028e': 'Nubeqa +80 M (1.180), cerca de su máximo; resto +3,5 %.',
    '2029e': 'Nubeqa −30 M por el precio negociado de Medicare (supuesto propio); resto +3,5 %.',
    '2030e': 'Nubeqa −20 M (patentes de China y Brasil vencen en 2030 [B3]); resto +3,5 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado es de −0,4 % anual medio en 2026-2037, muy por debajo del histórico (10,3 % anual en 2019-2025) y del mercado europeo (≈ 5 % [B2]): la proyección ya incluye la caída de Nubeqa al vencer sus patentes. El crecimiento de 2026-2028 (+5-11 %) sale de un producto que Bayer vende en más de 100 países y que creció un 62 % en 2025 [B3], sin capital nuevo de Orion (regalías). Lo que no se puede financiar con el ROIC actual es sustituir Nubeqa: eso depende de la cartera de I+D y no está en el caso base.',
  dcf_lectura: 'El DCF da 41,11 EUR por acción, un 53 % bajo el precio, con un WACC del 7,80 % y un valor terminal que pesa solo el 28 %: casi todo el valor son los flujos de Nubeqa de 2027-2035. El DCF inverso dice que el precio exige un crecimiento del 14,6 % anual en 2027-2037 con nuestro margen, o una rentabilidad del 3,9 % anual con nuestros flujos: el mercado paga como si Nubeqa o su sustituto duraran mucho más que sus patentes. Con la prima del mercado (WACC 6,8 %) el DCF sube a ≈ 46 EUR; ni un WACC del 6,8 % con un 3 % a perpetuidad pasa de 51 EUR.',
  narrativas: {
    Bajista: 'La IRA elige Nubeqa en 2027 con un precio muy recortado desde 2029, la enzalutamida genérica abarata la clase y la competencia resta cuota: Nubeqa queda un 10 % bajo el base en 2028 y un 20-40 % después; el resto crece un 2 % con 2 puntos menos de margen.',
    Base: 'Nubeqa sube hasta 1.180 M en 2028, se mantiene hasta 2032 y cae con las patentes de 2033-2035; el resto crece un 3,5 % y recupera margen al moderar el I+D.',
    Alcista: 'Nubeqa un 10 % por encima del base (nuevas indicaciones, ARASTEP y DASL-HiCaP positivos) y opevesostat aprobado tras la fase 3 de MSD: hito de 100 M en 2029 y regalías desde 2030 que llegan a 430 M en 2037.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF valen menos que el precio: bajista 29,56 EUR (−66,5 %), base 41,11 (−53,4 %) y alcista 66,49 (−24,7 %). Incluso con opevesostat aprobado y regalías de 430 M al año, el valor no llega al precio actual. La asimetría a largo plazo es desfavorable; a 12 meses, en cambio, el PER de la regla da subidas porque mide el beneficio de 2028, el mejor año de Nubeqa.',
  casos_12m: {
    Bajista: 'Nubeqa un 10 % por debajo del base en 2028 por la IRA y la competencia, resto +2 % con 2 puntos menos de margen: BPA de 4,41 EUR y el PER cae a su mínimo adelantado de cinco años (15,7 veces, el de diciembre de 2025).',
    Base: 'Nubeqa de 1.180 M EUR en 2028, resto +3,5 % con margen del 7 %, impuesto del 20,5 % y 140,37 M de acciones: BPA sin hitos de 5,06 EUR (+11,6 % anual desde 4,06 en 2026e), igual que el consenso de Inderes (≈ 5,07 [D3]).',
    Alcista: 'Nubeqa un 10 % por encima del base: BPA de 5,57 EUR; la regla lleva el PER hacia la media larga (26,8 veces), que viene de cuando Orion era un laboratorio de crecimiento lento sin el riesgo de patente actual.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (4,06 EUR) coincide con el consenso de Yahoo (4,06) y el de 2027e (4,67) queda un 1,7 % por debajo (4,75) [D2]; el de 2028e (5,06) coincide con Inderes (≈ 5,07) [D3]. No discrepamos en el beneficio de los próximos años sino en lo que vale: los analistas ponen un objetivo medio de 77,33 EUR, un 12 % bajo el precio, y nuestro valor intrínseco es de 44,36.',
  objetivo_comentario: 'El objetivo a 12 meses (106,50 EUR, ponderado) queda un 20,6 % sobre el precio (+22,6 % con dividendo) y el base (103,73) un +19,5 %: la regla de múltiplos supone que el mercado seguirá pagando ≈ 20 veces el BPA de 2028, el año de más beneficio de Nubeqa. Pero el valor intrínseco (44,36 EUR) está un 50 % bajo el precio, y la regla exige que el valor intrínseco cubra el precio para comprar: Mantener. El PER histórico de 27-31 veces viene de 2018-2021, cuando el beneficio era pequeño y Nubeqa una promesa; aplicarlo al beneficio máximo de un producto con patente hasta 2033-2035 es la objeción principal a ese objetivo.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %; transacciones sin peso (solo dos con múltiplo, de genéricos). El DCF manda porque el valor de Orion es un flujo con fecha de caducidad (las patentes de Nubeqa) que los múltiplos de un año no recogen. Los comparables (PER de 13 veces, 59,75 EUR) también quedan muy por debajo del precio. Valor intrínseco: 44,36 EUR por acción.',
  suma_partes_comentario: 'No aplica como método: las divisiones comparten I+D, fabricación y red comercial, y Orion no publica resultado por división. El ejercicio útil es el del DCF en dos piezas (Nubeqa y resto) [P1].',
  catalizadores: {
    items: [
      { fecha: '2026-10-28', evento: 'Resultados del 3T26 (no el 21 ni el 22-oct)', efecto: 'Ventas de Nubeqa en el tramo alto de regalías; consenso de ventas de 537 M y BPA de 1,10 EUR [D2, D7]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02-17', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía con Nubeqa cerca de 1.000 M; dividendo de 2026', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Lista de fármacos elegidos para negociar precio en Medicare (IRA) para 2029', efecto: 'Si entra Nubeqa, menos precio en EE. UU. desde 2029 (supuesto propio, sin confirmar)', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027', evento: 'Datos de ARASTEP (darolutamida en recaída bioquímica)', efecto: 'Nueva indicación que alarga el crecimiento de Nubeqa [B5]', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027 (final)', evento: 'Lectura de la fase 2 de ODM-212 (TEADES)', efecto: 'Opción de cartera propia en mesotelioma [B5]', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2028', evento: 'Resultados de las fases 3 OMAHA-003 y OMAHA-004 de opevesostat (MSD)', efecto: 'Hitos de registro de hasta 625 M USD y regalías del 10-20 % si funciona [B14]', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2033-2035', evento: 'Vencimiento de la patente del compuesto de Nubeqa (EE. UU. 2033; Europa y Japón 2035)', efecto: 'Genéricos y caída de regalías [B3]', probabilidad: 'Alta', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Dependencia de Nubeqa: ≈ 32 % de las ventas de 2025 y la mayor parte del beneficio, con patente del compuesto hasta 2033 en EE. UU. y 2035 en Europa y Japón', tipo: 'Producto y patentes', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: 'Ya en el DCF: sin Nubeqa el beneficio caería ≈ 85 %', mitigante: 'Patentes de formulación de 2036 y 2038 en litigio con Hetero; opevesostat como sustituto [B12, B14]', senal: 'Ventas de Nubeqa de Bayer por trimestre y regalía media' },
      { riesgo: 'Precio negociado de Medicare (IRA) para Nubeqa desde 2029 y competencia de la enzalutamida genérica', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −25 % (bajista)', mitigante: 'Más de la mitad de las ventas fuera de EE. UU.; nuevas indicaciones', senal: 'Lista de fármacos de Medicare de 2027' },
      { riesgo: 'Múltiplo: 19,4 veces el BPA adelantado sin hitos y 20,2 veces el EBITDA, en máximos, con el DCF un 53 % por debajo', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % si el PER vuelve a 15,7 veces', mitigante: 'Beneficio creciendo ≈ 12 % anual hasta 2028', senal: 'Revisiones del BPA de 2027-2028' },
      { riesgo: 'Cartera de I+D: ODM-111 abandonado (2024), ODM-105 falló (2025), LEVEL de Tenax falló (2026)', tipo: 'I+D', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Opción perdida; ya fuera del base', mitigante: 'Opevesostat lo financia MSD; ODM-212 y ODM-216 en fase temprana [B5, B8, B13]', senal: 'Lecturas de 2027-2028' },
      { riesgo: 'Socio único: Bayer controla precio, marketing y estrategia de Nubeqa', tipo: 'Socios', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Difícil de cuantificar', mitigante: 'Contrato de licencia mundial con regalías escalonadas; Orion fabrica el producto [B14]', senal: 'Cambios en la prioridad de Bayer en oncología' },
      { riesgo: 'Genéricos y precios en los mercados nórdicos (entacapona −4 % en el 1S26); competencia de inhaladores genéricos con Easyhaler', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −3 %', mitigante: 'Easyhaler +7,2 % en el 1S26, con la combinación budesonida-formoterol +12,3 % [A3]', senal: 'Ventas de Easyhaler y de genéricos' },
      { riesgo: 'Riesgo de IA (descubrimiento de fármacos más rápido para competidores; automatización de funciones comerciales)', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±2 % a 3-5 años', mitigante: 'El valor está en patentes y fabricación regulada, que la IA no sustituye', senal: 'Nuevos antiandrógenos o fármacos de próstata en ensayos acelerados' },
    ],
    premortem: 'Octubre de 2028: la acción ha perdido un 40 %. No fue un mal trimestre: Medicare eligió Nubeqa en 2027 con un recorte fuerte desde 2029, la enzalutamida genérica abarató la clase y la fase 3 de opevesostat dio datos mixtos. El mercado dejó de pagar 20 veces un beneficio que empezaba a bajar en 2029 y con la patente de EE. UU. a cinco años; el PER volvió a 12-13 veces, el de los laboratorios europeos con vencimientos próximos.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±2 % a 3-5 años',
      comentario: 'La IA no amenaza lo que da el beneficio a Orion: regalías protegidas por patentes, fabricación regulada de medicamentos e inhaladores con know-how propio, y una red comercial en mercados con precios públicos. Puede ayudar a su I+D (selección de moléculas, ensayos más eficientes) y, en contra, acelerar a competidores en oncología, lo que acortaría la vida comercial de Nubeqa o de opevesostat. El efecto neto es pequeño y lento frente al riesgo de patentes y precios.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Nubeqa', pregunta: '¿Qué parte de las ventas de Nubeqa de Bayer es de EE. UU. y de Medicare, y qué supone Orion para el precio negociado de la IRA?', por_que: 'Decide cuánto cae el beneficio desde 2029.' },
      { tema: 'Patentes', pregunta: '¿Qué protección dan las patentes de formulación de 2036 y 2038 frente a la ANDA de Hetero y cómo va el litigio?', por_que: 'Si se sostienen, el beneficio de Nubeqa en EE. UU. duraría hasta tres años más.' },
      { tema: 'Regalías', pregunta: '¿Cuáles son los tramos de la escala de regalías y qué regalía media se alcanza con 3.000-4.000 M EUR de ventas de Bayer?', por_que: 'La regalía media (≈ 25 %) sube con las ventas: es la palanca del beneficio de 2027-2028.' },
      { tema: 'I+D', pregunta: '¿Qué nivel de I+D piensa mantener Orion cuando bajen las regalías de Nubeqa?', por_que: 'El margen del negocio sin Nubeqa (≈ 5 % tras el I+D) es el valor terminal.' },
      { tema: 'Opevesostat', pregunta: '¿Cuándo esperan MSD y Orion los datos de OMAHA-003/004 y qué hitos de registro corresponden a cada indicación?', por_que: 'Es el único activo que puede sustituir a Nubeqa.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. La regla a 12 meses da subidas (objetivo de 106,50 EUR, +22,6 % ponderado con dividendo y +19,5 % en el base) porque mide el beneficio de 2028, el mejor año de Nubeqa, con un PER de ≈ 20 veces. Pero el valor intrínseco es de 44,36 EUR, un 50 % bajo el precio de 88,30 EUR (cierre del 20-oct-2026), y la regla no deja comprar si el valor intrínseco no cubre el precio. La convicción es media porque las dos lecturas chocan: el beneficio de los próximos dos años es sólido (nuestro BPA es el del consenso), pero su duración depende de patentes y de una cartera de I+D sin probar. Subiría la convicción una caída del precio hacia el valor intrínseco o un dato positivo de opevesostat; la bajaría la entrada de Nubeqa en la negociación de precios de Medicare.

**El negocio.** Orion es un laboratorio finlandés con dos negocios: las regalías y pastillas de Nubeqa, el fármaco para el cáncer de próstata que inventó y vende Bayer (610 M EUR en 2025, con margen muy alto) [A2], y un laboratorio europeo de genéricos, marcas e inhaladores Easyhaler (≈ 1.100 M EUR) que, tras pagar todo el I+D, apenas gana dinero.

**Finanzas.** Ventas de 1.890 M EUR en 2025 (+10,3 % anual desde 2019) y BPA de 3,56 EUR, de los que ≈ 1,04 son hitos que no se repiten [A2]. Guía de 2026: ventas de 2.000-2.100 M y resultado de explotación de 650-750 M [A3]. Sin deuda neta, ROIC del 39 % y dividendo creciente (1,80 EUR).

**Equipo y gobierno.** Liisa Hurme, en Orion desde 1999 y consejera delegada desde 2022, ha cumplido o superado la guía inicial seis años seguidos [C8]. Consejo de ocho independientes; doble clase de acciones (las A con 20 votos) que protege de una opa hostil [C1].

**Valoración.** El DCF da 41,11 EUR: casi todo el valor son los flujos de Nubeqa hasta que venzan sus patentes (EE. UU. 2033, Europa y Japón 2035 [B3]). El precio exige un crecimiento del 14,6 % anual hasta 2037 o una rentabilidad de solo el 3,9 % anual. Ni el alcista con opevesostat aprobado (66,49 EUR) llega al precio. Los analistas ponen un objetivo medio de 77,33 EUR [D2].

**Riesgos y catalizadores.** Dependencia de Nubeqa, precio negociado de Medicare desde 2029 (supuesto propio), competencia de la enzalutamida genérica y una cartera de I+D con varios fracasos (ODM-111, ODM-105, LEVEL). El 3T26 sale el 28-oct; opevesostat (MSD) da datos de fase 3 hacia 2028.

**Qué cambiaría la decisión.** Comprar por debajo de 44,36 EUR (donde el valor intrínseco cubre el precio); vender por encima de 120,33. Opevesostat positivo en fase 3 o una sentencia que sostenga las patentes de formulación hasta 2036-2038 subirían el valor.`,
    tesis: 'Orion cobra regalías de uno de los antiandrógenos de mayor crecimiento del mundo (Nubeqa, 2.385 M EUR de ventas de Bayer en 2025, +62 %) sin pagar su comercialización, y lo combina con un laboratorio nórdico estable. El beneficio crecerá ≈ 12 % al año hasta 2028, pero el producto tiene patente hasta 2033-2035 y el resto del negocio gana poco tras el I+D: a 88 EUR el precio paga una duración del beneficio que las patentes no garantizan.',
    vision_diferencial: {
      mercado_descuenta: 'Que Nubeqa seguirá creciendo y que Orion encontrará un sustituto (opevesostat, biológicos) antes de que venzan las patentes; paga ≈ 20 veces el BPA de 2027, como un laboratorio con beneficio duradero.',
      nuestra_vision: 'Coincidimos en el beneficio de 2026-2028 (nuestro BPA es el del consenso); discrepamos en la duración. Sin un sustituto probado, el beneficio de 2028 es un máximo, no una base: el DCF con las patentes da 41 EUR.',
      por_que: 'Bayer publica las fechas de patente del compuesto (EE. UU. 2033, Europa 2035) [B3] y la cartera propia ha fallado tres veces en dos años [A15, B8]; opevesostat es real pero está en fase 3 y en manos de MSD.',
    },
    a_favor: [
      '**Nubeqa en máximos**: +69 % en el 2T26, con el tramo alto de regalías alcanzado [A3].',
      '**Rentabilidad excepcional**: ROIC del 39 % sin deuda neta.',
      '**Guía cumplida**: seis años igualando o superando la guía inicial; 2026 elevada dos veces [C8].',
      '**Opción opevesostat**: hasta 1.630 M USD de hitos y regalías del 10-20 %, financiado por MSD [B14].',
      '**Dividendo creciente**: 1,80 EUR (2,0 %) con política de subirlo cada año [A1].',
    ],
    en_contra: [
      '**Patentes con fecha**: compuesto de Nubeqa hasta 2033 en EE. UU. y 2035 en Europa [B3].',
      '**Valor intrínseco a la mitad**: DCF de 41 EUR frente a 88 de precio.',
      '**IRA y genéricos de la clase**: Medicare puede negociar el precio de Nubeqa desde 2029.',
      '**I+D con fracasos**: ODM-111, ODM-105 y LEVEL en dos años [A15, B8].',
      '**En máximos históricos**: +30 % en 12 meses y objetivo medio de los analistas un 12 % bajo el precio [D2].',
    ],
    que_vigilar: 'La tesis depende de cuánto dure el beneficio de Nubeqa. Las señales a favor serían opevesostat positivo en fase 3, una sentencia que sostenga las patentes de 2036-2038 o que Nubeqa quede fuera de la negociación de Medicare; en contra, la lista de Medicare de 2027 con Nubeqa o una desaceleración de las ventas de Bayer.',
    cambiaria_recomendacion: [
      'Precio por debajo de 44,36 EUR: Comprar (el valor intrínseco cubre el precio y la regla a 12 meses ya da más del 15 %).',
      'Precio por encima de 120,33 EUR: Vender.',
      'Opevesostat positivo en OMAHA-003/004 (2028): revisar al alza el valor intrínseco.',
      'Patentes de formulación de 2036-2038 confirmadas en EE. UU.: alargar Nubeqa en el DCF.',
      'Nubeqa en la lista de Medicare de 2027 con recorte fuerte: reforzar la prudencia.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas de Nubeqa registradas por Orion', nivel_actual: '381,8 M EUR en el 1S26 (+64,9 %)', umbral_alerta: '< 900 M en 2026', por_que: 'Base del beneficio.' },
      { kpi: 'Ventas de Nubeqa de Bayer', nivel_actual: '2.385 M EUR en 2025 (+62 %)', umbral_alerta: 'Crecimiento < 15 %', por_que: 'Determina la regalía media.' },
      { kpi: 'Resultado de explotación (guía 2026)', nivel_actual: '650-750 M EUR', umbral_alerta: '< 650 M', por_que: 'Cumplimiento de la guía.' },
      { kpi: 'Easyhaler', nivel_actual: '95,3 M EUR en el 1S26 (+7,2 %)', umbral_alerta: 'Crecimiento < 3 %', por_que: 'Principal motor del negocio sin Nubeqa.' },
      { kpi: 'Gasto en I+D', nivel_actual: '210 M EUR en 2025', umbral_alerta: '> 280 M sin hitos nuevos', por_que: 'Define el margen del resto del negocio.' },
    ],
  },
};
