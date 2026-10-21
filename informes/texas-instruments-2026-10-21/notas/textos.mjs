// Textos del analista (Texas Instruments, corte 2026-10-21, tras el 3T26). Cifras del motor; citas con la letra de la nota.
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio a 31 de diciembre, US GAAP; TI no publica BPA ajustado y todo el informe usa el diluido publicado. Cuentas anuales del XBRL y los 10-K de 2016-2025 y trimestres de los 8-K de resultados [A1, A12]. El 10-Q del 3T26 aún no está: el puente usa el balance del 8-K del 30-sep [D1]. Precio: cierre del 21-oct-2026 (284,65 USD), anterior a los resultados, que se publicaron tras el cierre; fuera de hora apenas se movió (≈283,9 USD) [D8, D10]. El consenso es del 20-21 de octubre, antes de los resultados [D6, D7]. La compra de Silicon Labs (≈7.500 M USD de valor empresa en efectivo, cierre previsto en el 1S27) no entra en la proyección ni en el puente porque no ha cerrado [D3]. El PER de los comparables es sobre BPA ajustado y el de TI sobre el publicado, así que su mediana se queda corta. Sustituye entero al análisis rápido del 14-oct, hecho solo con extractos de búsqueda.',
  controles_explicados: [
    { control: 'Veredicto de sostenibilidad del analista coherente con las pruebas del motor', explicacion: 'El veredicto es «En parte», como el del motor: el 7,6 % medio proyectado incluye el rebote de 2026 (+26,6 %, ya visto en nueve meses de cuentas) desde un 2025 de fondo de ciclo; sin él, 2027e-2035e crecen un 5,5 % anual, por debajo del mercado analógico.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El salto de la caja libre (≈9.100 M de media en 2026e-2028e frente a 1.928 M en 2023-2025) es el fin del ciclo de inversión en fábricas de 300 mm: el capex pasa de 4.800-5.100 M al año a 2.000-3.000 M en 2026 y los últimos 12 meses ya dan 8.422 M de caja libre con las ayudas CHIPS [A2, A14].' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El BPA de 2028e (11,23 USD) supone un 27,3 % anual desde el 5,45 de 2025, pero 2026 ya está casi hecho: 6,44 USD en nueve meses y una guía del 4T que lleva el año a ≈9,06 [D1]; desde ahí son +11 % anual, por debajo del consenso (12,05 en 2028) [D6].' },
  ],
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e fijo en ≈22.390 M USD (+26,6 %): 16.341 M en nueve meses más el punto medio de la guía del 4T (5.800-6.300 M) [A2, D1]. 2027e +10 %, por debajo del consenso (+14,6 %) porque parte del rebote es reposición de inventario y la guía del 4T ya es plana [D6]; 2028e +6 % y después el ritmo del mercado analógico (≈6 % según WSTS [B7]) bajando al 3,5 %. En diez años, ventas de ≈38.000 M frente al máximo anterior de 20.028 M en 2022 [A1].',
    margenes: 'Margen EBITDA del 53,5 % en 2026e (51,3 % en los últimos 12 meses y 44,9 % en 2025) y del 55-56 % después, como el pico de 2022 (55,2 %), porque las fábricas de 300 mm se llenan: el margen bruto ya es del 64,2 % en el 3T26 frente al 57,4 % de hace un año [A2]. La amortización pesa más que antes (10,8 % de las ventas en 2025) y baja con las ventas hasta el 7,5 %.',
    inversion: 'Capex del 10 % de las ventas en 2026e (guía de 2.000-3.000 M; 1.653 M en nueve meses) [A14, A2], del 8 % en 2027e y del 7,5 % de mantenimiento después, igual que la amortización final. Circulante del 33 % de las ventas en 2026e (34 % real) bajando al 30 %: las existencias son altas a propósito para servir desde fábricas propias [A1].',
    wacc: 'Tasa libre del 5,13 % (bono del Tesoro a 10 años, 21-oct-2026) [D9]; beta de 1,27 (mensual ajustada a cinco años frente al SPY; la bruta es 1,41 y la semanal a dos años 1,26) [D5]; prima de mercado del 5,5 %. Deuda del 5 % del valor al ≈4,2 % antes de impuestos: WACC del 11,7 %. Con la prima implícita del mercado (4,2 %) baja al 10,1 % y el DCF sube a 164,98 USD.',
    terminal: 'Gordon con un 3 % de crecimiento a perpetuidad (inflación más el aumento del contenido de semiconductores), por debajo de la tasa libre. El valor terminal pesa un 48 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: rebote del ciclo con industrial y centros de datos al frente y reposición de inventario de distribuidores; precio: subidas cliente a cliente citadas en la conferencia [A2, E1].',
    '2027e': 'El ciclo sigue pero se modera: la guía del 4T ya es plana sobre el 3T [D1].',
    '2028e': 'Crecimiento cercano al del mercado analógico [B7].',
    '2029e': 'Igual.',
    '2030e': 'Igual; la cuota implícita sube algo porque las ventas incluyen el procesado embebido.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte. La calidad de TI sostiene un crecimiento como el del mercado analógico: es la mayor del sector (16,2 % del analógico mundial [B7, B11]), fabrica en fábricas propias de 300 mm con el coste más bajo del sector y vende a más de 100.000 clientes, con un ROIC del 22 % frente a un WACC del 11,7 %. Pero el 7,6 % medio proyectado parte de un 2026 de rebote (+26,6 %) que incluye reposición de inventario y subidas de precio de fase alta del ciclo, y sus ventas de 2016-2025 solo crecieron un 3,2 % anual. Sin el rebote, el 5,5 % anual de 2027e-2035e es financiable sin capital nuevo: el capex ya está hecho.',
  dcf_lectura: 'El DCF da 134,29 USD por acción, un 52,8 % por debajo del precio, con un WACC del 11,69 %; el valor terminal pesa un 48 % y el rango de sensibilidad va de 123,30 a 148,00 USD. Con la prima implícita del mercado (WACC del 10,1 %) sube a 164,98 USD. El DCF inverso es la clave: a 284,65 USD el mercado pide que las ventas crezcan un 18,3 % anual entre 2027e y 2035e con nuestros márgenes, frente al 5,5 % de nuestro caso base, o aceptar una rentabilidad del 7,2 % anual, por debajo del 11,7 % de su coste de capital. Ni siquiera el alcista (165,54 USD) se acerca: el precio paga el ciclo de 2026-2027 y además una década de crecimiento que TI nunca ha tenido.',
  narrativas: {
    Bajista: 'El rebote de 2026 era sobre todo reposición de inventario: las ventas caen un 4 % en 2027, las fábricas nuevas vuelven a ir a medio gas y el margen EBITDA baja 5-6 puntos; después crece un 3 % menos que el base. Es lo que pasó en 2023-2024 (ventas −22 % en dos años) [A1].',
    Base: 'El ciclo sigue en 2027 (+10 %) y se modera después; las fábricas de 300 mm se llenan y el margen EBITDA se queda en el 55-56 %, como en 2022.',
    Alcista: 'La alimentación de centros de datos y la automoción eléctrica alargan el ciclo: 3 puntos más de crecimiento y 1,5 de margen, con el BPA de 2028e en línea con el consenso.',
  },
  escenarios_comentario: 'Los tres escenarios del valor intrínseco quedan muy por debajo del precio: el alcista (165,54 USD) un 41,8 % y el bajista (86,20) un 69,7 %. A 12 meses es distinto, porque el mercado paga el beneficio cercano: el base vale 286,37 USD (+2,6 % con el dividendo) y el bajista 158,78 (−42 %), con el PER mínimo de cinco años (19,2x) sobre un BPA un 26 % menor.',
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %; las transacciones no pesan (compras de 4-10 veces las ventas con prima de control). Todos los métodos de valor dan mucho menos que el precio: DCF 134,29 USD, comparables por PER 196,49 y por EV/EBITDA 191,96, transacciones 162,66. Los comparables cotizan a 19,8 veces el BPA ajustado de los próximos 12 meses y TI a 28,7 veces el publicado. El valor intrínseco es de 148,79 USD. La recomendación la decide la regla a 12 meses (PER propio por BPA propio de 2028e): −6,3 % ponderada y +2,6 % en el base, que es Mantener.',
  per_excluidos: '2016 y 2017: el BPA de 2017 lleva el cargo extraordinario de la reforma fiscal de EE. UU. Serie adelantada (cierre del año ÷ BPA diluido publicado del año siguiente) [D5]: 2018 18,0x; 2019 21,5x; 2020 19,9x; 2021 20,0x; 2022 23,4x; 2023 32,8x; 2024 34,4x; 2025 19,2x (173,49 ÷ nuestro 2026e de 9,04). 2023 y 2024 son fondo de ciclo y se mantienen. v2 de control (cierre ÷ BPA del mismo año): 2018 16,9x; 2019 24,5x; 2020 27,5x; 2021 22,8x; 2022 17,6x; 2023 24,1x; 2024 36,1x; 2025 31,8x.',
  just12m: {
    Bajista: 'Ventas de 2027e −4 % y 2028e +1 % (≈21.700 M) con 5-6 puntos menos de margen EBITDA: BPA de 8,27 USD con 921 M de acciones.',
    Base: 'Ventas de ≈26.100 M en 2028e y margen EBITDA del 56 %: EBIT de 12.346 M, −320 M de financiero, 14 % de impuestos y 921 M de acciones: BPA de 11,23 USD (2026e da 9,05, en la guía).',
    Alcista: 'Tres puntos más de crecimiento y 1,5 de margen: ventas de ≈27.600 M y BPA de 12,27 USD, en línea con el consenso (12,05).',
  },
  diferencia_consenso: 'Nuestro BPA base de 2027e (10,28 USD) coincide con el consenso (10,26) y el de 2028e (11,23) queda un 6,8 % por debajo (12,05) por la cautela de ciclo; el consenso es anterior a la guía del 4T, que lo hará subir un 5-8 % [D6]. La distancia grande está en el múltiplo: el objetivo medio de los analistas (324,71 USD) supone unas 27 veces el BPA de 2028; la regla baja del PER actual (27,7x) hacia la mediana adelantada de cinco años (23,4x) con el tope del 10 % y deja el base en 25,5 veces y 286,37 USD, un 11,8 % por debajo.',
  objetivo12m_comentario: 'Objetivo ponderado de 261,10 USD: −6,3 % con el dividendo (+2,6 % en el base). El BPA crece mucho (de 5,45 USD en 2025 a 11,23 en 2028e) porque las fábricas nuevas se llenan, pero el múltiplo baja hacia su historia y el bajista, de fondo de ciclo, pesa. El valor intrínseco (148,79 USD) queda un 43 % por debajo del objetivo: la tesis a varios años es peor que la de 12 meses.',
  rentabilidad_comentario: 'Crea valor incluso en el fondo del ciclo: ROIC del 22,2 % en 2025 (27,1 % sin fondo de comercio) frente a un WACC del 11,7 %, con unas fábricas nuevas que todavía iban a medio llenar y una amortización del 10,8 % de las ventas [A1]. En 2021-2022, con las fábricas llenas, el ROIC pasaba del 40 %. El ROIC incremental de la década es del 13,4 %, bajo, porque el capex de 2021-2025 (más de 20.000 M) aún no ha dado su fruto: es la apuesta que el mercado ya paga.',
  catalizadores: {
    items: [
      { fecha: '22-oct-2026', evento: 'Primera sesión tras el 3T26', efecto: 'Fuera de hora la acción no se movió (−0,3 %) pese a batir y guiar por encima [D10]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Enero de 2027', evento: 'Resultados del 4T26 y guía del 1T27', efecto: 'Primera prueba de si la estacionalidad vuelve; una guía plana o al alza alargaría el ciclo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '1S 2027', evento: 'Cierre de la compra de Silicon Labs', efecto: 'Sube la deuda neta en ≈7.500 M y añade un negocio con pérdidas operativas; sinergias de ≈450 M [C24, D3]', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2026-2027', evento: 'Investigación antidumping china sobre el analógico de EE. UU.', efecto: 'Aranceles sobre una parte de las ventas a China (≈20 % por sede del cliente) [B13, B14]', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'El rebote de 2026 era reposición de inventario', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−42 % a 12 meses (bajista, 158,78 USD)', mitigante: 'Fábricas propias de bajo coste y un dividendo cubierto por la caja libre al bajar el capex', senal: 'Guía trimestral por debajo del trimestre anterior más allá de lo estacional' },
      { riesgo: 'Competencia china en analógico de gama media', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % de ventas en China', mitigante: 'Catálogo de más de 80.000 productos y coste de fábricas de 300 mm', senal: 'Caída del peso de China y del margen bruto' },
      { riesgo: 'Integración de Silicon Labs', tipo: 'Estrategia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Prima del 69 % y 9,6 veces las ventas por un negocio sin beneficio operativo [D3]', mitigante: 'Encaja en procesado embebido inalámbrico; sinergias anunciadas de ≈450 M', senal: 'Pérdidas del negocio comprado tras el cierre' },
      { riesgo: 'Múltiplo: 28,7 veces el BPA de los próximos 12 meses frente a 19,8 de los comparables', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % si cotiza como sus comparables', mitigante: 'Calidad y caja libre en máximos', senal: 'PER por debajo de 23 veces' },
      { riesgo: 'Cambios en la dirección (presidente, director financiero) en plena integración', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Difícil de medir', mitigante: 'Directivos de la casa', senal: 'Nuevas salidas de directivos' },
    ],
    premortem: 'Es octubre de 2027 y TI ha perdido un 35 %. Lo más probable: el rebote de 2026 era reposición de inventario de los distribuidores, como en 2021-2022; en el 1S27 las ventas cayeron, las fábricas nuevas se quedaron a medio llenar, el margen bruto volvió por debajo del 60 % y el mercado dejó de pagar 28 veces un beneficio que bajaba. A la vez, cerró la compra de Silicon Labs con más deuda y el arancel chino al analógico de EE. UU. recortó las ventas en su mayor mercado. Las señales: guías planas tras un año de subidas y existencias del canal en máximos.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Inventario del canal', pregunta: '¿Qué parte del crecimiento de 2026 es reposición de inventario de los distribuidores y cuánto queda en el canal?', por_que: 'Decide si 2027 es año de crecimiento o de corrección.' },
      { tema: 'Silicon Labs', pregunta: '¿Qué retorno sobre los ≈7.500 M espera la dirección y en cuánto tiempo?', por_que: 'Es la mayor compra de TI desde National Semiconductor.' },
      { tema: 'Recompras', pregunta: '¿Cuándo vuelven las recompras, con 18.790 M autorizados y la caja libre en máximos?', por_que: 'El dividendo ya absorbe gran parte de la caja libre.' },
    ],
    confianza: 'Media',
  },
  huecos: [],
};
