// Textos de juicio del analista (bioMérieux, corte 2026-10-08). Cifras del motor tal cual.
export const textos = {
  meta: {
    limitaciones: 'Precio: cierre del 7 de octubre de 2026 (80,75 EUR), porque la sesión del 8 no había cerrado al empezar el análisis; Yahoo trae vacía la barra diaria del 7 de octubre, así que el precio sale de su cierre anterior y de MarketScreener, y las rentabilidades, betas y volatilidad llegan hasta el 6 de octubre. Acciones (118,545 M diluidas) y caja del puente son de la misma fecha, 30 de junio de 2026: no hubo recompras declaradas después de abril. Las participaciones no consolidadas (incluida Oxford Nanopore) van a su valor razonable del 30 de junio. El EBITDA del informe es el resultado operativo publicado más amortizaciones, con los deterioros y la reestructuración devueltos como no recurrentes; difiere del EBITDA propio de la empresa en 12 M en 2025. Los resultados por segmento solo existen desde 2022 con la definición vigente. No hay transcripciones gratuitas de las conferencias: la lectura de la dirección sale de los comunicados y presentaciones. Los comparables y transacciones están convertidos a EUR con el tipo del BCE del 7 de octubre de 2026.',
    controles_explicados: [
      { control: 'EBIT + resultado financiero = BAI', explicacion: 'La diferencia de cada año (42 M en 2020, 130 M en 2023, 49 M en 2024 y 171 M en 2025) es exactamente la partida no recurrente que el informe devuelve al EBITDA y al EBIT (donaciones de la COVID, deterioros de Hybiome y de VITEK REVEAL, cierre de San José); el BAI es el publicado.' },
    ],
  },

  rentabilidad: {
    comentario: 'bioMérieux crea valor, pero menos que en la COVID: el ROIC fue del 12,7 % en 2025 frente a un WACC del 8,57 %, después de caer del 22,4 % de 2021 al 11,2 % de 2023. La causa es el margen, no la rotación, que se ha quedado en 0,7 veces: el margen CEBIT bajó del 23,7 % de 2021 al 16,6 % de 2023 y se recuperó al 17,9 % en 2025 [A4]. El ROIC incremental de 2022-2025 es del 15,1 %, mejor que el medio, porque el crecimiento de esos años vino de reactivos sobre una base instalada que ya existía (BIOFIRE no respiratorio y microbiología). Lo han lastrado las compras: Hybiome y Specific Diagnostics suman unos 340 M de deterioros entre 2022 y 2025, y las de 2024-2026 todavía no facturan [A1, A2]. Qiagen, el comparable más cercano en PCR sindrómica, tiene un ROIC del 11,4 %, y DiaSorin un margen EBITDA del 33,0 % frente al 23,9 % de bioMérieux [E2, E3].',
    confianza: 'Media',
  },

  multiplos_historicos: {
    comentario: 'La acción cotiza a 10,1 veces el EBITDA de los últimos 12 meses y a 20,7 veces su beneficio, frente a una media de 14,1x y 33,0x en los cierres de 2019-2025: está por debajo del mínimo de los siete años (13,4x). El descuento tiene causas: la media incluye los años de la COVID, con márgenes del 26-31 %; el bono alemán a 10 años está en el 3,55 % frente a tipos cercanos a cero en 2019-2021 [D10]; y la empresa ha pasado de prometer un 7 % de crecimiento anual hasta 2028 a un 3-6 % [A3]. Lo que no ha cambiado es la recurrencia: los reactivos siguen en el 83 % de las ventas [A1].',
    confianza: 'Media',
  },

  comparables: {
    criterio: 'Cinco cotizadas de diagnóstico in vitro puro con reactivos recurrentes: Qiagen (PCR sindrómica con QIAstat-Dx), DiaSorin (inmunoensayo y molecular), Sysmex (hematología), Bio-Rad (diagnóstico clínico y ciencias de la vida) y QuidelOrtho. Danaher (dueña de Cepheid), Thermo Fisher y Revvity compiten con bioMérieux, pero su valor lo dan las herramientas de laboratorio y el bioproceso: cotizan a 19,8-21,4x el EBITDA de los próximos 12 meses y doblarían la mediana [E6-E8, E14-E16]. Fuera también Roche y Abbott (conglomerados), Becton Dickinson (su diagnóstico pasa a Waters) y Hologic (ya no cotiza) [E20, E21, E30].',
    comentario: 'La mediana de los cinco es 9,7 veces el EBITDA de los próximos 12 meses y 21,0 veces el beneficio, lo que da 88,06 y 92,31 EUR por acción. bioMérieux cotiza a 8,9x y 18,4x: un descuento del 8 % en EBITDA pese a crecer más que Bio-Rad (1,0 %) y QuidelOrtho (-1,7 %) y a tener caja neta, frente a una deuda de 5,1 veces el EBITDA de QuidelOrtho [E5, E13]. El descuento frente a Qiagen (12,2x) y DiaSorin (11,0x) se explica por el margen: 35,7 % y 33,0 % frente a 23,9 % [E10, E11]. La regresión del múltiplo sobre el crecimiento (R² 0,41, con solo cinco empresas) da 10,8x y 97,75 EUR; no la usamos para el valor objetivo por la muestra pequeña. Si se incluyeran las tres diversificadas, la mediana subiría a 11,6x y el valor a unos 105 EUR: por eso el peso de este método es solo del 25 %.',
    confianza: 'Media',
  },

  transacciones: {
    comentario: 'Las cinco operaciones con valor publicado se pagaron a 4,3-10,5 veces las ventas (mediana 7,1x), con primas del 23-46 % en las OPA [E22-E33]; ninguna publica el EBITDA. Aplicadas a bioMérieux darían más de 240 EUR por acción, una cifra sin sentido práctico: los objetivos eran empresas de PCR sindrómica en pérdidas o con márgenes muy altos (GenMark, Exact Sciences), y la familia Mérieux tiene el 59,9 % del capital y el 72,4 % del voto [C1]. Una OPA de terceros solo puede ocurrir si Institut Mérieux decide vender, y en 2026 ha hecho lo contrario: compró un 1 % más a unos 70,6 EUR por acción [C6, C7]. Por eso las transacciones pesan cero en el valor objetivo.',
    confianza: 'Media',
  },

  suma_partes: {
    comentario: 'No aplica. Los dos segmentos que publica la empresa, clínico (84 % de las ventas) e industrial (16 %), comparten fábricas, tecnología (microbiología y biología molecular) y red comercial, y no hay comparables cotizados puros del control microbiológico industrial con datos homogéneos; un múltiplo distinto para el 16 % de las ventas no cambiaría el valor más de un 2-3 %.',
  },

  dcf: {
    etapa2: {
      usar: false,
      justificacion: 'No se usa la etapa de transición. bioMérieux tiene ventajas reales en PCR sindrómica: unas 28.550 unidades de BIOFIRE instaladas a final de 2025 y más de 7.200 de SPOTFIRE en junio de 2026 [A1, A3], con paneles que el cliente valida y no cambia con facilidad. Pero el ROIC del grupo fue del 12,7 % en 2025 (11,2-12,7 % en 2023-2025), solo 4,1 puntos por encima del WACC del 8,57 %, por debajo de los 5 puntos que exige crecer muchos años con valor; y la propia empresa ha rebajado su crecimiento a medio plazo del 7 % al 3-6 % anual [A3]. Mientras los paneles respiratorios dependan de la gripe y la competencia de QIAstat-Dx y Cepheid crezca, no hay datos para defender un crecimiento por encima del mercado más allá de 2033.',
    },
    justificacion: {
      crecimiento: 'Las ventas crecieron un 7,3 % anual en 2019-2025 y un 6,6 %, 10,3 % y 6,2 % orgánico en 2023-2025 [A1, A4]. En 2026 la guía es de +3/+5 % orgánico, con un primer semestre del +0,2 % y un efecto divisa de -87 M [A3]: suponemos un +0,5 % publicado (el bajo de la guía y un dólar más débil que en 2025), año que tratamos como cerrado. Para 2027-2028 tomamos el +4,5 %, el centro del nuevo rango de +3/+6 % [A3], subimos al 5 % en 2029-2030 con SPOTFIRE y los nuevos paneles, y bajamos al 3,5 % en 2033. La media de 2027-2033 es del 4,4 %, en línea con el mercado de diagnóstico de enfermedades infecciosas. El consenso pide un 1-2,5 % más de ventas en 2026-2028 [D12].',
      margenes: 'El margen EBITDA antes de no recurrentes fue del 23,9 % en 2025, del 21,6-24,1 % fuera de la COVID y del 22,4 % en el primer semestre de 2026 [A2, A4]. Para 2026 suponemos un 23,3 %: el CEBIT crece en el bajo de la guía (0/+10 % orgánico) y la divisa resta 40-50 M [A3]. Desde ahí sube 0,5-0,6 puntos al año hasta 2028, porque la empresa espera que el CEBIT crezca más que las ventas [A3], y se queda en el 25,5 % en 2033, por debajo de DiaSorin (33,0 %) y de Qiagen (35,7 %) [E10, E11]. Estamos un 2,4 %, un 3,9 % y un 5,0 % por debajo del EBITDA del consenso de 2026-2028 [D12]: el consenso no ha recogido del todo el margen del semestre.',
      inversion: 'El capex fue del 8,2-9,2 % de las ventas en 2022-2025, más un 0,7 % de pagos de arrendamientos que el informe suma al capex porque los arrendamientos van en la deuda [A1]. Subimos al 9,4 % en 2027-2028 por la planta de La Balme, de más de 250 M [A3], y bajamos al 7,8 % en 2033, por encima de la amortización (7,6 %). El circulante es alto por las existencias (199 días en 2025): lo dejamos en el 35,5 % de las ventas, entre el 36,0 % de 2025 y el 29-31 % de 2019-2021. Tipo impositivo del 24,5 %, el de 2025.',
      wacc: 'Tasa libre: el Bund a 10 años, 3,55 % el 7 de octubre de 2026 [D10]. No usamos la OAT francesa (4,87 % [D8]) porque lleva un diferencial soberano de 1,3 puntos y Francia es solo el 6 % de las ventas; el riesgo de los países emergentes (Asia-Pacífico y Latinoamérica, el 22 % de las ventas, con China y Argentina) va en una prima adicional de 0,5 puntos. Beta de 0,87: la media de las ajustadas a cinco años frente al STOXX 600, mensual (0,78) y semanal (0,96) [D1]. Frente al CAC 40 sale 0,77-0,82 y frente al STOXX 600 Salud 0,68-0,84; descartamos el CAC por su peso en lujo y bancos y el índice sectorial porque mide la beta frente al sector, no frente al mercado. Prima de mercado del 5,5 %. Coste de los recursos propios del 8,84 %; con caja neta, la deuda pesa un 4,2 % y el WACC queda en el 8,57 %.',
      terminal: 'Crecimiento a perpetuidad del 2,5 %: inflación del euro cercana al 2 % y medio punto real, por debajo de la tasa libre menos medio punto (3,05 %). El valor terminal equivale a 8,0 veces el EBITDA, por debajo de la mediana de los comparables (9,7x) y de la media histórica de la propia empresa (14,1x): es un supuesto prudente.',
    },
    lectura: 'El DCF da 78,38 EUR por acción, un 2,9 % por debajo del precio, con el 70 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 5,5 % anual en 2027-2033 (nosotros, 4,4 %) o un margen EBITDA final del 26,0 % (nosotros, 25,5 %); dicho de otro modo, a 80,75 EUR la acción rinde un 8,4 % anual con nuestras cifras, apenas por debajo del WACC del 8,57 % y por encima del 7,5 % que hoy pide el mercado a una acción con su beta. No es una exigencia alta: el 5,5 % está dentro del nuevo rango de +3/+6 % de la empresa y por debajo de lo que creció en 2023-2025 (6,2-10,3 % orgánico) [A3, A4]. Lo exigente es otra cosa: que se cumpla con un primer semestre de 2026 plano y con los paneles respiratorios cayendo un 17 %. Cada punto de margen vale unos 4,9 EUR por acción y cada medio punto de WACC, entre 6 y 7 EUR.',
    confianza: 'Media',
  },

  escenarios: {
    casos: [
      { escenario: 'Bajista', narrativa: 'Dos temporadas respiratorias flojas seguidas, las compras centralizadas de China llegan a la microbiología y Medicare restringe más los paneles sindrómicos: el crecimiento cae al 2,4 % anual y el margen se queda en el 24 %. Ya pasó en 2022-2023, con ventas planas y el margen CEBIT en el 16,6 % [A4].' },
      { escenario: 'Base', narrativa: 'Ventas en el centro de la nueva guía (+4,5 % en 2027-2028) y margen EBITDA que sube del 23,3 % al 25,5 % en 2033 con más reactivos de SPOTFIRE y la planta de La Balme en marcha.' },
      { escenario: 'Alcista', narrativa: 'La FDA aprueba el panel de vaginitis de SPOTFIRE con exención CLIA, SPINCHIP arranca en Europa y la gripe se normaliza: el crecimiento vuelve al 6 % de 2023-2025 y el margen llega al 26,5 %, aún por debajo de Qiagen y DiaSorin.' },
    ],
    comentario: 'Con nuestro WACC, la asimetría es mala: el alcista gana un 11,2 % y el bajista pierde un 23,8 %, 0,47 veces. Con la prima que hoy pide el mercado (4,2 %, WACC del 7,49 %), el mismo análisis da 110,75 EUR en el alcista y 72,97 EUR en el bajista, y la asimetría pasa a 3,86 veces. La diferencia no está en las cifras del negocio, sino en la tasa de descuento: la acción solo es barata si se acepta el coste de capital que hoy usa el mercado. El bajista es verosímil, porque repite 2022-2023, y la acción ya ha caído un 47 % desde agosto de 2025 [D1].',
    confianza: 'Media',
  },

  valoracion: {
    comentario: 'El DCF pesa un 45 % y los escenarios un 30 %, porque el valor depende de cuánto crezcan los reactivos de una base instalada que conocemos bien. Los comparables pesan un 25 %, solo con los cinco de diagnóstico puro (90,19 EUR de media entre EV/EBITDA y PER): la muestra es pequeña y la mediana cambia mucho si entran las grandes de herramientas. Las transacciones pesan cero, porque el control familiar hace improbable una OPA. Los métodos están cerca entre sí (77-90 EUR) y del precio objetivo medio de los analistas (79,54 EUR [D13]): el valor objetivo de 80,93 EUR coincide con el precio. La dispersión aparece con la tasa de descuento: con la prima implícita del mercado, el DCF sube a 95,50 EUR y el valor objetivo a 93,63 EUR.',
    confianza: 'Media',
  },

  catalizadores: {
    items: [
      { fecha: '30 de octubre de 2026', evento: 'Ventas del tercer trimestre de 2026', efecto: 'Primer dato del arranque de la temporada respiratoria y de si el segundo semestre crece lo que exige la guía (en torno a +6 % orgánico para llegar al +3 % anual)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Noviembre de 2026 – febrero de 2027', evento: 'Temporada de gripe y virus respiratorios en el hemisferio norte', efecto: 'Mueve los paneles respiratorios de BIOFIRE, que cayeron un 17 % en el primer semestre', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Finales de 2026 – principios de 2027', evento: 'Decisión de la FDA sobre el panel de vaginitis de SPOTFIRE (510(k) y exención CLIA, presentado el 26 de junio de 2026)', efecto: 'Abre la salud de la mujer en el punto de atención, primer panel no respiratorio de SPOTFIRE en EE. UU.', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Finales de 2026', evento: 'Lanzamiento comercial de SPINCHIP en Europa (troponina de alta sensibilidad)', efecto: 'Primera venta de la compra de 2025; hoy resta unos 20 M al CEBIT', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Finales de febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Confirma o no el +3/+6 % de 2027-2028 y el margen', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Junio de 2027', evento: 'Vencimiento de 145 M del bono Euro PP', efecto: 'Sin riesgo de liquidez (caja de 658 M); refinanciación a tipos más altos', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Paneles respiratorios', pregunta: '¿Cuánto venden los paneles respiratorios de BIOFIRE en euros y qué parte es COVID? ¿Qué nivel de ventas consideran el suelo de una temporada floja?', por_que: 'Es la única línea que la empresa no cuantifica y explica casi toda la caída del primer semestre de 2026 (-17 %).' },
      { tema: 'Guía 2027-2028', pregunta: '¿Qué parte del recorte de un 7 % a un 3-6 % anual viene de China, de aranceles, del reembolso en EE. UU. y de la epidemiología?', por_que: 'Distinguir lo cíclico de lo estructural decide si el DCF debe crecer al 4,5 % o al 6 %.' },
      { tema: 'Margen', pregunta: '¿Qué margen CEBIT esperan en 2028 tras abandonar el objetivo del 20 %?', por_que: 'Cada punto de margen EBITDA vale unos 4,9 EUR por acción.' },
      { tema: 'VITEK REVEAL', pregunta: '¿Qué ventas y qué fecha de equilibrio esperan de VITEK REVEAL tras el deterioro de 2025 y el cierre de San José?', por_que: 'La compra de Specific Diagnostics fue la mayor de la década y ya acumula 181 M de cargos.' },
      { tema: 'China', pregunta: '¿Qué peso tienen hoy China y los inmunoensayos afectados por las compras centralizadas, y hay calendario para que lleguen a la microbiología?', por_que: 'Es el riesgo que más ha restado a los inmunoensayos desde 2023.' },
      { tema: 'Gobierno', pregunta: '¿Por qué la auditoría interna la presta Institut Mérieux y qué cambiará tras tres juntas en las que la mayoría del capital libre votó contra la remuneración del consejero delegado?', por_que: 'Es la señal de gobierno más clara contra el minoritario.' },
      { tema: 'Capital', pregunta: '¿Por qué no hay recompras con 236 M de caja neta y la acción en mínimos de siete años, mientras Institut Mérieux compra a título propio?', por_que: 'Con 5,9 % de rentabilidad por flujo libre, recomprar crearía valor para el minoritario.' },
      { tema: 'Flujo libre', pregunta: '¿Cuánto del flujo libre de 2025-2026 es la reforma fiscal de EE. UU. y cuándo se revierte?', por_que: 'El impuesto pagado bajó de 123 M a 28 M en el semestre; el flujo normalizado es menor.' },
    ],
    confianza: 'Media',
  },
};
