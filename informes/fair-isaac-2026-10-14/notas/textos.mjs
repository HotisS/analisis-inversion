// Textos del analista (FICO, corte 2026-10-14). Citas con la letra de la nota; [P1] = fuente propia 1.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: EDGAR, la web de inversores de FICO, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados (8-K), del 10-K FY2025 y de los 10-Q de 2026, y de agregadores (MarketScreener, Kalkine, Macrotrends, Barchart) con la URL como fuente; lo que no cuadró está en null y en los huecos, y la confianza es menor que en un análisis normal. Cuentas en millones de USD, US GAAP, ejercicio a 30 de septiembre etiquetado por el año en que termina (FY2025 = octubre 2024-septiembre 2025). El FY2026 ya cerró pero no se publicará hasta principios de noviembre: va como primer año de la proyección, fijo en la guía de julio. **Precio**: no se encontró el cierre del 13-oct; se usa 728,80 USD, estimación propia del cierre del 12-oct (cierre del 9-oct, 667,58 USD, por la subida del 12-oct, +9,17 %) [D1, D2]. El PER histórico usa el cierre de diciembre (tres meses después del cierre del ejercicio) porque no se encontraron los de septiembre. El EBITDA de los últimos 12 meses (1.237 M) es estimación propia a partir del beneficio neto de los cuatro trimestres (815,1 M), un tipo del 21 % y unos intereses de ≈190 M [A2-A5]. Comparables reutilizados de los informes de Equifax (8-oct) y Experian (14-oct) [D10].',

  controles_explicados: [
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (789,87 USD) queda un 27 % por debajo del objetivo medio de los cuatro analistas que han publicado tras el 29-sep (1.081,25 USD). No es por el BPA de este año, sino porque nuestro FY2027e baja el precio hipotecario y porque la regla común usa el PER actual (22,6x). Ver diferencia_consenso.' },
    { control: 'Fuentes sin citar', explicacion: 'Las fuentes sin citar son documentos leídos de contexto (comunicados trimestrales, agregadores que confirman las mismas cifras); se dejan para trazabilidad.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    historia: {
      resumen: 'Fundada en 1956 por Bill Fair y Earl Isaac como consultora de estadística, creó en 1958 el primer sistema de puntuación de crédito y en 1989 la puntuación FICO general, que Fannie Mae y Freddie Mac exigieron en 1995 para las hipotecas. Durante dos décadas fue sobre todo una empresa de software de decisión. Con Will Lansing (desde 2012) cambió de modelo: vendió negocios menores, concentró el software en la plataforma y, desde 2018, subió el precio de la puntuación, que era casi simbólico, mientras recompraba más de un tercio de sus acciones con deuda. En 2025-2026 el regulador hipotecario abrió la puerta a VantageScore y la acción cayó desde 2.100 USD a menos de 700 [A1, B3, B5].',
      hitos: [
        { anio: '1956', hito: 'Fundación por Bill Fair y Earl Isaac' },
        { anio: '1989', hito: 'Lanza la puntuación FICO general' },
        { anio: '1995', hito: 'Fannie Mae y Freddie Mac exigen la puntuación FICO en las hipotecas' },
        { anio: '2012', hito: 'Will Lansing, consejero delegado' },
        { anio: '2021', hito: 'Venta de líneas de producto no estratégicas (plusvalía en el FY2021)' },
        { anio: '2022-2026', hito: 'Subidas de la puntuación hipotecaria de ≈0,60 USD a 4,95 USD [A5]' },
        { anio: '2025', hito: 'La FHFA acepta VantageScore 4.0 (jul.) y FICO lanza la licencia directa a revendedores (oct.) [B5]' },
        { anio: '2026', hito: 'VantageScore para todos los prestamistas (4-sep) y tabla de precios única (29-sep); la acción cae un 27 % en un día [B3, B4]' },
      ],
      confianza: 'Media',
    },
    financieros: {
      comentario: 'Los ingresos pasaron de 1.316,5 M USD en el FY2021 a 1.990,9 M en el FY2025 (+10,9 % anual) y el BPA GAAP de 13,40 a 26,54 USD, casi el doble por la recompra de acciones (de 29,3 a 24,6 M diluidas) [A1, A8, A10]. El motor es el precio de Scores: el margen EBIT pasó del 39,4 % del FY2022 al 46,5 % del FY2025. El FY2026 acelera: +16 % en el 1T, +39 % en el 2T y +26 % en el 3T, y la guía (2.530 M de ingresos y BPA GAAP de 36,86 USD) supone un +27 % [A3-A5]. El FY2021 no es comparable: su beneficio incluye la plusvalía de la venta de líneas de producto (≈100 M USD, fuera del EBIT) [A8, A9].',
      ajustes: 'Usamos cifras GAAP. La dirección publica un BPA no GAAP que excluye la remuneración en acciones (≈150-170 M USD al año), la amortización de intangibles y partidas no recurrentes: 29,88 USD en el FY2025 frente a 26,54 GAAP, y una guía de 42,43 frente a 36,86 en el FY2026 [A2, A5]. El consenso que se cita se acerca más a la base no GAAP; nuestro BPA y el PER histórico son GAAP, para que la regla de múltiplos compare lo mismo. El recorte del 15 % de la plantilla de octubre de 2026 (≈27 M de indemnizaciones) caerá en el FY2027 [C4].',
    },
    trimestres: {
      ultima_presentacion: 'En la llamada del 3T FY26 (29-jul-2026) Will Lansing insistió en tres ideas: la licencia directa hipotecaria está lista y espera la certificación de una de las GSE, con acuerdos que cubren ≈60 % del volumen y dos grandes revendedores más a punto de firmar; los prestamistas que usan VantageScore junto a FICO no han reducido el volumen de puntuaciones FICO («score shopping»); y FICO 10T, con 70 prestamistas adheridos, acabará entrando en el mercado hipotecario [A13]. Los analistas preguntaron sobre todo por la pérdida de cuota posible y por la dependencia del precio hipotecario; una transcripción resumida recoge un techo de «juego» de puntuaciones del orden del 20 % [A13]. La acción cayó un 17 % ese día porque los ingresos quedaron por debajo del consenso pese a la subida de la guía [D8]. Desde entonces la FHFA ha ido más lejos (tabla de precios única, 29-sep): la dirección no ha hablado aún en público de su efecto; lo hará en los resultados del 4T, a principios de noviembre.',
    },
    balance: {
      otros_pasivos: 'La deuda bruta subió de 3.056 M USD (sep-2025) a 5.610 M (jun-2026): 710 M de la línea de crédito, 1.500 M de un préstamo a plazo tomado el 5-jun-2026 para la recompra acelerada (vence en mayo de 2028, con amortizaciones de 75 M por trimestre hasta jun-2027 y 112,5 M después) y 3.400 M en bonos (2019, 2021, 2025 y 2026) [A6]. El patrimonio es negativo (−4.100 M) por las recompras (autocartera a coste de 10.280 M) [A6]. Quedan 300 M de la recompra acelerada pagados por adelantado y sin acciones entregadas: van en el puente como activo [A6]. No hay pensiones relevantes ni arrendamientos financieros; los operativos están en el EBITDA (US GAAP).',
      comentario: 'Con un EBITDA de ≈1.240 M en los últimos 12 meses (estimación propia), la deuda neta de ≈5.360 M equivale a 4,3 veces: el doble que hace un año y por encima de lo habitual en la empresa (≈3 veces). El circulante es solo clientes (≈27 % de las ventas, por la facturación trimestral a las agencias). El vencimiento cercano es el préstamo a plazo; la caja libre (≈1.000 M al año) basta para atenderlo si no se recompra más [A5, A6].',
    },
    flujos: {
      comentario: 'La conversión de beneficio en caja es alta y regular: flujo operativo de 778,8 M USD en el FY2025 frente a 651,9 M de beneficio, y un capex de solo 39,4 M (2 % de las ventas) [A2, A11]. En el 3T FY26 la caja libre fue de 370,3 M en un trimestre [A5]. Toda la caja y más se va a recompras: 1.410 M en el FY2025 y 3.100 M en los nueve primeros meses del FY2026 (1.500 M con la recompra acelerada), financiados con deuda [A6]. No hay dividendo. Casi todo el capex es de mantenimiento y de desarrollo de la plataforma.',
    },
    calidad: {
      comentario: 'Deloitte audita las cuentas con opinión favorable [A1]. Las señales de calidad son buenas en lo operativo: caja por encima del beneficio, capex mínimo, sin compras relevantes ni deterioros. Lo que distorsiona es el capital: el patrimonio negativo hace que el ROE y el apalancamiento no tengan sentido y que el capital invertido sea pequeño (≈1.100 M), de ahí un ROIC del 66 %. Los indicadores del motor (Altman Z ≈5,3, Piotroski 6 y Beneish −2,7) no dan alarma, pero se calculan con un balance incompleto (sin activo y pasivo corriente). La remuneración en acciones (≈8 % de las ventas) es el gasto que más separa el BPA no GAAP del GAAP [A2].',
      senales: [
        { senal: 'Patrimonio negativo y deuda en máximos', nivel: 'Media', comentario: 'Deuda bruta 5.610 M y patrimonio −4.100 M por recompras [A6].' },
        { senal: 'Remuneración en acciones elevada', nivel: 'Baja', comentario: 'Diferencia de ≈3-5 USD por acción entre BPA GAAP y no GAAP [A2, A5].' },
      ],
    },
    capital: {
      politica: 'Sin dividendo. Toda la caja libre, y desde 2025 bastante deuda, va a recomprar acciones: el programa de junio de 2026 autoriza 2.000 M USD (800 M pendientes a 30-jun, incluidos los 300 M de la recompra acelerada aún sin entregar) [A6]. La empresa no hace adquisiciones relevantes.',
      adquisiciones: [],
      comentario: 'La dirección ha sido una asignadora de capital excelente mientras la acción subía por el precio de Scores: el número de acciones diluidas bajó de 29,3 M (FY2021) a 24,6 M (FY2025) y a ≈21,6 M hoy, un 26 % menos [A6, A8]. Pero la última recompra acelerada (1.500 M con deuda en junio de 2026, a ≈1.100-1.300 USD por acción) se hizo a casi el doble del precio actual, justo antes de que el regulador atacara el precio hipotecario: destruyó valor y dejó la deuda en 4,3 veces el EBITDA. El ROIC incremental histórico (36 % según el motor) no dice mucho con un capital invertido tan pequeño.',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'Equipo estable: Lansing lleva catorce años y ha creado mucho valor con la estrategia de precio y recompra; esa misma estrategia es la que ha provocado la reacción del regulador. No hay sucesión anunciada. La guía se ha cumplido o superado en los dos últimos ejercicios [A2, A5]. El enfrentamiento abierto con el director de la FHFA es un riesgo de gestión: la empresa depende de una decisión política [B3].',
    },
    gobierno: {
      remuneracion: 'No se pudo leer el proxy de 2026 en este entorno: ni la remuneración del consejero delegado ni el resultado del voto consultivo de la junta del 4-mar-2026 están en este informe [C1].',
      control_y_defensas: 'Sin accionista de control: capital disperso entre fondos institucionales, una acción un voto [C1]. Los directivos venden con regularidad tras ejercer opciones (Lansing, 1.069 acciones en octubre de 2025; Manolis, 967 acciones a 1.400 USD en julio de 2026), sin compras en mercado tras la caída [C2, C3].',
    },
    rentabilidad: null,
    consenso: {
      revisiones: 'Recortes fuertes en dos oleadas. Tras el 3T (29-jul) el objetivo medio de MarketBeat era de 1.627,93 USD con 15 analistas (10 comprar, 5 mantener) [D7]. Tras la tabla única de la FHFA (29-sep), BofA bajó a neutral y recortó el objetivo de 1.400 a 700 USD, Wells Fargo a 950, BMO a 1.150 y RBC lo dejó en 1.525 [D4, D5, D6]: la media de esos cuatro es 1.081,25 USD. El BPA del FY2026 (37,37 USD en la última referencia) apenas se mueve porque el ejercicio ya cerró; el del FY2027 (42,15 antes del 3T) no se ha publicado de nuevo y es el que debería caer [D8].',
    },
    multiplos_historicos: {
      comentario: 'FICO cotizó entre 42 y 69 veces el beneficio GAAP de 2019 a 2025 (97 veces en diciembre de 2024): el mercado pagaba un crecimiento del BPA del 20-25 % anual sostenido por subidas de precio sin límite. Hoy cotiza a 22,6 veces nuestro BPA del FY2027e, en línea con las plataformas de datos (mediana de comparables, 20,9 veces) [D9, D10]. El cambio es estructural: con el regulador fijando la competencia en hipotecas, el precio ya no puede subir como antes y el múltiplo histórico no sirve de ancla para el alcista.',
    },
    comparables: {
      criterio: 'Siete cotizadas de datos y analítica de riesgo, las mismas de los informes de Equifax y Experian [D10]: los tres burós (Experian, Equifax, TransUnion), que distribuyen la puntuación FICO y son dueños de VantageScore, y las plataformas de datos con ingresos recurrentes y márgenes altos (Verisk, Moody\'s, S&P Global, MSCI), que marcan el techo del múltiplo. Se retira First Advantage (sin PER). No hay otro vendedor cotizado de puntuaciones.',
      comentario: 'FICO cotiza a 16,8 veces el EBITDA de los últimos 12 meses y 17,3 veces el PER del consenso a 12 meses, frente a medianas de 15,5 y 20,9 veces: ya no tiene prima pese a márgenes (≈52 % EBITDA) y ROIC (66 %) muy superiores. El mercado la valora como un buró, no como un peaje. Por PER del consenso valdría 880,94 USD, pero ese BPA aún no recoge la bajada de precio hipotecario; por EV/EBITDA, 656,19 USD, por la deuda (4,3 veces el EBITDA).',
    },
    sentimiento: {
      lectura: 'El sentimiento es dividido y empeora: los particulares y blogs alcistas ven una oportunidad («el foso sigue, cotiza a 14-20 veces»), y los bajistas un cambio estructural porque las agencias que distribuyen FICO son dueñas de su competidor [E1-E4]. No hay euforia ni capitulación: el rebote del 12-oct se lee como cierre de cortos [E5]. Lo que aporta a la decisión es que nadie, ni foros ni analistas, cuantifica cuánto bajará el precio hipotecario: esa es la cifra que decide la tesis y la sabremos con la guía del FY2027. Ningún dato del informe sale de los foros.',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material es la protección del consumidor y la equidad en el crédito: la puntuación decide el acceso a hipotecas y tarjetas, y el precio que cobra FICO lo paga al final el prestatario (de ahí la intervención de la FHFA) [B3]. La seguridad de los datos importa menos que en las agencias porque FICO no guarda los historiales.',
      controversias: 'Enfrentamiento público con la FHFA por el precio de la puntuación hipotecaria (2025-2026) [B3, B4]. No se encontraron sanciones recientes en la búsqueda.',
      confianza: 'Baja',
    },
    catalizadores: {
      items: [
        { fecha: 'Principios de nov-2026', evento: 'Resultados del 4T FY2026 y guía del FY2027', efecto: 'Primera cifra del precio hipotecario tras la tabla única; decide si el base (−4 % de ingresos) es prudente o optimista', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2027 (sin fecha)', evento: 'Entrada en vigor de la tabla de precios única de la FHFA', efecto: 'Iguala FICO y VantageScore ante el prestamista; presión de precio', probabilidad: 'Alta', sentido: '−' },
        { fecha: 'FY2027', evento: 'Certificación de la licencia directa hipotecaria por una GSE', efecto: 'Cobro por préstamo cerrado (33 USD) sin pasar por las agencias', probabilidad: 'Media', sentido: '+' },
        { fecha: 'FY2027', evento: 'Aprobación operativa de FICO 10T por las GSE', efecto: 'Argumento técnico frente a VantageScore', probabilidad: 'Baja', sentido: '+' },
        { fecha: 'Trimestral', evento: 'Amortizaciones del préstamo a plazo (75 M por trimestre)', efecto: 'Menos caja para recompras', probabilidad: 'Alta', sentido: '−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Bajada fuerte del precio hipotecario por la tabla única de la FHFA', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−40 % (escenario bajista)', mitigante: 'Fuera de la hipoteca no hay regulador que imponga VantageScore', senal: 'Precio por puntuación y volumen hipotecario en la guía del FY2027' },
        { riesgo: 'Pérdida de cuota frente a VantageScore en hipotecas', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 %', mitigante: 'Integración en titulizaciones y modelos de los inversores', senal: 'Porcentaje de préstamos de las GSE con VantageScore (>9 % en el piloto) [B6]' },
        { riesgo: 'Deuda alta con ingresos a la baja', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Caja libre de ≈1.000 M al año y sin dividendo', senal: 'Deuda neta / EBITDA por encima de 4,5 veces' },
        { riesgo: 'Las agencias empujan VantageScore fuera de la hipoteca', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Licencia directa y marca ante el consumidor', senal: 'Crecimiento del B2B no hipotecario' },
        { riesgo: 'Ciclo hipotecario (tipos altos)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Una bajada de tipos sumaría volumen', senal: 'Solicitudes de hipoteca (MBA)' },
        { riesgo: 'Software sin crecimiento', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Plataforma +16 % en ARR', senal: 'ARR total por debajo del +3 %' },
      ],
      premortem: 'Es octubre de 2029 y la acción ha perdido un 40 %, hasta ≈440 USD. La tabla única entró en vigor en la primavera de 2027 y los grandes originadores (Rocket primero, luego los bancos) pasaron a pedir VantageScore, diez veces más barata. FICO respondió bajando el precio hipotecario a la mitad para no perder volumen: los ingresos de Scores cayeron un 15 % en el FY2027 y el margen EBITDA bajó al 45 %. Con la deuda en 5.600 M y el préstamo a plazo venciendo en 2028, dejó de recomprar acciones; el BPA se estancó en 25-28 USD y el mercado, que ya no veía crecimiento, la pagó a 16-18 veces, como a un buró. La señal que lo habría anticipado: la guía del FY2027 de noviembre de 2026 con ingresos de Scores a la baja y el porcentaje de préstamos con VantageScore en los informes de las GSE.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Precio hipotecario', pregunta: '¿Qué precio por puntuación y por préstamo cerrado espera cobrar en el FY2027 con la tabla única?', por_que: 'Es la variable que separa el bajista del base.' },
        { tema: 'Peso de la hipoteca', pregunta: '¿Qué parte de los ingresos de Scores viene de la originación hipotecaria?', por_que: 'No lo publica y define la exposición.' },
        { tema: 'Licencia directa', pregunta: '¿Qué falta para la certificación de la GSE y qué parte del volumen pasará por ella?', por_que: 'Cambia quién captura el margen.' },
        { tema: 'Deuda', pregunta: '¿Mantendrán las recompras con deuda a 4,3 veces el EBITDA?', por_que: 'La última recompra acelerada se hizo al doble del precio actual.' },
        { tema: 'Fuera de la hipoteca', pregunta: '¿Hay señales de VantageScore en tarjetas y automóvil?', por_que: 'Sería el riesgo de segundo orden.' },
        { tema: 'Software', pregunta: '¿Cuándo compensará la plataforma la caída del resto del software?', por_que: 'Sin crecimiento del software, todo depende de Scores.' },
      ],
      confianza: 'Media',
    },
  },

  rentabilidad_comentario: 'FICO crea mucho valor: el ROIC del FY2025 es del 66,1 % frente a un WACC del 10,29 %, unos 56 puntos de diferencia, y ha estado por encima del 50 % en los tres últimos ejercicios. La causa es el margen (EBIT del 46,5 % en el FY2025) más que la rotación, y el capital invertido es mínimo (≈1.100 M) porque el negocio no necesita activos. El ROE no tiene sentido con un patrimonio de −4.100 M. Frente a los burós (ROIC del 7-18 %) y las plataformas de datos (11-40 %), FICO está arriba [D10]. El riesgo no es de rentabilidad sobre el capital sino de precio: el ROIC alto depende de una tarifa que ahora el regulador presiona.',

  dcf_justificacion: {
    crecimiento: 'FY2026e fijo en la guía (2.530 M, +27,1 %), porque el ejercicio ya cerró [A5]. FY2027e −4 %: el precio hipotecario baja con la tabla única de la FHFA (−6 puntos de precio, estimación propia: un recorte de ≈25-30 % en la puntuación hipotecaria, que pesa en torno a un tercio de los ingresos), y lo compensan en parte el volumen y el software. FY2028e +4 % y FY2029-30e +7 %: vuelve el crecimiento por volumen y precio fuera de la hipoteca (tarjetas, automóvil) y por la plataforma. Después converge al 4 % en el FY2035e. El crecimiento medio (4,3 % en los años no fijos) es la mitad del histórico (+10,9 % anual en FY2021-25) [A8].',
    margenes: 'Margen EBITDA del 52 % en el FY2026e (estimación propia desde la guía de BPA GAAP), 50 % en el FY2027e por la bajada de un precio que es casi todo margen, compensada en parte por el recorte del 15 % de la plantilla [C4], y 51-52 % después. El histórico pasó del 41 % del FY2022 al 47 % del FY2025.',
    inversion: 'Capex del 1,2 % de las ventas (2 % en el FY2025 [A11]) y amortización del 0,8 %; circulante del 26 % de las ventas (clientes, 26,6 % en el FY2025). La reinversión es mínima: el negocio crece sin capital.',
    wacc: 'Tasa libre del 5,22 % (bono de EE. UU. a 10 años, FRED DGS10) [D11]; beta de 1,2 (la acción ha caído un 65 % desde el máximo y se mueve con cada noticia regulatoria; sin bolsa.mjs no se pudo medir); prima de mercado del 5,5 % y 0,5 puntos adicionales por el riesgo regulatorio; coste de la deuda del 5,4 % y peso del 25 % (deuda neta de ≈5.360 M frente a una capitalización de 15.742 M). WACC del 10,29 %.',
    terminal: 'Gordon con un 3 % (2 % real más 1 % de inflación, por debajo de la tasa libre menos medio punto). La media con un múltiplo de salida de 14 veces el EBITDA daría un valor parecido.',
  },
  puente_comentarios: {
    'FY2026e': 'Guía: casi todo precio de la puntuación hipotecaria (B2B de Scores +49 % en el 3T por el precio unitario) [A5].',
    'FY2027e': 'Estimación propia: el precio hipotecario baja un 25-30 % con la tabla única; volumen y software suman 2 puntos.',
    'FY2028e': 'Precio estable en hipoteca y +3-4 % fuera; volumen moderado por tipos altos.',
    'FY2029e': 'Recuperación del volumen hipotecario y subidas de precio fuera de la hipoteca, como en 2019-2021.',
    'FY2030e': 'Igual que el FY2029e; la plataforma de software crece por encima del 10 %.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'Las pruebas de reinversión y de cuota no fallan: la proyección casi no necesita capital (reinversión del 2 % del NOPAT, ROIC del 66 %) y suponemos que FICO **no gana** cuota (la cuota del 90 % se mantiene o baja, prueba a mano porque el mercado no tiene tamaño publicado). El problema es la prueba que queda en un negocio de activos ligeros, el **poder de precios**: el 80 % del crecimiento de 2022-2026 fue precio, y el regulador acaba de quitar la ventaja que lo sostenía en hipotecas. Por eso el base ya recorta el precio en el FY2027e y crece al 4,3 % medio, la mitad que en la historia. El veredicto es «En parte»: la calidad sostiene el crecimiento fuera de la hipoteca, no el de los últimos años.',
  dcf_lectura: 'El DCF da 463,42 USD por acción, un 36,4 % por debajo del precio, con el 55 % del valor en el terminal. El DCF inverso dice que el precio de 728,80 USD descuenta un crecimiento medio del 9,5 % anual en FY2027-35 con nuestros márgenes (o un margen EBITDA del 70,7 % con nuestro crecimiento), frente al 4,3 % de nuestro base: el mercado sigue pagando la historia de subidas de precio, aunque a la mitad del múltiplo de hace un año. Con la prima de riesgo que hoy pide el mercado (4,2 %, WACC del 9,1 %), el DCF sube a 597,83 USD, aún por debajo del precio. La rentabilidad implícita en el precio es del 8,3 % anual, menos que el WACC (10,3 %) y que la que pide el mercado (9,1 %). Es exigente: para justificar el precio hace falta que la bajada del precio hipotecario sea pequeña y temporal.',
  narrativas: {
    Bajista: 'La tabla única entra en vigor en 2027 y los originadores pasan a VantageScore o fuerzan a FICO a bajar el precio hipotecario a la mitad: los ingresos caen ≈16 % en el FY2027e y el margen EBITDA baja al 44 %. Es lo que pasó con la cuota de las agencias cuando FICO lanzó la licencia directa: el que controla el estándar fija el precio.',
    Base: 'El precio hipotecario baja un 25-30 % y FICO conserva casi todo el volumen; los ingresos caen un 4 % en el FY2027e y vuelven a crecer al 4-7 % con tarjetas, automóvil y la plataforma de software.',
    Alcista: 'La FHFA retrasa la tabla única, los prestamistas siguen con FICO y la licencia directa entra en vigor: ingresos +2 % en el FY2027e y margen del 52-54 %.',
  },
  escenarios_comentario: 'La asimetría es negativa a largo plazo: incluso el alcista (598,39 USD) queda un 17,9 % por debajo del precio con nuestro WACC, y el bajista (280,64) pierde un 61,5 %. A 12 meses, con la regla de múltiplos, el reparto es más equilibrado (478,08 / 789,87 / 1.190,70 USD) porque el PER actual (22,6x) es ya bajo frente a la historia. El bajista tiene una probabilidad alta (30 %) porque el regulador ya ha actuado tres veces en 15 meses.',
  j12: {
    Bajista: 'Ingresos de 2.189 M USD en el FY2028e (−16 % en el FY2027e por una bajada de precio hipotecario a la mitad) con un margen EBITDA del 46 %: EBIT de 989 M, 300 M de intereses, impuesto del 22 % y 21,6 M de acciones (24,90 USD).',
    Base: 'Ingresos de 2.526 M USD (−4 % en el FY2027e y +4 % en el FY2028e) y margen EBITDA del 51 %: EBIT de 1.268 M, 300 M de intereses (5.610 M de deuda al 5,4 %), impuesto del 22 % y 21,6 M de acciones, sin recompras no anunciadas (34,95 USD).',
    Alcista: 'Ingresos de 2.723 M USD (+2 % y +5,5 %) y margen del 53 %: EBIT de 1.421 M, 300 M de intereses, impuesto del 22 % y 21,6 M de acciones (40,50 USD).',
  },
  diferencia_consenso: 'Nuestro BPA GAAP del FY2027e (32,3 USD) queda un 23 % por debajo del consenso anterior al 3T (42,15 USD, más cerca de la base no GAAP) por tres razones: la base contable (≈4-5 USD de remuneración en acciones y amortización), la bajada del precio hipotecario que el consenso aún no ha incorporado, y más intereses por la deuda de la recompra acelerada. Nuestro precio base (789,87 USD) queda un 27 % por debajo del objetivo medio de los cuatro analistas que han publicado tras el 29-sep (1.081,25 USD): además del BPA, ellos suponen 25-30 veces el beneficio y la regla común usa el PER actual (22,6x). No acercamos la cifra.',
  objetivo12m_comentario: 'El objetivo a 12 meses (776,50 USD, +6,5 %) queda un 38 % por encima del valor intrínseco (560,84 USD): el mercado puede seguir pagando 20-23 veces el beneficio durante un año mientras no se conozca el nuevo precio hipotecario, pero los flujos descontados con un crecimiento medio del 4,3 % no justifican ese múltiplo. Lo que cerraría la distancia hacia abajo es la guía del FY2027 de noviembre, si confirma una bajada de ingresos de Scores; hacia arriba, un retraso de la tabla única.',
  valoracion_comentario: 'El DCF pesa el 50 % porque el negocio es estable y casi sin inversión, y su valor depende sobre todo del precio de la puntuación, que el DCF recoge explícitamente. Los comparables pesan el 25 %, pero su PER del consenso (880,94 USD) aún no recoge la bajada de precio, y su EV/EBITDA (656,19) penaliza la deuda. Los escenarios ponderados (435,58) pesan el 25 %. El resultado, 560,84 USD, queda un 23 % por debajo del precio; con la prima del mercado, 659,86 USD (−9,5 %). La dispersión es grande (de 280 a 1.022 USD) y refleja una sola pregunta: cuánto cobrará FICO por la puntuación hipotecaria.',

  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: '**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 776,50 USD (+6,5 % ponderado; +8,4 % en el caso base), frente a un precio de 728,80 USD, y el valor intrínseco, 560,84 USD, queda un 23,0 % por debajo. El objetivo medio de los cuatro analistas que han publicado tras el 29-sep (1.081,25 USD) está por encima de nuestro alcista ponderado y lejos de nuestro base [D4-D6]. La razón principal: el precio ya ha caído un 61 % desde el máximo, pero el mercado sigue descontando un crecimiento del 9,5 % anual cuando el regulador acaba de quitar a FICO la palanca que lo producía. La convicción es media porque la cifra que decide (el precio hipotecario del FY2027) se conocerá a principios de noviembre: una guía con ingresos de Scores a la baja la subiría hacia Vender; un retraso de la tabla única, hacia Comprar.\n\n**El negocio.** FICO cobra un peaje casi sin coste por cada puntuación de crédito: margen EBITDA del 47 % en el FY2025, ROIC del 66,1 % frente a un WACC del 10,29 % (≈56 puntos) y una cuota del 90 % [A1, B6]. Pero el 80 % del crecimiento de 2022-2026 fue precio hipotecario (de ≈0,60 a 4,95 USD por puntuación), y la FHFA ha aceptado VantageScore para todos los prestamistas (4-sep) y anunciado una tabla de precios única (29-sep) [B3, B4]. **Sostenibilidad: «En parte»**: la calidad sostiene el crecimiento fuera de la hipoteca, pero no el poder de precios en hipotecas, por lo que el base ya baja los ingresos un 4 % en el FY2027e.\n\n**Finanzas.** Los ingresos crecerán un 27 % en el FY2026 (guía de 2.530 M y BPA GAAP de 36,86 USD) [A5], con una caja libre de ≈1.000 M al año. La deuda bruta subió a 5.610 M (4,3 veces el EBITDA) por una recompra acelerada de 1.500 M hecha en junio a casi el doble del precio actual, y el patrimonio es de −4.100 M [A6].\n\n**Equipo y gobierno.** Lansing lleva 14 años y ha cumplido la guía, pero su estrategia de precio y recompra con deuda es la que ha provocado al regulador; los directivos venden, nadie compra tras la caída [C2, C3].\n\n**Valoración.** El DCF da 463,42 USD con nuestro WACC y 597,83 USD con la prima implícita del mercado; los comparables, 880,94 USD por PER del consenso (que aún no recoge la bajada de precio) y 656,19 por EV/EBITDA. FICO cotiza a 22,6 veces nuestro BPA del FY2027e, frente a 42-69 veces en 2019-2025: el múltiplo ya se ha ajustado; lo que no se ha ajustado es el beneficio esperado. A 12 meses, la regla común da 478,08 / 789,87 / 1.190,70 USD en bajista, base y alcista.\n\n**Riesgos y catalizadores.** El mayor riesgo es una bajada del precio hipotecario a la mitad (bajista: −61,5 % en valor intrínseco y 478,08 USD a 12 meses); después, la pérdida de cuota frente a VantageScore y la deuda. Catalizadores: resultados del 4T y guía del FY2027 (principios de noviembre), fecha de la tabla única y certificación de la licencia directa. Los foros están divididos: nadie cuantifica la bajada de precio [E1-E4].\n\n**Qué cambiaría la decisión.** Compraríamos por debajo de 560,84 USD (cumpliría los requisitos a 12 meses y el valor real) y venderíamos por encima de 862,78 USD. Pasaríamos a Vender si la guía del FY2027 implica ingresos de Scores un 10 % más bajos o si las GSE fijan la entrada en vigor de la tabla única antes de mediados de 2027; a Comprar si la FHFA la aplaza o la licencia directa se certifica con el precio actual.',
    tesis: 'FICO es el estándar de la puntuación de crédito en EE. UU.: más del 90 % de las decisiones, un margen EBITDA del 47-52 % y un ROIC del 66 % sin apenas capital [A1, B6]. Entre 2022 y 2026 multiplicó por ocho el precio de la puntuación hipotecaria y eso llevó los ingresos de 1.377 a 2.530 M USD y la acción a 2.100 USD.\n\nEl precio de hoy, 728,80 USD, descuenta en el DCF inverso un crecimiento del 9,5 % anual durante nueve años con nuestros márgenes, o 22,6 veces nuestro BPA del FY2027e. Es menos que la historia, pero sigue suponiendo que el precio hipotecario se mantiene.\n\nEl mercado se equivoca a nuestro juicio en la dirección del beneficio, no en el múltiplo: la FHFA ha actuado tres veces en 15 meses contra el precio de FICO [B3-B5], y la tabla única quita al prestamista cualquier motivo de coste para quedarse con FICO. Para invertir hay que creer que la integración de FICO en titulizaciones y modelos frena la sustitución y que la bajada de precio será pequeña. Lo sabremos en noviembre.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento del 9,5 % anual y 22,6 veces el beneficio: una bajada de precio hipotecario moderada y temporal, con FICO conservando el volumen y volviendo a subir precios fuera de la hipoteca.',
      nuestra_vision: 'El precio hipotecario baja un 25-30 % en el FY2027 y no se recupera: ingresos −4 % ese año y crecimiento medio del 4,3 % después, con margen del 50-52 %. Vale 560,84 USD a largo plazo; a 12 meses, 776,50 USD porque el mercado tardará en ver el beneficio más bajo.',
      por_que: 'El regulador ha demostrado que actuará (tres decisiones en 15 meses), el competidor cobra diez veces menos y es propiedad de los distribuidores de FICO. La propia dirección ha usado el precio como única palanca; el software no compensa (+2 % en el 3T) [A5].',
    },
    a_favor: [
      '**Peaje casi sin coste**: margen EBITDA del 47 % en el FY2025 y ROIC del 66,1 % [A1].',
      '**Cuota del 90 %** y estándar en tarjetas, automóvil y titulizaciones [B6].',
      '**Caja libre de ≈1.000 M USD al año** con capex del 2 % de las ventas [A2, A5].',
      '**Múltiplo ya ajustado**: 22,6 veces nuestro BPA, frente a 42-69 veces en 2019-2025.',
      '**Licencia directa** lista, con acuerdos para ≈60 % del volumen hipotecario [A13].',
    ],
    en_contra: [
      '**Regulador en contra**: VantageScore para todos y tabla de precios única (29-sep-2026) [B4].',
      '**Competidor diez veces más barato** y propiedad de los distribuidores de FICO [B7].',
      '**Deuda de 5.610 M USD** (4,3 veces el EBITDA) y patrimonio de −4.100 M [A6].',
      '**Recompra acelerada de 1.500 M** al doble del precio actual [A6].',
      '**Software estancado**: +2 % en el 3T FY26 [A5].',
    ],
    que_vigilar: 'La tesis depende del precio de la puntuación hipotecaria en el FY2027. La señal de que el base es optimista: una guía de noviembre con ingresos de Scores a la baja más de un 10 %, una fecha de entrada en vigor de la tabla única antes de mediados de 2027 o un porcentaje de hipotecas de las GSE con VantageScore por encima del 20 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 560,84 USD: pasaría los requisitos de compra (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco ≥ precio).',
      'Precio por encima de 862,78 USD: Vender (ponderada ≤ −10 %).',
      'Guía del FY2027 con ingresos de Scores −10 % o peor: revisar a la baja el base y pasar a Vender.',
      'La FHFA aplaza la tabla única más allá de 2027 o certifica la licencia directa con el precio actual: revisar al alza.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ingresos de Scores (trimestre)', nivel_actual: '458,9 M USD (3T FY26, +41 %)', umbral_alerta: 'Caída interanual', por_que: 'Mide el precio hipotecario' },
      { kpi: 'Hipotecas de las GSE con VantageScore', nivel_actual: '>9 % en el piloto', umbral_alerta: '>20 %', por_que: 'Pérdida de cuota' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '4,3x', umbral_alerta: '>4,5x', por_que: 'Holgura financiera' },
      { kpi: 'ARR de la plataforma de software', nivel_actual: '+16 % (sep-2025)', umbral_alerta: '<+10 %', por_que: 'Única palanca fuera de Scores' },
    ],
    confianza: 'Baja',
  },
  fuentes: [],
  huecos: [
    { seccion: 'bolsa', campo: 'sección completa', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) búsquedas de rentabilidad y beta; 3) agregadores sin fecha', decision: 'Omitido' },
    { seccion: 'capital', campo: 'adquisiciones', tipo: 'Complemento', intentos: '1) 10-K FY2025 por búsqueda; 2) prensa; 3) historial de la empresa: sin compras relevantes en diez años', decision: 'Omitido' },
  ],
};
