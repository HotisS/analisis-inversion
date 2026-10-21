// Textos del analista (Amphenol, corte 2026-10-21). Citas con la letra de la nota ([A4] = fuente 4 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD; ejercicio a 31 de diciembre. Todas las cifras por acción están en acciones de hoy: el split 2×1 entró en vigor el 2-sep-2026 [A10], así que el BPA ajustado de 2025 publicado (3,34 USD) es 1,67 y los de 2020-2023 se dividen también por los splits de 2021 y 2024. El último trimestre publicado es el 2T26 (30-jun-2026); los resultados del 3T26 salen el 28-oct-2026, después de este análisis [D14]. Precio: cierre del 20-oct-2026 (79,32 USD); la sesión del 21-oct estaba abierta al hacer el análisis (79,90 USD a las 11:55 de Nueva York). Comparables con datos de Yahoo de la sesión del 21-oct (precios casi iguales al cierre del 20-oct) [D2]. El tamaño del mercado de 2025 (≈ 99.200 M USD) es una estimación propia a partir del total de los 100 primeros fabricantes de Bishop [B3]. CCS (comprada en enero de 2026) no está en las cuentas de 2025: el balance y el LTM de junio de 2026 sí la incluyen.',
  controles_explicados: [
    { control: 'Capitalización calculada ≈ publicada', explicacion: 'La diferencia (204.519 frente a 195.600 M USD) es la que hay entre las acciones diluidas que pide el método (2.578 M en el 2T26: 1.289,2 antes del split [A2]) y las acciones en circulación de la portada del 10-Q (1.233 M antes del split, 2.466 M ahora) con las que se calcula la capitalización publicada: ≈ 112 M de opciones en dinero (4,5 %), muchas por el plan de opciones de los directivos [C1]. No es un error de datos.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El DCF proyecta 7.149 M USD de flujo libre medio en 2026e-2028e frente a 2.894 M de media en 2023-2025 porque las ventas pasan de 15.223 M (2024) a 35.661 M (2026e): CCS añade ≈ 4.600 M y el negocio orgánico crece un 30-40 % [A4, A13]. El flujo libre real ya lo confirma: 4.728 M en los últimos doce meses a junio de 2026 y 2.037 M en el 1S26 con un circulante que absorbe caja por el crecimiento [A4]. El DCF ya resta un circulante del 22 % de las ventas nuevas.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'Del BPA ajustado de 2025 (1,67 USD) al base de 2028e (3,54) hay un 28,5 % anual, pero dos tercios ya están en el 1S26 real (1,21 USD frente a 0,72 en el 1S25 [A4]) y en la guía del 3T26 (0,70-0,71 [A4]): nuestro 2026e es de 2,68 USD (consenso 2,69 [D2]). Desde 2026e, el base crece un 15 % anual hasta 2028e (+21 % en 2027e y +9 % en 2028e), por debajo del consenso de 2027 (3,33). La confianza en 2028e es Media, no alta, por la dependencia de la IA (escenario bajista).' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Arthur J. Schmitt funda American Phenolic Corporation en Chicago en 1932 para fabricar zócalos de válvulas para radios; la Segunda Guerra Mundial la convierte en proveedor de conectores militares, su origen en defensa [A1]. Tras pasar por Bunker Ramo y Allied, sale a bolsa en 1991, y KKR compra la mayoría en 1997 con una recapitalización apalancada; vende su parte antes de 2006. Desde entonces el modelo es el mismo: muchas unidades pequeñas con un director general responsable de su cuenta, crecimiento orgánico por diseño en las plataformas de los clientes y compras pequeñas y medianas sin deterioros [A1]. Con Adam Norwitt (consejero delegado desde 2009) las ventas pasan de ≈ 2.800 M USD a 23.095 M en 2025, y las compras de CIT, Andrew y CCS (≈ 15.000 M en 2024-2026) la convierten en el primer proveedor de interconexión de los centros de datos de IA [A1, A13].',
      hitos: [
        { anio: '1932', hito: 'Arthur J. Schmitt funda American Phenolic Corporation en Chicago.' },
        { anio: '1991', hito: 'Salida a bolsa en Nueva York; en 1997 KKR compra la mayoría con una recapitalización apalancada.' },
        { anio: '2009', hito: 'Adam Norwitt, consejero delegado; ventas de ≈ 2.800 M USD.' },
        { anio: '2016-2021', hito: 'Compras de FCI Asia y MTS Systems (sensores); split 2×1 en 2021.' },
        { anio: '2024', hito: 'Compra de CIT (2.025 M USD, defensa y aeronáutica) y split 2×1 [D5].' },
        { anio: '2025', hito: 'Compras de Andrew (2.100 M) y Trexon (1.050 M); ventas +52 % por la IA [A1].' },
        { anio: '2026', hito: 'Cierre de CCS de CommScope (10.500 M USD, fibra); Norwitt presidente del consejo; split 2×1 en septiembre [A13, C4, A10].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC con el fondo de comercio fue del 28,8 % en 2025 y del 19-21 % en 2016-2024, siempre por encima del WACC del 11 % que usamos; sin el fondo de comercio, del 72 % [A1]. Es un comprador en serie: el fondo de comercio es el 60 % del capital invertido, y por eso el ROIC publicado es el que cuenta. CCS (10.500 M USD, comprada en enero de 2026) diluye la cifra: con el resultado de los últimos doce meses a junio de 2026 (7.841 M de resultado operativo, ≈ 5.720 M después de impuestos) y el capital de junio (patrimonio 15.492 + deuda neta 13.392 [A2]), el ROIC baja a ≈ 20 %, 9 puntos sobre el WACC. El ROIC incremental de 2016-2025 es del 36,5 %: cada dólar invertido en compras y en fábricas ha rendido más que el anterior, porque compra a 7-11 veces el EBITDA y sube el margen de lo comprado [D5, D6, D7]. Parte del salto de 2025 es cíclico: el margen operativo pasó del 20,7 % en 2024 al 25,4 % en 2025 con la IA.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [
        { agencia: 'Sustainalytics (riesgo ESG)', calificacion: '18,0 (riesgo bajo)', fecha: '2025-01' },
        { agencia: 'MSCI ESG', calificacion: 'BBB', fecha: '2026' },
      ],
      materialidad: 'Lo material es (1) la cadena de suministro y el origen de los metales (cobre, oro, estaño, tántalo de zonas de conflicto) y los aranceles, con fábricas en ≈ 40 países y el 15,9 % de las ventas enviado a China [A1]; (2) la energía de las fábricas, que crece con el volumen de IA, y (3) la fiscalidad internacional: el asunto fiscal de China ha costado 490 M USD en devengos desde el 4T25 y ha subido el tipo ajustado al 27 % [A3, A4]. La exposición a defensa (9 % de las ventas) excluye a Amphenol de algunos fondos con filtros ESG [A1].',
      controversias: 'Sin sanciones ni litigios relevantes en tres años según los informes de la empresa [A1]. El asunto abierto es fiscal: avisos de pago de las autoridades de China (230 M USD) y una reevaluación de 160 M de años anteriores en el 1T26, más 100 M en el 4T25 [A3]. Las ventas de los directivos (511,9 M USD en 12 meses) son ejercicio de opciones y venta en el mismo día [C3].',
      confianza: 'Media',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (+54,4 %, fijo) es el consenso de ventas [D2]: 16.378 M reales en el 1S26 + la guía del 3T26 (9.300-9.400 M) + ≈ 9.900 M en el 4T26 con pedidos/ventas de 1,23 [A4]; CCS aporta ≈ 4.600 M y el orgánico ≈ 30 %. 2027e +17 % (≈ 4 puntos de CCS todo el año y 13 de orgánico), por debajo del consenso (+19,6 %), porque la cartera de pedidos da visibilidad de meses, no de años. Después baja deprisa: +9 % en 2028e y del 6 % al 4 % en 2029e-2033e, más que el mercado de conectores (3,7 % previsto [B4]) por el contenido de cada servidor y la cuota ganada, y menos que el 15,6 % histórico.',
    margenes: 'Margen EBITDA = EBITDA ajustado de la empresa menos 0,5 puntos de gastos de compras que se repiten: 32,8 % en 2026e (33,7 % ajustado en el 1S26 [A4]), 33,0 % en 2027e y bajada al 31,0 % desde 2031e. El margen de 2025-2026 está en máximos por el volumen de IA (Communications Solutions al 33,6 % en el 2T26 [A11]); el 31 % final supone que la competencia de Luxshare y Foxconn en cables de alta velocidad y la vuelta a una mezcla normal quitan parte del pico, sin volver al 24-25 % de 2022-2024.',
    inversion: 'Capex del 4,0 % de las ventas en 2026e-2027e (647 M en el 1S26, guía en el máximo del 3-4 % [A4]) que baja al 3,6 %; amortización total del 4,3 % al 3,5 % (con los intangibles de CCS). Circulante del 22 % de las ventas (clientes 6.790 + existencias 4.552 − proveedores 4.009 = 7.333 M en junio de 2026, el 21 % de las ventas anualizadas del 2T26 [A2]). No se proyectan compras nuevas: crecer por compras costaría capital que el DCF no cuenta.',
    wacc: 'Tasa libre del 5,12 % (bono a 10 años, 20-oct-2026 [D3]); beta de 1,20, entre la ajustada (1,17) y la mensual a 5 años (1,25) [D1]; prima del 5,5 %; coste de la deuda del 5,0 % antes de impuestos (bonos de 2025-2026 al 3,4-5,4 % [D15]) y peso de la deuda del 9 % a valor de mercado. WACC del 11,0 %. Con la prima implícita del mercado (4,2 % [D4]) el WACC sería del 9,6 %.',
    terminal: 'Crecimiento a perpetuidad del 3,0 %: la electrónica crece algo más que el PIB nominal por el contenido de cada equipo (automóvil eléctrico, centros de datos, defensa). El múltiplo de salida implícito (8,1 veces el EBITDA) es muy inferior a los 24 veces de hoy y a los 13-17 de 2016-2022 [D1]: es la forma en que el WACC del 11 % castiga el valor terminal.',
  },
  puente_comentarios: {
    '2027e': 'Volumen del 12 % (IT datacom con pedidos/ventas de 1,23 y las nuevas plataformas de IA; industria y defensa al 8-10 %), precio del 1 % y 4 puntos de perímetro (CCS todo el año frente a once meses y medio en 2026, y Trexon) [A4, A11].',
    '2028e': 'Volumen del 7 %: la inversión de las nubes deja de subir al 40-60 % anual [B6]; precio del 1 % y 1 punto de perímetro residual.',
    '2029e': 'Volumen del 4,5 % y precio del 1 %; el centro de datos crece con el mercado, la fibra de CCS y la defensa compensan comunicaciones y móviles.',
    '2030e': 'Volumen del 4 % y precio del 1 %.',
    '2031e': 'Volumen del 3,5 % y precio del 1 %: converge hacia el mercado de conectores (3,7 % previsto [B4]) más medio punto de ganancia de cuota.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí, con matiz. El crecimiento proyectado después de 2026e (7,3 % medio en 2027e-2033e) está por debajo del histórico (15,6 % anual en 2016-2025, la mitad orgánico) y casi no necesita capital: el capex del 3,6-4,0 % de las ventas apenas supera la amortización, y el ROIC (28,8 % en 2025; ≈ 20 % con CCS) está muy por encima del WACC [A1]. La cuota (13,3 % del mercado de conectores en 2024 [B2]) solo sube unos puntos: no hace falta quitarle el mercado a TE ni a Molex. El motor también da «Sí». El matiz no es la calidad sino el ciclo: el 43 % de las ventas es IT datacom y depende de la inversión de cuatro nubes; si se frena, el riesgo es de nivel (2027e-2028e), no de capacidad de crecer. mercado_final va a null porque la cuota medida es solo de conectores y Amphenol vende además sensores y antenas (≈ 15-20 %).',
  dcf_lectura: 'El DCF da 39,47 USD por acción, un 50,2 % bajo el precio, con un WACC del 11,0 % y un valor terminal que pesa el 59 %. El DCF inverso dice que el precio descuenta un crecimiento del 22,5 % anual en 2027e-2033e con nuestro margen, tres veces el 7,3 % de nuestro base; o, dicho de otra manera, una rentabilidad anual del 7,2 % frente al 11,0 % que pedimos. Con la prima del mercado (4,2 %, WACC del 9,6 %) el DCF sube a 49,17 USD, todavía un 38 % bajo el precio. Para justificar 79 USD hacen falta las dos cosas a la vez: que la IA siga creciendo a doble dígito durante siete años y que el margen se quede en el pico.',
  narrativas: {
    Bajista: 'Digestión de la inversión en IA en 2027-2028, como la de 2001 en telecomunicaciones: las nubes frenan su capex tras dos años de subidas del 40-60 %, los ODM reducen existencias y los cables de cobre de alta velocidad pierden parte del rack frente a la óptica integrada. Ventas +5 % en 2027e y −6 % en 2028e, margen 3-4 puntos menor esos años y 2 puntos menor después, y WACC +0,5.',
    Base: 'La IA sigue creciendo pero más despacio (+17 % en 2027e, +9 % en 2028e) y CCS cumple el plan; el margen baja del 33 % al 31 % con la competencia asiática en cables.',
    Alcista: 'La segunda ola (inferencia, redes de 1,6T, centros de datos soberanos) mantiene IT datacom al 30 %+ un año más: ventas +21 % y +13 % en 2027e-2028e y margen un punto mayor.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan bajo el precio (bajista 23,86 USD, −69,9 %; base 39,47, −50,2 %; alcista 46,24, −41,7 %): con un WACC del 11 %, ni el alcista justifica 79 USD. El bajista no es una catástrofe sino una pausa de dos años en la inversión en IA. El valor ponderado de los escenarios (37,26 USD) queda un 53 % bajo el precio.',
  casos_12m: {
    Bajista: 'Digestión de la IA: ventas de 37.441 M en 2027e (+5 %) y 35.195 M en 2028e (−6 %), margen EBITDA del 28,5 % en 2028e: BPA ajustado de 2,28 USD (−36 % frente al base). PER de 20,2 veces (el base × 0,8; el mínimo de cinco años es 20,8, el de 2024).',
    Base: 'Ventas de 41.720 M en 2027e y 45.475 M en 2028e, margen EBITDA ajustado del 33,0 %, amortización del 3,8 %, intereses de 700 M, tipo del 27 % y 2.570 M de acciones: BPA ajustado de 3,54 USD (+15 % anual desde los 2,68 de 2026e). PER de 25,3 veces: el actual, igual a la mediana de cinco años.',
    Alcista: 'Ventas +21 % y +13 % en 2027e-2028e y un punto más de margen: BPA ajustado de 3,95 USD. PER de 25,5 veces, la media de 2018-2025: la regla no da más porque la historia de Amphenol nunca pasó de 29 veces el BPA adelantado.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (2,68 USD) coincide con el consenso (2,69) y el de 2027e (3,25) queda un 2,4 % por debajo (3,33) porque proyectamos ventas un 2 % menores (41.720 frente a 42.661 M) [D2]. La diferencia con el objetivo medio de los analistas (102,97 USD, +30 %) está en el múltiplo: aplican ≈ 31 veces el BPA de 2027 y nosotros 25,3 veces el de 2028e, la mediana de Amphenol en cinco años. El consenso ha subido el BPA de 2027 un 14 % en 90 días (de 2,92 a 3,33) [D2]: el mercado ya cuenta con que el ciclo de IA sigue.',
  objetivo_comentario: 'El objetivo a 12 meses (81,48 USD, ponderado) da un 3,3 % de rentabilidad con dividendo y el base (89,56 USD) un 13,5 %: el base pasa el listón del 12 %, pero la ponderada se queda lejos del 15 % porque el bajista (46,06 USD, −41 %) pesa un 25 %. El BPA base crece un 28,5 % anual desde 2025 (1,67 USD), pero dos tercios ya están en el 1S26 real y en la guía del 3T26 (2026e de 2,68, igual que el consenso); desde 2026e crece un 15 % anual. El valor intrínseco (41,45 USD) está un 48 % bajo el precio: no pasa el filtro de valor real. Es un Mantener: el negocio es excelente y el BPA sigue subiendo, pero el precio ya paga el ciclo de IA y el bajista es grande.',
  valoracion_comentario: 'Pesos: DCF 40 %, escenarios 45 % y comparables 15 %. El DCF y los escenarios mandan porque el negocio es estable fuera de la IA y la asimetría del ciclo es lo que decide. Los comparables pesan poco: TE Connectivity (16,5 veces el BPA adelantado) y Sensata o Belden (10-11) no tienen la exposición a la IA de Amphenol, y Corning o Vertiv (24-32) sí la tienen; la mediana (18,5 veces) da 59,30 USD [D2]. Las transacciones no se usan: son de negocios comprados por Amphenol a 7-11 veces el EBITDA, la prueba de su disciplina, no del valor de Amphenol entera. El DCF inverso (22,5 % de crecimiento anual) es la mejor medida de lo que paga el precio.',
  catalizadores: {
    items: [
      { fecha: '2026-10-28', evento: 'Resultados del 3T26 y guía del 4T26', efecto: 'Guía del 3T26: ventas de 9.300-9.400 M y BPA de 0,70-0,71 USD; la empresa ha batido su guía cada trimestre desde 2023 [C7]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-01', evento: 'Resultados del 4T26 y guía del 1T27', efecto: 'En enero de 2026 la acción cayó un 12 % el día de resultados pese a batir: la guía manda [D11]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-01/02', evento: 'Planes de capex de 2027 de Microsoft, Alphabet, Amazon y Meta', efecto: 'Más de un billón de USD esperado en 2027 [B6]; un recorte sería el bajista', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Rampa de las plataformas de IA de 2027 (Nvidia Rubin, racks de 1,6T)', efecto: 'Más contenido de cobre y fibra por rack o paso a óptica integrada', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Vencimiento del programa de recompras de 2.000 M USD', efecto: 'Renovación o no según la deuda tras CCS (1,3 veces el EBITDA)', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Sin fecha', evento: 'Resolución del asunto fiscal de China', efecto: 'Más devengos o fin de la incertidumbre (490 M USD ya registrados)', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Continuo', evento: 'Nuevas compras (Norwitt: «la compra sigue siendo prioridad»)', efecto: 'Crecimiento comprado a 7-11 veces el EBITDA', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Frenazo o digestión de la inversión en centros de datos de IA (IT datacom es el 43 % de las ventas del 2T26)', tipo: 'Ciclo y demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−41 % a 12 meses (bajista: BPA 2,28 × 20,2 veces)', mitigante: 'Diversificación en industria, defensa y automóvil (≈ 50 % de las ventas); costes variables y modelo descentralizado que recorta deprisa', senal: 'Pedidos/ventas por debajo de 1,0 o recorte del capex de 2027 de alguna de las cuatro nubes' },
      { riesgo: 'Múltiplo: 25,3 veces el BPA adelantado y 24 veces el EBITDA tras subir un 96 % en 2025', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % si el PER vuelve a 20,8 (mínimo de cinco años)', mitigante: 'BPA creciendo al 15 % anual en el base', senal: 'Caídas el día de resultados pese a batir, como en enero de 2026 [D11]' },
      { riesgo: 'Cambio tecnológico: óptica integrada (CPO) en lugar de cobre de alta velocidad dentro del rack', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'CCS y la fibra de Amphenol cubren la transición; la óptica también necesita conectores [B9]', senal: 'Plataformas de Nvidia o de las nubes que pasen el «scale-up» a óptica antes de 2028' },
      { riesgo: 'Competencia en cables y conectores de alta velocidad (Luxshare, Foxconn Interconnect, Molex; TE en potencia)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −8 % (2 puntos de margen)', mitigante: 'Diseño conjunto con el cliente y capacidad de fabricar en volumen fuera de China', senal: 'Margen de Communications Solutions por debajo del 30 %' },
      { riesgo: 'Integración de CCS y deuda (18.811 M de deuda bruta; fondo de comercio e intangibles de 22.844 M, por encima del patrimonio)', tipo: 'Asignación de capital', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'CCS ya supera el plan (4.600 M de ventas y +0,30 USD de BPA antes del split en 2026) y la deuda neta es de 1,3 veces el EBITDA [A4]', senal: 'Ventas de CCS por debajo de 4.300 M en 2026 o deterioro de su fondo de comercio' },
      { riesgo: 'Aranceles y China (15,9 % de las ventas, fábricas en China, asunto fiscal abierto)', tipo: 'Regulación y fiscal', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −4 %', mitigante: 'Producción repartida en ≈ 40 países; devolución de aranceles IEEPA (80 M en el 2T26)', senal: 'Nuevos devengos fiscales en China o tipo ajustado por encima del 27 %' },
      { riesgo: 'Ventas continuas de directivos (511,9 M USD en 12 meses, una sola compra de 1,3 M)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Señal, no valor', mitigante: 'Son ejercicios de opciones que vencen y venta el mismo día [C3]', senal: 'Ventas de acciones propias, no de opciones, del consejero delegado' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Las cuatro grandes nubes llegaron a 2027 con más de un billón de USD de inversión anual y en 2028 decidieron digerirla: los modelos de IA no generaban ingresos al ritmo del gasto, el precio de la inferencia cayó y los ODM tenían existencias para seis meses. Los pedidos de IT datacom de Amphenol cayeron un 30 % en dos trimestres; a la vez, Nvidia llevó la óptica integrada al interior del rack en su plataforma de 2028 y los cables de cobre de alta velocidad, la línea con más margen, perdieron volumen y precio frente a Luxshare. El margen operativo volvió del 30 % al 22-23 % de 2022, el BPA de 2028 se quedó en 2,2 USD en lugar de 3,5 y el mercado volvió a pagar 20 veces, no 25. Lo habrían anticipado la relación pedidos/ventas por debajo de 1,0, el margen de Communications Solutions bajando del 30 % y las nubes rebajando su guía de capex en las presentaciones de enero de 2028.',
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−41 % a 12 meses si la inversión se frena (bajista); +28 % si sigue (alcista)',
      comentario: 'Para Amphenol la IA no es una amenaza de sustitución sino el motor de la demanda: IT datacom pasó del 36 % de las ventas en 2025 al 43 % en el 2T26, creciendo un 63 % orgánico, y es la línea de más margen [A4, A11]. Si el gasto en IA se frena, el golpe es directo: en nuestro bajista las ventas caen un 6 % en 2028e, el margen cede 4 puntos y el BPA queda un 36 % bajo el base (−41 % de precio a 12 meses). La parte que sí puede sustituir es tecnológica: la óptica integrada desplazaría cable de cobre; CCS (fibra) es su cobertura. Señales: pedidos/ventas, guía de capex de las nubes y el margen de Communications Solutions.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Ciclo de IA', pregunta: '¿Qué parte de las ventas de IT datacom va a las cuatro grandes nubes y a Nvidia (directo o por ODM), y cuántos meses de pedidos firmes hay en la cartera?', por_que: 'Es la diferencia entre el base (+9 % en 2028e) y el bajista (−6 %): −41 % de precio.' },
      { tema: 'Cobre frente a óptica', pregunta: '¿Qué parte de las ventas de IA son cables de cobre de alta velocidad dentro del rack, y cuál sería el contenido de Amphenol por rack si el «scale-up» pasa a óptica integrada?', por_que: 'Es la línea de más margen y la más expuesta a un cambio tecnológico.' },
      { tema: 'Margen', pregunta: '¿Cuánto del margen operativo ajustado del 29,8 % del 2T26 es volumen y mezcla de IA que se iría con una caída de ventas?', por_que: 'El base supone que se queda en el 31 % EBITDA; volver al 25 % de 2023 restaría un 20 % al BPA.' },
      { tema: 'CCS', pregunta: '¿Qué crecimiento orgánico y margen tiene CCS fuera de los centros de datos (banda ancha, edificios), y qué falta de su plan de integración?', por_que: '10.500 M USD y la mitad del fondo de comercio; el BPA de 2026 ya cuenta con +0,15 USD de CCS.' },
      { tema: 'Fiscalidad', pregunta: '¿Cuánto falta por resolver del asunto fiscal de China y por qué el tipo ajustado sube al 27 % de forma permanente?', por_que: 'Cada punto de tipo son ≈ 1,4 % de BPA.' },
      { tema: 'Asignación de capital', pregunta: '¿Cuándo vuelven las recompras por encima de la dilución de opciones (≈ 1 % anual) y qué tamaño máximo de compra se plantea con 1,3 veces de deuda neta?', por_que: 'Nuestro BPA no cuenta con recompras netas.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 81,48 USD (nuestro BPA ajustado de 2028e × el PER de la regla común, ponderado), un 3,3 % de rentabilidad con el dividendo y un 13,5 % en el caso base, frente a un precio de 79,32 USD (cierre del 20-oct-2026). El valor intrínseco (41,45 USD) queda un 48 % bajo el precio y el objetivo medio de los analistas (102,97) un 30 % por encima [D2]. La razón: el negocio crece y gana como nunca, pero el precio paga ya el ciclo de IA y el bajista (46,06 USD, −41 %) pesa demasiado. La convicción es media porque la regla y el valor intrínseco dicen lo mismo (no comprar) y el BPA del base está en el consenso; subiría si los pedidos del 3T26 (28-oct) caen por debajo de 1,0 veces las ventas.

**El negocio.** Amphenol es el primer o segundo fabricante mundial de conectores (13,3 % del mercado en 2024 [B2]), con un margen operativo ajustado del 29,8 % frente al ≈ 21 % de TE Connectivity [A4, B5]. El ROIC con el fondo de comercio fue del 28,8 % en 2025 (≈ 20 % con CCS), muy por encima del WACC del 11,0 %. La calidad sostiene el crecimiento que proyectamos: el 7,3 % anual de 2027e-2033e es la mitad del histórico (15,6 %) y apenas pide capital (capex del 3,6-4,0 % de las ventas); el riesgo no es la capacidad de crecer sino el nivel de ventas de IA: IT datacom es ya el 43 % de las ventas (+63 % orgánico en el 2T26) y depende del capex de cuatro nubes [A4, B6].

**Finanzas.** Ventas de 29.012 M USD en los últimos doce meses (+55 % en el 2T26, 30 % orgánico) y BPA ajustado de 1,21 USD en el 1S26 (+68 %) [A4]. Deuda neta de 13.392 M (1,3 veces el EBITDA) tras pagar 10.500 M por CCS; fondo de comercio e intangibles de 22.844 M, por encima del patrimonio. Flujo libre de 4.728 M en doce meses.

**Equipo y gobierno.** Norwitt (consejero delegado desde 2009) ha batido su guía todos los trimestres desde 2023 y no ha hecho un deterioro en 20.000 M de compras [C7]. Resta: 511,9 M USD de ventas de directivos en 12 meses (ejercicio de opciones) y un salario de 22,35 M (1.188 veces el mediano) [C1, C3].

**Valoración.** El DCF da 39,47 USD (−50,2 %) y el DCF inverso dice que el precio descuenta un 22,5 % de crecimiento anual en 2027e-2033e frente al 7,3 % del base; con la prima del mercado (4,2 %), 49,17 USD. Los comparables dan 59,30 (mediana de 18,5 veces). La regla a 12 meses mantiene el PER en 25,3 veces, la mediana de Amphenol: el base sube con el BPA (+15 % anual), pero el bajista lleva el PER a 20,2. Coincidimos con el consenso en el BPA de 2026e (2,68 frente a 2,69) y discrepamos en el múltiplo: los analistas pagan ≈ 31 veces el de 2027.

**Riesgos y catalizadores.** El mayor riesgo es una digestión de la inversión en IA en 2027-2028 (−41 % a 12 meses); después, el múltiplo (−20 % si vuelve a 20,8 veces) y el paso del cobre a la óptica integrada dentro del rack. Catalizadores: resultados del 3T26 el 28-oct-2026 y planes de capex de las nubes en enero-febrero de 2027.

**Qué cambiaría la decisión.** Comprar por debajo de 41,45 USD (valor intrínseco; la rentabilidad a 12 meses llegaría al 15 % mucho antes, hacia 71 USD, pero el filtro de valor real manda); vender por encima de ≈ 91 USD. Un margen de Communications Solutions por debajo del 30 % o pedidos/ventas por debajo de 1,0 reforzarían la venta; pedidos/ventas por encima de 1,2 en 2027 con capex de las nubes al alza subirían el base.`,
    tesis: 'Amphenol fabrica las piezas que conectan y alimentan los equipos electrónicos: conectores, cables, antenas y sensores. Es uno de los dos mayores del mundo (13,3 % del mercado de conectores [B2]), con un modelo descentralizado que ha batido su guía cada trimestre desde 2023 y ha comprado más de 20.000 M USD sin deterioros [A1, C7]. La IA la ha convertido en un proveedor clave de los centros de datos: IT datacom es el 43 % de las ventas, con un margen operativo ajustado del 29,8 % y un ROIC del 28,8 % en 2025 [A4].\n\nEl precio (79,32 USD, 25,3 veces nuestro BPA de los próximos 12 meses y 24 veces el EBITDA) descuenta, según el DCF inverso, un crecimiento del 22,5 % anual hasta 2033 con margen de pico: siete años más de ciclo de IA sin pausa. El PER adelantado está en su mediana de cinco años porque el BPA se ha duplicado, no porque la acción sea barata.\n\nEl mercado acierta en el negocio y probablemente se equivoca en la duración del ciclo. Para invertir hay que creer que la inversión de las nubes no se digiere en 2027-2028 y que el cobre no pierde el rack frente a la óptica. Con un bajista del −41 % y un base del +13,5 %, la asimetría no compensa hoy [P1].',
    vision_diferencial: {
      mercado_descuenta: 'Que la inversión en centros de datos de IA sigue creciendo varios años, que Amphenol mantiene su margen de pico (≈ 30 % operativo) y que la acción merece ≈ 31 veces el BPA de 2027; los analistas esperan 102,97 USD, un 30 % más.',
      nuestra_vision: 'Coincidimos en el BPA de 2026e-2027e y discrepamos en el múltiplo y en el riesgo: una pausa de dos años en el capex de IA, que el sector ya vivió en 2001 en telecomunicaciones, llevaría el BPA de 2028 a 2,28 USD y el PER a 20 veces. El precio no deja margen para ese caso.',
      por_que: 'El 43 % de las ventas depende del capex de cuatro clientes finales que lo han subido un 40-60 % al año; el cobre de alta velocidad, la línea de más margen, tiene un sustituto tecnológico en camino. La historia de Amphenol nunca pagó más de 29 veces el BPA adelantado.',
    },
    a_favor: [
      '**Calidad**: ROIC del 28,8 % en 2025 (≈ 20 % con CCS) frente a un WACC del 11,0 %.',
      '**Ejecución**: guía batida todos los trimestres desde 2023 y ningún deterioro en 20.000 M USD de compras.',
      '**Crecimiento visible**: pedidos/ventas de 1,23 en el 2T26 y BPA del 1S26 +68 %.',
      '**CCS cumple**: 4.600 M USD de ventas previstas en 2026 frente a 4.100 M al comprarla.',
      '**Diversificación**: ≈ 50 % de las ventas en industria, defensa, automóvil y aeronáutica.',
    ],
    en_contra: [
      '**Precio**: el DCF inverso descuenta un 22,5 % de crecimiento anual hasta 2033; valor intrínseco de 41,45 USD.',
      '**Ciclo de IA**: IT datacom es el 43 % de las ventas; el bajista vale −41 % a 12 meses.',
      '**Margen de pico**: 29,8 % operativo ajustado frente al 20-21 % de 2022-2024.',
      '**Cobre frente a óptica**: la óptica integrada puede quitar cable de alta velocidad del rack.',
      '**Directivos vendedores**: 511,9 M USD vendidos en 12 meses, una compra de 1,3 M.',
    ],
    que_vigilar: 'La tesis depende de que la inversión en IA crezca sin pausa en 2027-2028 y de que Amphenol mantenga el margen de Communications Solutions por encima del 30 %. La señal en contra sería una relación pedidos/ventas por debajo de 1,0, una guía trimestral por debajo del consenso o un recorte del capex de 2027 de alguna de las cuatro grandes nubes.',
    cambiaria_recomendacion: [
      'Precio por debajo de 41,45 USD (valor intrínseco): Comprar si se mantiene el resto.',
      'Precio por encima de ≈ 91 USD: Vender (la rentabilidad a 12 meses pasaría a negativa).',
      'Pedidos/ventas por debajo de 1,0 en un trimestre o recorte del capex de las nubes: Vender.',
      'Margen de Communications Solutions por debajo del 30 % dos trimestres: revisar el base a la baja.',
      'Pedidos/ventas por encima de 1,2 durante 2027 con BPA de 2027 por encima de 3,6 USD: revisar el base al alza.',
    ],
    kpis_seguimiento: [
      { kpi: 'Pedidos/ventas', nivel_actual: '1,23 (2T26)', umbral_alerta: '< 1,0', por_que: 'Avisa con meses de antelación de la digestión de la IA.' },
      { kpi: 'Crecimiento orgánico de IT datacom', nivel_actual: '+63 % (2T26)', umbral_alerta: '< +10 %', por_que: 'El 43 % de las ventas.' },
      { kpi: 'Margen operativo ajustado', nivel_actual: '29,8 % (2T26)', umbral_alerta: '< 27 %', por_que: 'El base supone que se queda cerca del pico.' },
      { kpi: 'BPA ajustado trimestral frente a la guía', nivel_actual: '0,675 USD (2T26); guía 3T26 0,70-0,71', umbral_alerta: 'Guía por debajo del consenso', por_que: 'La acción cae con la guía, no con el resultado.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '1,3x (2T26)', umbral_alerta: '> 2,0x', por_que: 'Una compra grande con el ciclo arriba sería el error típico.' },
    ],
    confianza: 'Media',
  },
};
