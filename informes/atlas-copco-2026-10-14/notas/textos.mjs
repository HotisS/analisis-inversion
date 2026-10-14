// Textos del analista (Atlas Copco, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Atlas Copco, Cision, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los informes trimestrales (4T25, 1T26 y 2T26), del informe anual 2025 (cifras clave) y de proveedores (Stock Analysis, Inderes, Simply Wall St, Eulerpool), con la URL como fuente. El precio (211,80 SEK) es una estimación: la cotización en euros del 14-oct (18,73 EUR [D1]) al EUR/SEK implícito de ese día; el último cierre comprobado es 209,70 SEK del 9-oct [D2]. Faltan los segmentos, el balance anterior a 2025, el resultado financiero e impuestos anuales, el gobierno y el tamaño de los mercados (huecos). Confianza media en cuentas y BPA; baja en consenso, comparables (solo PER), gobierno y sentimiento.',

  controles_explicados: [
    { control: 'Al menos 10 fuentes primarias', explicacion: 'Desde la nube solo se llega a los extractos de búsqueda: ocho documentos de la empresa (informes trimestrales, anual y comentarios del CEO); el resto son proveedores de datos y prensa.' },
  ],

  huecos_resueltos: [],

  parches: [
    { ruta: 'sentimiento.temas[0].contraste', valor: 'Tienen razón en el impulso: pedidos del 2T26 +26 % orgánico, récord, con el vacío como motor [A2, A3]. Pero el vacío para semiconductores es la parte más cíclica del grupo: en 2023-2024 los pedidos de vacío cayeron con el ciclo de memorias (hueco: sin cifras por área). Nuestro base ya incluye un 2027 de +8,5 %.' },
    { ruta: 'sentimiento.temas[1].contraste', valor: 'Los datos lo respaldan: el PER de cierre no ha bajado de 25,5 veces desde 2019 (Inderes [D3]) y hoy cotiza a 33,2 veces nuestro BPA de 2027e. El DCF a nuestro WACC da menos de la mitad del precio. La experiencia dice que «cara» no basta para vender Atlas Copco: por eso manda la regla a 12 meses.' },
    { ruta: 'sentimiento.temas[2].contraste', valor: 'Correcto: ROCE del 24 % en 2025 y del 28 % en 2024 [A1], margen operativo ajustado del 21 % en el 2T26 [A2], deuda neta de solo 0,4 veces el EBITDA [A7] y dividendo extraordinario de 2,00 SEK [A9].' },
  ],

  secciones: {
    historia: {
      resumen: 'Atlas Copco se fundó en Estocolmo en 1873 y es desde hace décadas el primer fabricante mundial de compresores de aire. Su modelo combina producto de calidad, una red propia de servicio que factura cerca de la mitad del grupo y compras pequeñas continuas (29 en 2025 [A1]). En 2018 escindió Epiroc (minería) y en los últimos quince años ha construido, comprando Edwards (2014) y Leybold (2019), el mayor negocio de vacío del mundo, con fuerte peso en fábricas de semiconductores. En 2022 desdobló las acciones 4 por 1. El 2T26 trajo pedidos récord de 50.951 M SEK por el vacío [A2].',
      confianza: 'Media',
    },
    negocio: {
      descripcion: 'Cuatro áreas: Compressor Technique (compresores industriales, de gas y de proceso, la mayor), Vacuum Technique (bombas de vacío para semiconductores, pantallas e industria: Edwards y Leybold), Industrial Technique (herramientas de montaje, unión y visión para automoción y electrónica) y Power Technique (compresores portátiles, generadores, bombas y alquiler). Ventas de 168.343 M SEK en 2025 [A1]. No se pudo leer el desglose por área ni por región (hueco).',
      como_gana_dinero: 'Vende equipos con margen alto y, sobre todo, servicio (repuestos, contratos y reparaciones) sobre una base instalada enorme: el servicio crece todos los años y amortigua el ciclo de equipos [A1]. El margen operativo se mantiene en el 20-22 % en todo el ciclo (20,3 % en 2025, 21,0 % ajustado en el 2T26 [A1, A2]) porque la empresa sube precios y ajusta costes rápido con una organización muy descentralizada.',
      clientes: 'Base industrial muy atomizada (fábricas, talleres, alquiladores, constructoras), salvo en vacío, donde pesan los grandes fabricantes de chips y de equipos de fabricación de semiconductores. Sin cliente relevante publicado.',
      confianza: 'Media',
    },
    sector: {
      definicion: 'Aire comprimido, vacío, herramientas industriales y equipos de energía portátiles. No se encontraron cifras de tamaño de mercado en esta sesión (hueco); la referencia del ciclo son los pedidos de la propia empresa y de Ingersoll Rand.',
      drivers: [
        { driver: 'Inversión en fábricas de semiconductores (IA, memorias, lógica avanzada)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pedidos de vacío ≈+60 % en el 2T26 [B3]; Visible Alpha esperaba +44 % en 2026 [B1].' },
        { driver: 'Eficiencia energética del aire comprimido', efecto: '+', horizonte: 'Estructural', evidencia: 'Los compresores de velocidad variable y la recuperación de calor sostienen la sustitución de equipos; crecimiento de dos dígitos de pedidos en compresores industriales en el 2T26 [A3].' },
        { driver: 'Producción industrial y automoción', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Equipos +1 % orgánico en 2025 con demanda mixta [A1].' },
        { driver: 'Divisa (corona fuerte)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Ventas −5 % publicadas en 2025 y en el 1T26 con orgánico positivo [A1, A4].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Oligopolio global (Atlas Copco, Ingersoll Rand, Kaeser) en compresores y pocos grandes en vacío de semiconductores (Edwards, Ebara, Pfeiffer).' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Bajo en industria; alto en semiconductores, donde pocos clientes concentran la inversión.' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Componentes y acero; se repercuten en precio.' },
        { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Red de servicio global, base instalada y homologaciones en semiconductores.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'Pocos sustitutos del aire comprimido y del vacío en la fabricación.' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'Tras un 2025 de ventas a la baja (−5 % publicado, equipos +1 % orgánico [A1]), el 2T26 marca pedidos récord (+26 % orgánico) y ventas +8 % orgánico [A2]: comienzo de una expansión liderada por semiconductores. La empresa prevé que la actividad se mantenga en el nivel actual [A2].' },
      regulacion: 'Normas de eficiencia energética y de emisiones (diseño ecológico europeo) favorecen la sustitución de compresores antiguos; controles de exportación de equipos de semiconductores a China pueden afectar al vacío.',
      tendencias: 'Electrificación, eficiencia energética, automatización con visión artificial y fábricas de chips para IA. Atlas Copco está bien situada en todas; el riesgo es la concentración del crecimiento en el vacío para semiconductores.',
      confianza: 'Baja',
    },
    competencia: {
      cuota_pct: null,
      posicion: 'Primer fabricante mundial de compresores y de bombas de vacío por ventas; cuota no comprobada en esta sesión (hueco).',
      foso: {
        veredicto: 'Amplio', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Débiles.' },
          { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Equipos homologados en fábricas de chips y contratos de servicio sobre la base instalada.' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marcas líderes (Atlas Copco, Edwards, Leybold) y tecnología de vacío seco; margen del 20-22 % en todo el ciclo [A1, A2].' },
          { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala y organización descentralizada.' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red de servicio global difícil de replicar.' },
        ],
      },
      amenazas: 'Ebara y la integración vertical de algunos fabricantes de equipos en vacío; competidores chinos en compresores de gama media.',
      confianza: 'Baja',
    },
    financieros: {
      comentario: 'Las ventas pasan de 110.912 M SEK en 2021 a 176.771 M en 2024 y bajan a 168.343 M en 2025 (−5 %, casi todo por la corona) [A1, A5]. El EBITDA sube de 29.025 M a 46.951 M en 2024 y baja a 43.643 M en 2025 [A8], con margen estable en torno al 26 %. El BPA pasa de 3,72 SEK en 2021 a 6,11 en 2024 y 5,43 en 2025 [A5]. En el 1S26 el BPA vuelve a crecer (1,45 SEK en el 2T26 frente a 1,34 [A2]).',
      ajustes: 'Cifras publicadas. En 2025 la empresa excluye partidas que afectan a la comparabilidad (margen ajustado del 20,7 % frente al 20,3 % publicado [A1]); no se ajustan aquí porque el BPA histórico del PER es el publicado. La amortización es EBITDA menos EBIT (incluye intangibles comprados).',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (16-jul) la empresa presentó pedidos récord de 50.951 M SEK (+27 %, +26 % orgánico), ventas de 44.974 M (+8 % orgánico), resultado operativo de 9.249 M (20,6 %; 21,0 % ajustado) y BPA de 1,45 SEK (1,34) [A2]. Crecimiento de pedidos de dos dígitos en las cuatro áreas, con el vacío disparado por semiconductores; flujo operativo de 6.758 M y ROCE del 24 % [A2, C2]. La dirección prevé que la actividad se mantenga en el nivel actual y reconoce dificultades para subir la producción al ritmo de la demanda [A3, B2].',
      confianza: 'Media',
    },
    balance: {
      otros_pasivos: 'Deuda total de 34.899 M SEK (6.471 M a corto) y caja de 15.523 M a cierre de 2025: deuda neta de 19.376 M, unas 0,4 veces el EBITDA [A7].',
      comentario: 'Balance muy sólido: patrimonio de 110.383 M SEK sobre un activo de 202.454 M y deuda neta mínima [A7]. Permite seguir comprando y pagar el dividendo extraordinario de 2,00 SEK de 2025 [A9]. Intangibles y fondo de comercio de 77.078 M (38 % del activo) por las compras de Edwards, Leybold y las de complemento.',
    },
    flujos: {
      comentario: 'Flujo operativo de 23.152 M SEK en 2021, 36.887 M en 2024 y 32.566 M en 2025 [A6]. Capex propio (material e intangibles) del 3-4 % de las ventas y compras de 2.334-11.560 M al año [A6]. Los dividendos pagados suben de 8.889 M a 14.606 M [A6]. 2022 fue flojo por la acumulación de existencias en plena crisis de suministros.',
    },
    calidad: {
      comentario: 'Sin acceso al informe de auditoría, la lectura se apoya en los indicadores del motor (Altman Z de 8,11, zona muy segura) y en la conversión de caja: flujo operativo de 32.566 M SEK frente a un beneficio de 26.420 M en 2025 [A6, A5]. No hay señales contables preocupantes en lo leído.',
      senales: [
        { senal: 'Partidas que afectan a la comparabilidad', nivel: 'Baja', comentario: '0,4 puntos de margen en 2025 [A1].' },
      ],
    },
    capital: {
      politica: 'Prioridades: inversión orgánica y compras de complemento (29 en 2025 [A1]), dividendo ordinario estable o creciente (3,00 SEK en 2024 y 2025) y reparto extraordinario cuando sobra caja (2,00 SEK en 2025, en dos plazos; la fecha ex del segundo es el 19-oct-2026 [A9, D15]).',
      comentario: 'De 2021 a 2025 gastó 36.223 M SEK en compras y 57.595 M en dividendos con un flujo operativo acumulado de 142.066 M [A6]: asignación prudente, con deuda casi nula y sin recompras.',
    },
    directivos: {
      comentario: 'Vagner Rego, consejero delegado desde 2024 tras dirigir Compressor Technique, sigue el modelo descentralizado de la casa [C1]. No se pudo comprobar el resto del equipo ni el historial de objetivos (hueco).',
    },
    gobierno: {
      remuneracion: 'No se pudo leer el informe de remuneraciones de 2025 (hueco).',
      control_y_defensas: 'Investor AB (familia Wallenberg) es el accionista de referencia, con acciones A de un voto frente a las B de una décima: controla la junta. Estabilidad y horizonte largo a cambio de menos voz del minoritario (porcentaje no comprobado en esta sesión).',
    },
    consenso: {
      guidance: 'Atlas Copco no da guía numérica: solo la frase de perspectivas. En el 1T26 y el 2T26 dijo que espera que la actividad de los clientes se mantenga en el nivel actual [A4, A2].',
      revisiones: 'Al alza tras el 2T26: Handelsbanken sube el objetivo a 240 SEK (7-oct) y sus BPA de 2026-27 un 2 % [D6]; Bernstein a 240, Citi 242 y Morgan Stanley 222 [D8]; RBC sigue en infraponderar con 145 SEK [D7]. El consenso de BPA disponible es de junio (5,81, 6,67 y 7,29 SEK para 2026-2028 [D4]) y probablemente ya ha subido.',
    },
    multiplos_historicos: {
      comentario: 'El PER de cierre fue de 27,0 veces en 2019, 34,0 en 2020, 41,3 en 2021, 25,5 en 2022, 30,1 en 2023, 27,6 en 2024 y 30,6 en 2025 [D3]. Se excluyen 2020 y 2021 (tipos a cero). Hoy cotiza a 33,2 veces nuestro BPA de 2027e y a 32,7 veces el de los próximos 12 meses: por encima de su mediana de cinco años (28,85 veces).',
    },
    comparables: {
      criterio: 'Ingersoll Rand (compresores y vacío, el directo) [D10], Epiroc (escisión de Atlas Copco) [D11] y seis industriales europeos de calidad con PER de los próximos 12 meses de los informes del repositorio del mismo día (ASSA ABLOY, Schindler, Legrand, Indutrade, Halma, IMI) [D12]. Sin EV/EBITDA ni crecimiento de cada uno (hueco).',
      comentario: 'La mediana del PER es de 24,3 veces; Atlas Copco, a 32,7 veces los próximos 12 meses, cotiza con una prima del 35 % que el mercado justifica por su ROCE del 24 % y el ciclo de semiconductores.',
    },
    transacciones: {
      comentario: 'No se encontraron operaciones comparables con múltiplo en esta sesión (hueco). Con Investor AB de control no hay prima de compra posible.',
    },
    sentimiento: {
      lectura: 'El tono es positivo y mejorando desde los pedidos récord del 2T26: la prensa sueca la llamó «una ganga» en julio y los bancos suben objetivos [E3, E4, E6]. La crítica de siempre (perpetuamente cara [E5], GF Value por debajo del precio [E1]) sigue ahí. Ninguna cifra sale de aquí; no anticipa riesgos que el informe no recoja.',
      confianza: 'Baja',
    },
    esg: null,
    bolsa: null,
  },

  dcf_justificacion: {
    crecimiento: 'Orgánico del 5 % en 2026 (3 % en el 1T y 8 % en el 2T [A4, A2]) y del 6,5 % en 2027 por la cartera de pedidos récord (+26 % orgánico en el 2T26 [A2]); después baja del 4,5 % al 1 % en 2035. Compras de 2 puntos al año hasta 2030 (29 compras en 2025 [A1]) y divisa de −1 punto en 2026. Rebajamos el orgánico de 2027-2032 medio punto frente a la primera versión para que la prueba de sostenibilidad pase con el ROIC actual.',
    margenes: 'Margen EBITDA del 26,0 % en 2026 (25,9 % en 2025 [A8]) y del 27,0 % desde 2028 por apalancamiento operativo con volumen (21 % de margen operativo ajustado en el 2T26 [A2]).',
    inversion: 'Capex = capex propio del 3,7 % de las ventas (6.187 M en 2025 [A6]) + compras de 2,5 veces las ventas compradas (2 puntos de crecimiento = 5 % de las ventas; 4,6 % de media en compras en 2021-2025 [A6]) + 1,6 puntos por el circulante, que no se pudo medir (hueco) y entra como inversión. Amortización del 5,7 % bajando al 5,0 %.',
    wacc: 'Tasa libre del 3,0 % (bono sueco a 10 años del 2,98 % en julio [D14]), beta de 1,1 (GuruFocus da 1,37 para la B [D9]; la rebajamos hacia la media de industriales de calidad), prima del 5,5 %, coste de la deuda del 4 % y un 3 % de deuda: WACC del 8,87 %. Con la prima implícita del mercado (4,20 % [D13]) el WACC baja al 7,49 % y el DCF sube a 114,84 SEK.',
    terminal: 'Gordon con un crecimiento del 2,0 % (inflación objetivo del Riksbank). El valor terminal pesa un 59 %.',
  },
  puente_comentarios: {
    '2026e': 'Orgánico del 5 % (3 de volumen y 2 de precio), compras de 2 puntos y divisa de −1 [A2, A4].',
    '2027e': 'Cartera de pedidos récord del 2T26: volumen del 4,5 % y precio del 2 %, más 2 puntos de compras [A2].',
    '2028e': 'Normalización: orgánico del 4,5 % y compras de 2 puntos.',
    '2029e': 'Orgánico del 3,5 %, por debajo de la media por un posible giro del ciclo de semiconductores.',
    '2030e': 'Orgánico del 4 % y compras de 2 puntos.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí, con la rebaja ya hecha. La proyección reinvierte el 23 % del NOPAT, que al ROIC del 19,7 % financia un 4,5 % anual; los 2 puntos de precio no necesitan capital, así que el 5,0 % proyectado es financiable. La primera versión (orgánico medio punto mayor y menos capex) suponía que el capital nuevo rendía un 30,9 %: se rebajó el crecimiento y se subió el capex hasta un 24,5 %, dentro de 1,25 veces el ROIC. El ROIC del motor (19,7 %) incluye todo el fondo de comercio; el ROCE de la empresa es del 24 % [A1].',
  dcf_lectura: 'El DCF da 89,93 SEK por acción, un 57,5 % por debajo del precio. El DCF inverso dice que el precio de 211,80 SEK descuenta un crecimiento del 17,1 % anual en 2027-2035 con nuestro margen, frente al 4,9 % de nuestro base, o una rentabilidad implícita del 5,1 % frente a un WACC del 8,87 %. Atlas Copco siempre ha cotizado así: el mercado le pide menos rentabilidad que a la media por la calidad.',
  narrativas: {
    Bajista: 'El ciclo de semiconductores se da la vuelta en 2027 como en 2023, la industria general no compensa y el margen EBITDA cae 2 puntos; el crecimiento queda 3 puntos por debajo del base.',
    Base: 'La cartera récord se convierte en ventas en 2026-2027 (+6 % y +8,5 %), el margen sube al 27 % y luego el crecimiento se normaliza al 5-6 % con compras de 2 puntos.',
    Alcista: 'El ciclo de IA dura más, el vacío sigue creciendo a doble dígito y el margen sube un punto más.',
  },
  escenarios_comentario: 'El valor intrínseco queda por debajo del precio en los tres escenarios (60,98-109,91 SEK) porque descontamos al 8,87 % un negocio que el mercado descuenta al 5,1 %. A 12 meses, con nuestro BPA y la regla común, el rango es de 151,73 a 218,77 SEK.',
  suma_partes_comentario: 'No aplica: sin desglose de resultados por área en esta sesión.',
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %. El DCF es muy sensible a la tasa: con la prima del mercado da 114,84 SEK. Ninguna versión se acerca al precio; la recomendación la decide la regla a 12 meses, no el valor intrínseco.',
  diferencia_consenso: 'Nuestro BPA de 2028e (6,96 SEK) queda un 4,5 % por debajo del consenso de junio (7,29 SEK [D4]), por un orgánico algo menor tras 2027; el consenso habrá subido tras el 2T26 (Handelsbanken +2 % [D6]). El objetivo medio (204 SEK [D5]) queda un 1,4 % por encima de nuestro base (201,14 SEK).',
  objetivo12m_comentario: 'El objetivo a 12 meses (193,20 SEK) queda muy por encima del valor intrínseco (106,29 SEK): suponemos que el mercado sigue pagando su mediana histórica de 28,85 veces, no que el PER converge a nuestro DCF. Frente al precio, el base pierde un 3,6 % porque hoy cotiza a 33,2 veces nuestro BPA de 2027e, por encima de esa mediana: el ciclo de semiconductores ya está en el precio.',
  rentabilidad_comentario: 'Atlas Copco crea mucho valor: ROIC del 19,7 % en 2025 sobre todo el capital (con el fondo de comercio) frente a un WACC del 8,87 %, 10,8 puntos de diferencia; el ROCE de la empresa fue del 24 % en 2025 y del 28 % en 2024 [A1]. Margen neto estable del 16 % en 2021-2025. Sin balance anterior a 2025 no se puede medir la serie del ROIC (hueco).',
  catalizadores: {
    items: [
      { fecha: '19-oct-2026', evento: 'Fecha ex del segundo plazo del dividendo (2,50 SEK)', efecto: 'Rentabilidad del 1,2 % [D15, A9].', probabilidad: 'Alta', sentido: '+' },
      { fecha: '22-oct-2026', evento: 'Resultados del 3T26', efecto: 'Pedidos frente al récord del 2T26; una caída del vacío castigaría un precio que ya descuenta el ciclo [D2].', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Ene-2027', evento: 'Resultados del 4T26 y dividendo de 2026', efecto: 'Posible nuevo extraordinario con deuda neta de 0,4 veces el EBITDA [A7].', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Inversión en fábricas de chips para IA', efecto: 'Sostiene los pedidos de vacío [B1].', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Giro del ciclo de semiconductores', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−27 % a 12 meses (bajista: 151,73 SEK)', mitigante: 'Servicio y base instalada', senal: 'Pedidos de vacío a la baja en el 3T26 o 4T26' },
      { riesgo: 'Compresión del múltiplo', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−13 % si el PER vuelve a la mediana con el BPA de hoy', mitigante: 'Calidad reconocida por el mercado', senal: 'Bono sueco por encima del 3,5 %' },
      { riesgo: 'Corona fuerte', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % de BPA por cada 5 % de apreciación (estimación propia)', mitigante: 'Costes en las mismas divisas', senal: 'EUR/SEK y USD/SEK' },
      { riesgo: 'Controles de exportación a China', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Sin cuantificar (falta el peso de China en vacío)', mitigante: 'Producción local', senal: 'Nuevas restricciones de EE. UU.' },
      { riesgo: 'Cuellos de botella de producción', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Retrasa ventas, no las pierde', mitigante: 'Ampliaciones de capacidad', senal: 'Plazos de entrega' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 30 %. Los pedidos de vacío del 2T26 resultaron adelantos de las fábricas de memorias; en 2027 caen y la industria general sigue plana. El margen baja dos puntos y el mercado, que pagaba 33 veces el beneficio, vuelve a 25.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Vacío', pregunta: '¿Qué parte de los pedidos de vacío del 2T26 son pedidos grandes puntuales y qué plazo de entrega tienen?', por_que: 'Decide si 2027 crece un 8,5 % o se queda corto.' },
      { tema: 'Capacidad', pregunta: '¿Cuánto capex extra hace falta para servir la demanda de semiconductores?', por_que: 'Cambia la prueba de sostenibilidad.' },
      { tema: 'Precio', pregunta: '¿Qué parte del orgánico es precio?', por_que: 'El base supone 2 puntos.' },
      { tema: 'Capital', pregunta: '¿Habrá otro extraordinario con la deuda neta en 0,4 veces?', por_que: 'Sube la rentabilidad del accionista.' },
    ],
    confianza: 'Media',
  },

  per_actual: 33.2,
  per_excluidos: '2021 (PER de cierre de 41,3 veces con tipos a cero) y 2020 (34,0 veces, pandemia y burbuja de calidad). Serie usada, precio de cierre ÷ BPA del año (Inderes [D3], BPA de [A5]): 2019 27,0x; 2022 25,5x; 2023 30,1x; 2024 27,6x; 2025 30,6x. Mediana de cinco años (2022-2025, sin 2021): 28,85x; mínimo 25,5x (2022); media larga sin excluidos (2019 y 2022-2025): 28,16x. Actual = 211,80 ÷ 6,38 (nuestro BPA de 2027e) = 33,2x.',
  casos12m: [
    { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 5.95, multiplo: null, precio: null, justificacion: 'Ventas de 194.846 M SEK en 2028e (crecimiento 3 puntos menor en 2027 y 2028: el ciclo de semiconductores se da la vuelta) con margen EBITDA del 25,0 % (−2 puntos): EBITDA de 48.712 M, amortización del 5,7 % (11.106 M), EBIT de 37.606 M, resultado financiero de −400 M e impuestos del 22 %: beneficio de 28.990 M tras minoritarios ÷ 4.871 M acciones.' },
    { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 6.96, multiplo: null, precio: null, justificacion: 'Ventas de 206.196 M SEK en 2028e (+6 % en 2026, +8,5 % en 2027 y +6,5 % en 2028: orgánico más 2 puntos de compras) con margen EBITDA del 27,0 %: EBITDA de 55.673 M, amortización de 11.753 M, EBIT de 43.920 M, resultado financiero de −400 M (−221 M en el 1S25 [A11]) e impuestos del 22 %: 33.916 M tras minoritarios ÷ 4.871 M acciones, sin recompras.' },
    { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 7.57, multiplo: null, precio: null, justificacion: 'Ventas de 213.945 M SEK (+2 puntos de crecimiento en 2027-28 por un ciclo de semiconductores más largo) y margen EBITDA del 28,0 % (+1 punto): EBITDA de 59.905 M, EBIT de 47.710 M, mismo resultado financiero e impuestos: 36.872 M ÷ 4.871 M acciones.' },
  ],
  fuentes: [],
  huecos: [
    { seccion: 'trimestres', campo: 'transcripción de las dos últimas conferencias', tipo: 'Complemento', intentos: '1) Quartr y GuruFocus: solo resumen; 2) roic.ai: no abre; 3) presupuesto de búsquedas', decision: 'Omitido' },
    { seccion: 'dcf', campo: 'bono sueco a la fecha de corte y beta calculada', tipo: 'Complemento', intentos: '1) Riksbank con descargar.mjs: sin red; 2) búsqueda: última lectura del 21-jul (2,98 %); 3) bolsa.mjs para la beta: sin red', decision: 'Calculado y marcado como estimación' },
  ],
};
