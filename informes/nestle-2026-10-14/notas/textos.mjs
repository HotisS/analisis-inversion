// Textos del analista principal (Nestlé, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Nestlé, la SIX, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, de Stock Analysis y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Cuentas en CHF con NIIF; ejercicio natural. La cuenta anual (ingresos totales, resultado operativo, amortizaciones, beneficio y BPA) es la de Stock Analysis, cuyos ingresos incluyen otros ingresos y superan en ≈0,4 % a las ventas que publica Nestlé (89.885 frente a 89.490 M en 2025). La deuda del puente es la deuda neta que publica Nestlé a 30-jun-26 (56.300 M), que incluye los arrendamientos. L\'Oréal (20,16 %) se valora a precio de mercado con un tipo EUR/CHF de 0,93 de julio. El BPA del objetivo a 12 meses y el PER histórico están en base subyacente (la que publica Nestlé, sin reestructuración ni deterioros). Precio: cierre del 13-oct-26, porque la sesión del 14 no había cerrado.',

  controles_explicados: [
    { control: 'Sección de núcleo con datos: capital', explicacion: 'Sección escrita a mano con la política y las operaciones de cartera conocidas; sin importes de dividendos y recompras de cada año (ver huecos).' },
  ],

  parches: [],

  secciones: {
    financieros: {
      comentario: 'Los ingresos en francos han bajado de 94.780 M en 2022 a 89.885 M en 2025 aunque el crecimiento orgánico fue positivo todos los años (3,5 % en 2025, con un 0,8 % de volumen y un 2,8 % de precio) [A3, A17]: el franco fuerte y las ventas de negocios restan entre 2 y 6 puntos al año. El margen operativo subyacente cayó del 17,2 % de 2024 al 16,1 % de 2025 por el café y el cacao caros, la publicidad, los aranceles y la retirada de leche infantil [A1, A6]. El BPA subyacente bajó un 7,3 %, a 4,42 CHF, y el publicado un 16,3 %, a 3,51 CHF [A1]. En el 1S26 el margen subió al 16,4 % (−10 puntos básicos interanuales) y el BPA subyacente fue de 2,22 CHF (−2,4 %, +3,4 % a tipos constantes) [A2]. 2021 no es comparable: el beneficio de 16.905 M incluye la plusvalía de la venta parcial de L\'Oréal y el resultado operativo, el deterioro de Wyeth [A3, A8].',
      ajustes: 'Nestlé publica un resultado operativo subyacente (UTOP) que excluye reestructuración, deterioros y litigios: 14.389 M en 2025 frente a 12.277 M de resultado operativo en la cuenta de Stock Analysis, una diferencia de ≈2.100 M [A1, A3]. Esa diferencia se repite cada año (entre 1.000 y 3.900 M en 2021-2025), así que en el DCF la tratamos como coste recurrente (≈0,8 % de las ventas dentro del EBITDA) y no la sumamos. En el 1S26 hubo además ≈1.400 M de deterioro de los negocios en venta (helados restantes y parte de vitaminas), que sí es no recurrente y se excluye del LTM [A2].',
      confianza: 'Media',
    },
    trimestres: {
      ultima_presentacion: 'Nestlé solo publica ventas trimestrales. En el 1T26 vendió 21.300 M CHF (−5,7 % publicado por la divisa) con un 3,5 % de crecimiento orgánico, por encima de lo esperado (21.100 M), y la acción subió un 7 % ese día [A10, E5]. En el 2T26 el orgánico fue del 3,7 % y el volumen (RIG) subió al 1,8 %, desde el 1,2 % del 1T [A11]. En la presentación del semestre (julio) la dirección insistió en el volumen y en el ahorro, confirmó la guía y avisó de que el margen del segundo semestre será parecido al del primero (16,4 %), lo que el mercado leyó como una mejora menor de la esperada: la acción fue la peor del SMI ese día [A2, A9]. Las preguntas giraron en torno al café y el cacao, la retirada de leche infantil y el destino de aguas. No hay guía del efecto de Rusia [A9].',
      confianza: 'Media',
    },
    balance: {
      otros_pasivos: 'La deuda neta de Nestlé (56.300 M a junio de 2026) incluye los arrendamientos; subió 4.900 M en el semestre por el dividendo de ≈8.000 M [A2]. La deuda a corto plazo es elevada (16.345 M), financiada con papel comercial [A5]. El coste medio de la deuda neta fue del 2,6 % en 2024 [A12]. No hemos podido leer las notas de pensiones, provisiones y litigios; el puente no incluye pensiones (hueco). La intervención de las filiales rusas podría obligar a un deterioro de ≈1.000 M [C7], que restamos en el puente.',
      comentario: 'La deuda neta pasó de 32.600 M en 2021 a 51.670 M en 2025 (cálculo con la deuda bruta y la caja de Stock Analysis) mientras el EBITDA no crecía: 3,25 veces el EBITDA publicado en 2025 y 2,85 veces el ajustado de la empresa [A1, A5]. La causa son las recompras de 2021-2024 financiadas con deuda y un dividendo que absorbe casi toda la caja libre. El margen de maniobra lo darán los ≈2.800 M de la sociedad conjunta de aguas en el 1S27 y la venta de los helados [A2].',
      confianza: 'Baja',
    },
    flujos: {
      comentario: 'El flujo operativo fue de 15.904 M en 2025 y el capex de 4.527 M (5,0 % de los ingresos, frente al 6,1 % de 2023 y 2024): la empresa recorta inversión tras los años de ampliación de capacidad en café y mascotas [A4]. La caja libre que publica Nestlé fue de 9.154 M en 2025 (−14,2 %) y de 3.400 M en el 1S26 (2.300 M un año antes), con más de 9.000 M de guía para 2026 [A1, A2]. La conversión del beneficio en caja es alta (85 % acumulado en 2021-2025), pero la caja libre apenas cubre el dividendo de ≈8.000 M, por lo que no queda para recompras ni para bajar deuda sin vender negocios.',
      confianza: 'Media',
    },
    calidad: {
      comentario: 'Las cifras subyacentes de Nestlé excluyen cada año entre 1.000 y 3.900 M de reestructuración y deterioros: el publicado y el subyacente divergen de forma sistemática (BPA de 3,51 frente a 4,42 CHF en 2025) [A1]. Eso pide prudencia con el BPA subyacente, que tomamos para el PER porque es el que sigue el mercado. El Altman Z (2,29, zona gris) refleja el apalancamiento y el patrimonio reducido por las recompras, no un riesgo de solvencia en una empresa con caja libre de 9.000 M; el Piotroski (5) recoge la caída del margen y del ROA en 2025. El Beneish no se calcula por falta de líneas del balance. Los deterioros de Wyeth (2021) y de los negocios en venta (2026) muestran que se pagó caro por algunas compras.',
      senales: [
        { senal: 'Gastos «no recurrentes» que se repiten todos los años', nivel: 'Media', comentario: 'Entre 1.000 y 3.900 M al año en 2021-2025; los tratamos como coste recurrente en el DCF [A1, A3].' },
        { senal: 'Deterioros de compras (Wyeth, vitaminas y suplementos)', nivel: 'Media', comentario: 'Deterioro de Wyeth en 2021 y ≈1.400 M en el 1S26 por los negocios en venta [A8, A2].' },
      ],
      confianza: 'Baja',
    },
    capital: {
      politica: 'Dividendo progresivo: 3,10 CHF por 2025 (+5 céntimos), 29 años de subidas en francos según la empresa, ≈8.000 M al año [A17, A2]. Las recompras están en pausa desde 2025 para bajar deuda [E6]. Prioridades declaradas: invertir en café, mascotas, nutrición y alimentación y aperitivos, mantener el dividendo y reducir el apalancamiento con ventas de negocios (helados a Froneri, 50 % de aguas) [A18, A2].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Venta de los helados restantes a Froneri', importe: null, ev_ebitda: null, financiacion: 'Venta', resultado: 'Negocio en venta con deterioro en el 1S26 [A2, A18].' },
        { anio: '2026', objetivo: 'Sociedad conjunta 50:50 de aguas y bebidas premium', importe: 2800, ev_ebitda: null, financiacion: 'Caja neta para Nestlé en el 1S27', resultado: 'Pendiente de cierre [A2].' },
      ],
      comentario: 'La asignación de capital de 2017-2024 no creó valor: la acción cayó y el BPA subyacente de 2025 (4,42 CHF) es el mismo que el de 2021 pese a las recompras financiadas con deuda [A1, A8]. Los deterioros de Wyeth y de vitaminas apuntan a compras caras. El ROIC se ha mantenido entre el 10 % y el 15 % en 2021-2025, por encima del coste de capital, pero sin tendencia al alza. El nuevo equipo prioriza deuda y dividendo y vende lo de menor margen, que es lo razonable con 3,5 veces de deuda sobre EBITDA.',
      confianza: 'Baja',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA publicado, el PER de los últimos 12 meses (26,7x) parece caro frente a su historia; con el BPA subyacente que sigue el mercado, la acción cotiza a 17,6 veces nuestro BPA de 2027e, cerca del mínimo de 2024 (15,7x) y por debajo de la mediana de 2022-2025 (19,1x) [D5, A1]. Excluimos 2020-2021 (PER de 25-29x con tipos cero, que no van a volver). La rebaja del múltiplo es estructural en parte: los tipos ya no son cero y el crecimiento en francos es nulo desde 2019.',
      confianza: 'Media',
    },
    comparables: {
      criterio: 'Grandes grupos de alimentación de marca con presencia mundial: Danone y Unilever (Europa), Mondelez, General Mills y Kraft Heinz (EE. UU.). Excluimos L\'Oréal (cosmética, participada de Nestlé) y Mars (no cotiza). Los múltiplos son de proveedores y fechas distintas (marzo-octubre de 2026), así que la comparación es orientativa [D8-D12].',
      comentario: 'Nestlé cotiza a 18,1 veces el BPA de los próximos 12 meses del consenso (base publicada), algo por encima de la mediana de los comparables (17,2x), y a 12,6 veces el EBITDA de los próximos 12 meses. Los europeos (Danone 17,2x, Unilever 18,2x) son el grupo relevante; los estadounidenses de culinarios (General Mills 11,6x y Kraft Heinz 11,8x) cotizan con descuento por volumen negativo y deuda alta, y arrastran el valor por EV/EBITDA hasta 48,95 CHF, una cifra que no tomamos como referencia. Con el BPA subyacente, Nestlé estaría en 17-18x, en línea con los europeos pese a un ROIC más alto (10,4 %).',
      confianza: 'Baja',
    },
  },

  dcf_justificacion: {
    crecimiento: 'El crecimiento en francos es el orgánico menos la divisa y el perímetro. Orgánico del 3-4 % (guía 2026 y 3,5-3,6 % en 2025-1S26) [A2, A9]; divisa de ≈ −3 % en 2026 según la empresa [A9] y de −1 punto al año después (el franco ha restado de media unos 2-3 puntos desde 2019); perímetro de −4 a −5 puntos en 2026-27 por helados y la sociedad conjunta de aguas. Resultado: −1,0 % en 2026e, −2,0 % en 2027e y 2,0 % en 2028-2029, bajando al 0,7 % al final. Media de la proyección: 0,8 %.',
    margenes: 'Margen EBITDA publicado del 19,3 % en 2026e (UTOP de ≈16,4 % + amortización del 4,0 % − reestructuración recurrente del 0,8 %), 19,6 % en 2027e y 20,2 % desde 2029e, equivalente a un UTOP del 17 %, el objetivo a medio plazo de la dirección y el nivel de 2021-2024 [A2, A16, A6]. El ahorro de 3.000 M hasta 2027 y la salida de aguas y helados (margen del 9,5 % en aguas) lo sostienen [A16, A2].',
    inversion: 'Capex del 4,8 % de las ventas en 2026-27 y del 4,6 % después, frente al 5,0 % de 2025 y el 5,4-6,1 % de 2021-2024 [A4]; amortización del 4,0 % (3.633 M en 2025). Circulante comercial neutro: no tenemos el desglose del balance y Nestlé trabaja con circulante bajo; lo dejamos en cero.',
    wacc: 'Tasa libre del 0,6 % (bono suizo a 10 años, 1-oct-26) [D13]; beta de 0,65, estimación propia para una alimentaria de consumo básico sin dato de mercado accesible (hueco); prima de mercado del 5,5 % y prima adicional de 1 punto por la exposición a emergentes (≈40 % de las ventas en Asia-Oceanía-África y Latinoamérica) y por la divisa; coste de la deuda del 2,6 % (coste medio de la deuda neta de 2024) [A12]; peso de la deuda del 22 % (deuda neta frente a capitalización). WACC del 4,48 %. Con la prima implícita del mercado (4,2 %) el WACC baja al 3,8 %.',
    terminal: 'Crecimiento a perpetuidad del 0,5 % en francos: la regla pide un terminal entre la inflación suiza (≈1 %) y la tasa libre menos medio punto (0,1 %); el 0,5 % es el punto medio y coincide con la historia de ventas en francos, que no han crecido desde 2019. El múltiplo de salida implícito es elevado (≈20x el EBITDA) porque el WACC es muy bajo; por eso el valor terminal pesa un 70 %.',
  },
  puente_comentarios: {
    '2026e': 'Orgánico del 3,5 % (volumen 1,5 % y precio 2,0 %, en línea con el 1S26) y −4,5 puntos de divisa y negocios en venta [A2, A9].',
    '2027e': 'Orgánico del 3,5 % con algo más de volumen por el ahorro reinvertido en publicidad; −5,5 puntos por la salida de aguas a la sociedad conjunta y de helados [A2, A18].',
    '2028e': 'Orgánico del 3 % (volumen 1,5 % y precio 1,5 %) y −1 punto de divisa, la media del franco frente a la cesta de Nestlé.',
    '2029e': 'Igual que 2028e.',
    '2030e': 'Orgánico del 2,8 %, con el precio moderándose; −1 punto de divisa.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'La proyección pide un crecimiento medio del 0,8 % en francos, por debajo de lo que la empresa ha conseguido a lo largo del ciclo una vez descontada la divisa, y casi sin inversión neta (reinversión del 7 % del NOPAT): no hace falta capital nuevo y las pruebas de reinversión y cuota no fallan, así que no rebajamos el caso base. El veredicto es «En parte» porque el orgánico del 3-4 % descansa en un volumen que solo empezó a recuperarse en 2026 (RIG del 0,8 % en 2025 y del 1,8 % en el 2T26) y en un poder de precios que se agotó en 2024-25, cuando subir precios costó volumen [A1, A2, A17]. Medio punto menos de crecimiento cada año restaría ≈5 CHF por acción.',
  dcf_lectura: 'El DCF da 101,74 CHF por acción, un 31,6 % sobre el precio, con un valor terminal que pesa el 70 % y un WACC muy bajo (4,48 %) por la tasa libre suiza del 0,6 %. Es la principal debilidad del método: con un WACC del 5,5 % el valor bajaría a ≈75-80 CHF (tabla de sensibilidad). El DCF inverso dice que el precio de hoy descuenta que las ventas en francos caigan un 2,3 % al año en 2027-2035 con nuestro margen, o un margen EBITDA del 16,7 % con nuestro crecimiento, frente al 20,2 % que proyectamos; la rentabilidad implícita en el precio es del 5,6 %, más que nuestro WACC (4,5 %) y que lo que pide el mercado (3,8 %). Es una expectativa conservadora frente a la historia: el margen subyacente lleva diez años por encima del 16 %. El mercado no cree que Nestlé vuelva a crecer en francos; nosotros creemos que el margen vuelve al 17 % pero tampoco proyectamos crecimiento real en francos.',
  narrativas: {
    Bajista: 'El volumen vuelve a estancarse cuando el ahorro se gasta en defender precios frente a la marca blanca, el café y el cacao siguen caros y el franco resta más de lo previsto: el margen UTOP se queda en el 15,8 % y las ventas caen un punto más al año. Es lo que pasó en 2024-2025 [A1].',
    Base: 'Orgánico del 3-4 %, el ahorro de 3.000 M lleva el margen UTOP al 17 % en 2029 y las ventas en francos crecen un 2 % desde 2028 tras la salida de aguas y helados.',
    Alcista: 'El volumen se acelera (RIG > 2 %) con más publicidad y café en cápsulas y listo para tomar, el margen supera el 17 % y el franco deja de restar.',
  },
  escenarios_comentario: 'El intervalo es estrecho porque el negocio es defensivo: el bajista da 79,56 CHF y el alcista 112,20 CHF. Incluso el bajista queda por encima del precio (+2,9 %), lo que dice más del WACC bajo que de la solidez de la tesis: con la regla a 12 meses, que usa nuestro PER y nuestro BPA, el bajista pierde un 14 % (66,41 CHF). La asimetría a 12 meses (alcista +19 %, bajista −14 %) es pobre.',
  suma_partes_comentario: 'No aplica: el negocio de alimentación se valora como un todo, y L\'Oréal (20,16 %) entra en el puente a valor de mercado (≈38.060 M CHF, un 19 % de la capitalización) [D15, D16].',
  valoracion_comentario: 'El DCF pesa un 45 % y los escenarios un 35 % porque es una empresa estable con flujos predecibles; los comparables, un 20 %, porque mezclan fechas y modelos (los culinarios de EE. UU. cotizan con descuento por razones propias). El valor intrínseco ponderado es de 92,60 CHF (+19,8 %). La dispersión es grande: los comparables por EV/EBITDA dan 48,95 CHF y el DCF 101,74 CHF. La diferencia nace de la tasa de descuento: el DCF usa un WACC del 4,5 % en francos y los múltiplos de los comparables llevan implícito un coste de capital en dólares o euros. Por eso el valor intrínseco es una referencia de largo plazo y la decisión se toma con el objetivo a 12 meses. L\'Oréal aporta ≈14,8 CHF por acción al puente.',
  diferencia_consenso: 'Nuestro BPA subyacente de 2028e (4,59 CHF) no es comparable con el BPA publicado del consenso (4,68 CHF en 2028 según MarketScreener), que debería estar por debajo del subyacente; el consenso subyacente no es accesible gratis. Nuestro precio base (80,78 CHF) queda un 9 % por debajo del objetivo medio de los analistas (88,86 CHF): la diferencia está en el múltiplo (17,6x, el PER actual, frente a ≈19-20x implícito en los objetivos, la mediana de 2022-2025) y en que no contamos con recompras, en pausa [D2, D3, E6].',
  objetivo12m_comentario: 'Entre el valor intrínseco (92,60 CHF) y el objetivo a 12 meses (80,01 CHF) hay 16 %: el mercado no pagará la diferencia hasta que vea crecer el BPA subyacente, que lleva cinco años plano. Lo que la cerraría: que los resultados de 2026 (febrero de 2027) confirmen un margen por encima del 16,1 % y el cobro de los 2.800 M de aguas en el 1S27, con una vuelta de las recompras. La tesis de valor es a más de un año.',
  rentabilidad_comentario: 'El ROIC fue del 10,4 % en 2025 (10,2-15,0 % en 2021-2025), frente a un WACC del 4,48 %: Nestlé crea valor con un margen de unos 6 puntos, lo que confirma el foso de marca [A14]. La caída de 2025 viene del margen (UTOP del 16,1 % frente al 17,2 %), no de la rotación. El ROE (25,9 %) está inflado por el apalancamiento y el patrimonio reducido por las recompras. El ROIC incremental no se puede calcular con sentido: los ingresos y el NOPAT han bajado desde 2022 mientras el capital invertido se mantenía. Stock Analysis da un ROIC algo distinto (10,5 % en 2025) [A14].',
  catalizadores: {
    items: [
      { fecha: '2026-10-22', evento: 'Ventas de nueve meses', efecto: 'Confirmación de la guía (3-4 % orgánico) y primera cifra sobre Rusia', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Margen UTOP por encima del 16,1 % y caja libre > 9.000 M', probabilidad: 'Alta', sentido: '+' },
      { fecha: '1S27', evento: 'Cierre de la sociedad conjunta de aguas (≈2.800 M de caja neta)', efecto: 'Baja la deuda y abre la puerta a recompras', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Venta de los helados restantes a Froneri', efecto: 'Mejora la mezcla de margen', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-2027', evento: 'Resolución de la intervención en Rusia', efecto: 'Deterioro de ≈1.000 M o venta forzada', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027-04', evento: 'Junta de accionistas: dividendo de 2026', efecto: 'Subida del dividendo por 30.º año', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'El volumen no se recupera y el precio deja de subir', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−14 % a 12 meses (bajista: 66,41 CHF)', mitigante: 'Ahorro de 3.000 M para reinvertir en marcas', senal: 'RIG por debajo del 1 % en dos trimestres' },
      { riesgo: 'Café y cacao caros más tiempo', tipo: 'Materias primas', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1 punto de margen ≈ −7 %', mitigante: 'Coberturas y subidas de precio', senal: 'Margen del 2S26 por debajo del 16 %' },
      { riesgo: 'El franco sigue apreciándose', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % por cada punto anual adicional', mitigante: 'Producción local en cada mercado', senal: 'Efecto divisa peor que −3 % en 2026' },
      { riesgo: 'Pérdida del negocio en Rusia', tipo: 'Político', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−0,4 CHF por acción (≈1.000 M)', mitigante: 'Peso pequeño en ventas', senal: 'Decreto de venta forzada o nacionalización' },
      { riesgo: 'Deuda alta y dividendo que absorbe la caja', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Recorte del múltiplo si se congela el dividendo', mitigante: 'Ventas de aguas y helados', senal: 'Deuda neta/EBITDA ajustado > 3x a fin de 2026' },
      { riesgo: 'Fármacos GLP-1 y regulación de ultraprocesados', tipo: 'Estructural', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5-10 % a largo plazo', mitigante: 'Cartera centrada en café, mascotas y nutrición', senal: 'Caída de volumen en confitería de EE. UU.' },
      { riesgo: 'Nueva rotación de la cúpula', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Compresión del PER de 1-2 puntos', mitigante: 'Presidente con historial (Inditex)', senal: 'Salida de directivos clave' },
    ],
    premortem: 'Octubre de 2029: la acción cotiza a 46 CHF. El ahorro de 3.000 M se fue en defender precios: la marca blanca ganó cuota en Europa y EE. UU. y el volumen siguió por debajo del 1 %. El café y el cacao no bajaron, y el margen se quedó en el 15,5 %. El franco siguió subiendo y las ventas en francos cayeron otros dos años. Con la deuda en 3,5 veces el EBITDA y el dividendo comiéndose la caja, la dirección congeló el dividendo en 2028, y el inversor de rentas, que es la base accionarial, vendió: el PER bajó a 14 veces un BPA de 4,0 CHF. Rusia acabó en una venta forzada y un deterioro. Los indicadores que lo anticipaban: el RIG trimestral por debajo del 1 %, el margen del 2S26 por debajo del 16 % y una deuda neta que no bajaba tras el cobro de aguas.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Margen', pregunta: '¿Qué parte de los 3.000 M de ahorro llegará al margen y qué parte se reinvierte en publicidad y precio?', por_que: 'Decide si el UTOP llega al 17 % (nuestro base) o se queda en el 16 %.' },
      { tema: 'Volumen', pregunta: '¿Qué RIG espera la dirección en 2027 sin aguas ni helados?', por_que: 'El puente de ingresos pide 1,5-1,8 % de volumen.' },
      { tema: 'Rusia', pregunta: '¿Cuál es el valor contable y el resultado operativo de Nestlé Russia y Nestlé Kuban?', por_que: 'Para cuantificar el deterioro, que hoy estimamos con la prensa en ≈1.000 M.' },
      { tema: 'Capital', pregunta: '¿Volverán las recompras tras el cobro de aguas o se prioriza la deuda?', por_que: 'No contamos recompras en el BPA de 2028e.' },
      { tema: 'Reestructuración', pregunta: '¿Cuándo dejará de haber 1.000-2.000 M anuales de costes excluidos del UTOP?', por_que: 'Separa el BPA subyacente del publicado y pesa en la calidad contable.' },
      { tema: 'L\'Oréal', pregunta: '¿Hay planes para la participación del 20,16 % en L\'Oréal?', por_que: 'Vale ≈38.000 M CHF, el 19 % de la capitalización; su venta podría financiar recompras.' },
    ],
    confianza: 'Media',
  },
  casos12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.23, multiplo: null, precio: null, justificacion: 'Ventas de ≈87.200 M en 2028e (un punto menos de crecimiento en 2027-28) y margen UTOP del 15,8 %: UTOP de 13.774 M, −1.500 M de gastos financieros, impuesto subyacente del 22 % y +1.320 M de participadas (L\'Oréal) netas de minoritarios, entre 2.573 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 4.59, multiplo: null, precio: null, justificacion: 'Ventas de 88.951 M en 2028e y margen UTOP del 16,8 % (EBITDA del 20,0 % + 0,8 de reestructuración − 4,0 de amortización): UTOP de 14.944 M, −1.500 M financieros, impuesto del 22 % y +1.320 M de participadas netas; sin recompras. La misma fórmula da 4,42 CHF en 2025, el BPA subyacente publicado.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 4.82, multiplo: null, precio: null, justificacion: 'Ventas de ≈90.200 M (+0,7 puntos de crecimiento) y margen UTOP del 17,4 %, por encima del objetivo de la dirección: UTOP de 15.695 M con los mismos financieros, impuesto y participadas.' },
  ],
  per_historico: { actual: 17.6, mediana_5a: 19.1, minimo_5a: 15.7, media_larga: 19.1, excluidos: 'PER de cierre sobre el BPA subyacente publicado: 2022 22,4x (107,14 ÷ 4,79); 2023 20,3x (97,51 ÷ 4,80); 2024 15,7x (74,88 ÷ 4,77); 2025 17,8x (78,72 ÷ 4,42) [D5, A1, A6, A7]. Excluidos 2020 (24,8x) y 2021 (28,8x): múltiplos de tipos cero que no se repetirán. Con solo cuatro años limpios, la mediana de 5 años y la media larga coinciden (19,1x). Actual = 77,30 ÷ 4,39 (nuestro BPA subyacente de 2027e).' },
  fuentes: [],
  huecos: [
    { seccion: 'valoracion', campo: 'pensiones y minoritarios del puente', tipo: 'Núcleo', intentos: '1) Notas del informe anual 2025: no accesibles; 2) comunicado del 1S26: solo la deuda neta; 3) Stock Analysis: sin la línea en los extractos', decision: 'Omitido (0 en el puente)' },
    { seccion: 'dcf', campo: 'beta de mercado', tipo: 'Núcleo', intentos: '1) bolsa.mjs: sin red; 2) Yahoo y TipRanks: no devuelven la beta en la búsqueda; 3) Damodaran por sector: no accesible', decision: 'Calculado y marcado como estimación (0,65)' },
  ],
};
