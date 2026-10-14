// Textos del analista (Lonza, corte 2026-10-14). Citas con letra de nota; las cifras del motor van sin cita.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de inversores de Lonza, los PDF del informe anual 2025 y del semestre, la SIX y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados (Lonza vía SGX y lonza.com), de AWP, finanzen.ch, Stock Analysis, Investing.com y aktien.guide, con la URL como fuente. Precio: 570,20 CHF, última cotización publicada del 13-oct-2026 por la tarde (sesión cerrada); el 14-oct cotizaba a 575,60 CHF a media mañana, durante el día del inversor [D1, D2]. Perímetro: 2022-2023 son del grupo con Capsules & Health Ingredients (CHI); 2024-2025, del negocio continuado (CDMO) reexpresado tras el acuerdo de venta de CHI [A1, A13]. El EBITDA es el CORE EBITDA de la empresa (sin amortización de intangibles comprados ni partidas especiales). La deuda neta de diciembre de 2025 (3.258 M) incluye CHI; la deuda bruta (3.977 M) es estimación propia = deuda neta + caja. Sin balance por años ni flujos de 2022-2023: el ROIC del motor (9,3 %) incluye los activos de CHI en venta y queda por debajo del publicado por la empresa (11,9 %).',
  controles_explicados: [
    { control: 'Rendimiento del capital nuevo', explicacion: 'El ROIC del motor (9,3 %) usa un capital invertido de 11.228 M que incluye CHI (en venta por 2.300 M de valor empresa); sin CHI ronda el 12 %, y la empresa publica el 11,9 % [A15]. Además, parte del crecimiento del NOPAT viene del margen (del 31,6 % al 36 %) y de llenar capacidad ya pagada (Vacaville, Visp; capex del 21 % de las ventas en 2024-2025). Aun así la prueba falla: rebajamos el caso base (crecimiento 2027-2032 0,5-1 punto por debajo del plan y capex al 19 % de las ventas en 2027-2028) y el veredicto es «En parte».' },
    { control: 'Al menos 5 ejercicios', explicacion: 'Solo cuatro ejercicios con EBITDA fiable (2022-2025) y dos perímetros distintos: los informes anuales no se pudieron abrir y los proveedores mezclan bases (hueco registrado).' },
    { control: 'Al menos 10 fuentes primarias', explicacion: 'Desde este entorno no se abren los informes anuales; las primarias son los comunicados y extractos de los informes citados por la búsqueda.' },
    { control: 'Al menos 3 transacciones', explicacion: 'Las operaciones del sector (Catalent, Vacaville, CHI) no publican EBITDA en los extractos: sección omitida.' },
  ],
  parches: [],
  huecos_resueltos: [{ seccion: 'sector', campo: 'tamaño y crecimiento del mercado CDMO, estructura, Porter, ciclo' }],

  secciones: {
    sector: {
      definicion: 'El mercado relevante es la fabricación por encargo (CDMO) de principios activos y medicamentos para farmacéuticas y biotecnológicas, sobre todo biológicos (anticuerpos, proteínas, ADC, terapias celulares y génicas), a escala mundial. No hemos podido leer un estudio de mercado con cifra fiable desde este entorno (hueco): la sección describe la estructura y los motores con datos de las empresas [B1, B2].',
      tamano: null, unidad_serie: null, serie: [],
      tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
      drivers: [
        { driver: 'Externalización de la fabricación de biológicos', efecto: '+', horizonte: 'Estructural', evidencia: 'Las farmacéuticas venden plantas propias a los CDMO (Genentech-Vacaville a Lonza, 1.200 M USD) [B3].' },
        { driver: 'ADC, péptidos y nuevas modalidades', efecto: '+', horizonte: 'Estructural', evidencia: 'Lonza invierte en bioconjugados y su plataforma Advanced Synthesis lidera el crecimiento del 1S26 [A3, A4].' },
        { driver: 'Relocalización en EE. UU. y ley BIOSECURE', efecto: '+', horizonte: 'Estructural', evidencia: 'Capacidad de Lonza en Portsmouth y Vacaville; WuXi Biologics expuesta a la ley [B1, B6].' },
        { driver: 'Financiación de las biotecnológicas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La fase clínica depende de la financiación; en 2023 la caída del biotech y el fin de los contratos de Moderna bajaron el margen al 29,8 % [A10].' },
        { driver: 'Capacidad nueva en Asia y de las farmacéuticas', efecto: '−', horizonte: 'Cíclico', evidencia: 'Samsung Biologics y WuXi amplían a cientos de miles de litros [B1].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos actores con capacidad comercial grande, pero Samsung y WuXi compiten en precio y amplían capacidad [B1].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes farmacéuticas negocian fuerte, pero una vez aprobado el proceso cambiar de planta cuesta 12-24 meses [B4].' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Equipos y consumibles de varios fabricantes (Thermo Fisher, Danaher, Sartorius).' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Plantas de mil millones y años de historial regulatorio [B3].' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La alternativa es fabricar en casa; la tendencia va hacia fuera [B3].' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'Tras el bache de 2023 (fin de la demanda de vacunas y frenazo del biotech: margen del 29,8 % y caída del 21,9 % de la acción), la demanda ha vuelto: Lonza creció un 21,7 % a tipos constantes en 2025 y un 16,0 % en el 1S26 [A1, A3, D7]. En 2020-2021 el sector vivió una burbuja de vacunas y tipos cero.' },
      regulacion: 'Las plantas dependen de las inspecciones de la FDA, la EMA y Swissmedic; un aviso de incumplimiento para una planta entera. En EE. UU., la ley BIOSECURE (restricción a proveedores biotecnológicos chinos) y los aranceles a los medicamentos importados favorecen la capacidad local que tiene Lonza [B6, E2].',
      tendencias: 'Los ADC, los péptidos (agonistas GLP-1) y las terapias celulares crecen más que los anticuerpos clásicos; Lonza invierte en todas. El riesgo es la sobrecapacidad en anticuerpos de 2027-2028 si las ampliaciones de Asia y de las propias farmacéuticas llegan a la vez [B1, B2].',
      confianza: 'Baja',
    },
    financieros: {
      comentario: 'Las ventas del grupo pasaron de 6.223 M CHF en 2022 a 6.717 M en 2023; tras sacar CHI, el negocio continuado pasó de 5.480 M en 2024 a 6.531 M en 2025 (+19,2 % en francos y +21,7 % a tipos constantes), con Vacaville consolidada desde octubre de 2024 [A1, A7, A10]. El margen CORE EBITDA bajó del 32,1 % de 2022 al 29,8 % de 2023 (fin de los contratos de vacunas y arranque de capacidad) y ha subido al 30,2 % en 2024, al 31,6 % en 2025 y al 34,8 % en el 1S26 por la utilización de las plantas [A1, A3, A10]. El beneficio atribuido del negocio continuado fue de 909 M en 2025 (BPA diluido 13,00) y de 591 M en el 1S26 [A2, A5]. En 2025 el beneficio del grupo fue negativo por el deterioro de CHI (el fondo de comercio bajó de 3.370 M a 1.960 M) [A8].',
      ajustes: 'Lonza publica cifras CORE que excluyen la amortización de intangibles comprados, deterioros, reestructuración y costes de compras: CORE EPS de 15,08 CHF en 2025 frente a 13,04 de BPA NIIF básico, y 13,12 frente a 8,51 en 2024 [A1]. Usamos el CORE EBITDA en la cuenta, el DCF y los múltiplos, y el CORE EPS en el PER histórico y el objetivo a 12 meses. El resultado financiero (−158 M) y los impuestos (173 M) de 2025 son estimación propia (tipo del 16 % sobre el beneficio y el resultado de explotación de ≈1.240 M) [A2].',
    },
    trimestres: {
      ultima_presentacion: 'En julio (1S26) la dirección presentó ventas de 3.370 M (+16,0 % a tipos constantes, +11,2 % en francos), un margen CORE EBITDA del 34,8 % (+4,4 puntos, frente al 33,2 % que esperaban los analistas) y una caja libre operativa de 426 M (116 M un año antes) [A3, A4, A6]. Subió la guía de margen de 2026 al 33-34 % y mantuvo la de ventas (+11-12 %), lo que implica un segundo semestre más lento por el calendario de Advanced Synthesis, una base exigente y Vacaville plana en 2026 [A4]. La acción cayó un 4,9 % ese día [D14]. En enero (2025) el mensaje era de crecimiento por encima del 20 % y margen al alza; entre una y otra la dirección pasó a hablar de margen y caja más que de crecimiento. El día del inversor del 13-14 de octubre en Vacaville trajo objetivos de margen a 2031 por encima de lo esperado: los analistas pasan al 37-39 %, frente a un consenso del 35,7 % [C5, D3]. No hemos podido leer las transcripciones (hueco).',
    },
    balance: {
      otros_pasivos: 'El pasivo relevante es la deuda financiera (bonos en francos y euros), que solo tenemos en neto: 3.258 M a diciembre de 2025 (1,4 veces el CORE EBITDA), con CHI incluida [A1]. La venta de CHI aportará 1.700 M en efectivo al cierre (2S26) y una participación del 40 % con derecho preferente en la salida futura; la empresa espera al menos 3.000 M sin descontar en total [A13]. De ahí saldrá una recompra acelerada de 500 M. No hemos podido leer las notas de pensiones, provisiones ni litigios (hueco).',
      comentario: 'Balance holgado: deuda neta de 1,4 veces el CORE EBITDA a fin de 2025, que bajará por debajo de 1 vez con el cobro de CHI aunque se pague la recompra [A1, A13]. La caja bajó de 1.711 M a 719 M en 2025 por el capex y la compra de Vacaville [A8]. En el puente restamos 2.000 M por CHI (1.700 M en efectivo y 300 M, prudentes, por el 40 % retenido).',
    },
    flujos: {
      comentario: 'Lonza invierte mucho: capex del grupo de 1.417 M en 2024 y 1.373 M en 2025 (≈21 % de las ventas del negocio continuado) y 1.653 M en 2023 [A1, A14]. La caja libre operativa antes de compras fue de 313 M en 2024 y 545 M en 2025 en el negocio continuado (674 M en el grupo), y de 426 M en el 1S26 con el capex bajando al 15,7 % de las ventas [A1, A6]. El flujo operativo de la tabla es estimación propia: caja libre operativa del grupo + capex. Buena parte del capex de 2022-2025 es de crecimiento (Visp Ibex, Portsmouth, Vacaville); el de mantenimiento no se publica (estimamos ≈6-8 % de las ventas).',
    },
    calidad: {
      comentario: 'Cuentas auditadas por Deloitte, reelegido en 2026 [C1]. Las cifras CORE quitan cada año partidas que se repiten (amortización de intangibles comprados, costes de integración y reestructuración): en 2025 el CORE EPS (15,08) supera al BPA NIIF (13,04) en un 16 % [A1]. El deterioro de CHI de 2025 (≈1.400 M de fondo de comercio menos) [A8] confirma que la compra de Capsugel en 2017 (5.500 M USD) destruyó valor. Altman Z 3,01 (zona segura); Piotroski y Beneish no se pueden calcular sin el balance de dos años.',
      senales: [
        { senal: 'Diferencia persistente entre CORE y NIIF', nivel: 'Media', comentario: '15,08 frente a 13,04 de BPA en 2025 y 13,12 frente a 8,51 en 2024 [A1].' },
        { senal: 'Deterioro de CHI', nivel: 'Media', comentario: 'Fondo de comercio de 3.370 M a 1.960 M en 2025 [A8].' },
        { senal: 'Reexpresiones por cambios de perímetro y de segmentos', nivel: 'Baja', comentario: 'CHI interrumpida y tres plataformas nuevas en 2025; 2021 reexpresado por la política de APM [A12, A18].' },
      ],
      confianza: 'Baja',
    },
    capital: {
      politica: 'Dividendo de 5,00 CHF con cargo a 2025 (+25 %), dentro de la política de repartir el 35-45 % del CORE beneficio [A1, A17]. Recompra acelerada de 500 M al cobrar la venta de CHI [A13]. La prioridad es el capex orgánico (modelo «CDMO Organic Growth») y compras pequeñas de plantas.',
      comentario: 'El historial es mixto. Capsugel (2017) acabó vendida con deterioro; Specialty Ingredients se vendió en 2021 a buen precio; Vacaville (2024, 1.200 M USD por ≈330.000 litros) parece una compra barata frente al coste de construir [B3]. La dirección actual (desde 2024) ha simplificado la empresa y ha subido el margen 4,6 puntos en dos años [A1, A3]. El ROIC del 11,9 % (2025) está por encima del WACC pero lejos de los CDMO de moléculas pequeñas de los años buenos [A15].',
    },
    directivos: {
      comentario: 'Wolfgang Wienand llegó en julio de 2024 desde Siegfried, tras una etapa de inestabilidad (salida de Pierre-Alain Ruffieux en 2023) [C3]. En dos años ha cumplido las guías: 2025 con +21,7 % de ventas y margen del 31,6 %, y 2026 con la guía de margen elevada en julio [A1, A3]. El mercado le reprocha cierta prudencia en la guía de ventas [D14]. El día del inversor de octubre de 2026 fijó objetivos a 2031 por encima de lo esperado [D3].',
    },
    gobierno: {
      remuneracion: 'El informe de remuneraciones de 2025 obtuvo un 88,80 % a favor y un 11,00 % en contra en la junta del 8-may-2026, con el 62,58 % del capital representado [C2]. No hemos podido leer las métricas del variable (hueco).',
      control_y_defensas: 'Sin accionista de control: el capital está repartido entre fondos internacionales. Una acción, un voto. El consejo, presidido por Jean-Marc Huët, renovó tres puestos en 2026 (Sami Atiya, Stephen Fry y Claudia Süssmuth-Dyckerhoff) [C1].',
    },
    consenso: {
      guidance: 'Guía de 2026 (22-jul-2026): ventas +11-12 % a tipos constantes y margen CORE EBITDA del 33-34 % (antes, «más del 32 %») [A3]. Plan 2024-2028 (2023): ventas +11-13 % anual a tipos constantes, margen del 32-34 % y ROIC de dos cifras [A17]. El día del inversor de octubre de 2026 subió los objetivos de margen a 2031 (los analistas pasan al 37-39 %) [D3].',
      revisiones: 'Las estimaciones de BPA han subido tras la mejora del margen de julio; los objetivos medios se mantienen en torno a 676-681 CHF desde el verano [D4, D5]. Tras el día del inversor se esperan subidas de margen en los modelos [D3]. Solo tenemos una fuente de BPA (aktien.guide) y otra de objetivos (Investing.com).',
    },
    multiplos_historicos: {
      comentario: 'Sobre el CORE EPS, Lonza cotizó a 60,1x en 2021 (burbuja), 30,7x en 2022, 28,5x en 2023, 40,8x en 2024 y 35,7x en 2025 [D6, D7, A1, A12]. Hoy cotiza a 27,8x nuestro CORE EPS de 2027e: por debajo de su mediana de cuatro años (33,2x) porque el BPA crece deprisa con el margen. El cambio estructural es la salida de CHI y la mejora del margen.',
    },
    comparables: {
      criterio: 'CDMO cotizados (Samsung Biologics, WuXi Biologics, Siegfried) y proveedores de servicios y equipos para biofarmacia (Thermo Fisher, Danaher, Charles River) [D9, D10, D11, D12]. Faltan Bachem y Fujifilm (sin PER fiable) y Catalent ya no cotiza. Solo tenemos el PER de los próximos 12 meses de los tres CDMO; los demás datos son de los informes del repo del mismo día.',
      comentario: 'Lonza cotiza a 27,3x el BPA de consenso de los próximos 12 meses, por encima de la mediana de comparables (24,3x) y muy por debajo de Samsung Biologics (≈41x) [D9]. La prima frente a WuXi (22,6x) y Siegfried (18,7x) se explica por el margen (34,8 %) y por el riesgo político de WuXi [D10, D11]. Por EV/EBITDA de los últimos 12 meses, la mediana (24,0x) daría 773,87 CHF, pero sale de tres empresas que no son CDMO; damos más peso al PER.',
    },
  },

  dcf_justificacion: {
    crecimiento: 'El plan 2024-2028 pide +11-13 % anual a tipos constantes [A17] y la guía de 2026 es +11-12 % [A3]; en francos, la divisa ha restado ≈5 puntos en el 1S26 (+16,0 % frente a +11,2 %) [A4]. Proyectamos +8,5 % en francos en 2026 (fijo), +9,0 % en 2027 y +8,5 % en 2028, y luego una bajada hasta el 2 % en 2035. El caso base está rebajado por la prueba de sostenibilidad (≈0,5-1 punto anual menos que el plan menos la divisa). El consenso de ventas (7.300 / 8.200 / 9.100 M) es más alto [D5].',
    margenes: 'Margen CORE EBITDA del 33,5 % en 2026 (guía 33-34 %) que sube al 36 % en 2029 y se queda ahí [A3]. Es menos que el 37-39 % que los analistas leen en los objetivos del día del inversor a 2031 [D3] porque la capacidad nueva de Asia puede bajar precios a partir de 2027-2028.',
    inversion: 'Capex del 17 % en 2026 (guía de la «mitad del rango de los mid-to-upper teens») y del 19 % en 2027-2028 (parte del capex de 2026 pasa a 2027) [B2, E2], que baja hasta el 13,5 % en 2035, por encima de la amortización (12,5 %) para financiar el crecimiento final. El circulante va dentro del capex (no tenemos su histórico). Amortización del 11-12,5 % de las ventas (cuadra el CORE EPS de 2025 con un 11 %).',
    wacc: 'Tasa libre del 0,54 % (bono de la Confederación a 10 años, la misma que en los informes de Roche y Givaudan del repo); beta 1,0 (estimada: CDMO más cíclico que la farmacia; sin datos de bolsa); prima de mercado del 5,5 % más 1 punto adicional por la tasa libre suiza anormalmente baja; deuda al 2 % y 8 % del capital. WACC 6,61 %. Con la prima implícita del mercado (4,2 %) [D13], el DCF sube a 584,01 CHF: la recomendación depende de la tasa.',
    terminal: 'Gordon con un 1,0 % en francos (inflación suiza esperada ≈0,5-1 % y tasa libre del 0,54 %); el valor terminal es el 68 % del total. No usamos la etapa de transición: el ROIC del motor (9,3 %) no supera al WACC en 5 puntos.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: arranque de capacidad en Visp, Portsmouth y Singapur y ADC (+9,5); precio y mezcla +2; divisa −3 (el 1S26 restó ≈5 puntos) [A3, A4].',
    '2027e': 'Volumen +9: Vacaville empieza a llenarse tras un 2026 plano [A3]; precio +2; divisa −2.',
    '2028e': 'Volumen +8,5 con la capacidad nueva; precio +2; divisa −2.',
    '2029e': 'Volumen +8; precio +2; divisa −2.',
    '2030e': 'Volumen +7 a medida que se llenan las plantas; precio +2; divisa −2.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El foso es estrecho pero real (costes de cambio de 12-24 meses y escala en biológicos) y la empresa ha demostrado crecer: +21,7 % en 2025 y +16 % en el 1S26 [A1, A3]. La prueba de reinversión falla: con el ROIC del motor (9,3 %, que incluye los activos de CHI) la reinversión proyectada financia un 1,9 % anual frente al 6,1 % proyectado, y el capital nuevo tendría que rendir un 32,2 %. Parte de la diferencia se explica (ROIC sin CHI ≈12 %, margen del 31,6 % al 36 % y plantas ya pagadas sin llenar), pero no toda: rebajamos el caso base (crecimiento de 2027-2032 0,5-1 punto por debajo del plan y capex del 19 % en 2027-2028). Cuota final: sin dato de mercado (hueco).',
  dcf_lectura: 'El DCF base da 446,65 CHF por acción, un 21,7 % por debajo del precio, con un valor terminal del 68 % del total. El DCF inverso dice que el precio de 570,20 CHF descuenta un crecimiento de ventas del 9,1 % anual en 2027-2035 (nuestro base: 5,8 %) o un margen del 41,6 % (nuestro base: 36 %), o una rentabilidad del 5,5 % frente a un WACC del 6,61 %. Es exigente: supone que Lonza mantiene el ritmo de su plan durante nueve años más y con poco capital, algo que solo ha hecho en la etapa de las vacunas. Con la prima implícita del mercado (4,2 %) el valor sube a 584,01 CHF, en línea con el precio: el mercado paga a Lonza como a un activo de calidad con tasa baja. La distancia entre nuestro valor y el precio es sobre todo de tasa de descuento y de capital necesario para crecer, no de márgenes.',
  narrativas: {
    Bajista: 'La capacidad nueva de Samsung, Fujifilm y las farmacéuticas llega a la vez en 2027-2028, la utilización baja como en 2023 y el margen se queda cerca del 33 %; ventas 4 puntos por debajo del base cada año.',
    Base: 'Lonza llena Vacaville y Visp, crece un 8-9 % en francos hasta 2029 y el margen llega al 36 %, con un capex que baja despacio del 19 % al 13,5 % de las ventas.',
    Alcista: 'ADC, péptidos y relocalización en EE. UU. empujan el volumen 3 puntos por encima del base y el margen llega al 37,5 %, el centro de lo que el mercado lee en los objetivos a 2031.',
  },
  escenarios_comentario: 'Bajista 269,78, base 446,65 y alcista 601,06 CHF por acción: el alcista apenas supera el precio (+5,4 %) y el bajista pierde un 52,7 %. Por DCF la asimetría es mala; a 12 meses, con la regla de múltiplos, es buena (2,58x), porque el PER del bajista no baja tanto. La diferencia muestra que el precio descansa en el múltiplo, no en los flujos.',
  suma_partes_comentario: 'No aplica: tras la venta de CHI, Lonza es un solo negocio CDMO con tres plataformas sin cifras separadas.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF es el método más útil en un negocio de capital intensivo, pero depende mucho de la tasa: con nuestro WACC (6,61 %) da 446,65 CHF y con la prima del mercado 584,01. Los comparables por PER dan 506,68 y por EV/EBITDA 773,87, una dispersión que refleja que los comparables no son CDMO puros. Valor intrínseco de 456,97 CHF, un 19,9 % por debajo del precio. Los analistas (681 CHF de media) están por encima de todo nuestro rango salvo del alcista a 12 meses [D4].',
  rentabilidad_comentario: 'ROIC del 9,3 % en 2025 según el motor (NOPAT de 1.042 M sobre 11.228 M de capital, con los activos de CHI); la empresa publica el 11,9 % (10,9 % en 2024 y 8,7 % en 2023) [A15]. Frente a un WACC del 6,61 %, crea valor, pero con un margen corto (2,7 puntos con el motor y ≈5 con la cifra de la empresa). El ROIC lo mueve el margen: la rotación es baja (≈0,6 veces el capital) porque las plantas valen más que lo que facturan hasta que se llenan. Un CDMO de moléculas pequeñas como Siegfried rinde algo menos; Samsung Biologics, más con plantas llenas [B5].',
  diferencia_consenso: 'Nuestro CORE EPS de 2028e (23,1 CHF) queda un 9 % por debajo del consenso (25,44) [D5] porque proyectamos ventas en francos menores (8.380 M frente a 9.100 M: descontamos ≈2 puntos de divisa al año) y un margen que llega al 36 % y no al 37-39 %. Nuestro objetivo a 12 meses (654,39 CHF) queda un 5,7 % por debajo del objetivo medio de los analistas (681 CHF) [D4]; el PER del base (27,8x) es el actual, no el histórico.',
  objetivo12m_comentario: 'El objetivo a 12 meses (654,39 CHF, +15,6 % con dividendo) queda un 43 % por encima del valor intrínseco (456,97 CHF). La distancia es de tasa y de capital: el mercado paga 27-28 veces el beneficio de 2027 y nuestro DCF exige más inversión para el crecimiento que proyectamos. Para cerrarla haría falta que la caja libre suba de verdad (más de 1.000 M al año antes de 2028) o que el margen llegue al 37-39 % que leen los analistas en los objetivos a 2031. Tesis a más de un año.',
  oj: {
    Bajista: 'Utilización a la baja en 2027-2028: ventas 4 puntos por debajo del base y margen del 33 %: CORE EPS de 19,0 CHF en 2028e.',
    Base: 'Ventas de 8.380 M en 2028e (+8,5 % en francos) y margen del 35,5 %: CORE EPS de 23,1 CHF con 69,3 M de acciones tras la recompra de 500 M.',
    Alcista: 'Ventas 3 puntos por encima del base y margen del 37 % en 2028e: CORE EPS de 26,1 CHF.',
  },
  catalizadores: {
    items: [
      { fecha: '20-oct-2026', evento: 'Actualización cualitativa del 3T26', efecto: 'Confirmación de la guía de 2026 (ventas +11-12 % y margen 33-34 %)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2S26', evento: 'Cierre de la venta de CHI a Lone Star y recompra acelerada de 500 M', efecto: '1.700 M en caja; ≈1,2 % de las acciones recompradas', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Ene-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primer año con los objetivos a 2031; capex de 2027 (parte trasladada de 2026)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Arranque comercial de Vacaville tras un 2026 plano', efecto: 'Volumen y margen; clave del crecimiento de 2027-2028', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Ley BIOSECURE y aranceles a medicamentos en EE. UU.', efecto: 'Desvío de clientes desde WuXi hacia CDMO occidentales', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Sobrecapacidad en anticuerpos en 2027-2029', tipo: 'Sector', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 a −50 % (escenario bajista: 269,78 CHF)', mitigante: 'Contratos con compromisos mínimos y costes de cambio altos', senal: 'Utilización y margen por debajo del 33 %' },
      { riesgo: 'Caja libre insuficiente: capex que no baja', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 %', mitigante: 'Capex guiado a la baja (15,7 % en el 1S26)', senal: 'Capex > 18 % de las ventas en 2027' },
      { riesgo: 'Franco fuerte', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Costes en las mismas divisas que las ventas en EE. UU.', senal: 'Diferencia entre crecimiento a tipos constantes y en francos > 4 puntos' },
      { riesgo: 'Tasa de descuento: múltiplo de 28x', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % (base × 0,85 = 448,40 CHF a 12 meses)', mitigante: 'Crecimiento del BPA del 15 % anual', senal: 'Subida de los tipos reales' },
      { riesgo: 'Pérdida o retraso de un gran contrato o de un producto de un cliente', tipo: 'Cliente', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Cartera diversificada en tres plataformas', senal: 'Fracasos clínicos de clientes grandes (Vaxcyte, ADC)' },
      { riesgo: 'Calidad o inspección regulatoria en una planta grande', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Historial regulatorio largo', senal: 'Cartas de advertencia de la FDA' },
    ],
    premortem: 'Octubre de 2029: la acción vale 340 CHF. En 2027 Lonza arrancó Vacaville y las ampliaciones de Visp justo cuando Samsung Biologics, Fujifilm y dos grandes farmacéuticas abrían capacidad propia; varios biosimilares y anticuerpos de clientes se retrasaron y la utilización cayó, como en 2023. El margen, que el mercado ya daba por hecho en el 37-39 %, se quedó en el 32-33 %, y el capex, comprometido, siguió en el 17-18 % de las ventas: la caja libre no pasó de 500 M. El franco restó otros 3 puntos al año. El PER bajó de 28x a 20x, como el de Siegfried y WuXi, sobre un BPA un 15 % inferior al esperado. Señales que lo habrían anticipado: un margen semestral por debajo del 33 %, la diferencia entre el crecimiento a tipos constantes y en francos y el capex de 2027 por encima de la guía.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Capital', pregunta: '¿Cuánto capex hace falta para crecer al 11-13 % a tipos constantes hasta 2031 y qué parte de la capacidad está ya pagada?', por_que: 'Decide si el crecimiento proyectado es financiable (nuestra prueba falla).' },
      { tema: 'Utilización', pregunta: '¿Qué utilización tienen hoy Vacaville, Visp Ibex y Portsmouth?', por_que: 'El margen depende de llenarlas.' },
      { tema: 'Margen', pregunta: '¿Qué supuestos de precio y mezcla sostienen el objetivo de margen a 2031?', por_que: 'El mercado ya descuenta un 41,6 % de margen o un 9,1 % de crecimiento.' },
      { tema: 'CHI', pregunta: '¿Cuánto vale hoy el 40 % retenido y cuándo se espera la salida?', por_que: 'Lo valoramos en 300 M; la empresa espera hasta 1.300 M más sin descontar.' },
      { tema: 'Divisa', pregunta: '¿Qué efecto divisa espera en 2027 con el franco actual?', por_que: 'Es la diferencia entre nuestro base y el consenso.' },
      { tema: 'Clientes', pregunta: '¿Qué peso tienen los diez primeros clientes en ventas?', por_que: 'No se publica en los extractos y mide el riesgo de un contrato.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [
    { seccion: 'dcf', campo: 'mercado final (tamaño del mercado CDMO en 2030)', tipo: 'Complemento', intentos: '1) presentaciones de Lonza (no abren); 2) estudios de mercado (sin cifra fiable en los extractos); 3) competidores (solo escala)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tamaño del mercado, serie y crecimiento', tipo: 'Núcleo', intentos: '1) informe anual de Lonza; 2) estudios de mercado CDMO; 3) rankings sectoriales: sin cifra fiable', decision: 'Omitido' },
  ],
};
