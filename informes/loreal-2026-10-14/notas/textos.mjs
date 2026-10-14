// Textos del analista (L'Oréal, corte 2026-10-14). Citas con letra de nota: [A2] = fuente 2 de A.json.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de L’Oréal, Euronext, MarketScreener y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, del documento de registro y de la prensa financiera; lo que no cuadró está en null y en los huecos, y la confianza es menor que en un análisis normal. **Precio**: no se encontró un cierre fechado de octubre; se usa 379,6 EUR, la capitalización de MarketScreener del 9-oct-2026 (202.950 M EUR, la misma que dio la prensa el 15-sep) dividida entre 534,6 M de acciones [D7, D8]. **Beneficio**: BPA diluido sin partidas no recurrentes, la base de la empresa y del consenso. **Participaciones**: Sanofi (7,2 %, ≈6.600 M EUR) y Galderma (20 %, ≈7.100 M EUR) van en el puente a valor de mercado, porque sus dividendos y su resultado no están en el EBITDA [A15, A16]. Nestlé no es una participación de L’Oréal sino su segundo accionista (20,1 %). Comparables y transacciones del informe de Puig de este repositorio (MarketScreener, 9-oct-2026) [D7]. Sin sección de bolsa.',
  controles_explicados: [
    { control: 'Circulante del primer año de proyección ≈ último real', explicacion: 'El 10,3 % real que calcula el motor son solo las existencias (no se pudieron leer clientes ni proveedores); el circulante neto verdadero de L’Oréal es de ≈4 % de las ventas. Mantenemos el 10,3 % en toda la proyección: es prudente (algo más de inversión en circulante) y no libera caja ficticia.' },
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base queda un 1,6 % por debajo del objetivo medio: no hay distancia que explicar.' },
  ],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    comparables: {
      comentario: 'L’Oréal cotiza a 19,3 veces el EBITDA de los últimos 12 meses y a 26,2 veces el beneficio de los próximos 12, muy por encima de la mediana de sus comparables de belleza (10,3 veces el EBITDA y 23,5 veces el beneficio) [D7]. La prima es merecida en calidad: margen EBITDA del 24 %, el mayor de la muestra salvo Interparfums, sin años de pérdidas y con el doble de tamaño que el segundo del sector; Estée Lauder, Shiseido y Coty están en reestructuración. Por eso los comparables pesan solo un 15 %: dan un valor de 202-340 EUR que castiga a L’Oréal por parecerse a empresas peores. La mediana del PER (23,5x) cuenta solo en la regla del alcista a 12 meses, donde no llega a pesar (manda la media histórica).',
    },
    transacciones: {
      comentario: 'Las compras de belleza se pagan a 2-8 veces las ventas: Aesop, la de la propia L’Oréal, a 4,7 veces; Byredo a 7,6 y Rhode a 3,8; Creed, a ≈14 veces, se excluye por atípica [D7]. Aplicadas a L’Oréal dan 257-437 EUR por acción, pero no pesan: con la familia Bettencourt Meyers al 34,7 % y Nestlé al 20,1 % no hay OPA posible [B2].',
    },
    catalizadores: {
      items: [
        { fecha: '21/23-oct-2026', evento: 'Ventas del 3T26', efecto: 'Prueba de que el crecimiento comparable del 1S26 (+6,8 %) se mantiene; el 3T25 fue débil (+4,2 %), así que la base es fácil', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Feb-2027', evento: 'Resultados de 2026 y dividendo', efecto: 'Margen operativo del año (21 %?) y primer año con Kering Beauté', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '1-jul-2027', evento: 'Entrada de la licencia de belleza de Gucci (hoy de Coty)', efecto: '≈+1 punto de crecimiento anual en 2027-2028', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2026-2027', evento: 'Decisión de Nestlé sobre su 20,1 %', efecto: 'Una recompra por L’Oréal subiría el BPA; una colocación en el mercado presionaría el precio', probabilidad: 'Baja', sentido: '+/−' },
        { fecha: '2027', evento: 'Recuperación del comercio de viaje en Asia', efecto: 'La dirección la espera desde el 2S26', probabilidad: 'Media', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Pérdida de la prima de crecimiento (la belleza se normaliza al 3-4 %)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−16,6 % a 12 meses (bajista: 309,34 EUR)', mitigante: 'Diversificación por divisiones y regiones; emergentes al +14 %', senal: 'Dos trimestres seguidos con crecimiento comparable < 4 %' },
        { riesgo: 'China y comercio de viaje en Asia', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Norte de Asia es ≈20 % de las ventas y ya ha caído', senal: 'Norte de Asia negativo comparable en el 3T26' },
        { riesgo: 'Compras caras (Kering Beauté, Galderma)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Licencias a 50 años y marcas de lujo con margen alto', senal: 'Deterioros o margen de Luxe por debajo del 21 %' },
        { riesgo: 'Divisas (USD, CNY y emergentes)', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−2 a −4 % del BPA', mitigante: 'Fabricación local y subidas de precio', senal: 'Efecto divisa peor que −3 puntos en el año' },
        { riesgo: 'Venta de Nestlé en el mercado', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 a −10 % temporal', mitigante: 'L’Oréal ya recompró a Nestlé en 2014 y 2021', senal: 'Anuncio de Nestlé o colocación acelerada' },
        { riesgo: 'Litigios por ingredientes (alisadores en EE. UU.)', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 a −3 %', mitigante: 'Sin provisión material publicada', senal: 'Primera sentencia o acuerdo colectivo' },
      ],
      premortem: 'Octubre de 2028: la acción vale 300 EUR. El 3T26 y el 4T26 crecieron un 4 % y la dirección rebajó su estimación del mercado; en 2027 el mercado de belleza creció un 3 % con EE. UU. saturado de marcas baratas nacidas en redes y China sin recuperarse. L’Oréal siguió subiendo el margen, pero su BPA solo creció un 5 % y el mercado dejó de pagar 26 veces: pasó a 22 veces, como Beiersdorf. Kering Beauté y Gucci aportaron ventas pero con menos margen del previsto, y Nestlé colocó la mitad de su participación en el mercado. La señal que lo habría anticipado: el crecimiento comparable de Gran Consumo por debajo del 3 % y Norte de Asia negativo en dos trimestres.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Crecimiento', pregunta: '¿Cuánto del +6,8 % comparable del 1S26 es efecto del calendario del cambio informático y cuánto demanda?', por_que: 'La dirección da un +6,5 % «ajustado»: separa lo que se repite en 2027.' },
        { tema: 'Kering Beauté', pregunta: '¿Qué ventas y margen aporta Kering Beauté y qué espera de Gucci desde julio de 2027?', por_que: 'Es la mitad del crecimiento extra de 2027-2028 que suponemos.' },
        { tema: 'Nestlé', pregunta: '¿Hay conversaciones con Nestlé sobre su 20,1 %? ¿Lo recompraría L’Oréal con deuda o con Sanofi?', por_que: 'Cambia el BPA y el balance.' },
        { tema: 'Sanofi', pregunta: '¿Venderá el resto del 7,2 % de Sanofi?', por_que: 'Son ≈6.600 M y 350 M de dividendos al año dentro del BPA.' },
        { tema: 'Margen', pregunta: '¿Hasta dónde puede subir el margen operativo sin recortar publicidad?', por_que: 'El base supone +0,2 puntos al año hasta el 21,3 %.' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Partimos de 2025 (44.053 M EUR) [A1]. 2026e queda fijo en +5,5 % publicado: el 1S26 creció un 6,8 % comparable y un 5,8 % publicado, con Kering Beauté sumando desde abril y la divisa restando [A2]. Después, +6,5 % en 2027e y +7,0 % en 2028e (≈5 % orgánico, el mercado más medio punto, y la licencia de Gucci desde julio de 2027), y bajada gradual al 3 % en 2035e. Es menos que el 8,1 % anual de 2021-2025, que llevaba el rebote de la pandemia y la inflación [A1, B8].',
    margenes: 'Margen EBITDA del 24,6 % en 2026e (operativo del 20,4 %) y del 25,5 % desde 2032e: +0,2 puntos al año, lo que L’Oréal ha hecho de forma sostenida de 2021 (19,1 %) a 2025 (20,2 %) [A1]. El margen operativo del 1S26 ya fue del 21,3 % [A2].',
    inversion: 'Amortización del 4,2 % de las ventas (la de 2025, con derechos de uso) [A12]. Capex del 4,8 %: inversión de ≈3,6 % (3,0 % en el 1S26) más las altas de derechos de uso [A3]. Circulante del 10,3 % (ver controles).',
    wacc: 'Bund a 10 años del 3,53 % (9-oct-2026) [D9]; beta de 0,85, la de cuidado personal que usamos en Puig (L’Oréal es menos volátil que el mercado); prima de mercado del 5,5 %. Sin prima país. Deuda del 7 % de la estructura al 3,5 %. WACC del 7,81 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: inflación del euro (2 %) más medio punto real, por debajo del Bund menos medio punto (3,03 %). El valor terminal es el 64 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen del 3 % y precio y mezcla del 3,5 % (+6,5 % comparable ajustado en el 1S26); +2 puntos de Kering Beauté y −3 de divisa [A2].',
    '2027e': 'Orgánico del 5,5 % y +1 punto de perímetro (Kering Beauté el primer trimestre y Gucci desde julio).',
    '2028e': 'Orgánico del 5,5 % y +1,5 puntos por el primer año entero de Gucci.',
    '2029e': 'Orgánico del 5 % (mercado del 4,5 %) y el último medio punto de Gucci.',
    '2030e': 'El crecimiento converge al del mercado más medio punto.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La proyección (5,0 % anual) pide menos de lo que L’Oréal ha hecho en cualquier periodo de cinco años desde 2010 y solo sube su cuota del mercado de belleza del 14,7 % al 15,3 % en 2035e, en parte por compras ya hechas (Kering Beauté, Gucci) [A1, B8]. La reinversión es baja (7 % del NOPAT; el motor no hace la prueba con menos del 15 %): el crecimiento sale del poder de precio y de la mezcla (lujo y dermocosmética), demostrados con un margen operativo que ha subido cada año de 2021 a 2025 [A1]. El ROIC incremental histórico del motor (1,1 %) no sirve porque falta el balance de 2021-2024. El foso es amplio (marcas, escala en publicidad e investigación).',
  dcf_lectura: 'El DCF da 277,40 EUR por acción, un 26,9 % por debajo de 379,6 EUR, con un WACC del 7,81 % y un valor terminal del 64 %. El DCF inverso dice que a 379,6 EUR el mercado descuenta un crecimiento anual del 9,4 % en los años no fijos (nuestro base: 4,9 %), o una rentabilidad del 6,5 % con nuestras cifras: el precio pide crecer casi al doble que el mercado de belleza (4,5 %) durante diez años. Con la prima implícita del mercado (4,2 %, WACC del 6,8 %) el DCF sube a 350,35 EUR, todavía por debajo del precio. Es la lectura de siempre en L’Oréal: el mercado le pide una rentabilidad de bono de calidad.',
  narrativas: {
    Bajista: 'La belleza se normaliza al 3-4 % y L’Oréal deja de superar al mercado: 2,5 puntos menos de crecimiento y 1,5 de margen, con el PER bajando a 22 veces.',
    Base: 'L’Oréal crece un 5-5,5 % orgánico (el mercado más medio punto) más las compras, y sube el margen 0,2 puntos al año.',
    Alcista: 'China y el comercio de viaje vuelven y Gucci rinde más: 1,5 puntos más de crecimiento y 1 de margen; el PER vuelve a su media de 31 veces.',
  },
  escenarios_comentario: 'El DCF da 200,59 EUR en el bajista (−47,2 %), 277,40 en el base (−26,9 %) y 324,65 en el alcista (−14,5 %): con nuestro coste de capital ni el alcista llega al precio. A 12 meses, con el PER, el cuadro es otro: −16,6 % en el bajista y +40,2 % en el alcista (con el dividendo) (asimetría de 2,07x), porque el PER de hoy (26,4x sobre nuestro BPA de 2027e) está por debajo de su historia limpia (31,7x de mediana). Las dos lecturas no se contradicen: L’Oréal es cara frente a un coste de capital del 7,8 % y barata frente a su propio pasado.',
  suma_partes_comentario: 'No aplica a las divisiones (no se publica el resultado operativo completo por división en las fuentes leídas). Las dos participaciones (Sanofi y Galderma) sí se suman en el puente a valor de mercado: ≈13.700 M EUR, unos 25,6 EUR por acción.',
  valoracion_comentario: 'El DCF pesa un 55 %: es un negocio estable y previsible. Los escenarios, un 30 %, y los comparables un 15 %, porque la muestra (Estée Lauder, Coty, Shiseido en reestructuración) es de peor calidad. Las transacciones no pesan: no hay OPA posible con la familia y Nestlé al 55 %. La dispersión es amplia: de 202 EUR (EV/EBITDA de comparables) a 350 EUR (DCF con la prima del mercado). El valor intrínseco es de 284,54 EUR (−25,0 %). La decisión la toma el objetivo a 12 meses (PER propio × BPA propio): 414,22 EUR.',
  rentabilidad_comentario: 'L’Oréal crea valor con holgura: con el capital total (patrimonio de 34.953 M y deuda neta de 2.051 M) el ROIC de 2025 es del ≈18 %, unos 10 puntos sobre el WACC del 7,81 % [A8]. Lo mueve el margen (beneficio neto ajustado del 15,5 % de las ventas) más que la rotación. Las compras de 2026 (≈7.500 M en Kering Beauté y Galderma) bajarán el ROIC uno o dos puntos hasta que rindan.',
  diferencia_consenso: 'Nuestro base (411,31 EUR) queda un 1,6 % por debajo del objetivo medio de los analistas (417,79 EUR; 340-460) [D1]. Coincidimos también en el beneficio: nuestro BPA de 2028e (15,58 EUR) es casi igual al del consenso (15,63 EUR, 8.360 M de beneficio) [D2]. La regla común usa el PER actual (26,4x) porque es menor que la mediana de cinco años (31,7x); los analistas implican un múltiplo parecido. No hay una visión distinta del mercado.',
  objetivo12m_comentario: 'El objetivo a 12 meses (414,22 EUR) queda un 46 % por encima del valor intrínseco (284,54 EUR): la rentabilidad a 12 meses viene de crecer el BPA un 8-9 % al año con un múltiplo constante, no de cerrar una distancia de valor, y el DCF dice que ese múltiplo ya es exigente. La ponderada (+11,0 % con el dividendo de 7,20 EUR) y la del base (+10,3 %) quedan a 4 y 2 puntos de los umbrales de compra, pero el valor intrínseco por debajo del precio bloquea la compra por encima de 284,54 EUR.',
  fuentes: [],
  huecos: [],
};
