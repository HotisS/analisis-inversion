// Textos del analista (Siemens Healthineers, corte 2026-10-14). Cifras del motor tal cual; hechos con cita de la nota.
const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 51,62 € (BPA ajustado de FY2028e por el PER de la regla v3, que lleva el múltiplo de 14,9 veces a mitad de camino hacia su mediana adelantada de 23,4), una rentabilidad ponderada del 39,7 % con el dividendo y del 42,6 % en el caso base; el valor intrínseco es de 42,93 € (+14,0 %) y el objetivo medio de los analistas, 45,14 € [D2]. La regla a 12 meses da Comprar, pero se queda en Mantener por tres motivos: el precio de referencia (37,67 €) es del 27-sep y no hay cierre de octubre [D1]; las cuentas salen de agregadores y no del informe anual, así que la confianza en los datos de núcleo es baja (regla del usuario: confianza baja no puede ser Comprar), y la calidad no llega al listón: el ROIC, estimado en un 8-9 %, apenas supera el WACC del 7,61 %. La convicción subiría con un cierre verificado por debajo de 41,95 € y las cuentas del 5-nov confirmando un BPA ajustado de FY2026 de al menos 2,35 € [D8, A1].

**El negocio.** Dos negocios buenos y uno malo: Imaging gana un 26,5 % de margen EBIT ajustado y Precision Therapy (Varian) crece un 9,2 % con un 17,5 %, mientras Diagnostics cae un 5,5 % y gana un 4,1 % [A1, A12]. La compra de Varian dejó 12.000 M de deuda neta (2,8 veces el EBITDA) y un capital invertido lleno de fondo de comercio, de ahí un ROIC que no crea valor holgado [A13]. Sostenibilidad del crecimiento: **En parte**. El 4,6 % anual que proyectamos sale de la base instalada y la cartera (book-to-bill de 1,14) sin apenas capital nuevo, pero el margen EBITDA del 20,2 al 22,5 % exige arreglar o segregar Diagnostics y que los aranceles no vuelvan [A2, A14].

**Finanzas.** Caja libre de 2.714 M en FY2025 (+27 %) y de unos 1.000 M en el 3T26 [A3, A13]. La guía de FY2026 se recortó dos veces en ventas (3,5-4,0 % comparable) y la de BPA subió a 2,35-2,45 € gracias a unos 0,15 € de aranceles devueltos, que no se repiten [A1, A12]. El BPA ajustado (2,39 € en FY2025) supera al publicado en unos 0,47 €, con ajustes recurrentes [A2, A8].

**Equipo y gobierno.** Resta: Siemens AG controla un 71 % y preside el consejo con un directivo suyo; la escisión del 30 % a sus accionistas se votará en febrero de 2027 y puede crear presión vendedora antes de mejorar el flotante [C4, C5, C6].

**Valoración.** El precio descuenta un crecimiento del 2,8 % frente al 4,6 % de nuestro base, con una rentabilidad implícita del 8,2 %: no es exigente. A 37,67 € la acción cotiza a 14,9 veces nuestro BPA ajustado de FY2027e, en línea con GE HealthCare y Philips (13-14 veces) y muy por debajo de su mediana de 23,2 veces [D5]. Las reglas discrepan: la relativa da Comprar y la absoluta Mantener, porque el WACC del 7,61 % pesa más que la prima del mercado.

**Riesgos y catalizadores.** China en Diagnostics, aranceles y la escisión de Siemens AG son los tres riesgos de más peso; el bajista vale 28,21 €. Catalizadores: resultados y guía de FY2027 el 5-nov-2026 y la decisión sobre Diagnostics [D8, A15]. Los foros están divididos: tienen razón en Diagnostics y ven valor tras la caída [E1, E4].

**Qué cambiaría la decisión.** Compra por debajo de 41,95 € con datos verificados; venta por encima de 58,47 €. Pasaría a Comprar con un precio confirmado bajo ese nivel, cuentas primarias y una guía de FY2027 con BPA ajustado de al menos 2,50 €; a Vender, con un tercer recorte de guía o margen de Diagnostics negativo.`;

export default {
  limitaciones: 'Entorno sin red salvo la búsqueda web: no se pudieron abrir el informe anual ni las notas de prensa completas. Las cuentas FY2021-FY2025 son parciales y en parte de agregadores (TipRanks, Weiss Ratings) [A4, A9, A10]; el balance y los flujos solo tienen FY2025. El precio es el de Lang & Schwarz del 27-sep-2026 (37,67 €), el último publicado que se encontró [D1]. Los PER históricos usan el cierre de diciembre (no hay cierres de septiembre) y el de diciembre de 2025 es estimado. La deuda neta del puente es la publicada (≈12.000 M a 30-jun-2026) sin desglose. Comparables reutilizados de otros análisis del 14-oct [D11].',
  controles_explicados: [
    { control: 'Comprar pendiente de confirmar', explicacion: 'La síntesis dice qué confirmar: cierre de octubre verificado, cuentas y balance del informe anual (5-nov) y ROIC; la calidad tampoco pasa (ROIC − WACC ≈ +1).' },
    { control: 'Sección de núcleo con datos: rentabilidad', explicacion: 'Sin balance completo el motor no calcula el ROIC; la estimación propia (8-9 %) está en el comentario de rentabilidad y en la síntesis.' },
    { control: 'ROIC', explicacion: 'Balance incompleto: el ROIC del motor no tiene sentido; ver estimación propia en el texto.' },
  ],
  rentabilidad_comentario: 'El motor no puede calcular el ROIC: solo hay activo total y caja de FY2025 [A9]. Estimación propia: un NOPAT ajustado de unos 2.800 M (EBIT ajustado de algo menos de 3.900 M por un 73 %) [A2] sobre un capital invertido de más de 30.000 M (deuda neta de 12.000 M más un patrimonio que recoge el fondo de comercio de Varian) da un ROIC del 8-9 %, entre 0,5 y 1,5 puntos por encima del WACC del 7,61 %. Imaging, con un 26,5 % de margen, crea valor; Diagnostics, con un 4,1 %, lo destruye [A1]. ROIC − WACC ≈ +1 punto: lejos de los 5 puntos que pide la regla de compra.',
  dcf_justificacion: {
    crecimiento: 'FY2026e al 2,0 % publicado (fijo): crecimiento comparable del 3,5-4,0 % menos el efecto divisa del dólar [A1]. Después 5,0-5,5 % en FY2027-FY2030, en la parte baja del 5-8 % comparable de FY2023-FY2025 [A3, A11], con Diagnostics estancado, y bajada al 3,0 % en FY2033e.',
    margenes: 'Margen EBITDA del 20,2 % en FY2025 (agregador) [A9]; 20,6 % en FY2026e con aranceles devueltos y hasta 22,5 % en FY2030e: Imaging se mantiene en el 26 %, Precision Therapy sube y Diagnostics se recupera o sale del perímetro [A1, A12]. Es el supuesto más exigente.',
    inversion: 'Inversión del 5,3 % de las ventas en FY2025 (1.236 M, derivada de flujo operativo y caja libre) [A9, A3]; 6,3 % en FY2027-FY2030 porque incluye la inversión en circulante (no hay balance para separarlo) y 5,9 % después. Amortización del 5,2 % (1.230 M en FY2025).',
    wacc: 'Bund a 10 años del 3,53 % [D6], beta de 1,0 (sin beta propia disponible: medtech diversificada), prima de mercado del 5,5 %, coste de la deuda del 3,5 % antes de impuestos (préstamos de Siemens AG) y un 22 % de deuda a valor de mercado (12.000 M sobre 54.492 M). WACC del 7,61 %.',
    terminal: 'Crecimiento a perpetuidad del 2,0 %, igual a la inflación esperada del euro y medio punto por debajo de la tasa libre menos el margen exigido.',
  },
  puente: {
    '2026e': 'Guía comparable del 3,5-4,0 % [A1]: volumen del 2 %, precio del 1,8 % y −1,8 puntos de divisa.',
    '2027e': 'Book-to-bill de 1,14 en equipos y servicio sobre la base instalada [A2]; precio del 1,5 %.',
    '2028e': 'Precision Therapy al 8-9 % y Imaging al 5 % [A1]; Diagnostics plano.',
    '2029e': 'Mismo ritmo que 2028e, sin compras.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El crecimiento proyectado (4,6 % medio en los años no fijos) está por debajo del 5-8 % comparable de FY2023-FY2025 y se apoya en la base instalada, el servicio y la cartera de equipos, que no exigen capital nuevo relevante [A2, A3]. Prueba a mano (la reinversión es menor del 15 % del NOPAT): con capex del 6,3 % frente a una amortización del 5,2 %, la inversión neta cubre el circulante de un crecimiento del 5 %. Lo que no está demostrado es el margen: pasar del 20,2 % al 22,5 % de EBITDA exige resolver Diagnostics (margen del 4,1 %) [A1]. Por eso «En parte»; no se rebaja el base porque ninguna prueba cuantitativa falla, pero el bajista recoge un punto menos de margen.',
  dcf_lectura: 'El DCF da 42,93 € por acción (+14,0 %), con un 70 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 2,8 % anual frente al 4,6 % de nuestro base, y una rentabilidad implícita del 8,2 %, por encima del WACC del 7,61 %. No es exigente: el mercado paga por una empresa que crece por debajo de su historia y que no arregla Diagnostics. La sensibilidad al margen es alta: el bajista (un punto menos de margen, dos menos de crecimiento y WACC +0,5) vale 28,21 €, un 25 % menos. Con datos de cuentas de agregador y sin balance completo, la cifra es orientativa.',
  narrativas: {
    Bajista: 'China sigue hundiendo Diagnostics, los aranceles vuelven y la escisión del 30 % deja papel en el mercado: crecimiento dos puntos menor, margen un punto menor y un WACC medio punto mayor. Ya pasó en FY2026, con dos recortes de guía.',
    Base: 'Imaging y Precision Therapy crecen con la cartera, Diagnostics se estabiliza o se segrega y el margen EBITDA llega al 22,5 % en FY2030.',
    Alcista: 'La segregación de Diagnostics a buen precio y la IA en imagen suben el crecimiento un punto y el margen medio punto.',
  },
  escenarios_comentario: 'Bajista 28,21 € (−25,1 %), base 42,93 € (+14,0 %) y alcista 47,90 € (+27,2 %), con probabilidades de 30/50/20. La asimetría del DCF es de 1,08 veces: se gana poco más de lo que se pierde. En el objetivo a 12 meses el bajista (37,85 €) apenas pierde porque el múltiplo de partida (14,9 veces) ya está en mínimos de su historia.',
  suma_partes_comentario: 'Sería el método natural (Imaging, Precision Therapy y Diagnostics tienen márgenes de 26,5 %, 17,5 % y 4,1 %) [A1], pero no hay resultados anuales por segmento verificados; queda como pregunta abierta.',
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 30 % y escenarios 20 %; sin transacciones con múltiplo verificado ni suma de partes. Los comparables por EV/EBITDA sobrevaloran a Healthineers (44-90 € por acción) porque mezclan instrumentación de laboratorio cara (Danaher, Thermo Fisher) con imagen barata; el PER de GE HealthCare y Philips (13-14 veces) es la referencia más útil [D5]. La síntesis ponderada da 41,95 € (+11,4 %).',
  oj: {
    Bajista: 'Ventas de FY2028e de 25.415 M (dos puntos menos de crecimiento en FY2027-28), margen EBIT ajustado del 16,2 %: 4.117 M, menos 330 M de intereses, impuesto del 26,5 %, 1.128 M de acciones y 0,07 € de amortización de compras neta (calibrada con el 2,39 € de FY2025) = 2,54 €.',
    Base: 'Ventas de 26.412 M y margen EBIT ajustado del 17,2 %, con Imaging y Varian creciendo y Diagnostics estabilizado: 4.543 M menos 320 M de intereses, impuesto del 26,5 % y 1.128 M de acciones = 2,82 €, un crecimiento anual del 12 % desde los 2,25 € subyacentes de FY2026.',
    Alcista: 'Ventas de 26.916 M (un punto más de crecimiento) y margen del 17,7 %: 2,97 €.',
  },
  diferencia_consenso: 'No hay estimaciones de BPA del consenso en abierto para FY2027-FY2028. Nuestro BPA ajustado de FY2027e (2,53 €) supone un crecimiento del 12 % sobre los 2,25 € subyacentes de FY2026, coherente con el crecimiento de dos dígitos que apunta la dirección [A12]. Nuestro precio base (52,73 €) queda un 17 % por encima del objetivo medio de 45,14 € de 20 analistas, que ha caído desde 57,67 € en noviembre de 2025 [D2, D10]: la diferencia está en el múltiplo (18,7 veces de la regla v3 frente a unas 16-18 veces implícitas), no en el beneficio. Lo mantenemos porque la regla es común y está contrastada con el backtest, pero con datos de agregador es una razón más para no comprar sin verificar.',
  objetivo12m_comentario: 'El objetivo a 12 meses (51,62 €) supera en un 20 % al valor intrínseco (42,93 €): la regla v3 supone que el PER recupera la mitad de la distancia a su mediana adelantada, y nuestro DCF, con un WACC del 7,61 % y Diagnostics dentro, no lo justifica del todo. La rentabilidad depende de que el BPA crezca un 12 % anual y de que el mercado vuelva a pagar 18-19 veces. El catalizador con fecha es la guía de FY2027 del 5-nov-2026 [D8].',
  catalizadores: { items: [
    { fecha: '2026-11-05', evento: 'Resultados del 4T y del ejercicio FY2026, y guía de FY2027', efecto: 'Confirma o no el crecimiento de dos dígitos del BPA', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027-02', evento: 'Junta de Siemens AG: votación de la escisión directa del 30 % de Healthineers', efecto: 'Sube el flotante; posible presión vendedora', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'FY2027', evento: 'Decisión sobre la segregación de Diagnostics (bolsa, escisión o capital riesgo)', efecto: 'Quita el segmento de margen del 4,1 %', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027-02', evento: 'Junta de Siemens Healthineers y dividendo de FY2026', efecto: 'Dividendo ≥ 1,00 €', probabilidad: 'Alta', sentido: '+' },
  ], confianza: 'Media' },
  riesgos: { items: [
    { riesgo: 'Diagnostics sigue cayendo en China', tipo: 'Negocio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Segregación del negocio', senal: 'Crecimiento comparable de Diagnostics peor que −5 % en el 4T' },
    { riesgo: 'Escisión del 30 % con presión vendedora', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Mayor flotante y peso en índices', senal: 'Calendario y mecánica de la escisión' },
    { riesgo: 'Aranceles de EE. UU. sin devolución', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 %', mitigante: 'Producción local', senal: 'Guía de FY2027 con coste arancelario' },
    { riesgo: 'Datos de núcleo de agregador erróneos', tipo: 'Análisis', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'n.c.', mitigante: 'Verificar con el informe anual', senal: 'Cuentas del 5-nov' },
    { riesgo: 'Deuda neta de 12.000 M con tipos al alza', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Caja libre de 2.700 M', senal: 'Deuda neta/EBITDA por encima de 3 veces' },
    { riesgo: 'Competencia china en imagen', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (bajista)', mitigante: 'Tecnología y base instalada', senal: 'Margen de Imaging por debajo del 24 %' },
  ], premortem: 'Octubre de 2029, la acción ha perdido un 40 %. Diagnostics no encontró comprador a un precio digno y se quedó dentro, perdiendo dinero, mientras China extendía las compras centralizadas a la imagen. Los aranceles volvieron sin devolución y el margen EBIT ajustado retrocedió al 14 %. La escisión del 30 % de Siemens AG llenó el mercado de papel en 2027 y el PER bajó a 11 veces. La señal estaba en la guía de FY2027 del 5-nov-2026 y en el margen de Diagnostics de cada trimestre.', confianza: 'Baja' },
  preguntas: { items: [
    { tema: 'Diagnostics', pregunta: '¿Qué valor espera obtener por Diagnostics y en qué plazo?', por_que: 'Margen del 4,1 %: su salida mueve el margen del grupo más de un punto.' },
    { tema: 'Escisión', pregunta: '¿Cómo se ejecutará el reparto del 30 % de Siemens AG?', por_que: 'Riesgo de presión vendedora en 2027.' },
    { tema: 'Aranceles', pregunta: '¿Cuánto coste arancelario incluye la guía de FY2027?', por_que: 'Las devoluciones (≈0,15 €) inflan el BPA de FY2026.' },
    { tema: 'Ajustes', pregunta: '¿Por qué los ajustes del BPA (0,47 € en FY2025) son recurrentes?', por_que: 'El BPA ajustado sobrestima el beneficio económico.' },
    { tema: 'Deuda', pregunta: '¿Qué plan hay para los préstamos de Siemens AG tras la escisión?', por_que: '12.000 M de deuda neta.' },
    { tema: 'Segmentos', pregunta: '¿Cuál es el resultado anual por segmento reexpresado desde FY2023?', por_que: 'Necesario para una suma de partes.' },
  ], confianza: 'Media' },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis,
    tesis: 'Siemens Healthineers es uno de los tres grandes de la imagen médica y el líder de la radioterapia con Varian: Imaging gana un 26,5 % de margen EBIT ajustado y Precision Therapy crece un 9,2 % [A1]. Diagnostics (17 % de las ventas, margen del 4,1 %) y la deuda de Varian (12.000 M) lastran la rentabilidad [A13].\n\nEl precio descuenta un crecimiento del 2,8 % anual, por debajo del 4,6 % de nuestro base, y 14,9 veces nuestro BPA ajustado de FY2027e, frente a una mediana de 23,2 veces en 2022-2025.\n\nPara invertir hay que creer que el BPA crece un 12 % anual con Diagnostics resuelto y que la escisión de Siemens AG no hunde el múltiplo. Con datos de agregador, no es todavía una compra.',
    vision_diferencial: { mercado_descuenta: 'Un crecimiento del 2,8 % y un múltiplo de 14,9 veces, como GE HealthCare y Philips: Diagnostics y la escisión como problemas permanentes.', nuestra_vision: 'Crecimiento del 4,6 % y un BPA ajustado de 2,82 € en FY2028e, con Diagnostics segregado o estabilizado.', por_que: 'La cartera de equipos (book-to-bill de 1,14) y Varian sostienen el crecimiento; Diagnostics es 17 % de las ventas y su salida tiene valor positivo [A1, A2].' },
    a_favor: ['**Imaging rentable**: margen EBIT ajustado del 26,5 % en el 3T26 [A1].', '**Varian crece**: Precision Therapy +9,2 % [A1].', '**Caja libre**: 2.714 M en FY2025 (+27 %) [A3].', '**Múltiplo en mínimos**: 14,9 veces frente a una mediana de 23,2.'],
    en_contra: ['**Diagnostics**: −5,5 % y margen del 4,1 % [A1].', '**Guía recortada dos veces** en FY2026 [C7].', '**Deuda neta** de 12.000 M (2,8 veces) [A13].', '**ROIC ≈ WACC**: ≈8-9 % frente al 7,61 %.', '**Escisión del 30 %** pendiente [C5].'],
    que_vigilar: 'Que la guía de FY2027 del 5-nov confirme un BPA ajustado de al menos 2,50 € sin aranceles devueltos y que Diagnostics deje de caer. Un tercer recorte de guía rompería la tesis.',
    cambiaria_recomendacion: ['Precio verificado por debajo de 41,95 € con cuentas primarias y ROIC confirmado: Comprar.', 'Guía de BPA ajustado de FY2027 por debajo de 2,40 €: revisar a la baja.', 'Margen de Diagnostics negativo en un trimestre: Vender si el precio supera 42 €.', 'Precio por encima de 58,47 €: Vender o reducir.'],
    kpis_seguimiento: [
      { kpi: 'Crecimiento comparable del grupo', nivel_actual: '2,8 % (3T26)', umbral_alerta: '< 2 %', por_que: 'Guía recortada dos veces.' },
      { kpi: 'Margen de Diagnostics', nivel_actual: '4,1 %', umbral_alerta: '< 0 %', por_que: 'Lastre del grupo.' },
      { kpi: 'BPA ajustado', nivel_actual: '2,35-2,45 € (guía FY2026)', umbral_alerta: '< 2,40 € en la guía FY2027', por_que: 'Base del objetivo.' },
      { kpi: 'Deuda neta/EBITDA', nivel_actual: '2,8x', umbral_alerta: '> 3x', por_que: 'Herencia de Varian.' },
    ],
    confianza: 'Baja',
  },
  secciones: {
    comparables: { comentario: 'Healthineers cotiza a 14,9 veces nuestro BPA ajustado de FY2027e, en línea con GE HealthCare (13,0) y Philips (14,0), sus rivales directos en imagen, y muy por debajo de Danaher (25,3) y Thermo Fisher (24,3), que tienen más consumibles y crecen más [D5, D11]. La mediana del PER es de 15,5 veces. Por EV/EBITDA los comparables dan valores de 44-90 € porque la mezcla está sesgada a laboratorio; no los usamos como guía principal.' },
  },
  fuentes: [],
  huecos: [],
};
