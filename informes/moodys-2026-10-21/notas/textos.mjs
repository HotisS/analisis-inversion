// Textos del analista (Moody's, corte 2026-10-21, tras el 3T26). Cifras del motor tal cual; citas con la letra de la nota.
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio a 31 de diciembre, US GAAP. Cuentas anuales del XBRL de los 10-K (2016-2025) y trimestres de los 8-K de resultados [A1-A9]. El 10-Q del 3T26 aún no está: las asociadas y las pensiones del puente son de junio [D2]. El BPA del objetivo a 12 meses y su historia van en la base AJUSTADA de la empresa (sin amortización de intangibles comprados ni reestructuración), la del consenso; el BPA publicado de 2026 lleva 296 M de plusvalías por la venta de Regulatory Solutions y Learning Solutions [A1]. El patrimonio contable es pequeño por las recompras: el ROE no significa nada. Precio: cierre del 20-oct-2026 (475,35 USD), antes de los resultados; en la preapertura del 21-oct cotizaba a 462 USD (−2,8 %) a las 7:28 ET [D13].',
  controles_explicados: [
    { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con ocho comparables de negocios distintos (agencias, bolsas, datos) el crecimiento no explica el múltiplo (R² 0,14): no usamos la regresión; los comparables entran por su mediana de PER (22,2x) [D14, D22].' },
  ],
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'El 2026e (+7,5 %) sigue la guía de crecimiento de «un dígito alto», que la empresa mantiene pese a un 3T de +1 % (MIS −1 %, transaccional −5 %) [A1]. Después +7 % en 2027e-2028e (MA crece un 8 % orgánico con un ARR de 3.688 M; la emisión recurrente y el grado de inversión, ligado a la financiación de la IA, sostienen MIS [B1]) y convergencia al 4 % en 2035e: una TCAC del 5,7 %, por debajo del 8,1 % histórico.',
    margenes: 'Margen EBITDA del 50,0 % en 2026e (49,6 % en 2025 y 50,6 % en los últimos 12 meses) [A1, A5], que sube al 53 % con el apalancamiento operativo de MA (margen ajustado del 35,3 % en el 3T26, +100 pb) [A1].',
    inversion: 'Capex del 4,3-5,0 % de las ventas (software capitalizado), con la amortización bajando del 6,0 % al 5,0 % al agotarse los intangibles comprados. Circulante del 25 % de las ventas, el real.',
    wacc: 'Tasa libre del 5,12 % (bono del Tesoro a 10 años, 20-oct) [D19]; beta 1,15 (entre la semanal ajustada de 5 años, 1,13, y la mensual ajustada, 1,21) [D12]; prima de mercado del 5,5 %. Deuda del 7,7 % del valor al 5,8 % antes de impuestos. WACC del 10,90 %: alto para un negocio de esta calidad, por la tasa libre de EE. UU.',
    terminal: 'Media de Gordon al 3 % y de 18 veces el EBITDA de salida (por debajo de su historia, 20-25 veces).',
  },
  puente_comentarios: {
    '2026e': 'Precio: subidas anuales de tarifas de calificación (los recurrentes de empresas subieron 38 M en 2025 solo por precio) [B2]; volumen: MA (+8 % orgánico) y grado de inversión.',
    '2027e': 'Refinanciación de la deuda de 2020-2021 y emisión ligada a centros de datos; MA con ARR al 8 %.',
    '2028e': 'Igual, con algo menos de MA.',
    '2029e': 'Normalización.',
    '2030e': 'Crecimiento cercano al de la deuda mundial más precio.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. Es un negocio de activos ligeros: el crecimiento (5,7 % medio) sale del precio (las agencias suben tarifas cada año en un duopolio con S&P: Moody\'s tiene el 31,4 % de los ingresos de calificación del sector y las tres grandes el 92,4 %) [B5] y del volumen de deuda, sin capital nuevo. ROIC del 30,0 % en 2025 frente a un WACC del 10,9 % y ROIC incremental del 25,2 %.',
  dcf_lectura: 'El DCF da 311,97 USD por acción, un 34,4 % por debajo del precio, con un WACC del 10,90 % y un valor terminal que pesa el 62 %. El DCF inverso dice que el precio de 475,35 USD descuenta un crecimiento del 11,4 % anual frente al 5,5 % de nuestro base, o una rentabilidad implícita del 7,4 %. Con la prima de riesgo que hoy pide el mercado (4,2 %) vale 361,44 USD: ni así llega al precio. El valor depende sobre todo de la tasa: el mercado paga a Moody\'s como un activo de máxima calidad con un coste de capital muy por debajo del nuestro.',
  narrativas: {
    Bajista: 'Un año de emisión como 2022: los diferenciales se abren, el alto rendimiento y los préstamos apalancados siguen cayendo y el grado de inversión se frena; MIS cae y el margen baja 2 puntos [A1, B1].',
    Base: 'MIS crece con la refinanciación y el precio; MA mantiene un 7-8 %; margen del 50 % al 53 %.',
    Alcista: 'La financiación de la IA y la refinanciación de 2027-2028 llevan a MIS a crecer al doble dígito; 2 puntos más de crecimiento y 1 de margen.',
  },
  escenarios_comentario: 'Los tres escenarios del valor intrínseco quedan por debajo del precio: el alcista (367,83 USD) un 22,6 % y el bajista (236,63) un 50,2 %. A 12 meses es distinto: el PER de la regla (27,9x en el base, a mitad de camino hacia su mediana adelantada de 30,6x) da un objetivo ponderado de 553,01 USD (+17,2 %). Las dos lecturas chocan: la regla exige las dos cosas para comprar.',
  valoracion_comentario: 'Pesos: DCF 40 %, comparables 35 % y escenarios 25 %. Los comparables pesan más que en otras empresas porque el DCF depende mucho de la tasa; aun así, a la mediana del sector (22,2x) la acción valdría ≈ 410 USD. La síntesis da 339,13 USD (−28,7 %). El puente resta la deuda (6.911 M) y suma la caja (1.621 M) y las participadas (483 M) [D1, D2].',
  per_excluidos: 'Historia ADELANTADA en BPA ajustado (precio de cierre de cada año ÷ BPA ajustado real del año siguiente, de los 10-K y cierres de Yahoo) [D4-D8, D12]: 2017 20,0x; 2018 16,9x; 2019 23,4x; 2020 23,6x; 2022 28,1x; 2023 31,3x; 2024 31,7x; 2025 30,6x (510,85 ÷ 16,67, nuestro BPA ajustado de 2026e). Excluido 2021 (45,6x): el BPA de 2022 se hundió un 30 % con la caída de la emisión. Mediana y mínimo de los cinco últimos años válidos (2020 y 2022-2025): 30,6x y 23,6x; media de ocho años 25,7x. Actual = 475,35 ÷ 18,68 (nuestro BPA ajustado de 2027e) = 25,4x.',
  just12m: {
    Bajista: 'Un 2027 como 2022: ventas −1 % y 4 puntos menos de margen, recuperación parcial en 2028: BPA ajustado de 17,24 USD.',
    Base: 'Ventas de 9.499 M en 2028e (+7 % anual), margen EBITDA del 51,5 % y recompras del 2,6 % anual: BPA ajustado de 20,71 USD.',
    Alcista: 'Dos puntos más de crecimiento y uno de margen: BPA ajustado de 21,96 USD.',
  },
  diferencia_consenso: 'Nuestro BPA ajustado de 2026e (16,67 USD) está en la mitad de la guía (16,50-17,00) y un 1,4 % bajo el consenso (16,90); el de 2027e (18,68) casi igual al consenso (18,76) [D14]. La diferencia con el objetivo medio de los analistas (551,38 USD, 24 analistas) es pequeña: nuestro objetivo ponderado es de 553,01 USD.',
  objetivo12m_comentario: 'Objetivo ponderado de 553,01 USD: +17,2 % con dividendo (+22,4 % en el base), por encima del 15 %. El base supone que el BPA ajustado crece un 11,5 % anual hasta 2028e y que el PER sube de 25,4x a 27,9x, a mitad de camino hacia su mediana adelantada (30,6x). Pero el valor intrínseco (339,13 USD) está un 28,7 % por debajo del precio: la regla no da Comprar. Con el BPA un 10 % más bajo, la rentabilidad cae al 5,5 %.',
  rentabilidad_comentario: 'Crea valor con holgura: ROIC del 30,0 % en 2025 (101 % sin el fondo de comercio de Bureau van Dijk y otras compras) frente a un WACC del 10,9 %, y ROIC incremental del 25,2 %. El motor es el margen (49,6 % de EBITDA) y un capital casi nulo fuera del fondo de comercio: los clientes pagan por adelantado.',
  catalizadores: {
    items: [
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Fija el crecimiento de MIS con la refinanciación de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Mensual', evento: 'Emisión de deuda de empresas (alto rendimiento y préstamos apalancados)', efecto: 'Primer indicador de los ingresos transaccionales de MIS', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Bajadas o subidas de tipos de la Fed y el BCE', efecto: 'La empresa ya supone otra subida en su guía [A1]', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Caída de la emisión de deuda (alto rendimiento −40 % en el 3T26)', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % del BPA en un año como 2022', mitigante: 'Ingresos recurrentes de MA (99 % recurrentes) y de vigilancia de calificaciones', senal: 'Ingresos transaccionales de MIS con caídas de dos dígitos [A1]' },
      { riesgo: 'La IA abarata los datos y el software de MA', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a −15 %', mitigante: 'Datos propios (Orbis, calificaciones) y ARR creciendo un 8 %', senal: 'ARR por debajo del +6 % [A1]' },
      { riesgo: 'Múltiplo: 25,4 veces el BPA ajustado de 2027e frente a 22,2 de los comparables', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−12 % si cotiza como los comparables', mitigante: 'Calidad del duopolio', senal: 'Recortes de objetivos de los analistas (cinco en octubre) [D17]' },
      { riesgo: 'Regulación de las agencias de calificación', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Multas; en 2024 la SEC multó con 20 M USD por registros [B13]', mitigante: 'Barreras de entrada que la propia regulación crea', senal: 'Expedientes de la SEC o de ESMA' },
    ],
    premortem: 'Es octubre de 2027 y Moody\'s ha perdido un 30 %. Lo más probable: una recesión suave en 2027 cerró el mercado de alto rendimiento y de préstamos apalancados, MIS cayó un 10 % y el BPA ajustado se quedó plano; a la vez, el mercado dejó de pagar 25-30 veces por las empresas de datos por miedo a la IA, como en febrero de 2026. La señal: los ingresos transaccionales de MIS cayendo dos trimestres seguidos.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Cuarto trimestre', pregunta: '¿Qué crecimiento de ingresos necesita el 4T26 para cumplir la guía de «un dígito alto» tras un 3T de +1 %?', por_que: 'Si no llega, el consenso de 2026 baja.' },
      { tema: 'Financiación de la IA', pregunta: '¿Qué parte de la emisión de grado de inversión de 2026 viene de grandes tecnológicas y centros de datos?', por_que: 'Es una concentración nueva de los ingresos de MIS.' },
      { tema: 'Recompras', pregunta: '¿Seguirá recomprando por encima del flujo libre (2.553 M en nueve meses) si baja la emisión?', por_que: 'La deuda sube y el patrimonio baja [A1].' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [],
};
