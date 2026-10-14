// Textos del analista (Aena, corte 2026-10-14). Citas con la letra de la nota.
const casos12m = [
  { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 1.34, multiplo: null, precio: null, justificacion: 'Ingresos de 7.274 M en 2028e (−1,5 puntos de crecimiento en 2027-28: ocupación débil y menos gasto comercial) y margen EBITDA del 54,5 % (OPEX al ritmo de 2025 con tarifas casi planas): EBIT de 2.991 M con la amortización del base (la inversión ya está comprometida), −290 M de financieros, 24 % de impuesto, 40 M de minoritarios y 1.500 M de acciones.' },
  { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 1.48, multiplo: null, precio: null, justificacion: 'Ingresos de 7.488 M (tráfico +2 %, tarifa +0,33 % del DORA III y comercial por encima del tráfico) y margen del 56,5 %: EBIT de 3.257 M, −290 M de financieros (deuda neta camino de 8.400 M por la inversión y el dividendo del 80 %), 24 % de impuesto, 40 M de minoritarios de Luton y 1.500 M de acciones. Cuadre: la misma fórmula da 1,42 EUR en 2025, el BPA publicado.' },
  { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 1.55, multiplo: null, precio: null, justificacion: 'Ingresos de 7.632 M (+1 punto de crecimiento: turismo récord y más gasto comercial por pasajero) y margen del 57,5 %, el de 2026e mantenido: EBIT de 3.397 M y BPA de 1,55 EUR.' },
];

export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Aena, la CNMV y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de las notas de resultados de Aena, de la prensa financiera y de agregadores (MarketScreener, Stock Analysis, Simply Wall St), con la URL como fuente; la confianza es menor que en un análisis normal. Cuentas en EUR, NIIF-UE, ejercicio natural. Por acción, todo va en acciones nuevas tras el desdoblamiento 10 por 1 de 2025 (1.500 M de acciones) [A17]. El balance solo tiene la deuda neta y el patrimonio de 2025: el ROIC del motor (22,2 %) usa un capital invertido incompleto; con patrimonio más deuda neta de 2025 (14.664 M) el ROIC es ≈15 % (estimación propia). El EBIT y el BAI de 2022-2023 son estimación propia; los de 2024-2025, de MarketScreener [A8]. El impuesto incluye los minoritarios. El precio es el último cierre encontrado (9-oct-2026, 24,88 EUR) [D1, D2]; no se encontró el del 13-oct. Los precios de cierre de 2022-2023 son estimación a partir del ADR.',

  controles_explicados: [
    { control: 'Capitalización calculada', explicacion: 'La publicada (38.820 M) es de Rankia a 25,88 EUR del 27-sep; con 24,88 EUR del 9-oct y 1.500 M de acciones son 37.320 M: misma cifra de acciones.' },
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (22,64 EUR) queda un 16 % por debajo del objetivo medio (26,82 EUR): usamos el PER mediano de 15,3x y un BPA de 2028e de 1,48 EUR con la inversión del DORA III a cargo de la deuda. Ver diferencia_consenso.' },
  ],

  parches: [],

  secciones: {
    comparables: {
      comentario: 'Solo se han podido reunir PER de proveedores y fechas distintos (julio-agosto de 2026): ADP 18,2x el BPA de 2026e, Flughafen Zürich 20,8x y Fraport 15,0x (ambos de los últimos 12 meses), ASUR 14,2x y Corporación América 12,9x [D7, D8, D9, D16, D17]. La mediana es 15,0x, y Aena cotiza a unos 15,9x el BPA de los próximos 12 meses: en línea con los europeos regulados y por encima de los latinoamericanos. Con un crecimiento parecido y más regulación, no vemos razón para una prima. El peso de los comparables es bajo (15 %) por la mala calidad de los datos.',
    },
    multiplos_historicos: {
      comentario: 'Aena ha cotizado entre 15x y 17x el beneficio publicado en 2023-2025: 15,1x en 2023, 15,3x en 2024 y 16,7x en 2025 (precios de 2023-2024 estimados; 2022 excluido) [D12, D13, A12]. Hoy cotiza a 17,3x nuestro BPA de 2027e y a 15,9x el del consenso de los próximos 12 meses: dentro del rango. La subida de 2025 (+20,7 %) se apoyó en la recuperación del beneficio, no en una expansión del múltiplo; el DORA III con tarifas casi planas no justifica pagar más que la mediana.',
    },
  },

  rentabilidad_comentario: 'Aena crea valor: el NOPAT de 2025 (2.233 M) sobre patrimonio más deuda neta (14.664 M) da un ROIC de ≈15 % (estimación propia; el 22,2 % del motor usa un capital invertido incompleto), unos 7 puntos por encima del WACC del 7,84 % [A1, A9]. Lo mueve el margen (59 % de EBITDA en un monopolio regulado), no la rotación. El ROIC incremental histórico del motor (12,4 %) recoge la recuperación del tráfico tras la pandemia sobre un capital casi fijo, y no se repetirá: la inversión del DORA III (9.991 M regulados) rinde la tasa regulada (la CNMC proponía un 7,4 % antes de impuestos) [B1, B11], así que el ROIC medio bajará hacia el 10-12 % a medida que entre el capital nuevo. ADP y Fraport tienen ROIC más bajos, por inversión y deuda.',

  dcf_justificacion: {
    crecimiento: '2026e se fija en +8 % (ingresos del 1S26 +10,1 % y tarifa de 2026 ya aplicada; consenso de ingresos de 6.870 M) [A2, D4]. En 2027-2031 el DORA III sube el ingreso regulado un 0,33 % al año [B3]; el tráfico, al ≈2 % (la CNMC prevé un 2,2 %, Aena un 1,3 %) [B1], y el comercial, 1-2 puntos por encima. Resultado: 4,0-4,5 %. En 2032-2033, el DORA IV retribuirá la nueva base de activos y el crecimiento sube medio punto antes de converger al 2,5 %.',
    margenes: 'El margen EBITDA fue del 59,3 % en 2025 y del 54,5 % en el 1S26 (56,5 % un año antes) porque el OPEX crece más que los ingresos (+11,1 % en 2025) [A1, A2]. Proyectamos el 57,5 % en 2026e y el 56,5 % en el DORA III (costes que suben con la inflación y tarifas casi planas), con una recuperación al 57 % desde 2032. El riesgo es a la baja: el DORA III recalcula el OPEX a precios de 2026, pero no protege de la inflación posterior [D5].',
    inversion: 'Es el supuesto que más valor mueve. El DORA III prevé 12.888 M en 2027-2031 (9.991 M regulados), unos 2.600 M al año en España, a lo que se suman Brasil (5.700 M de reales para 11 aeropuertos) y Luton [B4, A1]. Eso es un capex del 33-35 % de las ventas en 2027-2029, frente a ≈20 % en 2025 (estimación propia). La amortización sube del 12,5 % al 16 % de las ventas y el capex baja al 17 % en el terminal, por encima de la amortización. Circulante: −3 % de las ventas (los cobros a aerolíneas y concesionarios se adelantan a los pagos).',
    wacc: 'Bund a 10 años del 3,53 % [D14]; beta de 0,9 (aeropuertos europeos, con riesgo de tráfico y de regulación; no se pudo calcular la propia); prima de mercado del 5,5 % y 0,5 puntos adicionales por el riesgo regulatorio y por Brasil. Coste de la deuda del 3,5 % (rating A2 de Moody’s) [D11] y 18 % de deuda a valor de mercado. WACC del 7,84 %, por encima del 7,4 % antes de impuestos que proponía la CNMC como rentabilidad regulada [B1].',
    terminal: 'Gordon con crecimiento del 2,0 % (inflación de la zona euro y algo de tráfico real), por debajo del Bund menos medio punto. El valor terminal pesa el 71 % del valor. El múltiplo de salida implícito se compara con los 11x de EV/EBITDA de hoy.',
  },
  puente_comentarios: {
    '2026e': 'Tráfico del grupo +3-4 % (+3,9 % en el 1S26), subida de tarifa de 2026 y comercial al +10 % [A2, A3, B10].',
    '2027e': 'Tráfico +2 %, tarifa +0,33 % del DORA III [B3]; mezcla comercial y Brasil, el resto.',
    '2028e': 'Igual que 2027e, con el gasto comercial por pasajero subiendo más que la inflación [A1].',
    '2029e': 'Igual; las ampliaciones de Barajas y El Prat empiezan a dar capacidad [B2].',
    '2030e': 'Igual.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'La proyección reinvierte el 35 % del NOPAT y supone que el capital nuevo rinde un 8,7 %, por debajo del ROIC incremental histórico (12,4 %): las dos pruebas del motor pasan y el caso base no hay que rebajarlo. Pero el veredicto es «En parte» y no «Sí»: el foso es regulatorio y el crecimiento depende de lo que el Gobierno conceda cada cinco años (+0,33 % al año en el DORA III frente al +3,82 % pedido) [B3]; el capital nuevo rinde la tasa regulada, cerca del WACC, así que crecer apenas crea valor. La cuota no aplica (monopolio) y la prueba de mercado final va en null.',
  dcf_lectura: 'El DCF da 19,72 EUR por acción, un 21 % por debajo de los 24,88 EUR de cotización, con el 71 % del valor en el terminal. La causa es la inversión: con un capex del 33-35 % de las ventas en 2027-2029, la caja libre para el accionista cae de ≈1.770 M en 2026e a ≈840-930 M en 2027-2028, y el dividendo del 80 % se pagará con deuda. El DCF inverso dice que el precio exige un crecimiento del 6,4 % anual en los años no fijos, frente al 3,9 % de nuestro caso base, o una rentabilidad del 6,9 %, por debajo del WACC. Es exigente: con tarifas que suben un 0,33 % al año, crecer al 6 % pide un tráfico del 4-5 % sostenido, el doble de lo que prevé la CNMC [B1]. El mercado valora a Aena por su dividendo y su beneficio, no por su caja libre de los próximos cinco años.',

  narrativas: {
    Bajista: 'El tráfico se frena (ocupación más débil, combustible caro, menos turismo) y crece un 0,5-1 % en 2027-2029; el OPEX sigue subiendo más que los ingresos y el margen baja al 54,5 %, como en el 1S26. Ya pasó en 2022-2023, con costes que no se trasladaron a tarifas.',
    Base: 'Tráfico +2 % al año, tarifas +0,33 %, comercial por encima del tráfico y margen del 56,5 %; la inversión del DORA III se ejecuta según el plan y la deuda neta sube a ≈8.400 M en 2028.',
    Alcista: 'El turismo sigue en récord, el gasto comercial por pasajero sube y el margen se mantiene en el 57,5 %; el DORA IV retribuye bien la nueva base de activos.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio: el bajista vale 14,59 EUR (−41 %) y el alcista 22,42 EUR (−10 %). La asimetría es negativa porque el valor depende de la inversión, que se hace en los tres casos. Para justificar el precio con el DCF hace falta un crecimiento del 6,4 % o una tasa de descuento del 6,9 %.',

  suma_partes_comentario: 'No aplica: la red española es más del 85 % del EBITDA; Luton y Brasil no tienen datos separados en este análisis.',

  valoracion_comentario: 'Pesamos el DCF al 60 % porque la inversión del DORA III es lo que define el valor y solo el DCF la recoge; los escenarios al 25 % y los comparables al 15 %, con poco peso por sus datos de mala calidad (PER sueltos de fechas distintas). No hay transacciones con múltiplo. Los métodos dan señales distintas: el PER de los próximos 12 meses (22,15-28,39 EUR) se acerca al precio, mientras que el DCF queda un 21 % por debajo. La diferencia es la caja: el mercado paga por el beneficio contable (con un PER de ≈16x) un negocio cuya caja libre se reducirá a la mitad durante cinco años. La deuda neta del puente es la contable de junio de 2026 (6.724 M) [A3], ya después del dividendo; los minoritarios de Luton no se han podido valorar (se dejan en 0).',

  diferencia_consenso: 'Nuestro BPA de 2028e (1,48 EUR) está cerca de lo que implica el consenso (1,56 EUR en 2026e [D4], sin cifras fiables de 2027-2028): la diferencia no está en el beneficio sino en el múltiplo. Nuestro base (22,64 EUR) queda un 16 % por debajo del objetivo medio (26,82 EUR) porque la regla común usa la mediana de 5 años (15,3x), por debajo del PER actual (17,3x), y los analistas que suben objetivo (Jefferies 29,5 EUR, Bank of America 30,7 EUR) aplican múltiplos de 18-20x o DCF con menos inversión [D5, B4]. No acercamos la cifra: la revisión de supuestos no muestra un error.',
  objetivo12m_comentario: 'El objetivo a 12 meses (≈22,4 EUR) queda por encima del valor intrínseco (19,72 EUR): por una vez, el valor real está por debajo del precio a un año. El mercado paga 16-17x un beneficio que sigue creciendo (+12 % en el 1S26), mientras la caja libre se reduce por la inversión. Para cerrar la distancia hacia arriba haría falta un DORA IV generoso (2032) o un tráfico muy por encima del 2 %; hacia abajo, que el mercado empiece a valorar la caja y no el beneficio. Ninguno tiene fecha en 12 meses.',

  catalizadores: { items: [
    { fecha: '2026-10-28', evento: 'Resultados de 9M26', efecto: 'Margen del 3T (el de más tráfico) y guía de tráfico de 2027', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-11/12', evento: 'Actualización del plan estratégico tras el DORA III', efecto: 'Plan de inversión, financiación y política de dividendo', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2027-01', evento: 'Entrada en vigor de las tarifas de 2027 (+0,33 %)', efecto: 'Fija el ingreso regulado del año', probabilidad: 'Alta', sentido: '−' },
    { fecha: '2027-02', evento: 'Resultados de 2025 y dividendo con cargo a 2026', efecto: 'Primer dividendo con la inversión del DORA III en marcha', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Adjudicación de las grandes obras de Barajas y El Prat', efecto: 'Confirma el ritmo de inversión', probabilidad: 'Media', sentido: '−' },
  ], confianza: 'Media' },

  riesgos: { items: [
    { riesgo: 'Rentabilidad de la inversión del DORA III', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−15/−25 % (bajista del DCF −41 %)', mitigante: 'La base de activos nueva se retribuye en el DORA IV', senal: 'Coste de capital regulado del DORA IV y desviaciones de la inversión' },
    { riesgo: 'Margen: OPEX que crece más que los ingresos', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−2 puntos de margen ≈ −0,14 EUR de BPA (≈−10 %)', mitigante: 'OPEX recalculado a precios de 2026 en el DORA III', senal: 'Margen EBITDA del 3T26 por debajo del 62 %' },
    { riesgo: 'Caída del tráfico (turismo, combustible, geopolítica)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1 punto de tráfico ≈ −1,5 % de EBITDA', mitigante: 'Costes en gran parte fijos pero tarifas reguladas con ajustes', senal: 'Tráfico mensual por debajo del +1 %' },
    { riesgo: 'Intervención del Estado como accionista', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Recorte de dividendo o inversiones sin retorno', mitigante: 'Ley de regulación aeroportuaria y supervisión de la CNMC', senal: 'Cambio de presidente o de la política de dividendo' },
    { riesgo: 'Brasil (divisa y concesiones)', tipo: 'País', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2/−4 %', mitigante: 'Peso pequeño en el grupo', senal: 'Real brasileño y tráfico de Brasil' },
    { riesgo: 'Dividendo financiado con deuda', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Deuda neta de 6.724 M a ≈8.400 M en 2028e', mitigante: 'Rating A2 y DN/EBITDA bajo (1,7x)', senal: 'DN/EBITDA por encima de 2,5x' },
  ], premortem: 'Es octubre de 2029 y Aena ha caído un 40 %. El tráfico creció un 1 % al año, no un 2 %, porque el combustible caro y la crisis de ocupación de 2026 recortaron capacidad de las aerolíneas de bajo coste en España. Las tarifas subieron un 0,33 % como fijó el DORA III, pero el OPEX lo hizo al 5-6 % y el margen bajó del 59 % al 53 %. Al mismo tiempo, la inversión de Barajas y El Prat se ejecutó con sobrecostes, la deuda neta pasó de 1,7x a 2,8x el EBITDA y la empresa recortó el payout del 80 % al 60 % para conservar el rating. El mercado, que pagaba 16-17x el beneficio por su dividendo, pasó a valorarla por su caja libre, negativa, y el PER bajó a 12x. La señal que lo habría anticipado: el margen del 1S26 (54,5 %, −2 puntos) y la guía de tráfico de 2026 (+1,3 %).', confianza: 'Media' },

  preguntas: { items: [
    { tema: 'Inversión', pregunta: '¿Qué rentabilidad regulada tiene la inversión del DORA III y cuándo entra en la base de activos?', por_que: 'Define si crecer crea valor.' },
    { tema: 'Dividendo', pregunta: '¿Se mantiene el payout del 80 % con una caja libre negativa desde 2027?', por_que: 'Es lo que sostiene el múltiplo.' },
    { tema: 'Margen', pregunta: '¿Qué parte del aumento del OPEX de 2025-2026 es estructural (personal, seguridad, energía)?', por_que: 'El margen del 1S26 bajó 2 puntos.' },
    { tema: 'Tráfico', pregunta: '¿Qué capacidad tienen comprometida las aerolíneas para el invierno 2026-27 y el verano de 2027?', por_que: 'La dirección avisó de menor ocupación.' },
    { tema: 'Comercial', pregunta: '¿Cuánto del crecimiento comercial viene de nuevos contratos de tiendas y restauración frente a gasto por pasajero?', por_que: 'Es la única palanca no regulada.' },
    { tema: 'Brasil', pregunta: '¿Cuánta inversión y deuda queda en Brasil y qué rentabilidad dan las concesiones?', por_que: 'Sin datos separados en este análisis.' },
  ], confianza: 'Media' },

  casos12m,
  fuentes: [],
  huecos: [],
};
