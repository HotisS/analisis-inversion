// Textos del analista (MONY Group, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de GBP, ejercicio natural; cuentas de 2021-2025 del XBRL ESEF de la empresa [A15] contrastadas con los resultados anuales [A1, A5, A6, A7] y el semestre de 2026 [A3]; los arrendamientos de 2021 no están en el XBRL y quedan sin dato [A10]. Precio del informe: cierre del 20-oct-2026 (200,6 peniques = 2,006 GBP); la sesión del 21-oct estaba abierta al hacer el análisis (199,3 peniques a las 07:18 UTC y 198,9 a las 08:00 UTC [D2]) y la decisión se comprueba con ese precio en las pruebas de robustez. Yahoo cotiza en peniques: se divide entre 100. Acciones: 511,6 M en circulación el 30-sep-2026 [A14] más ≈ 2,8 M de dilución de planes (514,4 M). El BPA de la regla a 12 meses y su historia están en la base AJUSTADA de la empresa (sin amortización de intangibles comprados, IVA irrecuperable ni partidas no recurrentes), la misma que el consenso; el DCF trata el IVA irrecuperable como un coste que se repite (−0,5 a −1,0 puntos de margen). La empresa no publica EBITDA por segmento: su «contribución» es ingresos menos marketing directo, y los costes compartidos se restan aparte [A1]. Calificación crediticia: no tiene. El consenso detallado de la propia empresa está detrás de un aviso legal: se usan Yahoo y MarketScreener [D2, D3]. Precio de una acción en EUR: ≈ 2,39 EUR (0,84028 GBP por EUR [D6]); 1.000 EUR son ≈ 420 acciones.',
  controles_explicados: [
    { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'La regla vigente (v3, historia adelantada) da Comprar con un 15,0 % ponderado y un 19,0 % en el base al cierre del 20-oct (16 % y 20 % al precio de hoy), pero la v2 (historia al cierre) da Mantener con un 13,5-14,4 % y el caso con el BPA 10 % más bajo cae al 5-9 %: no es compra robusta. El límite común en el que v3 y v2 dan Comprar aun con el BPA −10 % es 1,82 GBP (nivel A; 1,90 para B1), un 9 % por debajo del precio de hoy [P1]. Se mantiene la señal de la regla vigente en el informe y se comunica la acción robusta (Mantener) en el resumen.' },
    { control: 'ROIC del motor', explicacion: 'El ROIC del motor (35 % en 2025) incluye el fondo de comercio de la fusión de 2007 y de Quidco (82 % del capital invertido); sin él pasa del 190 %, porque el negocio casi no necesita activos [A15]. La medida que importa para la calidad es la de 35 %: +24 puntos sobre un WACC del 10,5 %.' },
  ],
  huecos: [],
  secciones: {
    rentabilidad: {
      comentario: 'El ROIC del motor sube del 22,6 % en 2021 al 35,0 % en 2025 con un WACC del 10,5 %: crea valor con holgura (+24 puntos), y el ROE ronda el 34-35 % con una deuda pequeña [A15]. El negocio casi no usa capital: el inmovilizado y el software son ≈ 50 M y el circulante es negativo; el 82 % del capital invertido es fondo de comercio de la compra de 2007 y de Quidco, y sin él el ROIC pasa del 190 %. La subida de 2021 a 2025 tiene dos causas: la amortización de intangibles comprados se acaba (21,1 M en 2023, 8,1 M en 2025) y el EBITDA crece más que el capital [A1, A5]. La única compra grande no ha rendido: Quidco costó 104,6 M y aportó 7,8 M de contribución en 2025 antes de costes compartidos, menos de un 6 % después de impuestos, por debajo del WACC [A7, A1]. Lo que puede bajar el ROIC no es el capital sino el margen: cada punto de coste por clic de Google sale del EBITDA [A3, A4].',
      confianza: 'Media',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+1,3 %, fijo) es el consenso (451,4 M [D3]) y el semestre: +0,8 % publicado y +6 % sin Travel, que dejó de consolidarse el 1-dic-2025 [A3]. Después, +3,5 % en 2027e-2028e (consenso +3,6 % y +3,7 % [D3]) con seguros que crecen con el número de cambios y no con las primas, Money y la energía; +3 % y +2,5 % hasta 2032e, por debajo del 9 % anual de 2021-2025 (inflado por Quidco y la inflación de primas de 2023) y cerca del 2,7 % del mercado [B1]. No suponemos crecimiento por la aplicación ni por SuperSaveClub.',
    margenes: 'Margen EBITDA del DCF = ajustado de la empresa menos el IVA irrecuperable que se repite: 31,2 % en 2026e (ajustado 32,2 %, ≈ 145,5 M, centro del consenso de 140-148 M [D7]) y 32,0-32,5 % después (ajustado 32,5-33,0 %). La palanca es el coste de personal (−11 % en 2025 con automatización [A1]); el freno, el coste por clic de Google, que bajó el margen bruto del 66,2 % al 63 % en dos años [A3]. No suponemos que el margen bruto se recupere: el ahorro de costes lo compensa.',
    inversion: 'Capex (software capitalizado) y pagos de arrendamientos del 2,9-3,0 % de las ventas (12,5 M en 2025 [A15]); amortización total del 4,8 % en 2026e que baja al 3,0 % cuando se acaba la de los intangibles comprados (8,1 M en 2025 [A1]). Circulante del −1,5 % de las ventas (−2,4 % en 2025; los cobros de energía y vida son más lentos [A3]).',
    wacc: 'Tasa libre del 5,30 % (gilt a 10 años, 16-oct-2026 [D4]); beta de 0,92, la ajustada mensual a 5 años frente al FTSE 250 (0,86 sin ajustar [D1]); prima del 5,5 % más 0,5 puntos por el riesgo de que la IA y Google cambien el canal (un solo país, un solo proveedor de tráfico); coste de la deuda del 6,0 % antes de impuestos (crédito renovable a tipo variable [A2]) con un peso del 5 %. WACC del 10,5 %. Con la prima implícita del mercado (4,2 % [D5]) sería del 9,4 %.',
    terminal: 'Crecimiento a perpetuidad del 2,0 %, igual a la inflación objetivo del Banco de Inglaterra: sin crecimiento real, porque el canal puede cambiar. El múltiplo de salida implícito (≈ 7,5-8 veces el EBITDA) está en el mínimo de su historia (6,8-12 veces en 2021-2025 [D1]).',
  },
  puente_comentarios: {
    '2026e': 'Semestre [A3]: +6 % sin Travel (seguros +4 % con más cambios de póliza aunque las primas de coche bajan un 5 %, Money y energía); Travel deja de consolidarse (−3 puntos de perímetro, «otros»).',
    '2027e': 'Volumen del 2,5 % (cambios de seguro de coche y hogar con primas ya bajas, préstamos y tarjetas, energía) y precio del 1 % (mezcla hacia productos de más comisión); consenso +3,6 % [D3].',
    '2028e': 'Volumen del 2 % y precio del 1,5 %, en línea con el consenso (+3,7 % [D3]); sin aportación de la aplicación ni del corredor propio.',
    '2029e': 'Volumen del 1,5 % y precio del 1,5 %: crecimiento del mercado [B1].',
    '2030e': 'Volumen del 1,5 % y precio del 1,5 %; cuota estable del 21 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (2,8 % medio) está muy por debajo del histórico (9 % anual en 2021-2025, con la compra de Quidco y la inflación de primas) y en línea con el mercado (2,7 % anual [B1]); la cuota implícita en 2030e (21,4 %) es la de hoy. El negocio no necesita capital para crecer: la reinversión neta es negativa y el ROIC es del 35 % [A15]. La prueba que importa no es el capital sino el canal: el crecimiento supone que Google sigue mandando tráfico a un coste que crece como las ventas. Pasa la prueba con la advertencia de que el foso se estrecha [B6].',
  dcf_lectura: 'El DCF da 2,36 GBP por acción, un 17,6 % sobre el precio, con un WACC del 10,5 % y un valor terminal que pesa el 60 %. El DCF inverso dice que el precio descuenta un crecimiento del −0,2 % anual con nuestro margen, frente al 3,0 % de nuestro base: el mercado ya cuenta con que las ventas no crezcan nunca más. La rentabilidad implícita en el precio es del 12,0 %, por encima del WACC (10,5 %) y de lo que pide el mercado (9,4 %). Con la prima implícita del mercado (4,2 %), el DCF sube a 2,74 GBP.',
  narrativas: {
    Bajista: 'Los asistentes de IA (ChatGPT, el modo IA de Google, Gemini) se convierten en la puerta de entrada a la compra de seguros y crédito: comparan y contratan sin pasar por MoneySuperMarket o lo hacen a cambio de una comisión mayor, y Google cobra más por el tráfico que queda. Ventas −1,5 % al año y margen del 29 %, con un WACC del 11 % y un crecimiento a perpetuidad del 0,5 %.',
    Base: 'Las ventas crecen un 3 % al año con seguros, Money y energía; el coste por clic sigue subiendo pero lo compensan la automatización y la mezcla; el margen sube medio punto. La IA es un canal más, no un sustituto.',
    Alcista: 'La aplicación, SuperSaveClub y el acuerdo con OpenAI convierten a MoneySuperMarket en el proveedor de datos de precios de los asistentes y bajan la dependencia de Google: un punto y medio más de crecimiento y uno más de margen.',
  },
  escenarios_comentario: 'La asimetría es pobre: el alcista vale 2,64 GBP (+31,6 %) y el bajista 1,41 (−29,7 %), con un 30 % de probabilidad para el bajista por el riesgo de IA. El precio está más cerca del bajista que del base porque el mercado ya descuenta ventas planas. El valor ponderado (2,18 GBP) queda un 8,7 % sobre el precio.',
  casos_12m: {
    Bajista: 'Ventas −1 % al año en 2027e-2028e y margen ajustado del 29 % por pérdida de tráfico gratuito y más coste por clic: BPA ajustado de 16,3 peniques en 2028e (−20 % frente al base) y el PER cae a 8,9 veces (base × 0,8, por debajo del mínimo de cinco años de 10 veces).',
    Base: 'Ventas +3,5 % en 2027e y 2028e, margen EBITDA ajustado del 32,8 %, gasto financiero de 4,5 M, impuesto del 25 % y 514,4 M de acciones sin recompras nuevas: BPA ajustado de 20,4 peniques en 2028e (+6,7 % anual desde los 17,9 de 2025) [P1].',
    Alcista: 'Un punto y medio más de crecimiento y uno más de margen: BPA de 21,7 peniques; el PER vuelve a la media larga adelantada (14,2 veces), por debajo del techo de la regla (base × 1,35).',
  },
  diferencia_consenso: 'Nuestro BPA ajustado de 2026e (18,3 peniques) queda un 2 % por debajo del consenso (18,7) y el de 2027e (19,4) un 3 % por debajo (20,0) [D2]: no incluimos recompras no anunciadas (la empresa recompró 30 M en 2025 y 25 M en 2026) y suponemos un gasto financiero algo mayor. En EBITDA estamos en el consenso (141 M en 2026e y 150 M en 2027e frente a 141 y 146 M ajustados [D3]).',
  objetivo_comentario: 'El objetivo a 12 meses (2,18 GBP ponderado; 2,26 en el base) da un 15,0 % de rentabilidad ponderada con el dividendo (6,3 %) y un 19,0 % en el base (16 % y 20 % con el precio de hoy, 1,99 GBP), justo en el límite de los umbrales de compra (15 % y 12 %) [P1]. El base no pide que el PER suba mucho: de 10,4 a 11,1 veces, a mitad de camino hacia su mediana adelantada de cinco años (11,9). Lo frágil es el BPA: con un 10 % menos, la rentabilidad cae al 5-9 %, y con un 5 % más de precio, al 10 %. Comprar por debajo de 2,01 GBP según la regla; la compra robusta pide 1,82 GBP.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF es el método más fiable para un negocio de caja estable sin capital, pero depende del canal; los escenarios recogen la asimetría que da la IA. Los comparables pesan poco porque no hay ningún comparador puro cotizado: los portales de anuncios (Auto Trader, Rightmove) cotizan a 12-17 veces con márgenes del doble y los captadores de clientes de EE. UU. a 4-7 veces, con márgenes de un tercio; la mediana (8,9 veces) da 1,76 GBP [D2]. Las transacciones no pesan: la última grande (GoCo, 2020) es de antes de la IA generativa. El valor ponderado (2,18 GBP) queda un 8,7 % sobre el precio.',
  multiplos_comentario: 'MONY cotiza a 7,5 veces el EBITDA y a 12,9 veces el BPA publicado de los últimos 12 meses, un 21 % y un 15 % por debajo de su media de cinco años y en el percentil 40 [D1]. En base ajustada adelantada (la de la regla) el descuento es mayor: 10,4 veces frente a una mediana de 11,9 y una media larga de 14,2 [P1]. Lo estructural es el riesgo de IA: desde la presentación de Insurify en ChatGPT (feb-2026) el mercado paga por MONY como por un negocio sin crecimiento terminal, y los tipos (gilt al 5,3 %) han subido el coste del capital [B7, D4].',
  comparables_comentario: 'MONY cotiza a 10,2 veces el BPA de los próximos 12 meses y 7,5 veces el EBITDA, en la mitad baja del mapa: por encima de los captadores de clientes de EE. UU. (EverQuote 7,4x, MediaAlpha 7,0x, LendingTree 4,0x) y de Future (2,8x), y muy por debajo de los portales de anuncios (Auto Trader 12,1x, Rightmove 15,5x, Scout24 16,8x) [D2, B13]. El descuento frente a los portales se justifica: ellos tienen el inventario (los anuncios) y MONY compra su tráfico a Google, con márgenes de la mitad. La prima sobre los estadounidenses también: margen EBITDA del 32,5 % frente al 7-11 %, ROIC del 35 % y caja neta casi cero. El múltiplo razonable es el de su historia, no el de este grupo: 10-12 veces el BPA.',
  transacciones_comentario: 'Hay pocas operaciones y ninguna reciente: Future pagó por GoCo en 2020 20,7 veces el EBITDA ajustado de 2019 (deprimido) y 4,4 veces las ventas, con una prima del 24 % [D9, D8]; RVU compró Confused.com y sus hermanas europeas en 2021 por 508 M sin cifras de beneficio [D11]; MONY pagó por Quidco 7,6 veces la contribución de 2022 [D10]. Son de antes de la IA generativa y no se usan en la síntesis. Lo relevante hoy es Moltiply (dueña de Segugio en Italia) con el 12 % de MONY [C4]: una oferta pagaría prima de control, pero no hay ninguna anunciada.',
  bolsa: {
    comentario: 'La acción ha perdido frente al índice en casi todos los plazos: −8,3 % anual en tres años y −3,2 % anual en diez, en precio, frente al +12,7 % y +3,1 % del FTSE 250 [D1]. Lo explican tres golpes: el colapso del cambio de comercializadora de energía en 2021-2022, la caída de las primas de coche en 2024-2025 (−31 % en 2024) y, en 2026, el miedo a la IA: mínimo de 13 años en 153 peniques el 10-feb tras la aplicación de Insurify en ChatGPT [B7]. Desde ahí ha recuperado un 31 % con resultados en línea y recompras. Beta de 0,86 y volatilidad del 29 %; posición corta del 2,4 % [D12].',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 2.5, var_3m_pct: 3.9, var_6m_pct: 17.2, var_12m_pct: 5.1, dist_max_52s_pct: -5.8, dist_min_52s_pct: 38.8, dist_max_historico_pct: -29.3, tendencia: 'alcista', volatilidad_60d_pct: 33.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'feb 2026', var_pct: -8.6, causa: 'Insurify lanza una aplicación de comparación de seguros de coche dentro de ChatGPT: −8,6 % el 10-feb y mínimo de 13 años (153 peniques); Future (Go.Compare) también cae. Berenberg lo llama exagerado [B7, B8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr 2026', var_pct: 18.6, causa: 'Rebote del mes hasta el 30-abr tras la venta por la IA de febrero, con la junta del 30-abr y la recompra de 25 M en marcha [C2, P2]; no hay noticia nueva que lo explique por sí sola.', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: -5.0, causa: 'Resultados del semestre (21-jul): ingresos +1 % y margen bruto del 63 % (66 % un año antes) por el coste por clic; −5 % ese día y Berenberg baja el objetivo de 275 a 250 peniques [A3, E2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep 2026', var_pct: -15.3, causa: 'Caída del 7,8 % el 23-sep con 5,3 M de acciones sin noticia de la empresa: ola de miedo a la «IA agéntica» en los portales británicos (Auto Trader y Rightmove −3,3 % ese día); peor mes en seis (−15,3 % hasta el 28-sep), recuperado después [B9, E3, P2].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-16', tipo: 'accionista de referencia', hecho: 'JPMorgan Asset Management pasa del 5 % (5,82 %) [C6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-05', tipo: 'accionista de referencia', hecho: 'BlackRock sube al 5,92 % [C5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-01', tipo: 'directivos', hecho: 'Emma Lloyd entra en el consejo como independiente y sale Sarah Warby (2-oct) [C3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-30', tipo: 'directivos', hecho: 'Recompra de 25 M GBP terminada en agosto; 511,6 M de acciones en circulación, sin autocartera [A14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-21', tipo: 'resultados', hecho: 'Semestre: ingresos de 227,1 M (+1 %; +6 % sin Travel), EBITDA ajustado de 75,5 M (+1 %), BPA ajustado de 9,7 peniques (+4 %), dividendo a cuenta +1 %; guía anual en el consenso [A3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-09', tipo: 'accionista de referencia', hecho: 'Moltiply Group (Italia, dueña de Segugio) sube al 12,02 %: posible interés estratégico; no hay oferta ni declaración de intenciones, y el código de OPAs británico obliga a ofertar al pasar del 30 % [C4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-08', tipo: 'directivos', hecho: 'Solo compras del plan de empleados, una venta para impuestos (Phillips, 38.124 acciones) y un «bed and ISA» del consejero delegado; en febrero, un consejero no ejecutivo compró 20.000 GBP a 158 peniques [C7, C8, C9, C10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-30', tipo: 'directivos', hecho: 'Junta: informe de remuneración aprobado con el 97,2 % y política con el 91,2 % [C2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-12-03', tipo: 'resultados', hecho: 'Comunicado de diciembre (≈ 3-dic, como el del 3-dic-2025 [C12]) y resultados anuales hacia el 22-feb-2027 (fecha estimada).', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-02-22',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sube un 17 % en seis meses y está a un 6 % del máximo de 52 semanas, con tendencia alcista y sin avisos P de la herramienta [P2]. Las caídas fuertes del año (febrero y septiembre) son de miedo a la IA en todo el sector, sin hecho nuevo de la empresa, y la de julio es de los resultados [B7, B9, A3]. No hay colocaciones, ampliaciones ni ofertas pendientes; Moltiply (12 %) es más una posible prima que un riesgo de venta. El próximo hecho con fecha es el comunicado de diciembre, a más de 15 días: no cambia.',
    },
  },
  catalizadores: {
    items: [
      { fecha: '2026-12-03', evento: 'Comunicado de diciembre (estimado)', efecto: 'Confirmación del EBITDA de 2026 (consenso 140-148 M) y del coste por clic del segundo semestre', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02-22', evento: 'Resultados de 2026 (estimado)', efecto: 'Margen bruto del año, guía de 2027, dividendo final y nueva recompra', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Decisión de la CMA sobre la conducta de Google en el buscador (estatus de mercado estratégico)', efecto: 'Reglas de clasificación justa podrían frenar el coste por clic y proteger el tráfico gratuito', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Continuo', evento: 'Despliegue del modo IA de Google y de las compras dentro de ChatGPT en el Reino Unido', efecto: 'Menos tráfico gratuito y más coste por clic, o un canal nuevo si MSM es proveedor de los asistentes', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha', evento: 'Moltiply (12 %) sube su participación o presenta una oferta', efecto: 'Prima de control', probabilidad: 'Baja', sentido: '+' },
      { fecha: '2027', evento: 'Ciclo de primas de coche: las primas bajan desde 2024', efecto: 'Más cambios de póliza cuando las primas suben; menos comisión media cuando bajan', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Continuo', evento: 'Recompras con el flujo libre sobrante', efecto: '+2-3 % de BPA al año si se repiten (no están en el base)', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'IA: los asistentes (ChatGPT, modo IA de Google, Gemini) comparan y contratan seguros y crédito sin pasar por la web de MoneySuperMarket', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 a −50 % si se pierde la mitad del tráfico gratuito', mitigante: 'Acuerdo con OpenAI, aplicación en ChatGPT, base de 12,7 M de usuarios activos y SuperSaveClub; las aseguradoras necesitan un canal neutral que ya les funciona [A11, A12]', senal: 'Usuarios activos y visitas orgánicas a la baja dos semestres seguidos; tráfico de los modelos de lenguaje que no crece' },
      { riesgo: 'Dependencia de Google: el coste por clic subió un 21 % en 2024 y en 2025 y ≈ 8 % a mitad de 2026; los AI Overviews empujan los resultados orgánicos hacia abajo', tipo: 'Proveedor', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−10 a −15 % por cada 2 puntos de margen bruto', mitigante: 'Marcas propias con tráfico directo (MoneySavingExpert, aplicación, SuperSaveClub), automatización de costes y queja ante la CMA [B10, A3]', senal: 'Margen bruto por debajo del 62 %' },
      { riesgo: 'Ciclo de primas de seguros de coche: las primas bajan desde 2024 (−9 % en 2025, −5 % en el semestre de 2026) y la comisión va con ellas', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Con primas bajas hay menos cambios pero comisión fija por póliza; Money y energía compensan [A1, A3]', senal: 'Seguros por debajo del 0 % de crecimiento dos semestres seguidos' },
      { riesgo: 'Competencia: Compare the Market (más grande y más rentable), Confused.com (RVU) y Go.Compare (Future) pujan por las mismas palabras clave en Google', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Las cinco primeras tienen ≈ 75 % del mercado; MSE y Quidco diferencian [B1, B2, B3]', senal: 'Pérdida de cuota en seguros de coche' },
      { riesgo: 'IVA con HMRC: el método de recuperación acordado en 2012 se retiró en 2024 y la disputa sigue', tipo: 'Fiscal', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−1 a −2 %', mitigante: 'Provisionado (5,6 M tras impuestos) y restado en el puente [A3]', senal: 'Nuevas liquidaciones por encima de lo provisionado' },
      { riesgo: 'Asignación de capital: Quidco no rinde (contribución de 7,8 M sobre 104,6 M pagados) y la dirección busca compras «estratégicas»', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −5 %', mitigante: 'Recompras y dividendo reparten casi todo el flujo libre [A1]', senal: 'Una compra grande pagada con deuda' },
      { riesgo: 'Múltiplo: el PER adelantado ha cotizado entre 10 y 20 veces en nueve años; si el mercado trata a MONY como un negocio en declive, puede quedarse en 8-9 veces', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−15 a −20 %', mitigante: 'Dividendo del 6,3 % y rentabilidad por flujo libre del 8 %', senal: 'Caída del PER sin caída del BPA' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 40 %. No fue un mal año de seguros, sino de canal: Google lanzó el modo IA por defecto en el Reino Unido y los anuncios de comparación pasaron debajo de una respuesta que ya daba precios; ChatGPT empezó a cerrar pólizas con las aseguradoras directamente, cobrando una comisión menor que la de MoneySuperMarket. Las visitas orgánicas cayeron un 25 % y, para mantener el volumen, MONY pagó más por clic: el margen bruto bajó al 58 % y el EBITDA a 125 M. La dirección culpó a las primas y anunció una compra para «diversificar». Las señales estaban: coste por clic subiendo un 21 % al año, usuarios activos −8 % en 2025 y el reconocimiento de que los modelos de lenguaje mandaban «tráfico muy limitado».',
    ia: {
      exposicion: 'Alta', sentido: 'Amenaza', efecto_valor: '−30 a −50 % a 3-5 años en el peor caso; −30 % en nuestro bajista',
      comentario: 'Es el riesgo central de la tesis. MONY vive de ser la puerta de entrada a la compra de seguros, crédito y energía: el cliente busca en Google, entra en MoneySuperMarket, compara y la aseguradora le paga una comisión por póliza. Un asistente de IA que responde «la póliza más barata para tu coche es esta» y la contrata sin salir del chat le quita las dos cosas: el tráfico gratuito y el papel de comparador. Ya pasa en parte: Insurify compara seguros de coche dentro de ChatGPT desde febrero (la acción cayó un 8,6 % ese día [B7]); los AI Overviews de Google empujan los resultados orgánicos hacia abajo y han subido el coste por clic un 21 % al año en 2024 y 2025, bajando el margen bruto del 66 % al 63 % [A3, A11]; la dirección admite que los modelos de lenguaje le mandan «tráfico muy limitado» aunque una de cada cinco búsquedas británicas pasa ya por ellos [A11]. En contra: los asistentes necesitan precios en tiempo real que solo dan las aseguradoras a través de los comparadores (MONY tiene acuerdo con OpenAI y aplicación en ChatGPT [A12]); la regulación británica (FCA, consumer duty) pide comparación neutral; y MSE tiene una base propia de lectores. Pero el poder de negociación pasa a quien controla al usuario, y no es MONY: aunque sobreviva como proveedor de datos, cobrará menos por cliente. Por eso el bajista tiene un 30 % y la prima de riesgo lleva 0,5 puntos más.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Tráfico', pregunta: '¿Qué parte de las visitas de 2026 llegan sin pago (directas, aplicación, MSE, correo) y cómo han evolucionado las orgánicas de Google desde los AI Overviews?', por_que: 'Es la medida directa del riesgo de IA; la empresa no la publica.' },
      { tema: 'Asistentes de IA', pregunta: '¿Cuántas pólizas y qué ingresos vienen de la aplicación en ChatGPT y del acuerdo con OpenAI, y quién se queda la comisión?', por_que: 'Decide si la IA es canal o sustituto.' },
      { tema: 'Coste por clic', pregunta: '¿Cuál fue el coste por clic del segundo semestre de 2026 y qué margen bruto espera la dirección para 2027?', por_que: 'Cada punto de margen bruto es ≈ 4,5 M de EBITDA.' },
      { tema: 'Moltiply', pregunta: '¿Ha habido contactos con Moltiply sobre su 12 % y qué intención ha comunicado?', por_que: 'Una oferta daría prima; una venta en bloque, presión.' },
      { tema: 'IVA', pregunta: '¿Cuál es la exposición máxima con HMRC por los años abiertos y cuándo se resolverá?', por_que: 'Ya restamos 5,6 M; una cifra mayor iría al puente.' },
      { tema: 'Quidco', pregunta: '¿Qué plan hay para Quidco tras dos años de caída de ingresos (−13 % en el semestre)?', por_que: 'Rinde por debajo del WACC; venderlo o integrarlo cambiaría poco el valor pero diría mucho de la disciplina.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Comprar', conviccion: 'Baja', justificacion_recomendacion: 'La regla vigente da Comprar (15,0 % ponderado y 19,0 % en el base al cierre del 20-oct; 16 % y 20 % al precio de hoy y valor intrínseco un 9 % sobre el precio), pero la señal es frágil: la v2 da Mantener, el caso con el BPA un 10 % menor no llega al 12 % y el riesgo de IA puede bajar el BPA más que eso. La acción robusta es Mantener; la compra robusta pide 1,82 GBP.', horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Comprar según la regla, con convicción baja, y no es compra robusta. El objetivo a 12 meses es de 2,18 GBP ponderado (nuestro BPA ajustado de 2028e × el PER de la regla común), un 15,0 % de rentabilidad con el dividendo y un 19,0 % en el caso base (16 % y 20 % al precio de hoy), justo en el umbral de compra [P1]. El valor intrínseco (2,18 GBP) queda un 9 % sobre el precio. Pero la regla al cierre (v2) da Mantener y, con el BPA un 10 % más bajo, la rentabilidad cae al 5-9 %: la acción robusta es Mantener y la compra robusta pide 1,82 GBP.

**El negocio.** MONY es el segundo comparador de precios del Reino Unido (≈ 21 % del mercado [B1]): MoneySuperMarket compara seguros, crédito y energía y cobra una comisión por cada póliza o producto contratado; MoneySavingExpert da tráfico propio y Quidco devuelve parte de las compras. Gana un 32 % de margen EBITDA ajustado con casi ningún capital, pero depende de Google para buena parte de sus visitas y paga cada vez más por ellas.

**Finanzas.** Ventas de 446,3 M en 2025 (+2 %) y EBITDA ajustado de 145,1 M; el semestre de 2026 crece un 6 % sin Travel [A1, A3]. El margen bruto bajó del 66 % al 63 % por el coste por clic, y el margen se sostiene con un 11 % menos de coste de personal. ROIC del 35 % (+24 puntos sobre el WACC) y deuda neta pequeña (31,8 M en junio). Reparte casi todo: dividendo del 6,3 % y recompras de 55 M en dos años [A15].

**Equipo y gobierno.** Peter Duffy, consejero delegado desde 2020, ha cumplido la guía de EBITDA tres años seguidos [C11]. Consejo mayoritariamente independiente y remuneración aprobada con el 97 % [C2]; un consejero compró acciones en febrero a 158 peniques [C10]. Moltiply (12 %) es el mayor accionista [C4].

**Valoración.** El DCF da 2,36 GBP (+17,6 %) con un WACC del 10,5 % que ya lleva 0,5 puntos por el riesgo de IA; el DCF inverso dice que el precio descuenta ventas planas para siempre (−0,2 % anual). La regla a 12 meses sube el PER de 10,4 a 11,1 veces, por debajo de su mediana adelantada (11,9). Los comparables no ayudan: no hay ningún comparador puro cotizado.

**Riesgos y catalizadores.** El riesgo central es la IA: si los asistentes comparan y contratan sin pasar por MoneySuperMarket, el negocio pierde el tráfico gratuito y su papel; el bajista (−30 %) tiene un 30 % de probabilidad, y en el peor caso la pérdida es del 30-50 %. Después, Google (coste por clic +21 % al año), el ciclo de primas de coche y Compare the Market. A favor: dividendo, recompras, una posible oferta de Moltiply y la decisión de la CMA sobre Google.

**Qué cambiaría la decisión.** Compra robusta por debajo de 1,82 GBP. Un margen bruto por debajo del 62 % o dos semestres de caída de usuarios activos llevarían a Mantener o Vender aunque el precio baje; un coste por clic estable y la aplicación en ChatGPT con ingresos medibles subirían la convicción.`,
    tesis: 'MONY es el segundo comparador de precios del Reino Unido, con un 32 % de margen EBITDA, un ROIC del 35 % y un dividendo del 6,3 %, a 10 veces el BPA ajustado adelantado: el precio descuenta ventas planas para siempre. La tesis es que la IA cambia el canal pero no elimina la necesidad de un comparador neutral con los precios de las aseguradoras, y que la caja paga la espera; el riesgo es que la IA le quite el tráfico y el papel.',
    vision_diferencial: {
      mercado_descuenta: 'Que MONY es un negocio en declive por la IA: ventas planas o a la baja y un PER de 10 veces, el mínimo de su historia; los analistas esperan 2,34 GBP, un 17 % sobre el precio.',
      nuestra_vision: 'Coincidimos en el BPA de 2026 y 2027 (2-3 % por debajo del consenso, sin recompras) y en que la IA es una amenaza real; discrepamos en el plazo: el base supone crecimiento del 3 % porque los asistentes necesitan los datos de los comparadores, y el bajista con un 30 % recoge el caso contrario.',
      por_que: 'El precio ya está cerca del bajista; un negocio sin capital que genera un 8 % de su valor en caja cada año puede devolver mucho mientras se resuelve la incertidumbre. Pero no tenemos ventaja para saber cómo acaba la IA, y por eso la convicción es baja y la compra robusta pide un 9 % menos.',
    },
    a_favor: [
      '**Caja y dividendo**: rentabilidad por flujo libre del 8 % y dividendo del 6,3 %, con recompras.',
      '**ROIC del 35 %**: +24 puntos sobre el WACC, casi sin capital.',
      '**Precio de declive**: el DCF inverso descuenta ventas planas para siempre; PER adelantado de 10 veces.',
      '**Guía cumplida**: tres años en el consenso de EBITDA; semestre +6 % sin Travel.',
      '**Moltiply con el 12 %**: posible comprador estratégico.',
    ],
    en_contra: [
      '**IA**: los asistentes pueden comparar y contratar sin pasar por la web; bajista −30 % con un 30 % de probabilidad.',
      '**Google**: coste por clic +21 % al año en 2024-2025; margen bruto del 66 % al 63 %.',
      '**Señal frágil**: v2 da Mantener y con el BPA −10 % la rentabilidad cae al 5-9 %.',
      '**Primas de coche a la baja** y competencia de Compare the Market, más grande y rentable.',
      '**Quidco**: la única compra grande rinde por debajo del WACC.',
    ],
    que_vigilar: 'La tesis depende de que el coste por clic deje de comerse el margen bruto y de que los asistentes de IA usen a MoneySuperMarket como proveedor en vez de sustituirlo. La señal en contra sería un margen bruto por debajo del 62 % o una caída de usuarios activos durante dos semestres; la señal a favor, ingresos medibles de la aplicación en ChatGPT.',
    cambiaria_recomendacion: [
      'Precio por debajo de 1,82 GBP: compra robusta (v3 y v2 en Comprar aun con el BPA −10 %).',
      'Precio por encima de 2,01 GBP: Mantener; por encima de 2,56 GBP: Vender.',
      'Margen bruto por debajo del 62 % o usuarios activos −5 % dos semestres seguidos: rebajar a Mantener.',
      'Ingresos medibles de los asistentes de IA y coste por clic estable: subir la convicción.',
      'Oferta de Moltiply o de otro comprador: revisar con la prima de control.',
    ],
    kpis_seguimiento: [
      { kpi: 'Margen bruto', nivel_actual: '63 % (1S26)', umbral_alerta: '< 62 %', por_que: 'Mide el coste de Google.' },
      { kpi: 'Usuarios activos', nivel_actual: '12,7 M (2025)', umbral_alerta: '−5 % en dos semestres', por_que: 'Mide si el tráfico se va a los asistentes.' },
      { kpi: 'EBITDA ajustado', nivel_actual: '145,1 M (2025); consenso 2026 ≈ 145 M', umbral_alerta: '< 140 M en 2026', por_que: 'Base de nuestro objetivo.' },
      { kpi: 'Crecimiento de seguros', nivel_actual: '+4 % (1S26)', umbral_alerta: '< 0 % dos semestres', por_que: 'Mide el ciclo de primas y la cuota.' },
      { kpi: 'Participación de Moltiply', nivel_actual: '12,0 %', umbral_alerta: 'Venta o > 25 %', por_que: 'Riesgo de colocación o prima de oferta.' },
    ],
  },
};
