// Textos del analista (Experian, corte 2026-10-14). Citas con la letra de la nota; [P1] = fuente propia 1.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Experian, Investegate, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, de los avisos de recompra y de la prensa financiera; lo que no cuadró está en null y en los huecos, y la confianza es menor que en un análisis normal. Cuentas en millones de USD (la moneda en que informa Experian) con cifras benchmark (sin amortización de intangibles adquiridos ni partidas no recurrentes), ejercicio a 31 de marzo etiquetado por el año en que termina (FY2026 = abril 2025-marzo 2026). La acción cotiza en peniques: el precio de referencia es la media de la recompra del 2-oct-2026 (2.457,51 p, el último dato encontrado; no se halló el cierre del 13-oct) pasado a USD con un GBP/USD de 1,35 (estimado). Balance y capex son estimaciones de orden de magnitud que cuadran la deuda neta (5.180 M), el ROCE publicado (17,2 %) y el flujo libre de Stock Analysis (2.190 M) [A1, A7, A10].',

  controles_explicados: [
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (36,31 USD) queda un 34 % por debajo del objetivo medio de los analistas (55,18 USD, unos 4.087 p): no por el BPA (el nuestro del FY28e, 2,25 USD, casi coincide con los 2,28 de Rothschild Redburn), sino por el múltiplo. La regla común usa el PER actual (14,7x) porque es menor que la mediana de cinco años (29,4x); los objetivos de los analistas suponen 22-25x. Ver diferencia_consenso.' },
    { control: 'Fuentes sin citar ≤ 15 %', explicacion: 'Las fuentes sin citar vienen de la nota de sector heredada del informe de Equifax (8-oct), que se reutiliza entera para sector y competencia; se dejan para trazabilidad.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    comparables: {
      comentario: 'Experian cotiza a 15,5 veces el BPA de los próximos 12 meses y 11,5 veces el EBITDA, frente a una mediana de 20,9 veces el PER en la muestra del informe de Equifax [D5]. Frente a los otros dos burós el descuento casi desaparece: Equifax 17,8x y TransUnion 16,7x. El mercado ya no paga a Experian como plataforma de datos (Moody\'s, S&P Global, MSCI, 22-26x) sino como buró expuesto a la IA, con un margen EBITDA (36 %) y un ROIC (18 %) superiores a los de TransUnion y Equifax.',
    },
    financieros: {
      comentario: 'Diez años de crecimiento regular: ingresos de 4.861 M USD en el FY19 a 8.450 M en el FY26 (+8,2 % anual) y BPA benchmark de 0,98 a 1,80 USD (+9,1 % anual) [A1, A5]. Solo el FY21 no creció (pandemia y la inversión en la nube y en Consumer Services). El FY26 fue el mejor de la serie: +13 % de ingresos (8 % orgánico), margen EBIT benchmark del 28,6 % (+60 pb a tipos constantes) y BPA +15 % [A1, A6, A9]. El BPA básico (1,645 USD) queda un 8 % por debajo del benchmark por la amortización de intangibles comprados [A6].',
    },
  },

  dcf_justificacion: {
    crecimiento: 'FY27e +9,5 %: punto medio de la guía de crecimiento total (8-11 %: 6-8 % orgánico, ≈1 % inorgánico y 1-2 % de divisa) [D10]; el 1T FY27 creció un 10 % a tipos reales [A8]. FY28-29e +8 % (el orgánico del FY26, sin divisa), y luego baja medio punto al año hasta el 4,5 % del FY36e. Crecimiento medio proyectado del 6,8 %.',
    margenes: 'Margen EBITDA benchmark del 36,1 % en el FY26 (3.050 M, derivado de la deuda neta y del 1,7x de apalancamiento) [A1, A7]. Sube ≈50 pb al año (la guía del FY27) hasta el 38 % en el FY31e y se queda ahí: equivale a un margen EBIT benchmark del 30,4 %, 1,8 puntos sobre el actual.',
    inversion: 'Capex del 9 % de las ventas (sobre todo software y plataforma en la nube) hasta el FY31e y 8,5 % después, frente a una amortización del 7,6 %; circulante del 2 % de las ventas. No se proyectan compras.',
    wacc: 'Tasa libre del 5,22 % (bono de EE. UU. a 10 años, porque el 70 % del negocio y las cuentas están en dólares) [D7], beta de 0,9 (supuesto; los burós se mueven con el mercado), prima del 5,5 %, coste de la deuda del 4,5 % antes de impuestos y 15 % de deuda: WACC del 9,15 %. Con la prima implícita del mercado (4,2 %) el WACC sería del 8,15 % [D8].',
    terminal: 'Crecimiento a perpetuidad del 3 %: inflación más algo de volumen de datos. El valor terminal pesa un 60 %. El múltiplo de salida de contraste (14x EBITDA) es inferior al que ha pagado el mercado en la última década.',
  },

  puente_comentarios: {
    'FY2027e': 'Volumen +4 % (más consultas de crédito en EE. UU. y Brasil, más clientes de software de decisión), precio +3 % y otros +2,5 % (≈1 punto de compras y 1-2 de divisa) [D10].',
    'FY2028e': 'Volumen +4,5 % y precio +3 %; otros +0,5 % (compras pequeñas ya hechas).',
    'FY2029e': 'Igual que el FY28e.',
    'FY2030e': 'El volumen se modera al 4 %.',
    'FY2031e': 'Volumen +3,5 %, precio +3 %.',
  },

  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La reinversión neta es baja (6 % del NOPAT) y el motor no hace la prueba de financiación, así que se hace a mano. El crecimiento proyectado (6,8 % anual) es menor que el orgánico real de los últimos cinco años (7-8 %, con un 8 % en el FY26 y un 7 % en el 1T FY27) [A1, A8] y se logró con el mismo capex (≈9 % de las ventas): en un negocio de datos el crecimiento sale de más consultas sobre la misma base y de subir precios, no de capital nuevo. La cuota implícita no sube: crecemos por debajo del gasto en datos y analítica de crédito, identidad y fraude, que crece a un dígito alto (nota de sector). La proyección no incluye compras (que la empresa sí hace) y el ROIC (≈18 %) se mantiene. El riesgo no es la financiación sino el precio de la consulta si la IA o los modelos alternativos la abaratan: está en el bajista.',

  dcf_lectura: 'El DCF da 41,38 USD por acción (+24,7 % sobre 33,18), con un WACC del 9,15 % y un valor terminal del 60 %. El DCF inverso dice que a 33,18 USD el mercado descuenta un crecimiento de los ingresos del 4,3 % anual en los años no fijos, frente al 6,8 % del caso base y al 8 % orgánico que Experian ha dado en el FY26: el precio supone que la IA y los modelos de puntuación alternativos recortan a la mitad el crecimiento. Con la prima implícita del mercado (WACC del 8,15 %) el DCF sube a 50,75 USD. El DCF manda en el valor intrínseco, no en la decisión a 12 meses.',

  narrativas: {
    Bajista: 'La IA y las puntuaciones alternativas (VantageScore gratis en hipotecas, modelos de los propios bancos) abaratan la consulta de crédito; Consumer Services no se recupera tras perder los contratos de protección. Crecimiento 2 puntos menor y margen EBITDA 1 punto menor; terminal del 2,5 %.',
    Base: 'Experian cumple la guía del FY27 (6-8 % orgánico, +50 pb de margen) y mantiene un crecimiento orgánico del 7-8 % con margen al alza; ROIC estable en torno al 18 %.',
    Alcista: 'Ciclo de crédito favorable en EE. UU. y Brasil, hipotecas que se recuperan con la bajada de tipos y la IA usada como producto propio (decisión y fraude): +1,5 puntos de crecimiento y +0,5 de margen.',
  },
  escenarios_comentario: 'El DCF da 31,48 USD en el bajista (−5,1 %), 41,38 en el base (+24,7 %) y 48,03 en el alcista (+44,8 %). La asimetría es buena porque el precio ya descuenta casi el bajista: con 2 puntos menos de crecimiento y 1 de margen la acción solo cae un 5 % sobre el valor intrínseco. Pesos 25/50/25: el riesgo de la IA es real pero las cifras de los últimos trimestres no lo muestran.',

  valoracion_comentario: 'El DCF pesa un 50 %: negocio estable, con caja previsible y poca inversión. Los comparables, un 25 % (la mediana mezcla burós con plataformas de datos más caras) y los escenarios otro 25 %. No se usan transacciones (no se buscaron). El valor intrínseco es de 42,03 USD (unos 3.113 p), un 26,7 % sobre el precio. La decisión la toma el objetivo a 12 meses: con la regla común (PER actual de 14,7x en el base) la rentabilidad es positiva pero no llega al 12 % en el base.',

  rentabilidad_comentario: 'Experian crea valor con holgura: ROIC del 17,9 % en el FY26 (NOPAT benchmark sobre capital invertido estimado de ≈10.600 M, coherente con el ROCE publicado del 17,2 %) frente a un WACC del 9,15 %: 8,8 puntos de diferencia [A1]. El ROE (≈32 %) está inflado por las recompras y la deuda. El ROIC sube desde el 16,6 % de ROCE del FY25 [A2] porque el margen mejora y las compras recientes son pequeñas. El capital invertido incluye el fondo de comercio de compras pasadas (Serasa, ClearSale, Illion): sin él, el rendimiento del negocio orgánico es muy superior.',

  diferencia_consenso: 'Nuestro base (36,31 USD, ≈2.690 p) queda un 34 % por debajo del objetivo medio de los analistas (55,18 USD, ≈4.087 p; 3.500-4.600 p, 6 analistas, recortes desde mayo) [D3]. La diferencia no sale del BPA: nuestro FY28e (2,25 USD) casi coincide con el de Rothschild Redburn (2,28) [D4]. Sale del múltiplo: la regla común toma el PER actual (14,7x) porque es menor que la mediana de cinco años (29,4x), mientras los analistas suponen que el mercado vuelve a pagar 22-25 veces. Si el miedo a la IA se disipa, ese es el alcista (19,1x por el techo de la regla).',

  objetivo12m_comentario: 'Con la regla común, el objetivo ponderado es de 37,68 USD (≈2.791 p, +15,6 % con el dividendo del 2,1 %) y el base de 36,31 (+11,5 %). Pasa el umbral de la ponderada (15 %) pero no el del base (12 %): Mantener, a medio punto de Comprar. La asimetría es buena (3,6x): el bajista (12,5x × 2,29 = 28,63 USD, −11,6 %) pierde poco porque el PER ya es la mitad de su mediana histórica. Comprar por debajo de 33,04 USD (≈2.447 p), casi el precio actual.',

  catalizadores: {
    items: [
      { fecha: '18-nov-2026 (por confirmar)', evento: 'Resultados semestrales del FY27 [D9]', efecto: 'Si el orgánico del 2T vuelve al 8 % y la guía se mantiene o sube, el mercado puede revisar el múltiplo; si Consumer Services sigue plano, el debate de la IA sigue', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Hasta junio de 2027', evento: 'Recompra de 1.000 M USD en curso (≈3 % del capital) [A1]', efecto: 'Suma ≈3 % al BPA y da soporte al precio en mínimos', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-2027', evento: 'Bajadas de tipos en EE. UU. y recuperación de las hipotecas', efecto: 'Más consultas de crédito hipotecario, el producto de más precio', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Adopción de VantageScore 4.0 y modelos alternativos en hipotecas (FHFA) [B3]', efecto: 'Más competencia en precio de la puntuación; los burós venden los datos igual', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Inteligencia artificial y puntuaciones alternativas que abaratan la consulta de crédito', tipo: 'Competitivo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−12 % a 12 meses (bajista); −24 % del valor intrínseco', mitigante: 'Más del 90 % de los ingresos sale de datos propios aportados por los prestamistas, que la IA no replica [E3]; contratos renovados a 4-10 años [E1].' },
      { riesgo: 'Ciclo de crédito al consumo y de hipotecas en EE. UU. y Brasil', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Diversificación por productos (decisión, fraude, sanidad, automóvil) y por regiones.' },
      { riesgo: 'Regulación (CFPB, FCA, protección de datos en Brasil) y brechas de datos', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Multas y pérdida de múltiplo', mitigante: 'Historial sin una brecha masiva comparable a la de Equifax de 2017.' },
      { riesgo: 'Divisa: cotiza en libras e informa en dólares; real brasileño', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '±5 % en peniques', mitigante: 'Ingresos y BPA en dólares; el inversor en euros soporta el GBP/EUR.' },
    ],
    premortem: 'Es octubre de 2027 y la acción vale 2.000 p. Los grandes bancos de EE. UU. adoptaron modelos de puntuación propios con IA y datos de cuentas bancarias (banca abierta), las consultas de crédito bajaron de precio y Consumer Services siguió sin crecer. El orgánico cayó al 4 % y el mercado dejó de pagar más de 13 veces beneficios. Lo que lo habría avisado: el orgánico de B2B Financial Services en Norteamérica por debajo del 5 % dos trimestres seguidos.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'IA y precio', pregunta: '¿Cuánto ha variado el precio medio por consulta en EE. UU. en los últimos cuatro trimestres y qué parte del crecimiento es precio?', por_que: 'Separa volumen de precio, que es lo que el mercado teme perder.' },
      { tema: 'Consumer Services', pregunta: '¿Cuándo termina el efecto de los contratos de protección y qué crecimiento da el negocio sin ellos?', por_que: 'Es el lastre del 1T FY27 (+2 %).' },
      { tema: 'Capital', pregunta: '¿Seguirá recomprando por encima de 1.000 M USD al año con la deuda en 1,7x, por debajo del objetivo de 2,0-2,5x?', por_que: 'A estos precios cada 1.000 M compra un 3 % del capital.' },
    ],
    confianza: 'Media',
  },

  resumen: {
    recomendacion: 'Mantener',
    conviccion: 'Media',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media y a medio punto de Comprar. Con nuestro BPA y la regla común de múltiplos, el objetivo a 12 meses es de 37,68 USD (≈2.791 p) frente a 33,18 USD (2.457,5 p, recompra del 2 de octubre): +15,6 % con el dividendo y +11,5 % en el caso base. Pasa el umbral de la ponderada (15 %) pero no el del base (12 %). El valor intrínseco es de 42,03 USD (≈3.113 p, +26,7 %). Compraríamos por debajo de 33,04 USD (≈2.447 p), prácticamente el precio de hoy, o si los semestrales del 18 de noviembre devuelven el orgánico al 8 %.

**El negocio.** El mayor buró de crédito del mundo: 8.450 M USD de ingresos en el FY26 (a marzo de 2026), 44 % de lo que facturan los tres grandes [A1, B9, B13]. Vende datos de crédito propios, software de decisión, prevención del fraude y servicios al consumidor. ROIC del 17,9 % frente a un WACC del 9,15 %: 8,8 puntos de creación de valor.

**Finanzas.** Ingresos +8,2 % anual y BPA benchmark +9,1 % anual desde el FY19; en el FY26, +13 % de ingresos (8 % orgánico), margen EBIT del 28,6 % y BPA de 1,80 USD (+15 %) [A1, A6]. Deuda neta de 5.180 M, 1,7 veces el EBITDA, y recompra de 1.000 M USD en curso [A7]. El 1T FY27 creció un 7 % orgánico, con Consumer Services frenado (+2 %) [A8].

**Valoración.** A 15,5 veces el BPA de los próximos 12 meses, Experian cotiza a la mitad de su mediana de cinco años (29,4x) y por debajo de Equifax (17,8x) y de la mediana de la muestra (20,9x). El DCF da 41,38 USD y el DCF inverso dice que el precio descuenta un crecimiento del 4,3 % anual frente al 6,8 % de nuestro base. Nuestro base a 12 meses queda un 34 % por debajo del objetivo medio de los analistas (55,18 USD, ≈4.087 p): el BPA es casi el mismo; la diferencia es el múltiplo.

**Riesgos y catalizadores.** El riesgo es que la IA y las puntuaciones alternativas abaraten la consulta de crédito; las cifras aún no lo muestran. El sentimiento está dividido y empeora: el debate gira en torno a la IA, no a los resultados [E1, E4]. Catalizador: los semestrales del 18 de noviembre.

**Qué ha cambiado.** Primer análisis de Experian; el informe de Equifax del 8 de octubre ya la usaba como comparable (17,4x de PER entonces). Las cifras salen de extractos de búsqueda y no de los documentos completos, de ahí la convicción media.`,
    tesis: 'Experian es el buró de mejor calidad (más margen y ROIC que Equifax y TransUnion) y cotiza al PER más bajo de su historia reciente por el miedo a la IA, que las cifras aún no confirman. A 12 meses la regla común, que toma el PER actual, deja el base en +11,5 %: a medio punto de comprar. El valor existe; el catalizador es que el crecimiento orgánico se mantenga en el 7-8 %.',
    vision_diferencial: {
      mercado_descuenta: 'Que la IA recorta a la mitad el crecimiento: 4,3 % anual implícito frente al 8 % orgánico del FY26, y un PER de 14,7x sobre el BPA del FY28e.',
      nuestra_vision: 'El dato propio de los prestamistas no se replica con IA; el crecimiento orgánico se mantendrá en el 7-8 % y el BPA crecerá a doble dígito. No suponemos que el múltiplo vuelva a 25-30x en 12 meses.',
      por_que: 'Más del 90 % de los ingresos son de datos propios y los contratos se renuevan a más plazo (4-10 años) [E1, E3]; B2B creció un 9 % orgánico en el 1T FY27 [A8].',
    },
    a_favor: [
      '**Calidad**: ROIC del 17,9 % y margen EBIT del 28,6 %, los mejores de los tres burós [A1].',
      '**Precio**: 15,5x el BPA de los próximos 12 meses, la mitad de su mediana de cinco años (29,4x).',
      '**Recompra**: 1.000 M USD hasta junio de 2027, un 3 % del capital a estos precios [A1].',
      '**Crecimiento intacto**: 8 % orgánico en el FY26 y 7 % en el 1T FY27; guía de BPA a doble dígito [A1, A8].',
    ],
    en_contra: [
      '**Riesgo de la IA**: el mercado lo descuenta y puede tener razón a largo plazo en las consultas de menos valor.',
      '**Consumer Services frenado**: +2 % en el 1T FY27 [A8].',
      '**Divisa**: cotiza en libras e informa en dólares.',
      '**Cifras de búsqueda**: el balance y el capex son estimaciones; convicción media.',
    ],
    que_vigilar: 'El crecimiento orgánico de B2B en Norteamérica en los semestrales del 18 de noviembre: por encima del 7 %, la tesis se refuerza; por debajo del 5 %, el bajista gana peso.',
    cambiaria_recomendacion: [
      'Si el precio baja de 33,04 USD (≈2.447 p) con el mismo BPA, pasaríamos a Comprar (ponderada ≥ 15 % y base ≥ 12 %).',
      'Si los semestrales suben la guía orgánica o el BPA, subiríamos el base y podríamos pasar a Comprar.',
      'Si el precio sube por encima de 42,64 USD (≈3.159 p) sin mejora del beneficio, la ponderada caería a −10 % y venderíamos.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico del grupo', nivel_actual: '7 % (1T FY27)', umbral_alerta: 'Por debajo del 5 % dos trimestres', por_que: 'Es lo que el mercado duda.' },
      { kpi: 'B2B Norteamérica, orgánico', nivel_actual: '≈7 % (1T FY27)', umbral_alerta: 'Por debajo del 5 %', por_que: 'El corazón del negocio y donde llegaría antes la IA.' },
      { kpi: 'Margen EBIT benchmark', nivel_actual: '28,6 % (FY26)', umbral_alerta: 'Caída a tipos constantes', por_que: 'Mide el poder de precios.' },
    ],
    confianza: 'Baja',
  },

  fuentes: [],
  huecos: [
    { seccion: 'calidad', campo: 'Altman, Beneish y calidad del beneficio', tipo: 'Complemento', intentos: '1) Balance completo no disponible; 2) estado de flujos histórico no disponible; 3) Stock Analysis no legible desde la búsqueda.', decision: 'Omitido' },
  ],
};
