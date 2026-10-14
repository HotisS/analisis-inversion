// Textos del analista (Spirax Group, corte 2026-10-14).
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { R = null; }

export default {
  resumen: R,
  limitaciones: 'Entorno sin acceso a documentos: todas las cifras salen de resultados de búsqueda web (comunicados RNS de resultados citados, Stock Analysis, Kalkine, prensa financiera), con su URL. Cotiza en peniques (GBp) en la Bolsa de Londres; el informe trabaja en libras (1 GBP = 100 peniques). Precio: 7.090 peniques (70,90 GBP) del 8-oct-2026, último dato disponible (no el cierre del 13-oct). Amortizaciones de 2021-2024 estimadas; balance solo de 2024-2025 y sin circulante, por lo que el DCF lleva el circulante en el capex (0,8 puntos de las ventas). Precios de cierre de cada año derivados del ADR (SPXSY) y del tipo GBP/USD. Deuda neta del puente (jun-26) de un resumen secundario: incluye arrendamientos según la definición de la empresa.',
  controles_explicados: [
    { control: 'Al menos 5 comparables', explicacion: 'Solo cuatro comparables con PER adelantado verificable en la búsqueda (Rotork, Halma, IMI, Atlas Copco); Alfa Laval, Weir e IDEX no tenían cifra de 2026. Peso de comparables limitado al 25 %.' },
  ],
  secciones: {
    negocio: {
      como_gana_dinero: 'Cerca del 85 % de las ventas viene del mantenimiento y de pequeñas mejoras de sistemas ya instalados, no de grandes proyectos [A13]: es gasto operativo del cliente, recurrente y poco sensible al precio porque un purgador o una bomba cuestan poco frente a la energía o el producto que protegen. El margen depende del volumen (apalancamiento operativo de una red comercial directa con costes fijos), del precio (subidas anuales por encima de la inflación de costes) y de la mezcla: STS gana un 23,5 % y Watson-Marlow un 26,2 %, frente al 16,2 % de ETS [A2]. En 2023 la caída de volumen en biofarma y semiconductores, los negocios de más margen, bajó el margen ajustado del 23,6 % al 20,7 % [A7].',
      clientes: 'Decenas de miles de plantas industriales y hospitales en más de 60 países, sin concentración relevante declarada [B1, A13]. El poder de precios se ve en que la empresa crece por encima de la producción industrial: +5 % orgánico en 2025 y en 1S26 frente al 1,5 % de la producción industrial mundial [A1, A2].',
    },
    financieros: {
      comentario: 'Ingresos de 1.344,5 M GBP en 2021 a 1.702,9 M en 2025, con las compras de ETS de 2022 (Vulcanic y Durex) como salto principal [A5, A8]. El beneficio operativo ajustado tocó techo en 2022 (380,2 M, 23,6 %) y cayó a 349,1 M en 2023 (20,7 %) por la mezcla: menos volumen en biofarma y semiconductores [A7]. En 2025 subió a 339,9 M ajustados (20,0 %, +30 pb orgánico), con 40 M de ahorros de la reestructuración [A2]. El BPA ajustado pasó de 377,2 peniques en 2022 a 296,3 en 2025 [A2, A7]. En 1S26, ingresos +5 % (863,8 M), margen ajustado del 19,8 % y BPA ajustado de 150,0 peniques (+9 %) [A1].',
      ajustes: 'La empresa publica cifras ajustadas sin amortización de intangibles de compras (≈34,6 M en 2025, estimación propia por diferencia entre el beneficio operativo de 305,3 M antes de reestructuración y el ajustado de 339,9 M [A10, A2]) ni costes de reestructuración (40 M en 2025 [A2]). El informe usa la cuenta reportada y devuelve al EBITDA los 40 M de reestructuración (no recurrentes). El objetivo a 12 meses y el PER histórico usan el BPA ajustado, la base que sigue el mercado.',
    },
    trimestres: {
      ultima_presentacion: 'En marzo de 2026 la dirección presentó la reestructuración como cerrada (40 M GBP de ahorro anual) y guio a un crecimiento orgánico de un dígito medio con mejora del margen sobre el 19,8 % ajustado por divisa [A2]. En agosto reiteró la guía: ventas +5 % orgánico, ETS +11 % y Watson-Marlow +7 %, pero STS solo +1 % con margen −140 pb por calendario de envíos e inversión comercial adelantada [A1, A4, A11]. Las preguntas se centraron en STS y en China (menos envíos de grandes proyectos) y en la conversión de caja (54 % en el semestre frente al 61 %), que la empresa espera llevar al 89-90 % en el año [A3, A4]. La dirección no dio cifras de pedidos de STS más allá de una «cartera fuerte» [A1]. La acción cayó entre un 5,6 % y un 11 % en la sesión [A4, A11].',
    },
    balance: {
      otros_pasivos: 'Los detalles de pensiones, provisiones y vencimientos no estaban accesibles (ver huecos). La deuda neta publicada incluye arrendamientos; el objetivo de apalancamiento es 1-1,5 veces el EBITDA [A2, A3].',
      comentario: 'La deuda neta subió con las compras de 2022 (Vulcanic, 261,7 M EUR) hasta 1,7 veces el EBITDA a fin de 2023 y ha bajado a 564,7 M GBP (1,5 veces) en 2025 [A2, A8]. En jun-26 sube a 618,2 M (1,6 veces) por el pago del dividendo final y la estacionalidad del circulante [A3]. El balance no limita la estrategia: con 1,5 veces el EBITDA hay margen para compras pequeñas sin ampliar capital.',
    },
    flujos: { comentario: 'El flujo operativo fue de 299 M GBP en 2023, 312,8 M en 2024 y 296,2 M en 2025 (con 22 M de caja de reestructuración) [A14, A2]. La conversión de caja ajustada fue del 89 % en 2025 con un capex del 4 % de las ventas [A2]. No hay desglose de capex de mantenimiento; estimación propia: la amortización de inmovilizado, software y arrendamientos (≈4 % de las ventas) es la referencia del mantenimiento.' },
    calidad: {
      comentario: 'Las diferencias entre lo reportado y lo ajustado son grandes y repetidas: 74,5 M GBP en 2025 (amortización de intangibles de compras y reestructuración) y 64,7 M en 2023 [A2, A7]. La amortización de intangibles es real pero no de caja; la reestructuración de 2025 se presenta como única. El Altman Z de 3,20 está en zona segura; el Piotroski F de 4 sale con datos incompletos y no es concluyente; el Beneish M no se puede calcular sin circulante.',
      senales: [ { senal: 'Ajustes recurrentes al beneficio', nivel: 'Media', comentario: 'Reestructuración de 40 M en 2025 tras ajustes también en 2023; vigilar que no se repita [A2, A7].' } ],
    },
    capital: {
      politica: 'Dividendo progresivo durante más de 55 años: 170 peniques en 2025 (+3 %) e interino de 50,4 peniques en 2026 (+3,1 %) [A2, A1]. Sin recompras. Prioridad: inversión orgánica (capex del 4 % de las ventas), compras complementarias y apalancamiento entre 1 y 1,5 veces el EBITDA [A2, A3].',
      comentario: 'La asignación de capital es el punto flojo de los últimos cinco años: las compras de ETS de 2022 se pagaron en máximos del ciclo y ETS gana un 16,2 % frente al 23,5 % de STS [A2]. El NOPAT del grupo bajó de 241 M GBP en 2021 a 221 M en 2025 con un capital invertido mayor: el ROIC actual es del 12,3 %.',
    },
    directivos: { comentario: 'Equipo con tres años en el cargo y una guía cumplida en 2025 [C1]. La reestructuración ha devuelto el margen ajustado al 20 % pero no al 23-25 % de 2021-2022. Sin datos de participación de los directivos ni del plan de sucesión.' },
    gobierno: { remuneracion: 'La junta de mayo de 2026 aprobó una nueva política de remuneración y las reglas del plan de acciones; el apoyo más bajo de las 24 propuestas fue del 85,57 % [C7]. No se ha podido ver qué propuesta recibió ese voto ni las métricas del variable (ver huecos).' },
    consenso: {
      guidance: 'Para 2026: crecimiento orgánico de las ventas de un dígito medio y mejora orgánica del margen operativo ajustado sobre el 19,8 % ajustado por divisa de 2025; confirmado el 13-may-26 y el 11-ago-26 [A2, A1]. A medio plazo (día del inversor de octubre de 2024): crecimiento orgánico de un dígito medio, mejora del margen y del rendimiento del capital; un resumen secundario cita un margen del 22-23 % [A3].',
      revisiones: 'El consenso de la empresa para 2026 bajó ligeramente de 318 peniques de BPA básico (24-mar-26) a 312 (3-ago-26) [D3]. Las estimaciones de 2027 y 2028 vienen de una sola fuente (Simply Wall St) en base NIIF; el objetivo medio y el rango, de Investing.com (marzo de 2026). Tras los resultados, Jefferies mantiene «comprar» con 87,40 GBP y Stifel «mantener» con 72,50 [D6, D14].',
    },
    multiplos_historicos: { comentario: 'Spirax cotizó a 23-33 veces el BPA ajustado en 2022-2025 y a 46 veces en 2021 (excluido por burbuja de múltiplos de calidad) [D7, A2, A7]. Hoy, a 70,90 GBP, cotiza a 20,6 veces nuestro BPA ajustado de 2027e: el descuento frente a su historia refleja tipos más altos (bono británico a 10 años cerca del 5 % [D13]) y tres años de beneficio a la baja.' },
    comparables: {
      criterio: 'Industriales británicos y europeos de control de flujos e instrumentación con márgenes altos y negocio de recambio: Rotork (actuadores), IMI (válvulas), Halma (instrumentación de nicho) y Atlas Copco (compresores y vacío). No se incluyen Armstrong ni TLV (no cotizan). Solo PER adelantado: los EV/EBITDA no eran verificables.',
      comentario: 'La mediana del PER adelantado de los cuatro comparables es de 28 veces (Rotork 27,7, Halma 29,0, Atlas Copco 28,3 e IMI 21,9) [D8, D9, D11, D12]. Spirax cotiza con descuento a todos salvo IMI, pese a márgenes superiores. El descuento se explica por el estancamiento de STS y por tres años de beneficio a la baja; no por la calidad del negocio.',
    },
    sentimiento: { lectura: 'El sentimiento de los particulares y de la prensa es dividido y empeora desde agosto: la guía sin cambios y el vapor estancado pesan más que la mejora del margen. No es capitulación: el precio está a mitad de su rango de 52 semanas (59,50-80,50 GBP) [D1]. Coincide con nuestra lectura de que el catalizador es la recuperación de STS, no la valoración. No señala riesgos que el informe no recoja.' },
  },
  rentabilidad_comentario: 'El ROIC es del 12,3 % en 2025 (NOPAT de 221 M GBP sobre 1.796 M de capital invertido con el fondo de comercio), frente a un WACC del 9,46 %: crea valor, pero con un margen de unos 2,8 puntos, lejos del de un compuesto de calidad. El ROIC ha caído porque el NOPAT bajó de 241 M en 2021 a 221 M en 2025 mientras el capital crecía con las compras de 2022. La palanca es el margen, no la rotación (1,28 veces).',
  dcf_justificacion: {
    crecimiento: '3,5 % en 2026e (fijo: +5 % orgánico en el semestre menos divisa, en línea con los 1.760 M del consenso [D3]), 5 % en 2027-2028e (guía de un dígito medio orgánico [A2]) y bajada gradual al 2,5 % en 2035e. La media 2021-2025 fue del 6 % con compras; la orgánica de 2025, del 5 % [A2].',
    margenes: 'EBITDA ajustado del 24,3 % en 2026e (beneficio operativo ajustado del 20,3 %, igual que los 360 M del consenso [D3]) que sube al 25,5 % en 2030e: equivale a un margen operativo ajustado del 21,5 %, por debajo del objetivo del 22-23 % y del 23,6 % de 2022 [A3, A7].',
    inversion: 'Amortización del 4 % de las ventas (inmovilizado, software y derechos de uso, sin intangibles de compras) y capex del 5,4 % hasta 2030e y del 4,9 % después: incluye el 4 % de capex publicado [A2] más ~0,8-1,4 puntos por el circulante (≈18 % de las ventas, estimación propia) y los arrendamientos, porque el balance no da el circulante.',
    wacc: 'Bono británico a 10 años del 4,9 % (5,05 % en julio de 2026 [D13]; estimación a la fecha de corte), beta de 0,95 (estimación propia; sin bolsa.mjs), prima del 5,5 %, coste de la deuda del 5,5 % y 11 % de deuda a mercado. WACC del 9,46 %.',
    terminal: 'Gordon con un 2,5 %: inflación del 2 % más un crecimiento real bajo, por debajo de la tasa libre del 4,9 % menos medio punto.',
  },
  pc: {
    '2026e': 'Precio ≈3 % (subidas anuales por encima de la inflación) y volumen ≈2 % (producción industrial del 1,5 % más ETS); la divisa resta ~1,5 puntos [A1, A2].',
    '2027e': 'Guía de crecimiento orgánico de un dígito medio: volumen 2 % y precio 3 % [A2].',
    '2028e': 'Igual que 2027e; se apoya en ETS (electrificación y semiconductores) y en la recuperación de STS [A4].',
    '2029e': 'Volumen más bajo al normalizarse semiconductores.',
    '2030e': 'Converge al crecimiento nominal de la producción industrial más precio.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La proyección pide un 3,7 % anual de crecimiento medio, por debajo del 5 % orgánico de 2025 y del 1S26, y apenas necesita capital nuevo (reinversión del 7 % del NOPAT). En un negocio de recambio con un 85 % de ventas de mantenimiento [A13], la prueba es el poder de precios: la empresa crece 3,5 puntos por encima de la producción industrial [A1]. El margen proyectado (21,5 % operativo ajustado en 2030e) queda por debajo del de 2021-2022 y del objetivo de la empresa. La cuota no se puede medir (sin tamaño de mercado).',
  narr: {
    Bajista: 'STS sigue estancado (China, ciclo de proyectos) y semiconductores se enfría como en 2023: crecimiento 2,5 puntos menor y margen 1,5 puntos menor, como la caída de 2022-2023 [A7].',
    Base: 'Crecimiento orgánico de un dígito medio y margen operativo ajustado que sube poco a poco al 21,5 %.',
    Alcista: 'STS vuelve a crecer por encima del 4 % y ETS mantiene dos dígitos: margen 1 punto mayor, hacia el objetivo del 22-23 %.',
  },
  escenarios_comentario: 'Con nuestro WACC, los tres escenarios del DCF quedan por debajo del precio: el problema es la tasa (bono británico cerca del 5 %), no el negocio. A 12 meses la lectura cambia: con la regla común de múltiplos, el bajista pierde en torno a un 20 % y el alcista gana más de un 50 %, pero la ponderada queda por debajo del umbral de compra.',
  suma_partes_comentario: 'No aplica: los tres negocios comparten clientes, red comercial y perfil de márgenes, y no hay comparables puros verificables de cada uno.',
  casos12: [
    { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 3.22, multiplo: null, precio: null, justificacion: 'Ventas de 1.852 M GBP en 2028e (−2,5 puntos de crecimiento en 2027-28) con margen EBITDA ajustado del 23,5 %: EBIT ajustado de 361 M, 37 M de gastos financieros, impuesto del 26,5 % y 73,83 M de acciones.' },
    { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 3.69, multiplo: null, precio: null, justificacion: 'Ventas de 1.943 M GBP (3,5 % en 2026e y 5 % en 2027-28e) con margen EBITDA ajustado del 25 % y amortización del 4 %: EBIT ajustado de 408 M (21 %), 37 M de gastos financieros, impuesto del 26,5 % y 73,83 M de acciones sin recompras.' },
    { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 4.01, multiplo: null, precio: null, justificacion: 'Ventas de 1.999 M GBP (+1,5 puntos de crecimiento) y margen EBITDA ajustado del 26 %: STS se recupera y el margen operativo ajustado llega al 22 %, el suelo del objetivo de la empresa.' },
  ],
  per_excluidos: '2021 excluido (46,3 veces: burbuja de múltiplos de calidad con tipos a cero). BPA ajustado en la misma base que los escenarios: 2022 27,3x (102,89 GBP / 3,772); 2023 32,8x (102,42 / 3,124); 2024 23,5x (67,20 / 2,863); 2025 25,0x (73,96 / 2,963) [A2, A7, A9, D7]. Cierres derivados del ADR (estimación). Actual = 70,90 ÷ 3,44 (nuestro BPA ajustado de 2027e).',
  diferencia_consenso: 'Nuestro BPA ajustado de 2028e (3,69 GBP) no se compara directamente con el consenso disponible, que es NIIF: 3,55 GBP en 2028e [D4]; sumando ≈0,36 GBP de amortización de intangibles de compras después de impuestos, el consenso ajustado rondaría 3,90, un 5 % por encima del nuestro. La diferencia está en el margen: proyectamos un 21 % operativo ajustado en 2028e, por debajo del objetivo del 22-23 %. Nuestro precio base queda cerca del objetivo medio de los analistas (81,19 GBP).',
  objetivo12m_comentario: 'El objetivo a 12 meses queda muy por encima del valor intrínseco del DCF con nuestro WACC: el mercado paga 20 veces beneficios por un negocio con un 85 % de ventas recurrentes, y nuestro DCF con un bono británico cerca del 5 % solo justifica unas 14 veces. Lo que cerraría la distancia es una bajada de tipos en Reino Unido, no un hecho de la empresa; la tesis de valor es a más de un año.',
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %. El DCF es el método más exigente porque el WACC (9,46 %) es alto para un negocio de recambio; los comparables (PER de 28 veces) dan el valor más alto. La dispersión entre métodos es grande y muestra que la conclusión depende de la tasa de descuento más que de las cifras de la empresa. Sin transacciones con múltiplo verificable, peso 0.',
  catalizadores: { items: [
    { fecha: '2026-11 (mediados)', evento: 'Actualización de negocio de los diez meses', efecto: 'Confirma o no la recuperación de STS y la guía', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027-03 (principios)', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Margen del año frente al 19,8 % y conversión de caja ~89-90 %', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027-05', evento: 'Actualización de negocio del 1T27 y junta', efecto: 'Primer dato de pedidos de STS de 2027', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Bajadas de tipos del Banco de Inglaterra', efecto: 'Reduce el WACC y sostiene el PER de los valores de calidad', probabilidad: 'Media', sentido: '+' },
  ], confianza: 'Media' },
  riesgos: {
    items: [
      { riesgo: 'STS (la mitad de las ventas) sigue estancado', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista a 12 meses: −20 % aprox.', mitigante: 'Cartera de pedidos fuerte según la empresa [A1]', senal: 'Crecimiento orgánico de STS por debajo del 3 % en 2S26' },
      { riesgo: 'Ciclo de semiconductores y biofarma', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Como en 2023: BPA ajustado −17 % [A7]', mitigante: 'Diversificación por sectores', senal: 'Crecimiento de ETS por debajo del 5 %' },
      { riesgo: 'Tipos británicos altos más tiempo', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'El DCF ya da 49,10 GBP con un bono del 4,9 %', mitigante: 'Negocio de recambio defensivo', senal: 'Bono a 10 años por encima del 5,25 %' },
      { riesgo: 'China y aranceles', tipo: 'Geopolítico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Producción local', senal: 'Envíos de proyectos en China' },
      { riesgo: 'Compras caras en ETS', tipo: 'Asignación de capital', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Dilución del ROIC (12,3 %)', mitigante: 'Apalancamiento objetivo de 1-1,5 veces', senal: 'Compra a más de 15 veces el EBITDA' },
      { riesgo: 'Ajustes recurrentes al beneficio', tipo: 'Contable', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'PER real más alto', mitigante: 'Reestructuración declarada cerrada [A2]', senal: 'Nueva reestructuración en 2026-27' },
    ],
    premortem: 'Octubre de 2029, la acción ha perdido un 40 %. STS no se recuperó: los grandes proyectos en China siguieron cayendo y la electrificación del calor industrial empezó a sustituir vapor más rápido de lo que ETS podía compensar con su margen más bajo. A la vez, los semiconductores entraron en otra fase baja como en 2023, y el BPA ajustado volvió a caer por debajo de 3 GBP. La dirección respondió con otra reestructuración y una compra grande en eléctrico a múltiplo alto. El mercado dejó de pagar prima de calidad: el PER bajó a 17-18 veces, como el de un industrial normal. Las señales que lo habrían anticipado: el crecimiento orgánico de STS por debajo de la producción industrial dos semestres seguidos, el margen ajustado del grupo sin pasar del 20 % en 2026 y una conversión de caja por debajo del 85 %.',
    confianza: 'Media',
  },
  preguntas: { items: [
    { tema: 'STS', pregunta: '¿Qué parte de la caída de margen de STS en 1S26 es calendario y qué parte inversión comercial que se queda?', por_que: 'Es la mitad del grupo y su margen bajó 140 pb [A4].' },
    { tema: 'ETS', pregunta: '¿Qué margen puede alcanzar ETS a medio plazo y qué peso tienen los semiconductores en sus ventas?', por_que: 'ETS crece un 11 % pero gana un 16,2 % [A2].' },
    { tema: 'Capital', pregunta: '¿Cuál es el ROIC de las compras de ETS de 2022 frente al precio pagado?', por_que: 'El ROIC del grupo ha caído al 12,3 %.' },
    { tema: 'Caja', pregunta: '¿Por qué bajó la conversión de caja al 54 % en 1S26 y qué garantiza el 89-90 % del año?', por_que: 'Afecta al FCF y a la deuda neta [A3].' },
    { tema: 'Ajustes', pregunta: '¿Habrá más costes de reestructuración en 2026-2027?', por_que: 'Ajustes de 74,5 M en 2025 [A2].' },
    { tema: 'Objetivos', pregunta: '¿Se mantiene el margen del 22-23 % a medio plazo y en qué año?', por_que: 'Nuestro base solo llega al 21,5 %.' },
  ], confianza: 'Media' },
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: [
    { seccion: 'dcf', campo: 'beta y bono británico a 10 años a la fecha de corte', tipo: 'Núcleo', intentos: '1) bolsa.mjs para la beta: sin red; 2) búsqueda del rendimiento del gilt en octubre de 2026: último dato de julio (5,05 %); 3) estimación propia: beta 0,95 y bono 4,9 %', decision: 'Calculado y marcado como estimación' },
  ],
};
