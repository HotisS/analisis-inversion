// Textos del analista principal (EssilorLuxottica, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de la empresa, la AMF, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados (2023-2026), de Stock Analysis, Fintel, Yahoo y Kalkine citados en la búsqueda y de la prensa financiera, cruzados cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Los comparables y las transacciones se toman de los informes del repo de Hoya (14-oct), Cooper y Fielmann (9-oct), convertidos a EUR con los tipos implícitos en esos informes (180,2 JPY y 1,1186 USD por EUR). El balance histórico está incompleto: el ROIC, el Altman Z y el Piotroski del motor no son fiables y damos aparte el ROIC sobre el capital total. Las amortizaciones de 2023 y 2025 y los pagos de arrendamientos son estimaciones propias explicadas en las cuentas. El puente usa la deuda neta con arrendamientos a 30-jun-2026 (13.390 M) [A4] sin desglose. El objetivo a 12 meses y el PER histórico van en BPA ajustado (sin la amortización de intangibles de las compras), la base que publica la empresa y que usa el mercado.',

  controles_explicados: [
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'El objetivo medio (199,75 EUR) es la media de ocho objetivos revisados en septiembre-octubre; nuestro base (160,63) es menor por el múltiplo: usamos el PER actual (18,4x), no el histórico (27-40x) que siguen implícitamente los analistas. Ver diferencia_consenso.' },
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con R² de 0,27 la regresión no se usa; los comparables mezclan óptica, audición y tecnología médica.' },
    { control: 'Fuentes sin citar', explicacion: 'Fuentes de contexto leídas para cuadrar cifras (Fintel, Yahoo, Kalkine, comunicados de 2025) que sostienen datos de las tablas.' },
  ],

  parches: [],

  secciones: {
    comparables: {
      comentario: 'EssilorLuxottica cotiza a 12,5 veces el EBITDA de los últimos 12 meses y 10,5 veces el de los próximos, en la mediana de los comparables (11,7x y 10,2x), y a 22,7 veces el BPA publicado de los próximos 12 meses frente a 18,7x de mediana [D16-D21]. Ese PER exagera la prima: el BPA publicado lleva unos 1,8 EUR por acción de amortización de intangibles de la fusión, mientras que la mayoría de los comparables (Hoya, Sonova, Demant, Cooper) cotizan sobre beneficio ajustado; con el BPA ajustado el PER es de unas 18-20 veces, en línea con la mediana. Por eso el valor por PER (120,40 EUR) es un suelo y el de EV/EBITDA (140,58 EUR) la referencia. El margen EBITDA (22,9 %) está en la mediana (24 %) y el crecimiento esperado (6,3 %) también; la prima de Hoya (31,7x) se debe a sus semiconductores [D16]. La regresión múltiplo-crecimiento no explica nada (R² 0,27) y no se usa.',
    },
    rentabilidad: null,
  },

  rentabilidad_comentario: 'El ROIC del motor (11,6 % en 2025) está inflado porque el balance que tenemos está incompleto. Medido sobre el capital total (patrimonio de 39.493 M más la deuda neta de 13.390 M), el rendimiento es bajo: un 4,8 % con el EBIT publicado y un 6,3 % con el EBIT ajustado de 4.459 M, ambos por debajo del WACC del 7,32 % [A1, A7]. Es la huella de haber pagado con prima la fusión de 2018 y GrandVision: el fondo de comercio y los intangibles suman 40.766 M, el 64 % del activo [A7]. Sin ellos, el negocio operativo rinde más del 25 % sobre unos 12.000 M de capital tangible (estimación propia), señal de foso. El ROIC incremental histórico que calcula el motor (4 %) confirma que el crecimiento reciente, muy apoyado en compras (Supreme, Heidelberg), ha creado poco valor. Hoya, su rival en lentes, rinde el 45 % sin fondo de comercio relevante [D16].',

  dcf_justificacion: {
    crecimiento: 'Partimos de 2026e con un +6,0 % publicado (fijo: dos trimestres cerrados): +9,7 % a tipo constante en el 1S26 y un segundo semestre más flojo por la base de comparación, menos unos 3 puntos de dólar [A3]. Para 2027-28 usamos 7,5 % y 7,0 %, por debajo del consenso (32.871 M en 2027e, +8,6 %) [D4] y del crecimiento orgánico de 2025 (11,2 %), porque suponemos que las gafas con IA crecen menos [A21]. Bajamos al 3 % en 2035, cerca del terminal. La media de la proyección es del 5,2 %, frente al 6-11 % a tipo constante de 2024-2026.',
    margenes: 'El margen EBITDA publicado fue del 22,9 % en 2025, con los aranceles (≈300 M) y la mezcla de gafas con IA en contra [A1, A21]. El consenso de 2026 (7.221 M) implica un 23,9 %; usamos 23,8 % y subimos medio punto al año hasta el 25 %, coherente con el margen operativo ajustado del 18,6 % del 1S26 (+80 pb) [A3, D4]. No llegamos al objetivo antiguo del 19-20 % de margen ajustado. El margen de 2025 es el más bajo desde 2022 (24,8 % en 2022 según nuestras cifras).',
    inversion: 'La amortización (10,8 % de las ventas en 2026e) incluye unos 2,5-3 puntos de intangibles de la fusión, que no hay que reponer; baja al 7 % en 2035. El capex (8,7 % al principio, 7,5 % al final) suma el capex del estado de flujos (5,4 % de las ventas en 2025) y las altas de derechos de uso (≈3,3 %, igual a los pagos de arrendamientos), porque los arrendamientos están en la deuda del puente [A6]. En el último año el capex (7,5 %) supera a la amortización (7,0 %). El circulante se mantiene en el 25,5 % de las ventas: existencias más clientes, sin proveedores (no los tenemos), lo que exagera algo la inversión en circulante y es conservador.',
    wacc: 'Bund a 10 años del 3,2 % (agosto de 2026, nivel más alto desde 2011) [D31]; beta de 0,9, por encima de la de Yahoo para la línea extrabursátil (0,55) y en línea con la histórica de la línea de París (0,90) [D32]; prima de mercado del 5,5 %; sin prima adicional (vende en todo el mundo). Coste de la deuda del 3,5 % antes de impuestos y peso de la deuda del 15 % (13.390 M sobre 67.239 M de capitalización más deuda). WACC del 7,32 %.',
    terminal: 'Gordon con un 2,5 % de crecimiento: inflación del euro del 2 % más medio punto real, por debajo de la tasa libre (3,2 %) menos medio punto. El valor terminal pesa el 68 % del valor. Implica un múltiplo de salida de unas 12-13 veces el EBITDA, en línea con lo que hoy pagan el mercado (12,5x) y los comparables (11,7x) [D16-D21].',
  },
  puente_comentarios: {
    '2026e': 'Volumen (gafas con IA que casi se duplican en el 2T, miopía +24 %) y precio y mezcla en lentes dan +9 % a tipo constante; el dólar resta unos 3 puntos [A3, A18].',
    '2027e': 'Volumen del 4,5 % (lentes, tiendas propias, gafas con IA a menor ritmo), 2,5 % de precio y medio punto de compras pequeñas.',
    '2028e': 'Volumen del 4,5 % y precio del 2,5 %, por debajo del 6-11 % orgánico de 2024-2026 [A1, A14].',
    '2029e': 'El volumen se modera al 3,5 %; precio en línea con la inflación más mezcla.',
    '2030e': 'Volumen del 3 % (envejecimiento y miopía) y precio del 2,5 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La proyección pide un 5,2 % de crecimiento medio, por debajo de lo que la empresa ha hecho sin compras (6,0 % en 2024, 11,2 % en 2025 y 9,7 % en el 1S26 a tipo constante) [A1, A3, A14]. El motor no puede hacer la prueba de reinversión porque la amortización incluye unos 800 M de intangibles de la fusión que no hay que reponer (reinversión del 3 % del NOPAT): hecha a mano, el capex con derechos de uso (8,2 % medio) supera a la amortización sin esos intangibles (≈7,5-8 %), así que la proyección sí financia el crecimiento. El poder de precios está demostrado en lentes (margen bruto ajustado del 61 %) y el foso es amplio; la cuota no la conocemos (mercado_final nulo) y el riesgo está en las gafas con IA, no en el núcleo.',
  dcf_lectura: 'El DCF da 174,69 EUR por acción (rango de 143,90 a 221,35 con el WACC y el crecimiento terminal ±0,5 puntos), un 19,4 % sobre el precio, con el valor terminal en el 68 %. El DCF inverso dice que a 146,30 EUR el mercado descuenta un crecimiento anual del 2,3 % en 2027-2035 (frente a nuestro 5,1 %) con un margen EBITDA del 22,8 %, el de 2025, o una rentabilidad implícita del 8,1 %, por encima de nuestro WACC del 7,32 %. Es un supuesto conservador: la empresa nunca ha crecido tan poco sin una pandemia, y el margen operativo ajustado ya sube en 2026. El precio descuenta que las gafas con IA no aportan y que los aranceles se quedan; no descuenta que el núcleo de lentes siga creciendo al 5-6 %. Con la prima implícita del mercado (4,2 %) el DCF sube a 229,69 EUR: la acción está barata frente al mercado, pero no tanto frente a un coste del capital exigente.',
  narrativas: {
    Bajista: 'Las gafas con IA se estancan ante Google, Samsung y Apple, los aranceles se quedan y el lujo sigue flojo: el crecimiento cae 2,5 puntos al año y el margen EBITDA 1,5 puntos, como en 2025 cuando los aranceles y la mezcla le quitaron 70 pb de margen ajustado.',
    Base: 'El núcleo de lentes y tiendas crece al 6-7 % con precio y mezcla, las gafas con IA crecen más despacio y el margen EBITDA sube al 25 % en 2030.',
    Alcista: 'Las gafas con IA y el control de miopía mantienen el crecimiento cerca del 9 % y el margen recupera el camino del antiguo objetivo del 19-20 % de margen operativo ajustado.',
  },
  escenarios_comentario: 'En el DCF, el bajista (122,34 EUR) pierde un 16,4 % y el alcista (201,75 EUR) gana un 37,9 %: asimetría de 2,31 veces, favorable. A 12 meses, con el PER de la regla común, la asimetría es parecida (bajista −16,9 %, alcista +55,8 %), pero el bajista pesa un 30 % porque la desaceleración de las gafas con IA ya se está viendo en los recortes de los analistas [D7-D10].',
  suma_partes_comentario: 'No aplica: los segmentos (Professional Solutions y Direct to Consumer) no publican resultado y comparten marcas y fábricas; las gafas con IA no se desglosan.',
  diferencia_consenso: 'Nuestro base a 12 meses (160,63 EUR) queda un 19,6 % por debajo del objetivo medio de los ocho analistas que han revisado en septiembre-octubre (199,75 EUR; 157-260). El BPA no explica la diferencia: nuestro BPA publicado de 2027e (≈6,45 EUR) está cerca del consenso de MarketScreener (6,62) [D4]. La explica el múltiplo: aplicamos el PER actual (18,4x el BPA ajustado de 2027e) porque es menor que la mediana de cinco años, mientras que los objetivos de los analistas implican 22-25 veces, a medio camino de la historia. La tendencia de los objetivos es a la baja y algunos ya están por debajo de nuestro base (Deutsche Bank 157, Goldman 165) [D7-D9].',
  objetivo12m_comentario: 'Con la regla común, el objetivo ponderado es de 160,39 EUR (+12,4 % con el dividendo del 2,7 %) y el base de 160,63 (+12,5 %): Mantener, con la ponderada a 2,6 puntos del umbral de compra (15 %). El valor intrínseco de la síntesis (158,34 EUR) y el DCF (174,69 EUR) están algo por encima del objetivo a 12 meses; la distancia es pequeña, así que no hace falta una tesis a varios años. Lo que la cerraría es que las ventas del 3T (20 de octubre) y la guía de 2027 dejen de bajar las estimaciones. Compraríamos por debajo de 142,95 EUR.',
  valoracion_comentario: 'Pesamos el DCF un 40 %, los escenarios un 30 % y los comparables un 30 %; las transacciones, nada (Delfin controla el 32,4 %, no hay opa posible). El DCF es el método más fiable aquí porque el negocio es estable y genera caja (2.800 M de FCF en 2025) [A1]. Los comparables dan menos (120-141 EUR) porque el PER se aplica a un BPA publicado lastrado por la amortización de intangibles, y el EV/EBITDA de los próximos 12 meses queda en la mediana. La dispersión (106-245 EUR entre métodos) es amplia y el centro de gravedad está en 155-175 EUR, un 6-20 % por encima del precio.',

  catalizadores: {
    items: [
      { fecha: '20-oct-2026', evento: 'Ventas del 3T26 [D33]', efecto: 'La prueba del segundo semestre con base de comparación alta; un crecimiento a tipo constante por debajo del 7 % confirmaría los recortes', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía', efecto: 'Margen operativo ajustado del año y objetivos de 2027; una guía cuantitativa devolvería visibilidad', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Primavera de 2027', evento: 'Junta de Delfin y renovación de su presidencia', efecto: 'Si Milleri deja la presidencia del holding, riesgo de cambio en la dirección de EssilorLuxottica', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027', evento: 'Lanzamiento de gafas con IA de Apple y de Google con sus socios', efecto: 'Mide la ventaja de la alianza con Meta', probabilidad: 'Media', sentido: '−' },
      { fecha: '2026-2027', evento: 'Negociación arancelaria UE-EE. UU.', efecto: 'Un arancel menor devolvería parte de los 300 M de coste de 2025', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Desaceleración de las gafas con IA y competencia de Google, Samsung y Apple', tipo: 'Competitivo', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−17 % (bajista a 12 meses)', mitigante: 'Alianza con Meta y marcas Ray-Ban y Oakley; el núcleo de lentes no depende de ellas', senal: 'Crecimiento de las gafas con IA por debajo de un dígito o precios de entrada a la baja (Meta Glasses desde 299 USD) [A21]' },
      { riesgo: 'Gobierno: disputa entre el heredero que controla Delfin y el presidente y consejero delegado', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (descuento de gobierno)', mitigante: 'El consejo renovó su confianza a Milleri por unanimidad (sep-26)', senal: 'No renovación de Milleri en Delfin o cambios en el consejo' },
      { riesgo: 'Aranceles de EE. UU. y dólar débil', tipo: 'Macro', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % por cada 100 pb de margen', mitigante: 'Subidas de precio y producción local', senal: 'Diferencia entre crecimiento a tipo constante y publicado superior a 4 puntos [A3]' },
      { riesgo: 'Rentabilidad baja del capital total (ROIC con fondo de comercio del 5-6 %, bajo el WACC)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Múltiplo limitado', mitigante: 'FCF récord de 2.800 M [A1]', senal: 'Nuevas compras fuera del núcleo (como Supreme)' },
      { riesgo: 'Deterioro del fondo de comercio (31.013 M)', tipo: 'Contable', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Sin efecto en caja', mitigante: 'Margen de los negocios comprados', senal: 'Caída de ventas comparables en GrandVision o Supreme' },
    ],
    premortem: 'Es octubre de 2029 y la acción vale 90 EUR. Las gafas de Apple y Google se comieron el segmento de gama media en 2027-28 y Meta reabrió su acuerdo con otros fabricantes; las ventas de gafas con IA cayeron y dejaron capacidad ociosa. A la vez, Leonardo Maria Del Vecchio no renovó a Milleri en Delfin y el relevo en la dirección paralizó las decisiones un año. El núcleo de lentes siguió creciendo al 4 %, pero el margen cayó al 22 % por los aranceles y la mezcla, y el mercado dejó de pagar 18 veces el beneficio. La señal temprana fue la diferencia entre el crecimiento de las gafas con IA y el del grupo en los trimestres de 2026-27 y los recortes de objetivos, que nunca pararon.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Gafas con IA', pregunta: '¿Qué parte de las ventas y del beneficio operativo de 2026 dan las gafas con IA, y con qué margen frente al del grupo?', por_que: 'Es la diferencia entre el escenario base y el bajista y la empresa no la desglosa.' },
      { tema: 'Gobierno', pregunta: '¿Qué pasa con la dirección de EssilorLuxottica si Delfin no renueva a Milleri en 2027?', por_que: 'El accionista de control y el primer ejecutivo están enfrentados.' },
      { tema: 'Margen', pregunta: '¿Mantiene el grupo el objetivo de un margen operativo ajustado del 19-20 % a medio plazo?', por_que: 'Se retiró en febrero y es la palanca del alcista.' },
      { tema: 'Capital', pregunta: '¿Qué rentabilidad esperan de Supreme y qué criterio de ROIC aplican a las compras?', por_que: 'El ROIC del capital total está por debajo del WACC.' },
      { tema: 'Meta', pregunta: '¿Qué exclusividad y duración tiene el acuerdo con Meta y qué papel tiene su participación del 3 %?', por_que: 'La plataforma es de Meta; el riesgo de que abra el acuerdo a otros fabricantes no está cuantificado.' },
    ],
    confianza: 'Media',
  },

  fuentes: [],
  huecos: [],
};
