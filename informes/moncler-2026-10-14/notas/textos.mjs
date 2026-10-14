// Textos del analista (Moncler, corte 2026-10-14). Citas con letra de nota: [A2] = fuente 2 de A.json; [P1] = fuente propia.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Moncler, eMarket Storage, Borsa Italiana y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, de los informes anuales y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. **Precio**: no se encontró el cierre de Milán del 13-oct-2026; se usa el último cierre fechado, 43,44 EUR del 8-oct-2026 en la bolsa de Viena (la misma acción, en euros) [D9]. **EBITDA**: Moncler no lo publica; es el de los proveedores (EBIT + todas las amortizaciones, con NIIF 16) [A6, A10]. **Arrendamientos** (NIIF 16) en la deuda del puente (1.109,1 M de dic-25) y altas de derechos de uso dentro del capex del DCF. Los comparables y las transacciones se reutilizan de los informes de LVMH (8-oct) y Hermès (11-oct) de este repositorio, con cifras de MarketScreener a 8-oct-2026 [D10, D11]. Sin sección de bolsa.',
  controles_explicados: [
    { control: 'Comparables estables al quitar una empresa', explicacion: 'Solo seis grupos de lujo y muy distintos (Prada a 6,4x y Hermès a 15,6x de EV/EBITDA NTM). Por eso los comparables pesan un 30 % y la regla de 12 meses usa la mediana de su PER solo como techo del alcista.' },
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Explicado en diferencia_consenso: la distancia sale casi entera del múltiplo (17,3x frente a los ≈23x que implican los objetivos), no del beneficio.' },
  ],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    comparables: {
      comentario: 'Moncler cotiza a 8,9 veces el EBITDA de los próximos 12 meses y a 17,0 veces el beneficio, en la parte baja del grupo con LVMH (8,5x y 15,9x) y Prada (6,4x y 13,0x), y muy por debajo de Hermès (15,6x y 27,0x), Richemont (12,8x y 22,4x) y Brunello Cucinelli (12,8x y 31,7x) [D10, D11]. El descuento no se justifica por calidad: su margen EBITDA (≈40 %) es el segundo del grupo tras Hermès y no tiene deuda. Se justifica por crecimiento y por concentración: una categoría (abrigo de plumón), una estación (el 4T) y un cliente (el asiático) [A2]. Usamos la mediana del EV/EBITDA NTM con poco peso porque la muestra es frágil (la mediana va de 8,5x a 12,8x según qué comparable se quite); la mediana del PER NTM (24,5x) solo como techo del alcista a 12 meses.',
    },
    transacciones: {
      comentario: 'Las transacciones del lujo pagan 1,5-5,6 veces las ventas; la propia Moncler pagó 4,8 veces ventas y 17,1 veces EBITDA por Stone Island en 2020 [D10]. Aplicadas a Moncler darían un valor muy por encima del precio, pero no pesan en la síntesis: una OPA no es probable a 12 meses. Double R (Ruffini) controla de hecho el 15,8 % y LVMH, socio del 22 % de Double R, pactó en 2024 no superar con Ruffini el 20 % de Moncler durante tres años, renovables [C5]. Es la opción de compra más clara del sector, pero sin fecha.',
    },
    catalizadores: {
      items: [
        { fecha: '21-oct-2026', evento: 'Ventas del 3T26 (resoconto intermedio al 30-sep)', efecto: 'Primera lectura del arranque de la temporada de abrigo y de Europa tras el −8 % del 2T26', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Feb-2027', evento: 'Resultados de 2026 y dividendo', efecto: 'El 4T trae el 41 % de las ventas: decide el margen del año (≈29 %)', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Primer plan estratégico con Leo Rongone de consejero delegado', efecto: 'Objetivos a medio plazo y posible uso de la caja (1.112 M) en recompras', probabilidad: 'Media', sentido: '+' },
        { fecha: 'Sep-2027', evento: 'Fin del compromiso de tres años de LVMH y Ruffini de no superar el 20 %', efecto: 'Reabre la opción de una operación corporativa', probabilidad: 'Baja', sentido: '+' },
        { fecha: '2027', evento: 'Recuperación del turismo asiático en Europa', efecto: 'EMEA es el 27 % de las ventas y cayó un 8 % en el 2T26', probabilidad: 'Media', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Pérdida de atractivo del plumífero de lujo (riesgo de moda)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−34 % (escenario bajista: 28,56 EUR)', mitigante: 'Segunda marca (Stone Island) y ampliación a punto y calzado', senal: 'Venta directa comparable negativa dos trimestres seguidos' },
        { riesgo: 'Europa sin turistas asiáticos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 a −15 %', mitigante: 'Asia creció un 22 % en el 1T26', senal: 'EMEA por debajo de −5 % a tipos constantes en el 3T26' },
        { riesgo: 'Frenazo del consumidor chino', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −20 %', mitigante: 'Marca con poca saturación en China frente a las grandes casas', senal: 'Asia por debajo del +5 % en el 3T26' },
        { riesgo: 'Divisas (USD, JPY y CNY frente al euro)', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 a −5 % del BPA', mitigante: 'Coberturas y subidas de precio', senal: 'Efecto divisa peor que −4 puntos en el año' },
        { riesgo: 'Transición de la cúpula (Ruffini a presidente ejecutivo)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Ruffini sigue de presidente ejecutivo y primer accionista', senal: 'Salidas de directivos o choque de estrategia' },
        { riesgo: 'Inversión creciente en tiendas y existencias', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 a −5 %', mitigante: 'Caja neta de 1.112 M', senal: 'Circulante por encima del 11 % de las ventas' },
      ],
      premortem: 'Octubre de 2029: la acción vale 26 EUR. Empezó con un invierno suave en Europa y en China en 2026-27 y con el turista asiático sin volver a Milán y París; el 4T26 creció un 1 % y el margen EBIT bajó al 27 %. La nueva dirección respondió con más tiendas y más marketing para recuperar tráfico, mientras las grandes casas (Prada, Louis Vuitton, Dior) llenaban sus escaparates de plumíferos. El plumífero de lujo dejó de ser la prenda de moda entre los jóvenes chinos, como le pasó a Canada Goose desde 2022. Las ventas quedaron planas tres años, el margen bajó al 25 % y el mercado, que ya pagaba solo 17 veces beneficios, pasó a 14 veces un beneficio un 15 % menor. La señal que lo habría anticipado: la venta directa comparable negativa en el 2T y el 3T de 2026 y las existencias creciendo más que las ventas (+15 % en 2025).',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Caja', pregunta: '¿Qué hará la nueva dirección con 1.112 M de caja neta: recompras, dividendo extraordinario o compras?', por_que: 'Es el 9 % de la capitalización sin rendimiento; una recompra cambiaría el BPA del objetivo a 12 meses.' },
        { tema: 'Existencias', pregunta: '¿Cuánto del aumento de existencias (+15 % en 2025) es plumón estratégico y cuánto producto sin vender?', por_que: 'Si es producto, habrá rebajas o depreciaciones en 2026-27.' },
        { tema: 'Europa', pregunta: '¿Qué parte de EMEA es turista asiático y cuánto cayó la venta al cliente local?', por_que: 'Separa un problema cíclico (turismo) de uno de marca.' },
        { tema: 'Estrategia', pregunta: '¿Qué cambiará Leo Rongone frente a la etapa de Ruffini (tiendas, categorías, Stone Island)?', por_que: 'Define el capex y el crecimiento de la proyección.' },
        { tema: 'LVMH', pregunta: '¿Qué papel tiene LVMH tras la salida de Alexandre Arnault y la entrada de Sidney Toledano?', por_que: 'Es la opción de una operación corporativa.' },
        { tema: 'Arrendamientos', pregunta: '¿Por qué los arrendamientos subieron de 924 a 1.109 M en 2025 con la red de tiendas estable?', por_que: 'Más metros o alquileres más caros: afecta al margen futuro.' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'Partimos de 2025 (3.132,1 M EUR) [A1]. 2026e (+3 % publicado) queda fijo: el 1S26 creció un 9 % a tipos constantes y un 5 % publicado, pero el 2T26 se frenó y la divisa resta unos 4 puntos [A2, A13]. Después, +5 % en 2027e y +6 % en 2028-29e, bajando al 3 % en 2035e: por debajo del 11 % anual de 2021-2025 (con Stone Island y la reapertura china) y algo por encima del mercado de lujo (3,5 % previsto) [A1, B4]. El consenso de beneficio (+9 % anual de 2026 a 2028) es más optimista [D3].',
    margenes: 'Margen EBITDA del 39,8 % en 2026e y del 40,5 % desde 2029e, frente al 40,4 % de 2023, el 40,2 % de 2024 y el 39,9 % de 2025 [A6, A10]. No suponemos mejora: el margen EBIT del 29 % que la dirección aspira a mantener ya es el de los últimos cinco años [A13].',
    inversion: 'Amortización del 10,8 % de las ventas (la de 2025, con derechos de uso) [A6]. Capex del 13 % hasta 2028e y del 12 % al final: la inversión neta de 2025 fue del 6,9 % y la empresa espera ≈6 % en 2026, y a ella hay que sumar las altas de derechos de uso de tiendas (pagos de arrendamientos de ≈7 % de las ventas) [A3, A13]. Circulante del 9,8 % de las ventas, el de 2025 [A15].',
    wacc: 'Bund a 10 años del 3,53 % (9-oct-2026) [D12]; beta de 1,2, la sectorial del lujo que usamos en Hermès y LVMH (Moncler es más volátil que el sector, pero no tenemos su beta de 5 años); prima de mercado del 5,5 %. Sin prima país: Italia pesa poco en las ventas. Deuda = arrendamientos (8 % de la estructura) al 3,5 %. WACC del 9,52 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: inflación del euro (2 %) más medio punto real, por debajo del Bund menos medio punto (3,03 %). Con un margen del 40,5 % y un capex del 12 %, el valor terminal es el 56 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen y precio al 3 % cada uno (el 1S26 creció un 9 % a tipos constantes) y −3 puntos de divisa [A2].',
    '2027e': 'Precio del 3 % (subidas anuales habituales) y volumen del 2 % con la red de tiendas estable (295 Moncler) [A11].',
    '2028e': 'Recuperación del turismo y de China: volumen del 3 %, precio del 3 %.',
    '2029e': 'Igual que 2028e: crecimiento en línea con su historia antes de 2020.',
    '2030e': 'El volumen baja al 2,5 %: madurez de la marca principal.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La proyección (4,6 % anual) pide menos de lo que Moncler ha hecho en cualquier periodo de cinco años desde su salida a bolsa y apenas mueve su cuota del lujo personal (del 0,9 % al 1,0 % en 2035e) [A1, B4]. La reinversión es baja (9 % del NOPAT; el motor no hace la prueba con menos del 15 %): el crecimiento depende del poder de precio, demostrado con un margen EBIT del 29-30 % estable durante el frenazo de 2024-25 y la subida de precios por los aranceles en 2025 [A1, B9]. El ROIC incremental de 2021-2025 (1,4 %) no sirve de referencia porque el capital creció por caja y arrendamientos con ventas planas desde 2024. La duda no es de calidad sino de demanda: por eso el bajista resta 3 puntos de crecimiento y de margen.',
  dcf_lectura: 'El DCF da 40,11 EUR por acción, un 7,7 % por debajo de 43,44 EUR, con un WACC del 9,52 % y un valor terminal del 56 %. El DCF inverso dice que a 43,44 EUR el mercado descuenta un crecimiento anual del 6,0 % en los años no fijos (nuestro base: 4,7 %), o una rentabilidad del 9,0 % con nuestras cifras: el precio no es barato con nuestro coste de capital, sino justo. Es exigente frente a 2024-25 (ventas planas) y conservador frente a la historia (11 % anual en 2021-25). Con la prima implícita del mercado (4,2 %) en vez del 5,5 %, el valor sube y el DCF queda por encima del precio: la conclusión depende de la tasa de descuento, no de las cifras.',
  narrativas: {
    Bajista: 'El plumífero de lujo pierde la moda y Europa sigue sin turistas: crecimiento 3 puntos menor cada año y margen EBITDA 3 puntos más bajo (EBIT del ≈26 %), como Canada Goose desde 2022 o Kering desde 2023.',
    Base: 'Recuperación lenta del lujo: Moncler crece un 5-6 % en 2027-29 con precio y volumen, y mantiene el margen EBIT del 29 %.',
    Alcista: 'Asia y Stone Island aceleran y Europa recupera el turismo: 2 puntos más de crecimiento y 1,5 de margen, el 31 % de EBIT de 2022-23.',
  },
  escenarios_comentario: 'El DCF da 28,56 EUR en el bajista (−34,3 %), 40,11 en el base (−7,7 %) y 48,00 en el alcista (+10,5 %): asimetría desfavorable (0,31x) con nuestro WACC del 9,52 %. A 12 meses, con el PER, el cuadro cambia: el bajista pierde un 20 % y el alcista gana un 56 % (asimetría de 2,28x), porque el precio ya descuenta un PER de 17,3x, el más bajo de la historia reciente. Las dos lecturas no se contradicen: la acción está barata frente a su historia y justa frente a un coste de capital del 9,5 %.',
  suma_partes_comentario: 'No aplica: Moncler y Stone Island son el mismo negocio (ropa de lujo, venta directa) y la empresa no publica el resultado por marca en las fuentes disponibles.',
  valoracion_comentario: 'El DCF pesa un 40 %: es un negocio estable en márgenes, aunque el valor depende mucho de la tasa de descuento. Los comparables pesan un 30 % pese a ser una muestra frágil, porque el lujo se valora por múltiplos; los escenarios, otro 30 %. Las transacciones (80,67 EUR de mediana) no pesan: llevan prima de control y la OPA está bloqueada por el pacto de LVMH y Ruffini hasta 2027. La dispersión es grande: de 40,11 EUR (DCF) a 62,60 (PER de comparables). El valor objetivo es de 45,00 EUR (+3,6 %). La decisión la toma el objetivo a 12 meses (PER propio × BPA propio): 48,21 EUR.',
  rentabilidad_comentario: 'Moncler crea valor con holgura: ROIC del 25,1 % en 2024 y del 20,4 % en 2025 frente a un WACC del 9,52 %, es decir, unos 11 puntos de diferencial. Lo mueve el margen (beneficio neto del 20 % de las ventas), no la rotación (0,55 veces), que baja porque el balance acumula caja (1.458 M en 2025) y arrendamientos (1.109 M) [A1, A3]. La bajada de 2025 no es de negocio sino de capital: más arrendamientos y más existencias con las mismas ventas. El ROIC incremental de 2021-2025 (1,4 %) sale bajo por la misma razón. Está por encima de Kering y por debajo de Hermès, la referencia del sector [B6, B7].',
  diferencia_consenso: 'Nuestro base (46,54 EUR) queda un 24,2 % por debajo del objetivo medio de los analistas (61,37 EUR; 49-70) [D2]. El beneficio apenas explica la diferencia: nuestro BPA de 2028e (2,69 EUR) es un 5 % menor que el del consenso (2,83 EUR, 770 M de beneficio) porque suponemos menos crecimiento en 2027 [D3]. La diferencia sale del múltiplo: la regla común usa el PER actual (17,3x sobre nuestro BPA de 2027e) porque es menor que la mediana de cinco años (22,9x), mientras los objetivos de los analistas implican 22-23 veces, el PER de 2022-2025. Si el mercado vuelve a pagar esa media, el alcista (66,38 EUR) la recoge.',
  objetivo12m_comentario: 'El objetivo a 12 meses (48,21 EUR) queda un 7 % por encima del valor intrínseco (45,00 EUR): no hay una distancia de valor que cerrar, sino un múltiplo deprimido. La rentabilidad ponderada (+14,2 % con el dividendo de 1,40 EUR) se queda a un punto del umbral de compra, y la del base (+10,4 %) a dos. Lo que la subiría: unas ventas del 3T (21-oct) y del 4T que confirmen la vuelta al crecimiento del 5 %, o una recompra con la caja. A 42,80 EUR o menos la acción pasaría a Comprar.',
  fuentes: [],
  huecos: [],
};
