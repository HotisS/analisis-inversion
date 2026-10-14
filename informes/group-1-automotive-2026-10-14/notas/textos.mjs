// Textos del analista principal (Group 1 Automotive, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de la empresa y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados 8-K, del 10-K y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Cuentas en USD con US GAAP; ejercicio natural. El floorplan (líneas de crédito que financian el inventario, 2.181 M a junio de 2026) se trata como pasivo de explotación y no como deuda: el EBITDA del DCF va neto de sus intereses (101,5 M en 2025) y el circulante lo descuenta de las existencias, igual que el flujo operativo ajustado de la empresa [A1, A2]. La deuda del puente (3.363 M) incluye bonos, préstamo de adquisiciones, hipotecas inmobiliarias y arrendamientos financieros; se le suman los ≈1.300 M de la compra de Hennessy, que se paga en el 4T26 con los bonos de septiembre [A40, A49]. El BPA del objetivo a 12 meses y el PER histórico están en base ajustada (sin deterioros, plusvalías ni reestructuración).',

  controles_explicados: [
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (250 USD) queda un 24 % por debajo del objetivo medio (331 USD) por dos razones: el BPA de 2028e (40,4 USD frente a 49,0 de Zacks, la única casa con 2028e) y el múltiplo (6,2x, el PER actual, frente a 7-8x implícito en los objetivos). Ver diferencia_consenso.' },
  ],

  parches: [],

  secciones: {
    comparables: {
      criterio: 'Grupos de concesionarios franquiciados cotizados en EE. UU. y Reino Unido (AutoNation, Penske, Lithia, Asbury, Sonic, Inchcape); CarMax (solo usados) y Rush (camiones) como referencia lejana.',
      comentario: 'Las cifras son de proveedores y fechas distintas (MarketScreener, Yahoo, ValueInvesting.io; principios de octubre de 2026 en su mayoría) y el PER es el del ejercicio en curso de cada proveedor [D22-D34]. La mediana del PER de los concesionarios es de 8,7x (7,3x-11,5x) y Group 1 cotiza a 5,4x el BPA de consenso de los próximos 12 meses: el descuento frente al sector (≈38 %) es mayor que el habitual (10-25 %). Penske tiene encima una oferta de su accionista de control a 210 USD, que sostiene su múltiplo [D26].',
    },
    financieros: {
      comentario: 'Las ventas pasaron de 12.000 M en 2019 a 22.571 M en 2025 (+11 % anual), casi todo por compras (Inchcape en Reino Unido en 2024, ≈3.900 M de ventas anuales) [A1, A5]. El beneficio se disparó en 2021-2022 con la escasez de coches (BPA ajustado de 45,7 USD en 2022) y desde entonces baja: 44,3 en 2023, ≈39 en 2024 y 40,7 en 2025, con menos acciones (−30 % desde 2021) que compensan un beneficio neto que cae [A7, A8, D6]. 2025 lleva 221 M de deterioros y reestructuración (sobre todo Reino Unido), por eso el BPA contable (25,24) queda muy por debajo del ajustado [A1, A2]. En el 1S26 el BPA ajustado cayó un 13 % (18,3 frente a 21,2 USD) por la asequibilidad en EE. UU. [A16, A19].',
    },
  },

  dcf_justificacion: {
    crecimiento: '2026e plano (+0,1 %): el 1S26 cae un 3 % y el 2S26 suma un trimestre de Hennessy; el consenso da 22.240 M [D6]. 2027e +7,1 %: Hennessy (≈1.700 M anuales) [A48] y un 1-2 % orgánico. 2028e +2,9 % (el último trimestre de Hennessy y un 2 % orgánico). Después, 2,5 % hasta 2031e y 2 % al final: inflación de precios y algo de posventa, sin más compras (la empresa compra cada año, pero se financian con deuda y no se pueden proyectar sin su coste).',
    margenes: 'Margen EBITDA neto de los intereses del floorplan: ≈4,3 % en 2025 sin extraordinarios (1.076 M de EBITDA ajustado − 101,5 M de floorplan) [A1, A2]. 2026e 3,95 % (1S26 más flojo, recorte de costes de 50 M ya hecho [A16]); 4,05-4,15 % en 2027-28e con Hennessy y la mejora británica; desde 2029e vuelve medio punto, hasta el 3,7 %, porque el beneficio bruto por coche nuevo sigue normalizándose hacia el de antes de la pandemia (≈3,4 % de margen comparable en 2019).',
    inversion: 'Capex del 1,0 % de las ventas hasta 2028e (270 M en 2025, el 1,2 %, con renovación de instalaciones) y 0,8 % después; amortización del 0,55 %. Circulante del 3 % de las ventas: existencias menos floorplan (2.741 − 1.916 M en 2025 = 3,7 %) [A1].',
    wacc: 'Tasa libre del 5,22 % (bono a 10 años del 13-oct) [D35], beta 0,90 (0,82-0,92 según la fuente) [D5, D15], prima de mercado del 5,5 % y 1 punto adicional por ciclo, tamaño y deuda creciente. Coste de la deuda del 6,2 % (bonos de septiembre al 6,25-6,625 %) [A40]. Peso de la deuda del 55 % (≈4.500 M frente a 2.763 M de capitalización, ya con Hennessy). WACC del 7,57 %.',
    terminal: 'Crecimiento a perpetuidad del 2,0 % (inflación, sin cuota adicional). El valor terminal pesa un 60 %. El múltiplo de salida de contraste (7x EBITDA) daría menos: es el de un sector que el mercado paga barato.',
  },

  puente_comentarios: {
    '2026e': 'Volumen −2,5 % (coches nuevos en EE. UU. de 16,2 a 16,1 M y menos usados por asequibilidad [B17, B25]); precio +1,5 %; otros +1,1 % (un trimestre de Hennessy y libra más fuerte).',
    '2027e': 'Volumen +0,5 % y precio +1,5 %; otros +5,1 % = Hennessy (≈1.700 M de ventas anuales sobre 22.600) [A48], menos las ventas de concesionarios que la empresa prevé hacer para reducir deuda (no cuantificadas).',
    '2028e': 'Volumen +0,5 %, precio +1,5 % y el resto de Hennessy (+0,9 %).',
    '2029e': 'Volumen +1 % (posventa, que crece ≈5 % en el sector [B23]) y precio +1,5 %.',
    '2030e': 'Igual que 2029e.',
  },

  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (2,6 % anual de 2026e a 2035e) sale casi entero de Hennessy, ya pagada con los bonos de septiembre, y del precio; el volumen crece menos que el mercado de EE. UU. desde 2019 (2,1 % anual en unidades) [B19, B23]. La cuota implícita baja del 1,7 % al ≈1,7-1,8 % de las ventas de los concesionarios franquiciados (>1,3 billones USD en EE. UU. más el Reino Unido) [B23]: no exige ganar cuota. La reinversión (capex y circulante) es del 13 % del NOPAT, coherente con un negocio que crece con la inflación. El riesgo no es el crecimiento sino el margen: por eso baja hasta el 3,7 % en el terminal.',

  dcf_lectura: 'El DCF da 400,53 USD por acción (+73 % sobre 231,59), con un WACC del 7,57 % y un valor terminal del 60 %. El rango de sensibilidad (WACC y crecimiento ± 0,5 puntos) va de 305,55 a 536,04 USD: el precio queda por debajo incluso del extremo bajo. El DCF inverso dice que a 231,59 USD el mercado descuenta un margen EBITDA del 3,1 % para siempre (el 3,7 % del caso base, y ≈4,3 % hoy) o que las ventas caigan un 1,6 % al año de 2027 a 2035. Es lo que el mercado suele pagar por los concesionarios: un negocio cíclico, con deuda y con el beneficio de pico de 2022 aún bajando. El DCF se fía de un margen que no está garantizado; por eso no manda y la decisión la toma el objetivo a 12 meses.',

  narrativas: {
    Bajista: 'Recesión suave en EE. UU. o asequibilidad que no mejora: volumen plano, beneficio bruto por coche nuevo de vuelta a niveles de 2019 y margen EBITDA neto de floorplan del 3,55 % en 2028e. Hennessy se integra peor de lo previsto y la deuda (≈3,3x EBITDA) obliga a frenar recompras.',
    Base: 'Mercado de coches nuevos estable (≈16 M en EE. UU.), Hennessy integrada desde el 4T26, posventa creciendo al 4-5 % y margen del 4,15 % en 2028e; deuda hacia 2,5x en 2028 con las ventas de concesionarios anunciadas.',
    Alcista: 'Bajada de tipos que mejora la asequibilidad, volumen +2-3 % anual y Reino Unido en su mejor margen; margen del 4,45 % en 2028e y recompras con la caja (≈300 M autorizados).',
  },
  escenarios_comentario: 'El DCF da 133,80 USD en el bajista (−42 %), 400,53 en el base y 561,10 en el alcista (+142 %). Con la deuda alta, cada décima de margen mueve mucho el valor: el bajista resta 0,6 puntos de margen y 2,5 de crecimiento y baja el terminal al 1,5 %. Le doy un 30 % porque el sector está en la fase baja del ciclo de márgenes y el consumidor de EE. UU. compra menos; el alcista, un 20 %. El valor ponderado es de 352,63 USD.',

  suma_partes_comentario: 'No aplica: EE. UU. (74 % de las ventas) y Reino Unido (26 %) no publican resultado comparable de forma separada en las fuentes disponibles, y el inmobiliario propio (concesionarios en propiedad) no tiene tasación publicada.',

  valoracion_comentario: 'El DCF pesa un 40 %: el negocio genera caja estable fuera del ciclo de márgenes, pero el valor depende mucho del margen terminal. Los comparables pesan un 35 % porque el sector se valora por PER y Group 1 cotiza muy por debajo de sus pares; los escenarios, un 25 % para recoger el riesgo de ciclo. Las transacciones (551,59 USD de mediana) no se usan: son compras de concesionarios privados con prima de control y con inmuebles. Todos los métodos quedan por encima del precio; el valor objetivo es de 378,53 USD. La decisión, sin embargo, la toma el objetivo a 12 meses (PER propio × BPA propio): el valor intrínseco solo se cerrará si el beneficio deja de bajar.',

  rentabilidad_comentario: 'Group 1 crea valor, pero menos que en el pico: el ROIC del motor (NOPAT entre capital invertido sin floorplan) pasó del 17 % en 2021 a ≈11 % en 2025, con un WACC del 7,6 %; el diferencial es de unos 3-4 puntos, por debajo de los 5 que pedimos para comprar. Lo ha movido el margen (el beneficio bruto por coche baja desde 2022) y las compras grandes (Inchcape), que rinden menos que el negocio antiguo: Reino Unido apenas ganó dinero antes de impuestos en 2024 [A5]. El ROE (≈12 % contable en 2025, ≈19 % ajustado) está apalancado por la deuda y por las recompras (−30 % de acciones desde 2021).',

  diferencia_consenso: 'Nuestro base (250,29 USD) queda un 24 % por debajo del objetivo medio de los analistas (331,25 USD; 232-450). La mitad sale del BPA: 40,4 USD en 2028e frente a 49,0 de Zacks (la única casa con 2028e) y 43,8 de consenso en 2027e frente a nuestros 37,3; no contamos recompras no anunciadas (la empresa recompró un 10 % en 2025, lo que solo sumaría ≈4 USD por acción por año) y los intereses suben con los bonos de Hennessy. La otra mitad, del múltiplo: usamos el PER actual (6,2x) porque es menor que la mediana de cinco años (9,6x), mientras los objetivos de los analistas implican 7-8x. Desde octubre, las casas recortan (Morgan Stanley a 232 USD, infraponderar) [D6, D8, D11].',

  objetivo12m_comentario: 'Con la regla común, el objetivo ponderado es de 246,78 USD (+7,5 % con el dividendo del 0,9 %) y el base de 250,29 (+9,0 %): Mantener, lejos de los umbrales de compra (15 % y 12 %). La asimetría es pobre (1,9x): el bajista (5,3x × 28,84 = 152,85 USD, −33 %) pesa un 30 %. El valor intrínseco (378,53 USD) está muy por encima del precio, pero cerrarlo exige que el beneficio deje de caer y que el mercado vuelva a pagar el PER medio. Compraríamos por debajo de 216 USD.',

  catalizadores: {
    items: [
      { fecha: '28-oct-2026', evento: 'Resultados del 3T26 (antes de la apertura) [A43]', efecto: 'Si el BPA ajustado vuelve a crecer frente al 3T25 (10,45 USD) y la deuda baja con ventas de concesionarios, el mercado puede revisar el múltiplo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26', evento: 'Cierre de la compra de Hennessy (10 concesionarios, ≈1.700 M de ventas) [A48]', efecto: 'Suma ≈2-3 USD de BPA anual con la deuda ya emitida; riesgo de integración', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-2027', evento: 'Bajadas de tipos de la Reserva Federal', efecto: 'Mejora la asequibilidad (cuota mensual) y el coste del floorplan', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y plan de capital (recompras frente a deuda)', efecto: 'Si reanuda las recompras grandes, el BPA crece más que nuestro base', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Normalización del beneficio bruto por coche y asequibilidad en EE. UU.', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−33 % (bajista a 12 meses)', mitigante: 'Posventa (≈40 % del beneficio bruto) y F&I, menos cíclicos; recorte de costes de 50 M', senal: 'Beneficio bruto por coche nuevo en EE. UU. por debajo de 3.000 USD o gastos generales > 70 % del margen bruto' },
      { riesgo: 'Deuda al alza con Hennessy (≈3,3x EBITDA sin floorplan) y tipos altos', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (menos recompras, más intereses)', mitigante: 'Inmuebles en propiedad que respaldan parte de la deuda; venta de concesionarios anunciada', senal: 'DN/EBITDA por encima de 3,5x a fin de 2026' },
      { riesgo: 'Reino Unido: mandato de eléctricos (ZEV) y márgenes bajos tras Inchcape', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Récord de margen bruto británico en el 1T26; reestructuración hecha en 2025', senal: 'Nuevos deterioros en Reino Unido' },
      { riesgo: 'Venta directa de fabricantes y agencia (modelo sin concesionario)', tipo: 'Competitivo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Pérdida de múltiplo a largo plazo', mitigante: 'Leyes estatales de franquicia en EE. UU.; la posventa sigue en el concesionario', senal: 'Grandes marcas que pasan a agencia en EE. UU.' },
    ],
    premortem: 'Es octubre de 2027 y la acción vale 160 USD. Los tipos no bajaron, el consumidor de EE. UU. siguió comprando menos y el beneficio bruto por coche nuevo volvió al nivel de 2019. Hennessy costó más integrarla de lo previsto y la deuda superó 3,5x el EBITDA, así que se pararon las recompras. El BPA de 2027 se quedó en 29 USD y el mercado siguió pagando 5-6x. La lección: comprar un cíclico apalancado porque «está barato frente a su historia» sin que el beneficio haya tocado fondo.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Beneficio bruto por unidad', pregunta: '¿Dónde ve la dirección el suelo del beneficio bruto por coche nuevo en EE. UU. y cuánto queda de la normalización?', por_que: 'Es la diferencia entre el escenario base y el bajista (≈100 USD por acción a 12 meses).' },
      { tema: 'Deuda y capital', pregunta: '¿Qué apalancamiento objetivo tiene tras Hennessy y cuánto prevé ingresar con la venta de concesionarios? ¿Retoma recompras en 2027?', por_que: 'Las recompras explicaron casi todo el crecimiento del BPA desde 2022.' },
      { tema: 'Reino Unido', pregunta: '¿Qué margen antes de impuestos espera en Reino Unido en 2027 y qué coste le supone el mandato ZEV?', por_que: 'Es el 26 % de las ventas y casi no gana dinero.' },
    ],
    confianza: 'Media',
  },

  fuentes: [],
  huecos: [],
};
