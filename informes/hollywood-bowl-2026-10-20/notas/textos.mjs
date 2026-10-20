// Textos del analista (Hollywood Bowl Group, corte 2026-10-20). Citas: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Cifras de valoración del motor (calcular-empresa.mjs del 20-oct-2026) y de la regla a 12 meses (motor/objetivo12m.mjs).
export default {
  limitaciones: 'Cifras en millones de GBP, ejercicio a 30 de septiembre etiquetado por el año en que termina (FY2026 = oct-25 a sep-26). El último ejercicio auditado es FY2025: FY2026 ya cerró pero se publica en diciembre; de él solo hay el avance del 7-oct-2026 (ventas, centros y caja neta) [A4], y el LTM es a 31-mar-2026. La acción cotiza en peniques (GBp): el informe da los precios por acción en GBP (1 GBp = 0,01 GBP). Precio: 2,755 GBP (275,5 p), cierre del 19-oct-2026; la sesión del 20-oct estaba abierta al hacer el análisis (275,5 p a las 07:56 UTC [D2]) y la decisión se comprueba con el precio del día en las pruebas de robustez. Nuestro BPA es NIIF 16 con los deterioros de centros dentro; el ajustado de la empresa y del consenso es pre-NIIF 16 y sin deterioros (≈ 2,9 p más). Sin estadística oficial del tamaño del mercado de boleras. Precio de una acción en EUR: ≈ 3,27 EUR (1,188 EUR por GBP [D2]); 1.000 EUR son ≈ 306 acciones.',
  controles_explicados: [
    { control: 'Crecimiento histórico de ingresos (TCAC FY2021-FY2025 del 36,7 %)', explicacion: 'Lo deforma FY2021, con los centros cerrados por el covid gran parte del año (ventas de 71,9 M) [A5]. Desde FY2022, primer año completo, las ventas crecen un 9,0 % anual (193,7 → 250,7 M) y un 4,3 % en FY2026 [A4]: es la referencia con la que se compara el 5,9 % medio proyectado.' },
    { control: 'Crecimiento financiable al ROIC actual (2,5 % frente al 5,9 % proyectado)', explicacion: 'El motor mide la reinversión neta (inversión − amortización + circulante) sobre un ROIC del 12,5 % que incluye en el capital los derechos de uso de los centros y el fondo de comercio de la compra de 2014 (26 % del capital) [A1]. Las aperturas rinden más: la empresa apunta a un 17-20 % de EBITDA sobre la inversión al tercer año y sus últimas aperturas van por encima [A8, A3]; el ROIC incremental histórico es del 32 % (aunque inflado por la salida del covid). El motor da «Sí» y lo aceptamos: el crecimiento sale de aperturas que se pagan con el flujo operativo, sin deuda.' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Hollywood Bowl nació en 1988 como cadena británica de boleras; en 2014 el fondo Epiris (entonces Electra Partners) la compró y la unió con AMF Bowling, y en 2016 salió a bolsa en Londres a 185 p con 54 centros [A1, A8]. Desde entonces ha reformado casi todos los centros (bolos, bar, máquinas recreativas, pistas VIP), ha comprado Bowlplex y ha entrado en Canadá con Splitsville (2022). Cerró por el covid en 2020-2021, amplió capital (29,4 M en FY2021) y salió sin deuda. Hoy tiene 95 centros y apunta a 130 en 2033 [A4].',
      hitos: [
        { anio: '1988', hito: 'Primeras boleras Hollywood Bowl en el Reino Unido.' },
        { anio: '2014', hito: 'Epiris compra Hollywood Bowl y AMF Bowling y las une; Stephen Burns entra como director de operaciones.' },
        { anio: '2016', hito: 'Salida a bolsa en Londres (185 p por acción) con 54 centros.' },
        { anio: '2020-2021', hito: 'Cierres por el covid; ampliación de capital de 29,4 M y salida sin deuda bancaria [A5].' },
        { anio: '2022', hito: 'Compra de Teaquinn (Splitsville, 9 boleras en Canadá); dividendos extraordinarios [A5].' },
        { anio: '2023-2024', hito: 'Compras de boleras independientes en Canadá (7,7 y 13,7 M) y aperturas; Tenpin, su rival, pasa a manos de Trive Capital [A5].' },
        { anio: '2025', hito: 'Primeras recompras (15,2 M); Capital Markets Day con el objetivo de 130 centros en 2033 [A2, A8].' },
        { anio: '2026', hito: 'Ventas récord de 261,6 M pese al verano más caluroso registrado; 95 centros; nuevo director financiero y nuevo auditor (EY) [A4, C6].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC del motor es del 12,5 % en FY2025 (16,0 % en FY2022): capital invertido de 357 M que incluye los derechos de uso de los centros (≈ 220 M) y el fondo de comercio de la compra de 2014 (92,7 M) [A1]. Sin fondo de comercio, el 16,9 %. Frente a un WACC del 8,2 %, la diferencia es de 4,3 puntos: crea valor, pero por debajo de los 5 puntos que pide nuestro requisito de calidad. La tendencia es a la baja (16,0 → 12,5 %) porque los salarios y la energía han bajado el margen EBITDA del 40 % al 36 % y las aperturas suman capital antes que beneficio. Las aperturas maduras rinden más (17-20 % de EBITDA sobre la inversión al tercer año, objetivo de la empresa [A8]); si el margen se recupera al 38 %, el ROIC volvería al 14-15 %. ROE del 22,8 %: alto porque el patrimonio es pequeño (dividendos y recompras), no por deuda bancaria.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material es la gente (≈ 21 % de las ventas en personal de los centros, con mucho empleo joven a salario mínimo; premios de mejor empresa para trabajar en el Reino Unido y Canadá [A3]), la energía (76 % de la electricidad cubierta hasta FY2029, un 12 % con placas solares propias [A3]) y el consumo responsable de alcohol y de máquinas recreativas de premio (categoría D, no juego de azar) [B2]. El plan a largo plazo de los directivos incluye un 10 % ligado al carbono [C1].',
      controversias: 'Sin controversias relevantes encontradas en 12 meses.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'FY2026e (+4,3 %, fijo) es el avance publicado [A4]. FY2027e y FY2028e (+8 %) suman las 8 aperturas de FY2027 (95 → 103 centros) y las 4 de FY2026 todo el año (≈ 6 puntos) y un gasto por partida al alza de ≈ 2 puntos con partidas planas; el consenso pide +11 % en FY2027 [D2]. Después baja al 4 % en FY2033e a medida que se acerca el objetivo de 130 centros [A8].',
    margenes: 'Margen EBITDA NIIF 16 del 36,4 % en FY2026e (igual que FY2025; 1S26 38,4 % y 2S con comparables del −4,5 %), 35,8 % en FY2027e por los costes de apertura y los salarios de abril de 2026 y 2027, y 36 % después: por debajo del 38-40 % de FY2022-FY2024 [A2, A3]. No damos por recuperado el margen que se llevaron el salario mínimo y las cotizaciones (≈ 2 M al semestre) [A3].',
    inversion: 'Inversión con las altas de derechos de uso (alquileres nuevos), como manda la NIIF 16: 70,2 M en FY2025 (28 % de las ventas) [A2]. 18,9 % en FY2026e (guía de 25-30 M en caja + ≈ 22 M de alquileres nuevos), 26 % en FY2027e por las 8 aperturas, y bajada hasta el 15 % en FY2033e frente a una amortización del 14,2 % (con los deterioros de centros, que se repiten). Circulante del −8,5 % de las ventas: cobra al contado y paga a 30-60 días.',
    wacc: 'Tasa libre del 5,31 % (gilt a 10 años, Banco de Inglaterra, 15-oct-2026 [D4, P1]); beta de 0,85, la ajustada semanal a 5 años frente al FTSE 250 (mensual sin ajustar 0,52; semanal a 2 años 1,18) [D1]; prima de mercado del 5 % y 0,5 puntos por tamaño (capitalización de 459 M). Coste de la deuda del 6 % antes de impuestos (tipo implícito de los arrendamientos: 13,7 M de intereses sobre ≈ 236 M [A2]) y peso del 34 % (arrendamientos de 235 M frente a 459 M de capitalización). WACC del 8,16 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %, cerca de la inflación británica esperada: el número de centros se estabiliza y crecen precio y gasto por visita. Implica 7,9 veces el EBITDA NIIF 16 de salida, en línea con la venta de Tenpin (≈ 7,9 veces en esa base [D6]) y por debajo de los 9-11 de los comparables. El valor terminal pesa el 74 %.',
  },
  puente_comentarios: {
    'FY2027e': 'Volumen del 6 %: 8 aperturas (95 → 103 centros) y las 4 de FY2026 todo el año, con partidas por centro planas tras el −5,6 % del verano de 2026; precio del 2 % (gasto por partida +7,6 % en el 1S26, más prudente) [A4, A3].',
    'FY2028e': 'Volumen del 5,5 % (aperturas de FY2027 todo el año y 5-6 nuevas) y precio del 2,5 %.',
    'FY2029e': 'Volumen del 3,5 % (4-5 aperturas al año hacia 130 en 2033) y precio del 2,5 %.',
    'FY2030e': 'Volumen del 3 % y precio del 2,5 %.',
    'FY2031e': 'Volumen del 2,5 % y precio del 2,5 %: converge con la inflación y un parque casi completo.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (5,9 % medio en FY2027e-FY2033e) está por debajo del histórico desde FY2022 (9,0 % anual) y lo explican las aperturas ya anunciadas (8 en FY2027, 130 centros en 2033) más un precio cerca de la inflación [A4, A8]. Se paga con el flujo operativo (sin deuda bancaria) y con alquileres nuevos que el DCF cuenta como inversión. El motor da «Sí». No hay cifra oficial del mercado final (mercado_final en null): no hay estadística del gasto en boleras del Reino Unido ni de Canadá; Savills cuenta más de 800 locales de ocio competitivo en el Reino Unido, +58 % desde 2018, camino de ≈ 1.100 [B1]. El riesgo no es que falte mercado sino que los centros nuevos canibalicen a los viejos y que el consumo británico deje las partidas en negativo, como en el 2S26: lo recoge el bajista.',
  dcf_lectura: 'El DCF da 3,87 GBP por acción, un 40,5 % sobre el precio, con un WACC del 8,16 % y un valor terminal que pesa el 74 %. El DCF inverso dice que el precio descuenta un crecimiento del 2,2 % anual con nuestro margen (o un margen del 31,8 % con nuestro crecimiento), frente al 5,9 % y el 36 % del caso base: el mercado no paga las aperturas. Con la prima de riesgo que hoy pide el mercado (4,2 %) vale 4,35 GBP. El bajista (crecimiento −2 puntos, margen −1,5 puntos y WACC +0,5) vale 2,29 GBP (−16,9 %). El valor intrínseco es alto; la regla a 12 meses, que mira el PER, no lo es.',
  narrativas: {
    Bajista: 'El consumo británico sigue flojo y las partidas por centro caen dos o tres años seguidos; el salario mínimo y las cotizaciones suben más que el precio y el margen se queda en el 34,5 %; las aperturas en Canadá tardan en madurar y algunas canibalizan centros viejos.',
    Base: 'Partidas planas y precio cerca de la inflación en los centros viejos; 8 aperturas en FY2027 y 4-6 al año después hasta 130 en 2033; margen EBITDA del 36 % (por debajo del 38-40 % de antes de los salarios de 2025-2026).',
    Alcista: 'El clima se normaliza y las partidas vuelven a crecer; Canadá acelera hacia 35 centros en 2032 y madura su margen; el precio dinámico y las máquinas recreativas suben el gasto por partida: 1,5 puntos más de crecimiento y 0,8 más de margen.',
  },
  escenarios_comentario: 'La asimetría es favorable en el valor intrínseco: el alcista vale 4,63 GBP (+68,1 %) y el bajista 2,29 (−16,9 %), 4 veces más de subida que de bajada. El valor ponderado de los escenarios (3,67 GBP) está un 33 % sobre el precio. El bajista no es una catástrofe porque no hay deuda bancaria y el flujo cubre la inversión de mantenimiento; lo que más mueve el valor es el margen (1 punto ≈ 0,26 GBP por acción).',
  casos_12m: {
    Bajista: 'Crecimiento del 6 % en FY2027e y FY2028e y margen del 34,3-34,5 % (consumo débil y salarios): BPA de 19,63 p en FY2028e (−13 % frente al base) y el PER vuelve a su mínimo de cinco años (8,8 veces, el de septiembre de 2022, con la crisis de energía y consumo).',
    Base: 'Ventas +8 % en FY2027e y FY2028e por aperturas, margen EBITDA del 36 %, amortización del 14,2 % (con deterioros), intereses de arrendamientos de 15,5 M, tipo del 25,5 % y 167,5 M de acciones sin recompras nuevas: BPA de 22,67 p (+7,5 % anual desde los 19,62 p de FY2026e).',
    Alcista: '1,5 puntos más de crecimiento y 0,8 más de margen (clima normal, Canadá madura): BPA de 24,62 p; el múltiplo sube a la mediana de los comparables (14,4 veces).',
  },
  diferencia_consenso: 'Nuestro BPA de FY2027e (20,68 p) queda un 15 % por debajo del consenso (24,42 p, 8 analistas) [D2]. Unos 2,9 p son de base: el consenso usa el BPA ajustado de la empresa, antes de la NIIF 16 (renta en lugar de amortización e intereses de los derechos de uso: 3,4 M de diferencia en FY2025) y sin los deterioros de centros (≈ 2-3 M al año) [A2, A3]. El resto (≈ 0,8 p) son ventas: el consenso espera 290,6 M en FY2027 (+11 %) y nosotros 282,5 M (+8 %). La diferencia con el objetivo medio de los analistas (389 p) es de múltiplo y de base: aplican ≈ 16 veces a su BPA ajustado; la regla común deja 13,0 veces sobre el nuestro.',
  objetivo_comentario: 'El objetivo a 12 meses (2,80 GBP, ponderado) queda un 1,6 % sobre el precio (+6,4 % con el dividendo del 5 %) y el valor intrínseco (3,81) un 38 %. El base (2,95 GBP, +12,1 % con dividendo) supone que nuestro BPA crece un 7,5 % anual hasta 22,67 p en FY2028e y que el PER baja de 13,2 a 13,0 veces (a mitad de camino hacia la mediana de 12,8); el bajista (1,73 GBP) es el PER de septiembre de 2022 (8,8 veces) sobre un BPA un 13 % menor, y es lo que hunde la ponderada. Para comprar haría falta un precio de 2,55 GBP (255 p, −7,4 %): la ponderada llegaría al 15 %. Para vender (ponderada ≤ −10 %), uno por encima de 3,26 GBP.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF es el método más fiable para un negocio estable, sin deuda bancaria y con aperturas de retorno conocido, pero depende del margen y del valor terminal (74 %). Los comparables pesan poco: no hay otra bolera cotizada en Europa, y el PER de los próximos 12 meses del motor aplica la mediana (14,4 veces) al BPA ajustado del consenso, más alto que el nuestro. Las transacciones no pesan: solo hay dos con múltiplo (Tenpin a ≈ 7,9 veces el EBITDA NIIF 16 y Main Event a ≈ 9 en US GAAP) y apuntan a 7,9-9 veces, por debajo del DCF. El valor objetivo de la síntesis es de 3,81 GBP (+38,3 %); el rango del DCF con ± 0,5 puntos (3,14-4,90) queda todo por encima del precio. El puente resta 235,1 M de arrendamientos (a marzo de 2026) y 4,96 M del pago variable de Teaquinn, y suma 13,5 M de caja neta (30-sep-2026) [A3, A4].',
  catalizadores: {
    items: [
      { fecha: '2026-12', evento: 'Resultados de FY2026 (fecha por confirmar) y comentario de FY2027', efecto: 'BAI ajustado frente a los 51,0 M del consenso; primeras semanas de FY2027 y dividendo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-01', evento: 'Junta de accionistas y dividendo final', efecto: 'Voto de remuneración; ex-dividendo de ≈ 9-10 p', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Nueva subida del salario mínimo y de los costes laborales', efecto: '≈ 1-2 M de coste al semestre si sube por encima de la inflación', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2027-05', evento: 'Resultados del 1S27', efecto: 'Comparables tras el verano de 2026 (base fácil en el 2S) y margen de las aperturas', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'FY2027', evento: '8 aperturas (Reino Unido y Canadá) hasta 103 centros', efecto: '+6 puntos de ventas; costes de apertura', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Continuo', evento: 'Recompras con el exceso de caja (15,2 M en FY2025 y 2,9 M en el 2S26)', efecto: '+1-3 % de BPA al año si se repiten', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Oferta de compra de un fondo (como Tenpin en 2023)', efecto: 'Prima sobre el precio; Trive pagó ≈ 7,9 veces el EBITDA NIIF 16 por Tenpin', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Gasto de ocio de las familias británicas: consumo débil, subidas de impuestos y empleo flojo; las partidas por centro bajaron en el 1S26 y los comparables del Reino Unido cayeron un 5,6 % en el 2S26', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −20 % (bajista)', mitigante: 'Ocio asequible (una partida cuesta menos que el cine con comida), precio dinámico, gasto por partida al alza (+7,6 % en el 1S26) y sin deuda bancaria [A3]', senal: 'Comparables del Reino Unido negativos en el 1S27, con la base fácil del verano de 2026' },
      { riesgo: 'Salario mínimo y cotizaciones del empleador: ≈ 1 M cada uno en el 1S26 y otra subida en abril de 2027', tipo: 'Costes', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −8 % (1 punto de margen ≈ 0,26 GBP por acción)', mitigante: 'El personal de los centros es solo el 20,8 % de las ventas (menos que la hostelería) y el 70 % de las ventas no tiene coste de mercancía [A3]', senal: 'Margen EBITDA NIIF 16 por debajo del 35 % en FY2027' },
      { riesgo: 'Costes de energía', tipo: 'Costes', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−2 a −4 % a partir de FY2030', mitigante: '76 % de la electricidad cubierta hasta FY2029, con un 12 % de placas solares propias [A3]', senal: 'Renovación de las coberturas para FY2030 a precios más altos' },
      { riesgo: 'Expansión en Canadá: aperturas de centros nuevos (35 en 2032 desde 15) con un margen menor (EBITDA del 26 % frente al 38 % del Reino Unido) y un mercado que conoce menos', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −6 %', mitigante: 'Aperturas recientes (Kanata, Creekside, Edmonton) por encima de lo previsto; comparables del 2S26 +2,7 %; nuevo consejero delegado de Canadá [A3, A4]', senal: 'Comparables de Canadá negativos o deterioros de centros canadienses' },
      { riesgo: 'Valoración: la regla a 12 meses no deja margen (ponderada del 6,4 %) porque el bajista usa el PER de 2022 (8,8 veces)', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−37 % en el bajista a 12 meses', mitigante: 'El valor intrínseco (3,81 GBP) y el DCF inverso (2,2 % de crecimiento descontado) dan colchón a largo plazo', senal: 'PER por debajo de 10 veces con el BPA estable' },
      { riesgo: 'Clima: veranos calurosos y largos restan visitas al ocio bajo techo', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −3 % por verano malo', mitigante: 'Afecta a un semestre; el invierno y la lluvia ayudan [A4]', senal: 'Otro verano récord en 2027' },
      { riesgo: 'Ventas de directivos y salida de Aberdeen (del 10 % a menos del 5 %)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Señal, no valor', mitigante: 'Ventas pequeñas (≈ 1,2 M GBP en 2026) y en parte para pagar impuestos del plan a largo plazo; entran BlackRock y Aberforth [C3, C4]', senal: 'Ventas del consejero delegado' },
      { riesgo: 'Riesgo de IA: ocio en casa más atractivo (juegos, contenidos generados por IA) y competencia por el tiempo libre', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±2 % a 3-5 años', mitigante: 'La bolera es una experiencia física y social que la IA no sustituye; la empresa ya usa IA en marketing y precios dinámicos [A3]', senal: 'Partidas por centro a la baja varios años con consumo normal' },
    ],
    premortem: 'Octubre de 2028: la acción ha caído un 35 %. El consumo británico no se recuperó: dos años de partidas en negativo en los centros viejos, mientras el salario mínimo subía un 4-5 % cada abril y las cotizaciones del empleador volvían a subir. El margen EBITDA bajó al 33 %, las aperturas de Canadá tardaron más en madurar y hubo deterioros de centros. El BPA se quedó en ≈ 19 p y el mercado volvió a pagar 9 veces, como en 2022. La señal la dieron los comparables del 1S27, negativos pese a la base fácil del verano de 2026.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±2 % a 3-5 años',
      comentario: 'La IA no sustituye lo que vende Hollywood Bowl: un rato de ocio físico y social (bolos, minigolf, comida y bebida, máquinas recreativas) en un local. Le ayuda a bajar costes y subir ventas: la empresa ya usa IA en el marketing (más conversión y reservas de mayor importe) y en el precio dinámico por hora y día [A3]. El riesgo, menor, es indirecto: un ocio en casa más atractivo (videojuegos, contenidos y compañía generados por IA) que compita por el tiempo libre de los jóvenes. No lo vemos en las cifras (el gasto por partida sube) y lo tratamos como neutral con un margen de ±2 % del valor.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Consumo y partidas', pregunta: '¿Cómo han ido las partidas (no el gasto) en los centros comparables del Reino Unido en octubre-noviembre de 2026, ya sin calor?', por_que: 'Separa el efecto del clima del de un consumidor británico más débil: es el bajista.' },
      { tema: 'Costes laborales', pregunta: '¿Cuánto suma la subida del salario mínimo y de las cotizaciones de abril de 2027 y cuánto se puede repercutir en precio?', por_que: 'Un punto de margen vale ≈ 0,26 GBP por acción.' },
      { tema: 'Canadá', pregunta: '¿Qué margen EBITDA tienen los centros abiertos desde cero en Canadá en su segundo y tercer año, frente al 26 % del segmento?', por_que: 'Decide si el objetivo de 35 centros en 2032 crea valor.' },
      { tema: 'Asignación de capital', pregunta: '¿Se mantendrán las recompras con 8 aperturas en FY2027 y la caja neta en 13,5 M?', por_que: 'Sin recompras el BPA crece solo con el beneficio.' },
      { tema: 'Energía', pregunta: '¿A qué precio está cubierta la electricidad hasta FY2029 y qué pasa en FY2030?', por_que: 'Es el coste que más subió en 2022-2023.' },
      { tema: 'Deterioros', pregunta: '¿Qué centros se deterioraron en el 1S26 (2,8 M) y hay más candidatos al cierre o traslado (Cardiff en FY2031)?', por_que: 'Los deterioros se repiten y restan ≈ 1 p de BPA al año.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 2,80 GBP (nuestro BPA de FY2028e × el PER de la regla común), un +6,4 % de rentabilidad ponderada con el dividendo y un +12,1 % en el caso base, frente a un precio de 2,755 GBP (275,5 p, cierre del 19-oct-2026). El valor intrínseco (3,81 GBP, +38 %) es alto, pero la regla a 12 meses no llega al 15 % porque el bajista usa el PER de 2022 (8,8 veces). La calidad tampoco llega: ROIC del 12,5 % frente a un WACC del 8,2 % (4,3 puntos, por debajo de 5). La convicción es media: las dos reglas de valor intrínseco dicen Comprar y la de 12 meses Mantener lejos de sus umbrales; subiría la convicción un margen de vuelta al 38 % con comparables positivos, y la bajaría otro semestre de partidas en caída.

**El negocio.** Mayor operador de boleras del Reino Unido y de Canadá: 95 centros con bolos, comida, bebida y máquinas recreativas, y minigolf. Ventas de 261,6 M en FY2026 (+4,3 %), margen EBITDA NIIF 16 del 36 % y sin deuda bancaria [A4, A2].

**Finanzas.** Ventas al 9 % anual desde FY2022, pero el BPA no crece (≈ 19-21 p en nuestra base desde FY2022) porque salarios, energía y amortizaciones de las aperturas se han comido el margen (del 40 % al 36 %) [A2]. Flujo libre de 34 M en los 12 meses a marzo de 2026 [A3]; dividendo del 5 %.

**Equipo y gobierno.** Stephen Burns dirige desde 2014-2016 y tiene ≈ 2 % del capital; presidente independiente y mayoría de independientes. Cambio de director financiero y de auditor en 2026, ordenados [C8, C6]. Debilidad: ventas de directivos en 2026 y ninguna compra relevante.

**Valoración.** El DCF da 3,87 GBP (+40,5 %) y el DCF inverso descuenta solo un 2,2 % de crecimiento anual frente al 5,9 % del base: el mercado no paga las aperturas. La regla a 12 meses lleva el PER de 13,2 a 13,0 veces y el bajista a 8,8. El consenso (8 de 8 compran, objetivo medio de 389 p) usa un BPA un 15 % mayor que el nuestro, sobre todo por la base pre-NIIF 16 [D2].

**Riesgos y catalizadores.** El mayor riesgo es el gasto de ocio de las familias británicas (comparables del 2S26 −5,6 %), seguido del salario mínimo y las cotizaciones (≈ 2 M al semestre), la expansión en Canadá y, ya cubierta hasta FY2029, la energía. El riesgo de IA es bajo. Catalizadores: resultados de FY2026 en diciembre y comparables del 1S27.

**Qué cambiaría la decisión.** Comprar por debajo de 2,55 GBP (255 p, −7,4 %) daría una ponderada del 15 %, pero la calidad seguiría fallando (ROIC − WACC de 4,3 puntos). Un margen de vuelta al 38 % o comparables positivos en el 1S27 subirían el BPA y el ROIC.`,
    tesis: 'Hollywood Bowl es el mayor operador de boleras del Reino Unido y Canadá, con un modelo de ocio asequible, margen bruto del 63 %, sin deuda bancaria y un plan de aperturas creíble (95 → 130 centros en 2033). El precio descuenta un crecimiento del 2,2 % anual: barato a largo plazo. Pero el BPA lleva cuatro años plano porque los costes laborales y la energía se han comido el margen, el consumo británico está débil y el ROIC (12,5 %) queda a 4,3 puntos del WACC. A 12 meses, sin mejora del margen, el PER no tiene por qué subir.',
    vision_diferencial: {
      mercado_descuenta: 'Que el consumo británico y los salarios dejan el beneficio plano durante años: el precio implica un 2,2 % de crecimiento anual; los analistas, en cambio, esperan ≈ 389 p (+41 %) con un BPA ajustado que crece un 9 % en FY2027.',
      nuestra_vision: 'A largo plazo el negocio vale más (3,81 GBP); a 12 meses coincidimos con el mercado en que el margen no se recupera solo y en que el BPA real (NIIF 16 con deterioros) es ≈ 20-23 p, no los 24 p del consenso.',
      por_que: 'Las aperturas añaden ventas pero también alquiler y amortización: con el margen en el 36 % el BPA crece ≈ 7 % al año, no un 9-10 %. La historia del PER (8,8-16,5 veces) deja un bajista profundo si el consumo empeora.',
    },
    a_favor: [
      '**Valor intrínseco alto**: DCF de 3,87 GBP (+40 %); el precio descuenta un 2,2 % de crecimiento.',
      '**Sin deuda bancaria**: caja neta de 13,5 M y flujo libre de ≈ 34 M al año.',
      '**Aperturas con retorno**: 8 en FY2027 y objetivo de 130 centros en 2033; Canadá crece un 9 %.',
      '**Costes cubiertos**: 76 % de la electricidad fijada hasta FY2029; personal de los centros del 21 % de las ventas.',
      '**Dividendo del 5 %** y recompras con el exceso de caja.',
    ],
    en_contra: [
      '**BPA plano desde FY2022**: el margen bajó del 40 % al 36 % por salarios y energía.',
      '**Consumo británico débil**: comparables del 2S26 −5,6 % y partidas a la baja ya en el 1S26.',
      '**Calidad justa**: ROIC del 12,5 % frente a un WACC del 8,2 % (4,3 puntos).',
      '**Bajista profundo a 12 meses**: PER de 8,8 veces en 2022; ponderada del 6,4 %.',
      '**Consenso alto**: el BPA de los analistas es un 15 % mayor que el nuestro por la base pre-NIIF 16.',
    ],
    que_vigilar: 'La tesis depende de que las partidas en los centros viejos dejen de caer cuando pase el efecto del calor y de que el margen se sostenga en el 36 % con la subida salarial de abril de 2027. La señal en contra sería un 1S27 con comparables del Reino Unido negativos pese a la base fácil, o un margen por debajo del 35 %; a favor, comparables positivos y Canadá con margen al alza.',
    cambiaria_recomendacion: [
      'Precio por debajo de 2,55 GBP (255 p): la regla a 12 meses daría Comprar (ponderada ≥ 15 %), aunque la calidad (ROIC − WACC < 5) seguiría fallando.',
      'Precio entre 2,55 y 3,26 GBP: Mantener según la regla; pero el filtro de mantener en cartera de las pruebas de robustez (ponderada ≥ 10 %) solo se cumple por debajo de 2,67 GBP: a 2,75 GBP no se compra ni se mantendría una posición.',
      'Margen EBITDA de vuelta al 38 % y comparables positivos en el 1S27: revisar el BPA y el ROIC al alza.',
      'Comparables del Reino Unido negativos en el 1S27 o margen por debajo del 35 %: revisar a la baja.',
      'Precio por encima de 3,26 GBP: Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas comparables del Reino Unido', nivel_actual: '−1,4 % (FY2026; 2S −5,6 %)', umbral_alerta: '< 0 % en el 1S27', por_que: 'Mide el gasto de ocio de las familias.' },
      { kpi: 'Margen EBITDA NIIF 16', nivel_actual: '36,4 % (FY2025)', umbral_alerta: '< 35 %', por_que: 'Recoge salarios y energía.' },
      { kpi: 'Gasto por partida (Reino Unido)', nivel_actual: '12,77 GBP (+7,6 %, 1S26)', umbral_alerta: '< +3 %', por_que: 'Sostiene las ventas cuando bajan las partidas.' },
      { kpi: 'Ventas comparables de Canadá', nivel_actual: '+1,5 % (FY2026; 2S +2,7 %)', umbral_alerta: '< 0 %', por_que: 'Valida la expansión.' },
      { kpi: 'BAI ajustado pre-NIIF 16', nivel_actual: 'Consenso 51,0 M (FY2026)', umbral_alerta: '< 48 M', por_que: 'Es la cifra que sigue el mercado.' },
    ],
  },
};
